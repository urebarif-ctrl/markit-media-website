import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getMongoDb } from "@/lib/mongodb";
import { getDb } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

function auth(request: NextRequest) {
  const token = request.cookies.get("admin_token")?.value || "";
  return verifyToken(token);
}

function formatDate(d: Date): string {
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

interface LeadRow {
  id: number;
  name: string;
  email: string;
  service: string;
  status: string;
  created_at: string;
}

interface InvoiceRow {
  id: number;
  invoice_number: string;
  client_name: string;
  total: number;
  currency: string;
  status: string;
  due_date: string;
}

async function buildDigest() {
  const now = new Date();
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  // --- MongoDB queries ---
  const mongo = await getMongoDb();

  const [newFormSubmissions, newSubscribers, config] = await Promise.all([
    mongo
      .collection("form_submissions")
      .find({ createdAt: { $gte: yesterday } })
      .sort({ createdAt: -1 })
      .toArray(),
    mongo
      .collection("newsletter_subscribers")
      .find({ createdAt: { $gte: yesterday } })
      .sort({ createdAt: -1 })
      .toArray(),
    mongo.collection("webhook_config").findOne({}),
  ]);

  // --- SQLite queries ---
  const sqlite = getDb();

  const newLeads = sqlite
    .prepare(
      "SELECT id, name, email, service, status, created_at FROM leads WHERE created_at >= ?",
    )
    .all(yesterday.toISOString()) as LeadRow[];

  const pendingFollowUps = sqlite
    .prepare(
      "SELECT id, name, email, service, status, created_at FROM leads WHERE status = 'new' OR status = 'contacted'",
    )
    .all() as LeadRow[];

  const overdueInvoices = sqlite
    .prepare(
      "SELECT id, invoice_number, client_name, total, currency, status, due_date FROM invoices WHERE status = 'sent' AND due_date < date('now')",
    )
    .all() as InvoiceRow[];

  const monthLeadCount =
    (
      sqlite
        .prepare(
          "SELECT COUNT(*) as cnt FROM leads WHERE created_at >= ?",
        )
        .get(monthStart.toISOString()) as { cnt: number } | undefined
    )?.cnt ?? 0;

  return {
    config,
    now,
    stats: {
      leads: newLeads.length + newFormSubmissions.length,
      subscribers: newSubscribers.length,
      followUps: pendingFollowUps.length,
      overdueInvoices: overdueInvoices.length,
      monthLeads: monthLeadCount,
    },
    newLeads,
    newFormSubmissions,
    newSubscribers,
    pendingFollowUps,
    overdueInvoices,
  };
}

function buildHtml(data: Awaited<ReturnType<typeof buildDigest>>): string {
  const { now, stats, newLeads, newFormSubmissions, pendingFollowUps, overdueInvoices } = data;
  const dateStr = formatDate(now);

  // Combine SQLite leads + Mongo form submissions for the "New Leads" section
  const allNewLeads = [
    ...newLeads.map((l) => ({ name: l.name, service: l.service || "General", source: "Website" })),
    ...newFormSubmissions.map((f: any) => ({
      name: String(f.name || f.email || "Unknown"),
      service: String(f.service || f.type || "General"),
      source: String(f.source || "Form"),
    })),
  ];

  const leadsListHtml =
    allNewLeads.length > 0
      ? allNewLeads
          .map(
            (l) =>
              `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;font-size:14px">${esc(l.name)}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;font-size:14px;color:#555">${esc(l.service)}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;font-size:14px;color:#555">${esc(l.source)}</td></tr>`,
          )
          .join("")
      : `<tr><td colspan="3" style="padding:12px;font-size:14px;color:#888;text-align:center">No new leads in the last 24 hours</td></tr>`;

  const followUpsHtml =
    pendingFollowUps.length > 0
      ? pendingFollowUps
          .slice(0, 15)
          .map(
            (l) =>
              `<tr><td style="padding:6px 12px;border-bottom:1px solid #eee;font-size:13px">${esc(l.name)}</td><td style="padding:6px 12px;border-bottom:1px solid #eee;font-size:13px;color:#555">${esc(l.email)}</td><td style="padding:6px 12px;border-bottom:1px solid #eee;font-size:13px"><span style="background:${l.status === "new" ? "#000" : "#555"};color:#fff;padding:2px 8px;border-radius:4px;font-size:11px;text-transform:uppercase">${esc(l.status)}</span></td></tr>`,
          )
          .join("") +
        (pendingFollowUps.length > 15
          ? `<tr><td colspan="3" style="padding:8px 12px;font-size:13px;color:#888">+ ${pendingFollowUps.length - 15} more</td></tr>`
          : "")
      : `<tr><td colspan="3" style="padding:12px;font-size:14px;color:#888;text-align:center">No pending follow-ups</td></tr>`;

  const overdueHtml =
    overdueInvoices.length > 0
      ? `<div style="margin-top:24px">
          <h2 style="font-size:16px;font-weight:700;margin:0 0 12px;color:#111">Overdue Invoices</h2>
          <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">
            <tr style="background:#fafafa"><th style="padding:8px 12px;text-align:left;font-size:12px;font-weight:600;color:#888;text-transform:uppercase;letter-spacing:.05em;border-bottom:2px solid #eee">Invoice #</th><th style="padding:8px 12px;text-align:left;font-size:12px;font-weight:600;color:#888;text-transform:uppercase;letter-spacing:.05em;border-bottom:2px solid #eee">Client</th><th style="padding:8px 12px;text-align:left;font-size:12px;font-weight:600;color:#888;text-transform:uppercase;letter-spacing:.05em;border-bottom:2px solid #eee">Amount</th><th style="padding:8px 12px;text-align:left;font-size:12px;font-weight:600;color:#888;text-transform:uppercase;letter-spacing:.05em;border-bottom:2px solid #eee">Due</th></tr>
            ${overdueInvoices
              .map(
                (inv) =>
                  `<tr><td style="padding:6px 12px;border-bottom:1px solid #eee;font-size:13px;font-weight:600">${esc(inv.invoice_number)}</td><td style="padding:6px 12px;border-bottom:1px solid #eee;font-size:13px">${esc(inv.client_name)}</td><td style="padding:6px 12px;border-bottom:1px solid #eee;font-size:13px">${esc(inv.currency)} ${Number(inv.total).toLocaleString()}</td><td style="padding:6px 12px;border-bottom:1px solid #eee;font-size:13px;color:#c00">${esc(inv.due_date)}</td></tr>`,
              )
              .join("")}
          </table>
        </div>`
      : "";

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:32px 16px">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.08)">

  <!-- Header -->
  <tr><td style="background:#000;padding:28px 32px;text-align:center">
    <img src="https://themarkitmedia.com/images/logo-black.png" alt="Markit Media" width="140" style="display:inline-block;filter:invert(1)"/>
    <p style="margin:12px 0 0;font-size:13px;color:#aaa;letter-spacing:.1em;text-transform:uppercase">Daily Digest</p>
  </td></tr>

  <!-- Date -->
  <tr><td style="padding:24px 32px 0">
    <p style="margin:0;font-size:14px;color:#666">${dateStr}</p>
  </td></tr>

  <!-- Quick Stats -->
  <tr><td style="padding:20px 32px">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td width="25%" style="text-align:center;padding:16px 8px;background:#fafafa;border-radius:8px">
          <div style="font-size:28px;font-weight:800;color:#000">${stats.leads}</div>
          <div style="font-size:11px;color:#888;text-transform:uppercase;letter-spacing:.05em;margin-top:4px">New Leads</div>
        </td>
        <td width="4"></td>
        <td width="25%" style="text-align:center;padding:16px 8px;background:#fafafa;border-radius:8px">
          <div style="font-size:28px;font-weight:800;color:#000">${stats.subscribers}</div>
          <div style="font-size:11px;color:#888;text-transform:uppercase;letter-spacing:.05em;margin-top:4px">Subscribers</div>
        </td>
        <td width="4"></td>
        <td width="25%" style="text-align:center;padding:16px 8px;background:#fafafa;border-radius:8px">
          <div style="font-size:28px;font-weight:800;color:#000">${stats.followUps}</div>
          <div style="font-size:11px;color:#888;text-transform:uppercase;letter-spacing:.05em;margin-top:4px">Follow-ups</div>
        </td>
        <td width="4"></td>
        <td width="25%" style="text-align:center;padding:16px 8px;background:#fafafa;border-radius:8px">
          <div style="font-size:28px;font-weight:800;color:#000">${stats.overdueInvoices}</div>
          <div style="font-size:11px;color:#888;text-transform:uppercase;letter-spacing:.05em;margin-top:4px">Overdue</div>
        </td>
      </tr>
    </table>
  </td></tr>

  <!-- Divider -->
  <tr><td style="padding:0 32px"><hr style="border:none;border-top:1px solid #eee;margin:0"/></td></tr>

  <!-- New Leads -->
  <tr><td style="padding:24px 32px">
    <h2 style="font-size:16px;font-weight:700;margin:0 0 12px;color:#111">New Leads <span style="font-weight:400;color:#888">(${stats.leads})</span></h2>
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">
      <tr style="background:#fafafa"><th style="padding:8px 12px;text-align:left;font-size:12px;font-weight:600;color:#888;text-transform:uppercase;letter-spacing:.05em;border-bottom:2px solid #eee">Name</th><th style="padding:8px 12px;text-align:left;font-size:12px;font-weight:600;color:#888;text-transform:uppercase;letter-spacing:.05em;border-bottom:2px solid #eee">Service</th><th style="padding:8px 12px;text-align:left;font-size:12px;font-weight:600;color:#888;text-transform:uppercase;letter-spacing:.05em;border-bottom:2px solid #eee">Source</th></tr>
      ${leadsListHtml}
    </table>
  </td></tr>

  <!-- Divider -->
  <tr><td style="padding:0 32px"><hr style="border:none;border-top:1px solid #eee;margin:0"/></td></tr>

  <!-- Pending Follow-ups -->
  <tr><td style="padding:24px 32px">
    <h2 style="font-size:16px;font-weight:700;margin:0 0 12px;color:#111">Pending Follow-ups <span style="font-weight:400;color:#888">(${stats.followUps})</span></h2>
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">
      <tr style="background:#fafafa"><th style="padding:8px 12px;text-align:left;font-size:12px;font-weight:600;color:#888;text-transform:uppercase;letter-spacing:.05em;border-bottom:2px solid #eee">Name</th><th style="padding:8px 12px;text-align:left;font-size:12px;font-weight:600;color:#888;text-transform:uppercase;letter-spacing:.05em;border-bottom:2px solid #eee">Email</th><th style="padding:8px 12px;text-align:left;font-size:12px;font-weight:600;color:#888;text-transform:uppercase;letter-spacing:.05em;border-bottom:2px solid #eee">Status</th></tr>
      ${followUpsHtml}
    </table>
  </td></tr>

  ${overdueHtml ? `<tr><td style="padding:0 32px"><hr style="border:none;border-top:1px solid #eee;margin:0"/></td></tr><tr><td style="padding:24px 32px">${overdueHtml}</td></tr>` : ""}

  <!-- Divider -->
  <tr><td style="padding:0 32px"><hr style="border:none;border-top:1px solid #eee;margin:0"/></td></tr>

  <!-- Month Stats -->
  <tr><td style="padding:24px 32px">
    <h2 style="font-size:16px;font-weight:700;margin:0 0 8px;color:#111">This Month</h2>
    <p style="margin:0;font-size:14px;color:#555"><strong>${stats.monthLeads}</strong> total leads this month</p>
  </td></tr>

  <!-- CTA -->
  <tr><td style="padding:8px 32px 32px;text-align:center">
    <a href="https://dashboard.themarkitmedia.com" style="display:inline-block;background:#000;color:#fff;padding:14px 32px;border-radius:8px;font-size:14px;font-weight:700;text-decoration:none;letter-spacing:.02em">Open Dashboard</a>
  </td></tr>

  <!-- Footer -->
  <tr><td style="background:#fafafa;padding:20px 32px;text-align:center;border-top:1px solid #eee">
    <p style="margin:0;font-size:12px;color:#999">Markit Media &mdash; Daily Digest</p>
    <p style="margin:4px 0 0;font-size:11px;color:#bbb">This is an automated summary. Manage settings in your dashboard.</p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function sendDigest(data: Awaited<ReturnType<typeof buildDigest>>) {
  const digestEmail = data.config?.digestEmail;
  if (!digestEmail) {
    return { skipped: true, reason: "No digest email configured" };
  }

  if (!process.env.RESEND_API_KEY) {
    return { skipped: true, reason: "RESEND_API_KEY not configured" };
  }

  const html = buildHtml(data);
  const dateStr = formatDate(data.now);

  const resend = new Resend(process.env.RESEND_API_KEY);
  const result = await resend.emails.send({
    from: "Markit Media <digest@themarkitmedia.com>",
    to: digestEmail,
    subject: `Daily Digest — ${dateStr}`,
    html,
  });

  if (result.error) {
    throw new Error(result.error.message || "Email could not be sent");
  }

  return {
    sent: true,
    stats: data.stats,
    emailId: result.data?.id || null,
  };
}

// GET - called by Vercel cron
export async function GET(request: NextRequest) {
  try {
    const key = request.nextUrl.searchParams.get("key");
    if (!key || key !== process.env.DIGEST_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await buildDigest();

    // Check if digest is enabled
    if (!data.config?.enabled || !data.config?.emailDigest) {
      return NextResponse.json({ skipped: true, reason: "Digest is not enabled" });
    }

    if (!data.config.digestEmail) {
      return NextResponse.json({ skipped: true, reason: "No digest email configured" });
    }

    const result = await sendDigest(data);
    return NextResponse.json(result);
  } catch (e) {
    console.error("Digest GET failed", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Digest failed" },
      { status: 500 },
    );
  }
}

// POST - manual trigger from settings UI
export async function POST(request: NextRequest) {
  if (!auth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await buildDigest();
    const result = await sendDigest(data);
    return NextResponse.json(result);
  } catch (e) {
    console.error("Digest POST failed", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Digest failed" },
      { status: 500 },
    );
  }
}
