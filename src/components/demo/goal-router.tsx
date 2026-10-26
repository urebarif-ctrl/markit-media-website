"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export interface RouterChip {
  key: string;
  label: string;
  title: string;
  desc: string;
  bullets: string[];
  href: string;
  caseName?: string;
  caseHref?: string;
  caseImage?: string;
  caseAlt?: string;
}

/** Homepage option B: the visitor picks a goal, one panel changes. All panels are in the HTML order of the chips; the first is open by default. */
export function GoalRouter({ chips, finderHref, quoteHref }: { chips: RouterChip[]; finderHref: string; quoteHref: string }) {
  const [active, setActive] = useState(chips[0].key);
  const cur = chips.find((c) => c.key === active) ?? chips[0];
  return (
    <div>
      <div role="group" aria-label="What do you want your marketing to do next?" className="flex flex-wrap gap-2.5 mt-8">
        {chips.map((c) => (
          <button
            key={c.key}
            type="button"
            aria-pressed={c.key === active}
            onClick={() => setActive(c.key)}
            className={`rounded-full border px-5 py-2.5 text-sm font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5A3ED6] ${c.key === active ? "bg-black text-white border-black" : "bg-white text-black border-gray-300 hover:border-black"}`}
          >
            {c.label}
          </button>
        ))}
        <Link href={finderHref} className="rounded-full border border-dashed border-gray-400 px-5 py-2.5 text-sm font-bold text-gray-700 hover:border-black hover:text-black">Not sure? Take the quiz</Link>
      </div>

      <div aria-live="polite" className="mt-8 grid lg:grid-cols-[1.15fr_1fr] gap-8 lg:gap-14 items-center bg-[#f6f4ff] border border-[#e4defc] p-6 lg:p-10">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#5A3ED6]">Where we would start</p>
          <h2 className="font-[family-name:var(--font-display)] text-2xl lg:text-3xl font-extrabold tracking-tight mt-3">{cur.title}</h2>
          <p className="text-gray-600 leading-relaxed mt-3 max-w-xl">{cur.desc}</p>
          <ul className="mt-5 grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm font-semibold">
            {cur.bullets.map((b) => <li key={b} className="flex gap-2"><span className="text-[#5A3ED6]" aria-hidden="true">✓</span>{b}</li>)}
          </ul>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-7">
            <Link href={quoteHref} className="inline-flex items-center gap-2 bg-black text-white px-6 py-3.5 font-bold text-sm hover:bg-gray-800">Request a quote <ArrowRight size={16} aria-hidden="true" /></Link>
            <Link href={cur.href} className="inline-flex items-center min-h-11 font-bold text-sm border-b border-black pb-1">See the service →</Link>
          </div>
        </div>
        {cur.caseImage && cur.caseHref ? (
          <Link href={cur.caseHref} className="group block">
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-200"><Image src={cur.caseImage} alt={cur.caseAlt ?? ""} fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none" /></div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-gray-500 mt-3">Related work</p>
            <p className="font-bold">{cur.caseName} <span aria-hidden="true">→</span></p>
          </Link>
        ) : (
          <Link href={quoteHref.replace("/get-a-quote", "/case-studies")} className="block border border-dashed border-[#c9bdfc] p-8 text-center text-sm font-semibold text-gray-600 hover:bg-white">
            Browse our case studies <span aria-hidden="true">→</span>
          </Link>
        )}
      </div>
    </div>
  );
}
