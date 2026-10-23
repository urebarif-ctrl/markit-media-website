// Facts for /top-web-development-companies-in-the-usa ("Web development companies in the USA: a sourced guide").
//
// RULES (the page promises them to readers):
//  - Every firm fact below was read on the firm's own website on READ_DATE and re-checked in a second pass.
//  - Quotes are short and exact. If the firm does not publish something, the field is left out (never filled from memory).
//  - Clutch figures are copied from Clutch's US web-developer directory page as printed on READ_DATE.
//  - Order inside a group is alphabetical. This is not a ranking.
// To refresh: re-read each source, update READ_DATE, and add a line to CHANGE_LOG.

export const US_GUIDE_ID = "top-web-development-companies-in-the-usa";
export const US_GUIDE_TITLE = "Web Development Companies in the USA: A Sourced Guide";
export const US_GUIDE_H1 = "Web development companies in the USA: a sourced guide";
export const US_GUIDE_DESCRIPTION =
  "How to choose a US web development company: sourced cost data, a dated shortlist of 12 US firms with linked facts, and a checklist for judging any agency.";

export const READ_DATE = "23 October 2026";
export const READ_DATE_ISO = "2026-10-23";
export const CONTACT_EMAIL = "ciao@themarkitmedia.com";

export interface SourceLink {
  label: string;
  href: string;
}

export type GroupId = "builds" | "b2b" | "mission";

export interface Firm {
  id: string;
  name: string;
  /** Short location for the at-a-glance table. */
  city: string;
  site: string;
  group: GroupId;
  /** Location exactly as the firm states it, with the word "headquarters" only where the firm uses it. */
  where: string;
  founded?: string;
  /** Short exact quote from the firm's own site. */
  words: string;
  /** Web design / development items as they appear on the firm's site. */
  webServices: string[];
  /** Three project or client names from the firm's work page. */
  projects: string[];
  pricing?: string;
  note?: string;
  clutch: { rating: string; reviews: number; minProject: string; hourly: string };
  sources: SourceLink[];
}

export const GROUPS: { id: GroupId; title: string; blurb: string }[] = [
  {
    id: "builds",
    title: "Custom web and product builds",
    blurb: "Firms that describe their core work as custom web applications, software or digital product builds.",
  },
  {
    id: "b2b",
    title: "B2B and marketing-led websites",
    blurb: "Firms that pair website design and development with B2B, strategy or marketing services.",
  },
  {
    id: "mission",
    title: "Associations, nonprofits, education and public sector",
    blurb: "Firms whose own industry lists and work pages lean toward institutional and mission-driven clients.",
  },
];

