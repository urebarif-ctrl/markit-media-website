import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "Visual Identity Design Services",
  description:
    "Comprehensive visual identity systems including color palettes, typography, iconography, and design elements. Markit Media creates cohesive brand visuals that work across every touchpoint.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/services/branding/visual-identity",
  },
};

export default function VisualIdentityPage() {
  return (
    <SubServicePage
      parentTitle="Branding & Design"
      parentHref="/services/branding"
      title="Visual Identity"
      description="Your visual identity is the complete system of design elements that represent your brand. Beyond the logo, we develop color palettes, typography, iconography, patterns, and graphic devices that create a cohesive and recognizable look across every touchpoint."
      details={[
        "Color system development — define a primary and secondary color palette with exact specifications (HEX, RGB, CMYK, Pantone) and usage rules for digital, print, and environmental applications.",
        "Typography selection — choose and pair typefaces that reflect your brand personality, with a hierarchy system covering headings, body text, captions, and accent use across all media.",
        "Custom iconography — design a consistent icon set tailored to your brand style for use in websites, apps, presentations, signage, and marketing materials.",
        "Pattern and texture library — create repeatable graphic elements such as patterns, textures, and background treatments that add visual depth and brand recognition.",
        "Photography and imagery direction — establish guidelines for photography style, image treatment, illustration approach, and visual tone to maintain consistency across campaigns.",
        "Design element system — develop supporting graphic devices like dividers, frames, badges, and layout structures that give your brand materials a unified appearance.",
      ]}
      benefits={[
        "A complete visual system that ensures consistency across all touchpoints",
        "Professionally specified color palettes ready for digital and print production",
        "Typography pairings that reinforce brand personality and readability",
        "Custom graphic elements that set your brand apart from template-based competitors",
        "Clear guidelines that empower your team to create on-brand materials independently",
        "A cohesive look that builds recognition and trust over time",
      ]}
      faq={[
        {
          q: "What is visual identity and how is it different from a logo?",
          a: "A logo is a single element of your brand. Visual identity is the complete design system — colors, typography, iconography, patterns, imagery style, and graphic devices — that surrounds and supports your logo. Together, these elements create a consistent, recognizable brand presence.",
        },
        {
          q: "Do I need a visual identity if I already have brand colors and a logo?",
          a: "A logo and a few colors are a starting point, but they are not a system. A full visual identity defines how every design element works together, with rules for usage, hierarchy, and application. This consistency is what makes established brands feel polished and professional.",
        },
        {
          q: "Can you develop a visual identity for an existing brand?",
          a: "Absolutely. We can build a visual identity system around your existing logo and brand elements. This involves refining what you have, filling in gaps, and creating a documented system that makes every future design decision easier and more consistent.",
        },
        {
          q: "What deliverables are included in a visual identity project?",
          a: "Deliverables typically include a defined color palette with exact specifications, a typography system, custom iconography, supporting graphic elements, imagery direction, and a summary document showing how everything works together. The exact scope depends on your needs.",
        },
      ]}
    />
  );
}
