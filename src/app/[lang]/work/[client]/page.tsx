import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ClientCaseStudy } from "@/components/portfolio/portfolio-sections";
import { caseStudyMetadata, getCaseStudy } from "@/lib/case-studies";
import { clientsWithNewPages, getClient } from "@/lib/portfolio";

export function generateStaticParams() {
  return clientsWithNewPages().map((c) => ({ client: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string; client: string }> }): Promise<Metadata> {
  const { lang, client } = await params;
  const c = getClient(client);
  if (!c || c.status !== "draft" || c.existing_route || !getCaseStudy(client)) return {};
  return caseStudyMetadata(client, lang);
}

export default async function ClientWorkPage({ params }: { params: Promise<{ lang: string; client: string }> }) {
  const { lang, client } = await params;
  const c = getClient(client);
  if (!c || c.status !== "draft" || c.existing_route) notFound();
  const locale = (["en", "ar", "ur"].includes(lang) ? lang : "en") as string;
  return <ClientCaseStudy client={c} locale={locale} />;
}
