import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website Grader — Score Your Site Across 7 Key Areas",
  description:
    "Grade your website performance across speed, mobile, SEO, content, UX, trust, and conversions with this free tool. See exactly where you stand and what to fix first.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/website-grader" },
  openGraph: {
    title: "Free Website Grader Tool",
    description:
      "Grade your website across speed, mobile, SEO, content, UX, trust, and conversions. See where you stand and what to fix first.",
  },
};

export default function WebsiteGraderLayout({ children }: { children: React.ReactNode }) {
  return children;
}
