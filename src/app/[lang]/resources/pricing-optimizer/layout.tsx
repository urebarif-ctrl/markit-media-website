import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing Page Optimizer",
  description: "Audit and optimize your pricing page for conversions with actionable recommendations.",
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-pricing-optimizer" },
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-pricing-optimizer",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Pricing Page Optimizer",
    description: "Audit and optimize your pricing page for conversions with actionable recommendations.",
  },
};

export default function PricingOptimizerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
