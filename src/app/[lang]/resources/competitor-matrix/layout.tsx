import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Competitor Analysis Matrix",
  description: "Rate your company and competitors across 10 dimensions, visualize gaps with a radar chart, and get strategic recommendations.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/competitor-matrix" },
  openGraph: {
    title: "Competitor Analysis Matrix",
    description: "Compare your company against competitors across 10 dimensions with visual analysis.",
  },
};

export default function CompetitorMatrixLayout({ children }: { children: React.ReactNode }) {
  return children;
}
