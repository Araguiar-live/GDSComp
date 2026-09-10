import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { forwardRef, useEffect, useState, type MutableRefObject } from "react";
import { MockupGradientRing } from "@/components/portfolio/MockupGradientRing";
import {
  useCrcleAreaInboxOpen,
  useCrcleVerifyOpen,
} from "@/components/portfolio/crcleBroadcast";

// Default tabs for projects that don't set `project.tabs`.
const DEFAULT_TABS = ["Create Workspace\u00a0", "Brand Personality", "Sign Up", "Template Library"] as const;
export type ProjectTab = string;
type Tab = ProjectTab;

/** Shared open-panel body height — tabs + Figma 402×874 phone + padding */
const EXPANDED_BODY_H = 1060;

export interface Project {
  id: string; // e.g. "01"
  slug: string; // e.g. "crcle" — used by the dock to target this row
  title: string;
  role: string;
  year: string;
  /** Override the default four case-study steps. */
  tabs?: readonly string[];
  /** Tab key to show when the accordion opens (defaults to the first tab). */
  defaultTab?: string;
  // Per-tab content slots. Each returns whatever prototype/text you want to drop in later.
  content?: Partial<Record<string, ProjectTabContent>>;
}

export type CaseStudyText = {
  label?: string;
  subtitle?: string;
  overview?: string;
  challenge?: string;
  approach?: string;
  outcome?: string;
};

export interface ProjectTabContent extends CaseStudyText {
  /** Optional pill label in the accordion tab switcher (defaults to the tab key). */
  tabLabel?: string;
  hypothesis?: string;
  notes?: string;
  /** Nested prototype copy — e.g. In The Area on the Messaging Hub tab. */
  featureCopy?: CaseStudyText;
  // Slot for your live interactive prototype / mockup asset.
  mockup?: React.ReactNode;
  // Optional: fully replace the default two-column body with a custom render.
  // When a function is provided, it receives tab helpers so nested CTAs can advance.
  customBody?:
    | React.ReactNode
    | ((helpers: {
        onNextTab: () => void;
        onPrevTab: () => void;
        goToTab: (tab: ProjectTab) => void;
      }) => React.ReactNode);
}

interface Props {
  project: Project;
  isOpen: boolean;
  onToggle: () => void;
}

/** White project accordion card — mockup / bento treatment TBD. */
export function ProjectBentoStack({
  projects,
  openSlug,
  onToggle,
  rowRefs,
}: {
  projects: Project[];
  openSlug: string | null;
  onToggle: (slug: string) => void;
  rowRefs: MutableRefObject<Record<string, HTMLDivElement | null>>;
}) {
  return (
    <div className="relative z-10 flex w-full shrink-0 flex-col overflow-hidden rounded-[32px] border border-[#f3f4f6] bg-white/70 shadow-[0px_16px_48px_0px_rgba(0,0,0,0.05)] backdrop-blur-[2px]">
      {projects.map((p) => (
        <ProjectAccordion
          key={p.slug}
          ref={(el) => {
            rowRefs.current[p.slug] = el;
          }}
          project={p}
          isOpen={openSlug === p.slug}
          onToggle={() => onToggle(p.slug)}
        />
      ))}
    </div>
  );
}

