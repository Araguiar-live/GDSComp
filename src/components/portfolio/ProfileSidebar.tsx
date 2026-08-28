import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Award,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Code2,
  GraduationCap,
  Layers,
  ListChecks,
  Palette,
  Smartphone,
  SlidersHorizontal,
  Smile,
  Sparkles,
  Target,
  Wand2,
} from "lucide-react";
import girlPleaseLogo from "@/assets/girl-please.svg";

/**
 * ProfileSidebar — Clay-style frosted credentials panel (fixed left on xl+).
 */

interface TimelineNode {
  icon: LucideIcon;
  iconBg: string;
  title: string;
  date: string;
  details: string;
}

interface ToolkitItem {
  icon: LucideIcon;
  iconColor: string;
  label: string;
  detail: string;
}

const TIMELINE: TimelineNode[] = [
  {
    icon: Briefcase,
    iconBg: "#FEF3C7",
    title: "Sole Product Designer — Odicci",
    date: "B2B SaaS · Promoted rapidly",
    details:
      "Leading end-to-end UX/UI, analytics dashboards, bulk-asset workflows, and design systems — resulting in a rapid internal promotion.",
  },
  {
    icon: Smartphone,
    iconBg: "#EDE9FE",
    title: "Sole Designer — CRCLE",
    date: "Live iOS app · 3-month V2",
    details:
      "Owned the complete V2 redesign end-to-end for a live mobile social product, from navigation to unified messaging, under a strict three-month timeline.",
  },
  {
    icon: Award,
    iconBg: "#DCFCE7",
    title: "Bending Spoons — First Design",
    date: "Milan retreat · 1 of 20 EU",
    details:
      "Selected as one of twenty European participants for the prestigious First Design challenge and retreat in Milan.",
  },
];

const DESIGN_STACK: ToolkitItem[] = [
  { icon: Layers, iconColor: "#8B5CF6", label: "Figma", detail: "Systems, components, dev handoff" },
  { icon: Sparkles, iconColor: "#EC4899", label: "Framer", detail: "Interactive prototypes & motion" },
  { icon: Palette, iconColor: "#3B82F6", label: "Webflow", detail: "Marketing & layout builds" },
  { icon: Wand2, iconColor: "#F97316", label: "Principle", detail: "Micro-interaction studies" },
];

const TECH_WORKFLOW: ToolkitItem[] = [
  { icon: Code2, iconColor: "#0D9488", label: "HTML / CSS", detail: "Solid front-end constraint literacy" },
  { icon: Sparkles, iconColor: "#18181B", label: "Cursor & AI", detail: "Accelerated prototyping and handoff" },
];

