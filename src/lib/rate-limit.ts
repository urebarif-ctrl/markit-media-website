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

/** IPv6 clients commonly control a whole /64, so bucket them by prefix; otherwise one subscriber could
 *  rotate through 2^64 addresses. IPv4 and IPv4-mapped addresses are returned unchanged. */
function bucketIp(ip: string): string {
  if (!ip.includes(":")) return ip;
  const mapped = ip.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/i);
  if (mapped) return mapped[1];
  const [head, tail = ""] = ip.split("::");
  const h = head ? head.split(":") : [];
  const t = tail ? tail.split(":") : [];
  if (!ip.includes("::") && h.length !== 8) return ip;
  const full = ip.includes("::") ? [...h, ...Array(Math.max(0, 8 - h.length - t.length)).fill("0"), ...t] : h;
  return full.slice(0, 4).map((x) => (x || "0").toLowerCase()).join(":") + "::/64";
}

/** Client IP for rate limiting.
 *  Trust model: on Cloudflare, cf-connecting-ip is set by the edge and overwrites any client-supplied value,
 *  and a Worker has no reachable origin (workers.dev and custom domains both pass through the edge), so it
 *  cannot be spoofed there. x-real-ip and x-forwarded-for are only consulted when that header is absent
 *  (local dev, or a non-Cloudflare host such as a Vercel preview). The FIRST x-forwarded-for entry is
 *  caller-controlled and is never used; the last entry is the one appended by the nearest proxy. */
export function clientIp(headers: Headers): string {
  const cf = headers.get("cf-connecting-ip")?.trim();
  if (cf) return bucketIp(cf);
  const real = headers.get("x-real-ip")?.trim();
  if (real) return bucketIp(real);
  const xff = headers.get("x-forwarded-for");
  if (xff) {
    const parts = xff.split(",").map((x) => x.trim()).filter(Boolean);
    if (parts.length) return bucketIp(parts[parts.length - 1]);
  }
  return "unknown";
}
