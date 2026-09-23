"use client";

import { useState } from "react";
import Link from "next/link";
import { Animate } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

const spamWords = [
  "free", "guaranteed", "no obligation", "winner", "congratulations", "act now",
  "limited time", "urgent", "click here", "buy now", "order now", "subscribe",
  "no cost", "risk free", "100%", "amazing", "incredible", "unbelievable",
  "miracle", "cash", "earn money", "make money", "double your", "billion",
  "million", "$$", "!!!",
];

const powerWords = [
  "proven", "exclusive", "insider", "secret", "strategy", "framework",
  "essential", "guide", "how to", "tips", "mistakes", "boost",
  "increase", "improve", "transform", "master", "ultimate", "complete",
  "step-by-step", "actionable", "practical", "data-driven",
];

const personalWords = ["you", "your", "you're"];

interface Analysis {
  score: number;
  grade: string;
  checks: { label: string; passed: boolean; detail: string }[];
  preview: string;
}

function analyze(subject: string): Analysis {
  const lower = subject.toLowerCase();
  const words = subject.split(/\s+/).filter(Boolean);
  const checks: { label: string; passed: boolean; detail: string }[] = [];
  let score = 50;

  // Length check
  const len = subject.length;
  if (len >= 30 && len <= 50) {
    checks.push({ label: "Length", passed: true, detail: `${len} characters — ideal range (30-50)` });
    score += 10;
  } else if (len > 50 && len <= 60) {
    checks.push({ label: "Length", passed: true, detail: `${len} characters — good but may truncate on mobile` });
    score += 5;
  } else if (len < 30) {
    checks.push({ label: "Length", passed: false, detail: `${len} characters — too short, add more context` });
    score -= 5;
  } else {
    checks.push({ label: "Length", passed: false, detail: `${len} characters — will be cut off in most inboxes (aim for under 50)` });
    score -= 10;
  }

  // Word count
  if (words.length >= 4 && words.length <= 9) {
    checks.push({ label: "Word Count", passed: true, detail: `${words.length} words — optimal range` });
    score += 5;
  } else {
    checks.push({ label: "Word Count", passed: false, detail: `${words.length} words — aim for 4-9 words` });
    score -= 5;
  }

  // Spam words
  const foundSpam = spamWords.filter((w) => lower.includes(w));
  if (foundSpam.length === 0) {
    checks.push({ label: "Spam Trigger Words", passed: true, detail: "No spam trigger words detected" });
    score += 10;
  } else {
    checks.push({ label: "Spam Trigger Words", passed: false, detail: `Found: ${foundSpam.join(", ")}. May trigger spam filters.` });
    score -= foundSpam.length * 5;
  }

  // ALL CAPS words
  const capsWords = words.filter((w) => w.length > 2 && w === w.toUpperCase() && /[A-Z]/.test(w));
  if (capsWords.length === 0) {
    checks.push({ label: "Capitalization", passed: true, detail: "No ALL CAPS words — good" });
    score += 5;
  } else {
    checks.push({ label: "Capitalization", passed: false, detail: `ALL CAPS words: ${capsWords.join(", ")}. Can trigger spam filters and reduce trust.` });
    score -= capsWords.length * 5;
  }

  // Punctuation
  const exclamations = (subject.match(/!/g) || []).length;
  if (exclamations === 0) {
    checks.push({ label: "Exclamation Marks", passed: true, detail: "No exclamation marks — professional" });
    score += 5;
  } else if (exclamations === 1) {
    checks.push({ label: "Exclamation Marks", passed: true, detail: "One exclamation mark — acceptable" });
  } else {
    checks.push({ label: "Exclamation Marks", passed: false, detail: `${exclamations} exclamation marks — reduce to 0-1 for better deliverability` });
    score -= exclamations * 3;
  }

  // Power words
  const foundPower = powerWords.filter((w) => lower.includes(w));
  if (foundPower.length > 0) {
    checks.push({ label: "Power Words", passed: true, detail: `Contains: ${foundPower.join(", ")}. These boost engagement.` });
    score += foundPower.length * 3;
  } else {
    checks.push({ label: "Power Words", passed: false, detail: "No power words detected. Add words like \"proven\", \"guide\", or \"essential\" to boost opens." });
    score -= 5;
  }

  // Personalization
  const foundPersonal = personalWords.filter((w) => lower.includes(w));
  if (foundPersonal.length > 0) {
    checks.push({ label: "Personalization", passed: true, detail: "Uses personal language — increases open rates" });
    score += 5;
  } else {
    checks.push({ label: "Personalization", passed: false, detail: "Consider adding \"you\" or \"your\" to make it more personal" });
  }

  // Numbers
  if (/\d/.test(subject)) {
    checks.push({ label: "Numbers", passed: true, detail: "Contains numbers — subject lines with numbers get higher open rates" });
    score += 5;
  } else {
    checks.push({ label: "Numbers", passed: false, detail: "No numbers. Adding a number (e.g., \"5 tips\", \"30%\") can improve open rates." });
  }

  // Question
  if (subject.includes("?")) {
    checks.push({ label: "Question Format", passed: true, detail: "Question format — creates curiosity and engagement" });
    score += 5;
  }

  // Emoji
  if (/[\u{1F300}-\u{1FAF8}]/u.test(subject)) {
    checks.push({ label: "Emoji", passed: true, detail: "Contains emoji — can increase open rates but use sparingly" });
    score += 2;
  }

  score = Math.max(0, Math.min(100, score));
  let grade = "Needs Work";
  if (score >= 85) grade = "Excellent";
  else if (score >= 70) grade = "Good";
  else if (score >= 50) grade = "Average";

  const preview = len > 40 ? subject.slice(0, 40) + "..." : subject;

  return { score, grade, checks, preview };
}

