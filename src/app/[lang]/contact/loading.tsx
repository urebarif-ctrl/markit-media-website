export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" role="status">
        <span className="sr-only">Loading…</span>
      </div>
    </div>
  );
}
