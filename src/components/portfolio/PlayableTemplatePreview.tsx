import { useEffect, useEffectEvent, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";

export type PlayableMechanic = "spin" | "quiz" | "scratch" | "unlock" | "jump" | "deal" | "shake" | "reveal";

export type PlayableTheme = {
  id: string;
  title: string;
  subtitle: string;
  mechanic: PlayableMechanic;
  accent: string;
  accentSoft: string;
  bgFrom: string;
  bgTo: string;
  reward: string;
  rewardCode: string;
  quizOptions?: string[];
};

type Step = "form" | "game" | "reward";

export function PlayableTemplatePreview({ theme }: { theme: PlayableTheme }) {
  const [step, setStep] = useState<Step>("form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setStep("form");
    setName("");
    setEmail("");
  }, [theme.id]);

  const onSubmitForm = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStep("game");
  };

  return (
    <div
      className="absolute inset-0 flex flex-col overflow-hidden text-white"
      style={{
        background: `linear-gradient(165deg, ${theme.bgFrom} 0%, ${theme.bgTo} 100%)`,
        fontFamily: "Poppins, ui-sans-serif, system-ui, sans-serif",
      }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div
          className="absolute -right-8 -top-10 size-40 rounded-full blur-2xl"
          style={{ background: theme.accent }}
        />
        <div
          className="absolute -bottom-12 -left-10 size-44 rounded-full blur-3xl"
          style={{ background: theme.accentSoft }}
        />
      </div>

      <div className="relative z-[1] flex items-center justify-center gap-1.5 pt-9 pb-1">
        <span className="rounded-md bg-black/25 px-2 py-0.5 text-[9px] font-medium tracking-wide text-white/85 backdrop-blur-sm">
          Preview Mode · Play
        </span>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {step === "form" && (
          <motion.div
            key="form"
            className="relative z-[1] flex min-h-0 flex-1 flex-col px-3.5 pb-4 pt-2"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            transition={{ duration: 0.22 }}
          >
            <p className="text-[15px] font-semibold leading-tight tracking-tight">{theme.title}</p>
            <p className="mt-1 text-[11px] leading-snug text-white/75">{theme.subtitle}</p>

            <form onSubmit={onSubmitForm} className="mt-4 flex flex-1 flex-col gap-2.5">
              <label className="block">
                <span className="mb-1 block text-[10px] font-medium text-white/70">Name</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex"
                  className="h-9 w-full rounded-lg border border-white/20 bg-white/95 px-2.5 text-[12px] text-zinc-900 outline-none placeholder:text-zinc-400 focus:ring-2"
                  style={{ ["--tw-ring-color" as string]: theme.accent }}
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-[10px] font-medium text-white/70">Email</span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@brand.com"
                  className="h-9 w-full rounded-lg border border-white/20 bg-white/95 px-2.5 text-[12px] text-zinc-900 outline-none placeholder:text-zinc-400 focus:ring-2"
                />
              </label>
              <p className="text-[9px] leading-snug text-white/55">
                By continuing you agree to receive offers from this demo brand.
              </p>
              <button
                type="submit"
                className="mt-auto h-10 w-full rounded-xl text-[13px] font-semibold text-white shadow-lg transition active:scale-[0.98]"
                style={{ backgroundColor: theme.accent }}
              >
                Play to unlock offer
              </button>
            </form>
          </motion.div>
        )}

        {step === "game" && (
          <motion.div
            key="game"
            className="relative z-[1] flex min-h-0 flex-1 flex-col px-3 pb-3 pt-1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22 }}
          >
            <GameStage theme={theme} onWin={() => setStep("reward")} />
          </motion.div>
        )}

        {step === "reward" && (
          <motion.div
            key="reward"
            className="relative z-[1] flex min-h-0 flex-1 flex-col items-center justify-center px-4 pb-5 text-center"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
          >
            <div
              className="mb-3 flex size-14 items-center justify-center rounded-2xl text-2xl shadow-lg"
              style={{ backgroundColor: theme.accent }}
            >
              🎁
            </div>
            <p className="text-[15px] font-semibold leading-tight">You unlocked a reward</p>
            <p className="mt-1.5 text-[12px] leading-snug text-white/80">{theme.reward}</p>
            <div className="mt-4 w-full rounded-xl border border-dashed border-white/35 bg-black/20 px-3 py-2.5">
              <p className="text-[9px] uppercase tracking-wider text-white/55">Code</p>
              <p className="text-[16px] font-bold tracking-wide" style={{ color: theme.accentSoft }}>
                {theme.rewardCode}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setStep("form")}
              className="mt-4 h-9 w-full rounded-xl bg-white/95 text-[12px] font-semibold text-zinc-900 transition active:scale-[0.98]"
            >
              Replay preview
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function GameStage({ theme, onWin }: { theme: PlayableTheme; onWin: () => void }) {
  switch (theme.mechanic) {
    case "spin":
      return <SpinGame theme={theme} onWin={onWin} />;
    case "quiz":
      return <QuizGame theme={theme} onWin={onWin} />;
    case "scratch":
    case "reveal":
    case "shake":
      return <ScratchGame theme={theme} onWin={onWin} />;
    case "unlock":
    case "deal":
      return <UnlockGame theme={theme} onWin={onWin} />;
    case "jump":
    default:
      return <JumpGame theme={theme} onWin={onWin} />;
  }
}

function SpinGame({ theme, onWin }: { theme: PlayableTheme; onWin: () => void }) {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    const extra = 720 + Math.floor(Math.random() * 360);
    setRotation((r) => r + extra);
    window.setTimeout(() => onWin(), 1600);
  };

  return (
    <div className="flex h-full flex-col items-center">
      <p className="text-center text-[12px] font-semibold">Spin to win</p>
      <p className="mt-0.5 text-center text-[10px] text-white/65">Tap the wheel once</p>
      <button
        type="button"
        onClick={spin}
        disabled={spinning}
        className="relative mt-4 size-[148px] rounded-full border-4 border-white/40 shadow-xl transition active:scale-[0.98] disabled:opacity-90"
        style={{
          background: `conic-gradient(${theme.accent} 0 60deg, #fff 60deg 120deg, ${theme.accentSoft} 120deg 180deg, #1a1d21 180deg 240deg, ${theme.accent} 240deg 300deg, #fff 300deg 360deg)`,
          transform: `rotate(${rotation}deg)`,
          transition: spinning ? "transform 1.45s cubic-bezier(0.15, 0.85, 0.25, 1)" : "none",
        }}
        aria-label="Spin wheel"
      >
        <span className="absolute left-1/2 top-1/2 size-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow" />
      </button>
      <div
        className="mt-[-6px] h-0 w-0 border-l-[7px] border-r-[7px] border-t-[12px] border-l-transparent border-r-transparent"
        style={{ borderTopColor: theme.accent }}
      />
      <p className="mt-3 text-[10px] text-white/55">{spinning ? "Landing…" : "Good luck"}</p>
    </div>
  );
}

function QuizGame({ theme, onWin }: { theme: PlayableTheme; onWin: () => void }) {
  const options = theme.quizOptions ?? ["Option A", "Option B", "Option C"];
  const [picked, setPicked] = useState<string | null>(null);

  return (
    <div className="flex h-full flex-col">
      <p className="text-[12px] font-semibold">Quick product quiz</p>
      <p className="mt-1 text-[10px] text-white/65">Pick what fits your vibe</p>
      <div className="mt-3 flex flex-1 flex-col gap-2">
        {options.map((opt) => {
          const active = picked === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => setPicked(opt)}
              className={`rounded-xl border px-3 py-2.5 text-left text-[11px] font-medium transition ${
                active ? "border-transparent text-white" : "border-white/25 bg-white/10 text-white/90"
              }`}
              style={active ? { backgroundColor: theme.accent } : undefined}
            >
              {opt}
            </button>
          );
        })}
      </div>
      <button
        type="button"
        disabled={!picked}
        onClick={onWin}
        className="mt-2 h-10 w-full rounded-xl text-[12px] font-semibold text-white disabled:opacity-40"
        style={{ backgroundColor: theme.accent }}
      >
        See my offer
      </button>
    </div>
  );
}

