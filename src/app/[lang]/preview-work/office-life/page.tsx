import Link from "next/link";
import { notFound } from "next/navigation";
import { fmtDate, officeItems, office } from "@/lib/preview-work";
import { DISPLAY, L, PAD, PreviewBar, SectionHead } from "@/components/preview-work/preview-parts";
import { previewMeta } from "@/components/preview-work/preview-meta";

export const metadata = previewMeta("Office life gallery (not client work)");

const clean = (s: string) => s.replace(/#\w+/g, "").replace(/\s+/g, " ").trim();

export default async function OfficeLife({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (lang !== "en") notFound();
  const all = officeItems();
  const reels = all.filter((o) => o.kind === "reel").sort((a, b) => b.date.localeCompare(a.date));
  const posts = all.filter((o) => o.kind === "post").sort((a, b) => b.date.localeCompare(a.date));
  const cell = (o: (typeof all)[number]) => (
    <li key={o.id} className="bg-gray-100 border border-gray-200">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={office(o.id)} width={o.kind === "reel" ? 180 : 200} height={o.kind === "reel" ? 320 : 250} loading="lazy" decoding="async" alt={clean(o.cap) ? `Office content: ${clean(o.cap).slice(0, 90)}` : `Office content, ${fmtDate(o.date)}`} className={`w-full object-cover block ${o.kind === "reel" ? "aspect-[9/16]" : "aspect-[4/5]"}`} />
      <p className="text-[11px] text-gray-600 px-2 py-1">{fmtDate(o.date)}</p>
    </li>
  );
  return (
    <article>
      <PreviewBar label="Office life" />
      <section className={`${PAD} pt-24 pb-8`} aria-label="Overview">
        <div className="max-w-7xl mx-auto">
          <nav aria-label="Breadcrumb" className="text-sm text-gray-600 mb-5"><Link href={L("/preview-work")} className="underline underline-offset-4 hover:text-black">Preview portfolio</Link> / Office life</nav>
          <h1 className={`${DISPLAY} text-[clamp(2rem,5vw,3.25rem)] font-extrabold tracking-tight leading-[1.1]`}>Office life and team content</h1>
          <p className="text-lg text-gray-600 mt-4 max-w-3xl">Relatable office-life and POV reels, team moments and internal posts from our own Instagram. This is Markit Media&apos;s own content: it is kept apart from client work and is not evidence of any client engagement.</p>
          <p className="text-sm text-gray-600 mt-3">{reels.length} reels · {posts.length} posts. Still frames only in this preview.</p>
        </div>
      </section>
      <section className={`${PAD} py-8`} aria-labelledby="reels"><div className="max-w-7xl mx-auto">
        <SectionHead id="reels" title={`Reels (${reels.length})`} />
        <ul className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-8 gap-2 list-none p-0">{reels.map(cell)}</ul>
      </div></section>
      <section className={`${PAD} py-8 bg-gray-50`} aria-labelledby="posts"><div className="max-w-7xl mx-auto">
        <SectionHead id="posts" title={`Team and office posts (${posts.length})`} />
        <ul className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-8 gap-2 list-none p-0">{posts.map(cell)}</ul>
      </div></section>
    </article>
  );
}
