import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "Virtual Assistant Services",
  description:
    "Professional virtual assistants for scheduling, email management, research, and administrative tasks. Markit Media provides trained VAs that integrate seamlessly with your team.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/services/bpo/virtual-assistants",
  },
};

export default function VirtualAssistantsPage() {
  return (
    <SubServicePage
      parentTitle="BPO Services"
      parentHref="/services/bpo"
      title="Virtual Assistants"
      description="Free up your time for high-value work by delegating scheduling, email management, research, and administrative tasks to trained virtual assistants. Our VAs integrate with your tools and workflows, operating as a seamless extension of your team."
      details={[
        "Calendar and scheduling management — coordinate meetings, manage availability across time zones, send reminders, and handle rescheduling so your calendar stays organized without your involvement.",
        "Email management and triage — sort, prioritize, and draft responses to incoming emails, flag urgent items, and maintain inbox zero using your preferred filters and templates.",
        "Research and data gathering — compile market research, competitor analysis, vendor comparisons, and prospect lists with organized deliverables you can act on immediately.",
        "Administrative task execution — handle document formatting, file organization, travel booking, expense tracking, and other recurring tasks that consume productive hours.",
        "CRM and tool management — update records in your CRM, project management tools, and spreadsheets to keep your systems accurate and your team informed without manual data entry.",
        "Communication and follow-up — draft correspondence, follow up with clients and vendors on your behalf, and manage routine communications that require a professional touch.",
      ]}
      benefits={[
        "More hours in your day for strategy, sales, and high-impact work",
        "Trained assistants who learn your preferences and workflows quickly",
        "Reliable coverage across time zones for continuous task completion",
        "Reduced overhead compared to hiring full-time administrative staff",
        "Seamless integration with your existing tools and communication platforms",
        "Scalable support that adjusts to your workload as needs change",
      ]}
      faq={[
        {
          q: "What tasks can a virtual assistant handle?",
          a: "Our VAs handle scheduling, email management, research, data entry, document preparation, travel booking, CRM updates, social media scheduling, and general administrative tasks. If a task can be done remotely with a computer and clear instructions, a VA can likely handle it.",
        },
        {
          q: "How do you match a VA to my business?",
          a: "We start with an onboarding call to understand your industry, tools, communication style, and task priorities. Based on this, we assign a VA with relevant experience and conduct a training period where they learn your specific workflows and preferences.",
        },
        {
          q: "What tools do your virtual assistants work with?",
          a: "Our VAs are proficient in common business tools including Google Workspace, Microsoft 365, Slack, Zoom, Asana, Trello, Monday.com, HubSpot, Salesforce, and most major CRM and project management platforms. They can also learn new tools during onboarding.",
        },
        {
          q: "How do you ensure quality and accountability?",
          a: "Each VA follows documented processes for recurring tasks, logs their time and completed work, and participates in regular check-ins. We also provide a dedicated account manager who monitors performance and serves as your point of escalation.",
        },
      ]}
    />
  );
}
