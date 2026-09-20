import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing Budget Planner — Allocate Spend by Channel & Goal",
  description:
    "Free marketing budget planner that builds a monthly channel allocation based on your business stage, goals, and total budget.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/marketing-budget-planner" },
  openGraph: {
    title: "Marketing Budget Planner",
    description:
      "Free planner that builds a monthly marketing budget allocation by channel based on your business stage and goals.",
  },
};

export default function MarketingBudgetPlannerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
