import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "Shopify Marketing Services",
  description:
    "Grow your Shopify store with targeted traffic acquisition, conversion rate optimization, and retention strategies. Markit Media helps Shopify brands scale profitably.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/services/ecommerce-marketing/shopify-marketing",
  },
};

export default function ShopifyMarketingPage() {
  return (
    <SubServicePage
      parentTitle="E-commerce Marketing"
      parentHref="/services/ecommerce-marketing"
      title="Shopify Marketing"
      description="Turn your Shopify store into a growth engine. We combine traffic acquisition, on-site conversion optimization, and customer retention strategies to help Shopify merchants increase revenue and build a sustainable e-commerce business."
      details={[
        "Traffic acquisition strategy — drive qualified visitors to your store through paid ads, SEO, social media, and influencer partnerships tailored to your products and audience.",
        "Conversion rate optimization — analyze your store's user experience, product pages, checkout flow, and cart abandonment patterns to identify and fix the friction points that cost you sales.",
        "Shopify SEO — optimize collection pages, product descriptions, meta tags, URL structures, and site speed to improve organic search rankings and reduce dependence on paid traffic.",
        "Email and SMS marketing setup — build automated flows for welcome sequences, abandoned carts, post-purchase follow-ups, and win-back campaigns using Klaviyo, Omnisend, or your preferred platform.",
        "App stack optimization — audit your installed apps, recommend high-impact tools for reviews, upsells, loyalty programs, and analytics, and remove bloat that slows your store down.",
        "Analytics and attribution — set up proper tracking across Google Analytics, Meta Pixel, and Shopify reports so you can see exactly which channels and campaigns drive revenue.",
      ]}
      benefits={[
        "More qualified traffic from channels that match your target customer",
        "Higher conversion rates through data-driven store and checkout improvements",
        "Stronger organic rankings that reduce long-term customer acquisition costs",
        "Automated email and SMS flows that recover lost sales and increase repeat purchases",
        "A lean app stack that enhances functionality without slowing page load",
        "Clear attribution so every marketing dollar is traceable to results",
      ]}
      faq={[
        {
          q: "Do you work with all Shopify plans?",
          a: "Yes. Our strategies apply to Shopify Basic, Shopify, Advanced, and Plus plans. The tactics we use are adapted to the features available on your plan, and we advise on when upgrading makes sense based on your store's growth stage.",
        },
        {
          q: "How do you approach conversion rate optimization for Shopify?",
          a: "We start with a data audit — reviewing analytics, heatmaps, and session recordings to find where visitors drop off. Then we prioritize changes by impact: product page layout, trust signals, checkout simplification, and mobile experience. Each change is measured against baseline performance.",
        },
        {
          q: "Which email marketing platform do you recommend for Shopify?",
          a: "Klaviyo and Omnisend are the most popular choices because of their deep Shopify integration, advanced segmentation, and pre-built automation templates. We help you choose based on your list size, budget, and the complexity of flows you need.",
        },
        {
          q: "How long does it take to see results from Shopify marketing?",
          a: "Paid campaigns can generate traffic and sales within the first week. Conversion optimization improvements typically show measurable results within 30 to 60 days. SEO is a longer play — expect meaningful organic traffic growth over three to six months.",
        },
      ]}
    />
  );
}
