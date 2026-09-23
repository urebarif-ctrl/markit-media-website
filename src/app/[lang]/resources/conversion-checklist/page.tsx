"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

interface ChecklistItem {
  id: string;
  text: string;
  impact: "high" | "medium" | "low";
  recommendation: string;
}

interface ChecklistCategory {
  title: string;
  items: ChecklistItem[];
}

const categories: ChecklistCategory[] = [
  {
    title: "Homepage & Navigation",
    items: [
      {
        id: "hn1",
        text: "Clear value proposition above the fold",
        impact: "high",
        recommendation:
          "Write a headline that explains what you do, who you help, and why it matters in one sentence. Visitors should understand your offer within 5 seconds of landing.",
      },
      {
        id: "hn2",
        text: "Primary CTA visible without scrolling",
        impact: "high",
        recommendation:
          "Place your main call-to-action button above the fold with high-contrast styling. Use action-oriented text like 'Get Started' or 'Request a Quote' instead of generic labels.",
      },
      {
        id: "hn3",
        text: "Navigation is simple with 7 or fewer main items",
        impact: "medium",
        recommendation:
          "Consolidate your navigation to 7 or fewer top-level items. Use dropdowns for subcategories and remove pages that do not directly support conversions.",
      },
      {
        id: "hn4",
        text: "Search functionality available",
        impact: "low",
        recommendation:
          "Add a search bar to your header or navigation area. For content-heavy sites, search helps visitors find what they need faster, reducing bounce rates.",
      },
      {
        id: "hn5",
        text: "Mobile-responsive with touch-friendly elements",
        impact: "high",
        recommendation:
          "Test your site on multiple devices. Ensure all buttons and links have a minimum 44px touch target, text is readable without zooming, and no horizontal scrolling occurs.",
      },
      {
        id: "hn6",
        text: "Page loads in under 3 seconds",
        impact: "high",
        recommendation:
          "Compress images, enable lazy loading, minify CSS and JavaScript, and use a CDN. Test with Google PageSpeed Insights and aim for a score above 80.",
      },
    ],
  },
  {
    title: "Trust & Credibility",
    items: [
      {
        id: "tc1",
        text: "Customer testimonials or reviews displayed",
        impact: "high",
        recommendation:
          "Add real testimonials with customer names, company names, and photos where possible. Place them near CTAs and on key landing pages to reduce hesitation.",
      },
      {
        id: "tc2",
        text: "Security badges or certifications shown",
        impact: "medium",
        recommendation:
          "Display relevant trust badges such as SSL seals, industry certifications, or payment security icons near forms and checkout areas.",
      },
      {
        id: "tc3",
        text: "Company contact information easily accessible",
        impact: "high",
        recommendation:
          "Put your phone number, email, and physical address in the header or footer of every page. Make contact information clickable on mobile devices.",
      },
      {
        id: "tc4",
        text: "Real team photos or About page",
        impact: "medium",
        recommendation:
          "Add an About page with real team photos and bios. Showing the people behind the business builds trust and makes your brand more relatable.",
      },
      {
        id: "tc5",
        text: "Case studies or portfolio examples",
        impact: "high",
        recommendation:
          "Create case studies that show the problem, your solution, and the measurable result. Include specific numbers and timelines to demonstrate credibility.",
      },
      {
        id: "tc6",
        text: "Privacy policy and terms of service linked",
        impact: "low",
        recommendation:
          "Link to your privacy policy and terms of service in the footer. This is a legal requirement in many jurisdictions and reassures visitors about data handling.",
      },
    ],
  },
  {
    title: "Forms & CTAs",
    items: [
      {
        id: "fc1",
        text: "Forms ask for minimum necessary information",
        impact: "high",
        recommendation:
          "Remove any form field that is not essential for the initial conversion. Every additional field reduces completion rates. Collect extra information later in the process.",
      },
      {
        id: "fc2",
        text: "Form fields have clear labels and validation",
        impact: "medium",
        recommendation:
          "Use visible labels above each field instead of placeholder text only. Add inline validation that shows errors next to the specific field in real time.",
      },
      {
        id: "fc3",
        text: "CTA buttons use action-oriented text (not 'Submit')",
        impact: "high",
        recommendation:
          "Replace generic button text like 'Submit' with specific action phrases such as 'Get My Free Quote', 'Start My Trial', or 'Download the Guide'.",
      },
      {
        id: "fc4",
        text: "Multiple CTA types for different buyer stages",
        impact: "medium",
        recommendation:
          "Offer both high-commitment CTAs (book a call, request a demo) and low-commitment options (download a guide, subscribe to updates) to capture leads at every stage.",
      },
      {
        id: "fc5",
        text: "Form confirmation provides clear next steps",
        impact: "medium",
        recommendation:
          "After form submission, show a confirmation page or message that tells the visitor exactly what happens next and when they can expect to hear from you.",
      },
      {
        id: "fc6",
        text: "Contact form response time is stated",
        impact: "low",
        recommendation:
          "Add a line near your contact form such as 'We respond within 2 business hours.' Setting expectations reduces anxiety and builds trust.",
      },
    ],
  },
  {
    title: "Content & Copy",
    items: [
      {
        id: "cc1",
        text: "Headlines are benefit-focused, not feature-focused",
        impact: "high",
        recommendation:
          "Rewrite headlines to describe the outcome or benefit the customer gets, not the feature itself. 'Save 10 Hours a Week' converts better than 'Automated Reporting Tool'.",
      },
      {
        id: "cc2",
        text: "Copy addresses customer pain points directly",
        impact: "high",
        recommendation:
          "Open with the problem your audience faces before presenting your solution. Use the language your customers actually use when describing their challenges.",
      },
      {
        id: "cc3",
        text: "Content is scannable with headers, bullets, short paragraphs",
        impact: "medium",
        recommendation:
          "Break content into short paragraphs of 2 to 3 sentences. Use subheadings every few sections and bullet lists for key points. Most visitors scan before they read.",
      },
      {
        id: "cc4",
        text: "Pricing or pricing guidance is transparent",
        impact: "high",
        recommendation:
          "Display pricing clearly or provide a range. If pricing is custom, explain how it is determined and offer a quick way to get a quote. Hidden pricing drives visitors away.",
      },
      {
        id: "cc5",
        text: "FAQ section addresses common objections",
        impact: "medium",
        recommendation:
          "Add an FAQ section that answers the questions your sales team hears most often. Focus on objections related to cost, timeline, results, and commitment.",
      },
      {
        id: "cc6",
        text: "Content is free of jargon and easy to understand",
        impact: "medium",
        recommendation:
          "Write at an 8th-grade reading level. Replace industry jargon with plain language. If a technical term is necessary, define it clearly in context.",
      },
    ],
  },
  {
    title: "Technical Performance",
    items: [
      {
        id: "tp1",
        text: "Pages load within 3 seconds on mobile",
        impact: "high",
        recommendation:
          "Test with tools like Google PageSpeed Insights or WebPageTest on a mobile connection. Optimize images, reduce server response time, and defer non-critical scripts.",
      },
      {
        id: "tp2",
        text: "No broken links or 404 errors",
        impact: "medium",
        recommendation:
          "Run a site crawl with a tool like Screaming Frog or Ahrefs to identify broken links. Fix or redirect them to maintain user trust and SEO value.",
      },
      {
        id: "tp3",
        text: "SSL certificate active (HTTPS)",
        impact: "high",
        recommendation:
          "Install an SSL certificate and redirect all HTTP traffic to HTTPS. Browsers flag non-HTTPS sites as insecure, which drives visitors away from forms and checkout.",
      },
      {
        id: "tp4",
        text: "Analytics tracking installed and working",
        impact: "high",
        recommendation:
          "Verify that Google Analytics or your analytics platform is installed on every page and recording data correctly. Without analytics, you cannot measure or improve performance.",
      },
      {
        id: "tp5",
        text: "Conversion tracking set up for key actions",
        impact: "high",
        recommendation:
          "Set up goal or event tracking for form submissions, phone calls, purchases, and other key actions. Without conversion tracking, you cannot calculate ROI on marketing spend.",
      },
      {
        id: "tp6",
        text: "Site works across major browsers",
        impact: "medium",
        recommendation:
          "Test your site in Chrome, Firefox, Safari, and Edge. Check for layout issues, broken functionality, and font rendering differences across each browser.",
      },
    ],
  },
];

