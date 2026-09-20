import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const isPreview = !process.env.PRODUCTION_DEPLOY;

  return {
    rules: [
      {
        userAgent: "*",
        disallow: isPreview ? ["/"] : ["/admin", "/api/"],
      },
    ],
    ...(isPreview ? {} : { sitemap: "https://themarkitmedia.com/sitemap.xml" }),
  };
}
