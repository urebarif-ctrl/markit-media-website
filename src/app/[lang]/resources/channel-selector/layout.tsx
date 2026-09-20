import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing Channel Selector — Find Your Best Channels",
  description:
    "Use our free marketing channel selector quiz to discover which channels will drive the best results for your business. Get personalized recommendations based on your goals and budget.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/channel-selector" },
  openGraph: {
    title: "Marketing Channel Selector Quiz",
    description:
      "Free quiz to find the best marketing channels for your business. Get personalized recommendations based on your goals and budget.",
  },
};

export default function ChannelSelectorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
