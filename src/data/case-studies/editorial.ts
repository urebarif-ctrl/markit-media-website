/**
 * Editorial copy for case-study pages. One entry per page that has been rewritten.
 *
 * Rules (owner decision 21 Oct 2026): only verified facts, no invented results, quotes, deliverables or
 * relationships, no filler to hit a word count. `sources` records where each fact came from so the copy can be
 * re-checked. A page without an entry keeps its current copy and is listed in the uncertainty ledger.
 */
export interface EditorialSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface EditorialVideo {
  id: string;
  name: string;
  /** Required for a VideoObject; leave out until verified from YouTube Studio. */
  description?: string;
  uploadDate?: string;
  duration?: string;
}

export interface Editorial {
  lede: string;
  /** Project year, only when the owner has confirmed it. */
  projectYear?: number;
  /** Short deliverables line for the snapshot box, e.g. "1 identity board, 12 posts". */
  deliverables?: string;
  sections: EditorialSection[];
  videos?: EditorialVideo[];
  /** True when the copy meets the standard in docs/seo (real, specific, enough to stand alone). Lets a noindex page go indexable. */
  indexReady?: boolean;
  /** Where each fact came from (kept in the repo so reviewers can re-check). */
  sources: string[];
}

const EDITORIAL: Record<string, Editorial> = {
  elite: {
    lede:
      "Elite Indo-Pak Restaurant is an Indian and Pakistani restaurant in Sugar Land, Texas. Markit Media built its website, produced a website showcase reel and a social media reel, and designed a set of dish-led social posts that share one dark, gold-accented look.",
    deliverables: "Website, website showcase reel, social media reel, 12 social posts shown on this page",
    sections: [
      {
        heading: "The challenge",
        paragraphs: [
          "Elite opened in 2022 in Sugar Land, Texas. On its own website it describes the aim as presenting Indian and Pakistani cooking as a refined, modern dining experience, with online ordering, catering and private events alongside the dining room.",
          "The menu is built on dishes many guests already know: karahi, tikka, samosas, daal gosht, ras malai. That is a visual problem as much as a marketing one. Familiar food, often served in rich sauces, has to look as polished online as the restaurant says it is, and it has to do so in a feed where every other restaurant is also posting food.",
        ],
      },
      {
        heading: "Our approach",
        paragraphs: [
          "We started from the restaurant's own positioning and kept one look across the website and the social posts: dark backgrounds, warm gold lettering and a single dish at the centre of each frame.",
          "Every post carries the Elite mark at the top, and the dish posts share the same footer, a reservation phone number and the website address, so each one works on its own as an invitation to book. Dishes sit on dark surfaces such as marble, wood and slate, which keeps the colour in the food instead of the background.",
          "Headlines pair a script face for the feeling (\"Satisfy your Desi Cravings\", \"Devour the Goodness\") with a plain serif for the supporting line. Thin arrow call-outs name each dish, for example Karahi Qeema, Chicken Tikka Boti or Peshawari Karahi, so viewers learn the menu while they scroll.",
        ],
      },
      {
        heading: "What we delivered",
        paragraphs: ["The work spans the website, two videos and a run of social posts. The posts shown further down this page cover starters, mains, desserts and a catering offer."],
        bullets: [
          "A website for the restaurant at eliteindopak.com, with the same dark and gold styling as the social posts",
          "A website showcase reel that walks through the build",
          "A social media reel for the restaurant's channels",
          "Twelve social posts shown on this page: tikka and samosa starters, karahi, daal gosht, mutter paneer and okra mains, fried fish, ras malai and ice cream desserts, and a catering offer",
          "One shared layout and type system, so web and social read as the same brand",
        ],
      },
      {
        heading: "Lessons for restaurant brands",
        bullets: [
          "Name the dish on the image. A small call-out label turns a food photo into a menu preview and helps guests who do not know a dish by sight.",
          "Put the booking route on the post. A phone number and web address in the same place each time means a dish post does not depend on its caption to be useful.",
          "Style offers like dishes. The catering post uses the same logo and headline treatment as the menu posts, so an offer reads as part of the brand rather than an ad dropped into the feed.",
        ],
      },
    ],
    videos: [
      { id: "gdYOxjfyUr0", name: "Elite Website Showcase Reel" },
      { id: "_UOtCEgQeSg", name: "Elite Social Media Reel" },
    ],
    sources: [
      "eliteindopak.com home and /about (checked 21 Oct 2026): founded 2022, Sugar Land TX 77498, Indian and Pakistani cuisine, order online, catering, private events",
      "Artwork reviewed by eye: 12 pieces (dish names, footer, catering offer, layout)",
      "Website, showcase reel and social reel: carried over from the existing page copy (owner-published); not independently verifiable",
    ],
    indexReady: true,
  },
  "cambridge-electrical": {
    lede:
      "Cambridge Electrical Appliances sells home, kitchen and personal-care appliances in Pakistan under the Cambridge Appliances name. Markit Media designed its social media creative: product-led posts for hair care, cooking and home appliances, plus a summer series built around drinks.",
    deliverables: "31 social posts shown on this page, 4 videos (a portfolio reel, a winter fan heater campaign and two summer campaign reels)",
    sections: [
      {
        heading: "The challenge",
        paragraphs: [
          "Cambridge sells across many appliance categories. Its website lists home appliances such as dry irons, fan heaters and insect killers, hair and beauty tools, and a wide kitchen range of blenders, juicers, food processors, ovens and cookware.",
          "A catalogue that wide is hard to post about without every post looking different. The creative needed one recognisable system that could carry a hair dryer, a wok set and a vacuum flask, show the product clearly, and still change with the season.",
        ],
      },
      {
        heading: "Our approach",
        paragraphs: [
          "Every post uses the same frame. The Cambridge mark and its line \"Your Family Member\" sit at the top, a large headline names the benefit or the moment, the product fills the middle, and the footer carries the model number and the website address.",
          "Small red and white icon badges such as Durable, Lightweight, Easy to use and Non-stick give the key features at a glance without a paragraph of copy. Headlines play on the product: \"Blowout\" for a hair dryer, \"To-asty snack?\" for a toaster, \"Flip with confidence\" for a kitchen tong.",
          "Everyday product posts stay on neutral grey and white backgrounds. The summer series changes the system: pink, yellow, teal and green backgrounds, fruit, palm leaves, parasols and a shared #summerdelights tag turn the same blenders and juicers into a seasonal campaign.",
        ],
      },
      {
        heading: "What we delivered",
        paragraphs: ["The page shows 31 of the social posts, grouped by the product families they cover, alongside four videos."],
        bullets: [
          "Hair care posts for hair dryers and a hair curler",
          "Kitchen posts for blenders, juicers, food processors, hand blenders and hand mixers, ovens, sandwich makers, a toaster, woks, frying pans, cutlery and a kitchen tong",
          "Home posts for an insect killer, a dry iron and vacuum flasks",
          "A summer series of drink-led posts with the #summerdelights tag",
          "A portfolio reel, a winter fan heater campaign video and two summer campaign reels",
        ],
      },
      {
        heading: "Lessons for appliance brands",
        bullets: [
          "Lead with the moment, not the model. Headlines about a morning, a snack or a season give the product a reason to be in the feed; the model number can sit quietly in the footer.",
          "Show features as icons. Two or three badges beat a paragraph on a social post and keep the layout consistent from product to product.",
          "Let the season change the background, not the system. The summer posts look different but share the same logo position, headline weight and footer, so they still read as Cambridge.",
        ],
      },
    ],
    videos: [
      { id: "zJw91k5LwwM", name: "Cambridge Electrical Appliances Portfolio Reel" },
      { id: "dTvA7rF_jOk", name: "Cambridge Fan Heater Winter Campaign" },
      { id: "0xc6RcRJ-L8", name: "Cambridge Summer Campaign Reel" },
      { id: "8Rfo4poWXzA", name: "Cambridge Summer Campaign Reel 2" },
    ],
    sources: [
      "cambridgebrand.pk (checked 21 Oct 2026): Cambridge Appliances, +92 Pakistan phone, product categories",
      "Artwork reviewed by eye: all 31 pieces (headlines, badges, footers, summer series)",
      "Video titles from the existing page; upload dates and durations not available (YouTube blocks server access)",
    ],
    indexReady: true,
  },
  "arch-point": {
    lede:
      "ArchPoint Pain Institute is a pain management clinic in the Houston, Texas area. Markit Media created its logo and brand identity: a serif wordmark with a stylised spine symbol, a crimson, amber and pink palette, and applications across stationery, a lab coat, signage and a website screen.",
    deliverables: "1 logo and brand identity board",
    sections: [
      {
        heading: "What the identity had to do",
        paragraphs: [
          "A pain clinic's mark works in two very different places. It has to be calm and credible on a letterhead or a website, and it has to stay readable when it is small, for example placed on the chest of a lab coat or printed on a business card.",
          "ArchPoint's current website describes pain management services and lists two offices, Houston-Cypress and Houston-Tomball, and says it serves the wider Greater Houston area. The identity needed to feel professional and approachable across all of them rather than clinical and cold.",
        ],
      },
      {
        heading: "The design",
        paragraphs: [
          "The logo sets \"ARCH\" and \"POINT\" in serif capitals with \"PAIN INSTITUTE\" beneath in smaller capitals. Between the two words sits the symbol: a column of dots and short segments that reads as a spine, held inside two curved strokes, one crimson and one amber.",
          "The palette is three colours, shown on the board with their codes: crimson (AF0D34), amber (FAB00D) and a soft pink (FFA3B9). Crimson carries the wordmark and the main backgrounds, amber lifts the symbol and the secondary panels, and pink is the light accent.",
          "The serif letterforms keep the name formal, while the warm colours stop the identity from feeling like a hospital sign.",
        ],
      },
      {
        heading: "Where it is used",
        paragraphs: [
          "The board shows the identity applied to a letterhead and folder, business cards, a white lab coat with the symbol on the chest, a round illuminated exterior sign and a laptop screen. These are presentation mockups of how the system works across print, uniform, signage and screen.",
        ],
      },
    ],
    sources: [
      "archpointpain.com (checked 21 Oct 2026): ArchPoint Pain Houston, pain management, offices Houston-Cypress and Houston-Tomball",
      "Identity board reviewed by eye: wordmark, symbol, HEX codes printed on the board, mockups",
      "No project brief, year or results supplied: none are claimed",
    ],
    indexReady: true,
  },
  "tourao-brazilian-steakhouse": {
    lede:
      "Tourão Brazilian Steakhouse is a Brazilian steakhouse with locations in Houston and Katy, Texas. Markit Media designed its food social posts: close-up skewers and cuts, bold condensed headlines and a flame-lit background, with both locations in every footer.",
    deliverables: "6 social posts shown on this page",
    sections: [
      {
        heading: "What the posts had to do",
        paragraphs: [
          "Tourão serves churrasco, meat grilled on skewers, at two locations. The posts show the food and also tell people where to find it, so each design carries the logo, a phone number for each location, both street addresses, the website and social media icons.",
        ],
      },
      {
        heading: "The design",
        paragraphs: [
          "Each post puts one cut or skewer in the middle of the frame, large enough to show the char and the juices. Backgrounds are either a dark ember texture with flames or a solid warm colour, amber in one post and red in another, so the meat stays the brightest thing on the screen.",
          "Headlines are set in a heavy condensed typeface, in white, amber or red, and read like the food sounds: \"Succulent with smoky flair\", \"Aromatic meat sensation\", \"Prime ribeye flavor satisfaction\", \"Lamb chops, rich with melt-in-your-mouth flavor\".",
          "One post is an offer rather than a dish: a rodizio special with a price badge, shown in the same layout so promotions look like part of the feed. The same footer sits at the bottom of every post.",
        ],
      },
      {
        heading: "Where it is used",
        paragraphs: [
          "The designs are social media posts in a portrait format. The restaurant's own website, mytourao.com, lists the Houston and Katy locations shown in the footer.",
        ],
      },
    ],
    sources: [
      "mytourao.com (checked 21 Oct 2026): Tourao Brazilian Steakhouse, Houston and Katy",
      "Artwork reviewed by eye: 6 pieces; both addresses and phone numbers are printed in the footer of each post",
      "No brief, year, results or posting platform supplied: none are claimed",
    ],
    indexReady: false, // 256 words of real copy: below the 300-word standard; page stays indexable only through the existing 6+ pieces policy
  },
};

export function editorialFor(slug: string): Editorial | undefined {
  return EDITORIAL[slug];
}
