"use client";

import { useState } from "react";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";

interface SizeSpec {
  name: string;
  width: number;
  height: number;
  notes: string;
}

const platformSizes: Record<string, SizeSpec[]> = {
  "Facebook / Meta": [
    { name: "Profile Photo", width: 170, height: 170, notes: "Displays at 170x170 on desktop, 128x128 on mobile" },
    { name: "Cover Photo", width: 820, height: 312, notes: "Displays at 820x312 on desktop, 640x360 on mobile" },
    { name: "Feed Post (Square)", width: 1080, height: 1080, notes: "Recommended for highest engagement" },
    { name: "Feed Post (Landscape)", width: 1200, height: 630, notes: "Standard link preview size" },
    { name: "Story / Reel", width: 1080, height: 1920, notes: "9:16 vertical format, full-screen" },
    { name: "Ad (Single Image)", width: 1200, height: 628, notes: "Recommended for feed ads" },
    { name: "Carousel Ad", width: 1080, height: 1080, notes: "Square format per card" },
    { name: "Event Cover", width: 1920, height: 1005, notes: "Appears on event page header" },
  ],
  Instagram: [
    { name: "Profile Photo", width: 320, height: 320, notes: "Circular crop, upload at 320x320 minimum" },
    { name: "Feed Post (Square)", width: 1080, height: 1080, notes: "Most common format" },
    { name: "Feed Post (Portrait)", width: 1080, height: 1350, notes: "4:5 ratio, takes more feed space" },
    { name: "Feed Post (Landscape)", width: 1080, height: 566, notes: "1.91:1 ratio" },
    { name: "Story / Reel", width: 1080, height: 1920, notes: "9:16 vertical, full-screen" },
    { name: "Carousel Post", width: 1080, height: 1080, notes: "Square format per slide" },
    { name: "IGTV Cover", width: 420, height: 654, notes: "Appears in IGTV grid" },
  ],
  "LinkedIn": [
    { name: "Profile Photo", width: 400, height: 400, notes: "Square, minimum 200x200" },
    { name: "Cover Photo", width: 1584, height: 396, notes: "Personal profile banner" },
    { name: "Company Logo", width: 300, height: 300, notes: "Square, appears in search and feed" },
    { name: "Company Cover", width: 1128, height: 191, notes: "Company page banner" },
    { name: "Feed Post", width: 1200, height: 627, notes: "1.91:1 ratio recommended" },
    { name: "Article Cover", width: 1200, height: 644, notes: "LinkedIn article header" },
  ],
  "X (Twitter)": [
    { name: "Profile Photo", width: 400, height: 400, notes: "Circular crop, upload square" },
    { name: "Header Photo", width: 1500, height: 500, notes: "Profile banner" },
    { name: "In-Feed Image", width: 1200, height: 675, notes: "16:9 ratio recommended" },
    { name: "Card Image", width: 800, height: 418, notes: "Summary card with large image" },
  ],
  YouTube: [
    { name: "Channel Art", width: 2560, height: 1440, notes: "Safe area: 1546x423 center" },
    { name: "Profile Photo", width: 800, height: 800, notes: "Circular crop" },
    { name: "Thumbnail", width: 1280, height: 720, notes: "16:9, under 2MB, JPG/PNG/GIF" },
    { name: "Video Upload", width: 1920, height: 1080, notes: "1080p standard, 4K is 3840x2160" },
  ],
  "Google Ads": [
    { name: "Responsive Display (Landscape)", width: 1200, height: 628, notes: "1.91:1 ratio, required" },
    { name: "Responsive Display (Square)", width: 1200, height: 1200, notes: "Required for responsive display" },
    { name: "Responsive Display (Logo)", width: 1200, height: 1200, notes: "Square logo, required" },
    { name: "Banner (Leaderboard)", width: 728, height: 90, notes: "Common desktop ad format" },
    { name: "Banner (Medium Rectangle)", width: 300, height: 250, notes: "Most popular ad size" },
    { name: "Banner (Skyscraper)", width: 160, height: 600, notes: "Sidebar ad format" },
    { name: "Banner (Large Rectangle)", width: 336, height: 280, notes: "High-performance format" },
  ],
  "Website / SEO": [
    { name: "Open Graph Image", width: 1200, height: 630, notes: "og:image for social sharing" },
    { name: "Twitter Card", width: 1200, height: 675, notes: "twitter:image for X sharing" },
    { name: "Favicon", width: 32, height: 32, notes: "ICO or PNG, also serve 16x16" },
    { name: "Apple Touch Icon", width: 180, height: 180, notes: "iOS home screen icon" },
    { name: "Hero Image (Full-width)", width: 1920, height: 1080, notes: "Above-the-fold desktop hero" },
    { name: "Blog Post Cover", width: 1200, height: 600, notes: "2:1 ratio, good for all platforms" },
  ],
};

const platforms = Object.keys(platformSizes);

export default function ImageSizeGuidePage() {
  const [activePlatform, setActivePlatform] = useState(platforms[0]);
  const sizes = platformSizes[activePlatform] || [];

  return (
    <article>
      <section className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Reference</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Social Media Image Size Guide
            </h1>
            <SectionDesc>
              The complete reference for image dimensions across every major platform. Updated for 2026.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 pb-4">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <div className="flex flex-wrap gap-2">
              {platforms.map((p) => (
                <button
                  key={p}
                  onClick={() => setActivePlatform(p)}
                  className={`px-4 py-2 text-base font-bold transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                    activePlatform === p
                      ? "bg-black text-white"
                      : "border border-gray-200 text-gray-600 hover:border-black"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-8">
        <div className="max-w-4xl mx-auto">
          <Stagger stagger={40} animation="fade-up" className="space-y-4">
            {sizes.map((size) => (
              <div key={size.name} className="border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <h2 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black">{size.name}</h2>
                    <p className="text-base text-gray-400 mt-1">{size.notes}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="bg-black text-white px-4 py-2 text-base font-bold tabular-nums">
                      {size.width} x {size.height}
                    </span>
                    <span className="text-base text-gray-400">px</span>
                  </div>
                </div>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">
              Image Optimization Tips
            </h2>
            <div className="space-y-4 text-base text-gray-500 leading-relaxed">
              <div className="border-l-4 border-black pl-4">
                <p className="font-bold text-black">Use the right format</p>
                <p>JPEG for photos, PNG for graphics with transparency, WebP for the best compression. SVG for logos and icons.</p>
              </div>
              <div className="border-l-4 border-black pl-4">
                <p className="font-bold text-black">Compress before uploading</p>
                <p>Run images through a compression tool. Most images can be reduced 50-80% without visible quality loss.</p>
              </div>
              <div className="border-l-4 border-black pl-4">
                <p className="font-bold text-black">Create at 2x for retina</p>
                <p>For website images, create at double the display size for sharp rendering on high-DPI screens.</p>
              </div>
              <div className="border-l-4 border-black pl-4">
                <p className="font-bold text-black">Keep text within safe zones</p>
                <p>Platform crops vary by device. Keep important text and elements away from the edges, especially for cover photos.</p>
              </div>
            </div>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Need Professional Creative Production?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Our creative team produces platform-optimized images, graphics, and video for all your marketing channels.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
              Get Creative Help &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    </article>
  );
}
