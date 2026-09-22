import Link from "next/link";
import { Animate } from "@/components/animate";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { YouTubeEmbed } from "@/components/youtube-embed";

interface CaseStudyVideo {
  id: string;
  title: string;
  aspect?: "landscape" | "portrait";
}

interface CaseStudyProps {
  client: string;
  industry: string;
  services: string[];
  title: string;
  subtitle: string;
  context: string;
  approach: string;
  deliverables: string[];
  videos?: CaseStudyVideo[];
  outcomes?: string[];
  illustrative?: boolean;
  relatedServices: Array<{ title: string; href: string }>;
  readingTime?: string;
}

export function CaseStudyPage({
  client,
  industry,
  services,
  title,
  subtitle,
  context,
  approach,
  deliverables,
  videos,
  outcomes,
  illustrative = false,
  relatedServices,
  readingTime = "4 min read",
}: CaseStudyProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: subtitle,
    publisher: { "@type": "Organization", name: "Markit Media" },
  };

  return (
    <article>
      <JsonLd data={schema} />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Work", href: "/work" }, { label: client }]} />

      <section className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="text-base font-medium text-gray-400 uppercase tracking-[0.15em]">{industry}</span>
              <span className="text-gray-300" aria-hidden="true">|</span>
              <span className="text-base text-gray-400">{readingTime}</span>
            </div>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3rem)] font-extrabold text-black tracking-tight leading-[1.1]">
              {title}
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-4 max-w-3xl">{subtitle}</p>
            <div className="flex flex-wrap gap-2 mt-6">
              {services.map((s) => (
                <span key={s} className="border border-gray-200 px-3 py-1.5 text-base font-medium text-gray-600">{s}</span>
              ))}
            </div>
          </Animate>
        </div>
      </section>

      {videos && videos.length > 0 && (
        <section className="px-6 lg:px-12 py-8" aria-label="Project videos">
          <div className="max-w-5xl mx-auto">
            <div className={`grid gap-6 ${videos.length === 1 ? "grid-cols-1 max-w-3xl mx-auto" : "grid-cols-1 md:grid-cols-2"}`}>
              {videos.map((v) => (
                <Animate key={v.id} animation="fade-up">
                  <YouTubeEmbed videoId={v.id} title={v.title} aspect={v.aspect} />
                </Animate>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="px-6 lg:px-12 py-12">
        <div className="max-w-3xl mx-auto space-y-12">
          <Animate animation="fade-up">
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-4">Project Context</h2>
              <p className="text-lg text-gray-500 leading-relaxed">{context}</p>
            </div>
          </Animate>

          <Animate animation="fade-up">
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-4">Our Approach</h2>
              <p className="text-lg text-gray-500 leading-relaxed">{approach}</p>
            </div>
          </Animate>

          <Animate animation="fade-up">
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-4">What We Delivered</h2>
              <ul className="space-y-3">
                {deliverables.map((d, i) => (
                  <li key={i} className="flex gap-3 text-lg text-gray-500 leading-relaxed">
                    <span className="text-black font-bold flex-shrink-0" aria-hidden="true">&bull;</span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </Animate>

          {outcomes && outcomes.length > 0 && (
            <Animate animation="fade-up">
              <div>
                <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-4">
                  Results
                  {illustrative && <span className="text-base font-normal text-gray-400 ml-2">Illustrative — pending confirmation</span>}
                </h2>
                <ul className="space-y-3">
                  {outcomes.map((o, i) => (
                    <li key={i} className="flex gap-3 text-lg text-gray-500 leading-relaxed">
                      <span className="text-black font-bold flex-shrink-0" aria-hidden="true">&bull;</span>
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            </Animate>
          )}
        </div>
      </section>

      <section className="px-6 lg:px-12 py-12 bg-gray-50" aria-label="Related services">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-6">Services Used in This Project</h2>
          <div className="flex flex-wrap gap-3">
            {relatedServices.map((s) => (
              <Link key={s.href} href={s.href} className="border border-gray-200 px-5 py-3 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                {s.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-16 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
            Want Similar Results?
          </h2>
          <p className="text-lg text-gray-400 mt-4 mb-8">
            Let&apos;s discuss how we can apply the same approach to your business.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="inline-block bg-white text-black font-bold px-8 py-4 text-base hover:bg-gray-100 transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
              Get a Free Consultation &rarr;
            </Link>
            <Link href="/work" className="inline-block border-2 border-white text-white font-bold px-8 py-4 text-base hover:bg-white hover:text-black transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
              See More Work
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
