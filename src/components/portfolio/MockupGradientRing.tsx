import type { CSSProperties, ReactNode } from "react";

/** 1px animated white conic-gradient outline (see `.mockup-ring` in styles.css). */
export function MockupGradientRing({
  className = "",
  ringDelay = "0s",
  children,
}: {
  className?: string;
  ringDelay?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`mockup-ring relative ${className}`}
      style={{ "--ring-delay": ringDelay } as CSSProperties}
    >
      {children}
    </div>
  );
}
