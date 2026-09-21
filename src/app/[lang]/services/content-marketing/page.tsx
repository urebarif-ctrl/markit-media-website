import type { Metadata } from "next";
import { ServicePage } from "@/components/service-page";
import { FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Content Marketing",
  description: "Content marketing services: content strategy, copywriting, blog writing, whitepapers, and SEO content. Attract, engage, and convert your audience with quality content.",
  alternates: { canonical: "https://themarkitmedia.com/en/services/content-marketing" },
  openGraph: {
    title: "Content Marketing",
    description: "Content marketing services: content strategy, copywriting, blog writing, whitepapers, and SEO content. Attract, engage, and convert your audience with q...",
  },
};

export default function ContentMarketingPage() {
  return (
    <ServicePage
      icon={FileText}
      heroImage="/images/services/content-marketing.jpg"
      blogCategory="Content"
      title="Content Marketing"
      description="Attract, engage, and convert your audience with quality content. We develop content strategies, write SEO-optimized blog posts, produce whitepapers, and create copy that drives action."
      longDescription="Content marketing builds trust and authority with your target audience over time. Our content team develops strategy-driven editorial calendars, writes content optimized for both search engines and readers, and produces long-form assets like whitepapers and guides that generate leads. Every piece of content we create is aligned with your business goals and designed to move your audience through the funnel."
      subServices={[
        { title: "Content Strategy", desc: "Editorial planning, content audits, and strategic frameworks tied to business objectives.", href: "/services/content-marketing/content-strategy" },
        { title: "Copywriting", desc: "Website copy, landing page copy, ad copy, and brand messaging that converts.", href: "/services/content-marketing/copywriting" },
        { title: "Blog Writing", desc: "SEO-optimized articles that drive organic traffic and establish thought leadership.", href: "/services/content-marketing/blog-writing" },
        { title: "Whitepapers", desc: "In-depth research reports and guides that generate leads and build authority.", href: "/services/content-marketing/whitepapers" },
        { title: "SEO Content", desc: "Keyword-targeted content designed to rank in search and drive qualified traffic.", href: "/services/content-marketing/seo-content" },
      ]}
      benefits={[
        "Consistent content pipeline aligned with your marketing goals",
        "SEO-optimized writing that ranks and drives organic traffic",
        "Thought leadership content that builds authority in your industry",
        "Lead generation through gated content and strategic CTAs",
        "Repurposable content that works across multiple channels",
      ]}
      faq={[
        { q: "What types of content do you create?", a: "We create blog posts, website copy, landing pages, whitepapers, case study frameworks, email content, social media copy, and ad copy." },
        { q: "How do you develop a content strategy?", a: "We start with your business goals, research your audience and competitors, identify keyword opportunities, then build an editorial calendar with topics, formats, and publishing cadence." },
        { q: "Do you handle content publishing?", a: "Yes. We can publish directly to your CMS, or deliver content for your team to publish. We also handle formatting, image sourcing, and on-page SEO." },
        { q: "How do you measure content performance?", a: "We track organic traffic, keyword rankings, time on page, bounce rate, lead generation, and conversions from content. Monthly reporting keeps you informed." },
        { q: "Can you write for technical or niche industries?", a: "Yes. Our writers research thoroughly and collaborate with your subject matter experts to produce accurate content for specialized industries." },
      ]}
      tools={[
        { title: "Content Calendar", desc: "Plan and organize your content publishing schedule.", href: "/resources/content-calendar" },
        { title: "Content Brief Generator", desc: "Create structured content briefs for writers.", href: "/resources/content-brief-generator" },
        { title: "Headline Analyzer", desc: "Score and optimize your headlines for engagement.", href: "/resources/headline-analyzer" },
      ]}
      relatedServices={[
        { title: "SEO", href: "/services/seo" },
        { title: "Social Media", href: "/services/social-media" },
        { title: "Email Marketing", href: "/services/email-marketing" },
      ]}
    />
  );
}
