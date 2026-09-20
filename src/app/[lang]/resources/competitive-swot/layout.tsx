import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Competitive SWOT Analysis — Compare Strengths & Weaknesses",
  description:
    "Use our free competitive SWOT analysis tool to compare your business side-by-side with competitors. Map strengths, weaknesses, opportunities, and threats in one clear view.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/competitive-swot" },
  openGraph: {
    title: "Free Competitive SWOT Analysis Tool",
    description:
      "Compare your business vs competitors with side-by-side SWOT analysis. Map strengths, weaknesses, opportunities, and threats.",
  },
};

export default function CompetitiveSWOTLayout({ children }: { children: React.ReactNode }) {
  return children;
}
