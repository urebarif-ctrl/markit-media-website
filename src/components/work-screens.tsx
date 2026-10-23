export interface WorkScreen {
  /** Path under /public. */
  src: string;
  width: number;
  height: number;
  /** Describes what the picture shows (unique per picture, no "image 1" style text). */
  alt: string;
  caption: string;
  /** "phone" screens are shown in a narrower column next to each other. */
  device?: "desktop" | "phone";
}

/** Screenshots of a live client website, each with a caption. Used by website case studies. */
export function WorkScreens({ heading, intro, screens }: { heading: string; intro: string; screens: WorkScreen[] }) {
  const desktop = screens.filter((s) => (s.device ?? "desktop") === "desktop");
  const phones = screens.filter((s) => s.device === "phone");
  return (
    <section className="px-6 lg:px-12 py-12" aria-label={heading}>
      <div className="max-w-5xl mx-auto">
        <h2 className="font-[family-name:var(--font-display)] text-xl md:text-2xl font-extrabold text-black">{heading}</h2>
        <p className="text-lg text-gray-600 leading-relaxed mt-3 max-w-3xl">{intro}</p>
        <div className="grid gap-8 md:grid-cols-2 mt-8">
          {desktop.map((s) => (
            <figure key={s.src}>
              <div className="border border-gray-200 overflow-hidden bg-gray-50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.src} width={s.width} height={s.height} alt={s.alt} loading="lazy" decoding="async" className="w-full h-auto block" />
              </div>
              <figcaption className="text-base text-gray-600 mt-3 leading-relaxed">{s.caption}</figcaption>
            </figure>
          ))}
        </div>
        {phones.length > 0 && (
          <div className="grid grid-cols-2 gap-6 md:gap-8 mt-10 max-w-2xl mx-auto">
            {phones.map((s) => (
              <figure key={s.src}>
                <div className="border border-gray-200 overflow-hidden bg-gray-50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.src} width={s.width} height={s.height} alt={s.alt} loading="lazy" decoding="async" className="w-full h-auto block" />
                </div>
                <figcaption className="text-base text-gray-600 mt-3 leading-relaxed">{s.caption}</figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
