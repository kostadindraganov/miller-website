import CallButton from "./CallButton";
import { site, mapEmbed, mapsHref } from "@/lib/site";

const PinIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 21s7-6.4 7-11a7 7 0 1 0-14 0c0 4.6 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.4" />
  </svg>
);
const PhoneIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24 11.36 11.36 0 0 0 3.57.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.57 1 1 0 0 1-.24 1.02l-2.21 2.2z" />
  </svg>
);
const ClockIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);
const NavIcon = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M21.7 11.3 12.7 2.3a1 1 0 0 0-1.4 0l-9 9a1 1 0 0 0 0 1.4l9 9a1 1 0 0 0 1.4 0l9-9a1 1 0 0 0 0-1.4ZM13 14.5V12h-2v2H9.5v-3.2a1 1 0 0 1 1-1H13V7.5l3.2 2.7L13 12.9v1.6Z" />
  </svg>
);

function ContactTile({
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
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-flame to-brand text-white shadow-lg shadow-brand/30 transition-transform duration-300 group-hover:scale-105">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-[11px] font-bold uppercase tracking-[0.22em] text-amber">{title}</span>
        <span className="mt-1 block text-sm leading-snug text-cream/85">{children}</span>
      </span>
    </>
  );
  const cls =
    "group flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber/40 hover:bg-white/[0.07]";
  return href ? (
    <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className={cls}>
      {inner}
    </a>
  ) : (
    <div className={cls}>{inner}</div>
  );
}

export default function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden bg-gradient-to-b from-char-2 to-char text-cream">
      {/* top ember accent */}
      <div className="h-1 w-full bg-gradient-to-r from-brand-700 via-flame to-brand-700" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-brand/15 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-amber/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-5 py-12 sm:px-6 sm:py-16">
        {/* heading */}
        <div className="mb-8 max-w-lg">
          <p className="text-xs font-bold uppercase tracking-[0.32em] text-amber">Заповядайте</p>
          <h2 className="mt-2 font-neue text-xl font-bold uppercase leading-tight tracking-tight sm:text-2xl lg:text-3xl">
            Кулинарен Магазин <span className="text-fire">{site.name}</span>
          </h2>
        </div>

        <div className="grid items-stretch gap-5 lg:grid-cols-[1.15fr_1fr]">
          {/* ─── LEFT: interactive map (kept) ─── */}
          <div className="relative min-h-[340px] overflow-hidden rounded-3xl ring-1 ring-white/10 shadow-2xl shadow-black/50 lg:min-h-full">
            <iframe
              title={`Карта — ${site.name}, ${site.address.street}, ${site.address.locality}`}
              src={mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0"
            />
            {/* directions button */}
            <a
              href={mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-retro btn-retro-cream absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em]"
            >
              {NavIcon} Маршрут
            </a>
          </div>

          {/* ─── RIGHT: contact tiles ─── */}
          <div className="flex flex-col gap-3">
            <ContactTile icon={PinIcon} title="Адрес" href={mapsHref} external>
              гр. {site.address.locality}, {site.address.street}
            </ContactTile>
            <ContactTile icon={PhoneIcon} title="Телефон" href={site.phoneHref}>
              {site.phoneDisplay}
            </ContactTile>
            <ContactTile icon={ClockIcon} title="Работно време">
              {site.hours.label}
              <span className="mt-0.5 block text-xs text-cream/50">{site.hours.closedLabel}</span>
            </ContactTile>

            {/* CTA row */}
            <div className="mt-1 flex flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <CallButton />
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
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-5 text-center text-xs text-cream/45">
          © Кулинарен Магазин {site.name} · {site.address.locality} · Всички права запазени
        </div>
      </div>
    </footer>
  );
}
