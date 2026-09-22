"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { ToolCTA } from "@/components/tool-cta";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface MonthData {
  month: string;
  startCustomers: number;
  newCustomers: number;
  endCustomers: number;
}

interface CohortRow {
  label: string;
  startSize: number;
  retained: number[];
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const STORAGE_KEY = "markit-retention-calculator";

const INDUSTRY_BENCHMARKS: { industry: string; retention: number }[] = [
  { industry: "SaaS / Software", retention: 85 },
  { industry: "E-commerce / Retail", retention: 63 },
  { industry: "Banking / Finance", retention: 89 },
  { industry: "Insurance", retention: 83 },
  { industry: "Telecom", retention: 78 },
  { industry: "Media / Entertainment", retention: 72 },
  { industry: "Healthcare", retention: 77 },
  { industry: "Professional Services", retention: 84 },
];

const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const RETENTION_STRATEGIES = [
  {
    title: "Onboarding Excellence",
    description:
      "A structured onboarding sequence in the first 30 days reduces early churn by up to 50%. Map every touchpoint and automate where possible.",
  },
  {
    title: "Proactive Customer Success",
    description:
      "Identify at-risk accounts through usage data and engagement scores. Reach out before they consider leaving, not after.",
  },
  {
    title: "Loyalty and Reward Programs",
    description:
      "Customers who participate in loyalty programs generate 12-18% more revenue annually. Reward longevity, not just transactions.",
  },
  {
    title: "Regular Value Communication",
    description:
      "Send monthly impact reports showing the value customers receive. People stay when they clearly see what they would lose.",
  },
  {
    title: "Feedback Loops",
    description:
      "Run NPS and CSAT surveys at key moments. Act on feedback quickly and close the loop by telling customers what changed because of their input.",
  },
  {
    title: "Win-Back Campaigns",
    description:
      "Not all churned customers are lost forever. A well-timed win-back sequence with a compelling offer can recover 10-15% of lapsed accounts.",
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function pct(n: number): string {
  if (!isFinite(n)) return "N/A";
  return n.toFixed(1) + "%";
}

function fmtMoney(n: number): string {
  if (!isFinite(n) || isNaN(n)) return "$0";
  return "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

function fmtNum(n: number): string {
  if (!isFinite(n) || isNaN(n)) return "0";
  return n.toLocaleString("en-US", { maximumFractionDigits: 1 });
}

function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function RetentionCalculatorPage() {
  /* ---- basic inputs ---- */
  const [startCustomers, setStartCustomers] = useState("1000");
  const [newCustomers, setNewCustomers] = useState("150");
  const [endCustomers, setEndCustomers] = useState("1050");
  const [periodLength, setPeriodLength] = useState("1");
  const [avgRevenue, setAvgRevenue] = useState("100");

  /* ---- monthly tracking ---- */
  const [months, setMonths] = useState<MonthData[]>([]);

  /* ---- cohort analysis ---- */
  const [cohorts, setCohorts] = useState<CohortRow[]>([]);

  /* ---- scenario ---- */
  const [improvementPct, setImprovementPct] = useState("5");

  /* ---- active tab ---- */
  const [activeTab, setActiveTab] = useState<
    "calculator" | "tracking" | "cohorts" | "benchmarks" | "scenario"
  >("calculator");

  /* ---- localStorage ---- */
  const [loaded, setLoaded] = useState(false);
  const initialLoadDone = useRef(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        if (data.startCustomers) setStartCustomers(data.startCustomers);
        if (data.newCustomers) setNewCustomers(data.newCustomers);
        if (data.endCustomers) setEndCustomers(data.endCustomers);
        if (data.periodLength) setPeriodLength(data.periodLength);
        if (data.avgRevenue) setAvgRevenue(data.avgRevenue);
        if (Array.isArray(data.months)) setMonths(data.months);
        if (Array.isArray(data.cohorts)) setCohorts(data.cohorts);
        if (data.improvementPct) setImprovementPct(data.improvementPct);
      }
    } catch {
      /* ignore corrupt data */
    }
    setLoaded(true);
    initialLoadDone.current = true;
  }, []);

  useEffect(() => {
    if (!initialLoadDone.current) return;
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        startCustomers,
        newCustomers,
        endCustomers,
        periodLength,
        avgRevenue,
        months,
        cohorts,
        improvementPct,
      })
    );
  }, [
    startCustomers,
    newCustomers,
    endCustomers,
    periodLength,
    avgRevenue,
    months,
    cohorts,
    improvementPct,
  ]);

  /* ---- calculations ---- */
  const sc = Math.max(0, parseFloat(startCustomers) || 0);
  const nc = Math.max(0, parseFloat(newCustomers) || 0);
  const ec = Math.max(0, parseFloat(endCustomers) || 0);
  const pl = Math.max(1, parseFloat(periodLength) || 1);
  const ar = Math.max(0, parseFloat(avgRevenue) || 0);

  const retentionRate = sc > 0 ? ((ec - nc) / sc) * 100 : 0;
  const churnRate = 100 - retentionRate;
  const monthlyChurn = pl > 0 ? churnRate / pl : churnRate;
  const customerLifetime =
    monthlyChurn > 0 ? 1 / (monthlyChurn / 100) : Infinity;
  const lostCustomers = sc + nc - ec;
  const revenueImpactLost = lostCustomers * ar;
  const lifetimeRevenuePerCustomer = isFinite(customerLifetime)
    ? customerLifetime * ar
    : 0;

  /* ---- monthly tracking helpers ---- */
  const [monthForm, setMonthForm] = useState({
    month: MONTH_LABELS[0],
    startCustomers: "",
    newCustomers: "",
    endCustomers: "",
  });

  const addMonth = useCallback(() => {
    const ms = parseFloat(monthForm.startCustomers);
    const mn = parseFloat(monthForm.newCustomers);
    const me = parseFloat(monthForm.endCustomers);
    if (isNaN(ms) || isNaN(mn) || isNaN(me)) return;
    if (months.length >= 12) return;
    setMonths((prev) => [
      ...prev,
      {
        month: monthForm.month,
        startCustomers: ms,
        newCustomers: mn,
        endCustomers: me,
      },
    ]);
    setMonthForm({
      month: MONTH_LABELS[(months.length + 1) % 12],
      startCustomers: "",
      newCustomers: "",
      endCustomers: "",
    });
  }, [monthForm, months.length]);

  const removeMonth = useCallback((idx: number) => {
    setMonths((prev) => prev.filter((_, i) => i !== idx));
  }, []);

  const monthlyRetentionRates = months.map((m) =>
    m.startCustomers > 0
      ? ((m.endCustomers - m.newCustomers) / m.startCustomers) * 100
      : 0
  );

  /* ---- cohort helpers ---- */
  const [cohortForm, setCohortForm] = useState({
    label: "",
    startSize: "",
    retained: "",
  });

  const addCohort = useCallback(() => {
    const size = parseInt(cohortForm.startSize, 10);
    if (!cohortForm.label.trim() || isNaN(size) || size <= 0) return;
    const retained = cohortForm.retained
      .split(",")
      .map((s) => parseInt(s.trim(), 10))
      .filter((n) => !isNaN(n));
    if (retained.length === 0) return;
    setCohorts((prev) => [
      ...prev,
      { label: cohortForm.label.trim(), startSize: size, retained },
    ]);
    setCohortForm({ label: "", startSize: "", retained: "" });
  }, [cohortForm]);

  const removeCohort = useCallback((idx: number) => {
    setCohorts((prev) => prev.filter((_, i) => i !== idx));
  }, []);

  /* ---- scenario ---- */
  const impPct = clamp(parseFloat(improvementPct) || 0, 0, 100);
  const improvedRetention = clamp(retentionRate + impPct, 0, 100);
  const improvedChurn = 100 - improvedRetention;
  const improvedLifetime =
    improvedChurn > 0 ? 1 / (improvedChurn / 100) : Infinity;
  const currentAnnualRevPerCustomer = isFinite(customerLifetime)
    ? Math.min(customerLifetime, 12) * ar
    : 12 * ar;
  const improvedAnnualRevPerCustomer = isFinite(improvedLifetime)
    ? Math.min(improvedLifetime, 12) * ar
    : 12 * ar;
  const revenueGainPerCustomer =
    improvedAnnualRevPerCustomer - currentAnnualRevPerCustomer;
  const totalRevenueGain = revenueGainPerCustomer * sc;

  /* ---- export ---- */
  const handleExport = useCallback(() => {
    const lines: string[] = [];
    lines.push("CUSTOMER RETENTION REPORT");
    lines.push("Generated by Markit Media Retention Calculator");
    lines.push("Date: " + new Date().toLocaleDateString());
    lines.push("");
    lines.push("=== CORE METRICS ===");
    lines.push("Starting Customers: " + sc);
    lines.push("New Customers Acquired: " + nc);
    lines.push("Customers at End of Period: " + ec);
    lines.push("Period Length: " + pl + " month(s)");
    lines.push("Retention Rate: " + pct(retentionRate));
    lines.push("Churn Rate: " + pct(churnRate));
    lines.push("Monthly Churn Rate: " + pct(monthlyChurn));
    lines.push(
      "Customer Lifetime: " +
        (isFinite(customerLifetime) ? fmtNum(customerLifetime) + " months" : "N/A")
    );
    lines.push("Customers Lost: " + lostCustomers);
    if (ar > 0) {
      lines.push("");
      lines.push("=== REVENUE IMPACT ===");
      lines.push("Avg Revenue per Customer: " + fmtMoney(ar));
      lines.push("Revenue Lost from Churned Customers: " + fmtMoney(revenueImpactLost));
      lines.push(
        "Lifetime Revenue per Customer: " + fmtMoney(lifetimeRevenuePerCustomer)
      );
    }
    if (months.length > 0) {
      lines.push("");
      lines.push("=== MONTHLY TRACKING ===");
      months.forEach((m, i) => {
        lines.push(
          `${m.month}: Start=${m.startCustomers}, New=${m.newCustomers}, End=${m.endCustomers}, Retention=${pct(monthlyRetentionRates[i])}`
        );
      });
    }
    if (cohorts.length > 0) {
      lines.push("");
      lines.push("=== COHORT ANALYSIS ===");
      cohorts.forEach((c) => {
        lines.push(
          `${c.label} (n=${c.startSize}): ${c.retained.map((r) => pct((r / c.startSize) * 100)).join(", ")}`
        );
      });
    }
    if (impPct > 0) {
      lines.push("");
      lines.push("=== IMPROVEMENT SCENARIO ===");
      lines.push("Improvement: +" + pct(impPct));
      lines.push("Improved Retention Rate: " + pct(improvedRetention));
      lines.push("Revenue Gain per Customer: " + fmtMoney(revenueGainPerCustomer));
      lines.push("Total Revenue Gain (" + sc + " customers): " + fmtMoney(totalRevenueGain));
    }
    lines.push("");
    lines.push("=== INDUSTRY BENCHMARKS ===");
    INDUSTRY_BENCHMARKS.forEach((b) => {
      lines.push(`${b.industry}: ${b.retention}%`);
    });

    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "retention-report.txt";
    a.click();
    URL.revokeObjectURL(url);
  }, [
    sc,
    nc,
    ec,
    pl,
    ar,
    retentionRate,
    churnRate,
    monthlyChurn,
    customerLifetime,
    lostCustomers,
    revenueImpactLost,
    lifetimeRevenuePerCustomer,
    months,
    monthlyRetentionRates,
    cohorts,
    impPct,
    improvedRetention,
    revenueGainPerCustomer,
    totalRevenueGain,
  ]);

  /* ---- reset ---- */
  const handleReset = useCallback(() => {
    setStartCustomers("1000");
    setNewCustomers("150");
    setEndCustomers("1050");
    setPeriodLength("1");
    setAvgRevenue("100");
    setMonths([]);
    setCohorts([]);
    setImprovementPct("5");
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  /* ---- shared styles ---- */
  const inputClass =
    "w-full px-4 py-3 border border-neutral-200 text-base text-black bg-white focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 transition-colors motion-reduce:transition-none min-h-[44px]";

  const btnPrimary =
    "inline-flex items-center justify-center gap-2 bg-black text-white px-6 py-3 font-bold text-base hover:bg-neutral-800 transition-colors motion-reduce:transition-none min-h-[44px] focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2";

  const btnSecondary =
    "inline-flex items-center justify-center gap-2 border border-neutral-300 bg-white text-black px-6 py-3 font-bold text-base hover:bg-neutral-50 transition-colors motion-reduce:transition-none min-h-[44px] focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2";

  const tabClass = (active: boolean) =>
    `px-4 py-3 text-base font-bold transition-colors motion-reduce:transition-none min-h-[44px] focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
      active
        ? "border-b-2 border-black text-black"
        : "text-neutral-400 hover:text-black"
    }`;

  if (!loaded) {
    return (
      <article className="min-h-screen">
        <div className="px-6 lg:px-12 pt-32 pb-20 text-center">
          <p className="text-base text-neutral-500">Loading calculator...</p>
        </div>
      </article>
    );
  }

  return (
    <article className="min-h-screen">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Customer Retention Calculator" },
        ]}
      />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-16 pb-8">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Interactive Tools</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Customer Retention Calculator
            </h1>
            <SectionDesc>
              Measure your customer retention rate, track churn over time,
              compare against industry benchmarks, and model the revenue impact
              of retention improvements. All calculations run locally in your
              browser.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* Tabs */}
      <section className="px-6 lg:px-12 pb-4">
        <div className="max-w-5xl mx-auto">
          <nav
            className="flex flex-wrap gap-2 border-b border-neutral-200"
            aria-label="Calculator sections"
          >
            {(
              [
                ["calculator", "Calculator"],
                ["tracking", "Monthly Tracking"],
                ["cohorts", "Cohort Analysis"],
                ["benchmarks", "Benchmarks"],
                ["scenario", "Scenario Planner"],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setActiveTab(key)}
                className={tabClass(activeTab === key)}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
      </section>

      {/* Calculator Tab */}
      {activeTab === "calculator" && (
        <section className="px-6 lg:px-12 py-8">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Inputs */}
            <Animate animation="fade-up">
              <div className="space-y-6">
                <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black">
                  Your Numbers
                </h2>

                <div>
                  <label
                    htmlFor="startCustomers"
                    className="block text-base font-bold text-black mb-2"
                  >
                    Starting Customers (beginning of period)
                  </label>
                  <input
                    id="startCustomers"
                    type="number"
                    min={0}
                    value={startCustomers}
                    onChange={(e) => setStartCustomers(e.target.value)}
                    className={inputClass}
                    placeholder="e.g. 1000"
                  />
                </div>

                <div>
                  <label
                    htmlFor="newCustomers"
                    className="block text-base font-bold text-black mb-2"
                  >
                    New Customers Acquired (during period)
                  </label>
                  <input
                    id="newCustomers"
                    type="number"
                    min={0}
                    value={newCustomers}
                    onChange={(e) => setNewCustomers(e.target.value)}
                    className={inputClass}
                    placeholder="e.g. 150"
                  />
                </div>

                <div>
                  <label
                    htmlFor="endCustomers"
                    className="block text-base font-bold text-black mb-2"
                  >
                    Customers at End of Period
                  </label>
                  <input
                    id="endCustomers"
                    type="number"
                    min={0}
                    value={endCustomers}
                    onChange={(e) => setEndCustomers(e.target.value)}
                    className={inputClass}
                    placeholder="e.g. 1050"
                  />
                </div>

                <div>
                  <label
                    htmlFor="periodLength"
                    className="block text-base font-bold text-black mb-2"
                  >
                    Period Length (months)
                  </label>
                  <input
                    id="periodLength"
                    type="number"
                    min={1}
                    max={60}
                    value={periodLength}
                    onChange={(e) => setPeriodLength(e.target.value)}
                    className={inputClass}
                    placeholder="e.g. 1"
                  />
                </div>

                <div>
                  <label
                    htmlFor="avgRevenue"
                    className="block text-base font-bold text-black mb-2"
                  >
                    Avg Revenue per Customer per Month (optional)
                  </label>
                  <input
                    id="avgRevenue"
                    type="number"
                    min={0}
                    value={avgRevenue}
                    onChange={(e) => setAvgRevenue(e.target.value)}
                    className={inputClass}
                    placeholder="e.g. 100"
                  />
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleExport}
                    className={btnPrimary}
                  >
                    Export as .txt
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className={btnSecondary}
                  >
                    Reset All
                  </button>
                </div>
              </div>
            </Animate>

            {/* Results */}
            <Animate animation="fade-up" delay={150}>
              <div className="space-y-6">
                <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black">
                  Results
                </h2>

                <div className="grid grid-cols-2 gap-4">
                  <MetricCard
                    label="Retention Rate"
                    value={pct(clamp(retentionRate, 0, 100))}
                  />
                  <MetricCard
                    label="Churn Rate"
                    value={pct(clamp(churnRate, 0, 100))}
                  />
                  <MetricCard
                    label="Monthly Churn"
                    value={pct(clamp(monthlyChurn, 0, 100))}
                  />
                  <MetricCard
                    label="Customer Lifetime"
                    value={
                      isFinite(customerLifetime)
                        ? fmtNum(customerLifetime) + " mo"
                        : "N/A"
                    }
                  />
                  <MetricCard
                    label="Customers Lost"
                    value={lostCustomers.toString()}
                  />
                  <MetricCard
                    label="Revenue Lost"
                    value={ar > 0 ? fmtMoney(revenueImpactLost) : "N/A"}
                  />
                </div>

                {ar > 0 && (
                  <div className="border border-neutral-200 p-6">
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-3">
                      Revenue Impact
                    </h3>
                    <div className="space-y-2">
                      <p className="text-base text-neutral-600">
                        <span className="font-bold text-black">
                          Lifetime Revenue per Customer:
                        </span>{" "}
                        {fmtMoney(lifetimeRevenuePerCustomer)}
                      </p>
                      <p className="text-base text-neutral-600">
                        <span className="font-bold text-black">
                          Monthly Revenue at Risk:
                        </span>{" "}
                        {fmtMoney(revenueImpactLost)}
                      </p>
                      <p className="text-base text-neutral-600">
                        <span className="font-bold text-black">
                          Annual Revenue at Risk:
                        </span>{" "}
                        {fmtMoney(revenueImpactLost * 12)}
                      </p>
                    </div>
                  </div>
                )}

                {/* Retention bar visual */}
                <div>
                  <p className="text-base font-bold text-black mb-2">
                    Retention vs Churn
                  </p>
                  <div className="w-full h-8 bg-neutral-100 flex overflow-hidden">
                    <div
                      className="h-full bg-black transition-all duration-500 motion-reduce:transition-none"
                      style={{
                        width: `${clamp(retentionRate, 0, 100)}%`,
                      }}
                    />
                    <div
                      className="h-full bg-neutral-300 transition-all duration-500 motion-reduce:transition-none"
                      style={{
                        width: `${clamp(churnRate, 0, 100)}%`,
                      }}
                    />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-base text-neutral-500">
                      Retained {pct(clamp(retentionRate, 0, 100))}
                    </span>
                    <span className="text-base text-neutral-500">
                      Churned {pct(clamp(churnRate, 0, 100))}
                    </span>
                  </div>
                </div>
              </div>
            </Animate>
          </div>
        </section>
      )}

      {/* Monthly Tracking Tab */}
      {activeTab === "tracking" && (
        <section className="px-6 lg:px-12 py-8">
          <div className="max-w-5xl mx-auto">
            <Animate animation="fade-up">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-2">
                Monthly Retention Tracking
              </h2>
              <p className="text-base text-neutral-500 mb-6">
                Add up to 12 months of data to track your retention rate over
                time. The chart below updates automatically.
              </p>

              {/* Add month form */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
                <div>
                  <label
                    htmlFor="trackMonth"
                    className="block text-base font-bold text-black mb-1"
                  >
                    Month
                  </label>
                  <select
                    id="trackMonth"
                    value={monthForm.month}
                    onChange={(e) =>
                      setMonthForm((f) => ({ ...f, month: e.target.value }))
                    }
                    className={inputClass}
                  >
                    {MONTH_LABELS.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="trackStart"
                    className="block text-base font-bold text-black mb-1"
                  >
                    Start
                  </label>
                  <input
                    id="trackStart"
                    type="number"
                    min={0}
                    value={monthForm.startCustomers}
                    onChange={(e) =>
                      setMonthForm((f) => ({
                        ...f,
                        startCustomers: e.target.value,
                      }))
                    }
                    className={inputClass}
                    placeholder="1000"
                  />
                </div>
                <div>
                  <label
                    htmlFor="trackNew"
                    className="block text-base font-bold text-black mb-1"
                  >
                    New
                  </label>
                  <input
                    id="trackNew"
                    type="number"
                    min={0}
                    value={monthForm.newCustomers}
                    onChange={(e) =>
                      setMonthForm((f) => ({
                        ...f,
                        newCustomers: e.target.value,
                      }))
                    }
                    className={inputClass}
                    placeholder="150"
                  />
                </div>
                <div>
                  <label
                    htmlFor="trackEnd"
                    className="block text-base font-bold text-black mb-1"
                  >
                    End
                  </label>
                  <input
                    id="trackEnd"
                    type="number"
                    min={0}
                    value={monthForm.endCustomers}
                    onChange={(e) =>
                      setMonthForm((f) => ({
                        ...f,
                        endCustomers: e.target.value,
                      }))
                    }
                    className={inputClass}
                    placeholder="1050"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={addMonth}
                    disabled={months.length >= 12}
                    className={btnPrimary + " w-full"}
                  >
                    {months.length >= 12 ? "Max 12" : "Add"}
                  </button>
                </div>
              </div>

              {/* Monthly data table */}
              {months.length > 0 && (
                <div className="overflow-x-auto mb-8">
                  <table className="w-full text-base">
                    <thead>
                      <tr className="border-b-2 border-black">
                        <th className="text-left py-3 pr-4 font-bold text-black">
                          Month
                        </th>
                        <th className="text-right py-3 px-4 font-bold text-black">
                          Start
                        </th>
                        <th className="text-right py-3 px-4 font-bold text-black">
                          New
                        </th>
                        <th className="text-right py-3 px-4 font-bold text-black">
                          End
                        </th>
                        <th className="text-right py-3 px-4 font-bold text-black">
                          Retention
                        </th>
                        <th className="text-right py-3 pl-4 font-bold text-black">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {months.map((m, i) => (
                        <tr
                          key={i}
                          className="border-b border-neutral-200 hover:bg-neutral-50 transition-colors motion-reduce:transition-none"
                        >
                          <td className="py-3 pr-4 font-bold text-black">
                            {m.month}
                          </td>
                          <td className="py-3 px-4 text-right text-neutral-600">
                            {m.startCustomers}
                          </td>
                          <td className="py-3 px-4 text-right text-neutral-600">
                            {m.newCustomers}
                          </td>
                          <td className="py-3 px-4 text-right text-neutral-600">
                            {m.endCustomers}
                          </td>
                          <td className="py-3 px-4 text-right font-bold text-black">
                            {pct(monthlyRetentionRates[i])}
                          </td>
                          <td className="py-3 pl-4 text-right">
                            <button
                              type="button"
                              onClick={() => removeMonth(i)}
                              className="text-base text-neutral-400 hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                              aria-label={`Remove ${m.month}`}
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* SVG Line Chart */}
              {months.length >= 2 && (
                <RetentionChart
                  labels={months.map((m) => m.month)}
                  values={monthlyRetentionRates}
                />
              )}

              {months.length < 2 && months.length > 0 && (
                <p className="text-base text-neutral-400 mt-4">
                  Add at least 2 months to see the trend chart.
                </p>
              )}
            </Animate>
          </div>
        </section>
      )}

      {/* Cohort Analysis Tab */}
      {activeTab === "cohorts" && (
        <section className="px-6 lg:px-12 py-8">
          <div className="max-w-5xl mx-auto">
            <Animate animation="fade-up">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-2">
                Cohort Analysis
              </h2>
              <p className="text-base text-neutral-500 mb-6">
                Track how different customer cohorts retain over time. Enter the
                cohort label, starting size, and a comma-separated list of
                retained customers for each subsequent period.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
                <div>
                  <label
                    htmlFor="cohortLabel"
                    className="block text-base font-bold text-black mb-1"
                  >
                    Cohort Label
                  </label>
                  <input
                    id="cohortLabel"
                    type="text"
                    value={cohortForm.label}
                    onChange={(e) =>
                      setCohortForm((f) => ({ ...f, label: e.target.value }))
                    }
                    className={inputClass}
                    placeholder="e.g. Jan 2025"
                  />
                </div>
                <div>
                  <label
                    htmlFor="cohortSize"
                    className="block text-base font-bold text-black mb-1"
                  >
                    Start Size
                  </label>
                  <input
                    id="cohortSize"
                    type="number"
                    min={1}
                    value={cohortForm.startSize}
                    onChange={(e) =>
                      setCohortForm((f) => ({
                        ...f,
                        startSize: e.target.value,
                      }))
                    }
                    className={inputClass}
                    placeholder="100"
                  />
                </div>
                <div>
                  <label
                    htmlFor="cohortRetained"
                    className="block text-base font-bold text-black mb-1"
                  >
                    Retained (comma-separated)
                  </label>
                  <input
                    id="cohortRetained"
                    type="text"
                    value={cohortForm.retained}
                    onChange={(e) =>
                      setCohortForm((f) => ({
                        ...f,
                        retained: e.target.value,
                      }))
                    }
                    className={inputClass}
                    placeholder="85, 72, 60, 50"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={addCohort}
                    className={btnPrimary + " w-full"}
                  >
                    Add Cohort
                  </button>
                </div>
              </div>

              {/* Cohort table */}
              {cohorts.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="w-full text-base">
                    <thead>
                      <tr className="border-b-2 border-black">
                        <th className="text-left py-3 pr-4 font-bold text-black">
                          Cohort
                        </th>
                        <th className="text-right py-3 px-4 font-bold text-black">
                          Start
                        </th>
                        {Array.from({
                          length: Math.max(
                            ...cohorts.map((c) => c.retained.length)
                          ),
                        }).map((_, i) => (
                          <th
                            key={i}
                            className="text-right py-3 px-4 font-bold text-black"
                          >
                            M{i + 1}
                          </th>
                        ))}
                        <th className="text-right py-3 pl-4 font-bold text-black">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {cohorts.map((c, ci) => {
                        const maxCols = Math.max(
                          ...cohorts.map((co) => co.retained.length)
                        );
                        return (
                          <tr
                            key={ci}
                            className="border-b border-neutral-200"
                          >
                            <td className="py-3 pr-4 font-bold text-black">
                              {c.label}
                            </td>
                            <td className="py-3 px-4 text-right text-neutral-600">
                              {c.startSize}
                            </td>
                            {Array.from({ length: maxCols }).map((_, ri) => {
                              const val = c.retained[ri];
                              const retPct =
                                val !== undefined
                                  ? (val / c.startSize) * 100
                                  : undefined;
                              return (
                                <td key={ri} className="py-3 px-4 text-right">
                                  {retPct !== undefined ? (
                                    <span
                                      className="inline-block px-2 py-1 text-base font-bold"
                                      style={{
                                        backgroundColor: `rgba(0,0,0,${clamp(retPct / 100, 0.05, 0.9)})`,
                                        color: retPct > 50 ? "#fff" : "#000",
                                      }}
                                    >
                                      {pct(retPct)}
                                    </span>
                                  ) : (
                                    <span className="text-neutral-300">
                                      --
                                    </span>
                                  )}
                                </td>
                              );
                            })}
                            <td className="py-3 pl-4 text-right">
                              <button
                                type="button"
                                onClick={() => removeCohort(ci)}
                                className="text-base text-neutral-400 hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                                aria-label={`Remove ${c.label}`}
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              {cohorts.length === 0 && (
                <div className="border border-neutral-200 p-8 text-center">
                  <p className="text-base text-neutral-400">
                    No cohorts added yet. Add your first cohort above to start
                    tracking retention by group.
                  </p>
                </div>
              )}
            </Animate>
          </div>
        </section>
      )}

      {/* Benchmarks Tab */}
      {activeTab === "benchmarks" && (
        <section className="px-6 lg:px-12 py-8">
          <div className="max-w-5xl mx-auto">
            <Animate animation="fade-up">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-2">
                Industry Benchmarks
              </h2>
              <p className="text-base text-neutral-500 mb-8">
                Compare your retention rate against industry averages. Your
                current retention rate is highlighted for easy comparison.
              </p>
            </Animate>

            <Stagger
              stagger={80}
              animation="fade-up"
              className="space-y-4"
            >
              {INDUSTRY_BENCHMARKS.map((b) => {
                const yourRate = clamp(retentionRate, 0, 100);
                return (
                  <div
                    key={b.industry}
                    className="border border-neutral-200 p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 motion-reduce:transition-none"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span className="text-base font-bold text-black">
                        {b.industry}
                      </span>
                      <span className="text-base font-bold text-neutral-500">
                        {b.retention}% avg retention
                      </span>
                    </div>
                    <div className="w-full h-6 bg-neutral-100 relative">
                      {/* Industry benchmark bar */}
                      <div
                        className="h-full bg-neutral-300 transition-all duration-700 motion-reduce:transition-none"
                        style={{ width: `${b.retention}%` }}
                      />
                      {/* Your rate marker */}
                      {sc > 0 && (
                        <div
                          className="absolute top-0 h-full w-0.5 bg-black transition-all duration-700 motion-reduce:transition-none"
                          style={{ left: `${yourRate}%` }}
                          title={`Your rate: ${pct(yourRate)}`}
                        />
                      )}
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-base text-neutral-400">0%</span>
                      {sc > 0 && (
                        <span className="text-base font-bold text-black">
                          You: {pct(yourRate)}
                        </span>
                      )}
                      <span className="text-base text-neutral-400">100%</span>
                    </div>
                  </div>
                );
              })}
            </Stagger>
          </div>
        </section>
      )}

      {/* Scenario Planner Tab */}
      {activeTab === "scenario" && (
        <section className="px-6 lg:px-12 py-8">
          <div className="max-w-5xl mx-auto">
            <Animate animation="fade-up">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-2">
                Improvement Scenario Planner
              </h2>
              <p className="text-base text-neutral-500 mb-8">
                Model what happens when you improve retention. Even small gains
                compound into significant revenue over time.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Slider input */}
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="improvementSlider"
                      className="block text-base font-bold text-black mb-2"
                    >
                      Retention Improvement
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        id="improvementSlider"
                        type="range"
                        min={0}
                        max={30}
                        step={1}
                        value={improvementPct}
                        onChange={(e) => setImprovementPct(e.target.value)}
                        className="flex-1 accent-black h-2 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                      />
                      <span className="text-base font-bold text-black w-16 text-right">
                        +{improvementPct}%
                      </span>
                    </div>
                  </div>

                  <div className="border border-neutral-200 p-6 space-y-4">
                    <div className="flex justify-between">
                      <span className="text-base text-neutral-500">
                        Current Retention
                      </span>
                      <span className="text-base font-bold text-black">
                        {pct(clamp(retentionRate, 0, 100))}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-base text-neutral-500">
                        Improved Retention
                      </span>
                      <span className="text-base font-bold text-black">
                        {pct(clamp(improvedRetention, 0, 100))}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-base text-neutral-500">
                        Current Churn
                      </span>
                      <span className="text-base font-bold text-black">
                        {pct(clamp(churnRate, 0, 100))}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-base text-neutral-500">
                        Improved Churn
                      </span>
                      <span className="text-base font-bold text-black">
                        {pct(clamp(improvedChurn, 0, 100))}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-base text-neutral-500">
                        Current Lifetime
                      </span>
                      <span className="text-base font-bold text-black">
                        {isFinite(customerLifetime)
                          ? fmtNum(customerLifetime) + " mo"
                          : "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-base text-neutral-500">
                        Improved Lifetime
                      </span>
                      <span className="text-base font-bold text-black">
                        {isFinite(improvedLifetime)
                          ? fmtNum(improvedLifetime) + " mo"
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Revenue impact */}
                <div className="space-y-6">
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black">
                    Revenue Impact
                  </h3>

                  {ar > 0 ? (
                    <div className="space-y-4">
                      <div className="border border-neutral-200 p-6 text-center">
                        <p className="text-base text-neutral-500 mb-1">
                          Additional Revenue per Customer (Annual)
                        </p>
                        <p className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2.5rem)] font-extrabold text-black">
                          {fmtMoney(revenueGainPerCustomer)}
                        </p>
                      </div>

                      <div className="border-2 border-black p-6 text-center">
                        <p className="text-base text-neutral-500 mb-1">
                          Total Revenue Gain ({sc} customers)
                        </p>
                        <p className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2.5rem)] font-extrabold text-black">
                          {fmtMoney(totalRevenueGain)}
                        </p>
                      </div>

                      <p className="text-base text-neutral-400">
                        This projection estimates the annual revenue difference
                        between your current retention rate and the improved
                        rate, across your starting customer base.
                      </p>
                    </div>
                  ) : (
                    <div className="border border-neutral-200 p-8 text-center">
                      <p className="text-base text-neutral-400">
                        Enter an average revenue per customer in the Calculator
                        tab to see projected revenue impact here.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </Animate>
          </div>
        </section>
      )}

      {/* Educational Section */}
      <section className="px-6 lg:px-12 py-16">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Strategy</SectionLabel>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-black tracking-tight mb-4">
              6 Proven Customer Retention Strategies
            </h2>
            <SectionDesc>
              Acquiring a new customer costs 5-7x more than retaining an
              existing one. These strategies help you keep more of the customers
              you have already earned.
            </SectionDesc>
          </Animate>

          <Stagger
            stagger={100}
            animation="fade-up"
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10"
          >
            {RETENTION_STRATEGIES.map((strategy, i) => (
              <div
                key={strategy.title}
                className="border border-neutral-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
              >
                <div className="flex items-start gap-4">
                  <span className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black shrink-0">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">
                      {strategy.title}
                    </h3>
                    <p className="text-base text-neutral-600 leading-relaxed">
                      {strategy.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Ready to Improve Your Customer Retention?
            </h2>
            <p className="text-lg text-neutral-400 mt-4 mb-8">
              Our team builds retention strategies, loyalty programs, and
              lifecycle campaigns that turn one-time buyers into long-term
              customers. Let us help you reduce churn and grow lifetime value.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-neutral-100 transition-colors motion-reduce:transition-none min-h-[44px] focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              Get a Free Consultation &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    
      <ToolCTA
        toolName="Retention Calculator"
        services={[
          { title: "Digital Marketing", desc: "Full-service digital marketing strategy for measurable business growth.", href: "/services/digital-marketing" },
          { title: "SEO", desc: "Organic search strategies that deliver compounding traffic over time.", href: "/services/seo" },
          { title: "Performance Marketing", desc: "Paid campaigns optimized for maximum return on ad spend.", href: "/services/performance-marketing" },
        ]}
        relatedTools={[
          { title: "Quarterly Review", href: "/resources/quarterly-review" },
          { title: "Redesign Planner", href: "/resources/redesign-planner" },
          { title: "Risk Assessment", href: "/resources/risk-assessment" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}

/* ------------------------------------------------------------------ */
/*  Metric Card                                                        */
/* ------------------------------------------------------------------ */

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-neutral-200 p-4">
      <p className="text-base text-neutral-500 mb-1">{label}</p>
      <p className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black">
        {value}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SVG Retention Chart                                                */
/* ------------------------------------------------------------------ */

function RetentionChart({
  labels,
  values,
}: {
  labels: string[];
  values: number[];
}) {
  const width = 700;
  const height = 340;
  const padLeft = 56;
  const padRight = 24;
  const padTop = 24;
  const padBottom = 40;
  const chartW = width - padLeft - padRight;
  const chartH = height - padTop - padBottom;

  const maxVal = Math.max(100, ...values);
  const minVal = Math.min(0, ...values);
  const range = maxVal - minVal || 1;

  const points = values.map((v, i) => ({
    x: padLeft + (i / (values.length - 1)) * chartW,
    y: padTop + chartH - ((clamp(v, minVal, maxVal) - minVal) / range) * chartH,
  }));

  const polyline = points.map((p) => `${p.x},${p.y}`).join(" ");

  /* Trend line via linear regression */
  const n = values.length;
  const sumX = values.reduce((a, _, i) => a + i, 0);
  const sumY = values.reduce((a, v) => a + v, 0);
  const sumXY = values.reduce((a, v, i) => a + i * v, 0);
  const sumXX = values.reduce((a, _, i) => a + i * i, 0);
  const denom = n * sumXX - sumX * sumX;
  const slope = denom !== 0 ? (n * sumXY - sumX * sumY) / denom : 0;
  const intercept = denom !== 0 ? (sumY - slope * sumX) / n : sumY / n;

  const trendStart = {
    x: padLeft,
    y:
      padTop +
      chartH -
      ((clamp(intercept, minVal, maxVal) - minVal) / range) * chartH,
  };
  const trendEnd = {
    x: padLeft + chartW,
    y:
      padTop +
      chartH -
      ((clamp(slope * (n - 1) + intercept, minVal, maxVal) - minVal) / range) *
        chartH,
  };

  /* Y-axis labels */
  const yTicks = [0, 25, 50, 75, 100].filter((t) => t >= minVal && t <= maxVal);

  return (
    <div className="mt-8">
      <p className="text-base font-bold text-black mb-3">
        Retention Rate Over Time
      </p>
      <div className="overflow-x-auto">
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label="Line chart showing retention rate over time"
          className="w-full max-w-[700px]"
        >
          {/* Grid lines */}
          {yTicks.map((tick) => {
            const y =
              padTop + chartH - ((tick - minVal) / range) * chartH;
            return (
              <g key={tick}>
                <line
                  x1={padLeft}
                  y1={y}
                  x2={padLeft + chartW}
                  y2={y}
                  stroke="#e5e5e5"
                  strokeWidth={1}
                />
                <text
                  x={padLeft - 8}
                  y={y + 5}
                  textAnchor="end"
                  className="text-base"
                  fill="#a3a3a3"
                  fontSize={16}
                >
                  {tick}%
                </text>
              </g>
            );
          })}

          {/* X-axis labels */}
          {labels.map((label, i) => (
            <text
              key={i}
              x={padLeft + (i / (labels.length - 1)) * chartW}
              y={height - 8}
              textAnchor="middle"
              className="text-base"
              fill="#a3a3a3"
              fontSize={16}
            >
              {label}
            </text>
          ))}

          {/* Trend line */}
          <line
            x1={trendStart.x}
            y1={trendStart.y}
            x2={trendEnd.x}
            y2={trendEnd.y}
            stroke="#d4d4d4"
            strokeWidth={2}
            strokeDasharray="8,4"
          />

          {/* Data line */}
          <polyline
            points={polyline}
            fill="none"
            stroke="#000"
            strokeWidth={2.5}
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* Data points */}
          {points.map((p, i) => (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r={5} fill="#000" />
              <text
                x={p.x}
                y={p.y - 12}
                textAnchor="middle"
                className="text-base"
                fill="#000"
                fontWeight="bold"
                fontSize={16}
              >
                {values[i].toFixed(1)}%
              </text>
            </g>
          ))}

          {/* Legend */}
          <line
            x1={padLeft}
            y1={height - 2}
            x2={padLeft + 20}
            y2={height - 2}
            stroke="#000"
            strokeWidth={2.5}
          />
          <text
            x={padLeft + 26}
            y={height}
            className="text-base"
            fill="#737373"
            fontSize={16}
          >
            Retention
          </text>
          <line
            x1={padLeft + 120}
            y1={height - 2}
            x2={padLeft + 140}
            y2={height - 2}
            stroke="#d4d4d4"
            strokeWidth={2}
            strokeDasharray="8,4"
          />
          <text
            x={padLeft + 146}
            y={height}
            className="text-base"
            fill="#737373"
            fontSize={16}
          >
            Trend
          </text>
        </svg>
      </div>
    </div>
  );
}
