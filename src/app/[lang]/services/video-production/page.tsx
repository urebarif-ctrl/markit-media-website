import type { Metadata } from "next";
import { ServicePage } from "@/components/service-page";
import { Video } from "lucide-react";

export const metadata: Metadata = {
  title: "Video Production",
  description: "Professional video production: commercials, video editing, motion graphics, reels, short-form content, and animation. Tell your brand story through video.",
  alternates: { canonical: "https://themarkitmedia.com/en/services/video-production" },
};

export default function VideoProductionPage() {
  return (
    <ServicePage
      icon={Video}
      heroImage="/images/services/video.jpg"
      blogCategory="Video"
      title="Video Production"
      description="Tell your brand story through professional video. From commercials and motion graphics to reels and animation, we produce video content that captures attention and drives results."
      longDescription="Video is the most engaging content format across every platform. Our production team handles everything from concept development and scripting to filming, editing, and post-production. Whether you need a polished brand commercial, social media reels, explainer animations, or motion graphics, we deliver video content that communicates your message and connects with your audience."
      subServices={[
        { title: "Commercial Production", desc: "Brand commercials and promotional videos from concept through final delivery.", href: "/services/video-production/commercial-production" },
        { title: "Video Editing", desc: "Professional editing, color grading, sound design, and post-production.", href: "/services/video-production/video-editing" },
        { title: "Motion Graphics", desc: "Animated graphics, title sequences, lower thirds, and visual effects.", href: "/services/video-production/motion-graphics" },
        { title: "Reels & Short-Form", desc: "Vertical video content optimized for Instagram Reels, TikTok, and YouTube Shorts.", href: "/services/video-production/reels-short-form" },
        { title: "Animation", desc: "2D and explainer animations that simplify complex ideas and engage viewers.", href: "/services/video-production/animation" },
      ]}
      benefits={[
        "End-to-end production from concept to final delivery",
        "Content formatted for every platform and aspect ratio",
        "Professional color grading and sound design",
        "Fast turnaround on short-form and social content",
        "Scalable video packages for ongoing content needs",
      ]}
      faq={[
        { q: "What types of video do you produce?", a: "We produce brand commercials, product videos, explainer animations, social media reels, testimonial videos, event coverage, and corporate videos." },
        { q: "How long does a video project take?", a: "Short-form social content can be delivered in 1-2 weeks. Full commercial productions typically take 3-6 weeks from concept to final delivery." },
        { q: "Do you handle scripting and concept development?", a: "Yes. Our creative team handles scripting, storyboarding, and concept development before any filming begins." },
        { q: "Can you create content for social media platforms?", a: "Yes. We produce vertical and horizontal video content optimized for Instagram, TikTok, YouTube, LinkedIn, and Facebook." },
        { q: "Do you offer ongoing video content packages?", a: "Yes. We offer monthly retainer packages for businesses that need regular video content, including social reels, product videos, and promotional content." },
      ]}
      relatedServices={[
        { title: "Social Media", href: "/services/social-media" },
        { title: "Branding & Design", href: "/services/branding" },
        { title: "Content Marketing", href: "/services/content-marketing" },
      ]}
    />
  );
}
