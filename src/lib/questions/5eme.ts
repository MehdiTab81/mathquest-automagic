import type { Question, ThemeConfig } from "./types";

/**
 * Programme de 5ème (cycle 4, programme 2025) découpé par chapitre officiel.
 * Toutes les questions sont générées de façon déterministe (identifiants stables).
 */

// ─── Chapitres de 5ème (sous-thèmes du menu) ───────────────
export const CHAPTERS_5EME: ThemeConfig[] = [
  {
    id: "5e-entiers", name: "Nombres entiers & priorités", emoji: "🔢",
    colorClass: "text-game-gold", borderClass: "border-game-gold", bgClass: "bg-game-gold",
    prefixes: ["Priorités opératoires", "Distributivité numérique", "Multiples et diviseurs",
      "Divisibilité", "Division euclidienne", "Termes et facteurs", "Décomposer"],
  },
  {
    id: "5e-relatifs", name: "Nombres relatifs", emoji: "🌡️",
    colorClass: "text-game-teal", borderClass: "border-game-teal", bgClass: "bg-game-teal",
    prefixes: ["Relatifs", "Opposé", "Comparer des relatifs", "Compléments à trou", "Décimaux : opérations"],
  },
  {
    id: "5e-rationnels", name: "Nombres rationnels", emoji: "🍕",
    colorClass: "text-game-coral", borderClass: "border-game-coral", bgClass: "bg-game-coral",
    prefixes: ["Fractions égales", "Comparer des fractions", "Écriture mixte", "Fractions : écriture décimale",
      "Add/sub fractions", "Fraction d'un nombre", "Pourcentages simples", "Écritures d'un nombre",
      "Quotients à trou"],
  },
  {
    id: "5e-puissances", name: "Puissances", emoji: "⚡",
    colorClass: "text-game-purple", borderClass: "border-game-purple", bgClass: "bg-game-purple",
    prefixes: ["Carrés de 0 à 12", "Cubes", "Puissances simples", "Écrire en puissance"],
  },
  {
    id: "5e-litteral", name: "Calcul littéral", emoji: "✏️",
    colorClass: "text-game-pink", borderClass: "border-game-pink", bgClass: "bg-game-pink",
    prefixes: ["Motifs évolutifs", "Formules littérales", "Substitution", "Somme ou produit",
      "Développer k(a+b)", "Réduire ax+b", "Égalité vraie ou fausse", "Équation x+b=c", "Équation ax=c"],
  },
  {
    id: "5e-grandeurs", name: "Grandeurs & mesures", emoji: "📏",
    colorClass: "text-game-mint", borderClass: "border-game-mint", bgClass: "bg-game-mint",
    prefixes: ["Volumes", "Unités de volume", "Aire du disque", "Aire du triangle", "Angles",
      "Périmètres", "Aires"],
  },
  {
    id: "5e-donnees", name: "Statistiques & probabilités", emoji: "🎲",
    colorClass: "text-game-gold", borderClass: "border-game-gold", bgClass: "bg-game-gold",
    prefixes: ["Moyenne simple", "Effectif", "Fréquence", "Probabilité simple", "Échelle de proba"],
  },
  {
    id: "5e-proportionnalite", name: "Proportionnalité & fonctions", emoji: "⚖️",
    colorClass: "text-game-teal", borderClass: "border-game-teal", bgClass: "bg-game-teal",
    prefixes: ["Proportionnalité", "Pourcentage de voix", "En fonction de", "Tableau de valeurs"],
  },
];

/** Chapitre « entretien » : tous les automatismes hérités de 6ème non couverts ci-dessus. */
export const ENTRETIEN_5EME: ThemeConfig = {
  id: "5e-entretien", name: "Entretien (tables, calcul mental)", emoji: "🧠",
  colorClass: "text-game-mint", borderClass: "border-game-mint", bgClass: "bg-game-mint",
  prefixes: [],
};

// ─── Helpers ───────────────────────────────────────────────
const r2 = (n: number) => Math.round(n * 1000) / 1000;
/** Valeur attendue (point décimal, signe "-") */
const A = (n: number) => String(r2(n));
/** Affichage français (virgule, signe "−") */
const F = (n: number) => String(r2(n)).replace(".", ",").replace("-", "−");
/** Relatif entre parenthèses si négatif */
const P = (n: number) => (n < 0 ? `(${F(n)})` : F(n));
const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));
const frac = (n: number, d: number) => {
  const g = gcd(n, d);
  const nn = n / g, dd = d / g;
  return dd === 1 ? String(nn) : `${nn}/${dd}`;
};

