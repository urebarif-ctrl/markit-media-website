import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing Stakeholder Report Generator | Free Tool | Markit Media",
  description:
    "Generate professional marketing reports tailored to different stakeholders. Choose from Executive Summary, Board Deck, Team Status, or Client Report templates. Drag to reorder sections, add KPIs, and export print-ready reports.",
  openGraph: {
    title: "Marketing Stakeholder Report Generator | Free Tool | Markit Media",
    description:
      "Generate professional marketing reports tailored to different stakeholders. Choose templates, configure sections, and export print-ready reports.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
