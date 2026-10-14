import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing Checklists — Launch-Ready Templates",
  description:
    "Use our free marketing checklists to stay organized across every campaign. Pre-built templates for website launches, SEO audits, ad campaigns, and more.",
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-checklists" },
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-checklists",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Free Marketing Checklists & Templates",
    description:
      "Pre-built marketing checklists for website launches, SEO audits, ad campaigns, and more. Stay organized and never miss a step.",
  },
};

export default function ChecklistsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
