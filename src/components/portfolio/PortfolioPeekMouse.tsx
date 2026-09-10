import peekMouse from "@/assets/portfolio/peek-mouse.svg";

/** Figma 1458:215048 — decorative mouse peeking from the accordion top-right (mirror of calculator). */
export function PortfolioPeekMouse() {
  return (
    <div
      aria-hidden
      className="pointer-events-none relative size-[117px] shrink-0 select-none"
      data-name="peek-mouse"
    >
      <div className="portfolio-peek-mouse-bob absolute inset-0">
        <div className="portfolio-peek-mouse-vibrate flex h-full w-full items-center justify-center">
          <img
            src={peekMouse}
            alt=""
            draggable={false}
            className="block h-[99px] w-[74px] max-w-none object-contain"
          />
        </div>
      </div>
    </div>
  );
}
