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

type Industry =
  | "e-commerce"
  | "saas"
  | "healthcare"
  | "real-estate"
  | "restaurants"
  | "fitness"
  | "finance"
  | "education"
  | "legal"
  | "home-services"
  | "fashion"
  | "b2b"
  | "travel"
  | "hospitality"
  | "nonprofits";

type Frequency = "daily" | "3x-week" | "2x-week" | "weekly";

type Channel =
  | "Blog"
  | "Instagram"
  | "Facebook"
  | "LinkedIn"
  | "Twitter/X"
  | "YouTube"
  | "TikTok"
  | "Email Newsletter";

type PlanningPeriod = 1 | 2 | 3;

type ContentPillar =
  | "Educational"
  | "Promotional"
  | "Engagement"
  | "Behind-the-Scenes"
  | "User-Generated";

interface CalendarEntry {
  week: number;
  day: string;
  channel: Channel;
  contentType: string;
  topic: string;
  pillar: ContentPillar;
}

/* ------------------------------------------------------------------ */
/*  Option definitions                                                 */
/* ------------------------------------------------------------------ */

const industries: { id: Industry; label: string }[] = [
  { id: "e-commerce", label: "E-commerce" },
  { id: "saas", label: "SaaS" },
  { id: "healthcare", label: "Healthcare" },
  { id: "real-estate", label: "Real Estate" },
  { id: "restaurants", label: "Restaurants" },
  { id: "fitness", label: "Fitness" },
  { id: "finance", label: "Finance" },
  { id: "education", label: "Education" },
  { id: "legal", label: "Legal" },
  { id: "home-services", label: "Home Services" },
  { id: "fashion", label: "Fashion" },
  { id: "b2b", label: "B2B" },
  { id: "travel", label: "Travel" },
  { id: "hospitality", label: "Hospitality" },
  { id: "nonprofits", label: "Nonprofits" },
];

const frequencies: { id: Frequency; label: string; postsPerWeek: number }[] = [
  { id: "daily", label: "Daily (7x/week)", postsPerWeek: 7 },
  { id: "3x-week", label: "3x per week", postsPerWeek: 3 },
  { id: "2x-week", label: "2x per week", postsPerWeek: 2 },
  { id: "weekly", label: "Weekly", postsPerWeek: 1 },
];

const allChannels: Channel[] = [
  "Blog",
  "Instagram",
  "Facebook",
  "LinkedIn",
  "Twitter/X",
  "YouTube",
  "TikTok",
  "Email Newsletter",
];

const planningPeriods: { id: PlanningPeriod; label: string }[] = [
  { id: 1, label: "1 month" },
  { id: 2, label: "2 months" },
  { id: 3, label: "3 months" },
];

/* ------------------------------------------------------------------ */
/*  Content types per channel                                          */
/* ------------------------------------------------------------------ */

const channelContentTypes: Record<Channel, string[]> = {
  Blog: ["Blog Post", "Listicle", "How-To Guide", "Case Study", "Interview"],
  Instagram: ["Carousel", "Reel", "Story", "Single Image", "Infographic"],
  Facebook: ["Link Post", "Video", "Photo Post", "Poll", "Live Stream"],
  LinkedIn: ["Text Post", "Article", "Carousel Document", "Video", "Poll"],
  "Twitter/X": ["Thread", "Tweet", "Poll", "Quote Tweet", "Image Post"],
  YouTube: ["Long-Form Video", "Short", "Tutorial", "Vlog", "Live Stream"],
  TikTok: ["Short Video", "Duet", "Tutorial", "Trend Video", "Behind-the-Scenes"],
  "Email Newsletter": ["Newsletter", "Product Update", "Curated Roundup", "Exclusive Offer", "Survey"],
};

/* ------------------------------------------------------------------ */
/*  Industry topic pools                                               */
/* ------------------------------------------------------------------ */

