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

  function shareFacebook() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank", "noopener");
  }

  function shareWhatsApp() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`${title} ${window.location.href}`);
    window.open(`https://wa.me/?text=${text}`, "_blank", "noopener");
  }

  function sharePinterest() {
    const url = encodeURIComponent(window.location.href);
    const desc = encodeURIComponent(title);
    window.open(`https://pinterest.com/pin/create/button/?url=${url}&description=${desc}`, "_blank", "noopener");
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-base font-bold text-black uppercase tracking-wide mr-1">Share:</span>
      <button onClick={shareTwitter} className="text-base text-gray-500 hover:text-black transition-colors motion-reduce:transition-none px-3 py-2 min-h-[44px] min-w-[44px] focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2" aria-label="Share on X (Twitter)">
        X
      </button>
      <button onClick={shareLinkedIn} className="text-base text-gray-500 hover:text-black transition-colors motion-reduce:transition-none px-3 py-2 min-h-[44px] min-w-[44px] focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2" aria-label="Share on LinkedIn">
        LinkedIn
      </button>
      <button onClick={shareFacebook} className="text-base text-gray-500 hover:text-black transition-colors motion-reduce:transition-none px-3 py-2 min-h-[44px] min-w-[44px] focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2" aria-label="Share on Facebook">
        Facebook
      </button>
      <button onClick={shareWhatsApp} className="text-base text-gray-500 hover:text-black transition-colors motion-reduce:transition-none px-3 py-2 min-h-[44px] min-w-[44px] focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2" aria-label="Share on WhatsApp">
        WhatsApp
      </button>
      <button onClick={sharePinterest} className="text-base text-gray-500 hover:text-black transition-colors motion-reduce:transition-none px-3 py-2 min-h-[44px] min-w-[44px] focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2" aria-label="Share on Pinterest">
        Pinterest
      </button>
      <button onClick={copyLink} className="text-base text-gray-500 hover:text-black transition-colors motion-reduce:transition-none px-3 py-2 min-h-[44px] min-w-[44px] focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
        {copied ? "Copied!" : "Copy Link"}
      </button>
    </div>
  );
}
