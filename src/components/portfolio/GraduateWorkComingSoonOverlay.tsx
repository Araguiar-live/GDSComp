import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import industrialDesignHero from "@/assets/portfolio/graduate/industrial-design-hero.png";
import { GRADUATE_PROJECTS } from "@/components/portfolio/graduateProjects";

const EASE = [0.22, 1, 0.36, 1] as const;
const FONT = "Montserrat, ui-sans-serif, system-ui, sans-serif";

/** Figma 1391:214737 — full-screen graduate folder with blurred portfolio frame. */
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
        className="relative z-[1] flex max-h-[min(860px,calc(100vh-2rem))] w-full max-w-[980px] flex-col overflow-hidden rounded-[28px] border border-white/30 bg-white/72 shadow-[0_28px_80px_rgba(11,14,20,0.22),inset_0_1px_0_rgba(255,255,255,0.65)] backdrop-blur-[18px] supports-[backdrop-filter]:bg-white/60"
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
            <p
              className="mt-2 max-w-xl text-[13px] leading-relaxed text-zinc-600 sm:text-[14px]"
              style={{ fontFamily: FONT }}
            >
              Physical product explorations from my Industrial Design Technology degree at
              Loughborough — tactile interfaces, street hardware, and objects that bridge
              digital intent with material craft. Case studies are being prepared for the
              portfolio.
            </p>
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

        <div className="grid min-h-0 flex-1 grid-cols-1 overflow-hidden md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <div className="relative min-h-[220px] overflow-hidden bg-[#e8edf2] md:min-h-0">
            <img
              alt="Roamer — Transport for London busking hardware"
              src={industrialDesignHero}
              className="absolute inset-0 size-full object-cover object-left-center"
              draggable={false}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/35 md:to-white/55" />
          </div>

          <div className="flex min-h-0 flex-col overflow-y-auto px-4 py-4 sm:px-6 sm:py-5">
            <p
              className="mb-3 text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500"
              style={{ fontFamily: FONT }}
            >
              Projects · Coming soon
            </p>

            <ul className="flex flex-col gap-2">
              {GRADUATE_PROJECTS.map((project) => (
                <li
                  key={project.id}
                  className="flex items-center gap-3 rounded-[14px] border border-zinc-900/6 bg-white/50 px-3 py-2.5"
                >
                  <span className="relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full">
                    <img
                      src={project.dot}
                      alt=""
                      width={36}
                      height={36}
                      className="size-full object-contain blur-[3px] brightness-95 saturate-50"
                      draggable={false}
                    />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p
                      className="truncate text-[14px] font-semibold tracking-tight text-zinc-900"
                      style={{ fontFamily: FONT }}
                    >
                      {project.title}
                    </p>
                    <p
                      className="truncate text-[11px] text-zinc-500 blur-[2px] select-none"
                      style={{ fontFamily: FONT }}
                      aria-hidden
                    >
                      {project.tag}
                    </p>
                  </div>
                  <span
                    className="shrink-0 rounded-full bg-zinc-900/[0.06] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-500"
                    style={{ fontFamily: FONT }}
                  >
                    Coming soon
                  </span>
                </li>
              ))}
            </ul>

            <p
              className="mt-4 text-[11px] leading-relaxed text-zinc-500"
              style={{ fontFamily: FONT }}
            >
              Press Esc to return to the portfolio.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
