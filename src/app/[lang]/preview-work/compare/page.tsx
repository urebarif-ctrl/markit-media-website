import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, siteContext } from "@/lib/preview-work";
import { DISPLAY, ImageGrid, L, PAD, PreviewBar } from "@/components/preview-work/preview-parts";
import { previewMeta } from "@/components/preview-work/preview-meta";

export const metadata = previewMeta("Before and after galleries");
const SLUGS = ["hubco", "my-fresh-fruits", "american-auto-parts", "pur-health", "elite", "pakhlanze", "meezotech"];

export default async function Compare({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (lang !== "en") notFound();
  const rows = SLUGS.map((s) => ({ p: getProject(s), ctx: siteContext(s) })).filter((r) => r.p);
  return (
    <article>
      <PreviewBar label="Before and after" />
      <section className={`${PAD} pt-24 pb-6`} aria-label="Overview">
        <div className="max-w-7xl mx-auto">
          <nav aria-label="Breadcrumb" className="text-sm text-gray-600 mb-5"><Link href={L("/preview-work")} className="underline underline-offset-4 hover:text-black">Preview portfolio</Link> / Before and after</nav>
          <h1 className={`${DISPLAY} text-[clamp(2rem,5vw,3.25rem)] font-extrabold tracking-tight leading-[1.1]`}>Before and after: updated galleries</h1>
          <p className="text-lg text-gray-600 mt-4 max-w-3xl">For each existing client page: what the live gallery shows today (before) and what it would show once the archive work is added (after). Duplicates of live images are not added again.</p>
          <ul className="flex flex-wrap gap-3 mt-5 text-sm list-none p-0">{rows.map(({ p }) => p && (<li key={p.slug}><a href={`#${p.slug}`} className="border border-gray-300 px-3 py-1.5 font-semibold hover:border-black focus-visible:outline-2 focus-visible:outline-black">{p.name}</a></li>))}</ul>
        </div>
      </section>
      {rows.map(({ p, ctx }, i) => p && (
        <section key={p.slug} id={p.slug} className={`${PAD} py-12 scroll-mt-20 ${i % 2 ? "bg-gray-50" : ""}`} aria-labelledby={`h-${p.slug}`}>
          <div className="max-w-7xl mx-auto">
            <h2 id={`h-${p.slug}`} className={`${DISPLAY} text-2xl font-extrabold`}>{p.name}</h2>
            <p className="text-sm text-gray-600 mt-1">Before: <b>{ctx.gallery.length}</b> images on the live page. After: <b>{ctx.gallery.length + p.counts.images}</b> images{p.counts.videos ? `, ${p.counts.videos} videos` : ""}{p.counts.stories ? `, ${p.counts.stories} stories` : ""}. <Link href={L(`/preview-work/${p.slug}`)} className="underline underline-offset-4">Full project page →</Link></p>
            <div className="grid lg:grid-cols-[1fr_2fr] gap-8 mt-6">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-gray-500 mb-3">Before (live today)</h3>
                {ctx.gallery.length ? (
                  <ul className="grid grid-cols-3 gap-2 list-none p-0">
                    {ctx.gallery.slice(0, 12).map((g) => (
                      <li key={g.id} className="bg-white border border-gray-200">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={g.src} width={g.w} height={g.h} loading="lazy" decoding="async" alt={g.alt} className="w-full aspect-square object-cover block" />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="border border-dashed border-gray-300 p-6 text-sm text-gray-600">The live page has no gallery images today.</p>
                )}
                {ctx.gallery.length > 12 && <p className="text-xs text-gray-600 mt-2">+{ctx.gallery.length - 12} more on the live page</p>}
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-gray-500 mb-3">After (live + new from the archive)</h3>
                <ImageGrid items={p.images} name={p.name} max={12} />
              </div>
            </div>
          </div>
        </section>
      ))}
    </article>
  );
}
