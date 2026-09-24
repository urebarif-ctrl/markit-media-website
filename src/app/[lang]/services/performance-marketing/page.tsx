import type { Metadata } from "next";
import { ServicePage } from "@/components/service-page";
import { Megaphone } from "lucide-react";

export const metadata: Metadata = {
  title: "Performance Marketing",
  description: "Performance marketing across Google, Microsoft Ads, Meta, TikTok, LinkedIn, YouTube and retargeting, with measurement and creative testing built in.",
  alternates: { canonical: "https://themarkitmedia.com/en/services/performance-marketing" },
  openGraph: {
    title: "Performance Marketing",
    description: "Results-driven performance marketing: Google Ads, Meta Ads, TikTok Ads, LinkedIn Ads, and PPC management. Maximize ROI with data-backed campaigns.",
  },
};

export default function PerformanceMarketingPage() {
  return (
    <ServicePage
      icon={Megaphone}
      heroImage="/images/services/analytics.jpg"
      blogCategory="Performance Marketing"
      title="Performance Marketing"
      description="Drive measurable results with performance marketing campaigns built for ROI. We manage Google Ads, Meta Ads, TikTok Ads, LinkedIn Ads, and programmatic campaigns."
      longDescription="Paid media works best as a connected acquisition system, not a collection of isolated campaigns. We plan channel roles around search intent, audience demand and the customer journey; build measurement before scaling; test creative and landing-page hypotheses; and use budget pacing, search-term analysis, audience signals and conversion quality to decide what deserves more investment. Campaign structure is adapted to the business rather than copied from a generic template."
      subServices={[
        { title: "Google Ads", desc: "Search, Display, Shopping, and YouTube campaigns optimized for conversions.", href: "/services/performance-marketing/google-ads" },
        { title: "Meta Ads", desc: "Facebook and Instagram advertising with advanced audience targeting.", href: "/services/performance-marketing/meta-ads" },
        { title: "Microsoft Ads (Bing)", desc: "Search advertising across Microsoft Bing and its search partner ecosystem for incremental high-intent demand.", href: "/services/performance-marketing/microsoft-ads" },
        { title: "YouTube Ads", desc: "Video campaigns for awareness, consideration, remarketing, and demand generation.", href: "/services/performance-marketing/youtube-ads" },
        { title: "Pinterest Ads", desc: "Visual discovery campaigns for products, lifestyle categories, and consideration-led journeys.", href: "/services/performance-marketing/pinterest-ads" },
        { title: "X Ads", desc: "Campaign planning and paid distribution on X when audience and campaign objectives make the channel relevant.", href: "/services/performance-marketing/x-ads" },
        { title: "TikTok Ads", desc: "Short-form video advertising to reach younger demographics.", href: "/services/performance-marketing/tiktok-ads" },
        { title: "LinkedIn Ads", desc: "B2B advertising with precise professional targeting.", href: "/services/performance-marketing/linkedin-ads" },
        { title: "PPC Management", desc: "End-to-end pay-per-click campaign management and optimization.", href: "/services/performance-marketing/ppc-management" },
        { title: "Retargeting", desc: "Re-engage website visitors and past customers across channels.", href: "/services/performance-marketing/retargeting" },
      ]}
      benefits={[
        "Data-driven campaign optimization for maximum ROI",
        "Advanced audience targeting and segmentation",
        "Multi-platform campaign management from a single team",
        "Creative testing and iteration to improve performance",
        "Transparent reporting with clear KPIs and attribution",
        "Dedicated campaign managers with platform certifications",
      ]}
      faq={[
        { q: "What platforms do you advertise on?", a: "We manage campaigns across Google Ads, Meta (Facebook/Instagram), TikTok, LinkedIn, Twitter/X, Pinterest, and programmatic display networks." },
        { q: "What is your minimum ad spend?", a: "We work with businesses at various budget levels. Contact us to discuss the right budget for your goals." },
        { q: "How do you measure success?", a: "We track conversions, ROAS, cost per acquisition, click-through rates, and other KPIs aligned with your business goals." },
        { q: "How quickly can I see results?", a: "Paid campaigns can generate traffic and leads within days of launch. We typically see meaningful optimization within 2-4 weeks." },
        { q: "Do you create the ad creatives?", a: "Yes, our team handles copywriting, creative design, and video production for your campaigns." },
      ]}
      tools={[
        { title: "Ad Spend Calculator", desc: "Estimate costs and projected results for your ad campaigns.", href: "/resources/ad-spend-calculator" },
        { title: "Ad Budget Pacing", desc: "Track campaign pacing and forecast end-of-month spend.", href: "/resources/ad-budget-pacing" },
        { title: "ROI Calculator", desc: "Calculate the potential return on your marketing investment.", href: "/resources/roi-calculator" },
      ]}
      industries={[
        { title: "E-Commerce", href: "/industries/ecommerce" },
        { title: "SaaS", href: "/industries/saas" },
        { title: "Finance", href: "/industries/finance" },
        { title: "Education", href: "/industries/education" },
        { title: "B2B", href: "/industries/b2b" },
      ]}
      locations={[
        { title: "New York", href: "/locations/united-states/new-york/ppc-ads" },
        { title: "Los Angeles", href: "/locations/united-states/los-angeles/ppc-ads" },
        { title: "Chicago", href: "/locations/united-states/chicago/ppc-ads" },
        { title: "Houston", href: "/locations/united-states/houston/ppc-ads" },
        { title: "Miami", href: "/locations/united-states/miami/ppc-ads" },
        { title: "San Francisco", href: "/locations/united-states/san-francisco/ppc-ads" },
        { title: "Dallas", href: "/locations/united-states/dallas/ppc-ads" },
        { title: "Atlanta", href: "/locations/united-states/atlanta/ppc-ads" },
        { title: "Boston", href: "/locations/united-states/boston/ppc-ads" },
        { title: "Seattle", href: "/locations/united-states/seattle/ppc-ads" },
        { title: "Denver", href: "/locations/united-states/denver/ppc-ads" },
        { title: "Phoenix", href: "/locations/united-states/phoenix/ppc-ads" },
        { title: "Karachi", href: "/locations/karachi/ppc-ads" },
      ]}
      portfolio={[
        { client: "Selected Paid Media Work", desc: "Explore campaign, creative and growth work across the Markit Media portfolio.", href: "/work" },
        { client: "Performance Case Studies", desc: "See selected case-study formats and the thinking behind acquisition work.", href: "/case-studies" },
      ]}
      relatedServices={[
        { title: "SEO", href: "/services/seo" },
        { title: "Social Media", href: "/services/social-media" },
        { title: "Content Marketing", href: "/services/content-marketing" },
      ]}
    />
  );
}
