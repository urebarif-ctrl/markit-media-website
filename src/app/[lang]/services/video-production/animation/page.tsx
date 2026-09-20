import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "Animation",
  description:
    "Professional 2D animation services including explainer videos, animated infographics, character animation, and whiteboard animations that simplify complex ideas and engage your audience.",
  alternates: {
    canonical:
      "https://themarkitmedia.com/en/services/video-production/animation",
  },
  openGraph: {
    title: "Animation",
    description: "Professional 2D animation services including explainer videos, animated infographics, character animation, and whiteboard animations that simplify compl...",
  },
};

export default function AnimationPage() {
  return (
    <SubServicePage
      parentTitle="Video Production"
      parentHref="/services/video-production"
      title="Animation"
      description="Explain complex ideas, tell your brand story, and engage audiences with professionally crafted animation. We produce 2D animated content — from explainer videos and product walkthroughs to animated infographics and character-driven narratives — designed to communicate clearly and hold attention."
      details={[
        "Explainer video production that distills complex products, services, or processes into clear, engaging animated narratives.",
        "2D character animation and illustrated storytelling for brand campaigns, onboarding content, and educational material.",
        "Animated infographics and data storytelling that present numbers, timelines, and processes as dynamic visual sequences.",
        "Whiteboard and sketch-style animation for training content, internal communications, and educational videos.",
        "Script development and voiceover direction to ensure the narrative drives the animation and communicates your message effectively.",
        "Custom illustration and asset creation — characters, icons, backgrounds, and UI elements — designed to match your brand identity.",
        "Multi-format delivery for web, social media, presentations, and digital advertising with appropriate resolution and aspect ratios.",
      ]}
      benefits={[
        "Complex ideas made simple through visual storytelling",
        "Custom illustration style that reflects your brand identity",
        "Versatile content usable across marketing, sales, and training",
        "No filming logistics — animation is produced entirely in-studio",
        "Easy to update and localize as your messaging evolves",
        "Higher retention and engagement compared to static content",
      ]}
      faq={[
        {
          q: "What styles of animation do you offer?",
          a: "We produce 2D animation across a range of styles — flat design, illustrated character animation, whiteboard/sketch, isometric, and infographic-driven formats. We recommend a style based on your brand, audience, and content goals.",
        },
        {
          q: "How long does it take to produce an animated video?",
          a: "A typical 60-90 second explainer video takes 4-6 weeks from script to final delivery. Shorter or simpler animations can be completed faster, while more complex or longer-form projects may take 6-8 weeks.",
        },
        {
          q: "Do you write the script and voiceover?",
          a: "Yes. We offer end-to-end production including scriptwriting, professional voiceover recording, and sound design. You can also provide your own script or voiceover if you prefer.",
        },
        {
          q: "Can animated videos be updated after delivery?",
          a: "Yes. One of the advantages of animation is that elements can be revised without reshooting. We retain project files and can update text, data, branding, or sections of the animation as your needs change.",
        },
      ]}
    />
  );
}
