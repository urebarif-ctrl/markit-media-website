import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-persona-workshop" },
  title: "Marketing Persona Workshop | Free Tool",
  description: "Build detailed marketing personas with guided exercises. Define demographics, psychographics, goals, pain points, and content preferences.",
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-persona-workshop",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Marketing Persona Workshop | Free Tool",
    description: "Build detailed marketing personas with guided exercises.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
