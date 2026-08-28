import { motion } from "framer-motion";
import { ChevronDown, Info, Loader } from "lucide-react";
import { useState } from "react";
import odicciLogo from "@/assets/odicci/odicci-logo-wordmark.png";
import workspaceGradientPattern from "@/assets/odicci/workspace-gradient-pattern.svg";
import workspaceGradient2 from "@/assets/odicci/workspace-gradient-2.svg";
import workspaceDiamondMeshSvg from "@/assets/odicci/workspace-diamond-mesh.svg?raw";
import workspaceMark from "@/assets/odicci/workspace-mark.png";
import { OdicciBrandNavActions } from "@/components/portfolio/OdicciBrandNavActions";

/**
 * OdicciBrandVibe — Figma 727:200380.
 * Second stage of Brand Personality: tone / aesthetic after business profile.
 */

const ACCENT = "#FF5126";
/** Match Create Workspace wordmark scale; PNG is padded (~189/600 left) */
const LOGO_W = Math.round(178 * 1.4); // 249
const LOGO_H = Math.round(86 * 1.4); // 120
const CONTENT_LEFT = 76;
const LOGO_LEFT = Math.round(CONTENT_LEFT - LOGO_W * (189 / 600));

const TONES = ["Energetic", "Calm", "Playful", "Professional"] as const;
const AESTHETICS = ["Art Deco", "Minimal", "Bold", "Organic"] as const;

export function OdicciBrandVibe({
  isDark = true,
  onContinue,
  onBack,
}: {
  isDark?: boolean;
  onContinue: () => void;
  onBack?: () => void;
}) {
  const [tone, setTone] = useState<(typeof TONES)[number]>("Energetic");
  const [aesthetic, setAesthetic] = useState<(typeof AESTHETICS)[number]>("Art Deco");
  const [other, setOther] = useState("");
  const textMain = isDark ? "text-white" : "text-zinc-900";

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
          <WorkspacePreviewWindow />

          <div
            aria-hidden
            className="absolute top-[19px] h-[701px] w-px -translate-x-1/2 bg-gradient-to-b from-white/10 via-white/50 to-white/10"
            style={{ left: 680 }}
          />

          <div
            className={`absolute left-[743px] top-0 flex h-[739px] w-[617px] flex-col items-center rounded-[24px] border p-6 backdrop-blur-[2px] ${
              isDark ? "border-white bg-[rgba(0,50,90,0.2)]" : "border-white/70 bg-white/60"
            }`}
          >
            <div className="flex min-h-0 w-full flex-1 flex-col items-center gap-12">
              <div className="flex w-full flex-col items-center">
                <p className={`w-full text-[28px] font-normal leading-[1.2] ${textMain}`}>
                  What&apos;s your brand&apos;s vibe?
                </p>
                <p className="w-full text-[20px] font-normal leading-[1.2] text-[#bbc2cb]">
                  So copy and visuals feel right
                </p>
              </div>

              <div className="flex w-full flex-col items-center gap-6">
                <div
                  className="flex items-center justify-center rounded-lg p-1.5"
                  style={{ background: ACCENT }}
                >
                  <Loader className="size-5 text-white" strokeWidth={2} />
                </div>
                <div className="flex items-center justify-center gap-2.5">
                  <span className="size-2 rounded-full bg-white/85" />
                  <span className="h-2 w-6 rounded-[64px]" style={{ background: ACCENT }} />
                  <span className="size-2 rounded-full bg-white/85" />
                  <span className="size-2 rounded-full bg-white/20" />
                  <span className="size-2 rounded-full bg-white/20" />
                </div>
              </div>

              <div className="flex min-h-0 w-full flex-1 flex-col justify-between">
                <div className="flex w-full flex-col gap-4">
                  <div className="flex w-full gap-4">
                    <div className="flex w-[276.5px] min-w-0 flex-1 flex-col gap-1">
                      <p className={`text-[12px] leading-[1.2] ${textMain}`}>Tone</p>
                      <button
                        type="button"
                        onClick={() =>
                          setTone((v) => TONES[(TONES.indexOf(v) + 1) % TONES.length])
                        }
                        className="flex h-[43px] w-full items-center justify-between rounded-lg border border-[#e0e0e0] bg-white p-3 text-left"
                      >
                        <span className="min-w-0 flex-1 truncate text-[16px] leading-[1.2] text-[#0a0a0a]">
                          {tone}
                        </span>
                        <ChevronDown className="size-4 shrink-0 text-[#0a0a0a]/60" />
                      </button>
                    </div>
                    <div className="flex w-[276.5px] min-w-0 flex-1 flex-col gap-1">
                      <p className={`text-[12px] leading-[1.2] ${textMain}`}>Aesthetic</p>
                      <button
                        type="button"
                        onClick={() =>
                          setAesthetic(
                            (v) => AESTHETICS[(AESTHETICS.indexOf(v) + 1) % AESTHETICS.length],
                          )
                        }
                        className="flex h-[43px] w-full items-center justify-between rounded-lg border border-[#e0e0e0] bg-white p-3 text-left"
                      >
                        <span className="min-w-0 flex-1 truncate text-[16px] leading-[1.2] text-[#0a0a0a]">
                          {aesthetic}
                        </span>
                        <ChevronDown className="size-4 shrink-0 text-[#0a0a0a]/60" />
                      </button>
                    </div>
                  </div>

                  <input
                    value={other}
                    onChange={(e) => setOther(e.target.value)}
                    placeholder="If other type it in here..."
                    className="w-full rounded-lg bg-white/20 p-3 text-[16px] leading-[1.2] text-[#bbc2cb] outline-none placeholder:text-[#bbc2cb]"
                  />

                  <div className="flex w-full items-start gap-2 rounded-lg">
                    <Info className="mt-px size-[18px] shrink-0 text-[#d0d8e2]" />
                    <p className="min-w-0 flex-1 text-[10px] leading-[1.2] text-[#d0d8e2]">
                      Choose the tone and aesthetic that best represents your company so we can
                      recommend game templates that feel naturally aligned with your brand
                      experience.
                    </p>
                  </div>
                </div>

                <OdicciBrandNavActions onBack={onBack} onContinue={onContinue} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function WorkspacePreviewWindow() {
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
        <div className="flex w-full items-center justify-center rounded-xl bg-white px-6 pb-6 pt-9">
          <FigmaMark className="size-9 text-zinc-400" />
        </div>
      </div>
    </div>
  );
}

function FigmaMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 38 57" fill="none" className={className} aria-hidden>
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
