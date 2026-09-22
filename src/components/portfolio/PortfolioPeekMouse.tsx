import peekMouse from "@/assets/portfolio/peek-mouse.svg";

/** Figma 1458:215048 — decorative mouse peeking from the accordion top-right (mirror of calculator). */
export function PortfolioPeekMouse() {
  return (
    <div
      aria-hidden
      className="pointer-events-none relative size-[117px] shrink-0 select-none"
      data-name="peek-mouse"
    >
      <div className="portfolio-peek-mouse-motion absolute inset-0 flex items-center justify-center">
        <img
          src={peekMouse}
          alt=""
          draggable={false}
          className="block h-[99px] w-[74px] max-w-none object-contain"
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
}
