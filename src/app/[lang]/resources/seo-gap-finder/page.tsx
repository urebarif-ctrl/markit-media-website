"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

/* ------------------------------------------------------------------ */
/*  Types & Constants                                                  */
/* ------------------------------------------------------------------ */

interface ContentType {
  id: string;
  label: string;
  impact: "high" | "medium" | "low";
  trafficPotential: string;
  competitorNote: string;
  roadmapMonth: 1 | 2 | 3;
  roadmapAction: string;
  roadmapDetail: string;
}

interface Category {
  id: string;
  title: string;
  items: ContentType[];
}

const industries = [
  "E-commerce / Retail",
  "SaaS / Technology",
  "Healthcare / Medical",
  "Real Estate",
  "Legal Services",
  "Financial Services",
  "Education / Training",
  "Restaurant / Hospitality",
  "Construction / Home Services",
  "Marketing / Agency",
  "Fitness / Wellness",
  "Automotive",
  "Manufacturing / Industrial",
  "Nonprofit / Government",
] as const;

type Industry = (typeof industries)[number];

const categories: Category[] = [
  {
    id: "awareness",
    title: "Awareness",
    items: [
      { id: "aw-1", label: "Blog posts targeting pain points", impact: "high", trafficPotential: "500-2,000 visits/mo per post", competitorNote: "Competitors with active blogs capture the majority of top-of-funnel organic traffic in your space.", roadmapMonth: 1, roadmapAction: "Launch a weekly blog series", roadmapDetail: "Identify your top five customer pain points through keyword research and publish one in-depth post per week targeting each. Aim for 1,500+ words with practical takeaways." },
      { id: "aw-2", label: "Comprehensive how-to guides", impact: "high", trafficPotential: "1,000-5,000 visits/mo per guide", competitorNote: "Pillar content guides rank for dozens of long-tail keywords and are likely feeding competitors a steady stream of organic leads.", roadmapMonth: 1, roadmapAction: "Create two pillar guides", roadmapDetail: "Develop two comprehensive guides covering your primary service areas. These become pillar pages that support all related blog content and internal linking." },
      { id: "aw-3", label: "Infographics and visual assets", impact: "medium", trafficPotential: "200-1,000 visits/mo via shares", competitorNote: "Visual content earns backlinks and social shares at a higher rate than text, amplifying competitors who invest in it.", roadmapMonth: 2, roadmapAction: "Design three shareable infographics", roadmapDetail: "Turn your best-performing blog data into infographics optimized for social sharing. Include embed codes so other sites can feature them with a backlink." },
      { id: "aw-4", label: "Video content (explainers, tutorials)", impact: "high", trafficPotential: "300-3,000 views/mo per video", competitorNote: "Search engines increasingly favor video results. Competitors with YouTube channels capture traffic you cannot reach with text alone.", roadmapMonth: 2, roadmapAction: "Record five short explainer videos", roadmapDetail: "Answer your top five customer questions in under three minutes each. Optimize titles and descriptions for YouTube and embed them on relevant site pages." },
      { id: "aw-5", label: "Podcast or audio content", impact: "low", trafficPotential: "100-500 listens/mo", competitorNote: "Podcasts build deep audience loyalty but take time to grow. Early movers in your industry will own the channel.", roadmapMonth: 3, roadmapAction: "Launch a short-form podcast", roadmapDetail: "Start with a bi-weekly 15-minute episode covering industry insights. Interview customers and partners to build content with minimal production overhead." },
    ],
  },
  {
    id: "consideration",
    title: "Consideration",
    items: [
      { id: "co-1", label: "Case studies with measurable results", impact: "high", trafficPotential: "100-500 visits/mo per study", competitorNote: "Case studies are the most trusted content at the consideration stage. Competitors with detailed success stories win more RFPs and demos.", roadmapMonth: 1, roadmapAction: "Publish three case studies", roadmapDetail: "Interview your three strongest customers and document results using a problem-solution-outcome structure. Include specific numbers and timelines." },
      { id: "co-2", label: "Product/service comparison pages", impact: "high", trafficPotential: "500-2,000 visits/mo per page", competitorNote: "Comparison pages capture high-intent search traffic. If you do not own these pages, competitors control the narrative about your product.", roadmapMonth: 1, roadmapAction: "Build comparison landing pages", roadmapDetail: "Create comparison pages for your top three competitors. Be factual and fair while highlighting your unique strengths and differentiators." },
      { id: "co-3", label: "Webinars or live demonstrations", impact: "medium", trafficPotential: "50-300 registrants/event", competitorNote: "Webinars let prospects experience your expertise firsthand. Competitors who host them build pipeline you are missing.", roadmapMonth: 2, roadmapAction: "Host a monthly webinar", roadmapDetail: "Plan and promote a webinar showcasing your solution in action. Record for on-demand access and follow up with all registrants." },
      { id: "co-4", label: "Whitepapers and research reports", impact: "medium", trafficPotential: "200-1,000 downloads/mo", competitorNote: "Original research generates media coverage and backlinks. Competitors publishing industry reports are seen as thought leaders.", roadmapMonth: 2, roadmapAction: "Publish one original research report", roadmapDetail: "Survey your audience or analyze industry data to produce a report with actionable findings. Gate it behind an email form to capture leads." },
      { id: "co-5", label: "Templates and downloadable tools", impact: "medium", trafficPotential: "300-1,500 downloads/mo", competitorNote: "Free templates generate qualified leads at scale. Competitors offering practical tools earn trust and email addresses simultaneously.", roadmapMonth: 2, roadmapAction: "Create three practical templates", roadmapDetail: "Build templates your audience can use immediately: checklists, spreadsheets, or planning documents related to your core services." },
    ],
  },
  {
    id: "decision",
    title: "Decision",
    items: [
      { id: "de-1", label: "Pricing page with clear information", impact: "high", trafficPotential: "200-1,000 visits/mo", competitorNote: "Prospects who cannot find pricing often assume it is too expensive and leave. Transparent competitors capture these undecided buyers.", roadmapMonth: 1, roadmapAction: "Publish transparent pricing", roadmapDetail: "Add clear pricing information or a pricing framework that helps prospects self-qualify and understand cost expectations before reaching out." },
      { id: "de-2", label: "Interactive demos or product tours", impact: "high", trafficPotential: "100-500 demo starts/mo", competitorNote: "Self-serve demos remove friction from the buying process. Competitors offering instant access convert more visitors into pipeline.", roadmapMonth: 2, roadmapAction: "Build an interactive product tour", roadmapDetail: "Create a guided walkthrough that lets prospects experience your key features without needing to talk to sales or sign up." },
      { id: "de-3", label: "Free trial or freemium offering", impact: "high", trafficPotential: "50-300 trial starts/mo", competitorNote: "Free trials dramatically lower the barrier to conversion. Competitors offering them capture prospects who are not ready to buy outright.", roadmapMonth: 2, roadmapAction: "Launch a trial or consultation offer", roadmapDetail: "Create a low-friction entry point: a free trial period, limited free tier, or complimentary strategy consultation." },
      { id: "de-4", label: "Consultation or assessment offer", impact: "high", trafficPotential: "20-100 bookings/mo", competitorNote: "A free consultation converts fence-sitters. Competitors offering assessments build personal relationships that close deals.", roadmapMonth: 1, roadmapAction: "Offer a free assessment", roadmapDetail: "Create a structured 30-minute assessment or audit that delivers genuine value while qualifying prospects for your services." },
      { id: "de-5", label: "Customer testimonials and reviews", impact: "high", trafficPotential: "Improves conversion 10-30%", competitorNote: "Testimonials are the most trusted form of marketing. Competitors with strong review profiles win prospects at the final decision point.", roadmapMonth: 1, roadmapAction: "Collect and display testimonials", roadmapDetail: "Reach out to ten satisfied customers for written or video testimonials. Display them prominently on service pages and near calls to action." },
    ],
  },
  {
    id: "retention",
    title: "Retention",
    items: [
      { id: "re-1", label: "Onboarding sequences and welcome flows", impact: "high", trafficPotential: "Improves retention 15-25%", competitorNote: "Strong onboarding reduces churn in the first 90 days. Competitors with polished welcome flows retain more customers.", roadmapMonth: 2, roadmapAction: "Build onboarding email automation", roadmapDetail: "Design a five to seven email welcome sequence guiding new customers through setup, first value milestones, and key features." },
      { id: "re-2", label: "Tutorials and knowledge base", impact: "high", trafficPotential: "500-2,000 visits/mo", competitorNote: "Help content reduces support costs while improving satisfaction. Competitors with strong knowledge bases retain customers at lower cost.", roadmapMonth: 1, roadmapAction: "Launch a help center", roadmapDetail: "Document the twenty most common support questions with clear answers, screenshots, and step-by-step instructions." },
      { id: "re-3", label: "FAQ pages addressing common issues", impact: "medium", trafficPotential: "200-1,000 visits/mo", competitorNote: "FAQ pages capture long-tail search traffic and reduce support burden. Missing FAQs mean missed organic traffic and frustrated users.", roadmapMonth: 1, roadmapAction: "Create comprehensive FAQ pages", roadmapDetail: "Document the twenty most common objections and questions from your sales and support teams with clear, honest answers." },
      { id: "re-4", label: "Email newsletter or drip campaigns", impact: "medium", trafficPotential: "Drives 5-15% repeat visits", competitorNote: "Regular email touchpoints keep your brand top of mind. Competitors with active newsletters maintain engagement between purchases.", roadmapMonth: 2, roadmapAction: "Launch a bi-weekly newsletter", roadmapDetail: "Start a consistent newsletter sharing insights, tips, and updates. Focus on value over promotion to build long-term engagement." },
      { id: "re-5", label: "Community or user group resources", impact: "low", trafficPotential: "Improves retention 10-20%", competitorNote: "Communities create switching costs and turn customers into advocates. Competitors with active communities generate organic referrals.", roadmapMonth: 3, roadmapAction: "Start a community space", roadmapDetail: "Launch a community forum, Slack group, or LinkedIn group where customers connect, share tips, and provide feedback." },
    ],
  },
  {
    id: "technical-seo",
    title: "Technical SEO",
    items: [
      { id: "ts-1", label: "Dedicated service/product pages", impact: "high", trafficPotential: "200-2,000 visits/mo per page", competitorNote: "Individual service pages rank for specific keywords. Competitors with dedicated pages outrank generic all-in-one pages.", roadmapMonth: 1, roadmapAction: "Create dedicated service pages", roadmapDetail: "Build one focused page per service or product with unique content, clear CTAs, and keyword-optimized headings." },
      { id: "ts-2", label: "Location-specific landing pages", impact: "high", trafficPotential: "100-1,000 visits/mo per page", competitorNote: "Location pages capture geo-modified search queries. Competitors with local pages dominate near me and city-specific searches.", roadmapMonth: 1, roadmapAction: "Build location landing pages", roadmapDetail: "Create one page per service area with localized content, address details, and area-specific testimonials or case studies." },
      { id: "ts-3", label: "Schema markup implementation", impact: "medium", trafficPotential: "Improves CTR 10-30%", competitorNote: "Schema markup enables rich snippets in search results. Competitors using it get more visual real estate and higher click-through rates.", roadmapMonth: 1, roadmapAction: "Implement structured data", roadmapDetail: "Add Organization, LocalBusiness, Product, FAQ, and Review schema markup to relevant pages using JSON-LD format." },
      { id: "ts-4", label: "XML sitemap and indexing setup", impact: "high", trafficPotential: "Enables all organic traffic", competitorNote: "Without a proper sitemap, search engines may miss important pages. This is a foundational requirement for all SEO efforts.", roadmapMonth: 1, roadmapAction: "Submit and verify sitemap", roadmapDetail: "Generate an XML sitemap, submit it to Google Search Console and Bing Webmaster Tools, and verify all important pages are indexed." },
      { id: "ts-5", label: "Robots.txt and crawl optimization", impact: "medium", trafficPotential: "Supports all organic traffic", competitorNote: "Misconfigured robots.txt can block search engines from indexing your site. Proper configuration ensures crawl budget is spent wisely.", roadmapMonth: 1, roadmapAction: "Audit robots.txt configuration", roadmapDetail: "Review your robots.txt file to ensure important pages are crawlable, thin content is excluded, and crawl directives are correct." },
    ],
  },
  {
    id: "local-seo",
    title: "Local SEO",
    items: [
      { id: "ls-1", label: "Google Business Profile optimization", impact: "high", trafficPotential: "500-5,000 impressions/mo", competitorNote: "Google Business Profile is the single most important local ranking factor. Unoptimized profiles lose to competitors in the local map pack.", roadmapMonth: 1, roadmapAction: "Optimize Google Business Profile", roadmapDetail: "Complete every field, add high-quality photos, set business hours, write a keyword-rich description, and select accurate categories." },
      { id: "ls-2", label: "Local landing pages per service area", impact: "high", trafficPotential: "100-1,000 visits/mo per page", competitorNote: "Local landing pages rank for city+service searches. Competitors with dedicated local pages dominate geo-specific results.", roadmapMonth: 1, roadmapAction: "Create area-specific pages", roadmapDetail: "Build unique landing pages for each city or neighborhood you serve, with localized testimonials, directions, and service details." },
      { id: "ls-3", label: "Review generation and management", impact: "high", trafficPotential: "Improves conversion 15-30%", competitorNote: "Review quantity and recency are major local ranking factors. Competitors actively collecting reviews outperform passive businesses.", roadmapMonth: 1, roadmapAction: "Launch a review collection program", roadmapDetail: "Create a systematic process for requesting reviews after positive interactions. Respond to all reviews, positive and negative, within 48 hours." },
      { id: "ls-4", label: "Local citation consistency (NAP)", impact: "medium", trafficPotential: "Supports local rankings", competitorNote: "Inconsistent business name, address, and phone across directories confuses search engines and hurts local rankings.", roadmapMonth: 2, roadmapAction: "Audit and fix citations", roadmapDetail: "List your business on the top 30 directories with consistent NAP information. Fix any inconsistencies in existing listings." },
      { id: "ls-5", label: "Locally-focused blog or news content", impact: "medium", trafficPotential: "200-1,000 visits/mo", competitorNote: "Local content signals geographic relevance to search engines. Competitors publishing local stories build stronger community ties.", roadmapMonth: 2, roadmapAction: "Publish local-focused content", roadmapDetail: "Write about local events, community involvement, and area-specific insights. This signals geographic relevance and builds local authority." },
    ],
  },
  {
    id: "link-building",
    title: "Link Building",
    items: [
      { id: "lb-1", label: "Guest posting on industry sites", impact: "high", trafficPotential: "50-500 referral visits/mo", competitorNote: "Guest posts on authoritative sites build domain authority and referral traffic. Competitors doing this steadily pull ahead in rankings.", roadmapMonth: 2, roadmapAction: "Pitch five guest post opportunities", roadmapDetail: "Identify ten industry publications that accept guest posts. Pitch unique, non-promotional topics that showcase your expertise." },
      { id: "lb-2", label: "Digital PR and media mentions", impact: "high", trafficPotential: "100-2,000 referral visits per mention", competitorNote: "Media mentions build trust and high-authority backlinks. Competitors who invest in PR enjoy compounding ranking advantages.", roadmapMonth: 2, roadmapAction: "Launch a digital PR campaign", roadmapDetail: "Create a newsworthy angle from your data or expertise. Pitch to relevant journalists and industry publications with a compelling hook." },
      { id: "lb-3", label: "Resource page link acquisition", impact: "medium", trafficPotential: "20-200 referral visits/mo", competitorNote: "Resource pages link to the best tools and content in your space. Being listed on them drives steady referral traffic and authority.", roadmapMonth: 3, roadmapAction: "Create linkable resource content", roadmapDetail: "Build a definitive resource on a topic in your industry: a comprehensive guide, data visualization, or free tool that others want to link to." },
      { id: "lb-4", label: "Partnership and co-marketing links", impact: "medium", trafficPotential: "50-500 referral visits/mo", competitorNote: "Partnership links provide relevant, high-quality backlinks. Competitors with strong partner networks build authority faster.", roadmapMonth: 3, roadmapAction: "Establish three partner link exchanges", roadmapDetail: "Identify complementary businesses and propose co-marketing arrangements: joint content, reciprocal resource mentions, or shared webinars." },
      { id: "lb-5", label: "Directory and association listings", impact: "low", trafficPotential: "10-100 referral visits/mo", competitorNote: "Industry directories provide foundational backlinks and trust signals. Missing listings are easy wins competitors have already captured.", roadmapMonth: 1, roadmapAction: "Submit to relevant directories", roadmapDetail: "List your business on the top industry-specific directories, professional associations, and local business organizations." },
    ],
  },
  {
    id: "analytics",
    title: "Analytics",
    items: [
      { id: "an-1", label: "Conversion tracking setup", impact: "high", trafficPotential: "Enables ROI measurement", competitorNote: "Without conversion tracking, you cannot measure what works. Competitors who track conversions optimize spend and outperform over time.", roadmapMonth: 1, roadmapAction: "Implement conversion tracking", roadmapDetail: "Set up Google Analytics goals, event tracking for form submissions, phone calls, and purchases. Connect to Google Ads if running paid campaigns." },
      { id: "an-2", label: "Heatmaps and user behavior analysis", impact: "medium", trafficPotential: "Improves conversion 5-15%", competitorNote: "Heatmaps reveal how visitors actually use your site. Competitors using them identify and fix UX issues that cause drop-off.", roadmapMonth: 2, roadmapAction: "Install heatmap tracking", roadmapDetail: "Set up a heatmap tool on your top ten pages. Analyze click patterns, scroll depth, and user attention to identify optimization opportunities." },
      { id: "an-3", label: "A/B testing program", impact: "medium", trafficPotential: "Improves conversion 10-30%", competitorNote: "Systematic A/B testing compounds conversion improvements. Competitors who test continuously widen their performance advantage over time.", roadmapMonth: 3, roadmapAction: "Start an A/B testing program", roadmapDetail: "Run one test per month on high-traffic pages. Start with headline tests and CTA variations, then progress to layout and offer testing." },
      { id: "an-4", label: "Attribution modeling", impact: "low", trafficPotential: "Optimizes channel spend", competitorNote: "Proper attribution prevents over-investing in last-click channels and under-investing in awareness channels that initiate conversions.", roadmapMonth: 3, roadmapAction: "Set up multi-touch attribution", roadmapDetail: "Configure attribution models in your analytics platform to understand which channels contribute to conversions at each stage of the journey." },
      { id: "an-5", label: "Reporting dashboards", impact: "medium", trafficPotential: "Enables data-driven decisions", competitorNote: "Automated dashboards surface insights faster. Competitors with real-time reporting react to trends and issues before you notice them.", roadmapMonth: 2, roadmapAction: "Build automated dashboards", roadmapDetail: "Create dashboards showing key metrics: organic traffic, conversions, top pages, and ranking positions. Set up weekly automated reports." },
    ],
  },
];

