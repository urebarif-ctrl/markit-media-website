"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Animate } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type BusinessType =
  | "SaaS"
  | "E-commerce"
  | "Agency"
  | "Consulting"
  | "Healthcare"
  | "Real Estate"
  | "Education"
  | "Other";

type Goal =
  | "Get leads"
  | "Drive sales"
  | "Book demos"
  | "Download resource"
  | "Sign up"
  | "Start trial"
  | "Get quote"
  | "Contact us";

type Tone = "Professional" | "Casual" | "Urgent" | "Playful" | "Premium";

interface CtaResult {
  buttons: string[];
  headlines: string[];
  subheadlines: string[];
}

/* ------------------------------------------------------------------ */
/*  Options                                                            */
/* ------------------------------------------------------------------ */

const businessTypes: BusinessType[] = [
  "SaaS",
  "E-commerce",
  "Agency",
  "Consulting",
  "Healthcare",
  "Real Estate",
  "Education",
  "Other",
];

const goals: Goal[] = [
  "Get leads",
  "Drive sales",
  "Book demos",
  "Download resource",
  "Sign up",
  "Start trial",
  "Get quote",
  "Contact us",
];

const tones: Tone[] = ["Professional", "Casual", "Urgent", "Playful", "Premium"];

/* ------------------------------------------------------------------ */
/*  Template bank                                                      */
/* ------------------------------------------------------------------ */

