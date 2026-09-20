import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Content Gap Analyzer — Find Missing Content Opportunities",
  description:
    "Use our free content gap analyzer to identify missing content across every stage of the buyer journey. Discover topics your competitors cover that you do not.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/content-gap-analyzer" },
  openGraph: {
    title: "Free Content Gap Analyzer",
    description:
      "Identify content gaps across the buyer journey. Discover topics your competitors cover that you're missing.",
  },
};

export default function ContentGapAnalyzerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
