import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Email Subject Line Tester — Score Lines for Opens & Deliverability",
  description:
    "Free email subject line tester that analyzes and scores your subject lines for deliverability, engagement, and inbox placement.",
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-email-subject-tester" },
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-email-subject-tester",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Email Subject Line Tester — Score Lines",
    description:
      "Free tester that analyzes and scores your email subject lines for deliverability, engagement, and inbox placement.",
  },
};

export default function EmailSubjectTesterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
