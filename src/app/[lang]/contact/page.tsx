import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { ContactForm } from "./contact-form";
import { Mail, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Markit Media for a free consultation. We serve clients across the USA, Canada, UAE, UK, Australia, and Saudi Arabia.",
  alternates: { canonical: "https://themarkitmedia.com/en/contact" },
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
    },
  };

  return (
    <article>
      <JsonLd data={contactSchema} />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />

      <section className="px-6 lg:px-12 pt-24 pb-20">
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
                      <a href="mailto:ciao@themarkitmedia.com" className="text-base text-gray-500 hover:text-black transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
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
              <div key={item.step} className="bg-white border border-gray-200 p-8">
                <div className="w-10 h-10 bg-black text-white flex items-center justify-center font-bold text-base mb-4">{item.step}</div>
                <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black mb-3">{item.title}</h3>
                <p className="text-base text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-12" aria-label="Explore more">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <p className="text-base text-gray-500 mb-4">Not ready to reach out yet? Explore these resources:</p>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Our Approach", href: "/approach" },
                { label: "Our Process", href: "/process" },
                { label: "FAQ", href: "/faq" },
                { label: "Service Finder Quiz", href: "/services/finder" },
                { label: "ROI Calculator", href: "/resources/roi-calculator" },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="border border-gray-200 px-5 py-3 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
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
