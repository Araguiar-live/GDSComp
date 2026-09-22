import { motion } from "framer-motion";
import dropPhoto from "@/assets/crcle/signal-home/drop-photo.png";
import qrCodeImg from "@/assets/crcle/signal-home/sharecode/qr-code.svg";
import shareAndroidIcon from "@/assets/crcle/signal-home/sharecode/share-android.svg";

const FONT = "Montserrat, ui-sans-serif, system-ui, sans-serif";
const EASE = [0.22, 1, 0.36, 1] as const;

/** Figma 257:86861 — User Sharecode overlay on Signal Home. */
export function CrcleUserSharecodeSheet({ onClose }: { onClose: () => void }) {
  return (
    <>
      <motion.button
        type="button"
        aria-label="Close sharecode"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 z-[75] bg-black/30 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.98 }}
        transition={{ duration: 0.28, ease: EASE }}
        className="absolute right-3 top-[118px] z-[80] flex h-[427px] w-[238px] flex-col justify-between rounded-[24px] border border-[rgba(0,0,0,0.25)] bg-[rgba(255,255,255,0.4)] p-3 backdrop-blur-[6px]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sharecode-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex w-full flex-col items-center gap-4">
          <div className="flex w-full items-start gap-2.5">
            <div className="size-8 shrink-0 overflow-hidden rounded-full border border-[#f7f6f2]">
              <img
                alt=""
                src={dropPhoto}
                className="size-full object-cover"
                draggable={false}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="min-w-0 flex-1 pt-0.5">
              <p
                className="text-[13px] font-medium leading-[19.5px] text-[#02031d]"
                style={{ fontFamily: FONT }}
              >
                Design Systems Lead
              </p>
              <p
                className="text-[11px] leading-[1.4] text-[rgba(0,0,0,0.6)]"
                style={{ fontFamily: FONT }}
              >
                The architect
              </p>
            </div>
          </div>

          <p
            id="sharecode-title"
            className="w-full text-center text-[19px] font-semibold leading-[1.4] text-[#02031d]"
            style={{ fontFamily: FONT }}
          >
            Sam Smith
          </p>

          <img
            alt="CRCLE share QR code"
            src={qrCodeImg}
            className="size-[176px] max-w-none object-contain"
            draggable={false}
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="flex w-full flex-col items-center gap-2">
          <p
            className="text-center text-[13px] leading-[1.4] text-[#030426]"
            style={{ fontFamily: FONT }}
          >
            Share this code with others to instantly connect on crcle
          </p>
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-[64px] bg-[#030426] px-[46px] py-2.5 transition hover:brightness-110"
          >
            <img
              alt=""
              src={shareAndroidIcon}
              className="size-4 max-w-none object-contain"
              draggable={false}
              loading="lazy"
              decoding="async"
            />
            <span
              className="text-[17px] leading-[25.5px] text-[#d9d9de]"
              style={{ fontFamily: FONT }}
            >
              Share
            </span>
          </button>
          <p
            className="text-center text-[8px] leading-[18px] text-[rgba(2,3,29,0.6)]"
            style={{ fontFamily: FONT }}
          >
            Crcle for iOS · Version 2.4.0
          </p>
        </div>
      </motion.div>
    </>
  );
}
