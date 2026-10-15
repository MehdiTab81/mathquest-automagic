export type { Question, Grade, ThemeId, ThemeConfig } from "./types";
export { checkAnswer, seededShuffle, THEMES, MELANGE_THEME, getThemeForCategory, GRADES, GRADE_LABELS, getExplanation, parseNumericAnswer } from "./types";
import type { Question, Grade, ThemeId } from "./types";
import { THEMES } from "./types";
import { get3emeQuestions } from "./3eme";
import { get5emeQuestions, get6emeQuestions } from "./grades";
import { CHAPTERS_5EME, ENTRETIEN_5EME } from "./5eme";
import { MELANGE_THEME } from "./types";
import type { ThemeConfig } from "./types";

export function getThemesForGrade(grade: Grade): ThemeConfig[] {
  if (grade === "5eme") return [...CHAPTERS_5EME, ENTRETIEN_5EME, MELANGE_THEME];
  return [...THEMES, MELANGE_THEME];
}


// Categories exclusive to 3ème (not studied in 4ème).
// Racine carrée, puissances négatives, notation scientifique et probabilités
// relèvent du programme de 4ème : elles ne sont donc plus exclues.
const TROISIEME_ONLY_CATEGORIES = new Set([
  "Double distributivité",
  "Identité (a+b)(a−b)",
  "Différence de carrés",
  "Équation ax+b = cx+d",
  "Fonction linéaire",
  "Fonction affine",
  "PGCD",
]);

function isBrevet(category: string): boolean {
  return category.startsWith("Brevet");
}

function withQuestionIds(questions: Question[]): Question[] {
  return questions.map((question, index) => ({
    ...question,
    id: index + 1,
  }));
}

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

function shuffleQuestions(questions: Question[]): Question[] {
  const copy = [...questions];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function getAllQuestions(grade: Grade = "3eme"): Question[] {
  if (grade === "6eme") return withQuestionIds(get6emeQuestions());
  if (grade === "5eme") return withQuestionIds(dedupe(get5emeQuestions()));

  // 4ème et 3ème héritent des automatismes de 6ème/5ème (entretien)
  const base = get5emeQuestions();
  const advanced = get3emeQuestions();
  if (grade === "3eme") return withQuestionIds(dedupe([...base, ...advanced]));
  return withQuestionIds(dedupe([
    ...base,
    ...advanced.filter(q => !TROISIEME_ONLY_CATEGORIES.has(q.category) && !isBrevet(q.category)),
  ]));
}

function getQuestionsByTheme(themeId: ThemeId, grade: Grade = "3eme"): Question[] {
  if (themeId === "melange") return getAllQuestions(grade);
  if (themeId === ENTRETIEN_5EME.id) {
    const all = CHAPTERS_5EME.flatMap(c => c.prefixes);
    return getAllQuestions(grade).filter(q => !all.some(p => q.category.startsWith(p)));
  }
  const theme = [...THEMES, ...CHAPTERS_5EME].find(t => t.id === themeId);
  if (!theme) return getAllQuestions(grade);
  return getAllQuestions(grade).filter(q =>
    theme.prefixes.some(p => q.category.startsWith(p))
  );
}

export function getCategories(grade: Grade = "3eme"): { name: string; count: number }[] {
  const all = getAllQuestions(grade);
  const map = new Map<string, number>();
  all.forEach(q => map.set(q.category, (map.get(q.category) || 0) + 1));
  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name, "fr"));
}

export function getQuestionsByCategory(category: string, grade: Grade = "3eme"): Question[] {
  return shuffleQuestions(getAllQuestions(grade).filter(q => q.category === category));
}

/** Max share of a single category inside one session (≈ 15 %). */
const MAX_CATEGORY_SHARE = 0.15;

export interface DrawOptions {
  /** Categories the learner is struggling with — drawn first and slightly over-represented. */
  weakCategories?: string[];
}

/**
 * Balanced draw: round-robin over categories, capping each category to ~15 %
 * of the session so that no single notion (les tables, par exemple) écrase le tirage.
 * Weak categories are served first and get a slightly higher cap.
 */
function pickBalanced(pool: Question[], count: number, weak: string[] = []): Question[] {
  const byCategory = new Map<string, Question[]>();
  for (const q of pool) {
    if (!byCategory.has(q.category)) byCategory.set(q.category, []);
    byCategory.get(q.category)!.push(q);
  }

  const weakSet = new Set(weak);
  const baseCap = Math.max(1, Math.ceil(count * MAX_CATEGORY_SHARE));
  const categories = shuffleQuestions(
    Array.from(byCategory.keys()).map(name => ({ text: name, answer: "", category: name }))
  ).map(q => q.category);
  categories.sort((a, b) => Number(weakSet.has(b)) - Number(weakSet.has(a)));

  const remaining = new Map<string, Question[]>();
  byCategory.forEach((qs, name) => remaining.set(name, shuffleQuestions(qs)));

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

  // If the pool is too small/narrow, top up without the cap
  if (out.length < count) {
    const used = new Set(out.map(q => `${q.category}|${q.text}`));
    for (const q of shuffleQuestions(pool)) {
      if (out.length >= count) break;
      if (used.has(`${q.category}|${q.text}`)) continue;
      out.push(q);
    }
  }

  return shuffleQuestions(out);
}

export function getRandomQuestions(
  count: number,
  grade: Grade = "3eme",
  themeId: ThemeId = "melange",
  options: DrawOptions = {}
): Question[] {
  const pool = getQuestionsByTheme(themeId, grade);
  return pickBalanced(pool, count, options.weakCategories);
}

export function getDuelQuestion(grade: Grade = "3eme", themeId: ThemeId = "melange"): Question {
  const pool = getQuestionsByTheme(themeId, grade);
  return pool[Math.floor(Math.random() * pool.length)];
}

export function getThemeQuestionCount(themeId: ThemeId, grade: Grade = "3eme"): number {
  return getQuestionsByTheme(themeId, grade).length;
}
