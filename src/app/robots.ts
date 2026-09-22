import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const isPreview = !process.env.PRODUCTION_DEPLOY;

  if (isPreview) {
    return {
      rules: [{ userAgent: "*", disallow: ["/"] }],
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/"],
        disallow: ["/admin", "/api/", "/ar/", "/ur/", "/_next/"],
      },
      {
        userAgent: "GPTBot",
        disallow: ["/"],
      },
      {
        userAgent: "ChatGPT-User",
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
    sitemap: "https://themarkitmedia.com/sitemap.xml",
    host: "https://themarkitmedia.com",
  };
}
