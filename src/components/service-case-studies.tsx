import Link from "next/link";
import { CaseStudyCover, PortfolioFill } from "@/components/portfolio/cover-images";
import { SectionLabel, SectionTitle } from "@/components/section";
import type { VerifiedProject } from "@/data/service-case-studies";

interface ServiceCaseStudiesProps {
  heading: string;
  intro: string;
  projects: VerifiedProject[];
  locale?: string;
}

export function ServiceCaseStudies({ heading, intro, projects, locale = "en" }: ServiceCaseStudiesProps) {
  if (projects.length === 0) return null;
  return (
    <section id="service-case-studies" className="px-6 lg:px-12 py-20 border-y border-gray-200 bg-gray-50 scroll-mt-24" aria-label={heading}>
      <div className="max-w-7xl mx-auto">
        <SectionLabel>Relevant Client Work</SectionLabel>
        <SectionTitle>{heading}</SectionTitle>
        <p className="text-base text-gray-600 mt-4 max-w-3xl leading-relaxed">{intro}</p>
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 list-none p-0">
          {projects.map((p) => (
            <li key={p.href}>
              <Link
                href={`/${locale}${p.href}`}
                className="group block h-full border border-gray-200 bg-white overflow-hidden hover:border-black hover:shadow-lg transition-all motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                {p.cover.kind === "case" ? (
                  <CaseStudyCover k={p.cover.key} />
                ) : (
                  <div className="relative w-full aspect-[16/9] overflow-hidden">
                    <PortfolioFill id={p.cover.id} sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" alt={p.client} />
                  </div>
                )}
                <div className="p-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-600">{p.label}</span>
                  <h3 className="text-xl font-extrabold mt-2 group-hover:underline">{p.client}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mt-3">{p.summary}</p>
                  <span className="inline-block mt-5 font-bold text-sm">View project details →</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Link href={`/${locale}/case-studies`} className="text-sm font-bold border-b border-black pb-1">
            All case studies →
          </Link>
        </div>
      </div>
    </section>
  );
}