const ITEMS_PER_CATEGORY = 6;
const TOTAL_ITEMS = categories.length * ITEMS_PER_CATEGORY;

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



export default function ConversionChecklistPage() {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggleItem = useCallback((id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const checkedCount = checked.size;
  const overallPct = TOTAL_ITEMS > 0 ? Math.round((checkedCount / TOTAL_ITEMS) * 100) : 0;
  const grade = getLetterGrade(checkedCount, TOTAL_ITEMS);

  const categoryScores = useMemo(() => {
    return categories.map((cat) => {
      const catChecked = cat.items.filter((item) => checked.has(item.id)).length;
      const catTotal = cat.items.length;
      const catPct = Math.round((catChecked / catTotal) * 100);
      return {
        title: cat.title,
        checked: catChecked,
        total: catTotal,
        pct: catPct,
        grade: getLetterGrade(catChecked, catTotal),
      };
    });
  }, [checked]);

  const priorityImprovements = useMemo(() => {
    const unchecked: Array<{ text: string; recommendation: string; impact: "high" | "medium" | "low"; category: string }> = [];
    for (const cat of categories) {
      for (const item of cat.items) {
        if (!checked.has(item.id)) {
          unchecked.push({
            text: item.text,
            recommendation: item.recommendation,
            impact: item.impact,
            category: cat.title,
          });
        }
      }
    }
    unchecked.sort((a, b) => getImpactOrder(a.impact) - getImpactOrder(b.impact));
    return unchecked;
  }, [checked]);

  const categoryRecommendations = useMemo(() => {
    return categories.map((cat) => {
      const missing = cat.items.filter((item) => !checked.has(item.id));
      missing.sort((a, b) => getImpactOrder(a.impact) - getImpactOrder(b.impact));
      return {
        title: cat.title,
        score: categoryScores.find((cs) => cs.title === cat.title),
        missing,
      };
    });
  }, [checked, categoryScores]);

  const handleReset = useCallback(() => {
    setChecked(new Set());
  }, []);

  return (
    <article className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Website Conversion Optimization Checklist",
          description: "A 30-point interactive checklist that scores your website",
          url: "https://themarkitmedia.com/en/resources/conversion-checklist",
          applicationCategory: "Marketing Tool",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          provider: { "@type": "Organization", name: "Markit Media", url: "https://themarkitmedia.com" },
        }) }}
      />
      <title>Website Conversion Optimization Checklist | Free Marketing Tool — Markit Media</title>
      <meta name="description" content="A 30-point interactive checklist that scores your website" />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Website Conversion Optimization Checklist",
          description:
            "A 30-point interactive checklist that scores your website's conversion readiness across homepage, trust, forms, content, and technical performance.",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />

      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Conversion Checklist" },
        ]}
      />

      {/* Hero */}
      <section aria-label="Free Tool" className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Website Conversion Optimization Checklist
            </h1>
            <SectionDesc>
              A 30-point checklist to evaluate how well your website converts
              visitors into leads and customers. Check off each item you have in
              place to see your scores by category, overall grade, and a
              prioritized list of improvements.
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
                  {checkedCount}/{TOTAL_ITEMS} items checked
                </span>
                <span className="text-base font-bold text-black">
                  {overallPct}%
                  {checkedCount > 0 && (
                    <span className="ml-2">
                      Grade: {grade.letter}
                    </span>
                  )}
                </span>
              </div>
              <div className="w-full h-3 bg-gray-100 overflow-hidden">
                <div
                  className="h-full bg-black transition-all duration-300 motion-reduce:transition-none"
                  style={{ width: `${overallPct}%` }}
                />
              </div>
              {checkedCount > 0 && (
                <p className="text-base text-gray-500 mt-2">{grade.label}</p>
              )}
            </div>
          </Animate>
        </div>
      </section>

      {/* Category checklists */}
      <section aria-label="Content section" className="px-6 lg:px-12 pb-12">
        <div className="max-w-3xl mx-auto space-y-12">
          {categories.map((cat, catIndex) => {
            const score = categoryScores[catIndex];
            return (
              <Animate key={cat.title} animation="fade-up">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black">
                      {cat.title}
                    </h2>
                    <span className="text-base text-gray-400">
                      {score.checked}/{score.total}
                      {score.checked > 0 && (
                        <span className="ml-2 font-bold text-black">
                          {score.grade.letter}
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 overflow-hidden mb-4">
                    <div
                      className="h-full bg-black transition-all duration-300 motion-reduce:transition-none"
                      style={{ width: `${score.pct}%` }}
                    />
                  </div>
                  <div className="space-y-0">
                    {cat.items.map((item) => (
                      <label
                        key={item.id}
                        className="flex items-start gap-3 p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors motion-reduce:transition-none min-h-[44px] focus-within:outline-2 focus-within:outline-black focus-within:outline-offset-2"
                      >
                        <input
                          type="checkbox"
                          checked={checked.has(item.id)}
                          onChange={() => toggleItem(item.id)}
                          className="mt-1 w-5 h-5 flex-shrink-0 accent-black cursor-pointer focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                        />
                        <span
                          className={`text-base leading-relaxed ${
                            checked.has(item.id)
                              ? "text-gray-400 line-through"
                              : "text-gray-700"
                          }`}
                        >
                          {item.text}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </Animate>
            );
          })}
        </div>
      </section>

      {/* Score summary cards */}
      {checkedCount > 0 && (
        <section aria-label="Score Breakdown" className="px-6 lg:px-12 pb-12">
          <div className="max-w-3xl mx-auto">
            <Animate animation="fade-up">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">
                Score Breakdown
              </h2>
            </Animate>
            <Stagger stagger={80} animation="fade-up" className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categoryScores.map((cs) => (
                <div
                  key={cs.title}
                  className="border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black">
                      {cs.title}
                    </h3>
                    <span className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black font-[family-name:var(--font-display)]">
                      {cs.grade.letter}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 overflow-hidden mb-2">
                    <div
                      className="h-full bg-black transition-all duration-300 motion-reduce:transition-none"
                      style={{ width: `${cs.pct}%` }}
                    />
                  </div>
                  <p className="text-base text-gray-500">
                    {cs.checked} of {cs.total} items checked ({cs.pct}%)
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
                      {checkedCount} of {TOTAL_ITEMS} items checked ({overallPct}%)
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
      {checkedCount > 0 && priorityImprovements.length > 0 && (
        <section aria-label="Priority Improvements" className="px-6 lg:px-12 pb-12">
          <div className="max-w-3xl mx-auto">
            <Animate animation="fade-up">
              <div className="border-l-4 border-black pl-6">
                <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-2">
                  Priority Improvements
                </h2>
                <p className="text-base text-gray-500 mb-6">
                  Unchecked items sorted by impact. Focus on high-impact items
                  first for the greatest conversion gains.
                </p>
                <div className="space-y-6">
                  {priorityImprovements.map((item, i) => (
                    <div key={i}>
                      <div className="flex items-center gap-2 mb-1">
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

      {/* Category-by-category recommendations */}
      {checkedCount > 0 && (
        <section aria-label="Category Recommendations" className="px-6 lg:px-12 pb-12">
          <div className="max-w-3xl mx-auto">
            <Animate animation="fade-up">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">
                Category Recommendations
              </h2>
            </Animate>
            <div className="space-y-8">
              {categoryRecommendations.map((cat) => (
                <Animate key={cat.title} animation="fade-up">
                  <div className="border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black">
                        {cat.title}
                      </h3>
                      <span className="text-base text-gray-500">
                        {cat.score?.checked}/{cat.score?.total} completed
                      </span>
                    </div>
                    {cat.missing.length === 0 ? (
                      <p className="text-base text-gray-500">
                        All items completed. This category is fully optimized.
                      </p>
                    ) : (
                      <div className="space-y-4">
                        {cat.missing.map((item) => (
                          <div key={item.id}>
                            <p className="text-base font-bold text-black mb-1">
                              {item.text}
                            </p>
                            <p className="text-base text-gray-500 leading-relaxed">
                              {item.recommendation}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </Animate>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Start Over button */}
      {checkedCount > 0 && (
        <section aria-label="Content section" className="px-6 lg:px-12 pb-12">
          <div className="max-w-3xl mx-auto">
            <Animate animation="fade-up">
              <button
                onClick={handleReset}
                className="text-base font-bold text-gray-500 hover:text-black transition-colors motion-reduce:transition-none min-h-[44px] px-4 py-2 border border-gray-200 hover:border-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                Start Over
              </button>
            </Animate>
          </div>
        </section>
      )}

      {/* CTA */}
      <section aria-label="Call to action" className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Need Help Improving Your Conversions?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Our team will analyze your website, identify specific conversion
              bottlenecks, and build a prioritized action plan to turn more
              visitors into customers.
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
        toolName="Conversion Checklist"
        services={[
          { title: "Website Development", desc: "Fast, accessible websites built for conversion and growth.", href: "/services/website-development" },
          { title: "SEO", desc: "Technical SEO baked in from day one for maximum visibility.", href: "/services/seo" },
          { title: "Digital Marketing", desc: "Drive the right traffic to your optimized digital experience.", href: "/services/digital-marketing" },
        ]}
        relatedTools={[
          { title: "Contrast Checker", href: "/resources/contrast-checker" },
          { title: "Conversion Funnel Simulator", href: "/resources/conversion-funnel-simulator" },
          { title: "Cro Audit", href: "/resources/cro-audit" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
