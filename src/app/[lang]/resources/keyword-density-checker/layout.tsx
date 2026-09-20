import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Keyword Density Checker — Analyze Word Frequency & Content Length",
  description:
    "Free keyword density checker that analyzes keyword density, word frequency, and content length to keep your SEO on point.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/keyword-density-checker" },
  openGraph: {
    title: "Keyword Density Checker",
    description:
      "Free checker that analyzes keyword density, word frequency, and content length to keep your SEO on point.",
  },
};

export default function KeywordDensityCheckerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
