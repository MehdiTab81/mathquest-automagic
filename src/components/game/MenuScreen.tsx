import React, { useState } from "react";
import { getCategories } from "@/lib/questions";
import type { Grade } from "@/lib/questions";

const THEME_GROUPS_3EME: { theme: string; emoji: string; prefixes: string[] }[] = [
  { theme: "Nombres & Calculs", emoji: "🔢", prefixes: ["Relatifs", "Fraction", "Quotients", "Add/sub frac", "Multiplier rat", "Diviser rat", "Écritures", "Puissances", "Notation sci", "Carrés", "Racines", "Encadrer", "Double,", "Tables", "Priorités", "PGCD"] },
  { theme: "Algèbre & Équations", emoji: "✏️", prefixes: ["Distributivité", "Double dist", "Identité", "Différence", "Programme de calcul", "Substitution", "Équation"] },
  { theme: "Fonctions", emoji: "📈", prefixes: ["Fonction"] },
  { theme: "Proportionnalité & %", emoji: "⚖️", prefixes: ["Pourcentage", "Augmentation", "Proportionnalité", "Partage", "Vitesse", "Probabilité", "Événement"] },
  { theme: "Géométrie & Mesures", emoji: "📐", prefixes: ["Pythagore", "Somme angles", "Angles comp", "Périmètres", "Aires", "Volumes", "Conversions"] },
  { theme: "Statistiques", emoji: "📊", prefixes: ["Moyenne", "Médiane", "Étendue"] },
  { theme: "Brevet", emoji: "🎓", prefixes: ["Brevet"] },
];

const THEME_GROUPS_4EME: { theme: string; emoji: string; prefixes: string[] }[] = [
  { theme: "Nombres & Calculs", emoji: "🔢", prefixes: ["Relatifs", "Fraction", "Quotients", "Add/sub frac", "Multiplier rat", "Diviser rat", "Écritures", "Puissances", "Carrés", "Double,", "Tables", "Priorités"] },
  { theme: "Algèbre & Équations", emoji: "✏️", prefixes: ["Distributivité", "Programme de calcul", "Substitution", "Équation"] },
  { theme: "Proportionnalité & %", emoji: "⚖️", prefixes: ["Pourcentage", "Augmentation", "Proportionnalité", "Partage", "Vitesse"] },
  { theme: "Géométrie & Mesures", emoji: "📐", prefixes: ["Pythagore", "Somme angles", "Angles comp", "Périmètres", "Aires", "Volumes", "Conversions"] },
  { theme: "Statistiques", emoji: "📊", prefixes: ["Moyenne", "Médiane", "Étendue"] },
];

function getThemeForCategory(cat: string, grade: Grade): string {
  const groups = grade === "3eme" ? THEME_GROUPS_3EME : THEME_GROUPS_4EME;
  for (const g of groups) {
    if (g.prefixes.some(p => cat.startsWith(p))) return g.theme;
  }
  return "Autres";
}

interface MenuScreenProps {
  grade: Grade;
  onGradeChange: (grade: Grade) => void;
  onStartTraining: (category: string | null) => void;
  onStartExam: () => void;
  onStartDuel: () => void;
  onStartBattle: () => void;
}

const MenuScreen: React.FC<MenuScreenProps> = ({ grade, onGradeChange, onStartTraining, onStartExam, onStartDuel, onStartBattle }) => {
  const [showCategories, setShowCategories] = useState(false);
  const categories = getCategories(grade);
  const themeGroups = grade === "3eme" ? THEME_GROUPS_3EME : THEME_GROUPS_4EME;

  const grouped = new Map<string, { name: string; count: number }[]>();
  categories.forEach(c => {
    const theme = getThemeForCategory(c.name, grade);
    if (!grouped.has(theme)) grouped.set(theme, []);
    grouped.get(theme)!.push(c);
  });

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

      {/* 3 Modes */}
      <div className="space-y-3">
        <button
          onClick={() => setShowCategories(!showCategories)}
          className="w-full bg-card border-2 border-primary/30 rounded-xl p-5 text-left
            transition-all duration-200 hover:border-primary/60 active:scale-[0.97] group"
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl">📚</span>
            <div className="flex-1">
              <div className="font-black text-base tracking-wide">ENTRAÎNEMENT LIBRE</div>
              <div className="text-xs text-muted-foreground">Choisis une notion et progresse à ton rythme</div>
            </div>
            <span className="text-muted-foreground text-lg">{showCategories ? "▲" : "▼"}</span>
          </div>
        </button>

        <button
          onClick={onStartExam}
          className="w-full bg-card border-2 border-game-coral/30 rounded-xl p-5 text-left
            transition-all duration-200 hover:border-game-coral/60 active:scale-[0.97]"
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
          onClick={onStartDuel}
          className="w-full bg-card border-2 border-game-teal/30 rounded-xl p-5 text-left
            transition-all duration-200 hover:border-game-teal/60 active:scale-[0.97]"
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
          onClick={onStartBattle}
          className="w-full bg-card border-2 border-game-purple/30 rounded-xl p-5 text-left
            transition-all duration-200 hover:border-game-purple/60 active:scale-[0.97]"
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl">🏟️</span>
            <div>
              <div className="font-black text-base tracking-wide">BATTLE 4 JOUEURS</div>
              <div className="text-xs text-muted-foreground">2-4 joueurs · Premier à 5 points gagne</div>
            </div>
          </div>
        </button>
      </div>

      {/* Categories (expandable) */}
      {showCategories && (
        <div className="animate-fade-in space-y-4 pt-2">
          <button
            onClick={() => onStartTraining(null)}
            className="w-full bg-primary/10 border border-primary/20 rounded-lg p-4 text-left
              transition-all duration-200 hover:border-primary/50 active:scale-[0.97]"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">🎲</span>
              <div>
                <div className="font-bold text-sm">Toutes les notions</div>
                <div className="text-xs text-muted-foreground">{categories.reduce((s, c) => s + c.count, 0)} questions mélangées</div>
              </div>
            </div>
          </button>

          {themeGroups.map(group => {
            const cats = grouped.get(group.theme);
            if (!cats || cats.length === 0) return null;
            return (
              <div key={group.theme}>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-2 flex items-center gap-2">
                  <span>{group.emoji}</span> {group.theme}
                </p>
                <div className="space-y-1.5">
                  {cats.map(c => (
                    <button
                      key={c.name}
                      onClick={() => onStartTraining(c.name)}
                      className="w-full bg-card border border-foreground/5 rounded-lg px-4 py-3 text-left
                        transition-all duration-200 hover:border-primary/30 active:scale-[0.97]"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold">{c.name}</span>
                        <span className="font-mono text-xs text-muted-foreground">{c.count}q</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MenuScreen;
