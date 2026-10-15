import React, { useMemo } from "react";
import type { Grade } from "@/lib/questions";
import { LEVEL_STYLE } from "@/lib/levels";

/** Décor animé discret propre à chaque niveau (feuilles, bulles, étoiles, braises). */
const LevelBackdrop: React.FC<{ grade: Grade; density?: number }> = ({ grade, density = 14 }) => {
  const items = useMemo(() => {
    const symbols = LEVEL_STYLE[grade].particles;
    // Pseudo-aléatoire déterministe : le décor ne « saute » pas à chaque rendu
    let seed = grade.charCodeAt(0) * 97;
    const rnd = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    return Array.from({ length: density }, (_, i) => ({
      id: i,
      symbol: symbols[i % symbols.length],
      left: rnd() * 100,
      size: 10 + rnd() * 18,
      duration: 16 + rnd() * 18,
      delay: -rnd() * 30,
      drift: (rnd() - 0.5) * 120,
      opacity: 0.12 + rnd() * 0.25,
    }));
  }, [grade, density]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {items.map(p => (
        <span
          key={`${grade}-${p.id}`}
          className="absolute bottom-[-40px] select-none"
          style={{
            left: `${p.left}%`,
            fontSize: p.size,
            color: "hsl(var(--primary))",
            animation: `drift ${p.duration}s linear ${p.delay}s infinite`,
            ["--drift-x" as string]: `${p.drift}px`,
            ["--particle-opacity" as string]: p.opacity,
          } as React.CSSProperties}
        >
          {p.symbol}
        </span>
      ))}
    </div>
  );
};

export default LevelBackdrop;
