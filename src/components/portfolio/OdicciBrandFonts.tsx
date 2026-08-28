import { motion } from "framer-motion";
import { ChevronDown, HelpCircle, Type, Upload } from "lucide-react";
import { useState, type CSSProperties } from "react";
import odicciLogo from "@/assets/odicci/odicci-logo-wordmark.png";
import workspaceGradientPattern from "@/assets/odicci/workspace-gradient-pattern.svg";
import workspaceGradient2 from "@/assets/odicci/workspace-gradient-2.svg";
import workspaceDiamondMeshSvg from "@/assets/odicci/workspace-diamond-mesh.svg?raw";
import workspaceMark from "@/assets/odicci/workspace-mark.png";

/**
 * OdicciBrandFonts — Figma 735:201375.
 * Fourth stage of Brand Personality: heading / body fonts + preview.
 */

const ACCENT = "#FF5126";
/** Match Create Workspace wordmark scale; PNG is padded (~189/600 left) */
const LOGO_W = Math.round(178 * 1.4); // 249
const LOGO_H = Math.round(86 * 1.4); // 120
const CONTENT_LEFT = 76;
const LOGO_LEFT = Math.round(CONTENT_LEFT - LOGO_W * (189 / 600));
const HEADING_FONTS = ["Inter", "Poppins", "Roboto", "Playfair Display"] as const;
const BODY_FONTS = ["Inter", "Poppins", "Roboto", "Open Sans"] as const;
const SIZES = ["48px", "72px", "96px", "116px", "144px"] as const;