/* industry-specific emphasis (which categories matter most per industry) */
const industryEmphasis: Record<Industry, Record<string, number>> = {
  "E-commerce / Retail": { awareness: 1.2, consideration: 1.3, decision: 1.5, retention: 1.3, "technical-seo": 1.2, "local-seo": 0.8, "link-building": 1.0, analytics: 1.4 },
  "SaaS / Technology": { awareness: 1.3, consideration: 1.4, decision: 1.5, retention: 1.4, "technical-seo": 1.2, "local-seo": 0.6, "link-building": 1.2, analytics: 1.3 },
  "Healthcare / Medical": { awareness: 1.2, consideration: 1.1, decision: 1.0, retention: 1.1, "technical-seo": 1.3, "local-seo": 1.5, "link-building": 1.0, analytics: 1.0 },
  "Real Estate": { awareness: 1.1, consideration: 1.2, decision: 1.3, retention: 0.9, "technical-seo": 1.1, "local-seo": 1.5, "link-building": 1.0, analytics: 1.1 },
  "Legal Services": { awareness: 1.2, consideration: 1.3, decision: 1.2, retention: 1.0, "technical-seo": 1.2, "local-seo": 1.5, "link-building": 1.1, analytics: 1.0 },
  "Financial Services": { awareness: 1.3, consideration: 1.4, decision: 1.3, retention: 1.2, "technical-seo": 1.2, "local-seo": 1.0, "link-building": 1.1, analytics: 1.3 },
  "Education / Training": { awareness: 1.4, consideration: 1.3, decision: 1.1, retention: 1.3, "technical-seo": 1.1, "local-seo": 0.9, "link-building": 1.2, analytics: 1.0 },
  "Restaurant / Hospitality": { awareness: 1.0, consideration: 0.9, decision: 1.1, retention: 1.2, "technical-seo": 1.0, "local-seo": 1.5, "link-building": 0.8, analytics: 1.0 },
  "Construction / Home Services": { awareness: 1.1, consideration: 1.2, decision: 1.3, retention: 1.0, "technical-seo": 1.1, "local-seo": 1.5, "link-building": 1.0, analytics: 1.0 },
  "Marketing / Agency": { awareness: 1.4, consideration: 1.4, decision: 1.2, retention: 1.2, "technical-seo": 1.3, "local-seo": 0.8, "link-building": 1.3, analytics: 1.4 },
  "Fitness / Wellness": { awareness: 1.2, consideration: 1.1, decision: 1.2, retention: 1.4, "technical-seo": 1.0, "local-seo": 1.4, "link-building": 0.9, analytics: 1.0 },
  "Automotive": { awareness: 1.1, consideration: 1.2, decision: 1.3, retention: 1.1, "technical-seo": 1.1, "local-seo": 1.4, "link-building": 1.0, analytics: 1.1 },
  "Manufacturing / Industrial": { awareness: 1.2, consideration: 1.4, decision: 1.3, retention: 1.1, "technical-seo": 1.2, "local-seo": 0.7, "link-building": 1.2, analytics: 1.1 },
  "Nonprofit / Government": { awareness: 1.4, consideration: 1.1, decision: 0.9, retention: 1.3, "technical-seo": 1.1, "local-seo": 1.1, "link-building": 1.3, analytics: 1.0 },
};

