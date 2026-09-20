import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website Audit Scorecard — Grade Every Page That Matters",
  description:
    "Run a free comprehensive website audit covering technical SEO, UX, content quality, conversions, and trust signals. Get a clear scorecard with prioritized fixes.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/website-audit" },
  openGraph: {
    title: "Free Website Audit Scorecard",
    description:
      "Audit your website across technical SEO, UX, content, conversions, and trust signals. Get a prioritized scorecard of fixes.",
  },
};

export default function WebsiteAuditLayout({ children }: { children: React.ReactNode }) {
  return children;
}