export function OdicciBrandFonts({
  isDark = true,
  onContinue,
  onBack,
}: {
  isDark?: boolean;
  onContinue?: () => void;
  onBack?: () => void;
}) {
  const [headingFont, setHeadingFont] = useState<(typeof HEADING_FONTS)[number]>("Inter");
  const [bodyFont, setBodyFont] = useState<(typeof BODY_FONTS)[number]>("Inter");
  const [previewText, setPreviewText] = useState("");
  const [size, setSize] = useState<(typeof SIZES)[number]>("116px");
  const [fill, setFill] = useState("#0024EE");
  const [opacity] = useState(100);

  const textMain = isDark ? "text-white" : "text-zinc-900";
  const sizePx = Number.parseInt(size, 10) || 116;
  const sliderPct = Math.round(((sizePx - 48) / (144 - 48)) * 100);

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
            headingFont={headingFont}
            bodyFont={bodyFont}
            previewText={previewText}
            fill={fill}
          />

          <div
            aria-hidden
            className="absolute top-[19px] h-[701px] w-px -translate-x-1/2 bg-gradient-to-b from-white/10 via-white/50 to-white/10"
            style={{ left: 680 }}
          />

          <div
            className={`absolute left-[743px] top-0 flex h-[739px] w-[617px] flex-col items-center gap-4 overflow-hidden rounded-[24px] border p-6 backdrop-blur-[2px] ${
              isDark ? "border-white bg-[rgba(0,50,90,0.2)]" : "border-white/70 bg-white/60"
            }`}
          >
            <div className="flex min-h-0 w-full flex-1 flex-col items-center gap-[42px]">
              <div className="flex w-full flex-col items-start">
                <p className={`w-full text-[28px] font-normal leading-[1.2] ${textMain}`}>
                  What fonts represent your brand best?
                </p>
                <p className="w-full text-[20px] font-normal leading-[1.2] text-white/50">
                  Help us understand your branding
                </p>
              </div>

              <div className="flex w-full flex-col items-center gap-6">
                <div
                  className="flex size-[30px] items-center justify-center rounded-lg p-1.5"
                  style={{ background: ACCENT }}
                >
                  <Type className="size-[18px] text-white" strokeWidth={2} />
                </div>
                <div className="flex items-center justify-center gap-2.5">
                  <span className="size-2 rounded-full bg-white/85" />
                  <span className="size-2 rounded-full bg-white/85" />
                  <span className="size-2 rounded-full bg-white/85" />
                  <span className="h-2 w-6 rounded-[64px]" style={{ background: ACCENT }} />
                  <span className="size-2 rounded-full bg-white/20" />
                </div>
              </div>

              <div className="flex min-h-0 w-full flex-1 flex-col gap-4 overflow-y-auto overflow-x-hidden pr-1">
                <div className="flex w-full flex-col gap-4">
                  <div className="flex w-full flex-col gap-1">
                    <p className="text-[10px] leading-[1.2] text-white">Heading Font</p>
                    <button
                      type="button"
                      onClick={() =>
                        setHeadingFont(
                          (v) => HEADING_FONTS[(HEADING_FONTS.indexOf(v) + 1) % HEADING_FONTS.length],
                        )
                      }
                      className="flex h-9 w-full items-center justify-between rounded-lg border border-white/20 bg-white/25 px-[13px] text-left"
                    >
                      <span className="text-[16px] leading-[1.2] text-white">{headingFont}</span>
                      <ChevronDown className="size-4 shrink-0 text-white/70" />
                    </button>
                  </div>

                  <div className="flex w-full flex-col gap-1">
                    <p className="text-[10px] leading-[1.2] text-white">Body Font</p>
                    <button
                      type="button"
                      onClick={() =>
                        setBodyFont((v) => BODY_FONTS[(BODY_FONTS.indexOf(v) + 1) % BODY_FONTS.length])
                      }
                      className="flex h-9 w-full items-center justify-between rounded-lg border border-white/20 bg-white/25 px-[13px] text-left"
                    >
                      <span className="text-[16px] leading-[1.2] text-white">{bodyFont}</span>
                      <ChevronDown className="size-4 shrink-0 text-white/70" />
                    </button>
                  </div>

                  <div className="flex w-full flex-col gap-1">
                    <div className="flex w-full items-start justify-between text-[10px] leading-[1.2]">
                      <span className="text-white">Upload Font</span>
                      <span className="text-right text-[#bbc2cb]">Supports .ttf, .otf, .woff, .woff2</span>
                    </div>
                    <button
                      type="button"
                      className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#e0e0e0] bg-[#f5f7f9] px-3 py-2.5 transition hover:brightness-95"
                    >
                      <Upload className="size-4 text-[#090e15]" strokeWidth={2} />
                      <span className="text-[16px] leading-[1.2] text-[#090e15]">Upload Custom Font</span>
                    </button>
                  </div>
                </div>

                <div className="flex w-full flex-col gap-1">
                  <div className="flex w-full items-center justify-between">
                    <p className="text-[12px] leading-[1.2] text-white">Preview text</p>
                    <HelpCircle className="size-4 text-white/70" strokeWidth={1.75} />
                  </div>
                  <input
                    value={previewText}
                    onChange={(e) => setPreviewText(e.target.value)}
                    placeholder="Type preview text here"
                    className="w-full rounded-md bg-white/20 px-2.5 py-2 text-[16px] leading-[1.2] text-[#a3aebb] outline-none placeholder:text-[#a3aebb]"
                  />
                </div>

                <div className="flex w-full items-center gap-6">
                  <button
                    type="button"
                    onClick={() => setSize((v) => SIZES[(SIZES.indexOf(v) + 1) % SIZES.length])}
                    className="flex w-[93px] shrink-0 items-center justify-center gap-2.5 rounded-lg border border-white/15 bg-white/20 px-2.5 py-2"
                  >
                    <span className="min-w-0 flex-1 text-left text-[16px] leading-[1.2] text-white">
                      {size}
                    </span>
                    <ChevronDown className="size-[18px] shrink-0 text-white/70" />
                  </button>
                  <div className="relative h-1 min-w-0 flex-1 rounded-full bg-white/25">
                    <div
                      className="absolute left-0 top-0 h-full rounded-full"
                      style={{ width: `${sliderPct}%`, background: ACCENT }}
                    />
                    <div
                      className="absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white"
                      style={{ left: `${sliderPct}%`, background: ACCENT }}
                    />
                  </div>
                </div>

                <div className="flex w-full flex-col gap-2 rounded-xl border border-[#d0d8e2] bg-white/60 p-2">
                  <p className="text-[14px] leading-[1.2] text-[#090e15]">Fill</p>
                  <div className="flex w-full items-center gap-3 rounded-lg bg-[#f9f9f9] p-2">
                    <label
                      className="relative size-6 shrink-0 cursor-pointer overflow-hidden rounded border border-[#d9d9d9]"
                      style={{ background: fill }}
                    >
                      <input
                        type="color"
                        value={fill}
                        onChange={(e) => setFill(e.target.value)}
                        className="absolute inset-0 cursor-pointer opacity-0"
                      />
                    </label>
                    <input
                      value={fill.toUpperCase()}
                      onChange={(e) => setFill(e.target.value)}
                      className="min-w-0 flex-1 bg-transparent text-[16px] leading-[1.2] text-[#090e15] outline-none"
                    />
                    <div className="h-5 w-px bg-[#d9d9d9]" />
                    <span className="w-[43px] text-[16px] leading-[1.2] tabular-nums text-[#090e15]">
                      {opacity}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex w-full shrink-0 items-center gap-4">
              <button
                type="button"
                onClick={onBack}
                disabled={!onBack}
                className="flex flex-1 items-center justify-center rounded-[36px] border border-[#e0e0e0] bg-[#f8f9fb] px-2.5 py-3 text-center text-[12px] leading-[1.2] text-[#646464] transition hover:brightness-95 disabled:opacity-40"
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
      </motion.div>
    </div>
  );
}

