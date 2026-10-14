import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Startup Marketing Playbook",
  description: "A step-by-step marketing guide for startups covering growth strategies, channels, and budgeting.",
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-startup-marketing-guide" },
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-startup-marketing-guide",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Startup Marketing Playbook",
    description: "A step-by-step marketing guide for startups covering growth strategies, channels, and budgeting.",
  },
};

export default function StartupMarketingGuideLayout({ children }: { children: React.ReactNode }) {
  return children;
}
