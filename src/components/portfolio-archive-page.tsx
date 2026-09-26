import Image from "next/image";
import Link from "next/link";
import { Animate } from "@/components/animate";
import { Breadcrumb } from "@/components/breadcrumb";

interface PortfolioArchivePageProps {
  client: string;
  subtitle: string;
  note: string;
}

export function PortfolioArchivePage({ client, subtitle, note }: PortfolioArchivePageProps) {
  return (
    <article>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Work", href: "/work" }, { label: client }]} />

      <section className="px-6 lg:px-12 pt-24 pb-14">
        <div className="max-w-5xl mx-auto">
          <Animate animation="fade-up">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">Branding & Identity Portfolio</p>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.2rem,5vw,4rem)] font-extrabold tracking-tight mt-3">{client}</h1>
            <p className="text-lg md:text-xl text-gray-600 leading-8 mt-5 max-w-3xl">{subtitle}</p>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 pb-16">
        <div className="max-w-5xl mx-auto">
          <Animate animation="fade-in">
            <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
              <Image
                src="/images/portfolio/behance/logofolio.jpg"
                alt="Markit Media LogoFolio branding work"
                fill
                sizes="(max-width: 1024px) 100vw, 960px"
                className="object-cover"
              />
            </div>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-extrabold">Project archive</h2>
            <p className="text-gray-600 leading-8 mt-4">{note}</p>
            <p className="text-gray-600 leading-8 mt-4">
              This page keeps the project easy to find while connecting it to the current Markit Media branding portfolio. We do not publish unverified performance figures or project details that are not part of the current portfolio record.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link href="/work/logo-folio" className="bg-black text-white px-6 py-3.5 font-bold hover:bg-gray-800 transition-colors">View LogoFolio</Link>
              <Link href="/services/branding" className="border border-gray-300 px-6 py-3.5 font-bold hover:border-black transition-colors">Explore Branding</Link>
            </div>
          </Animate>
        </div>
      </section>
    </article>
  );
}
