import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { verifyToken } from "@/lib/auth";
import { Resend } from "resend";

function auth(req: NextRequest) {
  return verifyToken(req.cookies.get("admin_token")?.value || "");
}

interface InvItem {
  description: string;
  qty: number;
  rate: number;
  amount: number;
}

interface InvoiceRow {
  id: number;
  invoice_number: string;
  client_name: string;
  client_email: string;
  client_company: string;
  client_address: string;
  items: string;
  subtotal: number;
  tax_rate: number;
  tax_amount: number;
  total: number;
  currency: string;
  status: string;
  due_date: string | null;
  notes: string;
  created_at: string;
}

function fmt(currency: string, amount: number) {
  return `${currency} ${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function fmtDate(d: string | null) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function buildEmailHtml(inv: InvoiceRow, viewUrl: string): string {
  const items: InvItem[] = JSON.parse(inv.items || "[]");

  const itemRows = items
    .map(
      (item) => `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #e4e4e7;font-size:14px">${item.description}</td>
          <td style="padding:10px 0;border-bottom:1px solid #e4e4e7;font-size:14px;text-align:center">${item.qty}</td>
          <td style="padding:10px 0;border-bottom:1px solid #e4e4e7;font-size:14px;text-align:right">${fmt(inv.currency, item.rate)}</td>
          <td style="padding:10px 0;border-bottom:1px solid #e4e4e7;font-size:14px;text-align:right;font-weight:500">${fmt(inv.currency, item.amount)}</td>
        </tr>`
    )
    .join("");

  const taxRow =
    inv.tax_rate > 0
      ? `<tr>
          <td style="padding:6px 0;font-size:14px;color:#71717a" colspan="3" align="right">Tax (${inv.tax_rate}%)</td>
          <td style="padding:6px 0;font-size:14px;text-align:right;font-weight:500">${fmt(inv.currency, inv.tax_amount)}</td>
        </tr>`
      : "";

  const notesBlock = inv.notes
    ? `<div style="border-top:1px solid #e4e4e7;padding-top:20px;margin-top:20px">
        <p style="font-size:10px;text-transform:uppercase;letter-spacing:2px;color:#a1a1aa;margin:0 0 8px">Notes</p>
        <p style="font-size:14px;color:#52525b;margin:0;white-space:pre-line">${inv.notes}</p>
      </div>`
    : "";

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
  <div style="max-width:640px;margin:0 auto;padding:40px 20px">
    <div style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.08)">
      <!-- Header -->
      <div style="background:#000;color:#fff;padding:32px 40px">
        <table width="100%" cellpadding="0" cellspacing="0"><tr>
          <td><img src="https://themarkitmedia.com/images/branding/logo-white-full.png" alt="Markit Media" style="height:32px;width:auto" /></td>
          <td align="right">
            <p style="margin:0;font-size:24px;font-weight:800;letter-spacing:-.5px">INVOICE</p>
            <p style="margin:4px 0 0;font-size:13px;color:#a1a1aa">${inv.invoice_number}</p>
          </td>
        </tr></table>
      </div>

      <div style="padding:32px 40px">
        <!-- Meta -->
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px">
          <tr>
            <td style="vertical-align:top">
              <p style="font-size:10px;text-transform:uppercase;letter-spacing:2px;color:#a1a1aa;margin:0 0 6px">Bill to</p>
              <p style="margin:0;font-size:14px;font-weight:700">${inv.client_name}</p>
              ${inv.client_company ? `<p style="margin:2px 0 0;font-size:14px;color:#52525b">${inv.client_company}</p>` : ""}
              ${inv.client_address ? `<p style="margin:4px 0 0;font-size:13px;color:#71717a;white-space:pre-line">${inv.client_address}</p>` : ""}
              ${inv.client_email ? `<p style="margin:4px 0 0;font-size:13px;color:#71717a">${inv.client_email}</p>` : ""}
            </td>
            <td style="vertical-align:top;text-align:right">
              <p style="margin:0;font-size:13px;color:#71717a"><strong style="color:#3f3f46">Date:</strong> ${fmtDate(inv.created_at)}</p>
              ${inv.due_date ? `<p style="margin:4px 0 0;font-size:13px;color:#71717a"><strong style="color:#3f3f46">Due:</strong> ${fmtDate(inv.due_date)}</p>` : ""}
            </td>
          </tr>
        </table>

        <!-- Items -->
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px">
          <tr style="border-bottom:2px solid #000">
            <th style="padding:10px 0;font-size:13px;font-weight:700;text-align:left">Description</th>
            <th style="padding:10px 0;font-size:13px;font-weight:700;text-align:center;width:50px">Qty</th>
            <th style="padding:10px 0;font-size:13px;font-weight:700;text-align:right;width:100px">Rate</th>
            <th style="padding:10px 0;font-size:13px;font-weight:700;text-align:right;width:100px">Amount</th>
          </tr>
          ${itemRows}
        </table>

        <!-- Totals -->
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px">
          <tr>
            <td style="padding:6px 0;font-size:14px;color:#71717a" colspan="3" align="right">Subtotal</td>
            <td style="padding:6px 0;font-size:14px;text-align:right;font-weight:500;width:120px">${fmt(inv.currency, inv.subtotal)}</td>
          </tr>
          ${taxRow}
          <tr style="border-top:2px solid #000">
            <td style="padding:10px 0;font-size:16px;font-weight:800" colspan="3" align="right">Total</td>
            <td style="padding:10px 0;font-size:16px;font-weight:800;text-align:right">${fmt(inv.currency, inv.total)}</td>
          </tr>
        </table>

        ${notesBlock}

        <!-- CTA -->
        <div style="text-align:center;margin-top:32px">
          <a href="${viewUrl}" style="display:inline-block;background:#000;color:#fff;text-decoration:none;padding:14px 32px;border-radius:8px;font-weight:700;font-size:14px">View Invoice</a>
        </div>

        <!-- Footer -->
        <div style="border-top:1px solid #e4e4e7;margin-top:32px;padding-top:20px;text-align:center">
          <p style="font-size:14px;font-weight:600;color:#3f3f46;margin:0">Thank you for your business</p>
          <p style="font-size:12px;color:#a1a1aa;margin:8px 0 0">Markit Media &middot; themarkitmedia.com</p>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  if (!auth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await req.json();
  if (!id) {
    return NextResponse.json(
      { error: "Invoice ID is required" },
      { status: 400 }
    );
  }

  const db = getDb();
  const inv = db
    .prepare("SELECT * FROM invoices WHERE id = ?")
    .get(id) as InvoiceRow | undefined;

  if (!inv) {
    return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
  }

  if (!inv.client_email?.trim()) {
    return NextResponse.json(
      { error: "Invoice has no client email address" },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Email service not configured" },
      { status: 500 }
    );
  }

  const origin =
    process.env.NEXT_PUBLIC_SITE_URL ||
    req.headers.get("origin") ||
    "https://themarkitmedia.com";
  const viewUrl = `${origin}/en/invoice/${inv.id}`;

  const html = buildEmailHtml(inv, viewUrl);

  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      from: "Markit Media <invoices@themarkitmedia.com>",
      to: inv.client_email.trim(),
      subject: `Invoice ${inv.invoice_number} from Markit Media`,
      html,
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to send email";
    return NextResponse.json({ error: message }, { status: 500 });
  }

  // Update status from draft to sent
  if (inv.status === "draft") {
    db.prepare(
      "UPDATE invoices SET status = 'sent', updated_at = ? WHERE id = ?"
    ).run(new Date().toISOString(), id);
  }

  const updated = db.prepare("SELECT * FROM invoices WHERE id = ?").get(id);
  return NextResponse.json({ ok: true, invoice: updated });
}
