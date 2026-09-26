"use client";

import { useMemo, useState } from "react";

type Tool = { name: string; desc: string };
type Category = { title: string; tools: Tool[] };

const examples: Record<string, string> = {
  "Google Ads": "Capture high-intent searches, measure leads or sales, and use real conversion data to decide where the next dollar should go.",
  "Meta Ads": "Test audiences and creative quickly, then shift budget toward the combinations producing qualified leads or purchases.",
  "LinkedIn Ads": "Reach decision-makers by role, seniority, company and industry when a B2B campaign needs tighter audience control.",
  "TikTok Ads": "Test native short-form creative against discovery audiences and learn which hooks earn attention fastest.",
  "Microsoft Ads": "Add incremental search reach beyond Google, especially when your audience over-indexes on Bing or Microsoft products.",
  "Google Analytics 4": "Trace important website events and conversions so campaign, content and UX decisions are based on behavior rather than guesswork.",
  "Google Search Console": "Find indexing issues, query opportunities and pages losing visibility before they become bigger organic-search problems.",
  "Google Tag Manager": "Deploy and manage analytics events and advertising pixels without hard-coding every tracking change into the site.",
  "Hotjar": "Watch where users hesitate, scroll or abandon a page so UX improvements are based on observed behavior.",
  "Looker Studio": "Bring marketing KPIs into one client-facing dashboard instead of manually combining reports every week.",
  "Semrush": "Compare rankings, competitors and keyword demand when building an SEO roadmap or content plan.",
  "Ahrefs": "Investigate backlink profiles and content gaps to find authority and topic opportunities competitors already benefit from.",
  "Screaming Frog": "Crawl a site to uncover broken links, duplicate metadata, redirect issues and technical SEO problems at scale.",
  "Surfer SEO": "Use SERP-informed content signals as one input when improving the completeness and structure of a search-focused page.",
  "Google Trends": "Check whether search interest is rising, falling or seasonal before committing content or media to a topic.",
  "Next.js": "Build fast, component-driven sites with strong technical SEO foundations and modern deployment workflows.",
  "WordPress": "Give content teams an editable CMS while supporting landing pages, SEO, plugins and ongoing website operations.",
  "Shopify": "Run product, checkout and commerce operations on a platform built around catalog management and online sales.",
  "Vercel": "Ship web changes through controlled deployments with performance tooling and straightforward rollback workflows.",
  "Figma": "Keep page designs, components and feedback in one collaborative source before development begins.",
  "HubSpot": "Connect lead capture, CRM stages and marketing automation so handoffs and follow-up are easier to measure.",
  "Mailchimp": "Launch newsletters and simpler nurture campaigns with list segmentation and reusable email workflows.",
  "Klaviyo": "Trigger e-commerce email and SMS flows from customer behavior such as browsing, purchase and cart events.",
  "ActiveCampaign": "Build multi-step lead nurture and CRM automations when follow-up needs more conditional logic.",
  "Meta Business Suite": "Manage Facebook and Instagram publishing, inbox activity and native platform insights in one place.",
  "Hootsuite": "Coordinate publishing and monitoring across multiple social channels when a team needs a shared calendar.",
  "Canva": "Produce fast, repeatable social and marketing assets from controlled templates when speed matters.",
  "CapCut": "Edit short-form vertical video quickly for Reels, TikTok and Shorts without a heavyweight post-production workflow.",
  "ChatGPT / Claude": "Accelerate research, ideation and repeatable knowledge-work steps while keeping human review in the workflow.",
  "Zapier": "Connect common apps to automate repetitive handoffs such as form submission to CRM, alerts or follow-up tasks.",
  "Make (Integromat)": "Build visual multi-step automations when a workflow needs branching, transformations or several connected systems.",
};

export function ToolsExplorer({ categories }: { categories: Category[] }) {
  const [query, setQuery] = useState("");
  const normalized = query.trim().toLowerCase();
  const filtered = useMemo(() => categories.map((category) => ({
    ...category,
    tools: category.tools.filter((tool) => !normalized || category.title.toLowerCase().includes(normalized) || tool.name.toLowerCase().includes(normalized) || tool.desc.toLowerCase().includes(normalized)),
  })).filter((category) => category.tools.length > 0), [categories, normalized]);
  const count = filtered.reduce((total, category) => total + category.tools.length, 0);

  return <section className="px-6 lg:px-12 pb-16" aria-label="Search tools and platforms"><div className="max-w-7xl mx-auto">
    <div className="sticky top-16 z-20 bg-white/95 backdrop-blur-xl border border-gray-200 shadow-sm p-3 sm:p-4 mb-10">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <label htmlFor="tool-search" className="sr-only">Search tools and platforms</label>
        <input id="tool-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search Google Ads, Figma, analytics, CRM, SEO..." className="min-h-12 flex-1 border border-gray-300 px-4 text-base outline-none focus:border-black"/>
        <div className="flex items-center justify-between sm:justify-end gap-4 text-sm"><span className="font-semibold text-gray-500">{count} tools shown</span>{query && <button type="button" onClick={() => setQuery("")} className="font-bold underline">Clear</button>}</div>
      </div>
    </div>
    {filtered.length ? filtered.map((category) => <div key={category.title} className="mb-14">
      <div className="flex items-end justify-between gap-5 mb-6"><h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black">{category.title}</h2><span className="text-sm text-gray-400">{category.tools.length} tools</span></div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">{category.tools.map((tool) => <article key={tool.name} className="flip-card min-h-64 rounded-xl"><div className="flip-card-inner rounded-xl">
        <div className="flip-card-face bg-white border border-gray-200 p-6 rounded-xl"><span className="text-xs font-bold uppercase tracking-[0.14em] text-gray-400">{category.title}</span><h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mt-4">{tool.name}</h3><p className="text-base text-gray-500 leading-relaxed mt-3">{tool.desc}</p><span className="mt-auto pt-6 text-sm font-bold text-black">Hover for an example →</span></div>
        <div className="flip-card-face flip-card-back bg-black text-white border border-black p-6 rounded-xl"><span className="text-xs font-bold uppercase tracking-[0.14em] text-white/50">How it helps</span><h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold mt-4">{tool.name}</h3><p className="text-sm text-white/70 leading-relaxed mt-4">{examples[tool.name] ?? `Use ${tool.name} inside a measurable workflow where its data or automation directly supports a marketing decision.`}</p><span className="mt-auto pt-6 text-sm font-bold">Part of our working stack</span></div>
      </div></article>)}</div>
    </div>) : <div className="border border-gray-200 bg-gray-50 p-10 text-center"><h2 className="font-extrabold text-xl">No tools match “{query}”</h2><p className="text-gray-500 mt-2">Try a platform name, category, or capability such as analytics, SEO, CRM, ads, or web development.</p></div>}
  </div></section>;
}
