import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CaseStudyCover, PortfolioFill } from "@/components/portfolio/cover-images";
import { CATEGORY_COVER } from "@/lib/covers";
import { galleryItems } from "@/lib/portfolio";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { ClientDirectorySection } from "@/components/portfolio/portfolio-sections";
import { CaseStudiesByIndustry } from "@/components/case-study-extras";
import { getCaseStudy, hubCounts, hubGraph, hubMetadata, serviceName } from "@/lib/case-studies";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return hubMetadata("case-studies", lang);
}

const studies = [
  {client:"MeezoTech",industry:"Technology",service:"Branding & Motion",desc:"Technology brand identity work brought to life through logo animation and motion design.",href:"/work/meezotech",image:"/images/work/branding-design.svg"},
  {client:"NoorShad",industry:"Real Estate",service:"Video Production & Content",desc:"Property tours, testimonials and home-buying content delivered as a multi-video production engagement.",href:"/work/noorshad",image:"/images/work/video-production.svg"},
  {client:"Vuse",industry:"Consumer Goods",service:"Social Media & Video",desc:"Ongoing social content production combining short-form creative and video execution.",href:"/work/vuse",image:"/images/work/social-media.svg"},
  {client:"Cambridge Electrical Appliances",industry:"Consumer Electronics",service:"Social Media Campaigns",desc:"Seasonal social campaigns and product-focused creative for summer and winter ranges.",href:"/work/cambridge-electrical",image:"/images/work/social-media.svg"},
  {client:"Minhaz Couture",industry:"Fashion",service:"Web Development & Social",desc:"A connected digital engagement combining website development with social media content.",href:"/work/minhaz-couture",image:"/images/portfolio/fashion-feed-hero.jpg"},
  {client:"HUBCO",industry:"Energy",service:"Branding & Video",desc:"Professional logo animation and commercial video production for an energy-sector brand.",href:"/work/hubco",image:"/images/work/branding-design.svg"},
  {client:"One Homes",industry:"Real Estate",service:"Video Production",desc:"Cinematic property walkthrough creative for the premium Amaya Residences development.",href:"/work/one-homes",image:"/images/work/video-production.svg"},
  {client:"Elite",industry:"Digital Presence",service:"Web Development & Social",desc:"Website development and social media content delivered as a cohesive digital package.",href:"/work/elite",image:"/images/work/website-development.svg"},
  {client:"Pur Health",industry:"Healthcare",service:"Web Development & Social",desc:"Website and social media work supporting a professional healthcare and wellness presence.",href:"/work/pur-health",image:"/images/work/website-development.svg"},
  {client:"American Auto Parts",industry:"Automotive",service:"Video Production",desc:"A long-running creative relationship producing professional video content for the automotive aftermarket.",href:"/work/american-auto-parts",image:"/images/work/video-production.svg"},
  {client:"Everest Snacks",industry:"Food & Beverage",service:"Web, Social & Visuals",desc:"A five-page website for an energy bar brand, with blog articles, social media, photography, AI photo enhancement and animation.",href:"/work/everest-snacks",image:"/images/work/everest-snacks/cover.webp"},
];

const creative = [
 {title:"Fashion Feed",category:"Fashion & E-commerce",href:"/work/fashion-feed",image:CATEGORY_COVER.fashion},
 {title:"Social Media Designs",category:"Social Media Creative",href:"/work/social-media-designs",image:CATEGORY_COVER.social},
 {title:"FoodFolio",category:"Food & Beverage",href:"/work/foodfolio",image:CATEGORY_COVER.food},
 {title:"LogoFolio",category:"Logo design & animation",href:"/work/logo-folio",image:CATEGORY_COVER.logo},
 {title:"Branding & Visual Identity",category:"Identity boards",href:"/work/branding-visual-identity",image:galleryItems("branding")[0]?.id ?? CATEGORY_COVER.logo},
];

