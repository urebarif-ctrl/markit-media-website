"use client";

import { useState } from "react";
import Link from "next/link";

interface Question {
  id: string;
  text: string;
  weight: number;
}

interface Category {
  name: string;
  icon: string;
  questions: Question[];
}

const categories: Category[] = [
  {
    name: "Mobile Experience",
    icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
    questions: [
      { id: "m1", text: "Site is fully responsive on all screen sizes", weight: 3 },
      { id: "m2", text: "Tap targets are at least 44x44px", weight: 2 },
      { id: "m3", text: "No horizontal scrolling on mobile", weight: 3 },
      { id: "m4", text: "Text is readable without zooming (16px+ body)", weight: 2 },
      { id: "m5", text: "Mobile navigation is easy to use", weight: 2 },
      { id: "m6", text: "Forms are mobile-friendly with appropriate input types", weight: 2 },
      { id: "m7", text: "Images scale properly on mobile", weight: 1 },
      { id: "m8", text: "Phone numbers and emails are clickable", weight: 1 },
    ],
  },
  {
    name: "Page Speed",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    questions: [
      { id: "s1", text: "Page loads in under 3 seconds on desktop", weight: 3 },
      { id: "s2", text: "Images are compressed and use modern formats (WebP/AVIF)", weight: 2 },
      { id: "s3", text: "CSS and JavaScript are minified", weight: 2 },
      { id: "s4", text: "Browser caching headers are configured", weight: 2 },
      { id: "s5", text: "Lazy loading is used for below-the-fold images", weight: 2 },
      { id: "s6", text: "No render-blocking resources above the fold", weight: 2 },
      { id: "s7", text: "CDN is configured for static assets", weight: 1 },
      { id: "s8", text: "Core Web Vitals (LCP, FID, CLS) pass thresholds", weight: 3 },
    ],
  },
  {
    name: "SEO Foundations",
    icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
    questions: [
      { id: "e1", text: "Every page has a unique title tag (50-60 chars)", weight: 3 },
      { id: "e2", text: "Every page has a unique meta description (120-160 chars)", weight: 2 },
      { id: "e3", text: "One H1 per page that includes the target keyword", weight: 3 },
      { id: "e4", text: "Clean URL structure with descriptive slugs", weight: 2 },
      { id: "e5", text: "XML sitemap is submitted to search engines", weight: 2 },
      { id: "e6", text: "robots.txt is properly configured", weight: 1 },
      { id: "e7", text: "Structured data (Schema.org) is implemented", weight: 2 },
      { id: "e8", text: "Internal linking strategy is in place", weight: 2 },
    ],
  },
  {
    name: "Security",
    icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
    questions: [
      { id: "c1", text: "SSL/HTTPS is active on all pages", weight: 3 },
      { id: "c2", text: "All HTTP requests redirect to HTTPS", weight: 3 },
      { id: "c3", text: "Security headers are configured (CSP, X-Frame-Options)", weight: 2 },
      { id: "c4", text: "CMS and plugins are up to date", weight: 2 },
      { id: "c5", text: "Contact forms have spam protection (CAPTCHA/honeypot)", weight: 2 },
      { id: "c6", text: "Regular backups are scheduled", weight: 2 },
      { id: "c7", text: "Admin login uses strong passwords and 2FA", weight: 2 },
      { id: "c8", text: "No mixed content warnings (HTTP assets on HTTPS pages)", weight: 1 },
    ],
  },
  {
    name: "Accessibility",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
    questions: [
      { id: "a1", text: "All images have descriptive alt text", weight: 3 },
      { id: "a2", text: "Colour contrast meets WCAG AA (4.5:1 for text)", weight: 3 },
      { id: "a3", text: "Site is navigable by keyboard alone", weight: 2 },
      { id: "a4", text: "Focus indicators are visible on interactive elements", weight: 2 },
      { id: "a5", text: "Form inputs have associated labels", weight: 2 },
      { id: "a6", text: "ARIA landmarks are used (header, nav, main, footer)", weight: 2 },
      { id: "a7", text: "Skip-to-content link is available", weight: 1 },
      { id: "a8", text: "Content is readable at 200% zoom", weight: 2 },
    ],
  },
];