const buttonTemplates: Record<Goal, Record<Tone, string[]>> = {
  "Get leads": {
    Professional: [
      "Request Your Free Consultation",
      "Get Your [PRODUCT] Assessment",
      "Claim Your Free Strategy Session",
      "Talk to a [PRODUCT] Expert",
    ],
    Casual: [
      "Let’s Chat About [PRODUCT]",
      "Get Started — It’s Free",
      "Grab Your Free [PRODUCT] Guide",
      "Send Me the Details",
    ],
    Urgent: [
      "Claim Your Spot Now",
      "Get Your Free [PRODUCT] Audit Today",
      "Reserve Your Consultation",
      "Lock In Your Free Session",
    ],
    Playful: [
      "Yes, I Want Better [PRODUCT]!",
      "Show Me the Magic",
      "Count Me In",
      "Let’s Do This",
    ],
    Premium: [
      "Schedule a Private Consultation",
      "Request an Executive Briefing",
      "Explore [PRODUCT] Solutions",
      "Speak With Our Advisory Team",
    ],
  },
  "Drive sales": {
    Professional: [
      "Purchase [PRODUCT] Now",
      "View Pricing and Plans",
      "Order [PRODUCT] Today",
      "Add [PRODUCT] to Cart",
    ],
    Casual: [
      "Shop [PRODUCT] Now",
      "Grab Yours Today",
      "Get [PRODUCT] — Easy as That",
      "Browse [PRODUCT]",
    ],
    Urgent: [
      "Buy Now — Limited Stock",
      "Order Before It’s Gone",
      "Shop the [PRODUCT] Sale Now",
      "Don’t Miss This [PRODUCT] Deal",
    ],
    Playful: [
      "Treat Yourself to [PRODUCT]",
      "Yes, I Need This!",
      "Add to Cart (You Know You Want To)",
      "Snag [PRODUCT] Today",
    ],
    Premium: [
      "Invest in [PRODUCT]",
      "Elevate Your Experience",
      "Shop the [PRODUCT] Collection",
      "Acquire [PRODUCT]",
    ],
  },
  "Book demos": {
    Professional: [
      "Book Your [PRODUCT] Demo",
      "Schedule a Live Walkthrough",
      "See [PRODUCT] in Action",
      "Request a Personalized Demo",
    ],
    Casual: [
      "See How [PRODUCT] Works",
      "Book a Quick Demo",
      "Take [PRODUCT] for a Spin",
      "Watch It in Action",
    ],
    Urgent: [
      "Book Your Demo — Slots Filling Fast",
      "Reserve Your Demo Today",
      "Get a Demo Before Spots Run Out",
      "Schedule Now — Limited Availability",
    ],
    Playful: [
      "Peek Behind the Curtain",
      "See the [PRODUCT] Magic Live",
      "Take the Tour",
      "Show Me Everything",
    ],
    Premium: [
      "Arrange a Private Demonstration",
      "Experience [PRODUCT] Firsthand",
      "Schedule an Exclusive Preview",
      "Request a Guided Tour",
    ],
  },
  "Download resource": {
    Professional: [
      "Download the [PRODUCT] Guide",
      "Get Your Free Report",
      "Access the [PRODUCT] Whitepaper",
      "Download the Resource",
    ],
    Casual: [
      "Grab the Free [PRODUCT] Guide",
      "Send Me the Download",
      "Get the Cheat Sheet",
      "Download It Free",
    ],
    Urgent: [
      "Download Now — Free for a Limited Time",
      "Get Instant Access",
      "Claim Your Free [PRODUCT] Download",
      "Download Before It’s Gated",
    ],
    Playful: [
      "Gimme the Guide!",
      "Yes, Send Me the Goods",
      "Hook Me Up With That [PRODUCT] Guide",
      "I Want In — Download Now",
    ],
    Premium: [
      "Access Your Exclusive [PRODUCT] Report",
      "Download the Executive Summary",
      "Receive the [PRODUCT] Insights Report",
      "Get the Definitive [PRODUCT] Guide",
    ],
  },
  "Sign up": {
    Professional: [
      "Create Your Account",
      "Sign Up for [PRODUCT]",
      "Get Started With [PRODUCT]",
      "Register Now",
    ],
    Casual: [
      "Join [PRODUCT] — It’s Free",
      "Sign Up in Seconds",
      "Jump In — It’s Free",
      "Create Your Free Account",
    ],
    Urgent: [
      "Sign Up Now — Limited Spots",
      "Join Today Before Registration Closes",
      "Create Your Account Now",
      "Don’t Wait — Sign Up Free",
    ],
    Playful: [
      "Welcome Aboard — Sign Up Free",
      "Come On In!",
      "Join the [PRODUCT] Crew",
      "Let’s Get You Set Up",
    ],
    Premium: [
      "Apply for [PRODUCT] Access",
      "Join the [PRODUCT] Community",
      "Request Your Membership",
      "Become a [PRODUCT] Member",
    ],
  },
  "Start trial": {
    Professional: [
      "Start Your Free Trial",
      "Try [PRODUCT] Free for [X] Days",
      "Begin Your [PRODUCT] Trial",
      "Activate Your Free Trial",
    ],
    Casual: [
      "Try [PRODUCT] Free",
      "Take It for a Test Drive",
      "Start Free — No Card Needed",
      "Give [PRODUCT] a Shot",
    ],
    Urgent: [
      "Start Your Free Trial Today",
      "Try Free — Offer Ends Soon",
      "Activate Your Trial Before It Expires",
      "Claim Your Free Trial Now",
    ],
    Playful: [
      "Try It Free — You’ll Love It",
      "Free Trial? Yes Please!",
      "Test Drive [PRODUCT] Free",
      "Go Ahead, Try It!",
    ],
    Premium: [
      "Experience [PRODUCT] — Complimentary Trial",
      "Begin Your Exclusive Trial",
      "Unlock Your Premium Trial",
      "Start Your Curated Experience",
    ],
  },
  "Get quote": {
    Professional: [
      "Get Your Custom Quote",
      "Request a [PRODUCT] Estimate",
      "Get Pricing for [PRODUCT]",
      "Request Your Free Quote",
    ],
    Casual: [
      "See What [PRODUCT] Costs",
      "Get a Quick Quote",
      "Find Out Your Price",
      "Get Your Estimate — Free",
    ],
    Urgent: [
      "Get Your Quote Today",
      "Request Pricing Before Rates Change",
      "Lock In Your [PRODUCT] Rate",
      "Get an Instant Estimate",
    ],
    Playful: [
      "What’s My Price? Find Out!",
      "Hit Me With a Quote",
      "Let’s Talk Numbers",
      "See Your Custom Price",
    ],
    Premium: [
      "Request a Tailored Proposal",
      "Receive Your Custom [PRODUCT] Estimate",
      "Get a Bespoke Quote",
      "Request Executive Pricing",
    ],
  },
  "Contact us": {
    Professional: [
      "Contact Our Team",
      "Get in Touch With Us",
      "Reach Out to a [PRODUCT] Specialist",
      "Connect With Our Experts",
    ],
    Casual: [
      "Drop Us a Line",
      "Say Hello",
      "Let’s Talk",
      "Send Us a Message",
    ],
    Urgent: [
      "Contact Us Now",
      "Reach Out Today — We’re Ready",
      "Talk to Us Before You Decide",
      "Get Answers Now",
    ],
    Playful: [
      "We’d Love to Hear From You!",
      "Come Say Hi",
      "Let’s Start a Conversation",
      "Ping Us Anytime",
    ],
    Premium: [
      "Schedule a Private Consultation",
      "Connect With Our Senior Team",
      "Arrange a Confidential Discussion",
      "Request a Personal Callback",
    ],
  },
};

