import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing Audit Scorecard | Free Tool",
  description: "Score your marketing across 8 categories. Identify strengths, weaknesses, and priority improvements with a comprehensive audit scorecard.",
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-marketing-audit-scorecard" },
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-marketing-audit-scorecard",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Marketing Audit Scorecard | Free Tool",
    description: "Score your marketing across 8 categories and identify priority improvements.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
