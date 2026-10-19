import Link from "next/link";
import { CaseStudyCover } from "@/components/portfolio/cover-images";
import { SectionLabel, SectionTitle } from "@/components/section";

export interface ServiceCaseStudy {
  client: string;
  href: string;
  summary: string;
}

interface ServiceCaseStudiesProps {
  heading: string;
  introduction: string;
  studies: ServiceCaseStudy[];
  locale?: string;
}

export function ServiceCaseStudies({
  heading,
  introduction,
  studies,
  locale = "en",
}: ServiceCaseStudiesProps) {
  if (studies.length === 0) return null;

  return (
    <section className="px-6 lg:px-12 py-20 border-y border-gray-200 bg-gray-50" aria-label={heading}>
      <div className="max-w-7xl mx-auto">
        <SectionLabel>Relevant Client Work</SectionLabel>
        <SectionTitle>{heading}</SectionTitle>
        <p className="text-base text-gray-500 mt-4 max-w-3xl leading-relaxed">{introduction}</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {studies.slice(0, 3).map((study) => (
            <Link
              key={study.href}
              href={`/${locale}${study.href}`}
              className="group block border border-gray-200 bg-white overflow-hidden hover:border-black hover:shadow-lg transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              <CaseStudyCover k={study.href.split("/").pop()} />
              <div className="p-6">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Website Development</span>
                <h3 className="text-xl font-extrabold mt-2 group-hover:underline">{study.client}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mt-3">{study.summary}</p>
                <span className="inline-block mt-5 font-bold text-sm">View project details →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
