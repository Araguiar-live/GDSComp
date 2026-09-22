import batteryIcon from "@/assets/crcle/battery.svg";
import cellularIcon from "@/assets/crcle/cellular.svg";
import wifiIcon from "@/assets/crcle/wifi.svg";
import logoRow1 from "@/assets/first-design/logo-row-1.svg";
import logoRow2 from "@/assets/first-design/logo-row-2.svg";
import logoRow3 from "@/assets/first-design/logo-row-3.svg";
import { CrclePhoneFrame } from "@/components/portfolio/CrclePhoneFrame";

const FONT = "Inter, ui-sans-serif, system-ui, sans-serif";

/**
 * First Design — Productive coming-soon wireframe.
 * Mark from Figma 1060:28779, in the same 402×874 phone as CRCLE.
 */
export function FirstDesignComingSoon() {
  return (
    <div className="relative ml-auto w-fit">
      <CrclePhoneFrame>
        <div className="relative flex h-full min-h-0 w-full flex-col overflow-hidden bg-[#16181d]">
          <StatusBar />

          <div className="relative flex min-h-0 flex-1 flex-col items-center justify-center px-8 pb-16">
            <div className="relative h-[280px] w-[220px]">
              <GhostFrame className="fd-ghost-pulse-a absolute left-1/2 top-4 h-[220px] w-[168px] -translate-x-[72%] -rotate-[8deg]" />
              <GhostFrame className="fd-ghost-pulse-b absolute left-1/2 top-4 h-[220px] w-[168px] -translate-x-[18%] rotate-[9deg]" />
              <GhostFrame
                className="absolute left-1/2 top-0 h-[240px] w-[188px] -translate-x-1/2"
                featured
              />
            </div>

            <p
              className="mt-8 text-center text-[13px] font-medium uppercase tracking-[0.22em] text-white/40"
              style={{ fontFamily: FONT }}
            >
              Productive
            </p>
            <h2
              className="mt-2 text-center text-[28px] font-medium leading-tight tracking-tight text-[#f7f6f2]"
              style={{ fontFamily: FONT }}
            >
              Coming soon
            </h2>
            <p
              className="mt-3 max-w-[260px] text-center text-[13px] leading-5 text-white/45"
              style={{ fontFamily: FONT }}
            >
              The core loop is on its way. These frames hold the mark until the prototype lands.
            </p>
          </div>
        </div>
      </CrclePhoneFrame>
    </div>
  );
}

function GhostFrame({ className, featured = false }: { className?: string; featured?: boolean }) {
  return (
    <div
      className={`flex flex-col items-center justify-center overflow-hidden rounded-[28px] shadow-[0_18px_40px_rgba(0,0,0,0.35)] ${
        featured
          ? "border border-white/12 bg-[#292e38]/80"
          : "fd-ghost-frame border border-white/20 bg-[#434b5c]/75"
      } ${className ?? ""}`}
    >
      <FirstDesignMark className={featured ? "h-[72px] w-[76px]" : "h-[44px] w-[47px]"} />
      {featured ? (
        <span
          className="mt-4 text-[11px] uppercase tracking-[0.18em] text-white/35"
          style={{ fontFamily: FONT }}
        >
          Coming soon
        </span>
      ) : null}
    </div>
  );
}

function FirstDesignMark({ className }: { className: string }) {
  return (
    <div className={`relative overflow-hidden rounded-[22%] bg-[#292e38] ${className}`}>
      <div className="absolute inset-[15%_14%] flex flex-col justify-between">
        <img
          alt=""
          src={logoRow1}
          className="h-[22%] w-full object-contain"
          draggable={false}
          loading="lazy"
          decoding="async"
        />
        <img
          alt=""
          src={logoRow2}
          className="h-[22%] w-full object-contain"
          draggable={false}
          loading="lazy"
          decoding="async"
        />
        <img
          alt=""
          src={logoRow3}
          className="h-[22%] w-full object-contain"
          draggable={false}
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="relative z-30 mx-auto flex h-[62px] w-[84%] shrink-0 items-end justify-between px-2 pb-[10px] text-white">
      <span
        className="text-[17px] font-semibold leading-[22px] text-white"
        style={{ fontFamily: "SF Pro, system-ui, -apple-system, sans-serif" }}
      >
        9:41
      </span>
      <div className="flex items-center gap-[7px] pb-0.5 text-white">
        <StatusIcon src={cellularIcon} className="h-[12.226px] w-[19.2px]" />
        <StatusIcon src={wifiIcon} className="h-[12.328px] w-[17.142px]" />
        <StatusIcon src={batteryIcon} className="h-[13px] w-[27.328px]" />
      </div>
    </div>
  );
}

function StatusIcon({ src, className }: { src: string; className: string }) {
  return (
    <div className={`relative shrink-0 overflow-hidden ${className}`}>
      <img
        alt=""
        src={src}
        className="absolute inset-0 size-full max-w-none object-contain brightness-0 invert"
        draggable={false}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}
