import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Social Media Calendar Generator — Plan a Week of Posts in Minutes",
  description:
    "Generate a weekly social media content calendar with post ideas, hashtags, and best posting times using this free tool. Stay consistent without the daily scramble.",
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-social-calendar" },
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-social-calendar",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Free Social Media Calendar Generator",
    description:
      "Generate a weekly content calendar with post ideas, hashtags, and best posting times. Stay consistent across every platform.",
  },
};

export default function SocialCalendarLayout({ children }: { children: React.ReactNode }) {
  return children;
}
