import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Campaign Brief Builder | Free Tool | Markit Media",
  description:
    "Build professional campaign briefs with our free interactive tool. Define objectives, audiences, channels, budgets, and KPIs — then export or save for later.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/campaign-brief-builder" },
  openGraph: {
    title: "Campaign Brief Builder | Free Tool | Markit Media",
    description:
      "Build professional campaign briefs with our free interactive tool. Define objectives, audiences, channels, budgets, and KPIs — then export or save for later.",
    url: "https://themarkitmedia.com/en/resources/campaign-brief-builder",
    type: "website",
  },
};

export default function CampaignBriefBuilderLayout({ children }: { children: React.ReactNode }) {
  return children;
}
