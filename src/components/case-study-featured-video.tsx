import { Animate } from "@/components/animate";
import { JsonLd } from "@/components/json-ld";
import { YouTubeEmbed } from "@/components/youtube-embed";
import { videoObjectSchema, type FeaturedVideo } from "@/data/featured-videos";

/** Featured video right under the hero of a case-study page: a small heading, the click-to-load player, a one-line caption. */
export function CaseStudyFeaturedVideo({ video }: { video: FeaturedVideo }) {
  return (
    <section className="px-6 lg:px-12 pb-10" aria-labelledby="featured-video-heading">
      <JsonLd data={videoObjectSchema(video)} />
      <div className="max-w-3xl mx-auto text-center">
        <Animate animation="fade-up">
          <h2 id="featured-video-heading" className="font-[family-name:var(--font-display)] text-xl font-extrabold tracking-tight text-balance">{video.heading}</h2>
          <div className="mt-5">
            <YouTubeEmbed videoId={video.id} title={video.title} alt={video.title} aspect="short" poster={video.poster} noCookie />
          </div>
          <p className="mt-4 text-base text-gray-600 text-balance">{video.caption}</p>
        </Animate>
      </div>
    </section>
  );
}
