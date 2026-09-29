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

const FREE_TOOL_SLUGS = new Set([
  "seo-audit-score",
  "seo-checklist",
  "seo-content-optimizer",
  "seo-gap-finder",
  "backlink-analyzer",
  "keyword-density-checker",
  "schema-generator",
  "meta-description-generator",
  "og-preview",
  "readability-checker",
  "seo-vs-ppc",
  "headline-analyzer",
  "headline-split-tester",
  "content-brief-generator",
  "content-brief",
  "content-calendar",
  "content-pillar-planner",
  "content-gap-analyzer",
  "content-gap-finder",
  "content-repurposing",
  "content-roi-calculator",
  "content-audit-scorecard",
  "content-performance-scorecard",
  "ad-copy-generator",
  "ad-copy-analyzer",
  "cta-generator",
  "lead-magnet-generator",
  "social-media-planner",
  "social-calendar",
  "social-media-calendar-template",
  "social-post-generator",
  "social-content-rater",
  "social-media-audit",
  "social-media-roi",
  "social-media-bio-generator",
  "social-proof-guide",
  "hashtag-generator",
  "image-size-guide",
  "email-campaign-planner",
  "email-sequence-planner",
  "email-subject-tester",
  "email-subject-ab-tester",
  "email-roi-calculator",
  "email-health-checker",
  "email-deliverability",
  "email-warmup-planner",
  "google-ads-estimator",
  "ad-budget-pacing",
  "ad-spend-calculator",
  "ppc-audit-checklist",
  "ab-test-calculator",
  "ab-test-ideas",
  "influencer-roi",
  "roi-calculator",
  "roi-dashboard",
  "roi-forecaster",
  "kpi-dashboard",
  "kpi-builder",
  "marketing-kpi-tracker",
  "marketing-metrics-benchmark",
  "marketing-roi-report",
  "attribution-calculator",
  "client-reporting-dashboard",
  "stakeholder-report",
  "campaign-tracker",
  "marketing-expense-tracker",
  "experiment-tracker",
  "campaign-debrief",
  "funnel-calculator",
  "funnel-visualizer",
  "conversion-funnel-simulator",
  "brand-voice-generator",
  "brand-voice-checker",
  "brand-tone-generator",
  "brand-name-generator",
  "brand-name-evaluator",
  "brand-positioning",
  "brand-consistency-checker",
  "brand-guidelines-checklist",
  "color-palette-generator",
  "contrast-checker",
  "website-grader",
  "website-audit",
  "website-readiness-scorecard",
  "website-heuristic-evaluator",
  "website-launch-checklist",
  "launch-countdown",
  "landing-page-grader",
  "cro-audit",
  "conversion-checklist",
  "speed-test",
  "redesign-planner",
  "migration-checklist",
  "tech-stack-advisor",
  "pricing-optimizer",
  "pricing-page-analyzer",
  "web-platform-guide",
  "budget-calculator",
  "budget-allocator",
  "marketing-budget-planner",
  "marketing-calendar",
  "marketing-timeline-planner",
  "marketing-maturity",
  "marketing-goal-setter",
  "marketing-audit-scorecard",
  "okr-planner",
  "swot-analysis",
  "channel-selector",
  "channel-recommender",
  "channel-mix-modeller",
  "marketing-proposal-generator",
  "scope-of-work-generator",
  "marketing-rfp-template",
  "risk-assessment",
  "sprint-planner",
  "quarterly-review",
  "team-capacity-planner",
  "meeting-agenda-builder",
  "campaign-naming-convention",
  "campaign-naming-generator",
  "campaign-brief-builder",
  "competitor-analysis",
  "competitor-benchmarking",
  "competitor-matrix",
  "competitor-pricing-tracker",
  "competitor-ad-spy",
  "competitive-gap",
  "competitive-intel-dashboard",
  "competitive-swot",
  "competitive-swot-analyzer",
  "agency-comparison",
  "agency-pricing-calculator",
  "pricing-calculator",
  "vendor-evaluation",
  "persona-builder",
  "persona-workshop",
  "buyer-persona-quiz",
  "audience-targeting-worksheet",
  "customer-journey-builder",
  "customer-journey-mapper",
  "customer-feedback-survey",
  "lead-scoring-calculator",
  "clv-calculator",
  "retention-calculator",
  "marketing-stack-audit",
  "martech-stack-planner",
  "sla-tracker",
  "client-onboarding-checklist",
  "utm-builder",
  "marketing-trends-2026",
  "marketing-trends-2025",
  "marketing-statistics-2026",
  "marketing-statistics",
  "startup-marketing-guide",
  "small-business-guide",
  "checklists"
]);

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
  if (freeToolMatch && FREE_TOOL_SLUGS.has(freeToolMatch[1])) {
    const url = request.nextUrl.clone();
    url.pathname = `/en/resources/${freeToolMatch[1]}`;
    const response = NextResponse.rewrite(url);
    response.headers.set("X-Robots-Tag", "index, follow");
    return response;
  }

  const oldToolMatch = pathname.match(/^\/(?:en\/)?resources\/(.+)$/);
  if (oldToolMatch && FREE_TOOL_SLUGS.has(oldToolMatch[1])) {
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
