"use client";
import Link from "next/link";

import { useState } from "react";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

interface Criterion {
  id: string;
  category: "demographic" | "firmographic" | "behavioural";
  name: string;
  weight: number;
  options: { label: string; score: number }[];
}

const DEFAULT_CRITERIA: Criterion[] = [
  {
    id: "job_title",
    category: "demographic",
    name: "Job Title / Seniority",
    weight: 20,
    options: [
      { label: "C-Suite / VP", score: 100 },
      { label: "Director / Head", score: 80 },
      { label: "Manager", score: 60 },
      { label: "Senior Individual Contributor", score: 40 },
      { label: "Junior / Entry Level", score: 20 },
      { label: "Unknown", score: 10 },
    ],
  },
  {
    id: "department",
    category: "demographic",
    name: "Department",
    weight: 10,
    options: [
      { label: "Marketing", score: 100 },
      { label: "Sales", score: 80 },
      { label: "Operations", score: 60 },
      { label: "Engineering", score: 40 },
      { label: "Other", score: 20 },
    ],
  },
  {
    id: "company_size",
    category: "firmographic",
    name: "Company Size",
    weight: 15,
    options: [
      { label: "Enterprise (1000+)", score: 100 },
      { label: "Mid-Market (200-999)", score: 80 },
      { label: "SMB (50-199)", score: 60 },
      { label: "Small (10-49)", score: 40 },
      { label: "Micro (1-9)", score: 20 },
    ],
  },
  {
    id: "industry",
    category: "firmographic",
    name: "Industry Fit",
    weight: 15,
    options: [
      { label: "Exact target industry", score: 100 },
      { label: "Adjacent industry", score: 60 },
      { label: "Non-target industry", score: 20 },
    ],
  },
  {
    id: "budget",
    category: "firmographic",
    name: "Budget Authority",
    weight: 10,
    options: [
      { label: "Confirmed budget", score: 100 },
      { label: "Budget likely", score: 60 },
      { label: "Unknown budget", score: 30 },
      { label: "No budget", score: 0 },
    ],
  },
  {
    id: "website_visits",
    category: "behavioural",
    name: "Website Engagement",
    weight: 10,
    options: [
      { label: "5+ visits, viewed pricing", score: 100 },
      { label: "3-4 visits", score: 70 },
      { label: "1-2 visits", score: 40 },
      { label: "No visits", score: 0 },
    ],
  },
  {
    id: "content",
    category: "behavioural",
    name: "Content Engagement",
    weight: 10,
    options: [
      { label: "Downloaded gated content", score: 100 },
      { label: "Attended webinar", score: 80 },
      { label: "Read 3+ blog posts", score: 50 },
      { label: "Minimal engagement", score: 10 },
    ],
  },
  {
    id: "email",
    category: "behavioural",
    name: "Email Engagement",
    weight: 10,
    options: [
      { label: "Replied to email", score: 100 },
      { label: "Clicked multiple emails", score: 70 },
      { label: "Opened emails", score: 40 },
      { label: "Unsubscribed / no opens", score: 0 },
    ],
  },
];

const THRESHOLDS = {
  hot: 80,
  warm: 50,
  cold: 25,
};

function getGrade(score: number) {
  if (score >= THRESHOLDS.hot) return { label: "Hot Lead", color: "bg-black text-white" };
  if (score >= THRESHOLDS.warm) return { label: "Warm Lead", color: "bg-neutral-700 text-white" };
  if (score >= THRESHOLDS.cold) return { label: "Cold Lead", color: "bg-neutral-400 text-white" };
  return { label: "Unqualified", color: "bg-neutral-200 text-black" };
}



