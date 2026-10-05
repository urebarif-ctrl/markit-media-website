import { randomInt } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getMongoDb } from "@/lib/mongodb";
import { hashOtpCode } from "@/lib/auth";

const OTP_TTL_MS = 10 * 60 * 1000;
const RESEND_WAIT_MS = 60 * 1000;

function noStore(response: NextResponse) {
  response.headers.set("Cache-Control", "private, no-store, max-age=0");
  return response;
}

export async function POST(request: NextRequest) {
  try {
    const { challengeId } = await request.json();
    const id = String(challengeId || "").trim();
    if (!id) return noStore(NextResponse.json({ error: "Sign in again to request a new code." }, { status: 400 }));

    const db = await getMongoDb();
    const challenges = db.collection("admin_otp_challenges");
    const challenge = await challenges.findOne({ challengeId: id });

    if (!challenge || new Date(challenge.expiresAt).getTime() <= Date.now()) {
      if (challenge) await challenges.deleteOne({ challengeId: id });
      return noStore(NextResponse.json({ error: "Your verification session expired. Sign in again." }, { status: 401 }));
    }

    const lastSent = new Date(challenge.lastSentAt || challenge.createdAt || 0).getTime();
    const elapsed = Date.now() - lastSent;
    if (elapsed < RESEND_WAIT_MS) {
      const wait = Math.ceil((RESEND_WAIT_MS - elapsed) / 1000);
      return noStore(NextResponse.json({ error: `Please wait ${wait} seconds before requesting another code.`, retryAfter: wait }, { status: 429 }));
    }

    if (!process.env.RESEND_API_KEY) {
      return noStore(NextResponse.json({ error: "Two-factor email is not configured." }, { status: 503 }));
    }

    const code = String(randomInt(100000, 1000000));
    const now = new Date();
    const resend = new Resend(process.env.RESEND_API_KEY);
    const from = process.env.ADMIN_OTP_FROM || process.env.LEAD_REPLY_FROM || "Markit Media <contact@themarkitmedia.com>";
    const sent = await resend.emails.send({
      from,
      to: String(challenge.email),
      subject: "Your new Markit Media dashboard verification code",
      html: `<div style="font-family:Arial,sans-serif;color:#111;max-width:560px;margin:auto"><div style="padding:22px 0;border-bottom:1px solid #e5e5e5;font-size:20px;font-weight:800">MARKIT MEDIA</div><h1 style="font-size:24px;margin:28px 0 8px">New verification code</h1><p style="color:#555;line-height:1.6">Use this code to finish signing in. The previous code is no longer valid.</p><div style="font-size:36px;letter-spacing:10px;font-weight:800;padding:22px;background:#f5f5f5;text-align:center;margin:24px 0">${code}</div></div>`,
    });

    if (sent.error) {
      console.error("Admin OTP resend failed", sent.error);
      return noStore(NextResponse.json({ error: "Could not send a new verification code." }, { status: 502 }));
    }

    await challenges.updateOne(
      { challengeId: id },
      { $set: { codeHash: hashOtpCode(id, code), attempts: 0, lastSentAt: now, expiresAt: new Date(now.getTime() + OTP_TTL_MS) } },
    );
    await db.collection("activity_log").insertOne({ action: "admin.otp_resent", entityType: "admin_session", actor: String(challenge.email), createdAt: now });

    return noStore(NextResponse.json({ ok: true, challengeId: id, expiresInSeconds: OTP_TTL_MS / 1000 }));
  } catch (error) {
    console.error("Admin OTP resend failed", error);
    return noStore(NextResponse.json({ error: "Could not resend the verification code." }, { status: 503 }));
  }
}
