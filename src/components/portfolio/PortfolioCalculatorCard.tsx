import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import calculatorBackspaceIcon from "@/assets/portfolio/calculator-backspace.svg";

const FONT = "Montserrat, ui-sans-serif, system-ui, sans-serif";
const DISPLAY_TEXT = "A.RA";

const KEY_ROWS: { label: string; operator?: boolean; accent?: boolean }[][] = [
  [
    { label: "AC" },
    { label: "7" },
    { label: "8" },
    { label: "9" },
    { label: "÷", operator: true },
  ],
  [
    { label: "%" },
    { label: "4" },
    { label: "5" },
    { label: "6" },
    { label: "×", operator: true },
  ],
  [
    { label: "±" },
    { label: "1" },
    { label: "2" },
    { label: "3" },
    { label: "−", operator: true },
  ],
  [
    { label: "(|)", accent: true },
    { label: "0", accent: true },
    { label: "•", accent: true },
    { label: "=", accent: true },
    { label: "+", operator: true },
  ],
];

function useCalculatorDisplayText() {
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(DISPLAY_TEXT);

  useEffect(() => {
    if (reduceMotion) {
      setDisplay(DISPLAY_TEXT);
      return;
    }

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timer = setTimeout(() => resolve(), ms);
      });

    const run = async () => {
      const show = (value: string) => {
        if (!cancelled) setDisplay(value);
      };

      while (!cancelled) {
        show(DISPLAY_TEXT);
        await wait(2400);
        if (cancelled) break;

        for (let i = DISPLAY_TEXT.length; i >= 0; i -= 1) {
          if (cancelled) break;
          show(DISPLAY_TEXT.slice(0, i));
          await wait(110);
        }

        await wait(500);
        if (cancelled) break;

        for (let i = 0; i <= DISPLAY_TEXT.length; i += 1) {
          if (cancelled) break;
          show(DISPLAY_TEXT.slice(0, i));
          await wait(140);
        }
      }
    };

    void run();
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [reduceMotion]);

  return display;
}

/** Figma 1394:214995 — decorative A.RA calculator card at 50% scale. */
export function PortfolioCalculatorCard() {
  const displayText = useCalculatorDisplayText();

  return (
    <div
      aria-hidden
      className="pointer-events-none relative size-[201px] shrink-0 select-none"
      data-name="calculator-card"
    >
      <div className="absolute left-0 top-0 origin-top-left scale-50">
        <div
          className="relative flex size-[402px] flex-col justify-between overflow-hidden rounded-[48px] border border-zinc-400/45 bg-white/30 p-6 shadow-[0px_16px_24px_rgba(11,14,20,0.12),inset_0px_1px_0_rgba(255,255,255,0.55)] backdrop-blur-[14px] supports-[backdrop-filter]:bg-white/25"
          style={{ fontFamily: FONT }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[rgba(78,171,149,0.42)] to-[rgba(15,201,80,0.22)]"
          />
          <div className="relative z-[1] flex w-full items-center justify-end gap-2.5 rounded-[24px] border border-[#1ab5ac]/80 bg-white/20 px-3 pb-2 backdrop-blur-[8px]">
            <p className="min-w-[5ch] text-right text-[44.8px] font-light leading-none text-[#1d3b51] tabular-nums">
              {displayText}
            </p>
            <div className="flex size-6 shrink-0 items-center justify-center opacity-80">
              <img alt="" src={calculatorBackspaceIcon} className="size-5" draggable={false} />
            </div>
          </div>

          <div className="relative z-[1] flex w-full flex-col gap-3">
            {KEY_ROWS.map((row, rowIndex) => (
              <div key={rowIndex} className="flex w-full items-start justify-between">
                {row.map((key) => (
                  <div
                    key={key.label}
                    className={
                      "flex size-[54px] shrink-0 items-center justify-center rounded-[27px] border text-center text-[#f7f6f2] backdrop-blur-[6px] " +
                      (key.operator
                        ? "border-[#4eab95] bg-[rgba(29,59,81,0.72)] text-[16px] font-normal"
                        : key.accent
                          ? "border-[rgba(15,201,80,0.28)] bg-white/10 text-[16px] font-normal"
                          : "border-[rgba(255,255,255,0.38)] bg-white/10 " +
                            (key.label === "AC" ? "text-[12.8px] font-medium" : "text-[16px] font-normal"))
                    }
                  >
                    {key.label}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
