import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight, Search, Share2, SlidersHorizontal } from "lucide-react";
import { OdicciBrowserFrame } from "@/components/portfolio/OdicciBrowserFrame";
import {
  PLAYABLE_THEMES,
  PlayableTemplatePreview,
} from "@/components/portfolio/PlayableTemplatePreview";
import { OdicciCreateExperiencesModal } from "@/components/portfolio/OdicciCreateExperiencesModal";
import { OdicciAppSidebar } from "@/components/portfolio/OdicciAppSidebar";
import odicciBadge from "@/assets/odicci/odicci-badge-mark.svg";
import cardSporty from "@/assets/odicci/template-library/card-sporty.png";
import cardForest from "@/assets/odicci/template-library/card-forest.png";
import cardFestive from "@/assets/odicci/template-library/card-festive.png";
import cardSummer from "@/assets/odicci/template-library/card-summer.png";
import cardBeauty from "@/assets/odicci/template-library/card-beauty.png";
import cardCoffee from "@/assets/odicci/template-library/card-coffee.png";
import cardStreetwear from "@/assets/odicci/template-library/card-streetwear.png";
import cardFitness from "@/assets/odicci/template-library/card-fitness.png";
import cardTech from "@/assets/odicci/template-library/card-tech.png";
import previewPhone from "@/assets/odicci/template-library/preview-phone.png";
import previewStage from "@/assets/odicci/template-library/preview-stage.png";
import qrPreview from "@/assets/odicci/template-library/qr-preview.svg";
import iconGameboy from "@/assets/odicci/template-library/icon-gameboy.svg";
import iconGameboyLight from "@/assets/odicci/template-library/icon-gameboy-light.svg";
import iconTrending from "@/assets/odicci/template-library/icon-trending.svg";
import emptyExperience from "@/assets/odicci/template-library/empty-experience.png";
import welcomeAtmosphere from "@/assets/odicci/template-library/welcome-atmosphere.png";
import welcomeOrbs from "@/assets/odicci/template-library/welcome-orbs-layer.svg";
import welcomeMesh from "@/assets/odicci/template-library/welcome-mesh-a.svg";

/**
 * Odicci Template Library — Figma 393:172682
 * Sticky filter bar + sticky sidebar preview mockup.
 */

const ACCENT = "#FF5A2B";
const FONT = "Poppins, ui-sans-serif, system-ui, sans-serif";

const FILTER_DROPDOWNS = [
  "Industries & Niches",
  "Experience Type",
  "Calendar & Seasonal",
  "Evergreen & Behavioural",
  "Style",
] as const;

const CATEGORIES = [
  "For you",
  "Apparel & Accessories",
  "Automotive",
  "Babies",
  "Beauty & Personal Care",
  "Electronics & Gadgets",
  "Education",
  "Artisanal",
  "Food",
  "Outdoors",
  "Entertainment",
] as const;

type TemplateCard = {
  id: string;
  image: string;
  preview: string;
  previewPosition: string;
  badge: "light" | "dark";
  label: string;
  metric: string;
};

const TEMPLATE_CARDS: readonly TemplateCard[] = [
  {
    id: "summer",
    image: cardSummer,
    preview: cardSummer,
    previewPosition: "object-[center_45%]",
    badge: "light",
    label: "Spin to win",
    metric: "+41K",
  },
  {
    id: "beauty",
    image: cardBeauty,
    preview: cardBeauty,
    previewPosition: "object-[center_40%]",
    badge: "light",
    label: "Product quiz",
    metric: "+18K",
  },
  {
    id: "coffee",
    image: cardCoffee,
    preview: cardCoffee,
    previewPosition: "object-[center_42%]",
    badge: "dark",
    label: "Scratch & win",
    metric: "+33K",
  },
  {
    id: "streetwear",
    image: cardStreetwear,
    preview: cardStreetwear,
    previewPosition: "object-[center_38%]",
    badge: "dark",
    label: "Tap to unlock",
    metric: "+52K",
  },
  {
    id: "fitness",
    image: cardFitness,
    preview: cardFitness,
    previewPosition: "object-[center_40%]",
    badge: "light",
    label: "7-day challenge",
    metric: "+29K",
  },
  {
    id: "tech",
    image: cardTech,
    preview: cardTech,
    previewPosition: "object-[center_35%]",
    badge: "dark",
    label: "Flash deal",
    metric: "+64K",
  },
  {
    id: "sporty",
    image: cardSporty,
    preview: cardSporty,
    previewPosition: "object-[center_35%]",
    badge: "light",
    label: "Shake to reveal",
    metric: "+27K",
  },
  {
    id: "forest",
    image: cardForest,
    preview: cardForest,
    previewPosition: "object-[center_40%]",
    badge: "dark",
    label: "Tap to reveal",
    metric: "+22K",
  },
  {
    id: "festive",
    image: cardFestive,
    preview: previewPhone,
    previewPosition: "object-top",
    badge: "dark",
    label: "Scratch to reveal",
    metric: "+27K",
  },
] as const;

