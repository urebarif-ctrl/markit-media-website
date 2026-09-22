import type { Metadata } from "next";
import { ServicePage } from "@/components/service-page";
import { Camera } from "lucide-react";

export const metadata: Metadata = {
  title: "Professional Photography",
  description: "Professional photography services: product photography, corporate headshots, event coverage, architectural shoots, and lifestyle photography for brands.",
  alternates: { canonical: "https://themarkitmedia.com/en/services/photography" },
  openGraph: {
    title: "Professional Photography — Markit Media",
    description: "Professional photography: product, corporate, event, architectural, and lifestyle photography for brands.",
  },
};

export default function PhotographyPage() {
  return (
    <ServicePage
      icon={Camera}
      blogCategory="Photography"
      title="Professional Photography"
      description="Professional photography that captures your brand, products, and people at their best. From product shoots to corporate events, we deliver images that work across every channel."
      longDescription="Great photography is the foundation of strong visual branding. Our photography team delivers high-quality images for product catalogs, corporate profiles, events, social media, and advertising campaigns. We handle everything from creative direction and styling to shooting, retouching, and final delivery in the formats you need. Whether you need a single headshot session or ongoing product photography, we deliver consistent, professional results."
      subServices={[
        { title: "Product Photography", desc: "Clean, compelling product images for e-commerce, catalogs, and advertising.", href: "/services/photography/product-photography" },
        { title: "Corporate Photography", desc: "Professional headshots, team photos, and office environment shoots.", href: "/services/photography/corporate-photography" },
        { title: "Event Photography", desc: "Live event coverage for conferences, launches, exhibitions, and corporate events.", href: "/services/photography/event-photography" },
        { title: "Architectural Photography", desc: "Interior and exterior photography for real estate, hospitality, and commercial properties.", href: "/services/photography/architectural-photography" },
        { title: "Lifestyle Photography", desc: "Authentic, styled photography for social media, branding, and advertising campaigns.", href: "/services/photography/lifestyle-photography" },
      ]}
      benefits={[
        "Professional-grade images ready for web, print, and social",
        "Creative direction and styling included",
        "Fast turnaround with professional retouching",
        "Consistent brand photography across all touchpoints",
        "Flexible packages from single sessions to ongoing retainers",
      ]}
      faq={[
        { q: "What types of photography do you offer?", a: "We offer product photography, corporate headshots and team photos, event coverage, architectural and interior photography, lifestyle shoots, and food photography." },
        { q: "Do you provide retouching?", a: "Yes. All deliverables include professional retouching. The level of retouching depends on the project — product photos get clean background removal and color correction, while lifestyle images get more nuanced editing." },
        { q: "What formats do you deliver?", a: "We deliver high-resolution files in formats suitable for your needs — typically JPEG for web use and TIFF for print. We can also provide files sized for specific social media platforms." },
        { q: "Can you shoot on location?", a: "Yes. We shoot on location, in studio, or at your premises. For product photography, we can set up a temporary studio at your facility if needed." },
        { q: "Do you offer ongoing photography packages?", a: "Yes. Many of our clients use monthly photography retainers for regular product shoots, social media content, or event coverage. This ensures consistent quality and availability." },
      ]}
      industries={[
        { title: "E-Commerce", href: "/industries/ecommerce" },
        { title: "Real Estate", href: "/industries/real-estate" },
        { title: "Fashion", href: "/industries/fashion" },
        { title: "Hospitality", href: "/industries/hospitality" },
        { title: "Food & Beverage", href: "/industries/food-beverage" },
      ]}
      relatedServices={[
        { title: "Video Production", href: "/services/video-production" },
        { title: "Branding & Design", href: "/services/branding" },
        { title: "Social Media", href: "/services/social-media" },
      ]}
      tools={[
        { title: "Image Size Guide", desc: "Optimal image sizes for every platform.", href: "/resources/image-size-guide" },
        { title: "Brand Guidelines Checklist", desc: "Ensure visual consistency across all shoots.", href: "/resources/brand-guidelines-checklist" },
        { title: "Content Calendar", desc: "Plan your visual content schedule.", href: "/resources/content-calendar" },
      ]}
    />
  );
}
