// Shared building blocks for the demo homepage and services options. Demo only: English, noindex, not linked from the site.
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Mail, MessageCircle } from "lucide-react";
import { getPublishedPosts } from "@/lib/blog";
import { DEMO_CASES, DEMO_INDUSTRIES, DEMO_MARKETS, DEMO_TOOLS, HOW_STEPS, type DemoCase } from "@/data/demo-content";

export const L = (p: string) => `/en${p}`;
const PAD = "px-6 lg:px-12";
const DISPLAY = "font-[family-name:var(--font-display)]";

/** Small fixed tag so nobody mistakes a demo for the live page. */
export function DemoBar({ label }: { label: string }) {
  return (
    <Link
      href={L("/demo")}
      className="fixed bottom-4 left-4 z-50 bg-black/90 text-white text-xs font-bold px-3.5 py-2 rounded-full shadow-lg border border-white/20 hover:bg-[#5A3ED6] transition-colors focus-visible:outline-2 focus-visible:outline-white"
    >
      DEMO · {label} · not live · all options
    </Link>
  );
}

export function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return <p className={`text-xs font-bold uppercase tracking-[0.2em] ${dark ? "text-white/50" : "text-gray-500"}`}>{children}</p>;
}

export function Chip({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span className={`inline-block rounded-full border px-3 py-1 text-xs font-semibold ${dark ? "border-white/25 text-white/80" : "border-gray-300 text-gray-600"}`}>
      {children}
    </span>
  );
}

