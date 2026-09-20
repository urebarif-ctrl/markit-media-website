import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "Retargeting & Remarketing",
  description:
    "Cross-channel retargeting and remarketing campaigns. Dynamic ads, audience segmentation, frequency capping, and sequential messaging to convert warm prospects into customers.",
  alternates: {
    canonical:
      "https://themarkitmedia.com/en/services/performance-marketing/retargeting",
  },
  openGraph: {
    title: "Retargeting & Remarketing",
    description: "Cross-channel retargeting and remarketing campaigns. Dynamic ads, audience segmentation, frequency capping, and sequential messaging to convert warm pro...",
  },
};

export default function RetargetingPage() {
  return (
    <SubServicePage
      parentTitle="Performance Marketing"
      parentHref="/services/performance-marketing"
      title="Retargeting & Remarketing"
      description="Bring back the visitors who already know your brand. Most website visitors leave without converting on their first visit. Retargeting and remarketing campaigns keep your brand visible across channels, delivering relevant messaging to warm prospects and guiding them back to complete a purchase, fill out a form, or take the next step."
      details={[
        "Cross-channel retargeting across Google Display Network, Meta, LinkedIn, TikTok, and programmatic platforms, ensuring consistent follow-up wherever your audience spends time online.",
        "Dynamic remarketing ads that automatically display the specific products or services a visitor viewed on your site, creating a personalized ad experience that drives higher click-through and conversion rates.",
        "Audience segmentation based on user behavior, including pages visited, time on site, cart abandonment, and funnel stage, enabling tailored messaging for each segment.",
        "Frequency capping controls that limit how often a user sees your retargeting ads, preventing ad fatigue while maintaining enough exposure to stay top of mind.",
        "Sequential messaging strategies that serve different creatives based on how recently a user visited and where they are in the decision process, moving them progressively toward conversion.",
        "Exclusion list management to suppress ads for existing customers, recent converters, or irrelevant audiences, ensuring your retargeting budget reaches only high-value prospects.",
      ]}
      benefits={[
        "Re-engage visitors who already showed interest in your products or services",
        "Dynamic ads personalize the experience based on each user's browsing behavior",
        "Audience segmentation delivers the right message at the right funnel stage",
        "Frequency capping prevents ad fatigue and protects your brand perception",
        "Cross-channel coverage ensures consistent follow-up across platforms",
        "Higher conversion rates and lower cost per acquisition compared to cold targeting",
      ]}
      faq={[
        {
          q: "What is the difference between retargeting and remarketing?",
          a: "The terms are often used interchangeably. Retargeting typically refers to display and social ads served to past website visitors, while remarketing traditionally refers to email-based re-engagement. We cover both approaches.",
        },
        {
          q: "How does dynamic retargeting work?",
          a: "Dynamic retargeting uses your product catalog and tracking data to automatically generate ads featuring the specific products a user viewed on your website. This creates a personalized ad for each visitor without manual creative production for every product.",
        },
        {
          q: "Will retargeting ads annoy my potential customers?",
          a: "Not with proper management. We implement frequency capping to limit ad exposure, use exclusion lists to suppress ads for people who already converted, and rotate creative to keep messaging fresh.",
        },
        {
          q: "How long should I retarget someone after they visit my site?",
          a: "Retargeting windows depend on your sales cycle. For ecommerce, 7-30 days is common. For B2B or high-consideration purchases, windows may extend to 60-90 days. We set durations based on your conversion data.",
        },
        {
          q: "Do I need a lot of website traffic for retargeting to work?",
          a: "Retargeting platforms have minimum audience size requirements, typically a few hundred visitors. If your site traffic is low, we focus on growing your audience first through prospecting campaigns before scaling retargeting.",
        },
      ]}
    />
  );
}
