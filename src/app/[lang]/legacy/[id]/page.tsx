import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Compass,
  Layers3,
  Search,
  Sparkles,
  Target,
} from "lucide-react";
import { Animate, Stagger } from "@/components/animate";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { SectionDesc, SectionLabel, SectionTitle } from "@/components/section";
import {
  legacySeoPageById,
  type LegacySeoPage,
} from "@/data/legacy-seo-pages";

const BASE_URL = "https://themarkitmedia.com";

export const revalidate = 86400;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const page = legacySeoPageById.get(id);
  if (!page) return {};

  const canonical = `${BASE_URL}${page.path}/`;
  const description = getDescription(page);

  return {
    title: page.title,
    description,
    alternates: { canonical },
    openGraph: {
      title: page.title,
      description,
      url: canonical,
      type: page.kind === "article" ? "article" : "website",
    },
  };
}

function topicArea(page: LegacySeoPage) {
  const value = `${page.title} ${page.path}`.toLowerCase();
  if (/wordpress|website|web development|web design|domain|hosting|cloudflare|php|shopify|magento|wix|squarespace/.test(value)) return "website";
  if (/seo|keyword|backlink|ranking|semrush|search engine/.test(value)) return "seo";
  if (/social media|instagram|facebook|linkedin|tiktok|influencer/.test(value)) return "social";
  if (/video|animation|reel|podcast|voiceover|youtube/.test(value)) return "video";
  if (/logo|graphic|brand|design|packaging|creative/.test(value)) return "brand";
  if (/ai|artificial intelligence|chatgpt|chatbot/.test(value)) return "ai";
  if (/bpo|call center|customer support|payroll/.test(value)) return "operations";
  if (/ecommerce|e-commerce|woocommerce/.test(value)) return "ecommerce";
  return "marketing";
}

function getDescription(page: LegacySeoPage) {
  if (page.kind === "service") {
    return `${page.title} services from Markit Media, with a clear approach, deliverables, process, measurement and next steps for businesses evaluating this capability.`;
  }
  if (page.kind === "industry") {
    return `${page.title} strategy covering search, paid media, content, websites, measurement and customer acquisition for businesses in this market.`;
  }
  return `A practical, updated guide to ${page.title.toLowerCase()}, with clear explanations, planning guidance, common mistakes and actionable next steps.`;
}