function ScratchGame({ theme, onWin }: { theme: PlayableTheme; onWin: () => void }) {
  const [progress, setProgress] = useState(0);
  const scratching = useRef(false);
  const won = useRef(false);

  const addProgress = useEffectEvent((amount: number) => {
    setProgress((p) => {
      const next = Math.min(100, p + amount);
      if (next >= 72 && !won.current) {
        won.current = true;
        window.setTimeout(() => onWin(), 280);
      }
      return next;
    });
  });

  return (
    <div className="flex h-full flex-col items-center">
      <p className="text-[12px] font-semibold">Scratch to reveal</p>
      <p className="mt-0.5 text-[10px] text-white/65">Drag across the card</p>
      <div
        className="relative mt-4 aspect-square w-[150px] touch-none overflow-hidden rounded-2xl border border-white/25 shadow-lg"
        onPointerDown={(e) => {
          scratching.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          addProgress(10);
        }}
        onPointerMove={() => {
          if (!scratching.current) return;
          addProgress(3.2);
        }}
        onPointerUp={() => {
          scratching.current = false;
        }}
        onPointerCancel={() => {
          scratching.current = false;
        }}
      >
        <div
          className="absolute inset-0 flex items-center justify-center text-center text-[13px] font-bold"
          style={{ background: `linear-gradient(145deg, ${theme.accent}, ${theme.accentSoft})` }}
        >
          15% OFF
        </div>
        <div
          className="absolute inset-0 bg-[repeating-linear-gradient(135deg,#c4c4c4_0_10px,#a3a3a3_10px_20px)] transition-opacity duration-200"
          style={{ opacity: Math.max(0, 1 - progress / 100) }}
        />
        <div className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-black/35 px-2 py-0.5 text-[9px] text-white/90">
          {Math.round(progress)}% scratched
        </div>
      </div>
    </div>
  );
}

