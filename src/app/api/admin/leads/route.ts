import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
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

  const db = getDb();
  const { searchParams } = new URL(request.url);
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const limit = Math.min(100, Math.max(1, Number(searchParams.get("limit")) || 20));
  const status = searchParams.get("status") || "";
  const search = searchParams.get("search") || "";
  const offset = (page - 1) * limit;

  let where = "1=1";
  const params: (string | number)[] = [];

  if (status) {
    where += " AND status = ?";
    params.push(status);
  }
  if (search) {
    where += " AND (name LIKE ? OR email LIKE ? OR company LIKE ?)";
    const s = `%${search}%`;
    params.push(s, s, s);
  }

  const total = (db.prepare(`SELECT COUNT(*) as count FROM leads WHERE ${where}`).get(...params) as { count: number }).count;
  const leads = db.prepare(`SELECT * FROM leads WHERE ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`).all(...params, limit, offset);

  return NextResponse.json({ leads, total, page, limit, totalPages: Math.ceil(total / limit) });
}

export async function PATCH(request: NextRequest) {
  const auth = getAuth(request);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, status, notes } = await request.json();
  if (!id) return NextResponse.json({ error: "Lead ID required" }, { status: 400 });

  const db = getDb();
  if (status) db.prepare("UPDATE leads SET status = ? WHERE id = ?").run(status, id);
  if (notes !== undefined) db.prepare("UPDATE leads SET notes = ? WHERE id = ?").run(notes, id);

  return NextResponse.json({ success: true });
}
