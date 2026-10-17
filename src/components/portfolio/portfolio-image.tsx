import { getMedia, mediaUrl, mediaVariant, srcSet } from "@/lib/portfolio";

/** Responsive image from the canonical media record. Intrinsic width/height prevent layout shift. */
export function PortfolioImage({
  id,
  sizes,
  priority = false,
  className = "",
  fit = "cover",
}: {
  id: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  fit?: "cover" | "contain";
}) {
  const m = getMedia(id);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={mediaUrl(id, mediaVariant(id, 960))}
      srcSet={srcSet(id)}
      sizes={sizes}
      width={m.w}
      height={m.h}
      alt={m.a}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      style={{ backgroundColor: m.bg }}
      className={`${fit === "cover" ? "object-cover" : "object-contain"} ${className}`}
    />
  );
}
