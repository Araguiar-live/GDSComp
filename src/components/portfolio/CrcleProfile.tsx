import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState, type ReactNode } from "react";
import batteryIcon from "@/assets/crcle/battery.svg";
import cellularIcon from "@/assets/crcle/cellular.svg";
import crcleLogo from "@/assets/crcle/crcle-logo.svg";
import locusCloseIcon from "@/assets/crcle/locus/close-x.svg";
import locusPlusIcon from "@/assets/crcle/locus/plus.svg";
import cameraIcon from "@/assets/crcle/profile/camera.svg";
import datingCoffeeIcon from "@/assets/crcle/profile/dating-coffee.svg";
import datingGroupWhiteIcon from "@/assets/crcle/profile/dating-group-white.svg";
import datingHeartWhiteIcon from "@/assets/crcle/profile/dating-heart-white.svg";
import datingLinkIcon from "@/assets/crcle/profile/dating-link.svg";
import datingLoveSeatIcon from "@/assets/crcle/profile/dating-love-seat.svg";
import datingSendIcon from "@/assets/crcle/profile/dating-send.svg";
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
import locationMapImg from "@/assets/crcle/profile/location-map.png";
import lockFilledIcon from "@/assets/crcle/profile/lock-filled.svg";
import loughboroughCrest from "@/assets/crcle/profile/loughborough-crest.png";
import mapPinPreciseIcon from "@/assets/crcle/profile/map-pin-precise.svg";
import profileLaptopIcon from "@/assets/crcle/profile/laptop.svg";
import profileMaskGreenIcon from "@/assets/crcle/profile/mask-green.svg";
import profileMaskIcon from "@/assets/crcle/profile/mask.svg";
import masksTheaterIcon from "@/assets/crcle/profile/masks-theater.svg";
import profileMoonCloudIcon from "@/assets/crcle/profile/moon-cloud.svg";
import profilePinIcon from "@/assets/crcle/profile/pin.svg";
import profilePlaneIcon from "@/assets/crcle/profile/plane.svg";
import raindropBadgeIcon from "@/assets/crcle/profile/raindrop-badge.svg";
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
import vincentPortrait from "@/assets/crcle/profile/vincent-portrait.png";
import workBriefcaseIcon from "@/assets/crcle/profile/work-briefcase.svg";
import workLogoPreviewIcon from "@/assets/crcle/profile/work-logo-preview.svg";
import workMarkIcon from "@/assets/crcle/profile/work-mark.svg";
import logoRadioDotIcon from "@/assets/crcle/profile/logo-radio-dot.svg";
import shareIcon from "@/assets/crcle/share.svg";
import shareInnerIcon from "@/assets/crcle/share-inner.svg";
import wifiIcon from "@/assets/crcle/wifi.svg";
import { CrclePhoneFrame } from "@/components/portfolio/CrclePhoneFrame";
import { CrcleMoreButton, CrclePrimaryDock } from "@/components/portfolio/CrcleChrome";
import {
  useCrcleBroadcast,
  type BroadcastState,
} from "@/components/portfolio/crcleBroadcast";

export type { BroadcastState };

