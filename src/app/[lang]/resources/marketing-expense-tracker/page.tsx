"use client";
import Link from "next/link";

import { useState, useMemo } from "react";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

const CHANNELS = [
  "Google Ads",
  "Meta Ads",
  "LinkedIn Ads",
  "TikTok Ads",
  "SEO",
  "Content Marketing",
  "Email Marketing",
  "Social Media",
  "Influencer",
  "Events",
  "PR",
  "Tools & Software",
  "Other",
] as const;

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
] as const;

interface Expense {
  id: string;
  channel: string;
  campaign: string;
  amount: number;
  month: number;
  description: string;
}

let nextId = 1;

function fmtCurrency(n: number): string {
  return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}



export default function MarketingExpenseTrackerPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [budget, setBudget] = useState<number>(10000);
  const [form, setForm] = useState({
    channel: "Google Ads",
    campaign: "",
    amount: "",
    month: new Date().getMonth(),
    description: "",
  });
  const [filterChannel, setFilterChannel] = useState("All");
  const [filterMonth, setFilterMonth] = useState(-1);
  const [view, setView] = useState<"table" | "chart">("table");

  function addExpense() {
    const amount = parseFloat(form.amount);
    if (!amount || amount <= 0) return;
    setExpenses((prev) => [
      ...prev,
      {
        id: String(nextId++),
        channel: form.channel,
        campaign: form.campaign,
        amount,
        month: form.month,
        description: form.description,
      },
    ]);
    setForm((f) => ({ ...f, campaign: "", amount: "", description: "" }));
  }

  function removeExpense(id: string) {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  }

  const filtered = useMemo(() => {
    return expenses.filter((e) => {
      if (filterChannel !== "All" && e.channel !== filterChannel) return false;
      if (filterMonth >= 0 && e.month !== filterMonth) return false;
      return true;
    });
  }, [expenses, filterChannel, filterMonth]);

  const totalSpend = useMemo(
    () => expenses.reduce((s, e) => s + e.amount, 0),
    [expenses]
  );

  const filteredTotal = useMemo(
    () => filtered.reduce((s, e) => s + e.amount, 0),
    [filtered]
  );

  const channelBreakdown = useMemo(() => {
    const map: Record<string, number> = {};
    expenses.forEach((e) => {
      map[e.channel] = (map[e.channel] || 0) + e.amount;
    });
    return Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .map(([channel, amount]) => ({
        channel,
        amount,
        pct: totalSpend > 0 ? (amount / totalSpend) * 100 : 0,
      }));
  }, [expenses, totalSpend]);

  const monthlyBreakdown = useMemo(() => {
    const arr = Array(12).fill(0);
    expenses.forEach((e) => {
      arr[e.month] += e.amount;
    });
    return arr as number[];
  }, [expenses]);

  const maxMonthly = Math.max(...monthlyBreakdown, 1);

  function handleExport() {
    const header = "Channel,Campaign,Amount,Month,Description";
    const rows = expenses.map(
      (e) =>
        `"${e.channel}","${e.campaign}",${e.amount},"${MONTHS[e.month]}","${e.description}"`
    );
    const summary = [
      "",
      "SUMMARY",
      `Total Spend,${totalSpend}`,
      `Monthly Budget,${budget}`,
      `Remaining,${budget * 12 - totalSpend}`,
      "",
      "CHANNEL BREAKDOWN",
      ...channelBreakdown.map((c) => `"${c.channel}",${c.amount},${c.pct.toFixed(1)}%`),
    ];
    const csv = [header, ...rows, ...summary].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "marketing-expenses.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  const budgetUsedPct = budget > 0 ? (totalSpend / (budget * 12)) * 100 : 0;

  return (
    <main className="min-h-screen bg-white text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Marketing Expense Tracker",
          description: "Track marketing expenses by channel, campaign, and month. Visualise spend distribution, monitor budgets, and export reports.",
          url: "https://themarkitmedia.com/en/resources/marketing-expense-tracker",
          applicationCategory: "Marketing Tool",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          provider: { "@type": "Organization", name: "Markit Media", url: "https://themarkitmedia.com" },
        }) }}
      />
      <title>Marketing Expense Tracker | Free Marketing Tool — Markit Media</title>
      <meta name="description" content="Track marketing expenses by channel, campaign, and month. Visualise spend distribution, monitor budgets, and export reports." />
      <nav className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-8" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-base text-neutral-400">
          <li><Link href="/" className="hover:text-black transition-colors">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/resources" className="hover:text-black transition-colors">Resources</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-black" aria-current="page">Marketing Expense Tracker</li>
        </ol>
      </nav>
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-2">
          Marketing Expense Tracker
        </h1>
        <p className="text-lg text-neutral-600 mb-10">
          Track spend by channel, campaign, and month. Monitor budgets and export
          reports.
        </p>

        {/* Budget setting */}
        <div className="mb-8 rounded-lg border border-neutral-200 p-5">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <label className="block text-base font-semibold mb-1">
                Monthly Budget
              </label>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold">$</span>
                <input
                  type="number"
                  value={budget}
                  onChange={(e) =>
                    setBudget(Math.max(0, parseInt(e.target.value) || 0))
                  }
                  className="w-40 rounded-md border border-neutral-300 px-3 py-2 text-base focus-visible:border-black focus-visible:outline-none"
                  min={0}
                  step={500}
                />
                <span className="text-base text-neutral-500">
                  / month ({fmtCurrency(budget * 12)} annual)
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-base text-neutral-500">Total Spend</p>
              <p className="text-2xl font-bold">{fmtCurrency(totalSpend)}</p>
            </div>
          </div>
          {/* Budget bar */}
          <div className="mt-4">
            <div className="flex justify-between text-base mb-1">
              <span>Annual budget used</span>
              <span className="font-semibold">
                {budgetUsedPct.toFixed(1)}%
              </span>
            </div>
            <div className="h-3 w-full rounded-full bg-neutral-100">
              <div
                className={`h-3 rounded-full transition-all ${
                  budgetUsedPct > 100 ? "bg-red-600" : "bg-black"
                }`}
                style={{ width: `${Math.min(budgetUsedPct, 100)}%` }}
              />
            </div>
            {budgetUsedPct > 100 && (
              <p className="text-base text-red-600 font-semibold mt-1">
                Over budget by {fmtCurrency(totalSpend - budget * 12)}
              </p>
            )}
          </div>
        </div>

        {/* Add expense form */}
        <div className="mb-8 rounded-lg border border-neutral-200 p-5">
          <h2 className="text-lg font-bold mb-4">Add Expense</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="block text-base font-semibold mb-1">
                Channel
              </label>
              <select
                value={form.channel}
                onChange={(e) =>
                  setForm((f) => ({ ...f, channel: e.target.value }))
                }
                className="w-full rounded-md border border-neutral-300 px-3 py-2 text-base focus-visible:border-black focus-visible:outline-none"
              >
                {CHANNELS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-base font-semibold mb-1">
                Campaign Name
              </label>
              <input
                type="text"
                value={form.campaign}
                onChange={(e) =>
                  setForm((f) => ({ ...f, campaign: e.target.value }))
                }
                className="w-full rounded-md border border-neutral-300 px-3 py-2 text-base focus-visible:border-black focus-visible:outline-none"
                placeholder="e.g. Q3 Brand Campaign"
              />
            </div>
            <div>
              <label className="block text-base font-semibold mb-1">
                Amount ($)
              </label>
              <input
                type="number"
                value={form.amount}
                onChange={(e) =>
                  setForm((f) => ({ ...f, amount: e.target.value }))
                }
                className="w-full rounded-md border border-neutral-300 px-3 py-2 text-base focus-visible:border-black focus-visible:outline-none"
                placeholder="0"
                min={0}
                step={50}
              />
            </div>
            <div>
              <label className="block text-base font-semibold mb-1">
                Month
              </label>
              <select
                value={form.month}
                onChange={(e) =>
                  setForm((f) => ({ ...f, month: parseInt(e.target.value) }))
                }
                className="w-full rounded-md border border-neutral-300 px-3 py-2 text-base focus-visible:border-black focus-visible:outline-none"
              >
                {MONTHS.map((m, i) => (
                  <option key={m} value={i}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2 lg:col-span-1">
              <label className="block text-base font-semibold mb-1">
                Note
              </label>
              <input
                type="text"
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                className="w-full rounded-md border border-neutral-300 px-3 py-2 text-base focus-visible:border-black focus-visible:outline-none"
                placeholder="Optional description"
              />
            </div>
          </div>
          <button
            onClick={addExpense}
            className="mt-4 rounded-md bg-black px-6 py-2 text-base font-semibold text-white hover:bg-neutral-800 transition-colors"
          >
            Add Expense
          </button>
        </div>

        {/* Filters & View toggle */}
        {expenses.length > 0 && (
          <>
            <div className="mb-6 flex flex-wrap items-center gap-4">
              <select
                value={filterChannel}
                onChange={(e) => setFilterChannel(e.target.value)}
                className="rounded-md border border-neutral-300 px-3 py-2 text-base focus-visible:border-black focus-visible:outline-none"
              >
                <option value="All">All Channels</option>
                {CHANNELS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <select
                value={filterMonth}
                onChange={(e) => setFilterMonth(parseInt(e.target.value))}
                className="rounded-md border border-neutral-300 px-3 py-2 text-base focus-visible:border-black focus-visible:outline-none"
              >
                <option value={-1}>All Months</option>
                {MONTHS.map((m, i) => (
                  <option key={m} value={i}>
                    {m}
                  </option>
                ))}
              </select>
              <div className="ml-auto flex gap-2">
                {(["table", "chart"] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setView(v)}
                    className={`rounded-md border px-4 py-2 text-base font-medium transition-colors ${
                      view === v
                        ? "border-black bg-black text-white"
                        : "border-neutral-300 hover:border-black"
                    }`}
                  >
                    {v === "table" ? "Table" : "Charts"}
                  </button>
                ))}
              </div>
            </div>

            {view === "table" && (
              <div className="mb-8 overflow-x-auto">
                <table className="w-full text-base">
                  <thead>
                    <tr className="border-b-2 border-black text-left">
                      <th className="pb-2 pr-4 font-semibold">Channel</th>
                      <th className="pb-2 pr-4 font-semibold">Campaign</th>
                      <th className="pb-2 pr-4 font-semibold">Month</th>
                      <th className="pb-2 pr-4 font-semibold text-right">
                        Amount
                      </th>
                      <th className="pb-2 pr-4 font-semibold">Note</th>
                      <th className="pb-2 font-semibold"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((e) => (
                      <tr
                        key={e.id}
                        className="border-b border-neutral-100 hover:bg-neutral-50"
                      >
                        <td className="py-2 pr-4">{e.channel}</td>
                        <td className="py-2 pr-4">{e.campaign || "—"}</td>
                        <td className="py-2 pr-4">{MONTHS[e.month]}</td>
                        <td className="py-2 pr-4 text-right font-semibold">
                          {fmtCurrency(e.amount)}
                        </td>
                        <td className="py-2 pr-4 text-neutral-500">
                          {e.description || "—"}
                        </td>
                        <td className="py-2">
                          <button
                            onClick={() => removeExpense(e.id)}
                            className="text-neutral-400 hover:text-black text-base"
                            aria-label="Remove"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-black">
                      <td
                        colSpan={3}
                        className="pt-2 font-bold text-base"
                      >
                        Total ({filtered.length} items)
                      </td>
                      <td className="pt-2 text-right font-bold text-base">
                        {fmtCurrency(filteredTotal)}
                      </td>
                      <td colSpan={2}></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}

            {view === "chart" && (
              <div className="mb-8 space-y-10">
                {/* Channel breakdown */}
                <div>
                  <h2 className="text-xl font-bold mb-4">
                    Spend by Channel
                  </h2>
                  <div className="space-y-3">
                    {channelBreakdown.map((c) => (
                      <div key={c.channel}>
                        <div className="flex justify-between text-base mb-1">
                          <span className="font-medium">{c.channel}</span>
                          <span className="font-semibold">
                            {fmtCurrency(c.amount)} ({c.pct.toFixed(1)}%)
                          </span>
                        </div>
                        <div className="h-4 w-full rounded-full bg-neutral-100">
                          <div
                            className="h-4 rounded-full bg-black transition-all"
                            style={{ width: `${c.pct}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Monthly trend */}
                <div>
                  <h2 className="text-xl font-bold mb-4">
                    Monthly Spend Trend
                  </h2>
                  <svg
                    viewBox="0 0 720 280"
                    className="w-full"
                    role="img"
                    aria-label="Monthly spend bar chart"
                  >
                    {monthlyBreakdown.map((val, i) => {
                      const barW = 40;
                      const gap = 20;
                      const x = i * (barW + gap) + 20;
                      const barH = (val / maxMonthly) * 200;
                      const y = 230 - barH;
                      return (
                        <g key={i}>
                          <rect
                            x={x}
                            y={y}
                            width={barW}
                            height={barH}
                            fill="black"
                            rx={4}
                          />
                          <text
                            x={x + barW / 2}
                            y={248}
                            textAnchor="middle"
                            fontSize="14"
                            fill="#666"
                          >
                            {MONTHS[i]}
                          </text>
                          {val > 0 && (
                            <text
                              x={x + barW / 2}
                              y={y - 6}
                              textAnchor="middle"
                              fontSize="14"
                              fontWeight="600"
                              fill="black"
                            >
                              {val >= 1000
                                ? `$${(val / 1000).toFixed(0)}k`
                                : `$${val}`}
                            </text>
                          )}
                        </g>
                      );
                    })}
                    {/* Budget line */}
                    {budget > 0 && (
                      <>
                        <line
                          x1={10}
                          x2={710}
                          y1={230 - (budget / maxMonthly) * 200}
                          y2={230 - (budget / maxMonthly) * 200}
                          stroke="#999"
                          strokeDasharray="6 4"
                          strokeWidth={1.5}
                        />
                        <text
                          x={712}
                          y={230 - (budget / maxMonthly) * 200 + 5}
                          fontSize="14"
                          fill="#999"
                        >
                          Budget
                        </text>
                      </>
                    )}
                  </svg>
                </div>
              </div>
            )}

            {/* Export */}
            <div className="flex gap-3">
              <button
                onClick={handleExport}
                className="rounded-md bg-black px-6 py-2 text-base font-semibold text-white hover:bg-neutral-800 transition-colors"
              >
                Export CSV
              </button>
            </div>
          </>
        )}

        {expenses.length === 0 && (
          <div className="rounded-lg border-2 border-dashed border-neutral-200 p-12 text-center">
            <p className="text-lg text-neutral-500">
              No expenses tracked yet. Add your first expense above to start
              monitoring your marketing spend.
            </p>
          </div>
        )}
      </div>
          <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Marketing Expense Tracker",
          description: "Track marketing expenses by channel, campaign, and month. Visualise spend distribution, monitor budgets, and export reports.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />
    
      
      {/* Related Tools */}
      <section className="px-6 lg:px-12 py-12" aria-label="Related tools">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">Related Tools</h2>
          <div className="flex flex-wrap gap-3">
                <Link href="/resources/marketing-budget-planner" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Budget Planner</Link>
                <Link href="/resources/budget-calculator" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Budget Calculator</Link>
                <Link href="/resources/budget-allocator" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Budget Allocator</Link>
                <Link href="/resources/pricing-calculator" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Pricing Calculator</Link>
          </div>
        </div>
      </section>
    
      <ToolCTA
        toolName="Marketing Expense Tracker"
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
