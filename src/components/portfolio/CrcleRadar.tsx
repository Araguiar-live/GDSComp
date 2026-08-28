import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { Sun } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import arrowChevronIcon from "@/assets/crcle/arrow-chevron.svg";
import arrowForwardIcon from "@/assets/crcle/arrow-forward.svg";
import arrowLeftIcon from "@/assets/crcle/arrow-left.svg";
import arrowRightIcon from "@/assets/crcle/arrow-right.svg";
import batteryIcon from "@/assets/crcle/battery.svg";
import cellularIcon from "@/assets/crcle/cellular.svg";
import crcleLogo from "@/assets/crcle/crcle-logo.svg";
import dragHandleModal from "@/assets/crcle/drag-handle-modal.svg";
import fireInnerIcon from "@/assets/crcle/fire-inner.svg";
import linkIcon from "@/assets/crcle/link.svg";
import linkInnerIcon from "@/assets/crcle/link-inner.svg";
import locusCloseIcon from "@/assets/crcle/locus/close-x.svg";
import locusPlusIcon from "@/assets/crcle/locus/plus.svg";
import mapPinIcon from "@/assets/crcle/map-pin.svg";
import radarCloseIcon from "@/assets/crcle/onboarding/radar-close.svg";
import radarDividerIcon from "@/assets/crcle/onboarding/radar-divider.svg";
import radarFireIcon from "@/assets/crcle/onboarding/radar-fire.svg";
import radarHeartIcon from "@/assets/crcle/onboarding/radar-heart.svg";
import radarLaptopIcon from "@/assets/crcle/onboarding/radar-laptop.svg";
import radarOutlineIcon from "@/assets/crcle/onboarding/radar-outline.svg";
import radarYinIcon from "@/assets/crcle/onboarding/radar-yin.svg";
import chipFireHoverIcon from "@/assets/crcle/radar/chip-fire-hover.svg";
import chipFireIcon from "@/assets/crcle/radar/chip-fire.svg";
import chipHeartHoverIcon from "@/assets/crcle/radar/chip-heart-hover.svg";
import chipHeartIcon from "@/assets/crcle/radar/chip-heart.svg";
import chipLaptopHoverIcon from "@/assets/crcle/radar/chip-laptop-hover.svg";
import chipLaptopIcon from "@/assets/crcle/radar/chip-laptop.svg";
import chipYinYangHoverIcon from "@/assets/crcle/radar/chip-yin-yang-hover.svg";
import chipYinYangIcon from "@/assets/crcle/radar/chip-yin-yang.svg";
import intentDotsIcon from "@/assets/crcle/radar/intent-dots.svg";
import intentFireIcon from "@/assets/crcle/radar/intent-fire.svg";
import intentHeartIcon from "@/assets/crcle/radar/intent-heart.svg";
import intentLaptopIcon from "@/assets/crcle/radar/intent-laptop.svg";
import intentYinYangIcon from "@/assets/crcle/radar/intent-yin-yang.svg";
import nocDotIcon from "@/assets/crcle/radar/noc-dot.svg";
import nocMoonIcon from "@/assets/crcle/radar/noc-moon.svg";
import nocTimerIcon from "@/assets/crcle/radar/noc-timer.svg";
import serenaPortrait from "@/assets/crcle/serena-portrait.png";
import shareIcon from "@/assets/crcle/share.svg";
import shareInnerIcon from "@/assets/crcle/share-inner.svg";
import brainIcon from "@/assets/crcle/signal/brain.svg";
import laptopStrokeIcon from "@/assets/crcle/signal/laptop-stroke.svg";
import lightbulbIcon from "@/assets/crcle/signal/lightbulb.svg";
import unlockIcon from "@/assets/crcle/unlock.svg";
import wifiIcon from "@/assets/crcle/wifi.svg";
import { CrclePhoneFrame } from "@/components/portfolio/CrclePhoneFrame";
import { CrclePrimaryDock } from "@/components/portfolio/CrcleChrome";
import { useCrcleBroadcast } from "@/components/portfolio/crcleBroadcast";

/**
 * CRCLE Radar — Figma 839:224363 + SwipeFeature 839:224515.
 * NOC / Night Owl: Figma 957:31045 (active when Profile mood = Night Owl).
 * Onboarding overlay: Figma 322:118007.
 * Category swipe matches Signal Intercept (arrows + horizontal drag).
 */

/** Figma SwipeFeature: Default → Purpose → Love → Soul */
export type RadarCategory = "signal" | "purpose" | "love" | "soul";
export type RadarIntent = "romantic" | "professional" | "social" | "balanced";

const FONT = "Montserrat, ui-sans-serif, system-ui, sans-serif";
const SPRING = { type: "spring", stiffness: 380, damping: 22, mass: 0.8 } as const;
/** Match portfolio Dock — soft bounce magnification */
const DOCK_SPRING = { type: "spring", stiffness: 90, damping: 10, mass: 0.65 } as const;
const EASE = [0.22, 1, 0.36, 1] as const;
const DRAG_THRESHOLD = 48;
const CHIP_BASE = 36;
const CHIP_GAP = 8;
/** Figma success accent */
const SUCCESS = "#0eb247";
const PUSH_LOAD_MS = 1400;
const PUSH_SUCCESS_HOLD_MS = 1100;

type PushPhase = "idle" | "loading" | "success" | "modal";

type IntentChipDef = {
  intent: RadarIntent;
  src: string;
  hoverSrc: string;
  /** Figma gradient stroke start color */
  accent: string;
};

const INTENT_CHIPS: IntentChipDef[] = [
  {
    intent: "romantic",
    src: chipHeartIcon,
    hoverSrc: chipHeartHoverIcon,
    accent: "rgba(255,176,176,0.6)",
  },
  {
    intent: "balanced",
    src: chipYinYangIcon,
    hoverSrc: chipYinYangHoverIcon,
    accent: "rgba(222,221,218,0.9)",
  },
  {
    intent: "professional",
    src: chipLaptopIcon,
    hoverSrc: chipLaptopHoverIcon,
    accent: "rgba(26,181,172,0.4)",
  },
  {
    intent: "social",
    src: chipFireIcon,
    hoverSrc: chipFireHoverIcon,
    accent: "#b0caff",
  },
];

