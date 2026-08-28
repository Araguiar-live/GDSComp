import { AnimatePresence, motion } from "framer-motion";
import { Upload, User, Check, Mail, Lock, Sparkles, ChevronDown } from "lucide-react";
import { useState } from "react";
import { OdicciBrowserFrame } from "@/components/portfolio/OdicciBrowserFrame";

/**
 * OdicciMockup — pixel-authentic replica of the Odicci onboarding sandbox.
 * Shares OdicciBrowserFrame (1512×982 scaled) with other Odicci tabs.
 */

const ACCENT = "#E9582C";
const FONT = "Poppins, ui-sans-serif, system-ui, sans-serif";

// Full onboarding phases:
// 0 = Landing / Auth gate
// 1 = Business context (Industry / Niche)
// 2 = Workspace name
// 3 = Brand palette
// 4 = Typography
// 5 = Goals
// 6 = Success
type Step = 0 | 1 | 2 | 3 | 4 | 5 | 6;
const WIZARD_STEPS: Step[] = [1, 2, 3, 4, 5];

export function OdicciMockup() {
  const [step, setStep] = useState<Step>(0);
  const [workspace, setWorkspace] = useState("Odicci Workspace");
  const [paletteIndex, setPaletteIndex] = useState(0);

  const next = () => setStep((s) => (s < 6 ? ((s + 1) as Step) : s));
  const back = () => setStep((s) => (s > 0 ? ((s - 1) as Step) : s));

  return (
    <OdicciBrowserFrame
      tabLabel="odicci | Messaging Hub"
      url={step === 0 ? "odicci.com/signup" : step === 6 ? "odicci.com/studio" : "odicci.com/onboarding"}
      canvasClassName="bg-[#0B111E]"
      showThemeToggle={false}
    >
      <div className="relative size-full overflow-hidden text-white" style={{ fontFamily: FONT }}>
        <div
          className="pointer-events-none absolute -bottom-40 -left-40 h-[560px] w-[560px] rounded-full opacity-40 blur-3xl"
          style={{ background: "radial-gradient(circle, #E9582C 0%, transparent 60%)" }}
        />
        <div
          className="pointer-events-none absolute -right-32 -top-48 h-[620px] w-[620px] rounded-full opacity-45 blur-3xl"
          style={{ background: "radial-gradient(circle, #3B4CCA 0%, transparent 65%)" }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />

        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <LandingAuth onContinue={() => setStep(1)} />
            </motion.div>
          )}

          {step === 6 && (
            <motion.div
              key="success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <SuccessScreen workspace={workspace} onReset={() => setStep(0)} />
            </motion.div>
          )}

          {step >= 1 && step <= 5 && (
            <motion.div
              key="wizard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex min-h-0 flex-col gap-6 p-6 md:flex-row md:gap-8 md:p-10"
            >
              {/* LEFT — Live Preview Sandbox */}
              <div className="md:w-1/2">
                <LivePreview step={step} workspace={workspace} paletteIndex={paletteIndex} />
              </div>

              {/* RIGHT — Setup Configurator */}
              <div className="md:w-1/2 flex flex-col">
                {/* Progress row */}
                <div className="flex items-center gap-3 mb-8">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: ACCENT }}
                  >
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex items-center gap-2 flex-1">
                    {WIZARD_STEPS.map((s) => (
                      <span
                        key={s}
                        className="h-[3px] flex-1 rounded-full transition-colors"
                        style={{
                          backgroundColor: s <= step ? ACCENT : "rgba(255,255,255,0.12)",
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Step body */}
                <div className="flex-1">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {step === 1 && <StepBusiness />}
                      {step === 2 && (
                        <StepWorkspace value={workspace} onChange={setWorkspace} />
                      )}
                      {step === 3 && (
                        <StepPalette selected={paletteIndex} onSelect={setPaletteIndex} />
                      )}
                      {step === 4 && <StepFonts />}
                      {step === 5 && <StepGoals />}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Footer nav */}
                <div className="flex items-center justify-between gap-3 mt-8 pt-6 border-t border-white/5">
                  <button
                    type="button"
                    onClick={back}
                    className="border border-white/20 bg-white/5 hover:bg-white/10 text-white font-medium rounded-full px-6 py-2 text-sm transition-all"
                  >
                    Go back
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    className="text-white font-semibold rounded-full px-8 py-2 text-sm shadow-lg shadow-orange-950/20 active:scale-[0.98] transition-all"
                    style={{ backgroundColor: ACCENT }}
                  >
                    {step === 5 ? "Finish" : "Continue"}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </OdicciBrowserFrame>
  );
}

/* ------------------------ LEFT — Live Preview ------------------------ */

const PALETTES = [
  { name: "Orange", primary: "#E9582C", secondary: "#F59E0B", gradient: "conic-gradient(from 0deg, #E9582C, #F59E0B, #E9582C)" },
  { name: "Blue", primary: "#3B4CCA", secondary: "#0EA5E9", gradient: "conic-gradient(from 0deg, #3B4CCA, #0EA5E9, #3B4CCA)" },
  { name: "Pit", primary: "#1C1917", secondary: "#52525B", gradient: "conic-gradient(from 0deg, #1C1917, #52525B, #1C1917)" },
  { name: "Red", primary: "#DC2626", secondary: "#F43F5E", gradient: "conic-gradient(from 0deg, #DC2626, #F43F5E, #DC2626)" },
  { name: "Purple", primary: "#8B5CF6", secondary: "#EC4899", gradient: "conic-gradient(from 0deg, #8B5CF6, #EC4899, #8B5CF6)" },
  { name: "Cyan", primary: "#06B6D4", secondary: "#22D3EE", gradient: "conic-gradient(from 0deg, #06B6D4, #22D3EE, #06B6D4)" },
];

function LivePreview({
  step,
  workspace,
  paletteIndex,
}: {
  step: Step;
  workspace: string;
  paletteIndex: number;
}) {
  const palette = PALETTES[paletteIndex];
  const title =
    step === 2 ? workspace || "Workspace Name" : step === 1 ? "New Workspace" : workspace;

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 p-6 flex flex-col min-h-[440px] shadow-xl relative animate-fade-in">
      {/* Header with corner dots */}
      <div className="relative border-b border-zinc-100 pb-4 mb-6">
        <span
          className="absolute -top-1 -left-1 w-2.5 h-2.5 rounded-full"
          style={{ backgroundColor: ACCENT }}
        />
        <span
          className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full"
          style={{ backgroundColor: ACCENT }}
        />
        <div className="text-center text-xs font-medium tracking-tight text-zinc-800">
          {title}
        </div>
      </div>

      {/* Central canvas */}
      <div className="flex-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {step <= 3 ? (
            <motion.div
              key={"logo-" + paletteIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="rounded-xl px-10 py-8 text-white text-center flex flex-col items-center justify-center font-medium shadow-md"
              style={{
                background: step === 3
                  ? `linear-gradient(135deg, ${palette.primary}, ${palette.secondary})`
                  : "rgb(129 140 248 / 0.9)",
              }}
            >
              <span className="text-5xl font-semibold leading-none">
                {(workspace?.trim()?.[0] || "f").toLowerCase()}
              </span>
              {step === 2 && workspace && (
                <span className="mt-3 text-xs font-medium tracking-tight opacity-90">
                  {workspace}
                </span>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="type"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="rounded-xl px-8 py-6 text-white text-center max-w-xs shadow-md"
              style={{
                background: `linear-gradient(135deg, ${palette.primary}, ${palette.secondary})`,
              }}
            >
              <p className="text-sm leading-snug font-medium">
                Body text activated — XP rewarded for great typography
              </p>
              <button
                type="button"
                className="mt-4 text-[11px] font-medium tracking-tight px-3 py-1 rounded-full border border-white/60 text-white hover:bg-white/10 transition-colors"
              >
                Press play
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ------------------------ Phase 1 — Landing / Auth ------------------------ */

function LandingAuth({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="relative flex h-full min-h-0 flex-col gap-6 p-6 md:flex-row md:gap-10 md:p-10">
      {/* Left — value props */}
      <div className="md:w-1/2 flex flex-col justify-center text-white">
        <span className="text-[11px] tracking-[0.24em] uppercase text-white/60">
          Odicci Studio
        </span>
        <h2 className="mt-4 text-4xl md:text-5xl font-medium tracking-tight leading-[1.05]">
          Create engaging,
          <br />
          data-driven games
          <br />
          your customers love.
        </h2>
        <p className="mt-5 text-sm text-white/60 max-w-sm leading-relaxed">
          Launch branded campaigns in minutes. Onboard once — your workspace adapts to your team,
          your brand, and your goals.
        </p>
        <div className="mt-8 flex items-center gap-6 text-[11px] text-white/50">
          <span className="flex items-center gap-2"><Check className="w-3.5 h-3.5" style={{ color: ACCENT }} /> No credit card</span>
          <span className="flex items-center gap-2"><Check className="w-3.5 h-3.5" style={{ color: ACCENT }} /> Free trial</span>
        </div>
      </div>

      {/* Right — glass auth card */}
      <div className="md:w-1/2 flex items-center">
        <div className="w-full rounded-2xl border border-white/15 bg-white/[0.06] backdrop-blur-xl p-6 md:p-7 shadow-2xl shadow-black/40">
          <h3 className="text-white text-lg font-medium tracking-tight">Create your account</h3>
          <p className="text-white/50 text-xs mt-1">Start building your first workspace.</p>

          <button
            type="button"
            className="mt-5 w-full flex items-center justify-center gap-2 h-10 rounded-xl bg-white text-zinc-900 text-sm font-medium hover:bg-white/90 transition-colors"
          >
            <GoogleGlyph /> Sign up with Google
          </button>

          <div className="flex items-center gap-3 my-4 text-[10px] uppercase tracking-widest text-white/40">
            <div className="h-px flex-1 bg-white/10" /> or <div className="h-px flex-1 bg-white/10" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <GlassInput placeholder="First name" />
            <GlassInput placeholder="Last name" />
          </div>
          <div className="mt-2">
            <GlassInput placeholder="Email" icon={<Mail className="w-3.5 h-3.5" />} />
          </div>
          <div className="mt-2">
            <GlassInput placeholder="Password" type="password" icon={<Lock className="w-3.5 h-3.5" />} />
          </div>

          <button
            type="button"
            onClick={onContinue}
            className="mt-5 w-full h-10 rounded-xl text-white text-sm font-semibold tracking-tight shadow-lg shadow-orange-950/30 active:scale-[0.98] transition-all"
            style={{ backgroundColor: ACCENT }}
          >
            Sign Up
          </button>

          <p className="mt-4 text-[11px] text-white/40 text-center">
            Already have an account? <span className="text-white/80 underline underline-offset-2">Log in</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function GoogleGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M23 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.2c-.3 1.5-1.1 2.7-2.4 3.6v3h3.9c2.3-2.1 3.3-5.2 3.3-8.8z" />
      <path fill="#34A853" d="M12 24c3.2 0 5.9-1.1 7.8-2.9l-3.9-3c-1.1.7-2.5 1.2-4 1.2-3 0-5.6-2-6.5-4.8H1.4v3C3.3 21.4 7.3 24 12 24z" />
      <path fill="#FBBC05" d="M5.5 14.5c-.2-.7-.3-1.4-.3-2.2s.1-1.5.3-2.2v-3H1.4C.5 8.8 0 10.6 0 12.3s.5 3.5 1.4 5.2l4.1-3z" />
      <path fill="#EA4335" d="M12 4.7c1.8 0 3.3.6 4.5 1.8l3.4-3.4C17.9 1.1 15.2 0 12 0 7.3 0 3.3 2.6 1.4 6.6l4.1 3C6.4 6.7 9 4.7 12 4.7z" />
    </svg>
  );
}

function GlassInput({
  placeholder,
  type = "text",
  icon,
}: {
  placeholder: string;
  type?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="relative">
      {icon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">{icon}</span>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={
          "w-full h-10 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm placeholder-white/30 outline-none focus:border-white/25 transition-colors " +
          (icon ? "pl-9 pr-3" : "px-3")
        }
      />
    </div>
  );
}

/* ---------------------------- Steps ---------------------------- */

function StepHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-6">
      <h3 className="text-2xl text-white font-medium tracking-tight leading-tight">{title}</h3>
      <p className="text-zinc-400 text-sm mt-1">{subtitle}</p>
    </div>
  );
}

/* Phase 4 — Brand palette */

function StepPalette({
  selected,
  onSelect,
}: {
  selected: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div>
      <StepHeader
        title="Let's add your brand personality..."
        subtitle="So every experience feels 100% on-brand"
      />

      {/* Palette pills */}
      <div className="grid grid-cols-6 gap-2 mb-6">
        {PALETTES.map((p, i) => {
          const active = selected === i;
          return (
            <button
              key={p.name}
              type="button"
              onClick={() => onSelect(i)}
              className="flex flex-col items-center gap-1.5 group"
            >
              <div
                className={
                  "w-11 h-11 rounded-full p-[2px] transition-transform " +
                  (active ? "scale-110" : "opacity-80 group-hover:opacity-100")
                }
                style={{ background: p.gradient }}
              >
                <div className="w-full h-full rounded-full bg-[#0B111E] p-[2px]">
                  <div
                    className="w-full h-full rounded-full"
                    style={{ background: p.gradient }}
                  />
                </div>
              </div>
              {active ? (
                <div className="flex items-center gap-1 mt-0.5">
                  {["P", "S", "A"].map((k) => (
                    <span
                      key={k}
                      className="w-4 h-4 rounded-full bg-white/10 border border-white/20 text-[8px] font-semibold flex items-center justify-center text-white/80"
                    >
                      {k}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-[10px] text-white/50 tracking-tight">{p.name}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Hex fields */}
      <div className="space-y-2">
        {[
          { label: "Primary Colour", hex: PALETTES[selected].primary },
          { label: "Secondary Colour", hex: PALETTES[selected].secondary },
          { label: "Accent Colour", hex: "#3B4CCA" },
        ].map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-xs text-white"
          >
            <div className="flex items-center gap-3">
              <span
                className="w-4 h-4 rounded-full border border-white/15"
                style={{ backgroundColor: row.hex }}
              />
              <span className="text-[11px] tracking-tight text-white/50">
                {row.label}
              </span>
              <span className="tracking-tight">{row.hex}</span>
            </div>
            <span className="text-[10px] text-white/50 px-2 py-0.5 rounded-md bg-white/5 border border-white/10">
              100%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Shared dark select */

function DarkSelect({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="text-[11px] tracking-wide text-white/60">{label}</label>
      <div className="mt-1 flex items-center justify-between bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white text-sm">
        <span className="tracking-tight">{value}</span>
        <ChevronDown className="w-4 h-4 text-white/50" />
      </div>
    </div>
  );
}

/* Phase 2 — Business context */

function StepBusiness() {
  return (
    <div>
      <StepHeader
        title="Tell us about your business..."
        subtitle="So ideas match your market"
      />
      <div className="grid grid-cols-2 gap-3">
        <DarkSelect label="Industry" value="Fashion" />
        <DarkSelect label="Niche" value="Babywear" />
      </div>
      <div className="mt-4">
        <label className="text-[11px] tracking-wide text-white/60">Description</label>
        <textarea
          placeholder="Or text type it in here..."
          className="mt-1 w-full min-h-[110px] bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 outline-none focus:border-white/25 resize-none"
        />
      </div>
    </div>
  );
}

/* Phase 3 — Workspace name */

function StepWorkspace({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <StepHeader
        title="Welcome to your workspace"
        subtitle="Name your team's home base — you can rename it later."
      />
      <label className="text-[11px] tracking-wide text-white/60">Workspace Name</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g. Odicci Workspace"
        className="mt-1 w-full h-12 bg-white/[0.03] border border-white/10 rounded-xl px-4 text-white text-base tracking-tight placeholder-white/30 outline-none focus:border-white/25"
      />
      <p className="mt-3 text-[11px] text-white/40">
        Preview updates live on the left as you type.
      </p>
    </div>
  );
}

/* Phase 5 — Goals */

function StepGoals() {
  return (
    <div>
      <StepHeader
        title="What are you trying to achieve?"
        subtitle="So we can suggest the right experiences"
      />
      <div className="space-y-3">
        <DarkSelect label="Primary goal" value="Increase Retention" />
        <DarkSelect label="Campaign context" value="Back to school" />
        <DarkSelect label="Secondary goal" value="Lead Generation" />
      </div>
    </div>
  );
}

/* Phase 4b — Fonts */

function StepFonts() {
  const [size, setSize] = useState(50);
  return (
    <div>
      <StepHeader
        title="What fonts represent your brand best?"
        subtitle="Help us understand your branding"
      />
      <div className="space-y-3">
        <DarkSelect label="Heading Font" value="Inter" />
        <DarkSelect label="Body Font" value="Inter" />

        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 border border-dashed border-white/20 bg-white/[0.02] rounded-xl px-4 py-3 text-white/80 text-sm hover:bg-white/[0.05] transition-colors"
        >
          <Upload className="w-4 h-4" />
          Upload Custom Font
        </button>

        {/* Font size slider */}
        <div className="pt-4">
          <div className="flex items-center justify-between mb-2 text-[11px] text-white/50 tracking-tight">
            <span>Font size</span>
            <span>{size}%</span>
          </div>
          <div className="relative h-4 flex items-center">
            <div className="absolute inset-x-0 h-px bg-white/20" />
            <input
              type="range"
              min={0}
              max={100}
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="relative w-full appearance-none bg-transparent cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md"
              style={{
                accentColor: ACCENT,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------ Phase 6 — Success ------------------------ */

function SuccessScreen({
  workspace,
  onReset,
}: {
  workspace: string;
  onReset: () => void;
}) {
  return (
    <div className="relative flex h-full min-h-0 flex-col items-center justify-center p-10 text-center">
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 16 }}
        className="w-16 h-16 rounded-full flex items-center justify-center shadow-2xl"
        style={{ backgroundColor: ACCENT, boxShadow: "0 0 60px rgba(233,88,44,0.5)" }}
      >
        <Check className="w-8 h-8 text-white" strokeWidth={3} />
      </motion.div>

      <motion.h2
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="mt-6 text-3xl md:text-4xl font-medium tracking-tight text-white"
      >
        You're all set.
      </motion.h2>
      <motion.p
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="mt-3 text-white/60 text-sm max-w-md"
      >
        <span className="text-white font-medium">{workspace}</span> is provisioned. Jump into the
        studio and launch your first campaign.
      </motion.p>

      <motion.button
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.35 }}
        onClick={onReset}
        type="button"
        className="mt-8 inline-flex items-center gap-2 rounded-full text-white font-semibold px-6 py-2.5 text-sm shadow-lg shadow-orange-950/30 active:scale-[0.98] transition-all"
        style={{ backgroundColor: ACCENT }}
      >
        <Sparkles className="w-4 h-4" /> Enter Studio
      </motion.button>

      <p className="mt-6 text-[11px] text-white/40">Restart demo →</p>
    </div>
  );
}