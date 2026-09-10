import { createFileRoute } from "@tanstack/react-router";
import { motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import girlPleaseLogo from "@/assets/girl-please.svg";
import designToggleKnob from "@/assets/portfolio/design-toggle-knob.svg";
import { ProjectBentoStack, type Project } from "@/components/portfolio/ProjectAccordion";
import { Dock } from "@/components/portfolio/Dock";
import { ProjectDock } from "@/components/portfolio/ProjectDock";
import { Marquee } from "@/components/portfolio/Marquee";
import { Footer } from "@/components/portfolio/Footer";
import { OdicciWorkspacePicker } from "@/components/portfolio/OdicciWorkspacePicker";
import { OdicciColourPalette } from "@/components/portfolio/OdicciColourPalette";
import { OdicciSignUp } from "@/components/portfolio/OdicciSignUp";
import { OdicciTemplateLibrary } from "@/components/portfolio/OdicciTemplateLibrary";
import { Sidebar, SIDEBAR_PANEL_ID } from "@/components/portfolio/Sidebar";
import { CrcleMessaging } from "@/components/portfolio/CrcleMessaging";
import { CrcleProfile } from "@/components/portfolio/CrcleProfile";
import { CrcleRadar } from "@/components/portfolio/CrcleRadar";
import { CrcleSignalHome } from "@/components/portfolio/CrcleSignalHome";
import { FirstDesignComingSoon } from "@/components/portfolio/FirstDesignComingSoon";
import { WireframeStage } from "@/components/portfolio/SiteWireframe";
import { PortfolioCalculatorCard } from "@/components/portfolio/PortfolioCalculatorCard";

export const Route = createFileRoute("/")({
  component: Index,
});

// Master project registry. Drop real content into `content` per tab later.
const PROJECTS: Project[] = [
  {
    id: "01",
    slug: "crcle",
    title: "CRCLE",
    role: "Lead Product Designer/Owner",
    year: "2025-26",
    content: {
      "Create Workspace\u00a0": {
        tabLabel: "Signal Home",
        label: "CRCLE — Signal Home",
        subtitle: "Drop a signal and set the night’s mood",
        overview:
          "Signal Home is CRCLE’s control room at the end of the corridor — presence, photo drop, and the pulse that starts every night.",
        challenge:
          "Make the home feel alive and exclusive without burying the core action under chrome.",
        approach:
          "Lead with portrait atmosphere, quiet glass controls, and a clear path into Radar and messaging.",
        outcome:
          "A living Signal Home wireframe judges (and clients) can feel before they read a paragraph.",
        customBody: ({ goToTab }) => (
          <CrcleSignalHome
            onGoToMessages={() => goToTab("Sign Up")}
            onGoToProfile={() => goToTab("Template Library")}
            onGoToRadar={() => goToTab("Brand Personality")}
          />
        ),
      },
      "Brand Personality": {
        tabLabel: "Radar",
        label: "CRCLE — Radar",
        subtitle: "Discover with intent before you message",
        overview:
          "Radar is the discovery loop — swipe Purpose, Love, or Soul cards, then push an intent signal from the first tap.",
        challenge:
          "Cold outreach feels noisy. People need a clear reason and expectation before a thread opens.",
        approach:
          "Category swipe filters the deck; the + FAB opens an intent matrix so romantic, professional, social, or balanced signals land first.",
        outcome:
          "An interactive Radar flow: swipe categories → set intent → Signal Sent → jump toward messages.",
        customBody: ({ onNextTab, goToTab }) => (
          <CrcleRadar
            onGoToMessages={onNextTab}
            onGoToSignalHome={() => goToTab("Create Workspace\u00a0")}
            onGoToProfile={() => goToTab("Template Library")}
          />
        ),
      },
      "Sign Up": {
        tabLabel: "Messaging Hub",
        label: "CRCLE — Messaging",
        subtitle: "Conversation as the product core",
        overview:
          "The messaging hub is the daily loop — notifications, threads, and presence without noisy social chrome.",
        challenge:
          "Build intimacy at small scale without borrowing patterns from mass messengers.",
        approach:
          "Prioritize readable threads, the Sent/Received switch, and a dock that feels like a private tool.",
        outcome:
          "An interactive hub that demonstrates the product’s rhythm end-to-end.",
        customBody: ({ goToTab }) => (
          <CrcleMessaging
            onGoToProfile={() => goToTab("Template Library")}
            onGoToSignalHome={() => goToTab("Create Workspace\u00a0")}
            onGoToRadar={() => goToTab("Brand Personality")}
          />
        ),
        featureCopy: {
          label: "CRCLE — In The Area",
          subtitle: "Nearby connections without sacrificing location privacy",
          overview:
            "An ambient social radar designed to surface nearby connections without sacrificing user location privacy. By leveraging venue-based proximity detection instead of raw GPS coordinates, the feature highlights shared context and mutual intent through dense, low-friction profile cards.",
          challenge:
            "People want to know who is actually around them, but live GPS sharing feels like surveillance — so most proximity products never get turned on.",
          approach:
            "Detect shared venues instead of coordinates. Cards carry intent and context — same place, privacy protected — so proximity reads as social, not a map pin on a stranger.",
          outcome:
            "In The Area turns ambient presence into a conversation: venue-based detection, protected location, and dense profile cards that surface mutual intent without asking for a live fix.",
        },
      },
      "Template Library": {
        tabLabel: "Profile",
        label: "CRCLE — Profile",
        subtitle: "Identity, broadcast mood, and editable life widgets",
        overview:
          "The profile is the member’s living card — stats, intent, and the details they choose to share. This is the end of the prototype journey.",
        challenge:
          "Pack education, work, dating, and location into one glance without feeling like a form dump.",
        approach:
          "Lead with portrait + strength, then a 2×2 bento. Edit sheets keep depth off the main surface.",
        outcome:
          "Signal Live and the mood chip jump back to Messaging Hub, where Mood Switch and the Sent/Received control live.",
        featureCopy: {
          label: "CRCLE — Know Your Customer",
          subtitle: "Identity checks so the crcle stays real people",
          overview:
            "CRCLE is a small, high-trust graph — dating, work, and location shared with people you might actually meet. Know Your Customer (KYC) is the gate that keeps every profile a person, not a borrowed photo or a bot, before that intimacy is on the table.",
          challenge:
            "Exclusive networks collapse the moment fake accounts sit next to real ones. Members will not share a live venue, a dating status, or a work ask if they cannot tell who has proven they are who they say they are.",
          approach:
            "Partner with Fourthline for an encrypted identity check, not a social scrape. Verification lives as a quiet Profile chip, then a short drawer that explains the why — data is used only to confirm the person, then discarded from the product surface.",
          outcome:
            "A verified raindrop replaces Verify. Trust is earned before Radar, In The Area, or messaging deepen, so the product can stay intimate at small scale without turning into another unmoderated feed.",
        },
        customBody: ({ goToTab }) => (
          <CrcleProfile
            onGoToSignalHome={() => goToTab("Create Workspace\u00a0")}
            onGoToMessages={() => goToTab("Sign Up")}
            onGoToRadar={() => goToTab("Brand Personality")}
          />
        ),
      },
    },
  },
  {
    id: "02",
    slug: "first-design",
    title: "first design",
    role: "Bending Spoons Hackathon",
    year: "2026",
    tabs: ["Productive"],
    content: {
      Productive: {
        tabLabel: "Productive",
        label: "First Design — Productive",
        subtitle: "Where the product actually lives",
        overview:
          "Productive is the hackathon build — a task list that should feel like a product, not a spreadsheet. The interactive loop is coming soon; this frame holds the mark until that prototype lands.",
        challenge:
          "Show depth without burying the demo in edge cases, and without shipping a hollow placeholder.",
        approach:
          "One primary loop, one memorable detail. Until the flow is locked, the phone carries the list mark and ghost frames instead of a fake UI.",
        outcome:
          "A coming-soon wireframe that still reads as the product: same device language as CRCLE, with the First Design identity already on screen.",
        customBody: <FirstDesignComingSoon />,
      },
    },
  },
  {
    id: "03",
    slug: "odicci",
    title: "Odicci",
    role: "Product Team / Core UX",
    year: "2025-26",
    content: {
      "Create Workspace\u00a0": {
        label: "Odicci — Workspace",
        subtitle: "Enterprise needs a home before the product opens",
        overview:
          "In multi-tenant enterprise, every company is its own operating context — identity, members, and the stack it already runs. Create Workspace is where that context is named and connected before anyone lands in the product.",
        challenge:
          "Enterprise teams juggle several orgs and dozens of tools. Without a deliberate create step, people enter the wrong workspace, bring no stack with them, and waste the first session wiring APIs by hand.",
        approach:
          "A dedicated create flow captures company identity, then surfaces Add Integration so Shopify, Klaviyo, Magento, Omnisend, and the rest can attach at setup — accommodating each company’s API footprint before Brand Personality or templates.",
        outcome:
          "Workspace creation becomes the enterprise on-ramp: the right org, the right APIs, then a product that already speaks to that company’s stack.",
        customBody: ({ onNextTab }) => <OdicciWorkspacePicker onNext={onNextTab} />,
      },
      "Brand Personality": {
        label: "Odicci — Brand system",
        subtitle: "Colour and tone as a live control",
        overview:
          "Brand personality starts with usage context — industry, niche, then tone and aesthetic — so the palette and Template library open already tuned to the company.",
        challenge:
          "Colour alone doesn’t personalize the home. Without business and vibe signals, templates stay generic even when the brand looks right.",
        approach:
          "Capture business profile first (Figma 713:199885), then brand vibe (727:200380), then live colour controls so every experience and suggested template feels on-brand.",
        outcome:
          "A three-beat Brand Personality flow: describe the business, set the vibe, dial the palette — feeding a tailored Template library next.",
        customBody: ({ onPrevTab }) => (
          <OdicciColourPalette onBackToWorkspace={onPrevTab} />
        ),
      },
      "Sign Up": {
        label: "Odicci — Sign up",
        subtitle: "Credentials with atmosphere",
        overview:
          "Account creation should feel like entering the product world — peach light, soft glass, zero generic form fatigue.",
        challenge:
          "Sign-up is high drop-off. Visual polish has to support clarity, not distract from it.",
        approach:
          "Keep fields minimal, hierarchy loud, and the environment distinctive enough to remember.",
        outcome:
          "An onboarding beat that sells the brand while collecting only what’s needed.",
        customBody: <OdicciSignUp />,
      },
      "Template Library": {
        label: "Odicci — Template library",
        subtitle: "Browse, filter, and preview experiences",
        overview:
          "The template library is where brand personality meets ready-made play — sticky filters keep discovery fast while a live preview stays pinned.",
        challenge:
          "Catalogs get noisy fast. Without sticky context, people lose their place and second-guess the pick.",
        approach:
          "Pin search and industry filters; keep a sticky phone preview with QR and Use Template so selection never leaves the frame.",
        outcome:
          "A scannable library that feels like shopping a catalog and testing on device at the same time.",
        customBody: <OdicciTemplateLibrary />,
      },
    },
  },
];

// Dock buttons map 1:1 to projects above.
const DOCK_ITEMS = [
  { label: "Cr", slug: "crcle" },
  { label: "Fd", slug: "first-design" },
  { label: "Od", slug: "odicci" },
];

function Index() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [designOn, setDesignOn] = useState(false);
  const rowRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const isExpanded = openSlug !== null;

  const toggle = useCallback((slug: string) => {
    setOpenSlug((cur) => (cur === slug ? null : slug));
  }, []);

  // Dock click: open the row (if closed) and smoothly scroll to it.
  const handleDockSelect = useCallback((slug: string) => {
    setOpenSlug(slug);
    // Wait a frame so the accordion begins expanding before we measure.
    requestAnimationFrame(() => {
      const el = rowRefs.current[slug];
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  return (
    <div className="portfolio-hero-grid relative min-h-screen text-zinc-900 font-sans antialiased overflow-x-hidden">
      {/* App-icon project dock — pinned top-left while scrolling */}
      <div className="fixed top-6 left-6 z-50 sm:left-8">
        <ProjectDock onPlus={() => setSidebarOpen(true)} />
      </div>

      {/* Top-right pill — logo opens profile sidebar */}
      <div className="fixed top-6 right-8 z-[110] flex items-center gap-[4px] rounded-[16px] border border-zinc-200/40 bg-black/[0.08] p-[4px] shadow-lg shadow-black/5 backdrop-blur-md">
        <button
          type="button"
          onClick={() => setSidebarOpen((v) => !v)}
          aria-expanded={sidebarOpen}
          aria-controls={SIDEBAR_PANEL_ID}
          aria-label={sidebarOpen ? "Close profile menu" : "Open profile menu"}
          className="group flex size-9 shrink-0 items-center justify-center rounded-[12px] bg-zinc-950 transition-all duration-200 hover:bg-white/50 hover:backdrop-blur-md active:scale-[0.97]"
        >
          <img
            src={girlPleaseLogo}
            alt=""
            aria-hidden
            className="h-[70%] w-[70%] object-contain invert transition-[filter] duration-200 group-hover:invert-0"
          />
        </button>
        <a
          href="mailto:A.rafaela.aguiar@outlook.com"
          className="flex h-9 cursor-pointer items-center justify-center rounded-[12px] bg-[#E9582C] px-5 text-xs font-semibold tracking-tight text-zinc-950 transition-all duration-200 hover:scale-[1.02] hover:opacity-95 active:scale-[0.98]"
        >
          Contact Me
        </a>
      </div>

      {/*
        Exact Figma auto-layout (530:151045 / 552:158232):
        cells → browser plate UNDER pattern → overlay on top.
        Closed 1262×847 · Open 1262×1522 · overlay scrolls when open.
        Content column is ~26.5% wider than the original 1336px cap (→ 1690)
        so the accordion reads larger without changing the stage frame aspect.
      */}
      <WireframeStage expanded={isExpanded}>
        <div
          className={
            isExpanded
              ? "mx-auto flex w-full max-w-[1690px] flex-col items-center gap-[78px] px-6 pb-0 pt-10 sm:px-10"
              : "absolute left-1/2 top-[calc(50%+18.5px)] flex h-[min(704px,83.1%)] w-[min(1690px,94%)] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-[78px] overflow-visible"
          }
        >
          <header className="flex w-full max-w-[720px] shrink-0 flex-col items-center gap-5 text-center">
            <p className="text-[11px] font-bold uppercase tracking-[2px] text-[#76767a]">
              Selected Work • Portfolio
            </p>

            <div className="flex items-end justify-center gap-[15px]">
              <div className="hidden w-[87px] shrink-0 pb-2.5 sm:block" aria-hidden />

              <h1 className="text-center text-[40px] font-medium leading-[48px] tracking-[-1.5px] text-[#111] sm:text-[48px] sm:leading-[56px]">
                <span className="block">Hi..</span>
                <span className="block">I do Design.</span>
              </h1>

              <div className="w-[72px] shrink-0 pb-2.5 sm:w-[87px]">
                <DesignToggle on={designOn} onToggle={() => setDesignOn((v) => !v)} />
              </div>
            </div>

            <p className="max-w-[580px] text-[14px] leading-[22px] text-[#76767a]">
              A single, fluidly scrolling page. Expand any project to step through the exploration,
              the iteration, and a live interactive prototype.
            </p>
          </header>

          <div className="relative w-full shrink-0 overflow-visible">
            <div className="pointer-events-none absolute left-0 top-0 z-[5] hidden -translate-x-1/2 -translate-y-1/2 md:block">
              <PortfolioCalculatorCard />
            </div>
            <ProjectBentoStack
              projects={PROJECTS}
              openSlug={openSlug}
              onToggle={toggle}
              rowRefs={rowRefs}
            />
          </div>
        </div>
      </WireframeStage>

      {/* Exactly 2px of #f3f4f6 between wireframe frame and marquee */}
      <div className="relative z-20 h-[2px] w-full shrink-0 bg-[#f3f4f6]" aria-hidden />

      {/* Marquee + footer — continuous black plane under the bento strip */}
      <div id="site-dark-band" className="relative z-20 bg-black" data-dark-band>
        <Marquee />
        <Footer
          onSelectProject={handleDockSelect}
          onOpenSidebar={() => setSidebarOpen(true)}
        />
      </div>

      <Dock items={DOCK_ITEMS} onSelect={handleDockSelect} activeSlug={openSlug} />
      <Sidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />
    </div>
  );
}

/**
 * Figma Design toggle — mint ↔ purple.
 * Auto-flips ~every 10s; click still works; bouncy spring + float + occasional shake.
 */
function DesignToggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  const reduceMotion = useReducedMotion();
  const shakeControls = useAnimationControls();
  const flipControls = useAnimationControls();
  const pauseUntilRef = useRef(0);
  const onToggleRef = useRef(onToggle);
  onToggleRef.current = onToggle;

  const border = on ? "#bb9ffa" : "#01cd7f";
  const gradient = on
    ? "linear-gradient(131.4deg, rgba(139, 92, 247, 0.4) 19.75%, rgba(139, 92, 247, 0.08) 86.39%)"
    : "linear-gradient(131.4deg, rgba(1, 228, 141, 0.4) 19.75%, rgba(1, 228, 141, 0.08) 86.39%)";

  const playFlipBounce = useCallback(() => {
    if (reduceMotion) return;
    void flipControls.start({
      scale: [1, 1.12, 0.94, 1.06, 1],
      rotate: [0, -6, 5, -2, 0],
      transition: { duration: 0.55, ease: "easeOut" },
    });
  }, [flipControls, reduceMotion]);

  const handleToggle = useCallback(() => {
    pauseUntilRef.current = Date.now() + 12_000;
    playFlipBounce();
    onToggleRef.current();
  }, [playFlipBounce]);

  // Auto-flip every ~10s (jitter 9–11s). Skips briefly after a manual click.
  useEffect(() => {
    if (reduceMotion) return;

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;

    const schedule = () => {
      const delay = 9000 + Math.random() * 2000;
      timer = setTimeout(() => {
        if (cancelled) return;
        if (Date.now() >= pauseUntilRef.current) {
          playFlipBounce();
          onToggleRef.current();
        }
        schedule();
      }, delay);
    };

    schedule();
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [reduceMotion, playFlipBounce]);

  // Intro shake + occasional attention shake
  useEffect(() => {
    if (reduceMotion) return;

    let cancelled = false;
    const shake = () =>
      shakeControls.start({
        x: [0, -5, 5, -4, 4, -2, 0],
        rotate: [0, -2.5, 2.5, -1.5, 1.5, 0],
        transition: { duration: 0.55, ease: "easeInOut" },
      });

    const run = async () => {
      await new Promise((r) => setTimeout(r, 300));
      if (cancelled) return;
      await shake();
      while (!cancelled) {
        await new Promise((r) => setTimeout(r, 25_000));
        if (cancelled) return;
        await shake();
      }
    };

    void run();
    return () => {
      cancelled = true;
      shakeControls.stop();
    };
  }, [reduceMotion, shakeControls]);

  return (
    <motion.div
      className="w-full"
      animate={reduceMotion ? undefined : { y: [0, -3, 0] }}
      transition={
        reduceMotion
          ? undefined
          : { duration: 2.8, repeat: Infinity, ease: "easeInOut" }
      }
    >
      <motion.button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label={on ? "Design mode on" : "Design mode off"}
        onClick={handleToggle}
        animate={shakeControls}
        whileHover={reduceMotion ? undefined : { scale: 1.06, rotate: 2 }}
        whileTap={reduceMotion ? undefined : { scale: 0.9, rotate: -4 }}
        transition={{ type: "spring", stiffness: 520, damping: 22, mass: 0.65 }}
        className="relative w-full cursor-pointer rounded-[64px] border p-1 backdrop-blur-[4px]"
        style={{ borderColor: border, backgroundImage: gradient }}
      >
        <motion.div animate={flipControls} className="relative block h-8 w-full">
          <motion.img
            src={designToggleKnob}
            alt=""
            width={32}
            height={32}
            className="absolute top-0 size-8 drop-shadow-sm"
            initial={false}
            animate={{
              left: on ? "calc(100% - 32px)" : 0,
              rotate: on ? 180 : 0,
              scale: on ? 1.05 : 1,
            }}
            transition={
              reduceMotion
                ? { duration: 0.15 }
                : { type: "spring", stiffness: 480, damping: 18, mass: 0.55 }
            }
          />
        </motion.div>
      </motion.button>
    </motion.div>
  );
}
