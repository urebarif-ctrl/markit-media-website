import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "Email A/B Testing Services",
  description:
    "Email A/B testing services including subject line testing, content variations, send time optimization, and CTA experiments. Markit Media uses structured testing to improve your email performance over time.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/services/email-marketing/ab-testing",
  },
  openGraph: {
    title: "Email A/B Testing Services",
    description: "Email A/B testing services including subject line testing, content variations, send time optimization, and CTA experiments. Markit Media uses structured...",
  },
};

export default function AbTestingPage() {
  return (
    <SubServicePage
      parentTitle="Email Marketing"
      parentHref="/services/email-marketing"
      title="A/B Testing"
      description="Stop guessing what works and start testing. We design and run structured A/B tests on your email campaigns to find out which subject lines, content formats, send times, and calls to action drive the best results, then apply those learnings to every future campaign."
      details={[
        "Subject line testing — test different subject line approaches including length, tone, personalization, and urgency to identify what consistently drives higher open rates for your specific audience.",
        "Content and layout variations — compare different email body structures, copy lengths, image placements, and content formats to determine which layouts generate the most clicks and conversions.",
        "Call-to-action experiments — test button text, color, placement, and the number of CTAs in an email to find the combination that maximizes click-through rates without overwhelming the reader.",
        "Send time and day optimization — run tests across different days of the week and times of day to identify when your audience is most likely to open and engage with your emails.",
        "Test design and sample sizing — plan each test with proper sample sizes, control groups, and success metrics so results are statistically meaningful and not based on random variation.",
        "Results analysis and documentation — analyze test outcomes, document what was learned, and translate findings into actionable guidelines that improve your email strategy over time.",
      ]}
      benefits={[
        "Data-backed decisions that replace assumptions about what works",
        "Incremental performance improvements that compound over time",
        "Higher open rates through optimized subject lines and send timing",
        "More clicks and conversions from tested content and CTA strategies",
        "A growing library of tested insights specific to your audience",
        "Reduced risk of underperforming campaigns through pre-send testing",
      ]}
      faq={[
        {
          q: "What should I A/B test first in my emails?",
          a: "Start with subject lines because they have the most direct impact on whether your email gets opened at all. Once open rates are strong, move to testing content layout, CTA placement, and send timing to improve click-through and conversion rates.",
        },
        {
          q: "How large does my list need to be for A/B testing?",
          a: "You need enough subscribers to produce statistically significant results. As a general guideline, each test variation should reach at least a few hundred recipients. We assess your list size and recommend test structures that produce reliable conclusions.",
        },
        {
          q: "How long should an A/B test run?",
          a: "Most email A/B tests need 24 to 48 hours to collect enough data for a reliable conclusion. We set clear timeframes and sample sizes before each test and only call a winner when the data supports it.",
        },
        {
          q: "Can you test more than two variations at once?",
          a: "Yes. Multivariate tests can compare three or more variations, but they require larger sample sizes to produce statistically valid results. We recommend starting with simple A/B tests and moving to multivariate testing as your list and sending volume grow.",
        },
      ]}
    />
  );
}
