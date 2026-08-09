export interface Question {
  id?: number;
  text: string;
  answer: string;
  category: string;
  hint?: string;
  options?: string[]; // QCM choices — if present, show as multiple choice
}

export type Grade = "6eme" | "5eme" | "4eme" | "3eme";

export const GRADES: Grade[] = ["6eme", "5eme", "4eme", "3eme"];

export const GRADE_LABELS: Record<Grade, string> = {
  "6eme": "6ème",
  "5eme": "5ème",
  "4eme": "4ème",
  "3eme": "3ème",
};

export type ThemeId = "nombres" | "grandeurs" | "algebre" | "fonctions" | "proportionnalite" | "statistiques" | "brevet" | "melange";

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  emoji: string;
  colorClass: string;       // tailwind text-* class
  borderClass: string;      // tailwind border-* class
  bgClass: string;          // tailwind bg-* class
  prefixes: string[];       // category prefixes that belong to this theme
}

export const THEMES: ThemeConfig[] = [
  {
    id: "nombres", name: "Nombres & Calculs", emoji: "🔢",
    colorClass: "text-game-gold", borderClass: "border-game-gold", bgClass: "bg-game-gold",
    prefixes: ["Relatifs", "Fraction", "Quotients", "Add/sub frac", "Multiplier rat", "Diviser rat",
      "Écritures", "Puissances", "Notation sci", "Carrés", "Cubes", "Racines", "Encadrer", "Double,",
      "Tables", "Priorités", "PGCD", "Double, triple",
      "Additions", "Soustractions", "Doubles", "Moitiés", "×10", "Compléments",
      "Triples", "Division simple", "Division euclidienne", "Divisibilité", "Décomposer",
      "Décimaux", "Nombres relatifs", "Produit de relatifs",
      "Comparer", "Ranger", "Opposé", "Fractions égales", "Écriture mixte"]
  },
  {
    id: "grandeurs", name: "Grandeurs & Mesures", emoji: "📏",
    colorClass: "text-game-mint", borderClass: "border-game-mint", bgClass: "bg-game-mint",
    prefixes: ["Périmètres", "Aires", "Angles"]
  },
  {
    id: "algebre", name: "Algèbre & Calcul littéral", emoji: "✏️",
    colorClass: "text-game-teal", borderClass: "border-game-teal", bgClass: "bg-game-teal",
    prefixes: ["Distributivité", "Double dist", "Identité", "Différence", "Programme de calcul",
      "Substitution", "Équation", "Calcul littéral", "Développer", "Factoriser", "Réduire", "Simplifier",
      "Motifs", "Formules"]
  },
  {
    id: "fonctions", name: "Fonctions", emoji: "📈",
    colorClass: "text-game-purple", borderClass: "border-game-purple", bgClass: "bg-game-purple",
    prefixes: ["Fonction", "Tableau de valeurs", "En fonction de"]
  },
  {
    id: "proportionnalite", name: "Proportionnalité & %", emoji: "⚖️",
    colorClass: "text-game-coral", borderClass: "border-game-coral", bgClass: "bg-game-coral",
    prefixes: ["Pourcentage", "Augmentation", "Proportionnalité", "Partage", "Vitesse",
      "Probabilité", "Événement", "Échelle de proba", "Conversions"]
  },
  {
    id: "statistiques", name: "Statistiques", emoji: "📊",
    colorClass: "text-game-pink", borderClass: "border-game-pink", bgClass: "bg-game-pink",
    prefixes: ["Moyenne", "Médiane", "Étendue", "Effectif", "Fréquence"]
  },
  {
    id: "brevet", name: "Brevet", emoji: "🎓",
    colorClass: "text-game-mint", borderClass: "border-game-mint", bgClass: "bg-game-mint",
    prefixes: ["Brevet"]
  },
];

export const MELANGE_THEME: ThemeConfig = {
  id: "melange", name: "Toutes les notions", emoji: "🎲",
  colorClass: "text-primary", borderClass: "border-primary", bgClass: "bg-primary",
  prefixes: []
};

export function getThemeForCategory(category: string): ThemeConfig | undefined {
  return THEMES.find(t => t.prefixes.some(p => category.startsWith(p)));
}

