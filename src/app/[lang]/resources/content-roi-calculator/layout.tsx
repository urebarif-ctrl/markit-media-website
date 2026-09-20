import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Content ROI Calculator — Measure Your Content Marketing Returns",
  description:
    "Use our free content ROI calculator to project your content marketing returns over time. Factor in traffic growth, conversion rates, and production costs to see real ROI.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/content-roi-calculator" },
  openGraph: {
    title: "Free Content Marketing ROI Calculator",
    description:
      "Project content marketing ROI over time. Factor in traffic growth, conversions, and production costs to see real returns.",
  },
};

export default function ContentROICalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
