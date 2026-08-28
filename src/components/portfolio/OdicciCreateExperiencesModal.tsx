import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  Brain,
  Calendar,
  Camera,
  CircleDot,
  FileText,
  Fingerprint,
  Hammer,
  LayoutTemplate,
  Lightbulb,
  Mail,
  MoveHorizontal,
  Pointer,
  Puzzle,
  Smartphone,
  Smile,
  Ticket,
  Timer,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import filterQuiz from "@/assets/odicci/template-library/create/filter-quiz.svg";
import filterAdvocacy from "@/assets/odicci/template-library/create/filter-advocacy.svg";
import filterGames from "@/assets/odicci/template-library/create/filter-games.svg";
import filterRewards from "@/assets/odicci/template-library/create/filter-rewards.svg";
import iconReflex from "@/assets/odicci/template-library/create/icon-reflex.svg";
import iconScratch from "@/assets/odicci/template-library/create/icon-scratch.svg";
import iconGift from "@/assets/odicci/template-library/create/icon-gift.svg";
import iconJackpot from "@/assets/odicci/template-library/create/icon-jackpot.svg";
import iconJump from "@/assets/odicci/template-library/create/icon-jump.svg";
import iconWheel from "@/assets/odicci/template-library/create/icon-wheel.svg";
import iconDrop from "@/assets/odicci/template-library/create/icon-drop.svg";
import iconQuiz from "@/assets/odicci/template-library/create/icon-quiz.svg";

type FilterKind = "quiz" | "games" | "rewards" | "advocacy";
type TagKind = "New" | "Recommended" | "Beta";

type CreateCard = {
  id: string;
  title: string;
  category: string;
  filter: FilterKind;
  tag?: TagKind;
  icon?: "figma" | LucideIcon;
  figmaIcon?: string;
};

const FILTER_META: Record<
  FilterKind,
  { bg: string; icon: string; label: string }
> = {
  quiz: { bg: "#0090FF", icon: filterQuiz, label: "Quiz" },
  games: { bg: "#004074", icon: filterGames, label: "Games" },
  rewards: { bg: "#FF5126", icon: filterRewards, label: "Rewards" },
  advocacy: { bg: "#FF8A65", icon: filterAdvocacy, label: "Advocacy" },
};

/** Figma 393:140770 — Create Experiences module */
const CREATE_CARDS: CreateCard[] = [
  { id: "reflex", title: "Reflex game", category: "Game", filter: "quiz", tag: "New", icon: "figma", figmaIcon: iconReflex },
  { id: "scratch", title: "Scratch to reveal", category: "Rewards", filter: "rewards", icon: "figma", figmaIcon: iconScratch },
  { id: "swipe", title: "Swipe to enrich", category: "Rewards", filter: "rewards", icon: MoveHorizontal },
  { id: "giftbox", title: "GiftBox", category: "Rewards", filter: "rewards", icon: "figma", figmaIcon: iconGift },
  { id: "jackpot", title: "Jackpot", category: "Rewards", filter: "rewards", icon: "figma", figmaIcon: iconJackpot },
  { id: "nps", title: "NPS", category: "Advocacy", filter: "advocacy", icon: Smile },
  { id: "shake", title: "Shake to reveal", category: "Rewards", filter: "rewards", icon: Smartphone },
  { id: "letter", title: "Letter", category: "Rewards", filter: "rewards", icon: Mail },
  { id: "peel", title: "Peel to reveal", category: "Rewards", filter: "rewards", icon: Fingerprint },
  { id: "jump", title: "Jump Game", category: "Games", filter: "games", icon: "figma", figmaIcon: iconJump },
  { id: "snapshot", title: "Snapshot", category: "Rewards", filter: "rewards", icon: Camera },
  { id: "form", title: "Form", category: "Rewards", filter: "rewards", icon: FileText },
  { id: "drop", title: "Drop game", category: "Rewards", filter: "games", tag: "Recommended", icon: "figma", figmaIcon: iconDrop },
  { id: "calendar", title: "Calendar", category: "Rewards", filter: "rewards", icon: Calendar },
  { id: "logic", title: "Logic Quiz", category: "Quiz", filter: "quiz", tag: "Beta", icon: Lightbulb },
  { id: "knowledge", title: "Knowledge", category: "Quiz", filter: "quiz", icon: BookOpen },
  { id: "memory", title: "Memory Game", category: "Rewards", filter: "games", icon: Brain },
  { id: "pinball", title: "Pinball", category: "Games", filter: "rewards", icon: CircleDot },
  { id: "slide", title: "Slide to reveal", category: "Rewards", filter: "rewards", icon: MoveHorizontal },
  { id: "tap", title: "Tap to reveal", category: "Rewards", filter: "rewards", icon: Pointer },
  { id: "wheel", title: "Wheel of fortune", category: "Rewards", filter: "rewards", tag: "Recommended", icon: "figma", figmaIcon: iconWheel },
  { id: "prize", title: "Prize Draw", category: "Rewards", filter: "rewards", icon: Ticket },
  { id: "matching", title: "Matching Game", category: "Rewards", filter: "games", icon: Puzzle },
  { id: "speed", title: "Speed tap", category: "Rewards", filter: "games", tag: "Beta", icon: Timer },
  { id: "refer", title: "Refer a friend", category: "Rewards", filter: "advocacy", icon: Users },
  { id: "landing", title: "Landing Page", category: "Rewards", filter: "rewards", icon: LayoutTemplate },
  { id: "product-quiz", title: "Product Quiz", category: "Quizzes", filter: "quiz", icon: "figma", figmaIcon: iconQuiz },
];

export function OdicciCreateExperiencesModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="absolute inset-0 z-50 flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <button
            type="button"
            aria-label="Close overlay"
            className="absolute inset-0 bg-black/35 backdrop-blur-[2px]"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Create new experience"
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="relative flex max-h-[min(860px,92%)] w-full max-w-[1180px] flex-col overflow-hidden rounded-[24px] bg-white shadow-[0_24px_64px_rgba(0,0,0,0.22)]"
            style={{ fontFamily: "Poppins, ui-sans-serif, system-ui, sans-serif" }}
          >
            <div className="flex shrink-0 items-center justify-between border-b border-[#e8e8e8] px-6 py-4">
              <div>
                <h2 className="text-[18px] font-semibold tracking-tight text-[#1a1d21]">
                  Create new experience
                </h2>
                <p className="mt-0.5 text-[13px] text-[#838383]">
                  Pick a game, reward, quiz, or advocacy template to start from.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="flex size-9 items-center justify-center rounded-full text-[#5e6166] transition hover:bg-[#f4f6f8]"
              >
                <X className="size-4" strokeWidth={1.75} />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {CREATE_CARDS.map((card) => (
                  <CreateExperienceCard key={card.id} card={card} onPick={onClose} />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CreateExperienceCard({
  card,
  onPick,
}: {
  card: CreateCard;
  onPick: () => void;
}) {
  const filter = FILTER_META[card.filter];
  const Icon = card.icon === "figma" ? null : (card.icon as LucideIcon | undefined);

  return (
    <button
      type="button"
      onClick={onPick}
      className="group relative flex aspect-square flex-col items-stretch justify-between rounded-[12px] border border-[#e8e8e8] bg-white p-2 pb-4 text-left transition hover:border-[#c5cad1] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] active:scale-[0.99]"
    >
      <div className="flex w-full items-start justify-between gap-1">
        {card.tag ? (
          <span className="rounded border border-[#8000ff] px-2.5 py-0.5 text-[11px] leading-none text-[#8000ff]">
            {card.tag}
          </span>
        ) : (
          <span />
        )}
        <span
          className="flex size-[26px] shrink-0 items-center justify-center rounded-full p-1.5"
          style={{ backgroundColor: filter.bg }}
          title={filter.label}
        >
          <img alt="" src={filter.icon} className="size-3.5" />
        </span>
      </div>

      <div className="flex flex-col items-center gap-3 px-1">
        <div className="flex size-14 items-center justify-center rounded-full bg-black/[0.02]">
          {card.figmaIcon ? (
            <img alt="" src={card.figmaIcon} className="size-9 object-contain" />
          ) : Icon ? (
            <Icon className="size-8 text-[#1a1d21]" strokeWidth={1.5} />
          ) : (
            <Hammer className="size-8 text-[#1a1d21]" strokeWidth={1.5} />
          )}
        </div>
        <div className="w-full text-center">
          <p className="text-[15px] font-medium leading-tight tracking-tight text-black sm:text-[16px]">
            {card.title}
          </p>
          <p className="mt-0.5 text-[12px] leading-tight text-[#bbbbbb]">{card.category}</p>
        </div>
      </div>
    </button>
  );
}
