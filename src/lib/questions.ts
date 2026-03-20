export interface Question {
  text: string;
  answer: string;
  category: string;
  hint?: string;
}

export type Grade = "6eme" | "5eme" | "4eme" | "3eme";

// Helper to generate random int in [min, max]
function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ─── 6ÈME : notions CM1/CM2 ────────────────────────────────

function get6emeQuestions(): Question[] {
  const qs: Question[] = [];

  // Tables de multiplication (2→12)
  for (let a = 2; a <= 12; a++) {
    for (let b = 2; b <= 12; b++) {
      qs.push({ text: `${a} × ${b}`, answer: String(a * b), category: "Tables" });
    }
  }

  // Additions de nombres entiers
  for (let i = 0; i < 15; i++) {
    const a = randInt(10, 99), b = randInt(10, 99);
    qs.push({ text: `${a} + ${b}`, answer: String(a + b), category: "Additions" });
  }

  // Soustractions (résultat positif)
  for (let i = 0; i < 15; i++) {
    const a = randInt(50, 150), b = randInt(1, 49);
    qs.push({ text: `${a} − ${b}`, answer: String(a - b), category: "Soustractions" });
  }

  // Doubles
  for (let i = 1; i <= 20; i++) {
    qs.push({ text: `Double de ${i}`, answer: String(i * 2), category: "Doubles" });
  }

  // Moitiés (nombres pairs)
  for (let i = 1; i <= 15; i++) {
    const n = i * 2;
    qs.push({ text: `Moitié de ${n}`, answer: String(i), category: "Moitiés" });
  }
  // Moitiés plus grands
  const moities = [50, 100, 200, 400, 60, 80];
  moities.forEach(n => {
    qs.push({ text: `Moitié de ${n}`, answer: String(n / 2), category: "Moitiés" });
  });

  // Multiplier par 10, 100, 1000
  [10, 100, 1000].forEach(m => {
    for (let i = 0; i < 3; i++) {
      const a = randInt(1, 99);
      qs.push({ text: `${a} × ${m}`, answer: String(a * m), category: "×10, ×100, ×1000" });
    }
  });

  // Compléments à 100
  for (let i = 0; i < 8; i++) {
    const a = randInt(1, 99);
    qs.push({ text: `100 − ${a}`, answer: String(100 - a), category: "Compléments à 100" });
  }

  // Triples
  for (let i = 1; i <= 10; i++) {
    qs.push({ text: `Triple de ${i}`, answer: String(i * 3), category: "Triples" });
  }

  // Diviser par 2, 5, 10
  for (let i = 0; i < 4; i++) {
    const a = randInt(1, 50) * 2;
    qs.push({ text: `${a} ÷ 2`, answer: String(a / 2), category: "Division simple" });
  }
  for (let i = 0; i < 3; i++) {
    const a = randInt(1, 20) * 5;
    qs.push({ text: `${a} ÷ 5`, answer: String(a / 5), category: "Division simple" });
  }
  for (let i = 0; i < 3; i++) {
    const a = randInt(1, 99) * 10;
    qs.push({ text: `${a} ÷ 10`, answer: String(a / 10), category: "Division simple" });
  }

  // Carrés simples
  for (let i = 1; i <= 10; i++) {
    qs.push({ text: `${i} × ${i}`, answer: String(i * i), category: "Carrés" });
  }

  return qs;
}

// ─── 5ÈME : notions 6ème + antérieures ─────────────────────

