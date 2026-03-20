import React, { useState } from "react";
import type { Grade } from "@/lib/questions";

type Mode = "free" | "exam" | "duel";

interface MenuScreenProps {
  onSelectMode: (mode: Mode, grade: Grade) => void;
}

const grades: { value: Grade; label: string; desc: string }[] = [
  { value: "6eme", label: "6ème", desc: "CM1 / CM2" },
  { value: "5eme", label: "5ème", desc: "6ème et avant" },
  { value: "4eme", label: "4ème", desc: "5ème et avant" },
  { value: "3eme", label: "3ème", desc: "4ème et avant" },
];

const modes: { mode: Mode; emoji: string; label: string; desc: string }[] = [
  { mode: "free", emoji: "🏋️", label: "ENTRAÎNEMENT LIBRE", desc: "Sans limite de temps" },
  { mode: "exam", emoji: "⏱️", label: "MODE EXAMEN", desc: "9 minutes chrono" },
  { mode: "duel", emoji: "⚔️", label: "MODE DUEL", desc: "2 joueurs, face à face" },
];

const MenuScreen: React.FC<MenuScreenProps> = ({ onSelectMode }) => {
  const [selectedGrade, setSelectedGrade] = useState<Grade | null>(null);

  if (!selectedGrade) {
    return (
      <div className="animate-fade-in space-y-3">
        <p className="text-center text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">
          Choisis ton niveau
        </p>
        {grades.map((g, i) => (
          <button
            key={g.value}
            onClick={() => setSelectedGrade(g.value)}
            className="w-full bg-card border border-foreground/5 rounded-lg p-5 text-left
              transition-all duration-200 hover:border-primary/30 hover:shadow-[0_0_20px_hsl(var(--game-gold)/0.08)]
              active:scale-[0.97] group"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-black text-lg tracking-wide">{g.label}</div>
                <div className="text-sm text-muted-foreground">Notions : {g.desc}</div>
              </div>
              <span className="text-muted-foreground text-xl group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-3">
      <button
        onClick={() => setSelectedGrade(null)}
        className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-2 flex items-center gap-1"
      >
        ← {grades.find(g => g.value === selectedGrade)?.label}
      </button>

      {modes.map((m, i) => (
        <button
          key={m.mode}
          onClick={() => onSelectMode(m.mode, selectedGrade)}
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
};

export default MenuScreen;
