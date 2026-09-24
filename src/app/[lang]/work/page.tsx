import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { SOCIAL_LINKS, SOCIAL_URLS } from "@/lib/social";

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
  { client: "MeezoTech", industry: "Technology", services: "Branding, Motion Design", desc: "Technology brand identity and animated logo work.", href: "/work/meezotech" },
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
    client: "One Homes",
    industry: "Real Estate",
    services: "Video Production",
    desc: "Cinematic property walkthrough for the premium Amaya Residences development.",
    href: "/work/one-homes",
  },
  {
    client: "Elite",
    industry: "Various",
    services: "Website Development, Social Media",
    desc: "Website development and social media content as a cohesive digital package.",
    href: "/work/elite",
  },
  {
    client: "Pur Health",
    industry: "Healthcare",
    services: "Website Development, Social Media",
    desc: "Professional digital presence for a healthcare and wellness brand.",
    href: "/work/pur-health",
  },
  {
    client: "American Auto Parts",
    industry: "Automotive",
    services: "Video Production",
    desc: "Long-standing creative partnership producing professional video content for the automotive aftermarket.",
    href: "/work/american-auto-parts",
  },
];

const creativePortfolio = [
  {
    title: "Fashion Feed",
    category: "Fashion & Lifestyle",
    image: "/images/portfolio/behance/fashion.jpg",
    href: "/work/fashion-feed",
    behanceUrl: "https://www.behance.net/gallery/228648529/Fashion",
  },
  {
    title: "Social Media Designs",
    category: "Social Media",
    image: "/images/portfolio/behance/social-media-designs.jpg",
    href: "/work/social-media-designs",
    behanceUrl: "https://www.behance.net/gallery/228353933/Social-Media-Designs",
  },
  {
    title: "FoodFolio",
    category: "Food & Beverage",
    image: "/images/portfolio/behance/foodfolio.jpg",
    href: "/work/foodfolio",
    behanceUrl: "https://www.behance.net/gallery/228262243/FoodFolio",
  },
  {
    title: "LogoFolio",
    category: "Branding & Identity",
    image: "/images/portfolio/behance/logofolio.jpg",
    href: "/work/logo-folio",
    behanceUrl: "https://www.behance.net/gallery/226405873/LogoFolio",
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
    provider: {
      "@type": "Organization",
      name: "Markit Media",
      url: "https://themarkitmedia.com",
      sameAs: SOCIAL_URLS,
    },
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
      <section className="px-6 lg:px-12 pt-24 pb-16" aria-label="Our work">
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
        </div>
      </section>

      {/* Featured Projects */}
      <section className="px-6 lg:px-12 py-20" aria-label="Featured projects">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Featured Projects</SectionLabel>
            <SectionTitle>Selected Client Work</SectionTitle>
            <SectionDesc>These featured projects are also indexed in our Case Studies collection, where work is organized by industry and service.</SectionDesc>
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
          <Animate animation="fade-up" delay={100}>
            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 pt-8">
              <p className="text-gray-500 max-w-2xl">Want the project context rather than only the visual portfolio? Browse the connected case-study collection.</p>
              <Link href="/case-studies" className="inline-flex items-center bg-black text-white px-6 py-3 font-bold hover:bg-gray-800">Explore Case Studies →</Link>
            </div>
          </Animate>
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

      {/* Creative Portfolio from Behance */}
      <section className="px-6 lg:px-12 py-20" aria-label="Creative portfolio">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Creative Portfolio</SectionLabel>
            <SectionTitle>Design &amp; Creative Work</SectionTitle>
            <SectionDesc>
              A selection of our graphic design, branding, and creative work across industries.
            </SectionDesc>
          </Animate>
          <Stagger stagger={80} animation="fade-up" className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {creativePortfolio.map((item) => (
              <Link key={item.title} href={item.href} className="group block overflow-hidden border border-gray-200 hover:border-black/30 hover:shadow-lg transition-all motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                <div className="relative aspect-[16/10] bg-gray-100">
                  <Image
                    src={item.image}
                    alt={`${item.title} — ${item.category}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-500 motion-reduce:transition-none"
                  />
                </div>
                <div className="p-6">
                  <span className="text-base text-gray-400 font-medium">{item.category}</span>
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black group-hover:underline mt-1">{item.title}</h3>
                  <span className="text-base text-gray-400 mt-2 inline-block">View Project &rarr;</span>
                </div>
              </Link>
            ))}
          </Stagger>
          <div className="text-center mt-8">
            <a href="https://www.behance.net/themarkitmedia" target="_blank" rel="noopener noreferrer" className="inline-block border border-gray-200 px-8 py-4 text-base font-bold text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
              View Full Portfolio on Behance &rarr;
            </a>
          </div>
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
          <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">Follow Our Work</h2>
          <p className="text-base text-gray-500 mb-6">See the full library of client showcases, behind-the-scenes content, and creative work across platforms.</p>
          <div className="flex flex-wrap justify-center gap-3">
            {SOCIAL_LINKS.map((s) => {
              const brand: Record<string,{bg:string;logo:string}> = {
                YouTube:{bg:"bg-[#FF0000]",logo:"https://cdn.simpleicons.org/youtube/FFFFFF"},
                Instagram:{bg:"bg-[#E4405F]",logo:"https://cdn.simpleicons.org/instagram/FFFFFF"},
                LinkedIn:{bg:"bg-[#0A66C2]",logo:"https://cdn.simpleicons.org/linkedin/FFFFFF"},
                Facebook:{bg:"bg-[#1877F2]",logo:"https://cdn.simpleicons.org/facebook/FFFFFF"},
                Behance:{bg:"bg-[#1769FF]",logo:"https://cdn.simpleicons.org/behance/FFFFFF"},
                WhatsApp:{bg:"bg-[#25D366]",logo:"https://cdn.simpleicons.org/whatsapp/FFFFFF"},
              };
              return <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`Follow Markit Media on ${s.label}`}
                className={`inline-flex items-center gap-2 px-4 py-3 text-base font-bold border ${brand[s.label] ? brand[s.label].bg+" text-white border-transparent" : "bg-white text-black border-gray-200"} hover:-translate-y-0.5 hover:shadow-md transition-all focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2`}>
                {brand[s.label] ? <img src={brand[s.label].logo} alt="" width="20" height="20" className="w-5 h-5 object-contain"/> : <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" dangerouslySetInnerHTML={{ __html: s.icon }} />}{s.label}
              </a>
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-12 py-24 bg-black text-white text-center" aria-label="Start a project">
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
