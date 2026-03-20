import React from "react";

type Mode = "free" | "exam" | "duel";

interface MenuScreenProps {
  onSelectMode: (mode: Mode) => void;
}

const modes: { mode: Mode; emoji: string; label: string; desc: string }[] = [
  { mode: "free", emoji: "🏋️", label: "ENTRAÎNEMENT LIBRE", desc: "Sans limite de temps" },
  { mode: "exam", emoji: "⏱️", label: "MODE EXAMEN", desc: "9 minutes chrono" },
  { mode: "duel", emoji: "⚔️", label: "MODE DUEL", desc: "2 joueurs, face à face" },
];

const MenuScreen: React.FC<MenuScreenProps> = ({ onSelectMode }) => (
  <div className="animate-fade-in space-y-3">
    {modes.map((m, i) => (
      <button
        key={m.mode}
        onClick={() => onSelectMode(m.mode)}
        className="w-full bg-card border border-foreground/5 rounded-lg p-5 text-left
          transition-all duration-200 hover:border-primary/30 hover:shadow-[0_0_20px_hsl(var(--game-gold)/0.08)]
          active:scale-[0.97] group"
        style={{ animationDelay: `${i * 80}ms` }}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{m.emoji}</span>
          <div>
            <div className="font-black text-base tracking-wide">{m.label}</div>
            <div className="text-sm text-muted-foreground">{m.desc}</div>
          </div>
        </div>
      </button>
    ))}
  </div>
);

export default MenuScreen;
