"use client";

import { useState } from "react";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const businessTypes = [
  "E-commerce",
  "SaaS",
  "Local Services",
  "Professional Services",
  "B2B",
  "Agency",
  "Consulting",
] as const;

type BusinessType = (typeof businessTypes)[number];

const socialProofAssets = [
  "Customer reviews",
  "Case studies",
  "Testimonials",
  "Client logos",
  "Media mentions",
  "Awards",
  "Certifications",
  "User count",
  "Social followers",
  "Video testimonials",
  "Before/after examples",
  "Data/statistics",
] as const;

type SocialProofAsset = (typeof socialProofAssets)[number];

const strengthChannels = [
  "Website",
  "Social media",
  "Email marketing",
  "Ads",
  "Sales process",
] as const;

type StrengthChannel = (typeof strengthChannels)[number];

/* ------------------------------------------------------------------ */
/*  Strategy data maps                                                 */
/* ------------------------------------------------------------------ */

const priorityProofByType: Record<BusinessType, SocialProofAsset[]> = {
  "E-commerce": ["Customer reviews", "Before/after examples", "User count", "Video testimonials", "Data/statistics"],
  SaaS: ["Case studies", "Client logos", "Data/statistics", "Testimonials", "User count"],
  "Local Services": ["Customer reviews", "Before/after examples", "Certifications", "Video testimonials", "Awards"],
  "Professional Services": ["Case studies", "Testimonials", "Certifications", "Awards", "Client logos"],
  B2B: ["Case studies", "Client logos", "Data/statistics", "Testimonials", "Awards"],
  Agency: ["Case studies", "Client logos", "Before/after examples", "Testimonials", "Awards"],
  Consulting: ["Testimonials", "Case studies", "Certifications", "Media mentions", "Awards"],
};

const placementRecommendations: Record<string, { location: string; reasoning: string }[]> = {
  "Customer reviews": [
    { location: "Product or service pages, near call-to-action buttons", reasoning: "Reviews at the decision point reduce hesitation and increase conversion rates." },
    { location: "Homepage, below the hero section", reasoning: "Immediate credibility signals reassure first-time visitors." },
  ],
  "Case studies": [
    { location: "Dedicated case study page linked from services", reasoning: "Buyers researching solutions look for proof of results in similar contexts." },
    { location: "Landing pages, as supporting evidence under feature descriptions", reasoning: "Real outcomes validate your claims and move prospects down the funnel." },
  ],
  Testimonials: [
    { location: "Homepage, between key value propositions", reasoning: "Third-party endorsements break up your own messaging with outside validation." },
    { location: "Contact or pricing pages", reasoning: "Testimonials near commitment points address last-minute objections." },
  ],
  "Client logos": [
    { location: "Homepage, in a dedicated logo bar above the fold", reasoning: "Recognizable brands signal trust through association." },
    { location: "Footer or sidebar on all pages", reasoning: "Persistent visibility reinforces credibility across the entire site." },
  ],
  "Media mentions": [
    { location: "Homepage, as an 'As seen in' banner", reasoning: "Press coverage signals authority and legitimacy to new visitors." },
    { location: "About page, to support your brand story", reasoning: "Media validation adds weight to your company narrative." },
  ],
  Awards: [
    { location: "Footer or trust bar on all pages", reasoning: "Awards serve as persistent credibility badges across the site." },
    { location: "About page and team page", reasoning: "Awards reinforce expertise and competitive standing." },
  ],
  Certifications: [
    { location: "Service pages, near descriptions of relevant offerings", reasoning: "Certifications prove qualification for the specific work being described." },
    { location: "Footer or trust section", reasoning: "Persistent display builds baseline trust across all pages." },
  ],
  "User count": [
    { location: "Homepage hero section or subheadline", reasoning: "Large numbers create bandwagon effect and signal market validation." },
    { location: "Signup or pricing page", reasoning: "User counts reduce perceived risk at the conversion point." },
  ],
  "Social followers": [
    { location: "Blog or content pages, with follow buttons", reasoning: "Social proof of audience size encourages content engagement." },
    { location: "Footer, alongside other trust signals", reasoning: "Community size reinforces brand presence across all pages." },
  ],
  "Video testimonials": [
    { location: "Homepage, as a featured testimonial section", reasoning: "Video is more persuasive than text and increases time on page." },
    { location: "Service or product pages", reasoning: "Video testimonials specific to a service add targeted credibility." },
  ],
  "Before/after examples": [
    { location: "Service pages, with clear visual comparisons", reasoning: "Visual transformation evidence is immediately compelling." },
    { location: "Case study pages, as part of the results narrative", reasoning: "Before/after reinforces the measurable impact of your work." },
  ],
  "Data/statistics": [
    { location: "Homepage hero or stats bar", reasoning: "Numbers stand out visually and communicate results quickly." },
    { location: "Landing pages, near calls to action", reasoning: "Data-backed claims are more persuasive at decision points." },
  ],
};

