"use client";

import { useState } from "react";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const industries = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Real Estate",
  "E-Commerce",
  "Food & Beverage",
  "Travel & Hospitality",
  "Fitness & Wellness",
  "Legal Services",
  "Marketing & Advertising",
  "Construction",
  "Automotive",
  "Non-Profit",
  "Fashion & Beauty",
] as const;

type Industry = (typeof industries)[number];

const personalityTraits = [
  "Professional",
  "Friendly",
  "Bold",
  "Playful",
  "Authoritative",
  "Warm",
  "Innovative",
  "Trustworthy",
] as const;

type Trait = (typeof personalityTraits)[number];

const toneOptions = ["Formal", "Conversational", "Casual"] as const;
type Tone = (typeof toneOptions)[number];

const ageRanges = [
  "18-24",
  "25-34",
  "35-44",
  "45-54",
  "55+",
  "All Ages",
] as const;
type AgeRange = (typeof ageRanges)[number];

/* ------------------------------------------------------------------ */
/*  Voice data maps                                                    */
/* ------------------------------------------------------------------ */

const traitDescriptors: Record<Trait, { adj: string; approach: string }> = {
  Professional: { adj: "polished and competent", approach: "clear expertise and measured confidence" },
  Friendly: { adj: "approachable and welcoming", approach: "warmth and genuine interest in the audience" },
  Bold: { adj: "confident and unapologetic", approach: "strong statements and decisive language" },
  Playful: { adj: "lighthearted and engaging", approach: "humor, wit, and an energetic rhythm" },
  Authoritative: { adj: "commanding and credible", approach: "data-backed claims and industry leadership" },
  Warm: { adj: "empathetic and caring", approach: "emotional connection and understanding" },
  Innovative: { adj: "forward-thinking and creative", approach: "fresh perspectives and modern language" },
  Trustworthy: { adj: "reliable and transparent", approach: "honesty, consistency, and proof points" },
};

const toneModifiers: Record<Tone, { style: string; register: string }> = {
  Formal: { style: "structured, precise sentences with industry-appropriate terminology", register: "elevated and respectful" },
  Conversational: { style: "natural, flowing sentences that feel like a knowledgeable friend talking", register: "balanced and relatable" },
  Casual: { style: "short, punchy sentences with everyday language and contractions", register: "relaxed and down-to-earth" },
};

const audienceNotes: Record<AgeRange, string> = {
  "18-24": "Use current references, keep things visual and scannable, and lean into authenticity over polish.",
  "25-34": "Balance aspiration with practicality. This audience values efficiency, social proof, and clear value propositions.",
  "35-44": "Speak to experience and results. This group appreciates substance, case studies, and straightforward messaging.",
  "45-54": "Prioritize trust and expertise. Avoid trendy slang and focus on proven outcomes and reliability.",
  "55+": "Use clear, respectful language. Emphasize tradition, quality, and personal service over novelty.",
  "All Ages": "Use universally accessible language. Avoid generational slang and focus on clarity and shared values.",
};

const industryContext: Record<Industry, { sector: string; audience: string }> = {
  Technology: { sector: "tech", audience: "tech-savvy users and decision-makers" },
  Healthcare: { sector: "healthcare", audience: "patients and healthcare professionals" },
  Finance: { sector: "financial", audience: "investors, savers, and business owners" },
  Education: { sector: "education", audience: "students, parents, and educators" },
  "Real Estate": { sector: "real estate", audience: "buyers, sellers, and property investors" },
  "E-Commerce": { sector: "e-commerce", audience: "online shoppers and retail brands" },
  "Food & Beverage": { sector: "food and beverage", audience: "food enthusiasts and health-conscious consumers" },
  "Travel & Hospitality": { sector: "travel and hospitality", audience: "travelers and experience seekers" },
  "Fitness & Wellness": { sector: "fitness and wellness", audience: "health-focused individuals and athletes" },
  "Legal Services": { sector: "legal", audience: "individuals and businesses seeking legal counsel" },
  "Marketing & Advertising": { sector: "marketing", audience: "brands, marketers, and business owners" },
  Construction: { sector: "construction", audience: "property developers and project managers" },
  Automotive: { sector: "automotive", audience: "vehicle buyers and automotive enthusiasts" },
  "Non-Profit": { sector: "non-profit", audience: "donors, volunteers, and community members" },
  "Fashion & Beauty": { sector: "fashion and beauty", audience: "style-conscious consumers and trend followers" },
};

