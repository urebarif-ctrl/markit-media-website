import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, thumb, poster, video, fmtDate } from "@/lib/preview-work";
import { DISPLAY, L, PAD, Pill, PreviewBar, SectionHead } from "@/components/preview-work/preview-parts";
import { EventInquiryForm } from "@/components/preview-work/event-inquiry-form";
import { previewMeta } from "@/components/preview-work/preview-meta";

export const metadata = previewMeta("Event partners");

export default async function EventPartners({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (lang !== "en") notFound();
  const yb = getProject("yaar-bazaar");
  const v = yb?.videos[0];
  const stories = yb?.stories ?? [];
  const others = ["css-brainery", "aspiring-futures-gala"].map(getProject).filter(Boolean);
  return (
    <article>
      <PreviewBar label="Event partners" />
      <section className={`${PAD} pt-24 pb-12 bg-black text-white`} aria-label="Event partners">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.1fr_.9fr] gap-10 items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">Event partners</p>
            <h1 className={`${DISPLAY} text-[clamp(2rem,5vw,3.5rem)] font-extrabold tracking-tight leading-[1.1] mt-4`}>Creative and digital partner for events</h1>
            <p className="text-lg text-gray-400 mt-5 max-w-xl">Behind every event is a lot of creative work. We have supported events as a media and creative partner, building the visual buzz before and during the day.</p>
            <div className="flex flex-wrap gap-3 mt-7">
              <a href="#inquiry" className="bg-white text-black px-6 py-3 font-bold hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">Start an event collaboration inquiry ↓</a>
              <Link href={L("/preview-work/yaar-bazaar")} className="border border-white/30 px-6 py-3 font-bold hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">Yaar Bazaar project page →</Link>
            </div>
          </div>
          {v && (
            <div className="max-w-xs mx-auto w-full bg-black border border-white/10">
              <video controls preload="none" playsInline poster={poster(v.id)} className="w-full aspect-[9/16] object-contain" aria-label="Yaar Bazaar event reel">
                <source src={video(v.id)} type="video/mp4" />
              </video>
            </div>
          )}
        </div>
      </section>

      <section className={`${PAD} py-14`} aria-labelledby="feature">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1fr] gap-10">
          <div>
            <div className="flex flex-wrap gap-2 mb-3"><Pill tone="violet">Event collaboration</Pill><Pill tone="green">Named in our own post</Pill></div>
            <h2 id="feature" className={`${DISPLAY} text-3xl font-extrabold tracking-tight`}>Featured: Yaar Bazaar</h2>
            <div className="mt-4 space-y-3 text-gray-700 leading-relaxed">
              {yb?.paras.map((t, i) => (<p key={i}>{t}</p>))}
            </div>
            {yb && <ul className="flex flex-wrap gap-2 mt-5 list-none p-0" aria-label="Work for Yaar Bazaar">{yb.scope.map((s) => (<li key={s} className="border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700">{s}</li>))}</ul>}
            <p className="text-sm text-gray-600 mt-5">We worked with the @yaaarbazaar team as Media Partner. This page presents an event collaboration, not a paid-client engagement, and makes no claims about attendance or results.</p>
          </div>
          <ul className="grid grid-cols-3 gap-2 list-none p-0 content-start" aria-label="Yaar Bazaar stories">
            {stories.slice(0, 3).map((s) => (
              <li key={s.id} className="bg-gray-100 border border-gray-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/preview-media/s/${s.id}.webp`} loading="lazy" alt={`Yaar Bazaar Instagram story, ${fmtDate(s.date)}`} className="w-full h-auto block" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {others.length > 0 && (
        <section className={`${PAD} py-10 bg-gray-50`} aria-labelledby="more">
          <div className="max-w-7xl mx-auto">
            <SectionHead id="more" title="Other event-related projects" note="Shown as projects, with only what our archive documents." />
            <ul className="grid sm:grid-cols-2 gap-4 list-none p-0">
              {others.map((p) => p && (
                <li key={p.slug} className="border border-gray-200 bg-white p-4">
                  <Link href={L(`/preview-work/${p.slug}`)} className="font-bold underline underline-offset-4 hover:text-[#5A3ED6]">{p.name}</Link>
                  <p className="text-sm text-gray-600 mt-1">{p.paras[0]}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section id="inquiry" className={`${PAD} py-16 scroll-mt-24`} aria-labelledby="inq-h">
        <div className="max-w-3xl mx-auto">
          <h2 id="inq-h" className={`${DISPLAY} text-3xl font-extrabold tracking-tight`}>Event collaboration inquiry</h2>
          <p className="text-gray-600 mt-2 mb-8">Planning an event and looking for a creative or media partner? Tell us about it. We read every inquiry and reply by email.</p>
          <EventInquiryForm />
        </div>
      </section>
    </article>
  );
}
