import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customer Journey Mapper — Map Touchpoints, Emotions & Opportunities",
  description:
    "Free customer journey mapping tool. Define your audience, map 5 journey stages with touchpoints, emotions, pain points, and opportunities, then visualize the experience with an emotion curve.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/customer-journey-mapper" },
  openGraph: {
    title: "Customer Journey Mapper — Visualize Your Customer Experience",
    description:
      "Free tool to map customer journey stages, touchpoints, emotions, pain points, and opportunities with a visual emotion curve.",
  },
};

export default function CustomerJourneyMapperLayout({ children }: { children: React.ReactNode }) {
  return children;
}
