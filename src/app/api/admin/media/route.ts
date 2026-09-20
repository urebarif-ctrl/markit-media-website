import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { verifyToken } from "@/lib/auth";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

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

  const db = getDb();
  const { searchParams } = new URL(request.url);
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const limit = Math.min(100, Math.max(1, Number(searchParams.get("limit")) || 30));
  const folder = searchParams.get("folder") || "";
  const offset = (page - 1) * limit;

  let where = "1=1";
  const params: (string | number)[] = [];

  if (folder) {
    where += " AND folder = ?";
    params.push(folder);
  }

  const total = (db.prepare(`SELECT COUNT(*) as count FROM media WHERE ${where}`).get(...params) as { count: number }).count;
  const media = db.prepare(`SELECT * FROM media WHERE ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`).all(...params, limit, offset);

  return NextResponse.json({ media, total, page, limit, totalPages: Math.ceil(total / limit) });
}

export async function POST(request: NextRequest) {
  const auth = getAuth(request);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const folder = String(formData.get("folder") || "general");
  const altText = String(formData.get("alt_text") || "");

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif", "image/svg+xml", "video/mp4", "video/webm", "application/pdf"];
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({ error: "File type not allowed" }, { status: 400 });
  }

  const maxSize = 50 * 1024 * 1024;
  if (file.size > maxSize) {
    return NextResponse.json({ error: "File too large (max 50MB)" }, { status: 400 });
  }

  const ext = file.name.split(".").pop()?.toLowerCase() || "bin";
  const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads", folder);

  await mkdir(uploadDir, { recursive: true });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  await writeFile(path.join(uploadDir, safeName), buffer);

  const url = `/uploads/${folder}/${safeName}`;

  const db = getDb();
  const result = db.prepare(`
    INSERT INTO media (filename, original_name, mime_type, size, alt_text, folder, url)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(safeName, file.name, file.type, file.size, altText, folder, url);

  return NextResponse.json({
    id: result.lastInsertRowid,
    url,
    filename: safeName,
    original_name: file.name,
    success: true,
  }, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  const auth = getAuth(request);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await request.json();
  if (!id) return NextResponse.json({ error: "Media ID required" }, { status: 400 });

  const db = getDb();
  db.prepare("DELETE FROM media WHERE id = ?").run(id);
  return NextResponse.json({ success: true });
}