const howToSteps = [
  { title: "Select Your Industry", description: "Choose the business type that best matches yours. This customizes the analysis to weight content types that matter most in your space." },
  { title: "Check What You Have", description: "Go through each category and check off the content types you already have in place. Be honest; this tool only helps if the inputs are accurate." },
  { title: "Review Your Gaps", description: "Look at coverage by category and overall. The bar chart shows where your content strategy is strong and where it falls short." },
  { title: "Follow the Roadmap", description: "Use the three-month priority roadmap to close gaps in order of impact. Start with high-impact items in month one and build from there." },
];

/* ------------------------------------------------------------------ */
/*  Utility functions                                                  */
/* ------------------------------------------------------------------ */

type Checked = Record<string, boolean>;

function createEmptyChecked(): Checked {
  const checked: Checked = {};
  for (const cat of categories) {
    for (const item of cat.items) {
      checked[item.id] = false;
    }
  }
  return checked;
}

function getCategoryCoverage(checked: Checked, cat: Category): number {
  const total = cat.items.length;
  const covered = cat.items.filter((item) => checked[item.id]).length;
  return total === 0 ? 0 : Math.round((covered / total) * 100);
}

function getOverallCoverage(checked: Checked): number {
  let total = 0;
  let covered = 0;
  for (const cat of categories) {
    total += cat.items.length;
    covered += cat.items.filter((item) => checked[item.id]).length;
  }
  return total === 0 ? 0 : Math.round((covered / total) * 100);
}

