import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Animate } from "@/components/animate";
import { BrandIcon } from "@/components/brand-icon";
import { QWENCH_VIDEO } from "@/data/featured-videos";
import { DEMO_SERVICES } from "@/data/demo-services";
import { DEMO_MARKETS } from "@/data/demo-content";
import { BUILD_LAYERS, FAMILY_STRIP, FEATURED_SERVICES, PLATFORM_GROUPS, REST_SERVICES, V15_ALSO, V15_CASES, V15_INDUSTRIES, V15_PROCESS, type PlatformItem } from "@/data/home-v15";
import { ServiceArt } from "@/components/demo/service-art";
import { DemoBar, Eyebrow, L } from "@/components/demo/demo-parts";
import { HeroSlider, type HeroSlide } from "@/components/demo/home-v15-hero-slider";
import { HomeQuoteForm } from "@/components/demo/home-v15-quote";
import { demoMeta } from "@/components/demo/demo-meta";
import { getPublishedPosts } from "@/lib/blog";

export const metadata = demoMeta("Homepage V1.5, hybrid (Version B)", "home-v15");

const D = "font-[family-name:var(--font-display)]";
const PAD = "px-6 lg:px-12";
const svc = (slug: string) => DEMO_SERVICES.find((s) => s.slug === slug)!;

const SLIDES: HeroSlide[] = [
  { key: "qwench", name: "QWENCH Juice", href: "/en/work/qwench-juice-bar", image: "", alt: "", tag: "Video case study", video: { id: QWENCH_VIDEO.id, title: QWENCH_VIDEO.title, poster: QWENCH_VIDEO.poster } },
  { key: "everest", name: "Everest Snacks", href: "/en/work/everest-snacks", image: "/images/demo/everest-snacks.webp", alt: "Everest Snacks website home page", tag: "Website development" },
  { key: "north", name: "North Charge", href: "/en/work/north-charge", image: "/images/demo/north-charge.webp", alt: "North Charge social post in orange and dark green", tag: "Social media design" },
  { key: "meezo", name: "MeezoTech", href: "/en/work/meezotech", image: "/images/demo/meezotech.webp", alt: "MeezoTech brand identity board", tag: "Branding" },
];

function Logo({ p, size = "h-9 w-9" }: { p: PlatformItem; size?: string }) {
  return p.svg ? <Image unoptimized src={p.svg} alt="" width={36} height={36} className={`${size} object-contain`} /> : <BrandIcon brand={p.brand || p.label} className={size} />;
}