function articleFramework(area: ReturnType<typeof topicArea>) {
  const frameworks = {
    website: [
      ["Start with the user and business goal", "Define who the website is for, what they need, and the action the business wants them to take."],
      ["Plan structure before visuals", "Map pages, navigation, content hierarchy, search intent and conversion paths before polishing the interface."],
      ["Build for performance and accessibility", "Fast loading, responsive layouts, semantic structure and accessible interactions should be part of the build, not an afterthought."],
      ["Connect measurement early", "Analytics, conversion events, forms and lead attribution should be planned before launch so performance can be evaluated from day one."],
      ["Treat launch as the start", "Technical maintenance, content updates, SEO improvements and conversion testing continue after the website goes live."],
    ],
    seo: [
      ["Match real search intent", "Build pages around what a searcher is trying to learn, compare, solve or buy, instead of forcing keywords into unrelated pages."],
      ["Make the page technically accessible", "Crawlability, indexability, canonical signals, internal links, speed and mobile usability support every content effort."],
      ["Create useful depth", "Answer the main question completely, support it with related subtopics, and make the page easier to understand than competing results."],
      ["Strengthen authority", "Relevant internal links, credible references, real experience and earned backlinks help search engines understand why the page deserves visibility."],
      ["Measure by query and page", "Track impressions, clicks, CTR, average position and conversions at page level so updates are based on evidence."],
    ],
    social: [
      ["Define the role of each channel", "Use platforms for specific jobs such as discovery, community, proof, retargeting or lead generation."],
      ["Build repeatable content pillars", "Create a small set of themes that can produce useful posts consistently without repeating the same message."],
      ["Design for the feed", "The first frame, thumbnail, hook, pacing and format affect whether strong ideas are actually consumed."],
      ["Connect organic and paid learning", "Use engagement and conversion signals to understand which messages deserve more distribution."],
      ["Measure actions, not vanity alone", "Reach and engagement matter, but enquiries, qualified traffic, saves, assisted conversions and revenue show business impact."],
    ],
    video: [
      ["Start with the purpose", "A sales video, social reel, product demo and brand film need different structures and editing decisions."],
      ["Design the opening carefully", "Viewers decide quickly whether to continue, so the first moments need a clear visual or narrative reason to stay."],
      ["Edit for the platform", "Aspect ratio, pace, captions, duration and thumbnail treatment should match where the video will be watched."],
      ["Keep brand consistency", "Typography, color, transitions, music and motion should support the brand rather than overpower the message."],
      ["Review performance after publishing", "Watch time, retention, clicks and conversions can reveal what to improve in the next edit."],
    ],
    brand: [
      ["Clarify the idea first", "Strong design starts with positioning, audience and message before choosing visual treatments."],
      ["Build a recognizable system", "Typography, color, imagery, layout and iconography should work together across different formats."],
      ["Design for real applications", "A concept should remain usable on websites, social media, print, presentations and small screen placements."],
      ["Protect consistency", "Simple guidelines make it easier for teams and partners to reproduce the brand correctly."],
      ["Test for clarity", "The work should be recognizable and legible before decorative detail is added."],
    ],
    ai: [
      ["Choose a specific workflow", "Start with a clear task, decision or repetitive process instead of adopting AI without a defined business use."],
      ["Keep human review where it matters", "Accuracy, brand voice, privacy and high impact decisions need appropriate oversight."],
      ["Connect the right data", "Useful outputs depend on reliable context, permissions and clear boundaries around what the system can access."],
      ["Measure time and quality", "Evaluate whether the workflow improves speed, consistency, cost or customer experience rather than counting AI usage."],
      ["Review risks continuously", "Models, policies and data change, so governance and quality checks should be ongoing."],
    ],
    operations: [
      ["Define the process", "Document the work, service levels, handoffs and escalation points before assigning people or tools."],
      ["Set quality standards", "Clear scripts, QA criteria, response expectations and reporting reduce inconsistency."],
      ["Give teams the right context", "CRM history, documentation and permissions help support teams solve issues without unnecessary back and forth."],
      ["Measure service outcomes", "Track response time, resolution quality, qualified appointments, retention or other metrics connected to the function."],
      ["Improve the workflow", "Use recurring issues and bottlenecks to refine training, automation and process design."],
    ],
    ecommerce: [
      ["Reduce friction from discovery to checkout", "Navigation, product information, trust signals and checkout flow should make the purchase decision easier."],
      ["Structure product data well", "Clear titles, descriptions, imagery, pricing and feed data support both customers and advertising platforms."],
      ["Use paid media with merchandising", "Campaign structure works better when it reflects margin, inventory, seasonality and product priorities."],
      ["Recover unfinished intent", "Email, remarketing and cart recovery can reconnect with shoppers who did not purchase on the first visit."],
      ["Measure contribution by product and channel", "Revenue alone can hide margin and acquisition problems, so reporting should include efficiency and customer value."],
    ],
    marketing: [
      ["Start with the commercial objective", "Choose a clear outcome such as qualified leads, sales, retention, market awareness or lower acquisition cost."],
      ["Understand the audience", "Research what customers need, how they compare options and what prevents them from taking action."],
      ["Choose channels for a reason", "Search, paid social, content, email and partnerships each play different roles in the customer journey."],
      ["Build measurement into execution", "Define conversions, attribution and reporting before campaigns launch."],
      ["Improve through controlled learning", "Use testing and performance reviews to change one meaningful variable at a time."],
    ],
  };
  return frameworks[area];
}

function serviceDeliverables(area: ReturnType<typeof topicArea>) {
  const common = {
    website: ["Discovery and technical planning", "UX and page structure", "Responsive implementation", "Performance and SEO foundations", "Analytics and conversion tracking", "Launch QA and post launch support"],
    seo: ["Search and competitor research", "Technical SEO review", "Content and on page optimization", "Internal linking and authority plan", "Measurement setup", "Ongoing opportunity reviews"],
    social: ["Channel strategy", "Audience and message planning", "Creative direction", "Campaign setup", "Testing and optimization", "Performance reporting"],
    video: ["Creative brief", "Format and platform planning", "Editing and motion treatment", "Audio and caption workflow", "Review and revisions", "Delivery for required formats"],
    brand: ["Discovery and positioning input", "Creative directions", "Design system development", "Application mockups", "Revision rounds", "Final production files and guidance"],
    ai: ["Workflow discovery", "Use case prioritization", "Data and integration planning", "Prototype or implementation", "Human review controls", "Performance and quality monitoring"],
    operations: ["Process mapping", "Team and tooling setup", "Scripts and SOPs", "QA framework", "Reporting and escalation", "Continuous improvement"],
    ecommerce: ["Store and funnel review", "Merchandising structure", "Tracking setup", "Campaign and creative plan", "Retention touchpoints", "Revenue and efficiency reporting"],
    marketing: ["Strategy and channel plan", "Campaign structure", "Creative and messaging", "Tracking setup", "Optimization cadence", "Reporting and recommendations"],
  };
  return common[area];
}

