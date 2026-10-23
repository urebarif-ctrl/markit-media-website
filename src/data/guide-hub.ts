// Guide hub and related-guide data for /guides and the "Related guides" module on legacy guide pages.
//
// Generated from the 23 Oct 2026 content audit (guide action plan + internal link plan) and then hand-checked.
// Only guides that are being KEPT are listed (tiers T1-T3). Pages planned for merging or owner review are not linked.
// Titles are not stored here: they come from the legacy registry (and legacyTitle() for honest interim titles).
// When a guide is merged, redirected or retired, remove its id here too.

export interface GuideCluster {
  name: string;
  /** Pillar service for this topic, without the locale prefix. */
  service?: { href: string; label: string };
  guideIds: string[];
}

export interface GuideRelated {
  /** Other kept guides on the same topic (ids). */
  siblings: string[];
  /** A free tool that fits this guide (href without locale prefix). */
  tool?: { href: string; label: string };
}

export const guideClusters: GuideCluster[] = [
  {
    name: "Hiring a web agency",
    service: { href: "/services/website-development", label: "Website development services" },
    guideIds: ["top-web-design-companies-in-the-usa", "top-web-development-companies-in-the-usa", "freelancer-vs-agency-pricing"],
  },
  {
    name: "Website basics",
    service: { href: "/services/website-development", label: "Website development services" },
    guideIds: ["beginners-guide-to-website-development", "best-personal-website-examples-to-inspire-your-own-brand", "steps-to-create-a-digital-marketing-agency-website", "best-practices-for-choosing-a-domain-name-in-2026", "healthcare-website-development-complete-guide", "blogging-websites", "why-our-clients-see-3x-more-leads-after-launching-their-new-site", "why-every-business-needs-a-website-in-the-digital-age", "the-latest-trends-in-website-development-for-2026"],
  },
  {
    name: "Website costs",
    service: { href: "/services/website-development", label: "Website development services" },
    guideIds: ["how-much-does-website-development-cost-in-the-usa", "wordpress-website-development-cost-in-the-usa", "how-much-does-it-cost-to-build-an-ecommerce-website"],
  },
  {
    name: "Performance and UX",
    service: { href: "/services/website-development", label: "Website development services" },
    guideIds: ["blogs--how-to-redesign-your-website-for-seo", "10-website-performance-optimization-strategies", "pagination-vs-infinite-scroll-which-is-best-for-your-website", "the-role-of-ux-ui-design-in-successful-website-development", "how-to-conduct-a-comprehensive-web-design-audit", "why-is-a-mobile-friendly-website-important"],
  },
  {
    name: "CMS and platforms",
    service: { href: "/services/website-development", label: "Website development services" },
    guideIds: ["top-web-technologies-for-web-development", "top-content-management-systems-for-website-development", "10-best-website-development-tools-you-must-try", "blogs--top-free-tools-for-better-website-development-and-seo", "what-is-full-stack-web-development-a-complete-guide", "static-vs-dynamic-websites-key-differences-and-best-uses"],
  },
  {
    name: "WordPress",
    service: { href: "/services/website-development/wordpress", label: "WordPress development services" },
    guideIds: ["top-10-plugins-for-wordpress-seo-optimization", "top-wordpress-themes-for-seo-optimization", "blogs--5-wordpress-plugins-to-help-with-digital-marketing-efforts", "the-role-of-backlinks-in-boosting-wordpress-site-rankings", "how-to-optimize-images-for-faster-loading-times-in-wordpress", "how-to-secure-your-wordpress-site-from-cyber-threats", "create-an-seo-friendly-content-strategy-for-your-wordpress-blog", "a-step-by-step-guide-to-setting-up-a-blog-on-wordpress", "building-a-fast-loading-wordpress-site-essential-tips", "blogs--step-by-step-guide-on-how-to-set-up-cloudflare-for-your-wordpress-site", "how-to-use-wordpress-for-local-seo", "how-to-choose-the-best-web-hosting-for-your-wordpress-site"],
  },
  {
    name: "E-commerce",
    service: { href: "/services/website-development/ecommerce", label: "E-commerce development services" },
    guideIds: ["shopify-vs-woocommerce-vs-magento-which-platform-is-best", "the-role-of-crm-software-in-improving-customer-retention-for-e-commerce-businesses", "how-to-add-secure-payment-gateways-to-your-website"],
  },
  {
    name: "SEO",
    service: { href: "/services/seo", label: "SEO services" },
    guideIds: ["how-to-create-a-winning-seo-strategy-for-a-new-website", "how-accurate-is-semrush-data-and-how-often-is-its-database-updated", "how-to-integrate-seo-into-your-website-development-workflow", "how-to-set-up-google-my-business-for-local-seo-success", "important-google-ranking-factors-in-2026", "top-advanced-seo-techniques-and-strategies", "seo-vs-smm-the-digital-marketing-guide-every-brand-needs", "going-beyond-google-exploring-alternative-search-engines-for-your-seo-strategy", "how-to-use-reddit-for-seo-in-2026-complete-guide"],
  },
  {
    name: "Digital marketing",
    service: { href: "/services/digital-marketing", label: "Digital marketing services" },
    guideIds: ["common-digital-marketing-mistakes-brands-need-to-avoid", "the-ultimate-guide-to-conducting-competitor-analysis-in-digital-marketing", "the-synergy-of-bpo-and-digital-marketing-a-winning-combination", "how-to-track-and-improve-your-return-on-investment-roi", "top-10-digital-marketing-trends-expected-in-2026", "why-content-marketing-is-vital-for-digital-marketing-success", "ultimate-guide-to-digital-marketing-strategies-benefits-more", "soft-launch-vs-hard-launch-whats-the-difference", "digital-marketing-vs-online-marketing-understanding-the-key-differences", "a-beginners-guide-to-understanding-online-marketing-metrics", "online-reviews-the-voice-of-your-customers", "how-to-create-a-winning-digital-marketing-campaign-on-a-budget", "email-marketing-essentials-a-beginners-guide-for-small-businesses", "how-to-build-an-online-presence-with-content-marketing"],
  },
  {
    name: "Social media",
    service: { href: "/services/social-media", label: "Social media services" },
    guideIds: ["social-media-phone-vs-desktop-use", "using-influencer-marketing-to-complement-your-digital-strategy", "complete-guide-to-social-media-developing-an-effective-strategy", "the-cost-of-social-media-marketing-in-us-2026-guide", "how-to-drive-traffic-to-your-blog-using-social-media", "blog-top-10-tools-for-social-media-management-2026", "influencer-marketing-vs-ppc-advertising", "become-the-ultimate-social-media-guru-with-the-power-of-customized-filters-on-facebook-instagram-and-tiktok", "social-media-automation-tools-2026"],
  },
  {
    name: "Branding and design",
    service: { href: "/services/branding/logo-design", label: "Logo and brand design services" },
    guideIds: ["difference-between-graphic-designers-and-graphic-illustrators", "logo-design-trends-2026-fresh-inspiration-for-your-brand"],
  },
  {
    name: "Video and animation",
    service: { href: "/services/video-production/animation", label: "Animation services" },
    guideIds: ["best-animation-software-for-creators-and-professionals"],
  },
  {
    name: "AI and automation",
    service: { href: "/services/ai", label: "AI services" },
    guideIds: ["social-impact-of-ai-how-artificial-intelligence-is-transforming-society", "using-ai-tools-for-effective-digital-marketing-automation", "the-role-of-chatbots-in-enhancing-digital-marketing-efforts", "blogs--how-ai-is-shaping-the-future-of-digital-marketing"],
  },
  {
    name: "Operations",
    service: { href: "/services/bpo", label: "BPO services" },
    guideIds: ["basics-of-project-management-an-agency-perspective"],
  },
  {
    name: "More topics",
    guideIds: ["22-best-augmented-reality-games-you-must-try"],
  },
];

