import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Animate } from "@/components/animate";
import { JsonLd } from "@/components/json-ld";
import { BrandIcon } from "@/components/brand-icon";
import { YouTubeEmbed } from "@/components/youtube-embed";
import { getDictionary } from "@/i18n/dictionaries";
import { getPublishedPosts } from "@/lib/blog";
import { SOCIAL_URLS } from "@/lib/social";
import { QWENCH_VIDEO, videoObjectSchema } from "@/data/featured-videos";
import { SERVICE_DIRECTORY } from "@/data/services-directory";
import { SUBSERVICES } from "@/data/services-v2-subs";
import { BUILD_LAYERS, FAMILY_STRIP, PLATFORM_GROUPS, V16_PROCESS, V16_TOOLS, V16_WHY, type PlatformItem } from "@/data/home-v16";
import { ServiceArt } from "@/components/home-service-art";
import { HeroSlider, type HeroSlide } from "@/components/home-hero-slider";
import { Counter, ProcessStory, type ProcessStep } from "@/components/home-client";
import { HomeQuoteForm } from "@/components/home-quote-form";
import { getMedia, mediaUrl, mediaVariant } from "@/lib/portfolio";

export const metadata: Metadata = {
  description: "Full-stack digital marketing, website development, and creative services for businesses across the USA, Canada, UAE, UK, Australia, and Saudi Arabia.",
  alternates: { canonical: "https://themarkitmedia.com/en" },
  openGraph: {
    title: "Markit Media — Full-Stack Digital Marketing Agency",
    url: "https://themarkitmedia.com/en",
    siteName: "Markit Media",
    description: "Full-stack digital marketing, website development, and creative services for businesses across the USA, Canada, UAE, UK, Australia, and Saudi Arabia.",
    type: "website",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
  },
  twitter: {
    card: "summary_large_image",
    description: "Full-stack digital marketing, website development, and creative services.",
  },
};

const industries: [string, string, boolean?][] = [
  ["Exterior Cleaning", "/industries/exterior-cleaning", true], ["Rehab & Recovery", "/industries/rehab-recovery", true], ["Personal Branding", "/industries/personal-branding"], ["Food Ingredients E-commerce", "/industries/food-ingredients-ecommerce"],
  ["Home Services", "/industries/home-services"], ["E-commerce", "/industries/ecommerce"], ["Healthcare", "/industries/healthcare"], ["Real Estate", "/industries/real-estate"], ["Restaurants", "/industries/restaurants"], ["Fashion", "/industries/fashion"],
  ["B2B", "/industries/b2b"], ["EV Chargers", "/industries/ev-chargers"], ["Education", "/industries/education"], ["Legal", "/industries/legal"], ["SaaS", "/industries/saas"], ["Finance", "/industries/finance"],
  ["Hospitality", "/industries/hospitality"], ["Fitness", "/industries/fitness"], ["Automotive", "/industries/automotive"], ["Nonprofits", "/industries/nonprofits"], ["Construction", "/industries/construction"], ["Travel", "/industries/travel"],
  ["Professional Services", "/industries/professional-services"], ["Manufacturing", "/industries/manufacturing"],
];

const markets = [
  { name: "United States", flag: "🇺🇸", href: "/locations/united-states" },
  { name: "Canada", flag: "🇨🇦", href: "/locations/canada" },
  { name: "United Arab Emirates", flag: "🇦🇪", href: "/locations/uae" },
  { name: "United Kingdom", flag: "🇬🇧", href: "/locations/uk" },
  { name: "Australia", flag: "🇦🇺", href: "/locations/australia" },
  { name: "Saudi Arabia", flag: "🇸🇦", href: "/locations/saudi-arabia" },
  { name: "Pakistan", flag: "🇵🇰", href: "/locations/karachi" },
];

const faqItems = [
  { q: "What services does Markit Media offer?", a: "We offer full-stack digital marketing including SEO, paid advertising, social media, website development, branding, video production, AI solutions, content marketing, and email marketing." },
  { q: "Which industries do you work with?", a: "We work across exterior cleaning, rehab and recovery, EV charging, restaurants, e-commerce, food ingredients, fashion, executive personal branding, home services, healthcare, real estate, B2B, and more." },
  { q: "Do you have specialist experience in exterior cleaning?", a: "Yes. Exterior cleaning is a specialist vertical for us, including window cleaning, pressure washing, soft washing, roof cleaning, gutter cleaning, commercial exterior cleaning, and related local service growth." },
  { q: "Can you manage both Google Ads and Meta Ads?", a: "Yes. We plan and manage Google Ads and Meta campaigns, then connect paid acquisition with landing pages, creative, CRM follow-up, and reporting where the client stack allows it." },
  { q: "Do you work with Shopify stores?", a: "Yes. Our e-commerce work includes Shopify strategy, store development, product and feed optimization, paid acquisition, conversion improvement, and retention-oriented marketing." },
  { q: "Where are your clients based?", a: "We serve clients across the USA, Canada, UAE, UK, Australia, and Saudi Arabia." },
  { q: "Do you provide digital marketing services for businesses in the USA?", a: "Yes. We support U.S. businesses with Google Ads, Meta Ads, SEO, local SEO, website development, creative, analytics, and growth strategy, with scopes tailored to the market, industry, and goals." },
  { q: "How much does a digital marketing agency cost in the USA?", a: "Agency pricing in the USA varies by channels, media spend, competition, creative requirements, and reporting needs. We scope engagements around the services and operating requirements rather than quoting a single generic number." },
  { q: "Can you manage Google Ads and PPC for multi-location U.S. businesses?", a: "Yes. We can structure paid search and local acquisition around multiple locations, including location-specific campaigns, landing pages, conversion tracking, budget allocation, and reporting." },
  { q: "Do you provide white-label PPC services for U.S. agencies?", a: "Yes. Our white-label model can support agencies with Google Ads, Meta Ads, SEO, development, creative, and fulfillment while the partner agency retains its client relationship." },
  { q: "How do you measure results?", a: "We use data-driven metrics including ROI, conversion rates, traffic growth, and engagement to measure and optimize campaign performance." },
  { q: "What makes Markit Media different from other agencies?", a: "We combine strategic thinking with hands-on execution. You work directly with senior marketers, not junior account managers." },
  { q: "How long does it take to see results?", a: "Paid campaigns can show results within weeks. SEO and organic strategies typically show meaningful growth within 3-6 months." },
  { q: "Do you offer custom packages?", a: "Yes. Every engagement starts with understanding your goals, and we build a strategy and pricing model tailored to your business." },
  { q: "How do I get started?", a: "Contact us for a free consultation. We will discuss your goals and recommend the best approach for your business." },
];

