import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Content Repurposing Planner — Maximize Every Piece of Content",
  description:
    "Use our free content repurposing planner to turn one piece of content into many. See derivative formats, estimated timelines, and a visual content tree for any original piece.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/content-repurposing" },
  openGraph: {
    title: "Free Content Repurposing Planner",
    description:
      "Turn one content piece into many. Get a visual repurposing plan with formats, platforms, timelines, and content multiplication metrics.",
  },
};

export default function ContentRepurposingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
