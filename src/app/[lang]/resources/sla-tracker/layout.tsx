import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing SLA Tracker | Free Tool | Markit Media",
  description:
    "Track and manage your marketing service level agreements with this free SLA tracker. Monitor compliance rates, identify at-risk deliverables, and maintain accountability across agency-client relationships.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/sla-tracker" },
  openGraph: {
    title: "Marketing SLA Tracker | Free Tool | Markit Media",
    description:
      "Track and manage your marketing service level agreements. Monitor compliance rates, identify at-risk deliverables, and maintain accountability.",
  },
};

export default function SlaTrackerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