function WorkspacePreviewWindow({
  headingFont,
  bodyFont,
  previewText,
  fill,
}: {
  headingFont: string;
  bodyFont: string;
  previewText: string;
  fill: string;
}) {
  return (
    <div className="absolute left-0 top-[101.5px] flex h-[536px] w-[617px] flex-col">
      <div className="flex w-full items-center justify-between rounded-t-lg border border-[#dbe5ef] bg-white p-3">
        <img src={workspaceMark} alt="" className="size-6 shrink-0 object-contain" />
        <p className="min-w-0 flex-1 text-center text-[12px] leading-[1.2] text-[#111]">
          Workspace Name
        </p>
        <div
          className="flex size-6 shrink-0 items-center justify-center rounded-full text-[12px] leading-[1.2] text-white"
          style={{ background: ACCENT }}
        >
          A
        </div>
      </div>
      <div className="flex min-h-0 w-full flex-1 flex-col items-start rounded-b-xl bg-[#f9fafb] p-[60px]">
        <div className="flex w-full flex-col items-center justify-center gap-2.5 rounded-xl bg-gradient-to-b from-[#fcdf3c] to-[#ffb326] px-6 pb-6 pt-9">
          <FigmaMark className="size-9 text-[#fb5a60]" />
          <div className="flex h-[257px] w-full max-w-[453px] flex-col items-center justify-between">
            <div className="flex w-full flex-col items-start gap-6 text-center" style={{ color: fill || "#fb5a60" }}>
              <p
                className="w-full text-[24px] font-medium leading-[1.2]"
                style={{ fontFamily: `${headingFont}, ui-sans-serif, system-ui, sans-serif` }}
              >
                {previewText.trim() || "Figma"}
              </p>
              <p
                className="w-full text-[16px] font-normal leading-[1.2]"
                style={{ fontFamily: `${bodyFont}, ui-sans-serif, system-ui, sans-serif` }}
              >
                Body text activated—XP awarded for great typography.
              </p>
            </div>
            <div
              className="flex items-start justify-center rounded-[46px] border px-4 py-1.5"
              style={{ borderColor: ACCENT }}
            >
              <span className="text-[16px] leading-[1.2]" style={{ color: ACCENT }}>
                Press play
              </span>
            </div>
          </div>
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
