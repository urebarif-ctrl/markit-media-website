import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.PRODUCTION_DEPLOY === "true" || process.env.CF_PAGES_BRANCH === "main";

  if (!isProduction) {
    return {
      rules: [{ userAgent: "*", disallow: ["/"] }],
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/"],
        disallow: ["/admin", "/api/", "/ar/", "/ur/"],
      },
      // AI search, citation and user-initiated fetch bots: allowed so Markit Media can appear in AI answers.
      // (Training crawlers GPTBot, CCBot, anthropic-ai and Google-Extended stay blocked below.)
      {
        userAgent: ["OAI-SearchBot", "ChatGPT-User", "PerplexityBot", "Perplexity-User", "Claude-SearchBot", "Claude-User"],
        allow: ["/"],
        disallow: ["/admin", "/api/", "/ar/", "/ur/"],
      },
      {
        userAgent: "GPTBot",
        disallow: ["/"],
      },
      {
        userAgent: "CCBot",
        disallow: ["/"],
      },
      {
        userAgent: "anthropic-ai",
        disallow: ["/"],
      },
      {
        userAgent: "Google-Extended",
        disallow: ["/"],
      },
    ],
    sitemap: "https://themarkitmedia.com/sitemap-index.xml",
    host: "https://themarkitmedia.com",
  };
}
