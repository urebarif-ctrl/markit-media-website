import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website Redesign Planner",
  description: "Plan your website redesign with a structured assessment of current site health, goals, scope, and get a prioritized improvement roadmap.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/redesign-planner" },
  openGraph: {
    title: "Website Redesign Planner",
    description: "Plan your redesign with site assessment, timeline, budget, and a prioritized roadmap.",
  },
};

export default function RedesignPlannerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
