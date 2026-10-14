import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meta Description Generator — Write Click-Worthy SEO Descriptions",
  description:
    "Generate optimized meta descriptions for blog posts, service pages, and product pages with this free template-based tool. Improve CTR and search visibility instantly.",
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-meta-description-generator" },
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-meta-description-generator",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Free Meta Description Generator Tool",
    description:
      "Generate optimized meta descriptions for any page type using proven templates. Boost your click-through rates with perfectly crafted SEO snippets.",
  },
};

export default function MetaDescriptionGeneratorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
