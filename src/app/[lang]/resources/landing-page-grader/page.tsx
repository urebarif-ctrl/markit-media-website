"use client";

import { useState } from "react";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface Question {
  id: string;
  text: string;
  recommendation: string;
  quickWin: boolean;
}

interface Category {
  name: string;
  questions: Question[];
}

const categories: Category[] = [
  {
    name: "Headline & Copy",
    questions: [
      {
        id: "hc1",
        text: "Does your headline clearly state the offer or benefit?",
        recommendation:
          "Rewrite your headline to lead with the primary benefit. Replace vague phrases like \"Welcome\" or \"We help businesses\" with a specific outcome statement.",
        quickWin: true,
      },
      {
        id: "hc2",
        text: "Is your headline specific (includes numbers, timeframes, or measurables)?",
        recommendation:
          "Add concrete numbers or timeframes to your headline. \"Grow Your Revenue\" becomes \"Grow Revenue by 30% in 90 Days.\"",
        quickWin: true,
      },
      {
        id: "hc3",
        text: "Is your body copy scannable (short paragraphs, bullet points)?",
        recommendation:
          "Break long paragraphs into 2-3 sentence blocks and convert feature lists into bullet points. Use bold text for key phrases.",
        quickWin: true,
      },
      {
        id: "hc4",
        text: "Does your copy focus on benefits rather than features?",
        recommendation:
          "For each feature you mention, add the outcome it delivers. \"24/7 support\" becomes \"24/7 support so you never lose a customer to downtime.\"",
        quickWin: false,
      },
      {
        id: "hc5",
        text: "Is there a clear sense of urgency or reason to act now?",
        recommendation:
          "Add a deadline, limited availability, or time-sensitive bonus to motivate immediate action. Avoid fake urgency — use real constraints.",
        quickWin: false,
      },
    ],
  },
  {
    name: "Visual Design",
    questions: [
      {
        id: "vd1",
        text: "Is your CTA button visually prominent (contrast, size, whitespace)?",
        recommendation:
          "Make your CTA the most visually dominant element. Increase button size, use high-contrast colors, and add whitespace around it.",
        quickWin: true,
      },
      {
        id: "vd2",
        text: "Are you using a single-column layout (no sidebar distractions)?",
        recommendation:
          "Remove sidebars and multi-column layouts. A single-column flow guides the eye downward toward your CTA without distraction.",
        quickWin: false,
      },
      {
        id: "vd3",
        text: "Do you have a relevant hero image or video above the fold?",
        recommendation:
          "Add a hero image showing your product in use or the end result customers get. Stock photos of handshakes do not convert — use authentic imagery.",
        quickWin: false,
      },
      {
        id: "vd4",
        text: "Is there consistent visual hierarchy (headings > body > captions)?",
        recommendation:
          "Establish a clear type scale: h1 for your main headline, h2 for section headers, body text for details. Each level should be visibly distinct.",
        quickWin: false,
      },
      {
        id: "vd5",
        text: "Is your page free of navigation links that lead away from the offer?",
        recommendation:
          "Remove or minimize the global navigation bar on your landing page. Every exit link is a leak in your conversion funnel.",
        quickWin: true,
      },
    ],
  },
  {
    name: "Trust & Social Proof",
    questions: [
      {
        id: "ts1",
        text: "Do you include client logos or recognizable brand names?",
        recommendation:
          "Add a row of client or partner logos near the top of your page. Even 3-5 recognizable names significantly boost credibility.",
        quickWin: true,
      },
      {
        id: "ts2",
        text: "Do you have testimonials or reviews visible?",
        recommendation:
          "Add 2-3 short, specific testimonials with real names and photos. \"We increased leads by 40%\" is stronger than \"Great service!\"",
        quickWin: false,
      },
      {
        id: "ts3",
        text: "Is there a money-back guarantee or risk-reversal element?",
        recommendation:
          "Add a guarantee, free trial, or no-obligation clause near your CTA. Reducing perceived risk directly increases conversions.",
        quickWin: false,
      },
      {
        id: "ts4",
        text: "Do you display relevant certifications, security badges, or awards?",
        recommendation:
          "Add trust badges, SSL indicators, industry certifications, or awards near your form or CTA to reassure visitors.",
        quickWin: true,
      },
      {
        id: "ts5",
        text: "Is your company contact information clearly visible?",
        recommendation:
          "Display a phone number, email, or physical address on the page. Visitors trust businesses they can actually contact.",
        quickWin: true,
      },
    ],
  },
  {
    name: "Conversion Optimization",
    questions: [
      {
        id: "co1",
        text: "Is there only ONE primary CTA on the page?",
        recommendation:
          "Reduce to a single primary action. Multiple competing CTAs split attention and reduce conversions. Secondary links should be visually subdued.",
        quickWin: true,
      },
      {
        id: "co2",
        text: "Is your form as short as possible (no unnecessary fields)?",
        recommendation:
          "Remove every form field that is not strictly necessary. Each additional field reduces completion rates by roughly 10%.",
        quickWin: true,
      },
      {
        id: "co3",
        text: "Does your CTA button text describe the action (\"Get My Quote\" vs \"Submit\")?",
        recommendation:
          "Replace generic button text like \"Submit\" or \"Click Here\" with action-benefit copy: \"Get My Free Quote,\" \"Start My Trial,\" or \"Download the Guide.\"",
        quickWin: true,
      },
      {
        id: "co4",
        text: "Is your page load time under 3 seconds?",
        recommendation:
          "Optimize images, enable compression, and minimize scripts. Test with Google PageSpeed Insights — every extra second costs roughly 7% in conversions.",
        quickWin: false,
      },
      {
        id: "co5",
        text: "Do you have a mobile-optimized version of the page?",
        recommendation:
          "Over 60% of traffic is mobile. Ensure tap targets are large, forms are easy to fill on a phone, and nothing requires horizontal scrolling.",
        quickWin: false,
      },
    ],
  },
];

