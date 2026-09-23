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

interface SingleSelectStep {
  id: string;
  question: string;
  type: "single";
  options: QuizOption[];
}

interface MultiSelectStep {
  id: string;
  question: string;
  type: "multi";
  options: QuizOption[];
}

type QuizStep = SingleSelectStep | MultiSelectStep;

type AnswerMap = Record<string, string | string[]>;

/* ------------------------------------------------------------------ */
/*  Persona result types                                               */
/* ------------------------------------------------------------------ */

interface PersonaCard {
  name: string;
  role: string;
  ageRange: string;
  goals: string[];
  painPoints: string[];
}

interface DemographicsSummary {
  industry: string;
  pricePoint: string;
  decisionMaker: string;
  decisionTimeline: string;
}

interface CommunicationStrategy {
  channels: string[];
  messageTone: string;
  contentTypes: string[];
}

interface ObjectionCounter {
  objection: string;
  strategy: string;
}

interface ContentStageMap {
  awareness: string[];
  consideration: string[];
  decision: string[];
}

interface PersonaResults {
  persona: PersonaCard;
  demographics: DemographicsSummary;
  communication: CommunicationStrategy;
  objectionHandling: ObjectionCounter[];
  contentStrategy: ContentStageMap;
}

/* ------------------------------------------------------------------ */
/*  Quiz steps                                                         */
/* ------------------------------------------------------------------ */

