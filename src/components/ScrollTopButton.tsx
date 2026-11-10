"use client";

import { useEffect, useRef, useState } from "react";

export default function ScrollTopButton() {
  const [visible, setVisible] = useState(false);
  const pageEnd = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const marker = pageEnd.current;
    if (!marker) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "0px 0px 80px 0px" },
    );
    observer.observe(marker);
    return () => observer.disconnect();
  }, []);

  return (
    <>
    <span ref={pageEnd} aria-hidden="true" className="block h-px shrink-0" />
    {visible && (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" })}
      aria-label="Към началото"
      className="btn-retro btn-retro-ember fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
    )}
    </>
  );
}
