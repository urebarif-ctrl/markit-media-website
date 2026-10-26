import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { DEMO_SERVICES, type ServiceGroup } from "@/data/demo-services";
import { GOAL_BUNDLES, SERVICES_FAQ } from "@/data/demo-content";
import { GoalScene } from "@/components/demo/service-art";
import { DemoBar, DemoQuote, Eyebrow, FaqBlock, L } from "@/components/demo/demo-parts";
import { ServicesHero } from "@/components/demo/services-hero";
import { demoMeta } from "@/components/demo/demo-meta";

export const metadata = demoMeta("Services option C, goal bundles", "services-c");
const DISPLAY = "font-[family-name:var(--font-display)]";
const GROUPS: ServiceGroup[] = ["Acquire", "Build", "Engage", "Scale"];

export default async function ServicesC({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (lang !== "en") notFound();
  return (
    <article>
      <DemoBar label="Services option C, goal bundles" />
      <ServicesHero>
        <div className="max-w-7xl mx-auto mt-10" role="navigation" aria-label="Jump to a goal">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">What do you want to achieve?</p>
          <div className="flex flex-wrap gap-2.5 mt-3">
            {GOAL_BUNDLES.map((g) => <a key={g.key} href={`#${g.key}`} className="rounded-full border border-gray-300 px-5 py-2.5 text-sm font-bold hover:border-black hover:bg-black hover:text-white transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-[#5A3ED6] focus-visible:outline-offset-2">{g.title}</a>)}
          </div>
        </div>
      </ServicesHero>

      {GOAL_BUNDLES.map((g, i) => {
        const list = DEMO_SERVICES.filter((s) => s.goal === g.key);
        return (
          <section key={g.key} id={g.key} className={`px-6 lg:px-12 py-14 md:py-20 scroll-mt-20 ${i % 2 === 0 ? "bg-gray-50" : "bg-white"}`} aria-label={g.title}>
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div className={`overflow-hidden ${i % 2 === 1 ? "lg:order-2" : ""}`}><GoalScene goal={g.key} className="aspect-[480/220] w-full" /></div>
              <div>
                <Eyebrow>Goal {i + 1} of 5</Eyebrow>
                <h2 className={`${DISPLAY} text-[clamp(1.75rem,4vw,2.6rem)] font-extrabold tracking-tight mt-3`}>{g.title}</h2>
                <p className="text-lg text-gray-600 leading-relaxed mt-3 max-w-md">{g.line}</p>
                <ul className="mt-6">
                  {list.map((s) => (
                    <li key={s.slug}><Link href={L(s.href)} className="group flex items-center justify-between gap-4 py-3 border-t border-gray-300 hover:border-black"><span><span className="font-bold">{s.title}</span><span className="block text-sm text-gray-600 line-clamp-1">{s.desc}</span></span><ArrowRight size={15} className="text-gray-300 group-hover:text-black shrink-0" aria-hidden="true" /></Link></li>
                  ))}
                </ul>
                <p className="text-sm text-gray-500 mt-4">We review your current setup before recommending scope.</p>
                <Link href="#services-quote" className="inline-flex items-center gap-2 mt-5 bg-black text-white px-6 py-3.5 font-bold text-sm hover:bg-gray-800">Talk about this goal <ArrowRight size={16} aria-hidden="true" /></Link>
              </div>
            </div>
          </section>
        );
      })}

      <section className="px-6 lg:px-12 py-16 md:py-20" aria-label="All services">
        <div className="max-w-7xl mx-auto">
          <Eyebrow>Every service</Eyebrow>
          <h2 className={`${DISPLAY} text-2xl lg:text-3xl font-extrabold tracking-tight mt-3`}>All 25 services, A to Z of the stack</h2>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {GROUPS.map((g) => (
              <div key={g}>
                <h3 className={`${DISPLAY} font-extrabold border-b-2 border-black pb-2`}>{g}</h3>
                <ul className="mt-2">{DEMO_SERVICES.filter((s) => s.group === g).map((s) => <li key={s.slug}><Link href={L(s.href)} className="block py-2 text-sm font-semibold border-b border-gray-100 hover:text-[#5A3ED6]">{s.title}</Link></li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DemoQuote />
      <FaqBlock items={SERVICES_FAQ} title="Questions about working with a full-service digital agency" />
    </article>
  );
}
