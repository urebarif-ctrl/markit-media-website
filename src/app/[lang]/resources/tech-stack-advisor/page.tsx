"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface QuizOption {
  label: string;
  value: string;
}

interface SingleSelectStep {
  id: string;
  question: string;
  type: "single";
  options: QuizOption[];
}

interface MultiSelectStep {
  id: string;
  question: string;
  type: "multi";
  options: QuizOption[];
}

type QuizStep = SingleSelectStep | MultiSelectStep;

interface StackRecommendation {
  name: string;
  whyItFits: string;
  buildTime: string;
  maintenanceLevel: string;
}

interface AlternativeOption {
  name: string;
  comparison: string;
}

interface HostingRec {
  provider: string;
  reasoning: string;
}

interface StackBreakdown {
  frontend: string;
  backend: string;
  cms: string;
  hosting: string;
  keyTools: string[];
}

interface ProsCons {
  pros: string[];
  cons: string[];
}

interface ComparisonRow {
  name: string;
  score: number;
  buildTime: string;
  maintenanceLevel: string;
  budgetRange: string;
  bestFor: string;
  pros: string[];
  cons: string[];
}

interface Results {
  primary: StackRecommendation;
  alternative: AlternativeOption;
  hosting: HostingRec;
  breakdown: StackBreakdown;
  budgetRange: string;
  comparison: ComparisonRow[];
}

type AnswerMap = Record<string, string>;
type MultiAnswerMap = Record<string, string[]>;

/* ------------------------------------------------------------------ */
/*  Quiz steps                                                         */
/* ------------------------------------------------------------------ */

