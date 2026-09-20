import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "Operations Support Services",
  description:
    "Streamline your back-office with process management, order fulfillment support, and operational task execution. Markit Media keeps your business running efficiently behind the scenes.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/services/bpo/operations",
  },
};

export default function OperationsPage() {
  return (
    <SubServicePage
      parentTitle="BPO Services"
      parentHref="/services/bpo"
      title="Operations Support"
      description="Keep your business running smoothly without growing your internal team. We handle process management, order fulfillment coordination, vendor communication, and back-office tasks that are essential but time-consuming, so your core team can focus on growth."
      details={[
        "Process management — document, standardize, and execute recurring business processes including approvals, reporting workflows, compliance checks, and interdepartmental coordination.",
        "Order fulfillment support — manage order processing, shipment tracking, returns coordination, and fulfillment partner communication to ensure customers receive their orders accurately and on time.",
        "Vendor and supplier coordination — handle purchase orders, invoice processing, delivery scheduling, and vendor communications to keep your supply chain organized and responsive.",
        "Back-office task execution — take ownership of bookkeeping support, payroll processing assistance, inventory reconciliation, and other operational tasks that keep the business running day to day.",
        "Workflow automation support — identify repetitive manual tasks, help implement automation using tools like Zapier, Make, or custom scripts, and manage the automated workflows once they are live.",
        "Operational reporting — compile and deliver regular reports on order volumes, fulfillment metrics, vendor performance, and process efficiency so you have visibility into operations without doing the legwork.",
      ]}
      benefits={[
        "Streamlined processes that reduce errors and speed up execution",
        "Reliable order fulfillment coordination that keeps customers satisfied",
        "Organized vendor relationships with timely communication and follow-through",
        "Reduced operational bottlenecks through dedicated back-office support",
        "More automation and fewer manual tasks eating into your team's time",
        "Clear operational visibility through regular reporting and metrics tracking",
      ]}
      faq={[
        {
          q: "What types of operations tasks can you handle?",
          a: "We handle a wide range of back-office and operational tasks: order processing, vendor coordination, invoice management, inventory tracking, workflow execution, reporting, and general administrative operations. If it is a repeatable business process, we can likely take it off your plate.",
        },
        {
          q: "How do you integrate with our existing workflows?",
          a: "During onboarding, we map your current processes, learn your tools and systems, and document each workflow step by step. Our team then executes within your existing setup — no forced migrations. We also suggest improvements where we see inefficiencies.",
        },
        {
          q: "Can you help automate our manual processes?",
          a: "Yes. We identify tasks that are good candidates for automation, set up workflows using tools like Zapier or Make, and manage them ongoing. The goal is to eliminate repetitive manual work so your team and ours spend time on tasks that require judgment.",
        },
        {
          q: "How do you ensure consistency in process execution?",
          a: "Every process we manage is documented with step-by-step standard operating procedures. Team members follow these SOPs, and supervisors audit completed work regularly. When we spot deviations or opportunities for improvement, we update the documentation and retrain.",
        },
      ]}
    />
  );
}
