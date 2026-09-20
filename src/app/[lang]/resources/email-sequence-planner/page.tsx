"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

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

interface EmailPlan {
  emailNumber: number;
  sendTiming: string;
  subjectLine: string;
  purpose: string;
  contentPoints: string[];
  ctaText: string;
}

interface SequenceTip {
  title: string;
  description: string;
}

interface Results {
  overviewTitle: string;
  overviewDescription: string;
  emails: EmailPlan[];
  tips: SequenceTip[];
}

type AnswerMap = Record<string, string>;

/* ------------------------------------------------------------------ */
/*  Quiz steps                                                         */
/* ------------------------------------------------------------------ */

const steps: QuizStep[] = [
  {
    id: "sequenceType",
    question: "What type of email sequence do you need?",
    options: [
      { label: "Welcome Series", value: "welcome" },
      { label: "Onboarding", value: "onboarding" },
      { label: "Re-engagement", value: "reengagement" },
      { label: "Cart Abandonment", value: "cart" },
      { label: "Lead Nurture", value: "nurture" },
      { label: "Post-Purchase", value: "postpurchase" },
      { label: "Event Promotion", value: "event" },
    ],
  },
  {
    id: "industry",
    question: "What industry are you in?",
    options: [
      { label: "E-commerce", value: "ecommerce" },
      { label: "B2B SaaS", value: "saas" },
      { label: "Healthcare", value: "healthcare" },
      { label: "Professional Services", value: "services" },
      { label: "Real Estate", value: "realestate" },
      { label: "Education", value: "education" },
      { label: "Finance", value: "finance" },
      { label: "Hospitality", value: "hospitality" },
    ],
  },
  {
    id: "familiarity",
    question: "How familiar is your audience with your brand?",
    options: [
      { label: "Cold (Never Heard of You)", value: "cold" },
      { label: "Warm (Aware but Not Engaged)", value: "warm" },
      { label: "Hot (Engaged/Past Customer)", value: "hot" },
    ],
  },
  {
    id: "length",
    question: "How many emails should the sequence include?",
    options: [
      { label: "3 Emails", value: "3" },
      { label: "5 Emails", value: "5" },
      { label: "7 Emails", value: "7" },
      { label: "10 Emails", value: "10" },
    ],
  },
  {
    id: "goal",
    question: "What is the primary goal of this sequence?",
    options: [
      { label: "Drive Purchase", value: "purchase" },
      { label: "Book Consultation", value: "consultation" },
      { label: "Download Resource", value: "download" },
      { label: "Start Free Trial", value: "trial" },
      { label: "Increase Engagement", value: "engagement" },
      { label: "Collect Reviews", value: "reviews" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Sequence label helpers                                             */
/* ------------------------------------------------------------------ */

const sequenceTypeLabels: Record<string, string> = {
  welcome: "Welcome Series",
  onboarding: "Onboarding",
  reengagement: "Re-engagement",
  cart: "Cart Abandonment",
  nurture: "Lead Nurture",
  postpurchase: "Post-Purchase",
  event: "Event Promotion",
};

const industryLabels: Record<string, string> = {
  ecommerce: "E-commerce",
  saas: "B2B SaaS",
  healthcare: "Healthcare",
  services: "Professional Services",
  realestate: "Real Estate",
  education: "Education",
  finance: "Finance",
  hospitality: "Hospitality",
};

const goalLabels: Record<string, string> = {
  purchase: "Drive Purchase",
  consultation: "Book Consultation",
  download: "Download Resource",
  trial: "Start Free Trial",
  engagement: "Increase Engagement",
  reviews: "Collect Reviews",
};

/* ------------------------------------------------------------------ */
/*  Send timing generator                                              */
/* ------------------------------------------------------------------ */

function getSendTimings(
  sequenceType: string,
  emailCount: number
): string[] {
  const timingPatterns: Record<string, number[]> = {
    welcome: [0, 1, 3, 5, 7, 10, 14, 18, 21, 25],
    onboarding: [0, 1, 3, 5, 7, 10, 14, 21, 28, 35],
    reengagement: [0, 3, 7, 14, 21, 30, 45, 60, 75, 90],
    cart: [0, 0.04, 1, 3, 5, 7, 10, 14, 21, 28],
    nurture: [0, 3, 7, 10, 14, 21, 28, 35, 42, 49],
    postpurchase: [0, 3, 7, 14, 21, 30, 45, 60, 75, 90],
    event: [0, 1, 3, 5, 7, 10, 14, 7, 3, 1],
  };

  const days = (timingPatterns[sequenceType] || timingPatterns.welcome).slice(
    0,
    emailCount
  );

  return days.map((d, i) => {
    if (i === 0) {
      if (sequenceType === "cart") return "Immediately after cart abandonment";
      if (sequenceType === "postpurchase") return "Immediately after purchase";
      if (sequenceType === "event") return "Immediately after registration";
      return "Immediately after signup";
    }
    if (sequenceType === "cart" && i === 1)
      return "1 hour after abandonment";
    if (d === 1) return "Day 1";
    return `Day ${d}`;
  });
}

/* ------------------------------------------------------------------ */
/*  Subject line generator                                             */
/* ------------------------------------------------------------------ */

function getSubjectLines(
  sequenceType: string,
  industry: string,
  goal: string,
  familiarity: string,
  emailCount: number
): string[] {
  const subjects: string[] = [];

  const industryNoun =
    industry === "ecommerce"
      ? "store"
      : industry === "saas"
        ? "platform"
        : industry === "healthcare"
          ? "practice"
          : industry === "services"
            ? "firm"
            : industry === "realestate"
              ? "listings"
              : industry === "education"
                ? "program"
                : industry === "finance"
                  ? "financial plan"
                  : "experience";

  if (sequenceType === "welcome") {
    subjects.push(
      `Welcome to [Brand] — here's what to expect`,
      `The one thing most new subscribers miss`,
      `Why [number]+ ${industry === "ecommerce" ? "shoppers" : "professionals"} trust us`,
      `Your quick-start guide to [Brand]`,
      `[First Name], your exclusive welcome offer inside`,
      `3 ways to get the most from [Brand]`,
      `The story behind [Brand] (and why it matters to you)`,
      `Don't miss this — reserved for new members only`,
      `What our best ${industry === "ecommerce" ? "customers" : "clients"} do first`,
      `Still exploring? Here's why [Brand] is different`
    );
  } else if (sequenceType === "onboarding") {
    subjects.push(
      `Let's get you started — Step 1 of your setup`,
      `Quick win: complete this in under 5 minutes`,
      `You're 50% set up — keep the momentum going`,
      `Pro tip: the feature most people overlook`,
      `[First Name], your ${industryNoun} is almost ready`,
      `Unlock the full power of your ${industryNoun}`,
      `Here's what successful users do in week one`,
      `Need help? Your personal setup checklist`,
      `Milestone reached — here's what's next`,
      `You're all set — time to see real results`
    );
  } else if (sequenceType === "reengagement") {
    subjects.push(
      `We miss you, [First Name] — here's what's new`,
      `A lot has changed since you last visited`,
      `Is this goodbye? (We hope not)`,
      `Your ${industryNoun} is waiting for you`,
      `[First Name], we saved something for you`,
      `Come back and see what you've been missing`,
      `Last chance: your exclusive return offer expires soon`,
      `We listened — here's what we improved`,
      `Quick question: what would bring you back?`,
      `Final note from us (unless you say otherwise)`
    );
  } else if (sequenceType === "cart") {
    subjects.push(
      `You left something behind — still interested?`,
      `Your cart is waiting (items selling fast)`,
      `Complete your order and save [X]%`,
      `[First Name], your items won't last long`,
      `Still thinking it over? Here's what others say`,
      `Last reminder: your cart expires soon`,
      `We saved your cart — ready when you are`,
      `Free shipping on your pending order — today only`,
      `Your ${industryNoun} is one click away`,
      `Final notice: your reserved items are about to go`
    );
  } else if (sequenceType === "nurture") {
    subjects.push(
      `[Industry insight]: the trend you can't ignore`,
      `How [type of business] achieve [specific result]`,
      `The #1 mistake in ${industry === "ecommerce" ? "online selling" : industry === "saas" ? "SaaS growth" : industry === "finance" ? "financial planning" : "your industry"}`,
      `Case study: [X]% improvement in [metric]`,
      `[First Name], this resource was made for you`,
      `The simple framework that changes everything`,
      `What the top 10% do differently`,
      `Your free guide: [relevant resource title]`,
      `Ready to take the next step?`,
      `[First Name], let's talk about your goals`
    );
  } else if (sequenceType === "postpurchase") {
    subjects.push(
      `Thank you for your order — here's what happens next`,
      `Pro tips: get the most from your purchase`,
      `How's everything going? We'd love to hear`,
      `[First Name], a few ideas to try next`,
      `Your honest feedback means the world to us`,
      `Because you loved [product], you might also like...`,
      `Exclusive offer for our valued customers`,
      `Your [product] story — share it and get rewarded`,
      `It's been a month — time for a check-in`,
      `Welcome to the inner circle — VIP perks inside`
    );
  } else if (sequenceType === "event") {
    subjects.push(
      `You're registered — mark your calendar for [date]`,
      `What to expect at [event name]`,
      `Speaker spotlight: meet [speaker name]`,
      `[X] days until [event] — are you ready?`,
      `Your event prep checklist`,
      `Agenda released: sessions you won't want to miss`,
      `Bring a colleague — exclusive invite inside`,
      `Tomorrow is the day — last-minute details`,
      `Starting soon — join the live stream now`,
      `Thank you for attending — recordings + next steps`
    );
  }

  return subjects.slice(0, emailCount);
}

/* ------------------------------------------------------------------ */
/*  Email purpose generator                                            */
/* ------------------------------------------------------------------ */

function getEmailPurposes(
  sequenceType: string,
  goal: string,
  emailCount: number
): string[] {
  const purposes: Record<string, string[]> = {
    welcome: [
      "Introduce your brand, set expectations, and deliver any promised incentive",
      "Share your brand story and core values to build emotional connection",
      "Highlight your most popular products/services with social proof",
      "Address common questions and overcome initial objections",
      "Present a compelling offer to drive the first conversion",
      "Showcase customer success stories and testimonials",
      "Reinforce brand differentiators and unique value proposition",
      "Create urgency with a time-limited welcome offer",
      "Introduce your community, social channels, or loyalty program",
      "Final welcome push — strong CTA to convert or engage deeper",
    ],
    onboarding: [
      "Welcome and guide through the essential first action",
      "Walk through the core feature or product benefit",
      "Celebrate early progress and introduce the next milestone",
      "Share a power-user tip that accelerates time-to-value",
      "Address the most common support question proactively",
      "Highlight an underused feature that drives retention",
      "Share a success story from a similar user or customer",
      "Prompt a key action that correlates with long-term retention",
      "Summarize progress made and preview advanced capabilities",
      "Transition from onboarding to regular engagement cadence",
    ],
    reengagement: [
      "Acknowledge the absence and remind them what they're missing",
      "Share the most significant updates or improvements since they left",
      "Offer a personalized incentive to return",
      "Use social proof — show what peers are achieving",
      "Ask for feedback — find out why they disengaged",
      "Present a low-friction way to re-engage (one-click action)",
      "Create urgency with a time-limited reactivation offer",
      "Share fresh content or a new resource relevant to their interests",
      "Provide a final compelling reason to stay subscribed",
      "Sunset message — confirm they want to remain on the list",
    ],
    cart: [
      "Gentle reminder that items are still in their cart",
      "Address common purchase hesitations with reassurance",
      "Offer social proof — reviews and ratings for carted items",
      "Introduce a small incentive (discount or free shipping)",
      "Create urgency — low stock or expiring cart notification",
      "Highlight your guarantee, return policy, or risk reversal",
      "Final reminder with strongest incentive",
      "Suggest alternative products if original items sell out",
      "Win-back attempt with a fresh approach or bundle offer",
      "Last-chance notification before cart is cleared",
    ],
    nurture: [
      "Deliver high-value educational content related to their interest",
      "Share an actionable framework or methodology they can apply",
      "Present data, research, or industry insights that build authority",
      "Provide a relevant case study demonstrating real results",
      "Offer a free resource (guide, template, checklist)",
      "Address the core pain point with your solution as the answer",
      "Share expert tips that position you as a trusted advisor",
      "Introduce your solution naturally through a problem-solving lens",
      "Build urgency and present a clear path to the next step",
      "Direct ask — invite them to take the primary conversion action",
    ],
    postpurchase: [
      "Confirm the order and set clear delivery/service expectations",
      "Provide tips for getting maximum value from their purchase",
      "Check in on satisfaction and offer proactive support",
      "Suggest complementary products or services (cross-sell)",
      "Request a review or testimonial while satisfaction is high",
      "Share user-generated content and community stories",
      "Offer an exclusive loyalty or repeat-purchase incentive",
      "Invite them to join your referral or ambassador program",
      "Re-engage with new arrivals or updated offerings",
      "Celebrate the customer relationship milestone with VIP access",
    ],
    event: [
      "Confirm registration and share key event details",
      "Build excitement with agenda highlights and speaker previews",
      "Provide preparation materials or pre-event resources",
      "Share networking tips and attendee engagement opportunities",
      "Send a countdown reminder with logistics and access links",
      "Highlight specific sessions or workshops aligned to their interests",
      "Encourage them to invite colleagues with a shareable link",
      "Day-before reminder with final logistics and tech check",
      "Day-of notification with live access link and schedule",
      "Post-event follow-up with recordings, resources, and next steps",
    ],
  };

  return (purposes[sequenceType] || purposes.welcome).slice(0, emailCount);
}

/* ------------------------------------------------------------------ */
/*  Content points generator                                           */
/* ------------------------------------------------------------------ */

function getContentPoints(
  sequenceType: string,
  industry: string,
  goal: string,
  familiarity: string,
  emailIndex: number
): string[] {
  const isEarly = emailIndex < 2;
  const isMid = emailIndex >= 2 && emailIndex < 5;

  if (sequenceType === "welcome") {
    if (isEarly) {
      return [
        "Brief brand introduction with a clear, human voice",
        `Deliver the promised lead magnet or ${goal === "purchase" ? "discount code" : "resource"}`,
        "Set expectations for email frequency and content type",
        "Include one clear, low-commitment CTA",
      ];
    }
    if (isMid) {
      return [
        "Feature your top-performing product/service with a compelling visual",
        "Include 1-2 customer testimonials or trust signals",
        `Tie content back to their ${familiarity === "cold" ? "initial interest" : "previous engagement"}`,
        `Drive toward ${goalLabels[goal]?.toLowerCase() || "your primary action"}`,
      ];
    }
    return [
      "Create urgency with a time-sensitive or exclusive offer",
      "Recap the key value proposition in a fresh way",
      "Use a strong, benefit-driven CTA with clear next step",
      "Add a P.S. line with a secondary engagement path",
    ];
  }

  if (sequenceType === "onboarding") {
    if (isEarly) {
      return [
        "Welcome message with a single, clear first action to complete",
        `Guide them through the core ${industry === "saas" ? "product setup" : "service activation"} step`,
        "Include a progress indicator or checklist visual",
        "Link to help resources or a quick-start video",
      ];
    }
    if (isMid) {
      return [
        `Share a ${industry === "saas" ? "power-user feature" : "professional tip"} they haven't tried yet`,
        "Include a real example or use case from a similar customer",
        "Address the most common question or friction point",
        "Celebrate their progress and reinforce the value they've gained",
      ];
    }
    return [
      "Summarize what they've accomplished during onboarding",
      `Introduce advanced capabilities or ${industry === "saas" ? "premium features" : "additional services"}`,
      "Set the stage for ongoing engagement and regular communication",
      `Prompt the action most correlated with long-term ${goal === "purchase" ? "purchasing" : "retention"}`,
    ];
  }

  if (sequenceType === "cart") {
    if (isEarly) {
      return [
        "Show the exact items left in cart with images and prices",
        "Keep the tone helpful, not pushy — assume they got distracted",
        "Include a direct link back to the cart (one-click recovery)",
        "Mention your shipping policy, guarantees, or return policy",
      ];
    }
    if (isMid) {
      return [
        "Add customer reviews or ratings for the specific carted products",
        `Offer a small incentive (${industry === "ecommerce" ? "free shipping or 10% off" : "extended trial or bonus"})`,
        "Address the top purchase objections for your industry",
        "Include a countdown or stock-level urgency indicator",
      ];
    }
    return [
      "Present your strongest offer as a final incentive",
      "Suggest alternative products if originals are selling out",
      "Use a clear, urgent subject line and preview text",
      "Include a simple unsubscribe option to maintain list health",
    ];
  }

  if (sequenceType === "reengagement") {
    if (isEarly) {
      return [
        "Acknowledge they've been away without guilt-tripping",
        "Highlight 2-3 specific improvements or new features since their last visit",
        `Reference their previous ${familiarity === "hot" ? "purchases or interactions" : "interest area"}`,
        "Include a single, low-friction re-engagement CTA",
      ];
    }
    if (isMid) {
      return [
        "Share a compelling piece of social proof or recent win",
        `Offer an exclusive ${goal === "purchase" ? "discount or bundle deal" : "resource or consultation"}`,
        "Ask a simple survey question to understand their needs",
        "Make the value of returning tangible and specific",
      ];
    }
    return [
      "Create genuine urgency — this is the final outreach attempt",
      "Clearly state what they'll miss if they don't re-engage",
      "Offer a one-click way to stay subscribed or update preferences",
      "Respect their choice — include a clear opt-out with no friction",
    ];
  }

  if (sequenceType === "nurture") {
    if (isEarly) {
      return [
        `Open with a relevant ${industry === "saas" ? "industry trend" : industry === "finance" ? "market insight" : "pain point"} they care about`,
        "Deliver genuinely useful content — not a sales pitch",
        "Establish your expertise with data, examples, or frameworks",
        "End with a soft CTA — read more, download, or reply",
      ];
    }
    if (isMid) {
      return [
        "Present a case study or success story with specific metrics",
        "Introduce your solution as a natural extension of the content",
        `Address the key objection for ${industryLabels[industry] || "your"} buyers`,
        "Include proof elements: logos, numbers, testimonials",
      ];
    }
    return [
      `Make a direct, confident ask to ${goalLabels[goal]?.toLowerCase() || "take the next step"}`,
      "Recap the problem, solution, and proof in a concise format",
      "Remove friction — make the next step as easy as possible",
      "Add urgency through scarcity, timing, or exclusive access",
    ];
  }

  if (sequenceType === "postpurchase") {
    if (isEarly) {
      return [
        "Confirm the purchase with clear next-step expectations",
        "Provide practical tips or a quick-start guide for their purchase",
        `Include ${industry === "ecommerce" ? "shipping and delivery details" : "onboarding or service timeline"}`,
        "Reinforce their decision with a warm, personal tone",
      ];
    }
    if (isMid) {
      return [
        "Check in on satisfaction before they have a chance to forget",
        `Suggest complementary ${industry === "ecommerce" ? "products" : "services"} based on their purchase`,
        "Share tips from other customers who bought the same thing",
        "Request a review while satisfaction and recall are high",
      ];
    }
    return [
      `Offer a loyalty incentive or ${industry === "ecommerce" ? "repeat-purchase discount" : "referral bonus"}`,
      "Invite them to join your community or referral program",
      "Share new arrivals or upcoming offerings relevant to them",
      "Celebrate the relationship milestone and offer VIP perks",
    ];
  }

  /* event */
  if (isEarly) {
    return [
      "Confirm their registration with calendar links (ICS/Google)",
      "Highlight 2-3 must-see sessions or speakers",
      "Share preparation resources or pre-event content",
      "Build excitement with attendee count or notable participants",
    ];
  }
  if (isMid) {
    return [
      "Share detailed agenda with session descriptions",
      "Provide networking tips and engagement opportunities",
      "Encourage social sharing with event hashtag and handles",
      "Send logistics: parking, virtual access links, dress code",
    ];
  }
  return [
    "Final reminder with all access details and start time",
    "Include live-stream or virtual attendance backup option",
    "Post-event: share recordings, slides, and key takeaways",
    "Follow up with related resources and next event announcement",
  ];
}

/* ------------------------------------------------------------------ */
/*  CTA text generator                                                 */
/* ------------------------------------------------------------------ */

function getCtaText(
  sequenceType: string,
  goal: string,
  emailIndex: number,
  emailCount: number
): string {
  const isLast = emailIndex === emailCount - 1;
  const isFirst = emailIndex === 0;

  if (sequenceType === "cart") {
    if (isFirst) return "Return to Your Cart";
    if (isLast) return "Complete Your Order Now";
    return "Finish Checkout";
  }

  if (sequenceType === "event") {
    if (isFirst) return "Add to Calendar";
    if (isLast) return "Watch the Recordings";
    if (emailIndex >= emailCount - 2) return "Join the Event Now";
    return "View the Full Agenda";
  }

  const ctaByGoal: Record<string, string[]> = {
    purchase: ["Shop Now", "Browse the Collection", "Claim Your Offer"],
    consultation: [
      "Book Your Free Consultation",
      "Schedule a Call",
      "Reserve Your Spot",
    ],
    download: [
      "Download the Free Guide",
      "Get Your Copy",
      "Access the Resource",
    ],
    trial: [
      "Start Your Free Trial",
      "Try It Free",
      "Activate Your Trial",
    ],
    engagement: [
      "Explore More",
      "See What's New",
      "Join the Conversation",
    ],
    reviews: [
      "Leave a Review",
      "Share Your Experience",
      "Rate Your Purchase",
    ],
  };

  const options = ctaByGoal[goal] || ctaByGoal.engagement;

  if (isFirst) return options[0];
  if (isLast) return options[2];
  return options[1];
}

/* ------------------------------------------------------------------ */
/*  Build results                                                      */
/* ------------------------------------------------------------------ */

function buildResults(answers: AnswerMap): Results {
  const sequenceType = answers.sequenceType;
  const industry = answers.industry;
  const familiarity = answers.familiarity;
  const goal = answers.goal;
  const emailCount = parseInt(answers.length, 10);

  const timings = getSendTimings(sequenceType, emailCount);
  const subjects = getSubjectLines(
    sequenceType,
    industry,
    goal,
    familiarity,
    emailCount
  );
  const purposes = getEmailPurposes(sequenceType, goal, emailCount);

  const emails: EmailPlan[] = [];
  for (let i = 0; i < emailCount; i++) {
    emails.push({
      emailNumber: i + 1,
      sendTiming: timings[i],
      subjectLine: subjects[i],
      purpose: purposes[i],
      contentPoints: getContentPoints(
        sequenceType,
        industry,
        goal,
        familiarity,
        i
      ),
      ctaText: getCtaText(sequenceType, goal, i, emailCount),
    });
  }

  const tips = getSequenceTips(sequenceType, industry, familiarity);

  const overviewTitle = `${sequenceTypeLabels[sequenceType]} for ${industryLabels[industry]}`;
  const overviewDescription = `A ${emailCount}-email ${sequenceTypeLabels[sequenceType]?.toLowerCase()} sequence designed for ${familiarity === "cold" ? "cold audiences who don't know your brand yet" : familiarity === "warm" ? "warm audiences who are aware but haven't engaged" : "hot audiences who are engaged or past customers"}, optimized to ${goalLabels[goal]?.toLowerCase()}.`;

  return { overviewTitle, overviewDescription, emails, tips };
}

/* ------------------------------------------------------------------ */
/*  Sequence tips                                                      */
/* ------------------------------------------------------------------ */

function getSequenceTips(
  sequenceType: string,
  industry: string,
  familiarity: string
): SequenceTip[] {
  const universalTips: SequenceTip[] = [
    {
      title: "Test Subject Lines",
      description:
        "A/B test at least 2 subject line variations per email. Even small wording changes can improve open rates by 10-20%.",
    },
    {
      title: "Optimize Send Times",
      description:
        "Test different send times for your audience. B2B emails often perform best Tuesday-Thursday mid-morning; B2C peaks on weekends.",
    },
    {
      title: "Mobile-First Design",
      description:
        "Over 60% of emails are opened on mobile. Keep subject lines under 40 characters and use a single-column layout with large tap targets.",
    },
    {
      title: "Monitor and Iterate",
      description:
        "Track open rates, click rates, and conversion rates for each email. Remove or rewrite underperformers after 2-4 weeks of data.",
    },
  ];

  const specificTips: Record<string, SequenceTip[]> = {
    welcome: [
      {
        title: "Send Immediately",
        description:
          "Welcome emails sent within 1 hour of signup see 4x higher open rates. Automate instant delivery.",
      },
      {
        title: "Deliver on Promises",
        description:
          "If you offered a lead magnet or discount, deliver it in the first email. Broken promises kill trust.",
      },
      {
        title: "Set Frequency Expectations",
        description:
          "Tell subscribers how often they'll hear from you and what type of content to expect. Reduces unsubscribes.",
      },
      {
        title: "Personalize Early",
        description:
          "Use their first name and reference the specific page or offer that triggered the signup. Generic feels spammy.",
      },
    ],
    onboarding: [
      {
        title: "One Action Per Email",
        description:
          "Each onboarding email should have exactly one clear action. Multiple CTAs create decision paralysis.",
      },
      {
        title: "Show Progress",
        description:
          "Include a visual progress bar or checklist. People are motivated to complete sequences they've started.",
      },
      {
        title: "Time-Gate Based on Behavior",
        description:
          "Trigger the next email only after they complete the previous action. Don't send Step 3 if they haven't done Step 2.",
      },
      {
        title: "Celebrate Milestones",
        description:
          "Acknowledge each completed step with positive reinforcement. Small wins build momentum toward full adoption.",
      },
    ],
    reengagement: [
      {
        title: "Segment by Inactivity Period",
        description:
          "Someone inactive for 30 days needs a different message than someone gone for 6 months. Segment accordingly.",
      },
      {
        title: "Lead with Value, Not Guilt",
        description:
          "'We miss you' is less effective than 'Here's what you're missing.' Focus on value, not emotion.",
      },
      {
        title: "Clean Your List",
        description:
          "If they don't re-engage after the full sequence, remove them. A smaller, engaged list outperforms a large, dead one.",
      },
      {
        title: "Ask Why They Left",
        description:
          "A simple one-question survey in the sequence can reveal systemic issues and inform product decisions.",
      },
    ],
    cart: [
      {
        title: "Speed Matters",
        description:
          "Send the first reminder within 1 hour. Cart recovery rates drop 50% after 24 hours.",
      },
      {
        title: "Show the Products",
        description:
          "Include images, names, and prices of the exact items in their cart. Visual reminders outperform text-only.",
      },
      {
        title: "Escalate Incentives",
        description:
          "Start with no discount. Add a small incentive in email 2-3. Reserve your best offer for the final email.",
      },
      {
        title: "Remove Friction",
        description:
          "Link directly to a pre-filled checkout. Every extra click between the email and completion loses 20% of recoveries.",
      },
    ],
    nurture: [
      {
        title: "80/20 Content Rule",
        description:
          "80% educational value, 20% promotion. Nurture sequences that sell too early see sharp unsubscribe spikes.",
      },
      {
        title: "Match Content to Stage",
        description: `${familiarity === "cold" ? "Cold leads need awareness content first. Don't pitch until email 3-4 at the earliest." : familiarity === "warm" ? "Warm leads are ready for deeper content. Move from education to consideration faster." : "Hot leads know you. Skip the intro — go straight to differentiation and proof."}`,
      },
      {
        title: "Use Reply Triggers",
        description:
          "Ask a genuine question and watch for replies. Leads who reply are 10x more likely to convert.",
      },
      {
        title: "Gate the Best Content",
        description:
          "Put your most valuable resource behind a micro-commitment (click, reply, or form). Engagement predicts intent.",
      },
    ],
    postpurchase: [
      {
        title: "Ask for Reviews at Peak Satisfaction",
        description:
          "Request reviews 7-14 days after purchase — enough time to use the product, soon enough to remember the excitement.",
      },
      {
        title: "Cross-Sell, Don't Upsell",
        description:
          "Suggest complementary items, not upgrades. 'Goes great with...' converts better than 'You should also buy...'",
      },
      {
        title: "Provide Usage Tips",
        description:
          "Help them succeed with their purchase. Customers who see results buy again. Customers who don't, churn.",
      },
      {
        title: "Build a Referral Loop",
        description:
          "Happy customers are your best marketers. Include a referral incentive in the later emails of the sequence.",
      },
    ],
    event: [
      {
        title: "Front-Load Value",
        description:
          "Share exclusive pre-event content or resources. Give them a reason to stay engaged before the event starts.",
      },
      {
        title: "Make It Shareable",
        description:
          "Include a 'forward to a colleague' link or social share buttons. Peer invitations have the highest conversion rate.",
      },
      {
        title: "Send a Day-Before Reminder",
        description:
          "No-show rates drop 25-30% with a well-timed day-before email that includes all logistics and access links.",
      },
      {
        title: "Follow Up Within 24 Hours",
        description:
          "Send recordings, key takeaways, and a next-step CTA within 24 hours. Interest decays rapidly after events.",
      },
    ],
  };

  return specificTips[sequenceType] || universalTips;
}

/* ------------------------------------------------------------------ */
/*  Format results as plain text                                       */
/* ------------------------------------------------------------------ */

function formatResultsText(results: Results): string {
  const lines: string[] = [];

  lines.push("EMAIL SEQUENCE PLANNER RESULTS");
  lines.push("=".repeat(50));
  lines.push("");

  lines.push(`SEQUENCE: ${results.overviewTitle}`);
  lines.push(results.overviewDescription);
  lines.push("");

  lines.push("EMAIL SEQUENCE");
  lines.push("-".repeat(30));

  results.emails.forEach((email) => {
    lines.push("");
    lines.push(
      `EMAIL ${email.emailNumber}: ${email.sendTiming}`
    );
    lines.push(`  Subject: ${email.subjectLine}`);
    lines.push(`  Purpose: ${email.purpose}`);
    lines.push("  Key Content:");
    email.contentPoints.forEach((point) => {
      lines.push(`    - ${point}`);
    });
    lines.push(`  CTA: ${email.ctaText}`);
  });

  lines.push("");
  lines.push("BEST PRACTICES");
  lines.push("-".repeat(30));
  results.tips.forEach((tip) => {
    lines.push(`- ${tip.title}: ${tip.description}`);
  });

  lines.push("");
  lines.push("Generated by Markit Media Email Sequence Planner");
  lines.push(
    "https://themarkitmedia.com/resources/email-sequence-planner"
  );

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
      {copied ? "Copied" : "Copy to Clipboard"}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default function EmailSequencePlannerPage() {
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const totalSteps = steps.length;
  const step = steps[currentStep];
  const currentAnswered = answers[step.id] !== undefined;
  const allAnswered = steps.every((s) => answers[s.id] !== undefined);
  const answeredCount = steps.filter(
    (s) => answers[s.id] !== undefined
  ).length;

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
          name: "Email Sequence Planner",
          description:
            "Free interactive tool that generates a complete email sequence plan based on your business type, industry, audience, and goals.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
        }}
      />

      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Email Sequence Planner" },
        ]}
      />

      {/* ---- Hero ---- */}
      <section className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Email Sequence Planner
            </h1>
            <SectionDesc>
              Answer 5 quick questions and get a complete email sequence
              plan with subject lines, content outlines, send timing, and
              best practices tailored to your business.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {!submitted ? (
        <>
          {/* ---- Progress Indicator ---- */}
          <section className="px-6 lg:px-12 pb-6">
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
                    Generate My Sequence &rarr;
                  </button>
                )}
              </div>

              {!allAnswered && currentStep === totalSteps - 1 && (
                <p className="text-base text-gray-400 text-center mt-4">
                  Answer all {totalSteps} questions to generate your
                  sequence
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
            aria-label="Email sequence results"
          >
            <div className="max-w-3xl mx-auto">
              {/* ---- Sequence Overview ---- */}
              <Animate animation="fade-up">
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-2">
                  {results.overviewTitle}
                </h2>
                <p className="text-base text-gray-500 mb-8">
                  {results.overviewDescription}
                </p>
              </Animate>

              {/* ---- Visual Timeline ---- */}
              <Animate animation="fade-up">
                <div className="border border-gray-200 p-6 mb-12">
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-6">
                    Sequence Timeline
                  </h3>
                  <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-[19px] top-0 bottom-0 w-[2px] bg-gray-200" />

                    <div className="space-y-4">
                      {results.emails.map((email, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-4 relative"
                        >
                          {/* Dot */}
                          <div className="relative z-10 flex-shrink-0 w-10 h-10 bg-black text-white flex items-center justify-center text-base font-bold">
                            {email.emailNumber}
                          </div>
                          {/* Content */}
                          <div className="pt-2 min-h-[44px]">
                            <p className="text-base font-bold text-black">
                              Email {email.emailNumber}
                            </p>
                            <p className="text-base text-gray-500">
                              {email.sendTiming}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Animate>

              {/* ---- Individual Email Cards ---- */}
              <Animate animation="fade-up">
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-6">
                  Your Email Sequence
                </h2>
              </Animate>

              <Stagger stagger={100} className="space-y-6 mb-12">
                {results.emails.map((email) => (
                  <div
                    key={email.emailNumber}
                    className="border border-gray-200"
                  >
                    <div className="bg-black text-white px-6 py-4">
                      <div className="flex items-center justify-between gap-4 flex-wrap">
                        <span className="font-[family-name:var(--font-display)] text-[clamp(1.25rem,3vw,1.5rem)] font-extrabold">
                          Email {email.emailNumber}
                        </span>
                        <span className="text-base text-gray-300">
                          {email.sendTiming}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 space-y-5">
                      {/* Subject Line */}
                      <div>
                        <p className="text-base font-bold text-black mb-1">
                          Subject Line
                        </p>
                        <p className="text-base text-gray-600 bg-gray-50 px-4 py-3 border border-gray-100">
                          {email.subjectLine}
                        </p>
                      </div>

                      {/* Purpose */}
                      <div>
                        <p className="text-base font-bold text-black mb-1">
                          Purpose
                        </p>
                        <p className="text-base text-gray-600">
                          {email.purpose}
                        </p>
                      </div>

                      {/* Content Points */}
                      <div>
                        <p className="text-base font-bold text-black mb-2">
                          Key Content Points
                        </p>
                        <ul className="space-y-2">
                          {email.contentPoints.map((point, j) => (
                            <li
                              key={j}
                              className="flex items-start gap-3 text-base text-gray-600"
                            >
                              <span className="text-black font-bold mt-0.5 flex-shrink-0">
                                --
                              </span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* CTA */}
                      <div>
                        <p className="text-base font-bold text-black mb-1">
                          Recommended CTA
                        </p>
                        <span className="inline-block bg-black text-white px-4 py-2 text-base font-bold">
                          {email.ctaText}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </Stagger>

              {/* ---- Sequence Tips ---- */}
              <Animate animation="fade-up">
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-2">
                  Best Practices
                </h2>
                <p className="text-base text-gray-500 mb-6">
                  Tips to maximize the performance of your email sequence.
                </p>
              </Animate>

              <Stagger
                stagger={100}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12"
              >
                {results.tips.map((tip) => (
                  <div
                    key={tip.title}
                    className="border border-gray-200 p-6"
                  >
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">
                      {tip.title}
                    </h3>
                    <p className="text-base text-gray-600">
                      {tip.description}
                    </p>
                  </div>
                ))}
              </Stagger>

              {/* ---- Actions ---- */}
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <CopyButton text={plainText} />
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
      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Need Help Building Your Email Strategy?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Our team designs and manages high-converting email sequences
              that drive real revenue. Let us turn this plan into a
              fully-automated campaign.
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
    </article>
  );
}
