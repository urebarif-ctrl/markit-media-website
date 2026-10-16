import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-scope-of-work-generator" },
  title: "Scope of Work Generator | Free Tool",
  description: "Generate professional scopes of work for marketing projects. Define deliverables, timelines, milestones, and terms for client agreements.",
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-scope-of-work-generator",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Scope of Work Generator | Free Tool",
    description: "Generate professional scopes of work for marketing projects.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