/** Large alternating case-study row (homepage option A). */
export function CaseRow({ c, flip = false }: { c: DemoCase; flip?: boolean }) {
  return (
    <Link href={L(c.href)} className="group grid lg:grid-cols-2 gap-6 lg:gap-14 items-center focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-4">
      <div className={`relative aspect-[16/11] overflow-hidden bg-gray-100 ${flip ? "lg:order-2" : ""}`}>
        <Image src={c.image} alt={c.imageAlt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none" />
      </div>
      <div>
        <Eyebrow>Case study</Eyebrow>
        <h3 className={`${DISPLAY} text-3xl lg:text-4xl font-extrabold tracking-tight mt-3`}>{c.name}</h3>
        <p className="text-lg text-gray-600 leading-relaxed mt-4 max-w-lg">{c.line}</p>
        <div className="flex flex-wrap gap-2 mt-5">{c.scope.map((s) => <Chip key={s}>{s}</Chip>)}</div>
        <span className="inline-flex items-center gap-2 mt-7 font-bold border-b border-black pb-1 min-h-11">
          View the case study <ArrowRight size={16} className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

/** Compact case card (a row of three). */
export function CaseCard({ c }: { c: DemoCase }) {
  return (
    <Link href={L(c.href)} className="group block focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-4">
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
        <Image src={c.image} alt={c.imageAlt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04] motion-reduce:transition-none" />
      </div>
      <h3 className={`${DISPLAY} text-xl font-extrabold mt-4`}>{c.name}</h3>
      <p className="text-sm text-gray-600 leading-relaxed mt-1.5">{c.line}</p>
      <span className="inline-flex items-center gap-1.5 mt-3 text-sm font-bold">View <ArrowRight size={14} aria-hidden="true" /></span>
    </Link>
  );
}

export function CaseStrip({ title = "Recent work", dark = false }: { title?: string; dark?: boolean }) {
  return (
    <section className={`${PAD} py-12 md:py-16 ${dark ? "bg-black text-white" : "bg-gray-50"}`} aria-label="Selected work">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between gap-6">
          <div><Eyebrow dark={dark}>Selected work</Eyebrow><h2 className={`${DISPLAY} text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight mt-3`}>{title}</h2></div>
          <Link href={L("/work")} className="hidden sm:inline-flex items-center gap-2 font-bold text-sm border-b border-current pb-1">All work <ArrowRight size={14} aria-hidden="true" /></Link>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mt-10">{DEMO_CASES.map((c) => <CaseCard key={c.slug} c={c} />)}</div>
        <div className="flex flex-wrap gap-x-8 gap-y-2 mt-8 text-sm font-bold">
          <Link href={L("/case-studies")} className="inline-block py-2 underline underline-offset-4">All case studies</Link>
          <Link href={L("/industries")} className="inline-block py-2 underline underline-offset-4">Industries</Link>
          <Link href={L("/free-tools")} className="inline-block py-2 underline underline-offset-4">Free tools</Link>
        </div>
      </div>
    </section>
  );
}

export function HowWeWork() {
  return (
    <section className={`${PAD} py-16 md:py-20 bg-white`} aria-label="How we work">
      <div className="max-w-7xl mx-auto">
        <Eyebrow>How we work</Eyebrow>
        <h2 className={`${DISPLAY} text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight mt-3 max-w-2xl`}>Less guesswork. More forward motion.</h2>
        <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 mt-10">
          {HOW_STEPS.map((s) => (
            <li key={s.n} className="border-t-2 border-black pt-4">
              <span className={`${DISPLAY} text-sm font-extrabold text-[#5A3ED6]`}>{s.n}</span>
              <h3 className={`${DISPLAY} text-lg font-extrabold mt-2 leading-snug`}>{s.t}</h3>
              <p className="text-sm text-gray-600 leading-relaxed mt-2">{s.d}</p>
            </li>
          ))}
        </ol>
        <Link href={L("/process")} className="inline-flex items-center gap-2 mt-8 font-bold border-b border-black pb-1 text-sm min-h-11">See our full process <ArrowRight size={14} aria-hidden="true" /></Link>
      </div>
    </section>
  );
}

export function WhereWeWork({ bg = "bg-gray-50" }: { bg?: string }) {
  return (
    <section className={`${PAD} py-16 md:py-20 ${bg}`} aria-label="Industries and markets">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20">
        <div>
          <Eyebrow>Industries</Eyebrow>
          <h2 className={`${DISPLAY} text-2xl lg:text-3xl font-extrabold tracking-tight mt-3`}>Where we work</h2>
          <ul className="mt-6 grid sm:grid-cols-2 gap-x-8">
            {DEMO_INDUSTRIES.map(([label, href]) => (
              <li key={href}><Link href={L(href)} className="flex items-center justify-between py-3 border-b border-gray-200 text-sm font-semibold hover:border-black">{label}<ArrowRight size={14} className="text-gray-300" aria-hidden="true" /></Link></li>
            ))}
          </ul>
          <Link href={L("/industries")} className="inline-flex items-center gap-2 mt-6 font-bold border-b border-black pb-1 text-sm min-h-11">All industries <ArrowRight size={14} aria-hidden="true" /></Link>
        </div>
        <div>
          <Eyebrow>Markets</Eyebrow>
          <h2 className={`${DISPLAY} text-2xl lg:text-3xl font-extrabold tracking-tight mt-3`}>Markets we serve</h2>
          <ul className="mt-6 grid sm:grid-cols-2 gap-x-8">
            {DEMO_MARKETS.map(([name, flag, href]) => (
              <li key={href}><Link href={L(href)} className="flex items-center gap-3 py-3 border-b border-gray-200 text-sm font-semibold hover:border-black"><span aria-hidden="true" className="text-xl leading-none">{flag}</span>{name}</Link></li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export async function ToolsInsights({ bg = "bg-white" }: { bg?: string }) {
  const posts = await getPublishedPosts(3);
  return (
    <section className={`${PAD} py-16 md:py-20 ${bg}`} aria-label="Free tools and insights">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20">
        <div>
          <Eyebrow>Free tools</Eyebrow>
          <h2 className={`${DISPLAY} text-2xl lg:text-3xl font-extrabold tracking-tight mt-3`}>155+ free marketing tools</h2>
          <ul className="mt-6">
            {DEMO_TOOLS.map(([name, desc, href]) => (
              <li key={href}><Link href={L(href)} className="block py-4 border-b border-gray-200 hover:border-black"><span className="font-bold text-sm">{name}</span><span className="block text-sm text-gray-600 mt-0.5">{desc}</span></Link></li>
            ))}
          </ul>
          <Link href={L("/free-tools")} className="inline-flex items-center gap-2 mt-6 font-bold border-b border-black pb-1 text-sm min-h-11">All free tools <ArrowRight size={14} aria-hidden="true" /></Link>
        </div>
        <div>
          <Eyebrow>Insights</Eyebrow>
          <h2 className={`${DISPLAY} text-2xl lg:text-3xl font-extrabold tracking-tight mt-3`}>Latest from the blog</h2>
          <ul className="mt-6">
            {posts.map((p) => (
              <li key={p.slug}><Link href={`/en/blog/${p.slug}`} className="block py-4 border-b border-gray-200 hover:border-black"><span className="text-xs font-bold uppercase tracking-wide text-gray-500">{p.category}</span><span className="block font-bold text-sm mt-1 leading-snug">{p.title}</span></Link></li>
            ))}
          </ul>
          <Link href={L("/blog")} className="inline-flex items-center gap-2 mt-6 font-bold border-b border-black pb-1 text-sm min-h-11">All articles <ArrowRight size={14} aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
}

export function FaqBlock({ items, title = "Frequently asked questions", bg = "bg-white" }: { items: [string, string][]; title?: string; bg?: string }) {
  return (
    <section className={`${PAD} py-12 md:py-16 ${bg}`} aria-label="Frequently asked questions">
      <div className="max-w-3xl mx-auto">
        <Eyebrow>FAQ</Eyebrow>
        <h2 className={`${DISPLAY} text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight mt-3`}>{title}</h2>
        <div className="mt-8 border-t border-gray-300">
          {items.map(([q, a]) => (
            <details key={q} className="group border-b border-gray-300">
              <summary className="flex justify-between items-center gap-5 py-5 cursor-pointer text-base font-bold list-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                {q}<span className="text-xl text-gray-500 group-open:rotate-45 transition-transform motion-reduce:transition-none shrink-0" aria-hidden="true">+</span>
              </summary>
              <div className="pb-6 text-gray-600 leading-relaxed">{a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Same three actions as the live footer band. */
export function ClosingBand({ title = "Have a project in mind?" }: { title?: string }) {
  return (
    <section className={`${PAD} py-16 md:py-20 bg-black text-white`} aria-label="Get in touch">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
        <div>
          <Eyebrow dark>Start a conversation</Eyebrow>
          <h2 className={`${DISPLAY} text-[clamp(2rem,5vw,3.6rem)] font-extrabold tracking-tight leading-[1.02] mt-3 max-w-2xl`}>{title}</h2>
          <p className="text-gray-400 mt-4">Choose whatever is easiest: send the brief, message us, or request a quote.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href="mailto:ciao@themarkitmedia.com" className="inline-flex items-center gap-2 bg-white text-black px-5 py-3.5 font-bold text-sm hover:bg-gray-200"><Mail size={18} aria-hidden="true" /> Email us</a>
          <a href="https://wa.me/923002086081" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-white/25 px-5 py-3.5 font-bold text-sm hover:bg-white hover:text-black"><MessageCircle size={18} aria-hidden="true" /> WhatsApp</a>
          <Link href={L("/get-a-quote")} className="inline-flex items-center gap-2 border border-white/25 px-5 py-3.5 font-bold text-sm hover:bg-white hover:text-black">Request a quote <ArrowUpRight size={17} aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
}

/** Looks like the quote form but sends nothing: demo pages must never create real leads. */
export function DemoQuote({ id = "services-quote" }: { id?: string }) {
  const field = "w-full border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-400";
  return (
    <section id={id} className={`${PAD} py-12 md:py-16 scroll-mt-24 bg-gray-50`} aria-label="Request a services quote">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[.85fr_1.15fr] gap-12 lg:gap-16 items-start">
        <div>
          <Eyebrow>Request a quote</Eyebrow>
          <h2 className={`${DISPLAY} text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight leading-tight mt-3`}>Tell us the business problem. We will map the right service mix.</h2>
          <p className="text-lg text-gray-600 leading-relaxed mt-5">Share the goal, current setup, priority market, budget range and what your internal team already handles. We will recommend a practical starting scope rather than forcing a prebuilt package.</p>
        </div>
        <div className="bg-white border border-gray-200 p-6 lg:p-8" aria-disabled="true">
          <p className="font-bold">Tell us what you need</p>
          <div className="grid gap-3 mt-5">
            <div className={field}>Your name</div><div className={field}>Email address</div><div className={field}>Phone</div>
            <div className={`${field} h-28`}>Your business, goals, current marketing, priority services, budget range, timeline...</div>
            <div className="bg-black/40 text-white text-center font-bold text-sm py-3.5">Request recommendation (disabled in this demo)</div>
          </div>
          <p className="text-xs text-gray-500 mt-4">Demo page: this form is not connected, so no lead is created. To request a real quote use <Link href={L("/get-a-quote")} className="underline">the live quote page</Link>.</p>
        </div>
      </div>
    </section>
  );
}

export function PlatformStrip() {
  const names = ["Meta Ads", "Google Ads", "Shopify", "WordPress", "Next.js", "GA4", "HubSpot", "Klaviyo"];
  return (
    <div className={`${PAD} py-6 border-y border-gray-200 bg-white`}>
      <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-x-8 gap-y-2">
        <span className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">Platforms we work in</span>
        {names.map((n) => <span key={n} className={`${DISPLAY} text-sm font-extrabold text-gray-700`}>{n}</span>)}
      </div>
    </div>
  );
}
