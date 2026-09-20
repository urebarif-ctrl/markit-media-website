import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Schema Markup Generator — Add Structured Data in Minutes",
  description:
    "Generate JSON-LD structured data for LocalBusiness, Organization, Product, FAQ, Article, and BreadcrumbList schemas with this free tool. Win rich results in search.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/schema-generator" },
  openGraph: {
    title: "Free JSON-LD Schema Markup Generator",
    description:
      "Generate structured data markup for LocalBusiness, Product, FAQ, Article, and more. Win rich results in Google search.",
  },
};

export default function SchemaGeneratorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
