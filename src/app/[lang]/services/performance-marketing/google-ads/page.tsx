import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "Google Ads Management",
  description:
    "Expert Google Ads management covering Search, Display, Shopping, YouTube, and remarketing campaigns. Data-driven bid strategies and conversion tracking to maximize your ad spend.",
  alternates: {
    canonical:
      "https://themarkitmedia.com/en/services/performance-marketing/google-ads",
  },
  openGraph: {
    title: "Google Ads Management",
    description: "Expert Google Ads management covering Search, Display, Shopping, YouTube, and remarketing campaigns. Data-driven bid strategies and conversion tracking ...",
  },
};

export default function GoogleAdsPage() {
  return (
    <SubServicePage
      parentTitle="Performance Marketing"
      parentHref="/services/performance-marketing"
      title="Google Ads Management"
      description="Reach high-intent customers at the exact moment they search for your products or services. Our Google Ads management covers every campaign type across the Google ecosystem, from Search and Shopping to Display and YouTube, with continuous optimization to lower your cost per acquisition and scale profitably."
      details={[
        "Search campaign setup and optimization targeting high-intent commercial keywords with tight ad group structures and compelling ad copy.",
        "Google Display Network campaigns with strategic audience targeting, contextual placements, and responsive display ads to build awareness at scale.",
        "Shopping campaign management including product feed optimization, bidding strategy, and campaign segmentation for ecommerce businesses.",
        "YouTube video advertising across TrueView, bumper, and in-stream formats to drive brand awareness and consideration through video content.",
        "Remarketing and retargeting campaigns that re-engage past visitors across Search, Display, and YouTube with tailored messaging based on their site behavior.",
        "Conversion tracking implementation using Google Tag Manager, GA4, and offline conversion imports to measure every touchpoint in the customer journey.",
        "Automated and manual bid strategy management including Target CPA, Target ROAS, and Maximize Conversions, calibrated to your business objectives and margin targets.",
      ]}
      benefits={[
        "Capture demand from users actively searching for your products or services",
        "Full-funnel coverage across Search, Display, Shopping, and YouTube",
        "Granular conversion tracking that ties ad spend directly to revenue",
        "Continuous bid optimization to reduce cost per acquisition over time",
        "Transparent reporting with clear attribution and actionable insights",
        "Scalable campaign structures built for long-term growth",
      ]}
      faq={[
        {
          q: "How much budget do I need for Google Ads?",
          a: "There is no universal minimum. Budget depends on your industry, competition, and goals. We analyze your market to recommend a starting budget that generates meaningful data, then scale based on performance.",
        },
        {
          q: "How long before I see results from Google Ads?",
          a: "Google Ads can drive traffic immediately, but optimization takes time. Most campaigns reach stable performance within 4-8 weeks as we gather data, refine targeting, and optimize bids.",
        },
        {
          q: "Do you manage Google Shopping campaigns?",
          a: "Yes. We handle product feed optimization, Merchant Center setup, campaign segmentation, and bidding strategy for ecommerce businesses running Shopping ads.",
        },
        {
          q: "How do you track conversions?",
          a: "We implement conversion tracking through Google Tag Manager and GA4, covering form submissions, phone calls, purchases, and custom events. We also support offline conversion imports for businesses with longer sales cycles.",
        },
        {
          q: "What bidding strategies do you use?",
          a: "We select bidding strategies based on your goals and data maturity. Options include Target CPA, Target ROAS, Maximize Conversions, and manual CPC, adjusted as campaigns accumulate conversion data.",
        },
      ]}
    />
  );
}