const allQuestions = categories.flatMap((c) => c.questions);

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function getGrade(score: number): {
  grade: string;
  label: string;
  desc: string;
} {
  if (score >= 90)
    return {
      grade: "A",
      label: "Excellent",
      desc: "Your landing page follows most best practices. Fine-tune the remaining gaps to maximize conversions.",
    };
  if (score >= 75)
    return {
      grade: "B",
      label: "Good",
      desc: "Solid foundation. A few targeted improvements could meaningfully lift your conversion rate.",
    };
  if (score >= 50)
    return {
      grade: "C",
      label: "Average",
      desc: "Several areas need work. Prioritize the recommendations below for the biggest impact.",
    };
  if (score >= 25)
    return {
      grade: "D",
      label: "Below Average",
      desc: "Significant gaps are likely costing you conversions. Address the priority recommendations first.",
    };
  return {
    grade: "F",
    label: "Needs Work",
    desc: "Your landing page has fundamental issues that are driving visitors away. A focused rebuild will yield strong returns.",
  };
}

function getCategoryScore(
  cat: Category,
  answers: Record<string, boolean>
): number {
  const total = cat.questions.length;
  const yeses = cat.questions.filter((q) => answers[q.id] === true).length;
  return Math.round((yeses / total) * 100);
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function LandingPageGraderPage() {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = allQuestions.length;
  const allAnswered = answeredCount === totalQuestions;

  const yesCount = Object.values(answers).filter(Boolean).length;
  const score = Math.round((yesCount / totalQuestions) * 100);

  const failedQuestions = allQuestions.filter((q) => answers[q.id] === false);
  const topRecommendations = failedQuestions.slice(0, 5);
  const quickWins = failedQuestions.filter((q) => q.quickWin).slice(0, 3);

  function toggle(id: string, value: boolean) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }

  function reset() {
    setAnswers({});
    setSubmitted(false);
  }

  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Landing Page Grader",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Grade your landing page across 20 criteria and get instant improvement recommendations.",
    provider: {
      "@type": "Organization",
      name: "Markit Media",
      url: "https://themarkitmedia.com",
    },
  };

  return (
    <article>
      
      {/* Related Tools */}
      <section className="px-6 lg:px-12 py-12" aria-label="Related tools">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">Related Tools</h2>
          <div className="flex flex-wrap gap-3">
                <Link href="/resources/website-grader" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Website Grader</Link>
                <Link href="/resources/website-audit" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Website Audit</Link>
                <Link href="/resources/speed-test" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Speed Test</Link>
                <Link href="/resources/website-heuristic-evaluator" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Heuristic Evaluator</Link>
          </div>
        </div>
      </section>
<JsonLd data={toolSchema} />
      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Landing Page Grader" },
        ]}
      />

      {/* Hero */}
      <section aria-label="Free Tool" className="px-6 lg:px-12 pt-20 pb-12">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Landing Page Grader
            </h1>
            <SectionDesc>
              Answer 20 yes-or-no questions across four categories. Get an
              instant grade, per-category scores, and specific recommendations to
              improve your landing page conversion rate.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* Progress bar */}
      {!submitted && (
        <div className="px-6 lg:px-12 pb-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between text-base text-gray-500 mb-2">
              <span>
                {answeredCount} of {totalQuestions} answered
              </span>
              <span>{Math.round((answeredCount / totalQuestions) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 h-2 motion-reduce:transition-none">
              <div
                className="bg-black h-2 transition-all motion-reduce:transition-none"
                style={{
                  width: `${(answeredCount / totalQuestions) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Questions */}
      {!submitted ? (
        <section className="px-6 lg:px-12 py-8" aria-label="Questions">
          <div className="max-w-3xl mx-auto space-y-12">
            {categories.map((cat, ci) => (
              <div key={cat.name}>
                <Animate animation="fade-up">
                  <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.25rem,3vw,1.75rem)] font-extrabold text-black tracking-tight mb-6">
                    {cat.name}
                  </h2>
                </Animate>

                <div className="space-y-4">
                  {cat.questions.map((q, qi) => {
                    const num = ci * 5 + qi + 1;
                    return (
                      <Animate key={q.id} animation="fade-up">
                        <div className="border border-gray-200 p-6">
                          <p className="text-base font-bold text-black mb-4">
                            {num}. {q.text}
                          </p>
                          <div className="flex gap-3">
                            <button
                              type="button"
                              onClick={() => toggle(q.id, true)}
                              className={`min-w-[88px] min-h-[44px] px-6 py-3 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                                answers[q.id] === true
                                  ? "bg-black text-white"
                                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                              }`}
                            >
                              Yes
                            </button>
                            <button
                              type="button"
                              onClick={() => toggle(q.id, false)}
                              className={`min-w-[88px] min-h-[44px] px-6 py-3 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                                answers[q.id] === false
                                  ? "bg-black text-white"
                                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                              }`}
                            >
                              No
                            </button>
                          </div>
                        </div>
                      </Animate>
                    );
                  })}
                </div>
              </div>
            ))}

            <div className="text-center pt-4">
              <button
                type="button"
                onClick={() => allAnswered && setSubmitted(true)}
                disabled={!allAnswered}
                className={`inline-flex items-center gap-3 px-10 py-5 font-bold text-base transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                  allAnswered
                    ? "bg-black text-white hover:bg-gray-800"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                Get My Grade &rarr;
              </button>
              {!allAnswered && (
                <p className="text-base text-gray-400 mt-3">
                  Answer all {totalQuestions} questions to see your grade
                </p>
              )}
            </div>
          </div>
        </section>
      ) : (
        /* -------------------------------------------------------------- */
        /*  Results                                                        */
        /* -------------------------------------------------------------- */
        <section className="px-6 lg:px-12 py-8" aria-label="Results">
          <div className="max-w-3xl mx-auto">
            {/* Overall grade */}
            {(() => {
              const { grade, label, desc } = getGrade(score);
              return (
                <Animate animation="fade-up">
                  <div className="bg-black text-white p-8 text-center mb-10">
                    <div className="font-[family-name:var(--font-display)] text-7xl font-extrabold">
                      {grade}
                    </div>
                    <div className="text-lg font-bold mt-2">{label}</div>
                    <div className="text-base text-gray-400 mt-2">
                      {score} / 100
                    </div>
                    <div className="w-full bg-white/20 h-3 mt-6">
                      <div
                        className="bg-white h-3 transition-all motion-reduce:transition-none"
                        style={{ width: `${score}%` }}
                      />
                    </div>
                    <p className="text-base text-gray-300 mt-4">{desc}</p>
                  </div>
                </Animate>
              );
            })()}

            {/* Per-category scores */}
            <Animate animation="fade-up">
              <div className="mb-12">
                <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">
                  Category Breakdown
                </h2>
                <div className="space-y-5">
                  {categories.map((cat) => {
                    const catScore = getCategoryScore(cat, answers);
                    return (
                      <div key={cat.name}>
                        <div className="flex items-center justify-between text-base font-bold text-black mb-2">
                          <span>{cat.name}</span>
                          <span>{catScore}%</span>
                        </div>
                        <div className="w-full bg-gray-200 h-3">
                          <div
                            className="bg-black h-3 transition-all motion-reduce:transition-none"
                            style={{ width: `${catScore}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Animate>

            {/* Top 5 priority recommendations */}
            {topRecommendations.length > 0 && (
              <Animate animation="fade-up">
                <div className="mb-12">
                  <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">
                    Priority Recommendations
                  </h2>
                  <div className="space-y-4">
                    {topRecommendations.map((q, i) => (
                      <div
                        key={q.id}
                        className="border border-gray-200 p-6"
                      >
                        <p className="text-base font-bold text-black mb-2">
                          {i + 1}. {q.text}
                        </p>
                        <p className="text-base text-gray-500 leading-relaxed">
                          {q.recommendation}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </Animate>
            )}

            {/* Quick wins */}
            {quickWins.length > 0 && (
              <Animate animation="fade-up">
                <div className="mb-12">
                  <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-2">
                    Quick Wins
                  </h2>
                  <p className="text-base text-gray-500 mb-6">
                    These are the easiest improvements you can make today.
                  </p>
                  <Stagger stagger={100} className="space-y-4">
                    {quickWins.map((q) => (
                      <div
                        key={q.id}
                        className="border-2 border-black p-6"
                      >
                        <p className="text-base font-bold text-black mb-2">
                          {q.text}
                        </p>
                        <p className="text-base text-gray-500 leading-relaxed">
                          {q.recommendation}
                        </p>
                      </div>
                    ))}
                  </Stagger>
                </div>
              </Animate>
            )}

            {/* Retake */}
            <div className="text-center mb-16">
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-3 border-2 border-black text-black px-8 py-4 font-bold text-base hover:bg-black hover:text-white transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                Retake Quiz
              </button>
            </div>
          </div>
        </section>
      )}

      {/* -------------------------------------------------------------- */
      /*  Educational section                                             */
      /* -------------------------------------------------------------- */}
      <section aria-label="Best Practices" className="px-6 lg:px-12 py-20 border-t border-gray-200">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Best Practices</SectionLabel>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-black tracking-tight leading-tight mt-3 mb-8">
              Landing Page Fundamentals
            </h2>
          </Animate>

          <Stagger stagger={80} className="space-y-8">
            <div>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">
                One page, one goal
              </h3>
              <p className="text-base text-gray-500 leading-relaxed">
                Every element on your landing page should drive toward a single
                conversion action. Remove anything that does not support that
                goal — extra navigation links, secondary offers, and unrelated
                content all dilute focus and reduce conversions.
              </p>
            </div>
            <div>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">
                Above the fold matters
              </h3>
              <p className="text-base text-gray-500 leading-relaxed">
                Visitors form a first impression within 50 milliseconds. Your
                headline, value proposition, and primary CTA should all be
                visible without scrolling. Use the space below the fold to
                overcome objections with proof and detail.
              </p>
            </div>
            <div>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">
                Social proof builds trust fast
              </h3>
              <p className="text-base text-gray-500 leading-relaxed">
                Testimonials, case study snippets, client logos, and review
                counts let other people make your argument for you. Place social
                proof near decision points — especially right before your form or
                CTA button.
              </p>
            </div>
            <div>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">
                Speed is a conversion factor
              </h3>
              <p className="text-base text-gray-500 leading-relaxed">
                A one-second delay in page load time can drop conversions by 7%.
                Compress images, defer non-critical scripts, and test on real
                mobile connections. A fast page is not optional — it is a
                competitive advantage.
              </p>
            </div>
            <div>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">
                Test everything, assume nothing
              </h3>
              <p className="text-base text-gray-500 leading-relaxed">
                Even small changes — button color, headline wording, form length
                — can produce measurable lifts. Run A/B tests systematically, let
                them reach statistical significance, and iterate. Conversion
                optimization is a discipline, not a one-time project.
              </p>
            </div>
          </Stagger>
        </div>
      </section>

      {/* -------------------------------------------------------------- */
      /*  CTA section                                                     */
      /* -------------------------------------------------------------- */}
      <section aria-label="Call to action" className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Want a Landing Page That Converts?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Our team builds high-converting landing pages backed by data, not
              guesswork. Let us turn these recommendations into results.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              >
                Get a Free Consultation &rarr;
              </Link>
              <Link
                href="/services/website-development"
                className="inline-flex items-center gap-3 border-2 border-white text-white px-10 py-5 font-bold text-base hover:bg-white hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              >
                Website Development Services
              </Link>
            </div>
          </Animate>
        </div>
      </section>
    
      <ToolCTA
        toolName="Landing Page Grader"
        services={[
          { title: "Performance Marketing", desc: "Google Ads, Meta Ads, and PPC campaigns that maximize ROAS.", href: "/services/performance-marketing" },
          { title: "Digital Marketing", desc: "Integrated strategy across all channels for measurable growth.", href: "/services/digital-marketing" },
          { title: "SEO", desc: "Complement paid with organic — reduce dependency on ad spend over time.", href: "/services/seo" },
        ]}
        relatedTools={[
          { title: "Image Size Guide", href: "/resources/image-size-guide" },
          { title: "Influencer Roi", href: "/resources/influencer-roi" },
          { title: "Keyword Density Checker", href: "/resources/keyword-density-checker" },
          { title: "Kpi Builder", href: "/resources/kpi-builder" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
