import type { Metadata } from "next";
import Link from "next/link";
import { Animate } from "@/components/animate";
import { SectionLabel, SectionTitle, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Get answers to common questions about digital marketing services, pricing, timelines, and working with Markit Media.",
  alternates: { canonical: "https://themarkitmedia.com/en/faq" },
  openGraph: {
    title: "FAQs — Markit Media",
    description:
      "Answers to common questions about our digital marketing services, pricing, timelines, and how we work.",
  },
};

const faqCategories = [
  {
    category: "Working With Us",
    questions: [
      {
        q: "How do I get started with Markit Media?",
        a: "Start by contacting us for a free consultation. We'll discuss your business goals, current marketing performance, and budget to determine if we're a good fit. If we are, we begin with a Discovery phase to build your custom strategy.",
      },
      {
        q: "What is the minimum contract length?",
        a: "Most of our engagements start with a 3-month minimum commitment. Digital marketing takes time to produce results, and shorter engagements rarely allow enough time for strategy, execution, and optimization to deliver meaningful ROI.",
      },
      {
        q: "Do you work with small businesses or only large companies?",
        a: "We work with businesses of all sizes, from startups to enterprise. What matters most is that you're growth-minded and ready to invest in marketing as a strategic function, not just a line item.",
      },
      {
        q: "What industries do you specialize in?",
        a: "We serve 20 industry verticals including home services, e-commerce, healthcare, real estate, restaurants, fashion, B2B, SaaS, finance, legal, education, hospitality, fitness, automotive, nonprofits, construction, travel, professional services, manufacturing, and EV charging. Our marketing expertise applies across verticals.",
      },
      {
        q: "Which countries do you serve?",
        a: "We serve clients across the United States, Canada, United Arab Emirates, United Kingdom, Australia, and Saudi Arabia. Our team operates across multiple time zones to support clients globally.",
      },
      {
        q: "Who will be working on my account?",
        a: "You'll work directly with senior specialists, not junior account managers. Depending on your engagement, your team may include strategists, media buyers, SEO specialists, designers, developers, and content creators.",
      },
    ],
  },
  {
    category: "Services & Strategy",
    questions: [
      {
        q: "What digital marketing services do you offer?",
        a: "We offer a full stack of digital marketing services: SEO, performance marketing (Google Ads, Meta Ads, TikTok, LinkedIn), social media marketing, website development, branding and design, video production, AI solutions, email marketing, content marketing, and more.",
      },
      {
        q: "Can I hire you for just one service, or do I need a full package?",
        a: "You can engage us for individual services like SEO or paid advertising. However, many clients see the best results with an integrated approach where channels work together. We'll recommend what makes sense for your goals and budget.",
      },
      {
        q: "How do you build a marketing strategy?",
        a: "Every engagement starts with Discovery: we analyze your business, audience, competitors, and current performance. From there, we build a custom strategy with channel recommendations, KPIs, messaging frameworks, and budget allocation. We present the strategy for your feedback before execution begins.",
      },
      {
        q: "Do you build websites?",
        a: "Yes. We build high-performance websites on WordPress, Shopify, and Next.js. Our development team focuses on speed, SEO, accessibility, and conversion optimization. We also handle landing pages, e-commerce stores, and custom web applications.",
      },
      {
        q: "What is AEO (Answer Engine Optimization)?",
        a: "AEO is the practice of optimizing content to appear in AI-generated answers, voice search results, and featured snippets. As search engines increasingly use AI to answer questions directly, AEO helps ensure your brand is the source of those answers.",
      },
    ],
  },
  {
    category: "Results & Reporting",
    questions: [
      {
        q: "How long does it take to see results?",
        a: "It depends on the channel. Paid advertising can generate leads within days of launch. SEO typically takes 3-6 months to show meaningful organic traffic growth. Social media engagement builds over weeks. We set realistic timelines during strategy development.",
      },
      {
        q: "How do you measure success?",
        a: "We measure success through KPIs aligned with your business goals: leads generated, revenue attributed, ROAS, organic traffic growth, conversion rates, and cost per acquisition. We avoid vanity metrics like impressions and follower counts unless they directly tie to outcomes.",
      },
      {
        q: "How often will I receive reports?",
        a: "Clients receive monthly performance reports with metrics, insights, and recommendations. You'll also have access to real-time dashboards to monitor campaign performance anytime. We hold quarterly strategy reviews to assess progress and adjust plans.",
      },
      {
        q: "What happens if a campaign isn't performing?",
        a: "We monitor performance daily and optimize continuously. If a campaign underperforms, we diagnose the issue, test alternatives, and reallocate budget to what's working. We're transparent about what's not working and why, along with our plan to fix it.",
      },
    ],
  },
  {
    category: "Pricing & Budget",
    questions: [
      {
        q: "How much do your services cost?",
        a: "Pricing depends on the scope of services, channels involved, and your business goals. We provide custom proposals after the initial consultation. We work with a range of budgets and will tell you honestly if your budget is realistic for your goals.",
      },
      {
        q: "Do you require a retainer or work on a project basis?",
        a: "We offer both models. Ongoing services like SEO, paid advertising, and social media management are typically retainer-based. One-time projects like website builds, brand identity, and video production are project-based with defined deliverables and timelines.",
      },
      {
        q: "Is there a setup fee?",
        a: "Some engagements include a one-time setup fee to cover initial audit, strategy development, account setup, and technical configuration. This is always disclosed upfront in our proposal.",
      },
    ],
  },
  {
    category: "SEO",
    questions: [
      {
        q: "How long does SEO take to produce results?",
        a: "SEO is a long-term investment. Most businesses start seeing meaningful improvements in organic traffic within 3 to 6 months, depending on their starting position, competition level, and the scope of work. Quick wins in technical SEO can happen sooner.",
      },
      {
        q: "What is the difference between SEO and PPC?",
        a: "SEO generates organic (free) traffic by improving your search rankings over time. PPC generates paid traffic through advertising. SEO compounds over time but takes longer. PPC delivers immediate results but stops when you stop spending. Most businesses benefit from both.",
      },
      {
        q: "Do you guarantee first-page rankings?",
        a: "No reputable agency guarantees specific rankings. Google's algorithm considers hundreds of factors, and rankings fluctuate. We set realistic expectations, track measurable KPIs, and focus on sustainable organic growth through best practices.",
      },
      {
        q: "What is local SEO?",
        a: "Local SEO optimizes your online presence to attract customers in your geographic area. This includes Google Business Profile optimization, local keyword targeting, citation building, and review management. It is essential for businesses that serve specific locations.",
      },
    ],
  },
  {
    category: "Website & Technical",
    questions: [
      {
        q: "What platforms do you build websites on?",
        a: "We build on WordPress, Shopify, and Next.js. The right platform depends on your business needs: WordPress for content-heavy sites, Shopify for e-commerce, and Next.js for high-performance custom applications.",
      },
      {
        q: "Can you redesign my existing website?",
        a: "Yes. We can redesign your current site on the same platform or migrate to a new one. We focus on improving speed, mobile responsiveness, conversion rates, and SEO while maintaining your existing rankings.",
      },
      {
        q: "Do you handle website hosting and maintenance?",
        a: "We can manage hosting and ongoing maintenance as part of a retainer engagement. This includes security updates, performance monitoring, backups, and content updates.",
      },
    ],
  },
  {
    category: "Social Media & Content",
    questions: [
      {
        q: "Which social media platforms should my business be on?",
        a: "It depends on where your audience spends time. B2B businesses often focus on LinkedIn. Consumer brands typically prioritize Instagram, TikTok, or Facebook. We recommend starting with one or two platforms and doing them well rather than spreading thin across many.",
      },
      {
        q: "Do you create the content or do we need to provide it?",
        a: "We create all content in-house: copy, graphics, video scripts, and more. We work with your brand guidelines and tone of voice to ensure everything represents your brand accurately. Your input on industry expertise is always valuable.",
      },
      {
        q: "How do you handle negative reviews or comments?",
        a: "We have processes for monitoring and responding to reviews and social comments. Our approach is professional, transparent, and focused on resolution. We never delete legitimate negative feedback — we address it constructively.",
      },
    ],
  },
  {
    category: "Paid Advertising",
    questions: [
      {
        q: "How much should I budget for Google Ads?",
        a: "There is no universal minimum, but we generally recommend at least $1,500-3,000 per month in ad spend to generate enough data for optimization. Your actual budget depends on your industry, competition level, and business goals. We help you determine the right budget during the discovery phase.",
      },
      {
        q: "Who owns the ad accounts — you or us?",
        a: "You own all ad accounts, creative assets, and data. We set up accounts under your business profile and manage them on your behalf. If we ever part ways, you retain full access and ownership of everything.",
      },
      {
        q: "How quickly will I see results from paid advertising?",
        a: "Paid campaigns can generate leads and traffic within the first week of launch. However, optimization takes time. Expect 4-8 weeks of learning and testing before campaigns reach peak performance. We monitor and adjust continuously from day one.",
      },
      {
        q: "Do you run ads on TikTok, LinkedIn, and other platforms?",
        a: "Yes. We run campaigns across Google (Search, Display, Shopping, YouTube), Meta (Facebook, Instagram), TikTok, LinkedIn, Microsoft Ads, and Amazon. We recommend platforms based on where your audience is and what delivers the best ROI for your business type.",
      },
    ],
  },
  {
    category: "Email Marketing",
    questions: [
      {
        q: "Can you help us set up email automation?",
        a: "Yes. We build automated email sequences including welcome series, abandoned cart recovery, post-purchase flows, re-engagement campaigns, and lead nurturing sequences. We work with platforms like Mailchimp, Klaviyo, HubSpot, and ActiveCampaign.",
      },
      {
        q: "How often should we send marketing emails?",
        a: "It depends on your audience and content. Most businesses benefit from 2-4 emails per month for newsletters and promotions, plus triggered automations based on user behavior. We monitor engagement metrics and adjust frequency to avoid list fatigue.",
      },
      {
        q: "What email marketing metrics do you track?",
        a: "We track open rates, click-through rates, conversion rates, revenue per email, list growth, bounce rates, and unsubscribe rates. We focus on metrics that connect email performance to revenue, not just vanity metrics like opens.",
      },
    ],
  },
  {
    category: "Branding & Creative",
    questions: [
      {
        q: "What does a branding project include?",
        a: "A typical branding engagement includes brand strategy and positioning, logo design, visual identity system (colors, typography, imagery style), brand guidelines document, and application to key touchpoints like business cards, social media templates, and website design.",
      },
      {
        q: "How long does a branding project take?",
        a: "A brand identity project typically takes 4-8 weeks depending on scope. This includes discovery and research, concept development, multiple revision rounds, and final asset delivery. Larger brand systems with extensive application guidelines may take longer.",
      },
      {
        q: "Do you create video content?",
        a: "Yes. Our video team handles everything from concept and scriptwriting to production and editing. We create commercial spots, social media videos, product demos, motion graphics, and animated explainers. We also produce short-form content for Reels, TikTok, and YouTube Shorts.",
      },
    ],
  },
  {
    category: "AI & Automation",
    questions: [
      {
        q: "How do you use AI in marketing?",
        a: "We use AI tools to enhance research, content ideation, data analysis, and campaign optimization. AI helps us work faster and smarter, but every piece of content and strategy is reviewed and refined by human specialists to ensure quality and brand alignment.",
      },
      {
        q: "Can you build a chatbot for our website?",
        a: "Yes. We build AI-powered chatbots that can handle customer inquiries, qualify leads, book appointments, and provide instant responses 24/7. We integrate with platforms like your CRM and helpdesk to ensure seamless handoffs to human agents when needed.",
      },
      {
        q: "What is marketing automation?",
        a: "Marketing automation uses software to automate repetitive marketing tasks like email sequences, social media posting, lead nurturing, and ad campaign management. It saves time, reduces human error, and allows for personalized messaging at scale.",
      },
      {
        q: "Do you offer fractional CMO services?",
        a: "Yes. Our fractional CMO service provides senior marketing leadership on a part-time basis. You get strategic direction, team management, vendor oversight, and board-level reporting without the cost of a full-time executive hire.",
      },
    ],
  },
  {
    category: "E-commerce",
    questions: [
      {
        q: "Do you work with Shopify and WooCommerce?",
        a: "Yes. We build and optimize stores on both Shopify and WooCommerce. We handle everything from store setup and design to product feed optimization, Google Shopping campaigns, and conversion rate optimization.",
      },
      {
        q: "Can you help with Amazon advertising?",
        a: "Yes. We manage Amazon Sponsored Products, Sponsored Brands, and Sponsored Display campaigns. We also handle product listing optimization, A+ content creation, and marketplace strategy.",
      },
      {
        q: "What is product feed optimization?",
        a: "Product feed optimization involves structuring and enriching your product data for platforms like Google Shopping, Meta Catalog, and Amazon. Better feeds improve ad relevance, reduce wasted spend, and increase conversion rates.",
      },
      {
        q: "How do you reduce cart abandonment?",
        a: "We use a combination of email recovery sequences, retargeting ads, checkout optimization, trust signals, and UX improvements. Each approach is tested and measured to find what works best for your specific audience.",
      },
    ],
  },
  {
    category: "Video & Creative",
    questions: [
      {
        q: "What types of video do you produce?",
        a: "We produce commercials, brand films, product videos, testimonial videos, social media content (Reels, TikToks, Shorts), motion graphics, animation, and explainer videos. We handle everything from concept to final delivery.",
      },
      {
        q: "Do you create content for social media?",
        a: "Yes. We create platform-specific content for Instagram, TikTok, LinkedIn, Facebook, YouTube, and more. This includes static graphics, carousels, short-form video, long-form video, and copywriting tailored to each platform.",
      },
      {
        q: "Can you help with brand photography?",
        a: "Yes. We coordinate and produce brand photography for websites, social media, and marketing materials. This includes product photography, team headshots, lifestyle imagery, and behind-the-scenes content.",
      },
      {
        q: "How long does a video project take?",
        a: "Timeline depends on complexity. Simple social media videos can be turned around in days. Full commercial productions typically take 4-8 weeks from concept to delivery, including scripting, production, and post-production.",
      },
    ],
  },
];

