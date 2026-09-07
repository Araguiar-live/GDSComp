import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import areaPinIcon from "@/assets/crcle/mood/area-pin.svg";
import radarTwoIcon from "@/assets/crcle/mood/radar-two.svg";
import navHomeIcon from "@/assets/crcle/nav-home.svg";
import navMessageIcon from "@/assets/crcle/nav-message-figma.svg";
import navRadarIcon from "@/assets/crcle/nav-radar.svg";
import navUserIcon from "@/assets/crcle/nav-user-figma.svg";
import arrowLeftIcon from "@/assets/crcle/arrow-left.svg";
import moreHorizIcon from "@/assets/crcle/more-horiz.svg";
import moreDotsIcon from "@/assets/crcle/more-dots.svg";
import { useCrcleBroadcast, useCrcleIncognito } from "@/components/portfolio/crcleBroadcast";

export type CrcleDockTab = "profile" | "signal" | "messages";

const EASE = [0.22, 1, 0.36, 1] as const;
const FONT = "Montserrat, ui-sans-serif, system-ui, sans-serif";

/**
 * Shared CRCLE dock — white frosted glass + Signal Panel (hover / tap waveform).
 * Primary row: Profile · Signal · Messages. Radar + Home live in the Signal Panel.
 */
export function CrclePrimaryDock({
  active,
  signalOpen: signalOpenProp,
  embedded = false,
  onProfile,
  onSignal,
  onMessages,
  onRadar,
  onSignalHome,
  onAreaRadar,
}: {
  active: CrcleDockTab;
  /** When set, controls pinned-open state from the parent */
  signalOpen?: boolean;
  /** Use inside a parent that already positions the dock stack */
  embedded?: boolean;
  onProfile?: () => void;
  onSignal?: () => void;
  onMessages?: () => void;
  onRadar?: () => void;
  onSignalHome?: () => void;
  onAreaRadar?: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [pinnedOpen, setPinnedOpen] = useState(false);
  const [forceClosed, setForceClosed] = useState(false);
  const [broadcastMood] = useCrcleBroadcast();
  const [isIncognito] = useCrcleIncognito();
  const showAreaRadar = broadcastMood === "in_the_area" && !isIncognito;
  const controlled = signalOpenProp !== undefined;
  const signalOpen = controlled ? signalOpenProp : pinnedOpen;
  const panelVisible = !forceClosed && (hovered || Boolean(signalOpen));

  const toggleSignal = () => {
    if (onSignal) {
      onSignal();
      return;
    }
    if (panelVisible) {
      setPinnedOpen(false);
      setForceClosed(true);
      return;
    }
    setForceClosed(false);
    setPinnedOpen(true);
  };

  return (
    <div
      className={
        embedded
          ? "pointer-events-none relative mx-auto flex w-[134.4px] flex-col items-center gap-3 overflow-visible"
          : "pointer-events-none absolute bottom-5 left-0 right-0 z-20 mx-auto flex w-[134.4px] flex-col items-center gap-3 overflow-visible"
      }
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setForceClosed(false);
      }}
    >
      <AnimatePresence>
        {showAreaRadar ? (
          <motion.button
            key="area-radar"
            type="button"
            aria-label="In The Area notifications"
            initial={{ opacity: 0, scale: 0.86, x: 10 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: 8 }}
            transition={{ duration: 0.22, ease: EASE }}
            onClick={onAreaRadar}
            className="pointer-events-auto absolute bottom-0 right-full mr-1 flex items-start overflow-visible"
          >
            <span className="relative mr-[-12px] flex w-11 shrink-0 items-center justify-center rounded-[46px] bg-[rgba(247,246,242,0.4)] p-2.5">
              <span className="relative size-6 shrink-0 overflow-hidden">
                <img
                  alt=""
                  src={radarTwoIcon}
                  className="absolute inset-0 size-full max-w-none object-contain"
                  draggable={false}
                />
              </span>
            </span>
            <span className="relative z-[1] flex size-5 shrink-0 flex-col items-center justify-center rounded-[64px] bg-[rgba(17,223,89,0.8)] p-1">
              <span className="relative h-3 w-[7px] shrink-0 overflow-hidden">
                <img
                  alt=""
                  src={areaPinIcon}
                  className="absolute inset-0 size-full max-w-none object-contain"
                  draggable={false}
                />
              </span>
            </span>
          </motion.button>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {panelVisible ? (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.22, ease: EASE }}
            transformTemplate={() => ""}
            className="crcle-signal-panel pointer-events-auto relative flex w-full flex-col gap-2 overflow-hidden rounded-[24px] p-2"
          >
            <div aria-hidden className="crcle-signal-panel-glass rounded-[inherit]" />
            <div aria-hidden className="crcle-signal-panel-plate rounded-[inherit]" />
            <div className="relative z-[1] flex items-center justify-center gap-0.5">
              <div className="flex size-6 items-center justify-center">
                <SoundWaveIcon size={16} active />
              </div>
              <p
                className="whitespace-nowrap text-[11px] leading-[1.4] text-[#02031d]"
                style={{ fontFamily: FONT }}
              >
                Signal Panel
              </p>
            </div>
            <div className="relative z-[1] flex items-start justify-between">
              <button
                type="button"
                aria-label="Open radar"
                onClick={onRadar}
                className="crcle-signal-panel__btn flex size-[42px] shrink-0 items-center justify-center rounded-[40px] p-1 transition hover:brightness-105"
              >
                <img
                  alt=""
                  src={navRadarIcon}
                  className="crcle-dock-icon size-5 max-w-none object-contain"
                  draggable={false}
                />
              </button>
              <button
                type="button"
                aria-label="Go to Signal Home"
                onClick={onSignalHome}
                className="crcle-signal-panel__btn flex size-[42px] shrink-0 items-center justify-center rounded-[40px] p-1 transition hover:brightness-105"
              >
                <img
                  alt=""
                  src={navHomeIcon}
                  className="crcle-dock-icon size-6 max-w-none object-contain"
                  draggable={false}
                />
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <nav
        className="crcle-primary-dock pointer-events-auto relative box-border flex h-[44px] w-[134.4px] shrink-0 items-center gap-4 overflow-hidden rounded-[36px] px-4"
        role="navigation"
        aria-label="Primary"
      >
        <div aria-hidden className="crcle-primary-dock-glass rounded-[inherit]" />
        <div aria-hidden className="crcle-primary-dock-plate rounded-[inherit]" />
        <div aria-hidden className="crcle-primary-dock-frost rounded-[inherit]" />
        <div aria-hidden className="crcle-primary-dock-lens rounded-[inherit]" />
        <DockIconButton
          label="Profile"
          active={active === "profile"}
          onClick={onProfile}
          className="relative z-[1] size-6"
        >
          <img
            alt=""
            src={navUserIcon}
            className="crcle-dock-icon block size-6 max-w-none object-contain"
            draggable={false}
          />
        </DockIconButton>

        <DockIconButton
          label="Signal"
          active={active === "signal" || panelVisible}
          onClick={toggleSignal}
          className="relative z-[1] h-[14px] w-[22.4px]"
          ariaExpanded={panelVisible}
        >
          <SoundWaveIcon size={22.4} active={active === "signal" || panelVisible} />
        </DockIconButton>

        <DockIconButton
          label="Messages"
          active={active === "messages"}
          onClick={onMessages}
          className="relative z-[1] size-6"
        >
          <img
            alt=""
            src={navMessageIcon}
            className="crcle-dock-icon block size-6 max-w-none object-contain"
            draggable={false}
          />
        </DockIconButton>
      </nav>
    </div>
  );
}

function SoundWaveIcon({ size, active }: { size: number; active?: boolean }) {
  const scale = size / 22.4;
  return (
    <div
      className={`crcle-signal-bars flex items-center gap-[2.8px] ${active ? "is-active" : ""}`}
      style={{ transform: `scale(${scale})`, transformOrigin: "center" }}
      aria-hidden
    >
      <span className="h-[8.4px] w-[5.6px] rounded-[18.667px]" />
      <span className="h-[14px] w-[5.6px] rounded-[18.667px]" />
      <span className="h-[8.4px] w-[5.6px] rounded-[18.667px]" />
    </div>
  );
}

function DockIconButton({
  label,
  active,
  onClick,
  children,
  className = "",
  ariaExpanded,
}: {
  label: string;
  active: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  ariaExpanded?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-current={active ? "page" : undefined}
      aria-expanded={ariaExpanded}
      onClick={onClick}
      className={`relative flex shrink-0 items-center justify-center overflow-visible transition-opacity ${
        active ? "opacity-100" : "opacity-45 hover:opacity-80"
      } ${className}`}
    >
      {children}
    </button>
  );
}

/** Standardized back control — frosted glass + blur */
export function CrcleBackButton({
  onClick,
  disabled,
}: {
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || !onClick}
      aria-label="Back"
      className={`crcle-glass-btn relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-[40px] p-1 backdrop-blur-[12px] transition hover:brightness-110 ${
        onClick && !disabled ? "" : "opacity-40"
      }`}
    >
      <div className="dock-glass-lens opacity-40" aria-hidden />
      <span className="relative z-[1] flex size-8 items-center justify-center">
        <img
          alt=""
          src={arrowLeftIcon}
          className="h-[13px] w-[8px] max-w-none object-contain brightness-0 [.crcle-phone:not(.crcle-phone--light)_&]:invert"
          draggable={false}
        />
      </span>
    </button>
  );
}

/** Standardized more (⋯) control — frosted glass + blur */
export function CrcleMoreButton({
  onClick,
  expanded,
}: {
  onClick?: () => void;
  expanded?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      aria-expanded={expanded}
      aria-label="More options"
      className="crcle-glass-btn relative flex h-10 w-12 shrink-0 items-center justify-center overflow-hidden rounded-[24px] px-2 py-0.5 backdrop-blur-[12px] transition hover:brightness-110"
    >
      <div className="dock-glass-lens opacity-40" aria-hidden />
      <span className="relative z-[1] flex size-8 items-center justify-center">
        <span className="relative size-6">
          <img
            alt=""
            src={moreHorizIcon}
            className="absolute inset-0 size-full max-w-none object-contain brightness-0 [.crcle-phone:not(.crcle-phone--light)_&]:invert"
            draggable={false}
          />
          <span className="absolute inset-[41.67%_16.67%]">
            <img
              alt=""
              src={moreDotsIcon}
              className="size-full max-w-none object-contain brightness-0 [.crcle-phone:not(.crcle-phone--light)_&]:invert"
              draggable={false}
            />
          </span>
        </span>
      </span>
    </button>
  );
}