/* word banks keyed by trait */
const traitWordBanks: Record<Trait, { use: string[]; avoid: string[] }> = {
  Professional: {
    use: ["streamline", "optimize", "deliver", "strategic", "proven", "results-driven", "efficient", "expertise"],
    avoid: ["kinda", "stuff", "whatever", "dude"],
  },
  Friendly: {
    use: ["welcome", "together", "enjoy", "love", "community", "connect", "share", "genuine"],
    avoid: ["mandate", "compliance", "strictly", "penalty"],
  },
  Bold: {
    use: ["disrupt", "dominate", "unstoppable", "fearless", "transform", "revolutionize", "powerhouse", "game-changer"],
    avoid: ["maybe", "possibly", "somewhat", "hopefully"],
  },
  Playful: {
    use: ["spark", "surprise", "delight", "adventure", "fresh", "vibrant", "buzz", "wow"],
    avoid: ["pursuant", "henceforth", "notwithstanding", "whereas"],
  },
  Authoritative: {
    use: ["research", "evidence", "proven", "benchmark", "standard", "definitive", "leading", "comprehensive"],
    avoid: ["guess", "probably", "might", "unsure"],
  },
  Warm: {
    use: ["care", "nurture", "support", "understand", "comfort", "heartfelt", "embrace", "thoughtful"],
    avoid: ["transactional", "leverage", "exploit", "extract"],
  },
  Innovative: {
    use: ["pioneer", "reimagine", "breakthrough", "next-gen", "cutting-edge", "evolve", "future-ready", "trailblaze"],
    avoid: ["traditional", "conventional", "old-school", "legacy"],
  },
  Trustworthy: {
    use: ["guarantee", "transparent", "honest", "reliable", "consistent", "verified", "dependable", "accountable"],
    avoid: ["hype", "unbelievable", "insane", "ridiculous"],
  },
};

const toneWordBanks: Record<Tone, { use: string[]; avoid: string[] }> = {
  Formal: {
    use: ["furthermore", "accordingly", "establish", "demonstrate", "facilitate", "comprehensive"],
    avoid: ["cool", "awesome", "tons", "gonna", "wanna", "LOL"],
  },
  Conversational: {
    use: ["simply", "discover", "imagine", "explore", "real", "actually"],
    avoid: ["herein", "aforementioned", "notwithstanding", "heretofore", "shall", "thus"],
  },
  Casual: {
    use: ["easy", "quick", "grab", "check out", "get started", "totally"],
    avoid: ["utilize", "leverage", "synergize", "endeavor", "facilitate", "henceforth"],
  },
};

/* do's and don'ts keyed by tone + trait combo patterns */
function generateDosAndDonts(traits: Trait[], tone: Tone): { dos: string[]; donts: string[] } {
  const pool: { dos: string[]; donts: string[] } = { dos: [], donts: [] };

  /* tone-based */
  if (tone === "Formal") {
    pool.dos.push(
      "Use complete sentences with proper grammar at all times",
      "Address the audience with respect and professionalism",
      "Support claims with data, statistics, or case studies",
    );
    pool.donts.push(
      "Use slang, abbreviations, or internet shorthand",
      "Start sentences with conjunctions like 'But' or 'And'",
      "Make exaggerated or unsubstantiated claims",
    );
  } else if (tone === "Conversational") {
    pool.dos.push(
      "Write like you are talking to a smart friend over coffee",
      "Use contractions naturally (we're, you'll, it's)",
      "Ask questions to engage the reader directly",
    );
    pool.donts.push(
      "Use jargon without explaining it first",
      "Write long, complex sentences that lose the reader",
      "Sound robotic or overly scripted",
    );
  } else {
    pool.dos.push(
      "Keep sentences short and punchy for quick reading",
      "Use everyday language your audience actually speaks",
      "Inject personality and let the brand feel human",
    );
    pool.donts.push(
      "Use corporate buzzwords or stiff language",
      "Over-explain simple concepts",
      "Sacrifice clarity for cleverness",
    );
  }

  /* trait-based */
  for (const trait of traits) {
    switch (trait) {
      case "Professional":
        pool.dos.push("Maintain consistency in terminology and formatting");
        pool.donts.push("Use overly casual expressions in client-facing copy");
        break;
      case "Friendly":
        pool.dos.push("Use inclusive language like 'we' and 'together'");
        pool.donts.push("Sound distant or detached from the audience");
        break;
      case "Bold":
        pool.dos.push("Take a clear stance and own your perspective");
        pool.donts.push("Hedge every statement with qualifiers");
        break;
      case "Playful":
        pool.dos.push("Use metaphors, wordplay, or unexpected phrasing");
        pool.donts.push("Force humor where it does not fit the topic");
        break;
      case "Authoritative":
        pool.dos.push("Reference industry benchmarks and credible sources");
        pool.donts.push("Present opinions as facts without backing them up");
        break;
      case "Warm":
        pool.dos.push("Acknowledge the reader's feelings and challenges");
        pool.donts.push("Sound dismissive of customer pain points");
        break;
      case "Innovative":
        pool.dos.push("Highlight what is new, different, or forward-looking");
        pool.donts.push("Rely on cliches or overused marketing phrases");
        break;
      case "Trustworthy":
        pool.dos.push("Be upfront about limitations or terms");
        pool.donts.push("Overpromise results you cannot consistently deliver");
        break;
    }
  }

  return {
    dos: pool.dos.slice(0, 5),
    donts: pool.donts.slice(0, 5),
  };
}