function faqFor(page: LegacySeoPage) {
  if (page.kind === "service") {
    return [
      ["What is included in this service?", "Scope depends on the project, but the engagement starts with the goal, current setup and required deliverables. We define responsibilities and measurement before work begins."],
      ["Can this be combined with other Markit Media services?", "Yes. This capability can be combined with paid media, SEO, creative, web development, analytics or ongoing marketing when the customer journey needs more than one discipline."],
      ["How do you measure success?", "We agree on practical outcomes before launch. Depending on the service, that can include qualified enquiries, conversion rate, search visibility, engagement quality, delivery efficiency or revenue contribution."],
    ];
  }
  if (page.kind === "industry") {
    return [
      ["Which channels should businesses in this industry use?", "The right mix depends on purchase intent, sales cycle, geography and customer value. Search, paid social, content, email and conversion focused landing pages can each play a different role."],
      ["Do you use the same strategy for every company?", "No. Industry context helps us start with relevant patterns, but budgets, customer segments, offers, locations and internal capabilities still shape the final plan."],
      ["Can you support both lead generation and brand growth?", "Yes. We can separate short term acquisition from longer term visibility and build measurement around both."],
    ];
  }
  return [
    ["Why was this guide restored at its original URL?", "This topic continues to attract search demand. Keeping the original URL lets readers reach the information they expected while preserving the page history instead of sending them to an unrelated section."],
    ["Is the information intended as a starting point or a complete plan?", "Use it as a practical framework. The exact implementation depends on your business, technology, market, audience and objectives."],
    ["Where can I get help applying this to my business?", "Use the related service link on this page or request a quote. We can review the current setup and recommend the most relevant next steps."],
  ];
}

