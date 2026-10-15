import { isWorkersRuntime } from "./db";

type D1Like = {
  prepare(sql: string): { bind(...values: unknown[]): { first<T>(): Promise<T | null> } };
};

const memory = new Map<string, { count: number; resetAt: number }>();

function memoryLimited(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = memory.get(key);
  if (!entry || now > entry.resetAt) {
    memory.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }
  entry.count += 1;
  return entry.count > limit;
}

export async function isRateLimited(key: string, limit: number, windowMs = 60_000): Promise<boolean> {
  if (!isWorkersRuntime()) return memoryLimited(key, limit, windowMs);
  try {
    const { getCloudflareContext } = await import("@opennextjs/cloudflare");
    const { env } = await getCloudflareContext({ async: true });
    const d1 = (env as unknown as { DB: D1Like }).DB;
    const now = Date.now();
    const row = await d1
      .prepare(
        `INSERT INTO rate_limits (key, count, reset_at) VALUES (?1, 1, ?2)
         ON CONFLICT(key) DO UPDATE SET
           count = CASE WHEN reset_at < ?3 THEN 1 ELSE count + 1 END,
           reset_at = CASE WHEN reset_at < ?3 THEN ?2 ELSE reset_at END
         RETURNING count`,
      )
      .bind(key, now + windowMs, now)
      .first<{ count: number }>();
    return (row?.count ?? 0) > limit;
  } catch {
    return memoryLimited(key, limit, windowMs);
  }
}

/** Client IP for rate limiting. cf-connecting-ip is set by Cloudflare and cannot be spoofed by the caller;
 *  the first X-Forwarded-For entry can be, so only the last entry (added by the nearest proxy) is a fallback. */
export function clientIp(headers: Headers): string {
  const cf = headers.get("cf-connecting-ip")?.trim();
  if (cf) return cf;
  const real = headers.get("x-real-ip")?.trim();
  if (real) return real;
  const xff = headers.get("x-forwarded-for");
  if (xff) {
    const parts = xff.split(",").map((x) => x.trim()).filter(Boolean);
    if (parts.length) return parts[parts.length - 1];
  }
  return "unknown";
}
