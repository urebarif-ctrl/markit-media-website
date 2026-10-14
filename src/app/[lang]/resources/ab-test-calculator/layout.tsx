import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "A/B Test Sample Size Calculator — Run Confident Experiments",
  description:
    "Use our free A/B test sample size calculator to determine how many visitors you need for statistically significant results. Set confidence level, power, and minimum detectable effect.",
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-ab-test-calculator" },
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-ab-test-calculator",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "A/B Test Sample Size Calculator",
    description:
      "Free calculator to find how many visitors your A/B test needs for statistically significant results. Set confidence, power, and MDE.",
  },
};

export default function ABTestCalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
