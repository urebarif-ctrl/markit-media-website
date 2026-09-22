import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Our Work — Selected Projects & Portfolio",
  description: "Explore Markit Media's portfolio: video production, website development, branding, social media campaigns, and creative work for clients across multiple industries.",
  alternates: { canonical: "https://themarkitmedia.com/en/work" },
  openGraph: {
    title: "Our Work — Markit Media",
    description: "Portfolio of video production, website development, branding, social media campaigns, and creative work.",
  },
};

const featuredProjects = [
  {
    client: "NoorShad",
    industry: "Real Estate",
    services: "Video Production, Content Strategy",
    desc: "A multi-video production engagement including property tours, testimonials, and home buying guides.",
    href: "/work/noorshad",
  },
  {
    client: "Vuse",
    industry: "Consumer Goods",
    services: "Social Media, Video Production",
    desc: "Ongoing social media content production for a global consumer brand.",
    href: "/work/vuse",
  },
  {
    client: "Cambridge Electrical Appliances",
    industry: "Consumer Electronics",
    services: "Social Media, Seasonal Campaigns",
    desc: "Seasonal social media campaigns with summer and winter product reels.",
    href: "/work/cambridge-electrical",
  },
  {
    client: "Minhaz Couture",
    industry: "Fashion",
    services: "Website Development, Social Media",
    desc: "Full-stack digital delivery: custom website plus social media content for a fashion brand.",
    href: "/work/minhaz-couture",
  },
  {
    client: "HUBCO",
    industry: "Energy",
    services: "Branding, Video Production",
    desc: "Professional logo animation and commercial video production for a major energy company.",
    href: "/work/hubco",
  },
  {
    client: "American Auto Parts",
    industry: "Automotive",
    services: "Video Production",
    desc: "Long-standing creative partnership producing professional video content for the automotive aftermarket.",
    href: "/work/american-auto-parts",
  },
];

const clientLogos = [
  "NoorShad", "Vuse", "Cambridge Electrical", "HUBCO", "MeezoTech",
  "One Homes", "Minhaz Couture", "Pur Health", "Elite",
  "My Fresh Fruits", "Yaar Bazaar", "American Auto Parts",
];

const serviceCategories = [
  {
    title: "Video Production",
    desc: "Commercials, property tours, reels, motion graphics, and animation.",
    clients: ["NoorShad", "HUBCO", "Vuse", "American Auto Parts", "One Homes"],
    href: "/services/video-production",
  },
  {
    title: "Website Development",
    desc: "Custom websites for fashion, healthcare, technology, and more.",
    clients: ["Minhaz Couture", "Pur Health", "Elite"],
    href: "/services/website-development",
  },
  {
    title: "Branding & Logo Design",
    desc: "Logo design, animation, and brand identity systems.",
    clients: ["HUBCO", "MeezoTech", "My Fresh Fruits", "Pakhlanze", "Chefiality", "Easy Wear"],
    href: "/work/logo-folio",
  },
  {
    title: "Social Media Campaigns",
    desc: "Strategy, reels, seasonal campaigns, and community management.",
    clients: ["Cambridge Electrical", "Vuse", "The Saari Girl", "Workout Gym & Studio"],
    href: "/services/social-media",
  },
  {
    title: "Photography & PR",
    desc: "Professional photography, event coverage, and public relations.",
    clients: [],
    href: "/services/photography",
  },
];

const celebrityProjects = [
  { name: "Vivek Oberoi", type: "Video production and editing" },
  { name: "Natasha Suri", type: "Video production" },
  { name: "Kamran Tessori", type: "Video content" },
  { name: "Junaid Khan", type: "Video content" },
  { name: "Shahid Afridi Foundation", type: "Video production" },
  { name: "Tanweer Ahmed", type: "Documentary production" },
];

const faqItems = [
  { q: "What industries do you work with?", a: "We work across 20+ industries including real estate, fashion, consumer electronics, energy, automotive, healthcare, FMCG, and more. See our Industries page for the full list." },
  { q: "Can I see more examples of your work?", a: "Yes — visit our YouTube channel for the full library of client work, or explore individual project pages linked above. For industry-specific examples, contact us directly." },
  { q: "Do you work with startups or only established businesses?", a: "Both. We work with startups looking to establish their digital presence and established businesses looking to scale their marketing." },
  { q: "How do I start a project?", a: "Contact us for a free consultation. We'll discuss your goals, timeline, and budget, then provide a proposal tailored to your needs." },
];

