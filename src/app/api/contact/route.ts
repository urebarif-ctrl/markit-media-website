import { NextRequest, NextResponse } from "next/server";

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function getRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60_000 });
    return false;
  }
  entry.count++;
  if (entry.count > 5) return true;
  return false;
}

function sanitize(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .trim();
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (getRateLimit(ip)) {
      return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
    }

    const body = await request.json();
    const { name, email, company, phone, service, budget, message } = body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(String(email))) {
      return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
    }

    if (!name || String(name).trim().length < 2) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }

    if (!message || String(message).trim().length < 10) {
      return NextResponse.json({ error: "Message must be at least 10 characters." }, { status: 400 });
    }

    if (body.website) {
      return NextResponse.json({ success: true });
    }

    const sanitizedData = {
      name: sanitize(String(name)),
      email: sanitize(String(email)),
      company: sanitize(String(company || "")),
      phone: sanitize(String(phone || "")),
      service: sanitize(String(service || "")),
      budget: sanitize(String(budget || "")),
      message: sanitize(String(message)),
      submittedAt: new Date().toISOString(),
      ip,
    };

    try {
      const { getDb } = await import("@/lib/db");
      const db = getDb();
      db.prepare(`
        INSERT INTO leads (name, email, company, phone, service, budget, message, submitted_at, ip)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        sanitizedData.name,
        sanitizedData.email,
        sanitizedData.company,
        sanitizedData.phone,
        sanitizedData.service,
        sanitizedData.budget,
        sanitizedData.message,
        sanitizedData.submittedAt,
        sanitizedData.ip,
      );
    } catch {
      console.error("Failed to save lead to database");
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }
}
