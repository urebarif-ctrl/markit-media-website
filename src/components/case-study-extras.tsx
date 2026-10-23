import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { allClients, clientRoute, type CategorySlug } from "@/lib/portfolio";
import { CASE_CARDS, LOCATION_CASES } from "@/data/case-studies/linking";
import { editorialFor } from "@/data/case-studies/editorial";
import {
  SERVICE_GROUPS,
  allCaseStudies,
  caseStudyGraph,
  getCaseStudy,
  imageFor,
  industryDisplayName,
  industryName,
  isCaseStudyIndexable,
  isIndexingHeld,
  relatedAnchor,
  relatedCaseStudies,
  serviceName,
} from "@/lib/case-studies";

const display = "font-[family-name:var(--font-display)]";
const focus = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black";

/** One JSON-LD @graph for the page (WebPage, Article, client, hero image, breadcrumb, services). */
export function CaseStudyGraph({ slug, locale = "en" }: { slug: string; locale?: string }) {
  const g = caseStudyGraph(slug, locale);
  return g ? <JsonLd data={g} /> : null;
}

/** Facts box. A row is shown only when the fact is verified (see the uncertainty ledger). */
export function CaseStudySnapshot({ slug, locale = "en" }: { slug: string; locale?: string }) {
  const r = getCaseStudy(slug);
  if (!r) return null;
  const ed = editorialFor(slug);
  const l = (p: string) => `/${locale}${p}`;
  const industry = r.industryLabel && !/^confirm/i.test(r.industryLabel) && !/^(in-house brand|portfolio)$/i.test(r.industryLabel) ? r.industryLabel : null;
  const rows: Array<[string, React.ReactNode]> = [["Client", r.name]];
  if (industry) rows.push(["Industry", industry]);
  if (r.locationVerified && r.location) rows.push(["Location", r.location]);
  if (r.serviceLinks.length) {
    rows.push([
      "Services",
      <span key="svc" className="flex flex-wrap gap-x-4 gap-y-1">
        {r.serviceLinks.map((p) => (
          <Link key={p} href={l(p)} className={`underline underline-offset-2 hover:text-black ${focus}`}>
            {serviceName(p)}
          </Link>
        ))}
      </span>,
    ]);
  }
  if (ed?.projectYear) rows.push(["Year", String(ed.projectYear)]);
  if (r.websiteVerified && r.website) {
    const host = new URL(r.website).hostname.replace(/^www\./, "");
    rows.push([
      "Website",
      <a key="web" href={r.website} target="_blank" rel="noopener noreferrer" className={`underline underline-offset-2 hover:text-black ${focus}`}>
        {host}
      </a>,
    ]);
  }
  if (ed?.deliverables) rows.push(["Deliverables", ed.deliverables]);
  return (
    <section className="px-6 lg:px-12 pb-10" aria-label="Project snapshot">
      <div className="max-w-5xl mx-auto border border-gray-200 bg-gray-50 p-6">
        <h2 className={`${display} text-lg font-extrabold`}>Project snapshot</h2>
        <dl className="mt-4 grid sm:grid-cols-[9rem_1fr] gap-x-6 gap-y-2 text-base text-gray-700">
          {rows.map(([k, v]) => (
            <div key={k} className="contents">
              <dt className="font-bold text-black">{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/** Rewritten copy: lede + sections. Renders nothing when a page has no editorial entry yet. */
export function CaseStudyEditorial({ slug, showLede = false }: { slug: string; showLede?: boolean }) {
  const ed = editorialFor(slug);
  if (!ed) return null;
  return (
    <section className="px-6 lg:px-12 py-10" aria-label="Case study">
      <div className="max-w-3xl mx-auto space-y-10">
        {showLede && <p className="text-xl text-gray-700 leading-relaxed">{ed.lede}</p>}
        {ed.sections.map((s) => (
          <div key={s.heading}>
            <h2 className={`${display} text-xl md:text-2xl font-extrabold text-black mb-4`}>{s.heading}</h2>
            {s.paragraphs?.map((p, i) => (
              <p key={i} className="text-lg text-gray-600 leading-relaxed mb-4">
                {p}
              </p>
            ))}
            {s.bullets && (
              <ul className="space-y-3">
                {s.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-lg text-gray-600 leading-relaxed">
                    <span className="text-black font-bold flex-shrink-0" aria-hidden="true">
                      &bull;
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

/** Four hand-picked related case studies, plain server-rendered links with descriptive anchor text. */
export function RelatedCaseStudies({ slug, locale = "en" }: { slug: string; locale?: string }) {
  const items = relatedCaseStudies(slug, 4);
  if (items.length === 0) return null;
  const l = (p: string) => `/${locale}${p}`;
  return (
    <section className="px-6 lg:px-12 py-14 bg-gray-50" aria-label="Related case studies">
      <div className="max-w-7xl mx-auto">
        <h2 className={`${display} text-2xl font-extrabold`}>Related case studies</h2>
        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-5 list-none p-0 mt-6">
          {items.map((r) => {
            const img = imageFor(r.slug, 480);
            return (
              <li key={r.slug}>
                <Link href={l(`/work/${r.slug}`)} className={`group block bg-white border border-gray-200 overflow-hidden hover:border-black transition-colors ${focus}`}>
                  {img && (
                    <div className="aspect-[4/3] overflow-hidden" style={{ backgroundColor: img.bg }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img.src}
                        srcSet={img.srcSet}
                        sizes="(min-width: 1024px) 25vw, 50vw"
                        width={img.w}
                        height={img.h}
                        alt={img.alt}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300 motion-reduce:transition-none"
                      />
                    </div>
                  )}
                  <p className="p-4 font-extrabold group-hover:underline">{relatedAnchor(r)}</p>
                </Link>
              </li>
            );
          })}
        </ul>
        <CaseStudyContextLinks slug={slug} locale={locale} />
      </div>
    </section>
  );
}

/** "More restaurant work · Social media services · Marketing in Houston": only links that are verified and relevant. */
export function CaseStudyContextLinks({ slug, locale = "en" }: { slug: string; locale?: string }) {
  const r = getCaseStudy(slug);
  if (!r) return null;
  const l = (p: string) => `/${locale}${p}`;
  const parts: Array<{ href: string; label: string }> = [];
  for (const ind of r.industryLinks.slice(0, 3)) parts.push({ href: l(ind), label: `More ${industryName(ind).toLowerCase()} work` });
  const svc = r.serviceLinks[0];
  if (svc) parts.push({ href: l(svc), label: `${serviceName(svc)} services` });
  const loc = r.locationVerified ? r.locationLinks[0] : undefined;
  if (loc) parts.push({ href: l(loc), label: `Marketing in ${loc.split("/").filter(Boolean).slice(-1)[0].replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}` });
  if (parts.length === 0) return null;
  return (
    <p className="mt-8 text-base text-gray-700">
      {parts.map((p, i) => (
        <span key={p.href}>
          {i > 0 && <span aria-hidden="true"> · </span>}
          <Link href={p.href} className={`underline underline-offset-2 hover:text-black ${focus}`}>
            {p.label}
          </Link>
        </span>
      ))}
    </p>
  );
}

/** Collection pages link out to every client page that has work in that category. */
export function CollectionClientList({ category, locale = "en", heading }: { category: CategorySlug; locale?: string; heading: string }) {
  const clients = allClients()
    .filter((c) => c.status === "draft" && c.sections.some((s) => s.gallery === category))
    .sort((a, b) => a.name.localeCompare(b.name));
  if (clients.length === 0) return null;
  const l = (p: string) => `/${locale}${p}`;
  return (
    <section className="px-6 lg:px-12 py-12" aria-label={heading}>
      <div className="max-w-7xl mx-auto">
        <h2 className={`${display} text-2xl font-extrabold`}>{heading}</h2>
        <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 list-none p-0 text-base">
          {clients.map((c) => (
            <li key={c.id}>
              <Link href={l(clientRoute(c))} className={`underline underline-offset-2 hover:text-black text-gray-700 ${focus}`}>
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Every work page, grouped by service, as plain links (the /work hub previously linked only 24 of them). */
export function WorkLinksByService({ locale = "en" }: { locale?: string }) {
  const l = (p: string) => `/${locale}${p}`;
  const all = allCaseStudies();
  const groups = SERVICE_GROUPS.map((g) => ({
    ...g,
    items: all.filter((r) => r.kind !== "collection" && r.serviceLinks.some((p) => g.match(p))).sort((a, b) => a.name.localeCompare(b.name)),
  })).filter((g) => g.items.length > 0);
  const grouped = new Set(groups.flatMap((g) => g.items.map((i) => i.slug)));
  const other = all.filter((r) => r.kind !== "collection" && !grouped.has(r.slug)).sort((a, b) => a.name.localeCompare(b.name));
  const collections = all.filter((r) => r.kind === "collection");
  return (
    <section className="px-6 lg:px-12 py-14" aria-label="Every project by service" id="all-projects">
      <div className="max-w-7xl mx-auto">
        <h2 className={`${display} text-2xl md:text-3xl font-extrabold tracking-tight`}>Every project, by service</h2>
        <p className="text-gray-600 mt-3 max-w-3xl">
          Each link opens that client&apos;s page. The written client stories are on the{" "}
          <Link href={l("/case-studies")} className={`underline underline-offset-2 hover:text-black ${focus}`}>
            case studies page
          </Link>
          .
        </p>
        <div className="grid md:grid-cols-2 gap-x-10 gap-y-8 mt-8">
          {groups.map((g) => (
            <div key={g.key}>
              <h3 className="font-extrabold">{g.label}</h3>
              <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 list-none p-0 text-base">
                {g.items.map((r) => (
                  <li key={r.slug}>
                    <Link href={l(`/work/${r.slug}`)} className={`underline underline-offset-2 text-gray-700 hover:text-black ${focus}`}>
                      {r.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {other.length > 0 && (
            <div>
              <h3 className="font-extrabold">Other projects</h3>
              <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 list-none p-0 text-base">
                {other.map((r) => (
                  <li key={r.slug}>
                    <Link href={l(`/work/${r.slug}`)} className={`underline underline-offset-2 text-gray-700 hover:text-black ${focus}`}>
                      {r.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div>
            <h3 className="font-extrabold">Portfolio collections</h3>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 list-none p-0 text-base">
              {collections.map((r) => (
                <li key={r.slug}>
                  <Link href={l(`/work/${r.slug}`)} className={`underline underline-offset-2 text-gray-700 hover:text-black ${focus}`}>
                    {r.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/** "Work for {place} businesses": plain links to case studies whose location is verified (see data/case-studies/linking.ts). */
export function LocationWork({ path, heading, locale = "en" }: { path: string; heading: string; locale?: string }) {
  const slugs = LOCATION_CASES[path.replace(/^\//, "")] ?? [];
  const items = slugs.map((s) => ({ s, rec: getCaseStudy(s), card: CASE_CARDS[s] })).filter((x) => x.rec && x.card);
  if (items.length === 0) return null;
  const l = (p: string) => `/${locale}${p}`;
  return (
    <section className="px-6 lg:px-12 py-14" aria-label={heading}>
      <div className="max-w-7xl mx-auto">
        <h2 className={`${display} text-2xl font-extrabold`}>{heading}</h2>
        <ul className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 list-none p-0">
          {items.map(({ s, rec, card }) => (
            <li key={s}>
              <Link href={l(`/work/${s}`)} className={`block border border-gray-200 p-5 hover:border-black transition-colors ${focus}`}>
                <span className="text-xs font-bold uppercase tracking-wide text-gray-600">{card.l}</span>
                <span className="block font-extrabold mt-2 underline-offset-2 hover:underline">{rec!.name}</span>
                {rec!.locationVerified && rec!.location && <span className="block text-sm text-gray-600 mt-1">{rec!.location}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Plain links from the hub to every industry page, each with that industry's case studies (indexable, not held for approval). */
export function CaseStudiesByIndustry({ locale = "en" }: { locale?: string }) {
  const l = (p: string) => `/${locale}${p}`;
  const groups = new Map<string, ReturnType<typeof allCaseStudies>>();
  for (const r of allCaseStudies()) {
    if (r.kind === "collection" || r.kind === "inhouse" || !isCaseStudyIndexable(r.slug) || isIndexingHeld(r.slug)) continue;
    if (/^confirm/i.test(r.industryLabel ?? "")) continue;
    for (const p of r.industryLinks) groups.set(p, [...(groups.get(p) ?? []), r]);
  }
  const rows = [...groups]
    .map(([path, items]) => ({ path, name: industryDisplayName(path), items: [...items].sort((a, b) => a.name.localeCompare(b.name)) }))
    .sort((a, b) => a.name.localeCompare(b.name));
  if (rows.length === 0) return null;
  return (
    <section className="px-6 lg:px-12 py-14" aria-label="Case studies by industry" id="by-industry">
      <div className="max-w-7xl mx-auto">
        <h2 className={`${display} text-2xl md:text-3xl font-extrabold tracking-tight`}>Case studies by industry</h2>
        <p className="text-gray-600 mt-3 max-w-3xl">Each industry heading opens our page for that market; the links below it are the matching client stories.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8 mt-8">
          {rows.map((g) => (
            <div key={g.path}>
              <h3 className="font-extrabold">
                <Link href={l(g.path)} className={`underline underline-offset-2 hover:text-black ${focus}`}>
                  {g.name} marketing
                </Link>
              </h3>
              <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 list-none p-0 text-base">
                {g.items.map((r) => (
                  <li key={r.slug}>
                    <Link href={l(`/work/${r.slug}`)} className={`underline underline-offset-2 text-gray-700 hover:text-black ${focus}`}>
                      {r.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