function get5emeQuestions(): Question[] {
  const qs = get6emeQuestions();

  // Additions de décimaux
  const decPairs = [
    [1.5, 2.3], [3.7, 1.8], [0.6, 0.9], [4.2, 3.5], [2.8, 1.7],
    [5.1, 2.4], [0.3, 0.8], [6.5, 1.5], [3.3, 2.9], [7.4, 0.6],
  ];
  decPairs.forEach(([a, b]) => {
    qs.push({ text: `${a} + ${b}`, answer: String(+(a + b).toFixed(1)), category: "Décimaux" });
  });

  // Soustractions de décimaux
  const decSub = [
    [5.7, 2.3], [8.5, 3.8], [4.1, 1.6], [7.9, 2.4], [6.3, 0.8],
  ];
  decSub.forEach(([a, b]) => {
    qs.push({ text: `${a} − ${b}`, answer: String(+(a - b).toFixed(1)), category: "Décimaux" });
  });

  // Fraction d'un nombre (1/2, 1/3, 1/4, 3/4 de...)
  const fracN = [
    ["1/2", 60, 30], ["1/2", 48, 24], ["1/4", 100, 25], ["1/4", 80, 20],
    ["3/4", 100, 75], ["3/4", 40, 30], ["1/3", 90, 30], ["1/3", 60, 20],
    ["2/3", 90, 60], ["1/5", 100, 20], ["1/5", 50, 10], ["2/5", 100, 40],
  ] as const;
  fracN.forEach(([f, n, r]) => {
    qs.push({ text: `${f} de ${n}`, answer: String(r), category: "Fraction d'un nombre" });
  });

  // Priorités opératoires (sans parenthèses, × d'abord)
  const prio = [
    ["3 + 4 × 2", 11], ["5 + 2 × 3", 11], ["10 − 2 × 3", 4],
    ["1 + 5 × 5", 26], ["7 + 3 × 3", 16], ["20 − 4 × 3", 8],
    ["2 × 6 + 1", 13], ["3 × 7 − 5", 16],
  ] as const;
  prio.forEach(([t, r]) => {
    qs.push({ text: String(t), answer: String(r), category: "Priorités opératoires" });
  });

  // Critères de divisibilité
  const divis = [
    ["126 divisible par 2 ?", "oui", "Pair → oui"],
    ["345 divisible par 5 ?", "oui", "Finit par 5 → oui"],
    ["333 divisible par 3 ?", "oui", "3+3+3=9 → oui"],
    ["250 divisible par 10 ?", "non", "Ne finit pas par 0"],
    ["484 divisible par 2 ?", "oui", "Pair → oui"],
    ["129 divisible par 3 ?", "oui", "1+2+9=12 → oui"],
  ];
  // Skip these - answers are oui/non, not numeric. Would need special handling.

  // Périmètre du carré
  for (let c = 2; c <= 8; c++) {
    qs.push({ text: `Périmètre d'un carré de côté ${c} cm`, answer: String(c * 4), category: "Périmètres", hint: `P = 4 × ${c}` });
  }

  // Périmètre du rectangle
  const rects = [[3, 5], [4, 7], [2, 9], [6, 8], [5, 10]];
  rects.forEach(([l, L]) => {
    qs.push({ text: `Périmètre : L=${L} cm, l=${l} cm`, answer: String(2 * (l + L)), category: "Périmètres", hint: `P = 2×(${L}+${l})` });
  });

  // Aire du carré
  for (let c = 2; c <= 8; c++) {
    qs.push({ text: `Aire d'un carré de côté ${c} cm`, answer: String(c * c), category: "Aires", hint: `A = ${c}²` });
  }

  // Aire du rectangle
  rects.forEach(([l, L]) => {
    qs.push({ text: `Aire : L=${L} cm, l=${l} cm`, answer: String(l * L), category: "Aires", hint: `A = ${L}×${l}` });
  });

  // Proportionnalité (passage à l'unité)
  const propor = [
    ["3 stylos = 6 €. Prix de 7 stylos ?", 14, "1 stylo = 2 €"],
    ["5 kg = 15 €. Prix de 3 kg ?", 9, "1 kg = 3 €"],
    ["4 cahiers = 12 €. Prix de 6 ?", 18, "1 cahier = 3 €"],
    ["2 m = 10 €. Prix de 5 m ?", 25, "1 m = 5 €"],
  ] as const;
  propor.forEach(([t, r, h]) => {
    qs.push({ text: String(t), answer: String(r), category: "Proportionnalité", hint: String(h) });
  });

  return qs;
}

// ─── 4ÈME : notions 5ème + antérieures ─────────────────────

