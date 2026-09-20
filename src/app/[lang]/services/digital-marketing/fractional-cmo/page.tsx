import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "Fractional CMO Services",
  description:
    "Senior marketing leadership without the full-time cost. Markit Media provides fractional CMO services — strategy, team guidance, and executive-level oversight to drive your marketing forward.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/services/digital-marketing/fractional-cmo",
  },
  openGraph: {
    title: "Fractional CMO Services",
    description: "Senior marketing leadership without the full-time cost. Markit Media provides fractional CMO services — strategy, team guidance, and executive-level ove...",
  },
};

export default function FractionalCmoPage() {
  return (
    <SubServicePage
      parentTitle="Digital Marketing"
      parentHref="/services/digital-marketing"
      title="Fractional CMO"
      description="Not every company needs or can afford a full-time CMO, but every company needs senior marketing leadership. A fractional CMO brings executive-level strategy, team direction, and accountability to your marketing operation on a part-time basis — filling the leadership gap without the overhead of a full-time hire."
      details={[
        "Marketing strategy development — build a comprehensive marketing strategy aligned with business goals, covering positioning, channel selection, messaging, budget allocation, and growth targets.",
        "Team leadership and management — provide direction to your in-house marketing team or agency partners, setting priorities, reviewing work, and ensuring execution stays aligned with strategy.",
        "Marketing performance review — audit current marketing activities, spending, and results to identify what's working, what's not, and where reallocation or investment would have the highest impact.",
        "Vendor and agency oversight — evaluate, select, and manage relationships with external agencies, freelancers, and technology vendors to ensure quality delivery and alignment with your goals.",
        "Executive reporting and board communication — prepare marketing performance reports, forecasts, and strategic updates for leadership teams and board meetings in a format that connects marketing activity to business outcomes.",
        "Growth planning and scaling — develop the hiring plan, technology stack, and process infrastructure needed to scale your marketing function as the business grows.",
      ]}
      benefits={[
        "Executive marketing leadership at a fraction of a full-time salary",
        "Strategy grounded in business objectives, not just marketing tactics",
        "Accountability and direction for your internal team and agencies",
        "Objective assessment of current marketing spend and performance",
        "Board-ready reporting that ties marketing to business outcomes",
        "Flexible engagement that scales with your needs",
      ]}
      faq={[
        {
          q: "What is a fractional CMO?",
          a: "A fractional CMO is a senior marketing executive who works with your company on a part-time or contract basis. They provide the same strategic leadership as a full-time CMO — setting direction, managing teams, and owning results — without the cost of a permanent hire.",
        },
        {
          q: "How is a fractional CMO different from a marketing consultant?",
          a: "A consultant typically delivers recommendations and leaves. A fractional CMO embeds into your organization, takes ownership of the marketing function, leads your team, and is accountable for results over an ongoing engagement.",
        },
        {
          q: "How much time does a fractional CMO typically commit?",
          a: "Engagement levels vary, but most fractional CMO arrangements range from two to four days per week. The right cadence depends on the complexity of your marketing operation and how much hands-on leadership is needed.",
        },
        {
          q: "When should a company consider a fractional CMO?",
          a: "A fractional CMO is a good fit when your company has outgrown the founder-led marketing stage but isn't ready for a full-time executive hire, when you need strategic direction your current team lacks, or when you're preparing for a growth phase that requires senior oversight.",
        },
      ]}
    />
  );
}
