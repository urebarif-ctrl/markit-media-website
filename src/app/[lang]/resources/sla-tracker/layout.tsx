import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing SLA Tracker | Free Tool",
  description:
    "Track and manage your marketing service level agreements with this free SLA tracker. Monitor compliance rates, identify at-risk deliverables, and maintain accountability across agency-client relationships.",
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-sla-tracker" },
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-sla-tracker",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Marketing SLA Tracker | Free Tool",
    description:
      "Track and manage your marketing service level agreements. Monitor compliance rates, identify at-risk deliverables, and maintain accountability.",
  },
};

export default function SlaTrackerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
