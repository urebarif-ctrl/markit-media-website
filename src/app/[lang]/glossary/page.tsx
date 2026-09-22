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
  openGraph: {
    title: "Digital Marketing Glossary",
    description: "300 marketing terms explained: SEO, PPC, social media, content marketing, analytics, and more.",
  },
};

const glossaryTerms = [
  { term: "A/B Testing", definition: "A method of comparing two versions of a webpage, email, or ad to determine which performs better. Also known as split testing." },
  { term: "Above the Fold", definition: "The portion of a web page that is visible without scrolling. Placing key content and CTAs above the fold can increase engagement and conversions." },
  { term: "Account-Based Marketing (ABM)", definition: "A B2B marketing strategy that focuses resources on a specific set of target accounts, using personalized campaigns designed to engage each account individually." },
  { term: "Ad Exchange", definition: "A digital marketplace that enables advertisers and publishers to buy and sell advertising space through real-time auctions." },
  { term: "Ad Fatigue", definition: "The decline in ad performance that occurs when an audience sees the same advertisement too many times, leading to lower engagement and higher costs." },
  { term: "Ad Frequency", definition: "The average number of times a unique user sees a particular ad within a given time period. High frequency can lead to ad fatigue." },
  { term: "Ad Inventory", definition: "The total amount of ad space or ad placements available for sale on a website, app, or digital platform." },
  { term: "Ad Network", definition: "A company that connects advertisers to websites and apps that want to host advertisements." },
  { term: "Ad Rank", definition: "A value used by Google Ads to determine ad position, calculated from bid amount, quality score, ad extensions, and expected click-through rate." },
  { term: "AEO (Answer Engine Optimization)", definition: "The practice of optimizing content to appear in AI-generated answers, voice search results, and featured snippets in search engines." },
  { term: "Affiliate Marketing", definition: "A performance-based marketing model where businesses reward affiliates for driving traffic or sales through the affiliate's own marketing efforts." },
  { term: "Agentic AI", definition: "AI systems that can autonomously execute multi-step marketing tasks like campaign optimization, content scheduling, and bid management without continuous human input." },
  { term: "Agile Marketing", definition: "An approach to marketing that values rapid iteration, data-driven decisions, and flexibility over long planning cycles." },
  { term: "AI Overview", definition: "An AI-generated summary that appears at the top of Google search results, providing a synthesized answer to the user's query drawn from multiple web sources." },
  { term: "Algorithm", definition: "A set of rules and calculations used by platforms like Google and social media to determine content ranking and visibility." },
  { term: "Alt Text", definition: "Descriptive text added to images in HTML that helps search engines understand the image content and provides accessibility for screen reader users." },
  { term: "Analytics", definition: "The discovery, interpretation, and communication of meaningful patterns in marketing data to inform decisions." },
  { term: "Anchor Text", definition: "The clickable text in a hyperlink. Search engines use anchor text to understand the context and relevance of the linked page." },
  { term: "Answer Engine", definition: "An AI-powered search tool that provides direct answers to questions rather than a list of links. Examples include Google AI Overviews and ChatGPT." },
  { term: "API (Application Programming Interface)", definition: "A set of protocols that allows different software applications to communicate and share data with each other." },
  { term: "Attribution Model", definition: "A framework for determining which marketing touchpoints receive credit for conversions, such as first-click, last-click, or multi-touch models." },
  { term: "Attribution Window", definition: "The time frame after a user interacts with an ad during which a conversion can be credited to that ad. Common windows range from 1 to 30 days." },
  { term: "Audience Segmentation", definition: "The process of dividing a target audience into distinct groups based on shared characteristics such as demographics, behavior, or interests." },
  { term: "Average Order Value (AOV)", definition: "The average amount of money spent each time a customer places an order on a website or app." },
  { term: "B2B Marketing", definition: "Marketing strategies and tactics designed to sell products or services to other businesses rather than individual consumers." },
  { term: "B2C Marketing", definition: "Marketing strategies directed at individual consumers who purchase products or services for personal use." },
  { term: "Backlink", definition: "A link from one website to another. Backlinks from authoritative sites are a key ranking factor in search engine algorithms." },
  { term: "Banner Ad", definition: "A rectangular graphic display ad that stretches across the top, bottom, or sides of a website or app." },
  { term: "Behavioral Targeting", definition: "An advertising technique that uses data about a user's browsing history, search queries, and online behavior to deliver relevant ads." },
  { term: "Below the Fold", definition: "The portion of a webpage that is not visible without scrolling down. Content above the fold is visible immediately." },
  { term: "Bid Strategy", definition: "The approach an advertiser uses to set bids in auction-based advertising platforms, including manual CPC, target CPA, and maximize conversions." },
  { term: "Bottom of Funnel (BOFU)", definition: "The decision stage of the marketing funnel where prospects are ready to purchase. Content here includes demos, free trials, case studies, and pricing pages." },
  { term: "Bounce Rate", definition: "The percentage of visitors who leave a website after viewing only one page without taking any further action." },
  { term: "Brand Ambassador", definition: "A person who represents and promotes a brand, typically through social media and personal endorsements." },
  { term: "Brand Awareness", definition: "The extent to which consumers recognize and remember a brand. Measured through surveys, share of voice, search volume, and social mentions." },
  { term: "Brand Equity", definition: "The commercial value derived from consumer perception of a brand name, rather than from the product or service itself." },
  { term: "Brand Lift", definition: "A measurement of the positive impact an advertising campaign has on a consumer's perception and awareness of a brand." },
  { term: "Brand Recall", definition: "The ability of consumers to remember a brand without any visual or auditory cues, relying solely on memory." },
  { term: "Breadcrumb Navigation", definition: "A secondary navigation aid that shows users their location within a website's hierarchy, improving UX and helping search engines understand site structure." },
  { term: "Burn Rate", definition: "The rate at which a company spends its marketing budget over a given period." },
  { term: "Buyer Intent", definition: "Signals that indicate a prospect is actively researching or ready to make a purchase, used in marketing to prioritize high-value leads." },
  { term: "Buyer Journey", definition: "The process a buyer goes through from initial awareness of a problem to making a purchase decision." },
  { term: "Buyer Persona", definition: "A semi-fictional representation of your ideal customer based on research and data about existing customers." },
  { term: "Call to Action (CTA)", definition: "A prompt on a webpage, email, or ad that tells the user to take a specific action like 'Buy Now' or 'Sign Up'." },
  { term: "Call Tracking", definition: "Technology that assigns unique phone numbers to marketing channels or campaigns to measure which sources generate phone leads." },
  { term: "Campaign", definition: "A coordinated series of marketing activities designed to achieve a specific goal within a set timeframe." },
  { term: "Campaign Optimization", definition: "The ongoing process of improving marketing campaign performance through data analysis and strategic adjustments." },
  { term: "Canonical URL", definition: "An HTML element that tells search engines which version of a page is the preferred one when duplicate or similar content exists across multiple URLs." },
  { term: "CDP (Customer Data Platform)", definition: "A system that consolidates customer data from multiple sources into a single unified database, enabling personalized marketing across channels." },
  { term: "Channel Attribution", definition: "The process of identifying which marketing channels contribute to conversions, helping allocate budget to the most effective touchpoints." },
  { term: "Chat Marketing", definition: "Using messaging apps and chatbots to engage with customers, answer questions, and guide them through the sales process." },
  { term: "Churn Rate", definition: "The percentage of customers who stop using a product or service during a given time period, commonly tracked in subscription businesses." },
  { term: "Click Fraud", definition: "The practice of artificially inflating the number of clicks on a pay-per-click ad, usually by competitors or bots, wasting the advertiser's budget." },
  { term: "Click-Through Rate (CTR)", definition: "The percentage of people who click on a link, ad, or email out of the total number who see it." },
  { term: "Click-to-Open Rate (CTOR)", definition: "An email metric that measures clicks as a percentage of opens, indicating how effective the email content is at driving action after being opened." },
  { term: "Cohort Analysis", definition: "A method of analyzing user behavior by grouping users who share a common characteristic or experience within a defined time period." },
  { term: "Cold Email", definition: "An unsolicited email sent to a potential customer with whom you have no prior relationship." },
  { term: "Competitive Intelligence", definition: "The process of gathering and analyzing information about competitors to inform marketing strategy." },
  { term: "Consent Management Platform", definition: "Software that manages user consent for data collection and cookie tracking in compliance with privacy regulations like GDPR and CCPA." },
  { term: "Consent Management Platform (CMP)", definition: "Software that helps websites collect, manage, and store user consent for data collection and cookies." },
  { term: "Consent Rate", definition: "The percentage of website visitors who accept cookies or data collection when presented with a consent dialog." },
  { term: "Content Atomization", definition: "Breaking one large piece of content into many smaller, platform-specific pieces for broader distribution." },
  { term: "Content Cluster", definition: "An SEO strategy where a pillar page covers a broad topic comprehensively, with multiple related cluster pages linking back to it to establish topical authority." },
  { term: "Content Decay", definition: "The gradual decline in organic traffic and rankings for a piece of content over time as it becomes outdated or competitors publish better content." },
  { term: "Content Management System (CMS)", definition: "Software used to create, manage, and modify digital content on a website without requiring specialized technical knowledge. Examples include WordPress and Shopify." },
  { term: "Content Marketing", definition: "A strategic marketing approach focused on creating and distributing valuable, relevant content to attract and retain a target audience." },
  { term: "Content Syndication", definition: "The practice of republishing content on third-party websites to reach a broader audience and drive traffic back to the original source." },
  { term: "Contextual Advertising", definition: "Ads that are served based on the content of the webpage rather than the user's browsing history." },
  { term: "Conversion", definition: "When a website visitor completes a desired action, such as making a purchase, filling out a form, or subscribing to a newsletter." },
  { term: "Conversion API (CAPI)", definition: "A server-side tracking solution that sends conversion events directly from a server to advertising platforms, improving data accuracy and attribution." },
  { term: "Conversion Path", definition: "The series of steps a user takes from first interaction with a brand to completing a conversion." },
  { term: "Conversion Rate", definition: "The percentage of visitors who complete a desired action out of the total number of visitors." },
  { term: "Conversion Window", definition: "The period of time after a user interacts with an ad during which a conversion is attributed to that ad, typically 7 to 30 days." },
  { term: "Cookie", definition: "A small piece of data stored on a user's browser that tracks browsing activity and preferences." },
  { term: "Core Web Vitals", definition: "A set of specific metrics defined by Google that measure the user experience of a web page, including loading speed, interactivity, and visual stability." },
  { term: "Cost Per Acquisition (CPA)", definition: "The average cost of acquiring one new customer through a specific marketing channel or campaign." },
  { term: "Cost Per Click (CPC)", definition: "The amount an advertiser pays each time someone clicks on their advertisement." },
  { term: "Cost Per Lead (CPL)", definition: "The average cost of generating a single lead through a marketing campaign, calculated by dividing total spend by the number of leads generated." },
  { term: "Cost Per Mille (CPM)", definition: "The cost an advertiser pays for one thousand impressions of their advertisement." },
  { term: "Cost Per View (CPV)", definition: "A pricing model for video advertising where the advertiser pays each time their video ad is viewed, typically used on platforms like YouTube." },
  { term: "CPA (Cost Per Acquisition)", definition: "The total cost of acquiring one customer through a specific marketing channel or campaign." },
  { term: "CPC (Cost Per Click)", definition: "The amount paid each time someone clicks on a paid advertisement, commonly used in search and social advertising." },
  { term: "CPM (Cost Per Mille)", definition: "The cost per 1,000 impressions of an advertisement. Used primarily in display and video advertising." },
  { term: "Crawl Budget", definition: "The number of pages a search engine bot will crawl on a website within a given timeframe, which affects how quickly new content is indexed." },
  { term: "Creative Fatigue", definition: "When ad creative stops performing well because the audience has become overly familiar with it, requiring new variations to maintain engagement." },
  { term: "CRM (Customer Relationship Management)", definition: "Software and strategies used to manage interactions and relationships with current and potential customers." },
  { term: "CRO (Conversion Rate Optimization)", definition: "The process of improving a website or landing page to increase the percentage of visitors who complete a desired action." },
  { term: "Cross-Channel Marketing", definition: "A strategy that delivers a consistent, connected customer experience across multiple marketing channels, including web, email, social, and mobile." },
  { term: "Cross-Selling", definition: "The practice of suggesting related or complementary products to a customer who is already making a purchase." },
  { term: "CTR (Click-Through Rate)", definition: "The ratio of users who click on a link compared to the total number who viewed it, expressed as a percentage." },
  { term: "Customer Acquisition Cost (CAC)", definition: "The total cost of sales and marketing efforts needed to acquire a new customer, calculated by dividing total spend by the number of new customers." },
  { term: "Customer Advocacy", definition: "A strategy that turns satisfied customers into vocal supporters who recommend the brand to others." },
  { term: "Customer Data Platform (CDP)", definition: "A software system that collects and unifies customer data from multiple sources into a single database, enabling personalized marketing across channels." },
  { term: "Customer Effort Score (CES)", definition: "A metric that measures how much effort customers must exert to use a product, resolve an issue, or complete a task." },
  { term: "Customer Journey Mapping", definition: "The process of creating a visual representation of every experience customers have with a brand." },
  { term: "Customer Lifetime Value (CLV)", definition: "The total revenue a business can expect from a single customer account throughout the entire duration of the business relationship." },
  { term: "Customer Retention Rate", definition: "The percentage of customers who continue doing business with a company over a given period, indicating loyalty and satisfaction." },
  { term: "Customer Satisfaction Score (CSAT)", definition: "A metric that measures how products and services meet customer expectations, typically on a 1-5 scale." },
  { term: "Dark Funnel", definition: "Invisible touchpoints and interactions that influence purchase decisions but cannot be tracked by traditional analytics." },
  { term: "Dark Social", definition: "Web traffic that comes from private sharing channels like messaging apps, email, and direct messages, which are difficult to track in analytics." },
  { term: "Data Clean Room", definition: "A secure environment where multiple parties can share and analyze data without exposing individual-level information, used for privacy-safe advertising measurement." },
  { term: "Data-Driven Marketing", definition: "Using data analysis and insights to guide marketing strategy, targeting, and creative decisions." },
  { term: "Deep Linking", definition: "Links that direct users to specific pages or content within an app rather than the app's home screen." },
  { term: "Demand Generation", definition: "Marketing activities focused on creating awareness and interest in a company's products or services, typically in B2B marketing." },
  { term: "Demand Side Platform (DSP)", definition: "A software platform that allows advertisers to buy digital advertising inventory programmatically." },
  { term: "Digital Asset Management (DAM)", definition: "A system for organizing, storing, and distributing digital files like images, videos, and documents used in marketing campaigns." },
  { term: "Digital PR", definition: "Online PR activities aimed at increasing brand awareness, earning backlinks, and improving search visibility." },
  { term: "Direct Traffic", definition: "Website visits where the user typed the URL directly into their browser or used a bookmark, with no referring source tracked in analytics." },
  { term: "Display Advertising", definition: "Visual-based online advertising that appears on websites, apps, and social media in the form of banners, images, or video." },
  { term: "Domain Authority", definition: "A search engine ranking score developed by Moz that predicts how likely a website is to rank in search engine results." },
  { term: "Domain Authority (DA)", definition: "A search engine ranking score that predicts how likely a website is to rank on search engine results pages." },
  { term: "Domain Name System (DNS)", definition: "The system that translates human-readable domain names into IP addresses, affecting website loading speed and availability." },
  { term: "Drip Campaign", definition: "An automated email marketing strategy that sends a series of pre-written messages to subscribers over time, triggered by specific actions or timelines." },
  { term: "Dwell Time", definition: "The amount of time a user spends on a page after clicking a search result before returning to the search results page." },
  { term: "Dynamic Content", definition: "Website or email content that changes automatically based on user data, behavior, preferences, or location to deliver a personalized experience." },
  { term: "Dynamic Creative Optimization (DCO)", definition: "An advertising technology that automatically creates personalized ad variations based on user data such as location, behavior, and demographics." },
  { term: "E-E-A-T", definition: "Experience, Expertise, Authoritativeness, and Trustworthiness — quality signals Google uses to evaluate content credibility for search rankings." },
  { term: "Earned Media", definition: "Publicity gained through promotional efforts other than paid advertising, such as PR, reviews, or social shares." },
  { term: "Email Deliverability", definition: "The ability of an email to reach the recipient's inbox rather than being filtered into spam or blocked by the email service provider." },
  { term: "Email List Hygiene", definition: "The practice of regularly cleaning and maintaining an email list by removing inactive, invalid, or unengaged subscribers." },
  { term: "Email Open Rate", definition: "The percentage of email recipients who open a particular email out of the total number of emails delivered." },
  { term: "Engagement Rate", definition: "A metric that measures the level of interaction an audience has with content, typically calculated as interactions divided by impressions or followers." },
  { term: "Event-Driven Marketing", definition: "Triggering marketing messages based on specific user actions or events rather than on a fixed schedule." },
  { term: "Evergreen Content", definition: "Content that remains relevant and valuable over time, continuing to drive traffic and engagement long after its initial publication date." },
  { term: "Exit Intent Popup", definition: "A popup that appears when a visitor is about to leave a website, detected by mouse movement toward the browser close button or tab." },
  { term: "Exit Rate", definition: "The percentage of visitors who leave a website from a specific page, calculated as exits from that page divided by total pageviews." },
  { term: "Feature Flag", definition: "A technique used to enable or disable features in a product without deploying new code." },
  { term: "Featured Snippet", definition: "A summarized answer to a search query displayed at the top of Google search results, above the regular organic listings." },
  { term: "First-Party Data", definition: "Data collected directly from your own audience or customers, including website behavior, purchase history, and CRM data." },
  { term: "First-Party Data Strategy", definition: "A plan for collecting, managing, and activating data gathered directly from your own customers and audiences." },
  { term: "Flywheel Model", definition: "A business model that replaces the traditional sales funnel, focusing on using customer momentum to drive referrals and repeat business in a self-sustaining cycle." },
  { term: "Frequency Capping", definition: "Limiting the number of times a specific ad is shown to an individual user within a given time period." },
  { term: "Full-Funnel Marketing", definition: "An approach that addresses every stage of the customer journey from awareness through advocacy." },
  { term: "Funnel", definition: "The journey a potential customer takes from first awareness of a product or service to making a purchase decision." },
  { term: "GA4 (Google Analytics 4)", definition: "Google's analytics platform that uses an event-based data model to track user interactions across websites and apps." },
  { term: "Gated Content", definition: "Digital content that requires users to provide contact information (typically through a form) before they can access it, used for lead generation." },
  { term: "Geo-Fencing", definition: "A location-based marketing technology that triggers actions (like ads or notifications) when a mobile device enters a defined geographic area." },
  { term: "Geo-Targeting", definition: "Delivering different content or advertisements to users based on their geographic location, from country-level to hyperlocal targeting." },
  { term: "Geotargeting", definition: "The practice of delivering content or ads to users based on their geographic location, from country level down to ZIP code or GPS coordinates." },
  { term: "Go-to-Market (GTM) Strategy", definition: "A plan that details how a company will launch a product or service to market, including target audience, messaging, pricing, and distribution channels." },
  { term: "Go-to-Market Strategy (GTM)", definition: "A plan that details how a company will launch a product or service and reach its target customers." },
  { term: "Google Ad Grants", definition: "A program that provides eligible nonprofit organizations up to $10,000 per month in free Google Search advertising to promote their mission." },
  { term: "Google Business Profile", definition: "A free tool from Google that allows businesses to manage their online presence across Google Search and Maps." },
  { term: "Google Consent Mode", definition: "A framework that adjusts how Google tags behave based on the consent status of users, helping maintain measurement while respecting privacy choices." },
  { term: "Google Tag Manager (GTM)", definition: "A free tag management system that allows marketers to deploy and manage tracking tags on a website without modifying code directly." },
  { term: "Growth Hacking", definition: "A marketing approach focused on rapid experimentation across channels and product development to identify the most effective ways to grow a business." },
  { term: "Growth Loop", definition: "A self-reinforcing marketing mechanism where the output of one step feeds into the input of the next, creating compounding growth without linear investment." },
  { term: "Growth Marketing", definition: "A data-driven marketing approach focused on the full funnel, using rapid experimentation to find the most effective ways to grow." },
  { term: "Guerrilla Marketing", definition: "Unconventional marketing tactics designed to get maximum results from minimal resources, often relying on surprise or creativity." },
  { term: "Hashtag", definition: "A word or phrase preceded by the pound sign (#) used on social media to categorize content and improve discoverability." },
  { term: "Header Bidding", definition: "An advanced programmatic advertising technique where multiple ad exchanges bid on inventory simultaneously before the ad server makes a decision." },
  { term: "Header Tag", definition: "HTML tags (H1-H6) used to define headings and subheadings on a webpage, important for both SEO and content structure." },
  { term: "Heatmap", definition: "A visual representation of data showing where users click, scroll, and move their mouse on a webpage, used to optimize design and conversions." },
  { term: "Hero Image", definition: "A large banner image prominently placed at the top of a webpage, often the first visual element visitors see." },
  { term: "Ideal Customer Profile (ICP)", definition: "A detailed description of the type of company or individual that would get the most value from your product or service, used to focus marketing and sales efforts." },
  { term: "Impression", definition: "A single instance of an advertisement or piece of content being displayed to a user." },
  { term: "Impression Share", definition: "The percentage of impressions an ad received compared to the total number of impressions it was eligible for in Google Ads." },
  { term: "Impressions", definition: "The number of times an ad, post, or piece of content is displayed to users, regardless of whether it was clicked." },
  { term: "In-App Messaging", definition: "Messages displayed to users while they are actively using a mobile app or web application." },
  { term: "Inbound Marketing", definition: "A marketing methodology that attracts customers through relevant content and experiences rather than interruptive advertising." },
  { term: "Incrementality Testing", definition: "A method of measuring the true causal impact of a marketing campaign by comparing outcomes between a test group exposed to the campaign and a control group that was not." },
  { term: "Influencer", definition: "An individual with the power to affect purchase decisions of others because of their authority, knowledge, or relationship with their audience." },
  { term: "Influencer Marketing", definition: "A strategy that partners with individuals who have significant social media followings to promote products or services to their engaged audience." },
  { term: "Intent Data", definition: "Information about a prospect's online behavior that signals their interest in a product, service, or topic, used to prioritize outreach and personalize messaging." },
  { term: "Internal Linking", definition: "The practice of linking from one page on a website to another page on the same site, distributing page authority and helping users navigate." },
  { term: "Jobs To Be Done (JTBD)", definition: "A framework that focuses on understanding the tasks customers are trying to accomplish, rather than demographics, to inform product development and marketing." },
  { term: "Jobs to Be Done (JTBD)", definition: "A framework that focuses on the underlying goals customers are trying to achieve when they use a product or service." },
  { term: "Journey Orchestration", definition: "Using data and automation to deliver personalized, connected experiences across all customer touchpoints." },
  { term: "JSON-LD", definition: "A JavaScript-based format for structured data that helps search engines understand page content and display enhanced search results." },
  { term: "Keyword Cannibalization", definition: "When multiple pages on the same website target the same keyword, causing them to compete against each other in search rankings." },
  { term: "Keyword Difficulty", definition: "A metric that estimates how hard it would be to rank in the top organic search results for a specific keyword, based on competitor analysis." },
  { term: "Keyword Research", definition: "The process of discovering and analyzing search terms that people enter into search engines to guide content strategy." },
  { term: "Keyword Stuffing", definition: "The practice of overloading a webpage with keywords in an attempt to manipulate search rankings, considered a black-hat SEO tactic." },
  { term: "KPI (Key Performance Indicator)", definition: "A measurable value that demonstrates how effectively a company is achieving key business objectives." },
  { term: "Landing Page", definition: "A standalone web page designed specifically for a marketing or advertising campaign, focused on a single conversion goal." },
  { term: "Landing Page Optimization", definition: "The process of improving elements on a landing page to increase the percentage of visitors who complete the desired conversion action." },
  { term: "Last Click Attribution", definition: "An attribution model that gives 100% of the conversion credit to the last touchpoint before conversion." },
  { term: "Lead", definition: "A person or organization that has shown interest in a product or service and has the potential to become a customer." },
  { term: "Lead Magnet", definition: "A free resource offered to potential customers in exchange for their contact information, such as an ebook, checklist, or webinar." },
  { term: "Lead Nurturing", definition: "The process of developing relationships with potential customers at every stage of the sales funnel through targeted content." },
  { term: "Lead Scoring", definition: "A methodology for ranking prospects based on their perceived value to the organization, using demographic data and behavioral signals to prioritize sales follow-up." },
  { term: "Lifecycle Marketing", definition: "A strategy that targets customers with relevant messaging at each stage of their journey, from awareness through purchase to advocacy and retention." },
  { term: "Link Building", definition: "The process of acquiring hyperlinks from other websites to your own, used to improve search engine rankings and drive referral traffic." },
  { term: "Local SEO", definition: "The process of optimizing a business's online presence to attract customers from relevant local searches on Google and other search engines." },
  { term: "Long-Tail Keyword", definition: "A search phrase that is longer and more specific than common keywords, typically with lower search volume but higher conversion rates." },
  { term: "Lookalike Audience", definition: "A targeting option in advertising platforms that finds new users similar to your existing customers, based on shared demographics and behaviors." },
  { term: "Lookalike Modeling", definition: "Using data from existing customers to find new prospects with similar characteristics and behaviors." },
  { term: "LTV (Lifetime Value)", definition: "The total revenue a business can expect from a single customer account throughout their entire relationship." },
  { term: "Marketing Automation", definition: "Technology that manages marketing processes and campaigns automatically across multiple channels, including email, social, and web." },
  { term: "Marketing Cloud", definition: "A suite of integrated marketing technology tools offered by a single vendor for managing multichannel campaigns." },
  { term: "Marketing Funnel", definition: "A model that illustrates the theoretical customer journey from first awareness of a brand to the final purchase." },
  { term: "Marketing Intelligence", definition: "Data and insights gathered about market trends, competitors, and customers to guide strategic decisions." },
  { term: "Marketing Mix Modeling (MMM)", definition: "A statistical analysis technique that measures the impact of various marketing activities on sales or conversions to optimize budget allocation." },
  { term: "Marketing Operations (MOps)", definition: "The processes, technology, and data management that support marketing teams' efficiency and effectiveness." },
  { term: "Marketing Qualified Lead (MQL)", definition: "A lead that has been identified as more likely to become a customer based on their engagement with marketing content and activities." },
  { term: "Media Buying", definition: "The process of purchasing advertising space and time on digital and offline platforms." },
  { term: "Meta Description", definition: "An HTML element that provides a brief summary of a web page's content, displayed in search engine results pages." },
  { term: "Meta Tags", definition: "HTML tags that provide information about a webpage to search engines and website visitors, including title and description tags." },
  { term: "Micro-Conversion", definition: "A smaller action a user takes that indicates progress toward a primary conversion goal, such as viewing a pricing page, downloading a resource, or adding an item to cart." },
  { term: "Middle of Funnel (MOFU)", definition: "The consideration stage where potential customers are evaluating their options and comparing solutions." },
  { term: "Minimum Viable Campaign", definition: "The simplest version of a marketing campaign that can be launched to test a hypothesis before investing more resources." },
  { term: "Mobile-First Indexing", definition: "Google's approach of using the mobile version of a website's content for indexing and ranking, reflecting the majority of users searching on mobile devices." },
  { term: "Multi-Channel Marketing", definition: "Using multiple marketing channels simultaneously to reach customers wherever they are." },
  { term: "Multi-Touch Attribution", definition: "An attribution model that distributes credit for a conversion across multiple marketing touchpoints that a customer interacted with before converting." },
  { term: "Native Advertising", definition: "Paid advertising that matches the look, feel, and function of the media format in which it appears, blending in with surrounding content." },
  { term: "Negative Keywords", definition: "Keywords that prevent an ad from being triggered by certain search terms, used in PPC campaigns to filter out irrelevant traffic and reduce wasted spend." },
  { term: "Net Promoter Score (NPS)", definition: "A customer loyalty metric measured by asking customers how likely they are to recommend a product or service on a scale of 0-10." },
  { term: "Nofollow Link", definition: "A link attribute that tells search engines not to pass authority or PageRank to the linked page." },
  { term: "Nurture Sequence", definition: "A series of automated communications designed to move prospects through the buying journey over time." },
  { term: "Omnichannel Attribution", definition: "Tracking and crediting conversions across all channels, both online and offline, in a unified view." },
  { term: "Omnichannel Marketing", definition: "A cross-channel approach that provides a seamless customer experience across all touchpoints, including online, in-store, and mobile." },
  { term: "Open Rate", definition: "The percentage of delivered emails that were opened by recipients. A key email marketing metric affected by subject lines, sender reputation, and timing." },
  { term: "Organic Reach", definition: "The total number of unique users who see content without paid promotion, determined by platform algorithms and audience engagement." },
  { term: "Organic Search", definition: "Search results that are earned through SEO efforts rather than through paid advertising." },
  { term: "Organic Traffic", definition: "Visitors who arrive at a website through unpaid search engine results, as opposed to paid advertising." },
  { term: "Outbound Marketing", definition: "Traditional marketing where a company initiates the conversation and sends its message out to an audience through ads, cold calls, direct mail, and trade shows." },
  { term: "Owned Media", definition: "Marketing channels that a business controls entirely, such as its website, blog, email list, and social media profiles, as opposed to paid or earned media." },
  { term: "Page Authority", definition: "A score that predicts how well a specific page will rank on search engine results pages." },
  { term: "Page Speed", definition: "The measurement of how quickly content on a web page loads, which affects both user experience and search engine rankings." },
  { term: "Paid Media", definition: "Marketing channels where you pay to reach an audience, including PPC ads, display ads, and sponsored content." },
  { term: "Pay-Per-Click (PPC)", definition: "An online advertising model where advertisers pay a fee each time one of their ads is clicked." },
  { term: "Performance Marketing", definition: "A digital marketing strategy where advertisers pay only for measurable results such as clicks, leads, or sales, rather than for impressions or reach." },
  { term: "Performance Max", definition: "A Google Ads campaign type that uses AI to optimize ad placements across all Google channels including Search, Display, YouTube, Gmail, and Maps from a single campaign." },
  { term: "Personalization", definition: "The practice of tailoring marketing content, product recommendations, and experiences to individual users based on their behavior, preferences, and data." },
  { term: "Pillar Page", definition: "A comprehensive, long-form page that covers a broad topic in depth and links to related cluster content, serving as the hub of a topic cluster strategy." },
  { term: "Pipeline Marketing", definition: "A marketing approach that focuses on generating and progressing leads through the sales pipeline." },
  { term: "Pixel", definition: "A snippet of code placed on a website that collects data about user behavior for ad targeting and conversion tracking." },
  { term: "PPC (Pay-Per-Click)", definition: "An advertising model where advertisers pay a fee each time their ad is clicked. Google Ads is the most common PPC platform." },
  { term: "Predictive Analytics", definition: "The use of historical data, machine learning, and statistical algorithms to forecast future marketing outcomes, customer behavior, and campaign performance." },
  { term: "Predictive Lead Scoring", definition: "Using machine learning algorithms to predict which leads are most likely to convert based on historical data." },
  { term: "Product-Led Growth (PLG)", definition: "A business strategy where the product itself drives customer acquisition, conversion, and expansion, often through free trials, freemium models, and in-product onboarding." },
  { term: "Programmatic Advertising", definition: "The automated buying and selling of digital advertising using software and algorithms, rather than manual negotiation and insertion orders." },
  { term: "Programmatic Display", definition: "Automated buying of display advertising inventory through real-time bidding, using algorithms to target specific audiences across websites and apps." },
  { term: "Push Notification", definition: "A message sent directly to a user's device from an app or website, even when the app is not in use." },
  { term: "Quality Score", definition: "A Google Ads metric that rates the quality and relevance of keywords, ads, and landing pages, affecting cost-per-click and ad position." },
  { term: "Real-Time Bidding (RTB)", definition: "An automated auction process where ad impressions are bought and sold in real time as a webpage loads." },
  { term: "Referral Traffic", definition: "Website visitors who arrive by clicking a link on another website, rather than from a search engine, direct visit, or social media platform." },
  { term: "Remarketing", definition: "A digital advertising strategy that shows targeted ads to people who have previously visited your website or used your mobile app." },
  { term: "Remarketing List", definition: "A collection of website visitors or app users that can be targeted with tailored advertising campaigns based on their previous interactions." },
  { term: "Responsive Design", definition: "A web design approach that makes pages render well on all screen sizes by using flexible layouts, images, and CSS media queries." },
  { term: "Retargeting", definition: "A form of online advertising that targets users who have previously visited a website or interacted with a brand." },
  { term: "Retargeting Pixel", definition: "A piece of code placed on a website that drops a cookie in a visitor's browser to enable retargeting ads." },
  { term: "Revenue Attribution", definition: "The process of identifying which marketing touchpoints contributed to a sale or conversion, enabling marketers to allocate budget to the most effective channels." },
  { term: "Revenue Marketing", definition: "A marketing strategy that directly ties marketing activities and investments to revenue outcomes." },
  { term: "Revenue Operations (RevOps)", definition: "An organizational function that aligns marketing, sales, and customer success operations to drive predictable revenue growth through shared data and processes." },
  { term: "Revenue Per Click (RPC)", definition: "The average revenue generated per click on an ad or link, calculated by dividing total revenue by total clicks." },
  { term: "Rich Snippet", definition: "Enhanced search results that display additional information beyond the standard title, URL, and description." },
  { term: "ROAS (Return on Ad Spend)", definition: "A marketing metric that measures the revenue earned for every dollar spent on advertising." },
  { term: "Robots.txt", definition: "A text file placed in a website's root directory that tells search engine crawlers which pages or sections they can or cannot index." },
  { term: "ROI (Return on Investment)", definition: "A measure of the profitability of an investment, calculated as the net profit divided by the cost of the investment." },
  { term: "SaaS Marketing", definition: "Marketing strategies specifically designed for software-as-a-service companies, focusing on free trials, demos, content marketing, and reducing churn." },
  { term: "Sales Qualified Lead (SQL)", definition: "A prospect that has been vetted by the sales team and meets specific criteria indicating readiness to enter the sales process and potentially make a purchase." },
  { term: "Schema Markup", definition: "A form of structured data added to a website's HTML that helps search engines understand the content and display rich results." },
  { term: "Search Generative Experience (SGE)", definition: "Google's AI-powered search feature that generates comprehensive answers at the top of search results, drawing from multiple sources to answer complex queries." },
  { term: "Search Intent", definition: "The underlying purpose behind a search query — whether the user wants information, wants to navigate to a site, or wants to make a purchase." },
  { term: "Search Volume", definition: "The number of times a particular keyword is searched for in a given time period, typically monthly." },
  { term: "Segmentation", definition: "Dividing a broad audience into smaller groups based on shared characteristics for more targeted marketing." },
  { term: "SEM (Search Engine Marketing)", definition: "The practice of marketing a business using paid advertisements that appear on search engine results pages." },
  { term: "Sentiment Analysis", definition: "The use of natural language processing to determine whether online mentions and reviews express positive, negative, or neutral feelings about a brand." },
  { term: "SEO (Search Engine Optimization)", definition: "The practice of improving a website's visibility and ranking in organic search engine results through technical optimization, content, and link building." },
  { term: "SERP (Search Engine Results Page)", definition: "The page displayed by a search engine in response to a user's query, containing organic results, ads, and features like snippets." },
  { term: "Server-Side Tracking", definition: "A method of collecting analytics data through a server rather than the user's browser, providing more accurate tracking in a cookie-less environment." },
  { term: "Session", definition: "A group of user interactions with a website that take place within a given time frame." },
  { term: "Session Duration", definition: "The total length of time a user spends on a website during a single visit, from their first page load to their last interaction." },
  { term: "Share of Voice (SOV)", definition: "The percentage of total advertising or conversations about a brand compared to its competitors." },
  { term: "Site Map", definition: "A file or page that lists all the URLs on a website, helping search engines discover and crawl content." },
  { term: "Social Commerce", definition: "The use of social media platforms to promote and sell products directly, including features like Instagram Shopping, TikTok Shop, and Facebook Marketplace." },
  { term: "Social Listening", definition: "The practice of monitoring social media platforms for mentions of a brand, competitors, or industry topics to inform marketing strategy." },
  { term: "Social Proof", definition: "The psychological phenomenon where people conform to the actions of others, used in marketing through reviews, testimonials, and user counts." },
  { term: "Social Selling", definition: "Using social media platforms to find, connect with, and nurture sales prospects." },
  { term: "Split Testing", definition: "Another term for A/B testing, comparing two versions of a marketing asset to determine which performs better." },
  { term: "Squeeze Page", definition: "A landing page designed specifically to capture email addresses from visitors, typically offering something in exchange." },
  { term: "Structured Data", definition: "Standardized code format that helps search engines understand and display page content in rich results." },
  { term: "Supply Side Platform (SSP)", definition: "A technology platform that enables publishers to manage and sell their ad inventory programmatically." },
  { term: "Tag Management", definition: "The practice of using a tag management system to deploy and manage marketing and analytics tags without code changes." },
  { term: "Technical SEO", definition: "The process of optimizing a website's infrastructure for search engine crawling and indexing, including site speed, mobile-friendliness, and structured data." },
  { term: "Third-Party Cookie", definition: "A tracking cookie placed on a user's browser by a domain other than the one they are visiting, used for cross-site tracking and targeted advertising, being phased out by major browsers." },
  { term: "Thought Leadership", definition: "Content or activities that position a person or brand as an expert and authority in their industry." },
  { term: "Title Tag", definition: "An HTML element that specifies the title of a web page, displayed in search results and browser tabs. A key on-page SEO factor." },
  { term: "Top of Funnel (TOFU)", definition: "The awareness stage of the marketing funnel, where potential customers first discover a brand through content, ads, or organic search." },
  { term: "Topic Authority", definition: "The perceived expertise a website has on a particular subject, built through comprehensive content coverage and quality backlinks, which influences search rankings." },
  { term: "Topic Cluster", definition: "A content strategy model that organizes content around a central pillar page linked to related cluster pages, establishing topical authority and improving SEO." },
  { term: "Tracking Parameter", definition: "Additional information appended to a URL that helps identify the source, medium, and campaign of traffic." },
  { term: "UGC (User-Generated Content)", definition: "Content created by customers or followers rather than the brand itself, including reviews, social posts, and testimonials." },
  { term: "Unified Marketing Measurement", definition: "An approach that combines multiple measurement methodologies like marketing mix modeling and multi-touch attribution to create a holistic view of marketing performance." },
  { term: "Upselling", definition: "Encouraging customers to purchase a more expensive version of the product they are considering." },
  { term: "User Experience (UX)", definition: "The overall experience a user has when interacting with a product or website, encompassing usability, accessibility, and satisfaction." },
  { term: "User-Generated Content (UGC)", definition: "Content created by customers or fans about a brand, including reviews, social media posts, videos, and testimonials, used as authentic marketing material." },
  { term: "UTM Parameters", definition: "Tags added to URLs to track the effectiveness of marketing campaigns across traffic sources and channels in analytics tools." },
  { term: "Value Proposition", definition: "A clear statement that explains how a product or service solves customer problems, delivers benefits, and differentiates from competitors." },
  { term: "Viral Marketing", definition: "A marketing strategy that relies on individuals sharing a message or content, spreading it rapidly like a virus." },
  { term: "Voice of the Customer (VoC)", definition: "A research methodology that captures customer expectations, preferences, and feedback to inform product development, marketing messaging, and customer experience improvements." },
  { term: "Voice Search Optimization", definition: "The practice of optimizing content to appear in voice search results from assistants like Siri, Alexa, and Google Assistant." },
  { term: "Warm Lead", definition: "A prospect who has shown interest in a product or service through actions like downloading content or attending a webinar." },
  { term: "Webinar", definition: "An online seminar or presentation used as a marketing tool to educate audiences, generate leads, and build authority." },
  { term: "White Paper", definition: "An authoritative report or guide that informs readers about a complex issue and presents a solution or point of view." },
  { term: "XML Sitemap", definition: "A file that lists all the important pages of a website to help search engines discover and index content efficiently." },
  { term: "Yield Management", definition: "A pricing strategy that varies prices based on demand, timing, and customer segment to maximize revenue from a limited resource." },
  { term: "Zero-Click Search", definition: "A search engine results page that answers the user's query directly, without requiring them to click through to any website." },
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

      <section aria-label="Resources" className="px-6 lg:px-12 pt-24 pb-12">
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

      <section aria-label="Content section" className="px-6 lg:px-12 pb-4">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <div className="flex flex-wrap gap-2">
              {letters.map((letter) => (
                <a
                  key={letter}
                  href={`#letter-${letter}`}
                  className="w-10 h-10 flex items-center justify-center border border-gray-200 text-base font-bold text-black hover:bg-black hover:text-white transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
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

      <section className="px-6 lg:px-12 py-12" aria-label="Explore more">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <div className="flex flex-wrap gap-3">
              {[
                { label: "FAQ", href: "/faq" },
                { label: "Blog", href: "/blog" },
                { label: "Resources & Tools", href: "/resources" },
                { label: "All Services", href: "/services" },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="border border-gray-200 px-5 py-3 text-base font-medium text-black hover:bg-black hover:text-white transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                  {link.label}
                </Link>
              ))}
            </div>
          </Animate>
        </div>
      </section>

      <section aria-label="Call to action" className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Need Help With Your Marketing?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Understanding the terminology is step one. Let us help you put it into action.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
              Get a Free Consultation &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    </article>
  );
}
