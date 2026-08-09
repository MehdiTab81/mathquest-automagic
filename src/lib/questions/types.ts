export interface Question {
  id?: number;
  text: string;
  answer: string;
  category: string;
  hint?: string;
  options?: string[]; // QCM choices — if present, show as multiple choice
}

export type Grade = "6eme" | "5eme" | "4eme" | "3eme";

export const GRADES: Grade[] = ["6eme", "5eme", "4eme", "3eme"];

export const GRADE_LABELS: Record<Grade, string> = {
  "6eme": "6ème",
  "5eme": "5ème",
  "4eme": "4ème",
  "3eme": "3ème",
};

export type ThemeId = "nombres" | "grandeurs" | "algebre" | "fonctions" | "proportionnalite" | "statistiques" | "brevet" | "melange";

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  emoji: string;
  colorClass: string;       // tailwind text-* class
  borderClass: string;      // tailwind border-* class
  bgClass: string;          // tailwind bg-* class
  prefixes: string[];       // category prefixes that belong to this theme
}

export const THEMES: ThemeConfig[] = [
  {
    id: "nombres", name: "Nombres & Calculs", emoji: "🔢",
    colorClass: "text-game-gold", borderClass: "border-game-gold", bgClass: "bg-game-gold",
    prefixes: ["Relatifs", "Fraction", "Quotients", "Add/sub frac", "Multiplier rat", "Diviser rat",
      "Écritures", "Puissances", "Notation sci", "Carrés", "Racines", "Encadrer", "Double,",
      "Tables", "Priorités", "PGCD", "Double, triple",
      "Additions", "Soustractions", "Doubles", "Moitiés", "×10", "Compléments",
      "Triples", "Division simple", "Décimaux", "Nombres relatifs", "Produit de relatifs"]
  },
  {
    id: "grandeurs", name: "Grandeurs & Mesures", emoji: "📏",
    colorClass: "text-game-mint", borderClass: "border-game-mint", bgClass: "bg-game-mint",
    prefixes: ["Périmètres", "Aires", "Angles"]
  },
  {
    id: "algebre", name: "Algèbre & Calcul littéral", emoji: "✏️",
    colorClass: "text-game-teal", borderClass: "border-game-teal", bgClass: "bg-game-teal",
    prefixes: ["Distributivité", "Double dist", "Identité", "Différence", "Programme de calcul",
      "Substitution", "Équation", "Calcul littéral", "Développer", "Factoriser", "Réduire", "Simplifier"]
  },
  {
    id: "fonctions", name: "Fonctions", emoji: "📈",
    colorClass: "text-game-purple", borderClass: "border-game-purple", bgClass: "bg-game-purple",
    prefixes: ["Fonction"]
  },
  {
    id: "proportionnalite", name: "Proportionnalité & %", emoji: "⚖️",
    colorClass: "text-game-coral", borderClass: "border-game-coral", bgClass: "bg-game-coral",
    prefixes: ["Pourcentage", "Augmentation", "Proportionnalité", "Partage", "Vitesse",
      "Probabilité", "Événement", "Conversions"]
  },
  {
    id: "statistiques", name: "Statistiques", emoji: "📊",
    colorClass: "text-game-pink", borderClass: "border-game-pink", bgClass: "bg-game-pink",
    prefixes: ["Moyenne", "Médiane", "Étendue"]
  },
  {
    id: "brevet", name: "Brevet", emoji: "🎓",
    colorClass: "text-game-mint", borderClass: "border-game-mint", bgClass: "bg-game-mint",
    prefixes: ["Brevet"]
  },
];

export const MELANGE_THEME: ThemeConfig = {
  id: "melange", name: "Toutes les notions", emoji: "🎲",
  colorClass: "text-primary", borderClass: "border-primary", bgClass: "bg-primary",
  prefixes: []
};

export function getThemeForCategory(category: string): ThemeConfig | undefined {
  return THEMES.find(t => t.prefixes.some(p => category.startsWith(p)));
}

export function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** Shuffle an array using a seed derived from a string (Fisher-Yates) */
export function seededShuffle<T>(arr: T[], seed: string): T[] {
  const out = [...arr];
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = ((h << 5) - h + seed.charCodeAt(i)) | 0;
  }
  for (let i = out.length - 1; i > 0; i--) {
    h = (h * 1664525 + 1013904223) | 0;
    const j = ((h >>> 0) % (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function checkAnswer(userAnswer: string, correctAnswer: string, isQcm = false): boolean {
  if (isQcm) {
    return userAnswer.trim() === correctAnswer.trim();
  }
  const clean = userAnswer.replace(",", ".").trim();
  const correct = parseFloat(correctAnswer);
  const user = parseFloat(clean);
  if (isNaN(user)) return false;
  return Math.abs(user - correct) < 0.01;
}
