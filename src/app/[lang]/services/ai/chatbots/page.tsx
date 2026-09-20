import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "AI Chatbot Development",
  description:
    "Custom AI chatbot development for customer support, lead qualification, and engagement across your website, WhatsApp, and other messaging channels. Markit Media builds intelligent bots that work around the clock.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/services/ai/chatbots",
  },
  openGraph: {
    title: "AI Chatbot Development",
    description: "Custom AI chatbot development for customer support, lead qualification, and engagement across your website, WhatsApp, and other messaging channels. Mark...",
  },
};

export default function ChatbotsPage() {
  return (
    <SubServicePage
      parentTitle="AI Solutions"
      parentHref="/services/ai"
      title="AI Chatbots"
      description="Deploy intelligent chatbots that handle customer inquiries, qualify leads, and guide visitors toward conversion without human intervention. We build bots for your website, WhatsApp, and other messaging platforms that reflect your brand voice and integrate with your existing tools."
      details={[
        "Customer support automation — design conversational flows that handle frequently asked questions, order status inquiries, and common support requests so your team can focus on complex issues that require human attention.",
        "Lead qualification bots — build chatbots that ask the right qualifying questions, capture contact details, score prospects based on their responses, and route high-intent leads directly to your sales team.",
        "WhatsApp and messaging integration — deploy chatbots on WhatsApp Business, Facebook Messenger, and other channels your customers already use, providing a seamless experience without forcing them to visit your website.",
        "Website chat widget setup — install and configure an on-site chat experience that greets visitors, answers product questions, and captures leads with minimal friction and fast response times.",
        "Knowledge base training — train your chatbot on your product documentation, FAQ content, and service details so it provides accurate, context-aware answers instead of generic responses.",
        "Handoff to human agents — implement intelligent escalation rules that detect when a conversation requires a real person and transfer the chat with full context so the customer never has to repeat themselves.",
      ]}
      benefits={[
        "Instant responses to customer inquiries at any hour of the day",
        "Higher lead capture rates through automated qualification conversations",
        "Reduced support workload for your team on repetitive questions",
        "Consistent brand voice across every customer interaction",
        "Multi-channel presence on the platforms your customers prefer",
        "Seamless handoff to human agents when conversations need a personal touch",
      ]}
      faq={[
        {
          q: "What platforms can the chatbot be deployed on?",
          a: "We build chatbots for websites, WhatsApp Business, Facebook Messenger, Instagram DMs, and other popular messaging platforms. The specific channels depend on where your audience is most active and which integrations best fit your workflow.",
        },
        {
          q: "How does the chatbot learn about my business?",
          a: "We train the chatbot using your existing content including product pages, FAQs, support documentation, and brand guidelines. This ensures the bot gives accurate, on-brand answers rather than generic responses.",
        },
        {
          q: "Can the chatbot hand off to a live person?",
          a: "Yes. We set up escalation rules so the chatbot detects when a customer needs human help and transfers the conversation with full context to a live agent. The customer does not have to repeat any information.",
        },
        {
          q: "How long does it take to build and launch a chatbot?",
          a: "A typical chatbot project takes two to six weeks depending on complexity, the number of channels, and how many conversation flows need to be built. Simple FAQ bots can launch faster, while bots with deep integrations take more time.",
        },
      ]}
    />
  );
}
