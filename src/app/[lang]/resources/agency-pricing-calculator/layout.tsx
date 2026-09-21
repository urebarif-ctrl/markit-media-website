import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agency Pricing Calculator | Free Marketing Tool | Markit Media",
  description:
    "Calculate agency service pricing across hourly, retainer, and project-based models. Compare industry benchmarks, estimate costs by team composition, and export your pricing plan.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/agency-pricing-calculator" },
  openGraph: {
    title: "Agency Pricing Calculator | Free Marketing Tool | Markit Media",
    description:
      "Calculate agency service pricing across hourly, retainer, and project-based models. Compare industry benchmarks and export your pricing plan.",
    url: "https://themarkitmedia.com/en/resources/agency-pricing-calculator",
    type: "website",
  },
};

export default function AgencyPricingCalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
