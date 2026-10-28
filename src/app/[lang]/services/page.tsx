import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Animate } from "@/components/animate";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { BrandIcon } from "@/components/brand-icon";
import { YouTubeEmbed } from "@/components/youtube-embed";
import { QWENCH_VIDEO } from "@/data/featured-videos";
import { SOCIAL_URLS } from "@/lib/social";
import { SERVICE_DIRECTORY } from "@/data/services-directory";
import { AUDIT_PROCESS, ENGAGEMENTS, HUB_INDUSTRIES, OUTCOMES, PLATFORM_SETS, SERVICES_V2_FAQ, START_HERE, SYSTEM_NODES, type Platform } from "@/data/services-v2";
import { SUBSERVICES } from "@/data/services-v2-subs";
import { D, Eyebrow, FaqBlock, PAD, Tile } from "@/components/services-hub-parts";
import { ServicesHubQuoteForm } from "@/components/services-hub-quote";
import { getMedia, mediaUrl, mediaVariant } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Digital Marketing Services | SEO, PPC, Web & Social",
  description:
    "Explore Markit Media services for SEO, Google Ads, Meta Ads, social media, web development, branding, video, AI, analytics, ecommerce and BPO.",
  keywords: [
    "digital marketing services",
    "digital marketing agency",
    "SEO services",
    "PPC management",
    "Google Ads management",
    "Meta Ads management",
    "social media marketing",
    "website development",
    "branding agency",
    "video production",
    "marketing analytics",
  ],
  alternates: {
    canonical: "https://themarkitmedia.com/en/services",
  },
  openGraph: {
    title: "Digital Marketing Services",
    description:
      "SEO, paid media, social, websites, branding, video, AI, analytics and growth services built around measurable business goals.",
    url: "https://themarkitmedia.com/en/services",
    type: "website",
    images: [
      {
        url: "https://themarkitmedia.com/images/branding/og-image.png",
        width: 1200,
        height: 630,
        alt: "Markit Media digital marketing services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Marketing Services",
    description:
      "Explore SEO, PPC, social media, web development, branding, video, AI, analytics and ecommerce services.",
    images: ["https://themarkitmedia.com/images/branding/og-image.png"],
  },
  robots: { index: true, follow: true },
};

const svc = (slug: string) => SERVICE_DIRECTORY.find((s) => s.slug === slug)!;

/** Real project image from the portfolio record: intrinsic size, alt from the record, lazy unless priority. */
function P({ id, sizes, className = "", priority = false, w = 960 }: { id: string; sizes: string; className?: string; priority?: boolean; w?: number }) {
  const m = getMedia(id);
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={mediaUrl(id, mediaVariant(id, w))} width={m.w} height={m.h} alt={m.a} sizes={sizes} loading={priority ? "eager" : "lazy"} decoding="async" fetchPriority={priority ? "high" : "auto"} style={{ backgroundColor: m.bg }} className={`object-cover ${className}`} />;
}
function Logo({ p, size = "h-8 w-8" }: { p: Platform; size?: string }) {
  return p.svg ? <Image unoptimized src={p.svg} alt="" width={32} height={32} className={`${size} object-contain`} /> : <BrandIcon brand={p.brand} className={size} />;
}
function helpers(l: (p: string) => string) {
const Chips = ({ slug, dark = false, max = 8, skip = [] }: { slug: string; dark?: boolean; max?: number; skip?: string[] }) => (
  <ul className="flex flex-wrap gap-2 mt-6 list-none p-0" aria-label={`${svc(slug).title} specialities`}>
    {SUBSERVICES[slug].filter(([t]) => !skip.includes(t)).slice(0, max).map(([t, h]) => (
      <li key={h}><Link href={l(h)} className={`inline-flex items-center min-h-11 border px-3.5 text-sm font-semibold focus-visible:outline-2 ${dark ? "border-white/30 hover:bg-white hover:text-black focus-visible:outline-white" : "border-gray-300 hover:border-black focus-visible:outline-black"}`}>{t}</Link></li>
    ))}
  </ul>
);
const Explore = ({ slug, dark = false }: { slug: string; dark?: boolean }) => (
  <Link href={l(svc(slug).href)} className={`inline-flex items-center gap-2 mt-7 font-bold border-b pb-1 min-h-11 ${dark ? "border-white" : "border-black"}`}>Explore {svc(slug).title} <ArrowRight size={16} aria-hidden="true" /></Link>
);
const Proof = ({ client, line, href, dark = false }: { client: string; line: string; href: string; dark?: boolean }) => (
  <Link href={l(href)} className={`group mt-8 block border-l-2 pl-5 py-1 focus-visible:outline-2 ${dark ? "border-white/50 focus-visible:outline-white" : "border-black focus-visible:outline-black"}`}>
    <span className={`block text-[11px] font-bold uppercase tracking-[0.16em] ${dark ? "text-white/50" : "text-gray-500"}`}>Proof · {client}</span>
    <span className={`block text-sm leading-relaxed mt-1 ${dark ? "text-gray-300" : "text-gray-700"} group-hover:underline underline-offset-4`}>{line}</span>
  </Link>
);

  return { Chips, Explore, Proof };
}

export default async function ServicesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = (["en", "ar", "ur"].includes(lang) ? lang : "en") as "en" | "ar" | "ur";
  const l = (path: string) => `/${locale}${path}`;
  const { Chips, Explore, Proof } = helpers(l);
  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Digital Marketing Services by Markit Media",
    url: "https://themarkitmedia.com/en/services",
    description: "SEO, paid media, social media, website development, branding, video, AI, analytics, ecommerce and BPO services from Markit Media.",
    provider: { "@type": "Organization", name: "Markit Media", url: "https://themarkitmedia.com", sameAs: SOCIAL_URLS },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: SERVICE_DIRECTORY.length,
      itemListElement: SERVICE_DIRECTORY.map((service, index) => ({ "@type": "ListItem", position: index + 1, name: service.title, url: `https://themarkitmedia.com/en${service.href}` })),
    },
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: SERVICES_V2_FAQ.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  };
  const perf = svc("performance-marketing"), seo = svc("seo"), social = svc("social-media"), web = svc("website-development"), shop = svc("shopify"), brand = svc("branding"), video = svc("video-production"), ai = svc("ai");
  return (
    <article>
      <JsonLd data={servicesSchema} />
      <JsonLd data={faqSchema} />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Services" }]} locale={locale} />

      {/* 1. HERO: outcome line + a collage of real work */}
      <section className={`${PAD} pt-16 lg:pt-20 pb-14 overflow-hidden`} aria-labelledby="sv2-h1">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.02fr_.98fr] gap-12 lg:gap-16 items-center">
          <div>
            <Eyebrow>Digital marketing services</Eyebrow>
            <h1 id="sv2-h1" className={`${D} text-[clamp(2.3rem,4.6vw,4rem)] font-extrabold tracking-[-0.04em] leading-[1.02] mt-4`}>Strategy, creative, technology and growth, built as one connected system.</h1>
            <p className="text-lg lg:text-xl text-gray-600 leading-relaxed mt-6 max-w-xl">Use us as a specialist partner for one channel, or as an integrated growth team across paid media, SEO, social, websites, brand, video, AI and analytics. Twenty-five services, one team.</p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link href="#quote" className="inline-flex items-center gap-2 bg-black text-white px-7 py-4 font-bold hover:bg-[#5A3ED6] transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Request a Quote <ArrowRight size={16} aria-hidden="true" /></Link>
              <Link href="#choose" className="inline-flex items-center border border-gray-300 px-7 py-4 font-bold hover:border-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Find your starting point</Link>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[560px] aspect-[1/1.02]" aria-label="Examples of our work">
            <Tile href={l("/work/meezotech")} label="MeezoTech · branding" rotate="rotate-[-2deg] sv2-float" className="absolute left-0 top-0 w-[58%] shadow-xl"><P id="meezotech-logo-02" sizes="(max-width:1024px) 60vw, 32vw" priority className="w-full aspect-[16/10]" /></Tile>
            <Tile href={l("/work/qwench-juice-bar")} label="QWENCH Juice · reels and ads" rotate="rotate-[2deg] sv2-float-b" className="absolute right-0 top-[6%] w-[40%] shadow-xl"><Image unoptimized src="/images/services-v2/qwench.webp" alt="QWENCH Juice reel, still from the case study video" width={640} height={1138} priority className="w-full aspect-[9/14] object-cover" /></Tile>
            <Tile href={l("/work/thermex")} label="Thermex · social media" rotate="rotate-[1.5deg] sv2-float-b" className="absolute left-[4%] top-[34%] w-[44%] shadow-xl"><P id="thermex-social-04" sizes="(max-width:1024px) 45vw, 25vw" priority className="w-full aspect-square" /></Tile>
            <Tile href={l("/work/everest-snacks")} label="Everest Snacks · website" rotate="rotate-[-1deg] sv2-float" className="absolute left-[40%] bottom-0 w-[56%] shadow-2xl"><Image unoptimized src="/images/services-v2/everest-snacks.webp" alt="Everest Snacks website home page" width={1440} height={810} priority className="w-full aspect-[16/10] object-cover" /></Tile>
          </div>
        </div>
      </section>

      {/* 2. QUICK SELECTOR: four outcomes, all links in the HTML */}
      <section id="choose" className={`${PAD} py-16 md:py-20 bg-black text-white scroll-mt-20`} aria-labelledby="sv2-choose">
        <div className="max-w-7xl mx-auto">
          <Eyebrow dark>Start from the outcome</Eyebrow>
          <h2 id="sv2-choose" className={`${D} text-[clamp(1.9rem,4vw,3rem)] font-extrabold tracking-tight mt-3 max-w-3xl`}>What do you need your marketing to do?</h2>
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {OUTCOMES.map((o) => (
              <div key={o.key} className="border-t border-white/25 pt-5">
                <p className={`${D} text-sm font-extrabold text-white/40`}>{o.n}</p>
                <h3 className={`${D} text-3xl font-extrabold tracking-tight mt-1`}>{o.key}</h3>
                <p className="text-sm text-gray-400 mt-2 leading-relaxed">{o.line}</p>
                <ul className="mt-5 list-none p-0">
                  {o.slugs.map((s) => (
                    <li key={s}><Link href={l(svc(s).href)} className="flex items-center justify-between min-h-11 py-1.5 border-b border-white/10 text-[15px] font-semibold hover:text-[#b9a8ff] hover:border-white/40 focus-visible:outline-2 focus-visible:outline-white">{svc(s).title}<ArrowRight size={13} className="opacity-40" aria-hidden="true" /></Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3a. PERFORMANCE: full-width dark feature with platform row */}
      <section className={`${PAD} py-20 md:py-28 bg-[#0e0b1f] text-white overflow-hidden`} aria-labelledby="f-perf">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.1fr_.9fr] gap-12 lg:gap-20 items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#b9a8ff]">Acquire</p>
            <h2 id="f-perf" className={`${D} text-[clamp(2.2rem,5vw,4rem)] font-extrabold tracking-tight leading-[1.02] mt-3`}>{perf.title}</h2>
            <p className="text-xl text-white/80 mt-4 font-semibold">Turn ad budget into qualified demand.</p>
            <p className="text-gray-400 leading-relaxed mt-4 max-w-xl">{perf.desc} We structure accounts around the lead or sale you want, test creative against it, and report on what the spend actually produced.</p>
            <ul className="flex flex-wrap gap-3 mt-7 list-none p-0" aria-label="Ad platforms">
              {PLATFORM_SETS[0].items.map((p) => (
                <li key={p.label}><Link href={l(p.href!)} className="flex items-center gap-2.5 bg-white text-black pl-2.5 pr-4 min-h-11 text-sm font-bold focus-visible:outline-2 focus-visible:outline-white"><Logo p={p} size="h-6 w-6" />{p.label}</Link></li>
              ))}
            </ul>
            <Chips slug="performance-marketing" dark max={10} skip={["Google Ads", "Meta Ads", "TikTok Ads", "LinkedIn Ads", "Microsoft Ads"]} />
            <Proof dark client="QWENCH Juice" line="Website, social media, reels and Meta ads for a juice bar. See the case study." href="/work/qwench-juice-bar" />
            <Explore slug="performance-marketing" dark />
          </div>
          <Animate animation="fade-left" className="max-w-[360px] mx-auto w-full">
            <YouTubeEmbed videoId={QWENCH_VIDEO.id} title={QWENCH_VIDEO.title} alt={QWENCH_VIDEO.title} aspect="short" poster={QWENCH_VIDEO.poster} noCookie />
            <p className="text-xs text-white/50 mt-3 text-center">QWENCH Juice case study video</p>
          </Animate>
        </div>
      </section>

      {/* 3b. SEO: typographic split, no stock imagery */}
      <section className={`${PAD} py-20 md:py-28 bg-white`} aria-labelledby="f-seo">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[.9fr_1.1fr] gap-12 lg:gap-24">
          <div className="lg:sticky lg:top-28 self-start">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#5A3ED6]">Acquire</p>
            <h2 id="f-seo" className={`${D} text-[clamp(2.2rem,5vw,4rem)] font-extrabold tracking-tight leading-[1.02] mt-3`}>{seo.title}</h2>
            <p className="text-xl font-semibold mt-4">Be the answer when your customers search.</p>
            <p className="text-gray-600 leading-relaxed mt-4 max-w-md">{seo.desc} Includes search visibility in AI answers, not only the ten blue links.</p>
            <Proof client="Our guides" line="How we approach search, written down. Browse the SEO and AI-search guides." href="/guides" />
            <Explore slug="seo" />
          </div>
          <ol className="list-none p-0 border-t-2 border-black">
            {SUBSERVICES.seo.map(([t, h], i) => (
              <li key={h}>
                <Link href={l(h)} className="group flex items-baseline gap-5 py-5 border-b border-gray-200 hover:border-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                  <span className={`${D} text-sm font-extrabold text-gray-400 w-8`}>{String(i + 1).padStart(2, "0")}</span>
                  <span className={`${D} text-2xl lg:text-3xl font-extrabold tracking-tight flex-1 group-hover:translate-x-1 transition-transform motion-reduce:transition-none`}>{t}</span>
                  <ArrowRight size={18} className="text-gray-300 group-hover:text-black" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 3c. WEBSITE + ECOMMERCE: wide browser frame + platform logos */}
      <section className={`${PAD} py-20 md:py-28 bg-gray-50`} aria-labelledby="f-web">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[.8fr_1.2fr] gap-12 lg:gap-16 items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#5A3ED6]">Build</p>
              <h2 id="f-web" className={`${D} text-[clamp(2.2rem,5vw,4rem)] font-extrabold tracking-tight leading-[1.02] mt-3`}>{web.title}</h2>
              <p className="text-xl font-semibold mt-4">A site built to be found and to convert.</p>
              <p className="text-gray-600 leading-relaxed mt-4 max-w-md">{web.desc}</p>
              <ul className="flex flex-wrap gap-3 mt-6 list-none p-0" aria-label="Website platforms">
                {PLATFORM_SETS[2].items.filter((p) => p.href).map((p) => (
                  <li key={p.label}><Link href={l(p.href!)} className="flex items-center gap-2 border border-gray-300 bg-white pl-2 pr-3.5 min-h-11 text-sm font-bold hover:border-black focus-visible:outline-2 focus-visible:outline-black"><Logo p={p} size="h-6 w-6" />{p.label}</Link></li>
                ))}
              </ul>
              <Proof client="Everest Snacks" line="Design and development of an energy bar brand's 5-page website, plus blog articles and social content." href="/work/everest-snacks" />
              <Explore slug="website-development" />
            </div>
            <Animate animation="fade-up">
              <Tile href={l("/work/everest-snacks")} label="Everest Snacks · view the case study" className="border border-gray-300 bg-white shadow-2xl">
                <span className="flex gap-1.5 px-3 py-2.5 border-b border-gray-200 bg-gray-100" aria-hidden="true"><i className="h-2.5 w-2.5 rounded-full bg-gray-300" /><i className="h-2.5 w-2.5 rounded-full bg-gray-300" /><i className="h-2.5 w-2.5 rounded-full bg-gray-300" /></span>
                <Image unoptimized src="/images/services-v2/everest-snacks.webp" alt="Everest Snacks website home page" width={1440} height={810} className="w-full h-auto" />
              </Tile>
            </Animate>
          </div>
          <div className="mt-20 pt-10 border-t-2 border-black grid lg:grid-cols-[1.1fr_.9fr] gap-10 lg:gap-16 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#5A3ED6]">Build · Scale</p>
              <h3 className={`${D} text-3xl lg:text-4xl font-extrabold tracking-tight mt-3`}>{shop.title} and ecommerce growth</h3>
              <p className="text-lg font-semibold mt-3">Stores and journeys built around the sale.</p>
              <p className="text-gray-600 leading-relaxed mt-3 max-w-lg">{shop.desc} Pair it with ecommerce marketing, product feeds and email to keep customers buying.</p>
              <ul className="flex flex-wrap gap-2 mt-5 list-none p-0" aria-label="Ecommerce specialities">
                {[...SUBSERVICES["ecommerce-marketing"].slice(0, 4), ["Email marketing", "/services/email-marketing"] as [string, string]].map(([t, h]) => <li key={h}><Link href={l(h)} className="inline-flex items-center min-h-11 border border-gray-300 px-3.5 text-sm font-semibold hover:border-black bg-white focus-visible:outline-2 focus-visible:outline-black">{t}</Link></li>)}
              </ul>
              <Proof client="Find My Apparel" line="An online apparel brand's promotional social posts: sale banners, product call-outs and a free-delivery offer." href="/work/find-my-apparel" />
              <div className="flex flex-wrap gap-x-8"><Explore slug="shopify" /><Link href={l("/services/ecommerce-marketing")} className="inline-flex items-center gap-2 mt-7 font-bold border-b border-black pb-1 min-h-11">Ecommerce Marketing <ArrowRight size={16} aria-hidden="true" /></Link></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Tile href={l("/work/find-my-apparel")} label="Find My Apparel · social posts" className="shadow-lg"><P id="find-my-apparel-fashion-01" sizes="(max-width:1024px) 45vw, 22vw" className="w-full aspect-square" /></Tile>
              <Tile href={l("/work/find-my-apparel")} label="Find My Apparel · social posts" className="shadow-lg mt-8"><P id="find-my-apparel-fashion-04" sizes="(max-width:1024px) 45vw, 22vw" className="w-full aspect-square" /></Tile>
            </div>
          </div>
        </div>
      </section>

      {/* 3d. SOCIAL + CONTENT: overlapping real posts */}
      <section className={`${PAD} py-20 md:py-28 bg-white overflow-hidden`} aria-labelledby="f-soc">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.05fr_.95fr] gap-12 lg:gap-20 items-center">
          <div className="relative aspect-[1/.9] max-w-[600px] w-full mx-auto lg:mx-0" aria-label="Examples of social posts we designed">
            <Tile href={l("/work/thermex")} label="Thermex · social posts" rotate="rotate-[-3deg] sv2-float" className="absolute left-0 top-[6%] w-[46%] shadow-xl"><P id="thermex-social-04" sizes="(max-width:1024px) 45vw, 25vw" className="w-full aspect-square" /></Tile>
            <Tile href={l("/work/mustcare-vet-centres")} label="MustCare Vet Centres · social posts" rotate="rotate-[2deg] sv2-float-b" className="absolute left-[30%] top-0 w-[40%] shadow-2xl z-10"><P id="mustcare-vet-centres-social-01" sizes="(max-width:1024px) 40vw, 22vw" className="w-full aspect-[4/5]" /></Tile>
            <Tile href={l("/work/north-charge")} label="North Charge · social posts" rotate="rotate-[3deg] sv2-float" className="absolute right-0 top-[18%] w-[40%] shadow-xl"><P id="north-charge-social-04" sizes="(max-width:1024px) 40vw, 22vw" className="w-full aspect-square" /></Tile>
            <Tile href={l("/work/cambridge-electrical")} label="Cambridge Appliances · social posts" rotate="rotate-[1deg] sv2-float-b" className="absolute left-[12%] bottom-0 w-[44%] shadow-xl z-20"><P id="cambridge-social-03" sizes="(max-width:1024px) 44vw, 24vw" className="w-full aspect-square" /></Tile>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#5A3ED6]">Engage</p>
            <h2 id="f-soc" className={`${D} text-[clamp(2.2rem,5vw,4rem)] font-extrabold tracking-tight leading-[1.02] mt-3`}>{social.title}</h2>
            <p className="text-xl font-semibold mt-4">Keep your brand in the feed, consistently.</p>
            <p className="text-gray-600 leading-relaxed mt-4 max-w-md">{social.desc} Backed by content marketing: copy, blogs and case studies that give the posts something to say.</p>
            <Chips slug="social-media" />
            <Proof client="Thermex" line="A long run of social posts showing vacuum flasks and coolers in picnics, camping trips and kitchens, with the logo and identity designed to match." href="/work/thermex" />
            <div className="flex flex-wrap gap-x-8"><Explore slug="social-media" /><Link href={l("/services/content-marketing")} className="inline-flex items-center gap-2 mt-7 font-bold border-b border-black pb-1 min-h-11">Content Marketing <ArrowRight size={16} aria-hidden="true" /></Link></div>
          </div>
        </div>
      </section>

      {/* 3e. BRANDING + VIDEO: two identity boards, then the reel */}
      <section className={`${PAD} py-20 md:py-28 bg-gray-50`} aria-labelledby="f-brand">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#5A3ED6]">Build</p>
              <h2 id="f-brand" className={`${D} text-[clamp(2.2rem,5vw,4rem)] font-extrabold tracking-tight leading-[1.02] mt-3`}>{brand.title}</h2>
              <p className="text-xl font-semibold mt-4">An identity that holds across every channel.</p>
              <p className="text-gray-600 leading-relaxed mt-4 max-w-lg">{brand.desc}</p>
              <Chips slug="branding" />
              <Proof client="MeezoTech" line="Red and black identity, logo animation and social posts for a technology company." href="/work/meezotech" />
              <Explore slug="branding" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Tile href={l("/work/meezotech")} label="MeezoTech · brand identity" className="shadow-lg self-start"><P id="meezotech-logo-02" sizes="(max-width:1024px) 45vw, 28vw" className="w-full aspect-[16/11]" /></Tile>
              <Tile href={l("/work/minhaz-couture")} label="Minhaz Couture · brand identity" className="shadow-lg mt-10 self-start"><P id="minhaz-couture-logo-02" sizes="(max-width:1024px) 45vw, 28vw" className="w-full aspect-[16/11]" /></Tile>
            </div>
          </div>
          <div className="mt-24 grid lg:grid-cols-[.8fr_1.2fr] gap-10 lg:gap-20 items-center">
            <div className="max-w-[300px] mx-auto w-full order-2 lg:order-1">
              <Tile href={l("/work/qwench-juice-bar")} label="QWENCH Juice · reels and ads" className="shadow-xl"><Image unoptimized src="/images/services-v2/qwench.webp" alt="QWENCH Juice reel, still from the case study video" width={640} height={1138} className="w-full h-auto" /></Tile>
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#5A3ED6]">Build</p>
              <h3 className={`${D} text-3xl lg:text-5xl font-extrabold tracking-tight leading-[1.04] mt-3`}>{video.title}</h3>
              <p className="text-lg font-semibold mt-3">Reels, commercials and motion that carry the story.</p>
              <p className="text-gray-600 leading-relaxed mt-3 max-w-lg">{video.desc}</p>
              <Chips slug="video-production" />
              <Proof client="QWENCH Juice" line="Reels and a case-study video for a juice bar, alongside its website and Meta ads." href="/work/qwench-juice-bar" />
              <div className="flex flex-wrap gap-x-8"><Explore slug="video-production" /><Link href={l("/services/photography")} className="inline-flex items-center gap-2 mt-7 font-bold border-b border-black pb-1 min-h-11">Photography <ArrowRight size={16} aria-hidden="true" /></Link></div>
            </div>
          </div>
        </div>
      </section>

      {/* 3f. AI + CRM: typographic dark block */}
      <section className={`${PAD} py-20 md:py-28 bg-black text-white`} aria-labelledby="f-ai">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-24">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#b9a8ff]">Scale</p>
            <h2 id="f-ai" className={`${D} text-[clamp(2.2rem,5vw,4rem)] font-extrabold tracking-tight leading-[1.02] mt-3`}>{ai.title}, CRM and automation</h2>
            <p className="text-xl font-semibold text-white/85 mt-4">Remove the manual work between a lead and a customer.</p>
            <p className="text-gray-400 leading-relaxed mt-4 max-w-md">{ai.desc} Connected to a CRM so follow-up, reporting and handoffs run without copy-paste.</p>
            <ul className="flex flex-wrap gap-3 mt-6 list-none p-0" aria-label="CRM platforms">
              {PLATFORM_SETS[3].items.filter((p) => ["HubSpot", "Salesforce", "Zoho", "GoHighLevel"].includes(p.label)).map((p) => (
                <li key={p.label}><Link href={l(p.href!)} className="flex items-center gap-2 bg-white text-black pl-2 pr-3.5 min-h-11 text-sm font-bold focus-visible:outline-2 focus-visible:outline-white"><Logo p={p} size="h-6 w-6" />{p.label}</Link></li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-x-8"><Explore slug="ai" dark /><Link href={l("/services/crm-development")} className="inline-flex items-center gap-2 mt-7 font-bold border-b border-white pb-1 min-h-11">CRM Development <ArrowRight size={16} aria-hidden="true" /></Link></div>
          </div>
          <ul className="list-none p-0 border-t border-white/20 self-start">
            {[...SUBSERVICES.ai, ...SUBSERVICES["crm-development"].slice(0, 2)].map(([t, h]) => (
              <li key={h}><Link href={l(h)} className="group flex items-center justify-between py-5 border-b border-white/20 hover:border-white focus-visible:outline-2 focus-visible:outline-white"><span className={`${D} text-xl lg:text-2xl font-extrabold tracking-tight`}>{t}</span><ArrowRight size={16} className="opacity-40 group-hover:opacity-100" aria-hidden="true" /></Link></li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. FULL DIRECTORY: all 25, grouped, every sub-service route */}
      <section className={`${PAD} py-20 md:py-28 bg-white`} aria-labelledby="sv2-dir">
        <div className="max-w-7xl mx-auto">
          <Eyebrow>The full directory</Eyebrow>
          <h2 id="sv2-dir" className={`${D} text-[clamp(1.9rem,4vw,3rem)] font-extrabold tracking-tight mt-3 max-w-3xl`}>All 25 services and what sits under them.</h2>
          <div className="mt-12 space-y-16">
            {OUTCOMES.map((o) => (
              <div key={o.key} className="grid lg:grid-cols-[.35fr_1.65fr] gap-6 lg:gap-12 border-t-2 border-black pt-6">
                <div><p className={`${D} text-sm font-extrabold text-gray-400`}>{o.n}</p><h3 className={`${D} text-3xl font-extrabold`}>{o.key}</h3></div>
                <ul className="list-none p-0 grid md:grid-cols-2 gap-x-12 gap-y-8">
                  {o.slugs.map((slug) => {
                    const s = svc(slug); const subs = SUBSERVICES[slug] ?? [];
                    return (
                      <li key={slug}>
                        <Link href={l(s.href)} className={`${D} inline-flex items-center gap-2 text-lg font-extrabold hover:underline underline-offset-4 min-h-11 focus-visible:outline-2 focus-visible:outline-black`}>{s.title}<ArrowRight size={14} aria-hidden="true" /></Link>
                        <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">{s.desc}</p>
                        {subs.length > 0 && (
                          <ul className="flex flex-wrap gap-x-4 list-none p-0 mt-1" aria-label={`${s.title} sub-services`}>
                            {subs.map(([t, h]) => <li key={h}><Link href={l(h)} className="inline-flex items-center min-h-8 text-[13px] text-gray-600 underline decoration-gray-300 underline-offset-4 hover:text-black hover:decoration-black">{t}</Link></li>)}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PLATFORMS: grouped, real logos */}
      <section className={`${PAD} py-20 md:py-28 bg-gray-50 border-y border-gray-200`} aria-labelledby="sv2-plat">
        <div className="max-w-7xl mx-auto">
          <Eyebrow>Platform and technology expertise</Eyebrow>
          <h2 id="sv2-plat" className={`${D} text-[clamp(1.9rem,4vw,3rem)] font-extrabold tracking-tight mt-3 max-w-3xl`}>The tools we work in every day.</h2>
          <div className="mt-12 grid md:grid-cols-2 gap-x-16 gap-y-12">
            {PLATFORM_SETS.map((g, gi) => (
              <div key={g.title} className={gi === 3 ? "md:col-span-2" : ""}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 border-b-2 border-black pb-2"><h3 className={`${D} text-xl font-extrabold`}>{g.title}</h3><p className="text-sm text-gray-500">{g.line}</p></div>
                <ul className={`list-none p-0 grid gap-x-8 ${gi === 3 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2"}`}>
                  {g.items.map((p) => {
                    const inner = (<><Logo p={p} /><span className="font-bold text-sm flex-1">{p.label}</span>{p.href && <ArrowRight size={13} className="text-gray-300 group-hover:text-black" aria-hidden="true" />}</>);
                    return <li key={p.label}>{p.href ? <Link href={l(p.href)} className="group flex items-center gap-4 min-h-14 py-2 border-b border-gray-200 hover:border-black focus-visible:outline-2 focus-visible:outline-black">{inner}</Link> : <div className="group flex items-center gap-4 min-h-14 py-2 border-b border-gray-200">{inner}</div>}</li>;
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. HOW SERVICES WORK TOGETHER: connected system diagram + notes */}
      <section className={`${PAD} py-20 md:py-28 bg-white`} aria-labelledby="sv2-sys">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-center">
          <div>
            <Eyebrow>One growth system</Eyebrow>
            <h2 id="sv2-sys" className={`${D} text-[clamp(2rem,4.6vw,3.6rem)] font-extrabold tracking-tight leading-[1.04] mt-3`}>The channel is not the strategy.</h2>
            <p className="text-lg text-gray-600 leading-relaxed mt-5 max-w-lg">Each service feeds the others. Running them in one team means what you learn in one place improves the rest.</p>
            <dl className="mt-8 divide-y divide-gray-200 border-y border-gray-200">
              {SYSTEM_NODES.map((n) => (<div key={n.t} className="grid sm:grid-cols-[9rem_1fr] gap-x-6 py-4"><dt className={`${D} font-extrabold`}>{n.t}</dt><dd className="text-sm text-gray-600 leading-relaxed">{n.d}</dd></div>))}
            </dl>
          </div>
          <figure className="mx-auto w-full max-w-[520px]">
            <svg viewBox="0 0 400 400" role="img" aria-labelledby="sys-t sys-d" className="w-full h-auto">
              <title id="sys-t">How the services connect</title>
              <desc id="sys-d">Six services arranged in a ring around a centre labelled shared goals: paid media, search and content, website, analytics, CRM and email, and brand. Each connects to its neighbours.</desc>
              <circle cx="200" cy="200" r="130" fill="none" stroke="#d4d4d8" strokeWidth="1.5" strokeDasharray="4 6" />
              <circle cx="200" cy="200" r="52" fill="#0b0b0b" />
              <text x="200" y="196" textAnchor="middle" fontSize="12" fontWeight="800" fill="#fff">SHARED</text>
              <text x="200" y="212" textAnchor="middle" fontSize="12" fontWeight="800" fill="#fff">GOALS</text>
              {SYSTEM_NODES.map((n, i) => {
                const a = (-90 + i * 60) * (Math.PI / 180); const x = 200 + 130 * Math.cos(a), y = 200 + 130 * Math.sin(a);
                const label = n.t.split(" and ");
                return (
                  <g key={n.t}>
                    <line x1="200" y1="200" x2={x} y2={y} stroke="#d4d4d8" strokeWidth="1.5" />
                    <circle cx={x} cy={y} r="36" fill={i % 2 ? "#fff" : "#5A3ED6"} stroke={i % 2 ? "#0b0b0b" : "#5A3ED6"} strokeWidth="2" />
                    {label.map((l, k) => <text key={l} x={x} y={y + (label.length === 1 ? 4 : k === 0 ? -2 : 12)} textAnchor="middle" fontSize="10.5" fontWeight="800" fill={i % 2 ? "#0b0b0b" : "#fff"}>{k === 1 ? `& ${l}` : l}</text>)}
                  </g>
                );
              })}
            </svg>
          </figure>
        </div>
      </section>

      {/* 7. START HERE */}
      <section className={`${PAD} py-16 md:py-24 bg-[#f7f5ff] border-y border-[#e8e2ff]`} aria-labelledby="sv2-start">
        <div className="max-w-7xl mx-auto">
          <Eyebrow>Where to start</Eyebrow>
          <h2 id="sv2-start" className={`${D} text-[clamp(1.9rem,4vw,3rem)] font-extrabold tracking-tight mt-3`}>Pick the problem. We&apos;ll point to the mix.</h2>
          <ul className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10 list-none p-0">
            {START_HERE.map((s, i) => (
              <li key={s.need} className="border-t-2 border-black pt-4">
                <p className={`${D} text-sm font-extrabold text-[#5A3ED6]`}>{String(i + 1).padStart(2, "0")}</p>
                <h3 className={`${D} text-xl font-extrabold mt-1`}>{s.need}</h3>
                <p className="text-sm text-gray-600 mt-2">Start with:</p>
                <ul className="mt-1 list-none p-0">{s.mix.map(([t, h]) => <li key={h}><Link href={l(h)} className="inline-flex items-center gap-2 min-h-11 font-bold text-sm underline underline-offset-4 decoration-gray-400 hover:decoration-black">{t} <ArrowRight size={13} aria-hidden="true" /></Link></li>)}</ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 8. SELECTED CASE STUDIES */}
      <section className={`${PAD} py-20 md:py-28 bg-white`} aria-labelledby="sv2-cases">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div><Eyebrow>Selected work</Eyebrow><h2 id="sv2-cases" className={`${D} text-[clamp(1.9rem,4vw,3rem)] font-extrabold tracking-tight mt-3`}>Five projects, five disciplines.</h2></div>
            <div className="flex gap-x-8"><Link href={l("/work")} className="inline-flex items-center gap-2 font-bold border-b border-black pb-1 min-h-11 text-sm">View all work <ArrowRight size={14} aria-hidden="true" /></Link><Link href={l("/case-studies")} className="inline-flex items-center gap-2 font-bold border-b border-black pb-1 min-h-11 text-sm">Explore case studies <ArrowRight size={14} aria-hidden="true" /></Link></div>
          </div>
          <div className="mt-12 grid md:grid-cols-12 gap-x-8 gap-y-14">
            {[
              { c: "QWENCH Juice", d: "Social, video and paid ads", l: "Website, social media, reels and Meta ads, blended into one fresh brand.", h: "/work/qwench-juice-bar", img: <Image unoptimized src="/images/services-v2/qwench.webp" alt="QWENCH Juice reel, still from the case study video" width={640} height={1138} className="w-full aspect-[4/5] object-cover" />, span: "md:col-span-4 md:row-span-2" },
              { c: "Everest Snacks", d: "Website development", l: "Design and development of an energy bar brand's website, with the content around it.", h: "/work/everest-snacks", img: <Image unoptimized src="/images/services-v2/everest-snacks.webp" alt="Everest Snacks website home page" width={1440} height={810} className="w-full aspect-[16/9] object-cover" />, span: "md:col-span-8" },
              { c: "MeezoTech", d: "Branding", l: "A red and black identity, logo animation and social posts for a technology company.", h: "/work/meezotech", img: <P id="meezotech-logo-02" sizes="(max-width:768px) 100vw, 33vw" className="w-full aspect-[4/3]" />, span: "md:col-span-4" },
              { c: "Thermex", d: "Social media and identity", l: "Logo, identity and a long run of social posts for a household products brand.", h: "/work/thermex", img: <P id="thermex-social-04" sizes="(max-width:768px) 100vw, 33vw" className="w-full aspect-[4/3]" />, span: "md:col-span-4" },
            ].map((x, i) => (
              <Animate key={x.c} animation="fade-up" delay={i * 70} className={x.span}>
                <Link href={l(x.h)} className="group block focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-4">
                  <div className="overflow-hidden bg-gray-100 [&_img]:transition-transform [&_img]:duration-700 group-hover:[&_img]:scale-[1.04] motion-reduce:[&_img]:transition-none">{x.img}</div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#5A3ED6] mt-4">{x.d}</p>
                  <h3 className={`${D} text-2xl font-extrabold mt-1`}>{x.c}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mt-2">{x.l}</p>
                  <span className="inline-flex items-center gap-2 mt-3 text-sm font-bold">View the case study <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform motion-reduce:transition-none" aria-hidden="true" /></span>
                </Link>
              </Animate>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-12 max-w-2xl">No campaign results are shown on purpose: figures appear only once a client has confirmed them.</p>
        </div>
      </section>

      {/* 9. INDUSTRIES (compact, with real images where we have them) */}
      <section className={`${PAD} py-16 md:py-20 bg-gray-50`} aria-labelledby="sv2-ind">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-end justify-between gap-4"><div><Eyebrow>Industries</Eyebrow><h2 id="sv2-ind" className={`${D} text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight mt-3`}>Industries we serve</h2></div><Link href={l("/industries")} className="inline-flex items-center gap-2 font-bold border-b border-black pb-1 min-h-11 text-sm">All industries <ArrowRight size={14} aria-hidden="true" /></Link></div>
          <ul className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 list-none p-0">
            {[
              ["Restaurants and hospitality", "/industries/restaurants", "elite-food-01"], ["Ecommerce", "/industries/ecommerce", "find-my-apparel-fashion-01"], ["Fashion", "/industries/fashion", "minhaz-couture-logo-02"], ["EV charging", "/industries/ev-chargers", "north-charge-social-04"],
            ].map(([t, h, id]) => (
              <li key={h}><Link href={l(h)} className="group relative block overflow-hidden focus-visible:outline-2 focus-visible:outline-black"><P id={id} sizes="(max-width:768px) 45vw, 22vw" className="w-full aspect-[4/5] transition-transform duration-700 group-hover:scale-[1.04] motion-reduce:transition-none" /><span className={`${D} absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-4 pt-12 text-white font-extrabold text-lg`}>{t}</span></Link></li>
            ))}
          </ul>
          <ul className="mt-6 flex flex-wrap gap-x-2 list-none p-0">
            {HUB_INDUSTRIES.filter(([, h]) => !["/industries/restaurants", "/industries/ecommerce", "/industries/fashion", "/industries/ev-chargers"].includes(h)).map(([t, h]) => <li key={h}><Link href={l(h)} className="inline-flex items-center min-h-11 px-3.5 border border-gray-300 bg-white text-sm font-semibold hover:border-black">{t}</Link></li>)}
          </ul>
        </div>
      </section>

      {/* 10 + 11. PROCESS and ENGAGEMENT MODELS side by side */}
      <section className={`${PAD} py-20 md:py-28 bg-white`} aria-labelledby="sv2-proc">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <Eyebrow>How we work</Eyebrow>
            <h2 id="sv2-proc" className={`${D} text-[clamp(1.9rem,4vw,3rem)] font-extrabold tracking-tight mt-3`}>From first call to steady improvement.</h2>
            <ol className="mt-10 list-none p-0">
              {AUDIT_PROCESS.map((s) => (
                <li key={s.n}><Animate animation="fade-up"><div className="grid grid-cols-[4.5rem_1fr] gap-x-4 py-5 border-b border-gray-200"><span className={`${D} text-5xl font-extrabold leading-none text-transparent [-webkit-text-stroke:1.5px_#0b0b0b]`} aria-hidden="true">{s.n}</span><div><h3 className={`${D} text-xl font-extrabold`}><span className="sr-only">Step {s.n}: </span>{s.t}</h3><p className="text-sm text-gray-600 leading-relaxed mt-1">{s.d}</p></div></div></Animate></li>
              ))}
            </ol>
            <Link href={l("/process")} className="inline-flex items-center gap-2 mt-6 font-bold border-b border-black pb-1 min-h-11 text-sm">See our full process <ArrowRight size={14} aria-hidden="true" /></Link>
          </div>
          <div>
            <Eyebrow>Engagement models</Eyebrow>
            <h2 className={`${D} text-[clamp(1.9rem,4vw,3rem)] font-extrabold tracking-tight mt-3`}>Work with us the way that fits.</h2>
            <ul className="mt-10 list-none p-0 border-t-2 border-black">
              {ENGAGEMENTS.map((e) => (<li key={e.t} className="py-5 border-b border-gray-200"><h3 className={`${D} text-xl font-extrabold`}>{e.t}</h3><p className="text-sm text-gray-600 leading-relaxed mt-1 max-w-md">{e.d}</p></li>))}
            </ul>
            <p className="text-sm text-gray-500 mt-5">Pricing depends on goals, channels and workload, so it is quoted per project.</p>
            <Link href={l("/pricing")} className="inline-flex items-center gap-2 mt-2 font-bold border-b border-black pb-1 min-h-11 text-sm">How pricing works <ArrowRight size={14} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <FaqBlock items={SERVICES_V2_FAQ} title="Questions about working with Markit Media" bg="bg-gray-50" />

      {/* 14. QUOTE */}
      <section id="quote" className={`${PAD} py-20 md:py-28 scroll-mt-20 bg-white`} aria-labelledby="sv2-quote">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[.8fr_1.2fr] gap-12 lg:gap-20 items-start">
          <div>
            <Eyebrow>Request a quote</Eyebrow>
            <h2 id="sv2-quote" className={`${D} text-[clamp(2rem,4.4vw,3.2rem)] font-extrabold tracking-tight leading-[1.05] mt-3`}>Tell us the problem. We&apos;ll map the right services.</h2>
            <p className="text-lg text-gray-600 leading-relaxed mt-5">Choose the services you are considering, share the goal and a budget range. We reply by email or WhatsApp with a practical starting scope, not a prebuilt package.</p>
            <ul className="mt-8 space-y-1 list-none p-0 text-sm font-semibold"><li><a href="mailto:ciao@themarkitmedia.com" className="inline-flex items-center min-h-11 underline underline-offset-4">ciao@themarkitmedia.com</a></li><li><a href="https://wa.me/923002086081" target="_blank" rel="noopener noreferrer" className="inline-flex items-center min-h-11 underline underline-offset-4">WhatsApp us</a></li></ul>
          </div>
          <div className="bg-gray-50 border border-gray-200 p-6 lg:p-10"><ServicesHubQuoteForm /></div>
        </div>
      </section>
    </article>
  );
}
