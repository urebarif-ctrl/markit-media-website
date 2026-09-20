import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PPC Audit Checklist — Find Wasted Ad Spend Fast",
  description:
    "Audit your PPC campaigns with this free checklist covering account structure, keywords, ad copy, bidding strategy, and conversion tracking. Stop wasting budget today.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/ppc-audit-checklist" },
  openGraph: {
    title: "Free PPC Campaign Audit Checklist",
    description:
      "Comprehensive PPC audit checklist covering account structure, keywords, ad copy, bidding, and tracking. Find and fix wasted ad spend.",
  },
};

export default function PpcAuditChecklistLayout({ children }: { children: React.ReactNode }) {
  return children;
}
