import type { ImageLoaderProps } from "next/image";

export default function cloudflareLoader({ src, width, quality }: ImageLoaderProps): string {
  if (src.startsWith("data:") || src.startsWith("blob:")) return src;
  const q = quality || 75;
  const params = `width=${width},quality=${q},format=auto`;
  if (src.startsWith("http")) return `/cdn-cgi/image/${params}/${src}`;
  return `/cdn-cgi/image/${params}${src}`;
}
