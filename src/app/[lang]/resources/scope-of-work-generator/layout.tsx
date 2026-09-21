import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scope of Work Generator | Free Tool | Markit Media",
  description: "Generate professional scopes of work for marketing projects. Define deliverables, timelines, milestones, and terms for client agreements.",
  openGraph: {
    title: "Scope of Work Generator | Free Tool | Markit Media",
    description: "Generate professional scopes of work for marketing projects.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
