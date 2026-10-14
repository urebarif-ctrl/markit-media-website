import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing ROI Dashboard — Compare Channel Performance",
  description:
    "Free interactive ROI dashboard to compare marketing channel performance side by side. Track ROI, cost per lead, and get budget reallocation suggestions.",
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-roi-dashboard" },
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-roi-dashboard",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Marketing ROI Dashboard",
    description:
      "Compare marketing channel performance with ROI calculations, budget allocation charts, and optimization suggestions.",
  },
};

export default function RoiDashboardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
