import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEO Content Gap Finder",
  description: "Identify content gaps in your SEO strategy by analyzing your topic coverage against competitors and search intent to find untapped ranking opportunities.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/seo-gap-finder" },
  openGraph: {
    title: "SEO Content Gap Finder",
    description: "Find untapped ranking opportunities by analyzing content gaps in your SEO strategy.",
  },
};

export default function SeoGapFinderLayout({ children }: { children: React.ReactNode }) {
  return children;
}
