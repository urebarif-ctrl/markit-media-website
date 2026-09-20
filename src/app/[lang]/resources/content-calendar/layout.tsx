import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Content Calendar Generator — Plan Your Publishing Schedule",
  description:
    "Use our free content calendar generator to build an industry-specific publishing schedule across multiple channels. Get themed content ideas organized by week and platform.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/content-calendar" },
  openGraph: {
    title: "Free Content Calendar Generator",
    description:
      "Build an industry-specific content calendar across multiple channels. Get themed ideas organized by week and platform.",
  },
};

export default function ContentCalendarLayout({ children }: { children: React.ReactNode }) {
  return children;
}
