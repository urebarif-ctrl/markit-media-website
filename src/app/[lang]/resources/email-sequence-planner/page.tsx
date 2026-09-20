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

type SequenceType =
  | "welcome"
  | "nurture"
  | "reengagement"
  | "onboarding"
  | "cart"
  | "postpurchase"
  | "event"
  | "seasonal";

interface EmailConfig {
  subjectLine: string;
  daysAfterTrigger: number;
  purpose: string;
  ctaType: string;
}

interface SequenceOption {
  value: SequenceType;
  label: string;
  description: string;
  triggerLabel: string;
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const STEP_LABELS = ["Configure", "Customize Emails", "Your Plan"];

const sequenceOptions: SequenceOption[] = [
  {
    value: "welcome",
    label: "Welcome Series",
    description:
      "Introduce new subscribers to your brand and guide them toward their first action.",
    triggerLabel: "after signup",
  },
  {
    value: "nurture",
    label: "Lead Nurture",
    description:
      "Build trust through educational content and gradually move leads toward conversion.",
    triggerLabel: "after lead capture",
  },
  {
    value: "reengagement",
    label: "Re-engagement",
    description:
      "Win back inactive subscribers with fresh value and compelling reasons to return.",
    triggerLabel: "after inactivity detected",
  },
  {
    value: "onboarding",
    label: "Onboarding",
    description:
      "Guide new users through setup and help them reach their first success milestone.",
    triggerLabel: "after account creation",
  },
  {
    value: "cart",
    label: "Cart Abandonment",
    description:
      "Recover lost sales by reminding shoppers about items left in their cart.",
    triggerLabel: "after cart abandonment",
  },
  {
    value: "postpurchase",
    label: "Post-Purchase",
    description:
      "Maximize customer lifetime value with follow-ups, reviews, and cross-sells.",
    triggerLabel: "after purchase",
  },
  {
    value: "event",
    label: "Event / Webinar",
    description:
      "Drive attendance and engagement before, during, and after your event.",
    triggerLabel: "after registration",
  },
  {
    value: "seasonal",
    label: "Seasonal / Holiday",
    description:
      "Capitalize on seasonal buying moments with timely, themed campaigns.",
    triggerLabel: "before season or holiday",
  },
];

const ctaOptions = [
  "Shop Now",
  "Learn More",
  "Book a Call",
  "Download Resource",
  "Start Free Trial",
  "Leave a Review",
  "Register Now",
  "Claim Offer",
  "Reply to This Email",
  "Visit Website",
  "Add to Calendar",
  "Share with a Friend",
  "Get Started",
  "Watch Now",
  "Read the Guide",
  "Complete Your Order",
  "Return to Cart",
  "Explore Collection",
];

/* ------------------------------------------------------------------ */
/*  Default data generators                                            */
/* ------------------------------------------------------------------ */

function getDefaultTimings(type: SequenceType, count: number): number[] {
  const patterns: Record<SequenceType, number[]> = {
    welcome: [0, 1, 3, 5, 7, 10, 14, 18, 21, 25, 28, 30],
    nurture: [0, 3, 7, 10, 14, 21, 28, 35, 42, 49, 56, 63],
    reengagement: [0, 3, 7, 14, 21, 30, 45, 60, 75, 90, 105, 120],
    onboarding: [0, 1, 3, 5, 7, 10, 14, 21, 28, 35, 42, 49],
    cart: [0, 1, 3, 5, 7, 10, 14, 21, 28, 35, 42, 49],
    postpurchase: [0, 3, 7, 14, 21, 30, 45, 60, 75, 90, 105, 120],
    event: [0, 1, 3, 5, 7, 10, 14, 7, 3, 1, 0, 1],
    seasonal: [0, 3, 7, 10, 14, 17, 21, 24, 27, 28, 30, 33],
  };
  return patterns[type].slice(0, count);
}

function getDefaultSubjectLines(
  type: SequenceType,
  count: number
): string[] {
  const subjects: Record<SequenceType, string[]> = {
    welcome: [
      "Welcome to [Brand] — here is what to expect",
      "The one thing most new subscribers miss",
      "Your quick-start guide to [Brand]",
      "[First Name], here is your exclusive welcome offer",
      "3 ways to get the most from [Brand]",
      "The story behind [Brand] (and why it matters to you)",
      "Reserved for new members only — don't miss this",
      "What our best customers do first",
      "Still exploring? Here is why [Brand] is different",
      "Your welcome offer expires tomorrow",
      "One last thing before your offer ends",
      "[First Name], you are officially part of the family",
    ],
    nurture: [
      "The industry trend you cannot afford to ignore",
      "How top performers achieve [specific result]",
      "The #1 mistake holding your business back",
      "Case study: how [Company] achieved [result]",
      "[First Name], this resource was made for you",
      "The simple framework that changes everything",
      "What the top 10% do differently",
      "Your free guide: [relevant resource title]",
      "Ready to take the next step?",
      "[First Name], let us talk about your goals",
      "A personal invitation from our team",
      "Last chance to access [exclusive resource]",
    ],
    reengagement: [
      "We miss you, [First Name] — here is what is new",
      "A lot has changed since you last visited",
      "Is this goodbye? (We hope not)",
      "[First Name], we saved something for you",
      "Come back and see what you have been missing",
      "Last chance: your exclusive return offer expires soon",
      "We listened — here is what we improved",
      "Quick question: what would bring you back?",
      "Final note from us (unless you say otherwise)",
      "It has been a while — one more reason to return",
      "Your account is waiting — here is a gift",
      "We are cleaning our list — should we keep you?",
    ],
    onboarding: [
      "Let us get you started — Step 1 of your setup",
      "Quick win: complete this in under 5 minutes",
      "You are 50% set up — keep the momentum going",
      "Pro tip: the feature most people overlook",
      "[First Name], your account is almost ready",
      "Unlock the full power of your account",
      "Here is what successful users do in week one",
      "Need help? Your personal setup checklist",
      "Milestone reached — here is what comes next",
      "You are all set — time to see real results",
      "Advanced tips for power users",
      "Your first month recap — look how far you have come",
    ],
    cart: [
      "You left something behind — still interested?",
      "Your cart is waiting (items selling fast)",
      "Complete your order and save [X]%",
      "[First Name], your items will not last long",
      "Still thinking it over? Here is what others say",
      "Last reminder: your cart expires soon",
      "We saved your cart — ready when you are",
      "Free shipping on your pending order — today only",
      "One click away from getting what you wanted",
      "Final notice: your reserved items are about to go",
      "We held your items — here is a little extra incentive",
      "Cart closing: last chance to complete your order",
    ],
    postpurchase: [
      "Thank you for your order — here is what happens next",
      "Pro tips: get the most from your purchase",
      "How is everything going? We would love to hear",
      "[First Name], a few ideas to try next",
      "Your honest feedback means the world to us",
      "Because you loved [product], you might also like...",
      "Exclusive offer for our valued customers",
      "Share your [product] story and get rewarded",
      "It has been a month — time for a check-in",
      "Welcome to the inner circle — VIP perks inside",
      "Your loyalty reward is waiting",
      "Anniversary special: celebrate with us",
    ],
    event: [
      "You are registered — mark your calendar for [date]",
      "What to expect at [event name]",
      "Speaker spotlight: meet [speaker name]",
      "[X] days until [event] — are you ready?",
      "Your event prep checklist",
      "Agenda released: sessions you will not want to miss",
      "Bring a colleague — exclusive invite inside",
      "Tomorrow is the day — last-minute details",
      "Starting soon — join now",
      "Thank you for attending — recordings and next steps",
      "Key takeaways from [event name]",
      "Save the date: our next event is coming",
    ],
    seasonal: [
      "[Season/Holiday] is coming — get ready with [Brand]",
      "Early access: our [Season] collection is live",
      "Your [Holiday] planning guide starts here",
      "Countdown: [X] days until [Holiday]",
      "[First Name], have you started your [Holiday] prep?",
      "Our most popular [Season] picks — going fast",
      "Last-minute [Holiday] deals you will not want to miss",
      "[Holiday] is almost here — final hours to order",
      "Happy [Holiday] from the [Brand] team",
      "Post-[Holiday] clearance event starts now",
      "Thank you for celebrating [Season] with us",
      "Mark your calendar: next season launches [date]",
    ],
  };
  return subjects[type].slice(0, count);
}

function getDefaultPurposes(
  type: SequenceType,
  count: number
): string[] {
  const purposes: Record<SequenceType, string[]> = {
    welcome: [
      "Introduce your brand and deliver any promised incentive",
      "Share your brand story and build emotional connection",
      "Highlight popular products or services with social proof",
      "Address common questions and overcome initial objections",
      "Present a compelling offer to drive first conversion",
      "Showcase customer success stories and testimonials",
      "Reinforce your unique value proposition",
      "Create urgency with a time-limited welcome offer",
      "Introduce your community, loyalty program, or social channels",
      "Final welcome push with a strong conversion-oriented CTA",
      "Urgency reminder about expiring welcome benefits",
      "Transition to regular communication cadence",
    ],
    nurture: [
      "Deliver high-value educational content related to their interest",
      "Share an actionable framework or methodology they can apply today",
      "Present data, research, or industry insights that build authority",
      "Provide a relevant case study demonstrating real results",
      "Offer a free resource such as a guide, template, or checklist",
      "Address their core pain point with your solution as the answer",
      "Share expert tips that position you as a trusted advisor",
      "Introduce your solution naturally through problem-solving",
      "Build urgency and present a clear path to the next step",
      "Direct ask — invite them to take the primary conversion action",
      "Personal outreach from a team member to humanize the brand",
      "Final value delivery with a clear deadline or scarcity element",
    ],
    reengagement: [
      "Acknowledge absence and remind them what they are missing",
      "Share the most significant updates since they last engaged",
      "Offer a personalized incentive to return",
      "Use social proof to show what peers are achieving",
      "Ask for feedback to understand why they disengaged",
      "Present a low-friction way to re-engage with one click",
      "Create urgency with a time-limited reactivation offer",
      "Share fresh content or a new resource relevant to them",
      "Provide a final compelling reason to stay subscribed",
      "Sunset message — confirm they want to remain on the list",
      "Last gift or exclusive access before removal",
      "Final list-cleaning notice with one-click opt-in to stay",
    ],
    onboarding: [
      "Welcome and guide through the essential first action",
      "Walk through the core feature or primary product benefit",
      "Celebrate early progress and introduce the next milestone",
      "Share a power-user tip that accelerates time-to-value",
      "Address the most common support question proactively",
      "Highlight an underused feature that drives retention",
      "Share a success story from a similar user or customer",
      "Prompt a key action correlated with long-term retention",
      "Summarize progress and preview advanced capabilities",
      "Transition from onboarding to regular engagement cadence",
      "Introduce advanced features for users ready to level up",
      "First month recap celebrating milestones and suggesting next goals",
    ],
    cart: [
      "Gentle reminder that items are still in their cart",
      "Address common purchase hesitations with reassurance",
      "Show social proof — reviews and ratings for carted items",
      "Introduce a small incentive like a discount or free shipping",
      "Create urgency — low stock or expiring cart notification",
      "Highlight your guarantee, return policy, or risk reversal",
      "Final reminder with your strongest incentive",
      "Suggest alternative products if original items are selling out",
      "Win-back attempt with a fresh approach or bundle offer",
      "Last-chance notification before cart is cleared",
      "Offer extended hold with a small extra perk",
      "Final clearance notice with best available deal",
    ],
    postpurchase: [
      "Confirm the order and set clear delivery or service expectations",
      "Provide tips for getting maximum value from their purchase",
      "Check in on satisfaction and offer proactive support",
      "Suggest complementary products or services as a cross-sell",
      "Request a review or testimonial while satisfaction is high",
      "Share user-generated content and community stories",
      "Offer an exclusive loyalty or repeat-purchase incentive",
      "Invite them to join your referral or ambassador program",
      "Re-engage with new arrivals or updated offerings relevant to them",
      "Celebrate the customer relationship with VIP access or perks",
      "Deliver a loyalty reward based on their purchase history",
      "Anniversary or milestone celebration with exclusive offer",
    ],
    event: [
      "Confirm registration and share key event details and calendar link",
      "Build excitement with agenda highlights and speaker previews",
      "Provide preparation materials or pre-event resources",
      "Share networking tips and attendee engagement opportunities",
      "Send a countdown reminder with logistics and access links",
      "Highlight specific sessions aligned to their interests",
      "Encourage them to invite colleagues with a shareable link",
      "Day-before reminder with final logistics and tech check",
      "Day-of notification with live access link and schedule",
      "Post-event follow-up with recordings, resources, and next steps",
      "Key takeaways summary and post-event action items",
      "Announce the next event and offer early registration",
    ],
    seasonal: [
      "Build anticipation and awareness of upcoming seasonal offerings",
      "Offer early access to loyal subscribers before public launch",
      "Provide gift guides, planning resources, or seasonal tips",
      "Create countdown urgency as the holiday approaches",
      "Remind and re-engage with personalized seasonal recommendations",
      "Promote limited-time seasonal bundles or exclusive deals",
      "Drive last-minute purchases with urgency and shipping deadlines",
      "Deliver warm holiday greetings with a soft promotional touch",
      "Celebrate the season and deliver on any holiday promises",
      "Launch post-holiday clearance or new-season preview",
      "Thank subscribers and preview what is coming next",
      "Bridge to the next season to maintain year-round engagement",
    ],
  };
  return purposes[type].slice(0, count);
}

function getDefaultCtaTypes(
  type: SequenceType,
  count: number
): string[] {
  const ctas: Record<SequenceType, string[]> = {
    welcome: [
      "Get Started",
      "Learn More",
      "Explore Collection",
      "Learn More",
      "Claim Offer",
      "Read the Guide",
      "Shop Now",
      "Claim Offer",
      "Visit Website",
      "Shop Now",
      "Claim Offer",
      "Get Started",
    ],
    nurture: [
      "Read the Guide",
      "Download Resource",
      "Learn More",
      "Read the Guide",
      "Download Resource",
      "Learn More",
      "Read the Guide",
      "Download Resource",
      "Book a Call",
      "Book a Call",
      "Reply to This Email",
      "Claim Offer",
    ],
    reengagement: [
      "Visit Website",
      "Learn More",
      "Claim Offer",
      "Visit Website",
      "Reply to This Email",
      "Get Started",
      "Claim Offer",
      "Read the Guide",
      "Visit Website",
      "Reply to This Email",
      "Claim Offer",
      "Get Started",
    ],
    onboarding: [
      "Get Started",
      "Get Started",
      "Get Started",
      "Learn More",
      "Visit Website",
      "Get Started",
      "Read the Guide",
      "Download Resource",
      "Get Started",
      "Visit Website",
      "Learn More",
      "Get Started",
    ],
    cart: [
      "Return to Cart",
      "Complete Your Order",
      "Complete Your Order",
      "Return to Cart",
      "Return to Cart",
      "Complete Your Order",
      "Complete Your Order",
      "Shop Now",
      "Explore Collection",
      "Complete Your Order",
      "Claim Offer",
      "Complete Your Order",
    ],
    postpurchase: [
      "Visit Website",
      "Read the Guide",
      "Reply to This Email",
      "Shop Now",
      "Leave a Review",
      "Shop Now",
      "Claim Offer",
      "Share with a Friend",
      "Visit Website",
      "Claim Offer",
      "Shop Now",
      "Claim Offer",
    ],
    event: [
      "Add to Calendar",
      "Learn More",
      "Learn More",
      "Add to Calendar",
      "Download Resource",
      "Register Now",
      "Share with a Friend",
      "Add to Calendar",
      "Watch Now",
      "Watch Now",
      "Download Resource",
      "Register Now",
    ],
    seasonal: [
      "Explore Collection",
      "Shop Now",
      "Read the Guide",
      "Shop Now",
      "Explore Collection",
      "Shop Now",
      "Claim Offer",
      "Shop Now",
      "Visit Website",
      "Shop Now",
      "Visit Website",
      "Explore Collection",
    ],
  };
  return ctas[type].slice(0, count);
}

/* ------------------------------------------------------------------ */
/*  Best practices per sequence type                                   */
/* ------------------------------------------------------------------ */

interface Tip {
  title: string;
  description: string;
}

function getBestPractices(type: SequenceType): Tip[] {
  const tips: Record<SequenceType, Tip[]> = {
    welcome: [
      {
        title: "Send Immediately",
        description:
          "Welcome emails sent within the first hour of signup see significantly higher open rates than those delayed. Automate instant delivery.",
      },
      {
        title: "Deliver on Promises",
        description:
          "If you offered a lead magnet or discount at signup, deliver it in the first email. Broken promises erode trust from the start.",
      },
      {
        title: "Set Frequency Expectations",
        description:
          "Tell subscribers how often they will hear from you and what type of content to expect. This reduces early unsubscribes.",
      },
      {
        title: "Personalize Early",
        description:
          "Use their first name and reference the specific page or offer that triggered the signup. Generic messages feel like spam.",
      },
    ],
    nurture: [
      {
        title: "80/20 Content Rule",
        description:
          "Keep roughly 80% educational value and 20% promotion. Nurture sequences that sell too early see sharp unsubscribe spikes.",
      },
      {
        title: "Match Content to Buyer Stage",
        description:
          "Cold leads need awareness content first. Warm leads are ready for comparison content. Hot leads want proof and offers.",
      },
      {
        title: "Use Reply Triggers",
        description:
          "Ask a genuine question and monitor for replies. Subscribers who reply to your emails are far more likely to convert.",
      },
      {
        title: "Gate Your Best Content",
        description:
          "Put your most valuable resource behind a micro-commitment such as a click, reply, or short form. Engagement predicts purchase intent.",
      },
    ],
    reengagement: [
      {
        title: "Segment by Inactivity Period",
        description:
          "Someone inactive for 30 days needs a different message than someone gone for 6 months. Create separate segments for each window.",
      },
      {
        title: "Lead with Value, Not Guilt",
        description:
          "Focus on what they are missing rather than how you feel. Show new features, content, or offers — not emotional pleas.",
      },
      {
        title: "Clean Your List",
        description:
          "If they do not re-engage after the full sequence, remove them. A smaller, engaged list outperforms a large, inactive one.",
      },
      {
        title: "Ask Why They Left",
        description:
          "A simple one-question survey in the sequence can reveal systemic issues and inform product or service improvements.",
      },
    ],
    onboarding: [
      {
        title: "One Action Per Email",
        description:
          "Each onboarding email should have exactly one clear action. Multiple CTAs in a single email create decision paralysis.",
      },
      {
        title: "Show Progress",
        description:
          "Include a visual progress bar or checklist. People are motivated to complete sequences they have already started.",
      },
      {
        title: "Trigger Based on Behavior",
        description:
          "Send the next email only after they complete the previous action. Do not send Step 3 if they have not finished Step 2.",
      },
      {
        title: "Celebrate Milestones",
        description:
          "Acknowledge each completed step with positive reinforcement. Small wins build momentum toward full product adoption.",
      },
    ],
    cart: [
      {
        title: "Speed Matters",
        description:
          "Send the first reminder within 1 hour of abandonment. Recovery rates drop significantly after 24 hours pass.",
      },
      {
        title: "Show the Products",
        description:
          "Include images, names, and prices of the exact items in their cart. Visual reminders outperform text-only messages.",
      },
      {
        title: "Escalate Incentives Gradually",
        description:
          "Start with no discount. Add a small incentive in email 2 or 3. Reserve your best offer for the final email in the sequence.",
      },
      {
        title: "Remove Checkout Friction",
        description:
          "Link directly to a pre-filled checkout page. Every extra click between the email and purchase completion loses potential recoveries.",
      },
    ],
    postpurchase: [
      {
        title: "Ask for Reviews at Peak Satisfaction",
        description:
          "Request reviews 7 to 14 days after purchase — enough time to use the product, soon enough to remember the initial excitement.",
      },
      {
        title: "Cross-Sell, Not Upsell",
        description:
          "Suggest complementary items rather than upgrades. Phrasing like 'goes great with' converts better than 'you should also buy' language.",
      },
      {
        title: "Provide Usage Tips",
        description:
          "Help them succeed with their purchase. Customers who see results from a product buy again. Those who do not will churn.",
      },
      {
        title: "Build a Referral Loop",
        description:
          "Happy customers are your best acquisition channel. Include a referral incentive in the later emails of the sequence.",
      },
    ],
    event: [
      {
        title: "Front-Load Value",
        description:
          "Share exclusive pre-event content or resources. Give registrants a reason to stay engaged before the event starts.",
      },
      {
        title: "Make It Shareable",
        description:
          "Include a forward-to-a-colleague link or social share buttons. Peer invitations have the highest registration conversion rate.",
      },
      {
        title: "Send a Day-Before Reminder",
        description:
          "A well-timed day-before email with all logistics and access links significantly reduces no-show rates.",
      },
      {
        title: "Follow Up Within 24 Hours",
        description:
          "Send recordings, key takeaways, and a next-step CTA within 24 hours of the event. Interest decays rapidly after events end.",
      },
    ],
    seasonal: [
      {
        title: "Start 4 to 6 Weeks Early",
        description:
          "Begin your seasonal sequence well before the holiday. Early birds capture budget before competitors flood inboxes.",
      },
      {
        title: "Segment by Purchase History",
        description:
          "Returning seasonal buyers deserve different messaging than first-timers. Personalize offers based on past holiday purchases.",
      },
      {
        title: "Plan for Post-Season Too",
        description:
          "The sequence should not end on the holiday. Post-season clearance and thank-you emails extend the revenue window.",
      },
      {
        title: "Respect Inbox Fatigue",
        description:
          "During peak holiday periods, every brand increases email volume. Stand out with quality over quantity and clear value in every send.",
      },
    ],
  };
  return tips[type];
}

/* ------------------------------------------------------------------ */
/*  Generate default emails                                            */
/* ------------------------------------------------------------------ */

function generateDefaultEmails(
  type: SequenceType,
  count: number
): EmailConfig[] {
  const timings = getDefaultTimings(type, count);
  const subjects = getDefaultSubjectLines(type, count);
  const purposes = getDefaultPurposes(type, count);
  const ctas = getDefaultCtaTypes(type, count);

  return Array.from({ length: count }, (_, i) => ({
    subjectLine: subjects[i] || `Email ${i + 1} subject line`,
    daysAfterTrigger: timings[i] ?? i * 3,
    purpose: purposes[i] || `Purpose for email ${i + 1}`,
    ctaType: ctas[i] || "Learn More",
  }));
}

/* ------------------------------------------------------------------ */
/*  Timing formatter                                                   */
/* ------------------------------------------------------------------ */

function formatTiming(days: number, triggerLabel: string): string {
  if (days === 0) return `Immediately ${triggerLabel}`;
  if (days === 1) return `1 day ${triggerLabel}`;
  if (days === 7) return `1 week ${triggerLabel}`;
  if (days === 14) return `2 weeks ${triggerLabel}`;
  if (days === 21) return `3 weeks ${triggerLabel}`;
  if (days === 28) return `4 weeks ${triggerLabel}`;
  if (days === 30) return `1 month ${triggerLabel}`;
  if (days === 60) return `2 months ${triggerLabel}`;
  if (days === 90) return `3 months ${triggerLabel}`;
  return `${days} days ${triggerLabel}`;
}

/* ------------------------------------------------------------------ */
/*  Export as plain text                                                */
/* ------------------------------------------------------------------ */

function formatExportText(
  type: SequenceType,
  emails: EmailConfig[],
  tips: Tip[]
): string {
  const typeLabel =
    sequenceOptions.find((o) => o.value === type)?.label ?? type;
  const triggerLabel =
    sequenceOptions.find((o) => o.value === type)?.triggerLabel ?? "";

  const lines: string[] = [];

  lines.push("EMAIL SEQUENCE PLAN");
  lines.push("=".repeat(50));
  lines.push("");
  lines.push(`Sequence Type: ${typeLabel}`);
  lines.push(`Total Emails: ${emails.length}`);
  lines.push("");

  lines.push("SEQUENCE TIMELINE");
  lines.push("-".repeat(40));

  emails.forEach((email, i) => {
    lines.push("");
    lines.push(
      `EMAIL ${i + 1} — ${formatTiming(email.daysAfterTrigger, triggerLabel)}`
    );
    lines.push(`  Subject: ${email.subjectLine}`);
    lines.push(`  Purpose: ${email.purpose}`);
    lines.push(`  CTA: ${email.ctaType}`);
  });

  lines.push("");
  lines.push("BEST PRACTICES");
  lines.push("-".repeat(40));
  tips.forEach((tip) => {
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

function StepIndicator({
  current,
  labels,
}: {
  current: number;
  labels: string[];
}) {
  return (
    <div className="flex items-center gap-0 w-full print:hidden">
      {labels.map((label, i) => {
        const isActive = i === current;
        const isComplete = i < current;
        return (
          <div key={label} className="flex-1 flex flex-col items-center gap-2">
            <div className="flex items-center w-full">
              {i > 0 && (
                <div
                  className={`flex-1 h-[2px] ${
                    isComplete || isActive ? "bg-black" : "bg-gray-200"
                  }`}
                />
              )}
              <div
                className={`w-10 h-10 flex items-center justify-center text-base font-bold flex-shrink-0 ${
                  isActive
                    ? "bg-black text-white"
                    : isComplete
                      ? "bg-black text-white"
                      : "bg-gray-200 text-gray-500"
                }`}
              >
                {isComplete ? "✓" : i + 1}
              </div>
              {i < labels.length - 1 && (
                <div
                  className={`flex-1 h-[2px] ${
                    isComplete ? "bg-black" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
            <span
              className={`text-base font-bold text-center ${
                isActive || isComplete ? "text-black" : "text-gray-400"
              }`}
            >
              {label}
            </span>
          </div>
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
      aria-label="Copy email sequence plan to clipboard"
      className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center px-5 py-3 text-base font-bold border border-gray-200 text-gray-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
    >
      {copied ? "Copied" : "Copy to Clipboard"}
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
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [text, filename]);

  return (
    <button
      onClick={download}
      aria-label="Download email sequence plan as text file"
      className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center px-5 py-3 text-base font-bold border border-gray-200 text-gray-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
    >
      Download as Text
    </button>
  );
}

function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      aria-label="Print email sequence plan"
      className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center px-5 py-3 text-base font-bold border border-gray-200 text-gray-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
    >
      Print Summary
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default function EmailSequencePlannerPage() {
  const [step, setStep] = useState(0);
  const [sequenceType, setSequenceType] = useState<SequenceType | null>(
    null
  );
  const [emailCount, setEmailCount] = useState(5);
  const [emails, setEmails] = useState<EmailConfig[]>([]);
  const [expandedEmail, setExpandedEmail] = useState<number | null>(null);

  /* -- Step navigation -- */
  function goToStep(target: number) {
    setStep(target);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleConfigureDone() {
    if (!sequenceType) return;
    const defaults = generateDefaultEmails(sequenceType, emailCount);
    setEmails(defaults);
    setExpandedEmail(null);
    goToStep(1);
  }

  function handleCustomizeDone() {
    goToStep(2);
  }

  function handleReset() {
    setStep(0);
    setSequenceType(null);
    setEmailCount(5);
    setEmails([]);
    setExpandedEmail(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleBackToConfigure() {
    goToStep(0);
  }

  function handleBackToCustomize() {
    goToStep(1);
  }

  /* -- Email editing helpers -- */
  function updateEmail(
    index: number,
    field: keyof EmailConfig,
    value: string | number
  ) {
    setEmails((prev) =>
      prev.map((e, i) => (i === index ? { ...e, [field]: value } : e))
    );
  }

  function resetEmailToDefault(index: number) {
    if (!sequenceType) return;
    const defaults = generateDefaultEmails(sequenceType, emails.length);
    if (defaults[index]) {
      setEmails((prev) =>
        prev.map((e, i) => (i === index ? defaults[index] : e))
      );
    }
  }

  /* -- Derived -- */
  const selectedOption = sequenceOptions.find(
    (o) => o.value === sequenceType
  );
  const triggerLabel = selectedOption?.triggerLabel ?? "";
  const tips = sequenceType ? getBestPractices(sequenceType) : [];
  const plainText =
    sequenceType && emails.length > 0
      ? formatExportText(sequenceType, emails, tips)
      : "";

  return (
    <article className="min-h-screen">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Email Sequence Planner",
          description:
            "Free interactive tool to plan email marketing sequences. Choose a sequence type, set the number of emails, customize subject lines, timing, and CTAs, then export a printable plan.",
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
              Plan a complete email marketing sequence in minutes. Choose
              your sequence type, set the number of emails, customize each
              one, and export a ready-to-implement plan.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* ---- Step indicator ---- */}
      <section className="px-6 lg:px-12 pb-8 print:hidden">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <StepIndicator current={step} labels={STEP_LABELS} />
          </Animate>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  STEP 0 — Configure                                              */}
      {/* ================================================================ */}
      {step === 0 && (
        <section className="px-6 lg:px-12 pb-12">
          <div className="max-w-3xl mx-auto space-y-10">
            {/* Sequence type selector */}
            <Animate animation="fade-up">
              <div className="border border-gray-200">
                <div className="bg-black text-white px-6 py-5">
                  <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.25rem,3vw,1.5rem)] font-extrabold">
                    Choose Your Sequence Type
                  </h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {sequenceOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setSequenceType(opt.value)}
                        className={`min-h-[44px] p-5 text-left transition-all duration-300 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                          sequenceType === opt.value
                            ? "bg-black text-white"
                            : "bg-gray-50 text-gray-700 hover:bg-gray-100 hover:shadow-lg hover:-translate-y-1"
                        }`}
                      >
                        <span className="block text-base font-bold">
                          {opt.label}
                        </span>
                        <span
                          className={`block text-base mt-1 leading-relaxed ${
                            sequenceType === opt.value
                              ? "text-gray-300"
                              : "text-gray-500"
                          }`}
                        >
                          {opt.description}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Animate>

            {/* Email count selector */}
            <Animate animation="fade-up">
              <div className="border border-gray-200">
                <div className="bg-black text-white px-6 py-5">
                  <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.25rem,3vw,1.5rem)] font-extrabold">
                    How Many Emails?
                  </h2>
                </div>
                <div className="p-6 space-y-6">
                  <div className="flex items-center gap-6">
                    <label
                      htmlFor="email-count"
                      className="text-base font-bold text-black whitespace-nowrap"
                    >
                      Number of emails:
                    </label>
                    <input
                      id="email-count"
                      type="range"
                      min={3}
                      max={12}
                      value={emailCount}
                      onChange={(e) =>
                        setEmailCount(parseInt(e.target.value, 10))
                      }
                      className="flex-1 accent-black min-h-[44px] cursor-pointer"
                    />
                    <span className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black min-w-[48px] text-center font-[family-name:var(--font-display)]">
                      {emailCount}
                    </span>
                  </div>
                  <div className="flex justify-between text-base text-gray-400">
                    <span>3 emails</span>
                    <span>12 emails</span>
                  </div>
                  {sequenceType && (
                    <p className="text-base text-gray-500">
                      A {emailCount}-email{" "}
                      {selectedOption?.label.toLowerCase()} sequence
                      starting{" "}
                      {triggerLabel}.
                    </p>
                  )}
                </div>
              </div>
            </Animate>

            {/* Best practices preview */}
            {sequenceType && (
              <Animate animation="fade-up">
                <div className="border border-gray-200">
                  <div className="bg-black text-white px-6 py-5">
                    <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.25rem,3vw,1.5rem)] font-extrabold">
                      Best Practices: {selectedOption?.label}
                    </h2>
                  </div>
                  <div className="p-6 space-y-4">
                    {tips.map((tip) => (
                      <div
                        key={tip.title}
                        className="flex items-start gap-3 border-b border-gray-100 pb-4 last:border-b-0 last:pb-0"
                      >
                        <span className="inline-flex items-center justify-center min-w-[28px] h-7 bg-black text-white text-base font-bold flex-shrink-0">
                          {"✓"}
                        </span>
                        <div>
                          <p className="text-base font-bold text-black">
                            {tip.title}
                          </p>
                          <p className="text-base text-gray-500 mt-1 leading-relaxed">
                            {tip.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Animate>
            )}

            {/* Next button */}
            <Animate animation="fade-up">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleConfigureDone}
                  disabled={!sequenceType}
                  className={`min-h-[44px] px-10 py-4 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                    sequenceType
                      ? "bg-black text-white hover:bg-gray-800"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Customize Emails &rarr;
                </button>
                {!sequenceType && (
                  <p className="text-base text-gray-400">
                    Select a sequence type to continue.
                  </p>
                )}
              </div>
            </Animate>
          </div>
        </section>
      )}

      {/* ================================================================ */}
      {/*  STEP 1 — Customize Emails                                       */}
      {/* ================================================================ */}
      {step === 1 && sequenceType && (
        <section className="px-6 lg:px-12 pb-12">
          <div className="max-w-3xl mx-auto space-y-8">
            <Animate animation="fade-up">
              <div>
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-2">
                  Customize Your {selectedOption?.label} Sequence
                </h2>
                <p className="text-base text-gray-500 leading-relaxed">
                  Each email below is pre-filled with recommended defaults.
                  Click any email to expand and edit its subject line,
                  timing, purpose, and call-to-action. Your changes are
                  saved automatically.
                </p>
              </div>
            </Animate>

            {/* Email cards */}
            <Stagger stagger={80} className="space-y-4">
              {emails.map((email, i) => {
                const isExpanded = expandedEmail === i;
                return (
                  <div key={i} className="border border-gray-200">
                    {/* Collapsed header */}
                    <button
                      onClick={() =>
                        setExpandedEmail(isExpanded ? null : i)
                      }
                      aria-expanded={isExpanded}
                      aria-controls={`email-editor-${i}`}
                      className="w-full px-6 py-4 flex items-center justify-between gap-4 text-left min-h-[44px] hover:bg-gray-50 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <span className="w-10 h-10 bg-black text-white flex items-center justify-center text-base font-bold flex-shrink-0">
                          {i + 1}
                        </span>
                        <div className="min-w-0">
                          <p className="text-base font-bold text-black truncate">
                            {email.subjectLine}
                          </p>
                          <p className="text-base text-gray-500">
                            {formatTiming(
                              email.daysAfterTrigger,
                              triggerLabel
                            )}{" "}
                            &middot; {email.ctaType}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`text-base text-gray-400 flex-shrink-0 transition-transform motion-reduce:transition-none ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                        aria-hidden="true"
                      >
                        &#9660;
                      </span>
                    </button>

                    {/* Expanded editor */}
                    {isExpanded && (
                      <div
                        id={`email-editor-${i}`}
                        className="border-t border-gray-200 p-6 space-y-5 bg-gray-50"
                      >
                        {/* Subject line */}
                        <div>
                          <label
                            htmlFor={`subject-${i}`}
                            className="block text-base font-bold text-black mb-2"
                          >
                            Subject Line
                          </label>
                          <input
                            id={`subject-${i}`}
                            type="text"
                            value={email.subjectLine}
                            onChange={(e) =>
                              updateEmail(
                                i,
                                "subjectLine",
                                e.target.value
                              )
                            }
                            className="w-full px-4 py-3 border border-gray-200 text-base bg-white text-black min-h-[44px] focus-visible:border-black focus-visible:outline-none motion-reduce:transition-none"
                          />
                        </div>

                        {/* Timing */}
                        <div>
                          <label
                            htmlFor={`timing-${i}`}
                            className="block text-base font-bold text-black mb-2"
                          >
                            Days After Trigger
                          </label>
                          <div className="flex items-center gap-4">
                            <input
                              id={`timing-${i}`}
                              type="number"
                              min={0}
                              max={365}
                              value={email.daysAfterTrigger}
                              onChange={(e) =>
                                updateEmail(
                                  i,
                                  "daysAfterTrigger",
                                  Math.max(
                                    0,
                                    parseInt(e.target.value, 10) || 0
                                  )
                                )
                              }
                              className="w-24 px-4 py-3 border border-gray-200 text-base bg-white text-black min-h-[44px] focus-visible:border-black focus-visible:outline-none motion-reduce:transition-none"
                            />
                            <span className="text-base text-gray-500">
                              {formatTiming(
                                email.daysAfterTrigger,
                                triggerLabel
                              )}
                            </span>
                          </div>
                        </div>

                        {/* Purpose */}
                        <div>
                          <label
                            htmlFor={`purpose-${i}`}
                            className="block text-base font-bold text-black mb-2"
                          >
                            Purpose / Goal
                          </label>
                          <textarea
                            id={`purpose-${i}`}
                            value={email.purpose}
                            onChange={(e) =>
                              updateEmail(
                                i,
                                "purpose",
                                e.target.value
                              )
                            }
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-200 text-base bg-white text-black min-h-[44px] resize-y focus-visible:border-black focus-visible:outline-none motion-reduce:transition-none"
                          />
                        </div>

                        {/* CTA type */}
                        <div>
                          <label
                            htmlFor={`cta-${i}`}
                            className="block text-base font-bold text-black mb-2"
                          >
                            CTA Type
                          </label>
                          <select
                            id={`cta-${i}`}
                            value={email.ctaType}
                            onChange={(e) =>
                              updateEmail(
                                i,
                                "ctaType",
                                e.target.value
                              )
                            }
                            className="w-full px-4 py-3 border border-gray-200 text-base bg-white text-black min-h-[44px] appearance-none focus-visible:border-black focus-visible:outline-none motion-reduce:transition-none"
                          >
                            {ctaOptions.map((cta) => (
                              <option key={cta} value={cta}>
                                {cta}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Reset single email */}
                        <button
                          onClick={() => resetEmailToDefault(i)}
                          className="min-h-[44px] px-4 py-2 text-base font-bold text-gray-500 hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                        >
                          Reset to Default
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </Stagger>

            {/* Navigation */}
            <Animate animation="fade-up">
              <div className="flex items-center justify-between gap-4 pt-4">
                <button
                  onClick={handleBackToConfigure}
                  className="min-h-[44px] px-8 py-4 text-base font-bold border-2 border-black text-black hover:bg-black hover:text-white transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  &larr; Back
                </button>
                <button
                  onClick={handleCustomizeDone}
                  className="min-h-[44px] px-10 py-4 text-base font-bold bg-black text-white hover:bg-gray-800 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  Generate Plan &rarr;
                </button>
              </div>
            </Animate>
          </div>
        </section>
      )}

      {/* ================================================================ */}
      {/*  STEP 2 — Results                                                */}
      {/* ================================================================ */}
      {step === 2 && sequenceType && emails.length > 0 && (
        <section className="px-6 lg:px-12 pb-12">
          <div className="max-w-3xl mx-auto space-y-12">
            {/* ---- Sequence overview ---- */}
            <Animate animation="fade-up">
              <div>
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-2">
                  {selectedOption?.label} — {emails.length}-Email Plan
                </h2>
                <p className="text-base text-gray-500 leading-relaxed">
                  Your complete email sequence plan with subject lines,
                  timing, purposes, and calls-to-action. Use the export
                  options below to save or share this plan.
                </p>
              </div>
            </Animate>

            {/* ---- Visual timeline ---- */}
            <Animate animation="fade-up">
              <div className="border border-gray-200 p-6">
                <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-6">
                  Sequence Timeline
                </h3>
                <div className="relative">
                  {/* Vertical line */}
                  <div className="absolute left-[19px] top-0 bottom-0 w-[2px] bg-gray-200" />

                  <div className="space-y-4">
                    {emails.map((email, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-4 relative"
                      >
                        <div className="relative z-10 flex-shrink-0 w-10 h-10 bg-black text-white flex items-center justify-center text-base font-bold">
                          {i + 1}
                        </div>
                        <div className="pt-1 min-h-[44px]">
                          <p className="text-base font-bold text-black">
                            {formatTiming(
                              email.daysAfterTrigger,
                              triggerLabel
                            )}
                          </p>
                          <p className="text-base text-gray-500 truncate max-w-[260px] sm:max-w-none">
                            {email.subjectLine}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Animate>

            {/* ---- Full email cards ---- */}
            <Animate animation="fade-up">
              <h3 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-6">
                Your Email Sequence
              </h3>
            </Animate>

            <Stagger stagger={100} className="space-y-6">
              {emails.map((email, i) => (
                <div key={i} className="border border-gray-200">
                  <div className="bg-black text-white px-6 py-4">
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <span className="font-[family-name:var(--font-display)] text-[clamp(1.25rem,3vw,1.5rem)] font-extrabold">
                        Email {i + 1}
                      </span>
                      <span className="text-base text-gray-300">
                        {formatTiming(
                          email.daysAfterTrigger,
                          triggerLabel
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 space-y-5">
                    {/* Subject line */}
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
                      <p className="text-base text-gray-600 leading-relaxed">
                        {email.purpose}
                      </p>
                    </div>

                    {/* CTA */}
                    <div>
                      <p className="text-base font-bold text-black mb-1">
                        Recommended CTA
                      </p>
                      <span className="inline-block bg-black text-white px-4 py-2 text-base font-bold">
                        {email.ctaType}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </Stagger>

            {/* ---- Best practices ---- */}
            <Animate animation="fade-up">
              <h3 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-2">
                Best Practices
              </h3>
              <p className="text-base text-gray-500 mb-6">
                Tips to maximize the performance of your{" "}
                {selectedOption?.label.toLowerCase()} sequence.
              </p>
            </Animate>

            <Stagger
              stagger={100}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {tips.map((tip) => (
                <div
                  key={tip.title}
                  className="border border-gray-200 p-6"
                >
                  <h4 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">
                    {tip.title}
                  </h4>
                  <p className="text-base text-gray-600 leading-relaxed">
                    {tip.description}
                  </p>
                </div>
              ))}
            </Stagger>

            {/* ---- Export actions ---- */}
            <Animate animation="fade-up">
              <div className="flex flex-wrap justify-center gap-4 print:hidden">
                <CopyButton text={plainText} />
                <DownloadButton
                  text={plainText}
                  filename="email-sequence-plan.txt"
                />
                <PrintButton />
                <button
                  onClick={handleBackToCustomize}
                  className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center px-5 py-3 text-base font-bold border border-gray-200 text-gray-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  Edit Emails
                </button>
                <button
                  onClick={handleReset}
                  className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center px-5 py-3 text-base font-bold border-2 border-black text-black hover:bg-black hover:text-white transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  Start Over
                </button>
              </div>
            </Animate>
          </div>
        </section>
      )}

      {/* ---- Subject Line Formulas Reference ---- */}
      {step === 0 && (
        <section className="px-6 lg:px-12 py-16 border-t border-gray-200">
          <div className="max-w-4xl mx-auto">
            <Animate animation="fade-up">
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-2">
                Subject Line Formulas That Work
              </h2>
              <p className="text-base text-gray-500 mb-8 leading-relaxed">
                Use these proven subject line structures as starting points
                when customizing your sequence emails.
              </p>
            </Animate>
            <Stagger
              stagger={100}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {[
                {
                  formula: "The Curiosity Gap",
                  example:
                    "The one thing most [audience] get wrong about [topic]",
                  tip: "Tease information without giving it away. The reader opens to close the gap.",
                },
                {
                  formula: "The How-To",
                  example:
                    "How to [achieve result] in [timeframe]",
                  tip: "Promise a clear outcome with a specific timeframe. Specificity builds credibility.",
                },
                {
                  formula: "The Number List",
                  example:
                    "[Number] ways to [achieve result] without [common pain]",
                  tip: "Odd numbers tend to outperform even ones. Keep the number between 3 and 9.",
                },
                {
                  formula: "The Personal Touch",
                  example:
                    "[First Name], I noticed you [action] — here is your next step",
                  tip: "Reference a specific behavior or interaction. Personalization goes beyond first name.",
                },
                {
                  formula: "The Urgency Driver",
                  example: "Ending tonight: [offer or benefit]",
                  tip: "Only use real deadlines. False urgency erodes trust and damages deliverability over time.",
                },
                {
                  formula: "The Social Proof",
                  example:
                    "Why [number]+ [audience type] switched to [Brand]",
                  tip: "Let your audience size or customer results do the selling. Numbers add weight.",
                },
              ].map((item) => (
                <div
                  key={item.formula}
                  className="border border-gray-200 p-6"
                >
                  <div className="flex items-start gap-4">
                    <div>
                      <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">
                        {item.formula}
                      </h3>
                      <p className="text-base text-gray-600 bg-gray-50 px-4 py-3 border border-gray-100 mb-3 italic">
                        {item.example}
                      </p>
                      <p className="text-base text-gray-500 leading-relaxed">
                        {item.tip}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {/* ---- Optimal Send Times Reference ---- */}
      {step === 0 && (
        <section className="px-6 lg:px-12 py-16 border-t border-gray-200">
          <div className="max-w-4xl mx-auto">
            <Animate animation="fade-up">
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-2">
                Optimal Send Timing by Sequence Type
              </h2>
              <p className="text-base text-gray-500 mb-8 leading-relaxed">
                Recommended spacing between emails based on sequence type
                and subscriber engagement patterns.
              </p>
            </Animate>
            <Stagger stagger={100} className="space-y-4">
              {[
                {
                  type: "Welcome Series",
                  timing: "Day 0, 1, 3, 5, 7",
                  note: "Front-load the first week while brand awareness is highest. Space out after the initial burst.",
                },
                {
                  type: "Lead Nurture",
                  timing: "Every 3 to 7 days",
                  note: "Consistent but not overwhelming. Match frequency to content depth: heavier content needs more breathing room.",
                },
                {
                  type: "Cart Abandonment",
                  timing: "1 hour, 1 day, 3 days, 5 days",
                  note: "The first reminder should arrive within 1 hour. Urgency decreases with each subsequent email.",
                },
                {
                  type: "Onboarding",
                  timing: "Day 0, 1, 3, 5, 7, 14",
                  note: "Ideally triggered by user actions, not just time. If behavior-triggered, these serve as fallback timing.",
                },
                {
                  type: "Re-engagement",
                  timing: "Day 0, 3, 7, 14, 21",
                  note: "Wider spacing signals respect for their inbox. Compress only if offering escalating incentives.",
                },
                {
                  type: "Post-Purchase",
                  timing: "Day 0, 3, 7, 14, 30",
                  note: "Match timing to product delivery and usage cycle. Review requests work best 7 to 14 days after receipt.",
                },
                {
                  type: "Event / Webinar",
                  timing: "Registration, 7 days, 1 day, day-of, +1 day",
                  note: "Increase frequency as the event approaches. Post-event follow-up should land within 24 hours.",
                },
                {
                  type: "Seasonal / Holiday",
                  timing: "4 weeks, 2 weeks, 1 week, 3 days, day-of",
                  note: "Start early to capture planners. Increase frequency in the final week with clear shipping or access deadlines.",
                },
              ].map((item) => (
                <div
                  key={item.type}
                  className="border border-gray-200 p-6 grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-4"
                >
                  <div>
                    <p className="text-base font-bold text-black">
                      {item.type}
                    </p>
                    <p className="text-base text-gray-600 mt-1">
                      {item.timing}
                    </p>
                  </div>
                  <p className="text-base text-gray-500 leading-relaxed">
                    {item.note}
                  </p>
                </div>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {/* ---- Bottom CTA ---- */}
      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center print:hidden">
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
              className="inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-5 min-h-[44px] font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              Get a Free Consultation &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    </article>
  );
}
