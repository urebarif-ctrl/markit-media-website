"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type BusinessGoal =
  | "Lead Generation"
  | "E-commerce Sales"
  | "Brand Awareness"
  | "App Downloads"
  | "Customer Retention";

type Channel =
  | "SEO"
  | "PPC"
  | "Social Media"
  | "Email"
  | "Content Marketing"
  | "Video"
  | "Influencer"
  | "Affiliate";

type BudgetRange =
  | "Under $5K"
  | "$5K-$15K"
  | "$15K-$50K"
  | "$50K-$100K"
  | "$100K+";

type BusinessStage = "Startup" | "Growth" | "Scale" | "Enterprise";

type Frequency = "Daily" | "Weekly" | "Monthly";
type HealthZone = "green" | "yellow" | "red";

interface KpiEntry {
  name: string;
  measures: string;
  formula: string;
  benchmark: string;
  frequency: Frequency;
  health: Record<HealthZone, string>;
  section: "executive" | "channel";
}

/* ------------------------------------------------------------------ */
/*  Options                                                            */
/* ------------------------------------------------------------------ */

const businessGoals: BusinessGoal[] = [
  "Lead Generation",
  "E-commerce Sales",
  "Brand Awareness",
  "App Downloads",
  "Customer Retention",
];

const channels: Channel[] = [
  "SEO",
  "PPC",
  "Social Media",
  "Email",
  "Content Marketing",
  "Video",
  "Influencer",
  "Affiliate",
];

const budgetRanges: BudgetRange[] = [
  "Under $5K",
  "$5K-$15K",
  "$15K-$50K",
  "$50K-$100K",
  "$100K+",
];

const businessStages: BusinessStage[] = [
  "Startup",
  "Growth",
  "Scale",
  "Enterprise",
];

/* ------------------------------------------------------------------ */
/*  Primary KPIs by goal                                               */
/* ------------------------------------------------------------------ */

