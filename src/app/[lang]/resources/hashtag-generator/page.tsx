"use client";

import { useState } from "react";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Platform = "instagram" | "tiktok" | "linkedin" | "twitter" | "youtube" | "general";

type Niche =
  | "digital-marketing"
  | "fitness"
  | "food"
  | "travel"
  | "tech"
  | "fashion"
  | "real-estate"
  | "photography"
  | "health"
  | "beauty"
  | "business"
  | "finance"
  | "education"
  | "home-decor"
  | "pets";

interface HashtagSet {
  high: string[];
  medium: string[];
  low: string[];
}

/* ------------------------------------------------------------------ */
/*  Platform info                                                      */
/* ------------------------------------------------------------------ */

const platforms: { id: Platform; label: string }[] = [
  { id: "instagram", label: "Instagram" },
  { id: "tiktok", label: "TikTok" },
  { id: "linkedin", label: "LinkedIn" },
  { id: "twitter", label: "Twitter/X" },
  { id: "youtube", label: "YouTube" },
  { id: "general", label: "General" },
];

const niches: { id: Niche; label: string }[] = [
  { id: "digital-marketing", label: "Digital Marketing" },
  { id: "fitness", label: "Fitness" },
  { id: "food", label: "Food" },
  { id: "travel", label: "Travel" },
  { id: "tech", label: "Tech" },
  { id: "fashion", label: "Fashion" },
  { id: "real-estate", label: "Real Estate" },
  { id: "photography", label: "Photography" },
  { id: "health", label: "Health" },
  { id: "beauty", label: "Beauty" },
  { id: "business", label: "Business" },
  { id: "finance", label: "Finance" },
  { id: "education", label: "Education" },
  { id: "home-decor", label: "Home Decor" },
  { id: "pets", label: "Pets" },
];

/* ------------------------------------------------------------------ */
/*  Hashtag data (30 per niche, split into high/medium/low reach)      */
/* ------------------------------------------------------------------ */

