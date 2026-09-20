import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "TikTok Ads",
  description:
    "TikTok advertising management including Spark Ads, TopView, in-feed video ads, advanced targeting, and creator partnerships. Reach engaged audiences through short-form video.",
  alternates: {
    canonical:
      "https://themarkitmedia.com/en/services/performance-marketing/tiktok-ads",
  },
};

export default function TikTokAdsPage() {
  return (
    <SubServicePage
      parentTitle="Performance Marketing"
      parentHref="/services/performance-marketing"
      title="TikTok Ads"
      description="Connect with highly engaged audiences through the fastest-growing short-form video platform. We create and manage TikTok ad campaigns that feel native to the platform, leveraging Spark Ads, in-feed placements, and creator partnerships to drive awareness, traffic, and conversions."
      details={[
        "Short-form video ad creation tailored to TikTok's native content style, ensuring ads feel organic and engaging rather than disruptive to the user experience.",
        "Spark Ads campaigns that amplify existing organic content from your account or creator partners, combining authentic content with paid distribution for stronger engagement.",
        "TopView and branded takeover placements for maximum visibility, placing your brand front and center when users open the app for high-impact awareness campaigns.",
        "In-feed video ads with clear calls to action, optimized for objectives including traffic, app installs, conversions, and lead generation within TikTok Ads Manager.",
        "Interest-based, behavioral, and custom audience targeting using TikTok's audience tools, including website visitor retargeting and lookalike audiences built from your customer data.",
        "Creator partnership strategy and management, identifying relevant creators for branded content collaborations that extend your reach to established, engaged communities.",
      ]}
      benefits={[
        "Access to a highly engaged audience with strong organic reach potential",
        "Native ad formats that blend seamlessly with user-generated content",
        "Lower cost per impression compared to more saturated platforms",
        "Spark Ads leverage authentic content for higher credibility and engagement",
        "Ideal for reaching younger demographics and early adopters",
        "Full-funnel campaign options from awareness to direct-response conversions",
      ]}
      faq={[
        {
          q: "Is TikTok advertising right for my business?",
          a: "TikTok works for a wide range of industries, not just brands targeting Gen Z. If your product or service can be demonstrated or explained through short-form video, TikTok advertising is worth testing.",
        },
        {
          q: "What are Spark Ads?",
          a: "Spark Ads let you boost organic TikTok posts, either from your own account or from creators, as paid ads. They maintain the native feel while benefiting from paid targeting and scale.",
        },
        {
          q: "Do I need to create video content for TikTok ads?",
          a: "Yes, video is the primary format on TikTok. We can help produce short-form video content or work with creators to develop authentic ad creative that fits the platform.",
        },
        {
          q: "How does TikTok targeting compare to Meta?",
          a: "TikTok offers interest, behavior, and demographic targeting along with custom and lookalike audiences. While its audience data is newer, the platform's algorithm is highly effective at finding receptive users based on content engagement patterns.",
        },
        {
          q: "What is the minimum budget for TikTok ads?",
          a: "TikTok has minimum spend requirements at the campaign and ad group level. We recommend a budget sufficient to exit the learning phase and gather meaningful performance data, which we discuss during onboarding.",
        },
      ]}
    />
  );
}
