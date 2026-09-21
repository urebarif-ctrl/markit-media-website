import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Competitor Benchmarking Dashboard | Free Tool | Markit Media",
  description: "Benchmark your business against competitors across 6 key dimensions. Track market position, identify gaps, and discover competitive advantages.",
  openGraph: {
    title: "Competitor Benchmarking Dashboard | Free Tool | Markit Media",
    description: "Benchmark your business against competitors across 6 dimensions.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
