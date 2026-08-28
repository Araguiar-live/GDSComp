import { AnimatePresence, motion } from "framer-motion";
import { Sun } from "lucide-react";
import { useCallback, useState, type ReactNode } from "react";
import batteryIcon from "@/assets/crcle/battery.svg";
import cellularIcon from "@/assets/crcle/cellular.svg";
import crcleLogo from "@/assets/crcle/crcle-logo.svg";
import arrowChevronIcon from "@/assets/crcle/arrow-chevron.svg";
import locusCloseIcon from "@/assets/crcle/locus/close-x.svg";
import locusPinIcon from "@/assets/crcle/locus/pin.svg";
import locusSendLightIcon from "@/assets/crcle/locus/send-light.svg";
import closeAddIcon from "@/assets/crcle/onboarding/close-add.svg";
import radarFireIcon from "@/assets/crcle/onboarding/radar-fire.svg";
import radarHeartIcon from "@/assets/crcle/onboarding/radar-heart.svg";
import radarLaptopIcon from "@/assets/crcle/onboarding/radar-laptop.svg";
import radarYinIcon from "@/assets/crcle/onboarding/radar-yin.svg";
import signalDividerIcon from "@/assets/crcle/onboarding/signal-divider.svg";
import signalPrivacyIcon from "@/assets/crcle/onboarding/signal-privacy.svg";
import signalPulseIcon from "@/assets/crcle/onboarding/signal-pulse.svg";
import locationMapImg from "@/assets/crcle/profile/location-map.png";
import mapPinPreciseIcon from "@/assets/crcle/profile/map-pin-precise.svg";
import navHomeIcon from "@/assets/crcle/nav-home.svg";
import cameraIcon from "@/assets/crcle/signal-home/camera.svg";
import dropPhoto from "@/assets/crcle/signal-home/drop-photo.png";
import locationIcon from "@/assets/crcle/signal-home/location.svg";
import philosophyDivider from "@/assets/crcle/signal-home/philosophy-divider.svg";
import pulseIcon from "@/assets/crcle/signal-home/pulse.svg";
import radarIcon from "@/assets/crcle/signal-home/radar.svg";
import wifiIcon from "@/assets/crcle/wifi.svg";
import { CrclePhoneFrame } from "@/components/portfolio/CrclePhoneFrame";
import {
  CrcleBackButton,
  CrcleMoreButton,
  CrclePrimaryDock,
} from "@/components/portfolio/CrcleChrome";
import { SignalTuneDrawer } from "@/components/portfolio/SignalTuneDrawer";

/**
 * CRCLE Signal Home — Daily 3 empty → photo drop.
 * Dark: Figma 957:30981. Light + Signal Features onboarding: 322:118233.
 * Location Required modal: Figma 986:85539 (stage 2 → second signal bar).
 */

const FONT = "Montserrat, ui-sans-serif, system-ui, sans-serif";
const EASE = [0.22, 1, 0.36, 1] as const;

type Screen = "empty" | "photo";

