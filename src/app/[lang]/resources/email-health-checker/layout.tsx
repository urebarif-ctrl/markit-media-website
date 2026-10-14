import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Email Marketing Health Checker",
  description: "Audit your email marketing practices across list hygiene, content quality, sending, engagement, and compliance with actionable recommendations.",
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-email-health-checker" },
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-email-health-checker",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Email Marketing Health Checker",
    description: "Audit your email marketing with a 25-point health check and get prioritized recommendations.",
  },
};

export default function EmailHealthCheckerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
