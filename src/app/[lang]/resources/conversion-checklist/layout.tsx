import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conversion Rate Optimization Checklist — Boost Your Conversions",
  description:
    "Use our free CRO checklist to audit your website for conversion rate improvements. Covers page speed, CTAs, forms, trust signals, mobile UX, and more.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/conversion-checklist" },
  openGraph: {
    title: "Free CRO Checklist for Websites",
    description:
      "Audit your website for conversion improvements. Covers page speed, CTAs, forms, trust signals, mobile UX, and more.",
  },
};

export default function ConversionChecklistLayout({ children }: { children: React.ReactNode }) {
  return children;
}
