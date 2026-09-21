import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing ROI Dashboard — Compare Channel Performance",
  description:
    "Free interactive ROI dashboard to compare marketing channel performance side by side. Track ROI, cost per lead, and get budget reallocation suggestions.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/roi-dashboard" },
  openGraph: {
    title: "Marketing ROI Dashboard",
    description:
      "Compare marketing channel performance with ROI calculations, budget allocation charts, and optimization suggestions.",
  },
};

export default function RoiDashboardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
