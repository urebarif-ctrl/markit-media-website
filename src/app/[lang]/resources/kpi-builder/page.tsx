"use client";

import { useState, useMemo } from "react";
import { JsonLd } from "@/components/json-ld";

const KPI_LIBRARY: {
  category: string;
  metrics: { name: string; unit: string; benchmark: string }[];
}[] = [
  {
    category: "Demand Generation",
    metrics: [
      { name: "Marketing Qualified Leads (MQLs)", unit: "count", benchmark: "varies" },
      { name: "Cost per Lead (CPL)", unit: "$", benchmark: "$30-100 B2B" },
      { name: "Lead-to-Customer Rate", unit: "%", benchmark: "2-5%" },
      { name: "Pipeline Contribution", unit: "$", benchmark: "30-50% of total" },
      { name: "Customer Acquisition Cost (CAC)", unit: "$", benchmark: "varies" },
    ],
  },
  {
    category: "Website Performance",
    metrics: [
      { name: "Organic Traffic", unit: "sessions", benchmark: "+10% MoM" },
      { name: "Conversion Rate", unit: "%", benchmark: "2-5%" },
      { name: "Bounce Rate", unit: "%", benchmark: "40-60%" },
      { name: "Pages per Session", unit: "count", benchmark: "2-3" },
      { name: "Avg Session Duration", unit: "seconds", benchmark: "120-180s" },
    ],
  },
  {
    category: "Email Marketing",
    metrics: [
      { name: "Open Rate", unit: "%", benchmark: "20-25%" },
      { name: "Click-Through Rate", unit: "%", benchmark: "2-5%" },
      { name: "Unsubscribe Rate", unit: "%", benchmark: "<0.5%" },
      { name: "Revenue per Email", unit: "$", benchmark: "varies" },
      { name: "List Growth Rate", unit: "%", benchmark: "2-5% monthly" },
    ],
  },
  {
    category: "Social Media",
    metrics: [
      { name: "Engagement Rate", unit: "%", benchmark: "1-5%" },
      { name: "Follower Growth", unit: "%", benchmark: "2-5% monthly" },
      { name: "Social Traffic", unit: "sessions", benchmark: "varies" },
      { name: "Share of Voice", unit: "%", benchmark: "varies" },
    ],
  },
  {
    category: "Paid Media",
    metrics: [
      { name: "Return on Ad Spend (ROAS)", unit: "x", benchmark: "3-5x" },
      { name: "Cost per Click (CPC)", unit: "$", benchmark: "$1-3" },
      { name: "Click-Through Rate (CTR)", unit: "%", benchmark: "2-5%" },
      { name: "Cost per Acquisition (CPA)", unit: "$", benchmark: "varies" },
      { name: "Quality Score", unit: "/10", benchmark: "7+" },
    ],
  },
  {
    category: "Content Marketing",
    metrics: [
      { name: "Organic Page Views", unit: "views", benchmark: "+10% MoM" },
      { name: "Avg Time on Page", unit: "seconds", benchmark: "180s+" },
      { name: "Backlinks Earned", unit: "count", benchmark: "5-20/month" },
      { name: "Content-Assisted Conversions", unit: "count", benchmark: "varies" },
    ],
  },
];

interface KPIEntry {
  id: string;
  name: string;
  category: string;
  unit: string;
  target: string;
  current: string;
  status: "on-track" | "at-risk" | "behind";
}

let nextId = 1;

