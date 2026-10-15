import type { Question, ThemeConfig } from "./types";
import { A, F, frac, makeBank } from "./helpers";

/**
 * Programme de 6ème découpé par chapitre. Les automatismes de calcul mental
 * (tables, doubles, compléments…) viennent de grades.ts et forment le chapitre
 * « Calcul mental & tables ».
 */
export const CHAPTERS_6EME: ThemeConfig[] = [
  {
    id: "6e-calcul", name: "Calcul mental & tables", emoji: "🧮",
    colorClass: "text-game-gold", borderClass: "border-game-gold", bgClass: "bg-game-gold",
    prefixes: ["Tables", "Additions", "Soustractions", "Doubles", "Moitiés", "Triples", "×10",
      "Compléments", "Division simple", "Carrés", "Calcul astucieux"],
  },
  {
    id: "6e-entiers", name: "Entiers & division", emoji: "🔢",
    colorClass: "text-game-teal", borderClass: "border-game-teal", bgClass: "bg-game-teal",
    prefixes: ["Numération", "Division euclidienne", "Multiples et diviseurs", "Critères de divisibilité", "Ordre de grandeur"],
  },
  {
    id: "6e-decimaux", name: "Nombres décimaux", emoji: "💧",
    colorClass: "text-game-mint", borderClass: "border-game-mint", bgClass: "bg-game-mint",
    prefixes: ["Décimaux"],
  },
  {
    id: "6e-fractions", name: "Fractions", emoji: "🍕",
    colorClass: "text-game-coral", borderClass: "border-game-coral", bgClass: "bg-game-coral",
    prefixes: ["Fractions"],
  },
  {
    id: "6e-proportionnalite", name: "Proportionnalité & %", emoji: "⚖️",
    colorClass: "text-game-purple", borderClass: "border-game-purple", bgClass: "bg-game-purple",
    prefixes: ["Proportionnalité", "Pourcentages", "Échelles"],
  },
  {
    id: "6e-grandeurs", name: "Grandeurs & mesures", emoji: "📏",
    colorClass: "text-game-pink", borderClass: "border-game-pink", bgClass: "bg-game-pink",
    prefixes: ["Conversions", "Durées", "Périmètres", "Aires", "Volumes", "Angles"],
  },
  {
    id: "6e-geometrie", name: "Géométrie", emoji: "📐",
    colorClass: "text-game-teal", borderClass: "border-game-teal", bgClass: "bg-game-teal",
    prefixes: ["Géométrie"],
  },
  {
    id: "6e-problemes", name: "Problèmes & données", emoji: "🧩",
    colorClass: "text-game-gold", borderClass: "border-game-gold", bgClass: "bg-game-gold",
    prefixes: ["Problèmes", "Tableaux"],
  },
];

