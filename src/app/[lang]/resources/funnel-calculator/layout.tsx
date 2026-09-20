import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Funnel Calculator — Track Conversions at Every Stage",
  description:
    "Free funnel calculator that computes conversion metrics at each marketing funnel stage so you can spot exactly where leads drop off.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/funnel-calculator" },
  openGraph: {
    title: "Funnel Calculator — Track Every Stage",
    description:
      "Free calculator that computes conversion metrics at each funnel stage so you can spot exactly where leads drop off.",
  },
};

export default function FunnelCalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
