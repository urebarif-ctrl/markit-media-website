import Link from "next/link";
import { notFound } from "next/navigation";
import { DEMO_CASES, GOAL_CHIPS, HOME_FAQ } from "@/data/demo-content";
import { DEMO_SERVICES } from "@/data/demo-services";
import { GoalRouter, type RouterChip } from "@/components/demo/goal-router";
import { CaseStrip, DemoBar, Eyebrow, FaqBlock, HowWeWork, L, PlatformStrip, ToolsInsights, WhereWeWork } from "@/components/demo/demo-parts";
import { demoMeta } from "@/components/demo/demo-meta";

export const metadata = demoMeta("Homepage option B, guided", "home-b");
const DISPLAY = "font-[family-name:var(--font-display)]";

export default async function HomeB({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (lang !== "en") notFound();

  const chips: RouterChip[] = GOAL_CHIPS.map((g) => {
    const s = DEMO_SERVICES.find((d) => d.slug === g.service)!;
    const c = g.caseSlug ? DEMO_CASES.find((d) => d.slug === g.caseSlug) : undefined;
    return {
      key: g.key,
      label: g.label,
      title: s.title,
      desc: s.desc,
      bullets: s.sub.slice(0, 6),
      href: L(s.href),
      caseName: c?.name,
      caseHref: c ? L(c.href) : undefined,
      caseImage: c?.image,
      caseAlt: c?.imageAlt,
    };
  });

  return (
    <article>
      <DemoBar label="Home option B, guided" />
      <section className="bg-white pt-28 pb-12 px-6 lg:px-12" aria-label="Hero">
        <div className="max-w-7xl mx-auto">
          <Eyebrow>Full-stack digital agency</Eyebrow>
          <h1 className={`${DISPLAY} text-[clamp(2.4rem,5.6vw,4.4rem)] font-extrabold tracking-tight leading-[1.04] mt-5 max-w-3xl`}>What do you want your marketing to do next?</h1>
          <p className="text-lg text-gray-600 leading-relaxed mt-5 max-w-2xl">Pick one. We&apos;ll show where we would start and what it looks like. Full-stack digital marketing, website development, and creative services for businesses across the USA, Canada, UAE, UK, Australia, and Saudi Arabia.</p>
          <GoalRouter chips={chips} finderHref={L("/services/finder")} quoteHref={L("/get-a-quote")} />
          <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-4 pt-8 border-t border-gray-200">
            {[["100+", "Clients Served"], ["6", "Countries"], ["12+", "Capabilities"]].map(([v, k]) => (
              <div key={k} className="flex items-baseline gap-3"><dt className="sr-only">{k}</dt><dd className={`${DISPLAY} text-3xl font-extrabold`}>{v}</dd><span className="text-sm text-gray-500">{k}</span></div>
            ))}
            <Link href={L("/services")} className="ml-auto inline-flex items-center min-h-11 font-bold text-sm border-b border-black pb-1 self-center">All 25 services →</Link>
          </dl>
        </div>
      </section>
      <CaseStrip title="Recent work" />
      <HowWeWork />
      <PlatformStrip />
      <WhereWeWork />
      <ToolsInsights bg="bg-gray-50" />
      <FaqBlock items={HOME_FAQ} />
    </article>
  );
}
