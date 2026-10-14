import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Google Ads Cost Estimator — Forecast Clicks, Costs & Conversions",
  description:
    "Free Google Ads estimator that forecasts costs, clicks, and conversions by industry and location before you spend a dollar.",
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-google-ads-estimator" },
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-google-ads-estimator",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Google Ads Cost Estimator",
    description:
      "Free estimator that forecasts Google Ads costs, clicks, and conversions by industry and location before you spend a dollar.",
  },
};

export default function GoogleAdsEstimatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
