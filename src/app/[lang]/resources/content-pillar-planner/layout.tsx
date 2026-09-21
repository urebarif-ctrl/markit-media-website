import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Content Pillar Planner | Free Tool | Markit Media",
  description: "Plan your content pillar strategy with topic clusters, supporting content, and a publishing calendar. Build topical authority systematically.",
  openGraph: {
    title: "Content Pillar Planner | Free Tool | Markit Media",
    description: "Plan your content pillar strategy with topic clusters and a publishing calendar.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
