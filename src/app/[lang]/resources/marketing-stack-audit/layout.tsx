import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-marketing-stack-audit" },
  title: "Marketing Stack Audit | Free Assessment Tool",
  description:
    "Audit your marketing technology stack across analytics, CRM, email, ads, social, and content tools. Identify gaps, redundancies, and optimisation opportunities.",
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-marketing-stack-audit",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Marketing Stack Audit",
    description: "Free interactive tool to audit and optimise your marketing technology stack.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
