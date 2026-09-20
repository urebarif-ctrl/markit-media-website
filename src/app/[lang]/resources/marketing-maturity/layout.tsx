import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing Maturity Assessment — Find Your Growth Gaps",
  description:
    "Free marketing maturity assessment that scores your strategy, analytics, content, and tech stack so you know where to level up.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/marketing-maturity" },
  openGraph: {
    title: "Marketing Maturity Assessment",
    description:
      "Free assessment that scores your strategy, analytics, content, and tech stack so you know exactly where to level up.",
  },
};

export default function MarketingMaturityLayout({ children }: { children: React.ReactNode }) {
  return children;
}
