import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "Motion Graphics",
  description:
    "Custom motion graphics including animated titles, lower thirds, logo animations, visual effects, and kinetic typography to elevate your video content and brand presence.",
  alternates: {
    canonical:
      "https://themarkitmedia.com/en/services/video-production/motion-graphics",
  },
};

export default function MotionGraphicsPage() {
  return (
    <SubServicePage
      parentTitle="Video Production"
      parentHref="/services/video-production"
      title="Motion Graphics"
      description="Add visual depth and professional polish to your video content with custom motion graphics. From animated title sequences and lower thirds to data visualizations and visual effects, we create graphics that reinforce your brand identity and make complex information easy to understand."
      details={[
        "Custom title sequences and animated intros that establish visual identity and set the tone for your video content.",
        "Lower thirds, name straps, and on-screen text animations designed to match your brand guidelines and improve viewer clarity.",
        "Logo animations and brand reveals for use across video content, presentations, social media, and digital displays.",
        "Kinetic typography and text-driven animations that bring scripts, quotes, and key messages to life on screen.",
        "Data visualization and infographic animations that turn complex numbers and processes into clear, engaging visual stories.",
        "Visual effects compositing including screen replacements, environment enhancements, and seamless graphic overlays within live-action footage.",
        "Template creation for recurring content — social series, podcast episodes, event recaps — so your team can maintain visual consistency at scale.",
      ]}
      benefits={[
        "Elevated production quality that sets your content apart",
        "Brand-consistent graphic elements across all video assets",
        "Complex information presented clearly through animated visuals",
        "Reusable templates that streamline ongoing content production",
        "Seamless integration with live-action footage and existing edits",
        "Versatile assets usable across video, social, web, and presentations",
      ]}
      faq={[
        {
          q: "What software do you use for motion graphics?",
          a: "Our team primarily works in Adobe After Effects and Cinema 4D for 3D elements, with additional tools depending on the project. We deliver in whatever format your workflow requires.",
        },
        {
          q: "Can you create a motion graphics package for our brand?",
          a: "Yes. We build complete motion graphics packages — intros, outros, lower thirds, transitions, and title cards — all designed to your brand guidelines. These can be delivered as templates for your team to reuse.",
        },
        {
          q: "How long does a motion graphics project take?",
          a: "Simple elements like lower thirds or logo animations typically take 1-2 weeks. More complex work such as full title sequences, data-driven animations, or VFX compositing can take 3-6 weeks depending on scope.",
        },
        {
          q: "Can motion graphics be added to existing videos?",
          a: "Yes. We regularly add motion graphics to existing edits — overlaying animated text, graphics, data visualizations, or visual effects onto footage that has already been shot and edited.",
        },
      ]}
    />
  );
}
