"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Priority = "High" | "Medium" | "Low";
type QuadrantKey = "strengths" | "weaknesses" | "opportunities" | "threats";

interface SwotItem {
  id: string;
  text: string;
  priority: Priority;
}

interface CompanySwot {
  name: string;
  strengths: SwotItem[];
  weaknesses: SwotItem[];
  opportunities: SwotItem[];
  threats: SwotItem[];
}

interface SavedAnalysis {
  id: string;
  name: string;
  date: string;
  yourCompany: CompanySwot;
  competitors: CompanySwot[];
}

interface StrategicInsight {
  category: string;
  description: string;
  items: string[];
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const QUADRANTS: {
  key: QuadrantKey;
  label: string;
  sublabel: string;
  headerBg: string;
  headerText: string;
}[] = [
  {
    key: "strengths",
    label: "Strengths",
    sublabel: "Internal advantages",
    headerBg: "bg-black",
    headerText: "text-white",
  },
  {
    key: "weaknesses",
    label: "Weaknesses",
    sublabel: "Internal limitations",
    headerBg: "bg-neutral-700",
    headerText: "text-white",
  },
  {
    key: "opportunities",
    label: "Opportunities",
    sublabel: "External possibilities",
    headerBg: "bg-neutral-500",
    headerText: "text-white",
  },
  {
    key: "threats",
    label: "Threats",
    sublabel: "External risks",
    headerBg: "bg-neutral-300",
    headerText: "text-black",
  },
];

const PRIORITIES: Priority[] = ["High", "Medium", "Low"];

const STORAGE_KEY = "markit-competitive-swot-analyses";

const HOW_TO_STEPS = [
  {
    title: "Start With Your Company",
    description:
      "Enter your company name and populate each SWOT quadrant. Be honest about weaknesses and threats. The analysis is only as good as your objectivity.",
  },
  {
    title: "Add Competitors",
    description:
      "Add up to five competitors. Research their public presence, review sites, marketing, and industry reputation to fill in their SWOT quadrants accurately.",
  },
  {
    title: "Rate Priorities",
    description:
      "Assign High, Medium, or Low priority to each item. This helps you focus on the factors that matter most to competitive positioning.",
  },
  {
    title: "Review Strategic Insights",
    description:
      "The analyzer cross-references your data with competitor data to surface competitive advantages, vulnerability areas, market trends, and industry-wide risks.",
  },
  {
    title: "Export and Act",
    description:
      "Download your analysis and save it to return later. Use the insights to inform your marketing strategy, product roadmap, and business decisions.",
  },
  {
    title: "Revisit Regularly",
    description:
      "Markets change. Revisit your SWOT analysis quarterly to keep your competitive intelligence current and your strategy responsive.",
  },
];

/* ------------------------------------------------------------------ */
/*  Utility Functions                                                  */
/* ------------------------------------------------------------------ */

let _nextId = 1;
function uid(): string {
  return `swot-${Date.now()}-${_nextId++}`;
}

function createEmptyCompany(name = ""): CompanySwot {
  return { name, strengths: [], weaknesses: [], opportunities: [], threats: [] };
}

function loadSavedAnalyses(): SavedAnalysis[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function persistAnalyses(analyses: SavedAnalysis[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(analyses));
  } catch {
    /* storage full or unavailable */
  }
}

/* ------------------------------------------------------------------ */
/*  Strategic Insight Generation                                       */
/* ------------------------------------------------------------------ */

function generateInsights(
  yourCompany: CompanySwot,
  competitors: CompanySwot[]
): StrategicInsight[] {
  const insights: StrategicInsight[] = [];

  /* Competitive Advantages: your strengths vs competitor weaknesses */
  const advantages: string[] = [];
  for (const comp of competitors) {
    for (const weakness of comp.weaknesses) {
      for (const str of yourCompany.strengths) {
        const strWords = str.text.toLowerCase().split(/\s+/);
        const weakWords = weakness.text.toLowerCase().split(/\s+/);
        const overlap = strWords.filter((w) => w.length > 3 && weakWords.includes(w));
        if (overlap.length > 0) {
          advantages.push(
            `Your strength "${str.text}" directly counters ${comp.name}'s weakness "${weakness.text}"`
          );
        }
      }
    }
    /* Also flag if competitor has no strength in an area where you are strong */
    for (const str of yourCompany.strengths) {
      const compStrTexts = comp.strengths.map((s) => s.text.toLowerCase());
      if (
        str.priority === "High" &&
        !compStrTexts.some((cs) =>
          cs.split(/\s+/).some((w) => w.length > 3 && str.text.toLowerCase().includes(w))
        )
      ) {
        const alreadyAdded = advantages.some(
          (a) => a.includes(str.text) && a.includes(comp.name)
        );
        if (!alreadyAdded) {
          advantages.push(
            `Your high-priority strength "${str.text}" is not matched by ${comp.name}`
          );
        }
      }
    }
  }
  if (advantages.length > 0) {
    insights.push({
      category: "Competitive Advantages",
      description:
        "Areas where your strengths align with competitor weaknesses or gaps. These are your differentiation opportunities.",
      items: [...new Set(advantages)].slice(0, 8),
    });
  }

  /* Vulnerability Areas: your weaknesses vs competitor strengths */
  const vulnerabilities: string[] = [];
  for (const comp of competitors) {
    for (const compStr of comp.strengths) {
      for (const weakness of yourCompany.weaknesses) {
        const strWords = compStr.text.toLowerCase().split(/\s+/);
        const weakWords = weakness.text.toLowerCase().split(/\s+/);
        const overlap = strWords.filter((w) => w.length > 3 && weakWords.includes(w));
        if (overlap.length > 0) {
          vulnerabilities.push(
            `Your weakness "${weakness.text}" is exposed by ${comp.name}'s strength "${compStr.text}"`
          );
        }
      }
    }
    for (const weakness of yourCompany.weaknesses) {
      if (weakness.priority === "High") {
        const compHasStr = comp.strengths.some((cs) =>
          cs.text
            .toLowerCase()
            .split(/\s+/)
            .some((w) => w.length > 3 && weakness.text.toLowerCase().includes(w))
        );
        if (compHasStr) continue; // already captured above
        const compNotWeak = !comp.weaknesses.some((cw) =>
          cw.text
            .toLowerCase()
            .split(/\s+/)
            .some((w) => w.length > 3 && weakness.text.toLowerCase().includes(w))
        );
        if (compNotWeak) {
          const alreadyAdded = vulnerabilities.some(
            (v) => v.includes(weakness.text) && v.includes(comp.name)
          );
          if (!alreadyAdded) {
            vulnerabilities.push(
              `Your high-priority weakness "${weakness.text}" is not shared by ${comp.name}`
            );
          }
        }
      }
    }
  }
  if (vulnerabilities.length > 0) {
    insights.push({
      category: "Vulnerability Areas",
      description:
        "Areas where your weaknesses overlap with competitor strengths. Address these to protect your market position.",
      items: [...new Set(vulnerabilities)].slice(0, 8),
    });
  }

  /* Shared Opportunities: opportunities appearing across multiple companies */
  const oppCounts: Record<string, string[]> = {};
  const allCompanies = [yourCompany, ...competitors];
  for (const company of allCompanies) {
    for (const opp of company.opportunities) {
      const key = opp.text.toLowerCase().trim();
      if (!oppCounts[key]) oppCounts[key] = [];
      if (!oppCounts[key].includes(company.name)) {
        oppCounts[key].push(company.name);
      }
    }
  }
  const sharedOpps = Object.entries(oppCounts)
    .filter(([, companies]) => companies.length >= 2)
    .map(
      ([opp, companies]) =>
        `"${opp}" identified by ${companies.length} companies: ${companies.join(", ")}`
    );
  if (sharedOpps.length > 0) {
    insights.push({
      category: "Market Trends to Pursue",
      description:
        "Opportunities recognized across multiple companies. These likely represent real market trends worth investigating.",
      items: sharedOpps.slice(0, 6),
    });
  }
  /* If no exact-text overlap, look for keyword overlap */
  if (sharedOpps.length === 0 && competitors.length > 0) {
    const yourOppWords = yourCompany.opportunities
      .flatMap((o) => o.text.toLowerCase().split(/\s+/))
      .filter((w) => w.length > 4);
    const compOppWords = competitors
      .flatMap((c) => c.opportunities)
      .flatMap((o) => o.text.toLowerCase().split(/\s+/))
      .filter((w) => w.length > 4);
    const commonWords = [...new Set(yourOppWords.filter((w) => compOppWords.includes(w)))];
    if (commonWords.length > 0) {
      insights.push({
        category: "Market Trends to Pursue",
        description:
          "Related opportunity themes detected across companies. These may represent emerging market trends.",
        items: [
          `Common themes in opportunities: ${commonWords.slice(0, 8).join(", ")}`,
        ],
      });
    }
  }

  /* Shared Threats: threats appearing across multiple companies */
  const threatCounts: Record<string, string[]> = {};
  for (const company of allCompanies) {
    for (const threat of company.threats) {
      const key = threat.text.toLowerCase().trim();
      if (!threatCounts[key]) threatCounts[key] = [];
      if (!threatCounts[key].includes(company.name)) {
        threatCounts[key].push(company.name);
      }
    }
  }
  const sharedThreats = Object.entries(threatCounts)
    .filter(([, companies]) => companies.length >= 2)
    .map(
      ([threat, companies]) =>
        `"${threat}" affects ${companies.length} companies: ${companies.join(", ")}`
    );
  if (sharedThreats.length > 0) {
    insights.push({
      category: "Industry Risks to Mitigate",
      description:
        "Threats recognized by multiple companies. These are systemic risks that affect the entire market, not just your business.",
      items: sharedThreats.slice(0, 6),
    });
  }
  if (sharedThreats.length === 0 && competitors.length > 0) {
    const yourThreatWords = yourCompany.threats
      .flatMap((t) => t.text.toLowerCase().split(/\s+/))
      .filter((w) => w.length > 4);
    const compThreatWords = competitors
      .flatMap((c) => c.threats)
      .flatMap((t) => t.text.toLowerCase().split(/\s+/))
      .filter((w) => w.length > 4);
    const commonWords = [...new Set(yourThreatWords.filter((w) => compThreatWords.includes(w)))];
    if (commonWords.length > 0) {
      insights.push({
        category: "Industry Risks to Mitigate",
        description:
          "Related threat themes detected across companies. These may represent industry-wide risk factors.",
        items: [
          `Common themes in threats: ${commonWords.slice(0, 8).join(", ")}`,
        ],
      });
    }
  }

  return insights;
}

/* ------------------------------------------------------------------ */
/*  Competitive Position Summary                                       */
/* ------------------------------------------------------------------ */

function computePositionSummary(
  yourCompany: CompanySwot,
  competitors: CompanySwot[]
): {
  totalStrengths: number;
  totalWeaknesses: number;
  highPriorityStrengths: number;
  highPriorityWeaknesses: number;
  opportunityCount: number;
  threatCount: number;
  competitorAvgStrengths: number;
  competitorAvgWeaknesses: number;
  position: string;
} {
  const totalStrengths = yourCompany.strengths.length;
  const totalWeaknesses = yourCompany.weaknesses.length;
  const highPriorityStrengths = yourCompany.strengths.filter(
    (s) => s.priority === "High"
  ).length;
  const highPriorityWeaknesses = yourCompany.weaknesses.filter(
    (s) => s.priority === "High"
  ).length;
  const opportunityCount = yourCompany.opportunities.length;
  const threatCount = yourCompany.threats.length;

  const competitorAvgStrengths =
    competitors.length > 0
      ? Math.round(
          (competitors.reduce((sum, c) => sum + c.strengths.length, 0) /
            competitors.length) *
            10
        ) / 10
      : 0;
  const competitorAvgWeaknesses =
    competitors.length > 0
      ? Math.round(
          (competitors.reduce((sum, c) => sum + c.weaknesses.length, 0) /
            competitors.length) *
            10
        ) / 10
      : 0;

  const strDiff = totalStrengths - competitorAvgStrengths;
  const weakDiff = competitorAvgWeaknesses - totalWeaknesses;
  const netScore = strDiff + weakDiff;

  let position: string;
  if (netScore >= 4) position = "Strong Leader";
  else if (netScore >= 2) position = "Slight Leader";
  else if (netScore > -2) position = "Competitive";
  else if (netScore > -4) position = "Trailing";
  else position = "Significantly Behind";

  return {
    totalStrengths,
    totalWeaknesses,
    highPriorityStrengths,
    highPriorityWeaknesses,
    opportunityCount,
    threatCount,
    competitorAvgStrengths,
    competitorAvgWeaknesses,
    position,
  };
}

/* ------------------------------------------------------------------ */
/*  Export as plain text                                                */
/* ------------------------------------------------------------------ */

function formatPlainText(
  yourCompany: CompanySwot,
  competitors: CompanySwot[],
  insights: StrategicInsight[],
  summary: ReturnType<typeof computePositionSummary>
): string {
  const lines: string[] = [];

  lines.push("COMPETITIVE SWOT ANALYSIS");
  lines.push("=".repeat(50));
  lines.push(`Generated: ${new Date().toLocaleDateString()}`);
  lines.push("");

  const allCompanies = [yourCompany, ...competitors];

  for (const company of allCompanies) {
    const isYou = company === yourCompany;
    lines.push(`${company.name || "Unnamed"}${isYou ? " (Your Company)" : ""}`);
    lines.push("-".repeat(40));

    for (const q of QUADRANTS) {
      const items = company[q.key];
      lines.push(`  ${q.label}:`);
      if (items.length === 0) {
        lines.push("    (none)");
      } else {
        for (const item of items) {
          lines.push(`    [${item.priority}] ${item.text}`);
        }
      }
    }
    lines.push("");
  }

  if (insights.length > 0) {
    lines.push("STRATEGIC INSIGHTS");
    lines.push("=".repeat(50));
    for (const insight of insights) {
      lines.push("");
      lines.push(insight.category.toUpperCase());
      lines.push("-".repeat(30));
      lines.push(insight.description);
      for (const item of insight.items) {
        lines.push(`  - ${item}`);
      }
    }
    lines.push("");
  }

  lines.push("COMPETITIVE POSITION SUMMARY");
  lines.push("=".repeat(50));
  lines.push(`Position: ${summary.position}`);
  lines.push(`Your Strengths: ${summary.totalStrengths} (${summary.highPriorityStrengths} high-priority)`);
  lines.push(`Your Weaknesses: ${summary.totalWeaknesses} (${summary.highPriorityWeaknesses} high-priority)`);
  lines.push(`Your Opportunities: ${summary.opportunityCount}`);
  lines.push(`Your Threats: ${summary.threatCount}`);
  lines.push(`Competitor Avg Strengths: ${summary.competitorAvgStrengths}`);
  lines.push(`Competitor Avg Weaknesses: ${summary.competitorAvgWeaknesses}`);
  lines.push("");
  lines.push("Generated with the Competitive SWOT Analyzer at themarkitmedia.com");

  return lines.join("\n");
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function SwotQuadrant({
  companyIndex,
  companyName,
  quadrant,
  items,
  onAdd,
  onRemove,
  onUpdateText,
  onUpdatePriority,
}: {
  companyIndex: number;
  companyName: string;
  quadrant: (typeof QUADRANTS)[number];
  items: SwotItem[];
  onAdd: (text: string) => void;
  onRemove: (id: string) => void;
  onUpdateText: (id: string, text: string) => void;
  onUpdatePriority: (id: string, priority: Priority) => void;
}) {
  const [draft, setDraft] = useState("");
  const [draftPriority, setDraftPriority] = useState<Priority>("Medium");

  const inputId = `swot-${companyIndex}-${quadrant.key}-input`;
  const priorityId = `swot-${companyIndex}-${quadrant.key}-priority`;

  function handleAdd() {
    const text = draft.trim();
    if (!text) return;
    onAdd(text);
    setDraft("");
    setDraftPriority("Medium");
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  }

  return (
    <div className="border border-neutral-200">
      <div
        className={`px-4 py-3 ${quadrant.headerBg} ${quadrant.headerText}`}
      >
        <p className="text-base font-bold">{quadrant.label}</p>
        <p className="text-base opacity-80">{quadrant.sublabel}</p>
      </div>
      <div className="p-4 space-y-3">
        {/* Existing items */}
        {items.length > 0 && (
          <ul className="space-y-2">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex items-start gap-2 border-b border-neutral-100 pb-2"
              >
                <div className="flex-1 min-w-0">
                  <input
                    type="text"
                    value={item.text}
                    onChange={(e) => onUpdateText(item.id, e.target.value)}
                    aria-label={`${quadrant.label} item for ${companyName}`}
                    className="w-full text-base text-black bg-transparent border-none p-0 focus-visible:outline-none"
                  />
                </div>
                <label className="sr-only" htmlFor={`priority-${item.id}`}>
                  Priority for {item.text}
                </label>
                <select
                  id={`priority-${item.id}`}
                  value={item.priority}
                  onChange={(e) =>
                    onUpdatePriority(item.id, e.target.value as Priority)
                  }
                  className="text-base bg-neutral-50 border border-neutral-200 px-2 py-1 min-h-[36px] focus-visible:border-black focus-visible:outline-none"
                >
                  {PRIORITIES.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => onRemove(item.id)}
                  aria-label={`Remove "${item.text}" from ${quadrant.label}`}
                  className="min-w-[36px] min-h-[36px] inline-flex items-center justify-center text-base font-bold text-neutral-400 hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  &times;
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Add new item */}
        <div className="flex gap-2">
          <div className="flex-1">
            <label htmlFor={inputId} className="sr-only">
              Add {quadrant.label.toLowerCase()} item for {companyName}
            </label>
            <input
              id={inputId}
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Add ${quadrant.label.toLowerCase()} item...`}
              className="w-full px-3 py-2 border border-neutral-200 text-base text-black min-h-[40px] focus-visible:border-black focus-visible:outline-none"
            />
          </div>
          <div>
            <label htmlFor={priorityId} className="sr-only">
              Priority for new {quadrant.label.toLowerCase()} item
            </label>
            <select
              id={priorityId}
              value={draftPriority}
              onChange={(e) => setDraftPriority(e.target.value as Priority)}
              className="text-base bg-neutral-50 border border-neutral-200 px-2 py-2 min-h-[40px] focus-visible:border-black focus-visible:outline-none"
            >
              {PRIORITIES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleAdd}
            disabled={!draft.trim()}
            aria-label={`Add item to ${quadrant.label}`}
            className="min-w-[40px] min-h-[40px] inline-flex items-center justify-center px-3 text-base font-bold bg-black text-white hover:bg-neutral-800 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 disabled:bg-neutral-300 disabled:cursor-not-allowed"
          >
            +
          </button>
        </div>
        {items.length === 0 && (
          <p className="text-base text-neutral-400 italic">No items yet</p>
        )}
      </div>
    </div>
  );
}

function CompanySwotCard({
  company,
  companyIndex,
  isYou,
  onNameChange,
  onAddItem,
  onRemoveItem,
  onUpdateItemText,
  onUpdateItemPriority,
  onRemoveCompany,
  canRemove,
}: {
  company: CompanySwot;
  companyIndex: number;
  isYou: boolean;
  onNameChange: (name: string) => void;
  onAddItem: (quadrant: QuadrantKey, text: string, priority: Priority) => void;
  onRemoveItem: (quadrant: QuadrantKey, id: string) => void;
  onUpdateItemText: (quadrant: QuadrantKey, id: string, text: string) => void;
  onUpdateItemPriority: (
    quadrant: QuadrantKey,
    id: string,
    priority: Priority
  ) => void;
  onRemoveCompany?: () => void;
  canRemove: boolean;
}) {
  const nameId = isYou
    ? "your-company-name"
    : `competitor-${companyIndex}-name`;

  return (
    <div className="border border-neutral-200">
      <div
        className={`px-6 py-4 flex items-center justify-between ${
          isYou ? "bg-black text-white" : "bg-neutral-100 text-black"
        }`}
      >
        <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold">
          {isYou ? "Your Company" : `Competitor ${companyIndex}`}
        </h2>
        {!isYou && canRemove && (
          <button
            onClick={onRemoveCompany}
            aria-label={`Remove competitor ${companyIndex}`}
            className={`min-w-[44px] min-h-[44px] inline-flex items-center justify-center text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 ${
              isYou
                ? "text-neutral-400 hover:text-white focus-visible:outline-white"
                : "text-neutral-400 hover:text-black focus-visible:outline-black"
            }`}
          >
            Remove
          </button>
        )}
      </div>
      <div className="p-6 space-y-6">
        {/* Company name */}
        <div>
          <label
            htmlFor={nameId}
            className="block text-base font-bold text-black mb-2"
          >
            Company Name
          </label>
          <input
            id={nameId}
            type="text"
            value={company.name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder={
              isYou ? "e.g. Your Company" : `e.g. Competitor ${companyIndex}`
            }
            className="w-full px-4 py-3 border border-neutral-200 text-base text-black min-h-[44px] focus-visible:border-black focus-visible:outline-none"
          />
        </div>

        {/* SWOT quadrants in 2x2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {QUADRANTS.map((q) => (
            <SwotQuadrant
              key={q.key}
              companyIndex={companyIndex}
              companyName={company.name || (isYou ? "Your Company" : `Competitor ${companyIndex}`)}
              quadrant={q}
              items={company[q.key]}
              onAdd={(text) => onAddItem(q.key, text, "Medium")}
              onRemove={(id) => onRemoveItem(q.key, id)}
              onUpdateText={(id, text) => onUpdateItemText(q.key, id, text)}
              onUpdatePriority={(id, priority) =>
                onUpdateItemPriority(q.key, id, priority)
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ComparisonTable({
  yourCompany,
  competitors,
}: {
  yourCompany: CompanySwot;
  competitors: CompanySwot[];
}) {
  const allCompanies = [yourCompany, ...competitors];

  return (
    <div className="space-y-8">
      {QUADRANTS.map((q) => (
        <div key={q.key}>
          <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">
            {q.label} Comparison
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-base">
              <thead>
                <tr>
                  {allCompanies.map((company, ci) => (
                    <th
                      key={ci}
                      className={`text-left px-4 py-3 font-bold border border-neutral-200 ${
                        ci === 0
                          ? "bg-black text-white"
                          : "bg-neutral-100 text-black"
                      }`}
                    >
                      {company.name || (ci === 0 ? "Your Company" : `Competitor ${ci}`)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(() => {
                  const maxItems = Math.max(
                    ...allCompanies.map((c) => c[q.key].length),
                    1
                  );
                  return Array.from({ length: maxItems }, (_, rowIdx) => (
                    <tr key={rowIdx}>
                      {allCompanies.map((company, ci) => {
                        const item = company[q.key][rowIdx];
                        return (
                          <td
                            key={ci}
                            className={`px-4 py-3 border border-neutral-200 align-top ${
                              ci === 0 ? "bg-neutral-50" : "bg-white"
                            }`}
                          >
                            {item ? (
                              <div>
                                <span className="text-black">{item.text}</span>
                                <span
                                  className={`ml-2 inline-block text-base font-bold ${
                                    item.priority === "High"
                                      ? "text-black"
                                      : item.priority === "Medium"
                                        ? "text-neutral-500"
                                        : "text-neutral-400"
                                  }`}
                                >
                                  [{item.priority}]
                                </span>
                              </div>
                            ) : (
                              <span className="text-neutral-300">&mdash;</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ));
                })()}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}

function InsightsSection({ insights }: { insights: StrategicInsight[] }) {
  if (insights.length === 0) {
    return (
      <div className="border border-neutral-200 p-6">
        <p className="text-base text-neutral-500">
          Add more detail to your SWOT entries and competitor data to generate
          strategic insights. The analyzer cross-references items across
          companies to find patterns.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {insights.map((insight, i) => (
        <Animate key={i} animation="fade-up">
          <div className="border border-neutral-200">
            <div className="bg-black text-white px-6 py-4">
              <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold">
                {insight.category}
              </h3>
            </div>
            <div className="p-6">
              <p className="text-base text-neutral-600 mb-4">
                {insight.description}
              </p>
              <ul className="space-y-3">
                {insight.items.map((item, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-3 text-base text-neutral-700"
                  >
                    <span className="font-bold text-black min-w-[24px]">
                      {j + 1}.
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Animate>
      ))}
    </div>
  );
}

function PositionSummary({
  summary,
}: {
  summary: ReturnType<typeof computePositionSummary>;
}) {
  return (
    <div className="border border-neutral-200 p-6">
      <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">
        Overall Competitive Position
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        <div>
          <p className="text-base text-neutral-500 mb-1">Position</p>
          <p className="text-[clamp(1.25rem,2.5vw,1.75rem)] font-extrabold text-black font-[family-name:var(--font-display)]">
            {summary.position}
          </p>
        </div>
        <div>
          <p className="text-base text-neutral-500 mb-1">Your Strengths</p>
          <p className="text-[clamp(1.25rem,2.5vw,1.75rem)] font-extrabold text-black font-[family-name:var(--font-display)]">
            {summary.totalStrengths}
          </p>
          <p className="text-base text-neutral-400">
            {summary.highPriorityStrengths} high-priority
          </p>
        </div>
        <div>
          <p className="text-base text-neutral-500 mb-1">Your Weaknesses</p>
          <p className="text-[clamp(1.25rem,2.5vw,1.75rem)] font-extrabold text-black font-[family-name:var(--font-display)]">
            {summary.totalWeaknesses}
          </p>
          <p className="text-base text-neutral-400">
            {summary.highPriorityWeaknesses} high-priority
          </p>
        </div>
        <div>
          <p className="text-base text-neutral-500 mb-1">Competitor Avg Strengths</p>
          <p className="text-[clamp(1.25rem,2.5vw,1.75rem)] font-extrabold text-neutral-500 font-[family-name:var(--font-display)]">
            {summary.competitorAvgStrengths}
          </p>
        </div>
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
      aria-label="Copy analysis to clipboard"
      className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center px-5 py-3 text-base font-bold border border-neutral-200 text-neutral-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
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
    a.click();
    URL.revokeObjectURL(url);
  }, [text, filename]);

  return (
    <button
      onClick={download}
      aria-label="Download analysis as text file"
      className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center px-5 py-3 text-base font-bold border border-neutral-200 text-neutral-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
    >
      Download as .txt
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default function CompetitiveSwotAnalyzerPage() {
  const [yourCompany, setYourCompany] = useState<CompanySwot>(
    createEmptyCompany()
  );
  const [competitors, setCompetitors] = useState<CompanySwot[]>([
    createEmptyCompany(),
  ]);
  const [showResults, setShowResults] = useState(false);
  const [savedAnalyses, setSavedAnalyses] = useState<SavedAnalysis[]>([]);
  const [activeView, setActiveView] = useState<"input" | "comparison" | "insights">("input");

  /* Load saved analyses from localStorage on mount */
  useEffect(() => {
    setSavedAnalyses(loadSavedAnalyses());
  }, []);

  /* ---- Company state updaters ---- */

  function updateYourName(name: string) {
    setYourCompany((prev) => ({ ...prev, name }));
  }

  function addItemToYour(quadrant: QuadrantKey, text: string, priority: Priority) {
    setYourCompany((prev) => ({
      ...prev,
      [quadrant]: [
        ...prev[quadrant],
        { id: uid(), text, priority },
      ],
    }));
  }

  function removeItemFromYour(quadrant: QuadrantKey, id: string) {
    setYourCompany((prev) => ({
      ...prev,
      [quadrant]: prev[quadrant].filter((item) => item.id !== id),
    }));
  }

  function updateItemTextYour(quadrant: QuadrantKey, id: string, text: string) {
    setYourCompany((prev) => ({
      ...prev,
      [quadrant]: prev[quadrant].map((item) =>
        item.id === id ? { ...item, text } : item
      ),
    }));
  }

  function updateItemPriorityYour(
    quadrant: QuadrantKey,
    id: string,
    priority: Priority
  ) {
    setYourCompany((prev) => ({
      ...prev,
      [quadrant]: prev[quadrant].map((item) =>
        item.id === id ? { ...item, priority } : item
      ),
    }));
  }

  /* ---- Competitor state updaters ---- */

  function updateCompetitorName(ci: number, name: string) {
    setCompetitors((prev) => {
      const next = [...prev];
      next[ci] = { ...next[ci], name };
      return next;
    });
  }

  function addItemToCompetitor(
    ci: number,
    quadrant: QuadrantKey,
    text: string,
    priority: Priority
  ) {
    setCompetitors((prev) => {
      const next = [...prev];
      next[ci] = {
        ...next[ci],
        [quadrant]: [
          ...next[ci][quadrant],
          { id: uid(), text, priority },
        ],
      };
      return next;
    });
  }

  function removeItemFromCompetitor(
    ci: number,
    quadrant: QuadrantKey,
    id: string
  ) {
    setCompetitors((prev) => {
      const next = [...prev];
      next[ci] = {
        ...next[ci],
        [quadrant]: next[ci][quadrant].filter((item) => item.id !== id),
      };
      return next;
    });
  }

  function updateItemTextCompetitor(
    ci: number,
    quadrant: QuadrantKey,
    id: string,
    text: string
  ) {
    setCompetitors((prev) => {
      const next = [...prev];
      next[ci] = {
        ...next[ci],
        [quadrant]: next[ci][quadrant].map((item) =>
          item.id === id ? { ...item, text } : item
        ),
      };
      return next;
    });
  }

  function updateItemPriorityCompetitor(
    ci: number,
    quadrant: QuadrantKey,
    id: string,
    priority: Priority
  ) {
    setCompetitors((prev) => {
      const next = [...prev];
      next[ci] = {
        ...next[ci],
        [quadrant]: next[ci][quadrant].map((item) =>
          item.id === id ? { ...item, priority } : item
        ),
      };
      return next;
    });
  }

  function addCompetitor() {
    if (competitors.length < 5) {
      setCompetitors((prev) => [...prev, createEmptyCompany()]);
    }
  }

  function removeCompetitor(index: number) {
    if (competitors.length > 1) {
      setCompetitors((prev) => prev.filter((_, i) => i !== index));
    }
  }

  /* ---- Validation ---- */

  function hasContent(company: CompanySwot): boolean {
    return (
      company.name.trim().length > 0 &&
      (company.strengths.length > 0 ||
        company.weaknesses.length > 0 ||
        company.opportunities.length > 0 ||
        company.threats.length > 0)
    );
  }

  const canAnalyze =
    hasContent(yourCompany) &&
    competitors.some((c) => hasContent(c));

  const hasAnyInput =
    yourCompany.name.trim().length > 0 ||
    yourCompany.strengths.length > 0 ||
    yourCompany.weaknesses.length > 0 ||
    yourCompany.opportunities.length > 0 ||
    yourCompany.threats.length > 0 ||
    competitors.some(
      (c) =>
        c.name.trim().length > 0 ||
        c.strengths.length > 0 ||
        c.weaknesses.length > 0 ||
        c.opportunities.length > 0 ||
        c.threats.length > 0
    );

  /* ---- Generate / Reset / Save / Load ---- */

  function handleGenerate() {
    if (!canAnalyze) return;
    setShowResults(true);
    setActiveView("comparison");
  }

  function handleReset() {
    setYourCompany(createEmptyCompany());
    setCompetitors([createEmptyCompany()]);
    setShowResults(false);
    setActiveView("input");
  }

  function handleSave() {
    const analysis: SavedAnalysis = {
      id: uid(),
      name:
        yourCompany.name.trim() ||
        `Analysis ${new Date().toLocaleDateString()}`,
      date: new Date().toISOString(),
      yourCompany: JSON.parse(JSON.stringify(yourCompany)),
      competitors: JSON.parse(JSON.stringify(competitors)),
    };
    const updated = [analysis, ...savedAnalyses].slice(0, 10);
    setSavedAnalyses(updated);
    persistAnalyses(updated);
  }

  function handleLoad(analysis: SavedAnalysis) {
    setYourCompany(analysis.yourCompany);
    setCompetitors(analysis.competitors);
    setShowResults(false);
    setActiveView("input");
  }

  function handleDeleteSaved(id: string) {
    const updated = savedAnalyses.filter((a) => a.id !== id);
    setSavedAnalyses(updated);
    persistAnalyses(updated);
  }

  /* ---- Computed results ---- */

  const validCompetitors = competitors.filter((c) => hasContent(c));
  const insights = showResults
    ? generateInsights(yourCompany, validCompetitors)
    : [];
  const summary = showResults
    ? computePositionSummary(yourCompany, validCompetitors)
    : null;
  const plainText =
    showResults && summary
      ? formatPlainText(yourCompany, validCompetitors, insights, summary)
      : "";
  const filename = yourCompany.name.trim()
    ? `${yourCompany.name.trim().toLowerCase().replace(/\s+/g, "-")}-swot-analysis.txt`
    : "competitive-swot-analysis.txt";

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
          name: "Competitive SWOT Analyzer",
          description:
            "Free competitive SWOT analysis tool. Compare strengths, weaknesses, opportunities, and threats across your company and up to five competitors.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />

      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Competitive SWOT Analyzer" },
        ]}
      />

      {/* ---- Hero ---- */}
      <section aria-label="Free Tool" className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Competitive SWOT Analyzer
            </h1>
            <SectionDesc>
              Build structured SWOT analyses for your company and up to five
              competitors. Compare strengths, weaknesses, opportunities, and
              threats side by side, then review auto-generated strategic insights
              that highlight competitive advantages and vulnerability areas.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* ---- Saved Analyses ---- */}
      {savedAnalyses.length > 0 && (
        <section aria-label="Content section" className="px-6 lg:px-12 pb-8">
          <div className="max-w-4xl mx-auto">
            <Animate animation="fade-up">
              <details className="border border-neutral-200">
                <summary className="px-6 py-4 text-base font-bold text-black cursor-pointer hover:bg-neutral-50 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                  Saved Analyses ({savedAnalyses.length})
                </summary>
                <div className="border-t border-neutral-200 p-6 space-y-3">
                  {savedAnalyses.map((analysis) => (
                    <div
                      key={analysis.id}
                      className="flex items-center justify-between border-b border-neutral-100 pb-3"
                    >
                      <div>
                        <p className="text-base font-bold text-black">
                          {analysis.name}
                        </p>
                        <p className="text-base text-neutral-500">
                          {new Date(analysis.date).toLocaleDateString()} &mdash;{" "}
                          {analysis.competitors.length} competitor
                          {analysis.competitors.length !== 1 ? "s" : ""}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleLoad(analysis)}
                          className="min-h-[36px] px-4 py-2 text-base font-bold border border-neutral-200 text-neutral-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                        >
                          Load
                        </button>
                        <button
                          onClick={() => handleDeleteSaved(analysis.id)}
                          aria-label={`Delete saved analysis "${analysis.name}"`}
                          className="min-h-[36px] px-4 py-2 text-base font-bold text-neutral-400 hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </details>
            </Animate>
          </div>
        </section>
      )}

      {/* ---- View Tabs ---- */}
      {showResults && (
        <section aria-label="Content section" className="px-6 lg:px-12 pb-8">
          <div className="max-w-4xl mx-auto">
            <Animate animation="fade-up">
              <div className="flex flex-wrap gap-2 border-b border-neutral-200 pb-4">
                {(
                  [
                    { key: "input", label: "Edit Data" },
                    { key: "comparison", label: "Comparison View" },
                    { key: "insights", label: "Strategic Insights" },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveView(tab.key)}
                    className={`min-h-[44px] px-6 py-3 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                      activeView === tab.key
                        ? "bg-black text-white"
                        : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-black"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </Animate>
          </div>
        </section>
      )}

      {/* ---- Input View ---- */}
      {activeView === "input" && (
        <section aria-label="Content section" className="px-6 lg:px-12 pb-12">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Your company */}
            <Animate animation="fade-up">
              <CompanySwotCard
                company={yourCompany}
                companyIndex={0}
                isYou
                onNameChange={updateYourName}
                onAddItem={(q, text, priority) =>
                  addItemToYour(q, text, priority)
                }
                onRemoveItem={(q, id) => removeItemFromYour(q, id)}
                onUpdateItemText={(q, id, text) =>
                  updateItemTextYour(q, id, text)
                }
                onUpdateItemPriority={(q, id, priority) =>
                  updateItemPriorityYour(q, id, priority)
                }
                canRemove={false}
              />
            </Animate>

            {/* Competitors */}
            {competitors.map((comp, ci) => (
              <Animate key={ci} animation="fade-up" delay={ci * 60}>
                <CompanySwotCard
                  company={comp}
                  companyIndex={ci + 1}
                  isYou={false}
                  onNameChange={(name) => updateCompetitorName(ci, name)}
                  onAddItem={(q, text, priority) =>
                    addItemToCompetitor(ci, q, text, priority)
                  }
                  onRemoveItem={(q, id) =>
                    removeItemFromCompetitor(ci, q, id)
                  }
                  onUpdateItemText={(q, id, text) =>
                    updateItemTextCompetitor(ci, q, id, text)
                  }
                  onUpdateItemPriority={(q, id, priority) =>
                    updateItemPriorityCompetitor(ci, q, id, priority)
                  }
                  onRemoveCompany={() => removeCompetitor(ci)}
                  canRemove={competitors.length > 1}
                />
              </Animate>
            ))}

            {/* Add competitor button */}
            {competitors.length < 5 && (
              <Animate animation="fade-up">
                <button
                  onClick={addCompetitor}
                  className="w-full border border-dashed border-neutral-300 px-6 py-5 min-h-[44px] text-base font-bold text-neutral-500 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  + Add Competitor ({competitors.length}/5)
                </button>
              </Animate>
            )}

            {/* Action buttons */}
            <Animate animation="fade-up">
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleGenerate}
                  disabled={!canAnalyze}
                  className="bg-black text-white px-8 py-4 min-h-[44px] text-base font-bold hover:bg-neutral-900 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 disabled:bg-neutral-300 disabled:cursor-not-allowed"
                >
                  Analyze
                </button>
                {hasAnyInput && (
                  <>
                    <button
                      onClick={handleSave}
                      className="px-8 py-4 min-h-[44px] text-base font-bold border border-neutral-200 text-neutral-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                    >
                      Save to Browser
                    </button>
                    <button
                      onClick={handleReset}
                      className="px-8 py-4 min-h-[44px] text-base font-bold border border-neutral-200 text-neutral-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                    >
                      Reset
                    </button>
                  </>
                )}
              </div>
            </Animate>
          </div>
        </section>
      )}

