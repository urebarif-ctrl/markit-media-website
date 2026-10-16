import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-brand-voice-checker" },
  title: "Brand Voice Consistency Checker | Free Tool",
  description: "Check your content against brand voice guidelines. Define your brand voice attributes and evaluate content for consistency.",
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-brand-voice-checker",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Brand Voice Consistency Checker | Free Tool",
    description: "Evaluate content against your brand voice guidelines for consistency.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
