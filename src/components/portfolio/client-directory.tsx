"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

export interface DirectoryEntry {
  slug: string;
  name: string;
  industry: string | null;
  href: string;
  src: string;
  srcSet: string;
  w: number;
  h: number;
  bg: string;
  alt: string;
  types: string[];
  kinds: string[];
  internal: boolean;
  /** Verified city/country only; null when the location is not confirmed. */
  place: string | null;
  service: string | null;
  group: string;
  region: "USA" | "Pakistan" | null;
  featured: boolean;
}

const KINDS = [
  { value: "logo", label: "Logo design" },
  { value: "social", label: "Social media" },
  { value: "food", label: "Food & beverage" },
  { value: "fashion", label: "Fashion" },
];

/** Searchable, filterable list of every client case study (in-house brands are shown in their own labelled section). */
export function ClientDirectory({ entries, locale = "en" }: { entries: DirectoryEntry[]; locale?: string }) {
  const [q, setQ] = useState("");
  const [kind, setKind] = useState("all");
  const [group, setGroup] = useState("all");
  const [region, setRegion] = useState("all");
  const groups = Array.from(new Set(entries.map((e) => e.group))).filter((g) => g !== "Other").sort();
  const regions = (["USA", "Pakistan"] as const).filter((r) => entries.some((e) => e.region === r));
  const match = (e: DirectoryEntry) =>
    (kind === "all" || e.kinds.includes(kind)) &&
    (group === "all" || e.group === group) &&
    (region === "all" || e.region === region) &&
    (q.trim() === "" || `${e.name} ${e.industry ?? ""} ${e.types.join(" ")}`.toLowerCase().includes(q.trim().toLowerCase()));
  const list = useMemo(() => entries.filter(match), [entries, q, kind, group, region]); // eslint-disable-line react-hooks/exhaustive-deps
  const clients = list.filter((e) => !e.internal);
  const internal = list.filter((e) => e.internal);

  const card = (e: DirectoryEntry, i: number) => (
    <li key={e.slug}>
      <Link href={`/${locale}${e.href}`} className="group block bg-white border border-gray-200 overflow-hidden hover:border-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
        <div className="aspect-[4/3] overflow-hidden bg-gray-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={e.src}
            srcSet={e.srcSet}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            width={e.w}
            height={e.h}
            alt={e.alt}
            loading={i < 4 ? "eager" : "lazy"}
            decoding="async"
            style={{ backgroundColor: e.bg }}
            className={`w-full h-full object-cover ${e.h > e.w ? "object-top" : "object-center"} group-hover:scale-[1.03] transition-transform duration-300 motion-reduce:transition-none motion-reduce:group-hover:scale-100`}
          />
        </div>
        <div className="p-4">
          <h3 className="font-extrabold group-hover:underline">
            {e.name}
            {e.featured && <span className="ml-2 align-middle text-[11px] font-bold uppercase tracking-wide border border-gray-300 px-1.5 py-0.5 text-gray-700">Featured</span>}
          </h3>
          <p className="text-xs uppercase tracking-wide text-gray-600 mt-1">{[e.industry ?? null, e.place].filter(Boolean).join(" · ") || e.types.join(" · ")}</p>
          {e.service && <p className="text-sm text-gray-600 mt-1">{e.service}</p>}
        </div>
      </Link>
    </li>
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-end gap-4 mb-6">
        <label className="flex-1">
          <span className="block text-sm font-bold mb-1">Search clients</span>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Name, industry or type of work"
            className="w-full border border-gray-300 px-4 py-3 focus-visible:outline-2 focus-visible:outline-black"
          />
        </label>
        <div role="group" aria-label="Filter by type of work" className="flex flex-wrap gap-2">
          {[{ value: "all", label: "All" }, ...KINDS].map((k) => (
            <button
              key={k.value}
              type="button"
              aria-pressed={kind === k.value}
              onClick={() => setKind(k.value)}
              className={`px-4 py-3 text-sm font-bold border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${kind === k.value ? "bg-black text-white border-black" : "border-gray-300 hover:border-black"}`}
            >
              {k.label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3 mb-6">
        <div role="group" aria-label="Filter by industry" className="flex flex-wrap gap-2">
          {[{ value: "all", label: "All industries" }, ...groups.map((g) => ({ value: g, label: g }))].map((g) => (
            <button
              key={g.value}
              type="button"
              aria-pressed={group === g.value}
              onClick={() => setGroup(g.value)}
              className={`px-3 py-2 text-sm font-bold border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${group === g.value ? "bg-black text-white border-black" : "border-gray-300 hover:border-black"}`}
            >
              {g.label}
            </button>
          ))}
        </div>
        {regions.length > 0 && (
          <div role="group" aria-label="Filter by location" className="flex flex-wrap gap-2">
            {[{ value: "all", label: "All locations" }, ...regions.map((r) => ({ value: r, label: r }))].map((r) => (
              <button
                key={r.value}
                type="button"
                aria-pressed={region === r.value}
                onClick={() => setRegion(r.value)}
                className={`px-3 py-2 text-sm font-bold border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${region === r.value ? "bg-black text-white border-black" : "border-gray-300 hover:border-black"}`}
              >
                {r.label}
              </button>
            ))}
          </div>
        )}
      </div>
      <p className="text-sm text-gray-600 mb-4" aria-live="polite">
        {clients.length} client{clients.length === 1 ? "" : "s"}
        {internal.length > 0 ? ` and ${internal.length} in-house brand${internal.length === 1 ? "" : "s"}` : ""}
      </p>
      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 list-none p-0">{clients.map(card)}</ul>
      {internal.length > 0 && (
        <div className="mt-14">
          <h3 className="font-[family-name:var(--font-display)] text-2xl font-extrabold">In-house brands</h3>
          <p className="text-gray-500 mt-2 max-w-2xl">Work for Markit Media&apos;s own brands, shown as internal creative rather than paid client engagements.</p>
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 list-none p-0 mt-6">{internal.map(card)}</ul>
        </div>
      )}
      {list.length === 0 && <p className="mt-8 text-gray-500">No clients match that search.</p>}
    </div>
  );
}
