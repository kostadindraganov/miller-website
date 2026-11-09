import Image from "next/image";
import type { MenuCategory } from "@/lib/sheets";

export default function MenuCard({ title, picture, unit, items }: MenuCategory) {
  return (
    <article className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl bg-[url('/assets/img/stone.webp')] bg-cover bg-center shadow-xl ring-1 ring-black/10 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:ring-2 hover:ring-amber/50">
      {/* header image with title scrim */}
      <div className="relative h-48 overflow-hidden sm:h-56">
        <Image
          src={`/assets/img/${picture}`}
          alt={title}
          width={1080}
          height={566}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 26rem"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
        <h3 className="absolute inset-x-0 bottom-0 p-5 font-caveat text-[2.75rem] font-bold max-[359px]:text-[2.6rem] sm:text-5xl leading-none text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
          {title}
        </h3>
        {/* accent line */}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-flame via-amber to-flame" />
      </div>

      <ul className="flex-1 px-5 py-4 sm:px-7 sm:py-5">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-center justify-between gap-4 border-b border-white/10 py-3 last:border-b-0"
          >
            <p className="min-w-0 font-caveat text-[1.75rem] leading-tight text-cream sm:text-3xl">{item.name}</p>
            {/* Weight sits under the price so the name keeps most of the row. */}
            <div className="flex shrink-0 flex-col-reverse items-end">
              {item.quantity && (
                <span className="font-neue text-sm font-medium text-smoke">
                  {item.quantity} {unit}
                </span>
              )}
              <span className="font-neue text-2xl font-bold tabular-nums text-amber-300 sm:text-[1.65rem]">
                {item.price}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}
