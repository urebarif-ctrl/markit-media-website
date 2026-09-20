import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customer Lifetime Value Calculator — Measure LTV & CAC",
  description:
    "Use our free CLV calculator to compute customer lifetime value, LTV:CAC ratio, and payback period. Make smarter acquisition decisions with data-driven insights.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/clv-calculator" },
  openGraph: {
    title: "Free Customer Lifetime Value Calculator",
    description:
      "Calculate customer lifetime value, LTV:CAC ratio, and payback period. Make smarter acquisition and retention decisions.",
  },
};

export default function CLVCalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
