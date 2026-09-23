/** Figma jenga band — 14-column logical grid for occupancy (one tile id per cell at rest). */
export const HERO_GRID_COLS = 14;
export const HERO_GRID_ROWS = 8;

export type HeroGridTile = {
  id: number;
  col: number;
  row: number;
  x: number;
  y: number;
  w: number;
  h: number;
  cx: number;
  cy: number;
  soft: boolean;
};

export type HeroTileShift = {
  x: number;
  y: number;
  glow: number;
};

export type HeroTileDrawCommand = {
  id: number;
  x: number;
  y: number;
  w: number;
  h: number;
  cx: number;
  cy: number;
  soft: boolean;
  glow: number;
};

function clamp(value: number, lo: number, hi: number) {
  return Math.min(Math.max(value, lo), hi);
}

export function gridCellKey(col: number, row: number) {
  return `${col},${row}`;
}

/** Assign stable grid coordinates from band-space layout (14 × 88px units). */
export function attachGridCoordinates(
  tiles: Omit<HeroGridTile, "col" | "row">[],
  bandScale: number,
): HeroGridTile[] {
  const unit = 88 * bandScale + 2 * bandScale;
  return tiles.map((tile) => {
    const col = clamp(Math.floor((tile.x + tile.w * 0.5) / Math.max(unit, 1)), 0, HERO_GRID_COLS - 1);
    const row = clamp(Math.floor((tile.y + tile.h * 0.5) / Math.max(unit, 1)), 0, HERO_GRID_ROWS - 1);
    return { ...tile, col, row };
  });
}

export class HeroTileGrid {
  private tiles: HeroGridTile[] = [];
  private neighbors: number[][] = [];
  /** Rest-position occupancy: one tile id per cell. */
  private cellOwner = new Map<string, number>();

  reset(tiles: HeroGridTile[]) {
    this.tiles = tiles;
    this.neighbors = buildHeroTileNeighbors(tiles);
    this.rebuildCellOwnership();
  }

  get size() {
    return this.tiles.length;
  }

  getTiles() {
    return this.tiles;
  }

  private rebuildCellOwnership() {
    this.cellOwner.clear();
    for (const tile of this.tiles) {
      this.claimCell(tile.col, tile.row, tile.id);
    }
  }

  private claimCell(col: number, row: number, tileId: number) {
    const key = gridCellKey(col, row);
    const existing = this.cellOwner.get(key);
    if (existing !== undefined && existing !== tileId) {
      return;
    }
    this.cellOwner.set(key, tileId);
  }

  solveShifts(
    width: number,
    height: number,
    cursor: { x: number; y: number; active: boolean },
    isMobile: boolean,
  ): HeroTileShift[] {
    return solveHeroTileShifts(this.tiles, this.neighbors, width, height, cursor, isMobile);
  }

  /** One draw command per tile id — no duplicate cells in a single frame. */
  buildDrawCommands(shifts: HeroTileShift[]): HeroTileDrawCommand[] {
    const seenIds = new Set<number>();
    const seenCells = new Set<string>();
    const commands: HeroTileDrawCommand[] = [];

    for (let index = 0; index < this.tiles.length; index++) {
      const tile = this.tiles[index];
      const shift = shifts[index];
      if (!tile || !shift) continue;
      if (seenIds.has(tile.id)) continue;

      const col = tile.col;
      const row = tile.row;
      const cell = gridCellKey(col, row);
      const owner = this.cellOwner.get(cell);
      if (owner !== undefined && owner !== tile.id) continue;
      if (seenCells.has(cell)) continue;

      seenIds.add(tile.id);
      seenCells.add(cell);

      commands.push({
        id: tile.id,
        x: tile.x + shift.x,
        y: tile.y + shift.y,
        w: tile.w,
        h: tile.h,
        cx: tile.cx + shift.x,
        cy: tile.cy + shift.y,
        soft: tile.soft,
        glow: shift.glow,
      });
    }

    return commands;
  }
}

