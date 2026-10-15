export type { Question, Grade, ThemeId, ThemeConfig } from "./types";
export { checkAnswer, seededShuffle, THEMES, MELANGE_THEME, getThemeForCategory, GRADES, GRADE_LABELS, getExplanation, parseNumericAnswer } from "./types";
import type { Question, Grade, ThemeId, ThemeConfig } from "./types";
import { MELANGE_THEME } from "./types";
import { get3emeQuestions } from "./3eme";
import { get5emeQuestions, get6emeQuestions } from "./grades";
import { CHAPTERS_5EME, ENTRETIEN_5EME, get5emeProgramQuestions } from "./5eme";
import { CHAPTERS_6EME, get6emeProgramQuestions } from "./6eme";
import { CHAPTERS_4EME, get4emeProgramQuestions } from "./4eme";
import { CHAPTERS_3EME, get3emePlusQuestions } from "./3eme-plus";

// ─── Organisation par niveau ───────────────────────────────
// Chaque niveau a ses propres chapitres (« own ») et, à partir de la 5ème,
// une banque de révisions issue du niveau précédent (« entretien »).

const CHAPTERS: Record<Grade, ThemeConfig[]> = {
  "6eme": CHAPTERS_6EME,
  "5eme": CHAPTERS_5EME,
  "4eme": CHAPTERS_4EME,
  "3eme": CHAPTERS_3EME,
};

const ENTRETIEN: Record<Grade, ThemeConfig | null> = {
  "6eme": null,
  "5eme": ENTRETIEN_5EME,
  "4eme": {
    id: "4e-entretien", name: "Révisions de 5ème", emoji: "🔁",
    colorClass: "text-game-mint", borderClass: "border-game-mint", bgClass: "bg-game-mint", prefixes: [],
  },
  "3eme": {
    id: "3e-entretien", name: "Révisions de 4ème", emoji: "🔁",
    colorClass: "text-game-mint", borderClass: "border-game-mint", bgClass: "bg-game-mint", prefixes: [],
  },
};

/** Part des questions « niveau » dans une partie mélangée (le reste = révisions). */
const OWN_SHARE = 0.75;

interface Pools { own: Question[]; entretien: Question[] }

