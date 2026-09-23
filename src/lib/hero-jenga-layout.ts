import { HERO_JENGA_BAND_H, HERO_JENGA_BAND_W } from "@/lib/hero-jenga";
import { GRID_PAD } from "@/lib/portfolio-grid";

export const JENGA_GAP = 2;

export type BandTileRect = {
  id: number;
  x: number;
  y: number;
  w: number;
  h: number;
  soft: boolean;
};

export type ViewportTile = BandTileRect & {
  cx: number;
  cy: number;
};

function rowTiles(
  tiles: BandTileRect[],
  x: number,
  y: number,
  width: number,
  height: number,
  count: number,
  softAt: Partial<Record<number, boolean>> = {},
) {
  const gap = JENGA_GAP;
  const tileW = (width - gap * (count - 1)) / count;
  for (let i = 0; i < count; i++) {
    tiles.push({
      id: tiles.length,
      x: x + i * (tileW + gap),
      y,
      w: tileW,
      h: height,
      soft: softAt[i] ?? false,
    });
  }
}

function pushTile(
  tiles: BandTileRect[],
  x: number,
  y: number,
  w: number,
  h: number,
  soft = false,
) {
  tiles.push({ id: tiles.length, x, y, w, h, soft });
}

/** Figma 1769:207580 / SiteWireframe JengaCellBand — fixed band coordinates. */
export function buildJengaBandTiles(): BandTileRect[] {
  const tiles: BandTileRect[] = [];
  const W = HERO_JENGA_BAND_W;

  rowTiles(tiles, 0, 0, W, 88, 14, { 7: true });

  const midY = 90;
  const leftW = 1168;
  const towerX = leftW + JENGA_GAP;
  const towerW = W - towerX;

  pushTile(tiles, towerX, midY, towerW, 270, true);

  const upperY = midY;
  const upperH = 178;
  const colLeftW = 630;
  const spineW = 88;
  const colRightW = 446;
  const colRightX = colLeftW + JENGA_GAP + spineW + JENGA_GAP;

  rowTiles(tiles, 0, upperY, colLeftW, 88, 7);
  rowTiles(tiles, 0, upperY + 88 + JENGA_GAP, colLeftW, 88, 7);
  pushTile(tiles, colLeftW + JENGA_GAP, upperY, spineW, upperH, true);
  rowTiles(tiles, colRightX, upperY, colRightW, 88, 5);
  rowTiles(tiles, colRightX, upperY + 88 + JENGA_GAP, colRightW, 88, 5);

  const lowerY = midY + upperH + JENGA_GAP;
  const lowerH = 90;
  const lowerLeftW = 358;
  const lowerMidW = 178;
  const lowerRightW = 628;
  const lowerMidX = lowerLeftW + JENGA_GAP;
  const lowerRightX = lowerMidX + lowerMidW + JENGA_GAP;

  rowTiles(tiles, 0, lowerY, lowerLeftW, lowerH, 4);
  pushTile(tiles, lowerMidX, lowerY, lowerMidW, lowerH, true);
  rowTiles(tiles, lowerRightX, lowerY, lowerRightW, lowerH, 7);

  const bottomY = midY + 270 + JENGA_GAP;
  rowTiles(tiles, 0, bottomY, W, 88, 14);

  const bottomInnerY = bottomY + 88 + JENGA_GAP;
  const bottomInnerH = 88;
  const bottomLeftW = 178;
  const bottomRowW = 1078;
  const bottomRowX = bottomLeftW + JENGA_GAP;

  pushTile(tiles, 0, bottomInnerY, bottomLeftW, bottomInnerH, true);
  rowTiles(tiles, bottomRowX, bottomInnerY, bottomRowW, bottomInnerH, 12, { 10: true });
  rowTiles(tiles, 0, bottomInnerY + bottomInnerH + JENGA_GAP, W, bottomInnerH, 14);

  return tiles;
}

/**
 * Match SiteWireframe JengaCellBand: scale from viewport width (1258 band),
 * then repeat the band vertically to fill the hero (same unit size as wireframe).
 */
export function bandTilesToViewport(
  bandTiles: BandTileRect[],
  viewportW: number,
  viewportH: number,
): ViewportTile[] {
  const pad = GRID_PAD;
  const innerW = Math.max(0, viewportW - pad * 2);
  const scale = innerW / HERO_JENGA_BAND_W;
  const bandScreenW = HERO_JENGA_BAND_W * scale;
  const bandScreenH = HERO_JENGA_BAND_H * scale;
  const offsetX = pad + (innerW - bandScreenW) / 2;
  const bandStep = bandScreenH + JENGA_GAP * scale;

  const tiles: ViewportTile[] = [];
  let id = 0;
  for (let bandTop = pad; bandTop < viewportH + bandScreenH; bandTop += bandStep) {
    for (const tile of bandTiles) {
      const x = offsetX + tile.x * scale;
      const y = bandTop + tile.y * scale;
      const w = tile.w * scale;
      const h = tile.h * scale;
      tiles.push({
        ...tile,
        id: id++,
        x,
        y,
        w,
        h,
        cx: x + w / 2,
        cy: y + h / 2,
      });
    }
  }
  return tiles;
}

export function buildTileNeighbors(tiles: ViewportTile[]): number[][] {
  const neighbors = tiles.map(() => [] as number[]);
  const gapSlack = Math.max(3, tiles[0]?.w ? tiles[0].w * 0.06 : 4);

  for (let i = 0; i < tiles.length; i++) {
    for (let j = i + 1; j < tiles.length; j++) {
      const a = tiles[i];
      const b = tiles[j];
      if (!a || !b) continue;
      const hOverlap = a.y < b.y + b.h - 0.5 && b.y < a.y + a.h - 0.5;
      const vOverlap = a.x < b.x + b.w - 0.5 && b.x < a.x + a.w - 0.5;
      const touchX =
        hOverlap &&
        (Math.abs(a.x + a.w - b.x) <= gapSlack || Math.abs(b.x + b.w - a.x) <= gapSlack);
      const touchY =
        vOverlap &&
        (Math.abs(a.y + a.h - b.y) <= gapSlack || Math.abs(b.y + b.h - a.y) <= gapSlack);
      if (touchX || touchY) {
        neighbors[i].push(j);
        neighbors[j].push(i);
      }
    }
  }
  return neighbors;
}

export function jengaScaleForViewport(viewportW: number, _viewportH: number) {
  const innerW = Math.max(0, viewportW - GRID_PAD * 2);
  return innerW / HERO_JENGA_BAND_W;
}
