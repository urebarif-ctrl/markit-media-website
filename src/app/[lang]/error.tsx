"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="px-6 lg:px-12 py-32 text-center">
      <div className="max-w-xl mx-auto">
        <div className="font-[family-name:var(--font-display)] text-8xl font-extrabold text-black/10 mb-6">500</div>
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black mb-4">
          Something Went Wrong
        </h1>
        <p className="text-base text-gray-500 mb-8">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 font-bold text-base hover:bg-gray-800 transition-colors"
        >
          Try Again
        </button>
      </div>
    </section>
  );
}
