import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Logo Folio — 7 Professional Logo Animations",
  description:
    "Watch 7 professional logo animations by Markit Media — HUBCO, MeezoTech, Chefiality, Easy Wear, Pakhlanze, My Fresh Fruits, and MAXUM Agency.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/work/logo-folio",
  },
  openGraph: {
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
