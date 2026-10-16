import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-audience-targeting-worksheet" },
  title: "Audience Targeting Worksheet | Free Marketing Tool",
  description:
    "Define your ideal customer with this interactive worksheet. Map demographics, psychographics, pain points, and preferred channels, then export your targeting brief.",
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-audience-targeting-worksheet",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Audience Targeting Worksheet",
    description:
      "Free interactive worksheet to define and document your target audience for marketing campaigns.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