const headlineTemplates: Record<Goal, Record<Tone, string[]>> = {
  "Get leads": {
    Professional: [
      "Ready to Elevate Your [PRODUCT] Strategy?",
      "Your Next Growth Opportunity Starts Here",
      "The [PRODUCT] Advantage Your Business Needs",
      "Discover What [PRODUCT] Can Do for Your Bottom Line",
    ],
    Casual: [
      "Want Better Results From [PRODUCT]?",
      "Here’s How [PRODUCT] Gets Easier",
      "Stop Guessing. Start Growing With [PRODUCT].",
      "Your [PRODUCT] Could Be Working Harder",
    ],
    Urgent: [
      "Your Competitors Are Already Using [PRODUCT] — Are You?",
      "Stop Leaving Money on the Table With [PRODUCT]",
      "Every Day Without [PRODUCT] Costs You Leads",
      "The [PRODUCT] Opportunity Window Is Closing",
    ],
    Playful: [
      "What If [PRODUCT] Could Do the Heavy Lifting?",
      "Spoiler: [PRODUCT] Makes Everything Better",
      "Your [PRODUCT] Deserves an Upgrade",
      "Plot Twist: [PRODUCT] Actually Works",
    ],
    Premium: [
      "Exceptional [PRODUCT] for Exceptional Businesses",
      "Where [PRODUCT] Excellence Meets Business Growth",
      "Redefine What [PRODUCT] Can Achieve",
      "The Gold Standard in [PRODUCT]",
    ],
  },
  "Drive sales": {
    Professional: [
      "Invest in [PRODUCT] That Delivers Measurable ROI",
      "[PRODUCT] Built for Results-Driven Teams",
      "The [PRODUCT] Solution Trusted by Industry Leaders",
      "Transform Your Results With [PRODUCT]",
    ],
    Casual: [
      "[PRODUCT] That Actually Delivers",
      "Finally, [PRODUCT] Worth Paying For",
      "Get More From Every Dollar With [PRODUCT]",
      "Better [PRODUCT]. Better Results. Simple.",
    ],
    Urgent: [
      "This [PRODUCT] Deal Won’t Last",
      "Limited-Time [PRODUCT] Offer — Act Fast",
      "Get [PRODUCT] at the Best Price Today",
      "Sale Ends Soon — [PRODUCT] at Its Best Price",
    ],
    Playful: [
      "Your Cart Is Feeling Empty Without [PRODUCT]",
      "[PRODUCT] So Good, You’ll Wonder How You Managed Without It",
      "Warning: [PRODUCT] May Cause Extreme Satisfaction",
      "You + [PRODUCT] = A Beautiful Thing",
    ],
    Premium: [
      "Elevate Every Interaction With [PRODUCT]",
      "[PRODUCT] Crafted for the Discerning Buyer",
      "The Definitive [PRODUCT] Experience",
      "Where Quality Meets [PRODUCT] Performance",
    ],
  },
  "Book demos": {
    Professional: [
      "See How [PRODUCT] Drives Results — Live",
      "Experience the [PRODUCT] Platform in Action",
      "A Personalized [PRODUCT] Walkthrough, On Your Schedule",
      "Discover Why Teams Choose [PRODUCT]",
    ],
    Casual: [
      "Curious About [PRODUCT]? Let Us Show You",
      "See [PRODUCT] in Action — No Strings Attached",
      "A Quick Look at What [PRODUCT] Can Do",
      "Want to See [PRODUCT] Work? We’ll Show You",
    ],
    Urgent: [
      "Demo Slots Are Filling Up — Book [PRODUCT] Now",
      "See [PRODUCT] Before Your Competition Does",
      "Limited Demo Availability This Month",
      "Don’t Decide Without Seeing [PRODUCT] First",
    ],
    Playful: [
      "You’ll Want to See This [PRODUCT] Demo",
      "Warning: This Demo Might Change Everything",
      "Prepare to Be Impressed by [PRODUCT]",
      "The [PRODUCT] Demo Everyone’s Talking About",
    ],
    Premium: [
      "An Exclusive Preview of [PRODUCT]",
      "Experience [PRODUCT] Through a Private Demonstration",
      "Your Personal Introduction to [PRODUCT]",
      "Discover the Art of [PRODUCT] — By Appointment",
    ],
  },
  "Download resource": {
    Professional: [
      "The [PRODUCT] Playbook for Smarter Decisions",
      "Data-Driven Insights for Your [PRODUCT] Strategy",
      "Your Comprehensive [PRODUCT] Resource — Free",
      "Essential [PRODUCT] Knowledge, Delivered",
    ],
    Casual: [
      "Your Free [PRODUCT] Cheat Sheet Is Ready",
      "Everything You Need to Know About [PRODUCT]",
      "The [PRODUCT] Guide You’ve Been Looking For",
      "Free [PRODUCT] Tips — No Sign-Up Needed",
    ],
    Urgent: [
      "Download Now — This [PRODUCT] Resource Won’t Stay Free",
      "Get the [PRODUCT] Report Before It’s Behind a Paywall",
      "Instant Access to Critical [PRODUCT] Data",
      "Act Now — Free [PRODUCT] Download Available Today",
    ],
    Playful: [
      "The [PRODUCT] Guide Your Competitors Don’t Want You to Read",
      "Warning: This [PRODUCT] Download May Boost Your IQ",
      "Free [PRODUCT] Guide? Don’t Mind If We Do",
      "Your Future Self Will Thank You for This [PRODUCT] Download",
    ],
    Premium: [
      "An Authoritative [PRODUCT] Resource for Industry Leaders",
      "The Definitive [PRODUCT] Report — Complimentary",
      "Curated [PRODUCT] Insights for Senior Decision-Makers",
      "Your Executive [PRODUCT] Briefing Awaits",
    ],
  },
  "Sign up": {
    Professional: [
      "Join [X]+ Professionals Who Trust [PRODUCT]",
      "Create Your [PRODUCT] Account and Start Growing",
      "The [PRODUCT] Platform Built for Serious Growth",
      "Your [PRODUCT] Journey Begins With One Step",
    ],
    Casual: [
      "Join [PRODUCT] — It Takes Less Than a Minute",
      "Free to Join. Easy to Love. That’s [PRODUCT].",
      "Why [X]+ Users Already Signed Up for [PRODUCT]",
      "Sign Up and See Why Everyone Loves [PRODUCT]",
    ],
    Urgent: [
      "Registration Is Open — Get [PRODUCT] Access Now",
      "Sign Up Before [PRODUCT] Spots Fill Up",
      "Don’t Miss Your Chance to Join [PRODUCT]",
      "Limited-Time: Free [PRODUCT] Registration",
    ],
    Playful: [
      "Welcome to [PRODUCT] — You’re Going to Like It Here",
      "Sign Up. It’s Free. You’re Welcome.",
      "One Click Away From [PRODUCT] Greatness",
      "Your [PRODUCT] Adventure Starts Now",
    ],
    Premium: [
      "An Invitation to the [PRODUCT] Community",
      "Exclusive [PRODUCT] Membership — Apply Now",
      "Join a Select Group of [PRODUCT] Users",
      "Gain Access to [PRODUCT] — For Qualified Professionals",
    ],
  },
  "Start trial": {
    Professional: [
      "Experience [PRODUCT] With Zero Commitment",
      "Your Risk-Free [PRODUCT] Trial Awaits",
      "Test-Drive [PRODUCT] and See the Difference",
      "Prove the Value of [PRODUCT] — On Us",
    ],
    Casual: [
      "Try [PRODUCT] Free — No Strings, No Stress",
      "See If [PRODUCT] Is Right for You — Free",
      "Give [PRODUCT] a Try. What’s the Worst That Can Happen?",
      "Free Trial. Real Results. That’s [PRODUCT].",
    ],
    Urgent: [
      "Start Your [PRODUCT] Trial Now — Limited Offer",
      "Free [PRODUCT] Trial Ending Soon",
      "Try [PRODUCT] Free While the Offer Lasts",
      "This Free [PRODUCT] Trial Won’t Be Available Forever",
    ],
    Playful: [
      "Go Ahead, Try [PRODUCT] — We Dare You Not to Love It",
      "Your Free [PRODUCT] Trial Is Waiting (Patiently)",
      "Spoiler: You’ll Want to Keep [PRODUCT] After the Trial",
      "Free Trial = Zero Risk, Maximum [PRODUCT] Fun",
    ],
    Premium: [
      "A Complimentary [PRODUCT] Experience, Tailored to You",
      "Your Exclusive [PRODUCT] Trial — No Obligation",
      "Discover [PRODUCT] Excellence at No Cost",
      "Begin Your Curated [PRODUCT] Experience Today",
    ],
  },
  "Get quote": {
    Professional: [
      "Get a Custom [PRODUCT] Quote Tailored to Your Needs",
      "Transparent [PRODUCT] Pricing for Your Business",
      "See What [PRODUCT] Costs for Your Specific Situation",
      "Your Personalized [PRODUCT] Estimate — No Obligation",
    ],
    Casual: [
      "Wondering What [PRODUCT] Costs? Let’s Find Out",
      "Get Your [PRODUCT] Price in Minutes",
      "Quick, Easy [PRODUCT] Quotes — No Hassle",
      "See Your [PRODUCT] Price — No Surprises",
    ],
    Urgent: [
      "Get Your [PRODUCT] Quote Before Prices Increase",
      "Today’s [PRODUCT] Rates Won’t Last",
      "Lock In Your [PRODUCT] Price Now",
      "Request Your Quote Today — Current Pricing Ends Soon",
    ],
    Playful: [
      "Let’s Talk [PRODUCT] Numbers — No Calculator Needed",
      "Your [PRODUCT] Price Tag? Probably Less Than You Think",
      "Find Out What [PRODUCT] Costs (Hint: Worth Every Penny)",
      "Get Your [PRODUCT] Quote — Promise We Won’t Bite",
    ],
    Premium: [
      "A Bespoke [PRODUCT] Proposal for Your Organization",
      "Tailored [PRODUCT] Pricing for Discerning Clients",
      "Your Custom [PRODUCT] Investment Overview",
      "Request a Confidential [PRODUCT] Estimate",
    ],
  },
  "Contact us": {
    Professional: [
      "Let’s Discuss Your [PRODUCT] Needs",
      "Connect With Our [PRODUCT] Experts Today",
      "Start a Conversation About [PRODUCT]",
      "Your [PRODUCT] Questions, Answered by Experts",
    ],
    Casual: [
      "Got Questions About [PRODUCT]? We’ve Got Answers",
      "Let’s Chat About [PRODUCT] — No Pressure",
      "We’re Here to Help With [PRODUCT]",
      "Reach Out — We’re Friendly, We Promise",
    ],
    Urgent: [
      "Don’t Decide on [PRODUCT] Without Talking to Us First",
      "Get [PRODUCT] Answers Now — We’re Online",
      "Speak to a [PRODUCT] Expert Today",
      "Time-Sensitive [PRODUCT] Question? Contact Us Now",
    ],
    Playful: [
      "We Don’t Bite — Reach Out About [PRODUCT]",
      "Your [PRODUCT] Questions Deserve Great Answers",
      "Let’s Have a [PRODUCT] Conversation — Coffee’s on Us",
      "We Love Talking About [PRODUCT] — Seriously",
    ],
    Premium: [
      "A Direct Line to Our [PRODUCT] Leadership Team",
      "Arrange a Confidential [PRODUCT] Discussion",
      "Connect With a Senior [PRODUCT] Advisor",
      "Your [PRODUCT] Inquiry Deserves Personal Attention",
    ],
  },
};

