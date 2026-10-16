import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-brand-tone-generator" },
  title: "Brand Tone of Voice Generator | Free Tool",
  description:
    "Define your brand tone of voice with adjective mapping, do/don't examples, and audience alignment. Export a voice guide for your team.",
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-brand-tone-generator",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Brand Tone of Voice Generator",
    description: "Free tool to define and document your brand's tone of voice.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
