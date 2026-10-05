import type { Metadata } from "next";
import { ServicePage } from "@/components/service-page";
import { Smartphone } from "lucide-react";

export const metadata: Metadata = {
  title: "App Development Company | Mobile, iOS, Android & Web Apps",
  description: "Custom app development for mobile, iOS, Android, cross-platform and web applications. Product strategy, UX, engineering, APIs, analytics and launch support.",
  alternates: { canonical: "https://themarkitmedia.com/en/services/app-development" },
};

export default function Page() {
  return <ServicePage
    icon={Smartphone}
    title="App Development"
    description="Design and build mobile and web applications around real user journeys, business requirements and measurable product goals."
    longDescription="Our app development work covers product discovery, UX, mobile engineering, web applications, APIs, integrations, analytics, QA and post-launch iteration. The parent service connects each specialist build so the architecture stays clear instead of treating every technology page as an unrelated service."
    subServices={[
      { title: "Mobile App Development", desc: "The mobile app hub for native, Android, iOS and cross-platform application development.", href: "/services/app-development/mobile-apps" },
      { title: "Web App Development", desc: "Browser-based applications, SaaS products, portals, dashboards and internal tools.", href: "/services/app-development/web-apps" },
    ]}
    platforms={[
      { name: "iOS", note: "Native iPhone and iPad application delivery." },
      { name: "Android", note: "Native Android applications and Play Store releases." },
      { name: "React Native", note: "Shared mobile codebases for iOS and Android." },
      { name: "Flutter", note: "Cross-platform mobile application development." },
      { name: "Next.js", note: "Modern web applications and product front ends." },
      { name: "Node.js", note: "APIs, integrations and backend services." },
    ]}
    benefits={[
      "One parent architecture across mobile and web app services",
      "Platform selection based on product requirements",
      "Reusable design systems and maintainable code",
      "API, CRM, payment and analytics integration",
      "Quality assurance across devices and user flows",
      "Post-launch monitoring and product iteration",
    ]}
    faq={[
      { q: "Do you build both mobile and web apps?", a: "Yes. Mobile App Development and Web App Development sit under the same App Development service family, with specialist pages for native, Android, iOS and cross-platform builds." },
      { q: "Should we build native or cross-platform?", a: "It depends on product requirements, device features, team structure, budget and roadmap. We evaluate those constraints before recommending native iOS and Android or a shared framework such as React Native or Flutter." },
      { q: "Can you build an MVP first?", a: "Yes. We can define the smallest useful release, validate the core workflow and expand after real usage data is available." },
    ]}
    relatedServices={[
      { title: "CRM Development", href: "/services/crm-development" },
      { title: "Website Development", href: "/services/website-development" },
      { title: "AI Solutions", href: "/services/ai" },
    ]}
  />;
}