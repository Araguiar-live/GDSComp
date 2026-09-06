import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { useCallback, useState } from "react";
import arrowRightIcon from "@/assets/crcle/area/arrow-right.svg";
import emmaPortrait from "@/assets/crcle/area/emma-portrait.png";
import handleIcon from "@/assets/crcle/area/handle.svg";
import heartIcon from "@/assets/crcle/area/heart.svg";
import linkIcon from "@/assets/crcle/area/link.svg";
import raindropIcon from "@/assets/crcle/area/raindrop.svg";
import unlockIcon from "@/assets/crcle/area/unlock.svg";
import arrowChevronIcon from "@/assets/crcle/arrow-chevron.svg";
import batteryIcon from "@/assets/crcle/battery.svg";
import cellularIcon from "@/assets/crcle/cellular.svg";
import crcleLogo from "@/assets/crcle/crcle-logo.svg";
import areaPinIcon from "@/assets/crcle/mood/area-pin.svg";
import brainIcon from "@/assets/crcle/signal/brain.svg";
import fireIcon from "@/assets/crcle/signal/fire.svg";
import lightbulbIcon from "@/assets/crcle/signal/lightbulb.svg";
import laptopStrokeIcon from "@/assets/crcle/signal/laptop-stroke.svg";
import shareIcon from "@/assets/crcle/share.svg";
import wifiIcon from "@/assets/crcle/wifi.svg";

const FONT = "Montserrat, ui-sans-serif, system-ui, sans-serif";
const EASE = [0.22, 1, 0.36, 1] as const;
const SWIPE_SPRING = { type: "spring", stiffness: 380, damping: 22, mass: 0.8 } as const;
const DRAG_THRESHOLD = 48;

type NearbyVariant = "love" | "purpose" | "soul";
const VARIANT_ORDER: NearbyVariant[] = ["love", "purpose", "soul"];

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

type AreaPhase = "screen" | "drawer";

