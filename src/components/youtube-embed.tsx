"use client";

import { useState } from "react";
import posters from "@/data/video-posters.json";

const POSTER_BASE = "https://media.themarkitmedia.com/portfolio/v1/posters";
const POSTER_IDS = new Set<string>(posters);

interface YouTubeEmbedProps {
  videoId: string;
  title: string;
  aspect?: "landscape" | "portrait";
  className?: string;
}

export function YouTubeEmbed({ videoId, title, aspect = "landscape", className = "" }: YouTubeEmbedProps) {
  const [loaded, setLoaded] = useState(false);
  const [posterFailed, setPosterFailed] = useState(false);
  const aspectClass = aspect === "portrait" ? "aspect-[9/16] max-h-[500px]" : "aspect-video";
  // Curated poster (best frame, baked-in bars removed, matching the box shape); YouTube's own frame is the fallback.
  const curated = POSTER_IDS.has(videoId) && !posterFailed;
  const thumbUrl = curated
    ? `${POSTER_BASE}/${videoId}-${aspect === "portrait" ? "9x16" : "16x9"}.webp`
    : `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div className={`relative ${aspectClass} bg-black overflow-hidden group mx-auto ${className}`}>
      {loaded ? (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <button
          onClick={() => setLoaded(true)}
          className="absolute inset-0 w-full h-full cursor-pointer focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
          aria-label={`Play video: ${title}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumbUrl}
            alt={`Video thumbnail: ${title}`}
            width={curated ? (aspect === "portrait" ? 720 : 1280) : 480}
            height={curated ? (aspect === "portrait" ? 1280 : 720) : 360}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            onError={() => setPosterFailed(true)}
          />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/75 to-transparent pointer-events-none" />
          <span className="absolute bottom-3 left-3 right-16 text-white text-sm sm:text-base font-medium text-left drop-shadow-lg line-clamp-2">
            {title}
          </span>
          <svg width="44" height="31" viewBox="0 0 68 48" className="absolute bottom-3 right-3 opacity-90 group-hover:opacity-100 group-hover:scale-110 transition motion-reduce:transition-none" aria-hidden="true">
            <path d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55C3.97 2.33 2.27 4.81 1.48 7.74.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z" fill="red" />
            <path d="M45 24L27 14v20" fill="white" />
          </svg>
        </button>
      )}
    </div>
  );
}

interface YouTubePlaylistProps {
  playlistId: string;
  title: string;
  className?: string;
}

export function YouTubePlaylist({ playlistId, title, className = "" }: YouTubePlaylistProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative aspect-video bg-black overflow-hidden group ${className}`}>
      {loaded ? (
        <iframe
          src={`https://www.youtube.com/embed/videoseries?list=${playlistId}&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      ) : (
        <button
          onClick={() => setLoaded(true)}
          className="absolute inset-0 w-full h-full cursor-pointer bg-gray-900 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
          aria-label={`Play playlist: ${title}`}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <svg width="68" height="48" viewBox="0 0 68 48" className="opacity-90 group-hover:opacity-100 transition-opacity" aria-hidden="true">
              <path d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55C3.97 2.33 2.27 4.81 1.48 7.74.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z" fill="red" />
              <path d="M45 24L27 14v20" fill="white" />
            </svg>
            <span className="text-white text-lg font-bold">{title}</span>
          </div>
        </button>
      )}
    </div>
  );
}