export function get5emeProgramQuestions(): Question[] {
  const qs: Question[] = [];
  const add = (category: string, text: string, answer: string, hint?: string, options?: string[]) =>
    qs.push({ text, answer, category, ...(hint ? { hint } : {}), ...(options ? { options } : {}) });

  // ═══ 1. NOMBRES ENTIERS & PRIORITÉS ═══════════════════════
  const prio: [number, number, number][] = [
    [3, 4, 2], [5, 2, 3], [7, 3, 3], [1, 5, 5], [9, 2, 4], [6, 3, 5], [8, 7, 2], [4, 6, 3],
    [10, 2, 9], [12, 3, 4], [2, 8, 5], [15, 4, 4],
  ];
  prio.forEach(([a, b, c]) => add("Priorités opératoires", `${a} + ${b} × ${c}`, A(a + b * c), "La multiplication est prioritaire."));
  prio.forEach(([a, b, c]) => add("Priorités opératoires", `(${a} + ${b}) × ${c}`, A((a + b) * c), "Les parenthèses d'abord."));
  [[20, 4, 3], [30, 5, 4], [50, 6, 7], [40, 3, 9], [25, 2, 8], [60, 7, 5]].forEach(([a, b, c]) =>
    add("Priorités opératoires", `${a} − ${b} × ${c}`, A(a - b * c), "La multiplication est prioritaire."));
  [[24, 6, 2], [36, 4, 5], [48, 8, 3], [30, 6, 4]].forEach(([a, b, c]) =>
    add("Priorités opératoires", `${a} ÷ ${b} + ${c}`, A(a / b + c), "La division est prioritaire."));
  [[2, 3, 4, 5], [6, 2, 3, 1], [5, 4, 2, 3], [10, 2, 3, 4]].forEach(([a, b, c, d]) =>
    add("Priorités opératoires", `${a} × ${b} + ${c} × ${d}`, A(a * b + c * d), "Les deux produits d'abord."));

  [[7, 98, 2], [5, 99, 1], [12, 101, 1], [8, 102, 2], [6, 49, 1], [9, 11, 1], [4, 25, 0], [3, 33, 0]].forEach(([k, n]) =>
    add("Distributivité numérique", `${k} × ${n}`, A(k * n), `${k} × ${n} = ${k} × ${Math.round(n / 10) * 10} ${n % 10 >= 5 ? "−" : "+"} …`));
  [[7, 6, 4], [5, 8, 2], [9, 3, 7], [4, 15, 5], [6, 12, 8], [3, 25, 5]].forEach(([k, a, b]) =>
    add("Distributivité numérique", `${k} × ${a} + ${k} × ${b}`, A(k * (a + b)), `= ${k} × (${a} + ${b})`));
  [[13, 7, 3], [17, 4, 6], [24, 3, 7], [35, 8, 2]].forEach(([k, a, b]) =>
    add("Distributivité numérique", `${a} × ${k} + ${b} × ${k}`, A(k * (a + b)), `= (${a} + ${b}) × ${k}`));

  [[24, 6], [35, 7], [42, 8], [56, 9], [63, 7], [45, 6], [72, 8], [81, 9], [36, 5], [48, 12], [100, 15], [91, 7], [51, 3], [57, 3]].forEach(([n, d]) =>
    add("Multiples et diviseurs", `${d} est-il un diviseur de ${n} ?`, n % d === 0 ? "Oui" : "Non", `${n} ÷ ${d}`, ["Oui", "Non"]));
  [[6, 4], [7, 3], [9, 5], [12, 2], [8, 6], [11, 4]].forEach(([n, k]) =>
    add("Multiples et diviseurs", `${k}e multiple de ${n} (après 0)`, A(n * k), `${n} × ${k}`));
  [[12, "6"], [18, "6"], [20, "6"], [15, "4"], [16, "5"], [10, "4"]].forEach(([n, c]) =>
    add("Multiples et diviseurs", `Nombre de diviseurs de ${n}`, String(c), "Liste-les par paires."));

  const div39 = [111, 123, 144, 152, 207, 235, 315, 342, 405, 418, 513, 531, 622, 729, 801, 1002, 1236, 2018];
  div39.forEach(n => add("Divisibilité", `${n} est-il divisible par 3 ?`, n % 3 === 0 ? "Oui" : "Non", "Somme des chiffres divisible par 3 ?", ["Oui", "Non"]));
  div39.slice(0, 12).forEach(n => add("Divisibilité", `${n} est-il divisible par 9 ?`, n % 9 === 0 ? "Oui" : "Non", "Somme des chiffres divisible par 9 ?", ["Oui", "Non"]));
  [130, 245, 316, 470, 1005].forEach(n => add("Divisibilité", `${n} est-il divisible par 5 ?`, n % 5 === 0 ? "Oui" : "Non", "Se termine par 0 ou 5 ?", ["Oui", "Non"]));
  [134, 251, 488, 1007].forEach(n => add("Divisibilité", `${n} est-il divisible par 2 ?`, n % 2 === 0 ? "Oui" : "Non", "Chiffre des unités pair ?", ["Oui", "Non"]));

  [[17, 3], [23, 4], [50, 7], [38, 5], [61, 8], [45, 6], [29, 9], [74, 8], [100, 7], [83, 6], [57, 4], [92, 9]].forEach(([a, b]) => {
    add("Division euclidienne", `Reste de ${a} ÷ ${b}`, A(a % b), `${a} = ${b} × ${Math.floor(a / b)} + ${a % b}`);
    add("Division euclidienne", `Quotient entier de ${a} ÷ ${b}`, A(Math.floor(a / b)), `${a} = ${b} × ${Math.floor(a / b)} + ${a % b}`);
  });

  [["3 + 4 × 5", "Somme"], ["(3 + 4) × 5", "Produit"], ["7 × 2 − 1", "Différence"], ["8 × (2 + 1)", "Produit"],
   ["12 − 3 × 2", "Différence"], ["(5 − 2) × (4 + 1)", "Produit"], ["6 + 9 ÷ 3", "Somme"], ["2 × 3 + 4 × 5", "Somme"]].forEach(([t, r]) =>
    add("Termes et facteurs", `${t} est…`, r, "Quelle est la DERNIÈRE opération effectuée ?", ["Somme", "Différence", "Produit"]));

  [[21, 3], [56, 7], [48, 6], [63, 9], [72, 8], [54, 6], [84, 7], [96, 12]].forEach(([n, a]) =>
    add("Décomposer en produit", `${n} = ${a} × …`, A(n / a)));

  // ═══ 2. NOMBRES RELATIFS ═════════════════════════════════
  const pairs: [number, number][] = [
    [-3, 5], [-7, 2], [4, -9], [-6, -3], [8, -3], [-10, 10], [-4, 7], [-8, -2], [-12, 5], [9, -15],
    [-2.5, 4], [-1.2, -3.4], [3.5, -1.5], [-0.8, 2.3], [-5.5, -4.5], [6.2, -8], [-15, -25], [-0.5, 0.25],
  ];
  pairs.forEach(([a, b]) => add("Relatifs : addition", `${P(a)} + ${P(b)}`, A(a + b), "Signes différents : on soustrait les distances à zéro."));
  pairs.forEach(([a, b]) => add("Relatifs : soustraction", `${P(a)} − ${P(b)}`, A(a - b), "Soustraire, c'est ajouter l'opposé."));
  [[5, 8], [3, 10], [0, 6], [2.5, 4], [1, 7.5]].forEach(([a, b]) =>
    add("Relatifs : soustraction", `${F(a)} − ${F(b)}`, A(a - b), "Le résultat est négatif."));
  const chains: [string, number][] = [
    ["(−3) + 5 − 4", -2], ["(−2) − (−6) + 1", 5], ["7 − 10 + 2", -1], ["(−4) + (−5) + 9", 0],
    ["−3 + 8 − 7 + 2", 0], ["10 − 15 − 5", -10], ["(−1,5) + 2 − 3", -2.5], ["6 − (−4) − 12", -2],
    ["−8 + 3 + 3 + 3", 1], ["(−2) + (−2) + (−2)", -6], ["4 − 9 + 5 − 1", -1], ["−1 − 1 − 1 − 1", -4],
  ];
  chains.forEach(([t, r]) => add("Relatifs : enchaînements", t, A(r), "Regroupe les positifs et les négatifs."));
  const situ: [string, number][] = [
    ["Il fait −3 °C, la température monte de 8 °C. Température ?", 5],
    ["Il fait 4 °C, la température baisse de 9 °C. Température ?", -5],
    ["Écart entre −6 °C et 5 °C (en °C) ?", 11],
    ["Un sous-marin à −120 m remonte de 45 m. Profondeur ?", -75],
    ["Compte à −30 €, on dépose 50 €. Solde ?", 20],
    ["Ascenseur au niveau −2 monte de 5 étages. Niveau ?", 3],
    ["Né en −63, mort en 14. Âge (années) ?", 77],
    ["Écart d'altitude entre 200 m et −50 m ?", 250],
  ];
  situ.forEach(([t, r]) => add("Relatifs : en situation", t, A(r)));

  [-7, 4.5, 0, -12, 3.2, -0.6, 15, -100].forEach(n => add("Opposé d'un nombre", `Opposé de ${P(n)}`, A(-n), "On change le signe."));
  [-7, 4.5, -12, 3.2, -0.6, -100].forEach(n => add("Opposé : valeur absolue", `Distance à zéro de ${P(n)}`, A(Math.abs(n)), "Une distance est toujours positive."));
  [[3, -3], [-5, 5], [7, 7], [-2.5, 2.5]].forEach(([a, b]) => add("Opposé : somme", `${P(a)} + ${P(b)}`, A(a + b), a === -b ? "La somme de deux opposés vaut 0." : undefined));

  const comp: [number, number][] = [
    [-3, -8], [-0.5, 0.2], [-2.7, -2.5], [-1, -10], [-12, 3], [-4.1, -4.01], [0, -0.1], [-25, -52],
    [1.5, -15], [-6, -6.5], [-0.3, -0.03], [-9, 2],
  ];
  comp.forEach(([a, b]) => add("Comparer des relatifs", `Le plus grand : ${F(a)} ou ${F(b)} ?`, F(Math.max(a, b)), "Sur la droite graduée, le plus à droite.", [F(a), F(b)]));
  comp.slice(0, 8).forEach(([a, b]) => add("Comparer des relatifs", `Le plus petit : ${F(a)} ou ${F(b)} ?`, F(Math.min(a, b)), "Sur la droite graduée, le plus à gauche.", [F(a), F(b)]));
  [["−3 ; 2 ; −7", "−7"], ["0 ; −1 ; −0,5", "−1"], ["−2,1 ; −2,01 ; −2", "−2,1"], ["4 ; −4 ; −5", "−5"]].forEach(([l, r]) => {
    const opts = l.split(" ; ");
    add("Comparer des relatifs", `Le plus petit parmi ${l}`, r, undefined, opts);
  });

  [[2, 7], [15, 23], [4.5, 10], [6, 14], [12, 30], [0.7, 1], [3.2, 5], [25, 100], [-3, 2], [-5, -1]].forEach(([a, c]) =>
    add("Compléments à trou", `${P(a)} + … = ${F(c)}`, A(c - a), `On calcule ${F(c)} − ${P(a)}.`));

  const dec: [number, number][] = [[1.5, 2.3], [3.7, 1.8], [0.6, 0.9], [4.25, 3.5], [2.8, 1.75], [12.4, 0.65], [7.05, 2.95]];
  dec.forEach(([a, b]) => add("Décimaux : opérations", `${F(a)} + ${F(b)}`, A(a + b)));
  [[5.7, 2.3], [8.5, 3.8], [4.1, 1.65], [10, 2.4], [6.3, 0.85], [3, 1.25]].forEach(([a, b]) =>
    add("Décimaux : opérations", `${F(a)} − ${F(b)}`, A(a - b)));
  [[0.6, 7], [40, 0.03], [0.4, 8], [0.05, 6], [30, 0.2], [1.5, 4], [0.9, 3], [200, 0.004], [2.5, 0.4], [0.3, 0.3], [1.2, 5], [0.25, 8]].forEach(([a, b]) =>
    add("Décimaux : opérations", `${F(a)} × ${F(b)}`, A(a * b), "Calcule sans virgule puis replace-la."));

  // ═══ 3. NOMBRES RATIONNELS ═══════════════════════════════
  const eg: [number, number, number][] = [
    [2, 3, 15], [4, 7, 14], [3, 5, 20], [1, 6, 18], [5, 8, 24], [3, 4, 12], [2, 9, 27], [7, 10, 100],
    [1, 4, 100], [5, 6, 30], [4, 5, 35], [3, 11, 33],
  ];
  eg.forEach(([n, d, D]) => add("Fractions égales", `${n}/${d} = ?/${D}`, A(n * D / d), `× ${D / d}`));
  [[6, 9, 3], [10, 15, 3], [12, 16, 4], [14, 21, 3], [25, 100, 4], [18, 24, 4], [8, 20, 5], [27, 36, 4]].forEach(([n, d, D]) =>
    add("Fractions égales", `${n}/${d} = ?/${D}`, A(n * D / d), `÷ ${d / D}`));
  [["12/18", "2/3"], ["15/20", "3/4"], ["8/12", "2/3"], ["35/42", "5/6"], ["9/27", "1/3"], ["20/30", "2/3"]].forEach(([f, s]) =>
    add("Fractions égales", `Simplifier ${f}`, s, "Divise numérateur et dénominateur par un même nombre."));

  const cmpF: [string, string][] = [
    ["2/7", "5/7"], ["8/12", "8/21"], ["3/4", "7/18"], ["8/3", "6/7"], ["1/2", "3/5"], ["5/4", "9/10"],
    ["2/3", "5/6"], ["3/8", "1/4"], ["7/5", "4/3"], ["11/12", "5/6"], ["1/3", "2/9"], ["9/7", "7/9"],
  ];
  const val = (s: string) => { const [a, b] = s.split("/").map(Number); return a / b; };
  cmpF.forEach(([a, b]) => add("Comparer des fractions", `La plus grande : ${a} ou ${b} ?`, val(a) > val(b) ? a : b, "Même dénominateur ? Même numérateur ? Compare à 1 ?", [a, b]));

  [[17, 5], [23, 4], [11, 3], [29, 7], [13, 2], [19, 6], [31, 8], [25, 9], [41, 10], [22, 5]].forEach(([n, d]) => {
    const e = Math.floor(n / d);
    add("Écriture mixte", `${n}/${d} = ${e} + ?/${d}. Numérateur ?`, A(n % d), `${n} = ${d} × ${e} + ${n % d}`);
  });
  [[17, 5], [23, 4], [29, 7], [31, 8]].forEach(([n, d]) =>
    add("Écriture mixte", `Partie entière de ${n}/${d}`, A(Math.floor(n / d))));

  [["1/2", 0.5], ["1/4", 0.25], ["3/4", 0.75], ["3/2", 1.5], ["4/2", 2], ["5/2", 2.5], ["1/10", 0.1], ["100/100", 1],
   ["7/1", 7], ["1/5", 0.2], ["2/5", 0.4], ["7/10", 0.7], ["9/4", 2.25], ["3/100", 0.03]].forEach(([f, v]) =>
    add("Fractions : écriture décimale", `${f} en écriture décimale`, A(v as number)));

  const fs: [string, string, string][] = [
    ["3/5 + 4/5", "7/5", "On additionne les numérateurs."], ["3/5 + 2/5", "1", "= 5/5 = 1"],
    ["1 − 2/3", "1/3", "1 = 3/3"], ["4/7 − 2/21", "10/21", "4/7 = 12/21"], ["3 + 2/5", "17/5", "3 = 15/5"],
    ["2/5 + 1/4", "13/20", "Dénominateur commun 20."], ["1/2 + 1/4", "3/4", "1/2 = 2/4"],
    ["5/6 − 1/6", "2/3", "= 4/6 = 2/3"], ["1/3 + 1/6", "1/2", "= 2/6 + 1/6"], ["2 + 1/4", "9/4", "2 = 8/4"],
    ["1/2 + 1/3", "5/6", "= 3/6 + 2/6"], ["3/4 − 1/2", "1/4", "1/2 = 2/4"], ["2/3 + 1/9", "7/9", "2/3 = 6/9"],
    ["7/10 − 1/5", "1/2", "1/5 = 2/10"], ["1 + 3/8", "11/8", "1 = 8/8"], ["5/12 + 1/4", "2/3", "1/4 = 3/12"],
    ["2 − 1/2", "3/2", "2 = 4/2"], ["3/4 + 3/4", "3/2", "= 6/4"], ["1/5 + 1/10", "3/10", "1/5 = 2/10"],
    ["5/3 − 1", "2/3", "1 = 3/3"],
  ];
  fs.forEach(([t, r, h]) => add("Add/sub fractions", `${t} (fraction)`, r, h));

  const fdn: [number, number, number][] = [
    [1, 3, 18], [1, 4, 12], [1, 2, 46], [2, 3, 21], [3, 4, 32], [1, 5, 45], [2, 5, 30], [3, 10, 50],
    [1, 6, 42], [5, 6, 24], [3, 8, 40], [1, 7, 63], [4, 9, 27], [7, 10, 200], [1, 3, 150], [3, 5, 25],
    [1, 4, 2], [3, 4, 10],
  ];
  fdn.forEach(([n, d, x]) => add("Fraction d'un nombre", `${n}/${d} de ${x}`, A(n * x / d), `${x} ÷ ${d} × ${n}`));

  const pcts: [number, number][] = [
    [1, 400], [10, 250], [50, 84], [10, 36], [1, 75], [50, 130], [10, 7], [1, 1200], [50, 9], [10, 1000],
    [1, 50], [50, 3000], [10, 85], [1, 3], [50, 1], [10, 4.5], [25, 80], [25, 12], [20, 50], [5, 200],
  ];
  pcts.forEach(([p, n]) => add("Pourcentages simples", `${p} % de ${F(n)}`, A(p * n / 100),
    p === 1 ? "1 % = on divise par 100" : p === 10 ? "10 % = on divise par 10" : p === 50 ? "50 % = la moitié" : p === 25 ? "25 % = le quart" : `${p} % = ${p}/100`));

  const ecr: [string, string[], string][] = [
    ["1,2 est égal à…", ["6/5", "5/6", "1/2"], "6/5"], ["0,25 est égal à…", ["1/4", "1/2", "2/5"], "1/4"],
    ["120 % est égal à…", ["1,2", "12", "0,12"], "1,2"], ["3/2 est égal à…", ["1,5", "0,66", "2,3"], "1,5"],
    ["0,5 est égal à…", ["50 %", "5 %", "0,5 %"], "50 %"], ["1 + 1/5 est égal à…", ["1,2", "1,5", "6"], "1,2"],
    ["7/4 est égal à…", ["1,75", "7,4", "0,74"], "1,75"], ["0,03 est égal à…", ["3/100", "3/10", "30/10"], "3/100"],
    ["75 % est égal à…", ["3/4", "7/5", "1/75"], "3/4"], ["12/10 est égal à…", ["1,2", "0,12", "12"], "1,2"],
  ];
  ecr.forEach(([t, o, r]) => add("Écritures d'un nombre", t, r, undefined, o));

  [[3, 7], [5, 3], [4, 9], [7, 2], [6, 5], [9, 4]].forEach(([a, b]) =>
    add("Quotients à trou", `${a} × … = ${b}`, frac(b, a), `Le nombre cherché est le quotient ${b}/${a}.`));
  [[3, 21], [5, 45], [8, 56], [7, 63], [6, 4.2], [4, 3.6]].forEach(([a, b]) =>
    add("Quotients à trou", `${a} × … = ${F(b)}`, A(b / a), `On calcule ${F(b)} ÷ ${a}.`));

  // ═══ 4. PUISSANCES ═══════════════════════════════════════
  for (let i = 0; i <= 12; i++) add("Carrés de 0 à 12", `${i}²`, A(i * i));
  for (let i = 2; i <= 12; i++) add("Carrés de 0 à 12", `Quel entier positif a pour carré ${i * i} ?`, A(i));
  [1, 2, 3, 4, 5, 10].forEach(i => add("Cubes", `${i}³`, A(i ** 3)));
  [[8, 2], [27, 3], [1000, 10], [125, 5]].forEach(([n, i]) => add("Cubes", `… ³ = ${n}`, A(i)));
  [["49", "7²"], ["1 000", "10³"], ["64", "8² ou 4³"], ["8", "2³"], ["121", "11²"], ["27", "3³"]].forEach(([n, r]) => {
    const opts = r === "8² ou 4³" ? ["8² ou 4³", "6²", "2⁶ seulement"] : [r, n === "8" ? "4²" : n === "27" ? "9²" : n === "49" ? "7³" : n === "121" ? "12²" : "100²", n === "1 000" ? "3¹⁰" : "2²"];
    add("Écrire en puissance", `${n} s'écrit…`, r, undefined, opts);
  });
  const pm: [string, number, string][] = [
    ["3² + 4²", 25, "9 + 16"], ["2³ − 5", 3, "8 − 5"], ["2 × 3²", 18, "2 × 9 (le carré d'abord)"],
    ["5² − 3²", 16, "25 − 9"], ["10² + 10³", 1100, "100 + 1000"], ["(2 + 3)²", 25, "5²"], ["2² + 3²", 13, "4 + 9"],
    ["4 × 5²", 100, "4 × 25"], ["6² ÷ 4", 9, "36 ÷ 4"], ["1 + 2³", 9, "1 + 8"], ["10² − 1", 99, "100 − 1"],
    ["3 × 2³", 24, "3 × 8"], ["7² − 7", 42, "49 − 7"], ["(10 − 7)³", 27, "3³"], ["12² − 100", 44, "144 − 100"],
  ];
  pm.forEach(([t, r, h]) => add("Puissances simples", t, A(r), h));
  [[3, 2], [5, 3], [4, 7], [10, 6], [2, 9]].forEach(([x, k]) =>
    add("Puissances simples", `${k}x² pour x = ${x}`, A(k * x * x), `${k} × ${x}²`));

  // ═══ 5. CALCUL LITTÉRAL ══════════════════════════════════
  const mot: [number, number, number][] = [[3, 2, 5], [3, 2, 10], [4, 3, 6], [5, 5, 8], [2, 4, 7], [1, 3, 10], [6, 6, 5], [7, 2, 20], [10, 10, 9], [5, 4, 11]];
  mot.forEach(([u, r, n]) => {
    const seq = [0, 1, 2, 3].map(i => u + i * r).join(", ");
    add("Motifs évolutifs", `Motif : ${seq} … étape ${n} ?`, A(u + (n - 1) * r), `On ajoute ${r} à chaque étape.`);
  });
  [["1, 4, 9, 16", 5, 25], ["1, 4, 9, 16", 7, 49], ["1, 2, 4, 8", 5, 16], ["1, 3, 6, 10", 5, 15], ["2, 4, 8, 16", 6, 64]].forEach(([s, n, r]) =>
    add("Motifs évolutifs", `Motif : ${s} … étape ${n} ?`, A(r as number), "Repère la régularité."));

  const form: [string, string[], string][] = [
    ["Le double de n s'écrit…", ["2n", "n + 2", "n²"], "2n"], ["Le successeur de n s'écrit…", ["n + 1", "n − 1", "2n"], "n + 1"],
    ["Le prédécesseur de n s'écrit…", ["n − 1", "n + 1", "1 − n"], "n − 1"], ["Le carré de n s'écrit…", ["n²", "2n", "n + n"], "n²"],
    ["Le triple de n s'écrit…", ["3n", "n³", "n + 3"], "3n"], ["Le périmètre d'un carré de côté c s'écrit…", ["4c", "c²", "2c"], "4c"],
    ["L'aire d'un carré de côté c s'écrit…", ["c²", "4c", "2c"], "c²"], ["Le triple de n augmenté de 5 s'écrit…", ["3n + 5", "3(n + 5)", "n + 15"], "3n + 5"],
    ["La moitié de n s'écrit…", ["n/2", "2n", "n − 2"], "n/2"], ["Le périmètre d'un rectangle L × l s'écrit…", ["2(L + l)", "L × l", "L + l"], "2(L + l)"],
    ["L'aire d'un rectangle L × l s'écrit…", ["L × l", "2(L + l)", "L + l"], "L × l"], ["Le double de (n + 1) s'écrit…", ["2(n + 1)", "2n + 1", "n + 2"], "2(n + 1)"],
  ];
  form.forEach(([t, o, r]) => add("Formules littérales", t, r, undefined, o));

  const sub: [string, (x: number) => number, number[]][] = [
    ["3x", x => 3 * x, [4, 7, 2.5]], ["2x + 1", x => 2 * x + 1, [5, 0, 1.5]], ["x²", x => x * x, [6, 9, 0.5]],
    ["5x − 3", x => 5 * x - 3, [2, 1, 0]], ["x² + 1", x => x * x + 1, [3, 10]], ["4(x + 2)", x => 4 * (x + 2), [3, 0]],
    ["10 − 2x", x => 10 - 2 * x, [3, 6]], ["x + x + x", x => 3 * x, [8]],
  ];
  sub.forEach(([e, f, xs]) => xs.forEach(x => add("Substitution", `${e} pour x = ${F(x)}`, A(f(x)), `Remplace x par ${F(x)}.`)));

  [["3x + 2", "Somme"], ["3(x + 2)", "Produit"], ["5x", "Produit"], ["x² + 1", "Somme"], ["2(a − b)", "Produit"],
   ["4a − 3", "Différence"], ["(x + 1)(x + 2)", "Produit"], ["7 + 2y", "Somme"]].forEach(([t, r]) =>
    add("Somme ou produit", `${t} est…`, r, "Quelle est la dernière opération ?", ["Somme", "Différence", "Produit"]));

  const dev: [string, string, string[]][] = [
    ["3(x + 2)", "3x + 6", ["3x + 2", "3x + 5", "x + 6"]], ["5(a − 4)", "5a − 20", ["5a − 4", "a − 20", "5a + 20"]],
    ["2(3x + 1)", "6x + 2", ["6x + 1", "5x + 2", "3x + 2"]], ["7(2 − y)", "14 − 7y", ["14 − y", "9 − 7y", "14 + 7y"]],
    ["4(x + 0,5)", "4x + 2", ["4x + 0,5", "4,5x", "x + 2"]], ["10(a + b)", "10a + 10b", ["10a + b", "10ab", "a + 10b"]],
  ];
  dev.forEach(([t, r, w]) => add("Développer k(a+b)", `Développer ${t}`, r, "k(a + b) = ka + kb", [r, ...w]));
  const fac: [string, string, string[]][] = [
    ["3x + 6", "3(x + 2)", ["3(x + 6)", "x(3 + 6)", "6(x + 3)"]], ["5a − 10", "5(a − 2)", ["5(a − 10)", "a(5 − 10)", "10(a − 5)"]],
    ["7y + 7", "7(y + 1)", ["7y", "7(y + 7)", "y(7 + 7)"]], ["4x + 4y", "4(x + y)", ["4xy", "8(x + y)", "x(4 + y)"]],
  ];
  fac.forEach(([t, r, w]) => add("Développer k(a+b)", `Factoriser ${t}`, r, "ka + kb = k(a + b)", [r, ...w]));

  const red: [string, string, string[]][] = [
    ["2x + 3x", "5x", ["6x", "5x²", "5"]], ["7a − 2a", "5a", ["9a", "5", "5a²"]], ["x + x + 4", "2x + 4", ["x² + 4", "6x", "2x + 8"]],
    ["3x + 2 + 4x", "7x + 2", ["9x", "7x + 6", "3x + 6"]], ["5y − y + 1", "4y + 1", ["5y", "4y² + 1", "6y + 1"]],
    ["1,5x + 2,5x", "4x", ["4", "3,75x", "4x²"]], ["8x − 3 − 2x", "6x − 3", ["3x", "6x + 3", "10x − 3"]],
  ];
  red.forEach(([t, r, w]) => add("Réduire ax+b", `Réduire ${t}`, r, "On regroupe les termes en x.", [r, ...w]));

  const egv: [string, string][] = [
    ["2x + 3 = 11 pour x = 4", "Vraie"], ["3x = 10 pour x = 3", "Fausse"], ["x² = 2x pour x = 2", "Vraie"],
    ["x + 5 = 5x pour x = 1", "Fausse"], ["4x − 1 = 3x + 2 pour x = 3", "Vraie"], ["x² = 9 pour x = −3", "Vraie"],
    ["2(x + 1) = 2x + 1 pour x = 0", "Fausse"], ["10 − x = x pour x = 5", "Vraie"],
  ];
  egv.forEach(([t, r]) => add("Égalité vraie ou fausse", `${t} : égalité…`, r, "Calcule chaque membre séparément.", ["Vraie", "Fausse"]));

  [[5, 12], [8, 3], [12, 30], [2.5, 10], [7, 7], [15, 4], [1.5, 6.5], [20, 100]].forEach(([b, c]) =>
    add("Équation x+b=c", `x + ${F(b)} = ${F(c)}. x = ?`, A(c - b), `x = ${F(c)} − ${F(b)}`));
  [[3, 21], [5, 45], [4, 2], [7, 63], [2, 9], [10, 35], [6, 3], [8, 100]].forEach(([a, c]) =>
    add("Équation ax=c", `${a}x = ${F(c)}. x = ?`, A(c / a), `x = ${F(c)} ÷ ${a}`));

  // ═══ 6. GRANDEURS & MESURES ══════════════════════════════
  [2, 3, 4, 5, 10].forEach(c => add("Volumes", `Volume d'un cube d'arête ${c} cm (cm³)`, A(c ** 3), `V = ${c}³`));
  [[2, 3, 4], [5, 2, 10], [3, 3, 6], [10, 4, 5], [1.5, 2, 4], [6, 5, 2], [8, 2.5, 3]].forEach(([a, b, c]) =>
    add("Volumes", `Pavé ${F(a)} × ${F(b)} × ${F(c)} cm : volume (cm³) ?`, A(a * b * c), "V = L × l × h"));
  [[12, 5], [20, 3], [6, 10], [15, 4]].forEach(([B, h]) =>
    add("Volumes", `Prisme droit : base ${B} cm², hauteur ${h} cm. Volume (cm³) ?`, A(B * h), "V = aire de la base × hauteur"));
  [[3, 2], [2, 5], [1, 10]].forEach(([r, h]) =>
    add("Volumes", `Cylindre r = ${r} cm, h = ${h} cm (π ≈ 3). Volume (cm³) ?`, A(3 * r * r * h), "V = π × r² × h"));

  const conv: [string, number][] = [
    ["1 L = … cm³", 1000], ["1 dm³ = … L", 1], ["1 m³ = … L", 1000], ["2 L = … mL", 2000], ["1 cm³ = … mL", 1],
    ["500 mL = … L", 0.5], ["3 dm³ = … cm³", 3000], ["1 L = … cL", 100], ["250 cm³ = … L", 0.25], ["1,5 m³ = … L", 1500],
    ["1 m² = … dm²", 100], ["1 dm² = … cm²", 100], ["3 m² = … cm²", 30000], ["1 m³ = … dm³", 1000],
  ];
  conv.forEach(([t, r]) => add("Unités de volume", t, A(r), "Volumes : ×1000 par unité ; aires : ×100 par unité."));

  [1, 2, 3, 4, 5, 10].forEach(r => add("Aire du disque", `Disque de rayon ${r} cm (π ≈ 3). Aire (cm²) ?`, A(3 * r * r), "A = π × r²"));
  [2, 4, 6, 10].forEach(d => add("Aire du disque", `Disque de diamètre ${d} cm (π ≈ 3). Aire (cm²) ?`, A(3 * (d / 2) ** 2), "Rayon = diamètre ÷ 2"));

  [[6, 4], [10, 3], [8, 5], [12, 7], [5, 5], [9, 4], [7, 6], [20, 3]].forEach(([b, h]) =>
    add("Aire du triangle", `Triangle base ${b} cm, hauteur ${h} cm. Aire (cm²) ?`, A(b * h / 2), "A = base × hauteur ÷ 2"));

  [30, 45, 60, 90, 120, 135, 150, 75].forEach(a => add("Angles : supplémentaires", `Supplémentaire de ${a}°`, A(180 - a), "Deux angles supplémentaires : somme 180°."));
  [[50, 60], [90, 30], [45, 45], [100, 40], [70, 70], [30, 30], [25, 115], [60, 60]].forEach(([a, b]) =>
    add("Angles : triangle", `Triangle : ${a}° et ${b}°. Troisième angle ?`, A(180 - a - b), "Somme des angles d'un triangle : 180°."));
  [["Un angle de 120° est…", "Obtus"], ["Un angle de 35° est…", "Aigu"], ["Un angle de 90° est…", "Droit"], ["Un angle de 180° est…", "Plat"]].forEach(([t, r]) =>
    add("Angles : nature", t, r, undefined, ["Aigu", "Droit", "Obtus", "Plat"]));
  [40, 72, 115].forEach(a => add("Angles : opposés par le sommet", `Opposé par le sommet à un angle de ${a}° : mesure ?`, A(a), "Deux angles opposés par le sommet ont la même mesure."));

  // ═══ 7. STATISTIQUES & PROBABILITÉS ══════════════════════
  const series: number[][] = [
    [4, 8, 6], [10, 12, 14, 20], [5, 7], [2, 3, 4, 7], [12, 15, 9], [10, 10, 16], [8, 9, 10, 13], [1, 2, 3, 4, 5],
    [14, 16], [7, 11, 12], [20, 0, 10], [3, 5, 7, 9, 11], [15, 15, 15], [6, 12, 18, 24], [2.5, 3.5],
  ];
  series.forEach(s => {
    const sum = s.reduce((a, b) => a + b, 0);
    add("Moyenne simple", `Moyenne de ${s.map(F).join(" ; ")}`, A(sum / s.length), `${F(sum)} ÷ ${s.length}`);
  });
  [[12, 3], [15, 4], [11, 2]].forEach(([m, n]) =>
    add("Moyenne simple", `Moyenne ${m} sur ${n} notes : somme des notes ?`, A(m * n), `${m} × ${n}`));

  [[24, [6, 12, 3]], [30, [10, 8]], [50, [20, 15, 5]], [28, [7, 7, 7]], [100, [45, 30]], [32, [12, 9, 6]]].forEach(([tot, parts]) => {
    const p = parts as number[];
    const s = p.reduce((a, b) => a + b, 0);
    add("Effectif manquant", `Total ${tot} : ${p.join(" + ")} + ?`, A((tot as number) - s), `${tot} − ${s}`);
  });
  [[6, 24], [12, 24], [3, 12], [5, 20], [10, 40], [9, 30], [7, 28], [15, 60]].forEach(([e, t]) => {
    add("Fréquence simple", `Fréquence de ${e} sur ${t} (décimal)`, A(e / t), `${e} ÷ ${t}`);
    add("Fréquence simple", `Fréquence de ${e} sur ${t} en %`, A(100 * e / t), `${e} ÷ ${t} × 100`);
  });
  [[6, 24], [5, 20], [9, 30], [10, 25]].forEach(([e, t]) =>
    add("Fréquence simple", `Fréquence de ${e} sur ${t} (fraction irréductible)`, frac(e, t), `${e}/${t} simplifiée`));

  const proba: [string, string, string][] = [
    ["Proba de pile avec une pièce", "1/2", "1 cas favorable sur 2"],
    ["Proba d'obtenir 4 avec un dé", "1/6", "1 cas sur 6"],
    ["Proba d'un nombre pair avec un dé", "1/2", "3 cas sur 6"],
    ["Proba d'un multiple de 3 avec un dé", "1/3", "3 et 6 : 2 cas sur 6"],
    ["Proba d'obtenir plus de 4 avec un dé", "1/3", "5 et 6 : 2 cas sur 6"],
    ["« Une chance sur quatre » vaut", "1/4", "1 ÷ 4"],
    ["Urne : 2 rouges, 3 bleues. Proba rouge", "2/5", "2 cas sur 5"],
    ["Urne : 4 rouges, 6 vertes. Proba verte", "3/5", "6 cas sur 10"],
    ["Urne : 1 noire, 9 blanches. Proba noire", "1/10", "1 cas sur 10"],
    ["Jeu de 32 cartes : proba d'un as", "1/8", "4 as sur 32"],
    ["Roue à 8 secteurs égaux, 2 gagnants : proba de gagner", "1/4", "2 sur 8"],
    ["Lettre au hasard dans MATHS : proba d'une voyelle", "1/5", "A : 1 sur 5"],
  ];
  proba.forEach(([t, r, h]) => add("Probabilité simple", `${t} (fraction)`, r, h));
  [["Proba d'un événement certain", "1"], ["Proba d'un événement impossible", "0"], ["Proba d'obtenir 7 avec un dé à 6 faces", "0"]].forEach(([t, r]) =>
    add("Probabilité simple", t, r));

  const ech: [string, string[], string][] = [
    ["Obtenir 10 fois de suite 1 avec un dé : événement…", ["Très peu probable", "Très probable", "Certain"], "Très peu probable"],
    ["Ne pas gagner le loto : événement…", ["Très probable", "Impossible", "Peu probable"], "Très probable"],
    ["Obtenir un nombre entre 1 et 6 avec un dé : événement…", ["Certain", "Impossible", "Peu probable"], "Certain"],
    ["Obtenir pile avec une pièce : événement…", ["Une chance sur deux", "Certain", "Impossible"], "Une chance sur deux"],
    ["Obtenir 0 avec un dé classique : événement…", ["Impossible", "Peu probable", "Certain"], "Impossible"],
  ];
  ech.forEach(([t, o, r]) => add("Échelle de proba", t, r, undefined, o));

  // ═══ 8. PROPORTIONNALITÉ & FONCTIONS ═════════════════════
  const prop: [string, number, string][] = [
    ["Recette pour 4 pers. : 200 g. Pour 6 pers. ?", 300, "1 pers. = 50 g"],
    ["1 kg de tomates = 3 €. 4 kg ?", 12, "× 4"],
    ["3 stylos = 6 €. 7 stylos ?", 14, "1 stylo = 2 €"],
    ["5 cahiers = 10 €. 8 cahiers ?", 16, "1 cahier = 2 €"],
    ["2 h de vélo = 30 km. 3 h ?", 45, "1 h = 15 km"],
    ["4 baguettes = 4,40 €. 1 baguette ?", 1.1, "÷ 4"],
    ["10 L d'essence = 18 €. 5 L ?", 9, "La moitié"],
    ["6 œufs pour 3 gâteaux. Pour 5 gâteaux ?", 10, "2 œufs par gâteau"],
    ["Échelle 1/100 : 3 cm sur le plan = ? cm en vrai", 300, "× 100"],
    ["Échelle 1/1000 : 5 cm = ? m en vrai", 50, "5000 cm = 50 m"],
    ["8 places = 96 €. 1 place ?", 12, "96 ÷ 8"],
    ["150 g pour 3 personnes. Pour 1 personne ?", 50, "÷ 3"],
  ];
  prop.forEach(([t, r, h]) => add("Proportionnalité", t, A(r), h));
  [[6, 24], [12, 24], [5, 20], [9, 30], [15, 25], [40, 200], [7, 28], [3, 12]].forEach(([v, t]) =>
    add("Pourcentage de voix", `${v} voix sur ${t} votants : pourcentage ?`, A(100 * v / t), `${v} ÷ ${t} × 100`));
  const fn: [string, (n: number) => number, number[]][] = [
    ["Prix = 2 × n", n => 2 * n, [7, 15]], ["Périmètre = 4 × c", c => 4 * c, [9, 2.5]], ["Aire = c × c", c => c * c, [7, 11]],
    ["Coût = 5 + 3 × n", n => 5 + 3 * n, [4, 10]], ["Distance = 60 × t (km)", t => 60 * t, [2, 0.5]],
  ];
  fn.forEach(([e, f, xs]) => xs.forEach(x => add("En fonction de", `${e}. Pour ${F(x)}, résultat ?`, A(f(x)), "Remplace la lettre par la valeur.")));
  [["Abonnement 10 € + 2 € par film. Coût en fonction de n :", "10 + 2n", ["12n", "2 + 10n", "10n + 2"]],
   ["Taxi : 3 € + 1,5 € par km. Prix en fonction de d :", "3 + 1,5d", ["4,5d", "1,5 + 3d", "3d"]],
   ["Un carré de côté x : périmètre en fonction de x :", "4x", ["x²", "2x", "x + 4"]]].forEach(([t, r, w]) =>
    add("En fonction de", t as string, r as string, undefined, [r as string, ...(w as string[])]));

  return qs;
}