const SECTION_FOR_YOU = TEMPLATE_CARDS.slice(0, 3);
const SECTION_TRENDING = TEMPLATE_CARDS.slice(3, 6);
const SECTION_SEASONAL = TEMPLATE_CARDS.slice(6, 9);

const RECENT_EXPERIENCES = [
  {
    id: "first",
    title: "Untitled",
    label: "Shake to reveal",
    when: "2 days ago",
    status: "Draft",
    image: emptyExperience,
  },
  {
    id: "summer-splash",
    title: "Summer splash sale",
    label: "Spin to win",
    when: "5 days ago",
    status: "Draft",
    image: cardSummer,
  },
  {
    id: "brew-club",
    title: "Brew club rewards",
    label: "Scratch & win",
    when: "1 week ago",
    status: "Live",
    image: cardCoffee,
  },
] as const;

export function OdicciTemplateLibrary() {
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("For you");
  const [selectedId, setSelectedId] = useState(TEMPLATE_CARDS[0].id);
  const [query, setQuery] = useState("");
  const [createOpen, setCreateOpen] = useState(false);

  const selectedIndex = Math.max(
    0,
    TEMPLATE_CARDS.findIndex((c) => c.id === selectedId),
  );

  const selectByOffset = (delta: number) => {
    const next = (selectedIndex + delta + TEMPLATE_CARDS.length) % TEMPLATE_CARDS.length;
    setSelectedId(TEMPLATE_CARDS[next].id);
  };

  return (
    <OdicciBrowserFrame
      tabLabel="odicci | Template library"
      url="odicci.com/templates"
      canvasClassName="bg-[#f7f8fa]"
      showThemeToggle={false}
    >
      <div className="relative flex size-full flex-col overflow-hidden bg-white text-[#1a1d21]" style={{ fontFamily: FONT }}>
        <TemplateNavbar onCreateNew={() => setCreateOpen(true)} />

        <div className="flex min-h-0 min-w-0 flex-1 overflow-hidden">
          <OdicciAppSidebar activeId="layers" />

          <div className="flex min-h-0 min-w-0 flex-1 gap-4 overflow-hidden px-4 pb-4 pt-3">
            {/* Left — scrollable feed; filter sticks while cards scroll */}
            <div className="relative min-h-0 min-w-0 flex-1 overflow-y-auto overscroll-contain pr-1 [-ms-overflow-style:none] [scrollbar-width:thin]">
              <WelcomeBanner />

              <div className="sticky -top-px z-20 -mx-1 bg-white/95 px-1 pb-3 pt-3 backdrop-blur-md">
                <FilterBar query={query} onQueryChange={setQuery} />
                <CategoryTabs active={category} onChange={setCategory} />
              </div>

              <TemplateSection
                title="For you"
                cards={SECTION_FOR_YOU}
                selectedId={selectedId}
                onSelect={setSelectedId}
              />
              <TemplateSection
                title="Trending now"
                cards={SECTION_TRENDING}
                selectedId={selectedId}
                onSelect={setSelectedId}
                className="mt-8"
              />
              <TemplateSection
                title="Seasonal picks"
                cards={SECTION_SEASONAL}
                selectedId={selectedId}
                onSelect={setSelectedId}
                className="mt-8 pb-6"
              />
            </div>

            {/* Right — sticky preview sidebar */}
            <aside className="sticky top-0 flex h-full w-[357px] shrink-0 flex-col self-start">
              <PreviewSidebar
                cardIndex={selectedIndex}
                onPrev={() => selectByOffset(-1)}
                onNext={() => selectByOffset(1)}
              />
            </aside>
          </div>
        </div>

        <OdicciCreateExperiencesModal open={createOpen} onClose={() => setCreateOpen(false)} />
      </div>
    </OdicciBrowserFrame>
  );
}

