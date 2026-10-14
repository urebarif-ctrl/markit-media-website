import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PPC Audit Checklist — Find Wasted Ad Spend Fast",
  description:
    "Audit your PPC campaigns with this free checklist covering account structure, keywords, ad copy, bidding strategy, and conversion tracking. Stop wasting budget today.",
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-ppc-audit-checklist" },
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-ppc-audit-checklist",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Free PPC Campaign Audit Checklist",
    description:
      "Comprehensive PPC audit checklist covering account structure, keywords, ad copy, bidding, and tracking. Find and fix wasted ad spend.",
  },
};

export default function PpcAuditChecklistLayout({ children }: { children: React.ReactNode }) {
  return children;
}