export function ProfileSidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.aside
            key="profile-panel"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="hidden xl:block fixed left-6 top-1/2 -translate-y-1/2 z-40 w-[360px]"
          >
            <div className="relative rounded-[26px] overflow-hidden">
              <div aria-hidden className="absolute inset-0 -z-10">
                <div className="absolute -top-16 -left-10 w-64 h-64 rounded-full bg-[#A8C8FF] blur-3xl opacity-60" />
                <div className="absolute top-1/3 -right-16 w-72 h-72 rounded-full bg-[#FFB4A2] blur-3xl opacity-50" />
                <div className="absolute -bottom-16 left-6 w-72 h-72 rounded-full bg-[#FBCFE8] blur-3xl opacity-55" />
              </div>

              <div className="relative max-h-[min(88vh,920px)] overflow-y-auto rounded-[26px] bg-white/75 backdrop-blur-2xl border border-white shadow-2xl shadow-slate-900/15 p-6 scrollbar-thin">
                <button
                  type="button"
                  className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/80 border border-white flex items-center justify-center text-zinc-500 hover:text-zinc-900 hover:bg-white transition-colors shadow-sm"
                  aria-label="Mood"
                >
                  <Smile className="w-4 h-4 text-black" strokeWidth={1.6} />
                </button>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="absolute top-5 right-14 w-8 h-8 rounded-full bg-white/80 border border-white flex items-center justify-center text-zinc-500 hover:text-zinc-900 hover:bg-white transition-colors shadow-sm"
                  aria-label="Close profile panel"
                >
                  <ChevronLeft className="w-4 h-4 text-black" strokeWidth={2} />
                </button>

                <div className="flex items-center gap-4 pr-16">
                  <div className="w-14 h-14 rounded-full shrink-0 flex items-center justify-center overflow-hidden bg-white/90 border border-white shadow-sm">
                    <img
                      src={girlPleaseLogo}
                      alt="Personal logo"
                      className="w-[70%] h-[70%] object-contain opacity-90"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[17px] font-semibold tracking-tight text-zinc-900 leading-tight">
                      Ana Aguiar
                    </div>
                    <div className="text-[10px] font-medium tracking-[0.12em] uppercase text-zinc-500 mt-1 leading-snug">
                      Product Designer &amp; Digital Designer
                    </div>
                  </div>
                </div>

                <p className="mt-3 text-[11px] leading-relaxed text-zinc-600 pr-2">
                  Experienced as a sole designer — owning visuals, systems, and shipping cadence from
                  wireframe to production.
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 h-6 px-2.5 rounded-full text-[10.5px] font-medium tracking-tight bg-[#FFEDD5] text-[#C2410C] border border-[#FED7AA]/80 shadow-sm">
                    Sole designer
                  </span>
                  <span className="inline-flex items-center gap-1.5 h-6 px-2.5 rounded-full text-[10.5px] font-medium tracking-tight bg-white/90 text-zinc-700 border border-white/80 shadow-sm">
                    <GraduationCap className="w-3 h-3 text-[#8B5CF6]" strokeWidth={2} />
                    Loughborough
                  </span>
                </div>

                <SectionHeader icon={ListChecks} label="Core experience" />

                <div className="relative mt-5 pl-6">
                  <div
                    aria-hidden
                    className="absolute left-[10px] top-1 bottom-1 w-px"
                    style={{
                      background:
                        "linear-gradient(to bottom, transparent, rgba(24,24,27,0.18) 8%, rgba(24,24,27,0.18) 92%, transparent)",
                    }}
                  />

                  <ul className="flex flex-col gap-5">
                    {TIMELINE.map((n, i) => {
                      const Icon = n.icon;
                      return (
                        <li key={i} className="relative">
                          <div
                            className="absolute -left-6 top-0 w-[21px] h-[21px] rounded-[6px] flex items-center justify-center text-zinc-800 shadow-sm ring-2 ring-white/80"
                            style={{ background: n.iconBg }}
                          >
                            <Icon className="w-3 h-3" strokeWidth={2.2} />
                          </div>

                          <div className="text-[12.5px] font-medium tracking-tight text-zinc-900 leading-snug">
                            {n.title}
                          </div>
                          <div className="text-[9.5px] font-semibold tracking-[0.12em] uppercase text-zinc-400 mt-1">
                            {n.date}
                          </div>
                          <p className="text-[11.5px] leading-relaxed text-zinc-500 mt-2">{n.details}</p>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <SectionHeader icon={GraduationCap} label="Education" />
                <p className="mt-4 text-[11.5px] leading-relaxed text-zinc-600">
                  Background in{" "}
                  <span className="font-medium text-zinc-800">Industrial Design &amp; Technology</span> from
                  Loughborough University — grounding product decisions in material, usability, and
                  technical feasibility.
                </p>

                <SectionHeader icon={SlidersHorizontal} label="Design stack" />
                <ul className="mt-4 flex flex-col gap-3">
                  {DESIGN_STACK.map((item) => (
                    <ToolkitRow key={item.label} {...item} />
                  ))}
                </ul>

                <SectionHeader icon={Code2} label="Technical &amp; AI workflow" />
                <ul className="mt-4 flex flex-col gap-3">
                  {TECH_WORKFLOW.map((item) => (
                    <ToolkitRow key={item.label} {...item} />
                  ))}
                </ul>

                <SectionHeader icon={Target} label="Product impact" />
                <p className="mt-4 text-[11.5px] leading-relaxed text-zinc-600">
                  Proven track record of reducing support friction to zero through workflow redesigns,
                  managing complex location privacy and widget models, and executing under strict time
                  constraints without sacrificing craft.
                </p>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {!isOpen && (
        <motion.button
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          type="button"
          onClick={() => setIsOpen(true)}
          className="hidden xl:flex fixed left-6 top-1/2 -translate-y-1/2 z-40 items-center gap-2 pl-2 pr-3 h-10 rounded-full bg-white/70 backdrop-blur-2xl border border-white shadow-2xl shadow-slate-900/15 hover:bg-white/90 transition-colors"
          aria-label="Open profile panel"
        >
          <div className="w-7 h-7 rounded-full flex items-center justify-center overflow-hidden bg-transparent">
            <img src={girlPleaseLogo} alt="Logo" className="w-[85%] h-[85%] object-contain" />
          </div>
          <ChevronRight className="w-4 h-4 text-black" strokeWidth={2} />
        </motion.button>
      )}
    </>
  );
}

function SectionHeader({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <div className="mt-6 flex items-center gap-2">
      <Icon className="w-3 h-3 text-black" strokeWidth={2} />
      <span className="text-[9.5px] font-semibold tracking-[0.22em] uppercase text-zinc-400">{label}</span>
      <div className="flex-1 h-px bg-zinc-900/10" />
    </div>
  );
}

function ToolkitRow({ icon: Icon, iconColor, label, detail }: ToolkitItem) {
  return (
    <li className="flex items-start gap-3">
      <div
        className="mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center shrink-0 bg-white/90 border border-white shadow-sm"
        style={{ color: iconColor }}
      >
        <Icon className="w-3.5 h-3.5" strokeWidth={2} />
      </div>
      <div className="min-w-0">
        <div className="text-[12px] font-medium text-zinc-900 tracking-tight">{label}</div>
        <div className="text-[11px] leading-relaxed text-zinc-500 mt-0.5">{detail}</div>
      </div>
    </li>
  );
}
