import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-kpi-builder" },
  title: "Marketing KPI Dashboard Builder | Free Tool",
  description:
    "Build a custom KPI dashboard for your marketing team. Select metrics by function, set targets, track progress, and export reports.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
