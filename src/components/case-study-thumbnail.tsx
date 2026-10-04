import Image from "next/image";

export function CaseStudyThumbnail({ title, priority = false, className = "" }: { title: string; priority?: boolean; className?: string }) {
  const src = `/api/case-study-thumbnail?title=${encodeURIComponent(title)}`;
  return <Image src={src} alt={`${title} — Markit Media case study thumbnail`} width={1200} height={630} priority={priority} unoptimized className={`w-full h-full object-cover ${className}`} />;
}
