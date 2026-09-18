import { motion } from "framer-motion";
import { useEffect } from "react";
import closeCircleIcon from "@/assets/portfolio/graduate/close-circle.svg";
import featuredHero from "@/assets/portfolio/graduate/overlay/featured-hero.png";
import railArtaeka from "@/assets/portfolio/graduate/overlay/rail-artaeka.png";
import railBeese from "@/assets/portfolio/graduate/overlay/rail-beese.png";
import railPoqy from "@/assets/portfolio/graduate/overlay/rail-poqy.png";
import railRoamer from "@/assets/portfolio/graduate/overlay/rail-roamer.png";
import railStrolla from "@/assets/portfolio/graduate/overlay/rail-strolla.png";
import searchArrowIcon from "@/assets/portfolio/graduate/search-arrow.svg";

const EASE = [0.22, 1, 0.36, 1] as const;
const FONT = "Montserrat, ui-sans-serif, system-ui, sans-serif";

type OverlayRailProject = {
  id: string;
  title: string;
  image: string;
};

const LEFT_RAIL: OverlayRailProject[] = [
  { id: "poqy", title: "Poqy", image: railPoqy },
  { id: "strolla", title: "Strolla", image: railStrolla },
  { id: "artaeka", title: "Artaeka", image: railArtaeka },
];

const RIGHT_RAIL: OverlayRailProject[] = [
  { id: "roamer", title: "Roamer", image: railRoamer },
  { id: "beese", title: "Beese", image: railBeese },
];

/** Figma 1659:207548 — industrial design graduate overlay + escalator project rail. */
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
        className="graduate-work-overlay relative z-[1] flex max-h-[min(calc(100vh-1.5rem),1200px)] w-[min(96vw,1996px)] flex-col gap-6 overflow-hidden rounded-[36px] bg-white/20 p-[clamp(20px,4vw,64px)] shadow-[0_28px_80px_rgba(11,14,20,0.35)] backdrop-blur-[12px]"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex shrink-0 items-start justify-between gap-4 rounded-[32px] bg-[rgba(9,14,21,0.5)] p-6">
          <div className="min-w-0 flex-1 leading-[1.2] tracking-[-0.41px] text-white">
            <p
              className="text-[clamp(13px,1.6vw,24px)] font-normal uppercase"
              style={{ fontFamily: FONT }}
            >
              Industrial Design Graduate Work
            </p>
            <h2
              className="mt-2 text-[clamp(26px,4.2vw,64px)] font-medium"
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
            <img alt="" src={closeCircleIcon} className="size-9" draggable={false} />
          </button>
        </header>

        <div className="flex min-h-0 flex-1 flex-col gap-9">
          <p
            className="shrink-0 text-[clamp(13px,1.6vw,24px)] leading-[1.2] tracking-[-0.41px] text-white/60"
            style={{ fontFamily: FONT }}
          >
            Physical product explorations from my Industrial Design Technology degree at
            Loughborough — tactile interfaces, street hardware, and objects that bridge digital
            intent with material craft. Case studies are being prepared for the portfolio.
          </p>

          <div className="flex min-h-0 w-full flex-row items-stretch gap-[clamp(16px,3vw,58px)]">
            <div className="relative min-w-0 flex-[1512] overflow-hidden rounded-[32px]">
              <div className="relative aspect-[1512/832] w-full">
                <img
                  alt="Artaeka — featured graduate project"
                  src={featuredHero}
                  className="absolute inset-0 size-full object-cover"
                  draggable={false}
                />
                <div className="pointer-events-none absolute inset-0 bg-black/10" />
                <div className="absolute right-[clamp(12px,2vw,38px)] top-[clamp(12px,2vw,38px)] rounded-[20px] bg-black/10 px-4 py-4 backdrop-blur-[4px]">
                  <span
                    className="whitespace-nowrap text-[clamp(13px,1.6vw,24px)] leading-[1.2] tracking-[-0.41px] text-white"
                    style={{ fontFamily: FONT }}
                  >
                    Coming Soon
                  </span>
                </div>
              </div>
            </div>

            <div className="graduate-escalator-rail flex min-h-0 min-w-0 flex-[442] shrink-0 flex-row gap-[clamp(10px,2.2vw,42px)]">
              <EscalatorColumn projects={LEFT_RAIL} direction="up" duration={28} />
              <EscalatorColumn projects={RIGHT_RAIL} direction="down" duration={22} offset />
            </div>
          </div>
        </div>
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
  projects: OverlayRailProject[];
  direction: "up" | "down";
  duration: number;
  offset?: boolean;
}) {
  const loop = [...projects, ...projects];

  return (
    <div
      className={`graduate-escalator-column relative min-h-0 min-w-0 flex-1 overflow-hidden ${offset ? "graduate-escalator-column--offset" : ""}`}
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

function ProjectEscalatorCard({ project }: { project: OverlayRailProject }) {
  return (
    <div className="graduate-escalator-card relative mb-[clamp(10px,1.5vw,16px)] aspect-[584/634] w-full shrink-0 overflow-hidden rounded-[24px]">
      <img
        alt={project.title}
        src={project.image}
        className="absolute inset-0 size-full object-cover"
        draggable={false}
      />
      <div className="absolute inset-0 bg-black/20" aria-hidden />
      <div className="absolute bottom-0 left-0 flex items-center rounded-[24px] bg-white/30 p-4 backdrop-blur-[2px]">
        <img alt="" src={searchArrowIcon} className="size-8" draggable={false} />
      </div>
    </div>
  );
}
