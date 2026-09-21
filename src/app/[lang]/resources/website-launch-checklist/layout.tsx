import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website Launch Checklist | Free Tool | Markit Media",
  description: "50-item checklist for launching a website. Cover SEO, performance, security, content, design, analytics, and legal requirements before going live.",
  openGraph: {
    title: "Website Launch Checklist | Free Tool | Markit Media",
    description: "50-item comprehensive website launch checklist.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
