import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import featuredHero from "@/assets/portfolio/graduate/overlay/featured-hero.png";
import beeseRail from "@/assets/portfolio/graduate/beese-synth.png";
import poqyRail from "@/assets/portfolio/graduate/poqy-device.png";
import roamerRail from "@/assets/portfolio/graduate/roamer-nfc.png";
import strollaRail from "@/assets/portfolio/graduate/strolla-hero.png";

const EASE = [0.22, 1, 0.36, 1] as const;
const FONT = "Montserrat, ui-sans-serif, system-ui, sans-serif";

type OverlayRailProject = {
  id: string;
  title: string;
  image: string;
};

const ESCALATOR_RAIL: OverlayRailProject[] = [
  { id: "poqy", title: "Poqy", image: poqyRail },
  { id: "strolla", title: "Strolla", image: strollaRail },
  { id: "roamer", title: "Roamer", image: roamerRail },
  { id: "artaeka", title: "Artaeka", image: featuredHero },
  { id: "beese", title: "Beese", image: beeseRail },
];

/** Single-column loop — scaled from the original 3-up rail, 15% faster. */
const ESCALATOR_DURATION = (28 / 1.15) * (ESCALATOR_RAIL.length / 3);

const UNAVAILABLE_NOTICE = "Not available yet.";
const UNAVAILABLE_NOTICE_MS = 2200;

/** Figma 1659:207548 — industrial design graduate overlay + escalator project rail. */
export function GraduateWorkComingSoonOverlay({ onClose }: { onClose: () => void }) {
  const [unavailableNotice, setUnavailableNotice] = useState(false);
  const noticeTimeoutRef = useRef<number | null>(null);

  const showUnavailableNotice = useCallback(() => {
    setUnavailableNotice(true);

    if (noticeTimeoutRef.current !== null) {
      window.clearTimeout(noticeTimeoutRef.current);
    }

    noticeTimeoutRef.current = window.setTimeout(() => {
      setUnavailableNotice(false);
      noticeTimeoutRef.current = null;
    }, UNAVAILABLE_NOTICE_MS);
  }, []);

  useEffect(() => {
    return () => {
      if (noticeTimeoutRef.current !== null) {
        window.clearTimeout(noticeTimeoutRef.current);
      }
    };
  }, []);

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

        <AnimatePresence>
          {unavailableNotice ? (
            <motion.output
              key="graduate-unavailable-notice"
              role="status"
              aria-live="polite"
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.98 }}
              transition={{ duration: 0.2, ease: EASE }}
              className="graduate-work-overlay__notice pointer-events-none absolute bottom-4 left-1/2 z-[4] -translate-x-1/2 whitespace-nowrap rounded-full border border-white/35 bg-zinc-900/88 px-4 py-2 text-[clamp(11px,1.1vw,13px)] font-medium tracking-[-0.2px] text-white shadow-[0_10px_28px_rgba(11,14,20,0.28)] backdrop-blur-md"
              style={{ fontFamily: FONT }}
            >
              {UNAVAILABLE_NOTICE}
            </motion.output>
          ) : null}
        </AnimatePresence>

        <div className="graduate-work-overlay__content relative z-[1] flex flex-col gap-3 p-4">
          <header className="graduate-work-overlay__header shrink-0 bg-[rgba(9,14,21,0.5)] pr-10">
            <div className="min-w-0 leading-[1.2] tracking-[-0.41px] text-white">
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
            <button type="button" aria-label="Close" onClick={onClose} className="graduate-work-overlay__close">
              <CloseCircleIcon className="graduate-work-overlay__close-icon" />
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

            <div className="graduate-work-media">
              <div className="graduate-work-media-stage">
                <div className="graduate-work-hero">
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

                <div className="graduate-escalator-rail">
                  <EscalatorColumn
                    projects={ESCALATOR_RAIL}
                    direction="up"
                    duration={ESCALATOR_DURATION}
                    onProjectPress={showUnavailableNotice}
                  />
                </div>
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
  onProjectPress,
}: {
  projects: OverlayRailProject[];
  direction: "up" | "down";
  duration: number;
  onProjectPress: () => void;
}) {
  const loop = [...projects, ...projects];

  return (
    <div className="graduate-escalator-column relative h-full min-h-0 overflow-hidden">
      <div
        className={`graduate-escalator-track graduate-escalator-track--${direction}`}
        style={{ animationDuration: `${duration}s` }}
      >
        {loop.map((project, index) => (
          <ProjectEscalatorCard
            key={`${project.id}-${index}`}
            project={project}
            onPress={onProjectPress}
          />
        ))}
      </div>
    </div>
  );
}

function CloseCircleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="18" cy="18" r="18" fill="white" fillOpacity="0.15" />
      <path
        d="M14 14L22 22M22 14L14 22"
        stroke="white"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function SearchArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.8382 7.51472C11.8382 6.77834 12.4352 6.18138 13.1716 6.18138H24.4853C25.2217 6.18138 25.8186 6.77834 25.8186 7.51472V18.8284C25.8186 19.5648 25.2217 20.1618 24.4853 20.1618C23.7489 20.1618 23.1519 19.5648 23.1519 18.8284V10.7337L8.45753 25.4281C7.93683 25.9488 7.09261 25.9488 6.57191 25.4281C6.05121 24.9074 6.05121 24.0632 6.57191 23.5425L21.2663 8.84805H13.1716C12.4352 8.84805 11.8382 8.2511 11.8382 7.51472Z"
        fill="white"
      />
    </svg>
  );
}

function ProjectEscalatorCard({
  project,
  onPress,
}: {
  project: OverlayRailProject;
  onPress: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={`${project.title} — not available yet`}
      onClick={onPress}
      className="graduate-escalator-card group relative aspect-[584/634] shrink-0 cursor-pointer border-0 bg-transparent p-0 text-left"
    >
      <img
        alt=""
        src={project.image}
        className="graduate-escalator-card__image absolute inset-0 size-full"
        draggable={false}
      />
      <div className="absolute inset-0 rounded-[inherit] bg-black/20 transition-colors duration-200 group-hover:bg-black/28" aria-hidden />
      <div className="graduate-escalator-card__action">
        <SearchArrowIcon className="graduate-escalator-card__action-icon" />
      </div>
    </button>
  );
}
