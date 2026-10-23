// Production Worker entry. Wraps the OpenNext worker with a short-lived edge cache for public HTML pages.
// Why: every page is rendered on demand, so each visit waited 0.2-1.9 s for the server. Cloudflare "Cache Rules"
// cannot cache responses a Worker produces, so the cache lives here (Cache API, per data centre, 5 minutes).
// Safe by construction: GET + HTML + 200 only, never API/admin/RSC/Next internals, never requests that carry
// spoofable or credential headers, never responses that set cookies. Purging the zone cache clears it.
import openNext from "../.open-next/worker.js";
export * from "../.open-next/worker.js";

const TTL_SECONDS = 300;
const SKIP_PATHS = ["/api/", "/admin", "/_next/", "/cdn-cgi/", "/meet"];
const SKIP_HEADERS = ["authorization", "rsc", "next-router-prefetch", "next-router-state-tree", "next-router-segment-prefetch", "x-vercel-ip-country", "x-middleware-prefetch"];
const SKIP_COOKIE = /(^|;\s*)[^=]*(session|token|auth|jwt|admin)[^=]*=/i;
const TRACKING = /^(utm_|gclid$|fbclid$|msclkid$|gbraid$|wbraid$|_ga$|_gl$|ref$)/i;
const BROWSER_CACHE_CONTROL = "private, no-cache, no-store, max-age=0, must-revalidate";

function eligible(request, url) {
  if (request.method !== "GET") return false;
  if (url.hostname === "dashboard.themarkitmedia.com") return false;
  if (SKIP_PATHS.some((p) => url.pathname === p.replace(/\/$/, "") || url.pathname.startsWith(p))) return false;
  if (url.searchParams.has("_rsc")) return false;
  if (SKIP_HEADERS.some((h) => request.headers.has(h))) return false;
  if (SKIP_COOKIE.test(request.headers.get("cookie") || "")) return false;
  if (/\.[a-z0-9]{2,5}$/i.test(url.pathname) && !/\.html?$/i.test(url.pathname)) return false; // files (xml, txt, images)
  const accept = request.headers.get("accept") || "";
  return accept.includes("text/html");
}

function cacheKey(url, env) {
  const k = new URL(url.toString());
  for (const name of [...k.searchParams.keys()]) if (TRACKING.test(name)) k.searchParams.delete(name);
  k.searchParams.sort();
  // A new deploy changes the build id, so pages from an older build are never served (they reference old script files).
  k.searchParams.set("__build", String((env && env.OPEN_NEXT_BUILD_ID) || "0"));
  return new Request(k.toString(), { method: "GET" });
}

export default {
  ...openNext,
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (!eligible(request, url)) return openNext.fetch(request, env, ctx);

    const key = cacheKey(url, env);
    const cache = caches.default;
    const hit = await cache.match(key);
    if (hit) {
      const res = new Response(hit.body, hit);
      res.headers.set("Cache-Control", BROWSER_CACHE_CONTROL);
      res.headers.set("x-edge-cache", "HIT");
      return res;
    }

    const res = await openNext.fetch(request, env, ctx);
    const type = res.headers.get("content-type") || "";
    if (res.status === 200 && type.includes("text/html") && !res.headers.has("set-cookie")) {
      const stored = new Response(res.clone().body, res);
      stored.headers.set("Cache-Control", `public, max-age=${TTL_SECONDS}`);
      stored.headers.delete("set-cookie");
      ctx.waitUntil(cache.put(key, stored));
      const out = new Response(res.body, res);
      out.headers.set("x-edge-cache", "MISS");
      return out;
    }
    return res;
  },
};
