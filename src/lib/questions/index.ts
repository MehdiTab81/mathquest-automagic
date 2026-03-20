export type { Question, Grade } from "./types";
export { checkAnswer } from "./types";
import { Question, Grade } from "./types";
import { get6emeQuestions, get5emeQuestions, get4emeQuestions } from "./grades";
import { get3emeQuestions } from "./3eme";

const questionsByGrade: Record<Grade, () => Question[]> = {
  "6eme": get6emeQuestions,
  "5eme": get5emeQuestions,
  "4eme": get4emeQuestions,
  "3eme": get3emeQuestions,
};

export function getRandomQuestions(count: number, grade: Grade = "6eme"): Question[] {
  const all = questionsByGrade[grade]();
  const shuffled = all.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function getDuelQuestion(grade: Grade = "6eme"): Question {
  const all = questionsByGrade[grade]();
  return all[Math.floor(Math.random() * all.length)];
}
