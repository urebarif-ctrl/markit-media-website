import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join Markit Media. We are looking for talented marketers, designers, developers, and strategists to help businesses grow across 7 countries.",
  alternates: { canonical: "https://themarkitmedia.com/en/careers" },
};

const perks = [
  { title: "Remote-Friendly", desc: "Work from anywhere. We care about output, not office hours." },
  { title: "Global Clients", desc: "Work with businesses across the USA, Canada, UAE, UK, Australia, and Saudi Arabia." },
  { title: "Direct Impact", desc: "Your work directly drives client results. No layers of bureaucracy between you and the outcome." },
  { title: "Growth Budget", desc: "Continuous learning opportunities. Courses, conferences, and certifications." },
  { title: "Senior Culture", desc: "Work alongside experienced professionals. We hire people who push each other forward." },
  { title: "Fair Compensation", desc: "Competitive pay that reflects your experience and contribution." },
];

const departments = [
  { name: "Performance Marketing", roles: "Google Ads, Meta Ads, TikTok Ads, programmatic, and media buying." },
  { name: "SEO & Content", roles: "Technical SEO, content strategy, copywriting, and link building." },
  { name: "Development", roles: "Next.js, WordPress, Shopify, and custom web applications." },
  { name: "Creative & Design", roles: "Brand identity, UI/UX, motion graphics, video production, and art direction." },
  { name: "Strategy & Analytics", roles: "Marketing strategy, data analytics, CRM consulting, and client leadership." },
];

export default function CareersPage() {
  const careersSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Careers at Markit Media",
    description: "Join our team of digital marketing professionals.",
  };

  return (
    <article>
      <JsonLd data={careersSchema} />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Careers" }]} />

      <section className="px-6 lg:px-12 pt-24 pb-20">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Careers</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Do Your Best Work Here
            </h1>
            <SectionDesc>
              We hire people who care about results, think strategically, and want to work on challenging problems with talented teammates. No bureaucracy. No busywork. Just real impact.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-gray-50" aria-label="What we offer">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Why Join Us</SectionLabel>
            <SectionTitle>What You Get</SectionTitle>
          </Animate>
          <Stagger stagger={80} animation="fade-up" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {perks.map((perk) => (
              <div key={perk.title} className="bg-white p-8 border border-gray-200">
                <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black mb-3">{perk.title}</h3>
                <p className="text-base text-gray-500 leading-relaxed">{perk.desc}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20" aria-label="Departments">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Teams</SectionLabel>
            <SectionTitle>Where You Could Fit</SectionTitle>
            <SectionDesc>
              We hire across every function of digital marketing. Here are the departments we build around.
            </SectionDesc>
          </Animate>
          <div className="mt-12 space-y-0">
            {departments.map((dept, i) => (
              <Animate key={dept.name} animation="fade-up" delay={i * 60}>
                <div className="flex flex-col md:flex-row gap-6 py-8 border-b border-gray-200">
                  <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black w-56 flex-shrink-0">{dept.name}</h3>
                  <p className="text-base text-gray-500 leading-relaxed">{dept.roles}</p>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-gray-50" aria-label="What we look for">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Culture</SectionLabel>
            <SectionTitle>What We Look For</SectionTitle>
          </Animate>
          <Stagger stagger={60} animation="fade-up" className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {[
              { title: "Ownership", desc: "You take responsibility for outcomes, not just tasks. You see problems and fix them without being asked." },
              { title: "Curiosity", desc: "Digital marketing changes fast. You stay sharp by testing, reading, and questioning conventional wisdom." },
              { title: "Clarity", desc: "You communicate directly. You can explain complex ideas simply, to clients and colleagues alike." },
              { title: "Craft", desc: "You care about the quality of your work. Details matter. Good enough isn't." },
            ].map((item) => (
              <div key={item.title} className="bg-white p-8 border border-gray-200">
                <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black mb-3">{item.title}</h3>
                <p className="text-base text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-12" aria-label="Learn more">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <p className="text-base text-gray-500 mb-4">Learn more about who we are and how we work:</p>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "About Us", href: "/about" },
                { label: "Our Approach", href: "/approach" },
                { label: "Our Process", href: "/process" },
                { label: "Why Markit Media", href: "/why-markit-media" },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="border border-gray-200 px-5 py-3 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                  {link.label}
                </Link>
              ))}
            </div>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Ready to Apply?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Send us your resume and a brief note about what excites you about digital marketing. We review every application.
            </p>
            <a href="mailto:ciao@themarkitmedia.com?subject=Career%20Inquiry" className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
              Apply Now &rarr;
            </a>
          </Animate>
        </div>
      </section>
    </article>
  );
}
