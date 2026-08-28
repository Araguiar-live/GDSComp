import pinkDot from "@/assets/portfolio/app-icon/pink-dot.svg";
import tealDot from "@/assets/portfolio/app-icon/teal-dot.svg";
import slateDot from "@/assets/portfolio/app-icon/slate-dot.svg";
import orangeDot from "@/assets/portfolio/app-icon/red-dot.svg";
import purpleDot from "@/assets/portfolio/app-icon/amber-dot.svg";

import artaekaHero from "@/assets/portfolio/graduate/artaeka-hero.png";
import artaekaPhone from "@/assets/portfolio/graduate/artaeka-phone.png";
import artaekaHandset from "@/assets/portfolio/graduate/artaeka-handset.png";
import poqyDevice from "@/assets/portfolio/graduate/poqy-device.png";
import strollaHero from "@/assets/portfolio/graduate/strolla-hero.png";
import strollaUi from "@/assets/portfolio/graduate/strolla-ui.png";
import roamerNfc from "@/assets/portfolio/graduate/roamer-nfc.png";
import beeseSynth from "@/assets/portfolio/graduate/beese-synth.png";

export type GraduateProjectId =
  | "artaeka"
  | "poqy"
  | "strolla"
  | "roamer"
  | "beese";

export interface GraduateProject {
  id: GraduateProjectId;
  title: string;
  tag: string;
  description: string;
  colorLabel: string;
  glow: string;
  dot: string;
  hero: string;
  gallery: string[];
}

/** Color-dot order matches the Figma app-icon grid (pink → green → blue → orange → purple). */
export const GRADUATE_PROJECTS: GraduateProject[] = [
  {
    id: "artaeka",
    title: "Artaeka",
    tag: "Spatial Discovery Platform",
    description:
      "A spatial discovery platform that redefines how users navigate physical art galleries. By mapping digital intent to physical layouts, it guides visitors through curated journeys rather than aimless wandering, bridging the gap between online exploration and in-person curation.",
    colorLabel: "Pink",
    glow: "rgba(229, 117, 117, 0.55)",
    dot: pinkDot,
    hero: artaekaHero,
    gallery: [artaekaPhone, artaekaHandset],
  },
  {
    id: "poqy",
    title: "Poqy",
    tag: "Experimental Control Panel",
    description:
      "An experimental tactile control panel designed to challenge screen-first interactions. Poqy translates physical inputs—dials, switches, and sliders—into digital commands, focusing on muscle memory, haptic feedback, and the cognitive benefits of non-screen system logic.",
    colorLabel: "Green",
    glow: "rgba(1, 208, 129, 0.5)",
    dot: tealDot,
    hero: poqyDevice,
    gallery: [],
  },
  {
    id: "strolla",
    title: "Strolla",
    tag: "NFC Bluetooth Cassette Player",
    description:
      "A modern reimagining of the classic cassette player. Strolla blends the nostalgic, deliberate act of physical media playback with conveniences like NFC pairing and Bluetooth audio, bringing tangible, satisfying interactions back to frictionless digital listening.",
    colorLabel: "Blue",
    glow: "rgba(93, 129, 151, 0.55)",
    dot: slateDot,
    hero: strollaHero,
    gallery: [strollaUi],
  },
  {
    id: "roamer",
    title: "Roamer",
    tag: "TFL Busking Ecosystem",
    description:
      "A dedicated management and payments ecosystem for Transport for London (TFL) buskers. Roamer eliminates the friction of managing pitch schedules and modernizes street performance by seamlessly connecting spot booking with a physical-to-digital tipping interface for a cashless city.",
    colorLabel: "Orange",
    glow: "rgba(255, 98, 56, 0.55)",
    dot: orangeDot,
    hero: roamerNfc,
    gallery: [],
  },
  {
    id: "beese",
    title: "Beese",
    tag: "Tactile Synth & Companion App",
    description:
      "A hybrid hardware synthesizer and companion mobile app. Designed to capture the nuanced human expression often lost on glass screens, Beese pairs a portable physical instrument with a deep digital modulation app for total creative control.",
    colorLabel: "Purple",
    glow: "rgba(112, 112, 223, 0.55)",
    dot: purpleDot,
    hero: beeseSynth,
    gallery: [],
  },
];
