import { ChevronDown, Moon, Sun } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

/** Figma Odicci onboarding viewport (65:94009 and siblings). */
export const ODICCI_FRAME_W = 1512;
export const ODICCI_FRAME_H = 982;

const FONT = "Poppins, ui-sans-serif, system-ui, sans-serif";
const ACCENT = "#FF5126";

type Theme = "dark" | "light";

interface OdicciBrowserFrameProps {
  tabLabel: string;
  stepLabel?: string;
  url: string;
  canvasClassName?: string;
  theme?: Theme;
  onToggleTheme?: () => void;
  showThemeToggle?: boolean;
  toolbarExtra?: ReactNode;
  children: ReactNode;
}

/**
 * Shared carousel shell for every Odicci tab:
 * browser chrome + fixed 1512×982 artboard scaled uniformly (object-fit: contain).
 */
export function OdicciBrowserFrame({
  tabLabel,
  stepLabel = "V2",
  url,
  canvasClassName = "bg-[#ffe4e4]",
  theme = "dark",
  onToggleTheme,
  showThemeToggle = true,
  toolbarExtra,
  children,
}: OdicciBrowserFrameProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const isDark = theme === "dark";

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const update = () => {
      const { width, height } = el.getBoundingClientRect();
      setScale(Math.min(width / ODICCI_FRAME_W, height / ODICCI_FRAME_H));
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      className="relative w-full min-w-0 max-w-[980px] overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl shadow-black/40"
      style={{ fontFamily: FONT }}
    >
      {/* Title bar */}
      <div className="flex h-10 items-center border-b border-zinc-200 bg-white px-4">
        <div className="flex items-center gap-[7px]">
          <span className="size-3 rounded-full bg-[#FF5F57] shadow-inner" />
          <span className="size-3 rounded-full bg-[#FEBC2E] shadow-inner" />
          <span className="size-3 rounded-full bg-[#28C840] shadow-inner" />
        </div>
        <div className="flex h-full flex-1 items-end pl-5">
          <div className="flex h-8 items-center gap-2 rounded-t-lg border-x border-t border-zinc-200 bg-zinc-100 px-3.5">
            <span className="size-3.5 rounded-full" style={{ background: ACCENT }} />
            <span className="text-[12px] font-medium tracking-tight text-zinc-900">{tabLabel}</span>
            <span className="ml-1 text-[10px] text-zinc-500">✕</span>
          </div>
          <span className="flex size-7 items-center justify-center text-base leading-none text-zinc-800">+</span>
        </div>
        <div className="text-[11px] tabular-nums text-zinc-500">{stepLabel}</div>
      </div>

      {/* Toolbar */}
      <div className="flex h-11 items-center gap-2 border-b border-zinc-200 bg-white px-3">
        <ChevronDown className="size-4 rotate-90 text-zinc-400" />
        <ChevronDown className="size-4 -rotate-90 text-zinc-900" />
        {toolbarExtra}
        <div className="flex h-[30px] flex-1 items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-100 px-3">
          <span className="text-[13px] tracking-tight text-zinc-500">{url}</span>
        </div>
        <span className="text-base leading-none tracking-widest text-zinc-500">···</span>
        {showThemeToggle && onToggleTheme && (
          <button
            type="button"
            onClick={onToggleTheme}
            className="flex size-7 items-center justify-center rounded-md text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
        )}
      </div>

      {/* Viewport — aspect locked to Figma; children designed at 1512×982 */}
      <div
        ref={stageRef}
        className={`relative aspect-[1512/982] w-full overflow-hidden ${canvasClassName}`}
      >
        <div
          className="absolute left-1/2 top-1/2 origin-center"
          style={{
            width: ODICCI_FRAME_W,
            height: ODICCI_FRAME_H,
            transform: `translate(-50%, -50%) scale(${scale})`,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
