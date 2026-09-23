"use client";

import { useState } from "react";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type CampaignType =
  | "welcome"
  | "product-launch"
  | "newsletter"
  | "re-engagement"
  | "promotional"
  | "event";

type AudienceType = "b2b" | "b2c" | "ecommerce" | "saas";

type ListSize = "under-1k" | "1k-5k" | "5k-25k" | "25k-100k" | "100k-plus";

interface EmailStep {
  day: number;
  time: string;
  label: string;
  subjectLines: [string, string, string];
  contentFramework: string[];
}

interface CampaignPlan {
  emailCount: number;
  schedule: EmailStep[];
  expectedOpenRate: string;
  expectedClickRate: string;
  metrics: string[];
  mistakes: string[];
}

/* ------------------------------------------------------------------ */
/*  Option definitions                                                 */
/* ------------------------------------------------------------------ */

const campaignTypes: { id: CampaignType; label: string; desc: string }[] = [
  { id: "welcome", label: "Welcome Series", desc: "New subscriber onboarding" },
  { id: "product-launch", label: "Product Launch", desc: "New offering announcement" },
  { id: "newsletter", label: "Newsletter", desc: "Regular content digest" },
  { id: "re-engagement", label: "Re-engagement", desc: "Inactive subscriber reactivation" },
  { id: "promotional", label: "Promotional", desc: "Sale or discount announcement" },
  { id: "event", label: "Event Invitation", desc: "Webinar, conference, or meetup" },
];

const audienceTypes: { id: AudienceType; label: string }[] = [
  { id: "b2b", label: "B2B Professionals" },
  { id: "b2c", label: "B2C Consumers" },
  { id: "ecommerce", label: "E-commerce Shoppers" },
  { id: "saas", label: "SaaS Users" },
];

const listSizes: { id: ListSize; label: string }[] = [
  { id: "under-1k", label: "Under 1,000" },
  { id: "1k-5k", label: "1,000 - 5,000" },
  { id: "5k-25k", label: "5,000 - 25,000" },
  { id: "25k-100k", label: "25,000 - 100,000" },
  { id: "100k-plus", label: "100,000+" },
];

/* ------------------------------------------------------------------ */
/*  Industry benchmarks                                                */
/* ------------------------------------------------------------------ */

const industryBenchmarks: { industry: string; openRate: string; clickRate: string; unsubRate: string }[] = [
  { industry: "SaaS / Technology", openRate: "21.3%", clickRate: "2.5%", unsubRate: "0.20%" },
  { industry: "E-commerce / Retail", openRate: "18.4%", clickRate: "2.0%", unsubRate: "0.25%" },
  { industry: "Healthcare", openRate: "23.5%", clickRate: "3.0%", unsubRate: "0.17%" },
  { industry: "Financial Services", openRate: "20.2%", clickRate: "2.3%", unsubRate: "0.22%" },
  { industry: "Education", openRate: "25.1%", clickRate: "3.4%", unsubRate: "0.15%" },
  { industry: "Real Estate", openRate: "19.8%", clickRate: "1.9%", unsubRate: "0.28%" },
  { industry: "Agency / Marketing", openRate: "17.6%", clickRate: "2.1%", unsubRate: "0.30%" },
  { industry: "Nonprofits", openRate: "26.6%", clickRate: "3.7%", unsubRate: "0.13%" },
  { industry: "Media / Publishing", openRate: "22.0%", clickRate: "2.8%", unsubRate: "0.18%" },
  { industry: "Professional Services", openRate: "20.9%", clickRate: "2.4%", unsubRate: "0.21%" },
];

/* ------------------------------------------------------------------ */
/*  Plan data — one plan per (campaignType, audienceType) combo        */
/*  listSize adjusts the benchmarks shown, not the plan structure      */
/* ------------------------------------------------------------------ */

function buildPlan(campaign: CampaignType, audience: AudienceType, listSize: ListSize): CampaignPlan {
  const plans = getPlanData(campaign, audience);
  const rates = adjustRates(plans.expectedOpenRate, plans.expectedClickRate, listSize);
  return { ...plans, ...rates };
}

function adjustRates(
  baseOpen: string,
  baseClick: string,
  listSize: ListSize
): { expectedOpenRate: string; expectedClickRate: string } {
  const multipliers: Record<ListSize, number> = {
    "under-1k": 1.15,
    "1k-5k": 1.05,
    "5k-25k": 1.0,
    "25k-100k": 0.92,
    "100k-plus": 0.85,
  };
  const m = multipliers[listSize];
  const openNum = parseFloat(baseOpen);
  const clickNum = parseFloat(baseClick);
  return {
    expectedOpenRate: (openNum * m).toFixed(1) + "%",
    expectedClickRate: (clickNum * m).toFixed(1) + "%",
  };
}