const primaryKpis: Record<BusinessGoal, KpiEntry[]> = {
  "Lead Generation": [
    {
      name: "Cost per Lead (CPL)",
      measures: "Average cost to acquire a new lead across all channels",
      formula: "Total Marketing Spend / Total Leads Generated",
      benchmark: "Typical industry range: $20-$200 depending on industry",
      frequency: "Weekly",
      health: {
        green: "Below target CPL",
        yellow: "Within 20% above target CPL",
        red: "More than 20% above target CPL",
      },
      section: "executive",
    },
    {
      name: "Lead-to-Customer Conversion Rate",
      measures: "Percentage of leads that become paying customers",
      formula: "(Customers from Leads / Total Leads) x 100",
      benchmark: "Typical industry range: 2%-10% for B2B, 3%-15% for B2C",
      frequency: "Monthly",
      health: {
        green: "Above 5% conversion rate",
        yellow: "Between 2% and 5%",
        red: "Below 2%",
      },
      section: "executive",
    },
    {
      name: "Marketing Qualified Leads (MQLs)",
      measures: "Number of leads meeting qualification criteria each period",
      formula: "Count of leads matching scoring threshold",
      benchmark: "Typical industry range: varies by company size and sales capacity",
      frequency: "Weekly",
      health: {
        green: "Meeting or exceeding MQL target",
        yellow: "Within 15% below target",
        red: "More than 15% below target",
      },
      section: "executive",
    },
    {
      name: "Lead Velocity Rate",
      measures: "Month-over-month growth in qualified leads",
      formula: "((MQLs This Month - MQLs Last Month) / MQLs Last Month) x 100",
      benchmark: "Typical industry range: 5%-15% monthly growth for healthy pipelines",
      frequency: "Monthly",
      health: {
        green: "Positive growth above 5%",
        yellow: "Flat to 5% growth",
        red: "Negative growth",
      },
      section: "executive",
    },
  ],
  "E-commerce Sales": [
    {
      name: "Revenue per Visitor (RPV)",
      measures: "Average revenue generated per website visitor",
      formula: "Total Revenue / Total Visitors",
      benchmark: "Typical industry range: $0.50-$5.00 depending on AOV and category",
      frequency: "Daily",
      health: {
        green: "Above trailing 30-day average",
        yellow: "Within 10% below average",
        red: "More than 10% below average",
      },
      section: "executive",
    },
    {
      name: "Return on Ad Spend (ROAS)",
      measures: "Revenue generated per dollar of advertising spend",
      formula: "Revenue from Ads / Ad Spend",
      benchmark: "Typical industry range: 3:1 to 8:1 depending on margins",
      frequency: "Weekly",
      health: {
        green: "Above target ROAS",
        yellow: "Within 20% below target",
        red: "More than 20% below target ROAS",
      },
      section: "executive",
    },
    {
      name: "Cart Abandonment Rate",
      measures: "Percentage of shoppers who add items but do not complete purchase",
      formula: "(Abandoned Carts / Total Carts Created) x 100",
      benchmark: "Typical industry range: 60%-80% across e-commerce",
      frequency: "Daily",
      health: {
        green: "Below 65%",
        yellow: "Between 65% and 75%",
        red: "Above 75%",
      },
      section: "executive",
    },
    {
      name: "Average Order Value (AOV)",
      measures: "Average dollar amount per completed transaction",
      formula: "Total Revenue / Number of Orders",
      benchmark: "Typical industry range: highly category-dependent",
      frequency: "Weekly",
      health: {
        green: "Above trailing average",
        yellow: "Within 10% below average",
        red: "More than 10% below average",
      },
      section: "executive",
    },
  ],
  "Brand Awareness": [
    {
      name: "Share of Voice (SOV)",
      measures: "Your brand mentions relative to competitor mentions",
      formula: "Your Brand Mentions / Total Industry Mentions x 100",
      benchmark: "Typical industry range: varies; aim to exceed market share percentage",
      frequency: "Monthly",
      health: {
        green: "SOV exceeds market share",
        yellow: "SOV roughly equals market share",
        red: "SOV significantly below market share",
      },
      section: "executive",
    },
    {
      name: "Branded Search Volume",
      measures: "Number of searches for your brand name and branded terms",
      formula: "Monthly branded keyword search volume (Google Search Console / SEO tools)",
      benchmark: "Typical industry range: monitor for month-over-month growth trends",
      frequency: "Monthly",
      health: {
        green: "Consistent month-over-month growth",
        yellow: "Flat trend over 3 months",
        red: "Declining over 3 months",
      },
      section: "executive",
    },
    {
      name: "Reach and Impressions",
      measures: "Total unique users exposed to your content and total views",
      formula: "Sum of unique reach across all active channels",
      benchmark: "Typical industry range: benchmark against prior quarter performance",
      frequency: "Weekly",
      health: {
        green: "Above prior quarter average",
        yellow: "Within 10% of prior quarter",
        red: "More than 10% below prior quarter",
      },
      section: "executive",
    },
  ],
  "App Downloads": [
    {
      name: "Cost per Install (CPI)",
      measures: "Average cost to acquire one app download",
      formula: "Total Acquisition Spend / Total Installs",
      benchmark: "Typical industry range: $1-$5 (Android), $2-$7 (iOS)",
      frequency: "Daily",
      health: {
        green: "Below target CPI",
        yellow: "Within 25% above target",
        red: "More than 25% above target",
      },
      section: "executive",
    },
    {
      name: "Day-1 Retention Rate",
      measures: "Percentage of users who open the app the day after installing",
      formula: "(Users Active on Day 1 / Total Installs) x 100",
      benchmark: "Typical industry range: 25%-40% depending on app category",
      frequency: "Daily",
      health: {
        green: "Above 30%",
        yellow: "Between 20% and 30%",
        red: "Below 20%",
      },
      section: "executive",
    },
    {
      name: "Install-to-Registration Rate",
      measures: "Percentage of installs that complete account registration",
      formula: "(Registrations / Installs) x 100",
      benchmark: "Typical industry range: 30%-60% depending on onboarding flow",
      frequency: "Weekly",
      health: {
        green: "Above 40%",
        yellow: "Between 25% and 40%",
        red: "Below 25%",
      },
      section: "executive",
    },
    {
      name: "Organic vs Paid Install Ratio",
      measures: "Balance between organic discovery and paid acquisition",
      formula: "Organic Installs / Paid Installs",
      benchmark: "Typical industry range: healthy apps trend toward 2:1 organic-to-paid or better",
      frequency: "Monthly",
      health: {
        green: "Ratio improving over time",
        yellow: "Ratio stable",
        red: "Ratio declining, increasingly paid-dependent",
      },
      section: "executive",
    },
  ],
  "Customer Retention": [
    {
      name: "Customer Churn Rate",
      measures: "Percentage of customers lost during a given period",
      formula: "(Customers Lost / Customers at Start of Period) x 100",
      benchmark: "Typical industry range: 2%-8% monthly for SaaS, varies by industry",
      frequency: "Monthly",
      health: {
        green: "Below target churn rate",
        yellow: "Within 20% above target",
        red: "More than 20% above target churn rate",
      },
      section: "executive",
    },
    {
      name: "Customer Lifetime Value (CLV)",
      measures: "Total revenue expected from a customer over their entire relationship",
      formula: "Average Purchase Value x Purchase Frequency x Average Customer Lifespan",
      benchmark: "Typical industry range: aim for CLV:CAC ratio of 3:1 or higher",
      frequency: "Monthly",
      health: {
        green: "CLV:CAC ratio above 3:1",
        yellow: "CLV:CAC ratio between 2:1 and 3:1",
        red: "CLV:CAC ratio below 2:1",
      },
      section: "executive",
    },
    {
      name: "Net Promoter Score (NPS)",
      measures: "Customer willingness to recommend your brand",
      formula: "% Promoters (9-10) minus % Detractors (0-6)",
      benchmark: "Typical industry range: 30-70 considered good, varies by sector",
      frequency: "Monthly",
      health: {
        green: "NPS above 50",
        yellow: "NPS between 20 and 50",
        red: "NPS below 20",
      },
      section: "executive",
    },
    {
      name: "Repeat Purchase Rate",
      measures: "Percentage of customers who make more than one purchase",
      formula: "(Customers with 2+ Purchases / Total Customers) x 100",
      benchmark: "Typical industry range: 20%-40% for most e-commerce/retail",
      frequency: "Monthly",
      health: {
        green: "Above 30%",
        yellow: "Between 20% and 30%",
        red: "Below 20%",
      },
      section: "executive",
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  Channel-specific KPIs                                              */
/* ------------------------------------------------------------------ */

const channelKpis: Record<Channel, KpiEntry[]> = {
  SEO: [
    {
      name: "Organic Traffic",
      measures: "Number of visitors arriving via unpaid search results",
      formula: "Sessions with source/medium = organic (Google Analytics)",
      benchmark: "Typical industry range: monitor for consistent month-over-month growth",
      frequency: "Weekly",
      health: {
        green: "Consistent growth above 5% MoM",
        yellow: "Flat to 5% growth",
        red: "Declining organic sessions",
      },
      section: "channel",
    },
    {
      name: "Keyword Rankings",
      measures: "Position of target keywords in search engine results pages",
      formula: "Average position for tracked keyword set (SEO tool)",
      benchmark: "Typical industry range: top 10 positions for priority terms",
      frequency: "Weekly",
      health: {
        green: "Majority of targets in top 10",
        yellow: "Targets ranking 11-20",
        red: "Targets ranking beyond page 2",
      },
      section: "channel",
    },
    {
      name: "Organic Conversion Rate",
      measures: "Percentage of organic visitors completing a desired action",
      formula: "(Organic Conversions / Organic Sessions) x 100",
      benchmark: "Typical industry range: 1%-5% depending on industry and intent",
      frequency: "Monthly",
      health: {
        green: "Above 3%",
        yellow: "Between 1.5% and 3%",
        red: "Below 1.5%",
      },
      section: "channel",
    },
    {
      name: "Domain Authority / Domain Rating",
      measures: "Overall strength of your website backlink profile",
      formula: "Reported by tools like Moz DA or Ahrefs DR",
      benchmark: "Typical industry range: 30-60 for mid-market, 60+ for established brands",
      frequency: "Monthly",
      health: {
        green: "Steadily increasing",
        yellow: "Stable",
        red: "Declining",
      },
      section: "channel",
    },
  ],
  PPC: [
    {
      name: "Cost per Click (CPC)",
      measures: "Average amount paid for each ad click",
      formula: "Total Ad Spend / Total Clicks",
      benchmark: "Typical industry range: $1-$6 for search, $0.50-$2 for display",
      frequency: "Daily",
      health: {
        green: "Below target CPC",
        yellow: "Within 15% above target",
        red: "More than 15% above target CPC",
      },
      section: "channel",
    },
    {
      name: "Quality Score",
      measures: "Google Ads relevance rating affecting ad rank and CPC",
      formula: "Reported by Google Ads per keyword (1-10 scale)",
      benchmark: "Typical industry range: 6-8 is average; aim for 7+",
      frequency: "Weekly",
      health: {
        green: "Average QS above 7",
        yellow: "Average QS 5-7",
        red: "Average QS below 5",
      },
      section: "channel",
    },
    {
      name: "Click-Through Rate (CTR)",
      measures: "Percentage of impressions that result in a click",
      formula: "(Clicks / Impressions) x 100",
      benchmark: "Typical industry range: 2%-5% for search, 0.5%-1.5% for display",
      frequency: "Daily",
      health: {
        green: "Above industry average for ad type",
        yellow: "At industry average",
        red: "Below industry average",
      },
      section: "channel",
    },
    {
      name: "Conversion Rate (PPC)",
      measures: "Percentage of paid clicks that complete a desired action",
      formula: "(Conversions / Clicks) x 100",
      benchmark: "Typical industry range: 2%-8% for search, 0.5%-3% for display",
      frequency: "Weekly",
      health: {
        green: "Above 5% for search campaigns",
        yellow: "Between 2% and 5%",
        red: "Below 2%",
      },
      section: "channel",
    },
  ],
  "Social Media": [
    {
      name: "Engagement Rate",
      measures: "Ratio of interactions to total followers or reach",
      formula: "(Likes + Comments + Shares) / Followers x 100",
      benchmark: "Typical industry range: 1%-5% depending on platform and audience size",
      frequency: "Weekly",
      health: {
        green: "Above 3%",
        yellow: "Between 1% and 3%",
        red: "Below 1%",
      },
      section: "channel",
    },
    {
      name: "Follower Growth Rate",
      measures: "Rate at which your social audience is growing",
      formula: "(New Followers / Total Followers) x 100 per period",
      benchmark: "Typical industry range: 1%-3% monthly growth is healthy",
      frequency: "Monthly",
      health: {
        green: "Above 2% monthly growth",
        yellow: "Between 0.5% and 2%",
        red: "Below 0.5% or declining",
      },
      section: "channel",
    },
    {
      name: "Social Referral Traffic",
      measures: "Website visits originating from social media platforms",
      formula: "Sessions with source = social (Google Analytics)",
      benchmark: "Typical industry range: varies; track as percentage of total traffic",
      frequency: "Weekly",
      health: {
        green: "Growing as share of total traffic",
        yellow: "Stable share",
        red: "Declining share",
      },
      section: "channel",
    },
    {
      name: "Social Share of Voice",
      measures: "Your brand mentions vs competitor mentions on social platforms",
      formula: "Your Mentions / (Your Mentions + Competitor Mentions) x 100",
      benchmark: "Typical industry range: aim to match or exceed your market share",
      frequency: "Monthly",
      health: {
        green: "Above market share percentage",
        yellow: "Equal to market share",
        red: "Significantly below market share",
      },
      section: "channel",
    },
  ],
  Email: [
    {
      name: "Open Rate",
      measures: "Percentage of delivered emails that are opened",
      formula: "(Emails Opened / Emails Delivered) x 100",
      benchmark: "Typical industry range: 15%-30% depending on industry and list quality",
      frequency: "Weekly",
      health: {
        green: "Above 25%",
        yellow: "Between 15% and 25%",
        red: "Below 15%",
      },
      section: "channel",
    },
    {
      name: "Click-to-Open Rate (CTOR)",
      measures: "Percentage of email openers who click a link",
      formula: "(Unique Clicks / Unique Opens) x 100",
      benchmark: "Typical industry range: 10%-20%",
      frequency: "Weekly",
      health: {
        green: "Above 15%",
        yellow: "Between 8% and 15%",
        red: "Below 8%",
      },
      section: "channel",
    },
    {
      name: "List Growth Rate",
      measures: "Net growth of your email subscriber list",
      formula: "((New Subscribers - Unsubscribes) / Total List Size) x 100",
      benchmark: "Typical industry range: 2%-5% monthly for active list building",
      frequency: "Monthly",
      health: {
        green: "Above 3% monthly growth",
        yellow: "Between 1% and 3%",
        red: "Below 1% or negative",
      },
      section: "channel",
    },
    {
      name: "Revenue per Email",
      measures: "Average revenue generated per email sent",
      formula: "Total Email Revenue / Total Emails Sent",
      benchmark: "Typical industry range: $0.05-$0.30 per email for e-commerce",
      frequency: "Monthly",
      health: {
        green: "Above trailing average",
        yellow: "At trailing average",
        red: "Below trailing average",
      },
      section: "channel",
    },
  ],
  "Content Marketing": [
    {
      name: "Content Engagement Time",
      measures: "Average time users spend consuming your content",
      formula: "Average engagement time per page (Google Analytics)",
      benchmark: "Typical industry range: 1-3 minutes for blog content",
      frequency: "Weekly",
      health: {
        green: "Above 2 minutes average",
        yellow: "Between 1 and 2 minutes",
        red: "Below 1 minute",
      },
      section: "channel",
    },
    {
      name: "Content Conversion Rate",
      measures: "Percentage of content consumers who take a desired action",
      formula: "(Content-Attributed Conversions / Content Page Views) x 100",
      benchmark: "Typical industry range: 1%-5% depending on content type and funnel stage",
      frequency: "Monthly",
      health: {
        green: "Above 3%",
        yellow: "Between 1% and 3%",
        red: "Below 1%",
      },
      section: "channel",
    },
    {
      name: "Content Production Velocity",
      measures: "Number of content pieces published per period",
      formula: "Total published articles / blog posts / assets per month",
      benchmark: "Typical industry range: 4-12 pieces per month for active programs",
      frequency: "Monthly",
      health: {
        green: "Meeting or exceeding content calendar targets",
        yellow: "Within 20% below target",
        red: "More than 20% below target",
      },
      section: "channel",
    },
    {
      name: "Organic Traffic from Content",
      measures: "Search-driven visits to content pages specifically",
      formula: "Organic sessions landing on blog/resource pages",
      benchmark: "Typical industry range: content should drive 40%-70% of total organic traffic",
      frequency: "Monthly",
      health: {
        green: "Growing share of organic traffic",
        yellow: "Stable",
        red: "Declining share",
      },
      section: "channel",
    },
  ],
  Video: [
    {
      name: "View-Through Rate (VTR)",
      measures: "Percentage of viewers who watch the video to completion or a set point",
      formula: "(Complete Views / Total Impressions) x 100",
      benchmark: "Typical industry range: 15%-30% for ads, higher for organic content",
      frequency: "Weekly",
      health: {
        green: "Above 25%",
        yellow: "Between 15% and 25%",
        red: "Below 15%",
      },
      section: "channel",
    },
    {
      name: "Average Watch Duration",
      measures: "Average length of time viewers spend watching your videos",
      formula: "Total Watch Time / Total Views",
      benchmark: "Typical industry range: aim for 50%+ of total video length",
      frequency: "Weekly",
      health: {
        green: "Above 50% of video length",
        yellow: "Between 30% and 50%",
        red: "Below 30%",
      },
      section: "channel",
    },
    {
      name: "Video Click-Through Rate",
      measures: "Percentage of viewers who click a CTA within or after the video",
      formula: "(CTA Clicks / Total Views) x 100",
      benchmark: "Typical industry range: 1%-4% for in-video CTAs",
      frequency: "Weekly",
      health: {
        green: "Above 3%",
        yellow: "Between 1% and 3%",
        red: "Below 1%",
      },
      section: "channel",
    },
  ],
  Influencer: [
    {
      name: "Influencer ROI",
      measures: "Return on investment from influencer partnerships",
      formula: "(Revenue from Influencer Campaigns - Influencer Cost) / Influencer Cost x 100",
      benchmark: "Typical industry range: $4-$6 earned per $1 spent on average",
      frequency: "Monthly",
      health: {
        green: "ROI above 400%",
        yellow: "ROI between 200% and 400%",
        red: "ROI below 200%",
      },
      section: "channel",
    },
    {
      name: "Influencer Engagement Rate",
      measures: "Engagement specifically on influencer-created content",
      formula: "(Likes + Comments + Shares on Influencer Posts) / Influencer Followers x 100",
      benchmark: "Typical industry range: 2%-6% for micro-influencers, 1%-3% for larger accounts",
      frequency: "Monthly",
      health: {
        green: "Above 3%",
        yellow: "Between 1.5% and 3%",
        red: "Below 1.5%",
      },
      section: "channel",
    },
    {
      name: "Attributed Conversions",
      measures: "Conversions directly traceable to influencer referrals",
      formula: "Conversions using influencer tracking links or promo codes",
      benchmark: "Typical industry range: depends on campaign size; track against cost to evaluate",
      frequency: "Monthly",
      health: {
        green: "Meeting campaign conversion targets",
        yellow: "Within 25% below target",
        red: "More than 25% below target",
      },
      section: "channel",
    },
  ],
  Affiliate: [
    {
      name: "Affiliate Revenue Share",
      measures: "Percentage of total revenue coming from affiliate partners",
      formula: "(Affiliate Revenue / Total Revenue) x 100",
      benchmark: "Typical industry range: 5%-25% of total revenue for active programs",
      frequency: "Monthly",
      health: {
        green: "Healthy diversification within target range",
        yellow: "Over-reliant on single affiliate or below 5%",
        red: "Affiliate concentration risk or negligible contribution",
      },
      section: "channel",
    },
    {
      name: "Effective Earnings per Click (EPC)",
      measures: "Average revenue generated per affiliate click",
      formula: "Total Affiliate Revenue / Total Affiliate Clicks",
      benchmark: "Typical industry range: $0.30-$2.00 depending on product and commission",
      frequency: "Weekly",
      health: {
        green: "EPC above program average",
        yellow: "EPC at program average",
        red: "EPC below program average",
      },
      section: "channel",
    },
    {
      name: "Active Affiliate Rate",
      measures: "Percentage of affiliates actively generating traffic or sales",
      formula: "(Affiliates with Sales / Total Affiliates) x 100",
      benchmark: "Typical industry range: 5%-15% of total affiliates are typically active",
      frequency: "Monthly",
      health: {
        green: "Above 10% active",
        yellow: "Between 5% and 10%",
        red: "Below 5% active",
      },
      section: "channel",
    },
    {
      name: "Affiliate Conversion Rate",
      measures: "Percentage of affiliate-referred visits that convert",
      formula: "(Affiliate Conversions / Affiliate Clicks) x 100",
      benchmark: "Typical industry range: 1%-5% depending on niche",
      frequency: "Weekly",
      health: {
        green: "Above 3%",
        yellow: "Between 1% and 3%",
        red: "Below 1%",
      },
      section: "channel",
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  Common KPI mistakes                                                */
/* ------------------------------------------------------------------ */

const kpiMistakes = [
  {
    title: "Tracking Vanity Metrics Only",
    description:
      "Follower counts, page views, and impressions feel good but rarely correlate to revenue. Pair every vanity metric with a conversion metric that ties back to business outcomes.",
  },
  {
    title: "Measuring Too Many KPIs",
    description:
      "When everything is a priority, nothing is. Limit your executive dashboard to 4-6 North Star metrics. Detailed channel metrics belong in deep-dive reports, not the summary view.",
  },
  {
    title: "No Baseline Before Optimization",
    description:
      "You cannot measure improvement without a starting point. Collect at least 30 days of baseline data before making changes or setting targets.",
  },
  {
    title: "Ignoring Attribution Windows",
    description:
      "A 1-day click attribution window tells a very different story than a 28-day window. Document your attribution model and apply it consistently across all channels.",
  },
];

/* ------------------------------------------------------------------ */
/*  Helper                                                             */
/* ------------------------------------------------------------------ */

function toggleChannel(arr: Channel[], item: Channel): Channel[] {
  return arr.includes(item)
    ? arr.filter((v) => v !== item)
    : [...arr, item];
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function HealthBadge({ zone, label }: { zone: HealthZone; label: string }) {
  const colors: Record<HealthZone, string> = {
    green: "bg-gray-900 text-white",
    yellow: "bg-gray-400 text-white",
    red: "bg-gray-200 text-black",
  };
  const icons: Record<HealthZone, string> = {
    green: "Good",
    yellow: "Warning",
    red: "Critical",
  };
  return (
    <div className="flex items-start gap-3">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Marketing KPI Dashboard Builder",
          description: "Follower counts, page views, and impressions feel good but rarely correlate to revenue. Pair every vanity metric with a conversion metric that ties back to business outcomes.",
          url: "https://themarkitmedia.com/en/resources/kpi-dashboard",
          applicationCategory: "Marketing Tool",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          provider: { "@type": "Organization", name: "Markit Media", url: "https://themarkitmedia.com" },
        }) }}
      />
      <span
        className={`inline-flex items-center justify-center px-3 py-1 text-base font-bold ${colors[zone]} min-w-[80px] text-center`}
      >
        {icons[zone]}
      </span>
      <span className="text-base text-gray-600">{label}</span>
    </div>
  );
}

function KpiCard({ kpi }: { kpi: KpiEntry }) {
  return (
    <div className="border border-gray-200 p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h4 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black">
          {kpi.name}
        </h4>
        <span className="inline-flex items-center px-3 py-1 text-base font-bold border border-gray-200 text-gray-600">
          {kpi.frequency}
        </span>
      </div>

      <div>
        <p className="text-base font-bold text-black mb-1">What it measures</p>
        <p className="text-base text-gray-600">{kpi.measures}</p>
      </div>

      <div>
        <p className="text-base font-bold text-black mb-1">How to calculate</p>
        <p className="text-base text-gray-600 font-mono bg-gray-50 px-4 py-3 border border-gray-200">
          {kpi.formula}
        </p>
      </div>

      <div>
        <p className="text-base font-bold text-black mb-1">Benchmark</p>
        <p className="text-base text-gray-600">{kpi.benchmark}</p>
      </div>

      <div>
        <p className="text-base font-bold text-black mb-2">Health rules</p>
        <div className="space-y-2">
          <HealthBadge zone="green" label={kpi.health.green} />
          <HealthBadge zone="yellow" label={kpi.health.yellow} />
          <HealthBadge zone="red" label={kpi.health.red} />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default function KpiDashboardPage() {
  const [goal, setGoal] = useState<BusinessGoal | null>(null);
  const [activeChannels, setActiveChannels] = useState<Channel[]>([]);
  const [budget, setBudget] = useState<BudgetRange | null>(null);
  const [stage, setStage] = useState<BusinessStage | null>(null);

  const showDashboard = goal !== null && activeChannels.length > 0;

  const selectedPrimaryKpis = goal ? primaryKpis[goal] : [];
  const selectedChannelKpis = activeChannels.map((ch) => ({
    channel: ch,
    kpis: channelKpis[ch],
  }));

  const executiveKpis = selectedPrimaryKpis.filter(
    (k) => k.section === "executive"
  );
  const channelDeepDiveKpis = selectedChannelKpis.flatMap((g) =>
    g.kpis.filter((k) => k.section === "channel")
  );

  const handleReset = useCallback(() => {
    setGoal(null);
    setActiveChannels([]);
    setBudget(null);
    setStage(null);
  }, []);

  return (
    <article className="min-h-screen">
      
      {/* Related Tools */}
      <section className="px-6 lg:px-12 py-12" aria-label="Related tools">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">Related Tools</h2>
          <div className="flex flex-wrap gap-3">
                <Link href="/resources/roi-calculator" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">ROI Calculator</Link>
                <Link href="/resources/roi-dashboard" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">ROI Dashboard</Link>
                <Link href="/resources/roi-forecaster" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">ROI Forecaster</Link>
                <Link href="/resources/marketing-roi-report" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Marketing ROI Report</Link>
          </div>
        </div>
      </section>
<JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Marketing KPI Dashboard Builder",
          description:
            "Define the right KPIs for your marketing dashboard based on your business goals, active channels, and budget. Get benchmarks, formulas, and health rules.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />

      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "KPI Dashboard Builder" },
        ]}
      />

      {/* ---- Hero ---- */}
      <section aria-label="Free Tool" className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Marketing KPI Dashboard Builder
            </h1>
            <SectionDesc>
              Select your business goal and active channels to generate a
              custom KPI dashboard with the metrics that matter, how to
              calculate them, typical benchmarks, and when to act.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* ---- Inputs ---- */}
      <section aria-label="Content section" className="px-6 lg:px-12 pb-12">
        <div className="max-w-3xl mx-auto space-y-10">
          {/* Business goal */}
          <Animate animation="fade-up">
            <fieldset>
              <legend className="text-base font-bold text-black mb-3">
                Business Goal
              </legend>
              <div className="flex flex-wrap gap-2">
                {businessGoals.map((g) => (
                  <label
                    key={g}
                    className={`inline-flex items-center gap-2 px-5 py-3 min-h-[44px] text-base font-bold cursor-pointer border transition-colors motion-reduce:transition-none select-none focus-within:outline-2 focus-within:outline-black focus-within:outline-offset-2 ${
                      goal === g
                        ? "bg-black text-white border-black"
                        : "border-gray-200 text-gray-600 hover:border-black"
                    }`}
                  >
                    <input
                      type="radio"
                      name="business-goal"
                      value={g}
                      checked={goal === g}
                      onChange={() => setGoal(g)}
                      className="sr-only"
                    />
                    {g}
                  </label>
                ))}
              </div>
            </fieldset>
          </Animate>

          {/* Active channels */}
          <Animate animation="fade-up">
            <fieldset>
              <legend className="text-base font-bold text-black mb-3">
                Active Channels
              </legend>
              <div className="flex flex-wrap gap-2">
                {channels.map((ch) => {
                  const checked = activeChannels.includes(ch);
                  return (
                    <label
                      key={ch}
                      className={`inline-flex items-center gap-2 px-5 py-3 min-h-[44px] text-base font-bold cursor-pointer border transition-colors motion-reduce:transition-none select-none focus-within:outline-2 focus-within:outline-black focus-within:outline-offset-2 ${
                        checked
                          ? "bg-black text-white border-black"
                          : "border-gray-200 text-gray-600 hover:border-black"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() =>
                          setActiveChannels(toggleChannel(activeChannels, ch))
                        }
                        className="sr-only"
                      />
                      {ch}
                    </label>
                  );
                })}
              </div>
            </fieldset>
          </Animate>

          {/* Budget range */}
          <Animate animation="fade-up">
            <fieldset>
              <legend className="text-base font-bold text-black mb-3">
                Monthly Marketing Budget
              </legend>
              <div className="flex flex-wrap gap-2">
                {budgetRanges.map((b) => (
                  <label
                    key={b}
                    className={`inline-flex items-center gap-2 px-5 py-3 min-h-[44px] text-base font-bold cursor-pointer border transition-colors motion-reduce:transition-none select-none focus-within:outline-2 focus-within:outline-black focus-within:outline-offset-2 ${
                      budget === b
                        ? "bg-black text-white border-black"
                        : "border-gray-200 text-gray-600 hover:border-black"
                    }`}
                  >
                    <input
                      type="radio"
                      name="budget-range"
                      value={b}
                      checked={budget === b}
                      onChange={() => setBudget(b)}
                      className="sr-only"
                    />
                    {b}
                  </label>
                ))}
              </div>
            </fieldset>
          </Animate>

          {/* Business stage */}
          <Animate animation="fade-up">
            <fieldset>
              <legend className="text-base font-bold text-black mb-3">
                Business Stage
              </legend>
              <div className="flex flex-wrap gap-2">
                {businessStages.map((s) => (
                  <label
                    key={s}
                    className={`inline-flex items-center gap-2 px-5 py-3 min-h-[44px] text-base font-bold cursor-pointer border transition-colors motion-reduce:transition-none select-none focus-within:outline-2 focus-within:outline-black focus-within:outline-offset-2 ${
                      stage === s
                        ? "bg-black text-white border-black"
                        : "border-gray-200 text-gray-600 hover:border-black"
                    }`}
                  >
                    <input
                      type="radio"
                      name="business-stage"
                      value={s}
                      checked={stage === s}
                      onChange={() => setStage(s)}
                      className="sr-only"
                    />
                    {s}
                  </label>
                ))}
              </div>
            </fieldset>
          </Animate>

          {/* Reset */}
          {(goal || activeChannels.length > 0 || budget || stage) && (
            <Animate animation="fade-up">
              <button
                onClick={handleReset}
                className="px-8 py-4 min-h-[44px] text-base font-bold border border-gray-200 text-gray-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                Reset All
              </button>
            </Animate>
          )}

          {!showDashboard && (
            <p className="text-base text-gray-400">
              Select a business goal and at least one active channel to generate
              your KPI dashboard.
            </p>
          )}
        </div>
      </section>

      {/* ---- Generated Dashboard ---- */}
      {showDashboard && (
        <>
          {/* Primary KPIs */}
          <section aria-label="North Star Metrics" className="px-6 lg:px-12 py-16 border-t border-gray-200">
            <div className="max-w-4xl mx-auto">
              <Animate animation="fade-up">
                <SectionLabel>North Star Metrics</SectionLabel>
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black tracking-tight mt-3 mb-2">
                  Primary KPIs for {goal}
                </h2>
                <p className="text-base text-gray-500 mb-8">
                  These are the top-level metrics your executive dashboard
                  should track. They represent the overall health of your{" "}
                  {goal?.toLowerCase()} efforts.
                </p>
              </Animate>
              <Stagger stagger={100} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedPrimaryKpis.map((kpi) => (
                  <KpiCard key={kpi.name} kpi={kpi} />
                ))}
              </Stagger>
            </div>
          </section>

          {/* Channel-Specific KPIs */}
          {selectedChannelKpis.map(({ channel, kpis }) => (
            <section aria-label="Content section"
              key={channel}
              className="px-6 lg:px-12 py-16 border-t border-gray-200"
            >
              <div className="max-w-4xl mx-auto">
                <Animate animation="fade-up">
                  <SectionLabel>{channel}</SectionLabel>
                  <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black tracking-tight mt-3 mb-8">
                    {channel} KPIs
                  </h2>
                </Animate>
                <Stagger stagger={100} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {kpis.map((kpi) => (
                    <KpiCard key={kpi.name} kpi={kpi} />
                  ))}
                </Stagger>
              </div>
            </section>
          ))}

          {/* Reporting Template */}
          <section aria-label="Reporting Template" className="px-6 lg:px-12 py-16 border-t border-gray-200 bg-gray-50">
            <div className="max-w-4xl mx-auto">
              <Animate animation="fade-up">
                <SectionLabel>Reporting Template</SectionLabel>
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black tracking-tight mt-3 mb-8">
                  Suggested Dashboard Layout
                </h2>
              </Animate>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Animate animation="fade-up">
                  <div className="border border-gray-200 bg-white p-6">
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">
                      Executive Summary
                    </h3>
                    <p className="text-base text-gray-500 mb-4">
                      Top-level view for leadership. Review weekly.
                    </p>
                    <ul className="space-y-3">
                      {executiveKpis.map((kpi) => (
                        <li
                          key={kpi.name}
                          className="flex items-start gap-3 text-base"
                        >
                          <span className="mt-1.5 w-2 h-2 bg-black flex-shrink-0" />
                          <span className="text-gray-600">
                            <span className="font-bold text-black">
                              {kpi.name}
                            </span>{" "}
                            &mdash; {kpi.frequency}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Animate>

                <Animate animation="fade-up" delay={100}>
                  <div className="border border-gray-200 bg-white p-6">
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">
                      Channel Deep Dive
                    </h3>
                    <p className="text-base text-gray-500 mb-4">
                      Detailed view for channel managers. Review per-channel cadence.
                    </p>
                    <ul className="space-y-3">
                      {channelDeepDiveKpis.map((kpi) => (
                        <li
                          key={kpi.name}
                          className="flex items-start gap-3 text-base"
                        >
                          <span className="mt-1.5 w-2 h-2 bg-black flex-shrink-0" />
                          <span className="text-gray-600">
                            <span className="font-bold text-black">
                              {kpi.name}
                            </span>{" "}
                            &mdash; {kpi.frequency}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Animate>
              </div>
            </div>
          </section>
        </>
      )}

      {/* ---- Common KPI Mistakes ---- */}
      <section aria-label="Avoid These" className="px-6 lg:px-12 py-16 border-t border-gray-200">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Avoid These</SectionLabel>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black tracking-tight mt-3 mb-8">
              Common KPI Mistakes
            </h2>
          </Animate>
          <Stagger stagger={100} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {kpiMistakes.map((mistake) => (
              <div
                key={mistake.title}
                className="border border-gray-200 p-6"
              >
                <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-3">
                  {mistake.title}
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  {mistake.description}
                </p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---- Bottom CTA ---- */}
      <section aria-label="Call to action" className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Need Help Building Your Dashboard?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Knowing what to measure is the first step. Let our team set up
              your analytics, build custom dashboards, and turn data into
              actionable growth strategies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-5 min-h-[44px] font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              >
                Get in Touch &rarr;
              </Link>
            </div>
          </Animate>
        </div>
      </section>
    
      <ToolCTA
        toolName="Kpi Dashboard"
        services={[
          { title: "Digital Marketing", desc: "Data-driven strategy with transparent reporting and insights.", href: "/services/digital-marketing" },
          { title: "Performance Marketing", desc: "Campaign optimization based on real performance data.", href: "/services/performance-marketing" },
          { title: "SEO", desc: "SEO analytics that show exactly what drives organic growth.", href: "/services/seo" },
        ]}
        relatedTools={[
          { title: "Influencer Roi", href: "/resources/influencer-roi" },
          { title: "Kpi Builder", href: "/resources/kpi-builder" },
          { title: "Headline Split Tester", href: "/resources/headline-split-tester" },
          { title: "Image Size Guide", href: "/resources/image-size-guide" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
