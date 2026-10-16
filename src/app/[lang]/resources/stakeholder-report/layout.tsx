import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-stakeholder-report" },
  title: "Marketing Stakeholder Report Generator | Free Tool",
  description:
    "Generate professional marketing reports tailored to different stakeholders. Choose from Executive Summary, Board Deck, Team Status, or Client Report templates. Drag to reorder sections, add KPIs, and export print-ready reports.",
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-stakeholder-report",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Marketing Stakeholder Report Generator | Free Tool",
    description:
      "Generate professional marketing reports tailored to different stakeholders. Choose templates, configure sections, and export print-ready reports.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
