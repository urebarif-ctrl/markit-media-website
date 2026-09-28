import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getMongoDb } from "@/lib/mongodb";
import { verifyToken } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("admin_token")?.value || "";
  const session = verifyToken(token);

  if (!session || !ObjectId.isValid(String(session.userId))) {
    const response = NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    response.headers.set("Cache-Control", "private, no-store, max-age=0");
    return response;
  }

  try {
    const db = await getMongoDb();
    const user = await db.collection("admin_users").findOne({
      _id: new ObjectId(String(session.userId)),
    });

    if (!user) {
      const response = NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      response.cookies.set("admin_token", "", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", maxAge: 0, path: "/" });
      response.headers.set("Cache-Control", "private, no-store, max-age=0");
      return response;
    }

    const response = NextResponse.json({
      user: {
        id: String(user._id),
        email: String(user.email),
        name: String(user.name || "Admin"),
        role: String(user.role || "admin"),
      },
    });
    response.headers.set("Cache-Control", "private, no-store, max-age=0");
    return response;
  } catch (error) {
    console.error("Admin session lookup failed", error);
    const response = NextResponse.json({ error: "Session unavailable" }, { status: 503 });
    response.headers.set("Cache-Control", "private, no-store, max-age=0");
    return response;
  }
}
