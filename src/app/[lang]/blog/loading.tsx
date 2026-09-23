export default function BlogHubLoading() {
  return (
    <div className="animate-pulse" aria-label="Loading blog" role="status">
      <div className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="h-4 w-16 bg-gray-200 mb-4" />
          <div className="h-10 bg-gray-200 w-1/2 mb-4" />
          <div className="h-5 bg-gray-100 w-full mb-2" />
          <div className="h-5 bg-gray-100 w-2/3" />
        </div>
      </div>

      <div className="px-6 lg:px-12 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="h-12 bg-gray-100 w-full max-w-md mb-8" />
          <div className="flex gap-3 mb-8 flex-wrap">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-8 bg-gray-100 w-24" />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="border border-gray-200">
                <div className="aspect-[16/9] bg-gray-200" />
                <div className="p-5">
                  <div className="h-3 bg-gray-100 w-20 mb-3" />
                  <div className="h-5 bg-gray-200 w-full mb-2" />
                  <div className="h-5 bg-gray-200 w-3/4 mb-3" />
                  <div className="h-4 bg-gray-100 w-full mb-1" />
                  <div className="h-4 bg-gray-100 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <span className="sr-only">Loading blog...</span>
    </div>
  );
}
