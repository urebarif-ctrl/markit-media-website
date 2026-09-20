import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "CRM Consulting Services",
  description:
    "CRM selection, implementation, and workflow automation. Markit Media helps businesses choose the right platform, configure it properly, and automate processes to improve sales and customer relationships.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/services/digital-marketing/crm-consulting",
  },
};

export default function CrmConsultingPage() {
  return (
    <SubServicePage
      parentTitle="Digital Marketing"
      parentHref="/services/digital-marketing"
      title="CRM Consulting"
      description="A CRM is only as useful as its setup and adoption. We help you select the right platform, configure it to match your sales process, automate repetitive workflows, and train your team — so your CRM becomes a revenue tool, not just a contact database."
      details={[
        "CRM selection and evaluation — assess your business requirements, sales process, team size, and budget to recommend the CRM platform that fits, whether that's HubSpot, Salesforce, Zoho, or another solution.",
        "Implementation and configuration — set up your CRM with custom pipelines, deal stages, contact properties, and lifecycle stages that mirror how your team actually sells and manages accounts.",
        "Data migration and cleanup — import existing contacts, deals, and history from spreadsheets or legacy systems, deduplicating and standardizing records so you start with a clean database.",
        "Workflow automation — build automated sequences for lead assignment, follow-up reminders, deal stage progression, and internal notifications that reduce manual tasks and prevent leads from falling through cracks.",
        "Marketing and sales alignment — connect your CRM to marketing tools, configure lead scoring, and establish handoff processes so marketing-qualified leads flow smoothly to the right sales rep.",
        "Training and adoption support — provide hands-on training for your team, create documentation for your specific setup, and offer ongoing support to ensure the CRM is used consistently and effectively.",
      ]}
      benefits={[
        "CRM platform matched to your actual business needs and budget",
        "Custom configuration that reflects your real sales process",
        "Clean, deduplicated data migrated from your existing systems",
        "Automated workflows that save hours of manual work weekly",
        "Better lead handoff between marketing and sales teams",
        "Higher team adoption through proper training and documentation",
      ]}
      faq={[
        {
          q: "How do you decide which CRM is right for us?",
          a: "We evaluate your team size, sales process complexity, integration needs, budget, and growth plans. Rather than defaulting to one platform, we match the tool to your requirements — sometimes that's a full enterprise CRM, other times a lighter solution is the better fit.",
        },
        {
          q: "How long does a CRM implementation take?",
          a: "A standard implementation — including configuration, data migration, integrations, and training — typically takes four to eight weeks. More complex setups with extensive automation or multiple team structures may take longer.",
        },
        {
          q: "Can you work with a CRM we already have?",
          a: "Yes. Many clients come to us with a CRM that's underutilized or misconfigured. We audit your current setup, identify gaps, and optimize the configuration, workflows, and integrations to get more value from your existing investment.",
        },
        {
          q: "What kind of workflows can be automated?",
          a: "Common automations include lead assignment based on criteria, follow-up task creation, deal stage email triggers, lead scoring updates, internal notifications, and data enrichment. Any repetitive, rule-based process in your sales cycle is a candidate.",
        },
      ]}
    />
  );
}