export default function EmailSubjectTesterPage() {
  const [subject, setSubject] = useState("");
  const [result, setResult] = useState<Analysis | null>(null);

  const test = () => {
    if (subject.trim()) {
      setResult(analyze(subject));
    }
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Email Subject Line Tester",
          description: "Free email subject line tester that analyzes and scores your subject lines for deliverability, engagement, and inbox placement.",
          url: "https://themarkitmedia.com/en/resources/email-subject-tester",
          applicationCategory: "Email Marketing Tool",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          provider: { "@type": "Organization", name: "Markit Media", url: "https://themarkitmedia.com" },
        }) }}
      />
      <nav className="px-6 lg:px-12 pt-8" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-base text-neutral-400">
          <li><Link href="/" className="hover:text-black transition-colors">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/resources" className="hover:text-black transition-colors">Resources</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-black" aria-current="page">Email Subject Line Tester</li>
        </ol>
      </nav>
      <section aria-label="Free Tool" className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Email Subject Line Tester
            </h1>
            <SectionDesc>
              Test your email subject lines for deliverability, engagement, and spam risk. Get an instant score with actionable feedback.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      <section aria-label="Content section" className="px-6 lg:px-12 pb-8">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <div className="space-y-4">
              <div>
                <label htmlFor="subject" className="block text-base font-bold text-black mb-2">
                  Enter your subject line
                </label>
                <input
                  id="subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && test()}
                  placeholder="e.g. 5 Proven Strategies to Boost Your Website Traffic"
                  className="w-full px-4 py-3 border border-gray-200 text-base focus-visible:border-black focus-visible:outline-none"
                />
              </div>
              <button
                onClick={test}
                className="bg-black text-white px-8 py-4 text-base font-bold hover:bg-gray-900 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                Test Subject Line
              </button>
            </div>
          </Animate>
        </div>
      </section>

      {result && (
        <section aria-label="Content section" className="px-6 lg:px-12 pb-12">
          <div className="max-w-3xl mx-auto">
            <Animate animation="fade-up">
              <div className="border border-gray-200 overflow-hidden">
                <div className="bg-black text-white p-6 flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-base">Score</p>
                    <p className="font-[family-name:var(--font-display)] text-4xl font-extrabold">{result.score}/100</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 text-base">Grade</p>
                    <p className="font-[family-name:var(--font-display)] text-2xl font-extrabold">{result.grade}</p>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-6 p-4 bg-gray-50 border border-gray-200">
                    <p className="text-base text-gray-400 mb-1">Inbox Preview</p>
                    <p className="text-base font-bold text-black">{result.preview}</p>
                  </div>

                  <h3 className="font-bold text-black mb-4">Detailed Analysis</h3>
                  <div className="space-y-3">
                    {result.checks.map((check, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 bg-gray-50">
                        <span className={`flex-shrink-0 w-6 h-6 flex items-center justify-center text-base font-bold ${check.passed ? "text-black" : "text-gray-400"}`}>
                          {check.passed ? "✓" : "✗"}
                        </span>
                        <div>
                          <p className="text-base font-bold text-black">{check.label}</p>
                          <p className="text-base text-gray-500">{check.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Animate>
          </div>
        </section>
      )}

      <section aria-label="Keep it under 50 characters" className="px-6 lg:px-12 py-16">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">
              Email Subject Line Best Practices
            </h2>
            <div className="space-y-6 text-base text-gray-500 leading-relaxed">
              <div>
                <h3 className="font-bold text-black mb-2">Keep it under 50 characters</h3>
                <p>Most email clients truncate subject lines on mobile at 30-40 characters. Front-load the most important information so it is visible even when cut off.</p>
              </div>
              <div>
                <h3 className="font-bold text-black mb-2">Avoid spam triggers</h3>
                <p>Words like &quot;free,&quot; &quot;guaranteed,&quot; &quot;act now,&quot; and excessive punctuation can trigger spam filters. Write naturally and avoid sales language in the subject.</p>
              </div>
              <div>
                <h3 className="font-bold text-black mb-2">Create curiosity or urgency</h3>
                <p>The best subject lines make the reader feel they will miss something if they do not open. Questions, numbers, and specific benefits all drive curiosity.</p>
              </div>
              <div>
                <h3 className="font-bold text-black mb-2">A/B test every send</h3>
                <p>Send two variants to a small portion of your list, then send the winner to the rest. Even small open rate differences compound over time.</p>
              </div>
            </div>
          </Animate>
        </div>
      </section>

      <section aria-label="Call to action" className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Need Help With Email Marketing?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Our email team handles strategy, copywriting, design, automation, and deliverability optimization.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
              Get Email Marketing Help &rarr;
            </Link>
          </Animate>
        </div>
      </section>
          
      {/* Related Tools */}
      <section className="px-6 lg:px-12 py-12" aria-label="Related tools">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">Related Tools</h2>
          <div className="flex flex-wrap gap-3">
                <Link href="/resources/email-roi-calculator" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Email ROI Calculator</Link>
                <Link href="/resources/email-campaign-planner" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Email Campaign Planner</Link>
                <Link href="/resources/email-sequence-planner" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Email Sequence Planner</Link>
                <Link href="/resources/email-deliverability" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Email Deliverability</Link>
          </div>
        </div>
      </section>
<JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Email Subject Line Tester — Score Lines for Opens & Deliverability",
          description: "Free email subject line tester that analyzes and scores your subject lines for deliverability, engagement, and inbox placement.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />
    
      <ToolCTA
        toolName="Email Subject Tester"
        services={[
          { title: "Digital Marketing", desc: "Email marketing integrated with your broader growth strategy.", href: "/services/digital-marketing" },
          { title: "Content Marketing", desc: "Compelling email content that nurtures leads into customers.", href: "/services/content-marketing" },
          { title: "Performance Marketing", desc: "Paid campaigns that fill your email funnel with qualified leads.", href: "/services/performance-marketing" },
        ]}
        relatedTools={[
          { title: "Email Roi Calculator", href: "/resources/email-roi-calculator" },
          { title: "Email Sequence Planner", href: "/resources/email-sequence-planner" },
          { title: "Email Subject Ab Tester", href: "/resources/email-subject-ab-tester" },
          { title: "Email Warmup Planner", href: "/resources/email-warmup-planner" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
