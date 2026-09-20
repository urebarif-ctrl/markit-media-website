import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Competitor Analysis Framework — Map Your Market Landscape",
  description:
    "Use our free competitor analysis framework to systematically evaluate your competition. Map their channels, positioning, and strategies to find your competitive advantage.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/competitor-analysis" },
  openGraph: {
    title: "Free Competitor Analysis Framework",
    description:
      "Systematically evaluate competitors with structured analysis. Map channels, positioning, and strategies to find your edge.",
  },
};

export default function CompetitorAnalysisLayout({ children }: { children: React.ReactNode }) {
  return children;
}
