import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing Metrics Benchmark Tool | Free Tool | Markit Media",
  description:
    "Compare your marketing metrics against industry benchmarks. Explore 50+ metrics with definitions, formulas, benchmarks, and optimization tips.",
  openGraph: {
    title: "Marketing Metrics Benchmark Tool | Free Tool | Markit Media",
    description:
      "Compare your marketing metrics against industry benchmarks.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
