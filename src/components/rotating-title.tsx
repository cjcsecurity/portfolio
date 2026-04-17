"use client";

import { useEffect, useState } from "react";

interface RotatingTitleProps {
  titles: readonly string[];
  className?: string;
  style?: React.CSSProperties;
  holdMs?: number;
  typeMs?: number;
  eraseMs?: number;
}

type Phase = "typing" | "hold" | "erasing";

export function RotatingTitle({
  titles,
  className,
  style,
  holdMs = 2200,
  typeMs = 55,
  eraseMs = 32,
}: RotatingTitleProps) {
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState(titles[0]);
  const [phase, setPhase] = useState<Phase>("hold");

  useEffect(() => {
    if (titles.length <= 1) return;
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
  }, [phase, display, index, titles, holdMs, typeMs, eraseMs]);

  return (
    <p className={className} style={style}>
      {display}
      <span className="animate-blink">|</span>
    </p>
  );
}
