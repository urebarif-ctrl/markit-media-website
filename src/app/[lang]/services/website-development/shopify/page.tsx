import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "Shopify Development",
  description:
    "Custom Shopify development including storefront design, theme customization, app integrations, and Shopify Plus solutions. Build a store that converts.",
  alternates: {
    canonical:
      "https://themarkitmedia.com/en/services/website-development/shopify",
  },
};

export default function ShopifyPage() {
  return (
    <SubServicePage
      parentTitle="Website Development"
      parentHref="/services/website-development"
      title="Shopify Development"
      description="Launch a Shopify store that looks professional and drives sales. We build custom storefronts, tailor themes to your brand, and integrate the apps and tools you need to run your e-commerce business efficiently."
      details={[
        "Custom Shopify storefront development using Liquid or Hydrogen, designed to reflect your brand and optimized for conversions across all devices.",
        "Theme customization and development that goes beyond template defaults, giving you unique layouts, custom sections, and dynamic content blocks.",
        "App integration and configuration to connect your store with tools for email marketing, reviews, loyalty programs, inventory management, and fulfillment.",
        "Shopify Plus development for high-volume merchants, including custom checkout experiences, B2B storefronts, and advanced automation with Shopify Flow.",
        "Product catalog setup and optimization including variant management, collections, metafields, and structured data for better search visibility.",
        "Payment and shipping configuration covering multi-currency support, regional shipping rates, tax rules, and third-party logistics integrations.",
      ]}
      benefits={[
        "Hosted platform with built-in security and reliability",
        "Mobile-optimized storefronts that convert on every device",
        "Seamless integration with popular marketing and sales tools",
        "Fast page load times with Shopify's global CDN",
        "Easy product and order management through the Shopify admin",
        "Scalable from startup to enterprise with Shopify Plus",
      ]}
      faq={[
        {
          q: "Should I choose Shopify or WooCommerce?",
          a: "It depends on your needs. Shopify is a fully hosted platform that handles security, hosting, and updates for you, making it easier to manage. WooCommerce gives you more control and flexibility but requires more technical maintenance. We can help you evaluate which is the better fit.",
        },
        {
          q: "Can you customize my existing Shopify theme?",
          a: "Yes. We can modify your current theme's design, add custom sections, improve performance, and extend functionality without starting from scratch, preserving what already works while improving what does not.",
        },
        {
          q: "Do you work with Shopify Plus?",
          a: "Yes. We build on Shopify Plus for merchants who need custom checkout experiences, B2B functionality, multi-store management, and advanced automation through Shopify Flow and Scripts.",
        },
        {
          q: "Can you migrate my store to Shopify?",
          a: "We handle migrations from WooCommerce, Magento, BigCommerce, and other platforms to Shopify. This includes product data, customer records, order history, and URL redirects to preserve your SEO.",
        },
      ]}
    />
  );
}
