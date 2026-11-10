"use client";

import { useEffect, useRef, useState } from "react";

type CategoryLink = { title: string; href: string };

export default function MenuCategories({ categories }: { categories: CategoryLink[] }) {
  const marker = useRef<HTMLDivElement>(null);
  const nav = useRef<HTMLElement>(null);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const update = () => {
      if (!marker.current || !nav.current) return;
      const stickyTop = parseFloat(getComputedStyle(nav.current).top);
      setStuck(marker.current.getBoundingClientRect().bottom <= stickyTop);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <>
      <div ref={marker} aria-hidden="true" className="mt-6 h-px sm:mt-8" />
      <nav ref={nav} aria-label="Категории в днешното меню" className={`menu-categories${stuck ? " is-stuck" : ""}`}>
        {categories.map(({ title, href }) => (
          <a key={href} href={href}>{title}</a>
        ))}
      </nav>
    </>
  );
}
