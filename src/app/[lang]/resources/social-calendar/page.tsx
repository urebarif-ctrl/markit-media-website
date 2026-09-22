"use client";

import { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

/* ------------------------------------------------------------------ */
/*  Types & Constants                                                  */
/* ------------------------------------------------------------------ */

interface CalendarPost {
  day: string;
  date: string;
  platform: string;
  contentType: string;
  idea: string;
  hashtags: string[];
  bestTime: string;
}

interface CalendarWeek {
  weekNumber: number;
  label: string;
  posts: CalendarPost[];
}

const INDUSTRIES = [
  "E-commerce & Retail",
  "Real Estate",
  "Health & Wellness",
  "Technology & SaaS",
  "Food & Restaurant",
  "Professional Services",
  "Education & Training",
  "Beauty & Fashion",
  "Fitness & Sports",
  "Finance & Insurance",
  "Travel & Hospitality",
  "Home Services",
  "Automotive",
  "Non-Profit",
] as const;

const PLATFORMS = [
  { id: "instagram", label: "Instagram" },
  { id: "linkedin", label: "LinkedIn" },
  { id: "facebook", label: "Facebook" },
  { id: "tiktok", label: "TikTok" },
  { id: "x-twitter", label: "X / Twitter" },
  { id: "pinterest", label: "Pinterest" },
] as const;

const GOALS = [
  { id: "brand-awareness", label: "Brand Awareness" },
  { id: "lead-gen", label: "Lead Generation" },
  { id: "engagement", label: "Engagement" },
  { id: "sales", label: "Sales & Conversions" },
  { id: "education", label: "Education & Authority" },
] as const;

const FREQUENCIES = [
  { value: 3, label: "3 posts / week" },
  { value: 5, label: "5 posts / week" },
  { value: 7, label: "7 posts / week (daily)" },
] as const;

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

/* ------------------------------------------------------------------ */
/*  Content data maps                                                  */
/* ------------------------------------------------------------------ */

const CONTENT_TYPES_BY_PLATFORM: Record<string, string[]> = {
  instagram: ["Carousel", "Reel", "Story", "Single Image", "Infographic"],
  linkedin: ["Text Post", "Carousel (PDF)", "Article", "Poll", "Document"],
  facebook: ["Image Post", "Video", "Link Post", "Poll", "Story"],
  tiktok: ["Short Video", "Duet", "Stitch", "Trend Video", "Tutorial"],
  "x-twitter": ["Text Post", "Thread", "Poll", "Image Post", "Quote Tweet"],
  pinterest: ["Standard Pin", "Idea Pin", "Infographic Pin", "Video Pin", "Carousel Pin"],
};

const BEST_TIMES_BY_PLATFORM: Record<string, string[]> = {
  instagram: ["9:00 AM", "12:00 PM", "5:00 PM", "7:00 PM"],
  linkedin: ["7:30 AM", "8:00 AM", "12:00 PM", "5:00 PM"],
  facebook: ["9:00 AM", "1:00 PM", "3:00 PM", "7:00 PM"],
  tiktok: ["7:00 AM", "10:00 AM", "2:00 PM", "9:00 PM"],
  "x-twitter": ["8:00 AM", "12:00 PM", "5:00 PM", "6:00 PM"],
  pinterest: ["8:00 PM", "9:00 PM", "12:00 PM", "2:00 PM"],
};

const POST_IDEAS_BY_INDUSTRY: Record<string, Record<string, string[]>> = {
  "E-commerce & Retail": {
    "brand-awareness": [
      "Share the story behind your brand and what inspired you to start",
      "Showcase your product in a lifestyle setting",
      "Behind-the-scenes look at your workspace or warehouse",
      "Introduce a team member and their role",
      "Share your brand values and what you stand for",
      "Highlight a customer unboxing experience",
      "Show the journey of a product from concept to shelf",
    ],
    "lead-gen": [
      "Announce a limited-time discount with a clear CTA",
      "Share a free downloadable buying guide for your niche",
      "Run a giveaway with an email sign-up requirement",
      "Promote a quiz that recommends products to users",
      "Highlight a bundle deal that solves a common problem",
      "Create a comparison post showing your product vs. alternatives",
      "Post a countdown for an upcoming product launch",
    ],
    engagement: [
      "Ask followers to vote on their favorite product color",
      "Share a this-or-that poll with two product options",
      "Post a fill-in-the-blank caption related to your niche",
      "Ask for product name suggestions for a new item",
      "Run a photo contest featuring customers using your product",
      "Create a would-you-rather prompt related to your category",
      "Ask followers what product they want to see next",
    ],
    sales: [
      "Feature a customer review with a product photo",
      "Show a before-and-after using your product",
      "Highlight your best-selling item and explain why customers love it",
      "Create urgency with a flash sale announcement",
      "Share a product demo showing key features",
      "Post a side-by-side comparison with a competitor on price or features",
      "Promote free shipping thresholds to increase average order value",
    ],
    education: [
      "Share a how-to guide for using your product effectively",
      "Break down the materials or ingredients in your product",
      "Explain industry trends that affect your customers",
      "Create a myth vs. fact post about your product category",
      "Teach followers how to style or pair your product",
      "Share care and maintenance tips to extend product life",
      "Explain the sourcing or manufacturing process behind your products",
    ],
  },
  "Real Estate": {
    "brand-awareness": [
      "Share a virtual tour of a standout property listing",
      "Highlight a neighborhood with its key amenities",
      "Introduce yourself and your real estate background",
      "Post a day-in-the-life of a real estate professional",
      "Showcase a recently sold property with the final story",
      "Share local market stats and what they mean for buyers",
      "Feature a local business you recommend near your listings",
    ],
    "lead-gen": [
      "Offer a free home valuation to followers who message you",
      "Share a first-time buyer checklist as a downloadable PDF",
      "Post about an upcoming open house with registration details",
      "Create a mortgage calculator tip and link to your landing page",
      "Run a Q&A about the current local market",
      "Promote your email newsletter with exclusive listing alerts",
      "Share a just-listed post and invite interested buyers to DM",
    ],
    engagement: [
      "Ask followers what feature matters most in a home",
      "Run a poll comparing two listing photos",
      "Post a guess-the-price game with a current listing",
      "Share a renovation before-and-after and ask for reactions",
      "Ask what neighborhood locals love most and why",
      "Create a dream-home wishlist prompt",
      "Post a fun real estate fact and ask followers to share theirs",
    ],
    sales: [
      "Share a client testimonial about their home-buying experience",
      "Highlight a price-reduced listing with urgency",
      "Post a walkthrough video of your top listing",
      "Show your sales results for the quarter",
      "Feature a just-sold story with client permission",
      "Promote a seasonal buying opportunity",
      "Create a comparison of renting vs. buying costs in your area",
    ],
    education: [
      "Explain the home-buying process step by step",
      "Break down closing costs and what buyers should expect",
      "Share tips for staging a home before sale",
      "Explain how interest rates affect buying power",
      "Post about common inspection issues and how to address them",
      "Share a guide on what makes a good investment property",
      "Explain the difference between pre-qualification and pre-approval",
    ],
  },
  "Health & Wellness": {
    "brand-awareness": [
      "Share your wellness philosophy and approach",
      "Post a day-in-the-life of your practice or business",
      "Introduce your team and their specialties",
      "Highlight a service you offer and who it helps",
      "Share a quote that inspires your work",
      "Behind-the-scenes look at your facility or studio",
      "Share a client success story with permission",
    ],
    "lead-gen": [
      "Offer a free wellness assessment or consultation",
      "Promote a downloadable meal plan or workout guide",
      "Run a challenge sign-up with an email capture",
      "Share an introductory offer for new clients",
      "Post about a webinar or live Q&A session",
      "Promote your booking page with a seasonal offer",
      "Create a free resource related to a trending health topic",
    ],
    engagement: [
      "Ask followers about their wellness goals this month",
      "Run a poll on preferred workout types or wellness habits",
      "Post a this-or-that health choice prompt",
      "Ask what health topic followers want you to cover next",
      "Share a hydration or step-count challenge for the week",
      "Post a myth vs. fact about a common health topic",
      "Ask followers to share their morning wellness routine",
    ],
    sales: [
      "Share a client transformation story with measurable results",
      "Highlight a package deal or membership option",
      "Promote a limited-time offer on a popular service",
      "Post a comparison of your service tiers",
      "Share social proof from a recent review or rating",
      "Announce availability for new clients with a booking link",
      "Feature a product bundle at a special price",
    ],
    education: [
      "Share evidence-based tips for improving sleep quality",
      "Explain a common health misconception in your field",
      "Break down the benefits of a specific service you offer",
      "Post a step-by-step guide for a healthy habit",
      "Share nutrition basics relevant to your audience",
      "Explain how stress affects the body and what to do about it",
      "Create a beginner guide to a practice in your field",
    ],
  },
  "Technology & SaaS": {
    "brand-awareness": [
      "Share the problem your product was built to solve",
      "Post a quick product demo showcasing a key feature",
      "Introduce a team member and what they work on",
      "Share your company culture and how your team works",
      "Highlight an integration or partnership",
      "Post about a recent company milestone",
      "Share the story behind your product name or brand",
    ],
    "lead-gen": [
      "Offer a free trial or extended demo to new sign-ups",
      "Share a downloadable industry report or whitepaper",
      "Run a webinar on a topic your audience cares about",
      "Post about a free tool or calculator on your site",
      "Create a comparison guide of solutions in your space",
      "Promote a product-led resource like templates or playbooks",
      "Share a case study with results and a CTA to learn more",
    ],
    engagement: [
      "Ask followers what feature they would add to your product",
      "Run a poll on industry trends or challenges",
      "Post a hot take on a technology topic and invite debate",
      "Ask your audience about their biggest workflow challenge",
      "Share a productivity tip and ask followers for theirs",
      "Create a this-or-that comparison of tools or methods",
      "Ask what content type your audience finds most valuable",
    ],
    sales: [
      "Share a customer success story with measurable outcomes",
      "Highlight a feature that directly saves time or money",
      "Post a limited-time pricing offer",
      "Compare your solution to the manual or legacy alternative",
      "Show a before-and-after workflow using your product",
      "Announce a new feature and explain its value",
      "Share usage statistics that show product adoption",
    ],
    education: [
      "Break down an industry trend and what it means for your users",
      "Create a how-to guide for a common task using your product",
      "Explain a technical concept in simple terms",
      "Share best practices for getting the most out of your tool",
      "Post about a security or compliance topic relevant to users",
      "Create a glossary of terms for your industry",
      "Explain how a feature works behind the scenes",
    ],
  },
  "Food & Restaurant": {
    "brand-awareness": [
      "Share the story of how your restaurant or food brand started",
      "Post a behind-the-scenes look at food preparation",
      "Introduce your chef or kitchen team",
      "Highlight a signature dish and what makes it special",
      "Share your sourcing practices and ingredient quality",
      "Post about your restaurant ambiance and atmosphere",
      "Feature a seasonal or limited-time menu item",
    ],
    "lead-gen": [
      "Promote a reservation deal for first-time visitors",
      "Offer a downloadable recipe from your menu",
      "Run a giveaway for a free meal or gift card",
      "Share a catering menu with a booking CTA",
      "Promote your loyalty or rewards program",
      "Announce a cooking class or tasting event",
      "Post about exclusive deals for email subscribers",
    ],
    engagement: [
      "Ask followers to vote on the next special menu item",
      "Run a poll on favorite cuisine or dish type",
      "Post a guess-the-ingredient challenge",
      "Ask followers to share their favorite menu item",
      "Create a food pairing suggestion and ask for opinions",
      "Share a funny food-related prompt or trivia question",
      "Ask customers to tag you in their dining photos",
    ],
    sales: [
      "Showcase a high-margin dish with an appetizing photo",
      "Promote a family meal deal or bundle",
      "Highlight your delivery or takeout options",
      "Post about a happy hour or seasonal special",
      "Share a customer review praising a specific dish",
      "Announce a weekend brunch or special event",
      "Feature your gift cards as a gifting option",
    ],
    education: [
      "Share a cooking tip from your chef",
      "Explain the origin or history of a popular dish",
      "Post about proper food storage and safety basics",
      "Break down the nutritional highlights of a menu item",
      "Share wine or beverage pairing suggestions",
      "Teach a simple cooking technique in a short video",
      "Explain seasonal ingredients and why they matter",
    ],
  },
  "Professional Services": {
    "brand-awareness": [
      "Share your professional background and areas of expertise",
      "Post about a recent project or engagement result",
      "Introduce your team and their qualifications",
      "Highlight a service and the problem it solves",
      "Share an industry event or conference you attended",
      "Post about your company values and mission",
      "Feature a strategic partnership or collaboration",
    ],
    "lead-gen": [
      "Offer a free consultation or discovery call",
      "Share a downloadable checklist for your area of expertise",
      "Promote a webinar on a timely business topic",
      "Post a case study with results and a contact CTA",
      "Run a Q&A session on a trending professional topic",
      "Share a free assessment tool on your website",
      "Promote a newsletter with industry insights",
    ],
    engagement: [
      "Ask followers about their biggest business challenge",
      "Run a poll on industry trends or priorities",
      "Post a professional development tip and ask for others",
      "Ask what topic your audience wants you to cover next",
      "Share a business lesson learned and invite discussion",
      "Create a would-you-rather scenario for your industry",
      "Ask followers how they handle a common professional situation",
    ],
    sales: [
      "Share a client results story with measurable outcomes",
      "Highlight a service package and its value proposition",
      "Post about a seasonal or limited-time offer",
      "Compare the cost of inaction vs. using your service",
      "Share a client testimonial video or written review",
      "Announce availability for new client engagements",
      "Feature your track record with key metrics",
    ],
    education: [
      "Break down a common industry misconception",
      "Share a step-by-step process for a task in your field",
      "Explain regulatory or compliance changes that affect clients",
      "Post about best practices in your area of expertise",
      "Create a beginner guide to a complex topic",
      "Share a framework or methodology your team uses",
      "Explain how to evaluate quality in your service category",
    ],
  },
  "Education & Training": {
    "brand-awareness": [
      "Share your teaching philosophy and approach",
      "Post about a student success story with permission",
      "Introduce your instructors and their backgrounds",
      "Highlight a course or program and its outcomes",
      "Share a day in the life at your institution",
      "Post about your learning environment and resources",
      "Feature an alumni achievement or milestone",
    ],
    "lead-gen": [
      "Offer a free introductory lesson or class",
      "Share a downloadable study guide or resource",
      "Promote an upcoming enrollment period",
      "Run a webinar previewing a course topic",
      "Post about scholarship or financial aid options",
      "Share a course catalog with a sign-up CTA",
      "Promote an open house or campus tour event",
    ],
    engagement: [
      "Ask followers what skill they want to learn next",
      "Run a poll on learning preferences",
      "Post a trivia question related to your subject area",
      "Ask students to share their study tips",
      "Create a learning challenge for the week",
      "Share a fun fact from your field and ask for reactions",
      "Ask followers what motivates them to keep learning",
    ],
    sales: [
      "Share measurable outcomes from your programs",
      "Highlight early-bird enrollment pricing",
      "Post about what is included in a specific program",
      "Compare your program to self-study alternatives",
      "Share a testimonial from a recent graduate",
      "Announce a new course or program launch",
      "Feature a group or corporate training option",
    ],
    education: [
      "Share a quick lesson or concept from your curriculum",
      "Explain an industry trend relevant to your students",
      "Post study tips and learning strategies",
      "Break down a complex topic into simple steps",
      "Share recommended books or resources in your field",
      "Explain career paths available after completing your program",
      "Create a vocabulary or concept breakdown for beginners",
    ],
  },
  "Beauty & Fashion": {
    "brand-awareness": [
      "Share the inspiration behind your latest collection or product line",
      "Post a behind-the-scenes look at a photoshoot",
      "Introduce your team or key collaborators",
      "Highlight what makes your brand different",
      "Share the story of how your brand was founded",
      "Post about your sustainability or sourcing practices",
      "Feature a look or product styled in multiple ways",
    ],
    "lead-gen": [
      "Offer a free style guide or beauty tips PDF",
      "Run a giveaway for a popular product",
      "Promote a quiz that helps users find their ideal product",
      "Share a VIP signup for early access to new releases",
      "Post about a first-purchase discount for new customers",
      "Promote a virtual styling consultation",
      "Share a seasonal lookbook with a shop CTA",
    ],
    engagement: [
      "Ask followers to vote on their favorite look",
      "Run a this-or-that style comparison",
      "Post a get-ready-with-me prompt",
      "Ask what product or style trend followers are into right now",
      "Share a styling challenge and invite participation",
      "Create a caption contest with a fashion photo",
      "Ask followers what product they want you to review next",
    ],
    sales: [
      "Feature a best-selling product with styling ideas",
      "Promote a limited-time sale or discount code",
      "Show a customer wearing or using your product",
      "Highlight a new arrival and its key features",
      "Create urgency with a restocking alert",
      "Share a product bundle at a special price",
      "Post a review spotlight from a satisfied customer",
    ],
    education: [
      "Share a step-by-step styling or beauty tutorial",
      "Explain how to choose the right product for your skin or body type",
      "Post about fabric care and garment longevity tips",
      "Break down a current fashion or beauty trend",
      "Share the meaning behind style terminology",
      "Teach a makeup or styling technique for beginners",
      "Explain seasonal color palettes and how to wear them",
    ],
  },
  "Fitness & Sports": {
    "brand-awareness": [
      "Share your fitness philosophy and training approach",
      "Post a day-in-the-life at your gym or studio",
      "Introduce your trainers and their certifications",
      "Highlight a class or program you offer",
      "Share a member success story with permission",
      "Post about your facility and equipment",
      "Feature a community event or group workout",
    ],
    "lead-gen": [
      "Offer a free trial class or week pass",
      "Share a downloadable workout plan for beginners",
      "Promote a fitness assessment or consultation",
      "Run a challenge with a sign-up form",
      "Post about membership deals for new sign-ups",
      "Promote a nutrition guide download",
      "Share a referral incentive program",
    ],
    engagement: [
      "Ask followers about their fitness goals for the month",
      "Run a poll on favorite workout types",
      "Post a workout challenge and ask for completion photos",
      "Ask what exercise followers struggle with most",
      "Share a playlist prompt and ask for song suggestions",
      "Create a fitness trivia question",
      "Ask followers to share their personal records",
    ],
    sales: [
      "Highlight a membership tier and what is included",
      "Promote a personal training package deal",
      "Share measurable results from a member or client",
      "Post about a seasonal promotion or limited-time offer",
      "Feature a group class that drives sign-ups",
      "Announce new availability for personal training slots",
      "Compare membership value to at-home workout costs",
    ],
    education: [
      "Share proper form tips for a common exercise",
      "Explain the benefits of a specific workout type",
      "Post about pre-workout and post-workout nutrition",
      "Break down a training methodology you use",
      "Share stretching and recovery techniques",
      "Explain how to set realistic fitness goals",
      "Teach a bodyweight exercise anyone can try at home",
    ],
  },
  "Finance & Insurance": {
    "brand-awareness": [
      "Share your financial advisory philosophy",
      "Post about your team and their qualifications",
      "Highlight a service you offer and who benefits from it",
      "Share a company milestone or award",
      "Post about community involvement or sponsorships",
      "Feature a client success story with permission",
      "Share what sets your firm apart from competitors",
    ],
    "lead-gen": [
      "Offer a free financial review or consultation",
      "Share a downloadable budgeting template",
      "Promote a webinar on financial planning topics",
      "Post about a seasonal tax or insurance deadline",
      "Run a Q&A session on common financial questions",
      "Share a calculator tool on your website",
      "Promote newsletter sign-ups for market insights",
    ],
    engagement: [
      "Ask followers about their top financial goal",
      "Run a poll on saving vs. investing priorities",
      "Post a financial literacy question and share the answer",
      "Ask what money topic followers want you to explain",
      "Share a money myth and ask if followers believed it",
      "Create a simple financial scenario and ask what they would do",
      "Ask followers to share their best budgeting tip",
    ],
    sales: [
      "Highlight a service package with clear value proposition",
      "Share a case study showing financial outcomes",
      "Post about a limited-time enrollment period",
      "Compare the cost of professional advice vs. going it alone",
      "Share client feedback on your advisory process",
      "Announce new service offerings",
      "Feature your track record with relevant metrics",
    ],
    education: [
      "Explain a common financial term in simple language",
      "Share tips for building an emergency fund",
      "Break down different types of insurance coverage",
      "Post about tax-saving strategies for the current year",
      "Explain compound interest and why it matters",
      "Share a step-by-step guide to retirement planning basics",
      "Explain the difference between two financial products",
    ],
  },
  "Travel & Hospitality": {
    "brand-awareness": [
      "Share a stunning photo or video of your property or destination",
      "Post about the history or story behind your business",
      "Introduce your hospitality team",
      "Highlight a unique amenity or experience you offer",
      "Share a guest experience or highlight reel",
      "Post about your commitment to sustainability or local community",
      "Feature a partner business or local attraction",
    ],
    "lead-gen": [
      "Promote an early-booking discount or package",
      "Share a downloadable travel guide for your destination",
      "Run a giveaway for a complimentary stay or experience",
      "Post about a seasonal special with a booking CTA",
      "Promote your email list for exclusive travel deals",
      "Share a trip planning quiz or tool",
      "Announce an event or seasonal attraction",
    ],
    engagement: [
      "Ask followers to share their favorite travel memory",
      "Run a poll on preferred vacation types",
      "Post a guess-the-destination challenge",
      "Ask where followers plan to travel next",
      "Share a packing tip and ask for others",
      "Create a bucket-list prompt for your destination",
      "Ask followers what amenity matters most when traveling",
    ],
    sales: [
      "Showcase a room or experience package with pricing",
      "Highlight a glowing guest review",
      "Promote a last-minute availability deal",
      "Share a comparison of your packages or room types",
      "Post about group or corporate booking options",
      "Announce a loyalty program or returning-guest discount",
      "Feature a seasonal or holiday special",
    ],
    education: [
      "Share packing tips for your destination or climate",
      "Explain local customs or etiquette visitors should know",
      "Post a seasonal guide for the best time to visit",
      "Break down what to expect during a typical visit",
      "Share transportation tips for getting around",
      "Explain travel insurance basics for your type of trip",
      "Create a local food guide for visitors",
    ],
  },
  "Home Services": {
    "brand-awareness": [
      "Share before-and-after photos of a completed project",
      "Post about your team and their experience",
      "Highlight the services you offer",
      "Share a day-in-the-life on a project site",
      "Post about your licensing, bonding, or insurance",
      "Feature a community project or sponsorship",
      "Share your company story and how you got started",
    ],
    "lead-gen": [
      "Offer a free estimate or consultation",
      "Share a seasonal maintenance checklist download",
      "Promote a referral discount program",
      "Post about a limited-time service special",
      "Run a Q&A about common home maintenance questions",
      "Share a guide to hiring a reliable service provider",
      "Promote emergency or same-day service availability",
    ],
    engagement: [
      "Ask followers about their next home improvement project",
      "Run a poll on home maintenance priorities",
      "Post a quick DIY tip and ask for others",
      "Ask what home feature followers wish they had",
      "Share a project timeline and ask for guesses",
      "Create a seasonal home care prompt",
      "Ask followers to share their biggest home project regret",
    ],
    sales: [
      "Share a detailed customer review with project photos",
      "Promote a seasonal service package",
      "Highlight your response time and availability",
      "Post about a warranty or guarantee you offer",
      "Share project results with measurable improvements",
      "Announce a new service offering",
      "Compare DIY costs vs. professional service costs",
    ],
    education: [
      "Share seasonal home maintenance tips",
      "Explain signs that a repair is needed before it gets worse",
      "Post about energy-saving upgrades for the home",
      "Break down the process for a common service you offer",
      "Share safety tips for homeowners",
      "Explain how to prepare for a service appointment",
      "Teach followers how to spot quality workmanship",
    ],
  },
  "Automotive": {
    "brand-awareness": [
      "Share a behind-the-scenes look at your shop or showroom",
      "Post about your team and their expertise",
      "Highlight a vehicle or service specialty",
      "Share your business story and values",
      "Feature a customer and their vehicle story",
      "Post about certifications or technology you use",
      "Showcase a community sponsorship or event",
    ],
    "lead-gen": [
      "Offer a free vehicle inspection or consultation",
      "Share a seasonal maintenance checklist download",
      "Promote a service discount for new customers",
      "Post about a trade-in or financing special",
      "Run a Q&A about vehicle care",
      "Share a buyer guide for your segment",
      "Promote a loyalty or referral program",
    ],
    engagement: [
      "Ask followers about their dream car",
      "Run a poll on vehicle preferences",
      "Post a car trivia question",
      "Ask what feature matters most in a vehicle",
      "Share a road trip prompt and ask for destinations",
      "Create a guess-the-model challenge",
      "Ask followers about their longest road trip",
    ],
    sales: [
      "Highlight a vehicle or service special",
      "Share a customer testimonial with their vehicle",
      "Promote a limited-time financing offer",
      "Post about certified pre-owned options",
      "Feature a new arrival or inventory update",
      "Announce a seasonal sales event",
      "Compare service package options",
    ],
    education: [
      "Share basic vehicle maintenance tips",
      "Explain warning signs that mean you need service",
      "Post about tire care and seasonal changes",
      "Break down the car-buying process",
      "Share fuel efficiency tips",
      "Explain the difference between service tiers",
      "Teach followers how to check fluid levels",
    ],
  },
  "Non-Profit": {
    "brand-awareness": [
      "Share your mission and the impact you are working toward",
      "Post a day-in-the-life of your organization",
      "Introduce a team member or volunteer",
      "Highlight a program or initiative",
      "Share a milestone or achievement",
      "Post about a partnership or collaboration",
      "Feature a beneficiary story with permission",
    ],
    "lead-gen": [
      "Promote a volunteer sign-up opportunity",
      "Share a donation matching campaign",
      "Post about an upcoming fundraising event",
      "Promote your newsletter for impact updates",
      "Share a downloadable impact report",
      "Run a campaign with a clear donation CTA",
      "Post about corporate partnership opportunities",
    ],
    engagement: [
      "Ask followers why they support your cause",
      "Run a poll on community priorities",
      "Post a question about a relevant issue",
      "Ask supporters to share their volunteer experience",
      "Create an awareness challenge for your cause",
      "Share a fact about your cause area and ask for reactions",
      "Ask followers to tag someone who should know about your work",
    ],
    sales: [
      "Share impact metrics from your latest campaign",
      "Highlight what a specific donation amount can achieve",
      "Post about a recurring giving program",
      "Feature a donor spotlight with permission",
      "Promote merchandise or products that fund your mission",
      "Announce a matching gift opportunity",
      "Share an annual report highlight",
    ],
    education: [
      "Explain the issue your organization addresses",
      "Share data or research related to your cause",
      "Post about policy or systemic factors in your field",
      "Break down how donations are allocated",
      "Share a timeline of progress in your area",
      "Explain how individuals can make a difference",
      "Create an FAQ about your organization and its work",
    ],
  },
};

const HASHTAGS_BY_INDUSTRY: Record<string, string[]> = {
  "E-commerce & Retail": ["#ecommerce", "#onlineshopping", "#shoplocal", "#retailtherapy", "#newproduct", "#shopsmall", "#handmade", "#trending", "#musthave", "#dealoftheday", "#brandstory", "#customerreview", "#productlaunch", "#smallbusiness", "#shopping"],
  "Real Estate": ["#realestate", "#homebuying", "#realtor", "#property", "#househunting", "#newhome", "#openhouse", "#homeselling", "#firsttimebuyer", "#dreamhome", "#realtorlife", "#investment", "#justlisted", "#justsold", "#homesweethome"],
  "Health & Wellness": ["#wellness", "#healthyliving", "#selfcare", "#mentalhealth", "#nutrition", "#holistichealth", "#wellnesstips", "#mindfulness", "#healthylifestyle", "#wellnessjourney", "#healthyhabits", "#stressrelief", "#healthtips", "#naturalhealth", "#wellbeing"],
  "Technology & SaaS": ["#tech", "#saas", "#startup", "#innovation", "#productivity", "#automation", "#software", "#digitaltools", "#techstartup", "#b2bsaas", "#cloudcomputing", "#futureofwork", "#techtrends", "#productupdate", "#devtools"],
  "Food & Restaurant": ["#foodie", "#restaurant", "#homemade", "#chef", "#instafood", "#localfood", "#diningout", "#farmtotable", "#foodphotography", "#yummy", "#newmenu", "#foodlover", "#eatlocal", "#brunch", "#cheflife"],
  "Professional Services": ["#business", "#consulting", "#professionaldevelopment", "#leadership", "#strategy", "#businessgrowth", "#entrepreneur", "#b2b", "#expertadvice", "#industryinsights", "#businesstips", "#growthmindset", "#professionalservices", "#clientresults", "#consultinglife"],
  "Education & Training": ["#education", "#learning", "#onlinelearning", "#training", "#edtech", "#studytips", "#elearning", "#skillbuilding", "#professionaldevelopment", "#teachersofinstagram", "#students", "#lifelonglearning", "#courselaunch", "#careergrowth", "#certification"],
  "Beauty & Fashion": ["#fashion", "#beauty", "#style", "#skincare", "#ootd", "#beautytips", "#fashiontrends", "#makeup", "#sustainablefashion", "#newcollection", "#styleinspo", "#beautyroutine", "#fashionista", "#luxurybeauty", "#trendalert"],
  "Fitness & Sports": ["#fitness", "#workout", "#gym", "#fitnessmotivation", "#training", "#healthylifestyle", "#exercise", "#fitfam", "#personaltrainer", "#strength", "#cardio", "#fitlife", "#workoutmotivation", "#gymlife", "#fitnessjourney"],
  "Finance & Insurance": ["#finance", "#financialplanning", "#investing", "#insurance", "#moneytips", "#personalfinance", "#wealthmanagement", "#budgeting", "#retirement", "#financialfreedom", "#taxplanning", "#savings", "#moneymanagement", "#financegoals", "#financialliteracy"],
  "Travel & Hospitality": ["#travel", "#hospitality", "#wanderlust", "#vacation", "#hotel", "#travelgram", "#explore", "#luxurytravel", "#destination", "#tourism", "#travelphotography", "#getaway", "#travelguide", "#bookdirect", "#staycation"],
  "Home Services": ["#homeimprovement", "#homerepair", "#renovation", "#contractor", "#handyman", "#plumbing", "#electrical", "#hvac", "#landscaping", "#homeproject", "#diy", "#homemaintenance", "#beforeandafter", "#homedecor", "#fixerupper"],
  "Automotive": ["#automotive", "#cars", "#carcare", "#mechanic", "#autorepair", "#newcar", "#usedcars", "#dealership", "#carservice", "#driving", "#carbuyingtips", "#autoindustry", "#carsofinstagram", "#cardetailing", "#roadtrip"],
  "Non-Profit": ["#nonprofit", "#charity", "#giveback", "#socialgood", "#volunteer", "#donate", "#impact", "#community", "#fundraising", "#cause", "#makeadifference", "#philanthropy", "#changemakers", "#socialimpact", "#dogood"],
};

const howToSteps = [
  { title: "Choose Your Industry", description: "Select the industry that best matches your business so the content ideas are relevant and practical for your audience." },
  { title: "Pick Your Platforms", description: "Select one or more social media platforms you are active on. The calendar adapts content types and posting times for each platform." },
  { title: "Set Your Goals", description: "Choose what you want to achieve. Each goal shapes the type of content the calendar generates, from awareness to sales." },
  { title: "Generate and Customize", description: "Review the 4-week calendar, swap out ideas that do not fit, and copy or download the plan to start executing." },
];

/* ------------------------------------------------------------------ */
/*  Calendar generation logic                                          */
/* ------------------------------------------------------------------ */

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function generateCalendar(
  industry: string,
  platforms: string[],
  goals: string[],
  frequency: number,
): CalendarWeek[] {
  const seed = industry.length * 1000 + platforms.length * 100 + goals.length * 10 + frequency;
  const rand = seededRandom(seed);

  const weeks: CalendarWeek[] = [];

  /* Pick which days of the week to post on based on frequency */
  let postDays: number[];
  if (frequency >= 7) {
    postDays = [0, 1, 2, 3, 4, 5, 6];
  } else if (frequency === 5) {
    postDays = [0, 1, 2, 3, 4]; // Mon-Fri
  } else {
    postDays = [0, 2, 4]; // Mon, Wed, Fri
  }

  const industryIdeas = POST_IDEAS_BY_INDUSTRY[industry] ?? POST_IDEAS_BY_INDUSTRY["E-commerce & Retail"];
  const industryHashtags = HASHTAGS_BY_INDUSTRY[industry] ?? HASHTAGS_BY_INDUSTRY["E-commerce & Retail"];

  /* Collect all ideas from selected goals */
  const allIdeas: string[] = [];
  for (const goal of goals) {
    const goalIdeas = industryIdeas[goal];
    if (goalIdeas) {
      allIdeas.push(...goalIdeas);
    }
  }

  /* Fallback if no ideas found */
  if (allIdeas.length === 0) {
    const firstGoalKey = Object.keys(industryIdeas)[0];
    if (firstGoalKey) {
      allIdeas.push(...(industryIdeas[firstGoalKey] ?? []));
    }
  }

  let ideaIndex = 0;

  for (let w = 0; w < 4; w++) {
    const posts: CalendarPost[] = [];

    for (const dayIdx of postDays) {
      /* Rotate across platforms */
      const platform = platforms[posts.length % platforms.length];
      const platformKey = PLATFORMS.find((p) => p.label === platform)?.id ?? "instagram";

      /* Pick content type */
      const contentTypes = CONTENT_TYPES_BY_PLATFORM[platformKey] ?? CONTENT_TYPES_BY_PLATFORM["instagram"];
      const contentType = contentTypes[Math.floor(rand() * contentTypes.length)];

      /* Pick post idea (cycle through available ideas) */
      const idea = allIdeas[ideaIndex % allIdeas.length];
      ideaIndex++;

      /* Pick hashtags (3-5) */
      const hashCount = 3 + Math.floor(rand() * 3);
      const shuffled = [...industryHashtags].sort(() => rand() - 0.5);
      const hashtags = shuffled.slice(0, hashCount);

      /* Pick best time */
      const times = BEST_TIMES_BY_PLATFORM[platformKey] ?? BEST_TIMES_BY_PLATFORM["instagram"];
      const bestTime = times[Math.floor(rand() * times.length)];

      /* Date label */
      const weekStart = w * 7 + 1;
      const dateNum = weekStart + dayIdx;

      posts.push({
        day: DAYS_OF_WEEK[dayIdx],
        date: `Day ${dateNum}`,
        platform,
        contentType,
        idea,
        hashtags,
        bestTime,
      });
    }

    weeks.push({
      weekNumber: w + 1,
      label: `Week ${w + 1}`,
      posts,
    });
  }

  return weeks;
}

function formatCalendarText(
  industry: string,
  platforms: string[],
  goals: string[],
  frequency: number,
  weeks: CalendarWeek[],
): string {
  const lines: string[] = [];

  lines.push("SOCIAL MEDIA CONTENT CALENDAR");
  lines.push("=".repeat(50));
  lines.push("");
  lines.push(`Industry: ${industry}`);
  lines.push(`Platforms: ${platforms.join(", ")}`);
  lines.push(`Goals: ${goals.map((g) => GOALS.find((gl) => gl.id === g)?.label ?? g).join(", ")}`);
  lines.push(`Frequency: ${frequency} posts per week`);
  lines.push("");

  for (const week of weeks) {
    lines.push("-".repeat(50));
    lines.push(`${week.label.toUpperCase()}`);
    lines.push("-".repeat(50));
    lines.push("");

    for (const post of week.posts) {
      lines.push(`${post.day} (${post.date})`);
      lines.push(`  Platform: ${post.platform}`);
      lines.push(`  Content Type: ${post.contentType}`);
      lines.push(`  Post Idea: ${post.idea}`);
      lines.push(`  Hashtags: ${post.hashtags.join(" ")}`);
      lines.push(`  Best Time: ${post.bestTime}`);
      lines.push("");
    }
  }

  return lines.join("\n");
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function SelectInput({
  id,
  label,
  options,
  value,
  onChange,
}: {
  id: string;
  label: string;
  options: readonly { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-base font-bold text-black mb-2">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 border border-gray-200 text-base bg-white text-black min-h-[44px] appearance-none focus-visible:border-black focus-visible:outline-none motion-reduce:transition-none"
      >
        <option value="">Select...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function MultiSelectCheckboxGroup({
  legend,
  options,
  selected,
  onChange,
}: {
  legend: string;
  options: readonly { id: string; label: string }[];
  selected: string[];
  onChange: (next: string[]) => void;
}) {
  function toggle(id: string) {
    if (selected.includes(id)) {
      onChange(selected.filter((s) => s !== id));
    } else {
      onChange([...selected, id]);
    }
  }

  return (
    <fieldset>
      <legend className="block text-base font-bold text-black mb-3">
        {legend}
      </legend>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {options.map((opt) => {
          const isSelected = selected.includes(opt.id);
          return (
            <label
              key={opt.id}
              className={`flex items-center gap-3 px-4 py-3 min-h-[44px] border cursor-pointer transition-colors motion-reduce:transition-none ${
                isSelected
                  ? "border-black bg-black text-white"
                  : "border-gray-200 bg-white text-black hover:border-black"
              }`}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => toggle(opt.id)}
                className="sr-only"
                aria-label={opt.label}
              />
              <span
                className={`inline-flex items-center justify-center w-5 h-5 border flex-shrink-0 ${
                  isSelected ? "border-white bg-white" : "border-gray-400 bg-white"
                }`}
                aria-hidden="true"
              >
                {isSelected && (
                  <svg
                    className="w-3.5 h-3.5 text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path strokeLinecap="square" strokeLinejoin="miter" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </span>
              <span className="text-base">{opt.label}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

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
      aria-label="Copy calendar to clipboard"
      className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center px-5 py-3 text-base font-bold border border-gray-200 text-gray-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
    >
      {copied ? "Copied" : "Copy to Clipboard"}
    </button>
  );
}

function DownloadButton({ text, filename }: { text: string; filename: string }) {
  const download = useCallback(() => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [text, filename]);

  return (
    <button
      onClick={download}
      aria-label="Download calendar as text file"
      className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center px-5 py-3 text-base font-bold border border-gray-200 text-gray-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
    >
      Download as Text
    </button>
  );
}

function WeekTabBar({
  weeks,
  activeWeek,
  onSelect,
}: {
  weeks: CalendarWeek[];
  activeWeek: number;
  onSelect: (week: number) => void;
}) {
  return (
    <div className="flex border-b border-gray-200" role="tablist" aria-label="Calendar weeks">
      {weeks.map((week) => {
        const isActive = week.weekNumber === activeWeek;
        return (
          <button
            key={week.weekNumber}
            role="tab"
            aria-selected={isActive}
            aria-controls={`week-panel-${week.weekNumber}`}
            id={`week-tab-${week.weekNumber}`}
            onClick={() => onSelect(week.weekNumber)}
            className={`flex-1 min-h-[44px] px-4 py-3 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
              isActive
                ? "border-b-2 border-black text-black"
                : "text-gray-400 hover:text-black"
            }`}
          >
            {week.label}
          </button>
        );
      })}
    </div>
  );
}

function PostCard({ post }: { post: CalendarPost }) {
  return (
    <div className="border border-gray-200 p-5">
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <span className="text-base font-bold text-black">{post.day}</span>
        <span className="text-base text-gray-500">{post.date}</span>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        <span className="inline-flex items-center px-3 py-1 bg-black text-white text-base font-bold">
          {post.platform}
        </span>
        <span className="inline-flex items-center px-3 py-1 border border-gray-200 text-base text-black">
          {post.contentType}
        </span>
      </div>

      <p className="text-base text-black leading-relaxed mb-3">{post.idea}</p>

      <div className="flex flex-wrap gap-2 mb-3">
        {post.hashtags.map((tag) => (
          <span key={tag} className="text-base text-gray-500">
            {tag}
          </span>
        ))}
      </div>

      <p className="text-base text-gray-500">
        <span className="font-bold text-black">Best time:</span> {post.bestTime}
      </p>
    </div>
  );
}

function CalendarView({ weeks }: { weeks: CalendarWeek[] }) {
  const [activeWeek, setActiveWeek] = useState(1);
  const currentWeek = weeks.find((w) => w.weekNumber === activeWeek) ?? weeks[0];

  return (
    <div className="border border-gray-200">
      <WeekTabBar weeks={weeks} activeWeek={activeWeek} onSelect={setActiveWeek} />
      <div
        role="tabpanel"
        id={`week-panel-${currentWeek.weekNumber}`}
        aria-labelledby={`week-tab-${currentWeek.weekNumber}`}
        className="p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentWeek.posts.map((post, idx) => (
            <PostCard key={idx} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default function SocialCalendarPage() {
  const [industry, setIndustry] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [frequency, setFrequency] = useState("");
  const [calendar, setCalendar] = useState<CalendarWeek[] | null>(null);

  const industryOptions = useMemo(
    () => INDUSTRIES.map((ind) => ({ value: ind, label: ind })),
    [],
  );

  const frequencyOptions = useMemo(
    () => FREQUENCIES.map((f) => ({ value: String(f.value), label: f.label })),
    [],
  );

  const platformOptions = useMemo(
    () => PLATFORMS.map((p) => ({ id: p.label, label: p.label })),
    [],
  );

  const goalOptions = useMemo(
    () => GOALS.map((g) => ({ id: g.id, label: g.label })),
    [],
  );

  const canGenerate =
    industry !== "" &&
    selectedPlatforms.length > 0 &&
    selectedGoals.length > 0 &&
    frequency !== "";

  const hasInput =
    industry !== "" ||
    selectedPlatforms.length > 0 ||
    selectedGoals.length > 0 ||
    frequency !== "";

  function handleGenerate() {
    if (!canGenerate) return;
    const weeks = generateCalendar(
      industry,
      selectedPlatforms,
      selectedGoals,
      Number(frequency),
    );
    setCalendar(weeks);
  }

  function handleReset() {
    setIndustry("");
    setSelectedPlatforms([]);
    setSelectedGoals([]);
    setFrequency("");
    setCalendar(null);
  }

  const plainText = calendar
    ? formatCalendarText(industry, selectedPlatforms, selectedGoals, Number(frequency), calendar)
    : "";

  return (
    <article className="min-h-screen">
      
      {/* Related Tools */}
      <section className="px-6 lg:px-12 py-12" aria-label="Related tools">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">Related Tools</h2>
          <div className="flex flex-wrap gap-3">
                <Link href="/resources/social-media-planner" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Social Media Planner</Link>
                <Link href="/resources/social-media-roi" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Social Media ROI</Link>
                <Link href="/resources/social-media-audit" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Social Media Audit</Link>
                <Link href="/resources/social-post-generator" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Social Post Generator</Link>
          </div>
        </div>
      </section>
<JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Social Media Content Calendar Generator",
          description:
            "Free social media content calendar generator. Choose your industry, platforms, and goals to generate a 4-week posting plan with content ideas, hashtags, and best times to post.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />

      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Social Media Content Calendar" },
        ]}
      />

      {/* ---- Hero ---- */}
      <section aria-label="Free Tool" className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Social Media Content Calendar
            </h1>
            <SectionDesc>
              Generate a 4-week social media content calendar tailored to your
              industry, platforms, and goals. Get specific post ideas, content
              types, hashtags, and recommended posting times you can start using
              right away.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* ---- Form ---- */}
      <section aria-label="Content section" className="px-6 lg:px-12 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <div className="border border-gray-200 p-6 space-y-8">
              <SelectInput
                id="industry"
                label="Your Industry"
                options={industryOptions}
                value={industry}
                onChange={setIndustry}
              />

              <MultiSelectCheckboxGroup
                legend="Platforms (select one or more)"
                options={platformOptions}
                selected={selectedPlatforms}
                onChange={setSelectedPlatforms}
              />

              <MultiSelectCheckboxGroup
                legend="Content Goals (select one or more)"
                options={goalOptions}
                selected={selectedGoals}
                onChange={setSelectedGoals}
              />

              <SelectInput
                id="frequency"
                label="Posting Frequency"
                options={frequencyOptions}
                value={frequency}
                onChange={setFrequency}
              />
            </div>
          </Animate>

          {/* Generate / Reset */}
          <Animate animation="fade-up">
            <div className="flex flex-wrap gap-3 mt-8">
              <button
                onClick={handleGenerate}
                disabled={!canGenerate}
                className="bg-black text-white px-8 py-4 min-h-[44px] text-base font-bold hover:bg-gray-900 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Generate Calendar
              </button>
              {hasInput && (
                <button
                  onClick={handleReset}
                  className="px-8 py-4 min-h-[44px] text-base font-bold border border-gray-200 text-gray-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  Reset
                </button>
              )}
              {!canGenerate && (
                <p className="text-base text-gray-400 self-center">
                  Select an industry, at least one platform, at least one goal,
                  and a posting frequency to generate your calendar.
                </p>
              )}
            </div>
          </Animate>
        </div>
      </section>

      {/* ---- Calendar Results ---- */}
      {calendar && (
        <section aria-label="Your 4-Week Content Plan" className="px-6 lg:px-12 pb-16">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Summary */}
            <Animate animation="fade-up">
              <div className="border border-gray-200">
                <div className="bg-black text-white px-6 py-4">
                  <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold">
                    Your 4-Week Content Plan
                  </h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-base font-bold text-black">Industry</p>
                      <p className="text-base text-gray-700">{industry}</p>
                    </div>
                    <div>
                      <p className="text-base font-bold text-black">Platforms</p>
                      <p className="text-base text-gray-700">{selectedPlatforms.join(", ")}</p>
                    </div>
                    <div>
                      <p className="text-base font-bold text-black">Goals</p>
                      <p className="text-base text-gray-700">
                        {selectedGoals
                          .map((g) => GOALS.find((gl) => gl.id === g)?.label ?? g)
                          .join(", ")}
                      </p>
                    </div>
                    <div>
                      <p className="text-base font-bold text-black">Frequency</p>
                      <p className="text-base text-gray-700">
                        {FREQUENCIES.find((f) => f.value === Number(frequency))?.label ?? frequency}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Animate>

            {/* Calendar tabs */}
            <Animate animation="fade-up">
              <CalendarView weeks={calendar} />
            </Animate>

            {/* Export actions */}
            <div className="flex flex-wrap gap-3">
              <CopyButton text={plainText} />
              <DownloadButton text={plainText} filename="social-media-calendar.txt" />
            </div>
          </div>
        </section>
      )}

      {/* ---- How to Use ---- */}
      <section aria-label="How to Use This Calendar" className="px-6 lg:px-12 py-16 border-t border-gray-200">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-8">
              How to Use This Calendar
            </h2>
          </Animate>
          <Stagger stagger={100} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {howToSteps.map((step, i) => (
              <div key={i} className="border border-gray-200 p-6">
                <div className="flex items-start gap-4">
                  <span className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-gray-300">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">
                      {step.title}
                    </h3>
                    <p className="text-base text-gray-500 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---- Bottom CTA ---- */}
      <section aria-label="Call to action" className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Get a Professional Social Media Strategy
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              This calendar is a starting point. Our team builds comprehensive
              social media strategies with custom content plans, audience
              targeting, and performance tracking to grow your brand online.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-5 min-h-[44px] font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              Work With Our Social Team &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    
      <ToolCTA
        toolName="Social Calendar"
        services={[
          { title: "Social Media Marketing", desc: "Strategy, content, and community management across all platforms.", href: "/services/social-media-marketing" },
          { title: "Content Marketing", desc: "Engaging content that builds brand authority and drives engagement.", href: "/services/content-marketing" },
          { title: "Digital Marketing", desc: "Integrated digital strategy connecting social to business results.", href: "/services/digital-marketing" },
        ]}
        relatedTools={[
          { title: "Social Content Rater", href: "/resources/social-content-rater" },
          { title: "Social Media Audit", href: "/resources/social-media-audit" },
          { title: "Social Media Bio Generator", href: "/resources/social-media-bio-generator" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
