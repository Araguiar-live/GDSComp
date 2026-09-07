import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, type RefObject } from "react";
import skipStone from "@/assets/portfolio/skip-stone.svg";

type Ripple = {
  x: number;
  y: number;
  born: number;
  maxRadius: number;
  intensity: number;
};

type Segment = {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  apex: number;
  duration: number;
  contactRipple?: boolean;
};

const STONE_W = 32;
const STONE_H = 36;
const EASE = (t: number) => 1 - Math.pow(1 - t, 2.2);

function parabolicPoint(
  t: number,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  apex: number,
) {
  const x = x0 + (x1 - x0) * t;
  const linearY = y0 + (y1 - y0) * t;
  const arc = -4 * apex * t * (1 - t);
  return { x, y: linearY + arc };
}

function tangentAngle(
  t: number,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  apex: number,
) {
  const dt = 0.02;
  const t0 = Math.max(0, t - dt);
  const t1 = Math.min(1, t + dt);
  const p0 = parabolicPoint(t0, x0, y0, x1, y1, apex);
  const p1 = parabolicPoint(t1, x0, y0, x1, y1, apex);
  return (Math.atan2(p1.y - p0.y, p1.x - p0.x) * 180) / Math.PI;
}

function buildSegments(origin: DOMRect, accordion: DOMRect): Segment[] {
  const ox = origin.left + origin.width / 2;
  const oy = origin.top + origin.height / 2;
  const edgeY = accordion.top + 2;
  const left = accordion.left + 24;
  const right = accordion.right - 24;
  const width = right - left;

  const contactXs = [0.1, 0.28, 0.48, 0.68, 0.88].map((f) => left + width * f);
  const segments: Segment[] = [];

  segments.push({
    x0: ox,
    y0: oy,
    x1: contactXs[0],
    y1: edgeY,
    apex: Math.min(120, Math.abs(oy - edgeY) * 0.55 + 36),
    duration: 520,
    contactRipple: true,
  });

  for (let i = 0; i < contactXs.length - 1; i += 1) {
    segments.push({
      x0: contactXs[i],
      y0: edgeY,
      x1: contactXs[i + 1],
      y1: edgeY,
      apex: 22 - i * 3.5,
      duration: 340 - i * 28,
      contactRipple: true,
    });
  }

  segments.push({
    x0: contactXs[contactXs.length - 1],
    y0: edgeY,
    x1: right + width * 0.35,
    y1: edgeY - 48,
    apex: 14,
    duration: 380,
    contactRipple: true,
  });

  return segments;
}

