import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing Calendar Generator",
  description: "Generate a 12-month marketing calendar tailored to your industry with campaign themes, key dates, channel recommendations, and budget allocation guidance.",
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-marketing-calendar" },
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-marketing-calendar",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Marketing Calendar Generator",
    description: "Build a customized annual marketing calendar with industry-specific campaigns and budget planning.",
  },
};

export default function MarketingCalendarLayout({ children }: { children: React.ReactNode }) {
  return children;
}
