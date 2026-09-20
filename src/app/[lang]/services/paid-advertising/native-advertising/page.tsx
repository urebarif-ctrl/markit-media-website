import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "Native Advertising Services",
  description:
    "Sponsored content and in-feed ad campaigns that match the look and feel of the platforms they appear on. Markit Media creates native ads that engage audiences without disrupting their browsing experience.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/services/paid-advertising/native-advertising",
  },
  openGraph: {
    title: "Native Advertising Services",
    description: "Sponsored content and in-feed ad campaigns that match the look and feel of the platforms they appear on. Markit Media creates native ads that engage aud...",
  },
};

export default function NativeAdvertisingPage() {
  return (
    <SubServicePage
      parentTitle="Paid Advertising"
      parentHref="/services/paid-advertising"
      title="Native Advertising"
      description="Native ads match the editorial format of the platform they appear on, earning attention through relevance rather than interruption. We create and manage sponsored content and in-feed campaigns that blend naturally into news feeds, content recommendations, and publisher sites."
      details={[
        "Sponsored content creation — write articles, stories, and editorial-style content that delivers genuine value while naturally introducing your brand, product, or perspective to the reader.",
        "In-feed ad campaigns — design and manage native ad units that appear within social feeds, news feeds, and content recommendation widgets, matching the surrounding format and user experience.",
        "Content discovery platform management — launch and optimize campaigns on platforms like Taboola and Outbrain to distribute your content across premium publisher networks at scale.",
        "Publisher partnerships — identify and negotiate sponsored content opportunities with relevant publishers, coordinating editorial requirements, disclosure standards, and performance expectations.",
        "Creative and headline testing — develop multiple headline, image, and description combinations for each campaign and systematically test them to identify top-performing variations.",
        "Performance tracking and attribution — monitor engagement metrics including click-through rate, time on page, scroll depth, and downstream conversions to measure the true impact of native placements.",
      ]}
      benefits={[
        "Higher engagement rates than traditional display advertising",
        "Non-disruptive format that earns attention through relevance",
        "Access to premium publisher audiences through content discovery networks",
        "Editorial-quality content that builds trust while promoting your brand",
        "Systematic creative testing that improves results over time",
        "Full performance visibility from impression through to conversion",
      ]}
      faq={[
        {
          q: "What is native advertising?",
          a: "Native advertising is paid content that matches the form and function of the platform where it appears. Unlike banner ads, native ads look and feel like the surrounding editorial content, which leads to higher engagement and less ad fatigue.",
        },
        {
          q: "How is native advertising different from content marketing?",
          a: "Content marketing uses your own channels (blog, email, social) to distribute content organically. Native advertising pays for placement on third-party platforms, putting your content in front of audiences you don't already reach through your own channels.",
        },
        {
          q: "Which platforms do you use for native advertising?",
          a: "We work with content discovery platforms like Taboola and Outbrain, social media native formats, and direct publisher partnerships. The platform mix depends on your audience, goals, and budget.",
        },
        {
          q: "How do you maintain transparency with native ads?",
          a: "All native advertising we produce follows FTC disclosure guidelines and platform-specific labeling requirements. Sponsored content is clearly marked, which protects both your brand reputation and reader trust.",
        },
      ]}
    />
  );
}