const industryTopics: Record<Industry, Record<ContentPillar, string[]>> = {
  "e-commerce": {
    Educational: [
      "How to choose the right product for your needs",
      "Shipping and returns: what to know before you buy",
      "Complete guide to seasonal shopping deals",
      "How to spot quality products online",
      "Understanding product reviews and ratings",
    ],
    Promotional: [
      "Flash sale alert: limited-time discounts",
      "New arrivals you do not want to miss",
      "Bundle deals that save you more",
      "Loyalty program perks and how to redeem",
      "Exclusive early access for subscribers",
    ],
    Engagement: [
      "Vote for the next product we should launch",
      "Show us how you style your purchase",
      "What is on your wishlist this season?",
      "Rate your recent shopping experience",
      "Tag us in your unboxing moment",
    ],
    "Behind-the-Scenes": [
      "How we source our materials",
      "A day in our warehouse",
      "Meet the team packing your orders",
      "Quality control: what happens before shipping",
      "How customer feedback shapes new products",
    ],
    "User-Generated": [
      "Customer spotlight: best product photos this month",
      "Real reviews from real customers",
      "Your favorite product combinations",
      "Community haul: what you bought this week",
      "Before and after: customer transformations",
    ],
  },
  saas: {
    Educational: [
      "Getting started guide for new users",
      "5 features you are probably not using yet",
      "How to automate your workflow with integrations",
      "Best practices for team onboarding",
      "Understanding your analytics dashboard",
    ],
    Promotional: [
      "New feature launch: what is changed and why",
      "Compare our plans: find your best fit",
      "Limited-time offer on annual subscriptions",
      "Free trial extended for new signups",
      "Partner spotlight: exclusive integration deals",
    ],
    Engagement: [
      "What feature should we build next? Vote now",
      "Share your biggest productivity win this week",
      "How has our tool changed your workflow?",
      "Join our upcoming product webinar",
      "Quick poll: what integration do you need most?",
    ],
    "Behind-the-Scenes": [
      "How our engineering team ships features",
      "A day in the life of our support team",
      "From idea to feature: our product process",
      "How we handle security and data protection",
      "Our company culture and remote work setup",
    ],
    "User-Generated": [
      "Customer success story: how they scaled with us",
      "Power user tips from our community",
      "Real-world use cases from different industries",
      "Community-built templates you can use today",
      "User spotlight: creative workflows we love",
    ],
  },
  healthcare: {
    Educational: [
      "Understanding preventive care and regular screenings",
      "Nutrition basics for a healthier lifestyle",
      "Mental health awareness: signs and resources",
      "How to prepare for your next appointment",
      "Common health myths debunked by professionals",
    ],
    Promotional: [
      "New services now available at our practice",
      "Health screening packages for the season",
      "Book your annual wellness check today",
      "Insurance and payment options explained",
      "Referral program: share care with friends and family",
    ],
    Engagement: [
      "What health topic should we cover next?",
      "Share your wellness goals for this month",
      "Quick quiz: test your health knowledge",
      "Ask our practitioners: submit your questions",
      "Wellness challenge: join our community initiative",
    ],
    "Behind-the-Scenes": [
      "Meet our care team and their specialties",
      "How we maintain a safe and clean facility",
      "Our approach to patient-centered care",
      "Technology we use to improve your experience",
      "Continuing education: how our team stays current",
    ],
    "User-Generated": [
      "Patient success story: a journey to better health",
      "Community testimonials: why patients choose us",
      "Healthy recipes from our community members",
      "Fitness routines shared by our patients",
      "Recovery milestones worth celebrating",
    ],
  },
  "real-estate": {
    Educational: [
      "First-time buyer checklist: everything you need",
      "How to determine your home budget",
      "Understanding mortgage rates and options",
      "Home staging tips that increase sale price",
      "Neighborhood guide: what to look for when relocating",
    ],
    Promotional: [
      "New listing alert: properties you should see",
      "Open house this weekend: details inside",
      "Price reduction on featured properties",
      "Investment property opportunities this quarter",
      "Just sold: another happy homeowner",
    ],
    Engagement: [
      "Which home style do you prefer? Vote now",
      "Share your dream home wishlist",
      "What matters most in a neighborhood?",
      "Home improvement before and after: share yours",
      "Guess the listing price challenge",
    ],
    "Behind-the-Scenes": [
      "A day in the life of a real estate agent",
      "How we prepare a home for the market",
      "The negotiation process explained",
      "What happens between offer and closing",
      "Market analysis: how we price properties",
    ],
    "User-Generated": [
      "Client spotlight: their home buying journey",
      "Moving day moments from our clients",
      "Before and after: home renovation stories",
      "Testimonial: why they chose our team",
      "Community picks: favorite local spots near your home",
    ],
  },
  restaurants: {
    Educational: [
      "How to pair wine with your meal",
      "Understanding seasonal menus and local sourcing",
      "Food safety practices we follow every day",
      "How to host a dinner party with our menu",
      "Nutritional breakdown of our popular dishes",
    ],
    Promotional: [
      "New seasonal menu items are here",
      "Happy hour specials you need to try",
      "Catering packages for your next event",
      "Gift cards: the perfect present for foodies",
      "Loyalty rewards: earn points with every visit",
    ],
    Engagement: [
      "Vote for the next dish on our menu",
      "Share your plate: tag us in your food photos",
      "What is your all-time favorite dish here?",
      "Caption this food photo contest",
      "Trivia night: test your culinary knowledge",
    ],
    "Behind-the-Scenes": [
      "Meet our head chef and their inspiration",
      "From farm to table: where our ingredients come from",
      "Kitchen prep at 6 AM: a morning in our restaurant",
      "How we create a new recipe from scratch",
      "The story behind our restaurant name",
    ],
    "User-Generated": [
      "Customer food photos that made us hungry",
      "Reviews that made our team smile",
      "Regular spotlight: our most loyal guests",
      "Family celebrations at our restaurant",
      "Your favorite dishes ranked by community votes",
    ],
  },
  fitness: {
    Educational: [
      "Beginner workout plan for your first month",
      "How to prevent common exercise injuries",
      "Nutrition guide for muscle building and recovery",
      "Understanding heart rate zones for effective training",
      "Rest and recovery: why days off matter",
    ],
    Promotional: [
      "New class schedule: find your perfect time slot",
      "Membership deals for the new season",
      "Personal training packages at special rates",
      "Bring a friend week: train together for free",
      "New equipment arrivals at the gym",
    ],
    Engagement: [
      "What is your favorite workout this week?",
      "30-day fitness challenge: are you in?",
      "Share your progress photo with our community",
      "Poll: morning or evening workouts?",
      "Drop your best playlist recommendation for gym sessions",
    ],
    "Behind-the-Scenes": [
      "Meet our trainers and their fitness journeys",
      "How we keep our facility clean and safe",
      "Designing a workout program: the process",
      "A day in the life of a personal trainer",
      "Equipment maintenance: what we do behind the scenes",
    ],
    "User-Generated": [
      "Member transformation: 90-day progress story",
      "Community workout tips from our members",
      "Client testimonial: how training changed their life",
      "Group class highlights: your energy captured",
      "Member milestones: PRs and achievements this month",
    ],
  },
  finance: {
    Educational: [
      "Budgeting 101: a simple framework that works",
      "Understanding different types of investment accounts",
      "Tax planning tips for the upcoming season",
      "How to build and maintain good credit",
      "Retirement planning at every age",
    ],
    Promotional: [
      "Free financial health check: book your consultation",
      "New savings account rates announced",
      "Tax preparation services now open for the season",
      "Referral bonus: earn when you share",
      "Workshop: financial planning for business owners",
    ],
    Engagement: [
      "What is your top financial goal this year?",
      "Money myth or fact: test your knowledge",
      "Quick poll: savings or investing first?",
      "Share your best money-saving tip",
      "Ask the advisor: submit your finance questions",
    ],
    "Behind-the-Scenes": [
      "How our advisors stay current with market trends",
      "The process behind a personalized financial plan",
      "Meet our team of certified financial planners",
      "How we protect your data and privacy",
      "A look at our compliance and regulation practices",
    ],
    "User-Generated": [
      "Client story: how they reached their savings goal",
      "Community tips for managing household budgets",
      "Testimonial: peace of mind through financial planning",
      "Small business owner shares their growth journey",
      "Real results: debt payoff milestones from clients",
    ],
  },
  education: {
    Educational: [
      "Study techniques backed by research",
      "How to create an effective learning schedule",
      "Guide to choosing the right program for you",
      "Online vs in-person learning: pros and cons",
      "Skills employers are looking for right now",
    ],
    Promotional: [
      "Enrollment open for upcoming semester",
      "Scholarship opportunities: apply before the deadline",
      "New courses added to our catalog",
      "Early registration discounts available now",
      "Free workshop: introduction to our top programs",
    ],
    Engagement: [
      "What subject would you like us to teach next?",
      "Share your learning win this week",
      "Study tip swap: drop yours in the comments",
      "Alumni poll: how has your education impacted your career?",
      "Quiz: test your knowledge on this week's topic",
    ],
    "Behind-the-Scenes": [
      "Meet our instructors and their backgrounds",
      "How we design our curriculum",
      "A day on campus: student life in focus",
      "Technology in the classroom: tools we use",
      "How student feedback shapes our programs",
    ],
    "User-Generated": [
      "Student spotlight: academic and career achievements",
      "Alumni success story: where are they now?",
      "Graduation highlights from our community",
      "Student project showcase: creative work this semester",
      "Parent testimonials: their child's learning journey",
    ],
  },
  legal: {
    Educational: [
      "When do you need a lawyer? Common scenarios explained",
      "Understanding contracts: key terms to know",
      "Small business legal checklist for compliance",
      "Estate planning basics everyone should understand",
      "Your rights as a tenant or landlord",
    ],
    Promotional: [
      "Free initial consultation: book your appointment",
      "New practice areas now offered at our firm",
      "Legal workshop for small business owners",
      "Document review package at a flat rate",
      "Webinar: understanding recent regulatory changes",
    ],
    Engagement: [
      "What legal topic should we cover next?",
      "True or false: common legal misconceptions",
      "Ask the attorney: submit your questions",
      "Poll: what business legal concern keeps you up at night?",
      "Share the best advice you received from a lawyer",
    ],
    "Behind-the-Scenes": [
      "Meet our attorneys and their specializations",
      "How we prepare for a case: the research process",
      "A day in the life of a legal team",
      "Pro bono work: giving back to the community",
      "How we stay updated with changing regulations",
    ],
    "User-Generated": [
      "Client testimonial: how legal counsel protected their business",
      "Community feedback: what clients value most in legal support",
      "Business owner shares their experience with our firm",
      "Case resolution: client outcomes worth sharing",
      "Referral stories: how word of mouth builds trust",
    ],
  },
  "home-services": {
    Educational: [
      "Seasonal home maintenance checklist",
      "How to know when it is time to replace your HVAC system",
      "DIY vs professional: when to call an expert",
      "Water damage prevention tips for homeowners",
      "Energy efficiency upgrades that pay for themselves",
    ],
    Promotional: [
      "Seasonal tune-up specials: book now and save",
      "Bundle and save on multiple home services",
      "Emergency service available 24/7: here is how to reach us",
      "Referral program: earn credit for every recommendation",
      "New service area expansion announcement",
    ],
    Engagement: [
      "What home project are you tackling this weekend?",
      "Before and after: share your home improvement",
      "Poll: biggest home maintenance challenge?",
      "Quick quiz: how well do you know your home systems?",
      "Ask the technician: submit your home repair questions",
    ],
    "Behind-the-Scenes": [
      "Meet our licensed technicians and their certifications",
      "How we train our team on safety standards",
      "A day on the job: real service calls in action",
      "Our process for quality assurance inspections",
      "Truck stock tour: tools we carry on every job",
    ],
    "User-Generated": [
      "Customer review: their experience with our team",
      "Homeowner spotlight: biggest improvement project",
      "Photo gallery: completed projects from our clients",
      "Long-time client shares why they trust our service",
      "Community picks: favorite home improvement results",
    ],
  },
  fashion: {
    Educational: [
      "How to build a capsule wardrobe on any budget",
      "Fabric guide: how to care for different materials",
      "Color theory for everyday outfit coordination",
      "Sustainable fashion: making better choices",
      "Dressing for your body type: practical tips",
    ],
    Promotional: [
      "New collection drop: first look inside",
      "Sale alert: up to 50% off selected styles",
      "Limited edition pieces available now",
      "Gift guide: curated picks for every budget",
      "VIP early access starts tomorrow",
    ],
    Engagement: [
      "Style this piece: show us your outfit ideas",
      "Which color should we release next?",
      "Outfit of the day: tag us to be featured",
      "Fashion debate: trends vs timeless classics",
      "Rate this outfit: would you wear it?",
    ],
    "Behind-the-Scenes": [
      "From sketch to shelf: how we design a collection",
      "Meet our designers and their creative process",
      "Photo shoot sneak peek: upcoming campaign",
      "How we select fabrics and materials",
      "Our sustainability practices and goals",
    ],
    "User-Generated": [
      "Customer styling inspiration: how you wear our pieces",
      "Best dressed this month: community picks",
      "Real-life outfit reviews from our customers",
      "Closet tour featuring our brand favorites",
      "Style transformation stories from our community",
    ],
  },
  b2b: {
    Educational: [
      "How to streamline your procurement process",
      "ROI framework for evaluating new vendors",
      "Industry compliance requirements for this quarter",
      "Workflow optimization strategies for growing teams",
      "Data-driven decision making for leadership",
    ],
    Promotional: [
      "New enterprise solution: schedule a demo",
      "Case study: how we helped a client save 30% in costs",
      "Partnership program: grow together with us",
      "Annual contract incentives available now",
      "Industry event: visit us at booth 42",
    ],
    Engagement: [
      "What is your biggest operational challenge right now?",
      "Industry trend poll: where are you investing next year?",
      "Share your best team productivity hack",
      "Webinar Q and A: submit your questions in advance",
      "Leadership roundtable: join the discussion",
    ],
    "Behind-the-Scenes": [
      "How our team builds enterprise solutions",
      "Quality assurance: our testing and review process",
      "Meet the team dedicated to your account",
      "Our approach to data security and compliance",
      "Research and development: what we are working on",
    ],
    "User-Generated": [
      "Client testimonial: partnership success story",
      "Implementation story: from rollout to results",
      "Industry peer recommendation and review",
      "User conference highlights from our community",
      "Joint case study: client and vendor collaboration",
    ],
  },
  travel: {
    Educational: [
      "Packing checklist for different trip types",
      "Budget travel guide: see more, spend less",
      "How to find the best flight and hotel deals",
      "Travel insurance: what it covers and why it matters",
      "Local etiquette tips for international travelers",
    ],
    Promotional: [
      "Flash deal: limited-time travel packages",
      "Early bird booking discounts for next season",
      "New destination added to our offerings",
      "Group travel rates for your next adventure",
      "Loyalty points bonus: double rewards this month",
    ],
    Engagement: [
      "What is your dream destination? Share below",
      "Travel photo contest: best sunset wins",
      "Bucket list challenge: how many have you visited?",
      "Would you rather: mountain or beach vacation?",
      "Share your favorite hidden gem travel spot",
    ],
    "Behind-the-Scenes": [
      "How we curate our travel packages",
      "Meet our travel specialists and their favorite destinations",
      "Site inspection: how we vet partner hotels",
      "Planning a group tour: the coordination process",
      "Sustainability in travel: our environmental commitments",
    ],
    "User-Generated": [
      "Traveler spotlight: best photos from recent trips",
      "Guest review: their experience with our service",
      "Itinerary share: a week in a destination, planned by you",
      "Anniversary and honeymoon stories from our travelers",
      "Community recommendations: restaurants and activities abroad",
    ],
  },
  hospitality: {
    Educational: [
      "How to choose the right accommodation for your trip",
      "Maximizing your loyalty program benefits",
      "Guide to hotel amenities you might not know about",
      "Event planning checklist for venues and catering",
      "Business travel tips for frequent guests",
    ],
    Promotional: [
      "Weekend getaway package at special rates",
      "New seasonal menu at our restaurant",
      "Meeting and event space: book your corporate gathering",
      "Spa and wellness packages for the season",
      "Holiday celebrations: reserve your table now",
    ],
    Engagement: [
      "What amenity matters most to you when traveling?",
      "Share your favorite moment at our property",
      "Room view challenge: post your best window shot",
      "Foodie poll: which dish should we bring back?",
      "Caption contest: best hotel photo wins a stay",
    ],
    "Behind-the-Scenes": [
      "How we prepare a room before your arrival",
      "Meet our chef and the story behind the menu",
      "Sustainability initiatives at our property",
      "Training day: how our staff delivers exceptional service",
      "Seasonal decoration setup: a time-lapse tour",
    ],
    "User-Generated": [
      "Guest spotlight: memorable stays and celebrations",
      "Wedding stories hosted at our venue",
      "Repeat guest testimonials: why they keep coming back",
      "Food reviews from our restaurant guests",
      "Event highlights shared by our clients",
    ],
  },
  nonprofits: {
    Educational: [
      "Understanding the impact of your donation",
      "Volunteer guide: how to get involved in our mission",
      "The state of our cause: key statistics and facts",
      "How policy changes affect the communities we serve",
      "Fundraising 101: tips for organizing your own campaign",
    ],
    Promotional: [
      "Annual fundraising campaign: donate today",
      "Upcoming charity event: save the date",
      "Matching gift program: double your impact",
      "Monthly donor program: join our sustaining members",
      "Merchandise for a cause: shop and support",
    ],
    Engagement: [
      "Why do you support our cause? Share your story",
      "Volunteer appreciation: nominate someone outstanding",
      "Challenge: spread the word and tag three friends",
      "Poll: what issue should we focus on next?",
      "Community Q and A with our leadership team",
    ],
    "Behind-the-Scenes": [
      "A day in the field: our team at work",
      "How donations are allocated and used",
      "Meet the people behind our mission",
      "Program development: from concept to community impact",
      "Our annual report: transparency and accountability",
    ],
    "User-Generated": [
      "Volunteer spotlight: stories from the field",
      "Donor testimonial: why they give",
      "Community impact story: real lives changed",
      "Partner organization shares their collaboration experience",
      "Event photos and memories from our supporters",
    ],
  },
};

