import { FREE_TOOL_SLUGS } from "@/data/free-tool-slugs";

// Links stored inside blog post bodies that point at pages that moved or never existed.
const LINK_ALIASES: Record<string, string> = {
  "services/website-development/freelance-website-developers": "services/website-development/freelance-developers",
  "services/white-label/white-label-web-development": "services/white-label/web-development",
  "services/analytics-reporting": "services/marketing-analytics",
  "resources/email-subject-line-tester": "free-tools/free-email-subject-tester",
  "resources/cpc-calculator": "free-tools/free-google-ads-estimator",
  "resources/meta-tag-analyzer": "free-tools/free-meta-description-generator",
  "resources/brand-tone-of-voice-generator": "free-tools/free-brand-tone-generator",
  "resources/email-warm-up-planner": "free-tools/free-email-warmup-planner",
  "resources/pricing-strategy-calculator": "free-tools/free-pricing-calculator",
  "resources/content-brief-builder": "free-tools/free-content-brief-generator",
  "home-decor-interior-design-online-digital-marketing-agency": "industries/interior-design",
};

const SKIP_PREFIX = /^(?:en|ar|ur)(?:\/|$)|^(?:api|_next|images|admin|brand|sitemaps?|robots|llms)(?:\/|\.|$)/;

/**
 * Blog bodies contain site-relative links such as /blog/x, /contact or /services/y. Those only work through a
 * redirect to /en/..., which search engines report as "Page with redirect". Rewrite them to the final URL.
 */
export function localizeInternalLinks(html: string, locale: string): string {
  // Some bodies carry unquoted values (<a href=/blog/x>), which the pattern below would skip: quote them first.
  html = html.replace(/(<a\b[^>]*?\shref=)(\/(?!\/)[^\s>"']*)/g, '$1"$2"');
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

/**
 * Post bodies link to other posts, and most of those targets are now noindexed. Linking to a noindexed page from an
 * indexable one wastes crawl budget and link equity, so such links render as plain text (the words stay, the link goes).
 * Expects localized, quoted hrefs: run it after localizeInternalLinks().
 */
export function unlinkNoindexedPosts(html: string, noindexed: Set<string>, currentSlug: string): string {
  if (noindexed.size === 0) return html;
  return html.replace(
    /<a\b[^>]*?\shref="(?:https:\/\/themarkitmedia\.com)?\/(?:en|ar|ur)\/blog\/([a-z0-9-]+)\/?(?:[?#][^"]*)?"[^>]*>([\s\S]*?)<\/a>/gi,
    (match, slug: string, inner: string) => (slug !== currentSlug && noindexed.has(slug) ? inner : match),
  );
}

/** One generated post title contains "Strategy Strategy"; other posts quote it in their text. */
export function fixKnownTypos(html: string): string {
  return html.replace(/\bMarketing Strategy Strategy\b/g, "Marketing Strategy");
}
