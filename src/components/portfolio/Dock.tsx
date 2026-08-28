import { useState } from "react";
import { motion } from "framer-motion";

interface DockItem {
  label: string;
  slug: string;
}

interface Props {
  items: DockItem[];
  onSelect: (slug: string) => void;
  activeSlug?: string | null;
}

const BASE = 44;
const GAP = 12;
/** Extra-squishy spring — low stiffness, soft bounce */
const SPRING = { type: "spring" as const, stiffness: 90, damping: 10, mass: 0.65 };

/**
 * Floating macOS-style dock — clear glass capsule with symmetrical padding.
 * Layout slots grow with hover so icons stay inside the pill edge.
 */
export function Dock({ items, onSelect, activeSlug }: Props) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ y: 56, opacity: 0, scale: 0.92 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ ...SPRING, delay: 0.15 }}
      className="pointer-events-none fixed bottom-8 left-1/2 z-[60] -translate-x-1/2"
    >
      <motion.div
        layout
        transition={SPRING}
        onMouseLeave={() => setHovered(null)}
        className="dock-glass pointer-events-auto relative flex items-center justify-center overflow-hidden rounded-full border border-white/15 bg-white/5 p-3 shadow-2xl backdrop-blur-sm"
        style={{ gap: GAP }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 rounded-full bg-gradient-to-b from-white/12 via-transparent to-transparent"
        />
        <div className="dock-glass-lens z-0 opacity-25" aria-hidden />

        {/* Layout track — width/height spring with slots; icons never leave the glass */}
        <motion.div
          layout
          transition={SPRING}
          className="relative z-[1] flex items-center justify-center"
          style={{ gap: GAP }}
        >
          {items.map((item, index) => (
            <DockButton
              key={item.slug}
              item={item}
              index={index}
              hovered={hovered}
              active={activeSlug === item.slug}
              onHover={setHovered}
              onSelect={onSelect}
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function DockButton({
  item,
  index,
  hovered,
  active,
  onHover,
  onSelect,
}: {
  item: DockItem;
  index: number;
  hovered: number | null;
  active: boolean;
  onHover: (index: number | null) => void;
  onSelect: (slug: string) => void;
}) {
  const isHovered = hovered === index;
  const dist = hovered === null ? null : Math.abs(hovered - index);
  const isNeighbour = dist === 1;
  const isDistant = dist !== null && dist >= 2;

  // Magnification stays inside the slot — no y-lift past the glass edge
  const scale = isHovered ? 1.28 : isNeighbour ? 1.08 : isDistant ? 0.95 : 1;
  const pushDir =
    hovered !== null && dist !== null && dist > 0
      ? index < hovered
        ? -1
        : 1
      : 0;
  const x = isNeighbour ? pushDir * 8 : isDistant ? pushDir * 3 : 0;

  // Slot = visual icon size so the capsule layout-springs symmetrically
  const slot = Math.ceil(BASE * scale);

  return (
    <motion.div
      layout
      onMouseEnter={() => onHover(index)}
      animate={{ width: slot, height: slot }}
      transition={SPRING}
      className="relative flex shrink-0 items-center justify-center"
    >
      <motion.button
        type="button"
        onClick={() => onSelect(item.slug)}
        animate={{ scale, x }}
        transition={SPRING}
        whileTap={{ scale: scale * 0.9 }}
        aria-label={`Open ${item.label} project`}
        aria-current={active ? "true" : undefined}
        className={
          "group relative flex shrink-0 items-center justify-center overflow-hidden rounded-full text-[12px] font-semibold tracking-tight outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent " +
          (active
            ? "bg-zinc-950/90 text-white shadow-[0_8px_24px_rgba(0,0,0,0.45),0_1px_0_rgba(255,255,255,0.3)_inset]"
            : "bg-white/55 text-zinc-800 shadow-[0_4px_16px_rgba(0,0,0,0.18),0_1.5px_0_rgba(255,255,255,0.75)_inset] backdrop-blur-sm")
        }
        style={{ width: BASE, height: BASE }}
      >
        <motion.span
          aria-hidden
          animate={{ opacity: isHovered ? 1 : 0.55 }}
          transition={SPRING}
          className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/75 via-white/15 to-transparent"
        />
        <motion.span
          aria-hidden
          animate={{
            opacity: isHovered ? 0.95 : 0.3,
            x: isHovered ? 3 : 0,
          }}
          transition={SPRING}
          className="pointer-events-none absolute -left-1/4 top-0 h-1/2 w-3/4 rounded-full bg-white/60 blur-[6px]"
        />
        <span className="relative z-[1]">{item.label}</span>

        <motion.span
          aria-hidden
          animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.4 }}
          transition={SPRING}
          className="absolute bottom-1.5 left-1/2 z-[1] h-1 w-1 -translate-x-1/2 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.75)]"
        />
      </motion.button>
    </motion.div>
  );
}