function get4emeQuestions(): Question[] {
  const qs = get5emeQuestions();

  // Nombres relatifs : addition
  const relAdd = [
    ["(−3) + 5", 2], ["(−7) + 2", -5], ["4 + (−9)", -5],
    ["(−6) + (−3)", -9], ["8 + (−3)", 5], ["(−10) + 10", 0],
    ["(−4) + 7", 3], ["(−8) + (−2)", -10],
  ] as const;
  relAdd.forEach(([t, r]) => {
    qs.push({ text: String(t), answer: String(r), category: "Nombres relatifs" });
  });

  // Nombres relatifs : soustraction
  const relSub = [
    ["5 − 8", -3], ["3 − 10", -7], ["(−2) − 4", -6],
    ["(−5) − (−3)", -2], ["7 − (−2)", 9], ["0 − 6", -6],
    ["(−1) − (−1)", 0], ["(−3) − 7", -10],
  ] as const;
  relSub.forEach(([t, r]) => {
    qs.push({ text: String(t), answer: String(r), category: "Nombres relatifs" });
  });

  // Nombres relatifs : multiplication
  const relMul = [
    ["(−3) × 4", -12], ["(−5) × (−2)", 10], ["7 × (−3)", -21],
    ["(−6) × (−6)", 36], ["(−1) × 15", -15], ["(−4) × (−5)", 20],
  ] as const;
  relMul.forEach(([t, r]) => {
    qs.push({ text: String(t), answer: String(r), category: "Produit de relatifs" });
  });

  // Puissances simples
  const puis = [
    ["2³", 8], ["3²", 9], ["5²", 25], ["10³", 1000],
    ["2⁴", 16], ["3³", 27], ["4²", 16], ["2⁵", 32],
    ["10²", 100], ["7²", 49], ["6²", 36], ["10⁴", 10000],
  ] as const;
  puis.forEach(([t, r]) => {
    qs.push({ text: String(t), answer: String(r), category: "Puissances" });
  });

  // Distributivité simple (développer)
  const distrib = [
    ["3 × (4 + 5)", 27, "= 3×4 + 3×5"], ["2 × (10 − 3)", 14, "= 2×10 − 2×3"],
    ["5 × (6 + 2)", 40, "= 5×6 + 5×2"], ["4 × (7 − 1)", 24, "= 4×7 − 4×1"],
    ["6 × (3 + 4)", 42, "= 6×3 + 6×4"], ["7 × (5 − 2)", 21, "= 7×5 − 7×2"],
  ] as const;
  distrib.forEach(([t, r, h]) => {
    qs.push({ text: String(t), answer: String(r), category: "Distributivité", hint: String(h) });
  });

  // Pourcentages
  const pourc = [
    ["10% de 200", 20], ["25% de 80", 20], ["50% de 60", 30],
    ["20% de 150", 30], ["75% de 40", 30], ["10% de 350", 35],
    ["5% de 200", 10], ["30% de 100", 30], ["15% de 200", 30],
  ] as const;
  pourc.forEach(([t, r]) => {
    qs.push({ text: String(t), answer: String(r), category: "Pourcentages" });
  });

  // Fractions : addition même dénominateur
  const fracAdd = [
    ["1/4 + 2/4", "0.75", "= 3/4"], ["3/5 + 1/5", "0.8", "= 4/5"],
    ["2/7 + 3/7", "0.714", "= 5/7"], ["1/3 + 1/3", "0.667", "= 2/3"],
    ["5/8 + 1/8", "0.75", "= 6/8 = 3/4"],
  ] as const;
  fracAdd.forEach(([t, r, h]) => {
    qs.push({ text: String(t), answer: String(r), category: "Fractions", hint: String(h) });
  });

  // Multiplier des fractions
  const fracMul = [
    ["1/2 × 1/3", "0.167", "= 1/6"], ["2/3 × 3/4", "0.5", "= 6/12 = 1/2"],
    ["1/4 × 2/5", "0.1", "= 2/20 = 1/10"], ["3/5 × 5/6", "0.5", "= 15/30 = 1/2"],
  ] as const;
  fracMul.forEach(([t, r, h]) => {
    qs.push({ text: String(t), answer: String(r), category: "Fractions", hint: String(h) });
  });

  // Angles complémentaires et supplémentaires
  const angles = [
    ["Complément de 30°", 60, "90 − 30"], ["Complément de 45°", 45, "90 − 45"],
    ["Complément de 70°", 20, "90 − 70"], ["Supplément de 110°", 70, "180 − 110"],
    ["Supplément de 60°", 120, "180 − 60"], ["Supplément de 90°", 90, "180 − 90"],
  ] as const;
  angles.forEach(([t, r, h]) => {
    qs.push({ text: String(t), answer: String(r), category: "Angles", hint: String(h) });
  });

  return qs;
}

// ─── 3ÈME : notions 4ème + antérieures ─────────────────────

