import calculatorBackspaceIcon from "@/assets/portfolio/calculator-backspace.svg";

const FONT = "Montserrat, ui-sans-serif, system-ui, sans-serif";

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

/** Figma 1394:214995 — decorative A.RA calculator card at 50% scale. */
export function PortfolioCalculatorCard() {
  return (
    <div
      aria-hidden
      className="pointer-events-none relative size-[201px] shrink-0 select-none"
      data-name="calculator-card"
    >
      <div className="absolute left-0 top-0 origin-top-left scale-50">
        <div
          className="flex size-[402px] flex-col justify-between rounded-[48px] border border-[rgba(15,201,80,0.2)] bg-gradient-to-b from-[rgba(78,171,149,0.4)] to-[rgba(15,201,80,0.24)] p-6 shadow-[0_18px_48px_rgba(29,59,81,0.18)]"
          style={{ fontFamily: FONT }}
        >
          <div className="flex w-full items-center justify-end gap-2.5 rounded-[24px] border border-[#1ab5ac] px-3 pb-2">
            <p className="text-right text-[56px] font-light leading-none text-[#1d3b51]">A.RA</p>
            <div className="flex size-6 shrink-0 items-center justify-center opacity-80">
              <img alt="" src={calculatorBackspaceIcon} className="size-5" draggable={false} />
            </div>
          </div>

          <div className="flex w-full flex-col gap-3">
            {KEY_ROWS.map((row, rowIndex) => (
              <div key={rowIndex} className="flex w-full items-start justify-between">
                {row.map((key) => (
                  <div
                    key={key.label}
                    className={
                      "flex size-[54px] shrink-0 items-center justify-center rounded-[27px] border text-center text-[#f7f6f2] " +
                      (key.operator
                        ? "border-[#4eab95] bg-[rgba(29,59,81,0.8)] text-[20px] font-normal"
                        : key.accent
                          ? "border-[rgba(15,201,80,0.2)] bg-transparent text-[20px] font-normal"
                          : "border-[rgba(255,255,255,0.38)] bg-transparent " +
                            (key.label === "AC" ? "text-[16px] font-medium" : "text-[20px] font-normal"))
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
