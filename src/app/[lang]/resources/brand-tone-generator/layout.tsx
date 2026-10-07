import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brand Tone of Voice Generator | Free Tool",
  description:
    "Define your brand tone of voice with adjective mapping, do/don't examples, and audience alignment. Export a voice guide for your team.",
  openGraph: {
    title: "Brand Tone of Voice Generator",
    description: "Free tool to define and document your brand's tone of voice.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
