import { NextRequest, NextResponse } from "next/server";
import { getMongoDb } from "@/lib/mongodb";
import { verifyPassword, hashPassword, generateToken } from "@/lib/auth";

const MAX_FAILURES = 5;
const BLOCK_MS = 15 * 60 * 1000;

function getClientIp(request: NextRequest) {
  return (
    request.headers.get("x-real-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

function noStore(response: NextResponse) {
  response.headers.set("Cache-Control", "private, no-store, max-age=0");
  return response;
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
      return noStore(
        NextResponse.json(
          { error: "Too many sign-in attempts. Try again in 15 minutes." },
          { status: 429 },
        ),
      );
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

    const valid = Boolean(
      user && (await verifyPassword(String(password), String(user.password_hash))),
    );

    if (!valid) {
      const failures = Number(attempt?.failures || 0) + 1;
      const blockedUntil = failures >= MAX_FAILURES ? new Date(now.getTime() + BLOCK_MS) : null;
      await limits.updateOne(
        { key },
        {
          $set: {
            key,
            failures,
            blockedUntil,
            expiresAt: new Date(now.getTime() + 24 * 60 * 60 * 1000),
            updatedAt: now,
          },
        },
        { upsert: true },
      );

      await db.collection("activity_log").insertOne({
        action: "admin.login_failed",
        entityType: "admin_session",
        actor: normalizedEmail,
        createdAt: now,
      });

      return noStore(NextResponse.json({ error: "Invalid credentials" }, { status: 401 }));
    }

    await limits.deleteOne({ key });

    const token = generateToken({
      userId: user!._id?.toString() || "",
      email: String(user!.email),
      role: String(user!.role || "admin"),
    });

    const response = NextResponse.json({
      user: {
        id: user!._id?.toString(),
        email: String(user!.email),
        name: String(user!.name || "Admin"),
        role: String(user!.role || "admin"),
      },
    });

    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 8 * 60 * 60,
      path: "/",
    });
    response.headers.set("Cache-Control", "private, no-store, max-age=0");

    await db.collection("activity_log").insertOne({
      action: "admin.login_succeeded",
      entityType: "admin_session",
      actor: String(user!.email),
      createdAt: now,
    });

    return response;
  } catch (error) {
    console.error("Admin login failed", error);
    return noStore(
      NextResponse.json(
        { error: "Admin sign-in is temporarily unavailable." },
        { status: 503 },
      ),
    );
  }
}
