// Shared pieces for the private portfolio preview. English only, noindex, not linked from the live site.
import Link from "next/link";
import { thumb, img, poster, video, story, fmtDate, KIND_LABEL, VERIFY_LABEL, span, type PProject, type PMedia } from "@/lib/preview-work";

export const L = (p: string) => `/en${p}`;
export const DISPLAY = "font-[family-name:var(--font-display)]";
export const PAD = "px-6 lg:px-12";

export function PreviewBar({ label }: { label: string }) {
  return (
    <Link
      href={L("/preview-work")}
      className="fixed bottom-4 left-4 z-50 bg-black/90 text-white text-xs font-bold px-3.5 py-2 rounded-full shadow-lg border border-white/20 hover:bg-[#5A3ED6] transition-colors focus-visible:outline-2 focus-visible:outline-white"
    >
      PRIVATE PREVIEW · {label} · not live · all projects
    </Link>
  );
}

export function Pill({ tone, children }: { tone: "green" | "amber" | "grey" | "violet"; children: React.ReactNode }) {
  const c = { green: "bg-green-50 text-green-800 border-green-200", amber: "bg-amber-50 text-amber-900 border-amber-300", grey: "bg-gray-100 text-gray-700 border-gray-200", violet: "bg-[#efeaff] text-[#3b2a9c] border-[#cfc4ff]" }[tone];
  return <span className={`inline-block rounded-full border px-3 py-1 text-xs font-semibold ${c}`}>{children}</span>;
}

export function verifyTone(v: PProject["verification"]) {
  return v === "verified" ? "green" : v === "evidenced" ? "grey" : "amber";
}

export function ImageGrid({ items, name, max = 18 }: { items: PMedia[]; name: string; max?: number }) {
  const head = items.slice(0, max), tail = items.slice(max);
  const cell = (m: PMedia) => (
    <li key={m.id} className="bg-gray-50 border border-gray-200">
      <a href={img(m.id)} target="_blank" rel="noopener noreferrer" className="block focus-visible:outline-2 focus-visible:outline-black" aria-label={`Open ${name} creative from ${fmtDate(m.date)} full size (opens in a new tab)`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={thumb(m.id)} width={m.w && m.h ? 480 : undefined} height={m.w && m.h ? Math.round((480 * m.h) / m.w) : undefined} loading="lazy" decoding="async" alt={`${name} creative, ${fmtDate(m.date)}`} className="w-full h-auto block" />
      </a>
    </li>
  );
  return (
    <>
      <ul className="columns-2 md:columns-3 lg:columns-4 gap-3 [&>li]:break-inside-avoid [&>li]:mb-3 list-none p-0">{head.map(cell)}</ul>
      {tail.length > 0 && (
        <details className="mt-2 group">
          <summary className="cursor-pointer inline-block border border-gray-300 px-4 py-2.5 text-sm font-bold hover:border-black focus-visible:outline-2 focus-visible:outline-black">Show {tail.length} more</summary>
          <ul className="columns-2 md:columns-3 lg:columns-4 gap-3 [&>li]:break-inside-avoid [&>li]:mb-3 list-none p-0 mt-4">{tail.map(cell)}</ul>
        </details>
      )}
    </>
  );
}

export function VideoGrid({ items, name }: { items: PMedia[]; name: string }) {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-4 gap-3 list-none p-0">
      {items.map((v) => (
        <li key={v.id} className="bg-black">
          <video controls preload="none" playsInline poster={poster(v.id)} className="w-full aspect-[9/16] object-contain bg-black" aria-label={`${name} video, ${fmtDate(v.date)}`}>
            <source src={video(v.id)} type="video/mp4" />
          </video>
          <p className="text-[11px] text-white/70 px-2 py-1">{fmtDate(v.date)}</p>
        </li>
      ))}
    </ul>
  );
}

export function StoryGrid({ items, name, max = 24 }: { items: PMedia[]; name: string; max?: number }) {
  const cell = (m: PMedia) => (
    <li key={m.id} className="bg-gray-100 border border-gray-200">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={story(m.id)} width={270} height={480} loading="lazy" decoding="async" alt={`${name} Instagram story, ${fmtDate(m.date)}`} className="w-full aspect-[9/16] object-cover block" />
    </li>
  );
  const head = items.slice(0, max), tail = items.slice(max);
  return (
    <>
      <ul className="grid grid-cols-3 md:grid-cols-6 gap-2 list-none p-0">{head.map(cell)}</ul>
      {tail.length > 0 && (
        <details className="mt-2">
          <summary className="cursor-pointer inline-block border border-gray-300 px-4 py-2.5 text-sm font-bold hover:border-black focus-visible:outline-2 focus-visible:outline-black">Show {tail.length} more stories</summary>
          <ul className="grid grid-cols-3 md:grid-cols-6 gap-2 list-none p-0 mt-4">{tail.map(cell)}</ul>
        </details>
      )}
    </>
  );
}

export function SectionHead({ id, title, note }: { id: string; title: string; note?: string }) {
  return (
    <div className="mb-5">
      <h2 id={id} className={`${DISPLAY} text-2xl font-extrabold tracking-tight`}>{title}</h2>
      {note && <p className="text-sm text-gray-600 mt-1 max-w-3xl">{note}</p>}
    </div>
  );
}

export function ProjectCard({ p }: { p: PProject }) {
  const cover = p.images[0];
  const v = p.videos[0];
  const s = p.stories[0];
  const src = cover ? thumb(cover.id) : v ? poster(v.id) : s ? story(s.id) : null;
  const n = p.counts;
  return (
    <Link href={L(`/preview-work/${p.slug}`)} className="group block border border-gray-200 bg-white hover:border-black transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
      <div className="aspect-[4/3] bg-gray-100 overflow-hidden flex items-center justify-center">
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 motion-reduce:transition-none" />
        ) : (
          <span className="text-sm text-gray-500 px-4 text-center">Existing live page only</span>
        )}
      </div>
      <div className="p-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-gray-500">{KIND_LABEL[p.kind]}{p.industry ? ` · ${p.industry}` : ""}</p>
        <h3 className={`${DISPLAY} text-lg font-extrabold mt-1`}>{p.name}</h3>
        <p className="text-xs text-gray-600 mt-2">
          {[n.images + n.callebaut ? `${n.images + n.callebaut} images` : "", n.videos ? `${n.videos} video${n.videos > 1 ? "s" : ""}` : "", n.stories ? `${n.stories} stories` : ""].filter(Boolean).join(" · ") || "Existing assets only"}
          {span(p) ? ` · ${span(p)}` : ""}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Pill tone={verifyTone(p.verification)}>{p.verification === "verified" ? "Verified" : p.verification === "evidenced" ? "Evidenced" : "Needs review"}</Pill>
          {p.live ? <Pill tone="violet">Live page exists</Pill> : <Pill tone="violet">New page</Pill>}
        </div>
      </div>
    </Link>
  );
}

export { VERIFY_LABEL, KIND_LABEL };
