import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Download,
  Github,
  Linkedin,
  Mail,
  Moon,
  Phone,
  Sun,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

/**
 * Sidebar — right-side flyout styled as an IDE Inspector / Dev Console panel.
 * Trigger lives in Index (top-right logo pill); this only renders the drawer.
 */

const FONT_MONO =
  "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace";
export const SIDEBAR_PANEL_ID = "profile-sidebar-panel";

const CONTACT = {
  email: "hello@example.com",
  phone: "+44 0000 000000",
  linkedin: "https://www.linkedin.com/",
  github: "https://github.com/",
} as const;

const CV_HREF = "/Ana-Rafaela-Aguiar-CV.pdf";

interface Experience {
  id: string;
  company: string;
  role: string;
  dates: string;
  summary: string;
}

const EXPERIENCE: Experience[] = [
  {
    id: "odicci-pd",
    company: "Odicci",
    role: "Product Designer (Sole Designer)",
    dates: "Feb 2026 – Present",
    summary:
      "Leading end-to-end product design across onboarding, brand systems, and core workspace flows.",
  },
  {
    id: "odicci-intern",
    company: "Odicci",
    role: "UX/UI Intern",
    dates: "Aug 2025 – Feb 2026",
    summary:
      "Shipped UX/UI across B2B SaaS surfaces and contributed to the design system before promotion.",
  },
  {
    id: "crcle",
    company: "CRCLE",
    role: "Product Designer (Part-time)",
    dates: "Dec 2025 – Present",
    summary:
      "Owning navigation and unified messaging for a live social product under a tight V2 timeline.",
  },
  {
    id: "bending-spoons",
    company: "Bending Spoons",
    role: "First Design Participant",
    dates: "June 2026",
    summary:
      "Selected for the First Design challenge and retreat among a small European cohort.",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export function Sidebar({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [openId, setOpenId] = useState<string | null>(EXPERIENCE[0]?.id ?? null);
  const isDark = theme === "dark";

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onOpenChange(false);
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onOpenChange]);

  return (
    <div style={{ fontFamily: FONT_MONO }}>
      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              key="sidebar-backdrop"
              aria-label="Dismiss profile menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: EASE }}
              onClick={() => onOpenChange(false)}
              className="fixed inset-0 z-[100] cursor-default border-0 bg-zinc-950/40 backdrop-blur-[4px]"
            />

            <motion.aside
              key="sidebar-panel"
              id={SIDEBAR_PANEL_ID}
              role="dialog"
              aria-modal="true"
              aria-label="Profile sidebar"
              initial={{ x: "110%", opacity: 0.85 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "110%", opacity: 0.85 }}
              transition={{ duration: 0.34, ease: EASE }}
              className="fixed right-4 top-20 z-[105] flex h-[calc(100vh-6.5rem)] w-[min(300px,calc(100vw-2rem))] flex-col sm:right-6 sm:w-[320px]"
            >
              <div
                className={`flex h-full flex-col overflow-hidden rounded-md border shadow-2xl transition-colors duration-300 ${
                  isDark
                    ? "border-white/10 bg-[#0c0e12] text-zinc-100 shadow-black/50"
                    : "border-zinc-300/80 bg-[#f4f5f7] text-zinc-900 shadow-slate-900/15"
                }`}
              >
                {/* Title bar */}
                <div
                  className={`flex shrink-0 items-center justify-between gap-2 border-b px-3 py-2 ${
                    isDark ? "border-white/10 bg-[#12151b]" : "border-zinc-300/70 bg-[#e8eaee]"
                  }`}
                >
                  <div className="flex min-w-0 items-center gap-2">
                    <span
                      className={`font-mono text-[10px] tracking-[0.14em] uppercase ${
                        isDark ? "text-zinc-500" : "text-zinc-500"
                      }`}
                    >
                      // INSPECTOR
                    </span>
                    <span
                      className={`rounded border px-1.5 py-0.5 font-mono text-[9px] tracking-wider ${
                        isDark
                          ? "border-white/10 bg-white/5 text-zinc-400"
                          : "border-zinc-300 bg-white/70 text-zinc-500"
                      }`}
                    >
                      v1.0
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
                    className={`flex size-7 shrink-0 items-center justify-center rounded border transition-colors ${
                      isDark
                        ? "border-white/10 bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-zinc-200"
                        : "border-zinc-300 bg-white/80 text-zinc-500 hover:border-zinc-400 hover:text-zinc-800"
                    }`}
                    aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                  >
                    {isDark ? <Sun className="size-3.5" /> : <Moon className="size-3.5" />}
                  </button>
                </div>

                {/* Identity */}
                <div
                  className={`shrink-0 border-b px-4 py-4 ${
                    isDark ? "border-white/10" : "border-zinc-300/70"
                  }`}
                >
                  <h2 className="font-mono text-[14px] font-semibold leading-snug tracking-tight">
                    Ana-Rafaela Aguiar
                  </h2>
                  <p
                    className={`mt-1 font-mono text-[10px] tracking-[0.16em] uppercase ${
                      isDark ? "text-zinc-500" : "text-zinc-500"
                    }`}
                  >
                    [PRODUCT_DESIGNER]
                  </p>
                  <p
                    className={`mt-2 font-mono text-[10px] tracking-wide ${
                      isDark ? "text-emerald-400/80" : "text-emerald-600"
                    }`}
                  >
                    // STATUS · AVAILABLE
                  </p>

                  <nav className="mt-4 flex flex-wrap gap-1.5" aria-label="Contact">
                    <ContactChip
                      href={`mailto:${CONTACT.email}`}
                      label="Email"
                      icon={<Mail className="size-3" />}
                      isDark={isDark}
                    />
                    <ContactChip
                      href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                      label="Phone"
                      icon={<Phone className="size-3" />}
                      isDark={isDark}
                    />
                    <ContactChip
                      href={CONTACT.linkedin}
                      label="LinkedIn"
                      icon={<Linkedin className="size-3" />}
                      isDark={isDark}
                      external
                    />
                    <ContactChip
                      href={CONTACT.github}
                      label="GitHub"
                      icon={<Github className="size-3" />}
                      isDark={isDark}
                      external
                    />
                  </nav>
                </div>

                {/* Experience inspector list */}
                <div className="min-h-0 flex-1 overflow-y-auto">
                  <div
                    className={`sticky top-0 z-[1] flex items-center justify-between border-b px-4 py-2 ${
                      isDark
                        ? "border-white/10 bg-[#12151b]/95"
                        : "border-zinc-300/70 bg-[#e8eaee]/95"
                    }`}
                  >
                    <span
                      className={`font-mono text-[10px] font-medium tracking-[0.16em] uppercase ${
                        isDark ? "text-zinc-500" : "text-zinc-500"
                      }`}
                    >
                      [EXPERIENCE]
                    </span>
                    <span
                      className={`font-mono text-[9px] tracking-wider ${
                        isDark ? "text-zinc-600" : "text-zinc-400"
                      }`}
                    >
                      {EXPERIENCE.length} NODES
                    </span>
                  </div>

                  <ul
                    className={`divide-y ${isDark ? "divide-white/10" : "divide-zinc-300/70"}`}
                  >
                    {EXPERIENCE.map((job, index) => {
                      const itemOpen = openId === job.id;
                      return (
                        <li key={job.id}>
                          <button
                            type="button"
                            onClick={() => setOpenId(itemOpen ? null : job.id)}
                            aria-expanded={itemOpen}
                            className={`group w-full px-4 py-3 text-left transition-colors duration-150 ${
                              itemOpen
                                ? isDark
                                  ? "bg-white/[0.06]"
                                  : "bg-black/[0.04]"
                                : isDark
                                  ? "bg-transparent hover:bg-white/[0.04]"
                                  : "bg-transparent hover:bg-black/[0.03]"
                            }`}
                          >
                            <div className="flex items-start gap-2.5">
                              <span
                                className={`mt-0.5 w-4 shrink-0 font-mono text-[10px] tabular-nums ${
                                  isDark ? "text-zinc-600" : "text-zinc-400"
                                }`}
                              >
                                {String(index + 1).padStart(2, "0")}
                              </span>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-start justify-between gap-2">
                                  <div className="min-w-0">
                                    <div className="font-mono text-[12px] font-medium leading-snug tracking-tight">
                                      {job.company}
                                    </div>
                                    <div
                                      className={`mt-0.5 font-mono text-[10px] leading-snug ${
                                        isDark ? "text-zinc-400" : "text-zinc-500"
                                      }`}
                                    >
                                      {job.role}
                                    </div>
                                  </div>
                                  <span
                                    className={`mt-0.5 flex size-4 shrink-0 items-center justify-center border transition-colors ${
                                      itemOpen
                                        ? isDark
                                          ? "border-white/25 bg-white/10 text-zinc-200"
                                          : "border-zinc-400 bg-black/5 text-zinc-700"
                                        : isDark
                                          ? "border-white/10 text-zinc-500 group-hover:border-white/20"
                                          : "border-zinc-300 text-zinc-400 group-hover:border-zinc-400"
                                    }`}
                                  >
                                    <ChevronDown
                                      className={`size-3 transition-transform duration-200 ${
                                        itemOpen ? "rotate-180" : ""
                                      }`}
                                      strokeWidth={2}
                                    />
                                  </span>
                                </div>
                                <div
                                  className={`mt-1.5 font-mono text-[9px] tracking-[0.12em] uppercase ${
                                    isDark ? "text-zinc-500" : "text-zinc-400"
                                  }`}
                                >
                                  {job.dates}
                                </div>

                                <AnimatePresence initial={false}>
                                  {itemOpen && (
                                    <motion.div
                                      key="summary"
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: "auto", opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.22, ease: EASE }}
                                      className="overflow-hidden"
                                    >
                                      <p
                                        className={`mt-2.5 border-l-2 pl-2.5 font-mono text-[11px] leading-relaxed ${
                                          isDark
                                            ? "border-white/15 text-zinc-400"
                                            : "border-zinc-300 text-zinc-500"
                                        }`}
                                      >
                                        {job.summary}
                                      </p>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            </div>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Footer action */}
                <div
                  className={`shrink-0 border-t p-3 ${
                    isDark ? "border-white/10 bg-[#12151b]" : "border-zinc-300/70 bg-[#e8eaee]"
                  }`}
                >
                  <a
                    href={CV_HREF}
                    download
                    className="group relative flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#FF5A1F] font-mono text-[11px] font-semibold tracking-[0.08em] uppercase text-white transition-transform duration-150 hover:scale-[1.02] active:scale-[0.97]"
                    style={{
                      boxShadow:
                        "inset 0 1px 2px rgba(255,255,255,0.45), inset 0 -2px 3px rgba(0,0,0,0.28), 0 4px 14px rgba(255,90,31,0.35)",
                    }}
                  >
                    <Download
                      className="size-3.5 text-[#FFE08A] transition-transform duration-150 group-hover:translate-y-px group-active:translate-y-0.5"
                      style={{
                        filter:
                          "drop-shadow(0 0 4px rgba(255, 200, 80, 0.85)) drop-shadow(0 1px 0 rgba(120, 40, 0, 0.35))",
                      }}
                      strokeWidth={2.25}
                    />
                    Download CV
                  </a>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function ContactChip({
  href,
  label,
  icon,
  isDark,
  external,
}: {
  href: string;
  label: string;
  icon: ReactNode;
  isDark: boolean;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`inline-flex h-7 items-center gap-1 rounded border px-2 font-mono text-[10px] tracking-tight transition-colors ${
        isDark
          ? "border-white/12 bg-white/[0.04] text-zinc-400 hover:border-white/25 hover:bg-white/[0.08] hover:text-zinc-200"
          : "border-zinc-300 bg-white/70 text-zinc-600 hover:border-zinc-400 hover:bg-white hover:text-zinc-900"
      }`}
    >
      {icon}
      <span>{label}</span>
    </a>
  );
}
