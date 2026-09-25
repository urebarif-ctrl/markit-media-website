import { saveFormSubmission } from "@/lib/mongodb";
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
  return entry.count > 3;
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

    if (body.website) {
      return NextResponse.json({ success: true });
    }

    const sanitizedEmail = String(email).trim().toLowerCase();
    const sanitizedSource = String(source || "website")
      .replace(/[<>"'&]/g, "")
      .slice(0, 50);

    try {
      await saveFormSubmission("newsletter", {
        email: sanitizedEmail,
        source: sanitizedSource,
        ip,
        consentedAt: new Date(),
      });
    } catch (error) {
      console.error("Failed to save newsletter subscriber to MongoDB", error);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request." },
      { status: 400 },
    );
  }
}
