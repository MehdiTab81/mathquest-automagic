import type { Question, ThemeConfig } from "./types";
import { A, F, P, frac, lin, sup, makeBank } from "./helpers";

/** Programme de 4ème découpé par chapitre (les notions de 5ème servent d'entretien). */
export const CHAPTERS_4EME: ThemeConfig[] = [
  {
    id: "4e-relatifs", name: "Relatifs : × et ÷", emoji: "🌡️",
    colorClass: "text-game-teal", borderClass: "border-game-teal", bgClass: "bg-game-teal",
    prefixes: ["Relatifs"],
  },
  {
    id: "4e-fractions", name: "Fractions & quotients", emoji: "🍕",
    colorClass: "text-game-coral", borderClass: "border-game-coral", bgClass: "bg-game-coral",
    prefixes: ["Fractions"],
  },
  {
    id: "4e-puissances", name: "Puissances", emoji: "⚡",
    colorClass: "text-game-purple", borderClass: "border-game-purple", bgClass: "bg-game-purple",
    prefixes: ["Puissances", "Notation scientifique", "Préfixes"],
  },
  {
    id: "4e-litteral", name: "Calcul littéral", emoji: "✏️",
    colorClass: "text-game-pink", borderClass: "border-game-pink", bgClass: "bg-game-pink",
    prefixes: ["Développer", "Double distributivité", "Réduire", "Factoriser", "Substitution"],
  },
  {
    id: "4e-equations", name: "Équations", emoji: "🎯",
    colorClass: "text-game-gold", borderClass: "border-game-gold", bgClass: "bg-game-gold",
    prefixes: ["Équation", "Tester une égalité", "Mise en équation"],
  },
  {
    id: "4e-proportionnalite", name: "Proportionnalité & vitesses", emoji: "⚖️",
    colorClass: "text-game-mint", borderClass: "border-game-mint", bgClass: "bg-game-mint",
    prefixes: ["Quatrième proportionnelle", "Proportionnalité", "Pourcentages", "Vitesse"],
  },
  {
    id: "4e-geometrie", name: "Pythagore & géométrie", emoji: "📐",
    colorClass: "text-game-teal", borderClass: "border-game-teal", bgClass: "bg-game-teal",
    prefixes: ["Pythagore", "Racines", "Volumes", "Angles", "Translation"],
  },
  {
    id: "4e-donnees", name: "Statistiques & probabilités", emoji: "🎲",
    colorClass: "text-game-gold", borderClass: "border-game-gold", bgClass: "bg-game-gold",
    prefixes: ["Moyenne", "Médiane", "Étendue", "Fréquence", "Probabilité"],
  },
  {
    id: "4e-fonctions", name: "Fonctions & formules", emoji: "📈",
    colorClass: "text-game-purple", borderClass: "border-game-purple", bgClass: "bg-game-purple",
    prefixes: ["Programme de calcul", "Formule", "Tableau de valeurs", "Proportionnel ?"],
  },
];

