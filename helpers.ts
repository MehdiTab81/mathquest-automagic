import type { Question } from "./types";

/** Arrondi à 10⁻⁶ pour éviter les erreurs de virgule flottante (0,1 + 0,2…). */
export const r6 = (n: number) => Math.round(n * 1e6) / 1e6;
/** Valeur attendue par le correcteur (point décimal, signe "-"). */
export const A = (n: number) => String(r6(n));
/** Affichage français : virgule et vrai signe moins. */
export const F = (n: number) => String(r6(n)).replace(".", ",").replace("-", "−");
/** Relatif mis entre parenthèses s'il est négatif. */
export const P = (n: number) => (n < 0 ? `(${F(n)})` : F(n));
export const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));
/** Fraction irréductible "n/d" (ou entier si d divise n). */
export const frac = (n: number, d: number) => {
  if (d < 0) { n = -n; d = -d; }
  const g = gcd(Math.abs(n), d) || 1;
  const nn = n / g, dd = d / g;
  return dd === 1 ? String(nn) : `${nn}/${dd}`;
};

/** Exposant en caractères surélevés : sup(-3) → "⁻³". */
export const sup = (n: number) =>
  String(n).replace(/-/g, "⁻").replace(/\d/g, d => "⁰¹²³⁴⁵⁶⁷⁸⁹"[Number(d)]);
/** Terme en x lisible : lin(1) → "x", lin(-1) → "−x", lin(3) → "3x". */
export const lin = (a: number, v = "x") => (a === 1 ? v : a === -1 ? `−${v}` : `${F(a)}${v}`);

/** Petit constructeur pour écrire les banques de questions de façon compacte. */
export function makeBank() {
  const qs: Question[] = [];
  const add = (category: string, text: string, answer: string, hint?: string, options?: string[]) => {
    qs.push({ text, answer, category, ...(hint ? { hint } : {}), ...(options ? { options } : {}) });
  };
  /** QCM : la bonne réponse est toujours la première de la liste fournie. */
  const qcm = (category: string, text: string, right: string, wrong: string[], hint?: string) =>
    add(category, text, right, hint, [right, ...wrong]);
  return { qs, add, qcm };
}