function chipGridDistance(a: number, b: number) {
  const ax = a % 2;
  const ay = Math.floor(a / 2);
  const bx = b % 2;
  const by = Math.floor(b / 2);
  return Math.abs(ax - bx) + Math.abs(ay - by);
}

export type RecommendedUser = {
  id: string;
  name: string;
  handle: string;
  avatarUrl: string;
  distance: string;
  age: number;
  relationshipStatus: string;
  orientation: string;
  role: string;
  roleTag: string;
};

type RadarState = {
  recommendedUsers: RecommendedUser[];
  activeCardIndex: number;
  activeCategory: RadarCategory;
  isIntentOverlayOpen: boolean;
  selectedIntent: RadarIntent | null;
  pushPhase: PushPhase;
};

const CATEGORY_ORDER: RadarCategory[] = ["signal", "purpose", "love", "soul"];

const USERS: RecommendedUser[] = [
  {
    id: "serena",
    name: "Serena Min",
    handle: "@SerenaMin",
    avatarUrl: serenaPortrait,
    distance: "2.4km",
    age: 24,
    relationshipStatus: "Single",
    orientation: "Hetero",
    role: "Product Designer@Circle",
    roleTag: "OTP",
  },
];

const CATEGORY_ICON: Record<RadarCategory, string | "waves"> = {
  signal: "waves",
  purpose: fireInnerIcon,
  love: intentHeartIcon,
  soul: laptopStrokeIcon,
};

