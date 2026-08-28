import { motion } from "framer-motion";
import { useState, type CSSProperties } from "react";
import odicciLogo from "@/assets/odicci/odicci-logo-wordmark.png";
import brushIcon from "@/assets/odicci/brush.svg";
import workspaceGradientPattern from "@/assets/odicci/workspace-gradient-pattern.svg";
import workspaceGradient2 from "@/assets/odicci/workspace-gradient-2.svg";
import workspaceDiamondMeshSvg from "@/assets/odicci/workspace-diamond-mesh.svg?raw";
import workspaceMark from "@/assets/odicci/workspace-mark.png";

/**
 * OdicciBrandPalette — Figma 733:200840.
 * Third stage of Brand Personality: suggested palettes + colour slots.
 */

const ACCENT = "#FF5126";
/** Match Create Workspace wordmark scale; PNG is padded (~189/600 left) */
const LOGO_W = Math.round(178 * 1.4); // 249
const LOGO_H = Math.round(86 * 1.4); // 120
const CONTENT_LEFT = 76;
const LOGO_LEFT = Math.round(CONTENT_LEFT - LOGO_W * (189 / 600));

interface Palette {
  name: string;
  colors: [string, string, string];
  labeled?: boolean;
}

const PALETTES: Palette[] = [
  { name: "Orange", colors: ["#EA580C", "#F97316", "#FDBA74"] },
  { name: "Blue", colors: ["#1D4ED8", "#3B82F6", "#93C5FD"] },
  { name: "Pink", colors: ["#DB2777", "#EC489A", "#F9A8D4"] },
  { name: "Red", colors: ["#DC2626", "#F87171", "#FECACA"] },
  { name: "Purple", colors: ["#6D28D9", "#8B5CF7", "#C4B5FD"] },
  { name: "Custom", colors: ["#3B9EFF", "#004074", "#FF5126"], labeled: true },
];

type SlotKey = "primary" | "secondary" | "accent";
interface Slot {
  key: SlotKey;
  label: string;
  color: string;
  opacity: number;
}

