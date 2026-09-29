import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "Lifestyle Photography | Markit Media",
  description: "Styled lifestyle photography for brands, products, hospitality, fashion, food, personal brands, and campaigns that need natural human context.",
  alternates: { canonical: "https://themarkitmedia.com/en/services/photography/lifestyle-photography" },
};

export default function Page() {
  return (
    <SubServicePage
      parentTitle="Professional Photography"
      parentHref="/services/photography"
      title="Lifestyle Photography"
      description="Styled lifestyle photography for brands, products, hospitality, fashion, food, personal brands, and campaigns that need natural human context."
      details={["Creative direction around the audience, campaign message, visual references, locations, talent, wardrobe, props, products, and channel requirements.","Natural-looking scenes that show products, services, spaces, or people in context rather than relying only on isolated studio-style imagery.","Brand lifestyle content for social media, websites, launches, paid campaigns, lookbooks, hospitality, food, fashion, wellness, and personal branding.","Shot lists that balance hero imagery, candid moments, detail shots, vertical content, horizontal compositions, and reusable supporting visuals.","On-set direction for talent, movement, interactions, product handling, framing, and consistency with the agreed brand mood.","Post-production and multi-format delivery for campaigns, social media, web, ads, and other agreed touchpoints."]}
      benefits={["More relatable brand imagery with human context","A varied asset library from one production cycle","Creative formatted for both organic and paid media","Stronger consistency between brand mood and photography","Useful hero, detail, vertical, and horizontal content","Less dependence on generic stock photography"]}
      faq={[{"q":"What is lifestyle photography?","a":"Lifestyle photography presents a product, service, person, or brand in a realistic or aspirational context. It is useful when customers need to imagine the experience rather than only see an isolated object."},{"q":"Can you source locations or talent?","a":"Location, talent, styling, and production requirements can be included in the planning depending on the project scope and market."},{"q":"Can we create social media content during the same shoot?","a":"Yes. We can build the shot list around social posts, stories, reels, website banners, paid ads, and campaign assets so the production generates multiple formats."},{"q":"Do you work with personal brands as well as companies?","a":"Yes. Lifestyle and personal-brand photography can be planned for founders, executives, creators, and professionals as well as consumer and service brands."}]}
      relatedServices={[{"title":"Social Media Marketing","href":"/services/social-media","desc":"Plan the content into a wider social strategy."},{"title":"Personal Branding","href":"/industries/personal-branding","desc":"Build a consistent founder or executive presence."}]}
    />
  );
}
