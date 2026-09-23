"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface AuditQuestion {
  id: string;
  text: string;
  context: string;
}

interface AuditCategory {
  name: string;
  slug: string;
  questions: AuditQuestion[];
}

const categories: AuditCategory[] = [
  {
    name: "Technical SEO",
    slug: "technical-seo",
    questions: [
      {
        id: "t1",
        text: "Does your site use HTTPS?",
        context:
          "HTTPS encrypts data between your server and visitors. Google uses it as a ranking signal, and browsers flag non-HTTPS sites as insecure.",
      },
      {
        id: "t2",
        text: "Is your site indexed in Google Search Console?",
        context:
          "Without Search Console verification, you have no visibility into how Google crawls your site or whether indexing issues exist.",
      },
      {
        id: "t3",
        text: "Does your site have an XML sitemap?",
        context:
          "An XML sitemap helps search engines discover and prioritize your pages, especially on larger sites or sites with limited internal linking.",
      },
      {
        id: "t4",
        text: "Does your site return proper 404 pages for missing URLs?",
        context:
          "Custom 404 pages prevent users from hitting dead ends and help search engines understand which URLs are invalid.",
      },
      {
        id: "t5",
        text: "Are your canonical tags properly configured?",
        context:
          "Canonical tags prevent duplicate content issues by telling search engines which version of a page is the primary one.",
      },
    ],
  },
  {
    name: "On-Page SEO",
    slug: "on-page-seo",
    questions: [
      {
        id: "o1",
        text: "Does every page have a unique title tag under 60 characters?",
        context:
          "Title tags are the single most important on-page ranking factor. Unique, concise titles help search engines and users understand each page.",
      },
      {
        id: "o2",
        text: "Does every page have a unique meta description under 160 characters?",
        context:
          "Meta descriptions appear in search results and directly affect click-through rates. Duplicate or missing descriptions waste opportunities.",
      },
      {
        id: "o3",
        text: "Does every page have exactly one H1 tag?",
        context:
          "A single H1 per page establishes a clear content hierarchy for search engines and assistive technologies.",
      },
      {
        id: "o4",
        text: "Are your images using descriptive alt text?",
        context:
          "Alt text makes images accessible to screen readers and helps search engines understand visual content for image search rankings.",
      },
      {
        id: "o5",
        text: "Are your URLs clean and descriptive (no query strings)?",
        context:
          "Clean URLs are easier to share, remember, and parse by search engines. They also communicate page content at a glance.",
      },
    ],
  },
  {
    name: "Content Quality",
    slug: "content-quality",
    questions: [
      {
        id: "c1",
        text: "Is your content original (not copied from other sites)?",
        context:
          "Duplicate content triggers ranking penalties. Original content signals authority and earns organic backlinks.",
      },
      {
        id: "c2",
        text: "Do you publish new content at least monthly?",
        context:
          "Regular publishing signals to search engines that your site is active, and gives you more keyword-targeting opportunities.",
      },
      {
        id: "c3",
        text: "Does your content target specific keywords?",
        context:
          "Without keyword targeting, your content relies on luck to match search queries. Strategic targeting drives qualified traffic.",
      },
      {
        id: "c4",
        text: "Do you have content for each stage of the buyer journey?",
        context:
          "Awareness, consideration, and decision-stage content captures visitors at every point in their path to purchase.",
      },
      {
        id: "c5",
        text: "Are your pages at least 300 words?",
        context:
          "Thin content struggles to rank. Pages under 300 words rarely provide enough depth to satisfy search intent.",
      },
    ],
  },
  {
    name: "User Experience",
    slug: "user-experience",
    questions: [
      {
        id: "u1",
        text: "Can users reach any page in 3 clicks or fewer?",
        context:
          "Deep navigation structures frustrate users and make it harder for search engines to crawl your full site.",
      },
      {
        id: "u2",
        text: "Does your site have a clear call-to-action on every page?",
        context:
          "Every page should guide users toward a next step. Missing CTAs leave visitors without direction.",
      },
      {
        id: "u3",
        text: "Is your navigation consistent across all pages?",
        context:
          "Inconsistent navigation confuses users and increases bounce rates. Predictable menus build trust.",
      },
      {
        id: "u4",
        text: "Do your forms have clear labels and error messages?",
        context:
          "Poorly labeled forms cause abandonment. Clear labels and inline validation improve completion rates significantly.",
      },
      {
        id: "u5",
        text: "Does your site use readable fonts at 16px or larger?",
        context:
          "Text below 16px strains readability on mobile devices. Larger text reduces bounce rates and improves accessibility.",
      },
    ],
  },
  {
    name: "Mobile & Speed",
    slug: "mobile-speed",
    questions: [
      {
        id: "m1",
        text: "Is your site mobile-responsive?",
        context:
          "Google uses mobile-first indexing. If your site does not work on mobile, it will struggle to rank on any device.",
      },
      {
        id: "m2",
        text: "Does your site load in under 3 seconds?",
        context:
          "53% of mobile users abandon sites that take longer than 3 seconds to load. Speed is a direct ranking factor.",
      },
      {
        id: "m3",
        text: "Are images optimized and properly sized?",
        context:
          "Unoptimized images are the most common cause of slow load times. Proper formats and sizes can cut page weight by 50% or more.",
      },
      {
        id: "m4",
        text: "Do you avoid intrusive popups on mobile?",
        context:
          "Google penalizes sites with intrusive interstitials on mobile. Popups that cover content hurt both rankings and user trust.",
      },
      {
        id: "m5",
        text: "Are touch targets at least 44x44 pixels?",
        context:
          "Small tap targets cause mis-taps and frustration on touch devices. Apple and Google both recommend a minimum of 44x44px.",
      },
    ],
  },
];