export default async function CaseStudiesPage({ params }: { params: Promise<{ lang: string }> }){
 const { lang } = await params;
 const locale = (["en", "ar", "ur"].includes(lang) ? lang : "en") as "en" | "ar" | "ur";
 const l = (path: string) => `/${locale}${path}`;

 const counts = hubCounts();
 return <article>
  <JsonLd data={hubGraph(locale)}/><Breadcrumb locale={locale} emitSchema={false} items={[{label:"Home",href:"/"},{label:"Work",href:"/work"},{label:"Case Studies"}]}/>
  <section className="px-6 lg:px-12 pt-24 pb-16"><div className="max-w-5xl mx-auto"><Animate animation="fade-up">
   <SectionLabel>Case Studies + Work</SectionLabel><h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold tracking-tight leading-[1.1] mt-3">Marketing Case Studies: Branding, Social Media, Video and Websites</h1>
   <SectionDesc>If you run a restaurant, a clinic, a real estate business, a shop or a technology company, start here. These are the brands we have designed logos, social media, video and websites for, in the USA and Pakistan, each with its own page showing what we made and why. Use the filters to find work in your industry or your city. Our <Link href={l("/work")} className="underline underline-offset-2 hover:text-black">portfolio page</Link> is the visual gallery; this page is the written record. Where we do not have public performance numbers, we describe the work without inventing results.</SectionDesc>
   <div className="flex flex-wrap gap-3 mt-7"><Link href={l("/work")} className="bg-black text-white px-6 py-3 font-bold">Browse Full Portfolio →</Link><Link href={l("/services")} className="border border-gray-300 px-6 py-3 font-bold">Explore Services →</Link></div>
  </Animate></div></section>
  <section className="px-6 lg:px-12 pb-12" aria-label="Case studies at a glance"><div className="max-w-5xl mx-auto"><dl className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
   {[[String(counts.brands),"client brands"],[String(counts.featured),"featured projects"],["USA + Pakistan","where our verified clients are based"],[String(counts.inhouse),"in-house brands, shown separately"]].map(x=><div key={x[1]} className="border border-gray-200 p-5"><dt className="sr-only">{x[1]}</dt><dd className="font-[family-name:var(--font-display)] text-2xl font-extrabold">{x[0]}</dd><dd className="text-sm text-gray-600 mt-1">{x[1]}</dd></div>)}
  </dl></div></section>
  <section className="px-6 lg:px-12 py-20 bg-gray-50" aria-label="Selected client case studies"><div className="max-w-7xl mx-auto">
   <Animate animation="fade-up"><SectionLabel>Selected Client Work</SectionLabel><SectionTitle>Projects Connected to the Portfolio</SectionTitle><SectionDesc>Every card below opens the corresponding project page, so the case-study collection and portfolio stay connected rather than becoming two separate libraries.</SectionDesc></Animate>
   <Stagger stagger={60} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">{studies.map(s=><Link key={s.href} href={l(s.href)} className="group bg-white border border-gray-200 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all">
    <CaseStudyCover k={s.href.split("/").pop()} />
    <div className="p-6"><div className="flex gap-2 flex-wrap text-xs font-bold uppercase tracking-wide text-gray-600"><span>{getCaseStudy(s.href.split("/").pop()!)?.industryLabel || s.industry}</span>{getCaseStudy(s.href.split("/").pop()!)?.locationVerified && <><span>•</span><span>{getCaseStudy(s.href.split("/").pop()!)?.location}</span></>}<span>•</span><span>{(getCaseStudy(s.href.split("/").pop()!)?.serviceLinks ?? []).slice(0,2).map(serviceName).join(", ") || s.service}</span></div><h2 className="font-extrabold text-xl mt-3 group-hover:underline">{s.client}</h2><p className="text-gray-500 mt-3 leading-relaxed">{s.desc}</p><span className="font-bold inline-block mt-5">View project details →</span></div>
   </Link>)}</Stagger>
  </div></section>
  <section className="px-6 lg:px-12 py-14 bg-black text-white text-center" aria-label="Get a quote"><div className="max-w-3xl mx-auto"><h2 className="text-2xl md:text-3xl font-extrabold">Want results like these?</h2><p className="text-gray-300 mt-3">Tell us what you need and we will point you to the closest relevant work.</p><Link href={l("/get-a-quote")} className="inline-block bg-white text-black px-8 py-4 font-bold mt-6">Get a quote →</Link></div></section>
  <ClientDirectorySection locale={locale}/>
  <CaseStudiesByIndustry locale={locale}/>
  <section className="px-6 lg:px-12 py-20" aria-label="Creative portfolio"><div className="max-w-7xl mx-auto">
   <Animate animation="fade-up"><SectionLabel>Creative Portfolio</SectionLabel><SectionTitle>More Visual Work</SectionTitle><SectionDesc>Design-led collections complement the client project stories above and connect directly to the wider Work library.</SectionDesc></Animate>
   <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5 mt-10">{creative.map(x=><Link key={x.href} href={l(x.href)} className="group border border-gray-200 overflow-hidden"><div className="relative aspect-[4/3]"><PortfolioFill id={x.image} alt={`${x.title} — ${x.category} portfolio`} sizes="(max-width:640px) 100vw,25vw" className=" group-hover:scale-[1.02] transition-transform"/></div><div className="p-5"><span className="text-xs uppercase tracking-wide text-gray-500">{x.category}</span><h3 className="font-extrabold mt-2 group-hover:underline">{x.title}</h3></div></Link>)}</div>
  </div></section>
  <section className="px-6 lg:px-12 py-16 bg-gray-50"><div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
   {[["Find work by service","Start with a service page to see relevant projects, supporting expertise and related reading.","/services"],["Browse every project","Use the Work page for the complete visual portfolio and individual project pages.","/work"],["Find work by industry","Explore industry pages when sector relevance matters more than the delivery channel.","/industries"]].map(x=><Link key={x[2]} href={l(x[2])} className="bg-white border border-gray-200 p-6 hover:border-black"><h3 className="font-extrabold">{x[0]}</h3><p className="text-sm text-gray-500 mt-2">{x[1]}</p><span className="font-bold text-sm mt-5 inline-block">Explore →</span></Link>)}
  </div></section>
  <section className="px-6 lg:px-12 py-20 bg-black text-white text-center"><div className="max-w-3xl mx-auto"><h2 className="text-3xl font-extrabold">Looking for work relevant to your project?</h2><p className="text-gray-400 mt-4">Tell us the service, industry and objective. We can point you to the closest relevant work and discuss the right delivery approach.</p><Link href={l("/get-a-quote")} className="inline-block bg-white text-black px-8 py-4 font-bold mt-7">Discuss Your Project →</Link></div></section>
 </article>
}