const steps: QuizStep[] = [
  {
    id: "industry",
    question: "What industry is your business in?",
    type: "single",
    options: [
      { label: "E-commerce", value: "ecommerce" },
      { label: "SaaS", value: "saas" },
      { label: "Healthcare", value: "healthcare" },
      { label: "Real Estate", value: "realestate" },
      { label: "Education", value: "education" },
      { label: "Professional Services", value: "professional" },
      { label: "Hospitality", value: "hospitality" },
      { label: "Manufacturing", value: "manufacturing" },
      { label: "Finance", value: "finance" },
      { label: "Other", value: "other" },
    ],
  },
  {
    id: "pricePoint",
    question: "What is your product or service price point?",
    type: "single",
    options: [
      { label: "Under $50", value: "under50" },
      { label: "$50 - $500", value: "50to500" },
      { label: "$500 - $5,000", value: "500to5k" },
      { label: "$5,000 - $50,000", value: "5kto50k" },
      { label: "$50,000+", value: "50kplus" },
    ],
  },
  {
    id: "decisionMaker",
    question: "Who is the primary decision maker?",
    type: "single",
    options: [
      { label: "Individual Consumer", value: "consumer" },
      { label: "Small Business Owner", value: "sbo" },
      { label: "Marketing Manager", value: "marketing" },
      { label: "C-Suite Executive", value: "csuite" },
      { label: "Procurement Team", value: "procurement" },
      { label: "IT Decision Maker", value: "it" },
    ],
  },
  {
    id: "purchaseTrigger",
    question: "What typically triggers a purchase?",
    type: "single",
    options: [
      { label: "Problem / Pain Point", value: "painpoint" },
      { label: "Seasonal Need", value: "seasonal" },
      { label: "Competitive Pressure", value: "competitive" },
      { label: "Regulatory Requirement", value: "regulatory" },
      { label: "Growth Initiative", value: "growth" },
      { label: "Cost Reduction", value: "costreduction" },
    ],
  },
  {
    id: "infoSources",
    question: "Where does your buyer look for information? (select all that apply)",
    type: "multi",
    options: [
      { label: "Search Engines", value: "search" },
      { label: "Social Media", value: "social" },
      { label: "Industry Publications", value: "publications" },
      { label: "Peer Recommendations", value: "peers" },
      { label: "Online Reviews", value: "reviews" },
      { label: "Conferences / Events", value: "conferences" },
      { label: "Sales Outreach", value: "sales" },
    ],
  },
  {
    id: "objections",
    question: "What are the most common buying objections? (select all that apply)",
    type: "multi",
    options: [
      { label: "Price", value: "price" },
      { label: "Complexity", value: "complexity" },
      { label: "Risk / Trust", value: "risk" },
      { label: "Timeline", value: "timeline" },
      { label: "Internal Buy-In", value: "buyin" },
      { label: "Switching Costs", value: "switching" },
    ],
  },
  {
    id: "contentPref",
    question: "What content format does your buyer prefer?",
    type: "single",
    options: [
      { label: "Short-Form Video", value: "shortvideo" },
      { label: "Long-Form Articles", value: "articles" },
      { label: "Case Studies", value: "casestudies" },
      { label: "Webinars", value: "webinars" },
      { label: "Podcasts", value: "podcasts" },
      { label: "Infographics", value: "infographics" },
    ],
  },
  {
    id: "decisionTimeline",
    question: "How long does the typical buying decision take?",
    type: "single",
    options: [
      { label: "Same Day", value: "sameday" },
      { label: "1 Week", value: "1week" },
      { label: "1 - 3 Months", value: "1to3months" },
      { label: "3 - 6 Months", value: "3to6months" },
      { label: "6+ Months", value: "6plusmonths" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Persona generation engine                                          */
/* ------------------------------------------------------------------ */

const personaNames: Record<string, { name: string; role: string }> = {
  consumer: { name: "Alex the Shopper", role: "Individual Buyer" },
  sbo: { name: "Jordan the Founder", role: "Small Business Owner" },
  marketing: { name: "Taylor the Strategist", role: "Marketing Manager" },
  csuite: { name: "Morgan the Executive", role: "Chief Officer" },
  procurement: { name: "Casey the Evaluator", role: "Procurement Lead" },
  it: { name: "Riley the Tech Lead", role: "IT Decision Maker" },
};

const ageRangeMap: Record<string, string> = {
  consumer: "22-38",
  sbo: "30-50",
  marketing: "28-42",
  csuite: "38-55",
  procurement: "32-48",
  it: "28-45",
};

function getGoals(answers: AnswerMap): string[] {
  const goals: string[] = [];
  const trigger = answers.purchaseTrigger as string;
  const price = answers.pricePoint as string;
  const dm = answers.decisionMaker as string;

  if (trigger === "painpoint") goals.push("Find a reliable solution to an ongoing challenge");
  if (trigger === "seasonal") goals.push("Secure the right solution before the peak season hits");
  if (trigger === "competitive") goals.push("Stay ahead of competitors with better tools or services");
  if (trigger === "regulatory") goals.push("Achieve and maintain compliance without disruption");
  if (trigger === "growth") goals.push("Scale operations while keeping quality consistent");
  if (trigger === "costreduction") goals.push("Cut expenses without sacrificing output");

  if (price === "under50" || price === "50to500") {
    goals.push("Get clear value for every dollar spent");
  } else {
    goals.push("Justify the investment with measurable ROI");
  }

  if (dm === "csuite" || dm === "procurement") {
    goals.push("Minimize risk and ensure vendor reliability");
  } else if (dm === "marketing") {
    goals.push("Prove results to leadership and secure ongoing budget");
  } else if (dm === "sbo") {
    goals.push("Free up time by finding solutions that just work");
  } else if (dm === "it") {
    goals.push("Ensure seamless integration with existing systems");
  } else {
    goals.push("Find the best option without wasting time on research");
  }

  return goals;
}

function getPainPoints(answers: AnswerMap): string[] {
  const pains: string[] = [];
  const objections = (answers.objections as string[]) || [];
  const timeline = answers.decisionTimeline as string;
  const dm = answers.decisionMaker as string;

  if (objections.includes("price")) pains.push("Budget constraints make it hard to commit without clear ROI evidence");
  if (objections.includes("complexity")) pains.push("Worried about a steep learning curve and implementation effort");
  if (objections.includes("risk")) pains.push("Hesitant to trust a new vendor or unproven solution");
  if (objections.includes("timeline")) pains.push("Needs results fast but the process feels too slow");
  if (objections.includes("buyin")) pains.push("Struggles to get buy-in from multiple stakeholders");
  if (objections.includes("switching")) pains.push("Current solution is entrenched and switching feels risky");

  if (timeline === "6plusmonths" || timeline === "3to6months") {
    pains.push("Long evaluation cycles create decision fatigue");
  }

  if (dm === "sbo") {
    pains.push("Wears too many hats to dedicate time to thorough vendor evaluation");
  } else if (dm === "csuite") {
    pains.push("Needs concise, high-level information rather than technical detail");
  }

  return pains.slice(0, 5);
}

function getChannels(answers: AnswerMap): string[] {
  const sources = (answers.infoSources as string[]) || [];
  const channelMap: Record<string, string> = {
    search: "Search Engine Marketing (Google, Bing)",
    social: "Social Media (LinkedIn, Instagram, Facebook)",
    publications: "Industry Blogs and Trade Publications",
    peers: "Referral Programs and Community Groups",
    reviews: "Review Platforms (G2, Capterra, Yelp)",
    conferences: "Events, Webinars, and Trade Shows",
    sales: "Direct Outreach (Email, Phone, LinkedIn DM)",
  };
  return sources.map((s) => channelMap[s] || s);
}

function getMessageTone(answers: AnswerMap): string {
  const dm = answers.decisionMaker as string;
  const price = answers.pricePoint as string;

  if (dm === "csuite") return "Executive-level: concise, data-driven, focused on business outcomes and ROI";
  if (dm === "procurement") return "Professional and structured: emphasize compliance, reliability, and total cost of ownership";
  if (dm === "it") return "Technical and precise: speak to integrations, security, and architecture";
  if (dm === "marketing") return "Results-oriented: lead with metrics, case studies, and competitive advantages";
  if (dm === "sbo") {
    if (price === "under50" || price === "50to500") return "Friendly and practical: short, benefit-first messaging that respects their time";
    return "Consultative: position as a partner who understands small business realities";
  }
  if (price === "under50") return "Casual and direct: highlight convenience, social proof, and instant value";
  return "Approachable and clear: balance credibility with relatability";
}

function getContentTypes(answers: AnswerMap): string[] {
  const pref = answers.contentPref as string;
  const dm = answers.decisionMaker as string;

  const types: string[] = [];

  const prefMap: Record<string, string> = {
    shortvideo: "Short-Form Video (Reels, TikTok, Shorts)",
    articles: "Long-Form Blog Posts and Guides",
    casestudies: "Customer Case Studies and Success Stories",
    webinars: "Live and On-Demand Webinars",
    podcasts: "Podcast Episodes and Audio Content",
    infographics: "Visual Infographics and Data Summaries",
  };

  types.push(prefMap[pref] || pref);

  if (dm === "csuite" && pref !== "casestudies") types.push("Executive Summaries and One-Pagers");
  if (dm === "it" && pref !== "webinars") types.push("Technical Documentation and Architecture Overviews");
  if (dm === "marketing" && pref !== "casestudies") types.push("ROI Calculators and Benchmark Reports");
  if ((dm === "consumer" || dm === "sbo") && pref !== "shortvideo") types.push("Quick Comparison Guides");

  return types;
}

function getObjectionLabel(value: string): string {
  const labels: Record<string, string> = {
    price: "Price",
    complexity: "Complexity",
    risk: "Risk / Trust",
    timeline: "Timeline",
    buyin: "Internal Buy-In",
    switching: "Switching Costs",
  };
  return labels[value] || value;
}

function getObjectionCounters(answers: AnswerMap): ObjectionCounter[] {
  const objections = (answers.objections as string[]) || [];
  const counterMap: Record<string, string> = {
    price: "Lead with ROI data and total cost of ownership. Offer tiered pricing, free trials, or money-back guarantees to lower the barrier.",
    complexity: "Provide guided onboarding, demo videos, and a dedicated support contact. Emphasize time-to-value over feature depth.",
    risk: "Share customer testimonials, case studies with measurable results, and third-party certifications. Offer pilot programs.",
    timeline: "Present a clear implementation roadmap with milestones. Show quick-win features that deliver value in the first week.",
    buyin: "Create stakeholder-ready materials: one-pagers for leadership, technical specs for IT, and ROI projections for finance.",
    switching: "Offer migration assistance, data import tools, and parallel-run periods. Quantify the cost of staying with the current solution.",
  };

  return objections.map((obj) => ({
    objection: getObjectionLabel(obj),
    strategy: counterMap[obj] || "Address this concern directly with relevant proof points and risk-reduction measures.",
  }));
}

function getContentStrategy(answers: AnswerMap): ContentStageMap {
  const pref = answers.contentPref as string;
  const dm = answers.decisionMaker as string;
  const industry = answers.industry as string;

  const awareness: string[] = [];
  const consideration: string[] = [];
  const decision: string[] = [];

  /* Awareness */
  if (pref === "shortvideo") awareness.push("Educational short-form videos addressing common industry pain points");
  else if (pref === "articles") awareness.push("SEO-optimized blog posts covering top-of-funnel questions");
  else if (pref === "infographics") awareness.push("Shareable infographics with industry statistics and trends");
  else if (pref === "podcasts") awareness.push("Guest appearances on industry podcasts to build authority");
  else awareness.push("Thought leadership content that introduces the problem space");

  awareness.push("Social media posts that highlight relatable challenges your buyer faces");
  if (industry === "saas" || industry === "ecommerce") awareness.push("Interactive tools or quizzes that engage visitors");
  else awareness.push("Industry report or benchmark study that earns backlinks and shares");

  /* Consideration */
  if (dm === "csuite" || dm === "procurement") consideration.push("Vendor comparison guides with transparent feature and pricing tables");
  else consideration.push("Detailed how-to guides that position your product as the solution");

  if (pref === "casestudies") consideration.push("In-depth case studies showing measurable outcomes for similar businesses");
  else if (pref === "webinars") consideration.push("Live webinars with Q&A that address specific use cases");
  else consideration.push("Product walkthroughs and demo videos");

  consideration.push("Email nurture sequences that build trust over multiple touchpoints");

  /* Decision */
  decision.push("Customer testimonials and success stories from the same industry");
  if (dm === "csuite" || dm === "procurement") decision.push("Executive summary with ROI projections and implementation timeline");
  else if (dm === "it") decision.push("Technical documentation, security whitepapers, and integration guides");
  else decision.push("Free trial, consultation, or product demo tailored to their specific needs");

  decision.push("Personalized proposal or pricing page that removes friction from the final step");

  return { awareness, consideration, decision };
}

function buildPersonaResults(answers: AnswerMap): PersonaResults {
  const dm = answers.decisionMaker as string;
  const persona = personaNames[dm] || { name: "Sam the Buyer", role: "Decision Maker" };

  return {
    persona: {
      name: persona.name,
      role: persona.role,
      ageRange: ageRangeMap[dm] || "25-45",
      goals: getGoals(answers),
      painPoints: getPainPoints(answers),
    },
    demographics: {
      industry: (steps[0].options.find((o) => o.value === answers.industry) || { label: "General" }).label,
      pricePoint: (steps[1].options.find((o) => o.value === answers.pricePoint) || { label: "—" }).label,
      decisionMaker: (steps[2].options.find((o) => o.value === answers.decisionMaker) || { label: "—" }).label,
      decisionTimeline: (steps[7].options.find((o) => o.value === answers.decisionTimeline) || { label: "—" }).label,
    },
    communication: {
      channels: getChannels(answers),
      messageTone: getMessageTone(answers),
      contentTypes: getContentTypes(answers),
    },
    objectionHandling: getObjectionCounters(answers),
    contentStrategy: getContentStrategy(answers),
  };
}

/* ------------------------------------------------------------------ */
/*  Format results as plain text                                       */
/* ------------------------------------------------------------------ */

function formatResultsText(results: PersonaResults): string {
  const lines: string[] = [];

  lines.push("BUYER PERSONA PROFILE");
  lines.push("=".repeat(50));
  lines.push("");

  lines.push("PERSONA CARD");
  lines.push("-".repeat(30));
  lines.push(`Name: ${results.persona.name}`);
  lines.push(`Role: ${results.persona.role}`);
  lines.push(`Age Range: ${results.persona.ageRange}`);
  lines.push("");
  lines.push("Goals:");
  results.persona.goals.forEach((g) => lines.push(`  - ${g}`));
  lines.push("");
  lines.push("Pain Points:");
  results.persona.painPoints.forEach((p) => lines.push(`  - ${p}`));
  lines.push("");

  lines.push("KEY DEMOGRAPHICS");
  lines.push("-".repeat(30));
  lines.push(`Industry: ${results.demographics.industry}`);
  lines.push(`Price Point: ${results.demographics.pricePoint}`);
  lines.push(`Decision Maker: ${results.demographics.decisionMaker}`);
  lines.push(`Decision Timeline: ${results.demographics.decisionTimeline}`);
  lines.push("");

  lines.push("COMMUNICATION STRATEGY");
  lines.push("-".repeat(30));
  lines.push(`Message Tone: ${results.communication.messageTone}`);
  lines.push("");
  lines.push("Preferred Channels:");
  results.communication.channels.forEach((c) => lines.push(`  - ${c}`));
  lines.push("");
  lines.push("Content Types:");
  results.communication.contentTypes.forEach((t) => lines.push(`  - ${t}`));
  lines.push("");

  lines.push("OBJECTION HANDLING GUIDE");
  lines.push("-".repeat(30));
  results.objectionHandling.forEach((o) => {
    lines.push(`${o.objection}:`);
    lines.push(`  ${o.strategy}`);
    lines.push("");
  });

  lines.push("CONTENT STRATEGY MAP");
  lines.push("-".repeat(30));
  lines.push("Awareness Stage:");
  results.contentStrategy.awareness.forEach((a) => lines.push(`  - ${a}`));
  lines.push("");
  lines.push("Consideration Stage:");
  results.contentStrategy.consideration.forEach((c) => lines.push(`  - ${c}`));
  lines.push("");
  lines.push("Decision Stage:");
  results.contentStrategy.decision.forEach((d) => lines.push(`  - ${d}`));
  lines.push("");

  lines.push("Generated by Markit Media Buyer Persona Quiz");
  lines.push("https://themarkitmedia.com/resources/buyer-persona-quiz");

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Buyer Persona Quiz",
          description: "Free interactive quiz that helps you build a detailed buyer persona profile based on your business information.",
          url: "https://themarkitmedia.com/en/resources/buyer-persona-quiz",
          applicationCategory: "Marketing Tool",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          provider: { "@type": "Organization", name: "Markit Media", url: "https://themarkitmedia.com" },
        }) }}
      />
      <title>Buyer Persona Quiz | Free Marketing Tool — Markit Media</title>
      <meta name="description" content="Free interactive quiz that helps you build a detailed buyer persona profile based on your business information." />
      {copied ? "Copied" : "Copy to Clipboard"}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */



export default function BuyerPersonaQuizPage() {
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const totalSteps = steps.length;
  const step = steps[currentStep];

  const currentAnswered = step.type === "multi"
    ? Array.isArray(answers[step.id]) && (answers[step.id] as string[]).length > 0
    : answers[step.id] !== undefined;

  const allAnswered = steps.every((s) =>
    s.type === "multi"
      ? Array.isArray(answers[s.id]) && (answers[s.id] as string[]).length > 0
      : answers[s.id] !== undefined
  );

  const answeredCount = steps.filter((s) =>
    s.type === "multi"
      ? Array.isArray(answers[s.id]) && (answers[s.id] as string[]).length > 0
      : answers[s.id] !== undefined
  ).length;

  function handleSingleSelect(value: string) {
    setAnswers((prev) => ({ ...prev, [step.id]: value }));
  }

  function handleMultiToggle(value: string) {
    setAnswers((prev) => {
      const current = (prev[step.id] as string[]) || [];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [step.id]: next };
    });
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

  const results = submitted ? buildPersonaResults(answers) : null;
  const plainText = results ? formatResultsText(results) : "";

  return (
    <article className="min-h-screen">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Buyer Persona Quiz",
          description:
            "Free interactive quiz that helps you build a detailed buyer persona profile based on your business information.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />

      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Buyer Persona Quiz" },
        ]}
      />

      {/* ---- Hero ---- */}
      <section aria-label="Free Tool" className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Buyer Persona Quiz
            </h1>
            <SectionDesc>
              Answer 8 questions about your business and buyers to generate a
              detailed persona profile with demographics, communication
              strategy, objection handling, and a content strategy map.
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
                    const stepAnswered = s.type === "multi"
                      ? Array.isArray(answers[s.id]) && (answers[s.id] as string[]).length > 0
                      : answers[s.id] !== undefined;
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
                    {step.type === "multi" ? (
                      /* Multi-select with checkboxes */
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {step.options.map((opt) => {
                          const selected = ((answers[step.id] as string[]) || []).includes(opt.value);
                          return (
                            <label
                              key={opt.value}
                              className={`min-h-[44px] px-5 py-4 text-base text-left font-bold flex items-center gap-3 cursor-pointer transition-all duration-300 motion-reduce:transition-none focus-within:outline-2 focus-within:outline-black focus-within:outline-offset-2 ${
                                selected
                                  ? "bg-black text-white"
                                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:shadow-lg hover:-translate-y-1"
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={selected}
                                onChange={() => handleMultiToggle(opt.value)}
                                className="w-5 h-5 accent-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                              />
                              {opt.label}
                            </label>
                          );
                        })}
                      </div>
                    ) : (
                      /* Single-select with clickable buttons */
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {step.options.map((opt) => (
                          <button
                            key={opt.value}
                            onClick={() => handleSingleSelect(opt.value)}
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
                    )}
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
                    Build My Persona &rarr;
                  </button>
                )}
              </div>

              {!allAnswered && currentStep === totalSteps - 1 && (
                <p className="text-base text-gray-400 text-center mt-4">
                  Answer all {totalSteps} questions to build your persona
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
            aria-label="Buyer persona results"
          >
            <div className="max-w-3xl mx-auto">
              {/* ---- Persona Card ---- */}
              <Animate animation="fade-up">
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-6">
                  Your Buyer Persona
                </h2>
              </Animate>

              <Animate animation="fade-up">
                <div className="border border-gray-200 mb-12">
                  <div className="bg-black text-white px-6 py-5">
                    <p className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold">
                      {results.persona.name}
                    </p>
                    <p className="text-base text-gray-300 mt-1">
                      {results.persona.role} &middot; Age {results.persona.ageRange}
                    </p>
                  </div>
                  <div className="p-6 space-y-6">
                    <div>
                      <p className="text-base font-bold text-black mb-3">Goals</p>
                      <ul className="space-y-2">
                        {results.persona.goals.map((goal, i) => (
                          <li key={i} className="flex items-start gap-3 text-base text-gray-600">
                            <span className="font-bold text-black min-w-[24px]">{i + 1}.</span>
                            <span>{goal}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-base font-bold text-black mb-3">Pain Points</p>
                      <ul className="space-y-2">
                        {results.persona.painPoints.map((pain, i) => (
                          <li key={i} className="flex items-start gap-3 text-base text-gray-600">
                            <span className="font-bold text-black min-w-[24px]">{i + 1}.</span>
                            <span>{pain}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Animate>

              {/* ---- Key Demographics ---- */}
              <Animate animation="fade-up">
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-6">
                  Key Demographics
                </h2>
              </Animate>

              <Animate animation="fade-up">
                <div className="border border-gray-200 p-6 mb-12">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <p className="text-base font-bold text-black mb-1">Industry</p>
                      <p className="text-base text-gray-600">{results.demographics.industry}</p>
                    </div>
                    <div>
                      <p className="text-base font-bold text-black mb-1">Price Point</p>
                      <p className="text-base text-gray-600">{results.demographics.pricePoint}</p>
                    </div>
                    <div>
                      <p className="text-base font-bold text-black mb-1">Decision Maker</p>
                      <p className="text-base text-gray-600">{results.demographics.decisionMaker}</p>
                    </div>
                    <div>
                      <p className="text-base font-bold text-black mb-1">Decision Timeline</p>
                      <p className="text-base text-gray-600">{results.demographics.decisionTimeline}</p>
                    </div>
                  </div>
                </div>
              </Animate>

              {/* ---- Communication Strategy ---- */}
              <Animate animation="fade-up">
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-6">
                  Communication Strategy
                </h2>
              </Animate>

              <Animate animation="fade-up">
                <div className="border border-gray-200 p-6 mb-12 space-y-6">
                  <div>
                    <p className="text-base font-bold text-black mb-1">Message Tone</p>
                    <p className="text-base text-gray-600">{results.communication.messageTone}</p>
                  </div>
                  <div>
                    <p className="text-base font-bold text-black mb-3">Preferred Channels</p>
                    <ul className="space-y-2">
                      {results.communication.channels.map((ch, i) => (
                        <li key={i} className="flex items-start gap-3 text-base text-gray-600">
                          <span className="font-bold text-black min-w-[24px]">{i + 1}.</span>
                          <span>{ch}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-base font-bold text-black mb-3">Content Types</p>
                    <ul className="space-y-2">
                      {results.communication.contentTypes.map((ct, i) => (
                        <li key={i} className="flex items-start gap-3 text-base text-gray-600">
                          <span className="font-bold text-black min-w-[24px]">{i + 1}.</span>
                          <span>{ct}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Animate>

              {/* ---- Objection Handling Guide ---- */}
              <Animate animation="fade-up">
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-6">
                  Objection Handling Guide
                </h2>
              </Animate>

              <Stagger stagger={100} className="space-y-4 mb-12">
                {results.objectionHandling.map((item) => (
                  <div
                    key={item.objection}
                    className="border border-gray-200 p-6"
                  >
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">
                      {item.objection}
                    </h3>
                    <p className="text-base text-gray-600">{item.strategy}</p>
                  </div>
                ))}
              </Stagger>

              {/* ---- Content Strategy Map ---- */}
              <Animate animation="fade-up">
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-2">
                  Content Strategy Map
                </h2>
                <p className="text-base text-gray-500 mb-6">
                  What to create for each stage of your buyer&apos;s journey.
                </p>
              </Animate>

              <Stagger stagger={100} className="space-y-6 mb-12">
                {(
                  [
                    { label: "Awareness", items: results.contentStrategy.awareness },
                    { label: "Consideration", items: results.contentStrategy.consideration },
                    { label: "Decision", items: results.contentStrategy.decision },
                  ] as { label: string; items: string[] }[]
                ).map((stage) => (
                  <div
                    key={stage.label}
                    className="border border-gray-200 p-6"
                  >
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">
                      {stage.label}
                    </h3>
                    <ul className="space-y-3">
                      {stage.items.map((item, i) => (
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
              Need Help Reaching Your Ideal Buyer?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Our team builds targeted marketing strategies around real buyer
              personas. Let us turn this profile into a growth plan that
              converts.
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
        toolName="Buyer Persona Quiz"
        services={[
          { title: "Digital Marketing", desc: "Full-service digital marketing strategy for measurable business growth.", href: "/services/digital-marketing" },
          { title: "SEO", desc: "Organic search strategies that deliver compounding traffic over time.", href: "/services/seo" },
          { title: "Performance Marketing", desc: "Paid campaigns optimized for maximum return on ad spend.", href: "/services/performance-marketing" },
        ]}
        relatedTools={[
          { title: "Brand Tone Generator", href: "/resources/brand-tone-generator" },
          { title: "Brand Voice Checker", href: "/resources/brand-voice-checker" },
          { title: "Brand Voice Generator", href: "/resources/brand-voice-generator" },
          { title: "Budget Allocator", href: "/resources/budget-allocator" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
