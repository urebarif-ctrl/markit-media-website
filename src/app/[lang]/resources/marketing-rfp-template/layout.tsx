import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing RFP Template Builder | Free Tool | Markit Media",
  description: "Build a professional marketing RFP (Request for Proposal) from a structured template. Cover scope, requirements, evaluation criteria, and timeline.",
  openGraph: {
    title: "Marketing RFP Template Builder | Free Tool | Markit Media",
    description: "Build a professional marketing RFP from a structured template.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
