"use client";

import { useState } from "react";
import Link from "next/link";

const categories = [
  {
    name: "Technical SEO",
    questions: [
      "Site loads in under 3 seconds on mobile",
      "Site has an SSL certificate (HTTPS)",
      "XML sitemap is submitted to Google Search Console",
      "Robots.txt file is properly configured",
      "No significant crawl errors in Search Console",
      "Canonical tags are implemented on all pages",
      "Mobile-friendly design passes Google's mobile test",
      "Core Web Vitals pass (LCP, CLS, INP)",
    ],
  },
  {
    name: "On-Page SEO",
    questions: [
      "Each page has a unique, keyword-rich title tag",
      "Meta descriptions are written for key pages",
      "Only one H1 tag per page",
      "Header hierarchy is logical (H1 > H2 > H3)",
      "Images have descriptive alt text",
      "URLs are clean, short, and descriptive",
      "Internal linking connects related pages",
      "Schema markup is implemented where relevant",
    ],
  },
  {
    name: "Content Quality",
    questions: [
      "Content targets specific search intent for each page",
      "Blog or resource section is regularly updated",
      "Content is original and not duplicated from other sites",
      "Pages have sufficient depth for their topic",
      "Content includes relevant keywords naturally",
      "Pages have clear calls to action",
      "Thin or low-value pages have been improved or removed",
      "Content covers topics comprehensively",
    ],
  },
  {
    name: "Off-Page SEO",
    questions: [
      "Site has backlinks from relevant, authoritative domains",
      "Google Business Profile is claimed and optimized",
      "Business is listed in relevant industry directories",
      "No toxic or spammy backlinks in the link profile",
      "Active link building or digital PR strategy in place",
      "Social media profiles link back to the website",
      "Brand mentions exist across the web",
      "Local citations are consistent (NAP data)",
    ],
  },
  {
    name: "User Experience",
    questions: [
      "Navigation is clear and intuitive",
      "Site is accessible (WCAG AA compliant)",
      "No intrusive interstitials or popups on mobile",
      "Contact information is easy to find",
      "Forms are simple and functional",
      "404 page exists and guides users back",
      "Site search works correctly",
      "Bounce rate is within acceptable range for the industry",
    ],
  },
];

function getGrade(score: number) {
  if (score >= 90) return { grade: "A", label: "Excellent" };
  if (score >= 75) return { grade: "B", label: "Strong" };
  if (score >= 60) return { grade: "C", label: "Needs Work" };
  if (score >= 40) return { grade: "D", label: "Weak" };
  return { grade: "F", label: "Critical" };
}