const collectionPlan: Record<SocialProofAsset, string[]> = {
  "Customer reviews": [
    "Send a follow-up email 7 days after purchase or project completion asking for a review.",
    "Make leaving a review easy with direct links to Google, Yelp, or your preferred platform.",
    "Respond to every review, positive or negative, to encourage future participation.",
  ],
  "Case studies": [
    "Identify your top 3 clients with measurable results and request a 20-minute interview.",
    "Use a consistent structure: challenge, solution, results with specific numbers.",
    "Offer to co-promote the case study with the client for mutual benefit.",
  ],
  Testimonials: [
    "Ask specific questions: What was your biggest concern? What results did you see?",
    "Request permission to use the person's full name, title, and company for credibility.",
    "Gather testimonials at project milestones, not just at the end.",
  ],
  "Client logos": [
    "Include logo usage permission in your standard service agreement.",
    "Create a simple logo request email template for existing clients.",
    "Start with your most recognizable clients and build from there.",
  ],
  "Media mentions": [
    "Build relationships with industry journalists and bloggers by providing expert commentary.",
    "Submit guest articles to relevant publications with your byline.",
    "Use a media monitoring tool to track and collect mentions as they happen.",
  ],
  Awards: [
    "Research industry-specific awards with upcoming deadlines and prepare applications.",
    "Document your best work throughout the year to have award-ready material.",
    "Start with local or niche awards where competition is lower.",
  ],
  Certifications: [
    "Identify the most valued certifications in your industry and prioritize accordingly.",
    "Set aside time quarterly for certification study and renewal.",
    "Display certifications prominently with official badges where permitted.",
  ],
  "User count": [
    "Track user milestones and update your site when you hit round numbers.",
    "Use specific, verifiable metrics rather than vague claims.",
    "Segment counts when relevant (e.g., users in a specific industry).",
  ],
  "Social followers": [
    "Run consistent, value-driven content to grow followers organically.",
    "Cross-promote your social channels on your website, email signature, and packaging.",
    "Engage with followers to build community rather than just broadcasting.",
  ],
  "Video testimonials": [
    "Offer to handle all production so the client only needs to show up and talk.",
    "Prepare 3-5 guided questions to keep the video focused and under 2 minutes.",
    "Record remotely via video call if in-person is not possible.",
  ],
  "Before/after examples": [
    "Document the 'before' state at the start of every project with screenshots or photos.",
    "Create side-by-side comparisons with clear labels and context.",
    "Include specific metrics alongside visual comparisons when possible.",
  ],
  "Data/statistics": [
    "Track key performance metrics for every client engagement from day one.",
    "Calculate aggregate statistics across clients (e.g., average improvement percentages).",
    "Update your data regularly and include the time period for transparency.",
  ],
};

