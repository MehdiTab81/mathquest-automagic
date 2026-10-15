import React, { useState } from "react";
import { getThemesForGrade, getThemeQuestionCount, getChaptersForGrade, GRADES, GRADE_LABELS, MELANGE_THEME } from "@/lib/questions";
import type { Grade, ThemeId, ThemeConfig } from "@/lib/questions";
import { LEVEL_STYLE, GRADE_HUE, MEDAL_LABEL, chapterMastery, themeColor } from "@/lib/levels";
import type { CategoryStats } from "@/hooks/useProgress";
import ConfirmDialog from "./ConfirmDialog";
import { play } from "@/lib/sound";

export type GameMode = "training" | "exam" | "duel" | "battle" | "projection";

interface MenuScreenProps {
  grade: Grade;
  onGradeChange: (grade: Grade) => void;
  onStart: (mode: GameMode, themeId: ThemeId) => void;
  mistakeCount: number;
  onStartMistakes: () => void;
  categoryStats: CategoryStats;
  onResetGrade: () => void;
}

const MODES: { mode: GameMode; icon: string; title: string; desc: string }[] = [
  { mode: "training", icon: "📚", title: "Entraînement", desc: "20 questions, correction et méthode après chaque erreur" },
  { mode: "exam", icon: "⏱️", title: "Examen 9 minutes", desc: "20 questions chronométrées, correction à la fin" },
  { mode: "duel", icon: "⚔️", title: "Duel 2 joueurs", desc: "Face à face sur le même écran, le plus rapide gagne" },
  { mode: "battle", icon: "🏟️", title: "Battle 2 à 4 joueurs", desc: "Buzzer, chrono de 10 s, premier à 5 points" },
  { mode: "projection", icon: "📽️", title: "Projection classe", desc: "Grand affichage au vidéoprojecteur, réponse à révéler" },
];

