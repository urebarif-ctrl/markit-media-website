import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "Customer Support Services",
  description:
    "Professional customer support agents for email, live chat, and phone. Markit Media provides trained support teams that integrate with your helpdesk and maintain your brand voice.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/services/bpo/customer-support",
  },
};

export default function CustomerSupportPage() {
  return (
    <SubServicePage
      parentTitle="BPO Services"
      parentHref="/services/bpo"
      title="Customer Support"
      description="Deliver fast, professional support without building an in-house team. Our trained agents handle email, live chat, and phone inquiries using your tools and brand voice, keeping your customers satisfied while you focus on growing your business."
      details={[
        "Email support — respond to customer inquiries, complaints, and requests within agreed response times using templates and escalation procedures aligned with your brand standards.",
        "Live chat agents — staff your website and app chat with trained agents who resolve questions in real time, reduce bounce rates, and guide visitors toward purchase decisions.",
        "Phone support — provide dedicated or shared phone agents for inbound calls, order inquiries, technical troubleshooting, and appointment scheduling with professional call handling.",
        "Helpdesk and ticketing integration — work directly within your existing tools like Zendesk, Freshdesk, Intercom, Gorgias, or HubSpot to manage tickets, tag issues, and maintain complete customer histories.",
        "Knowledge base development — build and maintain FAQ pages, help articles, and internal documentation that enable faster resolution times and consistent answers across your support team.",
        "Reporting and quality monitoring — track resolution times, customer satisfaction scores, first-contact resolution rates, and ticket volumes with regular reports that highlight trends and improvement opportunities.",
      ]}
      benefits={[
        "Faster response times that improve customer satisfaction and retention",
        "Multi-channel coverage across email, chat, and phone from one team",
        "Trained agents who represent your brand voice and follow your processes",
        "Seamless integration with your existing helpdesk and CRM tools",
        "Reduced support costs compared to hiring and managing an in-house team",
        "Scalable staffing that adjusts for seasonal demand and growth",
      ]}
      faq={[
        {
          q: "What channels do your support agents cover?",
          a: "Our agents handle email, live chat, and phone support. We can also manage social media DMs and community forum responses if needed. The channels we staff depend on where your customers prefer to reach you.",
        },
        {
          q: "How do agents learn our products and brand voice?",
          a: "We start with an onboarding phase where agents study your products, review past tickets, learn your tone guidelines, and practice with sample scenarios. We also create internal guides and response templates that ensure consistency from day one.",
        },
        {
          q: "Which helpdesk platforms do you work with?",
          a: "We work with all major platforms including Zendesk, Freshdesk, Intercom, Gorgias, HubSpot Service Hub, Help Scout, and others. If you use a custom or less common tool, our agents can learn it during onboarding.",
        },
        {
          q: "How do you handle support during high-volume periods?",
          a: "We plan for volume spikes by training backup agents in advance and adjusting staffing levels based on historical patterns and your forecasts. This ensures response times stay within target even during product launches, sales events, or seasonal peaks.",
        },
      ]}
    />
  );
}
