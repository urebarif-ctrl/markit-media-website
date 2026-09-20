"use client";

import { useState } from "react";
import Link from "next/link";
import { Animate } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";

interface Question {
  id: string;
  question: string;
  options: { label: string; score: number; tip: string }[];
}

const questions: Question[] = [
  {
    id: "hosting",
    question: "What type of hosting do you use?",
    options: [
      { label: "Shared hosting", score: 20, tip: "Shared hosting is the most affordable but slowest option. Consider upgrading to VPS or managed hosting." },
      { label: "VPS or cloud hosting", score: 60, tip: "VPS and cloud hosting offer good performance. Make sure your server is in the same region as your audience." },
      { label: "Managed WordPress or Shopify", score: 70, tip: "Managed platforms handle caching and optimization automatically, but plugins can still slow you down." },
      { label: "CDN-served / static site (Vercel, Netlify)", score: 90, tip: "Edge-deployed static sites deliver the best performance. You are on the right path." },
      { label: "I do not know", score: 40, tip: "Check with your hosting provider. Your hosting type has the biggest impact on speed." },
    ],
  },
  {
    id: "images",
    question: "Are your images optimized?",
    options: [
      { label: "No, we upload images as-is", score: 15, tip: "Unoptimized images are the #1 cause of slow pages. Use WebP format, lazy loading, and proper sizing." },
      { label: "We resize but do not compress", score: 40, tip: "Compression can reduce file sizes by 60-80% with no visible quality loss. Use tools like TinyPNG or Squoosh." },
      { label: "We compress and resize images", score: 70, tip: "Good. Make sure you also use next-gen formats (WebP) and responsive srcset for different screen sizes." },
      { label: "We use next-gen formats with lazy loading", score: 90, tip: "Excellent image optimization. You are following best practices." },
    ],
  },
  {
    id: "plugins",
    question: "How many third-party scripts or plugins does your site load?",
    options: [
      { label: "20 or more", score: 10, tip: "Every plugin adds JavaScript and CSS that slows page load. Audit and remove unused plugins immediately." },
      { label: "10 to 19", score: 35, tip: "This is above average. Review each plugin and remove anything not essential to core functionality." },
      { label: "5 to 9", score: 60, tip: "A reasonable number. Check that none of them are loading on every page when they are only needed on specific pages." },
      { label: "Less than 5", score: 85, tip: "Minimal plugin usage keeps your site lean. Good practice." },
    ],
  },
  {
    id: "caching",
    question: "Do you have caching enabled?",
    options: [
      { label: "No caching at all", score: 15, tip: "Caching is one of the easiest and most impactful speed improvements. Enable browser caching and server-side caching." },
      { label: "Browser caching only", score: 50, tip: "Add server-side caching (page caching, object caching) for faster first loads for all visitors." },
      { label: "Browser and server caching", score: 75, tip: "Good foundation. Consider adding a CDN for even faster global delivery." },
      { label: "Full caching stack with CDN", score: 95, tip: "Excellent. Your caching strategy is comprehensive." },
    ],
  },
  {
    id: "mobile",
    question: "Is your website mobile-optimized?",
    options: [
      { label: "Not mobile-friendly", score: 10, tip: "Over 60% of web traffic is mobile. A non-mobile site loses rankings and visitors. This should be your top priority." },
      { label: "Responsive but not optimized for speed", score: 40, tip: "Responsive layout is good, but mobile speed matters. Optimize touch targets, reduce JavaScript, and test on real devices." },
      { label: "Responsive with mobile speed optimizations", score: 75, tip: "Good. Make sure you are testing with Google's mobile speed test regularly." },
      { label: "Mobile-first design with AMP or similar", score: 90, tip: "Strong mobile performance. This gives you a competitive edge in mobile search results." },
    ],
  },
  {
    id: "fonts",
    question: "How do you handle web fonts?",
    options: [
      { label: "Multiple Google Fonts loaded on every page", score: 25, tip: "Each font family adds a network request. Limit to 2 families max and use font-display: swap." },
      { label: "1-2 fonts from Google Fonts", score: 60, tip: "Good. Consider self-hosting your fonts for faster loading and better privacy." },
      { label: "Self-hosted fonts with font-display swap", score: 85, tip: "Best practice. Self-hosted fonts eliminate third-party requests." },
      { label: "System fonts only", score: 95, tip: "The fastest option. No font loading delay at all." },
    ],
  },
  {
    id: "javascript",
    question: "How much JavaScript does your site load?",
    options: [
      { label: "Heavy (2MB+ of JavaScript)", score: 10, tip: "Excessive JavaScript is the biggest performance killer. Audit and remove unused code. Consider lazy loading." },
      { label: "Moderate (500KB to 2MB)", score: 40, tip: "There is room for improvement. Use code splitting and tree shaking to reduce bundle size." },
      { label: "Light (under 500KB)", score: 75, tip: "Lean JavaScript is great for performance. Keep monitoring as you add features." },
      { label: "I do not know", score: 30, tip: "Check your bundle size in Chrome DevTools or WebPageTest. JavaScript size is a key performance metric." },
    ],
  },
  {
    id: "monitoring",
    question: "Do you monitor your site speed?",
    options: [
      { label: "Never checked", score: 10, tip: "Start with Google PageSpeed Insights. Run it monthly at minimum." },
      { label: "Checked once or twice", score: 30, tip: "Speed monitoring should be ongoing. Set up regular checks and alerts for performance regressions." },
      { label: "Check monthly", score: 65, tip: "Good cadence. Consider setting up automated monitoring to catch issues faster." },
      { label: "Continuous monitoring with alerts", score: 90, tip: "Excellent. Proactive monitoring catches problems before they affect users." },
    ],
  },
];

