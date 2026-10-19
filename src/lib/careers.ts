/** Shared by the careers form, its API and the dashboard CV bank. */
export const CAREER_ROLES = [
  "Performance Marketing",
  "SEO & Content",
  "Development",
  "Creative & Design",
  "Strategy & Analytics",
  "Internship",
  "Other / not sure",
] as const;

export const CAREER_STATUSES = ["new", "reviewed", "shortlisted", "rejected"] as const;
export type CareerStatus = (typeof CAREER_STATUSES)[number];

export const CV_MAX_BYTES = 5 * 1024 * 1024;
export const CV_EXTENSIONS = ["pdf", "doc", "docx"] as const;
export const CV_ACCEPT = ".pdf,.doc,.docx";

export function cvExtension(filename: string): string {
  const match = /\.([a-z0-9]+)$/i.exec(filename.trim());
  return match ? match[1].toLowerCase() : "";
}

/** File names are stored for display and download only; strip anything that is not plain text. */
export function safeFilename(filename: string): string {
  const base = filename.split(/[\\/]/).pop() || "cv";
  const cleaned = base.replace(/[^\w.\- ()]/g, "_").replace(/\s+/g, " ").trim().slice(0, 120);
  return cleaned || "cv";
}

export const CV_MIME: Record<string, string> = {
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

/** The extension must agree with the file's real signature (not just the name the browser sent). */
export function cvSignatureMatches(ext: string, bytes: Uint8Array): boolean {
  const startsWith = (sig: number[]) => sig.every((value, i) => bytes[i] === value);
  if (ext === "pdf") return startsWith([0x25, 0x50, 0x44, 0x46, 0x2d]); // %PDF-
  if (ext === "docx") return startsWith([0x50, 0x4b, 0x03, 0x04]); // zip container
  if (ext === "doc") return startsWith([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]); // OLE2
  return false;
}
