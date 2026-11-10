"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import CallButton from "./CallButton";
import { site } from "@/lib/site";
import logo from "../../public/assets/img/logo.webp";

/**
 * Fixed site header. Over the hero it is a barely-there smoked-glass strip;
 * once the page scrolls it firms up so the logo and call button stay legible
 * over the cream body.
 */
export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header fixed inset-x-0 top-0 z-40 ${scrolled ? "is-scrolled" : ""}`}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:h-[4.5rem] lg:h-20">
        <a href="#top" aria-label={`Кулинарен Магазин ${site.name} — начало`} className="group flex min-w-0 items-center gap-2.5 sm:gap-3">
          {/* Cream disc keeps the logo's dark banner readable on the smoked glass. */}
          <span className="logo-badge grid size-11 shrink-0 place-items-center rounded-full transition-transform duration-300 group-hover:rotate-[-6deg] sm:size-12 lg:size-14">
            <Image src={logo} alt="" sizes="56px" preload className="size-[90%]" />
          </span>
          <span className="min-w-0 leading-none">
            <span className="block truncate text-[9px] font-bold uppercase tracking-[0.3em] text-amber-300 sm:text-[10px]">
              Кулинарен магазин
            </span>
            <span className="mt-0.5 block font-caveat text-2xl font-bold text-cream sm:text-[1.7rem]">{site.name}</span>
          </span>
        </a>

        {/* Icon-only on phones, where the wordmark needs the room. */}
        <CallButton label="Поръчай" className="shrink-0 max-sm:pr-1.5 max-sm:[&>span:last-child]:sr-only" />
      </div>
    </header>
  );
}
