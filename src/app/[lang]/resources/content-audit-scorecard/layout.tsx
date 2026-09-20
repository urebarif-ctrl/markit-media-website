import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Content Audit Scorecard",
  description: "Evaluate your website content across 30 criteria in 6 categories. Get a maturity level, radar chart, quick wins, and category recommendations.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/content-audit-scorecard" },
  openGraph: {
    title: "Content Audit Scorecard",
    description: "Score your content across 30 criteria and get prioritized improvement recommendations.",
  },
};

export default function ContentAuditScorecardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
