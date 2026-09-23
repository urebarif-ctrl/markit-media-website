export default function ResourcesLoading() {
  return (
    <div className="animate-pulse" aria-label="Loading resources" role="status">
      <div className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="h-4 w-20 bg-gray-200 mb-4" />
          <div className="h-10 bg-gray-200 w-3/4 mb-4" />
          <div className="h-5 bg-gray-100 w-full mb-2" />
          <div className="h-5 bg-gray-100 w-2/3" />
        </div>
      </div>

      <div className="px-6 lg:px-12 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border border-gray-200 p-6">
              <div className="h-6 bg-gray-200 w-1/2 mb-3" />
              <div className="h-4 bg-gray-100 w-full mb-2" />
              <div className="h-4 bg-gray-100 w-3/4 mb-4" />
              <div className="h-4 bg-gray-100 w-1/3" />
            </div>
          ))}
        </div>
      </div>
      <span className="sr-only">Loading resources...</span>
    </div>
  );
}
