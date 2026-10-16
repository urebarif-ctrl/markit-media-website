import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-marketing-kpi-tracker" },
  title: "Marketing KPI Tracker | Free Tool",
  description: "Track your marketing KPIs over time. Set targets, record monthly actuals, visualize trends, and identify areas that need attention.",
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-marketing-kpi-tracker",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Marketing KPI Tracker | Free Tool",
    description: "Track marketing KPIs with targets, trends, and alerts.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