const industryTips: Record<BusinessType, string[]> = {
  "E-commerce": [
    "Prioritize photo and video reviews over text-only reviews for higher engagement.",
    "Display review counts alongside star ratings to show volume of feedback.",
    "Use user-generated content from social media as a form of social proof on product pages.",
    "Highlight 'most popular' or 'best seller' labels based on real sales data.",
  ],
  SaaS: [
    "Feature integration partner logos alongside client logos for expanded trust signals.",
    "Publish transparent uptime statistics and performance benchmarks.",
    "Showcase the number of active users or data processed to demonstrate scale.",
    "Use G2, Capterra, or similar platform ratings as third-party validation.",
  ],
  "Local Services": [
    "Google Business Profile reviews are your most important social proof asset.",
    "Display your response rate and average response time to show accessibility.",
    "Feature neighborhood-specific testimonials to build local relevance.",
    "Include your years in business and number of local projects completed.",
  ],
  "Professional Services": [
    "Long-form case studies with detailed methodology resonate with professional buyers.",
    "Include professional credentials and continuing education alongside testimonials.",
    "Peer endorsements carry more weight than client testimonials in some fields.",
    "Publish thought leadership content to build authority alongside direct social proof.",
  ],
  B2B: [
    "Decision-maker testimonials (titles like VP, Director, CEO) carry more weight than generic quotes.",
    "ROI-focused case studies with specific dollar amounts or percentages perform best.",
    "Industry-specific proof matters more than volume: 3 relevant case studies beat 20 generic ones.",
    "Include the size and industry of client companies to help prospects self-identify.",
  ],
  Agency: [
    "Results-driven case studies with before/after metrics are your strongest asset.",
    "Display the range of industries served to show versatility and breadth.",
    "Feature long-term client relationships (e.g., '5+ year partnership') to show retention.",
    "Highlight awards and recognitions from industry bodies for competitive differentiation.",
  ],
  Consulting: [
    "Publish frameworks and methodologies to demonstrate expertise before the engagement.",
    "Speaking engagements and conference presentations serve as powerful social proof.",
    "Use detailed client outcome stories rather than brief testimonial quotes.",
    "Professional association memberships and advisory board positions add credibility.",
  ],
};

/* ------------------------------------------------------------------ */
/*  90-Day Timeline                                                    */
/* ------------------------------------------------------------------ */

interface TimelineWeek {
  week: string;
  action: string;
}

function buildTimeline(
  businessType: BusinessType,
  selectedAssets: SocialProofAsset[],
  missingAssets: SocialProofAsset[],
): TimelineWeek[] {
  const timeline: TimelineWeek[] = [];

  /* Weeks 1-2: Audit and foundation */
  timeline.push({
    week: "Week 1-2",
    action: `Audit all existing social proof. Catalog what you already have for: ${selectedAssets.slice(0, 3).join(", ")}. Identify gaps and organize assets in a central folder.`,
  });

  /* Weeks 3-4: Quick wins */
  const topMissing = missingAssets.slice(0, 2);
  timeline.push({
    week: "Week 3-4",
    action: topMissing.length > 0
      ? `Start collecting your highest-priority missing proof: ${topMissing.join(" and ")}. Send initial outreach requests to 5 existing clients.`
      : "Optimize placement of existing social proof on your website. Move proof closer to call-to-action buttons and key decision points.",
  });

  /* Weeks 5-6: Website integration */
  timeline.push({
    week: "Week 5-6",
    action: `Update your website with the social proof you have gathered. For ${businessType} businesses, focus on placing proof on your homepage, service pages, and contact page.`,
  });

  /* Weeks 7-8: Channel expansion */
  timeline.push({
    week: "Week 7-8",
    action: "Incorporate social proof into your email marketing and social media. Add testimonials to email signatures, include case study links in newsletters, and share client wins on social channels.",
  });

  /* Weeks 9-10: Advanced proof */
  timeline.push({
    week: "Week 9-10",
    action: missingAssets.length > 2
      ? `Begin developing: ${missingAssets.slice(2, 4).join(" and ")}. Create a repeatable process for gathering each type on an ongoing basis.`
      : "Create a systematic review/testimonial request process. Automate follow-up emails and make leaving feedback as easy as possible.",
  });

  /* Weeks 11-12: Optimize and measure */
  timeline.push({
    week: "Week 11-12",
    action: "Review the impact of your social proof additions. Track changes in conversion rates, time on page, and inquiry volume. Double down on what is working and adjust placement where needed.",
  });

  return timeline;
}

