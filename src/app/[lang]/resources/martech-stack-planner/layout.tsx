import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Martech Stack Planner | Free Tool | Markit Media",
  description:
    "Plan, budget, and optimize your marketing technology stack. Compare tools across 8 categories, track costs, map integrations, and detect overlaps — free interactive planner.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/martech-stack-planner" },
  openGraph: {
    title: "Martech Stack Planner | Free Tool | Markit Media",
    description:
      "Plan, budget, and optimize your marketing technology stack. Compare tools across 8 categories, track costs, map integrations, and detect overlaps.",
  },
};

export default function MartechStackPlannerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
