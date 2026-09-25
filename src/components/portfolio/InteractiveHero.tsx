import { type CSSProperties, useEffect, useRef } from "react";
import heroLogo from "@/assets/portfolio/hero/metaball-logo.svg";
import heroToggle from "@/assets/portfolio/hero/scroll-toggle.svg";
import heroToggleKnobHover from "@/assets/portfolio/hero/toggle-knob-hover.svg";
import { heroGridLayout } from "@/lib/portfolio-grid";

const HEADLINE = "Are you looking for me?";
const SUBTITLE =
  "Product Designer specialising in complex B2B platforms, design systems, and interactive prototypes.";
const HERO_GRID_CELLS = 14 * 48;

type Blob = {
  homeX: number;
  homeY: number;
  x: number;
  y: number;
  r: number;
  phase: number;
};

type InteractiveHeroProps = {
  onEnterWork?: () => void;
};

export function InteractiveHero({ onEnterWork }: InteractiveHeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollProgressRef = useRef(0);
  const cursorRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const apply = () => {
      const grid = el.querySelector<HTMLElement>(".interactive-hero__grid");
      if (!grid) return;
      const { rows, cols, cellW, cellH } = heroGridLayout(el.clientWidth, el.clientHeight);
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
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let teardown = () => {};

    const ctx = canvas.getContext("2d");
      if (!ctx) return;

      let raf = 0;
      let loopActive = false;
      let width = 0;
      let height = 0;
      let isMobile = window.innerWidth < 768;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cursor = cursorRef.current;
      let lensX = 0;
      let lensY = 0;

      const blobs: Blob[] = [
        { homeX: 0.08, homeY: 0.12, x: 0, y: 0, r: 92, phase: 0 },
        { homeX: 0.14, homeY: 0.07, x: 0, y: 0, r: 68, phase: 1.4 },
        { homeX: 0.05, homeY: 0.22, x: 0, y: 0, r: 56, phase: 2.8 },
      ];

      const syncBlobHomes = () => {
        blobs.forEach((blob) => {
          blob.x = blob.homeX * width;
          blob.y = blob.homeY * height;
        });
        lensX = width * 0.5;
        lensY = height * 0.5;
      };

      // Soft metaball sprites, blurred once. A full-frame ctx.filter each tick
      // was keeping the hero frozen for the first pointer move.
      const sprites = new Map<number, { canvas: HTMLCanvasElement; css: number }>();
      const makeSprite = (radius: number) => {
        const blur = 28;
        const css = Math.ceil((radius + blur * 3) * 2);
        const sprite = document.createElement("canvas");
        sprite.width = Math.max(1, Math.ceil(css * dpr));
        sprite.height = Math.max(1, Math.ceil(css * dpr));
        const g = sprite.getContext("2d");
        if (!g) return;
        g.setTransform(dpr, 0, 0, dpr, 0, 0);
        g.filter = `blur(${blur}px)`;
        const cx = css / 2;
        const gradient = g.createRadialGradient(cx, cx, 0, cx, cx, radius);
        gradient.addColorStop(0, "rgba(255,255,255,1)");
        gradient.addColorStop(0.55, "rgba(255,255,255,0.35)");
        gradient.addColorStop(1, "rgba(255,255,255,0)");
        g.fillStyle = gradient;
        g.beginPath();
        g.arc(cx, cx, radius, 0, Math.PI * 2);
        g.fill();
        sprites.set(radius, { canvas: sprite, css });
      };
      const syncCursorVars = (blurPx: number) => {
        container.style.setProperty("--hero-lens-x", `${lensX}px`);
        container.style.setProperty("--hero-lens-y", `${lensY}px`);
        container.style.setProperty("--hero-cursor-blur", `${blurPx}px`);
        container.style.setProperty("--hero-cursor-active", cursor.active ? "1" : "0");
        const frostShiftX = cursor.active ? (lensX / width - 0.5) * 14 : 0;
        const frostShiftY = cursor.active ? (lensY / height - 0.5) * 10 : 0;
        container.style.setProperty("--hero-frost-shift-x", `${frostShiftX}px`);
        container.style.setProperty("--hero-frost-shift-y", `${frostShiftY}px`);
      };

      const updateScrollProgress = () => {
        const rect = container.getBoundingClientRect();
        const progress = Math.min(1, Math.max(0, -rect.top / Math.max(rect.height, 1)));
        scrollProgressRef.current = progress;
        container.style.setProperty("--hero-scroll", String(progress));
      };

      let bounds = container.getBoundingClientRect();

      const resize = () => {
        isMobile = window.innerWidth < 768;
        width = container.clientWidth;
        height = container.clientHeight;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        syncBlobHomes();
        updateScrollProgress();
        measureTiles();
        bounds = container.getBoundingClientRect();
        if (onScreen) {
          cancelAnimationFrame(raf);
          loopActive = false;
          draw();
        }
      };

      const onMove = (event: MouseEvent) => {
        if (isMobile) return;
        cursor.x = event.clientX - bounds.left;
        cursor.y = event.clientY - bounds.top;
        cursor.active = true;
        if (!onScreen) return;
        if (loopActive) return;
        loopActive = true;
        draw();
      };

      const onLeave = () => {
        cursor.active = false;
        ensureLoop();
      };

      let pulse = 0;

      type Tile = { x: number; y: number; w: number; h: number; cx: number; cy: number };
      let tiles: Tile[] = [];
      let tileRadius = 12;

      const measureTiles = () => {
        const layout = heroGridLayout(width, height);
        const stepX = layout.cellW + layout.gap;
        const stepY = layout.cellH + layout.gap;
        const next: Tile[] = [];
        for (let row = 0; row < layout.rows; row++) {
          for (let col = 0; col < layout.cols; col++) {
            const x = layout.pad + col * stepX;
            const y = layout.pad + row * stepY;
            next.push({
              x,
              y,
              w: layout.cellW,
              h: layout.cellH,
              cx: x + layout.cellW / 2,
              cy: y + layout.cellH / 2,
            });
          }
        }
        tiles = next;
        tileRadius = Math.min(12, layout.cellW * 0.18);
      };

      const drawMetaballs = () => {
        ctx.save();
        ctx.globalCompositeOperation = "screen";

        blobs.forEach((blob) => {
          const sprite = sprites.get(blob.r);
          if (!sprite) return;
          const alpha = isMobile ? 0.14 + Math.sin(pulse + blob.phase) * 0.04 : 0.22;
          ctx.globalAlpha = alpha;
          ctx.drawImage(
            sprite.canvas,
            blob.x - sprite.css / 2,
            blob.y - sprite.css / 2,
            sprite.css,
            sprite.css,
          );
        });

        ctx.restore();
      };

      let gridHidden = false;
      let onScreen = false;

      const draw = () => {
        const scroll = scrollProgressRef.current;

        if (!isMobile && cursor.active) {
          lensX += (cursor.x - lensX) * 0.11;
          lensY += (cursor.y - lensY) * 0.11;
        } else {
          lensX += (width * 0.5 - lensX) * 0.04;
          lensY += (height * 0.5 - lensY) * 0.04;
        }

        let cursorBlur = 0;
        if (!isMobile && cursor.active) {
          cursorBlur = 14;
        }
        syncCursorVars(cursorBlur);

        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = "#090e15";
        ctx.fillRect(0, 0, width, height);

        pulse += 0.014;
        const ambient = isMobile ? 0.04 + Math.sin(pulse) * 0.03 : 0;

        if (tiles.length === 0) measureTiles();

        const scrollParallax = scroll * 22;
        const minGap = 1;
        const cols = 14;
        const rowCount = Math.floor(tiles.length / cols);
        const shifts = tiles.map((tile) => {
          let shiftX = width ? ((tile.cx / width - 0.5) * scrollParallax) / dpr : 0;
          let shiftY = height ? ((tile.cy / height - 0.5) * scrollParallax * 0.55) / dpr : 0;
          let glow = 0;
          let dotDist = 0;
          if (!isMobile && cursor.active) {
            const dist = Math.hypot(tile.cx - cursor.x, tile.cy - cursor.y);
            glow = Math.max(0, 1 - dist / 240);
            dotDist = dist;
            const angle = Math.atan2(tile.cy - cursor.y, tile.cx - cursor.x);
            const liquid = glow * 10;
            shiftX += Math.cos(angle) * liquid;
            shiftY += Math.sin(angle) * liquid;
          }
          return { x: shiftX, y: shiftY, glow, dotDist };
        });

        const clampShift = (tile: Tile, shift: { x: number; y: number }) => {
          const minX = -tile.x;
          const minY = -tile.y;
          const maxX = Math.max(minX, width - tile.w - tile.x);
          const maxY = Math.max(minY, height - tile.h - tile.y);
          shift.x = Math.min(Math.max(shift.x, minX), maxX);
          shift.y = Math.min(Math.max(shift.y, minY), maxY);
        };

        for (let i = 0; i < tiles.length; i++) {
          const tile = tiles[i];
          const shift = shifts[i];
          if (tile && shift) clampShift(tile, shift);
        }

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
          const clamp = (value: number, lo: number, hi: number) =>
            Math.min(Math.max(value, lo), hi);
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

        const cursorHot = !isMobile && cursor.active && scroll <= 0.001;
        const hot = cursorHot ? new Uint8Array(tiles.length) : null;
        if (hot) {
          const reach = 256;
          for (let i = 0; i < tiles.length; i++) {
            const tile = tiles[i];
            if (!tile) continue;
            if (Math.hypot(tile.cx - cursor.x, tile.cy - cursor.y) <= reach) hot[i] = 1;
          }
          for (let row = 0; row < rowCount; row++) {
            for (let col = 0; col < cols; col++) {
              const i = row * cols + col;
              if (!hot[i]) continue;
              if (col + 1 < cols) hot[i + 1] = 1;
              if (col > 0) hot[i - 1] = 1;
              if (row + 1 < rowCount) hot[i + cols] = 1;
              if (row > 0) hot[i - cols] = 1;
            }
          }
        }

        const needsSeparation = (!isMobile && cursor.active) || scroll > 0.001;
        if (needsSeparation && rowCount > 0 && tiles.length === rowCount * cols) {
          for (let pass = 0; pass < 6; pass++) {
            for (let row = 0; row < rowCount; row++) {
              for (let col = 0; col < cols; col++) {
                const i = row * cols + col;
                const touch = (j: number) => {
                  if (hot && !hot[i] && !hot[j]) return;
                  separate(i, j);
                };
                if (col + 1 < cols) touch(i + 1);
                if (row + 1 < rowCount) touch(i + cols);
                if (col + 1 < cols && row + 1 < rowCount) touch(i + cols + 1);
                if (col > 0 && row + 1 < rowCount) touch(i + cols - 1);
              }
            }
            for (let i = 0; i < tiles.length; i++) {
              const tile = tiles[i];
              const shift = shifts[i];
              if (tile && shift) clampShift(tile, shift);
            }
          }
        }

        tiles.forEach((tile, index) => {
          const { w, h, cx, cy } = tile;
          const shift = shifts[index];
          const shiftX = shift?.x ?? 0;
          const shiftY = shift?.y ?? 0;
          const glow = shift?.glow ?? 0;
          const dotDist = shift?.dotDist ?? 0;

          const tileX = tile.x + shiftX;
          const tileY = tile.y + shiftY;

          ctx.fillStyle = `rgba(255,255,255,${0.1 + glow * 0.08})`;
          ctx.beginPath();
          ctx.roundRect(tileX, tileY, w, h, tileRadius);
          ctx.fill();

          if (glow > 0.05) {
            ctx.save();
            ctx.strokeStyle = `rgba(180, 210, 255, ${glow * 0.22})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.roundRect(tileX + 0.5, tileY + 0.5, w - 1, h - 1, tileRadius);
            ctx.stroke();
            ctx.restore();
          }

          let dotAlpha = 0.2;
          if (!isMobile && cursor.active) {
            dotAlpha = 0.2 + Math.max(0, 1 - dotDist / 220) * 0.55;
          } else if (isMobile) {
            dotAlpha = 0.2 + ambient;
          }

          ctx.fillStyle = `rgba(209,213,219,${dotAlpha + glow * 0.15})`;
          ctx.beginPath();
          ctx.arc(cx + shiftX, cy + shiftY, 2, 0, Math.PI * 2);
          ctx.fill();
        });

        if (scroll > 0) {
          ctx.save();
          ctx.filter = `blur(${scroll * 4}px)`;
          ctx.globalAlpha = 0.35;
          ctx.fillStyle = "#090e15";
          ctx.fillRect(0, 0, width, height);
          ctx.restore();
        }

        blobs.forEach((blob) => {
          const homeX = blob.homeX * width;
          const homeY = blob.homeY * height;

          if (!isMobile && cursor.active) {
            const dx = cursor.x - blob.x;
            const dy = cursor.y - blob.y;
            const dist = Math.hypot(dx, dy);
            const pull = Math.max(0, 1 - dist / 480) * 0.045;
            blob.x += dx * pull;
            blob.y += dy * pull;
          }

          const drift = isMobile ? Math.sin(pulse + blob.phase) * 10 : 0;
          blob.x += (homeX + drift - blob.x) * 0.05;
          blob.y += (homeY + drift * 0.4 - blob.y) * 0.05;
        });

        drawMetaballs();
        if (!gridHidden) {
          gridHidden = true;
          const grid = container.querySelector<HTMLElement>(".interactive-hero__grid");
          if (grid) grid.style.display = "none";
        }

        if (onScreen && shouldKeepPainting()) {
          loopActive = true;
          raf = requestAnimationFrame(draw);
        } else {
          loopActive = false;
        }
      };

      const shouldKeepPainting = () => {
        if (!onScreen) return false;
        if (isMobile) return true;
        if (cursor.active) return true;
        if (Math.hypot(lensX - width * 0.5, lensY - height * 0.5) > 0.6) return true;
        return blobs.some((blob) => {
          const homeX = blob.homeX * width;
          const homeY = blob.homeY * height;
          return Math.hypot(blob.x - homeX, blob.y - homeY) > 0.6;
        });
      };

      const ensureLoop = () => {
        if (!onScreen || loopActive) return;
        loopActive = true;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(draw);
      };

      const stopLoop = () => {
        onScreen = false;
        loopActive = false;
        cancelAnimationFrame(raf);
      };

      const onScroll = () => {
        updateScrollProgress();
        bounds = container.getBoundingClientRect();
        ensureLoop();
      };

      const visibility = new IntersectionObserver(([entry]) => {
        if (entry?.isIntersecting) {
          onScreen = true;
          ensureLoop();
          if (!loopActive) draw();
        } else {
          stopLoop();
        }
      });

      const ro = new ResizeObserver(resize);
      let bootId = 0;

      const boot = () => {
        blobs.forEach((blob) => makeSprite(blob.r));
        resize();
        const visibleNow = container.getBoundingClientRect();
        if (visibleNow.bottom > 0 && visibleNow.top < window.innerHeight) {
          onScreen = true;
          draw();
        }
        ro.observe(container);
        visibility.observe(container);
        window.addEventListener("resize", resize);
        window.addEventListener("scroll", onScroll, { passive: true });
        container.addEventListener("mousemove", onMove);
        container.addEventListener("mouseleave", onLeave);

        teardown = () => {
          stopLoop();
          visibility.disconnect();
          ro.disconnect();
          window.removeEventListener("resize", resize);
          window.removeEventListener("scroll", onScroll);
          container.removeEventListener("mousemove", onMove);
          container.removeEventListener("mouseleave", onLeave);
        };
      };

      bootId = requestAnimationFrame(boot);

    return () => {
      cancelAnimationFrame(bootId);
      teardown();
    };
  }, []);

  const scrollToWork = () => {
    onEnterWork?.();
  };

  return (
    <section
      ref={containerRef}
      className="interactive-hero relative flex h-dvh min-h-dvh w-full shrink-0 flex-col overflow-hidden bg-[#090e15] font-sans text-white"
      data-name="interactive-hero"
      style={
        {
          backgroundColor: "#090e15",
          color: "#ffffff",
          "--hero-scroll": 0,
          "--hero-lens-x": "50%",
          "--hero-lens-y": "50%",
          "--hero-cursor-blur": "0px",
          "--hero-cursor-active": 0,
        } as CSSProperties
      }
    >
      <div aria-hidden className="interactive-hero__grid">
        {Array.from({ length: HERO_GRID_CELLS }, (_, index) => (
          <span key={index} />
        ))}
      </div>
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-[1]"
        aria-hidden
      />

      <div
        aria-hidden
        className="interactive-hero__liquid-lens pointer-events-none absolute z-[2]"
      />

      {/* Figma 1769:208015 — full-frame progressive background blur */}
      <div
        aria-hidden
        className="interactive-hero__frost pointer-events-none absolute inset-0 z-[3] bg-[rgba(255,255,255,0.03)] backdrop-blur-[18px]"
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
          onClick={scrollToWork}
          aria-label="Scroll to selected work"
          className="interactive-hero__toggle relative h-[42px] w-[87px] shrink-0 cursor-pointer active:scale-[0.94]"
        >
          <img
            src={heroToggle}
            alt=""
            aria-hidden
            className="interactive-hero__toggle-rest absolute inset-0 size-full max-w-none"
          />
          <span className="interactive-hero__toggle-hover" aria-hidden>
            <img src={heroToggleKnobHover} alt="" className="size-8 shrink-0" />
            <span>Press</span>
          </span>
        </button>
      </div>
    </section>
  );
}