const hashtagData: Record<Niche, HashtagSet> = {
  "digital-marketing": {
    high: ["#digitalmarketing", "#marketing", "#socialmedia", "#business", "#branding", "#seo", "#contentmarketing", "#onlinemarketing", "#marketingstrategy", "#advertising"],
    medium: ["#emailmarketing", "#ppcadvertising", "#marketingtips", "#growthhacking", "#leadgeneration", "#conversionoptimization", "#inboundmarketing", "#brandstrategy", "#affiliatemarketing", "#marketingautomation"],
    low: ["#b2bmarketingtips", "#localseostrategy", "#contentmarketingplan", "#emailfunnels", "#paidmediamanagement", "#conversionrateoptimization", "#organicgrowthstrategy", "#marketinganalyticstools", "#socialmediaadstips", "#landingpageoptimization"],
  },
  fitness: {
    high: ["#fitness", "#workout", "#gym", "#fitnessmotivation", "#fit", "#training", "#health", "#bodybuilding", "#exercise", "#fitfam"],
    medium: ["#homeworkout", "#strengthtraining", "#cardioworkout", "#fitnesstips", "#personaltrainer", "#weightlifting", "#fitnessgoals", "#hiitworkout", "#crossfit", "#functionaltraining"],
    low: ["#morningworkoutroutine", "#bodweightstrength", "#newbiefitnesstips", "#progressiveoverload", "#mobilitytraining", "#fitnessaccountability", "#gymsetathome", "#workoutsplitguide", "#mindbodyfitness", "#strengthforbeginners"],
  },
  food: {
    high: ["#food", "#foodie", "#cooking", "#recipe", "#homemade", "#instafood", "#delicious", "#foodphotography", "#healthyfood", "#dinner"],
    medium: ["#mealprep", "#easycooking", "#veganrecipes", "#foodblogger", "#comfortfood", "#bakingathome", "#quickmeals", "#plantbased", "#glutenfree", "#seasonalcooking"],
    low: ["#weeknightdinnerideas", "#mealpreponabudget", "#homecookingbeginner", "#onepotmealrecipes", "#balancedplaterecipe", "#farmtotablecooking", "#cookingfromhome", "#simplehealthymeals", "#pantrystaplerecipes", "#familymealideas"],
  },
  travel: {
    high: ["#travel", "#wanderlust", "#travelgram", "#vacation", "#traveling", "#explore", "#adventure", "#travelphotography", "#trip", "#tourism"],
    medium: ["#solotravel", "#budgettravel", "#travelblogger", "#roadtrip", "#travelguide", "#backpacking", "#luxurytravel", "#digitalnomad", "#travelinspiration", "#hiddenplaces"],
    low: ["#offthebeatenpath", "#solotraveltips", "#budgetfriendlytravel", "#sustainabletourism", "#culturalimmersion", "#travelplanningtips", "#weekendgetawayideas", "#ecofriendlytravel", "#slowtravelmovement", "#worldtravelguide"],
  },
  tech: {
    high: ["#technology", "#tech", "#innovation", "#coding", "#programming", "#ai", "#software", "#startup", "#gadgets", "#developer"],
    medium: ["#machinelearning", "#webdevelopment", "#cybersecurity", "#cloudcomputing", "#datatechnology", "#techindustry", "#uxdesign", "#appdevelopment", "#devops", "#openai"],
    low: ["#frontenddevelopertips", "#apifirstdesign", "#startupmvpbuilding", "#techfounderjourney", "#pythonprojects", "#reactjstutorials", "#cloudnativeapps", "#techcareerpaths", "#codingforbeginners", "#nocodetoolsguide"],
  },
  fashion: {
    high: ["#fashion", "#style", "#ootd", "#fashionblogger", "#outfit", "#streetstyle", "#fashionista", "#instafashion", "#clothing", "#trendy"],
    medium: ["#sustainablefashion", "#fashiontips", "#streetwear", "#minimalfashion", "#vintagestyle", "#fashioninspo", "#capsulewardrobe", "#thriftfashion", "#ethicalfashion", "#mensfashion"],
    low: ["#capsulewardrobeideas", "#thriftstorefinds", "#sustainableclosetguide", "#workwearoutfits", "#dailyoutfitinspo", "#affordablefashiontips", "#slowfashionmovement", "#colorblockingoutfit", "#fashionbudgettips", "#transitionalstyleoutfits"],
  },
  "real-estate": {
    high: ["#realestate", "#home", "#property", "#realtor", "#househunting", "#realtorlife", "#dreamhome", "#luxuryrealestate", "#forsale", "#newhome"],
    medium: ["#firsttimebuyer", "#realestateagent", "#propertylisting", "#homeselling", "#investmentproperty", "#realestatetips", "#openhouse", "#housingmarket", "#commercialrealestate", "#homemortgage"],
    low: ["#firsttimehomebuyertips", "#realestateinvesting101", "#fixandflipproject", "#homeevaluationguide", "#propertymarkettrends", "#rentalpropertyincome", "#realestatenegotiation", "#sellmyhousefast", "#mortgagerateupdate", "#homevaluetips"],
  },
  photography: {
    high: ["#photography", "#photo", "#photooftheday", "#photographer", "#nature", "#art", "#portrait", "#landscape", "#photoshoot", "#camera"],
    medium: ["#streetphotography", "#travelphotography", "#filmmaking", "#canonphotography", "#editingtips", "#lightroommasters", "#droneshots", "#goldenhour", "#compositiontips", "#nikonphotography"],
    low: ["#photographyforbeginners", "#manuallensshooter", "#nightphotographytips", "#photocompositionrules", "#photowalkcommunity", "#goldenhourshooting", "#editingworkflow", "#mobilephotographytips", "#outdoorportraitlight", "#blackandwhitephotoart"],
  },
  health: {
    high: ["#health", "#wellness", "#healthy", "#mentalhealth", "#selfcare", "#nutrition", "#mindfulness", "#motivation", "#lifestyle", "#healthyliving"],
    medium: ["#holistichealth", "#wellnessblogger", "#healthtips", "#sleephygiene", "#stressrelief", "#gutfriendly", "#healthyhabits", "#immuneboost", "#preventivecare", "#antiinflammatory"],
    low: ["#morningroutinehealth", "#guthealtdiet", "#mentalhealthmatters", "#holisticwellnesscoach", "#sleepqualitytips", "#inflammationdiet", "#healthyaginglifestyle", "#stressmanagementtools", "#mindfulnessdaily", "#wellnessfromwithin"],
  },
  beauty: {
    high: ["#beauty", "#skincare", "#makeup", "#beautiful", "#cosmetics", "#makeupartist", "#skincareroutine", "#beautytips", "#glam", "#beautyproducts"],
    medium: ["#cleanbeauty", "#skincaretips", "#makeuptutorial", "#naturalskincare", "#antiaging", "#beautyblogger", "#haircare", "#beautyreview", "#skincarescience", "#crueltyfreemakeup"],
    low: ["#dryskincareroutine", "#cleanbeautyfavorites", "#drugstoreskincarehaul", "#morningskincaresteps", "#retinolbeginnerguide", "#naturalglowroutine", "#veganbeautybrands", "#sensitiveskinproducts", "#skincareingredients", "#affordablebeautyfinds"],
  },
  business: {
    high: ["#business", "#entrepreneur", "#success", "#motivation", "#startup", "#hustle", "#leadership", "#smallbusiness", "#ceo", "#growth"],
    medium: ["#businesstips", "#entrepreneurlife", "#smallbusinessowner", "#sidehustle", "#scalingup", "#productivityhacks", "#bizdev", "#founderstory", "#solopreneur", "#ecommercebusiness"],
    low: ["#solopreneurlife", "#smallbizmarketing", "#startupgrindtips", "#foundermindset", "#businessprocessautomation", "#scalingasmallbusiness", "#remotebusinesstips", "#clientretentionstrategies", "#buildingabrand", "#onlinebusinessideas"],
  },
  finance: {
    high: ["#finance", "#investing", "#money", "#financialfreedom", "#stockmarket", "#wealth", "#personalfinance", "#crypto", "#trading", "#budgeting"],
    medium: ["#financetips", "#passiveincome", "#moneymindset", "#investmentportfolio", "#debtfree", "#wealthbuilding", "#indexfunds", "#retireearly", "#savingmoney", "#financialplanning"],
    low: ["#budgetingforbeginners", "#passiveincomestreams", "#stockmarketbasics", "#debtpayoffplan", "#retirementplanning101", "#emergencyfundbuilding", "#indexfundinvesting", "#personalfinancetips", "#frugallivinghacks", "#wealthbuildingjourney"],
  },
  education: {
    high: ["#education", "#learning", "#teacher", "#school", "#study", "#students", "#teaching", "#knowledge", "#onlinelearning", "#edtech"],
    medium: ["#elearning", "#teacherlife", "#studymotivation", "#educationtechnology", "#homeschooling", "#highereducation", "#tutoring", "#classroomideas", "#studentsuccess", "#lifetimelearning"],
    low: ["#studytipsforstudents", "#homeschoolcurriculum", "#onlinecoursebuilder", "#educatorsofinstagram", "#teachingstrategies", "#distancelearningtips", "#stemforeducators", "#classroomengagement", "#educationalgames", "#adulteducationcourses"],
  },
  "home-decor": {
    high: ["#homedecor", "#interiordesign", "#home", "#decor", "#design", "#homedesign", "#interior", "#decoration", "#furniture", "#livingroom"],
    medium: ["#modernhome", "#bohostyle", "#minimalistdesign", "#homeinspo", "#diydecor", "#smallspaces", "#homeoffice", "#scandinaviandesign", "#cozyvibes", "#homeimprovement"],
    low: ["#smallapartmentdecor", "#diyhomedecorprojects", "#budgetfriendlydecor", "#minimalistapartment", "#rentalfriendlydecor", "#neutralhomedecor", "#farmhousedecorideas", "#homeofficesetupideas", "#cozylivingroomdecor", "#organizationhacks"],
  },
  pets: {
    high: ["#pets", "#dogs", "#cats", "#dogsofinstagram", "#catsofinstagram", "#puppy", "#kitten", "#petlover", "#animals", "#doglover"],
    medium: ["#dogtraining", "#catcare", "#petphotography", "#rescuepet", "#pettips", "#petparents", "#healthypets", "#dogwalking", "#petgrooming", "#adoptdontshop"],
    low: ["#puppytrainingtips", "#catbehaviorguide", "#petfoodrecipes", "#dogbreedguide", "#seniorpetcare", "#rawdogfoodiet", "#catadoptionadvice", "#petownerhacks", "#dogwalkingtips", "#dogfriendlytravel"],
  },
};

