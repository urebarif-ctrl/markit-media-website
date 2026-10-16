import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-brand-guidelines-checklist" },
  title: "Brand Guidelines Checklist | Free Tool",
  description: "Ensure your brand guidelines document covers everything. 40-item checklist across logo, color, typography, imagery, voice, and digital standards.",
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-brand-guidelines-checklist",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Brand Guidelines Checklist | Free Tool",
    description: "40-item brand guidelines checklist for complete brand documentation.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