export function OdicciBrandPalette({
  isDark = true,
  onContinue,
  onBack,
}: {
  isDark?: boolean;
  onContinue?: () => void;
  onBack?: () => void;
}) {
  const [selectedPalette, setSelectedPalette] = useState("Custom");
  const [tooltip, setTooltip] = useState<{ name: string; index: number } | null>(null);
  const [slots, setSlots] = useState<Slot[]>([
    { key: "primary", label: "Primary Colour", color: "#6466F1", opacity: 100 },
    { key: "secondary", label: "Secondary Colour", color: "#9294FE", opacity: 100 },
    { key: "accent", label: "Accent Colour", color: "#FF5126", opacity: 100 },
  ]);

  const textMain = isDark ? "text-white" : "text-zinc-900";
  const primary = slots.find((s) => s.key === "primary")!;
  const secondary = slots.find((s) => s.key === "secondary")!;
  const accent = slots.find((s) => s.key === "accent")!;

  const applyPalette = (p: Palette) => {
    setSelectedPalette(p.name);
    setSlots((prev) =>
      prev.map((s) => {
        if (s.key === "primary") return { ...s, color: p.colors[0] };
        if (s.key === "secondary") return { ...s, color: p.colors[1] };
        if (s.key === "accent") return { ...s, color: p.colors[2] };
        return s;
      }),
    );
  };

  const updateColor = (key: SlotKey, color: string) =>
    setSlots((prev) => prev.map((s) => (s.key === key ? { ...s, color } : s)));

  return (
    <div className="relative size-full overflow-hidden">
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
          <div className="absolute left-[-498px] top-[-233px] h-[1448px] w-[2508px]">
            <div className="absolute inset-[-24.52%_-10.37%_-8.43%_-4.78%]">
              <img src={workspaceGradientPattern} alt="" className="block size-full max-w-none" />
            </div>
          </div>
          <div className="absolute inset-0 bg-[rgba(0,17,26,0.6)] backdrop-blur-[100px]" />
          <div className="absolute left-[-172px] top-[-156px] h-[588px] w-[1908px]">
            <div className="absolute inset-[-65.99%_-15.72%_-51.02%_-19.39%]">
              <img src={workspaceGradient2} alt="" className="block size-full max-w-none" />
            </div>
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[1176px] w-[1565px] -translate-x-1/2 -translate-y-1/2 [&_svg]:block [&_svg]:size-full [&_svg]:max-w-none"
        dangerouslySetInnerHTML={{ __html: workspaceDiamondMeshSvg }}
      />

      <img
        src={odicciLogo}
        alt="odicci"
        className="absolute object-contain object-left"
        style={{ left: LOGO_LEFT, top: 48, width: LOGO_W, height: LOGO_H }}
        width={LOGO_W}
        height={LOGO_H}
      />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="absolute"
        style={{ left: 76, top: 0, width: 1360, height: 982 }}
      >
        <div className="absolute left-0 top-[156px] h-[739px] w-[1360px]">
          <WorkspacePreviewWindow
            primary={primary.color}
            secondary={secondary.color}
            accent={accent.color}
          />

          <div
            aria-hidden
            className="absolute top-[19px] h-[701px] w-px -translate-x-1/2 bg-gradient-to-b from-white/10 via-white/50 to-white/10"
            style={{ left: 680 }}
          />

          <div
            className={`absolute left-[743px] top-0 flex h-[739px] w-[617px] flex-col items-center gap-[42px] overflow-hidden rounded-[24px] border p-6 backdrop-blur-[4px] ${
              isDark ? "border-white bg-[rgba(2,60,107,0.2)]" : "border-white/70 bg-white/60"
            }`}
          >
            <div className="flex w-full flex-col items-start">
              <p className={`w-full text-[28px] font-normal leading-[1.2] ${textMain}`}>
                Let&apos;s add your brand personality...
              </p>
              <p className="w-full text-[20px] font-normal leading-[1.2] text-[#d0d8e2]">
                So every experience feels 100% on-brand
              </p>
            </div>

            <div className="flex w-full max-w-[443px] flex-col items-center gap-6">
              <div
                className="flex size-[30px] items-center justify-center rounded-lg p-1.5"
                style={{ background: ACCENT }}
              >
                <img src={brushIcon} alt="" aria-hidden className="size-4" />
              </div>
              <div className="flex items-center justify-center gap-2.5">
                <span className="size-2 rounded-full bg-white/85" />
                <span className="size-2 rounded-full bg-white/85" />
                <span className="h-2 w-6 rounded-[64px]" style={{ background: ACCENT }} />
                <span className="size-2 rounded-full bg-white/20" />
                <span className="size-2 rounded-full bg-white/20" />
              </div>
            </div>

            <div className="flex min-h-0 w-full flex-1 flex-col gap-6">
              <div className="min-h-0 w-full flex-1 overflow-y-auto overflow-x-hidden pr-1">
                <div className="flex w-full flex-col gap-9">
                  <div className="flex w-full flex-col gap-2">
                    <p className="text-[10px] leading-[1.2] text-white">Suggested palletes</p>
                    <div className="grid w-full grid-cols-3 gap-3">
                      {PALETTES.map((p) => {
                        const active = p.name === selectedPalette;
                        return (
                          <button
                            key={p.name}
                            type="button"
                            onClick={() => applyPalette(p)}
                            className="flex w-full flex-col items-center gap-1 focus:outline-none"
                          >
                            <div
                              className={`flex h-[62px] w-full items-center justify-between rounded-[64px] p-2 transition-colors ${
                                active ? "bg-white/60" : "bg-white/30 hover:bg-white/40"
                              }`}
                            >
                              {p.colors.map((c, i) => (
                                <div
                                  key={i}
                                  className="relative flex size-[46px] shrink-0 items-center justify-center rounded-full border border-white/60"
                                  style={{ background: c }}
                                  onMouseEnter={() => setTooltip({ name: p.name, index: i })}
                                  onMouseLeave={() => setTooltip(null)}
                                >
                                  {p.labeled && (
                                    <span className="text-[10px] leading-[1.2] text-white">
                                      {(["P", "S", "A"] as const)[i]}
                                    </span>
                                  )}
                                  {tooltip?.name === p.name && tooltip.index === i && i === 2 && (
                                    <span className="absolute -top-9 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-lg bg-white px-2.5 py-2.5 text-[10px] leading-[1.2] text-[#090e15] shadow-[0px_4px_2px_rgba(0,0,0,0.05)]">
                                      Accent Colour
                                      <span className="absolute -bottom-1 left-1/2 size-1.5 -translate-x-1/2 rotate-45 bg-white" />
                                    </span>
                                  )}
                                </div>
                              ))}
                            </div>
                            <span className="w-full text-center text-[10px] leading-[1.2] text-[#e2e6ea]">
                              {p.name}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex w-full flex-col gap-2">
                    <p className="text-[10px] leading-[1.2] text-[#e2e6ea]">Background</p>
                    <div className="flex w-full flex-col gap-3">
                      {slots.map((s) => (
                        <div
                          key={s.key}
                          className="flex w-full flex-col gap-2 rounded-xl border border-white/15 bg-white/60 p-2"
                        >
                          <p className="text-[10px] leading-[1.2] text-[#090e15]">{s.label}</p>
                          <div className="flex w-full items-center gap-3 rounded-lg bg-[#f6f7f8] p-2">
                            <label
                              className="relative size-6 shrink-0 cursor-pointer overflow-hidden rounded border border-[#d9d9d9]"
                              style={{ background: s.color }}
                            >
                              <input
                                type="color"
                                value={s.color}
                                onChange={(e) => updateColor(s.key, e.target.value)}
                                className="absolute inset-0 cursor-pointer opacity-0"
                              />
                            </label>
                            <input
                              value={s.color.toUpperCase()}
                              onChange={(e) => updateColor(s.key, e.target.value)}
                              className="min-w-0 flex-1 bg-transparent text-[12px] leading-[1.2] text-[#090e15] outline-none"
                            />
                            <div className="h-5 w-px bg-[#d9d9d9]" />
                            <span className="w-[43px] text-[12px] leading-[1.2] tabular-nums text-[#090e15]">
                              {s.opacity}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex w-full shrink-0 items-center gap-4">
                <button
                  type="button"
                  onClick={onBack}
                  disabled={!onBack}
                  className="flex flex-1 items-center justify-center rounded-[36px] border border-[#d0d8e2] bg-[#f8f9fb] px-2.5 py-3 text-center text-[12px] leading-[1.2] text-[#7a838c] transition hover:brightness-95 disabled:opacity-40"
                >
                  Go back
                </button>
                <button
                  type="button"
                  onClick={onContinue}
                  className="flex flex-1 items-center justify-center rounded-[36px] px-2.5 py-3 text-center text-[12px] leading-[1.2] text-white transition hover:brightness-110"
                  style={{ background: ACCENT }}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function WorkspacePreviewWindow({
  primary,
  secondary,
  accent,
}: {
  primary: string;
  secondary: string;
  accent: string;
}) {
  return (
    <div className="absolute left-0 top-[101.5px] flex h-[536px] w-[617px] flex-col">
      <div className="flex w-full items-center justify-between rounded-t-lg border border-[#dbe5ef] bg-white p-3">
        <img src={workspaceMark} alt="" className="size-6 shrink-0 object-contain" />
        <p className="min-w-0 flex-1 text-center text-[12px] leading-[1.2] text-[#111]">
          Workspace Name
        </p>
        <div
          className="flex size-6 shrink-0 items-center justify-center rounded-full text-[12px] leading-[1.2] text-white transition-colors duration-500"
          style={{ background: accent }}
        >
          A
        </div>
      </div>
      <div className="flex min-h-0 w-full flex-1 flex-col items-start rounded-b-xl bg-[#f9fafb] p-[60px]">
        <div
          className="flex w-full items-center justify-center rounded-xl px-6 pb-6 pt-9 transition-colors duration-500"
          style={{ background: secondary === "#9294FE" ? "#FCDF3C" : secondary }}
        >
          <FigmaMark className="size-9" style={{ color: primary }} />
        </div>
      </div>
    </div>
  );
}

function FigmaMark({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 38 57" fill="none" className={className} style={style} aria-hidden>
      <path
        d="M19 28.5c0-5.247 4.253-9.5 9.5-9.5S38 23.253 38 28.5 33.747 38 28.5 38 19 33.747 19 28.5Z"
        fill="currentColor"
        fillOpacity="0.9"
      />
      <path
        d="M0 47.5C0 42.253 4.253 38 9.5 38H19v9.5C19 52.747 14.747 57 9.5 57S0 52.747 0 47.5Z"
        fill="currentColor"
        fillOpacity="0.75"
      />
      <path
        d="M19 0v19H9.5C4.253 19 0 14.747 0 9.5S4.253 0 9.5 0H19Z"
        fill="currentColor"
        fillOpacity="0.85"
      />
      <path d="M19 0h9.5C33.747 0 38 4.253 38 9.5S33.747 19 28.5 19H19V0Z" fill="currentColor" />
      <path
        d="M0 28.5C0 23.253 4.253 19 9.5 19H19v19H9.5C4.253 38 0 33.747 0 28.5Z"
        fill="currentColor"
        fillOpacity="0.65"
      />
    </svg>
  );
}
