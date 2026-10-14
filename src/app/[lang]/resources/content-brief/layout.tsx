import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Content Brief Generator — Create SEO-Optimized Briefs",
  description:
    "Use our free content brief generator to create detailed SEO content briefs with keyword targeting, outlines, and competitor insights. Give writers everything they need in one document.",
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-content-brief" },
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-content-brief",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Free SEO Content Brief Generator",
    description:
      "Generate detailed content briefs with keyword targeting, outlines, and competitor insights. Everything writers need in one doc.",
  },
};

export default function ContentBriefLayout({ children }: { children: React.ReactNode }) {
  return children;
}
