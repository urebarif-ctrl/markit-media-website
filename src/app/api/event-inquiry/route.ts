import { NextRequest, NextResponse } from "next/server";

/**
 * Event collaboration inquiry endpoint (PREVIEW).
 * Safe by default: this route NEVER stores, emails or forwards anything.
 *  - PREVIEW_MODE=true  -> validates and returns { ok, preview: true } (test submissions only).
 *  - anything else      -> 503 "not enabled". A live handler (database, email, notifications) does not exist yet and needs explicit approval.
 * It deliberately does not use the lead database, the rate-limit table, Resend or the notification helpers.
 */
const hits = new Map<string, { n: number; reset: number }>();
function limited(ip: string, max = 6, windowMs = 10 * 60_000) {
  const now = Date.now();
  const e = hits.get(ip);
  if (!e || now > e.reset) { hits.set(ip, { n: 1, reset: now + windowMs }); return false; }
  e.n += 1;
  return e.n > max;
}
const s = (v: unknown, max: number) => String(v ?? "").replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, max);
const COLLAB = new Set(["media-partner", "creative-partner", "digital-partner", "not-sure"]);

export async function POST(request: NextRequest) {
  if (process.env.PREVIEW_MODE !== "true") return NextResponse.json({ error: "Event inquiries are not enabled yet." }, { status: 503 });
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host && new URL(origin).host !== host) return NextResponse.json({ error: "Invalid request." }, { status: 403 });
  const len = Number(request.headers.get("content-length") || 0);
  if (len > 20_000) return NextResponse.json({ error: "Request too large." }, { status: 413 });
  const ip = (request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for") || "unknown").split(",")[0].trim();
  if (limited(ip)) return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  let b: Record<string, unknown>;
  try { b = await request.json(); } catch { return NextResponse.json({ error: "Invalid request body." }, { status: 400 }); }
  // Spam controls: honeypot and a minimum time on the form. Bots get a normal-looking success and nothing else happens.
  const opened = Number(b.openedAt || 0);
  if (s(b.website, 50) || !opened || Date.now() - opened < 3000) return NextResponse.json({ ok: true, preview: true });
  const d = {
    name: s(b.name, 120), email: s(b.email, 254), phone: s(b.phone, 20), eventName: s(b.eventName, 160),
    collabType: s(b.collabType, 40), message: s(b.message, 3000), consent: b.consent === true,
  };
  if (d.name.length < 2) return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
  if (d.phone && !/^\+?[0-9 ()\-]{7,20}$/.test(d.phone)) return NextResponse.json({ error: "Please enter a valid phone number." }, { status: 400 });
  if (d.eventName.length < 2) return NextResponse.json({ error: "Please tell us the event name." }, { status: 400 });
  if (!COLLAB.has(d.collabType)) return NextResponse.json({ error: "Please choose how you would like to collaborate." }, { status: 400 });
  if (d.message.length < 20) return NextResponse.json({ error: "Please tell us a little more about the event." }, { status: 400 });
  if (!d.consent) return NextResponse.json({ error: "Please agree to the privacy policy to continue." }, { status: 400 });
  // Preview: validated, intentionally discarded.
  return NextResponse.json({ ok: true, preview: true });
}
