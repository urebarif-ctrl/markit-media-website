"use client";

import { useState } from "react";
import Link from "next/link";
import { Animate } from "@/components/animate";
import { SectionLabel } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";

interface Recommendation {
  title: string;
  desc: string;
  href: string;
  priority: "high" | "medium";
}

const questions = [
  {
    id: "goal",
    question: "What is your primary marketing goal?",
    options: [
      { label: "Generate more leads or sales", value: "leads" },
      { label: "Build brand awareness", value: "awareness" },
      { label: "Improve online visibility (SEO)", value: "seo" },
      { label: "Launch or redesign a website", value: "website" },
      { label: "Create content and engage audiences", value: "content" },
    ],
  },
  {
    id: "timeline",
    question: "When do you need results?",
    options: [
      { label: "As soon as possible (weeks)", value: "fast" },
      { label: "Within 3-6 months", value: "medium" },
      { label: "Long-term growth (6+ months)", value: "long" },
    ],
  },
  {
    id: "channels",
    question: "Which channels are most important to you?",
    options: [
      { label: "Google Search (organic or paid)", value: "google" },
      { label: "Social media (Instagram, TikTok, LinkedIn, etc.)", value: "social" },
      { label: "Email marketing", value: "email" },
      { label: "My own website", value: "website" },
      { label: "Video content", value: "video" },
      { label: "Not sure — recommend for me", value: "unsure" },
    ],
  },
  {
    id: "budget",
    question: "What is your approximate monthly marketing budget?",
    options: [
      { label: "Under $2,000/month", value: "small" },
      { label: "$2,000 — $10,000/month", value: "medium" },
      { label: "$10,000+/month", value: "large" },
      { label: "I have a project budget (one-time)", value: "project" },
    ],
  },
];

function getRecommendations(answers: Record<string, string>): Recommendation[] {
  const recs: Recommendation[] = [];
  const { goal, timeline, channels } = answers;

  if (goal === "leads" || timeline === "fast") {
    recs.push({ title: "Performance Marketing", desc: "Google Ads, Meta Ads, and PPC campaigns for immediate lead generation.", href: "/services/performance-marketing", priority: "high" });
  }
  if (goal === "seo" || timeline === "long" || channels === "google") {
    recs.push({ title: "SEO", desc: "Organic search optimization for sustainable traffic growth.", href: "/services/seo", priority: goal === "seo" ? "high" : "medium" });
  }
  if (goal === "awareness" || channels === "social") {
    recs.push({ title: "Social Media Marketing", desc: "Build your brand presence across social platforms.", href: "/services/social-media", priority: goal === "awareness" ? "high" : "medium" });
  }
  if (goal === "website" || channels === "website") {
    recs.push({ title: "Website Development", desc: "High-performance websites built for conversions.", href: "/services/website-development", priority: "high" });
  }
  if (goal === "content" || channels === "email") {
    recs.push({ title: "Content Marketing", desc: "Strategic content that attracts, engages, and converts.", href: "/services/content-marketing", priority: goal === "content" ? "high" : "medium" });
  }
  if (channels === "email") {
    recs.push({ title: "Email Marketing", desc: "Automated campaigns and list management.", href: "/services/email-marketing", priority: "high" });
  }
  if (channels === "video") {
    recs.push({ title: "Video Production", desc: "Professional video content for marketing and social.", href: "/services/video-production", priority: "high" });
  }
  if (goal === "awareness") {
    recs.push({ title: "Branding & Design", desc: "Build a visual identity that stands out.", href: "/services/branding", priority: "medium" });
  }
  if (channels === "unsure") {
    recs.push({ title: "Digital Marketing Strategy", desc: "Let us audit your current state and recommend the best channels.", href: "/services/digital-marketing", priority: "high" });
  }

  const seen = new Set<string>();
  return recs.filter((r) => {
    if (seen.has(r.href)) return false;
    seen.add(r.href);
    return true;
  }).sort((a, b) => (a.priority === "high" ? -1 : 1) - (b.priority === "high" ? -1 : 1));
}

