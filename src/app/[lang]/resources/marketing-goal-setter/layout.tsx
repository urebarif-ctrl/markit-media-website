import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-marketing-goal-setter" },
  title: "Marketing Goal Setter | SMART Goals Tool",
  description:
    "Set SMART marketing goals with structured templates for traffic, leads, revenue, brand awareness, and engagement. Track progress and export your goal plan.",
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-marketing-goal-setter",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Marketing Goal Setter",
    description: "Free interactive tool to set and track SMART marketing goals.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
