import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Startup Marketing Playbook",
  description: "A step-by-step marketing guide for startups covering growth strategies, channels, and budgeting.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/startup-marketing-guide" },
  openGraph: {
    title: "Startup Marketing Playbook",
    description: "A step-by-step marketing guide for startups covering growth strategies, channels, and budgeting.",
  },
};

export default function StartupMarketingGuideLayout({ children }: { children: React.ReactNode }) {
  return children;
}