const D = "font-[family-name:var(--font-display)]";
const PAD = "px-6 lg:px-12";
const svc = (slug: string) => SERVICE_DIRECTORY.find((s) => s.slug === slug)!;

/** Real project image from the portfolio record (intrinsic size, alt from the record). */
function P({ id, sizes, className = "", w = 960 }: { id: string; sizes: string; className?: string; w?: number }) {
  const m = getMedia(id);
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={mediaUrl(id, mediaVariant(id, w))} width={m.w} height={m.h} alt={m.a} sizes={sizes} loading="lazy" decoding="async" style={{ backgroundColor: m.bg }} className={`object-cover ${className}`} />;
}
function Logo({ p, size = "h-8 w-8" }: { p: PlatformItem; size?: string }) {
  return p.svg ? <Image unoptimized src={p.svg} alt="" width={32} height={32} className={`${size} object-contain`} /> : <BrandIcon brand={p.brand || p.label} className={size} />;
}
function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return <p className={`text-xs font-bold uppercase tracking-[0.2em] ${dark ? "text-white/55" : "text-gray-500"}`}>{children}</p>;
}
const Arrow = () => <ArrowRight size={16} aria-hidden="true" />;

const SLIDES: HeroSlide[] = [
  { key: "qwench", name: "QWENCH Juice", href: "/en/work/qwench-juice-bar", image: "", alt: "", tag: "Video case study", video: { id: QWENCH_VIDEO.id, title: QWENCH_VIDEO.title, poster: QWENCH_VIDEO.poster } },
  { key: "everest", name: "Everest Snacks", href: "/en/work/everest-snacks", image: "/images/services-v2/everest-snacks.webp", alt: "Everest Snacks website home page", tag: "Website development" },
  { key: "north", name: "North Charge", href: "/en/work/north-charge", image: "/images/home-v16/north-charge.webp", alt: "North Charge social post in orange and dark green", tag: "Social media design" },
  { key: "meezo", name: "MeezoTech", href: "/en/work/meezotech", image: "/images/home-v16/meezotech.webp", alt: "MeezoTech brand identity board", tag: "Branding" },
  { key: "insp", name: "Inspection & lab software", href: "/en/work/inspection-management-platform", image: "/images/work/inspection-management-platform/cover.webp", alt: "Inspection platform dashboard with a work queue, key figures and a tonnage chart", tag: "Software we built" },
];

/** The eight capability groups. Tile = real work (or our own vector art) above a solid colour panel. */
const GROUPS = [
  { slug: "performance-marketing", c: "#5A3ED6", line: "Ads that turn budget into qualified demand.", span: "md:col-span-5 md:row-span-2", img: <Image unoptimized src="/images/services-v2/qwench.webp" alt="QWENCH Juice reel, still from the case study video" width={640} height={1138} className="absolute inset-0 h-full w-full object-cover object-top" /> },
  { slug: "seo", c: "#0FA593", line: "Be the answer when customers search.", span: "md:col-span-4", img: <ServiceArt slug="seo" className="absolute inset-0 [&>*]:h-full [&>*]:w-full" /> },
  { slug: "social-media", c: "#E8463A", line: "Keep your brand in the feed.", span: "md:col-span-3", img: <P id="north-charge-social-04" sizes="(max-width:768px) 100vw, 25vw" className="absolute inset-0 h-full w-full" /> },
  { slug: "website-development", c: "#2F7BF6", line: "Sites built to be found and to convert.", span: "md:col-span-7", img: <Image unoptimized src="/images/services-v2/everest-snacks.webp" alt="Everest Snacks website home page" width={1440} height={810} className="absolute inset-0 h-full w-full object-cover object-top" /> },
  { slug: "shopify", c: "#E08A00", line: "Stores built around the sale.", span: "md:col-span-3", img: <P id="find-my-apparel-fashion-01" sizes="(max-width:768px) 100vw, 25vw" className="absolute inset-0 h-full w-full" /> },
  { slug: "branding", c: "#111111", line: "An identity that holds across channels.", span: "md:col-span-3", img: <Image unoptimized src="/images/home-v16/meezotech.webp" alt="MeezoTech brand identity board" width={900} height={506} className="absolute inset-0 h-full w-full object-cover" /> },
  { slug: "video-production", c: "#C23FA6", line: "Reels and motion that carry the story.", span: "md:col-span-3", img: <ServiceArt slug="video-production" className="absolute inset-0 [&>*]:h-full [&>*]:w-full" /> },
  { slug: "ai", c: "#2a1a6b", line: "AI, CRM and automation behind the marketing.", span: "md:col-span-3", img: <Image unoptimized src="/images/work/inspection-management-platform/cover.webp" alt="Inspection platform dashboard we built" width={1440} height={810} className="absolute inset-0 h-full w-full object-cover object-left-top" /> },
] as const;

const CASE_THUMBS: [string, string][] = [
  ["thermex-social-04", "/work/thermex"], ["find-my-apparel-fashion-04", "/work/find-my-apparel"], ["cambridge-social-03", "/work/cambridge-electrical"], ["mustcare-vet-centres-social-01", "/work/mustcare-vet-centres"],
  ["elite-food-01", "/work/elite"], ["minhaz-couture-logo-02", "/work/minhaz-couture"], ["north-charge-social-04", "/work/north-charge"], ["chefiality-food-24", "/work/chefiality"],
];
const CLIENTS: [string, string][] = [
  ["QWENCH Juice", "/work/qwench-juice-bar"], ["Everest Snacks", "/work/everest-snacks"], ["MeezoTech", "/work/meezotech"], ["North Charge", "/work/north-charge"], ["Thermex", "/work/thermex"], ["HUBCO", "/work/hubco"],
  ["Cambridge Electrical", "/work/cambridge-electrical"], ["Minhaz Couture", "/work/minhaz-couture"], ["Pur Health", "/work/pur-health"], ["Elite", "/work/elite"], ["Find My Apparel", "/work/find-my-apparel"], ["Chefiality", "/work/chefiality"], ["NoorShad", "/work/noorshad"], ["Vuse", "/work/vuse"],
];

