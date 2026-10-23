import type { Metadata } from "next";
import { CaseStudyPage } from "@/components/case-study-page";
import { WorkScreens, type WorkScreen } from "@/components/work-screens";
import { caseStudyMetadata } from "@/lib/case-studies";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return caseStudyMetadata("everest-snacks", lang);
}

/** Captured from the live site on 23 Oct 2026. */
const IMG = "/images/work/everest-snacks";
const SCREENS: WorkScreen[] = [
  { src: `${IMG}/home-bars.webp`, width: 1200, height: 750, alt: "Everest home page, Our Energy Bars row: four bar cards with flavour names and short descriptions", caption: "Home page: the four bars, each with a flavour name and a short description." },
  { src: `${IMG}/home-where.webp`, width: 1200, height: 750, alt: "Everest home page: where-to-buy tabs with retailer logos above three Instagram posts", caption: "Home page: the where-to-buy tabs, with the retailer logos shown on the client's site, and the Instagram block." },
  { src: `${IMG}/why-top.webp`, width: 1200, height: 750, alt: "Everest Why Everest page: banner reading Real ingredients, real energy, then a message from the founder", caption: "Why Everest: the banner and the founder's message." },
  { src: `${IMG}/why-values.webp`, width: 1200, height: 750, alt: "Everest Why Everest page: five company values and the start of The Everest Journey graphic", caption: "Why Everest: the five values and the Everest Journey graphic." },
  { src: `${IMG}/products-top.webp`, width: 1200, height: 750, alt: "Everest Products page: four energy bar cards with flavour names, descriptions and protein and energy badges", caption: "Products: one card per bar, with protein and energy badges." },
  { src: `${IMG}/connect-top.webp`, width: 1200, height: 750, alt: "Everest Connect With Us page: banner and the start of the contact form with a purpose selector", caption: "Connect With Us: the contact form aimed at university students." },
  { src: `${IMG}/blogs-top.webp`, width: 1200, height: 750, alt: "Everest Blogs page: three articles dated 30 July 2026 and a newsletter sign-up", caption: "Blogs: the three articles and the newsletter sign-up." },
  { src: `${IMG}/mobile-home.webp`, width: 390, height: 844, device: "phone", alt: "Everest home page on a phone: headline Fuel your adventure, the Explore Bars button and the first trust claim", caption: "Home page on a phone." },
  { src: `${IMG}/mobile-products.webp`, width: 390, height: 844, device: "phone", alt: "Everest Products page on a phone: Products banner and the first bar cards", caption: "Products page on a phone." },
];

export default async function EverestSnacksPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = ["en", "ar", "ur"].includes(lang) ? lang : "en";
  return (
    <CaseStudyPage
      slug="everest-snacks"
      locale={locale}
      client="Everest Snacks"
      industry="Food & beverage"
      services={["Website Development", "Social Media", "Photography", "Animation"]}
      title="Everest Snacks: Website, Social Media and Visual Content for an Energy Bar Brand"
      subtitle="A five-page WordPress website for an energy bar brand, with social media, photography, AI photo enhancement and animation."
      context="Everest Snacks is an energy bar brand. Markit Media designed and developed its website and also handled its social media, photography, AI enhancement of photos and animation."
      approach="The website leads with the brand promise, places four trust claims under it, presents the four bars and opens a contact route for university students; the other work covered social media, photography, AI photo enhancement and animation."
      deliverables={["Five-page website", "Social media", "Photography", "AI enhancement of photos", "Animation"]}
      relatedServices={[
        { title: "Website Development", href: "/services/website-development" },
        { title: "Social Media", href: "/services/social-media" },
        { title: "Photography", href: "/services/photography" },
        { title: "Animation", href: "/services/video-production/animation" },
      ]}
    >
      <WorkScreens heading="Screens from the live site" intro="Captured from everestsnacks.com on 23 October 2026." screens={SCREENS} />
    </CaseStudyPage>
  );
}