export function CrcleRadar({
  onGoToMessages,
  onGoToSignalHome,
  onGoToProfile,
}: {
  onGoToMessages?: () => void;
  onGoToSignalHome?: () => void;
  onGoToProfile?: () => void;
} = {}) {
  const [broadcastMood] = useCrcleBroadcast();
  const isNoc = broadcastMood === "night_owl";
  const [isLightMode, setIsLightMode] = useState(false);
  /* Figma 322:118007 — Radar onboarding over live Radar */
  const [onboardingOpen, setOnboardingOpen] = useState(true);
  const [state, setState] = useState<RadarState>({
    recommendedUsers: USERS,
    activeCardIndex: 0,
    activeCategory: "signal",
    isIntentOverlayOpen: false,
    selectedIntent: null,
    pushPhase: "idle",
  });
  const [direction, setDirection] = useState(0);
  const pushTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const dismissOnboarding = useCallback(() => {
    setOnboardingOpen(false);
  }, []);

  const user = state.recommendedUsers[state.activeCardIndex] ?? state.recommendedUsers[0];
  const categoryIndex = CATEGORY_ORDER.indexOf(state.activeCategory);
  const isPushBusy = state.pushPhase !== "idle";
  const showSignalModal = state.pushPhase === "modal";
  /* NOC frame is always dark (Figma 957:31045) */
  const light = isLightMode && !isNoc;

  const clearPushTimers = useCallback(() => {
    pushTimers.current.forEach(clearTimeout);
    pushTimers.current = [];
  }, []);

  useEffect(() => () => clearPushTimers(), [clearPushTimers]);

  const goTo = useCallback(
    (nextIndex: number, dir: number) => {
      clearPushTimers();
      const clamped = (nextIndex + CATEGORY_ORDER.length) % CATEGORY_ORDER.length;
      setDirection(dir);
      setState((s) => ({
        ...s,
        activeCategory: CATEGORY_ORDER[clamped],
        isIntentOverlayOpen: false,
        selectedIntent: null,
        pushPhase: "idle",
      }));
    },
    [clearPushTimers],
  );

  const goPrev = useCallback(() => goTo(categoryIndex - 1, -1), [goTo, categoryIndex]);
  const goNext = useCallback(() => goTo(categoryIndex + 1, 1), [goTo, categoryIndex]);

  const onSwipeDragEnd = (_: unknown, info: PanInfo) => {
    if (state.isIntentOverlayOpen || isPushBusy) return;
    if (info.offset.x < -DRAG_THRESHOLD || info.velocity.x < -200) goNext();
    else if (info.offset.x > DRAG_THRESHOLD || info.velocity.x > 200) goPrev();
  };

  const openIntent = () => {
    if (isPushBusy) return;
    setState((s) => ({
      ...s,
      isIntentOverlayOpen: true,
      selectedIntent: null,
      pushPhase: "idle",
    }));
  };

  const selectIntent = (intent: RadarIntent) =>
    setState((s) => ({ ...s, selectedIntent: intent }));

  const undoPush = useCallback(() => {
    clearPushTimers();
    setState((s) => ({
      ...s,
      pushPhase: "idle",
      selectedIntent: null,
      isIntentOverlayOpen: false,
    }));
  }, [clearPushTimers]);

  const confirmIntent = () => {
    if (!state.selectedIntent) return;
    clearPushTimers();
    setState((s) => ({ ...s, isIntentOverlayOpen: false, pushPhase: "loading" }));
    const toSuccess = setTimeout(() => {
      setState((s) => (s.pushPhase === "loading" ? { ...s, pushPhase: "success" } : s));
      const toModal = setTimeout(() => {
        setState((s) => (s.pushPhase === "success" ? { ...s, pushPhase: "modal" } : s));
      }, PUSH_SUCCESS_HOLD_MS);
      pushTimers.current.push(toModal);
    }, PUSH_LOAD_MS);
    pushTimers.current.push(toSuccess);
  };

  const closeSuccess = () => {
    clearPushTimers();
    setState((s) => ({ ...s, pushPhase: "idle", selectedIntent: null }));
  };

  const goToMessages = () => {
    closeSuccess();
    onGoToMessages?.();
  };

  return (
    <div className="relative ml-auto w-fit">
      <motion.button
        type="button"
        aria-label={light ? "Switch to dark mode" : "Switch to light mode"}
        aria-pressed={light}
        onClick={() => {
          if (isNoc) return;
          setIsLightMode((v) => !v);
        }}
        className={`absolute left-1/2 -top-10 z-30 flex size-8 -translate-x-1/2 items-center justify-center border-0 bg-transparent p-0 shadow-none outline-none ring-0 ${
          isNoc ? "pointer-events-none opacity-40" : ""
        }`}
        whileHover={isNoc ? undefined : { scale: 1.1 }}
        whileTap={isNoc ? undefined : { scale: 0.92 }}
      >
        <Sun
          strokeWidth={1.5}
          className={`size-6 transition-colors duration-300 ${
            light ? "fill-amber-400 text-amber-400" : "fill-none text-zinc-800"
          }`}
        />
      </motion.button>

      <CrclePhoneFrame light={light}>
        {/* Dark Figma 257:87258 / Light cream — toggled via crcle-phone--light.
            NOC Night Owl: Figma 957:31045 teal gradient + embossed dots. */}
        <div
          className={`relative flex h-full min-h-0 w-full flex-col overflow-hidden rounded-[53px] transition-colors duration-300 ${
            isNoc ? "crcle-noc-radar" : "bg-[var(--crcle-bg-deep)]"
          }`}
        >
          {isNoc ? <NocDotField /> : null}
          <StatusBar />
          <div className="relative z-[1] mt-[5px] flex shrink-0 justify-center pb-1">
            <IconImg src={crcleLogo} className="crcle-theme-icon h-[13px] w-[38px]" />
          </div>

          <div className="relative z-[1] flex h-10 shrink-0 items-center px-3">
            <button
              type="button"
              aria-label="Back to Signal Home"
              onClick={onGoToSignalHome}
              className="crcle-intent-chip relative z-[1] flex size-10 shrink-0 items-center justify-center rounded-full p-1"
              style={{ background: "rgba(247, 246, 242, 0.15)" }}
            >
              <svg
                aria-hidden
                viewBox="0 0 40 40"
                className="pointer-events-none absolute inset-0 z-0 size-full"
              >
                <defs>
                  <linearGradient
                    id="radar-back-rim"
                    x1="4"
                    y1="2"
                    x2="36"
                    y2="38"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                    <stop offset="28%" stopColor="#ffffff" stopOpacity="0.4" />
                    <stop offset="55%" stopColor="#ffffff" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0.18" />
                  </linearGradient>
                </defs>
                <circle
                  cx="20"
                  cy="20"
                  r="18.75"
                  fill="none"
                  stroke="url(#radar-back-rim)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <img
                alt=""
                src={arrowLeftIcon}
                className={`crcle-intent-chip__icon relative size-4 object-contain ${
                  light ? "brightness-0" : ""
                }`}
                draggable={false}
              />
            </button>
            <p
              className={`pointer-events-none absolute inset-x-0 text-center text-[11px] font-medium leading-[1.4] transition-colors duration-300 ${
                light ? "text-[rgba(2,3,29,0.3)]" : "text-[rgba(247,246,242,0.8)]"
              }`}
              style={{ fontFamily: FONT }}
            >
              Found a signal? Tap + to intercept
            </p>
          </div>

          <div className="relative z-[1] mx-auto flex min-h-0 w-[382px] flex-1 flex-col items-center pb-[108px]">
            {/* Portrait card — overlaps recommendation sheet; bottoms flush.
                Clip + card must share the same height/radius or bottom corners look cropped wrong.
                24px under the header arrow; bottom edge (and sheet overlap) stays fixed. */}
            <div
              className={`relative mt-6 mb-[-138px] h-[558px] w-full overflow-hidden rounded-[36px] ${
                state.isIntentOverlayOpen || showSignalModal ? "z-30" : "z-0"
              }`}
            >
              <div className="crcle-portrait-card relative flex h-full w-full flex-col overflow-hidden rounded-[36px]">
                <img
                  alt=""
                  src={user.avatarUrl}
                  className="absolute inset-0 size-full rounded-[36px] object-cover"
                  draggable={false}
                />
                <div className="relative z-[1] flex w-full items-center justify-between px-4 pt-4">
                  <div className="flex items-center gap-2.5 rounded-[64px] bg-[rgba(2,3,29,0.3)] p-2.5 backdrop-blur-[6px]">
                    <span
                      className="text-[11px] leading-[1.4] text-white"
                      style={{ fontFamily: FONT }}
                    >
                      {user.handle}
                    </span>
                    <span className="relative size-3 shrink-0 overflow-hidden">
                      <img alt="" src={shareIcon} className="absolute inset-0 size-full" />
                      <span className="absolute inset-[8.33%_12.5%_8.67%_12.5%]">
                        <img alt="" src={shareInnerIcon} className="absolute inset-0 size-full" />
                      </span>
                    </span>
                  </div>
                  <button
                    type="button"
                    aria-label="Next"
                    onClick={goNext}
                    className="flex h-[35px] shrink-0 items-center justify-center rounded-[36px] bg-[#02031d] px-3 py-1 backdrop-blur-[2px]"
                  >
                    <img
                      alt=""
                      src={arrowForwardIcon}
                      className="size-4 object-contain"
                      draggable={false}
                    />
                  </button>
                </div>

                {isNoc ? (
                  <div
                    className="pointer-events-none absolute left-1/2 top-[381px] z-20 flex -translate-x-1/2 items-center justify-center gap-2.5 rounded-[40px] border border-[rgba(247,153,12,0.3)] bg-[rgba(247,153,12,0.1)] px-3 py-1"
                    aria-label="Expires in 2 hours 15 minutes"
                  >
                    <IconImg src={nocMoonIcon} className="size-3" />
                    <p
                      className="whitespace-pre text-[11px] leading-[1.4] text-[#fdd59a]"
                      style={{ fontFamily: FONT }}
                    >
                      Expires in 2<span className="font-medium">H</span> 15{" "}
                      <span className="font-medium">mins</span>
                    </p>
                  </div>
                ) : null}

                {/* Intent push — Figma 841:225007; same bounds as recommendation card */}
                <AnimatePresence>
                  {state.isIntentOverlayOpen ? (
                    <motion.div
                      key="intent-push"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.22, ease: EASE }}
                      className="absolute inset-0 z-30 overflow-hidden rounded-[36px]"
                    >
                      <IntentPushOverlay
                        selectedIntent={state.selectedIntent}
                        onSelect={selectIntent}
                        onConfirm={confirmIntent}
                        onClose={() =>
                          setState((s) => ({
                            ...s,
                            isIntentOverlayOpen: false,
                            selectedIntent: null,
                          }))
                        }
                      />
                    </motion.div>
                  ) : null}
                </AnimatePresence>

                {/* Signal Sent — Figma 849:225257; exact portrait card bounds */}
                <AnimatePresence>
                  {showSignalModal ? (
                    <motion.div
                      key="signal-sent"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.22, ease: EASE }}
                      className="absolute inset-0 z-40 overflow-hidden rounded-[36px]"
                    >
                      <SignalSentSuccessModal
                        userName={user.name}
                        onGoToMessages={goToMessages}
                        onClose={closeSuccess}
                      />
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </div>

            {/* Swipe feature — Figma 839:224515 / NOC glass 957:31087 */}
            <div className="relative z-10 w-full">
              <AnimatePresence>
                {state.pushPhase === "success" ? (
                  <motion.button
                    key="undo-push"
                    type="button"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.2, ease: EASE }}
                    onClick={undoPush}
                    className="absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 rounded-[64px] border border-[rgba(2,3,29,0.2)] bg-white/40 px-1 py-2 backdrop-blur-[8px]"
                    style={{ fontFamily: FONT }}
                  >
                    <span className="block w-[67px] text-center text-[14px] font-medium leading-[1.2] text-[#020426]">
                      Undo
                    </span>
                  </motion.button>
                ) : null}
              </AnimatePresence>

              <div
                className={`relative flex h-[138px] w-full items-end justify-center rounded-[36px] p-4 backdrop-blur-xl ${
                  isNoc
                    ? "border border-white/10 bg-black/40"
                    : "border border-[rgba(247,246,242,0.4)] bg-[rgba(2,3,29,0.2)] backdrop-blur-[12px]"
                }`}
              >
              <div className="absolute left-1/2 top-[7px] h-0 w-[58px] -translate-x-1/2">
                <img
                  alt=""
                  src={dragHandleModal}
                  className="block size-full max-w-none opacity-90"
                  draggable={false}
                />
              </div>

              <motion.button
                type="button"
                aria-label="Previous category"
                onClick={goPrev}
                className="relative z-[1] mb-2 flex size-8 shrink-0 items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.92 }}
                transition={SPRING}
              >
                <div className="relative size-6 -scale-y-100 rotate-180 overflow-hidden">
                  <IconImg src={arrowRightIcon} className="size-6" />
                  <div className="absolute inset-[29.17%_37.5%]">
                    <IconImg src={arrowChevronIcon} className="size-full" />
                  </div>
                </div>
              </motion.button>

              <motion.div
                className="relative mr-[-24px] ml-[-24px] flex h-full min-w-0 flex-1 touch-pan-y flex-col"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                dragTransition={SPRING}
                onDragEnd={onSwipeDragEnd}
              >
                <AnimatePresence mode="wait" custom={direction} initial={false}>
                  <motion.div
                    key={state.activeCategory}
                    custom={direction}
                    variants={pillSlideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={SPRING}
                    className="absolute inset-0 flex flex-col items-center justify-between"
                  >
                    <SwipeFeatureContent
                      category={state.activeCategory}
                      user={user}
                      onIntercept={openIntent}
                      hideIntercept={state.isIntentOverlayOpen}
                      pushPhase={state.pushPhase}
                      isNoc={isNoc}
                    />
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              <motion.button
                type="button"
                aria-label="Next category"
                onClick={goNext}
                className="relative z-[1] mb-2 flex size-8 shrink-0 items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.92 }}
                transition={SPRING}
              >
                <div className="relative size-6 overflow-hidden">
                  <IconImg src={arrowRightIcon} className="size-6" />
                  <div className="absolute inset-[29.17%_37.5%]">
                    <IconImg src={arrowChevronIcon} className="size-full" />
                  </div>
                </div>
              </motion.button>
            </div>
            </div>

            <p
              className={`mt-6 max-w-[232px] text-center text-[11px] leading-[1.4] transition-colors duration-300 ${
                light ? "text-[rgba(2,3,29,0.4)]" : "text-[rgba(247,246,242,0.8)]"
              }`}
              style={{ fontFamily: FONT }}
            >
              {isNoc ? (
                <>
                  Noc signal unlocks every night at{" "}
                  <span className="font-medium">10PM</span>. Act before they fade.
                </>
              ) : (
                <>
                  New signals arrive every day at{" "}
                  <span className="font-medium">7 PM</span>. Act before they fade.
                </>
              )}
            </p>
          </div>

          <div className="absolute bottom-5 left-0 right-0 z-20 flex flex-col items-center gap-2 px-2">
            <div className={`flex w-full items-center ${isNoc ? "justify-between px-3" : "justify-center"}`}>
              {isNoc ? (
                <div
                  className="relative size-9 shrink-0 backdrop-blur-[10px]"
                  aria-label="NOC time lock"
                >
                  <IconImg src={nocTimerIcon} className="size-9" />
                </div>
              ) : null}
              <CrclePrimaryDock
                embedded
                active="signal"
                onProfile={onGoToProfile}
                onMessages={goToMessages}
                onRadar={() => {}}
                onSignalHome={onGoToSignalHome}
              />
              {isNoc ? <div className="size-9 shrink-0" aria-hidden /> : null}
            </div>
            <p
              className={`text-[12px] leading-[1.2] tracking-[-0.15px] transition-colors duration-300 ${
                light ? "text-[rgba(2,3,29,0.5)]" : "text-[rgba(255,255,255,0.4)]"
              }`}
              style={{ fontFamily: FONT }}
            >
              Verified Social
            </p>
          </div>

          <AnimatePresence>
            {onboardingOpen && (
              <RadarOnboarding onClose={dismissOnboarding} onContinue={dismissOnboarding} />
            )}
          </AnimatePresence>
        </div>
      </CrclePhoneFrame>
    </div>
  );
}

