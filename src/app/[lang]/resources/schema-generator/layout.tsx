import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Schema Markup Generator — Add Structured Data in Minutes",
  description:
    "Generate JSON-LD structured data for LocalBusiness, Organization, Product, FAQ, Article, and BreadcrumbList schemas with this free tool. Win rich results in search.",
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-schema-generator" },
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-schema-generator",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Free JSON-LD Schema Markup Generator",
    description:
      "Generate structured data markup for LocalBusiness, Product, FAQ, Article, and more. Win rich results in Google search.",
  },
};

export default function SchemaGeneratorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
