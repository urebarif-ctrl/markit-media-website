import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { DEMO_SERVICES } from "@/data/demo-services";
import { SERVICES_FAQ, SERVICES_TOGETHER, SERVICE_WORK } from "@/data/demo-content";
import { ServiceArt } from "@/components/demo/service-art";
import { CaseStrip, Chip, DemoBar, DemoQuote, Eyebrow, FaqBlock, L } from "@/components/demo/demo-parts";
import { ServicesHero } from "@/components/demo/services-hero";
import { demoMeta } from "@/components/demo/demo-meta";

export const metadata = demoMeta("Services option B, work-led", "services-b");
const DISPLAY = "font-[family-name:var(--font-display)]";

export default async function ServicesB({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (lang !== "en") notFound();
  const core = DEMO_SERVICES.filter((s) => s.core);
  const rest = DEMO_SERVICES.filter((s) => !s.core);
  return (
    <article>
      <DemoBar label="Services option B, work-led" />
      <ServicesHero />

      <section className="px-6 lg:px-12 py-12 md:py-16 bg-gray-50" aria-label="Core services">
        <div className="max-w-7xl mx-auto">
          <Eyebrow>Core capabilities</Eyebrow>
          <h2 className={`${DISPLAY} text-[clamp(1.9rem,4vw,3rem)] font-extrabold tracking-tight mt-3`}>Where most growth plans start</h2>
          <div className="mt-10 space-y-12 md:space-y-16">
            {core.map((s, i) => {
              const w = SERVICE_WORK[s.slug];
              return (
                <div key={s.slug} className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                  <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                    {w ? (
                      <Link href={L(w.href)} className="group block">
                        <div className="relative aspect-[16/9] overflow-hidden bg-gray-200"><Image src={w.image} alt={w.alt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none" /></div>
                        <p className="text-xs text-gray-500 mt-2">{w.caption}</p>
                      </Link>
                    ) : (
                      <div className="aspect-[16/9] overflow-hidden border border-gray-200"><ServiceArt slug={s.slug} className="w-full h-full" /></div>
                    )}
                  </div>
                  <div>
                    <Eyebrow>{s.group}</Eyebrow>
                    <h3 className={`${DISPLAY} text-2xl lg:text-3xl font-extrabold tracking-tight mt-3`}>{s.title}</h3>
                    <p className="text-gray-600 leading-relaxed mt-4 max-w-lg">{s.desc}</p>
                    <div className="flex flex-wrap gap-2 mt-5">{s.sub.map((x) => <Chip key={x}>{x}</Chip>)}</div>
                    <Link href={L(s.href)} className="inline-flex items-center gap-2 mt-7 font-bold text-sm border-b border-black pb-1 min-h-11">Explore {s.title} <ArrowRight size={14} aria-hidden="true" /></Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-12 md:py-16" aria-label="More services">
        <div className="max-w-7xl mx-auto">
          <Eyebrow>More services</Eyebrow>
          <h2 className={`${DISPLAY} text-2xl lg:text-3xl font-extrabold tracking-tight mt-3`}>And {rest.length} more specialist services</h2>
          <ul className="mt-8 grid md:grid-cols-2 gap-x-10 border-t border-gray-200">
            {rest.map((s) => {
              const w = SERVICE_WORK[s.slug];
              return (
                <li key={s.slug}>
                  <Link href={L(s.href)} className="group flex items-center gap-4 py-4 border-b border-gray-100 hover:border-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                    {w ? (
                      <span className="relative w-24 h-16 shrink-0 overflow-hidden border border-gray-200 bg-gray-100"><Image src={w.image} alt={w.alt} fill sizes="96px" className="object-cover" /></span>
                    ) : (
                      <ServiceArt slug={s.slug} className="w-24 h-16 shrink-0 overflow-hidden border border-gray-200" />
                    )}
                    <span className="min-w-0 flex-1"><span className="block font-bold text-[15px]">{s.title}</span><span className="block text-sm text-gray-600 leading-snug mt-0.5 line-clamp-2">{s.desc}</span></span>
                    <ArrowRight size={16} className="text-gray-300 group-hover:text-black shrink-0" aria-hidden="true" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-12 md:py-14 bg-black text-white" aria-label="How services work together">
        <div className="max-w-7xl mx-auto">
          <Eyebrow dark>One growth system</Eyebrow>
          <h2 className={`${DISPLAY} text-[clamp(1.9rem,4vw,3rem)] font-extrabold tracking-tight mt-3`}>The channel is not the strategy.</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6 mt-7">
            {SERVICES_TOGETHER.map(([t, d]) => <div key={t} className="border-t border-white/25 pt-5"><h3 className={`${DISPLAY} font-bold`}>{t}</h3><p className="text-sm text-gray-400 leading-relaxed mt-2">{d}</p></div>)}
          </div>
        </div>
      </section>

      <CaseStrip title="More of our work" />
      <DemoQuote />
      <FaqBlock items={SERVICES_FAQ} title="Questions about working with a full-service digital agency" />
    </article>
  );
}
