"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { Animate } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Metric {
  id: string;
  name: string;
  category: Category;
  definition: string;
  formula: string;
  benchmarkLow: number;
  benchmarkHigh: number;
  unit: "%" | "$" | "s" | "x" | "#" | "score" | "ms";
  tips: string[];
}

type Category =
  | "Website"
  | "SEO"
  | "Email"
  | "Social Media"
  | "Paid Advertising"
  | "Content"
  | "E-Commerce";

type Status = "Below" | "Average" | "Above";

/* ------------------------------------------------------------------ */
/*  Metric data (50 metrics, 7 categories)                            */
/* ------------------------------------------------------------------ */

const CATEGORIES: Category[] = [
  "Website",
  "SEO",
  "Email",
  "Social Media",
  "Paid Advertising",
  "Content",
  "E-Commerce",
];

const METRICS: Metric[] = [
  // ---- Website (8) ----
  {
    id: "w-bounce",
    name: "Bounce Rate",
    category: "Website",
    definition:
      "The percentage of visitors who leave after viewing only one page.",
    formula: "(Single-page sessions / Total sessions) x 100",
    benchmarkLow: 26,
    benchmarkHigh: 55,
    unit: "%",
    tips: [
      "Improve page load speed to reduce impatient exits.",
      "Add clear internal links and CTAs to keep visitors engaged.",
      "Ensure landing page content matches the ad or search intent.",
    ],
  },
  {
    id: "w-pages",
    name: "Pages per Session",
    category: "Website",
    definition:
      "The average number of pages viewed during a single session.",
    formula: "Total pageviews / Total sessions",
    benchmarkLow: 2,
    benchmarkHigh: 4,
    unit: "#",
    tips: [
      "Use related-content sections to drive deeper exploration.",
      "Improve navigation so users can find what they need.",
      "Add breadcrumbs and contextual links throughout your site.",
    ],
  },
  {
    id: "w-duration",
    name: "Avg Session Duration",
    category: "Website",
    definition:
      "The average time visitors spend on your site per session.",
    formula: "Total session duration / Total sessions",
    benchmarkLow: 120,
    benchmarkHigh: 240,
    unit: "s",
    tips: [
      "Create longer, high-quality content that holds attention.",
      "Embed videos and interactive elements to increase dwell time.",
      "Improve readability with headings, bullet points, and visuals.",
    ],
  },
  {
    id: "w-speed",
    name: "Page Speed (LCP)",
    category: "Website",
    definition:
      "Largest Contentful Paint measures how fast the main content loads.",
    formula: "Time until largest visible element renders",
    benchmarkLow: 1200,
    benchmarkHigh: 2500,
    unit: "ms",
    tips: [
      "Optimize and compress images; use modern formats like WebP.",
      "Minimize render-blocking CSS and JavaScript.",
      "Use a CDN to serve assets from locations closer to users.",
    ],
  },
  {
    id: "w-conversion",
    name: "Conversion Rate",
    category: "Website",
    definition:
      "The percentage of visitors who complete a desired action.",
    formula: "(Conversions / Total visitors) x 100",
    benchmarkLow: 2,
    benchmarkHigh: 5,
    unit: "%",
    tips: [
      "A/B test headlines, CTAs, and form lengths.",
      "Add trust signals like testimonials and security badges.",
      "Simplify the conversion path and reduce form fields.",
    ],
  },
  {
    id: "w-exit",
    name: "Exit Rate",
    category: "Website",
    definition:
      "The percentage of visitors who leave from a specific page.",
    formula: "(Exits from page / Total views of page) x 100",
    benchmarkLow: 20,
    benchmarkHigh: 45,
    unit: "%",
    tips: [
      "Review high-exit pages for missing CTAs or dead ends.",
      "Add next-step prompts at the bottom of every page.",
      "Check for broken links or confusing navigation on exit pages.",
    ],
  },
  {
    id: "w-newreturn",
    name: "New vs Returning Visitors",
    category: "Website",
    definition:
      "The ratio of first-time visitors to repeat visitors.",
    formula: "(New visitors / Total visitors) x 100",
    benchmarkLow: 40,
    benchmarkHigh: 70,
    unit: "%",
    tips: [
      "Use email and retargeting campaigns to bring visitors back.",
      "Create a content hub that encourages repeat visits.",
      "Balance acquisition spend with retention and loyalty programs.",
    ],
  },
  {
    id: "w-scroll",
    name: "Scroll Depth",
    category: "Website",
    definition:
      "How far down the page visitors scroll on average.",
    formula: "(Average scroll position / Total page height) x 100",
    benchmarkLow: 50,
    benchmarkHigh: 75,
    unit: "%",
    tips: [
      "Place key information and CTAs within the first viewport.",
      "Use visual cues like arrows and section breaks to encourage scrolling.",
      "Break long pages into digestible sections with clear headings.",
    ],
  },

  // ---- SEO (7) ----
  {
    id: "s-traffic",
    name: "Organic Traffic Growth",
    category: "SEO",
    definition:
      "Month-over-month percentage increase in organic search visitors.",
    formula: "((Current month organic - Previous month organic) / Previous month organic) x 100",
    benchmarkLow: 5,
    benchmarkHigh: 15,
    unit: "%",
    tips: [
      "Publish consistent, keyword-targeted content.",
      "Update and refresh existing high-performing content.",
      "Build topical authority by clustering related content together.",
    ],
  },
  {
    id: "s-rankings",
    name: "Keyword Rankings",
    category: "SEO",
    definition:
      "The number of keywords your site ranks for on page one of search results.",
    formula: "Count of keywords in positions 1-10",
    benchmarkLow: 50,
    benchmarkHigh: 500,
    unit: "#",
    tips: [
      "Target long-tail keywords with lower competition.",
      "Optimize on-page elements: title tags, headings, and meta descriptions.",
      "Build internal links between related pages to pass authority.",
    ],
  },
  {
    id: "s-da",
    name: "Domain Authority",
    category: "SEO",
    definition:
      "A score predicting how well your site will rank in search engines (0-100).",
    formula: "Proprietary score based on backlink profile and domain age",
    benchmarkLow: 20,
    benchmarkHigh: 50,
    unit: "score",
    tips: [
      "Earn high-quality backlinks from authoritative websites.",
      "Remove or disavow toxic backlinks.",
      "Create link-worthy content such as original research or tools.",
    ],
  },
  {
    id: "s-ctr",
    name: "Organic CTR",
    category: "SEO",
    definition:
      "The percentage of search impressions that result in a click.",
    formula: "(Organic clicks / Organic impressions) x 100",
    benchmarkLow: 2,
    benchmarkHigh: 5,
    unit: "%",
    tips: [
      "Write compelling title tags and meta descriptions.",
      "Use structured data to get rich snippets in search results.",
      "Target featured snippet opportunities for top visibility.",
    ],
  },
  {
    id: "s-indexed",
    name: "Pages Indexed",
    category: "SEO",
    definition:
      "The number of your site pages included in search engine indexes.",
    formula: "site:yourdomain.com results count",
    benchmarkLow: 50,
    benchmarkHigh: 500,
    unit: "#",
    tips: [
      "Submit an XML sitemap in Google Search Console.",
      "Fix crawl errors and remove duplicate content.",
      "Ensure important pages are not blocked by robots.txt.",
    ],
  },
  {
    id: "s-backlinks",
    name: "Backlinks",
    category: "SEO",
    definition:
      "The number of external websites linking to your site.",
    formula: "Count of unique referring domains",
    benchmarkLow: 50,
    benchmarkHigh: 500,
    unit: "#",
    tips: [
      "Create shareable content like infographics and studies.",
      "Reach out to industry publications for guest posting.",
      "Monitor and replicate competitor backlink strategies.",
    ],
  },
  {
    id: "s-cwv",
    name: "Core Web Vitals Score",
    category: "SEO",
    definition:
      "Google's page experience metrics covering loading, interactivity, and visual stability.",
    formula: "Composite of LCP, INP, and CLS scores",
    benchmarkLow: 70,
    benchmarkHigh: 90,
    unit: "score",
    tips: [
      "Optimize LCP by lazy-loading images below the fold.",
      "Reduce INP by minimizing main-thread JavaScript work.",
      "Prevent CLS by setting explicit dimensions on images and ads.",
    ],
  },

  // ---- Email (7) ----
  {
    id: "e-open",
    name: "Open Rate",
    category: "Email",
    definition:
      "The percentage of delivered emails that are opened by recipients.",
    formula: "(Unique opens / Emails delivered) x 100",
    benchmarkLow: 18,
    benchmarkHigh: 28,
    unit: "%",
    tips: [
      "Write subject lines that spark curiosity or urgency.",
      "Personalize the sender name and subject line.",
      "Test send times to find when your audience is most active.",
    ],
  },
  {
    id: "e-ctr",
    name: "Click-Through Rate",
    category: "Email",
    definition:
      "The percentage of email recipients who click a link in the email.",
    formula: "(Unique clicks / Emails delivered) x 100",
    benchmarkLow: 2,
    benchmarkHigh: 5,
    unit: "%",
    tips: [
      "Use a single, prominent CTA button above the fold.",
      "Segment your list to send more relevant content.",
      "A/B test button text, colors, and placement.",
    ],
  },
  {
    id: "e-unsub",
    name: "Unsubscribe Rate",
    category: "Email",
    definition:
      "The percentage of recipients who opt out after an email.",
    formula: "(Unsubscribes / Emails delivered) x 100",
    benchmarkLow: 0.1,
    benchmarkHigh: 0.5,
    unit: "%",
    tips: [
      "Set clear expectations at signup about email frequency.",
      "Offer a preference center instead of a full unsubscribe.",
      "Remove inactive subscribers before they mark you as spam.",
    ],
  },
  {
    id: "e-delivery",
    name: "Delivery Rate",
    category: "Email",
    definition:
      "The percentage of emails successfully delivered to inboxes.",
    formula: "(Emails delivered / Emails sent) x 100",
    benchmarkLow: 95,
    benchmarkHigh: 99,
    unit: "%",
    tips: [
      "Clean your list regularly to remove invalid addresses.",
      "Authenticate your domain with SPF, DKIM, and DMARC.",
      "Monitor your sender reputation across major ISPs.",
    ],
  },
  {
    id: "e-listgrowth",
    name: "List Growth Rate",
    category: "Email",
    definition:
      "The net rate at which your email list is growing.",
    formula: "((New subscribers - Unsubscribes) / Total list size) x 100",
    benchmarkLow: 2,
    benchmarkHigh: 5,
    unit: "%",
    tips: [
      "Add lead magnets to high-traffic pages.",
      "Use exit-intent popups with a compelling offer.",
      "Promote your newsletter on social media and in blog posts.",
    ],
  },
  {
    id: "e-revenue",
    name: "Revenue per Email",
    category: "Email",
    definition:
      "The average revenue generated per email sent.",
    formula: "Total email revenue / Total emails sent",
    benchmarkLow: 0.05,
    benchmarkHigh: 0.25,
    unit: "$",
    tips: [
      "Segment campaigns by purchase history and interests.",
      "Use dynamic product recommendations in emails.",
      "Set up automated abandoned cart and post-purchase sequences.",
    ],
  },
  {
    id: "e-bounce",
    name: "Email Bounce Rate",
    category: "Email",
    definition:
      "The percentage of emails that were not delivered.",
    formula: "(Bounced emails / Emails sent) x 100",
    benchmarkLow: 0.5,
    benchmarkHigh: 2,
    unit: "%",
    tips: [
      "Use double opt-in to verify email addresses at signup.",
      "Remove hard bounces from your list immediately.",
      "Avoid purchasing email lists with low-quality addresses.",
    ],
  },

  // ---- Social Media (7) ----
  {
    id: "sm-engagement",
    name: "Engagement Rate",
    category: "Social Media",
    definition:
      "The percentage of your audience that interacts with your content.",
    formula: "(Total engagements / Total followers) x 100",
    benchmarkLow: 1,
    benchmarkHigh: 5,
    unit: "%",
    tips: [
      "Post at times when your audience is most active.",
      "Ask questions and use polls to encourage interaction.",
      "Respond to every comment to build community.",
    ],
  },
  {
    id: "sm-followers",
    name: "Follower Growth Rate",
    category: "Social Media",
    definition:
      "The rate at which your follower count is increasing.",
    formula: "((New followers - Lost followers) / Starting followers) x 100",
    benchmarkLow: 1,
    benchmarkHigh: 5,
    unit: "%",
    tips: [
      "Post consistently and maintain a content calendar.",
      "Collaborate with influencers or complementary brands.",
      "Run targeted ad campaigns optimized for follower growth.",
    ],
  },
  {
    id: "sm-reach",
    name: "Reach",
    category: "Social Media",
    definition:
      "The number of unique users who see your content.",
    formula: "Unique users who viewed content",
    benchmarkLow: 500,
    benchmarkHigh: 5000,
    unit: "#",
    tips: [
      "Use relevant hashtags to extend visibility beyond followers.",
      "Share content when your audience is online.",
      "Encourage followers to share your content with their networks.",
    ],
  },
  {
    id: "sm-impressions",
    name: "Impressions",
    category: "Social Media",
    definition:
      "The total number of times your content is displayed.",
    formula: "Total content displays (including repeats)",
    benchmarkLow: 1000,
    benchmarkHigh: 10000,
    unit: "#",
    tips: [
      "Increase posting frequency to generate more impressions.",
      "Repurpose top-performing content in different formats.",
      "Boost high-performing organic posts with paid promotion.",
    ],
  },
  {
    id: "sm-share",
    name: "Share / Save Rate",
    category: "Social Media",
    definition:
      "The percentage of viewers who share or save your content.",
    formula: "(Shares + Saves) / Total impressions x 100",
    benchmarkLow: 0.5,
    benchmarkHigh: 3,
    unit: "%",
    tips: [
      "Create educational or inspirational content worth saving.",
      "Design visually appealing graphics and infographics.",
      "Include a clear call to action to share the post.",
    ],
  },
  {
    id: "sm-comment",
    name: "Comment Rate",
    category: "Social Media",
    definition:
      "The percentage of viewers who leave a comment.",
    formula: "(Comments / Total impressions) x 100",
    benchmarkLow: 0.1,
    benchmarkHigh: 1,
    unit: "%",
    tips: [
      "End captions with a question to spark discussion.",
      "Share opinions or hot takes to invite debate.",
      "Reply to comments quickly to keep the conversation going.",
    ],
  },
  {
    id: "sm-ctr",
    name: "Click-Through Rate",
    category: "Social Media",
    definition:
      "The percentage of users who click a link in your social post.",
    formula: "(Link clicks / Impressions) x 100",
    benchmarkLow: 0.5,
    benchmarkHigh: 3,
    unit: "%",
    tips: [
      "Write compelling captions that tease the linked content.",
      "Use a clear and action-oriented CTA.",
      "Test different link placements in stories, bios, and posts.",
    ],
  },

  // ---- Paid Advertising (7) ----
  {
    id: "pa-ctr",
    name: "CTR (Paid)",
    category: "Paid Advertising",
    definition:
      "The percentage of ad impressions that result in a click.",
    formula: "(Clicks / Impressions) x 100",
    benchmarkLow: 2,
    benchmarkHigh: 5,
    unit: "%",
    tips: [
      "Write ad copy that directly addresses the searcher's intent.",
      "Use ad extensions to increase your ad's real estate.",
      "Test multiple headlines and descriptions to find winners.",
    ],
  },
  {
    id: "pa-cpc",
    name: "Cost per Click (CPC)",
    category: "Paid Advertising",
    definition:
      "The average amount you pay for each ad click.",
    formula: "Total ad spend / Total clicks",
    benchmarkLow: 0.5,
    benchmarkHigh: 3,
    unit: "$",
    tips: [
      "Improve quality score to lower your cost per click.",
      "Use negative keywords to filter out irrelevant traffic.",
      "Bid on long-tail keywords with lower competition.",
    ],
  },
  {
    id: "pa-cpm",
    name: "Cost per Mille (CPM)",
    category: "Paid Advertising",
    definition:
      "The cost for every 1,000 ad impressions.",
    formula: "(Total ad spend / Total impressions) x 1,000",
    benchmarkLow: 3,
    benchmarkHigh: 15,
    unit: "$",
    tips: [
      "Narrow your audience to reduce wasted impressions.",
      "Test different placements and ad formats.",
      "Improve ad relevance score to get lower CPMs.",
    ],
  },
  {
    id: "pa-roas",
    name: "ROAS",
    category: "Paid Advertising",
    definition:
      "Return on ad spend: revenue generated per dollar spent on ads.",
    formula: "Revenue from ads / Ad spend",
    benchmarkLow: 3,
    benchmarkHigh: 8,
    unit: "x",
    tips: [
      "Focus budget on your highest-converting campaigns.",
      "Optimize landing pages to improve post-click conversion.",
      "Use retargeting to recapture warm audiences at lower cost.",
    ],
  },
  {
    id: "pa-quality",
    name: "Quality Score",
    category: "Paid Advertising",
    definition:
      "Google's rating of your ad relevance and landing page experience (1-10).",
    formula: "Weighted composite of CTR, ad relevance, and landing page experience",
    benchmarkLow: 5,
    benchmarkHigh: 8,
    unit: "score",
    tips: [
      "Align ad copy closely with the target keyword.",
      "Ensure landing pages load fast and match ad promises.",
      "Improve expected CTR by testing more compelling ad copy.",
    ],
  },
  {
    id: "pa-impshare",
    name: "Impression Share",
    category: "Paid Advertising",
    definition:
      "The percentage of total eligible impressions your ads receive.",
    formula: "(Impressions received / Total eligible impressions) x 100",
    benchmarkLow: 40,
    benchmarkHigh: 80,
    unit: "%",
    tips: [
      "Increase bids or budget to capture more eligible impressions.",
      "Improve quality score to win more ad auctions.",
      "Reduce keyword scope to focus on your most profitable terms.",
    ],
  },
  {
    id: "pa-conversion",
    name: "Conversion Rate (Paid)",
    category: "Paid Advertising",
    definition:
      "The percentage of ad clicks that result in a conversion.",
    formula: "(Conversions / Clicks) x 100",
    benchmarkLow: 3,
    benchmarkHigh: 8,
    unit: "%",
    tips: [
      "Match landing page messaging to ad copy for consistency.",
      "Reduce friction by simplifying forms and checkout flows.",
      "Use social proof and urgency on landing pages.",
    ],
  },

  // ---- Content (7) ----
  {
    id: "c-time",
    name: "Time on Page",
    category: "Content",
    definition:
      "The average time visitors spend reading a specific page.",
    formula: "Total time on page / Total pageviews",
    benchmarkLow: 90,
    benchmarkHigh: 240,
    unit: "s",
    tips: [
      "Write in-depth, well-structured content with clear headings.",
      "Use images, charts, and videos to break up text.",
      "Hook readers in the introduction to keep them reading.",
    ],
  },
  {
    id: "c-shares",
    name: "Social Shares",
    category: "Content",
    definition:
      "The number of times your content is shared on social media.",
    formula: "Total shares across all social platforms",
    benchmarkLow: 10,
    benchmarkHigh: 100,
    unit: "#",
    tips: [
      "Add prominent social sharing buttons on every article.",
      "Create quotable statistics and takeaways.",
      "Publish content on trending or emotionally resonant topics.",
    ],
  },
  {
    id: "c-backlinks",
    name: "Backlinks Earned",
    category: "Content",
    definition:
      "The number of external links your content earns from other sites.",
    formula: "New referring domains pointing to the content",
    benchmarkLow: 2,
    benchmarkHigh: 20,
    unit: "#",
    tips: [
      "Publish original data, research, or comprehensive guides.",
      "Promote new content to journalists and bloggers.",
      "Create free tools or templates others want to reference.",
    ],
  },
  {
    id: "c-organic",
    name: "Organic Traffic (Content)",
    category: "Content",
    definition:
      "The number of organic search visitors a piece of content receives.",
    formula: "Monthly organic sessions to the content URL",
    benchmarkLow: 100,
    benchmarkHigh: 1000,
    unit: "#",
    tips: [
      "Optimize content for a primary keyword and related terms.",
      "Update content regularly to maintain freshness signals.",
      "Build internal links from high-authority pages to the content.",
    ],
  },
  {
    id: "c-leads",
    name: "Lead Generation",
    category: "Content",
    definition:
      "The number of leads generated by a piece of content.",
    formula: "Form submissions or gated downloads from the content",
    benchmarkLow: 5,
    benchmarkHigh: 30,
    unit: "#",
    tips: [
      "Add contextual CTAs and lead magnets within the content.",
      "Use content upgrades specific to the article topic.",
      "Gate high-value assets like whitepapers and templates.",
    ],
  },
  {
    id: "c-roi",
    name: "Content ROI",
    category: "Content",
    definition:
      "The return on investment for your content marketing efforts.",
    formula: "((Revenue from content - Content cost) / Content cost) x 100",
    benchmarkLow: 100,
    benchmarkHigh: 400,
    unit: "%",
    tips: [
      "Track attribution from content to conversions end to end.",
      "Repurpose content across channels to maximize its value.",
      "Focus production on topics with proven conversion potential.",
    ],
  },
  {
    id: "c-pa",
    name: "Page Authority",
    category: "Content",
    definition:
      "A score predicting how well a specific page will rank (0-100).",
    formula: "Proprietary score based on backlinks and engagement signals",
    benchmarkLow: 15,
    benchmarkHigh: 40,
    unit: "score",
    tips: [
      "Build high-quality backlinks to the specific page.",
      "Internal link from your strongest pages to boost authority.",
      "Update the content to keep it current and comprehensive.",
    ],
  },

  // ---- E-Commerce (7) ----
  {
    id: "ec-cart",
    name: "Cart Abandonment Rate",
    category: "E-Commerce",
    definition:
      "The percentage of shoppers who add items to their cart but do not complete the purchase.",
    formula: "(Abandoned carts / Total carts created) x 100",
    benchmarkLow: 55,
    benchmarkHigh: 75,
    unit: "%",
    tips: [
      "Send abandoned cart email sequences within 1 hour.",
      "Simplify checkout by reducing the number of steps.",
      "Show transparent pricing with no surprise fees at checkout.",
    ],
  },
  {
    id: "ec-aov",
    name: "Average Order Value (AOV)",
    category: "E-Commerce",
    definition:
      "The average dollar amount spent per order.",
    formula: "Total revenue / Total orders",
    benchmarkLow: 50,
    benchmarkHigh: 150,
    unit: "$",
    tips: [
      "Use upsells and cross-sells on product and cart pages.",
      "Offer free shipping thresholds slightly above current AOV.",
      "Bundle related products at a slight discount.",
    ],
  },
  {
    id: "ec-clv",
    name: "Customer Lifetime Value (CLV)",
    category: "E-Commerce",
    definition:
      "The total revenue you can expect from a customer over their entire relationship.",
    formula: "Average order value x Purchase frequency x Customer lifespan",
    benchmarkLow: 200,
    benchmarkHigh: 1000,
    unit: "$",
    tips: [
      "Build a loyalty or rewards program to increase repeat purchases.",
      "Invest in post-purchase email nurture sequences.",
      "Focus on customer satisfaction to extend average lifespan.",
    ],
  },
  {
    id: "ec-repeat",
    name: "Repeat Purchase Rate",
    category: "E-Commerce",
    definition:
      "The percentage of customers who make more than one purchase.",
    formula: "(Customers with 2+ orders / Total customers) x 100",
    benchmarkLow: 20,
    benchmarkHigh: 40,
    unit: "%",
    tips: [
      "Send personalized product recommendations based on purchase history.",
      "Create subscription or auto-replenishment options.",
      "Follow up after purchase with a thank-you and exclusive offer.",
    ],
  },
  {
    id: "ec-conversion",
    name: "Conversion Rate (E-Commerce)",
    category: "E-Commerce",
    definition:
      "The percentage of visitors who complete a purchase.",
    formula: "(Orders / Total visitors) x 100",
    benchmarkLow: 1.5,
    benchmarkHigh: 4,
    unit: "%",
    tips: [
      "Optimize product pages with high-quality images and reviews.",
      "Offer multiple payment options including digital wallets.",
      "Display trust badges and clear return policies.",
    ],
  },
  {
    id: "ec-rpv",
    name: "Revenue per Visitor",
    category: "E-Commerce",
    definition:
      "The average revenue generated per website visitor.",
    formula: "Total revenue / Total visitors",
    benchmarkLow: 1,
    benchmarkHigh: 5,
    unit: "$",
    tips: [
      "Increase conversion rate and average order value simultaneously.",
      "Personalize the shopping experience based on visitor behavior.",
      "Reduce bounce rate by improving page load times and UX.",
    ],
  },
  {
    id: "ec-refund",
    name: "Refund Rate",
    category: "E-Commerce",
    definition:
      "The percentage of orders that result in a refund.",
    formula: "(Refunded orders / Total orders) x 100",
    benchmarkLow: 2,
    benchmarkHigh: 8,
    unit: "%",
    tips: [
      "Provide accurate product descriptions and sizing guides.",
      "Include multiple product photos and customer review photos.",
      "Offer easy exchanges as an alternative to refunds.",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

/** Metrics where being below the benchmark range is actually good */
const LOWER_IS_BETTER = new Set([
  "w-bounce",
  "w-speed",
  "w-exit",
  "e-unsub",
  "e-bounce",
  "pa-cpc",
  "pa-cpm",
  "ec-cart",
  "ec-refund",
]);

function getStatus(metric: Metric, value: number): Status {
  const lowerBetter = LOWER_IS_BETTER.has(metric.id);
  if (lowerBetter) {
    if (value < metric.benchmarkLow) return "Above";
    if (value > metric.benchmarkHigh) return "Below";
    return "Average";
  }
  if (value < metric.benchmarkLow) return "Below";
  if (value > metric.benchmarkHigh) return "Above";
  return "Average";
}

function statusLabel(s: Status): string {
  switch (s) {
    case "Below":
      return "Below Benchmark";
    case "Average":
      return "Within Benchmark";
    case "Above":
      return "Above Benchmark";
  }
}

function statusColor(s: Status): string {
  switch (s) {
    case "Below":
      return "bg-neutral-900 text-white";
    case "Average":
      return "bg-neutral-300 text-black";
    case "Above":
      return "bg-neutral-100 text-black border border-black";
  }
}

function formatUnit(value: number, unit: Metric["unit"]): string {
  switch (unit) {
    case "%":
      return `${value}%`;
    case "$":
      return `$${value}`;
    case "s":
      return `${value}s`;
    case "ms":
      return `${value}ms`;
    case "x":
      return `${value}x`;
    case "#":
      return `${value}`;
    case "score":
      return `${value}`;
  }
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function MarketingMetricsBenchmarkPage() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");
  const [search, setSearch] = useState("");
  const [expandedMetric, setExpandedMetric] = useState<string | null>(null);

  const updateValue = useCallback((id: string, val: string) => {
    setValues((prev) => ({ ...prev, [id]: val }));
  }, []);

  /* Filter + search */
  const filtered = useMemo(() => {
    let result = METRICS;
    if (activeCategory !== "All") {
      result = result.filter((m) => m.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.definition.toLowerCase().includes(q) ||
          m.category.toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeCategory, search]);

  /* Scorecard */
  const scorecard = useMemo(() => {
    let entered = 0;
    let atOrAbove = 0;
    for (const m of METRICS) {
      const raw = values[m.id];
      if (raw !== undefined && raw !== "") {
        const v = parseFloat(raw);
        if (!isNaN(v)) {
          entered++;
          const status = getStatus(m, v);
          if (status === "Average" || status === "Above") {
            atOrAbove++;
          }
        }
      }
    }
    return { entered, atOrAbove, pct: entered > 0 ? Math.round((atOrAbove / entered) * 100) : 0 };
  }, [values]);

  /* Export as .txt */
  const handleExport = useCallback(() => {
    const lines: string[] = [
      "MARKETING METRICS BENCHMARK COMPARISON",
      `Generated: ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`,
      `Source: Markit Media (themarkitmedia.com)`,
      "",
      `OVERALL SCORECARD: ${scorecard.atOrAbove} of ${scorecard.entered} metrics at or above benchmark (${scorecard.pct}%)`,
      "",
      "=".repeat(72),
      "",
    ];

    for (const cat of CATEGORIES) {
      const catMetrics = METRICS.filter((m) => m.category === cat);
      const catHasValues = catMetrics.some(
        (m) => values[m.id] !== undefined && values[m.id] !== ""
      );
      if (!catHasValues) continue;

      lines.push(cat.toUpperCase());
      lines.push("-".repeat(40));

      for (const m of catMetrics) {
        const raw = values[m.id];
        if (raw === undefined || raw === "") continue;
        const v = parseFloat(raw);
        if (isNaN(v)) continue;
        const status = getStatus(m, v);
        lines.push(
          `  ${m.name}: ${formatUnit(v, m.unit)} | Benchmark: ${formatUnit(m.benchmarkLow, m.unit)} - ${formatUnit(m.benchmarkHigh, m.unit)} | ${statusLabel(status)}`
        );
      }
      lines.push("");
    }

    lines.push("=".repeat(72));
    lines.push("");
    lines.push(
      "Benchmarks are based on aggregated industry averages from multiple sources."
    );
    lines.push(
      "Actual performance varies by industry, market, and business maturity."
    );

    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "marketing-metrics-benchmark.txt";
    a.click();
    URL.revokeObjectURL(url);
  }, [values, scorecard]);

  return (
    <article className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Marketing Metrics Benchmark Tool" },
        ]}
      />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-16 pb-8">
        <div className="max-w-5xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Interactive Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Marketing Metrics Benchmark Tool
            </h1>
            <SectionDesc>
              Compare your marketing performance against industry benchmarks
              across 50+ metrics. Enter your values, see where you stand, and
              get actionable optimization tips for every metric.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* Scorecard */}
      <section className="px-6 lg:px-12 py-6">
        <div className="max-w-5xl mx-auto">
          <Animate animation="fade-up" delay={100}>
            <div className="border border-black p-6 md:p-8">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-4">
                Your Benchmark Scorecard
              </h2>
              {scorecard.entered === 0 ? (
                <p className="text-base text-neutral-500">
                  Enter your metric values below to see your overall benchmark
                  score. The scorecard updates automatically as you fill in
                  data.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <p className="text-base text-neutral-500 mb-1">
                      Metrics Entered
                    </p>
                    <p className="text-3xl font-extrabold text-black font-[family-name:var(--font-display)]">
                      {scorecard.entered}
                      <span className="text-lg text-neutral-400 font-normal">
                        {" "}
                        / {METRICS.length}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="text-base text-neutral-500 mb-1">
                      At or Above Benchmark
                    </p>
                    <p className="text-3xl font-extrabold text-black font-[family-name:var(--font-display)]">
                      {scorecard.atOrAbove}
                    </p>
                  </div>
                  <div>
                    <p className="text-base text-neutral-500 mb-1">
                      Benchmark Score
                    </p>
                    <p className="text-3xl font-extrabold text-black font-[family-name:var(--font-display)]">
                      {scorecard.pct}%
                    </p>
                  </div>
                </div>
              )}
              {scorecard.entered > 0 && (
                <div className="mt-6">
                  <button
                    onClick={handleExport}
                    className="inline-flex items-center gap-2 border border-black px-5 py-2.5 text-base font-bold text-black hover:bg-black hover:text-white transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                  >
                    Export Comparison (.txt)
                  </button>
                </div>
              )}
            </div>
          </Animate>
        </div>
      </section>

      {/* Filters */}
      <section className="px-6 lg:px-12 py-6">
        <div className="max-w-5xl mx-auto">
          <Animate animation="fade-up" delay={200}>
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
              {/* Search */}
              <div className="w-full md:w-80">
                <label
                  htmlFor="metric-search"
                  className="block text-base font-bold text-black mb-2"
                >
                  Search Metrics
                </label>
                <input
                  id="metric-search"
                  type="text"
                  placeholder="Search by name or keyword..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full border border-neutral-300 px-4 py-2.5 text-base text-black placeholder:text-neutral-400 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                />
              </div>

              {/* Category filter */}
              <div className="w-full md:flex-1">
                <fieldset>
                  <legend className="block text-base font-bold text-black mb-2">
                    Filter by Category
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {(["All", ...CATEGORIES] as const).map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-3 py-1.5 text-base font-medium border transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                          activeCategory === cat
                            ? "bg-black text-white border-black"
                            : "bg-white text-black border-neutral-300 hover:border-black"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </fieldset>
              </div>
            </div>
          </Animate>
        </div>
      </section>

      {/* Metrics list */}
      <section className="px-6 lg:px-12 py-6" aria-label="Metrics list">
        <div className="max-w-5xl mx-auto space-y-4">
          {filtered.length === 0 && (
            <p className="text-base text-neutral-500 py-8 text-center">
              No metrics match your search. Try a different keyword or clear
              the filter.
            </p>
          )}
          {filtered.map((metric) => {
            const raw = values[metric.id];
            const hasValue = raw !== undefined && raw !== "";
            const numValue = hasValue ? parseFloat(raw) : NaN;
            const status = hasValue && !isNaN(numValue) ? getStatus(metric, numValue) : null;
            const isExpanded = expandedMetric === metric.id;

            return (
              <div
                key={metric.id}
                className="border border-neutral-200 hover:border-neutral-400 transition-colors motion-reduce:transition-none"
              >
                {/* Metric header */}
                <div className="p-4 md:p-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {/* Name + category */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black">
                          {metric.name}
                        </h3>
                        <span className="text-base text-neutral-500">
                          {metric.category}
                        </span>
                      </div>
                      <p className="text-base text-neutral-600 mt-1">
                        {metric.definition}
                      </p>
                    </div>

                    {/* Input + benchmark + status */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
                      <div className="w-36">
                        <label
                          htmlFor={`input-${metric.id}`}
                          className="sr-only"
                        >
                          Your value for {metric.name}
                        </label>
                        <div className="relative">
                          <input
                            id={`input-${metric.id}`}
                            type="number"
                            step="any"
                            placeholder="Your value"
                            value={raw ?? ""}
                            onChange={(e) =>
                              updateValue(metric.id, e.target.value)
                            }
                            className="w-full border border-neutral-300 px-3 py-2 text-base text-black placeholder:text-neutral-400 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                          />
                          {metric.unit !== "#" && metric.unit !== "score" && (
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-base text-neutral-400 pointer-events-none">
                              {metric.unit === "%" && "%"}
                              {metric.unit === "$" && "$"}
                              {metric.unit === "s" && "s"}
                              {metric.unit === "ms" && "ms"}
                              {metric.unit === "x" && "x"}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="text-base text-neutral-500 whitespace-nowrap">
                        Benchmark: {formatUnit(metric.benchmarkLow, metric.unit)}{" "}
                        &ndash; {formatUnit(metric.benchmarkHigh, metric.unit)}
                      </div>

                      {status && (
                        <span
                          className={`inline-block px-3 py-1 text-base font-bold whitespace-nowrap ${statusColor(status)}`}
                        >
                          {statusLabel(status)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Expand toggle */}
                  <button
                    onClick={() =>
                      setExpandedMetric(isExpanded ? null : metric.id)
                    }
                    aria-expanded={isExpanded}
                    className="mt-3 text-base font-bold text-black underline underline-offset-4 hover:no-underline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                  >
                    {isExpanded ? "Hide details" : "Show formula & tips"}
                  </button>
                </div>

                {/* Expanded details */}
                {isExpanded && (
                  <div className="border-t border-neutral-200 p-4 md:p-6 bg-neutral-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-base font-bold text-black mb-1">
                          Formula
                        </p>
                        <p className="text-base text-neutral-700 font-mono bg-white border border-neutral-200 px-3 py-2">
                          {metric.formula}
                        </p>
                      </div>
                      <div>
                        <p className="text-base font-bold text-black mb-2">
                          Optimization Tips
                        </p>
                        <ul className="space-y-1.5">
                          {metric.tips.map((tip, i) => (
                            <li
                              key={i}
                              className="text-base text-neutral-700 flex gap-2"
                            >
                              <span
                                className="text-black font-bold shrink-0"
                                aria-hidden="true"
                              >
                                &bull;
                              </span>
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Methodology */}
      <section className="px-6 lg:px-12 py-16">
        <div className="max-w-5xl mx-auto">
          <Animate animation="fade-up">
            <div className="border-t border-neutral-200 pt-12">
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black tracking-tight mb-6">
                About Our Benchmarking Methodology
              </h2>
              <div className="space-y-4 text-base text-neutral-700 leading-relaxed max-w-3xl">
                <p>
                  The benchmarks in this tool are aggregated from multiple
                  reputable sources including Google Analytics aggregate data,
                  HubSpot annual reports, Mailchimp email benchmarks, Hootsuite
                  social media studies, and WordStream advertising benchmarks.
                  They represent cross-industry medians and are updated
                  periodically to reflect current trends.
                </p>
                <p>
                  <strong className="text-black">
                    Benchmark ranges, not single numbers.
                  </strong>{" "}
                  We show ranges rather than exact averages because performance
                  varies significantly by industry, business size, market
                  maturity, and geographic region. A metric within the benchmark
                  range is generally performing at an acceptable level, while
                  values outside the range indicate an area that may need
                  attention or one where you are outperforming peers.
                </p>
                <p>
                  <strong className="text-black">
                    Lower is not always worse.
                  </strong>{" "}
                  For metrics like bounce rate, CPC, cart abandonment, and refund
                  rate, being below the benchmark range is actually a positive
                  signal. This tool automatically accounts for these inverted
                  metrics when calculating your status.
                </p>
                <p>
                  <strong className="text-black">Context matters.</strong>{" "}
                  Benchmarks are a starting point, not a verdict. A brand-new
                  website will naturally have different metrics than an
                  established enterprise site. Use these benchmarks to identify
                  directional opportunities and prioritize your marketing
                  efforts.
                </p>
              </div>
            </div>
          </Animate>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-12 py-16 bg-black">
        <div className="max-w-3xl mx-auto text-center">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2.25rem)] font-extrabold text-white tracking-tight mb-4">
              Need Help Improving Your Metrics?
            </h2>
            <p className="text-base text-neutral-400 leading-relaxed mb-8 max-w-xl mx-auto">
              Our team specializes in data-driven marketing strategies that move
              the metrics that matter. Let us audit your current performance and
              build a plan to hit your benchmarks.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-black px-8 py-3 text-base font-bold hover:bg-neutral-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              Get a Free Consultation
            </Link>
          </Animate>
        </div>
      </section>
          <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Marketing Metrics Benchmark Tool",
          description: "Compare your marketing metrics against industry benchmarks. Explore 50+ metrics with definitions, formulas, benchmarks, and optimization tips.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />
    </article>
  );
}
