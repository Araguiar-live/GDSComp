import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import {
  GRADUATE_PROJECTS,
  type GraduateProject,
} from "@/components/portfolio/graduateProjects";
import { GraduateWorkComingSoonOverlay } from "@/components/portfolio/GraduateWorkComingSoonOverlay";

/** Uniform icon cell — every sphere + plus shares this footprint. */
const ICON = 24;

const EASE = [0.22, 1, 0.36, 1] as const;

interface Props {
  /** Optional — plus control opens the profile inspector. */
  onPlus?: () => void;
}

/**
 * Top-left floating folder launcher (Figma 615:1406).
 * Opens full-screen graduate work overlay (Figma 1391:214737).
 */
export function ProjectDock({ onPlus }: Props) {
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [onDark, setOnDark] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const openOverlay = () => setOverlayOpen(true);
  const closeOverlay = () => setOverlayOpen(false);

  // Invert the plus when the fixed dock overlaps the black marquee/footer.
  useEffect(() => {
    let io: IntersectionObserver | null = null;
    let raf = 0;

    const update = () => {
      const dark = document.getElementById("site-dark-band");
      const dock = rootRef.current;
      if (!dark || !dock) {
        setOnDark(false);
        return;
      }
      const b = dark.getBoundingClientRect();
      const d = dock.getBoundingClientRect();
      setOnDark(b.top < d.bottom && b.bottom > d.top);
    };

    const observe = () => {
      const el = document.getElementById("site-dark-band");
      if (!el || io) return;
      io = new IntersectionObserver(update, {
        root: null,
        threshold: [0, 0.01, 0.1, 0.5, 1],
      });
      io.observe(el);
      update();
    };

    update();
    observe();
    raf = window.requestAnimationFrame(observe);

    window.addEventListener("scroll", update, { passive: true, capture: true });
    document.addEventListener("scroll", update, { passive: true, capture: true });
    window.addEventListener("resize", update);
    return () => {
      window.cancelAnimationFrame(raf);
      io?.disconnect();
      window.removeEventListener("scroll", update, true);
      document.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <>
      <div
        ref={rootRef}
        className="relative z-50"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <AnimatePresence>
          {hovered && !overlayOpen ? (
            <motion.div
              key="dock-tooltip"
              role="tooltip"
              initial={{ opacity: 0, y: 6, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.98 }}
              transition={{ duration: 0.2, ease: EASE }}
              className="pointer-events-none absolute left-1/2 top-[calc(100%+10px)] z-[60] w-max -translate-x-1/2 rounded-full border border-white/40 bg-zinc-900/90 px-3.5 py-1.5 text-[12px] font-medium tracking-tight text-white shadow-[0_10px_28px_rgba(11,14,20,0.22)] backdrop-blur-md"
            >
              Industrial Design Graduate Work
            </motion.div>
          ) : null}
        </AnimatePresence>

        <motion.nav
          aria-label="Industrial Design Graduate Work"
          title="Industrial Design Graduate Work"
          data-name="app-icon"
          initial={{ y: 0, scale: 1, rotate: 0 }}
          animate={
            overlayOpen
              ? { y: 0, scale: 1, rotate: 0 }
              : {
                  y: [0, -7, 0, -3, 0],
                  scale: [1, 1.02, 1, 1.01, 1],
                  rotate: [0, -1.4, 0.8, -0.6, 0],
                }
          }
          whileHover={{
            scale: 1.08,
            y: -4,
            rotate: 0,
            transition: { type: "spring", stiffness: 420, damping: 16 },
          }}
          whileTap={{ scale: 0.94, rotate: -2 }}
          transition={
            overlayOpen
              ? { duration: 0.2 }
              : {
                  y: { duration: 2.4, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.35 },
                  scale: { duration: 2.4, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.35 },
                  rotate: { duration: 2.4, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.35 },
                }
          }
          className="pointer-events-auto relative flex size-[120px] flex-col items-center justify-center rounded-[30px] border border-zinc-400/45 bg-white/30 p-[15px] shadow-[0px_16px_24px_rgba(11,14,20,0.12),inset_0px_1px_0_rgba(255,255,255,0.55)] backdrop-blur-[14px] supports-[backdrop-filter]:bg-white/25 motion-reduce:animate-none"
        >
          <button
            type="button"
            aria-expanded={overlayOpen}
            aria-haspopup="dialog"
            aria-label={
              overlayOpen
                ? "Close Industrial Design Graduate Work"
                : "Open Industrial Design Graduate Work"
            }
            onClick={() => (overlayOpen ? closeOverlay() : openOverlay())}
            className="absolute inset-0 rounded-[30px]"
          />

          <div className="relative z-[1] grid w-full grid-cols-3 gap-x-[9px] gap-y-[8px]">
            <PlusButton
              onDark={onDark}
              onClick={(e) => {
                e.stopPropagation();
                onPlus?.();
              }}
            />
            <span style={{ width: ICON, height: ICON }} aria-hidden />
            <span style={{ width: ICON, height: ICON }} aria-hidden />

            {GRADUATE_PROJECTS.slice(0, 2).map((project, i) => (
              <DockSphere
                key={project.id}
                project={project}
                bounceDelay={0.08 + i * 0.07}
                onOpen={openOverlay}
              />
            ))}
            <span style={{ width: ICON, height: ICON }} aria-hidden />

            {GRADUATE_PROJECTS.slice(2).map((project, i) => (
              <DockSphere
                key={project.id}
                project={project}
                bounceDelay={0.22 + i * 0.07}
                onOpen={openOverlay}
              />
            ))}
          </div>
        </motion.nav>
      </div>

      <AnimatePresence>
        {overlayOpen ? <GraduateWorkComingSoonOverlay onClose={closeOverlay} /> : null}
      </AnimatePresence>
    </>
  );
}

const PlusButton = ({
  onClick,
  onDark,
}: {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  onDark?: boolean;
}) => {
  const bar = onDark
    ? "bg-white shadow-[0px_2px_6px_rgba(0,0,0,0.35)]"
    : "bg-[#2c313a] shadow-[0px_2px_3px_rgba(0,0,0,0.25)]";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Open profile"
      data-on-dark={onDark ? "true" : "false"}
      className="relative z-[2] flex shrink-0 items-center justify-center rounded-md transition-transform hover:scale-110 active:scale-95"
      style={{ width: ICON, height: ICON }}
    >
      <span className="relative inline-grid size-[15px] place-items-start leading-none">
        <span
          className={`col-start-1 row-start-1 mt-[5.5px] h-[4px] w-[15px] rounded-[2px] transition-colors duration-300 ${bar}`}
        />
        <span
          className={`col-start-1 row-start-1 ml-[5.5px] h-[15px] w-[4px] rounded-[2px] border transition-colors duration-300 ${
            onDark ? "border-white/80" : "border-white/40"
          } ${bar}`}
        />
      </span>
    </button>
  );
};

function DockSphere({
  project,
  onOpen,
  bounceDelay = 0,
}: {
  project: GraduateProject;
  onOpen: () => void;
  bounceDelay?: number;
}) {
  return (
    <motion.button
      type="button"
      title={project.title}
      aria-label={`Open ${project.title}`}
      onClick={(e) => {
        e.stopPropagation();
        onOpen();
      }}
      animate={{ y: [0, -2.5, 0] }}
      transition={{
        duration: 1.8,
        repeat: Infinity,
        ease: "easeInOut",
        delay: bounceDelay,
        repeatDelay: 0.4,
      }}
      whileHover={{ scale: 1.18, y: -1 }}
      whileTap={{ scale: 0.9 }}
      className="group relative z-[2] flex shrink-0 items-center justify-center overflow-visible rounded-full motion-reduce:animate-none"
      style={{ width: ICON, height: ICON, ["--glow" as string]: project.glow }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-[-4px] rounded-full opacity-0 blur-[6px] transition-opacity duration-200 group-hover:opacity-100"
        style={{ background: project.glow }}
      />
      <img
        src={project.dot}
        alt=""
        width={ICON}
        height={ICON}
        className="relative size-full object-contain transition-[filter] duration-200 group-hover:drop-shadow-[0_0_10px_var(--glow)]"
        draggable={false}
      />
    </motion.button>
  );
}
