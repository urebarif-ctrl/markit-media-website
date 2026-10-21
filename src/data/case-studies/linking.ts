/**
 * Internal-linking map (case-studies plan, section 8). Every entry is a link FROM an industry or location page TO a work page.
 * Rules applied while building this list (owner decisions 21 Oct 2026):
 *  - HUBCO and Vuse are not added to any new page (no new attribution without approval); wrong-fit links were removed
 *    (HUBCO on EV chargers / finance, Pur Health on rehab & recovery).
 *  - A location page links only to clients whose city is verified (see docs/seo/uncertainty-ledger.csv).
 *  - Industries marked CONFIRM in the plan (Diana Dulce, Gleam, Mehekline, Mehk Kar, The Chef's Lounge, PHF, Thermo King,
 *    H University) are left out until the owner confirms them.
 */
export const INDUSTRY_CASES: Record<string, string[]> = {
  "restaurants": [
    "elite",
    "tourao-brazilian-steakhouse",
    "ashars-kitchen",
    "sheesha-lounge-and-grill",
    "pizza-warma",
    "qwench-juice-bar",
    "flour-magician"
  ],
  "hospitality": [
    "sheesha-lounge-and-grill",
    "pakhlanze",
    "tourao-brazilian-steakhouse",
    "elite"
  ],
  "food-ingredients-ecommerce": [
    "chefiality",
    "wild-game-jerky",
    "foodfolio"
  ],
  "healthcare": [
    "pur-health",
    "arch-point",
    "baytown-pediatrics",
    "crescent-health-system",
    "viva-diagnostics",
    "mustcare-vet-centres",
    "kemah-palms-recovery"
  ],
  "rehab-recovery": [
    "kemah-palms-recovery"
  ],
  "ev-chargers": [
    "north-charge"
  ],
  "real-estate": [
    "noorshad",
    "one-homes"
  ],
  "fashion": [
    "minhaz-couture",
    "easywear",
    "find-my-apparel",
    "fashion-feed"
  ],
  "ecommerce": [
    "minhaz-couture",
    "wild-game-jerky",
    "the-bauble-store",
    "diaper-world",
    "cheap-hardware-store",
    "chefiality"
  ],
  "manufacturing": [
    "cambridge-electrical",
    "global-industries",
    "thermex",
    "twister",
    "imh-vacuum-flask"
  ],
  "automotive": [
    "american-auto-parts",
    "panthers"
  ],
  "saas": [
    "meezotech",
    "binarygrid",
    "beepers"
  ],
  "b2b": [
    "meezotech",
    "binarygrid",
    "global-industries",
    "ceha-halal"
  ],
  "nonprofits": [
    "quaid-e-azam-foundation"
  ],
  "personal-branding": [
    "madiha-masood",
    "dr-jason-hayes",
    "noorshad",
    "ureb-digital-marketing"
  ],
  "professional-services": [
    "ceha-halal",
    "noorshad"
  ],
  "construction": [
    "cheap-hardware-store"
  ]
};

export const LOCATION_CASES: Record<string, string[]> = {
  "locations/united-states/houston": [
    "elite",
    "tourao-brazilian-steakhouse",
    "ashars-kitchen",
    "sheesha-lounge-and-grill",
    "arch-point",
    "quaid-e-azam-foundation",
    "baytown-pediatrics"
  ],
  "locations/united-states/houston/website-development": [
    "elite"
  ],
  "locations/united-states/houston/marketing-agency": [
    "elite",
    "tourao-brazilian-steakhouse",
    "arch-point"
  ],
  "locations/pakistan": [
    "cambridge-electrical",
    "one-homes",
    "chefiality",
    "ceha-halal",
    "flour-magician",
    "pizza-warma",
    "pakhlanze",
    "real-rose-beauty"
  ],
  "locations/karachi/branding": [
    "logo-folio"
  ],
  "locations/australia": [
    "mustcare-vet-centres"
  ],
  "locations/united-states/dallas": [
    "dallas-panthers"
  ],
  "locations/karachi": [
    "pizza-warma"
  ],
  "locations/canada": [
    "north-charge"
  ]
};

