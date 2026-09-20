import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "Video Editing",
  description:
    "Professional video editing services including color grading, sound design, and post-production. We transform raw footage into polished, engaging content ready for any platform.",
  alternates: {
    canonical:
      "https://themarkitmedia.com/en/services/video-production/video-editing",
  },
  openGraph: {
    title: "Video Editing",
    description: "Professional video editing services including color grading, sound design, and post-production. We transform raw footage into polished, engaging content...",
  },
};

export default function VideoEditingPage() {
  return (
    <SubServicePage
      parentTitle="Video Production"
      parentHref="/services/video-production"
      title="Video Editing"
      description="Turn raw footage into polished, compelling video content. Our post-production team handles everything from assembly cuts and narrative editing to color grading, sound design, and final mastering — delivering content that holds attention and communicates your message clearly."
      details={[
        "Narrative and assembly editing that shapes raw footage into a coherent, engaging story with proper pacing and structure.",
        "Professional color grading and color correction to establish visual tone, ensure consistency across shots, and match your brand aesthetic.",
        "Sound design, audio mixing, and noise reduction to deliver clean, balanced audio that enhances the viewing experience.",
        "Music selection and licensing, voiceover integration, and sound effects layering for a complete audio mix.",
        "Graphics integration including lower thirds, text overlays, transitions, and branded elements within the edit.",
        "Multi-format export and optimization for YouTube, social media, broadcast, and web delivery with appropriate codecs and aspect ratios.",
      ]}
      benefits={[
        "Polished final output from any quality of raw footage",
        "Consistent color and visual tone across all your video content",
        "Professional audio that keeps viewers engaged",
        "Fast turnaround with structured revision rounds",
        "Platform-optimized exports for every distribution channel",
        "Scalable editing capacity for ongoing content needs",
      ]}
      faq={[
        {
          q: "What formats and footage can you work with?",
          a: "We work with all major camera formats and codecs — from smartphone footage to cinema-camera RAW files. We can accept files via cloud transfer, hard drive, or direct upload to our project portal.",
        },
        {
          q: "How many revision rounds are included?",
          a: "Our standard workflow includes two rounds of revisions after the initial cut. Additional revision rounds can be arranged based on project scope and complexity.",
        },
        {
          q: "Do you provide color grading as part of the edit?",
          a: "Yes. Every project includes color correction for consistency across shots. Full creative color grading — establishing a specific look or visual mood — is included in our standard editing workflow.",
        },
        {
          q: "Can you handle ongoing editing work, not just one-off projects?",
          a: "Absolutely. Many of our clients work with us on a recurring basis for weekly or monthly content. We offer retainer arrangements that provide dedicated editing capacity and faster turnaround.",
        },
      ]}
    />
  );
}
