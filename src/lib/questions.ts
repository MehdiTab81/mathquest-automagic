export interface Question {
  text: string;
  answer: string;
  category: string;
  hint?: string;
}

const tables: Question[] = [];
for (let a = 2; a <= 12; a++) {
  for (let b = 2; b <= 12; b++) {
    tables.push({ text: `${a} × ${b}`, answer: String(a * b), category: "Tables" });
  }
}

const additions: Question[] = [];
for (let i = 0; i < 30; i++) {
  const a = Math.floor(Math.random() * 90) + 10;
  const b = Math.floor(Math.random() * 90) + 10;
  additions.push({ text: `${a} + ${b}`, answer: String(a + b), category: "Additions" });
}

const subtractions: Question[] = [];
for (let i = 0; i < 30; i++) {
  const a = Math.floor(Math.random() * 90) + 50;
  const b = Math.floor(Math.random() * 49) + 1;
  subtractions.push({ text: `${a} − ${b}`, answer: String(a - b), category: "Soustractions" });
}

const doubles: Question[] = [];
for (let i = 1; i <= 20; i++) {
  doubles.push({ text: `Double de ${i}`, answer: String(i * 2), category: "Doubles" });
}

const squares: Question[] = [];
for (let i = 1; i <= 15; i++) {
  squares.push({ text: `${i}²`, answer: String(i * i), category: "Carrés" });
}

const fractions: Question[] = [
  { text: "1/2 + 1/4", answer: "0.75", category: "Fractions", hint: "= 2/4 + 1/4 = 3/4 = 0,75" },
  { text: "1/3 + 1/6", answer: "0.5", category: "Fractions", hint: "= 2/6 + 1/6 = 3/6 = 0,5" },
  { text: "3/4 − 1/2", answer: "0.25", category: "Fractions", hint: "= 3/4 − 2/4 = 1/4 = 0,25" },
  { text: "2/5 + 1/5", answer: "0.6", category: "Fractions", hint: "= 3/5 = 0,6" },
  { text: "1/2 × 1/3", answer: "0.167", category: "Fractions", hint: "= 1/6 ≈ 0,167" },
];

const allQuestions = [...tables, ...additions, ...subtractions, ...doubles, ...squares, ...fractions];

export function getRandomQuestions(count: number): Question[] {
  const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function getDuelQuestion(): Question {
  return allQuestions[Math.floor(Math.random() * allQuestions.length)];
}

export function checkAnswer(userAnswer: string, correctAnswer: string): boolean {
  const clean = userAnswer.replace(",", ".").trim();
  const correct = parseFloat(correctAnswer);
  const user = parseFloat(clean);
  if (isNaN(user)) return false;
  return Math.abs(user - correct) < 0.01;
}