export default function SpeedTestPage() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (questionId: string, score: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: score }));
  };

  const answered = Object.keys(answers).length;
  const total = questions.length;
  const allAnswered = answered === total;

  const avgScore = allAnswered
    ? Math.round(Object.values(answers).reduce((a, b) => a + b, 0) / total)
    : 0;

  let grade = "Needs Work";
  if (avgScore >= 80) grade = "Excellent";
  else if (avgScore >= 60) grade = "Good";
  else if (avgScore >= 40) grade = "Average";

  return (
    <article>
      <section className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Website Speed Assessment
            </h1>
            <SectionDesc>
              Answer 8 questions about your website and get an instant speed score with specific recommendations for improvement.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 pb-4">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex-1 bg-gray-100 h-2">
                <div
                  className="bg-black h-2 transition-all"
                  style={{ width: `${(answered / total) * 100}%` }}
                />
              </div>
              <span className="text-base font-bold text-black">{answered}/{total}</span>
            </div>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 pb-12">
        <div className="max-w-3xl mx-auto space-y-8">
          {questions.map((q, qi) => (
            <Animate key={q.id} animation="fade-up" delay={qi * 40}>
              <div className="border border-gray-200 p-6">
                <h2 className="text-base font-bold text-black mb-4">
                  {qi + 1}. {q.question}
                </h2>
                <div className="space-y-2">
                  {q.options.map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => handleAnswer(q.id, opt.score)}
                      className={`w-full text-left px-4 py-3 text-base transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                        answers[q.id] === opt.score
                          ? "bg-black text-white"
                          : "border border-gray-200 text-gray-600 hover:border-black"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                {answers[q.id] !== undefined && (
                  <div className="mt-3 p-3 bg-gray-50 text-base text-gray-500">
                    {q.options.find((o) => o.score === answers[q.id])?.tip}
                  </div>
                )}
              </div>
            </Animate>
          ))}

          {allAnswered && !showResults && (
            <Animate animation="fade-up">
              <button
                onClick={() => setShowResults(true)}
                className="w-full bg-black text-white py-4 text-base font-bold hover:bg-gray-900 transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                See Your Results
              </button>
            </Animate>
          )}
        </div>
      </section>

      {showResults && (
        <section className="px-6 lg:px-12 pb-16">
          <div className="max-w-3xl mx-auto">
            <Animate animation="fade-up">
              <div className="border border-gray-200 overflow-hidden">
                <div className="bg-black text-white p-6 flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-base">Speed Score</p>
                    <p className="font-[family-name:var(--font-display)] text-4xl font-extrabold">{avgScore}/100</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 text-base">Grade</p>
                    <p className="font-[family-name:var(--font-display)] text-2xl font-extrabold">{grade}</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-black mb-4">Your Priority Actions</h3>
                  <div className="space-y-3">
                    {questions
                      .filter((q) => (answers[q.id] || 0) < 50)
                      .map((q) => {
                        const opt = q.options.find((o) => o.score === answers[q.id]);
                        return (
                          <div key={q.id} className="p-4 bg-gray-50 border-l-4 border-black">
                            <p className="text-base font-bold text-black">{q.question}</p>
                            <p className="text-base text-gray-500 mt-1">{opt?.tip}</p>
                          </div>
                        );
                      })}
                    {questions.filter((q) => (answers[q.id] || 0) < 50).length === 0 && (
                      <p className="text-base text-gray-500">Great job. Your site appears well-optimized across all areas we checked.</p>
                    )}
                  </div>
                </div>
              </div>
            </Animate>
          </div>
        </section>
      )}

      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Need Professional Speed Optimization?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Our development team can audit your website and implement optimizations that improve Core Web Vitals and page speed.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
              Get a Speed Audit &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    </article>
  );
}
