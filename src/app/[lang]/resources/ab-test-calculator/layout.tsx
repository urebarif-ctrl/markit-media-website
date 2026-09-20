import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "A/B Test Sample Size Calculator — Run Confident Experiments",
  description:
    "Use our free A/B test sample size calculator to determine how many visitors you need for statistically significant results. Set confidence level, power, and minimum detectable effect.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/ab-test-calculator" },
  openGraph: {
    title: "A/B Test Sample Size Calculator",
    description:
      "Free calculator to find how many visitors your A/B test needs for statistically significant results. Set confidence, power, and MDE.",
  },
};

export default function ABTestCalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
