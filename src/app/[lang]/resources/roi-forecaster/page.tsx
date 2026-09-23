"use client";
import Link from "next/link";

import { useState, useMemo } from "react";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

interface ChannelForecast {
  id: string;
  channel: string;
  monthlyBudget: number;
  cpc: number;
  conversionRate: number;
  avgOrderValue: number;
}

const CHANNEL_DEFAULTS: Record<string, { cpc: number; cr: number }> = {
  "Google Ads": { cpc: 2.5, cr: 3.5 },
  "Meta Ads": { cpc: 1.2, cr: 2.0 },
  "LinkedIn Ads": { cpc: 5.5, cr: 1.5 },
  "SEO (Organic)": { cpc: 0, cr: 4.0 },
  "Email Marketing": { cpc: 0, cr: 5.0 },
  "Content Marketing": { cpc: 0, cr: 3.0 },
  "TikTok Ads": { cpc: 0.8, cr: 1.2 },
};

let nextId = 1;

function fmtCurrency(n: number): string {
  if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `$${(n / 1000).toFixed(1)}k`;
  return `$${n.toFixed(0)}`;
}



export default function ROIForecasterPage() {
  const [channels, setChannels] = useState<ChannelForecast[]>([]);
  const [form, setForm] = useState({
    channel: "Google Ads",
    monthlyBudget: "",
    cpc: "",
    conversionRate: "",
    avgOrderValue: "",
  });
  const [months, setMonths] = useState(12);

  function addChannel() {
    const budget = parseFloat(form.monthlyBudget);
    if (!budget || budget <= 0) return;
    const defaults = CHANNEL_DEFAULTS[form.channel] || { cpc: 1, cr: 2 };
    setChannels((prev) => [
      ...prev,
      {
        id: String(nextId++),
        channel: form.channel,
        monthlyBudget: budget,
        cpc: parseFloat(form.cpc) || defaults.cpc,
        conversionRate: parseFloat(form.conversionRate) || defaults.cr,
        avgOrderValue: parseFloat(form.avgOrderValue) || 100,
      },
    ]);
    setForm((f) => ({ ...f, monthlyBudget: "", cpc: "", conversionRate: "", avgOrderValue: "" }));
  }

  function removeChannel(id: string) {
    setChannels((prev) => prev.filter((c) => c.id !== id));
  }

  const forecasts = useMemo(() => {
    return channels.map((ch) => {
      const isPaid = ch.cpc > 0;
      const monthlyClicks = isPaid ? Math.floor(ch.monthlyBudget / ch.cpc) : 0;
      const estimatedTraffic = isPaid ? monthlyClicks : Math.floor(ch.monthlyBudget * 10);
      const monthlyConversions = Math.floor(estimatedTraffic * (ch.conversionRate / 100));
      const monthlyRevenue = monthlyConversions * ch.avgOrderValue;
      const monthlyROI = ch.monthlyBudget > 0
        ? ((monthlyRevenue - ch.monthlyBudget) / ch.monthlyBudget) * 100
        : 0;
      return {
        ...ch,
        monthlyClicks: estimatedTraffic,
        monthlyConversions,
        monthlyRevenue,
        monthlyROI,
        annualBudget: ch.monthlyBudget * months,
        annualRevenue: monthlyRevenue * months,
        annualROI: monthlyROI,
      };
    });
  }, [channels, months]);

  const totals = useMemo(() => {
    const totalBudget = forecasts.reduce((s, f) => s + f.annualBudget, 0);
    const totalRevenue = forecasts.reduce((s, f) => s + f.annualRevenue, 0);
    const totalConversions = forecasts.reduce(
      (s, f) => s + f.monthlyConversions * months,
      0
    );
    const totalROI = totalBudget > 0
      ? ((totalRevenue - totalBudget) / totalBudget) * 100
      : 0;
    return { totalBudget, totalRevenue, totalConversions, totalROI };
  }, [forecasts, months]);

  const maxRevenue = Math.max(...forecasts.map((f) => f.monthlyRevenue), 1);

  function handleExport() {
    const lines = [
      "MARKETING ROI FORECAST",
      "=".repeat(50),
      `Forecast Period: ${months} months`,
      `Generated with Markit Media`,
      "",
      "CHANNEL FORECASTS",
      "-".repeat(40),
      ...forecasts.map(
        (f) =>
          `${f.channel}\n  Budget: ${fmtCurrency(f.monthlyBudget)}/mo (${fmtCurrency(f.annualBudget)} total)\n  Est. Traffic: ${f.monthlyClicks}/mo\n  Conversions: ${f.monthlyConversions}/mo\n  Revenue: ${fmtCurrency(f.monthlyRevenue)}/mo (${fmtCurrency(f.annualRevenue)} total)\n  ROI: ${f.annualROI.toFixed(0)}%\n`
      ),
      "TOTALS",
      "-".repeat(40),
      `Total Budget: ${fmtCurrency(totals.totalBudget)}`,
      `Total Revenue: ${fmtCurrency(totals.totalRevenue)}`,
      `Total Conversions: ${totals.totalConversions}`,
      `Overall ROI: ${totals.totalROI.toFixed(0)}%`,
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "marketing-roi-forecast.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleChannelSelect(channel: string) {
    const defaults = CHANNEL_DEFAULTS[channel] || { cpc: 1, cr: 2 };
    setForm((f) => ({
      ...f,
      channel,
      cpc: String(defaults.cpc),
      conversionRate: String(defaults.cr),
    }));
  }

  return (
    <main className="min-h-screen bg-white text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Marketing ROI Forecaster",
          description: "Forecast marketing ROI by channel with traffic, conversion rate, average order value, and cost inputs. Compare scenarios and project annual returns.",
          url: "https://themarkitmedia.com/en/resources/roi-forecaster",
          applicationCategory: "Business Tool",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          provider: { "@type": "Organization", name: "Markit Media", url: "https://themarkitmedia.com" },
        }) }}
      />
      <title>Marketing ROI Forecaster | Free Marketing Tool — Markit Media</title>
      <link rel="canonical" href="https://themarkitmedia.com/en/resources/roi-forecaster" />
      <meta name="description" content="Forecast marketing ROI by channel with traffic, conversion rate, average order value, and cost inputs. Compare scenarios and project annual returns." />
      <nav className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-8" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-base text-neutral-400">
          <li><Link href="/" className="hover:text-black transition-colors">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/resources" className="hover:text-black transition-colors">Resources</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-black" aria-current="page">Marketing ROI Forecaster</li>
        </ol>
      </nav>
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-2">
          Marketing ROI Forecaster
        </h1>
        <p className="text-lg text-neutral-600 mb-10">
          Forecast ROI by channel with budget, CPC, conversion rate, and
          average order value inputs.
        </p>

        {/* Forecast period */}
        <div className="mb-6">
          <label className="block text-base font-semibold mb-1">
            Forecast Period
          </label>
          <div className="flex gap-2">
            {[3, 6, 12, 24].map((m) => (
              <button
                key={m}
                onClick={() => setMonths(m)}
                className={`rounded-md border px-4 py-2 text-base font-medium transition-colors ${
                  months === m
                    ? "border-black bg-black text-white"
                    : "border-neutral-300 hover:border-black"
                }`}
              >
                {m} months
              </button>
            ))}
          </div>
        </div>

        {/* Add channel */}
        <div className="mb-8 rounded-lg border border-neutral-200 p-5">
          <h2 className="text-lg font-bold mb-4">Add Channel</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="block text-base font-semibold mb-1">Channel</label>
              <select
                value={form.channel}
                onChange={(e) => handleChannelSelect(e.target.value)}
                className="w-full rounded-md border border-neutral-300 px-3 py-2 text-base focus-visible:border-black focus-visible:outline-none"
              >
                {Object.keys(CHANNEL_DEFAULTS).map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-base font-semibold mb-1">Monthly Budget ($)</label>
              <input
                type="number"
                value={form.monthlyBudget}
                onChange={(e) => setForm((f) => ({ ...f, monthlyBudget: e.target.value }))}
                className="w-full rounded-md border border-neutral-300 px-3 py-2 text-base focus-visible:border-black focus-visible:outline-none"
                placeholder="5000"
                min={0}
              />
            </div>
            <div>
              <label className="block text-base font-semibold mb-1">
                Avg CPC ($)
                <span className="font-normal text-neutral-400"> 0 = organic</span>
              </label>
              <input
                type="number"
                value={form.cpc}
                onChange={(e) => setForm((f) => ({ ...f, cpc: e.target.value }))}
                className="w-full rounded-md border border-neutral-300 px-3 py-2 text-base focus-visible:border-black focus-visible:outline-none"
                placeholder="2.50"
                min={0}
                step={0.1}
              />
            </div>
            <div>
              <label className="block text-base font-semibold mb-1">Conversion Rate (%)</label>
              <input
                type="number"
                value={form.conversionRate}
                onChange={(e) => setForm((f) => ({ ...f, conversionRate: e.target.value }))}
                className="w-full rounded-md border border-neutral-300 px-3 py-2 text-base focus-visible:border-black focus-visible:outline-none"
                placeholder="3.5"
                min={0}
                step={0.1}
              />
            </div>
            <div>
              <label className="block text-base font-semibold mb-1">Avg Order Value ($)</label>
              <input
                type="number"
                value={form.avgOrderValue}
                onChange={(e) => setForm((f) => ({ ...f, avgOrderValue: e.target.value }))}
                className="w-full rounded-md border border-neutral-300 px-3 py-2 text-base focus-visible:border-black focus-visible:outline-none"
                placeholder="100"
                min={0}
              />
            </div>
          </div>
          <button
            onClick={addChannel}
            className="mt-4 rounded-md bg-black px-6 py-2 text-base font-semibold text-white hover:bg-neutral-800 transition-colors"
          >
            Add Channel
          </button>
        </div>

        {/* Results */}
        {forecasts.length > 0 && (
          <>
            {/* Summary cards */}
            <div className="mb-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="rounded-lg border-2 border-black p-4 text-center">
                <p className="text-base text-neutral-500">Total Budget</p>
                <p className="text-2xl font-bold">{fmtCurrency(totals.totalBudget)}</p>
              </div>
              <div className="rounded-lg border-2 border-black p-4 text-center">
                <p className="text-base text-neutral-500">Projected Revenue</p>
                <p className="text-2xl font-bold">{fmtCurrency(totals.totalRevenue)}</p>
              </div>
              <div className="rounded-lg border-2 border-black p-4 text-center">
                <p className="text-base text-neutral-500">Conversions</p>
                <p className="text-2xl font-bold">{totals.totalConversions.toLocaleString()}</p>
              </div>
              <div className="rounded-lg border-2 border-black p-4 text-center">
                <p className="text-base text-neutral-500">Overall ROI</p>
                <p className={`text-2xl font-bold ${totals.totalROI < 0 ? "text-red-600" : ""}`}>
                  {totals.totalROI.toFixed(0)}%
                </p>
              </div>
            </div>

            {/* Channel cards */}
            <div className="mb-8 space-y-4">
              {forecasts.map((f) => (
                <div key={f.id} className="rounded-lg border border-neutral-200 p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold">{f.channel}</h3>
                    <button
                      onClick={() => removeChannel(f.id)}
                      className="text-neutral-400 hover:text-black text-base"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                    <div>
                      <p className="text-base text-neutral-500">Budget/mo</p>
                      <p className="text-base font-semibold">{fmtCurrency(f.monthlyBudget)}</p>
                    </div>
                    <div>
                      <p className="text-base text-neutral-500">Traffic/mo</p>
                      <p className="text-base font-semibold">{f.monthlyClicks.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-base text-neutral-500">Conversions/mo</p>
                      <p className="text-base font-semibold">{f.monthlyConversions}</p>
                    </div>
                    <div>
                      <p className="text-base text-neutral-500">Revenue/mo</p>
                      <p className="text-base font-semibold">{fmtCurrency(f.monthlyRevenue)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-3 flex-1 rounded-full bg-neutral-100">
                      <div
                        className="h-3 rounded-full bg-black transition-all"
                        style={{ width: `${(f.monthlyRevenue / maxRevenue) * 100}%` }}
                      />
                    </div>
                    <span className={`text-base font-bold ${f.monthlyROI < 0 ? "text-red-600" : ""}`}>
                      {f.monthlyROI.toFixed(0)}% ROI
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleExport}
              className="rounded-md bg-black px-6 py-2 text-base font-semibold text-white hover:bg-neutral-800 transition-colors"
            >
              Export Forecast (.txt)
            </button>
          </>
        )}

        {channels.length === 0 && (
          <div className="rounded-lg border-2 border-dashed border-neutral-200 p-12 text-center">
            <p className="text-lg text-neutral-500">
              Add marketing channels with budget and performance metrics to
              forecast your ROI across the next {months} months.
            </p>
          </div>
        )}
      </div>
          <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Marketing ROI Forecaster",
          description: "Forecast marketing ROI by channel with traffic, conversion rate, average order value, and cost inputs. Compare scenarios and project annual returns.",
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
                <Link href="/resources/roi-calculator" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">ROI Calculator</Link>
                <Link href="/resources/roi-dashboard" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">ROI Dashboard</Link>
                <Link href="/resources/marketing-roi-report" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Marketing ROI Report</Link>
                <Link href="/resources/kpi-builder" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">KPI Builder</Link>
          </div>
        </div>
      </section>
    
      <ToolCTA
        toolName="Roi Forecaster"
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
