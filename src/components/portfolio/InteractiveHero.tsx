import { type CSSProperties, useEffect, useLayoutEffect, useRef, useState } from "react";
import heroLogo from "@/assets/portfolio/hero/metaball-logo.svg";
import heroToggle from "@/assets/portfolio/hero/scroll-toggle.svg";
import heroToggleKnob from "@/assets/portfolio/hero/toggle-knob-hover.svg";
import { HeroJengaGrid } from "@/components/portfolio/HeroJengaGrid";
import { HERO_JENGA_BAND_H, HERO_JENGA_BAND_W } from "@/lib/hero-jenga";
import { jengaScaleForViewport } from "@/lib/hero-jenga-layout";
import {
  buildHeroTileNeighbors,
  solveHeroTileShifts,
  type HeroTileRect,
} from "@/lib/hero-tile-physics";

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
  const [toggleHover, setToggleHover] = useState(false);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const w = el.clientWidth;
    const h = el.clientHeight;
    if (w < 1 || h < 1) return;
    el.style.setProperty("--hero-jenga-scale", String(jengaScaleForViewport(w, h)));
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
        container.style.setProperty("--hero-jenga-scale", String(jengaScaleForViewport(width, height)));
        scheduleMeasureDomTiles();
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

      let tileEls: HTMLElement[] = [];
      let tiles: HeroTileRect[] = [];
      let tileNeighbors: number[][] = [];

      const measureDomTiles = () => {
        container.querySelectorAll<HTMLElement>("[data-hero-tile]").forEach((el) => {
          el.style.transform = "";
          el.style.boxShadow = "";
        });
        void container.offsetHeight;
        const origin = container.getBoundingClientRect();
        const nextEls: HTMLElement[] = [];
        const nextTiles: HeroTileRect[] = [];
        container.querySelectorAll<HTMLElement>("[data-hero-tile]").forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.width < 1 || rect.height < 1) return;
          const x = rect.left - origin.left;
          const y = rect.top - origin.top;
          nextEls.push(el);
          nextTiles.push({
            x,
            y,
            w: rect.width,
            h: rect.height,
            cx: x + rect.width / 2,
            cy: y + rect.height / 2,
          });
        });
        tileEls = nextEls;
        tiles = nextTiles;
        tileNeighbors = buildHeroTileNeighbors(tiles);
      };

      const scheduleMeasureDomTiles = () => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => measureDomTiles());
        });
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
          lensX += (cursor.x - lensX) * 0.18;
          lensY += (cursor.y - lensY) * 0.18;
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

        pulse += 0.014;

        if (tiles.length === 0 || tileEls.length !== tiles.length) measureDomTiles();

        if (tiles.length > 0 && tileEls.length === tiles.length) {
          const shifts = solveHeroTileShifts(tiles, tileNeighbors, width, height, cursor, isMobile);
          tileEls.forEach((el, index) => {
            const shift = shifts[index];
            if (!shift) return;
            el.style.transform = `translate(${shift.x}px, ${shift.y}px)`;
            const glow = shift.glow;
            el.style.boxShadow =
              glow > 0.05 ? `inset 0 0 0 1px rgba(180, 210, 255, ${glow * 0.22})` : "";
            el.style.backgroundColor =
              el.classList.contains("interactive-hero__tile--soft")
                ? `rgba(255,255,255,${0.05 + glow * 0.08})`
                : `rgba(255,255,255,${0.1 + glow * 0.08})`;
          });
        }

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
          className="interactive-hero__toggle relative z-20 inline-flex h-[42px] shrink-0 cursor-pointer items-center justify-center transition-transform duration-300 active:scale-[0.94]"
          onMouseEnter={() => setToggleHover(true)}
          onMouseLeave={() => setToggleHover(false)}
          onFocus={() => setToggleHover(true)}
          onBlur={() => setToggleHover(false)}
        >
          {toggleHover ? (
            <span
              aria-hidden
              className="interactive-hero__toggle-press inline-flex h-[42px] items-center gap-2 rounded-[64px] border border-[rgba(250,131,46,0.2)] bg-[rgba(255,81,38,0.4)] p-1 backdrop-blur-[4px]"
            >
              <img src={heroToggleKnob} alt="" className="size-8 shrink-0" />
              <span className="pr-2 text-xs text-[#ff5126]">Press</span>
            </span>
          ) : (
            <img
              src={heroToggle}
              alt=""
              aria-hidden
              className="interactive-hero__toggle-rest h-[42px] w-[87px] max-w-none"
            />
          )}
        </button>
      </div>
    </section>
  );
}