/* ------------------------------------------------------------------ */
/*  Core plan templates                                                */
/* ------------------------------------------------------------------ */

function getPlanData(
  campaign: CampaignType,
  audience: AudienceType
): CampaignPlan {
  const audienceLabel: Record<AudienceType, string> = {
    b2b: "professional",
    b2c: "customer",
    ecommerce: "shopper",
    saas: "user",
  };
  const a = audienceLabel[audience];

  /* ---------- WELCOME SERIES ---------- */
  if (campaign === "welcome") {
    return {
      emailCount: 5,
      schedule: [
        {
          day: 0,
          time: "Immediately after signup",
          label: "Welcome and brand introduction",
          subjectLines: [
            `Welcome aboard — here is what to expect`,
            `You are in! Your quick-start guide is inside`,
            `Thanks for joining — let us get you started`,
          ],
          contentFramework: [
            "Thank the subscriber and confirm their signup",
            "Set expectations: what they will receive and how often",
            "Share a quick win or most popular resource",
            `Include a brief brand story tailored to ${a} interests`,
          ],
        },
        {
          day: 1,
          time: audience === "b2b" ? "Tuesday 10:00 AM" : "Day 1, 11:00 AM",
          label: "Value delivery",
          subjectLines: [
            `Your first insider resource is here`,
            `The one thing every ${a} should know`,
            `Start here: our most-shared guide`,
          ],
          contentFramework: [
            "Deliver your highest-value free resource or guide",
            "Explain why this resource matters for them specifically",
            "Include a single clear call to action",
          ],
        },
        {
          day: 3,
          time: audience === "b2b" ? "Wednesday 9:00 AM" : "Day 3, 10:00 AM",
          label: "Social proof and trust",
          subjectLines: [
            `See what others are saying`,
            `Real results from real ${a}s`,
            `Why thousands trust us — the proof`,
          ],
          contentFramework: [
            "Share 2-3 testimonials or case study highlights",
            "Include specific numbers and outcomes",
            "Add a secondary CTA to explore more success stories",
          ],
        },
        {
          day: 5,
          time: audience === "b2b" ? "Thursday 10:00 AM" : "Day 5, 12:00 PM",
          label: "Feature or product education",
          subjectLines: [
            `3 features you have not tried yet`,
            `Getting more from your account`,
            `Quick tips to level up your experience`,
          ],
          contentFramework: [
            "Highlight 2-3 key features or product benefits",
            "Use visuals or GIFs to demonstrate functionality",
            "Link to help docs or tutorial videos",
          ],
        },
        {
          day: 7,
          time: audience === "b2b" ? "Friday 9:00 AM" : "Day 7, 10:00 AM",
          label: "Conversion or next step",
          subjectLines: [
            `Ready for the next step?`,
            `Your exclusive offer inside`,
            `Let us take this further — here is how`,
          ],
          contentFramework: [
            "Present a clear upgrade, booking, or purchase CTA",
            "Reiterate the key value proposition",
            "Include a time-sensitive incentive if appropriate",
            "Provide an easy way to reply with questions",
          ],
        },
      ],
      expectedOpenRate: "45.0",
      expectedClickRate: "8.0",
      metrics: [
        "Open rate per email in the series",
        "Click-through rate per email",
        "Series completion rate",
        "Conversion rate from welcome to first purchase or action",
        "Unsubscribe rate during the series",
        "Time to first conversion",
      ],
      mistakes: [
        "Sending too many emails too quickly — space them out over 7 to 10 days",
        "Failing to set expectations about email frequency and content",
        "Making the first email about selling instead of welcoming",
        "Not segmenting the welcome flow based on signup source",
        "Using a generic sender name instead of a real person",
      ],
    };
  }

  /* ---------- PRODUCT LAUNCH ---------- */
  if (campaign === "product-launch") {
    return {
      emailCount: 4,
      schedule: [
        {
          day: -7,
          time: audience === "b2b" ? "Tuesday 9:00 AM" : "Monday 10:00 AM",
          label: "Teaser and anticipation",
          subjectLines: [
            `Something big is coming next week`,
            `You are going to want to see this`,
            `Mark your calendar — big announcement ahead`,
          ],
          contentFramework: [
            "Hint at the upcoming launch without revealing full details",
            "Create curiosity with a single compelling benefit",
            "Invite them to reply with guesses or questions",
            "Include a countdown or save-the-date element",
          ],
        },
        {
          day: -1,
          time: audience === "b2b" ? "Wednesday 10:00 AM" : "Day before, 11:00 AM",
          label: "Pre-launch exclusive",
          subjectLines: [
            `Tomorrow is the day — early access for you`,
            `Sneak peek: here is what is launching tomorrow`,
            `Be the first to know — launch details inside`,
          ],
          contentFramework: [
            "Reveal the product name and core value proposition",
            "Offer early access or a waitlist spot",
            "Share one key feature that solves a specific pain point",
            "Build urgency with limited-time launch pricing",
          ],
        },
        {
          day: 0,
          time: audience === "b2b" ? "Thursday 8:00 AM" : "Launch day, 9:00 AM",
          label: "Launch announcement",
          subjectLines: [
            `It is here — introducing [Product Name]`,
            `Now live: the solution you have been waiting for`,
            `Launch day! Get [Product Name] now`,
          ],
          contentFramework: [
            "Announce the product with a strong hero image or video",
            "List 3-5 key benefits with brief descriptions",
            "Include social proof if available (beta testers, early reviews)",
            "Add a prominent CTA button for purchase or signup",
            "Mention any launch-day bonuses or limited offers",
          ],
        },
        {
          day: 3,
          time: audience === "b2b" ? "Monday 10:00 AM" : "3 days post-launch, 10:00 AM",
          label: "Follow-up and social proof",
          subjectLines: [
            `Already [number] ${a}s have joined — here is why`,
            `What people are saying about [Product Name]`,
            `Last chance for launch pricing`,
          ],
          contentFramework: [
            "Share early results and testimonials",
            "Address the top 2-3 objections or FAQs",
            "Remind them of launch pricing deadline if applicable",
            "Include a case study or use case relevant to their needs",
          ],
        },
      ],
      expectedOpenRate: "28.0",
      expectedClickRate: "5.5",
      metrics: [
        "Pre-launch email open and click rates",
        "Waitlist signups from teaser emails",
        "Launch day sales or signups",
        "Revenue per email sent",
        "Forward and share rate",
        "Post-launch engagement with follow-up",
      ],
      mistakes: [
        "Building hype without delivering — make sure the product justifies the buildup",
        "Sending the launch email only once — not everyone opens the first email",
        "Focusing on features instead of benefits and outcomes",
        "Not having a clear, single CTA in the launch email",
        "Ignoring mobile formatting — most opens happen on phones",
      ],
    };
  }

  /* ---------- NEWSLETTER ---------- */
  if (campaign === "newsletter") {
    return {
      emailCount: 1,
      schedule: [
        {
          day: 0,
          time: audience === "b2b" ? "Tuesday or Thursday 9:00 AM" : "Saturday 10:00 AM",
          label: "Weekly or bi-weekly content digest",
          subjectLines: [
            `This week: [Topic] + [Topic] + a quick tip`,
            `[Number] insights you missed this week`,
            `Your [Brand] weekly briefing — [Date]`,
          ],
          contentFramework: [
            "Lead with the most valuable or timely piece of content",
            "Include 3-5 content items with brief 1-2 sentence summaries",
            "Add a personal note or industry observation from the team",
            "Feature one curated external resource for added value",
            "End with a single CTA or question to drive replies",
            "Keep total length scannable — aim for under 500 words",
          ],
        },
      ],
      expectedOpenRate: "22.0",
      expectedClickRate: "3.0",
      metrics: [
        "Open rate trend over time",
        "Click-through rate per content item",
        "Most-clicked content category",
        "Unsubscribe rate per send",
        "Reply rate and subscriber feedback",
        "List growth rate vs. churn rate",
      ],
      mistakes: [
        "Inconsistent sending schedule — pick a day and stick with it",
        "Making every issue feel the same — vary the lead story and format",
        "Including too many links — five to seven is the sweet spot",
        "Writing subject lines that do not reflect the actual content",
        "Not segmenting by interest or engagement level",
      ],
    };
  }

  /* ---------- RE-ENGAGEMENT ---------- */
  if (campaign === "re-engagement") {
    return {
      emailCount: 3,
      schedule: [
        {
          day: 0,
          time: audience === "b2b" ? "Tuesday 10:00 AM" : "Wednesday 11:00 AM",
          label: "We miss you",
          subjectLines: [
            `It has been a while — here is what you have missed`,
            `We noticed you have been quiet`,
            `Still interested? We have something for you`,
          ],
          contentFramework: [
            "Acknowledge their absence without being guilt-trippy",
            `Highlight 2-3 new things since they last engaged`,
            "Include a compelling reason to come back",
            "Keep the tone friendly and low-pressure",
          ],
        },
        {
          day: 4,
          time: audience === "b2b" ? "Thursday 9:00 AM" : "4 days later, 10:00 AM",
          label: "Incentive or value reminder",
          subjectLines: [
            `A special offer just for you`,
            `We want you back — here is 20% off`,
            `Your exclusive comeback offer expires soon`,
          ],
          contentFramework: [
            "Present a specific incentive (discount, free resource, bonus)",
            "Remind them of the core value they originally signed up for",
            "Include a single, clear CTA",
            "Set a deadline to create gentle urgency",
          ],
        },
        {
          day: 10,
          time: audience === "b2b" ? "Tuesday 10:00 AM" : "10 days later, 11:00 AM",
          label: "Last chance before removal",
          subjectLines: [
            `Should we remove you from our list?`,
            `Last email from us unless you say stay`,
            `One click to stay — or we will say goodbye`,
          ],
          contentFramework: [
            "Be direct: this is the final email unless they re-opt-in",
            "Include a prominent 'Keep me subscribed' button",
            "Briefly restate what they will continue receiving",
            "Make unsubscribing easy and respectful",
          ],
        },
      ],
      expectedOpenRate: "18.0",
      expectedClickRate: "2.5",
      metrics: [
        "Re-engagement rate (% who clicked or opened)",
        "Win-back conversion rate",
        "List cleanup rate (unsubscribes + removals)",
        "Revenue from re-engaged subscribers",
        "Open rate improvement on remaining list after cleanup",
        "Time since last engagement before re-engagement attempt",
      ],
      mistakes: [
        "Waiting too long to re-engage — 60 to 90 days of inactivity is the sweet spot",
        "Making the unsubscribe process difficult or hidden",
        "Sending re-engagement to your entire list instead of truly inactive contacts",
        "Not cleaning your list after the sequence — remove non-responders",
        "Using a guilt-heavy tone instead of providing genuine value",
      ],
    };
  }

  /* ---------- PROMOTIONAL ---------- */
  if (campaign === "promotional") {
    return {
      emailCount: 3,
      schedule: [
        {
          day: 0,
          time: audience === "ecommerce" ? "Thursday 8:00 AM" : "Tuesday 10:00 AM",
          label: "Promotion announcement",
          subjectLines: [
            `[X]% off everything — this week only`,
            `Our biggest sale of the season starts now`,
            `You have been waiting for this — sale is live`,
          ],
          contentFramework: [
            "Lead with the offer — put the discount or deal front and center",
            "Set clear start and end dates for the promotion",
            "Highlight 3-5 popular items or categories",
            "Include a prominent CTA button above the fold",
            "Add terms and conditions in small text at the bottom",
          ],
        },
        {
          day: 2,
          time: audience === "ecommerce" ? "Saturday 9:00 AM" : "Thursday 10:00 AM",
          label: "Reminder with social proof",
          subjectLines: [
            `Selling fast — have you grabbed yours yet?`,
            `Thousands have already saved — your turn`,
            `Do not forget: [X]% off ends soon`,
          ],
          contentFramework: [
            "Remind them of the offer with urgency",
            "Show what is selling fast or most popular",
            "Include 1-2 customer reviews or ratings",
            "Add a countdown timer or explicit deadline",
          ],
        },
        {
          day: 4,
          time: audience === "ecommerce" ? "Monday 7:00 AM" : "Saturday 9:00 AM",
          label: "Last chance",
          subjectLines: [
            `Final hours — sale ends at midnight`,
            `Last call: your [X]% off expires today`,
            `Closing soon — grab your deal before it is gone`,
          ],
          contentFramework: [
            "Create strong urgency — this is the final email",
            "Restate the offer one more time clearly",
            "Show the top 3 items they might have missed",
            "Use a final, decisive CTA: 'Shop now before midnight'",
          ],
        },
      ],
      expectedOpenRate: "20.0",
      expectedClickRate: "3.5",
      metrics: [
        "Revenue per email sent",
        "Conversion rate from email to purchase",
        "Average order value during promotion",
        "Coupon or discount code redemption rate",
        "Unsubscribe rate during promotional period",
        "Revenue comparison: promotional vs. regular sends",
      ],
      mistakes: [
        "Running promotions too frequently — subscribers tune out if everything is always on sale",
        "Burying the offer below a long introduction",
        "Not segmenting: send different offers to high-value vs. first-time buyers",
        "Forgetting to test the discount code before sending",
        "Sending the last-chance email after the sale has ended",
      ],
    };
  }

  /* ---------- EVENT INVITATION ---------- */
  return {
    emailCount: 4,
    schedule: [
      {
        day: -14,
        time: audience === "b2b" ? "Tuesday 9:00 AM" : "Monday 10:00 AM",
        label: "Save the date",
        subjectLines: [
          `Save the date: [Event Name] on [Date]`,
          `You are invited — [Event Name] is happening`,
          `Mark your calendar for [Event Name]`,
        ],
        contentFramework: [
          "Announce the event with date, time, and format (virtual or in-person)",
          "Share the key value proposition — why should they attend?",
          "Highlight 1-2 speakers or key agenda items",
          "Include an early registration CTA",
          "Mention any early-bird pricing or limited seats",
        ],
      },
      {
        day: -7,
        time: audience === "b2b" ? "Wednesday 10:00 AM" : "Tuesday 11:00 AM",
        label: "Speaker and agenda details",
        subjectLines: [
          `Meet the speakers at [Event Name]`,
          `Here is what you will learn at [Event Name]`,
          `The full agenda for [Event Name] is here`,
        ],
        contentFramework: [
          "Share the complete agenda or session list",
          "Include speaker bios with photos",
          "Highlight the most anticipated session or workshop",
          "Add a registration CTA with seat count if applicable",
        ],
      },
      {
        day: -1,
        time: audience === "b2b" ? "Thursday 8:00 AM" : "Day before, 9:00 AM",
        label: "Tomorrow reminder",
        subjectLines: [
          `Tomorrow: [Event Name] — everything you need to know`,
          `See you tomorrow! Here are the details`,
          `Your [Event Name] prep guide`,
        ],
        contentFramework: [
          "Confirm all logistics: time, link or venue, what to bring",
          "Share any prep materials or pre-event resources",
          "Build excitement with a personal note from the host",
          "Include calendar invite link and add-to-calendar button",
        ],
      },
      {
        day: 1,
        time: audience === "b2b" ? "Friday 10:00 AM" : "Day after, 10:00 AM",
        label: "Post-event follow-up",
        subjectLines: [
          `Thanks for attending — recording and resources inside`,
          `[Event Name] recap: slides, recording, and next steps`,
          `You made [Event Name] great — here is what is next`,
        ],
        contentFramework: [
          "Thank attendees and share the recording or slides",
          "Include key takeaways or a summary of highlights",
          "Provide links to mentioned resources or tools",
          "Include a CTA for the next event or related offering",
          "Ask for feedback with a short 2-3 question survey",
        ],
      },
    ],
    expectedOpenRate: "30.0",
    expectedClickRate: "5.0",
    metrics: [
      "Registration rate from email invitations",
      "Attendance rate (registered vs. showed up)",
      "Email open rate per send in the sequence",
      "Post-event survey response rate",
      "Conversion from attendee to customer or next action",
      "Social shares and forwards of the invitation",
    ],
    mistakes: [
      "Not sending a reminder the day before — attendance drops significantly without one",
      "Overloading the invitation email with too many details",
      "Failing to follow up after the event — this is where conversions happen",
      "Not segmenting by past attendees vs. first-timers",
      "Forgetting to include timezone information for virtual events",
    ],
  };
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function EmailCampaignPlannerPage() {
  const [campaignType, setCampaignType] = useState<CampaignType | null>(null);
  const [audienceType, setAudienceType] = useState<AudienceType | null>(null);
  const [listSize, setListSize] = useState<ListSize | null>(null);
  const [plan, setPlan] = useState<CampaignPlan | null>(null);
  const [copied, setCopied] = useState(false);

  const canGenerate = campaignType && audienceType && listSize;

  const generate = () => {
    if (!campaignType || !audienceType || !listSize) return;
    setPlan(buildPlan(campaignType, audienceType, listSize));
  };

  const formatPlanAsText = (): string => {
    if (!plan || !campaignType || !audienceType || !listSize) return "";

    const typeLabel = campaignTypes.find((c) => c.id === campaignType)?.label ?? "";
    const audLabel = audienceTypes.find((a) => a.id === audienceType)?.label ?? "";
    const sizeLabel = listSizes.find((s) => s.id === listSize)?.label ?? "";

    let text = `EMAIL CAMPAIGN PLAN\n`;
    text += `====================\n\n`;
    text += `Campaign Type: ${typeLabel}\n`;
    text += `Audience: ${audLabel}\n`;
    text += `List Size: ${sizeLabel}\n`;
    text += `Total Emails: ${plan.emailCount}\n`;
    text += `Expected Open Rate: ${plan.expectedOpenRate}\n`;
    text += `Expected Click Rate: ${plan.expectedClickRate}\n\n`;

    plan.schedule.forEach((email, i) => {
      text += `--- Email ${i + 1}: ${email.label} ---\n`;
      text += `Send: Day ${email.day} at ${email.time}\n\n`;
      text += `Subject Line Options:\n`;
      email.subjectLines.forEach((s, j) => {
        text += `  ${j + 1}. ${s}\n`;
      });
      text += `\nContent Framework:\n`;
      email.contentFramework.forEach((c) => {
        text += `  - ${c}\n`;
      });
      text += `\n`;
    });

    text += `KEY METRICS TO TRACK\n`;
    text += `--------------------\n`;
    plan.metrics.forEach((m) => {
      text += `  - ${m}\n`;
    });

    text += `\nCOMMON MISTAKES TO AVOID\n`;
    text += `------------------------\n`;
    plan.mistakes.forEach((m) => {
      text += `  - ${m}\n`;
    });

    return text;
  };

  const copyPlan = async () => {
    const text = formatPlanAsText();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* Fallback for older browsers */
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const stepComplete = (n: number) => {
    if (n === 1) return !!campaignType;
    if (n === 2) return !!audienceType;
    if (n === 3) return !!listSize;
    return false;
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Email Campaign Planner",
          description: "Plan your email campaign with recommended sequences, subject lines, send timing, and success metrics for any campaign type and audience.",
          url: "https://themarkitmedia.com/en/resources/email-campaign-planner",
          applicationCategory: "Email Marketing Tool",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          provider: { "@type": "Organization", name: "Markit Media", url: "https://themarkitmedia.com" },
        }) }}
      />
      
      {/* Related Tools */}
      <section className="px-6 lg:px-12 py-12" aria-label="Related tools">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">Related Tools</h2>
          <div className="flex flex-wrap gap-3">
                <Link href="/resources/email-subject-tester" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Email Subject Tester</Link>
                <Link href="/resources/email-roi-calculator" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Email ROI Calculator</Link>
                <Link href="/resources/email-sequence-planner" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Email Sequence Planner</Link>
                <Link href="/resources/email-deliverability" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Email Deliverability</Link>
          </div>
        </div>
      </section>
<JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Email Campaign Planner",
          description:
            "Plan your email campaign with recommended sequences, subject lines, send timing, and success metrics for any campaign type and audience.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />

      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Email Campaign Planner" },
        ]}
      />

      {/* ---- Hero ---- */}
      <section aria-label="Free Tool" className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Email Campaign Planner
            </h1>
            <SectionDesc>
              Select your campaign type, audience, and list size to get a complete campaign plan with subject line templates, send timing, content frameworks, and success metrics.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* ---- Step 1: Campaign Type ---- */}
      <section aria-label="Content section" className="px-6 lg:px-12 pb-8">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <div className="flex items-center gap-3 mb-4">
              <span
                className={`inline-flex items-center justify-center w-8 h-8 text-base font-bold transition-colors motion-reduce:transition-none ${
                  stepComplete(1) ? "bg-black text-white" : "border border-gray-300 text-gray-500"
                }`}
              >
                1
              </span>
              <p className="text-base font-bold text-black">Select Campaign Type</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {campaignTypes.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setCampaignType(c.id);
                    setPlan(null);
                  }}
                  className={`text-left px-5 py-4 border transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                    campaignType === c.id
                      ? "bg-black text-white border-black"
                      : "border-gray-200 text-black hover:border-black"
                  }`}
                >
                  <span className="block text-base font-bold">{c.label}</span>
                  <span
                    className={`block text-base mt-1 ${
                      campaignType === c.id ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    {c.desc}
                  </span>
                </button>
              ))}
            </div>
          </Animate>
        </div>
      </section>

      {/* ---- Step 2: Audience Type ---- */}
      <section aria-label="Content section" className="px-6 lg:px-12 pb-8">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up" delay={40}>
            <div className="flex items-center gap-3 mb-4">
              <span
                className={`inline-flex items-center justify-center w-8 h-8 text-base font-bold transition-colors motion-reduce:transition-none ${
                  stepComplete(2) ? "bg-black text-white" : "border border-gray-300 text-gray-500"
                }`}
              >
                2
              </span>
              <p className="text-base font-bold text-black">Select Audience Type</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {audienceTypes.map((a) => (
                <button
                  key={a.id}
                  onClick={() => {
                    setAudienceType(a.id);
                    setPlan(null);
                  }}
                  className={`px-5 py-3 text-base font-bold border transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                    audienceType === a.id
                      ? "bg-black text-white border-black"
                      : "border-gray-200 text-gray-600 hover:border-black"
                  }`}
                >
                  {a.label}
                </button>
              ))}
            </div>
          </Animate>
        </div>
      </section>

      {/* ---- Step 3: List Size ---- */}
      <section aria-label="Content section" className="px-6 lg:px-12 pb-8">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up" delay={80}>
            <div className="flex items-center gap-3 mb-4">
              <span
                className={`inline-flex items-center justify-center w-8 h-8 text-base font-bold transition-colors motion-reduce:transition-none ${
                  stepComplete(3) ? "bg-black text-white" : "border border-gray-300 text-gray-500"
                }`}
              >
                3
              </span>
              <p className="text-base font-bold text-black">Select List Size</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {listSizes.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setListSize(s.id);
                    setPlan(null);
                  }}
                  className={`px-5 py-3 text-base font-bold border transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                    listSize === s.id
                      ? "bg-black text-white border-black"
                      : "border-gray-200 text-gray-600 hover:border-black"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </Animate>
        </div>
      </section>

      {/* ---- Generate Button ---- */}
      <section aria-label="Content section" className="px-6 lg:px-12 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up" delay={120}>
            <button
              onClick={generate}
              disabled={!canGenerate}
              className={`px-8 py-4 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                canGenerate
                  ? "bg-black text-white hover:bg-gray-900"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Generate Campaign Plan
            </button>
          </Animate>
        </div>
      </section>

      {/* ---- Generated Plan ---- */}
      {plan && (
        <section aria-label="Generated campaign plan" className="px-6 lg:px-12 pb-16">
          <div className="max-w-3xl mx-auto">
            <Animate animation="fade-up">
              <div className="border border-gray-200 overflow-hidden">
                {/* Plan header */}
                <div className="bg-black text-white p-6">
                  <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold">
                    Your{" "}
                    {campaignTypes.find((c) => c.id === campaignType)?.label} Campaign Plan
                  </h2>
                  <p className="text-base text-gray-300 mt-2">
                    {audienceTypes.find((a) => a.id === audienceType)?.label} &middot;{" "}
                    {listSizes.find((s) => s.id === listSize)?.label} subscribers &middot;{" "}
                    {plan.emailCount} email{plan.emailCount > 1 ? "s" : ""}
                  </p>
                </div>

                {/* Benchmark bar */}
                <div className="border-b border-gray-200 p-6 bg-gray-50">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-base text-gray-500">Expected Open Rate</p>
                      <p className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black font-[family-name:var(--font-display)]">
                        {plan.expectedOpenRate}
                      </p>
                    </div>
                    <div>
                      <p className="text-base text-gray-500">Expected Click Rate</p>
                      <p className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black font-[family-name:var(--font-display)]">
                        {plan.expectedClickRate}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Email sequence */}
                <div className="divide-y divide-gray-200">
                  {plan.schedule.map((email, i) => (
                    <div key={i} className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-black text-white text-base font-bold shrink-0">
                          {i + 1}
                        </span>
                        <div>
                          <p className="text-base font-bold text-black">{email.label}</p>
                          <p className="text-base text-gray-500 mt-1">
                            Day {email.day} &middot; {email.time}
                          </p>
                        </div>
                      </div>

                      <div className="ml-12">
                        <p className="text-base font-bold text-black mb-2">Subject Line Options</p>
                        <div className="space-y-2 mb-4">
                          {email.subjectLines.map((s, j) => (
                            <div key={j} className="p-3 bg-gray-50 border border-gray-200">
                              <p className="text-base text-black">{s}</p>
                            </div>
                          ))}
                        </div>

                        <p className="text-base font-bold text-black mb-2">Content Framework</p>
                        <ul className="space-y-1">
                          {email.contentFramework.map((c, j) => (
                            <li key={j} className="text-base text-gray-600 flex gap-2">
                              <span className="shrink-0">&bull;</span>
                              <span>{c}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Metrics */}
                <div className="border-t border-gray-200 p-6">
                  <h3 className="text-base font-bold text-black mb-3">Key Metrics to Track</h3>
                  <ul className="space-y-1">
                    {plan.metrics.map((m, i) => (
                      <li key={i} className="text-base text-gray-600 flex gap-2">
                        <span className="shrink-0">&bull;</span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Mistakes */}
                <div className="border-t border-gray-200 p-6">
                  <h3 className="text-base font-bold text-black mb-3">Common Mistakes to Avoid</h3>
                  <ul className="space-y-1">
                    {plan.mistakes.map((m, i) => (
                      <li key={i} className="text-base text-gray-600 flex gap-2">
                        <span className="shrink-0">&bull;</span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Copy button */}
                <div className="border-t border-gray-200 p-6">
                  <button
                    onClick={copyPlan}
                    className="bg-black text-white px-8 py-4 text-base font-bold hover:bg-gray-900 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                  >
                    {copied ? "Copied to Clipboard" : "Copy Full Plan to Clipboard"}
                  </button>
                </div>
              </div>
            </Animate>
          </div>
        </section>
      )}

      {/* ---- Educational Section ---- */}
      <section aria-label="Email Marketing Benchmarks by Industry" className="px-6 lg:px-12 py-16 border-t border-gray-200">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-black tracking-tight mb-4">
              Email Marketing Fundamentals
            </h2>
            <p className="text-lg text-gray-500 leading-relaxed mb-8">
              Industry benchmarks to help you set realistic goals and measure your email marketing performance.
            </p>

            <div className="border border-gray-200 overflow-hidden">
              <div className="bg-black text-white p-4">
                <h3 className="text-base font-bold">Email Marketing Benchmarks by Industry</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="px-4 py-3 text-base font-bold text-black">Industry</th>
                      <th className="px-4 py-3 text-base font-bold text-black">Open Rate</th>
                      <th className="px-4 py-3 text-base font-bold text-black">Click Rate</th>
                      <th className="px-4 py-3 text-base font-bold text-black">Unsub Rate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {industryBenchmarks.map((row, i) => (
                      <tr key={i} className={i % 2 === 1 ? "bg-gray-50" : ""}>
                        <td className="px-4 py-3 text-base text-black font-bold">{row.industry}</td>
                        <td className="px-4 py-3 text-base text-gray-600">{row.openRate}</td>
                        <td className="px-4 py-3 text-base text-gray-600">{row.clickRate}</td>
                        <td className="px-4 py-3 text-base text-gray-600">{row.unsubRate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-10 space-y-6 text-base text-gray-500 leading-relaxed">
              <div>
                <h3 className="font-bold text-black mb-2">List hygiene matters more than list size</h3>
                <p>
                  A smaller, engaged list outperforms a large, stale one. Remove inactive subscribers every 90 days to maintain high deliverability and engagement rates. Clean lists see 15-25% higher open rates on average.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-black mb-2">Subject lines drive opens, content drives clicks</h3>
                <p>
                  Spend as much time on your subject line as you do on the email body. Keep subject lines under 50 characters for mobile, use personalization when possible, and always A/B test your top two options.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-black mb-2">Timing depends on your audience</h3>
                <p>
                  B2B emails perform best Tuesday through Thursday, 9-11 AM in the recipient&apos;s timezone. B2C emails often perform well on weekends. The best approach is to test send times over 4-6 weeks with your specific list.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-black mb-2">One email, one goal</h3>
                <p>
                  Every email should have a single primary call to action. Emails with one CTA see 371% more clicks than those with multiple competing actions. If you have more to say, send another email.
                </p>
              </div>
            </div>
          </Animate>
        </div>
      </section>

      {/* ---- CTA Section ---- */}
      <section aria-label="Call to action" className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Need Expert Email Marketing?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Our team builds and manages high-performing email campaigns — from strategy and copywriting to automation and analytics.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/services/email-marketing"
                className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              >
                Email Marketing Services &rarr;
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 border border-white text-white px-10 py-5 font-bold text-base hover:bg-white hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              >
                Contact Us &rarr;
              </Link>
            </div>
          </Animate>
        </div>
      </section>
    
      <ToolCTA
        toolName="Email Campaign Planner"
        services={[
          { title: "Digital Marketing", desc: "Email marketing integrated with your broader growth strategy.", href: "/services/digital-marketing" },
          { title: "Content Marketing", desc: "Compelling email content that nurtures leads into customers.", href: "/services/content-marketing" },
          { title: "Performance Marketing", desc: "Paid campaigns that fill your email funnel with qualified leads.", href: "/services/performance-marketing" },
        ]}
        relatedTools={[
          { title: "Email Deliverability", href: "/resources/email-deliverability" },
          { title: "Email Health Checker", href: "/resources/email-health-checker" },
          { title: "Email Roi Calculator", href: "/resources/email-roi-calculator" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