/* ——— Radar Onboarding (Figma 322:118007 / overlay 322:118087) ——— */

function RadarOnboarding({
  onClose,
  onContinue,
}: {
  onClose: () => void;
  onContinue: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28, ease: EASE }}
      className="absolute inset-0 z-[55] flex flex-col overflow-hidden rounded-[53px] bg-[rgba(2,3,29,0.6)] backdrop-blur-[8px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="radar-onboarding-title"
    >
      <div className="flex min-h-0 flex-1 flex-col px-3.5 pb-11 pt-[112px]">
        <div className="flex min-h-0 flex-1 flex-col items-center gap-[39px]">
          <div className="flex w-full shrink-0 flex-col items-center gap-9">
            <div className="flex w-full flex-col items-end">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close onboarding"
                className="crcle-glass-btn relative flex h-10 w-12 shrink-0 items-center justify-center overflow-hidden rounded-[24px] px-2 py-0.5"
              >
                <div className="dock-glass-lens opacity-40" aria-hidden />
                <IconImg src={radarCloseIcon} className="relative z-[1] size-6" />
              </button>
            </div>

            <IconImg src={radarOutlineIcon} className="size-9 shrink-0" />

            <div className="flex w-full flex-col items-center gap-3 text-center">
              <p
                id="radar-onboarding-title"
                className="w-full text-[15px] font-normal leading-[1.2] text-[#f7f6f2]"
                style={{ fontFamily: FONT }}
              >
                Fueled by your signal.
              </p>
              <p
                className="w-full text-[13px] font-light leading-[1.4] text-[rgba(247,246,242,0.7)]"
                style={{ fontFamily: FONT }}
              >
                Driven by intent.&nbsp;Your active signal constantly feeds the radar behind the scenes. The
                moment the countdown hits{" "}
                <span className="font-semibold text-[rgba(247,246,242,0.7)]">00:00</span>, the frost clears to
                reveal your curated matches. Every single connection unlocked is filtered entirely on the basis
                of mutual intent—matching you only with those who choose to be perceived exactly the way you do.
              </p>
            </div>
          </div>

          <div className="flex shrink-0 flex-col items-center justify-center gap-6">
            <IconImg src={radarDividerIcon} className="h-[3px] w-[19px]" />
            <div className="flex items-center gap-9">
              <div className="flex items-start gap-[26px]">
                <IconImg src={radarHeartIcon} className="size-[42px]" />
                <div className="flex h-9 w-[42px] items-center justify-center overflow-hidden">
                  <IconImg src={radarLaptopIcon} className="h-6 w-[37px]" />
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="flex size-[46px] items-center justify-center">
                  <IconImg src={radarYinIcon} className="size-[38px]" />
                </div>
                <IconImg src={radarFireIcon} className="size-[38px]" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto flex shrink-0 flex-col items-center gap-[18px] pt-6">
          <p
            className="w-full text-center text-[14px] font-medium leading-[21px] text-[#f7f6f2]"
            style={{ fontFamily: FONT }}
          >
            Radar features
          </p>
          <button
            type="button"
            onClick={onContinue}
            className="flex w-[91px] flex-col items-center gap-[5px] rounded-xl transition hover:bg-white/5"
          >
            <IconImg src={crcleLogo} className="h-[17px] w-[49px]" />
            <span
              className="w-full text-center text-[11px] leading-[1.1] tracking-[-0.2px] text-[rgba(247,246,242,0.4)]"
              style={{ fontFamily: FONT }}
            >
              Verified Social
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function SwipeFeatureContent({
  category,
  user,
  onIntercept,
  hideIntercept = false,
  pushPhase = "idle",
  isNoc = false,
}: {
  category: RadarCategory;
  user: RecommendedUser;
  onIntercept: () => void;
  hideIntercept?: boolean;
  pushPhase?: PushPhase;
  isNoc?: boolean;
}) {
  const icon = CATEGORY_ICON[category];
  const showStatus = pushPhase === "loading" || pushPhase === "success" || pushPhase === "modal";

  return (
    <>
      <div className="flex w-full flex-col items-start">
        <div className="mb-[-8px] flex w-full items-start justify-between">
          <div className="flex items-center">
            <div
              className={`flex size-10 items-center justify-center rounded-[20px] px-1.5 py-0.5 ${
                isNoc ? "bg-white/10" : "bg-white/20"
              }`}
            >
              {icon === "waves" ? (
                <SoundWaveBars />
              ) : (
                <IconImg src={icon} className="size-5 brightness-0 invert" />
              )}
            </div>
            <div className="flex size-10 items-center justify-center rounded-full bg-[#02031d] p-1">
              <span className="relative size-6 overflow-hidden rounded-sm">
                <img alt="" src={linkIcon} className="absolute inset-0 size-full" />
                <span className="absolute inset-[29.17%_8.33%]">
                  <img alt="" src={linkInnerIcon} className="absolute inset-0 size-full" />
                </span>
              </span>
            </div>
          </div>

          <div className="flex w-[163px] flex-col items-start justify-center self-stretch">
            <p
              className="w-full text-center text-[19px] font-medium leading-[1.2] text-white"
              style={{ fontFamily: FONT }}
            >
              {user.name}
            </p>
          </div>

          <div className="flex h-10 w-20 flex-col items-end">
            {showStatus ? (
              <div className="flex h-full w-[47px] items-center justify-center rounded-[36px] border border-[rgba(247,246,242,0.05)] p-1">
                {pushPhase === "loading" ? <SignalPushLoader /> : <SignalPushCheck />}
              </div>
            ) : (
              <motion.button
                type="button"
                aria-label="Intercept signal"
                onClick={onIntercept}
                className={`flex h-full items-center justify-center rounded-[36px] p-1 backdrop-blur-[6px] ${
                  isNoc
                    ? "w-auto aspect-[36/24] border border-[#f7f6f2] bg-[rgba(247,246,242,0.1)]"
                    : "w-[60px] bg-white/50"
                } ${hideIntercept ? "pointer-events-none opacity-0" : ""}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.92 }}
                transition={SPRING}
              >
                <img alt="" src={locusPlusIcon} className="size-6 object-contain" draggable={false} />
              </motion.button>
            )}
          </div>
        </div>

        {category === "signal" && !isNoc ? (
          <p
            className="h-[17px] w-full text-center text-[12px] font-light leading-[1.2] text-[rgba(247,246,242,0.8)]"
            style={{ fontFamily: FONT }}
          >
            High Romantic Connection
          </p>
        ) : (
          <div className="h-[17px] w-full" aria-hidden />
        )}
      </div>

      <CategoryPills category={category} user={user} />
    </>
  );
}

function CategoryPills({
  category,
  user,
}: {
  category: RadarCategory;
  user: RecommendedUser;
}) {
  if (category === "signal") {
    return (
      <motion.div
        className="flex items-center gap-2 rounded-[120px] bg-[rgba(247,246,242,0.1)] p-1"
        initial="hidden"
        animate="show"
        variants={staggerContainer}
      >
        <motion.div
          variants={staggerPill}
          className="flex h-8 items-center justify-center gap-1 rounded-[120px] border border-[#f7f6f2] px-3 py-1.5"
        >
          <IconImg src={mapPinIcon} className="size-2.5" />
          <span className="text-[13px] leading-[1.4] text-[#f7f6f2]" style={{ fontFamily: FONT }}>
            {user.distance}
          </span>
        </motion.div>
        <motion.div
          variants={staggerPill}
          className="flex h-8 items-center justify-center rounded-[120px] bg-[#02031d] px-3.5 py-1.5"
        >
          <span className="text-[13px] leading-[1.4] text-[#f7f6f2]" style={{ fontFamily: FONT }}>
            {user.age} Yrs
          </span>
        </motion.div>
      </motion.div>
    );
  }

  if (category === "purpose") {
    return (
      <motion.div
        className="flex items-center gap-2 rounded-[120px] bg-[rgba(247,246,242,0.1)] p-1.5"
        initial="hidden"
        animate="show"
        variants={staggerContainer}
      >
        <motion.div
          variants={staggerPill}
          className="flex h-8 w-[72px] items-center justify-center gap-1 rounded-[120px] border border-[#f7f6f2] px-2 py-1"
        >
          <IconImg src={lightbulbIcon} className="size-3.5" />
          <span className="text-[11px] leading-[1.4] text-[#f7f6f2]" style={{ fontFamily: FONT }}>
            Learn
          </span>
        </motion.div>
        <motion.div
          variants={staggerPill}
          className="flex h-8 w-[72px] items-center justify-center gap-1 rounded-[120px] border border-[#f7f6f2] px-2 py-1"
        >
          <IconImg src={brainIcon} className="h-3 w-3.5" />
          <span className="text-[11px] leading-[1.4] text-[#f7f6f2]" style={{ fontFamily: FONT }}>
            Mind
          </span>
        </motion.div>
      </motion.div>
    );
  }

  if (category === "love") {
    return (
      <motion.div
        className="flex items-center gap-3 rounded-[120px] bg-[rgba(247,246,242,0.1)] p-1.5"
        initial="hidden"
        animate="show"
        variants={staggerContainer}
      >
        <motion.div
          variants={staggerPill}
          className="flex h-8 w-[76px] items-center justify-center gap-1 rounded-[120px] bg-[#02031d] px-2 py-1.5"
        >
          <IconImg src={unlockIcon} className="size-4 brightness-0 invert" />
          <span className="text-[11px] leading-[1.4] text-white" style={{ fontFamily: FONT }}>
            {user.relationshipStatus}
          </span>
        </motion.div>
        <motion.div
          variants={staggerPill}
          className="flex h-8 w-[76px] items-center justify-center rounded-[120px] border border-[#f7f6f2] px-3 py-1.5"
        >
          <span className="text-[11px] leading-[1.4] text-white" style={{ fontFamily: FONT }}>
            {user.orientation}
          </span>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="flex items-center rounded-[120px] bg-[rgba(247,246,242,0.4)] py-1.5 pl-4 pr-1.5"
      initial="hidden"
      animate="show"
      variants={staggerContainer}
    >
      <motion.span
        variants={staggerPill}
        className="min-w-0 truncate text-[13px] leading-[1.4] text-[#020426]"
        style={{ fontFamily: FONT }}
      >
        {user.role}
      </motion.span>
      <motion.span
        variants={staggerPill}
        className="ml-3 shrink-0 rounded-[120px] bg-[#020426] px-2 py-1 text-[13px] leading-[1.4] text-[#f7f6f2]"
        style={{ fontFamily: FONT }}
      >
        {user.roleTag}
      </motion.span>
    </motion.div>
  );
}

function SoundWaveBars({ dark = false }: { dark?: boolean }) {
  const fill = dark ? "bg-[#02031d]" : "bg-[#f7f6f2]";
  return (
    <div className="flex items-center gap-[2.8px]">
      <span className={`h-[8.4px] w-[5.6px] shrink-0 rounded-[19px] ${fill}`} />
      <span className={`h-[14px] w-[5.6px] shrink-0 rounded-[19px] ${fill}`} />
      <span className={`h-[8.4px] w-[5.6px] shrink-0 rounded-[19px] ${fill}`} />
    </div>
  );
}

function IntentPushOverlay({
  selectedIntent,
  onSelect,
  onConfirm,
  onClose,
}: {
  selectedIntent: RadarIntent | null;
  onSelect: (intent: RadarIntent) => void;
  onConfirm: () => void;
  onClose: () => void;
}) {
  return (
    <div
      className="relative size-full overflow-hidden rounded-[36px] bg-[rgba(2,3,29,0.4)] backdrop-blur-[6px]"
      role="dialog"
      aria-label="Set intent"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 z-0 rounded-[36px]"
      />

      {/* Large intent matrix — Figma 841:225023 */}
      <div className="pointer-events-none absolute left-1/2 top-[calc(50%-44px)] z-[1] flex w-[289px] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-8">
        <div className="pointer-events-auto flex h-[97px] w-[107px] items-center justify-between">
          <div className="flex h-full flex-col items-start justify-between">
            <IntentLargeButton
              intent="romantic"
              src={intentHeartIcon}
              className="size-[42px]"
              active={selectedIntent === "romantic"}
              onSelect={onSelect}
            />
            <IntentLargeButton
              intent="professional"
              src={intentLaptopIcon}
              className="h-9 w-[42px]"
              active={selectedIntent === "professional"}
              onSelect={onSelect}
            />
          </div>

          <img
            alt=""
            src={intentDotsIcon}
            className="h-[19px] w-[5px] shrink-0 object-contain"
            draggable={false}
            aria-hidden
          />

          <div className="flex h-full flex-col items-center justify-between">
            <IntentLargeButton
              intent="balanced"
              src={intentYinYangIcon}
              className="size-[46px]"
              active={selectedIntent === "balanced"}
              onSelect={onSelect}
            />
            <IntentLargeButton
              intent="social"
              src={intentFireIcon}
              className="size-[38px]"
              active={selectedIntent === "social"}
              onSelect={onSelect}
            />
          </div>
        </div>

        <p
          className="w-full text-center text-[19px] leading-[1.2] text-[rgba(255,255,255,0.5)]"
          style={{ fontFamily: FONT }}
        >
          Set expectations from the first tap. Send a romantic professional, social or a balanced
          signal.
        </p>
      </div>

      {/* Mini chips + confirm + — Figma 841:225008 + hover 847:225133 */}
      <div className="absolute bottom-[91px] right-4 z-[1] flex items-end gap-3 overflow-visible">
        <IntentChipDock selectedIntent={selectedIntent} onSelect={onSelect} />

        <button
          type="button"
          aria-label="Push signal"
          disabled={!selectedIntent}
          onClick={onConfirm}
          className={`crcle-intent-chip relative z-[1] flex h-9 w-[54px] shrink-0 items-center justify-center rounded-[36px] p-1 transition-[background,opacity] duration-200 ${
            selectedIntent
              ? "opacity-100 hover:bg-[rgba(247,246,242,0.36)]"
              : "pointer-events-none opacity-70"
          }`}
        >
          <img
            alt=""
            src={locusPlusIcon}
            className="crcle-intent-chip__icon relative size-4 object-contain"
            draggable={false}
          />
        </button>
      </div>
    </div>
  );
}

function IntentLargeButton({
  intent,
  src,
  className,
  active,
  onSelect,
}: {
  intent: RadarIntent;
  src: string;
  className: string;
  active: boolean;
  onSelect: (intent: RadarIntent) => void;
}) {
  return (
    <button
      type="button"
      aria-label={intent}
      aria-pressed={active}
      onClick={() => onSelect(intent)}
      className={`relative transition ${active ? "scale-110 drop-shadow-[0_0_12px_rgba(247,246,242,0.45)]" : "opacity-80 hover:opacity-100"}`}
    >
      <img alt="" src={src} className={`${className} object-contain`} draggable={false} />
    </button>
  );
}

function IntentChipDock({
  selectedIntent,
  onSelect,
}: {
  selectedIntent: RadarIntent | null;
  onSelect: (intent: RadarIntent) => void;
}) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      layout
      transition={DOCK_SPRING}
      onMouseLeave={() => setHovered(null)}
      className="grid grid-cols-2"
      style={{ gap: CHIP_GAP }}
    >
      {INTENT_CHIPS.map((chip, index) => (
        <IntentChip
          key={chip.intent}
          chip={chip}
          index={index}
          hovered={hovered}
          active={selectedIntent === chip.intent}
          onHover={setHovered}
          onSelect={onSelect}
        />
      ))}
    </motion.div>
  );
}

function IntentChip({
  chip,
  index,
  hovered,
  active,
  onHover,
  onSelect,
}: {
  chip: IntentChipDef;
  index: number;
  hovered: number | null;
  active: boolean;
  onHover: (index: number | null) => void;
  onSelect: (intent: RadarIntent) => void;
}) {
  const isHovered = hovered === index;
  const dist = hovered === null ? null : chipGridDistance(hovered, index);
  const isNeighbour = dist === 1;
  const isDistant = dist !== null && dist >= 2;

  const scale = isHovered ? 1.28 : isNeighbour ? 1.08 : isDistant ? 0.95 : 1;
  const lit = isHovered || active;
  const slot = Math.ceil(CHIP_BASE * scale);

  return (
    <motion.div
      layout
      onMouseEnter={() => onHover(index)}
      animate={{ width: slot, height: slot }}
      transition={DOCK_SPRING}
      className="relative flex shrink-0 items-center justify-center"
    >
      <motion.button
        type="button"
        aria-label={chip.intent}
        aria-pressed={active}
        onClick={() => onSelect(chip.intent)}
        animate={{ scale }}
        transition={DOCK_SPRING}
        whileTap={{ scale: scale * 0.9 }}
        className={`crcle-intent-chip relative flex shrink-0 items-center justify-center rounded-[46px] p-1 ${
          lit ? "is-lit" : ""
        }`}
        style={
          {
            width: CHIP_BASE,
            height: CHIP_BASE,
            ["--chip-accent"]: chip.accent,
          } as CSSProperties
        }
      >
        {/* Glass crescent rim — absolute so it never affects icon layout */}
        <svg
          aria-hidden
          viewBox="0 0 36 36"
          className="pointer-events-none absolute inset-0 z-0 size-full"
        >
          <defs>
            <linearGradient
              id={`chip-rim-${chip.intent}`}
              x1="4"
              y1="2"
              x2="32"
              y2="34"
              gradientUnits="userSpaceOnUse"
            >
              {lit ? (
                <>
                  <stop offset="0%" stopColor={chip.accent} stopOpacity="1" />
                  <stop offset="70%" stopColor="#ffffff" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0.04" />
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
            cx="18"
            cy="18"
            r="16.75"
            fill="none"
            stroke={`url(#chip-rim-${chip.intent})`}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>

        {/* Figma: 20×20 icon centered in 36×36 chip with 4px padding */}
        <span className="crcle-intent-chip__icon relative flex size-5 shrink-0 items-center justify-center">
          <motion.img
            alt=""
            src={chip.src}
            draggable={false}
            animate={{ opacity: lit ? 0 : 1 }}
            transition={DOCK_SPRING}
            className="pointer-events-none absolute inset-0 m-auto size-5 max-h-full max-w-full object-contain"
          />
          <motion.img
            alt=""
            src={chip.hoverSrc}
            draggable={false}
            animate={{ opacity: lit ? 1 : 0 }}
            transition={DOCK_SPRING}
            className="pointer-events-none relative size-5 max-h-full max-w-full object-contain"
          />
        </span>
      </motion.button>
    </motion.div>
  );
}

function SignalPushLoader() {
  return (
    <motion.div
      className="relative size-6"
      aria-label="Sending signal"
      animate={{ rotate: 360 }}
      transition={{ duration: 0.9, ease: "linear", repeat: Infinity }}
    >
      <svg viewBox="0 0 24 24" className="size-full" aria-hidden>
        <circle
          cx="12"
          cy="12"
          r="9"
          fill="none"
          stroke="rgba(247,246,242,0.22)"
          strokeWidth="2.5"
        />
        <circle
          cx="12"
          cy="12"
          r="9"
          fill="none"
          stroke={SUCCESS}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="14 44"
        />
      </svg>
    </motion.div>
  );
}

function SignalPushCheck() {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 420, damping: 18 }}
      className="relative size-6"
      aria-label="Signal sent"
    >
      <svg viewBox="0 0 24 24" className="size-full" aria-hidden>
        <circle
          cx="12"
          cy="12"
          r="9"
          fill="none"
          stroke={SUCCESS}
          strokeWidth="1.6"
          opacity="0.35"
        />
        <circle cx="12" cy="12" r="7.2" fill="none" stroke={SUCCESS} strokeWidth="1.8" />
        <path
          d="M8.2 12.2l2.4 2.4 5.2-5.2"
          fill="none"
          stroke={SUCCESS}
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
}

function SignalSentSuccessModal({
  userName,
  onGoToMessages,
  onClose,
}: {
  userName: string;
  onGoToMessages: () => void;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.99 }}
      transition={{ duration: 0.28, ease: EASE }}
      className="relative flex size-full flex-col items-center justify-between rounded-[36px] bg-[rgba(1,2,17,0.8)] p-4 backdrop-blur-[8px]"
      role="dialog"
      aria-label="Signal Sent"
    >
      <div className="flex w-full items-center justify-end">
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="flex size-6 items-center justify-center rounded-full bg-white/10"
        >
          <img alt="" src={locusCloseIcon} className="size-3.5 object-contain" draggable={false} />
        </button>
      </div>

      <div className="flex h-[121px] w-full flex-col items-center justify-center gap-[33px]">
        <div className="flex items-center gap-[7px]" aria-hidden>
          <span className="h-[27px] w-[14px] rounded-[35px] bg-[#f7f6f2]" />
          <span className="h-[45px] w-[14px] rounded-[35px] bg-[#f7f6f2]" />
          <span className="h-[27px] w-[14px] rounded-[35px] bg-[#f7f6f2]" />
        </div>
        <p
          className="w-full text-center text-[24px] font-medium leading-[1.2] text-white"
          style={{ fontFamily: FONT }}
        >
          Signal Sent
        </p>
      </div>

      <div className="mb-4 flex w-full flex-col items-center gap-3">
        <button
          type="button"
          onClick={onGoToMessages}
          className="flex items-center justify-center rounded-full bg-[#f7f6f2] px-16 py-3.5 text-[15px] font-medium leading-[22.5px] text-[#0a0a0f]"
          style={{ fontFamily: FONT }}
        >
          Go to messages
        </button>
        <p
          className="w-[270px] text-center text-[12px] leading-[1.2] text-[rgba(247,246,242,0.8)]"
          style={{ fontFamily: FONT }}
        >
          {userName} will be notified of your intercepted signal
        </p>
      </div>
    </motion.div>
  );
}

