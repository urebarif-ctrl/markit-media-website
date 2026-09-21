import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing Persona Workshop | Free Tool | Markit Media",
  description: "Build detailed marketing personas with guided exercises. Define demographics, psychographics, goals, pain points, and content preferences.",
  openGraph: {
    title: "Marketing Persona Workshop | Free Tool | Markit Media",
    description: "Build detailed marketing personas with guided exercises.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
