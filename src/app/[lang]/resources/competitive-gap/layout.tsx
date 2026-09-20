import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Competitive Gap Analysis — Score Your Marketing vs Rivals",
  description:
    "Use our free competitive gap analysis tool to score your business against competitors across key marketing dimensions. Identify strengths, weaknesses, and opportunities to differentiate.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/competitive-gap" },
  openGraph: {
    title: "Competitive Gap Analysis Tool",
    description:
      "Score your marketing against competitors across key dimensions. Identify gaps and opportunities to differentiate.",
  },
};

export default function CompetitiveGapLayout({ children }: { children: React.ReactNode }) {
  return children;
}
