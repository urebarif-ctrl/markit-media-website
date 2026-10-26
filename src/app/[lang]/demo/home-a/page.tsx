import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { YouTubeEmbed } from "@/components/youtube-embed";
import { QWENCH_VIDEO } from "@/data/featured-videos";
import { DEMO_CASES, HOME_FAQ } from "@/data/demo-content";
import { DEMO_SERVICES } from "@/data/demo-services";
import { ServiceArt } from "@/components/demo/service-art";
import { CaseRow, DemoBar, Eyebrow, FaqBlock, HowWeWork, L, PlatformStrip, ToolsInsights, WhereWeWork } from "@/components/demo/demo-parts";
import { demoMeta } from "@/components/demo/demo-meta";

export const metadata = demoMeta("Homepage option A, work first", "home-a");

const LEAD = ["performance-marketing", "seo", "social-media", "website-development"].map((s) => DEMO_SERVICES.find((d) => d.slug === s)!);
const DISPLAY = "font-[family-name:var(--font-display)]";

export default async function HomeA({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (lang !== "en") notFound();
  return (
    <article>
      <DemoBar label="Home option A, work first" />

      {/* 1. Hero + case reel */}
      <section className="bg-black text-white overflow-hidden pt-20" aria-label="Hero">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14 sm:py-20 lg:py-24 grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center">
          <div>
            <Eyebrow dark>Full-stack digital agency</Eyebrow>
            <h1 className={`${DISPLAY} text-[clamp(2.5rem,5.8vw,4.5rem)] font-extrabold tracking-tight leading-[1.04] mt-5`}>See what we&apos;ve built for brands like yours.</h1>
            <p className="text-lg sm:text-xl text-gray-400 leading-relaxed mt-6 max-w-xl">Full-stack digital marketing, website development, and creative services for businesses across the USA, Canada, UAE, UK, Australia, and Saudi Arabia.</p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link href={L("/get-a-quote")} className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 font-bold hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">Request a Quote &rarr;</Link>
              <Link href={L("/work")} className="inline-flex items-center gap-3 border border-white/30 px-8 py-4 font-bold hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">View Our Work</Link>
            </div>
            <dl className="mt-10 grid grid-cols-3 gap-6 pt-8 border-t border-white/10 max-w-md">
              {[["100+", "Clients Served"], ["6", "Countries"], ["12+", "Capabilities"]].map(([v, k]) => (
                <div key={k}><dt className="sr-only">{k}</dt><dd className={`${DISPLAY} text-2xl sm:text-3xl font-extrabold`}>{v}</dd><p className="mt-1 text-xs text-white/40">{k}</p></div>
              ))}
            </dl>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="row-span-2">
              <YouTubeEmbed videoId={QWENCH_VIDEO.id} title={QWENCH_VIDEO.title} alt={QWENCH_VIDEO.title} aspect="short" poster={QWENCH_VIDEO.poster} noCookie />
              <p className="text-xs text-white/50 mt-2">Video case study: QWENCH Juice</p>
            </div>
            {[DEMO_CASES[1], DEMO_CASES[2]].map((c) => (
              <Link key={c.slug} href={L(c.href)} className="group relative block aspect-[4/3] overflow-hidden bg-white/5">
                <Image src={c.image} alt={c.imageAlt} fill sizes="(max-width: 1024px) 45vw, 22vw" priority className="object-cover transition-transform duration-700 group-hover:scale-[1.04] motion-reduce:transition-none" />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-sm font-bold">{c.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Three featured case studies: the only place the work is shown */}
      <section className="px-6 lg:px-12 py-20 md:py-28 bg-white" aria-label="Featured case studies">
        <div className="max-w-7xl mx-auto">
          <Eyebrow>Case studies</Eyebrow>
          <h2 className={`${DISPLAY} text-[clamp(1.9rem,4vw,3rem)] font-extrabold tracking-tight mt-3 max-w-2xl`}>Real work for real brands.</h2>
          <div className="mt-14 space-y-20 md:space-y-28">
            {DEMO_CASES.map((c, i) => <CaseRow key={c.slug} c={c} flip={i % 2 === 1} />)}
          </div>
          <div className="mt-16 flex flex-wrap gap-x-8 gap-y-3 font-bold text-sm">
            <Link href={L("/work")} className="inline-flex items-center gap-2 border-b border-black pb-1 min-h-11">Explore all work <ArrowRight size={14} aria-hidden="true" /></Link>
            <Link href={L("/case-studies")} className="inline-flex items-center gap-2 text-gray-500 hover:text-black">View all case studies <ArrowRight size={14} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      {/* 3. What we do: once */}
      <section className="px-6 lg:px-12 py-16 md:py-24 bg-gray-50" aria-label="What we do">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
            <div><Eyebrow>What we do</Eyebrow><h2 className={`${DISPLAY} text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight mt-3`}>Four capabilities we lead with.</h2></div>
            <Link href={L("/services")} className="inline-flex items-center min-h-11 font-bold text-sm border-b border-black pb-1 self-start lg:self-auto">All 25 services →</Link>
          </div>
          <div className="mt-10 grid md:grid-cols-2 gap-x-12">
            {LEAD.map((s) => (
              <Link key={s.slug} href={L(s.href)} className="group flex gap-5 py-6 border-t border-gray-300 hover:border-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                <ServiceArt slug={s.slug} className="w-24 h-16 shrink-0 overflow-hidden border border-gray-200" />
                <div>
                  <h3 className={`${DISPLAY} text-lg font-extrabold`}>{s.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mt-1 line-clamp-2">{s.desc}</p>
                  <p className="text-xs text-gray-500 mt-2">{s.sub.slice(0, 4).join(" · ")}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <PlatformStrip />

      <HowWeWork />
      <WhereWeWork />
      <ToolsInsights />
      <FaqBlock items={HOME_FAQ} bg="bg-gray-50" />
    </article>
  );
}
