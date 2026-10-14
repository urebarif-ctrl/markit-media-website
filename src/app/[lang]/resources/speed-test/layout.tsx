import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website Speed Assessment — Find What's Slowing Your Site",
  description:
    "Assess your website speed with this free quiz evaluating hosting, images, scripts, caching, and mobile performance. Get a prioritized list of fixes to load faster.",
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-speed-test" },
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-speed-test",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Free Website Speed Assessment Quiz",
    description:
      "Evaluate your site speed across hosting, images, scripts, caching, and mobile. Get prioritized fixes to load faster.",
  },
};

export default function SpeedTestLayout({ children }: { children: React.ReactNode }) {
  return children;
}
