import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-pricing-page-analyzer" },
  title: "Pricing Page Analyser | Free Conversion Tool",
  description:
    "Analyse your pricing page against proven conversion best practices. Get a score and actionable recommendations to improve your pricing page performance.",
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-pricing-page-analyzer",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Pricing Page Analyser",
    description: "Free tool to analyse and improve your pricing page for better conversions.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
