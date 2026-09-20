import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Email Campaign Planner — Build Schedules, Subject Lines & Content",
  description:
    "Free email campaign planner that builds complete campaign schedules with subject lines and content frameworks for every send.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/email-campaign-planner" },
  openGraph: {
    title: "Email Campaign Planner — Plan Every Send",
    description:
      "Free planner that builds complete email campaign schedules with subject lines and content frameworks for every send.",
  },
};

export default function EmailCampaignPlannerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
