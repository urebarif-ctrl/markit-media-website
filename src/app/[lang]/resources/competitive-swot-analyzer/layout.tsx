import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Competitive SWOT Analyzer | Free Tool | Markit Media",
  description: "Perform a structured SWOT analysis of your competitors. Compare strengths, weaknesses, opportunities, and threats across multiple competitors.",
  openGraph: {
    title: "Competitive SWOT Analyzer | Free Tool | Markit Media",
    description: "Perform structured SWOT analysis across multiple competitors.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
