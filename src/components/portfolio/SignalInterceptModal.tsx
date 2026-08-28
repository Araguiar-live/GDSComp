import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { useCallback, useState } from "react";
import arrowChevronIcon from "@/assets/crcle/arrow-chevron.svg";
import arrowRightIcon from "@/assets/crcle/arrow-right.svg";
import closeXIcon from "@/assets/crcle/close-x.svg";
import dragHandleModal from "@/assets/crcle/drag-handle-modal.svg";
import heartModalIcon from "@/assets/crcle/heart-modal.svg";
import linkInnerIcon from "@/assets/crcle/link-inner.svg";
import mapPinIcon from "@/assets/crcle/map-pin.svg";
import raindropIcon from "@/assets/crcle/raindrop.svg";
import securitySafeIcon from "@/assets/crcle/security-safe.svg";
import shareIcon from "@/assets/crcle/share.svg";
import shareInnerIcon from "@/assets/crcle/share-inner.svg";
import fireIcon from "@/assets/crcle/fire.svg";
import fireInnerIcon from "@/assets/crcle/fire-inner.svg";
import brainIcon from "@/assets/crcle/signal/brain.svg";
import laptopStrokeIcon from "@/assets/crcle/signal/laptop-stroke.svg";
import lightbulbIcon from "@/assets/crcle/signal/lightbulb.svg";
import signalBg from "@/assets/crcle/signal-bg.png";
import unlockIcon from "@/assets/crcle/unlock.svg";

const FONT = "Montserrat, ui-sans-serif, system-ui, sans-serif";
const SPRING = { type: "spring", stiffness: 380, damping: 22, mass: 0.8 } as const;
const DRAG_THRESHOLD = 48;

export type UserProfile = {
  id: string;
  name: string;
  username: string;
  relationshipStatus: string;
  orientation: string;
  distance: string;
  age: number;
  photoUrl: string;
  matchType: string;
  matchBio: string;
  isVerified: boolean;
};

type SignalVariant = "purpose" | "soul" | "love";

/** Figma 452:81989 Default → Variant2 → Variant3 */
const VARIANT_ORDER: SignalVariant[] = ["purpose", "soul", "love"];

type SignalInterceptModalProps = {
  user: UserProfile;
  isLight?: boolean;
  onAccept: (userId: string) => void;
  onDecline: (userId: string) => void;
};

/**
 * Signal Intercepted sheet — Figma dark (420) + light (452:81989).
 */