/** Figma 1142:34808 / 1142:34923 (dark) → 1142:33486 (light). */
export function CrcleInTheAreaInbox({
  phase,
  onExpand,
  onCollapse,
  onConnect,
  onMarkRead,
}: {
  phase: AreaPhase;
  onExpand: () => void;
  onCollapse: () => void;
  onConnect: () => void;
  onMarkRead: () => void;
}) {
  const expanded = phase === "drawer";

  return (
    <div
      className="pointer-events-auto absolute inset-x-0 top-0 z-[35] flex flex-col"
      role="dialog"
      aria-label="In The Area"
    >
      <svg
        aria-hidden
        width="0"
        height="0"
        className="pointer-events-none absolute h-0 w-0 overflow-visible"
      >
        <filter
          id="crcle-nearby-glass"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012 0.02"
            numOctaves="2"
            seed="4"
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="10" result="lensMap" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="lensMap"
            scale="28"
            xChannelSelector="R"
            yChannelSelector="G"
            result="refract"
          />
          <feOffset in="refract" dx="-2.6" dy="0" result="rOff" />
          <feColorMatrix
            in="rOff"
            type="matrix"
            values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
            result="red"
          />
          <feOffset in="refract" dx="0" dy="0.4" result="gOff" />
          <feColorMatrix
            in="gOff"
            type="matrix"
            values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"
            result="green"
          />
          <feOffset in="refract" dx="2.6" dy="0" result="bOff" />
          <feColorMatrix
            in="bOff"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
            result="blue"
          />
          <feBlend in="red" in2="green" mode="screen" result="rg" />
          <feBlend in="rg" in2="blue" mode="screen" />
        </filter>
      </svg>
      <div className="flex flex-col items-center bg-[#02031d] [.crcle-phone--light_&]:bg-[#fdfcfb]">
        <div className="mx-auto flex h-[62px] w-[84%] items-end justify-between px-2 pb-[10px] text-[#f7f6f2] [.crcle-phone--light_&]:text-black">
          <span
            className="text-[17px] font-semibold leading-[22px]"
            style={{ fontFamily: "SF Pro, system-ui, -apple-system, sans-serif" }}
          >
            9:41
          </span>
          <div className="crcle-theme-icon flex items-center gap-[7px] pb-0.5">
            <IconBox src={cellularIcon} className="h-[12.226px] w-[19.2px]" />
            <IconBox src={wifiIcon} className="h-[12.328px] w-[17.142px]" />
            <IconBox src={batteryIcon} className="h-[13px] w-[27.328px]" />
          </div>
        </div>
        <IconBox
          src={crcleLogo}
          className="crcle-theme-icon mb-[12px] h-[9px] w-[26px] [.crcle-phone--light_&]:opacity-40"
        />
      </div>

      <div className="crcle-area-inbox-glass flex flex-col items-center gap-4 overflow-hidden rounded-bl-[28px] rounded-br-[28px] border-x border-b border-[rgba(255,255,255,0.15)] border-t-0 px-[13px] pb-3 pt-4">
        <div
          aria-hidden
          className="crcle-area-inbox-backdrop pointer-events-none absolute inset-0 z-0 rounded-[inherit]"
        />
        <div
          aria-hidden
          className="dock-glass-splay pointer-events-none absolute inset-0 z-0 rounded-[inherit] bg-gradient-to-b from-white/20 via-white/[0.08] to-white/[0.05]"
        />
        <div
          aria-hidden
          className="crcle-area-inbox-bottom-frost pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[140px] rounded-b-[inherit]"
        />
        <div className="dock-glass-lens z-0 opacity-30" aria-hidden />
        <button
          type="button"
          onClick={() => (expanded ? onCollapse() : onExpand())}
          className="flex w-full items-center gap-3"
          aria-expanded={expanded}
        >
          <span className="flex size-5 shrink-0 items-center justify-center rounded-[64px] border border-[rgba(0,0,0,0.25)] bg-[rgba(17,223,89,0.8)] p-1">
            <span className="relative h-3 w-[7px] overflow-hidden">
              <img alt="" src={areaPinIcon} className="absolute inset-0 size-full object-contain" />
            </span>
          </span>
          <p
            className="min-w-0 flex-1 text-center text-[19px] font-medium leading-[1.4] text-[#f7f6f2] [.crcle-phone--light_&]:text-[#030426]"
            style={{ fontFamily: FONT }}
          >
            In The Area
          </p>
          <span className="size-5 shrink-0" aria-hidden />
        </button>

        <AnimatePresence initial={false}>
          {expanded ? (
            <motion.div
              key="drawer"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.32, ease: EASE }}
              className="w-full overflow-hidden"
            >
              <div className="flex w-full flex-col items-center gap-4">
                <FeaturedNearbyCard onConnect={onConnect} />
                <CompactNearbyRow onConnect={onConnect} />
                <button
                  type="button"
                  onClick={onMarkRead}
                  className="w-full rounded-[36px] border border-[#f7f6f2] p-3 text-center text-[14px] leading-[21px] text-[#f7f6f2] transition hover:bg-white/5 [.crcle-phone--light_&]:border-black [.crcle-phone--light_&]:bg-[rgba(2,3,29,0.1)] [.crcle-phone--light_&]:text-[#030426] [.crcle-phone--light_&]:hover:bg-[rgba(2,3,29,0.16)]"
                  style={{ fontFamily: FONT }}
                >
                  Mark as read
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="peek"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              <CompactNearbyRow onConnect={onConnect} />
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          aria-label={expanded ? "Collapse In The Area" : "Expand In The Area"}
          onClick={() => (expanded ? onCollapse() : onExpand())}
          className="flex h-3 w-9 items-center justify-center"
        >
          <img alt="" src={handleIcon} className="h-[3px] w-[36px] max-w-none object-contain" />
        </button>
      </div>
    </div>
  );
}

