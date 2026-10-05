import { randomInt, randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getMongoDb } from "@/lib/mongodb";
import { hashOtpCode } from "@/lib/auth";

const OTP_TTL_MS = 10 * 60 * 1000;

function noStore(response: NextResponse) {
  response.headers.set("Cache-Control", "private, no-store, max-age=0");
  return response;
}

function maskEmail(email: string) {
  const [name, domain] = email.split("@");
  if (!domain) return email;
  const shown = name.length <= 2 ? name.slice(0, 1) : name.slice(0, 2);
  return `${shown}${"*".repeat(Math.max(2, name.length - shown.length))}@${domain}`;
}

function getClientIp(request: NextRequest) {
  return request.headers.get("x-real-ip") || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    const normalizedEmail = String(email || "").trim().toLowerCase();
    if (!normalizedEmail) return noStore(NextResponse.json({ error: "Email is required." }, { status: 400 }));

    const db = await getMongoDb();
    const users = db.collection("admin_users");
    let user = await users.findOne({ email: normalizedEmail });

    const ownerEmail = String(process.env.ADMIN_EMAIL || "").trim().toLowerCase();
    if (!user && ownerEmail && normalizedEmail === ownerEmail) {
      const now = new Date();
      const result = await users.insertOne({
        email: ownerEmail,
        name: "Markit Media Admin",
        role: "admin",
        password_hash: "",
        createdAt: now,
        updatedAt: now,
      });
      user = await users.findOne({ _id: result.insertedId });
    }

    if (!user) {
      return noStore(NextResponse.json({ error: "This email is not authorized for dashboard access." }, { status: 403 }));
    }

    if (!process.env.RESEND_API_KEY) {
      return noStore(NextResponse.json({ error: "Email verification is not configured." }, { status: 503 }));
    }

    const now = new Date();
    const challengeId = randomUUID();
    const code = String(randomInt(100000, 1000000));
    const challenges = db.collection("admin_otp_challenges");
    await challenges.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }).catch(() => undefined);
    await challenges.deleteMany({ email: normalizedEmail });
    await challenges.insertOne({
      challengeId,
      userId: user!._id,
      email: normalizedEmail,
      codeHash: hashOtpCode(challengeId, code),
      attempts: 0,
      loginMethod: "email_code",
      createdAt: now,
      lastSentAt: now,
      expiresAt: new Date(now.getTime() + OTP_TTL_MS),
      ip: getClientIp(request),
    });

    const resend = new Resend(process.env.RESEND_API_KEY);
    const from = process.env.ADMIN_OTP_FROM || "Markit Media <contact@themarkitmedia.com>";
    const sent = await resend.emails.send({
      from,
      to: normalizedEmail,
      subject: "Your Markit Media dashboard login code",
      html: `<div style="font-family:Arial,sans-serif;color:#111;max-width:560px;margin:auto"><div style="padding:22px 0;border-bottom:1px solid #e5e5e5;font-size:20px;font-weight:800">MARKIT MEDIA</div><h1 style="font-size:24px;margin:28px 0 8px">Dashboard login code</h1><p style="color:#555;line-height:1.6">Use this code to sign in to the private Markit Media dashboard. It expires in 10 minutes.</p><div style="font-size:36px;letter-spacing:10px;font-weight:800;padding:22px;background:#f5f5f5;text-align:center;margin:24px 0">${code}</div></div>`,
    });

    if (sent.error) {
      await challenges.deleteOne({ challengeId });
      console.error("Dashboard email login code failed", sent.error);
      return noStore(NextResponse.json({ error: "Could not send the login code." }, { status: 502 }));
    }

    await db.collection("activity_log").insertOne({ action: "admin.email_login_code_sent", entityType: "admin_session", actor: normalizedEmail, createdAt: now });

    return noStore(NextResponse.json({ challengeId, emailHint: maskEmail(normalizedEmail), expiresInSeconds: OTP_TTL_MS / 1000 }));
  } catch (error) {
    console.error("Dashboard email login failed", error);
    return noStore(NextResponse.json({ error: "Email login is temporarily unavailable." }, { status: 503 }));
  }
}
