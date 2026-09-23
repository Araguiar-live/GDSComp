/** Figma 1769:207580 — dark hero jenga (same topology as SiteWireframe JengaCellBand). */

type Mark = "dot" | "none" | "house" | "modules" | "modules-tall" | "modules-l" | "modules-grid";

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

function HeroTile({
  mark = "dot",
  className = "",
  soft = false,
}: {
  mark?: Mark;
  className?: string;
  soft?: boolean;
}) {
  return (
    <div
      data-hero-tile
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

function TileRow({
  count,
  marks,
  className = "",
}: {
  count: number;
  marks?: Partial<Record<number, Mark>>;
  className?: string;
}) {
  return (
    <div className={"flex min-h-0 w-full flex-1 gap-[2px] " + className}>
      {Array.from({ length: count }, (_, i) => (
        <HeroTile
          key={i}
          mark={marks?.[i] ?? "dot"}
          className="min-h-0 min-w-0 flex-1 self-stretch"
        />
      ))}
    </div>
  );
}

export function HeroJengaGrid() {
  return (
    <div className="interactive-hero__jenga flex h-full min-h-0 w-full flex-col gap-[2px] p-[2px]">
      <div className="flex min-h-0 w-full flex-[88] gap-[2px]">
        <TileRow count={14} marks={{ 0: "modules-l" }} />
      </div>

      <div className="flex min-h-0 w-full flex-[270] gap-[2px]">
        <div className="flex min-h-0 min-w-0 flex-[1168] flex-col gap-[2px]">
          <div className="flex min-h-0 flex-[178] gap-[2px]">
            <div className="flex min-h-0 min-w-0 flex-[630] flex-col gap-[2px]">
              <TileRow count={7} marks={{ 3: "modules-tall" }} />
              <TileRow count={7} />
            </div>
            <HeroTile className="min-h-0 min-w-0 flex-[88] self-stretch" mark="none" soft />
            <div className="flex min-h-0 min-w-0 flex-[446] flex-col gap-[2px]">
              <TileRow count={5} marks={{ 3: "house" }} />
              <TileRow count={5} />
            </div>
          </div>

          <div className="flex min-h-0 flex-[90] gap-[2px]">
            <div className="flex min-h-0 min-w-0 flex-[358] gap-[2px]">
              <TileRow count={4} marks={{ 0: "none", 1: "none", 2: "none", 3: "none" }} />
            </div>
            <HeroTile className="min-h-0 min-w-0 flex-[178] self-stretch" mark="none" soft />
            <div className="flex min-h-0 min-w-0 flex-[628] gap-[2px]">
              <TileRow count={7} />
            </div>
          </div>
        </div>

        <HeroTile className="min-h-0 min-w-0 flex-[88] self-stretch" mark="none" soft />
      </div>

      <div className="flex min-h-0 w-full flex-[268] flex-col gap-[2px]">
        <div className="flex min-h-0 flex-[88]">
          <TileRow count={14} />
        </div>
        <div className="flex min-h-0 flex-[178] flex-col gap-[2px]">
          <div className="flex min-h-0 flex-1 gap-[2px]">
            <HeroTile className="min-h-0 min-w-0 flex-[178] self-stretch" mark="none" soft />
            <div className="flex min-h-0 min-w-0 flex-[1078] gap-[2px]">
              <TileRow count={12} marks={{ 1: "modules" }} />
            </div>
          </div>
          <div className="flex min-h-0 flex-1">
            <TileRow count={14} />
          </div>
        </div>
      </div>
    </div>
  );
}
