import { site } from "@/lib/site";

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24 11.36 11.36 0 0 0 3.57.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.57 1 1 0 0 1-.24 1.02l-2.21 2.2z" />
    </svg>
  );
}

/**
 * Call-to-action in a retro sign-painter style: cream enamel with an ink
 * outline and a hard orange offset shadow that presses in on click. The idle
 * sheen drifts across and rests, as before.
 */
export default function CallButton({
  label = "Обади се",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <a
      href={site.phoneHref}
      aria-label={`${label} — ${site.phoneDisplay}`}
      className={`btn-retro btn-retro-cream group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full py-1 pl-1 pr-5 text-sm font-bold uppercase tracking-[0.14em] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-char ${className}`}
    >
      {/* light, slow sheen */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(110deg, transparent 35%, rgba(240,108,12,0.22) 50%, transparent 65%)",
          backgroundSize: "220% 100%",
          animation: "btn-sheen 5s ease-in-out infinite",
        }}
      />
      <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-char bg-gradient-to-b from-flame to-brand text-cream transition-transform duration-300 group-hover:rotate-[-12deg]">
        <PhoneIcon className="h-3.5 w-3.5" />
      </span>
      <span className="relative z-10">{label}</span>
    </a>
  );
}