const totalWeight = categories.reduce(
  (sum, cat) => sum + cat.questions.reduce((s, q) => s + q.weight, 0),
  0
);

function getGrade(pct: number): { letter: string; color: string } {
  if (pct >= 90) return { letter: "A", color: "#16a34a" };
  if (pct >= 80) return { letter: "B", color: "#65a30d" };
  if (pct >= 70) return { letter: "C", color: "#ca8a04" };
  if (pct >= 50) return { letter: "D", color: "#ea580c" };
  return { letter: "F", color: "#dc2626" };
}

export default function WebsiteReadinessScorecardPage() {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [showResults, setShowResults] = useState(false);

  const toggle = (id: string) =>
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const earnedWeight = categories.reduce(
    (sum, cat) =>
      sum + cat.questions.filter((q) => checked.has(q.id)).reduce((s, q) => s + q.weight, 0),
    0
  );
  const pct = Math.round((earnedWeight / totalWeight) * 100);
  const grade = getGrade(pct);

  const catScores = categories.map((cat) => {
    const catTotal = cat.questions.reduce((s, q) => s + q.weight, 0);
    const catEarned = cat.questions
      .filter((q) => checked.has(q.id))
      .reduce((s, q) => s + q.weight, 0);
    return {
      name: cat.name,
      pct: Math.round((catEarned / catTotal) * 100),
      earned: catEarned,
      total: catTotal,
    };
  });

  const priorities = categories.flatMap((cat) =>
    cat.questions
      .filter((q) => !checked.has(q.id))
      .map((q) => ({ ...q, category: cat.name }))
  );
  priorities.sort((a, b) => b.weight - a.weight);

  return (
    <article className="px-6 lg:px-12 py-16">
      <div className="max-w-5xl mx-auto">
        <nav aria-label="Breadcrumb" className="text-base text-gray-400 mb-8">
          <Link
            href="/resources"
            className="hover:text-black transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
          >
            Resources
          </Link>
          <span className="mx-2">/</span>
          <span className="text-black">Website Readiness Scorecard</span>
        </nav>

        <header className="mb-12">
          <p className="text-base font-semibold tracking-widest uppercase text-gray-400 mb-3">
            Free Assessment Tool
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1]">
            Website Readiness Scorecard
          </h1>
          <p className="text-lg text-gray-500 mt-4 max-w-2xl">
            Assess your website across 5 critical dimensions. Check each item that applies to your
            site and get an instant score with prioritised recommendations.
          </p>
        </header>

        {!showResults ? (
          <div className="space-y-10">
            {categories.map((cat) => (
              <section key={cat.name} className="border border-gray-200 p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <svg
                    className="w-6 h-6 text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d={cat.icon} />
                  </svg>
                  <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-black">
                    {cat.name}
                  </h2>
                  <span className="ml-auto text-base text-gray-400">
                    {cat.questions.filter((q) => checked.has(q.id)).length}/{cat.questions.length}
                  </span>
                </div>
                <div className="space-y-3">
                  {cat.questions.map((q) => (
                    <label
                      key={q.id}
                      className="flex items-start gap-3 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={checked.has(q.id)}
                        onChange={() => toggle(q.id)}
                        className="mt-1 w-5 h-5 accent-black cursor-pointer"
                      />
                      <span className="text-base text-gray-700 group-hover:text-black transition-colors">
                        {q.text}
                      </span>
                      {q.weight === 3 && (
                        <span className="ml-auto shrink-0 text-base font-bold text-black bg-gray-100 px-2 py-0.5">
                          High
                        </span>
                      )}
                      {q.weight === 2 && (
                        <span className="ml-auto shrink-0 text-base text-gray-400 bg-gray-50 px-2 py-0.5">
                          Med
                        </span>
                      )}
                    </label>
                  ))}
                </div>
              </section>
            ))}

            <button
              onClick={() => setShowResults(true)}
              className="bg-black text-white px-8 py-4 text-base font-bold hover:bg-gray-800 transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              Get Your Score &rarr;
            </button>
          </div>
        ) : (
          <div className="space-y-10">
            <section className="border border-gray-200 p-8 lg:p-12 text-center">
              <div className="inline-flex items-center justify-center w-32 h-32 rounded-full border-4 mb-6" style={{ borderColor: grade.color }}>
                <div>
                  <div className="text-5xl font-extrabold" style={{ color: grade.color }}>
                    {grade.letter}
                  </div>
                  <div className="text-base text-gray-500">{pct}/100</div>
                </div>
              </div>
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-black mb-2">
                Your Website Readiness Score
              </h2>
              <p className="text-lg text-gray-500">
                {pct >= 90
                  ? "Excellent! Your website is well-optimised across all dimensions."
                  : pct >= 70
                    ? "Good foundation, but there are areas that need attention."
                    : pct >= 50
                      ? "Your site has significant gaps that could be costing you traffic and conversions."
                      : "Critical issues detected. Prioritise the recommendations below."}
              </p>
            </section>

            <section className="border border-gray-200 p-6 lg:p-8">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-black mb-6">
                Category Breakdown
              </h2>
              <svg viewBox="0 0 600 220" className="w-full" aria-label="Score breakdown by category">
                {catScores.map((cs, i) => {
                  const y = i * 42 + 10;
                  const barWidth = (cs.pct / 100) * 350;
                  const g = getGrade(cs.pct);
                  return (
                    <g key={cs.name}>
                      <text x="0" y={y + 18} className="text-[14px] fill-gray-700 font-medium">
                        {cs.name}
                      </text>
                      <rect x="160" y={y + 2} width="350" height="24" fill="#f3f4f6" rx="2" />
                      <rect
                        x="160"
                        y={y + 2}
                        width={barWidth}
                        height="24"
                        fill={g.color}
                        rx="2"
                      />
                      <text
                        x="520"
                        y={y + 19}
                        className="text-[14px] fill-black font-bold"
                        textAnchor="start"
                      >
                        {cs.pct}%
                      </text>
                    </g>
                  );
                })}
              </svg>
            </section>

            {priorities.length > 0 && (
              <section className="border border-gray-200 p-6 lg:p-8">
                <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-black mb-6">
                  Priority Recommendations
                </h2>
                <div className="space-y-3">
                  {priorities.slice(0, 15).map((p, i) => (
                    <div key={p.id} className="flex items-start gap-3 text-base">
                      <span className="shrink-0 w-7 h-7 flex items-center justify-center bg-black text-white font-bold text-base">
                        {i + 1}
                      </span>
                      <div>
                        <span className="text-gray-700">{p.text}</span>
                        <span className="ml-2 text-gray-400">({p.category})</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setShowResults(false)}
                className="border border-gray-300 text-gray-700 px-6 py-3 text-base font-medium hover:border-black hover:text-black transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                Edit Answers
              </button>
              <button
                onClick={() => {
                  setChecked(new Set());
                  setShowResults(false);
                }}
                className="border border-gray-300 text-gray-700 px-6 py-3 text-base font-medium hover:border-black hover:text-black transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                Start Over
              </button>
            </div>

            <section className="bg-black text-white p-8 lg:p-12 text-center">
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold mb-4">
                Need Help Improving Your Score?
              </h2>
              <p className="text-lg text-gray-300 mb-8 max-w-xl mx-auto">
                Our team audits, optimises, and rebuilds websites for performance, SEO, and
                conversions.
              </p>
              <Link
                href="/contact"
                className="inline-block bg-white text-black px-10 py-5 text-base font-bold hover:bg-gray-100 transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              >
                Get a Free Website Audit &rarr;
              </Link>
            </section>
          </div>
        )}
      </div>
    </article>
  );
}
