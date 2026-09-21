import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing Calendar Generator",
  description: "Generate a 12-month marketing calendar tailored to your industry with campaign themes, key dates, channel recommendations, and budget allocation guidance.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/marketing-calendar" },
  openGraph: {
    title: "Marketing Calendar Generator",
    description: "Build a customized annual marketing calendar with industry-specific campaigns and budget planning.",
  },
};

export default function MarketingCalendarLayout({ children }: { children: React.ReactNode }) {
  return children;
}
