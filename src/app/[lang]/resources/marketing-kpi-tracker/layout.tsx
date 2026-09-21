import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing KPI Tracker | Free Tool | Markit Media",
  description: "Track your marketing KPIs over time. Set targets, record monthly actuals, visualize trends, and identify areas that need attention.",
  openGraph: {
    title: "Marketing KPI Tracker | Free Tool | Markit Media",
    description: "Track marketing KPIs with targets, trends, and alerts.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
