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

interface QuizOption {
  label: string;
  value: string;
}

interface QuizStep {
  id: string;
  question: string;
  options: QuizOption[];
}

interface ChannelRecommendation {
  name: string;
  priority: "High" | "Medium" | "Low";
  reason: string;
  timeline: string;
  budgetPct: number;
}

interface ChannelAvoid {
  name: string;
  reason: string;
}

interface RoadmapPhase {
  label: string;
  items: string[];
}

interface Results {
  recommended: ChannelRecommendation[];
  avoid: ChannelAvoid[];
  roadmap: RoadmapPhase[];
}

type AnswerMap = Record<string, string>;

/* ------------------------------------------------------------------ */
/*  Quiz steps                                                         */
/* ------------------------------------------------------------------ */

const steps: QuizStep[] = [
  {
    id: "businessType",
    question: "What is your business type?",
    options: [
      { label: "B2B", value: "b2b" },
      { label: "B2C", value: "b2c" },
      { label: "D2C", value: "d2c" },
      { label: "B2B2C", value: "b2b2c" },
      { label: "Marketplace", value: "marketplace" },
    ],
  },
  {
    id: "goal",
    question: "What is your primary goal?",
    options: [
      { label: "Lead Generation", value: "leads" },
      { label: "E-commerce Sales", value: "ecommerce" },
      { label: "Brand Awareness", value: "awareness" },
      { label: "App Downloads", value: "app" },
      { label: "Local Foot Traffic", value: "local" },
      { label: "Thought Leadership", value: "thought" },
    ],
  },
  {
    id: "budget",
    question: "What is your monthly marketing budget?",
    options: [
      { label: "Under $2K", value: "under2k" },
      { label: "$2K - $5K", value: "2k5k" },
      { label: "$5K - $15K", value: "5k15k" },
      { label: "$15K - $50K", value: "15k50k" },
      { label: "$50K+", value: "50kplus" },
    ],
  },
  {
    id: "salesCycle",
    question: "How long is your typical sales cycle?",
    options: [
      { label: "Same Day", value: "sameday" },
      { label: "1-2 Weeks", value: "1to2weeks" },
      { label: "1-3 Months", value: "1to3months" },
      { label: "3-6 Months", value: "3to6months" },
      { label: "6+ Months", value: "6plusmonths" },
    ],
  },
  {
    id: "presence",
    question: "What is your current digital presence?",
    options: [
      { label: "Just Starting", value: "starting" },
      { label: "Basic Website", value: "basic" },
      { label: "Active Website + Social", value: "active" },
      { label: "Established with Some Paid", value: "established" },
      { label: "Mature Multi-Channel", value: "mature" },
    ],
  },
  {
    id: "age",
    question: "What is your target audience age group?",
    options: [
      { label: "18-24", value: "18to24" },
      { label: "25-34", value: "25to34" },
      { label: "35-44", value: "35to44" },
      { label: "45-54", value: "45to54" },
      { label: "55+", value: "55plus" },
      { label: "Mixed / All Ages", value: "mixed" },
    ],
  },
  {
    id: "content",
    question: "What is your content creation capacity?",
    options: [
      { label: "None (Need Help)", value: "none" },
      { label: "Some In-House", value: "some" },
      { label: "Strong In-House", value: "strong" },
      { label: "Full Creative Team", value: "full" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Channel scoring engine                                             */
/* ------------------------------------------------------------------ */

type ChannelKey =
  | "googleAds"
  | "metaAds"
  | "linkedinAds"
  | "tiktokAds"
  | "seo"
  | "contentMarketing"
  | "emailMarketing"
  | "socialOrganic"
  | "youtube"
  | "influencer"
  | "programmatic"
  | "localSeo"
  | "affiliate";

const channelNames: Record<ChannelKey, string> = {
  googleAds: "Google Ads",
  metaAds: "Meta Ads (Facebook/Instagram)",
  linkedinAds: "LinkedIn Ads",
  tiktokAds: "TikTok Ads",
  seo: "SEO",
  contentMarketing: "Content Marketing",
  emailMarketing: "Email Marketing",
  socialOrganic: "Social Media Organic",
  youtube: "YouTube",
  influencer: "Influencer Marketing",
  programmatic: "Programmatic Display",
  localSeo: "Local SEO",
  affiliate: "Affiliate Marketing",
};

const channelTimelines: Record<ChannelKey, string> = {
  googleAds: "1-2 weeks for initial traffic; 2-3 months to optimize",
  metaAds: "1-2 weeks for initial results; 1-2 months to optimize",
  linkedinAds: "2-4 weeks for initial leads; 3-4 months to optimize",
  tiktokAds: "1-2 weeks for reach; 1-2 months to find winning creative",
  seo: "3-6 months for meaningful organic traffic growth",
  contentMarketing: "3-6 months to build authority and consistent traffic",
  emailMarketing: "2-4 weeks for first campaigns; ongoing list growth",
  socialOrganic: "2-3 months for community traction; 6+ months for scale",
  youtube: "3-6 months for channel growth; ongoing compounding returns",
  influencer: "1-2 months for campaign setup and initial reach",
  programmatic: "2-4 weeks for initial reach; 2-3 months to optimize",
  localSeo: "2-4 months for local pack visibility improvements",
  affiliate: "2-3 months to recruit partners; 3-6 months for volume",
};

function scoreChannels(answers: AnswerMap): Record<ChannelKey, number> {
  const scores: Record<ChannelKey, number> = {
    googleAds: 0,
    metaAds: 0,
    linkedinAds: 0,
    tiktokAds: 0,
    seo: 0,
    contentMarketing: 0,
    emailMarketing: 0,
    socialOrganic: 0,
    youtube: 0,
    influencer: 0,
    programmatic: 0,
    localSeo: 0,
    affiliate: 0,
  };

  const bt = answers.businessType;
  const goal = answers.goal;
  const budget = answers.budget;
  const cycle = answers.salesCycle;
  const presence = answers.presence;
  const age = answers.age;
  const content = answers.content;

  /* --- Business Type --- */
  if (bt === "b2b") {
    scores.googleAds += 3;
    scores.linkedinAds += 4;
    scores.seo += 3;
    scores.contentMarketing += 4;
    scores.emailMarketing += 4;
    scores.tiktokAds -= 2;
    scores.influencer -= 1;
  } else if (bt === "b2c") {
    scores.metaAds += 4;
    scores.googleAds += 3;
    scores.tiktokAds += 3;
    scores.socialOrganic += 3;
    scores.influencer += 3;
    scores.linkedinAds -= 2;
  } else if (bt === "d2c") {
    scores.metaAds += 4;
    scores.googleAds += 3;
    scores.tiktokAds += 3;
    scores.emailMarketing += 4;
    scores.influencer += 3;
    scores.affiliate += 3;
    scores.linkedinAds -= 2;
  } else if (bt === "b2b2c") {
    scores.googleAds += 3;
    scores.metaAds += 3;
    scores.linkedinAds += 2;
    scores.contentMarketing += 3;
    scores.emailMarketing += 3;
    scores.seo += 3;
  } else if (bt === "marketplace") {
    scores.googleAds += 3;
    scores.metaAds += 4;
    scores.seo += 4;
    scores.affiliate += 3;
    scores.socialOrganic += 2;
    scores.programmatic += 2;
  }

  /* --- Primary Goal --- */
  if (goal === "leads") {
    scores.googleAds += 4;
    scores.linkedinAds += 3;
    scores.seo += 3;
    scores.emailMarketing += 3;
    scores.contentMarketing += 3;
  } else if (goal === "ecommerce") {
    scores.googleAds += 4;
    scores.metaAds += 4;
    scores.seo += 3;
    scores.emailMarketing += 3;
    scores.affiliate += 3;
    scores.tiktokAds += 2;
  } else if (goal === "awareness") {
    scores.metaAds += 4;
    scores.tiktokAds += 3;
    scores.youtube += 4;
    scores.socialOrganic += 3;
    scores.influencer += 4;
    scores.programmatic += 3;
    scores.contentMarketing += 3;
  } else if (goal === "app") {
    scores.googleAds += 3;
    scores.metaAds += 4;
    scores.tiktokAds += 4;
    scores.influencer += 3;
    scores.youtube += 2;
  } else if (goal === "local") {
    scores.localSeo += 5;
    scores.googleAds += 4;
    scores.metaAds += 3;
    scores.socialOrganic += 3;
    scores.linkedinAds -= 2;
    scores.programmatic -= 1;
    scores.tiktokAds -= 1;
  } else if (goal === "thought") {
    scores.contentMarketing += 5;
    scores.linkedinAds += 3;
    scores.seo += 4;
    scores.youtube += 3;
    scores.socialOrganic += 3;
    scores.emailMarketing += 3;
    scores.tiktokAds -= 2;
  }

  /* --- Budget --- */
  if (budget === "under2k") {
    scores.seo += 3;
    scores.socialOrganic += 3;
    scores.emailMarketing += 3;
    scores.contentMarketing += 2;
    scores.localSeo += 2;
    scores.googleAds -= 1;
    scores.programmatic -= 3;
    scores.linkedinAds -= 2;
    scores.influencer -= 2;
  } else if (budget === "2k5k") {
    scores.googleAds += 2;
    scores.metaAds += 2;
    scores.seo += 3;
    scores.emailMarketing += 3;
    scores.socialOrganic += 2;
    scores.programmatic -= 2;
    scores.influencer -= 1;
  } else if (budget === "5k15k") {
    scores.googleAds += 3;
    scores.metaAds += 3;
    scores.seo += 2;
    scores.emailMarketing += 2;
    scores.tiktokAds += 1;
    scores.youtube += 1;
  } else if (budget === "15k50k") {
    scores.googleAds += 3;
    scores.metaAds += 3;
    scores.linkedinAds += 2;
    scores.tiktokAds += 2;
    scores.youtube += 2;
    scores.programmatic += 2;
    scores.influencer += 2;
  } else if (budget === "50kplus") {
    scores.googleAds += 3;
    scores.metaAds += 3;
    scores.linkedinAds += 3;
    scores.tiktokAds += 2;
    scores.youtube += 3;
    scores.programmatic += 3;
    scores.influencer += 3;
    scores.affiliate += 2;
  }

  /* --- Sales Cycle --- */
  if (cycle === "sameday") {
    scores.googleAds += 3;
    scores.metaAds += 3;
    scores.tiktokAds += 2;
    scores.localSeo += 2;
    scores.contentMarketing -= 1;
    scores.linkedinAds -= 1;
  } else if (cycle === "1to2weeks") {
    scores.googleAds += 3;
    scores.metaAds += 3;
    scores.emailMarketing += 2;
    scores.seo += 1;
  } else if (cycle === "1to3months") {
    scores.emailMarketing += 3;
    scores.seo += 2;
    scores.contentMarketing += 2;
    scores.googleAds += 2;
    scores.linkedinAds += 1;
  } else if (cycle === "3to6months") {
    scores.contentMarketing += 3;
    scores.emailMarketing += 3;
    scores.linkedinAds += 2;
    scores.seo += 3;
    scores.youtube += 1;
    scores.tiktokAds -= 1;
  } else if (cycle === "6plusmonths") {
    scores.contentMarketing += 4;
    scores.emailMarketing += 3;
    scores.linkedinAds += 3;
    scores.seo += 3;
    scores.youtube += 2;
    scores.tiktokAds -= 2;
    scores.metaAds -= 1;
  }

  /* --- Digital Presence --- */
  if (presence === "starting") {
    scores.seo += 2;
    scores.socialOrganic += 2;
    scores.localSeo += 2;
    scores.googleAds -= 1;
    scores.programmatic -= 2;
    scores.affiliate -= 2;
  } else if (presence === "basic") {
    scores.seo += 2;
    scores.googleAds += 1;
    scores.metaAds += 1;
    scores.socialOrganic += 2;
    scores.programmatic -= 1;
  } else if (presence === "active") {
    scores.googleAds += 2;
    scores.metaAds += 2;
    scores.emailMarketing += 2;
    scores.seo += 1;
  } else if (presence === "established") {
    scores.googleAds += 2;
    scores.metaAds += 2;
    scores.youtube += 2;
    scores.programmatic += 1;
    scores.affiliate += 1;
  } else if (presence === "mature") {
    scores.programmatic += 3;
    scores.affiliate += 2;
    scores.youtube += 2;
    scores.influencer += 2;
    scores.tiktokAds += 1;
  }

  /* --- Target Age --- */
  if (age === "18to24") {
    scores.tiktokAds += 4;
    scores.socialOrganic += 3;
    scores.influencer += 3;
    scores.youtube += 2;
    scores.metaAds += 1;
    scores.linkedinAds -= 3;
    scores.programmatic -= 1;
  } else if (age === "25to34") {
    scores.metaAds += 3;
    scores.tiktokAds += 2;
    scores.socialOrganic += 2;
    scores.influencer += 2;
    scores.youtube += 2;
    scores.googleAds += 1;
  } else if (age === "35to44") {
    scores.googleAds += 2;
    scores.metaAds += 3;
    scores.emailMarketing += 2;
    scores.seo += 1;
    scores.youtube += 1;
  } else if (age === "45to54") {
    scores.googleAds += 3;
    scores.emailMarketing += 3;
    scores.seo += 2;
    scores.metaAds += 1;
    scores.linkedinAds += 1;
    scores.tiktokAds -= 2;
    scores.influencer -= 1;
  } else if (age === "55plus") {
    scores.googleAds += 3;
    scores.emailMarketing += 3;
    scores.seo += 2;
    scores.metaAds += 1;
    scores.tiktokAds -= 3;
    scores.influencer -= 2;
    scores.socialOrganic -= 1;
  } else if (age === "mixed") {
    scores.googleAds += 2;
    scores.metaAds += 2;
    scores.seo += 2;
    scores.emailMarketing += 2;
    scores.youtube += 1;
  }

  /* --- Content Capacity --- */
  if (content === "none") {
    scores.googleAds += 2;
    scores.metaAds += 1;
    scores.localSeo += 1;
    scores.contentMarketing -= 3;
    scores.socialOrganic -= 2;
    scores.youtube -= 3;
    scores.influencer -= 1;
  } else if (content === "some") {
    scores.emailMarketing += 2;
    scores.socialOrganic += 1;
    scores.seo += 1;
    scores.googleAds += 1;
    scores.youtube -= 1;
  } else if (content === "strong") {
    scores.contentMarketing += 3;
    scores.socialOrganic += 3;
    scores.seo += 2;
    scores.emailMarketing += 2;
    scores.youtube += 2;
  } else if (content === "full") {
    scores.contentMarketing += 4;
    scores.youtube += 4;
    scores.socialOrganic += 3;
    scores.seo += 3;
    scores.influencer += 2;
    scores.tiktokAds += 2;
  }

  return scores;
}

/* ------------------------------------------------------------------ */
/*  Build results from scores                                          */
/* ------------------------------------------------------------------ */

function buildResults(answers: AnswerMap): Results {
  const scores = scoreChannels(answers);

  /* Sort channels by score descending */
  const sorted = (Object.entries(scores) as [ChannelKey, number][]).sort(
    (a, b) => b[1] - a[1]
  );

  /* Top 3 recommended */
  const top3 = sorted.slice(0, 3);
  const totalTopScore = top3.reduce((s, c) => s + Math.max(c[1], 1), 0);
  const priorities: ("High" | "Medium" | "Low")[] = ["High", "High", "Medium"];

  const recommended: ChannelRecommendation[] = top3.map(([key, score], i) => ({
    name: channelNames[key],
    priority: priorities[i],
    reason: getChannelReason(key, answers),
    timeline: channelTimelines[key],
    budgetPct: Math.round((Math.max(score, 1) / totalTopScore) * 100),
  }));

  /* Normalize budget percentages to sum to 100 */
  const pctSum = recommended.reduce((s, r) => s + r.budgetPct, 0);
  if (pctSum !== 100 && recommended.length > 0) {
    recommended[0].budgetPct += 100 - pctSum;
  }

  /* Bottom 2 to avoid */
  const bottom2 = sorted.slice(-2).reverse();
  const avoid: ChannelAvoid[] = bottom2.map(([key]) => ({
    name: channelNames[key],
    reason: getAvoidReason(key, answers),
  }));

  /* Roadmap */
  const roadmap = buildRoadmap(recommended, answers);

  return { recommended, avoid, roadmap };
}

/* ------------------------------------------------------------------ */
/*  Reason text generators                                             */
/* ------------------------------------------------------------------ */

function getChannelReason(key: ChannelKey, answers: AnswerMap): string {
  const bt = answers.businessType;
  const goal = answers.goal;

  const reasons: Record<ChannelKey, string> = {
    googleAds: `Strong intent-based channel that captures demand when prospects are actively searching. ${goal === "leads" ? "Ideal for driving qualified leads with high purchase intent." : goal === "ecommerce" ? "Proven driver of e-commerce sales through Shopping and Search campaigns." : goal === "local" ? "Local search ads put you in front of nearby customers ready to buy." : "Scalable paid channel with precise targeting and measurable ROI."}`,
    metaAds: `Powerful audience targeting across Facebook and Instagram. ${goal === "awareness" ? "Excellent for building brand recognition at scale with visual creative." : goal === "ecommerce" ? "Dynamic product ads and retargeting drive strong return on ad spend." : goal === "app" ? "App install campaigns with optimized bidding deliver cost-effective downloads." : "Broad reach with sophisticated lookalike and interest-based targeting."}`,
    linkedinAds: `The premier platform for reaching business decision-makers. ${bt === "b2b" ? "Direct access to professionals filtered by job title, company size, and industry." : "Effective for building professional credibility and generating B2B pipeline."}`,
    tiktokAds: `High-engagement short-form video platform with rapid audience growth. ${answers.age === "18to24" ? "Dominant platform for Gen Z with strong organic discovery." : "Growing user base across demographics with cost-effective CPMs."}`,
    seo: `Sustainable organic traffic that compounds over time. ${goal === "thought" ? "Positions your brand as an authority through search visibility." : "Drives ongoing qualified traffic without per-click costs."}`,
    contentMarketing: `Builds authority, trust, and organic reach through valuable content. ${answers.salesCycle === "6plusmonths" || answers.salesCycle === "3to6months" ? "Critical for nurturing prospects through a longer decision-making process." : "Creates assets that drive traffic and support every other channel."}`,
    emailMarketing: `Direct, owned channel with highest ROI across marketing. ${bt === "d2c" ? "Essential for D2C retention, repeat purchases, and lifecycle marketing." : "Nurtures leads and customers with personalized, automated communication."}`,
    socialOrganic: `Builds community and brand presence without ad spend. ${answers.content === "full" || answers.content === "strong" ? "Your content team can fuel consistent organic growth and engagement." : "Cost-effective way to maintain brand visibility and engage your audience."}`,
    youtube: `Second-largest search engine with long-form video content that compounds. ${answers.content === "full" ? "Your creative team can produce the video content needed for growth." : "Video content builds deep trust and ranks in both YouTube and Google search."}`,
    influencer: `Leverages trusted voices to reach engaged niche audiences. ${goal === "awareness" ? "Amplifies brand awareness through authentic creator partnerships." : "Drives conversions through authentic product endorsements."}`,
    programmatic: `Automated display advertising across premium publisher networks. ${answers.budget === "50kplus" || answers.budget === "15k50k" ? "Your budget supports the scale needed for efficient programmatic campaigns." : "Retargeting and awareness campaigns across thousands of websites."}`,
    localSeo: `Puts your business in Google Maps and local search results. ${goal === "local" ? "The highest-impact channel for driving nearby customers to your location." : "Improves local visibility for location-based searches."}`,
    affiliate: `Performance-based partnerships where you pay only for results. ${bt === "d2c" || bt === "marketplace" ? "Natural fit for product-based businesses with strong margins." : "Extends your reach through partner networks on a pay-for-performance basis."}`,
  };

  return reasons[key];
}

function getAvoidReason(key: ChannelKey, answers: AnswerMap): string {
  const bt = answers.businessType;
  const budget = answers.budget;
  const age = answers.age;
  const content = answers.content;

  const reasons: Record<ChannelKey, string> = {
    googleAds: budget === "under2k" ? "Limited budget may result in insufficient data for optimization." : "Other channels offer a stronger fit given your business profile.",
    metaAds: "Other channels align more closely with your audience and objectives.",
    linkedinAds: bt === "b2c" || bt === "d2c" ? "High CPCs on LinkedIn are not cost-effective for consumer-focused businesses." : budget === "under2k" ? "LinkedIn's higher minimum spend makes it impractical at this budget." : "Other channels are a better match for your goals and audience.",
    tiktokAds: age === "45to54" || age === "55plus" ? "Your target audience has limited presence on TikTok." : bt === "b2b" ? "TikTok's audience skews consumer; B2B conversions are rare here." : "Not aligned with your current business model and audience.",
    seo: "Other channels will deliver faster results for your immediate needs.",
    contentMarketing: content === "none" ? "Without content creation capacity, this channel requires outsourcing before it can work." : "Other channels offer faster returns for your current setup.",
    emailMarketing: "Other channels better match your current goals and audience.",
    socialOrganic: content === "none" ? "Organic social requires consistent content creation you do not currently have." : "Other channels offer higher impact for your specific objectives.",
    youtube: content === "none" || content === "some" ? "Video production demands exceed your current content capacity." : "Other channels are better suited to your goals right now.",
    influencer: budget === "under2k" || budget === "2k5k" ? "Budget constraints limit access to impactful influencer partnerships." : "Other channels offer more predictable ROI for your profile.",
    programmatic: budget === "under2k" || budget === "2k5k" ? "Programmatic requires significant spend to achieve meaningful reach and optimization." : "Other channels provide better targeting precision for your needs.",
    localSeo: answers.goal !== "local" ? "Your goals are not location-dependent, making local SEO low priority." : "Other channels will complement your local strategy more effectively.",
    affiliate: "Setting up and managing an affiliate program diverts focus from higher-impact channels for your profile.",
  };

  return reasons[key];
}

/* ------------------------------------------------------------------ */
/*  Roadmap builder                                                    */
/* ------------------------------------------------------------------ */

function buildRoadmap(
  recommended: ChannelRecommendation[],
  answers: AnswerMap
): RoadmapPhase[] {
  const names = recommended.map((r) => r.name);
  const presence = answers.presence;
  const content = answers.content;

  const month1: string[] = [];
  const month2to3: string[] = [];
  const month4to6: string[] = [];

  /* Month 1: Setup and launch */
  if (presence === "starting" || presence === "basic") {
    month1.push(
      "Audit your website for conversion readiness: clear CTAs, contact forms, mobile optimization"
    );
  }
  month1.push(`Set up tracking and analytics for ${names[0]} and ${names[1]}`);
  month1.push(`Launch initial ${names[0]} campaigns with a test budget`);
  if (content === "none") {
    month1.push(
      "Identify a content partner or freelancer to support your channel strategy"
    );
  } else {
    month1.push(
      "Develop initial creative assets and messaging for your top channels"
    );
  }
  month1.push("Define KPIs and set up a weekly performance dashboard");

  /* Month 2-3: Optimize and expand */
  month2to3.push(
    `Analyze ${names[0]} performance data and optimize targeting, bids, and creative`
  );
  month2to3.push(`Launch ${names[1]} campaigns and begin A/B testing`);
  if (names[2]) {
    month2to3.push(
      `Start planning ${names[2]} with initial content and audience research`
    );
  }
  month2to3.push(
    "Review cost-per-acquisition across channels and reallocate budget to top performers"
  );
  month2to3.push(
    "Build retargeting audiences from website visitors and engaged users"
  );

  /* Month 4-6: Scale and diversify */
  if (names[2]) {
    month4to6.push(
      `Scale ${names[2]} based on learnings from earlier channels`
    );
  }
  month4to6.push(
    "Double down on the highest-ROI channel with increased budget"
  );
  month4to6.push(
    "Implement cross-channel attribution to understand the full customer journey"
  );
  month4to6.push(
    "Review overall channel mix performance and adjust allocation for next quarter"
  );
  if (content !== "none") {
    month4to6.push(
      "Develop a content repurposing workflow to fuel all active channels"
    );
  }

  return [
    { label: "Month 1", items: month1 },
    { label: "Month 2-3", items: month2to3 },
    { label: "Month 4-6", items: month4to6 },
  ];
}

/* ------------------------------------------------------------------ */
/*  Format results as plain text                                       */
/* ------------------------------------------------------------------ */

function formatResultsText(results: Results): string {
  const lines: string[] = [];

  lines.push("MARKETING CHANNEL SELECTOR RESULTS");
  lines.push("=".repeat(50));
  lines.push("");

  lines.push("TOP RECOMMENDED CHANNELS");
  lines.push("-".repeat(30));
  results.recommended.forEach((ch, i) => {
    lines.push(`${i + 1}. ${ch.name} — ${ch.priority} Priority`);
    lines.push(`   ${ch.reason}`);
    lines.push(`   Timeline: ${ch.timeline}`);
    lines.push(`   Budget Allocation: ${ch.budgetPct}%`);
    lines.push("");
  });

  lines.push("CHANNELS TO AVOID");
  lines.push("-".repeat(30));
  results.avoid.forEach((ch) => {
    lines.push(`- ${ch.name}: ${ch.reason}`);
  });
  lines.push("");

  lines.push("QUICK-START ROADMAP");
  lines.push("-".repeat(30));
  results.roadmap.forEach((phase) => {
    lines.push(`${phase.label}:`);
    phase.items.forEach((item, i) => {
      lines.push(`  ${i + 1}. ${item}`);
    });
    lines.push("");
  });

  lines.push("Generated by Markit Media Marketing Channel Selector");
  lines.push("https://themarkitmedia.com/resources/channel-selector");

  return lines.join("\n");
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

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
      aria-label="Copy results to clipboard"
      className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center px-5 py-3 text-base font-bold border border-gray-200 text-gray-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
    >
      {copied ? "Copied" : "Copy Results"}
    </button>
  );
}

function DownloadButton({
  text,
  filename,
}: {
  text: string;
  filename: string;
}) {
  const download = useCallback(() => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }, [text, filename]);

  return (
    <button
      onClick={download}
      aria-label="Download results as text file"
      className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center px-5 py-3 text-base font-bold bg-black text-white hover:bg-gray-900 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
    >
      Download as Text
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default function ChannelSelectorPage() {
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const totalSteps = steps.length;
  const step = steps[currentStep];
  const currentAnswered = answers[step.id] !== undefined;
  const allAnswered = steps.every((s) => answers[s.id] !== undefined);
  const answeredCount = steps.filter((s) => answers[s.id] !== undefined).length;

  function handleSelect(value: string) {
    setAnswers((prev) => ({ ...prev, [step.id]: value }));
  }

  function handleNext() {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function handlePrev() {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function handleSubmit() {
    if (allAnswered) {
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function handleReset() {
    setAnswers({});
    setSubmitted(false);
    setCurrentStep(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const results = submitted ? buildResults(answers) : null;
  const plainText = results ? formatResultsText(results) : "";

  return (
    <article className="min-h-screen">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Marketing Channel Selector",
          description:
            "Free interactive tool that recommends the best marketing channels based on your business type, goals, budget, and audience.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />

      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Channel Selector" },
        ]}
      />

      {/* ---- Hero ---- */}
      <section aria-label="Free Tool" className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Marketing Channel Selector
            </h1>
            <SectionDesc>
              Answer 7 quick questions about your business and get a
              personalized recommendation for the best marketing channels,
              budget allocation, and a quick-start roadmap.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {!submitted ? (
        <>
          {/* ---- Progress Indicator ---- */}
          <section aria-label="Content section" className="px-6 lg:px-12 pb-6">
            <div className="max-w-3xl mx-auto">
              <Animate animation="fade-up">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-base font-bold text-black">
                    Question {currentStep + 1} of {totalSteps}
                  </p>
                  <p className="text-base text-gray-500">
                    {answeredCount} / {totalSteps} answered
                  </p>
                </div>
                <div className="w-full bg-gray-200 h-2">
                  <div
                    className="bg-black h-2 transition-all motion-reduce:transition-none"
                    style={{
                      width: `${(answeredCount / totalSteps) * 100}%`,
                    }}
                  />
                </div>

                {/* Step nav pills */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {steps.map((s, i) => {
                    const stepAnswered = answers[s.id] !== undefined;
                    return (
                      <button
                        key={s.id}
                        onClick={() => setCurrentStep(i)}
                        className={`min-h-[44px] px-4 py-2 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                          i === currentStep
                            ? "bg-black text-white"
                            : stepAnswered
                              ? "bg-gray-800 text-white"
                              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                        }`}
                      >
                        {i + 1}
                      </button>
                    );
                  })}
                </div>
              </Animate>
            </div>
          </section>

          {/* ---- Current Question ---- */}
          <section
            className="px-6 lg:px-12 py-8"
            aria-label="Quiz question"
          >
            <div className="max-w-3xl mx-auto">
              <Animate animation="fade-up" key={step.id}>
                <div className="border border-gray-200 mb-8">
                  <div className="bg-black text-white px-6 py-5">
                    <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.25rem,3vw,1.5rem)] font-extrabold">
                      {step.question}
                    </h2>
                  </div>

                  <div className="p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {step.options.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => handleSelect(opt.value)}
                          className={`min-h-[44px] px-5 py-4 text-base text-left font-bold transition-all duration-300 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                            answers[step.id] === opt.value
                              ? "bg-black text-white"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:shadow-lg hover:-translate-y-1"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </Animate>

              {/* Navigation buttons */}
              <div className="flex items-center justify-between gap-4">
                <button
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                  className={`min-h-[44px] px-8 py-4 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                    currentStep === 0
                      ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                      : "border-2 border-black text-black hover:bg-black hover:text-white"
                  }`}
                >
                  &larr; Previous
                </button>

                {currentStep < totalSteps - 1 ? (
                  <button
                    onClick={handleNext}
                    disabled={!currentAnswered}
                    className={`min-h-[44px] px-8 py-4 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                      currentAnswered
                        ? "bg-black text-white hover:bg-gray-800"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Next &rarr;
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={!allAnswered}
                    className={`min-h-[44px] px-10 py-4 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                      allAnswered
                        ? "bg-black text-white hover:bg-gray-800"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    See My Results &rarr;
                  </button>
                )}
              </div>

              {!allAnswered && currentStep === totalSteps - 1 && (
                <p className="text-base text-gray-400 text-center mt-4">
                  Answer all {totalSteps} questions to see your results
                </p>
              )}
            </div>
          </section>
        </>
      ) : results ? (
        <>
          {/* ---- Results ---- */}
          <section
            className="px-6 lg:px-12 py-8"
            aria-label="Channel recommendations"
          >
            <div className="max-w-3xl mx-auto">
              {/* ---- Top 3 Recommended Channels ---- */}
              <Animate animation="fade-up">
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-6">
                  Your Top Recommended Channels
                </h2>
              </Animate>

              <Stagger stagger={100} className="space-y-6 mb-12">
                {results.recommended.map((ch, i) => (
                  <div
                    key={ch.name}
                    className="border border-gray-200"
                  >
                    <div className="bg-black text-white px-6 py-4 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="font-[family-name:var(--font-display)] text-[clamp(1.25rem,3vw,1.5rem)] font-extrabold">
                          {i + 1}.
                        </span>
                        <span className="font-[family-name:var(--font-display)] text-[clamp(1.25rem,3vw,1.5rem)] font-extrabold">
                          {ch.name}
                        </span>
                      </div>
                      <span
                        className={`px-3 py-1 text-base font-bold ${
                          ch.priority === "High"
                            ? "bg-white text-black"
                            : "bg-gray-700 text-white"
                        }`}
                      >
                        {ch.priority} Priority
                      </span>
                    </div>
                    <div className="p-6 space-y-4">
                      <p className="text-base text-gray-600">
                        {ch.reason}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <p className="text-base font-bold text-black mb-1">
                            Timeline to Results
                          </p>
                          <p className="text-base text-gray-600">
                            {ch.timeline}
                          </p>
                        </div>
                        <div>
                          <p className="text-base font-bold text-black mb-1">
                            Budget Allocation
                          </p>
                          <p className="text-base text-gray-600">
                            {ch.budgetPct}% of channel budget
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Stagger>

              {/* ---- Channel Mix Visualization ---- */}
              <Animate animation="fade-up">
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-2">
                  Recommended Channel Mix
                </h2>
                <p className="text-base text-gray-500 mb-6">
                  Suggested budget allocation across your top channels.
                </p>
              </Animate>

              <Animate animation="fade-up">
                <div className="border border-gray-200 p-6 mb-12">
                  <div className="space-y-4">
                    {results.recommended.map((ch, i) => {
                      const shades = [
                        "bg-black",
                        "bg-gray-700",
                        "bg-gray-400",
                      ];
                      return (
                        <div key={ch.name}>
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-base font-bold text-black">
                              {ch.name}
                            </p>
                            <p className="text-base font-bold text-black">
                              {ch.budgetPct}%
                            </p>
                          </div>
                          <div className="w-full bg-gray-100 h-8">
                            <div
                              className={`${shades[i]} h-8 transition-all motion-reduce:transition-none`}
                              style={{ width: `${ch.budgetPct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Animate>

              {/* ---- Channels to Avoid ---- */}
              <Animate animation="fade-up">
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-6">
                  Channels to Avoid
                </h2>
              </Animate>

              <Stagger stagger={100} className="space-y-4 mb-12">
                {results.avoid.map((ch) => (
                  <div
                    key={ch.name}
                    className="border border-gray-200 p-6"
                  >
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">
                      {ch.name}
                    </h3>
                    <p className="text-base text-gray-600">{ch.reason}</p>
                  </div>
                ))}
              </Stagger>

              {/* ---- Quick-Start Roadmap ---- */}
              <Animate animation="fade-up">
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-2">
                  Quick-Start Roadmap
                </h2>
                <p className="text-base text-gray-500 mb-6">
                  A phased plan to get your recommended channels up and
                  running.
                </p>
              </Animate>

              <Stagger stagger={100} className="space-y-6 mb-12">
                {results.roadmap.map((phase) => (
                  <div
                    key={phase.label}
                    className="border border-gray-200 p-6"
                  >
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">
                      {phase.label}
                    </h3>
                    <ul className="space-y-3">
                      {phase.items.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-base text-gray-600"
                        >
                          <span className="font-bold text-black min-w-[24px]">
                            {i + 1}.
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </Stagger>

              {/* ---- Actions ---- */}
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <CopyButton text={plainText} />
                <DownloadButton
                  text={plainText}
                  filename="channel-selector-results.txt"
                />
                <button
                  onClick={handleReset}
                  className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center px-5 py-3 text-base font-bold border-2 border-black text-black hover:bg-black hover:text-white transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  Start Over
                </button>
              </div>
            </div>
          </section>
        </>
      ) : null}

      {/* ---- CTA ---- */}
      <section aria-label="Call to action" className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Need Help Executing Your Channel Strategy?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Our team specializes in building and managing multi-channel
              marketing programs that drive real results. Let us turn this
              recommendation into a growth plan.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              Get a Free Consultation &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    
      <ToolCTA
        toolName="Channel Selector"
        services={[
          { title: "Digital Marketing", desc: "Full-service digital marketing strategy for measurable business growth.", href: "/services/digital-marketing" },
          { title: "SEO", desc: "Organic search strategies that deliver compounding traffic over time.", href: "/services/seo" },
          { title: "Performance Marketing", desc: "Paid campaigns optimized for maximum return on ad spend.", href: "/services/performance-marketing" },
        ]}
        relatedTools={[
          { title: "Channel Mix Modeller", href: "/resources/channel-mix-modeller" },
          { title: "Channel Recommender", href: "/resources/channel-recommender" },
          { title: "Client Onboarding Checklist", href: "/resources/client-onboarding-checklist" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