export default function WorkPage() {
  const workSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Markit Media — Selected Work",
    description: "Portfolio of video production, website development, branding, and social media work by Markit Media.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <article>
      <JsonLd data={workSchema} />
      <JsonLd data={faqSchema} />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Work" }]} />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Selected Work</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Results That Speak for Themselves
            </h1>
            <SectionDesc>
              We help businesses grow through strategic digital marketing, compelling creative, and data-driven execution. Explore our selected projects below.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* Brands We've Worked With */}
      <section className="px-6 lg:px-12 py-12 bg-gray-50" aria-label="Brands we've worked with">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black text-center mb-8">
              Brands We&apos;ve Worked With
            </h2>
          </Animate>
          <Stagger stagger={40} animation="fade-up" className="flex flex-wrap justify-center gap-6">
            {clientLogos.map((name) => (
              <div key={name} className="bg-white border border-gray-200 px-6 py-4 text-base font-bold text-black/70 hover:text-black transition-colors">
                {name}
              </div>
            ))}
          </Stagger>
          <p className="text-base text-gray-400 text-center mt-6">
            Original client logos available on request. Placeholders shown.
          </p>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="px-6 lg:px-12 py-20" aria-label="Featured projects">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Featured Projects</SectionLabel>
            <SectionTitle>Selected Case Studies</SectionTitle>
          </Animate>
          <Stagger stagger={80} animation="fade-up" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {featuredProjects.map((project) => (
              <Link key={project.href} href={project.href} className="group bg-white border border-gray-200 overflow-hidden hover:border-black/30 hover:shadow-lg transition-all motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                <div className="aspect-[16/10] bg-gray-100 flex items-center justify-center">
                  <div className="text-center px-6">
                    <p className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black">{project.client}</p>
                    <p className="text-base text-gray-400 mt-1">{project.industry}</p>
                  </div>
                </div>
                <div className="p-6">
                  <span className="text-base text-gray-400 font-medium">{project.services}</span>
                  <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black group-hover:underline mt-2 mb-2">{project.client}</h3>
                  <p className="text-base text-gray-500 leading-relaxed">{project.desc}</p>
                </div>
              </Link>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Work by Service */}
      <section className="px-6 lg:px-12 py-20 bg-gray-50" aria-label="Work by service">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>By Service</SectionLabel>
            <SectionTitle>Work Organized by Expertise</SectionTitle>
          </Animate>
          <Stagger stagger={60} animation="fade-up" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {serviceCategories.map((cat) => (
              <Link key={cat.title} href={cat.href} className="group bg-white border border-gray-200 p-8 hover:border-black/30 hover:shadow-lg transition-all motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black group-hover:underline mb-2">{cat.title}</h3>
                <p className="text-base text-gray-500 leading-relaxed mb-4">{cat.desc}</p>
                {cat.clients.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {cat.clients.map((c) => (
                      <span key={c} className="text-base text-gray-400 border border-gray-100 px-2 py-0.5">{c}</span>
                    ))}
                  </div>
                )}
              </Link>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Celebrity & High-Profile Projects */}
      <section className="px-6 lg:px-12 py-16" aria-label="High-profile projects">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Selected Productions</SectionLabel>
            <SectionTitle>High-Profile Projects</SectionTitle>
            <SectionDesc>
              Video production, editing, and digital content for notable personalities and organizations.
            </SectionDesc>
          </Animate>
          <Stagger stagger={60} animation="fade-up" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-10">
            {celebrityProjects.map((p) => (
              <div key={p.name} className="bg-white border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black">{p.name}</h3>
                <p className="text-base text-gray-500 mt-1">{p.type}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Logo Folio Preview */}
      <section className="px-6 lg:px-12 py-16 bg-gray-50" aria-label="Logo folio">
        <div className="max-w-4xl mx-auto text-center">
          <Animate animation="fade-up">
            <SectionLabel>Branding</SectionLabel>
            <SectionTitle>Logo Folio</SectionTitle>
            <SectionDesc>
              A selection of our logo design and animation work across industries.
            </SectionDesc>
            <Link href="/work/logo-folio" className="inline-block mt-6 bg-black text-white font-bold px-8 py-4 text-base hover:bg-gray-800 transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
              View Logo Folio &rarr;
            </Link>
          </Animate>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 lg:px-12 py-16" aria-label="Work FAQ">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>FAQ</SectionLabel>
            <SectionTitle>Common Questions</SectionTitle>
          </Animate>
          <div className="mt-10">
            {faqItems.map((item, i) => (
              <Animate key={i} animation="fade-up" delay={i * 50}>
                <details className="group border-b border-gray-200">
                  <summary className="flex justify-between items-center py-5 cursor-pointer text-base font-bold text-black list-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                    {item.q}
                    <span className="text-xl text-gray-500 group-open:rotate-45 transition-transform motion-reduce:transition-none flex-shrink-0 ml-4" aria-hidden="true">+</span>
                  </summary>
                  <div className="pb-5 text-base text-gray-500 leading-relaxed">{item.a}</div>
                </details>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* Social CTA */}
      <section className="px-6 lg:px-12 py-12 bg-gray-50" aria-label="Follow our work">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">Watch Our Projects on YouTube</h2>
          <p className="text-base text-gray-500 mb-6">See the full library of client showcases, behind-the-scenes content, and creative work.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://www.youtube.com/@themarkitmedia" target="_blank" rel="noopener noreferrer" className="border border-gray-200 px-5 py-3 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
              YouTube
            </a>
            <a href="https://www.instagram.com/themarkitmedia" target="_blank" rel="noopener noreferrer" className="border border-gray-200 px-5 py-3 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
              Instagram
            </a>
            <a href="https://www.linkedin.com/company/the-markit-media/" target="_blank" rel="noopener noreferrer" className="border border-gray-200 px-5 py-3 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
              LinkedIn
            </a>
            <a href="https://www.tiktok.com/@themarkitmedia_" target="_blank" rel="noopener noreferrer" className="border border-gray-200 px-5 py-3 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
              TikTok
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-12 py-24 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Let&apos;s Build Something Great
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Contact us for a free consultation. Let&apos;s discuss your next project.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="inline-block bg-white text-black font-bold px-8 py-4 text-base hover:bg-gray-100 transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
                Start a Project &rarr;
              </Link>
              <Link href="/get-a-quote" className="inline-block border-2 border-white text-white font-bold px-8 py-4 text-base hover:bg-white hover:text-black transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
                Get a Quote
              </Link>
            </div>
          </Animate>
        </div>
      </section>
    </article>
  );
}
