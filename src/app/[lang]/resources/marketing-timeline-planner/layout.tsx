import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-marketing-timeline-planner" },
  title: "Marketing Timeline Planner | Free Tool",
  description:
    "Plan marketing campaigns with a visual timeline. Add milestones, set dependencies, assign channels, and export your campaign schedule.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
