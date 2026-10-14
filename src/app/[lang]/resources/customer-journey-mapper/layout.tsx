import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customer Journey Mapper — Map Touchpoints, Emotions & Opportunities",
  description:
    "Free customer journey mapping tool. Define your audience, map 5 journey stages with touchpoints, emotions, pain points, and opportunities, then visualize the experience with an emotion curve.",
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-customer-journey-mapper" },
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-customer-journey-mapper",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Customer Journey Mapper — Visualize Your Customer Experience",
    description:
      "Free tool to map customer journey stages, touchpoints, emotions, pain points, and opportunities with a visual emotion curve.",
  },
};

export default function CustomerJourneyMapperLayout({ children }: { children: React.ReactNode }) {
  return children;
}
