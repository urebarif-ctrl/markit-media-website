import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-marketing-rfp-template" },
  title: "Marketing RFP Template Builder | Free Tool",
  description: "Build a professional marketing RFP (Request for Proposal) from a structured template. Cover scope, requirements, evaluation criteria, and timeline.",
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-marketing-rfp-template",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Marketing RFP Template Builder | Free Tool",
    description: "Build a professional marketing RFP from a structured template.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