function drawRipples(ctx: CanvasRenderingContext2D, ripples: Ripple[], now: number) {
  for (const ripple of ripples) {
    const age = now - ripple.born;
    const progress = age / 900;
    if (progress > 1) continue;

    const rings = 3;
    for (let i = 0; i < rings; i += 1) {
      const ringProgress = Math.max(0, progress - i * 0.12);
      if (ringProgress > 1) continue;

      const radius = ripple.maxRadius * ringProgress;
      const alpha = (1 - ringProgress) * ripple.intensity * 0.55;

      ctx.strokeStyle = `rgba(96, 165, 250, ${alpha})`;
      ctx.lineWidth = Math.max(0.5, 2.2 - ringProgress * 1.6);
      ctx.beginPath();
      ctx.ellipse(ripple.x, ripple.y, radius, radius * 0.28, 0, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = `rgba(186, 230, 253, ${alpha * 0.65})`;
      ctx.lineWidth = Math.max(0.4, 1.4 - ringProgress);
      ctx.beginPath();
      ctx.ellipse(ripple.x, ripple.y + 2, radius * 0.82, radius * 0.22, 0, 0, Math.PI * 2);
      ctx.stroke();
    }

    if (progress < 0.35) {
      const splash = (1 - progress / 0.35) * ripple.intensity;
      const grad = ctx.createRadialGradient(ripple.x, ripple.y, 0, ripple.x, ripple.y, 18);
      grad.addColorStop(0, `rgba(255, 255, 255, ${splash * 0.35})`);
      grad.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.ellipse(ripple.x, ripple.y, 18, 8, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function drawEdgeWave(
  ctx: CanvasRenderingContext2D,
  accordion: DOMRect,
  phase: number,
  strength: number,
) {
  if (strength <= 0) return;

  const left = accordion.left;
  const right = accordion.right;
  const y = accordion.top + 1;
  const width = right - left;

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(left, y);

  const steps = 48;
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    const x = left + width * t;
    const wave =
      Math.sin(t * Math.PI * 5 + phase) * 2.5 * strength +
      Math.sin(t * Math.PI * 11 - phase * 1.4) * 1.2 * strength;
    ctx.lineTo(x, y + wave);
  }

  ctx.strokeStyle = `rgba(147, 197, 253, ${0.22 * strength})`;
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.restore();
}

interface Props {
  accordionRef: RefObject<HTMLElement | null>;
  /** Increment to fire a new skip sequence. */
  signal: number;
  originRef: RefObject<HTMLElement | null>;
  onActiveChange?: (active: boolean) => void;
}

export function StoneSkipRipple({ accordionRef, signal, originRef, onActiveChange }: Props) {
  const reduceMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stoneRef = useRef<HTMLImageElement>(null);
  const ripplesRef = useRef<Ripple[]>([]);
  const rafRef = useRef(0);
  const lastSignalRef = useRef(0);

  useEffect(() => {
    if (reduceMotion || signal === 0 || signal === lastSignalRef.current) return;
    lastSignalRef.current = signal;

    const accordion = accordionRef.current;
    const origin = originRef.current;
    const canvas = canvasRef.current;
    const stone = stoneRef.current;
    if (!accordion || !origin || !canvas || !stone) return;

    const accordionRect = accordion.getBoundingClientRect();
    const originRect = origin.getBoundingClientRect();
    const segments = buildSegments(originRect, accordionRect);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    let cancelled = false;
    let segIndex = 0;
    let segStart = 0;
    let wavePhase = 0;
    let waveStrength = 0;
    onActiveChange?.(true);
    accordion.classList.add("crcle-accordion-skip-active");

    stone.style.opacity = "1";
    stone.style.visibility = "visible";

    const spawnRipple = (x: number, y: number, intensity = 1) => {
      ripplesRef.current.push({
        x,
        y,
        born: performance.now(),
        maxRadius: 36 + intensity * 18,
        intensity,
      });
    };

    const finish = () => {
      cancelled = true;
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      stone.style.opacity = "0";
      stone.style.visibility = "hidden";
      ripplesRef.current = [];
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      accordion.classList.remove("crcle-accordion-skip-active");
      onActiveChange?.(false);
    };

    const frame = (now: number) => {
      if (cancelled) return;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      wavePhase += 0.14;
      waveStrength = Math.max(0, waveStrength - 0.018);
      drawEdgeWave(ctx, accordionRect, wavePhase, waveStrength);
      drawRipples(ctx, ripplesRef.current, now);
      ripplesRef.current = ripplesRef.current.filter((r) => now - r.born < 950);

      const segment = segments[segIndex];
      if (!segment) {
        finish();
        return;
      }

      if (!segStart) segStart = now;
      const elapsed = now - segStart;
      const t = Math.min(1, elapsed / segment.duration);
      const eased = EASE(t);
      const point = parabolicPoint(
        eased,
        segment.x0,
        segment.y0,
        segment.x1,
        segment.y1,
        segment.apex,
      );
      const angle = tangentAngle(
        eased,
        segment.x0,
        segment.y0,
        segment.x1,
        segment.y1,
        segment.apex,
      );

      stone.style.transform = `translate(${point.x - STONE_W / 2}px, ${point.y - STONE_H / 2}px) rotate(${angle + 12}deg)`;

      if (t >= 1) {
        if (segment.contactRipple) {
          spawnRipple(segment.x1, segment.y1 + 2, 1 - segIndex * 0.08);
          waveStrength = Math.min(1, waveStrength + 0.55);
        }
        segIndex += 1;
        segStart = 0;
        if (segIndex >= segments.length) {
          window.setTimeout(finish, 420);
          return;
        }
      }

      rafRef.current = requestAnimationFrame(frame);
    };

    window.addEventListener("resize", resize);
    rafRef.current = requestAnimationFrame(frame);

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      accordion.classList.remove("crcle-accordion-skip-active");
      onActiveChange?.(false);
    };
  }, [accordionRef, originRef, onActiveChange, reduceMotion, signal]);

  if (reduceMotion) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[45]"
      />
      <img
        ref={stoneRef}
        src={skipStone}
        alt=""
        aria-hidden
        draggable={false}
        className="pointer-events-none fixed left-0 top-0 z-[46] size-8 opacity-0"
        style={{ width: STONE_W, height: STONE_H, visibility: "hidden" }}
      />
    </>
  );
}
