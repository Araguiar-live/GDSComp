import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import crcleLogo from "@/assets/crcle/crcle-logo.svg";
import locusCloseIcon from "@/assets/crcle/locus/close-x.svg";
import profileLaptopIcon from "@/assets/crcle/profile/laptop.svg";
import profileMaskIcon from "@/assets/crcle/profile/mask.svg";
import masksTheaterIcon from "@/assets/crcle/profile/masks-theater.svg";
import profileMoonCloudIcon from "@/assets/crcle/profile/moon-cloud.svg";
import profilePinIcon from "@/assets/crcle/profile/pin.svg";
import profilePlaneIcon from "@/assets/crcle/profile/plane.svg";
import {
  type BroadcastState,
  useCrcleBroadcast,
  useCrcleIncognito,
} from "@/components/portfolio/crcleBroadcast";

const FONT = "Montserrat, ui-sans-serif, system-ui, sans-serif";
const EASE = [0.22, 1, 0.36, 1] as const;

const MOODS: {
  id: BroadcastState;
  label: string;
  icon: string;
  description: string;
}[] = [
  {
    id: "open_day",
    label: "Open Day",
    icon: profilePlaneIcon,
    description:
      "Open to spontaneous hangouts, flexible plans, and real-time invites throughout the day.",
  },
  {
    id: "night_owl",
    label: "Night Owl",
    icon: profileMoonCloudIcon,
    description:
      "Active during late hours; down for evening events, night calls, or late-night sessions.",
  },
  {
    id: "collab",
    label: "Collab",
    icon: profileLaptopIcon,
    description:
      "Focused on co-working, side projects, brain-dumping ideas, or working together in real time.",
  },
  {
    id: "in_the_area",
    label: "In The Area",
    icon: profilePinIcon,
    description:
      "Nearby and available to meet up locally for a quick coffee, chat, or walk right now.",
  },
];

function IconImg({ src, className = "size-6" }: { src: string; className?: string }) {
  return (
    <div className={`relative shrink-0 overflow-hidden ${className}`}>
      <img alt="" src={src} className="absolute inset-0 size-full max-w-none object-contain" />
    </div>
  );
}

