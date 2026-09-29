"use client";

import { useCallback, useEffect, useState } from "react";
import type { ChangeEvent } from "react";

type Item = {
  id: string;
  original_name: string;
  mime_type: string;
  size: number;
  alt_text: string;
  folder: string;
  url: string;
  created_at: string;
  storage?: string;
};

const folders = [
  "general",
  "blog",
  "services",
  "case-studies",
  "portfolio",
  "branding",
];

export function MediaPanel() {
  const [items, setItems] = useState<Item[]>([]);
  const [folder, setFolder] = useState("");
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);
  const [publicReady, setPublicReady] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  const [uploadFolder, setUploadFolder] = useState("general");
  const [uploadAlt, setUploadAlt] = useState("");

  const [form, setForm] = useState({
    url: "",
    original_name: "",
    mime_type: "image/jpeg",
    alt_text: "",
    folder: "general",
  });

  const json = { "Content-Type": "application/json" };

  const load = useCallback(async () => {
    setLoading(true);
    const query = new URLSearchParams({ limit: "100" });
    if (folder) query.set("folder", folder);

    const response = await fetch(`/api/admin/media?${query}`);
    const data = await response.json();

    setItems(data.media || []);
    setReady(Boolean(data.storageReady));
    setPublicReady(Boolean(data.publicUrlConfigured));
    setLoading(false);
  }, [folder]);

  useEffect(() => {
    load();
  }, [load]);

  function chooseFiles(event: ChangeEvent<HTMLInputElement>) {
    setUploadFiles(Array.from(event.target.files || []));
  }

  async function upload() {
    if (!uploadFiles.length) return;
    setUploading(true);

    try {
      for (const file of uploadFiles) {
        const presignResponse = await fetch("/api/admin/media", {
          method: "POST",
          headers: json,
          body: JSON.stringify({
            action: "presign",
            original_name: file.name,
            mime_type: file.type || "application/octet-stream",
            size: file.size,
            folder: uploadFolder,
          }),
        });

        const presign = await presignResponse.json();
        if (!presignResponse.ok) {
          throw new Error(presign.error || `Could not prepare ${file.name}`);
        }

        const putResponse = await fetch(presign.uploadUrl, {
          method: "PUT",
          headers: {
            "Content-Type": file.type || "application/octet-stream",
          },
          body: file,
        });

        if (!putResponse.ok) {
          throw new Error(
            `Upload failed for ${file.name}. Check the R2 CORS rule and try again.`,
          );
        }

        const completeResponse = await fetch("/api/admin/media", {
          method: "POST",
          headers: json,
          body: JSON.stringify({
            action: "complete",
            key: presign.key,
            original_name: file.name,
            filename: file.name,
            mime_type: file.type || "application/octet-stream",
            size: file.size,
            folder: uploadFolder,
            alt_text: uploadFiles.length === 1 ? uploadAlt : "",
          }),
        });

        const complete = await completeResponse.json();
        if (!completeResponse.ok) {
          throw new Error(
            complete.error || `Could not catalog ${file.name} after upload`,
          );
        }
      }

      setUploadFiles([]);
      setUploadAlt("");
      await load();
      alert("Upload complete.");
    } catch (error) {
      alert(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function add() {
    const response = await fetch("/api/admin/media", {
      method: "POST",
      headers: json,
      body: JSON.stringify(form),
    });
    const data = await response.json();

    if (!response.ok) {
      return alert(data.error || "Could not add media");
    }

    setForm({
      url: "",
      original_name: "",
      mime_type: "image/jpeg",
      alt_text: "",
      folder: "general",
    });
    setShowAdd(false);
    load();
  }

  async function del(id: string) {
    if (
      !confirm(
        "Delete this media item? R2 files will also be removed from Cloudflare.",
      )
    ) {
      return;
    }

    const response = await fetch("/api/admin/media", {
      method: "DELETE",
      headers: json,
      body: JSON.stringify({ id }),
    });
    const data = await response.json();

    if (!response.ok) {
      alert(data.error || "Could not delete media");
      return;
    }

    load();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-extrabold">
            Media Library ({items.length})
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Upload website images and files directly to Cloudflare R2.
          </p>
        </div>

        <div className="flex gap-2">
          <select
            value={folder}
            onChange={(event) => setFolder(event.target.value)}
            className="border bg-white px-3 py-2 text-sm"
          >
            <option value="">All folders</option>
            {folders.map((name) => (
              <option key={name}>{name}</option>
            ))}
          </select>

          <button
            onClick={() => setShowAdd(!showAdd)}
            className="border border-black bg-white px-4 py-2 text-sm font-bold text-black"
          >
            Add external URL
          </button>
        </div>
      </div>

      <div
        className={`border p-4 text-sm ${
          ready && publicReady
            ? "border-green-200 bg-green-50"
            : "border-amber-200 bg-amber-50"
        }`}
      >
        <b>Cloudflare R2:</b>{" "}
        {ready && publicReady
          ? "Connected and ready for direct uploads."
          : "Connection incomplete. Add the missing R2 environment variables in Vercel, redeploy, then refresh this page."}
      </div>

      {ready && publicReady && (
        <div className="border bg-white p-5">
          <div className="mb-4">
            <h3 className="font-extrabold">Upload to R2</h3>
            <p className="mt-1 text-sm text-gray-500">
              Files are stored in Cloudflare and served from
              media.themarkitmedia.com.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="md:col-span-2">
              <span className="mb-1 block text-sm font-bold">Choose files</span>
              <input
                type="file"
                multiple
                onChange={chooseFiles}
                className="w-full border px-3 py-3 text-sm"
              />
            </label>

            <label>
              <span className="mb-1 block text-sm font-bold">Folder</span>
              <select
                value={uploadFolder}
                onChange={(event) => setUploadFolder(event.target.value)}
                className="w-full border bg-white px-3 py-3 text-sm"
              >
                {folders.map((name) => (
                  <option key={name}>{name}</option>
                ))}
              </select>
            </label>

            <label>
              <span className="mb-1 block text-sm font-bold">
                Alt text {uploadFiles.length > 1 ? "(single-file uploads)" : ""}
              </span>
              <input
                value={uploadAlt}
                onChange={(event) => setUploadAlt(event.target.value)}
                placeholder="Describe the image for accessibility and SEO"
                className="w-full border px-3 py-3 text-sm"
              />
            </label>

            <div className="md:col-span-2 flex flex-wrap items-center gap-3">
              <button
                onClick={upload}
                disabled={!uploadFiles.length || uploading}
                className="bg-black px-5 py-3 text-sm font-bold text-white disabled:opacity-40"
              >
                {uploading
                  ? "Uploading…"
                  : `Upload${
                      uploadFiles.length
                        ? ` ${uploadFiles.length} file${
                            uploadFiles.length === 1 ? "" : "s"
                          }`
                        : ""
                    }`}
              </button>
              {uploadFiles.length > 0 && (
                <span className="text-xs text-gray-500">
                  {uploadFiles.map((file) => file.name).join(", ")}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {showAdd && (
        <div className="grid gap-4 border bg-white p-5 md:grid-cols-2">
          {(["url", "original_name", "alt_text"] as const).map((key) => (
            <input
              key={key}
              value={form[key]}
              onChange={(event) =>
                setForm({ ...form, [key]: event.target.value })
              }
              placeholder={
                key === "url"
                  ? "Asset URL"
                  : key === "original_name"
                    ? "File name"
                    : "Alt text"
              }
              className="border px-3 py-2"
            />
          ))}

          <select
            value={form.folder}
            onChange={(event) =>
              setForm({ ...form, folder: event.target.value })
            }
            className="border bg-white px-3 py-2"
          >
            {folders.map((name) => (
              <option key={name}>{name}</option>
            ))}
          </select>

          <button
            onClick={add}
            disabled={!form.url}
            className="bg-black px-4 py-2 font-bold text-white disabled:opacity-40"
          >
            Save external asset
          </button>
        </div>
      )}

      {loading ? (
        <div className="py-12 text-center text-gray-500">Loading media…</div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
          {items.map((item) => (
            <div key={item.id} className="overflow-hidden border bg-white">
              <div className="flex aspect-square items-center justify-center overflow-hidden bg-gray-100">
                {item.mime_type?.startsWith("image/") ? (
                  <img
                    src={item.url}
                    alt={item.alt_text || item.original_name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <span className="px-2 text-center text-xs text-gray-500">
                    {item.mime_type || "Asset"}
                  </span>
                )}
              </div>

              <div className="p-2">
                <p className="truncate text-xs font-medium">
                  {item.original_name}
                </p>
                <p className="text-xs text-gray-400">
                  {item.folder}
                  {item.storage === "r2" ? " · R2" : ""}
                </p>
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => navigator.clipboard.writeText(item.url)}
                    className="text-xs underline"
                  >
                    Copy URL
                  </button>
                  <button
                    onClick={() => del(item.id)}
                    className="text-xs text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}

          {!items.length && (
            <div className="col-span-full py-12 text-center text-gray-400">
              No media records yet
            </div>
          )}
        </div>
      )}
    </div>
  );
}
