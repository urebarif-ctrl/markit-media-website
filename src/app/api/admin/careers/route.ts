import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getMongoDb } from "@/lib/mongodb";
import { verifyToken } from "@/lib/auth";
import { CAREER_STATUSES } from "@/lib/careers";

export const runtime = "nodejs";

/** CVs are personal data: only admins (Master Admin, Admin) may read or change them, enforced here and not only in the menu. */
function adminAuth(request: NextRequest) {
  const cookie = request.cookies.get("admin_token")?.value;
  const header = request.headers.get("authorization")?.replace("Bearer ", "");
  const session = verifyToken(cookie || header || "");
  if (!session) return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  if (session.role !== "master_admin" && session.role !== "admin") {
    return { error: NextResponse.json({ error: "Only admins can open the CV bank." }, { status: 403 }) };
  }
  return { session };
}

export async function GET(request: NextRequest) {
  const { error } = adminAuth(request);
  if (error) return error;

  try {
    const db = await getMongoDb();
    const collection = db.collection("career_applications");
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, Number(searchParams.get("page")) || 1);
    const limit = Math.min(100, Math.max(1, Number(searchParams.get("limit")) || 20));
    const status = String(searchParams.get("status") || "").trim();
    const role = String(searchParams.get("role") || "").trim().slice(0, 80);
    const search = String(searchParams.get("search") || "").trim().slice(0, 120).replace(/[^a-zA-Z0-9@._ -]/g, "");

    const filter: Record<string, unknown> = {};
    if (status) filter.status = status;
    if (role) filter.role = role;
    if (search) {
      const pattern = new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
      filter.$or = [{ name: pattern }, { email: pattern }, { phone: pattern }, { location: pattern }, { cvFilename: pattern }];
    }

    const [total, documents, statusRows] = await Promise.all([
      collection.countDocuments(filter),
      collection.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).toArray(),
      collection.aggregate<{ _id: string; count: number }>([{ $group: { _id: "$status", count: { $sum: 1 } } }]).toArray(),
    ]);

    const counts = Object.fromEntries(statusRows.map((row) => [row._id || "new", row.count]));
    const applications = documents.map(({ _id, cvId, ...item }) => ({ id: _id.toString(), cvId: cvId?.toString?.() || "", ...item }));
    return NextResponse.json({ applications, total, counts, page, limit, totalPages: Math.max(1, Math.ceil(total / limit)) });
  } catch (err) {
    console.error("Career applications read failed", err);
    return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  }
}

export async function PATCH(request: NextRequest) {
  const { error } = adminAuth(request);
  if (error) return error;

  try {
    const { id, status, internalNotes } = await request.json();
    if (!id || !ObjectId.isValid(String(id))) return NextResponse.json({ error: "Valid application ID required" }, { status: 400 });

    const update: Record<string, unknown> = { updatedAt: new Date() };
    if (status !== undefined) {
      if (!(CAREER_STATUSES as readonly string[]).includes(String(status))) return NextResponse.json({ error: "Invalid status" }, { status: 400 });
      update.status = String(status);
    }
    if (internalNotes !== undefined) update.internalNotes = String(internalNotes).slice(0, 4000);

    const db = await getMongoDb();
    const result = await db.collection("career_applications").updateOne({ _id: new ObjectId(String(id)) }, { $set: update });
    if (!result.matchedCount) return NextResponse.json({ error: "Application not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Career application update failed", err);
    return NextResponse.json({ error: "Update failed" }, { status: 503 });
  }
}

/** Deleting an application also deletes its CV file. This cannot be undone. */
export async function DELETE(request: NextRequest) {
  const { error } = adminAuth(request);
  if (error) return error;

  try {
    const id = new URL(request.url).searchParams.get("id") || "";
    if (!ObjectId.isValid(id)) return NextResponse.json({ error: "Valid application ID required" }, { status: 400 });

    const db = await getMongoDb();
    const applications = db.collection("career_applications");
    const doc = await applications.findOne({ _id: new ObjectId(id) });
    if (!doc) return NextResponse.json({ error: "Application not found" }, { status: 404 });
    if (doc.cvId) await db.collection("career_cvs").deleteOne({ _id: doc.cvId });
    await applications.deleteOne({ _id: doc._id });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Career application delete failed", err);
    return NextResponse.json({ error: "Delete failed" }, { status: 503 });
  }
}
