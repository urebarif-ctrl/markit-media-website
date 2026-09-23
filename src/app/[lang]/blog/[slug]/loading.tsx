export default function BlogArticleLoading() {
  return (
    <div className="animate-pulse" aria-label="Loading article" role="status">
      <div className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <div className="flex gap-3 mb-4">
            <div className="h-5 w-24 bg-gray-200" />
            <div className="h-5 w-20 bg-gray-100" />
            <div className="h-5 w-28 bg-gray-100" />
          </div>
          <div className="h-10 bg-gray-200 w-full mb-3" />
          <div className="h-10 bg-gray-200 w-3/4 mb-6" />
          <div className="h-5 bg-gray-100 w-full mb-2" />
          <div className="h-5 bg-gray-100 w-5/6" />
        </div>
      </div>
      <div className="px-6 lg:px-12 pb-12">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="h-4 bg-gray-100 w-full" />
          <div className="h-4 bg-gray-100 w-full" />
          <div className="h-4 bg-gray-100 w-5/6" />
          <div className="h-4 bg-gray-100 w-full" />
          <div className="h-4 bg-gray-100 w-4/5" />
          <div className="h-7 bg-gray-200 w-2/3 mt-8" />
          <div className="h-4 bg-gray-100 w-full" />
          <div className="h-4 bg-gray-100 w-full" />
          <div className="h-4 bg-gray-100 w-3/4" />
        </div>
      </div>
      <span className="sr-only">Loading article...</span>
    </div>
  );
}
