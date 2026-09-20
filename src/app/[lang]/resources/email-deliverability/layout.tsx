import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Email Deliverability Checklist — Land in the Inbox Every Time",
  description:
    "Free email deliverability checklist covering authentication, list hygiene, and sending practices to keep your emails out of spam.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/email-deliverability" },
  openGraph: {
    title: "Email Deliverability Checklist",
    description:
      "Free checklist covering authentication, list hygiene, and sending practices to keep your emails out of spam folders.",
  },
};

export default function EmailDeliverabilityLayout({ children }: { children: React.ReactNode }) {
  return children;
}
