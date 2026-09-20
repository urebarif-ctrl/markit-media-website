import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "Data Entry Services",
  description:
    "Accurate, high-volume data entry, data cleaning, and database management services. Markit Media handles your data processing so your team can focus on decisions, not data.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/services/bpo/data-entry",
  },
  openGraph: {
    title: "Data Entry Services",
    description: "Accurate, high-volume data entry, data cleaning, and database management services. Markit Media handles your data processing so your team can focus on d...",
  },
};

export default function DataEntryPage() {
  return (
    <SubServicePage
      parentTitle="BPO Services"
      parentHref="/services/bpo"
      title="Data Entry Services"
      description="Accurate data is the backbone of every business decision. We provide high-volume data entry, data cleaning, and database management services that keep your records reliable, your systems up to date, and your team focused on work that requires human judgment."
      details={[
        "High-volume data entry — process large batches of structured and unstructured data from documents, forms, invoices, and spreadsheets with strict accuracy standards and fast turnaround.",
        "Data cleaning and deduplication — identify and correct errors, remove duplicate records, standardize formatting, and fill in missing fields to improve the quality of your existing databases.",
        "Database management — maintain, update, and organize your databases across CRMs, ERPs, spreadsheets, and custom systems so your records reflect current information at all times.",
        "Document digitization — convert paper documents, scanned files, and PDFs into structured digital formats that are searchable, sortable, and ready for integration into your workflows.",
        "E-commerce product data entry — populate product listings with titles, descriptions, specifications, pricing, and images across your online store and marketplace platforms.",
        "Quality assurance and validation — apply multi-step verification processes, cross-reference entries against source documents, and run automated checks to maintain accuracy above agreed thresholds.",
      ]}
      benefits={[
        "Reliable data that supports confident decision-making across your organization",
        "Faster processing of large data volumes without adding headcount",
        "Cleaner databases with fewer duplicates, errors, and formatting inconsistencies",
        "Digitized records that are searchable and integrated into your workflows",
        "Accurate product listings that reduce returns and customer complaints",
        "Scalable capacity that handles volume spikes without delays",
      ]}
      faq={[
        {
          q: "What types of data entry do you handle?",
          a: "We handle data from virtually any source: invoices, purchase orders, medical records, survey responses, product catalogs, CRM records, lead lists, and scanned documents. If the data can be structured into a database, spreadsheet, or system, we can process it.",
        },
        {
          q: "How do you ensure data accuracy?",
          a: "We use a multi-step quality process: initial entry by a trained operator, a second verification pass by a separate team member, and automated validation checks for format, range, and consistency. Accuracy targets are defined during onboarding and reported on regularly.",
        },
        {
          q: "Can you work with our existing systems?",
          a: "Yes. Our team works directly in your CRM, ERP, spreadsheets, or custom databases. During onboarding, we learn your system, access protocols, and data standards so entries are made correctly the first time without requiring reformatting on your end.",
        },
        {
          q: "How do you handle sensitive or confidential data?",
          a: "We follow strict data security protocols including access controls, non-disclosure agreements, secure file transfer, and limited data retention. Our processes are designed to protect your information throughout the engagement.",
        },
      ]}
    />
  );
}
