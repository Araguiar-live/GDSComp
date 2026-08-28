import { AnimatePresence, motion } from "framer-motion";
import { Sun } from "lucide-react";
import { useCallback, useRef, useState, type ReactNode } from "react";
import avatarImg from "@/assets/crcle/avatar.png";
import batteryIcon from "@/assets/crcle/battery.svg";
import cellularIcon from "@/assets/crcle/cellular.svg";
import chatCameraIcon from "@/assets/crcle/chat/camera.svg";
import chatCrosshairIcon from "@/assets/crcle/chat/crosshair.svg";
import chatMicIcon from "@/assets/crcle/chat/mic.svg";
import chatPhotoIcon from "@/assets/crcle/chat/photo.svg";
import chatPlusIcon from "@/assets/crcle/chat/plus.svg";
import crcleLogo from "@/assets/crcle/crcle-logo.svg";
import heartIcon from "@/assets/crcle/heart.svg";
import laptopBadgeIcon from "@/assets/crcle/signal/laptop-badge.svg";
import notificationBg from "@/assets/crcle/notification-bg.svg";
import chatHeaderPattern from "@/assets/crcle/chat-header-pattern.png";
import chatHeaderGlowDark from "@/assets/crcle/chat-header-glow-dark.svg";
import chatHeaderOrbLg from "@/assets/crcle/chat-header-orb-lg.svg";
import chatHeaderOrbSm from "@/assets/crcle/chat-header-orb-sm.svg";
import chatHeaderBlobA from "@/assets/crcle/chat-header-blob-a.svg";
import chatHeaderBlobB from "@/assets/crcle/chat-header-blob-b.svg";
import chatHeaderBlobC from "@/assets/crcle/chat-header-blob-c.svg";
import chatHeaderBlobD from "@/assets/crcle/chat-header-blob-d.svg";
import chatDotsIcon from "@/assets/crcle/onboarding/chat-dots.svg";
import closeAddIcon from "@/assets/crcle/onboarding/close-add.svg";
import listIcon from "@/assets/crcle/onboarding/list.svg";
import message2Icon from "@/assets/crcle/onboarding/message-2.svg";
import onboardLaptopIcon from "@/assets/crcle/onboarding/laptop-mini.svg";
import userFilledIcon from "@/assets/crcle/onboarding/user-filled.svg";
import serenaPortrait from "@/assets/crcle/serena-portrait.png";
import wifiIcon from "@/assets/crcle/wifi.svg";
import { ChatListItem, type ChatConversation } from "@/components/portfolio/ChatListItem";
import { CrclePhoneFrame } from "@/components/portfolio/CrclePhoneFrame";
import {
  CrcleBackButton,
  CrcleMoreButton,
  CrclePrimaryDock,
} from "@/components/portfolio/CrcleChrome";
import {
  SignalInterceptModal,
  type UserProfile,
} from "@/components/portfolio/SignalInterceptModal";
import {
  SignalCard,
  TheLocusDrawer,
  type LocusSignalPayload,
  type SignalCardModel,
} from "@/components/portfolio/TheLocusDrawer";

/**
 * CRCLE Messaging & Signal — multi-state interactive flow (Figma Messaging section).
 * inbox (notifications) → signal gate → active chat, with context menu overlay.
 */

const FONT = "Montserrat, ui-sans-serif, system-ui, sans-serif";
const GLASS =
  "backdrop-blur-xl bg-[rgba(2,3,29,0.55)] border border-[rgba(247,246,242,0.18)]";
const EASE = [0.22, 1, 0.36, 1] as const;

type Phase = "inbox" | "chat";

/** Demo connection profiles — modal renders any UserProfile. */
const CONNECTION_PROFILES: UserProfile[] = [
  {
    id: "conn-jordan",
    name: "Jordan Ellis",
    username: "@JordanEllis",
    relationshipStatus: "Open",
    orientation: "Queer",
    distance: "1.1km",
    age: 27,
    photoUrl: avatarImg,
    matchType: "Purpose Match",
    matchBio: "Building intentional communities and late-night design critiques",
    isVerified: false,
  },
  {
    id: "conn-serena",
    name: "Serena Min",
    username: "@SerenaMin",
    relationshipStatus: "Single",
    orientation: "Hetero",
    distance: "2.4km",
    age: 24,
    photoUrl: serenaPortrait,
    matchType: "Signal Match",
    matchBio: "Looking for high romantic connections",
    isVerified: true,
  },
];

const MOCK_CONVERSATIONS: ChatConversation[] = [
  {
    id: "chat-sarah",
    userName: "Sarah Chen",
    userAvatarUrl: avatarImg,
    lastMessage: "Let's catch up next week",
    timestamp: "1d",
    unreadCount: 2,
    isOnline: true,
    showFlame: true,
    messages: [
      {
        id: "m1",
        text: "Hi! I saw your profile and noticed we're both working on design systems. Would love to connect and exchange ideas about component libraries.",
        sentAt: "5h ago",
        fromMe: false,
      },
      {
        id: "m2",
        text: "Hey! How are you?",
        sentAt: "Just now",
        fromMe: true,
      },
    ],
  },
  {
    id: "chat-jordan",
    userName: "Jordan Ellis",
    userAvatarUrl: avatarImg,
    lastMessage: "That workshop was wild — coffee soon?",
    timestamp: "3h",
    unreadCount: 1,
    isOnline: true,
    showFlame: true,
    messages: [
      {
        id: "m1",
        text: "That workshop was wild — coffee soon?",
        sentAt: "3h ago",
        fromMe: false,
      },
    ],
  },
  {
    id: "chat-serena",
    userName: "Serena Min",
    userAvatarUrl: serenaPortrait,
    lastMessage: "Glad we matched on signal ✨",
    timestamp: "2m",
    unreadCount: 3,
    isOnline: true,
    showFlame: false,
    messages: [
      {
        id: "m1",
        text: "Glad we matched on signal — your frequency felt right.",
        sentAt: "10m ago",
        fromMe: false,
      },
      {
        id: "m2",
        text: "Same here. Looking forward to talking more.",
        sentAt: "2m ago",
        fromMe: true,
      },
    ],
  },
  {
    id: "chat-maya",
    userName: "Maya Okonkwo",
    userAvatarUrl: avatarImg,
    lastMessage: "Sent you the deck",
    timestamp: "1w",
    unreadCount: 0,
    isOnline: false,
    showFlame: true,
    messages: [
      {
        id: "m1",
        text: "Sent you the deck — let me know what you think.",
        sentAt: "1w ago",
        fromMe: false,
      },
    ],
  },
];

