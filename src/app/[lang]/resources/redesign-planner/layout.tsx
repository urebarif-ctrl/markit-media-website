import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website Redesign Planner",
  description: "Plan your website redesign with a structured assessment of current site health, goals, scope, and get a prioritized improvement roadmap.",
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-redesign-planner" },
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-redesign-planner",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Website Redesign Planner",
    description: "Plan your redesign with site assessment, timeline, budget, and a prioritized roadmap.",
  },
};

export default function RedesignPlannerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
