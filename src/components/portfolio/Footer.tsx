import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import footerLogo from "@/assets/portfolio/footer/logo.svg";
import arrowUpRight from "@/assets/portfolio/footer/arrow-up-right.svg";

/**
 * Figma Portfolio footer 603:1362 / portfolio-footer 597:35531
 * Jenga 598:1352 · Gradient Pattern 605:1386
 */

const EMAIL = "A.rafaela.aguiar@outlook.com";

type FooterLink = {
  label: string;
  href: string;
  slug?: string;
  external?: boolean;
  action?: "sidebar";
};

const COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Selected Work",
    links: [
      { label: "Projects", href: "#" },
      { label: "CRCLE", href: "#", slug: "crcle" },
      { label: "Odicci", href: "#", slug: "odicci" },
      { label: "Hackathons", href: "#", slug: "first-design" },
    ],
  },
  {
    title: "About / CV",
    links: [
      { label: "Experience", href: "#", action: "sidebar" },
      { label: "Philosophy", href: "#" },
      { label: "Stack", href: "#" },
      { label: "Design Tokens", href: "#" },
      { label: "Contact", href: `mailto:${EMAIL}` },
    ],
  },
  {
    title: "Socials",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/", external: true },
      { label: "GitHub", href: "https://github.com/", external: true },
      { label: "Twitter / X", href: "https://x.com/", external: true },
      { label: "ReadCV", href: "https://read.cv/", external: true },
      { label: "Figma", href: "https://www.figma.com/", external: true },
    ],
  },
];

function londonClockLabel(date = new Date()) {
  const time = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);

  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    timeZoneName: "short",
  }).formatToParts(date);
  const tz = parts.find((p) => p.type === "timeZoneName")?.value ?? "BST";

  return `London, UK • ${time.toUpperCase()} ${tz}`;
}