const totalQuestions = categories.reduce((sum, cat) => sum + cat.questions.length, 0);

function getLetterGrade(score: number): { letter: string; label: string; description: string } {
  if (score >= 90) return { letter: "A", label: "Excellent", description: "Your website has a strong foundation across all key areas. Focus on maintaining these standards and pursuing advanced optimizations." };
  if (score >= 80) return { letter: "B", label: "Good", description: "Your website is in solid shape with a few areas that could use attention. Addressing the gaps below will move you toward best-in-class." };
  if (score >= 60) return { letter: "C", label: "Fair", description: "Your website has a reasonable foundation but several important areas need work. Prioritize the categories with the lowest scores." };
  if (score >= 40) return { letter: "D", label: "Poor", description: "Your website has significant gaps that are likely costing you traffic, leads, and revenue. Start with the highest-priority recommendations below." };
  return { letter: "F", label: "Critical", description: "Your website needs immediate attention across most areas. Without these fundamentals in place, other marketing efforts will underperform." };
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */



export default function WebsiteAuditPage() {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [showResults, setShowResults] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const yesCount = Object.values(answers).filter(Boolean).length;
  const score = Math.round((yesCount / totalQuestions) * 100);
  const gradeInfo = getLetterGrade(score);

  const categoryScores = useMemo(() => {
    return categories.map((cat) => {
      const yesInCat = cat.questions.filter((q) => answers[q.id] === true).length;
      const catScore = Math.round((yesInCat / cat.questions.length) * 100);
      return { name: cat.name, score: catScore, total: cat.questions.length, yes: yesInCat };
    });
  }, [answers]);

  const failedItems = useMemo(() => {
    return categories.flatMap((cat) =>
      cat.questions
        .filter((q) => answers[q.id] === false)
        .map((q) => ({ category: cat.name, ...q }))
    );
  }, [answers]);

  const handleAnswer = (questionId: string, value: boolean) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
  };

  const progressPct = Math.round((answeredCount / totalQuestions) * 100);

  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Website Audit Checklist",
    description: "Answer 25 questions across 5 categories and get an instant website audit score with detailed recommendations.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Website Development",
          description: "Your website has a strong foundation across all key areas. Focus on maintaining these standards and pursuing advanced optimizations.",
          url: "https://themarkitmedia.com/en/resources/website-audit",
          applicationCategory: "Web Development Tool",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          provider: { "@type": "Organization", name: "Markit Media", url: "https://themarkitmedia.com" },
        }) }}
      />
      <title>Website Audit Checklist | Free Marketing Tool — Markit Media</title>
      <meta name="description" content="Your website has a strong foundation across all key areas. Focus on maintaining these standards and pursuing advanced optimizations." />
      
      {/* Related Tools */}
      <section className="px-6 lg:px-12 py-12" aria-label="Related tools">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">Related Tools</h2>
          <div className="flex flex-wrap gap-3">
                <Link href="/resources/website-grader" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Website Grader</Link>
                <Link href="/resources/speed-test" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Speed Test</Link>
                <Link href="/resources/landing-page-grader" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Landing Page Grader</Link>
                <Link href="/resources/website-heuristic-evaluator" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Heuristic Evaluator</Link>
          </div>
        </div>
      </section>
