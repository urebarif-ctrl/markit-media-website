import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website Migration Checklist — Launch Without Losing Rankings",
  description:
    "Follow this free comprehensive website migration checklist covering pre-migration planning, technical setup, content migration, and post-launch monitoring to protect your SEO.",
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-migration-checklist" },
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-migration-checklist",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Free Website Migration Checklist",
    description:
      "Comprehensive migration checklist covering planning, technical setup, content migration, and post-launch monitoring. Never miss a critical step.",
  },
};

export default function MigrationChecklistLayout({ children }: { children: React.ReactNode }) {
  return children;
}