const steps: QuizStep[] = [
  {
    id: "businessType",
    question: "What is your business type?",
    type: "single",
    options: [
      { label: "Small Business", value: "small_business" },
      { label: "E-commerce", value: "ecommerce" },
      { label: "SaaS / Web App", value: "saas" },
      { label: "Corporate", value: "corporate" },
      { label: "Portfolio / Agency", value: "portfolio" },
      { label: "Blog / Publisher", value: "blog" },
      { label: "Marketplace", value: "marketplace" },
    ],
  },
  {
    id: "goal",
    question: "What is the primary goal of your website?",
    type: "single",
    options: [
      { label: "Generate Leads", value: "leads" },
      { label: "Sell Products Online", value: "sell_products" },
      { label: "Showcase Portfolio", value: "portfolio" },
      { label: "Publish Content", value: "content" },
      { label: "Book Appointments", value: "appointments" },
      { label: "SaaS Dashboard", value: "saas_dashboard" },
      { label: "Community / Forum", value: "community" },
    ],
  },
  {
    id: "budget",
    question: "What is your budget range for the website build?",
    type: "single",
    options: [
      { label: "Under $5K", value: "under5k" },
      { label: "$5K - $15K", value: "5k15k" },
      { label: "$15K - $50K", value: "15k50k" },
      { label: "$50K - $150K", value: "50k150k" },
      { label: "$150K+", value: "150kplus" },
    ],
  },
  {
    id: "contentFrequency",
    question: "How often will you update content on the site?",
    type: "single",
    options: [
      { label: "Rarely (Quarterly)", value: "quarterly" },
      { label: "Sometimes (Monthly)", value: "monthly" },
      { label: "Often (Weekly)", value: "weekly" },
      { label: "Daily", value: "daily" },
      { label: "Multiple Times Daily", value: "multiple_daily" },
    ],
  },
  {
    id: "techExpertise",
    question: "What technical expertise is available to you?",
    type: "single",
    options: [
      { label: "None (Need Full Service)", value: "none" },
      { label: "Basic (Can Edit Content)", value: "basic" },
      { label: "Intermediate (Some Dev Skills)", value: "intermediate" },
      { label: "Advanced (In-House Dev Team)", value: "advanced" },
    ],
  },
  {
    id: "trafficVolume",
    question: "What monthly traffic do you expect?",
    type: "single",
    options: [
      { label: "Under 1,000 visitors", value: "under1k" },
      { label: "1,000 - 10,000 visitors", value: "1k10k" },
      { label: "10,000 - 100,000 visitors", value: "10k100k" },
      { label: "100,000 - 1M visitors", value: "100k1m" },
      { label: "1M+ visitors", value: "1mplus" },
    ],
  },
  {
    id: "timeline",
    question: "How urgently do you need the site launched?",
    type: "single",
    options: [
      { label: "As Soon as Possible (under 4 weeks)", value: "asap" },
      { label: "Standard (1-3 months)", value: "standard" },
      { label: "Flexible (3-6 months)", value: "flexible" },
      { label: "No Rush (6+ months)", value: "no_rush" },
    ],
  },
  {
    id: "requirements",
    question: "Select all key requirements for your website.",
    type: "multi",
    options: [
      { label: "Speed / Performance", value: "speed" },
      { label: "SEO Focus", value: "seo" },
      { label: "E-commerce", value: "ecommerce" },
      { label: "CMS / Content Management", value: "cms" },
      { label: "Custom Integrations", value: "integrations" },
      { label: "Multilingual", value: "multilingual" },
      { label: "Mobile App", value: "mobile_app" },
      { label: "Blog", value: "blog" },
      { label: "User Accounts", value: "user_accounts" },
      { label: "Payment Processing", value: "payments" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Tech stack recommendation engine                                   */
/* ------------------------------------------------------------------ */

type StackKey =
  | "wordpress"
  | "wordpress_woo"
  | "shopify"
  | "nextjs_headless"
  | "nextjs_custom"
  | "webflow"
  | "squarespace"
  | "django"
  | "laravel";

const stackNames: Record<StackKey, string> = {
  wordpress: "WordPress",
  wordpress_woo: "WordPress + WooCommerce",
  shopify: "Shopify",
  nextjs_headless: "Next.js + Headless CMS",
  nextjs_custom: "Next.js + Custom Backend",
  webflow: "Webflow",
  squarespace: "Squarespace",
  django: "Django (Python)",
  laravel: "Laravel (PHP)",
};

function scoreStacks(
  answers: AnswerMap,
  multiAnswers: MultiAnswerMap
): Record<StackKey, number> {
  const scores: Record<StackKey, number> = {
    wordpress: 0,
    wordpress_woo: 0,
    shopify: 0,
    nextjs_headless: 0,
    nextjs_custom: 0,
    webflow: 0,
    squarespace: 0,
    django: 0,
    laravel: 0,
  };

  const bt = answers.businessType;
  const goal = answers.goal;
  const budget = answers.budget;
  const freq = answers.contentFrequency;
  const tech = answers.techExpertise;
  const traffic = answers.trafficVolume;
  const timeline = answers.timeline;
  const reqs = multiAnswers.requirements || [];

  /* --- Business Type --- */
  if (bt === "small_business") {
    scores.wordpress += 5;
    scores.squarespace += 4;
    scores.webflow += 3;
    scores.shopify += 2;
  } else if (bt === "ecommerce") {
    scores.shopify += 5;
    scores.wordpress_woo += 4;
    scores.nextjs_custom += 3;
    scores.laravel += 2;
  } else if (bt === "saas") {
    scores.nextjs_custom += 5;
    scores.django += 4;
    scores.laravel += 3;
    scores.nextjs_headless += 2;
  } else if (bt === "corporate") {
    scores.nextjs_headless += 4;
    scores.wordpress += 4;
    scores.webflow += 3;
    scores.laravel += 2;
  } else if (bt === "portfolio") {
    scores.webflow += 5;
    scores.squarespace += 4;
    scores.nextjs_headless += 3;
    scores.wordpress += 2;
  } else if (bt === "blog") {
    scores.wordpress += 5;
    scores.nextjs_headless += 4;
    scores.squarespace += 3;
    scores.webflow += 2;
  } else if (bt === "marketplace") {
    scores.nextjs_custom += 5;
    scores.laravel += 4;
    scores.django += 4;
    scores.wordpress_woo += 2;
  }

  /* --- Primary Goal --- */
  if (goal === "leads") {
    scores.wordpress += 4;
    scores.webflow += 3;
    scores.squarespace += 3;
    scores.nextjs_headless += 2;
  } else if (goal === "sell_products") {
    scores.shopify += 5;
    scores.wordpress_woo += 4;
    scores.nextjs_custom += 3;
    scores.laravel += 2;
  } else if (goal === "portfolio") {
    scores.webflow += 5;
    scores.squarespace += 4;
    scores.nextjs_headless += 3;
  } else if (goal === "content") {
    scores.wordpress += 5;
    scores.nextjs_headless += 4;
    scores.squarespace += 3;
    scores.webflow += 2;
  } else if (goal === "appointments") {
    scores.squarespace += 4;
    scores.wordpress += 4;
    scores.webflow += 3;
  } else if (goal === "saas_dashboard") {
    scores.nextjs_custom += 5;
    scores.django += 4;
    scores.laravel += 4;
  } else if (goal === "community") {
    scores.nextjs_custom += 4;
    scores.django += 4;
    scores.laravel += 3;
    scores.wordpress += 2;
  }

  /* --- Budget --- */
  if (budget === "under5k") {
    scores.squarespace += 4;
    scores.wordpress += 3;
    scores.shopify += 3;
    scores.webflow += 2;
    scores.nextjs_custom -= 3;
    scores.django -= 3;
    scores.laravel -= 3;
    scores.nextjs_headless -= 1;
  } else if (budget === "5k15k") {
    scores.wordpress += 4;
    scores.shopify += 3;
    scores.webflow += 3;
    scores.wordpress_woo += 3;
    scores.squarespace += 2;
    scores.nextjs_custom -= 1;
    scores.django -= 1;
  } else if (budget === "15k50k") {
    scores.nextjs_headless += 4;
    scores.wordpress_woo += 3;
    scores.wordpress += 2;
    scores.nextjs_custom += 2;
    scores.webflow += 2;
    scores.django += 2;
    scores.laravel += 2;
  } else if (budget === "50k150k") {
    scores.nextjs_custom += 4;
    scores.nextjs_headless += 4;
    scores.django += 3;
    scores.laravel += 3;
    scores.squarespace -= 2;
  } else if (budget === "150kplus") {
    scores.nextjs_custom += 5;
    scores.django += 4;
    scores.laravel += 4;
    scores.nextjs_headless += 3;
    scores.squarespace -= 3;
    scores.webflow -= 2;
  }

  /* --- Content Frequency --- */
  if (freq === "quarterly") {
    scores.squarespace += 2;
    scores.webflow += 2;
    scores.nextjs_headless += 1;
  } else if (freq === "monthly") {
    scores.wordpress += 3;
    scores.webflow += 2;
    scores.squarespace += 2;
    scores.nextjs_headless += 1;
  } else if (freq === "weekly") {
    scores.wordpress += 4;
    scores.nextjs_headless += 3;
    scores.squarespace += 1;
  } else if (freq === "daily") {
    scores.wordpress += 4;
    scores.nextjs_headless += 4;
    scores.django += 1;
    scores.squarespace -= 1;
  } else if (freq === "multiple_daily") {
    scores.wordpress += 3;
    scores.nextjs_headless += 5;
    scores.nextjs_custom += 2;
    scores.django += 2;
    scores.squarespace -= 2;
    scores.webflow -= 1;
  }

  /* --- Technical Expertise --- */
  if (tech === "none") {
    scores.squarespace += 5;
    scores.shopify += 4;
    scores.webflow += 3;
    scores.wordpress += 2;
    scores.nextjs_custom -= 4;
    scores.django -= 4;
    scores.laravel -= 4;
    scores.nextjs_headless -= 2;
  } else if (tech === "basic") {
    scores.wordpress += 4;
    scores.squarespace += 3;
    scores.shopify += 3;
    scores.webflow += 2;
    scores.nextjs_custom -= 2;
    scores.django -= 2;
    scores.laravel -= 2;
  } else if (tech === "intermediate") {
    scores.wordpress += 3;
    scores.webflow += 3;
    scores.nextjs_headless += 3;
    scores.shopify += 2;
    scores.laravel += 1;
  } else if (tech === "advanced") {
    scores.nextjs_custom += 5;
    scores.nextjs_headless += 4;
    scores.django += 4;
    scores.laravel += 4;
    scores.squarespace -= 3;
  }

  /* --- Traffic Volume --- */
  if (traffic === "under1k") {
    scores.squarespace += 3;
    scores.webflow += 2;
    scores.wordpress += 2;
  } else if (traffic === "1k10k") {
    scores.wordpress += 3;
    scores.webflow += 2;
    scores.squarespace += 2;
    scores.shopify += 1;
  } else if (traffic === "10k100k") {
    scores.nextjs_headless += 3;
    scores.wordpress += 2;
    scores.shopify += 2;
    scores.nextjs_custom += 2;
    scores.squarespace -= 1;
  } else if (traffic === "100k1m") {
    scores.nextjs_headless += 4;
    scores.nextjs_custom += 4;
    scores.django += 3;
    scores.laravel += 2;
    scores.squarespace -= 3;
    scores.webflow -= 2;
    scores.wordpress -= 1;
  } else if (traffic === "1mplus") {
    scores.nextjs_custom += 5;
    scores.nextjs_headless += 4;
    scores.django += 4;
    scores.laravel += 3;
    scores.squarespace -= 4;
    scores.webflow -= 3;
    scores.wordpress -= 2;
  }

  /* --- Timeline Urgency --- */
  if (timeline === "asap") {
    scores.squarespace += 5;
    scores.shopify += 4;
    scores.webflow += 3;
    scores.wordpress += 2;
    scores.nextjs_custom -= 4;
    scores.django -= 4;
    scores.laravel -= 3;
    scores.nextjs_headless -= 2;
  } else if (timeline === "standard") {
    scores.wordpress += 3;
    scores.shopify += 2;
    scores.webflow += 2;
    scores.nextjs_headless += 1;
  } else if (timeline === "flexible") {
    scores.nextjs_headless += 3;
    scores.nextjs_custom += 2;
    scores.django += 2;
    scores.laravel += 2;
    scores.wordpress += 1;
  } else if (timeline === "no_rush") {
    scores.nextjs_custom += 4;
    scores.django += 3;
    scores.laravel += 3;
    scores.nextjs_headless += 2;
    scores.squarespace -= 1;
  }

  /* --- Key Requirements (multi-select) --- */
  if (reqs.includes("speed")) {
    scores.nextjs_headless += 4;
    scores.nextjs_custom += 4;
    scores.webflow += 2;
    scores.wordpress -= 1;
  }
  if (reqs.includes("seo")) {
    scores.nextjs_headless += 4;
    scores.wordpress += 3;
    scores.webflow += 2;
    scores.nextjs_custom += 2;
    scores.squarespace += 1;
  }
  if (reqs.includes("ecommerce")) {
    scores.shopify += 5;
    scores.wordpress_woo += 4;
    scores.nextjs_custom += 2;
    scores.laravel += 1;
  }
  if (reqs.includes("cms")) {
    scores.wordpress += 5;
    scores.nextjs_headless += 4;
    scores.webflow += 3;
    scores.squarespace += 2;
  }
  if (reqs.includes("integrations")) {
    scores.nextjs_custom += 4;
    scores.django += 3;
    scores.laravel += 3;
    scores.wordpress += 2;
    scores.squarespace -= 2;
  }
  if (reqs.includes("multilingual")) {
    scores.wordpress += 4;
    scores.nextjs_headless += 3;
    scores.nextjs_custom += 3;
    scores.webflow += 2;
    scores.squarespace -= 1;
  }
  if (reqs.includes("mobile_app")) {
    scores.nextjs_custom += 4;
    scores.django += 3;
    scores.laravel += 3;
    scores.wordpress -= 1;
    scores.squarespace -= 2;
    scores.webflow -= 2;
  }
  if (reqs.includes("blog")) {
    scores.wordpress += 5;
    scores.nextjs_headless += 3;
    scores.squarespace += 2;
    scores.webflow += 2;
  }
  if (reqs.includes("user_accounts")) {
    scores.nextjs_custom += 5;
    scores.django += 4;
    scores.laravel += 4;
    scores.wordpress += 1;
    scores.squarespace -= 2;
    scores.webflow -= 2;
  }
  if (reqs.includes("payments")) {
    scores.shopify += 4;
    scores.wordpress_woo += 3;
    scores.nextjs_custom += 3;
    scores.laravel += 2;
    scores.django += 2;
    scores.squarespace -= 1;
  }

  return scores;
}

/* ------------------------------------------------------------------ */
/*  Build results                                                      */
/* ------------------------------------------------------------------ */

function getStackDetails(
  key: StackKey,
  answers: AnswerMap,
  multiAnswers: MultiAnswerMap
): {
  whyItFits: string;
  buildTime: string;
  maintenanceLevel: string;
  hosting: HostingRec;
  breakdown: StackBreakdown;
  budgetRange: string;
} {
  const reqs = multiAnswers.requirements || [];
  const budget = answers.budget;

  const details: Record<
    StackKey,
    {
      whyItFits: string;
      buildTime: string;
      maintenanceLevel: string;
      hosting: HostingRec;
      breakdown: StackBreakdown;
      budgetRange: string;
    }
  > = {
    wordpress: {
      whyItFits:
        "WordPress powers over 40% of the web for good reason. It offers a mature ecosystem of themes and plugins, a familiar content editing experience, and strong SEO capabilities out of the box. Ideal when content management and ease of updates are priorities.",
      buildTime: "2-6 weeks",
      maintenanceLevel: "Medium — regular plugin updates, security patches, and hosting monitoring required.",
      hosting: {
        provider: "Managed WordPress Hosting (Cloudways or SiteGround)",
        reasoning:
          "Managed hosts handle server optimization, caching, backups, and security updates so you can focus on content instead of infrastructure.",
      },
      breakdown: {
        frontend: "WordPress Theme (custom or premium)",
        backend: "WordPress (PHP)",
        cms: "WordPress built-in CMS",
        hosting: "Managed WordPress hosting",
        keyTools: [
          "Yoast SEO",
          "WP Rocket (caching)",
          "Gravity Forms",
          "UpdraftPlus (backups)",
          reqs.includes("multilingual") ? "WPML (multilingual)" : "Wordfence (security)",
        ],
      },
      budgetRange:
        budget === "under5k"
          ? "$2,000 - $5,000"
          : budget === "5k15k"
            ? "$5,000 - $12,000"
            : "$10,000 - $25,000",
    },
    wordpress_woo: {
      whyItFits:
        "WordPress combined with WooCommerce gives you a full e-commerce solution backed by the largest plugin ecosystem available. You get flexible product management, payment gateway options, and complete control over your store without platform fees on sales.",
      buildTime: "4-10 weeks",
      maintenanceLevel: "High — store operations require ongoing plugin updates, payment gateway monitoring, and security hardening.",
      hosting: {
        provider: "WooCommerce-Optimized Hosting (Cloudways or Nexcess)",
        reasoning:
          "E-commerce sites need guaranteed uptime, fast database queries, and PCI-compliant infrastructure that specialized WooCommerce hosts provide.",
      },
      breakdown: {
        frontend: "WordPress Theme with WooCommerce support",
        backend: "WordPress + WooCommerce (PHP)",
        cms: "WordPress built-in CMS",
        hosting: "WooCommerce-optimized managed hosting",
        keyTools: [
          "WooCommerce",
          "Stripe or PayPal gateway",
          "Yoast SEO",
          "WooCommerce Subscriptions",
          "ShipStation (fulfillment)",
        ],
      },
      budgetRange:
        budget === "under5k" || budget === "5k15k"
          ? "$5,000 - $15,000"
          : "$15,000 - $40,000",
    },
    shopify: {
      whyItFits:
        "Shopify is purpose-built for selling online. It handles hosting, security, and PCI compliance out of the box, letting you focus on products and sales. The app ecosystem covers everything from inventory to marketing automation without needing developers.",
      buildTime: "1-4 weeks",
      maintenanceLevel: "Low — Shopify manages hosting, security, and updates. You handle products and content.",
      hosting: {
        provider: "Shopify (included)",
        reasoning:
          "Shopify includes hosting, SSL, and CDN in its subscription. No separate hosting decisions needed, which reduces complexity and operational overhead.",
      },
      breakdown: {
        frontend: "Shopify Theme (Liquid templating)",
        backend: "Shopify platform (managed)",
        cms: "Shopify built-in content editor",
        hosting: "Shopify (included in subscription)",
        keyTools: [
          "Shopify Payments",
          "Klaviyo (email marketing)",
          "Oberlo or DSers (if dropshipping)",
          "Google Shopping integration",
          "Shopify Analytics",
        ],
      },
      budgetRange:
        budget === "under5k"
          ? "$1,500 - $5,000"
          : budget === "5k15k"
            ? "$5,000 - $15,000"
            : "$10,000 - $30,000",
    },
    nextjs_headless: {
      whyItFits:
        "Next.js with a headless CMS delivers best-in-class performance and SEO through static generation and server-side rendering. Content editors get a clean CMS interface while developers maintain full control over the frontend. Ideal for content-heavy sites that need speed.",
      buildTime: "6-12 weeks",
      maintenanceLevel: "Medium — CMS is managed, but the frontend codebase requires developer maintenance for updates and new features.",
      hosting: {
        provider: "Vercel",
        reasoning:
          "Vercel is built by the creators of Next.js. It offers zero-config deployments, edge caching, automatic preview environments, and optimized serverless infrastructure specifically for Next.js applications.",
      },
      breakdown: {
        frontend: "Next.js (React)",
        backend: "API Routes / Serverless Functions",
        cms: "Sanity, Contentful, or Strapi",
        hosting: "Vercel (frontend) + managed CMS",
        keyTools: [
          "Tailwind CSS",
          "Vercel Analytics",
          reqs.includes("seo") ? "next-sitemap" : "next/image optimization",
          "ISR (Incremental Static Regeneration)",
          reqs.includes("multilingual") ? "next-intl" : "React Server Components",
        ],
      },
      budgetRange:
        budget === "5k15k"
          ? "$8,000 - $15,000"
          : budget === "15k50k"
            ? "$15,000 - $45,000"
            : "$30,000 - $80,000",
    },
    nextjs_custom: {
      whyItFits:
        "A fully custom Next.js application gives you complete control over every aspect of the user experience. With a custom backend, you can build complex features like user authentication, real-time data, and third-party integrations exactly how you need them.",
      buildTime: "10-20 weeks",
      maintenanceLevel: "High — custom code requires an engineering team for ongoing development, bug fixes, and infrastructure management.",
      hosting: {
        provider: "Vercel + AWS (or similar cloud)",
        reasoning:
          "Vercel handles the Next.js frontend with edge optimization, while AWS or a similar cloud provider hosts your custom backend services, databases, and any specialized infrastructure.",
      },
      breakdown: {
        frontend: "Next.js (React)",
        backend: "Node.js API / tRPC / GraphQL",
        cms: "Custom admin panel or headless CMS",
        hosting: "Vercel (frontend) + AWS/GCP (backend)",
        keyTools: [
          "Tailwind CSS",
          "Prisma or Drizzle (ORM)",
          "PostgreSQL",
          reqs.includes("user_accounts") ? "NextAuth.js / Clerk" : "Redis (caching)",
          reqs.includes("payments") ? "Stripe API" : "Docker (containerization)",
        ],
      },
      budgetRange:
        budget === "15k50k"
          ? "$20,000 - $50,000"
          : budget === "50k150k"
            ? "$50,000 - $150,000"
            : "$80,000 - $250,000+",
    },
    webflow: {
      whyItFits:
        "Webflow combines visual design freedom with clean code output and built-in hosting. Designers can build pixel-perfect layouts without writing code, while the CMS handles structured content. A strong choice when design quality and speed to market are the priorities.",
      buildTime: "2-6 weeks",
      maintenanceLevel: "Low — Webflow manages hosting and infrastructure. Content updates are straightforward through the visual editor.",
      hosting: {
        provider: "Webflow (included)",
        reasoning:
          "Webflow includes fast global hosting with automatic SSL and CDN. Keeping design and hosting on one platform eliminates integration overhead.",
      },
      breakdown: {
        frontend: "Webflow (visual builder)",
        backend: "Webflow platform (managed)",
        cms: "Webflow CMS",
        hosting: "Webflow (included in plan)",
        keyTools: [
          "Webflow Interactions (animations)",
          "Finsweet Attributes (extended functionality)",
          "Zapier (integrations)",
          "Webflow Logic (forms and automation)",
          reqs.includes("ecommerce") ? "Webflow E-commerce" : "Webflow SEO settings",
        ],
      },
      budgetRange:
        budget === "under5k"
          ? "$2,000 - $5,000"
          : budget === "5k15k"
            ? "$5,000 - $12,000"
            : "$10,000 - $25,000",
    },
    squarespace: {
      whyItFits:
        "Squarespace offers polished, professionally designed templates with an intuitive drag-and-drop editor. It is the fastest path from zero to a beautiful website, with built-in scheduling, forms, and basic e-commerce requiring no technical knowledge.",
      buildTime: "1-3 weeks",
      maintenanceLevel: "Low — fully managed platform. Content updates, backups, and security are all handled automatically.",
      hosting: {
        provider: "Squarespace (included)",
        reasoning:
          "Squarespace includes hosting, SSL, and a CDN in every plan. It is a single platform with no external dependencies to manage.",
      },
      breakdown: {
        frontend: "Squarespace Templates",
        backend: "Squarespace platform (managed)",
        cms: "Squarespace built-in editor",
        hosting: "Squarespace (included in subscription)",
        keyTools: [
          "Squarespace Scheduling",
          "Squarespace Email Campaigns",
          "Built-in Analytics",
          "Squarespace Forms",
          "Squarespace Extensions",
        ],
      },
      budgetRange:
        budget === "under5k"
          ? "$500 - $3,000"
          : "$2,000 - $8,000",
    },
    django: {
      whyItFits:
        "Django is a battle-tested Python framework used by companies like Instagram and Pinterest. Its built-in admin panel, ORM, and authentication system accelerate development of complex web applications. Best when you need robust data handling and rapid backend development.",
      buildTime: "10-20 weeks",
      maintenanceLevel: "High — requires Python developers for ongoing maintenance, server management, and feature development.",
      hosting: {
        provider: "AWS (EC2 + RDS) or DigitalOcean",
        reasoning:
          "Django applications benefit from dedicated server environments where you control the Python runtime, database configuration, and scaling strategy.",
      },
      breakdown: {
        frontend: "React or Next.js (decoupled)",
        backend: "Django (Python) + Django REST Framework",
        cms: "Django Admin (built-in)",
        hosting: "AWS / DigitalOcean / Railway",
        keyTools: [
          "PostgreSQL",
          "Celery (background tasks)",
          "Django REST Framework",
          reqs.includes("user_accounts") ? "django-allauth" : "Gunicorn + Nginx",
          "Redis (caching / task queue)",
        ],
      },
      budgetRange:
        budget === "15k50k"
          ? "$20,000 - $50,000"
          : budget === "50k150k"
            ? "$50,000 - $150,000"
            : "$80,000 - $200,000+",
    },
    laravel: {
      whyItFits:
        "Laravel is the most popular PHP framework, offering elegant syntax with powerful features like Eloquent ORM, queue management, and built-in authentication. Its mature ecosystem and large developer pool make it a practical choice for custom web applications.",
      buildTime: "8-16 weeks",
      maintenanceLevel: "High — requires PHP developers for ongoing maintenance, updates, and server administration.",
      hosting: {
        provider: "Laravel Forge + DigitalOcean (or AWS)",
        reasoning:
          "Laravel Forge automates server provisioning and deployment for Laravel apps. Paired with DigitalOcean or AWS, it provides a reliable and cost-effective production environment.",
      },
      breakdown: {
        frontend: "Blade Templates or React/Vue (Inertia.js)",
        backend: "Laravel (PHP)",
        cms: "Laravel Nova or Filament (admin panel)",
        hosting: "Laravel Forge + DigitalOcean / AWS",
        keyTools: [
          "MySQL or PostgreSQL",
          "Laravel Cashier (payments)",
          "Laravel Horizon (queues)",
          "Redis",
          reqs.includes("user_accounts") ? "Laravel Breeze / Jetstream" : "Laravel Sanctum (API auth)",
        ],
      },
      budgetRange:
        budget === "15k50k"
          ? "$15,000 - $45,000"
          : budget === "50k150k"
            ? "$40,000 - $120,000"
            : "$60,000 - $180,000+",
    },
  };

  return details[key];
}

function buildResults(
  answers: AnswerMap,
  multiAnswers: MultiAnswerMap
): Results {
  const scores = scoreStacks(answers, multiAnswers);

  const sorted = (Object.entries(scores) as [StackKey, number][]).sort(
    (a, b) => b[1] - a[1]
  );

  const primaryKey = sorted[0][0];
  const altKey = sorted[1][0];

  const primaryDetails = getStackDetails(primaryKey, answers, multiAnswers);
  const altDetails = getStackDetails(altKey, answers, multiAnswers);

  const primary: StackRecommendation = {
    name: stackNames[primaryKey],
    whyItFits: primaryDetails.whyItFits,
    buildTime: primaryDetails.buildTime,
    maintenanceLevel: primaryDetails.maintenanceLevel,
  };

  const alternative: AlternativeOption = {
    name: stackNames[altKey],
    comparison: `${stackNames[altKey]} is a solid alternative. ${altDetails.whyItFits.split(".")[0]}. Compared to ${stackNames[primaryKey]}, it offers ${getComparisonNote(primaryKey, altKey)}.`,
  };

  /* Build comparison table for top 3 */
  const top3Keys = sorted.slice(0, 3).map(([k]) => k as StackKey);

  const comparisonRows: ComparisonRow[] = top3Keys.map((key) => {
    const details = getStackDetails(key, answers, multiAnswers);
    const prosCons = getProsCons(key);
    return {
      name: stackNames[key],
      score: scores[key],
      buildTime: details.buildTime,
      maintenanceLevel: details.maintenanceLevel.split(" — ")[0],
      budgetRange: details.budgetRange,
      bestFor: getBestFor(key),
      pros: prosCons.pros,
      cons: prosCons.cons,
    };
  });

  return {
    primary,
    alternative,
    hosting: primaryDetails.hosting,
    breakdown: primaryDetails.breakdown,
    budgetRange: primaryDetails.budgetRange,
    comparison: comparisonRows,
  };
}

function getComparisonNote(primary: StackKey, alt: StackKey): string {
  const notes: Record<string, string> = {
    wordpress_shopify:
      "more content flexibility but less streamlined e-commerce",
    wordpress_webflow:
      "a larger plugin ecosystem but requires more maintenance",
    wordpress_squarespace:
      "more customization options but a steeper learning curve",
    wordpress_nextjs_headless:
      "easier content management but less frontend performance",
    shopify_wordpress_woo:
      "simpler setup but less backend customization freedom",
    shopify_nextjs_custom:
      "faster time to market but less flexibility for custom features",
    nextjs_headless_wordpress:
      "better performance but requires developer involvement for changes",
    nextjs_headless_webflow:
      "superior performance and SEO but a longer build timeline",
    nextjs_custom_django:
      "a JavaScript-unified stack versus Python's data science strengths",
    nextjs_custom_laravel:
      "React-based frontend flexibility versus Laravel's rapid backend scaffolding",
    django_laravel:
      "Python's ecosystem for data-heavy apps versus PHP's web-focused tooling",
    django_nextjs_custom:
      "battle-tested admin tools versus a more modern JavaScript stack",
    webflow_squarespace:
      "more design control and CMS flexibility but a slightly steeper learning curve",
    squarespace_webflow:
      "faster setup and simpler editing but less design freedom",
  };

  const key1 = `${primary}_${alt}`;
  const key2 = `${alt}_${primary}`;

  if (notes[key1]) return notes[key1];
  if (notes[key2]) return notes[key2];

  return "a different balance of flexibility, cost, and complexity";
}

/* ------------------------------------------------------------------ */
/*  Pros and cons per stack                                            */
/* ------------------------------------------------------------------ */

function getProsCons(key: StackKey): ProsCons {
  const data: Record<StackKey, ProsCons> = {
    wordpress: {
      pros: [
        "Largest plugin ecosystem with 60,000+ plugins",
        "Familiar editing experience for non-technical users",
        "Strong SEO capabilities with plugins like Yoast",
        "Huge freelancer and agency talent pool",
        "Low initial development cost",
      ],
      cons: [
        "Requires regular security patches and plugin updates",
        "Performance can degrade with too many plugins",
        "Custom features often need developer intervention",
        "Hosting quality varies widely and affects speed",
      ],
    },
    wordpress_woo: {
      pros: [
        "No platform fees on sales (unlike Shopify)",
        "Full control over store customization",
        "Extensive payment gateway options",
        "Large ecosystem of e-commerce extensions",
        "Flexible product types and shipping rules",
      ],
      cons: [
        "Higher maintenance burden than hosted platforms",
        "Security responsibility falls on you",
        "Performance optimization requires effort at scale",
        "Plugin conflicts can cause checkout issues",
      ],
    },
    shopify: {
      pros: [
        "Purpose-built for e-commerce with fast setup",
        "PCI compliance and security handled automatically",
        "Reliable uptime and global CDN included",
        "Large app marketplace for added functionality",
        "Built-in payment processing and shipping",
      ],
      cons: [
        "Transaction fees unless using Shopify Payments",
        "Limited customization outside the Liquid template system",
        "Monthly subscription cost adds up over time",
        "Migrating away from Shopify can be complex",
      ],
    },
    nextjs_headless: {
      pros: [
        "Best-in-class page speed and Core Web Vitals",
        "Excellent SEO through server-side rendering and static generation",
        "Content editors get a clean CMS interface",
        "Scales effortlessly with edge caching",
        "Full design freedom without template constraints",
      ],
      cons: [
        "Requires developer involvement for frontend changes",
        "Higher initial build cost than template-based solutions",
        "CMS subscription adds ongoing monthly cost",
        "Smaller talent pool than WordPress developers",
      ],
    },
    nextjs_custom: {
      pros: [
        "Complete control over every aspect of the application",
        "Can handle complex business logic and real-time features",
        "Unified JavaScript/TypeScript stack front to back",
        "Scales horizontally for high-traffic applications",
        "Future-proof architecture for growing requirements",
      ],
      cons: [
        "Longest build timeline of all options",
        "Requires a dedicated engineering team",
        "Higher ongoing maintenance and infrastructure costs",
        "Every feature must be built or integrated from scratch",
      ],
    },
    webflow: {
      pros: [
        "Pixel-perfect visual design without writing code",
        "Clean, semantic HTML/CSS output",
        "Built-in hosting with fast global CDN",
        "Interactions and animations editor included",
        "Quick turnaround from design to live site",
      ],
      cons: [
        "Limited backend logic and dynamic functionality",
        "CMS has structural limitations for complex content",
        "E-commerce features are basic compared to Shopify",
        "Vendor lock-in makes migration difficult",
      ],
    },
    squarespace: {
      pros: [
        "Fastest path from zero to a polished website",
        "No technical knowledge required",
        "Built-in scheduling, forms, and basic e-commerce",
        "All-in-one platform with hosting and SSL included",
        "Professional templates with consistent design quality",
      ],
      cons: [
        "Very limited customization beyond templates",
        "Poor fit for complex or high-traffic sites",
        "No custom backend logic or API integrations",
        "SEO capabilities are basic compared to WordPress or Next.js",
      ],
    },
    django: {
      pros: [
        "Battle-tested by Instagram, Pinterest, and Mozilla",
        "Built-in admin panel accelerates backend development",
        "Excellent for data-heavy and ML-integrated applications",
        "Strong security features out of the box",
        "Python ecosystem for data processing and automation",
      ],
      cons: [
        "Requires Python developers who are less common than JS/PHP",
        "Frontend must be built separately (decoupled architecture)",
        "Higher hosting complexity than managed platforms",
        "Slower initial development for simple sites",
      ],
    },
    laravel: {
      pros: [
        "Elegant syntax with rapid backend scaffolding",
        "Mature ecosystem with packages for auth, payments, and queues",
        "Large PHP developer talent pool",
        "Laravel Forge simplifies deployment and server management",
        "Strong community and documentation",
      ],
      cons: [
        "Requires PHP developers for ongoing maintenance",
        "Server administration responsibility falls on your team",
        "Frontend is typically decoupled or uses Blade templates",
        "Not as performant as Node.js for real-time features",
      ],
    },
  };

  return data[key];
}

function getBestFor(key: StackKey): string {
  const data: Record<StackKey, string> = {
    wordpress: "Content-driven sites and blogs",
    wordpress_woo: "E-commerce with full customization",
    shopify: "Online stores with fast setup",
    nextjs_headless: "High-performance content sites",
    nextjs_custom: "Complex web applications and SaaS",
    webflow: "Design-focused marketing sites",
    squarespace: "Simple sites with minimal budget",
    django: "Data-heavy apps and dashboards",
    laravel: "Custom web apps with rapid backend",
  };
  return data[key];
}

/* ------------------------------------------------------------------ */
/*  Format results as plain text                                       */
/* ------------------------------------------------------------------ */

function formatResultsText(results: Results): string {
  const lines: string[] = [];

  lines.push("WEBSITE TECH STACK ADVISOR RESULTS");
  lines.push("=".repeat(50));
  lines.push("");

  lines.push("PRIMARY RECOMMENDATION");
  lines.push("-".repeat(30));
  lines.push(`Stack: ${results.primary.name}`);
  lines.push(`Why It Fits: ${results.primary.whyItFits}`);
  lines.push(`Estimated Build Time: ${results.primary.buildTime}`);
  lines.push(`Maintenance Level: ${results.primary.maintenanceLevel}`);
  lines.push("");

  lines.push("ALTERNATIVE OPTION");
  lines.push("-".repeat(30));
  lines.push(`Stack: ${results.alternative.name}`);
  lines.push(`Comparison: ${results.alternative.comparison}`);
  lines.push("");

  lines.push("RECOMMENDED HOSTING");
  lines.push("-".repeat(30));
  lines.push(`Provider: ${results.hosting.provider}`);
  lines.push(`Reasoning: ${results.hosting.reasoning}`);
  lines.push("");

  lines.push("TECH STACK BREAKDOWN");
  lines.push("-".repeat(30));
  lines.push(`Frontend: ${results.breakdown.frontend}`);
  lines.push(`Backend: ${results.breakdown.backend}`);
  lines.push(`CMS: ${results.breakdown.cms}`);
  lines.push(`Hosting: ${results.breakdown.hosting}`);
  lines.push(`Key Tools: ${results.breakdown.keyTools.join(", ")}`);
  lines.push("");

  lines.push("BUDGET ESTIMATE");
  lines.push("-".repeat(30));
  lines.push(`Range: ${results.budgetRange}`);
  lines.push("");

  lines.push("COMPARISON: TOP 3 OPTIONS");
  lines.push("-".repeat(30));
  results.comparison.forEach((row, i) => {
    lines.push(`${i + 1}. ${row.name}`);
    lines.push(`   Best For: ${row.bestFor}`);
    lines.push(`   Build Time: ${row.buildTime}`);
    lines.push(`   Maintenance: ${row.maintenanceLevel}`);
    lines.push(`   Budget: ${row.budgetRange}`);
    lines.push(`   Pros: ${row.pros.join("; ")}`);
    lines.push(`   Cons: ${row.cons.join("; ")}`);
    lines.push("");
  });

  lines.push("Generated by Markit Media Website Tech Stack Advisor");
  lines.push("https://themarkitmedia.com/resources/tech-stack-advisor");

  return lines.join("\n");
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard API unavailable */
    }
  }, [text]);

  return (
    <button
      onClick={copy}
      aria-label="Copy results to clipboard"
      className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center px-5 py-3 text-base font-bold border border-gray-200 text-gray-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Website Tech Stack Advisor",
          description: "Free interactive tool that recommends the right website platform and tech stack based on your business requirements, budget, and technical expertise.",
          url: "https://themarkitmedia.com/en/resources/tech-stack-advisor",
          applicationCategory: "Advertising Tool",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          provider: { "@type": "Organization", name: "Markit Media", url: "https://themarkitmedia.com" },
        }) }}
      />
      <title>Website Tech Stack Advisor | Free Marketing Tool — Markit Media</title>
      <link rel="canonical" href="https://themarkitmedia.com/en/resources/tech-stack-advisor" />
      <meta name="description" content="Free interactive tool that recommends the right website platform and tech stack based on your business requirements, budget, and technical expertise." />
      {copied ? "Copied" : "Copy Results"}
    </button>
  );
}

