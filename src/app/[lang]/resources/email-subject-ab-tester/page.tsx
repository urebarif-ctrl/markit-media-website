"use client";

import { useState } from "react";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";

const powerWords = [
  "free", "new", "proven", "secret", "exclusive", "limited", "instant", "guaranteed",
  "discover", "unlock", "save", "boost", "ultimate", "essential", "breakthrough",
  "easy", "fast", "now", "today", "hurry", "last chance", "don't miss", "alert",
  "urgent", "important", "announcing", "introducing", "finally", "revealed", "insider",
  "premium", "bonus", "deal", "offer", "win", "transform", "hack", "tips", "mistakes",
  "surprising", "shocking", "powerful", "remarkable", "incredible", "amazing",
];

const urgencyWords = [
  "now", "today", "hurry", "limited", "expires", "deadline", "last chance",
  "don't miss", "ending soon", "final", "urgent", "immediately", "tonight",
  "this week", "act fast", "while supplies last", "only", "hours left",
];

const personalisationTokens = ["you", "your", "you're", "yours"];

const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;

interface Score {
  length: number;
  powerWords: number;
  personalisation: number;
  urgency: number;
  clarity: number;
  total: number;
  tips: string[];
  foundPower: string[];
  foundUrgency: string[];
}

function scoreSubject(subject: string): Score {
  const trimmed = subject.trim();
  const lower = trimmed.toLowerCase();
  const words = lower.split(/\s+/).filter(Boolean);
  const tips: string[] = [];

  let lengthScore = 0;
  const charCount = trimmed.length;
  if (charCount >= 30 && charCount <= 50) lengthScore = 25;
  else if (charCount >= 20 && charCount <= 60) lengthScore = 18;
  else if (charCount > 60 && charCount <= 80) lengthScore = 10;
  else if (charCount > 0) lengthScore = 5;

  if (charCount > 60) tips.push("Shorten to under 60 characters to avoid truncation on mobile.");
  if (charCount < 20 && charCount > 0) tips.push("Subject is very short. Add more context to improve open rates.");

  const foundPower = powerWords.filter((pw) => lower.includes(pw));
  let powerScore = Math.min(foundPower.length * 8, 20);
  if (foundPower.length === 0 && charCount > 0) {
    tips.push("Add a power word (e.g. \"proven\", \"exclusive\", \"free\") to grab attention.");
    powerScore = 0;
  }

  const hasPersonal = personalisationTokens.some((t) => words.includes(t));
  let personalScore = hasPersonal ? 20 : 0;
  if (!hasPersonal && charCount > 0) tips.push("Include \"you\" or \"your\" to make it feel personal.");

  const foundUrg = urgencyWords.filter((uw) => lower.includes(uw));
  let urgencyScore = Math.min(foundUrg.length * 10, 20);
  if (foundUrg.length === 0 && charCount > 0) tips.push("Add urgency (e.g. \"today\", \"limited\", \"don't miss\") to drive action.");

  let clarityScore = 0;
  if (charCount > 0) {
    clarityScore = 10;
    if (words.length >= 3 && words.length <= 10) clarityScore += 5;
    if (!emojiRegex.test(trimmed)) clarityScore += 2;
    else tips.push("Emojis can help, but some email clients may not render them.");
    if (trimmed.endsWith("?")) clarityScore += 3;
    const capsWords = words.filter((w) => w === w.toUpperCase() && w.length > 1);
    if (capsWords.length > 2) {
      clarityScore -= 5;
      tips.push("Reduce ALL CAPS words. They can trigger spam filters.");
    }
  }
  clarityScore = Math.max(0, Math.min(clarityScore, 20));

  if (trimmed.includes("!") && (trimmed.match(/!/g) || []).length > 1) {
    tips.push("Multiple exclamation marks can hurt deliverability.");
  }

  const total = lengthScore + powerScore + personalScore + urgencyScore + clarityScore;

  return {
    length: lengthScore,
    powerWords: powerScore,
    personalisation: personalScore,
    urgency: urgencyScore,
    clarity: clarityScore,
    total,
    tips,
    foundPower: foundPower,
    foundUrgency: foundUrg,
  };
}

function ScoreBar({ label, value, max }: { label: string; value: number; max: number }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="flex items-center gap-4 text-base">
      <span className="w-36 text-gray-600 shrink-0">{label}</span>
      <div className="flex-1 h-5 bg-gray-100 relative">
        <div
          className="h-5 bg-black transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-14 text-right font-bold text-black">{value}/{max}</span>
    </div>
  );
}

