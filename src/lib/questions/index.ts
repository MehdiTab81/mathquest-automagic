export type { Question, Grade } from "./types";
export { checkAnswer } from "./types";
import type { Question, Grade } from "./types";
import { get6emeQuestions, get5emeQuestions, get4emeQuestions } from "./grades";
import { get3emeQuestions } from "./3eme";

const questionsByGrade: Record<Grade, () => Question[]> = {
  "6eme": get6emeQuestions,
  "5eme": get5emeQuestions,
  "4eme": get4emeQuestions,
  "3eme": get3emeQuestions,
};

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

export function getRandomQuestions(count: number, grade: Grade = "6eme"): Question[] {
  const all = withQuestionIds(questionsByGrade[grade]());
  const shuffled = shuffleQuestions(all);
  return shuffled.slice(0, count);
}

export function getDuelQuestion(grade: Grade = "6eme"): Question {
  const all = withQuestionIds(questionsByGrade[grade]());
  return all[Math.floor(Math.random() * all.length)];
}
