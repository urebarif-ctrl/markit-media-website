export default function Loading() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center" aria-label="Loading content" role="status">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-gray-200 border-t-black rounded-full animate-spin" />
        <p className="text-base text-gray-400">Loading...</p>
      </div>
    </div>
  );
}