      {/* ---- Comparison View ---- */}
      {showResults && activeView === "comparison" && (
        <section aria-label="Side-by-Side Comparison" className="px-6 lg:px-12 pb-12">
          <div className="max-w-6xl mx-auto space-y-8">
            <Animate animation="fade-up">
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black">
                Side-by-Side Comparison
              </h2>
            </Animate>

            <Animate animation="fade-up">
              <ComparisonTable
                yourCompany={yourCompany}
                competitors={validCompetitors}
              />
            </Animate>

            {/* Position Summary */}
            {summary && (
              <Animate animation="fade-up">
                <PositionSummary summary={summary} />
              </Animate>
            )}

            {/* Export actions */}
            <div className="flex flex-wrap gap-3">
              <CopyButton text={plainText} />
              <DownloadButton text={plainText} filename={filename} />
              <button
                onClick={handleSave}
                className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center px-5 py-3 text-base font-bold border border-neutral-200 text-neutral-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                Save to Browser
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ---- Insights View ---- */}
      {showResults && activeView === "insights" && (
        <section aria-label="Strategic Insights" className="px-6 lg:px-12 pb-12">
          <div className="max-w-4xl mx-auto space-y-8">
            <Animate animation="fade-up">
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black">
                Strategic Insights
              </h2>
              <p className="text-base text-neutral-500 mt-2">
                Auto-generated by cross-referencing your SWOT data with
                competitor data. More detailed entries produce richer insights.
              </p>
            </Animate>

            <InsightsSection insights={insights} />

            {/* Position Summary */}
            {summary && (
              <Animate animation="fade-up">
                <PositionSummary summary={summary} />
              </Animate>
            )}

            {/* Export actions */}
            <div className="flex flex-wrap gap-3">
              <CopyButton text={plainText} />
              <DownloadButton text={plainText} filename={filename} />
              <button
                onClick={handleSave}
                className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center px-5 py-3 text-base font-bold border border-neutral-200 text-neutral-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                Save to Browser
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ---- SWOT Methodology Educational Section ---- */}
      <section aria-label="What is SWOT Analysis?" className="px-6 lg:px-12 py-16 border-t border-neutral-200">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-4">
              What is SWOT Analysis?
            </h2>
            <p className="text-base text-neutral-600 leading-relaxed mb-8">
              SWOT analysis is a strategic planning framework that evaluates an
              organization across four dimensions: Strengths and Weaknesses
              (internal factors you can influence) and Opportunities and Threats
              (external factors driven by the market, industry, or economy).
              Developed in the 1960s at Stanford Research Institute, it remains
              one of the most widely used tools in business strategy because of
              its simplicity and versatility.
            </p>
          </Animate>

          <Animate animation="fade-up">
            <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">
              The Four Quadrants
            </h3>
          </Animate>
          <Stagger stagger={100} className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            <div className="border border-neutral-200 p-6">
              <h4 className="font-bold text-black mb-2">Strengths</h4>
              <p className="text-base text-neutral-600 leading-relaxed">
                Internal attributes that give your organization an advantage.
                These include resources, capabilities, brand equity, proprietary
                technology, talent, customer relationships, and anything you do
                better than competitors.
              </p>
            </div>
            <div className="border border-neutral-200 p-6">
              <h4 className="font-bold text-black mb-2">Weaknesses</h4>
              <p className="text-base text-neutral-600 leading-relaxed">
                Internal attributes that place your organization at a
                disadvantage. These include skill gaps, limited resources,
                outdated technology, poor brand perception, operational
                inefficiencies, and areas where competitors outperform you.
              </p>
            </div>
            <div className="border border-neutral-200 p-6">
              <h4 className="font-bold text-black mb-2">Opportunities</h4>
              <p className="text-base text-neutral-600 leading-relaxed">
                External conditions you could exploit to your advantage.
                These include market trends, regulatory changes, emerging
                technologies, competitor missteps, demographic shifts, and
                unmet customer needs in the market.
              </p>
            </div>
            <div className="border border-neutral-200 p-6">
              <h4 className="font-bold text-black mb-2">Threats</h4>
              <p className="text-base text-neutral-600 leading-relaxed">
                External conditions that could cause trouble for your
                organization. These include new competitors, changing
                regulations, economic downturns, technological disruption,
                shifting consumer behavior, and supply chain risks.
              </p>
            </div>
          </Stagger>

          <Animate animation="fade-up">
            <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">
              Why Competitive SWOT?
            </h3>
            <p className="text-base text-neutral-600 leading-relaxed mb-8">
              Traditional SWOT analysis focuses on a single organization.
              Competitive SWOT extends the framework by mapping the same four
              dimensions across multiple competitors, enabling direct
              comparisons. When your strengths overlap with a competitor&apos;s
              weaknesses, you have found a competitive advantage. When your
              weaknesses align with a competitor&apos;s strengths, you have
              identified a vulnerability. Shared opportunities suggest market
              trends, and shared threats signal industry-wide risks that
              require collective attention.
            </p>
          </Animate>

          <Animate animation="fade-up">
            <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">
              How to Use This Tool
            </h3>
          </Animate>
          <Stagger stagger={100} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {HOW_TO_STEPS.map((step, i) => (
              <div key={i} className="border border-neutral-200 p-6">
                <div className="flex items-start gap-4">
                  <span className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-neutral-300">
                    {i + 1}
                  </span>
                  <div>
                    <h4 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">
                      {step.title}
                    </h4>
                    <p className="text-base text-neutral-500 leading-relaxed">
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
      <section aria-label="Call to action" className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Turn Competitive Intelligence Into Strategy
            </h2>
            <p className="text-lg text-neutral-400 mt-4 mb-8">
              A SWOT analysis is the starting point. Let our team build a
              marketing strategy that leverages your competitive advantages,
              addresses vulnerabilities, and captures the opportunities that
              drive real growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-5 min-h-[44px] font-bold text-base hover:bg-neutral-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              >
                Get a Competitive Strategy &rarr;
              </Link>
              <Link
                href="/services/digital-marketing"
                className="inline-flex items-center justify-center gap-3 border border-white text-white px-10 py-5 min-h-[44px] font-bold text-base hover:bg-white hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              >
                Our Marketing Services &rarr;
              </Link>
            </div>
          </Animate>
        </div>
      </section>
    
      <ToolCTA
        toolName="Competitive Swot Analyzer"
        services={[
          { title: "Digital Marketing", desc: "Competitive intelligence turned into actionable growth strategy.", href: "/services/digital-marketing" },
          { title: "SEO", desc: "Outrank competitors with data-backed SEO strategies.", href: "/services/seo" },
          { title: "Performance Marketing", desc: "Win market share with smarter paid media campaigns.", href: "/services/performance-marketing" },
        ]}
        relatedTools={[
          { title: "Competitive Gap", href: "/resources/competitive-gap" },
          { title: "Competitive Swot", href: "/resources/competitive-swot" },
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
