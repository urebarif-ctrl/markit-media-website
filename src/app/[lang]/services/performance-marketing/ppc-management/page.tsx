import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "PPC Management",
  description:
    "Cross-platform PPC management covering Google, Meta, LinkedIn, TikTok, and Microsoft Ads. Bid optimization, A/B testing, budget allocation, and transparent reporting.",
  alternates: {
    canonical:
      "https://themarkitmedia.com/en/services/performance-marketing/ppc-management",
  },
};

export default function PpcManagementPage() {
  return (
    <SubServicePage
      parentTitle="Performance Marketing"
      parentHref="/services/performance-marketing"
      title="PPC Management"
      description="Get more from every ad dollar with unified pay-per-click management across all major platforms. We handle strategy, execution, and optimization across Google, Meta, LinkedIn, TikTok, and Microsoft Ads, ensuring your budget is allocated to the channels and campaigns that deliver the strongest return."
      details={[
        "Cross-platform PPC strategy and management spanning Google Ads, Meta Ads, LinkedIn Ads, TikTok Ads, and Microsoft Advertising, coordinated under a single performance framework.",
        "Bid optimization using a combination of automated strategies and manual adjustments, calibrated to your target cost per acquisition, return on ad spend, or other KPIs.",
        "A/B testing of ad copy, creative, landing pages, audiences, and bidding strategies with structured test designs that produce statistically meaningful results.",
        "Strategic budget allocation across platforms and campaigns based on performance data, ensuring spend flows to the highest-performing channels and is pulled from underperformers.",
        "Comprehensive reporting dashboards with cross-platform metrics including spend, impressions, clicks, conversions, cost per acquisition, and return on ad spend, delivered on a regular schedule.",
      ]}
      benefits={[
        "Unified management across all paid media platforms for consistent strategy",
        "Data-driven budget allocation that shifts spend to top-performing channels",
        "Structured A/B testing that systematically improves campaign performance",
        "Bid optimization calibrated to your specific business goals and margins",
        "Transparent cross-platform reporting with clear attribution",
        "Reduced wasted spend through negative keywords, audience exclusions, and frequency controls",
      ]}
      faq={[
        {
          q: "What platforms do you manage?",
          a: "We manage PPC campaigns across Google Ads, Meta Ads (Facebook and Instagram), LinkedIn Ads, TikTok Ads, and Microsoft Advertising. We recommend platforms based on your audience and objectives.",
        },
        {
          q: "How do you decide where to allocate budget?",
          a: "We allocate budget based on performance data, starting with a testing phase to establish baseline metrics across platforms. Budget then shifts toward the channels and campaigns that deliver the best cost per acquisition or return on ad spend.",
        },
        {
          q: "How often do you optimize campaigns?",
          a: "Campaigns are monitored daily and optimized on a regular cadence. Bid adjustments, audience refinements, and creative updates happen continuously based on performance trends and data thresholds.",
        },
        {
          q: "What kind of reporting do you provide?",
          a: "We provide transparent reports covering spend, impressions, clicks, conversions, cost per acquisition, and return on ad spend across all platforms. Reports are delivered weekly or monthly, depending on your preference.",
        },
        {
          q: "Can you take over existing PPC campaigns?",
          a: "Yes. We audit your existing campaigns, identify opportunities for improvement, and transition management with minimal disruption. Historical data is preserved and used to accelerate optimization.",
        },
      ]}
    />
  );
}
