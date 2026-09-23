"use client";

import { useState } from "react";

interface YouTubeEmbedProps {
  videoId: string;
  title: string;
  aspect?: "landscape" | "portrait";
  className?: string;
}

export function YouTubeEmbed({ videoId, title, aspect = "landscape", className = "" }: YouTubeEmbedProps) {
  const [loaded, setLoaded] = useState(false);
  const aspectClass = aspect === "portrait" ? "aspect-[9/16] max-h-[500px]" : "aspect-video";
  const thumbUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

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
          <img
            src={thumbUrl}
            alt={`Video thumbnail: ${title}`}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
          <div className="absolute inset-0 flex items-center justify-center">
            <svg width="68" height="48" viewBox="0 0 68 48" className="opacity-90 group-hover:opacity-100 transition-opacity" aria-hidden="true">
              <path d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55C3.97 2.33 2.27 4.81 1.48 7.74.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z" fill="red" />
              <path d="M45 24L27 14v20" fill="white" />
            </svg>
          </div>
          <span className="absolute bottom-3 left-3 text-white text-base font-medium drop-shadow-lg line-clamp-2">
            {title}
          </span>
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
