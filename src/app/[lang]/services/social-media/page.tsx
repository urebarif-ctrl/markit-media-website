import type { Metadata } from "next";
import { ServicePage } from "@/components/service-page";
import { Share2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Social Media Marketing",
  description: "Strategic social media marketing: content creation, community management, influencer partnerships, and analytics. Build your brand across every social platform.",
  alternates: { canonical: "https://themarkitmedia.com/en/services/social-media" },
  openGraph: {
    title: "Social Media Marketing",
    description: "Strategic social media marketing: content creation, community management, influencer partnerships, and analytics. Build your brand across every social p...",
  },
};

export default function SocialMediaPage() {
  return (
    <ServicePage
      icon={Share2}
      heroImage="/images/services/social-media.jpg"
      blogCategory="Social Media"
      title="Social Media Marketing"
      description="Build a strong social presence with platform-specific strategies. We handle content creation, community management, influencer partnerships, and social analytics across every major platform."
      longDescription="Social media is where your audience spends their time. Our social media team develops tailored strategies for each platform, creates scroll-stopping content, manages your community, and tracks performance to continuously improve engagement and reach. We help brands build genuine connections with their audience through consistent, strategic social media marketing."
      subServices={[
        { title: "Social Strategy", desc: "Platform-specific strategies aligned with your business goals and audience behavior.", href: "/services/social-media/social-strategy" },
        { title: "Content Creation", desc: "Scroll-stopping graphics, videos, and copy tailored for each social platform.", href: "/services/social-media/content-creation" },
        { title: "Community Management", desc: "Active engagement, comment moderation, and audience interaction to build loyalty.", href: "/services/social-media/community-management" },
        { title: "Influencer Marketing", desc: "Influencer identification, outreach, campaign management, and performance tracking.", href: "/services/social-media/influencer-marketing" },
        { title: "Social Analytics", desc: "Performance tracking, audience insights, and data-driven content optimization.", href: "/services/social-media/social-analytics" },
      ]}
      benefits={[
        "Platform-specific strategies that match audience behavior",
        "Consistent brand voice across all social channels",
        "Increased engagement and follower growth through quality content",
        "Real-time community management and audience interaction",
        "Monthly reporting with engagement, reach, and growth metrics",
      ]}
      faq={[
        { q: "Which social media platforms do you manage?", a: "We manage Facebook, Instagram, LinkedIn, TikTok, Twitter/X, Pinterest, and YouTube. We recommend platforms based on where your target audience is most active." },
        { q: "How often will you post on my accounts?", a: "Posting frequency depends on the platform and your strategy. We typically recommend 3-5 posts per week on most platforms, with daily Stories or Reels where applicable." },
        { q: "Do you create the content or do we need to provide it?", a: "We handle content creation end-to-end, including copywriting, graphic design, and short-form video production. We collaborate with you on approvals and brand direction." },
        { q: "How do you measure social media success?", a: "We track engagement rate, reach, follower growth, website traffic from social, and conversions. Metrics are tailored to your specific goals." },
        { q: "Can you manage influencer campaigns?", a: "Yes. We handle influencer identification, outreach, contract negotiation, content coordination, and campaign performance reporting." },
      ]}
      tools={[
        { title: "Social Media Calendar", desc: "Plan and schedule your social media content.", href: "/resources/social-media-calendar-template" },
        { title: "Hashtag Generator", desc: "Generate relevant hashtags for your social posts.", href: "/resources/hashtag-generator" },
        { title: "Social Media ROI", desc: "Calculate the return on your social media investment.", href: "/resources/social-media-roi" },
      ]}
      relatedServices={[
        { title: "Content Marketing", href: "/services/content-marketing" },
        { title: "Video Production", href: "/services/video-production" },
        { title: "Performance Marketing", href: "/services/performance-marketing" },
      ]}
    />
  );
}
