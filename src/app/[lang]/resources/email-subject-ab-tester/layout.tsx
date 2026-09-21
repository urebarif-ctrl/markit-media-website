import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Email Subject Line A/B Tester | Free Tool | Markit Media",
  description:
    "Compare two email subject lines side-by-side. Get scored analysis on length, power words, personalisation, urgency, and clarity to pick the winner.",
  openGraph: {
    title: "Email Subject Line A/B Tester | Markit Media",
    description:
      "Free tool to compare and score two email subject lines before you send.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
