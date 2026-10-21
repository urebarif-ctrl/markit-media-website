import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { GalleryGrid } from "@/components/portfolio/gallery-grid";
import { ClientDirectory, type DirectoryEntry } from "@/components/portfolio/client-directory";
import { PortfolioImage } from "@/components/portfolio/portfolio-image";
import { CaseStudyEditorial, CaseStudyGraph, CaseStudySnapshot, RelatedCaseStudies } from "@/components/case-study-extras";
import { getCaseStudy, industryGroup, locationRegion, serviceName } from "@/lib/case-studies";
import { editorialFor } from "@/data/case-studies/editorial";
import {
  CATEGORIES,
  type CategorySlug,
  type PortfolioClient,
  SITE_ORIGIN,
  absoluteMediaUrl,
  allClients,
  clientRoute,
  clientWorkTypes,
  galleryItems,
  getClient,
  getMedia,
  mediaUrl,
  mediaVariant,
  publishedClients,
  srcSet,
  toGalleryItem,
} from "@/lib/portfolio";

const display = "font-[family-name:var(--font-display)]";

/** The client's work, one section per evidenced type of work. Reused on the dedicated page and on existing /work pages. */
export function ClientDesignWork({ client, locale = "en", heading = "Selected design work" }: { client: PortfolioClient; locale?: string; heading?: string }) {
  if (client.sections.length === 0) return null;
  return (
    <section className="px-6 lg:px-12 py-12" aria-label={heading}>
      <div className="max-w-7xl mx-auto space-y-14">
        {client.sections.map((s) => (
          <div key={s.kind}>
            <h2 className={`${display} text-2xl md:text-3xl font-extrabold tracking-tight`}>{s.label}</h2>
            <p className="text-gray-500 mt-2 mb-6">
              {s.media.length} piece{s.media.length === 1 ? "" : "s"} from the {client.name} {s.kind === "logo" ? "identity presentation" : "portfolio"}.
            </p>
            <GalleryGrid items={s.media.map(toGalleryItem)} label={`${client.name} ${s.label.toLowerCase()}`} initial={s.media.length <= 15 ? s.media.length : 12} step={1000} moreLabel="Show full collection" locale={locale} />
          </div>
        ))}
      </div>
    </section>
  );
}

