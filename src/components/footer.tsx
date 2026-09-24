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

  const growthLinks = [
    { label: "Google Ads Management", href: "/services/performance-marketing/google-ads" },
    { label: "Meta Ads Management", href: "/services/performance-marketing/meta-ads" },
    { label: "PPC Management", href: "/services/performance-marketing/ppc-management" },
    { label: "SEO Services", href: "/services/seo" },
    { label: "Local SEO", href: "/services/seo/local-seo" },
    { label: "AI SEO", href: "/services/seo/ai-seo" },
    { label: "White Label PPC", href: "/services/white-label/ppc" },
    { label: "White Label Web Development", href: "/services/white-label/web-development" },
    { label: "Next.js Development", href: "/services/website-development/nextjs-websites" },
    { label: "Shopify Development", href: "/services/website-development/shopify" },
    { label: "Marketing Analytics", href: "/services/marketing-analytics" },
    { label: "Appointment Setting", href: "/services/bpo/appointment-setting" },
  ];

  const usaLinks = [
    { label: "Digital Marketing USA", href: "/locations/united-states" },
    { label: "New York", href: "/locations/united-states/new-york" },
    { label: "Los Angeles", href: "/locations/united-states/los-angeles" },
    { label: "Chicago", href: "/locations/united-states/chicago" },
    { label: "Houston", href: "/locations/united-states/houston" },
    { label: "Dallas", href: "/locations/united-states/dallas" },
    { label: "Miami", href: "/locations/united-states/miami" },
    { label: "Atlanta", href: "/locations/united-states/atlanta" },
    { label: "San Francisco", href: "/locations/united-states/san-francisco" },
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
    { label: "Request a Quote", href: "/get-a-quote" },
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
      <section aria-label="Call to action" className="px-6 lg:px-12 py-20 text-center border-b border-white/10">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-tight mb-5">
            {t.cta.title}
          </h2>
          <p className="text-lg text-gray-400 leading-relaxed mb-10">{t.cta.description}</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/get-a-quote" className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
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
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-x-6 gap-y-10">
            {/* Brand column */}
            <div className="col-span-2 lg:col-span-2">
              <Link href="/" className="inline-block mb-4 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
                <Image src="/images/logo-black.png" alt="Markit Media" width={160} height={33} className="h-8 w-auto invert brightness-200" />
              </Link>
              <p className="text-base text-gray-400 leading-relaxed mb-6">{t.footer.tagline}</p>
              <div className="flex items-center gap-2 flex-wrap" aria-label="Follow Markit Media">
                {SOCIAL_LINKS.map((s) => {
                  const primary = ["YouTube","Instagram","LinkedIn","Facebook"].includes(s.label);
                  const brandClass: Record<string,string> = {
                    YouTube:"bg-[#FF0000] text-white", Instagram:"bg-[#E4405F] text-white", LinkedIn:"bg-[#0A66C2] text-white",
                    Facebook:"bg-[#1877F2] text-white", Behance:"bg-[#1769FF] text-white", TikTok:"bg-white text-black",
                    Pinterest:"bg-[#BD081C] text-white", WhatsApp:"bg-[#25D366] text-white",
                  };
                  return <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    className={`${primary ? "w-12 h-12" : "w-10 h-10"} ${brandClass[s.label] ?? "bg-white/10 text-white"} rounded-full inline-flex items-center justify-center hover:scale-105 transition-transform motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2`}
                    aria-label={`Follow Markit Media on ${s.label}`} title={s.label}>
                    <svg width={primary ? 23 : 18} height={primary ? 23 : 18} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" dangerouslySetInnerHTML={{ __html: s.icon }} />
                  </a>
                })}
              </div>
              <div className="flex flex-wrap gap-3 mt-5">
                <a href="mailto:ciao@themarkitmedia.com" className="inline-flex items-center gap-2 min-h-11 px-4 border border-white/15 text-white hover:bg-white hover:text-black transition-colors" aria-label="Email Markit Media">
                  <span className="text-xl" aria-hidden="true">✉</span><span className="text-sm font-semibold">Email</span>
                </a>
                <a href="https://wa.me/923002086081" className="inline-flex items-center gap-2 min-h-11 px-4 border border-white/15 text-white hover:bg-white hover:text-black transition-colors" aria-label="Contact Markit Media on WhatsApp">
                  <span className="text-xl" aria-hidden="true">☎</span><span className="text-sm font-semibold">WhatsApp / Phone</span>
                </a>
              </div>
            </div>
            <nav aria-label="Growth services">
              <FooterLinkCol title="Growth Services" links={growthLinks} />
            </nav>
            <nav aria-label="United States locations">
              <FooterLinkCol title="USA Markets" links={usaLinks} />
            </nav>
            <nav aria-label={t.accessibility.footerNavigation}>
              <FooterLinkCol title={t.footer.services} links={serviceLinks} />
            </nav>
            <nav aria-label="Company links">
              <FooterLinkCol title={t.footer.company} links={companyLinks} />
            </nav>
            <nav aria-label="Resources links">
              <FooterLinkCol title={t.footer.resources} links={resourceLinks} />
            </nav>
          </div>
        </div>
      </div>

      <div className="px-6 lg:px-12 pb-10">
        <div className="max-w-7xl mx-auto border-t border-white/10 pt-10">
          <p className="font-[family-name:var(--font-display)] text-[clamp(2rem,8vw,5.5rem)] font-extrabold tracking-[-0.05em] leading-none text-white">
            Strategy. Search.<br className="sm:hidden" /> Creative. Technology.
          </p>
          <p className="mt-5 max-w-2xl text-base text-gray-400 leading-relaxed">
            Built for businesses that want more than impressions — connected marketing, technology and creative work designed around measurable growth.
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 px-6 lg:px-12 py-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <p className="text-base text-gray-500">{t.footer.copyright}</p>
          <p className="text-base text-gray-500">
            <a href="mailto:ciao@themarkitmedia.com" className="hover:text-white transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">ciao@themarkitmedia.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
