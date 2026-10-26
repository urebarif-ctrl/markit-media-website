import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allProjects, getProject, RESERVED, siteContext, KIND_LABEL, VERIFY_LABEL, span, fmtDate, img, thumb, type PProject } from "@/lib/preview-work";
import { DISPLAY, ImageGrid, L, PAD, Pill, PreviewBar, SectionHead, StoryGrid, VideoGrid, verifyTone } from "@/components/preview-work/preview-parts";
import { previewMeta } from "@/components/preview-work/preview-meta";

export const dynamicParams = false;
export function generateStaticParams() {
  return allProjects().filter((p) => !RESERVED.includes(p.slug)).map((p) => ({ lang: "en", slug: p.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  return previewMeta(p ? `${p.name} case study` : "Project");
}

const RESTRICTED = new Set(["velo-pakistan", "vuse"]);

export default async function PreviewProject({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  if (lang !== "en" || RESERVED.includes(slug)) notFound();
  const p = getProject(slug);
  if (!p) notFound();
  const ctx = siteContext(slug);
  const n = p.counts;
  const restricted = RESTRICTED.has(p.slug);
  const hasNew = n.images + n.callebaut + n.videos + n.stories > 0;
  const total = n.images + n.callebaut + n.videos + n.stories + ctx.gallery.length;
  return (
    <article>
      <PreviewBar label={p.name} />
      <section className={`${PAD} pt-24 pb-10`} aria-label={`${p.name} overview`}>
        <div className="max-w-7xl mx-auto">
          <nav aria-label="Breadcrumb" className="text-sm text-gray-600 mb-5">
            <Link href={L("/preview-work")} className="underline underline-offset-4 hover:text-black">Preview portfolio</Link> / {p.name}
          </nav>
          <div className="flex flex-wrap gap-2 mb-4">
            <Pill tone="violet">{KIND_LABEL[p.kind]}</Pill>
            <Pill tone={verifyTone(p.verification)}>{VERIFY_LABEL[p.verification]}</Pill>
            {p.industry && <Pill tone="grey">{p.industry}</Pill>}
          </div>
          <h1 className={`${DISPLAY} text-[clamp(2rem,5vw,3.5rem)] font-extrabold tracking-tight leading-[1.1] max-w-4xl`}>{ctx.h1 ?? p.name}</h1>
          {ctx.lede && <p className="text-lg text-gray-600 leading-relaxed mt-5 max-w-3xl">{ctx.lede}</p>}
          <div className="mt-5 max-w-3xl space-y-4 text-gray-700 leading-relaxed">
            {p.paras.map((t, i) => (<p key={i}>{t}</p>))}
          </div>
          {p.scope[0] !== "Not established" && p.scope.length > 0 && (
            <ul className="flex flex-wrap gap-2 mt-6 list-none p-0" aria-label="Work shown, as stated in our own posts">
              {p.scope.map((s) => (<li key={s} className="border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700">{s}</li>))}
            </ul>
          )}
          <p className="text-sm text-gray-600 mt-5">
            {total} item{total === 1 ? "" : "s"} on this page{span(p) ? ` · archive items from ${span(p)}` : ""}.
            {p.kind === "collaboration" ? " Presented as a collaboration, not a paid-client engagement." : ""}
          </p>
          {p.flags && p.flags.length > 0 && (
            <div role="note" className="mt-6 border border-amber-300 bg-amber-50 text-amber-950 p-4 max-w-3xl">
              <p className="font-bold text-sm">Review notes (preview only)</p>
              <ul className="list-disc pl-5 text-sm mt-2 space-y-1">{p.flags.map((f) => (<li key={f}>{f}</li>))}</ul>
            </div>
          )}
          <div className="flex flex-wrap gap-3 mt-7">
            {p.live ? (
              <Link href={L(p.live)} className="border border-gray-300 px-5 py-3 font-bold hover:border-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">View the current live page →</Link>
            ) : (
              <span className="border border-dashed border-gray-300 px-5 py-3 text-sm text-gray-600">No live page yet: this would be a new page.</span>
            )}
            {p.slug === "yaar-bazaar" && <Link href={L("/preview-work/event-partners")} className="bg-black text-white px-5 py-3 font-bold hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Event partners and inquiry form →</Link>}
          </div>
        </div>
      </section>

      {ctx.gallery.length > 0 && (
        <section className={`${PAD} py-10 bg-gray-50`} aria-labelledby="site-work">
          <div className="max-w-7xl mx-auto">
            <SectionHead id="site-work" title="Already on the live case study" note="Images from the existing portfolio data, shown for comparison. They are not repeated below." />
            <ul className="columns-2 md:columns-3 lg:columns-4 gap-3 [&>li]:break-inside-avoid [&>li]:mb-3 list-none p-0">
              {ctx.gallery.slice(0, 16).map((g) => (
                <li key={g.id} className="bg-white border border-gray-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={g.src} srcSet={g.srcSet} sizes="(min-width:1024px) 25vw, 50vw" width={g.w} height={g.h} loading="lazy" decoding="async" alt={g.alt} className="w-full h-auto block" />
                </li>
              ))}
            </ul>
            {ctx.gallery.length > 16 && <p className="text-sm text-gray-600 mt-2">{ctx.gallery.length - 16} more on the live page.</p>}
          </div>
        </section>
      )}

      {n.images > 0 && (
        <section className={`${PAD} py-12`} aria-labelledby="archive-images">
          <div className="max-w-7xl mx-auto">
            <SectionHead id="archive-images" title={p.slug === "shahi" ? "The artwork in our archive" : "New from our Instagram archive"} note={`${n.images} unique image${n.images === 1 ? "" : "s"}. Exact duplicates and re-crops of the same artwork were removed; the highest-resolution version is kept.`} />
            {restricted ? (
              <details>
                <summary className="cursor-pointer inline-block border border-gray-300 px-4 py-2.5 text-sm font-bold hover:border-black">Show source material (age-restricted, authorship unverified)</summary>
                <div className="mt-4"><ImageGrid items={p.images} name={p.name} /></div>
              </details>
            ) : (
              <ImageGrid items={p.images} name={p.name} />
            )}
          </div>
        </section>
      )}

      {n.callebaut > 0 && (
        <section className={`${PAD} py-12 bg-gray-50`} aria-labelledby="callebaut">
          <div className="max-w-7xl mx-auto">
            <SectionHead id="callebaut" title="Early product creatives (July 2020)" note={p.callebaut_note} />
            <ImageGrid items={p.callebaut} name={`${p.name} early product`} max={9} />
          </div>
        </section>
      )}

      {n.videos > 0 && (
        <section className={`${PAD} py-12 bg-black text-white`} aria-labelledby="reels">
          <div className="max-w-7xl mx-auto">
            <div className="mb-5">
              <h2 id="reels" className={`${DISPLAY} text-2xl font-extrabold tracking-tight`}>Reels and videos</h2>
              <p className="text-sm text-white/60 mt-1">{n.videos} video{n.videos === 1 ? "" : "s"}. Preview copies are compressed.</p>
            </div>
            <VideoGrid items={p.videos} name={p.name} />
          </div>
        </section>
      )}

      {n.stories > 0 && (
        <section className={`${PAD} py-12`} aria-labelledby="stories">
          <div className="max-w-7xl mx-auto">
            <SectionHead id="stories" title="Instagram stories" note="Still frames from stories that show this project. Stories can include client reposts and work in progress." />
            {restricted ? (
              <details>
                <summary className="cursor-pointer inline-block border border-gray-300 px-4 py-2.5 text-sm font-bold hover:border-black">Show stories (age-restricted, authorship unverified)</summary>
                <div className="mt-4"><StoryGrid items={p.stories} name={p.name} /></div>
              </details>
            ) : (
              <StoryGrid items={p.stories} name={p.name} />
            )}
          </div>
        </section>
      )}

      {!hasNew && ctx.gallery.length === 0 && (
        <section className={`${PAD} py-12`}><div className="max-w-7xl mx-auto"><p className="text-gray-600">No additional media for this project beyond what the live page already shows.</p></div></section>
      )}

      <section className={`${PAD} py-10 border-t border-gray-200`} aria-labelledby="provenance">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 text-sm text-gray-700">
          <div>
            <h2 id="provenance" className={`${DISPLAY} text-lg font-extrabold`}>How this page was assembled</h2>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Every item comes from our own Instagram data export and was attributed by caption, text inside the image, or the post it belongs to.</li>
              <li>Items were compared by file checksum, visual similarity and cropping against each other and against the live site, so artwork already on the live page is not shown again.</li>
              {p.evidence?.map((e) => (<li key={e}>{e}</li>))}
            </ul>
          </div>
          <div>
            <h2 className={`${DISPLAY} text-lg font-extrabold`}>What this page does not claim</h2>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>No results, metrics, testimonials or revenue figures. Older posts that made performance claims are not repeated.</li>
              <li>No scope beyond what our own captions or the artwork itself shows.</li>
              <li>Preview only: not indexed, not linked from the live site, nothing here is published.</li>
            </ul>
          </div>
        </div>
      </section>
    </article>
  );
}