export default function ServiceFinderPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  function handleSelect(questionId: string, value: string) {
    const updated = { ...answers, [questionId]: value };
    setAnswers(updated);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setShowResults(true);
    }
  }

  function reset() {
    setStep(0);
    setAnswers({});
    setShowResults(false);
  }

  const recommendations = showResults ? getRecommendations(answers) : [];

  return (
    <article>
      <title>Service Finder Quiz — Find the Right Marketing Services | Markit Media</title>
      <meta name="description" content="Answer a few quick questions and get personalised marketing service recommendations based on your industry, goals, and budget." />
      <link rel="canonical" href="https://themarkitmedia.com/en/services/finder" />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: "Service Finder" }]} />

      <section aria-label="Service Finder" className="px-6 lg:px-12 pt-24 pb-20">
        <div className="max-w-3xl mx-auto">
          {!showResults ? (
            <>
              <Animate animation="fade-up">
                <SectionLabel>Service Finder</SectionLabel>
                <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
                  Find the Right Services for Your Business
                </h1>
                <p className="text-lg text-gray-500 leading-relaxed mt-4">
                  Answer a few quick questions and we&apos;ll recommend the best marketing services for your goals.
                </p>
              </Animate>

              <div className="mt-12">
                <div className="flex gap-2 mb-8">
                  {questions.map((_, i) => (
                    <div key={i} className={`h-1 flex-1 transition-colors motion-reduce:transition-none ${i <= step ? "bg-black" : "bg-gray-200"}`} />
                  ))}
                </div>

                <Animate key={step} animation="fade-up">
                  <p className="text-base text-gray-400 mb-2">Question {step + 1} of {questions.length}</p>
                  <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-8">
                    {questions[step].question}
                  </h2>
                  <div className="space-y-3">
                    {questions[step].options.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => handleSelect(questions[step].id, opt.value)}
                        className="w-full text-left p-5 border border-gray-200 hover:border-black transition-colors motion-reduce:transition-none text-base font-medium text-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </Animate>

                {step > 0 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="mt-6 text-base text-gray-500 hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                  >
                    &larr; Previous question
                  </button>
                )}
              </div>
            </>
          ) : (
            <>
              <Animate animation="fade-up">
                <SectionLabel>Your Recommendations</SectionLabel>
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
                  Services We Recommend
                </h2>
                <p className="text-lg text-gray-500 leading-relaxed mt-4">
                  Based on your answers, here are the services that would work best for your business.
                </p>
              </Animate>

              <div className="mt-12 space-y-4">
                {recommendations.map((rec, i) => (
                  <Animate key={rec.href} animation="fade-up" delay={i * 80}>
                    <Link
                      href={rec.href}
                      className="group flex items-start gap-6 p-6 border border-gray-200 hover:border-black/30 transition-all motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h2 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black group-hover:underline">
                            {rec.title}
                          </h2>
                          {rec.priority === "high" && (
                            <span className="text-base font-bold text-black bg-gray-100 px-3 py-1">Top Pick</span>
                          )}
                        </div>
                        <p className="text-base text-gray-500">{rec.desc}</p>
                      </div>
                      <span className="text-xl text-gray-400 group-hover:text-black transition-colors motion-reduce:transition-none flex-shrink-0" aria-hidden="true">&rarr;</span>
                    </Link>
                  </Animate>
                ))}
              </div>

              <Animate animation="fade-up" delay={400}>
                <div className="mt-12 flex flex-wrap gap-4">
                  <Link href="/contact" className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 font-bold text-base hover:bg-gray-800 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                    Get a Free Consultation &rarr;
                  </Link>
                  <button
                    onClick={reset}
                    className="inline-flex items-center gap-3 border-2 border-black text-black px-10 py-5 font-bold text-base hover:bg-black hover:text-white transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                  >
                    Start Over
                  </button>
                </div>
              </Animate>
            </>
          )}
        </div>
      </section>
    </article>
  );
}
