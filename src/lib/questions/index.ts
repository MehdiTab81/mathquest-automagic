export type { Question, Grade } from "./types";
export { checkAnswer } from "./types";
import type { Question, Grade } from "./types";
import { get3emeQuestions } from "./3eme";

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
  const all = withQuestionIds(get3emeQuestions());
  if (grade === "3eme") return all;
  // For 4ème: filter out 3ème-only and Brevet categories
  return all.filter(q => !TROISIEME_ONLY_CATEGORIES.has(q.category) && !isBrevet(q.category));
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

export function getRandomQuestions(count: number, grade: Grade = "3eme"): Question[] {
  const shuffled = shuffleQuestions(getAllQuestions(grade));
  return shuffled.slice(0, count);
}

export function getDuelQuestion(grade: Grade = "3eme"): Question {
  const all = getAllQuestions(grade);
  return all[Math.floor(Math.random() * all.length)];
}
