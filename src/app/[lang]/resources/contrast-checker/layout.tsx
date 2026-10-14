import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Color Contrast Checker — Verify WCAG Accessibility",
  description:
    "Use our free color contrast checker to verify your text and background colors meet WCAG accessibility standards. Check AA and AAA compliance for normal and large text.",
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-contrast-checker" },
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-contrast-checker",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Free WCAG Color Contrast Checker",
    description:
      "Check your color contrast ratios against WCAG accessibility standards. Verify AA and AAA compliance for all text sizes.",
  },
};

export default function ContrastCheckerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
