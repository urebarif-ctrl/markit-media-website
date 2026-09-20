import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "Logo Design Services",
  description:
    "Professional logo design with multiple concepts, versatile variations, and production-ready file formats. Markit Media creates logos that work across digital and print applications.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/services/branding/logo-design",
  },
  openGraph: {
    title: "Logo Design Services",
    description: "Professional logo design with multiple concepts, versatile variations, and production-ready file formats. Markit Media creates logos that work across di...",
  },
};

export default function LogoDesignPage() {
  return (
    <SubServicePage
      parentTitle="Branding & Design"
      parentHref="/services/branding"
      title="Logo Design"
      description="Your logo is the most recognized element of your brand. We design logos that are distinctive, versatile, and built to last. Every concept is crafted with strategic intent and delivered in all the formats you need for digital, print, and environmental use."
      details={[
        "Discovery and creative brief — understand your business, audience, competitors, and design preferences through a structured briefing process before any concepts are created.",
        "Concept development — explore multiple creative directions with initial logo concepts, each grounded in your brand strategy and designed to communicate your core identity.",
        "Logo variations — deliver a complete logo system including primary, secondary, icon-only, and wordmark versions so you have the right format for every context.",
        "Color and monochrome versions — provide full-color, single-color, black, and white-reversed versions to ensure your logo looks sharp on any background.",
        "File format delivery — supply production-ready files in vector (SVG, AI, EPS) and raster (PNG, JPG) formats, organized for easy access by your team and vendors.",
        "Application mockups — present your logo in real-world contexts such as business cards, signage, packaging, and digital screens so you can see how it performs before finalizing.",
      ]}
      benefits={[
        "A distinctive mark that makes your brand instantly recognizable",
        "Multiple logo variations suited for every application and context",
        "Production-ready files in all standard vector and raster formats",
        "Designs tested for legibility at small sizes and across backgrounds",
        "A visual identity anchor that ties all brand materials together",
        "A collaborative process with structured feedback and revision rounds",
      ]}
      faq={[
        {
          q: "How many logo concepts will I receive?",
          a: "The number of initial concepts depends on the scope of your project. Most engagements include two to four distinct creative directions, each exploring a different visual approach. After you select a direction, we refine it through multiple revision rounds until it is finalized.",
        },
        {
          q: "What file formats will I receive for my logo?",
          a: "You will receive vector files (SVG, AI, EPS) for scalable, print-ready use and raster files (PNG with transparent background, JPG) for digital applications. We also include variations in full-color, single-color, black, and white-reversed formats.",
        },
        {
          q: "How long does the logo design process take?",
          a: "A typical logo design project takes two to four weeks from initial briefing to final delivery. Timelines depend on the number of concepts, the revision process, and how quickly feedback is provided at each stage.",
        },
        {
          q: "Can you redesign or refresh an existing logo?",
          a: "Yes. A logo refresh updates your existing mark to feel more current while preserving the recognition you have already built. We can modernize typography, simplify shapes, or adjust proportions while keeping the core identity intact.",
        },
      ]}
    />
  );
}
