import Image from "next/image";
import { site } from "@/lib/site";
import heroImg from "../../public/assets/img/hero.webp";

/**
 * Full-bleed hero photo. The photo already carries the shop sign, so the shop
 * front (sign to doorstep, roughly x 12–86%, y 12–80% of the image) must stay
 * whole and centred on every screen, with nothing on top of it:
 * - below md the photo is framed 4:3, trimming only the side streets, so the
 *   shop fills the width and the bottom fifth is free for the arch and button;
 * - from md the full frame is shown. From 2xl it is capped at 88svh, but never
 *   below 36vw + 210px: that floor keeps the sign clear of the header and the
 *   doorstep clear of the arch, with the crop split ~44/56 top/bottom;
 * - below lg the photo starts under the fixed header, and a blurred copy of it
 *   fills that strip so the glass header has something soft behind it;
 * - the bottom edge melts through a progressive blur into a gently arched cream
 *   body, with the menu button riding the crest of the arch.
 */
export default function Hero() {
  return (
    <section id="top" className="relative isolate z-10 overflow-x-clip bg-char pt-16 sm:pt-[4.5rem] lg:pt-0">
      <h1 className="sr-only">
        Кулинарен Магазин {site.name} — {site.tagline.toLowerCase()}, {site.address.locality}
      </h1>

      {/* Same image (same srcset, so cached) blurred behind the header strip. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
        <Image
          src={heroImg}
          alt=""
          fill
          sizes="100vw"
          className="scale-110 object-cover object-top blur-2xl brightness-75"
        />
      </div>

      <div className="relative">
        <Image
          src={heroImg}
          alt={`Кулинарен Магазин ${site.name} — витрина с готвена храна за вкъщи`}
          preload
          placeholder="blur"
          sizes="100vw"
          className="block aspect-[4/3] h-auto w-full object-cover object-[49%_50%] md:aspect-auto 2xl:max-h-[max(88svh,calc(36vw_+_210px))] 2xl:object-[50%_44%]"
        />

        {/* Progressive blur + cream wash: the photo frosts over as it meets the body. */}
        <div aria-hidden="true" className="hero-frost pointer-events-none absolute inset-x-0 bottom-0 h-[20%] md:h-[22%] lg:h-[24%]" />

        {/* Arched cream body. Wider than the viewport so the curve stays gentle. */}
        <div
          aria-hidden="true"
          className="hero-arch absolute -inset-x-[12%] -bottom-0.5 h-6 bg-cream md:h-14 lg:h-20"
        />
      </div>

      <div className="rise d3 absolute inset-x-0 bottom-6 z-10 flex translate-y-1/2 justify-center md:bottom-14 lg:bottom-20">
        <a
          href="#menu"
          className="btn-retro btn-retro-ember group inline-flex items-center gap-2 rounded-full px-5 py-2 text-[13px] font-bold uppercase tracking-[0.14em] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-cream md:px-7 md:py-3 md:text-base"
        >
          Виж менюто
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-y-0.5" aria-hidden="true">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </a>
      </div>
    </section>
  );
}
