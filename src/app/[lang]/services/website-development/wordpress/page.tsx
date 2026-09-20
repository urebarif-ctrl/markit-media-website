import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "WordPress Development",
  description:
    "Custom WordPress development including theme design, plugin development, headless CMS architecture, and WooCommerce stores. Scalable, secure, and easy to manage.",
  alternates: {
    canonical:
      "https://themarkitmedia.com/en/services/website-development/wordpress",
  },
  openGraph: {
    title: "WordPress Development",
    description: "Custom WordPress development including theme design, plugin development, headless CMS architecture, and WooCommerce stores. Scalable, secure, and easy t...",
  },
};

export default function WordPressPage() {
  return (
    <SubServicePage
      parentTitle="Website Development"
      parentHref="/services/website-development"
      title="WordPress Development"
      description="Build a WordPress site that is fast, secure, and easy to manage. We develop custom themes, build purpose-built plugins, and architect headless CMS solutions that give your team full content control without sacrificing performance or design."
      details={[
        "Custom theme development built from scratch to match your brand, with clean code, responsive layouts, and optimized asset loading.",
        "Plugin development for functionality that off-the-shelf solutions cannot provide, including custom post types, API integrations, and workflow automation.",
        "Headless WordPress architecture using the REST API or WPGraphQL to power front-end frameworks like Next.js, delivering faster page loads and modern user experiences.",
        "WooCommerce store setup and customization including product configuration, payment gateway integration, shipping rules, and checkout optimization.",
        "Performance optimization covering caching strategies, image optimization, database cleanup, and CDN configuration to keep load times low.",
        "Security hardening with regular updates, firewall configuration, malware scanning, and best-practice user role management.",
        "Migration services to move your existing site to WordPress or upgrade from an outdated WordPress setup with zero downtime.",
      ]}
      benefits={[
        "Full content control through an intuitive admin dashboard",
        "Custom design that aligns with your brand identity",
        "Scalable architecture that handles traffic growth",
        "SEO-friendly structure with clean URLs and schema markup",
        "Extensive plugin ecosystem for added functionality",
        "Ongoing maintenance and support after launch",
      ]}
      faq={[
        {
          q: "Is WordPress still a good choice for modern websites?",
          a: "Yes. WordPress powers a significant portion of the web and continues to evolve. With custom development, performance optimization, and headless architecture options, it remains a strong choice for businesses that need flexible content management.",
        },
        {
          q: "Can you build a headless WordPress site?",
          a: "Absolutely. We use WordPress as a headless CMS with WPGraphQL or the REST API, paired with a modern front-end framework. This gives you the familiar WordPress editor with faster, more dynamic front-end performance.",
        },
        {
          q: "How do you handle WordPress security?",
          a: "We follow security best practices including regular core and plugin updates, firewall configuration, two-factor authentication, secure hosting recommendations, and ongoing monitoring to keep your site protected.",
        },
        {
          q: "Do you build WooCommerce stores?",
          a: "Yes. We handle full WooCommerce setup including product catalog configuration, payment gateway integration, shipping and tax rules, and checkout flow optimization tailored to your business needs.",
        },
      ]}
    />
  );
}
