import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { ContactForm } from "./contact-form";
import { Mail, MapPin, Clock } from "lucide-react";
import { SOCIAL_LINKS, SOCIAL_URLS } from "@/lib/social";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Markit Media for a free consultation. We serve clients across the USA, Canada, UAE, UK, Australia, and Saudi Arabia.",
  alternates: { canonical: "https://themarkitmedia.com/en/contact" },
  openGraph: {
    title: "Contact Markit Media",
    description:
      "Get a free consultation. We serve clients across the USA, Canada, UAE, UK, Australia, and Saudi Arabia.",
  },
};

export default function ContactPage() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Markit Media",
    description: "Get in touch with Markit Media for a free consultation.",
    mainEntity: {
      "@type": "Organization",
      name: "Markit Media",
      email: "ciao@themarkitmedia.com",
      url: "https://themarkitmedia.com",
      sameAs: SOCIAL_URLS,
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "Is the initial consultation free?", acceptedAnswer: { "@type": "Answer", text: "Yes. Our discovery call is completely free with no obligation. We use it to understand your goals, assess fit, and outline how we could help." } },
      { "@type": "Question", name: "How quickly can you start?", acceptedAnswer: { "@type": "Answer", text: "Most projects can kick off within one to two weeks of signing. Urgent projects may start sooner depending on scope and team availability." } },
      { "@type": "Question", name: "Do you require long-term contracts?", acceptedAnswer: { "@type": "Answer", text: "We offer both project-based and retainer engagements. Retainers typically run on a month-to-month basis after an initial commitment period." } },
      { "@type": "Question", name: "What industries do you work with?", acceptedAnswer: { "@type": "Answer", text: "We serve over 20 industries including e-commerce, healthcare, real estate, SaaS, professional services, hospitality, and more." } },
      { "@type": "Question", name: "Can you work with our existing team?", acceptedAnswer: { "@type": "Answer", text: "Absolutely. We frequently collaborate with in-house marketing teams, acting as an extension to fill skill gaps or provide specialist expertise." } },
      { "@type": "Question", name: "How do you measure success?", acceptedAnswer: { "@type": "Answer", text: "We establish clear KPIs at the start of every engagement and report on them regularly. Metrics are tied to business outcomes, not vanity numbers." } },
    ],
  };

  return (
    <article>
      <JsonLd data={contactSchema} />
      <JsonLd data={faqSchema} />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />

      <section className="px-6 lg:px-12 pt-24 pb-20" aria-label="Contact us">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left — Info */}
            <div>
              <Animate animation="fade-up">
                <SectionLabel>Get in Touch</SectionLabel>
                <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
                  Let&apos;s Talk About Your Growth
                </h1>
                <p className="text-lg text-gray-500 leading-relaxed mt-6 max-w-lg">
                  Whether you need a full-stack marketing partner or help with a specific channel, we&apos;re here to help. Fill out the form and we&apos;ll get back to you within one business day.
                </p>
              </Animate>

              <Animate animation="fade-up" delay={150}>
                <div className="mt-12 space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-black text-white flex items-center justify-center flex-shrink-0">
                      <Mail size={20} aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-bold text-black text-base">Email</h3>
                      <a href="mailto:ciao@themarkitmedia.com" className="text-base text-gray-500 hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                        ciao@themarkitmedia.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-black text-white flex items-center justify-center flex-shrink-0">
                      <MapPin size={20} aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-bold text-black text-base">Markets Served</h3>
                      <p className="text-base text-gray-500">USA, Canada, UAE, UK, Australia, Saudi Arabia</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-black text-white flex items-center justify-center flex-shrink-0">
                      <Clock size={20} aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-bold text-black text-base">Response Time</h3>
                      <p className="text-base text-gray-500">We respond within one business day</p>
                    </div>
                  </div>
                </div>
              </Animate>
            </div>

            {/* Right — Form */}
            <Animate animation="fade-up" delay={200}>
              <ContactForm />
            </Animate>
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-12 bg-black text-white" aria-label="Trust signals">
        <div className="max-w-7xl mx-auto">
          <Stagger stagger={80} animation="fade-up" className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Markets Served", value: "6 Countries" },
              { label: "Services", value: "13 Disciplines" },
              { label: "Industries", value: "20 Verticals" },
              { label: "Response Time", value: "1 Business Day" },
            ].map((item) => (
              <div key={item.label}>
                <p className="font-[family-name:var(--font-display)] text-2xl lg:text-3xl font-extrabold text-white">{item.value}</p>
                <p className="text-base text-gray-400 mt-1">{item.label}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-16 bg-gray-50" aria-label="What happens next">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>What Happens Next</SectionLabel>
            <SectionTitle>After You Reach Out</SectionTitle>
          </Animate>
          <Stagger stagger={80} animation="fade-up" className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            {[
              { step: "1", title: "We Review Your Inquiry", desc: "Within one business day, a senior team member reviews your message and prepares for a productive conversation." },
              { step: "2", title: "Discovery Call", desc: "We schedule a call to understand your business, goals, competitive landscape, and current marketing efforts." },
              { step: "3", title: "Custom Proposal", desc: "You receive a tailored strategy recommendation with clear deliverables, timelines, and investment options." },
            ].map((item) => (
              <div key={item.step} className="bg-white border border-gray-200 p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none">
                <div className="w-10 h-10 bg-black text-white flex items-center justify-center font-bold text-base mb-4">{item.step}</div>
                <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black mb-3">{item.title}</h3>
                <p className="text-base text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-16" aria-label="Common questions about working with us">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Common Questions</SectionLabel>
            <SectionTitle>Before You Reach Out</SectionTitle>
          </Animate>
          <Stagger stagger={60} animation="fade-up" className="mt-10 space-y-4">
            {[
              { q: "Is the initial consultation free?", a: "Yes. Our discovery call is completely free with no obligation. We use it to understand your goals, assess fit, and outline how we could help." },
              { q: "How quickly can you start?", a: "Most projects can kick off within one to two weeks of signing. Urgent projects may start sooner depending on scope and team availability." },
              { q: "Do you require long-term contracts?", a: "We offer both project-based and retainer engagements. Retainers typically run on a month-to-month basis after an initial commitment period." },
              { q: "What industries do you work with?", a: "We serve over 20 industries including e-commerce, healthcare, real estate, SaaS, professional services, hospitality, and more. Our strategies are tailored to each vertical." },
              { q: "Can you work with our existing team?", a: "Absolutely. We frequently collaborate with in-house marketing teams, acting as an extension to fill skill gaps or provide specialist expertise." },
              { q: "How do you measure success?", a: "We establish clear KPIs at the start of every engagement and report on them regularly. Metrics are tied to business outcomes, not vanity numbers." },
            ].map((faq) => (
              <details key={faq.q} className="group border border-gray-200 bg-white">
                <summary className="flex items-center justify-between cursor-pointer px-6 py-5 text-base font-bold text-black hover:bg-gray-50 transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                  {faq.q}
                  <span className="ml-4 text-gray-400 group-open:rotate-45 transition-transform text-xl leading-none">+</span>
                </summary>
                <div className="px-6 pb-5 text-base text-gray-600 leading-relaxed">{faq.a}</div>
              </details>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Social channels */}
      <section className="px-6 lg:px-12 py-10 bg-gray-50" aria-label="Social channels">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">Connect With Us</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {SOCIAL_LINKS.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-gray-200 bg-white px-4 py-3 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" dangerouslySetInnerHTML={{ __html: s.icon }} />
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-12" aria-label="Explore more">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <p className="text-base text-gray-500 mb-4">Not ready to reach out yet? Explore these resources:</p>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Client Onboarding", href: "/onboarding" },
                { label: "Pricing", href: "/pricing" },
                { label: "Our Process", href: "/process" },
                { label: "FAQ", href: "/faq" },
                { label: "Service Finder Quiz", href: "/services/finder" },
                { label: "ROI Calculator", href: "/resources/roi-calculator" },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="border border-gray-200 px-5 py-3 text-base font-medium text-black hover:bg-black hover:text-white transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                  {link.label}
                </Link>
              ))}
            </div>
          </Animate>
        </div>
      </section>
    </article>
  );
}
