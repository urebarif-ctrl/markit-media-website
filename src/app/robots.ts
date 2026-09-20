import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: ["/admin", "/api/"],
      },
    ],
    sitemap: "https://themarkitmedia.com/sitemap.xml",
  };
}