/** Small drawings for the first two process steps; the others use real work. */
const DiscoverArt = (
  <svg viewBox="0 0 400 150" className="w-full h-auto" role="img" aria-label="A magnifying glass over a chart and three notes">
    <rect x="12" y="20" width="150" height="110" rx="10" fill="#fff" opacity=".95" /><rect x="26" y="96" width="18" height="24" fill="#5A3ED6" /><rect x="52" y="78" width="18" height="42" fill="#0FA593" /><rect x="78" y="58" width="18" height="62" fill="#F5A524" /><rect x="104" y="40" width="18" height="80" fill="#E8463A" />
    <circle cx="260" cy="70" r="40" fill="none" stroke="#fff" strokeWidth="8" /><path d="M290 100 L326 134" stroke="#fff" strokeWidth="10" strokeLinecap="round" />
    <rect x="332" y="20" width="56" height="22" rx="6" fill="#fff" opacity=".9" /><rect x="344" y="52" width="44" height="22" rx="6" fill="#fff" opacity=".7" /><rect x="326" y="84" width="62" height="22" rx="6" fill="#fff" opacity=".5" />
  </svg>
);
const StrategyArt = (
  <svg viewBox="0 0 400 150" className="w-full h-auto" role="img" aria-label="A roadmap of connected steps rising to a goal">
    <path d="M20 120 H120 C150 120 150 80 180 80 H230 C260 80 260 40 290 40 H370" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeDasharray="2 12" />
    {[[20, 120], [120, 120], [200, 80], [290, 40]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="11" fill="#fff" />)}
    <circle cx="370" cy="40" r="16" fill="#F5A524" /><path d="M362 40 l6 6 11 -13" fill="none" stroke="#111" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const workShot = (src: string, alt: string, w: number, h: number) => <Image unoptimized src={src} alt={alt} width={w} height={h} className="w-full h-auto rounded-lg" />;
const PROCESS_VISUALS = [
  DiscoverArt,
  StrategyArt,
  workShot("/images/services-v2/everest-snacks.webp", "Everest Snacks website home page", 1440, 810),
  workShot("/images/services-v2/qwench.webp", "QWENCH Juice reel, still from the case study video", 640, 1138),
  workShot("/images/work/inspection-management-platform/dashboard.webp", "Inspection platform dashboard with key figures and a tonnage chart", 1200, 750),
  workShot("/images/home-v16/meezotech.webp", "MeezoTech brand identity board", 900, 506),
];

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = (["en", "ar", "ur"].includes(lang) ? lang : "en") as "en" | "ar" | "ur";
  const l = (path: string) => `/${locale}${path}`;
  const t = await getDictionary(locale);
  const posts = await getPublishedPosts(3);

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://themarkitmedia.com/#organization",
    name: "Markit Media",
    url: "https://themarkitmedia.com",
    logo: { "@type": "ImageObject", url: "https://themarkitmedia.com/icon-512.png", width: 512, height: 512 },
    description: "Full-stack digital marketing agency serving businesses across the USA, Canada, UAE, UK, Australia, and Saudi Arabia.",
    email: "ciao@themarkitmedia.com",
    telephone: "+92-300-208-6081",
    foundingDate: "2020",
    address: { "@type": "PostalAddress", addressLocality: "Karachi", addressCountry: "PK" },
    contactPoint: [
      { "@type": "ContactPoint", telephone: "+92-300-208-6081", contactType: "sales", availableLanguage: ["English", "Urdu", "Arabic"] },
      { "@type": "ContactPoint", telephone: "+1-606-517-7561", contactType: "sales", areaServed: "US", availableLanguage: ["English"] },
    ],
    sameAs: SOCIAL_URLS,
    areaServed: markets.map((m) => ({ "@type": "Country", name: m.name })),
    knowsAbout: ["Search Engine Optimization", "Pay-Per-Click Advertising", "Social Media Marketing", "Website Development", "Branding", "Video Production", "Email Marketing", "Content Marketing", "AI Marketing Automation", "E-Commerce Marketing"],
    numberOfEmployees: { "@type": "QuantitativeValue", minValue: 10, maxValue: 50 },
  };
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://themarkitmedia.com/#website",
    name: "Markit Media",
    url: "https://themarkitmedia.com",
    publisher: { "@id": "https://themarkitmedia.com/#organization" },
    potentialAction: { "@type": "SearchAction", target: { "@type": "EntryPoint", urlTemplate: "https://themarkitmedia.com/en/blog?q={search_term_string}" }, "query-input": "required name=search_term_string" },
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })),
  };
  const steps: ProcessStep[] = V16_PROCESS.map((s, i) => ({ ...s, visual: PROCESS_VISUALS[i] }));
  const platformItems: PlatformItem[] = [...PLATFORM_GROUPS.flatMap((g) => g.items), { label: "Klaviyo", href: "/services/email-marketing", brand: "Klaviyo" }];
  const half = Math.ceil(platformItems.length / 2);
  const rails = [platformItems.slice(0, half), platformItems.slice(half)];
  const pill = (p: PlatformItem, hidden: boolean) => (
    <Link key={p.label + (hidden ? "-b" : "")} href={l(p.href)} {...(hidden ? { tabIndex: -1, "aria-hidden": true } : {})} className="group/p flex shrink-0 items-center gap-3 rounded-full border border-white/15 bg-white/[.07] py-2.5 pl-3 pr-5 text-white transition-[background-color,transform] duration-300 motion-reduce:transition-none hover:bg-white hover:text-black motion-safe:hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-white">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white"><Logo p={p} size="h-6 w-6" /></span>
      <span className="font-bold text-sm whitespace-nowrap">{p.label}</span>
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs opacity-0 transition-all duration-300 motion-reduce:transition-none group-hover/p:max-w-[9rem] group-hover/p:opacity-100 group-focus-visible/p:max-w-[9rem] group-focus-visible/p:opacity-100">Specialist service →</span>
    </Link>
  );
  const clientPill = (c: [string, string], hidden: boolean) => (
    <Link key={c[0] + hidden} href={l(c[1])} {...(hidden ? { tabIndex: -1, "aria-hidden": true } : {})} className={`${D} shrink-0 px-5 py-2 text-2xl lg:text-3xl font-extrabold tracking-tight text-black/80 hover:text-[#5A3ED6] transition-colors motion-reduce:transition-none`}>{c[0]}</Link>
  );

  return (
    <article>
      <JsonLd data={orgSchema} />
      <JsonLd data={websiteSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={videoObjectSchema(QWENCH_VIDEO)} />

      {/* 1. HERO */}
      <section className="relative bg-black text-white overflow-hidden pt-20" aria-label="Hero">
        <div className="hm-glow pointer-events-none absolute -top-40 right-[-10%] h-[560px] w-[560px] rounded-full bg-[#5A3ED6]/45 blur-[130px]" aria-hidden="true" />
        <div className="hm-glow-b pointer-events-none absolute -bottom-48 left-[-8%] h-[460px] w-[460px] rounded-full bg-[#0FA593]/30 blur-[130px]" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-14 sm:py-20 lg:py-24 grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center">
          <div>
            <Animate animation="fade-up">
              <span className="inline-block text-sm font-bold text-white/45 uppercase tracking-[0.25em] mb-5">Full-Stack Digital Agency</span>
              <h1 className={`${D} text-[clamp(2.5rem,5.8vw,4.5rem)] font-extrabold tracking-tight leading-[1.04]`}>{t.home.heroTitle}</h1>
            </Animate>
            <Animate animation="fade-up" delay={120}>
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mt-6 max-w-xl">{t.home.heroSubtitle}</p>
              <p className="mt-4 text-white/60 font-medium">See what we&apos;ve built for brands like yours.</p>
            </Animate>
            <Animate animation="fade-up" delay={220}>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link href="#quote" className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 font-bold hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">Request a Quote &rarr;</Link>
                <Link href={l("/work")} className="inline-flex items-center gap-3 border border-white/30 px-8 py-4 font-bold hover:bg-white hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">View Our Work</Link>
              </div>
              <dl className="mt-10 grid grid-cols-3 gap-6 pt-8 border-t border-white/10 max-w-md">
                {[["100+", "Clients Served"], ["6", "Countries"], ["12+", "Capabilities"]].map(([v, k]) => (
                  <div key={k}><dt className="sr-only">{k}</dt><dd className={`${D} text-2xl sm:text-3xl font-extrabold`}>{v}</dd><p className="mt-1 text-xs text-white/45">{k}</p></div>
                ))}
              </dl>
            </Animate>
          </div>
          <div className="max-w-[560px] w-full mx-auto lg:mx-0 lg:justify-self-end"><HeroSlider slides={SLIDES.map((s) => ({ ...s, href: s.href.replace("/en/", `/${locale}/`) }))} /></div>
        </div>
        <nav aria-label="Everything we do" className="relative border-t border-white/10">
          <ul className="flex gap-x-9 overflow-x-auto px-6 lg:px-12 py-3 max-w-7xl mx-auto whitespace-nowrap [scrollbar-width:none] snap-x">
            {FAMILY_STRIP.map(([n, h]) => <li key={h} className="snap-start"><Link href={l(h)} className="inline-flex items-center min-h-11 text-sm font-semibold text-white/60 hover:text-white focus-visible:outline-2 focus-visible:outline-white">{n}</Link></li>)}
          </ul>
        </nav>
      </section>

      {/* 2. WHAT WE DO */}
      <section className={`${PAD} py-20 md:py-28 bg-white`} aria-labelledby="what-we-do">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <Eyebrow>What we do</Eyebrow>
            <h2 id="what-we-do" className={`${D} text-[clamp(1.9rem,4.4vw,3.4rem)] font-extrabold tracking-tight leading-[1.05] mt-3 max-w-3xl`}>Eight ways we grow a business, from one team.</h2>
          </Animate>
          <div className="mt-12 grid md:grid-cols-12 gap-4 md:auto-rows-[minmax(250px,auto)]">
            {GROUPS.map((g, i) => {
              const s = svc(g.slug);
              return (
                <Animate key={g.slug} animation="fade-up" delay={(i % 4) * 70} className={g.span}>
                  <Link href={l(s.href)} className="group/g flex h-full min-h-[300px] flex-col overflow-hidden rounded-2xl shadow-sm transition-[transform,box-shadow] duration-500 motion-reduce:transition-none motion-safe:hover:-translate-y-1.5 hover:shadow-2xl focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2" style={{ background: g.c }}>
                    <span className="relative block flex-1 min-h-[170px] overflow-hidden [&_img]:transition-transform [&_img]:duration-[900ms] motion-safe:group-hover/g:[&_img]:scale-[1.06] bg-[#f5f5f3]">{g.img}</span>
                    <span className="block p-5 text-white">
                      <span className={`${D} flex items-center justify-between gap-3 text-xl font-extrabold leading-tight`}>{s.title}<ArrowUpRight size={18} className="shrink-0 transition-transform duration-300 motion-reduce:transition-none group-hover/g:translate-x-0.5 group-hover/g:-translate-y-0.5" aria-hidden="true" /></span>
                      <span className="mt-1.5 block text-sm text-white/85 leading-snug">{g.line}</span>
                    </span>
                  </Link>
                </Animate>
              );
            })}
          </div>
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8 border-t-2 border-black pt-8">
            {GROUPS.map((g) => (
              <div key={g.slug}>
                <h3 className={`${D} text-base font-extrabold`}><Link href={l(svc(g.slug).href)} className="hover:underline underline-offset-4">{svc(g.slug).title}</Link></h3>
                <ul className="mt-2 flex flex-wrap gap-x-3 list-none p-0" aria-label={`${svc(g.slug).title} specialities`}>
                  {(SUBSERVICES[g.slug] ?? []).slice(0, 6).map(([n, h]) => <li key={h}><Link href={l(h)} className="inline-flex items-center min-h-8 text-[13px] text-gray-600 underline decoration-gray-300 underline-offset-4 hover:text-black hover:decoration-black">{n}</Link></li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href={l("/services")} className="inline-flex items-center gap-2 bg-black text-white px-7 py-3.5 font-bold min-h-12 hover:bg-[#5A3ED6] transition-colors motion-reduce:transition-none">All 25 services <Arrow /></Link>
            <Link href={l("/services/finder")} className="inline-flex items-center border border-gray-300 px-7 py-3.5 font-bold min-h-12 hover:border-black transition-colors motion-reduce:transition-none">Not sure? Use the finder</Link>
          </div>
        </div>
      </section>

      {/* 3. PLATFORMS */}
      <section className="relative overflow-hidden bg-[#0b0a1a] text-white py-20 md:py-28" aria-labelledby="platforms">
        <div className={`${PAD}`}>
          <div className="max-w-7xl mx-auto">
            <Eyebrow dark>Platforms we work inside</Eyebrow>
            <h2 id="platforms" className={`${D} text-[clamp(1.9rem,4.4vw,3.4rem)] font-extrabold tracking-tight leading-[1.05] mt-3 max-w-4xl`}>We don&apos;t just talk strategy. We work inside the platforms.</h2>
            <p className="text-lg text-white/70 mt-4 max-w-2xl">Hover a logo for its specialist service, or click through to the team that runs it.</p>
          </div>
        </div>
        <div className="mt-12 space-y-3">
          {rails.map((row, ri) => (
            <div key={ri} className="hm-rail" role="group" aria-label={ri === 0 ? "Advertising and web platforms" : "CRM, email and measurement platforms"}>
              <div className={`hm-track ${ri ? "hm-rev" : ""}`} style={{ ["--hm-speed" as string]: ri ? "62s" : "50s" }}>
                {row.map((p) => pill(p, false))}{row.map((p) => pill(p, true))}
              </div>
            </div>
          ))}
        </div>
        <div className={`${PAD} mt-16`}>
          <div className="max-w-7xl mx-auto">
            <h3 className={`${D} text-2xl lg:text-3xl font-extrabold tracking-tight max-w-3xl`}>And what we build and run inside them.</h3>
            <ul className="mt-8 grid md:grid-cols-2 gap-x-14 list-none p-0 border-t border-white/15">
              {BUILD_LAYERS.map((b) => (
                <li key={b.n} className="border-b border-white/15">
                  <Link href={l(b.href)} className="group/b flex items-start gap-5 py-5 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
                    <span className={`${D} text-sm font-extrabold text-white/35 pt-1`}>{b.n}</span>
                    <span className="min-w-0 flex-1"><span className={`${D} block text-xl font-extrabold tracking-tight transition-transform duration-300 motion-reduce:transition-none group-hover/b:translate-x-1`}>{b.title}</span><span className="block text-sm text-white/65 leading-relaxed mt-1">{b.line}</span></span>
                    <ArrowRight size={16} className="mt-2 text-white/30 group-hover/b:text-white" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 4. HOW WE DO IT */}
      <section className={`${PAD} py-20 md:py-28 bg-[#FFF3E6]`} aria-labelledby="process">
        <div className="max-w-7xl mx-auto">
          <Eyebrow>How we do it</Eyebrow>
          <h2 id="process" className={`${D} text-[clamp(1.9rem,4.4vw,3.4rem)] font-extrabold tracking-tight leading-[1.05] mt-3 max-w-3xl`}>Less guesswork. More forward motion.</h2>
          <div className="mt-14"><ProcessStory steps={steps} /></div>
          <Link href={l("/process")} className="inline-flex items-center gap-2 mt-10 font-bold border-b border-black pb-1 min-h-11 text-sm">See our full process <Arrow /></Link>
        </div>
      </section>

      {/* 5. WHAT WE'VE DONE */}
      <section aria-labelledby="work">
        <div className={`${PAD} pt-20 md:pt-28 pb-10 bg-white`}>
          <div className="max-w-7xl mx-auto flex flex-wrap items-end justify-between gap-6">
            <div><Eyebrow>What we&apos;ve done</Eyebrow><h2 id="work" className={`${D} text-[clamp(1.9rem,4.4vw,3.4rem)] font-extrabold tracking-tight leading-[1.05] mt-3`}>Real work for real brands.</h2></div>
            <Link href={l("/work")} className="inline-flex items-center gap-2 font-bold border-b border-black pb-1 min-h-11 text-sm">Explore all work <Arrow /></Link>
          </div>
        </div>
        {/* video feature */}
        <div className={`${PAD} py-16 md:py-24 bg-[#0e0b1f] text-white`}>
          <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.1fr_.9fr] gap-12 lg:gap-20 items-center">
            <Animate animation="fade-up">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#b9a8ff]">Video, social and paid ads</p>
              <h3 className={`${D} text-[clamp(2.2rem,5vw,4rem)] font-extrabold tracking-tight leading-[1.02] mt-3`}>QWENCH Juice</h3>
              <p className="text-gray-300 text-lg leading-relaxed mt-4 max-w-lg">A juice bar&apos;s website, social media, reels and Meta ads, blended into one fresh brand.</p>
              <p className="text-sm text-white/50 mt-3">Website · Social media · Reels · Meta ads</p>
              <Link href={l("/work/qwench-juice-bar")} className="inline-flex items-center gap-2 mt-7 font-bold border-b border-white pb-1 min-h-11">View the case study <Arrow /></Link>
            </Animate>
            <Animate animation="fade-left" className="max-w-[360px] mx-auto w-full">
              <YouTubeEmbed videoId={QWENCH_VIDEO.id} title={QWENCH_VIDEO.title} alt={QWENCH_VIDEO.title} aspect="short" poster={QWENCH_VIDEO.poster} noCookie />
            </Animate>
          </div>
        </div>
        {/* split */}
        <div className={`${PAD} py-16 md:py-24 bg-[#F1EEFF]`}>
          <div className="max-w-7xl mx-auto grid lg:grid-cols-[.8fr_1.2fr] gap-10 lg:gap-16 items-center">
            <Animate animation="fade-up">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#5A3ED6]">Website development</p>
              <h3 className={`${D} text-[clamp(2rem,4.4vw,3.2rem)] font-extrabold tracking-tight leading-[1.04] mt-3`}>Everest Snacks</h3>
              <p className="text-gray-700 text-lg leading-relaxed mt-4 max-w-md">Design and development of an energy bar brand&apos;s website, with the content around it.</p>
              <p className="text-sm text-gray-500 mt-3">5-page website · Blog articles · Social media · Photography</p>
              <Link href={l("/work/everest-snacks")} className="inline-flex items-center gap-2 mt-7 font-bold border-b border-black pb-1 min-h-11">View the case study <Arrow /></Link>
            </Animate>
            <Animate animation="scale-in">
              <Link href={l("/work/everest-snacks")} className="group/e block overflow-hidden rounded-xl bg-white shadow-[0_30px_80px_-20px_rgba(0,0,0,.4)] ring-1 ring-black/10 transition-transform duration-500 motion-reduce:transition-none motion-safe:hover:-translate-y-1.5 focus-visible:outline-2 focus-visible:outline-black">
                <span className="flex gap-1.5 px-3 py-2.5 border-b border-gray-200 bg-gray-100" aria-hidden="true"><i className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" /><i className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" /><i className="h-2.5 w-2.5 rounded-full bg-[#28c840]" /></span>
                <Image unoptimized src="/images/services-v2/everest-snacks.webp" alt="Everest Snacks website home page" width={1440} height={810} className="w-full h-auto transition-transform duration-[900ms] motion-safe:group-hover/e:scale-[1.03]" />
              </Link>
            </Animate>
          </div>
        </div>
        {/* image-led */}
        <div className="relative bg-[#FFB020]">
          <Link href={l("/work/inspection-management-platform")} className="group/i block focus-visible:outline-2 focus-visible:outline-black focus-visible:-outline-offset-4">
            <div className={`${PAD} py-16 md:py-24`}>
              <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.15fr_.85fr] gap-10 lg:gap-16 items-center">
                <Animate animation="scale-in">
                  <span className="block overflow-hidden rounded-xl shadow-[0_30px_80px_-20px_rgba(0,0,0,.5)] ring-1 ring-black/10 transition-transform duration-500 motion-reduce:transition-none motion-safe:group-hover/i:-translate-y-1.5">
                    <Image unoptimized src="/images/work/inspection-management-platform/cover.webp" alt="Inspection platform dashboard with a work queue, key figures and a tonnage chart" width={1440} height={810} className="w-full h-auto transition-transform duration-[900ms] motion-reduce:transition-none motion-safe:group-hover/i:scale-[1.03]" />
                  </span>
                </Animate>
                <div className="text-black">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/60">Software we built</p>
                  <h3 className={`${D} text-[clamp(2rem,4.4vw,3.2rem)] font-extrabold tracking-tight leading-[1.04] mt-3`}>Inspection &amp; lab management platform</h3>
                  <p className="text-lg leading-relaxed mt-4 max-w-md text-black/80">One job record flows from inspector to laboratory to invoice to certificate, with eight roles and an audit trail.</p>
                  <span className="inline-flex items-center gap-2 mt-7 font-bold border-b border-black pb-1 min-h-11">View the case study <Arrow /></span>
                </div>
              </div>
            </div>
          </Link>
        </div>
        {/* duo */}
        <div className={`${PAD} py-16 md:py-24 bg-white`}>
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 lg:gap-12">
            {[
              { n: "MeezoTech", d: "Branding", l: "A red and black identity, logo animation and social posts for a technology company.", h: "/work/meezotech", img: <Image unoptimized src="/images/home-v16/meezotech.webp" alt="MeezoTech brand identity board" width={900} height={506} className="w-full aspect-[16/10] object-cover" /> },
              { n: "North Charge", d: "Social media design", l: "Orange and dark green social posts for an EV charger brand in Canada.", h: "/work/north-charge", img: <Image unoptimized src="/images/home-v16/north-charge.webp" alt="North Charge social post in orange and dark green" width={900} height={900} className="w-full aspect-[16/10] object-cover object-center" /> },
            ].map((c) => (
              <Animate key={c.n} animation="fade-up">
                <Link href={l(c.h)} className="group/c block focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-4">
                  <span className="block overflow-hidden rounded-2xl bg-gray-100 [&_img]:transition-transform [&_img]:duration-[900ms] motion-safe:group-hover/c:[&_img]:scale-[1.05]">{c.img}</span>
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#5A3ED6] mt-4">{c.d}</p>
                  <h3 className={`${D} text-2xl font-extrabold mt-1`}>{c.n}</h3>
                  <p className="text-gray-600 leading-relaxed mt-2 text-sm max-w-md">{c.l}</p>
                  <span className="inline-flex items-center gap-2 mt-3 text-sm font-bold">View the case study <ArrowRight size={14} className="group-hover/c:translate-x-1 transition-transform motion-reduce:transition-none" aria-hidden="true" /></span>
                </Link>
              </Animate>
            ))}
          </div>
          <p className="max-w-7xl mx-auto text-sm text-gray-500 mt-10">Campaign results appear here only once a client has confirmed them.</p>
        </div>
      </section>

      {/* 6. WHY */}
      <section className={`${PAD} py-20 md:py-28 bg-[#06302c] text-white`} aria-labelledby="why">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[.9fr_1.1fr] gap-12 lg:gap-24">
          <div className="lg:sticky lg:top-28 self-start">
            <Eyebrow dark>Why Markit Media</Eyebrow>
            <h2 id="why" className={`${D} text-[clamp(2.2rem,5vw,4rem)] font-extrabold tracking-tight leading-[1.03] mt-3`}>One team. Fewer handoffs. Better decisions.</h2>
            <p className="text-lg text-white/70 leading-relaxed mt-5 max-w-md">Eight things that change when strategy, creative and technology are done by the same people.</p>
            <Link href="#quote" className="inline-flex items-center gap-2 mt-8 bg-[#3EE0C1] text-[#06302c] px-7 py-3.5 font-bold min-h-12 hover:bg-white transition-colors motion-reduce:transition-none">Talk to our team <Arrow /></Link>
          </div>
          <ol className="list-none p-0 divide-y divide-white/15 border-y border-white/15">
            {V16_WHY.map(([h, d], i) => (
              <li key={h}>
                <Animate animation="fade-up">
                  <div className="group/w grid grid-cols-[3.2rem_1fr] gap-x-4 py-6 transition-colors hover:bg-white/5 motion-reduce:transition-none">
                    <span className={`${D} text-3xl font-extrabold text-[#3EE0C1]`} aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                    <div><h3 className={`${D} text-xl font-extrabold tracking-tight`}><span className="sr-only">{i + 1}. </span>{h}</h3><p className="text-white/70 leading-relaxed mt-1.5 max-w-lg">{d}</p></div>
                  </div>
                </Animate>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 7. SOCIAL PROOF */}
      <section className="bg-white py-16 md:py-24 overflow-hidden" aria-labelledby="proof">
        <div className={PAD}>
          <div className="max-w-7xl mx-auto">
            <Eyebrow>Who trusts us</Eyebrow>
            <h2 id="proof" className={`${D} sr-only`}>Clients and proof</h2>
            <dl className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-8">
              {[[100, "+", "clients served"], [6, "", "countries"], [25, "", "services"], [155, "+", "free marketing tools"]].map(([n, s, k], i) => (
                <div key={String(k)} className="border-t-4 pt-4" style={{ borderColor: ["#5A3ED6", "#0FA593", "#F5A524", "#E8463A"][i] }}>
                  <dd className={`${D} text-5xl lg:text-7xl font-extrabold tracking-tight`}><Counter to={n as number} suffix={s as string} /></dd>
                  <dt className="text-sm text-gray-600 mt-1">{k}</dt>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <div className="mt-12 hm-rail" role="group" aria-label="Clients we have worked with">
          <div className="hm-track" style={{ ["--hm-speed" as string]: "60s" }}>{CLIENTS.map((c) => clientPill(c, false))}{CLIENTS.map((c) => clientPill(c, true))}</div>
        </div>
        <div className="mt-8 hm-rail" role="group" aria-label="Creative we designed">
          <div className="hm-track hm-rev" style={{ ["--hm-speed" as string]: "75s" }}>
            {[false, true].flatMap((hid) => CASE_THUMBS.map(([id, h]) => (
              <Link key={id + hid} href={l(h)} {...(hid ? { tabIndex: -1, "aria-hidden": true } : {})} className="group/t block h-40 w-40 shrink-0 overflow-hidden rounded-xl bg-gray-100 transition-transform duration-300 motion-reduce:transition-none motion-safe:hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-black">
                <P id={id} sizes="160px" w={480} className="h-full w-full transition-transform duration-700 motion-safe:group-hover/t:scale-110" />
              </Link>
            )))}
          </div>
        </div>
      </section>

      {/* 8. FREE TOOLS */}
      <section className={`${PAD} py-14 md:py-20 bg-[#F1EEFF]`} aria-labelledby="tools">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[.9fr_1.1fr] gap-10 lg:gap-16 items-center">
          <div>
            <Eyebrow>Free tools</Eyebrow>
            <h2 id="tools" className={`${D} text-[clamp(1.9rem,4.2vw,3rem)] font-extrabold tracking-tight leading-[1.05] mt-3`}>Built to be useful before you ever hire us.</h2>
            <Link href={l("/free-tools")} className="inline-flex items-center gap-2 mt-7 bg-black text-white px-7 py-3.5 font-bold min-h-12 hover:bg-[#5A3ED6] transition-colors motion-reduce:transition-none">Explore 155+ Free Marketing Tools <Arrow /></Link>
          </div>
          <ul className="list-none p-0 grid sm:grid-cols-3 gap-4">
            {V16_TOOLS.map(([n, d, h, c]) => (
              <li key={h}><Link href={l(h)} className="group/f flex h-full flex-col rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 transition-[transform,box-shadow] duration-300 motion-reduce:transition-none motion-safe:hover:-translate-y-1.5 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-black">
                <span className="h-1.5 w-12 rounded-full" style={{ background: c }} aria-hidden="true" />
                <span className={`${D} text-lg font-extrabold mt-4`}>{n}</span>
                <span className="text-sm text-gray-600 leading-relaxed mt-2 flex-1">{d}</span>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold">Try it <ArrowRight size={14} className="group-hover/f:translate-x-1 transition-transform motion-reduce:transition-none" aria-hidden="true" /></span>
              </Link></li>
            ))}
          </ul>
        </div>
      </section>

      {/* 9. INDUSTRIES + MARKETS */}
      <section className={`${PAD} py-16 md:py-24 bg-white`} aria-labelledby="where">
        <div className="max-w-7xl mx-auto">
          <Eyebrow>Where we work</Eyebrow>
          <h2 id="where" className={`${D} text-[clamp(1.9rem,4.2vw,3rem)] font-extrabold tracking-tight leading-[1.05] mt-3 max-w-3xl`}>Built across industries. Working across markets.</h2>
          <div className="mt-10 grid lg:grid-cols-[1.4fr_.6fr] gap-12 lg:gap-20">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-gray-500">Industries</h3>
              <ul className="mt-4 flex flex-wrap gap-2 list-none p-0">
                {industries.map(([n, h, f]) => <li key={h}><Link href={l(h)} className={`inline-flex items-center min-h-11 rounded-full border px-4 text-sm font-semibold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black ${f ? "border-[#5A3ED6] bg-[#5A3ED6] text-white hover:bg-black hover:border-black" : "border-gray-300 hover:bg-black hover:text-white hover:border-black"}`}>{n}</Link></li>)}
              </ul>
              <Link href={l("/industries")} className="inline-flex items-center gap-2 mt-6 font-bold border-b border-black pb-1 min-h-11 text-sm">All industries <Arrow /></Link>
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-gray-500">Markets</h3>
              <ul className="mt-4 list-none p-0">
                {markets.map((m) => <li key={m.href}><Link href={l(m.href)} className="group/m flex items-center gap-3 min-h-12 border-b border-gray-200 text-sm font-semibold hover:border-black transition-colors motion-reduce:transition-none"><span aria-hidden="true" className="text-xl leading-none">{m.flag}</span><span className="flex-1">{m.name}</span><ArrowRight size={13} className="text-gray-300 group-hover/m:text-black" aria-hidden="true" /></Link></li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 10. QUOTE */}
      <section id="quote" className="relative overflow-hidden scroll-mt-20 bg-[#0b0a1a] text-white py-20 md:py-28" aria-labelledby="quote-h">
        <div className="hm-glow pointer-events-none absolute -top-32 -left-24 h-[480px] w-[480px] rounded-full bg-[#5A3ED6]/50 blur-[120px]" aria-hidden="true" />
        <div className="hm-glow-b pointer-events-none absolute -bottom-40 right-[-6%] h-[420px] w-[420px] rounded-full bg-[#0FA593]/35 blur-[120px]" aria-hidden="true" />
        <div className={`${PAD} relative`}>
          <div className="max-w-7xl mx-auto grid lg:grid-cols-[.9fr_1.1fr] gap-12 lg:gap-16 items-start">
            <div>
              <Eyebrow dark>Talk to us</Eyebrow>
              <h2 id="quote-h" className={`${D} text-[clamp(2.2rem,5vw,3.8rem)] font-extrabold tracking-tight leading-[1.03] mt-3`}>Tell us what you&apos;re building.</h2>
              <p className="text-lg text-white/75 leading-relaxed mt-5 max-w-md">Share the goal, the market and a budget range. We reply by email or WhatsApp with a practical starting scope, not a prebuilt package.</p>
              <Animate animation="scale-in">
                <Link href={l("/work/everest-snacks")} className="group/q hidden lg:block mt-10 max-w-md overflow-hidden rounded-xl ring-1 ring-white/15 shadow-2xl transition-transform duration-500 motion-reduce:transition-none motion-safe:hover:-translate-y-1.5 focus-visible:outline-2 focus-visible:outline-white">
                  <Image unoptimized src="/images/services-v2/everest-snacks.webp" alt="Everest Snacks website home page" width={1440} height={810} className="w-full h-auto transition-transform duration-[900ms] motion-reduce:transition-none motion-safe:group-hover/q:scale-[1.04]" />
                </Link>
              </Animate>
              <ul className="mt-8 space-y-1 list-none p-0 text-sm font-semibold">
                <li><a href="mailto:ciao@themarkitmedia.com" className="inline-flex items-center min-h-11 underline underline-offset-4">ciao@themarkitmedia.com</a></li>
                <li><a href="https://wa.me/923002086081" target="_blank" rel="noopener noreferrer" className="inline-flex items-center min-h-11 underline underline-offset-4">WhatsApp us</a></li>
              </ul>
            </div>
            <div className="rounded-2xl bg-white text-black p-6 lg:p-10 shadow-2xl"><HomeQuoteForm /></div>
          </div>
        </div>
      </section>

      {/* 11. INSIGHTS */}
      <section className={`${PAD} py-16 md:py-24 bg-white`} aria-labelledby="insights">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div><Eyebrow>Keep learning</Eyebrow><h2 id="insights" className={`${D} text-[clamp(1.75rem,4vw,2.6rem)] font-extrabold tracking-tight mt-3`}>Latest from the blog</h2></div>
            <Link href={l("/blog")} className="inline-flex items-center gap-2 font-bold border-b border-black pb-1 min-h-11 text-sm">All articles <Arrow /></Link>
          </div>
          {posts.length > 0 && (
            <div className="mt-10 grid lg:grid-cols-[1.3fr_1fr] gap-8 lg:gap-14">
              <Link href={l(`/blog/${posts[0].slug}`)} className="group/a flex flex-col justify-between rounded-3xl bg-gradient-to-br from-[#5A3ED6] to-[#2a1a6b] p-8 lg:p-10 text-white min-h-[320px] transition-transform duration-500 motion-reduce:transition-none motion-safe:hover:-translate-y-1.5 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                <span className="text-xs font-bold uppercase tracking-wide text-white/70">{posts[0].category}{posts[0].reading_time ? ` · ${posts[0].reading_time} min read` : ""}</span>
                <span><span className={`${D} block text-[clamp(1.6rem,3vw,2.4rem)] font-extrabold leading-tight tracking-tight group-hover/a:underline underline-offset-4`}>{posts[0].title}</span><span className="mt-3 block text-white/80 leading-relaxed line-clamp-3 max-w-xl">{posts[0].excerpt}</span></span>
              </Link>
              <ul className="list-none p-0 flex flex-col gap-6">
                {posts.slice(1).map((p) => (
                  <li key={p.slug} className="flex-1 border-t-2 border-black pt-5">
                    <Link href={l(`/blog/${p.slug}`)} className="group/a block focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-4">
                      <span className="text-xs font-bold uppercase tracking-wide text-gray-500">{p.category}{p.reading_time ? ` · ${p.reading_time} min read` : ""}</span>
                      <span className={`${D} block text-xl font-extrabold leading-snug mt-2 group-hover/a:underline underline-offset-4`}>{p.title}</span>
                      <span className="block text-sm text-gray-600 leading-relaxed mt-2 line-clamp-2">{p.excerpt}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* FAQ (kept from the previous homepage: matches the FAQ markup) */}
      <section className={`${PAD} py-14 md:py-20 bg-gray-50`} aria-labelledby="faq">
        <div className="max-w-3xl mx-auto">
          <Eyebrow>{t.home.faqSubtitle}</Eyebrow>
          <h2 id="faq" className={`${D} text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight mt-3`}>{t.home.faqTitle}</h2>
          <div className="mt-8 border-t border-gray-300">
            {faqItems.map((item) => (
              <details key={item.q} className="group border-b border-gray-300">
                <summary className="flex justify-between items-center gap-5 py-5 cursor-pointer text-base font-bold list-none hover:text-[#5A3ED6] transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                  {item.q}<span className="text-xl text-gray-500 group-open:rotate-45 transition-transform motion-reduce:transition-none shrink-0" aria-hidden="true">+</span>
                </summary>
                <div className="pb-5 text-gray-600 leading-relaxed">{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 12. FINAL CTA */}
      <section className={`${PAD} py-20 md:py-24 bg-gradient-to-br from-[#2a1a6b] via-[#5A3ED6] to-[#0FA593] text-white text-center`} aria-label="Get started">
        <div className="max-w-3xl mx-auto">
          <h2 className={`${D} text-[clamp(2rem,5vw,3.8rem)] font-extrabold tracking-tight leading-[1.05]`}>Ready to build what&apos;s next?</h2>
          <Link href="#quote" className="inline-flex items-center gap-2 mt-8 bg-white text-black px-8 py-4 font-bold hover:-translate-y-0.5 transition-transform motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">Request a Quote <Arrow /></Link>
        </div>
      </section>
    </article>
  );
}
