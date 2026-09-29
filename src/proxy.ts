import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { preservedLegacyPaths } from "@/data/legacy-seo-pages";

const locales = ["en", "ar", "ur"];
const defaultLocale = "en";

const PRESERVED_REWRITE_PATHS = new Set([
  ...preservedLegacyPaths,
  "/home-decor-interior-design-online-digital-marketing-agency",
]);

const CATEGORY_REDIRECTS: Record<string, string> = {
  "social-media-marketing": "social-media",
  "ppc-and-paid-advertising": "paid-advertising",
  "analytics-and-data": "analytics",
  "e-commerce-marketing": "e-commerce",
  "web-development": "website-development",
  "performance-marketing": "digital-marketing",
  "video-marketing": "video-production",
  "ai-in-marketing": "ai-and-technology",
  "advertising": "paid-advertising",
};

const KNOWN_ROUTES = new Set([
  "about", "approach", "blog", "capabilities", "careers", "case-studies",
  "contact", "faq", "free-tools", "get-a-quote", "glossary", "industries",
  "locations", "onboarding", "partners", "pricing", "privacy-policy",
  "process", "resources", "results", "services", "technology", "terms",
  "thank-you", "tools", "why-markit-media", "work",
]);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostname = request.nextUrl.hostname.toLowerCase();
  const dashboardHost = hostname === "dashboard.themarkitmedia.com";

  // Keep the CMS on its dedicated hostname while reusing the same application,
  // API routes, authentication and MongoDB connection.
  if (dashboardHost) {
    if (pathname === "/") {
      const url = request.nextUrl.clone();
      url.pathname = "/admin";
      return NextResponse.rewrite(url);
    }
    if (pathname === "/admin" || pathname.startsWith("/admin/") || pathname.startsWith("/api/admin/") || pathname.startsWith("/_next/")) {
      return NextResponse.next();
    }
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    return NextResponse.redirect(url, 307);
  }

  // The CMS no longer lives on the public hostname. Send old bookmarks to the
  // dashboard subdomain without changing the public website or admin API.
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    const url = request.nextUrl.clone();
    url.hostname = "dashboard.themarkitmedia.com";
    url.pathname = pathname.replace(/^\/admin/, "") || "/";
    return NextResponse.redirect(url, 308);
  }

  // Normalize accidental localized admin bookmarks onto the dashboard host.
  const localizedAdminMatch = pathname.match(/^\/(?:en|ar|ur)\/admin(?:\/(.*))?$/);
  if (localizedAdminMatch) {
    const url = request.nextUrl.clone();
    url.hostname = "dashboard.themarkitmedia.com";
    url.pathname = localizedAdminMatch[1] ? `/${localizedAdminMatch[1]}` : "/";
    return NextResponse.redirect(url, 308);
  }

  // Canonical free-tool URLs. Keep the 155 interactive utilities grouped under
  // /free-tools and preserve old /resources/* bookmarks with permanent redirects.
  const freeToolMatch = pathname.match(/^\/(?:en\/)?free-tools\/free-(.+)$/);
  if (freeToolMatch) {
    const url = request.nextUrl.clone();
    url.pathname = `/en/resources/${freeToolMatch[1]}`;
    const response = NextResponse.rewrite(url);
    response.headers.set("X-Robots-Tag", "index, follow");
    return response;
  }

  const oldToolMatch = pathname.match(/^\/(?:en\/)?resources\/(.+)$/);
  if (oldToolMatch) {
    const url = request.nextUrl.clone();
    url.pathname = `/en/free-tools/free-${oldToolMatch[1]}`;
    return NextResponse.redirect(url, 308);
  }

  // Private/share-only scheduling shortcut. Intentionally not part of public navigation.
  if (pathname === "/meet") {
    return NextResponse.next();
  }

  // Consolidate the hostname before any path-level routing so Search Console
  // sees one canonical HTTPS host.
  if (request.nextUrl.hostname === "www.themarkitmedia.com") {
    const url = request.nextUrl.clone();
    url.hostname = "themarkitmedia.com";
    return NextResponse.redirect(url, 301);
  }

  if (pathname !== "/" && pathname.endsWith("/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(0, -1);
    return NextResponse.redirect(url, 301);
  }

  // Let Search Console-proven legacy URLs continue to Next.js rewrites.
  // Proxy runs before beforeFiles rewrites in Next.js 16, so redirecting these
  // paths here would incorrectly collapse ranked pages into /en/blog.
  if (PRESERVED_REWRITE_PATHS.has(pathname)) {
    return NextResponse.next();
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (request.nextUrl.searchParams.has("p") && /^\/?$/.test(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}/blog`;
    url.search = "";
    return NextResponse.redirect(url, 301);
  }

  if (pathnameHasLocale) {
    const categoryMatch = pathname.match(/^\/[a-z]{2}\/blog\/category\/([^/]+)$/);
    if (categoryMatch) {
      const oldSlug = categoryMatch[1];
      const newSlug = CATEGORY_REDIRECTS[oldSlug];
      if (newSlug) {
        const url = request.nextUrl.clone();
        url.pathname = pathname.replace(oldSlug, newSlug);
        return NextResponse.redirect(url, 301);
      }
    }
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}`;
    return NextResponse.redirect(url, 301);
  }

  const first = segments[0];

  if (KNOWN_ROUTES.has(first)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}/${segments.join("/")}`;
    return NextResponse.redirect(url, 301);
  }

  if (first.includes("-") && first.length > 10 && segments.length === 1) {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}/blog`;
    return NextResponse.redirect(url, 301);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(url, 301);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon\\.ico|robots\\.txt|sitemap\\.xml|feed\\.xml|site\\.webmanifest|images|fonts|.*\\..*).*)",
  ],
};