export default function KPIBuilderPage() {
  const [kpis, setKpis] = useState<KPIEntry[]>([]);
  const [showLibrary, setShowLibrary] = useState(true);

  function addKPI(
    name: string,
    category: string,
    unit: string
  ) {
    setKpis((prev) => [
      ...prev,
      { id: String(nextId++), name, category, unit, target: "", current: "", status: "on-track" },
    ]);
  }

  function removeKPI(id: string) {
    setKpis((prev) => prev.filter((k) => k.id !== id));
  }

  function updateKPI(id: string, field: keyof KPIEntry, value: string) {
    setKpis((prev) =>
      prev.map((k) => (k.id === id ? { ...k, [field]: value } : k))
    );
  }

  const grouped = useMemo(() => {
    const map: Record<string, KPIEntry[]> = {};
    kpis.forEach((k) => {
      if (!map[k.category]) map[k.category] = [];
      map[k.category].push(k);
    });
    return map;
  }, [kpis]);

  const stats = useMemo(() => ({
    total: kpis.length,
    onTrack: kpis.filter((k) => k.status === "on-track").length,
    atRisk: kpis.filter((k) => k.status === "at-risk").length,
    behind: kpis.filter((k) => k.status === "behind").length,
  }), [kpis]);

  function handleExport() {
    const lines = [
      "MARKETING KPI DASHBOARD",
      "=".repeat(50),
      `Generated with Markit Media`,
      "",
      ...Object.entries(grouped).map(([cat, items]) => [
        `## ${cat}`,
        ...items.map(
          (k) =>
            `  ${k.name}: Current ${k.current || "—"} ${k.unit} / Target ${k.target || "—"} ${k.unit} [${k.status.toUpperCase()}]`
        ),
        "",
      ].join("\n")),
      "SUMMARY",
      "-".repeat(30),
      `Total KPIs: ${stats.total}`,
      `On Track: ${stats.onTrack}`,
      `At Risk: ${stats.atRisk}`,
      `Behind: ${stats.behind}`,
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "marketing-kpi-dashboard.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  const STATUS_COLORS = {
    "on-track": "bg-black text-white",
    "at-risk": "bg-neutral-500 text-white",
    behind: "bg-red-100 text-red-800",
  };

  return (
    <main className="min-h-screen bg-white text-black">
      <nav className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-8" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-base text-neutral-400">
          <li><a href="/" className="hover:text-black transition-colors">Home</a></li>
          <li aria-hidden="true">/</li>
          <li><a href="/resources" className="hover:text-black transition-colors">Resources</a></li>
          <li aria-hidden="true">/</li>
          <li className="text-black" aria-current="page">Marketing KPI Dashboard Builder</li>
        </ol>
      </nav>
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-2">
          Marketing KPI Dashboard Builder
        </h1>
        <p className="text-lg text-neutral-600 mb-10">
          Select metrics from our library, set targets, track progress, and
          build your custom dashboard.
        </p>

        {/* Stats */}
        {kpis.length > 0 && (
          <div className="mb-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="rounded-lg border border-neutral-200 p-4 text-center">
              <p className="text-2xl font-bold">{stats.total}</p>
              <p className="text-base text-neutral-500">Total KPIs</p>
            </div>
            <div className="rounded-lg border border-neutral-200 p-4 text-center">
              <p className="text-2xl font-bold">{stats.onTrack}</p>
              <p className="text-base text-neutral-500">On Track</p>
            </div>
            <div className="rounded-lg border border-neutral-200 p-4 text-center">
              <p className="text-2xl font-bold">{stats.atRisk}</p>
              <p className="text-base text-neutral-500">At Risk</p>
            </div>
            <div className="rounded-lg border border-neutral-200 p-4 text-center">
              <p className="text-2xl font-bold">{stats.behind}</p>
              <p className="text-base text-neutral-500">Behind</p>
            </div>
          </div>
        )}

        {/* Library toggle */}
        <button
          onClick={() => setShowLibrary(!showLibrary)}
          className="mb-6 rounded-md border border-black px-4 py-2 text-base font-medium hover:bg-black hover:text-white transition-colors"
        >
          {showLibrary ? "Hide KPI Library" : "Show KPI Library"}
        </button>

        {/* KPI Library */}
        {showLibrary && (
          <div className="mb-8 space-y-6">
            {KPI_LIBRARY.map((cat) => (
              <div key={cat.category}>
                <h2 className="text-lg font-bold mb-3">{cat.category}</h2>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {cat.metrics.map((m) => {
                    const added = kpis.some(
                      (k) => k.name === m.name && k.category === cat.category
                    );
                    return (
                      <button
                        key={m.name}
                        onClick={() =>
                          !added && addKPI(m.name, cat.category, m.unit)
                        }
                        disabled={added}
                        className={`rounded-md border p-3 text-left transition-colors ${
                          added
                            ? "border-black bg-black text-white"
                            : "border-neutral-300 hover:border-black"
                        }`}
                      >
                        <p className="text-base font-semibold">{m.name}</p>
                        <p className="text-base text-neutral-400">
                          Benchmark: {m.benchmark}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Dashboard */}
        {kpis.length > 0 && (
          <div className="space-y-6 mb-8">
            {Object.entries(grouped).map(([cat, items]) => (
              <div key={cat}>
                <h2 className="text-xl font-bold mb-3">{cat}</h2>
                <div className="space-y-3">
                  {items.map((kpi) => (
                    <div
                      key={kpi.id}
                      className="rounded-lg border border-neutral-200 p-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-base font-semibold">{kpi.name}</h3>
                            <span
                              className={`rounded-full px-3 py-0.5 text-base font-medium ${STATUS_COLORS[kpi.status]}`}
                            >
                              {kpi.status.replace("-", " ")}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-3">
                            <div>
                              <label className="block text-base text-neutral-500">
                                Current
                              </label>
                              <input
                                type="text"
                                value={kpi.current}
                                onChange={(e) =>
                                  updateKPI(kpi.id, "current", e.target.value)
                                }
                                className="w-28 rounded border border-neutral-300 px-2 py-1 text-base focus-visible:border-black focus-visible:outline-none"
                                placeholder="0"
                              />
                            </div>
                            <div>
                              <label className="block text-base text-neutral-500">
                                Target
                              </label>
                              <input
                                type="text"
                                value={kpi.target}
                                onChange={(e) =>
                                  updateKPI(kpi.id, "target", e.target.value)
                                }
                                className="w-28 rounded border border-neutral-300 px-2 py-1 text-base focus-visible:border-black focus-visible:outline-none"
                                placeholder="0"
                              />
                            </div>
                            <div>
                              <label className="block text-base text-neutral-500">
                                Status
                              </label>
                              <select
                                value={kpi.status}
                                onChange={(e) =>
                                  updateKPI(
                                    kpi.id,
                                    "status",
                                    e.target.value as KPIEntry["status"]
                                  )
                                }
                                className="rounded border border-neutral-300 px-2 py-1 text-base focus-visible:border-black focus-visible:outline-none"
                              >
                                <option value="on-track">On Track</option>
                                <option value="at-risk">At Risk</option>
                                <option value="behind">Behind</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => removeKPI(kpi.id)}
                          className="text-neutral-400 hover:text-black text-base"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <button
              onClick={handleExport}
              className="rounded-md bg-black px-6 py-2 text-base font-semibold text-white hover:bg-neutral-800 transition-colors"
            >
              Export Dashboard (.txt)
            </button>
          </div>
        )}

        {kpis.length === 0 && !showLibrary && (
          <div className="rounded-lg border-2 border-dashed border-neutral-200 p-12 text-center">
            <p className="text-lg text-neutral-500">
              Open the KPI Library to start building your dashboard.
            </p>
          </div>
        )}
      </div>
          <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Marketing KPI Dashboard Builder",
          description: "Build a custom KPI dashboard for your marketing team. Select metrics by function, set targets, track progress, and export reports.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />
    
      {/* CTA */}
      <section className="bg-black text-white px-6 lg:px-12 py-16 text-center">
        <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-extrabold mb-4">Need Expert Help?</h2>
        <p className="text-base text-neutral-300 mb-8 max-w-2xl mx-auto">Our team can help you implement these insights and drive measurable results for your business.</p>
        <a href="/contact" className="inline-block bg-white text-black font-bold px-8 py-3 text-base hover:bg-neutral-200 transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">Get in Touch</a>
      </section>
    </main>
  );
}
