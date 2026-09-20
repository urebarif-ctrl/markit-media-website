import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Landing Page Grader — Score Copy, Design, Trust & CTAs",
  description:
    "Free landing page grader that scores your page across copy, design, trust signals, and CTA effectiveness with actionable fixes.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/landing-page-grader" },
  openGraph: {
    title: "Landing Page Grader — Score Your Page",
    description:
      "Free grader that scores landing pages across copy, design, trust signals, and CTA effectiveness with actionable fixes.",
  },
};

export default function LandingPageGraderLayout({ children }: { children: React.ReactNode }) {
  return children;
}