export default function FaqPage() {
  const allQuestions = faqCategories.flatMap((c) => c.questions);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allQuestions.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <article>
      <JsonLd data={faqSchema} />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "FAQ" }]} />

      <section className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>FAQ</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Frequently Asked Questions
            </h1>
            <SectionDesc>
              Answers to the most common questions about our services, process, and pricing. Can&apos;t find what you&apos;re looking for? <Link href="/contact" className="underline hover:text-black">Contact us</Link>.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {faqCategories.map((cat, ci) => (
        <section
          key={cat.category}
          className={`px-6 lg:px-12 py-16 ${ci % 2 === 1 ? "bg-gray-50" : ""}`}
          aria-label={cat.category}
        >
          <div className="max-w-3xl mx-auto">
            <Animate animation="fade-up">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-8">{cat.category}</h2>
            </Animate>
            <div>
              {cat.questions.map((item, i) => (
                <Animate key={i} animation="fade-up" delay={i * 40}>
                  <details className="group border-b border-gray-200">
                    <summary className="flex justify-between items-center py-5 cursor-pointer text-base font-bold text-black list-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                      {item.q}
                      <span className="text-xl text-gray-500 group-open:rotate-45 transition-transform motion-reduce:transition-none flex-shrink-0 ml-4" aria-hidden="true">+</span>
                    </summary>
                    <div className="pb-5 text-base text-gray-500 leading-relaxed">{item.a}</div>
                  </details>
                </Animate>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="px-6 lg:px-12 py-12" aria-label="Explore more">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Glossary", href: "/glossary" },
                { label: "Blog", href: "/blog" },
                { label: "Pricing", href: "/pricing" },
                { label: "Our Process", href: "/process" },
                { label: "Resources", href: "/resources" },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="border border-gray-200 px-5 py-3 text-base font-medium text-black hover:bg-black hover:text-white transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                  {link.label}
                </Link>
              ))}
            </div>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Still Have Questions?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              We&apos;re here to help. Reach out and we&apos;ll get back to you within one business day.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none">
              Contact Us &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    </article>
  );
}
