import type { Metadata } from "next";
import { ServicePage } from "@/components/service-page";
import { Code } from "lucide-react";

export const metadata: Metadata = {
  title: "Website Development",
  description: "Website development across WordPress, Shopify, Next.js, Webflow, Squarespace and custom stacks, including redesigns, migrations, redirects and SEO-safe launches.",
  alternates: { canonical: "https://themarkitmedia.com/en/services/website-development" },
  openGraph: {
    title: "Website Development",
    description: "Custom website development: WordPress, Shopify, Next.js, web apps, landing pages, and e-commerce. Fast, responsive, SEO-optimized websites built for res...",
  },
};

export default function WebsiteDevelopmentPage() {
  return (
    <ServicePage
      icon={Code}
      heroImage="/images/services/web-dev.jpg"
      blogCategory="Web"
      title="Website Development"
      description="Get a fast, responsive, and conversion-focused website. We build on WordPress, Shopify, Next.js, and custom frameworks, delivering sites that look great and perform even better."
      longDescription="A website project is more than a visual redesign. We plan information architecture, content hierarchy, responsive UX, CMS ownership, performance, analytics, technical SEO and launch requirements together. Our team works across managed CMS platforms and modern application stacks, and can also migrate an existing site without casually discarding valuable URLs, content or search signals. For migrations with URL changes, we map old URLs to relevant new destinations, implement permanent redirects, update internal links and canonicals, and validate the launch rather than treating migration as a simple copy-and-paste exercise."
      subServices={[
        { title: "WordPress Development", desc: "Custom WordPress themes, plugins, and headless CMS setups for flexible content management.", href: "/services/website-development/wordpress" },
        { title: "Shopify Development", desc: "Custom Shopify storefronts, theme customization, and app integrations.", href: "/services/website-development/shopify" },
        { title: "Webflow Development", desc: "Responsive Webflow builds, CMS implementation, component systems, and site improvements.", href: "/services/website-development/webflow" },
        { title: "Squarespace Development", desc: "Polished Squarespace websites for service businesses, portfolios, and content-led brands.", href: "/services/website-development/squarespace" },
        { title: "Next.js Development", desc: "High-performance React applications with server-side rendering and static generation.", href: "/services/website-development/nextjs" },
        { title: "Custom Web Apps", desc: "Full-stack web applications built to solve specific business problems.", href: "/services/website-development/custom-web-apps" },
        { title: "Landing Pages", desc: "High-converting landing pages designed for campaigns, launches, and lead generation.", href: "/services/website-development/landing-pages" },
        { title: "E-commerce Solutions", desc: "Online stores with payment integration, inventory management, and order processing.", href: "/services/website-development/ecommerce" },
        { title: "Website Migration", desc: "Platform, hosting, CMS, or domain migrations planned for continuity, QA, analytics, and minimal disruption.", href: "/services/website-development/website-migration" },
        { title: "SEO Migration & Redirects", desc: "URL inventories, redirect maps, canonical and internal-link updates, sitemap checks, and post-launch monitoring.", href: "/services/website-development/seo-migration-redirects" },
      ]}
      benefits={[
        "Mobile-first responsive design across all devices",
        "SEO-optimized architecture for better search visibility",
        "Fast page load times with modern performance standards",
        "Conversion-focused design backed by UX best practices",
        "Ongoing maintenance and support after launch",
        "Scalable architecture that grows with your business",
      ]}
      faq={[
        { q: "What platforms do you build on?", a: "We build on WordPress, Shopify, Next.js, and custom frameworks depending on your needs. We recommend the best platform based on your goals, budget, and technical requirements." },
        { q: "How long does it take to build a website?", a: "A standard website takes 4-8 weeks from kickoff to launch. Complex web applications and e-commerce stores may take 8-12 weeks depending on scope." },
        { q: "Do you provide website hosting?", a: "We help you set up and manage hosting on the best platform for your site, whether that is managed WordPress hosting, Vercel, or cloud infrastructure." },
        { q: "Will my website be mobile-friendly?", a: "Every website we build is mobile-first and fully responsive across all screen sizes and devices." },
        { q: "Do you offer ongoing maintenance?", a: "Yes. We offer maintenance packages that include security updates, performance monitoring, content updates, and technical support." },
      ]}
      tools={[
        { title: "Website Grader", desc: "Evaluate your site across performance, SEO, and UX.", href: "/resources/website-grader" },
        { title: "Speed Test", desc: "Measure and optimize your website loading speed.", href: "/resources/speed-test" },
        { title: "Heuristic Evaluator", desc: "Score your website against Nielsen's 10 usability heuristics.", href: "/resources/website-heuristic-evaluator" },
      ]}
      portfolio={[
        { client: "Elite", desc: "Custom website development with professional design and social integration.", href: "/work/elite" },
        { client: "Pur Health", desc: "Healthcare website focused on trust, clarity, and accessibility.", href: "/work/pur-health" },
        { client: "Minhaz Couture", desc: "Fashion e-commerce website with social media content.", href: "/work/minhaz-couture" },
      ]}
      industries={[
        { title: "E-Commerce", href: "/industries/ecommerce" },
        { title: "SaaS", href: "/industries/saas" },
        { title: "Professional Services", href: "/industries/professional-services" },
        { title: "Healthcare", href: "/industries/healthcare" },
        { title: "Real Estate", href: "/industries/real-estate" },
      ]}
      locations={[
        { title: "New York", href: "/locations/united-states/new-york/website-development" },
        { title: "Los Angeles", href: "/locations/united-states/los-angeles/website-development" },
        { title: "Chicago", href: "/locations/united-states/chicago/website-development" },
        { title: "Houston", href: "/locations/united-states/houston/website-development" },
        { title: "Miami", href: "/locations/united-states/miami/website-development" },
        { title: "San Francisco", href: "/locations/united-states/san-francisco/website-development" },
        { title: "Dallas", href: "/locations/united-states/dallas/website-development" },
        { title: "Atlanta", href: "/locations/united-states/atlanta/website-development" },
        { title: "Boston", href: "/locations/united-states/boston/website-development" },
        { title: "Seattle", href: "/locations/united-states/seattle/website-development" },
        { title: "Denver", href: "/locations/united-states/denver/website-development" },
        { title: "Phoenix", href: "/locations/united-states/phoenix/website-development" },
        { title: "Karachi", href: "/locations/karachi/website-development" },
      ]}
      relatedServices={[
        { title: "SEO", href: "/services/seo" },
        { title: "Branding & Design", href: "/services/branding" },
        { title: "E-commerce Marketing", href: "/services/ecommerce-marketing" },
      ]}
    />
  );
}
