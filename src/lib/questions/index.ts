export type { Question, Grade, ThemeId, ThemeConfig } from "./types";
export { checkAnswer, seededShuffle, THEMES, MELANGE_THEME, getThemeForCategory, GRADES, GRADE_LABELS } from "./types";
import type { Question, Grade, ThemeId } from "./types";
import { THEMES } from "./types";
import { get3emeQuestions } from "./3eme";
import { get5emeQuestions, get6emeQuestions } from "./grades";

// Categories exclusive to 3ème (not studied in 4ème)
const TROISIEME_ONLY_CATEGORIES = new Set([
  "Racines carrées",
  "Encadrer √",
  "Puissances négatives",
  "Notation scientifique",
  "Double distributivité",
  "Identité (a+b)(a−b)",
  "Différence de carrés",
  "Équation ax+b = cx+d",
  "Fonction linéaire",
  "Fonction affine",
  "PGCD",
  "Probabilité simple",
  "Événement contraire",
  "Équation ax + b = c",
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
  if (grade === "5eme") return withQuestionIds(get5emeQuestions());
  const all = withQuestionIds(get3emeQuestions());
  if (grade === "3eme") return all;
  return all.filter(q => !TROISIEME_ONLY_CATEGORIES.has(q.category) && !isBrevet(q.category));
}

function getQuestionsByTheme(themeId: ThemeId, grade: Grade = "3eme"): Question[] {
  if (themeId === "melange") return getAllQuestions(grade);
  const theme = THEMES.find(t => t.id === themeId);
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

export function getRandomQuestions(count: number, grade: Grade = "3eme", themeId: ThemeId = "melange"): Question[] {
  const pool = getQuestionsByTheme(themeId, grade);
  return shuffleQuestions(pool).slice(0, count);
}

export function getDuelQuestion(grade: Grade = "3eme", themeId: ThemeId = "melange"): Question {
  const pool = getQuestionsByTheme(themeId, grade);
  return pool[Math.floor(Math.random() * pool.length)];
}

export function getThemeQuestionCount(themeId: ThemeId, grade: Grade = "3eme"): number {
  return getQuestionsByTheme(themeId, grade).length;
}
