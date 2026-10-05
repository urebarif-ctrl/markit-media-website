import { randomInt, randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getMongoDb } from "@/lib/mongodb";
import { verifyPassword, hashPassword, hashOtpCode } from "@/lib/auth";

const MAX_FAILURES = 5;
const BLOCK_MS = 15 * 60 * 1000;
const OTP_TTL_MS = 10 * 60 * 1000;

function getClientIp(request: NextRequest) {
  return request.headers.get("x-real-ip") || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

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

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    const normalizedEmail = String(email || "").trim().toLowerCase();

    if (!normalizedEmail || !password) {
      return noStore(NextResponse.json({ error: "Email and password required" }, { status: 400 }));
    }

    const db = await getMongoDb();
    const users = db.collection("admin_users");
    const limits = db.collection("admin_login_limits");
    const now = new Date();
    const key = `${getClientIp(request)}:${normalizedEmail}`;

    await limits.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }).catch(() => undefined);
    const attempt = await limits.findOne({ key });

    if (attempt?.blockedUntil && new Date(attempt.blockedUntil).getTime() > now.getTime()) {
      return noStore(NextResponse.json({ error: "Too many sign-in attempts. Try again in 15 minutes." }, { status: 429 }));
    }

    let user = await users.findOne({ email: normalizedEmail });

    if (!user && (await users.countDocuments({})) === 0) {
      const bootstrapEmail = String(process.env.ADMIN_EMAIL || "").trim().toLowerCase();
      const bootstrapPassword = process.env.ADMIN_PASSWORD || "";
      if (bootstrapEmail && bootstrapPassword && normalizedEmail === bootstrapEmail) {
        const passwordHash = await hashPassword(bootstrapPassword);
        const result = await users.insertOne({
          email: bootstrapEmail,
          password_hash: passwordHash,
          name: "Markit Media Admin",
          role: "admin",
          createdAt: now,
          updatedAt: now,
        });
        user = await users.findOne({ _id: result.insertedId });
      }
    }

    const valid = Boolean(user && (await verifyPassword(String(password), String(user.password_hash))));
    if (!valid) {
      const failures = Number(attempt?.failures || 0) + 1;
      const blockedUntil = failures >= MAX_FAILURES ? new Date(now.getTime() + BLOCK_MS) : null;
      await limits.updateOne(
        { key },
        { $set: { key, failures, blockedUntil, expiresAt: new Date(now.getTime() + 24 * 60 * 60 * 1000), updatedAt: now } },
        { upsert: true },
      );
      await db.collection("activity_log").insertOne({ action: "admin.login_failed", entityType: "admin_session", actor: normalizedEmail, createdAt: now });
      return noStore(NextResponse.json({ error: "Invalid credentials" }, { status: 401 }));
    }

    await limits.deleteOne({ key });

    if (!process.env.RESEND_API_KEY) {
      return noStore(NextResponse.json({ error: "Two-factor email is not configured." }, { status: 503 }));
    }

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
      createdAt: now,
      expiresAt: new Date(now.getTime() + OTP_TTL_MS),
      ip: getClientIp(request),
    });

    const resend = new Resend(process.env.RESEND_API_KEY);
    const from = process.env.ADMIN_OTP_FROM || process.env.LEAD_REPLY_FROM || "Markit Media <contact@themarkitmedia.com>";
    const sent = await resend.emails.send({
      from,
      to: normalizedEmail,
      subject: "Your Markit Media dashboard verification code",
      html: `<div style="font-family:Arial,sans-serif;color:#111;max-width:560px;margin:auto"><div style="padding:22px 0;border-bottom:1px solid #e5e5e5;font-size:20px;font-weight:800">MARKIT MEDIA</div><h1 style="font-size:24px;margin:28px 0 8px">Verification code</h1><p style="color:#555;line-height:1.6">Use this code to finish signing in to the Markit Media dashboard. It expires in 10 minutes.</p><div style="font-size:36px;letter-spacing:10px;font-weight:800;padding:22px;background:#f5f5f5;text-align:center;margin:24px 0">${code}</div><p style="font-size:12px;color:#777">If you did not attempt to sign in, you can ignore this email.</p></div>`,
    });

    if (sent.error) {
      await challenges.deleteOne({ challengeId });
      return noStore(NextResponse.json({ error: "Could not send the verification code." }, { status: 502 }));
    }

    await db.collection("activity_log").insertOne({ action: "admin.otp_sent", entityType: "admin_session", actor: normalizedEmail, createdAt: now });

    return noStore(NextResponse.json({
      requiresOtp: true,
      challengeId,
      emailHint: maskEmail(normalizedEmail),
      expiresInSeconds: OTP_TTL_MS / 1000,
    }));
  } catch (error) {
    console.error("Admin login failed", error);
    return noStore(NextResponse.json({ error: "Admin sign-in is temporarily unavailable." }, { status: 503 }));
  }
}
