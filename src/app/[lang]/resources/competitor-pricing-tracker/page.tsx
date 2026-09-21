"use client";

import { useState, useMemo } from "react";
import { JsonLd } from "@/components/json-ld";

interface PricingTier {
  id: string;
  competitor: string;
  planName: string;
  monthlyPrice: number;
  annualPrice: number;
  features: string;
  target: string;
  notes: string;
}

let nextId = 1;

function fmtCurrency(n: number): string {
  return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 0 });
}

export default function CompetitorPricingTrackerPage() {
  const [tiers, setTiers] = useState<PricingTier[]>([]);
  const [form, setForm] = useState({
    competitor: "",
    planName: "",
    monthlyPrice: "",
    annualPrice: "",
    features: "",
    target: "",
    notes: "",
  });
  const [filterCompetitor, setFilterCompetitor] = useState("All");

  function addTier() {
    if (!form.competitor || !form.planName) return;
    setTiers((prev) => [
      ...prev,
      {
        id: String(nextId++),
        competitor: form.competitor,
        planName: form.planName,
        monthlyPrice: parseFloat(form.monthlyPrice) || 0,
        annualPrice: parseFloat(form.annualPrice) || 0,
        features: form.features,
        target: form.target,
        notes: form.notes,
      },
    ]);
    setForm((f) => ({ ...f, planName: "", monthlyPrice: "", annualPrice: "", features: "", target: "", notes: "" }));
  }

  function removeTier(id: string) {
    setTiers((prev) => prev.filter((t) => t.id !== id));
  }

  const competitors = useMemo(
    () => [...new Set(tiers.map((t) => t.competitor))],
    [tiers]
  );

  const filtered = useMemo(
    () =>
      filterCompetitor === "All"
        ? tiers
        : tiers.filter((t) => t.competitor === filterCompetitor),
    [tiers, filterCompetitor]
  );

  const priceRange = useMemo(() => {
    if (tiers.length === 0) return { min: 0, max: 0, avg: 0 };
    const prices = tiers.map((t) => t.monthlyPrice).filter((p) => p > 0);
    if (prices.length === 0) return { min: 0, max: 0, avg: 0 };
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
      avg: Math.round(prices.reduce((s, p) => s + p, 0) / prices.length),
    };
  }, [tiers]);

  function handleExport() {
    const header = "Competitor,Plan,Monthly Price,Annual Price,Target,Features,Notes";
    const rows = tiers.map(
      (t) =>
        `"${t.competitor}","${t.planName}",${t.monthlyPrice},${t.annualPrice},"${t.target}","${t.features}","${t.notes}"`
    );
    const summary = [
      "",
      "MARKET SUMMARY",
      `Competitors Tracked: ${competitors.length}`,
      `Total Plans: ${tiers.length}`,
      `Price Range: ${fmtCurrency(priceRange.min)} - ${fmtCurrency(priceRange.max)}/mo`,
      `Average Price: ${fmtCurrency(priceRange.avg)}/mo`,
    ];
    const csv = [header, ...rows, ...summary].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "competitor-pricing.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="min-h-screen bg-white text-black">
      <nav className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-8" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-base text-neutral-400">
          <li><a href="/" className="hover:text-black transition-colors">Home</a></li>
          <li aria-hidden="true">/</li>
          <li><a href="/resources" className="hover:text-black transition-colors">Resources</a></li>
          <li aria-hidden="true">/</li>
          <li className="text-black" aria-current="page">Competitor Pricing Tracker</li>
        </ol>
      </nav>
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-2">
          Competitor Pricing Tracker
        </h1>
        <p className="text-lg text-neutral-600 mb-10">
          Track competitor pricing, features, and positioning. Compare plans and
          identify market gaps.
        </p>

        {/* Market overview */}
        {tiers.length > 0 && (
          <div className="mb-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="rounded-lg border border-neutral-200 p-4 text-center">
              <p className="text-2xl font-bold">{competitors.length}</p>
              <p className="text-base text-neutral-500">Competitors</p>
            </div>
            <div className="rounded-lg border border-neutral-200 p-4 text-center">
              <p className="text-2xl font-bold">{tiers.length}</p>
              <p className="text-base text-neutral-500">Plans Tracked</p>
            </div>
            <div className="rounded-lg border border-neutral-200 p-4 text-center">
              <p className="text-2xl font-bold">{fmtCurrency(priceRange.min)}-{fmtCurrency(priceRange.max)}</p>
              <p className="text-base text-neutral-500">Price Range /mo</p>
            </div>
            <div className="rounded-lg border border-neutral-200 p-4 text-center">
              <p className="text-2xl font-bold">{fmtCurrency(priceRange.avg)}</p>
              <p className="text-base text-neutral-500">Avg Price /mo</p>
            </div>
          </div>
        )}

        {/* Add form */}
        <div className="mb-8 rounded-lg border border-neutral-200 p-5">
          <h2 className="text-lg font-bold mb-4">Add Pricing Tier</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="block text-base font-semibold mb-1">Competitor</label>
              <input
                type="text"
                value={form.competitor}
                onChange={(e) => setForm((f) => ({ ...f, competitor: e.target.value }))}
                className="w-full rounded-md border border-neutral-300 px-3 py-2 text-base focus-visible:border-black focus-visible:outline-none"
                placeholder="e.g. Acme Corp"
                list="competitor-list"
              />
              <datalist id="competitor-list">
                {competitors.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </div>
            <div>
              <label className="block text-base font-semibold mb-1">Plan Name</label>
              <input
                type="text"
                value={form.planName}
                onChange={(e) => setForm((f) => ({ ...f, planName: e.target.value }))}
                className="w-full rounded-md border border-neutral-300 px-3 py-2 text-base focus-visible:border-black focus-visible:outline-none"
                placeholder="e.g. Pro, Enterprise"
              />
            </div>
            <div>
              <label className="block text-base font-semibold mb-1">Monthly Price ($)</label>
              <input
                type="number"
                value={form.monthlyPrice}
                onChange={(e) => setForm((f) => ({ ...f, monthlyPrice: e.target.value }))}
                className="w-full rounded-md border border-neutral-300 px-3 py-2 text-base focus-visible:border-black focus-visible:outline-none"
                placeholder="99"
                min={0}
              />
            </div>
            <div>
              <label className="block text-base font-semibold mb-1">Annual Price ($)</label>
              <input
                type="number"
                value={form.annualPrice}
                onChange={(e) => setForm((f) => ({ ...f, annualPrice: e.target.value }))}
                className="w-full rounded-md border border-neutral-300 px-3 py-2 text-base focus-visible:border-black focus-visible:outline-none"
                placeholder="948"
                min={0}
              />
            </div>
            <div>
              <label className="block text-base font-semibold mb-1">Target Customer</label>
              <input
                type="text"
                value={form.target}
                onChange={(e) => setForm((f) => ({ ...f, target: e.target.value }))}
                className="w-full rounded-md border border-neutral-300 px-3 py-2 text-base focus-visible:border-black focus-visible:outline-none"
                placeholder="e.g. SMBs, Enterprise"
              />
            </div>
            <div>
              <label className="block text-base font-semibold mb-1">Key Features</label>
              <input
                type="text"
                value={form.features}
                onChange={(e) => setForm((f) => ({ ...f, features: e.target.value }))}
                className="w-full rounded-md border border-neutral-300 px-3 py-2 text-base focus-visible:border-black focus-visible:outline-none"
                placeholder="Feature 1, Feature 2"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-base font-semibold mb-1">Notes</label>
            <input
              type="text"
              value={form.notes}
              onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
              className="w-full rounded-md border border-neutral-300 px-3 py-2 text-base focus-visible:border-black focus-visible:outline-none"
              placeholder="Strengths, weaknesses, positioning"
            />
          </div>
          <button
            onClick={addTier}
            className="mt-4 rounded-md bg-black px-6 py-2 text-base font-semibold text-white hover:bg-neutral-800 transition-colors"
          >
            Add Tier
          </button>
        </div>

        {/* Filter & table */}
        {tiers.length > 0 && (
          <>
            <div className="mb-4 flex items-center gap-4">
              <select
                value={filterCompetitor}
                onChange={(e) => setFilterCompetitor(e.target.value)}
                className="rounded-md border border-neutral-300 px-3 py-2 text-base focus-visible:border-black focus-visible:outline-none"
              >
                <option value="All">All Competitors</option>
                {competitors.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="mb-8 overflow-x-auto">
              <table className="w-full text-base">
                <thead>
                  <tr className="border-b-2 border-black text-left">
                    <th className="pb-2 pr-4 font-semibold">Competitor</th>
                    <th className="pb-2 pr-4 font-semibold">Plan</th>
                    <th className="pb-2 pr-4 font-semibold text-right">Monthly</th>
                    <th className="pb-2 pr-4 font-semibold text-right">Annual</th>
                    <th className="pb-2 pr-4 font-semibold">Target</th>
                    <th className="pb-2 pr-4 font-semibold">Features</th>
                    <th className="pb-2 font-semibold"></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((t) => (
                    <tr key={t.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                      <td className="py-2 pr-4 font-semibold">{t.competitor}</td>
                      <td className="py-2 pr-4">{t.planName}</td>
                      <td className="py-2 pr-4 text-right">{fmtCurrency(t.monthlyPrice)}</td>
                      <td className="py-2 pr-4 text-right">{fmtCurrency(t.annualPrice)}</td>
                      <td className="py-2 pr-4">{t.target || "—"}</td>
                      <td className="py-2 pr-4 text-neutral-500 max-w-48 truncate">{t.features || "—"}</td>
                      <td className="py-2">
                        <button
                          onClick={() => removeTier(t.id)}
                          className="text-neutral-400 hover:text-black text-base"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button
              onClick={handleExport}
              className="rounded-md bg-black px-6 py-2 text-base font-semibold text-white hover:bg-neutral-800 transition-colors"
            >
              Export CSV
            </button>
          </>
        )}

        {tiers.length === 0 && (
          <div className="rounded-lg border-2 border-dashed border-neutral-200 p-12 text-center">
            <p className="text-lg text-neutral-500">
              Start tracking competitor pricing by adding their plans above.
              Compare pricing, features, and market positioning.
            </p>
          </div>
        )}
      </div>
          <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Competitor Pricing Tracker",
          description: "Track competitor pricing, features, and positioning across products and tiers. Compare plans and identify market gaps.",
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
