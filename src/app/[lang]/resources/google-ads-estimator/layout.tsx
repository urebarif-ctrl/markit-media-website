import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Google Ads Cost Estimator — Forecast Clicks, Costs & Conversions",
  description:
    "Free Google Ads estimator that forecasts costs, clicks, and conversions by industry and location before you spend a dollar.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/google-ads-estimator" },
  openGraph: {
    title: "Google Ads Cost Estimator",
    description:
      "Free estimator that forecasts Google Ads costs, clicks, and conversions by industry and location before you spend a dollar.",
  },
};

export default function GoogleAdsEstimatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