function get3emeQuestions(): Question[] {
  const qs = get4emeQuestions();

  // Puissances : règles de calcul
  const puisCalc = [
    ["10² × 10³", "100000", "= 10⁵"], ["2³ × 2²", "32", "= 2⁵"],
    ["5⁴ ÷ 5²", "25", "= 5²"], ["3² × 3", "27", "= 3³"],
    ["(2³)²", "64", "= 2⁶"], ["10⁶ ÷ 10⁴", "100", "= 10²"],
  ] as const;
  puisCalc.forEach(([t, r, h]) => {
    qs.push({ text: String(t), answer: String(r), category: "Règles de puissances", hint: String(h) });
  });

  // Racines carrées (carrés parfaits)
  const racines = [1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144];
  racines.forEach(n => {
    qs.push({ text: `√${n}`, answer: String(Math.sqrt(n)), category: "Racines carrées" });
  });

  // Notation scientifique → nombre
  const notSci = [
    ["3,5 × 10²", "350"], ["1,2 × 10³", "1200"],
    ["4 × 10⁴", "40000"], ["7,1 × 10¹", "71"],
    ["2,5 × 10²", "250"], ["6 × 10³", "6000"],
  ] as const;
  notSci.forEach(([t, r]) => {
    qs.push({ text: String(t), answer: String(r), category: "Notation scientifique" });
  });

  // Développer avec identités remarquables (résultats numériques)
  // (a+b)² pour petites valeurs
  const idr = [
    ["(3 + 2)²", "25"], ["(4 + 1)²", "25"], ["(5 + 3)²", "64"],
    ["(10 − 3)²", "49"], ["(6 − 1)²", "25"], ["(8 − 2)²", "36"],
  ] as const;
  idr.forEach(([t, r]) => {
    qs.push({ text: String(t), answer: String(r), category: "Identités remarquables" });
  });

  // Probabilités simples
  const proba = [
    ["Proba de tirer un 6 sur un dé", "0.167", "= 1/6"],
    ["Proba pile avec une pièce", "0.5", "= 1/2"],
    ["Proba carte rouge dans un jeu de 32", "0.5", "= 16/32"],
    ["Proba d'un as dans un jeu de 32", "0.125", "= 4/32 = 1/8"],
    ["Proba pair sur un dé", "0.5", "= 3/6"],
  ] as const;
  proba.forEach(([t, r, h]) => {
    qs.push({ text: String(t), answer: String(r), category: "Probabilités", hint: String(h) });
  });

  // PGCD (petits nombres)
  const pgcd = [
    ["PGCD(12, 8)", "4"], ["PGCD(18, 12)", "6"], ["PGCD(24, 36)", "12"],
    ["PGCD(15, 25)", "5"], ["PGCD(14, 21)", "7"], ["PGCD(20, 30)", "10"],
  ] as const;
  pgcd.forEach(([t, r]) => {
    qs.push({ text: String(t), answer: String(r), category: "PGCD" });
  });

  // Fonctions linéaires : image
  const flin = [
    ["f(x) = 3x. f(4) = ?", "12"], ["f(x) = −2x. f(5) = ?", "-10"],
    ["f(x) = 0,5x. f(8) = ?", "4"], ["f(x) = 7x. f(3) = ?", "21"],
  ] as const;
  flin.forEach(([t, r]) => {
    qs.push({ text: String(t), answer: String(r), category: "Fonctions linéaires" });
  });

  // Équations simples (trouver x)
  const eqs = [
    ["3x = 12. x = ?", "4"], ["2x + 1 = 9. x = ?", "4"],
    ["5x − 3 = 12. x = ?", "3"], ["4x = −20. x = ?", "-5"],
    ["x + 7 = 3. x = ?", "-4"], ["2x = 0. x = ?", "0"],
  ] as const;
  eqs.forEach(([t, r]) => {
    qs.push({ text: String(t), answer: String(r), category: "Équations" });
  });

  // Arithmétique : diviseurs
  const divis = [
    ["Nombre de diviseurs de 12", "6", "1,2,3,4,6,12"],
    ["Nombre de diviseurs de 8", "4", "1,2,4,8"],
    ["Nombre de diviseurs de 15", "4", "1,3,5,15"],
  ] as const;
  divis.forEach(([t, r, h]) => {
    qs.push({ text: String(t), answer: String(r), category: "Arithmétique", hint: String(h) });
  });

  return qs;
}

// ─── API PUBLIQUE ───────────────────────────────────────────

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

export function checkAnswer(userAnswer: string, correctAnswer: string): boolean {
  const clean = userAnswer.replace(",", ".").trim();
  const correct = parseFloat(correctAnswer);
  const user = parseFloat(clean);
  if (isNaN(user)) return false;
  return Math.abs(user - correct) < 0.01;
}
