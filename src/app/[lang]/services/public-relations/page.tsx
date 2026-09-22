import type { Metadata } from "next";
import { ServicePage } from "@/components/service-page";
import { Megaphone } from "lucide-react";

export const metadata: Metadata = {
  title: "Public Relations",
  description: "Strategic public relations services: media outreach, press releases, reputation management, event PR, and crisis communications for brands that want to be heard.",
  alternates: { canonical: "https://themarkitmedia.com/en/services/public-relations" },
  openGraph: {
    title: "Public Relations — Markit Media",
    description: "Strategic public relations services: media outreach, press releases, reputation management, event PR, and crisis communications.",
  },
};

export default function PublicRelationsPage() {
  return (
    <ServicePage
      icon={Megaphone}
      blogCategory="PR"
      title="Public Relations"
      description="Build credibility, manage your reputation, and get your brand in front of the right audiences through strategic public relations."
      longDescription="Public relations is about shaping how people perceive your brand. We help businesses earn media coverage, manage their reputation, and build relationships with journalists, influencers, and industry voices. From press releases and media kits to event PR and crisis communications, our team handles the strategy and execution so your brand story reaches the audiences that matter."
      subServices={[
        { title: "Media Outreach", desc: "Targeted pitching to journalists, publications, and media outlets relevant to your industry.", href: "/services/public-relations/media-outreach" },
        { title: "Press Releases", desc: "Professionally written press releases distributed to relevant media channels.", href: "/services/public-relations/press-releases" },
        { title: "Reputation Management", desc: "Monitor, protect, and enhance your brand's online and offline reputation.", href: "/services/public-relations/reputation-management" },
        { title: "Event PR", desc: "Pre-event buzz, live coverage, and post-event amplification for launches, exhibitions, and corporate events.", href: "/services/public-relations/event-pr" },
        { title: "Crisis Communications", desc: "Rapid response planning and execution to protect your brand during sensitive situations.", href: "/services/public-relations/crisis-communications" },
      ]}
      benefits={[
        "Earned media coverage in relevant publications and outlets",
        "Professional press materials ready for distribution",
        "Proactive reputation monitoring and management",
        "Event amplification that extends reach beyond attendees",
        "Crisis preparedness planning before issues arise",
      ]}
      faq={[
        { q: "What industries do you handle PR for?", a: "We work across multiple industries including real estate, fashion, technology, FMCG, hospitality, and corporate sectors. Our approach adapts to your industry's media landscape." },
        { q: "Do you guarantee media placements?", a: "We do not guarantee specific placements — no ethical PR firm can. We do guarantee professional pitching, well-crafted materials, and persistent follow-through with relevant outlets." },
        { q: "How do you measure PR results?", a: "We track media mentions, publication reach, sentiment analysis, share of voice, and referral traffic from earned media. We provide regular reports showing coverage and impact." },
        { q: "Can you handle event PR?", a: "Yes. We handle pre-event media outreach, press kits, live event coverage and content creation, and post-event follow-up with media contacts." },
        { q: "Do you offer crisis communications?", a: "Yes. We help prepare crisis response plans and can provide rapid-response support during reputational incidents. Preparation before a crisis is always more effective than reaction during one." },
      ]}
      industries={[
        { title: "Real Estate", href: "/industries/real-estate" },
        { title: "Fashion", href: "/industries/fashion" },
        { title: "Hospitality", href: "/industries/hospitality" },
        { title: "Healthcare", href: "/industries/healthcare" },
        { title: "Technology", href: "/industries/technology" },
      ]}
      relatedServices={[
        { title: "Social Media", href: "/services/social-media" },
        { title: "Content Marketing", href: "/services/content-marketing" },
        { title: "Branding & Design", href: "/services/branding" },
      ]}
      tools={[
        { title: "Brand Voice Generator", desc: "Define your brand voice for consistent messaging.", href: "/resources/brand-voice-generator" },
        { title: "Stakeholder Report", desc: "Build professional stakeholder reports.", href: "/resources/stakeholder-report" },
        { title: "Content Brief Generator", desc: "Create structured briefs for PR content.", href: "/resources/content-brief-generator" },
      ]}
    />
  );
}