export const guideRelated: Record<string, GuideRelated> = {
  "10-best-website-development-tools-you-must-try": { siblings: ["top-content-management-systems-for-website-development", "blogs--top-free-tools-for-better-website-development-and-seo"] },
  "10-website-performance-optimization-strategies": { siblings: [], tool: { href: "/free-tools/free-kpi-builder", label: "Marketing KPI Dashboard Builder" } },
  "a-beginners-guide-to-understanding-online-marketing-metrics": { siblings: ["digital-marketing-vs-online-marketing-understanding-the-key-differences", "email-marketing-essentials-a-beginners-guide-for-small-businesses"], tool: { href: "/free-tools/free-marketing-metrics-benchmark", label: "Marketing Metrics Benchmark Tool" } },
  "a-step-by-step-guide-to-setting-up-a-blog-on-wordpress": { siblings: ["blogs--step-by-step-guide-on-how-to-set-up-cloudflare-for-your-wordpress-site", "create-an-seo-friendly-content-strategy-for-your-wordpress-blog"] },
  "beginners-guide-to-website-development": { siblings: ["healthcare-website-development-complete-guide", "the-latest-trends-in-website-development-for-2026"] },
  "blog-top-10-tools-for-social-media-management-2026": { siblings: ["social-media-automation-tools-2026", "the-cost-of-social-media-marketing-in-us-2026-guide", "how-to-drive-traffic-to-your-blog-using-social-media"], tool: { href: "/free-tools/free-social-post-generator", label: "Social Media Post Generator" } },
  "blogs--5-wordpress-plugins-to-help-with-digital-marketing-efforts": { siblings: ["top-10-plugins-for-wordpress-seo-optimization"] },
  "blogs--how-ai-is-shaping-the-future-of-digital-marketing": { siblings: ["using-ai-tools-for-effective-digital-marketing-automation"] },
  "blogs--how-to-redesign-your-website-for-seo": { siblings: [], tool: { href: "/free-tools/free-redesign-planner", label: "Website Redesign Planner" } },
  "blogs--step-by-step-guide-on-how-to-set-up-cloudflare-for-your-wordpress-site": { siblings: ["a-step-by-step-guide-to-setting-up-a-blog-on-wordpress", "how-to-secure-your-wordpress-site-from-cyber-threats", "how-to-choose-the-best-web-hosting-for-your-wordpress-site"] },
  "blogs--top-free-tools-for-better-website-development-and-seo": { siblings: ["10-best-website-development-tools-you-must-try", "top-content-management-systems-for-website-development"] },
  "building-a-fast-loading-wordpress-site-essential-tips": { siblings: ["how-to-secure-your-wordpress-site-from-cyber-threats", "how-to-choose-the-best-web-hosting-for-your-wordpress-site", "the-role-of-backlinks-in-boosting-wordpress-site-rankings"] },
  "common-digital-marketing-mistakes-brands-need-to-avoid": { siblings: [], tool: { href: "/free-tools/free-small-business-guide", label: "Digital Marketing for Small Business \u2014 Complete Guide" } },
  "complete-guide-to-social-media-developing-an-effective-strategy": { siblings: ["the-cost-of-social-media-marketing-in-us-2026-guide", "social-media-automation-tools-2026"], tool: { href: "/free-tools/free-social-post-generator", label: "Social Media Post Generator" } },
  "create-an-seo-friendly-content-strategy-for-your-wordpress-blog": { siblings: ["a-step-by-step-guide-to-setting-up-a-blog-on-wordpress"], tool: { href: "/free-tools/free-content-brief", label: "Content Brief Generator \u2014 Create SEO-Optimized Briefs" } },
  "digital-marketing-vs-online-marketing-understanding-the-key-differences": { siblings: ["a-beginners-guide-to-understanding-online-marketing-metrics"] },
  "email-marketing-essentials-a-beginners-guide-for-small-businesses": { siblings: ["a-beginners-guide-to-understanding-online-marketing-metrics"] },
  "freelancer-vs-agency-pricing": { siblings: [], tool: { href: "/free-tools/free-agency-pricing-calculator", label: "Agency Pricing Calculator" } },
  "going-beyond-google-exploring-alternative-search-engines-for-your-seo-strategy": { siblings: ["how-to-create-a-winning-seo-strategy-for-a-new-website"] },
  "healthcare-website-development-complete-guide": { siblings: ["beginners-guide-to-website-development", "the-latest-trends-in-website-development-for-2026"] },
  "how-much-does-it-cost-to-build-an-ecommerce-website": { siblings: ["how-much-does-website-development-cost-in-the-usa", "wordpress-website-development-cost-in-the-usa"] },
  "how-much-does-website-development-cost-in-the-usa": { siblings: ["wordpress-website-development-cost-in-the-usa", "how-much-does-it-cost-to-build-an-ecommerce-website"] },
  "how-to-build-an-online-presence-with-content-marketing": { siblings: ["why-content-marketing-is-vital-for-digital-marketing-success"] },
  "how-to-choose-the-best-web-hosting-for-your-wordpress-site": { siblings: ["how-to-secure-your-wordpress-site-from-cyber-threats", "the-role-of-backlinks-in-boosting-wordpress-site-rankings", "blogs--step-by-step-guide-on-how-to-set-up-cloudflare-for-your-wordpress-site"] },
  "how-to-create-a-winning-digital-marketing-campaign-on-a-budget": { siblings: ["the-synergy-of-bpo-and-digital-marketing-a-winning-combination"], tool: { href: "/free-tools/free-campaign-tracker", label: "Marketing Campaign Tracker" } },
  "how-to-create-a-winning-seo-strategy-for-a-new-website": { siblings: ["going-beyond-google-exploring-alternative-search-engines-for-your-seo-strategy"] },
  "how-to-drive-traffic-to-your-blog-using-social-media": { siblings: ["blog-top-10-tools-for-social-media-management-2026", "social-media-automation-tools-2026", "the-cost-of-social-media-marketing-in-us-2026-guide"] },
  "how-to-optimize-images-for-faster-loading-times-in-wordpress": { siblings: ["building-a-fast-loading-wordpress-site-essential-tips"] },
  "how-to-secure-your-wordpress-site-from-cyber-threats": { siblings: ["how-to-choose-the-best-web-hosting-for-your-wordpress-site", "the-role-of-backlinks-in-boosting-wordpress-site-rankings", "blogs--step-by-step-guide-on-how-to-set-up-cloudflare-for-your-wordpress-site"] },
  "how-to-use-wordpress-for-local-seo": { siblings: ["top-wordpress-themes-for-seo-optimization", "top-10-plugins-for-wordpress-seo-optimization"] },
  "influencer-marketing-vs-ppc-advertising": { siblings: ["using-influencer-marketing-to-complement-your-digital-strategy"], tool: { href: "/free-tools/free-seo-vs-ppc", label: "SEO vs PPC: Which Is Right for Your Business?" } },
  "shopify-vs-woocommerce-vs-magento-which-platform-is-best": { siblings: [], tool: { href: "/free-tools/free-web-platform-guide", label: "WordPress vs Shopify vs Next.js: Which Platform Is Right for You?" } },
  "social-media-automation-tools-2026": { siblings: ["blog-top-10-tools-for-social-media-management-2026", "the-cost-of-social-media-marketing-in-us-2026-guide", "social-media-phone-vs-desktop-use"], tool: { href: "/free-tools/free-social-post-generator", label: "Social Media Post Generator" } },
  "social-media-phone-vs-desktop-use": { siblings: ["social-media-automation-tools-2026", "the-cost-of-social-media-marketing-in-us-2026-guide", "blog-top-10-tools-for-social-media-management-2026"], tool: { href: "/free-tools/free-social-post-generator", label: "Social Media Post Generator" } },
  "steps-to-create-a-digital-marketing-agency-website": { siblings: [], tool: { href: "/free-tools/free-agency-comparison", label: "How to Choose a Digital Marketing Agency \u2014 Complete Guide" } },
  "the-cost-of-social-media-marketing-in-us-2026-guide": { siblings: ["social-media-automation-tools-2026", "blog-top-10-tools-for-social-media-management-2026", "complete-guide-to-social-media-developing-an-effective-strategy"], tool: { href: "/free-tools/free-social-post-generator", label: "Social Media Post Generator" } },
  "the-latest-trends-in-website-development-for-2026": { siblings: ["beginners-guide-to-website-development", "healthcare-website-development-complete-guide"] },
  "the-role-of-backlinks-in-boosting-wordpress-site-rankings": { siblings: ["how-to-secure-your-wordpress-site-from-cyber-threats", "how-to-choose-the-best-web-hosting-for-your-wordpress-site", "blogs--step-by-step-guide-on-how-to-set-up-cloudflare-for-your-wordpress-site"] },
  "the-role-of-crm-software-in-improving-customer-retention-for-e-commerce-businesses": { siblings: [], tool: { href: "/free-tools/free-retention-calculator", label: "Customer Retention Calculator" } },
  "the-synergy-of-bpo-and-digital-marketing-a-winning-combination": { siblings: ["how-to-create-a-winning-digital-marketing-campaign-on-a-budget"] },
  "the-ultimate-guide-to-conducting-competitor-analysis-in-digital-marketing": { siblings: ["ultimate-guide-to-digital-marketing-strategies-benefits-more"], tool: { href: "/free-tools/free-competitor-analysis", label: "Competitor Analysis Framework \u2014 Map Your Market Landscape" } },
  "top-10-plugins-for-wordpress-seo-optimization": { siblings: ["top-wordpress-themes-for-seo-optimization", "blogs--5-wordpress-plugins-to-help-with-digital-marketing-efforts", "how-to-use-wordpress-for-local-seo"] },
  "top-content-management-systems-for-website-development": { siblings: ["10-best-website-development-tools-you-must-try", "blogs--top-free-tools-for-better-website-development-and-seo"] },
  "top-web-design-companies-in-the-usa": { siblings: ["top-web-development-companies-in-the-usa"] },
  "top-web-development-companies-in-the-usa": { siblings: ["top-web-design-companies-in-the-usa"] },
  "top-web-technologies-for-web-development": { siblings: ["what-is-full-stack-web-development-a-complete-guide"] },
  "top-wordpress-themes-for-seo-optimization": { siblings: ["top-10-plugins-for-wordpress-seo-optimization", "how-to-use-wordpress-for-local-seo"] },
  "ultimate-guide-to-digital-marketing-strategies-benefits-more": { siblings: ["the-ultimate-guide-to-conducting-competitor-analysis-in-digital-marketing"] },
  "using-ai-tools-for-effective-digital-marketing-automation": { siblings: ["blogs--how-ai-is-shaping-the-future-of-digital-marketing"] },
  "using-influencer-marketing-to-complement-your-digital-strategy": { siblings: ["influencer-marketing-vs-ppc-advertising"] },
  "what-is-full-stack-web-development-a-complete-guide": { siblings: ["top-web-technologies-for-web-development"] },
  "why-content-marketing-is-vital-for-digital-marketing-success": { siblings: ["how-to-build-an-online-presence-with-content-marketing"] },
  "wordpress-website-development-cost-in-the-usa": { siblings: ["how-much-does-website-development-cost-in-the-usa", "how-much-does-it-cost-to-build-an-ecommerce-website"] },
};
