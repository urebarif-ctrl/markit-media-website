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

interface FormData {
  industry: string;
  businessModel: string;
  companySize: string;
  audienceAgeMin: string;
  audienceAgeMax: string;
  goals: string[];
  budgetRange: string;
  teamSize: string;
}

interface ChannelResult {
  name: string;
  matchScore: number;
  roiPotential: "Low" | "Medium" | "High";
  timeToResults: string;
  resourceRequirements: string;
  tactics: string[];
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const industries = [
  "E-commerce",
  "SaaS / Software",
  "Professional Services",
  "Healthcare",
  "Real Estate",
  "Education",
  "Finance / Insurance",
  "Hospitality / Travel",
  "Restaurants / Food",
  "Retail / Brick & Mortar",
  "Manufacturing",
  "Construction",
  "Fitness / Wellness",
  "Fashion / Beauty",
  "Automotive",
  "Legal",
  "Nonprofits",
  "Home Services",
  "Media / Entertainment",
  "Other",
];

const businessModels = [
  { label: "B2B", value: "b2b" },
  { label: "B2C", value: "b2c" },
  { label: "D2C", value: "d2c" },
];

const companySizes = [
  { label: "1-10 employees", value: "micro" },
  { label: "11-50 employees", value: "small" },
  { label: "51-200 employees", value: "medium" },
  { label: "201-1000 employees", value: "large" },
  { label: "1000+ employees", value: "enterprise" },
];

const goalOptions = [
  { label: "Brand Awareness", value: "awareness" },
  { label: "Lead Generation", value: "leads" },
  { label: "Sales / Revenue", value: "sales" },
  { label: "Customer Retention", value: "retention" },
  { label: "Community Building", value: "community" },
];

const budgetRanges = [
  { label: "Under $1,000 / month", value: "under1k" },
  { label: "$1,000 - $3,000 / month", value: "1k3k" },
  { label: "$3,000 - $10,000 / month", value: "3k10k" },
  { label: "$10,000 - $25,000 / month", value: "10k25k" },
  { label: "$25,000 - $50,000 / month", value: "25k50k" },
  { label: "$50,000+ / month", value: "50kplus" },
];

const teamSizes = [
  { label: "Solo (just me)", value: "solo" },
  { label: "Small (2-3 people)", value: "small" },
  { label: "Medium (4-8 people)", value: "medium" },
  { label: "Large (9+ people)", value: "large" },
  { label: "Agency or outsourced", value: "agency" },
];

const ageOptions = [
  { label: "18", value: "18" },
  { label: "25", value: "25" },
  { label: "30", value: "30" },
  { label: "35", value: "35" },
  { label: "45", value: "45" },
  { label: "55", value: "55" },
  { label: "65+", value: "65" },
];

/* ------------------------------------------------------------------ */
/*  Channel definitions                                                */
/* ------------------------------------------------------------------ */

type ChannelKey =
  | "seo"
  | "googleAds"
  | "metaAds"
  | "linkedinAds"
  | "tiktok"
  | "emailMarketing"
  | "contentMarketing"
  | "socialOrganic"
  | "influencerMarketing"
  | "affiliateMarketing"
  | "prMedia"
  | "eventsWebinars"
  | "podcast"
  | "youtube"
  | "directMail";

const channelNames: Record<ChannelKey, string> = {
  seo: "SEO",
  googleAds: "Google Ads",
  metaAds: "Meta Ads",
  linkedinAds: "LinkedIn Ads",
  tiktok: "TikTok",
  emailMarketing: "Email Marketing",
  contentMarketing: "Content Marketing",
  socialOrganic: "Social Media Organic",
  influencerMarketing: "Influencer Marketing",
  affiliateMarketing: "Affiliate Marketing",
  prMedia: "PR / Media",
  eventsWebinars: "Events / Webinars",
  podcast: "Podcast",
  youtube: "YouTube",
  directMail: "Direct Mail",
};

const channelTimeToResults: Record<ChannelKey, string> = {
  seo: "3-6 months for meaningful organic traffic growth",
  googleAds: "1-2 weeks for initial traffic; 2-3 months to optimize",
  metaAds: "1-2 weeks for initial results; 1-2 months to optimize",
  linkedinAds: "2-4 weeks for initial leads; 3-4 months to optimize",
  tiktok: "1-4 weeks for reach; 2-3 months for consistent engagement",
  emailMarketing: "2-4 weeks for first campaigns; ongoing list growth",
  contentMarketing: "3-6 months to build authority and consistent traffic",
  socialOrganic: "2-3 months for community traction; 6+ months for scale",
  influencerMarketing: "1-2 months per campaign cycle",
  affiliateMarketing: "2-3 months to recruit partners; 3-6 months for volume",
  prMedia: "1-3 months per campaign; results vary by coverage",
  eventsWebinars: "4-8 weeks per event cycle; pipeline builds over quarters",
  podcast: "3-6 months to build audience; long-term compounding asset",
  youtube: "3-6 months for channel growth; ongoing compounding returns",
  directMail: "2-4 weeks per campaign; response within days of delivery",
};

const channelResourceReqs: Record<ChannelKey, string> = {
  seo: "Technical knowledge, content writers, ongoing optimization",
  googleAds: "Ad specialist, landing pages, tracking setup, ongoing budget",
  metaAds: "Creative assets (images/video), ad specialist, budget",
  linkedinAds: "B2B-focused creative, ad specialist, higher ad budget",
  tiktok: "Short-form video production, trend awareness, creative team",
  emailMarketing: "Email platform, list building, copywriting, segmentation",
  contentMarketing: "Writers, editors, SEO knowledge, publishing cadence",
  socialOrganic: "Content creator, community manager, consistent posting",
  influencerMarketing: "Influencer research, outreach, campaign management",
  affiliateMarketing: "Affiliate platform, partner recruitment, commission structure",
  prMedia: "PR specialist or agency, media relationships, newsworthy stories",
  eventsWebinars: "Event planning, speakers, promotion, follow-up sequences",
  podcast: "Recording equipment, editing, hosting, consistent schedule",
  youtube: "Video production, editing, thumbnail design, channel optimization",
  directMail: "Design, print production, mailing lists, postage budget",
};

const channelTactics: Record<ChannelKey, string[]> = {
  seo: [
    "Technical SEO audit and fixes",
    "Keyword research and content mapping",
    "On-page optimization for target pages",
    "Link building through outreach and content",
    "Local SEO optimization (if applicable)",
  ],
  googleAds: [
    "Search campaigns for high-intent keywords",
    "Shopping campaigns for product-based businesses",
    "Retargeting campaigns for site visitors",
    "Performance Max campaigns for broad reach",
    "Conversion tracking and bid optimization",
  ],
  metaAds: [
    "Lookalike audience campaigns",
    "Retargeting with dynamic product ads",
    "Lead generation forms for B2B/services",
    "Video ads for awareness and engagement",
    "A/B testing creative and copy variations",
  ],
  linkedinAds: [
    "Sponsored content for thought leadership",
    "Lead gen forms with pre-filled fields",
    "Account-based targeting by company and title",
    "InMail campaigns for direct outreach",
    "Retargeting engaged prospects",
  ],
  tiktok: [
    "Short-form video content aligned with trends",
    "Branded hashtag challenges",
    "Creator partnerships for authentic content",
    "Spark Ads to amplify organic posts",
    "TikTok Shop integration for e-commerce",
  ],
  emailMarketing: [
    "Welcome sequences for new subscribers",
    "Segmented nurture campaigns",
    "Abandoned cart / re-engagement flows",
    "Newsletter with value-driven content",
    "A/B testing subject lines and send times",
  ],
  contentMarketing: [
    "Blog articles targeting search intent",
    "Downloadable guides and whitepapers",
    "Case studies and success stories",
    "Infographics and data-driven content",
    "Content repurposing across channels",
  ],
  socialOrganic: [
    "Consistent posting schedule across platforms",
    "Community engagement and conversation",
    "User-generated content campaigns",
    "Behind-the-scenes and brand storytelling",
    "Social listening and trend participation",
  ],
  influencerMarketing: [
    "Micro-influencer partnerships for niche reach",
    "Product seeding and review campaigns",
    "Affiliate-style commission partnerships",
    "Co-created content for authenticity",
    "Long-term ambassador programs",
  ],
  affiliateMarketing: [
    "Affiliate program setup with tracking",
    "Partner recruitment in your niche",
    "Commission structure optimization",
    "Affiliate content and asset creation",
    "Performance monitoring and partner management",
  ],
  prMedia: [
    "Press releases for newsworthy announcements",
    "Media outreach and journalist relationships",
    "Thought leadership article placements",
    "Industry award submissions",
    "Crisis communication planning",
  ],
  eventsWebinars: [
    "Educational webinars on industry topics",
    "Product demos and Q&A sessions",
    "Virtual or in-person networking events",
    "Conference speaking opportunities",
    "Post-event nurture sequences",
  ],
  podcast: [
    "Guest appearances on industry podcasts",
    "Launch your own branded podcast",
    "Repurpose episodes into blog posts and clips",
    "Sponsor relevant podcasts in your niche",
    "Build an email list from listeners",
  ],
  youtube: [
    "Educational how-to and tutorial content",
    "Product reviews and demonstrations",
    "YouTube SEO with keyword-optimized titles",
    "YouTube Shorts for discoverability",
    "Collaborations with other creators",
  ],
  directMail: [
    "Targeted mailers to warm prospect lists",
    "Post-purchase thank you cards",
    "Catalog or product showcase mailings",
    "Event invitations to high-value prospects",
    "QR codes linking to digital landing pages",
  ],
};

/* ------------------------------------------------------------------ */
/*  Scoring engine                                                     */
/* ------------------------------------------------------------------ */

function scoreChannels(data: FormData): Record<ChannelKey, number> {
  const scores: Record<ChannelKey, number> = {
    seo: 0,
    googleAds: 0,
    metaAds: 0,
    linkedinAds: 0,
    tiktok: 0,
    emailMarketing: 0,
    contentMarketing: 0,
    socialOrganic: 0,
    influencerMarketing: 0,
    affiliateMarketing: 0,
    prMedia: 0,
    eventsWebinars: 0,
    podcast: 0,
    youtube: 0,
    directMail: 0,
  };

  /* --- Business Model --- */
  if (data.businessModel === "b2b") {
    scores.linkedinAds += 5;
    scores.contentMarketing += 4;
    scores.emailMarketing += 4;
    scores.seo += 4;
    scores.googleAds += 3;
    scores.eventsWebinars += 4;
    scores.podcast += 3;
    scores.prMedia += 3;
    scores.directMail += 2;
    scores.tiktok -= 2;
    scores.influencerMarketing -= 1;
  } else if (data.businessModel === "b2c") {
    scores.metaAds += 5;
    scores.googleAds += 4;
    scores.tiktok += 4;
    scores.socialOrganic += 4;
    scores.influencerMarketing += 4;
    scores.youtube += 3;
    scores.emailMarketing += 3;
    scores.seo += 3;
    scores.affiliateMarketing += 2;
    scores.linkedinAds -= 2;
    scores.eventsWebinars -= 1;
  } else if (data.businessModel === "d2c") {
    scores.metaAds += 5;
    scores.emailMarketing += 5;
    scores.googleAds += 4;
    scores.tiktok += 4;
    scores.influencerMarketing += 4;
    scores.affiliateMarketing += 4;
    scores.socialOrganic += 3;
    scores.youtube += 3;
    scores.seo += 3;
    scores.linkedinAds -= 3;
  }

  /* --- Industry modifiers --- */
  const ind = data.industry;
  if (ind === "E-commerce" || ind === "Fashion / Beauty") {
    scores.metaAds += 3;
    scores.tiktok += 3;
    scores.influencerMarketing += 3;
    scores.affiliateMarketing += 3;
    scores.googleAds += 2;
    scores.emailMarketing += 2;
  } else if (ind === "SaaS / Software") {
    scores.contentMarketing += 4;
    scores.seo += 4;
    scores.googleAds += 3;
    scores.linkedinAds += 3;
    scores.emailMarketing += 3;
    scores.podcast += 2;
    scores.eventsWebinars += 2;
  } else if (ind === "Professional Services" || ind === "Legal") {
    scores.seo += 4;
    scores.googleAds += 4;
    scores.contentMarketing += 3;
    scores.linkedinAds += 3;
    scores.prMedia += 2;
    scores.directMail += 2;
  } else if (ind === "Healthcare") {
    scores.seo += 4;
    scores.googleAds += 3;
    scores.contentMarketing += 3;
    scores.emailMarketing += 2;
    scores.prMedia += 2;
  } else if (ind === "Real Estate") {
    scores.googleAds += 4;
    scores.metaAds += 3;
    scores.seo += 3;
    scores.socialOrganic += 3;
    scores.youtube += 3;
    scores.directMail += 3;
    scores.emailMarketing += 2;
  } else if (ind === "Education") {
    scores.seo += 4;
    scores.contentMarketing += 4;
    scores.youtube += 3;
    scores.metaAds += 3;
    scores.emailMarketing += 3;
    scores.eventsWebinars += 3;
  } else if (ind === "Finance / Insurance") {
    scores.seo += 4;
    scores.googleAds += 4;
    scores.contentMarketing += 3;
    scores.emailMarketing += 3;
    scores.linkedinAds += 2;
    scores.prMedia += 2;
    scores.directMail += 2;
  } else if (ind === "Hospitality / Travel") {
    scores.metaAds += 4;
    scores.socialOrganic += 3;
    scores.influencerMarketing += 3;
    scores.youtube += 3;
    scores.tiktok += 3;
    scores.seo += 3;
    scores.emailMarketing += 2;
  } else if (ind === "Restaurants / Food") {
    scores.socialOrganic += 4;
    scores.metaAds += 3;
    scores.tiktok += 3;
    scores.influencerMarketing += 3;
    scores.seo += 2;
    scores.emailMarketing += 2;
  } else if (ind === "Retail / Brick & Mortar" || ind === "Home Services") {
    scores.googleAds += 4;
    scores.seo += 4;
    scores.metaAds += 3;
    scores.socialOrganic += 3;
    scores.directMail += 3;
    scores.emailMarketing += 2;
  } else if (ind === "Manufacturing" || ind === "Construction") {
    scores.seo += 4;
    scores.googleAds += 3;
    scores.linkedinAds += 3;
    scores.contentMarketing += 3;
    scores.eventsWebinars += 3;
    scores.directMail += 2;
    scores.prMedia += 2;
  } else if (ind === "Fitness / Wellness") {
    scores.socialOrganic += 4;
    scores.metaAds += 3;
    scores.tiktok += 3;
    scores.influencerMarketing += 3;
    scores.youtube += 3;
    scores.emailMarketing += 2;
  } else if (ind === "Automotive") {
    scores.googleAds += 4;
    scores.youtube += 3;
    scores.seo += 3;
    scores.metaAds += 3;
    scores.socialOrganic += 2;
    scores.directMail += 2;
  } else if (ind === "Nonprofits") {
    scores.emailMarketing += 4;
    scores.socialOrganic += 4;
    scores.contentMarketing += 3;
    scores.prMedia += 3;
    scores.eventsWebinars += 3;
    scores.directMail += 2;
  } else if (ind === "Media / Entertainment") {
    scores.socialOrganic += 4;
    scores.youtube += 4;
    scores.tiktok += 4;
    scores.influencerMarketing += 3;
    scores.podcast += 3;
    scores.prMedia += 3;
  } else {
    // "Other" — balanced
    scores.seo += 3;
    scores.googleAds += 3;
    scores.metaAds += 2;
    scores.emailMarketing += 2;
    scores.contentMarketing += 2;
    scores.socialOrganic += 2;
  }

  /* --- Goals --- */
  for (const goal of data.goals) {
    if (goal === "awareness") {
      scores.metaAds += 3;
      scores.tiktok += 3;
      scores.youtube += 3;
      scores.socialOrganic += 3;
      scores.influencerMarketing += 3;
      scores.prMedia += 3;
      scores.podcast += 2;
      scores.contentMarketing += 2;
    } else if (goal === "leads") {
      scores.googleAds += 4;
      scores.linkedinAds += 3;
      scores.seo += 3;
      scores.emailMarketing += 3;
      scores.contentMarketing += 3;
      scores.eventsWebinars += 3;
      scores.directMail += 2;
    } else if (goal === "sales") {
      scores.googleAds += 4;
      scores.metaAds += 4;
      scores.emailMarketing += 3;
      scores.affiliateMarketing += 3;
      scores.seo += 2;
      scores.directMail += 2;
    } else if (goal === "retention") {
      scores.emailMarketing += 5;
      scores.socialOrganic += 3;
      scores.contentMarketing += 3;
      scores.podcast += 2;
      scores.eventsWebinars += 2;
      scores.directMail += 2;
    } else if (goal === "community") {
      scores.socialOrganic += 5;
      scores.podcast += 3;
      scores.youtube += 3;
      scores.eventsWebinars += 3;
      scores.contentMarketing += 2;
      scores.tiktok += 2;
    }
  }

  /* --- Budget --- */
  const budget = data.budgetRange;
  if (budget === "under1k") {
    scores.seo += 3;
    scores.socialOrganic += 3;
    scores.emailMarketing += 3;
    scores.contentMarketing += 2;
    scores.googleAds -= 2;
    scores.metaAds -= 1;
    scores.linkedinAds -= 3;
    scores.influencerMarketing -= 3;
    scores.prMedia -= 2;
    scores.eventsWebinars -= 2;
    scores.directMail -= 2;
    scores.youtube -= 1;
  } else if (budget === "1k3k") {
    scores.seo += 3;
    scores.socialOrganic += 2;
    scores.emailMarketing += 3;
    scores.googleAds += 1;
    scores.metaAds += 1;
    scores.contentMarketing += 2;
    scores.linkedinAds -= 2;
    scores.influencerMarketing -= 2;
    scores.eventsWebinars -= 1;
  } else if (budget === "3k10k") {
    scores.googleAds += 3;
    scores.metaAds += 3;
    scores.seo += 2;
    scores.emailMarketing += 2;
    scores.contentMarketing += 2;
    scores.tiktok += 1;
    scores.youtube += 1;
  } else if (budget === "10k25k") {
    scores.googleAds += 3;
    scores.metaAds += 3;
    scores.linkedinAds += 2;
    scores.tiktok += 2;
    scores.youtube += 2;
    scores.seo += 2;
    scores.influencerMarketing += 2;
    scores.eventsWebinars += 1;
    scores.prMedia += 1;
  } else if (budget === "25k50k") {
    scores.googleAds += 3;
    scores.metaAds += 3;
    scores.linkedinAds += 3;
    scores.tiktok += 2;
    scores.youtube += 3;
    scores.influencerMarketing += 3;
    scores.affiliateMarketing += 2;
    scores.eventsWebinars += 2;
    scores.prMedia += 2;
    scores.podcast += 2;
    scores.directMail += 1;
  } else if (budget === "50kplus") {
    scores.googleAds += 3;
    scores.metaAds += 3;
    scores.linkedinAds += 3;
    scores.tiktok += 3;
    scores.youtube += 3;
    scores.influencerMarketing += 3;
    scores.affiliateMarketing += 3;
    scores.eventsWebinars += 3;
    scores.prMedia += 3;
    scores.podcast += 3;
    scores.directMail += 2;
    scores.contentMarketing += 2;
  }

  /* --- Target audience age range --- */
  const ageMin = parseInt(data.audienceAgeMin) || 25;
  const ageMax = parseInt(data.audienceAgeMax) || 55;
  const ageMid = (ageMin + ageMax) / 2;

  if (ageMid < 25) {
    scores.tiktok += 5;
    scores.socialOrganic += 3;
    scores.influencerMarketing += 3;
    scores.youtube += 3;
    scores.metaAds += 1;
    scores.linkedinAds -= 3;
    scores.directMail -= 2;
    scores.podcast -= 1;
  } else if (ageMid < 35) {
    scores.metaAds += 3;
    scores.tiktok += 3;
    scores.socialOrganic += 2;
    scores.influencerMarketing += 2;
    scores.youtube += 2;
    scores.googleAds += 1;
  } else if (ageMid < 45) {
    scores.googleAds += 3;
    scores.metaAds += 3;
    scores.emailMarketing += 2;
    scores.seo += 2;
    scores.youtube += 1;
    scores.contentMarketing += 1;
  } else if (ageMid < 55) {
    scores.googleAds += 3;
    scores.emailMarketing += 3;
    scores.seo += 3;
    scores.directMail += 2;
    scores.linkedinAds += 1;
    scores.tiktok -= 2;
    scores.influencerMarketing -= 1;
  } else {
    scores.googleAds += 3;
    scores.emailMarketing += 4;
    scores.seo += 3;
    scores.directMail += 3;
    scores.tiktok -= 3;
    scores.influencerMarketing -= 2;
    scores.socialOrganic -= 1;
  }

  /* --- Company size / maturity --- */
  if (data.companySize === "micro") {
    scores.socialOrganic += 2;
    scores.seo += 2;
    scores.emailMarketing += 2;
    scores.eventsWebinars -= 2;
    scores.prMedia -= 1;
    scores.affiliateMarketing -= 1;
  } else if (data.companySize === "small") {
    scores.seo += 2;
    scores.googleAds += 1;
    scores.emailMarketing += 2;
    scores.socialOrganic += 1;
  } else if (data.companySize === "medium") {
    scores.googleAds += 2;
    scores.metaAds += 2;
    scores.contentMarketing += 2;
    scores.eventsWebinars += 1;
  } else if (data.companySize === "large") {
    scores.prMedia += 2;
    scores.eventsWebinars += 2;
    scores.affiliateMarketing += 2;
    scores.youtube += 2;
    scores.podcast += 2;
  } else if (data.companySize === "enterprise") {
    scores.prMedia += 3;
    scores.eventsWebinars += 3;
    scores.affiliateMarketing += 2;
    scores.youtube += 2;
    scores.podcast += 2;
    scores.directMail += 1;
  }

  /* --- Team size / capacity --- */
  if (data.teamSize === "solo") {
    scores.googleAds += 1;
    scores.emailMarketing += 1;
    scores.seo += 1;
    scores.contentMarketing -= 2;
    scores.youtube -= 3;
    scores.podcast -= 2;
    scores.socialOrganic -= 1;
    scores.eventsWebinars -= 2;
  } else if (data.teamSize === "small") {
    scores.emailMarketing += 1;
    scores.seo += 1;
    scores.socialOrganic += 1;
    scores.youtube -= 1;
    scores.eventsWebinars -= 1;
  } else if (data.teamSize === "medium") {
    scores.contentMarketing += 2;
    scores.socialOrganic += 2;
    scores.seo += 1;
    scores.youtube += 1;
    scores.emailMarketing += 1;
  } else if (data.teamSize === "large") {
    scores.contentMarketing += 3;
    scores.youtube += 3;
    scores.socialOrganic += 2;
    scores.podcast += 2;
    scores.eventsWebinars += 2;
    scores.influencerMarketing += 1;
  } else if (data.teamSize === "agency") {
    scores.googleAds += 2;
    scores.metaAds += 2;
    scores.linkedinAds += 1;
    scores.seo += 2;
    scores.contentMarketing += 2;
    scores.youtube += 1;
    scores.socialOrganic += 1;
  }

  return scores;
}

function getROIPotential(key: ChannelKey, data: FormData): "Low" | "Medium" | "High" {
  const goals = data.goals;
  const budget = data.budgetRange;
  const model = data.businessModel;

  const highROI: Record<string, ChannelKey[]> = {
    b2b: ["seo", "googleAds", "linkedinAds", "emailMarketing", "contentMarketing", "eventsWebinars"],
    b2c: ["metaAds", "googleAds", "emailMarketing", "seo", "tiktok", "influencerMarketing"],
    d2c: ["metaAds", "emailMarketing", "googleAds", "affiliateMarketing", "tiktok", "influencerMarketing"],
  };

  const modelHighROI = highROI[model] || highROI.b2c;

  if (modelHighROI.includes(key)) {
    // If budget is very low, even strong channels may only deliver medium ROI
    if (budget === "under1k" && ["googleAds", "metaAds", "linkedinAds"].includes(key)) {
      return "Medium";
    }
    return "High";
  }

  // Goal alignment bonus
  const goalAligned =
    (goals.includes("leads") && ["googleAds", "linkedinAds", "seo", "emailMarketing"].includes(key)) ||
    (goals.includes("awareness") && ["metaAds", "tiktok", "youtube", "influencerMarketing", "prMedia"].includes(key)) ||
    (goals.includes("sales") && ["googleAds", "metaAds", "emailMarketing", "affiliateMarketing"].includes(key)) ||
    (goals.includes("retention") && ["emailMarketing", "socialOrganic", "contentMarketing"].includes(key)) ||
    (goals.includes("community") && ["socialOrganic", "podcast", "youtube", "eventsWebinars"].includes(key));

  if (goalAligned) return "Medium";

  return "Low";
}

function buildResults(data: FormData): ChannelResult[] {
  const rawScores = scoreChannels(data);

  // Normalize scores to percentages
  const entries = Object.entries(rawScores) as [ChannelKey, number][];
  const maxScore = Math.max(...entries.map(([, s]) => s), 1);
  const minScore = Math.min(...entries.map(([, s]) => s));
  const range = maxScore - minScore || 1;

  const results: ChannelResult[] = entries
    .map(([key, rawScore]) => {
      // Normalize to 30-98 range for display
      const normalized = ((rawScore - minScore) / range) * 68 + 30;
      const matchScore = Math.round(Math.min(98, Math.max(15, normalized)));

      return {
        name: channelNames[key],
        matchScore,
        roiPotential: getROIPotential(key, data),
        timeToResults: channelTimeToResults[key],
        resourceRequirements: channelResourceReqs[key],
        tactics: channelTactics[key],
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore);

  return results;
}

/* ------------------------------------------------------------------ */
/*  SVG Comparison Chart                                               */
/* ------------------------------------------------------------------ */

function ComparisonChart({ results }: { results: ChannelResult[] }) {
  const top8 = results.slice(0, 8);
  const barHeight = 40;
  const gap = 12;
  const labelWidth = 180;
  const chartWidth = 600;
  const totalHeight = top8.length * (barHeight + gap) + gap;

  return (
    <div className="border border-gray-200 p-6 overflow-x-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Marketing Channel Recommender",
          description: "Free interactive tool that recommends and ranks the best marketing channels based on your business details, goals, budget, and team size.",
          url: "https://themarkitmedia.com/en/resources/channel-recommender",
          applicationCategory: "Marketing Tool",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          provider: { "@type": "Organization", name: "Markit Media", url: "https://themarkitmedia.com" },
        }) }}
      />
      <svg
        viewBox={`0 0 ${labelWidth + chartWidth + 70} ${totalHeight + 10}`}
        className="w-full"
        style={{ minWidth: 500 }}
        role="img"
        aria-label="Bar chart comparing match scores of top recommended marketing channels"
      >
        <title>Channel Match Score Comparison</title>
        {top8.map((ch, i) => {
          const y = gap + i * (barHeight + gap);
          const barWidth = (ch.matchScore / 100) * chartWidth;
          // Alternate shades: black, dark gray, medium gray
          const fills = ["#000", "#333", "#555", "#777", "#999", "#000", "#333", "#555"];
          return (
            <g key={ch.name}>
              {/* Label */}
              <text
                x={labelWidth - 8}
                y={y + barHeight / 2 + 1}
                textAnchor="end"
                dominantBaseline="middle"
                className="text-[14px] font-bold"
                fill="#000"
              >
                {ch.name}
              </text>
              {/* Background bar */}
              <rect
                x={labelWidth}
                y={y}
                width={chartWidth}
                height={barHeight}
                fill="#f3f4f6"
                rx={0}
              />
              {/* Score bar */}
              <rect
                x={labelWidth}
                y={y}
                width={barWidth}
                height={barHeight}
                fill={fills[i]}
                rx={0}
              />
              {/* Score text */}
              <text
                x={labelWidth + barWidth + 8}
                y={y + barHeight / 2 + 1}
                textAnchor="start"
                dominantBaseline="middle"
                className="text-[14px] font-bold"
                fill="#000"
              >
                {ch.matchScore}%
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
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

function DownloadButton({ text, filename }: { text: string; filename: string }) {
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

function formatResultsText(results: ChannelResult[]): string {
  const lines: string[] = [];
  lines.push("MARKETING CHANNEL RECOMMENDER RESULTS");
  lines.push("=".repeat(50));
  lines.push("");

  results.forEach((ch, i) => {
    lines.push(`${i + 1}. ${ch.name}`);
    lines.push(`   Match Score: ${ch.matchScore}%`);
    lines.push(`   ROI Potential: ${ch.roiPotential}`);
    lines.push(`   Time to Results: ${ch.timeToResults}`);
    lines.push(`   Resource Requirements: ${ch.resourceRequirements}`);
    lines.push(`   Key Tactics:`);
    ch.tactics.forEach((t) => {
      lines.push(`     - ${t}`);
    });
    lines.push("");
  });

  lines.push("Generated by Markit Media Marketing Channel Recommender");
  lines.push("https://themarkitmedia.com/resources/channel-recommender");

  return lines.join("\n");
}

/* ------------------------------------------------------------------ */
/*  Wizard steps                                                       */
/* ------------------------------------------------------------------ */

const TOTAL_STEPS = 4;

function StepBusinessDetails({
  data,
  onChange,
}: {
  data: FormData;
  onChange: (updates: Partial<FormData>) => void;
}) {
  return (
    <div className="space-y-8">
      {/* Industry */}
      <div>
        <label htmlFor="industry" className="block text-base font-bold text-black mb-2">
          Industry
        </label>
        <select
          id="industry"
          value={data.industry}
          onChange={(e) => onChange({ industry: e.target.value })}
          className="w-full min-h-[44px] px-4 py-3 text-base border border-gray-200 bg-white text-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
        >
          <option value="">Select your industry</option>
          {industries.map((ind) => (
            <option key={ind} value={ind}>
              {ind}
            </option>
          ))}
        </select>
      </div>

      {/* Business Model */}
      <div>
        <p className="text-base font-bold text-black mb-3">Business Model</p>
        <div className="grid grid-cols-3 gap-3">
          {businessModels.map((bm) => (
            <button
              key={bm.value}
              onClick={() => onChange({ businessModel: bm.value })}
              className={`min-h-[44px] px-5 py-4 text-base text-center font-bold transition-all duration-300 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                data.businessModel === bm.value
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {bm.label}
            </button>
          ))}
        </div>
      </div>

      {/* Company Size */}
      <div>
        <p className="text-base font-bold text-black mb-3">Company Size</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {companySizes.map((cs) => (
            <button
              key={cs.value}
              onClick={() => onChange({ companySize: cs.value })}
              className={`min-h-[44px] px-5 py-4 text-base text-left font-bold transition-all duration-300 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                data.companySize === cs.value
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cs.label}
            </button>
          ))}
        </div>
      </div>

      {/* Target Audience Age Range */}
      <div>
        <p className="text-base font-bold text-black mb-3">Target Audience Age Range</p>
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex-1 min-w-[140px]">
            <label htmlFor="age-min" className="block text-base text-gray-500 mb-1">
              From
            </label>
            <select
              id="age-min"
              value={data.audienceAgeMin}
              onChange={(e) => onChange({ audienceAgeMin: e.target.value })}
              className="w-full min-h-[44px] px-4 py-3 text-base border border-gray-200 bg-white text-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              <option value="">Min age</option>
              {ageOptions.map((a) => (
                <option key={a.value} value={a.value}>
                  {a.label}
                </option>
              ))}
            </select>
          </div>
          <span className="text-gray-400 font-bold mt-6">to</span>
          <div className="flex-1 min-w-[140px]">
            <label htmlFor="age-max" className="block text-base text-gray-500 mb-1">
              To
            </label>
            <select
              id="age-max"
              value={data.audienceAgeMax}
              onChange={(e) => onChange({ audienceAgeMax: e.target.value })}
              className="w-full min-h-[44px] px-4 py-3 text-base border border-gray-200 bg-white text-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              <option value="">Max age</option>
              {ageOptions.map((a) => (
                <option key={a.value} value={a.value}>
                  {a.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

function StepGoals({
  data,
  onChange,
}: {
  data: FormData;
  onChange: (updates: Partial<FormData>) => void;
}) {
  function toggleGoal(value: string) {
    const current = data.goals;
    if (current.includes(value)) {
      onChange({ goals: current.filter((g) => g !== value) });
    } else {
      onChange({ goals: [...current, value] });
    }
  }

  return (
    <div>
      <p className="text-base font-bold text-black mb-2">
        Marketing Goals
      </p>
      <p className="text-base text-gray-500 mb-4">
        Select all that apply. Selecting more goals provides a broader recommendation.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {goalOptions.map((g) => {
          const isSelected = data.goals.includes(g.value);
          return (
            <button
              key={g.value}
              onClick={() => toggleGoal(g.value)}
              className={`min-h-[44px] px-5 py-4 text-base text-left font-bold transition-all duration-300 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                isSelected
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <span className="flex items-center gap-3">
                <span
                  className={`inline-flex items-center justify-center w-5 h-5 border-2 flex-shrink-0 ${
                    isSelected ? "border-white bg-white" : "border-gray-400"
                  }`}
                >
                  {isSelected && (
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M2 6L5 9L10 3"
                        stroke="#000"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
                {g.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepBudgetTeam({
  data,
  onChange,
}: {
  data: FormData;
  onChange: (updates: Partial<FormData>) => void;
}) {
  return (
    <div className="space-y-8">
      {/* Budget */}
      <div>
        <p className="text-base font-bold text-black mb-3">Monthly Marketing Budget</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {budgetRanges.map((br) => (
            <button
              key={br.value}
              onClick={() => onChange({ budgetRange: br.value })}
              className={`min-h-[44px] px-5 py-4 text-base text-left font-bold transition-all duration-300 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                data.budgetRange === br.value
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {br.label}
            </button>
          ))}
        </div>
      </div>

      {/* Team Size */}
      <div>
        <p className="text-base font-bold text-black mb-3">Marketing Team Size</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {teamSizes.map((ts) => (
            <button
              key={ts.value}
              onClick={() => onChange({ teamSize: ts.value })}
              className={`min-h-[44px] px-5 py-4 text-base text-left font-bold transition-all duration-300 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                data.teamSize === ts.value
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {ts.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function StepReview({ data }: { data: FormData }) {
  const modelLabel = businessModels.find((b) => b.value === data.businessModel)?.label || "-";
  const sizeLabel = companySizes.find((c) => c.value === data.companySize)?.label || "-";
  const budgetLabel = budgetRanges.find((b) => b.value === data.budgetRange)?.label || "-";
  const teamLabel = teamSizes.find((t) => t.value === data.teamSize)?.label || "-";
  const goalLabels = data.goals.map((g) => goalOptions.find((o) => o.value === g)?.label || g);

  return (
    <div className="space-y-4">
      <p className="text-base font-bold text-black mb-4">Review your inputs before generating recommendations.</p>
      <div className="border border-gray-200 divide-y divide-gray-200">
        <div className="flex justify-between px-6 py-4">
          <span className="text-base font-bold text-black">Industry</span>
          <span className="text-base text-gray-600">{data.industry || "-"}</span>
        </div>
        <div className="flex justify-between px-6 py-4">
          <span className="text-base font-bold text-black">Business Model</span>
          <span className="text-base text-gray-600">{modelLabel}</span>
        </div>
        <div className="flex justify-between px-6 py-4">
          <span className="text-base font-bold text-black">Company Size</span>
          <span className="text-base text-gray-600">{sizeLabel}</span>
        </div>
        <div className="flex justify-between px-6 py-4">
          <span className="text-base font-bold text-black">Target Age</span>
          <span className="text-base text-gray-600">
            {data.audienceAgeMin && data.audienceAgeMax
              ? `${data.audienceAgeMin} - ${data.audienceAgeMax}`
              : "-"}
          </span>
        </div>
        <div className="flex justify-between px-6 py-4">
          <span className="text-base font-bold text-black">Goals</span>
          <span className="text-base text-gray-600 text-right">{goalLabels.join(", ") || "-"}</span>
        </div>
        <div className="flex justify-between px-6 py-4">
          <span className="text-base font-bold text-black">Budget</span>
          <span className="text-base text-gray-600">{budgetLabel}</span>
        </div>
        <div className="flex justify-between px-6 py-4">
          <span className="text-base font-bold text-black">Team Size</span>
          <span className="text-base text-gray-600">{teamLabel}</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

const defaultFormData: FormData = {
  industry: "",
  businessModel: "",
  companySize: "",
  audienceAgeMin: "",
  audienceAgeMax: "",
  goals: [],
  budgetRange: "",
  teamSize: "",
};

export default function ChannelRecommenderPage() {
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [showAllChannels, setShowAllChannels] = useState(false);

  function updateForm(updates: Partial<FormData>) {
    setFormData((prev) => ({ ...prev, ...updates }));
  }

  const stepLabels = ["Business Details", "Goals", "Budget & Team", "Review"];

  function isStepValid(stepIndex: number): boolean {
    if (stepIndex === 0) {
      return !!(
        formData.industry &&
        formData.businessModel &&
        formData.companySize &&
        formData.audienceAgeMin &&
        formData.audienceAgeMax
      );
    }
    if (stepIndex === 1) return formData.goals.length > 0;
    if (stepIndex === 2) return !!(formData.budgetRange && formData.teamSize);
    if (stepIndex === 3) return isStepValid(0) && isStepValid(1) && isStepValid(2);
    return false;
  }

  const allValid = isStepValid(3);

  function handleNext() {
    if (currentStep < TOTAL_STEPS - 1) {
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
    if (allValid) {
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function handleReset() {
    setFormData(defaultFormData);
    setSubmitted(false);
    setCurrentStep(0);
    setShowAllChannels(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const results = submitted ? buildResults(formData) : null;
  const displayResults = results
    ? showAllChannels
      ? results
      : results.slice(0, 8)
    : [];
  const plainText = results ? formatResultsText(results) : "";

  return (
    <article className="min-h-screen">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Marketing Channel Recommender",
          description:
            "Free interactive tool that recommends and ranks the best marketing channels based on your business details, goals, budget, and team size.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />

      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Channel Recommender" },
        ]}
      />

      {/* ---- Hero ---- */}
      <section aria-label="Free Tool" className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Marketing Channel Recommender
            </h1>
            <SectionDesc>
              Enter your business details, goals, and budget to get a ranked list
              of recommended marketing channels with match scores, ROI estimates,
              timelines, and tactical next steps.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {!submitted ? (
        <>
          {/* ---- Progress ---- */}
          <section aria-label="Content section" className="px-6 lg:px-12 pb-6">
            <div className="max-w-3xl mx-auto">
              <Animate animation="fade-up">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-base font-bold text-black">
                    Step {currentStep + 1} of {TOTAL_STEPS}: {stepLabels[currentStep]}
                  </p>
                </div>
                <div className="w-full bg-gray-200 h-2">
                  <div
                    className="bg-black h-2 transition-all motion-reduce:transition-none"
                    style={{
                      width: `${((currentStep + 1) / TOTAL_STEPS) * 100}%`,
                    }}
                  />
                </div>

                {/* Step nav pills */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {stepLabels.map((label, i) => {
                    const stepDone = isStepValid(i);
                    return (
                      <button
                        key={label}
                        onClick={() => setCurrentStep(i)}
                        className={`min-h-[44px] px-4 py-2 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                          i === currentStep
                            ? "bg-black text-white"
                            : stepDone
                              ? "bg-gray-800 text-white"
                              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                        }`}
                      >
                        {i + 1}. {label}
                      </button>
                    );
                  })}
                </div>
              </Animate>
            </div>
          </section>

          {/* ---- Form Step ---- */}
          <section className="px-6 lg:px-12 py-8" aria-label="Input form">
            <div className="max-w-3xl mx-auto">
              <Animate animation="fade-up" key={currentStep}>
                <div className="border border-gray-200 mb-8">
                  <div className="bg-black text-white px-6 py-5">
                    <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.25rem,3vw,1.5rem)] font-extrabold">
                      {stepLabels[currentStep]}
                    </h2>
                  </div>
                  <div className="p-6">
                    {currentStep === 0 && (
                      <StepBusinessDetails data={formData} onChange={updateForm} />
                    )}
                    {currentStep === 1 && (
                      <StepGoals data={formData} onChange={updateForm} />
                    )}
                    {currentStep === 2 && (
                      <StepBudgetTeam data={formData} onChange={updateForm} />
                    )}
                    {currentStep === 3 && <StepReview data={formData} />}
                  </div>
                </div>
              </Animate>

              {/* Navigation */}
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

                {currentStep < TOTAL_STEPS - 1 ? (
                  <button
                    onClick={handleNext}
                    disabled={!isStepValid(currentStep)}
                    className={`min-h-[44px] px-8 py-4 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                      isStepValid(currentStep)
                        ? "bg-black text-white hover:bg-gray-800"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Next &rarr;
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={!allValid}
                    className={`min-h-[44px] px-10 py-4 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                      allValid
                        ? "bg-black text-white hover:bg-gray-800"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Get My Recommendations &rarr;
                  </button>
                )}
              </div>

              {currentStep === TOTAL_STEPS - 1 && !allValid && (
                <p className="text-base text-gray-400 text-center mt-4">
                  Complete all steps to generate your recommendations
                </p>
              )}
            </div>
          </section>
        </>
      ) : results ? (
        <>
          {/* ---- Results ---- */}
          <section className="px-6 lg:px-12 py-8" aria-label="Channel recommendations">
            <div className="max-w-4xl mx-auto">
              {/* ---- Visual Comparison Chart ---- */}
              <Animate animation="fade-up">
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-2">
                  Channel Match Comparison
                </h2>
                <p className="text-base text-gray-500 mb-6">
                  Visual comparison of your top recommended channels by match score.
                </p>
              </Animate>

              <Animate animation="fade-up">
                <div className="mb-12">
                  <ComparisonChart results={results} />
                </div>
              </Animate>

              {/* ---- Ranked Channel Cards ---- */}
              <Animate animation="fade-up">
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-6">
                  Recommended Channels
                </h2>
              </Animate>

              <Stagger stagger={80} className="space-y-6 mb-8">
                {displayResults.map((ch, i) => (
                  <div key={ch.name} className="border border-gray-200">
                    <div className="bg-black text-white px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
                      <div className="flex items-center gap-3">
                        <span className="font-[family-name:var(--font-display)] text-[clamp(1.25rem,3vw,1.5rem)] font-extrabold">
                          {i + 1}.
                        </span>
                        <span className="font-[family-name:var(--font-display)] text-[clamp(1.25rem,3vw,1.5rem)] font-extrabold">
                          {ch.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 text-base font-bold bg-white text-black">
                          {ch.matchScore}% Match
                        </span>
                        <span
                          className={`px-3 py-1 text-base font-bold ${
                            ch.roiPotential === "High"
                              ? "bg-white text-black"
                              : ch.roiPotential === "Medium"
                                ? "bg-gray-300 text-black"
                                : "bg-gray-700 text-white"
                          }`}
                        >
                          {ch.roiPotential} ROI
                        </span>
                      </div>
                    </div>

                    <div className="p-6 space-y-5">
                      {/* Match score bar */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-base font-bold text-black">Match Score</p>
                          <p className="text-base font-bold text-black">{ch.matchScore}%</p>
                        </div>
                        <div className="w-full bg-gray-100 h-3">
                          <div
                            className="bg-black h-3 transition-all motion-reduce:transition-none"
                            style={{ width: `${ch.matchScore}%` }}
                          />
                        </div>
                      </div>

                      {/* Details grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <p className="text-base font-bold text-black mb-1">Time to Results</p>
                          <p className="text-base text-gray-600">{ch.timeToResults}</p>
                        </div>
                        <div>
                          <p className="text-base font-bold text-black mb-1">Resource Requirements</p>
                          <p className="text-base text-gray-600">{ch.resourceRequirements}</p>
                        </div>
                      </div>

                      {/* Key Tactics */}
                      <div>
                        <p className="text-base font-bold text-black mb-2">Key Tactics</p>
                        <ul className="space-y-2">
                          {ch.tactics.map((tactic, ti) => (
                            <li
                              key={ti}
                              className="flex items-start gap-3 text-base text-gray-600"
                            >
                              <span className="font-bold text-black min-w-[20px] flex-shrink-0">
                                {ti + 1}.
                              </span>
                              <span>{tactic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </Stagger>

              {/* Show all / Show fewer toggle */}
              {results.length > 8 && (
                <div className="text-center mb-12">
                  <button
                    onClick={() => setShowAllChannels((prev) => !prev)}
                    className="min-h-[44px] px-6 py-3 text-base font-bold border-2 border-black text-black hover:bg-black hover:text-white transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                  >
                    {showAllChannels
                      ? "Show Top 8 Only"
                      : `Show All ${results.length} Channels`}
                  </button>
                </div>
              )}

              {/* ---- Actions ---- */}
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <CopyButton text={plainText} />
                <DownloadButton
                  text={plainText}
                  filename="channel-recommender-results.txt"
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
              Need Help Building Your Channel Strategy?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Our team builds and manages multi-channel marketing programs
              tailored to your business. Let us turn these recommendations into a
              growth plan that delivers results.
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
        toolName="Channel Recommender"
        services={[
          { title: "Digital Marketing", desc: "Full-service digital marketing strategy for measurable business growth.", href: "/services/digital-marketing" },
          { title: "SEO", desc: "Organic search strategies that deliver compounding traffic over time.", href: "/services/seo" },
          { title: "Performance Marketing", desc: "Paid campaigns optimized for maximum return on ad spend.", href: "/services/performance-marketing" },
        ]}
        relatedTools={[
          { title: "Channel Mix Modeller", href: "/resources/channel-mix-modeller" },
          { title: "Channel Selector", href: "/resources/channel-selector" },
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
