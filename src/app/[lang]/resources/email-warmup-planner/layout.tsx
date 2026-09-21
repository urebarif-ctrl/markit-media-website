import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Email Warm-Up Planner | Free Tool | Markit Media",
  description:
    "Plan your email domain warm-up schedule to build sender reputation and improve deliverability. Free tool from Markit Media.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/email-warmup-planner" },
  openGraph: {
    title: "Email Warm-Up Planner | Free Tool | Markit Media",
    description:
      "Plan your email domain warm-up schedule to build sender reputation and improve deliverability.",
  },
};

export default function EmailWarmUpPlannerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
