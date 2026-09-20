import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "Influencer Marketing Services",
  description:
    "End-to-end influencer marketing including identification, outreach, campaign management, and performance tracking. Markit Media connects your brand with the right creators for authentic reach.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/services/social-media/influencer-marketing",
  },
};

export default function InfluencerMarketingPage() {
  return (
    <SubServicePage
      parentTitle="Social Media"
      parentHref="/services/social-media"
      title="Influencer Marketing"
      description="Influencer marketing puts your brand in front of engaged audiences through voices they already trust. We manage the full process from identifying the right creators to tracking campaign performance, so you get authentic reach without the operational complexity."
      details={[
        "Influencer identification and vetting — research and evaluate potential creators based on audience demographics, engagement quality, content style, brand alignment, and historical collaboration performance to ensure the right fit.",
        "Outreach and negotiation — handle all creator communication including initial outreach, rate negotiation, contract terms, content requirements, and timeline coordination on your behalf.",
        "Campaign strategy and briefing — develop clear campaign briefs that define goals, messaging guidelines, content deliverables, posting schedules, and compliance requirements while giving creators enough creative freedom to stay authentic.",
        "Content review and approval workflows — manage the review process between your brand and the creators, ensuring all content meets brand guidelines and platform requirements before going live.",
        "Performance tracking and reporting — monitor campaign metrics including reach, engagement, website traffic, conversions, and cost-per-engagement across every influencer and piece of content to measure actual return.",
        "Ongoing relationship management — build and maintain long-term creator relationships that lead to better rates, more authentic partnerships, and consistent brand advocacy over time.",
      ]}
      benefits={[
        "Access to audiences you cannot reach through your own channels alone",
        "Authentic endorsements from creators your target market already follows",
        "Full campaign management that saves your team dozens of hours per campaign",
        "Vetted creators selected for genuine audience quality, not just follower count",
        "Clear performance data showing the actual impact of every partnership",
        "Long-term creator relationships that improve results over successive campaigns",
      ]}
      faq={[
        {
          q: "How do you find the right influencers for our brand?",
          a: "We use a combination of platform research tools, audience analytics, and manual vetting. We evaluate creators based on audience demographics, engagement rates, content quality, and brand alignment rather than follower count alone. Every recommended influencer is reviewed before outreach begins.",
        },
        {
          q: "Do you work with micro-influencers or only large accounts?",
          a: "We work across all tiers including nano, micro, mid-tier, and macro influencers. In many cases, micro-influencers deliver stronger engagement and more targeted reach for their niche. We recommend the right mix based on your goals and budget.",
        },
        {
          q: "How do you measure influencer campaign success?",
          a: "We track reach, impressions, engagement rate, clicks, conversions, and cost-per-result for each creator and each piece of content. We also use trackable links and unique discount codes where applicable to attribute downstream sales or leads directly to the campaign.",
        },
        {
          q: "What platforms do you run influencer campaigns on?",
          a: "We manage influencer campaigns across Instagram, TikTok, YouTube, LinkedIn, and X (Twitter). The right platform depends on your audience and objectives — we recommend the channels where your target market is most active and where creator content performs best for your category.",
        },
      ]}
    />
  );
}
