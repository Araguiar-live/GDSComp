import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import batteryIcon from "@/assets/crcle/battery.svg";
import cellularIcon from "@/assets/crcle/cellular.svg";
import crcleLogo from "@/assets/crcle/crcle-logo.svg";
import locusCloseIcon from "@/assets/crcle/locus/close-x.svg";
import locusPlusIcon from "@/assets/crcle/locus/plus.svg";
import cameraIcon from "@/assets/crcle/profile/camera.svg";
import datingCoffeeIcon from "@/assets/crcle/profile/dating-coffee.svg";
import datingGroupWhiteIcon from "@/assets/crcle/profile/dating-group-white.svg";
import datingHeartWhiteIcon from "@/assets/crcle/profile/dating-heart-white.svg";
import datingLoveSeatIcon from "@/assets/crcle/profile/dating-love-seat.svg";
import eduDragHandleIcon from "@/assets/crcle/profile/drag-handle-edu.svg";
import eduGraduationIcon from "@/assets/crcle/profile/edu-graduation.svg";
import eduPlusIcon from "@/assets/crcle/profile/edu-plus.svg";
import emptyHeartIcon from "@/assets/crcle/profile/empty-heart.svg";
import emptyLocationIcon from "@/assets/crcle/profile/empty-location.svg";
import emptyPlusIcon from "@/assets/crcle/profile/empty-plus.svg";
import emptySchoolIcon from "@/assets/crcle/profile/empty-school.svg";
import emptyWorkIcon from "@/assets/crcle/profile/empty-work.svg";
import eyeWeekIcon from "@/assets/crcle/profile/eye-week.svg";
import graduationIcon from "@/assets/crcle/profile/graduation.svg";
import heartDatingIcon from "@/assets/crcle/profile/heart-dating.svg";
import laptopWorkIcon from "@/assets/crcle/profile/laptop-work.svg";
import locationMapImg from "@/assets/crcle/profile/location-map-figma.png";
import locationPinMarkerIcon from "@/assets/crcle/profile/location-pin-marker.svg";
import locationProximityRingIcon from "@/assets/crcle/profile/location-proximity-ring.svg";
import lockFilledIcon from "@/assets/crcle/profile/lock-filled.svg";
import loughboroughCrest from "@/assets/crcle/profile/loughborough-crest.png";
import profileMoonCloudIcon from "@/assets/crcle/profile/moon-cloud.svg";
import profilePinIcon from "@/assets/crcle/profile/pin.svg";
import raindropBadgeIcon from "@/assets/crcle/profile/raindrop-badge.svg";
import signalLiveIndicatorIcon from "@/assets/crcle/profile/signal-live-indicator.svg";
import relComplicatedIcon from "@/assets/crcle/profile/rel-complicated.svg";
import relFriendsIcon from "@/assets/crcle/profile/rel-friends.svg";
import relInfoIcon from "@/assets/crcle/profile/rel-info.svg";
import relSingleIcon from "@/assets/crcle/profile/rel-single.svg";
import socialBehanceIcon from "@/assets/crcle/profile/social-behance.svg";
import socialDribbbleIcon from "@/assets/crcle/profile/social-dribbble.svg";
import socialInstagramIcon from "@/assets/crcle/profile/social-instagram.svg";
import socialLinkedinIcon from "@/assets/crcle/profile/social-linkedin.svg";
import statsDecoIcon from "@/assets/crcle/profile/stats-deco.svg";
import strengthFillIcon from "@/assets/crcle/profile/strength-fill.svg";
import strengthTrackIcon from "@/assets/crcle/profile/strength-track.svg";
import trashIcon from "@/assets/crcle/profile/trash.svg";
import trendingUpIcon from "@/assets/crcle/profile/trending-up.svg";
import verifyCloseIcon from "@/assets/crcle/profile/verify/close.svg";
import verifyCrcleWordmark from "@/assets/crcle/profile/verify/crcle-wordmark.svg";
import verifyFourthlineLogo from "@/assets/crcle/profile/verify/fourthline-logo.svg";
import verifyHandleIcon from "@/assets/crcle/profile/verify/handle.svg";
import verifySecuritySafeIcon from "@/assets/crcle/profile/verify/security-safe.svg";
import vincentPortrait from "@/assets/crcle/profile/vincent-portrait.png";
import workBriefcaseIcon from "@/assets/crcle/profile/work-briefcase.svg";
import workLogoPreviewIcon from "@/assets/crcle/profile/work-logo-preview.svg";
import workMarkIcon from "@/assets/crcle/profile/work-mark.svg";
import logoRadioDotIcon from "@/assets/crcle/profile/logo-radio-dot.svg";
import closeAddIcon from "@/assets/crcle/onboarding/close-add.svg";
import shareIcon from "@/assets/crcle/share.svg";
import shareInnerIcon from "@/assets/crcle/share-inner.svg";
import wifiIcon from "@/assets/crcle/wifi.svg";
import { CrcleMoodSwitch, PROFILE_MOOD_IDS } from "@/components/portfolio/CrcleMoodSwitch";
import { CrclePhoneFrame } from "@/components/portfolio/CrclePhoneFrame";
import {
  CrcleMoreButtonSpacer,
  CrclePrimaryDock,
  CrcleStickyMoreButton,
  CrcleThemeToggle,
  crcleThemeToggleAboveClass,
} from "@/components/portfolio/CrcleChrome";
import {
  requestAreaNearbyNotification,
  setCrcleVerifyOpen,
  useCrcleBroadcast,
  useCrcleIncognito,
  type BroadcastState,
} from "@/components/portfolio/crcleBroadcast";

export type { BroadcastState };

/**
 * CRCLE Profile — Figma 1005:49850 (dark) / 1005:49606 (light).
 */

const FONT = "Montserrat, ui-sans-serif, system-ui, sans-serif";
const EASE = [0.22, 1, 0.36, 1] as const;

const RELATIONSHIP_OPTIONS = [
  {
    id: "Single & Looking",
    subtitle: "Ask me out",
    widgetSubtitle: "Ask me out",
    icon: "single" as const,
    cardBg: "#ffe6e6",
    iconBg: "#ffb0b0",
    titleClass: "text-[16px]",
    labelColor: "text-[rgba(3,4,38,0.7)]",
    ctaLabel: "Open to DMS",
    ctaIcon: "send" as const,
  },
  {
    id: "In a relationship",
    subtitle: "Happily taken",
    widgetSubtitle: "Happily Taken",
    icon: "relationship" as const,
    cardBg: "#ffb0b0",
    iconBg: "#ffe6e6",
    titleClass: "text-[16px]",
    labelColor: "text-[rgba(3,4,38,0.7)]",
    ctaLabel: "@JasonMercule",
    ctaIcon: "link" as const,
  },
  {
    id: "Just here for friends",
    subtitle: "Feel free to connect",
    widgetSubtitle: "Platonic only",
    icon: "friends" as const,
    cardBg: "#e6eeff",
    iconBg: "#030426",
    titleClass: "text-[16px]",
    labelColor: "text-[rgba(3,4,38,0.4)]",
    ctaLabel: "Say Hello",
    ctaIcon: "send" as const,
  },
  {
    id: "It's complicated",
    subtitle: "Ask me about it",
    widgetSubtitle: "Ask me about it",
    icon: "complicated" as const,
    cardBg: "#defbf9",
    iconBg: "#1ab5ac",
    titleClass: "text-[19px]",
    labelColor: "text-[rgba(3,4,38,0.7)]",
    ctaLabel: "Open to DMS",
    ctaIcon: "send" as const,
  },
] as const;

export type ProfileState = {
  user: {
    name: string;
    handle: string;
    avatarUrl: string;
    views: number;
    connections: number;
    strengthPct: number;
  };
  broadcast: {
    isIncognito: boolean;
    activeState: BroadcastState;
  };
  widgets: {
    education?: { school: string; degree: string; years: string };
    work?: { company: string; role: string; location: string };
    relationship?: string;
    location?: string;
  };
  socials: {
    behance?: string;
    instagram?: string;
    linkedin?: string;
    dribbble?: string;
  };
};

type Overlay =
  | null
  | "education"
  | "work"
  | "relationship"
  | "location"
  | "locationInfo"
  | "socials"
  | "verify";

const INITIAL: ProfileState = {
  user: {
    name: "Vincent Herbert",
    handle: "@VincentHerbert",
    avatarUrl: vincentPortrait,
    views: 0,
    connections: 220,
    strengthPct: 70,
  },
  broadcast: {
    isIncognito: false,
    activeState: "open_day",
  },
  widgets: {
    education: {
      school: "Loughborough University",
      degree: "Product Design",
      years: "Graduated 2024",
    },
    work: {
      company: "Startup",
      role: "Product Designer",
      location: "Looking for work",
    },
    relationship: "In a relationship",
    location: "Holland Park",
  },
  socials: {
    behance: "vherbert",
    instagram: "vincent",
    linkedin: "vincent",
    dribbble: "vincent",
  },
};

