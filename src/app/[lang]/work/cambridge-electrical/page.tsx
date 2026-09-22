import type { Metadata } from "next";
import { CaseStudyPage } from "@/components/case-study-page";

export const metadata: Metadata = {
  title: "Cambridge Electrical Appliances — Seasonal Social Campaigns",
  description: "How Markit Media developed seasonal social media campaigns for Cambridge Electrical Appliances, driving engagement through summer and winter campaign reels.",
  alternates: { canonical: "https://themarkitmedia.com/en/work/cambridge-electrical" },
};

export default function CambridgeElectricalPage() {
  return (
    <CaseStudyPage
      client="Cambridge Electrical Appliances"
      industry="Consumer Electronics"
      services={["Social Media Marketing", "Video Production", "Content Strategy", "Seasonal Campaigns"]}
      title="Cambridge Electrical Appliances: Seasonal Campaigns That Drive Engagement"
      subtitle="A series of seasonal social media campaigns with purpose-built video reels for summer and winter product promotions."
      context="Cambridge Electrical Appliances needed a social media presence that connected their product line to seasonal buying patterns. Consumer electronics purchases spike around summer (cooling products) and winter (heating products), creating natural campaign windows. The challenge was producing engaging short-form content that showcased products while matching the energy of each season."
      approach="We designed a seasonal campaign framework with dedicated summer and winter creative directions. Each season got its own visual style, messaging angle, and product focus. Video reels were produced with attention to platform-native formats — vertical, fast-paced, and optimized for engagement. Content was staggered across the campaign period to maintain consistent presence."
      deliverables={[
        "Summer campaign reels highlighting cooling and seasonal products",
        "Winter campaign reels focused on heating and comfort appliances",
        "Platform-optimized vertical video content for Instagram and TikTok",
        "Seasonal creative direction with consistent branding",
        "6+ professionally produced social media reels",
        "Campaign content calendar with staggered release schedule",
      ]}
      videos={[]}
      relatedServices={[
        { title: "Social Media", href: "/services/social-media" },
        { title: "Video Production", href: "/services/video-production" },
        { title: "Content Marketing", href: "/services/content-marketing" },
      ]}
      readingTime="3 min read"
    />
  );
}