export default function LeadScoringCalculatorPage() {
  const [criteria] = useState<Criterion[]>(DEFAULT_CRITERIA);
  const [selections, setSelections] = useState<Record<string, number>>({});
  const [thresholds, setThresholds] = useState(THRESHOLDS);
  const [testLeads, setTestLeads] = useState<
    { name: string; selections: Record<string, number>; score: number }[]
  >([]);
  const [leadName, setLeadName] = useState("");

  function selectOption(criterionId: string, score: number) {
    setSelections((prev) => ({ ...prev, [criterionId]: score }));
  }

  function calculateScore(sels: Record<string, number>): number {
    let totalWeight = 0;
    let weightedScore = 0;
    criteria.forEach((c) => {
      totalWeight += c.weight;
      const selected = sels[c.id];
      if (selected !== undefined) {
        weightedScore += (selected / 100) * c.weight;
      }
    });
    return totalWeight > 0 ? Math.round((weightedScore / totalWeight) * 100) : 0;
  }

  const currentScore = calculateScore(selections);
  const grade = getGrade(currentScore);

  function handleTestLead() {
    const name = leadName.trim() || `Lead ${testLeads.length + 1}`;
    setTestLeads((prev) => [
      { name, selections: { ...selections }, score: currentScore },
      ...prev.slice(0, 19),
    ]);
    setLeadName("");
    setSelections({});
  }

  function handleExport() {
    const lines = [
      "LEAD SCORING MODEL",
      "=".repeat(50),
      "Generated with Markit Media Lead Scoring Calculator",
      "",
      "SCORING CRITERIA",
      "-".repeat(40),
      ...criteria.map(
        (c) =>
          `${c.name} (Weight: ${c.weight}%, Category: ${c.category})\n  Options: ${c.options.map((o) => `${o.label} = ${o.score}pts`).join(", ")}`
      ),
      "",
      "THRESHOLDS",
      "-".repeat(40),
      `Hot Lead: ${thresholds.hot}+`,
      `Warm Lead: ${thresholds.warm}-${thresholds.hot - 1}`,
      `Cold Lead: ${thresholds.cold}-${thresholds.warm - 1}`,
      `Unqualified: Below ${thresholds.cold}`,
      "",
      "TEST LEADS",
      "-".repeat(40),
      ...testLeads.map(
        (l) =>
          `${l.name}: ${l.score}/100 (${getGrade(l.score).label})`
      ),
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "lead-scoring-model.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  const categories = ["demographic", "firmographic", "behavioural"] as const;

  return (
    <main className="min-h-screen bg-white text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Lead Scoring Calculator",
          description: "Build a lead scoring model with demographic, firmographic, and behavioural criteria. Assign weights, test scores, and define qualification thresholds.",
          url: "https://themarkitmedia.com/en/resources/lead-scoring-calculator",
          applicationCategory: "Business Tool",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          provider: { "@type": "Organization", name: "Markit Media", url: "https://themarkitmedia.com" },
        }) }}
      />
      <title>Lead Scoring Calculator | Free Marketing Tool — Markit Media</title>
      <link rel="canonical" href="https://themarkitmedia.com/en/resources/lead-scoring-calculator" />
      <meta name="description" content="Build a lead scoring model with demographic, firmographic, and behavioural criteria. Assign weights, test scores, and define qualification thresholds." />
      <nav className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-8" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-base text-neutral-400">
          <li><Link href="/" className="hover:text-black transition-colors">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/resources" className="hover:text-black transition-colors">Resources</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-black" aria-current="page">Lead Scoring Calculator</li>
        </ol>
      </nav>
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-2">
          Lead Scoring Calculator
        </h1>
        <p className="text-lg text-neutral-600 mb-10">
          Build a lead scoring model, test it with real leads, and define
          qualification thresholds.
        </p>

        {/* Score display */}
        <div className="mb-8 rounded-lg border-2 border-black p-6 flex items-center justify-between">
          <div>
            <p className="text-base text-neutral-500">Current Lead Score</p>
            <p className="text-4xl font-bold">{currentScore}/100</p>
          </div>
          <span
            className={`rounded-full px-5 py-2 text-lg font-bold ${grade.color}`}
          >
            {grade.label}
          </span>
        </div>

        {/* Criteria by category */}
        {categories.map((cat) => {
          const items = criteria.filter((c) => c.category === cat);
          return (
            <div key={cat} className="mb-8">
              <h2 className="text-xl font-bold capitalize mb-4">
                {cat} Criteria
              </h2>
              <div className="space-y-5">
                {items.map((criterion) => (
                  <div
                    key={criterion.id}
                    className="rounded-lg border border-neutral-200 p-5"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-base font-semibold">
                        {criterion.name}
                      </h3>
                      <span className="text-base text-neutral-500">
                        Weight: {criterion.weight}%
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {criterion.options.map((opt) => (
                        <button
                          key={opt.label}
                          onClick={() =>
                            selectOption(criterion.id, opt.score)
                          }
                          className={`rounded-md border px-3 py-2 text-base transition-colors ${
                            selections[criterion.id] === opt.score
                              ? "border-black bg-black text-white"
                              : "border-neutral-300 hover:border-black"
                          }`}
                        >
                          {opt.label}{" "}
                          <span className="text-neutral-400 ml-1">
                            ({opt.score})
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Save as test lead */}
        <div className="mb-8 rounded-lg border border-neutral-200 p-5">
          <h2 className="text-xl font-bold mb-4">Test This Lead</h2>
          <div className="flex gap-3">
            <input
              type="text"
              value={leadName}
              onChange={(e) => setLeadName(e.target.value)}
              className="flex-1 rounded-md border border-neutral-300 px-3 py-2 text-base focus-visible:border-black focus-visible:outline-none"
              placeholder="Lead name (optional)"
            />
            <button
              onClick={handleTestLead}
              className="rounded-md bg-black px-6 py-2 text-base font-semibold text-white hover:bg-neutral-800 transition-colors"
            >
              Score Lead
            </button>
          </div>
        </div>

        {/* Thresholds */}
        <div className="mb-8 rounded-lg border border-neutral-200 p-5">
          <h2 className="text-xl font-bold mb-4">
            Qualification Thresholds
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {(
              [
                ["hot", "Hot Lead"] as const,
                ["warm", "Warm Lead"] as const,
                ["cold", "Cold Lead"] as const,
              ] as const
            ).map(([key, label]) => (
              <div key={key}>
                <label className="block text-base font-semibold mb-1">
                  {label} (min score)
                </label>
                <input
                  type="number"
                  value={thresholds[key]}
                  onChange={(e) =>
                    setThresholds((prev) => ({
                      ...prev,
                      [key]: parseInt(e.target.value) || 0,
                    }))
                  }
                  className="w-full rounded-md border border-neutral-300 px-3 py-2 text-base focus-visible:border-black focus-visible:outline-none"
                  min={0}
                  max={100}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Test leads history */}
        {testLeads.length > 0 && (
          <div className="mb-8 rounded-lg border border-neutral-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Scored Leads</h2>
              <button
                onClick={handleExport}
                className="rounded-md border border-black px-4 py-2 text-base font-medium hover:bg-black hover:text-white transition-colors"
              >
                Export Model (.txt)
              </button>
            </div>
            <div className="space-y-3">
              {testLeads.map((lead, i) => {
                const g = getGrade(lead.score);
                return (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-md bg-neutral-50 p-4"
                  >
                    <div>
                      <p className="text-base font-semibold">{lead.name}</p>
                      <p className="text-base text-neutral-500">
                        Score: {lead.score}/100
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-4 py-1 text-base font-semibold ${g.color}`}
                    >
                      {g.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Visual threshold scale */}
        <div className="rounded-lg border border-neutral-200 p-5">
          <h2 className="text-xl font-bold mb-4">Scoring Scale</h2>
          <div className="relative h-8 w-full rounded-full overflow-hidden flex">
            <div
              className="bg-neutral-200 h-full"
              style={{ width: `${thresholds.cold}%` }}
            />
            <div
              className="bg-neutral-400 h-full"
              style={{ width: `${thresholds.warm - thresholds.cold}%` }}
            />
            <div
              className="bg-neutral-700 h-full"
              style={{ width: `${thresholds.hot - thresholds.warm}%` }}
            />
            <div
              className="bg-black h-full"
              style={{ width: `${100 - thresholds.hot}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-base">
            <span>Unqualified (0-{thresholds.cold - 1})</span>
            <span>Cold ({thresholds.cold}-{thresholds.warm - 1})</span>
            <span>Warm ({thresholds.warm}-{thresholds.hot - 1})</span>
            <span>Hot ({thresholds.hot}-100)</span>
          </div>
        </div>
      </div>
          <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Lead Scoring Calculator",
          description: "Build a lead scoring model with demographic, firmographic, and behavioural criteria. Assign weights, test scores, and define qualification thresholds.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />
    
      <ToolCTA
        toolName="Lead Scoring Calculator"
        services={[
          { title: "Digital Marketing", desc: "Data-driven strategy with transparent reporting and insights.", href: "/services/digital-marketing" },
          { title: "Performance Marketing", desc: "Campaign optimization based on real performance data.", href: "/services/performance-marketing" },
          { title: "SEO", desc: "SEO analytics that show exactly what drives organic growth.", href: "/services/seo" },
        ]}
        relatedTools={[
          { title: "Ad Copy Analyzer", href: "/resources/ad-copy-analyzer" },
          { title: "Campaign Debrief", href: "/resources/campaign-debrief" },
          { title: "Competitor Pricing Tracker", href: "/resources/competitor-pricing-tracker" },
          { title: "Content Brief Generator", href: "/resources/content-brief-generator" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </main>
  );
}
