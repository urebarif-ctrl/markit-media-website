import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing ROI Calculator — Project Your Revenue Growth",
  description:
    "Calculate your marketing ROI by projecting lead increases and revenue from your investment with this free calculator. Make data-driven budget decisions.",
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-roi-calculator" },
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-roi-calculator",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Free Marketing ROI Calculator",
    description:
      "Project lead increases and revenue growth from your marketing investment. Make confident, data-driven budget decisions.",
  },
};

export default function RoiCalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
