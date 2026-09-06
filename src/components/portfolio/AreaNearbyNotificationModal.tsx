import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { useCallback, useState } from "react";
import arrowChevronIcon from "@/assets/crcle/arrow-chevron.svg";
import arrowRightIcon from "@/assets/crcle/area/arrow-right.svg";
import raindropIcon from "@/assets/crcle/area/raindrop.svg";
import unlockIcon from "@/assets/crcle/area/unlock.svg";
import areaPinIcon from "@/assets/crcle/mood/area-pin.svg";
import brainIcon from "@/assets/crcle/signal/brain.svg";
import lightbulbIcon from "@/assets/crcle/signal/lightbulb.svg";
import serenaPortrait from "@/assets/crcle/serena-portrait.png";

const FONT = "Montserrat, ui-sans-serif, system-ui, sans-serif";
const SPRING = { type: "spring", stiffness: 380, damping: 22, mass: 0.8 } as const;
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

/** Figma 1142:35114 — nearby notification after In The Area mood switch. */
export function AreaNearbyNotificationModal({
  onDismiss,
  onConnect,
}: {
  onDismiss: () => void;
  onConnect: () => void;
}) {
  const [variantIndex, setVariantIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const variant = VARIANT_ORDER[variantIndex];

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pointer-events-auto absolute inset-0 z-[50] overflow-hidden rounded-[53px]"
      style={{ clipPath: "inset(0 round 53px)" }}
      role="dialog"
      aria-modal="true"
      aria-label="Nearby connection"
    >
      <motion.button
        type="button"
        aria-label="Dismiss"
        className="absolute inset-0 bg-black/40 backdrop-blur-[6px]"
        onClick={onDismiss}
      />

      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={SPRING}
        className="absolute inset-x-2 bottom-2 z-[1] flex justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="crcle-nearby-modal-glass relative flex w-full max-w-[360px] flex-col items-center gap-4 overflow-hidden rounded-[52px] p-6 shadow-2xl">
          <div aria-hidden className="crcle-nearby-modal-glass-plate rounded-[inherit]" />
          <div aria-hidden className="crcle-nearby-modal-glass-lens rounded-[inherit]" />

        <div className="relative z-[1] flex w-full flex-col items-center gap-4">
        <div className="flex w-full flex-col items-center gap-6">
          <span className="flex size-5 items-center justify-center rounded-[64px] bg-[rgba(17,223,89,0.8)] p-1">
            <span className="relative h-3 w-[7px] overflow-hidden">
              <img alt="" src={areaPinIcon} className="absolute inset-0 size-full object-contain" draggable={false} />
            </span>
          </span>
          <div aria-hidden className="h-px w-full bg-[rgba(247,246,242,0.25)]" />
        </div>

        <div className="flex w-full items-start justify-end gap-4 pr-1">
          <div className="flex w-[46px] shrink-0 items-end rounded-[64px] border-[0.5px] border-[rgba(247,246,242,0.4)] p-[2px]">
            <div className="-mr-2 size-[42px] shrink-0 overflow-hidden rounded-full border border-[rgba(247,246,242,0.3)]">
              <img alt="" src={serenaPortrait} className="size-full object-cover" draggable={false} />
            </div>
            <span className="relative z-[1] size-3 shrink-0 rounded-full border-2 border-[#0fc950] bg-[#02031d]" aria-hidden />
          </div>

          <div className="min-w-0 flex-1 self-stretch">
            <p className="text-[18px] font-semibold leading-normal text-white" style={{ fontFamily: FONT }}>
              Serena Min is nearby
            </p>
            <p className="mt-1 text-[12px] leading-normal text-[#9ca3af]" style={{ fontFamily: FONT }}>
              Same venue detected · privacy protected
            </p>
          </div>

          <span className="relative size-[22px] shrink-0 overflow-hidden pt-1">
            <img alt="" src={raindropIcon} className="absolute inset-0 size-full object-contain" draggable={false} />
          </span>
        </div>

        {/* Figma 1142:35129 — swipe row (Signal Intercept pattern) */}
        <div className="flex w-full items-center justify-between">
          <motion.button
            type="button"
            aria-label="Previous category"
            onClick={goPrev}
            className="relative flex size-6 shrink-0 items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
          >
            <span className="relative size-6 -scale-y-100 rotate-180 overflow-hidden">
              <img alt="" src={arrowRightIcon} className="absolute inset-0 size-full object-contain" draggable={false} />
              <span className="absolute inset-[29.17%_37.5%]">
                <img alt="" src={arrowChevronIcon} className="size-full object-contain" draggable={false} />
              </span>
            </span>
          </motion.button>

          <motion.div
            className="relative flex h-[44px] min-w-0 flex-1 touch-pan-y items-center justify-center overflow-hidden px-2"
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
              <img alt="" src={arrowRightIcon} className="absolute inset-0 size-full object-contain" draggable={false} />
              <span className="absolute inset-[29.17%_37.5%]">
                <img alt="" src={arrowChevronIcon} className="size-full object-contain" draggable={false} />
              </span>
            </span>
          </motion.button>
        </div>

        <p className="w-full text-center text-[14px] font-medium leading-normal text-white" style={{ fontFamily: FONT }}>
          Would you like to connect?
        </p>

        <div className="flex w-full items-start gap-3">
          <button
            type="button"
            onClick={onDismiss}
            className="flex h-12 min-w-0 flex-1 items-center justify-center rounded-[24px] bg-[rgba(255,255,255,0.2)] px-4 text-[14px] font-semibold leading-normal text-[#f7f6f2] transition hover:brightness-110"
            style={{ fontFamily: FONT }}
          >
            Dismiss
          </button>
          <button
            type="button"
            onClick={onConnect}
            className="flex h-12 min-w-0 flex-1 items-center justify-center rounded-[24px] bg-[#f7f6f2] px-4 text-[14px] font-semibold leading-normal text-[#02031d] transition hover:brightness-95"
            style={{ fontFamily: FONT }}
          >
            Connect
          </button>
        </div>

        <p className="w-full text-center text-[10px] font-medium leading-normal text-[#9ca3af]" style={{ fontFamily: FONT }}>
          No exact location shared · double opt-in required
        </p>
        </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function NearbyCategoryPills({ variant }: { variant: NearbyVariant }) {
  if (variant === "purpose") {
    return (
      <div className="flex max-w-full min-w-0 items-center gap-3 rounded-[120px] bg-[rgba(247,246,242,0.1)] p-1.5">
        <span className="inline-flex items-center gap-1 rounded-[120px] border border-[#f7f6f2] px-2 py-1.5">
          <img alt="" src={lightbulbIcon} className="size-4 object-contain" draggable={false} />
          <span className="text-[16px] leading-[1.4] text-white" style={{ fontFamily: FONT }}>
            Learn
          </span>
        </span>
        <span className="inline-flex items-center gap-1 rounded-[120px] border border-[#f7f6f2] px-3 py-1.5">
          <img alt="" src={brainIcon} className="h-3 w-4 object-contain" draggable={false} />
          <span className="text-[16px] leading-[1.4] text-white" style={{ fontFamily: FONT }}>
            Mind
          </span>
        </span>
      </div>
    );
  }

  if (variant === "soul") {
    return (
      <div className="flex max-w-full min-w-0 items-center gap-3 rounded-[120px] bg-[rgba(247,246,242,0.1)] py-1.5 pl-4 pr-1.5">
        <span className="min-w-0 truncate text-[13px] leading-[1.4] text-[#f7f6f2]" style={{ fontFamily: FONT }}>
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
    <div className="flex items-center gap-3 rounded-[120px] bg-[rgba(247,246,242,0.1)] p-1.5">
      <span className="inline-flex items-center gap-1 rounded-[120px] bg-[#f7f6f2] px-2 py-1.5">
        <span className="relative size-4 overflow-hidden">
          <img alt="" src={unlockIcon} className="absolute inset-0 size-full object-contain" draggable={false} />
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
