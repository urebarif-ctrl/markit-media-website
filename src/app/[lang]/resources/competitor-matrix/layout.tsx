import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Competitor Analysis Matrix",
  description: "Rate your company and competitors across 10 dimensions, visualize gaps with a radar chart, and get strategic recommendations.",
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-competitor-matrix" },
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-competitor-matrix",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Competitor Analysis Matrix",
    description: "Compare your company against competitors across 10 dimensions with visual analysis.",
  },
};

export default function CompetitorMatrixLayout({ children }: { children: React.ReactNode }) {
  return children;
}
