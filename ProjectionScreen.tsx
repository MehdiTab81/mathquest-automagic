import React, { useState, useEffect, useCallback, useMemo } from "react";
import { getRandomQuestions, getExplanation, seededShuffle, GRADE_LABELS } from "@/lib/questions";
import type { Question, Grade, ThemeId } from "@/lib/questions";
import ConfirmDialog from "./ConfirmDialog";
import { MathText, formatAnswer, withPrompt } from "./MathText";
import { LEVEL_STYLE } from "@/lib/levels";
import { play } from "@/lib/sound";

interface ProjectionScreenProps {
  grade: Grade;
  themeId: ThemeId;
  themeName: string;
  onBack: () => void;
}

const COUNTS = [10, 15, 20];
const DURATIONS = [0, 20, 40, 60];

/**
 * Mode vidéoprojecteur : une question en très grand, chrono facultatif,
 * réponse et méthode révélées par l'enseignant. Pilotable au clavier ou à la télécommande.
 */
const ProjectionScreen: React.FC<ProjectionScreenProps> = ({ grade, themeId, themeName, onBack }) => {
  const [phase, setPhase] = useState<"setup" | "show" | "recap">("setup");
  const [count, setCount] = useState(10);
  const [duration, setDuration] = useState(40);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [paused, setPaused] = useState(false);
  const [confirmQuit, setConfirmQuit] = useState(false);

  const q = questions[index];
  const isQcm = !!q?.options?.length;
  const options = useMemo(() => (q && isQcm ? seededShuffle(q.options!, q.text) : []), [q, isQcm]);

  const start = () => {
    setQuestions(getRandomQuestions(count, grade, themeId));
    setIndex(0);
    setRevealed(false);
    setTimeLeft(duration);
    setPaused(false);
    setPhase("show");
    play("go");
  };

  const reveal = useCallback(() => { setRevealed(true); play("correct"); }, []);

  const goTo = useCallback((i: number) => {
    if (i < 0) return;
    if (i >= questions.length) { setPhase("recap"); return; }
    setIndex(i);
    setRevealed(false);
    setTimeLeft(duration);
    setPaused(false);
  }, [questions.length, duration]);

  // Chrono
  useEffect(() => {
    if (phase !== "show" || !duration || revealed || paused || confirmQuit) return;
    if (timeLeft <= 0) { play("go"); return; }
    if (timeLeft <= 5) play("tick");
    const t = window.setTimeout(() => setTimeLeft(s => s - 1), 1000);
    return () => window.clearTimeout(t);
  }, [phase, duration, revealed, paused, timeLeft, confirmQuit]);

  const toggleFullscreen = () => {
    const doc = document as Document & { webkitFullscreenElement?: Element };
    if (doc.fullscreenElement || doc.webkitFullscreenElement) document.exitFullscreen?.().catch(() => undefined);
    else document.documentElement.requestFullscreen?.().catch(() => undefined);
  };

  // Raccourcis clavier / télécommande de présentation
  useEffect(() => {
    if (phase !== "show" || confirmQuit) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter" || e.key === "ArrowRight" || e.key === "PageDown") {
        e.preventDefault();
        if (!revealed) reveal(); else goTo(index + 1);
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        goTo(index - 1);
      } else if (e.key.toLowerCase() === "p") {
        setPaused(p => !p);
      } else if (e.key.toLowerCase() === "f") {
        toggleFullscreen();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, revealed, index, reveal, goTo, confirmQuit]);

  // ─── Réglages ────────────────────────────────────────────
  if (phase === "setup") {
    return (
      <div className="fixed inset-0 z-50 bg-background overflow-y-auto">
        <div className="min-h-full max-w-lg mx-auto flex flex-col justify-center p-6 animate-fade-in">
          <p className="text-5xl text-center mb-2">📽️</p>
          <h2 className="font-display text-3xl font-bold text-center">Projection classe</h2>
          <p className="text-center text-muted-foreground mb-6">{GRADE_LABELS[grade]} · {themeName}</p>

          <p className="font-bold mb-2">Nombre de questions</p>
          <div className="grid grid-cols-3 gap-2 mb-5">
            {COUNTS.map(c => (
              <button key={c} onClick={() => setCount(c)}
                className={`py-3 rounded-xl font-black text-lg border-2 transition-all ${count === c ? "bg-primary text-primary-foreground border-primary" : "bg-card border-foreground/10"}`}>
                {c}
              </button>
            ))}
          </div>
          <p className="font-bold mb-2">Temps par question</p>
          <div className="grid grid-cols-4 gap-2 mb-6">
            {DURATIONS.map(d => (
              <button key={d} onClick={() => setDuration(d)}
                className={`py-3 rounded-xl font-black border-2 transition-all ${duration === d ? "bg-primary text-primary-foreground border-primary" : "bg-card border-foreground/10"}`}>
                {d ? `${d} s` : "Libre"}
              </button>
            ))}
          </div>
          <div className="bg-foreground/[0.05] rounded-2xl p-4 text-sm mb-6 space-y-1">
            <p className="font-bold">⌨️ Commandes (clavier ou télécommande)</p>
            <p><kbd className="font-mono bg-card px-1.5 rounded">Espace</kbd> / <kbd className="font-mono bg-card px-1.5 rounded">→</kbd> : révéler la réponse, puis question suivante</p>
            <p><kbd className="font-mono bg-card px-1.5 rounded">←</kbd> : question précédente · <kbd className="font-mono bg-card px-1.5 rounded">P</kbd> : pause · <kbd className="font-mono bg-card px-1.5 rounded">F</kbd> : plein écran</p>
          </div>
          <button onClick={start} className="w-full bg-primary text-primary-foreground font-display font-bold text-xl py-4 rounded-2xl shadow-glow active:scale-[0.97]">
            ▶ Lancer la séance
          </button>
          <button onClick={onBack} className="mt-3 text-sm font-bold text-muted-foreground hover:text-foreground py-2">← Retour</button>
        </div>
      </div>
    );
  }

  // ─── Récapitulatif (corrigé à projeter) ──────────────────
  if (phase === "recap") {
    return (
      <div className="fixed inset-0 z-50 bg-background overflow-y-auto">
        <div className="max-w-4xl mx-auto p-6 animate-fade-in">
          <h2 className="font-display text-4xl font-bold text-center mb-1">Corrigé de la séance</h2>
          <p className="text-center text-muted-foreground mb-6">{GRADE_LABELS[grade]} · {themeName}</p>
          <ol className="grid md:grid-cols-2 gap-3 mb-8">
            {questions.map((item, i) => (
              <li key={i} className="bg-card rounded-2xl p-4 border border-foreground/10">
                <p className="text-sm text-muted-foreground font-bold">Question {i + 1}</p>
                <p className="text-xl font-bold"><MathText text={item.text} /></p>
                <p className="text-xl text-success font-mono font-bold mt-1">→ <MathText text={formatAnswer(item.answer, !!item.options?.length)} /></p>
              </li>
            ))}
          </ol>
          <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
            <button onClick={start} className="bg-primary text-primary-foreground font-display font-bold py-4 rounded-2xl shadow-glow">🔁 Nouvelle série</button>
            <button onClick={onBack} className="bg-card border-2 border-foreground/15 font-display font-bold py-4 rounded-2xl">🏠 Menu</button>
          </div>
        </div>
      </div>
    );
  }

  // ─── Question projetée ───────────────────────────────────
  const explanation = q ? getExplanation(q) : undefined;
  const ratio = duration ? timeLeft / duration : 0;
  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col select-none">
      {/* Barre du haut */}
      <div className="flex items-center gap-3 px-6 py-4 text-lg">
        <button onClick={() => setConfirmQuit(true)} className="bg-card border-2 border-foreground/15 font-black rounded-full px-5 py-2 active:scale-95">
          <span className="text-destructive">✕</span> Quitter
        </button>
        <span className="font-bold text-muted-foreground hidden md:inline">{LEVEL_STYLE[grade].emoji} {GRADE_LABELS[grade]} · {themeName}</span>
        <div className="flex-1" />
        <button onClick={toggleFullscreen} className="bg-card rounded-full px-4 py-2 font-bold" title="Plein écran (F)">⛶</button>
        <span className="font-mono font-black text-2xl">{index + 1} / {questions.length}</span>
      </div>
      <div className="h-2 bg-foreground/10 mx-6 rounded-full overflow-hidden">
        <div className="h-full bg-primary transition-all duration-500" style={{ width: `${((index + (revealed ? 1 : 0)) / questions.length) * 100}%` }} />
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center gap-6 min-h-0">
        <span className="text-xl font-bold uppercase tracking-widest text-primary">{q?.category}</span>
        <p key={index} className="font-display font-semibold leading-tight text-[length:clamp(2.4rem,6.5vw,6rem)] animate-fade-in">
          {q && <MathText text={withPrompt(q.text, isQcm)} />}
        </p>

        {isQcm && (
          <div className="grid md:grid-cols-2 gap-4 w-full max-w-5xl">
            {options.map((opt, i) => {
              const right = revealed && opt === q!.answer;
              return (
                <div key={opt}
                  className={`rounded-3xl border-4 px-6 py-4 text-[length:clamp(1.4rem,3vw,2.6rem)] font-bold text-left flex items-center gap-4 transition-all
                    ${right ? "border-success bg-success/20 scale-[1.02]" : revealed ? "border-foreground/10 opacity-40" : "border-foreground/15 bg-card"}`}>
                  <span className="font-mono text-muted-foreground">{String.fromCharCode(65 + i)}</span>
                  <MathText text={opt} />
                </div>
              );
            })}
          </div>
        )}

        {revealed && q && (
          <div className="animate-pop-in">
            {!isQcm && (
              <p className="font-mono font-black text-success text-[length:clamp(2.4rem,6vw,5.5rem)]">
                <MathText text={formatAnswer(q.answer)} />
              </p>
            )}
            {explanation && <p className="text-[length:clamp(1.1rem,2.2vw,2rem)] text-muted-foreground mt-2 max-w-5xl">💡 <MathText text={explanation} /></p>}
          </div>
        )}
      </div>

      {/* Chrono + commandes */}
      <div className="flex items-center gap-4 px-6 pb-6">
        {duration > 0 && (
          <div className="flex items-center gap-3 flex-1">
            <span className={`font-mono font-black text-4xl w-24 ${timeLeft <= 5 && !revealed ? "text-destructive animate-pulse" : ""}`}>
              {timeLeft <= 0 && !revealed ? "⏰" : `${timeLeft}s`}
            </span>
            <div className="flex-1 h-4 bg-foreground/10 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-1000 ease-linear"
                style={{ width: `${ratio * 100}%`, background: ratio > 0.3 ? "hsl(var(--primary))" : "hsl(var(--destructive))" }} />
            </div>
            <button onClick={() => setPaused(p => !p)} className="bg-card rounded-full px-4 py-2 font-bold">{paused ? "▶" : "⏸"}</button>
          </div>
        )}
        {!duration && <div className="flex-1" />}
        <button onClick={() => goTo(index - 1)} disabled={index === 0} className="bg-card rounded-2xl px-5 py-4 text-xl font-bold disabled:opacity-30">←</button>
        {!revealed ? (
          <button onClick={reveal} className="bg-primary text-primary-foreground font-display font-bold text-2xl rounded-2xl px-8 py-4 shadow-glow active:scale-[0.97]">
            Révéler la réponse
          </button>
        ) : (
          <button onClick={() => goTo(index + 1)} className="bg-primary text-primary-foreground font-display font-bold text-2xl rounded-2xl px-8 py-4 shadow-glow active:scale-[0.97]">
            {index + 1 >= questions.length ? "Voir le corrigé" : "Suivante →"}
          </button>
        )}
      </div>

      <ConfirmDialog
        open={confirmQuit}
        title="Arrêter la séance ?"
        confirmLabel="Oui, arrêter"
        cancelLabel="Reprendre"
        onConfirm={() => { setConfirmQuit(false); onBack(); }}
        onCancel={() => setConfirmQuit(false)}
      />
    </div>
  );
};

export default ProjectionScreen;
