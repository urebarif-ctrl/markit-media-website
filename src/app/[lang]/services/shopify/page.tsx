import type { Metadata } from "next";
import { ServicePage } from "@/components/service-page";
import { ShoppingCart } from "lucide-react";

export const metadata: Metadata = {
  title: "Shopify Services | Development & Ecommerce Growth",
  description:
    "Shopify development and ecommerce growth services including storefront builds, theme customization, Shopify Plus, integrations, migration and Shopify marketing.",
  alternates: { canonical: "https://themarkitmedia.com/en/services/shopify" },
  openGraph: {
    title: "Shopify Services",
    description:
      "Shopify development and growth services spanning storefronts, integrations, migration, conversion and ecommerce marketing.",
  },
};

export default function ShopifyServicesPage() {
  return (
    <ServicePage
      platforms={[{"name":"Shopify"},{"name":"Google Analytics","note":"GA4"},{"name":"Google Ads"},{"name":"Facebook","note":"Meta Ads"},{"name":"Klaviyo"},{"name":"Stripe"},{"name":"Google Merchant","note":"Shopping"}]}
      icon={ShoppingCart}
      heroImage="/images/services/ecommerce-marketing.jpg"
      blogCategory="Ecommerce"
      title="Shopify"
      description="A dedicated Shopify service family for businesses that need more than a generic website build. We connect storefront development, platform configuration, conversion, analytics and ecommerce marketing around the same commercial goals."
      longDescription="Shopify sits between development and growth. The storefront has to be technically sound, easy to manage and fast, while product structure, tracking, merchandising and acquisition need to support revenue. We keep the existing Shopify Development page at its current URL to preserve search equity, but connect it to this dedicated Shopify hub so users and search engines can understand the service family clearly."
      subServices={[
        {
          title: "Shopify Development",
          desc: "Storefront builds, theme customization, Shopify Plus, app integrations, catalog setup, payments, shipping and migration.",
          href: "/services/website-development/shopify",
        },
        {
          title: "Shopify Marketing",
          desc: "Traffic acquisition, product feed strategy, conversion optimization and retention programs for Shopify stores.",
          href: "/services/ecommerce-marketing/shopify-marketing",
        },
      ]}
      benefits={[
        "One service family connecting store build and growth",
        "Existing high-value Shopify Development URL preserved",
        "SEO-safe migration planning when store URLs change",
        "Analytics and conversion tracking built into implementation",
        "Support for Shopify Plus and advanced integrations",
        "Clear handoff between development, media and ecommerce strategy",
      ]}
      faq={[
        {
          q: "Why is Shopify separate from general website development?",
          a: "Shopify combines website development with product catalogs, checkout, payments, shipping, apps, merchandising and ecommerce growth. Giving it a dedicated service family makes that scope clearer without changing the existing Shopify Development URL.",
        },
        {
          q: "Are you changing the existing Shopify Development URL?",
          a: "No. The current Shopify Development URL remains in place so existing search visibility, links and indexing signals are not discarded. The new Shopify hub connects the related development and marketing services.",
        },
        {
          q: "Do you handle Shopify migrations?",
          a: "Yes. We can migrate products, collections, content and required integrations, and we plan old-to-new URL mappings so important search-visible URLs point directly to their final destination.",
        },
        {
          q: "Can you manage Shopify marketing after development?",
          a: "Yes. Shopify Marketing can include paid acquisition, product feed optimization, conversion work and retention strategy after the storefront is ready.",
        },
      ]}
      relatedServices={[
        { title: "Website Development", href: "/services/website-development" },
        { title: "E-commerce Marketing", href: "/services/ecommerce-marketing" },
        { title: "Performance Marketing", href: "/services/performance-marketing" },
        { title: "SEO", href: "/services/seo" },
      ]}
      tools={[
        { title: "ROI Calculator", desc: "Model marketing return before increasing spend.", href: "/resources/roi-calculator" },
        { title: "Website Grader", desc: "Review website performance, SEO and UX fundamentals.", href: "/resources/website-grader" },
      ]}
      industries={[
        { title: "E-commerce", href: "/industries/ecommerce" },
        { title: "Fashion", href: "/industries/fashion" },
        { title: "Food & Restaurants", href: "/industries/restaurants" },
      ]}
    />
  );
}
