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

const ESCALATOR_RAIL: OverlayRailProject[] = [
  { id: "poqy", title: "Poqy", image: railPoqy },
  { id: "strolla", title: "Strolla", image: railStrolla },
  { id: "roamer", title: "Roamer", image: railRoamer },
  { id: "artaeka", title: "Artaeka", image: railArtaeka },
  { id: "beese", title: "Beese", image: railBeese },
];

/** Single-column loop — scaled from the original 3-up rail, 15% faster. */
const ESCALATOR_DURATION = (28 / 1.15) * (ESCALATOR_RAIL.length / 3);

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
        className="graduate-work-overlay relative z-[1] flex flex-col overflow-hidden shadow-[0_28px_80px_rgba(11,14,20,0.35)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          aria-hidden
          className="graduate-work-overlay__blur pointer-events-none absolute inset-0 bg-white/20 backdrop-blur-[12px]"
        />

        <div className="relative z-[1] flex flex-col gap-3 p-4">
          <header className="graduate-work-overlay__header flex shrink-0 items-start justify-between gap-3 bg-[rgba(9,14,21,0.5)] p-3">
            <div className="min-w-0 flex-1 leading-[1.2] tracking-[-0.41px] text-white">
              <p
                className="text-[clamp(10px,1.1vw,16px)] font-normal uppercase"
                style={{ fontFamily: FONT }}
              >
                Industrial Design Graduate Work
              </p>
              <h2
                className="mt-1 text-[clamp(18px,2.6vw,38px)] font-medium"
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
              <img alt="" src={closeCircleIcon} className="size-7" draggable={false} />
            </button>
          </header>

          <div className="flex flex-col gap-3">
            <p
              className="shrink-0 text-[clamp(10px,1.1vw,15px)] leading-[1.35] tracking-[-0.41px] text-white/60"
              style={{ fontFamily: FONT }}
            >
              Physical product explorations from my Industrial Design Technology degree at
              Loughborough — tactile interfaces, street hardware, and objects that bridge digital
              intent with material craft. Case studies are being prepared for the portfolio.
            </p>

            <div className="graduate-work-media gap-[clamp(8px,2vw,36px)]">
              <div className="graduate-work-hero relative">
                <img
                  alt="Artaeka — featured graduate project"
                  src={featuredHero}
                  className="graduate-work-hero__image absolute inset-0 size-full"
                  draggable={false}
                />
                <div className="pointer-events-none absolute inset-0 bg-black/10" />
                <div className="graduate-work-hero__badge absolute right-3 top-3 bg-black/10 px-3 py-2 backdrop-blur-[4px]">
                  <span
                    className="whitespace-nowrap text-[clamp(10px,1.1vw,14px)] leading-[1.2] tracking-[-0.41px] text-white"
                    style={{ fontFamily: FONT }}
                  >
                    Coming Soon
                  </span>
                </div>
              </div>

              <div className="graduate-escalator-rail h-full min-h-0 w-[clamp(64px,10.2%,120px)]">
                <EscalatorColumn
                  projects={ESCALATOR_RAIL}
                  direction="up"
                  duration={ESCALATOR_DURATION}
                />
              </div>
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
}: {
  projects: OverlayRailProject[];
  direction: "up" | "down";
  duration: number;
}) {
  const loop = [...projects, ...projects];

  return (
    <div className="graduate-escalator-column relative h-full min-h-0 w-full overflow-hidden">
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
    <div className="graduate-escalator-card relative mb-[clamp(10px,1.5vw,16px)] aspect-[584/634] w-full shrink-0">
      <img
        alt={project.title}
        src={project.image}
        className="graduate-escalator-card__image absolute inset-0 size-full"
        draggable={false}
      />
      <div className="absolute inset-0 rounded-[inherit] bg-black/20" aria-hidden />
      <div className="graduate-escalator-card__action">
        <img alt="" src={searchArrowIcon} className="graduate-escalator-card__action-icon" draggable={false} />
      </div>
    </div>
  );
}
