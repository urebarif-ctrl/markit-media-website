import { NextRequest, NextResponse } from "next/server";
import { getMongoDb } from "@/lib/mongodb";
import { verifyToken } from "@/lib/auth";

function auth(request: NextRequest) {
  const token = request.cookies.get("admin_token")?.value || "";
  return verifyToken(token);
}

export async function GET(request: NextRequest) {
  if (!auth(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const db = await getMongoDb();
    const config = await db.collection("webhook_config").findOne({});
    return NextResponse.json({
      slackWebhookUrl: config?.slackWebhookUrl || "",
      emailDigest: config?.emailDigest || false,
      digestEmail: config?.digestEmail || "",
      digestFrequency: config?.digestFrequency || "daily",
      enabled: config?.enabled || false,
    });
  } catch (e) {
    console.error("Failed to load webhook config", e);
    return NextResponse.json({ error: "Could not load webhook configuration" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!auth(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await request.json();
    const config = {
      slackWebhookUrl: String(body.slackWebhookUrl || "").trim(),
      emailDigest: Boolean(body.emailDigest),
      digestEmail: String(body.digestEmail || "").trim(),
      digestFrequency: (body.digestFrequency === "weekly" ? "weekly" : "daily") as "daily" | "weekly",
      enabled: Boolean(body.enabled),
      updatedAt: new Date(),
    };
    if (config.slackWebhookUrl && !/^https:\/\/hooks\.slack\.com\//.test(config.slackWebhookUrl)) {
      return NextResponse.json({ error: "Invalid Slack webhook URL" }, { status: 400 });
    }
    if (config.emailDigest && config.digestEmail && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(config.digestEmail)) {
      return NextResponse.json({ error: "Invalid digest email address" }, { status: 400 });
    }
    const db = await getMongoDb();
    await db.collection("webhook_config").updateOne(
      {},
      { $set: config, $setOnInsert: { createdAt: new Date() } },
      { upsert: true },
    );
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Failed to save webhook config", e);
    return NextResponse.json({ error: "Could not save webhook configuration" }, { status: 500 });
  }
}
