import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ad Spend Calculator — Analyze CPA & ROAS Efficiency",
  description:
    "Use our free ad spend calculator to analyze your advertising efficiency across platforms. Calculate CPA, ROAS, and identify where your budget delivers the best returns.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/ad-spend-calculator" },
  openGraph: {
    title: "Ad Spend Efficiency Calculator",
    description:
      "Free tool to analyze ad spend efficiency, CPA, and ROAS across platforms. Find where your budget delivers the best returns.",
  },
};

export default function AdSpendCalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
