import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "ar", "ur"];
const defaultLocale = "en";

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

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

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
    return NextResponse.redirect(url);
  }

  const first = segments[0];

  if (KNOWN_ROUTES.has(first)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}/${segments.join("/")}`;
    return NextResponse.redirect(url);
  }

  if (first.includes("-") && first.length > 10 && segments.length === 1) {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}/blog`;
    return NextResponse.redirect(url, 301);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon\\.ico|robots\\.txt|sitemap\\.xml|images|fonts|.*\\..*).*)",
  ],
};
