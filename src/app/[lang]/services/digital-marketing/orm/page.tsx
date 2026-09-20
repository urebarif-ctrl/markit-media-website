import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "Online Reputation Management",
  description:
    "Monitor, manage, and improve your online reputation. Markit Media provides review management, sentiment monitoring, and strategic response services to protect and strengthen your brand perception.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/services/digital-marketing/orm",
  },
  openGraph: {
    title: "Online Reputation Management",
    description: "Monitor, manage, and improve your online reputation. Markit Media provides review management, sentiment monitoring, and strategic response services to p...",
  },
};

export default function OrmPage() {
  return (
    <SubServicePage
      parentTitle="Digital Marketing"
      parentHref="/services/digital-marketing"
      title="Online Reputation Management"
      description="Your online reputation influences buying decisions before a prospect ever talks to your team. We monitor what's being said about your brand, manage review profiles, respond to feedback strategically, and build a proactive plan to strengthen public perception across the platforms that matter."
      details={[
        "Brand monitoring and alerts — track mentions of your brand, executives, and products across search results, review sites, social media, and news outlets with real-time alerting for anything that needs attention.",
        "Review management — monitor and respond to reviews on Google, Yelp, industry-specific platforms, and social media with professional, brand-aligned responses that show customers you're listening.",
        "Review generation strategy — implement ethical, systematic processes to encourage satisfied customers to leave reviews, increasing your volume of positive feedback on the platforms that matter most.",
        "Sentiment analysis and reporting — aggregate and analyze the tone and themes of public feedback to identify recurring issues, track sentiment trends, and surface insights your team can act on.",
        "Search result management — develop content and SEO strategies to influence what appears on the first page of search results for your brand name, ensuring positive and accurate information is most visible.",
        "Crisis response planning — prepare response protocols for potential reputation threats so your team can react quickly, consistently, and professionally when issues arise.",
      ]}
      benefits={[
        "Real-time visibility into what's being said about your brand online",
        "Professional review responses that build trust with current and future customers",
        "Increased volume of positive reviews through systematic generation",
        "Actionable insights from sentiment analysis of customer feedback",
        "Stronger brand presence on the first page of search results",
        "Preparedness for reputation threats with documented response plans",
      ]}
      faq={[
        {
          q: "What is online reputation management?",
          a: "Online reputation management (ORM) is the practice of monitoring, influencing, and maintaining the public perception of your brand across digital channels. It includes review management, search result optimization, social listening, and strategic response to public feedback.",
        },
        {
          q: "How do you handle negative reviews?",
          a: "We craft professional, empathetic responses that acknowledge the concern and offer a path to resolution. The goal is to demonstrate responsiveness to the reviewer while showing prospective customers that you take feedback seriously. We never post fake reviews or engage in unethical practices.",
        },
        {
          q: "Can you remove negative content from search results?",
          a: "We cannot force removal of legitimate content from third-party sites. What we can do is create and optimize positive, authoritative content that competes for the same search results, pushing less favorable content lower over time.",
        },
        {
          q: "How long does it take to improve an online reputation?",
          a: "Meaningful improvement typically takes three to six months of consistent effort. Building a stronger review profile, creating positive content, and shifting search results are gradual processes that compound over time.",
        },
      ]}
    />
  );
}
