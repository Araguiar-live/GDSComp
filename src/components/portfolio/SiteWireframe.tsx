import type { CSSProperties, ReactNode } from "react";
import windowControls from "@/assets/portfolio/window-controls.svg";
import logoIcon from "@/assets/portfolio/logo-icon.svg";
import statusInfo from "@/assets/portfolio/status-info.svg";

/**
 * Exact Figma site-wireframe structure (530:151045 / 552:158232):
 *
 *   [bg #f3f4f6]
 *   ├─ jenga cell band          (1258×630)
 *   ├─ browser plate            (1258×800, UNDER the cells — not over them)
 *   └─ absolute content overlay (header + projects card)
 *
 * Closed canvas: 1262×847 (clips the tall browser plate)
 * Open canvas:   1262×1522 (reveals more browser; overlay scrolls)
 */

export const SITE_WIREFRAME_W = 1262;
export const SITE_WIREFRAME_H_COLLAPSED = 847;
export const SITE_WIREFRAME_H_EXPANDED = 1522;

const CELL_BAND_W = 1258;
const CELL_BAND_H = 630;
const BROWSER_PLATE_W = 1258;
const BROWSER_PLATE_H = 800;

export const WIREFRAME_PEEK_BOTTOM = 2;

type Mark = "dot" | "none" | "house" | "modules" | "modules-tall" | "modules-l" | "modules-grid";

/** Soft chip fill — lighter than #d1d5db so the band reads airier */
const MARK = "bg-[#e5e7eb]";
const MARK_SOFT = "bg-[#eceff3]";

function HouseMark({ soft = false }: { soft?: boolean }) {
  const chip = soft ? MARK_SOFT : MARK;
  return (
    <div className="flex w-4 flex-col items-center" aria-hidden>
      <div className={`mb-[-2px] size-1.5 rounded-[1px] ${chip}`} />
      <div className="flex gap-1">
        <div className={`size-1.5 rounded-[1px] ${chip}`} />
        <div className={`size-1.5 rounded-[1px] ${chip}`} />
      </div>
    </div>
  );
}

function ModulesMark({ tall = false, soft = false }: { tall?: boolean; soft?: boolean }) {
  const chip = soft ? MARK_SOFT : MARK;
  return (
    <div
      className={
        tall
          ? "inline-grid grid-cols-2 grid-rows-3 gap-0.5"
          : "grid size-3.5 grid-cols-2 gap-0.5"
      }
      aria-hidden
    >
      {Array.from({ length: tall ? 6 : 4 }, (_, i) => (
        <div key={i} className={`size-1.5 rounded-[1px] ${chip}`} />
      ))}
    </div>
  );
}

/** Figma 613:1387 — inverted-L of four chips */
function ModulesLMark({ soft = false }: { soft?: boolean }) {
  const chip = soft ? MARK_SOFT : MARK;
  return (
    <div
      className="inline-grid shrink-0 gap-0.5"
      style={{
        gridTemplateColumns: "repeat(3, max-content)",
        gridTemplateRows: "max-content max-content",
      }}
      aria-hidden
    >
      <div className={`size-1.5 rounded-[1px] ${chip}`} />
      <div className={`size-1.5 rounded-[1px] ${chip}`} />
      <div className={`size-1.5 rounded-[1px] ${chip}`} />
      <div className={`col-start-1 size-1.5 rounded-[1px] ${chip}`} />
    </div>
  );
}

/** Figma 613:1393 — 3×3 chip grid */
function ModulesGridMark({ soft = false }: { soft?: boolean }) {
  const chip = soft ? MARK_SOFT : MARK;
  return (
    <div className="inline-grid grid-cols-3 gap-0.5" aria-hidden>
      {Array.from({ length: 9 }, (_, i) => (
        <div key={i} className={`size-1.5 rounded-[1px] ${chip}`} />
      ))}
    </div>
  );
}

