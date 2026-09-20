import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing Page Optimizer",
  description: "Audit and optimize your pricing page for conversions with actionable recommendations.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/pricing-optimizer" },
  openGraph: {
    title: "Pricing Page Optimizer",
    description: "Audit and optimize your pricing page for conversions with actionable recommendations.",
  },
};

export default function PricingOptimizerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
