import React, { useState } from "react";
import { THEMES, MELANGE_THEME, getThemeQuestionCount } from "@/lib/questions";
import type { Grade, ThemeId, ThemeConfig } from "@/lib/questions";

interface MenuScreenProps {
  grade: Grade;
  onGradeChange: (grade: Grade) => void;
  onStartTraining: (themeId: ThemeId) => void;
  onStartExam: (themeId: ThemeId) => void;
  onStartDuel: (themeId: ThemeId) => void;
  onStartBattle: (themeId: ThemeId) => void;
}

const MenuScreen: React.FC<MenuScreenProps> = ({ grade, onGradeChange, onStartTraining, onStartExam, onStartDuel, onStartBattle }) => {
  const [selectedTheme, setSelectedTheme] = useState<ThemeConfig | null>(null);

  const allThemes = [...THEMES, MELANGE_THEME];

  // Filter out themes with 0 questions for current grade
  const availableThemes = allThemes.filter(t => getThemeQuestionCount(t.id, grade) > 0);

  if (selectedTheme) {
    const count = getThemeQuestionCount(selectedTheme.id, grade);
    return (
      <div className="animate-fade-in space-y-4">
        {/* Back + Theme header */}
        <button
          onClick={() => setSelectedTheme(null)}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
        >
          ← Retour aux thèmes
        </button>

        <div className={`bg-card rounded-xl p-5 border-2 ${selectedTheme.borderClass}/30 text-center`}>
          <span className="text-4xl">{selectedTheme.emoji}</span>
          <h2 className={`text-xl font-black mt-2 ${selectedTheme.colorClass}`}>{selectedTheme.name}</h2>
          <p className="text-xs text-muted-foreground mt-1 font-bold">{count} questions disponibles</p>
        </div>

        {/* 4 modes */}
        <div className="space-y-3">
          <button
            onClick={() => onStartTraining(selectedTheme.id)}
            className={`w-full bg-card border-2 ${selectedTheme.borderClass}/30 rounded-xl p-5 text-left
              transition-all duration-200 hover:border-opacity-60 active:scale-[0.97] group`}
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">📚</span>
              <div>
                <div className="font-black text-base tracking-wide">ENTRAÎNEMENT LIBRE</div>
                <div className="text-xs text-muted-foreground">Progresse à ton rythme</div>
              </div>
            </div>
          </button>

          <button
            onClick={() => onStartExam(selectedTheme.id)}
            className={`w-full bg-card border-2 ${selectedTheme.borderClass}/30 rounded-xl p-5 text-left
              transition-all duration-200 hover:border-opacity-60 active:scale-[0.97]`}
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">⏱️</span>
              <div>
                <div className="font-black text-base tracking-wide">EXAMEN 9 MIN</div>
                <div className="text-xs text-muted-foreground">20 questions en temps limité</div>
              </div>
            </div>
          </button>

          <button
            onClick={() => onStartDuel(selectedTheme.id)}
            className={`w-full bg-card border-2 ${selectedTheme.borderClass}/30 rounded-xl p-5 text-left
              transition-all duration-200 hover:border-opacity-60 active:scale-[0.97]`}
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">⚔️</span>
              <div>
                <div className="font-black text-base tracking-wide">DUEL 2 JOUEURS</div>
                <div className="text-xs text-muted-foreground">Affronte un ami sur le même écran</div>
              </div>
            </div>
          </button>

          <button
            onClick={() => onStartBattle(selectedTheme.id)}
            className={`w-full bg-card border-2 ${selectedTheme.borderClass}/30 rounded-xl p-5 text-left
              transition-all duration-200 hover:border-opacity-60 active:scale-[0.97]`}
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">🏟️</span>
              <div>
                <div className="font-black text-base tracking-wide">BATTLE 4 JOUEURS</div>
                <div className="text-xs text-muted-foreground">2-4 joueurs · Premier à 5 points</div>
              </div>
            </div>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-4">
      {/* Grade Selector */}
      <div className="flex gap-2 p-1 bg-card rounded-xl border border-foreground/5">
        {(["4eme", "3eme"] as Grade[]).map(g => (
          <button
            key={g}
            onClick={() => onGradeChange(g)}
            className={`flex-1 py-3 rounded-lg font-black text-sm tracking-wide transition-all duration-200
              ${grade === g
                ? "bg-primary text-primary-foreground shadow-md"
                : "text-muted-foreground hover:text-foreground"
              }`}
          >
            {g === "4eme" ? "4ème" : "3ème"}
          </button>
        ))}
      </div>

      {/* Theme title */}
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground text-center">
        Choisis un thème
      </p>

      {/* Theme grid */}
      <div className="grid grid-cols-2 gap-3">
        {availableThemes.map(theme => {
          const count = getThemeQuestionCount(theme.id, grade);
          return (
            <button
              key={theme.id}
              onClick={() => setSelectedTheme(theme)}
              className={`bg-card border-2 ${theme.borderClass}/20 rounded-xl p-4 text-center
                transition-all duration-200 hover:border-opacity-50 active:scale-[0.95]
                hover:shadow-lg`}
            >
              <span className="text-3xl block mb-2">{theme.emoji}</span>
              <p className={`font-black text-sm leading-tight ${theme.colorClass}`}>{theme.name}</p>
              <p className="text-[10px] text-muted-foreground mt-1 font-mono">{count}q</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MenuScreen;