function Tile({
  mark = "dot",
  className = "",
  style,
}: {
  mark?: Mark;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={"flex items-center justify-center rounded-[12px] bg-white " + className}
      style={style}
    >
      {mark === "none" ? null : mark === "house" ? (
        <HouseMark />
      ) : mark === "modules" || mark === "modules-tall" ? (
        <ModulesMark tall={mark === "modules-tall"} soft={mark === "modules"} />
      ) : mark === "modules-l" ? (
        <ModulesLMark soft />
      ) : mark === "modules-grid" ? (
        <ModulesGridMark soft />
      ) : (
        <span className={`size-1 rounded-full ${MARK_SOFT}`} />
      )}
    </div>
  );
}

/** Equal-flex row of 1× tiles (Figma h-88 rows). */
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
        <Tile
          key={i}
          mark={marks?.[i] ?? "dot"}
          className="min-h-0 min-w-0 flex-1 self-stretch"
        />
      ))}
    </div>
  );
}

/**
 * Figma 530:151777 — nested flex jenga (not a uniform square CSS grid).
 * Locked to 1258/630 so it never stretches when the canvas aspect changes.
 */
function JengaCellBand() {
  return (
    <div
      className="relative w-full shrink-0"
      style={{ aspectRatio: `${CELL_BAND_W} / ${CELL_BAND_H}` }}
    >
      <div className="absolute inset-0 flex flex-col gap-[2px]">
        {/* Row 1 — 14 × 1 */}
        <div className="flex min-h-0 w-full flex-[88] gap-[2px]">
          <TileRow
            count={14}
            marks={{
              0: "house",
              2: "none",
              4: "none",
              5: "modules-grid",
              7: "none",
              9: "none",
              11: "modules-l",
              13: "none",
            }}
          />
        </div>

        {/* Middle jenga — 270 units */}
        <div className="flex min-h-0 w-full flex-[270] gap-[2px]">
          <div className="flex min-h-0 min-w-0 flex-[1168] flex-col gap-[2px]">
            {/* Upper 178: 7 | tall(88×178) | 5 */}
            <div className="flex min-h-0 flex-[178] gap-[2px]">
              <div className="flex min-h-0 min-w-0 flex-[630] flex-col gap-[2px]">
                <TileRow count={7} marks={{ 1: "none", 3: "modules-tall", 5: "none" }} />
                <TileRow count={7} marks={{ 0: "none", 2: "none", 4: "modules-l", 6: "none" }} />
              </div>
              <Tile className="min-h-0 min-w-0 flex-[88] self-stretch" mark="none" />
              <div className="flex min-h-0 min-w-0 flex-[446] flex-col gap-[2px]">
                <TileRow count={5} marks={{ 0: "none", 3: "house" }} />
                <TileRow count={5} marks={{ 1: "none", 2: "modules-l", 4: "none" }} />
              </div>
            </div>

            {/* Lower 90: 4 | wide(178) | 7 */}
            <div className="flex min-h-0 flex-[90] gap-[2px]">
              <div className="flex min-h-0 min-w-0 flex-[358] gap-[2px]">
                <TileRow count={4} marks={{ 0: "none", 2: "modules-grid" }} />
              </div>
              <Tile className="min-h-0 min-w-0 flex-[178] self-stretch" mark="none" />
              <div className="flex min-h-0 min-w-0 flex-[628] gap-[2px]">
                <TileRow count={7} marks={{ 1: "none", 3: "none", 5: "modules-grid", 6: "none" }} />
              </div>
            </div>
          </div>

          {/* Far-right tower 88×270 */}
          <Tile className="min-h-0 min-w-0 flex-[88] self-stretch" mark="none" />
        </div>

        {/* Lower band — 268 units */}
        <div className="flex min-h-0 w-full flex-[268] flex-col gap-[2px]">
          <div className="flex min-h-0 flex-[88]">
            <TileRow
              count={14}
              marks={{
                1: "none",
                3: "modules-l",
                5: "none",
                7: "none",
                9: "modules-grid",
                11: "none",
                12: "none",
              }}
            />
          </div>
          <div className="flex min-h-0 flex-[178] flex-col gap-[2px]">
            <div className="flex min-h-0 flex-1 gap-[2px]">
              <Tile className="min-h-0 min-w-0 flex-[178] self-stretch" mark="none" />
              <div className="flex min-h-0 min-w-0 flex-[1078] gap-[2px]">
                <TileRow
                  count={12}
                  marks={{ 1: "modules", 3: "none", 5: "none", 8: "none", 10: "modules-grid" }}
                />
              </div>
            </div>
            <div className="flex min-h-0 flex-1">
              <TileRow
                count={14}
                marks={{
                  0: "none",
                  2: "modules-grid",
                  4: "none",
                  6: "none",
                  8: "modules-l",
                  10: "none",
                  13: "none",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WireframeBrowserShell() {
  return (
    <div className="flex size-full flex-col overflow-hidden rounded-[12px] border border-[#d1d5db] bg-white">
      <div className="flex h-[7.22%] min-h-[36px] shrink-0 items-center justify-between border-b border-[#e5e7eb] px-5">
        <img src={windowControls} alt="" className="h-2.5 w-[42px]" width={42} height={10} />
        <div className="mx-4 hidden max-w-[480px] flex-1 items-center justify-center rounded-md border border-[#e5e7eb] bg-[#f3f4f6] px-4 py-1.5 sm:flex">
          <span className="truncate font-mono text-[11px] text-[#9ca3af]">
            https://scraping-wireframe-tool.internal
          </span>
        </div>
        <div className="hidden w-[60px] sm:block" />
      </div>

      <div className="flex h-[8.47%] min-h-[40px] shrink-0 items-center justify-between border-b border-[#e5e7eb] px-8">
        <div className="flex items-center gap-2 rounded-md border border-[#d1d5db] px-3 py-1.5">
          <img src={logoIcon} alt="" className="size-3.5" width={14} height={14} />
          <span className="text-xs font-bold text-[#1f2937]">Logo</span>
        </div>
        <div className="hidden rounded-md border border-[#e5e7eb] bg-[#f3f4f6] px-4 py-1.5 sm:block">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-[#6b7280]">
            Navigation
          </span>
        </div>
        <div className="rounded-md border border-[#d1d5db] bg-[#f3f4f6] px-4 py-2">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-[#6b7280]">
            Button
          </span>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 gap-8 overflow-hidden p-8">
        <div className="flex w-[40.7%] max-w-[480px] shrink-0 flex-col gap-6">
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-12 rounded-[3px] bg-[#ff5126]" />
            <div className="h-1.5 w-20 rounded-[3px] bg-[#e5e7eb]" />
          </div>
          <div className="flex flex-col gap-5 rounded-[12px] border border-[#d1d5db] p-6">
            <div className="flex gap-3">
              <div className="size-8 shrink-0 rounded-2xl border border-[#e5e7eb] bg-[#f3f4f6]" />
              <div className="flex flex-1 flex-col gap-1.5 pt-0.5">
                <div className="h-2.5 w-[60%] rounded-[5px] bg-[#6b7280]" />
                <div className="h-1.5 w-[35%] rounded-[3px] bg-[#e5e7eb]" />
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-8 flex-1 items-center rounded-md border border-[#e5e7eb] bg-[#f3f4f6] px-3">
                <div className="h-2 w-16 rounded bg-[#e5e7eb]" />
              </div>
              <div className="flex h-8 flex-1 items-center rounded-md border border-[#e5e7eb] bg-[#f3f4f6] px-3">
                <div className="h-2 w-20 rounded bg-[#e5e7eb]" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-2 w-full rounded bg-[#e5e7eb]" />
              <div className="h-2 w-full rounded bg-[#e5e7eb]" />
              <div className="h-2 w-[55%] rounded bg-[#e5e7eb]" />
            </div>
          </div>
          <div className="w-fit rounded-full border border-[#e5e7eb] bg-[#f3f4f6] px-4 py-2">
            <div className="h-2 w-[60px] rounded bg-[#e5e7eb]" />
          </div>
        </div>

        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-[12px] border border-[#d1d5db] bg-[#f3f4f6]">
          <div className="flex h-10 shrink-0 items-center justify-between border-b border-[#e5e7eb] bg-white px-5">
            <img src={windowControls} alt="" className="h-2.5 w-[42px]" width={42} height={10} />
            <span className="font-mono text-[11px] font-bold text-[#6b7280]">[ ..JSON ]</span>
          </div>
          <div className="flex min-h-0 flex-1 gap-4 overflow-hidden bg-white p-6 font-mono text-xs leading-relaxed">
            <div className="flex w-5 shrink-0 flex-col gap-2.5 text-right text-[#9ca3af]">
              {Array.from({ length: 8 }, (_, i) => (
                <span key={i}>{i + 1}</span>
              ))}
            </div>
            <div className="min-w-0 flex-1 space-y-2.5 overflow-hidden text-[#999]">
              <p>{"{"}</p>
              <p className="truncate whitespace-pre">{`  "url": "https://example.com",`}</p>
              <p className="truncate whitespace-pre">{`  "markdown": "- G*!aazg ?*aZt9d...",`}</p>
              <p className="truncate whitespace-pre">{`  "json": { "title": "Gui-e", "docs": "..." },`}</p>
              <p className="truncate whitespace-pre">{`  "screenshot": "@tzz=://!97m@=ez-o?-z9-?.png"`}</p>
              <p>{"}"}</p>
            </div>
          </div>
          <div className="flex h-[68px] shrink-0 items-center justify-between border-t border-[#e5e7eb] bg-[#f3f4f6] px-6">
            <img src={statusInfo} alt="" className="h-2 w-[136px]" width={136} height={8} />
            <div className="rounded-lg border border-[#d1d5db] bg-white px-4 py-2.5">
              <span className="font-mono text-[11px] font-bold text-[#1f2937]">Sc*ping...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Figma 532:35527 — browser plate sits BELOW the cell band in the column stack.
 * Aspect 1258×800 with ~40px padding → inner window fills the plate.
 */
function BrowserPlate() {
  return (
    <div
      className="relative flex w-full shrink-0 items-stretch justify-center rounded-[12px] bg-white p-[3.18%]"
      style={{ aspectRatio: `${BROWSER_PLATE_W} / ${BROWSER_PLATE_H}` }}
    >
      <div className="min-h-0 min-w-0 flex-1 overflow-hidden">
        <WireframeBrowserShell />
      </div>
    </div>
  );
}

/**
 * Full Figma stage: cells → browser plate (under pattern) → content overlay.
 * Closed: exact 1262×847 aspect.
 * Open: height follows accordion content; bottom seam to marquee is a sibling
 * 2px spacer in index (not padding here — padding was visually collapsing).
 */
export function WireframeStage({
  expanded,
  children,
}: {
  expanded: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={
        expanded
          ? "relative w-full overflow-x-hidden bg-[#f3f4f6] pb-0 pt-[96px]"
          : "relative w-full overflow-hidden bg-[#f3f4f6]"
      }
      style={
        expanded
          ? undefined
          : { aspectRatio: `${SITE_WIREFRAME_W} / ${SITE_WIREFRAME_H_COLLAPSED}` }
      }
    >
      {/*
        Background fills the full stage (including expanded top padding).
        Cell band + browser plate stay top-aligned; solid #f3f4f6 covers the rest.
      */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 bg-[#f3f4f6]">
        <div className="absolute inset-x-0 top-0 flex w-full flex-col gap-[2px] p-[2px]">
          <JengaCellBand />
          <BrowserPlate />
        </div>
      </div>

      {/* Content overlay — Figma 530:151856 */}
      {expanded ? (
        <div className="relative z-10">{children}</div>
      ) : (
        <div className="absolute inset-0 z-10 overflow-hidden">{children}</div>
      )}
    </div>
  );
}