export default async function HomeV15({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (lang !== "en") notFound();
  const posts = await getPublishedPosts(3);
  return (
    <article>
      <DemoBar label="Homepage V1.5, Version B" />

      {/* 1. HERO (kept from option A: headline, copy, buttons, stats) with a slider of real work */}
      <section className="bg-black text-white overflow-hidden pt-20" aria-label="Hero">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14 sm:py-20 lg:py-24 grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center">
          <div>
            <Eyebrow dark>Full-stack digital agency</Eyebrow>
            <h1 className={`${D} text-[clamp(2.5rem,5.8vw,4.5rem)] font-extrabold tracking-tight leading-[1.04] mt-5`}>See what we&apos;ve built for brands like yours.</h1>
            <p className="text-lg sm:text-xl text-gray-400 leading-relaxed mt-6 max-w-xl">Full-stack digital marketing, website development, and creative services for businesses across the USA, Canada, UAE, UK, Australia, and Saudi Arabia.</p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link href="#quote" className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 font-bold hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">Request a Quote &rarr;</Link>
              <Link href={L("/work")} className="inline-flex items-center gap-3 border border-white/30 px-8 py-4 font-bold hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">View Our Work</Link>
            </div>
            <dl className="mt-10 grid grid-cols-3 gap-6 pt-8 border-t border-white/10 max-w-md">
              {[["100+", "Clients Served"], ["6", "Countries"], ["12+", "Capabilities"]].map(([v, k]) => (
                <div key={k}><dt className="sr-only">{k}</dt><dd className={`${D} text-2xl sm:text-3xl font-extrabold`}>{v}</dd><p className="mt-1 text-xs text-white/40">{k}</p></div>
              ))}
            </dl>
          </div>
          <div className="max-w-[560px] w-full mx-auto lg:mx-0 lg:justify-self-end"><HeroSlider slides={SLIDES} /></div>
        </div>
        {/* Capability strip: all families, one line, crawlable links */}
        <nav aria-label="Everything we do" className="border-t border-white/10">
          <ul className="flex gap-x-9 gap-y-2 overflow-x-auto px-6 lg:px-12 py-4 max-w-7xl mx-auto whitespace-nowrap [scrollbar-width:none] snap-x">
            {FAMILY_STRIP.map(([t, h]) => (
              <li key={h} className="snap-start"><Link href={L(h)} className="inline-flex items-center min-h-11 text-sm font-semibold text-white/60 hover:text-white focus-visible:outline-2 focus-visible:outline-white">{t}</Link></li>
            ))}
          </ul>
        </nav>
      </section>

      {/* 2. MAIN SERVICES: one lead, two alternating features, then the rest as rows */}
      <section className={`${PAD} py-20 md:py-28 bg-white`} aria-label="Main services">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <Eyebrow>What we do</Eyebrow>
            <h2 className={`${D} text-[clamp(1.9rem,4vw,3rem)] font-extrabold tracking-tight mt-3 max-w-3xl`}>One team across the whole growth stack.</h2>
          </Animate>
          <div className="mt-14 space-y-20 md:space-y-28">
            {FEATURED_SERVICES.map((f, i) => {
              const s = svc(f.slug);
              return (
                <div key={f.slug} className={`grid gap-8 lg:gap-16 items-center ${i === 0 ? "lg:grid-cols-[1.1fr_.9fr]" : i === 1 ? "lg:grid-cols-[.9fr_1.1fr]" : "lg:grid-cols-[1.1fr_.9fr]"}`}>
                  <Animate animation={i % 2 ? "fade-right" : "fade-left"} className={i % 2 ? "lg:order-2" : ""}>
                    <Link href={L(s.href)} className="block border border-gray-200 bg-gray-50 focus-visible:outline-2 focus-visible:outline-black">
                      <ServiceArt slug={s.slug} className={`w-full ${i === 0 ? "aspect-[16/10]" : "aspect-[16/11]"} overflow-hidden`} />
                    </Link>
                  </Animate>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#5A3ED6]">{f.flag}</p>
                    <h3 className={`${D} ${i === 0 ? "text-4xl lg:text-5xl" : "text-3xl lg:text-4xl"} font-extrabold tracking-tight mt-3`}><Link href={L(s.href)} className="hover:underline underline-offset-4">{s.title}</Link></h3>
                    <p className="text-lg text-gray-600 leading-relaxed mt-4 max-w-lg">{s.desc}</p>
                    <ul className="flex flex-wrap gap-2 mt-6 list-none p-0" aria-label={`${s.title} specialities`}>
                      {f.links.map(([t, h]) => <li key={h}><Link href={L(h)} className="inline-flex items-center min-h-11 border border-gray-300 px-3.5 text-sm font-semibold hover:border-black focus-visible:outline-2 focus-visible:outline-black">{t}</Link></li>)}
                    </ul>
                    <Link href={L(s.href)} className="inline-flex items-center gap-2 mt-7 font-bold border-b border-black pb-1 min-h-11">Explore {s.title} <ArrowRight size={16} aria-hidden="true" /></Link>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-24 border-t-2 border-black pt-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h3 className={`${D} text-2xl lg:text-3xl font-extrabold tracking-tight`}>And the rest of the stack</h3>
              <Link href={L("/services")} className="inline-flex items-center gap-2 font-bold border-b border-black pb-1 min-h-11 text-sm">All 25 services <ArrowRight size={14} aria-hidden="true" /></Link>
            </div>
            <ul className="mt-6 grid md:grid-cols-2 gap-x-14 list-none p-0">
              {REST_SERVICES.map((slug) => {
                const s = svc(slug);
                return (
                  <li key={slug}>
                    <Link href={L(s.href)} className="group flex items-center gap-5 py-5 border-b border-gray-200 hover:border-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                      <ServiceArt slug={slug} className="w-20 h-14 shrink-0 overflow-hidden border border-gray-200" />
                      <span className="min-w-0 flex-1">
                        <span className={`${D} block text-lg font-extrabold leading-tight`}>{s.title}</span>
                        <span className="block text-sm text-gray-600 mt-1 line-clamp-1">{s.sub.slice(0, 4).join(" · ")}</span>
                      </span>
                      <ArrowUpRight size={18} className="shrink-0 text-gray-300 group-hover:text-black transition-colors" aria-hidden="true" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="mt-14 flex flex-wrap gap-4">
            <Link href="#quote" className="inline-flex items-center bg-black text-white px-7 py-3.5 font-bold min-h-12 hover:bg-[#5A3ED6] transition-colors">Request a Quote &rarr;</Link>
            <Link href={L("/services/finder")} className="inline-flex items-center border border-gray-300 px-7 py-3.5 font-bold min-h-12 hover:border-black">Not sure what you need? Use the finder</Link>
          </div>
        </div>
      </section>

      {/* 3. PLATFORM SPECIALISTS: real logos, grouped, every one links */}
      <section className={`${PAD} py-20 md:py-28 bg-gray-50 border-y border-gray-200`} aria-label="Platform specialist services">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[.8fr_1.4fr] gap-12 lg:gap-24">
          <div className="lg:sticky lg:top-28 self-start">
            <Eyebrow>Platforms</Eyebrow>
            <h2 className={`${D} text-[clamp(1.9rem,4vw,3rem)] font-extrabold tracking-tight mt-3`}>Explore the specialist service behind each platform.</h2>
            <p className="text-lg text-gray-600 leading-relaxed mt-5">Pick the tool you use. Each one opens the service page for the people who run it every day.</p>
          </div>
          <div className="space-y-12">
            {PLATFORM_GROUPS.map((g) => (
              <Animate key={g.title} animation="fade-up">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 border-b-2 border-black pb-2">
                  <h3 className={`${D} text-xl font-extrabold`}>{g.title}</h3>
                  <p className="text-sm text-gray-500">{g.blurb}</p>
                </div>
                <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 list-none p-0">
                  {g.items.map((p) => (
                    <li key={p.label}>
                      <Link href={L(p.href)} aria-label={`${p.label}: open the specialist service`} className="group flex items-center gap-4 py-4 border-b border-gray-200 hover:border-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                        <Logo p={p} />
                        <span className="font-bold text-sm flex-1">{p.label}</span>
                        <ArrowRight size={14} className="text-gray-300 group-hover:text-black group-hover:translate-x-0.5 transition-all motion-reduce:transition-none" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* 4. BUILD INSIDE THE PLATFORMS: what we build and run, as a dark editorial list */}
      <section className={`${PAD} py-20 md:py-28 bg-black text-white`} aria-label="What we build inside the platforms">
        <div className="max-w-7xl mx-auto">
          <Eyebrow dark>Hands on</Eyebrow>
          <h2 className={`${D} text-[clamp(1.9rem,4.4vw,3.4rem)] font-extrabold tracking-tight leading-[1.05] mt-3 max-w-4xl`}>We don&apos;t only advise. We build and run it inside the platforms that drive growth.</h2>
          <ol className="mt-14 list-none p-0 border-t border-white/15">
            {BUILD_LAYERS.map((b) => (
              <li key={b.n} className="border-b border-white/15">
                <Link href={L(b.href)} className="group grid md:grid-cols-[4rem_1fr_1.3fr_auto] gap-x-8 gap-y-3 items-center py-7 md:py-8 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-4">
                  <span className={`${D} text-sm font-extrabold text-white/40`}>{b.n}</span>
                  <span className={`${D} text-2xl lg:text-3xl font-extrabold tracking-tight group-hover:translate-x-1 transition-transform motion-reduce:transition-none`}>{b.title}</span>
                  <span className="text-gray-400 leading-relaxed">{b.line}</span>
                  <span className="flex items-center gap-3">
                    {b.logos.map((p) => <span key={p.label} className="bg-white p-1.5 rounded-sm" title={p.label}><Logo p={p} size="h-6 w-6" /><span className="sr-only">{p.label}</span></span>)}
                    {b.extra && <span className="text-xs text-white/50">{b.extra}</span>}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5. SELECTED WORK: four real projects, asymmetric */}
      <section className={`${PAD} py-20 md:py-28 bg-white`} aria-label="Selected work">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div><Eyebrow>Selected work</Eyebrow><h2 className={`${D} text-[clamp(1.9rem,4vw,3rem)] font-extrabold tracking-tight mt-3 max-w-2xl`}>Real work for real brands.</h2></div>
            <Link href={L("/work")} className="inline-flex items-center gap-2 font-bold border-b border-black pb-1 min-h-11 text-sm">Explore all work <ArrowRight size={14} aria-hidden="true" /></Link>
          </div>
          <div className="mt-12 grid md:grid-cols-12 gap-x-8 gap-y-14">
            {V15_CASES.map((c, i) => {
              const span = i === 0 ? "md:col-span-5 md:row-span-2" : i === 1 ? "md:col-span-7" : i === 2 ? "md:col-span-4" : "md:col-span-3";
              const ratio = i === 0 ? "aspect-[4/5]" : i === 1 ? "aspect-[16/9]" : i === 2 ? "aspect-square" : "aspect-square";
              return (
                <Animate key={c.slug} animation="fade-up" delay={i * 80} className={span}>
                  <Link href={L(c.href)} className="group block focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-4">
                    <div className={`relative ${ratio} overflow-hidden bg-gray-100`}>
                      <Image unoptimized src={c.image} alt={c.alt} fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04] motion-reduce:transition-none" />
                    </div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#5A3ED6] mt-4">{c.discipline}</p>
                    <h3 className={`${D} text-2xl font-extrabold mt-1`}>{c.name}</h3>
                    <p className="text-gray-600 leading-relaxed mt-2 text-sm">{c.line}</p>
                    <p className="text-xs text-gray-500 mt-2">{c.scope.join(" · ")}</p>
                    <span className="inline-flex items-center gap-2 mt-3 text-sm font-bold">View the case study <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform motion-reduce:transition-none" aria-hidden="true" /></span>
                  </Link>
                </Animate>
              );
            })}
          </div>
          <p className="text-sm text-gray-500 mt-12 max-w-2xl">No campaign results are shown here on purpose: figures appear only once a client has confirmed them.</p>
        </div>
      </section>

      {/* 6. INDUSTRIES: compact horizontal scroller */}
      <section className={`${PAD} py-16 md:py-20 bg-gray-50`} aria-label="Industries we serve">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div><Eyebrow>Industries</Eyebrow><h2 className={`${D} text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight mt-3`}>Industries we serve</h2></div>
            <Link href={L("/industries")} className="inline-flex items-center gap-2 font-bold border-b border-black pb-1 min-h-11 text-sm">All industries <ArrowRight size={14} aria-hidden="true" /></Link>
          </div>
          <ul tabIndex={0} aria-label="Industries, scroll sideways" className="mt-8 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 list-none p-0 [scrollbar-width:thin] focus-visible:outline-2 focus-visible:outline-black">
            {V15_INDUSTRIES.map(([t, h], i) => (
              <li key={h} className="snap-start shrink-0">
                <Link href={L(h)} className="group flex h-44 w-52 flex-col justify-between border border-gray-300 bg-white p-5 hover:bg-black hover:text-white hover:border-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                  <span className={`${D} text-sm font-extrabold text-gray-400 group-hover:text-white/50`}>{String(i + 1).padStart(2, "0")}</span>
                  <span className={`${D} text-xl font-extrabold leading-tight`}>{t}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 7. PROCESS: sticky title, big numbered steps, staggered */}
      <section className={`${PAD} py-20 md:py-28 bg-white`} aria-label="Our process">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[.7fr_1.3fr] gap-12 lg:gap-24">
          <div className="lg:sticky lg:top-28 self-start">
            <Eyebrow>Our process</Eyebrow>
            <h2 className={`${D} text-[clamp(1.9rem,4vw,3rem)] font-extrabold tracking-tight mt-3`}>Less guesswork. More forward motion.</h2>
            <Link href={L("/process")} className="inline-flex items-center gap-2 mt-7 font-bold border-b border-black pb-1 min-h-11 text-sm">See our full process <ArrowRight size={14} aria-hidden="true" /></Link>
          </div>
          <ol className="list-none p-0 relative before:absolute before:left-[1.1rem] before:top-2 before:bottom-2 before:w-px before:bg-gray-300 max-md:before:hidden">
            {V15_PROCESS.map((s, i) => (
              <li key={s.n} className="relative">
                <Animate animation="fade-up">
                  <div className={`grid md:grid-cols-[3.5rem_1fr] gap-x-6 py-8 ${i % 2 ? "md:pl-10" : ""}`}>
                    <span className={`${D} relative z-10 h-9 w-9 rounded-full bg-black text-white text-xs font-extrabold flex items-center justify-center`}>{s.n}</span>
                    <div>
                      <h3 className={`${D} text-[clamp(1.75rem,3.4vw,2.6rem)] font-extrabold tracking-tight leading-none`}>{s.t}</h3>
                      <p className="text-gray-600 text-lg leading-relaxed mt-3 max-w-lg">{s.d}</p>
                    </div>
                  </div>
                </Animate>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 8. PROOF: verified numbers and clients only */}
      <section className={`${PAD} py-16 md:py-20 bg-[#f7f5ff] border-y border-[#e8e2ff]`} aria-label="Clients and proof">
        <div className="max-w-7xl mx-auto">
          <Eyebrow>Trusted by</Eyebrow>
          <dl className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[["100+", "clients served"], ["6", "countries"], ["25", "services"], ["155+", "free marketing tools"]].map(([v, k]) => (
              <div key={k}><dd className={`${D} text-5xl lg:text-6xl font-extrabold tracking-tight`}>{v}</dd><dt className="text-sm text-gray-600 mt-1">{k}</dt></div>
            ))}
          </dl>
          <p className="mt-12 text-sm font-bold uppercase tracking-[0.16em] text-gray-500">Also worked with</p>
          <ul className="flex flex-wrap gap-x-8 gap-y-1 mt-3 list-none p-0">
            {V15_ALSO.map(([t, h]) => <li key={h}><Link href={L(h)} className={`${D} inline-flex items-center min-h-11 text-lg font-extrabold hover:underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-black`}>{t}</Link></li>)}
          </ul>
          <p className="text-sm text-gray-600 mt-2"><Link href={L("/case-studies")} className="underline underline-offset-4">See all case studies</Link></p>
        </div>
      </section>

      {/* 9. MARKETS: one compact strip */}
      <section className={`${PAD} py-8 bg-white border-b border-gray-200`} aria-label="Markets we serve">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-x-2 gap-y-1">
          <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-gray-500 mr-4">Markets we serve</h2>
          <ul className="flex flex-wrap gap-x-1 list-none p-0">
            {DEMO_MARKETS.map(([n, flag, h]) => (
              <li key={h}><Link href={L(h)} className="inline-flex items-center gap-2 min-h-11 px-3 text-sm font-semibold hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-black"><span aria-hidden="true">{flag}</span>{n}</Link></li>
            ))}
          </ul>
        </div>
      </section>

      {/* 10. INSIGHTS: three real articles */}
      <section className={`${PAD} py-16 md:py-24 bg-white`} aria-label="Latest insights">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div><Eyebrow>Insights</Eyebrow><h2 className={`${D} text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight mt-3`}>Latest from the blog</h2></div>
            <Link href={L("/blog")} className="inline-flex items-center gap-2 font-bold border-b border-black pb-1 min-h-11 text-sm">All articles <ArrowRight size={14} aria-hidden="true" /></Link>
          </div>
          <ul className="mt-10 grid md:grid-cols-3 gap-x-10 gap-y-10 list-none p-0">
            {posts.map((p) => (
              <li key={p.slug} className="border-t-2 border-black pt-5">
                <Link href={`/en/blog/${p.slug}`} className="group block focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-500">{p.category}{p.reading_time ? ` · ${p.reading_time} min read` : ""}</p>
                  <h3 className={`${D} text-xl font-extrabold leading-snug mt-2 group-hover:underline underline-offset-4`}>{p.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mt-3 line-clamp-3">{p.excerpt}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 11. QUOTE FORM */}
      <section id="quote" className={`${PAD} py-20 md:py-28 bg-gray-50 scroll-mt-20`} aria-labelledby="quote-h">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[.8fr_1.2fr] gap-12 lg:gap-20 items-start">
          <div>
            <Eyebrow>Request a quote</Eyebrow>
            <h2 id="quote-h" className={`${D} text-[clamp(2rem,4.4vw,3.2rem)] font-extrabold tracking-tight leading-[1.05] mt-3`}>Tell us what you need. We&apos;ll map the right mix.</h2>
            <p className="text-lg text-gray-600 leading-relaxed mt-5">Share the goal, the market and the budget range. We reply by email or WhatsApp with a practical starting scope, not a prebuilt package.</p>
            <ul className="mt-8 space-y-1 list-none p-0 text-sm font-semibold">
              <li><a href="mailto:ciao@themarkitmedia.com" className="inline-flex items-center min-h-11 underline underline-offset-4">ciao@themarkitmedia.com</a></li>
              <li><a href="https://wa.me/923002086081" target="_blank" rel="noopener noreferrer" className="inline-flex items-center min-h-11 underline underline-offset-4">WhatsApp us</a></li>
            </ul>
          </div>
          <div className="bg-white border border-gray-200 p-6 lg:p-10"><HomeQuoteForm /></div>
        </div>
      </section>
    </article>
  );
}
