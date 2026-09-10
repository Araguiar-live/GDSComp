import peekMouse from "@/assets/portfolio/peek-mouse.svg";

/** Decorative mouse peeking from below the accordion — bobs up/down with a gentle vibrate. */
export function PortfolioPeekMouse({ hidden = false }: { hidden?: boolean }) {
  if (hidden) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute right-4 bottom-0 z-[4] hidden h-[54px] w-[56px] overflow-hidden sm:right-8 sm:block md:right-10 lg:right-14"
    >
      <div className="portfolio-peek-mouse-bob h-full w-full">
        <div className="portfolio-peek-mouse-vibrate h-full w-full">
          <img
            src={peekMouse}
            alt=""
            draggable={false}
            className="block h-[96px] w-[56px] max-w-none translate-y-[38px] object-contain object-top"
          />
        </div>
      </div>
    </div>
  );
}
