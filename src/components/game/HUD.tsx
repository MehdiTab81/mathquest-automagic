import React from "react";

interface HUDProps {
  level: number;
  xpPercent: number;
  timer?: string;
}

const HUD: React.FC<HUDProps> = ({ level, xpPercent, timer }) => (
  <div className="flex items-center gap-3 bg-card rounded-lg p-3 mb-4 border border-foreground/5 animate-fade-in">
    <span className="font-mono font-bold text-sm text-game-gold">Niv.{level}</span>
    <div className="flex-1 bg-foreground/[0.07] rounded-full h-2.5 overflow-hidden">
      <div
        className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
        style={{ width: `${xpPercent}%` }}
      />
    </div>
    {timer && <span className="font-mono font-bold text-sm text-game-coral">{timer}</span>}
  </div>
);

export default HUD;
