import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Influencer ROI Calculator — Measure Campaign Returns by Tier",
  description:
    "Free influencer ROI calculator that estimates campaign returns by influencer tier, platform, and campaign type.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/influencer-roi" },
  openGraph: {
    title: "Influencer ROI Calculator",
    description:
      "Free calculator that estimates influencer campaign returns by tier, platform, and campaign type.",
  },
};

export default function InfluencerRoiLayout({ children }: { children: React.ReactNode }) {
  return children;
}
