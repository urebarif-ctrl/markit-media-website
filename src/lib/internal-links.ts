import { FREE_TOOL_SLUGS } from "@/data/free-tool-slugs";

// Links stored inside blog post bodies that point at pages that moved or never existed.
const LINK_ALIASES: Record<string, string> = {
  "services/website-development/freelance-website-developers": "services/website-development/freelance-developers",
  "services/white-label/white-label-web-development": "services/white-label/web-development",
  "services/analytics-reporting": "services/marketing-analytics",
  "resources/email-subject-line-tester": "free-tools/free-email-subject-tester",
  "resources/cpc-calculator": "free-tools/free-google-ads-estimator",
  "resources/meta-tag-analyzer": "free-tools/free-meta-description-generator",
  "resources/content-brief-builder": "free-tools/free-content-brief-generator",
  "home-decor-interior-design-online-digital-marketing-agency": "industries/interior-design",
};

const SKIP_PREFIX = /^(?:en|ar|ur)(?:\/|$)|^(?:api|_next|images|admin|brand|sitemaps?|robots|llms)(?:\/|\.|$)/;

/**
 * Blog bodies contain site-relative links such as /blog/x, /contact or /services/y. Those only work through a
 * redirect to /en/..., which search engines report as "Page with redirect". Rewrite them to the final URL.
 */
export function localizeInternalLinks(html: string, locale: string): string {
  return html.replace(/href="\/(?!\/)([^"#?]*)([^"]*)"/g, (match, path: string, rest: string) => {
    const clean = path.replace(/\/+$/, "");
    if (SKIP_PREFIX.test(clean)) {
      // Already localized: still fix known-bad targets and old tool paths.
      const m = clean.match(/^(?:en|ar|ur)\/(.*)$/);
      if (!m) return match;
      const target = fixTarget(m[1]);
      return target === m[1] ? match : `href="/${locale}/${target}${rest}"`;
    }
    const target = fixTarget(clean);
    return `href="/${locale}${target ? "/" + target : ""}${rest}"`;
  });
}

function fixTarget(path: string): string {
  if (LINK_ALIASES[path]) return LINK_ALIASES[path];
  const tool = path.match(/^resources\/([a-z0-9-]+)$/);
  if (tool && FREE_TOOL_SLUGS.has(tool[1])) return `free-tools/free-${tool[1]}`;
  return path;
}
