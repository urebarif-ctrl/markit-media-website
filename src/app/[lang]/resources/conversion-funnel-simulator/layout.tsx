import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-conversion-funnel-simulator" },
  title: "Conversion Funnel Simulator | Free Tool",
  description: "Simulate your marketing funnel with custom stages, conversion rates, and revenue projections. Identify bottlenecks and optimisation opportunities.",
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-conversion-funnel-simulator",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Conversion Funnel Simulator | Free Tool",
    description: "Simulate your marketing funnel to identify bottlenecks and optimisation opportunities.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
