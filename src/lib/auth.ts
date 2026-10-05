import { createHash, createHmac } from "crypto";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

function getJwtSecret(): string {
  const explicit = process.env.JWT_SECRET?.trim();
  if (explicit) return explicit;

  const serverSecret = process.env.MONGODB_URI?.trim();
  if (process.env.NODE_ENV === "production") {
    if (!serverSecret) throw new Error("JWT_SECRET is required in production");
    return createHash("sha256")
      .update(`markit-admin-session:v1:${serverSecret}`)
      .digest("hex");
  }

  return explicit || "dev-only-markit-admin-secret";
}

export interface JwtPayload {
  userId: number | string;
  email: string;
  role: string;
}

export function generateToken(payload: JwtPayload): string {
  return jwt.sign(payload, getJwtSecret(), {
    expiresIn: "8h",
    algorithm: "HS256",
  });
}

export function verifyToken(token: string): JwtPayload | null {
  if (!token) return null;
  try {
    return jwt.verify(token, getJwtSecret(), {
      algorithms: ["HS256"],
    }) as JwtPayload;
  } catch {
    return null;
  }
}

export function hashOtpCode(challengeId: string, code: string): string {
  return createHmac("sha256", getJwtSecret())
    .update(`${challengeId}:${code}`)
    .digest("hex");
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
