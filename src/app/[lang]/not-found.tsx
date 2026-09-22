import Link from "next/link";

export default function NotFound() {
  return (
    <section className="px-6 lg:px-12 py-32 text-center">
      <div className="max-w-2xl mx-auto">
        <div className="font-[family-name:var(--font-display)] text-[clamp(6rem,15vw,10rem)] font-extrabold text-black/10 leading-none mb-6">404</div>
        <h1 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,4vw,2.5rem)] font-extrabold text-black mb-4">
          Page Not Found
        </h1>
        <p className="text-lg text-gray-500 mb-10">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let us help you find what you need.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/en" className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 font-bold text-base hover:bg-gray-800 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
            Go Home &rarr;
          </Link>
          <Link href="/en/services" className="inline-flex items-center gap-3 border-2 border-black text-black px-10 py-5 font-bold text-base hover:bg-black hover:text-white transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
            View Services
          </Link>
        </div>
        <div className="mt-16 flex flex-wrap justify-center gap-6 text-base">
          <Link href="/en/blog" className="text-gray-500 hover:text-black transition-colors motion-reduce:transition-none underline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Blog</Link>
          <Link href="/en/contact" className="text-gray-500 hover:text-black transition-colors motion-reduce:transition-none underline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Contact Us</Link>
          <Link href="/en/about" className="text-gray-500 hover:text-black transition-colors motion-reduce:transition-none underline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">About Us</Link>
          <Link href="/en/resources" className="text-gray-500 hover:text-black transition-colors motion-reduce:transition-none underline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Resources</Link>
        </div>
      </div>
    </section>
  );
}
