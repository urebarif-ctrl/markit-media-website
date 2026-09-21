import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing Proposal Generator | Free Tool | Markit Media",
  description:
    "Generate professional marketing proposals with scope, deliverables, timeline, and pricing sections. Free tool from Markit Media.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/marketing-proposal-generator" },
  openGraph: {
    title: "Marketing Proposal Generator | Free Tool | Markit Media",
    description:
      "Generate professional marketing proposals with scope, deliverables, timeline, and pricing sections.",
  },
};

export default function MarketingProposalGeneratorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
