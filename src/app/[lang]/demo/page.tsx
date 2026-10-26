import Link from "next/link";
import { notFound } from "next/navigation";
import { demoMeta } from "@/components/demo/demo-meta";

export const metadata = demoMeta("Homepage and services options", "");
const DISPLAY = "font-[family-name:var(--font-display)]";

const OPTIONS = [
  { group: "Homepage", items: [
    ["Option A: work first", "/en/demo/home-a", "Real work and the QWENCH video lead; services once, near the end."],
    ["Option B: guided", "/en/demo/home-b", "The hero asks what you need and changes one panel; proof strip below."],
    ["Option C: specialist doors", "/en/demo/home-c", "Three paths (local service, e-commerce and food, agencies) each with its own message."],
  ] },
  { group: "Services page", items: [
    ["Option A: clean index", "/en/demo/services-a", "All 25 services in four groups, each with its own diagram."],
    ["Option B: work-led", "/en/demo/services-b", "Six core services shown through real work, the rest in a compact list."],
    ["Option C: goal bundles", "/en/demo/services-c", "Five goals, each with one large scene and the services behind it."],
  ] },
] as const;

export default async function DemoIndex({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (lang !== "en") notFound();
  return (
    <article className="px-6 lg:px-12 pt-32 pb-24">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#5A3ED6]">Design demo, not the live site</p>
        <h1 className={`${DISPLAY} text-[clamp(2rem,5vw,3.6rem)] font-extrabold tracking-tight leading-tight mt-3`}>Homepage and services page: three options each</h1>
        <p className="text-lg text-gray-600 leading-relaxed mt-4 max-w-3xl">These pages are hidden (not indexed, not linked, not in the sitemap) and exist only for review. Headlines and grouping marked as draft are not approved copy. The quote form on the demo services pages is switched off, so nothing you type creates a lead.</p>
        {OPTIONS.map((g) => (
          <section key={g.group} className="mt-12">
            <h2 className={`${DISPLAY} text-2xl font-extrabold`}>{g.group}</h2>
            <ul className="mt-4 grid md:grid-cols-3 gap-4">
              {g.items.map(([t, href, d]) => (
                <li key={href}><Link href={href} className="block h-full border border-gray-300 p-6 hover:border-black hover:shadow-md transition-all motion-reduce:transition-none"><span className={`${DISPLAY} font-extrabold text-lg`}>{t}</span><span className="block text-sm text-gray-600 leading-relaxed mt-2">{d}</span><span className="inline-block mt-4 text-sm font-bold">Open →</span></Link></li>
              ))}
            </ul>
          </section>
        ))}
        <p className="text-sm text-gray-500 mt-12">Live pages for comparison: <Link href="/en" className="underline">homepage</Link> · <Link href="/en/services" className="underline">services</Link></p>
      </div>
    </article>
  );
}
