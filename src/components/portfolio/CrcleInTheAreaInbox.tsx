import { AnimatePresence, motion } from "framer-motion";
import arrowRightIcon from "@/assets/crcle/area/arrow-right.svg";
import emmaPortrait from "@/assets/crcle/area/emma-portrait.png";
import handleIcon from "@/assets/crcle/area/handle.svg";
import heartIcon from "@/assets/crcle/area/heart.svg";
import linkIcon from "@/assets/crcle/area/link.svg";
import raindropIcon from "@/assets/crcle/area/raindrop.svg";
import unlockIcon from "@/assets/crcle/area/unlock.svg";
import batteryIcon from "@/assets/crcle/battery.svg";
import cellularIcon from "@/assets/crcle/cellular.svg";
import crcleLogo from "@/assets/crcle/crcle-logo.svg";
import areaPinIcon from "@/assets/crcle/mood/area-pin.svg";
import shareIcon from "@/assets/crcle/share.svg";
import wifiIcon from "@/assets/crcle/wifi.svg";

const FONT = "Montserrat, ui-sans-serif, system-ui, sans-serif";
const EASE = [0.22, 1, 0.36, 1] as const;

type AreaPhase = "screen" | "drawer";

/** Figma 1142:34808 (In The Area screen) → 1142:34923 (notifications drawer). */
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
    <motion.div
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.32, ease: EASE }}
      className="pointer-events-auto absolute inset-x-0 top-0 z-[35] flex flex-col"
      role="dialog"
      aria-label="In The Area"
    >
      <div className="flex flex-col items-center bg-[#02031d]">
        <div className="mx-auto flex h-[62px] w-[84%] items-end justify-between px-2 pb-[10px] text-[#f7f6f2]">
          <span
            className="text-[17px] font-semibold leading-[22px]"
            style={{ fontFamily: "SF Pro, system-ui, -apple-system, sans-serif" }}
          >
            9:41
          </span>
          <div className="flex items-center gap-[7px] pb-0.5">
            <IconBox src={cellularIcon} className="h-[12.226px] w-[19.2px]" />
            <IconBox src={wifiIcon} className="h-[12.328px] w-[17.142px]" />
            <IconBox src={batteryIcon} className="h-[13px] w-[27.328px]" />
          </div>
        </div>
        <IconBox src={crcleLogo} className="mb-[12px] h-[9px] w-[26px]" />
      </div>

      <div
        className="flex flex-col items-center gap-4 rounded-bl-[28px] rounded-br-[28px] border-x border-[rgba(0,0,0,0.25)] px-[13px] pb-3 pt-4"
        style={{
          backgroundImage:
            "linear-gradient(182deg, rgba(255,255,255,0.4) 26%, rgba(2,3,29,0.04) 98%)",
        }}
      >
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
            className="min-w-0 flex-1 text-center text-[19px] font-medium leading-[1.4] text-[#f7f6f2]"
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
                  className="w-full rounded-[36px] border border-[#f7f6f2] p-3 text-center text-[14px] leading-[21px] text-[#f7f6f2] transition hover:bg-white/5"
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
    </motion.div>
  );
}

function FeaturedNearbyCard({ onConnect }: { onConnect: () => void }) {
  return (
    <div className="flex w-full flex-col items-start">
      <div className="flex w-full items-center justify-center rounded-tl-[24px] rounded-tr-[24px] border-x border-t border-[rgba(0,0,0,0.25)] bg-[#02031d] p-3">
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
        <div className="relative z-[1] flex w-full flex-col items-center gap-2 rounded-[20px] bg-[rgba(247,246,242,0.2)] p-3">
          <div className="flex w-full items-start justify-between">
            <span className="relative size-3.5 overflow-hidden">
              <img alt="" src={heartIcon} className="absolute inset-0 size-full object-contain" />
            </span>
            <span className="relative size-[22px] overflow-hidden">
              <img alt="" src={raindropIcon} className="absolute inset-0 size-full object-contain" />
            </span>
          </div>
          <div className="flex items-center gap-[50px]">
            <span className="relative size-6 rotate-180 overflow-hidden">
              <img alt="" src={arrowRightIcon} className="absolute inset-0 size-full object-contain" />
            </span>
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
            <span className="relative size-6 overflow-hidden">
              <img alt="" src={arrowRightIcon} className="absolute inset-0 size-full object-contain" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CompactNearbyRow({ onConnect }: { onConnect: () => void }) {
  return (
    <div className="w-full rounded-[36px] border border-[#0fc950] bg-[#02031d] py-2 pl-4 pr-2">
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
          className="text-[13px] font-semibold leading-[1.4] text-[#f7f6f2]"
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
        className={`shrink-0 rounded-[36px] bg-[rgba(247,246,242,0.2)] text-[11px] leading-[1.4] text-[#f7f6f2] ${
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
