import type { Metadata } from "next";
import { ServicePage } from "@/components/service-page";
import { Search } from "lucide-react";

export const metadata: Metadata = {
  title: "SEO Services",
  description: "Technical SEO, local SEO, content SEO, link building, and keyword research. Dominate organic search and drive sustainable traffic growth.",
  alternates: { canonical: "https://themarkitmedia.com/en/services/seo" },
  openGraph: {
    title: "SEO Services",
    description: "Technical SEO, local SEO, content SEO, link building, and keyword research. Dominate organic search and drive sustainable traffic growth.",
  },
};

export default function SeoPage() {
  return (
    <ServicePage
      icon={Search}
      heroImage="/images/services/seo.jpg"
      blogCategory="SEO"
      title="SEO"
      description="Dominate organic search with a comprehensive SEO strategy. We handle technical SEO, content optimization, local SEO, and link building to grow your organic traffic."
      longDescription="Search engine optimization is a long-term investment in your digital presence. Our SEO team conducts thorough audits, develops keyword strategies, optimizes your technical infrastructure, creates SEO-driven content, and builds high-quality backlinks to improve your rankings and drive qualified traffic."
      subServices={[
        { title: "Technical SEO", desc: "Site speed, crawlability, indexation, Core Web Vitals, and schema markup.", href: "/services/seo/technical-seo" },
        { title: "Local SEO", desc: "Google Business Profile, local citations, and map pack optimization.", href: "/services/seo/local-seo" },
        { title: "Content SEO", desc: "Keyword-optimized content creation and on-page optimization.", href: "/services/seo/content-seo" },
        { title: "Link Building", desc: "High-quality backlink acquisition through outreach and digital PR.", href: "/services/seo/link-building" },
        { title: "SEO Audits", desc: "Comprehensive website audits with actionable recommendations.", href: "/services/seo/seo-audits" },
        { title: "Keyword Research", desc: "Data-driven keyword strategy aligned with search intent.", href: "/services/seo/keyword-research" },
      ]}
      benefits={[
        "Sustainable organic traffic growth that compounds over time",
        "Higher search rankings for high-intent commercial keywords",
        "Improved website performance and user experience",
        "Data-driven strategy based on search intent analysis",
        "Regular reporting with ranking, traffic, and conversion metrics",
        "White-hat techniques that protect your site long-term",
      ]}
      faq={[
        { q: "How long does SEO take to show results?", a: "SEO is a long-term strategy. Most businesses see meaningful improvements in 3-6 months, with compounding results over time." },
        { q: "Do you guarantee first-page rankings?", a: "No ethical SEO provider can guarantee specific rankings. We focus on building sustainable organic growth through proven strategies." },
        { q: "What SEO tools do you use?", a: "We use industry-standard tools including Google Search Console, Ahrefs, Screaming Frog, and proprietary analytics platforms." },
        { q: "Can you fix a Google penalty?", a: "Yes. We diagnose manual actions and algorithmic issues, develop recovery plans, and work to restore your rankings." },
        { q: "Do you offer local SEO?", a: "Yes. We optimize Google Business Profiles, build local citations, manage reviews, and create location-specific content." },
      ]}
      tools={[
        { title: "SEO Checklist", desc: "Interactive monthly SEO checklist with progress tracking.", href: "/resources/seo-checklist" },
        { title: "Website Grader", desc: "Evaluate your website across performance, SEO, and accessibility.", href: "/resources/website-grader" },
        { title: "Keyword Density Checker", desc: "Analyze keyword usage and optimize on-page content.", href: "/resources/keyword-density-checker" },
      ]}
      industries={[
        { title: "E-Commerce", href: "/industries/ecommerce" },
        { title: "SaaS", href: "/industries/saas" },
        { title: "Healthcare", href: "/industries/healthcare" },
        { title: "Real Estate", href: "/industries/real-estate" },
        { title: "Legal", href: "/industries/legal" },
      ]}
      locations={[
        { title: "New York", href: "/locations/united-states/new-york/seo-services" },
        { title: "Los Angeles", href: "/locations/united-states/los-angeles/seo-services" },
        { title: "Chicago", href: "/locations/united-states/chicago/seo-services" },
        { title: "Houston", href: "/locations/united-states/houston/seo-services" },
        { title: "Miami", href: "/locations/united-states/miami/seo-services" },
        { title: "San Francisco", href: "/locations/united-states/san-francisco/seo-services" },
        { title: "Dallas", href: "/locations/united-states/dallas/seo-services" },
        { title: "Atlanta", href: "/locations/united-states/atlanta/seo-services" },
        { title: "Karachi", href: "/locations/karachi/seo-services" },
      ]}
      relatedServices={[
        { title: "Content Marketing", href: "/services/content-marketing" },
        { title: "Website Development", href: "/services/website-development" },
        { title: "Performance Marketing", href: "/services/performance-marketing" },
      ]}
    />
  );
}
