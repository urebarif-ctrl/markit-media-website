import type { Metadata } from "next";
import { ServicePage } from "@/components/service-page";
import { Code } from "lucide-react";

export const metadata: Metadata = {
  title: "Website Development",
  description: "Custom website development: WordPress, Shopify, Next.js, web apps, landing pages, and e-commerce. Fast, responsive, SEO-optimized websites built for results.",
  alternates: { canonical: "https://themarkitmedia.com/en/services/website-development" },
};

export default function WebsiteDevelopmentPage() {
  return (
    <ServicePage
      icon={Code}
      heroImage="/images/services/web-dev.jpg"
      blogCategory="Web"
      title="Website Development"
      description="Get a fast, responsive, and conversion-focused website. We build on WordPress, Shopify, Next.js, and custom frameworks, delivering sites that look great and perform even better."
      longDescription="Your website is the foundation of your digital presence. Our development team builds fast, responsive, and SEO-optimized websites tailored to your business. Whether you need a WordPress site, Shopify store, custom Next.js application, or a high-converting landing page, we handle everything from design to deployment and ongoing maintenance."
      subServices={[
        { title: "WordPress Development", desc: "Custom WordPress themes, plugins, and headless CMS setups for flexible content management.", href: "/services/website-development/wordpress" },
        { title: "Shopify Development", desc: "Custom Shopify storefronts, theme customization, and app integrations.", href: "/services/website-development/shopify" },
        { title: "Next.js Development", desc: "High-performance React applications with server-side rendering and static generation.", href: "/services/website-development/nextjs" },
        { title: "Custom Web Apps", desc: "Full-stack web applications built to solve specific business problems.", href: "/services/website-development/custom-web-apps" },
        { title: "Landing Pages", desc: "High-converting landing pages designed for campaigns, launches, and lead generation.", href: "/services/website-development/landing-pages" },
        { title: "E-commerce Solutions", desc: "Online stores with payment integration, inventory management, and order processing.", href: "/services/website-development/ecommerce" },
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
      relatedServices={[
        { title: "SEO", href: "/services/seo" },
        { title: "Branding & Design", href: "/services/branding" },
        { title: "E-commerce Marketing", href: "/services/ecommerce-marketing" },
      ]}
    />
  );
}
