import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import industrialDesignHero from "@/assets/portfolio/graduate/industrial-design-hero.png";

const EASE = [0.22, 1, 0.36, 1] as const;
const FONT = "Montserrat, ui-sans-serif, system-ui, sans-serif";

/** Figma 1391:214737 — graduate folder preview with a single hero image + coming soon. */
export function GraduateWorkComingSoonOverlay({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Industrial Design Graduate Work"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22, ease: EASE }}
      className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-8"
    >
      <button
        type="button"
        aria-label="Close graduate work"
        onClick={onClose}
        className="absolute inset-0 cursor-default border-0 bg-zinc-950/45 backdrop-blur-[6px]"
      />

      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: 0.3, ease: EASE }}
        className="relative z-[1] flex max-h-[min(720px,calc(100vh-2rem))] w-full max-w-[720px] flex-col overflow-hidden rounded-[28px] border border-white/30 bg-white/72 shadow-[0_28px_80px_rgba(11,14,20,0.22),inset_0_1px_0_rgba(255,255,255,0.65)] backdrop-blur-[18px] supports-[backdrop-filter]:bg-white/60"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex shrink-0 items-start justify-between gap-4 border-b border-zinc-900/8 px-5 py-4 sm:px-7 sm:py-5">
          <div className="min-w-0">
            <p
              className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500"
              style={{ fontFamily: FONT }}
            >
              Industrial Design
            </p>
            <h2
              className="text-[22px] font-semibold tracking-tight text-zinc-900 sm:text-[26px]"
              style={{ fontFamily: FONT }}
            >
              Graduate Work
            </h2>
          </div>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="flex size-10 shrink-0 items-center justify-center rounded-full border border-zinc-900/10 bg-white/80 text-zinc-700 shadow-sm transition hover:bg-white hover:text-zinc-900"
          >
            <X className="size-4" strokeWidth={2} />
          </button>
        </header>

        <div className="relative min-h-[280px] flex-1 overflow-hidden bg-[#e8edf2] sm:min-h-[360px]">
          <img
            alt="Roamer — Transport for London busking hardware"
            src={industrialDesignHero}
            className="absolute inset-0 size-full object-cover object-left-center"
            draggable={false}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/55 via-zinc-950/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 px-5 pb-6 pt-16 sm:px-7 sm:pb-8">
            <span
              className="w-fit rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-700 shadow-sm"
              style={{ fontFamily: FONT }}
            >
              Coming soon
            </span>
            <p
              className="max-w-md text-[13px] leading-relaxed text-white/90 sm:text-[14px]"
              style={{ fontFamily: FONT }}
            >
              Physical product explorations from my Industrial Design Technology degree at
              Loughborough — case studies are being prepared for the portfolio.
            </p>
          </div>
        </div>

        <p
          className="shrink-0 px-5 py-3 text-[11px] leading-relaxed text-zinc-500 sm:px-7"
          style={{ fontFamily: FONT }}
        >
          Press Esc to return to the portfolio.
        </p>
      </motion.div>
    </motion.div>
  );
}