const MenuScreen: React.FC<MenuScreenProps> = ({
  grade, onGradeChange, onStart, mistakeCount, onStartMistakes, categoryStats, onResetGrade,
}) => {
  const [selectedTheme, setSelectedTheme] = useState<ThemeConfig | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const style = LEVEL_STYLE[grade];
  const chapters = getChaptersForGrade(grade);
  const extraThemes = getThemesForGrade(grade).filter(t => !chapters.includes(t) && t.id !== MELANGE_THEME.id);

  // ─── Choix du mode pour un thème ─────────────────────────
  if (selectedTheme) {
    const count = getThemeQuestionCount(selectedTheme.id, grade);
    const isChapter = chapters.includes(selectedTheme);
    const m = isChapter ? chapterMastery(selectedTheme, categoryStats) : null;
    return (
      <div className="animate-fade-in space-y-4 relative z-10">
        <button
          onClick={() => setSelectedTheme(null)}
          className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 py-1"
        >
          ← Retour aux chapitres
        </button>

        <div className="glass rounded-3xl p-5 border-2 text-center" style={{ borderColor: themeColor(selectedTheme, 0.4) }}>
          <span className="text-5xl inline-block animate-float">{selectedTheme.emoji}</span>
          <h2 className="font-display text-2xl font-bold mt-2" style={{ color: themeColor(selectedTheme) }}>{selectedTheme.name}</h2>
          <p className="text-xs text-muted-foreground mt-1 font-bold">{count} questions · {GRADE_LABELS[grade]}</p>
          {m && m.answered > 0 && (
            <p className="text-xs mt-2 font-bold">
              {m.medal ? `${MEDAL_LABEL[m.medal].icon} Badge ${MEDAL_LABEL[m.medal].label} · ` : ""}
              {Math.round(m.rate * 100)} % de réussite sur {m.answered} réponses
            </p>
          )}
        </div>

        <div className="space-y-2.5">
          {MODES.map(({ mode, icon, title, desc }) => (
            <button
              key={mode}
              onClick={() => { play("tap"); onStart(mode, selectedTheme.id); }}
              className="w-full glass border-2 border-foreground/10 rounded-2xl p-4 text-left transition-all duration-200
                hover:border-primary/60 hover:-translate-y-0.5 active:scale-[0.98] flex items-center gap-4"
            >
              <span className="text-3xl flex-shrink-0 w-12 h-12 rounded-xl bg-foreground/[0.06] flex items-center justify-center">{icon}</span>
              <div className="min-w-0">
                <div className="font-display font-bold text-lg leading-tight">{title}</div>
                <div className="text-xs text-muted-foreground">{desc}</div>
              </div>
              <span className="ml-auto text-muted-foreground">›</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ─── Accueil du niveau ───────────────────────────────────
  return (
    <div className="animate-fade-in space-y-5 relative z-10">
      {/* Sélecteur de niveau */}
      <div className="grid grid-cols-4 gap-1.5 p-1.5 glass rounded-2xl border border-foreground/10" role="tablist" aria-label="Niveau">
        {GRADES.map((g: Grade) => {
          const active = grade === g;
          return (
            <button
              key={g}
              role="tab"
              aria-selected={active}
              onClick={() => { if (!active) { play("tap"); onGradeChange(g); } }}
              className={`py-2.5 rounded-xl font-black text-sm transition-all duration-300 flex flex-col items-center gap-0.5
                ${active ? "shadow-md scale-[1.03]" : "text-muted-foreground hover:text-foreground"}`}
              style={active
                ? { background: `hsl(${GRADE_HUE[g]})`, color: "hsl(var(--primary-foreground))" }
                : { boxShadow: `inset 0 -3px 0 hsl(${GRADE_HUE[g]} / 0.6)` }}
            >
              <span className="text-lg leading-none">{LEVEL_STYLE[g].emoji}</span>
              {GRADE_LABELS[g]}
            </button>
          );
        })}
      </div>

      {/* Bannière de l'univers */}
      <div key={grade} className="glass rounded-3xl p-5 border border-primary/30 flex items-center gap-4 animate-pop-in">
        <span className="text-5xl animate-float">{style.emoji}</span>
        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-primary">{GRADE_LABELS[grade]}</p>
          <h2 className="font-display text-xl font-bold leading-tight">{style.universe}</h2>
          <p className="text-xs text-muted-foreground">{style.tagline}</p>
        </div>
      </div>

      {/* Partie rapide + erreurs */}
      <div className={`grid gap-2.5 ${mistakeCount > 0 ? "grid-cols-2" : "grid-cols-1"}`}>
        <button
          onClick={() => { play("tap"); setSelectedTheme(MELANGE_THEME); }}
          className="bg-primary text-primary-foreground rounded-2xl p-4 text-left shadow-glow active:scale-[0.97] transition-all animate-pulse-glow"
        >
          <span className="text-2xl">🎲</span>
          <div className="font-display font-bold text-lg leading-tight mt-1">Toutes les notions</div>
          <div className="text-xs opacity-80">{getThemeQuestionCount("melange", grade)} questions mélangées</div>
        </button>
        {mistakeCount > 0 && (
          <button
            onClick={() => { play("tap"); onStartMistakes(); }}
            className="glass border-2 border-destructive/40 rounded-2xl p-4 text-left active:scale-[0.97] transition-all"
          >
            <span className="text-2xl">🎯</span>
            <div className="font-display font-bold text-lg leading-tight mt-1">Mes erreurs</div>
            <div className="text-xs text-muted-foreground">{mistakeCount} question{mistakeCount > 1 ? "s" : ""} à retravailler</div>
          </button>
        )}
      </div>

      {/* Chapitres */}
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground text-center mb-3">Chapitres</p>
        <div className="grid grid-cols-2 gap-2.5">
          {chapters.map(theme => {
            const count = getThemeQuestionCount(theme.id, grade);
            if (count === 0) return null;
            const m = chapterMastery(theme, categoryStats);
            return (
              <button
                key={theme.id}
                onClick={() => { play("tap"); setSelectedTheme(theme); }}
                className="glass border-2 rounded-2xl p-3.5 text-left transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.97] relative overflow-hidden"
                style={{ borderColor: themeColor(theme, 0.28) }}
              >
                {m.medal && <span className="absolute top-2 right-2 text-lg" title={`Badge ${MEDAL_LABEL[m.medal].label}`}>{MEDAL_LABEL[m.medal].icon}</span>}
                <span className="text-2xl block mb-1.5">{theme.emoji}</span>
                <p className="font-display font-bold text-[15px] leading-tight" style={{ color: themeColor(theme) }}>{theme.name}</p>
                <p className="text-[10px] text-muted-foreground mt-1 font-mono">{count} questions</p>
                <div className="mt-2 h-1.5 rounded-full bg-foreground/10 overflow-hidden" title={m.answered ? `${Math.round(m.rate * 100)} % de réussite` : "Pas encore joué"}>
                  <div className="h-full rounded-full" style={{ width: `${Math.round(m.rate * 100)}%`, background: themeColor(theme) }} />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Révisions du niveau précédent */}
      {extraThemes.map(theme => (
        <button
          key={theme.id}
          onClick={() => { play("tap"); setSelectedTheme(theme); }}
          className="w-full glass border-2 border-foreground/10 rounded-2xl p-4 text-left flex items-center gap-3 hover:border-primary/50 active:scale-[0.98] transition-all"
        >
          <span className="text-2xl">{theme.emoji}</span>
          <div>
            <div className="font-display font-bold">{theme.name}</div>
            <div className="text-xs text-muted-foreground">{getThemeQuestionCount(theme.id, grade)} questions d'entretien</div>
          </div>
          <span className="ml-auto text-muted-foreground">›</span>
        </button>
      ))}

      {/* Légende des badges */}
      <div className="text-center text-[11px] text-muted-foreground space-y-1 pt-1">
        <p>
          {Object.values(MEDAL_LABEL).map(b => `${b.icon} ${b.rule}`).join("   ·   ")}
        </p>
        <button onClick={() => setConfirmReset(true)} className="underline hover:text-foreground">
          Remettre à zéro la progression de {GRADE_LABELS[grade]}
        </button>
      </div>

      <ConfirmDialog
        open={confirmReset}
        title={`Remettre à zéro la ${GRADE_LABELS[grade]} ?`}
        message="XP, badges, statistiques et erreurs de ce niveau seront effacés."
        confirmLabel="Oui, tout effacer"
        cancelLabel="Annuler"
        onConfirm={() => { setConfirmReset(false); onResetGrade(); }}
        onCancel={() => setConfirmReset(false)}
      />
    </div>
  );
};

export default MenuScreen;
