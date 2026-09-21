import type { Metadata } from "next";
import { ServicePage } from "@/components/service-page";
import { Megaphone } from "lucide-react";

export const metadata: Metadata = {
  title: "Performance Marketing",
  description: "Results-driven performance marketing: Google Ads, Meta Ads, TikTok Ads, LinkedIn Ads, and PPC management. Maximize ROI with data-backed campaigns.",
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
      longDescription="Our performance marketing team builds, manages, and optimizes paid campaigns across every major platform. We focus on conversion tracking, audience targeting, creative testing, and budget optimization to deliver the best possible return on your advertising spend."
      subServices={[
        { title: "Google Ads", desc: "Search, Display, Shopping, and YouTube campaigns optimized for conversions.", href: "/services/performance-marketing/google-ads" },
        { title: "Meta Ads", desc: "Facebook and Instagram advertising with advanced audience targeting.", href: "/services/performance-marketing/meta-ads" },
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
      relatedServices={[
        { title: "SEO", href: "/services/seo" },
        { title: "Social Media", href: "/services/social-media" },
        { title: "Content Marketing", href: "/services/content-marketing" },
      ]}
    />
  );
}
