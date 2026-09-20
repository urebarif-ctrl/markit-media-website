import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { getDb } from "./db";

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      console.warn("WARNING: JWT_SECRET not set in production. Set JWT_SECRET environment variable.");
    }
    return "dev-jwt-secret-change-in-production";
  }
  return secret;
}

export interface JwtPayload {
  userId: number;
  email: string;
  role: string;
}

export function generateToken(payload: JwtPayload): string {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: "24h" });
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, getJwtSecret()) as JwtPayload;
  } catch {
    return null;
  }
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function ensureDefaultAdmin(): Promise<void> {
  const db = getDb();
  const existing = db.prepare("SELECT id FROM users WHERE email = ?").get("admin@markitmedia.com");
  if (!existing) {
    const hash = await hashPassword("admin123");
    db.prepare("INSERT INTO users (email, password_hash, name, role) VALUES (?, ?, ?, ?)").run(
      "admin@markitmedia.com",
      hash,
      "Admin",
      "admin",
    );
  }
}