function BeginnersWebsiteGuide() {
  const steps = [
    ["1. Define what the website must achieve", "Before choosing a framework or visual style, decide whether the site needs to generate leads, sell products, publish content, support customers or perform several of these jobs."],
    ["2. Choose a domain and hosting approach", "Pick a domain that is memorable and defensible, then choose hosting that fits expected traffic, security needs, deployment workflow and the technology you plan to use."],
    ["3. Plan the sitemap", "List the pages users need and arrange them into a simple hierarchy. Most business sites need a clear home page, service or product pages, proof, company information and a straightforward contact path."],
    ["4. Wireframe the important pages", "Sketch content order before spending time on visual polish. Start with the user question, then place proof, details and calls to action in the order that helps a visitor decide."],
    ["5. Select the development stack", "WordPress can work well for content managed business sites, Shopify for commerce, and frameworks such as Next.js for custom performance focused applications and marketing sites."],
    ["6. Build mobile first", "Layouts, forms, menus and media need to work on small screens. Mobile usability should be designed into the component system rather than patched after desktop is complete."],
    ["7. Add SEO foundations", "Use semantic headings, descriptive metadata, crawlable links, useful copy, structured internal linking, canonical tags, XML sitemaps and fast media."],
    ["8. Add analytics and conversion tracking", "Track the actions that matter, such as form submissions, calls, purchases, bookings or qualified CTA clicks. Without this, traffic growth can be difficult to connect to business outcomes."],
    ["9. Test before launch", "Check forms, links, redirects, responsive layouts, accessibility, browser behavior, page speed, metadata and error pages before pointing the production domain at the new build."],
    ["10. Maintain and improve", "After launch, update content, monitor Search Console, review conversion data, patch dependencies and improve pages based on real user and search behavior."],
  ];
  return (
    <>
      <section className="px-6 lg:px-12 py-20 bg-white" aria-label="Website development basics">
        <div className="max-w-4xl mx-auto">
          <SectionLabel>Beginner Roadmap</SectionLabel>
          <SectionTitle>Website Development, Step by Step</SectionTitle>
          <SectionDesc>A website is a system of content, design, code, infrastructure and measurement. The easiest way to learn is to understand what each stage is responsible for, then connect the stages into one launch process.</SectionDesc>
          <div className="mt-10 space-y-3">
            {steps.map(([title, desc]) => (
              <div key={title} className="border border-gray-200 p-6 md:p-7">
                <h2 className="font-extrabold text-lg">{title}</h2>
                <p className="text-gray-600 leading-7 mt-2">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="px-6 lg:px-12 py-20 bg-gray-50" aria-label="Frontend backend and CMS">
        <div className="max-w-5xl mx-auto">
          <SectionLabel>Core Concepts</SectionLabel>
          <SectionTitle>Frontend, Backend, CMS and Hosting</SectionTitle>
          <div className="grid md:grid-cols-2 gap-5 mt-10">
            {[
              ["Frontend", "The part visitors see and interact with. HTML provides structure, CSS controls presentation, and JavaScript adds behavior. Modern frameworks organize these pieces into reusable components."],
              ["Backend", "The server side logic that handles data, authentication, integrations, business rules and APIs. Not every marketing website needs a complex backend."],
              ["CMS", "A content management system lets non developers update pages and posts. WordPress is a common example, while headless CMS setups separate content management from the frontend."],
              ["Hosting and deployment", "Hosting serves the website to users. Modern deployment platforms can build, cache and distribute applications globally, while traditional hosting may run a CMS and database on a server."],
            ].map(([title, desc]) => (
              <div key={title} className="bg-white border border-gray-200 p-7">
                <h3 className="font-extrabold text-lg">{title}</h3>
                <p className="text-gray-600 leading-7 mt-3">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default async function LegacySeoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const page = legacySeoPageById.get(id);
  if (!page) notFound();

  const area = topicArea(page);
  const framework = articleFramework(area);
  const faq = faqFor(page);
  const canonical = `${BASE_URL}${page.path}/`;
  const description = getDescription(page);
  const isBeginnersWebsiteGuide = page.id === "beginners-guide-to-website-development";

  const schema = page.kind === "article"
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: page.title,
        description,
        mainEntityOfPage: canonical,
        publisher: { "@type": "Organization", name: "Markit Media", url: BASE_URL },
      }
    : {
        "@context": "https://schema.org",
        "@type": "Service",
        name: page.title,
        description,
        url: canonical,
        provider: { "@type": "Organization", name: "Markit Media", url: BASE_URL },
      };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <article>
      <JsonLd data={schema} />
      <JsonLd data={faqSchema} />

      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: page.kind === "article" ? "Insights" : page.kind === "industry" ? "Industries" : "Services", href: page.kind === "article" ? "/blog" : page.kind === "industry" ? "/industries" : "/services" },
          { label: page.title },
        ]}
      />

      <section className="px-6 lg:px-12 pt-24 pb-16 bg-white" aria-label="Page header">
        <div className="max-w-5xl mx-auto">
          <Animate animation="fade-up">
            <div className="flex items-center gap-3 mb-5">
              <span className="inline-flex rounded-full bg-black text-white px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em]">
                {page.kind === "article" ? "Guide" : page.kind === "industry" ? "Industry Marketing" : "Service"}
              </span>
              <span className="text-sm text-gray-400">Markit Media</span>
            </div>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.2rem,5vw,4.2rem)] font-extrabold tracking-tight leading-[1.06]">
              {page.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-8 mt-6 max-w-3xl">
              {description}
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link href={page.relatedHref} className="inline-flex items-center gap-2 bg-black text-white px-6 py-3.5 font-bold hover:bg-gray-800 transition-colors">
                Explore related expertise <ArrowRight size={17} />
              </Link>
              <Link href="/get-a-quote" className="inline-flex items-center gap-2 border border-gray-300 px-6 py-3.5 font-bold hover:border-black transition-colors">
                Talk to our team
              </Link>
            </div>
          </Animate>
        </div>
      </section>

      {isBeginnersWebsiteGuide ? <BeginnersWebsiteGuide /> : (
        <>
          <section className="px-6 lg:px-12 py-20 bg-gray-50" aria-label="Practical framework">
            <div className="max-w-6xl mx-auto">
              <Animate animation="fade-up">
                <SectionLabel>{page.kind === "service" ? "What Good Delivery Looks Like" : page.kind === "industry" ? "Growth Framework" : "Practical Framework"}</SectionLabel>
                <SectionTitle>{page.kind === "service" ? `How We Approach ${page.title}` : `How to Think About ${page.title}`}</SectionTitle>
                <SectionDesc>
                  The useful part of this topic is not a definition alone. It is understanding the decisions, sequence and measurement that turn the idea into a working plan.
                </SectionDesc>
              </Animate>
              <Stagger stagger={45} animation="fade-up" className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mt-12">
                {framework.map(([title, desc], index) => (
                  <div key={title} className="bg-white border border-gray-200 p-6">
                    <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold">{index + 1}</div>
                    <h2 className="font-extrabold mt-5 leading-snug">{title}</h2>
                    <p className="text-sm text-gray-600 leading-6 mt-3">{desc}</p>
                  </div>
                ))}
              </Stagger>
            </div>
          </section>

          {page.kind === "service" && (
            <section className="px-6 lg:px-12 py-20 bg-white" aria-label="Service deliverables">
              <div className="max-w-5xl mx-auto">
                <Animate animation="fade-up">
                  <SectionLabel>Typical Scope</SectionLabel>
                  <SectionTitle>What the Engagement Can Include</SectionTitle>
                  <SectionDesc>The exact scope depends on the starting point and objective, but these are the core workstreams we usually evaluate for this capability.</SectionDesc>
                </Animate>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 mt-10">
                  {serviceDeliverables(area).map((item) => (
                    <div key={item} className="flex items-start gap-3 border border-gray-200 p-5">
                      <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                      <span className="font-semibold">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {page.kind === "industry" && (
            <section className="px-6 lg:px-12 py-20 bg-white" aria-label="Industry strategy">
              <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-5">
                {[
                  [Search, "Capture active demand", "Use search and high intent landing pages to reach people already looking for a solution."],
                  [Sparkles, "Create demand and trust", "Use creative, content and social proof to make the brand easier to remember and compare."],
                  [BarChart3, "Measure the customer journey", "Connect leads, sales and meaningful actions back to the channels that influenced them."],
                ].map(([Icon, title, desc]) => {
                  const I = Icon as typeof Search;
                  return (
                    <div key={String(title)} className="border border-gray-200 p-7">
                      <I size={24} />
                      <h2 className="font-extrabold text-xl mt-6">{String(title)}</h2>
                      <p className="text-gray-600 leading-7 mt-3">{String(desc)}</p>
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </>
      )}

      <section className="px-6 lg:px-12 py-20 bg-black text-white" aria-label="Decision checklist">
        <div className="max-w-6xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Before You Act</SectionLabel>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.9rem,4vw,3rem)] font-extrabold tracking-tight mt-3 max-w-3xl">
              Use a simple decision checklist.
            </h2>
          </Animate>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
            {[
              [Target, "Objective", "What business result should improve if this works?"],
              [Compass, "Audience", "Who needs this and what are they trying to accomplish?"],
              [Layers3, "Execution", "Which pages, channels, assets or systems are required?"],
              [BarChart3, "Measurement", "Which events and metrics will show progress?"],
            ].map(([Icon, title, desc]) => {
              const I = Icon as typeof Target;
              return (
                <div key={String(title)} className="border border-white/15 p-6">
                  <I size={22} />
                  <h3 className="font-extrabold mt-5">{String(title)}</h3>
                  <p className="text-sm text-white/60 leading-6 mt-2">{String(desc)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-gray-50" aria-label="FAQ">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>FAQ</SectionLabel>
            <SectionTitle>Questions About This Topic</SectionTitle>
          </Animate>
          <div className="mt-10">
            {faq.map(([q, a], index) => (
              <Animate key={q} animation="fade-up" delay={index * 45}>
                <details className="group border-b border-gray-200">
                  <summary className="flex justify-between gap-5 items-center py-5 cursor-pointer list-none font-bold">
                    {q}
                    <span aria-hidden="true" className="text-xl text-gray-400 group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="pb-5 text-gray-600 leading-7">{a}</p>
                </details>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-white" aria-label="Next step">
        <div className="max-w-4xl mx-auto text-center border border-gray-200 p-8 md:p-12">
          <Sparkles className="mx-auto" size={28} />
          <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-extrabold tracking-tight mt-5">
            Need help turning this into a working plan?
          </h2>
          <p className="text-gray-600 leading-7 mt-4 max-w-2xl mx-auto">
            We can review the current setup, identify the highest value gaps and recommend the right mix of strategy, creative, search, media and technology.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-7">
            <Link href={page.relatedHref} className="bg-black text-white px-6 py-3.5 font-bold hover:bg-gray-800 transition-colors">
              Explore related service
            </Link>
            <Link href="/get-a-quote" className="border border-gray-300 px-6 py-3.5 font-bold hover:border-black transition-colors">
              Request a quote
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
