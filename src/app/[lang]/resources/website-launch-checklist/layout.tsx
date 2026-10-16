import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-website-launch-checklist" },
  title: "Website Launch Checklist | Free Tool",
  description: "50-item checklist for launching a website. Cover SEO, performance, security, content, design, analytics, and legal requirements before going live.",
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-website-launch-checklist",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Website Launch Checklist | Free Tool",
    description: "50-item comprehensive website launch checklist.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
