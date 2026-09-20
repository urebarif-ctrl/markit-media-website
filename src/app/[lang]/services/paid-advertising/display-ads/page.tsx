import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "Display Advertising Services",
  description:
    "Banner ads, rich media, and publisher network campaigns that build brand awareness and drive conversions. Markit Media designs and manages display campaigns with targeted placements and creative optimization.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/services/paid-advertising/display-ads",
  },
};

export default function DisplayAdsPage() {
  return (
    <SubServicePage
      parentTitle="Paid Advertising"
      parentHref="/services/paid-advertising"
      title="Display Advertising"
      description="Display advertising places your brand visually across websites, apps, and content networks your audience already visits. We handle creative production, placement strategy, and ongoing optimization to turn banner impressions into measurable awareness and conversions."
      details={[
        "Banner ad design and production — create static, animated, and responsive display ads in all standard IAB sizes, optimized for fast load times and visual impact across devices.",
        "Rich media and interactive ads — develop expandable, video-enabled, and interactive ad formats that capture attention and drive higher engagement than standard banners.",
        "Google Display Network management — set up and optimize GDN campaigns with audience targeting, contextual placements, managed placements, and exclusions for efficient spend.",
        "Publisher network and direct placements — identify and negotiate placements on relevant industry websites, news outlets, and niche publishers where your target audience spends time.",
        "Retargeting and remarketing — build display retargeting campaigns that re-engage website visitors with relevant messaging based on the pages they viewed and actions they took.",
        "Creative testing and optimization — run structured A/B tests on ad designs, messaging, and calls to action, then reallocate budget toward top-performing variations.",
      ]}
      benefits={[
        "Visual brand presence across thousands of relevant websites",
        "Multiple ad formats from standard banners to rich media and video",
        "Retargeting that brings back visitors who didn't convert initially",
        "Precise placement control on industry-relevant publisher sites",
        "Ongoing creative testing that improves click-through rates over time",
        "Full-funnel support from awareness through to conversion",
      ]}
      faq={[
        {
          q: "What sizes and formats do you create for display ads?",
          a: "We produce all standard IAB sizes — 300x250, 728x90, 160x600, 320x50, and more — in static, animated, and responsive HTML5 formats. We also develop rich media units for campaigns that require higher engagement.",
        },
        {
          q: "How do you decide where display ads are placed?",
          a: "Placement strategy depends on your goals. We combine audience-based targeting with contextual and managed placements, selecting specific publishers and content categories where your target audience is most active. We maintain exclusion lists to avoid irrelevant sites.",
        },
        {
          q: "Are display ads effective for lead generation or just awareness?",
          a: "Display ads serve both purposes. Prospecting campaigns build awareness with new audiences, while retargeting campaigns re-engage interested visitors to drive leads and sales. The key is matching the creative and messaging to the campaign objective.",
        },
        {
          q: "How do you measure display advertising performance?",
          a: "We track impressions, click-through rate, cost per click, view-through conversions, and direct conversions. For brand awareness campaigns, we also measure reach, frequency, and viewability rates to ensure ads are actually being seen.",
        },
      ]}
    />
  );
}
