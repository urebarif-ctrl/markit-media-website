// Interim, truthful titles and descriptions for legacy guides whose search snippet promised more than the page contains.
//
// Background (content audit, 23 Oct 2026): on 26 Sep 2026 the old WordPress articles were restored on one generic
// template, and on 7 Oct titles/descriptions were written for the ORIGINAL articles ("22 best ...", "ranked list",
// "compared by pricing"). The pages themselves show a short planning framework, so the snippets over-promised.
// Until each guide is rewritten with researched content, its title, H1 and description describe what the page is.
//
// Rules for entries: no numbers of items, no "best/top/ranked/compared", no prices, no year labels, nothing the page lacks.
// When a guide is rewritten, DELETE its entry here so the real copy takes over.
export interface InterimCopy {
  /** H1, <title>, breadcrumb and schema headline. Omit to keep the registry title. */
  title?: string;
  /** Noun phrase used in the "How to Think About ..." heading. Omit to use the title. */
  topic?: string;
  description: string;
}

const FRAME = "objective, audience, channels and measurement";

export const legacyInterimCopy: Record<string, InterimCopy> = {
  "top-web-design-companies-in-the-usa": {
    title: "How to Choose a Web Design Company in the USA",
    topic: "Choosing a Web Design Company",
    description: "A practical framework for hiring a web design company in the USA: set the goal and audience, plan structure, check performance and agree how results are measured.",
  },
  "top-web-development-companies-in-the-usa": {
    title: "How to Choose a Web Development Company in the USA",
    topic: "Choosing a Web Development Company",
    description: "A practical framework for hiring a web development company in the USA: set the goal and audience, plan structure, check performance and agree how results are measured.",
  },
  "22-best-augmented-reality-games-you-must-try": {
    title: "Augmented Reality Games: A Planning Framework",
    topic: "Augmented Reality Games",
    description: `A short planning framework for augmented reality games: ${FRAME}.`,
  },
  "best-personal-website-examples-to-inspire-your-own-brand": {
    title: "Planning a Personal Website: A Practical Framework",
    topic: "Planning a Personal Website",
    description: "How to plan a personal website for your own brand: set the goal, structure the pages, build for speed and accessibility, and measure results after launch.",
  },
  "how-much-does-website-development-cost-in-the-usa": {
    title: "Website Development Cost in the USA: What to Plan For",
    topic: "Website Development Costs",
    description: "The planning decisions that drive website development cost in the USA: goal, structure, performance needs and measurement.",
  },
  "top-10-plugins-for-wordpress-seo-optimization": {
    title: "Choosing WordPress SEO Plugins: A Practical Framework",
    topic: "Choosing WordPress SEO Plugins",
    description: "How to choose WordPress SEO plugins: define the goal, check the structure of your site, weigh performance and accessibility, and measure the effect.",
  },
  "social-media-phone-vs-desktop-use": {
    title: "Social Media on Phone and Desktop: A Planning Framework",
    topic: "Social Media on Phone and Desktop",
    description: `A short framework for planning social media content across phone and desktop: ${FRAME}.`,
  },
  "shopify-vs-woocommerce-vs-magento-which-platform-is-best": {
    title: "Choosing an Ecommerce Platform: A Practical Framework",
    topic: "Choosing an Ecommerce Platform",
    description: "How to approach the choice between Shopify, WooCommerce and Magento: start from your goal and audience, structure, performance needs and how you will measure results.",
  },
  "10-best-website-development-tools-you-must-try": {
    title: "Website Development Tools: How to Choose",
    topic: "Choosing Website Development Tools",
    description: "How to choose website development tools: start from the goal and audience, plan structure, weigh performance and accessibility, and decide how you will measure results.",
  },
  "influencer-marketing-vs-ppc-advertising": {
    title: "Influencer Marketing and PPC: A Planning Framework",
    topic: "Influencer Marketing and PPC",
    description: `A short framework for deciding between influencer marketing and PPC advertising: ${FRAME}.`,
  },
  "content-management-systems-compared-why-wordpress-is-the-leader": {
    title: "Choosing a Content Management System: A Framework",
    topic: "Choosing a Content Management System",
    description: "How to choose a content management system for a website: goal, audience, structure, performance and measurement, with a short decision checklist.",
  },
  "seo-vs-smm-the-digital-marketing-guide-every-brand-needs": {
    title: "SEO and Social Media Marketing: A Planning Framework",
    topic: "SEO and Social Media Marketing",
    description: `A short framework for deciding how to balance SEO and social media marketing: ${FRAME}.`,
  },
  "pagination-vs-infinite-scroll-which-is-best-for-your-website": {
    title: "Pagination or Infinite Scroll: How to Decide",
    topic: "Pagination and Infinite Scroll",
    description: "How to decide between pagination and infinite scroll: start with the user goal, plan structure, check performance and accessibility, and measure the effect.",
  },
  "the-cost-of-social-media-marketing-in-us-2026-guide": {
    title: "Planning a Social Media Marketing Budget in the US",
    topic: "Social Media Marketing Budgets",
    description: `The planning decisions that shape a social media marketing budget in the US: ${FRAME}.`,
  },
  "soft-launch-vs-hard-launch-whats-the-difference": {
    title: "Soft Launch or Hard Launch: How to Decide",
    topic: "Soft and Hard Launches",
    description: `How to decide between a soft launch and a hard launch: ${FRAME}.`,
  },
  "website-development-cost-complete-pricing-guide": {
    title: "Website Development Cost: What to Plan For",
    topic: "Website Development Costs",
    description: "The planning decisions that drive website development cost: goal, structure, performance needs and measurement.",
  },
  "static-vs-dynamic-websites-key-differences-and-best-uses": {
    title: "Static or Dynamic Website: How to Decide",
    topic: "Static and Dynamic Websites",
    description: "How to decide between a static and a dynamic website: start from the goal and audience, plan structure, check performance and decide how to measure results.",
  },
  "wordpress-website-development-cost-in-the-usa": {
    title: "WordPress Website Development Cost: What to Plan For",
    topic: "WordPress Development Costs",
    description: "The planning decisions that drive WordPress website development cost in the USA: goal, structure, performance needs and measurement.",
  },
  "digital-marketing-vs-online-marketing-understanding-the-key-differences": {
    title: "Digital Marketing and Online Marketing: A Framework",
    topic: "Digital and Online Marketing",
    description: `A short framework for planning digital and online marketing together: ${FRAME}.`,
  },
  "blog-top-10-tools-for-social-media-management-2025": {
    title: "Choosing Social Media Management Tools",
    topic: "Choosing Social Media Management Tools",
    description: `How to choose social media management tools: define the objective, understand the audience, pick channels deliberately and decide what to measure.`,
  },
  "how-much-does-it-cost-to-build-an-ecommerce-website": {
    title: "Ecommerce Website Cost: What to Plan For",
    topic: "Ecommerce Website Costs",
    description: "The planning decisions that drive the cost of an ecommerce website: goal, structure, performance needs and measurement.",
  },
  "freelancer-vs-agency-pricing": {
    title: "Freelancer or Agency: How to Decide",
    topic: "Freelancers and Agencies",
    description: `How to decide between hiring a freelancer or an agency: ${FRAME}.`,
  },
  // Not flagged by the title check, but their 7 Oct descriptions also described content that is not on the page.
  "why-our-clients-see-3x-more-leads-after-launching-their-new-site": {
    title: "How a New Website Can Affect Lead Generation",
    topic: "Lead Generation From a New Website",
    description: "A short framework for judging whether a new website improves lead generation: objective, audience, structure, performance and measurement.",
  },
  "best-animation-software-for-creators-and-professionals": {
    title: "Choosing Animation Software: A Practical Framework",
    topic: "Choosing Animation Software",
    description: `How to choose animation software: define the objective, understand the audience, pick the format and decide how you will measure results.`,
  },
  "steps-to-create-a-digital-marketing-agency-website": {
    description: "A short framework for planning a digital marketing agency website: goal, audience, structure, performance and measurement.",
  },
  "using-influencer-marketing-to-complement-your-digital-strategy": {
    description: `A short framework for using influencer marketing alongside other digital channels: ${FRAME}.`,
  },
  "how-accurate-is-semrush-data-and-how-often-is-its-database-updated": {
    title: "Using SEO Tool Data Such as Semrush: A Framework",
    topic: "SEO Tool Data",
    description: "A short framework for working with SEO tool data such as Semrush: objective, audience, structure and measurement.",
  },
  "best-practices-for-choosing-a-domain-name-in-2025": {
    title: "Choosing a Domain Name: A Practical Framework",
    topic: "Choosing a Domain Name",
    description: "How to choose a domain name for a website: set the goal, think about the audience, keep structure and performance in mind and decide how you will measure results.",
  },
  "how-to-create-a-winning-seo-strategy-for-a-new-website": {
    description: "A short framework for building an SEO strategy for a new website: objective, audience, structure, performance and measurement.",
  },
  "common-digital-marketing-mistakes-brands-need-to-avoid": {
    description: `A short framework for avoiding common digital marketing mistakes: ${FRAME}.`,
  },
  "social-impact-of-ai-how-artificial-intelligence-is-transforming-society": {
    title: "The Social Impact of AI: A Short Framework",
    topic: "AI and Society",
    description: `A short framework for thinking about the social impact of artificial intelligence: ${FRAME}.`,
  },
  // Added after a second pass over every live guide title (list / "top" / "complete guide" promises the audit heuristic missed).
  "top-web-technologies-for-web-development": {
    title: "Choosing Web Technologies: A Practical Framework",
    topic: "Choosing Web Technologies",
    description: "How to choose web technologies for a project: start from the goal and audience, plan structure, weigh performance and accessibility, and decide how you will measure results.",
  },
  "the-ultimate-guide-to-conducting-competitor-analysis-in-digital-marketing": {
    title: "Competitor Analysis in Digital Marketing: A Framework",
    topic: "Competitor Analysis",
    description: "A short framework for competitor analysis in digital marketing: objective, audience, channels and measurement.",
  },
  "top-wordpress-themes-for-seo-optimization": {
    title: "Choosing a WordPress Theme for SEO: A Framework",
    topic: "Choosing a WordPress Theme",
    description: "How to choose a WordPress theme with SEO in mind: goal, structure, performance and accessibility, and measurement.",
  },
  "blogs--5-wordpress-plugins-to-help-with-digital-marketing-efforts": {
    title: "Choosing WordPress Plugins for Marketing",
    topic: "Choosing WordPress Plugins",
    description: "How to choose WordPress plugins that support digital marketing: goal, audience, structure, performance and measurement.",
  },
  "complete-guide-to-social-media-developing-an-effective-strategy": {
    title: "Developing a Social Media Strategy: A Framework",
    topic: "Social Media Strategy",
    description: "A short framework for developing a social media strategy: objective, audience, channels and measurement.",
  },
  "top-content-management-systems-for-website-development": {
    title: "Which CMS for Your Website? How to Decide",
    topic: "Choosing a CMS",
    description: "How to decide which content management system suits a website: goal, audience, structure, performance and measurement.",
  },
  "10-website-performance-optimization-strategies": {
    title: "Website Performance: A Practical Framework",
    topic: "Website Performance",
    description: "A short framework for improving website performance: goal, structure, performance and accessibility checks, and measurement.",
  },
  "10-common-digital-marketing-mistakes-and-how-to-avoid-them": {
    title: "Digital Marketing Mistakes: How to Avoid Them",
    topic: "Digital Marketing Mistakes",
    description: "A short framework for avoiding digital marketing mistakes: clear objectives, audience, channel choice and measurement.",
  },
  "best-practices-for-choosing-a-domain-name-in-2026": {
    title: "Choosing a Domain Name: What to Consider",
    topic: "Choosing a Domain Name",
    description: "What to consider when choosing a domain name for a website: goal, audience, structure and performance, and how you will measure results.",
  },
  "healthcare-website-development-complete-guide": {
    title: "Healthcare Website Development: A Planning Framework",
    topic: "Healthcare Website Development",
    description: "A short framework for planning a healthcare website: goal, audience, structure, performance and accessibility, and measurement.",
  },
  "logo-design-trends-2026-fresh-inspiration-for-your-brand": {
    title: "Planning a Logo Update: A Practical Framework",
    topic: "Planning a Logo Update",
    description: "A short framework for planning a logo update: objective, audience, where the logo will be used and how you will measure the result.",
  },
  "top-advanced-seo-techniques-and-strategies": {
    title: "Advanced SEO: A Practical Framework",
    topic: "Advanced SEO",
    description: "A short framework for planning advanced SEO work: objective, audience, structure, performance and measurement.",
  },
  "blog-top-10-tools-for-social-media-management-2026": {
    title: "Social Media Management Tools: What to Look For",
    topic: "Social Media Management Tools",
    description: "What to look for in social media management tools: objective, audience, channels and measurement.",
  },
  "top-10-digital-marketing-trends-expected-in-2026": {
    title: "Planning Around Digital Marketing Trends",
    topic: "Digital Marketing Trends",
    description: "A short framework for planning around digital marketing trends: objective, audience, channels and measurement.",
  },
  "blogs--top-free-tools-for-better-website-development-and-seo": {
    title: "Free Tools for Website Development and SEO: How to Choose",
    topic: "Choosing Free Tools",
    description: "How to choose free tools for website development and SEO: goal, audience, structure, performance and measurement.",
  },
  "ultimate-guide-to-digital-marketing-strategies-benefits-more": {
    title: "Digital Marketing Strategy: A Practical Framework",
    topic: "Digital Marketing Strategy",
    description: "A short framework for building a digital marketing strategy: objective, audience, channels and measurement.",
  },
  "what-is-full-stack-web-development-a-complete-guide": {
    title: "Full Stack Web Development: A Planning Framework",
    topic: "Full Stack Web Development",
    description: "A short framework for planning full stack web development work: goal, audience, structure, performance and measurement.",
  },
  "linkedin-summary-examples-to-attract-more-leads": {
    title: "Writing a LinkedIn Summary: A Short Framework",
    topic: "Writing a LinkedIn Summary",
    description: "A short framework for writing a LinkedIn summary: objective, audience, channels and measurement.",
  },
  "the-future-of-website-development-trends-to-watch-in-2026": {
    title: "Website Development Trends: A Planning Framework",
    topic: "Website Development Trends",
    description: "A short framework for looking ahead on website development: goal, audience, structure, performance and measurement.",
  },
  "the-latest-trends-in-website-development-for-2026": {
    title: "Planning Around Website Development Trends",
    topic: "Website Development Trends",
    description: "A short framework for planning around website development trends: goal, audience, structure, performance and measurement.",
  },
  "become-the-ultimate-social-media-guru-with-the-power-of-customized-filters-on-facebook-instagram-and-tiktok": {
    title: "Using Social Media Platform Features Well",
    topic: "Social Media Platform Features",
    description: "A short framework for getting more from social media platform features: objective, audience, channels and measurement.",
  },
  "how-to-use-reddit-for-seo-in-2026-complete-guide": {
    title: "Using Reddit for SEO: A Practical Framework",
    topic: "Using Reddit for SEO",
    description: "A short framework for using Reddit as part of an SEO plan: objective, audience, structure and measurement.",
  },
  "exploring-the-best-practices-for-website-redesign-in-2025": {
    title: "Planning a Website Redesign: A Practical Framework",
    topic: "Planning a Website Redesign",
    description: "A short framework for planning a website redesign: goal, audience, structure, performance and measurement.",
  },
  "top-10-digital-marketing-trends-expected-in-2025": {
    title: "Digital Marketing Trends: A Planning Framework",
    topic: "Digital Marketing Trends",
    description: "A short framework for planning around digital marketing trends: objective, audience, channels and measurement.",
  },
  "logo-design-trends-2025-fresh-inspiration-for-your-brand": {
    title: "Planning a Logo Refresh: A Practical Framework",
    topic: "Planning a Logo Refresh",
    description: "A short framework for planning a logo refresh: objective, audience, where the logo will be used and how you will measure the result.",
  },
  "7-strategies-for-effective-coo-leadership": {
    title: "Effective COO Leadership: A Short Framework",
    topic: "COO Leadership",
    description: "A short framework for thinking about COO leadership: objective, audience, channels and measurement.",
  },
  "how-to-choose-the-best-web-hosting-for-your-wordpress-site": {
    title: "Choosing Web Hosting for a WordPress Site",
    topic: "Choosing Web Hosting",
    description: "How to choose web hosting for a WordPress site: goal, audience, structure, performance and measurement.",
  },
  "social-media-automation-tools-2026": {
    title: "Social Media Automation: A Practical Framework",
    topic: "Social Media Automation",
    description: "A short framework for deciding what to automate in social media: objective, audience, channels and measurement.",
  },
  "social-media-automation-tools-2025": {
    title: "Automating Social Media: What to Consider",
    topic: "Automating Social Media",
    description: "What to consider before automating social media work: objective, audience, channels and how you will measure results.",
  },
  "important-google-ranking-factors-in-2026": {
    title: "Thinking About SEO Ranking Factors: A Framework",
    topic: "SEO Ranking Factors",
    description: "A short framework for thinking about what affects search visibility: objective, audience, structure, performance and measurement.",
  },
  "important-google-ranking-factors-in-2025": {
    title: "SEO Ranking Factors: What to Check First",
    topic: "Checking SEO Ranking Factors",
    description: "What to check first when working on search visibility: goal, audience, structure, performance and how you will measure the effect.",
  },
};

/** Title to show for a legacy guide: the interim honest title if one is set, otherwise the registry title. */
export function legacyTitle(page: { id: string; title: string }): string {
  return legacyInterimCopy[page.id]?.title ?? page.title;
}
