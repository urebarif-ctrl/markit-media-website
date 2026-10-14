import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing Budget Planner — Allocate Spend by Channel & Goal",
  description:
    "Free marketing budget planner that builds a monthly channel allocation based on your business stage, goals, and total budget.",
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-marketing-budget-planner" },
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-marketing-budget-planner",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Marketing Budget Planner",
    description:
      "Free planner that builds a monthly marketing budget allocation by channel based on your business stage and goals.",
  },
};

export default function MarketingBudgetPlannerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
