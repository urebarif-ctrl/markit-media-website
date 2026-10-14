import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing Proposal Generator | Free Tool",
  description:
    "Generate professional marketing proposals with scope, deliverables, timeline, and pricing sections. Free tool from Markit Media.",
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-marketing-proposal-generator" },
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-marketing-proposal-generator",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Marketing Proposal Generator | Free Tool",
    description:
      "Generate professional marketing proposals with scope, deliverables, timeline, and pricing sections.",
  },
};

export default function MarketingProposalGeneratorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
