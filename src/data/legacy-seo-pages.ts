export type LegacySeoKind = "article" | "service" | "industry";

export interface LegacySeoPage {
  id: string;
  path: string;
  slug: string;
  title: string;
  kind: LegacySeoKind;
  relatedHref: string;
  clicks: number;
  impressions: number;
  position: number;
}

/**
 * Search Console-backed legacy URL registry.
 *
 * Inclusion rule at generation time:
 * - legacy content URL outside /en
 * - at least 1 click in the last year OR at least 100 impressions
 * - excludes navigational duplicates, PDFs, WordPress taxonomy URLs,
 *   portfolio aliases with clear modern case-study equivalents, and political campaign pages
 *
 * These URLs are served as real indexable pages at their original public paths
 * through beforeFiles rewrites. Metrics are retained only for migration priority.
 */
export const legacySeoPages: LegacySeoPage[] = [
  {
    "id": "22-best-augmented-reality-games-you-must-try",
    "path": "/22-best-augmented-reality-games-you-must-try",
    "slug": "22-best-augmented-reality-games-you-must-try",
    "title": "22 Best Augmented Reality Games You Must Try",
    "kind": "article",
    "relatedHref": "/blog",
    "clicks": 183,
    "impressions": 22143,
    "position": 11.6575
  },
  {
    "id": "social-media-phone-vs-desktop-use",
    "path": "/social-media-phone-vs-desktop-use",
    "slug": "social-media-phone-vs-desktop-use",
    "title": "Social Media Phone vs Desktop Use",
    "kind": "article",
    "relatedHref": "/services/social-media",
    "clicks": 95,
    "impressions": 17045,
    "position": 7.5326
  },
  {
    "id": "top-web-design-companies-in-the-usa",
    "path": "/top-web-design-companies-in-the-usa",
    "slug": "top-web-design-companies-in-the-usa",
    "title": "Top Web Design Companies in the USA",
    "kind": "article",
    "relatedHref": "/services/website-development",
    "clicks": 80,
    "impressions": 31214,
    "position": 30.6178
  },
  {
    "id": "service-meta-ads-facebook-ads",
    "path": "/service-meta-ads-facebook-ads",
    "slug": "service-meta-ads-facebook-ads",
    "title": "Meta Ads Facebook Ads",
    "kind": "service",
    "relatedHref": "/services/performance-marketing/meta-ads",
    "clicks": 63,
    "impressions": 8559,
    "position": 23.3072
  },
  {
    "id": "best-personal-website-examples-to-inspire-your-own-brand",
    "path": "/best-personal-website-examples-to-inspire-your-own-brand",
    "slug": "best-personal-website-examples-to-inspire-your-own-brand",
    "title": "Best Personal Website Examples to Inspire Your Own Brand",
    "kind": "article",
    "relatedHref": "/services/website-development",
    "clicks": 49,
    "impressions": 17993,
    "position": 34.8296
  },
  {
    "id": "top-web-development-companies-in-the-usa",
    "path": "/top-web-development-companies-in-the-usa",
    "slug": "top-web-development-companies-in-the-usa",
    "title": "Top Web Development Companies in the USA",
    "kind": "article",
    "relatedHref": "/services/website-development",
    "clicks": 44,
    "impressions": 13854,
    "position": 21.1397
  },
  {
    "id": "service-video-editing",
    "path": "/service-video-editing",
    "slug": "service-video-editing",
    "title": "Video Editing",
    "kind": "service",
    "relatedHref": "/services/video-production/video-editing",
    "clicks": 28,
    "impressions": 576,
    "position": 16.5312
  },
  {
    "id": "service-youtube-thumbnail-design",
    "path": "/service-youtube-thumbnail-design",
    "slug": "service-youtube-thumbnail-design",
    "title": "YouTube Thumbnail Design",
    "kind": "service",
    "relatedHref": "/services/social-media/content-creation",
    "clicks": 25,
    "impressions": 2654,
    "position": 12.4518
  },
  {
    "id": "best-animation-software-for-creators-and-professionals",
    "path": "/best-animation-software-for-creators-and-professionals",
    "slug": "best-animation-software-for-creators-and-professionals",
    "title": "Best Animation Software for Creators and Professionals",
    "kind": "article",
    "relatedHref": "/services/video-production",
    "clicks": 20,
    "impressions": 37603,
    "position": 22.6741
  },
  {
    "id": "service-company-profile-design",
    "path": "/service-company-profile-design",
    "slug": "service-company-profile-design",
    "title": "Company Profile Design",
    "kind": "service",
    "relatedHref": "/services/branding/brand-guidelines",
    "clicks": 20,
    "impressions": 3819,
    "position": 10.9832
  },
  {
    "id": "steps-to-create-a-digital-marketing-agency-website",
    "path": "/steps-to-create-a-digital-marketing-agency-website",
    "slug": "steps-to-create-a-digital-marketing-agency-website",
    "title": "Steps to Create a Digital Marketing Agency Website",
    "kind": "article",
    "relatedHref": "/services/website-development",
    "clicks": 16,
    "impressions": 1819,
    "position": 10.5723
  },
  {
    "id": "how-much-does-website-development-cost-in-the-usa",
    "path": "/how-much-does-website-development-cost-in-the-usa",
    "slug": "how-much-does-website-development-cost-in-the-usa",
    "title": "How Much Does Website Development Cost in the USA",
    "kind": "article",
    "relatedHref": "/services/website-development",
    "clicks": 13,
    "impressions": 8882,
    "position": 32.8411
  },
  {
    "id": "blog-top-10-tools-for-social-media-management-2025",
    "path": "/blog-top-10-tools-for-social-media-management-2025",
    "slug": "blog-top-10-tools-for-social-media-management-2025",
    "title": "Top 10 Tools for Social Media Management 2025",
    "kind": "article",
    "relatedHref": "/services/social-media",
    "clicks": 12,
    "impressions": 2037,
    "position": 11.0943
  },
  {
    "id": "service-graphic-design",
    "path": "/service-graphic-design",
    "slug": "service-graphic-design",
    "title": "Graphic Design",
    "kind": "service",
    "relatedHref": "/services/branding",
    "clicks": 12,
    "impressions": 938,
    "position": 9.4691
  },
  {
    "id": "top-10-plugins-for-wordpress-seo-optimization",
    "path": "/top-10-plugins-for-wordpress-seo-optimization",
    "slug": "top-10-plugins-for-wordpress-seo-optimization",
    "title": "Top 10 Plugins for WordPress SEO Optimization",
    "kind": "article",
    "relatedHref": "/services/seo",
    "clicks": 11,
    "impressions": 9922,
    "position": 36.6393
  },
  {
    "id": "service-wordmark-logo-designs",
    "path": "/service-wordmark-logo-designs",
    "slug": "service-wordmark-logo-designs",
    "title": "Wordmark Logo Design",
    "kind": "service",
    "relatedHref": "/services/branding/logo-design",
    "clicks": 11,
    "impressions": 3166,
    "position": 14.0376
  },
  {
    "id": "service-post-production",
    "path": "/service-post-production",
    "slug": "service-post-production",
    "title": "Post Production",
    "kind": "service",
    "relatedHref": "/services/video-production/video-editing",
    "clicks": 10,
    "impressions": 570,
    "position": 21.9491
  },
  {
    "id": "service-shopify",
    "path": "/service-shopify",
    "slug": "service-shopify",
    "title": "Shopify",
    "kind": "service",
    "relatedHref": "/services/website-development/shopify",
    "clicks": 10,
    "impressions": 529,
    "position": 31.6522
  },
  {
    "id": "serivce-combination-mark-logo-designs",
    "path": "/serivce-combination-mark-logo-designs",
    "slug": "serivce-combination-mark-logo-designs",
    "title": "Combination Mark Logo Designs",
    "kind": "article",
    "relatedHref": "/services/branding",
    "clicks": 9,
    "impressions": 5654,
    "position": 18.7975
  },
  {
    "id": "using-influencer-marketing-to-complement-your-digital-strategy",
    "path": "/using-influencer-marketing-to-complement-your-digital-strategy",
    "slug": "using-influencer-marketing-to-complement-your-digital-strategy",
    "title": "Using Influencer Marketing to Complement Your Digital Strategy",
    "kind": "article",
    "relatedHref": "/services/social-media",
    "clicks": 8,
    "impressions": 5460,
    "position": 29.1668
  },
  {
    "id": "how-accurate-is-semrush-data-and-how-often-is-its-database-updated",
    "path": "/how-accurate-is-semrush-data-and-how-often-is-its-database-updated",
    "slug": "how-accurate-is-semrush-data-and-how-often-is-its-database-updated",
    "title": "How Accurate Is Semrush Data and How Often Is Its Database Updated",
    "kind": "article",
    "relatedHref": "/blog",
    "clicks": 7,
    "impressions": 5788,
    "position": 9.4
  },
  {
    "id": "service-dynamic-logo-designs",
    "path": "/service-dynamic-logo-designs",
    "slug": "service-dynamic-logo-designs",
    "title": "Dynamic Logo Design",
    "kind": "service",
    "relatedHref": "/services/branding/logo-design",
    "clicks": 7,
    "impressions": 3834,
    "position": 16.3383
  },
  {
    "id": "beginners-guide-to-website-development",
    "path": "/beginners-guide-to-website-development",
    "slug": "beginners-guide-to-website-development",
    "title": "Beginners Guide to Website Development",
    "kind": "article",
    "relatedHref": "/services/website-development",
    "clicks": 6,
    "impressions": 23980,
    "position": 30.0129
  },
  {
    "id": "best-practices-for-choosing-a-domain-name-in-2025",
    "path": "/best-practices-for-choosing-a-domain-name-in-2025",
    "slug": "best-practices-for-choosing-a-domain-name-in-2025",
    "title": "Best Practices for Choosing a Domain Name in 2025",
    "kind": "article",
    "relatedHref": "/services/website-development",
    "clicks": 6,
    "impressions": 8640,
    "position": 7.2578
  },
  {
    "id": "social-impact-of-ai-how-artificial-intelligence-is-transforming-society",
    "path": "/social-impact-of-ai-how-artificial-intelligence-is-transforming-society",
    "slug": "social-impact-of-ai-how-artificial-intelligence-is-transforming-society",
    "title": "Social Impact of AI How Artificial Intelligence Is Transforming Society",
    "kind": "article",
    "relatedHref": "/blog",
    "clicks": 6,
    "impressions": 1852,
    "position": 35.0902
  },
  {
    "id": "service-cloudflare-consultancy",
    "path": "/service-cloudflare-consultancy",
    "slug": "service-cloudflare-consultancy",
    "title": "Cloudflare Consultancy",
    "kind": "service",
    "relatedHref": "/services/website-development/website-migration",
    "clicks": 6,
    "impressions": 1590,
    "position": 56.1377
  },
  {
    "id": "service-next-js",
    "path": "/service-next-js",
    "slug": "service-next-js",
    "title": "Next.js",
    "kind": "service",
    "relatedHref": "/services/website-development/nextjs",
    "clicks": 6,
    "impressions": 500,
    "position": 15.458
  },
  {
    "id": "service-reel-production",
    "path": "/service-reel-production",
    "slug": "service-reel-production",
    "title": "Reel Production",
    "kind": "service",
    "relatedHref": "/services/video-production/reels-short-form",
    "clicks": 6,
    "impressions": 446,
    "position": 18.8587
  },
  {
    "id": "common-digital-marketing-mistakes-brands-need-to-avoid",
    "path": "/common-digital-marketing-mistakes-brands-need-to-avoid",
    "slug": "common-digital-marketing-mistakes-brands-need-to-avoid",
    "title": "Common Digital Marketing Mistakes Brands Need to Avoid",
    "kind": "article",
    "relatedHref": "/services/branding",
    "clicks": 5,
    "impressions": 5286,
    "position": 33.667
  },
  {
    "id": "service-pictorial-mark-logo-designs",
    "path": "/service-pictorial-mark-logo-designs",
    "slug": "service-pictorial-mark-logo-designs",
    "title": "Pictorial Mark Logo Design",
    "kind": "service",
    "relatedHref": "/services/branding/logo-design",
    "clicks": 5,
    "impressions": 2437,
    "position": 19.2097
  },
  {
    "id": "service-mascot-logo-designs",
    "path": "/service-mascot-logo-designs",
    "slug": "service-mascot-logo-designs",
    "title": "Mascot Logo Design",
    "kind": "service",
    "relatedHref": "/services/branding/logo-design",
    "clicks": 5,
    "impressions": 2038,
    "position": 21.1654
  },
  {
    "id": "service-logo-animation",
    "path": "/service-logo-animation",
    "slug": "service-logo-animation",
    "title": "Logo Animation",
    "kind": "service",
    "relatedHref": "/services/video-production/animation",
    "clicks": 5,
    "impressions": 942,
    "position": 38.0955
  },
  {
    "id": "service-website-development",
    "path": "/service-website-development",
    "slug": "service-website-development",
    "title": "Website Development",
    "kind": "service",
    "relatedHref": "/services/website-development",
    "clicks": 5,
    "impressions": 654,
    "position": 9.8287
  },
  {
    "id": "pagination-vs-infinite-scroll-which-is-best-for-your-website",
    "path": "/pagination-vs-infinite-scroll-which-is-best-for-your-website",
    "slug": "pagination-vs-infinite-scroll-which-is-best-for-your-website",
    "title": "Pagination vs Infinite Scroll Which Is Best for Your Website",
    "kind": "article",
    "relatedHref": "/services/website-development",
    "clicks": 5,
    "impressions": 522,
    "position": 13.1015
  },
  {
    "id": "clothing-brands-online-digital-marketing-agency",
    "path": "/clothing-brands-online-digital-marketing-agency",
    "slug": "clothing-brands-online-digital-marketing-agency",
    "title": "Digital Marketing for Clothing Brands",
    "kind": "industry",
    "relatedHref": "/industries/fashion",
    "clicks": 5,
    "impressions": 172,
    "position": 13.4826
  },
  {
    "id": "how-to-create-a-winning-seo-strategy-for-a-new-website",
    "path": "/how-to-create-a-winning-seo-strategy-for-a-new-website",
    "slug": "how-to-create-a-winning-seo-strategy-for-a-new-website",
    "title": "How to Create a Winning SEO Strategy for a New Website",
    "kind": "article",
    "relatedHref": "/services/seo",
    "clicks": 4,
    "impressions": 29400,
    "position": 37.5205
  },
  {
    "id": "service-abstract-mark-logo-designs",
    "path": "/service-abstract-mark-logo-designs",
    "slug": "service-abstract-mark-logo-designs",
    "title": "Abstract Mark Logo Design",
    "kind": "service",
    "relatedHref": "/services/branding/logo-design",
    "clicks": 4,
    "impressions": 3420,
    "position": 11.3281
  },
  {
    "id": "blogs--5-wordpress-plugins-to-help-with-digital-marketing-efforts",
    "path": "/blogs/5-wordpress-plugins-to-help-with-digital-marketing-efforts",
    "slug": "5-wordpress-plugins-to-help-with-digital-marketing-efforts",
    "title": "5 WordPress Plugins to Help with Digital Marketing Efforts",
    "kind": "article",
    "relatedHref": "/services/website-development",
    "clicks": 4,
    "impressions": 3276,
    "position": 22.8843
  },
  {
    "id": "service-tiktok-ads",
    "path": "/service-tiktok-ads",
    "slug": "service-tiktok-ads",
    "title": "TikTok Ads",
    "kind": "service",
    "relatedHref": "/services/performance-marketing/tiktok-ads",
    "clicks": 4,
    "impressions": 1280,
    "position": 45.5711
  },
  {
    "id": "service-reel-edit",
    "path": "/service-reel-edit",
    "slug": "service-reel-edit",
    "title": "Reel Edit",
    "kind": "service",
    "relatedHref": "/services/video-production/reels-short-form",
    "clicks": 4,
    "impressions": 1147,
    "position": 8.8221
  },
  {
    "id": "service-lettermark-logo-designs",
    "path": "/service-lettermark-logo-designs",
    "slug": "service-lettermark-logo-designs",
    "title": "Lettermark Logo Design",
    "kind": "service",
    "relatedHref": "/services/branding/logo-design",
    "clicks": 4,
    "impressions": 824,
    "position": 12.7342
  },
  {
    "id": "service-youtube-channel-optimization",
    "path": "/service-youtube-channel-optimization",
    "slug": "service-youtube-channel-optimization",
    "title": "YouTube Channel Optimization",
    "kind": "service",
    "relatedHref": "/services/social-media",
    "clicks": 4,
    "impressions": 695,
    "position": 21.0647
  },
  {
    "id": "how-to-use-reddit-for-seo-in-2026-complete-guide",
    "path": "/how-to-use-reddit-for-seo-in-2026-complete-guide",
    "slug": "how-to-use-reddit-for-seo-in-2026-complete-guide",
    "title": "How to Use Reddit for SEO in 2026 Complete Guide",
    "kind": "article",
    "relatedHref": "/services/seo",
    "clicks": 4,
    "impressions": 386,
    "position": 19.3161
  },
  {
    "id": "kitchen-home-appliances-online-digital-marketing-agency",
    "path": "/kitchen-home-appliances-online-digital-marketing-agency",
    "slug": "kitchen-home-appliances-online-digital-marketing-agency",
    "title": "Digital Marketing for Kitchen Home Appliances",
    "kind": "industry",
    "relatedHref": "/industries/ecommerce",
    "clicks": 4,
    "impressions": 385,
    "position": 14.0468
  },
  {
    "id": "service-off-page-seo",
    "path": "/service-off-page-seo",
    "slug": "service-off-page-seo",
    "title": "Off Page SEO",
    "kind": "service",
    "relatedHref": "/services/seo/link-building",
    "clicks": 4,
    "impressions": 289,
    "position": 40.0069
  },
  {
    "id": "service-website-development--rapid-web-design",
    "path": "/service-website-development/rapid-web-design",
    "slug": "rapid-web-design",
    "title": "Rapid Web Design",
    "kind": "service",
    "relatedHref": "/services/website-development/landing-pages",
    "clicks": 3,
    "impressions": 6798,
    "position": 8.3069
  },
  {
    "id": "the-cost-of-social-media-marketing-in-us-2026-guide",
    "path": "/the-cost-of-social-media-marketing-in-us-2026-guide",
    "slug": "the-cost-of-social-media-marketing-in-us-2026-guide",
    "title": "The Cost of Social Media Marketing in US 2026 Guide",
    "kind": "article",
    "relatedHref": "/services/social-media",
    "clicks": 3,
    "impressions": 2792,
    "position": 7.1744
  },
  {
    "id": "service-website-development--website-redesign",
    "path": "/service-website-development/website-redesign",
    "slug": "website-redesign",
    "title": "Website Redesign",
    "kind": "service",
    "relatedHref": "/services/website-development",
    "clicks": 3,
    "impressions": 792,
    "position": 17.9369
  },
  {
    "id": "how-to-optimize-images-for-faster-loading-times-in-wordpress",
    "path": "/how-to-optimize-images-for-faster-loading-times-in-wordpress",
    "slug": "how-to-optimize-images-for-faster-loading-times-in-wordpress",
    "title": "How to Optimize Images for Faster Loading Times in WordPress",
    "kind": "article",
    "relatedHref": "/services/website-development",
    "clicks": 3,
    "impressions": 759,
    "position": 9.6495
  },
  {
    "id": "service-emblematic-letter-logo-designs",
    "path": "/service-emblematic-letter-logo-designs",
    "slug": "service-emblematic-letter-logo-designs",
    "title": "Emblematic Letter Logo Design",
    "kind": "service",
    "relatedHref": "/services/branding/logo-design",
    "clicks": 3,
    "impressions": 722,
    "position": 13.0429
  },
  {
    "id": "service-symbol-logo-designs",
    "path": "/service-symbol-logo-designs",
    "slug": "service-symbol-logo-designs",
    "title": "Symbol Logo Design",
    "kind": "service",
    "relatedHref": "/services/branding/logo-design",
    "clicks": 3,
    "impressions": 706,
    "position": 16.1473
  },
  {
    "id": "logo-design-trends-2026-fresh-inspiration-for-your-brand",
    "path": "/logo-design-trends-2026-fresh-inspiration-for-your-brand",
    "slug": "logo-design-trends-2026-fresh-inspiration-for-your-brand",
    "title": "Logo Design Trends 2026 Fresh Inspiration for Your Brand",
    "kind": "article",
    "relatedHref": "/services/branding",
    "clicks": 3,
    "impressions": 606,
    "position": 22.9208
  },
  {
    "id": "auto-parts-online-digital-marketing-agency",
    "path": "/auto-parts-online-digital-marketing-agency",
    "slug": "auto-parts-online-digital-marketing-agency",
    "title": "Digital Marketing for Auto Parts",
    "kind": "industry",
    "relatedHref": "/industries/automotive",
    "clicks": 3,
    "impressions": 541,
    "position": 36.6248
  },
  {
    "id": "service-voiceover-video-integration",
    "path": "/service-voiceover-video-integration",
    "slug": "service-voiceover-video-integration",
    "title": "Voiceover Video Integration",
    "kind": "service",
    "relatedHref": "/services/video-production",
    "clicks": 3,
    "impressions": 536,
    "position": 13.4478
  },
  {
    "id": "service-podcast-editing",
    "path": "/service-podcast-editing",
    "slug": "service-podcast-editing",
    "title": "Podcast Editing",
    "kind": "service",
    "relatedHref": "/services/video-production",
    "clicks": 3,
    "impressions": 330,
    "position": 18.097
  },
  {
    "id": "influencer-marketing-vs-ppc-advertising",
    "path": "/influencer-marketing-vs-ppc-advertising",
    "slug": "influencer-marketing-vs-ppc-advertising",
    "title": "Influencer Marketing vs PPC Advertising",
    "kind": "article",
    "relatedHref": "/services/social-media",
    "clicks": 3,
    "impressions": 214,
    "position": 15.8037
  },
  {
    "id": "service-t-shirt-design",
    "path": "/service-t-shirt-design",
    "slug": "service-t-shirt-design",
    "title": "T Shirt Design",
    "kind": "service",
    "relatedHref": "/services/branding",
    "clicks": 3,
    "impressions": 214,
    "position": 16.7757
  },
  {
    "id": "service-shopify-design",
    "path": "/service-shopify-design",
    "slug": "service-shopify-design",
    "title": "Shopify Design",
    "kind": "service",
    "relatedHref": "/services/website-development/shopify",
    "clicks": 2,
    "impressions": 3941,
    "position": 29.8127
  },
  {
    "id": "service-minimalist-logo-designs",
    "path": "/service-minimalist-logo-designs",
    "slug": "service-minimalist-logo-designs",
    "title": "Minimalist Logo Design",
    "kind": "service",
    "relatedHref": "/services/branding/logo-design",
    "clicks": 2,
    "impressions": 3750,
    "position": 12.5123
  },
  {
    "id": "how-to-drive-traffic-to-your-blog-using-social-media",
    "path": "/how-to-drive-traffic-to-your-blog-using-social-media",
    "slug": "how-to-drive-traffic-to-your-blog-using-social-media",
    "title": "How to Drive Traffic to Your Blog Using Social Media",
    "kind": "article",
    "relatedHref": "/services/social-media",
    "clicks": 2,
    "impressions": 1254,
    "position": 15.1635
  },
  {
    "id": "service-wix",
    "path": "/service-wix",
    "slug": "service-wix",
    "title": "Wix",
    "kind": "service",
    "relatedHref": "/services/website-development",
    "clicks": 2,
    "impressions": 810,
    "position": 28.1765
  },
  {
    "id": "10-common-digital-marketing-mistakes-and-how-to-avoid-them",
    "path": "/10-common-digital-marketing-mistakes-and-how-to-avoid-them",
    "slug": "10-common-digital-marketing-mistakes-and-how-to-avoid-them",
    "title": "10 Common Digital Marketing Mistakes and How to Avoid Them",
    "kind": "article",
    "relatedHref": "/blog",
    "clicks": 2,
    "impressions": 805,
    "position": 29.0025
  },
  {
    "id": "service-flyer-standee-design",
    "path": "/service-flyer-standee-design",
    "slug": "service-flyer-standee-design",
    "title": "Flyer Standee Design",
    "kind": "service",
    "relatedHref": "/services/branding",
    "clicks": 2,
    "impressions": 644,
    "position": 9.6475
  },
  {
    "id": "seo-vs-smm-the-digital-marketing-guide-every-brand-needs",
    "path": "/seo-vs-smm-the-digital-marketing-guide-every-brand-needs",
    "slug": "seo-vs-smm-the-digital-marketing-guide-every-brand-needs",
    "title": "SEO vs Smm the Digital Marketing Guide Every Brand Needs",
    "kind": "article",
    "relatedHref": "/services/seo",
    "clicks": 2,
    "impressions": 491,
    "position": 5.2037
  },
  {
    "id": "service-squarespace",
    "path": "/service-squarespace",
    "slug": "service-squarespace",
    "title": "Squarespace",
    "kind": "service",
    "relatedHref": "/services/website-development",
    "clicks": 2,
    "impressions": 375,
    "position": 21.7733
  },
  {
    "id": "website-development-cost-complete-pricing-guide",
    "path": "/website-development-cost-complete-pricing-guide",
    "slug": "website-development-cost-complete-pricing-guide",
    "title": "Website Development Cost Complete Pricing Guide",
    "kind": "article",
    "relatedHref": "/services/website-development",
    "clicks": 2,
    "impressions": 276,
    "position": 49.4891
  },
  {
    "id": "service-visiting-card-design",
    "path": "/service-visiting-card-design",
    "slug": "service-visiting-card-design",
    "title": "Visiting Card Design",
    "kind": "service",
    "relatedHref": "/services/branding",
    "clicks": 2,
    "impressions": 144,
    "position": 18.1736
  },
  {
    "id": "social-media-automation-tools-2025",
    "path": "/social-media-automation-tools-2025",
    "slug": "social-media-automation-tools-2025",
    "title": "Social Media Automation Tools 2025",
    "kind": "article",
    "relatedHref": "/services/social-media",
    "clicks": 2,
    "impressions": 129,
    "position": 8.1473
  },
  {
    "id": "why-every-business-needs-a-website-in-the-digital-age",
    "path": "/why-every-business-needs-a-website-in-the-digital-age",
    "slug": "why-every-business-needs-a-website-in-the-digital-age",
    "title": "Why Every Business Needs a Website in the Digital Age",
    "kind": "article",
    "relatedHref": "/services/website-development",
    "clicks": 2,
    "impressions": 102,
    "position": 8.2157
  },
  {
    "id": "become-the-ultimate-social-media-guru-with-the-power-of-customized-filters-on-facebook-instagram-and-tiktok",
    "path": "/become-the-ultimate-social-media-guru-with-the-power-of-customized-filters-on-facebook-instagram-and-tiktok",
    "slug": "become-the-ultimate-social-media-guru-with-the-power-of-customized-filters-on-facebook-instagram-and-tiktok",
    "title": "Become the Ultimate Social Media Guru with the Power of Customized Filters on Facebook Instagram and TikTok",
    "kind": "article",
    "relatedHref": "/services/performance-marketing/meta-ads",
    "clicks": 2,
    "impressions": 96,
    "position": 6.9583
  },
  {
    "id": "service-instagram-ads",
    "path": "/service-instagram-ads",
    "slug": "service-instagram-ads",
    "title": "Instagram Ads",
    "kind": "service",
    "relatedHref": "/services/performance-marketing/meta-ads",
    "clicks": 1,
    "impressions": 9333,
    "position": 38.7328
  },
  {
    "id": "how-to-integrate-seo-into-your-website-development-workflow",
    "path": "/how-to-integrate-seo-into-your-website-development-workflow",
    "slug": "how-to-integrate-seo-into-your-website-development-workflow",
    "title": "How to Integrate SEO into Your Website Development Workflow",
    "kind": "article",
    "relatedHref": "/services/seo",
    "clicks": 1,
    "impressions": 5771,
    "position": 57.2097
  },
  {
    "id": "service-php-custom",
    "path": "/service-php-custom",
    "slug": "service-php-custom",
    "title": "PHP Custom",
    "kind": "service",
    "relatedHref": "/services/website-development/custom-web-apps",
    "clicks": 1,
    "impressions": 4273,
    "position": 60.682
  },
  {
    "id": "best-practices-for-choosing-a-domain-name-in-2026",
    "path": "/best-practices-for-choosing-a-domain-name-in-2026",
    "slug": "best-practices-for-choosing-a-domain-name-in-2026",
    "title": "Best Practices for Choosing a Domain Name in 2026",
    "kind": "article",
    "relatedHref": "/services/website-development",
    "clicks": 1,
    "impressions": 3183,
    "position": 7.9199
  },
  {
    "id": "service-keywords-research",
    "path": "/service-keywords-research",
    "slug": "service-keywords-research",
    "title": "Keywords Research",
    "kind": "service",
    "relatedHref": "/services/seo/keyword-research",
    "clicks": 1,
    "impressions": 2962,
    "position": 10.5591
  },
  {
    "id": "top-content-management-systems-for-website-development",
    "path": "/top-content-management-systems-for-website-development",
    "slug": "top-content-management-systems-for-website-development",
    "title": "Top Content Management Systems for Website Development",
    "kind": "article",
    "relatedHref": "/services/website-development",
    "clicks": 1,
    "impressions": 2818,
    "position": 30.9652
  },
  {
    "id": "difference-between-graphic-designers-and-graphic-illustrators",
    "path": "/difference-between-graphic-designers-and-graphic-illustrators",
    "slug": "difference-between-graphic-designers-and-graphic-illustrators",
    "title": "Difference Between Graphic Designers and Graphic Illustrators",
    "kind": "article",
    "relatedHref": "/services/branding",
    "clicks": 1,
    "impressions": 2062,
    "position": 36.5092
  },
  {
    "id": "important-google-ranking-factors-in-2025",
    "path": "/important-google-ranking-factors-in-2025",
    "slug": "important-google-ranking-factors-in-2025",
    "title": "Important Google Ranking Factors in 2025",
    "kind": "article",
    "relatedHref": "/blog",
    "clicks": 1,
    "impressions": 1879,
    "position": 26.4822
  },
  {
    "id": "the-ultimate-guide-to-conducting-competitor-analysis-in-digital-marketing",
    "path": "/the-ultimate-guide-to-conducting-competitor-analysis-in-digital-marketing",
    "slug": "the-ultimate-guide-to-conducting-competitor-analysis-in-digital-marketing",
    "title": "The Ultimate Guide to Conducting Competitor Analysis in Digital Marketing",
    "kind": "article",
    "relatedHref": "/blog",
    "clicks": 1,
    "impressions": 1667,
    "position": 61.6059
  },
  {
    "id": "service-website-redirects",
    "path": "/service-website-redirects",
    "slug": "service-website-redirects",
    "title": "Website Redirects",
    "kind": "service",
    "relatedHref": "/services/website-development/seo-migration-redirects",
    "clicks": 1,
    "impressions": 1625,
    "position": 17.6031
  },
  {
    "id": "basics-of-project-management-an-agency-perspective",
    "path": "/basics-of-project-management-an-agency-perspective",
    "slug": "basics-of-project-management-an-agency-perspective",
    "title": "Basics of Project Management an Agency Perspective",
    "kind": "article",
    "relatedHref": "/blog",
    "clicks": 1,
    "impressions": 1546,
    "position": 42.1307
  },
  {
    "id": "service-business-process-outsourcing",
    "path": "/service-business-process-outsourcing",
    "slug": "service-business-process-outsourcing",
    "title": "Business Process Outsourcing",
    "kind": "service",
    "relatedHref": "/services/bpo",
    "clicks": 1,
    "impressions": 1462,
    "position": 22.6409
  },
  {
    "id": "top-advanced-seo-techniques-and-strategies",
    "path": "/top-advanced-seo-techniques-and-strategies",
    "slug": "top-advanced-seo-techniques-and-strategies",
    "title": "Top Advanced SEO Techniques and Strategies",
    "kind": "article",
    "relatedHref": "/services/seo",
    "clicks": 1,
    "impressions": 1382,
    "position": 38.3097
  },
  {
    "id": "service-website-development--ecommerce-website-design",
    "path": "/service-website-development/ecommerce-website-design",
    "slug": "ecommerce-website-design",
    "title": "Ecommerce Website Design",
    "kind": "service",
    "relatedHref": "/services/website-development/ecommerce",
    "clicks": 1,
    "impressions": 1257,
    "position": 50.5362
  },
  {
    "id": "service-shopify-development",
    "path": "/service-shopify-development",
    "slug": "service-shopify-development",
    "title": "Shopify Development",
    "kind": "service",
    "relatedHref": "/services/website-development/shopify",
    "clicks": 1,
    "impressions": 1230,
    "position": 40.9984
  },
  {
    "id": "service-product-packaging-design",
    "path": "/service-product-packaging-design",
    "slug": "service-product-packaging-design",
    "title": "Product Packaging Design",
    "kind": "service",
    "relatedHref": "/services/branding/packaging-design",
    "clicks": 1,
    "impressions": 1096,
    "position": 9.5328
  },
  {
    "id": "exploring-the-best-practices-for-website-redesign-in-2025",
    "path": "/exploring-the-best-practices-for-website-redesign-in-2025",
    "slug": "exploring-the-best-practices-for-website-redesign-in-2025",
    "title": "Exploring the Best Practices for Website Redesign in 2025",
    "kind": "article",
    "relatedHref": "/services/website-development",
    "clicks": 1,
    "impressions": 981,
    "position": 8.7594
  },
  {
    "id": "7-strategies-for-effective-coo-leadership",
    "path": "/7-strategies-for-effective-coo-leadership",
    "slug": "7-strategies-for-effective-coo-leadership",
    "title": "7 Strategies for Effective COO Leadership",
    "kind": "article",
    "relatedHref": "/blog",
    "clicks": 1,
    "impressions": 774,
    "position": 34.7145
  },
  {
    "id": "service-social-media",
    "path": "/service-social-media",
    "slug": "service-social-media",
    "title": "Social Media",
    "kind": "service",
    "relatedHref": "/services/social-media",
    "clicks": 1,
    "impressions": 662,
    "position": 9.284
  },
  {
    "id": "shopify-vs-woocommerce-vs-magento-which-platform-is-best",
    "path": "/shopify-vs-woocommerce-vs-magento-which-platform-is-best",
    "slug": "shopify-vs-woocommerce-vs-magento-which-platform-is-best",
    "title": "Shopify vs WooCommerce vs Magento Which Platform Is Best",
    "kind": "article",
    "relatedHref": "/services/website-development",
    "clicks": 1,
    "impressions": 639,
    "position": 7.5556
  },
  {
    "id": "service-emblem-logo-designs",
    "path": "/service-emblem-logo-designs",
    "slug": "service-emblem-logo-designs",
    "title": "Emblem Logo Design",
    "kind": "service",
    "relatedHref": "/services/branding/logo-design",
    "clicks": 1,
    "impressions": 588,
    "position": 28.4184
  },
  {
    "id": "what-is-full-stack-web-development-a-complete-guide",
    "path": "/what-is-full-stack-web-development-a-complete-guide",
    "slug": "what-is-full-stack-web-development-a-complete-guide",
    "title": "What Is Full Stack Web Development a Complete Guide",
    "kind": "article",
    "relatedHref": "/services/website-development",
    "clicks": 1,
    "impressions": 549,
    "position": 24.2022
  },
  {
    "id": "how-to-track-and-improve-your-return-on-investment-roi",
    "path": "/how-to-track-and-improve-your-return-on-investment-roi",
    "slug": "how-to-track-and-improve-your-return-on-investment-roi",
    "title": "How to Track and Improve Your Return on Investment ROI",
    "kind": "article",
    "relatedHref": "/blog",
    "clicks": 1,
    "impressions": 483,
    "position": 25.8841
  },
  {
    "id": "blog-top-10-tools-for-social-media-management-2026",
    "path": "/blog-top-10-tools-for-social-media-management-2026",
    "slug": "blog-top-10-tools-for-social-media-management-2026",
    "title": "Top 10 Tools for Social Media Management 2026",
    "kind": "article",
    "relatedHref": "/services/social-media",
    "clicks": 1,
    "impressions": 438,
    "position": 16.1484
  },
  {
    "id": "service-email-support",
    "path": "/service-email-support",
    "slug": "service-email-support",
    "title": "Email Support",
    "kind": "service",
    "relatedHref": "/services/bpo/customer-support",
    "clicks": 1,
    "impressions": 419,
    "position": 34.0573
  },
  {
    "id": "digital-marketing-vs-online-marketing-understanding-the-key-differences",
    "path": "/digital-marketing-vs-online-marketing-understanding-the-key-differences",
    "slug": "digital-marketing-vs-online-marketing-understanding-the-key-differences",
    "title": "Digital Marketing vs Online Marketing Understanding the Key Differences",
    "kind": "article",
    "relatedHref": "/blog",
    "clicks": 1,
    "impressions": 417,
    "position": 19.2782
  },
  {
    "id": "sports-fitness-online-digital-marketing-agency",
    "path": "/sports-fitness-online-digital-marketing-agency",
    "slug": "sports-fitness-online-digital-marketing-agency",
    "title": "Digital Marketing for Sports Fitness",
    "kind": "industry",
    "relatedHref": "/industries/fitness",
    "clicks": 1,
    "impressions": 391,
    "position": 20.3529
  },
  {
    "id": "how-to-speed-up-your-wordpress-website-for-better-seo",
    "path": "/how-to-speed-up-your-wordpress-website-for-better-seo",
    "slug": "how-to-speed-up-your-wordpress-website-for-better-seo",
    "title": "How to Speed Up Your WordPress Website for Better SEO",
    "kind": "article",
    "relatedHref": "/services/seo",
    "clicks": 1,
    "impressions": 377,
    "position": 50.382
  },
  {
    "id": "service-live-chat-support",
    "path": "/service-live-chat-support",
    "slug": "service-live-chat-support",
    "title": "Live Chat Support",
    "kind": "service",
    "relatedHref": "/services/bpo/customer-support",
    "clicks": 1,
    "impressions": 374,
    "position": 12.4893
  },
  {
    "id": "a-beginners-guide-to-understanding-online-marketing-metrics",
    "path": "/a-beginners-guide-to-understanding-online-marketing-metrics",
    "slug": "a-beginners-guide-to-understanding-online-marketing-metrics",
    "title": "A Beginners Guide to Understanding Online Marketing Metrics",
    "kind": "article",
    "relatedHref": "/blog",
    "clicks": 1,
    "impressions": 356,
    "position": 31.1124
  },
  {
    "id": "services--ai--ai-consulting",
    "path": "/services/ai/ai-consulting",
    "slug": "ai-consulting",
    "title": "AI Consulting",
    "kind": "service",
    "relatedHref": "/services/ai/consulting",
    "clicks": 1,
    "impressions": 323,
    "position": 9.7833
  },
  {
    "id": "service-branding-strategy",
    "path": "/service-branding-strategy",
    "slug": "service-branding-strategy",
    "title": "Branding Strategy",
    "kind": "service",
    "relatedHref": "/services/branding/brand-strategy",
    "clicks": 1,
    "impressions": 296,
    "position": 14.9527
  },
  {
    "id": "a-step-by-step-guide-to-setting-up-a-blog-on-wordpress",
    "path": "/a-step-by-step-guide-to-setting-up-a-blog-on-wordpress",
    "slug": "a-step-by-step-guide-to-setting-up-a-blog-on-wordpress",
    "title": "A Step by Step Guide to Setting Up a Blog on WordPress",
    "kind": "article",
    "relatedHref": "/services/website-development",
    "clicks": 1,
    "impressions": 276,
    "position": 35.9529
  },
  {
    "id": "service-wordpress-web-designs",
    "path": "/service-wordpress-web-designs",
    "slug": "service-wordpress-web-designs",
    "title": "WordPress Web Design",
    "kind": "service",
    "relatedHref": "/services/website-development/wordpress",
    "clicks": 1,
    "impressions": 273,
    "position": 20.0586
  },
  {
    "id": "service-lead-generation",
    "path": "/service-lead-generation",
    "slug": "service-lead-generation",
    "title": "Lead Generation",
    "kind": "service",
    "relatedHref": "/services/digital-marketing",
    "clicks": 1,
    "impressions": 268,
    "position": 15
  },
  {
    "id": "service-google-ppc",
    "path": "/service-google-ppc",
    "slug": "service-google-ppc",
    "title": "Google PPC",
    "kind": "service",
    "relatedHref": "/services/performance-marketing/google-ads",
    "clicks": 1,
    "impressions": 248,
    "position": 34.0242
  },
  {
    "id": "service-wordpress-development",
    "path": "/service-wordpress-development",
    "slug": "service-wordpress-development",
    "title": "WordPress Development",
    "kind": "service",
    "relatedHref": "/services/website-development/wordpress",
    "clicks": 1,
    "impressions": 247,
    "position": 12.749
  },
  {
    "id": "service-digital-marketing",
    "path": "/service-digital-marketing",
    "slug": "service-digital-marketing",
    "title": "Digital Marketing",
    "kind": "service",
    "relatedHref": "/services/digital-marketing",
    "clicks": 1,
    "impressions": 220,
    "position": 11.1591
  },
  {
    "id": "complete-guide-to-social-media-developing-an-effective-strategy",
    "path": "/complete-guide-to-social-media-developing-an-effective-strategy",
    "slug": "complete-guide-to-social-media-developing-an-effective-strategy",
    "title": "Complete Guide to Social Media Developing an Effective Strategy",
    "kind": "article",
    "relatedHref": "/services/social-media",
    "clicks": 1,
    "impressions": 214,
    "position": 57.5093
  },
  {
    "id": "service-website-development--website-design",
    "path": "/service-website-development/website-design",
    "slug": "website-design",
    "title": "Website Design",
    "kind": "service",
    "relatedHref": "/services/website-development",
    "clicks": 1,
    "impressions": 209,
    "position": 19.0335
  },
  {
    "id": "soft-launch-vs-hard-launch-whats-the-difference",
    "path": "/soft-launch-vs-hard-launch-whats-the-difference",
    "slug": "soft-launch-vs-hard-launch-whats-the-difference",
    "title": "Soft Launch vs Hard Launch Whats the Difference",
    "kind": "article",
    "relatedHref": "/blog",
    "clicks": 1,
    "impressions": 204,
    "position": 10.2647
  },
  {
    "id": "service-wordpress",
    "path": "/service-wordpress",
    "slug": "service-wordpress",
    "title": "WordPress",
    "kind": "service",
    "relatedHref": "/services/website-development/wordpress",
    "clicks": 1,
    "impressions": 184,
    "position": 11.3913
  },
  {
    "id": "service-video-production",
    "path": "/service-video-production",
    "slug": "service-video-production",
    "title": "Video Production",
    "kind": "service",
    "relatedHref": "/services/video-production",
    "clicks": 1,
    "impressions": 172,
    "position": 22.6977
  },
  {
    "id": "create-an-seo-friendly-content-strategy-for-your-wordpress-blog",
    "path": "/create-an-seo-friendly-content-strategy-for-your-wordpress-blog",
    "slug": "create-an-seo-friendly-content-strategy-for-your-wordpress-blog",
    "title": "Create an SEO Friendly Content Strategy for Your WordPress Blog",
    "kind": "article",
    "relatedHref": "/services/seo",
    "clicks": 1,
    "impressions": 163,
    "position": 23.7669
  },
  {
    "id": "service-logo-video-animation",
    "path": "/service-logo-video-animation",
    "slug": "service-logo-video-animation",
    "title": "Logo Video Animation",
    "kind": "service",
    "relatedHref": "/services/video-production/animation",
    "clicks": 1,
    "impressions": 163,
    "position": 25.6319
  },
  {
    "id": "service-creative",
    "path": "/service-creative",
    "slug": "service-creative",
    "title": "Creative",
    "kind": "service",
    "relatedHref": "/services/branding",
    "clicks": 1,
    "impressions": 162,
    "position": 13.6049
  },
  {
    "id": "service-website-migration",
    "path": "/service-website-migration",
    "slug": "service-website-migration",
    "title": "Website Migration",
    "kind": "service",
    "relatedHref": "/services/website-development/website-migration",
    "clicks": 1,
    "impressions": 157,
    "position": 19.7962
  },
  {
    "id": "static-vs-dynamic-websites-key-differences-and-best-uses",
    "path": "/static-vs-dynamic-websites-key-differences-and-best-uses",
    "slug": "static-vs-dynamic-websites-key-differences-and-best-uses",
    "title": "Static vs Dynamic Websites Key Differences and Best Uses",
    "kind": "article",
    "relatedHref": "/services/website-development",
    "clicks": 1,
    "impressions": 141,
    "position": 12.2624
  },
  {
    "id": "career-advancement-in-marketing-and-advertising",
    "path": "/career-advancement-in-marketing-and-advertising",
    "slug": "career-advancement-in-marketing-and-advertising",
    "title": "Career Advancement in Marketing and Advertising",
    "kind": "article",
    "relatedHref": "/blog",
    "clicks": 1,
    "impressions": 133,
    "position": 8.812
  },
  {
    "id": "wordpress-website-development-cost-in-the-usa",
    "path": "/wordpress-website-development-cost-in-the-usa",
    "slug": "wordpress-website-development-cost-in-the-usa",
    "title": "WordPress Website Development Cost in the USA",
    "kind": "article",
    "relatedHref": "/services/website-development",
    "clicks": 1,
    "impressions": 121,
    "position": 31.9174
  },
  {
    "id": "service-on-page-seo",
    "path": "/service-on-page-seo",
    "slug": "service-on-page-seo",
    "title": "On Page SEO",
    "kind": "service",
    "relatedHref": "/services/seo/content-seo",
    "clicks": 1,
    "impressions": 114,
    "position": 22.0702
  },
  {
    "id": "how-to-revamp-your-website-for-better-performance",
    "path": "/how-to-revamp-your-website-for-better-performance",
    "slug": "how-to-revamp-your-website-for-better-performance",
    "title": "How to Revamp Your Website for Better Performance",
    "kind": "article",
    "relatedHref": "/services/website-development",
    "clicks": 1,
    "impressions": 109,
    "position": 13.5321
  },
  {
    "id": "social-media-automation-tools-2026",
    "path": "/social-media-automation-tools-2026",
    "slug": "social-media-automation-tools-2026",
    "title": "Social Media Automation Tools 2026",
    "kind": "article",
    "relatedHref": "/services/social-media",
    "clicks": 1,
    "impressions": 94,
    "position": 13.0957
  },
  {
    "id": "service-call-center-support",
    "path": "/service-call-center-support",
    "slug": "service-call-center-support",
    "title": "Call Center Support",
    "kind": "service",
    "relatedHref": "/services/bpo/customer-support",
    "clicks": 1,
    "impressions": 84,
    "position": 29.4881
  },
  {
    "id": "service-payroll-outsourcing",
    "path": "/service-payroll-outsourcing",
    "slug": "service-payroll-outsourcing",
    "title": "Payroll Outsourcing",
    "kind": "service",
    "relatedHref": "/services/bpo/operations",
    "clicks": 1,
    "impressions": 40,
    "position": 24.65
  },
  {
    "id": "why-our-clients-see-3x-more-leads-after-launching-their-new-site",
    "path": "/why-our-clients-see-3x-more-leads-after-launching-their-new-site",
    "slug": "why-our-clients-see-3x-more-leads-after-launching-their-new-site",
    "title": "Why Our Clients See 3x More Leads After Launching Their New Site",
    "kind": "article",
    "relatedHref": "/blog",
    "clicks": 1,
    "impressions": 28,
    "position": 6.3929
  },
  {
    "id": "ultimate-guide-to-digital-marketing-strategies-benefits-more",
    "path": "/ultimate-guide-to-digital-marketing-strategies-benefits-more",
    "slug": "ultimate-guide-to-digital-marketing-strategies-benefits-more",
    "title": "Ultimate Guide to Digital Marketing Strategies Benefits More",
    "kind": "article",
    "relatedHref": "/blog",
    "clicks": 1,
    "impressions": 25,
    "position": 11.84
  },
  {
    "id": "leveraging-social-media-for-online-marketing-success",
    "path": "/leveraging-social-media-for-online-marketing-success",
    "slug": "leveraging-social-media-for-online-marketing-success",
    "title": "Leveraging Social Media for Online Marketing Success",
    "kind": "article",
    "relatedHref": "/services/social-media",
    "clicks": 1,
    "impressions": 4,
    "position": 25.75
  },
  {
    "id": "top-wordpress-themes-for-seo-optimization",
    "path": "/top-wordpress-themes-for-seo-optimization",
    "slug": "top-wordpress-themes-for-seo-optimization",
    "title": "Top WordPress Themes for SEO Optimization",
    "kind": "article",
    "relatedHref": "/services/seo",
    "clicks": 0,
    "impressions": 12180,
    "position": 62.7479
  },
  {
    "id": "service-linkedin-ads",
    "path": "/service-linkedin-ads",
    "slug": "service-linkedin-ads",
    "title": "LinkedIn Ads",
    "kind": "service",
    "relatedHref": "/services/performance-marketing/linkedin-ads",
    "clicks": 0,
    "impressions": 6994,
    "position": 38.3783
  },
  {
    "id": "blogs--how-to-redesign-your-website-for-seo",
    "path": "/blogs/how-to-redesign-your-website-for-seo",
    "slug": "how-to-redesign-your-website-for-seo",
    "title": "How to Redesign Your Website for SEO",
    "kind": "article",
    "relatedHref": "/services/seo",
    "clicks": 0,
    "impressions": 4513,
    "position": 33.7383
  },
  {
    "id": "top-web-technologies-for-web-development",
    "path": "/top-web-technologies-for-web-development",
    "slug": "top-web-technologies-for-web-development",
    "title": "Top Web Technologies for Web Development",
    "kind": "article",
    "relatedHref": "/services/website-development",
    "clicks": 0,
    "impressions": 4331,
    "position": 58.6784
  },
  {
    "id": "10-website-performance-optimization-strategies",
    "path": "/10-website-performance-optimization-strategies",
    "slug": "10-website-performance-optimization-strategies",
    "title": "10 Website Performance Optimization Strategies",
    "kind": "article",
    "relatedHref": "/services/website-development",
    "clicks": 0,
    "impressions": 2121,
    "position": 25.1848
  },
  {
    "id": "healthcare-website-development-complete-guide",
    "path": "/healthcare-website-development-complete-guide",
    "slug": "healthcare-website-development-complete-guide",
    "title": "Healthcare Website Development Complete Guide",
    "kind": "article",
    "relatedHref": "/services/website-development",
    "clicks": 0,
    "impressions": 1780,
    "position": 43.1528
  },
  {
    "id": "services--ai--chatgpt-optimization",
    "path": "/services/ai/chatgpt-optimization",
    "slug": "chatgpt-optimization",
    "title": "Chatgpt Optimization",
    "kind": "service",
    "relatedHref": "/services/ai",
    "clicks": 0,
    "impressions": 1419,
    "position": 22.0613
  },
  {
    "id": "what-is-a-business-account-on-whatsapp-whatsapp-business-overview",
    "path": "/what-is-a-business-account-on-whatsapp-whatsapp-business-overview",
    "slug": "what-is-a-business-account-on-whatsapp-whatsapp-business-overview",
    "title": "What Is a Business Account on WhatsApp WhatsApp Business Overview",
    "kind": "article",
    "relatedHref": "/blog",
    "clicks": 0,
    "impressions": 1206,
    "position": 37.6128
  },
  {
    "id": "content-management-systems-compared-why-wordpress-is-the-leader",
    "path": "/content-management-systems-compared-why-wordpress-is-the-leader",
    "slug": "content-management-systems-compared-why-wordpress-is-the-leader",
    "title": "Content Management Systems Compared Why WordPress Is the Leader",
    "kind": "article",
    "relatedHref": "/services/website-development",
    "clicks": 0,
    "impressions": 1176,
    "position": 29.6556
  },
  {
    "id": "how-to-set-up-google-my-business-for-local-seo-success",
    "path": "/how-to-set-up-google-my-business-for-local-seo-success",
    "slug": "how-to-set-up-google-my-business-for-local-seo-success",
    "title": "How to Set Up Google My Business for Local SEO Success",
    "kind": "article",
    "relatedHref": "/services/seo",
    "clicks": 0,
    "impressions": 1132,
    "position": 47.2977
  },
  {
    "id": "using-ai-tools-for-effective-digital-marketing-automation",
    "path": "/using-ai-tools-for-effective-digital-marketing-automation",
    "slug": "using-ai-tools-for-effective-digital-marketing-automation",
    "title": "Using AI Tools for Effective Digital Marketing Automation",
    "kind": "article",
    "relatedHref": "/blog",
    "clicks": 0,
    "impressions": 1121,
    "position": 69.2079
  },
  {
    "id": "important-google-ranking-factors-in-2026",
    "path": "/important-google-ranking-factors-in-2026",
    "slug": "important-google-ranking-factors-in-2026",
    "title": "Important Google Ranking Factors in 2026",
    "kind": "article",
    "relatedHref": "/blog",
    "clicks": 0,
    "impressions": 849,
    "position": 22.9293
  },
  {
    "id": "the-synergy-of-bpo-and-digital-marketing-a-winning-combination",
    "path": "/the-synergy-of-bpo-and-digital-marketing-a-winning-combination",
    "slug": "the-synergy-of-bpo-and-digital-marketing-a-winning-combination",
    "title": "The Synergy of BPO and Digital Marketing a Winning Combination",
    "kind": "article",
    "relatedHref": "/services/bpo",
    "clicks": 0,
    "impressions": 783,
    "position": 11.5492
  },
  {
    "id": "service-social-media--social-media-design-content-creation",
    "path": "/service-social-media/social-media-design-content-creation",
    "slug": "social-media-design-content-creation",
    "title": "Social Media Design Content Creation",
    "kind": "service",
    "relatedHref": "/services/branding",
    "clicks": 0,
    "impressions": 647,
    "position": 12.4652
  },
  {
    "id": "service-custom-website-development",
    "path": "/service-custom-website-development",
    "slug": "service-custom-website-development",
    "title": "Custom Website Development",
    "kind": "service",
    "relatedHref": "/services/website-development",
    "clicks": 0,
    "impressions": 588,
    "position": 21.2347
  },
  {
    "id": "service-local-seo",
    "path": "/service-local-seo",
    "slug": "service-local-seo",
    "title": "Local SEO",
    "kind": "service",
    "relatedHref": "/services/seo/local-seo",
    "clicks": 0,
    "impressions": 571,
    "position": 40.7338
  },
  {
    "id": "service-magento",
    "path": "/service-magento",
    "slug": "service-magento",
    "title": "Magento",
    "kind": "service",
    "relatedHref": "/services/website-development",
    "clicks": 0,
    "impressions": 562,
    "position": 32.6459
  },
  {
    "id": "blogs--top-free-tools-for-better-website-development-and-seo",
    "path": "/blogs/top-free-tools-for-better-website-development-and-seo",
    "slug": "top-free-tools-for-better-website-development-and-seo",
    "title": "Top Free Tools for Better Website Development and SEO",
    "kind": "article",
    "relatedHref": "/services/seo",
    "clicks": 0,
    "impressions": 496,
    "position": 31.5222
  },
  {
    "id": "service-seo-audit",
    "path": "/service-seo-audit",
    "slug": "service-seo-audit",
    "title": "SEO Audit",
    "kind": "service",
    "relatedHref": "/services/seo/seo-audits",
    "clicks": 0,
    "impressions": 482,
    "position": 31.583
  },
  {
    "id": "blogs--step-by-step-guide-on-how-to-set-up-cloudflare-for-your-wordpress-site",
    "path": "/blogs/step-by-step-guide-on-how-to-set-up-cloudflare-for-your-wordpress-site",
    "slug": "step-by-step-guide-on-how-to-set-up-cloudflare-for-your-wordpress-site",
    "title": "Step by Step Guide on How to Set Up Cloudflare for Your WordPress Site",
    "kind": "article",
    "relatedHref": "/services/website-development",
    "clicks": 0,
    "impressions": 480,
    "position": 25.1896
  },
  {
    "id": "service-bpo-business-process-outsourcing",
    "path": "/service-bpo-business-process-outsourcing",
    "slug": "service-bpo-business-process-outsourcing",
    "title": "BPO Business Process Outsourcing",
    "kind": "service",
    "relatedHref": "/services/bpo",
    "clicks": 0,
    "impressions": 467,
    "position": 66.3041
  },
  {
    "id": "the-role-of-backlinks-in-boosting-wordpress-site-rankings",
    "path": "/the-role-of-backlinks-in-boosting-wordpress-site-rankings",
    "slug": "the-role-of-backlinks-in-boosting-wordpress-site-rankings",
    "title": "The Role of Backlinks in Boosting WordPress Site Rankings",
    "kind": "article",
    "relatedHref": "/services/seo",
    "clicks": 0,
    "impressions": 459,
    "position": 16.1786
  },
  {
    "id": "the-role-of-crm-software-in-improving-customer-retention-for-e-commerce-businesses",
    "path": "/the-role-of-crm-software-in-improving-customer-retention-for-e-commerce-businesses",
    "slug": "the-role-of-crm-software-in-improving-customer-retention-for-e-commerce-businesses",
    "title": "The Role of CRM Software in Improving Customer Retention for E Commerce Businesses",
    "kind": "article",
    "relatedHref": "/blog",
    "clicks": 0,
    "impressions": 446,
    "position": 7.3767
  },
  {
    "id": "how-to-conduct-a-comprehensive-web-design-audit",
    "path": "/how-to-conduct-a-comprehensive-web-design-audit",
    "slug": "how-to-conduct-a-comprehensive-web-design-audit",
    "title": "How to Conduct a Comprehensive Web Design Audit",
    "kind": "article",
    "relatedHref": "/services/website-development",
    "clicks": 0,
    "impressions": 442,
    "position": 42.4615
  },
  {
    "id": "the-role-of-chatbots-in-enhancing-digital-marketing-efforts",
    "path": "/the-role-of-chatbots-in-enhancing-digital-marketing-efforts",
    "slug": "the-role-of-chatbots-in-enhancing-digital-marketing-efforts",
    "title": "The Role of Chatbots in Enhancing Digital Marketing Efforts",
    "kind": "article",
    "relatedHref": "/blog",
    "clicks": 0,
    "impressions": 442,
    "position": 49.9005
  },
  {
    "id": "how-to-add-secure-payment-gateways-to-your-website",
    "path": "/how-to-add-secure-payment-gateways-to-your-website",
    "slug": "how-to-add-secure-payment-gateways-to-your-website",
    "title": "How to Add Secure Payment Gateways to Your Website",
    "kind": "article",
    "relatedHref": "/services/website-development",
    "clicks": 0,
    "impressions": 440,
    "position": 34.0545
  },
  {
    "id": "service-ecommerce-web-development",
    "path": "/service-ecommerce-web-development",
    "slug": "service-ecommerce-web-development",
    "title": "Ecommerce Web Development",
    "kind": "service",
    "relatedHref": "/services/website-development/ecommerce",
    "clicks": 0,
    "impressions": 403,
    "position": 15.8139
  },
  {
    "id": "top-10-digital-marketing-trends-expected-in-2025",
    "path": "/top-10-digital-marketing-trends-expected-in-2025",
    "slug": "top-10-digital-marketing-trends-expected-in-2025",
    "title": "Top 10 Digital Marketing Trends Expected in 2025",
    "kind": "article",
    "relatedHref": "/blog",
    "clicks": 0,
    "impressions": 397,
    "position": 53.9043
  },
  {
    "id": "15-top-trends-of-social-media-in-2026",
    "path": "/15-top-trends-of-social-media-in-2026",
    "slug": "15-top-trends-of-social-media-in-2026",
    "title": "15 Top Trends of Social Media in 2026",
    "kind": "article",
    "relatedHref": "/services/social-media",
    "clicks": 0,
    "impressions": 395,
    "position": 24.4051
  },
  {
    "id": "10-in-demand-it-skills-to-boost-your-resume",
    "path": "/10-in-demand-it-skills-to-boost-your-resume",
    "slug": "10-in-demand-it-skills-to-boost-your-resume",
    "title": "10 in Demand It Skills to Boost Your Resume",
    "kind": "article",
    "relatedHref": "/blog",
    "clicks": 0,
    "impressions": 383,
    "position": 59.3316
  },
  {
    "id": "service-custom-website-design",
    "path": "/service-custom-website-design",
    "slug": "service-custom-website-design",
    "title": "Custom Website Design",
    "kind": "service",
    "relatedHref": "/services/website-development",
    "clicks": 0,
    "impressions": 376,
    "position": 16.6941
  },
  {
    "id": "service-social-media--social-media-strategy-planning",
    "path": "/service-social-media/social-media-strategy-planning",
    "slug": "social-media-strategy-planning",
    "title": "Social Media Strategy Planning",
    "kind": "service",
    "relatedHref": "/services/social-media",
    "clicks": 0,
    "impressions": 375,
    "position": 10.7413
  },
  {
    "id": "b2b-services-online-digital-marketing-agency",
    "path": "/b2b-services-online-digital-marketing-agency",
    "slug": "b2b-services-online-digital-marketing-agency",
    "title": "Digital Marketing for B2b Services",
    "kind": "industry",
    "relatedHref": "/industries/b2b",
    "clicks": 0,
    "impressions": 369,
    "position": 55.4878
  },
  {
    "id": "service-shopify-marketing",
    "path": "/service-shopify-marketing",
    "slug": "service-shopify-marketing",
    "title": "Shopify Marketing",
    "kind": "service",
    "relatedHref": "/services/ecommerce-marketing/shopify-marketing",
    "clicks": 0,
    "impressions": 366,
    "position": 17.4098
  },
  {
    "id": "10-best-website-development-tools-you-must-try",
    "path": "/10-best-website-development-tools-you-must-try",
    "slug": "10-best-website-development-tools-you-must-try",
    "title": "10 Best Website Development Tools You Must Try",
    "kind": "article",
    "relatedHref": "/services/website-development",
    "clicks": 0,
    "impressions": 359,
    "position": 28.078
  },
  {
    "id": "going-beyond-google-exploring-alternative-search-engines-for-your-seo-strategy",
    "path": "/going-beyond-google-exploring-alternative-search-engines-for-your-seo-strategy",
    "slug": "going-beyond-google-exploring-alternative-search-engines-for-your-seo-strategy",
    "title": "Going Beyond Google Exploring Alternative Search Engines for Your SEO Strategy",
    "kind": "article",
    "relatedHref": "/services/seo",
    "clicks": 0,
    "impressions": 348,
    "position": 34.8563
  },
  {
    "id": "service-logo-design",
    "path": "/service-logo-design",
    "slug": "service-logo-design",
    "title": "Logo Design",
    "kind": "service",
    "relatedHref": "/services/branding/logo-design",
    "clicks": 0,
    "impressions": 347,
    "position": 16.1585
  },
  {
    "id": "freelancer-vs-agency-pricing",
    "path": "/freelancer-vs-agency-pricing",
    "slug": "freelancer-vs-agency-pricing",
    "title": "Freelancer vs Agency Pricing",
    "kind": "article",
    "relatedHref": "/services/video-production",
    "clicks": 0,
    "impressions": 329,
    "position": 5.6809
  },
  {
    "id": "why-content-marketing-is-vital-for-digital-marketing-success",
    "path": "/why-content-marketing-is-vital-for-digital-marketing-success",
    "slug": "why-content-marketing-is-vital-for-digital-marketing-success",
    "title": "Why Content Marketing Is Vital for Digital Marketing Success",
    "kind": "article",
    "relatedHref": "/blog",
    "clicks": 0,
    "impressions": 303,
    "position": 47.1551
  },
  {
    "id": "how-to-secure-your-wordpress-site-from-cyber-threats",
    "path": "/how-to-secure-your-wordpress-site-from-cyber-threats",
    "slug": "how-to-secure-your-wordpress-site-from-cyber-threats",
    "title": "How to Secure Your WordPress Site from Cyber Threats",
    "kind": "article",
    "relatedHref": "/services/website-development",
    "clicks": 0,
    "impressions": 299,
    "position": 56.6823
  },
  {
    "id": "linkedin-summary-examples-to-attract-more-leads",
    "path": "/linkedin-summary-examples-to-attract-more-leads",
    "slug": "linkedin-summary-examples-to-attract-more-leads",
    "title": "LinkedIn Summary Examples to Attract More Leads",
    "kind": "article",
    "relatedHref": "/services/performance-marketing/linkedin-ads",
    "clicks": 0,
    "impressions": 289,
    "position": 9.6609
  },
  {
    "id": "service-custom-websites",
    "path": "/service-custom-websites",
    "slug": "service-custom-websites",
    "title": "Custom Websites",
    "kind": "service",
    "relatedHref": "/services/website-development",
    "clicks": 0,
    "impressions": 280,
    "position": 13.4857
  },
  {
    "id": "service-call-center-software-rental",
    "path": "/service-call-center-software-rental",
    "slug": "service-call-center-software-rental",
    "title": "Call Center Software Rental",
    "kind": "service",
    "relatedHref": "/services/bpo/customer-support",
    "clicks": 0,
    "impressions": 267,
    "position": 45.0187
  },
  {
    "id": "what-are-cookies-are-they-good-or-bad",
    "path": "/what-are-cookies-are-they-good-or-bad",
    "slug": "what-are-cookies-are-they-good-or-bad",
    "title": "What Are Cookies Are They Good or Bad",
    "kind": "article",
    "relatedHref": "/blog",
    "clicks": 0,
    "impressions": 265,
    "position": 43.6
  },
  {
    "id": "why-is-a-mobile-friendly-website-important",
    "path": "/why-is-a-mobile-friendly-website-important",
    "slug": "why-is-a-mobile-friendly-website-important",
    "title": "Why Is a Mobile Friendly Website Important",
    "kind": "article",
    "relatedHref": "/services/website-development",
    "clicks": 0,
    "impressions": 253,
    "position": 56.004
  },
  {
    "id": "how-to-use-wordpress-for-local-seo",
    "path": "/how-to-use-wordpress-for-local-seo",
    "slug": "how-to-use-wordpress-for-local-seo",
    "title": "How to Use WordPress for Local SEO",
    "kind": "article",
    "relatedHref": "/services/seo",
    "clicks": 0,
    "impressions": 246,
    "position": 25.4268
  },
  {
    "id": "blogs--how-ai-is-shaping-the-future-of-digital-marketing",
    "path": "/blogs/how-ai-is-shaping-the-future-of-digital-marketing",
    "slug": "how-ai-is-shaping-the-future-of-digital-marketing",
    "title": "How AI Is Shaping the Future of Digital Marketing",
    "kind": "article",
    "relatedHref": "/blog",
    "clicks": 0,
    "impressions": 236,
    "position": 64
  },
  {
    "id": "service-hosting-cpanel-support",
    "path": "/service-hosting-cpanel-support",
    "slug": "service-hosting-cpanel-support",
    "title": "Hosting Cpanel Support",
    "kind": "service",
    "relatedHref": "/services/website-development",
    "clicks": 0,
    "impressions": 227,
    "position": 26.2379
  },
  {
    "id": "top-10-digital-marketing-trends-expected-in-2026",
    "path": "/top-10-digital-marketing-trends-expected-in-2026",
    "slug": "top-10-digital-marketing-trends-expected-in-2026",
    "title": "Top 10 Digital Marketing Trends Expected in 2026",
    "kind": "article",
    "relatedHref": "/blog",
    "clicks": 0,
    "impressions": 224,
    "position": 63.2902
  },
  {
    "id": "service-ecommerce-web-designs",
    "path": "/service-ecommerce-web-designs",
    "slug": "service-ecommerce-web-designs",
    "title": "Ecommerce Web Design",
    "kind": "service",
    "relatedHref": "/services/website-development/ecommerce",
    "clicks": 0,
    "impressions": 216,
    "position": 20.0093
  },
  {
    "id": "email-marketing-essentials-a-beginners-guide-for-small-businesses",
    "path": "/email-marketing-essentials-a-beginners-guide-for-small-businesses",
    "slug": "email-marketing-essentials-a-beginners-guide-for-small-businesses",
    "title": "Email Marketing Essentials a Beginners Guide for Small Businesses",
    "kind": "article",
    "relatedHref": "/services/email-marketing",
    "clicks": 0,
    "impressions": 212,
    "position": 65.4575
  },
  {
    "id": "services--ai--ai-agent-development",
    "path": "/services/ai/ai-agent-development",
    "slug": "ai-agent-development",
    "title": "AI Agent Development",
    "kind": "service",
    "relatedHref": "/services/ai",
    "clicks": 0,
    "impressions": 211,
    "position": 9.5972
  },
  {
    "id": "the-benefits-of-google-ads-in-online-marketing",
    "path": "/the-benefits-of-google-ads-in-online-marketing",
    "slug": "the-benefits-of-google-ads-in-online-marketing",
    "title": "The Benefits of Google Ads in Online Marketing",
    "kind": "article",
    "relatedHref": "/services/performance-marketing/google-ads",
    "clicks": 0,
    "impressions": 211,
    "position": 39.1517
  },
  {
    "id": "service-seo",
    "path": "/service-seo",
    "slug": "service-seo",
    "title": "SEO",
    "kind": "service",
    "relatedHref": "/services/seo",
    "clicks": 0,
    "impressions": 209,
    "position": 20.689
  },
  {
    "id": "logo-design-trends-2025-fresh-inspiration-for-your-brand",
    "path": "/logo-design-trends-2025-fresh-inspiration-for-your-brand",
    "slug": "logo-design-trends-2025-fresh-inspiration-for-your-brand",
    "title": "Logo Design Trends 2025 Fresh Inspiration for Your Brand",
    "kind": "article",
    "relatedHref": "/services/branding",
    "clicks": 0,
    "impressions": 190,
    "position": 19.7526
  },
  {
    "id": "the-role-of-ux-ui-design-in-successful-website-development",
    "path": "/the-role-of-ux-ui-design-in-successful-website-development",
    "slug": "the-role-of-ux-ui-design-in-successful-website-development",
    "title": "The Role of UX UI Design in Successful Website Development",
    "kind": "article",
    "relatedHref": "/services/website-development",
    "clicks": 0,
    "impressions": 189,
    "position": 42.037
  },
  {
    "id": "service-customer-support",
    "path": "/service-customer-support",
    "slug": "service-customer-support",
    "title": "Customer Support",
    "kind": "service",
    "relatedHref": "/services/bpo/customer-support",
    "clicks": 0,
    "impressions": 177,
    "position": 24.565
  },
  {
    "id": "why-photography-is-important-for-social-media-marketing",
    "path": "/why-photography-is-important-for-social-media-marketing",
    "slug": "why-photography-is-important-for-social-media-marketing",
    "title": "Why Photography Is Important for Social Media Marketing",
    "kind": "article",
    "relatedHref": "/services/social-media",
    "clicks": 0,
    "impressions": 177,
    "position": 13.3842
  },
  {
    "id": "how-to-choose-the-best-web-hosting-for-your-wordpress-site",
    "path": "/how-to-choose-the-best-web-hosting-for-your-wordpress-site",
    "slug": "how-to-choose-the-best-web-hosting-for-your-wordpress-site",
    "title": "How to Choose the Best Web Hosting for Your WordPress Site",
    "kind": "article",
    "relatedHref": "/services/website-development",
    "clicks": 0,
    "impressions": 172,
    "position": 34.3081
  },
  {
    "id": "how-to-choose-the-right-content-management-system",
    "path": "/how-to-choose-the-right-content-management-system",
    "slug": "how-to-choose-the-right-content-management-system",
    "title": "How to Choose the Right Content Management System",
    "kind": "article",
    "relatedHref": "/blog",
    "clicks": 0,
    "impressions": 160,
    "position": 27.3125
  },
  {
    "id": "how-to-build-an-online-presence-with-content-marketing",
    "path": "/how-to-build-an-online-presence-with-content-marketing",
    "slug": "how-to-build-an-online-presence-with-content-marketing",
    "title": "How to Build an Online Presence with Content Marketing",
    "kind": "article",
    "relatedHref": "/blog",
    "clicks": 0,
    "impressions": 150,
    "position": 38.0533
  },
  {
    "id": "using-google-analytics-for-better-online-marketing-decisions",
    "path": "/using-google-analytics-for-better-online-marketing-decisions",
    "slug": "using-google-analytics-for-better-online-marketing-decisions",
    "title": "Using Google Analytics for Better Online Marketing Decisions",
    "kind": "article",
    "relatedHref": "/blog",
    "clicks": 0,
    "impressions": 144,
    "position": 18.7222
  },
  {
    "id": "service-robo-calls",
    "path": "/service-robo-calls",
    "slug": "service-robo-calls",
    "title": "Robo Calls",
    "kind": "service",
    "relatedHref": "/services/bpo",
    "clicks": 0,
    "impressions": 129,
    "position": 34.2326
  },
  {
    "id": "financial-technology-fintech-online-digital-marketing-agency",
    "path": "/financial-technology-fintech-online-digital-marketing-agency",
    "slug": "financial-technology-fintech-online-digital-marketing-agency",
    "title": "Digital Marketing for Financial Technology Fintech",
    "kind": "industry",
    "relatedHref": "/industries/finance",
    "clicks": 0,
    "impressions": 128,
    "position": 42.9375
  },
  {
    "id": "services--ai--ai-digital-marketing",
    "path": "/services/ai/ai-digital-marketing",
    "slug": "ai-digital-marketing",
    "title": "AI Digital Marketing",
    "kind": "service",
    "relatedHref": "/services/ai/marketing-automation",
    "clicks": 0,
    "impressions": 128,
    "position": 12.5781
  },
  {
    "id": "how-to-create-a-winning-digital-marketing-campaign-on-a-budget",
    "path": "/how-to-create-a-winning-digital-marketing-campaign-on-a-budget",
    "slug": "how-to-create-a-winning-digital-marketing-campaign-on-a-budget",
    "title": "How to Create a Winning Digital Marketing Campaign on a Budget",
    "kind": "article",
    "relatedHref": "/blog",
    "clicks": 0,
    "impressions": 122,
    "position": 15.3443
  },
  {
    "id": "building-a-fast-loading-wordpress-site-essential-tips",
    "path": "/building-a-fast-loading-wordpress-site-essential-tips",
    "slug": "building-a-fast-loading-wordpress-site-essential-tips",
    "title": "Building a Fast Loading WordPress Site Essential Tips",
    "kind": "article",
    "relatedHref": "/services/website-development",
    "clicks": 0,
    "impressions": 121,
    "position": 17.9587
  },
  {
    "id": "the-latest-trends-in-website-development-for-2026",
    "path": "/the-latest-trends-in-website-development-for-2026",
    "slug": "the-latest-trends-in-website-development-for-2026",
    "title": "The Latest Trends in Website Development for 2026",
    "kind": "article",
    "relatedHref": "/services/website-development",
    "clicks": 0,
    "impressions": 119,
    "position": 61.8235
  },
  {
    "id": "service-custom-ecommerce-website",
    "path": "/service-custom-ecommerce-website",
    "slug": "service-custom-ecommerce-website",
    "title": "Custom Ecommerce Website",
    "kind": "service",
    "relatedHref": "/services/website-development/ecommerce",
    "clicks": 0,
    "impressions": 118,
    "position": 28.661
  },
  {
    "id": "social-media-apps-your-business-needs",
    "path": "/social-media-apps-your-business-needs",
    "slug": "social-media-apps-your-business-needs",
    "title": "Social Media Apps Your Business Needs",
    "kind": "article",
    "relatedHref": "/services/social-media",
    "clicks": 0,
    "impressions": 113,
    "position": 31.4425
  },
  {
    "id": "service-custom-shirt-website-services",
    "path": "/service-custom-shirt-website-services",
    "slug": "service-custom-shirt-website-services",
    "title": "Custom Shirt Website Services",
    "kind": "service",
    "relatedHref": "/services/website-development/ecommerce",
    "clicks": 0,
    "impressions": 110,
    "position": 13.8636
  },
  {
    "id": "the-future-of-website-development-trends-to-watch-in-2026",
    "path": "/the-future-of-website-development-trends-to-watch-in-2026",
    "slug": "the-future-of-website-development-trends-to-watch-in-2026",
    "title": "The Future of Website Development Trends to Watch in 2026",
    "kind": "article",
    "relatedHref": "/services/website-development",
    "clicks": 0,
    "impressions": 109,
    "position": 56.8624
  },
  {
    "id": "service-call-center-outsource",
    "path": "/service-call-center-outsource",
    "slug": "service-call-center-outsource",
    "title": "Call Center Outsource",
    "kind": "service",
    "relatedHref": "/services/bpo/customer-support",
    "clicks": 0,
    "impressions": 102,
    "position": 15.1471
  },
  {
    "id": "how-much-does-it-cost-to-build-an-ecommerce-website",
    "path": "/how-much-does-it-cost-to-build-an-ecommerce-website",
    "slug": "how-much-does-it-cost-to-build-an-ecommerce-website",
    "title": "How Much Does It Cost to Build an Ecommerce Website",
    "kind": "article",
    "relatedHref": "/services/website-development",
    "clicks": 0,
    "impressions": 100,
    "position": 27.64
  }
];

