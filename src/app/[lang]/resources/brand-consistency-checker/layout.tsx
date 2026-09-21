import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brand Consistency Checker — Audit Your Brand Across Touchpoints",
  description:
    "Rate your brand consistency across website, social media, email, print, and ads. Get an overall score, visual breakdown, and actionable recommendations to strengthen your brand.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/brand-consistency-checker" },
  openGraph: {
    title: "Free Brand Consistency Checker",
    description:
      "Audit your brand consistency across up to 5 touchpoints. Rate logo, color, typography, tone, imagery, and messaging for an instant consistency score with recommendations.",
  },
};

export default function BrandConsistencyCheckerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
