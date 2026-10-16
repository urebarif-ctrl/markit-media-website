import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-competitor-benchmarking" },
  title: "Competitor Benchmarking Dashboard | Free Tool",
  description: "Benchmark your business against competitors across 6 key dimensions. Track market position, identify gaps, and discover competitive advantages.",
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-competitor-benchmarking",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Competitor Benchmarking Dashboard | Free Tool",
    description: "Benchmark your business against competitors across 6 dimensions.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
