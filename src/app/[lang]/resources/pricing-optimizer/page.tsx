"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type AnswerValue = "yes" | "no" | "partial" | null;

interface Question {
  id: string;
  text: string;
  impact: "high" | "medium" | "low";
  recommendation: string;
}

interface Section {
  key: string;
  title: string;
  description: string;
  questions: Question[];
}

/* ------------------------------------------------------------------ */
/*  Assessment data                                                    */
/* ------------------------------------------------------------------ */

const sections: Section[] = [
  {
    key: "structure",
    title: "Pricing Structure Clarity",
    description:
      "How clearly your pricing tiers, features, and comparisons are presented to visitors.",
    questions: [
      {
        id: "s1",
        text: "Are your pricing tiers clearly defined with distinct names and prices?",
        impact: "high",
        recommendation:
          "Define 2 to 4 clearly named tiers with visible pricing. Each tier should have a descriptive name that signals who it is for (e.g., Starter, Professional, Enterprise). Display prices prominently with the billing period clearly stated.",
      },
      {
        id: "s2",
        text: "Is there a feature comparison table showing what each tier includes?",
        impact: "high",
        recommendation:
          "Add a side-by-side feature comparison table. Use checkmarks and dashes to make differences scannable at a glance. Group features by category so visitors can quickly find what matters to them.",
      },
      {
        id: "s3",
        text: "Is one plan highlighted as the recommended or most popular option?",
        impact: "high",
        recommendation:
          "Visually distinguish your recommended plan with a border, background color, or badge like 'Most Popular.' This guides undecided buyers toward the option that works for most customers and reduces decision fatigue.",
      },
      {
        id: "s4",
        text: "Is it clear what happens when a user outgrows their current plan?",
        impact: "medium",
        recommendation:
          "Explain the upgrade path on your pricing page. Show how users can move between tiers, whether upgrades are prorated, and if they can downgrade later. Removing uncertainty about commitment increases sign-ups.",
      },
      {
        id: "s5",
        text: "Are prices shown in the visitor's local currency or with a currency selector?",
        impact: "medium",
        recommendation:
          "Display prices in local currency when possible or provide a currency toggle. International visitors who see unfamiliar currency symbols often leave. Even showing a conversion note can reduce friction.",
      },
    ],
  },
  {
    key: "trust",
    title: "Trust Signals",
    description:
      "Elements that reduce buyer anxiety and build confidence in making a purchase decision.",
    questions: [
      {
        id: "t1",
        text: "Are customer testimonials or case studies displayed near pricing?",
        impact: "high",
        recommendation:
          "Place relevant testimonials close to your pricing section. Use quotes that mention specific results, ROI, or value received. Include the customer's name, title, and company to add credibility.",
      },
      {
        id: "t2",
        text: "Is a money-back guarantee or satisfaction guarantee prominently shown?",
        impact: "high",
        recommendation:
          "Display a clear guarantee near the CTA button. Whether it is 30-day money-back, satisfaction guarantee, or cancel-anytime, reducing risk perception is one of the most effective ways to increase conversions.",
      },
      {
        id: "t3",
        text: "Are security badges or payment trust indicators visible?",
        impact: "medium",
        recommendation:
          "Show recognized payment security badges near any payment form or CTA. Logos of accepted payment methods, SSL indicators, and compliance badges reduce checkout anxiety.",
      },
      {
        id: "t4",
        text: "Do you display the number of customers, users, or companies served?",
        impact: "medium",
        recommendation:
          "Show social proof with real numbers such as total customers, companies using your product, or transactions processed. Quantified social proof signals reliability and reduces the perceived risk of trying something new.",
      },
      {
        id: "t5",
        text: "Are recognizable client logos or partner logos displayed?",
        impact: "medium",
        recommendation:
          "Feature logos of well-known clients or partners on or near your pricing page. Visitors associate your brand with the trust they already have in those companies. Use 4 to 8 logos for maximum effect without clutter.",
      },
      {
        id: "t6",
        text: "Is there a way to contact sales or support directly from the pricing page?",
        impact: "high",
        recommendation:
          "Add a clear path to speak with a real person, whether via live chat, phone number, or a 'Talk to Sales' button. Visitors with questions who cannot find answers quickly will leave rather than guess.",
      },
    ],
  },
  {
    key: "cta",
    title: "CTA Effectiveness",
    description:
      "How well your call-to-action buttons drive visitors to take the next step.",
    questions: [
      {
        id: "c1",
        text: "Do your CTA buttons use specific, action-oriented text instead of generic labels?",
        impact: "high",
        recommendation:
          "Replace generic labels like 'Buy Now' or 'Submit' with specific action text that states the benefit: 'Start My Free Trial', 'Get Started Free', or 'Upgrade My Plan'. Specific CTAs consistently outperform generic ones.",
      },
      {
        id: "c2",
        text: "Is the primary CTA visually distinct from the rest of the page?",
        impact: "high",
        recommendation:
          "Make your primary CTA the most visually prominent element near pricing. Use high contrast, larger size, and whitespace around it. The CTA should be the obvious next step a visitor's eye is drawn to.",
      },
      {
        id: "c3",
        text: "Are CTA buttons placed next to each pricing tier, not just at the top or bottom?",
        impact: "high",
        recommendation:
          "Place a CTA button directly within or beneath each pricing tier card. Visitors who finish reading a tier's features should be able to act immediately without scrolling to find the button.",
      },
      {
        id: "c4",
        text: "Is there a secondary CTA for visitors who are not ready to buy?",
        impact: "medium",
        recommendation:
          "Offer a lower-commitment alternative such as 'Schedule a Demo', 'Compare Plans in Detail', or 'Download Pricing PDF'. Not all visitors are ready to purchase on their first visit.",
      },
      {
        id: "c5",
        text: "Does the CTA text clarify what happens after clicking (e.g., no credit card required)?",
        impact: "medium",
        recommendation:
          "Add a brief line beneath your CTA that sets expectations: 'No credit card required', '14-day free trial', or 'Set up in 2 minutes'. Reducing uncertainty about the next step increases click-through rates.",
      },
    ],
  },
  {
    key: "objections",
    title: "Objection Handling",
    description:
      "How effectively your pricing page addresses concerns that prevent visitors from buying.",
    questions: [
      {
        id: "o1",
        text: "Is there an FAQ section that addresses common pricing questions?",
        impact: "high",
        recommendation:
          "Add a pricing FAQ that answers the questions your sales team hears most: billing cycles, what is included, cancellation policy, discounts, and enterprise options. Place it below your pricing tiers.",
      },
      {
        id: "o2",
        text: "Is your refund or cancellation policy clearly stated?",
        impact: "high",
        recommendation:
          "State your refund and cancellation terms in plain language directly on the pricing page. Visitors who cannot find this information assume the worst. A clear, fair policy removes a major barrier to purchase.",
      },
      {
        id: "o3",
        text: "Is a free trial or freemium option available to reduce commitment risk?",
        impact: "high",
        recommendation:
          "Offer a free trial, freemium tier, or demo to let visitors experience value before paying. Lowering the initial commitment barrier is one of the most effective ways to increase conversion rates on pricing pages.",
      },
      {
        id: "o4",
        text: "Are enterprise or custom pricing options mentioned for larger buyers?",
        impact: "medium",
        recommendation:
          "Include a 'Contact Us' or 'Custom Plan' option for enterprise buyers. Larger organizations expect tailored pricing and dedicated support. Without this, they may assume your product is not built for their scale.",
      },
      {
        id: "o5",
        text: "Do you address the 'why is this priced this way' question through value framing?",
        impact: "medium",
        recommendation:
          "Frame pricing in terms of value delivered, not just features. Show cost comparisons (vs. hiring, vs. competitors, vs. doing nothing), ROI calculations, or per-unit economics that make the price feel justified.",
      },
    ],
  },
  {
    key: "design",
    title: "Design & User Experience",
    description:
      "How the visual design and page layout support the buying decision.",
    questions: [
      {
        id: "d1",
        text: "Are pricing tiers visible above the fold without scrolling?",
        impact: "high",
        recommendation:
          "Position your pricing tiers so at least the tier names, prices, and CTA buttons are visible without scrolling on desktop. Visitors who land on a pricing page expect to see prices immediately.",
      },
      {
        id: "d2",
        text: "Does the pricing page work well on mobile devices?",
        impact: "high",
        recommendation:
          "Test your pricing page on multiple mobile devices. Tier cards should stack vertically, comparison tables should be scrollable or collapsible, and all buttons should be easy to tap. Mobile accounts for a significant share of traffic.",
      },
      {
        id: "d3",
        text: "Does the page load quickly without layout shifts?",
        impact: "high",
        recommendation:
          "Optimize your pricing page for speed. Avoid heavy images, minimize JavaScript, and set explicit dimensions on elements to prevent layout shifts. Slow pages and jumpy layouts erode trust at the moment of decision.",
      },
      {
        id: "d4",
        text: "Is there enough whitespace to keep the page from feeling cluttered?",
        impact: "medium",
        recommendation:
          "Add generous spacing between pricing tiers, feature lists, and sections. A cluttered pricing page overwhelms visitors. Whitespace helps the eye focus on what matters: prices, features, and CTAs.",
      },
      {
        id: "d5",
        text: "Is the page free of distracting elements that pull focus from pricing?",
        impact: "medium",
        recommendation:
          "Remove or minimize navigation links, banners, pop-ups, and unrelated content on your pricing page. Every distraction is an exit opportunity. The pricing page should funnel attention toward choosing a plan.",
      },
      {
        id: "d6",
        text: "Is a toggle or switch provided for monthly vs. annual billing?",
        impact: "medium",
        recommendation:
          "Add a clear toggle between monthly and annual pricing. Show the savings for annual plans as a percentage or dollar amount. Default to annual if the discount is significant, but let visitors switch easily.",
      },
    ],
  },
  {
    key: "psychology",
    title: "Psychology & Persuasion",
    description:
      "Behavioral techniques that influence how visitors perceive and evaluate your pricing.",
    questions: [
      {
        id: "p1",
        text: "Is price anchoring used (showing a higher-priced option first or a crossed-out original price)?",
        impact: "high",
        recommendation:
          "Use anchoring by displaying your highest-priced tier first or showing the original price crossed out next to a discounted price. Anchoring sets a reference point that makes other options feel like better deals.",
      },
      {
        id: "p2",
        text: "Is a decoy tier included that makes the target tier look like better value?",
        impact: "medium",
        recommendation:
          "Consider adding a tier that is intentionally less attractive compared to your target tier. A decoy that is priced close to the target but offers significantly less value steers buyers toward the plan you want them to choose.",
      },
      {
        id: "p3",
        text: "Are any limited-time offers or urgency elements present?",
        impact: "medium",
        recommendation:
          "If you run promotions, show them clearly with end dates. Honest urgency (limited-time discounts, enrollment deadlines, capacity limits) motivates action. Avoid fake urgency, which damages trust when discovered.",
      },
      {
        id: "p4",
        text: "Is pricing displayed per month even for annual plans to make costs feel smaller?",
        impact: "medium",
        recommendation:
          "Show annual pricing as a monthly equivalent (e.g., '$29/mo billed annually') alongside the total. Smaller per-period numbers feel more manageable and reduce sticker shock, especially for higher-priced plans.",
      },
      {
        id: "p5",
        text: "Are you using charm pricing or round numbers strategically?",
        impact: "low",
        recommendation:
          "Consider your pricing endings: prices ending in 9 (e.g., $49) signal value, while round numbers (e.g., $50) signal quality. Choose based on your positioning. Premium brands often perform better with round numbers.",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Scoring helpers                                                    */
/* ------------------------------------------------------------------ */

function answerScore(val: AnswerValue): number {
  if (val === "yes") return 1;
  if (val === "partial") return 0.5;
  return 0;
}

function getLetterGrade(score: number, total: number): { letter: string; label: string } {
  const pct = total > 0 ? (score / total) * 100 : 0;
  if (pct >= 90) return { letter: "A", label: "Excellent" };
  if (pct >= 80) return { letter: "B", label: "Good" };
  if (pct >= 60) return { letter: "C", label: "Average" };
  if (pct >= 40) return { letter: "D", label: "Below Average" };
  return { letter: "F", label: "Needs Significant Work" };
}

function getImpactOrder(impact: "high" | "medium" | "low"): number {
  if (impact === "high") return 0;
  if (impact === "medium") return 1;
  return 2;
}

const TOTAL_QUESTIONS = sections.reduce((sum, s) => sum + s.questions.length, 0);

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function PricingOptimizerPage() {
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
  const [copied, setCopied] = useState(false);

  const setAnswer = useCallback((id: string, val: AnswerValue) => {
    setAnswers((prev) => ({ ...prev, [id]: val }));
  }, []);

  /* ---------- derived scores ---------- */

  const answeredCount = useMemo(
    () => Object.values(answers).filter((v) => v !== null).length,
    [answers],
  );

  const totalScore = useMemo(
    () => Object.values(answers).reduce((sum, v) => sum + answerScore(v), 0),
    [answers],
  );

  const overallPct = useMemo(
    () => (TOTAL_QUESTIONS > 0 ? Math.round((totalScore / TOTAL_QUESTIONS) * 100) : 0),
    [totalScore],
  );

  const grade = useMemo(
    () => getLetterGrade(totalScore, TOTAL_QUESTIONS),
    [totalScore],
  );

  const sectionScores = useMemo(() => {
    return sections.map((sec) => {
      const secScore = sec.questions.reduce(
        (sum, q) => sum + answerScore(answers[q.id] ?? null),
        0,
      );
      const secTotal = sec.questions.length;
      const secPct = Math.round((secScore / secTotal) * 100);
      const secAnswered = sec.questions.filter((q) => answers[q.id] != null).length;
      return {
        key: sec.key,
        title: sec.title,
        score: secScore,
        total: secTotal,
        pct: secPct,
        answered: secAnswered,
        grade: getLetterGrade(secScore, secTotal),
      };
    });
  }, [answers]);

  const priorityImprovements = useMemo(() => {
    const items: Array<{
      text: string;
      recommendation: string;
      impact: "high" | "medium" | "low";
      section: string;
      answer: AnswerValue;
    }> = [];
    for (const sec of sections) {
      for (const q of sec.questions) {
        const a = answers[q.id] ?? null;
        if (a === "no" || a === "partial") {
          items.push({
            text: q.text,
            recommendation: q.recommendation,
            impact: q.impact,
            section: sec.title,
            answer: a,
          });
        }
      }
    }
    items.sort((a, b) => getImpactOrder(a.impact) - getImpactOrder(b.impact));
    return items;
  }, [answers]);

  /* ---------- export ---------- */

  const buildExportText = useCallback(() => {
    const lines: string[] = [];
    lines.push("PRICING PAGE OPTIMIZER - ASSESSMENT RESULTS");
    lines.push("============================================");
    lines.push("");
    lines.push(`Overall Score: ${overallPct}% (${grade.letter} - ${grade.label})`);
    lines.push(`Questions Answered: ${answeredCount} of ${TOTAL_QUESTIONS}`);
    lines.push("");

    for (const sec of sections) {
      const ss = sectionScores.find((s) => s.key === sec.key);
      if (!ss) continue;
      lines.push(`--- ${sec.title} ---`);
      lines.push(`Score: ${ss.pct}% (${ss.grade.letter})`);
      for (const q of sec.questions) {
        const a = answers[q.id] ?? "unanswered";
        const marker = a === "yes" ? "[YES]" : a === "partial" ? "[PARTIAL]" : a === "no" ? "[NO]" : "[--]";
        lines.push(`  ${marker} ${q.text}`);
      }
      lines.push("");
    }

    if (priorityImprovements.length > 0) {
      lines.push("PRIORITY IMPROVEMENTS");
      lines.push("---------------------");
      for (let i = 0; i < priorityImprovements.length; i++) {
        const item = priorityImprovements[i];
        lines.push(
          `${i + 1}. [${item.impact.toUpperCase()}] ${item.text}`,
        );
        lines.push(`   ${item.recommendation}`);
        lines.push("");
      }
    }

    lines.push("Generated by Markit Media Pricing Page Optimizer");
    lines.push("https://markitmedia.co/resources/pricing-optimizer");
    return lines.join("\n");
  }, [answers, answeredCount, overallPct, grade, sectionScores, priorityImprovements]);

  const handleCopy = useCallback(() => {
    const text = buildExportText();
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [buildExportText]);

  const handleDownload = useCallback(() => {
    const text = buildExportText();
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pricing-page-assessment.txt";
    a.click();
    URL.revokeObjectURL(url);
  }, [buildExportText]);

  const handleReset = useCallback(() => {
    setAnswers({});
  }, []);

  /* ---------- render ---------- */

  return (
    <article className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Pricing Page Optimizer",
          description: "How clearly your pricing tiers, features, and comparisons are presented to visitors.",
          url: "https://themarkitmedia.com/en/resources/pricing-optimizer",
          applicationCategory: "Marketing Tool",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          provider: { "@type": "Organization", name: "Markit Media", url: "https://themarkitmedia.com" },
        }) }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Pricing Page Optimizer",
          description:
            "An interactive assessment tool that scores your pricing page across structure, trust, CTAs, objection handling, design, and psychology, then delivers a prioritized improvement plan.",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />

      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Pricing Page Optimizer" },
        ]}
      />

      {/* Hero */}
      <section aria-label="Free Tool" className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Pricing Page Optimizer
            </h1>
            <SectionDesc>
              Evaluate your pricing page across 32 criteria covering structure,
              trust signals, CTAs, objection handling, design, and buyer
              psychology. Answer each question to receive section grades, an
              overall score, and a prioritized list of improvements.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* Sticky progress bar */}
      <section aria-label="Content section" className="px-6 lg:px-12 pb-6">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <div className="sticky top-20 z-10 bg-white py-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-base font-bold text-black">
                  {answeredCount}/{TOTAL_QUESTIONS} questions answered
                </span>
                <span className="text-base font-bold text-black">
                  {overallPct}%
                  {answeredCount > 0 && (
                    <span className="ml-2">Grade: {grade.letter}</span>
                  )}
                </span>
              </div>
              <div className="w-full h-3 bg-gray-100 overflow-hidden">
                <div
                  className="h-full bg-black transition-all duration-300 motion-reduce:transition-none"
                  style={{ width: `${overallPct}%` }}
                />
              </div>
              {answeredCount > 0 && (
                <p className="text-base text-gray-500 mt-2">{grade.label}</p>
              )}
            </div>
          </Animate>
        </div>
      </section>

      {/* Assessment sections */}
      <section aria-label="Content section" className="px-6 lg:px-12 pb-12">
        <div className="max-w-3xl mx-auto space-y-12">
          {sections.map((sec, secIndex) => {
            const ss = sectionScores[secIndex];
            return (
              <Animate key={sec.key} animation="fade-up">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black">
                      {sec.title}
                    </h2>
                    <span className="text-base text-gray-400">
                      {ss.answered}/{ss.total}
                      {ss.answered > 0 && (
                        <span className="ml-2 font-bold text-black">
                          {ss.grade.letter}
                        </span>
                      )}
                    </span>
                  </div>
                  <p className="text-base text-gray-500 mb-4">{sec.description}</p>
                  <div className="w-full h-2 bg-gray-100 overflow-hidden mb-4">
                    <div
                      className="h-full bg-black transition-all duration-300 motion-reduce:transition-none"
                      style={{ width: `${ss.pct}%` }}
                    />
                  </div>
                  <div className="space-y-0">
                    {sec.questions.map((q) => {
                      const current = answers[q.id] ?? null;
                      return (
                        <div
                          key={q.id}
                          className="p-4 border-b border-gray-100"
                        >
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                            <p
                              className={`text-base leading-relaxed flex-1 ${
                                current === "yes"
                                  ? "text-gray-400 line-through"
                                  : "text-gray-700"
                              }`}
                            >
                              {q.text}
                            </p>
                            <div className="flex gap-2 flex-shrink-0">
                              <button
                                type="button"
                                onClick={() =>
                                  setAnswer(q.id, current === "yes" ? null : "yes")
                                }
                                aria-pressed={current === "yes"}
                                className={`min-h-[44px] min-w-[44px] px-3 py-2 text-base font-bold border transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                                  current === "yes"
                                    ? "bg-black text-white border-black"
                                    : "bg-white text-black border-gray-300 hover:border-black"
                                }`}
                              >
                                Yes
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  setAnswer(
                                    q.id,
                                    current === "partial" ? null : "partial",
                                  )
                                }
                                aria-pressed={current === "partial"}
                                className={`min-h-[44px] min-w-[44px] px-3 py-2 text-base font-bold border transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                                  current === "partial"
                                    ? "bg-black text-white border-black"
                                    : "bg-white text-black border-gray-300 hover:border-black"
                                }`}
                              >
                                Partial
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  setAnswer(q.id, current === "no" ? null : "no")
                                }
                                aria-pressed={current === "no"}
                                className={`min-h-[44px] min-w-[44px] px-3 py-2 text-base font-bold border transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                                  current === "no"
                                    ? "bg-black text-white border-black"
                                    : "bg-white text-black border-gray-300 hover:border-black"
                                }`}
                              >
                                No
                              </button>
                            </div>
                          </div>
                          {/* Show recommendation for no/partial answers */}
                          {(current === "no" || current === "partial") && (
                            <div className="mt-3 border-l-4 border-black pl-4">
                              <p className="text-base text-gray-500 leading-relaxed">
                                {q.recommendation}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Animate>
            );
          })}
        </div>
      </section>

      {/* Score summary cards */}
      {answeredCount > 0 && (
        <section aria-label="Score Breakdown" className="px-6 lg:px-12 pb-12">
          <div className="max-w-3xl mx-auto">
            <Animate animation="fade-up">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">
                Score Breakdown
              </h2>
            </Animate>
            <Stagger
              stagger={80}
              animation="fade-up"
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {sectionScores.map((ss) => (
                <div
                  key={ss.key}
                  className="border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black">
                      {ss.title}
                    </h3>
                    <span className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black font-[family-name:var(--font-display)]">
                      {ss.grade.letter}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 overflow-hidden mb-2">
                    <div
                      className="h-full bg-black transition-all duration-300 motion-reduce:transition-none"
                      style={{ width: `${ss.pct}%` }}
                    />
                  </div>
                  <p className="text-base text-gray-500">
                    {ss.score} of {ss.total} points ({ss.pct}%)
                  </p>
                </div>
              ))}

              {/* Overall grade card */}
              <div className="md:col-span-2 border-2 border-black p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-base font-bold text-gray-500 uppercase tracking-wide mb-1">
                      Overall Grade
                    </p>
                    <p className="text-base text-gray-500">
                      {totalScore} of {TOTAL_QUESTIONS} points ({overallPct}%)
                    </p>
                  </div>
                  <div className="text-center">
                    <span className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black font-[family-name:var(--font-display)]">
                      {grade.letter}
                    </span>
                    <p className="text-base text-gray-500">{grade.label}</p>
                  </div>
                </div>
              </div>
            </Stagger>
          </div>
        </section>
      )}

      {/* Priority improvements */}
      {answeredCount > 0 && priorityImprovements.length > 0 && (
        <section aria-label="Priority Improvements" className="px-6 lg:px-12 pb-12">
          <div className="max-w-3xl mx-auto">
            <Animate animation="fade-up">
              <div className="border-l-4 border-black pl-6">
                <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-2">
                  Priority Improvements
                </h2>
                <p className="text-base text-gray-500 mb-6">
                  Items answered &quot;No&quot; or &quot;Partial,&quot; sorted by
                  impact. Focus on high-impact items first for the greatest gains.
                </p>
                <div className="space-y-6">
                  {priorityImprovements.map((item, i) => (
                    <div key={i}>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <p className="text-base font-bold text-black">
                          {i + 1}. {item.text}
                        </p>
                        <span
                          className={`text-base font-bold ${
                            item.impact === "high"
                              ? "text-black"
                              : item.impact === "medium"
                                ? "text-gray-500"
                                : "text-gray-400"
                          }`}
                        >
                          ({item.impact})
                        </span>
                      </div>
                      <p className="text-base text-gray-500 leading-relaxed">
                        {item.recommendation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Animate>
          </div>
        </section>
      )}

      {/* Section-by-section recommendations */}
      {answeredCount > 0 && (
        <section aria-label="Section Recommendations" className="px-6 lg:px-12 pb-12">
          <div className="max-w-3xl mx-auto">
            <Animate animation="fade-up">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">
                Section Recommendations
              </h2>
            </Animate>
            <div className="space-y-8">
              {sections.map((sec) => {
                const ss = sectionScores.find((s) => s.key === sec.key);
                const missing = sec.questions.filter((q) => {
                  const a = answers[q.id] ?? null;
                  return a === "no" || a === "partial";
                });
                missing.sort(
                  (a, b) => getImpactOrder(a.impact) - getImpactOrder(b.impact),
                );
                return (
                  <Animate key={sec.key} animation="fade-up">
                    <div className="border border-gray-200 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black">
                          {sec.title}
                        </h3>
                        <span className="text-base text-gray-500">
                          {ss?.score}/{ss?.total} points
                        </span>
                      </div>
                      {missing.length === 0 ? (
                        <p className="text-base text-gray-500">
                          All items passed. This section is fully optimized.
                        </p>
                      ) : (
                        <div className="space-y-4">
                          {missing.map((q) => (
                            <div key={q.id}>
                              <p className="text-base font-bold text-black mb-1">
                                {q.text}
                              </p>
                              <p className="text-base text-gray-500 leading-relaxed">
                                {q.recommendation}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </Animate>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Export / Reset actions */}
      {answeredCount > 0 && (
        <section aria-label="Content section" className="px-6 lg:px-12 pb-12">
          <div className="max-w-3xl mx-auto">
            <Animate animation="fade-up">
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleCopy}
                  className="min-h-[44px] px-6 py-3 text-base font-bold bg-black text-white border border-black hover:bg-gray-800 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  {copied ? "Copied to Clipboard" : "Copy Results"}
                </button>
                <button
                  onClick={handleDownload}
                  className="min-h-[44px] px-6 py-3 text-base font-bold bg-white text-black border border-black hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  Download as Text
                </button>
                <button
                  onClick={handleReset}
                  className="min-h-[44px] px-4 py-2 text-base font-bold text-gray-500 hover:text-black border border-gray-200 hover:border-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  Start Over
                </button>
              </div>
            </Animate>
          </div>
        </section>
      )}

      {/* CTA */}
      <section aria-label="Call to action" className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Need Help Optimizing Your Pricing Page?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Our team will analyze your pricing page, identify conversion
              blockers, and implement changes that turn more visitors into paying
              customers.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 min-h-[44px]"
            >
              Get a Free Consultation &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    
      <ToolCTA
        toolName="Pricing Optimizer"
        services={[
          { title: "Digital Marketing", desc: "Full-service digital marketing strategy for measurable business growth.", href: "/services/digital-marketing" },
          { title: "SEO", desc: "Organic search strategies that deliver compounding traffic over time.", href: "/services/seo" },
          { title: "Performance Marketing", desc: "Paid campaigns optimized for maximum return on ad spend.", href: "/services/performance-marketing" },
        ]}
        relatedTools={[
          { title: "Persona Workshop", href: "/resources/persona-workshop" },
          { title: "Pricing Calculator", href: "/resources/pricing-calculator" },
          { title: "Pricing Page Analyzer", href: "/resources/pricing-page-analyzer" },
          { title: "Quarterly Review", href: "/resources/quarterly-review" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
