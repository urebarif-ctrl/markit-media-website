export default function IndustriesLoading() {
  return (
    <div className="animate-pulse" aria-label="Loading industries" role="status">
      <div className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="h-4 w-20 bg-gray-200 mb-4" />
          <div className="h-10 bg-gray-200 w-3/4 mb-4" />
          <div className="h-5 bg-gray-100 w-full mb-2" />
          <div className="h-5 bg-gray-100 w-2/3" />
        </div>
      </div>

      <div className="px-6 lg:px-12 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="border border-gray-200 overflow-hidden">
              <div className="aspect-[16/9] bg-gray-200" />
              <div className="p-6">
                <div className="h-5 bg-gray-200 w-1/3 mb-3" />
                <div className="h-4 bg-gray-100 w-full mb-2" />
                <div className="h-4 bg-gray-100 w-4/5" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <span className="sr-only">Loading industries...</span>
    </div>
  );
}
