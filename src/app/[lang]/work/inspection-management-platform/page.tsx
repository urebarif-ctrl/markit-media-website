import type { Metadata } from "next";
import { CaseStudyPage } from "@/components/case-study-page";
import { WorkScreens, type WorkScreen } from "@/components/work-screens";
import { caseStudyMetadata } from "@/lib/case-studies";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return caseStudyMetadata("inspection-management-platform", lang);
}

/** Screens captured from the platform on 29 Oct 2026. Names, numbers and rates shown are sample data. */
const IMG = "/images/work/inspection-management-platform";
const SCREENS: WorkScreen[] = [
  { src: `${IMG}/dashboard.webp`, width: 1200, height: 750, alt: "Inspection platform dashboard: a work queue, four key figures, a monthly tonnage chart and jobs by status", caption: "Dashboard: the work queue for the signed-in role, key figures and tonnage by month." },
  { src: `${IMG}/job.webp`, width: 1200, height: 750, alt: "An inspection job in Ops Review with a five-step progress bar and a panel explaining the next step", caption: "A job: progress bar, next-step guidance and the approval actions for the current role." },
  { src: `${IMG}/form.webp`, width: 1200, height: 750, alt: "Inspection form showing the sampling section and the packing, stitching and condition table", caption: "The inspection form: sampling, then packing, stitching and package condition." },
  { src: `${IMG}/containers.webp`, width: 1200, height: 750, alt: "Container editor with fifteen stack positions, total bags and net tonnes, and a check against pack size", caption: "Containers: bags per stack position, automatic totals and the tonnage check." },
  { src: `${IMG}/lab.webp`, width: 1200, height: 750, alt: "Laboratory sample with limits per parameter, results and a red FAIL verdict on moisture", caption: "Laboratory: limits per parameter and an automatic pass or fail verdict." },
  { src: `${IMG}/invoice.webp`, width: 1200, height: 750, alt: "Invoice built from a job, with editable lines, tax and discount and live totals", caption: "Invoicing: lines built from the job, with tax, discount and live totals." },
  { src: `${IMG}/cert.webp`, width: 1200, height: 750, alt: "Certificate preview with laboratory results, a diagonal watermark and an approval chain", caption: "Certification: a preview with the laboratory results and the approval chain." },
  { src: `${IMG}/roles.webp`, width: 1200, height: 750, alt: "Role permission matrix for eight roles with an audit log beneath", caption: "Roles and the audit log." },
  { src: `${IMG}/pdf-inspection.webp`, width: 1200, height: 750, alt: "Top of the inspection and loading report PDF with sampling and packing tables", caption: "The inspection and loading report as a PDF (top of page one)." },
  { src: `${IMG}/pdf-container.webp`, width: 1200, height: 848, alt: "Container sheet PDF with rows of fifteen stack positions per container", caption: "The container sheet as a PDF." },
  { src: `${IMG}/login.webp`, width: 1200, height: 750, alt: "Sign-in screen of the inspection platform in black and white with the Markit Media logo", caption: "Private sign-in." },
  { src: `${IMG}/mobile-containers.webp`, width: 390, height: 844, device: "phone", alt: "Containers tab of a job on a phone, with progress bar, next-step panel and totals", caption: "The containers tab on a phone." },
];

export default async function InspectionManagementPlatformPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = ["en", "ar", "ur"].includes(lang) ? lang : "en";
  return (
    <CaseStudyPage
      slug="inspection-management-platform"
      locale={locale}
      client="Inspection & Laboratory Management Platform"
      industry="Food & agriculture inspection"
      services={["Website Development", "CRM Development", "Laboratory Software Development"]}
      title="Inspection and Laboratory Management Software, Designed and Built by Markit Media"
      subtitle="A four-module web platform for inspection reports, container sheets, laboratory results, invoices and certificates, designed, engineered and tested by Markit Media."
      context="Markit Media designed, engineered and tested this inspection and laboratory management platform in October 2026: operations, laboratory results, invoicing and certification in one workflow, with eight user roles and an audit trail."
      approach="One job record feeds every step. The inspector completes the report and container sheet, a manager reviews and locks it, the laboratory judges results against limits, Finance invoices from the job and a certificate is drafted from approved data, with role-based approvals and an audit trail throughout."
      deliverables={["Four-module web platform", "Interface design in the Markit Media brand", "Eight user roles and audit log", "Five PDF documents", "49 end-to-end checks and 9 unit tests", "Walkthrough video"]}
      /* videos={[{ id: "YOUTUBE_ID", title: "Inspection platform walkthrough" }]} -- enable once the walkthrough is on YouTube */
      relatedServices={[
        { title: "Website Development", href: "/services/website-development" },
        { title: "Custom Web Apps", href: "/services/website-development/custom-web-apps" },
        { title: "Custom CRM Development", href: "/services/crm-development/custom-crm" },
      ]}
    >
      <WorkScreens heading="Screens from the platform" intro="Captured on 29 October 2026. Names, numbers and rates shown are sample data." screens={SCREENS} />
    </CaseStudyPage>
  );
}
