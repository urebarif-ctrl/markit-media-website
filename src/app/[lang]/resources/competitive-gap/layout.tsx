import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Competitive Gap Analysis — Score Your Marketing vs Rivals",
  description:
    "Use our free competitive gap analysis tool to score your business against competitors across key marketing dimensions. Identify strengths, weaknesses, and opportunities to differentiate.",
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-competitive-gap" },
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-competitive-gap",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Competitive Gap Analysis Tool",
    description:
      "Score your marketing against competitors across key dimensions. Identify gaps and opportunities to differentiate.",
  },
};

export default function CompetitiveGapLayout({ children }: { children: React.ReactNode }) {
  return children;
}
