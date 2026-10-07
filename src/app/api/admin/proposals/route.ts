import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { verifyToken } from "@/lib/auth";
import { randomBytes } from "crypto";

function auth(req: NextRequest) {
  return verifyToken(req.cookies.get("admin_token")?.value || "");
}

function generateSlug(company: string): string {
  const base = company.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 30);
  return `${base}-${randomBytes(6).toString("hex")}`;
}

export async function GET(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = getDb();
  const u = new URL(req.url);
  const status = u.searchParams.get("status") || "";
  const search = (u.searchParams.get("search") || "").trim();

  let sql = "SELECT * FROM proposals";
  const params: unknown[] = [];
  const clauses: string[] = [];

  if (status) { clauses.push("status = ?"); params.push(status); }
  if (search) { clauses.push("(client_name LIKE ? OR client_company LIKE ?)"); params.push(`%${search}%`, `%${search}%`); }
  if (clauses.length) sql += " WHERE " + clauses.join(" AND ");
  sql += " ORDER BY created_at DESC";

  const rows = db.prepare(sql).all(...params);
  return NextResponse.json({ proposals: rows });
}

export async function POST(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const { client_name, client_email, client_company, title, subtitle, intro, packages, commercial_notes, case_studies, whatsapp, currency, valid_until } = body;

  if (!client_name?.trim()) return NextResponse.json({ error: "Client name is required" }, { status: 400 });

  const db = getDb();
  const slug = generateSlug(client_company || client_name);
  const now = new Date().toISOString();

  const result = db.prepare(`
    INSERT INTO proposals (slug, client_name, client_email, client_company, title, subtitle, intro, packages, commercial_notes, case_studies, whatsapp, currency, status, valid_until, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'draft', ?, ?, ?)
  `).run(
    slug,
    client_name.trim(),
    (client_email || "").trim(),
    (client_company || "").trim(),
    (title || "Proposal").trim(),
    (subtitle || "").trim(),
    (intro || "").trim(),
    JSON.stringify(packages || []),
    JSON.stringify(commercial_notes || []),
    JSON.stringify(case_studies || []),
    (whatsapp || "").trim(),
    (currency || "PKR").trim(),
    valid_until || null,
    now, now
  );

  const proposal = db.prepare("SELECT * FROM proposals WHERE id = ?").get(result.lastInsertRowid);
  return NextResponse.json({ proposal }, { status: 201 });
}

export async function PUT(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const { id, ...fields } = body;
  if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

  const db = getDb();
  const existing = db.prepare("SELECT * FROM proposals WHERE id = ?").get(id);
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const allowed = ["client_name", "client_email", "client_company", "title", "subtitle", "intro", "packages", "commercial_notes", "case_studies", "whatsapp", "currency", "status", "valid_until"];
  const sets: string[] = [];
  const params: unknown[] = [];

  for (const key of allowed) {
    if (key in fields) {
      sets.push(`${key} = ?`);
      const val = fields[key];
      params.push(typeof val === "object" ? JSON.stringify(val) : val);
    }
  }

  if (!sets.length) return NextResponse.json({ error: "Nothing to update" }, { status: 400 });

  sets.push("updated_at = ?");
  params.push(new Date().toISOString());
  params.push(id);

  db.prepare(`UPDATE proposals SET ${sets.join(", ")} WHERE id = ?`).run(...params);
  const updated = db.prepare("SELECT * FROM proposals WHERE id = ?").get(id);
  return NextResponse.json({ proposal: updated });
}

export async function DELETE(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });
  const db = getDb();
  db.prepare("DELETE FROM proposals WHERE id = ?").run(id);
  return NextResponse.json({ ok: true });
}
