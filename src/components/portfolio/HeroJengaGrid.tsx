import {
  PortfolioJengaBand,
  type JengaMark,
  type JengaTileProps,
} from "@/components/portfolio/PortfolioJengaBand";

const CHIP = "bg-[rgba(209,213,219,0.2)]";

function HouseMark() {
  return (
    <div className="flex w-4 flex-col items-center" aria-hidden>
      <div className="flex w-full items-center justify-center gap-1">
        <div className={`size-1.5 rounded-[1px] ${CHIP}`} />
        <div className={`size-1.5 rounded-[1px] ${CHIP}`} />
      </div>
    </div>
  );
}

function ModulesMark({ tall = false }: { tall?: boolean }) {
  return (
    <div
      className={
        tall ? "inline-grid grid-cols-2 grid-rows-3 gap-0.5" : "grid size-3.5 grid-cols-2 gap-0.5"
      }
      aria-hidden
    >
      {Array.from({ length: tall ? 6 : 4 }, (_, i) => (
        <div key={i} className={`size-1.5 rounded-[1px] ${CHIP}`} />
      ))}
    </div>
  );
}

function ModulesLMark() {
  return (
    <div
      className="inline-grid shrink-0 gap-0.5"
      style={{
        gridTemplateColumns: "repeat(3, max-content)",
        gridTemplateRows: "max-content max-content",
      }}
      aria-hidden
    >
      <div className={`size-1.5 rounded-[1px] ${CHIP}`} />
      <div className={`size-1.5 rounded-[1px] ${CHIP}`} />
      <div className={`size-1.5 rounded-[1px] ${CHIP}`} />
      <div className={`col-start-1 size-1.5 rounded-[1px] ${CHIP}`} />
    </div>
  );
}

function HeroTile({ mark = "dot", className = "", soft = false }: JengaTileProps) {
  return (
    <div
      data-hero-tile
      data-hero-tile-soft={soft ? "true" : undefined}
      className={`interactive-hero__tile flex items-center justify-center ${soft ? "interactive-hero__tile--soft" : ""} ${className}`}
    >
      {mark === "none" ? null : mark === "house" ? (
        <HouseMark />
      ) : mark === "modules" || mark === "modules-tall" ? (
        <ModulesMark tall={mark === "modules-tall"} />
      ) : mark === "modules-l" ? (
        <ModulesLMark />
      ) : (
        <span className="interactive-hero__tile-dot" aria-hidden />
      )}
    </div>
  );
}

export function HeroJengaGrid() {
  return (
    <div className="interactive-hero__jenga flex h-full min-h-0 w-full flex-col gap-[2px]">
      <PortfolioJengaBand Tile={HeroTile} />
    </div>
  );
}

export type { JengaMark };
