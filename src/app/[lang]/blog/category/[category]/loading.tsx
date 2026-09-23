export default function CategoryLoading() {
  return (
    <div className="animate-pulse" aria-label="Loading category" role="status">
      <div className="px-6 lg:px-12 pt-24 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="h-4 w-16 bg-gray-200 mb-3" />
          <div className="h-10 bg-gray-200 w-2/3 mb-4" />
          <div className="h-5 bg-gray-100 w-1/3" />
        </div>
      </div>
      <div className="px-6 lg:px-12 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-10 w-28 bg-gray-100" />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="border border-gray-200">
                <div className="aspect-[16/9] bg-gray-100" />
                <div className="p-6 space-y-3">
                  <div className="h-4 w-24 bg-gray-200" />
                  <div className="h-5 bg-gray-200 w-full" />
                  <div className="h-4 bg-gray-100 w-5/6" />
                  <div className="h-3 w-16 bg-gray-100 mt-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <span className="sr-only">Loading category...</span>
    </div>
  );
}
