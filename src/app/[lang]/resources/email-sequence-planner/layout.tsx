import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Email Sequence Planner — Map Automated Flows That Convert",
  description:
    "Free email sequence planner for building automated welcome, nurture, and cart abandonment flows with timing and content guidance.",
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-email-sequence-planner" },
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-email-sequence-planner",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Email Sequence Planner — Automated Flows",
    description:
      "Free planner for building automated welcome, nurture, and cart abandonment email flows with timing and content guidance.",
  },
};

export default function EmailSequencePlannerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
