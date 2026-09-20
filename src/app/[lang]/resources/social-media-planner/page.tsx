"use client";

import { useState } from "react";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";

const platforms = [
  {
    name: "Instagram",
    types: [
      { format: "Feed Post", freq: "3-5/week", best: "Tue-Fri, 11am-1pm", tips: "Carousel posts get highest engagement. Use 20-30 hashtags on first comment." },
      { format: "Stories", freq: "Daily", best: "Morning and evening", tips: "Use polls, questions, and stickers. 3-7 stories per day keeps you visible." },
      { format: "Reels", freq: "4-7/week", best: "Tue-Fri, 9am-12pm", tips: "Hook in first 3 seconds. Use trending audio. Keep under 30 seconds for reach." },
    ],
  },
  {
    name: "LinkedIn",
    types: [
      { format: "Text Post", freq: "3-5/week", best: "Tue-Thu, 7-8am", tips: "Personal stories outperform corporate content. Use line breaks for readability." },
      { format: "Article", freq: "1-2/month", best: "Tue-Wed, 10am", tips: "Long-form thought leadership. Repurpose blog content with personal perspective." },
      { format: "Video", freq: "1-2/week", best: "Tue-Thu, 8-10am", tips: "Native video gets 5x more reach than links. Add captions for silent viewing." },
    ],
  },
  {
    name: "TikTok",
    types: [
      { format: "Short Video", freq: "1-3/day", best: "Mon-Sat, 7-9pm", tips: "First 1-2 seconds are critical. Use trending sounds. Reply to comments with video." },
      { format: "Duet/Stitch", freq: "2-3/week", best: "Peak hours", tips: "React to industry content. Shows personality and increases discoverability." },
      { format: "Live", freq: "1-2/week", best: "Thu-Sun, 7-10pm", tips: "Go live for at least 30 minutes. Engage with comments consistently." },
    ],
  },
  {
    name: "Facebook",
    types: [
      { format: "Feed Post", freq: "3-5/week", best: "Wed-Fri, 1-4pm", tips: "Video and photo posts outperform links. Ask questions to drive comments." },
      { format: "Reels", freq: "3-5/week", best: "Evenings", tips: "Cross-post from Instagram Reels. Facebook is pushing short-form video reach." },
      { format: "Group Post", freq: "2-3/week", best: "Mon-Fri, 10am-12pm", tips: "Be helpful, not promotional. Answer questions and share insights." },
    ],
  },
  {
    name: "X (Twitter)",
    types: [
      { format: "Tweet", freq: "3-5/day", best: "Mon-Fri, 8-10am", tips: "Short and opinionated. Threads get more engagement than single tweets." },
      { format: "Thread", freq: "2-3/week", best: "Tue-Thu, 9am", tips: "Start with a hook. Number each point. End with a summary and CTA." },
      { format: "Spaces", freq: "1/week", best: "Thu-Fri, 12-2pm", tips: "Host industry discussions. Promote 24 hours in advance." },
    ],
  },
  {
    name: "YouTube",
    types: [
      { format: "Long Video", freq: "1-2/week", best: "Fri-Sat, 2-4pm", tips: "First 30 seconds determine retention. Optimize title, thumbnail, and description." },
      { format: "Shorts", freq: "3-5/week", best: "Daily, 12-3pm", tips: "Repurpose TikTok and Reels content. Under 60 seconds." },
      { format: "Community Post", freq: "2-3/week", best: "Peak hours", tips: "Polls, behind-the-scenes, and content teasers keep subscribers engaged." },
    ],
  },
];

export default function SocialMediaPlannerPage() {
  const [selected, setSelected] = useState<string[]>(["Instagram", "LinkedIn"]);

  const togglePlatform = (name: string) => {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((p) => p !== name) : [...prev, name]
    );
  };

  const activePlatforms = platforms.filter((p) => selected.includes(p.name));

  return (
    <article>
      <section className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Social Media Content Planner
            </h1>
            <SectionDesc>
              Select your platforms and get a customized posting schedule with content types, frequencies, best times, and tips for each.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 pb-8">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="text-base font-bold text-black mb-4">Select your platforms</h2>
            <div className="flex flex-wrap gap-2">
              {platforms.map((p) => (
                <button
                  key={p.name}
                  onClick={() => togglePlatform(p.name)}
                  className={`px-5 py-3 text-base font-bold transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                    selected.includes(p.name)
                      ? "bg-black text-white"
                      : "border border-gray-200 text-gray-600 hover:border-black"
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 pb-20">
        <div className="max-w-4xl mx-auto space-y-10">
          {activePlatforms.map((platform) => (
            <Animate key={platform.name} animation="fade-up">
              <div className="border border-gray-200 overflow-hidden">
                <div className="bg-black text-white p-4">
                  <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold">{platform.name}</h2>
                </div>
                <div className="divide-y divide-gray-100">
                  {platform.types.map((t) => (
                    <div key={t.format} className="p-5 grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-base font-bold text-black">{t.format}</p>
                      </div>
                      <div>
                        <p className="text-base text-gray-400 mb-1">Frequency</p>
                        <p className="text-base text-black font-bold">{t.freq}</p>
                      </div>
                      <div>
                        <p className="text-base text-gray-400 mb-1">Best Times</p>
                        <p className="text-base text-black">{t.best}</p>
                      </div>
                      <div>
                        <p className="text-base text-gray-400 mb-1">Tips</p>
                        <p className="text-base text-gray-500 leading-relaxed">{t.tips}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Animate>
          ))}

          {activePlatforms.length === 0 && (
            <div className="text-center py-12 text-base text-gray-400">Select at least one platform to see your content plan.</div>
          )}

          {activePlatforms.length > 0 && (
            <Animate animation="fade-up">
              <div className="p-6 bg-gray-50 border border-gray-200">
                <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black mb-3">
                  Weekly Content Summary
                </h3>
                <p className="text-base text-gray-500 leading-relaxed mb-4">
                  Based on your selected platforms, here is your minimum weekly output:
                </p>
                <ul className="space-y-2 text-base text-gray-600">
                  {activePlatforms.map((p) => (
                    <li key={p.name}>
                      <strong>{p.name}:</strong> {p.types.map((t) => `${t.format} (${t.freq})`).join(", ")}
                    </li>
                  ))}
                </ul>
              </div>
            </Animate>
          )}
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Need Help Managing Your Social Media?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Our social media team handles strategy, content creation, scheduling, community management, and analytics.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
              Get Social Media Help &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    </article>
  );
}
