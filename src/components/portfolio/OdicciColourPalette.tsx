import { useState } from "react";
import { OdicciBrowserFrame } from "@/components/portfolio/OdicciBrowserFrame";
import { OdicciBusinessProfile } from "@/components/portfolio/OdicciBusinessProfile";
import { OdicciBrandVibe } from "@/components/portfolio/OdicciBrandVibe";
import { OdicciBrandPalette } from "@/components/portfolio/OdicciBrandPalette";
import { OdicciBrandFonts } from "@/components/portfolio/OdicciBrandFonts";

/**
 * OdicciColourPalette — Brand Personality tab orchestrator.
 * business (713:199885) → vibe (727:200380) → colour (733:200840) → fonts (735:201375).
 */

export function OdicciColourPalette({ onBackToWorkspace }: { onBackToWorkspace?: () => void }) {
  const [stage, setStage] = useState<"business" | "vibe" | "palette" | "fonts">("business");
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const isDark = theme === "dark";
  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  const stepLabel =
    stage === "business"
      ? "3/7"
      : stage === "vibe"
        ? "4/7"
        : stage === "palette"
          ? "5/7"
          : "6/7";

  return (
    <OdicciBrowserFrame
      tabLabel="odicci | Brand Personality"
      stepLabel={stepLabel}
      url="odicci.com/onboarding/brand"
      theme={theme}
      onToggleTheme={toggleTheme}
      canvasClassName="bg-[#ffe4e4]"
    >
      {stage === "business" ? (
        <OdicciBusinessProfile
          isDark={isDark}
          onContinue={() => setStage("vibe")}
          onBack={onBackToWorkspace}
        />
      ) : stage === "vibe" ? (
        <OdicciBrandVibe
          isDark={isDark}
          onContinue={() => setStage("palette")}
          onBack={() => setStage("business")}
        />
      ) : stage === "palette" ? (
        <OdicciBrandPalette
          isDark={isDark}
          onContinue={() => setStage("fonts")}
          onBack={() => setStage("vibe")}
        />
      ) : (
        <OdicciBrandFonts
          isDark={isDark}
          onBack={() => setStage("palette")}
        />
      )}
    </OdicciBrowserFrame>
  );
}
