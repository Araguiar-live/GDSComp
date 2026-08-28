import { motion } from "framer-motion";
import { ChevronDown, Home, Info } from "lucide-react";
import { useState } from "react";
import odicciLogo from "@/assets/odicci/odicci-logo-wordmark.png";
import workspaceGradientPattern from "@/assets/odicci/workspace-gradient-pattern.svg";
import workspaceGradient2 from "@/assets/odicci/workspace-gradient-2.svg";
import workspaceDiamondMeshSvg from "@/assets/odicci/workspace-diamond-mesh.svg?raw";
import { OdicciBrandNavActions } from "@/components/portfolio/OdicciBrandNavActions";

/**
 * OdicciBusinessProfile — Figma 713:199885.
 * First stage of Brand Personality: industry / niche feed the Template library.
 */

const ACCENT = "#FF5126";
/** Match Create Workspace wordmark scale; PNG is padded (~189/600 left) */
const LOGO_W = Math.round(178 * 1.4); // 249
const LOGO_H = Math.round(86 * 1.4); // 120
const CONTENT_LEFT = 76;
const LOGO_LEFT = Math.round(CONTENT_LEFT - LOGO_W * (189 / 600));

export function OdicciBusinessProfile({
  isDark = true,
  onContinue,
  onBack,
}: {
  isDark?: boolean;
  onContinue: () => void;
  onBack?: () => void;
}) {
  const [industry, setIndustry] = useState("Fashion");
  const [niche, setNiche] = useState("Babywear");
  const [other, setOther] = useState("");
  const textMain = isDark ? "text-white" : "text-zinc-900";

  return (
    <div className="relative size-full overflow-hidden">
      {/* Atmosphere — same stack as workspace (65:94020) */}
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
        <div className="absolute left-[743px] top-[118px] z-10 flex w-[617px] items-center justify-center rounded-[36px]">
          <div className="flex items-center justify-center rounded-[36px] bg-white/25 px-4 py-1">
            <p className="whitespace-nowrap text-center text-[10px] leading-[1.2] text-white">
              Workspace created. You&apos;re the owner
            </p>
          </div>
        </div>

        <div className="absolute left-0 top-[156px] h-[739px] w-[1360px]">
          <WorkspacePreviewWindow title="Odicci workspaces" />

          <div
            aria-hidden
            className="absolute top-[19px] h-[701px] w-px -translate-x-1/2 bg-gradient-to-b from-white/10 via-white/50 to-white/10"
            style={{ left: 680 }}
          />

          <div
            className={`absolute left-[743px] top-0 flex h-[739px] w-[617px] flex-col items-center rounded-[24px] border p-6 backdrop-blur-[2px] ${
              isDark ? "border-white bg-[rgba(0,50,90,0.1)]" : "border-white/70 bg-white/60"
            }`}
          >
            <div className="flex min-h-0 w-full flex-1 flex-col items-center gap-[46px]">
              <div className="flex min-h-0 w-full flex-1 flex-col items-start gap-[46px]">
                <div className="flex w-full flex-col items-center">
                  <p className={`w-full text-[28px] font-normal leading-[1.2] ${textMain}`}>
                    Tell us about your business...
                  </p>
                  <p className="w-full text-[20px] font-normal leading-[1.2] text-[#a3aebb]">
                    So ideas match your market
                  </p>
                </div>

                <div className="flex w-full flex-col items-center gap-6">
                  <div className="flex w-full flex-col items-center justify-center gap-3">
                    <p className="text-center text-[16px] leading-[1.2] text-[#d0d8e2]">
                      Welcome to your workspace
                    </p>
                    <div
                      className="flex items-center justify-center rounded-lg p-1.5"
                      style={{ background: ACCENT }}
                    >
                      <Home className="size-5 text-white" strokeWidth={2} />
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-2.5">
                    <span className="h-2 w-6 rounded-[64px]" style={{ background: ACCENT }} />
                    <span className="size-2 rounded-full bg-white/35" />
                    <span className="size-2 rounded-full bg-white/35" />
                    <span className="size-2 rounded-full bg-white/20" />
                    <span className="size-2 rounded-full bg-white/20" />
                  </div>
                </div>

                <div className="flex min-h-0 w-full flex-1 flex-col items-center rounded-xl">
                  <div className="flex w-full flex-col gap-4">
                    <div className="flex w-full gap-[18px]">
                      <div className="flex min-w-0 flex-1 flex-col gap-1">
                        <p className={`text-[12px] leading-[1.2] ${textMain}`}>Industry</p>
                        <button
                          type="button"
                          onClick={() =>
                            setIndustry((v) => (v === "Fashion" ? "Retail" : "Fashion"))
                          }
                          className="flex h-12 w-full items-center justify-between rounded-lg border border-[#d0d8e2] bg-white px-3 py-3.5 text-left"
                        >
                          <span className="min-w-0 flex-1 truncate text-[16px] leading-[1.2] text-[#0d2847]">
                            {industry}
                          </span>
                          <ChevronDown className="size-4 shrink-0 text-[#0d2847]/60" />
                        </button>
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col gap-1">
                        <p className={`text-[12px] leading-[1.2] ${textMain}`}>Niche</p>
                        <button
                          type="button"
                          onClick={() =>
                            setNiche((v) => (v === "Babywear" ? "Accessories" : "Babywear"))
                          }
                          className="flex h-12 w-full items-center justify-between rounded-lg border border-[#d0d8e2] bg-white px-3 py-3.5 text-left"
                        >
                          <span className="min-w-0 flex-1 truncate text-[16px] leading-[1.2] text-[#0d2847]">
                            {niche}
                          </span>
                          <ChevronDown className="size-4 shrink-0 text-[#0d2847]/60" />
                        </button>
                      </div>
                    </div>

                    <input
                      value={other}
                      onChange={(e) => setOther(e.target.value)}
                      placeholder="If other type it in here..."
                      className="w-full rounded-lg bg-white/20 p-3 text-[16px] leading-[1.2] text-[#bbc2cb] outline-none placeholder:text-[#bbc2cb]"
                    />

                    <div className="flex w-full items-start justify-center gap-2 rounded-lg">
                      <Info className="mt-0.5 size-4 shrink-0 text-[#d0d8e2]" />
                      <p className="min-w-0 flex-1 text-[10px] leading-[1.2] text-[#d0d8e2]">
                        This helps us surface game templates that are proven to work best for
                        businesses like yours and your specific audience.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <OdicciBrandNavActions onBack={onBack} onContinue={onContinue} />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

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