const subheadlineTemplates: Record<Goal, Record<Tone, string[]>> = {
  "Get leads": {
    Professional: [
      "Trusted by [X]+ companies across [your industry]. Get actionable insights in your free consultation.",
      "Our [PRODUCT] specialists have helped businesses achieve measurable growth. See if you qualify.",
    ],
    Casual: [
      "No hard sell, no jargon — just a quick conversation about how [PRODUCT] can help your business.",
      "It takes two minutes to sign up and zero commitment to explore what [PRODUCT] can do for you.",
    ],
    Urgent: [
      "We only take on [X] new clients per month. Secure your consultation before availability runs out.",
      "Businesses that act now gain a head start. Your free [PRODUCT] assessment is waiting.",
    ],
    Playful: [
      "No boring forms, no spammy emails — just real help with [PRODUCT]. Sound good?",
      "We promise not to ghost you. Fill out the form and we will be in touch fast.",
    ],
    Premium: [
      "An exclusive opportunity for forward-thinking businesses ready to lead with [PRODUCT].",
      "Personalized, white-glove [PRODUCT] service for organizations that demand the best.",
    ],
  },
  "Drive sales": {
    Professional: [
      "Backed by data. Proven by results. [PRODUCT] delivers where it matters most.",
      "[X]+ businesses have invested in [PRODUCT] and seen measurable returns.",
    ],
    Casual: [
      "Real people, real results. See why [PRODUCT] is a no-brainer for your business.",
      "Simple pricing. No hidden fees. Just [PRODUCT] that works.",
    ],
    Urgent: [
      "This offer is only available for a limited time. Get [PRODUCT] at today’s price before it changes.",
      "Inventory is limited and demand is high. Don’t wait to secure your [PRODUCT].",
    ],
    Playful: [
      "Your wallet will thank you. Your competition? Not so much. Get [PRODUCT] today.",
      "Life’s too short for bad [PRODUCT]. Upgrade to something that actually delivers.",
    ],
    Premium: [
      "For those who settle for nothing less than the finest [PRODUCT] available.",
      "Crafted with precision. Delivered with care. [PRODUCT] at its absolute best.",
    ],
  },
  "Book demos": {
    Professional: [
      "See exactly how [PRODUCT] fits your workflow. Personalized demos tailored to your use case.",
      "A [X]-minute walkthrough that shows you the features that matter most for your business.",
    ],
    Casual: [
      "No sales pitch — just a friendly walkthrough of [PRODUCT] so you can decide for yourself.",
      "Bring your questions. We will bring the answers. Quick, easy, and zero pressure.",
    ],
    Urgent: [
      "Demo slots fill up fast. Book now and see [PRODUCT] on your schedule.",
      "Your competition is already watching demos. Make sure you are not the last to see [PRODUCT].",
    ],
    Playful: [
      "Grab a coffee, hop on a call, and see why [PRODUCT] is kind of a big deal.",
      "We will keep it short, sweet, and impressive. That is the [PRODUCT] demo promise.",
    ],
    Premium: [
      "A private demonstration designed around your organization’s specific priorities.",
      "Experience [PRODUCT] with a dedicated specialist who understands your industry.",
    ],
  },
  "Download resource": {
    Professional: [
      "Actionable insights and frameworks you can apply to your [PRODUCT] strategy immediately.",
      "Based on real data and expert analysis. Your free [PRODUCT] resource is ready to download.",
    ],
    Casual: [
      "No fluff. No gated nonsense. Just useful [PRODUCT] insights you can use right away.",
      "We put together the [PRODUCT] guide we wish we had when we started. Now it is yours, free.",
    ],
    Urgent: [
      "This free [PRODUCT] resource includes time-sensitive data. Download it while it is current.",
      "Get the insights your competitors are already using. Free [PRODUCT] download — available now.",
    ],
    Playful: [
      "Consider this your secret weapon for [PRODUCT]. Free, useful, and actually worth reading.",
      "We spent weeks researching [PRODUCT] so you do not have to. Download the shortcut.",
    ],
    Premium: [
      "Curated [PRODUCT] research for senior leaders who value depth over noise.",
      "An executive-grade [PRODUCT] resource — complimentary for qualified professionals.",
    ],
  },
  "Sign up": {
    Professional: [
      "Join a growing community of professionals who rely on [PRODUCT] for measurable results.",
      "Set up your [PRODUCT] account in under two minutes. No credit card required.",
    ],
    Casual: [
      "Quick sign-up. Instant access. Real results with [PRODUCT] — it is that simple.",
      "Already [X]+ users love [PRODUCT]. You are going to fit right in.",
    ],
    Urgent: [
      "Open registration will not last. Sign up now to secure your [PRODUCT] access.",
      "Join before this round of [PRODUCT] sign-ups closes. Limited availability.",
    ],
    Playful: [
      "Signing up takes less time than making a cup of coffee. And [PRODUCT] lasts much longer.",
      "Your future self just sent a message: “Sign up for [PRODUCT].” We agree.",
    ],
    Premium: [
      "A carefully curated [PRODUCT] experience for professionals who expect more.",
      "Membership has its privileges. Discover what [PRODUCT] access unlocks.",
    ],
  },
  "Start trial": {
    Professional: [
      "Full access to [PRODUCT] features for [X] days. No credit card. No obligation.",
      "Evaluate [PRODUCT] on your own terms. Our trial gives you everything you need to decide.",
    ],
    Casual: [
      "No credit card, no commitment — just you and [PRODUCT] for [X] free days.",
      "Try it. Love it. Keep it. Or don’t — zero pressure with your [PRODUCT] trial.",
    ],
    Urgent: [
      "This free [PRODUCT] trial offer has an expiration date. Start today.",
      "Thousands have started their [PRODUCT] trial this month. Don’t get left behind.",
    ],
    Playful: [
      "Free trial + amazing [PRODUCT] = no reason not to try. Math checks out.",
      "We are so confident you will love [PRODUCT], we are letting you try it free. Bold move? We know.",
    ],
    Premium: [
      "A complimentary preview of [PRODUCT] — because the best things speak for themselves.",
      "Experience [PRODUCT] at its finest. Your no-obligation trial begins when you are ready.",
    ],
  },
  "Get quote": {
    Professional: [
      "Receive a detailed [PRODUCT] estimate based on your specific requirements. No obligation.",
      "Transparent pricing, no surprises. Get a [PRODUCT] quote that matches your budget and goals.",
    ],
    Casual: [
      "Tell us what you need and we will give you an honest [PRODUCT] price. Quick and painless.",
      "No hidden fees, no confusing packages. Just a straight-up [PRODUCT] quote you can trust.",
    ],
    Urgent: [
      "Current [PRODUCT] pricing is subject to change. Get your quote locked in today.",
      "Rates are moving. Get your [PRODUCT] estimate now to secure today’s pricing.",
    ],
    Playful: [
      "Getting a [PRODUCT] quote is free. Not getting one could cost you. Just saying.",
      "We promise: this [PRODUCT] quote process is painless. Like, zero-papercuts painless.",
    ],
    Premium: [
      "A tailored [PRODUCT] investment analysis for your organization. Discretion guaranteed.",
      "Our team will prepare a comprehensive [PRODUCT] proposal reflecting your unique requirements.",
    ],
  },
  "Contact us": {
    Professional: [
      "Our [PRODUCT] team responds within [X] business hours. Share your challenge and we will help.",
      "Whether you need strategy or support, our [PRODUCT] experts are here to guide you.",
    ],
    Casual: [
      "Real humans, real answers. Drop us a note about [PRODUCT] and we will get back to you quickly.",
      "We read every message. Tell us about your [PRODUCT] needs and let us figure it out together.",
    ],
    Urgent: [
      "Our [PRODUCT] team is standing by. Get answers within [X] hours when you reach out today.",
      "Do not let a [PRODUCT] question hold up your progress. We respond fast.",
    ],
    Playful: [
      "We love hearing from people who care about [PRODUCT]. That includes you. Say hi!",
      "Fun fact: our [PRODUCT] team actually enjoys answering questions. Weird, right? Try us.",
    ],
    Premium: [
      "A direct line to our senior [PRODUCT] team. Confidential, consultative, and client-first.",
      "Your inquiry will be handled by a dedicated [PRODUCT] advisor. Expect a response within [X] hours.",
    ],
  },
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function replacePlaceholder(text: string, product: string): string {
  return text.replace(/\[PRODUCT\]/g, product);
}

/* ------------------------------------------------------------------ */
/*  Copy-to-clipboard button                                           */
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
      aria-label="Copy to clipboard"
      className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center px-3 py-2 text-base font-bold border border-gray-200 text-gray-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "CTA Copy Generator",
          description: "Free CTA generator that creates compelling button text, headlines, and subheadlines tailored to your business type and audience.",
          url: "https://themarkitmedia.com/en/resources/cta-generator",
          applicationCategory: "Marketing Tool",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          provider: { "@type": "Organization", name: "Markit Media", url: "https://themarkitmedia.com" },
        }) }}
      />
      <title>CTA Copy Generator | Free Marketing Tool — Markit Media</title>
      <link rel="canonical" href="https://themarkitmedia.com/en/resources/cta-generator" />
      <meta name="description" content="Free CTA generator that creates compelling button text, headlines, and subheadlines tailored to your business type and audience." />
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */



