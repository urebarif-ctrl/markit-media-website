import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing KPI Dashboard Builder | Free Tool | Markit Media",
  description:
    "Build a custom KPI dashboard for your marketing team. Select metrics by function, set targets, track progress, and export reports.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
