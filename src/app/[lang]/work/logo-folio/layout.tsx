import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Logo Folio — 7 Professional Logo Animations",
  description:
    "Watch 7 professional logo animations by Markit Media — HUBCO, MeezoTech, Chefiality, Easy Wear, Pakhlanze, My Fresh Fruits, and MAXUM Agency.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/work/logo-folio",
  },
  openGraph: {
    url: "https://themarkitmedia.com/en/work/logo-folio",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Logo Folio — 7 Professional Logo Animations | Markit Media",
    description:
      "Watch 7 professional logo animations spanning energy, tech, F&B, fashion, and agency brands.",
  },
};

export default function LogoFolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
