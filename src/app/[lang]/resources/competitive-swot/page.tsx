"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

/* ------------------------------------------------------------------ */
/*  Types & Constants                                                  */
/* ------------------------------------------------------------------ */

interface SwotData {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

interface CompanySwot {
  name: string;
  swot: SwotData;
}

type SwotCategory = keyof SwotData;

const swotCategories: { key: SwotCategory; label: string; description: string }[] = [
  { key: "strengths", label: "Strengths", description: "Internal advantages and capabilities" },
  { key: "weaknesses", label: "Weaknesses", description: "Internal limitations or gaps" },
  { key: "opportunities", label: "Opportunities", description: "External factors you can leverage" },
  { key: "threats", label: "Threats", description: "External risks or challenges" },
];

const emptySwot: SwotData = {
  strengths: [],
  weaknesses: [],
  opportunities: [],
  threats: [],
};

interface Insight {
  type: "advantage" | "vulnerability";
  title: string;
  detail: string;
}

interface Recommendation {
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
}

const howToSteps = [
  {
    title: "Start With Your Company",
    description:
      "Enter your company name and fill in each SWOT category honestly. The more specific your entries, the more actionable your analysis will be.",
  },
  {
    title: "Add Competitors",
    description:
      "Add up to three competitors. Research their public positioning, reviews, and market presence to fill in their SWOT categories as accurately as possible.",
  },
  {
    title: "Review the Matrix",
    description:
      "The side-by-side comparison reveals where you lead and where you lag. Focus on the competitive advantages and vulnerability alerts.",
  },
  {
    title: "Act on Recommendations",
    description:
      "Use the strategic recommendations to prioritize initiatives that leverage your strengths and address your most pressing vulnerabilities.",
  },
];

/* ------------------------------------------------------------------ */
/*  Analysis functions                                                 */
/* ------------------------------------------------------------------ */

function generateInsights(
  yours: CompanySwot,
  competitors: CompanySwot[]
): Insight[] {
  const insights: Insight[] = [];

  /* Competitive advantages: your strengths vs competitor weaknesses */
  for (const strength of yours.swot.strengths) {
    const sLower = strength.toLowerCase();
    for (const comp of competitors) {
      for (const weakness of comp.swot.weaknesses) {
        const wLower = weakness.toLowerCase();
        /* simple word-overlap heuristic */
        const sWords = new Set(sLower.split(/\s+/).filter((w) => w.length > 3));
        const wWords = wLower.split(/\s+/).filter((w) => w.length > 3);
        const overlap = wWords.some((w) => sWords.has(w));
        if (overlap) {
          insights.push({
            type: "advantage",
            title: `Advantage over ${comp.name}`,
            detail: `Your strength "${strength}" directly counters ${comp.name}'s weakness "${weakness}". Emphasize this in competitive positioning.`,
          });
        }
      }
    }
  }

  /* Vulnerability alerts: competitor strengths vs your weaknesses */
  for (const weakness of yours.swot.weaknesses) {
    const wLower = weakness.toLowerCase();
    for (const comp of competitors) {
      for (const strength of comp.swot.strengths) {
        const sLower = strength.toLowerCase();
        const wWords = new Set(wLower.split(/\s+/).filter((w) => w.length > 3));
        const sWords = sLower.split(/\s+/).filter((w) => w.length > 3);
        const overlap = sWords.some((w) => wWords.has(w));
        if (overlap) {
          insights.push({
            type: "vulnerability",
            title: `Vulnerability against ${comp.name}`,
            detail: `${comp.name}'s strength "${strength}" exploits your weakness "${weakness}". Consider addressing this gap.`,
          });
        }
      }
    }
  }

  /* Broad advantage: you have more strengths than any competitor */
  for (const comp of competitors) {
    if (
      yours.swot.strengths.length > comp.swot.strengths.length &&
      yours.swot.strengths.length > 0
    ) {
      insights.push({
        type: "advantage",
        title: `Breadth advantage over ${comp.name}`,
        detail: `You listed ${yours.swot.strengths.length} strengths compared to ${comp.name}'s ${comp.swot.strengths.length}. A broader strength base can support diverse positioning strategies.`,
      });
    }
  }

  /* Broad vulnerability: competitor has fewer weaknesses */
  for (const comp of competitors) {
    if (
      yours.swot.weaknesses.length > comp.swot.weaknesses.length &&
      comp.swot.weaknesses.length >= 0 &&
      yours.swot.weaknesses.length > 0
    ) {
      insights.push({
        type: "vulnerability",
        title: `More weaknesses than ${comp.name}`,
        detail: `You identified ${yours.swot.weaknesses.length} weaknesses versus ${comp.name}'s ${comp.swot.weaknesses.length}. Prioritize reducing your most impactful weaknesses.`,
      });
    }
  }

  return insights;
}

function generateRecommendations(
  yours: CompanySwot,
  competitors: CompanySwot[]
): Recommendation[] {
  const recs: Recommendation[] = [];

  /* Leverage unique strengths */
  const compStrengthsAll = competitors.flatMap((c) =>
    c.swot.strengths.map((s) => s.toLowerCase())
  );
  const uniqueStrengths = yours.swot.strengths.filter(
    (s) => !compStrengthsAll.some((cs) => cs.includes(s.toLowerCase()) || s.toLowerCase().includes(cs))
  );
  if (uniqueStrengths.length > 0) {
    recs.push({
      title: "Double Down on Unique Strengths",
      description: `Your strengths that competitors do not share: "${uniqueStrengths.join('", "')}". Invest marketing resources in highlighting these differentiators.`,
      priority: "High",
    });
  }

  /* Address critical weaknesses */
  if (yours.swot.weaknesses.length > 0) {
    recs.push({
      title: "Address Top Weaknesses",
      description: `You identified ${yours.swot.weaknesses.length} weakness${yours.swot.weaknesses.length === 1 ? "" : "es"}. Rank them by customer impact and create a remediation plan for the most critical ones first.`,
      priority: "High",
    });
  }

  /* Capture shared opportunities */
  const compOppsAll = competitors.flatMap((c) =>
    c.swot.opportunities.map((o) => o.toLowerCase())
  );
  const sharedOpps = yours.swot.opportunities.filter((o) =>
    compOppsAll.some((co) => co.includes(o.toLowerCase()) || o.toLowerCase().includes(co))
  );
  if (sharedOpps.length > 0) {
    recs.push({
      title: "Move Fast on Shared Opportunities",
      description: `Opportunities competitors also see: "${sharedOpps.join('", "')}". Speed of execution becomes your advantage when the market opportunity is visible to all.`,
      priority: "High",
    });
  }

  /* Exclusive opportunities */
  const exclusiveOpps = yours.swot.opportunities.filter(
    (o) => !compOppsAll.some((co) => co.includes(o.toLowerCase()) || o.toLowerCase().includes(co))
  );
  if (exclusiveOpps.length > 0) {
    recs.push({
      title: "Capitalize on Exclusive Opportunities",
      description: `Opportunities only you identified: "${exclusiveOpps.join('", "')}". These may represent under-explored market gaps.`,
      priority: "Medium",
    });
  }

  /* Monitor shared threats */
  const compThreatsAll = competitors.flatMap((c) =>
    c.swot.threats.map((t) => t.toLowerCase())
  );
  const sharedThreats = yours.swot.threats.filter((t) =>
    compThreatsAll.some((ct) => ct.includes(t.toLowerCase()) || t.toLowerCase().includes(ct))
  );
  if (sharedThreats.length > 0) {
    recs.push({
      title: "Prepare for Industry-Wide Threats",
      description: `Threats shared with competitors: "${sharedThreats.join('", "')}". Being better prepared than competitors can turn threats into advantages.`,
      priority: "Medium",
    });
  }

  /* Defensive strategy */
  const compOnlyStrengths = competitors.flatMap((c) =>
    c.swot.strengths.filter(
      (s) => !yours.swot.strengths.some((ys) => ys.toLowerCase().includes(s.toLowerCase()) || s.toLowerCase().includes(ys.toLowerCase()))
    ).map((s) => `${c.name}: ${s}`)
  );
  if (compOnlyStrengths.length > 0) {
    recs.push({
      title: "Develop Defensive Strategies",
      description: `Competitor strengths you do not match: ${compOnlyStrengths.map((s) => `"${s}"`).join(", ")}. Determine whether to build parity or reposition around different value.`,
      priority: "Medium",
    });
  }

  /* Opportunity-strength alignment */
  if (yours.swot.opportunities.length > 0 && yours.swot.strengths.length > 0) {
    recs.push({
      title: "Align Strengths with Opportunities",
      description:
        "Map each opportunity to a strength that can help you capture it. This alignment is the foundation of an offensive strategy.",
      priority: "Low",
    });
  }

  return recs;
}

function formatOutputText(
  yours: CompanySwot,
  competitors: CompanySwot[],
  insights: Insight[],
  recommendations: Recommendation[]
): string {
  const lines: string[] = [];
  const all = [yours, ...competitors];

  lines.push("COMPETITIVE SWOT MATRIX");
  lines.push("=".repeat(50));
  lines.push("");

  for (const company of all) {
    const isYours = company === yours;
    lines.push(`${company.name}${isYours ? " (Your Company)" : ""}`);
    lines.push("-".repeat(40));
    for (const cat of swotCategories) {
      lines.push(`  ${cat.label}:`);
      if (company.swot[cat.key].length === 0) {
        lines.push("    (none entered)");
      } else {
        for (const item of company.swot[cat.key]) {
          lines.push(`    - ${item}`);
        }
      }
    }
    lines.push("");
  }

  if (insights.length > 0) {
    lines.push("COMPETITIVE INSIGHTS");
    lines.push("-".repeat(40));
    const advantages = insights.filter((i) => i.type === "advantage");
    const vulnerabilities = insights.filter((i) => i.type === "vulnerability");
    if (advantages.length > 0) {
      lines.push("");
      lines.push("  Competitive Advantages:");
      for (const a of advantages) {
        lines.push(`    [+] ${a.title}`);
        lines.push(`        ${a.detail}`);
      }
    }
    if (vulnerabilities.length > 0) {
      lines.push("");
      lines.push("  Vulnerability Alerts:");
      for (const v of vulnerabilities) {
        lines.push(`    [!] ${v.title}`);
        lines.push(`        ${v.detail}`);
      }
    }
    lines.push("");
  }

  if (recommendations.length > 0) {
    lines.push("STRATEGIC RECOMMENDATIONS");
    lines.push("-".repeat(40));
    for (const rec of recommendations) {
      lines.push(`  [${rec.priority}] ${rec.title}`);
      lines.push(`       ${rec.description}`);
      lines.push("");
    }
  }

  return lines.join("\n");
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function SwotItemInput({
  companyIndex,
  category,
  items,
  onAdd,
  onRemove,
}: {
  companyIndex: number;
  category: SwotCategory;
  items: string[];
  onAdd: (value: string) => void;
  onRemove: (index: number) => void;
}) {
  const [draft, setDraft] = useState("");
  const inputId = `swot-${companyIndex}-${category}`;
  const catInfo = swotCategories.find((c) => c.key === category);

  function handleAdd() {
    const trimmed = draft.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setDraft("");
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  }

  return (
    <div>
      <label
        htmlFor={inputId}
        className="block text-base font-bold text-black mb-1"
      >
        {catInfo?.label}
      </label>
      <p className="text-base text-gray-500 mb-2">{catInfo?.description}</p>
      <div className="flex gap-2">
        <input
          id={inputId}
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`Add a ${category.slice(0, -1)}...`}
          className="flex-1 px-4 py-3 border border-gray-200 text-base bg-white text-black min-h-[44px] focus-visible:border-black focus-visible:outline-none motion-reduce:transition-none"
        />
        <button
          type="button"
          onClick={handleAdd}
          disabled={!draft.trim()}
          aria-label={`Add ${category.slice(0, -1)}`}
          className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center px-4 py-3 bg-black text-white text-base font-bold hover:bg-gray-900 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Add
        </button>
      </div>
      {items.length > 0 && (
        <ul className="mt-3 space-y-2">
          {items.map((item, i) => (
            <li
              key={i}
              className="flex items-center gap-2 text-base text-black bg-gray-50 px-4 py-2 border border-gray-200"
            >
              <span className="flex-1">{item}</span>
              <button
                type="button"
                onClick={() => onRemove(i)}
                aria-label={`Remove ${item}`}
                className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center text-base font-bold text-gray-400 hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function CompanyForm({
  company,
  index,
  isYours,
  onUpdateName,
  onAddItem,
  onRemoveItem,
  onRemoveCompany,
}: {
  company: CompanySwot;
  index: number;
  isYours: boolean;
  onUpdateName: (name: string) => void;
  onAddItem: (category: SwotCategory, value: string) => void;
  onRemoveItem: (category: SwotCategory, itemIndex: number) => void;
  onRemoveCompany?: () => void;
}) {
  return (
    <div className="border border-gray-200">
      <div className="bg-black text-white px-6 py-4 flex items-center justify-between gap-4">
        <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold">
          {isYours ? "Your Company" : `Competitor ${index}`}
        </h3>
        {!isYours && onRemoveCompany && (
          <button
            type="button"
            onClick={onRemoveCompany}
            aria-label={`Remove competitor ${company.name || index}`}
            className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center text-base font-bold text-gray-400 hover:text-white transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
          >
            Remove
          </button>
        )}
      </div>
      <div className="p-6 space-y-6">
        <div>
          <label
            htmlFor={`company-name-${index}`}
            className="block text-base font-bold text-black mb-2"
          >
            {isYours ? "Your Company Name" : "Competitor Name"}
          </label>
          <input
            id={`company-name-${index}`}
            type="text"
            placeholder={
              isYours
                ? "Enter your company name"
                : "Enter competitor name"
            }
            value={company.name}
            onChange={(e) => onUpdateName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 text-base bg-white text-black min-h-[44px] focus-visible:border-black focus-visible:outline-none motion-reduce:transition-none"
          />
        </div>
        {swotCategories.map((cat) => (
          <SwotItemInput
            key={cat.key}
            companyIndex={index}
            category={cat.key}
            items={company.swot[cat.key]}
            onAdd={(value) => onAddItem(cat.key, value)}
            onRemove={(itemIndex) => onRemoveItem(cat.key, itemIndex)}
          />
        ))}
      </div>
    </div>
  );
}

function SwotGrid({ company, isYours }: { company: CompanySwot; isYours: boolean }) {
  return (
    <div className="border border-gray-200">
      <div className="bg-black text-white px-6 py-4">
        <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold">
          {company.name || (isYours ? "Your Company" : "Competitor")}
          {isYours && (
            <span className="ml-2 text-base font-normal text-gray-400">
              (You)
            </span>
          )}
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
        {swotCategories.map((cat) => (
          <div key={cat.key} className="p-5">
            <p className="text-base font-bold text-black mb-3">{cat.label}</p>
            {company.swot[cat.key].length === 0 ? (
              <p className="text-base text-gray-400 italic">None entered</p>
            ) : (
              <ul className="space-y-2">
                {company.swot[cat.key].map((item, i) => (
                  <li key={i} className="text-base text-gray-700 flex items-start gap-2">
                    <span className="text-black mt-0.5" aria-hidden="true">
                      {cat.key === "strengths" || cat.key === "opportunities"
                        ? "+"
                        : "-"}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function InsightsPanel({ insights }: { insights: Insight[] }) {
  const advantages = insights.filter((i) => i.type === "advantage");
  const vulnerabilities = insights.filter((i) => i.type === "vulnerability");

  if (insights.length === 0) {
    return (
      <div className="border border-gray-200 p-6">
        <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-4">
          Competitive Insights
        </h2>
        <p className="text-base text-gray-500">
          No direct overlaps detected between your entries and competitor entries.
          Add more specific items to each SWOT category for richer analysis. Use
          shared keywords between your strengths and competitor weaknesses (and
          vice versa) to surface insights.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black">
        Competitive Insights
      </h2>

      {advantages.length > 0 && (
        <div className="border border-gray-200 p-6">
          <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">
            Competitive Advantages
          </h3>
          <div className="space-y-4">
            {advantages.map((a, i) => (
              <div
                key={i}
                className="flex items-start gap-3 border-b border-gray-100 pb-4 last:border-b-0 last:pb-0"
              >
                <span
                  className="inline-flex items-center justify-center min-w-[28px] h-7 bg-black text-white text-base font-bold flex-shrink-0"
                  aria-hidden="true"
                >
                  +
                </span>
                <div>
                  <p className="text-base font-bold text-black">{a.title}</p>
                  <p className="text-base text-gray-500 mt-1">{a.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {vulnerabilities.length > 0 && (
        <div className="border border-gray-200 p-6">
          <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">
            Vulnerability Alerts
          </h3>
          <div className="space-y-4">
            {vulnerabilities.map((v, i) => (
              <div
                key={i}
                className="flex items-start gap-3 border-b border-gray-100 pb-4 last:border-b-0 last:pb-0"
              >
                <span
                  className="inline-flex items-center justify-center min-w-[28px] h-7 border-2 border-black text-black text-base font-bold flex-shrink-0"
                  aria-hidden="true"
                >
                  !
                </span>
                <div>
                  <p className="text-base font-bold text-black">{v.title}</p>
                  <p className="text-base text-gray-500 mt-1">{v.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function RecommendationsPanel({
  recommendations,
}: {
  recommendations: Recommendation[];
}) {
  if (recommendations.length === 0) return null;

  return (
    <div className="border border-gray-200">
      <div className="bg-black text-white px-6 py-4">
        <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold">
          Strategic Recommendations
        </h3>
      </div>
      <div className="p-6 space-y-4">
        {recommendations.map((rec, i) => (
          <div
            key={i}
            className="flex items-start gap-3 border-b border-gray-100 pb-4 last:border-b-0 last:pb-0"
          >
            <span
              className={`inline-flex items-center justify-center min-w-[28px] h-7 text-base font-bold flex-shrink-0 ${
                rec.priority === "High"
                  ? "bg-black text-white"
                  : rec.priority === "Medium"
                    ? "border-2 border-black text-black"
                    : "border border-gray-300 text-gray-500"
              }`}
            >
              {i + 1}
            </span>
            <div>
              <p className="text-base font-bold text-black">
                {rec.title}
                <span className="ml-2 text-base font-normal text-gray-500">
                  ({rec.priority} priority)
                </span>
              </p>
              <p className="text-base text-gray-500 mt-1">{rec.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard API unavailable */
    }
  }, [text]);

  return (
    <button
      onClick={copy}
      aria-label="Copy SWOT matrix to clipboard"
      className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center px-5 py-3 text-base font-bold border border-gray-200 text-gray-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
    >
      {copied ? "Copied" : "Copy to Clipboard"}
    </button>
  );
}

function DownloadButton({
  text,
  filename,
}: {
  text: string;
  filename: string;
}) {
  const download = useCallback(() => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [text, filename]);

  return (
    <button
      onClick={download}
      aria-label="Download SWOT matrix as text file"
      className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center px-5 py-3 text-base font-bold border border-gray-200 text-gray-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
    >
      Download as Text
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default function CompetitiveSwotPage() {
  const [yourCompany, setYourCompany] = useState<CompanySwot>({
    name: "",
    swot: { ...emptySwot },
  });
  const [competitors, setCompetitors] = useState<CompanySwot[]>([]);
  const [result, setResult] = useState<{
    yours: CompanySwot;
    competitors: CompanySwot[];
    insights: Insight[];
    recommendations: Recommendation[];
  } | null>(null);

  /* ---- Your company handlers ---- */
  function updateYourName(name: string) {
    setYourCompany((prev) => ({ ...prev, name }));
  }

  function addYourItem(category: SwotCategory, value: string) {
    setYourCompany((prev) => ({
      ...prev,
      swot: {
        ...prev.swot,
        [category]: [...prev.swot[category], value],
      },
    }));
  }

  function removeYourItem(category: SwotCategory, index: number) {
    setYourCompany((prev) => ({
      ...prev,
      swot: {
        ...prev.swot,
        [category]: prev.swot[category].filter((_, i) => i !== index),
      },
    }));
  }

  /* ---- Competitor handlers ---- */
  function addCompetitor() {
    if (competitors.length >= 3) return;
    setCompetitors((prev) => [
      ...prev,
      { name: "", swot: { strengths: [], weaknesses: [], opportunities: [], threats: [] } },
    ]);
  }

  function removeCompetitor(index: number) {
    setCompetitors((prev) => prev.filter((_, i) => i !== index));
  }

  function updateCompetitorName(index: number, name: string) {
    setCompetitors((prev) =>
      prev.map((c, i) => (i === index ? { ...c, name } : c))
    );
  }

  function addCompetitorItem(
    compIndex: number,
    category: SwotCategory,
    value: string
  ) {
    setCompetitors((prev) =>
      prev.map((c, i) =>
        i === compIndex
          ? {
              ...c,
              swot: {
                ...c.swot,
                [category]: [...c.swot[category], value],
              },
            }
          : c
      )
    );
  }

  function removeCompetitorItem(
    compIndex: number,
    category: SwotCategory,
    itemIndex: number
  ) {
    setCompetitors((prev) =>
      prev.map((c, i) =>
        i === compIndex
          ? {
              ...c,
              swot: {
                ...c.swot,
                [category]: c.swot[category].filter((_, j) => j !== itemIndex),
              },
            }
          : c
      )
    );
  }

  /* ---- Validation ---- */
  const yourHasName = yourCompany.name.trim() !== "";
  const yourHasItems = swotCategories.some(
    (cat) => yourCompany.swot[cat.key].length > 0
  );
  const hasAtLeastOneCompetitor =
    competitors.length > 0 &&
    competitors.some(
      (c) =>
        c.name.trim() !== "" &&
        swotCategories.some((cat) => c.swot[cat.key].length > 0)
    );
  const canGenerate = yourHasName && yourHasItems && hasAtLeastOneCompetitor;

  const hasAnyInput =
    yourCompany.name.trim() !== "" ||
    swotCategories.some((cat) => yourCompany.swot[cat.key].length > 0) ||
    competitors.length > 0;

  /* ---- Generate / Reset ---- */
  function handleGenerate() {
    if (!canGenerate) return;
    const filledCompetitors = competitors.filter(
      (c) =>
        c.name.trim() !== "" &&
        swotCategories.some((cat) => c.swot[cat.key].length > 0)
    );
    const insights = generateInsights(yourCompany, filledCompetitors);
    const recommendations = generateRecommendations(
      yourCompany,
      filledCompetitors
    );
    setResult({
      yours: { ...yourCompany, swot: { ...yourCompany.swot } },
      competitors: filledCompetitors.map((c) => ({
        ...c,
        swot: { ...c.swot },
      })),
      insights,
      recommendations,
    });
  }

  function handleReset() {
    setYourCompany({ name: "", swot: { strengths: [], weaknesses: [], opportunities: [], threats: [] } });
    setCompetitors([]);
    setResult(null);
  }

  const plainText = result
    ? formatOutputText(
        result.yours,
        result.competitors,
        result.insights,
        result.recommendations
      )
    : "";

  return (
    <article className="min-h-screen">
      
      {/* Related Tools */}
      <section className="px-6 lg:px-12 py-12" aria-label="Related tools">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">Related Tools</h2>
          <div className="flex flex-wrap gap-3">
                <Link href="/resources/competitor-analysis" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Competitor Analysis</Link>
                <Link href="/resources/competitor-benchmarking" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Competitor Benchmarking</Link>
                <Link href="/resources/competitor-matrix" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Competitor Matrix</Link>
                <Link href="/resources/competitor-pricing-tracker" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Competitor Pricing</Link>
          </div>
        </div>
      </section>
<JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Competitive SWOT Matrix",
          description:
            "Free competitive SWOT analysis tool. Compare your strengths, weaknesses, opportunities, and threats against up to three competitors to uncover strategic advantages and vulnerabilities.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />

      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Competitive SWOT Matrix" },
        ]}
      />

      {/* ---- Hero ---- */}
      <section className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Competitive SWOT Matrix
            </h1>
            <SectionDesc>
              Map your strengths, weaknesses, opportunities, and threats
              alongside up to three competitors. Generate a side-by-side
              comparison matrix with competitive advantage highlights,
              vulnerability alerts, and strategic recommendations.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* ---- Your Company Form ---- */}
      <section className="px-6 lg:px-12 pb-8">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <CompanyForm
              company={yourCompany}
              index={0}
              isYours
              onUpdateName={updateYourName}
              onAddItem={addYourItem}
              onRemoveItem={removeYourItem}
            />
          </Animate>
        </div>
      </section>

      {/* ---- Competitor Forms ---- */}
      <section className="px-6 lg:px-12 pb-8">
        <div className="max-w-3xl mx-auto space-y-8">
          {competitors.map((comp, i) => (
            <Animate key={i} animation="fade-up">
              <CompanyForm
                company={comp}
                index={i + 1}
                isYours={false}
                onUpdateName={(name) => updateCompetitorName(i, name)}
                onAddItem={(cat, val) => addCompetitorItem(i, cat, val)}
                onRemoveItem={(cat, idx) => removeCompetitorItem(i, cat, idx)}
                onRemoveCompany={() => removeCompetitor(i)}
              />
            </Animate>
          ))}

          {competitors.length < 3 && (
            <Animate animation="fade-up">
              <button
                type="button"
                onClick={addCompetitor}
                className="w-full min-h-[44px] px-6 py-4 text-base font-bold border-2 border-dashed border-gray-300 text-gray-500 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                + Add Competitor ({competitors.length}/3)
              </button>
            </Animate>
          )}
        </div>
      </section>

      {/* ---- Generate / Reset ---- */}
      <section className="px-6 lg:px-12 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleGenerate}
                disabled={!canGenerate}
                className="bg-black text-white px-8 py-4 min-h-[44px] text-base font-bold hover:bg-gray-900 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Generate Matrix
              </button>
              {hasAnyInput && (
                <button
                  onClick={handleReset}
                  className="px-8 py-4 min-h-[44px] text-base font-bold border border-gray-200 text-gray-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  Reset
                </button>
              )}
              {!canGenerate && (
                <p className="text-base text-gray-400 self-center">
                  {!yourHasName
                    ? "Enter your company name to get started."
                    : !yourHasItems
                      ? "Add at least one SWOT item for your company."
                      : "Add at least one competitor with a name and SWOT item."}
                </p>
              )}
            </div>
          </Animate>
        </div>
      </section>

      {/* ---- Results ---- */}
      {result && (
        <section className="px-6 lg:px-12 pb-16">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Side-by-side SWOT grids */}
            <Animate animation="fade-up">
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-6">
                SWOT Comparison Matrix
              </h2>
              <div className="space-y-8">
                <SwotGrid company={result.yours} isYours />
                {result.competitors.map((comp, i) => (
                  <SwotGrid key={i} company={comp} isYours={false} />
                ))}
              </div>
            </Animate>

            {/* Insights */}
            <Animate animation="fade-up">
              <InsightsPanel insights={result.insights} />
            </Animate>

            {/* Recommendations */}
            <Animate animation="fade-up">
              <RecommendationsPanel
                recommendations={result.recommendations}
              />
            </Animate>

            {/* Export actions */}
            <div className="flex flex-wrap gap-3">
              <CopyButton text={plainText} />
              <DownloadButton
                text={plainText}
                filename="competitive-swot-matrix.txt"
              />
            </div>
          </div>
        </section>
      )}

      {/* ---- How to Use ---- */}
      <section className="px-6 lg:px-12 py-16 border-t border-gray-200">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-8">
              How to Use This Tool
            </h2>
          </Animate>
          <Stagger stagger={100} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {howToSteps.map((step, i) => (
              <div key={i} className="border border-gray-200 p-6">
                <div className="flex items-start gap-4">
                  <span className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-gray-300">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">
                      {step.title}
                    </h3>
                    <p className="text-base text-gray-500 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---- Bottom CTA ---- */}
      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Get a Professional Competitive Analysis
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              This tool gives you a starting framework. Our team conducts
              in-depth competitive research with market data, customer
              interviews, and strategic analysis to give you a comprehensive
              view of your competitive landscape.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-5 min-h-[44px] font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              Work With Our Strategy Team &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    
      <ToolCTA
        toolName="Competitive Swot"
        services={[
          { title: "Digital Marketing", desc: "Competitive intelligence turned into actionable growth strategy.", href: "/services/digital-marketing" },
          { title: "SEO", desc: "Outrank competitors with data-backed SEO strategies.", href: "/services/seo" },
          { title: "Performance Marketing", desc: "Win market share with smarter paid media campaigns.", href: "/services/performance-marketing" },
        ]}
        relatedTools={[
          { title: "Competitive Gap", href: "/resources/competitive-gap" },
          { title: "Competitive Swot Analyzer", href: "/resources/competitive-swot-analyzer" },
          { title: "Competitor Ad Spy", href: "/resources/competitor-ad-spy" },
          { title: "Competitor Analysis", href: "/resources/competitor-analysis" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
