"use client";

import { useState } from "react";
import Link from "next/link";
import { Animate } from "@/components/animate";
import { SectionLabel } from "@/components/section";
import { JsonLd } from "@/components/json-ld";

interface Question {
  id: string;
  text: string;
  options: { label: string; score: number }[];
}

const questions: Question[] = [
  {
    id: "speed",
    text: "How fast does your website load?",
    options: [
      { label: "Under 2 seconds", score: 10 },
      { label: "2-4 seconds", score: 7 },
      { label: "4-6 seconds", score: 4 },
      { label: "Over 6 seconds or not sure", score: 1 },
    ],
  },
  {
    id: "mobile",
    text: "How does your website look on mobile devices?",
    options: [
      { label: "Fully responsive, looks great", score: 10 },
      { label: "Works but has some layout issues", score: 6 },
      { label: "Not optimized for mobile", score: 2 },
      { label: "Not sure", score: 3 },
    ],
  },
  {
    id: "seo",
    text: "Are you ranking on Google for your target keywords?",
    options: [
      { label: "Yes, page 1 for main keywords", score: 10 },
      { label: "Ranking but not on page 1", score: 6 },
      { label: "Barely ranking anywhere", score: 3 },
      { label: "Not tracking this yet", score: 1 },
    ],
  },
  {
    id: "content",
    text: "How often do you publish new content?",
    options: [
      { label: "Weekly", score: 10 },
      { label: "Monthly", score: 7 },
      { label: "Occasionally", score: 4 },
      { label: "Rarely or never", score: 1 },
    ],
  },
  {
    id: "cta",
    text: "Do your pages have clear calls-to-action?",
    options: [
      { label: "Yes, every page has a clear CTA", score: 10 },
      { label: "Some pages do", score: 6 },
      { label: "Not really", score: 2 },
      { label: "Not sure what a CTA is", score: 1 },
    ],
  },
  {
    id: "ssl",
    text: "Does your site use HTTPS?",
    options: [
      { label: "Yes", score: 10 },
      { label: "Not sure", score: 3 },
      { label: "No", score: 0 },
    ],
  },
  {
    id: "analytics",
    text: "Do you track website analytics?",
    options: [
      { label: "Yes, with goals and conversion tracking", score: 10 },
      { label: "Yes, basic analytics only", score: 6 },
      { label: "No analytics installed", score: 0 },
    ],
  },
  {
    id: "design",
    text: "When was your website last redesigned?",
    options: [
      { label: "Within the last year", score: 10 },
      { label: "1-3 years ago", score: 7 },
      { label: "3-5 years ago", score: 3 },
      { label: "Over 5 years ago or never", score: 1 },
    ],
  },
];

function getGrade(score: number, max: number) {
  const pct = (score / max) * 100;
  if (pct >= 90) return { grade: "A", label: "Excellent", desc: "Your website is performing well. Focus on optimization and scaling." };
  if (pct >= 75) return { grade: "B", label: "Good", desc: "Solid foundation with opportunities to improve in specific areas." };
  if (pct >= 50) return { grade: "C", label: "Average", desc: "Several areas need attention. Prioritize the weakest scores first." };
  if (pct >= 25) return { grade: "D", label: "Below Average", desc: "Significant improvements needed across multiple areas." };
  return { grade: "F", label: "Needs Work", desc: "Your website needs a comprehensive overhaul to compete effectively." };
}

