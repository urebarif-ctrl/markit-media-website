import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "Reels & Short-Form Video",
  description:
    "Short-form vertical video production for Instagram Reels, TikTok, and YouTube Shorts. Scroll-stopping content designed for engagement, reach, and brand growth on social platforms.",
  alternates: {
    canonical:
      "https://themarkitmedia.com/en/services/video-production/reels-short-form",
  },
};

export default function ReelsShortFormPage() {
  return (
    <SubServicePage
      parentTitle="Video Production"
      parentHref="/services/video-production"
      title="Reels & Short-Form Video"
      description="Capture attention in the first second and hold it. We produce vertical, short-form video content built specifically for Instagram Reels, TikTok, and YouTube Shorts — with hooks, pacing, and editing patterns designed for how people actually consume content on these platforms."
      details={[
        "Content strategy and ideation tailored to short-form platforms, focusing on trending formats, hooks, and engagement patterns that drive reach.",
        "Vertical video production (9:16) shot and framed specifically for mobile-first viewing across Reels, TikTok, and Shorts.",
        "Fast-paced editing with dynamic cuts, on-screen text, captions, and sound design optimized for short attention spans and sound-off viewing.",
        "Batch production workflows that deliver multiple pieces of content from a single shoot session, maximizing efficiency and output.",
        "Caption and subtitle integration — both burned-in and platform-native — to ensure accessibility and engagement in sound-off environments.",
        "Trend-aware content that leverages current audio, formats, and editing styles while staying true to your brand voice and positioning.",
      ]}
      benefits={[
        "Content built for how audiences actually consume short-form video",
        "Batch production that delivers volume without sacrificing quality",
        "Platform-native formatting for Reels, TikTok, and Shorts",
        "Accessible content with captions for sound-off viewing",
        "Fast turnaround to keep pace with trending formats",
        "Consistent brand presence across all short-form platforms",
      ]}
      faq={[
        {
          q: "How many videos can you produce per month?",
          a: "Output depends on your plan and content complexity. Through batch shooting, we can produce anywhere from 8 to 30+ short-form videos per month. We structure shoots to maximize content volume from each session.",
        },
        {
          q: "Do you handle content strategy or just production?",
          a: "Both. We develop content calendars, identify trending formats relevant to your niche, plan shoot days, and handle all production and editing. Strategy and execution are integrated.",
        },
        {
          q: "Can you repurpose our existing long-form content into short-form?",
          a: "Yes. We regularly clip and re-edit long-form videos — podcasts, webinars, interviews, brand films — into short-form pieces optimized for vertical platforms. This is one of the most efficient ways to scale your content output.",
        },
        {
          q: "Do you add captions and subtitles?",
          a: "Yes. Every video includes captions — either burned into the video or formatted for platform-native subtitle tools. This is essential for engagement since most social video is viewed without sound.",
        },
      ]}
    />
  );
}
