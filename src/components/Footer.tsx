import Image from "next/image";
import CallButton from "./CallButton";
import { site, mapEmbed, mapsHref } from "@/lib/site";
import logo from "../../public/assets/img/logo.webp";

const PinIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 21s7-6.4 7-11a7 7 0 1 0-14 0c0 4.6 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.4" />
  </svg>
);
const PhoneIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24 11.36 11.36 0 0 0 3.57.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.57 1 1 0 0 1-.24 1.02l-2.21 2.2z" />
  </svg>
);
const ClockIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);
const NavIcon = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M21.7 11.3 12.7 2.3a1 1 0 0 0-1.4 0l-9 9a1 1 0 0 0 0 1.4l9 9a1 1 0 0 0 1.4 0l9-9a1 1 0 0 0 0-1.4ZM13 14.5V12h-2v2H9.5v-3.2a1 1 0 0 1 1-1H13V7.5l3.2 2.7L13 12.9v1.6Z" />
  </svg>
);

/** Cream enamel sign card: ink outline, hard orange offset shadow. */
function InfoCard({
  icon,
  title,
  children,
  href,
  external,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  href?: string;
  external?: boolean;
}) {
  const inner = (
    <>
      <span className="grid size-10 shrink-0 place-items-center rounded-full border-2 border-char bg-gradient-to-b from-flame to-brand text-cream transition-transform duration-300 group-hover:rotate-[-10deg]">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-[11px] font-bold uppercase tracking-[0.24em] text-brand-700">{title}</span>
        <span className="mt-1 block text-[15px] font-bold leading-snug text-char">{children}</span>
      </span>
    </>
  );
  const cls = "retro-card group flex items-center gap-4 rounded-2xl px-4 py-3.5";
  return href ? (
    <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className={`${cls} retro-card-link`}>
      {inner}
    </a>
  ) : (
    <div className={cls}>{inner}</div>
  );
}

/**
 * Retro footer. The dark body rises out of the cream page as an arch with a
 * double orange/cream rule, the logo medallion seated on its crest (echoing
 * the menu button on the hero's arch). Inside: a painted heading, enamel sign
 * cards for the contact details, and the map in a matching frame.
 */
export default function Footer() {
  return (
    <footer id="contact" className="relative mt-16 overflow-x-clip bg-char-2 text-cream md:mt-24 lg:mt-28">
      {/* Arch rising into the body, with the medallion on its crest. */}
      <div aria-hidden="true" className="footer-arch absolute -inset-x-[12%] bottom-full h-10 bg-char-2 md:h-16 lg:h-20">
        <span className="logo-badge footer-medallion absolute left-1/2 top-0 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full md:size-24">
          <Image src={logo} alt="" sizes="96px" className="size-[88%]" />
        </span>
      </div>

      {/* Sunburst rays fanning down from the crest. */}
      <div aria-hidden="true" className="footer-rays pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-6xl px-5 pb-12 pt-12 sm:px-6 md:pt-10 lg:pb-16">
        {/* Heading */}
        <div className="text-center">
          <p className="flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.32em] text-amber">
            <span aria-hidden="true">★</span>
            Заповядайте
            <span aria-hidden="true">★</span>
          </p>
          <h2 className="mt-3 font-neue text-3xl font-bold leading-none sm:text-4xl lg:text-5xl">
            <span className="painted-caps painted-caps-light">Кулинарен Магазин</span>{" "}
            <span className="painted-script painted-script-light whitespace-nowrap font-lobster">{site.name}</span>
          </h2>
          <p className="footer-strap mx-auto mt-5 flex max-w-xl items-center justify-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-cream/60 sm:gap-4 sm:text-xs sm:tracking-[0.3em]">
            {/* Phrases wrap as whole units on phones; the side rules show from sm. */}
            <span className="text-center sm:shrink-0">
              <span className="whitespace-nowrap">Домашна кухня</span>{" "}
              <span aria-hidden="true" className="mx-1 text-flame">◆</span>{" "}
              <span className="whitespace-nowrap">{site.tagline}</span>{" "}
              <span aria-hidden="true" className="mx-1 text-flame">◆</span>{" "}
              <span className="whitespace-nowrap">{site.address.locality}</span>
            </span>
          </p>
        </div>

        <div className="mt-10 grid items-stretch gap-6 lg:mt-12 lg:grid-cols-[1fr_1.2fr] lg:gap-8">
          {/* Contact cards + call */}
          <div className="flex flex-col gap-4">
            <InfoCard icon={PinIcon} title="Адрес" href={mapsHref} external>
              {/* Non-breaking hyphen keeps the house number "49-51" on one line. */}
              гр. {site.address.locality}, {site.address.street.replace("-", "\u2011")}
            </InfoCard>
            <InfoCard icon={PhoneIcon} title="Телефон" href={site.phoneHref}>
              {site.phoneDisplay}
            </InfoCard>
            <InfoCard icon={ClockIcon} title="Работно време">
              {site.hours.label}
              <span className="mt-0.5 block text-xs font-medium text-char/55">{site.hours.closedLabel}</span>
            </InfoCard>

            <div className="mt-2 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <CallButton />
              <span className="font-lobster text-xl text-amber-300">Очакваме ви!</span>
              {site.facebook && (
                <a
                  href={site.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook страница"
                  className="btn-retro ml-auto flex h-11 w-11 items-center justify-center rounded-full text-white [--retro-shadow:var(--color-brand)]"
                  style={{ backgroundColor: "#1877F2" }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M14.6 8.6H16V6h-2c-1.8 0-3 1.3-3 3v2H9v2.6h2V21h2.6v-5.4H16l.5-2.6h-3V9.3c0-.5.3-.7.7-.7Z" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Map in an enamel frame */}
          <div className="retro-frame relative min-h-[320px] overflow-hidden rounded-2xl lg:min-h-full">
            <iframe
              title={`Карта — ${site.name}, ${site.address.street}, ${site.address.locality}`}
              src={mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0"
            />
            <a
              href={mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-retro btn-retro-cream absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em]"
            >
              {NavIcon} Маршрут
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative bg-char">
        <div className="footer-rule" aria-hidden="true" />
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-5 text-center text-xs text-cream/45 sm:flex-row sm:text-left">
          <span>© Кулинарен Магазин {site.name} · {site.address.locality}</span>
          <span className="uppercase tracking-[0.2em]">Всички права запазени</span>
        </div>
      </div>
    </footer>
  );
}