/* ------------------------------------------------------------------ */
/*  Content generators                                                 */
/* ------------------------------------------------------------------ */

function buildVoiceSummary(industry: Industry, traits: Trait[], tone: Tone, age: AgeRange): string {
  const ctx = industryContext[industry];
  const tm = toneModifiers[tone];
  const t1 = traitDescriptors[traits[0]];
  const t2 = traitDescriptors[traits[1]];
  const t3 = traitDescriptors[traits[2]];

  return (
    `Your brand voice is ${t1.adj}, ${t2.adj}, and ${t3.adj}. ` +
    `In the ${ctx.sector} space, your communication should project ${t1.approach} while weaving in ${t2.approach} and ${t3.approach}. ` +
    `Your writing style is ${tm.style}, with a register that feels ${tm.register}. ` +
    `When speaking to ${ctx.audience} in the ${age} age range, ${audienceNotes[age].toLowerCase()} ` +
    `Every piece of content should reinforce these qualities consistently across all channels.`
  );
}

function buildSocialPost(industry: Industry, traits: Trait[], tone: Tone): string {
  const ctx = industryContext[industry];
  const primary = traits[0];
  const templates: Record<Tone, Record<Trait, string>> = {
    Formal: {
      Professional: `We are proud to announce our latest ${ctx.sector} initiative designed to deliver measurable results for ${ctx.audience}. Excellence is not a goal — it is our standard.`,
      Friendly: `Exciting news for ${ctx.audience}! We have been working on something special in the ${ctx.sector} space, and we cannot wait to share it with you. Stay tuned.`,
      Bold: `The ${ctx.sector} industry needs disruption. We are here to deliver it. If you are ready for a new standard, follow along — this changes everything.`,
      Playful: `Who said ${ctx.sector} had to be boring? We are bringing a fresh perspective to ${ctx.audience} — and yes, it is as exciting as it sounds.`,
      Authoritative: `Based on our analysis of current ${ctx.sector} trends, we have identified three key strategies that ${ctx.audience} should implement immediately. Read our latest insight.`,
      Warm: `To every one of our clients in ${ctx.sector}: we see your challenges, we understand your goals, and we are here to walk this journey with you. You are not alone.`,
      Innovative: `The future of ${ctx.sector} is here. We have developed a new approach that ${ctx.audience} have been asking for — and it goes beyond what anyone expected.`,
      Trustworthy: `Transparency matters. Here is exactly how we help ${ctx.audience} in the ${ctx.sector} space: real numbers, real results, no fine print.`,
    },
    Conversational: {
      Professional: `We just wrapped up a great project in ${ctx.sector}, and the results speak for themselves. If you are one of the ${ctx.audience} looking for real impact, let us talk.`,
      Friendly: `Hey ${ctx.audience}! We have got something cooking in the ${ctx.sector} world that we think you will love. Hint: it makes your life a lot easier.`,
      Bold: `Tired of the same old approach in ${ctx.sector}? So are we. That is why we built something completely different. Ready to see what is possible?`,
      Playful: `Plot twist: ${ctx.sector} just got a whole lot more interesting. We have been busy creating something fun for ${ctx.audience} — details dropping soon!`,
      Authoritative: `We have spent years studying what works in ${ctx.sector}. Here are three insights that every member of ${ctx.audience} should know right now.`,
      Warm: `We started this company because we genuinely care about ${ctx.audience}. Every decision we make in ${ctx.sector} comes back to one question: does this help our people?`,
      Innovative: `What if ${ctx.sector} worked completely differently? We asked that question and built the answer. ${ctx.audience}, this one is for you.`,
      Trustworthy: `No gimmicks, no fluff. Here is what we actually delivered for ${ctx.audience} last quarter in ${ctx.sector} — and what we are planning next.`,
    },
    Casual: {
      Professional: `Just shipped something big for our ${ctx.sector} clients. Real results, no fluff. DM us if you want the details.`,
      Friendly: `Hey friends! Big things happening over here in ${ctx.sector}. We are so excited to share this with ${ctx.audience} like you. More soon!`,
      Bold: `${ctx.sector} will never be the same. We just made sure of that. Stay tuned.`,
      Playful: `Okay ${ctx.audience}, pop quiz: what happens when you mix ${ctx.sector} with a team that actually has fun? You are about to find out.`,
      Authoritative: `Quick ${ctx.sector} tip for ${ctx.audience}: stop guessing, start measuring. We have got the data to prove it works.`,
      Warm: `Shoutout to our amazing ${ctx.sector} community. You inspire everything we do. This next chapter is for you.`,
      Innovative: `We just built something ${ctx.sector} has never seen before. ${ctx.audience}, get ready. This is going to be good.`,
      Trustworthy: `Here is our honest take on ${ctx.sector} right now: what is working, what is not, and what we are doing about it.`,
    },
  };
  return templates[tone][primary];
}

