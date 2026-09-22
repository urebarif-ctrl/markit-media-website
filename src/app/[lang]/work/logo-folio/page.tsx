import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { YouTubeEmbed } from "@/components/youtube-embed";

export const metadata: Metadata = {
  title: "Logo Folio — Branding & Logo Animation Portfolio",
  description: "A selection of our logo design and animation work across energy, technology, F&B, fashion, and agency brands. Professional motion graphics and brand identity.",
  alternates: { canonical: "https://themarkitmedia.com/en/work/logo-folio" },
  openGraph: {
    title: "Logo Folio — Markit Media",
    description: "Logo design and animation portfolio showcasing identity work across multiple industries.",
  },
};

const logoProjects = [
  { client: "HUBCO", industry: "Energy", videoId: "CIr1dFqvmfM", desc: "Professional logo animation for a leading energy company." },
  { client: "MeezoTech", industry: "Technology", videoId: "OK4E1x-e6m8", desc: "Animated logo and showreel for a technology company." },
  { client: "Chefiality", industry: "F&B", videoId: "ouEaX5ysSuM", desc: "Animated logo design for a food and beverage brand." },
  { client: "Easy Wear", industry: "Fashion / Retail", videoId: "hpYLSo3kDNQ", desc: "Logo animation for a fashion and retail brand." },
  { client: "Pakhlanze", industry: "F&B", videoId: "T_Bmg4FVmSo", desc: "Bringing sweetness to life — brand animation." },
  { client: "My Fresh Fruits", industry: "F&B / Retail", videoId: "MLFuqpqidHQ", desc: "Animated logo design for a fresh produce retail brand." },
  { client: "MAXUM Agency", industry: "Agency", videoId: "NEsjHsAu9Xs", desc: "Fast animated video for a creative agency." },
];

export default function LogoFolioPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Logo Folio — Markit Media",
    description: "Branding and logo animation portfolio showcasing our identity design work.",
  };

  return (
    <article>
      <JsonLd data={schema} />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Work", href: "/work" }, { label: "Logo Folio" }]} />

      <section className="px-6 lg:px-12 pt-24 pb-12" aria-label="Logo Folio overview">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <span className="text-base font-medium text-gray-400 uppercase tracking-[0.15em]">Branding Portfolio</span>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Logo Folio
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-4 max-w-2xl">
              A selection of our logo design and animation work. Each project represents a unique brand identity brought to life through thoughtful design and professional motion graphics.
            </p>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-12" aria-label="Logo animations">
        <div className="max-w-7xl mx-auto">
          <Stagger stagger={80} animation="fade-up" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {logoProjects.map((project) => (
              <div key={project.client} className="bg-white border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                {project.videoId ? (
                  <YouTubeEmbed videoId={project.videoId} title={`${project.client} logo animation`} />
                ) : (
                  <div className="aspect-video bg-gray-100 flex items-center justify-center">
                    <div className="text-center px-6">
                      <p className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black">{project.client}</p>
                      <p className="text-base text-gray-400 mt-1">Logo Animation</p>
                    </div>
                  </div>
                )}
                <div className="p-6">
                  <span className="text-base text-gray-400 font-medium">{project.industry}</span>
                  <h2 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black mt-1">{project.client}</h2>
                  <p className="text-base text-gray-500 mt-2 leading-relaxed">{project.desc}</p>
                </div>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-12 bg-gray-50" aria-label="Our branding services">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-3">Need a Brand Identity?</h2>
          <p className="text-base text-gray-500 mb-6 max-w-2xl mx-auto">
            From logo design and animation to full brand identity systems, we create visual identities that differentiate and endure.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/services/branding" className="border border-gray-200 px-5 py-3 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
              Branding Services
            </Link>
            <Link href="/contact" className="bg-black text-white px-5 py-3 text-base font-bold hover:bg-gray-800 transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
              Get a Quote &rarr;
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-16 bg-black text-white text-center" aria-label="Explore more work">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
            See More of Our Work
          </h2>
          <p className="text-lg text-gray-400 mt-4 mb-8">
            Explore our full portfolio across platforms — client showcases, behind-the-scenes content, and design work.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://www.youtube.com/@themarkitmedia" target="_blank" rel="noopener noreferrer" className="inline-block bg-white text-black font-bold px-8 py-4 text-base hover:bg-gray-100 transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
              YouTube Channel &rarr;
            </a>
            <a href="https://www.behance.net/themarkitmedia" target="_blank" rel="noopener noreferrer" className="inline-block border-2 border-white text-white font-bold px-8 py-4 text-base hover:bg-white hover:text-black transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
              Behance Portfolio &rarr;
            </a>
            <a href="https://dribbble.com/themarkitmedia" target="_blank" rel="noopener noreferrer" className="inline-block border-2 border-white text-white font-bold px-8 py-4 text-base hover:bg-white hover:text-black transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
              Dribbble &rarr;
            </a>
          </div>
        </div>
      </section>
    </article>
  );
}
