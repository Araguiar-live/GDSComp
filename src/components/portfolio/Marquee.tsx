import type { CSSProperties } from "react";
import { MockupGradientRing } from "@/components/portfolio/MockupGradientRing";
import mockupDarkWood from "@/assets/mockups/mockuuups-iphone-16-mockup-on-dark-wooden-surface-35aef901-9dec-4645-bdc9-67dfa809768a.png";
import mockupStriped from "@/assets/mockups/mockuuups-iphone-16-mockup-on-striped-surface-e63b777f-1396-41b0-8e23-75bb20ab3c72.png";
import mockupTextured from "@/assets/mockups/mockuuups-iphone-16-mockup-on-textured-backdrop-756b5e75-c024-4c24-be25-f55ef461a028.png";
import mockupLaptop from "@/assets/mockups/mockuuups-iphone-16-mockup-with-laptop-angle-view-afc0f475-9a97-4fc8-bab7-d15b86aeeb3e.png";
import mockupSleekBlack from "@/assets/mockups/mockuuups-iphone-16-mockup-with-sleek-black-design-18ad9705-354d-4d6e-9814-318aab0d6c82.png";

const MOCKUPS = [
  mockupTextured,
  mockupStriped,
  mockupLaptop,
  mockupSleekBlack,
  mockupDarkWood,
] as const;

/** Fixed tile + image footprint so every mockup reads at the same scale. */
const TILE_CLASS = "w-[272px] h-[192px] shrink-0 rounded-[16px] overflow-hidden";
const IMAGE_HEIGHT_PX = 158;

const AMBIENT_LAYOUTS: readonly { a: string; b: string; c: string }[] = [
  {
    a: "left-[-18%] top-[-12%] h-[78%] w-[62%] rounded-[42%_58%_40%_60%]",
    b: "right-[-12%] bottom-[-8%] h-[55%] w-[58%] rounded-full",
    c: "left-[28%] top-[38%] h-[45%] w-[40%] rounded-[30%]",
  },
  {
    a: "right-[-20%] top-[5%] h-[70%] w-[55%] rounded-full",
    b: "left-[-8%] bottom-[-15%] h-[60%] w-[65%] rounded-[60%_40%_55%_45%]",
    c: "left-[10%] top-[20%] h-[50%] w-[35%] rounded-[20%]",
  },
  {
    a: "left-[5%] top-[-20%] h-[65%] w-[75%] rounded-[45%]",
    b: "right-[-15%] top-[35%] h-[48%] w-[52%] rounded-[40%_60%_50%_50%]",
    c: "left-[-10%] bottom-[-5%] h-[42%] w-[48%] rounded-full",
  },
  {
    a: "right-[-8%] bottom-[-18%] h-[80%] w-[70%] rounded-[35%_65%_45%_55%]",
    b: "left-[-14%] top-[8%] h-[52%] w-[50%] rounded-full",
    c: "right-[18%] top-[8%] h-[38%] w-[32%] rounded-[25%]",
  },
  {
    a: "left-[-10%] bottom-[-12%] h-[72%] w-[68%] rounded-[50%_50%_40%_60%]",
    b: "right-[-18%] top-[-10%] h-[58%] w-[54%] rounded-full",
    c: "left-[35%] top-[5%] h-[40%] w-[38%] rounded-[30%_70%_40%_60%]",
  },
];

/**
 * Continuous horizontal marquee of First Design iPhone mockups.
 * Band aspect follows Figma site-wireframe width reference (530:151045 → 1262×≈280 strip).
 */
export function Marquee() {
  const loop = [...MOCKUPS, ...MOCKUPS];

  return (
    <div
      className="relative w-full overflow-hidden bg-black"
      style={{ aspectRatio: "1262 / 280" }}
    >
      <div className="absolute inset-0 flex items-center overflow-hidden">
        <div className="relative flex w-max animate-marquee gap-6 px-6">
          {loop.map((src, i) => (
            <MockupTile key={i} src={src} variant={i % MOCKUPS.length} />
          ))}
        </div>
      </div>
    </div>
  );
}

function MockupTile({ src, variant }: { src: string; variant: number }) {
  const ringDelay = `${variant * 0.65}s`;
  const layout = AMBIENT_LAYOUTS[variant % AMBIENT_LAYOUTS.length];

  return (
    <MockupGradientRing className={TILE_CLASS} ringDelay={ringDelay}>
      <div
        className="absolute inset-[1px] z-0 overflow-hidden rounded-[16px] bg-black"
        style={{ ["--blob-delay" as string]: `${variant * 0.5}s` } as CSSProperties}
      >
        <div className={`absolute blur-2xl bg-black/70 mockup-tile-blob-a ${layout.a}`} />
        <div className={`absolute blur-3xl bg-black/45 mockup-tile-blob-b ${layout.b}`} />
        <div className={`absolute blur-xl bg-white/[0.07] mockup-tile-blob-c ${layout.c}`} />
        <div className="absolute inset-0 bg-black/25" />
      </div>

      <div className="absolute inset-[1px] z-[1] flex items-center justify-center overflow-hidden rounded-[16px]">
        <img
          src={src}
          alt=""
          className="max-w-[94%] object-contain object-center select-none rounded-[16px]"
          style={{ height: IMAGE_HEIGHT_PX, width: "auto" }}
          loading="lazy"
          draggable={false}
        />
      </div>
    </MockupGradientRing>
  );
}
