import React, { useEffect, useRef } from "react";
import { play } from "@/lib/sound";

/** Touches du pavé : chiffres, virgule, barre de fraction, signe moins, effacer, valider. */
export type PadKey = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "," | "/" | "±" | "del" | "ok";

const MAX_LEN = 14;

/** Applique une touche à la saisie en cours (règles communes à tous les modes). */
export function applyKey(input: string, key: PadKey): string {
  if (key === "del") return input.slice(0, -1);
  if (key === "±") return input.startsWith("-") ? input.slice(1) : "-" + input;
  if (input.length >= MAX_LEN) return input;
  if (key === ",") {
    const lastPart = input.split("/").pop() || "";
    if (lastPart.includes(",")) return input;
    return input + (lastPart === "" || lastPart === "-" ? "0," : ",");
  }
  if (key === "/") {
    if (input.includes("/") || input === "" || input === "-" || input.endsWith(",")) return input;
    return input + "/";
  }
  if (key === "ok") return input;
  return input + key;
}

/** Affichage lisible de la saisie : vrai signe moins. */
export function displayInput(input: string): string {
  return input.replace(/^-/, "−");
}

const ROWS: PadKey[][] = [
  ["7", "8", "9", "del"],
  ["4", "5", "6", "/"],
  ["1", "2", "3", "±"],
  ["0", ",", "ok"],
];

const LABEL: Partial<Record<PadKey, string>> = { del: "⌫", "±": "+/−", ok: "VALIDER", "/": "a/b" };
const ARIA: Partial<Record<PadKey, string>> = { del: "Effacer", "±": "Changer le signe", ok: "Valider", "/": "Barre de fraction", ",": "Virgule" };

interface KeypadProps {
  onKey: (key: PadKey) => void;
  /** "lg" pour l'entraînement plein écran, "md" pour le duel/la battle. */
  size?: "lg" | "md";
  disabled?: boolean;
  className?: string;
}

const Keypad: React.FC<KeypadProps> = ({ onKey, size = "lg", disabled, className = "" }) => {
  const text = size === "lg" ? "text-2xl" : "text-[length:clamp(1rem,3.4vh,1.6rem)]";
  return (
    <div
      className={`grid grid-rows-4 gap-1.5 ${className}`}
      style={{ touchAction: "manipulation" }}
      aria-label="Pavé numérique"
    >
      {ROWS.map((row, ri) => (
        <div key={ri} className="grid grid-cols-4 gap-1.5 min-h-0">
          {row.map(k => {
            const isOk = k === "ok";
            const isOp = k === "/" || k === "±" || k === ",";
            return (
              <button
                key={k}
                type="button"
                disabled={disabled}
                aria-label={ARIA[k] || k}
                onPointerDown={e => {
                  e.preventDefault();
                  if (disabled) return;
                  if (!isOk) play("tap");
                  onKey(k);
                }}
                className={`rounded-xl font-mono font-extrabold select-none min-h-0 transition-all duration-75
                  active:scale-[0.92] disabled:opacity-40
                  ${isOk ? "col-span-2 bg-primary text-primary-foreground font-display font-bold tracking-wide shadow-glow"
                    : k === "del" ? "bg-destructive/20 text-destructive"
                    : isOp ? "bg-secondary/15 text-secondary"
                    : "bg-foreground/[0.07] text-foreground active:bg-primary/30"}
                  ${isOk ? (size === "lg" ? "text-xl" : "text-base") : text}`}
                style={{ touchAction: "manipulation" }}
              >
                {LABEL[k] || k}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Keypad;

/**
 * Saisie au clavier physique (ordinateur, tableau interactif) :
 * chiffres, « , » ou « . », « - », « / », Retour arrière, Entrée.
 */
export function usePhysicalKeyboard(enabled: boolean, onKey: (key: PadKey) => void) {
  const ref = useRef(onKey);
  ref.current = onKey;
  useEffect(() => {
    if (!enabled) return;
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      let key: PadKey | null = null;
      if (/^[0-9]$/.test(e.key)) key = e.key as PadKey;
      else if (e.key === "," || e.key === ".") key = ",";
      else if (e.key === "-") key = "±";
      else if (e.key === "/") key = "/";
      else if (e.key === "Backspace") key = "del";
      else if (e.key === "Enter") key = "ok";
      if (key) {
        e.preventDefault();
        ref.current(key);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [enabled]);
}
