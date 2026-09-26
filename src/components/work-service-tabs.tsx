"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Category = { title: string; desc: string; clients: string[]; href: string };
type Project = { client: string; industry: string; services: string; desc: string; href: string };

function matches(project: Project, category: string) {
  const haystack = project.services.toLowerCase();
  const name = category.toLowerCase();
  if (name.includes("video")) return /video|motion/.test(haystack);
  if (name.includes("website")) return /website|web development/.test(haystack);
  if (name.includes("brand")) return /brand|motion|logo/.test(haystack);
  if (name.includes("social")) return /social/.test(haystack);
  if (name.includes("photography")) return /photo|pr/.test(haystack);
  return true;
}

export function WorkServiceTabs({ categories, projects }: { categories: Category[]; projects: Project[] }) {
  const [active, setActive] = useState("All Work");
  const filtered = useMemo(() => active === "All Work" ? projects : projects.filter((project) => matches(project, active)), [active, projects]);
  return <div className="mt-10">
    <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-3" role="tablist" aria-label="Filter portfolio by service">{["All Work", ...categories.map((category) => category.title)].map((label) => <button key={label} type="button" role="tab" aria-selected={active === label} onClick={() => setActive(label)} className={`shrink-0 px-5 py-3 text-sm font-bold border transition-colors ${active === label ? "bg-black text-white border-black" : "bg-white text-black border-gray-200 hover:border-black"}`}>{label}</button>)}</div>
    {filtered.length ? <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">{filtered.map((project) => <Link key={project.href} href={project.href} className="group bg-white border border-gray-200 p-6 min-h-56 flex flex-col hover:border-black hover:shadow-lg transition-all"><span className="text-xs font-bold uppercase tracking-[0.12em] text-gray-400">{project.industry}</span><h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold mt-4 group-hover:underline">{project.client}</h3><p className="text-sm font-semibold text-gray-500 mt-2">{project.services}</p><p className="text-sm text-gray-500 leading-relaxed mt-4">{project.desc}</p><span className="mt-auto pt-5 text-sm font-bold">View project →</span></Link>)}</div> : <div className="mt-6 bg-white border border-gray-200 p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5"><div><h3 className="font-extrabold text-lg">More {active} work is available on request.</h3><p className="text-gray-500 mt-2">The public portfolio only shows projects we can publish. Explore the service page or ask for the closest relevant examples.</p></div><Link href={categories.find((category) => category.title === active)?.href ?? "/contact"} className="shrink-0 bg-black text-white px-6 py-3 font-bold">Explore {active} →</Link></div>}
  </div>;
}