function TemplateNavbar({ onCreateNew }: { onCreateNew: () => void }) {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-4 border-b border-[#e8e8e8]/80 bg-white/90 pr-5 backdrop-blur-md">
      {/* Logo sits over the app sidebar; nav aligns with the content column (search bar) */}
      <div className="flex min-w-0 items-center">
        <div className="flex w-[72px] shrink-0 items-center justify-center">
          <img src={odicciBadge} alt="odicci" className="h-8 w-7 shrink-0 object-contain" />
        </div>
        <nav className="ml-4 flex items-center gap-1 rounded-full bg-[#f4f6f8] p-1 text-[13px] font-medium tracking-tight">
          <span className="rounded-full bg-white px-4 py-1.5 text-[#1a1d21] shadow-[0_1px_2px_rgba(16,24,40,0.06)] ring-1 ring-black/[0.04]">
            Experiences
          </span>
          <button
            type="button"
            className="rounded-full px-4 py-1.5 text-[#6b7280] transition hover:bg-white/70 hover:text-[#1a1d21]"
          >
            Reporting
          </button>
          <button
            type="button"
            className="rounded-full px-4 py-1.5 text-[#6b7280] transition hover:bg-white/70 hover:text-[#1a1d21]"
          >
            Assets
          </button>
        </nav>
      </div>

      <div className="flex shrink-0 items-center gap-2.5">
        <span className="rounded-full bg-[#f4f6f8] px-2.5 py-1 text-[12px] font-medium tracking-wide text-[#6b7280]">
          Basic
        </span>
        <button
          type="button"
          aria-label="Help"
          className="flex size-8 items-center justify-center rounded-full text-[#6b7280] transition hover:bg-[#f4f6f8] hover:text-[#1a1d21]"
        >
          <span className="flex size-5 items-center justify-center rounded-full border border-[#d1d5db] text-[11px] font-medium leading-none">
            ?
          </span>
        </button>
        <button
          type="button"
          onClick={onCreateNew}
          className="rounded-full px-4 py-2 text-[13px] font-medium tracking-tight text-white shadow-[0_6px_16px_rgba(255,90,43,0.28)] transition hover:brightness-105 active:scale-[0.98]"
          style={{ backgroundColor: ACCENT }}
        >
          Create new
        </button>
        <button
          type="button"
          aria-label="Account"
          className="flex size-8 items-center justify-center rounded-full text-[13px] font-semibold text-white ring-2 ring-white ring-offset-1 ring-offset-[#f4f6f8]"
          style={{ backgroundColor: ACCENT }}
        >
          U
        </button>
      </div>
    </header>
  );
}

