import { NextRequest, NextResponse } from "next/server";
import { getMongoDb } from "@/lib/mongodb";

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function limited(ip: string) {
  const now = Date.now();
  const current = rateLimitMap.get(ip);
  if (!current || now > current.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60_000 });
    return false;
  }
  current.count += 1;
  return current.count > 5;
}

function clean(value: unknown, max = 500) {
  return String(value || "").trim().slice(0, max);
}

function cleanList(value: unknown, maxItems = 20) {
  if (!Array.isArray(value)) return [];
  return value.slice(0, maxItems).map((item) => clean(item, 120)).filter(Boolean);
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (limited(ip)) {
      return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
    }

    const body = await request.json();
    if (body.website) return NextResponse.json({ success: true });

    const email = clean(body.email, 180).toLowerCase();
    const now = new Date();
    const document = {
      brandName: clean(body.brandName, 180),
      link: clean(body.link, 500),
      stage: clean(body.stage, 100),
      launchDate: clean(body.launchDate, 40),
      launchTbd: Boolean(body.launchTbd),
      categories: cleanList(body.categories),
      description: clean(body.description, 700),
      positioning: clean(body.positioning, 100),
      audiences: cleanList(body.audiences),
      markets: cleanList(body.markets),
      city: clean(body.city, 180),
      assets: cleanList(body.assets),
      needs: cleanList(body.needs),
      platforms: cleanList(body.platforms),
      paidAds: clean(body.paidAds, 100),
      adBudget: clean(body.adBudget, 100),
      goals: cleanList(body.goals, 3),
      notes: clean(body.notes, 1500),
      referenceBrand: clean(body.referenceBrand, 500),
      name: clean(body.name, 180),
      company: clean(body.company, 180),
      email,
      phone: clean(body.phone, 80),
      communication: clean(body.communication, 80),
      source: clean(body.source, 100) || "Brand Discovery Brief",
      landingPage: clean(body.landingPage, 300),
      referrer: clean(body.referrer, 500),
      utmSource: clean(body.utmSource, 180),
      utmMedium: clean(body.utmMedium, 180),
      utmCampaign: clean(body.utmCampaign, 180),
      status: "new",
      internalNotes: "",
      submittedAt: now,
      createdAt: now,
      updatedAt: now,
    };

    if (!document.brandName || !document.stage || document.categories.length === 0) {
      return NextResponse.json({ error: "Brand name, stage, and category are required." }, { status: 400 });
    }
    if (document.markets.length === 0 || document.needs.length === 0 || document.goals.length === 0) {
      return NextResponse.json({ error: "Please complete the required discovery selections." }, { status: 400 });
    }
    if (!document.name || !document.company || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(document.email)) {
      return NextResponse.json({ error: "A valid name, company, and email are required." }, { status: 400 });
    }

    const db = await getMongoDb();
    const result = await db.collection("discovery_briefs").insertOne(document);

    return NextResponse.json({ success: true, id: result.insertedId.toString() });
  } catch (error) {
    console.error("Discovery database save failed", error);
    return NextResponse.json(
      { error: "We could not save your brief right now. Please try again." },
      { status: 503 },
    );
  }
}
