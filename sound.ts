/**
 * Effets sonores synthétisés avec la Web Audio API : aucun fichier à charger,
 * fonctionne hors ligne. Le son peut être coupé (préférence mémorisée).
 */

export type SoundName = "tap" | "correct" | "wrong" | "streak" | "levelup" | "tick" | "go" | "win" | "badge";

const STORAGE_KEY = "mathquest-sound";
let ctx: AudioContext | null = null;
let muted = readMuted();
const listeners = new Set<(muted: boolean) => void>();

function readMuted(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === "off";
  } catch {
    return false;
  }
}

export function isMuted(): boolean {
  return muted;
}

export function setMuted(value: boolean) {
  muted = value;
  try {
    localStorage.setItem(STORAGE_KEY, value ? "off" : "on");
  } catch { /* stockage indisponible : on garde la valeur en mémoire */ }
  listeners.forEach(l => l(value));
}

export function onMutedChange(listener: (muted: boolean) => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function audio(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    try {
      ctx = new Ctor();
    } catch {
      return null;
    }
  }
  if (ctx.state === "suspended") ctx.resume().catch(() => undefined);
  return ctx;
}

/** Joue une note courte. `at` est un décalage en secondes. */
function note(freq: number, at: number, duration: number, type: OscillatorType = "sine", gain = 0.12) {
  const ac = audio();
  if (!ac) return;
  const t0 = ac.currentTime + at;
  const osc = ac.createOscillator();
  const g = ac.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  g.gain.setValueAtTime(0, t0);
  g.gain.linearRampToValueAtTime(gain, t0 + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
  osc.connect(g).connect(ac.destination);
  osc.start(t0);
  osc.stop(t0 + duration + 0.02);
}

export function play(name: SoundName) {
  if (muted) return;
  switch (name) {
    case "tap": note(660, 0, 0.05, "triangle", 0.04); break;
    case "correct": note(660, 0, 0.12, "triangle"); note(990, 0.08, 0.18, "triangle"); break;
    case "wrong": note(220, 0, 0.18, "sawtooth", 0.06); note(165, 0.12, 0.25, "sawtooth", 0.06); break;
    case "streak": [523, 659, 784, 1047].forEach((f, i) => note(f, i * 0.06, 0.14, "triangle", 0.1)); break;
    case "levelup": [392, 523, 659, 784, 1047].forEach((f, i) => note(f, i * 0.09, 0.22, "square", 0.06)); break;
    case "badge": [784, 988, 1175, 1568].forEach((f, i) => note(f, i * 0.08, 0.3, "triangle", 0.08)); break;
    case "tick": note(880, 0, 0.06, "square", 0.05); break;
    case "go": note(1320, 0, 0.25, "square", 0.07); break;
    case "win": [523, 659, 784, 659, 784, 1047].forEach((f, i) => note(f, i * 0.12, 0.25, "triangle", 0.1)); break;
  }
}
