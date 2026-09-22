import { type CSSProperties, useEffect, useLayoutEffect, useRef, useState } from "react";
import heroLogo from "@/assets/portfolio/hero/metaball-logo.svg";
import heroToggle from "@/assets/portfolio/hero/scroll-toggle.svg";
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
  const [canvasReady, setCanvasReady] = useState(false);

  useLayoutEffect(() => {
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
        const layout = heroGridLayout(container.clientWidth, container.clientHeight);
        gridEl.style.gridTemplateColumns = `repeat(${layout.cols}, ${layout.cellW}px)`;
        gridEl.style.gridTemplateRows = `repeat(${layout.rows}, ${layout.cellH}px)`;
        void gridEl.offsetHeight;
        const origin = canvas.getBoundingClientRect();
        const next: Tile[] = [];
        gridEl.querySelectorAll("span").forEach((span) => {
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
        const first = gridEl.querySelector("span");
        if (first) {
          const radius = parseFloat(getComputedStyle(first).borderTopLeftRadius);
          if (radius > 0) tileRadius = radius;
        }
      };

      const drawMetaballs = () => {
        ctx.save();
        ctx.filter = "blur(28px)";
        ctx.globalCompositeOperation = "screen";

        blobs.forEach((blob) => {
          const gradient = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.r);
          const alpha = isMobile ? 0.14 + Math.sin(pulse + blob.phase) * 0.04 : 0.22;
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

        tiles.forEach((tile) => {
          const { x, y, w, h, cx, cy } = tile;

          let shiftX = width ? ((cx / width - 0.5) * scrollParallax) / dpr : 0;
          let shiftY = height ? ((cy / height - 0.5) * scrollParallax * 0.55) / dpr : 0;
          let glow = 0;
          let dotDist = 0;
          if (!isMobile && cursor.active) {
            const dist = Math.hypot(cx - cursor.x, cy - cursor.y);
            glow = Math.max(0, 1 - dist / 240);
            dotDist = dist;
            const angle = Math.atan2(cy - cursor.y, cx - cursor.x);
            const liquid = glow * 10;
            shiftX += Math.cos(angle) * liquid;
            shiftY += Math.sin(angle) * liquid;
          }

          const tileX = x + shiftX;
          const tileY = y + shiftY;

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
        {Array.from({ length: HERO_GRID_CELLS }, (_, index) => (
          <span key={index} />
        ))}
      </div>
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-[1]"
        aria-hidden
        style={{ opacity: canvasReady ? 1 : 0, transition: "opacity 0.5s ease" }}
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
