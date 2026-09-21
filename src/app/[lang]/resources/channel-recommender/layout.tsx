import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing Channel Recommender — Find the Best Channels for Your Business",
  description:
    "Answer a few questions about your business, goals, budget, and team to get a ranked list of recommended marketing channels with match scores, ROI estimates, and key tactics.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/channel-recommender" },
  openGraph: {
    title: "Marketing Channel Recommender",
    description:
      "Free interactive tool that recommends the best marketing channels based on your business details, goals, budget, and team size.",
  },
};

export default function ChannelRecommenderLayout({ children }: { children: React.ReactNode }) {
  return children;
}
