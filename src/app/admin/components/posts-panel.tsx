"use client";

import { useState, useEffect, useCallback } from "react";
import { Image as ImageIcon, X } from "lucide-react";

interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image: string;
  category: string;
  tags: string;
  author: string;
  status: string;
  meta_title: string;
  meta_description: string;
  og_image: string;
  reading_time: number;
  published_at: string | null;
  scheduled_at?: string | null;
  created_at: string;
  updated_at: string;
}

interface MediaAsset { id: string; url: string; alt: string; folder: string; filename: string; createdAt: string; }

const emptyPost: Omit<Post, "id" | "created_at" | "updated_at"> = {
  slug: "",
  title: "",
  excerpt: "",
  content: "",
  cover_image: "",
  category: "",
  tags: "[]",
  author: "Markit Media",
  status: "draft",
  meta_title: "",
  meta_description: "",
  og_image: "",
  reading_time: 5,
  published_at: null,
};

function MediaPicker({ onSelect, onClose, headers }: { onSelect: (url: string) => void; onClose: () => void; headers: Record<string, string> }) {
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [folder, setFolder] = useState("blog");
  const [mediaSearch, setMediaSearch] = useState("");
  const [mediaLoading, setMediaLoading] = useState(true);
  useEffect(() => {
    setMediaLoading(true);
    const p = new URLSearchParams({ folder });
    if (mediaSearch) p.set("search", mediaSearch);
    fetch(`/api/admin/media?${p}`, { headers }).then(r => r.json()).then(d => { setAssets(d.assets || []); setMediaLoading(false); }).catch(() => setMediaLoading(false));
  }, [folder, mediaSearch]);
  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b">
          <h3 className="text-lg font-extrabold">Select from Media Library</h3>
          <button onClick={onClose}><X size={20} /></button>
        </div>
        <div className="flex gap-3 p-4 border-b">
          <input value={mediaSearch} onChange={e => setMediaSearch(e.target.value)} placeholder="Search media..." className="flex-1 border px-3 py-2 text-sm rounded-lg" />
          <select value={folder} onChange={e => setFolder(e.target.value)} className="border px-3 py-2 text-sm rounded-lg bg-white">
            {["general", "blog", "services", "case-studies", "portfolio", "branding"].map(f => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {mediaLoading ? <p className="text-center text-gray-400 py-12">Loading media...</p> :
            assets.length ? <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {assets.map(a => (
                <button key={a.id} onClick={() => { onSelect(a.url); onClose(); }} className="group border rounded-lg overflow-hidden hover:border-black transition-colors">
                  <div className="aspect-square bg-gray-100 relative">
                    {a.url.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i) ?
                      <img src={a.url} alt={a.alt || a.filename} className="w-full h-full object-cover" /> :
                      <div className="w-full h-full flex items-center justify-center text-gray-400"><ImageIcon size={24} /></div>}
                  </div>
                  <div className="p-2 text-xs text-gray-600 truncate">{a.filename || a.alt || "Media"}</div>
                </button>
              ))}
            </div> : <p className="text-center text-gray-400 py-12">No media found in this folder.</p>}
        </div>
      </div>
    </div>
  );
}

