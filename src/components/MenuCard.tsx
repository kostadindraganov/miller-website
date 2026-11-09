import Image from "next/image";
import type { MenuCategory } from "@/lib/sheets";

export default function MenuCard({ title, picture, unit, items }: MenuCategory) {
  return (
    <article id={`category-${picture.replace(/\.[^.]+$/, "")}`} className="menu-card group relative flex h-full w-full flex-col overflow-hidden rounded-2xl bg-[url('/assets/img/stone.webp')] bg-cover bg-center shadow-lg ring-1 ring-black/10">
      {/* header image with title scrim */}
      <div className="relative h-28 overflow-hidden sm:h-44">
        <Image
          src={`/assets/img/${picture}`}
          alt={title}
          width={1080}
          height={566}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 26rem"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
        <h3 className="absolute inset-x-0 bottom-0 p-5 font-caveat text-[2.375rem] font-bold sm:text-[2.75rem] leading-none text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
          {title}
        </h3>
        {/* accent line */}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-flame via-amber to-flame" />
      </div>

      <ul className="flex-1 px-5 py-2 sm:px-6 sm:py-3">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-start justify-between gap-3 border-b border-white/15 py-4 last:border-b-0"
          >
            <p className="min-w-0 break-words pt-0.5 font-caveat text-[1.625rem] font-medium leading-[1.2] text-cream">{item.name}</p>
            {/* Weight sits under the price so the name keeps most of the row. */}
            <div className="flex shrink-0 flex-col-reverse items-end">
              {item.quantity && (
                <span className="mt-1 font-menu text-[15px] leading-snug text-cream-2">
                  {item.quantity} {unit}
                </span>
              )}
              <span className="whitespace-nowrap font-menu text-xl font-bold leading-snug tabular-nums text-amber-300">
                {item.price}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}
