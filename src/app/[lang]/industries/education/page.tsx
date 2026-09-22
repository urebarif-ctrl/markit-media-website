import type { Metadata } from "next";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import {
  GraduationCap,
  Search,
  MousePointerClick,
  Share2,
  Globe,
  BookOpen,
  Mail,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Digital Marketing for Education",
  description:
    "Marketing strategies for educational institutions including schools, universities, online courses, and EdTech companies. SEO, PPC, social media, and enrollment marketing.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/industries/education",
  },
  openGraph: {
    title: "Digital Marketing for Education",
    description: "Marketing strategies for educational institutions including schools, universities, online courses, and EdTech companies. SEO, PPC, social media, and enr...",
  },
};

const services: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Search,
    title: "SEO",
    desc: "Help educational institutions rank for program-specific and location-based search queries so prospective students find you first.",
  },
  {
    icon: MousePointerClick,
    title: "PPC / Google Ads",
    desc: "Targeted campaigns during enrollment windows to reach prospective students and parents actively searching for programs.",
  },
  {
    icon: Share2,
    title: "Social Media",
    desc: "Engage prospective students and parents on the platforms where they spend time, showcasing campus life and academic programs.",
  },
  {
    icon: Globe,
    title: "Website Development",
    desc: "Modern, accessible websites that guide visitors from interest to enrollment with clear calls to action and intuitive navigation.",
  },
  {
    icon: BookOpen,
    title: "Content Marketing",
    desc: "Articles, guides, and resources that position your institution as a thought leader and answer questions prospective students have.",
  },
  {
    icon: Mail,
    title: "Email Marketing",
    desc: "Nurture prospective students through the enrollment journey with timely, relevant communications that move them toward application.",
  },
];

const challenges = [
  {
    title: "Enrollment competition",
    desc: "Prospective students compare multiple institutions online. Standing out requires a strong digital presence and clear differentiation.",
  },
  {
    title: "Reaching multiple audiences",
    desc: "Marketing must speak to students, parents, guidance counselors, and alumni — each with different priorities and preferred channels.",
  },
  {
    title: "Showcasing outcomes",
    desc: "Students want to know what happens after graduation. Marketing must communicate career outcomes, alumni paths, and program value without fabricating data.",
  },
  {
    title: "Adapting to digital-first research",
    desc: "The majority of prospective students begin their search online. Institutions that lack a strong digital strategy lose applicants before the first campus visit.",
  },
  {
    title: "Brand differentiation",
    desc: "Many institutions offer similar programs. Marketing needs to clearly communicate what makes your school, courses, or platform different.",
  },
];

const faq = [
  {
    q: "What marketing channels are most effective for educational institutions?",
    a: "SEO and PPC are typically the foundation — prospective students search for programs, rankings, and campus information on Google. Social media helps build community and showcase student life. Email marketing is essential for nurturing leads through the enrollment funnel, which can span weeks or months.",
  },
  {
    q: "How can we market to both students and parents effectively?",
    a: "By creating distinct messaging tracks. Students respond to content about campus culture, career outcomes, and program flexibility. Parents look for information about cost, safety, accreditation, and support services. Segmented email campaigns and targeted ad groups allow you to speak to each audience on their terms.",
  },
  {
    q: "When should enrollment marketing campaigns start?",
    a: "Enrollment marketing should run year-round at varying intensity. Awareness campaigns should begin 12 to 18 months before enrollment deadlines, with campaign intensity increasing as deadlines approach. Retargeting and email nurture sequences keep your institution top-of-mind during the decision phase.",
  },
  {
    q: "How important is a website for student recruitment?",
    a: "Your website is often the first impression a prospective student has of your institution. It needs to be fast, mobile-friendly, and easy to navigate. Clear calls to action — apply, request info, schedule a visit — should be prominent. A confusing or outdated website can lose an applicant before they ever reach out.",
  },
  {
    q: "How do you measure the success of education marketing?",
    a: "Key metrics include inquiry volume, application starts, application completions, cost per inquiry, and cost per enrolled student. We also track website engagement, email open and click rates, and ad campaign performance to continuously optimize the funnel.",
  },
];

export default function EducationPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Digital Marketing for Education",
    description:
      "Marketing strategies for educational institutions including schools, universities, online courses, and EdTech companies.",
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
          { label: "Education" },
        ]}
      />

      {/* Hero */}
      <section aria-label="Page header" className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
          <Animate animation="fade-up">
            <div className="w-16 h-16 bg-black text-white flex items-center justify-center mb-6">
              <GraduationCap size={28} strokeWidth={2} aria-hidden="true" />
            </div>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1]">
              Digital Marketing for Education
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-6">
              Schools, universities, online courses, EdTech &mdash; no matter
              the format, prospective students and parents start their search
              online. We help educational institutions get found, build trust,
              and turn interest into enrollment.
            </p>
          </Animate>
          <Animate animation="fade-up" delay={200}>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 font-bold text-base hover:bg-gray-800 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                Get a Free Consultation &rarr;
              </Link>
            </div>
          </Animate>
          </div>
          <Animate animation="fade-in" delay={200}>
            <img src="/images/industries/education.svg" alt="Education marketing services" className="w-full aspect-[4/3] object-cover" />
          </Animate>
        </div>
      </section>

      {/* Services */}
      <section className="px-6 lg:px-12 py-20 bg-gray-50" aria-label="Services">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>What We Offer</SectionLabel>
            <SectionTitle>
              Marketing Services for Educational Institutions
            </SectionTitle>
          </Animate>
          <Stagger stagger={60} animation="fade-up" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {services.map((svc) => (
              <div key={svc.title} className="bg-white border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none">
                <div className="w-10 h-10 bg-black text-white flex items-center justify-center mb-4">
                  <svc.icon size={20} strokeWidth={2} aria-hidden="true" />
                </div>
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

      {/* Challenges */}
      <section className="px-6 lg:px-12 py-20" aria-label="Industry challenges">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Industry Challenges</SectionLabel>
            <SectionTitle>Common Pain Points</SectionTitle>
            <SectionDesc>
              Educational institutions face unique marketing challenges. Here are
              the problems we solve every day.
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
                    <span className="text-base font-bold text-black">
                      {c.title}
                    </span>
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
                    <span className="text-xl text-gray-500 group-open:rotate-45 transition-transform motion-reduce:transition-none flex-shrink-0 ml-4" aria-hidden="true">
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
      <section aria-label="Call to action" className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Ready to Grow Your Enrollment?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s build a marketing strategy that connects you with the
              right students and fills your programs.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              Get a Free Consultation &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    </article>
  );
}
