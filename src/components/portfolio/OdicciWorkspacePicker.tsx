import { AnimatePresence, motion } from "framer-motion";
import { Plus, Search, ChevronDown, Check, X, Upload, HelpCircle, AlertTriangle, Info } from "lucide-react";
import { useState } from "react";
import { OdicciSignUp } from "@/components/portfolio/OdicciSignUp";
import { OdicciBrowserFrame } from "@/components/portfolio/OdicciBrowserFrame";
import odicciLogo from "@/assets/odicci/odicci-logo-wordmark.png";
import workspaceGradientPattern from "@/assets/odicci/workspace-gradient-pattern.svg";
import workspaceGradient2 from "@/assets/odicci/workspace-gradient-2.svg";
import workspaceDiamondMeshSvg from "@/assets/odicci/workspace-diamond-mesh.svg?raw";

/**
 * OdicciWorkspacePicker — Figma Choose workspace_Default (65:94009).
 * Atmosphere (65:94020): base dual gradient + Pattern (636:103678) +
 * dark wash (65:94026) + Gradient 2 (636:103687) — exact Figma stack.
 * Mesh (65:94027) is inlined so Odicci mark icons keep backdrop-blur.
 * Flow: picker → create (713:199787) → Brand Personality (business first).
 */

const ACCENT = "#FF5126";
const FONT = "Poppins, ui-sans-serif, system-ui, sans-serif";
/** Figma Secondary 200 — soft glow hex shared with Sign Up */
const SECONDARY_200 = "#E6F4FE";

/** Artboard 1512 — content is 7% narrower than the prior 60px-inset width (1392) */
const CONTENT_W = Math.round(1392 * 0.93); // 1295
const FRAME_INSET = Math.round((1512 - CONTENT_W) / 2); // ~109, keeps block centered
const LIST_COL_W = Math.round(554 * (CONTENT_W / 1081)); // ~663
/** Logo left edge aligns with modal / Add Integration */
const LOGO_W = Math.round(178 * 1.4); // 249
const LOGO_H = Math.round(86 * 1.4); // 120
/** Wordmark PNG is padded (~189/600 left); shift so the orange glyph meets the modal edge */
const LOGO_CONTENT_LEFT_RATIO = 189 / 600;
const LOGO_LEFT = Math.round(FRAME_INSET - LOGO_W * LOGO_CONTENT_LEFT_RATIO);

interface Workspace {
  initials: string;
  name: string;
  plan: string;
  members: string;
  color: string; // avatar bg
}

const WORKSPACES: Workspace[] = [
  { initials: "AC", name: "Acme Corporation", plan: "Enterprise Plan", members: "45 members", color: "#0356E5" },
  { initials: "TS", name: "TechStart Studios", plan: "Pro Plan", members: "12 members", color: ACCENT },
  { initials: "CL", name: "Creative Labs", plan: "Team Plan", members: "8 members", color: "#1F4364" },
  { initials: "PW", name: "Personal Workspace", plan: "Free Plan", members: "1 member", color: "#4A5565" },
];

interface Integration {
  id: string;
  name: string;
  color: string;
  letter: string;
}

const INTEGRATIONS: Integration[] = [
  { id: "shopify", name: "Shopify", color: "#95BF47", letter: "S" },
  { id: "klaviyo", name: "Klaviyo", color: "#000000", letter: "K" },
  { id: "magento", name: "Magento", color: "#EE672F", letter: "M" },
  { id: "omnisend", name: "Omnisend", color: "#1F2937", letter: "O" },
];