export function SignalInterceptModal({
  user,
  isLight = false,
  onAccept,
  onDecline,
}: SignalInterceptModalProps) {
  const handle = user.username.startsWith("@") ? user.username : `@${user.username}`;
  const [variantIndex, setVariantIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const variant = VARIANT_ORDER[variantIndex];

  const goTo = useCallback((nextIndex: number, dir: number) => {
    const clamped = (nextIndex + VARIANT_ORDER.length) % VARIANT_ORDER.length;
    setDirection(dir);
    setVariantIndex(clamped);
  }, []);

  const goPrev = useCallback(() => goTo(variantIndex - 1, -1), [goTo, variantIndex]);
  const goNext = useCallback(() => goTo(variantIndex + 1, 1), [goTo, variantIndex]);

  const onPillDragEnd = (_: unknown, info: PanInfo) => {
    const { offset, velocity } = info;
    if (offset.x < -DRAG_THRESHOLD || velocity.x < -200) goNext();
    else if (offset.x > DRAG_THRESHOLD || velocity.x > 200) goPrev();
  };

  const match = matchCopyFor(variant, user);
  const accentIcon =
    variant === "love" ? heartModalIcon : variant === "purpose" ? fireIcon : laptopStrokeIcon;

  const ink = isLight ? "text-[#02031d]" : "text-white";
  const inkMuted = isLight ? "text-[rgba(2,3,29,0.6)]" : "text-[rgba(247,246,242,0.6)]";
  const inkFaint = isLight ? "text-[rgba(2,3,29,0.4)]" : "text-[rgba(247,246,242,0.4)]";
  const iconInk = isLight ? "brightness-0" : "";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pointer-events-auto absolute inset-0 z-[60] flex items-end justify-center overflow-hidden rounded-[56px]"
      style={{ clipPath: "inset(0 round 56px)" }}
    >
      {/* Scrim — full wireframe; 8px blur; light gets a blue wash over Messages */}
      <motion.button
        type="button"
        aria-label="Dismiss"
        className={`absolute inset-0 ${
          isLight
            ? "bg-[rgba(2,3,29,0.28)] backdrop-blur-[8px]"
            : "bg-black/50 backdrop-blur-[8px]"
        }`}
        onClick={() => onDecline(user.id)}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={SPRING}
        className="relative mx-[3px] mb-[3px] flex max-h-[calc(100%-3px)] w-[calc(100%-6px)] flex-col items-start overflow-hidden rounded-t-[16px] rounded-b-[53px]"
        style={{
          height: "min(632px, calc(100% - 3px))",
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="signal-intercept-title"
      >
        {/* Soft blurred portrait wash (light wireframe 452:81989) */}
        {isLight ? (
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-t-[16px] rounded-b-[53px]" aria-hidden>
            <img
              alt=""
              src={user.photoUrl}
              className="absolute left-1/2 top-1/2 h-[140%] w-[140%] max-w-none -translate-x-1/2 -translate-y-1/2 scale-110 object-cover"
              style={{ filter: "blur(48px) saturate(0.85) hue-rotate(-6deg)" }}
            />
            {/* Warm cream wash — cuts blue cast ~15% */}
            <div className="absolute inset-0 bg-[rgba(247,246,242,0.55)]" />
          </div>
        ) : (
          <img
            alt=""
            src={signalBg}
            className="pointer-events-none absolute inset-0 size-full rounded-t-[16px] rounded-b-[53px] object-cover"
          />
        )}

        {/* Header — Figma light: solid cream; dark: glass gradient */}
        <div
          className={`relative z-[1] flex w-full shrink-0 items-start gap-[25px] border-l border-r border-t px-3 pb-3 pt-4 rounded-t-[16px] ${
            isLight
              ? "border-[rgba(2,3,29,0.1)] bg-[rgba(247,246,242,0.65)] backdrop-blur-[12px]"
              : "border-[#f7f6f2]"
          }`}
          style={
            isLight
              ? undefined
              : {
                  backgroundImage:
                    "linear-gradient(90deg, rgba(247, 246, 242, 0.1) 0%, rgba(247, 246, 242, 0.1) 100%), linear-gradient(90deg, rgba(1, 2, 17, 0.8) 0%, rgba(1, 2, 17, 0.8) 100%)",
                }
          }
        >
          <div className="absolute left-1/2 top-[5px] h-0 w-[56.5px] -translate-x-1/2">
            <img
              alt=""
              src={dragHandleModal}
              className={`block size-full max-w-none ${isLight ? "opacity-40 brightness-0" : ""}`}
            />
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <p
              id="signal-intercept-title"
              className={`text-[16px] font-medium leading-none ${ink}`}
              style={{ fontFamily: FONT }}
            >
              Signal Intercepted
            </p>
            <p
              className={`text-[12px] font-normal leading-none tracking-[-0.15px] ${inkMuted}`}
              style={{ fontFamily: FONT }}
            >
              Review their frequency to start the conversation
            </p>
          </div>

          <motion.button
            type="button"
            onClick={() => onDecline(user.id)}
            className={`flex shrink-0 items-center justify-center rounded-full p-1 ${
              isLight ? "bg-[rgba(2,3,29,0.05)]" : "bg-[rgba(2,3,29,0.4)]"
            }`}
            aria-label="Close"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
          >
            <IconImg src={closeXIcon} className={`size-4 ${iconInk}`} />
          </motion.button>
        </div>

        {/* Body — frosted glass over blurred portrait */}
        <div
          className={`relative z-[1] flex min-h-0 w-full flex-1 flex-col items-center gap-6 overflow-hidden border-t px-3 pb-4 pt-4 rounded-b-[53px] ${
            isLight
              ? "border-[rgba(2,3,29,0.1)] bg-[rgba(247,246,242,0.45)] backdrop-blur-[18px]"
              : "border-[rgba(247,246,242,0.1)] bg-[rgba(2,2,23,0.8)] gap-4 backdrop-blur-[18px]"
          }`}
        >
          {/* Handle + raindrop */}
          <div className="flex w-full shrink-0 items-center justify-between">
            <div
              className={`flex items-center gap-2.5 rounded-[64px] p-2.5 backdrop-blur-[6px] ${
                isLight ? "bg-[#030426]" : "bg-[rgba(247,246,242,0.2)]"
              }`}
            >
              <span
                className={`min-w-0 truncate text-[11px] leading-[1.4] ${isLight ? "text-white" : "text-white"}`}
                style={{ fontFamily: FONT }}
                title={handle}
              >
                {handle}
              </span>
              <div className="relative size-3 shrink-0 overflow-hidden">
                <IconImg src={shareIcon} className="size-3" />
                <div className="absolute inset-[8.33%_12.5%_8.67%_12.5%]">
                  <IconImg src={shareInnerIcon} className="size-full" />
                </div>
              </div>
            </div>
            <IconImg src={raindropIcon} className={`size-[22px] shrink-0 ${iconInk}`} />
          </div>

          {/* Name row */}
          <div className="flex h-[23px] w-full shrink-0 items-center justify-between">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={variant}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={SPRING}
                className={`relative size-3.5 shrink-0 overflow-hidden ${isLight ? "" : "opacity-60"}`}
              >
                {variant === "purpose" ? (
                  <>
                    <IconImg src={fireIcon} className={`size-3.5 ${iconInk}`} />
                    <div className="absolute inset-[6%_17%_8%_17%]">
                      <IconImg src={fireInnerIcon} className={`size-full ${iconInk}`} />
                    </div>
                  </>
                ) : (
                  <IconImg src={accentIcon} className={`size-3.5 ${iconInk}`} />
                )}
              </motion.div>
            </AnimatePresence>
            <div className="flex min-w-0 flex-1 items-center justify-center">
              <p
                className={`truncate text-center text-[20px] font-medium leading-[1.2] ${
                  isLight ? "text-[#02031d]" : "text-[#f7f6f2]"
                }`}
                style={{ fontFamily: FONT }}
                title={user.name}
              >
                {user.name}
              </p>
            </div>
            <span className="size-3.5 shrink-0" aria-hidden />
          </div>

          {/* Swipeable category pills */}
          <div className="flex h-[44px] w-full shrink-0 items-center justify-between gap-2 px-4">
            <motion.button
              type="button"
              aria-label="Previous category"
              onClick={goPrev}
              className="relative flex h-8 w-8 shrink-0 items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
            >
              <div className={`relative size-6 -scale-y-100 rotate-180 overflow-hidden ${iconInk}`}>
                <IconImg src={arrowRightIcon} className="size-6" />
                <div className="absolute inset-[29.17%_37.5%]">
                  <IconImg src={arrowChevronIcon} className="size-full" />
                </div>
              </div>
            </motion.button>

            <motion.div
              className="relative flex h-full min-w-0 flex-1 touch-pan-y items-center justify-center gap-2 overflow-hidden"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragEnd={onPillDragEnd}
            >
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.div
                  key={variant}
                  custom={direction}
                  variants={pillSlideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={SPRING}
                  className="absolute inset-x-0 flex min-w-0 items-center justify-center"
                >
                  <CategoryPills variant={variant} user={user} isLight={isLight} />
                </motion.div>
              </AnimatePresence>
            </motion.div>

            <motion.button
              type="button"
              aria-label="Next category"
              onClick={goNext}
              className="relative flex h-8 w-8 shrink-0 items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
            >
              <div className={`relative size-6 overflow-hidden ${iconInk}`}>
                <IconImg src={arrowRightIcon} className="size-6" />
                <div className="absolute inset-[29.17%_37.5%]">
                  <IconImg src={arrowChevronIcon} className="size-full" />
                </div>
              </div>
            </motion.button>
          </div>

          {/* Portrait card — Figma 420:413549 */}
          <div className="relative flex min-h-0 w-full flex-1 flex-col justify-between overflow-hidden rounded-[24px] p-3">
            <img
              alt=""
              src={user.photoUrl}
              className="pointer-events-none absolute inset-0 size-full rounded-[24px] object-cover"
            />

            <div className="relative z-[1] flex w-full items-start justify-between">
              <div className="flex shrink-0 items-center gap-2 rounded-[120px] bg-[rgba(247,246,242,0.1)] p-1">
                <div className="flex h-6 shrink-0 items-center justify-center gap-1 rounded-[120px] border border-[#f7f6f2] px-2.5 py-1.5">
                  <div className="relative size-2.5 shrink-0" aria-hidden>
                    <div className="absolute inset-[4.17%_25%]">
                      <img
                        alt=""
                        src={mapPinIcon}
                        className="absolute inset-0 size-full max-w-none"
                        draggable={false}
                      />
                    </div>
                  </div>
                  <span
                    className="shrink-0 whitespace-nowrap text-center text-[13px] font-normal leading-[1.4] text-[#f7f6f2]"
                    style={{ fontFamily: FONT }}
                  >
                    {user.distance}
                  </span>
                </div>
                <div
                  className={`flex h-6 shrink-0 items-center justify-center rounded-[120px] px-3 py-1.5 ${
                    isLight ? "bg-[#02031d]" : "bg-[#f7f6f2]"
                  }`}
                >
                  <span
                    className={`shrink-0 whitespace-nowrap text-center text-[13px] font-normal leading-[1.4] ${
                      isLight ? "text-[#f7f6f2]" : "text-black"
                    }`}
                    style={{ fontFamily: FONT }}
                  >
                    {user.age} Yrs
                  </span>
                </div>
              </div>

              <motion.button
                type="button"
                className={`flex size-8 shrink-0 items-center justify-center rounded-full p-1 ${
                  isLight ? "bg-[#02031d]" : "bg-[#f7f6f2]"
                }`}
                aria-label="Open links"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.92 }}
              >
                <div className="relative size-4 shrink-0 overflow-hidden rounded-[2px]">
                  <div className="absolute inset-[29.17%_8.33%]">
                    <img
                      alt=""
                      src={linkInnerIcon}
                      className={`absolute inset-0 size-full max-w-none object-contain ${
                        isLight ? "" : "brightness-0"
                      }`}
                      draggable={false}
                    />
                  </div>
                </div>
              </motion.button>
            </div>

            {/* Match panel — outer 24px; Profile Verified inner 20px (4px smaller) */}
            <div className="relative z-[1] flex w-full shrink-0 items-end">
              <div className="flex w-full flex-col items-center gap-2 overflow-hidden rounded-[24px] bg-[rgba(2,3,29,0.2)] p-2 backdrop-blur-[8px]">
                <AnimatePresence mode="wait" custom={direction} initial={false}>
                  <motion.div
                    key={variant}
                    custom={direction}
                    variants={fadeSlideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={SPRING}
                    className="flex w-full flex-col items-center gap-1"
                  >
                    <div className="flex w-full items-center justify-center">
                      <div className="flex max-w-full items-center gap-2">
                        <div className="flex shrink-0 items-center gap-[2.6px]" aria-hidden>
                          <span className="h-[10px] w-[5px] rounded-full bg-[#f7f6f2]" />
                          <span className="h-[17px] w-[5px] rounded-full bg-[#f7f6f2]" />
                          <span className="h-[10px] w-[5px] rounded-full bg-[#f7f6f2]" />
                        </div>
                        <p
                          className="min-w-0 truncate text-[16px] font-medium leading-[1.2] text-white"
                          style={{ fontFamily: FONT }}
                        >
                          {match.matchType}
                        </p>
                      </div>
                    </div>
                    <div className="flex w-full flex-col items-center gap-1 text-center text-white">
                      <p className="line-clamp-2 w-full text-[11px] leading-[1.4]" style={{ fontFamily: FONT }}>
                        {match.matchBio}
                      </p>
                      <p className="text-[16px] font-medium leading-[1.4]" style={{ fontFamily: FONT }}>
                        60%
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {user.isVerified ? (
                  <div className="flex w-full flex-col items-center justify-center gap-1 rounded-[20px] bg-[rgba(247,246,242,0.2)] p-2 backdrop-blur-[8px]">
                    <IconImg src={securitySafeIcon} className="size-4" />
                    <p
                      className="text-center text-[12px] font-medium leading-[1.2] text-white"
                      style={{ fontFamily: FONT }}
                    >
                      Profile Verified
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex w-full shrink-0 flex-col items-center gap-2">
            <p
              className={`w-full text-center text-[9px] leading-[1.1] tracking-[-0.15px] ${inkFaint}`}
              style={{ fontFamily: FONT }}
            >
              Your data is encrypted and used only to identify verification
            </p>
            <div className="flex w-full items-center justify-center gap-4">
              <motion.button
                type="button"
                onClick={() => onAccept(user.id)}
                className={`rounded-full px-9 py-3 text-[16px] font-medium leading-[1.2] tracking-[-0.44px] whitespace-nowrap ${
                  isLight
                    ? "bg-[#02031d] text-[#f7f6f2]"
                    : "bg-[#f7f6f2] text-[#02031d]"
                }`}
                style={{ fontFamily: FONT }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.92 }}
              >
                Accept
              </motion.button>
              <motion.button
                type="button"
                onClick={() => onDecline(user.id)}
                className={`rounded-full py-3 text-[16px] font-medium leading-[1.2] tracking-[-0.44px] whitespace-nowrap ${
                  isLight ? "text-[rgba(2,3,29,0.8)]" : "text-[#f7f6f2]"
                }`}
                style={{ fontFamily: FONT }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.92 }}
              >
                Decline
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function matchCopyFor(variant: SignalVariant, user: UserProfile) {
  switch (variant) {
    case "love":
      return {
        matchType: "Signal Match",
        matchBio: "Looking for high romantic connections",
      };
    case "purpose":
      return {
        matchType: "Purpose Match",
        matchBio:
          user.matchType.toLowerCase().includes("purpose")
            ? user.matchBio
            : "Building intentional communities and late-night design critiques",
      };
    case "soul":
      return {
        matchType: "Soul Match",
        matchBio: "Seeking deeper resonance beyond first impressions",
      };
  }
}

function CategoryPills({
  variant,
  user,
  isLight,
}: {
  variant: SignalVariant;
  user: UserProfile;
  isLight: boolean;
}) {
  if (variant === "purpose") {
    return (
      <motion.div
        className={`flex max-w-full min-w-0 items-center gap-2 rounded-[120px] p-1.5 ${
          isLight ? "bg-[rgba(247,246,242,0.2)]" : "bg-[rgba(2,3,29,0.1)]"
        }`}
        initial="hidden"
        animate="show"
        variants={staggerContainer}
      >
        <motion.div
          variants={staggerPill}
          className={`flex shrink-0 items-center gap-1 rounded-[120px] border px-2 py-1 ${
            isLight ? "border-[#02031d]" : "border-[#f7f6f2]"
          }`}
        >
          <IconImg src={lightbulbIcon} className={`size-3.5 shrink-0 ${isLight ? "brightness-0" : ""}`} />
          <span
            className={`text-[16px] leading-[1.4] ${isLight ? "text-[#02031d]" : "text-[#f7f6f2]"}`}
            style={{ fontFamily: FONT }}
          >
            Learn
          </span>
        </motion.div>
        <motion.div
          variants={staggerPill}
          className={`flex shrink-0 items-center gap-1 rounded-[120px] border px-2 py-1 ${
            isLight ? "border-[#02031d]" : "border-[#f7f6f2]"
          }`}
        >
          <IconImg src={brainIcon} className={`h-3 w-3.5 shrink-0 ${isLight ? "brightness-0" : ""}`} />
          <span
            className={`text-[16px] leading-[1.4] ${isLight ? "text-[#02031d]" : "text-[#f7f6f2]"}`}
            style={{ fontFamily: FONT }}
          >
            Mind
          </span>
        </motion.div>
      </motion.div>
    );
  }

  if (variant === "soul") {
    return (
      <motion.div
        className="flex max-w-full min-w-0 items-center"
        initial="hidden"
        animate="show"
        variants={staggerContainer}
      >
        <motion.div
          variants={staggerPill}
          className={`flex max-w-full min-w-0 items-center gap-3 rounded-[120px] py-1.5 pl-4 pr-1.5 ${
            isLight ? "bg-[rgba(247,246,242,0.4)]" : "bg-[rgba(247,246,242,0.4)]"
          }`}
        >
          <span
            className={`min-w-0 truncate text-[13px] leading-[1.4] ${
              isLight ? "text-[#020426]" : "text-[#f7f6f2]"
            }`}
            style={{ fontFamily: FONT }}
            title="Product Designer@Circle"
          >
            Product Designer@Circle
          </span>
          <span
            className={`shrink-0 rounded-[120px] px-2 py-1 text-[13px] leading-[1.4] whitespace-nowrap ${
              isLight ? "bg-[#020426] text-[#f7f6f2]" : "bg-[#f7f6f2] text-[#020426]"
            }`}
            style={{ fontFamily: FONT }}
          >
            Looking
          </span>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`flex max-w-full min-w-0 items-center gap-3 rounded-[120px] p-1.5 ${
        isLight ? "bg-[rgba(2,3,29,0.04)]" : "bg-[rgba(2,3,29,0.1)]"
      }`}
      initial="hidden"
      animate="show"
      variants={staggerContainer}
    >
      {/* Figma 380:134468 — unlock + label side-by-side (not absolute) */}
      <motion.div
        variants={staggerPill}
        className={`box-border flex h-9 shrink-0 items-center justify-center gap-1 rounded-[120px] border border-transparent px-2 py-1.5 ${
          isLight ? "bg-[#02031d]" : "bg-[#f7f6f2]"
        }`}
      >
        <IconImg
          src={unlockIcon}
          className={`size-4 shrink-0 ${isLight ? "brightness-0 invert" : ""}`}
        />
        <span
          className={`whitespace-nowrap text-center text-[16px] leading-[1.4] ${
            isLight ? "text-white" : "text-[#030426]"
          }`}
          style={{ fontFamily: FONT }}
        >
          {user.relationshipStatus}
        </span>
      </motion.div>
      <motion.div
        variants={staggerPill}
        className={`box-border flex h-9 shrink-0 items-center justify-center rounded-[120px] border px-3 py-1.5 ${
          isLight ? "border-[rgba(2,3,29,0.25)]" : "border-[#f7f6f2]"
        }`}
      >
        <span
          className={`whitespace-nowrap text-center text-[16px] leading-[1.4] ${
            isLight ? "text-[#02031d]" : "text-white"
          }`}
          style={{ fontFamily: FONT }}
        >
          {user.orientation}
        </span>
      </motion.div>
    </motion.div>
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

const fadeSlideVariants = {
  enter: (dir: number) => ({
    y: dir >= 0 ? 10 : -10,
    opacity: 0,
  }),
  center: { y: 0, opacity: 1 },
  exit: (dir: number) => ({
    y: dir >= 0 ? -10 : 10,
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
