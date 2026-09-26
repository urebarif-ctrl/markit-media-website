import { NextRequest, NextResponse } from "next/server";
import { saveFormSubmission } from "@/lib/mongodb";

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function getRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60_000 });
    return false;
  }
  entry.count++;
  return entry.count > 3;
}

async function syncSubscriberToKit(email: string): Promise<boolean> {
  const apiKey = process.env.KIT_API_KEY;
  if (!apiKey) return false;

  const response = await fetch("https://api.kit.com/v4/subscribers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Kit-Api-Key": apiKey,
    },
    body: JSON.stringify({ email_address: email }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Kit subscriber sync failed: ${response.status}`);
  }

  return true;
}

async function saveLegacySubscriber(email: string, source: string, ip: string) {
  try {
    const { getDb } = await import("@/lib/db");
    const db = getDb();
    db.prepare(
      `INSERT OR IGNORE INTO subscribers (email, source, ip) VALUES (?, ?, ?)`,
    ).run(email, source, ip);
  } catch (error) {
    console.error("Legacy subscriber fallback failed", error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown";

    if (getRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    const body = await request.json();
    const { email, source } = body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(String(email))) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 },
      );
    }

    // Honeypot submissions are acknowledged but never persisted or synced.
    if (body.website) {
      return NextResponse.json({ success: true });
    }

    const sanitizedEmail = String(email).trim().toLowerCase();
    const sanitizedSource = String(source || "website")
      .replace(/[<>"'&]/g, "")
      .slice(0, 50);

    let mongoSaved = false;
    let kitSynced = false;

    try {
      await saveFormSubmission("newsletter", {
        email: sanitizedEmail,
        source: sanitizedSource,
        consentedAt: new Date(),
      });
      mongoSaved = true;
    } catch (error) {
      console.error("Failed to save newsletter subscriber to MongoDB", error);
    }

    try {
      kitSynced = await syncSubscriberToKit(sanitizedEmail);
    } catch (error) {
      console.error("Failed to sync newsletter subscriber to Kit", error);
    }

    // Keep the existing local subscriber store as a fallback while the
    // MongoDB/Kit integrations are being rolled out.
    if (!mongoSaved || !kitSynced) {
      await saveLegacySubscriber(sanitizedEmail, sanitizedSource, ip);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request." },
      { status: 400 },
    );
  }
}
