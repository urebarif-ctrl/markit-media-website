"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { usePathname } from "next/navigation";
import { CASE_CARDS, INDUSTRY_CASES } from "@/data/case-studies/linking";

type Project = { title: string; service: string; href: string };

// Data-driven: see src/data/case-studies/linking.ts for the rules (no wrong-fit links, no unverified claims).
const direct: Record<string, Project[]> = Object.fromEntries(
  Object.entries(INDUSTRY_CASES).map(([industry, slugs]) => [
    industry,
    slugs.filter((s) => CASE_CARDS[s]).slice(0, 6).map((s) => ({ title: CASE_CARDS[s].n, service: CASE_CARDS[s].l, href: `/work/${s}` })),
  ]),
);

const fallback: Project[] = [
  { title: "Paid Media & Lead Generation", service: "Performance Marketing", href: "/services/performance-marketing" },
  { title: "Website & Conversion Work", service: "Website Development", href: "/services/website-development" },
  { title: "Creative & Social Portfolio", service: "Social Media & Creative", href: "/work/social-media-designs" },
];

export function IndustryProjectStrip() {
  const { lang } = useParams<{ lang: string }>();
  const locale = lang || "en";
  const l = (path: string) => path.startsWith(`/${locale}`) ? path : `/${locale}${path}`;
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);
  const industryIndex = parts.indexOf("industries");
  if (industryIndex < 0 || !parts[industryIndex + 1]) return null;
  const slug = parts[industryIndex + 1];
  const projects = direct[slug] ?? fallback;

  return <section className="px-6 lg:px-12 py-20 bg-[#f7f5ff] border-y border-[#e8e2ff]" aria-label="Relevant projects and proof">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#5A3ED6]">Relevant proof</p><h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-extrabold mt-3">Work and capabilities relevant to this industry</h2><p className="text-gray-500 mt-3 max-w-3xl">See public examples where we have a close industry match, plus the delivery capabilities most commonly used for this market.</p></div>
        <Link href={l("/case-studies")} className="font-bold underline shrink-0">Browse all case studies →</Link>
      </div>
      <div className="grid md:grid-cols-3 gap-4 mt-8">{projects.map((project) => <Link key={project.title + project.href} href={l(project.href)} className="group bg-white border border-gray-200 p-6 min-h-40 flex flex-col hover:border-black hover:shadow-lg transition-all"><span className="text-xs font-bold uppercase tracking-[0.12em] text-gray-600">{project.service}</span><h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold mt-4 group-hover:underline">{project.title}</h3><span className="mt-auto pt-5 text-sm font-bold">View relevant work →</span></Link>)}</div>
    </div>
  </section>;
}