export default function WebsiteGraderPage() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const maxScore = questions.length * 10;
  const totalScore = Object.values(answers).reduce((sum, s) => sum + s, 0);

  const allAnswered = Object.keys(answers).length === questions.length;

  return (
    <article>
      <nav className="px-6 lg:px-12 pt-20 pb-4" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-base text-gray-400">
          <li><Link href="/" className="hover:text-black transition-colors motion-reduce:transition-none">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/resources" className="hover:text-black transition-colors motion-reduce:transition-none">Resources</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-black font-medium">Website Grader</li>
        </ol>
      </nav>

      <section className="px-6 lg:px-12 pt-4 pb-12">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Website Performance Grader
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-4">
              Answer 8 quick questions about your website to get an instant performance grade and actionable recommendations.
            </p>
          </Animate>
        </div>
      </section>

      {!submitted ? (
        <section className="px-6 lg:px-12 py-8" aria-label="Questions">
          <div className="max-w-3xl mx-auto space-y-8">
            {questions.map((q, i) => (
              <Animate key={q.id} animation="fade-up">
                <div className="border border-gray-200 p-6">
                  <h2 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black mb-4">
                    {i + 1}. {q.text}
                  </h2>
                  <div className="space-y-2">
                    {q.options.map((opt) => (
                      <button
                        key={opt.label}
                        onClick={() => setAnswers({ ...answers, [q.id]: opt.score })}
                        className={`w-full text-left px-4 py-3 text-base transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                          answers[q.id] === opt.score
                            ? "bg-black text-white"
                            : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </Animate>
            ))}

            <div className="text-center pt-4">
              <button
                onClick={() => allAnswered && setSubmitted(true)}
                disabled={!allAnswered}
                className={`inline-flex items-center gap-3 px-10 py-5 font-bold text-base transition-colors motion-reduce:transition-none ${
                  allAnswered
                    ? "bg-black text-white hover:bg-gray-800"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                Get My Score &rarr;
              </button>
              {!allAnswered && (
                <p className="text-base text-gray-400 mt-2">
                  Answer all {questions.length} questions to see your score
                </p>
              )}
            </div>
          </div>
        </section>
      ) : (
        <section className="px-6 lg:px-12 py-8" aria-label="Results">
          <div className="max-w-3xl mx-auto">
            {(() => {
              const { grade, label, desc } = getGrade(totalScore, maxScore);
              return (
                <Animate animation="fade-up">
                  <div className="bg-black text-white p-8 text-center mb-8">
                    <div className="font-[family-name:var(--font-display)] text-6xl font-extrabold">{grade}</div>
                    <div className="text-lg font-bold mt-2">{label}</div>
                    <div className="text-base text-gray-400 mt-2">{totalScore} / {maxScore} points</div>
                    <div className="w-full bg-white/20 h-3 mt-6">
                      <div className="bg-white h-3 transition-all motion-reduce:transition-none" style={{ width: `${(totalScore / maxScore) * 100}%` }} />
                    </div>
                    <p className="text-base text-gray-300 mt-4">{desc}</p>
                  </div>
                </Animate>
              );
            })()}

            <Animate animation="fade-up">
              <div className="space-y-4 mb-12">
                <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black">Your Results Breakdown</h2>
                {questions.map((q) => {
                  const score = answers[q.id] ?? 0;
                  return (
                    <div key={q.id} className="flex items-center gap-4 py-3 border-b border-gray-200">
                      <div className={`w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold text-base ${score >= 7 ? "bg-black text-white" : score >= 4 ? "bg-gray-300 text-black" : "bg-gray-100 text-gray-400"}`}>
                        {score}
                      </div>
                      <span className="text-base text-gray-600 flex-1">{q.text}</span>
                    </div>
                  );
                })}
              </div>
            </Animate>

            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => { setAnswers({}); setSubmitted(false); }}
                className="inline-flex items-center gap-3 border-2 border-black text-black px-8 py-4 font-bold text-base hover:bg-black hover:text-white transition-colors motion-reduce:transition-none"
              >
                Retake Quiz
              </button>
            </div>
          </div>
        </section>
      )}

      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center mt-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
            Want a Professional Assessment?
          </h2>
          <p className="text-lg text-gray-400 mt-4 mb-8">
            Our team can provide a comprehensive website audit with specific, actionable recommendations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none">
              Request a Free Audit &rarr;
            </Link>
            <Link href="/services/website-development" className="inline-flex items-center gap-3 border-2 border-white text-white px-10 py-5 font-bold text-base hover:bg-white hover:text-black transition-colors motion-reduce:transition-none">
              Website Services
            </Link>
          </div>
        </div>
      </section>
          <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Website Grader — Score Your Site Across 7 Key Areas",
          description: "Grade your website performance across speed, mobile, SEO, content, UX, trust, and conversions with this free tool. See exactly where you stand and what to fix first.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />
    </article>
  );
}
