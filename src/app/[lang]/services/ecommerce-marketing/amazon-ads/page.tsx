import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "Amazon Advertising Services",
  description:
    "Drive sales on Amazon with Sponsored Products, Sponsored Brands, and DSP campaigns. Markit Media manages your Amazon ad strategy from keyword targeting to bid optimization.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/services/ecommerce-marketing/amazon-ads",
  },
};

export default function AmazonAdsPage() {
  return (
    <SubServicePage
      parentTitle="E-commerce Marketing"
      parentHref="/services/ecommerce-marketing"
      title="Amazon Advertising"
      description="Increase product visibility and sales on the world's largest marketplace. We build and manage Amazon ad campaigns across Sponsored Products, Sponsored Brands, and Demand-Side Platform (DSP) to put your products in front of high-intent shoppers."
      details={[
        "Sponsored Products campaigns — target high-intent keywords and competitor ASINs to place your products at the top of search results and on relevant product detail pages.",
        "Sponsored Brands setup — create headline search ads that feature your brand logo, custom headline, and a curated selection of products to build brand awareness and drive traffic to your storefront.",
        "Amazon DSP management — reach audiences on and off Amazon with programmatic display, video, and audio ads using Amazon's first-party shopper data for precise targeting.",
        "Keyword research and bid optimization — identify profitable search terms, set competitive bids, and adjust spend based on performance data to maximize return on ad spend.",
        "Campaign structure and segmentation — organize campaigns by product category, match type, and funnel stage to maintain granular control over budgets and targeting.",
        "Performance reporting and ACOS management — track advertising cost of sale, total advertising cost of sale, and organic rank lift with clear dashboards that tie ad spend to revenue.",
      ]}
      benefits={[
        "Higher product visibility on Amazon search results and detail pages",
        "Structured campaigns that separate brand, category, and competitor targeting",
        "Lower ACOS through continuous bid adjustments and negative keyword management",
        "Expanded reach beyond Amazon through DSP programmatic advertising",
        "Brand-building with Sponsored Brands and custom storefront traffic",
        "Transparent reporting that connects ad spend directly to sales performance",
      ]}
      faq={[
        {
          q: "What is the difference between Sponsored Products and Sponsored Brands?",
          a: "Sponsored Products promote individual product listings in search results and on product pages, targeting shoppers ready to buy. Sponsored Brands display your brand logo, a headline, and multiple products at the top of search results, building brand awareness while driving traffic to your storefront or a custom landing page.",
        },
        {
          q: "What is Amazon DSP and when should I use it?",
          a: "Amazon DSP (Demand-Side Platform) lets you buy display, video, and audio ads that reach audiences both on and off Amazon. It is especially useful for brands that want to retarget shoppers who viewed their products, reach new audiences based on shopping behavior, or build awareness at the top of the funnel.",
        },
        {
          q: "How do you measure Amazon ad performance?",
          a: "We track ACOS (advertising cost of sale), TACOS (total advertising cost of sale including organic revenue), click-through rate, conversion rate, and organic rank changes. These metrics together show whether ads are driving profitable growth, not just clicks.",
        },
        {
          q: "How much budget do I need for Amazon advertising?",
          a: "There is no fixed minimum, but your budget should align with your product margins, category competitiveness, and growth goals. We typically recommend starting with enough daily budget to gather meaningful data, then scaling spend toward the campaigns and keywords that deliver the strongest return.",
        },
      ]}
    />
  );
}
