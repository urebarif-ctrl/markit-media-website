import type { Metadata } from "next";
import { ServicePage } from "@/components/service-page";
import { Palette } from "lucide-react";

export const metadata: Metadata = {
  title: "Branding & Design",
  description: "Brand strategy, logo design, visual identity, brand guidelines, and packaging design. Build a cohesive brand that stands out and earns trust.",
  alternates: { canonical: "https://themarkitmedia.com/en/services/branding" },
  openGraph: {
    title: "Branding & Design",
    description: "Brand strategy, logo design, visual identity, brand guidelines, and packaging design. Build a cohesive brand that stands out and earns trust.",
  },
};

export default function BrandingPage() {
  return (
    <ServicePage
      icon={Palette}
      heroImage="/images/services/branding.jpg"
      blogCategory="Branding"
      title="Branding & Design"
      description="Build a cohesive brand identity that stands out. From brand strategy and logo design to visual identity systems and packaging, we create brands that earn trust and recognition."
      longDescription="A strong brand is the foundation of every successful business. Our branding team works with you to define your brand positioning, develop a distinctive visual identity, and create comprehensive brand guidelines that ensure consistency across every touchpoint. Whether you are launching a new brand or refreshing an existing one, we deliver design systems that scale."
      subServices={[
        { title: "Brand Strategy", desc: "Positioning, messaging framework, and brand architecture that differentiate your business.", href: "/services/branding/brand-strategy" },
        { title: "Logo Design", desc: "Distinctive logo design with variations for different applications and formats.", href: "/services/branding/logo-design" },
        { title: "Visual Identity", desc: "Color systems, typography, iconography, and design elements that define your brand.", href: "/services/branding/visual-identity" },
        { title: "Brand Guidelines", desc: "Comprehensive brand books that ensure consistency across teams and touchpoints.", href: "/services/branding/brand-guidelines" },
        { title: "Packaging Design", desc: "Product packaging that communicates your brand story and stands out on shelves.", href: "/services/branding/packaging-design" },
      ]}
      benefits={[
        "Distinctive brand identity that differentiates you from competitors",
        "Consistent visual language across all channels and materials",
        "Scalable design systems that grow with your business",
        "Strategic positioning rooted in market and audience research",
        "Comprehensive brand guidelines for internal and external use",
      ]}
      faq={[
        { q: "What is included in a branding package?", a: "Our branding packages typically include brand strategy, logo design, color palette, typography selection, visual identity elements, and a comprehensive brand guidelines document." },
        { q: "How long does a branding project take?", a: "A full branding project typically takes 4-8 weeks. Logo-only projects can be completed in 2-3 weeks." },
        { q: "Can you rebrand an existing business?", a: "Yes. We handle full rebrands and brand refreshes, including strategy updates, new visual identity, and rollout planning across all existing materials and channels." },
        { q: "How many logo concepts will I see?", a: "We typically present 3-5 initial logo concepts based on our strategy work, then refine the chosen direction through multiple revision rounds." },
        { q: "Do you design marketing materials too?", a: "Yes. Once your brand identity is established, we can design business cards, brochures, social media templates, presentations, and any other collateral you need." },
      ]}
      tools={[
        { title: "Brand Voice Generator", desc: "Define your brand voice and tone of voice guidelines.", href: "/resources/brand-voice-generator" },
        { title: "Brand Name Generator", desc: "Generate and evaluate brand name ideas.", href: "/resources/brand-name-generator" },
        { title: "Color Palette Generator", desc: "Create cohesive brand color palettes.", href: "/resources/color-palette-generator" },
      ]}
      industries={[
        { title: "Fashion", href: "/industries/fashion" },
        { title: "Hospitality", href: "/industries/hospitality" },
        { title: "SaaS", href: "/industries/saas" },
        { title: "Professional Services", href: "/industries/professional-services" },
        { title: "Nonprofits", href: "/industries/nonprofits" },
      ]}
      relatedServices={[
        { title: "Website Development", href: "/services/website-development" },
        { title: "Social Media", href: "/services/social-media" },
        { title: "Video Production", href: "/services/video-production" },
      ]}
    />
  );
}