/* ------------------------------------------------------------------ */
/*  Days of the week                                                   */
/* ------------------------------------------------------------------ */

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

/* ------------------------------------------------------------------ */
/*  Calendar generation logic                                          */
/* ------------------------------------------------------------------ */

const pillars: ContentPillar[] = [
  "Educational",
  "Promotional",
  "Engagement",
  "Behind-the-Scenes",
  "User-Generated",
];

function generateCalendar(
  industry: Industry,
  frequency: Frequency,
  channels: Channel[],
  months: PlanningPeriod
): CalendarEntry[] {
  const totalWeeks = months * 4;
  const postsPerWeek = frequencies.find((f) => f.id === frequency)?.postsPerWeek ?? 3;
  const topics = industryTopics[industry];
  const entries: CalendarEntry[] = [];

  /* Track topic usage per pillar to rotate through them */
  const topicIndex: Record<ContentPillar, number> = {
    Educational: 0,
    Promotional: 0,
    Engagement: 0,
    "Behind-the-Scenes": 0,
    "User-Generated": 0,
  };

  /* Deterministic day assignment based on frequency */
  const daySlots: number[] = [];
  if (postsPerWeek === 7) {
    daySlots.push(0, 1, 2, 3, 4, 5, 6);
  } else if (postsPerWeek === 3) {
    daySlots.push(0, 2, 4); // Mon, Wed, Fri
  } else if (postsPerWeek === 2) {
    daySlots.push(1, 3); // Tue, Thu
  } else {
    daySlots.push(2); // Wed
  }

  for (let week = 1; week <= totalWeeks; week++) {
    for (let slotIdx = 0; slotIdx < daySlots.length; slotIdx++) {
      const dayIndex = daySlots[slotIdx];
      const day = weekdays[dayIndex];

      /* Round-robin through channels */
      const channelIdx = (week * daySlots.length + slotIdx) % channels.length;
      const channel = channels[channelIdx];

      /* Round-robin through pillars */
      const pillarIdx = ((week - 1) * daySlots.length + slotIdx) % pillars.length;
      const pillar = pillars[pillarIdx];

      /* Pick content type from channel */
      const types = channelContentTypes[channel];
      const typeIdx = ((week - 1) * daySlots.length + slotIdx) % types.length;
      const contentType = types[typeIdx];

      /* Pick topic from industry + pillar pool */
      const pool = topics[pillar];
      const tIdx = topicIndex[pillar] % pool.length;
      const topic = pool[tIdx];
      topicIndex[pillar] = tIdx + 1;

      entries.push({ week, day, channel, contentType, topic, pillar });
    }
  }

  return entries;
}

