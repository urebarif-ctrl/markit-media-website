import Link from "next/link";
import { Animate } from "@/components/animate";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { YouTubeEmbed } from "@/components/youtube-embed";
import { CaseStudyThumbnail } from "@/components/case-study-thumbnail";
import { CaseStudyCover } from "@/components/portfolio/cover-images";
import { coverFor, coverKeyForName } from "@/lib/covers";
import { CaseStudyEditorial, CaseStudyGraph, CaseStudySnapshot, RelatedCaseStudies } from "@/components/case-study-extras";
import { getCaseStudy } from "@/lib/case-studies";
import { editorialFor } from "@/data/case-studies/editorial";

interface CaseStudyVideo {
  id: string;
  title: string;
  aspect?: "landscape" | "portrait";
}

interface CaseStudyProps {
  client: string;
  industry: string;
  services: string[];
  title: string;
  subtitle: string;
  context: string;
  approach: string;
  deliverables: string[];
  videos?: CaseStudyVideo[];
  outcomes?: string[];
  illustrative?: boolean;
  relatedServices: Array<{ title: string; href: string }>;
  readingTime?: string;
  /** Case-study data slug. When set, SEO fields, schema, snapshot and related links come from the data source. */
  slug?: string;
  children?: React.ReactNode;
}

export function CaseStudyPage({
  client,
  industry,
  services,
  title,
  subtitle,
  context,
  approach,
  deliverables,
  videos,
  outcomes,
  illustrative = false,
  relatedServices,
  readingTime = "4 min read",
  slug,
  locale = "en",
  children,
}: CaseStudyProps & { locale?: string }) {
  const rec = slug ? getCaseStudy(slug) : undefined;
  const ed = slug ? editorialFor(slug) : undefined;
  const h1 = rec?.h1 ?? title;
  const industryLabel = rec && rec.industryLabel && !/^confirm/i.test(rec.industryLabel) ? rec.industryLabel : industry;
  // The old "2 min read" labels were guesses. With the data source, show a time only when it is computed from real copy.
  const words = ed ? [ed.lede, ...ed.sections.flatMap((x) => [...(x.paragraphs ?? []), ...(x.bullets ?? [])])].join(" ").split(/\s+/).length : 0;
  const readLabel = rec ? (ed ? `${Math.max(1, Math.round(words / 220))} min read` : null) : readingTime;
  const l = (path: string) => path.startsWith(`/${locale}`) ? path : `/${locale}${path}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: subtitle,
    publisher: { "@type": "Organization", name: "Markit Media" },
  };

  return (
    <article>
      {rec ? <CaseStudyGraph slug={rec.slug} locale={locale} /> : <JsonLd data={schema} />}
      <Breadcrumb locale={locale} emitSchema={!rec} items={[{ label: "Home", href: "/" }, { label: "Work", href: "/work" }, ...(rec ? [{ label: "Case Studies", href: "/case-studies" }] : []), { label: client }]} />

      <section className="px-6 lg:px-12 pt-24 pb-12" aria-label={title}>
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="text-base font-medium text-gray-600 uppercase tracking-[0.15em]">{industryLabel}</span>
              {readLabel && <span className="text-gray-300" aria-hidden="true">|</span>}
              {readLabel && <span className="text-base text-gray-600">{readLabel}</span>}
            </div>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3rem)] font-extrabold text-black tracking-tight leading-[1.1]">
              {h1}
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mt-4 max-w-3xl">{ed?.lede ?? subtitle}</p>
            <div className="flex flex-wrap gap-2 mt-6">
              {services.map((s) => (
                <span key={s} className="border border-gray-200 px-3 py-1.5 text-base font-medium text-gray-600">{s}</span>
              ))}
            </div>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 pb-10" aria-label="Case study thumbnail">
        <div className="max-w-5xl mx-auto overflow-hidden border border-gray-100">
          {coverFor(coverKeyForName(client)) ? <CaseStudyCover k={coverKeyForName(client)} priority sizes="(min-width: 1024px) 64vw, 100vw" /> : <CaseStudyThumbnail title={title} priority />}
        </div>
      </section>

      {slug && <CaseStudySnapshot slug={slug} locale={locale} />}

      {videos && videos.length > 0 && (
        <section className="px-6 lg:px-12 py-8" aria-label="Project videos">
          <div className="max-w-5xl mx-auto">
            <div className={`grid gap-6 ${videos.length === 1 ? "grid-cols-1 max-w-3xl mx-auto" : "grid-cols-1 md:grid-cols-2"}`}>
              {videos.map((v) => (
                <Animate key={v.id} animation="fade-up">
                  <YouTubeEmbed videoId={v.id} title={v.title} aspect={v.aspect} />
                </Animate>
              ))}
            </div>
          </div>
        </section>
      )}

      {ed ? <CaseStudyEditorial slug={slug!} /> : (
      <section className="px-6 lg:px-12 py-12" aria-label="Project details">
        <div className="max-w-3xl mx-auto space-y-12">
          <Animate animation="fade-up">
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-4">Project Context</h2>
              <p className="text-lg text-gray-500 leading-relaxed">{context}</p>
            </div>
          </Animate>

          <Animate animation="fade-up">
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-4">Our Approach</h2>
              <p className="text-lg text-gray-500 leading-relaxed">{approach}</p>
            </div>
          </Animate>

          <Animate animation="fade-up">
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-4">What We Delivered</h2>
              <ul className="space-y-3">
                {deliverables.map((d, i) => (
                  <li key={i} className="flex gap-3 text-lg text-gray-500 leading-relaxed">
                    <span className="text-black font-bold flex-shrink-0" aria-hidden="true">&bull;</span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </Animate>

          {outcomes && outcomes.length > 0 && (
            <Animate animation="fade-up">
              <div>
                <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-4">
                  Results
                  {illustrative && <span className="text-base font-normal text-gray-400 ml-2">Illustrative — pending confirmation</span>}
                </h2>
                <ul className="space-y-3">
                  {outcomes.map((o, i) => (
                    <li key={i} className="flex gap-3 text-lg text-gray-500 leading-relaxed">
                      <span className="text-black font-bold flex-shrink-0" aria-hidden="true">&bull;</span>
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            </Animate>
          )}
        </div>
      </section>
      )}

      {children}

      {slug && <RelatedCaseStudies slug={slug} locale={locale} />}

      <section className="px-6 lg:px-12 py-12 bg-gray-50" aria-label="Related services">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-6">Services Used in This Project</h2>
          <div className="flex flex-wrap gap-3">
            {relatedServices.map((s) => (
              <Link key={s.href} href={l(s.href)} className="border border-gray-200 px-5 py-3 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                {s.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-16 bg-black text-white text-center" aria-label="Get started">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
            Want Similar Results?
          </h2>
          <p className="text-lg text-gray-400 mt-4 mb-8">
            Let&apos;s discuss how we can apply the same approach to your business.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={l("/get-a-quote")} className="inline-block bg-white text-black font-bold px-8 py-4 text-base hover:bg-gray-100 transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
              Request a Quote &rarr;
            </Link>
            <Link href={l("/work")} className="inline-block border-2 border-white text-white font-bold px-8 py-4 text-base hover:bg-white hover:text-black transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
              See More Work
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
