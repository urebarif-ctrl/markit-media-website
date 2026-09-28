import { NextRequest, NextResponse } from "next/server";
import { getMongoDb } from "@/lib/mongodb";
import { verifyPassword, hashPassword, generateToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    const db = await getMongoDb();
    const users = db.collection("admin_users");
    const normalizedEmail = String(email).trim().toLowerCase();

    // Authenticate against the credential actually stored in MongoDB.
    // This is essential after an admin changes their email in Settings.
    let user = await users.findOne({ email: normalizedEmail });

    // Bootstrap only when there are no admin users yet. Never recreate an old
    // default account after an administrator has changed their credentials.
    if (!user && (await users.countDocuments({})) === 0) {
      const bootstrapEmail = String(process.env.ADMIN_EMAIL || "").trim().toLowerCase();
      const bootstrapPassword = process.env.ADMIN_PASSWORD || "";

      if (!bootstrapEmail || !bootstrapPassword || normalizedEmail !== bootstrapEmail) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
      }

      const passwordHash = await hashPassword(bootstrapPassword);
      const result = await users.insertOne({
        email: bootstrapEmail,
        password_hash: passwordHash,
        name: "Markit Media Admin",
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      user = await users.findOne({ _id: result.insertedId });
    }

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const valid = await verifyPassword(String(password), String(user.password_hash));
    if (!valid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = generateToken({
      userId: user._id?.toString() || "",
      email: String(user.email),
      role: String(user.role || "admin"),
    });
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
