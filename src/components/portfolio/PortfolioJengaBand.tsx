import type { ComponentType, ReactNode } from "react";

/** Shared flex jenga topology — SiteWireframe JengaCellBand / Figma 1769:207580. */
export type JengaMark =
  | "dot"
  | "none"
  | "house"
  | "modules"
  | "modules-tall"
  | "modules-l"
  | "modules-grid";

export type JengaTileProps = {
  mark?: JengaMark;
  className?: string;
  soft?: boolean;
};

function TileRow({
  Tile,
  count,
  marks,
  softAt,
  className = "",
}: {
  Tile: ComponentType<JengaTileProps>;
  count: number;
  marks?: Partial<Record<number, JengaMark>>;
  softAt?: Partial<Record<number, boolean>>;
  className?: string;
}) {
  return (
    <div className={"flex min-h-0 w-full flex-1 gap-[2px] " + className}>
      {Array.from({ length: count }, (_, i) => (
        <Tile
          key={i}
          mark={marks?.[i] ?? "dot"}
          soft={softAt?.[i] ?? false}
          className="min-h-0 min-w-0 flex-1 self-stretch"
        />
      ))}
    </div>
  );
}

export function PortfolioJengaBand({ Tile }: { Tile: ComponentType<JengaTileProps> }) {
  return (
    <>
      <div className="flex min-h-0 w-full flex-[88] gap-[2px]">
        <TileRow Tile={Tile} count={14} marks={{ 0: "modules-l" }} softAt={{ 7: true }} />
      </div>

      <div className="flex min-h-0 w-full flex-[270] gap-[2px]">
        <div className="flex min-h-0 min-w-0 flex-[1168] flex-col gap-[2px]">
          <div className="flex min-h-0 flex-[178] gap-[2px]">
            <div className="flex min-h-0 min-w-0 flex-[630] flex-col gap-[2px]">
              <TileRow Tile={Tile} count={7} marks={{ 3: "modules-tall" }} />
              <TileRow Tile={Tile} count={7} />
            </div>
            <Tile className="min-h-0 min-w-0 flex-[88] self-stretch" mark="none" soft />
            <div className="flex min-h-0 min-w-0 flex-[446] flex-col gap-[2px]">
              <TileRow Tile={Tile} count={5} marks={{ 3: "house" }} />
              <TileRow Tile={Tile} count={5} />
            </div>
          </div>

          <div className="flex min-h-0 flex-[90] gap-[2px]">
            <div className="flex min-h-0 min-w-0 flex-[358] gap-[2px]">
              <TileRow
                Tile={Tile}
                count={4}
                marks={{ 0: "none", 1: "none", 2: "none", 3: "none" }}
              />
            </div>
            <Tile className="min-h-0 min-w-0 flex-[178] self-stretch" mark="none" soft />
            <div className="flex min-h-0 min-w-0 flex-[628] gap-[2px]">
              <TileRow Tile={Tile} count={7} />
            </div>
          </div>
        </div>

        <Tile className="min-h-0 min-w-0 flex-[88] self-stretch" mark="none" soft />
      </div>

      <div className="flex min-h-0 w-full flex-[268] flex-col gap-[2px]">
        <div className="flex min-h-0 flex-[88]">
          <TileRow Tile={Tile} count={14} />
        </div>
        <div className="flex min-h-0 flex-[178] flex-col gap-[2px]">
          <div className="flex min-h-0 flex-1 gap-[2px]">
            <Tile className="min-h-0 min-w-0 flex-[178] self-stretch" mark="none" soft />
            <div className="flex min-h-0 min-w-0 flex-[1078] gap-[2px]">
              <TileRow Tile={Tile} count={12} marks={{ 1: "modules" }} softAt={{ 10: true }} />
            </div>
          </div>
          <div className="flex min-h-0 flex-1">
            <TileRow Tile={Tile} count={14} />
          </div>
        </div>
      </div>
    </>
  );
}
