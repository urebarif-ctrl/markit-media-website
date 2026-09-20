import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "Predictive Analytics Services",
  description:
    "Predictive analytics services including demand forecasting, customer behavior modeling, churn prediction, and data-driven decision support. Markit Media turns your data into forward-looking business intelligence.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/services/ai/predictive-analytics",
  },
};

export default function PredictiveAnalyticsPage() {
  return (
    <SubServicePage
      parentTitle="AI Solutions"
      parentHref="/services/ai"
      title="Predictive Analytics"
      description="Use your existing data to anticipate what happens next. We build predictive models that forecast demand, identify customers at risk of churning, and surface patterns in behavior that help you make smarter decisions before problems or opportunities arise."
      details={[
        "Demand and sales forecasting — build models that analyze historical data and market signals to predict future demand, helping you plan inventory, staffing, and budgets with greater confidence.",
        "Customer behavior modeling — identify patterns in how your customers browse, buy, and engage so you can predict their next action and tailor your marketing and product experience accordingly.",
        "Churn prediction — detect early warning signs that a customer is about to leave by analyzing engagement drop-offs, support interactions, and usage patterns, giving your retention team time to intervene.",
        "Customer lifetime value estimation — calculate the projected long-term value of different customer segments so you can allocate acquisition and retention budgets where they will have the greatest return.",
        "Data preparation and integration — clean, structure, and connect your data sources so predictive models have accurate, complete inputs, which is the single most important factor in model quality.",
        "Reporting and decision support — translate model outputs into clear dashboards and reports that your team can act on without needing a data science background.",
      ]}
      benefits={[
        "Forward-looking insights that help you act before trends become obvious",
        "More accurate planning for inventory, campaigns, and resource allocation",
        "Early identification of at-risk customers while there is still time to retain them",
        "Smarter budget allocation based on predicted customer value",
        "Data-driven confidence replacing gut-feel decisions in critical areas",
        "Actionable dashboards that make complex predictions easy to understand",
      ]}
      faq={[
        {
          q: "What kind of data do I need for predictive analytics?",
          a: "At a minimum, you need historical transaction or engagement data. The more data you have, including customer demographics, website behavior, and support interactions, the more accurate the models become. We start by assessing what data you have and how usable it is.",
        },
        {
          q: "How accurate are predictive models?",
          a: "Accuracy depends on data quality, volume, and the specific use case. No model is perfect, but a well-built model consistently outperforms guesswork. We validate every model against historical data and provide confidence intervals so you know how much to trust each prediction.",
        },
        {
          q: "How is predictive analytics different from regular analytics?",
          a: "Traditional analytics tells you what happened in the past. Predictive analytics uses that historical data to estimate what is likely to happen in the future, allowing you to make proactive decisions instead of reactive ones.",
        },
        {
          q: "How long does it take to see results from predictive analytics?",
          a: "Initial models can be built and validated within four to eight weeks depending on data readiness. You will see actionable insights as soon as the first model is deployed, with accuracy improving over time as more data becomes available.",
        },
      ]}
    />
  );
}
