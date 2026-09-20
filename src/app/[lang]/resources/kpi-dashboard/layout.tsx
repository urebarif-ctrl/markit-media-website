import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KPI Dashboard Builder — Track the Metrics That Matter",
  description:
    "Free KPI dashboard builder that creates custom marketing dashboards based on your business goals and active channels.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/kpi-dashboard" },
  openGraph: {
    title: "KPI Dashboard Builder",
    description:
      "Free dashboard builder that creates custom marketing KPI views based on your business goals and active channels.",
  },
};

export default function KpiDashboardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
