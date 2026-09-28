import { NextRequest, NextResponse } from "next/server";
import { getMongoDb } from "@/lib/mongodb";
import { verifyPassword, hashPassword, generateToken } from "@/lib/auth";

const DEFAULT_ADMIN_EMAIL = "admin@markitmedia.com";
const DEFAULT_ADMIN_PASSWORD = "admin123";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    const db = await getMongoDb();
    const users = db.collection("admin_users");
    const adminEmail = process.env.ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD;

    let user = await users.findOne({ email: adminEmail });
    if (!user) {
      const passwordHash = await hashPassword(adminPassword);
      const result = await users.insertOne({
        email: adminEmail,
        password_hash: passwordHash,
        name: "Markit Media Admin",
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      user = await users.findOne({ _id: result.insertedId });
    }

    if (!user || String(email).toLowerCase() !== String(user.email).toLowerCase()) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const valid = await verifyPassword(String(password), String(user.password_hash));
    if (!valid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = generateToken({ userId: 1, email: String(user.email), role: String(user.role || "admin") });
    const response = NextResponse.json({
      token,
      user: {
        id: user._id?.toString(),
        email: String(user.email),
        name: String(user.name || "Admin"),
        role: String(user.role || "admin"),
      },
    });

    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 86400,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Admin login failed", error);
    return NextResponse.json(
      { error: "Admin database unavailable. Check MongoDB configuration." },
      { status: 503 },
    );
  }
}
