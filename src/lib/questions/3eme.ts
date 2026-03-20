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
    ["1/4 + 2/4", "3", "= 3/4 → numérateur"],
    ["3/5 + 1/5", "4", "= 4/5 → numérateur"],
    ["7/8 − 3/8", "4", "= 4/8 → numérateur"],
    ["5/6 − 1/6", "4", "= 4/6 → numérateur"],
    ["1/3 + 1/6", "3", "= 2/6 + 1/6 = 3/6 → numérateur"],
  ];
  n5.forEach(([t, r, h]) =>
    qs.push({ text: `${t} → numérateur`, answer: r, category: "Add/sub fractions", hint: h })
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

  return qs;
}