/* ------------------------------------------------------------------ */
/*  Pillar badge colors                                                */
/* ------------------------------------------------------------------ */

function pillarStyle(pillar: ContentPillar): string {
  switch (pillar) {
    case "Educational":
      return "bg-gray-200 text-black";
    case "Promotional":
      return "bg-black text-white";
    case "Engagement":
      return "bg-gray-400 text-black";
    case "Behind-the-Scenes":
      return "bg-gray-100 text-black";
    case "User-Generated":
      return "bg-gray-600 text-white";
  }
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ContentCalendarPage() {
  const [industry, setIndustry] = useState<Industry | null>(null);
  const [frequency, setFrequency] = useState<Frequency | null>(null);
  const [selectedChannels, setSelectedChannels] = useState<Channel[]>([]);
  const [planningPeriod, setPlanningPeriod] = useState<PlanningPeriod | null>(null);
  const [calendar, setCalendar] = useState<CalendarEntry[]>([]);
  const [copied, setCopied] = useState<"csv" | "text" | null>(null);

  const canGenerate =
    industry !== null &&
    frequency !== null &&
    selectedChannels.length > 0 &&
    planningPeriod !== null;

  const toggleChannel = (ch: Channel) => {
    setSelectedChannels((prev) =>
      prev.includes(ch) ? prev.filter((c) => c !== ch) : [...prev, ch]
    );
  };

  const generate = () => {
    if (!industry || !frequency || selectedChannels.length === 0 || !planningPeriod) return;
    setCalendar(generateCalendar(industry, frequency, selectedChannels, planningPeriod));
  };

  /* Group entries by week */
  const weekGroups: Record<number, CalendarEntry[]> = {};
  for (const entry of calendar) {
    if (!weekGroups[entry.week]) weekGroups[entry.week] = [];
    weekGroups[entry.week].push(entry);
  }
  const weekNumbers = Object.keys(weekGroups)
    .map(Number)
    .sort((a, b) => a - b);

  /* ---- Export helpers ---- */

  const formatAsCsv = useCallback((): string => {
    let csv = "Week,Day,Channel,Content Type,Topic,Content Pillar\n";
    for (const entry of calendar) {
      const escape = (s: string) => `"${s.replace(/"/g, '""')}"`;
      csv += `${entry.week},${entry.day},${escape(entry.channel)},${escape(entry.contentType)},${escape(entry.topic)},${escape(entry.pillar)}\n`;
    }
    return csv;
  }, [calendar]);

  const formatAsText = useCallback((): string => {
    let text = "CONTENT CALENDAR\n";
    text += "================\n\n";
    const indLabel = industries.find((i) => i.id === industry)?.label ?? "";
    const freqLabel = frequencies.find((f) => f.id === frequency)?.label ?? "";
    text += `Industry: ${indLabel}\n`;
    text += `Frequency: ${freqLabel}\n`;
    text += `Channels: ${selectedChannels.join(", ")}\n`;
    text += `Planning Period: ${planningPeriod} month(s)\n\n`;

    for (const wk of weekNumbers) {
      text += `--- Week ${wk} ---\n`;
      for (const entry of weekGroups[wk]) {
        text += `  ${entry.day} | ${entry.channel} | ${entry.contentType} | ${entry.pillar}\n`;
        text += `    Topic: ${entry.topic}\n`;
      }
      text += "\n";
    }
    return text;
  }, [calendar, industry, frequency, selectedChannels, planningPeriod, weekNumbers, weekGroups]);

  const copyToClipboard = async (format: "csv" | "text") => {
    const content = format === "csv" ? formatAsCsv() : formatAsText();
    try {
      await navigator.clipboard.writeText(content);
      setCopied(format);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = content;
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(format);
      setTimeout(() => setCopied(null), 2000);
    }
  };

  return (
    <article>
      
      {/* Related Tools */}
      <section className="px-6 lg:px-12 py-12" aria-label="Related tools">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">Related Tools</h2>
          <div className="flex flex-wrap gap-3">
                <Link href="/resources/content-brief-generator" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Content Brief Generator</Link>
                <Link href="/resources/content-roi-calculator" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Content ROI Calculator</Link>
                <Link href="/resources/content-gap-finder" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Content Gap Finder</Link>
                <Link href="/resources/content-pillar-planner" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Content Pillar Planner</Link>
          </div>
        </div>
      </section>
<JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Content Calendar Generator",
          description:
            "Generate a customized content calendar with topic suggestions, content types, and posting schedules tailored to your industry and channels.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />

      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Content Calendar" },
        ]}
      />

      {/* ---- Hero ---- */}
      <section aria-label="Free Tool" className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Content Calendar Generator
            </h1>
            <SectionDesc>
              Plan your content schedule with industry-specific topic suggestions, content types, and
              posting cadence across all your marketing channels.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* ---- Step 1: Industry ---- */}
      <section aria-label="1. Select your industry" className="px-6 lg:px-12 pb-10">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">
              1. Select your industry
            </h2>
            <div className="flex flex-wrap gap-2">
              {industries.map((ind) => (
                <button
                  key={ind.id}
                  onClick={() => setIndustry(ind.id)}
                  className={`px-5 min-h-[44px] text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                    industry === ind.id
                      ? "bg-black text-white"
                      : "border border-gray-200 text-gray-600 hover:border-black"
                  }`}
                >
                  {ind.label}
                </button>
              ))}
            </div>
          </Animate>
        </div>
      </section>

      {/* ---- Step 2: Frequency ---- */}
      <section aria-label="2. Content frequency" className="px-6 lg:px-12 pb-10">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">
              2. Content frequency
            </h2>
            <div className="flex flex-wrap gap-2">
              {frequencies.map((freq) => (
                <button
                  key={freq.id}
                  onClick={() => setFrequency(freq.id)}
                  className={`px-5 min-h-[44px] text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                    frequency === freq.id
                      ? "bg-black text-white"
                      : "border border-gray-200 text-gray-600 hover:border-black"
                  }`}
                >
                  {freq.label}
                </button>
              ))}
            </div>
          </Animate>
        </div>
      </section>

      {/* ---- Step 3: Channels ---- */}
      <section aria-label="3. Select channels" className="px-6 lg:px-12 pb-10">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">
              3. Select channels
            </h2>
            <div className="flex flex-wrap gap-3">
              {allChannels.map((ch) => (
                <label
                  key={ch}
                  className={`flex items-center gap-3 px-5 min-h-[44px] text-base font-bold cursor-pointer transition-colors motion-reduce:transition-none border select-none focus-within:outline-2 focus-within:outline-black focus-within:outline-offset-2 ${
                    selectedChannels.includes(ch)
                      ? "bg-black text-white border-black"
                      : "border-gray-200 text-gray-600 hover:border-black"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedChannels.includes(ch)}
                    onChange={() => toggleChannel(ch)}
                    className="sr-only"
                  />
                  <span
                    aria-hidden="true"
                    className={`w-5 h-5 border-2 flex items-center justify-center flex-shrink-0 ${
                      selectedChannels.includes(ch)
                        ? "border-white bg-white"
                        : "border-gray-400 bg-white"
                    }`}
                  >
                    {selectedChannels.includes(ch) && (
                      <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                        <path d="M1 5L4.5 8.5L11 1.5" stroke="black" strokeWidth="2" strokeLinecap="square" />
                      </svg>
                    )}
                  </span>
                  {ch}
                </label>
              ))}
            </div>
          </Animate>
        </div>
      </section>

      {/* ---- Step 4: Planning Period ---- */}
      <section aria-label="4. Planning period" className="px-6 lg:px-12 pb-10">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">
              4. Planning period
            </h2>
            <div className="flex flex-wrap gap-2">
              {planningPeriods.map((pp) => (
                <button
                  key={pp.id}
                  onClick={() => setPlanningPeriod(pp.id)}
                  className={`px-5 min-h-[44px] text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                    planningPeriod === pp.id
                      ? "bg-black text-white"
                      : "border border-gray-200 text-gray-600 hover:border-black"
                  }`}
                >
                  {pp.label}
                </button>
              ))}
            </div>
          </Animate>
        </div>
      </section>

      {/* ---- Generate Button ---- */}
      <section aria-label="Content section" className="px-6 lg:px-12 pb-16">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <button
              onClick={generate}
              disabled={!canGenerate}
              className={`px-10 min-h-[44px] py-4 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                canGenerate
                  ? "bg-black text-white hover:bg-gray-800"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Generate Content Calendar
            </button>
          </Animate>
        </div>
      </section>

      {/* ---- Calendar Output ---- */}
      {calendar.length > 0 && (
        <section aria-label="Content section" className="px-6 lg:px-12 pb-20">
          <div className="max-w-6xl mx-auto">
            {/* Copy buttons */}
            <Animate animation="fade-up">
              <div className="flex flex-wrap gap-3 mb-8">
                <button
                  onClick={() => copyToClipboard("csv")}
                  className="px-6 min-h-[44px] py-3 text-base font-bold border border-black text-black hover:bg-black hover:text-white transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  {copied === "csv" ? "Copied CSV" : "Copy as CSV"}
                </button>
                <button
                  onClick={() => copyToClipboard("text")}
                  className="px-6 min-h-[44px] py-3 text-base font-bold border border-black text-black hover:bg-black hover:text-white transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  {copied === "text" ? "Copied Text" : "Copy as Plain Text"}
                </button>
              </div>
            </Animate>

            {/* Pillar legend */}
            <Animate animation="fade-up">
              <div className="flex flex-wrap gap-3 mb-8">
                {pillars.map((p) => (
                  <span
                    key={p}
                    className={`inline-block px-3 py-1 text-base font-bold ${pillarStyle(p)}`}
                  >
                    {p}
                  </span>
                ))}
              </div>
            </Animate>

            {/* Week-by-week grid */}
            <Stagger stagger={80} animation="fade-up" className="space-y-8">
              {weekNumbers.map((wk) => (
                <div key={wk} className="border border-gray-200 overflow-hidden">
                  <div className="bg-black text-white p-4">
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold">
                      Week {wk}
                    </h3>
                  </div>

                  {/* Desktop table */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-gray-200 bg-gray-50">
                          <th className="px-4 py-3 text-base font-bold text-black">Day</th>
                          <th className="px-4 py-3 text-base font-bold text-black">Channel</th>
                          <th className="px-4 py-3 text-base font-bold text-black">Content Type</th>
                          <th className="px-4 py-3 text-base font-bold text-black">Topic</th>
                          <th className="px-4 py-3 text-base font-bold text-black">Pillar</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {weekGroups[wk].map((entry, idx) => (
                          <tr key={idx} className="hover:bg-gray-50 transition-colors motion-reduce:transition-none">
                            <td className="px-4 py-3 text-base text-black font-bold whitespace-nowrap">
                              {entry.day}
                            </td>
                            <td className="px-4 py-3 text-base text-black whitespace-nowrap">
                              {entry.channel}
                            </td>
                            <td className="px-4 py-3 text-base text-gray-600 whitespace-nowrap">
                              {entry.contentType}
                            </td>
                            <td className="px-4 py-3 text-base text-gray-600">
                              {entry.topic}
                            </td>
                            <td className="px-4 py-3">
                              <span className={`inline-block px-3 py-1 text-base font-bold ${pillarStyle(entry.pillar)}`}>
                                {entry.pillar}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile cards */}
                  <div className="md:hidden divide-y divide-gray-100">
                    {weekGroups[wk].map((entry, idx) => (
                      <div key={idx} className="p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-base font-bold text-black">{entry.day}</span>
                          <span className={`inline-block px-3 py-1 text-base font-bold ${pillarStyle(entry.pillar)}`}>
                            {entry.pillar}
                          </span>
                        </div>
                        <p className="text-base text-black">
                          {entry.channel} &mdash; {entry.contentType}
                        </p>
                        <p className="text-base text-gray-500">{entry.topic}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {/* ---- Educational Section ---- */}
      <section aria-label="Content Planning Guide" className="px-6 lg:px-12 py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Content Planning Guide</SectionLabel>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-black tracking-tight leading-tight mt-3 mb-6">
              Content Planning Best Practices
            </h2>
          </Animate>

          <Stagger stagger={100} animation="fade-up" className="space-y-8">
            <div>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">
                Use content pillars to stay balanced
              </h3>
              <p className="text-base text-gray-600 leading-relaxed">
                Content pillars are thematic categories that keep your messaging diverse and purposeful.
                A healthy mix typically follows the 80/20 rule: 80% value-driven content (educational,
                engagement, behind-the-scenes) and 20% promotional. This builds trust with your audience
                while still driving conversions.
              </p>
            </div>

            <div>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">
                Batch creation saves time
              </h3>
              <p className="text-base text-gray-600 leading-relaxed">
                Instead of creating content daily, set aside dedicated blocks for batch production.
                Shoot multiple videos in one session, write several blog posts in a single sprint, or
                design a week of graphics at once. Batching reduces context switching and improves
                consistency across your output.
              </p>
            </div>

            <div>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">
                Repurpose across channels
              </h3>
              <p className="text-base text-gray-600 leading-relaxed">
                One piece of content can serve multiple channels. A blog post becomes a LinkedIn
                article, an Instagram carousel, a Twitter thread, and a newsletter segment. This
                maximizes your effort and ensures your message reaches audiences wherever they spend
                their time.
              </p>
            </div>

            <div>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">
                Plan around key dates and events
              </h3>
              <p className="text-base text-gray-600 leading-relaxed">
                Map out industry events, holidays, product launches, and seasonal trends before filling
                your calendar. This ensures timely content that resonates with what your audience is
                already thinking about. Leave buffer slots for reactive or trending content opportunities.
              </p>
            </div>

            <div>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">
                Track performance and iterate
              </h3>
              <p className="text-base text-gray-600 leading-relaxed">
                A content calendar is a living document. Review performance metrics weekly or monthly
                to identify what resonates. Double down on content types and topics that perform well,
                and replace underperforming formats. Use engagement rates, not just reach, to measure
                true content effectiveness.
              </p>
            </div>

            <div>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">
                Consistency beats frequency
              </h3>
              <p className="text-base text-gray-600 leading-relaxed">
                Publishing three quality pieces per week consistently outperforms sporadic daily
                posting. Choose a frequency you can sustain long-term. Your audience builds habits
                around when they expect your content, and algorithms reward accounts that post on a
                reliable schedule.
              </p>
            </div>
          </Stagger>
        </div>
      </section>

      {/* ---- CTA ---- */}
      <section aria-label="Call to action" className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Need Help With Your Content Strategy?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Our content team handles strategy, creation, scheduling, and analytics across every
              channel so you can focus on running your business.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 min-h-[44px]"
            >
              Get Content Strategy Help &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    
      <ToolCTA
        toolName="Content Calendar"
        services={[
          { title: "Content Marketing", desc: "Strategic content that drives traffic, engagement, and conversions.", href: "/services/content-marketing" },
          { title: "SEO", desc: "Content optimized for search engines and human readers alike.", href: "/services/seo" },
          { title: "Social Media Marketing", desc: "Distribute your content where your audience already is.", href: "/services/social-media-marketing" },
        ]}
        relatedTools={[
          { title: "Content Audit Scorecard", href: "/resources/content-audit-scorecard" },
          { title: "Content Brief", href: "/resources/content-brief" },
          { title: "Content Brief Generator", href: "/resources/content-brief-generator" },
          { title: "Content Gap Analyzer", href: "/resources/content-gap-analyzer" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
