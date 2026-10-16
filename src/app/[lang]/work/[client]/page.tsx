import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ClientCaseStudy } from "@/components/portfolio/portfolio-sections";
import { PORTFOLIO_NEW_PAGES_INDEXABLE, SITE_ORIGIN, absoluteMediaUrl, clientWorkTypes, clientsWithNewPages, getClient, trimDescription } from "@/lib/portfolio";

export function generateStaticParams() {
  return clientsWithNewPages().map((c) => ({ client: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string; client: string }> }): Promise<Metadata> {
  const { client } = await params;
  const c = getClient(client);
  if (!c || c.status !== "draft" || c.existing_route) return {};
  const types = clientWorkTypes(c).join(", ");
  const title = `${c.name}: ${types}`;
  const description = trimDescription(c.summary);
  const url = `${SITE_ORIGIN}/en/work/${c.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: PORTFOLIO_NEW_PAGES_INDEXABLE ? undefined : { index: false, follow: false },
    openGraph: {
      url,
      title,
      description,
      siteName: "Markit Media",
      ...(c.hero ? { images: [{ url: absoluteMediaUrl(c.hero), alt: `${c.name} work by Markit Media` }] } : {}),
    },
  };
}

export default async function ClientWorkPage({ params }: { params: Promise<{ lang: string; client: string }> }) {
  const { lang, client } = await params;
  const c = getClient(client);
  if (!c || c.status !== "draft" || c.existing_route) notFound();
  const locale = (["en", "ar", "ur"].includes(lang) ? lang : "en") as string;
  return <ClientCaseStudy client={c} locale={locale} />;
}
