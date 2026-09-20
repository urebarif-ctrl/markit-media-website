import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brand Name Generator — Find the Perfect Business Name",
  description:
    "Use our free brand name generator to discover creative business name ideas based on your industry, style, and preferences. Get memorable names with availability insights.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/brand-name-generator" },
  openGraph: {
    title: "Free Brand Name Generator",
    description:
      "Generate creative brand name ideas based on your industry and style preferences. Find memorable names for your business.",
  },
};

export default function BrandNameGeneratorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
