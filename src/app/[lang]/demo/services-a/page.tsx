import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { DEMO_SERVICES, type ServiceGroup } from "@/data/demo-services";
import { GROUP_DESC, SERVICES_FAQ, SERVICES_TOGETHER } from "@/data/demo-content";
import { ServiceArt } from "@/components/demo/service-art";
import { CaseStrip, DemoBar, DemoQuote, Eyebrow, FaqBlock, L } from "@/components/demo/demo-parts";
import { ServicesHero } from "@/components/demo/services-hero";
import { demoMeta } from "@/components/demo/demo-meta";

export const metadata = demoMeta("Services option A, clean index", "services-a");
const DISPLAY = "font-[family-name:var(--font-display)]";
const GROUPS: ServiceGroup[] = ["Acquire", "Build", "Engage", "Scale"];

export default async function ServicesA({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (lang !== "en") notFound();
  return (
    <article>
      <DemoBar label="Services option A, clean index" />
      <ServicesHero />

      <section className="px-6 lg:px-12 pb-16 md:pb-24" aria-label="Service directory">
        <div className="max-w-7xl mx-auto border-t border-gray-300">
          {GROUPS.map((g) => (
            <div key={g} className="grid lg:grid-cols-[.3fr_.7fr] gap-4 lg:gap-12 py-7 border-b border-gray-300">
              <div>
                <h2 className={`${DISPLAY} text-2xl font-extrabold`}>{g}</h2>
                <p className="text-sm text-gray-500 leading-relaxed mt-2 max-w-xs">{GROUP_DESC[g]}</p>
              </div>
              <ul className="grid md:grid-cols-2 gap-x-10">
                {DEMO_SERVICES.filter((s) => s.group === g).map((s) => (
                  <li key={s.slug}>
                    <Link href={L(s.href)} className="group flex items-center gap-4 py-3 border-b border-gray-100 hover:border-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                      <ServiceArt slug={s.slug} className="w-24 h-[60px] shrink-0 overflow-hidden border border-gray-200" />
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-2"><span className="font-bold text-[15px]">{s.title}</span>{s.core && <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#5A3ED6] border border-[#c9bdfc] px-1.5 py-0.5">Core</span>}</span>
                        <span className="block text-sm text-gray-600 leading-snug mt-0.5 line-clamp-2">{s.desc}</span>
                      </span>
                      <ArrowRight size={16} className="text-gray-300 group-hover:text-black group-hover:translate-x-1 transition-all motion-reduce:transition-none shrink-0" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
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

      <CaseStrip title="See the work behind the services" />
      <DemoQuote />
      <FaqBlock items={SERVICES_FAQ} title="Questions about working with a full-service digital agency" />
    </article>
  );
}
