import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conversion Funnel Simulator | Free Tool | Markit Media",
  description: "Simulate your marketing funnel with custom stages, conversion rates, and revenue projections. Identify bottlenecks and optimisation opportunities.",
  openGraph: {
    title: "Conversion Funnel Simulator | Free Tool | Markit Media",
    description: "Simulate your marketing funnel to identify bottlenecks and optimisation opportunities.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