/* ------------------------------------------------------------------ */
/*  Score calculation                                                   */
/* ------------------------------------------------------------------ */

function calculateScore(
  assets: SocialProofAsset[],
  strengths: Record<StrengthChannel, number>,
): { score: number; label: string; description: string } {
  /* Asset score: each asset is worth up to ~4.2 points (max 50 from 12 assets) */
  const assetScore = Math.min((assets.length / socialProofAssets.length) * 50, 50);

  /* Strength score: average of all channel ratings scaled to 50 */
  const values = Object.values(strengths);
  const avgStrength = values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0;
  const strengthScore = (avgStrength / 5) * 50;

  const total = Math.round(assetScore + strengthScore);

  let label: string;
  let description: string;

  if (total >= 80) {
    label = "Strong";
    description = "You have a solid social proof foundation. Focus on optimizing placement and keeping your proof fresh and up to date.";
  } else if (total >= 60) {
    label = "Good";
    description = "You have meaningful social proof in place. Filling the gaps identified below will significantly strengthen your credibility.";
  } else if (total >= 40) {
    label = "Developing";
    description = "You have some social proof but significant opportunities remain. Prioritize the recommendations below to build trust faster.";
  } else if (total >= 20) {
    label = "Early Stage";
    description = "Your social proof is limited. Start with the quick-win actions in the timeline below to build a foundation.";
  } else {
    label = "Getting Started";
    description = "You are at the beginning of your social proof journey. The plan below gives you a clear path to build credibility from scratch.";
  }

  return { score: total, label, description };
}

/* ------------------------------------------------------------------ */
/*  Types of social proof                                              */
/* ------------------------------------------------------------------ */

const socialProofTypes = [
  {
    title: "Expert Social Proof",
    description: "Endorsements, certifications, or recommendations from recognized authorities in your industry. Expert approval signals that your product or service meets professional standards.",
  },
  {
    title: "User Social Proof",
    description: "Reviews, ratings, and testimonials from real customers who have used your product or service. First-hand accounts from peers are among the most trusted forms of proof.",
  },
  {
    title: "Wisdom of the Crowd",
    description: "Large numbers that demonstrate popularity — user counts, download numbers, or subscriber totals. High volume signals that many people have made the same choice.",
  },
  {
    title: "Certification Social Proof",
    description: "Official stamps of approval from recognized organizations, platforms, or standards bodies. Certifications provide objective, third-party validation of quality or expertise.",
  },
  {
    title: "Earned Media",
    description: "Press coverage, media mentions, podcast appearances, and editorial features. Earned media carries weight because it is not paid for or self-published.",
  },
  {
    title: "Visual Proof",
    description: "Before/after images, video testimonials, screenshots, and user-generated content. Visual evidence is processed faster than text and often more persuasive.",
  },
];

/* ------------------------------------------------------------------ */
/*  Strategy result interface                                          */
/* ------------------------------------------------------------------ */

