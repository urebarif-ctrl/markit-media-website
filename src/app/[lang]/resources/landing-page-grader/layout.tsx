import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Landing Page Grader — Score Copy, Design, Trust & CTAs",
  description:
    "Free landing page grader that scores your page across copy, design, trust signals, and CTA effectiveness with actionable fixes.",
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-landing-page-grader" },
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-landing-page-grader",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Landing Page Grader — Score Your Page",
    description:
      "Free grader that scores landing pages across copy, design, trust signals, and CTA effectiveness with actionable fixes.",
  },
};

export default function LandingPageGraderLayout({ children }: { children: React.ReactNode }) {
  return children;
}
