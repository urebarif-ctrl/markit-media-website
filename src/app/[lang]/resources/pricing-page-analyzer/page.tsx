"use client";

import { useState } from "react";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

interface CheckItem {
  id: string;
  text: string;
  category: string;
  weight: number;
  tip: string;
}

const checks: CheckItem[] = [
  { id: "p1", text: "Pricing is clearly visible without scrolling", category: "Clarity", weight: 3, tip: "Place pricing above the fold so visitors immediately see their options." },
  { id: "p2", text: "Plans are limited to 3-4 options", category: "Clarity", weight: 2, tip: "Too many options create decision paralysis. 3 tiers is the sweet spot." },
  { id: "p3", text: "One plan is visually highlighted as recommended", category: "Persuasion", weight: 3, tip: "Anchoring a 'Most Popular' or 'Best Value' plan guides 60-70% of conversions." },
  { id: "p4", text: "Feature comparison table is included", category: "Clarity", weight: 2, tip: "A comparison table helps visitors quickly understand differences between plans." },
  { id: "p5", text: "Prices show clear currency and billing period", category: "Trust", weight: 3, tip: "Ambiguous pricing destroys trust. Show currency, billing cycle, and any conditions clearly." },
  { id: "p6", text: "Annual vs monthly toggle is available", category: "Persuasion", weight: 2, tip: "Showing annual savings encourages longer commitments and higher LTV." },
  { id: "p7", text: "CTA buttons use action-oriented text", category: "Persuasion", weight: 2, tip: "'Start Free Trial' or 'Get Started' converts better than 'Buy Now' or 'Submit'." },
  { id: "p8", text: "Social proof is visible near pricing", category: "Trust", weight: 3, tip: "Testimonials, review scores, or customer counts near pricing reduce purchase anxiety." },
  { id: "p9", text: "Money-back guarantee or free trial is offered", category: "Trust", weight: 3, tip: "Risk reversal is one of the most powerful conversion tools on a pricing page." },
  { id: "p10", text: "FAQ section addresses common pricing objections", category: "Trust", weight: 2, tip: "Anticipate and answer objections about pricing, contracts, and hidden fees." },
  { id: "p11", text: "Page loads in under 3 seconds", category: "UX", weight: 2, tip: "Slow pricing pages lose impatient buyers. Optimise for speed." },
  { id: "p12", text: "Mobile layout is clean and easy to compare", category: "UX", weight: 3, tip: "Pricing tables often break on mobile. Test and optimise the mobile experience." },
  { id: "p13", text: "No distracting navigation or exit points", category: "UX", weight: 2, tip: "Minimise navigation options on pricing pages to keep focus on conversion." },
  { id: "p14", text: "Enterprise/custom option is available for larger buyers", category: "Persuasion", weight: 2, tip: "A 'Contact Sales' option captures high-value leads who don't fit standard plans." },
  { id: "p15", text: "Value propositions are restated near CTAs", category: "Persuasion", weight: 2, tip: "Remind visitors WHY they should buy right before the action button." },
  { id: "p16", text: "Trust badges or security icons are displayed", category: "Trust", weight: 2, tip: "SSL badges, payment processor logos, and security certifications build confidence." },
  { id: "p17", text: "Plan names communicate value (not just tier levels)", category: "Clarity", weight: 1, tip: "'Growth' and 'Pro' tell a story. 'Plan 1' and 'Plan 2' don't." },
  { id: "p18", text: "Most important features are listed first in each plan", category: "Clarity", weight: 2, tip: "Lead with the features that matter most to each plan's target audience." },
  { id: "p19", text: "Cross-out or savings amount is shown for annual billing", category: "Persuasion", weight: 2, tip: "Showing the monthly equivalent and savings percentage increases annual plan conversions." },
  { id: "p20", text: "Page has a single, clear conversion goal", category: "UX", weight: 2, tip: "Every element should support one goal: getting visitors to choose a plan and convert." },
];

const totalWeight = checks.reduce((sum, c) => sum + c.weight, 0);

const categoryNames = ["Clarity", "Persuasion", "Trust", "UX"];

function getGrade(pct: number): { letter: string; color: string } {
  if (pct >= 90) return { letter: "A", color: "#16a34a" };
  if (pct >= 75) return { letter: "B", color: "#65a30d" };
  if (pct >= 60) return { letter: "C", color: "#ca8a04" };
  if (pct >= 40) return { letter: "D", color: "#ea580c" };
  return { letter: "F", color: "#dc2626" };
}