export const ProjectAccordion = forwardRef<HTMLDivElement, Props>(function ProjectAccordion(
  { project, isOpen, onToggle },
  ref,
) {
  const tabs = project.tabs?.length ? [...project.tabs] : [...DEFAULT_TABS];

  const resolveDefaultTab = (): Tab => {
    if (project.defaultTab && tabs.includes(project.defaultTab)) {
      return project.defaultTab;
    }
    return tabs[0];
  };

  const [activeTab, setActiveTab] = useState<Tab>(resolveDefaultTab);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(resolveDefaultTab());
    }
  }, [isOpen, project.defaultTab, project.tabs]);
  const tabContent = project.content?.[activeTab] ?? {};
  const tabIndex = Math.max(0, tabs.indexOf(activeTab));

  return (
    <div ref={ref} className="border-b border-[#d1d5db] last:border-b-0">
      {/* Row header — Figma 530:151817 */}
      <button
        type="button"
        onClick={onToggle}
        className="group flex w-full items-center justify-between gap-6 px-8 py-7 text-left"
      >
        <div className="flex min-w-0 flex-1 items-center gap-8">
          <span className="shrink-0 text-[14px] font-medium tracking-[1px] text-[#111]/70 tabular-nums">
            {project.id}
          </span>
          <span className="truncate text-[24px] font-normal tracking-[-0.5px] text-[#111] sm:text-[32px]">
            {project.title}
          </span>
        </div>
        <div className="hidden shrink-0 items-center justify-end gap-4 text-[14px] text-[#111]/70 sm:flex">
          <span className="text-right">{project.role}</span>
          <span className="font-light text-[#111]/70">|</span>
          <span className="tabular-nums">{project.year}</span>
        </div>
      </button>

      {/* Expanded body — fixed length for consistency across projects */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="body"
            initial={{ height: 0 }}
            animate={{ height: EXPANDED_BODY_H }}
            exit={{ height: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div
              className="relative flex h-full flex-col px-6 py-6"
              style={{ height: EXPANDED_BODY_H }}
            >
              {/* Tab switcher (capsule pills) */}
              <div className="mb-6 flex shrink-0 justify-center">
                <div className="inline-flex items-center gap-1 rounded-full border border-white bg-white/70 p-1 shadow-2xl shadow-slate-200/50 backdrop-blur-xl">
                  {tabs.map((tab) => {
                    const active = tab === activeTab;
                    return (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setActiveTab(tab)}
                        className={
                          "rounded-full border px-4 py-1.5 text-xs font-medium tracking-tight transition-all duration-300 " +
                          (active
                            ? "border-black bg-black text-white hover:bg-black hover:text-white"
                            : "border-transparent bg-transparent text-zinc-500 hover:border-black hover:bg-transparent hover:text-zinc-900")
                        }
                      >
                        {project.content?.[tab]?.tabLabel ?? tab}
                      </button>
                    );
                  })}
                </div>
              </div>

              {tabs.length > 1 ? (
                <>
                  <NavArrow
                    direction="prev"
                    onClick={() => {
                      setActiveTab(tabs[(tabIndex - 1 + tabs.length) % tabs.length]);
                    }}
                  />
                  <NavArrow
                    direction="next"
                    onClick={() => {
                      setActiveTab(tabs[(tabIndex + 1) % tabs.length]);
                    }}
                  />
                </>
              ) : null}

              {/* Copy fills leftover width; prototypes stay on the right */}
              <div className="mx-auto flex min-h-0 w-full flex-1 items-start px-[68px] pt-2">
                <div className="grid w-full grid-cols-1 items-start gap-8 overflow-visible md:grid-cols-[minmax(0,1fr)_auto] md:gap-10">
                {/* LEFT — case-study copy fills leftover space */}
                <div className="flex max-h-[874px] min-h-0 min-w-0 flex-col overflow-y-auto overscroll-contain">
                  <CaseStudyCopy project={project} tab={activeTab} content={tabContent} />
                </div>

                {/* RIGHT — prototype sized to the device / browser frame */}
                <div
                  className={`relative flex shrink-0 items-start justify-end ${
                    project.slug === "odicci"
                      ? "w-full min-w-0 max-w-[980px] md:w-[min(980px,46vw)]"
                      : "w-max max-w-full"
                  }`}
                >
                  <div
                    className={`flex items-start justify-end overflow-visible ${
                      project.slug === "odicci" ? "w-full" : "w-max max-w-full"
                    }`}
                  >
                    {tabContent.customBody ? (
                      typeof tabContent.customBody === "function"
                        ? tabContent.customBody({
                            onNextTab: () => {
                              setActiveTab(tabs[(tabIndex + 1) % tabs.length]);
                            },
                            onPrevTab: () => {
                              setActiveTab(tabs[(tabIndex - 1 + tabs.length) % tabs.length]);
                            },
                            goToTab: (tab) => setActiveTab(tab),
                          })
                        : tabContent.customBody
                    ) : (
                      <MockupGradientRing className="aspect-[4/5] h-[874px] max-h-[874px] w-auto max-w-full overflow-hidden rounded-3xl">
                        <div className="absolute inset-[1px] z-[1] flex items-center justify-center overflow-hidden rounded-[23px]">
                          {tabContent.mockup ?? (
                            <div className="px-6 text-center text-xs uppercase tracking-widest text-zinc-500">
                              {project.slug} · {activeTab}
                              <span className="mt-2 block font-normal normal-case tracking-normal text-zinc-400">
                                Prototype slot — swap in your screen later
                              </span>
                            </div>
                          )}
                        </div>
                      </MockupGradientRing>
                    )}
                  </div>
                </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

/**
 * Editable case-study copy mockup.
 * Override any string via `project.content[tab].overview|challenge|approach|outcome|…`
 */
function CaseStudyCopy({
  project,
  tab,
  content,
}: {
  project: Project;
  tab: Tab;
  content: ProjectTabContent;
}) {
  const areaInboxOpen = useCrcleAreaInboxOpen();
  const verifyOpen = useCrcleVerifyOpen();
  const featureKey =
    project.slug === "crcle" && tab === "Sign Up" && areaInboxOpen && content.featureCopy
      ? "in-the-area"
      : project.slug === "crcle" &&
          tab === "Template Library" &&
          verifyOpen &&
          content.featureCopy
        ? "kyc"
        : null;
  const copy: CaseStudyText = featureKey ? { ...content, ...content.featureCopy } : content;

  const overview =
    copy.overview ??
    `Replace this overview for ${project.title}. One or two sentences on what this step in the case study is about and why it matters.`;
  const challenge =
    copy.challenge ??
    "Replace this challenge — the user problem, business constraint, or friction that framed the work.";
  const approach =
    copy.approach ??
    content.hypothesis ??
    "Replace this approach — principles, flows, and decisions that shaped the solution.";
  const outcome =
    copy.outcome ??
    content.notes ??
    "Replace this outcome — what shipped, what you learned, and what you’d iterate next.";

  return (
    <div
      key={featureKey ?? "tab"}
      className="flex w-full min-w-0 flex-col gap-[36px] py-0"
    >
      <div className="flex flex-col gap-5">
        <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-400">
          {copy.label ?? `${project.title} — ${tab}`}
        </span>
        <h3 className="text-3xl font-medium leading-[1.15] tracking-tight text-zinc-900 md:text-[40px]">
          {copy.subtitle ?? "Case study headline — edit me"}
        </h3>
        <p className="text-base leading-8 text-zinc-500">{overview}</p>
      </div>

      <TextBlock heading="Challenge">{challenge}</TextBlock>
      <TextBlock heading="Approach">{approach}</TextBlock>
      <TextBlock heading="Outcome">{outcome}</TextBlock>
    </div>
  );
}

function TextBlock({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-zinc-900">
        {heading}
      </div>
      <p className="text-base leading-8 text-zinc-500">{children}</p>
    </div>
  );
}

function NavArrow({ direction, onClick }: { direction: "prev" | "next"; onClick: () => void }) {
  const isPrev = direction === "prev";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isPrev ? "Previous step" : "Next step"}
      className={
        "hidden md:flex absolute top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full border border-zinc-200 bg-white/80 backdrop-blur hover:bg-white text-black transition-colors " +
        (isPrev ? "left-6" : "right-6")
      }
    >
      {isPrev ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
    </button>
  );
}