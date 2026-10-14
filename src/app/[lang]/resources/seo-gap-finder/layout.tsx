import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEO Content Gap Finder",
  description: "Identify content gaps in your SEO strategy by analyzing your topic coverage against competitors and search intent to find untapped ranking opportunities.",
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-seo-gap-finder" },
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-seo-gap-finder",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "SEO Content Gap Finder",
    description: "Find untapped ranking opportunities by analyzing content gaps in your SEO strategy.",
  },
};

export default function SeoGapFinderLayout({ children }: { children: React.ReactNode }) {
  return children;
}
