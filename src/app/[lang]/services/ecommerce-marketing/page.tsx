import type { Metadata } from "next";
import { ServicePage } from "@/components/service-page";
import { ShoppingCart } from "lucide-react";

export const metadata: Metadata = {
  title: "E-commerce Marketing",
  description: "E-commerce marketing services: Amazon Ads, Shopify marketing, product feed optimization, and marketplace management. Grow your online store revenue.",
  alternates: { canonical: "https://themarkitmedia.com/en/services/ecommerce-marketing" },
  openGraph: {
    title: "E-commerce Marketing",
    description: "E-commerce marketing services: Amazon Ads, Shopify marketing, product feed optimization, and marketplace management. Grow your online store revenue.",
  },
};

export default function EcommerceMarketingPage() {
  return (
    <ServicePage
      icon={ShoppingCart}
      heroImage="/images/services/ecommerce-marketing.jpg"
      blogCategory="E-commerce"
      title="E-commerce Marketing"
      description="Grow your online store revenue with e-commerce-specific marketing. We manage Amazon Ads, Shopify marketing, product feed optimization, and marketplace strategies across platforms."
      longDescription="E-commerce marketing requires a specialized approach that connects product data, advertising, and marketplace management into a unified strategy. Our e-commerce team helps online stores increase visibility, drive qualified traffic, and improve conversion rates across their own website and third-party marketplaces. We optimize product feeds, manage marketplace advertising, and build marketing systems designed for online retail."
      subServices={[
        { title: "Amazon Ads", desc: "Sponsored Products, Sponsored Brands, and Amazon DSP campaign management.", href: "/services/ecommerce-marketing/amazon-ads" },
        { title: "Shopify Marketing", desc: "Traffic generation, conversion optimization, and growth strategies for Shopify stores.", href: "/services/ecommerce-marketing/shopify-marketing" },
        { title: "Product Feed Optimization", desc: "Google Shopping, Meta Catalog, and marketplace feed setup, optimization, and management.", href: "/services/ecommerce-marketing/product-feed-optimization" },
        { title: "Marketplace Management", desc: "Listing optimization, pricing strategy, and account management across online marketplaces.", href: "/services/ecommerce-marketing/marketplace-management" },
      ]}
      benefits={[
        "Unified marketing strategy across your store and marketplaces",
        "Optimized product feeds that improve ad performance and visibility",
        "Platform-specific expertise for Amazon, Shopify, and other marketplaces",
        "Data-driven approach focused on revenue and ROAS",
        "End-to-end management from product listings to advertising",
      ]}
      faq={[
        { q: "Which e-commerce platforms do you work with?", a: "We work with Shopify, WooCommerce, Amazon, Walmart Marketplace, and other major e-commerce platforms. We tailor our approach to each platform's strengths and requirements." },
        { q: "What is product feed optimization?", a: "Product feed optimization ensures your product data is accurate, complete, and structured for Google Shopping, Meta Catalog, and marketplace listings. Better feeds mean better ad performance and organic visibility." },
        { q: "Can you manage our Amazon seller account?", a: "Yes. We handle Amazon advertising, listing optimization, A+ Content, keyword research, and account health monitoring." },
        { q: "How do you improve e-commerce conversion rates?", a: "We optimize product pages, checkout flows, site speed, and user experience. We also implement email recovery flows for abandoned carts and browse abandonment." },
        { q: "Do you handle Google Shopping campaigns?", a: "Yes. We set up and optimize Google Shopping feeds, manage Performance Max and Shopping campaigns, and track ROAS at the product and category level." },
      ]}
      tools={[
        { title: "CLV Calculator", desc: "Calculate customer lifetime value for your business.", href: "/resources/clv-calculator" },
        { title: "Funnel Calculator", desc: "Model your e-commerce conversion funnel.", href: "/resources/funnel-calculator" },
        { title: "Pricing Calculator", desc: "Optimize your pricing strategy with data-driven analysis.", href: "/resources/pricing-calculator" },
      ]}
      industries={[
        { title: "E-Commerce", href: "/industries/ecommerce" },
        { title: "Fashion", href: "/industries/fashion" },
        { title: "Home Services", href: "/industries/home-services" },
        { title: "Automotive", href: "/industries/automotive" },
        { title: "Travel", href: "/industries/travel" },
      ]}
      relatedServices={[
        { title: "Performance Marketing", href: "/services/performance-marketing" },
        { title: "Website Development", href: "/services/website-development" },
        { title: "SEO", href: "/services/seo" },
      ]}
    />
  );
}
