import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Backlink Profile Analyzer | Free SEO Tool | Markit Media",
  description:
    "Analyze your backlink profile with our free tool. Score link quality, visualize DA distribution, detect anchor text over-optimization, and get actionable improvement recommendations.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/backlink-analyzer" },
  openGraph: {
    title: "Backlink Profile Analyzer | Free SEO Tool | Markit Media",
    description:
      "Analyze your backlink profile for free. Score link quality, chart DA distribution, review anchor text diversity, and export your analysis.",
    type: "website",
    url: "https://themarkitmedia.com/en/resources/backlink-analyzer",
  },
};

export default function BacklinkAnalyzerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
