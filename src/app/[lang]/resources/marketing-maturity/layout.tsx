import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing Maturity Assessment — Find Your Growth Gaps",
  description:
    "Free marketing maturity assessment that scores your strategy, analytics, content, and tech stack so you know where to level up.",
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-marketing-maturity" },
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-marketing-maturity",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Marketing Maturity Assessment",
    description:
      "Free assessment that scores your strategy, analytics, content, and tech stack so you know exactly where to level up.",
  },
};

export default function MarketingMaturityLayout({ children }: { children: React.ReactNode }) {
  return children;
}
