import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Content Performance Scorecard | Free Marketing Tool | Markit Media",
  description:
    "Score your content across 8 dimensions with customizable weights. Compare multiple content pieces with radar charts, get tier classifications, and export actionable recommendations.",
  alternates: {
    canonical:
      "https://themarkitmedia.com/en/resources/content-performance-scorecard",
  },
  openGraph: {
    title: "Content Performance Scorecard | Free Marketing Tool | Markit Media",
    description:
      "Rate content across Traffic, Engagement, Conversions, Social Shares, Backlinks, SEO Ranking, Freshness, and Audience Fit. Compare pieces side-by-side with radar charts and get tier-based action plans.",
  },
};

export default function ContentPerformanceScorecardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
