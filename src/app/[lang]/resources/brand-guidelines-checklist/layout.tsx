import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brand Guidelines Checklist | Free Tool | Markit Media",
  description: "Ensure your brand guidelines document covers everything. 40-item checklist across logo, color, typography, imagery, voice, and digital standards.",
  openGraph: {
    title: "Brand Guidelines Checklist | Free Tool | Markit Media",
    description: "40-item brand guidelines checklist for complete brand documentation.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
