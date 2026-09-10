import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { useCallback, useState } from "react";
import alexPortrait from "@/assets/crcle/alex-portrait.png";
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

/** 8px inset from left, right, and bottom of the iPhone screen — Figma 1142:33118 */
const SHEET_EDGE = "left-2 right-2 bottom-2";

type NearbyVariant = "love" | "purpose" | "soul";
type NearbyStage = "prompt" | "request_sent" | "connected";
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

const stageFadeVariants = {
  enter: { opacity: 0, y: 12 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

/** Figma 1142:35114 dark · 1142:33288 light prompt → 1142:35535 request sent → 1391:214524 connected. */
export function AreaNearbyNotificationModal({
  backdropUrl,
  isLight = false,
  onDismiss,
  onComplete,
}: {
  /** Frost wash when sibling backdrop-filter cannot sample the clipped screen. */
  backdropUrl: string;
  isLight?: boolean;
  onDismiss: () => void;
  onComplete: () => void;
}) {
  const [stage, setStage] = useState<NearbyStage>("prompt");
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

  const handleBackdrop = () => {
    if (stage === "prompt") onDismiss();
  };

  const handlePrimaryAction = () => {
    if (stage === "prompt") {
      setStage("request_sent");
      return;
    }
    if (stage === "request_sent") {
      setStage("connected");
      return;
    }
    onComplete();
  };

  const ariaLabel =
    stage === "prompt"
      ? "Nearby connection"
      : stage === "request_sent"
        ? "Connection request sent"
        : "Connection established";

  const titleInk = isLight ? "text-[#02031d]" : "text-white";
  const bodyInk = "text-[#9ca3af]";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-auto absolute inset-0 z-[63] isolate overflow-hidden rounded-[53px]"
      style={{ clipPath: "inset(0 round 53px)" }}
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
    >
      <button
        type="button"
        aria-label="Dismiss"
        className={`pointer-events-auto absolute inset-0 z-0 backdrop-blur-[8px] ${
          isLight ? "bg-[rgba(2,3,29,0.28)]" : "bg-black/45"
        }`}
        onClick={handleBackdrop}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 24 }}
        transition={SPRING}
        className={`pointer-events-auto absolute z-10 ${SHEET_EDGE}`}
      >
        <div
          className={`pointer-events-none crcle-nearby-modal-glass relative flex w-full flex-col items-center gap-4 overflow-hidden rounded-[52px] p-6 shadow-2xl ${
            isLight ? "crcle-nearby-modal-glass--light" : ""
          }`}
        >
          <div aria-hidden className="crcle-nearby-modal-glass-backdrop rounded-[inherit]">
            <img
              alt=""
              src={backdropUrl}
              className="absolute left-1/2 top-1/2 h-[220%] w-[220%] max-w-none -translate-x-1/2 -translate-y-[58%] scale-110 object-cover object-[center_20%]"
              draggable={false}
            />
            <div className="absolute inset-0 bg-[rgba(2,3,29,0.52)]" />
          </div>
          <div aria-hidden className="crcle-nearby-modal-glass-plate rounded-[inherit]" />
          <div aria-hidden className="crcle-nearby-modal-glass-frost rounded-[inherit]" />
          <div aria-hidden className="crcle-nearby-modal-glass-lens rounded-[inherit]" />
          <div aria-hidden className="crcle-nearby-modal-glass-dispersion rounded-[inherit]" />

          <div className="pointer-events-auto relative z-[1] flex w-full flex-col items-center gap-4">
            <AnimatePresence mode="wait" initial={false}>
              {stage === "prompt" ? (
                <motion.div
                  key="prompt"
                  variants={stageFadeVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={SPRING}
                  className="flex w-full flex-col items-center gap-4"
                >
                  <NearbyPromptContent
                    variant={variant}
                    direction={direction}
                    isLight={isLight}
                    onDismiss={onDismiss}
                    onConnect={handlePrimaryAction}
                    onPillDragEnd={onPillDragEnd}
                    goPrev={goPrev}
                    goNext={goNext}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key={stage}
                  variants={stageFadeVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={SPRING}
                  className="flex w-full flex-col items-center gap-4"
                >
                  <NearbyPinBadge isLight={isLight} />

                  {stage === "request_sent" ? (
                    <div className="flex w-full items-center justify-center pr-1">
                      <div
                        className={`flex w-[67px] items-end rounded-[64px] border-[0.5px] p-[2px] ${
                          isLight
                            ? "border-[rgba(2,3,29,0.15)] bg-[rgba(255,255,255,0.65)]"
                            : "border-[rgba(247,246,242,0.4)] bg-[rgba(255,255,255,0.5)]"
                        }`}
                      >
                        <div
                          className={`-mr-3 size-16 shrink-0 overflow-hidden rounded-full border ${
                            isLight ? "border-[rgba(2,3,29,0.12)]" : "border-[rgba(247,246,242,0.3)]"
                          }`}
                        >
                          <img alt="" src={serenaPortrait} className="size-full object-cover" draggable={false} />
                        </div>
                        <span
                          className="relative z-[1] size-3 shrink-0 rounded-full border-2 border-[#0fc950] bg-[rgba(15,201,80,0.2)]"
                          aria-hidden
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex w-full items-center justify-center pr-1">
                      <div className="flex items-center">
                        <div
                          className={`-mr-3 flex w-[67px] items-end rounded-[64px] border-[0.5px] p-[2px] ${
                            isLight
                              ? "border-[rgba(15,201,80,0.2)] bg-[rgba(255,255,255,0.65)]"
                              : "border-[rgba(15,201,80,0.15)] bg-[rgba(255,255,255,0.5)]"
                          }`}
                        >
                          <div
                            className={`size-16 shrink-0 overflow-hidden rounded-full border ${
                              isLight ? "border-[rgba(2,3,29,0.12)]" : "border-[rgba(247,246,242,0.3)]"
                            }`}
                          >
                            <img alt="" src={serenaPortrait} className="size-full object-cover" draggable={false} />
                          </div>
                        </div>
                        <div
                          className={`flex size-[67px] items-center justify-center rounded-[64px] border-[0.5px] border-[#0fc950] p-[2px] ${
                            isLight ? "bg-[rgba(247,246,242,0.65)]" : "bg-[rgba(247,246,242,0.4)]"
                          }`}
                        >
                          <div className="size-[62px] shrink-0 overflow-hidden rounded-full">
                            <img alt="" src={alexPortrait} className="size-full object-cover" draggable={false} />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex w-full flex-col items-center gap-1.5 text-center">
                    <p className={`text-[18px] font-semibold leading-normal ${titleInk}`} style={{ fontFamily: FONT }}>
                      {stage === "request_sent"
                        ? "Request sent to Serena Min"
                        : "You're connected with Alex!"}
                    </p>
                    <p className={`text-[13px] leading-normal ${bodyInk}`} style={{ fontFamily: FONT }}>
                      {stage === "request_sent"
                        ? "You'll be notified immediately when they respond."
                        : "You can now message each other safely."}
                    </p>
                  </div>

                  <NearbyDoneButton isLight={isLight} onClick={handlePrimaryAction} />

                  <p className={`w-full text-center text-[10px] font-medium leading-normal ${bodyInk}`} style={{ fontFamily: FONT }}>
                    No exact location shared · double opt-in required
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function NearbyPinBadge({ isLight }: { isLight: boolean }) {
  return (
    <div className="flex w-full flex-col items-start">
      <span
        className={`-mb-5 flex size-5 items-center justify-center self-start rounded-[64px] bg-[rgba(17,223,89,0.8)] p-1 ${
          isLight ? "border border-[rgba(0,0,0,0.25)]" : ""
        }`}
      >
        <span className="relative h-3 w-[7px] overflow-hidden">
          <img alt="" src={areaPinIcon} className="absolute inset-0 size-full object-contain" draggable={false} />
        </span>
      </span>
    </div>
  );
}

function NearbyDoneButton({ isLight, onClick }: { isLight: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`relative z-[1] flex h-12 w-full items-center justify-center rounded-[24px] px-4 text-[14px] font-bold leading-normal transition hover:brightness-95 ${
        isLight
          ? "border border-[rgba(2,3,29,0.12)] bg-[#02031d] text-[#f7f6f2]"
          : "border border-[rgba(255,255,255,0.15)] bg-[#f7f6f2] text-[#02031d]"
      }`}
      style={{ fontFamily: FONT }}
    >
      Done
    </button>
  );
}

function NearbyPromptContent({
  variant,
  direction,
  isLight,
  onDismiss,
  onConnect,
  onPillDragEnd,
  goPrev,
  goNext,
}: {
  variant: NearbyVariant;
  direction: number;
  isLight: boolean;
  onDismiss: () => void;
  onConnect: () => void;
  onPillDragEnd: (_: unknown, info: PanInfo) => void;
  goPrev: () => void;
  goNext: () => void;
}) {
  const titleInk = isLight ? "text-[#02031d]" : "text-white";
  const bodyInk = "text-[#9ca3af]";
  const promptInk = isLight ? "text-[#02031d]" : "text-white";
  const dividerClass = isLight ? "bg-[rgba(2,3,29,0.12)]" : "bg-[rgba(247,246,242,0.25)]";
  const iconInk = isLight ? "brightness-0" : "";

  return (
    <>
      <div className="flex w-full flex-col items-center gap-6">
        <span
          className={`flex size-5 items-center justify-center rounded-[64px] bg-[rgba(17,223,89,0.8)] p-1 ${
            isLight ? "border border-[rgba(0,0,0,0.25)]" : ""
          }`}
        >
          <span className="relative h-3 w-[7px] overflow-hidden">
            <img alt="" src={areaPinIcon} className="absolute inset-0 size-full object-contain" draggable={false} />
          </span>
        </span>
        <div aria-hidden className={`h-px w-full ${dividerClass}`} />
      </div>

      <div className="flex w-full items-start justify-end gap-4 pr-1">
        <div
          className={`flex w-[46px] shrink-0 items-end rounded-[64px] border-[0.5px] p-[2px] ${
            isLight ? "border-[rgba(2,3,29,0.15)]" : "border-[rgba(247,246,242,0.4)]"
          }`}
        >
          <div
            className={`-mr-2 size-[42px] shrink-0 overflow-hidden rounded-full border ${
              isLight ? "border-[rgba(2,3,29,0.12)]" : "border-[rgba(247,246,242,0.3)]"
            }`}
          >
            <img alt="" src={serenaPortrait} className="size-full object-cover" draggable={false} />
          </div>
          <span
            className={`relative z-[1] size-3 shrink-0 rounded-full border-2 border-[#0fc950] ${
              isLight ? "bg-[#f7f6f2]" : "bg-[#02031d]"
            }`}
            aria-hidden
          />
        </div>

        <div className="min-w-0 flex-1 self-stretch">
          <p className={`text-[18px] font-semibold leading-normal ${titleInk}`} style={{ fontFamily: FONT }}>
            Serena Min is nearby
          </p>
          <p className={`mt-1 text-[12px] leading-normal ${bodyInk}`} style={{ fontFamily: FONT }}>
            Same venue detected · privacy protected
          </p>
        </div>

        <span className={`relative size-[22px] shrink-0 overflow-hidden pt-1 ${iconInk}`}>
          <img alt="" src={raindropIcon} className="absolute inset-0 size-full object-contain" draggable={false} />
        </span>
      </div>

      <div className="flex w-full items-center justify-between">
        <motion.button
          type="button"
          aria-label="Previous category"
          onClick={goPrev}
          className={`relative flex size-6 shrink-0 items-center justify-center ${iconInk}`}
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
          className="relative flex h-[44px] min-w-0 flex-1 touch-pan-y cursor-grab items-center justify-center overflow-hidden px-2 active:cursor-grabbing"
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
              <NearbyCategoryPills variant={variant} isLight={isLight} />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <motion.button
          type="button"
          aria-label="Next category"
          onClick={goNext}
          className={`relative flex size-6 shrink-0 items-center justify-center ${iconInk}`}
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

      <p className={`w-full text-center text-[14px] font-medium leading-normal ${promptInk}`} style={{ fontFamily: FONT }}>
        Would you like to connect?
      </p>

      <div className="relative z-[2] flex w-full items-start gap-3">
        <motion.button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDismiss();
          }}
          className={`relative z-[1] flex h-12 min-w-0 flex-1 items-center justify-center rounded-[24px] px-4 text-[14px] font-semibold leading-normal transition hover:brightness-110 ${
            isLight
              ? "bg-[rgba(2,3,29,0.2)] text-[#f7f6f2]"
              : "bg-[rgba(255,255,255,0.2)] text-[#f7f6f2]"
          }`}
          style={{ fontFamily: FONT }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
        >
          Dismiss
        </motion.button>
        <motion.button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onConnect();
          }}
          className={`relative z-[1] flex h-12 min-w-0 flex-1 items-center justify-center rounded-[24px] px-4 text-[14px] font-semibold leading-normal transition hover:brightness-95 ${
            isLight ? "bg-[#02031d] text-[#f7f6f2]" : "bg-[#f7f6f2] text-[#02031d]"
          }`}
          style={{ fontFamily: FONT }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
        >
          Connect
        </motion.button>
      </div>

      <p className={`w-full text-center text-[10px] font-medium leading-normal ${bodyInk}`} style={{ fontFamily: FONT }}>
        No exact location shared · double opt-in required
      </p>
    </>
  );
}

function NearbyCategoryPills({ variant, isLight }: { variant: NearbyVariant; isLight: boolean }) {
  if (variant === "purpose") {
    return (
      <div
        className={`flex max-w-full min-w-0 items-center gap-3 rounded-[120px] p-1.5 ${
          isLight ? "bg-[rgba(3,4,38,0.1)]" : "bg-[rgba(247,246,242,0.1)]"
        }`}
      >
        <span
          className={`inline-flex items-center gap-1 rounded-[120px] border px-2 py-1.5 ${
            isLight ? "border-[#030426]" : "border-[#f7f6f2]"
          }`}
        >
          <img alt="" src={lightbulbIcon} className={`size-4 object-contain ${isLight ? "brightness-0" : ""}`} draggable={false} />
          <span
            className={`text-[16px] leading-[1.4] ${isLight ? "text-[#02031d]" : "text-white"}`}
            style={{ fontFamily: FONT }}
          >
            Learn
          </span>
        </span>
        <span
          className={`inline-flex items-center gap-1 rounded-[120px] border px-3 py-1.5 ${
            isLight ? "border-[#030426]" : "border-[#f7f6f2]"
          }`}
        >
          <img alt="" src={brainIcon} className={`h-3 w-4 object-contain ${isLight ? "brightness-0" : ""}`} draggable={false} />
          <span
            className={`text-[16px] leading-[1.4] ${isLight ? "text-[#02031d]" : "text-white"}`}
            style={{ fontFamily: FONT }}
          >
            Mind
          </span>
        </span>
      </div>
    );
  }

  if (variant === "soul") {
    return (
      <div
        className={`flex max-w-full min-w-0 items-center gap-3 rounded-[120px] py-1.5 pl-4 pr-1.5 ${
          isLight ? "bg-[rgba(3,4,38,0.1)]" : "bg-[rgba(247,246,242,0.1)]"
        }`}
      >
        <span
          className={`min-w-0 truncate text-[13px] leading-[1.4] ${isLight ? "text-[#030426]" : "text-[#f7f6f2]"}`}
          style={{ fontFamily: FONT }}
        >
          Product Designer@Circle
        </span>
        <span
          className={`shrink-0 rounded-[120px] px-2 py-1 text-[13px] leading-[1.4] ${
            isLight ? "bg-[#020426] text-[#f7f6f2]" : "bg-[#f7f6f2] text-[#020426]"
          }`}
          style={{ fontFamily: FONT }}
        >
          Looking
        </span>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center gap-3 rounded-[120px] p-1.5 ${
        isLight ? "bg-[rgba(3,4,38,0.1)]" : "bg-[rgba(247,246,242,0.1)]"
      }`}
    >
      <span
        className={`inline-flex items-center gap-1 rounded-[120px] px-2 py-1.5 ${
          isLight ? "bg-[#02031d]" : "bg-[#f7f6f2]"
        }`}
      >
        <span className="relative size-4 overflow-hidden">
          <img
            alt=""
            src={unlockIcon}
            className={`absolute inset-0 size-full object-contain ${isLight ? "brightness-0 invert" : ""}`}
            draggable={false}
          />
        </span>
        <span
          className={`text-[16px] leading-[1.4] ${isLight ? "text-[#f7f6f2]" : "text-[#030426]"}`}
          style={{ fontFamily: FONT }}
        >
          Single
        </span>
      </span>
      <span
        className={`rounded-[120px] border px-3 py-1.5 text-[16px] leading-[1.4] ${
          isLight ? "border-[#030426] text-[#02031d]" : "border-[#f7f6f2] text-white"
        }`}
        style={{ fontFamily: FONT }}
      >
        Hetero
      </span>
    </div>
  );
}
