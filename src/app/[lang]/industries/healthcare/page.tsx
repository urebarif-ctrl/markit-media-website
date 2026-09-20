import type { Metadata } from "next";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Heart, Search, MousePointerClick, Globe, Shield, Users, FileText } from "lucide-react";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Digital Marketing for Healthcare",
  description:
    "HIPAA-compliant digital marketing for clinics, dental practices, med spas, and healthcare providers. Medical SEO, PPC, reputation management, and patient-focused web design.",
  alternates: { canonical: "https://themarkitmedia.com/en/industries/healthcare" },
  openGraph: {
    title: "Digital Marketing for Healthcare",
    description: "HIPAA-compliant digital marketing for clinics, dental practices, med spas, and healthcare providers. Medical SEO, PPC, reputation management, and patien...",
  },
};

const services: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Search,
    title: "Medical SEO",
    desc: "Rank for the conditions and treatments your patients search for. We optimize for local and specialty-specific keywords to drive qualified patient inquiries.",
  },
  {
    icon: MousePointerClick,
    title: "PPC for Healthcare",
    desc: "Targeted Google Ads campaigns designed around healthcare advertising policies. Reach patients actively searching for providers in your area.",
  },
  {
    icon: Globe,
    title: "Website Development",
    desc: "Fast, accessible, mobile-first websites built for healthcare providers. Clear calls to action, online booking integrations, and ADA-compliant design.",
  },
  {
    icon: Shield,
    title: "Reputation Management",
    desc: "Monitor and respond to patient reviews across Google, Healthgrades, and other platforms. Build the online trust that drives new patient decisions.",
  },
  {
    icon: Users,
    title: "Content Marketing",
    desc: "Educational blog posts, service pages, and patient resources that establish your practice as a trusted authority in your specialty.",
  },
  {
    icon: FileText,
    title: "HIPAA-Compliant Digital Strategy",
    desc: "Every campaign, form, and tracking pixel reviewed for HIPAA compliance. We help you market effectively without putting patient data at risk.",
  },
];

const challenges = [
  {
    title: "HIPAA Compliance in Marketing",
    desc: "Healthcare marketing must protect patient privacy at every touchpoint. From ad targeting to form submissions, compliance requirements add complexity that most agencies overlook.",
  },
  {
    title: "Building Patient Trust Online",
    desc: "Patients research providers extensively before booking. Your digital presence needs to communicate expertise, empathy, and credibility across every channel.",
  },
  {
    title: "Competing with Large Hospital Systems",
    desc: "Independent practices and smaller groups often compete against hospital networks with significant marketing budgets. Smart digital strategy helps level the playing field.",
  },
  {
    title: "Managing Online Reviews",
    desc: "A single negative review can deter prospective patients. Proactive review management and response strategies are essential for maintaining a strong reputation.",
  },
  {
    title: "Navigating Advertising Restrictions",
    desc: "Healthcare advertising on Google and social platforms is subject to strict policies. Campaigns must be structured to meet platform requirements while still reaching the right audience.",
  },
];

const faq = [
  {
    q: "How do you ensure HIPAA compliance in digital marketing?",
    a: "We review every element of your marketing infrastructure for HIPAA compliance, including contact forms, tracking scripts, ad pixels, and email workflows. We use HIPAA-compliant tools and ensure that no protected health information is collected or transmitted through marketing channels without proper safeguards.",
  },
  {
    q: "Which healthcare specialties do you work with?",
    a: "We work with a range of healthcare providers including dental practices, med spas, dermatology clinics, orthopedic groups, mental health practices, urgent care centers, and multi-location medical groups. Our strategies are tailored to the specific patient journey and competitive landscape of each specialty.",
  },
  {
    q: "How long does it take to see results from medical SEO?",
    a: "Medical SEO is a long-term strategy. Most practices begin to see improvements in local search visibility within three to six months, with results compounding over time as your site builds authority. PPC campaigns can generate patient inquiries much sooner, often within the first few weeks.",
  },
  {
    q: "Can you help with online reputation and review management?",
    a: "Yes. We set up review monitoring across major healthcare platforms, create response templates that comply with HIPAA, and develop strategies to encourage satisfied patients to share their experiences. A strong review profile is one of the most important factors in attracting new patients.",
  },
];

