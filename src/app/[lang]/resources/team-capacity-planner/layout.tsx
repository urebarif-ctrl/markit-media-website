import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing Team Capacity Planner | Free Tool | Markit Media",
  description:
    "Plan your marketing team workload with our free capacity planner. Add team members and projects, visualize utilization per role, spot over-allocation, and export your plan.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/team-capacity-planner" },
  openGraph: {
    title: "Marketing Team Capacity Planner | Free Tool | Markit Media",
    description:
      "Plan your marketing team workload with our free capacity planner. Add team members and projects, visualize utilization per role, spot over-allocation, and export your plan.",
    url: "https://themarkitmedia.com/en/resources/team-capacity-planner",
    type: "website",
  },
};

export default function TeamCapacityPlannerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
