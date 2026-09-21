import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEO Audit Score Calculator",
  description: "Free SEO audit tool with 40 checkpoints across technical, on-page, content, off-page, and UX categories. Get your site's SEO health score and prioritized recommendations.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/seo-audit-score" },
  openGraph: {
    title: "SEO Audit Score Calculator",
    description: "Assess your website's SEO health with 40 checkpoints and get a prioritized action plan.",
  },
};

export default function SeoAuditScoreLayout({ children }: { children: React.ReactNode }) {
  return children;
}
