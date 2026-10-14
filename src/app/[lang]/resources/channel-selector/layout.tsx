import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing Channel Selector — Find Your Best Channels",
  description:
    "Use our free marketing channel selector quiz to discover which channels will drive the best results for your business. Get personalized recommendations based on your goals and budget.",
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-channel-selector" },
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-channel-selector",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Marketing Channel Selector Quiz",
    description:
      "Free quiz to find the best marketing channels for your business. Get personalized recommendations based on your goals and budget.",
  },
};

export default function ChannelSelectorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
