import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Email Sequence Planner — Map Automated Flows That Convert",
  description:
    "Free email sequence planner for building automated welcome, nurture, and cart abandonment flows with timing and content guidance.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/email-sequence-planner" },
  openGraph: {
    title: "Email Sequence Planner — Automated Flows",
    description:
      "Free planner for building automated welcome, nurture, and cart abandonment email flows with timing and content guidance.",
  },
};

export default function EmailSequencePlannerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
