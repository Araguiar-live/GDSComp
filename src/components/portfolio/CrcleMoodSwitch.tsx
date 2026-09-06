import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import crcleLogo from "@/assets/crcle/crcle-logo.svg";
import locusCloseIcon from "@/assets/crcle/locus/close-x.svg";
import lockFilledIcon from "@/assets/crcle/profile/lock-filled.svg";
import profileLaptopIcon from "@/assets/crcle/profile/laptop.svg";
import profileMaskIcon from "@/assets/crcle/profile/mask.svg";
import masksTheaterIcon from "@/assets/crcle/profile/masks-theater.svg";
import profileMoonCloudIcon from "@/assets/crcle/profile/moon-cloud.svg";
import profilePinIcon from "@/assets/crcle/profile/pin.svg";
import profilePlaneIcon from "@/assets/crcle/profile/plane.svg";
import serenaPortrait from "@/assets/crcle/serena-portrait.png";
import shareIcon from "@/assets/crcle/share.svg";
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
  onConnectNearby,
}: {
  onClose: () => void;
  onConnectNearby?: () => void;
}) {
  const [activeState, setActiveState] = useCrcleBroadcast();
  const [isIncognito, setIncognito] = useCrcleIncognito();
  const [hoveredMood, setHoveredMood] = useState<BroadcastState | null>(null);
  const [areaDismissed, setAreaDismissed] = useState(false);
  const activeMood = MOODS.find((m) => m.id === activeState) ?? MOODS[0];
  const showAreaCard = activeState === "in_the_area" && !areaDismissed;

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
            {showAreaCard ? (
              <motion.div
                key="in-the-area-card"
                initial={{ opacity: 0, y: 16, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                transition={{ type: "spring", stiffness: 380, damping: 28 }}
                className="mt-2 w-full max-w-[268px] self-start"
              >
                <InTheAreaCard
                  onConnect={() => onConnectNearby?.()}
                  onMarkRead={() => setAreaDismissed(true)}
                />
              </motion.div>
            ) : (
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
            )}
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
                    if (m.id === "in_the_area") setAreaDismissed(false);
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

function InTheAreaCard({
  onConnect,
  onMarkRead,
}: {
  onConnect: () => void;
  onMarkRead: () => void;
}) {
  return (
    <div
      className="flex w-full flex-col gap-3 rounded-[20px] bg-[rgba(2,3,29,0.55)] p-3 shadow-[0_12px_40px_rgba(0,0,0,0.28)] backdrop-blur-[10px]"
      style={{ fontFamily: FONT }}
    >
      <div className="flex items-start gap-2">
        <span className="mt-1 flex size-2.5 shrink-0 items-center justify-center">
          <span className="size-2 rounded-full bg-[#0fc950] shadow-[0_0_8px_rgba(15,201,80,0.8)]" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[13px] font-medium leading-[1.3] text-[#f7f6f2]">In The Area</p>
              <p className="mt-0.5 text-[15px] font-medium leading-[1.3] text-white">Serena Min</p>
              <p className="mt-0.5 text-[11px] leading-[1.3] text-[#0fc950]">
                Same venue detected - privacy protected.
              </p>
            </div>
            <button
              type="button"
              onClick={onConnect}
              className="shrink-0 rounded-full bg-white/15 px-3 py-1 text-[11px] leading-[1.4] text-[#f7f6f2] backdrop-blur-sm transition hover:bg-white/25"
            >
              Connect
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-[16px] bg-[#10122c]">
        <div className="relative h-[92px] w-full overflow-hidden">
          <img
            alt=""
            src={serenaPortrait}
            className="absolute inset-0 size-full object-cover object-[center_20%]"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#10122c] via-[#10122c]/20 to-transparent" />
        </div>
        <div className="flex flex-col gap-2 px-3 pb-3 pt-1">
          <div className="flex items-center justify-between gap-2">
            <span className="truncate text-[12px] text-[#f7f6f2]">@SerenaMin</span>
            <img alt="" src={shareIcon} className="size-3.5 opacity-70" draggable={false} />
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-[#f7f6f2]">
              24 Yrs
            </span>
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-[#f7f6f2]">
              In The Area
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-[#f7f6f2]">
              Single
              <img alt="" src={lockFilledIcon} className="size-2.5 object-contain opacity-80" />
            </span>
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-[#f7f6f2]">
              Hetero
            </span>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onMarkRead}
        className="w-full rounded-[14px] bg-[rgba(247,246,242,0.08)] py-2.5 text-center text-[12px] text-[#f7f6f2] transition hover:bg-[rgba(247,246,242,0.14)]"
      >
        Mark as read
      </button>
    </div>
  );
}