export function get6emeProgramQuestions(): Question[] {
  const { qs, add, qcm } = makeBank();

  // ═══ CALCUL ASTUCIEUX ═════════════════════════════════════
  const astuce: [string, number, string][] = [
    ["25 × 4", 100, "25 × 4 = 100 : à connaître par cœur"], ["25 × 8", 200, "25 × 4 × 2"],
    ["50 × 6", 300, "50 × 2 × 3"], ["4 × 17 × 25", 1700, "4 × 25 = 100"],
    ["2 × 37 × 5", 370, "2 × 5 = 10"], ["99 + 47", 146, "100 + 47 − 1"],
    ["198 + 35", 233, "200 + 35 − 2"], ["63 − 19", 44, "63 − 20 + 1"],
    ["125 − 98", 27, "125 − 100 + 2"], ["9 × 12", 108, "10 × 12 − 12"],
    ["11 × 14", 154, "10 × 14 + 14"], ["5 × 48", 240, "48 × 10 ÷ 2"],
    ["36 + 27 + 64", 127, "36 + 64 = 100"], ["17 + 45 + 83", 145, "17 + 83 = 100"],
    ["15 × 4", 60, "15 × 2 × 2"], ["0,5 × 60", 30, "La moitié de 60"],
  ];
  astuce.forEach(([t, r, h]) => add("Calcul astucieux", t, A(r), h));

  // ═══ ENTIERS & DIVISION ═══════════════════════════════════
  const numer: [number, string, number][] = [
    [4 + 70 + 300 + 2000, "chiffre des centaines", 3], [58_402, "chiffre des milliers", 8],
    [907_315, "chiffre des dizaines", 1], [1_264, "nombre de centaines", 12],
    [35_870, "nombre de dizaines", 3587], [6_041, "chiffre des unités", 1],
    [120_000, "nombre de milliers", 120], [9_876, "chiffre des centaines", 8],
  ];
  numer.forEach(([n, what, r]) => add("Numération", `${n.toLocaleString("fr-FR")} : ${what} ?`, A(r),
    what.startsWith("nombre") ? "On garde tous les chiffres jusqu'au rang demandé." : "Repère le rang dans le nombre."));
  [["3 milliers + 4 centaines + 5 unités", 3405], ["2 centaines + 7 dizaines", 270],
   ["5 dizaines de milliers + 6 unités", 50006], ["12 centaines", 1200], ["40 dizaines", 400]].forEach(([t, r]) =>
    add("Numération", `${t} = ?`, A(r as number), "Écris chaque chiffre à sa place."));

  const de: [number, number][] = [[37, 5], [52, 6], [29, 4], [100, 9], [75, 8], [64, 7], [45, 4], [90, 11], [58, 3], [123, 10]];
  de.forEach(([a, b]) => {
    add("Division euclidienne", `Quotient de ${a} par ${b}`, A(Math.floor(a / b)), `${a} = ${b} × ${Math.floor(a / b)} + ${a % b}`);
    add("Division euclidienne", `Reste de ${a} par ${b}`, A(a % b), `${a} = ${b} × ${Math.floor(a / b)} + ${a % b}`);
  });
  [["26 élèves en équipes de 4. Combien d'équipes complètes ?", 6, "26 = 4 × 6 + 2"],
   ["50 œufs en boîtes de 6. Combien de boîtes pleines ?", 8, "50 = 6 × 8 + 2"],
   ["50 œufs en boîtes de 6. Combien d'œufs restent ?", 2, "50 = 6 × 8 + 2"],
   ["31 personnes, voitures de 5 places. Voitures nécessaires ?", 7, "31 = 5 × 6 + 1 : il faut une voiture de plus"]].forEach(([t, r, h]) =>
    add("Division euclidienne", t as string, A(r as number), h as string));

  [[24, 6], [35, 4], [42, 7], [56, 8], [45, 5], [81, 6], [72, 9], [100, 8], [63, 3], [49, 9]].forEach(([n, d]) =>
    qcm("Multiples et diviseurs", `${n} est-il un multiple de ${d} ?`, n % d === 0 ? "Oui" : "Non", [n % d === 0 ? "Non" : "Oui"], `${n} ÷ ${d}`));
  [[7, 4], [9, 3], [12, 5], [15, 2], [25, 4]].forEach(([n, k]) =>
    add("Multiples et diviseurs", `${k}e multiple non nul de ${n}`, A(n * k), `${n} × ${k}`));

  [312, 405, 1_000, 2_457, 738, 125, 990, 4_321].forEach(n => {
    qcm("Critères de divisibilité", `${n.toLocaleString("fr-FR")} est-il divisible par 2 ?`, n % 2 === 0 ? "Oui" : "Non", [n % 2 === 0 ? "Non" : "Oui"], "Chiffre des unités pair ?");
    qcm("Critères de divisibilité", `${n.toLocaleString("fr-FR")} est-il divisible par 3 ?`, n % 3 === 0 ? "Oui" : "Non", [n % 3 === 0 ? "Non" : "Oui"], "La somme des chiffres est-elle dans la table de 3 ?");
  });
  [135, 240, 1_002, 3_445, 909].forEach(n =>
    qcm("Critères de divisibilité", `${n.toLocaleString("fr-FR")} est-il divisible par 5 ?`, n % 5 === 0 ? "Oui" : "Non", [n % 5 === 0 ? "Non" : "Oui"], "Se termine par 0 ou 5 ?"));
  [729, 1_233, 504, 811].forEach(n =>
    qcm("Critères de divisibilité", `${n.toLocaleString("fr-FR")} est-il divisible par 9 ?`, n % 9 === 0 ? "Oui" : "Non", [n % 9 === 0 ? "Non" : "Oui"], "La somme des chiffres est-elle dans la table de 9 ?"));

  const odg: [string, string, string[]][] = [
    ["Ordre de grandeur de 498 + 302", "800", ["700", "900", "8 000"]],
    ["Ordre de grandeur de 51 × 19", "1 000", ["100", "500", "10 000"]],
    ["Ordre de grandeur de 2 987 − 1 012", "2 000", ["1 000", "3 000", "20 000"]],
    ["Ordre de grandeur de 39 × 21", "800", ["80", "600", "8 000"]],
    ["Ordre de grandeur de 6 012 ÷ 3", "2 000", ["200", "3 000", "20 000"]],
    ["Ordre de grandeur de 99 × 99", "10 000", ["1 000", "9 000", "100 000"]],
  ];
  odg.forEach(([t, r, w]) => qcm("Ordre de grandeur", t, r, w, "Arrondis chaque nombre puis calcule."));

  // ═══ NOMBRES DÉCIMAUX ═════════════════════════════════════
  const rang: [string, string, number][] = [
    ["4,37", "chiffre des dixièmes", 3], ["12,058", "chiffre des centièmes", 5], ["0,906", "chiffre des millièmes", 6],
    ["58,24", "chiffre des dizaines", 5], ["3,7", "chiffre des unités", 3], ["21,409", "chiffre des dixièmes", 4],
  ];
  rang.forEach(([n, w, r]) => add("Décimaux : rangs", `${n} : ${w} ?`, A(r), "Après la virgule : dixièmes, centièmes, millièmes."));
  [["3 unités et 4 dixièmes", 3.4], ["2 unités et 5 centièmes", 2.05], ["7 dixièmes", 0.7], ["45 centièmes", 0.45],
   ["1 unité et 8 millièmes", 1.008], ["12 dixièmes", 1.2]].forEach(([t, r]) =>
    add("Décimaux : rangs", `${t} = ? (écriture décimale)`, A(r as number), "Place chaque chiffre à son rang."));

  const cmp: [number, number][] = [[2.5, 2.45], [0.7, 0.68], [3.09, 3.1], [12.4, 12.04], [0.5, 0.499], [1.25, 1.3], [8.8, 8.79], [0.1, 0.09]];
  cmp.forEach(([a, b]) => qcm("Décimaux : comparer", `Le plus grand : ${F(a)} ou ${F(b)} ?`, F(Math.max(a, b)), [F(Math.min(a, b))],
    "Compare chiffre par chiffre à partir de la gauche (ajoute des zéros si besoin)."));
  [["2,3 ; 2,03 ; 2,33", "2,03"], ["0,5 ; 0,45 ; 0,405", "0,405"], ["1,9 ; 1,09 ; 1,99", "1,09"], ["7 ; 6,99 ; 7,01", "6,99"]].forEach(([l, r]) => {
    const opts = l.split(" ; ");
    qcm("Décimaux : comparer", `Le plus petit parmi ${l}`, r, opts.filter(o => o !== r));
  });

  const pw: [number, number, "×" | "÷"][] = [
    [3.45, 10, "×"], [0.72, 100, "×"], [5.3, 1000, "×"], [0.08, 10, "×"], [12.5, 100, "×"],
    [45, 10, "÷"], [3.8, 100, "÷"], [250, 1000, "÷"], [7, 100, "÷"], [0.6, 10, "÷"],
  ];
  pw.forEach(([a, k, op]) => add("Décimaux : ×10, ÷10", `${F(a)} ${op} ${k}`, A(op === "×" ? a * k : a / k),
    op === "×" ? `Chaque chiffre prend une valeur ${k} fois plus grande.` : `Chaque chiffre prend une valeur ${k} fois plus petite.`));

  const decAdd: [number, number][] = [[2.5, 1.7], [3.25, 0.75], [10.4, 2.65], [0.9, 0.3], [6.08, 1.2], [4.5, 4.5]];
  decAdd.forEach(([a, b]) => add("Décimaux : addition", `${F(a)} + ${F(b)}`, A(a + b), "Aligne les virgules."));
  const decSub: [number, number][] = [[5.6, 2.3], [7, 2.5], [3.2, 1.45], [10, 0.1], [8.75, 3.25], [4.1, 0.6]];
  decSub.forEach(([a, b]) => add("Décimaux : soustraction", `${F(a)} − ${F(b)}`, A(a - b), "Aligne les virgules ; complète par des zéros."));
  const decMul: [number, number][] = [[0.5, 8], [1.2, 3], [2.5, 4], [0.3, 6], [1.5, 5], [0.25, 4], [3.1, 2], [0.4, 0.5]];
  decMul.forEach(([a, b]) => add("Décimaux : multiplication", `${F(a)} × ${F(b)}`, A(a * b), "Calcule sans virgule, puis place-la."));

  [[3.46, "à l'unité", 3], [7.82, "à l'unité", 8], [2.349, "au dixième", 2.3], [5.96, "au dixième", 6],
   [12.555, "au centième", 12.56], [0.748, "au centième", 0.75]].forEach(([n, w, r]) =>
    add("Décimaux : arrondi", `Arrondi de ${F(n as number)} ${w}`, A(r as number), "Regarde le chiffre juste après le rang demandé : 5 ou plus, on arrondit au-dessus."));

  [["Entre 3 et 4, au milieu", 3.5], ["Entre 0 et 1, graduation 3 sur 10", 0.3], ["Entre 2 et 3, graduation 7 sur 10", 2.7],
   ["Entre 1 et 2, graduation 1 sur 4", 1.25], ["Entre 5 et 6, graduation 4 sur 5", 5.8]].forEach(([t, r]) =>
    add("Décimaux : droite graduée", `${t} : abscisse ?`, A(r as number), "Cherche la valeur d'une graduation."));

  // ═══ FRACTIONS ════════════════════════════════════════════
  const fq: [number, number, number][] = [
    [1, 2, 18], [1, 3, 27], [1, 4, 20], [3, 4, 20], [2, 3, 15], [1, 5, 35], [2, 5, 25], [1, 10, 70],
    [3, 10, 50], [5, 6, 12], [3, 8, 16], [1, 2, 9],
  ];
  fq.forEach(([n, d, x]) => add("Fractions : d'une quantité", `${n}/${d} de ${x}`, A(n * x / d), `${x} ÷ ${d} × ${n}`));
  [["Un gâteau coupé en 8 parts, on en mange 3. Fraction mangée ?", "3/8", "3 parts sur 8"],
   ["Une pizza en 6 parts, il en reste 1. Fraction restante ?", "1/6", "1 part sur 6"],
   ["Une tablette de 12 carrés, on en mange 4. Fraction mangée (irréductible) ?", "1/3", "4/12 = 1/3"],
   ["Une heure, c'est quelle fraction d'une journée ?", "1/24", "1 heure sur 24"],
   ["15 minutes, c'est quelle fraction d'une heure (irréductible) ?", "1/4", "15/60 = 1/4"]].forEach(([t, r, h]) =>
    add("Fractions : partage", t, r, h));

  [[3, 7], [5, 9], [11, 4], [2, 3], [13, 6]].forEach(([a, b]) =>
    add("Fractions : quotient", `${b} × ${a}/${b} = ?`, A(a), `a/b est le nombre qui, multiplié par b, donne a.`));
  [[7, 5], [2, 3], [9, 4]].forEach(([a, b]) =>
    add("Fractions : quotient", `${b} × … = ${a} (fraction)`, frac(a, b), `Le nombre cherché est ${a}/${b}.`));

  [["3/10", 0.3], ["7/100", 0.07], ["45/100", 0.45], ["12/10", 1.2], ["5/1000", 0.005], ["1/2", 0.5],
   ["1/4", 0.25], ["3/4", 0.75], ["1/5", 0.2]].forEach(([f, v]) =>
    add("Fractions : écriture décimale", `${f} en écriture décimale`, A(v as number), "Une fraction décimale a pour dénominateur 10, 100, 1 000…"));
  [["0,7", "7/10"], ["0,03", "3/100"], ["0,25", "1/4"], ["1,5", "3/2"], ["0,5", "1/2"]].forEach(([d, f]) =>
    add("Fractions : écriture décimale", `${d} en fraction (irréductible)`, f, "0,1 = 1/10 ; 0,01 = 1/100"));

  [["5/4", "Plus grand que 1"], ["3/7", "Plus petit que 1"], ["9/9", "Égal à 1"], ["12/5", "Plus grand que 1"],
   ["1/3", "Plus petit que 1"], ["8/8", "Égal à 1"]].forEach(([f, r]) =>
    qcm("Fractions : comparer à 1", `${f} est…`, r, ["Plus grand que 1", "Plus petit que 1", "Égal à 1"].filter(o => o !== r),
      "Compare le numérateur et le dénominateur."));
  [["2/7", "5/7"], ["3/8", "1/8"], ["4/5", "4/9"], ["7/10", "9/10"], ["1/2", "1/3"]].forEach(([a, b]) => {
    const v = (s: string) => { const [x, y] = s.split("/").map(Number); return x / y; };
    const big = v(a) > v(b) ? a : b;
    qcm("Fractions : comparer", `La plus grande : ${a} ou ${b} ?`, big, [big === a ? b : a], "Même dénominateur : compare les numérateurs. Même numérateur : le plus petit dénominateur gagne.");
  });
  [[1, 2, 4], [2, 3, 6], [3, 5, 10], [1, 4, 12], [3, 4, 8], [2, 5, 15]].forEach(([n, d, D]) =>
    add("Fractions : égales", `${n}/${d} = ?/${D}`, A(n * D / d), `On multiplie en haut et en bas par ${D / d}.`));

  // ═══ PROPORTIONNALITÉ & POURCENTAGES ══════════════════════
  const pr: [string, number, string][] = [
    ["2 croissants = 2,40 €. 5 croissants ?", 6, "1 croissant = 1,20 €"],
    ["3 cahiers = 6 €. 9 cahiers ?", 18, "3 fois plus de cahiers"],
    ["4 kg de pommes = 10 €. 2 kg ?", 5, "Deux fois moins"],
    ["5 tickets = 7,50 €. 10 tickets ?", 15, "Deux fois plus"],
    ["Recette : 150 g de farine pour 3 crêpes… pour 6 crêpes ?", 300, "× 2"],
    ["1 tour de piste = 400 m. 7 tours ?", 2800, "400 × 7"],
    ["6 bouteilles = 9 L. 2 bouteilles ?", 3, "÷ 3"],
    ["Une voiture fait 60 km en 1 h. En 3 h ?", 180, "60 × 3"],
    ["10 stylos = 4 €. 15 stylos ?", 6, "10 + 5 : 4 € + 2 €"],
    ["8 places = 40 €. 3 places ?", 15, "1 place = 5 €"],
  ];
  pr.forEach(([t, r, h]) => add("Proportionnalité", t, A(r), h));
  [["Prix et quantité de pain au même prix unitaire", "Oui"], ["Âge et taille d'un enfant", "Non"],
   ["Périmètre d'un carré et longueur du côté", "Oui"], ["Aire d'un carré et longueur du côté", "Non"],
   ["Distance parcourue à vitesse constante et durée", "Oui"]].forEach(([t, r]) =>
    qcm("Proportionnalité : reconnaître", `${t} : proportionnalité ?`, r, [r === "Oui" ? "Non" : "Oui"], "Si on double l'une, l'autre double-t-elle ?"));

  [[50, 40], [50, 18], [25, 40], [25, 100], [10, 70], [10, 250], [20, 50], [75, 40], [100, 13], [10, 5]].forEach(([p, n]) =>
    add("Pourcentages", `${p} % de ${n}`, A(p * n / 100),
      p === 50 ? "50 % = la moitié" : p === 25 ? "25 % = le quart" : p === 10 ? "10 % = on divise par 10" : p === 75 ? "75 % = les trois quarts" : p === 100 ? "100 % = la totalité" : "20 % = 2 × 10 %"));
  [["Sur 20 élèves, 10 ont un chien. Pourcentage ?", 50], ["Sur 100 élèves, 37 sont demi-pensionnaires. Pourcentage ?", 37],
   ["Sur 4 parts, 1 est mangée. Pourcentage mangé ?", 25], ["Sur 10 tirs, 7 réussis. Pourcentage ?", 70]].forEach(([t, r]) =>
    add("Pourcentages", t as string, A(r as number), "Ramène à 100."));

  [["Échelle 1/100 : 4 cm sur le plan = ? m en réalité", 4], ["Échelle 1/1000 : 2 cm sur le plan = ? m en réalité", 20],
   ["Échelle 1/50 : 10 cm sur le plan = ? cm en réalité", 500], ["Échelle 1/200 : 5 cm sur le plan = ? m en réalité", 10]].forEach(([t, r]) =>
    add("Échelles", t as string, A(r as number), "Multiplie par le dénominateur de l'échelle, puis convertis."));

  // ═══ GRANDEURS & MESURES ══════════════════════════════════
  const conv: [string, number][] = [
    ["3 m = … cm", 300], ["4,5 km = … m", 4500], ["250 cm = … m", 2.5], ["7 mm = … cm", 0.7], ["1,2 m = … mm", 1200],
    ["2 kg = … g", 2000], ["500 g = … kg", 0.5], ["3,5 t = … kg", 3500], ["1 L = … cL", 100], ["75 cL = … L", 0.75],
    ["2 L = … mL", 2000], ["0,8 km = … m", 800],
  ];
  conv.forEach(([t, r]) => add("Conversions", t, A(r), "km hm dam m dm cm mm : ×10 à chaque rang vers la droite."));
  [["1 h 30 min = … min", 90], ["2 h = … min", 120], ["150 min = … h (décimal)", 2.5], ["3 min = … s", 180],
   ["1 h 15 min = … min", 75], ["1 jour = … h", 24], ["45 min = … h (décimal)", 0.75]].forEach(([t, r]) =>
    add("Durées", t as string, A(r as number), "1 h = 60 min ; 1 min = 60 s."));
  [["Départ 8 h 45, trajet de 30 min. Arrivée à 9 h … min ?", 15, "8 h 45 + 15 min = 9 h, puis encore 15 min"],
   ["Film de 14 h 20 à 16 h 05 : durée en minutes ?", 105, "14 h 20 → 16 h 20 = 120 min, moins 15"],
   ["Cours de 10 h 05 à 10 h 55 : durée en minutes ?", 50, "55 − 5"]].forEach(([t, r, h]) =>
    add("Durées", t as string, A(r as number), h as string));

  [3, 5, 7, 12, 2.5].forEach(c => add("Périmètres", `Carré de côté ${F(c)} cm : périmètre (cm) ?`, A(4 * c), "P = 4 × côté"));
  [[6, 4], [10, 3], [8, 2.5], [12, 5]].forEach(([L, l]) => add("Périmètres", `Rectangle ${F(L)} cm × ${F(l)} cm : périmètre (cm) ?`, A(2 * (L + l)), "P = 2 × (L + l)"));
  [1, 2, 5, 10].forEach(r => add("Périmètres", `Cercle de rayon ${r} cm (π ≈ 3) : périmètre (cm) ?`, A(6 * r), "P = 2 × π × r"));
  [[3, 4, 5], [6, 6, 6], [5, 7, 9]].forEach(([a, b, c]) => add("Périmètres", `Triangle de côtés ${a}, ${b} et ${c} cm : périmètre ?`, A(a + b + c), "On additionne les côtés."));

  [4, 6, 9, 10, 1.5].forEach(c => add("Aires", `Carré de côté ${F(c)} cm : aire (cm²) ?`, A(c * c), "A = côté × côté"));
  [[5, 3], [8, 4], [12, 2], [7, 6], [2.5, 4]].forEach(([L, l]) => add("Aires", `Rectangle ${F(L)} × ${F(l)} cm : aire (cm²) ?`, A(L * l), "A = L × l"));
  [[6, 4], [10, 5], [8, 3]].forEach(([a, b]) => add("Aires", `Triangle rectangle de côtés de l'angle droit ${a} et ${b} cm : aire ?`, A(a * b / 2), "C'est la moitié d'un rectangle."));
  [["1 m² = … dm²", 100], ["1 dm² = … cm²", 100], ["3 m² = … dm²", 300], ["500 cm² = … dm²", 5]].forEach(([t, r]) =>
    add("Aires", t as string, A(r as number), "En aire, on multiplie par 100 à chaque rang."));

  [[2, 3, 4], [5, 2, 1], [10, 10, 10], [4, 4, 2]].forEach(([a, b, c]) =>
    add("Volumes", `Pavé droit ${a} × ${b} × ${c} cm : volume (cm³) ?`, A(a * b * c), "V = L × l × h"));
  [2, 3, 5].forEach(c => add("Volumes", `Cube d'arête ${c} cm : volume (cm³) ?`, A(c ** 3), "V = c × c × c"));

  [["Un angle de 35° est…", "Aigu"], ["Un angle de 90° est…", "Droit"], ["Un angle de 130° est…", "Obtus"],
   ["Un angle de 180° est…", "Plat"], ["Un angle de 89° est…", "Aigu"], ["Un angle de 91° est…", "Obtus"]].forEach(([t, r]) =>
    qcm("Angles : nature", t, r, ["Aigu", "Droit", "Obtus", "Plat"].filter(o => o !== r)));
  [["Angle droit coupé en deux : mesure ?", 45], ["Angle plat coupé en trois : mesure ?", 60],
   ["Un quart de tour : mesure ?", 90], ["Un demi-tour : mesure ?", 180], ["Il manque combien à 70° pour faire un angle droit ?", 20]].forEach(([t, r]) =>
    add("Angles : mesures", t as string, A(r as number), "Angle droit = 90° ; angle plat = 180°."));

  // ═══ GÉOMÉTRIE ════════════════════════════════════════════
  const geo: [string, string, string[], string?][] = [
    ["Un carré a combien d'axes de symétrie ?", "4", ["2", "1", "0"], "2 médianes et 2 diagonales"],
    ["Un rectangle (non carré) a combien d'axes de symétrie ?", "2", ["4", "1", "0"], "Ses diagonales ne sont pas des axes."],
    ["Un triangle équilatéral a combien d'axes de symétrie ?", "3", ["1", "6", "0"]],
    ["Un triangle isocèle (non équilatéral) a combien d'axes ?", "1", ["2", "3", "0"]],
    ["Un cercle a combien d'axes de symétrie ?", "Une infinité", ["1", "2", "4"], "Tout diamètre est un axe."],
    ["Un losange (non carré) a combien d'axes de symétrie ?", "2", ["4", "1", "0"], "Ses diagonales."],
  ];
  geo.forEach(([t, r, w, h]) => qcm("Géométrie : symétrie axiale", t, r, w, h));
  [["Par symétrie axiale, une longueur…", "Est conservée", ["Double", "Diminue de moitié"]],
   ["Le symétrique d'un angle de 40° mesure…", "40°", ["140°", "80°"]],
   ["Un point situé sur l'axe a pour symétrique…", "Lui-même", ["Un point de l'autre côté", "Aucun point"]]].forEach(([t, r, w]) =>
    qcm("Géométrie : symétrie axiale", t as string, r as string, w as string[], "La symétrie axiale conserve longueurs, angles et alignement."));

  const quad: [string, string, string[]][] = [
    ["Quadrilatère avec 4 angles droits :", "Rectangle", ["Losange", "Trapèze"]],
    ["Quadrilatère avec 4 côtés de même longueur :", "Losange", ["Rectangle", "Trapèze"]],
    ["4 côtés égaux et 4 angles droits :", "Carré", ["Losange", "Rectangle"]],
    ["Triangle avec 3 côtés égaux :", "Équilatéral", ["Isocèle seulement", "Rectangle"]],
    ["Triangle avec un angle droit :", "Rectangle", ["Équilatéral", "Isocèle"]],
    ["Triangle avec 2 côtés égaux :", "Isocèle", ["Équilatéral", "Rectangle"]],
  ];
  quad.forEach(([t, r, w]) => qcm("Géométrie : figures", t, r, w));
  [["Cercle de rayon 4 cm : diamètre (cm) ?", 8], ["Cercle de diamètre 10 cm : rayon (cm) ?", 5],
   ["Cercle de diamètre 7 cm : rayon (cm) ?", 3.5], ["Un point à 3 cm du centre est sur le cercle de rayon… (cm)", 3]].forEach(([t, r]) =>
    add("Géométrie : cercle", t as string, A(r as number), "Diamètre = 2 × rayon."));
  [["Deux droites perpendiculaires à une même droite sont…", "Parallèles", ["Perpendiculaires", "Sécantes"]],
   ["Deux droites qui se coupent à angle droit sont…", "Perpendiculaires", ["Parallèles", "Confondues"]],
   ["Si (d1) // (d2) et (d3) ⊥ (d1), alors (d3) et (d2) sont…", "Perpendiculaires", ["Parallèles", "On ne peut pas savoir"]],
   ["Le point équidistant des extrémités d'un segment est sur…", "Sa médiatrice", ["Sa bissectrice", "Son milieu seulement"]]].forEach(([t, r, w]) =>
    qcm("Géométrie : droites", t as string, r as string, w as string[]));
  [["Un cube a combien de faces ?", 6], ["Un cube a combien d'arêtes ?", 12], ["Un cube a combien de sommets ?", 8],
   ["Un pavé droit a combien de faces ?", 6]].forEach(([t, r]) =>
    add("Géométrie : solides", t as string, A(r as number), "Pense à un dé."));

  // ═══ PROBLÈMES & DONNÉES ══════════════════════════════════
  const pb: [string, number, string][] = [
    ["Léa a 25 €. Elle achète un livre à 8,50 €. Il lui reste ?", 16.5, "25 − 8,50"],
    ["3 paquets de 12 biscuits. Combien de biscuits ?", 36, "3 × 12"],
    ["84 bonbons partagés entre 4 enfants. Chacun reçoit ?", 21, "84 ÷ 4"],
    ["Un bus part avec 30 passagers, 12 descendent, 7 montent. Combien ?", 25, "30 − 12 + 7"],
    ["Un livre de 240 pages, j'en ai lu 85. Il reste ?", 155, "240 − 85"],
    ["Un cinéma : 15 rangées de 20 sièges. Combien de sièges ?", 300, "15 × 20"],
    ["Paul a 3 fois plus de billes que Tom qui en a 14. Paul en a ?", 42, "3 × 14"],
    ["Un ticket coûte 1,50 €. Prix de 4 tickets ?", 6, "4 × 1,50"],
    ["Sami a 12 ans, son père a 3 fois son âge plus 4. Âge du père ?", 40, "3 × 12 + 4"],
    ["Un rectangle a un périmètre de 20 cm et une longueur de 6 cm. Largeur ?", 4, "20 ÷ 2 = 10, puis 10 − 6"],
  ];
  pb.forEach(([t, r, h]) => add("Problèmes", t, A(r), h));
  const tab: [string, number, string][] = [
    ["Classe : 12 filles et 14 garçons. Effectif total ?", 26, "12 + 14"],
    ["Lundi 8, mardi 5, mercredi 11 absents. Total ?", 24, "8 + 5 + 11"],
    ["Ventes : 45 le matin, 30 l'après-midi. Écart ?", 15, "45 − 30"],
    ["Sur 30 élèves : 18 à la cantine. Combien n'y vont pas ?", 12, "30 − 18"],
    ["Notes : 12, 15, 9. Note la plus haute moins la plus basse ?", 6, "15 − 9"],
    ["Graphique : 4 cases de 5 élèves. Combien d'élèves ?", 20, "4 × 5"],
  ];
  tab.forEach(([t, r, h]) => add("Tableaux & graphiques", t, A(r), h));

  return qs;
}