export function CrcleSignalHome({
  onGoToMessages,
  onGoToProfile,
  onGoToRadar,
}: {
  onGoToMessages?: () => void;
  onGoToProfile?: () => void;
  onGoToRadar?: () => void;
} = {}) {
  const [screen, setScreen] = useState<Screen>("empty");
  const [tuneOpen, setTuneOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [locationDone, setLocationDone] = useState(false);
  const [signalStrength, setSignalStrength] = useState(10);
  /* Figma 322:118233 — Signal Features overlay on light Daily 3 */
  const [onboardingOpen, setOnboardingOpen] = useState(true);
  /* Light default matches Signal Onboarding - Light; sun flips to dark Daily 3 */
  const [isLightMode, setIsLightMode] = useState(true);
  /** Fine-tune drawer completed (stage 3) */
  const tuned = signalStrength >= 90;
  /** Stage 1 photo → 1 bar; stage 2 location → 2 bars; fine-tune → 3 bars */
  const activeBars =
    screen !== "photo" ? 0 : tuned ? 3 : locationDone ? 2 : 1;

  const dismissOnboarding = useCallback(() => {
    setOnboardingOpen(false);
  }, []);

  return (
    <div className="relative ml-auto w-fit">
      <motion.button
        type="button"
        aria-label={isLightMode ? "Switch to dark mode" : "Switch to light mode"}
        aria-pressed={isLightMode}
        onClick={() => setIsLightMode((v) => !v)}
        className="absolute left-1/2 -top-10 z-30 flex size-8 -translate-x-1/2 items-center justify-center border-0 bg-transparent p-0 shadow-none outline-none ring-0"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
      >
        <Sun
          strokeWidth={1.5}
          className={`size-6 transition-colors duration-300 ${
            isLightMode ? "fill-amber-400 text-amber-400" : "fill-none text-zinc-800"
          }`}
        />
      </motion.button>

      <CrclePhoneFrame light={isLightMode}>
        <div className="relative flex h-full min-h-0 w-full flex-col overflow-hidden bg-[#010211] transition-colors duration-300 [.crcle-phone--light_&]:bg-[var(--crcle-bg)]">
          <SignalTuneDrawer
            open={tuneOpen}
            onClose={() => setTuneOpen(false)}
            onSave={() => setSignalStrength(100)}
            backdropImage={screen === "photo" ? dropPhoto : undefined}
          />
          <AnimatePresence>
            {locationOpen ? (
              <LocationRequiredModal
                onClose={() => setLocationOpen(false)}
                onSave={() => {
                  setLocationDone(true);
                  setSignalStrength(65);
                  setLocationOpen(false);
                }}
              />
            ) : null}
          </AnimatePresence>
          <StatusBar />
          <div className="mt-[5px] flex shrink-0 justify-center pb-1">
            <IconImg src={crcleLogo} className="crcle-theme-icon h-[13px] w-[38px]" />
          </div>

          <div className="flex w-full shrink-0 flex-col items-center gap-px px-3">
            <div className="flex h-10 w-full items-center justify-between">
              <CrcleBackButton
                onClick={() => {
                  setScreen("empty");
                  setSignalStrength(10);
                  setLocationDone(false);
                  setLocationOpen(false);
                  setTuneOpen(false);
                }}
              />
              <CrcleMoreButton />
            </div>

            <div className="flex flex-col items-center justify-center rounded-[24px] bg-[rgba(1,2,17,0.01)] px-4 py-1 text-center">
              <p
                className="whitespace-nowrap text-[23px] leading-[1.2] text-[#f7f6f2] transition-colors duration-300 [.crcle-phone--light_&]:text-[#02031d]"
                style={{ fontFamily: FONT }}
              >
                {isLightMode ? "03:40" : "00:40"}
              </p>
              <p
                className="text-[11px] leading-[1.4] tracking-[0.35em] text-[rgba(247,246,242,0.4)] transition-colors duration-300 [.crcle-phone--light_&]:text-[rgba(2,3,29,0.1)]"
                style={{ fontFamily: FONT }}
              >
                HRS&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;MIN
              </p>
            </div>
          </div>

          <div className="relative mt-[25px] flex min-h-0 w-full flex-1 flex-col items-center gap-2.5 px-3 pb-24">
            <div
              className={`relative flex min-h-0 w-full flex-1 flex-col overflow-hidden p-3 transition-colors duration-300 ${
                screen === "photo"
                  ? "rounded-[28px] border border-[#f7f6f2]"
                  : isLightMode
                    ? "rounded-[16px] border-2 border-dashed border-[#b1b1bc] bg-[rgba(2,3,29,0.1)] px-3 py-[46px]"
                    : "rounded-[16px] border border-dashed border-[rgba(177,177,188,0.4)] px-3 py-[46px]"
              }`}
              style={
                screen === "empty" && !isLightMode
                  ? {
                      backgroundImage:
                        "linear-gradient(150.6deg, rgba(247,246,242,0.2) 1.63%, rgba(247,246,242,0.143) 47.28%, rgba(247,246,242,0.08) 97.56%)",
                    }
                  : undefined
              }
            >
              <AnimatePresence>
                {screen === "photo" ? (
                  <motion.div
                    key="signal-strength"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.28, ease: EASE }}
                    className="absolute inset-x-0 top-0 z-30 flex items-center justify-between rounded-[28px] bg-[rgba(247,246,242,0.2)] p-2 backdrop-blur-[12px]"
                  >
                    <div className="flex min-w-0 flex-1 items-center gap-3">
                      <div className="flex shrink-0 items-center gap-[3.2px]" aria-hidden>
                        <span
                          className={`h-3 w-[6px] rounded-[5px] transition-colors duration-300 ${
                            activeBars >= 1 ? "bg-[#22c55e]" : "bg-[#020426]"
                          }`}
                        />
                        <span
                          className={`h-5 w-[6.4px] rounded-[5px] transition-colors duration-300 ${
                            activeBars >= 2 ? "bg-[#22c55e]" : "bg-[#020426]"
                          }`}
                        />
                        <span
                          className={`h-3 w-[6px] rounded-[5px] transition-colors duration-300 ${
                            activeBars >= 3
                              ? "bg-[#22c55e]"
                              : activeBars >= 2
                                ? "bg-[rgba(2,4,38,0.2)]"
                                : "bg-[#020426]"
                          }`}
                        />
                      </div>
                      <div className="min-w-0 flex-1 leading-[1.2] text-[#030426]">
                        <p className="text-[14px] font-medium" style={{ fontFamily: FONT }}>
                          Signal Strength: {signalStrength}%
                        </p>
                        <p className="text-[12px] font-normal" style={{ fontFamily: FONT }}>
                          {activeBars >= 3
                            ? "Signal fully calibrated."
                            : activeBars >= 2
                              ? "Add 1 more detail to hit 100%."
                              : "Add 3 more details to hit 100%."}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setTuneOpen(true)}
                      className="flex h-9 shrink-0 items-center justify-center rounded-[36px] bg-[#030426] px-4 py-2"
                    >
                      <span
                        className="text-[13px] leading-[1.4] text-[#fefefe]"
                        style={{ fontFamily: FONT }}
                      >
                        {tuned ? "Edit" : "Complete"}
                      </span>
                    </button>
                  </motion.div>
                ) : null}
              </AnimatePresence>

              <AnimatePresence initial={false} mode="sync">
                {screen === "photo" ? (
                  <motion.div
                    key="photo-bg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-[28px]"
                  >
                    <img
                      alt=""
                      src={dropPhoto}
                      className="absolute inset-0 size-full rounded-[28px] object-cover"
                      draggable={false}
                    />
                    <div className="absolute inset-0 rounded-[28px] bg-black/20" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty-bg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="absolute inset-0"
                  >
                    <div
                      className={`pointer-events-none absolute inset-x-0 top-0 z-[1] flex flex-col items-center overflow-hidden rounded-b-[24px] border border-[#f7f6f2] border-t-0 transition-colors duration-300 ${
                        isLightMode ? "bg-[#dddcdb]" : "bg-transparent"
                      }`}
                    >
                      <div className="flex w-full flex-col items-center gap-5 px-4 pb-3 pt-6">
                        <p
                          className={`w-full text-center text-[16px] font-medium leading-[1.4] transition-colors duration-300 ${
                            isLightMode ? "text-[#020426]" : "text-[#f7f6f2]"
                          }`}
                          style={{ fontFamily: FONT }}
                        >
                          The Daily 3 Philosophy
                        </p>
                        <p
                          className={`max-w-[248px] text-center text-[13px] font-normal leading-[1.4] transition-colors duration-300 ${
                            isLightMode ? "text-[#020426]" : "text-[#f7f6f2]"
                          }`}
                          style={{ fontFamily: FONT }}
                        >
                          No infinite scrolling. Just&nbsp;3 highly calibrated matches&nbsp;every 24
                          hours. Each action you take trains your&nbsp;Signal&nbsp;for better matches
                          tomorrow.
                        </p>
                        <img
                          alt=""
                          src={philosophyDivider}
                          className={`h-[3px] w-[64.5px] max-w-none object-contain ${
                            isLightMode ? "" : "brightness-200"
                          }`}
                          draggable={false}
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setScreen("photo");
                        setSignalStrength(33);
                      }}
                      className={`absolute inset-0 z-0 flex flex-col items-center justify-center gap-2 px-3 pt-24 transition active:scale-[0.995] ${
                        isLightMode ? "hover:bg-black/[0.03]" : "hover:bg-white/[0.03]"
                      }`}
                      aria-label="Tap to upload photo"
                    >
                      <IconImg
                        src={cameraIcon}
                        className={`size-5 ${isLightMode ? "" : "brightness-0 invert"}`}
                      />
                      <div className="flex w-full flex-col items-center gap-0.5 text-center">
                        <p
                          className={`w-full text-[13px] leading-[1.4] transition-colors duration-300 ${
                            isLightMode ? "text-[#030422]" : "text-[rgba(247,246,242,0.8)]"
                          }`}
                          style={{ fontFamily: FONT }}
                        >
                          Help others recognise you
                        </p>
                        <p
                          className={`w-full text-[11px] leading-[1.4] transition-colors duration-300 ${
                            isLightMode
                              ? "text-[rgba(2,3,29,0.6)]"
                              : "text-[rgba(247,246,242,0.8)]"
                          }`}
                          style={{ fontFamily: FONT }}
                        >
                          Tap to upload photo
                        </p>
                      </div>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {screen === "photo" ? (
                <div className="pointer-events-none absolute left-3 top-1/2 z-[1] flex -translate-y-1/2 flex-col gap-1.5">
                  <div className="pointer-events-auto">
                    <OverlayToolButton ariaLabel="Home" onClick={() => setTuneOpen(true)}>
                      <IconImg src={navHomeIcon} className="size-6" />
                    </OverlayToolButton>
                  </div>
                  <div className="pointer-events-auto">
                    <OverlayToolButton
                      ariaLabel="Location"
                      onClick={() => setLocationOpen(true)}
                      lit={locationDone || locationOpen}
                    >
                      <IconImg src={locationIcon} className="size-6" />
                    </OverlayToolButton>
                  </div>
                  <div className="pointer-events-auto">
                    <OverlayToolButton ariaLabel="Intent">
                      <div className="flex items-center gap-[2.9px]">
                        <span className="h-[12.3px] w-[4.8px] rounded-[4.7px] border border-[#f7f6f2] bg-[#f7f6f2]" />
                        <span className="h-[20.4px] w-[5.2px] rounded-[4.7px] bg-[#f7f6f2]" />
                        <span className="h-[12.3px] w-[4.8px] rounded-[4.7px] border border-[#f7f6f2] bg-[#f7f6f2]" />
                      </div>
                    </OverlayToolButton>
                  </div>
                </div>
              ) : null}

              <div className="relative z-[1] mt-auto flex w-full items-end justify-between pb-0.5">
                {screen === "photo" ? (
                  <>
                    <div className="flex w-full items-center justify-center gap-2">
                      <span className="h-1.5 w-6 rounded-full bg-white" />
                      <span className="size-1.5 rounded-full bg-white/40" />
                      <span className="size-1.5 rounded-full bg-white/40" />
                    </div>
                    <div className="absolute bottom-0 right-0">
                      <OverlayToolButton ariaLabel="Pulse" size={36} soft>
                        <IconImg src={pulseIcon} className="size-6" />
                      </OverlayToolButton>
                    </div>
                  </>
                ) : null}
              </div>
            </div>

            <FooterSignal
              tone={screen === "photo" ? "live" : "neutral"}
              activeBars={activeBars}
              isLight={isLightMode}
            />
          </div>

          {!onboardingOpen ? (
            <CrclePrimaryDock
              active="signal"
              onProfile={onGoToProfile}
              onMessages={onGoToMessages}
              onRadar={onGoToRadar}
              onSignalHome={() => {}}
            />
          ) : null}

          <AnimatePresence>
            {onboardingOpen ? (
              <SignalOnboarding onClose={dismissOnboarding} onContinue={dismissOnboarding} />
            ) : null}
          </AnimatePresence>
        </div>
      </CrclePhoneFrame>
    </div>
  );
}

