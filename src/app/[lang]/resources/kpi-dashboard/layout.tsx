import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KPI Dashboard Builder — Track the Metrics That Matter",
  description:
    "Free KPI dashboard builder that creates custom marketing dashboards based on your business goals and active channels.",
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-kpi-dashboard" },
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-kpi-dashboard",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "KPI Dashboard Builder",
    description:
      "Free dashboard builder that creates custom marketing KPI views based on your business goals and active channels.",
  },
};

export default function KpiDashboardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
