import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Email ROI Calculator — Measure Your Email Marketing Returns",
  description:
    "Free email ROI calculator that computes your email marketing return from list size, open rates, and conversion metrics.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/email-roi-calculator" },
  openGraph: {
    title: "Email ROI Calculator — Measure Returns",
    description:
      "Free calculator that computes your email marketing return from list size, open rates, and conversion metrics.",
  },
};

export default function EmailRoiCalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
