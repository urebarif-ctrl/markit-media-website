import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SWOT Analysis Builder — Turn Insights Into Strategy",
  description:
    "Build an interactive SWOT analysis with strategic cross-quadrant recommendations using this free tool. Identify strengths, weaknesses, opportunities, and threats clearly.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/swot-analysis" },
  openGraph: {
    title: "Free Interactive SWOT Analysis Builder",
    description:
      "Build a SWOT analysis with cross-quadrant strategic recommendations. Turn strengths, weaknesses, opportunities, and threats into action.",
  },
};

export default function SwotAnalysisLayout({ children }: { children: React.ReactNode }) {
  return children;
}
