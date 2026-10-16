import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-competitive-swot-analyzer" },
  title: "Competitive SWOT Analyzer | Free Tool",
  description: "Perform a structured SWOT analysis of your competitors. Compare strengths, weaknesses, opportunities, and threats across multiple competitors.",
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-competitive-swot-analyzer",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Competitive SWOT Analyzer | Free Tool",
    description: "Perform structured SWOT analysis across multiple competitors.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
