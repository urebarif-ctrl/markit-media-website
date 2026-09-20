import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "Meta Ads (Facebook & Instagram)",
  description:
    "Meta Ads management for Facebook and Instagram. Precision audience targeting, creative testing, catalog ads, lead generation forms, and retargeting to grow your business.",
  alternates: {
    canonical:
      "https://themarkitmedia.com/en/services/performance-marketing/meta-ads",
  },
};

export default function MetaAdsPage() {
  return (
    <SubServicePage
      parentTitle="Performance Marketing"
      parentHref="/services/performance-marketing"
      title="Meta Ads (Facebook & Instagram)"
      description="Tap into the combined audience of Facebook and Instagram with campaigns built for measurable results. From awareness to conversion, we build full-funnel Meta advertising strategies with precision targeting, creative testing, and data-driven optimization to drive qualified leads and sales."
      details={[
        "Advanced audience targeting using interest-based, behavioral, lookalike, and custom audiences built from your first-party data to reach the right people at the right time.",
        "Systematic creative testing with structured A/B and multivariate tests across ad copy, imagery, video, and format variations to identify top-performing combinations.",
        "Catalog and dynamic product ads for ecommerce businesses, automatically showcasing relevant products to users based on their browsing and purchase behavior.",
        "Lead generation form campaigns with pre-filled contact information, custom questions, and CRM integrations to capture qualified leads directly within the platform.",
        "Retargeting campaigns across Facebook and Instagram that re-engage website visitors, app users, and video viewers with personalized messaging at each funnel stage.",
      ]}
      benefits={[
        "Access to a combined audience across Facebook and Instagram in a single platform",
        "Precision targeting based on demographics, interests, behaviors, and first-party data",
        "Creative optimization through structured testing that improves results over time",
        "Full-funnel campaign structures from awareness to conversion",
        "Native lead generation forms that reduce friction and increase submission rates",
        "Detailed reporting on cost per lead, cost per purchase, and return on ad spend",
      ]}
      faq={[
        {
          q: "Which is better for my business, Facebook or Instagram ads?",
          a: "Both platforms are managed through Meta Ads Manager, and campaigns can run across both simultaneously. We allocate budget based on where your audience is most active and where performance data shows the strongest results.",
        },
        {
          q: "What types of creative work best on Meta?",
          a: "Performance varies by industry and audience. Generally, short-form video and user-generated content styles outperform static images, but we test multiple formats to find what resonates with your specific audience.",
        },
        {
          q: "How does audience targeting work?",
          a: "We build audiences using a combination of interest and behavior targeting, custom audiences from your website visitors and customer lists, and lookalike audiences modeled on your best customers.",
        },
        {
          q: "Can you run catalog ads for my online store?",
          a: "Yes. We set up your product catalog in Meta, configure dynamic product ads, and build campaigns that automatically show relevant products to users based on their browsing history.",
        },
        {
          q: "How do you measure Meta Ads performance?",
          a: "We track key metrics including cost per result, return on ad spend, click-through rate, and conversion rate. We also implement the Meta Pixel and Conversions API for accurate attribution.",
        },
      ]}
    />
  );
}
