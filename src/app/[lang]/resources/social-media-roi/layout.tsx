import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Social Media ROI Calculator — Prove Your Social Impact",
  description:
    "Calculate social media ROI from ad spend, engagement, website clicks, and conversion metrics with this free calculator. Show stakeholders the real value of social.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/social-media-roi" },
  openGraph: {
    title: "Free Social Media ROI Calculator",
    description:
      "Calculate social media ROI from ad spend, engagement, clicks, and conversions. Prove the real business value of your social efforts.",
  },
};

export default function SocialMediaRoiLayout({ children }: { children: React.ReactNode }) {
  return children;
}