export default function SeoAuditScorePage() {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [showResults, setShowResults] = useState(false);

  const totalQ = categories.reduce((s, c) => s + c.questions.length, 0);
  const checked = Object.values(answers).filter(Boolean).length;
  const score = Math.round((checked / totalQ) * 100);
  const { grade, label } = getGrade(score);

  const catScores = categories.map((cat) => {
    const n = cat.questions.filter((_, qi) => answers[`${cat.name}-${qi}`]).length;
    return { name: cat.name, score: Math.round((n / cat.questions.length) * 100), n, total: cat.questions.length };
  });

  const unchecked = categories.flatMap((cat) =>
    cat.questions
      .map((q, qi) => ({ category: cat.name, question: q, key: `${cat.name}-${qi}` }))
      .filter((item) => !answers[item.key])
  );

  const toggle = (key: string) => setAnswers((p) => ({ ...p, [key]: !p[key] }));

  return (
    <article className="px-6 lg:px-12 py-16">
      <div className="max-w-4xl mx-auto">
        <nav aria-label="Breadcrumb" className="text-base text-gray-400 mb-8">
          <Link href="/resources" className="hover:text-black transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Resources</Link>
          <span className="mx-2">/</span>
          <span className="text-black">SEO Audit Score</span>
        </nav>

        <header className="mb-12">
          <p className="text-base font-semibold tracking-widest uppercase text-gray-400 mb-3">Free SEO Tool</p>
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1]">
            SEO Audit Score Calculator
          </h1>
          <p className="text-lg text-gray-500 mt-4 max-w-2xl">
            Check 40 SEO factors across 5 categories. Get your overall score, category breakdown, and prioritized improvements.
          </p>
        </header>

        {!showResults ? (
          <div className="space-y-10">
            {categories.map((cat) => (
              <section key={cat.name} className="border border-gray-200 p-6 lg:p-8">
                <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-black mb-6">{cat.name}</h2>
                <div className="space-y-3">
                  {cat.questions.map((q, qi) => {
                    const key = `${cat.name}-${qi}`;
                    return (
                      <label key={key} className="flex items-start gap-3 cursor-pointer group">
                        <input type="checkbox" checked={!!answers[key]} onChange={() => toggle(key)} className="mt-1 w-5 h-5 accent-black flex-shrink-0" />
                        <span className="text-base text-gray-700 group-hover:text-black transition-colors">{q}</span>
                      </label>
                    );
                  })}
                </div>
              </section>
            ))}
            <div className="flex items-center justify-between border-t border-gray-200 pt-6">
              <p className="text-base text-gray-500">{checked} of {totalQ} items checked</p>
              <button onClick={() => setShowResults(true)} className="bg-black text-white px-8 py-4 text-base font-bold hover:bg-gray-800 transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                Calculate Score &rarr;
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-10">
            <section className="border border-gray-200 p-8 text-center">
              <p className="text-base font-semibold tracking-widest uppercase text-gray-400 mb-4">Your SEO Health Score</p>
              <div className="inline-flex items-center justify-center w-40 h-40 border-4 border-black rounded-full mb-4">
                <div>
                  <div className="font-[family-name:var(--font-display)] text-5xl font-extrabold text-black">{score}</div>
                  <div className="text-base text-gray-500">/100</div>
                </div>
              </div>
              <div className="mt-2">
                <span className="inline-block bg-black text-white px-4 py-2 text-lg font-bold">Grade: {grade} — {label}</span>
              </div>
              <p className="text-base text-gray-500 mt-4">{checked} of {totalQ} checkpoints passed</p>
            </section>

            <section className="border border-gray-200 p-6 lg:p-8">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-black mb-6">Category Breakdown</h2>
              <svg viewBox="0 0 400 200" className="w-full max-w-lg mx-auto" aria-label="SEO score chart">
                {catScores.map((cs, i) => {
                  const y = i * 38 + 5;
                  const bw = (cs.score / 100) * 280;
                  return (
                    <g key={cs.name}>
                      <text x="0" y={y + 14} fontSize="10" fill="#6b7280">{cs.name}</text>
                      <rect x="110" y={y} width="280" height="22" fill="#f3f4f6" rx="2" />
                      <rect x="110" y={y} width={bw} height="22" fill="#000" rx="2" />
                      <text x={bw > 35 ? 105 + bw : 118 + bw} y={y + 15} fontSize="10" fill={bw > 35 ? "#fff" : "#000"} textAnchor={bw > 35 ? "end" : "start"}>{cs.score}%</text>
                    </g>
                  );
                })}
              </svg>
            </section>

            {unchecked.length > 0 && (
              <section className="border border-gray-200 p-6 lg:p-8">
                <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-black mb-4">Prioritized Recommendations</h2>
                <p className="text-base text-gray-500 mb-6">{unchecked.length} items to address.</p>
                {categories.map((cat) => {
                  const items = unchecked.filter((u) => u.category === cat.name);
                  if (!items.length) return null;
                  return (
                    <div key={cat.name} className="mb-6 last:mb-0">
                      <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-black mb-3">
                        {cat.name} <span className="text-base font-normal text-gray-400">({items.length})</span>
                      </h3>
                      <ul className="space-y-2">
                        {items.map((item) => (
                          <li key={item.key} className="flex items-start gap-3 text-base text-gray-700">
                            <span className="text-gray-300 flex-shrink-0">&#9744;</span>{item.question}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </section>
            )}

            <div className="flex flex-wrap gap-4">
              <button onClick={() => setShowResults(false)} className="border-2 border-black text-black px-8 py-4 text-base font-bold hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">&larr; Edit Answers</button>
              <button onClick={() => { setAnswers({}); setShowResults(false); }} className="border-2 border-gray-300 text-gray-500 px-8 py-4 text-base font-bold hover:border-black hover:text-black transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Start Over</button>
            </div>

            <section className="bg-black text-white p-8 lg:p-12 text-center mt-8">
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold mb-4">Want a Professional SEO Audit?</h2>
              <p className="text-lg text-gray-300 mb-8 max-w-xl mx-auto">Our team conducts comprehensive technical and strategic SEO audits with detailed action plans.</p>
              <Link href="/contact" className="inline-block bg-white text-black px-10 py-5 text-base font-bold hover:bg-gray-100 transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">Get a Professional Audit &rarr;</Link>
            </section>
          </div>
        )}
      </div>
    </article>
  );
}
