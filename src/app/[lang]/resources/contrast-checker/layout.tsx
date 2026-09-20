import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Color Contrast Checker — Verify WCAG Accessibility",
  description:
    "Use our free color contrast checker to verify your text and background colors meet WCAG accessibility standards. Check AA and AAA compliance for normal and large text.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/contrast-checker" },
  openGraph: {
    title: "Free WCAG Color Contrast Checker",
    description:
      "Check your color contrast ratios against WCAG accessibility standards. Verify AA and AAA compliance for all text sizes.",
  },
};

export default function ContrastCheckerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
