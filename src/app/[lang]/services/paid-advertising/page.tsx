import type { Metadata } from "next";
import { ServicePage } from "@/components/service-page";
import { TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Paid Advertising",
  description: "Paid advertising services: programmatic advertising, display ads, native advertising, and media buying. Reach your audience at scale with targeted ad placements.",
  alternates: { canonical: "https://themarkitmedia.com/en/services/paid-advertising" },
};

export default function PaidAdvertisingPage() {
  return (
    <ServicePage
      icon={TrendingUp}
      heroImage="/images/services/paid-advertising.jpg"
      blogCategory="Advertising"
      title="Paid Advertising"
      description="Reach your audience at scale with targeted ad placements. We manage programmatic campaigns, display advertising, native ads, and media buying across premium networks."
      longDescription="Paid advertising extends your reach beyond search and social into premium publisher networks, content platforms, and programmatic exchanges. Our media team identifies the right placements, negotiates rates, manages creative delivery, and optimizes campaigns for maximum impact. We combine data-driven targeting with strategic media planning to put your brand in front of the right audience at the right time."
      subServices={[
        { title: "Programmatic Advertising", desc: "Automated, data-driven ad buying across display, video, and connected TV inventory.", href: "/services/paid-advertising/programmatic" },
        { title: "Display Ads", desc: "Banner ads, rich media, and visual campaigns across premium publisher networks.", href: "/services/paid-advertising/display-ads" },
        { title: "Native Advertising", desc: "Sponsored content and in-feed ads that blend naturally with publisher content.", href: "/services/paid-advertising/native-advertising" },
        { title: "Media Buying", desc: "Strategic media planning, negotiation, and placement across digital and traditional channels.", href: "/services/paid-advertising/media-buying" },
      ]}
      benefits={[
        "Access to premium inventory across thousands of publisher sites",
        "Data-driven audience targeting with real-time optimization",
        "Brand-safe placements with fraud protection measures",
        "Consolidated media buying and reporting across channels",
        "Strategic placement that complements your search and social campaigns",
      ]}
      faq={[
        { q: "What is programmatic advertising?", a: "Programmatic advertising uses automated technology and data to buy ad inventory in real time. It allows precise audience targeting at scale across websites, apps, and connected TV." },
        { q: "How is this different from Google or Meta Ads?", a: "Paid advertising through programmatic and display networks extends your reach beyond search and social into premium publisher sites, news outlets, and content platforms." },
        { q: "What is native advertising?", a: "Native ads match the look and feel of the content around them. They appear as sponsored articles, recommended content, or in-feed placements on publisher sites." },
        { q: "How do you ensure brand safety?", a: "We use brand safety tools, blocklists, and contextual targeting to ensure your ads appear alongside appropriate content. We monitor placements and exclude problematic sites." },
        { q: "What budget do I need for display and programmatic?", a: "Programmatic campaigns can run at various budget levels. We recommend a budget based on your goals, audience size, and the channels you want to reach." },
      ]}
      relatedServices={[
        { title: "Performance Marketing", href: "/services/performance-marketing" },
        { title: "Video Production", href: "/services/video-production" },
        { title: "Digital Marketing", href: "/services/digital-marketing" },
      ]}
    />
  );
}
