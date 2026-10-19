import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getMongoDb } from "@/lib/mongodb";
import { verifyToken } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const session = verifyToken(request.cookies.get("admin_token")?.value || "");
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (session.role !== "master_admin" && session.role !== "admin") {
    return NextResponse.json({ error: "Only admins can open the CV bank." }, { status: 403 });
  }

  const id = new URL(request.url).searchParams.get("id") || "";
  if (!ObjectId.isValid(id)) return NextResponse.json({ error: "Valid CV ID required" }, { status: 400 });

  try {
    const db = await getMongoDb();
    const cv = await db.collection("career_cvs").findOne({ _id: new ObjectId(id) });
    if (!cv) return NextResponse.json({ error: "CV not found" }, { status: 404 });

    const bytes = new Uint8Array(cv.data.buffer.subarray(0, cv.data.length()));
    const filename = String(cv.filename || "cv").replace(/[^\w.\- ()]/g, "_");
    return new NextResponse(bytes, {
      headers: {
        "Content-Type": String(cv.mimeType || "application/octet-stream"),
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": String(bytes.byteLength),
        "Cache-Control": "private, no-store, max-age=0",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (err) {
    console.error("CV download failed", err);
    return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  }
}