function dedupe(questions: Question[]): Question[] {
  const seen = new Set<string>();
  const out: Question[] = [];
  for (const q of questions) {
    const key = `${q.category}|${q.text}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(q);
  }
  return out;
}

const matches = (q: Question, chapters: ThemeConfig[]) =>
  chapters.some(c => c.prefixes.some(p => q.category.startsWith(p)));

function buildPools(grade: Grade): Pools {
  let own: Question[];
  let entretien: Question[];
  switch (grade) {
    case "6eme":
      own = [...get6emeQuestions(), ...get6emeProgramQuestions()];
      entretien = [];
      break;
    case "5eme": {
      const all = dedupe(get5emeQuestions());
      own = all.filter(q => matches(q, CHAPTERS_5EME));
      entretien = all.filter(q => !matches(q, CHAPTERS_5EME));
      break;
    }
    case "4eme":
      own = get4emeProgramQuestions();
      entretien = get5emeProgramQuestions();
      break;
    case "3eme":
      own = [...get3emeQuestions(), ...get3emePlusQuestions()];
      entretien = get4emeProgramQuestions();
      break;
  }
  own = dedupe(own);
  const ownKeys = new Set(own.map(q => `${q.category}|${q.text}`));
  entretien = dedupe(entretien).filter(q => !ownKeys.has(`${q.category}|${q.text}`));
  // Identifiants stables pour la session (affichés en petit, utiles en classe)
  let id = 1;
  own = own.map(q => ({ ...q, id: id++ }));
  entretien = entretien.map(q => ({ ...q, id: id++ }));
  return { own, entretien };
}

// Les banques sont calculées une seule fois par niveau (certaines questions sont tirées au hasard).
const cache = new Map<Grade, Pools>();
function pools(grade: Grade): Pools {
  if (!cache.has(grade)) cache.set(grade, buildPools(grade));
  return cache.get(grade)!;
}

// ─── API publique ──────────────────────────────────────────

/** Chapitres du niveau (sans « Révisions » ni « Toutes les notions »). */
export function getChaptersForGrade(grade: Grade): ThemeConfig[] {
  return CHAPTERS[grade];
}

export function getThemesForGrade(grade: Grade): ThemeConfig[] {
  const e = ENTRETIEN[grade];
  return [...CHAPTERS[grade], ...(e ? [e] : []), MELANGE_THEME];
}

/** Chapitre auquel appartient une catégorie (pour les badges). */
export function getChapterForCategory(grade: Grade, category: string): ThemeConfig | undefined {
  return CHAPTERS[grade].find(c => c.prefixes.some(p => category.startsWith(p)));
}

function getQuestionsByTheme(themeId: ThemeId, grade: Grade): Question[] {
  const { own, entretien } = pools(grade);
  if (themeId === "melange") return [...own, ...entretien];
  const e = ENTRETIEN[grade];
  if (e && themeId === e.id) return entretien;
  const chapter = CHAPTERS[grade].find(t => t.id === themeId);
  if (!chapter) return [...own, ...entretien];
  return own.filter(q => chapter.prefixes.some(p => q.category.startsWith(p)));
}

export function getCategories(grade: Grade = "3eme"): { name: string; count: number }[] {
  const map = new Map<string, number>();
  getQuestionsByTheme("melange", grade).forEach(q => map.set(q.category, (map.get(q.category) || 0) + 1));
  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name, "fr"));
}

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function getQuestionsByCategory(category: string, grade: Grade = "3eme"): Question[] {
  return shuffle(getQuestionsByTheme("melange", grade).filter(q => q.category === category));
}

/** Part maximale d'une même catégorie dans une partie (≈ 15 %). */
const MAX_CATEGORY_SHARE = 0.15;

export interface DrawOptions {
  /** Catégories difficiles pour l'élève : servies en premier et un peu plus représentées. */
  weakCategories?: string[];
}

/**
 * Tirage équilibré : on tourne sur les catégories en limitant chacune à ~15 %
 * de la partie, pour qu'aucune notion (les tables, par exemple) n'écrase le tirage.
 */
function pickBalanced(pool: Question[], count: number, weak: string[] = []): Question[] {
  if (count <= 0 || pool.length === 0) return [];
  const byCategory = new Map<string, Question[]>();
  for (const q of pool) {
    if (!byCategory.has(q.category)) byCategory.set(q.category, []);
    byCategory.get(q.category)!.push(q);
  }

  const weakSet = new Set(weak);
  const baseCap = Math.max(1, Math.ceil(count * MAX_CATEGORY_SHARE));
  const categories = shuffle(Array.from(byCategory.keys()));
  categories.sort((a, b) => Number(weakSet.has(b)) - Number(weakSet.has(a)));

  const remaining = new Map<string, Question[]>();
  byCategory.forEach((qs, name) => remaining.set(name, shuffle(qs)));

  const taken = new Map<string, number>();
  const out: Question[] = [];
  let progressed = true;

  while (out.length < count && progressed) {
    progressed = false;
    for (const name of categories) {
      if (out.length >= count) break;
      const cap = weakSet.has(name) ? baseCap + 2 : baseCap;
      if ((taken.get(name) || 0) >= cap) continue;
      const list = remaining.get(name)!;
      if (list.length === 0) continue;
      out.push(list.pop()!);
      taken.set(name, (taken.get(name) || 0) + 1);
      progressed = true;
    }
  }

  // Banque trop petite ou trop étroite : on complète sans plafond
  if (out.length < count) {
    const used = new Set(out.map(q => `${q.category}|${q.text}`));
    for (const q of shuffle(pool)) {
      if (out.length >= count) break;
      if (used.has(`${q.category}|${q.text}`)) continue;
      out.push(q);
    }
  }

  return shuffle(out);
}

export function getRandomQuestions(
  count: number,
  grade: Grade = "3eme",
  themeId: ThemeId = "melange",
  options: DrawOptions = {}
): Question[] {
  if (themeId === "melange") {
    const { own, entretien } = pools(grade);
    if (entretien.length === 0) return pickBalanced(own, count, options.weakCategories);
    const nOwn = Math.round(count * OWN_SHARE);
    return shuffle([
      ...pickBalanced(own, nOwn, options.weakCategories),
      ...pickBalanced(entretien, count - nOwn, options.weakCategories),
    ]);
  }
  return pickBalanced(getQuestionsByTheme(themeId, grade), count, options.weakCategories);
}

/**
 * Distributeur de questions pour le duel, la battle et le mode projection :
 * pas de répétition tant que la banque n'est pas épuisée.
 */
export function createQuestionDeck(grade: Grade, themeId: ThemeId): () => Question {
  let deck: Question[] = [];
  return () => {
    if (deck.length === 0) deck = getRandomQuestions(40, grade, themeId);
    return deck.pop()!;
  };
}

export function getDuelQuestion(grade: Grade = "3eme", themeId: ThemeId = "melange"): Question {
  return getRandomQuestions(1, grade, themeId)[0];
}

export function getThemeQuestionCount(themeId: ThemeId, grade: Grade = "3eme"): number {
  return getQuestionsByTheme(themeId, grade).length;
}
