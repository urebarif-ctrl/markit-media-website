import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-ad-budget-pacing" },
  title: "Ad Budget Pacing Calculator | Free Tool",
  description: "Track your advertising budget pacing across campaigns. Monitor spend rate, forecast end-of-month spend, and identify over/under-pacing campaigns.",
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-ad-budget-pacing",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Ad Budget Pacing Calculator | Free Tool",
    description: "Track ad budget pacing and forecast end-of-month spend across campaigns.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
