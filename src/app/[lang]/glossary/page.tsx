import type { Metadata } from "next";
import Link from "next/link";
import { Animate } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Digital Marketing Glossary",
  description: "A comprehensive glossary of digital marketing terms. Learn the key definitions for SEO, PPC, social media, content marketing, analytics, and more.",
  alternates: { canonical: "https://themarkitmedia.com/en/glossary" },
};

const glossaryTerms = [
  { term: "A/B Testing", definition: "A method of comparing two versions of a webpage, email, or ad to determine which performs better. Also known as split testing." },
  { term: "AEO (Answer Engine Optimization)", definition: "The practice of optimizing content to appear in AI-generated answers, voice search results, and featured snippets in search engines." },
  { term: "Bounce Rate", definition: "The percentage of visitors who leave a website after viewing only one page without taking any further action." },
  { term: "CPA (Cost Per Acquisition)", definition: "The total cost of acquiring one customer through a specific marketing channel or campaign." },
  { term: "CPC (Cost Per Click)", definition: "The amount paid each time someone clicks on a paid advertisement, commonly used in search and social advertising." },
  { term: "CPM (Cost Per Mille)", definition: "The cost per 1,000 impressions of an advertisement. Used primarily in display and video advertising." },
  { term: "CRO (Conversion Rate Optimization)", definition: "The process of improving a website or landing page to increase the percentage of visitors who complete a desired action." },
  { term: "CTR (Click-Through Rate)", definition: "The ratio of users who click on a link compared to the total number who viewed it, expressed as a percentage." },
  { term: "Domain Authority", definition: "A search engine ranking score developed by Moz that predicts how likely a website is to rank in search engine results." },
  { term: "Featured Snippet", definition: "A summarized answer to a search query displayed at the top of Google search results, above the regular organic listings." },
  { term: "Google Business Profile", definition: "A free tool from Google that allows businesses to manage their online presence across Google Search and Maps." },
  { term: "Impressions", definition: "The number of times an ad, post, or piece of content is displayed to users, regardless of whether it was clicked." },
  { term: "KPI (Key Performance Indicator)", definition: "A measurable value that demonstrates how effectively a company is achieving key business objectives." },
  { term: "Landing Page", definition: "A standalone web page designed specifically for a marketing or advertising campaign, focused on a single conversion goal." },
  { term: "Lead Magnet", definition: "A free resource offered to potential customers in exchange for their contact information, such as an ebook, checklist, or webinar." },
  { term: "Local SEO", definition: "The process of optimizing a business's online presence to attract customers from relevant local searches on Google and other search engines." },
  { term: "LTV (Lifetime Value)", definition: "The total revenue a business can expect from a single customer account throughout their entire relationship." },
  { term: "Meta Description", definition: "An HTML element that provides a brief summary of a web page's content, displayed in search engine results pages." },
  { term: "Organic Traffic", definition: "Visitors who arrive at a website through unpaid search engine results, as opposed to paid advertising." },
  { term: "PPC (Pay-Per-Click)", definition: "An advertising model where advertisers pay a fee each time their ad is clicked. Google Ads is the most common PPC platform." },
  { term: "Retargeting", definition: "A form of online advertising that targets users who have previously visited a website or interacted with a brand." },
  { term: "ROAS (Return on Ad Spend)", definition: "A marketing metric that measures the revenue earned for every dollar spent on advertising." },
  { term: "ROI (Return on Investment)", definition: "A measure of the profitability of an investment, calculated as the net profit divided by the cost of the investment." },
  { term: "Schema Markup", definition: "A form of structured data added to a website's HTML that helps search engines understand the content and display rich results." },
  { term: "SEO (Search Engine Optimization)", definition: "The practice of improving a website's visibility and ranking in organic search engine results through technical optimization, content, and link building." },
  { term: "SERP (Search Engine Results Page)", definition: "The page displayed by a search engine in response to a user's query, containing organic results, ads, and features like snippets." },
  { term: "Technical SEO", definition: "The process of optimizing a website's infrastructure for search engine crawling and indexing, including site speed, mobile-friendliness, and structured data." },
  { term: "UGC (User-Generated Content)", definition: "Content created by customers or followers rather than the brand itself, including reviews, social posts, and testimonials." },
  { term: "UTM Parameters", definition: "Tags added to URLs to track the effectiveness of marketing campaigns across traffic sources and channels in analytics tools." },
  { term: "Backlink", definition: "A link from one website to another. Backlinks from authoritative sites are a key ranking factor in search engine algorithms." },
  { term: "Brand Equity", definition: "The commercial value derived from consumer perception of a brand name, rather than from the product or service itself." },
  { term: "Content Marketing", definition: "A strategic marketing approach focused on creating and distributing valuable, relevant content to attract and retain a target audience." },
  { term: "Conversion", definition: "When a website visitor completes a desired action, such as making a purchase, filling out a form, or subscribing to a newsletter." },
  { term: "Display Advertising", definition: "Visual-based online advertising that appears on websites, apps, and social media in the form of banners, images, or video." },
  { term: "Engagement Rate", definition: "A metric that measures the level of interaction an audience has with content, typically calculated as interactions divided by impressions or followers." },
  { term: "Funnel", definition: "The journey a potential customer takes from first awareness of a product or service to making a purchase decision." },
  { term: "GA4 (Google Analytics 4)", definition: "Google's analytics platform that uses an event-based data model to track user interactions across websites and apps." },
  { term: "Heatmap", definition: "A visual representation of data showing where users click, scroll, and move their mouse on a webpage, used to optimize design and conversions." },
  { term: "Inbound Marketing", definition: "A marketing methodology that attracts customers through relevant content and experiences rather than interruptive advertising." },
  { term: "JSON-LD", definition: "A JavaScript-based format for structured data that helps search engines understand page content and display enhanced search results." },
  { term: "Keyword Cannibalization", definition: "When multiple pages on the same website target the same keyword, causing them to compete against each other in search rankings." },
  { term: "Link Building", definition: "The process of acquiring hyperlinks from other websites to your own, used to improve search engine rankings and drive referral traffic." },
  { term: "Marketing Automation", definition: "Technology that manages marketing processes and campaigns automatically across multiple channels, including email, social, and web." },
  { term: "Native Advertising", definition: "Paid advertising that matches the look, feel, and function of the media format in which it appears, blending in with surrounding content." },
  { term: "Omnichannel Marketing", definition: "A cross-channel approach that provides a seamless customer experience across all touchpoints, including online, in-store, and mobile." },
  { term: "Page Speed", definition: "The measurement of how quickly content on a web page loads, which affects both user experience and search engine rankings." },
  { term: "Quality Score", definition: "A Google Ads metric that rates the quality and relevance of keywords, ads, and landing pages, affecting cost-per-click and ad position." },
  { term: "Remarketing", definition: "A digital advertising strategy that shows targeted ads to people who have previously visited your website or used your mobile app." },
  { term: "Social Proof", definition: "The psychological phenomenon where people conform to the actions of others, used in marketing through reviews, testimonials, and user counts." },
  { term: "Title Tag", definition: "An HTML element that specifies the title of a web page, displayed in search results and browser tabs. A key on-page SEO factor." },
  { term: "User Experience (UX)", definition: "The overall experience a user has when interacting with a product or website, encompassing usability, accessibility, and satisfaction." },
  { term: "Voice Search Optimization", definition: "The practice of optimizing content to appear in voice search results from assistants like Siri, Alexa, and Google Assistant." },
  { term: "Webinar", definition: "An online seminar or presentation used as a marketing tool to educate audiences, generate leads, and build authority." },
  { term: "XML Sitemap", definition: "A file that lists all the important pages of a website to help search engines discover and index content efficiently." },
  { term: "Yield Management", definition: "A pricing strategy that varies prices based on demand, timing, and customer segment to maximize revenue from a limited resource." },
  { term: "Zero-Click Search", definition: "A search engine results page that answers the user's query directly, without requiring them to click through to any website." },
  { term: "Affiliate Marketing", definition: "A performance-based marketing model where businesses reward affiliates for driving traffic or sales through the affiliate's own marketing efforts." },
  { term: "Attribution Model", definition: "A framework for determining which marketing touchpoints receive credit for conversions, such as first-click, last-click, or multi-touch models." },
  { term: "Churn Rate", definition: "The percentage of customers who stop using a product or service during a given time period, commonly tracked in subscription businesses." },
  { term: "Core Web Vitals", definition: "A set of specific metrics defined by Google that measure the user experience of a web page, including loading speed, interactivity, and visual stability." },
  { term: "Customer Acquisition Cost (CAC)", definition: "The total cost of sales and marketing efforts needed to acquire a new customer, calculated by dividing total spend by the number of new customers." },
  { term: "Dark Social", definition: "Web traffic that comes from private sharing channels like messaging apps, email, and direct messages, which are difficult to track in analytics." },
  { term: "Demand Generation", definition: "Marketing activities focused on creating awareness and interest in a company's products or services, typically in B2B marketing." },
  { term: "E-E-A-T", definition: "Experience, Expertise, Authoritativeness, and Trustworthiness — quality signals Google uses to evaluate content credibility for search rankings." },
  { term: "First-Party Data", definition: "Data collected directly from your own audience or customers, including website behavior, purchase history, and CRM data." },
  { term: "Google Tag Manager (GTM)", definition: "A free tag management system that allows marketers to deploy and manage tracking tags on a website without modifying code directly." },
  { term: "Lookalike Audience", definition: "A targeting option in advertising platforms that finds new users similar to your existing customers, based on shared demographics and behaviors." },
  { term: "Marketing Qualified Lead (MQL)", definition: "A lead that has been identified as more likely to become a customer based on their engagement with marketing content and activities." },
  { term: "Programmatic Advertising", definition: "The automated buying and selling of digital advertising using software and algorithms, rather than manual negotiation and insertion orders." },
  { term: "Search Intent", definition: "The underlying purpose behind a search query — whether the user wants information, wants to navigate to a site, or wants to make a purchase." },
  { term: "Server-Side Tracking", definition: "A method of collecting analytics data through a server rather than the user's browser, providing more accurate tracking in a cookie-less environment." },
  { term: "Social Listening", definition: "The practice of monitoring social media platforms for mentions of a brand, competitors, or industry topics to inform marketing strategy." },
  { term: "Top of Funnel (TOFU)", definition: "The awareness stage of the marketing funnel, where potential customers first discover a brand through content, ads, or organic search." },
  { term: "Conversion API (CAPI)", definition: "A server-side tracking solution that sends conversion events directly from a server to advertising platforms, improving data accuracy and attribution." },
  { term: "Account-Based Marketing (ABM)", definition: "A B2B marketing strategy that focuses resources on a specific set of target accounts, using personalized campaigns designed to engage each account individually." },
  { term: "AI Overview", definition: "An AI-generated summary that appears at the top of Google search results, providing a synthesized answer to the user's query drawn from multiple web sources." },
  { term: "Brand Lift", definition: "A measurement of the positive impact an advertising campaign has on a consumer's perception and awareness of a brand." },
  { term: "Canonical URL", definition: "An HTML element that tells search engines which version of a page is the preferred one when duplicate or similar content exists across multiple URLs." },
  { term: "Click Fraud", definition: "The practice of artificially inflating the number of clicks on a pay-per-click ad, usually by competitors or bots, wasting the advertiser's budget." },
  { term: "Content Cluster", definition: "An SEO strategy where a pillar page covers a broad topic comprehensively, with multiple related cluster pages linking back to it to establish topical authority." },
  { term: "Customer Data Platform (CDP)", definition: "A software system that collects and unifies customer data from multiple sources into a single database, enabling personalized marketing across channels." },
  { term: "Data Clean Room", definition: "A secure environment where multiple parties can share and analyze data without exposing individual-level information, used for privacy-safe advertising measurement." },
  { term: "Dynamic Creative Optimization (DCO)", definition: "An advertising technology that automatically creates personalized ad variations based on user data such as location, behavior, and demographics." },
  { term: "Evergreen Content", definition: "Content that remains relevant and valuable over time, continuing to drive traffic and engagement long after its initial publication date." },
  { term: "Geotargeting", definition: "The practice of delivering content or ads to users based on their geographic location, from country level down to ZIP code or GPS coordinates." },
  { term: "Growth Hacking", definition: "A marketing approach focused on rapid experimentation across channels and product development to identify the most effective ways to grow a business." },
  { term: "Header Bidding", definition: "An advanced programmatic advertising technique where multiple ad exchanges bid on inventory simultaneously before the ad server makes a decision." },
  { term: "Ideal Customer Profile (ICP)", definition: "A detailed description of the type of company or individual that would get the most value from your product or service, used to focus marketing and sales efforts." },
  { term: "Intent Data", definition: "Information about a prospect's online behavior that signals their interest in a product, service, or topic, used to prioritize outreach and personalize messaging." },
  { term: "Lead Scoring", definition: "A methodology for ranking prospects based on their perceived value to the organization, using demographic data and behavioral signals to prioritize sales follow-up." },
  { term: "Micro-Conversion", definition: "A smaller action a user takes that indicates progress toward a primary conversion goal, such as viewing a pricing page, downloading a resource, or adding an item to cart." },
  { term: "Net Promoter Score (NPS)", definition: "A customer loyalty metric measured by asking customers how likely they are to recommend a product or service on a scale of 0-10." },
  { term: "Owned Media", definition: "Marketing channels that a business controls entirely, such as its website, blog, email list, and social media profiles, as opposed to paid or earned media." },
  { term: "Personalization", definition: "The practice of tailoring marketing content, product recommendations, and experiences to individual users based on their behavior, preferences, and data." },
  { term: "Programmatic Display", definition: "Automated buying of display advertising inventory through real-time bidding, using algorithms to target specific audiences across websites and apps." },
  { term: "Revenue Attribution", definition: "The process of identifying which marketing touchpoints contributed to a sale or conversion, enabling marketers to allocate budget to the most effective channels." },
  { term: "Social Commerce", definition: "The use of social media platforms to promote and sell products directly, including features like Instagram Shopping, TikTok Shop, and Facebook Marketplace." },
  { term: "Topic Authority", definition: "The perceived expertise a website has on a particular subject, built through comprehensive content coverage and quality backlinks, which influences search rankings." },
  { term: "Unified Marketing Measurement", definition: "An approach that combines multiple measurement methodologies like marketing mix modeling and multi-touch attribution to create a holistic view of marketing performance." },
  { term: "Ad Frequency", definition: "The average number of times a unique user sees a particular ad within a given time period. High frequency can lead to ad fatigue." },
  { term: "Audience Segmentation", definition: "The process of dividing a target audience into distinct groups based on shared characteristics such as demographics, behavior, or interests." },
  { term: "Bid Strategy", definition: "The approach an advertiser uses to set bids in auction-based advertising platforms, including manual CPC, target CPA, and maximize conversions." },
  { term: "Breadcrumb Navigation", definition: "A secondary navigation aid that shows users their location within a website's hierarchy, improving UX and helping search engines understand site structure." },
  { term: "Call Tracking", definition: "Technology that assigns unique phone numbers to marketing channels or campaigns to measure which sources generate phone leads." },
  { term: "Conversion Window", definition: "The period of time after a user interacts with an ad during which a conversion is attributed to that ad, typically 7 to 30 days." },
  { term: "Cost Per Lead (CPL)", definition: "The average cost of generating a single lead through a marketing campaign, calculated by dividing total spend by the number of leads generated." },
  { term: "Crawl Budget", definition: "The number of pages a search engine bot will crawl on a website within a given timeframe, which affects how quickly new content is indexed." },
  { term: "Cross-Channel Marketing", definition: "A strategy that delivers a consistent, connected customer experience across multiple marketing channels, including web, email, social, and mobile." },
  { term: "Direct Traffic", definition: "Website visits where the user typed the URL directly into their browser or used a bookmark, with no referring source tracked in analytics." },
  { term: "Dwell Time", definition: "The amount of time a user spends on a page after clicking a search result before returning to the search results page." },
  { term: "Email Deliverability", definition: "The ability of an email to reach the recipient's inbox rather than being filtered into spam or blocked by the email service provider." },
  { term: "Exit Rate", definition: "The percentage of visitors who leave a website from a specific page, calculated as exits from that page divided by total pageviews." },
  { term: "Google Consent Mode", definition: "A framework that adjusts how Google tags behave based on the consent status of users, helping maintain measurement while respecting privacy choices." },
  { term: "Impression Share", definition: "The percentage of impressions an ad received compared to the total number of impressions it was eligible for in Google Ads." },
  { term: "Internal Linking", definition: "The practice of linking from one page on a website to another page on the same site, distributing page authority and helping users navigate." },
  { term: "Keyword Difficulty", definition: "A metric that estimates how hard it would be to rank in the top organic search results for a specific keyword, based on competitor analysis." },
  { term: "Marketing Mix Modeling (MMM)", definition: "A statistical analysis technique that measures the impact of various marketing activities on sales or conversions to optimize budget allocation." },
  { term: "Mobile-First Indexing", definition: "Google's approach of using the mobile version of a website's content for indexing and ranking, reflecting the majority of users searching on mobile devices." },
  { term: "Negative Keywords", definition: "Keywords that prevent an ad from being triggered by certain search terms, used in PPC campaigns to filter out irrelevant traffic and reduce wasted spend." },
  { term: "Organic Reach", definition: "The total number of unique users who see content without paid promotion, determined by platform algorithms and audience engagement." },
  { term: "Performance Marketing", definition: "A digital marketing strategy where advertisers pay only for measurable results such as clicks, leads, or sales, rather than for impressions or reach." },
  { term: "Referral Traffic", definition: "Website visitors who arrive by clicking a link on another website, rather than from a search engine, direct visit, or social media platform." },
  { term: "Session Duration", definition: "The total length of time a user spends on a website during a single visit, from their first page load to their last interaction." },
  { term: "Above the Fold", definition: "The portion of a web page that is visible without scrolling. Placing key content and CTAs above the fold can increase engagement and conversions." },
  { term: "Ad Rank", definition: "A value used by Google Ads to determine ad position, calculated from bid amount, quality score, ad extensions, and expected click-through rate." },
  { term: "Alt Text", definition: "Descriptive text added to images in HTML that helps search engines understand the image content and provides accessibility for screen reader users." },
  { term: "Anchor Text", definition: "The clickable text in a hyperlink. Search engines use anchor text to understand the context and relevance of the linked page." },
  { term: "Behavioral Targeting", definition: "An advertising technique that uses data about a user's browsing history, search queries, and online behavior to deliver relevant ads." },
  { term: "Bottom of Funnel (BOFU)", definition: "The decision stage of the marketing funnel where prospects are ready to purchase. Content here includes demos, free trials, case studies, and pricing pages." },
  { term: "Brand Awareness", definition: "The extent to which consumers recognize and remember a brand. Measured through surveys, share of voice, search volume, and social mentions." },
  { term: "Click-to-Open Rate (CTOR)", definition: "An email metric that measures clicks as a percentage of opens, indicating how effective the email content is at driving action after being opened." },
  { term: "Cohort Analysis", definition: "A method of analyzing user behavior by grouping users who share a common characteristic or experience within a defined time period." },
  { term: "Content Management System (CMS)", definition: "Software used to create, manage, and modify digital content on a website without requiring specialized technical knowledge. Examples include WordPress and Shopify." },
  { term: "Cost Per View (CPV)", definition: "A pricing model for video advertising where the advertiser pays each time their video ad is viewed, typically used on platforms like YouTube." },
  { term: "Customer Retention Rate", definition: "The percentage of customers who continue doing business with a company over a given period, indicating loyalty and satisfaction." },
  { term: "Digital Asset Management (DAM)", definition: "A system for organizing, storing, and distributing digital files like images, videos, and documents used in marketing campaigns." },
  { term: "Domain Name System (DNS)", definition: "The system that translates human-readable domain names into IP addresses, affecting website loading speed and availability." },
  { term: "Drip Campaign", definition: "An automated email marketing strategy that sends a series of pre-written messages to subscribers over time, triggered by specific actions or timelines." },
  { term: "Dynamic Content", definition: "Website or email content that changes automatically based on user data, behavior, preferences, or location to deliver a personalized experience." },
  { term: "Google Ad Grants", definition: "A program that provides eligible nonprofit organizations up to $10,000 per month in free Google Search advertising to promote their mission." },
  { term: "Gated Content", definition: "Digital content that requires users to provide contact information (typically through a form) before they can access it, used for lead generation." },
  { term: "Geo-Fencing", definition: "A location-based marketing technology that triggers actions (like ads or notifications) when a mobile device enters a defined geographic area." },
  { term: "Influencer Marketing", definition: "A strategy that partners with individuals who have significant social media followings to promote products or services to their engaged audience." },
  { term: "Landing Page Optimization", definition: "The process of improving elements on a landing page to increase the percentage of visitors who complete the desired conversion action." },
  { term: "Multi-Touch Attribution", definition: "An attribution model that distributes credit for a conversion across multiple marketing touchpoints that a customer interacted with before converting." },
  { term: "Open Rate", definition: "The percentage of delivered emails that were opened by recipients. A key email marketing metric affected by subject lines, sender reputation, and timing." },
  { term: "Responsive Design", definition: "A web design approach that makes pages render well on all screen sizes by using flexible layouts, images, and CSS media queries." },
  { term: "Robots.txt", definition: "A text file placed in a website's root directory that tells search engine crawlers which pages or sections they can or cannot index." },
  { term: "Agentic AI", definition: "AI systems that can autonomously execute multi-step marketing tasks like campaign optimization, content scheduling, and bid management without continuous human input." },
  { term: "Answer Engine", definition: "An AI-powered search tool that provides direct answers to questions rather than a list of links. Examples include Google AI Overviews and ChatGPT." },
  { term: "Brand Lift", definition: "The measurable increase in brand awareness, perception, or favorability resulting from an advertising campaign, typically measured through surveys." },
  { term: "CDP (Customer Data Platform)", definition: "A system that consolidates customer data from multiple sources into a single unified database, enabling personalized marketing across channels." },
  { term: "Churn Rate", definition: "The percentage of customers who stop using a product or service during a given time period. The inverse of customer retention rate." },
  { term: "Consent Management Platform", definition: "Software that manages user consent for data collection and cookie tracking in compliance with privacy regulations like GDPR and CCPA." },
  { term: "Content Decay", definition: "The gradual decline in organic traffic and rankings for a piece of content over time as it becomes outdated or competitors publish better content." },
  { term: "Conversion API (CAPI)", definition: "A server-side tracking method that sends conversion data directly from your server to ad platforms like Meta and Google, bypassing browser-based tracking limitations." },
  { term: "Core Web Vitals", definition: "A set of specific metrics that Google uses to measure user experience on web pages, including Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS)." },
  { term: "Customer Lifetime Value (CLV)", definition: "The total revenue a business can expect from a single customer account throughout the entire duration of the business relationship." },
  { term: "Dark Social", definition: "The sharing of content through private channels such as messaging apps, email, and direct messages where referral data is not tracked by analytics tools." },
  { term: "First-Party Data", definition: "Data collected directly from your own audience through your website, app, CRM, or other owned channels. Considered the most valuable and privacy-compliant data type." },
  { term: "GA4 (Google Analytics 4)", definition: "The current version of Google Analytics that uses an event-based measurement model instead of session-based, with built-in machine learning and cross-platform tracking." },
  { term: "Incrementality Testing", definition: "A method of measuring the true causal impact of a marketing campaign by comparing outcomes between a test group exposed to the campaign and a control group that was not." },
  { term: "Intent Data", definition: "Behavioral data that indicates a prospect's likelihood of making a purchase based on their online research activities, content consumption, and search patterns." },
  { term: "Marketing Mix Modeling (MMM)", definition: "A statistical analysis technique that measures the impact of various marketing activities on sales and other business outcomes to optimize budget allocation." },
  { term: "Performance Max", definition: "A Google Ads campaign type that uses AI to optimize ad placements across all Google channels including Search, Display, YouTube, Gmail, and Maps from a single campaign." },
  { term: "Programmatic Advertising", definition: "The automated buying and selling of digital advertising space using AI and real-time bidding, enabling more efficient and targeted ad placement at scale." },
  { term: "Schema Markup", definition: "A structured data vocabulary added to website HTML that helps search engines understand the content and display enhanced results like rich snippets, ratings, and FAQs." },
  { term: "Search Generative Experience (SGE)", definition: "Google's AI-powered search feature that generates comprehensive answers at the top of search results, drawing from multiple sources to answer complex queries." },
  { term: "Server-Side Tracking", definition: "A method of collecting and processing website analytics data on the server rather than in the browser, providing more reliable data collection that is less affected by ad blockers and cookie restrictions." },
  { term: "Social Proof", definition: "A psychological principle used in marketing where people follow the actions and decisions of others. Includes reviews, testimonials, case studies, user counts, and trust badges." },
  { term: "Topic Cluster", definition: "A content strategy model that organizes content around a central pillar page linked to related cluster pages, establishing topical authority and improving SEO." },
  { term: "Zero-Click Search", definition: "A search query where the answer is displayed directly in the search results page, so the user does not need to click through to any website." },
  { term: "Zero-Party Data", definition: "Data that a customer intentionally and proactively shares with a brand, such as preferences, purchase intentions, and feedback given through surveys or preference centers." },
];

