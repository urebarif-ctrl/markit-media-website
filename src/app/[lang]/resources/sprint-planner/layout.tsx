import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing Sprint Planner | Free Tool | Markit Media",
  description:
    "Free 2-week marketing sprint planner with Kanban board, burndown tracking, and effort estimation. Plan agile marketing sprints, assign tasks, and track velocity.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/sprint-planner" },
  openGraph: {
    title: "Marketing Sprint Planner | Free Tool | Markit Media",
    description:
      "Free 2-week marketing sprint planner with Kanban board, burndown tracking, and effort estimation. Plan agile marketing sprints, assign tasks, and track velocity.",
    url: "https://themarkitmedia.com/en/resources/sprint-planner",
    type: "website",
  },
};

export default function SprintPlannerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
