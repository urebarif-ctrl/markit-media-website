import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "E-commerce Solutions",
  description:
    "End-to-end e-commerce development including online store setup, payment integration, inventory management, and order processing. Sell online with a store built for growth.",
  alternates: {
    canonical:
      "https://themarkitmedia.com/en/services/website-development/ecommerce",
  },
  openGraph: {
    title: "E-commerce Solutions",
    description: "End-to-end e-commerce development including online store setup, payment integration, inventory management, and order processing. Sell online with a stor...",
  },
};

export default function EcommercePage() {
  return (
    <SubServicePage
      parentTitle="Website Development"
      parentHref="/services/website-development"
      title="E-commerce Solutions"
      description="Launch an online store that handles everything from product browsing to checkout and fulfillment. We build e-commerce solutions with secure payment processing, inventory management, and a shopping experience designed to turn visitors into customers."
      details={[
        "Online store development on the right platform for your business, whether that is Shopify, WooCommerce, or a custom-built solution with headless commerce architecture.",
        "Payment gateway integration supporting credit cards, digital wallets, buy-now-pay-later options, and multi-currency transactions with PCI-compliant security.",
        "Product catalog management including category structures, variant configurations, bulk import tools, and rich product pages with optimized images and structured data.",
        "Inventory and order management system setup to track stock levels, automate reorder alerts, process orders, and integrate with your fulfillment and shipping providers.",
        "Checkout flow optimization to reduce cart abandonment through streamlined forms, guest checkout options, trust signals, and clear shipping and return information.",
        "Analytics and reporting configuration to track revenue, conversion rates, average order value, and customer behavior so you can make informed merchandising decisions.",
        "Post-launch support including performance monitoring, security updates, seasonal promotions setup, and ongoing feature development as your store grows.",
      ]}
      benefits={[
        "Secure, reliable online transactions your customers can trust",
        "Streamlined checkout that reduces cart abandonment",
        "Centralized inventory and order management",
        "Mobile-optimized shopping experience across all devices",
        "Built-in analytics to track sales and customer behavior",
        "Scalable infrastructure that grows with your product catalog",
      ]}
      faq={[
        {
          q: "Which e-commerce platform should I use?",
          a: "It depends on your product catalog, order volume, and technical needs. Shopify is excellent for most online stores with its ease of use and reliability. WooCommerce suits businesses that want more customization and already use WordPress. For complex requirements, a headless commerce approach may be the best fit.",
        },
        {
          q: "How do you handle payment processing?",
          a: "We integrate with established payment processors like Stripe, PayPal, and Shopify Payments. All implementations follow PCI compliance standards to protect customer payment information.",
        },
        {
          q: "Can you migrate my existing online store?",
          a: "Yes. We migrate stores from one platform to another, including product data, customer accounts, order history, and URL structures. We plan migrations carefully to minimize disruption and preserve your search engine rankings.",
        },
        {
          q: "Do you offer ongoing support for e-commerce stores?",
          a: "We provide ongoing support packages that cover technical maintenance, security updates, performance optimization, and feature additions. We also help with seasonal campaigns, promotions, and catalog updates as your business needs change.",
        },
      ]}
    />
  );
}
