import type { Metadata } from "next";
import { ServicePage } from "@/components/service-page";
import { Briefcase } from "lucide-react";

export const metadata: Metadata = {
  title: "BPO & Call Center Outsourcing Services",
  description: "BPO and call center outsourcing for inbound customer service, outbound sales, cold calling, appointment setting, virtual assistants and back-office operations.",
  alternates: { canonical: "https://themarkitmedia.com/en/services/bpo" },
  openGraph: {
    title: "BPO Services",
    description: "Business process outsourcing: virtual assistants, data entry, customer support, and operations management. Scale your team with reliable offshore support.",
  },
};

export default function BpoPage() {
  return (
    <ServicePage
      icon={Briefcase}
      heroImage="/images/services/bpo.jpg"
      title="BPO Services"
      description="Scale your team with reliable business process outsourcing. We provide virtual assistants, data entry specialists, customer support agents, and operations staff to handle your day-to-day tasks."
      longDescription="Growing businesses need reliable support for the operational tasks that keep things running. Our BPO team provides trained professionals who integrate with your workflows and tools to handle virtual assistance, data entry, customer support, and operations management. We recruit, train, and manage dedicated staff so you can focus on growth while we handle execution."
      subServices={[
        { title: "Call Center Services", desc: "Inbound and outbound call center teams for support, sales, qualification and appointment setting.", href: "/services/bpo/call-center" },\n        { title: "Cold Calling & Outbound Sales", desc: "Structured outbound prospecting, lead qualification, appointment setting and CRM handoff.", href: "/services/bpo/cold-calling" },\n        { title: "Customer Service Representatives", desc: "Dedicated customer care representatives across phone, email, chat and ticketing.", href: "/services/bpo/customer-service-representatives" },\n        { title: "Virtual Assistants", desc: "Dedicated assistants for scheduling, email management, research, and administrative tasks.", href: "/services/bpo/virtual-assistants" },
        { title: "Data Entry", desc: "Accurate, high-volume data entry, data cleaning, and database management.", href: "/services/bpo/data-entry" },
        { title: "Customer Support", desc: "Trained support agents for email, chat, and phone across your preferred tools.", href: "/services/bpo/customer-support" },
        { title: "Operations", desc: "Process management, order fulfillment support, and back-office operations.", href: "/services/bpo/operations" },
      ]}
      comparison={{
        title: "Managed BPO Team vs. Building the Function In-House",
        leftLabel: "Markit Media BPO",
        rightLabel: "In-House Setup",
        rows: [
          ["Hiring & Ramp-Up", "Recruiting, onboarding and workflow setup managed as part of the engagement", "Business recruits, hires, trains and manages each role internally"],
          ["Coverage", "Flexible staffing across call center, customer service, outbound sales and back-office roles", "Coverage depends on internal headcount and shift planning"],
          ["Quality Control", "Defined scripts, QA reviews, coaching and escalation workflows", "Business must create and operate its own QA process"],
          ["Technology", "Team can work inside approved CRM, dialer, helpdesk and collaboration tools", "Business owns setup, access, training and administration"],
          ["Scaling", "Capacity can be adjusted as requirements change", "Scaling normally requires additional recruitment and management"],
          ["Management", "Operational oversight and reporting can be included", "Internal managers remain responsible for day-to-day staffing and performance"],
        ],
      }}
      benefits={[
        "Reduce operational costs while maintaining quality",
        "Trained staff who integrate with your tools and workflows",
        "Flexible scaling to match your business demands",
        "Dedicated account management and quality oversight",
        "Free up your core team to focus on strategic work",
      ]}
      faq={[
        { q: "What tasks can a virtual assistant handle?", a: "Our virtual assistants handle scheduling, email management, data research, document preparation, CRM updates, social media posting, and other administrative tasks tailored to your needs." },
        { q: "What tools do your BPO staff work with?", a: "Our team is trained on popular tools including Slack, Asana, Trello, HubSpot, Salesforce, Zendesk, Intercom, Google Workspace, and Microsoft 365." },
        { q: "How do you ensure quality?", a: "We assign dedicated account managers who oversee work quality, conduct regular performance reviews, and maintain clear communication with your team." },
        { q: "What are your working hours?", a: "We offer flexible scheduling to match your time zone and business hours, including coverage during US, UK, and MENA business hours." },
        { q: "How quickly can you get started?", a: "We can onboard dedicated staff within 1-2 weeks depending on role complexity. We handle recruitment, training, and setup so you can focus on your priorities." },
      ]}
      industries={[
        { title: "E-Commerce", href: "/industries/ecommerce" },
        { title: "SaaS", href: "/industries/saas" },
        { title: "Healthcare", href: "/industries/healthcare" },
        { title: "Professional Services", href: "/industries/professional-services" },
        { title: "Finance", href: "/industries/finance" },
      ]}
      relatedServices={[
        { title: "AI Solutions", href: "/services/ai" },
        { title: "Digital Marketing", href: "/services/digital-marketing" },
        { title: "E-commerce Marketing", href: "/services/ecommerce-marketing" },
      ]}
      tools={[
        { title: "Client Onboarding Checklist", desc: "Streamline your client onboarding process.", href: "/resources/client-onboarding-checklist" },
        { title: "Meeting Agenda Builder", desc: "Create structured meeting agendas.", href: "/resources/meeting-agenda-builder" },
        { title: "Marketing Proposal Generator", desc: "Generate professional service proposals.", href: "/resources/marketing-proposal-generator" },
      ]}
      blogCategory="Marketing Strategy"
    />
  );
}
