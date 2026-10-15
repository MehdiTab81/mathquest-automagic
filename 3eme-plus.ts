import type { Question, ThemeConfig } from "./types";
import { A, F, P, frac, lin, makeBank } from "./helpers";

/** Chapitres de 3ème (les notions de 4ème servent d'entretien). */
export const CHAPTERS_3EME: ThemeConfig[] = [
  {
    id: "3e-nombres", name: "Nombres & calculs", emoji: "🔢",
    colorClass: "text-game-gold", borderClass: "border-game-gold", bgClass: "bg-game-gold",
    prefixes: ["Relatifs", "Fraction", "Quotients", "Add/sub", "Multiplier", "Diviser", "Écritures", "Puissances",
      "Notation", "Carrés", "Racines", "Encadrer", "Priorités", "Tables", "Double, triple", "Nombres premiers",
      "Décomposition", "PGCD", "Arithmétique"],
  },
  {
    id: "3e-litteral", name: "Calcul littéral & équations", emoji: "✏️",
    colorClass: "text-game-pink", borderClass: "border-game-pink", bgClass: "bg-game-pink",
    prefixes: ["Programme de calcul", "Substitution", "Distributivité", "Double distributivité", "Identité",
      "Différence de carrés", "Équation", "Calcul littéral", "Développer", "Factoriser", "Réduire", "Simplifier", "Inéquation"],
  },
  {
    id: "3e-fonctions", name: "Fonctions", emoji: "📈",
    colorClass: "text-game-purple", borderClass: "border-game-purple", bgClass: "bg-game-purple",
    prefixes: ["Fonction"],
  },
  {
    id: "3e-proportionnalite", name: "Proportionnalité & grandeurs", emoji: "⚖️",
    colorClass: "text-game-mint", borderClass: "border-game-mint", bgClass: "bg-game-mint",
    prefixes: ["Pourcentage", "Augmentation", "Proportionnalité", "Partage", "Vitesse", "Conversions", "Grandeurs composées"],
  },
  {
    id: "3e-geometrie", name: "Géométrie", emoji: "📐",
    colorClass: "text-game-teal", borderClass: "border-game-teal", bgClass: "bg-game-teal",
    prefixes: ["Thalès", "Trigonométrie", "Agrandissement", "Pythagore", "Transformations"],
  },
  {
    id: "3e-donnees", name: "Statistiques & probabilités", emoji: "🎲",
    colorClass: "text-game-coral", borderClass: "border-game-coral", bgClass: "bg-game-coral",
    prefixes: ["Moyenne", "Médiane", "Étendue", "Probabilité", "Événement"],
  },
  {
    id: "3e-brevet", name: "Spécial Brevet", emoji: "🎓",
    colorClass: "text-game-gold", borderClass: "border-game-gold", bgClass: "bg-game-gold",
    prefixes: ["Brevet"],
  },
];

