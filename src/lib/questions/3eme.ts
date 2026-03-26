import { Question } from "./types";

export function get3emeQuestions(): Question[] {
  const qs: Question[] = [];

  // ═══════════════════════════════════════════════════════════
  // R5 – Additions et soustractions de relatifs
  // ═══════════════════════════════════════════════════════════
  const r5: [string, number][] = [
    ["(−3) + 5", 2], ["(−7) + 2", -5], ["4 + (−9)", -5],
    ["(−6) + (−3)", -9], ["8 + (−3)", 5], ["(−10) + 10", 0],
    ["5 − 8", -3], ["3 − 10", -7], ["(−2) − 4", -6],
    ["(−5) − (−3)", -2], ["7 − (−2)", 9], ["0 − 6", -6],
  ];
  r5.forEach(([t, r]) =>
    qs.push({ text: t, answer: String(r), category: "Relatifs : add/sub" })
  );

  // ═══════════════════════════════════════════════════════════
  // R6 – Multiplications et divisions de relatifs
  // ═══════════════════════════════════════════════════════════
  const r6: [string, number][] = [
    ["(−3) × 4", -12], ["(−5) × (−2)", 10], ["7 × (−3)", -21],
    ["(−6) × (−6)", 36], ["(−1) × 15", -15], ["(−4) × (−5)", 20],
    ["(−12) ÷ 3", -4], ["(−20) ÷ (−5)", 4], ["18 ÷ (−3)", -6],
    ["(−24) ÷ (−8)", 3],
  ];
  r6.forEach(([t, r]) =>
    qs.push({ text: t, answer: String(r), category: "Relatifs : mul/div" })
  );

  // ═══════════════════════════════════════════════════════════
  // N1 – Prendre une fraction d'une quantité
  // ═══════════════════════════════════════════════════════════
  const n1: [string, number, string][] = [
    ["1/4 de 80", 20, "80 ÷ 4"], ["3/4 de 120", 90, "120 ÷ 4 × 3"],
    ["2/5 de 100", 40, "100 ÷ 5 × 2"], ["1/3 de 90", 30, "90 ÷ 3"],
    ["2/3 de 60", 40, "60 ÷ 3 × 2"], ["3/5 de 200", 120, "200 ÷ 5 × 3"],
  ];
  n1.forEach(([t, r, h]) =>
    qs.push({ text: t, answer: String(r), category: "Fraction d'une quantité", hint: h })
  );

  // ═══════════════════════════════════════════════════════════
  // N4 – Produire des quotients égaux
  // ═══════════════════════════════════════════════════════════
  const n4: [string, number, string][] = [
    ["3/4 = ?/12", 9, "× 3"], ["2/5 = ?/15", 6, "× 3"],
    ["5/6 = ?/18", 15, "× 3"], ["1/3 = ?/21", 7, "× 7"],
    ["4/7 = ?/28", 16, "× 4"],
  ];
  n4.forEach(([t, r, h]) =>
    qs.push({ text: t, answer: String(r), category: "Quotients égaux", hint: h })
  );

  // ═══════════════════════════════════════════════════════════
  // N5 – Additionner, soustraire deux rationnels
  // ═══════════════════════════════════════════════════════════
  const n5: [string, string, string][] = [
    ["1/4 + 2/4", "0.75", "= 3/4"],
    ["3/5 + 1/5", "0.8", "= 4/5"],
    ["7/8 − 3/8", "0.5", "= 4/8 = 1/2"],
    ["5/6 − 1/6", "0.667", "= 4/6 = 2/3"],
    ["1/3 + 1/6", "0.5", "= 2/6 + 1/6 = 3/6 = 1/2"],
    ["3/4 + 1/4", "1", "= 4/4 = 1"],
    ["5/8 + 3/8", "1", "= 8/8 = 1"],
  ];
  n5.forEach(([t, r, h]) =>
    qs.push({ text: t, answer: r, category: "Add/sub fractions", hint: h })
  );

  // ═══════════════════════════════════════════════════════════
  // N6 – Multiplier deux rationnels
  // ═══════════════════════════════════════════════════════════
  const n6: [string, number, string][] = [
    ["2/3 × 6", 4, "= 12/3"], ["3/4 × 8", 6, "= 24/4"],
    ["5/2 × 4", 10, "= 20/2"], ["1/5 × 15", 3, "= 15/5"],
    ["7/3 × 9", 21, "= 63/3"],
  ];
  n6.forEach(([t, r, h]) =>
    qs.push({ text: t, answer: String(r), category: "Multiplier rationnels", hint: h })
  );

  // ═══════════════════════════════════════════════════════════
  // N7 – Diviser deux rationnels
  // ═══════════════════════════════════════════════════════════
  const n7: [string, number, string][] = [
    ["6 ÷ (1/2)", 12, "= 6 × 2"], ["10 ÷ (1/5)", 50, "= 10 × 5"],
    ["8 ÷ (2/3)", 12, "= 8 × 3/2"], ["15 ÷ (3/5)", 25, "= 15 × 5/3"],
  ];
  n7.forEach(([t, r, h]) =>
    qs.push({ text: t, answer: String(r), category: "Diviser rationnels", hint: h })
  );

  // ═══════════════════════════════════════════════════════════
  // N8 – Différentes écritures d'un rationnel
  // ═══════════════════════════════════════════════════════════
  const n8: [string, string, string][] = [
    ["3/4 en décimal", "0.75", "= 0,75"],
    ["1/5 en décimal", "0.2", "= 0,2"],
    ["7/2 en décimal", "3.5", "= 3,5"],
    ["9/4 en décimal", "2.25", "= 2,25"],
    ["1/8 en décimal", "0.125", "= 0,125"],
  ];
  n8.forEach(([t, r, h]) =>
    qs.push({ text: t, answer: r, category: "Écritures d'un rationnel", hint: h })
  );

  // ═══════════════════════════════════════════════════════════
  // P1 – Puissances de 10
  // ═══════════════════════════════════════════════════════════
  const p1: [string, string][] = [
    ["10²", "100"], ["10³", "1000"], ["10⁴", "10000"],
    ["10⁵", "100000"], ["10¹", "10"], ["10⁰", "1"],
  ];
  p1.forEach(([t, r]) =>
    qs.push({ text: t, answer: r, category: "Puissances de 10" })
  );

  // ═══════════════════════════════════════════════════════════
  // P2 – Notation scientifique
  // ═══════════════════════════════════════════════════════════
  const p2: [string, string][] = [
    ["3,5 × 10²", "350"], ["1,2 × 10³", "1200"],
    ["4 × 10⁴", "40000"], ["7,1 × 10¹", "71"],
    ["2,5 × 10²", "250"], ["6 × 10³", "6000"],
    ["8,4 × 10²", "840"], ["5 × 10⁵", "500000"],
  ];
  p2.forEach(([t, r]) =>
    qs.push({ text: t, answer: r, category: "Notation scientifique" })
  );

  // ═══════════════════════════════════════════════════════════
  // P4 – Puissances d'exposant positif
  // ═══════════════════════════════════════════════════════════
  const p4: [string, string, string][] = [
    ["2³", "8", "2×2×2"], ["3²", "9", "3×3"], ["5²", "25", "5×5"],
    ["2⁴", "16", "2×2×2×2"], ["3³", "27", "3×3×3"], ["4³", "64", "4×4×4"],
    ["2⁵", "32", "2⁴×2"], ["5³", "125", "5×5×5"],
    ["7²", "49", "7×7"], ["6²", "36", "6×6"],
    ["10² × 10³", "100000", "= 10⁵"], ["2³ × 2²", "32", "= 2⁵"],
    ["5⁴ ÷ 5²", "25", "= 5²"], ["3² × 3", "27", "= 3³"],
    ["(2³)²", "64", "= 2⁶"],
  ];
  p4.forEach(([t, r, h]) =>
    qs.push({ text: t, answer: r, category: "Puissances", hint: h })
  );

  // ═══════════════════════════════════════════════════════════
  // P5 – Puissances d'exposant négatif
  // ═══════════════════════════════════════════════════════════
  const p5: [string, string, string][] = [
    ["10⁻¹", "0.1", "= 1/10"], ["10⁻²", "0.01", "= 1/100"],
    ["10⁻³", "0.001", "= 1/1000"], ["2⁻¹", "0.5", "= 1/2"],
    ["5⁻¹", "0.2", "= 1/5"], ["4⁻¹", "0.25", "= 1/4"],
  ];
  p5.forEach(([t, r, h]) =>
    qs.push({ text: t, answer: r, category: "Puissances négatives", hint: h })
  );

  // ═══════════════════════════════════════════════════════════
  // RC1 – Carrés parfaits de 1 à 12
  // ═══════════════════════════════════════════════════════════
  for (let i = 1; i <= 12; i++)
    qs.push({ text: `${i}²`, answer: String(i * i), category: "Carrés parfaits" });

  // ═══════════════════════════════════════════════════════════
  // RC1/RC2 – Racines carrées
  // ═══════════════════════════════════════════════════════════
  [1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144].forEach(n =>
    qs.push({ text: `√${n}`, answer: String(Math.sqrt(n)), category: "Racines carrées" })
  );

  // RC2 – Partie entière de √n
  const rc2: [number, number][] = [
    [5, 2], [10, 3], [20, 4], [30, 5], [50, 7], [70, 8], [90, 9], [150, 12],
  ];
  rc2.forEach(([n, r]) =>
    qs.push({ text: `Partie entière de √${n}`, answer: String(r), category: "Encadrer √", hint: `${r}² = ${r*r} < ${n} < ${(r+1)*(r+1)} = ${r+1}²` })
  );

  // ═══════════════════════════════════════════════════════════
  // CL1 – Programme de calcul
  // ═══════════════════════════════════════════════════════════
  const cl1: [string, number, string][] = [
    ["Choisir 5, doubler, ajouter 3", 13, "5×2+3"],
    ["Choisir 4, tripler, retirer 2", 10, "4×3−2"],
    ["Choisir 7, ajouter 3, doubler", 20, "(7+3)×2"],
    ["Choisir 6, élever au carré, retirer 1", 35, "6²−1"],
    ["Choisir 3, doubler, élever au carré", 36, "(3×2)²"],
  ];
  cl1.forEach(([t, r, h]) =>
    qs.push({ text: t, answer: String(r), category: "Programme de calcul", hint: h })
  );

  // ═══════════════════════════════════════════════════════════
  // CL3 – Calculer par substitution
  // ═══════════════════════════════════════════════════════════
  const cl3: [string, number][] = [
    ["A = 3x + 2 pour x = 4", 14], ["A = 5x − 1 pour x = 3", 14],
    ["A = x² + 1 pour x = 5", 26], ["A = 2x² pour x = 3", 18],
    ["A = 4x − 3 pour x = 2", 5], ["A = x² − x pour x = 4", 12],
    ["A = 3x + 7 pour x = −1", 4], ["A = 2x² − 5 pour x = 3", 13],
  ];
  cl3.forEach(([t, r]) =>
    qs.push({ text: t, answer: String(r), category: "Substitution" })
  );

  // ═══════════════════════════════════════════════════════════
  // CL4 – Distributivité simple (développer)
  // ═══════════════════════════════════════════════════════════
  const cl4: [string, number, string][] = [
    ["3 × (4 + 5)", 27, "= 12 + 15"], ["2 × (10 − 3)", 14, "= 20 − 6"],
    ["5 × (6 + 2)", 40, "= 30 + 10"], ["4 × (7 − 1)", 24, "= 28 − 4"],
    ["6 × (3 + 4)", 42, "= 18 + 24"], ["7 × (5 − 2)", 21, "= 35 − 14"],
  ];
  cl4.forEach(([t, r, h]) =>
    qs.push({ text: t, answer: String(r), category: "Distributivité", hint: h })
  );

  // ═══════════════════════════════════════════════════════════
  // CL5 – Double distributivité
  // ═══════════════════════════════════════════════════════════
  const cl5: [string, number, string][] = [
    ["(2 + 3)(4 + 1)", 25, "= 8+2+12+3"],
    ["(3 + 1)(5 + 2)", 28, "= 15+6+5+2"],
    ["(4 + 2)(3 + 5)", 48, "= 12+20+6+10"],
    ["(5 − 1)(3 + 2)", 20, "= 15+10−3−2"],
  ];
  cl5.forEach(([t, r, h]) =>
    qs.push({ text: t, answer: String(r), category: "Double distributivité", hint: h })
  );

  // ═══════════════════════════════════════════════════════════
  // CL8 – Double, triple, moitié, carré d'un nombre
  // ═══════════════════════════════════════════════════════════
  const cl8: [string, number][] = [
    ["Double de 17", 34], ["Double de 45", 90],
    ["Triple de 13", 39], ["Triple de 25", 75],
    ["Moitié de 38", 19], ["Moitié de 74", 37],
    ["Carré de 11", 121], ["Carré de 15", 225],
  ];
  cl8.forEach(([t, r]) =>
    qs.push({ text: t, answer: String(r), category: "Double, triple, carré" })
  );

  // ═══════════════════════════════════════════════════════════
  // CL11 – Résoudre ax = b
  // ═══════════════════════════════════════════════════════════
  const cl11: [string, number][] = [
    ["3x = 12 → x", 4], ["5x = 35 → x", 7],
    ["4x = −20 → x", -5], ["2x = 0 → x", 0],
    ["−3x = 15 → x", -5], ["7x = 49 → x", 7],
  ];
  cl11.forEach(([t, r]) =>
    qs.push({ text: t, answer: String(r), category: "Équation ax = b" })
  );

  // ═══════════════════════════════════════════════════════════
  // CL12 – Résoudre x + a = b
  // ═══════════════════════════════════════════════════════════
  const cl12: [string, number][] = [
    ["x + 7 = 12 → x", 5], ["x + 3 = −1 → x", -4],
    ["x − 5 = 8 → x", 13], ["x − 4 = −2 → x", 2],
  ];
  cl12.forEach(([t, r]) =>
    qs.push({ text: t, answer: String(r), category: "Équation x + a = b" })
  );

  // ═══════════════════════════════════════════════════════════
  // CL13 – Résoudre ax + b = c
  // ═══════════════════════════════════════════════════════════
  const cl13: [string, number, string][] = [
    ["2x + 1 = 9 → x", 4, "2x = 8"],
    ["5x − 3 = 12 → x", 3, "5x = 15"],
    ["3x + 4 = 19 → x", 5, "3x = 15"],
    ["4x − 7 = 13 → x", 5, "4x = 20"],
    ["6x + 2 = 20 → x", 3, "6x = 18"],
  ];
  cl13.forEach(([t, r, h]) =>
    qs.push({ text: t, answer: String(r), category: "Équation ax + b = c", hint: h })
  );

  // ═══════════════════════════════════════════════════════════
  // CL14 – Résoudre ax + b = c + d (type ax + b = cx + d)
  // ═══════════════════════════════════════════════════════════
  const cl14: [string, number, string][] = [
    ["3x + 1 = x + 7 → x", 3, "2x = 6"],
    ["5x − 2 = 2x + 10 → x", 4, "3x = 12"],
    ["4x + 3 = x + 15 → x", 4, "3x = 12"],
  ];
  cl14.forEach(([t, r, h]) =>
    qs.push({ text: t, answer: String(r), category: "Équation ax+b = cx+d", hint: h })
  );

  // ═══════════════════════════════════════════════════════════
  // CL17 – (a+b)(a−b) = a²−b²
  // ═══════════════════════════════════════════════════════════
  const cl17: [string, number, string][] = [
    ["(7 + 3)(7 − 3)", 40, "= 49 − 9"],
    ["(10 + 2)(10 − 2)", 96, "= 100 − 4"],
    ["(5 + 4)(5 − 4)", 9, "= 25 − 16"],
    ["(8 + 1)(8 − 1)", 63, "= 64 − 1"],
  ];
  cl17.forEach(([t, r, h]) =>
    qs.push({ text: t, answer: String(r), category: "Identité (a+b)(a−b)", hint: h })
  );

  // ═══════════════════════════════════════════════════════════
  // CL18 – Factoriser a² − b²
  // ═══════════════════════════════════════════════════════════
  const cl18: [string, number, string][] = [
    ["9² − 4²", 65, "= (9+4)(9−4) = 65"],
    ["10² − 3²", 91, "= (10+3)(10−3) = 91"],
    ["7² − 2²", 45, "= (7+2)(7−2) = 45"],
    ["12² − 5²", 119, "= (12+5)(12−5) = 119"],
  ];
  cl18.forEach(([t, r, h]) =>
    qs.push({ text: t, answer: String(r), category: "Différence de carrés", hint: h })
  );

  // ═══════════════════════════════════════════════════════════
  // T2 – Calculer l'hypoténuse (Pythagore)
  // ═══════════════════════════════════════════════════════════
  const t2: [string, number, string][] = [
    ["Triangle rect. : a=3, b=4. Hyp = ?", 5, "√(9+16) = √25"],
    ["Triangle rect. : a=5, b=12. Hyp = ?", 13, "√(25+144) = √169"],
    ["Triangle rect. : a=6, b=8. Hyp = ?", 10, "√(36+64) = √100"],
  ];
  t2.forEach(([t, r, h]) =>
    qs.push({ text: t, answer: String(r), category: "Pythagore : hypoténuse", hint: h })
  );

  // ═══════════════════════════════════════════════════════════
  // T3 – Calculer un côté de l'angle droit
  // ═══════════════════════════════════════════════════════════
  const t3: [string, number, string][] = [
    ["Hyp=5, a=3. Autre côté = ?", 4, "√(25−9) = √16"],
    ["Hyp=13, a=5. Autre côté = ?", 12, "√(169−25) = √144"],
    ["Hyp=10, a=6. Autre côté = ?", 8, "√(100−36) = √64"],
  ];
  t3.forEach(([t, r, h]) =>
    qs.push({ text: t, answer: String(r), category: "Pythagore : côté", hint: h })
  );

  // ═══════════════════════════════════════════════════════════
  // T10 / A1 – Somme des angles d'un triangle
  // ═══════════════════════════════════════════════════════════
  const angles: [string, number, string][] = [
    ["Angles 50° et 60°. 3e angle ?", 70, "180 − 50 − 60"],
    ["Angles 90° et 35°. 3e angle ?", 55, "180 − 90 − 35"],
    ["Angles 40° et 80°. 3e angle ?", 60, "180 − 40 − 80"],
    ["Angles 72° et 54°. 3e angle ?", 54, "180 − 72 − 54"],
    ["Angles 30° et 60°. 3e angle ?", 90, "180 − 30 − 60"],
  ];
  angles.forEach(([t, r, h]) =>
    qs.push({ text: t, answer: String(r), category: "Somme angles triangle", hint: h })
  );

  // ═══════════════════════════════════════════════════════════
  // A2 – Angles complémentaires et supplémentaires
  // ═══════════════════════════════════════════════════════════
  const a2: [string, number, string][] = [
    ["Complément de 30°", 60, "90 − 30"],
    ["Complément de 55°", 35, "90 − 55"],
    ["Complément de 15°", 75, "90 − 15"],
    ["Supplément de 110°", 70, "180 − 110"],
    ["Supplément de 45°", 135, "180 − 45"],
    ["Supplément de 72°", 108, "180 − 72"],
  ];
  a2.forEach(([t, r, h]) =>
    qs.push({ text: t, answer: String(r), category: "Angles comp./suppl.", hint: h })
  );

  // ═══════════════════════════════════════════════════════════
  // S1 – Calculer une moyenne
  // ═══════════════════════════════════════════════════════════
  const s1: [string, number, string][] = [
    ["Moyenne de 10, 14, 12", 12, "(10+14+12)÷3"],
    ["Moyenne de 8, 12, 16, 4", 10, "(8+12+16+4)÷4"],
    ["Moyenne de 15, 20, 25", 20, "(15+20+25)÷3"],
    ["Moyenne de 6, 10, 8, 12, 4", 8, "somme=40, ÷5"],
  ];
  s1.forEach(([t, r, h]) =>
    qs.push({ text: t, answer: String(r), category: "Moyenne", hint: h })
  );

  // ═══════════════════════════════════════════════════════════
  // S2 – Médiane d'une petite série
  // ═══════════════════════════════════════════════════════════
  const s2: [string, number, string][] = [
    ["Médiane de 3, 7, 9, 12, 15", 9, "5 valeurs → 3e"],
    ["Médiane de 2, 5, 8, 11, 14, 17, 20", 11, "7 valeurs → 4e"],
    ["Médiane de 1, 4, 6", 4, "3 valeurs → 2e"],
  ];
  s2.forEach(([t, r, h]) =>
    qs.push({ text: t, answer: String(r), category: "Médiane", hint: h })
  );

  // ═══════════════════════════════════════════════════════════
  // S3 – Étendue d'une série
  // ═══════════════════════════════════════════════════════════
  const s3: [string, number, string][] = [
    ["Étendue de 3, 7, 12, 5, 20", 17, "20 − 3"],
    ["Étendue de 8, 15, 3, 22, 10", 19, "22 − 3"],
    ["Étendue de 4, 4, 9, 1, 6", 8, "9 − 1"],
  ];
  s3.forEach(([t, r, h]) =>
    qs.push({ text: t, answer: String(r), category: "Étendue", hint: h })
  );

  // ═══════════════════════════════════════════════════════════
  // Pr9 – Appliquer un pourcentage à une quantité
  // ═══════════════════════════════════════════════════════════
  const pr9: [string, number][] = [
    ["10% de 200", 20], ["25% de 80", 20], ["50% de 60", 30],
    ["20% de 150", 30], ["75% de 40", 30], ["5% de 200", 10],
    ["30% de 100", 30], ["15% de 200", 30],
  ];
  pr9.forEach(([t, r]) =>
    qs.push({ text: t, answer: String(r), category: "Pourcentage d'une quantité" })
  );

  // ═══════════════════════════════════════════════════════════
  // Pr13 – Augmentation / diminution en %
  // ═══════════════════════════════════════════════════════════
  const pr13: [string, number, string][] = [
    ["100 € augmenté de 20%", 120, "+20 €"],
    ["200 € diminué de 15%", 170, "−30 €"],
    ["50 € augmenté de 10%", 55, "+5 €"],
    ["80 € diminué de 25%", 60, "−20 €"],
    ["150 € augmenté de 40%", 210, "+60 €"],
  ];
  pr13.forEach(([t, r, h]) =>
    qs.push({ text: t, answer: String(r), category: "Augmentation / diminution %", hint: h })
  );

  // ═══════════════════════════════════════════════════════════
  // Pr10 – Quatrième proportionnelle
  // ═══════════════════════════════════════════════════════════
  const pr10: [string, number, string][] = [
    ["3 kg → 6 €. 7 kg → ? €", 14, "1 kg = 2 €"],
    ["5 L → 15 €. 3 L → ? €", 9, "1 L = 3 €"],
    ["4 m → 12 €. 6 m → ? €", 18, "1 m = 3 €"],
    ["2 h → 90 km. 5 h → ? km", 225, "1 h = 45 km"],
  ];
  pr10.forEach(([t, r, h]) =>
    qs.push({ text: t, answer: String(r), category: "Proportionnalité", hint: h })
  );

  // ═══════════════════════════════════════════════════════════
  // Pr3 – Partager selon un ratio
  // ═══════════════════════════════════════════════════════════
  const pr3: [string, number, string][] = [
    ["Partager 100 en 2:3. Plus grande part ?", 60, "5 parts → 1=20"],
    ["Partager 80 en 3:1. Plus grande part ?", 60, "4 parts → 1=20"],
    ["Partager 120 en 1:2. Plus grande part ?", 80, "3 parts → 1=40"],
  ];
  pr3.forEach(([t, r, h]) =>
    qs.push({ text: t, answer: String(r), category: "Partage selon ratio", hint: h })
  );

  // ═══════════════════════════════════════════════════════════
  // Pr14 – Problèmes de vitesses
  // ═══════════════════════════════════════════════════════════
  const pr14: [string, number, string][] = [
    ["v = 60 km/h, t = 3 h. d = ?", 180, "d = v × t"],
    ["d = 100 km, t = 2 h. v = ?", 50, "v = d ÷ t"],
    ["d = 150 km, v = 50 km/h. t = ?", 3, "t = d ÷ v"],
    ["v = 80 km/h, t = 2 h. d = ?", 160, "d = v × t"],
  ];
  pr14.forEach(([t, r, h]) =>
    qs.push({ text: t, answer: String(r), category: "Vitesse / distance / temps", hint: h })
  );

  // ═══════════════════════════════════════════════════════════
  // Pb2 – Probabilités simples (une épreuve)
  // ═══════════════════════════════════════════════════════════
  const pb2: [string, string, string][] = [
    ["Proba de tirer un 6 sur un dé", "0.167", "= 1/6"],
    ["Proba pile avec une pièce", "0.5", "= 1/2"],
    ["Proba pair sur un dé", "0.5", "= 3/6"],
    ["Proba carte cœur (jeu de 32)", "0.25", "= 8/32"],
  ];
  pb2.forEach(([t, r, h]) =>
    qs.push({ text: t, answer: r, category: "Probabilité simple", hint: h })
  );

  // ═══════════════════════════════════════════════════════════
  // Pb4 – Événement contraire
  // ═══════════════════════════════════════════════════════════
  const pb4: [string, string, string][] = [
    ["P(A) = 0,3. P(contraire) = ?", "0.7", "1 − 0,3"],
    ["P(A) = 0,85. P(contraire) = ?", "0.15", "1 − 0,85"],
    ["P(A) = 1/4. P(contraire) = ?", "0.75", "1 − 0,25 = 0,75"],
  ];
  pb4.forEach(([t, r, h]) =>
    qs.push({ text: t, answer: r, category: "Événement contraire", hint: h })
  );

  // ═══════════════════════════════════════════════════════════
  // D2 – Convertir heures en minutes
  // ═══════════════════════════════════════════════════════════
  const d2: [string, number][] = [
    ["2 h en minutes", 120], ["3 h 30 en minutes", 210],
    ["1 h 45 en minutes", 105], ["4 h 15 en minutes", 255],
  ];
  d2.forEach(([t, r]) =>
    qs.push({ text: t, answer: String(r), category: "Conversions de durées" })
  );

  // ═══════════════════════════════════════════════════════════
  // D3 – Convertir minutes en h min
  // ═══════════════════════════════════════════════════════════
  // answer = total hours (decimal doesn't work well), use minutes in the hour
  const d3: [string, number, string][] = [
    ["135 min = ? h et ? min. Combien de min ?", 15, "135 = 2h15"],
    ["200 min = ? h et ? min. Combien de min ?", 20, "200 = 3h20"],
    ["90 min = ? h et ? min. Combien de min ?", 30, "90 = 1h30"],
  ];
  d3.forEach(([t, r, h]) =>
    qs.push({ text: t, answer: String(r), category: "Conversions de durées", hint: h })
  );

  // ═══════════════════════════════════════════════════════════
  // C1 – Conversions d'unités simples
  // ═══════════════════════════════════════════════════════════
  const c1: [string, number, string][] = [
    ["3 km en m", 3000, "× 1000"], ["5 m en cm", 500, "× 100"],
    ["2000 m en km", 2, "÷ 1000"], ["150 cm en m", 1.5, "÷ 100"],
    ["4 kg en g", 4000, "× 1000"], ["500 g en kg", 0.5, "÷ 1000"],
    ["2 L en mL", 2000, "× 1000"], ["3500 mL en L", 3.5, "÷ 1000"],
  ];
  c1.forEach(([t, r, h]) =>
    qs.push({ text: t, answer: String(r), category: "Conversions d'unités", hint: h })
  );

  // ═══════════════════════════════════════════════════════════
  // G1 – Périmètre de polygones
  // ═══════════════════════════════════════════════════════════
  const g1: [string, number, string][] = [
    ["Périm. carré côté 7 cm", 28, "4 × 7"],
    ["Périm. rectangle 5×3 cm", 16, "2×(5+3)"],
    ["Périm. triangle équil. côté 6 cm", 18, "3 × 6"],
    ["Périm. rectangle 8×4 cm", 24, "2×(8+4)"],
  ];
  g1.forEach(([t, r, h]) =>
    qs.push({ text: t, answer: String(r), category: "Périmètres", hint: h })
  );

  // ═══════════════════════════════════════════════════════════
  // G3 – Aires des figures usuelles
  // ═══════════════════════════════════════════════════════════
  const g3: [string, number, string][] = [
    ["Aire carré côté 9 cm", 81, "9²"],
    ["Aire rectangle 7×4 cm", 28, "7 × 4"],
    ["Aire triangle base 10, h 6 cm", 30, "10×6÷2"],
    ["Aire rectangle 12×5 cm", 60, "12 × 5"],
    ["Aire carré côté 11 cm", 121, "11²"],
  ];
  g3.forEach(([t, r, h]) =>
    qs.push({ text: t, answer: String(r), category: "Aires", hint: h })
  );

  // ═══════════════════════════════════════════════════════════
  // G4 – Volumes
  // ═══════════════════════════════════════════════════════════
  const g4: [string, number, string][] = [
    ["Volume cube arête 3 cm", 27, "3³"],
    ["Volume pavé 4×3×2 cm", 24, "4×3×2"],
    ["Volume cube arête 5 cm", 125, "5³"],
    ["Volume pavé 6×5×2 cm", 60, "6×5×2"],
    ["Volume cube arête 10 cm", 1000, "10³"],
  ];
  g4.forEach(([t, r, h]) =>
    qs.push({ text: t, answer: String(r), category: "Volumes", hint: h })
  );

  // ═══════════════════════════════════════════════════════════
  // F2/F4 – Image par une fonction linéaire
  // ═══════════════════════════════════════════════════════════
  const f4: [string, number][] = [
    ["f(x) = 3x. f(4) = ?", 12], ["f(x) = −2x. f(5) = ?", -10],
    ["f(x) = 0,5x. f(8) = ?", 4], ["f(x) = 7x. f(3) = ?", 21],
    ["f(x) = −4x. f(−2) = ?", 8], ["f(x) = 6x. f(−1) = ?", -6],
  ];
  f4.forEach(([t, r]) =>
    qs.push({ text: t, answer: String(r), category: "Fonction linéaire" })
  );

  // ═══════════════════════════════════════════════════════════
  // F5 – Image par une fonction affine
  // ═══════════════════════════════════════════════════════════
  const f5: [string, number][] = [
    ["g(x) = 2x + 3. g(4) = ?", 11], ["g(x) = 3x − 1. g(5) = ?", 14],
    ["g(x) = −x + 7. g(3) = ?", 4], ["g(x) = 4x − 5. g(2) = ?", 3],
    ["g(x) = −2x + 10. g(3) = ?", 4], ["g(x) = 5x + 1. g(−1) = ?", -4],
  ];
  f5.forEach(([t, r]) =>
    qs.push({ text: t, answer: String(r), category: "Fonction affine" })
  );

  // ═══════════════════════════════════════════════════════════
  // PGCD (petits nombres)
  // ═══════════════════════════════════════════════════════════
  const pgcd: [string, string][] = [
    ["PGCD(12, 8)", "4"], ["PGCD(18, 12)", "6"], ["PGCD(24, 36)", "12"],
    ["PGCD(15, 25)", "5"], ["PGCD(14, 21)", "7"], ["PGCD(20, 30)", "10"],
  ];
  pgcd.forEach(([t, r]) =>
    qs.push({ text: t, answer: r, category: "PGCD" })
  );

  // ═══════════════════════════════════════════════════════════
  // Priorités opératoires (rappel)
  // ═══════════════════════════════════════════════════════════
  const prio: [string, number][] = [
    ["3 + 4 × 2", 11], ["5 + 2 × 3", 11],
    ["10 − 2 × 3", 4], ["20 − 4 × 3", 8],
    ["2 × 6 + 1", 13], ["3 × 7 − 5", 16],
  ];
  prio.forEach(([t, r]) =>
    qs.push({ text: t, answer: String(r), category: "Priorités opératoires" })
  );

  // ═══════════════════════════════════════════════════════════
  // Tables de multiplication (rappel rapide)
  // ═══════════════════════════════════════════════════════════
  const tables: [number, number][] = [
    [7, 8], [9, 6], [8, 9], [7, 6], [9, 7], [8, 7],
    [6, 9], [7, 9], [12, 11], [11, 12],
  ];
  tables.forEach(([a, b]) =>
    qs.push({ text: `${a} × ${b}`, answer: String(a * b), category: "Tables" })
  );

  // ═══════════════════════════════════════════════════════════════════════
  //  QUESTIONS ISSUES DES BREVETS 2024 ET 2025 (sujets 0 + sessions)
  // ═══════════════════════════════════════════════════════════════════════

  // ── Brevet 2025 – Amérique du Nord ─────────────────────────
  qs.push({ text: "Urne de 40 boules : 5 rouges, 20 vertes, 15 blanches. Proba d'une verte ?", answer: "0.5", category: "Brevet – Probabilités", hint: "20/40 = 1/2" });
  qs.push({ text: "Un article coûte 25 €. Prix après augmentation de 14 % ?", answer: "28.5", category: "Brevet – Pourcentages", hint: "25 × 1,14 = 28,5" });
  qs.push({ text: "Polygone 1 : aire 7,5 cm². Agrandissement coeff 2,5. Aire du polygone 2 ?", answer: "46.875", category: "Brevet – Agrandissement", hint: "7,5 × 2,5² = 7,5 × 6,25" });

  // ── Brevet 2025 – Asie (QCM) ──────────────────────────────
  qs.push({ text: "Urne : 4 bleues, 6 violettes, 7 rouges, 3 jaunes. Proba violette ?", answer: "0.3", category: "Brevet – Probabilités", hint: "6/20 = 3/10" });
  qs.push({ text: "70 % d'une quantité revient à multiplier par ?", answer: "0.7", category: "Brevet – Pourcentages", hint: "70/100 = 0,70" });
  qs.push({ text: "Série : 7 ; 18 ; 12 ; 13 ; 15. Moyenne ?", answer: "13", category: "Brevet – Statistiques", hint: "(7+18+12+13+15)/5 = 65/5" });

  // ── Brevet 2025 – Centres étrangers (QCM) ──────────────────
  qs.push({ text: "2³ × 3 × 5 = ?", answer: "120", category: "Brevet – Arithmétique", hint: "8 × 3 × 5 = 120" });
  qs.push({ text: "Forme factorisée de 4x² − 1 :  (2x−1)(2x+1). Pour x = 3, valeur ?", answer: "35", category: "Brevet – Identités remarquables", hint: "4×9 − 1 = 35 ou (5)(7) = 35" });

  // ── Brevet 2025 – Métropole (QCM) ─────────────────────────
  qs.push({ text: "3 melons coûtent 8,40 €. Combien coûtent 5 melons ?", answer: "14", category: "Brevet – Proportionnalité", hint: "1 melon = 2,80 €. 5 × 2,80" });
  qs.push({ text: "Un article coûte 350 €. Augmentation de 20 %. Nouveau prix ?", answer: "420", category: "Brevet – Pourcentages", hint: "350 × 1,20 = 420" });
  qs.push({ text: "Aire d'un triangle rectangle : côtés 6 cm et 4,5 cm ?", answer: "13.5", category: "Brevet – Aires", hint: "6 × 4,5 / 2 = 13,5" });
  qs.push({ text: "(2x+3)(x−4) pour x = 1", answer: "-15", category: "Brevet – Développer", hint: "(2+3)(1−4) = 5×(−3) = −15" });
  qs.push({ text: "Volume pyramide base rect 4×7 cm, hauteur 12 cm ?", answer: "112", category: "Brevet – Volumes", hint: "(4×7×12)/3 = 336/3" });

  // ── Brevet 2025 – Polynésie juin (QCM) ────────────────────
  qs.push({ text: "(−3)² = ?", answer: "9", category: "Brevet – Puissances", hint: "(−3)×(−3) = 9" });
  qs.push({ text: "2³ × 3² × 5 = ?", answer: "360", category: "Brevet – Arithmétique", hint: "8 × 9 × 5 = 360" });
  qs.push({ text: "Rectangle d'aire 135 cm², largeur 3 cm. Longueur ?", answer: "45", category: "Brevet – Aires", hint: "135 ÷ 3 = 45" });
  qs.push({ text: "f(x) = 2x − 8. Image de 4 ?", answer: "0", category: "Brevet – Fonctions", hint: "2×4 − 8 = 0" });
  qs.push({ text: "f(x) = 2x − 8. Résultat = 100. Nombre de départ ?", answer: "54", category: "Brevet – Équations", hint: "2x − 8 = 100 → 2x = 108 → x = 54" });

  // Dé 12 faces
  qs.push({ text: "Dé 12 faces. Proba d'un nombre pair ?", answer: "0.5", category: "Brevet – Probabilités", hint: "6 pairs sur 12" });
  qs.push({ text: "Dé 12 faces (1 à 12). Proba d'un multiple de 3 ?", answer: "0.333", category: "Brevet – Probabilités", hint: "4 multiples (3,6,9,12) sur 12 = 1/3" });

  // ── Brevet 2025 – Polynésie septembre (QCM) ───────────────
  qs.push({ text: "Pointure p = 1,5(L+1). Pied de 25 cm : pointure ?", answer: "39", category: "Brevet – Substitution", hint: "1,5 × 26 = 39" });
  qs.push({ text: "100 m en 10 s. Vitesse en km/h ?", answer: "36", category: "Brevet – Vitesse", hint: "10 m/s × 3,6 = 36 km/h" });
  qs.push({ text: "Modèle réduit échelle 1/20, largeur 7 cm. Largeur réelle ?", answer: "140", category: "Brevet – Échelles", hint: "7 × 20 = 140 cm" });

  // ── Brevet 2025 – Métropole septembre (QCM) ───────────────
  qs.push({ text: "Étendue de 4 ; 8 ; 11 ; 7 ; 2 ; 3 ; 14 ?", answer: "12", category: "Brevet – Statistiques", hint: "14 − 2 = 12" });
  qs.push({ text: "1 L correspond à quel volume ? (en dm³)", answer: "1", category: "Brevet – Conversions", hint: "1 L = 1 dm³" });
  qs.push({ text: "8,6 × 10⁻⁴ en décimal = ?", answer: "0.00086", category: "Brevet – Notation scientifique", hint: "Déplacer la virgule de 4 rangs à gauche" });
  qs.push({ text: "Drapeau ratio 3:2, longueur 90 cm. Largeur ?", answer: "60", category: "Brevet – Ratios", hint: "90 ÷ 3 × 2 = 60" });
  qs.push({ text: "Parfum passe de 75 € à 60 €. Pourcentage de réduction ?", answer: "20", category: "Brevet – Pourcentages", hint: "(75−60)/75 × 100 = 20 %" });
  qs.push({ text: "Forme factorisée de 4x² − 25. Pour x = 3, valeur ?", answer: "11", category: "Brevet – Identités remarquables", hint: "36 − 25 = 11 ou (6−5)(6+5) = 11" });

  // ── Brevet 2025 – Amérique du Sud ─────────────────────────
  qs.push({ text: "Triangle rectangle en A : AB = 10, BC = 20. Angle ABC ?", answer: "60", category: "Brevet – Trigonométrie", hint: "cos(ABC) = 10/20 = 0,5 → 60°" });
  qs.push({ text: "Urne 12 jetons (1 à 12). Proba d'un nombre ≤ 5 ?", answer: "0.417", category: "Brevet – Probabilités", hint: "5/12 ≈ 0,417" });
  qs.push({ text: "f(x) = −2x. f(2) = ?", answer: "-4", category: "Brevet – Fonctions", hint: "−2 × 2 = −4" });
  qs.push({ text: "f(x) = −2x. f(−1) = ?", answer: "2", category: "Brevet – Fonctions", hint: "−2 × (−1) = 2" });

  // ── Brevet 2025 – Nouvelle-Calédonie (QCM) ────────────────
  qs.push({ text: "Vitesse moyenne : 6 980 km en 9 h. Arrondi à la centaine ?", answer: "800", category: "Brevet – Vitesse", hint: "6980/9 ≈ 775,6 → 800 km/h" });
  qs.push({ text: "60 % de 730 élèves ?", answer: "438", category: "Brevet – Pourcentages", hint: "730 × 0,6 = 438" });
  qs.push({ text: "f(x) = 3(x+1). f(2) = ?", answer: "9", category: "Brevet – Fonctions", hint: "3 × 3 = 9" });

  // Centres étrangers 2025 – exercice 2
  qs.push({ text: "Masses de colis : 4, 9, 2, 7, 11 kg. Moyenne ?", answer: "6.6", category: "Brevet – Statistiques", hint: "(4+9+2+7+11)/5 = 33/5" });
  qs.push({ text: "Masses : 4, 9, 2, 7, 11. Médiane ?", answer: "7", category: "Brevet – Statistiques", hint: "Ordonnées : 2,4,7,9,11 → 3e = 7" });
  qs.push({ text: "Volume pavé droit 0,5 × 0,4 × 0,6 m³ ?", answer: "0.12", category: "Brevet – Volumes", hint: "0,5 × 0,4 × 0,6 = 0,12" });

  // Centres étrangers 2025 – exercice 3
  qs.push({ text: "Programme calcul : x = 1, f(x) = −2x + 4, puis × 4. Résultat ?", answer: "8", category: "Brevet – Programme de calcul", hint: "(−2+4) × 4 = 2 × 4 = 8" });
  qs.push({ text: "−8x + 16 = 4. Résoudre x = ?", answer: "1.5", category: "Brevet – Équations", hint: "−8x = −12 → x = 1,5" });

  // Polynésie juin 2025 – exercice 1
  qs.push({ text: "Effectifs escalade : 1,3,8,12,4,2. Total ?", answer: "30", category: "Brevet – Statistiques", hint: "1+3+8+12+4+2" });
  qs.push({ text: "30 inscrits, hausse de 10 %. Nombre attendu ?", answer: "33", category: "Brevet – Pourcentages", hint: "30 × 1,10 = 33" });

  // Polynésie juin 2025 – exercice 5 (proba digicode)
  qs.push({ text: "Digicode : 3 lettres (A,B,C), 10 chiffres (0-9). Combien de codes ?", answer: "30", category: "Brevet – Dénombrement", hint: "3 × 10 = 30" });
  qs.push({ text: "Proba de choisir la lettre C parmi A,B,C ?", answer: "0.333", category: "Brevet – Probabilités", hint: "1/3 ≈ 0,333" });
  qs.push({ text: "Nombre de nombres premiers de 0 à 9 ?", answer: "4", category: "Brevet – Arithmétique", hint: "2, 3, 5, 7" });

  // Métropole 2025 – exercice 4
  qs.push({ text: "Programme : choisir 10, −4, ×2, +8. Résultat ?", answer: "20", category: "Brevet – Programme de calcul", hint: "(10−4)×2+8 = 12+8" });
  qs.push({ text: "Programme : choisir −7, −4, ×2, +8. Résultat ?", answer: "-14", category: "Brevet – Programme de calcul", hint: "(−7−4)×2+8 = −22+8" });
  qs.push({ text: "20x + 50 = 75. Résoudre x = ?", answer: "1.25", category: "Brevet – Équations", hint: "20x = 25 → x = 1,25" });

  // Métropole 2025 – exercice 5
  qs.push({ text: "Option Achat : 22 400 € + 75 €/mois × 12. Total 1re année ?", answer: "23300", category: "Brevet – Calcul", hint: "22400 + 900 = 23300" });
  qs.push({ text: "Option Location : 425 € × 36 mois ?", answer: "15300", category: "Brevet – Calcul", hint: "425 × 36" });

  // Polynésie sept 2025 – exercice 1
  qs.push({ text: "Carreleur A : 80 €/m². Surface 60 m². Prix ?", answer: "4800", category: "Brevet – Proportionnalité", hint: "80 × 60" });
  qs.push({ text: "Carreleur B : 60 €/m² + 970 €. Surface 60 m². Prix ?", answer: "4570", category: "Brevet – Fonctions", hint: "60×60 + 970" });
  qs.push({ text: "f(x) = 80x. Image de 70 ?", answer: "5600", category: "Brevet – Fonctions", hint: "80 × 70" });
  qs.push({ text: "f(x) = 80x. Antécédent de 2400 ?", answer: "30", category: "Brevet – Fonctions", hint: "2400 ÷ 80 = 30" });
  qs.push({ text: "80x = 60x + 970. Résoudre x = ?", answer: "48.5", category: "Brevet – Équations", hint: "20x = 970 → x = 48,5" });

  // Polynésie sept 2025 – exercice 5
  qs.push({ text: "70 % de 20 tee-shirts ?", answer: "14", category: "Brevet – Pourcentages", hint: "20 × 0,7 = 14" });
  qs.push({ text: "Données : 14,6,9,11,12,8. Moyenne ?", answer: "10", category: "Brevet – Statistiques", hint: "(14+6+9+11+12+8)/6 = 60/6" });
  qs.push({ text: "Données : 6,8,9,11,12,14. Médiane ?", answer: "10", category: "Brevet – Statistiques", hint: "6 valeurs → (9+11)/2 = 10" });
  qs.push({ text: "PGCD(168, 63) ?", answer: "21", category: "Brevet – PGCD", hint: "168 = 2³×3×7, 63 = 3²×7 → PGCD = 3×7" });

  // Métropole sept 2025 – exercice 4
  qs.push({ text: "Filtration piscine : 0,5 × 26 + 2 = ?", answer: "15", category: "Brevet – Fonctions", hint: "13 + 2 = 15" });
  qs.push({ text: "0,5x + 2 = 17. Résoudre x = ?", answer: "30", category: "Brevet – Équations", hint: "0,5x = 15 → x = 30" });
  qs.push({ text: "Pompe 0,8 kW × 16 h/jour × 62 jours. Consommation kWh ?", answer: "793.6", category: "Brevet – Calcul", hint: "0,8 × 16 × 62" });
  qs.push({ text: "Coût énergie : 793,6 kWh × 0,23 €. Total ?", answer: "182.528", category: "Brevet – Calcul" });

  // Métropole sept 2025 – exercice 5
  qs.push({ text: "Aire carré de côté 80 cm ?", answer: "6400", category: "Brevet – Aires", hint: "80 × 80 = 6400" });
  qs.push({ text: "1600 cm² sur 6400 cm². Pourcentage ?", answer: "25", category: "Brevet – Pourcentages", hint: "1600/6400 × 100" });

  // Amérique du Sud nov 2025
  qs.push({ text: "Moyenne de 135,82,104,200,102,17,143,118,62 (en min) ?", answer: "107", category: "Brevet – Statistiques", hint: "963/9 = 107" });
  qs.push({ text: "Étendue de 17,62,82,102,104,118,135,143,200 ?", answer: "183", category: "Brevet – Statistiques", hint: "200 − 17 = 183" });
  qs.push({ text: "400 élèves sur 640 : pourcentage ? (arrondi)", answer: "62.5", category: "Brevet – Pourcentages", hint: "400/640 × 100 = 62,5 %" });

  // Nouvelle-Calédonie 2025 – exercice 1
  qs.push({ text: "Quel nombre est premier : 687, 719, 935 ?", answer: "719", category: "Brevet – Arithmétique", hint: "687 = 3×229, 935 = 5×187, 719 est premier" });

  // ═══════════════════════════════════════════════════════════════
  // BREVET 2024
  // ═══════════════════════════════════════════════════════════════

  // ── Amérique du Nord 2024 ────────────────────────────────
  qs.push({ text: "Moyenne des prix : 12, 15, 10, 7, 13 ?", answer: "11.4", category: "Brevet – Statistiques", hint: "(12+15+10+7+13)/5 = 57/5" });
  qs.push({ text: "Médiane de 7, 10, 12, 13, 15 ?", answer: "12", category: "Brevet – Statistiques", hint: "5 valeurs ordonnées → 3e" });
  qs.push({ text: "20 m en 6 s. Vitesse en km/h ? (arrondi au dixième)", answer: "12", category: "Brevet – Vitesse", hint: "20/6 m/s × 3,6 = 12 km/h" });

  // ── Centres étrangers 2024 (QCM) ────────────────────────
  qs.push({ text: "Écriture scientifique de 0,193 × 10⁻¹⁰⁰ : exposant de 10 ?", answer: "-101", category: "Brevet – Notation scientifique", hint: "1,93 × 10⁻¹⁰¹" });
  qs.push({ text: "480 km en 5 h 42 min. Vitesse en km/h ? (arrondi au dixième)", answer: "84.2", category: "Brevet – Vitesse", hint: "5h42 = 5,7 h. 480/5,7 ≈ 84,2" });

  // ── Asie 2024 (QCM) ───────────────────────────────────────
  qs.push({ text: "Lequel est premier : 1, 21, 37, 54 ?", answer: "37", category: "Brevet – Arithmétique", hint: "21 = 3×7, 54 = 2×27, 1 pas premier" });
  qs.push({ text: "Aire totale patron cube arête 5 cm ?", answer: "150", category: "Brevet – Aires", hint: "6 × 5² = 6 × 25" });
  qs.push({ text: "4x² − 9. Pour x = 2, valeur ?", answer: "7", category: "Brevet – Identités remarquables", hint: "16 − 9 = 7 ou (4−3)(4+3) = 7" });
  qs.push({ text: "Ratio 16:9, longueur 110 cm. Largeur ? (arrondi)", answer: "62", category: "Brevet – Ratios", hint: "110 × 9/16 ≈ 61,875 → 62 cm" });
  qs.push({ text: "Médiane de 3,4 ; 3,67 ; 4,1 ; 4,23 ; 4,5 ?", answer: "4.1", category: "Brevet – Statistiques", hint: "5 valeurs ordonnées → 3e" });

  // ── Polynésie 2024 (QCM) ──────────────────────────────────
  qs.push({ text: "AB=20, BC=21, AC=29. AB²+BC² ?", answer: "841", category: "Brevet – Pythagore", hint: "400+441 = 841 = 29²" });
  qs.push({ text: "Cocktail ratio 10:6:2. Total 90 cL. Quantité jus passion (ratio 6) ?", answer: "30", category: "Brevet – Ratios", hint: "18 parts → 1 part = 5 cL. 6×5" });
  qs.push({ text: "PGCD(408, 168) ?", answer: "24", category: "Brevet – PGCD", hint: "408 = 2³×3×17, 168 = 2³×3×7 → PGCD = 24" });

  // ── Polynésie 2024 – exercice 4 (probabilités) ──────────
  qs.push({ text: "Boîte 1 : {2,3,5}. Boîte 2 : {3,5}. Proba produit = 15 ?", answer: "0.333", category: "Brevet – Probabilités", hint: "2 cas sur 6 : (3×5) et (5×3) → 2/6" });

  // ── Polynésie 2024 – exercice 5 ─────────────────────────
  qs.push({ text: "f(x) = (x+2)² − x. f(−4) = ?", answer: "8", category: "Brevet – Fonctions", hint: "(−2)² − (−4) = 4 + 4" });
  qs.push({ text: "g(x) = 7x + 4. g(0) = ?", answer: "4", category: "Brevet – Fonctions", hint: "7×0 + 4 = 4" });

  // ── Métropole juillet 2024 (QCM) ────────────────────────
  qs.push({ text: "f(x) = 3x − 2. f(−4) = ?", answer: "-14", category: "Brevet – Fonctions", hint: "3×(−4) − 2 = −12 − 2" });
  qs.push({ text: "(−5)³ = ?", answer: "-125", category: "Brevet – Puissances", hint: "(−5)×(−5)×(−5)" });
  qs.push({ text: "Médiane des tailles : 1,46 ; 1,6 ; 1,65 ; 1,67 ; 1,7 ; 1,72 ; 1,75 ?", answer: "1.67", category: "Brevet – Statistiques", hint: "7 valeurs → 4e" });

  // PGCD – Métropole 2024
  qs.push({ text: "PGCD(330, 132) ?", answer: "66", category: "Brevet – PGCD", hint: "330 = 2×3×5×11, 132 = 2²×3×11 → 2×3×11" });

  // ── Martinique 2024 ────────────────────────────────────────
  qs.push({ text: "Écriture scientifique de 13 420 ?  Exposant de 10 ?", answer: "4", category: "Brevet – Notation scientifique", hint: "1,342 × 10⁴" });
  qs.push({ text: "630 + 810 = ?", answer: "1440", category: "Brevet – Calcul", hint: "Nombre total de dragées" });
  qs.push({ text: "Proba dragée blanche : 810 sur 1440 ?", answer: "0.5625", category: "Brevet – Probabilités", hint: "810/1440 = 9/16 = 0,5625" });
  qs.push({ text: "PGCD(630, 810) ?", answer: "90", category: "Brevet – PGCD", hint: "630 = 2×3²×5×7, 810 = 2×3⁴×5 → 2×3²×5" });

  // Programme calcul – Martinique 2024
  qs.push({ text: "x = 5 : x², −3x, −4. Résultat ?", answer: "6", category: "Brevet – Programme de calcul", hint: "25 − 15 − 4 = 6" });

  // ── Polynésie septembre 2024 ───────────────────────────────
  qs.push({ text: "Écriture scientifique de 0,000 002 76. Exposant ?", answer: "-6", category: "Brevet – Notation scientifique", hint: "2,76 × 10⁻⁶" });
  qs.push({ text: "2 640 km/min en m/s ?", answer: "44000", category: "Brevet – Conversions", hint: "2640 × 1000/60 = 44 000" });
  qs.push({ text: "(2x−7)(3x+1) = 0. Plus grande solution ?", answer: "3.5", category: "Brevet – Équations produit", hint: "2x−7 = 0 → x = 3,5" });
  qs.push({ text: "f(x) = 5x² + 2. f(−3) = ?", answer: "47", category: "Brevet – Fonctions", hint: "5×9 + 2 = 47" });
  qs.push({ text: "Thalès : AB=5, BD=1, CD=3, (AB)//(ED). DE = ?", answer: "3.75", category: "Brevet – Thalès", hint: "DE/AB = CD/(CD+BD) → DE = 5×3/4" });

  // Polynésie sept 2024 – statistiques
  qs.push({ text: "Températures : 29;23,1;22,6;17,4;23,4;25,7;25,2;26;24. Moyenne ? (arrondi)", answer: "24", category: "Brevet – Statistiques", hint: "216,4/9 ≈ 24,0" });
  qs.push({ text: "Étendue températures : 29 − 17,4 = ?", answer: "11.6", category: "Brevet – Statistiques", hint: "max − min" });

  // ── Métropole septembre 2024 ───────────────────────────────
  qs.push({ text: "2² × 5 × 13 = ?", answer: "260", category: "Brevet – Arithmétique", hint: "4 × 5 × 13 = 260" });
  qs.push({ text: "7x + 5 = 2x − 2. Solution x = ?", answer: "-1.4", category: "Brevet – Équations", hint: "5x = −7 → x = −7/5" });
  qs.push({ text: "5 m/s en km/h ?", answer: "18", category: "Brevet – Conversions", hint: "5 × 3,6 = 18" });

  // Production électricité – Métropole sept 2024
  qs.push({ text: "Données : 381,363,322,329,393,405,376. Étendue ?", answer: "83", category: "Brevet – Statistiques", hint: "405 − 322 = 83" });
  qs.push({ text: "Moyenne de 381,363,322,329,393,405,376 ?", answer: "367", category: "Brevet – Statistiques", hint: "2569/7 = 367" });

  // Fonction – Métropole sept 2024
  qs.push({ text: "f(x) = x² + 10x + 16. f(6) = ?", answer: "112", category: "Brevet – Fonctions", hint: "36 + 60 + 16" });
  qs.push({ text: "f(x) = (x+2)(x+8). Antécédent de 0 autre que −2 ?", answer: "-8", category: "Brevet – Équations produit", hint: "x + 8 = 0 → x = −8" });

  // ── Amérique du Sud décembre 2024 (QCM) ───────────────────
  qs.push({ text: "Urne : 3 jetons verts, 2 blancs. Proba blanc ?", answer: "0.4", category: "Brevet – Probabilités", hint: "2/5 = 0,4" });
  qs.push({ text: "Thalès : BD=2, BC=10, AC=16, (DH)//(AC). DH = ?", answer: "3.2", category: "Brevet – Thalès", hint: "DH/AC = BD/BC → DH = 2/10 × 16" });
  qs.push({ text: "f(x) = x² − x − 6. f(5) = ?", answer: "14", category: "Brevet – Fonctions", hint: "25 − 5 − 6 = 14" });
  qs.push({ text: "g(x) = −2x. Antécédent de 4 ?", answer: "-2", category: "Brevet – Fonctions", hint: "−2x = 4 → x = −2" });
  qs.push({ text: "f(x) = x² − x − 6 = (x+2)(x−3). Solutions de f(x) = 0 ?  Plus grande ?", answer: "3", category: "Brevet – Équations produit", hint: "x = −2 ou x = 3" });

  // Guépard – Amérique du Sud 2024
  qs.push({ text: "115 km/h en m/s : combien pour 100 m ? (arrondi au centième)", answer: "3.13", category: "Brevet – Vitesse", hint: "115/3,6 ≈ 31,94 m/s. 100/31,94 ≈ 3,13 s" });
  qs.push({ text: "1200 à 170 guépards. Baisse en % ? (arrondi)", answer: "86", category: "Brevet – Pourcentages", hint: "(1200−170)/1200 × 100 ≈ 85,8 → 86 %" });

  // ── Métropole juillet 2024 – exercice 5 ───────────────────
  qs.push({ text: "Autocollants 330, drapeaux 132. PGCD ?", answer: "66", category: "Brevet – PGCD", hint: "330 = 2×3×5×11, 132 = 2²×3×11" });

  // Piscine pavé droit – Métropole 2024
  qs.push({ text: "Volume pavé 25 × 15 × 2 m³ ?", answer: "750", category: "Brevet – Volumes", hint: "25 × 15 × 2" });

  // ── Asie 2024 – exercice 4 (fonctions) ─────────────────────
  qs.push({ text: "Distance Strasbourg-Marseille : 801,5 km × 2 (A/R) = ?", answer: "1603", category: "Brevet – Calcul" });
  qs.push({ text: "Formule A : 0,50x. x = 2010. Coût ?", answer: "1005", category: "Brevet – Fonctions", hint: "0,50 × 2010" });
  qs.push({ text: "0,25x + 300 = 0,5x. Résoudre x = ?", answer: "1200", category: "Brevet – Équations", hint: "0,25x = 300 → x = 1200" });

  // ── Centres étrangers 2024 – exercice 2 ────────────────────
  qs.push({ text: "Circuit 1 : 5 exercices × 40 s + 5 repos × 16 s = ?", answer: "280", category: "Brevet – Calcul", hint: "200 + 80 = 280 s" });
  qs.push({ text: "Circuit 2 : 10 exercices × 30 s + 10 repos × 5 s = ?", answer: "350", category: "Brevet – Calcul", hint: "300 + 50 = 350 s" });
  qs.push({ text: "PGCD(280, 350) ?", answer: "70", category: "Brevet – PGCD", hint: "280 = 2³×5×7, 350 = 2×5²×7 → 2×5×7" });

  // Centres étrangers 2024 – exercice 3
  qs.push({ text: "Programme : x = 5, (x−2)(x+1) = ?", answer: "18", category: "Brevet – Programme de calcul", hint: "3 × 6 = 18" });
  qs.push({ text: "Programme : x = −3, (x−2)(x+1) = ?", answer: "10", category: "Brevet – Programme de calcul", hint: "(−5)(−2) = 10" });

  // Polynésie 2024 – piscine cylindrique
  qs.push({ text: "Volume cylindre rayon 3,6 m, hauteur 1,5 m ? (arrondi au dixième)", answer: "61.1", category: "Brevet – Volumes", hint: "π × 3,6² × 1,5 ≈ 61,07" });
  qs.push({ text: "Débit 14,1 m³/h pendant 2 h. Volume vidé ?", answer: "28.2", category: "Brevet – Proportionnalité", hint: "14,1 × 2" });

  // Polynésie 2025 – jardin botanique
  qs.push({ text: "Triangle ABD : hyp BD=1000, AB=500. AD = ? (arrondi)", answer: "866", category: "Brevet – Pythagore", hint: "√(1000²−500²) = √750000 ≈ 866" });

  // Métropole 2025 – exercice 2 (aquathlon)
  qs.push({ text: "Triangle rect : AC=480, ADE rect en A. AD=200. CD = ? (arrondi)", answer: "520", category: "Brevet – Pythagore", hint: "√(480²+200²) = √270400 ≈ 520" });

  // Asie 2025 – exercice 2
  qs.push({ text: "Triangle rect en D : CD=21,6 ; CE=29,1. DE ? (arrondi au dixième)", answer: "19.5", category: "Brevet – Pythagore", hint: "√(29,1²−21,6²) = √(846,81−466,56) = √380,25" });

  // Asie 2025 – exercice 5 (PGCD)
  qs.push({ text: "PGCD(350, 300) ?", answer: "50", category: "Brevet – PGCD", hint: "350 = 2×5²×7, 300 = 2²×3×5² → 2×5²" });
  qs.push({ text: "Remise 15 % sur 55 € ?", answer: "46.75", category: "Brevet – Pourcentages", hint: "55 × 0,85 = 46,75" });

  // ── Sujets 0 2026 (déjà intégrés dans les catégories existantes ci-dessus) ──

  // Probabilités roulette – Métropole 2024
  qs.push({ text: "Roulette 0 à 36 : proba numéro ≤ 6 ?", answer: "0.189", category: "Brevet – Probabilités", hint: "7/37 ≈ 0,189" });
  qs.push({ text: "Roulette 0 à 36 : proba numéro ≥ 7 ?", answer: "0.811", category: "Brevet – Probabilités", hint: "30/37 ≈ 0,811" });

  // Musique – Métropole sept 2025
  qs.push({ text: "22 chansons : 9 chants, 6 comptines. Nombre de berceuses ?", answer: "7", category: "Brevet – Calcul", hint: "22 − 9 − 6 = 7" });
  qs.push({ text: "Durée moyenne : 55 min pour 22 chansons (en min, arrondi)", answer: "2.5", category: "Brevet – Statistiques", hint: "55/22 = 2,5 min" });
  qs.push({ text: "Proba comptine parmi 22 chansons ?", answer: "0.273", category: "Brevet – Probabilités", hint: "6/22 = 3/11 ≈ 0,273" });
  qs.push({ text: "Nombres premiers entre 1 et 22 ? Combien ?", answer: "8", category: "Brevet – Arithmétique", hint: "2,3,5,7,11,13,17,19" });

  return qs;
}