/**
 * CRCLE Profile — Figma 851:225640 (dark profile widget grid).
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

type Overlay = null | "mood" | "education" | "work" | "relationship" | "location" | "socials";

const MOODS: {
  id: BroadcastState;
  label: string;
  icon: string;
  description: string;
}[] = [
  {
    id: "open_day",
    label: "Open Day",
    icon: profilePlaneIcon,
    description:
      "Open to spontaneous hangouts, flexible plans, and real-time invites throughout the day.",
  },
  {
    id: "night_owl",
    label: "Night Owl",
    icon: profileMoonCloudIcon,
    description:
      "Active during late hours; down for evening events, night calls, or late-night sessions.",
  },
  {
    id: "collab",
    label: "Collab",
    icon: profileLaptopIcon,
    description:
      "Focused on co-working, side projects, brain-dumping ideas, or working together in real time.",
  },
  {
    id: "in_the_area",
    label: "In The Area",
    icon: profilePinIcon,
    description:
      "Nearby and available to meet up locally for a quick coffee, chat, or walk right now.",
  },
];

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
      years: "2019 - 2022",
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
  const [broadcastMood, setBroadcastMood] = useCrcleBroadcast();
  const [profile, setProfile] = useState<ProfileState>(() => ({
    ...INITIAL,
    broadcast: { ...INITIAL.broadcast, activeState: broadcastMood },
  }));
  const [overlay, setOverlay] = useState<Overlay>(null);

  const socialCount = Object.values(profile.socials).filter(Boolean).length;

  return (
    <div className="relative ml-auto w-fit">
      <CrclePhoneFrame>
        <div className="relative flex h-full min-h-0 w-full flex-col overflow-hidden bg-[#010211]">
          <div className="relative min-h-0 flex-1">
            {/* Absolute scroll so the dock can sample this layer for backdrop-filter */}
            <div className="absolute inset-0 overflow-x-hidden overflow-y-auto px-3 pb-28 pt-[86px]">
              <ProfileMainView
                profile={profile}
                socialCount={socialCount}
                onOpenMood={() => setOverlay("mood")}
                onOpenEducation={() => setOverlay("education")}
                onOpenWork={() => setOverlay("work")}
                onOpenRelationship={() => setOverlay("relationship")}
                onOpenLocation={() => setOverlay("location")}
                onOpenSocials={() => setOverlay("socials")}
              />
            </div>

            {/* Status + wordmark float over content with a soft fade — no hard cutoff */}
            <div className="pointer-events-none absolute inset-x-0 top-0 z-20">
              <div className="bg-gradient-to-b from-[#010211] from-40% via-[#010211]/85 to-transparent pb-8">
                <StatusBar />
                <div className="mt-[5px] flex justify-center pb-1">
                  <IconImg src={crcleLogo} className="h-[13px] w-[38px]" />
                </div>
              </div>
            </div>

            <CrclePrimaryDock
              active="profile"
              onProfile={() => {}}
              onMessages={onGoToMessages}
              onRadar={onGoToRadar}
              onSignalHome={onGoToSignalHome}
            />
          </div>

          <AnimatePresence>
            {overlay === "mood" ? (
              <MoodSwitcherModal
                isIncognito={profile.broadcast.isIncognito}
                activeState={profile.broadcast.activeState}
                onToggleIncognito={() =>
                  setProfile((p) => ({
                    ...p,
                    broadcast: { ...p.broadcast, isIncognito: !p.broadcast.isIncognito },
                  }))
                }
                onSelectMood={(id) => {
                  if (profile.broadcast.isIncognito) return;
                  setBroadcastMood(id);
                  setProfile((p) => ({
                    ...p,
                    broadcast: { ...p.broadcast, activeState: id },
                  }));
                }}
                onClose={() => setOverlay(null)}
              />
            ) : null}

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
        </div>
      </CrclePhoneFrame>
    </div>
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
  onOpenSocials,
}: {
  profile: ProfileState;
  socialCount: number;
  onOpenMood: () => void;
  onOpenEducation: () => void;
  onOpenWork: () => void;
  onOpenRelationship: () => void;
  onOpenLocation: () => void;
  onOpenSocials: () => void;
}) {
  const { user, widgets } = profile;
  const isIncognito = profile.broadcast.isIncognito;
  const [locationEnabled, setLocationEnabled] = useState(false);
  const lookingForWork = widgets.work?.location?.toLowerCase().includes("looking") ?? false;
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
    <div className="flex flex-col gap-4 pb-4">
      {/* Identity — Figma 851:225654 */}
      <div className="flex w-full items-end justify-between px-0">
        <div className="flex flex-col items-start justify-center">
          <div className="flex items-center gap-2">
            <p className="text-[16px] leading-[1.4] text-[#f7f6f2]" style={{ fontFamily: FONT }}>
              {user.name}
            </p>
            <span className="flex h-[22px] w-[22px] items-center justify-center rounded-[36px] bg-[#f7f6f2] p-1">
              <img
                alt=""
                src={raindropBadgeIcon}
                className="h-[11px] w-2.5 object-contain"
                draggable={false}
              />
            </span>
          </div>
          <p className="text-[11px] leading-[1.4] text-[#b1b1bc]" style={{ fontFamily: FONT }}>
            {user.handle}
          </p>
        </div>
        <CrcleMoreButton />
      </div>

      {/* Signal Live + mood — Figma 851:225665 */}
      <div className="flex items-start justify-center gap-2 px-0.5">
        <button
          type="button"
          onClick={onOpenMood}
          className="flex items-center gap-1 self-stretch rounded-[24px] border border-[rgba(15,201,80,0.2)] bg-gradient-to-r from-white/[0.03] to-[rgba(15,201,80,0.12)] px-4 py-2"
        >
          <span className="relative flex size-2 items-center justify-center">
            <span
              aria-hidden
              className="absolute inset-0 animate-ping rounded-full bg-[#22c55e]/70"
            />
            <span className="relative size-1 rounded-full bg-[#22c55e] shadow-[0_0_6px_rgba(34,197,94,0.85)]" />
          </span>
          <span className="text-[11px] leading-[1.4] text-[#22c55e]" style={{ fontFamily: FONT }}>
            Signal Live
          </span>
        </button>
        <button
          type="button"
          onClick={onOpenMood}
          className="crcle-glass-btn relative flex items-center justify-center gap-1 self-stretch overflow-hidden rounded-[64px] py-1 pl-2 pr-1"
        >
          <IconImg src={profileMaskGreenIcon} className="relative z-[1] size-6" />
          <ChevronDown className="relative z-[1] size-5 text-white/50" strokeWidth={1.5} />
        </button>
      </div>

      {/* Top row: portrait + stats — Figma 851:225673 */}
      <div className="mx-auto flex h-[255px] w-full gap-4">
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

        <div
          className="relative flex min-w-0 flex-1 flex-col gap-3 overflow-hidden rounded-2xl p-3"
          style={{ background: "linear-gradient(90deg, #1e2939 0%, #1e2939 100%)" }}
        >
          <img
            alt=""
            src={statsDecoIcon}
            className="pointer-events-none absolute -left-2 -top-2 h-[270px] w-[225px] max-w-none opacity-90"
            draggable={false}
          />
          <div className="relative z-[1] flex min-h-0 flex-1 flex-col gap-1">
            <div className="flex h-[16.5px] items-center gap-1.5">
              <img alt="" src={eyeWeekIcon} className="size-3.5 object-contain" draggable={false} />
              <span className="text-[11px] leading-[16.5px] text-[#f7f6f2]" style={{ fontFamily: FONT }}>
                This week
              </span>
            </div>
            <div className="flex min-h-0 flex-1 flex-col gap-2 rounded-xl bg-[rgba(247,246,242,0.2)] p-2">
              <div>
                <p
                  className="text-[24px] font-medium leading-[25px] text-[#f7f6f2]"
                  style={{ fontFamily: FONT }}
                >
                  {user.views}
                </p>
                <p
                  className="text-[13px] font-light leading-[1.4] text-[#f7f6f2]"
                  style={{ fontFamily: FONT }}
                >
                  Profile views
                </p>
              </div>
              <div>
                <p className="text-[19px] leading-[1.4] text-[#f7f6f2]" style={{ fontFamily: FONT }}>
                  {user.connections}
                </p>
                <p
                  className="text-[13px] font-light leading-[1.4] text-[#f7f6f2]"
                  style={{ fontFamily: FONT }}
                >
                  connections
                </p>
              </div>
              <div className="flex items-center gap-1">
                <img alt="" src={trendingUpIcon} className="size-3.5 object-contain" draggable={false} />
                <span
                  className="text-[11px] font-light leading-[1.4] text-[#f7f6f2]"
                  style={{ fontFamily: FONT }}
                >
                  +5 this week
                </span>
              </div>
            </div>
          </div>
          <div className="relative z-[1] flex flex-col gap-2">
            <div className="flex items-start justify-between text-[11px] text-[#f7f6f2]">
              <div style={{ fontFamily: FONT }}>
                <p className="leading-[1.2]">PROFILE STRENGTH</p>
                <p className="font-medium leading-[1.2]">Intermediate</p>
              </div>
              <p className="font-light leading-[1.2]" style={{ fontFamily: FONT }}>
                {user.strengthPct}%
              </p>
            </div>
            <div className="relative h-[4px] w-full px-0.5">
              <img
                alt=""
                src={strengthTrackIcon}
                className="absolute inset-x-0.5 top-1/2 h-1 w-[calc(100%-4px)] -translate-y-1/2 object-fill"
                draggable={false}
              />
              <img
                alt=""
                src={strengthFillIcon}
                className="absolute left-0.5 top-1/2 h-1 -translate-y-1/2 object-fill"
                style={{ width: `${user.strengthPct}%` }}
                draggable={false}
              />
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
              <button
                type="button"
                onClick={onOpenLocation}
                className="relative h-[181px] min-w-0 overflow-hidden rounded-2xl text-left"
              >
                <img
                  alt=""
                  src={locationMapImg}
                  className="absolute inset-0 size-full object-cover"
                  draggable={false}
                />
                <div className="absolute inset-0 rounded-2xl bg-[rgba(2,4,38,0.1)]" />
                {showLocationDetails ? (
                  <>
                    <span className="absolute left-[72px] top-[84px] flex items-center gap-1 rounded-bl-[4px] rounded-br-[24px] rounded-tl-xl rounded-tr-[24px] bg-[#05f] py-0.5 pl-1.5 pr-2">
                      <span className="size-0.5 rounded-full bg-white" />
                      <span
                        className="text-[11px] leading-[1.4] text-[#fefefe]"
                        style={{ fontFamily: FONT }}
                      >
                        {widgets.location ?? "Holland Park"}
                      </span>
                    </span>
                    <img
                      alt=""
                      src={mapPinPreciseIcon}
                      className="absolute left-[72px] top-[107px] size-2.5"
                      draggable={false}
                    />
                  </>
                ) : null}
                {/* Figma 866:243439 — incognito frost */}
                {frostMap ? (
                  <div className="absolute inset-0 z-[1] flex flex-col items-center justify-center overflow-hidden rounded-2xl bg-[rgba(255,255,255,0.1)] px-[35px] backdrop-blur-[4px]">
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
                <span
                  className="absolute left-2 top-2 z-[2] rounded-[24px] bg-[#030426] py-0.5 pl-2 pr-2.5 text-[13px] leading-[1.4] text-[#fefefe]"
                  style={{ fontFamily: FONT }}
                >
                  Current Location
                </span>
                {isIncognito ? (
                  <div
                    className="absolute bottom-2 left-2 right-2 z-[2]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      type="button"
                      onClick={() => setLocationEnabled((v) => !v)}
                      className="flex w-full items-center justify-between rounded-[24px] border border-[rgba(2,4,38,0.4)] bg-transparent py-1 pl-2 pr-1.5"
                      aria-pressed={locationEnabled}
                    >
                      <span
                        className="text-[11px] leading-[1.4] text-[#030426]"
                        style={{ fontFamily: FONT }}
                      >
                        Shared location
                      </span>
                      <span
                        className={`flex w-6 items-center rounded-[24px] p-0.5 transition ${
                          locationEnabled
                            ? "justify-end bg-[#0fc950]"
                            : "justify-start bg-[rgba(2,4,38,0.25)]"
                        }`}
                      >
                        <span className="size-2 rounded bg-[#fefefe]" />
                      </span>
                    </button>
                  </div>
                ) : (
                  <div className="absolute bottom-2 left-1 right-1 z-[2] flex items-center gap-1 rounded-[24px] bg-[rgba(253,252,251,0.35)] p-1 shadow-[0_4px_4px_rgba(0,0,0,0.05)] backdrop-blur-[10px]">
                    <span
                      className="flex flex-1 items-center justify-center px-2.5 py-1 text-[11px] leading-[1.4] text-[#010211]"
                      style={{ fontFamily: FONT }}
                    >
                      Target City
                    </span>
                    <span className="flex flex-1 items-center justify-center gap-1 rounded-[20px] bg-[#02031d] p-1">
                      <img
                        alt=""
                        src={mapPinPreciseIcon}
                        className="size-2.5 brightness-0 invert"
                        draggable={false}
                      />
                      <span
                        className="text-[11px] leading-[1.4] text-white"
                        style={{ fontFamily: FONT }}
                      >
                        Precise
                      </span>
                    </span>
                  </div>
                )}
              </button>

              {hasWork ? (
                <button
                  type="button"
                  onClick={onOpenWork}
                  className="crcle-glass-btn flex min-w-0 flex-col gap-2 rounded-[20px] p-2 text-left"
                >
                  <div className="flex w-full flex-col items-center gap-2 rounded-2xl bg-[#f7f6f2] p-2">
                    <div className="flex w-full items-center gap-1">
                      <img
                        alt=""
                        src={laptopWorkIcon}
                        className="size-4 object-contain"
                        draggable={false}
                      />
                      <span
                        className="text-[12px] leading-[18px] text-[#6b7280]"
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
                        className="text-[14px] leading-[21px] text-[#020426]"
                        style={{ fontFamily: FONT }}
                      >
                        {widgets.work?.role ?? "Add role"}
                      </p>
                      <p
                        className="text-[12px] font-light leading-[18px] text-[#6b7280]"
                        style={{ fontFamily: FONT }}
                      >
                        {widgets.work?.company ?? "Company"}
                      </p>
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-between rounded-[24px] border border-[rgba(247,246,242,0.1)] py-1 pl-2 pr-1.5">
                    <span
                      className="text-[11px] leading-[1.4] text-[#f7f6f2]"
                      style={{ fontFamily: FONT }}
                    >
                      Looking for work
                    </span>
                    <span
                      className={`flex w-6 items-center rounded-[24px] p-0.5 ${
                        lookingForWork
                          ? "justify-end bg-[#0fc950]/40"
                          : "justify-end bg-[rgba(247,246,242,0.4)]"
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
            <div className="grid grid-cols-2 items-start gap-4">
              {hasRelationship ? (
                <DatingWidget option={relationshipMeta} onOpen={onOpenRelationship} />
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
                  className="flex min-w-0 flex-col rounded-[20px] border border-[rgba(247,246,242,0.4)] bg-[rgba(247,246,242,0.4)] p-[9px] text-left shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
                >
                  <div className="flex w-full flex-col items-center gap-3 rounded-2xl bg-[#f7f6f2] p-2">
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
        className="mx-auto flex w-full flex-col gap-2 rounded-[24px] border border-[rgba(247,246,242,0.2)] bg-[rgba(247,246,242,0.05)] p-2 text-left"
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
        className="relative mx-auto flex w-full items-center justify-center rounded-[24px] border border-[#f7f6f2] p-3"
      >
        <span className="absolute left-[7px] top-1/2 flex -translate-y-1/2 items-center justify-center rounded-[36px] bg-[rgba(247,246,242,0.4)] px-3 py-1">
          <img alt="" src={locusPlusIcon} className="size-4 object-contain" draggable={false} />
        </span>
        <span className="w-full text-center text-[13px] leading-[1.4] text-[#f7f6f2]" style={{ fontFamily: FONT }}>
          Add widget
        </span>
      </button>
    </div>
  );
}

/* ——— Mood Switcher (Figma 853:225874 / 949:29968 — full-screen floating dock) ——— */

function MoodSwitcherModal({
  isIncognito,
  activeState,
  onToggleIncognito,
  onSelectMood,
  onClose,
}: {
  isIncognito: boolean;
  activeState: BroadcastState;
  onToggleIncognito: () => void;
  onSelectMood: (id: BroadcastState) => void;
  onClose: () => void;
}) {
  const [hoveredMood, setHoveredMood] = useState<BroadcastState | null>(null);
  const activeMood = MOODS.find((m) => m.id === activeState) ?? MOODS[0];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28, ease: EASE }}
      className="absolute inset-0 z-40 flex flex-col overflow-hidden rounded-[53px] bg-[rgba(2,3,29,0.6)] backdrop-blur-[8px]"
      role="dialog"
      aria-label="Mood Switch"
      style={{ clipPath: "inset(0 round 53px)" }}
      onClick={onClose}
    >
      <div
        className="relative flex min-h-0 flex-1 flex-col px-[26px] pb-8 pt-[38px]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-5 top-5 z-10 flex size-8 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition hover:bg-white/15"
        >
          <img alt="" src={locusCloseIcon} className="size-[14px] object-contain opacity-70" draggable={false} />
        </button>

        {/* Title + Incognito */}
        <div className="mt-6 flex flex-col items-center gap-[42px]">
          <div className="mt-4 flex flex-col items-center gap-2">
            <IconImg src={masksTheaterIcon} className="size-5" />
            <p
              className="text-center text-[19px] font-normal leading-[1.4] text-[#f7f6f2]"
              style={{ fontFamily: FONT }}
            >
              Mood Switch
            </p>
          </div>

          <button
            type="button"
            onClick={onToggleIncognito}
            className="flex items-center gap-2 rounded-[24px] bg-[rgba(255,255,255,0.2)] px-3 py-1.5 backdrop-blur-[6px] transition hover:bg-[rgba(255,255,255,0.26)]"
          >
            <IconImg src={profileMaskIcon} className="size-6" />
            <span className="text-[11px] leading-[1.4] text-[#f7f6f2]" style={{ fontFamily: FONT }}>
              Incognito Mode
            </span>
            <span
              className={`relative flex h-4 w-8 items-center rounded-full p-0.5 transition ${
                isIncognito ? "bg-[#0fc950]" : "bg-white/25"
              }`}
            >
              <motion.span
                layout
                transition={{ type: "spring", stiffness: 520, damping: 32 }}
                className={`size-3 rounded-full bg-[#fefefe] ${isIncognito ? "ml-auto" : ""}`}
              />
            </span>
          </button>
        </div>

        {/* Center hero — active mood */}
        <div
          className={`relative mt-8 flex min-h-0 flex-1 flex-col items-center justify-center transition ${
            isIncognito ? "pointer-events-none opacity-35" : "opacity-100"
          }`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMood.id}
              initial={{ opacity: 0, y: 94, scale: 0.92 }}
              animate={{ opacity: 1, y: 80, scale: 1 }}
              exit={{ opacity: 0, y: 70, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
              className="flex w-full max-w-[300px] flex-col items-center gap-4 text-center"
            >
              <IconImg src={activeMood.icon} className="size-6" />
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, ease: EASE, delay: 0.04 }}
                className="text-[16px] font-normal leading-[1.4] text-[rgba(247,246,242,0.6)]"
                style={{ fontFamily: FONT }}
              >
                {activeMood.description}
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right floating mood dock — Figma 949:29977 */}
        <div
          className={`pointer-events-none absolute right-3 top-[282px] z-[2] flex items-center gap-[11px] transition ${
            isIncognito ? "opacity-30" : "opacity-100"
          }`}
        >
          <div
            className="flex h-[170px] flex-col justify-between text-right text-[13px] font-medium leading-[1.4] text-white"
            style={{ fontFamily: FONT }}
          >
            {MOODS.map((m) => {
              const show = activeState === m.id || hoveredMood === m.id;
              return (
                <span
                  key={m.id}
                  className={`transition-opacity duration-200 ${show ? "opacity-100" : "opacity-0"}`}
                  aria-hidden={!show}
                >
                  {m.label}
                </span>
              );
            })}
          </div>

          <div className="pointer-events-auto flex flex-col gap-[11px] rounded-[36px] bg-[rgba(255,255,255,0.1)] p-2 backdrop-blur-[12px]">
            {MOODS.map((m) => {
              const active = activeState === m.id;
              const rimId = `mood-dock-rim-${m.id}`;
              return (
                <motion.button
                  key={m.id}
                  type="button"
                  aria-label={m.label}
                  aria-pressed={active}
                  disabled={isIncognito}
                  onClick={() => onSelectMood(m.id)}
                  onMouseEnter={() => setHoveredMood(m.id)}
                  onMouseLeave={() => setHoveredMood(null)}
                  whileTap={{ scale: 0.88 }}
                  transition={{ type: "spring", stiffness: 500, damping: 28 }}
                  className={`crcle-intent-chip relative flex size-11 items-center justify-center rounded-[24px] p-1 opacity-40 disabled:cursor-not-allowed ${
                    active ? "is-lit" : ""
                  }`}
                >
                  {/* Glass crescent rim — same as Signal intent chips */}
                  <svg
                    aria-hidden
                    viewBox="0 0 44 44"
                    className="pointer-events-none absolute inset-0 z-0 size-full"
                  >
                    <defs>
                      <linearGradient
                        id={rimId}
                        x1="5"
                        y1="2"
                        x2="39"
                        y2="42"
                        gradientUnits="userSpaceOnUse"
                      >
                        {active ? (
                          <>
                            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                            <stop offset="70%" stopColor="#ffffff" stopOpacity="0.12" />
                            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.06" />
                          </>
                        ) : (
                          <>
                            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                            <stop offset="28%" stopColor="#ffffff" stopOpacity="0.4" />
                            <stop offset="55%" stopColor="#ffffff" stopOpacity="0.1" />
                            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.18" />
                          </>
                        )}
                      </linearGradient>
                    </defs>
                    <circle
                      cx="22"
                      cy="22"
                      r="20.75"
                      fill="none"
                      stroke={`url(#${rimId})`}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>

                  {active ? (
                    <motion.span
                      layoutId="mood-dock-active"
                      className="absolute inset-[3px] z-[1] rounded-[20px] bg-[#f7f6f2]"
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    />
                  ) : null}
                  <span
                    className={`crcle-intent-chip__icon relative z-[2] ${
                      active ? "opacity-100" : "opacity-90"
                    }`}
                  >
                    <img
                      alt=""
                      src={m.icon}
                      className={`size-6 max-w-none object-contain ${active ? "brightness-0" : ""}`}
                      draggable={false}
                    />
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Brand footer */}
        <div className="mt-auto flex flex-col items-center gap-[5px] pt-6">
          <IconImg src={crcleLogo} className="h-[17px] w-[49px]" />
          <p
            className="text-center text-[12px] leading-[1.1] tracking-[-0.2px] text-[rgba(247,246,242,0.4)]"
            style={{ fontFamily: FONT }}
          >
            Verified Social
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ——— Edit form sheets ——— */

function DatingWidget({
  option,
  onOpen,
}: {
  option: (typeof RELATIONSHIP_OPTIONS)[number];
  onOpen: () => void;
}) {
  const isLinkCta = option.ctaIcon === "link";

  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex w-full min-w-0 flex-col gap-2 rounded-[20px] p-2 text-left"
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
        className={`flex w-fit items-center gap-2.5 rounded-[24px] bg-[#030426] ${
          isLinkCta ? "py-1 pl-2 pr-1" : "py-0.5 pl-2 pr-2.5"
        }`}
      >
        <span className="text-[13px] leading-[1.4] text-[#fefefe]" style={{ fontFamily: FONT }}>
          {option.ctaLabel}
        </span>
        {isLinkCta ? (
          <span className="flex items-center rounded-[60px] bg-[rgba(247,246,242,0.4)] p-0.5">
            <img alt="" src={datingLinkIcon} className="size-3 object-contain" draggable={false} />
          </span>
        ) : (
          <img alt="" src={datingSendIcon} className="size-3 object-contain" draggable={false} />
        )}
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
      className={`relative flex h-full min-h-0 w-full min-w-0 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[rgba(177,177,188,0.2)] bg-transparent text-left transition hover:bg-white/[0.02] ${
        padY === "comfortable" ? "px-3 py-4" : "p-3"
      }`}
    >
      <div className="flex h-full w-full max-w-[154px] flex-col items-start justify-between">
        <div className="flex w-full items-start justify-between">
          <span className="relative size-9 shrink-0 overflow-hidden">
            <img
              alt=""
              src={icon}
              className="absolute inset-0 size-full max-w-none object-contain"
              draggable={false}
            />
          </span>
          <span className="relative size-6 shrink-0">
            <img
              alt=""
              src={emptyPlusIcon}
              className="absolute inset-0 size-full max-w-none object-contain brightness-0 invert"
              draggable={false}
            />
          </span>
        </div>

        <div className="flex w-full flex-col items-start gap-2 leading-[1.4]">
          <div className="flex w-full flex-col items-start text-[#f7f6f2]">
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
            className="w-full text-[11px] font-normal leading-[1.4] text-[rgba(247,246,242,0.5)]"
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
    <div className="relative z-30 mx-auto flex h-[62px] w-[84%] shrink-0 items-end justify-between px-2 pb-[10px] text-[#f7f6f2]">
      <span
        className="text-[17px] font-semibold leading-[22px]"
        style={{ fontFamily: "SF Pro, system-ui, -apple-system, sans-serif" }}
      >
        9:41
      </span>
      <div className="flex items-center gap-[7px] pb-0.5">
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
