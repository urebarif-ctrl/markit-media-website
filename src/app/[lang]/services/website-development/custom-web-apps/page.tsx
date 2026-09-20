import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "Custom Web Applications",
  description:
    "Full-stack custom web application development including dashboards, internal tools, SaaS platforms, and third-party integrations. Built to solve your specific business problems.",
  alternates: {
    canonical:
      "https://themarkitmedia.com/en/services/website-development/custom-web-apps",
  },
  openGraph: {
    title: "Custom Web Applications",
    description: "Full-stack custom web application development including dashboards, internal tools, SaaS platforms, and third-party integrations. Built to solve your sp...",
  },
};

export default function CustomWebAppsPage() {
  return (
    <SubServicePage
      parentTitle="Website Development"
      parentHref="/services/website-development"
      title="Custom Web Applications"
      description="When off-the-shelf software does not fit, we build custom web applications tailored to your workflows. From internal dashboards and client portals to full SaaS platforms, we handle architecture, development, and deployment so you get a tool that works exactly the way your business needs."
      details={[
        "Full-stack application development using modern frameworks and technologies, with clean architecture that supports long-term maintainability and feature growth.",
        "Dashboard and reporting tool development with real-time data visualization, role-based access control, and integrations with your existing data sources.",
        "Client portal and self-service platform development that lets your customers manage accounts, view data, submit requests, and interact with your business online.",
        "Third-party API integration to connect your application with CRMs, payment processors, accounting software, shipping providers, and other tools in your tech stack.",
        "Database design and optimization for reliable data storage, efficient queries, and structured data models that support your application's core workflows.",
        "Authentication and authorization implementation including single sign-on, multi-factor authentication, and granular permission systems to keep your data secure.",
        "Testing, deployment, and DevOps setup with automated testing pipelines, staging environments, and production monitoring to ensure reliability after launch.",
      ]}
      benefits={[
        "Software built around your exact business processes",
        "Reduced reliance on manual workflows and spreadsheets",
        "Secure access controls and data protection",
        "Integrations with your existing tools and systems",
        "Scalable architecture designed for future growth",
        "Ongoing support and iterative feature development",
      ]}
      faq={[
        {
          q: "When should I build a custom web app instead of using existing software?",
          a: "A custom application makes sense when your workflows are unique enough that off-the-shelf tools require too many workarounds, when you need specific integrations, or when you want to own the platform and data entirely. We help you evaluate whether custom development is the right investment.",
        },
        {
          q: "What technologies do you use for custom web apps?",
          a: "We select the technology stack based on project requirements. Common choices include React or Next.js for front ends, Node.js or Python for back ends, and PostgreSQL or MongoDB for databases. We recommend what fits your needs, team, and long-term goals.",
        },
        {
          q: "How long does it take to build a custom web application?",
          a: "Timelines vary based on complexity. A focused internal tool might take 6-10 weeks, while a full SaaS platform with multiple user roles and integrations could take several months. We scope projects carefully and deliver in iterative phases.",
        },
        {
          q: "Do you provide ongoing maintenance after launch?",
          a: "Yes. We offer maintenance and support agreements that cover bug fixes, security updates, performance monitoring, and iterative feature development as your needs evolve.",
        },
      ]}
    />
  );
}
