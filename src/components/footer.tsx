import Link from "next/link";
import Image from "next/image";
import { Mail, MessageCircle, Phone, ArrowUpRight } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/social";

interface FooterTranslations {
  footer: Record<string, string>;
  nav: Record<string, string>;
  common: Record<string, string>;
  cta: Record<string, string>;
  accessibility: Record<string, string>;
}

const SOCIAL_BRANDS: Record<string,{bg:string;logo:string}> = {
  YouTube:{bg:"bg-[#FF0000]",logo:"https://cdn.simpleicons.org/youtube/FFFFFF"},
  Instagram:{bg:"bg-[#E4405F]",logo:"https://cdn.simpleicons.org/instagram/FFFFFF"},
  LinkedIn:{bg:"bg-[#0A66C2]",logo:"/brand/linkedin.svg"},
  Facebook:{bg:"bg-[#1877F2]",logo:"https://cdn.simpleicons.org/facebook/FFFFFF"},
  Behance:{bg:"bg-[#1769FF]",logo:"https://cdn.simpleicons.org/behance/FFFFFF"},
  TikTok:{bg:"bg-white",logo:"https://cdn.simpleicons.org/tiktok/000000"},
};

function LinkGroup({title,links}:{title:string;links:{label:string;href:string}[]}) {
  return <div>
    <h3 className="text-xs font-bold uppercase tracking-[.16em] text-white/50 mb-4">{title}</h3>
    <ul className="space-y-2.5">{links.map(x=><li key={x.href}><Link href={x.href} className="text-sm text-gray-300 hover:text-white transition-colors">{x.label}</Link></li>)}</ul>
  </div>;
}

export function Footer({ translations:t }: { locale:string; translations:FooterTranslations }) {
  const services=[
    {label:"Performance Marketing",href:"/services/performance-marketing"},{label:"SEO",href:"/services/seo"},
    {label:"Social Media",href:"/services/social-media"},{label:"Website Development",href:"/services/website-development"},
    {label:"Branding",href:"/services/branding"},{label:"Video Production",href:"/services/video-production"},
    {label:"BPO Services",href:"/services/bpo"},{label:"All Services",href:"/services"},
  ];
  const expertise=[
    {label:"Google Ads",href:"/services/performance-marketing/google-ads"},{label:"Meta Ads",href:"/services/performance-marketing/meta-ads"},
    {label:"Local SEO",href:"/services/seo/local-seo"},{label:"AI SEO",href:"/services/seo/ai-seo"},
    {label:"Shopify Development",href:"/services/website-development/shopify"},{label:"Appointment Setting",href:"/services/bpo/appointment-setting"},
    {label:"Exterior Cleaning",href:"/industries/exterior-cleaning"},{label:"Rehab & Recovery",href:"/industries/rehab-recovery"},
  ];
  const company=[
    {label:"About",href:"/about"},{label:"Our Work",href:"/work"},{label:"Case Studies",href:"/case-studies"},
    {label:"Industries",href:"/industries"},{label:"Pricing",href:"/pricing"},{label:"Contact",href:"/contact"},
  ];
  const explore=[
    {label:"Blog & Insights",href:"/blog"},{label:"Free Marketing Tools",href:"/resources"},{label:"FAQ",href:"/faq"},
    {label:"USA Markets",href:"/locations/united-states"},{label:"All Locations",href:"/locations"},{label:"Careers",href:"/careers"},
  ];
  const primarySocial=SOCIAL_LINKS.filter(s=>SOCIAL_BRANDS[s.label]);

  return <footer className="bg-black text-white" data-nosnippet>
    <section className="px-6 lg:px-12 py-14 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-white/45 mb-3">Start a conversation</p>
          <h2 className="font-[family-name:var(--font-display)] text-3xl lg:text-4xl font-extrabold tracking-tight">Have a project in mind?</h2>
          <p className="text-gray-400 mt-3">Choose whatever is easiest — send the brief, message us, or request a quote.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href="mailto:ciao@themarkitmedia.com" className="inline-flex items-center gap-2 bg-white text-black px-5 py-3.5 font-bold text-sm hover:bg-gray-200"><Mail size={18}/> Email us</a>
          <a href="https://wa.me/923002086081" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-white/25 px-5 py-3.5 font-bold text-sm hover:bg-white hover:text-black"><MessageCircle size={18}/> WhatsApp</a>
          <Link href="/get-a-quote" className="inline-flex items-center gap-2 border border-white/25 px-5 py-3.5 font-bold text-sm hover:bg-white hover:text-black">Request a quote <ArrowUpRight size={17}/></Link>
        </div>
      </div>
    </section>

    <div className="px-6 lg:px-12 py-14">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1.35fr_2fr] gap-12 lg:gap-16">
          <div>
            <Link href="/" className="inline-block"><Image src="/images/logo-black.png" alt="Markit Media" width={170} height={35} className="h-8 w-auto invert brightness-200"/></Link>
            <p className="text-sm text-gray-400 leading-6 mt-5 max-w-sm">{t.footer.tagline}</p>
            <div className="mt-7 space-y-3">
              <a href="mailto:ciao@themarkitmedia.com" className="flex items-center gap-3 text-sm text-gray-200 hover:text-white"><span className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center"><Mail size={17}/></span>ciao@themarkitmedia.com</a>
              <a href="https://wa.me/923002086081" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-gray-200 hover:text-white"><span className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center"><Phone size={17}/></span>+92 300 2086081</a>
            </div>
            <div className="flex gap-2.5 mt-7" aria-label="Follow Markit Media">
              {primarySocial.map(s=>{const b=SOCIAL_BRANDS[s.label];return <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label} aria-label={s.label} className={`w-10 h-10 rounded-full ${b.bg} flex items-center justify-center hover:-translate-y-0.5 transition-transform`}><img src={b.logo} alt="" width="19" height="19" className="w-[19px] h-[19px] object-contain"/></a>})}
            </div>
          </div>

          <nav aria-label="Footer navigation" className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10">
            <LinkGroup title="Services" links={services}/>
            <LinkGroup title="Expertise" links={expertise}/>
            <LinkGroup title="Company" links={company}/>
            <LinkGroup title="Explore" links={explore}/>
          </nav>
        </div>
      </div>
    </div>

    <div className="px-6 lg:px-12 py-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-5 md:items-end md:justify-between">
        <p className="font-[family-name:var(--font-display)] text-2xl lg:text-3xl font-extrabold tracking-tight">Strategy. Search. Creative. Technology.</p>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-gray-500">
          <span>{t.footer.copyright}</span><Link href="/privacy-policy" className="hover:text-white">Privacy</Link><Link href="/terms" className="hover:text-white">Terms</Link>
        </div>
      </div>
    </div>
  </footer>;
}
