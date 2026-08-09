import { Question } from "./types";

/**
 * Automatismes et objectifs propres au programme de 5ème (cycle 4) :
 * nombres relatifs, puissances/carrés, rationnels, divisibilité,
 * calcul littéral, statistiques et probabilités.
 */
export function get5emeProgramQuestions(): Question[] {
  const qs: Question[] = [];

  // ─── Nombres relatifs (chapitre de 5ème) ─────────────────
  const relAdd: [string, string][] = [
    ["(−3) + 5", "2"], ["(−7) + 2", "-5"], ["4 + (−9)", "-5"],
    ["(−6) + (−3)", "-9"], ["8 + (−3)", "5"], ["(−10) + 10", "0"],
    ["(−4) + 7", "3"], ["(−8) + (−2)", "-10"],
    ["(−2,5) + 4", "1.5"], ["(−1,2) + (−3,4)", "-4.6"],
    ["3,5 + (−1,5)", "2"], ["(−0,8) + 2,3", "1.5"],
  ];
  relAdd.forEach(([t, r]) =>
    qs.push({ text: t, answer: r, category: "Relatifs : add/sub" })
  );

  const relSub: [string, string][] = [
    ["5 − 8", "-3"], ["3 − 10", "-7"], ["(−2) − 4", "-6"],
    ["(−5) − (−3)", "-2"], ["7 − (−2)", "9"], ["0 − 6", "-6"],
    ["(−3) − 7", "-10"], ["2,5 − 4", "-1.5"], ["(−1,5) − 2,5", "-4"],
    ["(−3) + 5 − 4", "-2"], ["(−2) − (−6) + 1", "5"],
  ];
  relSub.forEach(([t, r]) =>
    qs.push({ text: t, answer: r, category: "Relatifs : add/sub" })
  );

  const opp: [string, string][] = [
    ["Opposé de (−7)", "7"], ["Opposé de 4,5", "-4.5"],
    ["Opposé de 0", "0"], ["Opposé de (−12)", "12"],
  ];
  opp.forEach(([t, r]) => qs.push({ text: t, answer: r, category: "Opposé d'un nombre" }));

  const compRel: [string, string[], string][] = [
    ["Le plus grand : −3 ou −8 ?", ["−3", "−8"], "−3"],
    ["Le plus grand : −0,5 ou 0,2 ?", ["−0,5", "0,2"], "0,2"],
    ["Le plus grand : −2,7 ou −2,5 ?", ["−2,7", "−2,5"], "−2,5"],
    ["Le plus petit : −1 ou −10 ?", ["−1", "−10"], "−10"],
  ];
  compRel.forEach(([t, o, r]) =>
    qs.push({ text: t, answer: r, options: o, category: "Comparer des relatifs" })
  );

  // ─── Addition à trou (automatisme explicite du programme) ──
  const trou: [string, string][] = [
    ["2 + … = 7", "5"], ["15 + … = 23", "8"], ["4,5 + … = 10", "5.5"],
    ["… + 6 = 14", "8"], ["3 × … = 21", "7"], ["5 × … = 45", "9"],
  ];
  trou.forEach(([t, r]) =>
    qs.push({ text: t, answer: r, category: "Compléments à trou", hint: "Pour compléter une addition à trou, on soustrait ; pour un produit, on divise." })
  );

  // ─── Divisibilité, division euclidienne, décomposition ────
  const divis: [string, string[], string][] = [
    ["144 est-il divisible par 3 ?", ["Oui", "Non"], "Oui"],
    ["235 est-il divisible par 5 ?", ["Oui", "Non"], "Oui"],
    ["247 est-il divisible par 2 ?", ["Oui", "Non"], "Non"],
    ["117 est-il divisible par 9 ?", ["Oui", "Non"], "Oui"],
    ["1 234 est-il divisible par 10 ?", ["Oui", "Non"], "Non"],
    ["531 est-il divisible par 3 ?", ["Oui", "Non"], "Oui"],
  ];
  divis.forEach(([t, o, r]) =>
    qs.push({ text: t, answer: r, options: o, category: "Divisibilité" })
  );

  const eucl: [string, string, string][] = [
    ["17 = 3 × 5 + … Reste ?", "2", "17 − 15"],
    ["Reste de 23 ÷ 4", "3", "23 = 4 × 5 + 3"],
    ["Reste de 50 ÷ 7", "1", "50 = 7 × 7 + 1"],
    ["Quotient entier de 38 ÷ 5", "7", "38 = 5 × 7 + 3"],
    ["Quotient entier de 61 ÷ 8", "7", "61 = 8 × 7 + 5"],
  ];
  eucl.forEach(([t, r, h]) =>
    qs.push({ text: t, answer: r, category: "Division euclidienne", hint: h })
  );

  const deco: [string, string][] = [
    ["21 = 3 × …", "7"], ["56 = 7 × …", "8"], ["48 = 6 × …", "8"],
    ["63 = 9 × …", "7"], ["72 = 8 × …", "9"],
  ];
  deco.forEach(([t, r]) =>
    qs.push({ text: t, answer: r, category: "Décomposer en produit" })
  );

  // ─── Produits liés aux tables avec décimaux ───────────────
  const prodDec: [string, string][] = [
    ["0,6 × 7", "4.2"], ["40 × 0,03", "1.2"], ["0,4 × 8", "3.2"],
    ["0,05 × 6", "0.3"], ["30 × 0,2", "6"], ["1,5 × 4", "6"],
    ["0,9 × 3", "2.7"], ["200 × 0,004", "0.8"],
  ];
  prodDec.forEach(([t, r]) =>
    qs.push({ text: t, answer: r, category: "Décimaux : produits" })
  );

  // ─── Nombres rationnels ───────────────────────────────────
  const fracEg: [string, string, string][] = [
    ["2/3 = ?/15", "10", "× 5"], ["4/7 = ?/14", "8", "× 2"],
    ["3/5 = ?/20", "12", "× 4"], ["1/6 = ?/18", "3", "× 3"],
    ["5/8 = ?/24", "15", "× 3"],
  ];
  fracEg.forEach(([t, r, h]) =>
    qs.push({ text: t, answer: r, category: "Fractions égales", hint: h })
  );

  const compFrac: [string, string[], string][] = [
    ["La plus grande : 2/7 ou 5/7 ?", ["2/7", "5/7"], "5/7"],
    ["La plus grande : 8/12 ou 8/21 ?", ["8/12", "8/21"], "8/12"],
    ["La plus grande : 3/4 ou 7/18 ?", ["3/4", "7/18"], "3/4"],
    ["La plus grande : 8/3 ou 6/7 ?", ["8/3", "6/7"], "8/3"],
  ];
  compFrac.forEach(([t, o, r]) =>
    qs.push({ text: t, answer: r, options: o, category: "Comparer des fractions" })
  );

  const mixte: [string, string, string][] = [
    ["17/5 = 3 + ?/5. Numérateur ?", "2", "17 = 5 × 3 + 2"],
    ["23/4 = 5 + ?/4. Numérateur ?", "3", "23 = 4 × 5 + 3"],
    ["11/3 = 3 + ?/3. Numérateur ?", "2", "11 = 3 × 3 + 2"],
    ["29/7 = 4 + ?/7. Numérateur ?", "1", "29 = 7 × 4 + 1"],
  ];
  mixte.forEach(([t, r, h]) =>
    qs.push({ text: t, answer: r, category: "Écriture mixte", hint: h })
  );

  // Résultats en fraction exacte (pas de décimal approché)
  const fracSum: [string, string, string][] = [
    ["3/5 + 4/5 (fraction)", "7/5", "On additionne les numérateurs."],
    ["3/5 + 2/5 (fraction)", "1", "= 5/5 = 1"],
    ["1 − 2/3 (fraction)", "1/3", "1 = 3/3"],
    ["4/7 − 2/7 (fraction)", "2/7", "On soustrait les numérateurs."],
    ["2 + 1/4 (fraction)", "9/4", "2 = 8/4"],
    ["1/2 + 1/4 (fraction)", "3/4", "1/2 = 2/4"],
    ["5/6 − 1/6 (fraction)", "2/3", "= 4/6 = 2/3"],
    ["1/3 + 1/6 (fraction)", "1/2", "= 2/6 + 1/6 = 3/6"],
  ];
  fracSum.forEach(([t, r, h]) =>
    qs.push({ text: t, answer: r, category: "Add/sub fractions", hint: h })
  );

  const fracDe: [string, string][] = [
    ["1/3 de 18", "6"], ["1/4 de 12", "3"], ["1/2 de 46", "23"],
    ["2/3 de 21", "14"], ["3/4 de 32", "24"], ["1/5 de 45", "9"],
  ];
  fracDe.forEach(([t, r]) =>
    qs.push({ text: t, answer: r, category: "Fraction d'un nombre" })
  );

  const pctSimple: [string, string][] = [
    ["1 % de 400", "4"], ["10 % de 250", "25"], ["50 % de 84", "42"],
    ["10 % de 36", "3.6"], ["1 % de 75", "0.75"], ["50 % de 130", "65"],
  ];
  pctSimple.forEach(([t, r]) =>
    qs.push({ text: t, answer: r, category: "Pourcentages simples" })
  );

  const ecritures: [string, string[], string][] = [
    ["1,2 est égal à…", ["6/5", "5/6", "1/2"], "6/5"],
    ["0,25 est égal à…", ["1/4", "1/2", "2/5"], "1/4"],
    ["120 % est égal à…", ["1,2", "12", "0,12"], "1,2"],
    ["3/2 est égal à…", ["1,5", "0,66", "2,3"], "1,5"],
  ];
  ecritures.forEach(([t, o, r]) =>
    qs.push({ text: t, answer: r, options: o, category: "Écritures d'un nombre" })
  );

  // ─── Puissances (carrés 0-12, cubes) ──────────────────────
  for (let i = 0; i <= 12; i++)
    qs.push({ text: `${i}²`, answer: String(i * i), category: "Carrés de 0 à 12" });

  const cubes: [string, string][] = [
    ["2³", "8"], ["3³", "27"], ["10³", "1000"], ["1³", "1"],
    ["4³", "64"], ["5³", "125"],
  ];
  cubes.forEach(([t, r]) => qs.push({ text: t, answer: r, category: "Cubes" }));

  const puisMix: [string, string, string][] = [
    ["3² + 4²", "25", "9 + 16"], ["2³ − 5", "3", "8 − 5"],
    ["2 × 3²", "18", "2 × 9"], ["5² − 3²", "16", "25 − 9"],
    ["10² + 10³", "1100", "100 + 1000"],
  ];
  puisMix.forEach(([t, r, h]) =>
    qs.push({ text: t, answer: r, category: "Puissances simples", hint: h })
  );

  // ─── Calcul littéral (motifs, formules, substitution) ─────
  const motifs: [string, string, string][] = [
    ["Motif : 3, 5, 7, 9 … étape 5 ?", "11", "On ajoute 2 à chaque étape."],
    ["Motif : 3, 5, 7, 9 … étape 10 ?", "21", "n-ième terme = 2n + 1"],
    ["Motif : 4, 7, 10, 13 … étape 6 ?", "19", "On ajoute 3 à chaque étape."],
    ["Motif : 1, 4, 9, 16 … étape 5 ?", "25", "Ce sont les carrés."],
    ["Motif : 5, 10, 15 … étape 8 ?", "40", "n-ième terme = 5n"],
  ];
  motifs.forEach(([t, r, h]) =>
    qs.push({ text: t, answer: r, category: "Motifs évolutifs", hint: h })
  );

  const formules: [string, string[], string][] = [
    ["Le double de n s'écrit…", ["2n", "n + 2", "n²"], "2n"],
    ["Le successeur de n s'écrit…", ["n + 1", "n − 1", "2n"], "n + 1"],
    ["Le carré de n s'écrit…", ["n²", "2n", "n + n"], "n²"],
    ["Le périmètre d'un carré de côté c s'écrit…", ["4c", "c²", "2c"], "4c"],
    ["Le triple de n augmenté de 5 s'écrit…", ["3n + 5", "3(n + 5)", "n + 15"], "3n + 5"],
  ];
  formules.forEach(([t, o, r]) =>
    qs.push({ text: t, answer: r, options: o, category: "Formules littérales" })
  );

  const subst: [string, string, string][] = [
    ["3x pour x = 4", "12", "3 × 4"],
    ["2x + 1 pour x = 5", "11", "10 + 1"],
    ["x² pour x = 6", "36", "6 × 6"],
    ["5x − 3 pour x = 2", "7", "10 − 3"],
    ["x² + 1 pour x = 3", "10", "9 + 1"],
  ];
  subst.forEach(([t, r, h]) =>
    qs.push({ text: t, answer: r, category: "Substitution", hint: h })
  );

  // ─── Statistiques : moyenne simple ────────────────────────
  const moy: [string, string, string][] = [
    ["Moyenne de 4 ; 8 ; 6", "6", "(4+8+6) ÷ 3"],
    ["Moyenne de 10 ; 12 ; 14 ; 20", "14", "56 ÷ 4"],
    ["Moyenne de 5 ; 7", "6", "12 ÷ 2"],
    ["Moyenne de 2 ; 3 ; 4 ; 7", "4", "16 ÷ 4"],
    ["Moyenne de 12 ; 15 ; 9", "12", "36 ÷ 3"],
  ];
  moy.forEach(([t, r, h]) =>
    qs.push({ text: t, answer: r, category: "Moyenne simple", hint: h })
  );

  const effectifs: [string, string, string][] = [
    ["Total 24 élèves : 6 + 12 + 3 + ? ", "3", "24 − 21"],
    ["Total 30 : 10 + 8 + ?", "12", "30 − 18"],
    ["Total 50 : 20 + 15 + 5 + ?", "10", "50 − 40"],
  ];
  effectifs.forEach(([t, r, h]) =>
    qs.push({ text: t, answer: r, category: "Effectif manquant", hint: h })
  );

  const freq: [string, string, string][] = [
    ["Fréquence de 6 sur 24 (décimal)", "0.25", "6 ÷ 24"],
    ["Fréquence de 12 sur 24 en %", "50", "12 ÷ 24 = 0,5"],
    ["Fréquence de 3 sur 12 (décimal)", "0.25", "3 ÷ 12"],
  ];
  freq.forEach(([t, r, h]) =>
    qs.push({ text: t, answer: r, category: "Fréquence simple", hint: h })
  );

  // ─── Probabilités (automatismes de 5ème) ──────────────────
  const proba: [string, string, string][] = [
    ["Proba de pile avec une pièce (fraction)", "1/2", "1 cas favorable sur 2"],
    ["Proba d'obtenir 4 avec un dé (fraction)", "1/6", "1 cas sur 6"],
    ["Proba d'un nombre pair avec un dé (fraction)", "1/2", "3 cas sur 6"],
    ["« Une chance sur quatre » vaut (fraction)", "1/4", "1 ÷ 4"],
    ["Urne : 2 rouges, 3 bleues. Proba rouge (fraction)", "2/5", "2 cas sur 5"],
    ["Proba d'un événement certain", "1", "Toujours réalisé"],
    ["Proba d'un événement impossible", "0", "Jamais réalisé"],
  ];
  proba.forEach(([t, r, h]) =>
    qs.push({ text: t, answer: r, category: "Probabilité simple", hint: h })
  );

  const echelle: [string, string[], string][] = [
    ["Obtenir 10 fois de suite 1 avec un dé : événement…", ["Très peu probable", "Très probable", "Certain"], "Très peu probable"],
    ["Ne pas gagner le loto : événement…", ["Très probable", "Impossible", "Peu probable"], "Très probable"],
    ["Obtenir un nombre entre 1 et 6 avec un dé : événement…", ["Certain", "Impossible", "Peu probable"], "Certain"],
  ];
  echelle.forEach(([t, o, r]) =>
    qs.push({ text: t, answer: r, options: o, category: "Échelle de proba" })
  );

  // ─── Proportionnalité & « en fonction de » ────────────────
  const propor: [string, string, string][] = [
    ["Recette pour 4 pers. : 200 g. Pour 6 pers. ?", "300", "1 pers. = 50 g"],
    ["1 kg de tomates = 3 €. 4 kg ?", "12", "× 4"],
    ["6 voix sur 24 élèves : pourcentage ?", "25", "6 ÷ 24 × 100"],
    ["12 voix sur 24 élèves : pourcentage ?", "50", "12 ÷ 24 × 100"],
    ["Échelle 1/100 : 3 cm sur le plan = ? cm en vrai", "300", "× 100"],
  ];
  propor.forEach(([t, r, h]) =>
    qs.push({ text: t, answer: r, category: "Proportionnalité", hint: h })
  );

  const tabVal: [string, string, string][] = [
    ["Prix = 2 × n. Pour n = 7, prix ?", "14", "2 × 7"],
    ["Périmètre = 4 × c. Pour c = 9, périmètre ?", "36", "4 × 9"],
    ["Aire = c × c. Pour c = 7, aire ?", "49", "7 × 7"],
  ];
  tabVal.forEach(([t, r, h]) =>
    qs.push({ text: t, answer: r, category: "Tableau de valeurs", hint: h })
  );

  return qs;
}
