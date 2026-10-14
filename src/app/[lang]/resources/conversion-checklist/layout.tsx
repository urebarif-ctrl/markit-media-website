import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conversion Rate Optimization Checklist — Boost Your Conversions",
  description:
    "Use our free CRO checklist to audit your website for conversion rate improvements. Covers page speed, CTAs, forms, trust signals, mobile UX, and more.",
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-conversion-checklist" },
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-conversion-checklist",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Free CRO Checklist for Websites",
    description:
      "Audit your website for conversion improvements. Covers page speed, CTAs, forms, trust signals, mobile UX, and more.",
  },
};

export default function ConversionChecklistLayout({ children }: { children: React.ReactNode }) {
  return children;
}