export function PostsPanel({ headers }: { headers: Record<string, string> }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<(Post & { isNew?: boolean }) | null>(null);
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [mediaPicker, setMediaPicker] = useState<{ field: string } | null>(null);

  const fetchPosts = useCallback(() => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), limit: "20" });
    if (statusFilter) params.set("status", statusFilter);
    if (categoryFilter) params.set("category", categoryFilter);
    if (search) params.set("search", search);

    fetch(`/api/admin/posts?${params}`, { headers })
      .then((r) => r.json())
      .then((d) => {
        setPosts(d.posts || []);
        setTotal(d.total || 0);
        setTotalPages(d.totalPages || 1);
        if (d.posts) {
          const cats = [...new Set(d.posts.map((p: Post) => p.category).filter(Boolean))] as string[];
          setCategories((prev) => [...new Set([...prev, ...cats])].sort());
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [page, statusFilter, categoryFilter, search]);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  function generateSlug(title: string) {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  async function savePost() {
    if (!editing) return;
    setSaving(true);

    const method = editing.isNew ? "POST" : "PUT";
    const { isNew: _, ...editData } = editing as Post & { isNew?: boolean };
    const body = editing.isNew
      ? { ...editData, tags: JSON.parse(editData.tags || "[]") }
      : { ...editData, tags: JSON.parse(editData.tags || "[]") };

    try {
      const res = await fetch("/api/admin/posts", {
        method,
        headers,
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Failed to save");
        setSaving(false);
        return;
      }
      setEditing(null);
      fetchPosts();
    } catch {
      alert("Network error");
    }
    setSaving(false);
  }

  async function deletePost(id: number) {
    if (!confirm("Delete this post?")) return;
    await fetch("/api/admin/posts", {
      method: "DELETE",
      headers,
      body: JSON.stringify({ id }),
    });
    fetchPosts();
  }

  if (editing) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-black">{editing.isNew ? "New Post" : "Edit Post"}</h2>
          <button onClick={() => setEditing(null)} className="text-sm text-gray-500 hover:text-black">Cancel</button>
        </div>
        <div className="bg-white border border-gray-200 p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-black uppercase tracking-wide mb-2">Title *</label>
              <input
                type="text"
                value={editing.title}
                onChange={(e) => {
                  const title = e.target.value;
                  setEditing((p) => p ? { ...p, title, slug: p.isNew ? generateSlug(title) : p.slug } : null);
                }}
                className="w-full border border-gray-300 px-4 py-3 text-base focus-visible:border-black focus-visible:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-black uppercase tracking-wide mb-2">Slug *</label>
              <input
                type="text"
                value={editing.slug}
                onChange={(e) => setEditing((p) => p ? { ...p, slug: e.target.value } : null)}
                className="w-full border border-gray-300 px-4 py-3 text-base focus-visible:border-black focus-visible:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-black uppercase tracking-wide mb-2">Excerpt</label>
            <textarea
              value={editing.excerpt}
              onChange={(e) => setEditing((p) => p ? { ...p, excerpt: e.target.value } : null)}
              rows={2}
              className="w-full border border-gray-300 px-4 py-3 text-base focus-visible:border-black focus-visible:outline-none resize-y"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-bold text-black uppercase tracking-wide">Content (HTML)</label>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-400">
                  {editing.content.replace(/<[^>]*>/g, "").split(/\s+/).filter(Boolean).length} words
                </span>
                <button
                  type="button"
                  onClick={() => setShowPreview(!showPreview)}
                  className="text-sm font-bold text-black hover:underline"
                >
                  {showPreview ? "Edit" : "Preview"}
                </button>
              </div>
            </div>
            {!showPreview ? (
              <>
                <div className="flex flex-wrap gap-1 mb-2 border border-gray-200 bg-gray-50 p-1">
                  {[
                    { label: "H2", tag: "<h2>", end: "</h2>" },
                    { label: "H3", tag: "<h3>", end: "</h3>" },
                    { label: "B", tag: "<strong>", end: "</strong>" },
                    { label: "I", tag: "<em>", end: "</em>" },
                    { label: "UL", tag: "<ul>\n<li>", end: "</li>\n</ul>" },
                    { label: "OL", tag: "<ol>\n<li>", end: "</li>\n</ol>" },
                    { label: "Link", tag: '<a href="">', end: "</a>" },
                    { label: "P", tag: "<p>", end: "</p>" },
                    { label: "Blockquote", tag: "<blockquote>", end: "</blockquote>" },
                  ].map((btn) => (
                    <button
                      key={btn.label}
                      type="button"
                      onClick={() => {
                        setEditing((p) => p ? { ...p, content: p.content + btn.tag + btn.end } : null);
                      }}
                      className="px-3 py-1.5 text-sm font-bold text-gray-600 hover:bg-black hover:text-white transition-colors"
                    >
                      {btn.label}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setMediaPicker({ field: "content" })}
                    className="px-3 py-1.5 text-sm font-bold text-gray-600 hover:bg-black hover:text-white transition-colors flex items-center gap-1"
                  >
                    <ImageIcon size={14} /> Img
                  </button>
                </div>
                <textarea
                  value={editing.content}
                  onChange={(e) => setEditing((p) => p ? { ...p, content: e.target.value } : null)}
                  rows={18}
                  className="w-full border border-gray-300 px-4 py-3 text-base font-mono focus-visible:border-black focus-visible:outline-none resize-y"
                />
              </>
            ) : (
              <div
                className="w-full border border-gray-300 px-6 py-4 text-base leading-relaxed prose max-w-none min-h-[300px] bg-white overflow-y-auto"
                dangerouslySetInnerHTML={{ __html: editing.content }}
              />
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-bold text-black uppercase tracking-wide mb-2">Category</label>
              <input
                type="text"
                list="category-options"
                value={editing.category}
                onChange={(e) => setEditing((p) => p ? { ...p, category: e.target.value } : null)}
                className="w-full border border-gray-300 px-4 py-3 text-base focus-visible:border-black focus-visible:outline-none"
                placeholder="e.g. SEO, Marketing"
              />
              <datalist id="category-options">
                {categories.map((c) => <option key={c} value={c} />)}
              </datalist>
            </div>
            <div>
              <label className="block text-sm font-bold text-black uppercase tracking-wide mb-2">Author</label>
              <input
                type="text"
                value={editing.author}
                onChange={(e) => setEditing((p) => p ? { ...p, author: e.target.value } : null)}
                className="w-full border border-gray-300 px-4 py-3 text-base focus-visible:border-black focus-visible:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-black uppercase tracking-wide mb-2">Reading Time (min)</label>
              <input
                type="number"
                value={editing.reading_time}
                onChange={(e) => setEditing((p) => p ? { ...p, reading_time: Number(e.target.value) } : null)}
                className="w-full border border-gray-300 px-4 py-3 text-base focus-visible:border-black focus-visible:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-black uppercase tracking-wide mb-2">Cover Image URL</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={editing.cover_image}
                  onChange={(e) => setEditing((p) => p ? { ...p, cover_image: e.target.value } : null)}
                  className="flex-1 border border-gray-300 px-4 py-3 text-base focus-visible:border-black focus-visible:outline-none"
                  placeholder="/uploads/blog/image.jpg"
                />
                <button type="button" onClick={() => setMediaPicker({ field: "cover_image" })} className="border border-gray-300 px-3 py-2 hover:bg-gray-50 flex items-center gap-1 text-sm font-bold shrink-0"><ImageIcon size={16} /> Browse</button>
              </div>
              {editing.cover_image && <img src={editing.cover_image} alt="Cover preview" className="mt-2 h-24 w-auto object-cover border border-gray-200" />}
            </div>
            <div>
              <label className="block text-sm font-bold text-black uppercase tracking-wide mb-2">Status</label>
              <select
                value={editing.status}
                onChange={(e) => setEditing((p) => p ? { ...p, status: e.target.value } : null)}
                className="w-full border border-gray-300 px-4 py-3 text-base bg-white focus-visible:border-black focus-visible:outline-none"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="scheduled">Scheduled</option>
              </select>
              {editing.status === "scheduled" && (
                <div className="mt-2">
                  <label className="block text-xs font-bold text-gray-500 mb-1">Publish at</label>
                  <input
                    type="datetime-local"
                    value={editing.scheduled_at ? new Date(editing.scheduled_at).toISOString().slice(0, 16) : ""}
                    onChange={(e) => setEditing((p) => p ? { ...p, scheduled_at: e.target.value } : null)}
                    className="w-full border border-gray-300 px-4 py-2 text-sm focus-visible:border-black focus-visible:outline-none"
                  />
                </div>
              )}
            </div>
          </div>

          {/* SEO fields */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-base font-bold text-black mb-4">SEO Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-1">Meta Title</label>
                <input
                  type="text"
                  value={editing.meta_title}
                  onChange={(e) => setEditing((p) => p ? { ...p, meta_title: e.target.value } : null)}
                  className="w-full border border-gray-300 px-4 py-2 text-sm focus-visible:border-black focus-visible:outline-none"
                  placeholder="Leave empty to use post title"
                />
                <span className="text-xs text-gray-400 mt-1 block">{editing.meta_title.length}/60</span>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-1">Meta Description</label>
                <textarea
                  value={editing.meta_description}
                  onChange={(e) => setEditing((p) => p ? { ...p, meta_description: e.target.value } : null)}
                  rows={2}
                  className="w-full border border-gray-300 px-4 py-2 text-sm focus-visible:border-black focus-visible:outline-none resize-y"
                  placeholder="Leave empty to use post excerpt"
                />
                <span className="text-xs text-gray-400 mt-1 block">{editing.meta_description.length}/160</span>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-1">OG Image URL</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editing.og_image}
                    onChange={(e) => setEditing((p) => p ? { ...p, og_image: e.target.value } : null)}
                    className="flex-1 border border-gray-300 px-4 py-2 text-sm focus-visible:border-black focus-visible:outline-none"
                    placeholder="/uploads/blog/og-image.jpg"
                  />
                  <button type="button" onClick={() => setMediaPicker({ field: "og_image" })} className="border border-gray-300 px-3 py-2 hover:bg-gray-50 flex items-center gap-1 text-sm font-bold shrink-0"><ImageIcon size={14} /> Browse</button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={savePost}
              disabled={saving || !editing.title || !editing.slug}
              className="bg-black text-white px-8 py-3 font-bold text-base hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              {saving ? "Saving..." : editing.isNew ? "Create Post" : "Update Post"}
            </button>
            <button onClick={() => setEditing(null)} className="border border-gray-200 px-8 py-3 text-base text-gray-500 hover:text-black">
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-xl font-extrabold text-black">Blog Posts ({total})</h2>
        <div className="flex gap-3 flex-wrap">
          <input
            type="search"
            placeholder="Search..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="border border-gray-300 px-3 py-2 text-sm w-48"
          />
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            className="border border-gray-300 px-3 py-2 text-sm bg-white"
          >
            <option value="">All Status</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
          <select
            value={categoryFilter}
            onChange={(e) => { setCategoryFilter(e.target.value); setPage(1); }}
            className="border border-gray-300 px-3 py-2 text-sm bg-white"
          >
            <option value="">All Categories</option>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <button
            onClick={() => setEditing({ ...emptyPost, isNew: true } as Post & { isNew: boolean })}
            className="bg-black text-white px-4 py-2 text-sm font-bold hover:bg-gray-800"
          >
            + New Post
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-base text-gray-500 py-12 text-center">Loading posts...</div>
      ) : (
        <>
          <div className="bg-white border border-gray-200 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4 font-bold text-black">Title</th>
                  <th className="text-left py-3 px-4 font-bold text-black hidden md:table-cell">Category</th>
                  <th className="text-left py-3 px-4 font-bold text-black">Status</th>
                  <th className="text-left py-3 px-4 font-bold text-black hidden lg:table-cell">Published</th>
                  <th className="text-left py-3 px-4 font-bold text-black">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-700">{post.title}</div>
                      <div className="text-xs text-gray-400 mt-0.5">/{post.slug}</div>
                    </td>
                    <td className="py-3 px-4 text-gray-500 hidden md:table-cell">{post.category || "—"}</td>
                    <td className="py-3 px-4">
                      <span className={`text-xs font-bold px-2 py-1 uppercase ${
                        post.status === "published" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"
                      }`}>{post.status}</span>
                    </td>
                    <td className="py-3 px-4 text-gray-500 hidden lg:table-cell">
                      {post.published_at ? new Date(post.published_at).toLocaleDateString() : "—"}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-3">
                        <button onClick={() => setEditing(post)} className="text-sm font-bold text-black hover:underline">Edit</button>
                        <button onClick={() => setEditing({ ...post, id: 0, slug: post.slug + "-copy", title: post.title + " (Copy)", isNew: true } as Post & { isNew: boolean })} className="text-sm font-bold text-gray-500 hover:underline">Duplicate</button>
                        <button onClick={() => deletePost(post.id)} className="text-sm font-bold text-red-600 hover:underline">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
                {posts.length === 0 && (
                  <tr><td colSpan={5} className="py-12 text-center text-gray-400">No posts found</td></tr>
                )}
              </tbody>
            </table>
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
      {mediaPicker && (
        <MediaPicker
          headers={headers}
          onClose={() => setMediaPicker(null)}
          onSelect={(url) => {
            if (mediaPicker.field === "cover_image") {
              setEditing((p) => p ? { ...p, cover_image: url } : null);
            } else if (mediaPicker.field === "og_image") {
              setEditing((p) => p ? { ...p, og_image: url } : null);
            } else if (mediaPicker.field === "content") {
              setEditing((p) => p ? { ...p, content: p.content + `<img src="${url}" alt="" />` } : null);
            }
            setMediaPicker(null);
          }}
        />
      )}
    </div>
  );
}