function WelcomeBanner() {
  return (
    /* Outer radius = inner header radius + 4px */
    <section
      className="odicci-welcome-ring relative overflow-hidden bg-white p-3"
      style={{ borderRadius: "calc(var(--welcome-inner-r, 16px) + 4px)" }}
    >
      {/* Header strip only — Sign Uo Flow 393:172696 / patterns 393:172038 */}
      <div
        className="relative h-[105px] overflow-hidden bg-[#004074]"
        style={{ borderRadius: "var(--welcome-inner-r, 16px)" }}
      >
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <img
            alt=""
            src={welcomeAtmosphere}
            className="odicci-welcome-atmosphere absolute inset-0 size-full object-cover"
            draggable={false}
          />
          <img
            alt=""
            src={welcomeMesh}
            className="odicci-welcome-mesh absolute -left-[10%] -top-[80%] h-[280%] w-[70%] max-w-none object-cover opacity-40 mix-blend-soft-light"
            draggable={false}
          />
          <img
            alt=""
            src={welcomeOrbs}
            className="odicci-welcome-orbs absolute -right-[5%] -top-[120%] h-[320%] w-[55%] max-w-none object-cover opacity-70 mix-blend-screen"
            draggable={false}
          />
        </div>
        <div className="relative z-10 flex h-full flex-col justify-center gap-0.5 px-5">
          <p className="text-[28px] font-medium leading-none tracking-tight text-white">Welcome User!</p>
          <p className="text-[15px] font-normal leading-snug tracking-tight text-white/90">
            There&apos;s nothing here yet...
          </p>
        </div>
      </div>

      {/* Recent games sit below the header inside the outlined frame */}
      <div className="mt-3 flex w-full gap-3 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {RECENT_EXPERIENCES.map((exp) => (
          <div
            key={exp.id}
            className="flex w-[min(353px,78%)] shrink-0 flex-col gap-2 rounded-[20px] border border-[#e8e8e8] bg-white p-2 sm:w-[calc((100%-1.5rem)/3)] sm:min-w-0"
          >
            <div className="flex items-center justify-between gap-2 px-0.5">
              <span className="inline-flex h-6 max-w-[70%] items-center gap-1.5 truncate rounded-full bg-[#004074] px-2.5 text-[11px] font-medium text-white">
                <img src={iconGameboyLight} alt="" className="size-3.5 shrink-0" />
                <span className="truncate">{exp.label}</span>
              </span>
              <span className="shrink-0 text-[11px] text-[#838383]">{exp.when}</span>
            </div>
            <div className="relative h-[120px] overflow-hidden rounded-[12px] sm:h-[148px]">
              <img
                alt=""
                src={exp.image}
                className="absolute inset-0 size-full object-cover"
                draggable={false}
              />
            </div>
            <div className="flex items-center justify-between gap-2 px-1 pb-0.5">
              <p className="min-w-0 truncate text-[13px] font-medium text-[#1a1d21] sm:text-[14px]">
                {exp.title}
              </p>
              <span
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-md border px-2 py-0.5 text-[11px] font-medium ${
                  exp.status === "Draft"
                    ? "border-[#e5e7eb] bg-[#f3f4f6] text-[#6b7280]"
                    : "border-[#86efac] bg-[#dcfce7] text-[#15803d]"
                }`}
              >
                {exp.status === "Live" ? (
                  <span className="relative flex size-1.5 shrink-0" aria-hidden>
                    <span className="absolute inset-0 animate-ping rounded-full bg-[#22c55e] opacity-75" />
                    <span className="relative size-1.5 rounded-full bg-[#16a34a]" />
                  </span>
                ) : null}
                {exp.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FilterBar({
  query,
  onQueryChange,
}: {
  query: string;
  onQueryChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <label className="relative flex h-11 w-[273px] shrink-0 items-center gap-2 rounded-xl border border-[#e0e0e0] bg-white px-3">
        <Search className="size-4 text-[#838383]" strokeWidth={1.75} />
        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search templates..."
          className="min-w-0 flex-1 bg-transparent text-[13px] text-[#1a1d21] outline-none placeholder:text-[#838383]"
        />
        <kbd className="rounded-md bg-[#f1f3f5] px-1.5 py-0.5 text-[11px] text-[#838383]">⌘K</kbd>
      </label>

      <div className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto rounded-xl border border-[#e0e0e0] bg-[#f7f8fa] p-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {FILTER_DROPDOWNS.map((label) => (
          <button
            key={label}
            type="button"
            className="flex h-9 shrink-0 items-center gap-1 rounded-lg px-3 text-[13px] text-[#5e6166] transition hover:bg-white"
          >
            {label}
            <ChevronDown className="size-3.5 opacity-60" strokeWidth={1.75} />
          </button>
        ))}
      </div>

      <button
        type="button"
        className="flex h-11 shrink-0 items-center gap-2 rounded-xl border border-[#e0e0e0] bg-white px-4 text-[14px] font-medium text-[#1a1d21]"
      >
        <SlidersHorizontal className="size-4" strokeWidth={1.75} />
        Filters
      </button>
    </div>
  );
}

function CategoryTabs({
  active,
  onChange,
}: {
  active: (typeof CATEGORIES)[number];
  onChange: (c: (typeof CATEGORIES)[number]) => void;
}) {
  return (
    <div className="mt-3 flex gap-2 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {CATEGORIES.map((cat) => {
        const isActive = cat === active;
        return (
          <button
            key={cat}
            type="button"
            onClick={() => onChange(cat)}
            className={`h-9 shrink-0 rounded-full px-4 text-[13px] transition ${
              isActive
                ? "font-medium text-white"
                : "border border-[#e0e0e0] bg-white text-[#5e6166] hover:border-[#c5cad1]"
            }`}
            style={isActive ? { backgroundColor: ACCENT } : undefined}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}

function TemplateSection({
  title,
  cards,
  selectedId,
  onSelect,
  className = "",
}: {
  title: string;
  cards: readonly TemplateCard[];
  selectedId: string;
  onSelect: (id: string) => void;
  className?: string;
}) {
  return (
    <section className={className}>
      <h3 className="mb-3 text-[18px] font-medium tracking-tight text-[#1a1d21]">{title}</h3>
      <div className="grid grid-cols-3 gap-4">
        {cards.map((card) => (
          <button
            key={`${title}-${card.id}`}
            type="button"
            onClick={() => onSelect(card.id)}
            className={`flex flex-col gap-2 rounded-2xl border bg-white p-2 text-left transition ${
              selectedId === card.id
                ? "border-[#ff5a2b] shadow-[0_0_0_1px_#ff5a2b]"
                : "border-[#e0e0e0] hover:border-[#c5cad1]"
            }`}
          >
            <div className="relative aspect-[342/236] w-full overflow-hidden rounded-[14px]">
              <img
                alt=""
                src={card.image}
                className="absolute inset-0 size-full object-cover"
                draggable={false}
              />
            </div>
            <div className="flex items-center justify-between gap-2">
              <span
                className={`flex h-6 items-center gap-1 rounded-lg border px-2 text-[12px] font-medium ${
                  card.badge === "light"
                    ? "border-[#003362] bg-white text-[#003362]"
                    : "border-[#003362] bg-[#0d2847] text-white"
                }`}
              >
                <img
                  alt=""
                  src={card.badge === "light" ? iconGameboy : iconGameboyLight}
                  className="size-3.5"
                />
                {card.label}
              </span>
              <span className="flex items-center gap-0.5 text-[14px] text-[#838383]">
                {card.metric}
                <img alt="" src={iconTrending} className="size-5" />
              </span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

function PreviewSidebar({
  cardIndex,
  onPrev,
  onNext,
}: {
  cardIndex: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  const card = TEMPLATE_CARDS[cardIndex] ?? TEMPLATE_CARDS[0];

  return (
    <div className="flex h-full flex-col gap-3 overflow-hidden rounded-2xl border border-[#e8e8e8] bg-white p-4">
      <div className="flex shrink-0 items-center justify-between">
        <button
          type="button"
          aria-label="Previous template"
          onClick={onPrev}
          className="flex size-8 items-center justify-center rounded-full bg-[#ebeef2] text-[#5e6166]"
        >
          <ChevronLeft className="size-4" strokeWidth={1.75} />
        </button>
        <button
          type="button"
          aria-label="Next template"
          onClick={onNext}
          className="flex size-8 items-center justify-center rounded-full bg-[#ebeef2] text-[#5e6166]"
        >
          <ChevronRight className="size-4" strokeWidth={1.75} />
        </button>
      </div>

      {/* Figma 393:169425 — stage pattern image + phone */}
      <div className="relative flex min-h-0 flex-1 flex-col items-center justify-center overflow-hidden rounded-3xl p-5 shadow-[0_4px_4px_rgba(0,0,0,0.05)]">
        <img
          alt=""
          src={previewStage}
          className="pointer-events-none absolute inset-0 size-full rounded-3xl object-cover"
          draggable={false}
        />
        <div className="relative z-[1] flex w-[248px] max-w-full flex-col items-center overflow-hidden rounded-[42px] border-[9px] border-black bg-black shadow-[inset_0_4px_4px_rgba(255,255,255,0.15)]">
          <div className="absolute left-1/2 top-2.5 z-[2] flex -translate-x-1/2 items-start gap-2.5">
            <span className="h-3 w-[76px] rounded-full bg-black shadow-[4px_4px_4px_rgba(255,255,255,0.1)]" />
            <span className="size-3 rounded-full bg-black shadow-[0_4px_4px_rgba(255,255,255,0.15)]" />
          </div>
          <div className="relative z-[1] aspect-[210/430] w-full overflow-hidden bg-black">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={card.id}
                className="absolute inset-0"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ type: "spring", stiffness: 360, damping: 32, opacity: { duration: 0.16 } }}
              >
                <PlayableTemplatePreview
                  theme={PLAYABLE_THEMES[card.id] ?? PLAYABLE_THEMES.summer}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="flex shrink-0 gap-2">
        <img alt="" src={qrPreview} className="size-20 shrink-0" />
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <button
            type="button"
            className="flex h-9 flex-1 items-center justify-center rounded-lg text-[15px] text-white"
            style={{ backgroundColor: ACCENT }}
          >
            Use Template
          </button>
          <button
            type="button"
            className="flex h-9 flex-1 items-center justify-center gap-1 rounded-lg bg-[#f1f3f5] text-[15px] text-[#7d8288]"
          >
            <Share2 className="size-4" strokeWidth={1.75} />
            Share
          </button>
        </div>
      </div>

      <p className="shrink-0 text-center text-[12px] text-[#5e6166]">
        Scan QR code for preview
        <span className="sr-only"> — template {card.label}</span>
      </p>
    </div>
  );
}