export default function CtaGeneratorPage() {
  const [businessType, setBusinessType] = useState<BusinessType>("SaaS");
  const [goal, setGoal] = useState<Goal>("Get leads");
  const [tone, setTone] = useState<Tone>("Professional");
  const [product, setProduct] = useState("");
  const [results, setResults] = useState<CtaResult | null>(null);

  const generate = () => {
    const prod = product.trim() || "your product";
    const buttons = shuffle(buttonTemplates[goal][tone]).slice(0, 4).map((t) => replacePlaceholder(t, prod));
    const headlines = shuffle(headlineTemplates[goal][tone]).slice(0, 4).map((t) => replacePlaceholder(t, prod));
    const subs = shuffle(subheadlineTemplates[goal][tone]).map((t) => replacePlaceholder(t, prod));
    setResults({ buttons, headlines, subheadlines: subs });
  };

  return (
    <article>
      <nav className="px-6 lg:px-12 pt-8" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-base text-neutral-400">
          <li><Link href="/" className="hover:text-black transition-colors">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/resources" className="hover:text-black transition-colors">Resources</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-black" aria-current="page">CTA Copy Generator</li>
        </ol>
      </nav>
      {/* ---- Hero ---- */}
      <section aria-label="Free Tool" className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              CTA Copy Generator
            </h1>
            <SectionDesc>
              Generate high-converting call-to-action copy for buttons, headlines, and supporting text. Choose your business type, goal, and tone, then customize.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* ---- Inputs ---- */}
      <section aria-label="Content section" className="px-6 lg:px-12 pb-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Business Type */}
          <Animate animation="fade-up">
            <div>
              <label htmlFor="business-type" className="block text-base font-bold text-black mb-2">
                Business Type
              </label>
              <select
                id="business-type"
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value as BusinessType)}
                className="w-full px-4 py-3 border border-gray-200 text-base bg-white text-black focus-visible:border-black focus-visible:outline-none appearance-none min-h-[44px] focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                {businessTypes.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
          </Animate>

          {/* Goal */}
          <Animate animation="fade-up" delay={40}>
            <div>
              <label htmlFor="goal" className="block text-base font-bold text-black mb-2">
                Goal
              </label>
              <select
                id="goal"
                value={goal}
                onChange={(e) => {
                  setGoal(e.target.value as Goal);
                  setResults(null);
                }}
                className="w-full px-4 py-3 border border-gray-200 text-base bg-white text-black focus-visible:border-black focus-visible:outline-none appearance-none min-h-[44px] focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                {goals.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
          </Animate>

          {/* Tone */}
          <Animate animation="fade-up" delay={80}>
            <div>
              <p className="text-base font-bold text-black mb-3">Tone</p>
              <div className="flex flex-wrap gap-2">
                {tones.map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setTone(t);
                      setResults(null);
                    }}
                    className={`px-5 py-3 min-h-[44px] text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                      tone === t
                        ? "bg-black text-white"
                        : "border border-gray-200 text-gray-600 hover:border-black"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </Animate>

          {/* Product / Service Name */}
          <Animate animation="fade-up" delay={120}>
            <div>
              <label htmlFor="product-name" className="block text-base font-bold text-black mb-2">
                Product / Service Name{" "}
                <span className="font-normal text-gray-400">(optional)</span>
              </label>
              <input
                id="product-name"
                type="text"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                placeholder="e.g. SEO audit, web design, CRM platform"
                className="w-full px-4 py-3 border border-gray-200 text-base min-h-[44px] focus-visible:border-black focus-visible:outline-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              />
            </div>
          </Animate>

          {/* Generate */}
          <Animate animation="fade-up" delay={160}>
            <button
              onClick={generate}
              className="bg-black text-white px-8 py-4 min-h-[44px] text-base font-bold hover:bg-gray-900 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              Generate CTAs
            </button>
          </Animate>
        </div>
      </section>

      {/* ---- Results ---- */}
      {results && (
        <section aria-label="Button CTAs" className="px-6 lg:px-12 pb-12">
          <div className="max-w-3xl mx-auto space-y-8">
            {/* Button CTAs */}
            <Animate animation="fade-up">
              <div className="border border-gray-200 overflow-hidden">
                <div className="bg-black text-white p-4">
                  <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold">
                    Button CTAs
                  </h2>
                  <p className="text-base text-gray-400 mt-1">Short, action-oriented text for buttons and links</p>
                </div>
                <div className="divide-y divide-gray-200">
                  {results.buttons.map((cta, i) => (
                    <div key={i} className="flex items-center justify-between gap-4 p-4">
                      <p className="text-base text-black font-bold">{cta}</p>
                      <CopyButton text={cta} />
                    </div>
                  ))}
                </div>
              </div>
            </Animate>

            {/* Headline CTAs */}
            <Animate animation="fade-up" delay={40}>
              <div className="border border-gray-200 overflow-hidden">
                <div className="bg-black text-white p-4">
                  <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold">
                    Headline CTAs
                  </h2>
                  <p className="text-base text-gray-400 mt-1">Longer, benefit-driven headlines that grab attention</p>
                </div>
                <div className="divide-y divide-gray-200">
                  {results.headlines.map((cta, i) => (
                    <div key={i} className="flex items-center justify-between gap-4 p-4">
                      <p className="text-base text-black font-bold">{cta}</p>
                      <CopyButton text={cta} />
                    </div>
                  ))}
                </div>
              </div>
            </Animate>

            {/* Subheadline CTAs */}
            <Animate animation="fade-up" delay={80}>
              <div className="border border-gray-200 overflow-hidden">
                <div className="bg-black text-white p-4">
                  <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold">
                    Subheadline CTAs
                  </h2>
                  <p className="text-base text-gray-400 mt-1">Supporting text that reinforces the main message</p>
                </div>
                <div className="divide-y divide-gray-200">
                  {results.subheadlines.map((cta, i) => (
                    <div key={i} className="flex items-center justify-between gap-4 p-4">
                      <p className="text-base text-gray-600 leading-relaxed">{cta}</p>
                      <CopyButton text={cta} />
                    </div>
                  ))}
                </div>
              </div>
            </Animate>
          </div>
        </section>
      )}

      {/* ---- Tips ---- */}
      <section aria-label="Start with an action verb" className="px-6 lg:px-12 py-16">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">
              CTA Best Practices
            </h2>
            <div className="space-y-6 text-base text-gray-500 leading-relaxed">
              <div>
                <h3 className="font-bold text-black mb-2">Start with an action verb</h3>
                <p>The strongest CTAs begin with a verb: Get, Start, Download, Book, Join, Claim. Action verbs create momentum and tell the reader exactly what to do next.</p>
              </div>
              <div>
                <h3 className="font-bold text-black mb-2">Lead with the benefit, not the action</h3>
                <p>&quot;Grow Your Revenue&quot; outperforms &quot;Click Here&quot; because it answers the reader&apos;s real question: &quot;What is in it for me?&quot; Frame every CTA around the outcome the user will receive.</p>
              </div>
              <div>
                <h3 className="font-bold text-black mb-2">Create urgency without faking it</h3>
                <p>Phrases like &quot;Limited availability&quot; or &quot;Offer ends [date]&quot; work when they are true. Manufactured urgency erodes trust. Use real deadlines, real scarcity, or time-bound value instead.</p>
              </div>
              <div>
                <h3 className="font-bold text-black mb-2">Be specific about the next step</h3>
                <p>&quot;Book a 15-Minute Strategy Call&quot; converts better than &quot;Contact Us&quot; because it sets clear expectations. Specificity reduces friction and increases confidence.</p>
              </div>
              <div>
                <h3 className="font-bold text-black mb-2">A/B test your CTAs</h3>
                <p>Small wording changes can produce large differences in conversion rates. Test button text, headline phrasing, and supporting copy separately. Let data decide, not opinions.</p>
              </div>
            </div>
          </Animate>
        </div>
      </section>

      {/* ---- Bottom CTA ---- */}
      <section aria-label="Call to action" className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Need CTAs That Actually Convert?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Our team writes conversion-focused copy for landing pages, ads, emails, and more — tested and optimized for your audience.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 min-h-[44px] font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              Get Expert Copywriting &rarr;
            </Link>
          </Animate>
        </div>
      </section>
          <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "CTA Generator — Create High-Converting Button Text & Headlines",
          description: "Free CTA generator that creates compelling button text, headlines, and subheadlines tailored to your business type and audience.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />
    
      <ToolCTA
        toolName="Cta Generator"
        services={[
          { title: "Content Marketing", desc: "Strategic content that drives traffic, engagement, and conversions.", href: "/services/content-marketing" },
          { title: "SEO", desc: "Content optimized for search engines and human readers alike.", href: "/services/seo" },
          { title: "Social Media Marketing", desc: "Distribute your content where your audience already is.", href: "/services/social-media-marketing" },
        ]}
        relatedTools={[
          { title: "Content Roi Calculator", href: "/resources/content-roi-calculator" },
          { title: "Contrast Checker", href: "/resources/contrast-checker" },
          { title: "Conversion Checklist", href: "/resources/conversion-checklist" },
          { title: "Conversion Funnel Simulator", href: "/resources/conversion-funnel-simulator" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
