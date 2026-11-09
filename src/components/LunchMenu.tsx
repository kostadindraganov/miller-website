import { connection } from "next/server";
import MenuCard from "@/components/MenuCard";
import ShareCard from "@/components/ShareCard";
import { getLunchMenu, menuWeekday } from "@/lib/sheets";

const GRID = "grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3";

/**
 * Today's lunch menu, read from the Google Sheet on every request. Render it
 * inside <Suspense> — the rest of the page is prerendered and streams first.
 */
export default async function LunchMenu() {
  // Request time only: the menu and the date must never be baked in at build.
  await connection();
  const categories = await getLunchMenu();

  return (
    <>
      {/* Weekday on a stitched ribbon, like the banner across the logo. */}
      <p className="mt-6 flex justify-center sm:mt-7">
        <span className="menu-ribbon-wrap">
          <span className="menu-ribbon font-neue text-sm font-bold uppercase sm:text-base">{menuWeekday()}</span>
        </span>
      </p>

      {categories.length > 0 ? (
        <div className={`mb-8 mt-10 ${GRID}`}>
          {categories.map((category, i) => (
            <div
              key={category.title}
              style={{ animation: `pop-in 0.5s cubic-bezier(0.2,0.7,0.2,1) ${i * 0.06}s both` }}
              className="w-full text-left"
            >
              <MenuCard {...category} />
            </div>
          ))}
          {/* Invite card closes the grid, right after the last category. */}
          <div
            style={{ animation: `pop-in 0.5s cubic-bezier(0.2,0.7,0.2,1) ${categories.length * 0.06}s both` }}
            className="w-full text-left"
          >
            <ShareCard />
          </div>
        </div>
      ) : (
        <>
          <p className="mx-auto mt-12 max-w-md rounded-2xl bg-char-3/5 px-6 py-10 font-caveat text-3xl text-char-3/60">
            Менюто за днес очаквайте съвсем скоро
          </p>
          <div className="mx-auto mb-8 mt-6 max-w-sm text-left">
            <ShareCard />
          </div>
        </>
      )}
    </>
  );
}

export function LunchMenuSkeleton() {
  return (
    <>
      <p className="mx-auto mt-6 h-11 w-56 animate-pulse rounded bg-char-3/10 sm:mt-7 sm:h-12" />
      <div className={`mb-8 mt-10 ${GRID}`} aria-busy="true" aria-label="Зареждане на менюто">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="h-80 animate-pulse rounded-2xl bg-char-3/10" />
        ))}
      </div>
    </>
  );
}