export function get4emeProgramQuestions(): Question[] {
  const { qs, add, qcm } = makeBank();

  // ═══ RELATIFS : MULTIPLICATION & DIVISION ═════════════════
  const mul: [number, number][] = [
    [-3, 4], [-5, -2], [7, -3], [-6, -6], [-1, 15], [-4, -5], [8, -0.5], [-2.5, 4], [-0.1, -30], [-9, 3],
    [12, -4], [-11, -11], [-0.5, -0.5], [6, -1.5],
  ];
  mul.forEach(([a, b]) => add("Relatifs : multiplication", `${P(a)} × ${P(b)}`, A(a * b), "Même signe : +. Signes contraires : −."));
  const div: [number, number][] = [[-12, 3], [-20, -5], [18, -3], [-24, -8], [-35, 7], [42, -6], [-1.5, 3], [-100, -4], [9, -0.3], [-64, 8]];
  div.forEach(([a, b]) => add("Relatifs : division", `${P(a)} ÷ ${P(b)}`, A(a / b), "Même règle des signes que pour la multiplication."));
  const sgn: [string, string][] = [
    ["(−2) × (−3) × (−5)", "Négatif"], ["(−1) × (−1) × 7 × (−2)", "Négatif"], ["(−4) × 3 × (−2)", "Positif"],
    ["(−1)⁴", "Positif"], ["(−3)³", "Négatif"], ["(−2) × (−2) × (−2) × (−2)", "Positif"],
  ];
  sgn.forEach(([t, r]) => qcm("Relatifs : signe d'un produit", `Signe de ${t}`, r, [r === "Positif" ? "Négatif" : "Positif"],
    "Nombre pair de facteurs négatifs : positif. Nombre impair : négatif."));
  const ench: [string, number, string][] = [
    ["(−2) × (−3) × (−5)", -30, "6 × (−5)"], ["(−4) × 5 + 3", -17, "La multiplication d'abord"],
    ["10 − 3 × (−4)", 22, "10 − (−12) = 10 + 12"], ["(−6) × (−2) − 15", -3, "12 − 15"],
    ["(−18) ÷ 3 + (−4)", -10, "−6 + (−4)"], ["2 × (−3) − 4 × (−2)", 2, "−6 + 8"],
    ["(−5)² − 20", 5, "25 − 20"], ["−5² + 20", -5, "Le carré porte sur 5 seulement : −25 + 20"],
    ["(−1) × (−1) × (−1)", -1, "Trois facteurs négatifs"], ["(7 − 10) × (−4)", 12, "(−3) × (−4)"],
  ];
  ench.forEach(([t, r, h]) => add("Relatifs : enchaînements", t, A(r), h));
  [[-4, 3], [5, -6], [-2.5, -2]].forEach(([a, b]) =>
    add("Relatifs : à trou", `${P(a)} × … = ${F(a * b)}`, A(b), `On divise ${F(a * b)} par ${P(a)}.`));

  // ═══ FRACTIONS ════════════════════════════════════════════
  const fm: [string, string, string][] = [
    ["2/3 × 4/5", "8/15", "On multiplie les numérateurs et les dénominateurs."],
    ["3/4 × 2/9", "1/6", "= 6/36 = 1/6"], ["5/7 × 14/15", "2/3", "Simplifie avant de multiplier."],
    ["3 × 2/7", "6/7", "3 × 2 = 6"], ["4/9 × 3", "4/3", "= 12/9 = 4/3"], ["(−2/5) × 3/4", "-3/10", "Signe − ; 6/20 = 3/10"],
    ["1/2 × 1/2", "1/4", "1 × 1 sur 2 × 2"], ["7/8 × 8/7", "1", "Deux inverses : produit 1"],
    ["6/5 × 10/3", "4", "60/15 = 4"], ["(−3/4) × (−8/9)", "2/3", "Produit positif ; 24/36 = 2/3"],
  ];
  fm.forEach(([t, r, h]) => add("Fractions : multiplication", `${t} (fraction)`, r, h));
  const fd: [string, string, string][] = [
    ["2/3 ÷ 4/5", "5/6", "2/3 × 5/4 = 10/12"], ["1/2 ÷ 1/4", "2", "1/2 × 4"], ["3/4 ÷ 3", "1/4", "3/4 × 1/3"],
    ["5 ÷ 1/3", "15", "5 × 3"], ["7/9 ÷ 7/3", "1/3", "7/9 × 3/7"], ["(−4/5) ÷ 2/5", "-2", "−4/5 × 5/2"],
    ["9/10 ÷ 3/5", "3/2", "9/10 × 5/3 = 45/30"], ["2 ÷ 4/7", "7/2", "2 × 7/4 = 14/4"],
  ];
  fd.forEach(([t, r, h]) => add("Fractions : division", `${t} (fraction)`, r, `Diviser = multiplier par l'inverse. ${h}`));
  [["3/7", "7/3"], ["5", "1/5"], ["1/9", "9"], ["−2/3", "-3/2"], ["0,5", "2"], ["4/11", "11/4"]].forEach(([n, r]) =>
    add("Fractions : inverse", `Inverse de ${n}`, r, "L'inverse de a/b est b/a."));
  const fs: [string, string, string][] = [
    ["2/3 + 1/4", "11/12", "8/12 + 3/12"], ["5/6 − 1/4", "7/12", "10/12 − 3/12"], ["3/5 + 1/2", "11/10", "6/10 + 5/10"],
    ["1/3 − 1/2", "-1/6", "2/6 − 3/6"], ["−3/4 + 1/8", "-5/8", "−6/8 + 1/8"], ["7/10 + 2/15", "5/6", "21/30 + 4/30 = 25/30"],
    ["1 − 3/8", "5/8", "8/8 − 3/8"], ["2/9 + 5/6", "19/18", "4/18 + 15/18"], ["−1/2 − 1/3", "-5/6", "−3/6 − 2/6"],
    ["3/4 + 5/12", "7/6", "9/12 + 5/12 = 14/12"],
  ];
  fs.forEach(([t, r, h]) => add("Fractions : addition", `${t} (fraction)`, r, `Même dénominateur d'abord. ${h}`));
  [["Les 2/3 des 3/4 d'un gâteau", "1/2", "2/3 × 3/4"], ["La moitié des 2/5", "1/5", "1/2 × 2/5"],
   ["Le quart des 4/7", "1/7", "1/4 × 4/7"], ["Les 3/5 des 5/6", "1/2", "3/5 × 5/6 = 15/30"]].forEach(([t, r, h]) =>
    add("Fractions : de fraction", `${t} (fraction)`, r, `« de » = multiplier. ${h}`));
  [["18/24", "3/4"], ["35/49", "5/7"], ["42/56", "3/4"], ["16/64", "1/4"], ["45/75", "3/5"], ["−12/30", "-2/5"]].forEach(([f, r]) =>
    add("Fractions : simplifier", `Simplifier ${f}`, r, "Divise en haut et en bas par le PGCD."));

  // ═══ PUISSANCES ═══════════════════════════════════════════
  [3, 5, 1, 0, 6].forEach(n => add("Puissances de 10", `10${sup(n)} = ? (écriture décimale)`, A(10 ** n), `1 suivi de ${n} zéro${n > 1 ? "s" : ""}`));
  [1, 2, 3, 4].forEach(n => add("Puissances de 10", `10${sup(-n)} = ? (écriture décimale)`, A(10 ** -n), `10${sup(-n)} = 1/10${sup(n)}`));
  const p10: [string, number, string][] = [
    ["10² × 10³ = 10^?", 5, "On additionne les exposants."], ["10⁵ × 10⁻² = 10^?", 3, "5 + (−2)"],
    ["10⁷ ÷ 10⁴ = 10^?", 3, "On soustrait les exposants."], ["10³ ÷ 10⁻² = 10^?", 5, "3 − (−2)"],
    ["(10²)³ = 10^?", 6, "On multiplie les exposants."], ["10⁻³ × 10⁻⁴ = 10^?", -7, "−3 + (−4)"],
    ["1/10⁴ = 10^?", -4, "1/10ⁿ = 10⁻ⁿ"], ["10⁰ × 10⁸ = 10^?", 8, "10⁰ = 1"],
  ];
  p10.forEach(([t, r, h]) => add("Puissances : règles", t, A(r), h));
  const pw: [string, number, string][] = [
    ["2⁵", 32, "2 × 2 × 2 × 2 × 2"], ["3⁴", 81, "9 × 9"], ["(−2)³", -8, "Exposant impair : négatif"],
    ["(−3)²", 9, "Exposant pair : positif"], ["−3²", -9, "Le carré porte sur 3 seulement"], ["5⁰", 1, "a⁰ = 1"],
    ["(−1)¹⁰⁰", 1, "Exposant pair"], ["(−1)⁷", -1, "Exposant impair"], ["4³", 64, "16 × 4"], ["0,1²", 0.01, "0,1 × 0,1"],
    ["2⁻¹", 0.5, "2⁻¹ = 1/2"], ["(−5)²", 25, "(−5) × (−5)"],
  ];
  pw.forEach(([t, r, h]) => add("Puissances : calculs", t, A(r), h));
  const ns: [string, string, string[]][] = [
    ["45 000 en notation scientifique", "4,5 × 10⁴", ["45 × 10³", "4,5 × 10³", "0,45 × 10⁵"]],
    ["0,003 en notation scientifique", "3 × 10⁻³", ["3 × 10³", "0,3 × 10⁻²", "3 × 10⁻²"]],
    ["720 en notation scientifique", "7,2 × 10²", ["72 × 10", "7,2 × 10³", "0,72 × 10³"]],
    ["0,056 en notation scientifique", "5,6 × 10⁻²", ["56 × 10⁻³", "5,6 × 10²", "5,6 × 10⁻³"]],
    ["6 200 000 en notation scientifique", "6,2 × 10⁶", ["62 × 10⁵", "6,2 × 10⁵", "6,2 × 10⁷"]],
  ];
  ns.forEach(([t, r, w]) => qcm("Notation scientifique", t, r, w, "a × 10ⁿ avec 1 ⩽ a < 10."));
  [["3 × 10² = ?", 300], ["2,5 × 10³ = ?", 2500], ["4 × 10⁻² = ?", 0.04], ["1,7 × 10⁻¹ = ?", 0.17], ["9,1 × 10⁴ = ?", 91000]].forEach(([t, r]) =>
    add("Notation scientifique", t as string, A(r as number), "On décale la virgule de n rangs."));
  [["1 km = 10^? m", 3], ["1 mm = 10^? m", -3], ["1 Mo = 10^? octets", 6], ["1 µm = 10^? m", -6], ["1 Go = 10^? octets", 9],
   ["1 ms = 10^? s", -3]].forEach(([t, r]) =>
    add("Préfixes", t as string, A(r as number), "kilo 10³, méga 10⁶, giga 10⁹ ; milli 10⁻³, micro 10⁻⁶."));

  // ═══ CALCUL LITTÉRAL ══════════════════════════════════════
  const dev: [string, string, string[]][] = [
    ["−3(x + 4)", "−3x − 12", ["−3x + 12", "−3x + 4", "3x − 12"]], ["−2(5 − a)", "−10 + 2a", ["−10 − 2a", "10 − 2a", "−10 + a"]],
    ["4(2x − 3)", "8x − 12", ["8x − 3", "6x − 12", "8x + 12"]], ["x(x + 5)", "x² + 5x", ["2x + 5", "x² + 5", "x + 5x"]],
    ["−(x − 7)", "−x + 7", ["−x − 7", "x − 7", "x + 7"]], ["3x(2x − 1)", "6x² − 3x", ["6x − 3x", "5x² − 3x", "6x² − 1"]],
    ["0,5(4y + 6)", "2y + 3", ["4,5y + 6", "2y + 6", "2y + 0,5"]],
  ];
  dev.forEach(([t, r, w]) => qcm("Développer", `Développer ${t}`, r, w, "k(a + b) = ka + kb ; attention aux signes."));
  const dd: [string, string, string[]][] = [
    ["(x + 2)(x + 3)", "x² + 5x + 6", ["x² + 6", "x² + 6x + 5", "2x + 5"]],
    ["(x + 4)(x − 1)", "x² + 3x − 4", ["x² − 3x − 4", "x² + 3x + 4", "x² − 4"]],
    ["(2x + 1)(x + 5)", "2x² + 11x + 5", ["2x² + 10x + 5", "2x² + 6x + 5", "3x + 6"]],
    ["(x − 3)(x − 2)", "x² − 5x + 6", ["x² + 5x + 6", "x² − 5x − 6", "x² − 6"]],
    ["(a + 1)(b + 2)", "ab + 2a + b + 2", ["ab + 3", "ab + 2", "a + b + 3"]],
  ];
  dd.forEach(([t, r, w]) => qcm("Double distributivité", `Développer ${t}`, r, w, "(a + b)(c + d) = ac + ad + bc + bd"));
  const red: [string, string, string[]][] = [
    ["3x + 5 − 7x + 2", "−4x + 7", ["10x + 7", "−4x + 3", "4x + 7"]], ["x² + 3x + 2x² − x", "3x² + 2x", ["5x³", "3x² + 4x", "2x² + 2x"]],
    ["5a − (2a − 3)", "3a + 3", ["3a − 3", "7a − 3", "3a + 8"]], ["4x × 3x", "12x²", ["12x", "7x²", "7x"]],
    ["−2x + 6 + 2x", "6", ["4x + 6", "6x", "−4x + 6"]], ["2y − 5y + y", "−2y", ["2y", "−4y", "8y"]],
  ];
  red.forEach(([t, r, w]) => qcm("Réduire", `Réduire ${t}`, r, w, "On regroupe les termes semblables."));
  const fac: [string, string, string[]][] = [
    ["5x + 15", "5(x + 3)", ["5(x + 15)", "x(5 + 15)", "15(x + 5)"]], ["x² + 4x", "x(x + 4)", ["4x(x + 1)", "x(x + 4x)", "2x(x + 2)"]],
    ["12a − 8", "4(3a − 2)", ["4(3a − 8)", "2(6a − 8)", "12(a − 8)"]], ["7x − 7y", "7(x − y)", ["7xy", "x(7 − 7y)", "7(x + y)"]],
  ];
  fac.forEach(([t, r, w]) => qcm("Factoriser", `Factoriser ${t}`, r, w, "Repère le facteur commun."));
  const sub: [string, (x: number) => number, number[]][] = [
    ["3x − 7", x => 3 * x - 7, [-2, 1]], ["x² + x", x => x * x + x, [-3, 4]], ["−2x + 5", x => -2 * x + 5, [-4, 3]],
    ["2x² − 1", x => 2 * x * x - 1, [-1, 3]], ["(x − 1)(x + 2)", x => (x - 1) * (x + 2), [0, -2]], ["5 − x²", x => 5 - x * x, [-2, 1.5]],
  ];
  sub.forEach(([e, f, xs]) => xs.forEach(x => add("Substitution", `${e} pour x = ${F(x)}`, A(f(x)), `Remplace x par ${P(x)} (avec des parenthèses).`)));

  // ═══ ÉQUATIONS ════════════════════════════════════════════
  [[2, 3, 11], [5, -4, 16], [3, 7, -2], [-2, 1, 9], [4, 0.5, 6.5], [10, -3, 2], [-3, -5, 7], [6, 6, 0]].forEach(([a, b, c]) =>
    add("Équation ax + b = c", `${lin(a)} ${b < 0 ? "−" : "+"} ${F(Math.abs(b))} = ${F(c)}. x = ?`, A((c - b) / a), `${a}x = ${F(c - b)}, puis x = ${F(c - b)} ÷ ${P(a)}`));
  [[5, 2, 3, 8], [4, -1, 2, 7], [7, 3, 2, -12], [3, 10, -1, 2], [6, -5, 4, 1], [2, 9, 5, 0]].forEach(([a, b, c, d]) =>
    add("Équation ax + b = cx + d", `${lin(a)} ${b < 0 ? "−" : "+"} ${Math.abs(b)} = ${lin(c)}${d === 0 ? "" : ` ${d < 0 ? "−" : "+"} ${Math.abs(d)}`}. x = ?`, A((d - b) / (a - c)),
      `On regroupe : ${a - c}x = ${F(d - b)}`));
  [[-3, 12], [-5, -20], [0.5, 4], [-1, 7]].forEach(([a, c]) =>
    add("Équation ax = c", `${P(a)}x = ${F(c)}. x = ?`, A(c / a), `x = ${F(c)} ÷ ${P(a)}`));
  const tst: [string, string][] = [
    ["x = −2 est-il solution de 3x + 5 = −1 ?", "Oui"], ["x = 4 est-il solution de 2x − 1 = x + 2 ?", "Non"],
    ["x = 3 est-il solution de x² = 2x + 3 ?", "Oui"], ["x = −1 est-il solution de x² + 1 = 0 ?", "Non"],
    ["x = 0 est-il solution de 5x = 2x ?", "Oui"], ["x = 2 est-il solution de 4x − 3 = 3x − 1 ?", "Oui"],
  ];
  tst.forEach(([t, r]) => qcm("Tester une égalité", t, r, [r === "Oui" ? "Non" : "Oui"], "Remplace x dans chaque membre et compare."));
  const me: [string, string, string[]][] = [
    ["Le triple d'un nombre augmenté de 4 vaut 19. Équation ?", "3x + 4 = 19", ["3(x + 4) = 19", "x + 12 = 19", "4x + 3 = 19"]],
    ["Le double de (x + 5) vaut 30. Équation ?", "2(x + 5) = 30", ["2x + 5 = 30", "x + 10 = 30", "2x = 35"]],
    ["Un nombre diminué de 7 est égal à son double. Équation ?", "x − 7 = 2x", ["7 − x = 2x", "x − 7 = x²", "2x − 7 = x"]],
    ["Périmètre d'un carré de côté x égal à 26. Équation ?", "4x = 26", ["x² = 26", "2x = 26", "x + 4 = 26"]],
  ];
  me.forEach(([t, r, w]) => qcm("Mise en équation", t, r, w, "Traduis la phrase mot à mot, en choisissant x pour l'inconnue."));
  [["Le triple d'un nombre augmenté de 4 vaut 19. Ce nombre ?", 5], ["Le double de (x + 5) vaut 30. x ?", 10],
   ["J'ai 3 fois l'âge de ma sœur ; à nous deux 48 ans. Âge de ma sœur ?", 12]].forEach(([t, r]) =>
    add("Mise en équation", t as string, A(r as number), "Écris l'équation puis résous-la."));

  // ═══ PROPORTIONNALITÉ & VITESSES ══════════════════════════
  const qp: [number, number, number][] = [[3, 12, 5], [4, 10, 6], [5, 8, 15], [2, 7, 6], [6, 9, 10], [8, 20, 6], [1.5, 6, 4], [12, 30, 2]];
  qp.forEach(([a, b, c]) => add("Quatrième proportionnelle", `Tableau : ${F(a)} → ${F(b)} ; ${F(c)} → ?`, A(b * c / a), `Produit en croix : ${F(b)} × ${F(c)} ÷ ${F(a)}`));
  const pp: [string, number, string][] = [
    ["7 kg coûtent 21 €. Prix de 5 kg ?", 15, "1 kg = 3 €"], ["Une imprimante : 45 pages en 3 min. En 7 min ?", 105, "15 pages/min"],
    ["2,5 L de peinture pour 10 m². Pour 24 m² (L) ?", 6, "0,25 L/m²"], ["5 € = 5,40 $. 20 € = ? $", 21.6, "× 4"],
  ];
  pp.forEach(([t, r, h]) => add("Proportionnalité", t, A(r), h));
  [[20, 80, "+"], [10, 150, "−"], [50, 60, "+"], [25, 200, "−"], [5, 40, "+"], [30, 50, "−"]].forEach(([p, n, s]) =>
    add("Pourcentages : évolution", `${n} € ${s === "+" ? "augmenté" : "diminué"} de ${p} %`, A((n as number) * (1 + (s === "+" ? 1 : -1) * (p as number) / 100)),
      `${s === "+" ? "Augmenter" : "Diminuer"} de ${p} % : × ${F(1 + (s === "+" ? 1 : -1) * (p as number) / 100)}`));
  [[15, 60], [8, 40], [36, 120], [9, 12]].forEach(([a, b]) =>
    add("Pourcentages : proportion", `${a} sur ${b} représente quel pourcentage ?`, A(100 * a / b), `${a} ÷ ${b} × 100`));
  const vit: [string, number, string][] = [
    ["120 km en 2 h : vitesse (km/h) ?", 60, "v = d ÷ t"], ["90 km en 1 h 30 : vitesse (km/h) ?", 60, "1 h 30 = 1,5 h"],
    ["À 80 km/h pendant 3 h : distance (km) ?", 240, "d = v × t"], ["À 50 km/h, 25 km : durée (min) ?", 30, "t = d ÷ v = 0,5 h"],
    ["À 4 km/h pendant 45 min : distance (km) ?", 3, "45 min = 0,75 h"], ["300 m en 1 min : vitesse (km/h) ?", 18, "300 m × 60 = 18 km"],
    ["À 100 km/h, 250 km : durée (h) ?", 2.5, "t = d ÷ v"],
  ];
  vit.forEach(([t, r, h]) => add("Vitesse moyenne", t, A(r), h));

  // ═══ PYTHAGORE & GÉOMÉTRIE ════════════════════════════════
  const triples: [number, number, number][] = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [9, 12, 15], [12, 16, 20], [7, 24, 25], [1.5, 2, 2.5]];
  triples.forEach(([a, b, c]) => add("Pythagore : hypoténuse", `Triangle rectangle, côtés de l'angle droit ${F(a)} et ${F(b)} : hypoténuse ?`, A(c),
    `${F(a)}² + ${F(b)}² = ${F(c * c)} = ${F(c)}²`));
  triples.slice(0, 6).forEach(([a, b, c]) => add("Pythagore : côté", `Triangle rectangle, hypoténuse ${F(c)} et un côté ${F(a)} : autre côté ?`, A(b),
    `${F(c)}² − ${F(a)}² = ${F(b * b)}`));
  [["Triangle 6, 8, 10 : rectangle ?", "Oui"], ["Triangle 4, 5, 6 : rectangle ?", "Non"], ["Triangle 5, 12, 13 : rectangle ?", "Oui"],
   ["Triangle 7, 8, 11 : rectangle ?", "Non"], ["Triangle 9, 40, 41 : rectangle ?", "Oui"]].forEach(([t, r]) =>
    qcm("Pythagore : réciproque", t, r, [r === "Oui" ? "Non" : "Oui"], "Le carré du plus grand côté est-il égal à la somme des carrés des deux autres ?"));
  [["Dans un triangle rectangle, l'hypoténuse est…", "Le plus grand côté", ["Le plus petit côté", "Un côté de l'angle droit"]],
   ["Si AB² = AC² + BC², le triangle est rectangle en…", "C", ["A", "B"]],
   ["Hypoténuse² = 25 + 144. Hypoténuse ?", "13", ["169", "17", "12,5"]]].forEach(([t, r, w]) =>
    qcm("Pythagore : réciproque", t as string, r as string, w as string[]));
  [16, 49, 81, 144, 0.25, 2.25, 400, 1].forEach(n => add("Racines carrées", `√${F(n)}`, A(Math.sqrt(n)), "Le nombre positif dont le carré vaut " + F(n)));
  [[5, "entre 2 et 3"], [50, "entre 7 et 8"], [20, "entre 4 et 5"], [90, "entre 9 et 10"]].forEach(([n, r]) =>
    qcm("Racines carrées : encadrer", `√${n} est…`, r as string, ["entre 2 et 3", "entre 4 et 5", "entre 7 et 8", "entre 9 et 10"].filter(o => o !== r).slice(0, 2),
      "Encadre par deux carrés parfaits."));
  [[12, 5], [30, 4], [9, 10], [20, 6]].forEach(([B, h]) =>
    add("Volumes : pyramide et cône", `Pyramide : aire de base ${B} cm², hauteur ${h} cm. Volume (cm³) ?`, A(B * h / 3), "V = B × h ÷ 3"));
  [[3, 4], [2, 6], [1, 9]].forEach(([r, h]) =>
    add("Volumes : pyramide et cône", `Cône r = ${r} cm, h = ${h} cm (π ≈ 3). Volume (cm³) ?`, A(r * r * h), "V = π × r² × h ÷ 3"));
  [["Angles alternes-internes avec des droites parallèles :", "Égaux", ["Supplémentaires", "Complémentaires"]],
   ["Angles correspondants avec des droites parallèles :", "Égaux", ["Supplémentaires", "Opposés"]],
   ["Une translation conserve…", "Les longueurs et les angles", ["Seulement les angles", "Rien"]],
   ["Translation qui transforme A en B : l'image de B est…", "Le point C tel que B milieu de [AC]", ["Le point A", "Le point B"]]].forEach(([t, r, w]) =>
    qcm(t.startsWith("Angles") ? "Angles et parallèles" : "Translation", t as string, r as string, w as string[]));
  [[70, "alternes-internes"], [125, "correspondants"], [42, "alternes-internes"]].forEach(([a, k]) =>
    add("Angles et parallèles", `Droites parallèles, angle de ${a}°. Angle ${k} associé ?`, A(a as number), "Avec des parallèles, ces angles sont égaux."));

  // ═══ STATISTIQUES & PROBABILITÉS ══════════════════════════
  const mp: [string, number, string][] = [
    ["Notes 12 (coef 2) et 15 (coef 1) : moyenne ?", 13, "(24 + 15) ÷ 3"],
    ["Notes 10 (coef 1) et 16 (coef 3) : moyenne ?", 14.5, "(10 + 48) ÷ 4"],
    ["3 élèves ont 8, 2 élèves ont 13 : moyenne ?", 10, "(24 + 26) ÷ 5"],
    ["Notes 9, 11 et 16 (coef 2) : moyenne ?", 13, "(9 + 11 + 32) ÷ 4"],
  ];
  mp.forEach(([t, r, h]) => add("Moyenne pondérée", t, A(r), h));
  const sr: number[][] = [[3, 7, 8, 12, 15], [2, 4, 9, 10], [5, 1, 8, 3, 9], [10, 20, 30, 40, 50, 60], [7, 7, 8, 13, 15], [4, 18, 6, 12]];
  sr.forEach(s => {
    const o = [...s].sort((a, b) => a - b);
    const n = o.length;
    const med = n % 2 ? o[(n - 1) / 2] : (o[n / 2 - 1] + o[n / 2]) / 2;
    add("Médiane", `Médiane de ${s.join(" ; ")}`, A(med), `Range : ${o.join(" ; ")}`);
    add("Étendue", `Étendue de ${s.join(" ; ")}`, A(o[n - 1] - o[0]), `${o[n - 1]} − ${o[0]}`);
  });
  [[9, 36], [14, 40], [3, 25], [21, 28]].forEach(([e, t]) =>
    add("Fréquence", `Effectif ${e} sur ${t} : fréquence en % ?`, A(100 * e / t), `${e} ÷ ${t} × 100`));
  const pb: [string, string, string][] = [
    ["Dé à 6 faces : proba d'un nombre premier", "1/2", "2, 3 et 5 : 3 cas sur 6"],
    ["Sac : 3 rouges, 5 bleues, 2 vertes. Proba non bleue", "1/2", "5 cas sur 10"],
    ["Proba de A = 0,3. Proba de non A (décimal)", "0.7", "1 − 0,3"],
    ["Jeu de 52 cartes : proba d'un cœur", "1/4", "13 sur 52"],
    ["Deux pièces : proba d'obtenir 2 piles", "1/4", "PP, PF, FP, FF"],
    ["Dé : proba d'obtenir au moins 5", "1/3", "5 et 6"],
  ];
  pb.forEach(([t, r, h]) => add("Probabilités", `${t}${r.includes("/") ? " (fraction)" : ""}`, r, h));

  // ═══ FONCTIONS & FORMULES ═════════════════════════════════
  const prog: [string, (x: number) => number, number[]][] = [
    ["Choisir x, ×3, puis −5", x => 3 * x - 5, [4, -2]], ["Choisir x, +2, puis ×(−4)", x => (x + 2) * -4, [3, -5]],
    ["Choisir x, au carré, puis +1", x => x * x + 1, [-3, 0.5]], ["Choisir x, ×2, +6, ÷2", x => (2 * x + 6) / 2, [7, -1]],
  ];
  prog.forEach(([t, f, xs]) => xs.forEach(x => add("Programme de calcul", `${t}. Départ ${F(x)} : résultat ?`, A(f(x)), "Applique les étapes dans l'ordre.")));
  [["Programme : ×2, +6, ÷2. Le résultat vaut toujours…", "x + 3", ["2x + 6", "x + 6", "x"]],
   ["Programme : +3, ×5. En fonction de x :", "5(x + 3)", ["5x + 3", "x + 15", "3x + 5"]]].forEach(([t, r, w]) =>
    qcm("Programme de calcul", t as string, r as string, w as string[], "Écris chaque étape avec x."));
  const form: [string, number, string][] = [
    ["P = 2(L + l) avec L = 7 et l = 3,5", 21, "2 × 10,5"], ["A = πr² avec r = 3 (π ≈ 3,14)", 28.26, "3,14 × 9"],
    ["V = a³ avec a = 4", 64, "4 × 4 × 4"], ["d = v × t avec v = 15 et t = 4", 60, "15 × 4"],
    ["E = mc² avec m = 2 et c = 3", 18, "2 × 9"], ["IMC = m ÷ t² avec m = 64 et t = 2", 16, "64 ÷ 4"],
  ];
  form.forEach(([t, r, h]) => add("Formule", `${t}. Résultat ?`, A(r), h));
  [[-1, 0, 1, 2]].forEach(xs => xs.forEach(x =>
    add("Tableau de valeurs", `Pour y = 2x² − 3, ligne x = ${F(x)} : y = ?`, A(2 * x * x - 3), "Remplace x dans la formule.")));
  [["x : 1, 2, 3 → y : 4, 8, 12", "Oui"], ["x : 1, 2, 3 → y : 3, 5, 7", "Non"], ["x : 2, 5, 10 → y : 1, 2,5, 5", "Oui"],
   ["x : 1, 2, 4 → y : 1, 4, 16", "Non"]].forEach(([t, r]) =>
    qcm("Proportionnel ? (tableau)", `${t} : proportionnel ?`, r, [r === "Oui" ? "Non" : "Oui"], "Le quotient y ÷ x est-il toujours le même ?"));
  add("Fractions : simplifier", "Simplifier 14/21", frac(14, 21), "Divise par 7.");

  // ═══ BANQUES GÉNÉRÉES (pour équilibrer avec les autres niveaux) ═══
  // Relatifs : tables de multiplication signées
  [[-7, 8], [-9, -6], [12, -5], [-8, -8], [-4, 25], [15, -3], [-6, 7], [-11, 9], [9, -9], [-12, -3]].forEach(([a, b]) =>
    add("Relatifs : multiplication", `${P(a)} × ${P(b)}`, A(a * b), "Règle des signes."));
  [[-56, 7], [72, -9], [-81, -9], [-45, 5], [63, -7], [-144, -12], [-0.6, 3], [4.8, -6]].forEach(([a, b]) =>
    add("Relatifs : division", `${P(a)} ÷ ${P(b)}`, A(a / b), "Règle des signes."));
  [[-2, 3, -4], [5, -2, -3], [-1, -1, -10], [-3, -3, 2], [4, -0.5, 6]].forEach(([a, b, c]) =>
    add("Relatifs : enchaînements", `${P(a)} × ${P(b)} × ${P(c)}`, A(a * b * c), "Compte les facteurs négatifs pour le signe."));

  // Fractions : produits et quotients générés (résultat simplifié)
  const fr: [number, number, number, number][] = [[1, 3, 3, 5], [2, 7, 7, 4], [3, 10, 5, 9], [4, 5, 5, 8], [5, 12, 4, 15], [7, 6, 3, 14], [9, 4, 2, 3], [-2, 9, 3, 4]];
  fr.forEach(([a, b, c, d]) => {
    add("Fractions : multiplication", `${a}/${b} × ${c}/${d} (fraction)`, frac(a * c, b * d), `${a} × ${c} sur ${b} × ${d}, puis simplifie.`);
    add("Fractions : division", `${a}/${b} ÷ ${c}/${d} (fraction)`, frac(a * d, b * c), `${a}/${b} × ${d}/${c}`);
  });
  [[1, 2, 1, 5], [3, 4, 1, 6], [2, 5, 3, 10], [5, 6, 2, 9], [1, 4, -2, 3], [-3, 8, 1, 12]].forEach(([a, b, c, d]) =>
    add("Fractions : addition", `${a}/${b} + ${c < 0 ? `(${c}/${d})` : `${c}/${d}`} (fraction)`, frac(a * d + c * b, b * d), "Réduis au même dénominateur."));

  // Puissances : produits de puissances de 10 et notation scientifique
  [[2, 4], [-3, 5], [6, -2], [-1, -4], [3, 3], [-5, 2]].forEach(([m, n]) =>
    add("Puissances : règles", `10${sup(m)} × 10${sup(n)} = 10^?`, A(m + n), "On additionne les exposants."));
  [[5, 2], [3, -1], [-2, 3], [0, 4]].forEach(([m, n]) =>
    add("Puissances : règles", `10${sup(m)} ÷ 10${sup(n)} = 10^?`, A(m - n), "On soustrait les exposants."));
  [[3, 4, 2, 3], [2, -3, 4, 5], [1.5, 6, 3, -2], [2.5, 2, 2, -5]].forEach(([a, m, b, n]) =>
    add("Notation scientifique", `(${F(a)} × 10${sup(m)}) × (${F(b)} × 10${sup(n)}) = ${F(a * b)} × 10^?`, A(m + n),
      "On multiplie les nombres entre eux et les puissances de 10 entre elles."));

  // Calcul littéral : substitutions et développements simples générés
  [[2, -3, 4], [-1, 5, -2], [3, 2, -1], [-4, -1, 3], [5, 0, -2]].forEach(([a, b, x]) =>
    add("Substitution", `${lin(a)}²${b === 0 ? "" : ` ${b < 0 ? "−" : "+"} ${lin(Math.abs(b))}`} pour x = ${F(x)}`, A(a * x * x + b * x), `Remplace x par ${P(x)}.`));
  [[3, 2], [-2, 5], [4, -3], [-5, -1], [6, 0.5]].forEach(([k, c]) =>
    add("Substitution", `${P(k)} × (x ${c < 0 ? "−" : "+"} ${F(Math.abs(c))}) pour x = 2`, A(k * (2 + c)), "Calcule d'abord la parenthèse."));

  // Équations : banque générée à solution entière
  [[3, 4, 2], [5, -7, 3], [-2, 6, -4], [7, 1, -1], [4, -2, 5], [-6, 3, 2], [9, 9, -2], [2, -11, 8]].forEach(([a, b, x]) =>
    add("Équation ax + b = c", `${lin(a)} ${b < 0 ? "−" : "+"} ${Math.abs(b)} = ${F(a * x + b)}. x = ?`, A(x), `${lin(a)} = ${F(a * x)}`));
  [[4, 1, 1, 10, 3], [6, -2, 2, 10, 3], [5, 4, -1, -8, -2], [3, -5, 1, 3, 4]].forEach(([a, b, c, d, x]) =>
    add("Équation ax + b = cx + d", `${lin(a)} ${b < 0 ? "−" : "+"} ${Math.abs(b)} = ${lin(c)} ${d < 0 ? "−" : "+"} ${Math.abs(d)}. x = ?`, A(x),
      `${lin(a - c)} = ${F(d - b)}`));

  // Proportionnalité : quatrième proportionnelle et vitesses
  [[2, 9, 6], [5, 35, 3], [4, 6, 10], [3, 7.5, 8], [10, 4, 25], [6, 15, 4]].forEach(([a, b, c]) =>
    add("Quatrième proportionnelle", `${F(a)} → ${F(b)} ; ${F(c)} → ? (proportionnalité)`, A(b * c / a), `${F(b)} × ${F(c)} ÷ ${F(a)}`));
  [[60, 2.5], [90, 0.5], [45, 4], [120, 1.25], [30, 0.25]].forEach(([v, t]) =>
    add("Vitesse moyenne", `À ${v} km/h pendant ${F(t)} h : distance (km) ?`, A(v * t), "d = v × t"));
  [[150, 3], [35, 0.5], [210, 2], [18, 1.5]].forEach(([d, t]) =>
    add("Vitesse moyenne", `${d} km en ${F(t)} h : vitesse (km/h) ?`, A(d / t), "v = d ÷ t"));
  [[200, 15], [80, 25], [45, 20], [1200, 5], [64, 50]].forEach(([n, p]) =>
    add("Pourcentages : évolution", `${n} augmenté de ${p} %`, A(n * (1 + p / 100)), `× ${F(1 + p / 100)}`));

  // Pythagore : triplets multipliés
  [[3, 4, 5], [5, 12, 13], [8, 15, 17]].forEach(([a, b, c]) => [2, 3, 10].forEach(k =>
    add("Pythagore : hypoténuse", `Triangle rectangle : côtés de l'angle droit ${a * k} et ${b * k}. Hypoténuse ?`, A(c * k), `Triplet (${a} ; ${b} ; ${c}) × ${k}`)));
  [9, 25, 36, 64, 100, 121, 169, 225, 0.09, 0.64].forEach(n => add("Racines carrées", `√${F(n)}`, A(Math.sqrt(n)), `Quel nombre positif a pour carré ${F(n)} ?`));

  // Statistiques : moyennes et médianes générées
  [[5, 9, 13], [10, 14, 15, 21], [3, 3, 6, 8, 10], [12, 18], [7, 9, 11, 13, 15, 17]].forEach(s => {
    const sum = s.reduce((a, b) => a + b, 0);
    add("Moyenne", `Moyenne de ${s.join(" ; ")}`, A(sum / s.length), `${sum} ÷ ${s.length}`);
  });
  [[12, 7, 9], [20, 4, 15, 9, 1], [8, 2, 6, 4]].forEach(s => {
    const o = [...s].sort((a, b) => a - b); const n = o.length;
    add("Médiane", `Médiane de ${s.join(" ; ")}`, A(n % 2 ? o[(n - 1) / 2] : (o[n / 2 - 1] + o[n / 2]) / 2), `Range : ${o.join(" ; ")}`);
  });
  [["Urne : 4 rouges, 6 noires. Proba rouge", "2/5"], ["Dé à 8 faces : proba d'un multiple de 4", "1/4"],
   ["Roue de 10 secteurs, 3 gagnants : proba de perdre", "7/10"], ["Mot PROBABILITE, lettre au hasard : proba d'un B", "2/11"]].forEach(([t, r]) =>
    add("Probabilités", `${t} (fraction)`, r, "Cas favorables ÷ cas possibles."));

  // Fonctions & formules : tableaux de valeurs
  ([["y = 3x − 1", (x: number) => 3 * x - 1], ["y = −2x + 4", (x: number) => -2 * x + 4], ["y = x² + x", (x: number) => x * x + x]] as const).forEach(([e, f]) =>
    [-2, 3].forEach(x => add("Tableau de valeurs", `${e} : pour x = ${F(x)}, y = ?`, A(f(x)), "Remplace x dans la formule.")));
  [["Aire d'un disque de rayon r :", "πr²", ["2πr", "πr", "2r²"]], ["Périmètre d'un cercle de rayon r :", "2πr", ["πr²", "πd²", "r²"]],
   ["Volume d'un cylindre :", "πr²h", ["2πrh", "πrh", "πr²h ÷ 3"]], ["Volume d'un cône :", "πr²h ÷ 3", ["πr²h", "2πrh", "πrh ÷ 3"]]].forEach(([t, r, w]) =>
    qcm("Formule : reconnaître", t as string, r as string, w as string[]));

  return qs;
}