/* ——— Signal Onboarding (Figma 322:118233 / overlay 322:118280) ——— */

function SignalOnboarding({
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
      aria-labelledby="signal-onboarding-title"
    >
      <div className="flex min-h-0 flex-1 flex-col px-9 pb-11 pt-[112px]">
        <div className="flex min-h-0 flex-1 flex-col">
          <div className="mb-[12px] flex w-full shrink-0 flex-col items-end">
            <button
              type="button"
              onClick={onClose}
              aria-label="Close onboarding"
              className="crcle-glass-btn relative flex h-10 w-12 shrink-0 items-center justify-center overflow-hidden rounded-[24px] px-2 py-0.5"
            >
              <div className="dock-glass-lens opacity-40" aria-hidden />
              <IconImg src={closeAddIcon} className="relative z-[1] size-6" />
            </button>
          </div>

          <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto overscroll-contain">
            <SignalOnboardingFeature
              icon={<MiniSignalBars />}
              title="The Signal"
              body="How you are recommended. This is your active beacon in the app. It controls how you show up to others and dictates who you cross paths with based on your daily settings."
            />
            <SignalOnboardingFeature
              icon={<IconImg src={signalPrivacyIcon} className="size-4" />}
              title="Privacy Features"
              body="How you control visibility. Total control over who sees you. Toggle Incognito mode or adjust your active status straight from your signal to vanish from the radar instantly."
            />
            <SignalOnboardingFeature
              icon={<IconImg src={signalPulseIcon} className="size-4" />}
              title="The Pulse"
              body="Your call to action. Think of the Pulse button as your master ignition. Tapping it activates your signal and pushes your profile live into the network."
            />
            <SignalOnboardingFeature
              icon={<IntentGlyph />}
              title="Intent Settings"
              body="How you declare purpose. Set romantic, professional, social, or balanced intents so matches understand why you're signaling before a conversation starts."
              showDivider={false}
            />
          </div>
        </div>

        <div className="mt-auto flex shrink-0 flex-col items-center gap-[18px] pt-6">
          <p
            id="signal-onboarding-title"
            className="w-full text-center text-[14px] font-medium leading-[21px] text-[#f7f6f2]"
            style={{ fontFamily: FONT }}
          >
            Signal Features
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

function SignalOnboardingFeature({
  icon,
  title,
  body,
  showDivider = true,
}: {
  icon: ReactNode;
  title: string;
  body: string;
  showDivider?: boolean;
}) {
  return (
    <div className="flex w-full shrink-0 flex-col gap-3">
      <div className="flex items-center gap-2">
        <div className="flex size-4 shrink-0 items-center justify-center">{icon}</div>
        <p
          className="min-w-0 text-[15px] font-normal leading-[1.2] text-[#f7f6f2]"
          style={{ fontFamily: FONT }}
        >
          {title}
        </p>
      </div>
      <p
        className="text-[13px] font-light leading-[1.4] text-[rgba(247,246,242,0.6)]"
        style={{ fontFamily: FONT }}
      >
        {body}
      </p>
      {showDivider ? (
        <img
          alt=""
          src={signalDividerIcon}
          className="mt-1 h-px w-[168px] max-w-none object-contain opacity-80"
          draggable={false}
        />
      ) : null}
    </div>
  );
}

function MiniSignalBars() {
  return (
    <div className="flex items-center gap-[2.2px]" aria-hidden>
      <span className="h-[8.2px] w-[4.1px] rounded-[3.5px] bg-[#f7f6f2]" />
      <span className="h-[13.7px] w-[4.4px] rounded-[3.5px] bg-[#f7f6f2]" />
      <span className="h-[8.2px] w-[4.1px] rounded-[3.5px] bg-[#f7f6f2]" />
    </div>
  );
}

function IntentGlyph() {
  return (
    <div className="relative flex h-5 w-[23px] items-center justify-between" aria-hidden>
      <div className="flex h-full flex-col items-start justify-between">
        <IconImg src={radarHeartIcon} className="size-[9px]" />
        <IconImg src={radarLaptopIcon} className="h-[8px] w-[9px]" />
      </div>
      <div className="flex flex-col items-center gap-[1.1px]">
        <span className="size-[2.5px] rounded-full bg-[#f7f6f2]/70" />
        <span className="size-[2.5px] rounded-full bg-[#f7f6f2]/70" />
        <span className="size-[2.5px] rounded-full bg-[#f7f6f2]/70" />
      </div>
      <div className="flex h-full flex-col items-center justify-between">
        <IconImg src={radarYinIcon} className="size-[9px]" />
        <IconImg src={radarFireIcon} className="size-[8px]" />
      </div>
    </div>
  );
}

function OverlayToolButton({
  children,
  ariaLabel,
  onClick,
  size = 46,
  soft = false,
  lit = false,
}: {
  children: ReactNode;
  ariaLabel: string;
  onClick?: () => void;
  size?: number;
  soft?: boolean;
  lit?: boolean;
}) {
  const rimId = `signal-overlay-rim-${ariaLabel.toLowerCase().replace(/\s+/g, "-")}`;
  const mid = size / 2;
  const radius = mid - 1.25;

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className={`crcle-intent-chip relative z-[1] flex shrink-0 items-center justify-center rounded-full p-1${
        soft ? " crcle-intent-chip--soft" : ""
      }${lit ? " is-lit" : ""}`}
      style={{ width: size, height: size }}
    >
      {/* Glass crescent rim — same treatment as Radar intent chips */}
      <svg
        aria-hidden
        viewBox={`0 0 ${size} ${size}`}
        className="pointer-events-none absolute inset-0 z-0 size-full"
      >
        <defs>
          <linearGradient
            id={rimId}
            x1={size * 0.11}
            y1={size * 0.065}
            x2={size * 0.89}
            y2={size * 0.935}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="28%" stopColor="#ffffff" stopOpacity="0.4" />
            <stop offset="55%" stopColor="#ffffff" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.18" />
          </linearGradient>
        </defs>
        <circle
          cx={mid}
          cy={mid}
          r={radius}
          fill="none"
          stroke={`url(#${rimId})`}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <span className="crcle-intent-chip__icon relative z-[1] flex items-center justify-center">
        {children}
      </span>
    </button>
  );
}

/* ——— Location Required (Figma 986:85539) — stage 2 → second signal bar ——— */

function LocationRequiredModal({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: () => void;
}) {
  const [useCurrent, setUseCurrent] = useState(false);
  const [allowVisible, setAllowVisible] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22, ease: EASE }}
      className="absolute inset-0 z-[60] flex items-center justify-center overflow-hidden rounded-[53px] bg-gradient-to-b from-[rgba(0,0,0,0.01)] to-transparent backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="location-required-title"
    >
      <button
        type="button"
        aria-label="Dismiss location modal"
        className="absolute inset-0 cursor-default"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 8 }}
        transition={{ duration: 0.28, ease: EASE }}
        className="relative z-[1] mx-3 flex w-full max-w-[387px] flex-col overflow-hidden rounded-[24px] border border-[rgba(255,255,255,0.2)] bg-[rgba(2,3,29,0.4)] p-px shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] backdrop-blur-[12px]"
      >
        <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.1)] px-3 pb-[13px] pt-3">
          <p
            id="location-required-title"
            className="min-w-0 flex-1 text-center text-[14px] font-medium leading-[1.4] text-white"
            style={{ fontFamily: FONT }}
          >
            Location Required
          </p>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[rgba(255,255,255,0.1)]"
          >
            <IconImg src={locusCloseIcon} className="size-4 brightness-0 invert" />
          </button>
        </div>

        <div className="flex w-full flex-col items-center overflow-hidden p-3">
          <div className="flex w-full flex-col gap-4">
            <p
              className="w-full text-center text-[13px] leading-[1.4] text-[#b1b1bc]"
              style={{ fontFamily: FONT }}
            >
              Set where you&apos;ll be dropping in from.
            </p>

            <div className="relative h-[211px] w-full overflow-hidden rounded-2xl p-2">
              <img
                alt=""
                src={locationMapImg}
                className="absolute inset-0 size-full rounded-2xl object-cover"
                draggable={false}
              />
              <div className="absolute inset-0 rounded-2xl bg-[rgba(2,4,38,0.1)]" />
              <span className="absolute left-[72px] top-[84px] z-[1] flex items-center gap-1 rounded-bl-[4px] rounded-br-[24px] rounded-tl-xl rounded-tr-[24px] bg-[#05f] py-0.5 pl-1.5 pr-2">
                <span className="size-0.5 rounded-full bg-white" />
                <span
                  className="text-[11px] leading-[1.4] text-[#fefefe]"
                  style={{ fontFamily: FONT }}
                >
                  Holland Park
                </span>
              </span>
              <img
                alt=""
                src={mapPinPreciseIcon}
                className="absolute left-[72px] top-[107px] z-[1] size-2.5"
                draggable={false}
              />
            </div>

            <div className="flex w-full flex-col gap-2">
              <button
                type="button"
                onClick={() => setUseCurrent((v) => !v)}
                aria-pressed={useCurrent}
                className="flex w-full items-center justify-between rounded-[24px] border border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.1)] py-[9px] pl-[13px] pr-[11px]"
              >
                <span className="flex min-w-0 flex-1 items-center gap-3">
                  <IconImg src={locusSendLightIcon} className="size-4" />
                  <span
                    className="min-w-0 flex-1 text-left text-[16px] leading-[1.4] text-white"
                    style={{ fontFamily: FONT }}
                  >
                    Use current location
                  </span>
                </span>
                <span
                  className={`relative flex h-6 w-[46px] shrink-0 items-center rounded-full p-0.5 transition-colors ${
                    useCurrent ? "justify-end bg-[#0fc950]/80" : "justify-start bg-[rgba(255,255,255,0.2)]"
                  }`}
                  aria-hidden
                >
                  <span className="size-5 rounded-full bg-white" />
                </span>
              </button>

              <div className="flex w-full gap-2">
                <div className="flex min-w-0 flex-1 items-center gap-2 rounded-bl-[24px] rounded-br-xl rounded-tl-[24px] rounded-tr-xl border border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.2)] py-[9px] pl-[13px] pr-[11px]">
                  <IconImg src={locusPinIcon} className="size-[14px] brightness-0 invert opacity-70" />
                  <span
                    className="min-w-0 flex-1 text-[13px] leading-[1.4] text-[rgba(255,255,255,0.5)]"
                    style={{ fontFamily: FONT }}
                  >
                    London
                  </span>
                </div>
                <div className="flex shrink-0 items-center gap-2 rounded-bl-xl rounded-br-[24px] rounded-tl-xl rounded-tr-[24px] border border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.2)] py-[9px] pl-[13px] pr-[11px]">
                  <IconImg src={radarIcon} className="size-[14px] brightness-0 invert opacity-70" />
                  <span
                    className="text-[13px] leading-[1.4] text-[rgba(255,255,255,0.5)]"
                    style={{ fontFamily: FONT }}
                  >
                    20 Miles
                  </span>
                  <IconImg
                    src={arrowChevronIcon}
                    className="size-3 rotate-90 brightness-0 invert opacity-60"
                  />
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setAllowVisible((v) => !v)}
              aria-pressed={allowVisible}
              className="flex w-full items-center gap-2"
            >
              <span
                className={`flex size-4 shrink-0 items-center justify-center rounded-full border ${
                  allowVisible
                    ? "border-white bg-white"
                    : "border-[rgba(255,255,255,0.5)] bg-transparent"
                }`}
                aria-hidden
              >
                {allowVisible ? (
                  <span className="size-1.5 rounded-full bg-[#02031d]" />
                ) : null}
              </span>
              <span
                className="min-w-0 flex-1 text-left text-[13px] leading-[1.4] text-white"
                style={{ fontFamily: FONT }}
              >
                Allow users to see your location
              </span>
            </button>

            <div className="flex w-full flex-col gap-2">
              <div className="flex w-full flex-col items-center">
                <button
                  type="button"
                  onClick={onSave}
                  className="rounded-full bg-[#020426] px-[52px] py-2"
                >
                  <span
                    className="text-[15px] leading-[21px] text-[#f7f6f2]"
                    style={{ fontFamily: FONT }}
                  >
                    Save
                  </span>
                </button>
              </div>
              <p
                className="w-full text-center text-[11px] leading-[1.4] text-[#b1b1bc]"
                style={{ fontFamily: FONT }}
              >
                Enable location to go live
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function FooterSignal({
  tone,
  activeBars = 0,
  isLight = false,
}: {
  tone: "neutral" | "live";
  activeBars?: number;
  isLight?: boolean;
}) {
  return (
    <div className="flex w-full flex-col items-center gap-4 px-3">
      <SignalBars tone={tone} activeBars={activeBars} isLight={isLight} />
      <p
        className="max-w-[392px] text-center text-[11px] leading-[1.4] text-[#b1b1bc]"
        style={{ fontFamily: FONT }}
      >
        {tone === "live" || !isLight ? (
          <>Your signal will connect you with compatible users nearby when your drop goes live.</>
        ) : (
          <>
            Your tuned signal will broadcast to compatible users.
            <br />
            The algorithm calibrates high-fidelity matches based on your frequency
          </>
        )}
      </p>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="relative z-20 mx-auto flex h-[62px] w-[84%] shrink-0 items-end justify-between px-2 pb-[10px] text-[var(--crcle-fg)]">
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

/** Figma Frame 2147225187 — Default → Variant7 height cycle (middle stays full). */
const SIGNAL_FRAMES: readonly [number, number, number][] = [
  [18.4, 30.6, 18.4],
  [10, 30.6, 18.4],
  [18.4, 30.6, 11],
  [15, 30.6, 18.4],
  [18.4, 30.6, 8],
  [7, 30.6, 15],
  [14, 30.6, 15],
];
const SIGNAL_WIDTHS = [9, 9.2, 9] as const;
/** 200ms hold per Figma variant + soft morph into the next */
const SIGNAL_HOLD_S = 0.2;
const SIGNAL_MOVE_S = 0.55;
const SIGNAL_STEP_S = SIGNAL_HOLD_S + SIGNAL_MOVE_S;

function buildSignalKeyframes(barIndex: number) {
  const heights: number[] = [];
  const times: number[] = [];
  const n = SIGNAL_FRAMES.length;
  const total = n * SIGNAL_STEP_S;

  for (let i = 0; i < n; i++) {
    const holdStart = (i * SIGNAL_STEP_S) / total;
    const holdEnd = (i * SIGNAL_STEP_S + SIGNAL_HOLD_S) / total;
    const h = SIGNAL_FRAMES[i][barIndex];
    heights.push(h);
    times.push(holdStart);
    heights.push(h);
    times.push(holdEnd);
  }

  // Close the loop gently back to the first frame
  heights.push(SIGNAL_FRAMES[0][barIndex]);
  times.push(1);

  return { heights, times, duration: total };
}

function SignalBars({
  tone = "neutral",
  activeBars = 0,
  isLight = false,
}: {
  tone?: "neutral" | "live";
  activeBars?: number;
  isLight?: boolean;
}) {
  return (
    <div className="flex h-[30.6px] items-center gap-[4.9px]" aria-hidden>
      {SIGNAL_WIDTHS.map((width, i) => {
        const { heights, times, duration } = buildSignalKeyframes(i);
        const lit = i < activeBars;
        const barClass = lit
          ? "bg-[#0fc950]"
          : tone === "live"
            ? "bg-[rgba(15,201,80,0.2)]"
            : isLight
              ? "bg-black/20"
              : "bg-[rgba(247,246,242,0.3)]";
        return (
          <motion.span
            key={`${tone}-${activeBars}-${isLight}-${i}`}
            className={`block shrink-0 rounded-[8px] ${barClass}`}
            style={{ width }}
            initial={{ height: heights[0] }}
            animate={{ height: heights }}
            transition={{
              duration,
              repeat: Infinity,
              ease: "easeInOut",
              times,
            }}
          />
        );
      })}
    </div>
  );
}

function IconImg({ src, className = "size-6" }: { src: string; className?: string }) {
  return (
    <div className={`relative shrink-0 overflow-hidden ${className}`}>
      <img alt="" src={src} className="absolute inset-0 size-full max-w-none object-contain" draggable={false} />
    </div>
  );
}