export function CrcleMessaging({
  onGoToProfile,
  onGoToSignalHome,
  onGoToRadar,
}: {
  onGoToProfile?: () => void;
  onGoToSignalHome?: () => void;
  onGoToRadar?: () => void;
} = {}) {
  const [phase, setPhase] = useState<Phase>("inbox");
  const [menuOpen, setMenuOpen] = useState(false);
  /* Figma 322:118341 — Messaging Hub onboarding over Active Chats */
  const [onboardingOpen, setOnboardingOpen] = useState(true);
  const [notificationsOpen, setNotificationsOpen] = useState(true);
  const [activeMatch, setActiveMatch] = useState<UserProfile | null>(null);
  const [activeConversation, setActiveConversation] = useState<ChatConversation | null>(null);
  const [tab, setTab] = useState<"sent" | "received">("received");
  const [draft, setDraft] = useState("");
  const [isLightMode, setIsLightMode] = useState(false);
  const [locusOpen, setLocusOpen] = useState(false);
  const [signalCard, setSignalCard] = useState<SignalCardModel | null>(null);

  const openInbox = useCallback(() => {
    setPhase("inbox");
    setMenuOpen(false);
    setOnboardingOpen(false);
    setNotificationsOpen(true);
  }, []);

  const openSignal = useCallback((user: UserProfile) => {
    setActiveMatch(user);
    setMenuOpen(false);
  }, []);

  const declineSignal = useCallback((_userId: string) => {
    setActiveMatch(null);
  }, []);

  const acceptSignal = useCallback((userId: string) => {
    setActiveMatch(null);
    setMenuOpen(false);
    const matched =
      MOCK_CONVERSATIONS.find((c) =>
        userId === "conn-serena" ? c.id === "chat-serena" : c.id === "chat-jordan",
      ) ?? MOCK_CONVERSATIONS[0];
    setActiveConversation(matched);
    setDraft("");
    setPhase("chat");
  }, []);

  const openConversation = useCallback((conversationId: string) => {
    const found = MOCK_CONVERSATIONS.find((c) => c.id === conversationId) ?? null;
    setActiveConversation(found);
    setDraft("");
    setMenuOpen(false);
    setLocusOpen(false);
    setSignalCard(null);
    setPhase("chat");
  }, []);

  const dismissOnboarding = useCallback(() => {
    setOnboardingOpen(false);
    setPhase("inbox");
    setNotificationsOpen(true);
    setMenuOpen(false);
  }, []);

  const continueFromOnboarding = useCallback(() => {
    dismissOnboarding();
  }, [dismissOnboarding]);

  const goProfile = useCallback(() => {
    if (onGoToProfile) {
      onGoToProfile();
      return;
    }
    setOnboardingOpen(false);
    setActiveMatch(null);
    setMenuOpen(false);
    setPhase("inbox");
  }, [onGoToProfile]);

  const goHome = useCallback(() => {
    if (onGoToSignalHome) {
      onGoToSignalHome();
      return;
    }
    setOnboardingOpen(false);
    setActiveMatch(null);
    setMenuOpen(false);
    setPhase("inbox");
  }, [onGoToSignalHome]);

  const goRadar = useCallback(() => {
    if (onGoToRadar) {
      onGoToRadar();
      return;
    }
    openInbox();
  }, [onGoToRadar, openInbox]);

  const handleSendSignal = useCallback((payload: LocusSignalPayload) => {
    setLocusOpen(false);
    setSignalCard({
      ...payload,
      id: `signal-${Date.now()}`,
      status: "pending",
    });
  }, []);

  return (
    <div className="relative ml-auto w-fit">
      <motion.button
        type="button"
        aria-label={isLightMode ? "Switch to dark mode" : "Switch to light mode"}
        aria-pressed={isLightMode}
        onClick={() => setIsLightMode((v) => !v)}
        className="absolute left-1/2 -top-10 z-30 flex size-8 -translate-x-1/2 items-center justify-center border-0 bg-transparent p-0 shadow-none outline-none ring-0"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
      >
        <Sun
          strokeWidth={1.5}
          className={`size-6 transition-colors duration-300 ${
            isLightMode ? "fill-amber-400 text-amber-400" : "fill-none text-zinc-800"
          }`}
        />
      </motion.button>

      <CrclePhoneFrame
        light={isLightMode}
        overlay={
          <AnimatePresence>
            {activeMatch ? (
              <SignalInterceptModal
                key={activeMatch.id}
                user={activeMatch}
                isLight={isLightMode}
                onDecline={declineSignal}
                onAccept={acceptSignal}
              />
            ) : null}
          </AnimatePresence>
        }
      >
        <AnimatePresence mode="wait">
          {phase === "chat" ? (
            <motion.div
              key="chat"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.32, ease: EASE }}
              transformTemplate={() => ""}
              className="absolute inset-0 z-10 flex flex-col bg-[var(--crcle-bg-deep)] transition-colors duration-300"
            >
              <ChatHeader
                conversation={activeConversation}
                onBack={() => {
                  setLocusOpen(false);
                  setPhase("inbox");
                }}
                onMenu={() => setMenuOpen((v) => !v)}
              />
              <ChatThread
                conversation={activeConversation}
                signal={signalCard}
                onAcceptSignal={() =>
                  setSignalCard((s) => (s ? { ...s, status: "accepted" } : s))
                }
                onRaincheckSignal={() =>
                  setSignalCard((s) => (s ? { ...s, status: "raincheck" } : s))
                }
                onCounterPropose={() =>
                  setSignalCard((s) =>
                    s
                      ? {
                          ...s,
                          status: "pending",
                          when: "Tomorrow",
                          activityLabel: s.activityLabel,
                        }
                      : s,
                  )
                }
              />
              <TheLocusDrawer
                open={locusOpen}
                onClose={() => setLocusOpen(false)}
                onSendSignal={handleSendSignal}
              />
              <ChatComposer
                draft={draft}
                onDraftChange={setDraft}
                locusOpen={locusOpen}
                onToggleLocus={() => setLocusOpen((v) => !v)}
              />
            </motion.div>
          ) : (
            <motion.div
              key="hub"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative flex h-full min-h-0 flex-col"
            >
              {/* Header stack — status → Messages row (never overlapped) */}
              <div className="relative z-30 shrink-0">
                <StatusBar />
                <MessagesHeader
                  onBack={goProfile}
                  menuOpen={menuOpen}
                  onToggleMenu={() => setMenuOpen((v) => !v)}
                />
              </div>

              {/* Content below header */}
              <div
                className="relative z-10 min-h-0 flex-1"
                onClick={() => menuOpen && setMenuOpen(false)}
              >
                <motion.div
                  key="inbox"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="absolute inset-x-3 top-0 bottom-[100px] overflow-hidden"
                >
                  {/* Chat list under overlay — fixed offset for Closed header (Figma ~95px) */}
                  <div className="absolute inset-0 z-0 overflow-y-auto overflow-x-hidden pb-6 pt-[155px]">
                    <ActiveChatList
                      conversations={MOCK_CONVERSATIONS}
                      onSelectConversation={openConversation}
                    />
                  </div>

                  <NotificationCenter
                    expanded={notificationsOpen}
                    onExpandedChange={setNotificationsOpen}
                    tab={tab}
                    onTabChange={setTab}
                    profiles={CONNECTION_PROFILES}
                    onViewSignal={openSignal}
                    onViewDailyDrop={goRadar}
                  />
                </motion.div>
              </div>

              {!onboardingOpen ? (
                <CrclePrimaryDock
                  active="messages"
                  onProfile={goProfile}
                  onMessages={openInbox}
                  onRadar={goRadar}
                  onSignalHome={goHome}
                />
              ) : null}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {menuOpen && (
            <ContextMenu onClose={() => setMenuOpen(false)} top={phase === "chat" ? 100 : 132} />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {phase === "inbox" && onboardingOpen && (
            <MessagingOnboarding onClose={dismissOnboarding} onContinue={continueFromOnboarding} />
          )}
        </AnimatePresence>
      </CrclePhoneFrame>
    </div>
  );
}

/* ——— Shared chrome ——— */

function StatusBar({ onAccent = false }: { onAccent?: boolean }) {
  return (
    <div
      className={`relative z-20 mx-auto flex h-[62px] w-[84%] shrink-0 items-end justify-between px-2 pb-[10px] transition-colors duration-300 ${
        onAccent ? "text-[#f7f6f2]" : "text-[var(--crcle-fg)]"
      }`}
    >
      <span
        className="text-[17px] font-semibold leading-[22px]"
        style={{ fontFamily: "SF Pro, system-ui, -apple-system, sans-serif" }}
      >
        9:41
      </span>
      <div className={`flex items-center gap-[7px] pb-0.5 ${onAccent ? "" : "crcle-theme-icon"}`}>
        <IconImg src={cellularIcon} className="h-[12.226px] w-[19.2px]" />
        <IconImg src={wifiIcon} className="h-[12.328px] w-[17.142px]" />
        <IconImg src={batteryIcon} className="h-[13px] w-[27.328px]" />
      </div>
    </div>
  );
}

function MessagesHeader({
  onBack,
  menuOpen,
  onToggleMenu,
}: {
  onBack?: () => void;
  menuOpen: boolean;
  onToggleMenu: () => void;
}) {
  return (
    <div className="relative z-20 flex h-10 shrink-0 items-center justify-between px-3">
      <CrcleBackButton onClick={onBack} disabled={!onBack} />

      <h1
        className="pointer-events-none absolute inset-x-14 top-0 flex h-10 items-center justify-center text-center text-[19px] font-normal leading-none text-[var(--crcle-fg)] transition-colors duration-300"
        style={{ fontFamily: FONT }}
      >
        Messages
      </h1>

      <CrcleMoreButton onClick={onToggleMenu} expanded={menuOpen} />
    </div>
  );
}

function ChatHeader({
  conversation,
  onBack,
  onMenu,
}: {
  conversation: ChatConversation | null;
  onBack: () => void;
  onMenu: () => void;
}) {
  const name = conversation?.userName ?? "Conversation";
  const avatar = conversation?.userAvatarUrl ?? avatarImg;
  const online = conversation?.isOnline ?? false;

  return (
    <div className="relative z-20 w-full shrink-0 overflow-hidden">
      {/* Light — Figma 257:63596 cyan wash */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden [.crcle-phone:not(.crcle-phone--light)_&]:hidden"
        aria-hidden
      >
        <img
          alt=""
          src={chatHeaderPattern}
          className="absolute inset-0 size-full max-w-none object-cover object-center"
        />
      </div>

      {/* Dark — Figma 769:205653 soft teal wash (blobs/orbs heavily feathered) */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden bg-[#1e2939] [.crcle-phone--light_&]:hidden"
        aria-hidden
      >
        {/* Soft organic blobs — 6–8px blur so edges read as glow, not hard shapes */}
        <div className="absolute left-[169px] top-[10px] flex h-[117.246px] w-[119.076px] items-center justify-center">
          <img
            alt=""
            src={chatHeaderBlobA}
            className="h-[89px] w-[84px] max-w-none rotate-[120deg] opacity-70 blur-[8px]"
          />
        </div>
        <div className="absolute left-[110.42px] top-[107.58px] flex h-[75.513px] w-[76.759px] items-center justify-center">
          <img
            alt=""
            src={chatHeaderBlobB}
            className="h-[57.438px] w-[54.033px] max-w-none rotate-[120deg] opacity-65 blur-[7px]"
          />
        </div>
        <div className="absolute left-[14px] top-[-36px] flex h-[134.936px] w-[137.163px] items-center justify-center">
          <img
            alt=""
            src={chatHeaderBlobC}
            className="h-[102.638px] w-[96.553px] max-w-none rotate-[120deg] opacity-70 blur-[8px]"
          />
        </div>
        <img
          alt=""
          src={chatHeaderBlobD}
          className="absolute left-[-10px] top-[52px] h-[89px] w-[84px] max-w-none opacity-65 blur-[7px]"
        />

        {/* Ellipse rings → soft bokeh */}
        <img
          alt=""
          src={chatHeaderOrbSm}
          className="absolute left-[206px] top-[83px] size-[50px] max-w-none opacity-70 blur-[6px]"
        />
        <img
          alt=""
          src={chatHeaderOrbSm}
          className="absolute left-[115px] top-[-18px] size-[50px] max-w-none opacity-70 blur-[6px]"
        />
        <img
          alt=""
          src={chatHeaderOrbLg}
          className="absolute left-[303px] top-[-19px] size-[132px] max-w-none opacity-75 blur-[8px]"
        />

        {/* Cyan wash + top-right highlight */}
        <img
          alt=""
          src={chatHeaderGlowDark}
          className="absolute left-[-8px] top-[-7px] h-[201px] w-[486px] max-w-none opacity-85 blur-[4px]"
        />
        <div className="absolute right-[-12px] top-[-8px] size-[120px] rounded-full bg-[radial-gradient(circle,rgba(254,254,254,0.22)_0%,transparent_70%)] blur-[8px]" />
      </div>

      <div className="relative z-[1] flex flex-col gap-1">
        <StatusBar />
        <div className="relative flex flex-col items-center px-3 pb-3 pt-0">
          {/* Centered avatar + name (overlaps action row) — Figma 769:205669 */}
          <div className="pointer-events-none relative z-[1] mb-[-40px] flex h-[42px] w-[141px] items-center gap-3">
            <div className="relative size-[42px] shrink-0 overflow-hidden rounded-full border border-[rgba(2,3,29,0.2)] [.crcle-phone:not(.crcle-phone--light)_&]:border-[#f7f6f2]">
              <img alt="" src={avatar} className="absolute inset-0 size-full object-cover object-center" />
            </div>
            <div className="flex min-w-0 flex-1 flex-col items-start">
              <p
                className="truncate text-[16px] font-medium leading-6 tracking-[-0.3125px] text-[#02031d] [.crcle-phone:not(.crcle-phone--light)_&]:text-white"
                style={{ fontFamily: FONT }}
              >
                {name}
              </p>
              <p
                className="text-[12px] leading-4 text-[rgba(2,3,29,0.55)] [.crcle-phone:not(.crcle-phone--light)_&]:text-white/60"
                style={{ fontFamily: FONT }}
              >
                {online ? "Online" : "Offline"}
              </p>
            </div>
          </div>

          <div className="relative flex h-10 w-full items-center justify-between">
            <CrcleBackButton onClick={onBack} />
            <CrcleMoreButton onClick={onMenu} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ——— Messaging Onboarding (Figma 385:135261) ——— */

function MessagingOnboarding({
  onClose,
  onContinue,
}: {
  onClose: () => void;
  onContinue: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28, ease: EASE }}
      className="absolute inset-0 z-[55] flex flex-col overflow-hidden rounded-[53px] bg-[rgba(2,3,29,0.82)] backdrop-blur-[12px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="messaging-onboarding-title"
    >
      {/* Figma 385:135317 — clipped to screen curve; dense scrim so dock/list don’t bleed through */}
      <div className="flex min-h-0 flex-1 flex-col px-3.5 pb-11 pt-[112px]">
        <div className="flex min-h-0 flex-1 flex-col items-center gap-[39px]">
          <div className="flex w-full shrink-0 flex-col items-center gap-9">
            <div className="flex w-full flex-col items-end">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close onboarding"
                className="crcle-glass-btn relative flex h-10 shrink-0 items-center justify-center overflow-hidden rounded-[24px] px-2 py-0.5"
              >
                <div className="dock-glass-lens opacity-40" aria-hidden />
                <IconImg src={closeAddIcon} className="relative z-[1] size-6" />
              </button>
            </div>

            <IconImg src={message2Icon} className="size-9 shrink-0" />

            <div className="flex w-full flex-col items-center gap-2 text-center">
              <p
                id="messaging-onboarding-title"
                className="w-full text-[14px] font-medium leading-[21px] text-[#f7f6f2]"
                style={{ fontFamily: FONT }}
              >
                Your connection nerve center.
              </p>
              <p
                className="w-full text-[13px] font-light leading-[1.4] text-[rgba(247,246,242,0.6)]"
                style={{ fontFamily: FONT }}
              >
                One simple list for everything. Your ongoing chats and your new invites live together here, so you
                never miss a connection.
              </p>
            </div>
          </div>

          <div className="flex w-full min-h-0 flex-1 flex-col gap-4 overflow-y-auto">
            <OnboardingFeature
              icon={<IconImg src={listIcon} className="size-4" />}
              title="Unified Feed"
              body="Incoming invites appear directly at the top of your chat list as clickable preview cards."
            />
            <OnboardingFeature
              icon={<SignalGateIcon />}
              title={'The "Signal Intercepted" Gate'}
              body="Tapping a preview opens the profile view. Here, you review their intent tags and choose to accept or decline."
            />
            <OnboardingFeature
              icon={<IconImg src={chatDotsIcon} className="size-4" />}
              title="Seamless Transition"
              body="Hitting Accept unlocks the profile and instantly opens your live chat thread."
              showDivider={false}
            />
          </div>
        </div>

        <div className="mt-auto flex shrink-0 flex-col items-center gap-[18px] pt-6">
          <p
            className="w-full text-center text-[14px] font-medium leading-[21px] text-[#f7f6f2]"
            style={{ fontFamily: FONT }}
          >
            Messaging Hub features
          </p>
          <button
            type="button"
            onClick={onContinue}
            className="flex w-[91px] flex-col items-center gap-[5px] rounded-xl transition hover:bg-white/5"
          >
            <IconImg src={crcleLogo} className="h-[17px] w-[49px]" />
            <span
              className="w-full text-center text-[11px] leading-[1.1] tracking-[-0.2px] text-[rgba(247,246,242,0.4)]"
              style={{ fontFamily: FONT }}
            >
              Verified Social
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function OnboardingFeature({
  icon,
  title,
  body,
  showDivider = true,
}: {
  icon: ReactNode;
  title: string;
  body: string;
  showDivider?: boolean;
}) {
  return (
    <div className="flex w-full shrink-0 flex-col gap-3">
      <div className="flex items-center gap-2">
        <div className="flex size-4 shrink-0 items-center justify-center">{icon}</div>
        <p
          className="min-w-0 text-[15px] font-normal leading-[1.2] text-[#f7f6f2]"
          style={{ fontFamily: FONT }}
        >
          {title}
        </p>
      </div>
      <p
        className="text-[13px] font-light leading-[1.35] text-[rgba(247,246,242,0.6)]"
        style={{ fontFamily: FONT }}
      >
        {body}
      </p>
      {showDivider ? <div className="h-px w-[168px] bg-[rgba(247,246,242,0.18)]" /> : null}
    </div>
  );
}

function SignalGateIcon() {
  return (
    <div className="relative size-4 shrink-0 rounded-[12.5px] border-[0.5px] border-[#11df59] bg-[rgba(253,252,251,0.3)] p-px">
      <div className="relative flex size-full items-center justify-center overflow-hidden rounded-full">
        <IconImg src={userFilledIcon} className="size-[11px]" />
        <div className="absolute inset-0 flex items-center justify-center gap-[0.7px] rounded-full bg-[rgba(255,255,255,0.05)] backdrop-blur-[0.25px]">
          <span className="h-[2.7px] w-[1.4px] rounded-full bg-[#f7f6f2]" />
          <span className="h-[4.5px] w-[1.4px] rounded-full bg-[#f7f6f2]" />
          <span className="h-[2.7px] w-[1.4px] rounded-full bg-[#f7f6f2]" />
        </div>
      </div>
      <div className="absolute -left-[2px] -top-px flex size-2 items-center justify-center rounded-full border border-[#f7f6f2] bg-[rgba(253,252,251,0.4)] p-0.5">
        <IconImg src={onboardLaptopIcon} className="size-[4px]" />
      </div>
    </div>
  );
}

/* ——— Notification Center (Figma 350:22916 — Opened / Closed) ——— */

function NotificationCenter({
  expanded,
  onExpandedChange,
  tab,
  onTabChange,
  profiles,
  onViewSignal,
  onViewDailyDrop,
}: {
  expanded: boolean;
  onExpandedChange: (open: boolean) => void;
  tab: "sent" | "received";
  onTabChange: (t: "sent" | "received") => void;
  profiles: UserProfile[];
  onViewSignal: (user: UserProfile) => void;
  onViewDailyDrop: () => void;
}) {
  const dragStartY = useRef<number | null>(null);

  const onHandlePointerDown = (clientY: number) => {
    dragStartY.current = clientY;
  };

  const onHandlePointerMove = (clientY: number) => {
    if (dragStartY.current == null) return;
    const delta = dragStartY.current - clientY;
    if (!expanded && delta > 28) {
      onExpandedChange(true);
      dragStartY.current = null;
    } else if (expanded && delta < -28) {
      onExpandedChange(false);
      dragStartY.current = null;
    }
  };

  const onHandlePointerUp = () => {
    dragStartY.current = null;
  };

  return (
    <div className="pointer-events-none absolute inset-x-0 top-10 z-10 flex w-full flex-col items-start">
      {/* Property 1=Closed: header only · Property 1=Opened: header + body */}
      <div
        className={`pointer-events-auto relative flex w-full flex-col items-start ${
          expanded ? "" : "overflow-hidden rounded-[16px] shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
        }`}
      >
        {/* Header — Figma 257:63418 (Default / Variant2) */}
        <div
          className={`relative flex w-full flex-col items-center overflow-hidden bg-[var(--crcle-nc-header-bg)] transition-colors duration-300 ${
            expanded ? "rounded-tl-[16px] rounded-tr-[16px]" : "rounded-[16px]"
          }`}
        >
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <img
              alt=""
              src={notificationBg}
              className="absolute left-[-8px] top-[-7px] h-[201px] w-[486px] max-w-none object-contain"
            />
          </div>

          <div
            className="relative flex w-full cursor-pointer items-start justify-between p-2 text-left"
            onClick={() => {
              if (!expanded) onExpandedChange(true);
            }}
            onPointerDown={(e) => {
              if (!expanded) onHandlePointerDown(e.clientY);
            }}
            onPointerMove={(e) => {
              if (!expanded) onHandlePointerMove(e.clientY);
            }}
            onPointerUp={onHandlePointerUp}
            onPointerCancel={onHandlePointerUp}
            role={expanded ? undefined : "button"}
            tabIndex={expanded ? undefined : 0}
            onKeyDown={(e) => {
              if (!expanded && (e.key === "Enter" || e.key === " ")) {
                e.preventDefault();
                onExpandedChange(true);
              }
            }}
            aria-expanded={expanded}
            aria-label={expanded ? undefined : "Expand notifications"}
          >
            <div className="flex min-w-0 flex-1 flex-col items-center justify-center gap-3">
              <p
                className="w-full text-left text-[15px] leading-[21px] text-[var(--crcle-nc-title)] transition-colors duration-300"
                style={{ fontFamily: FONT }}
              >
                Notifications
              </p>
              <div role="presentation" onClick={(e) => e.stopPropagation()}>
                <SentReceivedToggle tab={tab} onChange={onTabChange} />
              </div>
            </div>
            <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[var(--crcle-nc-badge)] transition-colors duration-300">
              <span className="text-[13px] leading-[18.2px] text-white" style={{ fontFamily: FONT }}>
                {profiles.length}
              </span>
            </div>
          </div>
        </div>

        {/* Opened body — Figma 257:63476 */}
        <motion.div
          initial={false}
          animate={{
            height: expanded ? "auto" : 0,
            opacity: expanded ? 1 : 0,
          }}
          transition={{ duration: 0.32, ease: EASE }}
          className="w-full overflow-hidden"
          aria-hidden={!expanded}
          style={{ pointerEvents: expanded ? "auto" : "none" }}
        >
          <div className="relative flex w-full flex-col items-start gap-4 rounded-bl-[28px] rounded-br-[28px] border-x border-b border-[var(--crcle-panel-border)] bg-[var(--crcle-panel)] px-[9px] pb-[11px] pt-[10px] shadow-[0_12px_40px_rgba(0,0,0,0.18)] transition-all duration-300 hover:bg-[rgba(247,246,242,0.1)] hover:backdrop-blur-[14px]">
            <DailyDropBanner onView={onViewDailyDrop} />
            <div className="flex items-start gap-4">
              {profiles.map((profile) => (
                <ConnectionAvatar
                  key={profile.id}
                  badge="laptop"
                  photoUrl={profile.photoUrl}
                  name={profile.name}
                  onClick={() => onViewSignal(profile)}
                />
              ))}
            </div>
            <SwipeHandle
              label="Collapse notifications"
              onToggle={() => onExpandedChange(false)}
              onPointerDown={onHandlePointerDown}
              onPointerMove={onHandlePointerMove}
              onPointerUp={onHandlePointerUp}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function SwipeHandle({
  label,
  onToggle,
  onPointerDown,
  onPointerMove,
  onPointerUp,
}: {
  label: string;
  onToggle: () => void;
  onPointerDown: (y: number) => void;
  onPointerMove: (y: number) => void;
  onPointerUp: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onToggle}
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        onPointerDown(e.clientY);
      }}
      onPointerMove={(e) => {
        onPointerMove(e.clientY);
      }}
      onPointerUp={() => onPointerUp()}
      onPointerCancel={() => onPointerUp()}
      className="mx-auto flex h-3 w-9 touch-none items-center justify-center opacity-80 transition-opacity hover:opacity-100"
    >
      <span className="block h-[3px] w-9 rounded-full bg-[var(--crcle-handle)] transition-colors duration-300" />
    </button>
  );
}

function SentReceivedToggle({
  tab,
  onChange,
}: {
  tab: "sent" | "received";
  onChange: (tab: "sent" | "received") => void;
}) {
  return (
    <div className="crcle-glass-btn flex w-[178px] items-center gap-1 rounded-[24px] bg-transparent p-1 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.05)] backdrop-blur-[8px]">
      {(["sent", "received"] as const).map((key) => (
        <button
          key={key}
          type="button"
          onClick={() => onChange(key)}
          className={`relative z-[1] flex flex-1 items-center justify-center px-2.5 py-1 text-[13px] capitalize transition-colors duration-300 ${
            tab === key
              ? "rounded-[20px] bg-[rgba(2,3,29,0.2)] text-white"
              : "text-[var(--crcle-toggle-idle)]"
          }`}
          style={{ fontFamily: FONT }}
        >
          {key}
        </button>
      ))}
    </div>
  );
}

function DailyDropBanner({ onView }: { onView: () => void }) {
  return (
    <div className="w-full rounded-[64px] bg-[rgba(222,221,218,0.6)] backdrop-blur-[13px] py-1.5 pl-4 pr-2">
      <div className="flex items-center justify-center gap-2">
        <div className="min-w-0 flex-1">
          <p className="text-[13px] leading-[1.4] text-[#030426]" style={{ fontFamily: FONT }}>
            Daily Drop is ready
          </p>
          <p className="truncate text-[13px] font-light leading-[1.4] text-[#6b7280]" style={{ fontFamily: FONT }}>
            3 new people to discover.
          </p>
        </div>
        <button
          type="button"
          onClick={onView}
          className="flex h-full shrink-0 items-center justify-center overflow-hidden rounded-[36px] bg-[#02031d] px-4 py-2"
        >
          <span className="text-[11px] leading-[1.4] whitespace-nowrap text-[#fefefe]" style={{ fontFamily: FONT }}>
            View
          </span>
        </button>
      </div>
    </div>
  );
}

function ActiveChatList({
  conversations,
  onSelectConversation,
}: {
  conversations: ChatConversation[];
  onSelectConversation: (conversationId: string) => void;
}) {
  return (
    <div className="flex flex-col gap-3 pb-4">
      <div className="flex items-center justify-between px-0.5">
        <p
          className="text-[15px] leading-[21px] text-[var(--crcle-section-title)] transition-colors duration-300"
          style={{ fontFamily: FONT }}
        >
          Active Chats
        </p>
        <p
          className="text-[13px] font-light leading-[18.2px] text-[var(--crcle-fg-muted)] transition-colors duration-300"
          style={{ fontFamily: FONT }}
        >
          {conversations.length} conversations
        </p>
      </div>
      <div className="flex flex-col">
        {conversations.map((conversation) => (
          <ChatListItem
            key={conversation.id}
            conversation={conversation}
            onSelect={onSelectConversation}
          />
        ))}
      </div>
    </div>
  );
}

/* ——— State 3: Context menu ——— */

function ContextMenu({ onClose, top }: { onClose: () => void; top: number }) {
  const items: { label: string; danger?: boolean }[] = [
    { label: "Report User", danger: true },
    { label: "Block User", danger: true },
    { label: "Edit profile" },
    { label: "Verification" },
    { label: "Settings" },
    { label: "User Sharecode" },
  ];

  return (
    <>
      <motion.button
        type="button"
        aria-label="Close menu"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 z-40 bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, y: -8, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.96 }}
        transition={{ duration: 0.22, ease: EASE }}
        style={{ top }}
        className={`absolute right-4 z-50 w-[168px] rounded-[24px] p-3 flex flex-col gap-2.5 shadow-2xl ${GLASS}`}
      >
        {items.map((item, i) => (
          <div key={item.label}>
            {i === 2 || i === 4 ? <div className="mb-2 h-px bg-[rgba(247,246,242,0.15)]" /> : null}
            <button
              type="button"
              className={`w-full text-left text-[11px] font-medium ${
                item.danger ? "text-[#ff6b6b]" : "text-[#f7f6f2]"
              }`}
              style={{ fontFamily: FONT }}
            >
              {item.label}
            </button>
          </div>
        ))}
      </motion.div>
    </>
  );
}

/* ——— State 5: Chat (Figma 415:410931) ——— */

function ChatThread({
  conversation,
  signal,
  onAcceptSignal,
  onRaincheckSignal,
  onCounterPropose,
}: {
  conversation: ChatConversation | null;
  signal: SignalCardModel | null;
  onAcceptSignal: () => void;
  onRaincheckSignal: () => void;
  onCounterPropose: () => void;
}) {
  const messages = conversation?.messages ?? [];

  return (
    <div className="relative flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto bg-[var(--crcle-bg-deep)] px-4 pb-24 pt-6 transition-colors duration-300">
      <div className="flex items-center justify-center gap-3">
        <span className="h-px w-12 bg-[#d9d9de]" />
        <p className="shrink-0 text-[11px] leading-[1.4] text-[#d9d9de]" style={{ fontFamily: FONT }}>
          Connected via Purpose
        </p>
        <span className="h-px w-12 bg-[#d9d9de]" />
      </div>

      {messages.map((message) =>
        message.fromMe ? (
          <div key={message.id} className="flex w-full justify-end">
            <div className="flex max-w-[278px] flex-col gap-1 rounded-tl-[20px] rounded-tr-[20px] rounded-bl-[20px] rounded-br-[4px] bg-[#f7f6f2] px-4 pb-3 pt-3">
              <p className="text-[13px] leading-[1.4] text-[#02031d]" style={{ fontFamily: FONT }}>
                {message.text}
              </p>
              <p className="text-[11px] leading-[1.4] text-[rgba(3,4,38,0.3)]" style={{ fontFamily: FONT }}>
                {message.sentAt}
              </p>
            </div>
          </div>
        ) : (
          <div key={message.id} className="flex w-full justify-start">
            <div className="flex max-w-[278px] flex-col gap-1 rounded-tl-[4px] rounded-tr-[20px] rounded-bl-[20px] rounded-br-[20px] border-[0.5px] border-[var(--crcle-border)] bg-[rgba(255,255,255,0.1)] px-4 pb-3 pt-3 transition-colors duration-300 [.crcle-phone--light_&]:bg-white [.crcle-phone--light_&]:shadow-sm">
              <p className="text-[13px] leading-[1.4] text-[var(--crcle-fg)] transition-colors duration-300" style={{ fontFamily: FONT }}>
                {message.text}
              </p>
              <p className="text-[11px] leading-[1.4] text-[var(--crcle-fg-ghost)] transition-colors duration-300" style={{ fontFamily: FONT }}>
                {message.sentAt}
              </p>
            </div>
          </div>
        ),
      )}

      {signal && (
        <SignalCard
          signal={signal}
          onAccept={onAcceptSignal}
          onRaincheck={onRaincheckSignal}
          onCounterPropose={onCounterPropose}
        />
      )}

      <p className="text-center text-[11px] leading-[1.4] text-[#b1b1bc]" style={{ fontFamily: FONT }}>
        End-to-end encrypted
      </p>
    </div>
  );
}

function ChatComposer({
  draft,
  onDraftChange,
  locusOpen,
  onToggleLocus,
}: {
  draft: string;
  onDraftChange: (v: string) => void;
  locusOpen: boolean;
  onToggleLocus: () => void;
}) {
  const [attachOpen, setAttachOpen] = useState(false);

  return (
    <div className="absolute inset-x-0 bottom-0 z-20">
      {/* Attach toolbar — Figma 769:207143 */}
      <AnimatePresence>
        {attachOpen ? (
          <motion.div
            key="attach-toolbar"
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.22, ease: EASE }}
            className="absolute bottom-[96px] left-4 flex items-start rounded-[64px] border border-[rgba(0,0,0,0.25)] bg-transparent p-1.5 [.crcle-phone:not(.crcle-phone--light)_&]:border-[rgba(247,246,242,0.25)]"
          >
            <div className="flex items-center gap-[12px]">
              <button
                type="button"
                aria-label="Camera"
                className="box-border flex size-9 items-center justify-center rounded-[36px] bg-[rgba(2,3,29,0.1)] p-[11px] [.crcle-phone:not(.crcle-phone--light)_&]:bg-[rgba(255,255,255,0.1)]"
              >
                <IconImg src={chatCameraIcon} className="crcle-theme-icon size-[22px]" />
              </button>
              <button
                type="button"
                aria-label="Photo"
                className="box-border flex size-9 items-center justify-center rounded-[36px] bg-[rgba(2,3,29,0.1)] p-[11px] [.crcle-phone:not(.crcle-phone--light)_&]:bg-[rgba(255,255,255,0.1)]"
              >
                <IconImg src={chatPhotoIcon} className="crcle-theme-icon size-[22px]" />
              </button>
              <button
                type="button"
                aria-label={locusOpen ? "Close The Locus" : "Open The Locus"}
                aria-pressed={locusOpen}
                onClick={() => {
                  onToggleLocus();
                  setAttachOpen(false);
                }}
                className={`box-border flex size-9 items-center justify-center rounded-[26px] p-[11px] transition ${
                  locusOpen
                    ? "bg-[#02031d] [.crcle-phone:not(.crcle-phone--light)_&]:bg-[#f7f6f2]"
                    : "bg-[rgba(2,3,29,0.1)] [.crcle-phone:not(.crcle-phone--light)_&]:bg-[rgba(255,255,255,0.1)]"
                }`}
              >
                <IconImg
                  src={chatCrosshairIcon}
                  className={`size-[22px] ${
                    locusOpen
                      ? "brightness-0 invert [.crcle-phone:not(.crcle-phone--light)_&]:brightness-0 [.crcle-phone:not(.crcle-phone--light)_&]:invert-0"
                      : "crcle-theme-icon"
                  }`}
                />
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="border-t border-[var(--crcle-border)] bg-[rgba(253,252,251,0.05)] px-5 pb-5 pt-[17px] transition-colors duration-300 [.crcle-phone--light_&]:bg-white/70">
        <div className="flex h-[42.5px] items-center gap-2">
          <motion.button
            type="button"
            aria-label={attachOpen ? "Close attach menu" : "Open attach menu"}
            aria-pressed={attachOpen}
            onClick={() => setAttachOpen((v) => !v)}
            animate={{ rotate: attachOpen ? 45 : 0 }}
            transition={{ duration: 0.22, ease: EASE }}
            className={`flex size-9 shrink-0 items-center justify-center rounded-full transition ${
              attachOpen
                ? "bg-[#02031d] text-[#f7f6f2] [.crcle-phone:not(.crcle-phone--light)_&]:bg-[#f7f6f2] [.crcle-phone:not(.crcle-phone--light)_&]:text-[#02031d]"
                : "bg-[rgba(247,246,242,0.1)] [.crcle-phone--light_&]:bg-[rgba(2,4,38,0.06)]"
            }`}
          >
            {attachOpen ? (
              <span className="text-[22px] font-light leading-none">+</span>
            ) : (
              <IconImg src={chatPlusIcon} className="crcle-theme-icon size-5" />
            )}
          </motion.button>
          <div className="flex h-[42.5px] min-w-0 flex-1 items-center rounded-full bg-[rgba(222,221,218,0.2)] px-4 [.crcle-phone--light_&]:bg-[rgba(2,4,38,0.06)]">
            <input
              value={draft}
              onChange={(e) => onDraftChange(e.target.value)}
              placeholder="Message..."
              className="h-[22.5px] w-full bg-transparent text-[15px] tracking-[-0.23px] text-[var(--crcle-fg)] outline-none placeholder:text-[var(--crcle-fg-muted)] transition-colors duration-300"
              style={{ fontFamily: FONT }}
            />
          </div>
          <button type="button" aria-label="Voice message" className="flex size-9 shrink-0 items-center justify-center">
            <IconImg src={chatMicIcon} className="crcle-theme-icon size-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ——— Primitives ——— */

function IconImg({
  src,
  className = "size-6",
  children,
}: {
  src: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={`relative shrink-0 overflow-hidden ${className}`}>
      <img alt="" src={src} className="absolute inset-0 size-full max-w-none object-contain" />
      {children}
    </div>
  );
}

function ConnectionAvatar({
  badge,
  photoUrl,
  name,
  showWaveform = false,
  onClick,
}: {
  badge: "laptop" | "heart";
  photoUrl: string;
  name: string;
  showWaveform?: boolean;
  onClick?: () => void;
}) {
  const badgeSrc = badge === "laptop" ? laptopBadgeIcon : heartIcon;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Open signal for ${name}`}
      className="group relative flex size-[53px] shrink-0 items-center justify-center rounded-[26.5px] border border-[#11df59] bg-[rgba(253,252,251,0.3)] p-0.5 aspect-square transition-transform duration-200 hover:scale-[1.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#11df59]/40"
    >
      <div className="relative size-[46px] overflow-hidden rounded-full aspect-square">
        <img alt="" src={photoUrl} className="absolute inset-0 size-full object-cover object-center" />
        <div
          className={`absolute inset-0 bg-black/60 transition-opacity duration-200 ease-out ${
            showWaveform ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
          }`}
        />
      </div>
      {/* Purpose badge — Figma 350:22979 stroke laptop */}
      <div className="absolute -left-[3px] -top-[4px] z-[1] flex w-5 flex-col items-center justify-center rounded-[64px] border-[0.5px] border-[#f7f6f2] bg-[rgba(253,252,251,0.8)] p-1 backdrop-blur-[0.5px]">
        <IconImg src={badgeSrc} className="h-3 w-3.5" />
      </div>
      <div
        className={`pointer-events-none absolute inset-0 z-[1] flex items-center justify-center gap-[2.3px] transition-opacity duration-200 ease-out ${
          showWaveform ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
        }`}
      >
        <span className="h-[9px] w-[4.5px] rounded-full bg-[#f7f6f2]" />
        <span className="h-[15px] w-[4.5px] rounded-full bg-[#f7f6f2]" />
        <span className="h-[9px] w-[4.5px] rounded-full bg-[#f7f6f2]" />
      </div>
    </button>
  );
}