export const FIRMS: Firm[] = [
  // ---- Custom web and product builds
  {
    id: "agency-partner-interactive",
    city: "Plano, TX",
    name: "Agency Partner Interactive",
    site: "https://agencypartner.com/",
    group: "builds",
    where: "Plano, TX (address in its footer). Its contact page also lists offices in California, Pakistan (Karachi, Lahore, Islamabad) and Malaysia (Kuala Lumpur).",
    founded: "Since 2010",
    words: "combines strategy, technology, and marketing into a unified growth engine",
    webServices: ["Web & Mobile App Development Services", "AI-powered Web & Mobile Apps"],
    projects: ["Safe Harbor", "Healthy Mind Map", "911 Trainer"],
    clutch: { rating: "4.9", reviews: 88, minProject: "$25,000+", hourly: "$100–$149" },
    sources: [
      { label: "About", href: "https://agencypartner.com/about-us/" },
      { label: "Services", href: "https://agencypartner.com/services/" },
      { label: "Case studies", href: "https://agencypartner.com/case-study/" },
      { label: "Contact", href: "https://agencypartner.com/contact-us/" },
    ],
  },
  {
    id: "flower-press-interactive",
    city: "Medina, WA",
    name: "Flower Press Interactive",
    site: "https://www.theflowerpress.net/",
    group: "builds",
    where: "Medina, WA (address on its home page)",
    founded: "2001",
    words: "a woman-owned digital product studio founded in 2001",
    webServices: ["Website Redesign", "Website Services"],
    projects: ["SheSports", "Seneca Group", "World Perspectives"],
    clutch: { rating: "4.9", reviews: 30, minProject: "$10,000+", hourly: "$150–$199" },
    sources: [
      { label: "Home", href: "https://www.theflowerpress.net/" },
      { label: "Services", href: "https://www.theflowerpress.net/services/" },
      { label: "Work", href: "https://www.theflowerpress.net/work/" },
    ],
  },
  {
    id: "imaginovation",
    city: "Raleigh, NC",
    name: "Imaginovation",
    site: "https://www.imaginovation.net/",
    group: "builds",
    where: "Raleigh, NC (listed under “Our Headquarters”)",
    founded: "2011",
    words: "custom web app development services for growing businesses",
    webServices: ["Custom Web App Development", "Front-End Development", "Full-Stack Web Development", "Enterprise Web App Development"],
    projects: ["CREE", "Design First Builders", "Everflex"],
    clutch: { rating: "4.9", reviews: 18, minProject: "$10,000+", hourly: "$50–$99" },
    sources: [
      { label: "Contact", href: "https://www.imaginovation.net/contact/" },
      { label: "About", href: "https://www.imaginovation.net/about/" },
      { label: "Web development", href: "https://www.imaginovation.net/web-development-services/" },
      { label: "Case studies", href: "https://www.imaginovation.net/case-studies/" },
    ],
  },
  {
    id: "perpetual",
    city: "New York, NY",
    name: "Perpetual",
    site: "https://www.perpetualny.com/",
    group: "builds",
    where: "New York, NY (its About page says it runs from its “Chelsea HQ”); other offices listed in Mumbai and London",
    founded: "2012",
    words: "a top rated digital design and software engineering agency based in New York City",
    webServices: ["Website Development", "UI/UX Design"],
    projects: ["Fox Sports", "HIMSS", "Reuters Japan"],
    pricing: "“Perpetual’s minimum project size is $25K.” (FAQ)",
    clutch: { rating: "4.9", reviews: 99, minProject: "$25,000+", hourly: "$100–$149" },
    sources: [
      { label: "About", href: "https://www.perpetualny.com/about" },
      { label: "Web development", href: "https://www.perpetualny.com/services/web-development" },
      { label: "Work", href: "https://www.perpetualny.com/work" },
      { label: "FAQ", href: "https://www.perpetualny.com/faq" },
    ],
  },
  {
    id: "the-gnar-company",
    city: "Needham, MA",
    name: "The Gnar Company",
    site: "https://thegnar.com/",
    group: "builds",
    where: "Needham, MA (business address); it describes itself as “Boston-based”",
    founded: "2015",
    words: "We help B2B leaders adopt AI, build new software, and modernize the systems they already run.",
    webServices: ["Web Development", "Custom Software Development"],
    projects: ["AARP Foundation", "Fitbit", "Salsify"],
    note: "Its headline offer is custom software, AI and modernization; web development is listed among its technologies.",
    clutch: { rating: "4.8", reviews: 20, minProject: "$25,000+", hourly: "$150–$199" },
    sources: [
      { label: "Contact", href: "https://thegnar.com/contact" },
      { label: "About", href: "https://thegnar.com/about" },
      { label: "Services", href: "https://thegnar.com/custom-software-development" },
      { label: "Work", href: "https://thegnar.com/our-work" },
    ],
  },
  {
    id: "utility",
    city: "New York, NY; Los Angeles, CA",
    name: "Utility",
    site: "https://utility.agency/",
    group: "builds",
    where: "New York, NY and Los Angeles, CA (office addresses; neither is labelled headquarters)",
    founded: "2013",
    words: "Mobile App Development is our core expertise",
    webServices: ["Web Development"],
    projects: ["Airbnb", "Forbes", "Jenny Craig"],
    note: "It names mobile app development as its core expertise; web development is one of its listed services.",
    clutch: { rating: "4.8", reviews: 26, minProject: "$50,000+", hourly: "$100–$149" },
    sources: [
      { label: "About", href: "https://utility.agency/about" },
      { label: "Services", href: "https://utility.agency/services/" },
      { label: "Work", href: "https://utility.agency/work" },
    ],
  },
  // ---- B2B and marketing-led websites
  {
    id: "3-media-web",
    city: "Marlborough, MA",
    name: "3 Media Web",
    site: "https://www.3mediaweb.com/",
    group: "b2b",
    where: "Marlborough, MA (“Marlborough is our headquarters”); its contact page also lists an office in Grand Rapids, MI",
    founded: "2001",
    words: "a B2B WordPress web design, development, and digital marketing agency",
    webServices: ["Custom Web Design", "Website Development", "Website Accessibility"],
    projects: ["Anika Therapeutics", "Claritas Rx", "Sugarman Law Firm"],
    clutch: { rating: "4.9", reviews: 44, minProject: "$25,000+", hourly: "$150–$199" },
    sources: [
      { label: "Marlborough office", href: "https://www.3mediaweb.com/contact/marlborough-ma/" },
      { label: "Contact", href: "https://www.3mediaweb.com/contact/" },
      { label: "Agency", href: "https://www.3mediaweb.com/agency/" },
      { label: "Services", href: "https://www.3mediaweb.com/services/" },
      { label: "Work", href: "https://www.3mediaweb.com/our-work/" },
    ],
  },
  {
    id: "goingclear",
    city: "Lynnfield, MA",
    name: "GoingClear",
    site: "https://goingclear.com/",
    group: "b2b",
    where: "Lynnfield, MA (“Our company headquarters is located in … Lynnfield, Massachusetts”); it also presents itself as a Boston-area agency",
    founded: "2001",
    words: "Rooted in web design & development at the core.",
    webServices: ["Website Design", "B2B Websites", "WordPress CMS Development", "HubSpot CMS Development", "Web Dev & Web Apps"],
    projects: ["ai3.Bio", "Legit Security", "Rightworks"],
    clutch: { rating: "4.9", reviews: 21, minProject: "$10,000+", hourly: "$100–$149" },
    sources: [
      { label: "About", href: "https://goingclear.com/about/" },
      { label: "Home", href: "https://goingclear.com/" },
      { label: "Portfolio", href: "https://goingclear.com/portfolio/" },
    ],
  },
  {
    id: "temper-and-forge",
    city: "Boston, MA; Seattle, WA",
    name: "Temper And Forge",
    site: "https://temperandforge.com/",
    group: "b2b",
    where: "Boston, MA and Seattle, WA (office addresses; neither is labelled headquarters)",
    founded: "2014",
    words: "a full-service strategic growth agency",
    webServices: ["Web Design", "Front-End Development", "Back-End Development"],
    projects: ["Utile Design", "World Panel", "Diagram"],
    clutch: { rating: "5.0", reviews: 53, minProject: "$10,000+", hourly: "$100–$149" },
    sources: [
      { label: "Locations", href: "https://temperandforge.com/locations" },
      { label: "Home", href: "https://temperandforge.com/" },
      { label: "Work", href: "https://temperandforge.com/work" },
    ],
  },
  {
    id: "tkx-media",
    city: "South Jordan, UT",
    name: "TKX Media",
    site: "https://tkxmedia.com/",
    group: "b2b",
    where: "South Jordan, UT (“Digital marketing agency in South Jordan, Utah.”)",
    founded: "2021",
    words: "SEO, PPC, and web development for companies that want revenue they can point to.",
    webServices: ["Website Development"],
    projects: ["ConnectUs Corp", "Preferred Care at Home (PCAH)", "PreferHome"],
    note: "It describes itself first as a digital marketing agency; web development is one of its service lines.",
    clutch: { rating: "5.0", reviews: 19, minProject: "$5,000+", hourly: "$100–$149" },
    sources: [
      { label: "About", href: "https://tkxmedia.com/about/" },
      { label: "Home", href: "https://tkxmedia.com/" },
      { label: "Portfolio", href: "https://tkxmedia.com/portfolio/" },
    ],
  },
  // ---- Associations, nonprofits, education and public sector
  {
    id: "doodleweb",
    city: "Seattle, WA",
    name: "DoodleWeb",
    site: "https://doodleweb.io/",
    group: "mission",
    where: "Seattle, WA (“Headquartered in Seattle at Columbia Tower”)",
    founded: "2019",
    words: "builds on WordPress, Drupal, Shopify, Webflow, and React",
    webServices: ["Web Design & Rebrands", "Web Development"],
    projects: ["Ursa Major", "Young Americans Center", "OrderMesh"],
    pricing: "“Minimum project size is $5,000 and retainer hours run $50 to $99.” Fixed-scope websites from $12,000 (pricing page).",
    note: "It describes a team of 2 to 10 senior specialists.",
    clutch: { rating: "5.0", reviews: 7, minProject: "$5,000+", hourly: "$50–$99" },
    sources: [
      { label: "About", href: "https://doodleweb.io/about" },
      { label: "Pricing", href: "https://doodleweb.io/pricing" },
      { label: "Work", href: "https://doodleweb.io/work" },
    ],
  },
  {
    id: "social-driver",
    city: "Washington, DC",
    name: "Social Driver",
    site: "https://www.socialdriver.com/",
    group: "mission",
    where: "Washington, DC (“Headquartered in Washington, DC, with locations across the country”)",
    founded: "2011",
    words: "deliver communications strategies that mobilize audiences and raise brand awareness",
    webServices: ["Website Design & Development"],
    projects: ["Consumer Healthcare Products Association", "NMSDC", "International Limited Partners Association"],
    note: "Its About page lists certifications: NMSDC, Minority-Owned Business Enterprise (MBE), Certified Business Enterprise Program (CBE) and NGLCC LGBTBE. Website work is one of its service lines alongside communications and marketing.",
    clutch: { rating: "4.9", reviews: 77, minProject: "$25,000+", hourly: "$150–$199" },
    sources: [
      { label: "About", href: "https://www.socialdriver.com/about" },
      { label: "Work", href: "https://www.socialdriver.com/work" },
      { label: "Founding post (15 Apr 2026)", href: "https://www.socialdriver.com/news-insights/15-years-and-still-driving-social-driver-celebrates-in-kansas-city" },
    ],
  },
];

