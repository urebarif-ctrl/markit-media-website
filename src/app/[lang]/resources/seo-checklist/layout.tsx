import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEO Checklist — Cover Every Ranking Factor That Matters",
  description:
    "Work through this free comprehensive SEO checklist covering technical SEO, on-page optimization, analytics, content strategy, and local SEO. Nothing slips through the cracks.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/seo-checklist" },
  openGraph: {
    title: "Free Comprehensive SEO Checklist",
    description:
      "Complete SEO checklist covering technical SEO, on-page, analytics, content, and local SEO. Ensure nothing slips through the cracks.",
  },
};

export default function SeoChecklistLayout({ children }: { children: React.ReactNode }) {
  return children;
}