export function Footer({
  onSelectProject,
  onOpenSidebar,
}: {
  onSelectProject?: (slug: string) => void;
  onOpenSidebar?: () => void;
}) {
  const [clock, setClock] = useState(() => londonClockLabel());

  useEffect(() => {
    const tick = () => setClock(londonClockLabel());
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <footer
      className="relative w-full overflow-hidden bg-black px-6 pb-12 pt-16 text-slate-200 sm:px-10 lg:px-12"
      data-name="portfolio-footer"
    >
      {/* Gradient Pattern — Figma 605:1386 (bottom-right, 664×563) */}
      <FooterGradientPattern />

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col gap-12 text-white/70">
        <div className="flex flex-col gap-12 xl:flex-row xl:items-start xl:justify-between">
          {/* BrandStack */}
          <div className="flex w-full max-w-[320px] shrink-0 flex-col items-start gap-6">
            <div className="flex items-start gap-6">
              <img
                src={footerLogo}
                alt=""
                width={33}
                height={30}
                className="mt-0.5 h-[30px] w-[33px] object-contain"
              />
              <p className="text-[24px] font-medium leading-none tracking-tight text-white">
                Portfolio.
              </p>
            </div>
            <p className="text-[14px] leading-[1.5]">
              Designing fluid digital experiences, interactive prototypes, and design systems for
              high-craft products.
            </p>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/70 bg-white/[0.04] px-4 py-2.5 text-[13px] font-light backdrop-blur-[4px] transition-colors hover:bg-white/[0.08] hover:text-white"
            >
              Get in touch
              <img
                src={arrowUpRight}
                alt=""
                width={16}
                height={16}
                className="size-4 object-contain opacity-70"
              />
            </a>
          </div>

          {/* MenuGrid — nav columns + jenga sibling with clear gap */}
          <div className="flex min-w-0 flex-1 flex-col items-start gap-12 sm:flex-row xl:max-w-[900px] xl:flex-none xl:gap-16">
            <div className="grid min-w-0 flex-1 grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-10">
              {COLUMNS.map((col) => (
                <div key={col.title} className="flex w-full max-w-[160px] flex-col gap-4">
                  <p className="text-[12px] font-bold uppercase tracking-wide text-white">
                    {col.title}
                  </p>
                  <ul className="flex flex-col gap-3 text-[14px] leading-[1.4]">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <FooterNavLink
                          link={link}
                          onSelectProject={onSelectProject}
                          onOpenSidebar={onOpenSidebar}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className="flex min-w-0 flex-col gap-4 lg:min-w-[220px]">
                <p className="text-[12px] font-bold uppercase tracking-wide text-white">
                  Get in touch
                </p>
                <a
                  href={`mailto:${EMAIL}`}
                  className="whitespace-nowrap text-[14px] font-medium underline decoration-solid underline-offset-2 transition-opacity hover:text-white hover:opacity-100"
                >
                  {EMAIL}
                </a>
              </div>
            </div>

            {/* Jenga Pattern — Figma 598:1352 */}
            <div
              aria-hidden
              className="mx-auto shrink-0 pb-2 sm:mx-0 sm:self-end xl:self-start xl:pt-[91px]"
            >
              <JengaPattern />
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-white/10" />

        <div className="relative z-20 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12px]">© 2026 Portfolio. All rights reserved.</p>
          <p className="text-[11px]">{clock}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterNavLink({
  link,
  onSelectProject,
  onOpenSidebar,
}: {
  link: FooterLink;
  onSelectProject?: (slug: string) => void;
  onOpenSidebar?: () => void;
}) {
  const className = "text-left transition-colors hover:text-white";

  if (link.slug && onSelectProject) {
    return (
      <button type="button" onClick={() => onSelectProject(link.slug!)} className={className}>
        {link.label}
      </button>
    );
  }

  if (link.action === "sidebar" && onOpenSidebar) {
    return (
      <button type="button" onClick={onOpenSidebar} className={className}>
        {link.label}
      </button>
    );
  }

  return (
    <a
      href={link.href}
      {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={className}
      onClick={link.href === "#" ? (e) => e.preventDefault() : undefined}
    >
      {link.label}
    </a>
  );
}

/**
 * Figma Jenga Pattern 598:1352 — side-by-side auto-layout (no stacked overlap):
 * left column (dots + dim over wide), tall strip with center dot on the right.
 */
function JengaPattern() {
  const reduceMotion = useReducedMotion();

  const splay = (x: number, y: number, delay: number) => {
    if (reduceMotion) return {};
    return {
      animate: {
        x: [0, x, 0],
        y: [0, y, 0],
        rotate: [0, x > 0 ? 1.2 : x < 0 ? -1.2 : 0.6, 0],
      },
      transition: {
        duration: 4.8,
        ease: [0.45, 0.05, 0.2, 1] as const,
        repeat: Infinity,
        delay,
      },
    };
  };

  return (
    <div
      className="flex h-[155px] w-[153.393px] items-start gap-[1.15px] overflow-visible"
      data-name="Jenga Pattern"
    >
      <div className="flex w-[101.726px] flex-col gap-[1.15px]">
        <div className="flex w-full items-center gap-[1.15px]">
          {/* Dotted cell */}
          <motion.div
            className="jenga-glass flex h-[50.519px] w-[50.289px] shrink-0 items-center justify-center rounded-[6.889px]"
            style={{ ["--outline-delay" as string]: "0s" }}
            {...splay(-4, -4, 0.2)}
          >
            <div
              className="relative z-[1] grid shrink-0 gap-[1.15px]"
              style={{
                gridTemplateColumns: "repeat(3, max-content)",
                gridTemplateRows: "max-content max-content",
              }}
            >
              <span className="size-[3.444px] rounded-[0.574px] bg-[#d1d5db]/90" />
              <span className="size-[3.444px] rounded-[0.574px] bg-[#d1d5db]/90" />
              <span className="size-[3.444px] rounded-[0.574px] bg-[#d1d5db]/90" />
              <span className="col-start-1 size-[3.444px] rounded-[0.574px] bg-[#d1d5db]/90" />
            </div>
          </motion.div>

          {/* Recessed dim cell — centered cross */}
          <motion.div
            className="jenga-glass jenga-glass--dim flex h-[50.519px] w-[50.289px] shrink-0 items-center justify-center rounded-[6.889px]"
            style={{ ["--outline-delay" as string]: "0.7s" }}
            {...splay(4, -3, 0.55)}
          >
            <span
              aria-hidden
              className="relative z-[1] block size-[11px]"
            >
              <span className="absolute left-1/2 top-0 h-full w-[1.5px] -translate-x-1/2 rounded-full bg-[#d1d5db]/90" />
              <span className="absolute left-0 top-1/2 h-[1.5px] w-full -translate-y-1/2 rounded-full bg-[#d1d5db]/90" />
            </span>
          </motion.div>
        </div>

        {/* Wide soft cell */}
        <motion.div
          className="jenga-glass jenga-glass--soft h-[50.519px] w-full rounded-[6.889px]"
          style={{ ["--outline-delay" as string]: "1.4s" }}
          {...splay(-3, 4, 0)}
        />
      </div>

      {/* Tall strip with center dot */}
      <motion.div
        className="jenga-glass jenga-glass--base flex h-[155px] w-[50.519px] shrink-0 items-center justify-center rounded-[6.889px]"
        style={{ ["--outline-delay" as string]: "0.35s" }}
        {...splay(5, 0, 0.15)}
      >
        <span className="relative z-[1] size-[2.3px] rounded-full bg-[#d1d5db] shadow-[0_0_6px_rgba(255,255,255,0.55)]" />
      </motion.div>
    </div>
  );
}

/** Figma Gradient Pattern 605:1386 — bottom-right, shifted 60px lower */
function FooterGradientPattern() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute z-0 h-[563px] w-[664px] opacity-80"
      style={{ right: "-8%", bottom: "calc(-8% - 120px)" }}
      data-name="Gradient Pattern"
    >
      <div
        className="absolute left-[8%] top-[12%] h-[479px] w-[520px] rounded-full opacity-90 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,90,31,0.55) 0%, rgba(255,120,60,0.22) 38%, transparent 68%)",
        }}
      />
      <div
        className="absolute right-[6%] top-[4%] h-[325px] w-[380px] rounded-full opacity-80 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(70,150,165,0.42) 0%, rgba(50,110,140,0.16) 45%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-[10%] left-[18%] h-[360px] w-[411px] rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(220,70,40,0.35) 0%, transparent 65%)",
        }}
      />
    </div>
  );
}