function buildEmailOpening(industry: Industry, traits: Trait[], tone: Tone): string {
  const ctx = industryContext[industry];
  const primary = traits[0];
  const openers: Record<Tone, Record<Trait, string>> = {
    Formal: {
      Professional: `Dear valued client, I am writing to share an important update regarding our ${ctx.sector} services that directly impacts your business objectives.`,
      Friendly: `Hello! I hope this message finds you well. I wanted to personally reach out with some exciting ${ctx.sector} news that I think you will appreciate.`,
      Bold: `I will get straight to the point: we have developed a ${ctx.sector} solution that outperforms everything currently available, and I want you to be among the first to know.`,
      Playful: `Good news travels fast, and this ${ctx.sector} update is no exception. I am delighted to share something that will bring a smile to your day.`,
      Authoritative: `After extensive research into the ${ctx.sector} landscape, our team has identified a significant opportunity for ${ctx.audience}. I would like to present our findings.`,
      Warm: `I wanted to take a moment to reach out personally. We have been thinking about the challenges facing ${ctx.audience}, and we have something meaningful to share.`,
      Innovative: `The ${ctx.sector} industry is evolving faster than ever. I am reaching out because we have pioneered something that we believe will reshape how you approach your work.`,
      Trustworthy: `Thank you for your continued trust. I am writing with a transparent update on our ${ctx.sector} services, including both our wins and the areas where we are improving.`,
    },
    Conversational: {
      Professional: `Hi there — quick note about something we have been working on in ${ctx.sector} that I think you will find valuable.`,
      Friendly: `Hey! Hope your week is going well. I have some ${ctx.sector} news to share that I am really excited about.`,
      Bold: `No small talk today — I have got a ${ctx.sector} update that is too important to bury under pleasantries.`,
      Playful: `Guess what? We have been up to something fun in the ${ctx.sector} space, and I think you are going to love it.`,
      Authoritative: `I have been analyzing the latest ${ctx.sector} data, and there are a few things I think you need to know.`,
      Warm: `I have been thinking about you and your ${ctx.sector} goals. There is something I would love to share that I think could really help.`,
      Innovative: `Something interesting just happened in ${ctx.sector}. We built something new, and I wanted you to hear about it from us first.`,
      Trustworthy: `I want to be upfront with you: we have some ${ctx.sector} updates to share, and I think you deserve the full picture.`,
    },
    Casual: {
      Professional: `Hey — wanted to loop you in on something new we are doing in ${ctx.sector}. Think you will dig it.`,
      Friendly: `Hi! Quick heads up — we have got some cool ${ctx.sector} stuff to share with you.`,
      Bold: `Big news. We just changed the game in ${ctx.sector}. Here is what you need to know.`,
      Playful: `Okay, so this might be the most fun ${ctx.sector} email you get all week. Ready?`,
      Authoritative: `Real talk about ${ctx.sector}: here is what the data says and why it matters for you.`,
      Warm: `Just wanted to check in and share something from our ${ctx.sector} team that was made with you in mind.`,
      Innovative: `We just built something wild for ${ctx.sector}. Had to tell you about it.`,
      Trustworthy: `Keeping it real: here is everything you need to know about our latest ${ctx.sector} update. No surprises.`,
    },
  };
  return openers[tone][primary];
}

function buildHeadline(industry: Industry, traits: Trait[], tone: Tone): string {
  const ctx = industryContext[industry];
  const primary = traits[0];
  const headlines: Record<Tone, Record<Trait, string>> = {
    Formal: {
      Professional: `Elevating ${ctx.sector} standards through proven methodology`,
      Friendly: `Your trusted partner in ${ctx.sector} success`,
      Bold: `Redefining what ${ctx.sector} excellence looks like`,
      Playful: `${ctx.sector} solutions that exceed expectations — every time`,
      Authoritative: `The definitive approach to modern ${ctx.sector} strategy`,
      Warm: `Dedicated to the people behind every ${ctx.sector} decision`,
      Innovative: `Pioneering the next era of ${ctx.sector} performance`,
      Trustworthy: `Built on integrity: ${ctx.sector} services you can verify`,
    },
    Conversational: {
      Professional: `Better ${ctx.sector} results start here`,
      Friendly: `We make ${ctx.sector} work for people like you`,
      Bold: `Stop settling for average ${ctx.sector} results`,
      Playful: `${ctx.sector} just got a serious upgrade`,
      Authoritative: `What the top performers in ${ctx.sector} know that you don't`,
      Warm: `${ctx.sector} built around what matters most to you`,
      Innovative: `A smarter way to approach ${ctx.sector}`,
      Trustworthy: `${ctx.sector} services with nothing to hide`,
    },
    Casual: {
      Professional: `${ctx.sector} done right`,
      Friendly: `Let's make ${ctx.sector} easy together`,
      Bold: `${ctx.sector} will never be the same`,
      Playful: `${ctx.sector} but make it fun`,
      Authoritative: `The only ${ctx.sector} guide you need`,
      Warm: `We're here for your ${ctx.sector} journey`,
      Innovative: `The future of ${ctx.sector} starts now`,
      Trustworthy: `Honest ${ctx.sector}. Real results.`,
    },
  };
  return headlines[tone][primary];
}

