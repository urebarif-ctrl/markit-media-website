import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing Stack Audit | Free Assessment Tool | Markit Media",
  description:
    "Audit your marketing technology stack across analytics, CRM, email, ads, social, and content tools. Identify gaps, redundancies, and optimisation opportunities.",
  openGraph: {
    title: "Marketing Stack Audit | Markit Media",
    description: "Free interactive tool to audit and optimise your marketing technology stack.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
