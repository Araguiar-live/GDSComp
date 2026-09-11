import { AnimatePresence, motion } from "framer-motion";
import chevronUpIcon from "@/assets/crcle/signal-home/menu/chevron-up.svg";
import resetIcon from "@/assets/crcle/signal-home/menu/reset.svg";
import settingsIcon from "@/assets/crcle/signal-home/menu/settings.svg";
import sharecodeIcon from "@/assets/crcle/signal-home/menu/sharecode.svg";
import userIcon from "@/assets/crcle/signal-home/menu/user.svg";
import navRadarIcon from "@/assets/crcle/nav-radar.svg";
import securitySafeIcon from "@/assets/crcle/security-safe.svg";

const FONT = "Montserrat, ui-sans-serif, system-ui, sans-serif";
const EASE = [0.22, 1, 0.36, 1] as const;

/** Figma 257:64922 — Signal Home more menu (incognito / signal controls). */
export function CrcleSignalMoreMenu({
  onClose,
  signalOff,
  radarOff,
  panelExpanded,
  onTogglePanel,
  onToggleSignalOff,
  onToggleRadarOff,
  onSetIntentDefault,
  onEditProfile,
  onVerification,
  onSettings,
  onSharecode,
}: {
  onClose: () => void;
  signalOff: boolean;
  radarOff: boolean;
  panelExpanded: boolean;
  onTogglePanel: () => void;
  onToggleSignalOff: () => void;
  onToggleRadarOff: () => void;
  onSetIntentDefault?: () => void;
  onEditProfile?: () => void;
  onVerification?: () => void;
  onSettings?: () => void;
  onSharecode?: () => void;
}) {
  return (
    <>
      <motion.button
        type="button"
        aria-label="Close menu"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 z-[65] bg-black/20"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, y: -6, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -6, scale: 0.97 }}
        transition={{ duration: 0.22, ease: EASE }}
        className="absolute right-3 top-[148px] z-[70] flex w-[180px] flex-col gap-3 rounded-[24px] border border-[rgba(0,0,0,0.25)] bg-[rgba(247,246,242,0.6)] px-3 py-3.5 backdrop-blur-[6px]"
        role="menu"
        aria-label="Signal options"
      >
        <div className="flex flex-col gap-2 rounded-[12px] bg-[rgba(2,3,29,0.6)] p-2">
          <div className="flex h-[22px] items-center justify-between gap-2">
            <MenuToggle active={signalOff} onChange={onToggleSignalOff} ariaLabel="Turn signal off" />
            <button
              type="button"
              onClick={onTogglePanel}
              className="flex min-w-0 flex-1 items-center justify-between gap-1"
            >
              <span
                className="text-[11px] font-medium leading-none text-[#f7f6f2]"
                style={{ fontFamily: FONT }}
              >
                Turn signal off
              </span>
              <img
                alt=""
                src={chevronUpIcon}
                className={`size-3 shrink-0 max-w-none object-contain transition-transform ${
                  panelExpanded ? "" : "rotate-180"
                }`}
                draggable={false}
              />
            </button>
          </div>

          <AnimatePresence initial={false}>
            {panelExpanded ? (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: EASE }}
                className="overflow-hidden"
              >
                <div className="mb-2 h-px bg-[rgba(247,246,242,0.15)]" />
                <div className="flex items-center gap-1.5">
                  <img
                    alt=""
                    src={navRadarIcon}
                    className="size-4 max-w-none object-contain brightness-0 invert"
                    draggable={false}
                  />
                  <span
                    className="flex-1 text-[11px] font-medium leading-none text-[#f7f6f2]"
                    style={{ fontFamily: FONT }}
                  >
                    Turn radar off
                  </span>
                  <MenuToggle active={radarOff} onChange={onToggleRadarOff} ariaLabel="Turn radar off" />
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        <MenuRow icon={resetIcon} label="Set Intent to default" onClick={onSetIntentDefault} />
        <MenuDivider />
        <MenuRow icon={userIcon} label="Edit profile" onClick={onEditProfile} />
        <MenuRow icon={securitySafeIcon} label="Verification" onClick={onVerification} />
        <MenuRow icon={settingsIcon} label="Settings" onClick={onSettings} />
        <MenuDivider />
        <MenuRow icon={sharecodeIcon} label="User Sharecode" onClick={onSharecode} />
      </motion.div>
    </>
  );
}

function MenuToggle({
  active,
  onChange,
  ariaLabel,
}: {
  active: boolean;
  onChange: () => void;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={active}
      aria-label={ariaLabel}
      onClick={(e) => {
        e.stopPropagation();
        onChange();
      }}
      className={`relative flex h-4 w-9 shrink-0 items-center rounded-full p-0.5 transition ${
        active ? "bg-[#11df59]" : "bg-[rgba(247,246,242,0.25)]"
      }`}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 520, damping: 32 }}
        className={`h-3 w-3 rounded-full bg-[#f7f6f2] ${active ? "" : "ml-auto"}`}
      />
    </button>
  );
}

function MenuRow({
  icon,
  label,
  onClick,
}: {
  icon: string;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      role="menuitem"
      onClick={onClick}
      className="flex w-full items-center gap-1.5 text-left transition hover:opacity-80"
    >
      <img alt="" src={icon} className="size-5 max-w-none shrink-0 object-contain" draggable={false} />
      <span
        className="text-[11px] font-medium leading-none text-[#030422]"
        style={{ fontFamily: FONT }}
      >
        {label}
      </span>
    </button>
  );
}

function MenuDivider() {
  return <div className="h-px w-full bg-[rgba(2,3,29,0.08)]" aria-hidden />;
}

/** Figma 257:64908 — incognito confirmation bar on the photo card. */
export function IncognitoModeBanner({ onUndo }: { onUndo: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      transition={{ duration: 0.28, ease: EASE }}
      className="pointer-events-auto absolute inset-x-0 bottom-2 z-20 flex items-center gap-2 rounded-[36px] bg-[rgba(247,246,242,0.4)] p-2 backdrop-blur-[2px]"
    >
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <IncognitoSignalBars />
        <div className="min-w-0 flex-1 leading-[1.2]">
          <p className="text-[14px] font-medium text-[#f7f6f2]" style={{ fontFamily: FONT }}>
            Incognito Mode on
          </p>
          <p
            className="text-[11px] font-normal text-[rgba(247,246,242,0.7)]"
            style={{ fontFamily: FONT }}
          >
            You can still see others, but your signal won&apos;t appear on the public radar today.
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={onUndo}
        className="flex h-9 shrink-0 items-center justify-center rounded-[36px] bg-[#030426] px-4 py-2"
      >
        <span className="text-[13px] leading-[1.4] text-[#fefefe]" style={{ fontFamily: FONT }}>
          Undo
        </span>
      </button>
    </motion.div>
  );
}

function IncognitoSignalBars() {
  return (
    <div className="flex shrink-0 items-center gap-[2.7px]" aria-hidden>
      <span className="h-[10px] w-[5px] rounded-[4px] bg-[#f7f6f2]" />
      <span className="h-[17px] w-[5px] rounded-[4px] bg-[#f7f6f2]" />
      <span className="h-[10px] w-[5px] rounded-[4px] bg-[#f7f6f2]" />
    </div>
  );
}
