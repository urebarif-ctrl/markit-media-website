import { timingSafeEqual } from "crypto";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { getMongoDb } from "@/lib/mongodb";
import { generateToken, hashOtpCode } from "@/lib/auth";

function noStore(response: NextResponse) {
  response.headers.set("Cache-Control", "private, no-store, max-age=0");
  return response;
}

export async function POST(request: NextRequest) {
  try {
    const { challengeId, code } = await request.json();
    const id = String(challengeId || "").trim();
    const otp = String(code || "").replace(/\D/g, "").slice(0, 6);

    if (!id || otp.length !== 6) {
      return noStore(NextResponse.json({ error: "Enter the 6-digit verification code." }, { status: 400 }));
    }

    const db = await getMongoDb();
    const challenges = db.collection("admin_otp_challenges");
    const challenge = await challenges.findOne({ challengeId: id });

    if (!challenge || new Date(challenge.expiresAt).getTime() <= Date.now()) {
      if (challenge) await challenges.deleteOne({ challengeId: id });
      return noStore(NextResponse.json({ error: "This verification code has expired. Sign in again." }, { status: 401 }));
    }

    if (Number(challenge.attempts || 0) >= 5) {
      await challenges.deleteOne({ challengeId: id });
      return noStore(NextResponse.json({ error: "Too many incorrect codes. Sign in again." }, { status: 429 }));
    }

    const expected = Buffer.from(String(challenge.codeHash), "hex");
    const received = Buffer.from(hashOtpCode(id, otp), "hex");
    const valid = expected.length === received.length && timingSafeEqual(expected, received);

    if (!valid) {
      await challenges.updateOne({ challengeId: id }, { $inc: { attempts: 1 } });
      await db.collection("activity_log").insertOne({ action: "admin.otp_failed", entityType: "admin_session", actor: String(challenge.email), createdAt: new Date() });
      return noStore(NextResponse.json({ error: "Incorrect verification code." }, { status: 401 }));
    }

    if (!ObjectId.isValid(String(challenge.userId))) {
      await challenges.deleteOne({ challengeId: id });
      return noStore(NextResponse.json({ error: "Account unavailable." }, { status: 401 }));
    }

    const user = await db.collection("admin_users").findOne({ _id: new ObjectId(String(challenge.userId)) });
    if (!user) {
      await challenges.deleteOne({ challengeId: id });
      return noStore(NextResponse.json({ error: "Account unavailable." }, { status: 401 }));
    }

    const token = generateToken({ userId: String(user._id), email: String(user.email), role: String(user.role || "admin") });
    const response = NextResponse.json({
      user: { id: String(user._id), email: String(user.email), name: String(user.name || "Admin"), role: String(user.role || "admin") },
    });
    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 8 * 60 * 60,
      path: "/",
    });

    await challenges.deleteOne({ challengeId: id });
    await db.collection("activity_log").insertOne({ action: "admin.login_succeeded_2fa", entityType: "admin_session", actor: String(user.email), createdAt: new Date() });
    return noStore(response);
  } catch (error) {
    console.error("Admin OTP verification failed", error);
    return noStore(NextResponse.json({ error: "Verification is temporarily unavailable." }, { status: 503 }));
  }
}