export const legacySeoPageById = new Map(legacySeoPages.map((page) => [page.id, page]));
export const preservedLegacyPaths = new Set(legacySeoPages.map((page) => page.path));

export const legacySeoAliases = [
  {
    "source": "/blogs/best-animation-software-for-creators-and-professionals",
    "destination": "/best-animation-software-for-creators-and-professionals"
  },
  {
    "source": "/blogs/how-to-create-a-winning-seo-strategy-for-a-new-website",
    "destination": "/how-to-create-a-winning-seo-strategy-for-a-new-website"
  },
  {
    "source": "/blogs/best-practices-for-choosing-a-domain-name-in-2025",
    "destination": "/best-practices-for-choosing-a-domain-name-in-2025"
  },
  {
    "source": "/blogs/social-media-automation-tools-2025",
    "destination": "/social-media-automation-tools-2025"
  },
  {
    "source": "/blogs/15-top-trends-of-social-media-in-2026",
    "destination": "/15-top-trends-of-social-media-in-2026"
  },
  {
    "source": "/blogs/difference-between-graphic-designers-and-graphic-illustrators",
    "destination": "/difference-between-graphic-designers-and-graphic-illustrators"
  },
  {
    "source": "/blogs/the-synergy-of-bpo-and-digital-marketing-a-winning-combination",
    "destination": "/the-synergy-of-bpo-and-digital-marketing-a-winning-combination"
  },
  {
    "source": "/blogs/blog-top-10-tools-for-social-media-management-2025",
    "destination": "/blog-top-10-tools-for-social-media-management-2025"
  },
  {
    "source": "/blogs/influencer-marketing-vs-ppc-advertising",
    "destination": "/influencer-marketing-vs-ppc-advertising"
  },
  {
    "source": "/blogs/the-role-of-chatbots-in-enhancing-digital-marketing-efforts",
    "destination": "/the-role-of-chatbots-in-enhancing-digital-marketing-efforts"
  },
  {
    "source": "/blogs/a-beginners-guide-to-understanding-online-marketing-metrics",
    "destination": "/a-beginners-guide-to-understanding-online-marketing-metrics"
  },
  {
    "source": "/blogs/how-to-drive-traffic-to-your-blog-using-social-media",
    "destination": "/how-to-drive-traffic-to-your-blog-using-social-media"
  },
  {
    "source": "/blogs/how-to-integrate-seo-into-your-website-development-workflow",
    "destination": "/how-to-integrate-seo-into-your-website-development-workflow"
  },
  {
    "source": "/blogs/top-10-plugins-for-wordpress-seo-optimization",
    "destination": "/top-10-plugins-for-wordpress-seo-optimization"
  },
  {
    "source": "/blogs/linkedin-summary-examples-to-attract-more-leads",
    "destination": "/linkedin-summary-examples-to-attract-more-leads"
  }
] as const;
