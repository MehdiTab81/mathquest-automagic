import React, { useState, useCallback, useEffect, useMemo, useRef } from "react";
import Keypad, { applyKey, displayInput, usePhysicalKeyboard } from "./Keypad";
import type { PadKey } from "./Keypad";
import ConfirmDialog from "./ConfirmDialog";
import { MathText, formatAnswer, withPrompt } from "./MathText";
import { checkAnswer, seededShuffle, getExplanation } from "@/lib/questions";
import type { Question } from "@/lib/questions";
import { play } from "@/lib/sound";

interface QuizScreenProps {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  /** Série de bonnes réponses en cours. */
  streak: number;
  /** Mode examen : pas de correction immédiate, chrono affiché. */
  isExam?: boolean;
  timer?: string;
  timerWarning?: boolean;
  /** Résultat de chaque question déjà jouée (pour la barre de progression). */
  history: boolean[];
  onAnswer: (correct: boolean, timeMs: number, userInput: string) => void;
  onSkip: () => void;
  onQuit: () => void;
}

const QuizScreen: React.FC<QuizScreenProps> = ({
  question, questionIndex, totalQuestions, streak, isExam, timer, timerWarning, history, onAnswer, onSkip, onQuit,
}) => {
  const [input, setInput] = useState("");
  const [shake, setShake] = useState(false);
  const [state, setState] = useState<"answering" | "good" | "wrong">("answering");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [confirmQuit, setConfirmQuit] = useState(false);
  const startTime = useRef(Date.now());
  const done = useRef(false);

  const isQcm = !!question.options && question.options.length > 0;
  const options = useMemo(() => (isQcm ? seededShuffle(question.options!, question.text) : []), [isQcm, question]);
  const explanation = getExplanation(question);

  const finish = useCallback((correct: boolean, userInput: string, delay: number) => {
    if (done.current) return;
    done.current = true;
    const elapsed = Date.now() - startTime.current;
    window.setTimeout(() => onAnswer(correct, elapsed, userInput), delay);
  }, [onAnswer]);

  const submit = useCallback((value: string) => {
    if (state !== "answering" || !value.trim()) return;
    const correct = checkAnswer(value, question.answer, isQcm);
    if (correct) {
      setState("good");
      const next = streak + 1;
      play(next > 0 && next % 5 === 0 ? "streak" : "correct");
      finish(true, value, 420);
    } else {
      setShake(true);
      window.setTimeout(() => setShake(false), 420);
      play("wrong");
      if (isExam) {
        setState("wrong");
        finish(false, value, 650);
      } else {
        setState("wrong");
      }
    }
  }, [state, question.answer, isQcm, streak, isExam, finish]);

  const handleKey = useCallback((key: PadKey) => {
    if (confirmQuit) return;
    if (state === "wrong" && !isExam && key === "ok") {
      finish(false, isQcm ? selectedOption || "" : input, 0);
      return;
    }
    if (state !== "answering" || isQcm) return;
    if (key === "ok") submit(input);
    else setInput(prev => applyKey(prev, key));
  }, [confirmQuit, state, isExam, isQcm, selectedOption, input, submit, finish]);

  usePhysicalKeyboard(true, handleKey);

  const chooseOption = useCallback((opt: string) => {
    if (state !== "answering") return;
    setSelectedOption(opt);
    submit(opt);
  }, [state, submit]);

  // Raccourcis A–D / 1–4 pour les QCM
  useEffect(() => {
    if (!isQcm) return;
    const onKey = (e: KeyboardEvent) => {
      if (confirmQuit || e.ctrlKey || e.metaKey) return;
      const idx = "abcd".indexOf(e.key.toLowerCase());
      const num = "1234".indexOf(e.key);
      const i = idx >= 0 ? idx : num;
      if (i >= 0 && i < options.length) { e.preventDefault(); chooseOption(options[i]); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isQcm, options, chooseOption, confirmQuit]);

  const showCorrection = state === "wrong" && !isExam;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col select-none overflow-hidden bg-background ${state === "good" ? "animate-flash-good" : ""}`}
      style={{ touchAction: "manipulation" }}
    >
      {/* Barre du haut : quitter, progression, série, chrono */}
      <div className="flex-shrink-0 px-3 pt-3 pb-2 max-w-2xl w-full mx-auto">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setConfirmQuit(true)}
            className="flex items-center gap-1.5 text-sm font-black text-foreground bg-card border-2 border-foreground/15 rounded-full pl-3 pr-4 py-2
              active:scale-95 transition-all hover:border-destructive/50"
            aria-label="Quitter la partie"
          >
            <span className="text-destructive">✕</span> Quitter
          </button>
          <div className="flex-1" />
          {streak >= 2 && (
            <span key={streak} className="animate-pop-in font-black text-sm px-3 py-1.5 rounded-full bg-secondary/15 text-secondary">
              🔥 {streak}
            </span>
          )}
          {timer && (
            <span className={`font-mono font-bold text-sm px-3 py-1.5 rounded-full ${timerWarning ? "bg-destructive/20 text-destructive animate-pulse" : "bg-card text-foreground"}`}>
              ⏱ {timer}
            </span>
          )}
          <span className="font-mono text-xs font-bold text-muted-foreground bg-card rounded-full px-3 py-1.5">
            {questionIndex + 1}/{totalQuestions}
          </span>
        </div>
        {/* Progression segmentée */}
        <div className="flex gap-[3px] mt-3" aria-hidden>
          {Array.from({ length: totalQuestions }, (_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                i < history.length ? (history[i] ? "bg-success" : "bg-destructive") : i === questionIndex ? "bg-primary" : "bg-foreground/10"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Question */}
      <div className={`flex-shrink-0 px-4 pt-3 pb-3 max-w-2xl w-full mx-auto text-center ${shake ? "animate-shake" : ""}`}>
        <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-primary/90 bg-primary/10 rounded-full px-3 py-1 mb-3">
          {question.category}
        </span>
        <p className="font-display text-[length:clamp(1.4rem,5.5vw,2.2rem)] font-semibold leading-tight">
          <MathText text={withPrompt(question.text, isQcm)} />
        </p>
      </div>

      {/* Correction après une erreur (entraînement) */}
      {showCorrection && (
        <div className="flex-1 flex flex-col justify-center px-4 max-w-2xl w-full mx-auto pb-6">
          <div className="bg-destructive/10 border-l-4 border-destructive p-4 rounded-xl animate-fade-in">
            <p className="text-sm font-bold text-destructive mb-1">Pas tout à fait…</p>
            {(input || selectedOption) && (
              <p className="text-sm text-muted-foreground">
                Ta réponse : <span className="font-mono line-through">{isQcm ? selectedOption : displayInput(input)}</span>
              </p>
            )}
            <p className="text-lg mt-1">
              Bonne réponse : <strong className="font-mono text-success text-xl"><MathText text={formatAnswer(question.answer, isQcm)} /></strong>
            </p>
            {explanation && (
              <p className="text-sm text-foreground/85 mt-3 bg-background/40 rounded-lg p-3">💡 <MathText text={explanation} /></p>
            )}
          </div>
          <button
            onClick={() => finish(false, isQcm ? selectedOption || "" : input, 0)}
            className="mt-4 w-full bg-primary text-primary-foreground font-display font-bold text-lg py-4 rounded-2xl active:scale-[0.97] transition-all shadow-glow"
            autoFocus
          >
            Question suivante →
          </button>
        </div>
      )}

      {/* QCM */}
      {isQcm && !showCorrection && (
        <div className="flex-1 flex flex-col justify-center px-4 gap-2.5 max-w-2xl w-full mx-auto pb-4">
          {options.map((opt, i) => {
            const isSelected = selectedOption === opt;
            const reveal = state === "good" && isSelected;
            return (
              <button
                key={opt}
                onPointerDown={e => { e.preventDefault(); chooseOption(opt); }}
                disabled={state !== "answering"}
                className={`w-full text-left px-4 py-4 rounded-2xl font-bold text-base border-2 transition-all active:scale-[0.98] flex items-center gap-3
                  ${reveal ? "border-success bg-success/20" : isSelected ? "border-destructive bg-destructive/15" : "border-foreground/10 bg-card hover:border-foreground/30"}`}
                style={{ touchAction: "manipulation" }}
              >
                <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-foreground/10 font-mono text-sm flex items-center justify-center">
                  {String.fromCharCode(65 + i)}
                </span>
                <MathText text={opt} />
              </button>
            );
          })}
          {state === "answering" && (
            <button onClick={onSkip} className="text-sm text-muted-foreground py-2 hover:text-foreground">
              Je passe →
            </button>
          )}
        </div>
      )}

      {/* Saisie numérique */}
      {!isQcm && !showCorrection && (
        <>
          <div className="flex-shrink-0 px-4 max-w-2xl w-full mx-auto">
            <div
              className={`w-full bg-card border-2 rounded-2xl p-3 text-center font-mono text-3xl font-bold min-h-[3.75rem] transition-colors
                ${state === "good" ? "border-success text-success" : state === "wrong" ? "border-destructive text-destructive" : "border-primary/40"}`}
              aria-live="polite"
            >
              {input ? displayInput(input) : <span className="text-muted-foreground/50">?</span>}
            </div>
            <div className="flex justify-between items-center py-1.5">
              <span className="text-[11px] text-muted-foreground hidden sm:inline">Clavier : chiffres, « , », « / », « - », Entrée</span>
              <button onClick={onSkip} disabled={state !== "answering"} className="text-sm text-muted-foreground py-1 ml-auto hover:text-foreground disabled:opacity-0">
                Je passe →
              </button>
            </div>
          </div>
          <div className="flex-1 min-h-[220px] max-h-[440px] px-3 pad-safe-bottom max-w-2xl w-full mx-auto">
            <Keypad onKey={handleKey} disabled={state !== "answering"} className="h-full" />
          </div>
        </>
      )}

      <ConfirmDialog
        open={confirmQuit}
        title="Quitter la partie ?"
        message="Ta progression sur cette partie sera perdue."
        onConfirm={() => { setConfirmQuit(false); onQuit(); }}
        onCancel={() => setConfirmQuit(false)}
      />
    </div>
  );
};

export default QuizScreen;
