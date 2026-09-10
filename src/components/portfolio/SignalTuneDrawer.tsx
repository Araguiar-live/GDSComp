import { AnimatePresence, motion } from "framer-motion";
import {
  Camera,
  Coffee,
  Globe2,
  Heart,
  Leaf,
  Lightbulb,
  Music2,
  Palette,
  Sparkles,
  Dumbbell,
  UserRound,
  Venus,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import dropPhoto from "@/assets/crcle/signal-home/drop-photo.png";
import addIcon from "@/assets/crcle/signal-home/tune/add.svg";
import closeIcon from "@/assets/crcle/signal-home/tune/close.svg";
import handleIcon from "@/assets/crcle/signal-home/tune/handle.svg";

const FONT = "Montserrat, ui-sans-serif, system-ui, sans-serif";
const EASE = [0.22, 1, 0.36, 1] as const;

const INTERESTS = [
  { id: "lifestyle", label: "Lifestyle", icon: Coffee },
  { id: "creative", label: "Creative", icon: Palette },
  { id: "sports", label: "Sports", icon: Dumbbell },
  { id: "culture", label: "Culture", icon: Globe2 },
  { id: "knowledge", label: "Knowledge", icon: Lightbulb },
  { id: "nature", label: "Nature", icon: Leaf },
  { id: "music", label: "Music", icon: Music2 },
] as const;

const PRONOUNS = [
  "He/Him",
  "She/Her",
  "They/Them",
  "Custom",
  "Prefer not to say",
] as const;

const PREFERENCES = ["Men", "Women", "Both", "None"] as const;

const GENDERS = ["Male", "Female", "Non-binary", "Prefer not"] as const;

type SignalTuneDrawerProps = {
  open: boolean;
  onClose: () => void;
  onSave?: () => void;
  isLight?: boolean;
  /** Optional scene image to frost when backdrop-filter can't sample siblings. */
  backdropImage?: string;
};

export function SignalTuneDrawer({
  open,
  onClose,
  onSave,
  isLight = true,
  backdropImage = dropPhoto,
}: SignalTuneDrawerProps) {
  const [interests, setInterests] = useState<string[]>(["lifestyle", "creative", "sports"]);
  const [pronoun, setPronoun] = useState<string>("She/Her");
  const [preference, setPreference] = useState<string>("Women");
  const [genderIndex, setGenderIndex] = useState(1);

  const toggleInterest = (id: string) => {
    setInterests((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 7) return prev;
      return [...prev, id];
    });
  };

  const handleSave = () => {
    onSave?.();
    onClose();
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="signal-tune"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: EASE }}
          transformTemplate={() => ""}
          className="pointer-events-auto absolute inset-0 z-[60] flex flex-col justify-end overflow-hidden rounded-[53px]"
          style={{ clipPath: "inset(0 round 53px)" }}
          role="dialog"
          aria-modal="true"
          aria-label="Fine-tune your signal"
        >
          <button
            type="button"
            aria-label="Dismiss"
            className={`absolute inset-0 overflow-hidden rounded-[53px] backdrop-blur-[10px] [-webkit-backdrop-filter:blur(10px)] ${
              isLight ? "bg-[rgba(2,3,29,0.22)]" : "bg-[rgba(1,2,17,0.45)]"
            }`}
            onClick={onClose}
          />

          <motion.div
            initial={{ bottom: "-100%" }}
            animate={{ bottom: 0 }}
            exit={{ bottom: "-100%" }}
            transition={{ duration: 0.34, ease: EASE }}
            className={`crcle-tune-sheet absolute inset-x-0 bottom-0 z-[1] flex max-h-[min(92%,100%)] flex-col overflow-hidden rounded-t-[16px] rounded-b-[53px] border border-b-0 shadow-[0_-12px_40px_rgba(2,3,29,0.12)] ${
              isLight
                ? "border-[rgba(2,3,29,0.1)]"
                : "crcle-tune-sheet--dark border-[rgba(247,246,242,0.4)]"
            }`}
          >
            {isLight ? (
              <div className="crcle-tune-frost" aria-hidden>
                {backdropImage ? (
                  <img
                    alt=""
                    src={backdropImage}
                    className="absolute left-1/2 top-1/2 h-[140%] w-[140%] max-w-none -translate-x-1/2 -translate-y-1/2 scale-110 object-cover"
                    draggable={false}
                  />
                ) : null}
                <div className="absolute inset-0 bg-[rgba(247,246,242,0.35)]" />
              </div>
            ) : null}

            <div
              className={`relative z-[1] flex shrink-0 items-start gap-2 px-3 pb-3 pt-4 ${
                isLight
                  ? "border-b border-[rgba(2,3,29,0.1)] bg-[rgba(247,246,242,0.65)] backdrop-blur-[12px] [-webkit-backdrop-filter:blur(12px)]"
                  : "border-b border-[rgba(247,246,242,0.4)] bg-[rgba(2,2,23,0.8)] backdrop-blur-[2px] [-webkit-backdrop-filter:blur(2px)]"
              }`}
            >
              <img
                alt=""
                src={handleIcon}
                className={`pointer-events-none absolute left-1/2 top-[5px] h-[3px] w-[56px] -translate-x-1/2 max-w-none ${
                  isLight ? "" : "brightness-200"
                }`}
                draggable={false}
              />
              <div className="min-w-0 flex-1 pt-1">
                <p
                  className={`text-[16px] font-medium leading-none ${
                    isLight ? "text-[#02031d]" : "text-[#f7f6f2]"
                  }`}
                  style={{ fontFamily: FONT }}
                >
                  Fine-tune your signal
                </p>
                <p
                  className={`mt-0.5 text-[11px] leading-[1.2] tracking-[-0.15px] ${
                    isLight ? "text-[rgba(2,3,29,0.6)]" : "text-[rgba(247,246,242,0.6)]"
                  }`}
                  style={{ fontFamily: FONT }}
                >
                  {isLight
                    ? "Choose your lifestyle preferences below."
                    : "Finish your setup to choose how others view you."}
                </p>
              </div>
              <button
                type="button"
                aria-label="Close"
                onClick={onClose}
                className={`flex shrink-0 items-center justify-center rounded-full p-1 ${
                  isLight ? "bg-[rgba(2,3,29,0.05)]" : "bg-[rgba(247,246,242,0.05)]"
                }`}
              >
                <img
                  alt=""
                  src={closeIcon}
                  className={`size-4 max-w-none ${isLight ? "" : "brightness-0 invert"}`}
                  draggable={false}
                />
              </button>
            </div>

            <div
              className={`relative z-[1] flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto overscroll-contain px-3 py-4 ${
                isLight
                  ? "border-t border-[rgba(2,3,29,0.1)] bg-[rgba(247,246,242,0.45)] backdrop-blur-[18px] [-webkit-backdrop-filter:blur(18px)]"
                  : "border-t border-[rgba(247,246,242,0.4)] bg-[rgba(1,2,17,0.6)] backdrop-blur-[20px] [-webkit-backdrop-filter:blur(20px)]"
              }`}
            >
              <div className="flex flex-col items-center gap-4">
                <SignalBarsMini isLight={isLight} />
                <p
                  className={`w-full text-center text-[12px] font-medium uppercase leading-4 tracking-[0.3px] ${
                    isLight ? "text-[rgba(2,3,29,0.4)]" : "text-[#f7f6f2]"
                  }`}
                  style={{ fontFamily: FONT }}
                >
                  Choose How others view you
                </p>
              </div>

              <Section isLight={isLight} icon={<Sparkles className={`size-5 ${isLight ? "text-[rgba(2,3,29,0.8)]" : "text-[rgba(247,246,242,0.6)]"}`} strokeWidth={1.6} />} title="Interests" meta={`${interests.length}/7 SELECTED`}>
                <div className="flex flex-wrap gap-2">
                  {INTERESTS.map(({ id, label, icon: Icon }) => {
                    const selected = interests.includes(id);
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => toggleInterest(id)}
                        className={`flex items-center justify-center gap-1.5 rounded-3xl border py-2 pl-3 pr-4 transition ${
                          selected
                            ? isLight
                              ? "border-[rgba(177,177,188,0.2)] bg-[#02031d] text-[#d9d9de]"
                              : "border-[rgba(177,177,188,0.2)] bg-[rgba(247,246,242,0.8)] text-[#02031d]"
                            : isLight
                              ? "border-[rgba(177,177,188,0.2)] bg-[#f7f6f2] text-[#02031d]"
                              : "border-[rgba(255,255,255,0.2)] bg-[rgba(247,246,242,0.1)] text-[#f7f6f2]"
                        }`}
                      >
                        <Icon
                          className={`size-4 shrink-0 ${
                            selected
                              ? isLight
                                ? "text-[#d9d9de]"
                                : "text-[#02031d]"
                              : isLight
                                ? "text-[#02031d]"
                                : "text-[#f7f6f2]"
                          }`}
                          strokeWidth={1.75}
                          fill={selected && isLight ? "currentColor" : "none"}
                        />
                        <span className="whitespace-nowrap text-[11px] leading-[1.4]" style={{ fontFamily: FONT }}>
                          {label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </Section>

              <Section isLight={isLight} icon={<UserRound className={`size-3.5 ${isLight ? "text-[rgba(2,3,29,0.8)]" : "text-[rgba(247,246,242,0.6)]"}`} strokeWidth={1.75} />} title="Pronouns" meta="OPTIONAL">
                <div className="flex flex-wrap gap-2">
                  {PRONOUNS.map((p) => {
                    const selected = pronoun === p;
                    return (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setPronoun(p)}
                        className={`rounded-full px-4 py-2.5 text-[13px] font-medium leading-[19.5px] transition ${
                          selected
                            ? isLight
                              ? "bg-[#f7f6f2] text-[#030426]"
                              : "border border-[rgba(255,255,255,0.2)] bg-[rgba(247,246,242,0.2)] text-[#f7f6f2]"
                            : isLight
                              ? "border border-[rgba(255,255,255,0.2)] bg-[rgba(247,246,242,0.1)] text-[#02031d]"
                              : "border border-[rgba(255,255,255,0.2)] bg-[rgba(247,246,242,0.1)] text-[#f7f6f2]"
                        }`}
                        style={{ fontFamily: FONT }}
                      >
                        {p}
                      </button>
                    );
                  })}
                </div>
              </Section>

              <Section isLight={isLight} icon={<Heart className={`size-3.5 ${isLight ? "text-[rgba(2,3,29,0.8)]" : "text-[rgba(247,246,242,0.6)]"}`} strokeWidth={1.75} />} title="Preference" meta="OPTIONAL">
                <div className="flex w-full gap-2">
                  {PREFERENCES.map((pref) => {
                    const selected = preference === pref;
                    return (
                      <button
                        key={pref}
                        type="button"
                        onClick={() => setPreference(pref)}
                        className="flex flex-1 flex-col items-center gap-2"
                      >
                        <span className={`box-border flex h-9 w-full max-w-[80px] items-center justify-center rounded-full border-2 p-1 ${isLight ? "border-[#f7f6f2]" : "border-[#f7f6f2]"}`}>
                          <span className={`size-full rounded-full transition ${selected ? "bg-[#f7f6f2]" : "bg-transparent"}`} />
                        </span>
                        <span
                          className={`text-center text-[13px] font-medium leading-[19.5px] ${isLight ? "text-[#030426]" : "text-[#f7f6f2]"}`}
                          style={{ fontFamily: FONT }}
                        >
                          {pref}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </Section>

              <div className={`flex w-full items-start justify-between rounded-xl p-2 ${isLight ? "bg-[rgba(2,3,29,0.05)]" : "bg-[rgba(247,246,242,0.1)]"}`}>
                <div className="flex items-center gap-2">
                  <span className={`flex size-3.5 items-center justify-center rounded-[3px] border ${isLight ? "border-[rgba(2,3,29,0.45)]" : "border-[rgba(247,246,242,0.45)]"}`} />
                  <p
                    className={`whitespace-nowrap text-[13px] leading-[1.2] ${isLight ? "text-[rgba(2,3,29,0.8)]" : "text-[rgba(247,246,242,0.6)]"}`}
                    style={{ fontFamily: FONT }}
                  >
                    Gender
                  </p>
                </div>
                <div className="flex w-[100px] flex-col items-center gap-2">
                  <button
                    type="button"
                    aria-label={`Gender: ${GENDERS[genderIndex]}`}
                    onClick={() => setGenderIndex((i) => (i + 1) % GENDERS.length)}
                    className={`flex size-7 items-center justify-center rounded-[36px] pb-1 pt-1.5 ${isLight ? "bg-[#f7f6f2]" : "bg-transparent"}`}
                  >
                    <Venus className={`size-3.5 ${isLight ? "text-[#02031d]" : "text-[#f7f6f2]"}`} strokeWidth={2} />
                  </button>
                  <p
                    className={`w-full text-center text-[13px] font-medium leading-[19.5px] ${isLight ? "text-[#030426]" : "text-[#f7f6f2]"}`}
                    style={{ fontFamily: FONT }}
                  >
                    {GENDERS[genderIndex]}
                  </p>
                  <div className="flex items-center gap-2">
                    {GENDERS.map((_, i) => (
                      <span
                        key={GENDERS[i]}
                        className={`size-1 rounded-full ${
                          i === genderIndex
                            ? isLight
                              ? "bg-[#f7f6f2]"
                              : "bg-[#f7f6f2]"
                            : "bg-[#d9d9d9]"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p
                  className={`w-[60px] text-right text-[11px] leading-[1.2] ${isLight ? "text-[rgba(2,4,38,0.4)]" : "text-[rgba(247,246,242,0.4)]"}`}
                  style={{ fontFamily: FONT }}
                >
                  OPTIONAL
                </p>
              </div>

              <Section isLight={isLight} icon={<Camera className={`size-4 ${isLight ? "text-[rgba(2,3,29,0.8)]" : "text-[rgba(247,246,242,0.6)]"}`} strokeWidth={1.6} />} title="Gallery" meta="1/6 ADDED">
                <div className="flex gap-2 overflow-x-auto pb-0.5">
                  <div className={`relative size-[60px] shrink-0 overflow-hidden rounded-xl border p-[2px] ${isLight ? "border-[#f7f6f2]" : "border-[#f7f6f2]"}`}>
                    <img alt="" src={dropPhoto} className="absolute inset-0 size-full rounded-xl object-cover" draggable={false} />
                    <span className="absolute inset-0 rounded-xl bg-black/20" />
                  </div>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <button
                      key={`slot-${i}`}
                      type="button"
                      aria-label="Add photo"
                      className={`flex size-[60px] shrink-0 items-center justify-center rounded-xl ${
                        isLight ? "bg-[rgba(247,246,242,0.4)]" : "bg-[rgba(247,246,242,0.1)]"
                      }`}
                    >
                      <img
                        alt=""
                        src={addIcon}
                        className={`size-5 max-w-none ${isLight ? "" : "brightness-0 invert opacity-80"}`}
                        draggable={false}
                      />
                    </button>
                  ))}
                </div>
              </Section>

              <p
                className={`text-center text-[14px] leading-4 ${isLight ? "text-[rgba(2,3,29,0.6)]" : "text-[rgba(247,246,242,0.6)]"}`}
                style={{ fontFamily: FONT }}
              >
                Profiles with clear signals get 3x more meaningful connections
              </p>

              <div className="flex w-full items-center gap-2 px-1 pb-1">
                <div className={`relative h-1.5 flex-1 overflow-hidden rounded-full ${isLight ? "bg-[rgba(2,3,29,0.12)]" : "bg-[rgba(247,246,242,0.2)]"}`}>
                  <div className={`absolute inset-y-0 left-0 w-[32%] rounded-full ${isLight ? "bg-[#020426]" : "bg-[#f7f6f2]"}`} />
                  <span
                    className={`absolute left-[32%] top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_0_0_2px_#020426] ${
                      isLight ? "bg-[#f7f6f2]" : "bg-[#f7f6f2]"
                    }`}
                  />
                </div>
                <SignalBarsMini compact isLight={isLight} />
              </div>
            </div>

            <div
              className={`relative z-[1] shrink-0 border-t px-3 pb-8 pt-3 ${
                isLight
                  ? "border-[rgba(2,3,29,0.08)] bg-[rgba(247,246,242,0.55)] backdrop-blur-[14px] [-webkit-backdrop-filter:blur(14px)]"
                  : "border-[rgba(247,246,242,0.2)] bg-[rgba(1,2,17,0.6)] backdrop-blur-[20px] [-webkit-backdrop-filter:blur(20px)]"
              }`}
            >
              <button
                type="button"
                onClick={handleSave}
                className={`flex w-full items-center justify-center rounded-full px-9 py-2 ${
                  isLight ? "bg-[#02031d]" : "bg-[#f7f6f2]"
                }`}
              >
                <span
                  className={`text-[16px] leading-[1.2] tracking-[-0.44px] ${isLight ? "text-[#f7f6f2]" : "text-[#02031d]"}`}
                  style={{ fontFamily: FONT }}
                >
                  Save
                </span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function Section({
  icon,
  title,
  meta,
  children,
  isLight,
}: {
  icon: ReactNode;
  title: string;
  meta: string;
  children: ReactNode;
  isLight: boolean;
}) {
  return (
    <div className={`flex w-full flex-col gap-3 rounded-xl p-2 ${isLight ? "bg-[rgba(2,3,29,0.05)]" : "bg-[rgba(247,246,242,0.1)]"}`}>
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <p
            className={`whitespace-nowrap text-[13px] leading-[1.2] ${isLight ? "text-[rgba(2,3,29,0.8)]" : "text-[rgba(247,246,242,0.6)]"}`}
            style={{ fontFamily: FONT }}
          >
            {title}
          </p>
        </div>
        <p
          className={`whitespace-nowrap text-[11px] leading-[1.2] ${isLight ? "text-[rgba(2,3,29,0.4)]" : "text-[rgba(247,246,242,0.4)]"}`}
          style={{ fontFamily: FONT }}
        >
          {meta}
        </p>
      </div>
      {children}
    </div>
  );
}

function SignalBarsMini({ compact = false, isLight = true }: { compact?: boolean; isLight?: boolean }) {
  const active = isLight ? "bg-[#020426]" : "bg-[#f7f6f2]";
  const muted = isLight ? "bg-[rgba(2,4,38,0.2)]" : "bg-[rgba(2,4,38,0.2)]";

  if (compact) {
    return (
      <div className="flex shrink-0 items-end gap-[1.9px]" aria-hidden>
        <span className={`h-[7px] w-[3.5px] rounded-[3px] ${active}`} />
        <span className={`h-3 w-[3.8px] rounded-[3px] ${active}`} />
        <span className={`h-[7px] w-[3.5px] rounded-[3px] ${muted}`} />
      </div>
    );
  }
  return (
    <div className="flex items-center gap-[3.2px]" aria-hidden>
      <span className={`h-3 w-[6px] rounded-[5px] ${active}`} />
      <span className={`h-5 w-[6.4px] rounded-[5px] ${active}`} />
      <span className={`h-3 w-[6px] rounded-[5px] ${muted}`} />
    </div>
  );
}