export default function EmailSubjectABTesterPage() {
  const [subjectA, setSubjectA] = useState("");
  const [subjectB, setSubjectB] = useState("");
  const [showResults, setShowResults] = useState(false);

  const scoreA = scoreSubject(subjectA);
  const scoreB = scoreSubject(subjectB);

  const winner =
    scoreA.total > scoreB.total ? "A" : scoreB.total > scoreA.total ? "B" : "Tie";

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
          <span className="text-black">Email Subject Line A/B Tester</span>
        </nav>

        <header className="mb-12">
          <p className="text-base font-semibold tracking-widest uppercase text-gray-400 mb-3">
            Free Email Tool
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1]">
            Email Subject Line A/B Tester
          </h1>
          <p className="text-lg text-gray-500 mt-4 max-w-2xl">
            Enter two subject lines and see which one scores higher on length, power words,
            personalisation, urgency, and clarity.
          </p>
        </header>

        {!showResults ? (
          <div className="space-y-8">
            <section className="border border-gray-200 p-6 lg:p-8 space-y-6">
              <div>
                <label className="block text-base font-bold text-black mb-2">
                  Subject Line A
                </label>
                <input
                  type="text"
                  value={subjectA}
                  onChange={(e) => setSubjectA(e.target.value)}
                  placeholder="e.g. Your exclusive offer expires tonight"
                  className="w-full border border-gray-300 px-4 py-3 text-base focus-visible:outline-none focus-visible:border-black"
                  maxLength={200}
                />
                <span className="text-base text-gray-400 mt-1 block">
                  {subjectA.length} characters
                </span>
              </div>
              <div>
                <label className="block text-base font-bold text-black mb-2">
                  Subject Line B
                </label>
                <input
                  type="text"
                  value={subjectB}
                  onChange={(e) => setSubjectB(e.target.value)}
                  placeholder="e.g. Don't miss our biggest sale of the year"
                  className="w-full border border-gray-300 px-4 py-3 text-base focus-visible:outline-none focus-visible:border-black"
                  maxLength={200}
                />
                <span className="text-base text-gray-400 mt-1 block">
                  {subjectB.length} characters
                </span>
              </div>
              <button
                onClick={() => setShowResults(true)}
                disabled={!subjectA.trim() || !subjectB.trim()}
                className="bg-black text-white px-8 py-4 text-base font-bold hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                Compare Subject Lines &rarr;
              </button>
            </section>
          </div>
        ) : (
          <div className="space-y-8">
            <section className="border border-gray-200 p-8 text-center">
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-black mb-2">
                {winner === "Tie"
                  ? "It's a Tie!"
                  : `Subject Line ${winner} Wins`}
              </h2>
              <p className="text-lg text-gray-500">
                {winner === "A" && `"${subjectA.trim()}" scored ${scoreA.total} vs ${scoreB.total}`}
                {winner === "B" && `"${subjectB.trim()}" scored ${scoreB.total} vs ${scoreA.total}`}
                {winner === "Tie" && `Both scored ${scoreA.total} out of 105`}
              </p>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[
                { label: "A", subject: subjectA, score: scoreA },
                { label: "B", subject: subjectB, score: scoreB },
              ].map(({ label, subject, score }) => (
                <section
                  key={label}
                  className={`border p-6 lg:p-8 ${
                    winner === label
                      ? "border-black bg-gray-50"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-black">
                      Subject {label}
                      {winner === label && (
                        <span className="ml-2 text-base bg-black text-white px-2 py-0.5">
                          Winner
                        </span>
                      )}
                    </h3>
                    <span className="text-2xl font-extrabold text-black">{score.total}/105</span>
                  </div>
                  <p className="text-base text-gray-600 mb-6 break-words">
                    &ldquo;{subject.trim()}&rdquo;
                  </p>
                  <div className="space-y-3 mb-6">
                    <ScoreBar label="Length" value={score.length} max={25} />
                    <ScoreBar label="Power Words" value={score.powerWords} max={20} />
                    <ScoreBar label="Personalisation" value={score.personalisation} max={20} />
                    <ScoreBar label="Urgency" value={score.urgency} max={20} />
                    <ScoreBar label="Clarity" value={score.clarity} max={20} />
                  </div>
                  {score.foundPower.length > 0 && (
                    <p className="text-base text-gray-500 mb-2">
                      Power words found:{" "}
                      {score.foundPower.map((w) => (
                        <span key={w} className="inline-block bg-gray-100 text-black px-2 py-0.5 mr-1 mb-1 font-medium">
                          {w}
                        </span>
                      ))}
                    </p>
                  )}
                  {score.tips.length > 0 && (
                    <div className="mt-4 border-t border-gray-200 pt-4">
                      <p className="text-base font-bold text-black mb-2">Tips</p>
                      <ul className="space-y-1">
                        {score.tips.map((tip, i) => (
                          <li key={i} className="text-base text-gray-600">
                            &bull; {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </section>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setShowResults(false)}
                className="border border-gray-300 text-gray-700 px-6 py-3 text-base font-medium hover:border-black hover:text-black transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                Edit Subject Lines
              </button>
              <button
                onClick={() => {
                  setSubjectA("");
                  setSubjectB("");
                  setShowResults(false);
                }}
                className="border border-gray-300 text-gray-700 px-6 py-3 text-base font-medium hover:border-black hover:text-black transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                Start Over
              </button>
            </div>

            <section className="bg-black text-white p-8 lg:p-12 text-center">
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold mb-4">
                Want Higher Open Rates?
              </h2>
              <p className="text-lg text-gray-300 mb-8 max-w-xl mx-auto">
                Our email marketing team writes, tests, and optimises campaigns that get opened and
                drive conversions.
              </p>
              <Link
                href="/contact"
                className="inline-block bg-white text-black px-10 py-5 text-base font-bold hover:bg-gray-100 transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              >
                Improve Your Email Marketing &rarr;
              </Link>
            </section>
          </div>
        )}
      </div>
          
      {/* Related Tools */}
      <section className="px-6 lg:px-12 py-12" aria-label="Related tools">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">Related Tools</h2>
          <div className="flex flex-wrap gap-3">
                <Link href="/resources/email-subject-tester" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Email Subject Tester</Link>
                <Link href="/resources/email-roi-calculator" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Email ROI Calculator</Link>
                <Link href="/resources/email-campaign-planner" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Email Campaign Planner</Link>
                <Link href="/resources/email-sequence-planner" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Email Sequence Planner</Link>
          </div>
        </div>
      </section>
<JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Email Subject Line A/B Tester",
          description: "Compare two email subject lines side-by-side. Get scored analysis on length, power words, personalisation, urgency, and clarity to pick the winner.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />
    </article>
  );
}
