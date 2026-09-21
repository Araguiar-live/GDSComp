import { ChevronDown } from "lucide-react";
import { useEffect, useRef } from "react";
import footerLogo from "@/assets/portfolio/footer/logo.svg";

const HEADLINE = "Are you looking for me?";
const SUBTITLE =
  "Product Designer & Design Engineer crafting high-density B2B systems, tokenized design architectures, and code-backed prototypes.";

type Blob = {
  homeX: number;
  homeY: number;
  x: number;
  y: number;
  r: number;
  phase: number;
};

export function InteractiveHero() {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#0A0A0C";
      ctx.fillRect(0, 0, width, height);

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

          ctx.fillStyle = "rgba(255,255,255,0.1)";
          ctx.beginPath();
          ctx.roundRect(x, y, w, h, radius);
          ctx.fill();

          const cx = x + w / 2;
          const cy = y + h / 2;
          let dotAlpha = 0.2;

          if (!isMobile && cursor.active) {
            const dist = Math.hypot(cx - cursor.x, cy - cursor.y);
            dotAlpha = 0.2 + Math.max(0, 1 - dist / 220) * 0.55;
          } else if (isMobile) {
            dotAlpha = 0.2 + ambient;
          }

          ctx.fillStyle = `rgba(209,213,219,${dotAlpha})`;
          ctx.beginPath();
          ctx.arc(cx, cy, 2, 0, Math.PI * 2);
          ctx.fill();
        }
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

    resize();
    window.addEventListener("resize", resize);
    container.addEventListener("mousemove", onMove);
    container.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const scrollToWork = () => {
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      className="interactive-hero relative min-h-screen w-full overflow-hidden bg-[#0A0A0C] text-white"
      data-name="interactive-hero"
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-[1]"
        aria-hidden
      />

      <div
        aria-hidden
        className="interactive-hero__frost pointer-events-none absolute left-1/2 top-1/2 z-[2] h-[min(1037px,100%)] w-[min(1447px,100%)] -translate-x-1/2 -translate-y-1/2 bg-white/[0.03] backdrop-blur-[18px]"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1106px] items-center justify-between px-6 pt-24 sm:px-10 sm:pt-[139px]">
        <img
          src={footerLogo}
          alt=""
          aria-hidden
          className="h-[88px] w-[96px] object-contain opacity-90 sm:h-[110px] sm:w-[121px]"
        />
        <div className="text-right text-white/60">
          <p className="text-base sm:text-[20px]">Ana.R Design</p>
          <p className="text-[11px] sm:text-[12px]">Product Designer</p>
        </div>
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-220px)] max-w-[593px] flex-col items-center justify-center gap-10 px-6 pb-20 pt-10 text-center sm:pb-16">
        <div className="flex flex-col items-center gap-[42px]">
          <h1 className="text-[clamp(36px,6vw,56px)] font-normal leading-none text-white/60">
            {HEADLINE}
          </h1>
          <p className="max-w-[540px] text-[14px] leading-[22px] text-white/45">{SUBTITLE}</p>
        </div>

        <button
          type="button"
          onClick={scrollToWork}
          className="group inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-white/70 backdrop-blur-md transition hover:border-white/25 hover:bg-white/[0.08] hover:text-white/90"
        >
          <span className="relative flex size-2 shrink-0">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400/60 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.75)]" />
          </span>
          Explore Selected Work
          <ChevronDown
            className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-y-0.5"
            strokeWidth={1.75}
            aria-hidden
          />
        </button>
      </div>
    </section>
  );
}