<JsonLd data={toolSchema} />

      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Website Audit Checklist" },
        ]}
      />

      {/* ---- Hero ---- */}
      <section aria-label="Free Audit Tool" className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Audit Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Website Audit Checklist
            </h1>
            <SectionDesc>
              Answer 25 yes-or-no questions across 5 key categories. Get an instant score, letter grade, and prioritized recommendations to improve your website.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* ---- Progress Bar ---- */}
      <section aria-label="Content section" className="px-6 lg:px-12 pb-6">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <div className="sticky top-20 z-10 bg-white py-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-base font-bold text-black">
                  {answeredCount}/{totalQuestions} questions answered
                </span>
                <span className="text-base font-bold text-black">{progressPct}%</span>
              </div>
              <div className="w-full h-3 bg-gray-100 overflow-hidden">
                <div
                  className="h-full bg-black transition-all duration-300 motion-reduce:transition-none"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              {answeredCount > 0 && answeredCount < totalQuestions && (
                <p className="text-base text-gray-500 mt-2">
                  {totalQuestions - answeredCount} question{totalQuestions - answeredCount !== 1 ? "s" : ""} remaining
                </p>
              )}
              {answeredCount === totalQuestions && !showResults && (
                <div className="mt-3">
                  <button
                    onClick={() => setShowResults(true)}
                    className="bg-black text-white px-8 py-3 font-bold text-base hover:bg-gray-800 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 min-h-[44px] min-w-[44px]"
                  >
                    View My Results
                  </button>
                </div>
              )}
            </div>
          </Animate>
        </div>
      </section>

      {/* ---- Questions by Category ---- */}
      {!showResults && (
        <section aria-label="Content section" className="px-6 lg:px-12 pb-20">
          <div className="max-w-4xl mx-auto space-y-16">
            {categories.map((cat, catIdx) => {
              const catAnswered = cat.questions.filter((q) => q.id in answers).length;
              return (
                <Animate key={cat.slug} animation="fade-up" delay={catIdx * 80}>
                  <div>
                    <div className="flex items-center justify-between mb-6 border-b border-black pb-3">
                      <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black">
                        {cat.name}
                      </h2>
                      <span className="text-base text-gray-500">
                        {catAnswered}/{cat.questions.length}
                      </span>
                    </div>
                    <div className="space-y-6">
                      {cat.questions.map((q, qIdx) => {
                        const answered = q.id in answers;
                        const value = answers[q.id];
                        return (
                          <div key={q.id} className="border-b border-gray-100 pb-6">
                            <p className="text-base font-bold text-black mb-1">
                              {catIdx * 5 + qIdx + 1}. {q.text}
                            </p>
                            <p className="text-base text-gray-500 mb-4 leading-relaxed">
                              {q.context}
                            </p>
                            <div className="flex gap-3">
                              <button
                                onClick={() => handleAnswer(q.id, true)}
                                className={`px-6 py-3 text-base font-bold border-2 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 min-h-[44px] min-w-[44px] ${
                                  answered && value === true
                                    ? "bg-black text-white border-black"
                                    : "bg-white text-black border-gray-300 hover:border-black"
                                }`}
                                aria-pressed={answered && value === true}
                              >
                                Yes
                              </button>
                              <button
                                onClick={() => handleAnswer(q.id, false)}
                                className={`px-6 py-3 text-base font-bold border-2 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 min-h-[44px] min-w-[44px] ${
                                  answered && value === false
                                    ? "bg-black text-white border-black"
                                    : "bg-white text-black border-gray-300 hover:border-black"
                                }`}
                                aria-pressed={answered && value === false}
                              >
                                No
                              </button>
                            </div>
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
      )}

      {/* ---- Results Panel ---- */}
      {showResults && (
        <section aria-label="Content section" className="px-6 lg:px-12 pb-20">
          <div className="max-w-4xl mx-auto">
            <Animate animation="fade-up">
              {/* Overall Score */}
              <div className="bg-black text-white p-8 lg:p-12 mb-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="text-center flex-shrink-0">
                    <div className="font-[family-name:var(--font-display)] text-7xl font-extrabold">
                      {gradeInfo.letter}
                    </div>
                    <div className="text-base text-gray-400 mt-2">{gradeInfo.label}</div>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <div className="font-[family-name:var(--font-display)] text-3xl font-extrabold mb-2">
                      {score}/100
                    </div>
                    <p className="text-base text-gray-400 leading-relaxed">
                      {gradeInfo.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Per-Category Breakdown */}
              <div className="mb-8">
                <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">
                  Category Breakdown
                </h2>
                <div className="space-y-4">
                  {categoryScores.map((cat) => (
                    <div key={cat.name} className="border-b border-gray-100 pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-base font-bold text-black">{cat.name}</span>
                        <span className="text-base font-bold text-black">
                          {cat.yes}/{cat.total} ({cat.score}%)
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 overflow-hidden">
                        <div
                          className="h-full bg-black transition-all duration-500 motion-reduce:transition-none"
                          style={{ width: `${cat.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Priority Recommendations */}
              {failedItems.length > 0 && (
                <div className="mb-8">
                  <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">
                    Priority Recommendations
                  </h2>
                  <p className="text-base text-gray-500 mb-6">
                    These are the items you answered &ldquo;No&rdquo; to. Address them in order of priority to see the biggest improvements.
                  </p>
                  <Stagger stagger={60} animation="fade-up" className="space-y-0">
                    {failedItems.map((item, idx) => (
                      <div key={item.id} className="border-b border-gray-100 p-4">
                        <div className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-8 h-8 bg-black text-white flex items-center justify-center text-base font-bold">
                            {idx + 1}
                          </span>
                          <div>
                            <p className="text-base font-bold text-black">{item.text}</p>
                            <p className="text-base text-gray-500 mt-1">
                              <span className="font-bold">{item.category}</span> &mdash; {item.context}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </Stagger>
                </div>
              )}

              {/* Retake */}
              <div className="text-center pt-4 mb-8">
                <button
                  onClick={handleReset}
                  className="border-2 border-black text-black px-8 py-3 font-bold text-base hover:bg-black hover:text-white transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 min-h-[44px] min-w-[44px]"
                >
                  Retake the Audit
                </button>
              </div>
            </Animate>
          </div>
        </section>
      )}

      {/* ---- What These Scores Mean ---- */}
      <section aria-label="What These Scores Mean" className="px-6 lg:px-12 py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-black tracking-tight mb-8">
              What These Scores Mean
            </h2>
            <Stagger stagger={80} animation="fade-up" className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <p className="text-base font-bold text-black mb-1">A (90 &ndash; 100) &mdash; Excellent</p>
                <p className="text-base text-gray-500 leading-relaxed">
                  Your website follows best practices across all categories. You are well-positioned to rank in search results, convert visitors, and deliver a strong user experience.
                </p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <p className="text-base font-bold text-black mb-1">B (80 &ndash; 89) &mdash; Good</p>
                <p className="text-base text-gray-500 leading-relaxed">
                  Your site has a solid foundation. A few targeted improvements will close the remaining gaps and help you outperform competitors.
                </p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <p className="text-base font-bold text-black mb-1">C (60 &ndash; 79) &mdash; Fair</p>
                <p className="text-base text-gray-500 leading-relaxed">
                  There are meaningful opportunities being missed. Addressing the weakest categories first will produce the most noticeable gains in traffic and conversions.
                </p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <p className="text-base font-bold text-black mb-1">D (40 &ndash; 59) &mdash; Poor</p>
                <p className="text-base text-gray-500 leading-relaxed">
                  Your website has significant gaps that are likely hurting your ability to attract and convert visitors. These issues are costing you business every day they go unresolved.
                </p>
              </div>
              <div>
                <p className="text-base font-bold text-black mb-1">F (0 &ndash; 39) &mdash; Critical</p>
                <p className="text-base text-gray-500 leading-relaxed">
                  Fundamental website standards are not being met. Other marketing investments will underperform until these baseline issues are fixed.
                </p>
              </div>
            </Stagger>
          </Animate>
        </div>
      </section>

      {/* ---- CTA Section ---- */}
      <section aria-label="Call to action" className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Want a Professional Website Audit?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8 leading-relaxed">
              Our team will perform a comprehensive audit of your website and deliver a detailed report with prioritized fixes, technical analysis, and a clear action plan.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 min-h-[44px]"
              >
                Request a Free Audit &rarr;
              </Link>
              <Link
                href="/services/seo"
                className="inline-flex items-center gap-3 border-2 border-white text-white px-10 py-5 font-bold text-base hover:bg-white hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 min-h-[44px]"
              >
                Explore SEO Services
              </Link>
            </div>
          </Animate>
        </div>
      </section>
    
      <ToolCTA
        toolName="Website Audit"
        services={[
          { title: "Website Development", desc: "Fast, accessible websites built for conversion and growth.", href: "/services/website-development" },
          { title: "SEO", desc: "Technical SEO baked in from day one for maximum visibility.", href: "/services/seo" },
          { title: "Digital Marketing", desc: "Drive the right traffic to your optimized digital experience.", href: "/services/digital-marketing" },
        ]}
        relatedTools={[
          { title: "Website Grader", href: "/resources/website-grader" },
          { title: "Website Heuristic Evaluator", href: "/resources/website-heuristic-evaluator" },
          { title: "Website Launch Checklist", href: "/resources/website-launch-checklist" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
