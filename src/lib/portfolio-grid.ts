/** Shared jenga grid — Figma 530:151045 @ 1258px band width. */
export const FIGMA_BAND_W = 1258;
export const GRID_COLS = 14;
export const GRID_GAP = 2;
export const GRID_PAD = 2;
export const GRID_RADIUS = 12;

export type GridMetrics = {
  pad: number;
  gap: number;
  cell: number;
  radius: number;
  step: number;
  dotR: number;
};

export function getGridMetrics(containerWidth: number): GridMetrics {
  const bandW = containerWidth - GRID_PAD * 2;
  const scale = bandW / FIGMA_BAND_W;
  const cell = (bandW - (GRID_COLS - 1) * GRID_GAP) / GRID_COLS;
  return {
    pad: GRID_PAD,
    gap: GRID_GAP,
    cell,
    radius: GRID_RADIUS * scale,
    step: cell + GRID_GAP,
    dotR: 2 * scale,
  };
}

/** Full band height for a row count — matches InteractiveHero canvas break logic. */
export function gridBandHeight(width: number, rowCount: number): number {
  const { pad, cell, step } = getGridMetrics(width);
  if (rowCount < 1) return pad * 2;
  return pad + (rowCount - 1) * step + cell + pad;
}

/** Square-like cells with a fixed 2px gap that fill both edges of the hero. */
export function heroGridLayout(width: number, height: number) {
  const pad = GRID_PAD;
  const gap = GRID_GAP;
  const cols = GRID_COLS;
  const innerW = Math.max(0, width - pad * 2);
  const innerH = Math.max(0, height - pad * 2);
  const cellW = (innerW - gap * (cols - 1)) / cols;
  const step = cellW + gap;
  const rows = Math.max(1, Math.round((innerH + gap) / Math.max(step, 1)));
  const cellH = (innerH - gap * (rows - 1)) / rows;
  return { rows, cols, cellW, cellH, pad, gap };
}

/** Row count that keeps a 2px gap and fills the hero without clipping a square. */
export function heroGridRows(width: number, height: number): number {
  return heroGridLayout(width, height).rows;
}

/** Smallest grid-aligned height that is at least minHeight. */
export function snapHeightToGrid(width: number, minHeight: number): number {
  let rows = 1;
  while (gridBandHeight(width, rows) < minHeight) rows++;
  return gridBandHeight(width, rows);
}
