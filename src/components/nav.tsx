"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";

interface NavTranslations {
  nav: Record<string, string>;
  common: Record<string, string>;
  accessibility: Record<string, string>;
}

const serviceCategories = [
  { label: "Performance Marketing", href: "/services/performance-marketing", desc: "Meta Ads, Google Ads, PPC" },
  { label: "SEO", href: "/services/seo", desc: "Technical, local, and content SEO" },
  { label: "Social Media", href: "/services/social-media", desc: "Strategy, content, management" },
  { label: "Website Development", href: "/services/website-development", desc: "WordPress, Shopify, Next.js" },
  { label: "App Development", href: "/services/app-development", desc: "Web apps, MVPs, portals, dashboards" },
  { label: "White Label Services", href: "/services/white-label", desc: "PPC, SEO, web and agency fulfillment" },
  { label: "Freelance Developers", href: "/services/website-development/freelance-developers", desc: "Flexible WordPress, Shopify and Next.js capacity" },
  { label: "Marketing Analytics", href: "/services/marketing-analytics", desc: "Measurement, dashboards and attribution" },
  { label: "Media Planning & Buying", href: "/services/media-planning-buying", desc: "Cross-channel media strategy and activation" },
  { label: "WhatsApp Business", href: "/services/whatsapp-business", desc: "Messaging, automation and CRM workflows" },
  { label: "Next.js Websites", href: "/services/website-development/nextjs-websites", desc: "Fast, SEO-ready Next.js websites" },
  { label: "Branding", href: "/services/branding", desc: "Brand strategy, logo, identity" },
  { label: "Video Production", href: "/services/video-production", desc: "Production, editing, motion" },
  { label: "AI Solutions", href: "/services/ai", desc: "Chatbots, automation, consulting" },
  { label: "Chatbot Building", href: "/services/ai/chatbots", desc: "Website, WhatsApp and lead bots" },
  { label: "AI Marketing", href: "/services/ai/ai-marketing", desc: "AI-assisted marketing workflows" },
  { label: "AI SEO", href: "/services/seo/ai-seo", desc: "Search and AI discovery visibility" },
  { label: "Content Marketing", href: "/services/content-marketing", desc: "Copywriting, strategy" },
  { label: "Email Marketing", href: "/services/email-marketing", desc: "Campaigns, automation" },
  { label: "Digital Marketing", href: "/services/digital-marketing", desc: "Analytics, CRM, ORM" },
  { label: "Paid Advertising", href: "/services/paid-advertising", desc: "Programmatic, media buying" },
  { label: "E-commerce Marketing", href: "/services/ecommerce-marketing", desc: "Amazon, Shopify, feeds" },
  { label: "Public Relations", href: "/services/public-relations", desc: "Media, PR, reputation" },
  { label: "Photography", href: "/services/photography", desc: "Product, corporate, events" },
  { label: "BPO Services", href: "/services/bpo", desc: "Call center, sales, support, operations" },
  { label: "Appointment Setting", href: "/services/bpo/appointment-setting", desc: "Qualification, scheduling and CRM handoff" },
  { label: "Staff Augmentation", href: "/services/bpo/staff-augmentation", desc: "Flexible digital and operations capacity" },
  { label: "Upwork Growth", href: "/services/upwork-growth", desc: "Profile, agency bidding, client acquisition" },
];

const industryList = [
  { label: "Home Services", href: "/industries/home-services" },
  { label: "Exterior Cleaning", href: "/industries/exterior-cleaning" },
  { label: "Rehab & Recovery", href: "/industries/rehab-recovery" },
  { label: "Personal Branding", href: "/industries/personal-branding" },
  { label: "Food Ingredients E-commerce", href: "/industries/food-ingredients-ecommerce" },
  { label: "E-commerce", href: "/industries/ecommerce" },
  { label: "Healthcare", href: "/industries/healthcare" },
  { label: "Real Estate", href: "/industries/real-estate" },
  { label: "Restaurants", href: "/industries/restaurants" },
  { label: "Fashion", href: "/industries/fashion" },
  { label: "B2B", href: "/industries/b2b" },
  { label: "EV Chargers", href: "/industries/ev-chargers" },
  { label: "Education", href: "/industries/education" },
  { label: "Legal", href: "/industries/legal" },
  { label: "SaaS", href: "/industries/saas" },
  { label: "Finance", href: "/industries/finance" },
  { label: "Hospitality", href: "/industries/hospitality" },
  { label: "Fitness", href: "/industries/fitness" },
  { label: "Automotive", href: "/industries/automotive" },
  { label: "Nonprofits", href: "/industries/nonprofits" },
  { label: "Construction", href: "/industries/construction" },
  { label: "Travel", href: "/industries/travel" },
  { label: "Professional Services", href: "/industries/professional-services" },
  { label: "Freelancers & Agencies", href: "/industries/freelancers-agencies" },
  { label: "Manufacturing", href: "/industries/manufacturing" },
];

