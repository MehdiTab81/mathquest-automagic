import type { Grade, ThemeConfig } from "@/lib/questions";

/** Identité visuelle de chaque niveau : un univers, une couleur dominante, un décor. */
export interface LevelStyle {
  universe: string;
  emoji: string;
  tagline: string;
  /** Éléments du décor animé en arrière-plan. */
  particles: string[];
}

export const LEVEL_STYLE: Record<Grade, LevelStyle> = {
  "6eme": { universe: "La Forêt des Nombres", emoji: "🌲", tagline: "Pose les bases, pas à pas", particles: ["🍃", "🌿", "✦", "🍂"] },
  "5eme": { universe: "L'Océan des Calculs", emoji: "🌊", tagline: "Plonge dans les relatifs et les fractions", particles: ["🫧", "○", "🫧", "◦"] },
  "4eme": { universe: "Le Cosmos Algébrique", emoji: "🪐", tagline: "Explore puissances, équations et Pythagore", particles: ["✦", "✧", "⋆", "·"] },
  "3eme": { universe: "Le Volcan du Brevet", emoji: "🌋", tagline: "Dernière ligne droite avant le brevet", particles: ["🔥", "✦", "•", "✧"] },
};

/** Couleur dominante de chaque niveau (pour le sélecteur, visible quel que soit le niveau actif). */
export const GRADE_HUE: Record<Grade, string> = {
  "6eme": "135 62% 52%",
  "5eme": "192 92% 55%",
  "4eme": "266 92% 72%",
  "3eme": "25 95% 58%",
};

/** Nom de la variable CSS de couleur d'un chapitre ("text-game-gold" → "--game-gold"). */
export function themeVar(theme: Pick<ThemeConfig, "colorClass">): string {
  const m = theme.colorClass.match(/game-[a-z]+/);
  return m ? `--${m[0]}` : "--primary";
}

/** Couleur d'un chapitre avec une opacité donnée, pour les styles en ligne. */
export function themeColor(theme: Pick<ThemeConfig, "colorClass">, alpha = 1): string {
  return `hsl(var(${themeVar(theme)}) / ${alpha})`;
}

// ─── Progression : niveaux d'XP et badges ──────────────────

/** XP nécessaire pour passer du niveau `level` au suivant (progressif). */
export function xpForLevel(level: number): number {
  return 80 + level * 20;
}

export type Medal = "or" | "argent" | "bronze" | null;

export interface Mastery {
  answered: number;
  correct: number;
  rate: number;
  medal: Medal;
}

export const MEDAL_LABEL: Record<Exclude<Medal, null>, { label: string; icon: string; rule: string }> = {
  bronze: { label: "Bronze", icon: "🥉", rule: "10 réponses, 60 % de réussite" },
  argent: { label: "Argent", icon: "🥈", rule: "25 réponses, 75 % de réussite" },
  or: { label: "Or", icon: "🥇", rule: "50 réponses, 90 % de réussite" },
};

export function medalFor(answered: number, rate: number): Medal {
  if (answered >= 50 && rate >= 0.9) return "or";
  if (answered >= 25 && rate >= 0.75) return "argent";
  if (answered >= 10 && rate >= 0.6) return "bronze";
  return null;
}

/** Maîtrise d'un chapitre à partir des statistiques par catégorie. */
export function chapterMastery(chapter: ThemeConfig, stats: Record<string, { correct: number; total: number }>): Mastery {
  let answered = 0;
  let correct = 0;
  for (const [cat, s] of Object.entries(stats)) {
    if (chapter.prefixes.some(p => cat.startsWith(p))) {
      answered += s.total;
      correct += s.correct;
    }
  }
  const rate = answered ? correct / answered : 0;
  return { answered, correct, rate, medal: medalFor(answered, rate) };
}