export function CrcleProfile({
  onGoToSignalHome,
  onGoToMessages,
  onGoToRadar,
}: {
  onGoToSignalHome?: () => void;
  onGoToMessages?: () => void;
  onGoToRadar?: () => void;
} = {}) {
  const [broadcastMood] = useCrcleBroadcast();
  const [isIncognito] = useCrcleIncognito();
  const [isLightMode, setIsLightMode] = useState(false);
  const [profile, setProfile] = useState<ProfileState>(() => ({
    ...INITIAL,
    broadcast: { ...INITIAL.broadcast, activeState: broadcastMood, isIncognito },
  }));
  const [overlay, setOverlay] = useState<Overlay>(null);
  const [moodOpen, setMoodOpen] = useState(false);
  /* Figma 313:115854 — Profile onboarding over live profile */
  const [onboardingOpen, setOnboardingOpen] = useState(true);
  const dismissOnboarding = () => setOnboardingOpen(false);

  useEffect(() => {
    setCrcleVerifyOpen(overlay === "verify");
  }, [overlay]);

  useEffect(() => {
    return () => setCrcleVerifyOpen(false);
  }, []);

  const socialCount = Object.values(profile.socials).filter(Boolean).length;

  return (
    <div className="relative ml-auto w-fit">
      <CrcleThemeToggle
        light={isLightMode}
        onToggle={() => setIsLightMode((v) => !v)}
        className={crcleThemeToggleAboveClass}
      />

      <CrclePhoneFrame
        light={isLightMode}
        overlay={
          overlay === "locationInfo" ? (
            <LocationInfoSheet
              onClose={() => setOverlay(null)}
              backdropUrl={profile.user.avatarUrl}
              isLight={isLightMode}
            />
          ) : null
        }
        bottomChrome={
          overlay || onboardingOpen || moodOpen ? null : (
            <CrclePrimaryDock
              embedded
              active="profile"
              onProfile={() => {}}
              onMessages={onGoToMessages}
              onRadar={onGoToRadar}
              onSignalHome={onGoToSignalHome}
              onAreaRadar={() => {
                requestAreaNearbyNotification();
                onGoToMessages?.();
              }}
            />
          )
        }
      >
        <div className="relative flex h-full min-h-0 w-full flex-col overflow-hidden bg-[#010211] transition-colors duration-300 [.crcle-phone--light_&]:bg-[var(--crcle-bg)]">
          <div className="relative min-h-0 flex-1 overflow-hidden">
            {/* Absolute scroll so the dock can sample this layer for backdrop-filter */}
            <div className="absolute inset-2 overflow-x-hidden overflow-y-auto overscroll-contain pb-14 pt-[86px] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              <ProfileMainView
                profile={profile}
                socialCount={socialCount}
                onOpenMood={() => setMoodOpen(true)}
                onOpenEducation={() => setOverlay("education")}
                onOpenWork={() => setOverlay("work")}
                onOpenRelationship={() => setOverlay("relationship")}
                onOpenLocation={() => setOverlay("location")}
                onOpenLocationInfo={() => setOverlay("locationInfo")}
                onOpenSocials={() => setOverlay("socials")}
                onOpenVerify={() => setOverlay("verify")}
              />
            </div>

            {!overlay && !onboardingOpen && !moodOpen ? <CrcleStickyMoreButton /> : null}

            {/* Status + wordmark float over content with a soft fade — no hard cutoff */}
            <div className="pointer-events-none absolute inset-x-0 top-0 z-20">
              <div className="bg-gradient-to-b from-[#010211] from-40% via-[#010211]/85 to-transparent pb-8 transition-colors duration-300 [.crcle-phone--light_&]:from-[#f7f6f2] [.crcle-phone--light_&]:via-[#f7f6f2]/85">
                <StatusBar />
                <div className="mt-[5px] flex justify-center pb-[12px]">
                  <IconImg src={crcleLogo} className="crcle-theme-icon h-[13px] w-[38px]" />
                </div>
              </div>
            </div>

            {/* Bottom fade — clip scroll content at the dock / home-indicator edge */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-2 bottom-2 z-20 h-[6rem] bg-gradient-to-t from-[#010211] from-45% via-[#010211]/92 to-transparent transition-colors duration-300 [.crcle-phone--light_&]:from-[var(--crcle-bg)] [.crcle-phone--light_&]:via-[var(--crcle-bg)]/92"
            />

          </div>

          <AnimatePresence>
            {overlay === "education" ? (
              <EducationHistorySheet
                education={profile.widgets.education}
                onSave={(education) => {
                  setProfile((p) => ({
                    ...p,
                    widgets: { ...p.widgets, education },
                  }));
                  setOverlay(null);
                }}
                onClose={() => setOverlay(null)}
              />
            ) : null}

            {overlay === "work" ? (
              <WorkEditSheet
                work={profile.widgets.work}
                onSave={(work) => {
                  setProfile((p) => ({
                    ...p,
                    widgets: { ...p.widgets, work },
                  }));
                  setOverlay(null);
                }}
                onClose={() => setOverlay(null)}
              />
            ) : null}

            {overlay === "relationship" ? (
              <RelationshipStatusSheet
                value={profile.widgets.relationship ?? "In a relationship"}
                onSave={(relationship) => {
                  setProfile((p) => ({
                    ...p,
                    widgets: { ...p.widgets, relationship },
                  }));
                  setOverlay(null);
                }}
                onClose={() => setOverlay(null)}
              />
            ) : null}

            {overlay === "location" ? (
              <EditFormSheet
                title="Edit Location"
                fields={[
                  { key: "location", label: "Location", value: profile.widgets.location ?? "" },
                ]}
                onSave={(values) => {
                  setProfile((p) => ({
                    ...p,
                    widgets: { ...p.widgets, location: values.location },
                  }));
                  setOverlay(null);
                }}
                onClose={() => setOverlay(null)}
              />
            ) : null}

            {overlay === "socials" ? (
              <SocialLinksSheet
                socials={profile.socials}
                onSave={(socials) => {
                  setProfile((p) => ({ ...p, socials }));
                  setOverlay(null);
                }}
                onClose={() => setOverlay(null)}
              />
            ) : null}
          </AnimatePresence>

          {overlay === "verify" ? (
            <VerificationSheet onClose={() => setOverlay(null)} />
          ) : null}

          <AnimatePresence>
            {moodOpen ? (
              <CrcleMoodSwitch
                allowedMoods={PROFILE_MOOD_IDS}
                closeOnInTheAreaSelect={false}
                onClose={() => setMoodOpen(false)}
              />
            ) : null}
          </AnimatePresence>

          <AnimatePresence>
            {onboardingOpen ? (
              <ProfileOnboarding onClose={dismissOnboarding} onContinue={dismissOnboarding} />
            ) : null}
          </AnimatePresence>
        </div>
      </CrclePhoneFrame>
    </div>
  );
}

/* ——— Profile Onboarding (Figma 313:116043) ——— */

function ProfileOnboarding({
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
      className="absolute inset-0 z-[55] flex flex-col overflow-hidden rounded-[53px] bg-[rgba(2,3,29,0.4)] backdrop-blur-[9px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-onboarding-title"
    >
      <div className="flex min-h-0 flex-1 flex-col px-3 pb-11 pt-[112px]">
        <div className="flex w-full shrink-0 flex-col items-end gap-3">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close onboarding"
            className="crcle-glass-btn relative flex h-10 shrink-0 items-center justify-center overflow-hidden rounded-[24px] border border-[#f7f6f2] px-2 py-0.5 backdrop-blur-[6px]"
          >
            <div className="dock-glass-lens opacity-40" aria-hidden />
            <IconImg src={closeAddIcon} className="relative z-[1] size-6" />
          </button>

          <div className="w-full overflow-hidden rounded-[24px] border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)]">
            <div className="border-b border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.2)] px-4 py-4 backdrop-blur-[12px]">
              <p
                id="profile-onboarding-title"
                className="text-center text-[18px] font-normal leading-[25px] text-white"
                style={{ fontFamily: FONT }}
              >
                Customise Your Profile
              </p>
            </div>

            <div className="flex flex-col gap-5 bg-[rgba(255,255,255,0.2)] p-4 backdrop-blur-[12px]">
              <p
                className="text-center text-[15px] font-normal leading-[22.5px] text-[rgba(255,255,255,0.6)]"
                style={{ fontFamily: FONT }}
              >
                Let&apos;s personalize your dashboard! Add widgets to make your profile uniquely yours.
              </p>
              <div className="flex h-2 items-center justify-center gap-2">
                <span className="h-2 w-8 shrink-0 rounded-full bg-[#010211]" aria-hidden />
                <span className="size-2 shrink-0 rounded-full bg-[rgba(217,217,222,0.5)]" aria-hidden />
                <span className="size-2 shrink-0 rounded-full bg-[rgba(217,217,222,0.5)]" aria-hidden />
                <span className="size-2 shrink-0 rounded-full bg-[rgba(217,217,222,0.5)]" aria-hidden />
              </div>
            </div>

            <div className="flex gap-2 border-t border-[rgba(230,230,233,0.1)] bg-[rgba(255,255,255,0.2)] p-4 backdrop-blur-[12px]">
              <button
                type="button"
                onClick={onContinue}
                className="flex h-[49px] flex-1 items-center justify-center rounded-full bg-[rgba(230,230,233,0.6)] text-[15px] font-normal leading-[21px] text-[rgba(0,0,0,0.25)] transition hover:brightness-95"
                style={{ fontFamily: FONT }}
              >
                Skip tutorial
              </button>
              <button
                type="button"
                onClick={onContinue}
                className="flex h-[49px] flex-1 items-center justify-center rounded-full bg-[#010211] text-[15px] font-normal leading-[21px] text-[#b1b1bc] transition hover:brightness-110"
                style={{ fontFamily: FONT }}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>

        <div className="mt-auto flex shrink-0 flex-col items-center gap-[18px] pt-10">
          <p
            className="w-full text-center text-[14px] font-medium leading-[21px] text-[rgba(247,246,242,0.5)]"
            style={{ fontFamily: FONT }}
          >
            Profile configurations
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

function ProfileMainView({
  profile,
  socialCount,
  onOpenMood,
  onOpenEducation,
  onOpenWork,
  onOpenRelationship,
  onOpenLocation,
  onOpenLocationInfo: _onOpenLocationInfo,
  onOpenSocials,
  onOpenVerify,
}: {
  profile: ProfileState;
  socialCount: number;
  onOpenMood: () => void;
  onOpenEducation: () => void;
  onOpenWork: () => void;
  onOpenRelationship: () => void;
  onOpenLocation: () => void;
  onOpenLocationInfo: () => void;
  onOpenSocials: () => void;
  onOpenVerify: () => void;
}) {
  const { user, widgets } = profile;
  const [broadcastMood] = useCrcleBroadcast();
  const [isIncognito] = useCrcleIncognito();
  const moodChipIcon =
    broadcastMood === "in_the_area" ? profilePinIcon : profileMoonCloudIcon;
  const signalLiveLabel = broadcastMood === "in_the_area" ? "In The Area" : "Signal Live";
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [lookingForWork, setLookingForWork] = useState(false);
  const [shareStatus, setShareStatus] = useState(true);
  const relationshipMeta =
    RELATIONSHIP_OPTIONS.find((o) => o.id === widgets.relationship) ?? RELATIONSHIP_OPTIONS[1];
  const showLocationDetails = !isIncognito || locationEnabled;
  const frostMap = isIncognito && !locationEnabled;
  const hasEducation = Boolean(widgets.education?.school);
  const hasWork = Boolean(widgets.work?.role);
  const hasRelationship = Boolean(widgets.relationship);
  const hasLocation = Boolean(widgets.location);
  const isEmptyWidgets = !hasEducation && !hasWork && !hasRelationship && !hasLocation;

  return (
    <div className="flex flex-col gap-4">
      {/* Identity — Figma 1005:49864 / light 1005:49620 */}
      <div className="flex w-full items-end justify-between px-0">
        <div className="flex flex-col items-start justify-center">
          <div className="flex items-center gap-2">
            <p className="text-[16px] leading-[1.4] text-[#f7f6f2] [.crcle-phone--light_&]:text-black" style={{ fontFamily: FONT }}>
              {user.name}
            </p>
            <span className="flex h-[22px] w-[22px] items-center justify-center rounded-[36px] bg-[#f7f6f2] p-1 [.crcle-phone--light_&]:hidden">
              <img
                alt=""
                src={raindropBadgeIcon}
                className="h-[11px] w-2.5 object-contain"
                draggable={false}
              />
            </span>
            <button
              type="button"
              aria-label="Verify identity"
              onClick={onOpenVerify}
              className="hidden items-center rounded-[24px] border border-[#030426] px-3 py-1 text-[11px] leading-[1.4] text-[#030426] [.crcle-phone--light_&]:inline-flex"
              style={{ fontFamily: FONT }}
            >
              Verify
            </button>
          </div>
          <p className="text-[11px] leading-[1.4] text-[#b1b1bc]" style={{ fontFamily: FONT }}>
            {user.handle}
          </p>
        </div>
        <CrcleMoreButtonSpacer />
      </div>

      {/* Signal Live + mood — glass pills with green gradient rim */}
      <div className="flex items-start justify-center gap-2 px-2">
        <button
          type="button"
          onClick={onOpenMood}
          className="crcle-glass-btn crcle-glass-btn--signal-live relative flex shrink-0 items-center gap-1 overflow-hidden rounded-[24px] px-4 py-2 backdrop-blur-[12px] transition hover:brightness-110"
        >
          <div className="dock-glass-lens opacity-40" aria-hidden />
          <IconImg
            src={signalLiveIndicatorIcon}
            className="crcle-signal-live-dot relative z-[1] size-2 shrink-0"
          />
          <span
            className="relative z-[1] whitespace-nowrap text-[11px] leading-[1.4] text-[#22c55e]"
            style={{ fontFamily: FONT }}
          >
            {signalLiveLabel}
          </span>
        </button>
        <button
          type="button"
          onClick={onOpenMood}
          aria-label="Change mood"
          className="crcle-glass-btn crcle-glass-btn--signal-live relative flex shrink-0 items-center justify-center gap-0.5 overflow-hidden rounded-[24px] py-1 pl-2 pr-1.5 backdrop-blur-[12px] transition hover:brightness-110"
        >
          <div className="dock-glass-lens opacity-40" aria-hidden />
          <IconImg src={moodChipIcon} className="crcle-profile-mood-icon relative z-[1] size-[20px] shrink-0" />
          <ChevronDown
            className="relative z-[1] size-6 shrink-0 text-[rgba(247,246,242,0.4)] [.crcle-phone--light_&]:text-[rgba(2,3,29,0.45)]"
            strokeWidth={1.5}
          />
        </button>
      </div>

      {/* Top row: portrait + stats — Figma 1005:49883 / light 1005:49632 */}
      <div className="mx-auto flex h-[255px] w-full items-stretch gap-4 [.crcle-phone--light_&]:h-[251px]">
        <div className="relative min-w-0 flex-1 overflow-hidden rounded-[24px]">
          <img
            alt=""
            src={user.avatarUrl}
            className="absolute inset-0 size-full object-cover object-[center_35%]"
            draggable={false}
          />
          <div className="absolute right-0 top-0 flex items-start justify-end rounded-bl-[24px] rounded-tr-[24px] bg-white/20 p-3 backdrop-blur-[2px]">
            <img alt="" src={cameraIcon} className="size-3.5 object-contain" draggable={false} />
          </div>
        </div>

        <div className="relative flex min-w-0 flex-1 flex-col gap-3 overflow-hidden rounded-2xl bg-[#1e2939] p-3 [.crcle-phone--light_&]:gap-2 [.crcle-phone--light_&]:bg-[#f7f6f2] [.crcle-phone--light_&]:p-2">
          <img
            alt=""
            src={statsDecoIcon}
            className="pointer-events-none absolute -left-2 -top-2 h-[270px] w-[225px] max-w-none opacity-90"
            draggable={false}
          />
          <div className="relative z-[1] flex h-[16.5px] shrink-0 items-center gap-1.5">
            <img
              alt=""
              src={eyeWeekIcon}
              className="size-3.5 object-contain [.crcle-phone--light_&]:brightness-0"
              draggable={false}
            />
            <span className="text-[11px] leading-[16.5px] text-[#f7f6f2] [.crcle-phone--light_&]:text-[#030426]" style={{ fontFamily: FONT }}>
              This week
            </span>
          </div>
          <div className="relative z-[1] flex min-h-0 flex-1 flex-col justify-between gap-2">
            <div className="flex shrink-0 flex-col gap-2 rounded-xl bg-[rgba(247,246,242,0.2)] p-2 backdrop-blur-[30px]">
              <div>
                <p
                  className="text-[24px] font-medium leading-[25px] text-[#f7f6f2] [.crcle-phone--light_&]:text-[#030426]"
                  style={{ fontFamily: FONT }}
                >
                  {user.views}
                </p>
                <p
                  className="text-[13px] font-light leading-[1.4] text-[#f7f6f2] [.crcle-phone--light_&]:text-[#030426]"
                  style={{ fontFamily: FONT }}
                >
                  Profile views
                </p>
              </div>
              <div>
                <p className="text-[19px] leading-[1.4] text-[#f7f6f2] [.crcle-phone--light_&]:text-[#030426]" style={{ fontFamily: FONT }}>
                  {user.connections}
                </p>
                <p
                  className="text-[13px] font-light leading-[1.4] text-[#f7f6f2] [.crcle-phone--light_&]:text-[#030426]"
                  style={{ fontFamily: FONT }}
                >
                  connections
                </p>
              </div>
              <div className="flex items-center gap-1">
                <img
                  alt=""
                  src={trendingUpIcon}
                  className="size-3.5 object-contain [.crcle-phone--light_&]:brightness-0"
                  draggable={false}
                />
                <span
                  className="text-[11px] font-light leading-[1.4] text-[#f7f6f2] [.crcle-phone--light_&]:text-[#030426]"
                  style={{ fontFamily: FONT }}
                >
                  +5 this week
                </span>
              </div>
            </div>
            <div className="flex shrink-0 flex-col gap-2">
              <div className="flex items-start justify-between text-[11px] text-[#f7f6f2] [.crcle-phone--light_&]:text-black">
                <div style={{ fontFamily: FONT }}>
                  <p className="leading-[1.2]">PROFILE STRENGTH</p>
                  <p className="font-medium leading-[1.2]">Intermediate</p>
                </div>
                <p className="font-light leading-[1.2] [.crcle-phone--light_&]:text-[#030426]" style={{ fontFamily: FONT }}>
                  {user.strengthPct}%
                </p>
              </div>
              <div className="relative h-[4px] w-full px-0.5">
                <img
                  alt=""
                  src={strengthTrackIcon}
                  className="absolute inset-x-0.5 top-1/2 h-1 w-[calc(100%-4px)] -translate-y-1/2 object-fill [.crcle-phone--light_&]:brightness-0 [.crcle-phone--light_&]:opacity-25"
                  draggable={false}
                />
                <img
                  alt=""
                  src={strengthFillIcon}
                  className="absolute left-0.5 top-1/2 h-1 -translate-y-1/2 object-fill [.crcle-phone--light_&]:brightness-0"
                  style={{ width: `${user.strengthPct}%` }}
                  draggable={false}
                />
              </div>
              <button
                type="button"
                className="hidden w-fit rounded-[24px] border border-[#030426] bg-[#030426] px-3 py-1 text-[11px] leading-[1.4] text-[#e6e6e9] [.crcle-phone--light_&]:inline-flex"
                style={{ fontFamily: FONT }}
              >
                Boost Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Widget grid — empty Figma 853:225874 / filled 851:225717 */}
      <div className="relative mx-auto w-full">
        {isEmptyWidgets ? (
          <div className="flex flex-col gap-4">
            <div className="grid h-[184px] w-full grid-cols-2 gap-4">
              <EmptyWidgetCard
                icon={emptySchoolIcon}
                title="School"
                subtitle="Add your education"
                tip="Share where you studied to connect with alumni and classmates"
                onClick={onOpenEducation}
              />
              <EmptyWidgetCard
                icon={emptyWorkIcon}
                title="Work"
                subtitle="Where do you work?"
                tip="Add your current role to find colleagues and build your network"
                onClick={onOpenWork}
              />
            </div>
            <div className="grid h-[184px] w-full grid-cols-2 gap-4">
              <EmptyWidgetCard
                icon={emptyHeartIcon}
                title="Relationship"
                subtitle="What’s your situation?"
                tip="Let others know if you are single, taken, or looking to avoid mixed signals."
                onClick={onOpenRelationship}
                padY="comfortable"
              />
              <EmptyWidgetCard
                icon={emptyLocationIcon}
                title="Location"
                tip="Where are you based? Share your city to connect with people in your area."
                onClick={onOpenLocation}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {/* Location + Work */}
            <div className="grid grid-cols-2 items-stretch gap-4">
              <div className="relative flex h-[184px] min-w-0 flex-col justify-between overflow-hidden rounded-2xl p-2 text-left">
                <img
                  alt=""
                  src={locationMapImg}
                  className="absolute inset-0 size-full rounded-2xl object-cover"
                  draggable={false}
                />
                <div aria-hidden className="absolute inset-0 rounded-2xl bg-[rgba(2,4,38,0.1)]" />
                <button
                  type="button"
                  aria-label="Edit location"
                  onClick={onOpenLocation}
                  className="absolute inset-x-0 top-0 bottom-[84px] z-[1] cursor-pointer border-0 bg-transparent p-0"
                />
                {showLocationDetails ? (
                  <>
                    <div
                      aria-hidden
                      className="pointer-events-none absolute left-[34px] top-[52px] z-[2] h-[88px] w-[140px]"
                    >
                      <img
                        alt=""
                        src={locationProximityRingIcon}
                        className="absolute left-[5px] top-4 size-[88px]"
                        draggable={false}
                      />
                      <span className="absolute left-11 top-[31px] flex items-center gap-1 rounded-bl-[4px] rounded-br-[24px] rounded-tl-xl rounded-tr-[24px] bg-[#05f] py-0.5 pl-1.5 pr-2">
                        <span
                          className="text-[11px] leading-[1.4] text-[#fefefe]"
                          style={{ fontFamily: FONT }}
                        >
                          London
                        </span>
                        <span className="size-0.5 shrink-0 rounded-full bg-[#fefefe]" />
                        <span
                          className="text-[11px] leading-[1.4] text-[#fefefe]"
                          style={{ fontFamily: FONT }}
                        >
                          2 Km
                        </span>
                      </span>
                    </div>
                    <img
                      alt=""
                      src={locationPinMarkerIcon}
                      className="pointer-events-none absolute left-[78px] top-[108px] z-[2] size-2.5"
                      draggable={false}
                    />
                  </>
                ) : null}
                {frostMap ? (
                  <div className="pointer-events-none absolute inset-0 z-[3] flex flex-col items-center justify-center overflow-hidden rounded-2xl bg-[rgba(255,255,255,0.1)] px-[35px] backdrop-blur-[4px]">
                    <div className="flex w-[110px] flex-col items-center justify-center gap-[7px]">
                      <span className="relative size-6 shrink-0 overflow-clip">
                        <span className="absolute inset-[8.33%_16.67%]">
                          <img
                            alt=""
                            src={lockFilledIcon}
                            className="block size-full max-w-none"
                            draggable={false}
                          />
                        </span>
                      </span>
                      <p
                        className="w-full text-center text-[11px] font-light leading-[1.4] text-[#030426]"
                        style={{ fontFamily: FONT }}
                      >
                        Shared Location is turned off
                      </p>
                    </div>
                  </div>
                ) : null}
                <span className="relative z-[4] inline-flex w-fit items-center rounded-[24px] bg-[#030426] py-0.5 pl-2 pr-2.5">
                  <span
                    className="text-[13px] leading-[1.4] text-[#fefefe]"
                    style={{ fontFamily: FONT }}
                  >
                    Current Location
                  </span>
                </span>
                <div className="pointer-events-auto relative z-[4] flex w-[165px] items-center justify-between rounded-[24px] border border-[rgba(2,4,38,0.4)] py-1 pl-2 pr-1.5">
                  <button
                    type="button"
                    onClick={() => setLocationEnabled((v) => !v)}
                    className="flex w-full items-center justify-between"
                    aria-pressed={locationEnabled}
                  >
                    <span className="text-[11px] leading-[1.4] text-[#030426]" style={{ fontFamily: FONT }}>
                      Shared location
                    </span>
                    <span
                      className={`flex w-6 items-center rounded-[24px] p-0.5 transition ${
                        locationEnabled
                          ? "justify-end bg-[#0fc950]"
                          : "justify-start bg-[rgba(2,4,38,0.25)]"
                      }`}
                    >
                      <span className="size-2 rounded-[4px] bg-[#fefefe]" />
                    </span>
                  </button>
                </div>
              </div>

              {hasWork ? (
                <button
                  type="button"
                  onClick={onOpenWork}
                  className="flex h-[184px] min-w-0 flex-col gap-2 rounded-[20px] border border-[rgba(0,0,0,0.25)] bg-[rgba(254,254,254,0.3)] p-[9px] text-left shadow-[0_4px_4px_rgba(0,0,0,0.05)] backdrop-blur-[7px] [.crcle-phone--light_&]:border-[rgba(0,0,0,0.25)] [.crcle-phone--light_&]:bg-[#fefefe]"
                >
                  <div className="flex min-h-0 w-full flex-1 flex-col items-center justify-between">
                    <div className="flex w-full items-center gap-1">
                      <img
                        alt=""
                        src={laptopWorkIcon}
                        className="size-4 object-contain brightness-0 invert [.crcle-phone--light_&]:invert-0"
                        draggable={false}
                      />
                      <span
                        className="text-[12px] leading-[18px] text-[rgba(247,246,242,0.6)] [.crcle-phone--light_&]:text-[#6b7280]"
                        style={{ fontFamily: FONT }}
                      >
                        Work
                      </span>
                    </div>
                    <img
                      alt=""
                      src={workMarkIcon}
                      className="size-12 object-contain"
                      draggable={false}
                    />
                    <div className="text-center">
                      <p
                        className="text-[14px] leading-[21px] text-[#f7f6f2] [.crcle-phone--light_&]:text-[#020426]"
                        style={{ fontFamily: FONT }}
                      >
                        {widgets.work?.role ?? "Add role"}
                      </p>
                      <p
                        className="text-[12px] font-light leading-[18px] text-[rgba(222,221,218,0.6)] [.crcle-phone--light_&]:text-[#6b7280]"
                        style={{ fontFamily: FONT }}
                      >
                        {widgets.work?.company ?? "Company"}
                      </p>
                    </div>
                  </div>
                  <div
                    className="flex w-full items-center justify-between rounded-[24px] bg-[#deddda] py-1 pl-2 pr-1.5"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLookingForWork((v) => !v);
                    }}
                  >
                    <span className="text-[11px] leading-[1.4] text-[#02031d]" style={{ fontFamily: FONT }}>
                      Looking for work
                    </span>
                    <span
                      className={`flex w-6 items-center rounded-[24px] p-0.5 ${
                        lookingForWork ? "justify-end bg-[#0fc950]" : "justify-start bg-[rgba(2,3,29,0.4)]"
                      }`}
                    >
                      <span className="size-2 rounded bg-[#fdfcfb]" />
                    </span>
                  </div>
                </button>
              ) : (
                <EmptyWidgetCard
                  icon={emptyWorkIcon}
                  title="Work"
                  subtitle="Where do you work?"
                  tip="Add your current role to find colleagues and build your network"
                  onClick={onOpenWork}
                />
              )}
            </div>

            {/* Dating + Education */}
            <div className="grid grid-cols-2 items-stretch gap-4">
              {hasRelationship ? (
                <DatingWidget
                  option={relationshipMeta}
                  onOpen={onOpenRelationship}
                  shareStatus={shareStatus}
                  onToggleShare={() => setShareStatus((v) => !v)}
                />
              ) : (
                <EmptyWidgetCard
                  icon={emptyHeartIcon}
                  title="Relationship"
                  subtitle="What’s your situation?"
                  tip="Let others know if you are single, taken, or looking to avoid mixed signals."
                  onClick={onOpenRelationship}
                />
              )}

              {hasEducation ? (
                <button
                  type="button"
                  onClick={onOpenEducation}
                  className="flex min-w-0 flex-col self-stretch rounded-[20px] border border-[rgba(247,246,242,0.4)] bg-gradient-to-b from-[rgba(1,2,17,0.6)] to-[rgba(170,194,240,0.6)] p-[5px] text-left shadow-[0_4px_4px_rgba(0,0,0,0.25)] [.crcle-phone--light_&]:border-[#f7f6f2] [.crcle-phone--light_&]:from-[rgba(0,85,255,0.3)] [.crcle-phone--light_&]:to-[rgba(170,194,240,0.3)] [.crcle-phone--light_&]:shadow-none"
                >
                  <div className="flex min-h-0 w-full flex-1 flex-col items-center gap-3 rounded-2xl bg-[#f7f6f2] p-2">
                    <div className="flex w-full items-center gap-1">
                      <img
                        alt=""
                        src={graduationIcon}
                        className="size-4 object-contain"
                        draggable={false}
                      />
                      <span
                        className="text-[12px] leading-[18px] text-[#6b7280]"
                        style={{ fontFamily: FONT }}
                      >
                        Education
                      </span>
                    </div>
                    <div className="flex w-full flex-col items-center gap-2.5">
                      <img
                        alt=""
                        src={loughboroughCrest}
                        className="size-[52px] object-contain"
                        draggable={false}
                      />
                      <div className="w-full text-center">
                        <p
                          className="text-[14px] leading-[21px] text-[#020426]"
                          style={{ fontFamily: FONT }}
                        >
                          {widgets.education?.school ?? "Add school"}
                        </p>
                        <p
                          className="text-[12px] font-light leading-[18px] text-[#6b7280]"
                          style={{ fontFamily: FONT }}
                        >
                          {widgets.education?.years ?? ""}
                        </p>
                      </div>
                    </div>
                  </div>
                </button>
              ) : (
                <EmptyWidgetCard
                  icon={emptySchoolIcon}
                  title="School"
                  subtitle="Add your education"
                  tip="Share where you studied to connect with alumni and classmates"
                  onClick={onOpenEducation}
                />
              )}
            </div>
          </div>
        )}
      </div>

      {/* Social links — Figma 851:225812 */}
      <button
        type="button"
        onClick={onOpenSocials}
        className="mx-auto flex w-full flex-col gap-2 rounded-[24px] border border-[rgba(247,246,242,0.2)] bg-[rgba(247,246,242,0.05)] p-2 text-left [.crcle-phone--light_&]:border-transparent [.crcle-phone--light_&]:bg-[#020217]"
      >
        <div className="flex w-full items-start justify-between">
          <div className="flex items-center gap-1 pl-1 pt-0.5">
            <span className="relative size-3 overflow-hidden">
              <img alt="" src={shareIcon} className="absolute inset-0 size-full" draggable={false} />
              <span className="absolute inset-[8.33%_12.5%_8.67%_12.5%]">
                <img alt="" src={shareInnerIcon} className="absolute inset-0 size-full" draggable={false} />
              </span>
            </span>
            <span className="text-[13px] leading-[1.4] text-[#fefefe]" style={{ fontFamily: FONT }}>
              Social links
            </span>
          </div>
          <span
            className="rounded-[40px] bg-white/20 px-2 py-1 text-[13px] leading-[1.4] text-[#e6e6e9]"
            style={{ fontFamily: FONT }}
          >
            {String(Math.max(socialCount, 5)).padStart(2, "0")} Active Links
          </span>
        </div>
        <div className="flex items-center gap-3">
          <img alt="" src={socialBehanceIcon} className="size-9 object-contain" draggable={false} />
          <img alt="" src={socialInstagramIcon} className="size-9 object-contain" draggable={false} />
          <img alt="" src={socialLinkedinIcon} className="size-9 object-contain" draggable={false} />
          <img alt="" src={socialDribbbleIcon} className="size-9 object-contain" draggable={false} />
        </div>
      </button>

      {/* Add widget — Figma 851:225829 */}
      <button
        type="button"
        className="relative mx-auto flex w-full items-center justify-center rounded-[24px] border border-[#f7f6f2] p-3 [.crcle-phone--light_&]:border-[#030426] [.crcle-phone--light_&]:bg-[#fefefe]"
      >
        <span className="absolute left-[7px] top-1/2 flex -translate-y-1/2 items-center justify-center rounded-[36px] bg-[rgba(247,246,242,0.4)] px-3 py-1 [.crcle-phone--light_&]:bg-[#030426]">
          <img alt="" src={locusPlusIcon} className="size-4 object-contain" draggable={false} />
        </span>
        <span className="w-full text-center text-[13px] leading-[1.4] text-[#f7f6f2] [.crcle-phone--light_&]:text-[#030422]" style={{ fontFamily: FONT }}>
          Add widget
        </span>
      </button>
    </div>
  );
}

/* ——— Edit form sheets ——— */

function DatingWidget({
  option,
  onOpen,
  shareStatus,
  onToggleShare,
}: {
  option: (typeof RELATIONSHIP_OPTIONS)[number];
  onOpen: () => void;
  shareStatus: boolean;
  onToggleShare: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex h-full w-full min-w-0 flex-col gap-2 rounded-[20px] p-2 text-left"
      style={{ backgroundColor: option.cardBg }}
    >
      <div className="flex items-center gap-1 pl-0.5 pt-0.5">
        <img alt="" src={heartDatingIcon} className="size-4 object-contain" draggable={false} />
        <span
          className={`text-[13px] leading-[1.4] ${option.labelColor}`}
          style={{ fontFamily: FONT }}
        >
          Dating
        </span>
      </div>

      <div className="flex w-full flex-col items-center gap-2">
        <div
          className="flex size-16 items-center justify-center rounded-[40px] p-2"
          style={{ backgroundColor: option.iconBg }}
        >
          <DatingWidgetGlyph type={option.icon} />
        </div>
        <div className="w-full">
          <p
            className={`${option.titleClass} leading-[1.4] text-[#020426]`}
            style={{ fontFamily: FONT }}
          >
            {option.id}
          </p>
          <p
            className="text-[13px] leading-[1.4] text-[rgba(3,4,38,0.6)]"
            style={{ fontFamily: FONT }}
          >
            {option.widgetSubtitle}
          </p>
        </div>
      </div>

      <div
        className="flex w-full items-center justify-between rounded-[24px] border border-[rgba(204,0,0,0.3)] bg-[rgba(204,0,0,0.2)] py-1 pl-2 pr-1.5"
        onClick={(e) => {
          e.stopPropagation();
          onToggleShare();
        }}
      >
        <span className="text-[11px] leading-[1.4] text-[#030426]" style={{ fontFamily: FONT }}>
          Share status
        </span>
        <span
          className={`flex w-6 items-center rounded-[24px] p-0.5 ${
            shareStatus ? "justify-end bg-[#030426]" : "justify-start bg-[rgba(3,4,38,0.25)]"
          }`}
        >
          <span className="size-2 rounded bg-[#fdfcfb]" />
        </span>
      </div>
    </button>
  );
}

/** Figma 853:225952–853:225986 — dashed empty widget placeholders */
function EmptyWidgetCard({
  icon,
  title,
  subtitle,
  tip,
  onClick,
  padY = "default",
}: {
  icon: string;
  title: string;
  subtitle?: string;
  tip: string;
  onClick: () => void;
  padY?: "default" | "comfortable";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex h-full min-h-0 w-full min-w-0 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[rgba(177,177,188,0.2)] bg-transparent text-left transition hover:bg-white/[0.02] [.crcle-phone--light_&]:border-[rgba(3,4,38,0.18)] [.crcle-phone--light_&]:hover:bg-black/[0.03] ${
        padY === "comfortable" ? "px-3 py-4" : "p-3"
      }`}
    >
      <div className="flex h-full w-full max-w-[154px] flex-col items-start justify-between">
        <div className="flex w-full items-start justify-between">
          <span className="relative size-9 shrink-0 overflow-hidden">
            <img
              alt=""
              src={icon}
              className="absolute inset-0 size-full max-w-none object-contain [.crcle-phone--light_&]:brightness-0"
              draggable={false}
            />
          </span>
          <span className="relative size-6 shrink-0">
            <img
              alt=""
              src={emptyPlusIcon}
              className="absolute inset-0 size-full max-w-none object-contain brightness-0 invert [.crcle-phone--light_&]:invert-0"
              draggable={false}
            />
          </span>
        </div>

        <div className="flex w-full flex-col items-start gap-2 leading-[1.4]">
          <div className="flex w-full flex-col items-start text-[#f7f6f2] [.crcle-phone--light_&]:text-[#030426]">
            <p
              className="w-full text-[16px] font-medium leading-[1.4]"
              style={{ fontFamily: FONT }}
            >
              {title}
            </p>
            {subtitle ? (
              <p
                className="w-full text-[13px] font-normal leading-[1.4]"
                style={{ fontFamily: FONT }}
              >
                {subtitle}
              </p>
            ) : null}
          </div>
          <p
            className="w-full text-[11px] font-normal leading-[1.4] text-[rgba(247,246,242,0.5)] [.crcle-phone--light_&]:text-[rgba(3,4,38,0.5)]"
            style={{ fontFamily: FONT }}
          >
            {tip}
          </p>
        </div>
      </div>
    </button>
  );
}

function DatingWidgetGlyph({
  type,
}: {
  type: (typeof RELATIONSHIP_OPTIONS)[number]["icon"];
}) {
  if (type === "single") {
    return (
      <img alt="" src={datingHeartWhiteIcon} className="size-9 object-contain" draggable={false} />
    );
  }
  if (type === "relationship") {
    return (
      <img alt="" src={datingLoveSeatIcon} className="size-8 object-contain" draggable={false} />
    );
  }
  if (type === "friends") {
    return (
      <img
        alt=""
        src={datingGroupWhiteIcon}
        className="h-8 w-[31px] object-contain"
        draggable={false}
      />
    );
  }
  return (
    <img alt="" src={datingCoffeeIcon} className="h-9 w-6 object-contain" draggable={false} />
  );
}

function RelationshipStatusSheet({
  value,
  onSave,
  onClose,
}: {
  value: string;
  onSave: (value: string) => void;
  onClose: () => void;
}) {
  const [selected, setSelected] = useState(value);
  const [locationEnabled, setLocationEnabled] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-40 flex items-center justify-center overflow-hidden rounded-[53px] bg-[rgba(1,2,17,0.35)] px-3 backdrop-blur-[10px]"
      role="dialog"
      aria-label="Edit Relationship status"
      style={{ clipPath: "inset(0 round 53px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: 0.28, ease: EASE }}
        className="relative w-full max-w-[374px] overflow-hidden rounded-[24px] bg-[rgba(1,2,17,0.55)] backdrop-blur-[24px] shadow-[0_16px_48px_rgba(0,0,0,0.35)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header — Figma 862:242953 */}
        <div className="flex h-[62px] items-center justify-between border-b border-[rgba(255,255,255,0.1)] bg-[rgba(1,2,17,0.5)] px-3">
          <p
            className="text-[18px] leading-[27px] text-white"
            style={{ fontFamily: FONT }}
          >
            Edit Relationship status
          </p>
          <button
            type="button"
            onClick={() => onSave(selected)}
            className="flex h-[37px] w-[72px] items-center justify-center rounded-[20px] bg-[rgba(247,246,242,0.2)]"
          >
            <span
              className="text-[14px] leading-[21px] text-[#e6e6e9]"
              style={{ fontFamily: FONT }}
            >
              Done
            </span>
          </button>
        </div>

        {/* Body — Figma 862:242958 */}
        <div className="flex flex-col gap-4 bg-[rgba(247,246,242,0.2)] p-3">
          <div className="flex flex-col gap-3">
            <p
              className="text-[11px] leading-[1.4] text-[#9ca3af]"
              style={{ fontFamily: FONT }}
            >
              UPDATE RELATIONSHIP STATUS
            </p>
            <div className="flex flex-col gap-2">
              {RELATIONSHIP_OPTIONS.map((option) => {
                const isSelected = selected === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => {
                      setSelected(option.id);
                      onSave(option.id);
                    }}
                    className={`flex w-full items-center gap-2 rounded-[40px] border px-[5px] py-1 text-left transition ${
                      isSelected
                        ? "border-[rgba(247,246,242,0.55)] bg-[rgba(247,246,242,0.12)]"
                        : "border-[rgba(247,246,242,0.3)] bg-transparent"
                    }`}
                  >
                    <RelationshipOptionIcon type={option.icon} />
                    <div className="flex min-w-0 flex-col items-start leading-[1.4]">
                      <span
                        className="text-[13px] text-white"
                        style={{ fontFamily: FONT }}
                      >
                        {option.id}
                      </span>
                      <span
                        className="text-[11px] font-light text-[#9ca3af]"
                        style={{ fontFamily: FONT }}
                      >
                        {option.subtitle}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setLocationEnabled((v) => !v)}
              className="flex items-center gap-2.5 rounded-[24px] bg-white/20 py-1 pl-2 pr-1.5"
              aria-pressed={locationEnabled}
            >
              <span
                className="text-[11px] leading-[1.4] text-[#f7f6f2]"
                style={{ fontFamily: FONT }}
              >
                Enable Location
              </span>
              <span
                className={`flex w-6 items-center rounded-[24px] p-0.5 transition ${
                  locationEnabled ? "justify-end bg-[#0fc950]" : "justify-start bg-[rgba(247,246,242,0.35)]"
                }`}
              >
                <span className="size-2 rounded bg-[#fefefe]" />
              </span>
            </button>
            <button type="button" aria-label="More info" className="flex size-5 items-center justify-center">
              <img alt="" src={relInfoIcon} className="size-5 object-contain" draggable={false} />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function RelationshipOptionIcon({
  type,
}: {
  type: (typeof RELATIONSHIP_OPTIONS)[number]["icon"];
}) {
  if (type === "single") {
    return (
      <img
        alt=""
        src={relSingleIcon}
        className="size-8 shrink-0 object-contain"
        draggable={false}
      />
    );
  }

  if (type === "relationship") {
    return (
      <span className="flex size-8 shrink-0 items-center justify-center rounded-[40px] bg-[#ffe6e6] p-2">
        <img alt="" src={datingLoveSeatIcon} className="size-4 object-contain" draggable={false} />
      </span>
    );
  }

  if (type === "friends") {
    return (
      <span className="flex size-8 shrink-0 items-center justify-center rounded-[40px] bg-[#e6eeff] p-2">
        <img alt="" src={relFriendsIcon} className="h-[11px] w-[13px] object-contain" draggable={false} />
      </span>
    );
  }

  return (
    <span className="flex size-8 shrink-0 items-center justify-center rounded-[40px] bg-[#1ab5ac] p-2">
      <img
        alt=""
        src={relComplicatedIcon}
        className="h-[13px] w-[11px] object-contain"
        draggable={false}
      />
    </span>
  );
}

type EducationEntry = {
  school: string;
  degree: string;
  years: string;
};

function formatEducationYears(startYear: string, endYear: string, currentlyStudying: boolean) {
  if (currentlyStudying && startYear.trim()) return `${startYear.trim()} - Present`;
  if (startYear.trim() && endYear.trim()) return `${startYear.trim()} - ${endYear.trim()}`;
  if (endYear.trim()) return `Graduated ${endYear.trim()}`;
  if (startYear.trim()) return startYear.trim();
  return "";
}

type WorkEntry = {
  company: string;
  role: string;
  location: string;
};

/** Demo fill — matches filled Work widget in Figma profile flows. */
const WORK_PRESET = {
  company: "Startup",
  role: "Product Designer",
  website: "odicci.com",
  location: "Looking for work",
} as const;

function WorkEditSheet({
  work,
  onSave,
  onClose,
}: {
  work?: WorkEntry;
  onSave: (work: WorkEntry | undefined) => void;
  onClose: () => void;
}) {
  const [company, setCompany] = useState(work?.company ?? "");
  const [role, setRole] = useState(work?.role ?? "");
  const [website, setWebsite] = useState("");
  const [logoUploaded, setLogoUploaded] = useState(Boolean(work?.company));

  const handleDone = () => {
    const nextCompany = company.trim();
    const nextRole = role.trim();
    if (!nextCompany && !nextRole) {
      onSave(undefined);
      return;
    }
    onSave({
      company: nextCompany || WORK_PRESET.company,
      role: nextRole || WORK_PRESET.role,
      location: work?.location?.trim() || WORK_PRESET.location,
    });
  };

  const applyPreset = () => {
    setCompany(WORK_PRESET.company);
    setRole(WORK_PRESET.role);
    setWebsite(WORK_PRESET.website);
    setLogoUploaded(true);
  };

  const clearLogo = () => setLogoUploaded(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-40 flex flex-col justify-end overflow-hidden rounded-[53px] bg-[rgba(1,2,17,0.35)] backdrop-blur-[6px]"
      role="dialog"
      aria-label="Edit Work"
      style={{ clipPath: "inset(0 round 53px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 40 }}
        animate={{ y: 0 }}
        exit={{ y: 28 }}
        transition={{ duration: 0.28, ease: EASE }}
        className="relative flex max-h-[86%] w-full flex-col overflow-hidden rounded-t-[16px] border border-[rgba(255,255,255,0.3)] border-b-0 bg-[rgba(1,2,17,0.8)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header — matches EducationHistorySheet / Figma 55:25680 fields */}
        <div className="relative flex h-[62px] shrink-0 items-center justify-between border-b border-[rgba(255,255,255,0.3)] px-[17px] pt-px">
          <img
            alt=""
            src={eduDragHandleIcon}
            className="pointer-events-none absolute left-1/2 top-[7px] h-1 w-9 -translate-x-1/2 object-contain"
            draggable={false}
          />
          <div className="flex items-center gap-2">
            <img
              alt=""
              src={workBriefcaseIcon}
              className="size-5 object-contain"
              draggable={false}
            />
            <p
              className="whitespace-nowrap text-[18px] leading-[27px] text-[#f7f6f2]"
              style={{ fontFamily: FONT }}
            >
              Edit Work
            </p>
          </div>
          <button
            type="button"
            onClick={handleDone}
            className="flex h-[37px] w-[72px] items-center justify-center rounded-[20px] bg-[rgba(247,246,242,0.2)]"
          >
            <span
              className="text-[14px] leading-[21px] text-[#e6e6e9]"
              style={{ fontFamily: FONT }}
            >
              Done
            </span>
          </button>
        </div>

        {/* Body */}
        <div className="flex min-h-0 flex-col gap-4 overflow-y-auto p-3 pb-6">
          <label className="flex w-full flex-col gap-1 rounded-[14px] bg-[rgba(247,246,242,0.2)] p-3">
            <span
              className="text-[11px] leading-[1.4] text-[#b1b1bc]"
              style={{ fontFamily: FONT }}
            >
              COMPANY NAME
            </span>
            <input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Enter company name"
              className="w-full rounded-[12px] bg-[#010211] px-4 py-3 text-[13px] leading-[1.4] text-[#f7f6f2] outline-none placeholder:text-[#b1b1bc]"
              style={{ fontFamily: FONT }}
            />
          </label>

          <label className="flex w-full flex-col gap-1 rounded-[14px] bg-[rgba(247,246,242,0.2)] p-3">
            <span
              className="text-[11px] leading-[1.4] text-[#b1b1bc]"
              style={{ fontFamily: FONT }}
            >
              ROLE/TITLE
            </span>
            <input
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Enter job role"
              className="w-full rounded-[12px] bg-[#010211] px-4 py-3 text-[13px] leading-[1.4] text-[#f7f6f2] outline-none placeholder:text-[#b1b1bc]"
              style={{ fontFamily: FONT }}
            />
          </label>

          <label className="flex w-full flex-col gap-1 rounded-[14px] bg-[rgba(247,246,242,0.2)] p-3">
            <span
              className="text-[11px] leading-[1.4] text-[#b1b1bc]"
              style={{ fontFamily: FONT }}
            >
              COMPANY WEBSITE (OPTIONAL)
            </span>
            <input
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="E.g Odicci.com"
              className="w-full rounded-[12px] bg-[#010211] px-4 py-3 text-[13px] leading-[1.4] text-[#f7f6f2] outline-none placeholder:text-[#b1b1bc]"
              style={{ fontFamily: FONT }}
            />
          </label>

          <div className="flex w-full flex-col gap-2 rounded-[14px] bg-[rgba(247,246,242,0.2)] p-3">
            <div className="flex w-full items-start gap-2">
              <span
                className="min-w-0 flex-1 text-[11px] leading-[1.4] text-[#b1b1bc]"
                style={{ fontFamily: FONT }}
              >
                LOGO PREVIEW
              </span>
              <button
                type="button"
                aria-label="Clear logo"
                onClick={clearLogo}
                className="flex size-4 shrink-0 items-center justify-center"
              >
                <img alt="" src={trashIcon} className="size-4 object-contain" draggable={false} />
              </button>
            </div>

            <div className="flex w-full flex-wrap items-center justify-between gap-2">
              <div className="flex min-w-0 items-center gap-4">
                <div className="flex size-[46px] shrink-0 items-center justify-center overflow-hidden rounded-[12px] bg-[#010211]">
                  {logoUploaded ? (
                    <img
                      alt=""
                      src={workMarkIcon}
                      className="size-6 object-contain"
                      draggable={false}
                    />
                  ) : (
                    <img
                      alt=""
                      src={workLogoPreviewIcon}
                      className="h-[17px] w-4 object-contain opacity-70"
                      draggable={false}
                    />
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setLogoUploaded(true)}
                  className="rounded-[24px] border border-[rgba(247,246,242,0.35)] bg-[rgba(247,246,242,0.12)] px-3 py-1.5"
                >
                  <span
                    className="text-[11px] leading-[1.4] text-[#f7f6f2]"
                    style={{ fontFamily: FONT }}
                  >
                    Upload logo image
                  </span>
                </button>
              </div>
              {logoUploaded ? (
                <div className="flex shrink-0 items-center gap-0.5">
                  <img
                    alt=""
                    src={logoRadioDotIcon}
                    className="size-5 object-contain"
                    draggable={false}
                  />
                  <span
                    className="text-[11px] leading-[1.4] text-[#f7f6f2]"
                    style={{ fontFamily: FONT }}
                  >
                    Logo uploaded
                  </span>
                </div>
              ) : null}
            </div>

            <button
              type="button"
              onClick={clearLogo}
              className="flex w-full items-center justify-center rounded-[30px] border border-[#ffb0b0] px-2.5 py-1"
            >
              <span
                className="text-[13px] leading-[1.4] text-[#bf0000]"
                style={{ fontFamily: FONT }}
              >
                Remove
              </span>
            </button>
          </div>

          <button
            type="button"
            onClick={applyPreset}
            className="self-start rounded-[20px] border border-[rgba(247,246,242,0.35)] bg-[rgba(247,246,242,0.2)] px-3 py-1.5 text-[11px] leading-[1.4] text-[#f7f6f2] transition hover:bg-[rgba(247,246,242,0.28)]"
            style={{ fontFamily: FONT }}
          >
            Use Startup preset
          </button>

          <p
            className="w-full rounded-[14px] bg-[rgba(247,246,242,0.2)] px-3 py-2 text-center text-[12px] font-light leading-[18px] text-[rgba(247,246,242,0.6)]"
            style={{ fontFamily: FONT }}
          >
            This helps find common ground and start conversations
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/** Figma 1010:51048 — Location privacy glass sheet (map widget info). */
function LocationInfoSheet({
  onClose,
  backdropUrl,
  isLight,
}: {
  onClose: () => void;
  backdropUrl: string;
  isLight: boolean;
}) {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[60] flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label="Location privacy"
    >
      <div className="pointer-events-auto w-full shrink-0">
        <div className="crcle-location-info-sheet-enter w-full">
          <div
            className={`crcle-location-info-sheet flex w-full flex-col items-center gap-6 overflow-hidden rounded-bl-[24px] rounded-br-[24px] rounded-tl-[1px] rounded-tr-[1px] px-4 py-6 ${
              isLight ? "crcle-location-info-sheet--light" : ""
            }`}
          >
            <div aria-hidden className="crcle-location-info-sheet-backdrop rounded-[inherit]">
              <img
                alt=""
                src={backdropUrl}
                className="absolute left-1/2 top-0 h-[160%] w-[160%] max-w-none -translate-x-1/2 -translate-y-[18%] scale-110 object-cover object-[center_20%]"
                draggable={false}
              />
              <div className="crcle-location-info-sheet-backdrop-tint rounded-[inherit]" />
            </div>

            <IconImg src={crcleLogo} className="crcle-theme-icon relative z-[1] h-[13px] w-[38px]" />

            <div className="relative z-[1] flex w-full flex-col gap-3">
              <p
                className={`text-[13px] leading-[1.4] ${
                  isLight ? "text-[#01010d]" : "text-white/60"
                }`}
                style={{ fontFamily: FONT }}
              >
                For your privacy, only your neighborhood or city area is shown—never your exact
                address or pinpoint position.
              </p>
              <div
                className={`h-px w-full ${isLight ? "bg-[rgba(1,1,13,0.12)]" : "bg-white/15"}`}
                aria-hidden
              />
              <p
                className={`text-center text-[16px] font-medium leading-[1.4] ${
                  isLight ? "text-[#01010d]" : "text-white"
                }`}
                style={{ fontFamily: FONT }}
              >
                Designed to connect - Not consume
              </p>
            </div>

            <button
              type="button"
              aria-label="Close location privacy information"
              onClick={onClose}
              className="relative z-[1] mx-auto flex h-3 w-9 touch-none items-center justify-center opacity-80 transition-opacity hover:opacity-100"
            >
              <span
                className={`block h-[3px] w-9 rounded-full ${
                  isLight ? "bg-[rgba(2,4,38,0.35)]" : "bg-[rgba(247,246,242,0.45)]"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      <button
        type="button"
        aria-label="Dismiss location privacy information"
        className="pointer-events-auto min-h-0 flex-1"
        onClick={onClose}
      />
    </div>
  );
}

/** Figma 257:83140 — Join the verified crcle (light KYC drawer). */
function VerificationSheet({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="absolute inset-0 z-40 flex flex-col justify-end overflow-hidden rounded-[53px]"
      role="dialog"
      aria-modal="true"
      aria-label="Join the verified crcle"
      style={{ clipPath: "inset(0 round 53px)" }}
    >
      <button
        type="button"
        aria-label="Dismiss verification"
        className="absolute inset-0 overflow-hidden rounded-[53px] bg-[rgba(2,3,29,0.18)] backdrop-blur-[12px] [-webkit-backdrop-filter:blur(12px)]"
        onClick={onClose}
      />

      <div className="crcle-verify-sheet relative z-[1] flex h-[386px] w-full flex-col overflow-hidden rounded-t-[16px] border border-[rgba(2,3,29,0.1)] border-b-0 shadow-[0_-12px_40px_rgba(2,3,29,0.12)]">
        <div className="crcle-verify-sheet-frost rounded-[inherit]" aria-hidden />

        {/* Header — Figma 257:83141 */}
        <div className="crcle-verify-sheet-header relative flex h-[52px] shrink-0 items-center gap-[25px] border border-[rgba(2,3,29,0.1)] border-b-0 px-3 pb-3 pt-4">
          <img
            alt=""
            src={verifyHandleIcon}
            className="pointer-events-none absolute left-1/2 top-[5px] h-[3px] w-[56px] -translate-x-1/2 max-w-none"
            draggable={false}
          />
          <p
            className="min-w-0 flex-1 text-[16px] font-medium leading-none text-[#02031d]"
            style={{ fontFamily: FONT }}
          >
            Join the verified crcle
          </p>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[rgba(2,3,29,0.05)] p-1"
          >
            <span className="relative size-4 shrink-0 overflow-hidden">
              <img
                alt=""
                src={verifyCloseIcon}
                className="absolute inset-0 size-full max-w-none object-contain"
                draggable={false}
              />
            </span>
          </button>
        </div>

        {/* Body — Figma 257:83150, glass blur 40 */}
        <div className="crcle-verify-sheet-body flex min-h-0 flex-1 flex-col items-center justify-between border-t border-[rgba(2,3,29,0.1)] px-3 pb-4 pt-6">
          <div className="flex items-center justify-center rounded-[36px] bg-[rgba(247,246,242,0.6)] px-3 py-1">
            <p
              className="text-center text-[12px] leading-[1.2] tracking-[-0.15px] text-[rgba(2,3,29,0.5)]"
              style={{ fontFamily: FONT }}
            >
              Verified Social
            </p>
          </div>

          <div className="flex w-full flex-col items-center gap-6">
            <span className="relative size-[46px] shrink-0 overflow-hidden">
              <img
                alt=""
                src={verifySecuritySafeIcon}
                className="absolute inset-0 size-full max-w-none object-contain"
                draggable={false}
              />
            </span>
            <p
              className="w-full text-center text-[14px] font-medium leading-[1.2] tracking-[-0.15px] text-[#02031d]"
              style={{ fontFamily: FONT }}
            >
              To keep the community authentic, verify your identity and claim your verified status.
            </p>
          </div>

          <div className="flex items-center gap-1">
            <span className="relative h-[15px] w-[102px] shrink-0 overflow-hidden">
              <img
                alt="Fourthline"
                src={verifyFourthlineLogo}
                className="absolute inset-0 size-full max-w-none object-contain object-left"
                draggable={false}
              />
            </span>
            <span
              className="flex h-[15px] w-1.5 flex-col justify-end text-center text-[8px] leading-[1.4] text-[#02031d]"
              style={{ fontFamily: FONT }}
            >
              X
            </span>
            <span className="relative h-[13px] w-[38px] shrink-0 overflow-hidden">
              <img
                alt="crcle"
                src={verifyCrcleWordmark}
                className="absolute inset-0 size-full max-w-none object-contain"
                draggable={false}
              />
            </span>
          </div>

          <div className="flex w-full flex-col items-center gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex items-center justify-center rounded-full bg-[#02031d] px-9 py-3"
            >
              <span
                className="text-center text-[16px] font-medium leading-[1.2] tracking-[-0.44px] text-[#f7f6f2]"
                style={{ fontFamily: FONT }}
              >
                Start Verification
              </span>
            </button>
            <p
              className="w-full text-center text-[9px] leading-[1.1] tracking-[-0.15px] text-[rgba(2,3,29,0.4)]"
              style={{ fontFamily: FONT }}
            >
              Your data is encrypted and used only to identify verification
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function EducationHistorySheet({
  education,
  onSave,
  onClose,
}: {
  education?: EducationEntry;
  onSave: (education: EducationEntry | undefined) => void;
  onClose: () => void;
}) {
  const [entries, setEntries] = useState<EducationEntry[]>(() =>
    education?.school ? [education] : [],
  );
  const [university, setUniversity] = useState("");
  const [degree, setDegree] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [currentlyStudying, setCurrentlyStudying] = useState(false);

  const clearForm = () => {
    setUniversity("");
    setDegree("");
    setFieldOfStudy("");
    setStartYear("");
    setEndYear("");
    setCurrentlyStudying(false);
  };

  const buildEntryFromForm = (): EducationEntry | null => {
    const school = university.trim();
    if (!school) return null;
    const degreeLabel = [degree.trim(), fieldOfStudy.trim()].filter(Boolean).join(" · ") || degree.trim();
    return {
      school,
      degree: degreeLabel,
      years: formatEducationYears(startYear, endYear, currentlyStudying),
    };
  };

  const handleAddEducation = () => {
    const next = buildEntryFromForm();
    if (!next) return;
    setEntries((prev) => [...prev, next]);
    clearForm();
  };

  const handleDone = () => {
    const fromForm = buildEntryFromForm();
    const nextEntries = fromForm ? [...entries, fromForm] : entries;
    onSave(nextEntries[0]);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-40 flex flex-col justify-end overflow-hidden rounded-[53px] bg-[rgba(1,2,17,0.35)] backdrop-blur-[6px]"
      role="dialog"
      aria-label="Edit Education History"
      style={{ clipPath: "inset(0 round 53px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 40 }}
        animate={{ y: 0 }}
        exit={{ y: 28 }}
        transition={{ duration: 0.28, ease: EASE }}
        className="relative flex max-h-[86%] w-full flex-col overflow-hidden rounded-t-[16px] border border-[rgba(255,255,255,0.3)] border-b-0 bg-[rgba(1,2,17,0.8)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header — Figma 866:243243 */}
        <div className="relative flex h-[62px] shrink-0 items-center justify-between border-b border-[rgba(255,255,255,0.3)] px-[17px] pt-px">
          <img
            alt=""
            src={eduDragHandleIcon}
            className="pointer-events-none absolute left-1/2 top-[7px] h-1 w-9 -translate-x-1/2 object-contain"
            draggable={false}
          />
          <div className="flex items-center gap-2">
            <img
              alt=""
              src={eduGraduationIcon}
              className="size-5 object-contain"
              draggable={false}
            />
            <p
              className="whitespace-nowrap text-[18px] leading-[27px] text-[#f7f6f2]"
              style={{ fontFamily: FONT }}
            >
              Edit Education History
            </p>
          </div>
          <button
            type="button"
            onClick={handleDone}
            className="flex h-[37px] w-[72px] items-center justify-center rounded-[20px] bg-[rgba(247,246,242,0.2)]"
          >
            <span
              className="text-[14px] leading-[21px] text-[#e6e6e9]"
              style={{ fontFamily: FONT }}
            >
              Done
            </span>
          </button>
        </div>

        {/* Body — Figma 866:243253 */}
        <div className="flex min-h-0 flex-col gap-4 overflow-y-auto p-3 pb-6">
          <div className="flex flex-col gap-2">
            {entries.map((entry, index) => (
              <div
                key={`${entry.school}-${index}`}
                className="flex w-full items-start justify-end gap-2 rounded-[14px] bg-[rgba(247,246,242,0.2)] p-2"
              >
                <div className="flex min-w-0 flex-1 items-center gap-2">
                  <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-[10px] bg-white">
                    <img
                      alt=""
                      src={loughboroughCrest}
                      className="size-6 object-contain"
                      draggable={false}
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col items-start leading-[1.4]">
                    <p
                      className="w-full text-[16px] font-semibold text-white"
                      style={{ fontFamily: FONT }}
                    >
                      {entry.school}
                    </p>
                    <p
                      className="w-full text-[11px] text-[#f7f6f2]"
                      style={{ fontFamily: FONT }}
                    >
                      {entry.degree}
                    </p>
                    <p
                      className="w-full text-[11px] text-[#99a1af]"
                      style={{ fontFamily: FONT }}
                    >
                      {entry.years}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  aria-label="Remove education"
                  onClick={() => setEntries((prev) => prev.filter((_, i) => i !== index))}
                  className="mt-0.5 flex size-4 shrink-0 items-center justify-center"
                >
                  <img alt="" src={trashIcon} className="size-4 object-contain" draggable={false} />
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={handleAddEducation}
            className="flex items-center gap-2 self-start"
          >
            <img alt="" src={eduPlusIcon} className="size-4 object-contain" draggable={false} />
            <span
              className="text-[13px] leading-[1.4] text-[#f7f6f2]"
              style={{ fontFamily: FONT }}
            >
              Add Education
            </span>
          </button>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="flex w-full flex-col gap-1">
                <span
                  className="text-[11px] leading-[1.4] text-[#b1b1bc]"
                  style={{ fontFamily: FONT }}
                >
                  UNIVERSITY
                </span>
                <input
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  placeholder="Enter university"
                  className="w-full rounded-[12px] bg-[#02031d] px-4 py-3 text-[13px] leading-[1.4] text-[#f7f6f2] outline-none placeholder:text-[#b1b1bc]"
                  style={{ fontFamily: FONT }}
                />
              </label>

              <div className="flex gap-2">
                <label className="flex min-w-0 flex-1 flex-col gap-1">
                  <span
                    className="text-[11px] leading-[1.4] text-[#b1b1bc]"
                    style={{ fontFamily: FONT }}
                  >
                    DEGREE
                  </span>
                  <input
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    placeholder="E.g. BSc"
                    className="w-full rounded-[12px] bg-[#02031d] px-4 py-3 text-[13px] leading-[1.4] text-[#f7f6f2] outline-none placeholder:text-[#b1b1bc]"
                    style={{ fontFamily: FONT }}
                  />
                </label>
                <label className="flex min-w-0 flex-1 flex-col gap-1">
                  <span
                    className="text-[11px] leading-[1.4] text-[#b1b1bc]"
                    style={{ fontFamily: FONT }}
                  >
                    FIELD OF STUDY
                  </span>
                  <input
                    value={fieldOfStudy}
                    onChange={(e) => setFieldOfStudy(e.target.value)}
                    placeholder="E.g. Industrial Design"
                    className="w-full rounded-[12px] bg-[#02031d] px-4 py-3 text-[13px] leading-[1.4] text-[#f7f6f2] outline-none placeholder:text-[#b1b1bc]"
                    style={{ fontFamily: FONT }}
                  />
                </label>
              </div>

              <div className="flex gap-2">
                <label className="flex min-w-0 flex-1 flex-col gap-1">
                  <span
                    className="text-[11px] leading-[1.4] text-[#b1b1bc]"
                    style={{ fontFamily: FONT }}
                  >
                    START YEAR*
                  </span>
                  <input
                    value={startYear}
                    onChange={(e) => setStartYear(e.target.value)}
                    placeholder="E.g. 2019"
                    className="w-full rounded-[12px] bg-[#02031d] px-4 py-3 text-[13px] leading-[1.4] text-[#f7f6f2] outline-none placeholder:text-[#b1b1bc]"
                    style={{ fontFamily: FONT }}
                  />
                </label>
                <label className="flex min-w-0 flex-1 flex-col gap-1">
                  <span
                    className="text-[11px] leading-[1.4] text-[#b1b1bc]"
                    style={{ fontFamily: FONT }}
                  >
                    END YEAR*
                  </span>
                  <input
                    value={endYear}
                    onChange={(e) => setEndYear(e.target.value)}
                    placeholder="E.g. 2022"
                    disabled={currentlyStudying}
                    className="w-full rounded-[12px] bg-[#02031d] px-4 py-3 text-[13px] leading-[1.4] text-[#f7f6f2] outline-none placeholder:text-[#b1b1bc] disabled:opacity-40"
                    style={{ fontFamily: FONT }}
                  />
                </label>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                setCurrentlyStudying((v) => {
                  const next = !v;
                  if (next) setEndYear("");
                  return next;
                })
              }
              className="flex h-4 w-[322px] max-w-full items-center gap-1"
              aria-pressed={currentlyStudying}
            >
              <span
                className={`flex size-4 shrink-0 items-center justify-center rounded border border-solid ${
                  currentlyStudying
                    ? "border-[#f7f6f2] bg-[rgba(247,246,242,0.2)]"
                    : "border-[#b1b1bc] bg-transparent"
                }`}
              >
                {currentlyStudying ? (
                  <span className="size-2 rounded-[1px] bg-[#f7f6f2]" />
                ) : null}
              </span>
              <span
                className="text-[13px] leading-[1.4] text-[#f7f6f2]"
                style={{ fontFamily: FONT }}
              >
                I currently study here
              </span>
            </button>

            <p
              className="w-full text-center text-[12px] font-light leading-[18px] text-[rgba(247,246,242,0.6)]"
              style={{ fontFamily: FONT }}
            >
              Students see other students first - great for campus connections
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function EditFormSheet({
  title,
  fields,
  onSave,
  onClose,
}: {
  title: string;
  fields: { key: string; label: string; value: string }[];
  onSave: (values: Record<string, string>) => void;
  onClose: () => void;
}) {
  const [values, setValues] = useState(() =>
    Object.fromEntries(fields.map((f) => [f.key, f.value])),
  );

  return (
    <SheetShell title={title} onClose={onClose}>
      <div className="flex w-full flex-col gap-3">
        {fields.map((field) => (
          <label key={field.key} className="flex flex-col gap-1.5">
            <span
              className="text-[11px] uppercase tracking-wide text-[rgba(247,246,242,0.45)]"
              style={{ fontFamily: FONT }}
            >
              {field.label}
            </span>
            <input
              value={values[field.key] ?? ""}
              onChange={(e) => setValues((v) => ({ ...v, [field.key]: e.target.value }))}
              className="h-11 rounded-[20px] border border-[rgba(247,246,242,0.15)] bg-white/5 px-3 text-[14px] text-[#f7f6f2] outline-none placeholder:text-white/30"
              style={{ fontFamily: FONT }}
            />
          </label>
        ))}
        <button
          type="button"
          onClick={() => onSave(values)}
          className="mt-2 flex h-12 items-center justify-center rounded-full bg-[#f7f6f2] text-[15px] font-medium text-[#02031d]"
          style={{ fontFamily: FONT }}
        >
          Save
        </button>
      </div>
    </SheetShell>
  );
}

function SocialLinksSheet({
  socials,
  onSave,
  onClose,
}: {
  socials: ProfileState["socials"];
  onSave: (socials: ProfileState["socials"]) => void;
  onClose: () => void;
}) {
  const [draft, setDraft] = useState(socials);
  const count = Object.values(draft).filter(Boolean).length;

  return (
    <SheetShell
      title="Edit Social Links"
      subtitle={`${count}/4 Links Added`}
      onClose={onClose}
      doneLabel="Done"
      onDone={() => onSave(draft)}
    >
      <div className="flex w-full flex-col gap-3">
        {(
          [
            ["instagram", "Instagram", "instagram.com/"],
            ["behance", "Behance", "behance.net/"],
            ["linkedin", "LinkedIn", "linkedin.com/in/"],
            ["dribbble", "Dribbble", "dribbble.com/"],
          ] as const
        ).map(([key, label, prefix]) => (
          <label key={key} className="flex flex-col gap-1.5">
            <span
              className="text-[11px] uppercase tracking-wide text-[rgba(247,246,242,0.45)]"
              style={{ fontFamily: FONT }}
            >
              {label}
            </span>
            <div className="flex h-11 overflow-hidden rounded-[20px] border border-[rgba(247,246,242,0.15)] bg-white/5">
              <span className="flex items-center bg-white/5 px-3 text-[12px] text-white/40">
                {prefix}
              </span>
              <input
                value={draft[key] ?? ""}
                onChange={(e) => setDraft((d) => ({ ...d, [key]: e.target.value }))}
                placeholder="YOUR_HANDLE"
                className="min-w-0 flex-1 bg-transparent px-2 text-[14px] text-[#f7f6f2] outline-none placeholder:text-white/30"
                style={{ fontFamily: FONT }}
              />
            </div>
          </label>
        ))}
        <button
          type="button"
          onClick={() => onSave(draft)}
          className="mt-1 flex h-12 items-center justify-center rounded-full border border-[rgba(247,246,242,0.25)] bg-[rgba(247,246,242,0.1)] text-[15px] font-medium text-[#f7f6f2]"
          style={{ fontFamily: FONT }}
        >
          Save Link
        </button>
        <p className="text-center text-[11px] text-[rgba(247,246,242,0.4)]" style={{ fontFamily: FONT }}>
          This helps put your work out there.
        </p>
      </div>
    </SheetShell>
  );
}

function SheetShell({
  title,
  subtitle,
  children,
  onClose,
  doneLabel,
  onDone,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  onClose: () => void;
  doneLabel?: string;
  onDone?: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-40 flex flex-col justify-end overflow-hidden rounded-[53px] bg-[rgba(2,3,29,0.45)] backdrop-blur-[6px]"
      role="dialog"
      aria-label={title}
      style={{ clipPath: "inset(0 round 53px)" }}
    >
      <motion.div
        initial={{ y: 40 }}
        animate={{ y: 0 }}
        exit={{ y: 28 }}
        transition={{ duration: 0.28, ease: EASE }}
        className="relative flex max-h-[78%] flex-col overflow-hidden rounded-t-[28px] border border-[rgba(247,246,242,0.12)] border-b-0 bg-[rgba(2,2,23,0.94)] px-4 pb-8 pt-4"
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <p className="text-[18px] font-medium text-[#f7f6f2]" style={{ fontFamily: FONT }}>
              {title}
            </p>
            {subtitle ? (
              <p className="mt-0.5 text-[12px] text-[rgba(247,246,242,0.5)]" style={{ fontFamily: FONT }}>
                {subtitle}
              </p>
            ) : null}
          </div>
          {doneLabel && onDone ? (
            <button
              type="button"
              onClick={onDone}
              className="text-[14px] font-medium text-[#f7f6f2]"
              style={{ fontFamily: FONT }}
            >
              {doneLabel}
            </button>
          ) : (
            <button type="button" aria-label="Close" onClick={onClose}>
              <img alt="" src={locusCloseIcon} className="size-5 object-contain" draggable={false} />
            </button>
          )}
        </div>
        <div className="min-h-0 overflow-y-auto">{children}</div>
        <button
          type="button"
          aria-label="Close sheet"
          onClick={onClose}
          className="crcle-glass-btn crcle-glass-btn--frost relative mx-auto mt-4 flex h-10 w-[60px] items-center justify-center overflow-hidden rounded-[24px]"
        >
          <div className="dock-glass-lens opacity-40" aria-hidden />
          <img
            alt=""
            src={locusCloseIcon}
            className="relative z-[1] size-6 object-contain"
            draggable={false}
          />
        </button>
      </motion.div>
    </motion.div>
  );
}

function StatusBar() {
  return (
    <div className="relative z-30 mx-auto flex h-[62px] w-[84%] shrink-0 items-end justify-between px-2 pb-[10px] text-[#f7f6f2] [.crcle-phone--light_&]:text-black">
      <span
        className="text-[17px] font-semibold leading-[22px]"
        style={{ fontFamily: "SF Pro, system-ui, -apple-system, sans-serif" }}
      >
        9:41
      </span>
      <div className="crcle-theme-icon flex items-center gap-[7px] pb-0.5">
        <IconImg src={cellularIcon} className="h-[12.226px] w-[19.2px]" />
        <IconImg src={wifiIcon} className="h-[12.328px] w-[17.142px]" />
        <IconImg src={batteryIcon} className="h-[13px] w-[27.328px]" />
      </div>
    </div>
  );
}

function IconImg({ src, className = "size-6" }: { src: string; className?: string }) {
  return (
    <div className={`relative shrink-0 overflow-hidden ${className}`}>
      <img alt="" src={src} className="absolute inset-0 size-full max-w-none object-contain" />
    </div>
  );
}
