import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Audience Targeting Worksheet | Free Marketing Tool",
  description:
    "Define your ideal customer with this interactive worksheet. Map demographics, psychographics, pain points, and preferred channels, then export your targeting brief.",
  openGraph: {
    title: "Audience Targeting Worksheet",
    description:
      "Free interactive worksheet to define and document your target audience for marketing campaigns.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
