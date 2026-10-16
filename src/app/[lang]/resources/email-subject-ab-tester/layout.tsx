import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-email-subject-ab-tester" },
  title: "Email Subject Line A/B Tester | Free Tool",
  description:
    "Compare two email subject lines side-by-side. Get scored analysis on length, power words, personalisation, urgency, and clarity to pick the winner.",
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-email-subject-ab-tester",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Email Subject Line A/B Tester",
    description:
      "Free tool to compare and score two email subject lines before you send.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