/** Mood Switch overlay — lives on the Messaging Hub (Figma 1142:34693 / 853:225874). */
export function CrcleMoodSwitch({
  onClose,
}: {
  onClose: () => void;
}) {
  const [activeState, setActiveState] = useCrcleBroadcast();
  const [isIncognito, setIncognito] = useCrcleIncognito();
  const [hoveredMood, setHoveredMood] = useState<BroadcastState | null>(null);
  const activeMood = MOODS.find((m) => m.id === activeState) ?? MOODS[0];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28, ease: EASE }}
      className="pointer-events-auto absolute inset-0 z-40 flex flex-col overflow-hidden rounded-[53px] bg-[rgba(2,3,29,0.6)] backdrop-blur-[8px]"
      role="dialog"
      aria-label="Mood Switch"
      style={{ clipPath: "inset(0 round 53px)" }}
      onClick={onClose}
    >
      <div
        className="relative flex min-h-0 flex-1 flex-col px-[26px] pb-8 pt-[38px]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-5 top-5 z-10 flex size-8 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition hover:bg-white/15"
        >
          <img alt="" src={locusCloseIcon} className="size-[14px] object-contain opacity-70" draggable={false} />
        </button>

        <div className="mt-6 flex flex-col items-center gap-[42px]">
          <div className="mt-4 flex flex-col items-center gap-2">
            <IconImg src={masksTheaterIcon} className="size-5" />
            <p
              className="text-center text-[19px] font-normal leading-[1.4] text-[#f7f6f2]"
              style={{ fontFamily: FONT }}
            >
              Mood Switch
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIncognito(!isIncognito)}
            className="flex items-center gap-2 rounded-[24px] bg-[rgba(255,255,255,0.2)] px-3 py-1.5 backdrop-blur-[6px] transition hover:bg-[rgba(255,255,255,0.26)]"
          >
            <IconImg src={profileMaskIcon} className="size-6" />
            <span className="text-[11px] leading-[1.4] text-[#f7f6f2]" style={{ fontFamily: FONT }}>
              Incognito Mode
            </span>
            <span
              className={`relative flex h-4 w-8 items-center rounded-full p-0.5 transition ${
                isIncognito ? "bg-[#0fc950]" : "bg-white/25"
              }`}
            >
              <motion.span
                layout
                transition={{ type: "spring", stiffness: 520, damping: 32 }}
                className={`size-3 rounded-full bg-[#fefefe] ${isIncognito ? "ml-auto" : ""}`}
              />
            </span>
          </button>
        </div>

        <div
          className={`relative mt-6 flex min-h-0 flex-1 flex-col items-center px-1 transition ${
            isIncognito ? "pointer-events-none opacity-35" : "opacity-100"
          }`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMood.id}
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
              className="mt-16 flex w-full max-w-[280px] flex-col items-center gap-4 text-center"
            >
              <IconImg src={activeMood.icon} className="size-6" />
              <p
                className="text-[16px] font-normal leading-[1.4] text-[rgba(247,246,242,0.6)]"
                style={{ fontFamily: FONT }}
              >
                {activeMood.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div
          className={`pointer-events-none absolute right-3 top-[282px] z-[2] flex items-center gap-[11px] transition ${
            isIncognito ? "opacity-30" : "opacity-100"
          }`}
        >
          <div
            className="flex h-[170px] flex-col justify-between text-right text-[13px] font-medium leading-[1.4] text-white"
            style={{ fontFamily: FONT }}
          >
            {MOODS.map((m) => {
              const show = activeState === m.id || hoveredMood === m.id;
              return (
                <span
                  key={m.id}
                  className={`transition-opacity duration-200 ${show ? "opacity-100" : "opacity-0"}`}
                  aria-hidden={!show}
                >
                  {m.label}
                </span>
              );
            })}
          </div>

          <div className="pointer-events-auto flex flex-col gap-[11px] rounded-[36px] bg-[rgba(255,255,255,0.1)] p-2 backdrop-blur-[12px]">
            {MOODS.map((m) => {
              const active = activeState === m.id;
              const rimId = `mood-dock-rim-${m.id}`;
              return (
                <motion.button
                  key={m.id}
                  type="button"
                  aria-label={m.label}
                  aria-pressed={active}
                  disabled={isIncognito}
                  onClick={() => {
                    if (isIncognito) return;
                    setActiveState(m.id);
                  }}
                  onMouseEnter={() => setHoveredMood(m.id)}
                  onMouseLeave={() => setHoveredMood(null)}
                  whileTap={{ scale: 0.88 }}
                  transition={{ type: "spring", stiffness: 500, damping: 28 }}
                  className={`crcle-intent-chip relative flex size-11 items-center justify-center rounded-[24px] p-1 opacity-40 disabled:cursor-not-allowed ${
                    active ? "is-lit" : ""
                  }`}
                >
                  <svg
                    aria-hidden
                    viewBox="0 0 44 44"
                    className="pointer-events-none absolute inset-0 z-0 size-full"
                  >
                    <defs>
                      <linearGradient
                        id={rimId}
                        x1="5"
                        y1="2"
                        x2="39"
                        y2="42"
                        gradientUnits="userSpaceOnUse"
                      >
                        {active ? (
                          <>
                            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                            <stop offset="70%" stopColor="#ffffff" stopOpacity="0.12" />
                            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.06" />
                          </>
                        ) : (
                          <>
                            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                            <stop offset="28%" stopColor="#ffffff" stopOpacity="0.4" />
                            <stop offset="55%" stopColor="#ffffff" stopOpacity="0.1" />
                            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.18" />
                          </>
                        )}
                      </linearGradient>
                    </defs>
                    <circle
                      cx="22"
                      cy="22"
                      r="20.75"
                      fill="none"
                      stroke={`url(#${rimId})`}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>

                  {active ? (
                    <motion.span
                      layoutId="mood-dock-active"
                      className="absolute inset-[3px] z-[1] rounded-[20px] bg-[#f7f6f2]"
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    />
                  ) : null}
                  <span
                    className={`crcle-intent-chip__icon relative z-[2] ${
                      active ? "opacity-100" : "opacity-90"
                    }`}
                  >
                    <img
                      alt=""
                      src={m.icon}
                      className={`size-6 max-w-none object-contain ${active ? "brightness-0" : ""}`}
                      draggable={false}
                    />
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        <div className="mt-auto flex flex-col items-center gap-[5px] pt-6">
          <IconImg src={crcleLogo} className="h-[17px] w-[49px]" />
          <p
            className="text-center text-[12px] leading-[1.1] tracking-[-0.2px] text-[rgba(247,246,242,0.4)]"
            style={{ fontFamily: FONT }}
          >
            Verified Social
          </p>
        </div>
      </div>
    </motion.div>
  );
}
