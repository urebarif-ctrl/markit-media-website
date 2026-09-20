import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website Launch Checklist — Never Miss a Step Before Go-Live",
  description:
    "Free website launch countdown checklist covering content, SEO, technical setup, and legal requirements so nothing slips through.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/launch-countdown" },
  openGraph: {
    title: "Website Launch Checklist",
    description:
      "Free countdown checklist covering content, SEO, technical setup, and legal requirements so nothing slips through at launch.",
  },
};

export default function LaunchCountdownLayout({ children }: { children: React.ReactNode }) {
  return children;
}
