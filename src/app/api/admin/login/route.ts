import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { verifyPassword, generateToken, ensureDefaultAdmin } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    await ensureDefaultAdmin();

    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    const db = getDb();
    const user = db.prepare("SELECT * FROM users WHERE email = ?").get(String(email)) as {
      id: number;
      email: string;
      password_hash: string;
      name: string;
      role: string;
    } | undefined;

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const valid = await verifyPassword(String(password), user.password_hash);
    if (!valid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = generateToken({ userId: user.id, email: user.email, role: user.role });

    const response = NextResponse.json({
      token,
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
    });

    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 86400,
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