export default function PricingPageAnalyzerPage() {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [showResults, setShowResults] = useState(false);

  const toggle = (id: string) =>
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const earnedWeight = checks.filter((c) => checked.has(c.id)).reduce((sum, c) => sum + c.weight, 0);
  const pct = Math.round((earnedWeight / totalWeight) * 100);
  const grade = getGrade(pct);

  const catScores = categoryNames.map((cat) => {
    const catChecks = checks.filter((c) => c.category === cat);
    const catTotal = catChecks.reduce((s, c) => s + c.weight, 0);
    const catEarned = catChecks.filter((c) => checked.has(c.id)).reduce((s, c) => s + c.weight, 0);
    return { name: cat, pct: catTotal > 0 ? Math.round((catEarned / catTotal) * 100) : 0 };
  });

  const tips = checks.filter((c) => !checked.has(c.id)).sort((a, b) => b.weight - a.weight);

  return (
    <article className="px-6 lg:px-12 py-16">
      <div className="max-w-4xl mx-auto">
        <nav aria-label="Breadcrumb" className="text-base text-gray-400 mb-8">
          <Link href="/resources" className="hover:text-black transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Resources</Link>
          <span className="mx-2">/</span>
          <span className="text-black">Pricing Page Analyser</span>
        </nav>

        <header className="mb-12">
          <p className="text-base font-semibold tracking-widest uppercase text-gray-400 mb-3">Free Conversion Tool</p>
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1]">
            Pricing Page Analyser
          </h1>
          <p className="text-lg text-gray-500 mt-4 max-w-2xl">
            Check your pricing page against 20 proven conversion best practices. Get a score and prioritised recommendations.
          </p>
        </header>

        {!showResults ? (
          <div className="space-y-8">
            {categoryNames.map((cat) => (
              <section key={cat} className="border border-gray-200 p-6 lg:p-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-black">{cat}</h2>
                  <span className="text-base text-gray-400">
                    {checks.filter((c) => c.category === cat && checked.has(c.id)).length}/
                    {checks.filter((c) => c.category === cat).length}
                  </span>
                </div>
                <div className="space-y-3">
                  {checks.filter((c) => c.category === cat).map((c) => (
                    <label key={c.id} className="flex items-start gap-3 cursor-pointer group">
                      <input type="checkbox" checked={checked.has(c.id)} onChange={() => toggle(c.id)} className="mt-1 w-5 h-5 accent-black cursor-pointer" />
                      <span className="text-base text-gray-700 group-hover:text-black transition-colors">{c.text}</span>
                      {c.weight === 3 && <span className="ml-auto shrink-0 text-base font-bold text-black bg-gray-100 px-2 py-0.5">High</span>}
                    </label>
                  ))}
                </div>
              </section>
            ))}

            <button onClick={() => setShowResults(true)} className="bg-black text-white px-8 py-4 text-base font-bold hover:bg-gray-800 transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
              Analyse My Pricing Page &rarr;
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            <section className="border border-gray-200 p-8 text-center">
              <div className="inline-flex items-center justify-center w-28 h-28 rounded-full border-4 mb-4" style={{ borderColor: grade.color }}>
                <div>
                  <div className="text-4xl font-extrabold" style={{ color: grade.color }}>{grade.letter}</div>
                  <div className="text-base text-gray-500">{pct}/100</div>
                </div>
              </div>
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-black mb-2">Pricing Page Score</h2>
              <p className="text-lg text-gray-500">
                {pct >= 90 ? "Your pricing page follows best practices excellently." :
                 pct >= 75 ? "Good pricing page with room for improvement." :
                 pct >= 60 ? "Several optimisation opportunities identified." :
                 "Significant improvements needed to maximise conversions."}
              </p>
            </section>

            <section className="border border-gray-200 p-6 lg:p-8">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-black mb-4">Category Scores</h2>
              <div className="space-y-3">
                {catScores.map((cs) => {
                  const g = getGrade(cs.pct);
                  return (
                    <div key={cs.name} className="flex items-center gap-4">
                      <span className="w-28 text-base font-medium text-gray-700">{cs.name}</span>
                      <div className="flex-1 h-6 bg-gray-100">
                        <div className="h-6 transition-all" style={{ width: `${cs.pct}%`, backgroundColor: g.color }} />
                      </div>
                      <span className="text-base font-bold w-12 text-right" style={{ color: g.color }}>{cs.pct}%</span>
                    </div>
                  );
                })}
              </div>
            </section>

            {tips.length > 0 && (
              <section className="border border-gray-200 p-6 lg:p-8">
                <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-black mb-4">Improvement Recommendations</h2>
                <div className="space-y-4">
                  {tips.slice(0, 10).map((t, i) => (
                    <div key={t.id} className="flex items-start gap-3">
                      <span className="shrink-0 w-7 h-7 flex items-center justify-center bg-black text-white font-bold text-base">{i + 1}</span>
                      <div>
                        <p className="text-base text-black font-medium">{t.text}</p>
                        <p className="text-base text-gray-500 mt-1">{t.tip}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <div className="flex flex-wrap gap-4">
              <button onClick={() => setShowResults(false)} className="border border-gray-300 text-gray-700 px-6 py-3 text-base font-medium hover:border-black hover:text-black transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Edit Checklist</button>
              <button onClick={() => { setChecked(new Set()); setShowResults(false); }} className="border border-gray-300 text-gray-700 px-6 py-3 text-base font-medium hover:border-black hover:text-black transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Start Over</button>
            </div>

            <section className="bg-black text-white p-8 lg:p-12 text-center">
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold mb-4">Want a Higher-Converting Pricing Page?</h2>
              <p className="text-lg text-gray-300 mb-8 max-w-xl mx-auto">Our CRO team designs and tests pricing pages that turn more visitors into customers.</p>
              <Link href="/contact" className="inline-block bg-white text-black px-10 py-5 text-base font-bold hover:bg-gray-100 transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">Optimise Your Pricing Page &rarr;</Link>
            </section>
          </div>
        )}
      </div>
          <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Pricing Page Analyser",
          description: "Analyse your pricing page against proven conversion best practices. Get a score and actionable recommendations to improve your pricing page performance.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />
    
      <ToolCTA
        toolName="Pricing Page Analyzer"
        services={[
          { title: "Digital Marketing", desc: "Full-service digital marketing strategy for measurable business growth.", href: "/services/digital-marketing" },
          { title: "SEO", desc: "Organic search strategies that deliver compounding traffic over time.", href: "/services/seo" },
          { title: "Performance Marketing", desc: "Paid campaigns optimized for maximum return on ad spend.", href: "/services/performance-marketing" },
        ]}
        relatedTools={[
          { title: "Pricing Calculator", href: "/resources/pricing-calculator" },
          { title: "Pricing Optimizer", href: "/resources/pricing-optimizer" },
          { title: "Quarterly Review", href: "/resources/quarterly-review" },
          { title: "Redesign Planner", href: "/resources/redesign-planner" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