interface StrategyResult {
  score: { score: number; label: string; description: string };
  priorityTypes: SocialProofAsset[];
  placements: { location: string; reasoning: string }[];
  collectionActions: { asset: string; actions: string[] }[];
  tips: string[];
  timeline: TimelineWeek[];
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function SocialProofGuidePage() {
  const [step, setStep] = useState(1);
  const [businessType, setBusinessType] = useState<BusinessType | "">("");
  const [selectedAssets, setSelectedAssets] = useState<SocialProofAsset[]>([]);
  const [strengths, setStrengths] = useState<Record<StrengthChannel, number>>({
    Website: 3,
    "Social media": 3,
    "Email marketing": 3,
    Ads: 3,
    "Sales process": 3,
  });
  const [result, setResult] = useState<StrategyResult | null>(null);

  const toggleAsset = (asset: SocialProofAsset) => {
    setSelectedAssets((prev) =>
      prev.includes(asset) ? prev.filter((a) => a !== asset) : [...prev, asset],
    );
  };

  const setStrength = (channel: StrengthChannel, value: number) => {
    setStrengths((prev) => ({ ...prev, [channel]: value }));
  };

  const canProceedStep1 = businessType !== "";
  const canProceedStep2 = true; /* checkboxes are optional — zero selected means zero assets */
  const canGenerate = businessType !== "";

  const generateStrategy = () => {
    if (!canGenerate) return;
    const bt = businessType as BusinessType;

    const priorities = priorityProofByType[bt];
    const missingAssets = priorities.filter((p) => !selectedAssets.includes(p));
    const priorityTypes = missingAssets.length > 0 ? missingAssets : priorities;

    /* Build placement recommendations from selected + priority assets */
    const relevantAssets = [...new Set([...selectedAssets, ...priorityTypes.slice(0, 3)])];
    const placements: { location: string; reasoning: string }[] = [];
    for (const asset of relevantAssets) {
      const recs = placementRecommendations[asset];
      if (recs) {
        for (const rec of recs) {
          placements.push(rec);
        }
      }
    }

    /* Collection plan for missing or priority assets */
    const assetsToCollect = missingAssets.length > 0 ? missingAssets.slice(0, 4) : priorities.slice(0, 3);
    const collectionActions = assetsToCollect.map((asset) => ({
      asset,
      actions: collectionPlan[asset] || [],
    }));

    const score = calculateScore(selectedAssets, strengths);
    const tips = industryTips[bt];
    const timeline = buildTimeline(bt, selectedAssets, missingAssets);

    setResult({
      score,
      priorityTypes,
      placements,
      collectionActions,
      tips,
      timeline,
    });
  };

  const goToStep = (target: number) => {
    if (target === 1) setStep(1);
    if (target === 2 && canProceedStep1) setStep(2);
    if (target === 3 && canProceedStep1 && canProceedStep2) setStep(3);
  };

  const handleNext = () => {
    if (step === 1 && canProceedStep1) setStep(2);
    else if (step === 2) setStep(3);
    else if (step === 3) {
      generateStrategy();
      setStep(4);
    }
  };

  const handleBack = () => {
    if (step === 4) {
      setResult(null);
      setStep(3);
    } else if (step > 1) {
      setStep(step - 1);
    }
  };

  const restart = () => {
    setStep(1);
    setBusinessType("");
    setSelectedAssets([]);
    setStrengths({
      Website: 3,
      "Social media": 3,
      "Email marketing": 3,
      Ads: 3,
      "Sales process": 3,
    });
    setResult(null);
  };

  return (
    <article>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Social Proof Strategy Builder",
          description:
            "An interactive guide that helps businesses develop their social proof strategy with a scored assessment, priority recommendations, and a 90-day implementation timeline.",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />

      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: "Social Proof Guide" },
        ]}
      />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Social Proof Strategy Builder
            </h1>
            <SectionDesc>
              Build a complete social proof strategy for your business. Answer three short steps to get a scored assessment, priority recommendations, placement guidance, and a 90-day implementation plan.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* Step indicator */}
      {step < 4 && (
        <section className="px-6 lg:px-12 pb-8">
          <div className="max-w-3xl mx-auto">
            <Animate animation="fade-in">
              <div className="flex items-center gap-0">
                {[1, 2, 3].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => goToStep(s)}
                    disabled={
                      (s === 2 && !canProceedStep1) ||
                      (s === 3 && (!canProceedStep1 || !canProceedStep2))
                    }
                    className={`flex-1 py-3 text-base font-bold text-center border transition-colors motion-reduce:transition-none min-h-[44px] focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                      s === step
                        ? "bg-black text-white border-black"
                        : s < step
                          ? "bg-gray-100 text-black border-gray-200 hover:bg-gray-200"
                          : "bg-white text-gray-400 border-gray-200 cursor-not-allowed"
                    }`}
                  >
                    Step {s}
                  </button>
                ))}
              </div>
            </Animate>
          </div>
        </section>
      )}

      {/* Step 1: Business Type */}
      {step === 1 && (
        <section className="px-6 lg:px-12 pb-8">
          <div className="max-w-3xl mx-auto space-y-6">
            <Animate animation="fade-up">
              <div>
                <p className="text-base font-bold text-black mb-2">
                  What type of business do you run?
                </p>
                <p className="text-base text-gray-500 mb-6">
                  Select the option that best describes your business model.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {businessTypes.map((bt) => (
                    <button
                      key={bt}
                      type="button"
                      onClick={() => setBusinessType(bt)}
                      aria-pressed={businessType === bt}
                      className={`px-5 py-4 text-base font-bold text-left min-h-[44px] border transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                        businessType === bt
                          ? "bg-black text-white border-black"
                          : "bg-white text-gray-600 border-gray-200 hover:border-black"
                      }`}
                    >
                      {bt}
                    </button>
                  ))}
                </div>
              </div>
            </Animate>

            <Animate animation="fade-up" delay={40}>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!canProceedStep1}
                  className={`px-8 py-4 text-base font-bold min-h-[44px] transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                    canProceedStep1
                      ? "bg-black text-white hover:bg-gray-900"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Next: Select Your Assets
                </button>
              </div>
            </Animate>
          </div>
        </section>
      )}

      {/* Step 2: Social Proof Assets */}
      {step === 2 && (
        <section className="px-6 lg:px-12 pb-8">
          <div className="max-w-3xl mx-auto space-y-6">
            <Animate animation="fade-up">
              <div>
                <p className="text-base font-bold text-black mb-2">
                  What social proof do you currently have?
                </p>
                <p className="text-base text-gray-500 mb-6">
                  Check all the types of social proof your business already uses. Leave unchecked any you do not have yet.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {socialProofAssets.map((asset) => {
                    const checked = selectedAssets.includes(asset);
                    return (
                      <label
                        key={asset}
                        className={`flex items-center gap-3 px-5 py-4 border cursor-pointer min-h-[44px] transition-colors motion-reduce:transition-none focus-within:outline-2 focus-within:outline-black focus-within:outline-offset-2 ${
                          checked
                            ? "bg-black text-white border-black"
                            : "bg-white text-gray-600 border-gray-200 hover:border-black"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleAsset(asset)}
                          className="sr-only"
                        />
                        <span
                          aria-hidden="true"
                          className={`flex-shrink-0 w-5 h-5 border-2 flex items-center justify-center ${
                            checked ? "border-white bg-white" : "border-gray-400 bg-white"
                          }`}
                        >
                          {checked && (
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M2 6L5 9L10 3" stroke="black" strokeWidth="2" strokeLinecap="square" />
                            </svg>
                          )}
                        </span>
                        <span className="text-base font-bold">{asset}</span>
                      </label>
                    );
                  })}
                </div>
                {selectedAssets.length > 0 && (
                  <p className="text-base text-gray-500 mt-4">
                    {selectedAssets.length} of {socialProofAssets.length} types selected
                  </p>
                )}
              </div>
            </Animate>

            <Animate animation="fade-up" delay={40}>
              <div className="flex justify-between gap-4">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-8 py-4 text-base font-bold min-h-[44px] border border-gray-200 text-gray-600 hover:border-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-8 py-4 text-base font-bold min-h-[44px] bg-black text-white hover:bg-gray-900 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  Next: Rate Your Strength
                </button>
              </div>
            </Animate>
          </div>
        </section>
      )}

      {/* Step 3: Strength Ratings */}
      {step === 3 && (
        <section className="px-6 lg:px-12 pb-8">
          <div className="max-w-3xl mx-auto space-y-6">
            <Animate animation="fade-up">
              <div>
                <p className="text-base font-bold text-black mb-2">
                  Rate your social proof strength
                </p>
                <p className="text-base text-gray-500 mb-6">
                  For each channel, rate how well you currently use social proof (1 = not at all, 5 = extensively).
                </p>
                <div className="space-y-6">
                  {strengthChannels.map((channel) => (
                    <div key={channel}>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-base font-bold text-black">{channel}</span>
                        <span className="text-base text-gray-500">{strengths[channel]} / 5</span>
                      </div>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((value) => (
                          <button
                            key={value}
                            type="button"
                            onClick={() => setStrength(channel, value)}
                            aria-label={`Rate ${channel} ${value} out of 5`}
                            className={`flex-1 py-3 text-base font-bold text-center min-h-[44px] border transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                              value <= strengths[channel]
                                ? "bg-black text-white border-black"
                                : "bg-white text-gray-400 border-gray-200 hover:border-black"
                            }`}
                          >
                            {value}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Animate>

            <Animate animation="fade-up" delay={40}>
              <div className="flex justify-between gap-4">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-8 py-4 text-base font-bold min-h-[44px] border border-gray-200 text-gray-600 hover:border-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-8 py-4 text-base font-bold min-h-[44px] bg-black text-white hover:bg-gray-900 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  Generate My Strategy
                </button>
              </div>
            </Animate>
          </div>
        </section>
      )}

      {/* Results */}
      {step === 4 && result && (
        <section className="px-6 lg:px-12 pb-12">
          <div className="max-w-3xl mx-auto space-y-8">
            {/* Actions */}
            <Animate animation="fade-up">
              <div className="flex justify-between gap-4">
                <button
                  type="button"
                  onClick={restart}
                  className="px-6 py-3 text-base font-bold border border-gray-200 text-gray-600 min-h-[44px] hover:border-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  Start Over
                </button>
              </div>
            </Animate>

            {/* Social Proof Score */}
            <Animate animation="fade-up" delay={40}>
              <div className="border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none">
                <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-4">
                  Social Proof Score
                </h2>
                <div className="flex items-center gap-6 mb-4">
                  <div className="text-[clamp(2.5rem,6vw,4rem)] font-extrabold font-[family-name:var(--font-display)] text-black leading-none">
                    {result.score.score}
                  </div>
                  <div>
                    <p className="text-base font-bold text-black">{result.score.label}</p>
                    <p className="text-base text-gray-500">out of 100</p>
                  </div>
                </div>
                {/* Score bar */}
                <div className="w-full h-3 bg-gray-100 mb-4">
                  <div
                    className="h-full bg-black transition-all duration-700 motion-reduce:transition-none"
                    style={{ width: `${result.score.score}%` }}
                  />
                </div>
                <p className="text-base text-gray-600 leading-relaxed">{result.score.description}</p>
              </div>
            </Animate>

            {/* Priority Social Proof Types */}
            <Animate animation="fade-up" delay={80}>
              <div className="border border-gray-200 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none">
                <div className="bg-black text-white p-4">
                  <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold">
                    Priority Social Proof to Develop
                  </h2>
                </div>
                <div className="p-6">
                  <p className="text-base text-gray-500 mb-4">
                    Based on your {businessType} business model and current assets, focus on these types first:
                  </p>
                  <ol className="space-y-3">
                    {result.priorityTypes.map((type, i) => (
                      <li key={type} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-8 h-8 bg-black text-white text-base font-bold flex items-center justify-center">
                          {i + 1}
                        </span>
                        <span className="text-base text-gray-700 pt-1">{type}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </Animate>

            {/* Where to Place Social Proof */}
            <Animate animation="fade-up" delay={120}>
              <div className="border border-gray-200 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none">
                <div className="bg-black text-white p-4">
                  <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold">
                    Where to Place Social Proof on Your Website
                  </h2>
                </div>
                <div className="divide-y divide-gray-100">
                  {result.placements.map((p, i) => (
                    <div key={i} className="p-6">
                      <p className="text-base font-bold text-black mb-2">{p.location}</p>
                      <p className="text-base text-gray-500 leading-relaxed">{p.reasoning}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Animate>

            {/* Collection Plan */}
            <Animate animation="fade-up" delay={160}>
              <div className="border border-gray-200 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none">
                <div className="bg-black text-white p-4">
                  <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold">
                    Social Proof Collection Plan
                  </h2>
                </div>
                <div className="divide-y divide-gray-100">
                  {result.collectionActions.map((item) => (
                    <div key={item.asset} className="p-6">
                      <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black mb-3">
                        {item.asset}
                      </h3>
                      <ul className="space-y-2">
                        {item.actions.map((action, j) => (
                          <li key={j} className="flex items-start gap-3">
                            <span aria-hidden="true" className="flex-shrink-0 mt-1.5 w-2 h-2 bg-black" />
                            <span className="text-base text-gray-600 leading-relaxed">{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </Animate>

            {/* Industry-Specific Tips */}
            <Animate animation="fade-up" delay={200}>
              <div className="border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none">
                <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-4">
                  Tips for {businessType} Businesses
                </h2>
                <ul className="space-y-3">
                  {result.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span aria-hidden="true" className="flex-shrink-0 mt-1.5 w-2 h-2 bg-black" />
                      <span className="text-base text-gray-600 leading-relaxed">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Animate>

            {/* 90-Day Timeline */}
            <Animate animation="fade-up" delay={240}>
              <div className="border border-gray-200 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none">
                <div className="bg-black text-white p-4">
                  <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold">
                    90-Day Implementation Timeline
                  </h2>
                </div>
                <div className="divide-y divide-gray-100">
                  {result.timeline.map((item) => (
                    <div key={item.week} className="p-6 flex gap-6">
                      <div className="flex-shrink-0 w-24">
                        <span className="text-base font-bold text-black">{item.week}</span>
                      </div>
                      <p className="text-base text-gray-600 leading-relaxed">{item.action}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Animate>
          </div>
        </section>
      )}

      {/* Types of Social Proof That Work */}
      <section className="px-6 lg:px-12 py-16">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-black tracking-tight mb-8">
              Types of Social Proof That Work
            </h2>
          </Animate>
          <Stagger stagger={100} animation="fade-up" className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {socialProofTypes.map((type) => (
              <div
                key={type.title}
                className="border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
              >
                <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-3">
                  {type.title}
                </h3>
                <p className="text-base text-gray-500 leading-relaxed">
                  {type.description}
                </p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Need Help Building Your Social Proof?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Our team helps businesses develop social proof strategies, create compelling case studies, and build trust systems that convert visitors into customers.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base min-h-[44px] hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              Get a Social Proof Consultation &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    
      <ToolCTA
        toolName="Social Proof Guide"
        services={[
          { title: "Social Media Marketing", desc: "Strategy, content, and community management across all platforms.", href: "/services/social-media-marketing" },
          { title: "Content Marketing", desc: "Engaging content that builds brand authority and drives engagement.", href: "/services/content-marketing" },
          { title: "Digital Marketing", desc: "Integrated digital strategy connecting social to business results.", href: "/services/digital-marketing" },
        ]}
        relatedTools={[
          { title: "Social Media Planner", href: "/resources/social-media-planner" },
          { title: "Social Media Roi", href: "/resources/social-media-roi" },
          { title: "Social Post Generator", href: "/resources/social-post-generator" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
