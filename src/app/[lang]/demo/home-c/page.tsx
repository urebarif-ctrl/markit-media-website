import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { DEMO_CASES, HOME_FAQ } from "@/data/demo-content";
import { DEMO_SERVICES } from "@/data/demo-services";
import { GoalScene } from "@/components/demo/service-art";
import { CaseStrip, DemoBar, Eyebrow, FaqBlock, HowWeWork, L, ToolsInsights, WhereWeWork } from "@/components/demo/demo-parts";
import { demoMeta } from "@/components/demo/demo-meta";

export const metadata = demoMeta("Homepage option C, specialist doors", "home-c");
const DISPLAY = "font-[family-name:var(--font-display)]";
const svc = (slug: string) => DEMO_SERVICES.find((s) => s.slug === slug)!;

// DRAFT copy and grouping. Door 1 and door 3 have no case study on the site yet, so they show a vector scene, not a photo.
const DOORS = [
  {
    key: "local",
    n: "Door 1",
    title: "Local service businesses",
    line: "Exterior cleaning, home services and other local trades.",
    href: "/industries/exterior-cleaning",
    scene: "leads",
    image: "",
    services: ["performance-marketing", "seo", "website-development", "whatsapp-business"],
  },
  {
    key: "ecom",
    n: "Door 2",
    title: "E-commerce and food brands",
    line: "Website, social, reels and ads. Work for QWENCH Juice and Everest Snacks.",
    href: "/industries/ecommerce",
    scene: "social",
    image: DEMO_CASES[0].image,
    services: ["website-development", "social-media", "video-production", "ecommerce-marketing"],
  },
  {
    key: "agency",
    n: "Door 3",
    title: "Agencies and partners",
    line: "Behind-the-scenes delivery: PPC, SEO, social, creative and development.",
    href: "/services/white-label",
    scene: "scale",
    image: "",
    services: ["white-label", "performance-marketing", "seo", "website-development"],
  },
];

export default async function HomeC({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (lang !== "en") notFound();
  const twelve = ["performance-marketing", "seo", "social-media", "website-development", "branding", "video-production", "ai", "email-marketing", "content-marketing", "paid-advertising", "digital-marketing", "bpo"].map(svc);

  return (
    <article>
      <DemoBar label="Home option C, specialist doors" />

      <section className="bg-black text-white pt-28 pb-16 px-6 lg:px-12" aria-label="Hero">
        <div className="max-w-7xl mx-auto">
          <Eyebrow dark>Full-stack digital agency</Eyebrow>
          <h1 className={`${DISPLAY} text-[clamp(2.4rem,5.6vw,4.4rem)] font-extrabold tracking-tight leading-[1.04] mt-5 max-w-3xl`}>Marketing built for the way your business sells.</h1>
          <p className="text-lg text-gray-400 leading-relaxed mt-5 max-w-2xl">Choose where you fit. Each path starts in a different place.</p>
          <div className="grid md:grid-cols-3 gap-4 mt-10">
            {DOORS.map((d) => (
              <a key={d.key} href={`#${d.key}`} className="group block bg-[#141414] border border-white/15 hover:border-white/60 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
                <div className="relative aspect-[16/10] overflow-hidden">
                  {d.image ? <Image src={d.image} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" /> : <GoalScene goal={d.scene} className="absolute inset-0" />}
                </div>
                <div className="p-5">
                  <Eyebrow dark>{d.n}</Eyebrow>
                  <h2 className={`${DISPLAY} text-xl font-extrabold mt-2`}>{d.title}</h2>
                  <p className="text-sm text-gray-400 leading-relaxed mt-2">{d.line}</p>
                  <span className="inline-flex items-center gap-2 mt-4 text-sm font-bold">Start here <ArrowRight size={14} className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true" /></span>
                </div>
              </a>
            ))}
          </div>
          <dl className="mt-12 grid grid-cols-3 gap-6 pt-8 border-t border-white/10 max-w-md">
            {[["100+", "Clients Served"], ["6", "Countries"], ["12+", "Capabilities"]].map(([v, k]) => (
              <div key={k}><dt className="sr-only">{k}</dt><dd className={`${DISPLAY} text-2xl sm:text-3xl font-extrabold`}>{v}</dd><p className="mt-1 text-xs text-white/40">{k}</p></div>
            ))}
          </dl>
        </div>
      </section>

      {DOORS.map((d, i) => (
        <section key={d.key} id={d.key} className={`px-6 lg:px-12 py-16 md:py-20 scroll-mt-20 ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`} aria-label={d.title}>
          <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16 items-start">
            <div>
              <Eyebrow>{d.n}</Eyebrow>
              <h2 className={`${DISPLAY} text-[clamp(1.75rem,4vw,2.6rem)] font-extrabold tracking-tight mt-3`}>{d.title}</h2>
              <p className="text-lg text-gray-600 leading-relaxed mt-4 max-w-md">{d.line}</p>
              <p className="text-sm text-gray-500 mt-4 max-w-md">We review your current setup before recommending scope.</p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-7">
                <Link href={L("/get-a-quote")} className="inline-flex items-center gap-2 bg-black text-white px-6 py-3.5 font-bold text-sm hover:bg-gray-800">Request a quote <ArrowRight size={16} aria-hidden="true" /></Link>
                <Link href={L(d.href)} className="inline-flex items-center min-h-11 font-bold text-sm border-b border-black pb-1">Learn more →</Link>
              </div>
            </div>
            <ul className="grid sm:grid-cols-2 gap-x-8">
              {d.services.map((s) => {
                const v = svc(s);
                return (
                  <li key={s}><Link href={L(v.href)} className="block py-4 border-t border-gray-300 hover:border-black"><span className={`${DISPLAY} font-extrabold`}>{v.title}</span><span className="block text-sm text-gray-600 mt-1 line-clamp-2">{v.desc}</span></Link></li>
                );
              })}
            </ul>
          </div>
        </section>
      ))}

      <CaseStrip title="Recent work across the three paths" />
      <HowWeWork />

      <section className="px-6 lg:px-12 py-16 md:py-20 bg-white border-t border-gray-200" aria-label="Full-stack, briefly">
        <div className="max-w-7xl mx-auto">
          <Eyebrow>Full-stack</Eyebrow>
          <h2 className={`${DISPLAY} text-2xl lg:text-3xl font-extrabold tracking-tight mt-3`}>Don&apos;t see your path? We cover the whole stack.</h2>
          <ul className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8">
            {twelve.map((s) => <li key={s.slug}><Link href={L(s.href)} className="flex items-center justify-between py-3 border-b border-gray-200 text-sm font-semibold hover:border-black">{s.title}<ArrowRight size={14} className="text-gray-300" aria-hidden="true" /></Link></li>)}
          </ul>
          <Link href={L("/services")} className="inline-flex items-center gap-2 mt-6 font-bold border-b border-black pb-1 text-sm min-h-11">All 25 services <ArrowRight size={14} aria-hidden="true" /></Link>
        </div>
      </section>

      <WhereWeWork />
      <ToolsInsights />
      <FaqBlock items={HOME_FAQ} bg="bg-gray-50" />
    </article>
  );
}
