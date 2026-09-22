import type { Metadata } from "next";
import { CaseStudyPage } from "@/components/case-study-page";

export const metadata: Metadata = {
  title: "Vuse — Social Media Content Production",
  description: "Ongoing social media content production for Vuse, creating engaging reels and digital content for a global consumer brand.",
  alternates: { canonical: "https://themarkitmedia.com/en/work/vuse" },
};

export default function VusePage() {
  return (
    <CaseStudyPage
      client="Vuse"
      industry="Consumer Goods"
      services={["Social Media Marketing", "Video Production", "Digital Content"]}
      title="Vuse: Ongoing Social Content for a Global Brand"
      subtitle="Producing engaging social media reels and digital content as part of an ongoing creative partnership with Vuse."
      context="Vuse, a global consumer brand, required consistent, high-quality social media content that maintained brand standards while feeling native to each platform. The partnership involves regular content production cycles, with each piece designed to engage audiences through compelling visuals and on-brand messaging."
      approach="We established a production workflow that delivers platform-native content on a recurring schedule. Each piece is crafted to balance brand guidelines with platform-specific creative best practices. Video reels are shot and edited for maximum engagement — attention-grabbing openings, clean brand integration, and strong calls to action. The ongoing nature of the relationship allows us to refine the creative approach based on performance data."
      deliverables={[
        "Multiple social media reels produced for brand channels",
        "Platform-native vertical video content for Instagram and TikTok",
        "Consistent brand integration across all creative assets",
        "Ongoing content production as part of a continuing partnership",
        "Digital content assets for brand campaigns",
      ]}
      videos={[]}
      relatedServices={[
        { title: "Social Media", href: "/services/social-media" },
        { title: "Video Production", href: "/services/video-production" },
        { title: "Content Marketing", href: "/services/content-marketing" },
        { title: "Digital Marketing", href: "/services/digital-marketing" },
      ]}
      readingTime="2 min read"
    />
  );
}
