import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-marketing-metrics-benchmark" },
  title: "Marketing Metrics Benchmark Tool | Free Tool",
  description:
    "Compare your marketing metrics against industry benchmarks. Explore 50+ metrics with definitions, formulas, benchmarks, and optimization tips.",
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-marketing-metrics-benchmark",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Marketing Metrics Benchmark Tool | Free Tool",
    description:
      "Compare your marketing metrics against industry benchmarks.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
