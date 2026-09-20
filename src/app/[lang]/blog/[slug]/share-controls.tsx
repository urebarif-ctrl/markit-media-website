"use client";

import { useState } from "react";

export function ShareControls({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  function copyLink() {
    navigator.clipboard.writeText(window.location.href).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function shareTwitter() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(title);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, "_blank", "noopener");
  }

  function shareLinkedIn() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank", "noopener");
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-bold text-black uppercase tracking-wide">Share:</span>
      <button onClick={shareTwitter} className="text-sm text-gray-500 hover:text-black transition-colors px-2 py-1" aria-label="Share on Twitter">
        Twitter
      </button>
      <button onClick={shareLinkedIn} className="text-sm text-gray-500 hover:text-black transition-colors px-2 py-1" aria-label="Share on LinkedIn">
        LinkedIn
      </button>
      <button onClick={copyLink} className="text-sm text-gray-500 hover:text-black transition-colors px-2 py-1">
        {copied ? "Copied!" : "Copy Link"}
      </button>
    </div>
  );
}