export function clientJsonLd(c: PortfolioClient) {
  const ids = c.sections.flatMap((s) => s.media).slice(0, 8);
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${c.name}: Markit Media portfolio`,
    description: c.summary,
    url: `${SITE_ORIGIN}/en${clientRoute(c)}`,
    creator: { "@type": "Organization", name: "Markit Media", url: SITE_ORIGIN },
    image: ids.map((id) => ({ "@type": "ImageObject", contentUrl: absoluteMediaUrl(id), caption: getMedia(id).a })),
  };
}

/** Full case-study page for one verified client. No invented results, briefs or quotes. */
export function ClientCaseStudy({ client, locale = "en" }: { client: PortfolioClient; locale?: string }) {
  const l = (p: string) => `/${locale}${p}`;
  const rec = getCaseStudy(client.slug);
  const ed = editorialFor(client.slug);
  const types = clientWorkTypes(client);
  const total = client.sections.reduce((n, s) => n + s.media.length, 0);
  const galleries = Array.from(new Set(client.sections.map((s) => s.gallery))) as CategorySlug[];
  return (
    <article>
      {rec ? <CaseStudyGraph slug={rec.slug} locale={locale} /> : <JsonLd data={clientJsonLd(client)} />}
      <Breadcrumb locale={locale} emitSchema={!rec} items={[{ label: "Home", href: "/" }, { label: "Work", href: "/work" }, { label: "Case Studies", href: "/case-studies" }, { label: client.name }]} />

      <section className="px-6 lg:px-12 pt-24 pb-12" aria-label={`${client.name} overview`}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="flex flex-wrap gap-3 text-xs font-bold uppercase tracking-[0.15em] text-gray-600">
              {(rec?.industryLabel && !/^confirm/i.test(rec.industryLabel) && rec.kind !== "inhouse" ? rec.industryLabel : client.industry) && <span>{rec?.industryLabel && !/^confirm/i.test(rec.industryLabel) && rec.kind !== "inhouse" ? rec.industryLabel : client.industry}</span>}
              {client.type === "internal" && <span className="border border-gray-300 px-2 py-0.5 text-gray-600">In-house brand</span>}
            </div>
            <h1 className={`${display} text-[clamp(2rem,5vw,3.5rem)] font-extrabold tracking-tight leading-[1.1] mt-3`}>{rec?.h1 ?? client.name}</h1>
            <p className="text-lg text-gray-600 leading-relaxed mt-5 max-w-xl">{ed?.lede ?? client.summary}</p>
            <ul className="flex flex-wrap gap-2 mt-6 list-none p-0" aria-label="Work shown on this page">
              {types.map((t) => (
                <li key={t} className="border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700">
                  {t}
                </li>
              ))}
            </ul>
            <p className="text-sm text-gray-600 mt-4">
              {total} piece{total === 1 ? "" : "s"} shown. {client.type === "internal" ? "Internal creative for Markit Media's own brand, not paid client work." : "Artwork designed by Markit Media."}
            </p>
            <div className="flex flex-wrap gap-3 mt-7">
              <Link href={l("/get-a-quote")} className="bg-black text-white px-6 py-3.5 font-bold hover:bg-gray-800 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
                Discuss Your Project →
              </Link>
              <Link href={l("/case-studies")} className="border border-gray-300 px-6 py-3.5 font-bold hover:border-black transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
                All Case Studies
              </Link>
            </div>
          </div>
          {client.hero && (
            <div className="bg-gray-50 border border-gray-200 flex items-center justify-center">
              <PortfolioImage id={client.hero} priority sizes="(min-width: 1024px) 50vw, 100vw" fit="contain" className="w-full h-auto max-h-[75vh]" />
            </div>
          )}
        </div>
      </section>

      <CaseStudySnapshot slug={client.slug} locale={locale} />

      <CaseStudyEditorial slug={client.slug} />

      <ClientDesignWork client={client} locale={locale} />

      <section className="px-6 lg:px-12 py-14" aria-label="Explore more work">
        <div className="max-w-7xl mx-auto">
          <h2 className={`${display} text-2xl font-extrabold`}>Explore more work</h2>
          <div className="flex flex-wrap gap-3 mt-5">
            {galleries.map((g) => (
              <Link key={g} href={l(CATEGORIES[g].route)} className="border border-gray-300 bg-white px-5 py-3 font-bold hover:border-black transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
                Explore {CATEGORIES[g].label} →
              </Link>
            ))}
            <Link href={l("/work")} className="border border-gray-300 bg-white px-5 py-3 font-bold hover:border-black transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
              Our Work →
            </Link>
          </div>
        </div>
      </section>

      <RelatedCaseStudies slug={client.slug} locale={locale} />

      <section className="px-6 lg:px-12 py-16 bg-black text-white text-center" aria-label="Get started">
        <div className="max-w-3xl mx-auto">
          <h2 className={`${display} text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight`}>Want work like this for your brand?</h2>
          <p className="text-gray-400 mt-4 mb-8">Tell us what you need and we will point you to the closest relevant work.</p>
          <Link href={l("/get-a-quote")} className="inline-block bg-white text-black px-8 py-4 font-bold hover:bg-gray-100 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
            Request a Quote →
          </Link>
        </div>
      </section>
    </article>
  );
}

/** Curated gallery for one creative category (reused inside the existing category pages). */
export function CategoryGallery({ category, locale = "en", heading, intro }: { category: CategorySlug; locale?: string; heading: string; intro: string }) {
  const items = galleryItems(category);
  const seen = new Map<string, string>();
  for (const i of items) seen.set(i.client, i.clientName);
  const filters = Array.from(seen, ([value, label]) => ({ value, label })).sort((a, b) => a.label.localeCompare(b.label));
  return (
    <section className="px-6 lg:px-12 py-12" aria-label={heading} id="gallery">
      <div className="max-w-7xl mx-auto">
        <h2 className={`${display} text-2xl md:text-3xl font-extrabold tracking-tight`}>{heading}</h2>
        <p className="text-gray-500 mt-2 mb-6 max-w-3xl">{intro}</p>
        <GalleryGrid items={items} filters={filters} filterBy="client" label={`${CATEGORIES[category].label} designs`} initial={12} step={12} locale={locale} />
      </div>
    </section>
  );
}

/** Cross-client best-of showcase for the /work hub. */
export function OurWorkShowcase({ locale = "en" }: { locale?: string }) {
  const l = (p: string) => `/${locale}${p}`;
  const items = galleryItems("our-work");
  const filters = (Object.keys(CATEGORIES) as CategorySlug[]).map((k) => ({ value: k, label: CATEGORIES[k].label }));
  return (
    <section className="px-6 lg:px-12 py-16" aria-label="Our work: selected creative" id="selected-creative">
      <div className="max-w-7xl mx-auto">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-600">Selected Creative</p>
        <h2 className={`${display} text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold tracking-tight mt-2`}>Our Work, Across Every Client</h2>
        <p className="text-gray-500 mt-3 mb-6 max-w-3xl">
          A curated selection from our logo, social media, food and fashion design work. Every piece links to the client it was made for.
        </p>
        <div className="flex flex-wrap gap-3 mb-8">
          {(Object.keys(CATEGORIES) as CategorySlug[]).map((k) => (
            <Link key={k} href={l(CATEGORIES[k].route)} className="border border-gray-300 px-5 py-3 font-bold hover:border-black transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
              {CATEGORIES[k].label} →
            </Link>
          ))}
          <Link href={l("/case-studies")} className="bg-black text-white px-5 py-3 font-bold hover:bg-gray-800 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
            All Client Case Studies →
          </Link>
        </div>
        <GalleryGrid items={items} filters={filters} filterBy="cat" label="selected work" initial={12} step={12} locale={locale} />
      </div>
    </section>
  );
}

/** Searchable directory of every client case study. */
export function ClientDirectorySection({ locale = "en" }: { locale?: string }) {
  const entries: DirectoryEntry[] = publishedClients()
    .filter((c) => c.hero)
    .map((c) => {
      const id = c.hero as string;
      const m = getMedia(id);
      return {
        slug: c.slug,
        name: c.name,
        industry: c.industry,
        href: clientRoute(c),
        src: mediaUrl(id, mediaVariant(id, 480)),
        srcSet: srcSet(id),
        w: m.w,
        h: m.h,
        bg: m.bg,
        alt: m.a,
        types: clientWorkTypes(c),
        kinds: c.sections.map((s) => s.kind),
        internal: c.type === "internal",
        ...(() => {
          const r = getCaseStudy(c.slug === "cambridge" ? "cambridge-electrical" : c.slug);
          return {
            place: r?.locationVerified ? r.location : null,
            service: r?.serviceLinks[0] ? serviceName(r.serviceLinks[0]) : null,
            group: r ? industryGroup(r) : "Other",
            region: r ? locationRegion(r) : null,
            featured: r?.kind === "featured",
          };
        })(),
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
  return (
    <section className="px-6 lg:px-12 py-16" aria-label="All client case studies" id="all-clients">
      <div className="max-w-7xl mx-auto">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-600">Client Case Studies</p>
        <h2 className={`${display} text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold tracking-tight mt-2`}>Every client, one page</h2>
        <p className="text-gray-500 mt-3 mb-8 max-w-3xl">
          Each client has one page showing all of their work together: logos, social media and food or fashion design where we made it.
        </p>
        <ClientDirectory entries={entries} locale={locale} />
      </div>
    </section>
  );
}

export function allPortfolioClients() {
  return allClients();
}
