import { AnimatePresence, motion } from "framer-motion";
import { useState, type ReactNode } from "react";
import locusCinemaIcon from "@/assets/crcle/locus/cinema.svg";
import locusCloseIcon from "@/assets/crcle/locus/close-x.svg";
import locusCoffeeIcon from "@/assets/crcle/locus/coffee.svg";
import locusCrosshairIcon from "@/assets/crcle/locus/crosshair.svg";
import locusDinnerAIcon from "@/assets/crcle/locus/dinner-a.svg";
import locusDinnerBIcon from "@/assets/crcle/locus/dinner-b.svg";
import locusIcecreamAIcon from "@/assets/crcle/locus/icecream-a.svg";
import locusIcecreamBIcon from "@/assets/crcle/locus/icecream-b.svg";
import locusMoonAccentIcon from "@/assets/crcle/locus/moon-accent.svg";
import locusMoonFilledIcon from "@/assets/crcle/locus/moon-filled.svg";
import locusPinIcon from "@/assets/crcle/locus/pin.svg";
import locusPinRedIcon from "@/assets/crcle/locus/pin-red.svg";
import locusPinSmIcon from "@/assets/crcle/locus/pin-sm.svg";
import locusPizzaIcon from "@/assets/crcle/locus/pizza.svg";
import locusPlusIcon from "@/assets/crcle/locus/plus.svg";
import locusRainFillIcon from "@/assets/crcle/locus/rain-fill.svg";
import locusSendLightIcon from "@/assets/crcle/locus/send-light.svg";
import locusSunDuotoneIcon from "@/assets/crcle/locus/sun-duotone.svg";
import locusSunFillIcon from "@/assets/crcle/locus/sun-fill.svg";
import locusThumbsUpIcon from "@/assets/crcle/locus/thumbs-up.svg";

const FONT = "Montserrat, ui-sans-serif, system-ui, sans-serif";
const EASE = [0.22, 1, 0.36, 1] as const;

export type LocusActivityId = "cinema" | "icecream" | "pizza" | "coffee" | "dinner";
export type LocusWhen = "Today" | "Tonight" | "Tomorrow" | "Fri" | "Sat" | "Sun" | "Later…";
export type LocusTimeOfDay = "morning" | "afternoon" | "evening";
export type LocusTab = "intent" | "venue";

export type LocusSignalPayload = {
  activityId: LocusActivityId;
  activityLabel: string;
  when: LocusWhen;
  timeOfDay: LocusTimeOfDay;
  location: string;
};

const ACTIVITIES: {
  id: LocusActivityId;
  label: string;
  icon: ReactNode;
}[] = [
  {
    id: "cinema",
    label: "Cinema",
    icon: (
      <span className="relative block size-6 shrink-0">
        <span className="absolute inset-[7.35%_12.5%_6.25%_11.08%]">
          <img
            alt=""
            src={locusCinemaIcon}
            className="absolute inset-0 size-full max-w-none object-contain brightness-0 invert"
            draggable={false}
          />
        </span>
      </span>
    ),
  },
  {
    id: "icecream",
    label: "Icecream",
    icon: (
      <span className="relative block size-6 shrink-0">
        <span className="absolute inset-[3.12%_15.62%_31.24%_15.63%]">
          <img
            alt=""
            src={locusIcecreamAIcon}
            className="absolute inset-0 size-full max-w-none object-contain brightness-0 invert"
            draggable={false}
          />
        </span>
        <span className="absolute inset-[56.55%_32.02%_3.13%_38.63%]">
          <img
            alt=""
            src={locusIcecreamBIcon}
            className="absolute inset-0 size-full max-w-none object-contain brightness-0 invert"
            draggable={false}
          />
        </span>
      </span>
    ),
  },
  {
    id: "pizza",
    label: "Pizza",
    icon: (
      <span className="relative block size-6 shrink-0">
        <span className="absolute inset-[8.33%_8.71%_8.08%_20.83%]">
          <img
            alt=""
            src={locusPizzaIcon}
            className="absolute inset-0 size-full max-w-none object-contain brightness-0 invert"
            draggable={false}
          />
        </span>
      </span>
    ),
  },
  {
    id: "coffee",
    label: "Coffee",
    icon: (
      <span className="relative block size-6 shrink-0">
        <span className="absolute inset-[8.33%_12.5%]">
          <img
            alt=""
            src={locusCoffeeIcon}
            className="absolute inset-0 size-full max-w-none object-contain brightness-0 invert"
            draggable={false}
          />
        </span>
      </span>
    ),
  },
  {
    id: "dinner",
    label: "Dinner",
    icon: (
      <span className="relative block size-6 shrink-0">
        <span className="absolute inset-[3.12%_3.12%_3.15%_4.49%]">
          <img
            alt=""
            src={locusDinnerAIcon}
            className="absolute inset-0 size-full max-w-none object-contain brightness-0 invert"
            draggable={false}
          />
        </span>
        <span className="absolute inset-[61.24%_55.79%_3.12%_3.14%]">
          <img
            alt=""
            src={locusDinnerBIcon}
            className="absolute inset-0 size-full max-w-none object-contain brightness-0 invert"
            draggable={false}
          />
        </span>
      </span>
    ),
  },
];

