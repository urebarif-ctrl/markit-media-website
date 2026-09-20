import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Social Media Audit Checklist — Evaluate Your Presence Objectively",
  description:
    "Audit your social media presence with this free checklist covering profile optimization, content strategy, engagement metrics, and analytics. Identify gaps and opportunities.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/social-media-audit" },
  openGraph: {
    title: "Free Social Media Audit Checklist",
    description:
      "Evaluate your social media presence across profile optimization, content strategy, engagement, and analytics. Spot gaps fast.",
  },
};

export default function SocialMediaAuditLayout({ children }: { children: React.ReactNode }) {
  return children;
}