export function OdicciWorkspacePicker({ onNext }: { onNext?: () => void }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [draftSelected, setDraftSelected] = useState<string[]>([]);
  const [savedSelected, setSavedSelected] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [step, setStep] = useState<"picker" | "create" | "login">("picker");
  const [companyName, setCompanyName] = useState("");

  const isDark = theme === "dark";
  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  if (step === "login") {
    return <OdicciSignUp variant="login" onBack={() => setStep("picker")} />;
  }

  const openModal = () => {
    setDraftSelected(savedSelected);
    setQuery("");
    setModalOpen(true);
  };

  const toggle = (id: string) =>
    setDraftSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const save = () => {
    setSavedSelected(draftSelected);
    setModalOpen(false);
  };

  const filtered = INTEGRATIONS.filter((i) =>
    i.name.toLowerCase().includes(query.toLowerCase())
  );

  const savedIntegrations = INTEGRATIONS.filter((i) =>
    savedSelected.includes(i.id)
  );
  const canCreate = savedIntegrations.length > 0;

  const textMain = isDark ? "text-white" : "text-zinc-900";
  const textSub = isDark ? "text-white/60" : "text-zinc-500";
  const textMuted = isDark ? "text-white/70" : "text-zinc-500";

  return (
    <OdicciBrowserFrame
      tabLabel="odicci | Workspace Setup"
      stepLabel={step === "create" ? "2/7" : "1/7"}
      url="odicci.com/onboarding"
      theme={theme}
      onToggleTheme={toggleTheme}
      canvasClassName="bg-[#ffe4e4]"
    >
      {/* Artboard — Figma 65:94009 */}
      <div className="relative size-full overflow-hidden">
        {/*
          Atmosphere (65:94020) — exact Figma layer order:
          base dual gradient → Gradient Pattern → dark wash → Gradient 2
        */}
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden
          style={{ filter: "saturate(1.05)" }}
        >
          <div
            className="absolute inset-0 overflow-hidden backdrop-blur-[70px]"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(51, 51, 51, 0.4) 0%, rgba(51, 51, 51, 0.4) 100%), linear-gradient(190.642deg, rgba(255, 255, 255, 0.64) 11.686%, rgba(0, 24, 58, 0.8) 100%)",
            }}
          >
            {/* Gradient Pattern (636:103678) */}
            <div className="absolute left-[-498px] top-[-233px] h-[1448px] w-[2508px]">
              <div className="absolute inset-[-24.52%_-10.37%_-8.43%_-4.78%]">
                <img
                  src={workspaceGradientPattern}
                  alt=""
                  className="block size-full max-w-none"
                />
              </div>
            </div>
            {/* Dark wash (65:94026) */}
            <div className="absolute inset-0 bg-[rgba(0,17,26,0.6)] backdrop-blur-[100px]" />
            {/* Gradient 2 (636:103687) */}
            <div className="absolute left-[-172px] top-[-156px] h-[588px] w-[1908px]">
              <div className="absolute inset-[-65.99%_-15.72%_-51.02%_-19.39%]">
                <img
                  src={workspaceGradient2}
                  alt=""
                  className="block size-full max-w-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/*
          Mesh + Odicci icons (65:94027) — MUST be inlined (not <img>) so
          foreignObject backdrop-filter blurs the atmosphere behind the marks.
        */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[1176px] w-[1565px] -translate-x-1/2 -translate-y-1/2 [&_svg]:block [&_svg]:size-full [&_svg]:max-w-none"
          dangerouslySetInnerHTML={{ __html: workspaceDiamondMeshSvg }}
        />

        {/* Light-mode wash (theme toggle) — Secondary 200 */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{ background: SECONDARY_200, opacity: isDark ? 0 : 0.7 }}
        />

        <img
          src={odicciLogo}
          alt="odicci"
          className="absolute object-contain object-left"
          style={{
            left: LOGO_LEFT,
            top: 48,
            width: LOGO_W,
            height: LOGO_H,
          }}
          width={LOGO_W}
          height={LOGO_H}
        />

        {/* Workspace modal — 60px side padding; left edge aligns with logo */}
        {step === "picker" && (
        <div
          className="absolute top-[210px] flex flex-col"
          style={{ left: FRAME_INSET, width: CONTENT_W }}
        >
          <div className="relative overflow-hidden rounded-t-[48px] border-2 border-b-0 border-white/20 bg-[rgba(0,50,90,0.1)] backdrop-blur-[40px]">
            <div className="px-9 pb-2 pt-9">
              <div
                className="grid items-start gap-11"
                style={{ gridTemplateColumns: `1fr ${LIST_COL_W}px` }}
              >
                <div className="flex min-w-0 flex-col justify-start">
                  <h2 className={`text-[29px] font-normal leading-[1.2] tracking-tight transition-colors duration-300 ${textMain}`}>
                    Choose a workspace
                  </h2>
                  <p className={`mt-1 text-[23px] font-normal leading-[1.2] transition-colors duration-300 ${textSub}`}>
                    to continue to Odicci
                  </p>
                </div>

                <div className="flex min-w-0 flex-col">
                  <div className="flex items-center gap-3 rounded-[63px] border border-white/15 bg-white/15 py-[17px] pl-[17px] pr-3.5">
                    <Search className="size-[17px] shrink-0 text-white" />
                    <input
                      placeholder="Search workspaces"
                      className="min-w-0 flex-1 bg-transparent text-[17px] text-white outline-none placeholder-white/40"
                    />
                  </div>

                  <ul className="mt-4 divide-y divide-white/15">
                    {WORKSPACES.map((w) => (
                      <motion.li
                        key={w.initials}
                        whileHover={{ x: 2 }}
                        className="group flex cursor-pointer items-center gap-5 py-[18px] first:border-t first:border-white/15"
                        onClick={() => setStep("login")}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setStep("login");
                          }
                        }}
                      >
                        <div
                          className="flex size-12 shrink-0 items-center justify-center rounded-full border border-white text-[17px] font-normal tracking-tight text-white"
                          style={{ background: w.color }}
                        >
                          {w.initials}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className={`truncate text-[17px] font-normal tracking-tight ${textMain}`}>
                            {w.name}
                          </div>
                          <div className={`truncate text-[15px] tracking-tight ${textMuted}`}>
                            {w.plan} · {w.members}
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>

              {savedIntegrations.length > 0 && (
                <div className="mt-3 flex items-center justify-end gap-3 border-t border-white/10 pt-3">
                  <span className={`text-[11px] tracking-tight ${textMuted}`}>
                    Integrations
                  </span>
                  <div className="flex items-center -space-x-2">
                    {savedIntegrations.map((i) => (
                      <motion.div
                        key={i.id}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex size-7 items-center justify-center rounded-full border-2 border-white/20 text-[11px] font-semibold text-white shadow-md"
                        style={{ background: i.color }}
                        title={i.name}
                      >
                        {i.letter}
                      </motion.div>
                    ))}
                  </div>
                  <motion.button
                    initial={{ opacity: 0, x: 4 }}
                    animate={{ opacity: 1, x: 0 }}
                    type="button"
                    disabled={!canCreate}
                    onClick={() => setStep("create")}
                    className="h-8 rounded-full px-3 text-[12px] font-medium text-white shadow-lg shadow-black/20 transition-transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
                    style={{ background: ACCENT }}
                  >
                    Create workspace →
                  </motion.button>
                </div>
              )}
            </div>

          </div>

          {/* Frosted create bar — Figma rounded-bl/br glass foot */}
          <button
            type="button"
            onClick={() => setStep("create")}
            className="group relative w-full overflow-hidden rounded-b-[50px] border-2 border-t-0 border-white/20 bg-white/15 py-[17px] backdrop-blur-[15px] transition-all duration-300 hover:bg-white/40 focus-visible:bg-white/40 focus-visible:outline-none active:bg-white/40"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 group-active:opacity-100"
              style={{
                background:
                  "linear-gradient(90deg, rgba(255,228,228,0.55) 0%, rgba(255,255,255,0.35) 45%, rgba(230,244,254,0.65) 100%)",
              }}
            />
            <span className="relative flex items-center gap-3 px-8 py-2 text-[17px] font-normal leading-[1.2] text-white transition-colors duration-300 group-hover:text-[#0d2847] group-focus-visible:text-[#0d2847] group-active:text-[#0d2847]">
              <Plus className="size-[26px] shrink-0" strokeWidth={2} />
              Create new workspace
            </span>
          </button>

          <div className="mt-3 flex items-center justify-between px-10 text-white">
            <button
              type="button"
              className="flex items-center gap-2 text-[17px]"
            >
              <span>English (United Kingdom)</span>
              <ChevronDown className="size-[17px] shrink-0" />
            </button>
            <div className="flex items-center gap-2 text-[13px]">
              <span className="cursor-pointer hover:opacity-80">Privacy Policy</span>
              <span className="size-1 rounded-full bg-white/80" />
              <span className="cursor-pointer hover:opacity-80">Terms of Service</span>
            </div>
          </div>
        </div>
        )}

        {step === "picker" && (
        <div
          className="absolute bottom-0"
          style={{ left: FRAME_INSET, width: CONTENT_W }}
        >
          <button
            type="button"
            onClick={openModal}
            className="flex h-[77px] w-full items-center justify-center gap-2 rounded-t-[38px] rounded-b-none border border-b-0 border-white/40 bg-white/10 text-[17px] font-medium tracking-tight text-white backdrop-blur-[8px] transition-colors hover:bg-white/14"
          >
            <Plus className="size-[19px]" /> Add Integration
          </button>
        </div>
        )}

        {step === "create" && (
          <CreateWorkspacePanel
            isDark={isDark}
            textMain={textMain}
            textSub={textSub}
            companyName={companyName}
            setCompanyName={setCompanyName}
            onBack={() => setStep("picker")}
            onNext={onNext}
          />
        )}

        <AnimatePresence>
          {modalOpen && (
            <motion.div
              className="absolute inset-0 z-50 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div
                className={`absolute inset-0 backdrop-blur-sm transition-colors duration-300 ${
                  isDark ? "bg-black/50" : "bg-black/10"
                }`}
                onClick={() => setModalOpen(false)}
              />
              <motion.div
                initial={{ scale: 0.96, y: 8, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.96, y: 8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
                className="relative flex w-[560px] flex-col items-end gap-2"
              >
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className={`flex size-11 items-center justify-center rounded-full backdrop-blur-xl transition-colors duration-300 ${
                    isDark
                      ? "border border-white/30 bg-white/10 text-white/90 hover:bg-white/20"
                      : "border border-zinc-900/20 bg-white/70 text-zinc-900 hover:bg-white"
                  }`}
                  aria-label="Close"
                >
                  <X className="size-4" />
                </button>

                <div
                  className={`w-full rounded-2xl p-3.5 shadow-2xl shadow-black/40 backdrop-blur-[40px] transition-colors duration-300 ${
                    isDark ? "border border-white/15 bg-white/[0.05]" : "border border-white/70 bg-white/60"
                  }`}
                >
                  <div className="flex items-center justify-between px-1 pb-3 pt-1">
                    <h3 className={`text-[16px] font-normal tracking-tight transition-colors duration-300 ${textMain}`}>
                      Add following integrations to your stack
                    </h3>
                    <div className="flex shrink-0 items-center gap-2">
                      <span className={`text-[13px] transition-colors duration-300 ${textMain}`}>Active</span>
                      <span
                        className={`relative flex h-3.5 w-7 items-center justify-end rounded-full px-0.5 transition-colors duration-300 ${
                          isDark ? "bg-white" : "bg-zinc-900"
                        }`}
                      >
                        <span className={`size-2.5 rounded-full shadow transition-colors duration-300 ${isDark ? "bg-[#627C92]" : "bg-white"}`} />
                      </span>
                    </div>
                  </div>

                  <div
                    className={`flex flex-col gap-3 rounded-xl p-3 transition-colors duration-300 ${
                      isDark ? "border border-white/25" : "border border-zinc-900/10"
                    }`}
                  >
                    <div
                      className={`flex h-9 items-center gap-2 rounded-full px-3 transition-colors duration-300 ${
                        isDark
                          ? "border border-white/25 bg-white/[0.12]"
                          : "border border-zinc-900/10 bg-white/70"
                      }`}
                    >
                      <Search className={`size-4 transition-colors duration-300 ${isDark ? "text-white" : "text-zinc-900"}`} />
                      <input
                        autoFocus
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search Integrations"
                        className={`flex-1 bg-transparent text-[14px] outline-none transition-colors duration-300 ${
                          isDark
                            ? "text-white placeholder-white/50"
                            : "text-zinc-900 placeholder-zinc-500"
                        }`}
                      />
                    </div>

                    <div className={`h-px transition-colors duration-300 ${isDark ? "bg-white/20" : "bg-zinc-900/10"}`} />

                    <ul className="flex flex-col gap-2">
                      {filtered.map((i) => {
                        const checked = draftSelected.includes(i.id);
                        return (
                          <li key={i.id}>
                            <button
                              type="button"
                              onClick={() => toggle(i.id)}
                              className="group flex w-full items-center gap-2.5 text-left"
                            >
                              <span
                                className={`flex size-[18px] shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                                  checked
                                    ? "border-transparent"
                                    : isDark
                                      ? "border-white/30 group-hover:border-white/60"
                                      : "border-zinc-900/30 group-hover:border-zinc-900/60"
                                }`}
                                style={checked ? { background: ACCENT } : undefined}
                              >
                                {checked && (
                                  <Check className="size-3 text-white" strokeWidth={3} />
                                )}
                              </span>
                              <span className={`text-[15px] font-normal tracking-tight transition-colors duration-300 ${textMain}`}>
                                {i.name}
                              </span>
                            </button>
                          </li>
                        );
                      })}
                      {filtered.length === 0 && (
                        <li className={`py-4 text-center text-[13px] transition-colors duration-300 ${textMuted}`}>
                          No integrations match "{query}"
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="flex items-center justify-end gap-1.5 pt-3 pr-1">
                    {draftSelected.length > 0 && (
                      <Check className="size-4 text-[#01BB74]" strokeWidth={3} />
                    )}
                    <span className={`text-[12px] transition-colors duration-300 ${textMain}`}>
                      {draftSelected.length > 0
                        ? `${draftSelected.length} integration${draftSelected.length === 1 ? "" : "s"} added`
                        : "No integrations added"}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={save}
                  className="h-11 rounded-[20px] px-6 text-[15px] font-normal text-white shadow-lg shadow-black/30 transition hover:brightness-110"
                  style={{ background: "#FF5126" }}
                >
                  Save Integration
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </OdicciBrowserFrame>
  );
}
interface CreateWorkspacePanelProps {
  isDark: boolean;
  textMain: string;
  textSub: string;
  companyName: string;
  setCompanyName: (v: string) => void;
  onBack: () => void;
  onNext?: () => void;
}

/**
 * CreateWorkspacePanel — Figma 713:199787 inside 1512×982 artboard (65:94009).
 * Absolute inset matches wireframe: left 76 / top 156 / 1360×739.
 */
function CreateWorkspacePanel({
  isDark,
  textMain,
  textSub,
  companyName,
  setCompanyName,
  onBack,
  onNext,
}: CreateWorkspacePanelProps) {
  const [timezone] = useState("Europe/London (GMT/BST)");
  const [companySize, setCompanySize] = useState("");
  const [hearAbout, setHearAbout] = useState("");
  const [useLogo, setUseLogo] = useState(true);
  const [touched, setTouched] = useState(false);

  const showError = touched && companyName.trim().length === 0;
  const initial = (companyName.trim()[0] || "W").toUpperCase();

  const fieldBg = isDark ? "bg-white/20" : "bg-white/70 border border-zinc-900/10";
  const fieldBgMuted = isDark ? "bg-white/15" : "bg-white/60 border border-zinc-900/10";
  const labelClass = `text-[10px] leading-[1.2] transition-colors duration-300 ${textMain}`;
  const helpIconClass = isDark ? "text-white/40" : "text-zinc-400";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="absolute"
      style={{ left: 76, top: 156, width: 1360, height: 739 }}
    >
      {/*
        Figma 713:199787 — fixed 617 | 126 | 617 so the gap centre sits on
        artboard x=756, matching the mesh’s middle vertical grid line.
      */}
      <WorkspacePreviewWindow title="Workspace Name" />

      {/* Divider — centred on mesh middle line (panel x=680 → artboard 756) */}
      <div
        aria-hidden
        className="absolute top-[19px] h-[701px] w-px -translate-x-1/2 bg-gradient-to-b from-white/10 via-white/50 to-white/10"
        style={{ left: 680 }}
      />

      {/* RIGHT — create form (617×739 at x 743) */}
      <div
        className={`absolute left-[743px] top-0 flex h-[739px] w-[617px] flex-col items-center gap-[42px] rounded-[24px] border p-6 backdrop-blur-[2px] transition-colors duration-300 ${
          isDark ? "border-white bg-[rgba(0,50,90,0.2)]" : "border-white/70 bg-white/60"
        }`}
      >
        <div className="flex w-full flex-col gap-0.5">
          <h2 className={`text-[28px] font-normal leading-[1.2] transition-colors duration-300 ${textMain}`}>
            Create your workspace
          </h2>
          <p className={`text-[20px] font-normal leading-[1.2] transition-colors duration-300 ${isDark ? "text-[#a3aebb]" : textSub}`}>
            Set up your workspace to get started with Odicci
          </p>
        </div>

        <div className="flex min-h-0 w-full flex-1 flex-col gap-6">
          {/* Logo upload */}
          <div className="flex w-full flex-col gap-2">
            <p className={labelClass}>Upload your company logo</p>
            <div className="flex items-center gap-3">
              <div
                className="flex size-[52px] shrink-0 items-center justify-center rounded-full text-[20px] leading-[1.1] text-white"
                style={{ backgroundImage: "linear-gradient(135deg, #FF6900 0%, #F54900 100%)" }}
              >
                {initial}
              </div>
              <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="flex h-[35px] min-w-0 flex-1 items-center justify-center gap-0 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-[16px] leading-[1.2] text-[#090e15]"
                  >
                    <Upload className="mr-1 size-4 shrink-0 text-zinc-500" />
                    Upload Image
                  </button>
                  <button
                    type="button"
                    className="flex h-[35px] w-[83px] shrink-0 items-center justify-center rounded-lg border border-[#e2e6ea] bg-[#e2e6ea] px-3 py-2 text-[16px] leading-[1.2] text-[#7a838c]"
                  >
                    Remove
                  </button>
                </div>
                <p className={`text-[10px] leading-[1.2] ${isDark ? "text-white/60" : "text-zinc-500"}`}>
                  *Png,*.jpeg files up to 10MB at least 400px by 400px
                </p>
              </div>
            </div>
          </div>

          {/* Checkbox */}
          <button
            type="button"
            onClick={() => setUseLogo((v) => !v)}
            className="flex w-full items-center gap-1 text-left"
          >
            <span
              className={`flex size-4 shrink-0 items-center justify-center rounded-[3px] border transition-colors ${
                useLogo ? "border-transparent" : isDark ? "border-white/40" : "border-zinc-400"
              }`}
              style={useLogo ? { background: ACCENT } : undefined}
            >
              {useLogo && <Check className="size-3 text-white" strokeWidth={3} />}
            </span>
            <span className={`text-[10px] leading-[1.2] ${textMain}`}>
              Use this logo for your experiences
            </span>
          </button>

          {/* Fields + actions */}
          <div className="flex min-h-0 w-full flex-1 flex-col justify-between">
            <div className="flex w-full flex-col gap-5">
              {/* Company Name */}
              <div className="flex w-full flex-col gap-1">
                <div className="flex items-center gap-2">
                  <label className={`min-w-0 flex-1 ${labelClass}`}>Company Name</label>
                  <HelpCircle className={`size-4 shrink-0 ${helpIconClass}`} />
                </div>
                <input
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  onBlur={() => setTouched(true)}
                  placeholder="Enter your company name"
                  className={`w-full rounded-[10px] p-3 text-[12px] leading-[1.2] outline-none transition-colors duration-300 ${fieldBg} ${textMain} placeholder:text-white/50`}
                />
                {showError && (
                  <div className="flex items-center gap-1.5">
                    <AlertTriangle className="size-3 shrink-0" style={{ color: "#FFB0B0" }} />
                    <span className="text-[12px]" style={{ color: "#FFB0B0" }}>
                      You must add company name
                    </span>
                  </div>
                )}
              </div>

              {/* Timezone */}
              <div className="flex w-full flex-col gap-1">
                <div className="flex items-center justify-between">
                  <label className={labelClass}>Timezone</label>
                  <HelpCircle className={`size-4 shrink-0 ${helpIconClass}`} />
                </div>
                <div className={`flex w-full items-center gap-2.5 rounded-[10px] p-3 ${fieldBg}`}>
                  <span className={`min-w-0 flex-1 truncate text-[12px] leading-[1.2] ${textMain}`}>
                    {timezone}
                  </span>
                  <ChevronDown className="size-[18px] shrink-0 opacity-70" />
                </div>
              </div>

              {/* Company Size */}
              <div className="flex w-full flex-col gap-1">
                <div className="flex items-center justify-between">
                  <label className={labelClass}>Company Size</label>
                  <HelpCircle className={`size-4 shrink-0 ${helpIconClass}`} />
                </div>
                <button
                  type="button"
                  onClick={() => setCompanySize((s) => (s ? "" : "11–50 employees"))}
                  className={`flex w-full items-center gap-2.5 rounded-[10px] p-3 text-left ${fieldBgMuted}`}
                >
                  <span
                    className={`min-w-0 flex-1 truncate text-[12px] leading-[1.2] ${
                      companySize ? textMain : isDark ? "text-white/70" : "text-zinc-500"
                    }`}
                  >
                    {companySize || "Select your annual revenue (approx.)"}
                  </span>
                  <ChevronDown className="size-[18px] shrink-0 opacity-70" />
                </button>
              </div>

              {/* Hear about */}
              <div className="flex w-full flex-col gap-1">
                <div className="flex items-center gap-2">
                  <label className={labelClass}>How did you hear about Odicci?</label>
                  <HelpCircle className={`size-4 shrink-0 ${helpIconClass}`} />
                </div>
                <div className="flex w-full flex-col gap-4">
                  <input
                    value={hearAbout}
                    onChange={(e) => setHearAbout(e.target.value)}
                    placeholder="Shopify App Store, Google, an event, a friend…"
                    className={`w-full rounded-[10px] p-3 text-[12px] leading-[1.2] outline-none transition-colors duration-300 ${fieldBgMuted} ${textMain} placeholder:text-white/50`}
                  />
                  <div className="flex items-start gap-1">
                    <Info className="mt-px size-3.5 shrink-0 text-[#bbc2cb]" />
                    <p className="text-[10px] leading-[1.2] text-[#bbc2cb]">
                      You&apos;ll become the owner of this workspace. As the owner, you&apos;ll have full
                      control of the workspace. You can change your user role later in Settings
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex w-full items-center gap-2">
              <button
                type="button"
                onClick={onBack}
                className="flex flex-1 items-center justify-center rounded-[64px] border border-white/60 bg-[#d0d8e2] p-2.5 text-center text-[12px] leading-[1.2] text-[#646464] transition hover:brightness-95"
              >
                Go Back
              </button>
              <button
                type="button"
                onClick={() => {
                  setTouched(true);
                  if (companyName.trim().length > 0) onNext?.();
                }}
                className="flex flex-1 items-center justify-center rounded-[64px] p-2.5 text-center text-[12px] leading-[1.2] text-white transition hover:brightness-110"
                style={{ background: ACCENT }}
              >
                Create Workspace
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function FigmaLinkIcon({ className }: { className?: string }) {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" className={className} aria-hidden xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13.5 22.5H18M13.5 22.5C11.0147 22.5 9 24.5147 9 27C9 29.4853 11.0147 31.5 13.5 31.5C15.9853 31.5 18 29.4853 18 27V22.5M13.5 22.5C11.0147 22.5 9 20.4853 9 18C9 15.5147 11.0147 13.5 13.5 13.5M18 22.5V18M13.5 13.5H18M13.5 13.5C11.0147 13.5 9 11.4853 9 9C9 6.51472 11.0147 4.5 13.5 4.5H18M18 13.5V18M18 13.5V4.5M18 13.5H22.5M18 18C18 20.4853 20.0147 22.5 22.5 22.5C24.9853 22.5 27 20.4853 27 18C27 15.5147 24.9853 13.5 22.5 13.5M18 18C18 15.5147 20.0147 13.5 22.5 13.5M18 4.5H22.5C24.9853 4.5 27 6.51472 27 9C27 11.4853 24.9853 13.5 22.5 13.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Shared left preview window — Figma 713:199788 */
function WorkspacePreviewWindow({ title }: { title: string }) {
  return (
    <div className="absolute left-0 top-[101.5px] flex h-[536px] w-[617px] flex-col">
      <div className="flex w-full items-center justify-between rounded-t-lg border border-[#dbe5ef] bg-white p-3">
        <div className="flex size-6 shrink-0 items-center justify-center overflow-hidden rounded">
          <FigmaLinkIcon className="size-5 text-[#FF5126]" />
        </div>
        <p className="min-w-0 flex-1 text-center text-[12px] leading-[1.2] text-[#111]">{title}</p>
        <div
          className="flex size-6 shrink-0 items-center justify-center rounded-full text-[12px] leading-[1.2] text-white"
          style={{ background: ACCENT }}
        >
          A
        </div>
      </div>
      <div className="flex min-h-0 w-full flex-1 flex-col items-start rounded-b-xl bg-[#f9fafb] p-[60px]">
        <div className="flex w-full items-center justify-center rounded-xl bg-white px-6 pb-6 pt-9">
          <FigmaLinkIcon className="size-9 text-zinc-900" />
        </div>
      </div>
    </div>
  );
}