export function buildHeroTileNeighbors(tiles: Pick<HeroGridTile, "x" | "y" | "w" | "h">[]): number[][] {
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

export function solveHeroTileShifts(
  tiles: Pick<HeroGridTile, "x" | "y" | "w" | "h" | "cx" | "cy">[],
  neighbors: number[][],
  width: number,
  height: number,
  cursor: { x: number; y: number; active: boolean },
  isMobile: boolean,
): HeroTileShift[] {
  const minGap = 1;
  const shifts: HeroTileShift[] = tiles.map((tile) => {
    let shiftX = 0;
    let shiftY = 0;
    let glow = 0;
    if (!isMobile && cursor.active) {
      const dist = Math.hypot(tile.cx - cursor.x, tile.cy - cursor.y);
      glow = Math.max(0, 1 - dist / 240);
      const angle = Math.atan2(tile.cy - cursor.y, tile.cx - cursor.x);
      const liquid = glow * 10;
      shiftX += Math.cos(angle) * liquid;
      shiftY += Math.sin(angle) * liquid;
    }
    return { x: shiftX, y: shiftY, glow };
  });

  const clampShift = (tile: (typeof tiles)[number], shift: HeroTileShift) => {
    const minX = -tile.x;
    const minY = -tile.y;
    const maxX = Math.max(minX, width - tile.w - tile.x);
    const maxY = Math.max(minY, height - tile.h - tile.y);
    shift.x = clamp(shift.x, minX, maxX);
    shift.y = clamp(shift.y, minY, maxY);
  };

  for (let i = 0; i < tiles.length; i++) {
    clampShift(tiles[i], shifts[i]);
  }

  const shiftedOverlap = (i: number, j: number) => {
    const a = tiles[i];
    const b = tiles[j];
    const sa = shifts[i];
    const sb = shifts[j];
    if (!a || !b || !sa || !sb) return false;
    const overlapX =
      Math.min(a.x + sa.x + a.w, b.x + sb.x + b.w) - Math.max(a.x + sa.x, b.x + sb.x);
    const overlapY =
      Math.min(a.y + sa.y + a.h, b.y + sb.y + b.h) - Math.max(a.y + sa.y, b.y + sb.y);
    return overlapX > 0 && overlapY > 0;
  };

  const separate = (i: number, j: number) => {
    const a = tiles[i];
    const b = tiles[j];
    const sa = shifts[i];
    const sb = shifts[j];
    if (!a || !b || !sa || !sb) return;
    const aL = a.x + sa.x;
    const aT = a.y + sa.y;
    const aR = aL + a.w;
    const aB = aT + a.h;
    const bL = b.x + sb.x;
    const bT = b.y + sb.y;
    const bR = bL + b.w;
    const bB = bT + b.h;
    const overlapX = Math.min(aR, bR) - Math.max(aL, bL);
    const overlapY = Math.min(aB, bB) - Math.max(aT, bT);
    const gapX = overlapX > 0 ? -overlapX : Math.max(aL, bL) - Math.min(aR, bR);
    const gapY = overlapY > 0 ? -overlapY : Math.max(aT, bT) - Math.min(aB, bB);
    if (gapX >= minGap || gapY >= minGap) return;

    const needX = minGap - gapX;
    const needY = minGap - gapY;
    const key = needX <= needY ? "x" : "y";
    const need = key === "x" ? needX : needY;
    const aCenter = key === "x" ? (aL + aR) / 2 : (aT + aB) / 2;
    const bCenter = key === "x" ? (bL + bR) / 2 : (bT + bB) / 2;
    let sign = Math.sign(bCenter - aCenter);
    if (sign === 0) {
      sign = key === "x" ? (b.x >= a.x ? 1 : -1) : b.y >= a.y ? 1 : -1;
    }

    const minA = key === "x" ? -a.x : -a.y;
    const maxA =
      key === "x" ? Math.max(minA, width - a.w - a.x) : Math.max(minA, height - a.h - a.y);
    const minB = key === "x" ? -b.x : -b.y;
    const maxB =
      key === "x" ? Math.max(minB, width - b.w - b.x) : Math.max(minB, height - b.h - b.y);
    const beforeA = sa[key];
    const beforeB = sb[key];
    let nextA = clamp(beforeA - sign * (need / 2), minA, maxA);
    let nextB = clamp(beforeB + sign * (need / 2), minB, maxB);
    let short = need - sign * (nextB - beforeB - (nextA - beforeA));
    if (short > 0) {
      const pushedB = clamp(nextB + sign * short, minB, maxB);
      short -= sign * (pushedB - nextB);
      nextB = pushedB;
    }
    if (short > 0) nextA = clamp(nextA - sign * short, minA, maxA);
    sa[key] = nextA;
    sb[key] = nextB;
  };

  for (let pass = 0; pass < 4; pass++) {
    for (let i = 0; i < tiles.length; i++) {
      for (const j of neighbors[i] ?? []) {
        if (j <= i) continue;
        if (!shiftedOverlap(i, j)) continue;
        separate(i, j);
      }
    }
    for (let i = 0; i < tiles.length; i++) {
      clampShift(tiles[i], shifts[i]);
    }
  }

  return shifts;
}

export function drawHeroTilesOnCanvas(
  ctx: CanvasRenderingContext2D,
  commands: HeroTileDrawCommand[],
  tileRadius: number,
  cursorActive: boolean,
  isMobile: boolean,
  ambient: number,
) {
  for (const cmd of commands) {
    const baseFill = cmd.soft ? 0.05 : 0.1;
    ctx.fillStyle = `rgba(255,255,255,${baseFill + cmd.glow * 0.08})`;
    ctx.beginPath();
    ctx.roundRect(cmd.x, cmd.y, cmd.w, cmd.h, tileRadius);
    ctx.fill();

    if (cmd.glow > 0.05) {
      ctx.strokeStyle = `rgba(180, 210, 255, ${cmd.glow * 0.22})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(cmd.x + 0.5, cmd.y + 0.5, cmd.w - 1, cmd.h - 1, tileRadius);
      ctx.stroke();
    }

    let dotAlpha = 0.2;
    if (cursorActive && !isMobile) {
      dotAlpha = 0.2 + cmd.glow * 0.55;
    } else if (isMobile) {
      dotAlpha = 0.2 + ambient;
    }

    ctx.fillStyle = `rgba(209,213,219,${dotAlpha + cmd.glow * 0.15})`;
    ctx.beginPath();
    ctx.arc(cmd.cx, cmd.cy, 2, 0, Math.PI * 2);
    ctx.fill();
  }
}
