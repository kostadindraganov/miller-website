import { Suspense } from "react";
import Hero from "@/components/Hero";
import LunchMenu, { LunchMenuSkeleton } from "@/components/LunchMenu";
import Reveal from "@/components/Reveal";

export default function Home() {
  return (
    <>
      <Hero />

      <section id="menu" className="relative mx-auto max-w-7xl px-4 pb-14 pt-9 text-center sm:pb-20 sm:pt-11">
        {/* Guide line from the "Виж менюто" button down to the heading. */}
        <div aria-hidden="true" className="menu-guide mx-auto h-12 sm:h-16" />

        {/* Heading lockup after the logo: chef-hat emblem, bold title, and the
            weekday below it like "— МАГАЗИН —". */}
        <Reveal>
          <div aria-hidden="true" className="menu-emblem mx-auto grid size-14 place-items-center rounded-full text-brand sm:size-16">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z" />
              <path d="M6 17h12" />
            </svg>
          </div>
          <h2 className="mt-5 font-neue text-4xl font-bold leading-none sm:text-5xl md:text-6xl">
            <span className="painted-caps">Менюто</span>{" "}
            <span className="painted-script font-lobster">за днес</span>
          </h2>
        </Reveal>

        {/* Read from Google Sheets per request; the shell above prerenders. */}
        <Suspense fallback={<LunchMenuSkeleton />}>
          <LunchMenu />
        </Suspense>
      </section>
    </>
  );
}
