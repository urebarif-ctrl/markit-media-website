import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Email Marketing Health Checker",
  description: "Audit your email marketing practices across list hygiene, content quality, sending, engagement, and compliance with actionable recommendations.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/email-health-checker" },
  openGraph: {
    title: "Email Marketing Health Checker",
    description: "Audit your email marketing with a 25-point health check and get prioritized recommendations.",
  },
};

export default function EmailHealthCheckerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