const WHEN_OPTIONS: LocusWhen[] = [
  "Today",
  "Tonight",
  "Tomorrow",
  "Fri",
  "Sat",
  "Sun",
  "Later…",
];

const TIME_OPTIONS: {
  id: LocusTimeOfDay;
  label: string;
  icon: string;
  leafClass: string;
}[] = [
  {
    id: "morning",
    label: "Morning",
    icon: locusSunDuotoneIcon,
    leafClass: "absolute inset-[4.17%] size-[91.66%] max-w-none object-contain",
  },
  {
    id: "afternoon",
    label: "Afternoon",
    icon: locusSunFillIcon,
    leafClass: "absolute inset-0 size-full max-w-none object-contain",
  },
  {
    id: "evening",
    label: "Evening",
    /* Crescent mass sits bottom-right — nudge up + left for optical center */
    icon: locusMoonFilledIcon,
    leafClass:
      "absolute left-1/2 top-1/2 size-[83%] max-w-none -translate-x-[58%] -translate-y-[56%] object-contain",
  },
];

type TheLocusDrawerProps = {
  open: boolean;
  onClose: () => void;
  onSendSignal: (payload: LocusSignalPayload) => void;
};

export function TheLocusDrawer({ open, onClose, onSendSignal }: TheLocusDrawerProps) {
  const [tab, setTab] = useState<LocusTab>("intent");
  const [activityId, setActivityId] = useState<LocusActivityId | null>(null);
  const [when, setWhen] = useState<LocusWhen>("Tonight");
  const [timeOfDay, setTimeOfDay] = useState<LocusTimeOfDay>("evening");
  const [location, setLocation] = useState("Nearby café");

  const selectActivity = (id: LocusActivityId) => {
    setActivityId(id);
    setTab("venue");
  };

  const handleSend = () => {
    const activity = ACTIVITIES.find((a) => a.id === activityId) ?? ACTIVITIES[1];
    onSendSignal({
      activityId: activity.id,
      activityLabel: activity.label === "Icecream" ? "Ice cream" : activity.label,
      when,
      timeOfDay,
      location: location.trim() || "Nearby café",
    });
    setTab("intent");
    setActivityId(null);
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: EASE }}
          /* Keep transform out of the layer tree so backdrop-filter can sample chat */
          transformTemplate={() => ""}
          className="absolute bottom-[108px] right-[11px] z-40 flex w-[min(327px,calc(100%-1.5rem))] flex-col items-end gap-[9px]"
          role="dialog"
          aria-label="The Locus"
        >
          {/* Figma 781:207205 — Signal Panel Dark sheet; fixed height Intent/Venue */}
          <div className="crcle-locus-sheet flex h-[386px] w-full flex-col">
            <div className="crcle-locus-frost" aria-hidden />
            <div className="crcle-locus-header relative z-[1] flex w-full shrink-0 items-center justify-center gap-2 rounded-tl-[32px] rounded-tr-[32px] py-3">
              <span className="relative z-[1] size-6 shrink-0">
                <span className="absolute inset-[12.5%]">
                  <img
                    alt=""
                    src={locusCrosshairIcon}
                    className="absolute inset-[-5.56%] size-[111.12%] max-w-none"
                    draggable={false}
                  />
                </span>
              </span>
              <p
                className="relative z-[1] whitespace-nowrap text-[19px] font-normal leading-[1.4] text-[#f7f6f2]"
                style={{ fontFamily: FONT }}
              >
                The Locus
              </p>
            </div>

            <div className="crcle-locus-body flex min-h-0 w-full flex-1 flex-col items-center rounded-bl-[36px] rounded-br-[36px] p-3">
              <div className="flex h-full w-full flex-col items-end gap-4">
                <div className="flex w-full shrink-0 flex-col items-center">
                  <div className="crcle-locus-tabs flex w-[173px] items-center gap-1 rounded-[24px] p-1">
                    <button
                      type="button"
                      onClick={() => setTab("intent")}
                      className={`relative z-[1] flex flex-1 items-center justify-center rounded-[40px] px-2.5 py-1 text-center text-[11px] leading-[1.4] transition ${
                        tab === "intent"
                          ? "bg-[rgba(247,246,242,0.2)] text-[#f7f6f2]"
                          : "text-[#f7f6f2]"
                      }`}
                      style={{ fontFamily: FONT }}
                    >
                      Intent
                    </button>
                    <button
                      type="button"
                      onClick={() => setTab("venue")}
                      className={`relative z-[1] flex flex-1 items-center justify-center gap-1 rounded-[20px] p-1 text-center text-[11px] leading-[1.4] transition ${
                        tab === "venue"
                          ? "bg-[rgba(247,246,242,0.2)] text-white"
                          : "text-white"
                      }`}
                      style={{ fontFamily: FONT }}
                    >
                      {tab === "venue" ? (
                        <img
                          alt=""
                          src={locusPinSmIcon}
                          className="size-2.5 shrink-0 object-contain"
                          draggable={false}
                        />
                      ) : null}
                      Venue
                    </button>
                  </div>
                </div>

                {tab === "intent" ? (
                  <div className="flex min-h-0 w-full flex-1 items-end justify-end">
                    <div className="flex items-center gap-[11px]">
                      {/* Figma 781:207220 — labels use 36px gap, not 44px chip rows */}
                      <div
                        className="flex w-[62px] flex-col gap-9 text-[13px] font-medium leading-[1.4] text-white"
                        style={{ fontFamily: FONT }}
                      >
                        {ACTIVITIES.map((a) => (
                          <button
                            key={a.id}
                            type="button"
                            onClick={() => selectActivity(a.id)}
                            className={`w-full text-left transition ${
                              activityId === a.id ? "text-[#f7f6f2]" : "text-white hover:text-[#f7f6f2]"
                            }`}
                            style={{ fontFamily: FONT }}
                          >
                            {a.label}
                          </button>
                        ))}
                      </div>

                      <div className="crcle-locus-rail flex flex-col items-start justify-center gap-[11px] rounded-[36px] p-2">
                        {ACTIVITIES.map((a) => {
                          const active = activityId === a.id;
                          return (
                            <button
                              key={a.id}
                              type="button"
                              aria-label={a.label}
                              onClick={() => selectActivity(a.id)}
                              className={`crcle-locus-chip relative z-[1] flex items-center justify-center rounded-[24px] p-2.5 transition ${
                                active ? "is-active" : "hover:bg-white/10"
                              }`}
                            >
                              <span className="relative z-[1]">{a.icon}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex min-h-0 w-full flex-1 flex-col justify-between gap-2.5">
                    <div className="flex w-full flex-col gap-2.5">
                      <p
                        className="text-[11px] font-semibold leading-[1.4] text-[rgba(247,246,242,0.5)]"
                        style={{ fontFamily: FONT }}
                      >
                        WHEN
                      </p>
                      <div className="flex h-[30.5px] w-full items-start gap-1.5 overflow-x-auto overflow-y-hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        {WHEN_OPTIONS.map((option) => {
                          const active = when === option;
                          const muted = option === "Sun" || option === "Later…";
                          return (
                            <button
                              key={option}
                              type="button"
                              onClick={() => setWhen(option)}
                              className={`flex h-full shrink-0 flex-col items-center justify-center rounded-full px-3 py-1.5 text-center text-[11px] font-medium leading-[16.5px] transition ${
                                active
                                  ? "bg-[#f7f6f2] text-[#02031d] shadow-[0_0_5px_rgba(59,130,246,0.2)]"
                                  : muted
                                    ? "border border-[rgba(255,255,255,0.08)] bg-white/[0.05] text-[rgba(247,246,242,0.4)]"
                                    : "border border-[rgba(255,255,255,0.08)] bg-white/[0.05] text-[rgba(247,246,242,0.8)]"
                              }`}
                              style={{ fontFamily: FONT }}
                            >
                              {option}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex w-full flex-col gap-2.5">
                      <p
                        className="text-[11px] font-semibold leading-[1.4] text-[rgba(247,246,242,0.5)]"
                        style={{ fontFamily: FONT }}
                      >
                        IN THE
                      </p>
                      <div className="flex w-full items-center justify-center gap-2.5">
                        {TIME_OPTIONS.map((option) => {
                          const active = timeOfDay === option.id;
                          return (
                            <button
                              key={option.id}
                              type="button"
                              aria-label={option.label}
                              onClick={() => setTimeOfDay(option.id)}
                              className={`crcle-locus-chip crcle-locus-chip--glass relative flex items-center justify-center rounded-[24px] p-2.5 transition ${
                                active ? "is-active" : ""
                              }`}
                            >
                              <span className="relative z-[1] block size-6 shrink-0">
                                <img
                                  alt=""
                                  src={option.icon}
                                  className={option.leafClass}
                                  draggable={false}
                                />
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex w-full flex-col gap-2.5">
                      <p
                        className="text-[11px] font-semibold leading-[1.4] text-[rgba(247,246,242,0.5)]"
                        style={{ fontFamily: FONT }}
                      >
                        AT
                      </p>
                      <div className="flex h-[56px] w-full items-center gap-1.5 rounded-[36px] border border-[rgba(247,246,242,0.1)] bg-white/10 pl-3 pr-0.5">
                        <img
                          alt=""
                          src={locusPinIcon}
                          className="size-4 shrink-0 object-contain"
                          draggable={false}
                        />
                        <input
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className="min-w-0 flex-1 bg-transparent text-[13px] leading-[1.4] text-[rgba(247,246,242,0.7)] outline-none placeholder:text-[rgba(247,246,242,0.45)]"
                          style={{ fontFamily: FONT }}
                          placeholder="Nearby café"
                        />
                        <button
                          type="button"
                          aria-label="Send Signal"
                          onClick={handleSend}
                          className="crcle-locus-chip crcle-locus-chip--glass relative flex size-[52px] shrink-0 items-center justify-center rounded-[26px] transition hover:brightness-110"
                        >
                          {/* Paper-plane mass pulls NE — nudge SW for optical center */}
                          <img
                            alt=""
                            src={locusSendLightIcon}
                            className="relative z-[1] size-7 max-w-none -translate-x-[1.5px] translate-y-[1.5px] object-contain"
                            draggable={false}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Close — Figma 781:207237 */}
          <button
            type="button"
            aria-label="Close The Locus"
            onClick={onClose}
            className="crcle-glass-btn crcle-glass-btn--frost relative flex h-10 w-[60px] shrink-0 items-center justify-center overflow-hidden rounded-[24px] px-2 py-0.5 transition hover:brightness-110"
          >
            <div className="dock-glass-lens opacity-40" aria-hidden />
            <span className="relative z-[1] flex size-8 items-center justify-center">
              <img alt="" src={locusCloseIcon} className="size-6 max-w-none object-contain" draggable={false} />
            </span>
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export type SignalCardStatus = "pending" | "accepted" | "raincheck";

export type SignalCardModel = LocusSignalPayload & {
  id: string;
  status: SignalCardStatus;
};

const TIME_GLYPH: Record<
  LocusTimeOfDay,
  { icon: string; leafClass: string }
> = {
  morning: {
    icon: locusSunDuotoneIcon,
    leafClass: "absolute inset-[4.17%] size-[91.66%] max-w-none",
  },
  afternoon: {
    icon: locusSunFillIcon,
    leafClass: "absolute inset-0 size-full max-w-none",
  },
  evening: {
    icon: locusMoonAccentIcon,
    /* Crescent mass sits bottom-right — nudge up + left for optical center */
    leafClass:
      "absolute left-1/2 top-1/2 size-[83%] max-w-none -translate-x-[58%] -translate-y-[56%] object-contain",
  },
};

export function SignalCard({
  signal,
  onAccept,
  onRaincheck,
  onCounterPropose,
}: {
  signal: SignalCardModel;
  onAccept: () => void;
  onRaincheck: () => void;
  onCounterPropose: () => void;
}) {
  const [showActions, setShowActions] = useState(false);
  const [counterText, setCounterText] = useState("Try tomorrow instead?");
  const activity = ACTIVITIES.find((a) => a.id === signal.activityId) ?? ACTIVITIES[1];
  const timeGlyph = TIME_GLYPH[signal.timeOfDay];
  const prompt = `Up for ${signal.activityLabel} ${signal.when.toLowerCase()}?`;

  return (
    <div
      className="relative flex w-full max-w-[284px] flex-col items-start gap-1 self-start"
      onMouseEnter={() => signal.status === "pending" && setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <AnimatePresence initial={false}>
        {showActions && signal.status === "pending" ? (
          <motion.div
            initial={{ opacity: 0, y: 4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: 2, height: 0 }}
            transition={{ duration: 0.18 }}
            className="overflow-hidden"
          >
            <div className="dock-glass relative flex h-14 items-center gap-3 overflow-hidden rounded-[56px] border border-white/15 bg-white/5 p-3 shadow-2xl backdrop-blur-sm">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-0 rounded-[56px] bg-gradient-to-b from-white/12 via-transparent to-transparent"
              />
              <div className="dock-glass-lens z-0 opacity-25" aria-hidden />
              {/* Figma 984:85497 — thumbs-up + rain */}
              <button
                type="button"
                aria-label="I'm down"
                onClick={onAccept}
                className="relative z-[1] flex size-8 shrink-0 items-center justify-center rounded-full transition hover:bg-white/10"
                title="I'm down"
              >
                <span className="absolute inset-[1.75%_9.57%_0_12.5%]">
                  <img
                    alt=""
                    src={locusThumbsUpIcon}
                    className="absolute inset-0 size-full max-w-none"
                    draggable={false}
                  />
                </span>
              </button>
              <button
                type="button"
                aria-label="Raincheck"
                onClick={onRaincheck}
                className="relative z-[1] flex size-8 shrink-0 items-center justify-center rounded-full transition hover:bg-white/10"
                title="Raincheck"
              >
                <span className="absolute inset-[16.65%_12.5%_12.5%_12.5%]">
                  <img
                    alt=""
                    src={locusRainFillIcon}
                    className="absolute inset-0 size-full max-w-none"
                    draggable={false}
                  />
                </span>
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Figma 769:205972 — signal panel */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => signal.status === "pending" && setShowActions((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            if (signal.status === "pending") setShowActions((v) => !v);
          }
        }}
        className="crcle-signal-card flex w-full cursor-pointer flex-col gap-6 rounded-tl-[36px] rounded-tr-[36px] rounded-br-[36px] rounded-bl-[4px] p-4 text-left transition"
      >
        <div className="flex w-full items-start justify-between">
          <span className="relative block size-6 shrink-0">{activity.icon}</span>
          <span className="relative block size-6 shrink-0">
            <span className="absolute inset-[12.5%]">
              <img
                alt=""
                src={locusCrosshairIcon}
                className="absolute inset-[-5.56%] size-[111.12%] max-w-none"
                draggable={false}
              />
            </span>
          </span>
        </div>

        <div className="flex w-full flex-col gap-3">
          <p
            className="w-full text-[16px] font-semibold leading-[1.4] text-[#f7f6f2]"
            style={{ fontFamily: FONT }}
          >
            {prompt}
          </p>

          <div className="flex w-full -translate-y-[10px] items-center justify-center gap-2">
            <span className="crcle-glass-btn relative flex size-[44px] shrink-0 items-center justify-center overflow-hidden rounded-[24px]">
              <img
                alt=""
                src={timeGlyph.icon}
                className={`relative z-[1] size-6 max-w-none object-contain ${
                  signal.timeOfDay === "evening"
                    ? "-translate-x-0.5 -translate-y-px"
                    : ""
                }`}
                draggable={false}
              />
            </span>

            <div className="crcle-glass-btn flex h-[50px] min-w-0 flex-1 items-center gap-1.5 overflow-hidden rounded-[24px] py-1 pl-3 pr-1">
              <img
                alt=""
                src={locusPinRedIcon}
                className="relative z-[1] size-4 shrink-0 object-contain"
                draggable={false}
              />
              <span
                className="relative z-[1] min-w-0 flex-1 truncate text-[13px] leading-[1.4] text-[rgba(247,246,242,0.85)]"
                style={{ fontFamily: FONT }}
              >
                {signal.location}
              </span>
              <button
                type="button"
                aria-label="Respond to signal"
                aria-expanded={showActions}
                disabled={signal.status !== "pending"}
                onClick={(e) => {
                  e.stopPropagation();
                  if (signal.status === "pending") setShowActions((v) => !v);
                }}
                className="crcle-glass-btn relative z-[1] flex size-[42px] shrink-0 items-center justify-center overflow-hidden rounded-[24px] transition hover:brightness-110 disabled:opacity-50"
              >
                <img
                  alt=""
                  src={locusPlusIcon}
                  className="relative z-[1] size-5 max-w-none"
                  draggable={false}
                />
              </button>
            </div>
          </div>
        </div>

        {signal.status === "accepted" ? (
          <div className="flex w-full justify-center border-t border-white/10 pt-3">
            <div
              className="crcle-glass-btn crcle-glass-btn--success relative flex h-10 items-center justify-center gap-2 overflow-hidden rounded-full px-4"
              aria-label="You're in"
            >
              <div className="dock-glass-lens opacity-35" aria-hidden />
              <span className="relative z-[1] size-5 shrink-0">
                <span className="absolute inset-[1.75%_9.57%_0_12.5%]">
                  <img
                    alt=""
                    src={locusThumbsUpIcon}
                    className="absolute inset-0 size-full max-w-none brightness-0 invert"
                    draggable={false}
                  />
                </span>
              </span>
              <span
                className="relative z-[1] text-[13px] font-medium text-[#0fc950]"
                style={{ fontFamily: FONT }}
              >
                You&apos;re In
              </span>
            </div>
          </div>
        ) : null}

        {signal.status === "raincheck" ? (
          <div
            className="flex items-center gap-2 border-t border-white/10 pt-3"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              value={counterText}
              onChange={(e) => setCounterText(e.target.value)}
              className="min-w-0 flex-1 rounded-full border border-white/10 bg-white/5 px-3 py-2.5 text-[13px] text-[#f7f6f2] outline-none"
              style={{ fontFamily: FONT }}
              placeholder="Try tomorrow instead?"
            />
            <button
              type="button"
              aria-label="Send counter-proposal"
              onClick={onCounterPropose}
              className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#f7f6f2]"
            >
              <img
                alt=""
                src={locusSendLightIcon}
                className="size-5 max-w-none -translate-x-[1.5px] translate-y-[1.5px] object-contain"
                draggable={false}
              />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
