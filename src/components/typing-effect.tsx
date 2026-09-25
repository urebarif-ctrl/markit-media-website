"use client";

import { useState, useEffect, useRef } from "react";

interface TypingEffectProps {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
}

export function TypingEffect({
  phrases,
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseDuration = 2000,
  className = "",
}: TypingEffectProps) {
  const firstPhrase = phrases[0] ?? "";
  const [text, setText] = useState(firstPhrase);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const rootRef = useRef<HTMLSpanElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const updateFromDocument = () => {
      if (document.visibilityState !== "visible") setIsActive(false);
    };

    const observer = "IntersectionObserver" in window
      ? new IntersectionObserver(([entry]) => {
          setIsActive(entry.isIntersecting && document.visibilityState === "visible");
        }, { rootMargin: "120px" })
      : null;

    observer?.observe(root);
    document.addEventListener("visibilitychange", updateFromDocument);

    const onVisible = () => {
      if (document.visibilityState === "visible") {
        const rect = root.getBoundingClientRect();
        setIsActive(rect.bottom >= -120 && rect.top <= window.innerHeight + 120);
      }
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      observer?.disconnect();
      document.removeEventListener("visibilitychange", updateFromDocument);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  useEffect(() => {
    if (!isActive || phrases.length === 0) return;

    const current = phrases[phraseIndex] ?? "";

    if (!isDeleting && text === current) {
      timeoutRef.current = setTimeout(() => setIsDeleting(true), pauseDuration);
      return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
    }

    if (isDeleting && text === "") {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
      return;
    }

    const speed = isDeleting ? deletingSpeed : typingSpeed;
    timeoutRef.current = setTimeout(() => {
      setText(isDeleting ? current.slice(0, Math.max(0, text.length - 1)) : current.slice(0, text.length + 1));
    }, speed);

    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [text, isDeleting, phraseIndex, phrases, typingSpeed, deletingSpeed, pauseDuration, isActive]);

  return (
    <span ref={rootRef} className={className}>
      {text}
      <span className="animate-pulse" aria-hidden="true">|</span>
    </span>
  );
}