/** How the candidate pool was narrowed (counts are exact for READ_DATE). */
export const METHOD_COUNTS = {
  listings: 25,
  withUsLocation: 22,
  passed: 12,
  unreadable: 4,
  noWebService: 4,
  noUsOffice: 1,
  noRecentDate: 1,
};

export const CLUTCH_DIRECTORY = { label: "Clutch: web developers in the United States", href: "https://clutch.co/us/web-developers" };

/** Cost and market evidence, each with its source and the date shown on the source. */
export const EVIDENCE = {
  clutchDev: {
    href: "https://clutch.co/web-developers/pricing",
    updated: "21 September 2026",
    usHourly: "$100–$149",
    globalHourly: "$25–$49",
    typical: "less than $10,000",
    average: "$66,499",
    months: 9,
  },
  clutchDesign: {
    href: "https://clutch.co/web-designers/pricing",
    updated: "21 September 2026",
    usHourly: "$100–$149",
    range: "$2,000 to $100,000",
    average: "$38,105",
    months: 7,
    agencies: "79,260",
  },
  bls: {
    href: "https://www.bls.gov/ooh/computer-and-information-technology/web-developers.htm",
    modified: "27 August 2026",
    developerMedian: "$92,650",
    designerMedian: "$104,000",
    combinedMedian: "$99,520",
    jobs: "87,400",
    growth: "4%",
  },
  w3techs: {
    href: "https://w3techs.com/technologies/overview/content_management",
    read: "23 October 2026",
    rows: [
      ["WordPress", "39.6%", "58.3%"],
      ["Shopify", "5.3%", "7.9%"],
      ["Wix", "4.2%", ""],
      ["Squarespace", "2.4%", ""],
      ["Joomla", "1.1%", ""],
      ["Drupal", "0.6%", ""],
    ] as [string, string, string][],
    noCms: "32.1%",
  },
  webVitals: { href: "https://web.dev/articles/vitals", updated: "31 October 2024" },
  wcag: { href: "https://www.w3.org/TR/WCAG22/", status: "W3C Recommendation, 12 December 2024" },
  google: { href: "https://developers.google.com/search/docs/beginner/do-i-need-seo", updated: "5 June 2026" },
};

export const CHANGE_LOG = [
  `${READ_DATE}: page rewritten. The previous version was general advice with no list of firms, prices or sources.`,
];