function StatusBar() {
  return (
    <div className="relative z-30 mx-auto flex h-[62px] w-[84%] shrink-0 items-end justify-between px-2 pb-[10px] text-[var(--crcle-fg)] transition-colors duration-300">
      <span
        className="text-[17px] font-semibold leading-[22px]"
        style={{ fontFamily: "SF Pro, system-ui, -apple-system, sans-serif" }}
      >
        9:41
      </span>
      <div className="crcle-theme-icon flex items-center gap-[7px] pb-0.5">
        <IconImg src={cellularIcon} className="h-[12.226px] w-[19.2px]" />
        <IconImg src={wifiIcon} className="h-[12.328px] w-[17.142px]" />
        <IconImg src={batteryIcon} className="h-[13px] w-[27.328px]" />
      </div>
    </div>
  );
}

/** Exact Figma 957:31045 / 959:29300 mesh — 36px ellipses, 24px gap. */
function NocDotField() {
  const cols = 11;
  const rows = 18;
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col gap-6">
        {Array.from({ length: rows }, (_, row) => (
          <div key={row} className="flex shrink-0 gap-6">
            {Array.from({ length: cols }, (_, col) => (
              <img
                key={col}
                alt=""
                src={nocDotIcon}
                className="size-9 max-w-none shrink-0"
                draggable={false}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

const pillSlideVariants = {
  enter: (dir: number) => ({
    x: dir >= 0 ? 56 : -56,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({
    x: dir >= 0 ? -56 : 56,
    opacity: 0,
  }),
};

const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.02 },
  },
};

const staggerPill = {
  hidden: { opacity: 0, scale: 0.86, y: 6 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: SPRING,
  },
};

function IconImg({ src, className = "size-6" }: { src: string; className?: string }) {
  return (
    <div className={`relative shrink-0 overflow-hidden ${className}`}>
      <img alt="" src={src} className="absolute inset-0 size-full max-w-none object-contain" />
    </div>
  );
}
