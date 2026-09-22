import Link from "next/link";
import Image from "next/image";
import { SOCIAL_LINKS } from "@/lib/social";

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
            <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
              {t.cta.primary} &rarr;
            </Link>
            <Link href="/work" className="inline-flex items-center gap-3 border-2 border-white text-white px-10 py-5 font-bold text-base hover:bg-white hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
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
                {SOCIAL_LINKS.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors motion-reduce:transition-none min-w-[44px] min-h-[44px] inline-flex items-center justify-center focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2" aria-label={s.label}>
                    <svg width={s.iconWidth || 18} height={s.iconWidth || 18} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" dangerouslySetInnerHTML={{ __html: s.icon }} />
                  </a>
                ))}
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