function DownloadButton({
  text,
  filename,
}: {
  text: string;
  filename: string;
}) {
  const download = useCallback(() => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }, [text, filename]);

  return (
    <button
      onClick={download}
      aria-label="Download results as text file"
      className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center px-5 py-3 text-base font-bold bg-black text-white hover:bg-gray-900 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
    >
      Download as Text
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */



export default function TechStackAdvisorPage() {
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [multiAnswers, setMultiAnswers] = useState<MultiAnswerMap>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const totalSteps = steps.length;
  const step = steps[currentStep];

  const isStepAnswered = (s: QuizStep): boolean => {
    if (s.type === "multi") {
      return (multiAnswers[s.id] || []).length > 0;
    }
    return answers[s.id] !== undefined;
  };

  const currentAnswered = isStepAnswered(step);
  const allAnswered = steps.every((s) => isStepAnswered(s));
  const answeredCount = steps.filter((s) => isStepAnswered(s)).length;

  function handleSingleSelect(value: string) {
    setAnswers((prev) => ({ ...prev, [step.id]: value }));
  }

  function handleMultiToggle(value: string) {
    setMultiAnswers((prev) => {
      const current = prev[step.id] || [];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [step.id]: next };
    });
  }

  function handleNext() {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function handlePrev() {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function handleSubmit() {
    if (allAnswered) {
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function handleReset() {
    setAnswers({});
    setMultiAnswers({});
    setSubmitted(false);
    setCurrentStep(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const results = submitted ? buildResults(answers, multiAnswers) : null;
  const plainText = results ? formatResultsText(results) : "";

  return (
    <article className="min-h-screen">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Website Tech Stack Advisor",
          description:
            "Free interactive tool that recommends the right website platform and tech stack based on your business requirements, budget, and technical expertise.",
          applicationCategory: "DeveloperApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />

      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Tech Stack Advisor" },
        ]}
      />

      {/* ---- Hero ---- */}
      <section aria-label="Free Tool" className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Website Tech Stack Advisor
            </h1>
            <SectionDesc>
              Answer 8 quick questions about your project and get a
              personalized recommendation for the best website platform, tech
              stack, hosting, budget estimate, and a side-by-side comparison
              of your top options.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {!submitted ? (
        <>
          {/* ---- Progress Indicator ---- */}
          <section aria-label="Content section" className="px-6 lg:px-12 pb-6">
            <div className="max-w-3xl mx-auto">
              <Animate animation="fade-up">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-base font-bold text-black">
                    Question {currentStep + 1} of {totalSteps}
                  </p>
                  <p className="text-base text-gray-500">
                    {answeredCount} / {totalSteps} answered
                  </p>
                </div>
                <div className="w-full bg-gray-200 h-2">
                  <div
                    className="bg-black h-2 transition-all motion-reduce:transition-none"
                    style={{
                      width: `${(answeredCount / totalSteps) * 100}%`,
                    }}
                  />
                </div>

                {/* Step nav pills */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {steps.map((s, i) => {
                    const stepAnswered = isStepAnswered(s);
                    return (
                      <button
                        key={s.id}
                        onClick={() => setCurrentStep(i)}
                        className={`min-h-[44px] px-4 py-2 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                          i === currentStep
                            ? "bg-black text-white"
                            : stepAnswered
                              ? "bg-gray-800 text-white"
                              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                        }`}
                      >
                        {i + 1}
                      </button>
                    );
                  })}
                </div>
              </Animate>
            </div>
          </section>

          {/* ---- Current Question ---- */}
          <section
            className="px-6 lg:px-12 py-8"
            aria-label="Quiz question"
          >
            <div className="max-w-3xl mx-auto">
              <Animate animation="fade-up" key={step.id}>
                <div className="border border-gray-200 mb-8">
                  <div className="bg-black text-white px-6 py-5">
                    <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.25rem,3vw,1.5rem)] font-extrabold">
                      {step.question}
                    </h2>
                    {step.type === "multi" && (
                      <p className="text-base text-gray-400 mt-1">
                        Select all that apply
                      </p>
                    )}
                  </div>

                  <div className="p-6">
                    {step.type === "single" ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {step.options.map((opt) => (
                          <button
                            key={opt.value}
                            onClick={() => handleSingleSelect(opt.value)}
                            className={`min-h-[44px] px-5 py-4 text-base text-left font-bold transition-all duration-300 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                              answers[step.id] === opt.value
                                ? "bg-black text-white"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:shadow-lg hover:-translate-y-1"
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {step.options.map((opt) => {
                          const checked = (
                            multiAnswers[step.id] || []
                          ).includes(opt.value);
                          return (
                            <label
                              key={opt.value}
                              className={`min-h-[44px] px-5 py-4 text-base text-left font-bold transition-all duration-300 motion-reduce:transition-none cursor-pointer flex items-center gap-3 focus-within:outline-2 focus-within:outline-black focus-within:outline-offset-2 ${
                                checked
                                  ? "bg-black text-white"
                                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:shadow-lg hover:-translate-y-1"
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => handleMultiToggle(opt.value)}
                                className="w-5 h-5 accent-black flex-shrink-0 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                              />
                              <span>{opt.label}</span>
                            </label>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </Animate>

              {/* Navigation buttons */}
              <div className="flex items-center justify-between gap-4">
                <button
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                  className={`min-h-[44px] px-8 py-4 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                    currentStep === 0
                      ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                      : "border-2 border-black text-black hover:bg-black hover:text-white"
                  }`}
                >
                  &larr; Previous
                </button>

                {currentStep < totalSteps - 1 ? (
                  <button
                    onClick={handleNext}
                    disabled={!currentAnswered}
                    className={`min-h-[44px] px-8 py-4 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                      currentAnswered
                        ? "bg-black text-white hover:bg-gray-800"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Next &rarr;
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={!allAnswered}
                    className={`min-h-[44px] px-10 py-4 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                      allAnswered
                        ? "bg-black text-white hover:bg-gray-800"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    See My Results &rarr;
                  </button>
                )}
              </div>

              {!allAnswered && currentStep === totalSteps - 1 && (
                <p className="text-base text-gray-400 text-center mt-4">
                  Answer all {totalSteps} questions to see your results
                </p>
              )}
            </div>
          </section>
        </>
      ) : results ? (
        <>
          {/* ---- Results ---- */}
          <section
            className="px-6 lg:px-12 py-8"
            aria-label="Tech stack recommendations"
          >
            <div className="max-w-3xl mx-auto">
              {/* ---- Primary Recommendation ---- */}
              <Animate animation="fade-up">
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-6">
                  Primary Recommendation
                </h2>
              </Animate>

              <Animate animation="fade-up">
                <div className="border border-gray-200 mb-12">
                  <div className="bg-black text-white px-6 py-5">
                    <p className="text-base text-gray-400 mb-1">
                      Best match for your requirements
                    </p>
                    <p className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold">
                      {results.primary.name}
                    </p>
                  </div>
                  <div className="p-6 space-y-5">
                    <div>
                      <p className="text-base font-bold text-black mb-1">
                        Why It Fits
                      </p>
                      <p className="text-base text-gray-600">
                        {results.primary.whyItFits}
                      </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-base font-bold text-black mb-1">
                          Estimated Build Time
                        </p>
                        <p className="text-base text-gray-600">
                          {results.primary.buildTime}
                        </p>
                      </div>
                      <div>
                        <p className="text-base font-bold text-black mb-1">
                          Maintenance Level
                        </p>
                        <p className="text-base text-gray-600">
                          {results.primary.maintenanceLevel}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Animate>

              {/* ---- Alternative Option ---- */}
              <Animate animation="fade-up">
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-6">
                  Alternative Option
                </h2>
              </Animate>

              <Animate animation="fade-up">
                <div className="border border-gray-200 p-6 mb-12">
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">
                    {results.alternative.name}
                  </h3>
                  <p className="text-base text-gray-600">
                    {results.alternative.comparison}
                  </p>
                </div>
              </Animate>

              {/* ---- Recommended Hosting ---- */}
              <Animate animation="fade-up">
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-6">
                  Recommended Hosting
                </h2>
              </Animate>

              <Animate animation="fade-up">
                <div className="border border-gray-200 p-6 mb-12">
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">
                    {results.hosting.provider}
                  </h3>
                  <p className="text-base text-gray-600">
                    {results.hosting.reasoning}
                  </p>
                </div>
              </Animate>

              {/* ---- Tech Stack Breakdown ---- */}
              <Animate animation="fade-up">
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-2">
                  Tech Stack Breakdown
                </h2>
                <p className="text-base text-gray-500 mb-6">
                  The building blocks of your recommended stack.
                </p>
              </Animate>

              <Animate animation="fade-up">
                <div className="border border-gray-200 mb-12">
                  <div className="divide-y divide-gray-200">
                    {[
                      { label: "Frontend", value: results.breakdown.frontend },
                      { label: "Backend", value: results.breakdown.backend },
                      { label: "CMS", value: results.breakdown.cms },
                      { label: "Hosting", value: results.breakdown.hosting },
                    ].map((row) => (
                      <div
                        key={row.label}
                        className="flex flex-col sm:flex-row sm:items-center px-6 py-4 gap-1 sm:gap-4"
                      >
                        <p className="text-base font-bold text-black min-w-[120px]">
                          {row.label}
                        </p>
                        <p className="text-base text-gray-600">{row.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 px-6 py-4">
                    <p className="text-base font-bold text-black mb-3">
                      Key Tools and Plugins
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {results.breakdown.keyTools.map((tool) => (
                        <span
                          key={tool}
                          className="inline-block px-3 py-2 text-base bg-gray-100 text-black font-bold"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Animate>

              {/* ---- Budget Estimate ---- */}
              <Animate animation="fade-up">
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-6">
                  Budget Estimate
                </h2>
              </Animate>

              <Animate animation="fade-up">
                <div className="border border-gray-200 mb-12">
                  <div className="bg-black text-white px-6 py-5 text-center">
                    <p className="text-base text-gray-400 mb-1">
                      Estimated project cost
                    </p>
                    <p className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold">
                      {results.budgetRange}
                    </p>
                  </div>
                  <div className="px-6 py-4">
                    <p className="text-base text-gray-500">
                      This estimate covers design, development, and initial
                      launch. Ongoing costs such as hosting, maintenance, and
                      content updates are additional.
                    </p>
                  </div>
                </div>
              </Animate>

              {/* ---- Comparison Table ---- */}
              <Animate animation="fade-up">
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-2">
                  Side-by-Side Comparison
                </h2>
                <p className="text-base text-gray-500 mb-6">
                  Your top 3 options compared across key factors.
                </p>
              </Animate>

              <Animate animation="fade-up">
                <div className="border border-gray-200 mb-12 overflow-x-auto">
                  <table className="w-full text-left text-base">
                    <thead>
                      <tr className="bg-black text-white">
                        <th className="px-4 py-4 font-extrabold font-[family-name:var(--font-display)]">
                          Factor
                        </th>
                        {results.comparison.map((row) => (
                          <th
                            key={row.name}
                            className="px-4 py-4 font-extrabold font-[family-name:var(--font-display)]"
                          >
                            {row.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-4 font-bold text-black">
                          Best For
                        </td>
                        {results.comparison.map((row) => (
                          <td
                            key={row.name}
                            className="px-4 py-4 text-gray-600"
                          >
                            {row.bestFor}
                          </td>
                        ))}
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-4 py-4 font-bold text-black">
                          Build Time
                        </td>
                        {results.comparison.map((row) => (
                          <td
                            key={row.name}
                            className="px-4 py-4 text-gray-600"
                          >
                            {row.buildTime}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="px-4 py-4 font-bold text-black">
                          Maintenance
                        </td>
                        {results.comparison.map((row) => (
                          <td
                            key={row.name}
                            className="px-4 py-4 text-gray-600"
                          >
                            {row.maintenanceLevel}
                          </td>
                        ))}
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-4 py-4 font-bold text-black">
                          Budget Range
                        </td>
                        {results.comparison.map((row) => (
                          <td
                            key={row.name}
                            className="px-4 py-4 text-gray-600"
                          >
                            {row.budgetRange}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="px-4 py-4 font-bold text-black">
                          Match Score
                        </td>
                        {results.comparison.map((row) => (
                          <td
                            key={row.name}
                            className="px-4 py-4 font-bold text-black"
                          >
                            {row.score} pts
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Animate>

              {/* ---- Pros and Cons ---- */}
              <Animate animation="fade-up">
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-2">
                  Pros and Cons
                </h2>
                <p className="text-base text-gray-500 mb-6">
                  Key advantages and trade-offs for each recommended option.
                </p>
              </Animate>

              <Stagger stagger={100} className="space-y-6 mb-12">
                {results.comparison.map((row, i) => (
                  <div key={row.name} className="border border-gray-200">
                    <div
                      className={`px-6 py-4 ${i === 0 ? "bg-black text-white" : "bg-gray-100 text-black"}`}
                    >
                      <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold">
                        {i === 0 ? "Top Pick: " : ""}
                        {row.name}
                      </h3>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-base font-bold text-black mb-3">
                          Pros
                        </p>
                        <ul className="space-y-2">
                          {row.pros.map((pro) => (
                            <li
                              key={pro}
                              className="flex items-start gap-2 text-base text-gray-600"
                            >
                              <span
                                className="text-black font-bold mt-0.5 flex-shrink-0"
                                aria-hidden="true"
                              >
                                +
                              </span>
                              <span>{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-base font-bold text-black mb-3">
                          Cons
                        </p>
                        <ul className="space-y-2">
                          {row.cons.map((con) => (
                            <li
                              key={con}
                              className="flex items-start gap-2 text-base text-gray-600"
                            >
                              <span
                                className="text-gray-400 font-bold mt-0.5 flex-shrink-0"
                                aria-hidden="true"
                              >
                                &ndash;
                              </span>
                              <span>{con}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </Stagger>

              {/* ---- Actions ---- */}
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <CopyButton text={plainText} />
                <DownloadButton
                  text={plainText}
                  filename="tech-stack-advisor-results.txt"
                />
                <button
                  onClick={handleReset}
                  className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center px-5 py-3 text-base font-bold border-2 border-black text-black hover:bg-black hover:text-white transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  Start Over
                </button>
              </div>
            </div>
          </section>
        </>
      ) : null}

      {/* ---- CTA ---- */}
      <section aria-label="Call to action" className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Need Help Building Your Website?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Our team designs and builds websites on the platforms recommended
              above. Let us turn this recommendation into a production-ready
              site.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              Get a Free Consultation &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    
      <ToolCTA
        toolName="Tech Stack Advisor"
        services={[
          { title: "Digital Marketing", desc: "Full-service digital marketing strategy for measurable business growth.", href: "/services/digital-marketing" },
          { title: "SEO", desc: "Organic search strategies that deliver compounding traffic over time.", href: "/services/seo" },
          { title: "Performance Marketing", desc: "Paid campaigns optimized for maximum return on ad spend.", href: "/services/performance-marketing" },
        ]}
        relatedTools={[
          { title: "Startup Marketing Guide", href: "/resources/startup-marketing-guide" },
          { title: "Team Capacity Planner", href: "/resources/team-capacity-planner" },
          { title: "Utm Builder", href: "/resources/utm-builder" },
          { title: "Vendor Evaluation", href: "/resources/vendor-evaluation" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
