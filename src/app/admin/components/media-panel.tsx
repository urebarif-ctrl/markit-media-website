"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface MediaItem {
  id: number;
  filename: string;
  original_name: string;
  mime_type: string;
  size: number;
  alt_text: string;
  folder: string;
  url: string;
  created_at: string;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

export function MediaPanel({ token }: { token: string }) {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [folder, setFolder] = useState("");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const headers = {
    "Authorization": `Bearer ${token}`,
  };

  const jsonHeaders = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  };

  const fetchMedia = useCallback(() => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), limit: "30" });
    if (folder) params.set("folder", folder);

    fetch(`/api/admin/media?${params}`, { headers })
      .then((r) => r.json())
      .then((d) => {
        setMedia(d.media || []);
        setTotal(d.total || 0);
        setTotalPages(d.totalPages || 1);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [page, folder]);

  useEffect(() => { fetchMedia(); }, [fetchMedia]);

  async function handleUpload(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);

    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder || "general");
      formData.append("alt_text", file.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " "));

      try {
        await fetch("/api/admin/media", {
          method: "POST",
          headers: { "Authorization": `Bearer ${token}` },
          body: formData,
        });
      } catch {
        alert(`Failed to upload ${file.name}`);
      }
    }

    setUploading(false);
    fetchMedia();
    if (fileRef.current) fileRef.current.value = "";
  }

  async function deleteMedia(id: number) {
    if (!confirm("Delete this file?")) return;
    await fetch("/api/admin/media", {
      method: "DELETE",
      headers: jsonHeaders,
      body: JSON.stringify({ id }),
    });
    fetchMedia();
  }

  function copyUrl(url: string) {
    navigator.clipboard.writeText(url).catch(() => {});
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-xl font-extrabold text-black">Media Library ({total})</h2>
        <div className="flex gap-3 flex-wrap">
          <select
            value={folder}
            onChange={(e) => { setFolder(e.target.value); setPage(1); }}
            className="border border-gray-300 px-3 py-2 text-sm bg-white"
          >
            <option value="">All Folders</option>
            <option value="general">General</option>
            <option value="blog">Blog</option>
            <option value="services">Services</option>
            <option value="branding">Branding</option>
          </select>
          <label className="bg-black text-white px-4 py-2 text-sm font-bold hover:bg-gray-800 cursor-pointer">
            {uploading ? "Uploading..." : "+ Upload"}
            <input
              ref={fileRef}
              type="file"
              multiple
              accept="image/*,video/*,.pdf"
              onChange={(e) => handleUpload(e.target.files)}
              className="hidden"
              disabled={uploading}
            />
          </label>
        </div>
      </div>

      {loading ? (
        <div className="text-base text-gray-500 py-12 text-center">Loading media...</div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {media.map((item) => (
              <div key={item.id} className="bg-white border border-gray-200 overflow-hidden group">
                <div className="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
                  {item.mime_type.startsWith("image/") ? (
                    <img src={item.url} alt={item.alt_text} className="w-full h-full object-cover" loading="lazy" />
                  ) : item.mime_type.startsWith("video/") ? (
                    <div className="text-3xl text-gray-400">&#9654;</div>
                  ) : (
                    <div className="text-3xl text-gray-400">&#128196;</div>
                  )}
                </div>
                <div className="p-2">
                  <p className="text-xs text-gray-700 truncate font-medium">{item.original_name}</p>
                  <p className="text-xs text-gray-400">{formatSize(item.size)}</p>
                  <div className="flex gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => copyUrl(item.url)}
                      className="text-xs text-blue-600 hover:underline"
                    >
                      Copy URL
                    </button>
                    <button
                      onClick={() => deleteMedia(item.id)}
                      className="text-xs text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {media.length === 0 && (
              <div className="col-span-full py-12 text-center text-gray-400">No media files found</div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 text-sm border border-gray-200 disabled:opacity-30 hover:bg-gray-50"
              >
                Previous
              </button>
              <span className="text-sm text-gray-500">Page {page} of {totalPages}</span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 text-sm border border-gray-200 disabled:opacity-30 hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
