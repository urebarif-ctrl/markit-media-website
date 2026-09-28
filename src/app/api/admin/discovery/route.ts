import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getMongoDb } from "@/lib/mongodb";
import { verifyToken } from "@/lib/auth";

function getAuth(request: NextRequest) {
  const cookie = request.cookies.get("admin_token")?.value;
  const header = request.headers.get("authorization")?.replace("Bearer ", "");
  const token = cookie || header;
  if (!token) return null;
  return verifyToken(token);
}

export async function GET(request: NextRequest) {
  const auth = getAuth(request);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const db = await getMongoDb();
    const collection = db.collection("discovery_briefs");
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, Number(searchParams.get("page")) || 1);
    const limit = Math.min(100, Math.max(1, Number(searchParams.get("limit")) || 20));
    const status = String(searchParams.get("status") || "").trim();
    const rawSearch = String(searchParams.get("search") || "").trim().slice(0, 120);
    const search = rawSearch.replace(/[^a-zA-Z0-9@._ -]/g, "");

    const filter: Record<string, unknown> = {};
    if (status) filter.status = status;
    if (search) {
      const pattern = new RegExp(search, "i");
      filter.$or = [
        { brandName: pattern },
        { name: pattern },
        { email: pattern },
        { company: pattern },
      ];
    }

    const [total, documents, statusRows] = await Promise.all([
      collection.countDocuments(filter),
      collection.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).toArray(),
      collection.aggregate<{ _id: string; count: number }>([
        { $group: { _id: "$status", count: { $sum: 1 } } },
      ]).toArray(),
    ]);

    const counts = Object.fromEntries(statusRows.map((row) => [row._id || "new", row.count]));
    const briefs = documents.map(({ _id, ...item }) => ({ id: _id.toString(), ...item }));

    return NextResponse.json({
      briefs,
      total,
      counts,
      page,
      limit,
      totalPages: Math.max(1, Math.ceil(total / limit)),
      database: "MongoDB",
    });
  } catch (error) {
    console.error("Discovery database read failed", error);
    return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  }
}

export async function PATCH(request: NextRequest) {
  const auth = getAuth(request);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id, status, internalNotes } = await request.json();
    if (!id || !ObjectId.isValid(String(id))) {
      return NextResponse.json({ error: "Valid brief ID required" }, { status: 400 });
    }

    const allowed = new Set(["new", "reviewing", "qualified", "scheduled", "proposal", "won", "closed"]);
    const update: Record<string, unknown> = { updatedAt: new Date() };

    if (status !== undefined) {
      if (!allowed.has(String(status))) {
        return NextResponse.json({ error: "Invalid status" }, { status: 400 });
      }
      update.status = String(status);
    }

    if (internalNotes !== undefined) {
      update.internalNotes = String(internalNotes).slice(0, 4000);
    }

    const db = await getMongoDb();
    await db.collection("discovery_briefs").updateOne(
      { _id: new ObjectId(String(id)) },
      { $set: update },
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Discovery database update failed", error);
    return NextResponse.json({ error: "Database update failed" }, { status: 503 });
  }
}
