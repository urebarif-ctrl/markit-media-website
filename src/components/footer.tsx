import Link from "next/link";
import Image from "next/image";

interface FooterTranslations {
  footer: Record<string, string>;
  nav: Record<string, string>;
  common: Record<string, string>;
  cta: Record<string, string>;
  accessibility: Record<string, string>;
}

function FooterLinkCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="text-base font-bold text-white/80 uppercase tracking-[0.12em] mb-4">{title}</h3>
      <ul className="space-y-1">
        {links.map((link, i) => (
          <li key={`${link.label}-${i}`}>
            <Link href={link.href} className={`hover:text-white transition-colors motion-reduce:transition-none block py-1.5 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 ${i === 0 ? "text-base font-medium text-gray-300" : "text-base text-gray-400"}`}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer({ locale, translations }: { locale: string; translations: FooterTranslations }) {
  const t = translations;

  const serviceLinks = [
    { label: "Performance Marketing", href: "/services/performance-marketing" },
    { label: "SEO", href: "/services/seo" },
    { label: "Social Media", href: "/services/social-media" },
    { label: "Website Development", href: "/services/website-development" },
    { label: "Branding", href: "/services/branding" },
    { label: "Video Production", href: "/services/video-production" },
    { label: "AI Solutions", href: "/services/ai" },
    { label: "Email Marketing", href: "/services/email-marketing" },
    { label: "Content Marketing", href: "/services/content-marketing" },
    { label: "E-commerce Marketing", href: "/services/ecommerce-marketing" },
    { label: "Digital Marketing", href: "/services/digital-marketing" },
    { label: "Paid Advertising", href: "/services/paid-advertising" },
    { label: "Public Relations", href: "/services/public-relations" },
    { label: "Photography", href: "/services/photography" },
    { label: "BPO Services", href: "/services/bpo" },
  ];

  const companyLinks = [
    { label: t.nav.about, href: "/about" },
    { label: t.nav.work, href: "/work" },
    { label: t.nav.process, href: "/process" },
    { label: "Our Approach", href: "/approach" },
    { label: "Why Markit Media", href: "/why-markit-media" },
    { label: t.nav.careers, href: "/careers" },
    { label: t.nav.contact, href: "/contact" },
    { label: "Pricing", href: "/pricing" },
    { label: "Get a Quote", href: "/get-a-quote" },
    { label: "How We Measure Results", href: "/results" },
    { label: "Client Onboarding", href: "/onboarding" },
    { label: t.nav.caseStudies, href: "/case-studies" },
    { label: "Capabilities", href: "/capabilities" },
    { label: "Technology", href: "/technology" },
    { label: "Partners", href: "/partners" },
  ];

  const resourceLinks = [
    { label: t.nav.blog, href: "/blog" },
    { label: "Resources", href: "/resources" },
    { label: "FAQ", href: "/faq" },
    { label: "Glossary", href: "/glossary" },
    { label: "Checklists", href: "/resources/checklists" },
    { label: "ROI Calculator", href: "/resources/roi-calculator" },
    { label: "A/B Test Calculator", href: "/resources/ab-test-calculator" },
    { label: "Budget Calculator", href: "/resources/budget-calculator" },
    { label: "SEO Health Check", href: "/resources/seo-checklist" },
    { label: "Website Grader", href: "/resources/website-grader" },
    { label: "Headline Analyzer", href: "/resources/headline-analyzer" },
    { label: "Service Finder", href: "/services/finder" },
    { label: "Tools We Use", href: "/tools" },
    { label: "Industries", href: "/industries" },
    { label: "Locations", href: "/locations" },
    { label: t.footer.terms, href: "/terms" },
    { label: t.footer.privacy, href: "/privacy-policy" },
  ];

  return (
    <footer className="bg-black text-white">
      {/* CTA band */}
      <section className="px-6 lg:px-12 py-20 text-center border-b border-white/10">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-tight mb-5">
            {t.cta.title}
          </h2>
          <p className="text-lg text-gray-400 leading-relaxed mb-10">{t.cta.description}</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none">
              {t.cta.primary} &rarr;
            </Link>
            <Link href="/work" className="inline-flex items-center gap-3 border-2 border-white text-white px-10 py-5 font-bold text-base hover:bg-white hover:text-black transition-colors motion-reduce:transition-none">
              {t.cta.secondary}
            </Link>
          </div>
        </div>
      </section>

      {/* Links grid */}
      <div className="px-6 lg:px-12 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand column */}
            <div>
              <Link href="/" className="inline-block mb-4 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
                <Image src="/images/logo-black.png" alt="Markit Media" width={160} height={33} className="h-8 w-auto invert brightness-200" />
              </Link>
              <p className="text-base text-gray-400 leading-relaxed mb-6">{t.footer.tagline}</p>
              <div className="flex items-center gap-2 flex-wrap">
                <a href="https://www.youtube.com/@themarkitmedia" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors motion-reduce:transition-none min-w-[44px] min-h-[44px] inline-flex items-center justify-center focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2" aria-label="YouTube">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
                <a href="https://www.instagram.com/themarkitmedia" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors motion-reduce:transition-none min-w-[44px] min-h-[44px] inline-flex items-center justify-center focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2" aria-label="Instagram">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                <a href="https://www.linkedin.com/company/the-markit-media/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors motion-reduce:transition-none min-w-[44px] min-h-[44px] inline-flex items-center justify-center focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2" aria-label="LinkedIn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href="https://www.tiktok.com/@themarkitmedia_" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors motion-reduce:transition-none min-w-[44px] min-h-[44px] inline-flex items-center justify-center focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2" aria-label="TikTok">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
                </a>
                <a href="https://x.com/themarkitmedia" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors motion-reduce:transition-none min-w-[44px] min-h-[44px] inline-flex items-center justify-center focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2" aria-label="X (Twitter)">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="https://www.facebook.com/themarkitmedia/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors motion-reduce:transition-none min-w-[44px] min-h-[44px] inline-flex items-center justify-center focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2" aria-label="Facebook">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
              </div>
            </div>
            <nav aria-label={t.accessibility.footerNavigation}>
              <FooterLinkCol title={t.footer.services} links={serviceLinks} />
            </nav>
            <FooterLinkCol title={t.footer.company} links={companyLinks} />
            <FooterLinkCol title={t.footer.resources} links={resourceLinks} />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 px-6 lg:px-12 py-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-base text-gray-500">{t.footer.copyright}</p>
          <p className="text-base text-gray-500">
            <a href="mailto:ciao@themarkitmedia.com" className="hover:text-white transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">ciao@themarkitmedia.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
