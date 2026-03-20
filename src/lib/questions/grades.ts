import { Question, randInt } from "./types";

// ─── 6ÈME ──────────────────────────────────────────────────
export function get6emeQuestions(): Question[] {
  const qs: Question[] = [];

  for (let a = 2; a <= 12; a++)
    for (let b = 2; b <= 12; b++)
      qs.push({ text: `${a} × ${b}`, answer: String(a * b), category: "Tables" });

  for (let i = 0; i < 15; i++) {
    const a = randInt(10, 99), b = randInt(10, 99);
    qs.push({ text: `${a} + ${b}`, answer: String(a + b), category: "Additions" });
  }

  for (let i = 0; i < 15; i++) {
    const a = randInt(50, 150), b = randInt(1, 49);
    qs.push({ text: `${a} − ${b}`, answer: String(a - b), category: "Soustractions" });
  }

  for (let i = 1; i <= 20; i++)
    qs.push({ text: `Double de ${i}`, answer: String(i * 2), category: "Doubles" });

  for (let i = 1; i <= 15; i++) {
    const n = i * 2;
    qs.push({ text: `Moitié de ${n}`, answer: String(i), category: "Moitiés" });
  }
  [50, 100, 200, 400, 60, 80].forEach(n =>
    qs.push({ text: `Moitié de ${n}`, answer: String(n / 2), category: "Moitiés" })
  );

  [10, 100, 1000].forEach(m => {
    for (let i = 0; i < 3; i++) {
      const a = randInt(1, 99);
      qs.push({ text: `${a} × ${m}`, answer: String(a * m), category: "×10, ×100, ×1000" });
    }
  });

  for (let i = 0; i < 8; i++) {
    const a = randInt(1, 99);
    qs.push({ text: `100 − ${a}`, answer: String(100 - a), category: "Compléments à 100" });
  }

  for (let i = 1; i <= 10; i++)
    qs.push({ text: `Triple de ${i}`, answer: String(i * 3), category: "Triples" });

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

  for (let i = 1; i <= 10; i++)
    qs.push({ text: `${i} × ${i}`, answer: String(i * i), category: "Carrés" });

  return qs;
}

// ─── 5ÈME ──────────────────────────────────────────────────
export function get5emeQuestions(): Question[] {
  const qs = get6emeQuestions();

  const decPairs = [
    [1.5, 2.3], [3.7, 1.8], [0.6, 0.9], [4.2, 3.5], [2.8, 1.7],
    [5.1, 2.4], [0.3, 0.8], [6.5, 1.5], [3.3, 2.9], [7.4, 0.6],
  ];
  decPairs.forEach(([a, b]) =>
    qs.push({ text: `${a} + ${b}`, answer: String(+(a + b).toFixed(1)), category: "Décimaux" })
  );

  const decSub = [[5.7, 2.3], [8.5, 3.8], [4.1, 1.6], [7.9, 2.4], [6.3, 0.8]];
  decSub.forEach(([a, b]) =>
    qs.push({ text: `${a} − ${b}`, answer: String(+(a - b).toFixed(1)), category: "Décimaux" })
  );

  const fracN = [
    ["1/2", 60, 30], ["1/2", 48, 24], ["1/4", 100, 25], ["1/4", 80, 20],
    ["3/4", 100, 75], ["3/4", 40, 30], ["1/3", 90, 30], ["1/3", 60, 20],
    ["2/3", 90, 60], ["1/5", 100, 20], ["1/5", 50, 10], ["2/5", 100, 40],
  ] as const;
  fracN.forEach(([f, n, r]) =>
    qs.push({ text: `${f} de ${n}`, answer: String(r), category: "Fraction d'un nombre" })
  );

  const prio = [
    ["3 + 4 × 2", 11], ["5 + 2 × 3", 11], ["10 − 2 × 3", 4],
    ["1 + 5 × 5", 26], ["7 + 3 × 3", 16], ["20 − 4 × 3", 8],
    ["2 × 6 + 1", 13], ["3 × 7 − 5", 16],
  ] as const;
  prio.forEach(([t, r]) =>
    qs.push({ text: String(t), answer: String(r), category: "Priorités opératoires" })
  );

  for (let c = 2; c <= 8; c++)
    qs.push({ text: `Périmètre d'un carré de côté ${c} cm`, answer: String(c * 4), category: "Périmètres", hint: `P = 4 × ${c}` });

  const rects = [[3, 5], [4, 7], [2, 9], [6, 8], [5, 10]];
  rects.forEach(([l, L]) =>
    qs.push({ text: `Périmètre : L=${L} cm, l=${l} cm`, answer: String(2 * (l + L)), category: "Périmètres", hint: `P = 2×(${L}+${l})` })
  );

  for (let c = 2; c <= 8; c++)
    qs.push({ text: `Aire d'un carré de côté ${c} cm`, answer: String(c * c), category: "Aires", hint: `A = ${c}²` });

  rects.forEach(([l, L]) =>
    qs.push({ text: `Aire : L=${L} cm, l=${l} cm`, answer: String(l * L), category: "Aires", hint: `A = ${L}×${l}` })
  );

  const propor = [
    ["3 stylos = 6 €. Prix de 7 stylos ?", 14, "1 stylo = 2 €"],
    ["5 kg = 15 €. Prix de 3 kg ?", 9, "1 kg = 3 €"],
    ["4 cahiers = 12 €. Prix de 6 ?", 18, "1 cahier = 3 €"],
    ["2 m = 10 €. Prix de 5 m ?", 25, "1 m = 5 €"],
  ] as const;
  propor.forEach(([t, r, h]) =>
    qs.push({ text: String(t), answer: String(r), category: "Proportionnalité", hint: String(h) })
  );

  return qs;
}