/** Compléments de 3ème : géométrie, fonctions, arithmétique, grandeurs composées, probabilités. */
export function get3emePlusQuestions(): Question[] {
  const { qs, add, qcm } = makeBank();

  // ═══ THALÈS ═══════════════════════════════════════════════
  // Configuration : (MN) // (BC), M ∈ [AB], N ∈ [AC]. AM/AB = AN/AC = MN/BC.
  const th: [number, number, number, number][] = [
    // AM, AB, MN, BC  (on demande une longueur manquante)
    [3, 6, 4, 8], [2, 5, 3, 7.5], [4, 10, 6, 15], [6, 9, 8, 12], [5, 8, 10, 16], [1.5, 4.5, 2, 6],
  ];
  th.forEach(([am, ab, mn, bc]) => {
    add("Thalès : longueur", `(MN) // (BC), AM = ${F(am)}, AB = ${F(ab)}, BC = ${F(bc)}. MN = ?`, A(mn), `AM/AB = MN/BC : MN = ${F(bc)} × ${F(am)} ÷ ${F(ab)}`);
    add("Thalès : longueur", `(MN) // (BC), AM = ${F(am)}, AB = ${F(ab)}, MN = ${F(mn)}. BC = ?`, A(bc), `BC = ${F(mn)} × ${F(ab)} ÷ ${F(am)}`);
  });
  [["(MN) // (BC) donne l'égalité…", "AM/AB = AN/AC = MN/BC", ["AM/MB = MN/BC", "AB/AM = AC/AN = BC/AB", "AM × AB = AN × AC"]],
   ["AM/AB = AN/AC (points alignés dans le même ordre). Alors…", "(MN) // (BC)", ["(MN) ⊥ (BC)", "AMN est rectangle", "On ne peut rien dire"]],
   ["AM/AB = 0,4 et AN/AC = 0,5. Alors (MN) et (BC) sont…", "Non parallèles", ["Parallèles", "Perpendiculaires"]]].forEach(([t, r, w]) =>
    qcm("Thalès : propriété", t as string, r as string, w as string[], "Théorème de Thalès et sa réciproque."));

  // ═══ TRIGONOMÉTRIE ════════════════════════════════════════
  [["Dans un triangle rectangle, cos(angle) =", "adjacent ÷ hypoténuse", ["opposé ÷ hypoténuse", "opposé ÷ adjacent", "hypoténuse ÷ adjacent"]],
   ["Dans un triangle rectangle, sin(angle) =", "opposé ÷ hypoténuse", ["adjacent ÷ hypoténuse", "opposé ÷ adjacent", "adjacent ÷ opposé"]],
   ["Dans un triangle rectangle, tan(angle) =", "opposé ÷ adjacent", ["adjacent ÷ opposé", "opposé ÷ hypoténuse", "adjacent ÷ hypoténuse"]],
   ["Moyen mnémotechnique classique :", "SOH CAH TOA", ["CAH SOH TOA", "TOA CAH SOH", "SAH COH TOA"]]].forEach(([t, r, w]) =>
    qcm("Trigonométrie : formules", t as string, r as string, w as string[], "CAH : Cos = Adjacent / Hypoténuse."));
  [["cos 60°", 0.5], ["sin 30°", 0.5], ["tan 45°", 1], ["cos 0°", 1], ["sin 90°", 1], ["sin 0°", 0]].forEach(([t, r]) =>
    add("Trigonométrie : valeurs", `${t} = ?`, A(r as number), "Valeurs remarquables à connaître."));
  [[10, 60, "cos"], [8, 30, "sin"], [6, 60, "cos"], [12, 30, "sin"], [5, 45, "tan"]].forEach(([h, a, f]) => {
    const v = f === "tan" ? 1 : 0.5;
    const txt = f === "tan"
      ? `Triangle rectangle : angle ${a}°, côté adjacent ${h}. Côté opposé ?`
      : `Triangle rectangle : hypoténuse ${h}, angle ${a}°. Côté ${f === "cos" ? "adjacent" : "opposé"} ?`;
    add("Trigonométrie : calculs", txt, A((h as number) * v), `${f}(${a}°) = ${F(v)}`);
  });
  [["Triangle rectangle : adjacent 4, hypoténuse 8. cos de l'angle ?", 0.5], ["Triangle rectangle : opposé 3, hypoténuse 5. sin de l'angle ?", 0.6],
   ["Triangle rectangle : opposé 6, adjacent 8. tan de l'angle ?", 0.75], ["Triangle rectangle : adjacent 12, hypoténuse 13. cos (arrondi au centième) ?", 0.92]].forEach(([t, r]) =>
    add("Trigonométrie : calculs", t as string, A(r as number), "Écris le rapport adapté."));

  // ═══ AGRANDISSEMENT / RÉDUCTION ═══════════════════════════
  const k: [number, number][] = [[2, 5], [3, 4], [0.5, 12], [10, 3], [1.5, 6]];
  k.forEach(([c, l]) => add("Agrandissement : longueurs", `Rapport k = ${F(c)}. Une longueur de ${l} cm devient ?`, A(c * l), "Longueurs × k"));
  [[2, 10], [3, 5], [0.5, 40], [10, 2]].forEach(([c, a]) => add("Agrandissement : aires", `Rapport k = ${F(c)}. Une aire de ${a} cm² devient ?`, A(c * c * a), "Aires × k²"));
  [[2, 5], [3, 2], [0.5, 80], [10, 1]].forEach(([c, v]) => add("Agrandissement : volumes", `Rapport k = ${F(c)}. Un volume de ${v} cm³ devient ?`, A(c ** 3 * v), "Volumes × k³"));
  [["Longueurs × 3 : les aires sont multipliées par…", "9", ["3", "6", "27"]], ["Longueurs × 2 : les volumes sont multipliés par…", "8", ["2", "4", "6"]],
   ["Longueurs ÷ 2 : les aires sont…", "Divisées par 4", ["Divisées par 2", "Divisées par 8", "Inchangées"]]].forEach(([t, r, w]) =>
    qcm("Agrandissement : propriété", t as string, r as string, w as string[], "Longueurs × k, aires × k², volumes × k³."));

  // ═══ PYTHAGORE (entretien 3e) & TRANSFORMATIONS ═══════════
  [[6, 8, 10], [9, 12, 15], [20, 21, 29], [0.6, 0.8, 1]].forEach(([a, b, c]) =>
    add("Pythagore", `Triangle rectangle de côtés ${F(a)} et ${F(b)} : hypoténuse ?`, A(c), `√(${F(a * a)} + ${F(b * b)})`));
  [["Une homothétie de rapport −1 est…", "Une symétrie centrale", ["Une translation", "Une rotation de 90°"]],
   ["Homothétie de rapport 2 : les longueurs sont…", "Multipliées par 2", ["Multipliées par 4", "Inchangées"]],
   ["Rotation de 90° : elle conserve…", "Les longueurs et les angles", ["Seulement les angles", "Seulement l'alignement"]],
   ["Homothétie de rapport 0,5 : la figure est…", "Réduite", ["Agrandie", "Inchangée"]]].forEach(([t, r, w]) =>
    qcm("Transformations", t as string, r as string, w as string[]));

  // ═══ FONCTIONS ════════════════════════════════════════════
  const linF: [number, number[]][] = [[3, [4, -2]], [-2, [5, -3]], [0.5, [8, -6]], [1.2, [10, 5]]];
  linF.forEach(([a, xs]) => xs.forEach(x => add("Fonction linéaire : image", `f(x) = ${lin(a)}. f(${F(x)}) = ?`, A(a * x), `${F(a)} × ${P(x)}`)));
  [[4, 20], [-3, 12], [0.5, 7], [2.5, 10]].forEach(([a, y]) => add("Fonction linéaire : antécédent", `f(x) = ${lin(a)}. Antécédent de ${F(y)} ?`, A(y / a), `${lin(a)} = ${F(y)}`));
  [[5, 15], [4, -8], [10, 25], [-2, 7]].forEach(([x, y]) => add("Fonction linéaire : coefficient", `f linéaire avec f(${F(x)}) = ${F(y)}. Coefficient a ?`, A(y / x), `a = ${F(y)} ÷ ${P(x)}`));
  const aff: [number, number, number[]][] = [[2, 3, [4, -1]], [-3, 5, [2, -2]], [0.5, -1, [6, 0]], [-1, 4, [7, -3]]];
  aff.forEach(([a, b, xs]) => xs.forEach(x => add("Fonction affine : image", `f(x) = ${lin(a)} ${b < 0 ? "−" : "+"} ${F(Math.abs(b))}. f(${F(x)}) = ?`, A(a * x + b), `${F(a)} × ${P(x)} ${b < 0 ? "−" : "+"} ${F(Math.abs(b))}`)));
  [[2, 3, 11], [-3, 5, -10], [4, -1, 7], [0.5, 2, 6]].forEach(([a, b, y]) =>
    add("Fonction affine : antécédent", `f(x) = ${lin(a)} ${b < 0 ? "−" : "+"} ${Math.abs(b)}. Antécédent de ${F(y)} ?`, A((y - b) / a), `Résous ${lin(a)} ${b < 0 ? "−" : "+"} ${Math.abs(b)} = ${F(y)}`));
  [[1, 5, 3, 9], [0, 2, 4, 14], [2, 1, 5, 10], [-1, 7, 1, 3]].forEach(([x1, y1, x2, y2]) =>
    add("Fonction affine : coefficient", `f affine, f(${x1}) = ${y1} et f(${x2}) = ${y2}. Coefficient a ?`, A((y2 - y1) / (x2 - x1)), `a = (${y2} − ${y1}) ÷ (${x2} − ${P(x1)})`));
  [["f(x) = 3x + 2 : ordonnée à l'origine ?", 2], ["f(x) = −x + 7 : ordonnée à l'origine ?", 7], ["f(x) = 5 − 2x : coefficient directeur ?", -2],
   ["f(x) = 4x : ordonnée à l'origine ?", 0]].forEach(([t, r]) =>
    add("Fonction affine : lecture", t as string, A(r as number), "f(x) = ax + b : a coefficient directeur, b ordonnée à l'origine."));
  [["La représentation d'une fonction linéaire est…", "Une droite passant par l'origine", ["Une droite quelconque", "Une courbe", "Une droite horizontale"]],
   ["f(x) = 2x + 1 est une fonction…", "Affine", ["Linéaire", "Constante", "Ni l'une ni l'autre"]],
   ["f(x) = −4x est une fonction…", "Linéaire (donc aussi affine)", ["Affine non linéaire", "Constante", "Ni l'une ni l'autre"]],
   ["f(x) = x² est une fonction…", "Ni linéaire ni affine", ["Linéaire", "Affine", "Constante"]],
   ["Augmenter de 20 % revient à appliquer f(x) =", "1,2x", ["0,2x", "x + 20", "20x"]],
   ["Diminuer de 30 % revient à appliquer f(x) =", "0,7x", ["0,3x", "x − 30", "1,3x"]],
   ["f(x) = −2x + 3 est…", "Décroissante", ["Croissante", "Constante"]]].forEach(([t, r, w]) =>
    qcm("Fonction : reconnaître", t as string, r as string, w as string[]));
  [["f(x) = x² − 1. Image de −3 ?", 8], ["f(x) = 2x². Image de −2 ?", 8], ["f(x) = (x + 1)². Image de 4 ?", 25], ["f(x) = 10 − x². Image de 3 ?", 1]].forEach(([t, r]) =>
    add("Fonction : image", t as string, A(r as number), "Remplace x par la valeur, avec des parenthèses."));

  // ═══ ARITHMÉTIQUE ═════════════════════════════════════════
  [2, 9, 13, 21, 29, 39, 41, 51, 57, 97, 91, 1].forEach(n => {
    const isP = n > 1 && [...Array(n).keys()].slice(2).every(d => n % d !== 0);
    qcm("Nombres premiers", `${n} est-il premier ?`, isP ? "Oui" : "Non", [isP ? "Non" : "Oui"],
      n === 1 ? "1 n'a qu'un seul diviseur : il n'est pas premier." : "Un nombre premier a exactement deux diviseurs : 1 et lui-même.");
  });
  [["60", "2² × 3 × 5", ["2 × 30", "6 × 10", "2² × 15"]], ["84", "2² × 3 × 7", ["4 × 21", "2 × 42", "2² × 21"]],
   ["90", "2 × 3² × 5", ["9 × 10", "2 × 45", "3 × 30"]], ["126", "2 × 3² × 7", ["2 × 63", "14 × 9", "2 × 3 × 21"]],
   ["72", "2³ × 3²", ["8 × 9", "2² × 18", "6 × 12"]]].forEach(([n, r, w]) =>
    qcm("Décomposition en facteurs premiers", `Décomposition de ${n} en facteurs premiers`, r as string, w as string[], "Divise successivement par 2, 3, 5, 7…"));
  [["Plus petit nombre premier ?", 2], ["Nombre de diviseurs de 12 ?", 6], ["Plus grand diviseur commun de 18 et 24 ?", 6],
   ["Plus petit multiple commun non nul de 4 et 6 ?", 12]].forEach(([t, r]) =>
    add("Arithmétique", t as string, A(r as number)));

  // ═══ GRANDEURS COMPOSÉES ══════════════════════════════════
  [["36 km/h = … m/s", 10, "÷ 3,6"], ["72 km/h = … m/s", 20, "÷ 3,6"], ["5 m/s = … km/h", 18, "× 3,6"],
   ["Débit : 120 L en 4 min. Débit (L/min) ?", 30, "120 ÷ 4"], ["Robinet à 12 L/min pendant 15 min : volume (L) ?", 180, "12 × 15"],
   ["Masse volumique 2 g/cm³, volume 50 cm³ : masse (g) ?", 100, "2 × 50"], ["Conso 6 L/100 km, trajet 250 km : litres ?", 15, "6 × 2,5"],
   ["1 kWh coûte 0,20 €. 35 kWh ?", 7, "0,20 × 35"]].forEach(([t, r, h]) =>
    add("Grandeurs composées", t as string, A(r as number), h as string));

  // ═══ PROBABILITÉS & STATISTIQUES ══════════════════════════
  [["On lance deux dés : proba d'une somme de 12", "1/36", "Seulement (6 ; 6) sur 36 issues"],
   ["On lance deux dés : proba d'une somme de 7", "1/6", "6 issues sur 36"],
   ["Deux pièces : proba d'obtenir pile et face (dans n'importe quel ordre)", "1/2", "PF et FP : 2 sur 4"],
   ["Urne 2 rouges et 1 bleue, on tire 2 fois avec remise : proba de 2 rouges", "4/9", "2/3 × 2/3"],
   ["P(A) = 1/5. P(non A) ?", "4/5", "1 − 1/5"],
   ["Trois pièces : proba de 3 faces", "1/8", "1/2 × 1/2 × 1/2"]].forEach(([t, r, h]) =>
    add("Probabilité : deux épreuves", `${t} (fraction)`, r, h));
  [["Série : 4 ; 8 ; 8 ; 10 ; 15. Moyenne ?", 9], ["Série : 2 ; 5 ; 7 ; 11 ; 20 ; 21. Médiane ?", 9],
   ["Moyenne de 5 notes : 12. Somme des notes ?", 60], ["Série : 13 ; 7 ; 20 ; 3. Étendue ?", 17]].forEach(([t, r]) =>
    add(t.includes("Médiane") ? "Médiane" : t.includes("Étendue") ? "Étendue" : "Moyenne", t as string, A(r as number)));

  // ═══ ÉQUATIONS PRODUIT & INÉQUATIONS ══════════════════════
  [["(x − 3)(x + 5) = 0 : solution positive ?", 3], ["(x + 4)(x − 1) = 0 : solution négative ?", -4],
   ["(2x − 6)(x + 2) = 0 : solution positive ?", 3], ["x² = 49 : solution positive ?", 7], ["x² = 16 : solution négative ?", -4]].forEach(([t, r]) =>
    add("Équation produit", t as string, A(r as number), "Un produit est nul si l'un de ses facteurs est nul."));
  [["2x + 3 > 11 équivaut à…", "x > 4", ["x < 4", "x > 7", "x > 5,5"]], ["−3x < 12 équivaut à…", "x > −4", ["x < −4", "x < 4", "x > 4"]],
   ["x − 5 ⩽ 2 équivaut à…", "x ⩽ 7", ["x ⩽ −3", "x ⩾ 7", "x ⩽ 3"]]].forEach(([t, r, w]) =>
    qcm("Inéquation", t as string, r as string, w as string[], "Multiplier par un négatif change le sens de l'inégalité."));

  // ═══ COMPLÉMENTS POUR ÉQUILIBRER ══════════════════════════
  [[80, 25, "+"], [250, 12, "−"], [40, 15, "+"], [1500, 8, "−"], [60, 5, "+"], [90, 40, "−"]].forEach(([n, p, s]) => {
    const coef = 1 + (s === "+" ? 1 : -1) * (p as number) / 100;
    add("Augmentation / diminution %", `${n} € ${s === "+" ? "augmenté" : "diminué"} de ${p} %`, A((n as number) * coef), `× ${F(coef)}`);
  });
  [[120, 150], [80, 60], [50, 65], [200, 170]].forEach(([a, b]) =>
    add("Pourcentage d'évolution", `Un prix passe de ${a} € à ${b} €. Évolution en % ?`, A(100 * (b - a) / a), `(${b} − ${a}) ÷ ${a} × 100`));
  [["Un prix augmente de 10 % puis de 10 %. Hausse totale (%) ?", 21, "1,1 × 1,1 = 1,21"],
   ["Après une remise de 20 %, un article coûte 48 €. Prix initial ?", 60, "48 ÷ 0,8"],
   ["Ratio 2 : 3 pour 25 billes. Part la plus grande ?", 15, "25 ÷ 5 × 3"],
   ["Ratio 1 : 4 pour 30 L. Part la plus petite (L) ?", 6, "30 ÷ 5"]].forEach(([t, r, h]) =>
    add(t.startsWith("Ratio") ? "Partage selon ratio" : "Pourcentage d'évolution", t as string, A(r as number), h as string));
  [[2, 4, 4, 5, 5, 7, 8], [10, 12, 15, 18], [1, 1, 2, 3, 5, 8, 13, 21], [6, 6, 6, 6]].forEach(s => {
    const o = [...s].sort((a, b) => a - b); const n = o.length;
    const sum = s.reduce((a, b) => a + b, 0);
    add("Moyenne", `Moyenne de ${s.join(" ; ")}`, A(sum / n), `${sum} ÷ ${n}`);
    add("Médiane", `Médiane de ${s.join(" ; ")}`, A(n % 2 ? o[(n - 1) / 2] : (o[n / 2 - 1] + o[n / 2]) / 2), `${n} valeurs rangées`);
    add("Étendue", `Étendue de ${s.join(" ; ")}`, A(o[n - 1] - o[0]), `${o[n - 1]} − ${o[0]}`);
  });
  [["P(A) = 0,35. P(non A) ?", "0.65"], ["P(A) = 2/7. P(non A) (fraction) ?", "5/7"], ["Événement certain : probabilité ?", "1"]].forEach(([t, r]) =>
    add("Événement contraire", t, r, "P(non A) = 1 − P(A)"));
  [["Dé équilibré lancé 600 fois : nombre de 6 attendu environ ?", "100"], ["Pièce lancée 1 000 fois : nombre de piles attendu environ ?", "500"]].forEach(([t, r]) =>
    add("Probabilité : fréquence", t, r, "Sur un grand nombre d'essais, la fréquence se rapproche de la probabilité."));

  // Ratio sous forme de fraction irréductible
  add("Partage selon ratio", "Ratio 6 : 9 sous forme irréductible (fraction)", frac(6, 9), "Divise par 3.");

  return qs;
}