function buildCustomerResponse(industry: Industry, traits: Trait[], tone: Tone): string {
  const ctx = industryContext[industry];
  const primary = traits[0];
  const responses: Record<Tone, Record<Trait, string>> = {
    Formal: {
      Professional: `Thank you for reaching out. We understand the importance of this matter to your ${ctx.sector} objectives. Our team is reviewing your request and will provide a comprehensive response within one business day. Please do not hesitate to contact us if you require immediate assistance.`,
      Friendly: `Thank you so much for contacting us! We really appreciate you taking the time, and we want to make sure we get this right for you. Our ${ctx.sector} team is on it, and you will hear back from us very soon.`,
      Bold: `We received your message and we are on it. In the ${ctx.sector} space, speed matters — and so does getting it right. Expect a thorough response from our team within 24 hours.`,
      Playful: `Your message just landed on our desk and we are already on it! We take ${ctx.sector} questions seriously (even if we do not always take ourselves seriously). You will hear from us shortly.`,
      Authoritative: `Thank you for your inquiry. Based on our extensive experience in ${ctx.sector}, we will prepare a detailed response addressing your specific situation. You can expect a comprehensive reply from our senior team within one business day.`,
      Warm: `Thank you for reaching out to us — we know that navigating ${ctx.sector} decisions can feel overwhelming, and we are here to help. Our team will respond with care and attention to your unique needs within the next business day.`,
      Innovative: `Thank you for your message. We are always looking for better ways to serve ${ctx.audience} like you. Our team is preparing a response that goes beyond the standard approach — expect something thoughtful within 24 hours.`,
      Trustworthy: `Thank you for contacting us. We believe in straightforward communication, so here is what happens next: your message has been assigned to our ${ctx.sector} team, and you will receive a direct response within one business day. No automated replies, just real answers.`,
    },
    Conversational: {
      Professional: `Thanks for reaching out! We have got your message and our ${ctx.sector} team is on it. You will get a solid answer from us within 24 hours.`,
      Friendly: `Hey, thanks for getting in touch! We love hearing from ${ctx.audience} and your question is a great one. We are working on a helpful response and you will have it soon.`,
      Bold: `Got your message. We do not do cookie-cutter responses in ${ctx.sector}, so give us a moment to put together something that actually helps. Back to you within 24 hours.`,
      Playful: `Your message made it to us! Our ${ctx.sector} crew is already brainstorming the best answer for you. Hang tight — good things coming your way soon.`,
      Authoritative: `Thanks for the question. Based on what we know about ${ctx.sector}, we can definitely help here. Our team will follow up with a detailed answer within 24 hours.`,
      Warm: `Thanks so much for reaching out. We get it — ${ctx.sector} questions can be stressful. We are here for you and will have a thoughtful response within a day.`,
      Innovative: `Great question! We are always exploring new angles in ${ctx.sector}, and yours is one worth digging into. Our team will get back to you with a fresh perspective within 24 hours.`,
      Trustworthy: `Thanks for your message. Here is what is happening: our ${ctx.sector} team has your question and will respond directly within 24 hours. No runaround.`,
    },
    Casual: {
      Professional: `Got it! Our ${ctx.sector} team is taking a look and we will get back to you ASAP.`,
      Friendly: `Hey, thanks for reaching out! We are on it and will have an answer for you super soon.`,
      Bold: `Message received. We will have a real answer (not a generic one) for you within the day.`,
      Playful: `Ooh, great question! Our ${ctx.sector} team is already on the case. Stay tuned!`,
      Authoritative: `Thanks for asking. Our ${ctx.sector} experts have your question and will follow up shortly.`,
      Warm: `Hey! Thanks for trusting us with your question. We will get back to you with something helpful really soon.`,
      Innovative: `Love the question! Cooking up a good answer for you now. Back to you shortly.`,
      Trustworthy: `Got your message. Real person reading it, real answer coming soon. No bots here.`,
    },
  };
  return responses[tone][primary];
}

function buildWordBank(traits: Trait[], tone: Tone): { use: string[]; avoid: string[] } {
  const useSet = new Set<string>();
  const avoidSet = new Set<string>();

  for (const trait of traits) {
    for (const w of traitWordBanks[trait].use) useSet.add(w);
    for (const w of traitWordBanks[trait].avoid) avoidSet.add(w);
  }
  for (const w of toneWordBanks[tone].use) useSet.add(w);
  for (const w of toneWordBanks[tone].avoid) avoidSet.add(w);

  return {
    use: Array.from(useSet).slice(0, 20),
    avoid: Array.from(avoidSet).slice(0, 10),
  };
}

