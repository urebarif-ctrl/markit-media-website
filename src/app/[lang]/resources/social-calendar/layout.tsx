import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Social Media Calendar Generator — Plan a Week of Posts in Minutes",
  description:
    "Generate a weekly social media content calendar with post ideas, hashtags, and best posting times using this free tool. Stay consistent without the daily scramble.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/social-calendar" },
  openGraph: {
    title: "Free Social Media Calendar Generator",
    description:
      "Generate a weekly content calendar with post ideas, hashtags, and best posting times. Stay consistent across every platform.",
  },
};

export default function SocialCalendarLayout({ children }: { children: React.ReactNode }) {
  return children;
}
