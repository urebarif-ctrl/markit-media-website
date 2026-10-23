"use client";

import { useState } from "react";
import posters from "@/data/video-posters.json";

const POSTER_BASE = "https://media.themarkitmedia.com/portfolio/v1/posters";
const POSTER_IDS = new Set<string>(posters);

interface YouTubeEmbedProps {
  videoId: string;
  title: string;
  /**
   * "portrait" is a 9:16 box capped at 500px tall. "short" is a full-height 9:16 card for a YouTube Short: at most 380px
   * wide (the full column width on a phone), rounded corners, a centred play button and no title overlay.
   */
  aspect?: "landscape" | "portrait" | "short";
  className?: string;
  /** Alt text of the thumbnail. Default: "Video thumbnail: {title}". */
  alt?: string;
  /** Load the player from youtube-nocookie.com: YouTube sets no cookies until the visitor presses play. */
  noCookie?: boolean;
  /** Thumbnail to show instead of the default. If it fails to load, the usual YouTube thumbnail is used. */
  poster?: string;
}

export function YouTubeEmbed({ videoId, title, aspect = "landscape", className = "", alt, noCookie = false, poster }: YouTubeEmbedProps) {
  const [loaded, setLoaded] = useState(false);
  const [posterFailed, setPosterFailed] = useState(false);
  const isShort = aspect === "short";
  const vertical = aspect !== "landscape";
  // The keyboard focus ring is drawn by the box itself, outside it: the button's own outline sits under its absolutely
  // positioned thumbnail, so it would never be visible.
  const focusRing = "has-[:focus-visible]:outline-4 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[#5A3ED6]";
  const aspectClass =
    aspect === "portrait"
      ? "aspect-[9/16] max-h-[500px]"
      : isShort
        ? "aspect-[9/16] w-full max-w-[380px] rounded-2xl isolate"
        : "aspect-video";
  // Curated poster (best frame, baked-in bars removed, matching the box shape); YouTube's own frame is the fallback.
  const custom = Boolean(poster) && !posterFailed;
  // YouTube answers a missing thumbnail with HTTP 404 and a 120x90 grey placeholder: that fires `load`, not `error`.
  const checkPoster = (img: HTMLImageElement) => {
    if (custom && img.complete && img.naturalWidth > 0 && img.naturalWidth <= 120) setPosterFailed(true);
  };
  const curated = !custom && POSTER_IDS.has(videoId) && !posterFailed;
  const thumbUrl = custom
    ? (poster as string)
    : curated
      ? `${POSTER_BASE}/${videoId}-${vertical ? "9x16" : "16x9"}.webp`
      : `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  const thumbWidth = custom ? 1080 : curated ? (vertical ? 720 : 1280) : 480;
  const thumbHeight = custom ? 1920 : curated ? (vertical ? 1280 : 720) : 360;

  return (
    <div className={`relative ${aspectClass} ${focusRing} bg-black overflow-hidden group mx-auto ${className}`}>
      {loaded ? (
        <iframe
          src={`https://${noCookie ? "www.youtube-nocookie.com" : "www.youtube.com"}/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <button
          onClick={() => setLoaded(true)}
          className="absolute inset-0 w-full h-full cursor-pointer focus-visible:outline-none"
          aria-label={`Play video: ${title}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={(img) => {
              if (img) checkPoster(img);
            }}
            onLoad={(e) => checkPoster(e.currentTarget)}
            src={thumbUrl}
            alt={alt ?? `Video thumbnail: ${title}`}
            width={thumbWidth}
            height={thumbHeight}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            onError={() => setPosterFailed(true)}
          />
          {isShort ? (
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-[92px] w-[92px] items-center justify-center rounded-full bg-white shadow-lg transition-transform group-hover:scale-110 motion-reduce:transition-none">
                <svg viewBox="0 0 24 24" className="ml-1 h-11 w-11" aria-hidden="true">
                  <path d="M8 5v14l11-7z" fill="#000" />
                </svg>
              </span>
            </span>
          ) : (
            <>
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/75 to-transparent pointer-events-none" />
              <span className="absolute bottom-3 left-3 right-16 text-white text-sm sm:text-base font-medium text-left drop-shadow-lg line-clamp-2">
                {title}
              </span>
              <svg width="44" height="31" viewBox="0 0 68 48" className="absolute bottom-3 right-3 opacity-90 group-hover:opacity-100 group-hover:scale-110 transition motion-reduce:transition-none" aria-hidden="true">
                <path d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55C3.97 2.33 2.27 4.81 1.48 7.74.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z" fill="red" />
                <path d="M45 24L27 14v20" fill="white" />
              </svg>
            </>
          )}
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
