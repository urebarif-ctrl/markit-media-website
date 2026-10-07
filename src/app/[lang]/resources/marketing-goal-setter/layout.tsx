import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing Goal Setter | SMART Goals Tool",
  description:
    "Set SMART marketing goals with structured templates for traffic, leads, revenue, brand awareness, and engagement. Track progress and export your goal plan.",
  openGraph: {
    title: "Marketing Goal Setter",
    description: "Free interactive tool to set and track SMART marketing goals.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
