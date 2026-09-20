import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Social Media Strategy Planner — Build a Platform-Specific Plan",
  description:
    "Plan your social media strategy with platform-specific posting formats, frequencies, and best practices using this free tool. Post with purpose on every channel.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/social-media-planner" },
  openGraph: {
    title: "Free Social Media Strategy Planner",
    description:
      "Build a platform-specific social media strategy with posting formats, frequencies, and best practices for every channel.",
  },
};

export default function SocialMediaPlannerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
