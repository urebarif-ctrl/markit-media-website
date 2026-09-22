import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Website Development Agency in Boston — Markit Media",
  description:
    "Website development for businesses in Boston. WordPress, Shopify, and Next.js builds with conversion-focused design for biotech, healthcare, fintech, and professional services across Greater Boston.",
  alternates: {
    canonical:
      "https://themarkitmedia.com/en/locations/united-states/boston/website-development",
  },
  openGraph: {
    title: "Website Development Agency in Boston — Markit Media",
    description:
      "Website development for businesses in Boston. WordPress, Shopify, and Next.js builds with conversion-focused design for Greater Boston's innovation economy.",
  },
};

const serviceItems = [
  {
    title: "WordPress Development",
    desc: "Custom WordPress themes, plugin development, and CMS configuration for Boston businesses that need professional, maintainable websites. Ideal for healthcare practices, professional services firms, and institutional organizations that require structured content management and HIPAA-conscious hosting environments.",
  },
  {
    title: "Shopify & E-Commerce",
    desc: "Shopify storefronts, custom theme builds, and checkout optimization for Boston's retail, direct-to-consumer, and university-adjacent brands. Product catalog management, inventory integration, and conversion funnels built for audiences who research thoroughly before purchasing.",
  },
  {
    title: "Next.js & Custom Applications",
    desc: "Server-rendered React applications, headless CMS architectures, and custom web platforms for Boston's tech companies and startups that need performance, scalability, and the flexibility to serve dynamic content — from SaaS product sites to biotech research portals and investor-facing platforms.",
  },
  {
    title: "UX & UI Design",
    desc: "Wireframing, prototyping, and visual design grounded in conversion best practices. Boston's B2B and institutional audiences expect polished, credible interfaces — clean layouts, clear information hierarchy, and user flows that guide complex buyer journeys from first visit through demo request or consultation.",
  },
  {
    title: "Performance Optimization",
    desc: "Core Web Vitals audits, image compression, code splitting, and CDN configuration. Fast-loading pages are the baseline for competing in organic search and maintaining engagement with Boston's technically literate audience — where slow sites signal a lack of operational rigor.",
  },
  {
    title: "Ongoing Maintenance & Support",
    desc: "Security updates, plugin management, uptime monitoring, content updates, and technical support so your site stays fast, secure, and current after launch. We handle the infrastructure so your team can focus on the business — not on patching WordPress or debugging broken deployments.",
  },
];

const reasons = [
  {
    title: "Built for B2B credibility and complex buyer journeys",
    desc: "Boston's biotech, healthcare, and enterprise tech buyers do not convert on impulse. They evaluate vendors across multiple visits, compare competitors, and involve several stakeholders before reaching out. We build sites with the information architecture, content depth, and conversion paths that support this kind of deliberate decision-making process.",
  },
  {
    title: "Industry-appropriate design and compliance awareness",
    desc: "Healthcare organizations need HIPAA-conscious web infrastructure. Biotech companies need sites that communicate scientific credibility without overpromising. Financial services firms need interfaces that project institutional trust. We design and develop for the expectations and regulatory realities specific to Boston's core industries.",
  },
  {
    title: "Performance as a competitive advantage",
    desc: "In a market full of technically sophisticated companies, a slow or poorly built website stands out — for the wrong reasons. We engineer sites for speed, accessibility, and SEO performance because your website is often the first impression a prospective client, investor, or hire has of your organization.",
  },
  {
    title: "Platform recommendation based on your actual needs",
    desc: "We do not force every project into the same tech stack. WordPress is the right choice for content-driven institutional sites. Shopify handles e-commerce well. Next.js is ideal for performance-critical or highly custom applications. We recommend the platform that fits your business requirements and internal team capabilities.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Requirements & Discovery",
    desc: "We start with your business goals, target audience, and technical requirements. For Boston businesses, this includes understanding your industry's compliance needs, mapping the buyer journey for your specific market, and benchmarking against competitors in the Greater Boston area.",
  },
  {
    step: "02",
    title: "Design & Prototyping",
    desc: "Wireframes and visual designs are built in Figma and shared for review before any code is written. You see the layout, user flow, and responsive behavior on every screen size — along with how content hierarchy supports your specific buyer journey — before development begins.",
  },
  {
    step: "03",
    title: "Development & Integration",
    desc: "We build on your chosen platform, integrate third-party tools — analytics, CRM, marketing automation, scheduling systems, payment processors — and optimize for speed and SEO from the start. Development follows clean coding practices so the site is maintainable long-term.",
  },
  {
    step: "04",
    title: "QA, Launch & Handoff",
    desc: "Cross-browser and cross-device testing, staging environment review, and a structured launch process. After go-live, you receive documentation and training so your team can manage day-to-day content updates independently without relying on a developer for every change.",
  },
];

