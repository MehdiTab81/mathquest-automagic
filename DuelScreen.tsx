import React, { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { createQuestionDeck, checkAnswer, seededShuffle } from "@/lib/questions";
import type { Question, Grade, ThemeId } from "@/lib/questions";
import Keypad, { applyKey, displayInput } from "./Keypad";
import type { PadKey } from "./Keypad";
import ConfirmDialog from "./ConfirmDialog";
import Confetti from "./Confetti";
import { MathText, formatAnswer, withPrompt } from "./MathText";
import { play } from "@/lib/sound";

interface DuelScreenProps {
  grade: Grade;
  themeId: ThemeId;
  onBack: () => void;
}

const ROUNDS = 10;
const ROUND_TIME = 25; // secondes avant de révéler la réponse
const LOCKOUT_MS = 1200; // pénalité après une mauvaise réponse
const PLAYER_HUE = ["hsl(var(--primary))", "hsl(var(--secondary))"];

type Phase = "countdown" | "play" | "end";

const DuelScreen: React.FC<DuelScreenProps> = ({ grade, themeId, onBack }) => {
  const nextQuestion = useMemo(() => createQuestionDeck(grade, themeId), [grade, themeId]);
  const [phase, setPhase] = useState<Phase>("countdown");
  const [count, setCount] = useState(3);
  const [question, setQuestion] = useState<Question>(() => nextQuestion());
  const [round, setRound] = useState(1);
  const [scores, setScores] = useState([0, 0]);
  const [inputs, setInputs] = useState(["", ""]);
  const [locked, setLocked] = useState([false, false]);
  const [shake, setShake] = useState([false, false]);
  const [winnerOfRound, setWinnerOfRound] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(ROUND_TIME);
  const [confirmQuit, setConfirmQuit] = useState(false);
  const [fire, setFire] = useState(0);
  const roundOver = useRef(false);

  const isQcm = !!question.options?.length;
  const options = useMemo(() => (isQcm ? seededShuffle(question.options!, question.text) : []), [isQcm, question]);

  // Compte à rebours 3-2-1
  useEffect(() => {
    if (phase !== "countdown") return;
    if (count === 0) {
      play("go");
      const t = window.setTimeout(() => setPhase("play"), 500);
      return () => window.clearTimeout(t);
    }
    play("tick");
    const t = window.setTimeout(() => setCount(c => c - 1), 800);
    return () => window.clearTimeout(t);
  }, [phase, count]);

  const goNext = useCallback(() => {
    window.setTimeout(() => {
      if (round >= ROUNDS) {
        setPhase("end");
        setFire(f => f + 1);
        play("win");
        return;
      }
      setRound(r => r + 1);
      setQuestion(nextQuestion());
      setInputs(["", ""]);
      setLocked([false, false]);
      setWinnerOfRound(null);
      setRevealed(false);
      setTimeLeft(ROUND_TIME);
      roundOver.current = false;
    }, 1400);
  }, [round, nextQuestion]);

  // Chrono de la manche : au bout du temps, on révèle la réponse
  useEffect(() => {
    if (phase !== "play" || confirmQuit || roundOver.current) return;
    if (timeLeft <= 0) {
      roundOver.current = true;
      setRevealed(true);
      play("wrong");
      goNext();
      return;
    }
    const t = window.setTimeout(() => setTimeLeft(s => s - 1), 1000);
    return () => window.clearTimeout(t);
  }, [phase, timeLeft, confirmQuit, goNext]);

  const tryAnswer = useCallback((player: number, value: string) => {
    if (phase !== "play" || roundOver.current || locked[player] || !value.trim()) return;
    if (checkAnswer(value, question.answer, isQcm)) {
      roundOver.current = true;
      const ns = [...scores];
      ns[player] += 1;
      setScores(ns);
      setWinnerOfRound(player);
      play("correct");
      goNext();
    } else {
      play("wrong");
      setShake(s => { const n = [...s]; n[player] = true; return n; });
      setLocked(l => { const n = [...l]; n[player] = true; return n; });
      setInputs(i => { const n = [...i]; n[player] = ""; return n; });
      window.setTimeout(() => {
        setShake(s => { const n = [...s]; n[player] = false; return n; });
        setLocked(l => { const n = [...l]; n[player] = false; return n; });
      }, LOCKOUT_MS);
    }
  }, [phase, locked, question.answer, isQcm, scores, goNext]);

  const onKey = useCallback((player: number, key: PadKey) => {
    if (key === "ok") { tryAnswer(player, inputs[player]); return; }
    if (roundOver.current || locked[player]) return;
    setInputs(prev => { const n = [...prev]; n[player] = applyKey(n[player], key); return n; });
  }, [tryAnswer, inputs, locked]);

  const restart = () => {
    setScores([0, 0]);
    setRound(1);
    setQuestion(nextQuestion());
    setInputs(["", ""]);
    setLocked([false, false]);
    setWinnerOfRound(null);
    setRevealed(false);
    setTimeLeft(ROUND_TIME);
    roundOver.current = false;
    setCount(3);
    setPhase("countdown");
  };

  // ─── Fin de partie ───────────────────────────────────────
  if (phase === "end") {
    const tie = scores[0] === scores[1];
    const w = scores[0] > scores[1] ? 0 : 1;
    return (
      <div className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center p-6 text-center animate-fade-in">
        <Confetti fireKey={fire} />
        <p className="text-6xl mb-3">{tie ? "🤝" : "🏆"}</p>
        <h2 className="font-display text-3xl font-bold mb-2">{tie ? "Égalité !" : `Joueur ${w + 1} gagne !`}</h2>
        <p className="font-mono text-4xl font-black mb-8">
          <span style={{ color: PLAYER_HUE[0] }}>{scores[0]}</span> — <span style={{ color: PLAYER_HUE[1] }}>{scores[1]}</span>
        </p>
        <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
          <button onClick={restart} className="bg-primary text-primary-foreground font-display font-bold py-4 rounded-2xl active:scale-[0.97] shadow-glow">⚔️ Revanche</button>
          <button onClick={onBack} className="bg-card border-2 border-foreground/15 font-display font-bold py-4 rounded-2xl active:scale-[0.97]">🏠 Menu</button>
        </div>
      </div>
    );
  }

  // ─── Une moitié d'écran par joueur ───────────────────────
  const zone = (player: number) => {
    const won = winnerOfRound === player;
    const lost = winnerOfRound !== null && !won;
    const color = PLAYER_HUE[player];
    return (
      <div
        className={`flex-1 min-h-0 flex flex-col px-3 pt-2 pb-2 transition-colors duration-300 ${player === 1 ? "rotate-180" : ""}
          ${won ? "bg-success/15" : ""} ${shake[player] ? "animate-shake" : ""}`}
        style={{ touchAction: "manipulation" }}
      >
        <div className="flex items-center justify-between mb-1 flex-shrink-0">
          <span className="font-display font-bold text-base" style={{ color }}>Joueur {player + 1}</span>
          <span className="font-mono font-black text-2xl" style={{ color }}>{scores[player]}</span>
        </div>
        <div className="text-center flex-shrink-0 mb-1.5">
          <p className="font-display font-semibold text-[length:clamp(1.05rem,3.2vh,1.7rem)] leading-tight">
            <MathText text={withPrompt(question.text, isQcm)} />
          </p>
        </div>
        {won && <p className="text-center font-black text-success text-lg animate-pop-in">✅ Bravo, +1 point !</p>}
        {lost && <p className="text-center font-bold text-muted-foreground text-sm">Trop tard… réponse : <MathText text={formatAnswer(question.answer, isQcm)} /></p>}
        {revealed && winnerOfRound === null && (
          <p className="text-center font-bold text-sm">⏱ Réponse : <span className="text-success"><MathText text={formatAnswer(question.answer, isQcm)} /></span></p>
        )}
        {!roundOver.current && (isQcm ? (
          <div className="flex-1 min-h-0 grid grid-cols-2 gap-1.5">
            {options.map((opt, i) => (
              <button
                key={opt}
                disabled={locked[player]}
                onPointerDown={e => { e.preventDefault(); tryAnswer(player, opt); }}
                className="rounded-xl bg-foreground/[0.07] font-bold text-[length:clamp(0.85rem,2.4vh,1.15rem)] px-2 leading-tight active:scale-95 disabled:opacity-40 border-2 border-transparent hover:border-primary/40"
                style={{ touchAction: "manipulation" }}
              >
                <span className="text-muted-foreground font-mono mr-1">{String.fromCharCode(65 + i)}.</span><MathText text={opt} />
              </button>
            ))}
          </div>
        ) : (
          <>
            <div className="flex-shrink-0 font-mono text-[length:clamp(1.2rem,3.5vh,1.9rem)] font-bold text-center bg-card border-2 rounded-xl py-1 mb-1.5" style={{ borderColor: color }}>
              {inputs[player] ? displayInput(inputs[player]) : <span className="text-muted-foreground/40">?</span>}
            </div>
            <Keypad onKey={k => onKey(player, k)} size="md" disabled={locked[player]} className="flex-1 min-h-0" />
          </>
        ))}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col overflow-hidden select-none bg-background" style={{ touchAction: "manipulation" }}>
      {zone(1)}

      {/* Barre centrale : manche, chrono, quitter */}
      <div className="relative flex-shrink-0 h-14 flex items-center justify-between gap-3 px-3 bg-card/90 border-y border-foreground/10">
        <span className="font-mono text-xs font-bold text-muted-foreground w-20 whitespace-nowrap">Manche {round}/{ROUNDS}</span>
        <button
          onClick={() => setConfirmQuit(true)}
          className="bg-destructive text-destructive-foreground font-black text-sm rounded-full px-6 py-2.5 shadow-lg active:scale-95 transition-transform"
        >
          ✕ Quitter
        </button>
        <span className={`font-mono text-sm font-black w-20 text-right whitespace-nowrap ${timeLeft <= 5 ? "text-destructive animate-pulse" : "text-muted-foreground"}`}>⏱ {timeLeft}s</span>
        <div className="absolute left-0 bottom-0 h-1 bg-primary transition-all duration-1000 ease-linear" style={{ width: `${(timeLeft / ROUND_TIME) * 100}%` }} />
      </div>

      {zone(0)}

      {phase === "countdown" && (
        <div className="fixed inset-0 z-[80] bg-background/85 backdrop-blur-sm flex items-center justify-center">
          <span key={count} className="font-display text-[28vmin] font-bold text-gradient animate-countdown">{count > 0 ? count : "GO"}</span>
        </div>
      )}

      <ConfirmDialog
        open={confirmQuit}
        title="Quitter le duel ?"
        message="La partie en cours sera perdue."
        onConfirm={() => { setConfirmQuit(false); onBack(); }}
        onCancel={() => setConfirmQuit(false)}
      />
    </div>
  );
};

export default DuelScreen;
