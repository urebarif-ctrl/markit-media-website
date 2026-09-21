import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customer Retention Calculator | Free Marketing Tool | Markit Media",
  description:
    "Calculate customer retention rate, churn rate, and lifetime value with our free interactive tool. Track monthly cohorts, compare industry benchmarks, and model revenue impact of retention improvements.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/resources/retention-calculator",
  },
  openGraph: {
    title: "Customer Retention Calculator | Free Marketing Tool | Markit Media",
    description:
      "Free interactive retention calculator. Measure churn, track cohorts, compare benchmarks, and see the revenue impact of improving customer retention.",
    url: "https://themarkitmedia.com/en/resources/retention-calculator",
    siteName: "Markit Media",
    type: "website",
  },
};

export default function RetentionCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
