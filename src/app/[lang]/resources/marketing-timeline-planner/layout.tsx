import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing Timeline Planner | Free Tool | Markit Media",
  description:
    "Plan marketing campaigns with a visual timeline. Add milestones, set dependencies, assign channels, and export your campaign schedule.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