/* ------------------------------------------------------------------ */
/*  Platform-specific prefix/suffix modifiers                          */
/* ------------------------------------------------------------------ */

const platformPrefixes: Record<Platform, string[]> = {
  instagram: ["#instagood", "#instadaily", "#reels"],
  tiktok: ["#fyp", "#foryou", "#viral"],
  linkedin: ["#careers", "#networking", "#professionaldevelopment"],
  twitter: ["#trending", "#thread", "#twittermarketing"],
  youtube: ["#youtuber", "#subscribe", "#videocontent"],
  general: [],
};

/* ------------------------------------------------------------------ */
/*  Best practices data per platform                                   */
/* ------------------------------------------------------------------ */

const bestPractices: Record<Platform, { optimal: string; tip: string }> = {
  instagram: { optimal: "3 to 5 per post (use up to 30 in the first comment if needed)", tip: "Mix broad and niche hashtags. Place them in the first comment to keep captions clean." },
  tiktok: { optimal: "3 to 5 per video", tip: "Use trending hashtags mixed with niche ones. Keep the total under 5 for best reach." },
  linkedin: { optimal: "3 to 5 per post", tip: "Keep it professional. Use industry-specific hashtags and avoid overly casual tags." },
  twitter: { optimal: "1 to 2 per tweet", tip: "Less is more on Twitter. One or two relevant hashtags outperform a wall of tags." },
  youtube: { optimal: "5 to 8 per video (in tags, not title)", tip: "Use hashtags in the description. Only the first three appear above the title." },
  general: { optimal: "Varies by platform", tip: "Research each platform and adapt your hashtag strategy accordingly." },
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */



export default function HashtagGeneratorPage() {
  const [selectedNiche, setSelectedNiche] = useState<Niche | "">("");
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>("instagram");
  const [customTopic, setCustomTopic] = useState("");
  const [generated, setGenerated] = useState<HashtagSet | null>(null);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  function generate() {
    if (!selectedNiche) return;
    const base = hashtagData[selectedNiche];
    const prefixes = platformPrefixes[selectedPlatform];

    // Swap a few base high-reach tags with platform-specific ones for variety
    const high = [...base.high];
    prefixes.forEach((p, i) => {
      if (i < high.length) high[high.length - 1 - i] = p;
    });

    setGenerated({ high, medium: base.medium, low: base.low });
  }

  function allHashtags(): string[] {
    if (!generated) return [];
    return [...generated.high, ...generated.medium, ...generated.low];
  }

  function sectionHashtags(section: "high" | "medium" | "low"): string[] {
    if (!generated) return [];
    return generated[section];
  }

  function hashtagText(tags: string[]): string {
    return tags.join(" ");
  }

  function charCount(tags: string[]): number {
    return hashtagText(tags).length;
  }

  async function copyToClipboard(text: string, label: string) {
    await navigator.clipboard.writeText(text);
    setCopiedSection(label);
    setTimeout(() => setCopiedSection(null), 2000);
  }

  const all = allHashtags();

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Social Media Hashtag Generator",
          description: "Generate curated hashtag suggestions organized by reach for Instagram, TikTok, LinkedIn, Twitter/X, YouTube, and more.",
          url: "https://themarkitmedia.com/en/resources/hashtag-generator",
          applicationCategory: "Marketing Tool",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          provider: { "@type": "Organization", name: "Markit Media", url: "https://themarkitmedia.com" },
        }) }}
      />
      <title>Social Media Hashtag Generator | Free Marketing Tool — Markit Media</title>
      <meta name="description" content="Generate curated hashtag suggestions organized by reach for Instagram, TikTok, LinkedIn, Twitter/X, YouTube, and more." />
      
      {/* Related Tools */}
      <section className="px-6 lg:px-12 py-12" aria-label="Related tools">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">Related Tools</h2>
          <div className="flex flex-wrap gap-3">
                <Link href="/resources/social-media-planner" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Social Media Planner</Link>
                <Link href="/resources/social-media-roi" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Social Media ROI</Link>
                <Link href="/resources/social-media-audit" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Social Media Audit</Link>
                <Link href="/resources/social-calendar" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Social Calendar</Link>
          </div>
        </div>
      </section>
<JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Social Media Hashtag Generator",
          description:
            "Generate curated hashtag suggestions organized by reach for Instagram, TikTok, LinkedIn, Twitter/X, YouTube, and more.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />

      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Hashtag Generator" },
        ]}
      />

      {/* ---- Hero ---- */}
      <section aria-label="Free Tool" className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Social Media Hashtag Generator
            </h1>
            <SectionDesc>
              Enter your topic or niche, pick your platform, and get 30 curated hashtags organized by reach level — ready to copy and paste.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* ---- Inputs ---- */}
      <section aria-label="Content section" className="px-6 lg:px-12 pb-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <Animate animation="fade-up">
            <div>
              <label htmlFor="niche" className="block text-base font-bold text-black mb-2">
                Topic / Niche
              </label>
              <select
                id="niche"
                value={selectedNiche}
                onChange={(e) => {
                  setSelectedNiche(e.target.value as Niche);
                  setGenerated(null);
                }}
                className="w-full border border-gray-300 px-4 py-3 text-base bg-white focus-visible:border-black focus-visible:outline-none transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 min-h-[44px]"
              >
                <option value="">Select a niche...</option>
                {niches.map((n) => (
                  <option key={n.id} value={n.id}>
                    {n.label}
                  </option>
                ))}
              </select>
            </div>
          </Animate>

          <Animate animation="fade-up" delay={40}>
            <div>
              <label htmlFor="custom-topic" className="block text-base font-bold text-black mb-2">
                Custom Topic <span className="text-gray-400 font-normal">(optional — refine results)</span>
              </label>
              <input
                id="custom-topic"
                type="text"
                placeholder="e.g. meal prep for weight loss, startup SaaS launch"
                value={customTopic}
                onChange={(e) => setCustomTopic(e.target.value)}
                className="w-full border border-gray-300 px-4 py-3 text-base focus-visible:border-black focus-visible:outline-none transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 min-h-[44px]"
              />
            </div>
          </Animate>

          <Animate animation="fade-up" delay={80}>
            <div>
              <p className="text-base font-bold text-black mb-3">Platform</p>
              <div className="flex flex-wrap gap-2">
                {platforms.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setSelectedPlatform(p.id);
                      setGenerated(null);
                    }}
                    className={`px-5 py-3 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 min-h-[44px] ${
                      selectedPlatform === p.id
                        ? "bg-black text-white"
                        : "border border-gray-200 text-gray-600 hover:border-black"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </Animate>

          <Animate animation="fade-up" delay={120}>
            <button
              onClick={generate}
              disabled={!selectedNiche}
              className="bg-black text-white px-8 py-4 text-base font-bold hover:bg-gray-900 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 disabled:opacity-40 disabled:cursor-not-allowed min-h-[44px]"
            >
              Generate Hashtags
            </button>
          </Animate>
        </div>
      </section>

      {/* ---- Results ---- */}
      {generated && (
        <section aria-label="Content section" className="px-6 lg:px-12 pb-12">
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Stats bar */}
            <Animate animation="fade-up">
              <div className="flex flex-wrap gap-6 border border-gray-200 p-4">
                <div>
                  <span className="text-base font-bold text-black">{all.length}</span>{" "}
                  <span className="text-base text-gray-500">hashtags</span>
                </div>
                <div>
                  <span className="text-base font-bold text-black">{charCount(all)}</span>{" "}
                  <span className="text-base text-gray-500">characters</span>
                </div>
                <div className="ml-auto">
                  <button
                    onClick={() => copyToClipboard(hashtagText(all), "all")}
                    className="px-5 py-3 text-base font-bold bg-black text-white hover:bg-gray-900 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 min-h-[44px]"
                  >
                    {copiedSection === "all" ? "Copied" : "Copy All"}
                  </button>
                </div>
              </div>
            </Animate>

            {/* High Reach */}
            <Animate animation="fade-up" delay={40}>
              <div className="border border-gray-200 overflow-hidden">
                <div className="bg-black text-white p-4 flex items-center justify-between">
                  <div>
                    <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold">
                      High Reach
                    </h2>
                    <p className="text-base text-gray-400 mt-1">Broad, competitive hashtags with large audiences</p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(hashtagText(sectionHashtags("high")), "high")}
                    className="px-4 py-3 text-base font-bold border border-white text-white hover:bg-white hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 min-h-[44px]"
                  >
                    {copiedSection === "high" ? "Copied" : "Copy"}
                  </button>
                </div>
                <div className="p-4">
                  <div className="flex flex-wrap gap-2">
                    {generated.high.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block border border-gray-200 px-4 py-2 text-base text-black"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-base text-gray-500 mt-3">
                    {generated.high.length} hashtags &middot; {charCount(generated.high)} characters
                  </p>
                </div>
              </div>
            </Animate>

            {/* Medium Reach */}
            <Animate animation="fade-up" delay={80}>
              <div className="border border-gray-200 overflow-hidden">
                <div className="bg-gray-100 p-4 flex items-center justify-between">
                  <div>
                    <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black">
                      Medium Reach
                    </h2>
                    <p className="text-base text-gray-500 mt-1">Niche-specific hashtags with moderate competition</p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(hashtagText(sectionHashtags("medium")), "medium")}
                    className="px-4 py-3 text-base font-bold border border-black text-black hover:bg-black hover:text-white transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 min-h-[44px]"
                  >
                    {copiedSection === "medium" ? "Copied" : "Copy"}
                  </button>
                </div>
                <div className="p-4">
                  <div className="flex flex-wrap gap-2">
                    {generated.medium.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block border border-gray-200 px-4 py-2 text-base text-black"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-base text-gray-500 mt-3">
                    {generated.medium.length} hashtags &middot; {charCount(generated.medium)} characters
                  </p>
                </div>
              </div>
            </Animate>

            {/* Low Competition */}
            <Animate animation="fade-up" delay={120}>
              <div className="border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 p-4 flex items-center justify-between">
                  <div>
                    <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black">
                      Low Competition
                    </h2>
                    <p className="text-base text-gray-500 mt-1">Long-tail, specific hashtags for targeted reach</p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(hashtagText(sectionHashtags("low")), "low")}
                    className="px-4 py-3 text-base font-bold border border-black text-black hover:bg-black hover:text-white transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 min-h-[44px]"
                  >
                    {copiedSection === "low" ? "Copied" : "Copy"}
                  </button>
                </div>
                <div className="p-4">
                  <div className="flex flex-wrap gap-2">
                    {generated.low.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block border border-gray-200 px-4 py-2 text-base text-black"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-base text-gray-500 mt-3">
                    {generated.low.length} hashtags &middot; {charCount(generated.low)} characters
                  </p>
                </div>
              </div>
            </Animate>
          </div>
        </section>
      )}

      {/* ---- Best Practices ---- */}
      <section aria-label="Optimal number per platform" className="px-6 lg:px-12 py-16">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-black tracking-tight mb-8">
              Hashtag Best Practices
            </h2>
          </Animate>

          <Stagger stagger={80} className="space-y-6">
            <div>
              <h3 className="text-base font-bold text-black mb-2">Optimal number per platform</h3>
              <div className="border border-gray-200 overflow-hidden">
                {platforms.map((p) => (
                  <div key={p.id} className="flex items-start gap-4 p-4 border-b border-gray-200 last:border-b-0">
                    <span className="text-base font-bold text-black min-w-[100px]">{p.label}</span>
                    <span className="text-base text-gray-500">{bestPractices[p.id].optimal}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-base font-bold text-black mb-2">Branded vs. generic hashtags</h3>
              <div className="text-base text-gray-500 leading-relaxed space-y-3">
                <p>
                  <strong className="text-black">Branded hashtags</strong> are unique to your business (e.g. #YourBrandName, #YourCampaign). Use them to build community and track user-generated content. Create one or two and include them consistently.
                </p>
                <p>
                  <strong className="text-black">Generic hashtags</strong> are industry-wide terms (e.g. #marketing, #fitness). They provide discovery but carry more competition. Mix 2 to 3 generic with 3 to 5 niche-specific tags for the best balance.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-base font-bold text-black mb-2">Hashtag research tips</h3>
              <div className="text-base text-gray-500 leading-relaxed space-y-3">
                <p>
                  Check the volume of each hashtag before using it. On Instagram, tap a hashtag to see how many posts use it. Avoid hashtags with over 10 million posts unless your account already has strong engagement.
                </p>
                <p>
                  Study your competitors. Look at which hashtags high-performing accounts in your niche use consistently. Build sets of 10 to 15 hashtags that you rotate across posts to avoid being flagged for repetitive behavior.
                </p>
                <p>
                  Track performance. Use native analytics or a scheduling tool to see which hashtag sets drive the most reach and engagement. Drop underperformers and test new ones every two weeks.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-base font-bold text-black mb-2">Platform-specific tips</h3>
              <div className="border border-gray-200 overflow-hidden">
                {platforms.filter((p) => p.id !== "general").map((p) => (
                  <div key={p.id} className="p-4 border-b border-gray-200 last:border-b-0">
                    <span className="text-base font-bold text-black">{p.label}:</span>{" "}
                    <span className="text-base text-gray-500">{bestPractices[p.id].tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </Stagger>
        </div>
      </section>

      {/* ---- CTA ---- */}
      <section aria-label="Call to action" className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Need a Full Social Media Strategy?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Hashtags are just one part of the equation. Our team builds complete social media strategies — content calendars, community management, paid promotion, and analytics.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/services/social-media"
                className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 min-h-[44px]"
              >
                Our Social Media Services &rarr;
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 border border-white text-white px-10 py-5 font-bold text-base hover:bg-white hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 min-h-[44px]"
              >
                Contact Us &rarr;
              </Link>
            </div>
          </Animate>
        </div>
      </section>
    
      <ToolCTA
        toolName="Hashtag Generator"
        services={[
          { title: "Social Media Marketing", desc: "Strategy, content, and community management across all platforms.", href: "/services/social-media-marketing" },
          { title: "Content Marketing", desc: "Engaging content that builds brand authority and drives engagement.", href: "/services/content-marketing" },
          { title: "Digital Marketing", desc: "Integrated digital strategy connecting social to business results.", href: "/services/digital-marketing" },
        ]}
        relatedTools={[
          { title: "Email Warmup Planner", href: "/resources/email-warmup-planner" },
          { title: "Experiment Tracker", href: "/resources/experiment-tracker" },
          { title: "Funnel Calculator", href: "/resources/funnel-calculator" },
          { title: "Funnel Visualizer", href: "/resources/funnel-visualizer" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
