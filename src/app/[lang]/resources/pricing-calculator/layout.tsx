import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing Pricing Calculator — Estimate Service Costs Instantly",
  description:
    "Estimate marketing service pricing based on your business size, services needed, and engagement type with this free calculator. Budget with confidence before hiring an agency.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/pricing-calculator" },
  openGraph: {
    title: "Free Marketing Pricing Calculator",
    description:
      "Estimate marketing service costs based on business size, services needed, and engagement type. Plan your budget before hiring an agency.",
  },
};

export default function PricingCalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
