import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brand Positioning Statement Generator — Stand Out From Competitors",
  description:
    "Use our free brand positioning tool to create a clear positioning statement with a differentiation framework. Define your target audience, value proposition, and competitive edge.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/brand-positioning" },
  openGraph: {
    title: "Brand Positioning Statement Generator",
    description:
      "Free tool to create positioning statements with a differentiation framework. Define your value proposition and competitive edge.",
  },
};

export default function BrandPositioningLayout({ children }: { children: React.ReactNode }) {
  return children;
}
