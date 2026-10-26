import Link from "next/link";
import { notFound } from "next/navigation";
import { allProjects, excludedItems, officeItems } from "@/lib/preview-work";
import { DISPLAY, L, PAD, Pill, PreviewBar, ProjectCard, SectionHead } from "@/components/preview-work/preview-parts";
import { previewMeta } from "@/components/preview-work/preview-meta";

export const metadata = previewMeta("Portfolio merge, all projects");

export default async function PreviewHub({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (lang !== "en") notFound();
  const all = allProjects();
  const groups = [
    { id: "clients", title: "Client projects", note: "Named in our own client posts or already live as case studies.", items: all.filter((p) => p.kind === "client") },
    { id: "projects", title: "Projects", note: "Visible in our archive with a Markit Media context. Scope is described only as far as the archive shows it.", items: all.filter((p) => p.kind === "project" && p.verification !== "review") },
    { id: "collab", title: "Event collaborations", note: "Partnerships rather than paid-client engagements.", items: all.filter((p) => p.kind === "collaboration") },
    { id: "review", title: "Needs review before any publication", note: "Rights, authorship or compliance questions are open. Private preview only.", items: all.filter((p) => p.verification === "review") },
  ];
  const withNew = all.filter((p) => p.counts.images + p.counts.callebaut + p.counts.videos + p.counts.stories > 0).length;
  const live = all.filter((p) => p.live).length;
  return (
    <article>
      <PreviewBar label="Hub" />
      <section className={`${PAD} pt-24 pb-10 bg-black text-white`} aria-label="Overview">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">Private preview · not live · noindex</p>
          <h1 className={`${DISPLAY} text-[clamp(2rem,5vw,3.75rem)] font-extrabold tracking-tight leading-[1.08] mt-4 max-w-4xl`}>Portfolio merge: every verified project, one case study each</h1>
          <p className="text-lg text-gray-400 mt-5 max-w-3xl">Our Instagram archive reconciled with the live case studies. {all.length} projects, {live} with an existing live page and {all.length - live} new. Client work and office-life content are kept in separate galleries.</p>
          <div className="flex flex-wrap gap-3 mt-7">
            <Link href={L("/preview-work/event-partners")} className="bg-white text-black px-6 py-3 font-bold hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">Event partners and inquiry form →</Link>
            <Link href={L("/preview-work/compare")} className="border border-white/30 px-6 py-3 font-bold hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">Before and after galleries →</Link>
            <Link href={L("/preview-work/office-life")} className="border border-white/30 px-6 py-3 font-bold hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">Office life gallery (not client work) →</Link>
          </div>
          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-10 pt-8 border-t border-white/10 max-w-3xl">
            {[[String(all.length), "Project pages"], [String(withNew), "With new archive media"], [String(live), "Extend a live page"], [String(officeItems().length), "Office items (separate)"]].map(([v, k]) => (
              <div key={k}><dd className={`${DISPLAY} text-3xl font-extrabold`}>{v}</dd><dt className="text-xs text-white/50 mt-1">{k}</dt></div>
            ))}
          </dl>
        </div>
      </section>
      {groups.filter((g) => g.items.length).map((g, i) => (
        <section key={g.id} className={`${PAD} py-12 ${i % 2 ? "bg-gray-50" : ""}`} aria-labelledby={g.id}>
          <div className="max-w-7xl mx-auto">
            <SectionHead id={g.id} title={`${g.title} (${g.items.length})`} note={g.note} />
            <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 list-none p-0">
              {g.items.map((p) => (<li key={p.slug}><ProjectCard p={p} /></li>))}
            </ul>
          </div>
        </section>
      ))}
      <section className={`${PAD} py-12 border-t border-gray-200`} aria-labelledby="excl">
        <div className="max-w-7xl mx-auto">
          <SectionHead id="excl" title="Left out on purpose" note="Items that were found but are not shown on any project page." />
          <ul className="space-y-2 text-sm text-gray-700 list-disc pl-5">
            {excludedItems().map((e) => (<li key={e.item}><b>{e.item}:</b> {e.reason}</li>))}
          </ul>
          <p className="mt-4"><Pill tone="grey">Nothing here is published</Pill></p>
        </div>
      </section>
    </article>
  );
}
