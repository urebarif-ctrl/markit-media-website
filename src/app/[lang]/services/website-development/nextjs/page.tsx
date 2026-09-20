import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "Next.js Development",
  description:
    "High-performance Next.js development with server-side rendering, static site generation, API routes, and React-based architecture. Fast, scalable, SEO-optimized web applications.",
  alternates: {
    canonical:
      "https://themarkitmedia.com/en/services/website-development/nextjs",
  },
};

export default function NextJsPage() {
  return (
    <SubServicePage
      parentTitle="Website Development"
      parentHref="/services/website-development"
      title="Next.js Development"
      description="Build fast, SEO-friendly web applications with Next.js. We use server-side rendering, static site generation, and the React ecosystem to deliver sites that load quickly, rank well, and provide a smooth user experience at any scale."
      details={[
        "Server-side rendering (SSR) and static site generation (SSG) implementation to deliver fast initial page loads and strong SEO performance out of the box.",
        "React component architecture with reusable, well-structured components that keep your codebase maintainable and your development velocity high.",
        "API route development to handle backend logic, form submissions, third-party integrations, and data processing directly within your Next.js application.",
        "Headless CMS integration with platforms like WordPress, Sanity, Contentful, or Strapi, giving your content team an intuitive editing experience while keeping the front end fast.",
        "Performance optimization including code splitting, image optimization, lazy loading, and caching strategies to achieve top Core Web Vitals scores.",
        "Deployment and infrastructure setup on platforms like Vercel or AWS, with CI/CD pipelines, preview deployments, and environment management.",
        "Incremental adoption and migration from existing React apps or other frameworks to Next.js without a full rewrite.",
      ]}
      benefits={[
        "Excellent SEO with server-rendered and statically generated pages",
        "Sub-second page loads with automatic code splitting",
        "Flexible rendering strategies per page or component",
        "Built-in image optimization and asset management",
        "Seamless integration with any headless CMS or API",
        "Scalable deployment on modern cloud infrastructure",
      ]}
      faq={[
        {
          q: "What is Next.js and why should I use it?",
          a: "Next.js is a React framework that adds server-side rendering, static site generation, and built-in routing to React applications. It is a strong choice when you need fast page loads, good SEO, and the flexibility of a modern JavaScript stack.",
        },
        {
          q: "Is Next.js good for SEO?",
          a: "Yes. Unlike client-side-only React apps, Next.js renders pages on the server so search engines can crawl your content directly. Combined with structured data and optimized metadata, it provides a solid SEO foundation.",
        },
        {
          q: "Can you integrate Next.js with my existing CMS?",
          a: "We integrate Next.js with WordPress, Sanity, Contentful, Strapi, and other headless CMS platforms. Your content team keeps their familiar editor while your visitors get a fast, modern front end.",
        },
        {
          q: "How do you host and deploy Next.js sites?",
          a: "We typically deploy on Vercel or AWS, with CI/CD pipelines for automatic builds, preview deployments for each pull request, and production infrastructure configured for reliability and performance.",
        },
      ]}
    />
  );
}
