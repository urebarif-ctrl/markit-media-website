import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Martech Stack Planner | Free Tool",
  description:
    "Plan, budget, and optimize your marketing technology stack. Compare tools across 8 categories, track costs, map integrations, and detect overlaps — free interactive planner.",
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-martech-stack-planner" },
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-martech-stack-planner",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Martech Stack Planner | Free Tool",
    description:
      "Plan, budget, and optimize your marketing technology stack. Compare tools across 8 categories, track costs, map integrations, and detect overlaps.",
  },
};

export default function MartechStackPlannerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
