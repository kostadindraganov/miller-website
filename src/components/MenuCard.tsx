import Image from "next/image";
import type { MenuCategory } from "@/lib/sheets";

export default function MenuCard({ title, picture, unit, items }: MenuCategory) {
  return (
    <article id={`category-${picture.replace(/\.[^.]+$/, "")}`} className="menu-card group relative flex h-full w-full flex-col overflow-hidden rounded-2xl bg-[url('/assets/img/stone.webp')] bg-cover bg-center shadow-lg ring-1 ring-black/10">
      <div className="relative h-52 shrink-0 overflow-hidden sm:h-60">
        <Image
          src={`/assets/img/${picture}`}
          alt={title}
          width={1080}
          height={566}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 26rem"
          className="h-full w-full -translate-y-2 scale-[1.08] object-cover object-center transition-transform duration-500 group-hover:scale-[1.1]"
        />
      </div>
      <h3 className="menu-card-title-band relative z-10 flex min-h-14 shrink-0 items-center justify-center px-4 py-2 text-center menu-card-title-text font-caveat text-[2.625rem] font-bold leading-none text-char sm:min-h-15 sm:text-[2.75rem]">
        {title}
      </h3>

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
