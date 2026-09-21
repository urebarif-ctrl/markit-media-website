import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing Expense Tracker | Free Tool | Markit Media",
  description:
    "Track marketing expenses by channel, campaign, and month. Visualise spend distribution, monitor budgets, and export reports.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
