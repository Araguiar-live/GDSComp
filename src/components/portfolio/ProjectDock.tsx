import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { X } from "lucide-react";
import {
  GRADUATE_PROJECTS,
  type GraduateProject,
  type GraduateProjectId,
} from "@/components/portfolio/graduateProjects";

/** Uniform icon cell — every sphere + plus shares this footprint. */
const ICON = 24;

const EASE = [0.22, 1, 0.36, 1] as const;

interface Props {
  /** Optional — plus control opens the profile inspector. */
  onPlus?: () => void;
}

/**
 * Top-left floating folder launcher (Figma 615:1406).
 * Lightweight popover under the icon → edge-to-edge project overlay.
 */
export function ProjectDock({ onPlus }: Props) {
  const [folderOpen, setFolderOpen] = useState(false);
  const [previewId, setPreviewId] = useState<GraduateProjectId | null>(null);
  const [hovered, setHovered] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const preview = GRADUATE_PROJECTS.find((p) => p.id === previewId) ?? null;

  // Close popover on outside click (no full-screen backdrop).
  useEffect(() => {
    if (!folderOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      const root = rootRef.current;
      if (!root) return;
      if (event.target instanceof Node && !root.contains(event.target)) {
        setFolderOpen(false);
      }
    };

    window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, [folderOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (previewId) setPreviewId(null);
      else if (folderOpen) setFolderOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [folderOpen, previewId]);

  // Lock scroll only while the project overlay is open.
  useEffect(() => {
    if (!previewId) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [previewId]);

  const openPreview = (id: GraduateProjectId) => {
    setFolderOpen(false);
    setPreviewId(id);
  };

  return (
    <>
      <div
        ref={rootRef}
        className="relative z-50"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <AnimatePresence>
          {hovered && !folderOpen ? (
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
            folderOpen
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
            folderOpen
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
            aria-expanded={folderOpen}
            aria-controls="graduate-folder-popover"
            aria-haspopup="menu"
            aria-label={
              folderOpen
                ? "Close Industrial Design Graduate Work folder"
                : "Open Industrial Design Graduate Work folder"
            }
            onClick={() => setFolderOpen((v) => !v)}
            className="absolute inset-0 rounded-[30px]"
          />

          <div className="relative z-[1] grid w-full grid-cols-3 gap-x-[9px] gap-y-[8px]">
            <PlusButton
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
                onOpen={() => setFolderOpen(true)}
              />
            ))}
            <span style={{ width: ICON, height: ICON }} aria-hidden />

            {GRADUATE_PROJECTS.slice(2).map((project, i) => (
              <DockSphere
                key={project.id}
                project={project}
                bounceDelay={0.22 + i * 0.07}
                onOpen={() => setFolderOpen(true)}
              />
            ))}
          </div>
        </motion.nav>

        {/* macOS-style popover — anchored under launcher, no page backdrop */}
        <AnimatePresence>
          {folderOpen ? (
            <motion.div
              key="folder-popover"
              id="graduate-folder-popover"
              role="menu"
              aria-label="Industrial Design Graduate Work"
              initial={{ opacity: 0, y: -6, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.98 }}
              transition={{ duration: 0.2, ease: EASE }}
              className="absolute left-0 top-[calc(100%+12px)] z-50 w-[min(320px,calc(100vw-3rem))] origin-top-left"
            >
              <div className="overflow-hidden rounded-[16px] border border-zinc-900/10 bg-white/75 shadow-[0_18px_48px_rgba(11,14,20,0.16),inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-md dark:border-white/10 dark:bg-zinc-900/80 dark:shadow-[0_18px_48px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)]">
                <div className="border-b border-zinc-900/8 px-3.5 py-2.5 dark:border-white/10">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
                    Industrial Design
                  </p>
                  <p className="text-[13px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                    Graduate Work
                  </p>
                </div>

                <ul className="flex flex-col p-1.5">
                  {GRADUATE_PROJECTS.map((project) => (
                    <li key={project.id}>
                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => openPreview(project.id)}
                        className="group flex w-full items-center gap-3 rounded-[10px] px-2.5 py-2 text-left transition hover:bg-zinc-900/[0.05] dark:hover:bg-white/[0.07]"
                        style={{ ["--glow" as string]: project.glow }}
                      >
                        <span className="relative flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-full transition duration-200 group-hover:scale-110 group-hover:shadow-[0_0_14px_var(--glow)]">
                          <img
                            src={project.dot}
                            alt=""
                            width={28}
                            height={28}
                            className="size-full object-contain"
                            draggable={false}
                          />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[13px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                            {project.title}
                          </span>
                          <span className="block truncate text-[11px] text-zinc-500 dark:text-zinc-400">
                            {project.tag}
                          </span>
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {preview ? (
          <ProjectPreviewFrame project={preview} onClose={() => setPreviewId(null)} />
        ) : null}
      </AnimatePresence>
    </>
  );
}

function PlusButton({
  onClick,
}: {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Open profile"
      className="relative z-[2] flex shrink-0 items-center justify-center rounded-md transition-transform hover:scale-110 active:scale-95"
      style={{ width: ICON, height: ICON }}
    >
      <span className="relative inline-grid size-[15px] place-items-start leading-none">
        <span className="col-start-1 row-start-1 mt-[5.5px] h-[4px] w-[15px] rounded-[2px] bg-[#2c313a] shadow-[0px_2px_3px_rgba(0,0,0,0.25)]" />
        <span className="col-start-1 row-start-1 ml-[5.5px] h-[15px] w-[4px] rounded-[2px] border border-white/40 bg-[#2c313a] shadow-[0px_2px_4px_rgba(0,0,0,0.3)]" />
      </span>
    </button>
  );
}

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

function ProjectPreviewFrame({
  project,
  onClose,
}: {
  project: GraduateProject;
  onClose: () => void;
}) {
  return (
    <motion.div
      key={`preview-${project.id}`}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} preview`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22, ease: EASE }}
      className="fixed inset-0 z-[120] flex items-stretch justify-center"
    >
      <button
        type="button"
        aria-label="Close project preview"
        onClick={onClose}
        className="absolute inset-0 cursor-default border-0 bg-zinc-950/45 backdrop-blur-md"
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.28, ease: EASE }}
        className="relative z-[1] flex h-full w-full max-w-[1100px] flex-col bg-transparent"
      >
        <header className="flex shrink-0 items-start justify-between gap-4 px-5 pb-4 pt-6 sm:px-8 sm:pt-8">
          <div className="flex min-w-0 items-start gap-3">
            <span
              className="mt-0.5 flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full"
              style={{ filter: `drop-shadow(0 0 14px ${project.glow})` }}
            >
              <img
                src={project.dot}
                alt=""
                width={40}
                height={40}
                className="size-full bg-transparent object-contain"
                draggable={false}
              />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-medium tracking-tight text-white/70">
                {project.tag}
              </p>
              <h2 className="text-[28px] font-semibold tracking-tight text-white sm:text-[32px]">
                {project.title}
              </h2>
              <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-white/75">
                {project.description}
              </p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
          >
            <X className="size-4" strokeWidth={2} />
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto pb-10">
          {/* Horizontal media carousel — hero + gallery */}
          <div
            className="mt-1 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
          >
            <div
              className="flex snap-x snap-mandatory flex-nowrap gap-6 overflow-x-auto px-5 pb-4 sm:px-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              <img
                src={project.hero}
                alt={`${project.title} hero`}
                className="h-[420px] w-auto flex-shrink-0 snap-center rounded-3xl bg-transparent object-contain sm:h-[480px]"
                draggable={false}
              />
              {project.gallery.map((src, i) => (
                <img
                  key={`${project.id}-g-${i}`}
                  src={src}
                  alt=""
                  className="h-[420px] w-auto flex-shrink-0 snap-center rounded-3xl bg-transparent object-contain sm:h-[480px]"
                  draggable={false}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
