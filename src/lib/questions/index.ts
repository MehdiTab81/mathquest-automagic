export type { Question, Grade } from "./types";
export { checkAnswer } from "./types";
import type { Question, Grade } from "./types";
import { get3emeQuestions } from "./3eme";

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

function getAllQuestions(): Question[] {
  return withQuestionIds(get3emeQuestions());
}

export function getCategories(): { name: string; count: number }[] {
  const all = getAllQuestions();
  const map = new Map<string, number>();
  all.forEach(q => map.set(q.category, (map.get(q.category) || 0) + 1));
  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name, "fr"));
}

export function getQuestionsByCategory(category: string): Question[] {
  return shuffleQuestions(getAllQuestions().filter(q => q.category === category));
}

export function getRandomQuestions(count: number): Question[] {
  const shuffled = shuffleQuestions(getAllQuestions());
  return shuffled.slice(0, count);
}

export function getDuelQuestion(): Question {
  const all = getAllQuestions();
  return all[Math.floor(Math.random() * all.length)];
}
