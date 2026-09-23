import { type CSSProperties, useEffect, useRef, useState } from "react";
import heroLogo from "@/assets/portfolio/hero/metaball-logo.svg";
import heroToggle from "@/assets/portfolio/hero/scroll-toggle.svg";
import { HeroJengaGrid } from "@/components/portfolio/HeroJengaGrid";
import { HERO_JENGA_BAND_H, HERO_JENGA_BAND_W } from "@/lib/hero-jenga";

const HEADLINE = "Are you looking for me?";
const SUBTITLE =
  "Product Designer specialising in complex B2B platforms, design systems, and interactive prototypes.";

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
  const [canvasReady, setCanvasReady] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let cancelled = false;
    let teardown = () => {};

    const setupFrame = requestAnimationFrame(() => {
      if (cancelled) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      let raf = 0;
      let loopActive = false;
      let width = 0;
      let height = 0;
      let isMobile = window.innerWidth < 768;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cursor = { x: -1000, y: -1000, active: false };
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
        const jengaScale = Math.max(width / HERO_JENGA_BAND_W, height / HERO_JENGA_BAND_H);
        container.style.setProperty("--hero-jenga-scale", String(jengaScale));
        measureTiles();
      };

      const onMove = (event: MouseEvent) => {
        if (isMobile) return;
        const rect = container.getBoundingClientRect();
        cursor.x = event.clientX - rect.left;
        cursor.y = event.clientY - rect.top;
        cursor.active = true;
      };

      const onLeave = () => {
        cursor.active = false;
      };

      let pulse = 0;
      let revealed = false;

      type Tile = { x: number; y: number; w: number; h: number; cx: number; cy: number };
      let tiles: Tile[] = [];
      let tileRadius = 12;

      const measureTiles = () => {
        const gridEl = container.querySelector<HTMLElement>(".interactive-hero__grid");
        if (!gridEl) return;
        void gridEl.offsetHeight;
        const origin = canvas.getBoundingClientRect();
        const next: Tile[] = [];
        gridEl.querySelectorAll("[data-hero-tile]").forEach((span) => {
          const rect = span.getBoundingClientRect();
          if (rect.width < 1 || rect.height < 1) return;
          const x = rect.left - origin.left;
          const y = rect.top - origin.top;
          next.push({
            x,
            y,
            w: rect.width,
            h: rect.height,
            cx: x + rect.width / 2,
            cy: y + rect.height / 2,
          });
        });
        tiles = next;
        const first = gridEl.querySelector("[data-hero-tile]");
        if (first) {
          const radius = parseFloat(getComputedStyle(first).borderTopLeftRadius);
          if (radius > 0) tileRadius = radius;
        }
      };

      const drawMetaballs = () => {
        ctx.save();
        ctx.filter = "blur(22px)";
        ctx.globalCompositeOperation = "screen";

        blobs.forEach((blob) => {
          const gradient = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.r);
          const alpha = isMobile ? 0.12 + Math.sin(pulse + blob.phase) * 0.035 : 0.17;
          gradient.addColorStop(0, `rgba(255,255,255,${alpha})`);
          gradient.addColorStop(0.55, `rgba(255,255,255,${alpha * 0.35})`);
          gradient.addColorStop(1, "rgba(255,255,255,0)");
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(blob.x, blob.y, blob.r, 0, Math.PI * 2);
          ctx.fill();
        });

        ctx.restore();
      };

      const draw = () => {
        if (!loopActive) return;
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
          cursorBlur = 22;
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

        for (let pass = 0; pass < 6; pass++) {
          let hits = 0;
          for (let i = 0; i < tiles.length; i++) {
            for (let j = i + 1; j < tiles.length; j++) {
              const a = tiles[i];
              const b = tiles[j];
              if (!a || !b) continue;
              const margin = minGap + 1;
              if (
                a.x + a.w + margin < b.x ||
                b.x + b.w + margin < a.x ||
                a.y + a.h + margin < b.y ||
                b.y + b.h + margin < a.y
              ) {
                continue;
              }
              separate(i, j);
              hits++;
            }
          }
          for (let i = 0; i < tiles.length; i++) {
            const tile = tiles[i];
            const shift = shifts[i];
            if (tile && shift) clampShift(tile, shift);
          }
          if (hits === 0) break;
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
        if (!revealed) {
          revealed = true;
          requestAnimationFrame(() => {
            if (!cancelled) setCanvasReady(true);
          });
        }
        raf = requestAnimationFrame(draw);
      };

      const startLoop = () => {
        if (loopActive) return;
        loopActive = true;
        raf = requestAnimationFrame(draw);
      };

      const stopLoop = () => {
        loopActive = false;
        cancelAnimationFrame(raf);
      };

      const onScroll = () => updateScrollProgress();

      const visibility = new IntersectionObserver(([entry]) => {
        if (entry?.isIntersecting) startLoop();
        else stopLoop();
      });

      resize();
      const ro = new ResizeObserver(resize);
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
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(setupFrame);
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
          "--hero-scroll": 0,
          "--hero-lens-x": "50%",
          "--hero-lens-y": "50%",
          "--hero-cursor-blur": "0px",
          "--hero-cursor-active": 0,
        } as CSSProperties
      }
    >
      <div aria-hidden className="interactive-hero__grid">
        <div
          className="interactive-hero__jenga-stage"
          style={{ width: HERO_JENGA_BAND_W, height: HERO_JENGA_BAND_H }}
        >
          <HeroJengaGrid />
        </div>
      </div>
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-[1]"
        aria-hidden
        style={{ opacity: canvasReady ? 1 : 0, transition: "opacity 0.5s ease" }}
      />

      <div aria-hidden className="interactive-hero__liquid-lens pointer-events-none absolute z-[2]">
        <div className="interactive-hero__liquid-lens-glass" />
        <div className="interactive-hero__liquid-lens-chroma" />
      </div>

      {/* Figma 1769:208015 — layered refraction blur (not flat frost) */}
      <div aria-hidden className="interactive-hero__frost-stack pointer-events-none absolute inset-0 z-[3]">
        <div className="interactive-hero__frost-blur" />
        <div className="interactive-hero__frost-depth" />
        <div className="interactive-hero__frost-chroma" />
      </div>

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
          className="interactive-hero__toggle relative h-[42px] w-[87px] shrink-0 cursor-pointer transition-transform duration-300 hover:scale-[1.06] active:scale-[0.94]"
        >
          <img
            src={heroToggle}
            alt=""
            aria-hidden
            className="absolute inset-0 size-full max-w-none"
          />
        </button>
      </div>
    </section>
  );
}
