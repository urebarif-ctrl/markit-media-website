import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Content Calendar Generator — Plan Your Publishing Schedule",
  description:
    "Use our free content calendar generator to build an industry-specific publishing schedule across multiple channels. Get themed content ideas organized by week and platform.",
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-content-calendar" },
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-content-calendar",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Free Content Calendar Generator",
    description:
      "Build an industry-specific content calendar across multiple channels. Get themed ideas organized by week and platform.",
  },
};

export default function ContentCalendarLayout({ children }: { children: React.ReactNode }) {
  return children;
}
