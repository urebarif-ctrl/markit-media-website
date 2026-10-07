import type { Metadata } from "next";
import { getDb } from "@/lib/db";
import { notFound } from "next/navigation";

interface Package { name: string; price: string; recommended?: boolean; items: string[] }
interface CommercialNote { title: string; text: string }
interface CaseStudy { name: string; description: string; href: string }
interface Proposal {
  slug: string; client_name: string; client_company: string; title: string; subtitle: string;
  intro: string; packages: Package[]; commercial_notes: CommercialNote[]; case_studies: CaseStudy[];
  whatsapp: string; currency: string; status: string; valid_until: string | null; created_at: string;
}

function loadProposal(slug: string): Proposal | null {
  const db = getDb();
  const row = db.prepare("SELECT * FROM proposals WHERE slug = ? AND status != 'draft'").get(slug) as Record<string, unknown> | undefined;
  if (!row) return null;
  return {
    ...row,
    packages: JSON.parse(String(row.packages || "[]")),
    commercial_notes: JSON.parse(String(row.commercial_notes || "[]")),
    case_studies: JSON.parse(String(row.case_studies || "[]")),
  } as unknown as Proposal;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = loadProposal(slug);
  if (!p) return { title: "Proposal Not Found" };
  return {
    title: `${p.client_company || p.client_name} — ${p.title}`,
    description: `Private proposal prepared for ${p.client_company || p.client_name}.`,
    robots: { index: false, follow: false, nocache: true },
  };
}

export default async function ProposalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = loadProposal(slug);
  if (!p) notFound();

  const date = new Date(p.created_at);
  const dateStr = date.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  return (
    <main className="bg-white text-black">
      <section className="min-h-[72vh] bg-black text-white px-6 lg:px-12 py-20 flex items-end">
        <div className="max-w-6xl mx-auto w-full">
          <p className="uppercase tracking-[.24em] text-xs text-gray-400 mb-8">Private proposal · {dateStr}</p>
          <p className="text-lg text-gray-300 mb-3">{p.client_company || p.client_name} × Markit Media</p>
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(3rem,8vw,7rem)] leading-[.92] font-extrabold tracking-tight">
            {p.title.split("\n").map((line, i) => <span key={i}>{line}{i < p.title.split("\n").length - 1 && <br />}</span>)}
          </h1>
          {p.subtitle && <p className="mt-8 max-w-2xl text-lg text-gray-300 leading-relaxed">{p.subtitle}</p>}
        </div>
      </section>

      {p.intro && (
        <section className="px-6 lg:px-12 py-20">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[.8fr_1.2fr] gap-12">
            <div>
              <p className="uppercase tracking-[.2em] text-xs text-gray-500">01 · The opportunity</p>
              <h2 className="text-3xl lg:text-5xl font-extrabold mt-4">{p.title}</h2>
            </div>
            <div className="text-lg text-gray-600 leading-relaxed space-y-5">
              {p.intro.split("\n\n").map((para, i) => <p key={i}>{para}</p>)}
            </div>
          </div>
        </section>
      )}

      {p.packages.length > 0 && (
        <section className="bg-gray-50 px-6 lg:px-12 py-20">
          <div className="max-w-6xl mx-auto">
            <p className="uppercase tracking-[.2em] text-xs text-gray-500">02 · Monthly options</p>
            <h2 className="text-3xl lg:text-5xl font-extrabold mt-4 mb-12">Choose the level of momentum.</h2>
            <div className={`grid gap-6 ${p.packages.length === 1 ? "max-w-md" : p.packages.length === 2 ? "lg:grid-cols-2 max-w-4xl" : "lg:grid-cols-3"}`}>
              {p.packages.map((pkg) => (
                <article key={pkg.name} className={`relative p-7 border ${pkg.recommended ? "bg-black text-white border-black" : "bg-white border-gray-200"}`}>
                  {pkg.recommended && <span className="absolute right-5 top-5 text-[10px] uppercase tracking-[.16em] bg-white text-black px-3 py-1.5 font-bold">Recommended</span>}
                  <h3 className="text-2xl font-extrabold">{pkg.name}</h3>
                  <p className="text-3xl font-extrabold mt-5">{pkg.price}</p>
                  <p className={`text-sm mt-1 ${pkg.recommended ? "text-gray-400" : "text-gray-500"}`}>per month · excluding applicable taxes</p>
                  <ul className="mt-7 space-y-3 text-sm">
                    {pkg.items.map((item) => <li key={item} className="flex gap-2"><span>—</span><span>{item}</span></li>)}
                  </ul>
                </article>
              ))}
            </div>
            {p.packages.some(pkg => pkg.recommended) && (
              <div className="mt-8 border-l-4 border-black bg-white p-6">
                <p className="font-extrabold">Our recommendation: {p.packages.find(pkg => pkg.recommended)?.name}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {p.case_studies.length > 0 && (
        <section className="px-6 lg:px-12 py-20">
          <div className="max-w-6xl mx-auto">
            <p className="uppercase tracking-[.2em] text-xs text-gray-500">03 · Relevant work</p>
            <h2 className="text-3xl lg:text-5xl font-extrabold mt-4">Experience that matters.</h2>
            <div className="grid md:grid-cols-3 gap-5 mt-10">
              {p.case_studies.map((cs) => (
                <a key={cs.name} href={cs.href} className="border border-gray-200 p-7 hover:border-black transition-colors block">
                  <p className="text-xs uppercase tracking-[.18em] text-gray-400">Selected work</p>
                  <h3 className="text-xl font-extrabold mt-3">{cs.name}</h3>
                  <p className="text-gray-500 mt-2">{cs.description}</p>
                  <p className="font-bold mt-6">Explore &rarr;</p>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {p.commercial_notes.length > 0 && (
        <section className="bg-black text-white px-6 lg:px-12 py-20">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
            <div>
              <p className="uppercase tracking-[.2em] text-xs text-gray-400">04 · Commercial notes</p>
              <h2 className="text-3xl lg:text-5xl font-extrabold mt-4">Clear from the start.</h2>
            </div>
            <div className="space-y-5 text-gray-300">
              {p.commercial_notes.map((note) => (
                <p key={note.title}><b className="text-white">{note.title}.</b> {note.text}</p>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="px-6 lg:px-12 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <p className="uppercase tracking-[.2em] text-xs text-gray-500">Prepared for {p.client_company || p.client_name}</p>
          <h2 className="text-3xl lg:text-5xl font-extrabold mt-4">Questions or changes?</h2>
          <p className="text-gray-500 mt-5">This proposal is designed for review by {p.client_company || p.client_name}. We can refine scope, package selection or commercial details before final acceptance.</p>
          {p.whatsapp && (
            <a href={`https://wa.me/${p.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="inline-flex mt-8 bg-black text-white px-7 py-4 font-bold">
              Discuss on WhatsApp &rarr;
            </a>
          )}
          <p className="text-xs text-gray-400 mt-8">
            Private proposal · not indexed by search engines · prepared {dateStr}
            {p.valid_until && ` · valid until ${new Date(p.valid_until).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`}
          </p>
        </div>
      </section>
    </main>
  );
}
