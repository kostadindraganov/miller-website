import MenuCard from "@/components/MenuCard";
import MenuCategories from "@/components/MenuCategories";
import ShareCard from "@/components/ShareCard";
import { getTodaysMenu } from "@/lib/sheets";
import { menuJsonLd } from "@/lib/menu-text";

// Two columns from tablets and three only from 1280px, so cards stay wide
// enough for the large item text.
const GRID = "grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-7 xl:grid-cols-3 xl:gap-8";

/** Holds the ribbon and card space while the menu streams in. */
export function LunchMenuSkeleton() {
  return (
    <div aria-hidden="true">
      <div className="mt-6 flex justify-center sm:mt-7">
        <div className="h-10 w-48 animate-pulse rounded-full bg-char-3/10 sm:h-12" />
      </div>
      <div className={`mb-8 mt-[5.5rem] ${GRID}`}>
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className="h-[36rem] animate-pulse rounded-2xl bg-char-3/10" />
        ))}
      </div>
    </div>
  );
}

/**
 * Today's lunch menu from the Google Sheet. It is part of the page's static
 * HTML and refreshed at most once a minute (see getTodaysMenu).
 */
export default async function LunchMenu() {
  const { categories, weekday } = await getTodaysMenu();

  return (
    <>
      {categories.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(menuJsonLd(categories, weekday)).replace(/</g, "\\u003c") }}
        />
      )}
      {/* Weekday on a stitched ribbon, like the banner across the logo. */}
      <p className="mt-6 flex justify-center sm:mt-7">
        <span className="menu-ribbon-wrap">
          <span className="menu-ribbon font-neue text-sm font-bold uppercase sm:text-base">{weekday}</span>
        </span>
      </p>

      {categories.length > 0 ? (
        <>
        <MenuCategories categories={categories.map(({ title, picture }) => ({
          title,
          href: `#category-${picture.replace(/\.[^.]+$/, "")}`,
        }))} />
        <div className={`mb-8 mt-6 ${GRID}`}>
          {categories.map((category) => (
            <div
              key={category.title}
              className="w-full min-w-0 text-left"
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
        </>
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