function UnlockGame({ theme, onWin }: { theme: PlayableTheme; onWin: () => void }) {
  const [taps, setTaps] = useState(0);
  const need = 5;

  return (
    <div className="flex h-full flex-col items-center">
      <p className="text-[12px] font-semibold">Tap to unlock drop</p>
      <p className="mt-0.5 text-[10px] text-white/65">
        {taps}/{need} taps
      </p>
      <button
        type="button"
        onClick={() => {
          const next = taps + 1;
          setTaps(next);
          if (next >= need) window.setTimeout(() => onWin(), 220);
        }}
        className="relative mt-5 flex size-[132px] items-center justify-center rounded-[28px] border border-white/30 bg-white/10 text-[28px] shadow-inner transition active:scale-95"
        style={{ boxShadow: `inset 0 0 0 3px ${theme.accent}55` }}
      >
        <motion.span
          key={taps}
          initial={{ scale: 0.7, opacity: 0.4 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute inset-3 rounded-[22px]"
          style={{
            background: `linear-gradient(160deg, ${theme.accent}cc, ${theme.accentSoft}99)`,
            opacity: taps / need,
          }}
        />
        <span className="relative z-[1]">🔓</span>
      </button>
      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/15">
        <div
          className="h-full rounded-full transition-all duration-200"
          style={{ width: `${(taps / need) * 100}%`, backgroundColor: theme.accent }}
        />
      </div>
    </div>
  );
}

function JumpGame({ theme, onWin }: { theme: PlayableTheme; onWin: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [alive, setAlive] = useState(true);
  const [score, setScore] = useState(0);
  const [runId, setRunId] = useState(0);
  const winScore = 4;
  const handleWin = useEffectEvent(() => onWin());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let running = true;
    const W = canvas.width;
    const H = canvas.height;
    const ground = H - 28;
    const player = { x: 28, y: ground - 22, vy: 0, w: 18, h: 22, onGround: true };
    const gravity = 0.55;
    const jumpV = -8.2;
    type Obstacle = { x: number; w: number; h: number; scored?: boolean };
    let obstacles: Obstacle[] = [{ x: W + 40, w: 14, h: 22 }];
    let coins = 0;
    let frame = 0;

    const jump = () => {
      if (!running) return;
      if (player.onGround) {
        player.vy = jumpV;
        player.onGround = false;
      }
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.key === "ArrowUp") {
        e.preventDefault();
        jump();
      }
    };

    canvas.addEventListener("pointerdown", jump);
    window.addEventListener("keydown", onKey);

    const loop = () => {
      if (!running) return;
      frame += 1;
      ctx.clearRect(0, 0, W, H);

      const g = ctx.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, theme.bgFrom);
      g.addColorStop(1, theme.bgTo);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = "rgba(255,255,255,0.18)";
      ctx.fillRect(0, ground, W, H - ground);

      player.vy += gravity;
      player.y += player.vy;
      if (player.y >= ground - player.h) {
        player.y = ground - player.h;
        player.vy = 0;
        player.onGround = true;
      }

      ctx.fillStyle = theme.accent;
      ctx.beginPath();
      if (typeof ctx.roundRect === "function") {
        ctx.roundRect(player.x, player.y, player.w, player.h, 5);
      } else {
        ctx.rect(player.x, player.y, player.w, player.h);
      }
      ctx.fill();

      if (frame % 70 === 0) {
        obstacles.push({ x: W + 10, w: 12 + Math.random() * 10, h: 18 + Math.random() * 16 });
      }

      obstacles = obstacles.filter((o) => o.x + o.w > -20);
      for (const o of obstacles) {
        o.x -= 2.6;
        ctx.fillStyle = "rgba(255,255,255,0.85)";
        ctx.fillRect(o.x, ground - o.h, o.w, o.h);

        const hit =
          player.x < o.x + o.w &&
          player.x + player.w > o.x &&
          player.y + player.h > ground - o.h;
        if (hit) {
          running = false;
          setAlive(false);
          break;
        }

        if (o.x + o.w < player.x && !o.scored) {
          o.scored = true;
          coins += 1;
          setScore(coins);
          if (coins >= winScore) {
            running = false;
            window.setTimeout(() => handleWin(), 350);
          }
        }
      }

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      canvas.removeEventListener("pointerdown", jump);
      window.removeEventListener("keydown", onKey);
    };
  }, [theme.accent, theme.bgFrom, theme.bgTo, runId, handleWin]);

  return (
    <div className="flex h-full flex-col">
      <div className="mb-1.5 flex items-center justify-between">
        <div>
          <p className="text-[12px] font-semibold">Jump run</p>
          <p className="text-[10px] text-white/65">Tap to jump · clear {winScore}</p>
        </div>
        <span className="rounded-full bg-black/25 px-2 py-0.5 text-[10px] font-semibold">
          {score}/{winScore}
        </span>
      </div>
      <div className="relative min-h-0 flex-1 overflow-hidden rounded-2xl border border-white/20">
        <canvas ref={canvasRef} width={210} height={260} className="block size-full" />
        {!alive && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/55 px-3 text-center">
            <p className="text-[12px] font-semibold">Ouch — try again</p>
            <button
              type="button"
              onClick={() => {
                setAlive(true);
                setScore(0);
                setRunId((n) => n + 1);
              }}
              className="mt-2 h-8 rounded-lg px-3 text-[11px] font-semibold text-white"
              style={{ backgroundColor: theme.accent }}
            >
              Restart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/** Theme pack used by template library cards */
export const PLAYABLE_THEMES: Record<string, PlayableTheme> = {
  summer: {
    id: "summer",
    title: "Summer drop",
    subtitle: "Join the list, then spin for beachwear perks.",
    mechanic: "spin",
    accent: "#0EA5E9",
    accentSoft: "#FDE68A",
    bgFrom: "#0369A1",
    bgTo: "#0E7490",
    reward: "20% off beachwear this week",
    rewardCode: "SUN20",
  },
  beauty: {
    id: "beauty",
    title: "Find your glow",
    subtitle: "Answer one vibe question to unlock a sample.",
    mechanic: "quiz",
    accent: "#E11D48",
    accentSoft: "#FECDD3",
    bgFrom: "#9F1239",
    bgTo: "#BE123C",
    reward: "Free serum sample with any order",
    rewardCode: "GLOW15",
    quizOptions: ["Fresh & dewy", "Soft glam", "Clean minimal"],
  },
  coffee: {
    id: "coffee",
    title: "Brew club",
    subtitle: "Scratch the card for a café treat.",
    mechanic: "scratch",
    accent: "#C2410C",
    accentSoft: "#FDBA74",
    bgFrom: "#7C2D12",
    bgTo: "#9A3412",
    reward: "Free pastry with any drink",
    rewardCode: "BREW-FREE",
  },
  streetwear: {
    id: "streetwear",
    title: "Limited drop",
    subtitle: "Tap to crack the lock on tonight’s release.",
    mechanic: "unlock",
    accent: "#A3E635",
    accentSoft: "#D9F99D",
    bgFrom: "#14532D",
    bgTo: "#1F2937",
    reward: "15% off your first drop order",
    rewardCode: "LOCK15",
  },
  fitness: {
    id: "fitness",
    title: "7-day challenge",
    subtitle: "Clear the run to unlock your training plan.",
    mechanic: "jump",
    accent: "#F97316",
    accentSoft: "#FDBA74",
    bgFrom: "#7C2D12",
    bgTo: "#1E3A8A",
    reward: "Free 7-day training plan",
    rewardCode: "MOVE7",
  },
  tech: {
    id: "tech",
    title: "Flash deal vault",
    subtitle: "Unlock the vault for a gadget discount.",
    mechanic: "deal",
    accent: "#22D3EE",
    accentSoft: "#A5F3FC",
    bgFrom: "#0F172A",
    bgTo: "#1E3A8A",
    reward: "Save $50 on wireless earbuds",
    rewardCode: "TECH50",
  },
  sporty: {
    id: "sporty",
    title: "Sporty dash",
    subtitle: "Jump the course to reveal your drop.",
    mechanic: "jump",
    accent: "#22C55E",
    accentSoft: "#86EFAC",
    bgFrom: "#14532D",
    bgTo: "#0F766E",
    reward: "Free shipping on athletic wear",
    rewardCode: "DASH-SHIP",
  },
  forest: {
    id: "forest",
    title: "Handmade hug",
    subtitle: "Scratch to reveal a woodland offer.",
    mechanic: "scratch",
    accent: "#B91C1C",
    accentSoft: "#FECACA",
    bgFrom: "#14532D",
    bgTo: "#3F6212",
    reward: "5% off all handmade gifts",
    rewardCode: "FOREST5",
  },
  festive: {
    id: "festive",
    title: "Festive treasure",
    subtitle: "Scratch the foil for a holiday surprise.",
    mechanic: "scratch",
    accent: "#DC2626",
    accentSoft: "#FDE68A",
    bgFrom: "#7F1D1D",
    bgTo: "#14532D",
    reward: "A little something to brighten your day",
    rewardCode: "MERRY15",
  },
};
