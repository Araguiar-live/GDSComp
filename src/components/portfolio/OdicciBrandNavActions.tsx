const ACCENT = "#FF5126";

/** Shared Brand Personality nav — used on all stages except colour / font. */
export function OdicciBrandNavActions({
  onBack,
  onContinue,
}: {
  onBack?: () => void;
  onContinue: () => void;
}) {
  return (
    <div className="flex w-full shrink-0 items-center justify-center gap-8">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          disabled={!onBack}
          className="w-[108px] rounded-[36px] border border-white/40 bg-[#d0d8e2] py-3 text-center text-[12px] leading-[1.2] text-[#646464] transition hover:brightness-95 disabled:opacity-40"
        >
          Go back
        </button>
        <button
          type="button"
          onClick={onContinue}
          className="w-[108px] rounded-[36px] border border-white/40 bg-transparent py-3 text-center text-[12px] leading-[1.2] text-white/80 transition hover:bg-white/10 hover:text-white"
        >
          Skip
        </button>
      </div>
      <button
        type="button"
        onClick={onContinue}
        className="w-[280px] rounded-[36px] py-3 text-center text-[12px] leading-[1.2] text-white transition hover:brightness-110"
        style={{ background: ACCENT }}
      >
        Continue
      </button>
    </div>
  );
}
