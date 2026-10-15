import React from "react";
import { useMuted } from "@/hooks/useSound";

interface HUDProps {
  level: number;
  xp: number;
  xpNeeded: number;
  medals: number;
  bestStreak: number;
}

/** Bandeau de progression du niveau scolaire en cours (XP, badges, record, son). */
const HUD: React.FC<HUDProps> = ({ level, xp, xpNeeded, medals, bestStreak }) => {
  const [muted, setMuted] = useMuted();
  const pct = Math.min(100, Math.round((xp / xpNeeded) * 100));
  return (
    <div className="glass flex items-center gap-3 rounded-2xl p-3 mb-4 border border-foreground/10 animate-fade-in">
      <div
        className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary text-primary-foreground flex flex-col items-center justify-center shadow-glow"
        aria-label={`Niveau ${level}`}
      >
        <span className="text-[9px] font-black uppercase leading-none">Niv.</span>
        <span className="font-display text-xl font-bold leading-none">{level}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between text-[11px] font-bold text-muted-foreground mb-1">
          <span>{xp} / {xpNeeded} XP</span>
          <span className="flex gap-3">
            <span title="Badges obtenus">🏅 {medals}</span>
            <span title="Meilleure série">🔥 {bestStreak}</span>
          </span>
        </div>
        <div className="bg-foreground/[0.08] rounded-full h-2.5 overflow-hidden" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${pct}%`, background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--secondary)))" }}
          />
        </div>
      </div>
      <button
        onClick={() => setMuted(!muted)}
        className="flex-shrink-0 w-10 h-10 rounded-xl bg-foreground/[0.06] text-lg active:scale-90 transition-transform"
        aria-label={muted ? "Activer le son" : "Couper le son"}
        title={muted ? "Activer le son" : "Couper le son"}
      >
        {muted ? "🔇" : "🔊"}
      </button>
    </div>
  );
};

export default HUD;