export default function BostonWebDevelopmentPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Markit Media",
    description:
      "Website development agency serving businesses in Boston. WordPress, Shopify, and Next.js builds with conversion-focused design for biotech, healthcare, fintech, and professional services.",
    areaServed: { "@type": "City", name: "Boston" },
    url: "https://themarkitmedia.com/en/locations/united-states/boston/website-development",
  };

  return (
    <article>
      <JsonLd data={schema} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Which platform is best for a Boston B2B website — WordPress, Shopify, or Next.js?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "It depends on your business requirements. WordPress is ideal for content-driven sites common among Boston healthcare practices, professional services firms, and institutional organizations that need structured content management. Shopify handles e-commerce well for direct-to-consumer and university-adjacent brands. Next.js is the best fit for performance-critical applications — SaaS product sites, biotech research portals, and investor-facing platforms where speed and flexibility matter most. We recommend the platform that matches your goals and your team's ability to maintain it.",
                },
              },
              {
                "@type": "Question",
                name: "How long does a website build take for a Boston business?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "A typical brochure or professional services site takes four to eight weeks from discovery through launch. More complex builds — custom web applications, e-commerce stores with large catalogs, or sites requiring integrations with CRM and marketing automation platforms — generally take eight to twelve weeks. For Boston's B2B and healthcare sectors, we build in additional time for compliance review and stakeholder approval cycles that are standard in regulated industries.",
                },
              },
              {
                "@type": "Question",
                name: "Do you build HIPAA-compliant websites for Boston healthcare organizations?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "We build websites with HIPAA-conscious infrastructure for healthcare practices and organizations across Greater Boston. This includes secure hosting environments, encrypted form submissions, proper access controls, and compliant contact and appointment request workflows. We work with hosting providers that offer Business Associate Agreements and configure sites to meet the technical safeguard requirements relevant to healthcare web properties.",
                },
              },
              {
                "@type": "Question",
                name: "What does ongoing website maintenance include after launch?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Our maintenance plans cover security updates, plugin and dependency management, uptime monitoring, performance optimization, content updates, and technical support. For Boston businesses running WordPress, this includes regular core and plugin updates to prevent vulnerabilities. For custom Next.js builds, it includes dependency audits and deployment pipeline maintenance. The goal is to keep your site fast, secure, and current so your team can focus on running the business.",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Locations", href: "/locations" },
          { label: "United States", href: "/locations/united-states" },
          { label: "Boston", href: "/locations/united-states/boston" },
          { label: "Website Development" },
        ]}
      />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Boston</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3 max-w-3xl">
              Website Development for Businesses in Boston
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-6 max-w-2xl">
              Boston&apos;s market demands websites that communicate technical
              credibility and guide complex buyer journeys. Biotech firms,
              healthcare organizations, fintech companies, and professional
              services providers all need sites that earn trust with
              sophisticated audiences before a conversation ever starts.
            </p>
            <p className="text-lg text-gray-500 leading-relaxed mt-4 max-w-2xl">
              Markit Media builds websites for Boston businesses on WordPress,
              Shopify, and Next.js — with clean design, fast performance, and
              the conversion architecture that B2B and institutional buyers
              expect from credible organizations.
            </p>
          </Animate>
          <Animate animation="fade-up" delay={200}>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 font-bold text-base hover:bg-gray-800 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                Discuss Your Project &rarr;
              </Link>
            </div>
          </Animate>
        </div>
      </section>

      {/* Service Details */}
      <section
        className="px-6 lg:px-12 py-20 bg-gray-50"
        aria-label="Website development services for Boston"
      >
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>What&apos;s Included</SectionLabel>
            <SectionTitle>
              Web Development Services for the Boston Market
            </SectionTitle>
          </Animate>
          <Stagger
            stagger={60}
            animation="fade-up"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
          >
            {serviceItems.map((svc) => (
              <div
                key={svc.title}
                className="bg-white border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
              >
                <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black uppercase tracking-wide mb-2">
                  {svc.title}
                </h3>
                <p className="text-base text-gray-500 leading-relaxed">
                  {svc.desc}
                </p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Why Boston Businesses Choose Markit Media for Web Dev */}
      <section
        className="px-6 lg:px-12 py-20"
        aria-label="Why Boston businesses choose Markit Media for website development"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Why Markit Media</SectionLabel>
            <SectionTitle>
              Why Boston Businesses Choose Markit Media for Web Development
            </SectionTitle>
          </Animate>
          <ul className="mt-10 space-y-4">
            {reasons.map((item, i) => (
              <Animate key={i} animation="fade-up" delay={i * 50}>
                <li className="flex items-start gap-4 py-3 border-b border-gray-200">
                  <span className="w-8 h-8 bg-black text-white flex items-center justify-center flex-shrink-0 text-base font-bold">
                    {i + 1}
                  </span>
                  <div>
                    <span className="text-base font-bold text-black">
                      {item.title}
                    </span>
                    <p className="text-base text-gray-500 leading-relaxed mt-1">
                      {item.desc}
                    </p>
                  </div>
                </li>
              </Animate>
            ))}
          </ul>
        </div>
      </section>

      {/* Process */}
      <section
        className="px-6 lg:px-12 py-20 bg-gray-50"
        aria-label="Our web development process"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Our Process</SectionLabel>
            <SectionTitle>
              How We Build Websites for Boston Businesses
            </SectionTitle>
          </Animate>
          <div className="mt-10 space-y-8">
            {processSteps.map((item, i) => (
              <Animate key={i} animation="fade-up" delay={i * 80}>
                <div className="flex items-start gap-5">
                  <span className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black flex-shrink-0 w-12">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-black">
                      {item.title}
                    </h3>
                    <p className="text-base text-gray-500 leading-relaxed mt-1">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section
        className="px-6 lg:px-12 py-20"
        aria-label="Related services"
      >
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Explore More</SectionLabel>
            <SectionTitle>Related Services</SectionTitle>
          </Animate>
          <Stagger
            stagger={60}
            animation="fade-up"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10"
          >
            <Link
              href="/locations/united-states/boston/marketing-agency"
              className="block border border-gray-200 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              <span className="text-base font-bold text-black">
                Marketing Agency in Boston
              </span>
              <p className="text-base text-gray-500 mt-1">
                Full-service marketing strategy and execution.
              </p>
            </Link>
            <Link
              href="/locations/united-states/boston/ppc-ads"
              className="block border border-gray-200 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              <span className="text-base font-bold text-black">
                PPC Ads in Boston
              </span>
              <p className="text-base text-gray-500 mt-1">
                Google Ads, Meta Ads, and LinkedIn campaigns for Boston.
              </p>
            </Link>
            <Link
              href="/locations/united-states/boston/seo-services"
              className="block border border-gray-200 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              <span className="text-base font-bold text-black">
                SEO Services in Boston
              </span>
              <p className="text-base text-gray-500 mt-1">
                Technical, local, and content SEO for Boston businesses.
              </p>
            </Link>
            <Link
              href="/locations/united-states/boston"
              className="block border border-gray-200 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              <span className="text-base font-bold text-black">
                All Boston Services
              </span>
              <p className="text-base text-gray-500 mt-1">
                View all services available in Boston.
              </p>
            </Link>
          </Stagger>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight mb-12">Frequently Asked Questions</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-2">Which platform is best for a Boston B2B website — WordPress, Shopify, or Next.js?</h3>
              <p className="text-base text-neutral-600">It depends on your business requirements. WordPress is ideal for content-driven sites common among Boston healthcare practices, professional services firms, and institutional organizations that need structured content management. Shopify handles e-commerce well for direct-to-consumer and university-adjacent brands. Next.js is the best fit for performance-critical applications — SaaS product sites, biotech research portals, and investor-facing platforms where speed and flexibility matter most. We recommend the platform that matches your goals and your team&apos;s ability to maintain it.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">How long does a website build take for a Boston business?</h3>
              <p className="text-base text-neutral-600">A typical brochure or professional services site takes four to eight weeks from discovery through launch. More complex builds — custom web applications, e-commerce stores with large catalogs, or sites requiring integrations with CRM and marketing automation platforms — generally take eight to twelve weeks. For Boston&apos;s B2B and healthcare sectors, we build in additional time for compliance review and stakeholder approval cycles that are standard in regulated industries.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Do you build HIPAA-compliant websites for Boston healthcare organizations?</h3>
              <p className="text-base text-neutral-600">We build websites with HIPAA-conscious infrastructure for healthcare practices and organizations across Greater Boston. This includes secure hosting environments, encrypted form submissions, proper access controls, and compliant contact and appointment request workflows. We work with hosting providers that offer Business Associate Agreements and configure sites to meet the technical safeguard requirements relevant to healthcare web properties.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">What does ongoing website maintenance include after launch?</h3>
              <p className="text-base text-neutral-600">Our maintenance plans cover security updates, plugin and dependency management, uptime monitoring, performance optimization, content updates, and technical support. For Boston businesses running WordPress, this includes regular core and plugin updates to prevent vulnerabilities. For custom Next.js builds, it includes dependency audits and deployment pipeline maintenance. The goal is to keep your site fast, secure, and current so your team can focus on running the business.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Your Website Should Work as Hard as Your Business
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s build a site that earns credibility with Boston&apos;s
              demanding audiences, loads fast on every device, and converts the
              traffic you are working to drive there.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              Discuss Your Project &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    </article>
  );
}