// ─── 4ÈME ──────────────────────────────────────────────────
export function get4emeQuestions(): Question[] {
  const qs = get5emeQuestions();

  const relAdd = [
    ["(−3) + 5", 2], ["(−7) + 2", -5], ["4 + (−9)", -5],
    ["(−6) + (−3)", -9], ["8 + (−3)", 5], ["(−10) + 10", 0],
    ["(−4) + 7", 3], ["(−8) + (−2)", -10],
  ] as const;
  relAdd.forEach(([t, r]) =>
    qs.push({ text: String(t), answer: String(r), category: "Nombres relatifs" })
  );

  const relSub = [
    ["5 − 8", -3], ["3 − 10", -7], ["(−2) − 4", -6],
    ["(−5) − (−3)", -2], ["7 − (−2)", 9], ["0 − 6", -6],
    ["(−1) − (−1)", 0], ["(−3) − 7", -10],
  ] as const;
  relSub.forEach(([t, r]) =>
    qs.push({ text: String(t), answer: String(r), category: "Nombres relatifs" })
  );

  const relMul = [
    ["(−3) × 4", -12], ["(−5) × (−2)", 10], ["7 × (−3)", -21],
    ["(−6) × (−6)", 36], ["(−1) × 15", -15], ["(−4) × (−5)", 20],
  ] as const;
  relMul.forEach(([t, r]) =>
    qs.push({ text: String(t), answer: String(r), category: "Produit de relatifs" })
  );

  const puis = [
    ["2³", 8], ["3²", 9], ["5²", 25], ["10³", 1000],
    ["2⁴", 16], ["3³", 27], ["4²", 16], ["2⁵", 32],
    ["10²", 100], ["7²", 49], ["6²", 36], ["10⁴", 10000],
  ] as const;
  puis.forEach(([t, r]) =>
    qs.push({ text: String(t), answer: String(r), category: "Puissances" })
  );

  const distrib = [
    ["3 × (4 + 5)", 27, "= 3×4 + 3×5"], ["2 × (10 − 3)", 14, "= 2×10 − 2×3"],
    ["5 × (6 + 2)", 40, "= 5×6 + 5×2"], ["4 × (7 − 1)", 24, "= 4×7 − 4×1"],
    ["6 × (3 + 4)", 42, "= 6×3 + 6×4"], ["7 × (5 − 2)", 21, "= 7×5 − 7×2"],
  ] as const;
  distrib.forEach(([t, r, h]) =>
    qs.push({ text: String(t), answer: String(r), category: "Distributivité", hint: String(h) })
  );

  const pourc = [
    ["10% de 200", 20], ["25% de 80", 20], ["50% de 60", 30],
    ["20% de 150", 30], ["75% de 40", 30], ["10% de 350", 35],
    ["5% de 200", 10], ["30% de 100", 30], ["15% de 200", 30],
  ] as const;
  pourc.forEach(([t, r]) =>
    qs.push({ text: String(t), answer: String(r), category: "Pourcentages" })
  );

  const fracAdd = [
    ["1/4 + 2/4", "0.75", "= 3/4"], ["3/5 + 1/5", "0.8", "= 4/5"],
    ["2/7 + 3/7", "0.714", "= 5/7"], ["1/3 + 1/3", "0.667", "= 2/3"],
    ["5/8 + 1/8", "0.75", "= 6/8 = 3/4"],
  ] as const;
  fracAdd.forEach(([t, r, h]) =>
    qs.push({ text: String(t), answer: String(r), category: "Fractions", hint: String(h) })
  );

  const fracMul = [
    ["1/2 × 1/3", "0.167", "= 1/6"], ["2/3 × 3/4", "0.5", "= 6/12 = 1/2"],
    ["1/4 × 2/5", "0.1", "= 2/20 = 1/10"], ["3/5 × 5/6", "0.5", "= 15/30 = 1/2"],
  ] as const;
  fracMul.forEach(([t, r, h]) =>
    qs.push({ text: String(t), answer: String(r), category: "Fractions", hint: String(h) })
  );

  const angles = [
    ["Complément de 30°", 60, "90 − 30"], ["Complément de 45°", 45, "90 − 45"],
    ["Complément de 70°", 20, "90 − 70"], ["Supplément de 110°", 70, "180 − 110"],
    ["Supplément de 60°", 120, "180 − 60"], ["Supplément de 90°", 90, "180 − 90"],
  ] as const;
  angles.forEach(([t, r, h]) =>
    qs.push({ text: String(t), answer: String(r), category: "Angles", hint: String(h) })
  );

  return qs;
}