function FeaturedNearbyCard({ onConnect }: { onConnect: () => void }) {
  const [variantIndex, setVariantIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const variant = VARIANT_ORDER[variantIndex];
  const accentIcon =
    variant === "love" ? heartIcon : variant === "purpose" ? fireIcon : laptopStrokeIcon;

  const goTo = useCallback((nextIndex: number, dir: number) => {
    setDirection(dir);
    setVariantIndex((nextIndex + VARIANT_ORDER.length) % VARIANT_ORDER.length);
  }, []);

  const goPrev = useCallback(() => goTo(variantIndex - 1, -1), [goTo, variantIndex]);
  const goNext = useCallback(() => goTo(variantIndex + 1, 1), [goTo, variantIndex]);

  const onPillDragEnd = (_: unknown, info: PanInfo) => {
    const { offset, velocity } = info;
    if (offset.x < -DRAG_THRESHOLD || velocity.x < -200) goNext();
    else if (offset.x > DRAG_THRESHOLD || velocity.x > 200) goPrev();
  };

  return (
    <div className="flex w-full flex-col items-start">
      <div className="flex w-full items-center justify-center rounded-tl-[24px] rounded-tr-[24px] border-x border-t border-[rgba(0,0,0,0.25)] bg-[#02031d] p-3 [.crcle-phone--light_&]:bg-[#f7f6f2]">
        <NearbyIdentity onConnect={onConnect} />
      </div>
      <div className="relative flex h-[251px] w-full flex-col justify-between overflow-hidden rounded-bl-[24px] rounded-br-[24px] border border-[rgba(247,246,242,0.3)] p-2">
        <img
          alt=""
          src={emmaPortrait}
          className="absolute inset-0 size-full rounded-bl-[24px] rounded-br-[24px] object-cover"
        />
        <div className="relative z-[1] flex items-start justify-between">
          <div className="flex items-center gap-2 rounded-[120px] bg-[rgba(247,246,242,0.1)] p-1">
            <span className="inline-flex items-center gap-2.5 rounded-[64px] border border-[#f7f6f2] bg-[rgba(247,246,242,0.2)] p-2.5 backdrop-blur-[6px]">
              <span className="text-[11px] leading-[1.4] text-white" style={{ fontFamily: FONT }}>
                @SerenaMin
              </span>
              <span className="relative size-3 overflow-hidden">
                <img alt="" src={shareIcon} className="absolute inset-0 size-full object-contain" />
              </span>
            </span>
            <span className="rounded-[120px] bg-[#f7f6f2] px-3 py-1.5 text-[13px] leading-[1.4] text-black" style={{ fontFamily: FONT }}>
              24 Yrs
            </span>
          </div>
          <span className="flex size-8 items-center justify-center rounded-[120px] bg-[#f7f6f2] p-1">
            <span className="relative size-4 overflow-hidden">
              <img alt="" src={linkIcon} className="absolute inset-0 size-full object-contain" />
            </span>
          </span>
        </div>
        <div className="crcle-area-card-glass relative z-[1] flex w-full flex-col items-center gap-2 rounded-[20px] p-3">
          <span className="crcle-area-card-lens" aria-hidden>
            <img alt="" src={emmaPortrait} draggable={false} />
          </span>
          <div className="flex w-full items-start justify-between">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={variant}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={SWIPE_SPRING}
                className="relative size-3.5 overflow-hidden"
              >
                <img alt="" src={accentIcon} className="absolute inset-0 size-full object-contain" />
              </motion.span>
            </AnimatePresence>
            <span className="relative size-[22px] overflow-hidden">
              <img alt="" src={raindropIcon} className="absolute inset-0 size-full object-contain" />
            </span>
          </div>
          <div className="flex h-[44px] w-full items-center justify-between gap-2">
            <motion.button
              type="button"
              aria-label="Previous category"
              onClick={goPrev}
              className="relative flex size-6 shrink-0 items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
            >
              <span className="relative size-6 -scale-y-100 rotate-180 overflow-hidden">
                <img alt="" src={arrowRightIcon} className="absolute inset-0 size-full object-contain" />
                <span className="absolute inset-[29.17%_37.5%]">
                  <img alt="" src={arrowChevronIcon} className="size-full object-contain" />
                </span>
              </span>
            </motion.button>

            <motion.div
              className="relative flex h-full min-w-0 flex-1 touch-pan-y items-center justify-center overflow-hidden"
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
                  transition={SWIPE_SPRING}
                  className="absolute inset-x-0 flex min-w-0 items-center justify-center"
                >
                  <NearbyCategoryPills variant={variant} />
                </motion.div>
              </AnimatePresence>
            </motion.div>

            <motion.button
              type="button"
              aria-label="Next category"
              onClick={goNext}
              className="relative flex size-6 shrink-0 items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
            >
              <span className="relative size-6 overflow-hidden">
                <img alt="" src={arrowRightIcon} className="absolute inset-0 size-full object-contain" />
                <span className="absolute inset-[29.17%_37.5%]">
                  <img alt="" src={arrowChevronIcon} className="size-full object-contain" />
                </span>
              </span>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}

function NearbyCategoryPills({ variant }: { variant: NearbyVariant }) {
  if (variant === "purpose") {
    return (
      <div className="flex max-w-full min-w-0 items-center gap-2 rounded-[120px] bg-[rgba(2,3,29,0.16)] p-1.5">
        <span className="inline-flex items-center gap-1 rounded-[120px] border border-[#f7f6f2] px-2 py-1.5">
          <img alt="" src={lightbulbIcon} className="size-3.5 object-contain" draggable={false} />
          <span className="text-[16px] leading-[1.4] text-white" style={{ fontFamily: FONT }}>
            Learn
          </span>
        </span>
        <span className="inline-flex items-center gap-1 rounded-[120px] border border-[#f7f6f2] px-2 py-1.5">
          <img alt="" src={brainIcon} className="h-3 w-3.5 object-contain" draggable={false} />
          <span className="text-[16px] leading-[1.4] text-white" style={{ fontFamily: FONT }}>
            Mind
          </span>
        </span>
      </div>
    );
  }

  if (variant === "soul") {
    return (
      <div className="flex max-w-full min-w-0 items-center gap-3 rounded-[120px] bg-[rgba(247,246,242,0.4)] py-1.5 pl-4 pr-1.5">
        <span
          className="min-w-0 truncate text-[13px] leading-[1.4] text-[#f7f6f2]"
          style={{ fontFamily: FONT }}
        >
          Product Designer@Circle
        </span>
        <span
          className="shrink-0 rounded-[120px] bg-[#f7f6f2] px-2 py-1 text-[13px] leading-[1.4] text-[#020426]"
          style={{ fontFamily: FONT }}
        >
          Looking
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 rounded-[120px] bg-[rgba(2,3,29,0.16)] p-1.5">
      <span className="inline-flex items-center gap-1 rounded-[120px] bg-[#f7f6f2] px-2 py-1.5">
        <span className="relative size-4 overflow-hidden">
          <img alt="" src={unlockIcon} className="absolute inset-0 size-full object-contain" />
        </span>
        <span className="text-[16px] leading-[1.4] text-[#030426]" style={{ fontFamily: FONT }}>
          Single
        </span>
      </span>
      <span
        className="rounded-[120px] border border-[#f7f6f2] px-3 py-1.5 text-[16px] leading-[1.4] text-white"
        style={{ fontFamily: FONT }}
      >
        Hetero
      </span>
    </div>
  );
}

function CompactNearbyRow({ onConnect }: { onConnect: () => void }) {
  return (
    <div className="w-full rounded-[36px] border border-[#0fc950] bg-[#02031d] py-2 pl-4 pr-2 [.crcle-phone--light_&]:bg-[#f7f6f2]">
      <NearbyIdentity onConnect={onConnect} compact />
    </div>
  );
}

function NearbyIdentity({
  onConnect,
  compact = false,
}: {
  onConnect: () => void;
  compact?: boolean;
}) {
  return (
    <div className="flex w-full items-center gap-2">
      <div className="min-w-0 flex-1 text-left">
        <p
          className="text-[13px] font-semibold leading-[1.4] text-[#f7f6f2] [.crcle-phone--light_&]:text-[#030426]"
          style={{ fontFamily: FONT }}
        >
          Emma Rodriguez
        </p>
        <p className="text-[12px] leading-normal text-[#9ca3af]" style={{ fontFamily: FONT }}>
          Same venue detected · <span className="text-[#0fc950]">privacy protected</span>
        </p>
      </div>
      <button
        type="button"
        onClick={onConnect}
        className={`shrink-0 rounded-[36px] bg-[rgba(247,246,242,0.2)] text-[11px] leading-[1.4] text-[#f7f6f2] [.crcle-phone--light_&]:bg-[#030426] [.crcle-phone--light_&]:text-[#fefefe] ${
          compact ? "px-3 py-1.5" : "px-4 py-2"
        }`}
        style={{ fontFamily: FONT }}
      >
        Connect
      </button>
    </div>
  );
}

function IconBox({ src, className }: { src: string; className: string }) {
  return (
    <div className={`relative shrink-0 overflow-hidden ${className}`}>
      <img alt="" src={src} className="absolute inset-0 size-full max-w-none object-contain" />
    </div>
  );
}