export default function GlossaryPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: glossaryTerms.map((item) => ({
      "@type": "Question",
      name: `What is ${item.term}?`,
      acceptedAnswer: { "@type": "Answer", text: item.definition },
    })),
  };

  const letters = [...new Set(glossaryTerms.map((t) => t.term[0].toUpperCase()))].sort();

  return (
    <article>
      <JsonLd data={faqSchema} />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Glossary" }]} />

      <section className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Resources</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Digital Marketing Glossary
            </h1>
            <SectionDesc>
              A comprehensive reference for the key terms and acronyms used in digital marketing, SEO, PPC, analytics, and more.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 pb-4">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <div className="flex flex-wrap gap-2">
              {letters.map((letter) => (
                <a
                  key={letter}
                  href={`#letter-${letter}`}
                  className="w-10 h-10 flex items-center justify-center border border-gray-200 text-base font-bold text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  {letter}
                </a>
              ))}
            </div>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-12" aria-label="Glossary terms">
        <div className="max-w-4xl mx-auto">
          {letters.map((letter) => {
            const termsForLetter = glossaryTerms.filter((t) => t.term[0].toUpperCase() === letter);
            return (
              <div key={letter} id={`letter-${letter}`} className="mb-12">
                <Animate animation="fade-up">
                  <h2 className="font-[family-name:var(--font-display)] text-3xl font-extrabold text-black/10 mb-4 border-b border-gray-200 pb-2">
                    {letter}
                  </h2>
                </Animate>
                <div className="space-y-6">
                  {termsForLetter.map((item) => (
                    <Animate key={item.term} animation="fade-up">
                      <div>
                        <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black mb-1">{item.term}</h3>
                        <p className="text-base text-gray-500 leading-relaxed">{item.definition}</p>
                      </div>
                    </Animate>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Need Help With Your Marketing?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Understanding the terminology is step one. Let us help you put it into action.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none">
              Get a Free Consultation &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    </article>
  );
}
