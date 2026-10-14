import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Email ROI Calculator — Measure Your Email Marketing Returns",
  description:
    "Free email ROI calculator that computes your email marketing return from list size, open rates, and conversion metrics.",
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-email-roi-calculator" },
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-email-roi-calculator",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Email ROI Calculator — Measure Returns",
    description:
      "Free calculator that computes your email marketing return from list size, open rates, and conversion metrics.",
  },
};

export default function EmailRoiCalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
