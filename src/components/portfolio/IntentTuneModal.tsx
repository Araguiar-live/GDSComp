import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import locusCloseIcon from "@/assets/crcle/locus/close-x.svg";
import radarFireIcon from "@/assets/crcle/onboarding/radar-fire.svg";
import radarHeartIcon from "@/assets/crcle/onboarding/radar-heart.svg";
import radarLaptopIcon from "@/assets/crcle/onboarding/radar-laptop.svg";
import radarYinIcon from "@/assets/crcle/onboarding/radar-yin.svg";
import signalDividerIcon from "@/assets/crcle/onboarding/signal-divider.svg";

const FONT = "Montserrat, ui-sans-serif, system-ui, sans-serif";
const EASE = [0.22, 1, 0.36, 1] as const;

export type IntentType = "seeker" | "romantic" | "balanced" | "builder";

const INTENTS = [
  {
    id: "seeker" as const,
    title: "The Seeker",
    subtitle: "Energy alignment",
    icon: radarFireIcon,
  },
  {
    id: "romantic" as const,
    title: "The Romantic",
    subtitle: "Love Oriented",
    icon: radarHeartIcon,
  },
  {
    id: "balanced" as const,
    title: "The Balanced",
    subtitle: "See what clicks",
    icon: radarYinIcon,
  },
  {
    id: "builder" as const,
    title: "The Builder",
    subtitle: "Network & grow",
    icon: radarLaptopIcon,
  },
] as const;

type IntentTuneModalProps = {
  open: boolean;
  onClose: () => void;
  onSave: (intent: IntentType) => void;
};

export function IntentTuneModal({ open, onClose, onSave }: IntentTuneModalProps) {
  const [selected, setSelected] = useState<IntentType>("romantic");

  const handleSave = () => {
    onSave(selected);
    onClose();
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: EASE }}
          className="absolute inset-0 z-[60] flex items-center justify-center overflow-hidden rounded-[53px] bg-gradient-to-b from-[rgba(0,0,0,0.01)] to-transparent backdrop-blur-[2px]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="intent-tune-title"
        >
          <button
            type="button"
            aria-label="Dismiss intent modal"
            className="absolute inset-0 cursor-default"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            transition={{ duration: 0.28, ease: EASE }}
            className="relative z-[1] mx-3 flex w-full max-w-[290px] flex-col overflow-hidden rounded-[24px] border border-[rgba(247,246,242,0.2)] bg-[rgba(2,3,29,0.4)] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] backdrop-blur-[10px]"
          >
            <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.1)] px-3 pb-[13px] pt-3">
              <span className="size-5 shrink-0 opacity-0" aria-hidden />
              <p
                id="intent-tune-title"
                className="min-w-0 flex-1 text-center text-[14px] font-medium leading-[1.4] text-white"
                style={{ fontFamily: FONT }}
              >
                Tune Intent
              </p>
              <button
                type="button"
                aria-label="Close"
                onClick={onClose}
                className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[rgba(255,255,255,0.1)]"
              >
                <img
                  alt=""
                  src={locusCloseIcon}
                  className="size-3 brightness-0 invert"
                  draggable={false}
                  loading="lazy"
                  decoding="async"
                />
              </button>
            </div>

            <div className="flex flex-col items-center justify-between gap-4 px-3 pb-4 pt-3">
              <img
                alt=""
                src={signalDividerIcon}
                className="h-2 w-[17px] max-w-none object-contain opacity-80"
                draggable={false}
                loading="lazy"
                decoding="async"
              />
              <p
                className="w-full text-center text-[11px] leading-[1.4] text-[#b1b1bc]"
                style={{ fontFamily: FONT }}
              >
                Define what you&apos;re seeking
              </p>

              <div className="grid w-full grid-cols-2 gap-3">
                {INTENTS.map((intent) => {
                  const isSelected = selected === intent.id;
                  return (
                    <button
                      key={intent.id}
                      type="button"
                      onClick={() => setSelected(intent.id)}
                      className={`flex flex-col items-center justify-between rounded-2xl border border-[rgba(247,246,242,0.4)] px-3 py-4 transition ${
                        isSelected ? "bg-[rgba(255,255,255,0.2)]" : "bg-transparent"
                      } ${intent.id === "balanced" || intent.id === "builder" ? "pt-6" : ""}`}
                    >
                      <img
                        alt=""
                        src={intent.icon}
                        className="size-6 shrink-0 object-contain brightness-0 invert"
                        draggable={false}
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="mt-2 w-full text-center leading-[1.2] text-[#f7f6f2]">
                        <p
                          className="text-[14px] font-semibold tracking-[0.4px]"
                          style={{ fontFamily: FONT }}
                        >
                          {intent.title}
                        </p>
                        <p className="text-[10px] tracking-[-0.15px]" style={{ fontFamily: FONT }}>
                          {intent.subtitle}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={handleSave}
                className="flex w-full items-center justify-center rounded-[36px] bg-[#f7f6f2] px-[46px] py-1.5"
              >
                <span
                  className="text-[16px] leading-[1.2] text-[#030426]"
                  style={{ fontFamily: FONT }}
                >
                  Save Intent
                </span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