export function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** Shuffle an array using a seed derived from a string (Fisher-Yates) */
export function seededShuffle<T>(arr: T[], seed: string): T[] {
  const out = [...arr];
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = ((h << 5) - h + seed.charCodeAt(i)) | 0;
  }
  for (let i = out.length - 1; i > 0; i--) {
    h = (h * 1664525 + 1013904223) | 0;
    const j = ((h >>> 0) % (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * Parse a numeric answer written as an integer, a decimal (with , or .),
 * a fraction ("3/4", "-7/2") or a percentage ("25%").
 */
export function parseNumericAnswer(raw: string): number {
  const t = raw.replace(/\s/g, "").replace(/,/g, ".");
  if (!t) return NaN;
  const frac = t.match(/^(-?\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)$/);
  if (frac) {
    const d = parseFloat(frac[2]);
    if (d === 0) return NaN;
    return parseFloat(frac[1]) / d;
  }
  const pct = t.match(/^(-?\d+(?:\.\d+)?)%$/);
  if (pct) return parseFloat(pct[1]) / 100;
  if (!/^-?\d*\.?\d+$/.test(t)) return NaN;
  return parseFloat(t);
}

export function checkAnswer(userAnswer: string, correctAnswer: string, isQcm = false): boolean {
  if (isQcm) {
    return userAnswer.trim() === correctAnswer.trim();
  }
  const user = parseNumericAnswer(userAnswer);
  const correct = parseNumericAnswer(correctAnswer);
  if (isNaN(user) || isNaN(correct)) return false;
  // Exact fractions are accepted as well as their decimal writing
  return Math.abs(user - correct) < 0.005;
}

/**
 * Rule reminders shown after a wrong answer when the question has no
 * specific hint. Keyed by category prefix (longest match wins).
 */
const METHOD_BY_PREFIX: [string, string][] = [
  ["Relatifs : add/sub", "Même signe : on additionne et on garde le signe. Signes différents : on soustrait et on garde le signe du plus grand. Soustraire, c'est ajouter l'opposé."],
  ["Relatifs : mul/div", "Règle des signes : (+)×(+)=+ ; (−)×(−)=+ ; (+)×(−)=−."],
  ["Relatifs", "Soustraire un nombre revient à ajouter son opposé : a − (−b) = a + b."],
  ["Nombres relatifs", "Même signe : on additionne. Signes différents : on soustrait et on garde le signe du plus grand."],
  ["Produit de relatifs", "Règle des signes : deux facteurs de même signe donnent un produit positif."],
  ["Comparer", "Sur la droite graduée, le plus grand nombre est le plus à droite. Pour deux négatifs, le plus grand est celui de plus petite distance à zéro."],
  ["Opposé", "L'opposé de a est −a : leur somme vaut 0."],
  ["Fractions égales", "On multiplie (ou divise) numérateur ET dénominateur par le même nombre non nul."],
  ["Quotients égaux", "a/b = (a×k)/(b×k) : on cherche par quel nombre le dénominateur a été multiplié."],
  ["Add/sub fractions", "Même dénominateur : on additionne les numérateurs. Sinon, on réduit d'abord au même dénominateur."],
  ["Multiplier rationnels", "On multiplie les numérateurs entre eux et les dénominateurs entre eux, puis on simplifie."],
  ["Diviser rationnels", "Diviser par une fraction revient à multiplier par son inverse."],
  ["Fraction", "Prendre a/b d'un nombre : on divise par b puis on multiplie par a."],
  ["Écriture mixte", "On effectue la division euclidienne du numérateur par le dénominateur : 17/5 = 3 + 2/5."],
  ["Écritures", "Un même nombre s'écrit de plusieurs façons : 1,2 = 12/10 = 6/5 = 120 %."],
  ["Puissances de 10", "10ⁿ s'écrit 1 suivi de n zéros."],
  ["Puissances négatives", "a⁻ⁿ = 1/aⁿ. Donc 10⁻³ = 0,001."],
  ["Puissances", "aⁿ signifie a × a × … × a (n facteurs). Attention : 2³ ≠ 2 × 3."],
  ["Carrés", "Le carré d'un nombre est le produit de ce nombre par lui-même."],
  ["Cubes", "Le cube de a vaut a × a × a."],
  ["Notation scientifique", "a × 10ⁿ : on décale la virgule de n rangs vers la droite (n > 0) ou vers la gauche (n < 0)."],
  ["Racines", "√a est le nombre positif dont le carré vaut a. Pense aux carrés parfaits : 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144."],
  ["Encadrer", "On cherche les deux carrés parfaits qui encadrent le nombre."],
  ["Divisibilité", "Par 2 : chiffre des unités pair. Par 3 et 9 : somme des chiffres. Par 5 : se termine par 0 ou 5."],
  ["Division euclidienne", "a = b × q + r avec 0 ⩽ r < b."],
  ["Décomposer", "On cherche deux facteurs dans les tables de multiplication."],
  ["PGCD", "On peut utiliser l'algorithme d'Euclide : PGCD(a ; b) = PGCD(b ; reste de a ÷ b)."],
  ["Priorités", "On calcule d'abord les parenthèses, puis les multiplications et divisions, enfin les additions et soustractions."],
  ["Distributivité", "k × (a + b) = k × a + k × b."],
  ["Double dist", "(a + b)(c + d) = ac + ad + bc + bd."],
  ["Identité", "(a + b)(a − b) = a² − b²."],
  ["Différence", "a² − b² = (a + b)(a − b)."],
  ["Développer", "On distribue chaque terme du premier facteur sur chaque terme du second."],
  ["Factoriser", "On repère le facteur commun et on le met en évidence."],
  ["Réduire", "On regroupe uniquement les termes semblables (mêmes lettres, mêmes exposants)."],
  ["Substitution", "On remplace la lettre par sa valeur, en remettant les signes × sous-entendus."],
  ["Formules", "On traduit l'énoncé mot à mot en expression littérale."],
  ["Motifs", "On cherche la régularité entre deux étapes successives, puis on l'exprime en fonction du rang."],
  ["Équation", "On isole l'inconnue en effectuant la même opération dans les deux membres."],
  ["Programme de calcul", "On applique les étapes dans l'ordre, en partant du nombre choisi."],
  ["Fonction linéaire", "f(x) = ax : l'image de x s'obtient en multipliant par le coefficient a."],
  ["Fonction affine", "f(x) = ax + b : on multiplie par a puis on ajoute b."],
  ["Fonction", "L'image de x est le résultat du calcul ; l'antécédent est le nombre de départ."],
  ["Tableau de valeurs", "Chaque colonne associe une valeur de x à son image."],
  ["Pourcentage", "t % d'un nombre = nombre × t ÷ 100. 10 % c'est diviser par 10, 50 % c'est la moitié."],
  ["Augmentation", "Augmenter de t % revient à multiplier par (1 + t/100) ; diminuer, par (1 − t/100)."],
  ["Proportionnalité", "Passe par l'unité, ou utilise le coefficient de proportionnalité."],
  ["Partage", "On compte le nombre total de parts, on cherche la valeur d'une part, puis on multiplie."],
  ["Vitesse", "d = v × t ; v = d ÷ t ; t = d ÷ v."],
  ["Probabilité", "P = nombre de cas favorables ÷ nombre de cas possibles."],
  ["Échelle de proba", "Une probabilité est un nombre compris entre 0 (impossible) et 1 (certain)."],
  ["Événement", "P(contraire) = 1 − P(A)."],
  ["Conversions", "Chaque changement d'unité multiplie ou divise par 10, 100 ou 1 000."],
  ["Moyenne", "Moyenne = somme des valeurs ÷ nombre de valeurs."],
  ["Médiane", "On range les valeurs dans l'ordre croissant : la médiane partage la série en deux."],
  ["Étendue", "Étendue = valeur la plus grande − valeur la plus petite."],
  ["Effectif", "L'effectif total est la somme des effectifs."],
  ["Fréquence", "Fréquence = effectif ÷ effectif total."],
  ["Périmètres", "Le périmètre est la longueur du contour."],
  ["Aires", "Aire d'un rectangle = Longueur × largeur ; aire d'un carré = côté²."],
  ["Angles", "Deux angles complémentaires font 90°, deux angles supplémentaires font 180°."],
  ["Tables", "Révise la table concernée : elle doit être immédiate."],
  ["Compléments", "On cherche ce qu'il manque pour atteindre la dizaine ou la centaine."],
  ["Décimaux", "On aligne les virgules avant de calculer."],
];

/** Short method reminder for a question (falls back on its category rule). */
export function getExplanation(q: Question): string | undefined {
  if (q.hint) return q.hint;
  let best: string | undefined;
  let bestLen = 0;
  for (const [prefix, text] of METHOD_BY_PREFIX) {
    if (q.category.startsWith(prefix) && prefix.length > bestLen) {
      best = text;
      bestLen = prefix.length;
    }
  }
  if (!best && q.category.startsWith("Brevet – ")) {
    const sub = q.category.slice("Brevet – ".length);
    for (const [prefix, text] of METHOD_BY_PREFIX) {
      if (sub.startsWith(prefix) && prefix.length > bestLen) {
        best = text;
        bestLen = prefix.length;
      }
    }
  }
  return best;
}
