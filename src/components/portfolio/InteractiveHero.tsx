import { type CSSProperties, useEffect, useRef } from "react";
import heroLogo from "@/assets/portfolio/hero/metaball-logo.svg";
import heroToggle from "@/assets/portfolio/hero/scroll-toggle.svg";

const HEADLINE = "Are you looking for me?";

/** WireframeStage jenga band — Figma 530:151045 @ 1258px */
const FIGMA_BAND_W = 1258;
const GRID_COLS = 14;
const GRID_GAP = 2;
const GRID_PAD = 2;
const GRID_RADIUS = 12;

type Blob = {
  homeX: number;
  homeY: number;
  x: number;
  y: number;
  r: number;
  phase: number;
};

type GridMetrics = {
  pad: number;
  gap: number;
  cell: number;
  radius: number;
  dotR: number;
};

function getGridMetrics(containerWidth: number): GridMetrics {
  const bandW = containerWidth - GRID_PAD * 2;
  const scale = bandW / FIGMA_BAND_W;
  const cell = (bandW - (GRID_COLS - 1) * GRID_GAP) / GRID_COLS;
  return {
    pad: GRID_PAD,
    gap: GRID_GAP,
    cell,
    radius: GRID_RADIUS * scale,
    dotR: 2 * scale,
  };
}

type InteractiveHeroProps = {
  onEnterWork?: () => void;
};

export function InteractiveHero({ onEnterWork }: InteractiveHeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollProgressRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
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
      const scroll = scrollProgressRef.current;
      const scrollParallax = scroll * 22;
      const grid = getGridMetrics(width);

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

      const { pad, gap, cell, radius, dotR } = grid;
      const step = cell + gap;

      for (let row = 0; ; row++) {
        const y = pad + row * step;
        if (y + cell > height + pad) break;

        for (let col = 0; col < GRID_COLS; col++) {
          const x = pad + col * step;
          if (x + cell > width + pad) continue;

          const cx = x + cell / 2;
          const cy = y + cell / 2;

          let shiftX = ((cx / width - 0.5) * scrollParallax) / dpr;
          let shiftY = ((cy / height - 0.5) * scrollParallax * 0.55) / dpr;

          let glow = 0;
          if (!isMobile && cursor.active) {
            const dist = Math.hypot(cx - cursor.x, cy - cursor.y);
            const influence = Math.max(0, 1 - dist / 240);
            glow = influence;
            const angle = Math.atan2(cy - cursor.y, cx - cursor.x);
            const liquid = influence * 10;
            shiftX += Math.cos(angle) * liquid;
            shiftY += Math.sin(angle) * liquid;
          }

          const tileX = x + shiftX;
          const tileY = y + shiftY;

          ctx.fillStyle = `rgba(255,255,255,${0.1 + glow * 0.08})`;
          ctx.beginPath();
          ctx.roundRect(tileX, tileY, cell, cell, radius);
          ctx.fill();

          if (glow > 0.05) {
            ctx.save();
            ctx.strokeStyle = `rgba(180, 210, 255, ${glow * 0.22})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.roundRect(tileX + 0.5, tileY + 0.5, cell - 1, cell - 1, radius);
            ctx.stroke();
            ctx.restore();
          }

          let dotAlpha = 0.2;
          if (!isMobile && cursor.active) {
            const dist = Math.hypot(cx - cursor.x, cy - cursor.y);
            dotAlpha = 0.2 + Math.max(0, 1 - dist / 220) * 0.55;
          } else if (isMobile) {
            dotAlpha = 0.2 + ambient;
          }

          ctx.fillStyle = `rgba(209,213,219,${dotAlpha + glow * 0.15})`;
          ctx.beginPath();
          ctx.arc(cx + shiftX, cy + shiftY, dotR, 0, Math.PI * 2);
          ctx.fill();
        }
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

    const onScroll = () => updateScrollProgress();

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    container.addEventListener("mousemove", onMove);
    container.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const scrollToWork = () => {
    onEnterWork?.();
  };

  return (
    <section
      ref={containerRef}
      className="interactive-hero relative min-h-screen w-full overflow-hidden bg-[#090e15] text-white"
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

      <nav className="relative z-10 mx-auto flex w-full max-w-[1106px] items-center justify-between px-6 pt-24 sm:px-10 sm:pt-[139px]">
        <img
          src={heroLogo}
          alt=""
          aria-hidden
          className="h-[88px] w-[96px] shrink-0 object-contain sm:h-[110px] sm:w-[121px]"
        />
        <div className="text-right text-[rgba(255,255,255,0.6)]">
          <p className="text-base sm:text-[20px]">Ana.R Design</p>
          <p className="text-[11px] sm:text-[12px]">Product Designer</p>
        </div>
      </nav>

      <div className="interactive-hero__content relative z-10 mx-auto flex min-h-[calc(100vh-220px)] max-w-[593px] flex-col items-center justify-center gap-[42px] px-6 pb-20 pt-10 text-center sm:pb-16">
        <h1 className="w-full text-[clamp(36px,6vw,56px)] font-normal leading-normal text-[rgba(255,255,255,0.6)]">
          {HEADLINE}
        </h1>

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