function moveFocusInPanel(panelId: string, direction: "next" | "prev" | "first" | "last") {
  const panel = document.getElementById(panelId);
  if (!panel) return;
  const items = Array.from(panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'));
  if (items.length === 0) return;
  const currentIdx = items.indexOf(document.activeElement as HTMLElement);
  let target: HTMLElement;
  if (direction === "first") target = items[0];
  else if (direction === "last") target = items[items.length - 1];
  else if (direction === "next") target = items[(currentIdx + 1) % items.length];
  else target = items[(currentIdx - 1 + items.length) % items.length];
  target.focus();
}

export function Nav({ locale, translations }: { locale: string; translations: NavTranslations }) {
  const t = translations;
  const pathname = usePathname();
  const isHome = /^\/(en|ar|ur)\/?$/.test(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const servicesRef = useRef<HTMLDivElement>(null);
  const industriesRef = useRef<HTMLDivElement>(null);
  const servicesTriggerRef = useRef<HTMLAnchorElement>(null);
  const industriesTriggerRef = useRef<HTMLAnchorElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);
  const servicesTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);
  const industriesTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);

  const localizedPath = (nextLocale: string) => pathname.replace(/^\/(en|ar|ur)(?=\/|$)/, `/${nextLocale}`) || `/${nextLocale}`;
  const searchItems = [
    ...serviceCategories.map((item) => ({ ...item, category: "Services" })),
    ...industryList.map((item) => ({ ...item, desc: "Industry expertise", category: "Industries" })),
    { label: "Case Studies", href: "/case-studies", desc: "Results and client work", category: "Work" },
    { label: "Portfolio", href: "/work", desc: "Selected creative and digital work", category: "Work" },
    { label: "Blog & Insights", href: "/blog", desc: "Marketing articles and insights", category: "Resources" },
    { label: "Resources", href: "/resources", desc: "Guides, calculators and tools", category: "Resources" },
    { label: "About Markit Media", href: "/about", desc: "About the agency", category: "Company" },
    { label: "Contact", href: "/contact", desc: "Talk to our team", category: "Company" },
    { label: "Request a Quote", href: "/get-a-quote", desc: "Start a project", category: "Company" },
  ];
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const searchResults = normalizedQuery
    ? searchItems.filter((item) => `${item.label} ${item.desc} ${item.category}`.toLowerCase().includes(normalizedQuery)).slice(0, 10)
    : searchItems.slice(0, 8);

  useEffect(() => {
    function handleScroll() { setScrolled(window.scrollY > 20); }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) setServicesOpen(false);
      if (industriesRef.current && !industriesRef.current.contains(e.target as Node)) setIndustriesOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (mobileOpen) {
          setMobileOpen(false); setMobileServicesOpen(false); setMobileIndustriesOpen(false);
          mobileToggleRef.current?.focus();
        } else if (servicesOpen) {
          setServicesOpen(false); servicesTriggerRef.current?.focus();
        } else if (industriesOpen) {
          setIndustriesOpen(false); industriesTriggerRef.current?.focus();
        }
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen, servicesOpen, industriesOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false); setMobileServicesOpen(false); setMobileIndustriesOpen(false);
    setServicesOpen(false); setIndustriesOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const menu = mobileMenuRef.current;
    if (!menu) return;
    function handleTab(e: KeyboardEvent) {
      if (e.key !== "Tab") return;
      const focusable = Array.from(menu!.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'));
      const toggle = mobileToggleRef.current;
      if (toggle) focusable.unshift(toggle);
      if (focusable.length === 0) return;
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
    document.addEventListener("keydown", handleTab);
    return () => document.removeEventListener("keydown", handleTab);
  }, [mobileOpen]);

  const handlePanelKeyDown = useCallback((e: React.KeyboardEvent, panelId: string, closeFn: () => void, triggerRef?: React.RefObject<HTMLAnchorElement | null>) => {
    switch (e.key) {
      case "ArrowDown": e.preventDefault(); moveFocusInPanel(panelId, "next"); break;
      case "ArrowUp": e.preventDefault(); moveFocusInPanel(panelId, "prev"); break;
      case "Home": e.preventDefault(); moveFocusInPanel(panelId, "first"); break;
      case "End": e.preventDefault(); moveFocusInPanel(panelId, "last"); break;
      case "Escape": e.preventDefault(); closeFn(); triggerRef?.current?.focus(); break;
    }
  }, []);

  const dropdownPanelBase = "absolute top-full left-1/2 -translate-x-1/2 bg-white shadow-2xl border border-gray-100 transition-all duration-200 origin-top";
  const dropdownVisible = "opacity-100 scale-100 pointer-events-auto";
  const dropdownHidden = "opacity-0 scale-95 pointer-events-none";

  const navLinkClass = `text-sm xl:text-[15px] font-semibold transition-colors motion-reduce:transition-none py-5 focus-visible:outline-2 focus-visible:outline-offset-2 ${isHome && !scrolled ? "text-white/90 hover:text-white focus-visible:outline-white" : "text-gray-700 hover:text-black focus-visible:outline-black"}`;

  return (
    <nav aria-label={t.accessibility.mainNavigation} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-xl shadow-sm border-b border-black/[0.04]" : isHome ? "bg-black/20 backdrop-blur-sm" : "bg-white/95"}`}>
      <div className={`max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between transition-all duration-300 ${scrolled ? "h-16" : "h-16 lg:h-20"}`}>
        <Link href="/" className="flex items-center gap-2 flex-shrink-0 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
          <Image
            src="/images/logo-black.png"
            alt="Markit Media"
            width={160}
            height={33}
            priority
            className={`h-8 w-auto transition-[filter] duration-300 ${isHome && !scrolled ? "brightness-0 invert" : ""}`}
          />
        </Link>

        {/* Desktop nav — deliberately compact; depth lives in the mega menus */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2">
          <div ref={servicesRef} className="relative"
            onMouseEnter={() => { clearTimeout(servicesTimeout.current); setServicesOpen(true); setIndustriesOpen(false); }}
            onMouseLeave={() => { servicesTimeout.current = setTimeout(() => setServicesOpen(false), 180); }}>
            <Link ref={servicesTriggerRef} href="/services" className={`${navLinkClass} flex items-center gap-1.5 px-3`}
              onFocus={() => { clearTimeout(servicesTimeout.current); setServicesOpen(true); }}
              aria-expanded={servicesOpen} aria-haspopup="true" aria-controls="services-dropdown">
              Services <span aria-hidden="true" className="text-xs">⌄</span>
            </Link>
            <div id="services-dropdown" className={`${dropdownPanelBase} w-[min(920px,90vw)] ${servicesOpen ? dropdownVisible : dropdownHidden}`}>
              <div className="p-6 border-b border-gray-100 flex items-end justify-between gap-8">
                <div><span className="text-xs font-bold uppercase tracking-[.18em] text-gray-400">What we do</span><h2 className="text-2xl font-extrabold mt-1">Growth, creative & technology.</h2></div>
                <Link href="/services" className="text-sm font-bold whitespace-nowrap hover:underline">Explore all services →</Link>
              </div>
              <div className="grid grid-cols-3 gap-1 p-4 max-h-[62vh] overflow-y-auto">
                {serviceCategories.map((s) => <Link key={s.href} href={s.href} className="group p-3.5 hover:bg-gray-50 rounded-sm"><span className="block text-sm font-bold text-black">{s.label}</span><span className="block text-xs leading-relaxed text-gray-500 mt-1">{s.desc}</span></Link>)}
              </div>
            </div>
          </div>

          <div ref={industriesRef} className="relative"
            onMouseEnter={() => { clearTimeout(industriesTimeout.current); setIndustriesOpen(true); setServicesOpen(false); }}
            onMouseLeave={() => { industriesTimeout.current = setTimeout(() => setIndustriesOpen(false), 180); }}>
            <Link ref={industriesTriggerRef} href="/industries" className={`${navLinkClass} flex items-center gap-1.5 px-3`}
              onFocus={() => { clearTimeout(industriesTimeout.current); setIndustriesOpen(true); }}
              aria-expanded={industriesOpen} aria-haspopup="true" aria-controls="industries-dropdown">
              Industries <span aria-hidden="true" className="text-xs">⌄</span>
            </Link>
            <div id="industries-dropdown" className={`${dropdownPanelBase} w-[min(780px,88vw)] ${industriesOpen ? dropdownVisible : dropdownHidden}`}>
              <div className="p-6 border-b border-gray-100"><span className="text-xs font-bold uppercase tracking-[.18em] text-gray-400">Industry experience</span><h2 className="text-2xl font-extrabold mt-1">Built around how your market buys.</h2></div>
              <div className="grid grid-cols-3 gap-1 p-4 max-h-[58vh] overflow-y-auto">
                {industryList.map((ind) => <Link key={ind.href} href={ind.href} className="px-3 py-2.5 text-sm font-semibold text-black hover:bg-gray-50 rounded-sm">{ind.label}</Link>)}
              </div>
            </div>
          </div>

          <Link href="/work" className={`${navLinkClass} px-3`}>Work</Link>
          <Link href="/case-studies" className={`${navLinkClass} px-3`}>Case Studies</Link>
          <Link href="/blog" className={`${navLinkClass} px-3`}>Insights</Link>
          <Link href="/about" className={`${navLinkClass} px-3`}>About</Link>

          <div className="h-6 w-px bg-current opacity-15 mx-1" aria-hidden="true" />
          <div className="relative">
            <button onClick={() => { setSearchOpen(!searchOpen); setLanguageOpen(false); }} className={`${navLinkClass} px-3`} aria-label="Search website" aria-expanded={searchOpen}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
            </button>
            {searchOpen && <div className="absolute top-full right-0 w-[420px] bg-white text-black shadow-2xl border border-gray-100 p-4"><label htmlFor="site-search" className="sr-only">Search the website</label><input id="site-search" autoFocus value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search services, industries, resources..." className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black" /><div className="mt-3 max-h-[420px] overflow-y-auto">{searchResults.length ? searchResults.map((item) => <Link key={`${item.category}-${item.href}`} href={item.href} className="block p-3 hover:bg-gray-50" onClick={() => setSearchOpen(false)}><span className="block text-[11px] font-bold uppercase tracking-wide text-gray-400">{item.category}</span><span className="block text-sm font-bold">{item.label}</span><span className="block text-xs text-gray-500">{item.desc}</span></Link>) : <p className="p-3 text-sm text-gray-500">No matching pages found.</p>}</div></div>}
          </div>
          <div className="relative">
            <button onClick={() => { setLanguageOpen(!languageOpen); setSearchOpen(false); }} className={`${navLinkClass} flex items-center gap-1 px-2 uppercase text-sm`} aria-label="Change language" aria-expanded={languageOpen}>{locale}<span aria-hidden="true">⌄</span></button>
            {languageOpen && <div className="absolute top-full right-0 min-w-40 bg-white text-black shadow-2xl border border-gray-100 py-2">{[["en","English"],["ar","العربية"],["ur","اردو"]].map(([code,label]) => <Link key={code} href={localizedPath(code)} hrefLang={code} className={`block px-4 py-3 text-sm hover:bg-gray-50 ${locale === code ? "font-extrabold" : "font-semibold"}`} onClick={() => setLanguageOpen(false)}>{label}{locale === code ? " ✓" : ""}</Link>)}</div>}
          </div>
          <Link href="/get-a-quote" className={`ml-1 px-5 py-3 text-sm font-extrabold transition-colors ${isHome && !scrolled ? "bg-white text-black hover:bg-gray-100" : "bg-black text-white hover:bg-gray-800"}`}>Request a Quote</Link>
        </div>

        {/* Mobile toggle */}
        <button ref={mobileToggleRef} onClick={() => setMobileOpen(!mobileOpen)} className={`lg:hidden w-11 h-11 flex items-center justify-center rounded-sm ${isHome && !scrolled && !mobileOpen ? "bg-white text-black" : "bg-black text-white"} focus-visible:outline-2 focus-visible:outline-offset-2`} aria-expanded={mobileOpen} aria-controls="mobile-navigation" aria-label={mobileOpen ? "Close menu" : "Open menu"}>
          <div className="w-6 flex flex-col gap-1.5">
            <span className={`block h-0.5 bg-current transition-all ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block h-0.5 bg-current transition-all ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 bg-current transition-all ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <div id="mobile-navigation" ref={mobileMenuRef} className={`lg:hidden absolute top-full left-0 right-0 h-[calc(100dvh-4rem)] bg-white z-40 overflow-y-auto overscroll-contain shadow-2xl border-t border-gray-100 transition-[opacity,transform] duration-200 ${mobileOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}`}>
        <div className="px-6 py-8 space-y-1">
          <div>
            <button onClick={() => setMobileServicesOpen(!mobileServicesOpen)} className="w-full flex justify-between items-center py-4 text-base font-bold text-black border-b border-gray-100 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2" aria-expanded={mobileServicesOpen}>
              {t.nav.services}
              <span className={`transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`}>&#9662;</span>
            </button>
            {mobileServicesOpen && (
              <div className="pl-4 py-2 space-y-1">
                {serviceCategories.map((s) => (
                  <Link key={s.href} href={s.href} className="block py-2.5 text-base text-gray-600 hover:text-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2" onClick={() => setMobileOpen(false)}>{s.label}</Link>
                ))}
              </div>
            )}
          </div>
          <div>
            <button onClick={() => setMobileIndustriesOpen(!mobileIndustriesOpen)} className="w-full flex justify-between items-center py-4 text-base font-bold text-black border-b border-gray-100 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2" aria-expanded={mobileIndustriesOpen}>
              {t.nav.industries}
              <span className={`transition-transform ${mobileIndustriesOpen ? "rotate-180" : ""}`}>&#9662;</span>
            </button>
            {mobileIndustriesOpen && (
              <div className="pl-4 py-2 space-y-1">
                {industryList.map((ind) => (
                  <Link key={ind.href} href={ind.href} className="block py-2.5 text-base text-gray-600 hover:text-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2" onClick={() => setMobileOpen(false)}>{ind.label}</Link>
                ))}
              </div>
            )}
          </div>
          {[
            { label: t.nav.work, href: "/work" },
            { label: t.nav.caseStudies, href: "/case-studies" },
            { label: t.nav.insights, href: "/blog" },
            { label: "Resources", href: "/resources" },
            { label: t.nav.about, href: "/about" },
            { label: t.nav.contact, href: "/contact" },
          ].map((link) => (
            <Link key={link.href} href={link.href} className="block py-4 text-base font-bold text-black border-b border-gray-100 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2" onClick={() => setMobileOpen(false)}>{link.label}</Link>
          ))}
          <div className="grid grid-cols-2 gap-3 pt-4">
            <button onClick={() => setSearchOpen(!searchOpen)} className="border border-black py-3 font-bold">Search</button>
            <div className="grid grid-cols-3 border border-black">{[["en","EN"],["ar","AR"],["ur","UR"]].map(([code,label]) => <Link key={code} href={localizedPath(code)} hrefLang={code} className={`flex items-center justify-center text-sm ${locale === code ? "bg-black text-white font-bold" : "font-semibold"}`}>{label}</Link>)}</div>
          </div>
          {searchOpen && <div className="py-3"><label htmlFor="mobile-site-search" className="sr-only">Search the website</label><input id="mobile-site-search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search the whole website..." className="w-full border border-gray-300 px-4 py-3" /><div className="max-h-72 overflow-y-auto mt-2">{searchResults.map((item) => <Link key={`mobile-${item.category}-${item.href}`} href={item.href} className="block py-3 border-b border-gray-100" onClick={() => { setSearchOpen(false); setMobileOpen(false); }}><span className="text-xs uppercase text-gray-400">{item.category}</span><span className="block font-bold">{item.label}</span></Link>)}</div></div>}
<Link href="/get-a-quote" onClick={() => setMobileOpen(false)} className="block w-full text-center bg-black text-white py-4 text-base font-bold mt-6 hover:bg-gray-800 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">{t.nav.getQuote}</Link>
        </div>
      </div>
    </nav>
  );
}