export default function HealthcarePage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Digital Marketing for Healthcare",
    description:
      "HIPAA-compliant digital marketing services for clinics, dental practices, med spas, and healthcare providers. Medical SEO, PPC, reputation management, and patient-focused web design.",
    provider: {
      "@type": "Organization",
      name: "Markit Media",
      url: "https://themarkitmedia.com",
    },
    areaServed: [
      "United States",
      "Canada",
      "United Arab Emirates",
      "United Kingdom",
      "Australia",
      "Saudi Arabia",
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <article>
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Industries", href: "/industries" },
          { label: "Healthcare" },
        ]}
      />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
          <Animate animation="fade-up">
            <div className="w-16 h-16 bg-black text-white flex items-center justify-center mb-6">
              <Heart size={28} strokeWidth={2} aria-hidden="true" />
            </div>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1]">
              Digital Marketing for Healthcare
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-6">
              Patients search online before choosing a provider. We help clinics,
              dental practices, med spas, and healthcare organizations build a
              digital presence that earns trust, attracts the right patients, and
              stays fully compliant with HIPAA regulations.
            </p>
          </Animate>
          <Animate animation="fade-up" delay={200}>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 font-bold text-base hover:bg-gray-800 transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                Get a Free Consultation &rarr;
              </Link>
            </div>
          </Animate>
          </div>
          <Animate animation="fade-in" delay={200}>
            <img src="/images/industries/healthcare.svg" alt="" className="w-full aspect-[4/3] object-cover" />
          </Animate>
        </div>
      </section>

      {/* Services */}
      <section className="px-6 lg:px-12 py-20 bg-gray-50" aria-label="Services">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>What We Offer</SectionLabel>
            <SectionTitle>Marketing Services for Healthcare</SectionTitle>
          </Animate>
          <Stagger
            stagger={60}
            animation="fade-up"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
          >
            {services.map((svc) => (
              <div key={svc.title} className="bg-white border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none">
                <div className="w-10 h-10 bg-black text-white flex items-center justify-center mb-4">
                  <svc.icon size={20} strokeWidth={2} aria-hidden="true" />
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black uppercase tracking-wide mb-2">
                  {svc.title}
                </h3>
                <p className="text-base text-gray-500 leading-relaxed">{svc.desc}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Challenges */}
      <section className="px-6 lg:px-12 py-20" aria-label="Industry challenges">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Industry Challenges</SectionLabel>
            <SectionTitle>Common Pain Points</SectionTitle>
            <SectionDesc>
              Healthcare marketing comes with unique regulatory and competitive
              pressures. Understanding these challenges is the first step toward a
              strategy that works.
            </SectionDesc>
          </Animate>
          <ul className="mt-10 space-y-4">
            {challenges.map((c, i) => (
              <Animate key={i} animation="fade-up" delay={i * 50}>
                <li className="flex items-start gap-4 py-3 border-b border-gray-200">
                  <span className="w-8 h-8 bg-black text-white flex items-center justify-center flex-shrink-0 text-base font-bold">
                    {i + 1}
                  </span>
                  <div>
                    <span className="text-base font-bold text-black">{c.title}</span>
                    <p className="text-base text-gray-500 leading-relaxed mt-1">
                      {c.desc}
                    </p>
                  </div>
                </li>
              </Animate>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 lg:px-12 py-20 bg-gray-50" aria-label="FAQ">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>FAQ</SectionLabel>
            <SectionTitle>Common Questions</SectionTitle>
          </Animate>
          <div className="mt-10">
            {faq.map((item, i) => (
              <Animate key={i} animation="fade-up" delay={i * 50}>
                <details className="group border-b border-gray-200">
                  <summary className="flex justify-between items-center py-5 cursor-pointer text-base font-bold text-black list-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                    {item.q}
                    <span
                      className="text-xl text-gray-500 group-open:rotate-45 transition-transform flex-shrink-0 ml-4"
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </summary>
                  <div className="pb-5 text-base text-gray-500 leading-relaxed">
                    {item.a}
                  </div>
                </details>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Ready to Grow Your Healthcare Practice?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s build a compliant, patient-focused marketing strategy that
              fills your schedule with the right patients.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none"
            >
              Get a Free Consultation &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    </article>
  );
}
