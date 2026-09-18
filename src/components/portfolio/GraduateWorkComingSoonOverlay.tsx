import { motion } from "framer-motion";
import { useEffect } from "react";
import closeCircleIcon from "@/assets/portfolio/graduate/close-circle.svg";
import searchArrowIcon from "@/assets/portfolio/graduate/search-arrow.svg";
import {
  GRADUATE_PROJECTS,
  type GraduateProject,
} from "@/components/portfolio/graduateProjects";

const EASE = [0.22, 1, 0.36, 1] as const;
const FONT = "Montserrat, ui-sans-serif, system-ui, sans-serif";

/** Figma 1659:207548 — industrial design graduate overlay + escalator project rail. */
export function GraduateWorkComingSoonOverlay({ onClose }: { onClose: () => void }) {
  const featured = GRADUATE_PROJECTS.find((p) => p.id === "poqy") ?? GRADUATE_PROJECTS[1];
  const leftRail = GRADUATE_PROJECTS.filter((p) =>
    (["artaeka", "strolla", "roamer"] as const).includes(p.id),
  );
  const rightRail = GRADUATE_PROJECTS.filter((p) =>
    (["poqy", "beese"] as const).includes(p.id),
  );

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
      className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 md:p-8"
    >
      <button
        type="button"
        aria-label="Close graduate work"
        onClick={onClose}
        className="absolute inset-0 cursor-default border-0 bg-zinc-950/50 backdrop-blur-[8px]"
      />

      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: 0.32, ease: EASE }}
        className="graduate-work-overlay relative z-[1] flex max-h-[min(920px,calc(100vh-1.5rem))] w-full max-w-[1100px] flex-col gap-4 overflow-hidden rounded-[28px] bg-white/20 p-4 shadow-[0_28px_80px_rgba(11,14,20,0.35)] backdrop-blur-[12px] sm:gap-5 sm:rounded-[36px] sm:p-6 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex shrink-0 items-start justify-between gap-3 rounded-[24px] bg-[rgba(9,14,21,0.5)] p-4 sm:gap-4 sm:rounded-[32px] sm:p-6">
          <div className="min-w-0 flex-1 leading-[1.2] text-white">
            <p
              className="text-[10px] font-normal uppercase tracking-[0.12em] text-white/80 sm:text-[13px] sm:tracking-normal sm:normal-case"
              style={{ fontFamily: FONT }}
            >
              Industrial Design Graduate Work
            </p>
            <h2
              className="mt-1 text-[22px] font-medium tracking-tight sm:mt-2 sm:text-[32px] md:text-[42px] lg:text-[52px]"
              style={{ fontFamily: FONT }}
            >
              Oh... I also do Industrial Design
            </h2>
          </div>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="shrink-0 transition hover:opacity-80"
          >
            <img alt="" src={closeCircleIcon} className="size-8 sm:size-9" draggable={false} />
          </button>
        </header>

        <p
          className="shrink-0 px-1 text-[12px] leading-[1.35] text-white/60 sm:text-[14px] md:text-[16px]"
          style={{ fontFamily: FONT }}
        >
          Physical product explorations from my Industrial Design Technology degree at
          Loughborough — tactile interfaces, street hardware, and objects that bridge digital
          intent with material craft. Case studies are being prepared for the portfolio.
        </p>

        <div className="flex min-h-0 flex-1 flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-6">
          <div className="relative min-h-[200px] flex-1 overflow-hidden rounded-[24px] sm:min-h-[260px] sm:rounded-[32px] lg:min-h-0">
            <img
              alt={`${featured.title} — featured graduate project`}
              src={featured.hero}
              className="absolute inset-0 size-full object-cover"
              draggable={false}
            />
            <div className="pointer-events-none absolute inset-0 bg-black/10 backdrop-blur-[1px]" />
            <div className="absolute right-3 top-3 rounded-[16px] bg-black/10 px-3 py-2 backdrop-blur-[4px] sm:right-4 sm:top-4 sm:px-4 sm:py-3">
              <span
                className="text-[12px] text-white sm:text-[14px] md:text-[16px]"
                style={{ fontFamily: FONT }}
              >
                Coming Soon
              </span>
            </div>
          </div>

          <div className="graduate-escalator-rail relative flex h-[220px] shrink-0 gap-3 overflow-hidden sm:h-[280px] sm:gap-4 lg:h-auto lg:w-[min(42%,320px)] lg:min-w-[240px]">
            <EscalatorColumn projects={leftRail} direction="up" duration={28} />
            <EscalatorColumn projects={rightRail} direction="down" duration={22} offset />
          </div>
        </div>

        <p
          className="shrink-0 text-center text-[10px] text-white/45 sm:text-[11px]"
          style={{ fontFamily: FONT }}
        >
          Press Esc to return to the portfolio
        </p>
      </motion.div>
    </motion.div>
  );
}

function EscalatorColumn({
  projects,
  direction,
  duration,
  offset = false,
}: {
  projects: GraduateProject[];
  direction: "up" | "down";
  duration: number;
  offset?: boolean;
}) {
  const loop = [...projects, ...projects];

  return (
    <div
      className={`graduate-escalator-column relative min-w-0 flex-1 overflow-hidden ${offset ? "pt-8 sm:pt-12" : ""}`}
    >
      <div
        className={`graduate-escalator-track graduate-escalator-track--${direction}`}
        style={{ animationDuration: `${duration}s` }}
      >
        {loop.map((project, index) => (
          <ProjectEscalatorCard key={`${project.id}-${index}`} project={project} />
        ))}
      </div>
    </div>
  );
}

function ProjectEscalatorCard({ project }: { project: GraduateProject }) {
  return (
    <div className="graduate-escalator-card relative mb-3 aspect-[584/634] w-full shrink-0 overflow-hidden rounded-[20px] sm:mb-4 sm:rounded-[24px]">
      <img
        alt={project.title}
        src={project.hero}
        className="absolute inset-0 size-full object-cover"
        draggable={false}
      />
      <div className="absolute inset-0 bg-black/25" aria-hidden />
      <div className="absolute bottom-2 left-2 flex items-center rounded-[20px] bg-white/30 px-2.5 py-3 backdrop-blur-[2px] sm:bottom-3 sm:left-3 sm:px-2.5 sm:py-4">
        <img alt="" src={searchArrowIcon} className="size-5 sm:size-8" draggable={false} />
      </div>
    </div>
  );
}
