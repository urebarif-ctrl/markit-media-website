import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Animate } from "@/components/animate";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { SectionDesc, SectionLabel } from "@/components/section";
import { legacySeoPageById } from "@/data/legacy-seo-pages";
import { legacyTitle } from "@/data/legacy-interim-copy";
import { guideClusters } from "@/data/guide-hub";

const BASE_URL = "https://themarkitmedia.com";

export const revalidate = 86400;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (lang !== "en") return { robots: { index: false, follow: false } };
  const canonical = `${BASE_URL}/en/guides`;
  const description =
    "Short planning guides on websites, SEO, social media, e-commerce, branding and digital marketing, grouped by topic with links to the related Markit Media services.";
  return {
    title: "Website, SEO and Marketing Guides",
    description,
    alternates: { canonical },
    openGraph: { title: "Website, SEO and Marketing Guides", description, url: canonical, type: "website" },
  };
}

export default async function GuidesHubPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (lang !== "en") notFound();
  const l = (path: string) => `/${lang}${path}`;

  const clusters = guideClusters
    .map((cluster) => ({
      ...cluster,
      anchor: `cluster-${cluster.name.replace(/\W+/g, "-").toLowerCase()}`,
      guides: cluster.guideIds
        .map((id) => legacySeoPageById.get(id))
        .filter((p): p is NonNullable<typeof p> => Boolean(p)),
    }))
    .filter((cluster) => cluster.guides.length > 0);
  const total = clusters.reduce((n, c) => n + c.guides.length, 0);

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Website, SEO and Marketing Guides",
    url: `${BASE_URL}/en/guides`,
    isPartOf: { "@type": "WebSite", name: "Markit Media", url: BASE_URL },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: total,
      itemListElement: clusters.flatMap((c) => c.guides).map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${BASE_URL}${p.path}`,
        name: legacyTitle(p),
      })),
    },
  };

  return (
    <article>
      <JsonLd data={schema} />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Guides" }]} />

      <section className="px-6 lg:px-12 pt-24 pb-12 bg-white" aria-label="Guides">
        <div className="max-w-5xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Guides</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.2rem,5vw,4rem)] font-extrabold tracking-tight leading-[1.06] mt-3">
              Website, SEO and marketing guides
            </h1>
            <SectionDesc>
              Short planning guides on websites, SEO, social media, e-commerce, branding and digital marketing, grouped by topic. Each topic links to the Markit Media service it relates to.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      <div className="px-6 lg:px-12 pb-20 bg-white">
        <div className="max-w-5xl mx-auto grid gap-14">
          {clusters.map((cluster) => (
            <section key={cluster.name} aria-labelledby={cluster.anchor}>
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 border-b-2 border-black pb-3">
                <h2 id={cluster.anchor} className="font-[family-name:var(--font-display)] text-2xl font-extrabold tracking-tight">
                  {cluster.name} <span className="text-gray-400 text-base font-semibold">({cluster.guides.length})</span>
                </h2>
                {cluster.service && (
                  <Link href={l(cluster.service.href)} className="inline-flex items-center gap-2 text-sm font-bold">
                    {cluster.service.label} <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                )}
              </div>
              <ul className="grid gap-3 mt-5 sm:grid-cols-2 lg:grid-cols-3">
                {cluster.guides.map((p) => (
                  <li key={p.id} className="bg-white border border-gray-200">
                    <Link href={p.path} className="group flex items-center justify-between gap-4 p-5 h-full hover:bg-gray-50 transition-colors motion-reduce:transition-none">
                      <span className="font-semibold text-sm leading-snug">{legacyTitle(p)}</span>
                      <span className="text-gray-300 group-hover:text-black transition-colors" aria-hidden="true">&rarr;</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>

      <section className="px-6 lg:px-12 py-16 bg-gray-50" aria-label="Next step">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-extrabold tracking-tight">Need help with a specific project?</h2>
          <p className="text-gray-600 leading-7 mt-4">Tell us what you are trying to achieve and we will recommend where to start.</p>
          <div className="flex flex-wrap justify-center gap-3 mt-7">
            <Link href={l("/get-a-quote")} className="bg-black text-white px-6 py-3.5 font-bold hover:bg-gray-800 transition-colors motion-reduce:transition-none">Request a quote</Link>
            <Link href={l("/services")} className="border border-gray-300 px-6 py-3.5 font-bold hover:border-black transition-colors motion-reduce:transition-none">See all services</Link>
          </div>
        </div>
      </section>
    </article>
  );
}
