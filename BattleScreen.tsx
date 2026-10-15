import React, { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { createQuestionDeck, checkAnswer, seededShuffle } from "@/lib/questions";
import type { Question, Grade, ThemeId } from "@/lib/questions";
import Keypad, { applyKey, displayInput, usePhysicalKeyboard } from "./Keypad";
import type { PadKey } from "./Keypad";
import ConfirmDialog from "./ConfirmDialog";
import Confetti from "./Confetti";
import { MathText, formatAnswer, withPrompt } from "./MathText";
import { play } from "@/lib/sound";

interface BattleScreenProps {
  grade: Grade;
  themeId: ThemeId;
  onBack: () => void;
}

const WINNING_SCORE = 5;
const WRONG_PENALTY = 1;
const ANSWER_TIME = 10;
const COLORS = ["var(--game-gold)", "var(--game-teal)", "var(--game-coral)", "var(--game-purple)"];
const AVATARS = ["🦊", "🐼", "🐙", "🦉"];

type Phase = "register" | "countdown" | "play" | "end";

const BattleScreen: React.FC<BattleScreenProps> = ({ grade, themeId, onBack }) => {
  const nextQuestion = useMemo(() => createQuestionDeck(grade, themeId), [grade, themeId]);
  const [phase, setPhase] = useState<Phase>("register");
  const [names, setNames] = useState(["", "", "", ""]);
  const [scores, setScores] = useState([0, 0, 0, 0]);
  const [question, setQuestion] = useState<Question>(() => nextQuestion());
  const [activePlayer, setActivePlayer] = useState<number | null>(null);
  const [tried, setTried] = useState<number[]>([]);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState<{ text: string; good: boolean } | null>(null);
  const [questionNum, setQuestionNum] = useState(1);
  const [timer, setTimer] = useState(ANSWER_TIME);
  const [count, setCount] = useState(3);
  const [confirmQuit, setConfirmQuit] = useState(false);
  const [fire, setFire] = useState(0);
  const busy = useRef(false);

  const players = names.map((n, i) => ({ name: n.trim(), index: i })).filter(p => p.name);
  const isQcm = !!question.options?.length;
  const options = useMemo(() => (isQcm ? seededShuffle(question.options!, question.text) : []), [isQcm, question]);
  const color = (i: number, a = 1) => `hsl(${COLORS[i]} / ${a})`;

  // Compte à rebours
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

  const newQuestion = useCallback(() => {
    setQuestion(nextQuestion());
    setQuestionNum(q => q + 1);
    setTried([]);
    setInput("");
    setActivePlayer(null);
    setFeedback(null);
    busy.current = false;
  }, [nextQuestion]);

  const handleWrong = useCallback((player: number, reason: string) => {
    busy.current = true;
    play("wrong");
    setScores(s => { const n = [...s]; n[player] = Math.max(0, n[player] - WRONG_PENALTY); return n; });
    const nowTried = [...tried, player];
    setTried(nowTried);
    const everyoneTried = players.every(p => nowTried.includes(p.index));
    setFeedback({ text: `${reason} ${names[player]} −${WRONG_PENALTY}${everyoneTried ? ` · Réponse : ${formatAnswer(question.answer, isQcm)}` : ""}`, good: false });
    window.setTimeout(() => {
      if (everyoneTried) newQuestion();
      else {
        setInput("");
        setActivePlayer(null);
        setFeedback(null);
        busy.current = false;
      }
    }, everyoneTried ? 2200 : 1200);
  }, [tried, players, names, question.answer, isQcm, newQuestion]);

  // Chrono de réponse du joueur qui a buzzé
  useEffect(() => {
    if (phase !== "play" || activePlayer === null || feedback || confirmQuit) return;
    if (timer <= 0) { handleWrong(activePlayer, "⏱ Temps écoulé !"); return; }
    if (timer <= 3) play("tick");
    const t = window.setTimeout(() => setTimer(s => s - 1), 1000);
    return () => window.clearTimeout(t);
  }, [phase, activePlayer, feedback, timer, confirmQuit, handleWrong]);

  const buzz = (index: number) => {
    if (busy.current || activePlayer !== null || tried.includes(index) || phase !== "play") return;
    play("tap");
    setActivePlayer(index);
    setTimer(ANSWER_TIME);
    setInput("");
  };

  const submit = useCallback((value: string) => {
    if (activePlayer === null || busy.current || !value.trim()) return;
    if (checkAnswer(value, question.answer, isQcm)) {
      busy.current = true;
      play("correct");
      const ns = [...scores];
      ns[activePlayer] += 1;
      setScores(ns);
      setFeedback({ text: `✅ ${names[activePlayer]} +1 point !`, good: true });
      if (ns[activePlayer] >= WINNING_SCORE) {
        window.setTimeout(() => { setPhase("end"); setFire(f => f + 1); play("win"); }, 1200);
      } else {
        window.setTimeout(newQuestion, 1300);
      }
    } else {
      handleWrong(activePlayer, "❌");
    }
  }, [activePlayer, question.answer, isQcm, scores, names, newQuestion, handleWrong]);

  const onKey = useCallback((key: PadKey) => {
    if (activePlayer === null || busy.current || isQcm) return;
    if (key === "ok") submit(input);
    else setInput(prev => applyKey(prev, key));
  }, [activePlayer, isQcm, submit, input]);

  usePhysicalKeyboard(phase === "play" && !confirmQuit, onKey);

  const start = () => {
    setScores([0, 0, 0, 0]);
    setQuestion(nextQuestion());
    setQuestionNum(1);
    setTried([]);
    setActivePlayer(null);
    setFeedback(null);
    setInput("");
    busy.current = false;
    setCount(3);
    setPhase("countdown");
  };

  // ─── Inscription ─────────────────────────────────────────
  if (phase === "register") {
    return (
      <div className="fixed inset-0 z-50 bg-background overflow-y-auto">
        <div className="min-h-full flex flex-col items-center justify-center p-6 animate-fade-in max-w-md mx-auto">
          <p className="text-5xl mb-2">🏟️</p>
          <h2 className="font-display text-3xl font-bold mb-1">Battle</h2>
          <p className="text-sm text-muted-foreground mb-6">2 à 4 joueurs · premier à {WINNING_SCORE} points</p>
          <div className="space-y-2.5 w-full mb-5">
            {names.map((name, i) => (
              <label key={i} className="flex items-center gap-3 bg-card rounded-2xl px-3 py-2 border-2" style={{ borderColor: color(i, 0.4) }}>
                <span className="text-2xl">{AVATARS[i]}</span>
                <input
                  type="text"
                  value={name}
                  maxLength={12}
                  onChange={e => setNames(prev => { const n = [...prev]; n[i] = e.target.value; return n; })}
                  placeholder={i < 2 ? `Joueur ${i + 1} (obligatoire)` : `Joueur ${i + 1} (facultatif)`}
                  className="flex-1 bg-transparent py-2 text-base font-bold text-foreground placeholder:text-muted-foreground/60 outline-none"
                />
              </label>
            ))}
          </div>
          <div className="bg-foreground/[0.05] rounded-2xl p-4 mb-5 text-sm w-full space-y-1">
            <p className="font-bold mb-1">📋 Règles</p>
            <p>🔔 Appuie sur ton nom pour buzzer, puis réponds.</p>
            <p>✅ Bonne réponse : <strong>+1 point</strong> · ❌ Erreur : <strong>−{WRONG_PENALTY} point</strong></p>
            <p>⏱ <strong>{ANSWER_TIME} s</strong> pour répondre après avoir buzzé.</p>
            <p>🏆 Premier à <strong>{WINNING_SCORE} points</strong>.</p>
          </div>
          <button
            onClick={start}
            disabled={players.length < 2}
            className="w-full bg-primary text-primary-foreground font-display font-bold text-lg py-4 rounded-2xl active:scale-[0.97] disabled:opacity-40 shadow-glow"
          >
            🚀 Lancer la battle
          </button>
          <button onClick={onBack} className="mt-3 text-sm font-bold text-muted-foreground hover:text-foreground py-2">← Retour</button>
        </div>
      </div>
    );
  }

  // ─── Podium ──────────────────────────────────────────────
  if (phase === "end") {
    const ranking = [...players].sort((a, b) => scores[b.index] - scores[a.index]);
    return (
      <div className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center p-6 animate-fade-in">
        <Confetti fireKey={fire} />
        <p className="text-6xl mb-2">🏆</p>
        <h2 className="font-display text-3xl font-bold mb-5">{ranking[0].name} gagne !</h2>
        <div className="space-y-2 mb-6 w-full max-w-sm">
          {ranking.map((p, rank) => (
            <div key={p.index} className="flex items-center gap-3 p-3 rounded-2xl bg-card border-2" style={{ borderColor: color(p.index, 0.5) }}>
              <span className="text-2xl">{["🥇", "🥈", "🥉", "4."][rank]}</span>
              <span className="text-xl">{AVATARS[p.index]}</span>
              <span className="font-bold flex-1" style={{ color: color(p.index) }}>{p.name}</span>
              <span className="font-mono font-black text-xl">{scores[p.index]}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mb-4">{questionNum} questions jouées</p>
        <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
          <button onClick={start} className="bg-primary text-primary-foreground font-display font-bold py-4 rounded-2xl active:scale-[0.97] shadow-glow">🔁 Revanche</button>
          <button onClick={onBack} className="bg-card border-2 border-foreground/15 font-display font-bold py-4 rounded-2xl active:scale-[0.97]">🏠 Menu</button>
        </div>
      </div>
    );
  }

  // ─── Jeu ─────────────────────────────────────────────────
  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col p-3 gap-3 select-none" style={{ touchAction: "manipulation" }}>
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={() => setConfirmQuit(true)}
          className="bg-card border-2 border-foreground/15 font-black text-sm rounded-full px-4 py-2 active:scale-95"
        >
          <span className="text-destructive">✕</span> Quitter
        </button>
        <div className="flex-1 flex gap-1.5">
          {players.map(({ name, index }) => (
            <div key={index} className="flex-1 text-center py-1 rounded-xl bg-card border-2 min-w-0" style={{ borderColor: color(index, activePlayer === index ? 1 : 0.35) }}>
              <p className="text-[11px] font-black truncate px-1" style={{ color: color(index) }}>{AVATARS[index]} {name}</p>
              <p className="font-mono font-black text-lg leading-tight">{scores[index]}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="glass rounded-2xl p-4 text-center border border-foreground/10 flex-shrink-0">
        <p className="text-[11px] text-muted-foreground font-bold uppercase tracking-widest mb-1">Question {questionNum} · {question.category}</p>
        <p className="font-display text-[length:clamp(1.3rem,4.5vw,2rem)] font-semibold leading-tight"><MathText text={withPrompt(question.text, isQcm)} /></p>
      </div>

      {feedback && (
        <div className={`text-center font-black text-lg animate-pop-in flex-shrink-0 ${feedback.good ? "text-success" : "text-destructive"}`}>
          <MathText text={feedback.text} />
        </div>
      )}

      {/* Buzzers */}
      {activePlayer === null && !feedback && (
        <div className={`flex-1 grid gap-3 ${players.length > 2 ? "grid-cols-2 grid-rows-2" : "grid-cols-1 sm:grid-cols-2"}`}>
          {players.map(({ name, index }) => {
            const out = tried.includes(index);
            return (
              <button
                key={index}
                disabled={out}
                onPointerDown={e => { e.preventDefault(); buzz(index); }}
                className="rounded-3xl font-display font-bold text-2xl border-4 active:scale-95 transition-all disabled:opacity-25 flex flex-col items-center justify-center gap-1"
                style={{ borderColor: color(index), background: color(index, 0.12), color: color(index), touchAction: "manipulation" }}
              >
                <span className="text-4xl">{AVATARS[index]}</span>
                {name}
                <span className="text-xs font-nunito font-bold opacity-80">{out ? "a déjà répondu" : "🔔 BUZZ"}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Réponse du joueur actif */}
      {activePlayer !== null && !feedback && (
        <div className="flex-1 min-h-0 flex flex-col gap-2 animate-fade-in max-w-xl w-full mx-auto">
          <div className="flex items-center justify-between flex-shrink-0">
            <p className="font-display font-bold text-lg" style={{ color: color(activePlayer) }}>{AVATARS[activePlayer]} {names[activePlayer]} répond…</p>
            <span className={`font-mono font-black text-xl px-3 py-1 rounded-xl ${timer <= 3 ? "bg-destructive/20 text-destructive animate-pulse" : "bg-card"}`}>{timer}s</span>
          </div>
          {isQcm ? (
            <div className="flex-1 grid gap-2">
              {options.map((opt, i) => (
                <button
                  key={opt}
                  onPointerDown={e => { e.preventDefault(); submit(opt); }}
                  className="rounded-2xl bg-card border-2 border-foreground/10 font-bold text-lg px-4 text-left active:scale-[0.98] hover:border-primary/50"
                  style={{ touchAction: "manipulation" }}
                >
                  <span className="font-mono text-muted-foreground mr-2">{String.fromCharCode(65 + i)}.</span><MathText text={opt} />
                </button>
              ))}
            </div>
          ) : (
            <>
              <div className="font-mono text-3xl bg-card border-2 rounded-2xl py-2 text-center font-bold flex-shrink-0" style={{ borderColor: color(activePlayer) }}>
                {input ? displayInput(input) : <span className="text-muted-foreground/40">?</span>}
              </div>
              <Keypad onKey={onKey} size="md" className="flex-1 min-h-[200px]" />
            </>
          )}
        </div>
      )}

      {phase === "countdown" && (
        <div className="fixed inset-0 z-[80] bg-background/85 backdrop-blur-sm flex items-center justify-center">
          <span key={count} className="font-display text-[28vmin] font-bold text-gradient animate-countdown">{count > 0 ? count : "GO"}</span>
        </div>
      )}

      <ConfirmDialog
        open={confirmQuit}
        title="Quitter la battle ?"
        message="Les scores de cette partie seront perdus."
        onConfirm={() => { setConfirmQuit(false); onBack(); }}
        onCancel={() => setConfirmQuit(false)}
      />
    </div>
  );
};

export default BattleScreen;
