import React from "react";

/** Affiche les fractions « a/b » d'un texte sous forme de vraie barre de fraction. */
export function MathText({ text, className = "" }: { text: string; className?: string }) {
  const parts = text.split(/(−?\b\d+\/\d+\b|\^\?)/g);
  return (
    <span className={className}>
      {parts.map((part, i) => {
        const m = part.match(/^(−?)(\d+)\/(\d+)$/);
        if (m) {
          return (
            <span key={i} className="inline-flex items-center align-middle">
              {m[1] && <span className="mr-0.5">−</span>}
              <span className="inline-flex flex-col items-center mx-[0.15em] leading-none">
                <span className="text-[0.72em] font-bold">{m[2]}</span>
                <span className="w-full h-[0.09em] min-h-[2px] bg-current rounded-full my-[0.08em]" />
                <span className="text-[0.72em] font-bold">{m[3]}</span>
              </span>
            </span>
          );
        }
        if (part === "^?") return <sup key={i} className="text-[0.65em] text-primary font-black">?</sup>;
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
}

/** Écriture française d'une réponse numérique : virgule décimale et vrai signe moins. */
export function formatAnswer(answer: string, isQcm = false): string {
  if (isQcm) return answer;
  return answer.replace(/(\d)\.(\d)/g, "$1,$2").replace(/^-/, "−").replace(/\/-/, "/−");
}

/** Ajoute « = ? » aux calculs nus, mais pas aux questions déjà rédigées. */
export function withPrompt(text: string, isQcm: boolean): string {
  if (isQcm || /[?…:]\s*$/.test(text) || /\?/.test(text)) return text;
  // « 3/5 + 1/5 (fraction) » → « 3/5 + 1/5 = ? (fraction) »
  const note = text.match(/^(.*?)(\s\([a-zà-ÿ' ]+\))$/i);
  if (note) return `${note[1]} = ?${note[2]}`;
  return `${text} = ?`;
}
