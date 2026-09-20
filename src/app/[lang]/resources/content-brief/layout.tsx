import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Content Brief Generator — Create SEO-Optimized Briefs",
  description:
    "Use our free content brief generator to create detailed SEO content briefs with keyword targeting, outlines, and competitor insights. Give writers everything they need in one document.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/content-brief" },
  openGraph: {
    title: "Free SEO Content Brief Generator",
    description:
      "Generate detailed content briefs with keyword targeting, outlines, and competitor insights. Everything writers need in one doc.",
  },
};

export default function ContentBriefLayout({ children }: { children: React.ReactNode }) {
  return children;
}
