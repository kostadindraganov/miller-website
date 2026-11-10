import { Suspense } from "react";
import Hero from "@/components/Hero";
import LunchMenu, { LunchMenuSkeleton } from "@/components/LunchMenu";
import Reveal from "@/components/Reveal";

export default function Home() {
  return (
    <>
      <Hero />

      <section id="menu" className="relative mx-auto max-w-7xl px-4 pb-14 pt-6 text-center sm:pb-20 sm:pt-8">
        {/* Guide line from the "Виж менюто" button down to the heading. */}
        <div aria-hidden="true" className="mx-auto h-4 sm:h-6" />

        <Reveal>
          <h2 className="font-neue text-4xl font-bold leading-none sm:text-5xl md:text-6xl">
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
