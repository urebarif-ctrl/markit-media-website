import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LOCALES = new Set(["en", "ar", "ur"]);

const KNOWN_ROUTES = new Set([
  "about", "approach", "blog", "capabilities", "careers", "case-studies",
  "contact", "faq", "free-tools", "get-a-quote", "glossary", "industries",
  "locations", "onboarding", "partners", "pricing", "privacy-policy",
  "process", "resources", "results", "services", "technology", "terms",
  "thank-you", "tools", "why-markit-media", "work",
]);

const STATIC_PREFIXES = new Set([
  "_next", "api", "admin", "images", "fonts", "favicon.ico", "favicon.svg",
  "icon-192.png", "icon-512.png", "apple-touch-icon.png", "site.webmanifest",
  "sitemap.xml", "robots.txt",
]);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return;

  const first = segments[0];

  if (STATIC_PREFIXES.has(first)) return;
  if (LOCALES.has(first)) return;
  if (first.startsWith("wp-") || first === "xmlrpc.php" || first === "wp-cron.php") return;
  if (first === "feed" || first === "category" || first === "tag" || first === "author") return;

  if (KNOWN_ROUTES.has(first)) {
    return NextResponse.redirect(new URL(`/en/${segments.join("/")}`, request.url), 301);
  }

  if (first.includes("-") && first.length > 10 && segments.length === 1) {
    return NextResponse.redirect(new URL("/en/blog", request.url), 301);
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|sitemap\\.xml|robots\\.txt|images/|fonts/).*)",
  ],
};