/* ------------------------------------------------------------------ */
/*  Result interface                                                   */
/* ------------------------------------------------------------------ */

interface VoiceGuide {
  summary: string;
  dos: string[];
  donts: string[];
  socialPost: string;
  emailOpening: string;
  headline: string;
  customerResponse: string;
  wordsToUse: string[];
  wordsToAvoid: string[];
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */



export default function BrandVoiceGeneratorPage() {
  const [industry, setIndustry] = useState<Industry | "">("");
  const [selectedTraits, setSelectedTraits] = useState<Trait[]>([]);
  const [ageRange, setAgeRange] = useState<AgeRange | "">("");
  const [tone, setTone] = useState<Tone | "">("");
  const [result, setResult] = useState<VoiceGuide | null>(null);
  const [copied, setCopied] = useState(false);

  const toggleTrait = (t: Trait) => {
    setSelectedTraits((prev) => {
      if (prev.includes(t)) return prev.filter((x) => x !== t);
      if (prev.length >= 3) return prev;
      return [...prev, t];
    });
    setResult(null);
  };

  const canGenerate = industry !== "" && selectedTraits.length === 3 && ageRange !== "" && tone !== "";

  const generate = () => {
    if (!canGenerate) return;
    const i = industry as Industry;
    const t = tone as Tone;
    const a = ageRange as AgeRange;

    const { dos, donts } = generateDosAndDonts(selectedTraits, t);
    const wordBank = buildWordBank(selectedTraits, t);

    setResult({
      summary: buildVoiceSummary(i, selectedTraits, t, a),
      dos,
      donts,
      socialPost: buildSocialPost(i, selectedTraits, t),
      emailOpening: buildEmailOpening(i, selectedTraits, t),
      headline: buildHeadline(i, selectedTraits, t),
      customerResponse: buildCustomerResponse(i, selectedTraits, t),
      wordsToUse: wordBank.use,
      wordsToAvoid: wordBank.avoid,
    });
  };

  const copyAll = () => {
    if (!result) return;
    const text = [
      "BRAND VOICE GUIDE",
      "=".repeat(40),
      "",
      `Industry: ${industry}`,
      `Personality: ${selectedTraits.join(", ")}`,
      `Audience: ${ageRange}`,
      `Tone: ${tone}`,
      "",
      "BRAND VOICE SUMMARY",
      "-".repeat(40),
      result.summary,
      "",
      "DO'S",
      "-".repeat(40),
      ...result.dos.map((d, i) => `${i + 1}. ${d}`),
      "",
      "DON'TS",
      "-".repeat(40),
      ...result.donts.map((d, i) => `${i + 1}. ${d}`),
      "",
      "SAMPLE SOCIAL MEDIA POST",
      "-".repeat(40),
      result.socialPost,
      "",
      "SAMPLE EMAIL OPENING",
      "-".repeat(40),
      result.emailOpening,
      "",
      "SAMPLE HEADLINE",
      "-".repeat(40),
      result.headline,
      "",
      "SAMPLE CUSTOMER RESPONSE",
      "-".repeat(40),
      result.customerResponse,
      "",
      "WORD BANK — WORDS TO USE",
      "-".repeat(40),
      result.wordsToUse.join(", "),
      "",
      "WORD BANK — WORDS TO AVOID",
      "-".repeat(40),
      result.wordsToAvoid.join(", "),
      "",
      "=".repeat(40),
      "Generated with the Brand Voice Generator at themarkitmedia.com",
    ].join("\n");

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Brand Voice Generator",
          description: "Generate a complete brand voice guide including tone, do",
          url: "https://themarkitmedia.com/en/resources/brand-voice-generator",
          applicationCategory: "Branding Tool",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          provider: { "@type": "Organization", name: "Markit Media", url: "https://themarkitmedia.com" },
        }) }}
      />
      <title>Brand Voice Generator | Free Marketing Tool — Markit Media</title>
      <meta name="description" content="Generate a complete brand voice guide including tone, do" />
      
      {/* Related Tools */}
      <section className="px-6 lg:px-12 py-12" aria-label="Related tools">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">Related Tools</h2>
          <div className="flex flex-wrap gap-3">
                <Link href="/resources/brand-name-generator" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Brand Name Generator</Link>
                <Link href="/resources/brand-name-evaluator" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Brand Name Evaluator</Link>
                <Link href="/resources/brand-voice-checker" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Brand Voice Checker</Link>
                <Link href="/resources/brand-tone-generator" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Brand Tone Generator</Link>
          </div>
        </div>
      </section>
<JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Brand Voice Generator",
          description:
            "Generate a complete brand voice guide including tone, do's and don'ts, sample content, and word banks tailored to your industry and personality.",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />

      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: "Brand Voice Generator" },
        ]}
      />

      {/* Hero */}
      <section aria-label="Free Tool" className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Brand Voice Generator
            </h1>
            <SectionDesc>
              Define your brand voice in minutes. Select your industry, personality traits, audience, and tone to generate a complete voice guide with sample content and word banks.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* Form */}
      <section aria-label="Content section" className="px-6 lg:px-12 pb-8">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Industry */}
          <Animate animation="fade-up">
            <div>
              <label htmlFor="industry" className="block text-base font-bold text-black mb-3">
                Industry
              </label>
              <select
                id="industry"
                value={industry}
                onChange={(e) => { setIndustry(e.target.value as Industry); setResult(null); }}
                className="w-full px-4 py-3 border border-gray-200 bg-white text-base min-h-[44px] focus-visible:border-black focus-visible:outline-none"
              >
                <option value="">Select your industry</option>
                {industries.map((ind) => (
                  <option key={ind} value={ind}>{ind}</option>
                ))}
              </select>
            </div>
          </Animate>

          {/* Personality Traits */}
          <Animate animation="fade-up" delay={40}>
            <div>
              <p className="text-base font-bold text-black mb-2">
                Brand Personality Traits
              </p>
              <p className="text-base text-gray-500 mb-4">
                Select exactly 3 traits that best describe your brand.
              </p>
              <div className="flex flex-wrap gap-3">
                {personalityTraits.map((trait) => {
                  const selected = selectedTraits.includes(trait);
                  const disabled = !selected && selectedTraits.length >= 3;
                  return (
                    <button
                      key={trait}
                      type="button"
                      onClick={() => toggleTrait(trait)}
                      disabled={disabled}
                      aria-pressed={selected}
                      className={`px-5 py-3 text-base font-bold min-h-[44px] transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                        selected
                          ? "bg-black text-white"
                          : disabled
                            ? "border border-gray-100 text-gray-300 cursor-not-allowed"
                            : "border border-gray-200 text-gray-600 hover:border-black"
                      }`}
                    >
                      {trait}
                    </button>
                  );
                })}
              </div>
              {selectedTraits.length > 0 && (
                <p className="text-base text-gray-500 mt-3">
                  Selected: {selectedTraits.join(", ")} ({selectedTraits.length}/3)
                </p>
              )}
            </div>
          </Animate>

          {/* Age Range */}
          <Animate animation="fade-up" delay={80}>
            <div>
              <label htmlFor="age-range" className="block text-base font-bold text-black mb-3">
                Target Audience Age Range
              </label>
              <select
                id="age-range"
                value={ageRange}
                onChange={(e) => { setAgeRange(e.target.value as AgeRange); setResult(null); }}
                className="w-full px-4 py-3 border border-gray-200 bg-white text-base min-h-[44px] focus-visible:border-black focus-visible:outline-none"
              >
                <option value="">Select age range</option>
                {ageRanges.map((range) => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>
          </Animate>

          {/* Tone */}
          <Animate animation="fade-up" delay={120}>
            <div>
              <p className="text-base font-bold text-black mb-3">Tone Preference</p>
              <div className="flex flex-wrap gap-3">
                {toneOptions.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => { setTone(t); setResult(null); }}
                    aria-pressed={tone === t}
                    className={`px-5 py-3 text-base font-bold min-h-[44px] transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
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

          {/* Generate button */}
          <Animate animation="fade-up" delay={160}>
            <button
              type="button"
              onClick={generate}
              disabled={!canGenerate}
              className={`px-8 py-4 text-base font-bold min-h-[44px] transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                canGenerate
                  ? "bg-black text-white hover:bg-gray-900"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Generate Brand Voice Guide
            </button>
          </Animate>
        </div>
      </section>

      {/* Results */}
      {result && (
        <section aria-label="Content section" className="px-6 lg:px-12 pb-12">
          <div className="max-w-3xl mx-auto space-y-8">
            {/* Copy All */}
            <Animate animation="fade-up">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={copyAll}
                  className="px-6 py-3 text-base font-bold border border-black text-black min-h-[44px] hover:bg-black hover:text-white transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  {copied ? "Copied!" : "Copy All"}
                </button>
              </div>
            </Animate>

            {/* Voice Summary */}
            <Animate animation="fade-up" delay={40}>
              <div className="border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none">
                <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-4">
                  Brand Voice Summary
                </h2>
                <p className="text-base text-gray-600 leading-relaxed">{result.summary}</p>
              </div>
            </Animate>

            {/* Do's and Don'ts */}
            <Animate animation="fade-up" delay={80}>
              <div className="border border-gray-200 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none">
                <div className="bg-black text-white p-4">
                  <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold">
                    Do&apos;s and Don&apos;ts
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-base">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left p-4 font-bold text-black bg-gray-50 w-1/2">Do</th>
                        <th className="text-left p-4 font-bold text-black bg-gray-50 w-1/2">Don&apos;t</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.dos.map((d, i) => (
                        <tr key={i} className="border-b border-gray-100">
                          <td className="p-4 text-gray-600 align-top">{d}</td>
                          <td className="p-4 text-gray-600 align-top">{result.donts[i]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Animate>

            {/* Sample Social Media Post */}
            <Animate animation="fade-up" delay={120}>
              <div className="border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none">
                <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">
                  Sample Social Media Post
                </h2>
                <div className="bg-gray-50 p-4">
                  <p className="text-base text-gray-700 leading-relaxed">{result.socialPost}</p>
                </div>
              </div>
            </Animate>

            {/* Sample Email Opening */}
            <Animate animation="fade-up" delay={160}>
              <div className="border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none">
                <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">
                  Sample Email Opening
                </h2>
                <div className="bg-gray-50 p-4">
                  <p className="text-base text-gray-700 leading-relaxed">{result.emailOpening}</p>
                </div>
              </div>
            </Animate>

            {/* Sample Headline */}
            <Animate animation="fade-up" delay={200}>
              <div className="border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none">
                <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">
                  Sample Headline
                </h2>
                <div className="bg-gray-50 p-4">
                  <p className="text-base text-black font-bold text-lg leading-relaxed">{result.headline}</p>
                </div>
              </div>
            </Animate>

            {/* Sample Customer Response */}
            <Animate animation="fade-up" delay={240}>
              <div className="border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none">
                <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">
                  Sample Customer Response
                </h2>
                <div className="bg-gray-50 p-4">
                  <p className="text-base text-gray-700 leading-relaxed">{result.customerResponse}</p>
                </div>
              </div>
            </Animate>

            {/* Word Bank */}
            <Animate animation="fade-up" delay={280}>
              <div className="border border-gray-200 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none">
                <div className="bg-black text-white p-4">
                  <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold">
                    Word Bank
                  </h2>
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black mb-3">
                      Words to Use ({result.wordsToUse.length})
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {result.wordsToUse.map((word) => (
                        <span
                          key={word}
                          className="px-3 py-2 bg-gray-50 border border-gray-200 text-base text-gray-700"
                        >
                          {word}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black mb-3">
                      Words to Avoid ({result.wordsToAvoid.length})
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {result.wordsToAvoid.map((word) => (
                        <span
                          key={word}
                          className="px-3 py-2 bg-gray-100 border border-gray-300 text-base text-gray-500 line-through"
                        >
                          {word}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Animate>
          </div>
        </section>
      )}

      {/* Why Brand Voice Matters */}
      <section aria-label="Why Brand Voice Matters" className="px-6 lg:px-12 py-16">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-black tracking-tight mb-8">
              Why Brand Voice Matters
            </h2>
          </Animate>
          <Stagger stagger={100} animation="fade-up" className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none">
              <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-3">
                Builds Recognition
              </h3>
              <p className="text-base text-gray-500 leading-relaxed">
                A consistent brand voice makes your content instantly recognizable across every channel. When your audience hears your message, they know it is you before seeing your logo.
              </p>
            </div>
            <div className="border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none">
              <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-3">
                Earns Trust
              </h3>
              <p className="text-base text-gray-500 leading-relaxed">
                People trust brands that communicate consistently. When your voice stays steady across ads, emails, and social posts, your audience learns they can rely on you.
              </p>
            </div>
            <div className="border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none">
              <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-3">
                Differentiates Your Brand
              </h3>
              <p className="text-base text-gray-500 leading-relaxed">
                In crowded markets, what you say matters less than how you say it. A distinctive voice sets you apart from competitors offering the same products or services.
              </p>
            </div>
            <div className="border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none">
              <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-3">
                Scales Your Team
              </h3>
              <p className="text-base text-gray-500 leading-relaxed">
                A documented voice guide lets any team member or agency partner write on-brand content without constant review. It turns your brand voice from instinct into a repeatable system.
              </p>
            </div>
          </Stagger>
        </div>
      </section>

      {/* CTA */}
      <section aria-label="Call to action" className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Need Help Defining Your Brand Voice?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Our branding team builds comprehensive voice guides, messaging frameworks, and content strategies that make your brand unmistakable.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base min-h-[44px] hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              Get a Brand Strategy Consultation &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    
      <ToolCTA
        toolName="Brand Voice Generator"
        services={[
          { title: "Branding", desc: "Strategic brand identity that differentiates you in your market.", href: "/services/branding" },
          { title: "Website Development", desc: "Websites that bring your brand to life with exceptional UX.", href: "/services/website-development" },
          { title: "Digital Marketing", desc: "Amplify your brand across every digital touchpoint.", href: "/services/digital-marketing" },
        ]}
        relatedTools={[
          { title: "Brand Positioning", href: "/resources/brand-positioning" },
          { title: "Brand Tone Generator", href: "/resources/brand-tone-generator" },
          { title: "Brand Voice Checker", href: "/resources/brand-voice-checker" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
