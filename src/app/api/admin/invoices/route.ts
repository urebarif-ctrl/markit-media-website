import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

function auth(req: NextRequest) {
  return verifyToken(req.cookies.get("admin_token")?.value || "");
}

function nextInvoiceNumber(db: ReturnType<typeof getDb>): string {
  const year = new Date().getFullYear();
  const row = db.prepare("SELECT invoice_number FROM invoices WHERE invoice_number LIKE ? ORDER BY id DESC LIMIT 1").get(`MM-${year}-%`) as { invoice_number: string } | undefined;
  const seq = row ? parseInt(row.invoice_number.split("-").pop() || "0", 10) + 1 : 1;
  return `MM-${year}-${String(seq).padStart(4, "0")}`;
}

export async function GET(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = getDb();
  const u = new URL(req.url);
  const status = u.searchParams.get("status") || "";

  let sql = "SELECT * FROM invoices";
  const params: unknown[] = [];
  if (status) { sql += " WHERE status = ?"; params.push(status); }
  sql += " ORDER BY created_at DESC";

  return NextResponse.json({ invoices: db.prepare(sql).all(...params) });
}

export async function POST(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const { proposal_id, client_name, client_email, client_company, client_address, items, tax_rate, currency, due_date, notes } = body;

  if (!client_name?.trim()) return NextResponse.json({ error: "Client name is required" }, { status: 400 });

  const db = getDb();
  const lineItems = Array.isArray(items) ? items : [];
  const subtotal = lineItems.reduce((s: number, i: { amount?: number }) => s + (Number(i.amount) || 0), 0);
  const rate = Number(tax_rate) || 0;
  const taxAmt = Math.round(subtotal * rate) / 100;
  const total = subtotal + taxAmt;
  const now = new Date().toISOString();
  const invoiceNumber = nextInvoiceNumber(db);

  const result = db.prepare(`
    INSERT INTO invoices (invoice_number, proposal_id, client_name, client_email, client_company, client_address, items, subtotal, tax_rate, tax_amount, total, currency, status, due_date, notes, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'draft', ?, ?, ?, ?)
  `).run(
    invoiceNumber,
    proposal_id || null,
    client_name.trim(),
    (client_email || "").trim(),
    (client_company || "").trim(),
    (client_address || "").trim(),
    JSON.stringify(lineItems),
    subtotal, rate, taxAmt, total,
    (currency || "PKR").trim(),
    due_date || null,
    (notes || "").trim(),
    now, now
  );

  const invoice = db.prepare("SELECT * FROM invoices WHERE id = ?").get(result.lastInsertRowid);
  return NextResponse.json({ invoice }, { status: 201 });
}

export async function PUT(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const { id, ...fields } = body;
  if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

  const db = getDb();
  const existing = db.prepare("SELECT * FROM invoices WHERE id = ?").get(id);
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (fields.items) {
    const lineItems = Array.isArray(fields.items) ? fields.items : [];
    fields.subtotal = lineItems.reduce((s: number, i: { amount?: number }) => s + (Number(i.amount) || 0), 0);
    const rate = fields.tax_rate ?? (existing as Record<string, unknown>).tax_rate ?? 0;
    fields.tax_rate = Number(rate);
    fields.tax_amount = Math.round(fields.subtotal * fields.tax_rate) / 100;
    fields.total = fields.subtotal + fields.tax_amount;
  }

  const allowed = ["client_name", "client_email", "client_company", "client_address", "items", "subtotal", "tax_rate", "tax_amount", "total", "currency", "status", "due_date", "paid_at", "notes"];
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

  db.prepare(`UPDATE invoices SET ${sets.join(", ")} WHERE id = ?`).run(...params);
  const updated = db.prepare("SELECT * FROM invoices WHERE id = ?").get(id);
  return NextResponse.json({ invoice: updated });
}

export async function DELETE(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });
  const db = getDb();
  db.prepare("DELETE FROM invoices WHERE id = ?").run(id);
  return NextResponse.json({ ok: true });
}