/** Display name and service label for the slugs above (kept here so client components do not import the full data source). */
export const CASE_CARDS: Record<string, { n: string; l: string }> = {
  "diaper-world": {
    "n": "Diaper World",
    "l": "Logo design"
  },
  "ceha-halal": {
    "n": "CEHA Halal",
    "l": "Social media"
  },
  "dr-jason-hayes": {
    "n": "Dr Jason Hayes",
    "l": "Logo design"
  },
  "thermex": {
    "n": "Thermex",
    "l": "Logo design"
  },
  "easywear": {
    "n": "Easywear",
    "l": "Logo design"
  },
  "meezotech": {
    "n": "MeezoTech",
    "l": "Motion graphics"
  },
  "real-rose-beauty": {
    "n": "Real Rose Beauty",
    "l": "Social media"
  },
  "chefiality": {
    "n": "Chefiality",
    "l": "Branding"
  },
  "cheap-hardware-store": {
    "n": "Cheap Hardware Store",
    "l": "Logo design"
  },
  "noorshad": {
    "n": "NoorShad",
    "l": "Video production"
  },
  "twister": {
    "n": "Twister",
    "l": "Social media"
  },
  "beepers": {
    "n": "Beepers",
    "l": "Logo design"
  },
  "global-industries": {
    "n": "Global Industries",
    "l": "Logo design"
  },
  "american-auto-parts": {
    "n": "American Auto Parts",
    "l": "Video production"
  },
  "ashars-kitchen": {
    "n": "Ashar's Kitchen",
    "l": "Logo design"
  },
  "imh-vacuum-flask": {
    "n": "IMH Vacuum Flask",
    "l": "Logo design"
  },
  "binarygrid": {
    "n": "BinaryGrid",
    "l": "Logo design"
  },
  "crescent-health-system": {
    "n": "Crescent Health System",
    "l": "Logo design"
  },
  "baytown-pediatrics": {
    "n": "Baytown Pediatrics",
    "l": "Logo design"
  },
  "viva-diagnostics": {
    "n": "Viva Diagnostics",
    "l": "Logo design"
  },
  "ureb-digital-marketing": {
    "n": "Ureb Digital Marketing",
    "l": "Social media"
  },
  "pur-health": {
    "n": "Pur Health",
    "l": "Website development"
  },
  "sheesha-lounge-and-grill": {
    "n": "Sheesha Lounge and Grill",
    "l": "Content creation"
  },
  "wild-game-jerky": {
    "n": "Wild Game Jerky",
    "l": "Content creation"
  },
  "madiha-masood": {
    "n": "Madiha Masood",
    "l": "Logo design"
  },
  "pizza-warma": {
    "n": "Pizza Warma",
    "l": "Content creation"
  },
  "the-bauble-store": {
    "n": "The Bauble Store",
    "l": "Social media"
  },
  "panthers": {
    "n": "Panthers",
    "l": "Social media"
  },
  "dallas-panthers": {
    "n": "Dallas Panthers",
    "l": "Social media"
  },
  "arch-point": {
    "n": "ArchPoint Pain Institute",
    "l": "Logo design"
  },
  "find-my-apparel": {
    "n": "Find My Apparel",
    "l": "Content creation"
  },
  "minhaz-couture": {
    "n": "Minhaz Couture",
    "l": "Website development"
  },
  "qwench-juice-bar": {
    "n": "Qwench Juice Bar",
    "l": "Content creation"
  },
  "quaid-e-azam-foundation": {
    "n": "Quaid-e-Azam Foundation",
    "l": "Logo design"
  },
  "foodfolio": {
    "n": "FoodFolio",
    "l": "Social media"
  },
  "pakhlanze": {
    "n": "Pakhlanze by Abeera Khan",
    "l": "Logo design"
  },
  "kemah-palms-recovery": {
    "n": "Kemah Palms Recovery",
    "l": "Social media"
  },
  "tourao-brazilian-steakhouse": {
    "n": "Tourão Brazilian Steakhouse",
    "l": "Content creation"
  },
  "north-charge": {
    "n": "North Charge",
    "l": "Social media"
  },
  "one-homes": {
    "n": "One Homes",
    "l": "Video production"
  },
  "logo-folio": {
    "n": "Logo Folio",
    "l": "Logo design"
  },
  "fashion-feed": {
    "n": "Fashion Feed",
    "l": "Social media"
  },
  "flour-magician": {
    "n": "Flour Magician",
    "l": "Social media"
  },
  "mustcare-vet-centres": {
    "n": "MustCare Vet Centres",
    "l": "Social media"
  },
  "elite": {
    "n": "Elite Indo-Pak Restaurant",
    "l": "Website development"
  },
  "cambridge-electrical": {
    "n": "Cambridge Electrical Appliances",
    "l": "Social media"
  }
};
