import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "Social Media Content Creation Services",
  description:
    "Professional social media content creation including graphics, video, copywriting, and platform-specific formats. Markit Media produces scroll-stopping content that drives engagement.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/services/social-media/content-creation",
  },
};

export default function ContentCreationPage() {
  return (
    <SubServicePage
      parentTitle="Social Media"
      parentHref="/services/social-media"
      title="Social Media Content Creation"
      description="Great social media starts with great content. We produce platform-native graphics, videos, and copy designed to capture attention, drive engagement, and communicate your brand message in the formats each audience expects."
      details={[
        "Graphic design for social — create branded static posts, carousels, infographics, and story graphics sized and optimized for each platform's specifications and best practices.",
        "Short-form video production — produce Reels, TikToks, YouTube Shorts, and other vertical video content including scripting, filming direction, editing, captions, and sound design.",
        "Copywriting and captions — write platform-appropriate copy that matches your brand voice, drives engagement, and includes clear calls to action tailored to each post format and objective.",
        "Platform-specific content adaptation — take a single concept and adapt it across multiple platforms, adjusting format, length, tone, and visual treatment to fit each channel's unique audience behavior.",
        "Content templates and brand kits — develop reusable design templates and style guides that maintain visual consistency while enabling your team to produce on-brand content efficiently.",
        "Trend monitoring and reactive content — stay on top of trending audio, formats, and cultural moments to produce timely content that keeps your brand relevant and visible in feeds.",
      ]}
      benefits={[
        "Professionally designed content that stands out in crowded social feeds",
        "Platform-native formats that perform better than repurposed generic content",
        "Consistent brand identity across every post and every platform",
        "Engaging video content produced without the overhead of an in-house video team",
        "Reusable templates that speed up future content production",
        "Copy that speaks to your audience and drives measurable engagement",
      ]}
      faq={[
        {
          q: "What types of social media content do you create?",
          a: "We produce static graphics, carousels, stories, Reels, TikToks, YouTube Shorts, animated posts, infographics, and written captions. Every piece is designed for the specific platform where it will be published.",
        },
        {
          q: "Do you handle video production for social media?",
          a: "Yes. We handle short-form video from concept through final edit, including scripting, storyboarding, editing, captioning, and sound. For brands that provide raw footage, we also offer editing-only packages.",
        },
        {
          q: "How do you maintain brand consistency across platforms?",
          a: "We develop a brand kit that defines your colors, fonts, logo usage, and visual style for social media. Every piece of content is created from these guidelines, and we use templates to ensure consistency even as content volume scales up.",
        },
        {
          q: "How much content do you typically produce per month?",
          a: "Content volume depends on your strategy and the number of active platforms. Most clients work with us on packages ranging from 12 to 30 or more posts per month, plus stories and video content. We scope this during the strategy phase.",
        },
      ]}
    />
  );
}
