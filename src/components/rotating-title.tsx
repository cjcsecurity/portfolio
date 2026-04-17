"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface RotatingTitleProps {
  titles: readonly string[];
  className?: string;
  style?: React.CSSProperties;
  holdMs?: number;
  typeMs?: number;
  eraseMs?: number;
}

type Phase = "typing" | "hold" | "erasing";

// ?focus= pins the hero title to a specific role and disables rotation,
// so CJ can deep-link to the portfolio from a specific resume variant
// without the rotating cycle diluting the signal.
const FOCUS_INDEX: Record<string, number> = {
  cybersec: 0,
  prodsec: 1,
  "ai-swe": 2,
  ai: 2,
};

export function RotatingTitle({
  titles,
  className,
  style,
  holdMs = 2200,
  typeMs = 55,
  eraseMs = 32,
}: RotatingTitleProps) {
  const searchParams = useSearchParams();
  const focus = searchParams?.get("focus");
  const pinnedIndex = focus != null ? FOCUS_INDEX[focus] : undefined;
  const shouldCycle = pinnedIndex === undefined && titles.length > 1;
  const startIndex = pinnedIndex ?? 0;

  const [index, setIndex] = useState(startIndex);
  const [display, setDisplay] = useState(titles[startIndex]);
  const [phase, setPhase] = useState<Phase>("hold");

  useEffect(() => {
    if (!shouldCycle) return;
    let timer: number | undefined;

    if (phase === "hold") {
      timer = window.setTimeout(() => setPhase("erasing"), holdMs);
    } else if (phase === "erasing") {
      if (display.length > 0) {
        timer = window.setTimeout(
          () => setDisplay(display.slice(0, -1)),
          eraseMs,
        );
      } else {
        const next = (index + 1) % titles.length;
        setIndex(next);
        setPhase("typing");
      }
    } else {
      const full = titles[index];
      if (display.length < full.length) {
        timer = window.setTimeout(
          () => setDisplay(full.slice(0, display.length + 1)),
          typeMs,
        );
      } else {
        setPhase("hold");
      }
    }

    return () => {
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, [phase, display, index, titles, holdMs, typeMs, eraseMs, shouldCycle]);

  return (
    <p className={className} style={style}>
      {display}
      {shouldCycle && <span className="animate-blink">|</span>}
    </p>
  );
}