function getLetterGrade(pct: number): string {
  if (pct >= 90) return "A";
  if (pct >= 75) return "B";
  if (pct >= 60) return "C";
  if (pct >= 40) return "D";
  return "F";
}

function getGradeDescription(grade: string): string {
  switch (grade) {
    case "A": return "Excellent content coverage. Your strategy covers nearly all essential content types. Focus on optimization and freshness.";
    case "B": return "Strong foundation with a few gaps to close. Targeted investments in missing areas will round out your strategy.";
    case "C": return "Moderate coverage. Several meaningful gaps exist that are likely costing you traffic and conversions.";
    case "D": return "Below average coverage. Significant gaps are limiting your organic visibility and lead generation potential.";
    default: return "Major gaps across most categories. A structured content plan is essential to compete effectively in search.";
  }
}

interface MissingItem {
  id: string;
  label: string;
  categoryTitle: string;
  categoryId: string;
  impact: "high" | "medium" | "low";
  trafficPotential: string;
  competitorNote: string;
  roadmapMonth: 1 | 2 | 3;
  roadmapAction: string;
  roadmapDetail: string;
  weightedScore: number;
}

function getMissingItems(checked: Checked, industry: Industry): MissingItem[] {
  const emphasis = industryEmphasis[industry];
  const missing: MissingItem[] = [];
  for (const cat of categories) {
    for (const item of cat.items) {
      if (!checked[item.id]) {
        const impactScore = item.impact === "high" ? 3 : item.impact === "medium" ? 2 : 1;
        const catWeight = emphasis[cat.id] || 1;
        missing.push({
          id: item.id,
          label: item.label,
          categoryTitle: cat.title,
          categoryId: cat.id,
          impact: item.impact,
          trafficPotential: item.trafficPotential,
          competitorNote: item.competitorNote,
          roadmapMonth: item.roadmapMonth,
          roadmapAction: item.roadmapAction,
          roadmapDetail: item.roadmapDetail,
          weightedScore: impactScore * catWeight,
        });
      }
    }
  }
  missing.sort((a, b) => b.weightedScore - a.weightedScore);
  return missing;
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function CoverageBarChart({ checked, industry }: { checked: Checked; industry: Industry }) {
  const emphasis = industryEmphasis[industry];
  return (
    <div className="space-y-5" role="img" aria-label="Bar chart showing content coverage by category">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "SEO Content Gap Finder",
          description: "Choose the business type that best matches yours. This customizes the analysis to weight content types that matter most in your space.",
          url: "https://themarkitmedia.com/en/resources/seo-gap-finder",
          applicationCategory: "SEO Tool",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          provider: { "@type": "Organization", name: "Markit Media", url: "https://themarkitmedia.com" },
        }) }}
      />
      <title>SEO Content Gap Finder | Free Marketing Tool — Markit Media</title>
      <meta name="description" content="Choose the business type that best matches yours. This customizes the analysis to weight content types that matter most in your space." />
      {categories.map((cat) => {
        const pct = getCategoryCoverage(checked, cat);
        const weight = emphasis[cat.id] || 1;
        const importanceLabel = weight >= 1.3 ? "Critical for your industry" : weight >= 1.0 ? "Important" : "Lower priority";
        return (
          <div key={cat.id}>
            <div className="flex justify-between mb-2 flex-wrap gap-1">
              <span className="text-base font-bold text-black">{cat.title}</span>
              <span className="text-base text-gray-500">
                {pct}% covered
                {weight >= 1.3 && (
                  <span className="ml-2 text-black font-bold">{importanceLabel}</span>
                )}
              </span>
            </div>
            <div className="w-full bg-gray-100 h-8">
              <div
                className="bg-black h-8 transition-all duration-500 motion-reduce:transition-none"
                style={{ width: `${pct}%` }}
                role="presentation"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function OverallScore({ checked }: { checked: Checked }) {
  const pct = getOverallCoverage(checked);
  const grade = getLetterGrade(pct);
  const description = getGradeDescription(grade);
  const coveredCount = Object.values(checked).filter(Boolean).length;
  const totalCount = Object.keys(checked).length;

  return (
    <div className="border border-gray-200 p-6">
      <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">
        Overall Content Coverage
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div>
          <p className="text-base text-gray-500 mb-1">Coverage</p>
          <p className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black font-[family-name:var(--font-display)]">
            {pct}%
          </p>
          <p className="text-base text-gray-500">{coveredCount} of {totalCount} content types</p>
        </div>
        <div>
          <p className="text-base text-gray-500 mb-1">Grade</p>
          <p className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black font-[family-name:var(--font-display)]">
            {grade}
          </p>
        </div>
        <div className="sm:col-span-1">
          <p className="text-base text-gray-500 mb-1">Assessment</p>
          <p className="text-base text-gray-700 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}

function MissingOpportunities({ items }: { items: MissingItem[] }) {
  if (items.length === 0) return null;
  const top = items.slice(0, 10);

  return (
    <div className="space-y-6">
      <h3 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black">
        Missing Content Opportunities
      </h3>
      <p className="text-base text-gray-500">
        Your highest-impact missing content types ranked by importance for your industry. Addressing these first will deliver the greatest return.
      </p>
      {top.map((item, rank) => (
        <Animate key={item.id} animation="fade-up">
          <div className="border border-gray-200">
            <div className="bg-black text-white px-6 py-4 flex items-center justify-between flex-wrap gap-2">
              <h4 className="font-[family-name:var(--font-display)] text-lg font-extrabold">
                #{rank + 1}: {item.label}
              </h4>
              <span className="text-base text-gray-400">
                {item.categoryTitle} &middot; {item.impact === "high" ? "High" : item.impact === "medium" ? "Medium" : "Low"} impact
              </span>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <p className="text-base font-bold text-black mb-1">Traffic Potential</p>
                <p className="text-base text-gray-700">{item.trafficPotential}</p>
              </div>
              <div>
                <p className="text-base font-bold text-black mb-1">Competitor Advantage</p>
                <p className="text-base text-gray-700 leading-relaxed">{item.competitorNote}</p>
              </div>
            </div>
          </div>
        </Animate>
      ))}
    </div>
  );
}

function PriorityRoadmap({ items }: { items: MissingItem[] }) {
  if (items.length === 0) return null;

  const months: Record<number, MissingItem[]> = { 1: [], 2: [], 3: [] };
  for (const item of items) {
    months[item.roadmapMonth].push(item);
  }

  const monthLabels: Record<number, string> = {
    1: "Month 1: Quick Wins and Foundations",
    2: "Month 2: Build and Expand",
    3: "Month 3: Optimize and Scale",
  };

  return (
    <div className="space-y-6">
      <h3 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black">
        3-Month Priority Roadmap
      </h3>
      <p className="text-base text-gray-500">
        A prioritized action plan based on your gaps. High-impact items are scheduled first, with foundational work front-loaded in month one.
      </p>
      {[1, 2, 3].map((month) => {
        const monthItems = months[month];
        if (!monthItems || monthItems.length === 0) return null;
        return (
          <Animate key={month} animation="fade-up">
            <div className="border border-gray-200">
              <div className="bg-black text-white px-6 py-4">
                <h4 className="font-[family-name:var(--font-display)] text-lg font-extrabold">
                  {monthLabels[month]}
                </h4>
              </div>
              <div className="divide-y divide-gray-200">
                {monthItems.map((item) => (
                  <div key={item.id} className="p-6">
                    <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
                      <p className="text-base font-bold text-black">
                        {item.roadmapAction}
                      </p>
                      <span className="text-base text-gray-500">
                        {item.categoryTitle}
                      </span>
                    </div>
                    <p className="text-base text-gray-700 leading-relaxed">
                      {item.roadmapDetail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Animate>
        );
      })}
    </div>
  );
}

function CompetitorAnalysis({ items, industry }: { items: MissingItem[]; industry: Industry }) {
  if (items.length === 0) return null;
  const emphasis = industryEmphasis[industry];

  /* find the categories where gaps hurt the most */
  const catGapCounts: Record<string, { title: string; count: number; weight: number }> = {};
  for (const item of items) {
    if (!catGapCounts[item.categoryId]) {
      catGapCounts[item.categoryId] = { title: item.categoryTitle, count: 0, weight: emphasis[item.categoryId] || 1 };
    }
    catGapCounts[item.categoryId].count++;
  }

  const sorted = Object.values(catGapCounts).sort((a, b) => (b.count * b.weight) - (a.count * a.weight));
  const criticalCats = sorted.filter((c) => c.weight >= 1.2 && c.count >= 2);

  if (criticalCats.length === 0) return null;

  return (
    <div className="space-y-6">
      <h3 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black">
        Competitor Advantage Analysis
      </h3>
      <p className="text-base text-gray-500">
        These are the categories where your content gaps hurt the most relative to competitors in {industry}. Competitors who have covered these areas hold a structural advantage in search.
      </p>
      {criticalCats.map((cat) => {
        const catItems = items.filter((item) => item.categoryTitle === cat.title);
        return (
          <Animate key={cat.title} animation="fade-up">
            <div className="border border-gray-200 p-6">
              <h4 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">
                {cat.title}
              </h4>
              <p className="text-base text-gray-500 mb-4">
                {cat.count} of 5 content types missing &middot; {cat.weight >= 1.3 ? "Critical" : "Important"} for {industry}
              </p>
              <ul className="space-y-3">
                {catItems.slice(0, 3).map((item) => (
                  <li key={item.id} className="text-base text-gray-700 leading-relaxed border-l-2 border-black pl-4">
                    <span className="font-bold text-black">{item.label}:</span> {item.competitorNote}
                  </li>
                ))}
              </ul>
            </div>
          </Animate>
        );
      })}
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard API unavailable */
    }
  }, [text]);

  return (
    <button
      onClick={copy}
      aria-label="Copy analysis to clipboard"
      className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center px-5 py-3 text-base font-bold border border-gray-200 text-gray-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
    >
      {copied ? "Copied" : "Copy to Clipboard"}
    </button>
  );
}

function DownloadButton({ text, filename }: { text: string; filename: string }) {
  const download = useCallback(() => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [text, filename]);

  return (
    <button
      onClick={download}
      aria-label="Download analysis as text file"
      className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center px-5 py-3 text-base font-bold border border-gray-200 text-gray-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
    >
      Download as Text
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Format as plain text                                               */
/* ------------------------------------------------------------------ */

function formatAnalysisText(checked: Checked, industry: Industry): string {
  const lines: string[] = [];
  const pct = getOverallCoverage(checked);
  const grade = getLetterGrade(pct);
  const missing = getMissingItems(checked, industry);

  lines.push("SEO CONTENT GAP FINDER - ANALYSIS REPORT");
  lines.push("=".repeat(50));
  lines.push(`Industry: ${industry}`);
  lines.push(`Overall Coverage: ${pct}% (Grade: ${grade})`);
  lines.push(`Assessment: ${getGradeDescription(grade)}`);
  lines.push("");

  lines.push("COVERAGE BY CATEGORY");
  lines.push("-".repeat(30));
  for (const cat of categories) {
    const catPct = getCategoryCoverage(checked, cat);
    const covered = cat.items.filter((item) => checked[item.id]).length;
    lines.push(`${cat.title}: ${catPct}% (${covered}/${cat.items.length})`);
    for (const item of cat.items) {
      const status = checked[item.id] ? "[x]" : "[ ]";
      lines.push(`  ${status} ${item.label}`);
    }
    lines.push("");
  }

  if (missing.length > 0) {
    lines.push("TOP MISSING CONTENT OPPORTUNITIES");
    lines.push("-".repeat(30));
    missing.slice(0, 10).forEach((item, i) => {
      lines.push(`${i + 1}. ${item.label} (${item.categoryTitle})`);
      lines.push(`   Impact: ${item.impact} | Traffic: ${item.trafficPotential}`);
      lines.push(`   ${item.competitorNote}`);
      lines.push("");
    });

    lines.push("3-MONTH PRIORITY ROADMAP");
    lines.push("-".repeat(30));
    for (const month of [1, 2, 3]) {
      const monthItems = missing.filter((item) => item.roadmapMonth === month);
      if (monthItems.length > 0) {
        const label = month === 1 ? "Month 1: Quick Wins" : month === 2 ? "Month 2: Build and Expand" : "Month 3: Optimize and Scale";
        lines.push(label);
        for (const item of monthItems) {
          lines.push(`  - ${item.roadmapAction}: ${item.roadmapDetail}`);
        }
        lines.push("");
      }
    }
  }

  lines.push("Generated by Markit Media SEO Content Gap Finder");
  lines.push("https://themarkitmedia.com/resources/seo-gap-finder");

  return lines.join("\n");
}

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */



export default function SeoGapFinderPage() {
  const [industry, setIndustry] = useState<Industry | "">("");
  const [checked, setChecked] = useState<Checked>(createEmptyChecked());
  const [results, setResults] = useState<{ checked: Checked; industry: Industry } | null>(null);

  function toggleItem(itemId: string) {
    setChecked((prev) => ({ ...prev, [itemId]: !prev[itemId] }));
  }

  function handleAnalyze() {
    if (!industry) return;
    setResults({ checked: { ...checked }, industry: industry as Industry });
  }

  function handleReset() {
    setIndustry("");
    setChecked(createEmptyChecked());
    setResults(null);
  }

  const missingItems = results ? getMissingItems(results.checked, results.industry) : [];
  const plainText = results ? formatAnalysisText(results.checked, results.industry) : "";

  return (
    <article className="min-h-screen">
      
      {/* Related Tools */}
      <section className="px-6 lg:px-12 py-12" aria-label="Related tools">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">Related Tools</h2>
          <div className="flex flex-wrap gap-3">
                <Link href="/resources/seo-checklist" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">SEO Checklist</Link>
                <Link href="/resources/keyword-density-checker" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Keyword Density Checker</Link>
                <Link href="/resources/seo-content-optimizer" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">SEO Content Optimizer</Link>
                <Link href="/resources/seo-audit-score" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">SEO Audit Score</Link>
          </div>
        </div>
      </section>
<JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "SEO Content Gap Finder",
          description:
            "Free SEO content gap analysis tool. Identify missing content types across 8 categories and get a prioritized roadmap to close gaps and improve organic visibility.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />

      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "SEO Content Gap Finder" },
        ]}
      />

      {/* ---- Hero ---- */}
      <section aria-label="Free Tool" className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              SEO Content Gap Finder
            </h1>
            <SectionDesc>
              Identify the content types missing from your website across 8
              essential categories. Select your industry, check off what you
              already have, and get a prioritized roadmap showing exactly what
              to build first to close your biggest SEO gaps.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* ---- Industry Selection ---- */}
      <section aria-label="Step 1: Select Your Industry" className="px-6 lg:px-12 pb-8">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <div className="border border-gray-200 p-6">
              <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">
                Step 1: Select Your Industry
              </h2>
              <p className="text-base text-gray-500 mb-4">
                This customizes the analysis to weight content types that matter most for your business.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {industries.map((ind) => {
                  const isSelected = industry === ind;
                  return (
                    <button
                      key={ind}
                      type="button"
                      onClick={() => setIndustry(ind)}
                      aria-pressed={isSelected}
                      className={`min-h-[44px] px-4 py-3 text-base font-bold text-left transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 border ${
                        isSelected
                          ? "bg-black text-white border-black"
                          : "bg-white text-black border-gray-200 hover:border-black"
                      }`}
                    >
                      {ind}
                    </button>
                  );
                })}
              </div>
            </div>
          </Animate>
        </div>
      </section>

      {/* ---- Content Checklist ---- */}
      <section aria-label="Step 2: Check What You Already Have" className="px-6 lg:px-12 pb-12">
        <div className="max-w-4xl mx-auto space-y-6">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black">
              Step 2: Check What You Already Have
            </h2>
            <p className="text-base text-gray-500 mt-2">
              Go through each category and check off the content types your website currently has in place. Be honest for accurate results.
            </p>
          </Animate>

          {categories.map((cat) => (
            <Animate key={cat.id} animation="fade-up">
              <div className="border border-gray-200">
                <div className="bg-black text-white px-6 py-4 flex items-center justify-between flex-wrap gap-2">
                  <span className="font-[family-name:var(--font-display)] text-base font-extrabold">
                    {cat.title}
                  </span>
                  <span className="text-base text-gray-400">
                    {cat.items.filter((item) => checked[item.id]).length}/{cat.items.length} covered
                  </span>
                </div>
                <div className="divide-y divide-gray-200">
                  {cat.items.map((item, i) => (
                    <label
                      key={item.id}
                      className={`flex items-center gap-4 px-6 py-4 cursor-pointer transition-colors motion-reduce:transition-none hover:bg-gray-50 ${
                        i % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <span className="relative flex items-center justify-center min-w-[44px] min-h-[44px]">
                        <input
                          type="checkbox"
                          checked={checked[item.id]}
                          onChange={() => toggleItem(item.id)}
                          className="peer sr-only"
                          aria-label={item.label}
                        />
                        <span className="w-6 h-6 border-2 border-gray-300 peer-checked:border-black peer-checked:bg-black transition-colors motion-reduce:transition-none flex items-center justify-center focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                          {checked[item.id] && (
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </span>
                      </span>
                      <span className="text-base text-black font-bold flex-1">
                        {item.label}
                      </span>
                      <span className={`text-base font-bold ${
                        item.impact === "high" ? "text-black" : item.impact === "medium" ? "text-gray-500" : "text-gray-400"
                      }`}>
                        {item.impact === "high" ? "High" : item.impact === "medium" ? "Med" : "Low"}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </Animate>
          ))}

          {/* Analyze / Reset */}
          <Animate animation="fade-up">
            <div className="flex flex-wrap gap-3 items-center">
              <button
                onClick={handleAnalyze}
                disabled={!industry}
                className="bg-black text-white px-8 py-4 min-h-[44px] text-base font-bold hover:bg-gray-900 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Find Content Gaps
              </button>
              {(Object.values(checked).some(Boolean) || industry) && (
                <button
                  onClick={handleReset}
                  className="px-8 py-4 min-h-[44px] text-base font-bold border border-gray-200 text-gray-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  Start Over
                </button>
              )}
              {!industry && (
                <p className="text-base text-gray-400">
                  Select an industry above to run the analysis.
                </p>
              )}
            </div>
          </Animate>
        </div>
      </section>

      {/* ---- Results ---- */}
      {results && (
        <section aria-label="Coverage by Category" className="px-6 lg:px-12 pb-16">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Overall score */}
            <Animate animation="fade-up">
              <OverallScore checked={results.checked} />
            </Animate>

            {/* Coverage bar chart */}
            <Animate animation="fade-up">
              <div className="border border-gray-200 p-6">
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-6">
                  Coverage by Category
                </h2>
                <CoverageBarChart checked={results.checked} industry={results.industry} />
              </div>
            </Animate>

            {/* Missing content opportunities */}
            <MissingOpportunities items={missingItems} />

            {/* Priority roadmap */}
            <PriorityRoadmap items={missingItems} />

            {/* Competitor advantage analysis */}
            <CompetitorAnalysis items={missingItems} industry={results.industry} />

            {/* Export actions */}
            <div className="flex flex-wrap gap-3">
              <CopyButton text={plainText} />
              <DownloadButton text={plainText} filename="seo-content-gap-analysis.txt" />
              <button
                onClick={handleReset}
                className="px-8 py-4 min-h-[44px] text-base font-bold border border-gray-200 text-gray-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                Start Over
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ---- How to Use ---- */}
      <section aria-label="How to Use This Tool" className="px-6 lg:px-12 py-16 border-t border-gray-200">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-8">
              How to Use This Tool
            </h2>
          </Animate>
          <Stagger stagger={100} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {howToSteps.map((step, i) => (
              <div key={i} className="border border-gray-200 p-6">
                <div className="flex items-start gap-4">
                  <span className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-gray-300">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">
                      {step.title}
                    </h3>
                    <p className="text-base text-gray-500 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
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
              Get a Professional SEO Content Strategy
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              This tool identifies your gaps. Our team builds the strategy to
              close them, with keyword research, competitor analysis, and a
              content plan tailored to your industry and growth goals.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-5 min-h-[44px] font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              Get a Content Strategy From Our Team &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    
      <ToolCTA
        toolName="Seo Gap Finder"
        services={[
          { title: "SEO", desc: "Data-driven SEO strategies that drive organic traffic and revenue growth.", href: "/services/seo" },
          { title: "Content Marketing", desc: "Content that ranks, engages, and converts your target audience.", href: "/services/content-marketing" },
          { title: "Digital Marketing", desc: "Full-stack digital marketing strategy tailored to your business goals.", href: "/services/digital-marketing" },
        ]}
        relatedTools={[
          { title: "Seo Audit Score", href: "/resources/seo-audit-score" },
          { title: "Seo Checklist", href: "/resources/seo-checklist" },
          { title: "Seo Content Optimizer", href: "/resources/seo-content-optimizer" },
          { title: "Seo Vs Ppc", href: "/resources/seo-vs-ppc" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
