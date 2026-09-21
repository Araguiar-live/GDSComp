import { type CSSProperties, useEffect, useRef } from "react";
import heroLogo from "@/assets/portfolio/hero/metaball-logo.svg";
import heroToggle from "@/assets/portfolio/hero/scroll-toggle.svg";

const HEADLINE = "Are you looking for me?";

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
      const parallax = scroll * 22;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#090e15";
      ctx.fillRect(0, 0, width, height);

      if (scroll > 0) {
        ctx.filter = `blur(${scroll * 5}px)`;
      }

      pulse += 0.014;
      const ambient = isMobile ? 0.04 + Math.sin(pulse) * 0.03 : 0;

      const cell = 88;
      const gap = 2;
      const radius = 12;

      for (let y = gap; y < height; y += cell + gap) {
        for (let x = gap; x < width; x += cell + gap) {
          const w = Math.min(cell, width - x - gap);
          const h = Math.min(cell, height - y - gap);
          if (w <= 0 || h <= 0) continue;

          const cx = x + w / 2;
          const cy = y + h / 2;
          const shiftX = ((cx / width - 0.5) * parallax) / dpr;
          const shiftY = ((cy / height - 0.5) * parallax * 0.55) / dpr;

          ctx.fillStyle = "rgba(255,255,255,0.1)";
          ctx.beginPath();
          ctx.roundRect(x + shiftX, y + shiftY, w, h, radius);
          ctx.fill();

          let dotAlpha = 0.2;
          if (!isMobile && cursor.active) {
            const dist = Math.hypot(cx - cursor.x, cy - cursor.y);
            dotAlpha = 0.2 + Math.max(0, 1 - dist / 220) * 0.55;
          } else if (isMobile) {
            dotAlpha = 0.2 + ambient;
          }

          ctx.fillStyle = `rgba(209,213,219,${dotAlpha})`;
          ctx.beginPath();
          ctx.arc(cx + shiftX, cy + shiftY, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.filter = "none";

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
      style={{ "--hero-scroll": 0 } as CSSProperties}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-[1]"
        aria-hidden
      />

      <div
        aria-hidden
        className="interactive-hero__frost pointer-events-none absolute left-1/2 top-1/2 z-[2] h-[min(1037px,100%)] w-[min(1447px,100%)] -translate-x-1/2 -translate-y-1/2 bg-[rgba(255,255,255,0.03)]"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1106px] items-center justify-between px-6 pt-24 sm:px-10 sm:pt-[139px]">
        <img
          src={heroLogo}
          alt=""
          aria-hidden
          className="h-[88px] w-[96px] object-contain sm:h-[110px] sm:w-[121px]"
        />
        <div className="text-right text-[rgba(255,255,255,0.6)]">
          <p className="text-base sm:text-[20px]">Ana.R Design</p>
          <p className="text-[11px] sm:text-[12px]">Product Designer</p>
        </div>
      </div>

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
