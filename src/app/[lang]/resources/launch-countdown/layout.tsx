import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website Launch Checklist — Never Miss a Step Before Go-Live",
  description:
    "Free website launch countdown checklist covering content, SEO, technical setup, and legal requirements so nothing slips through.",
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-launch-countdown" },
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-launch-countdown",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Website Launch Checklist",
    description:
      "Free countdown checklist covering content, SEO, technical setup, and legal requirements so nothing slips through at launch.",
  },
};

export default function LaunchCountdownLayout({ children }: { children: React.ReactNode }) {
  return children;
}
