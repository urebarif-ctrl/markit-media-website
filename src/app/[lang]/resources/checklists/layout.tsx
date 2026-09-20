import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing Checklists — Launch-Ready Templates",
  description:
    "Use our free marketing checklists to stay organized across every campaign. Pre-built templates for website launches, SEO audits, ad campaigns, and more.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/checklists" },
  openGraph: {
    title: "Free Marketing Checklists & Templates",
    description:
      "Pre-built marketing checklists for website launches, SEO audits, ad campaigns, and more. Stay organized and never miss a step.",
  },
};

export default function ChecklistsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
