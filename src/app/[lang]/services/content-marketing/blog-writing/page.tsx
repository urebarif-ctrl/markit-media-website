import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "Blog Writing Services",
  description:
    "SEO-optimized blog writing and thought leadership content. Markit Media produces well-researched articles that rank in search, build authority, and support your content marketing goals.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/services/content-marketing/blog-writing",
  },
  openGraph: {
    title: "Blog Writing Services",
    description: "SEO-optimized blog writing and thought leadership content. Markit Media produces well-researched articles that rank in search, build authority, and supp...",
  },
};

export default function BlogWritingPage() {
  return (
    <SubServicePage
      parentTitle="Content Marketing"
      parentHref="/services/content-marketing"
      title="Blog Writing"
      description="Consistent, well-researched blog content builds organic traffic and positions your brand as a trusted resource. We handle topic ideation, SEO research, writing, and formatting so you can publish regularly without pulling your team away from their core work."
      details={[
        "Topic ideation and keyword mapping — identify high-opportunity topics by combining keyword research, competitor gap analysis, and audience questions to build a pipeline of articles worth writing.",
        "SEO-optimized article writing — produce long-form and standard blog posts with proper heading structure, internal linking, keyword placement, and meta descriptions that satisfy both readers and search engines.",
        "Thought leadership content — develop opinion pieces, industry analyses, and executive byline articles that demonstrate expertise and give your audience insights they can't find elsewhere.",
        "Content briefs and outlines — create detailed briefs for each article specifying target keyword, search intent, audience, structure, and competitive benchmarks before a single word is written.",
        "Visual and formatting guidance — recommend images, charts, callout boxes, and formatting structures that improve readability, time on page, and scannability.",
        "Publishing and on-page optimization — deliver publish-ready content with optimized title tags, meta descriptions, URL slugs, alt text recommendations, and internal link placements.",
      ]}
      benefits={[
        "Steady flow of search-optimized content without taxing your internal team",
        "Articles built around real search demand and audience intent",
        "Stronger domain authority through consistent, quality publishing",
        "Thought leadership positioning that builds credibility with prospects",
        "Structured content briefs that ensure every article has a clear purpose",
        "Publish-ready posts that minimize your review and editing time",
      ]}
      faq={[
        {
          q: "How do you choose blog topics?",
          a: "We combine keyword research, competitor content analysis, and your business priorities to identify topics with search demand that align with what your audience cares about. Every topic is vetted for search volume, difficulty, and relevance before writing begins.",
        },
        {
          q: "How long are the articles you write?",
          a: "Length depends on the topic and competitive landscape. Most articles range from 1,200 to 2,500 words. We let the search intent and depth required by the subject determine the right length rather than targeting an arbitrary word count.",
        },
        {
          q: "Can you match our existing brand voice?",
          a: "Yes. We review your existing content, style guidelines, and audience profile to calibrate tone and vocabulary. After the first few posts, we refine the voice based on your feedback until it's a natural fit.",
        },
        {
          q: "How often should we publish blog content?",
          a: "Frequency depends on your goals and resources. For most businesses, two to four well-researched posts per month is more effective than daily low-quality output. Consistency and quality matter more than volume.",
        },
      ]}
    />
  );
}
