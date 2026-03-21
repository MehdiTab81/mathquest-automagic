export interface Question {
  id?: number;
  text: string;
  answer: string;
  category: string;
  hint?: string;
}

export type Grade = "6eme" | "5eme" | "4eme" | "3eme";

export function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function checkAnswer(userAnswer: string, correctAnswer: string): boolean {
  const clean = userAnswer.replace(",", ".").trim();
  const correct = parseFloat(correctAnswer);
  const user = parseFloat(clean);
  if (isNaN(user)) return false;
  return Math.abs(user - correct) < 0.01;
}
