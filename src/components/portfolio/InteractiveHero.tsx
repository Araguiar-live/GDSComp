import { type CSSProperties, useEffect, useLayoutEffect, useRef, useState } from "react";
import heroLogo from "@/assets/portfolio/hero/metaball-logo.svg";
import heroToggle from "@/assets/portfolio/hero/scroll-toggle.svg";
import { heroGridLayout } from "@/lib/portfolio-grid";

const HEADLINE = "Are you looking for me?";
const SUBTITLE =
  "Product Designer specialising in complex B2B platforms, design systems, and interactive prototypes.";

const initialGridCells = () => {
  if (typeof window === "undefined") return 14 * 12;
  const { rows, cols } = heroGridLayout(window.innerWidth, window.innerHeight);
  return rows * cols;
};

type InteractiveHeroProps = {
  onEnterWork?: () => void;
};

export function InteractiveHero({ onEnterWork }: InteractiveHeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [gridCells, setGridCells] = useState(initialGridCells);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const apply = () => {
      const { rows, cols, cellW, cellH } = heroGridLayout(el.clientWidth, el.clientHeight);
      setGridCells((count) => (count === rows * cols ? count : rows * cols));
      const grid = el.querySelector<HTMLElement>(".interactive-hero__grid");
      if (!grid) return;
      grid.style.gridTemplateColumns = `repeat(${cols}, ${cellW}px)`;
      grid.style.gridTemplateRows = `repeat(${rows}, ${cellH}px)`;
    };

    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateScrollProgress = () => {
      const rect = container.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -rect.top / Math.max(rect.height, 1)));
      container.style.setProperty("--hero-scroll", String(progress));
    };

    updateScrollProgress();
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  return (
    <section
      ref={containerRef}
      className="interactive-hero relative flex h-dvh min-h-dvh w-full shrink-0 flex-col overflow-hidden bg-[#090e15] font-sans text-white"
      data-name="interactive-hero"
      style={{ "--hero-scroll": 0 } as CSSProperties}
    >
      <div aria-hidden className="interactive-hero__grid">
        {Array.from({ length: gridCells }, (_, index) => (
          <span key={index} />
        ))}
      </div>

      <div
        aria-hidden
        className="interactive-hero__frost pointer-events-none absolute inset-0 z-[3] bg-[rgba(255,255,255,0.04)]"
      />

      <nav className="relative z-10 flex w-full items-center justify-between px-9 pt-24 sm:pt-[139px]">
        <span
          aria-hidden
          className="interactive-hero__mark shrink-0"
          style={
            {
              maskImage: `url("${heroLogo}")`,
              WebkitMaskImage: `url("${heroLogo}")`,
            } as CSSProperties
          }
        />
        <div className="text-right text-[rgba(255,255,255,0.6)]">
          <p className="text-base sm:text-[20px]">Ana.R Design</p>
          <p className="text-[11px] sm:text-[12px]">Product Designer</p>
        </div>
      </nav>

      <div className="interactive-hero__content relative z-10 mx-auto flex min-h-0 w-full max-w-[593px] flex-1 flex-col items-center justify-center gap-[42px] px-6 pb-16 pt-6 text-center sm:pb-12">
        <div className="flex w-full flex-col items-center gap-5">
          <h1 className="w-full text-[clamp(36px,6vw,56px)] font-normal leading-normal text-[rgba(255,255,255,0.6)]">
            {HEADLINE}
          </h1>
          <p className="max-w-[34rem] text-balance text-[15px] font-normal leading-6 text-[rgba(255,255,255,0.4)] sm:text-base sm:leading-7">
            {SUBTITLE}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onEnterWork?.()}
          aria-label="Scroll to selected work"
          className="interactive-hero__toggle relative h-[42px] w-[87px] shrink-0 cursor-pointer transition-transform duration-300 hover:scale-[1.06] active:scale-[0.94]"
        >
          <img src={heroToggle} alt="" aria-hidden className="absolute inset-0 size-full max-w-none" />
        </button>
      </div>
    </section>
  );
}
