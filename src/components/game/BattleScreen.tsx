import React, { useState, useCallback, useEffect, useRef } from "react";
import { getDuelQuestion, checkAnswer } from "@/lib/questions";
import type { Question, Grade } from "@/lib/questions";

interface BattleScreenProps {
  grade: Grade;
  onBack: () => void;
}

const WINNING_SCORE = 5;
const WRONG_PENALTY = -2;
const ANSWER_TIME = 10;
const PLAYER_COLORS = [
  "text-game-gold",
  "text-game-teal",
  "text-game-coral",
  "text-game-purple",
];
const PLAYER_BORDERS = [
  "border-game-gold/30",
  "border-game-teal/30",
  "border-game-coral/30",
  "border-game-purple/30",
];

const BattleScreen: React.FC<BattleScreenProps> = ({ grade, onBack }) => {
  const [phase, setPhase] = useState<"register" | "play" | "end">("register");
  const [names, setNames] = useState(["", "", "", ""]);
  const [scores, setScores] = useState([0, 0, 0, 0]);
  const [question, setQuestion] = useState<Question>(() => getDuelQuestion(grade));
  const [activePlayer, setActivePlayer] = useState<number | null>(null);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState<{ player: number; text: string } | null>(null);
  const [winner, setWinner] = useState<number | null>(null);
  const [questionNum, setQuestionNum] = useState(1);
  const [timer, setTimer] = useState(ANSWER_TIME);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const activePlayers = names.map((n, i) => ({ name: n, index: i })).filter(p => p.name.trim());

  // Timer logic: starts when a player buzzes in
  useEffect(() => {
    if (activePlayer !== null && !feedback) {
      setTimer(ANSWER_TIME);
      timerRef.current = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            // Time's up — penalize and reset
            clearInterval(timerRef.current!);
            timerRef.current = null;
            setScores(s => {
              const ns = [...s];
              ns[activePlayer] = Math.max(0, ns[activePlayer] + WRONG_PENALTY);
              return ns;
            });
            setFeedback({ player: activePlayer, text: `⏱️ Temps écoulé ! ${WRONG_PENALTY} pts` });
            setTimeout(() => {
              setInput("");
              setActivePlayer(null);
              setFeedback(null);
            }, 1200);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [activePlayer, feedback]);

  const handleRegister = () => {
    if (activePlayers.length < 2) return;
    setPhase("play");
  };

  const selectPlayer = (index: number) => {
    if (feedback) return;
    setActivePlayer(index);
    setInput("");
  };

  const handleKey = useCallback((key: string) => {
    if (activePlayer === null || feedback) return;
    if (key === "del") {
      setInput(prev => prev.slice(0, -1));
    } else if (key === "±") {
      setInput(prev => prev.startsWith("-") ? prev.slice(1) : "-" + prev);
    } else if (key === "," || key === ".") {
      if (!input.includes(".") && !input.includes(",")) setInput(prev => prev + ".");
    } else {
      setInput(prev => prev + key);
    }
  }, [activePlayer, input, feedback]);

  const handleSubmit = useCallback(() => {
    if (activePlayer === null || !input.trim() || feedback) return;

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (checkAnswer(input, question.answer)) {
      const newScores = [...scores];
      newScores[activePlayer] += 1;
      setScores(newScores);
      setFeedback({ player: activePlayer, text: `✅ ${names[activePlayer]} +1 point !` });

      if (newScores[activePlayer] >= WINNING_SCORE) {
        setTimeout(() => {
          setWinner(activePlayer);
          setPhase("end");
        }, 1000);
        return;
      }

      setTimeout(() => {
        setQuestion(getDuelQuestion(grade));
        setInput("");
        setActivePlayer(null);
        setFeedback(null);
        setQuestionNum(q => q + 1);
      }, 1200);
    } else {
      const newScores = [...scores];
      newScores[activePlayer] = Math.max(0, newScores[activePlayer] + WRONG_PENALTY);
      setScores(newScores);
      setFeedback({ player: activePlayer, text: `❌ ${names[activePlayer]} ${WRONG_PENALTY} pts` });
      setTimeout(() => {
        setInput("");
        setActivePlayer(null);
        setFeedback(null);
      }, 1200);
    }
  }, [activePlayer, input, question, scores, names, grade, feedback]);

  // Registration phase
  if (phase === "register") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 animate-fade-in">
        <h2 className="text-2xl font-black mb-1">🏟️ BATTLE MODE</h2>
        <p className="text-sm text-muted-foreground mb-6">2 à 4 joueurs · Premier à {WINNING_SCORE} points</p>
        <div className="space-y-3 w-full max-w-xs mb-6">
          {names.map((name, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className={`font-black text-sm ${PLAYER_COLORS[i]}`}>J{i + 1}</span>
              <input
                type="text"
                value={name}
                onChange={e => setNames(prev => { const n = [...prev]; n[i] = e.target.value; return n; })}
                placeholder={i < 2 ? `Joueur ${i + 1} (requis)` : `Joueur ${i + 1} (optionnel)`}
                className="flex-1 bg-card border border-foreground/10 rounded-lg px-3 py-2.5 text-sm font-bold
                  text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary/40"
              />
            </div>
          ))}
        </div>
        <div className="bg-accent/10 rounded-lg p-3 mb-4 text-xs text-center max-w-xs">
          <p className="font-bold mb-1">📋 Règles</p>
          <p>✅ Bonne réponse = <strong>+1 pt</strong></p>
          <p>❌ Mauvaise réponse = <strong>{WRONG_PENALTY} pts</strong></p>
          <p>⏱️ Chrono de <strong>{ANSWER_TIME}s</strong> pour répondre</p>
          <p>🏆 Premier à <strong>{WINNING_SCORE} pts</strong> gagne</p>
          <p className="mt-1 text-muted-foreground">Appuyez sur votre nom pour buzzer !</p>
        </div>
        <button onClick={handleRegister}
          className="bg-primary text-primary-foreground font-black py-3 px-8 rounded-full active:scale-[0.97]
            disabled:opacity-40"
          disabled={activePlayers.length < 2}>
          🚀 LANCER LA BATTLE
        </button>
        <button onClick={onBack} className="mt-3 text-sm text-muted-foreground hover:text-foreground">
          ← Retour
        </button>
      </div>
    );
  }

  // End phase
  if (phase === "end" && winner !== null) {
    const sorted = [...activePlayers].sort((a, b) => scores[b.index] - scores[a.index]);
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 animate-fade-in">
        <h2 className="text-3xl font-black mb-4">🏆 {names[winner]} gagne !</h2>
        <div className="space-y-3 mb-6 w-full max-w-xs">
          {sorted.map((p, rank) => (
            <div key={p.index} className={`flex items-center gap-3 p-3 rounded-lg bg-card border ${PLAYER_BORDERS[p.index]}`}>
              <span className="text-xl font-black">{rank === 0 ? "🥇" : rank === 1 ? "🥈" : rank === 2 ? "🥉" : "4."}</span>
              <span className={`font-black text-sm flex-1 ${PLAYER_COLORS[p.index]}`}>{p.name}</span>
              <span className="font-mono font-bold text-lg">{scores[p.index]} pts</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mb-4">{questionNum} questions jouées</p>
        <button onClick={onBack} className="bg-primary text-primary-foreground font-black py-3 px-8 rounded-full active:scale-[0.97]">
          🏠 RETOUR
        </button>
      </div>
    );
  }

  // Play phase — buzzer style
  const keys = [
    { l: "7" }, { l: "8" }, { l: "9" }, { l: "±" },
    { l: "4" }, { l: "5" }, { l: "6" }, { l: "," },
    { l: "1" }, { l: "2" }, { l: "3" }, { l: "." },
    { l: "0" }, { l: "00" }, { l: "/" }, { l: "-" },
  ];

  return (
    <div className="min-h-screen flex flex-col p-3">
      {/* Scores */}
      <div className="flex gap-2 mb-3">
        {activePlayers.map(({ name, index }) => (
          <div key={index} className={`flex-1 text-center py-2 rounded-lg bg-card border ${PLAYER_BORDERS[index]}`}>
            <p className={`text-xs font-black ${PLAYER_COLORS[index]}`}>{name}</p>
            <p className="font-mono font-bold text-lg">{scores[index]}</p>
          </div>
        ))}
      </div>

      {/* Question */}
      <div className="bg-card rounded-lg p-4 mb-3 text-center border border-foreground/10">
        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-1">
          Q{questionNum} · {question.category}
        </p>
        <p className="font-mono text-xl font-black">{question.text} = ?</p>
      </div>

      {/* Feedback */}
      {feedback && (
        <div className="text-center font-black text-lg mb-3 animate-fade-in">
          {feedback.text}
        </div>
      )}

      {/* Buzzer: select who answers */}
      {activePlayer === null && !feedback && (
        <div className="mb-3">
          <p className="text-center text-xs text-muted-foreground mb-2 font-bold uppercase tracking-widest">
            🔔 Qui veut répondre ?
          </p>
          <div className="grid grid-cols-2 gap-2">
            {activePlayers.map(({ name, index }) => (
              <button key={index} onClick={() => selectPlayer(index)}
                className={`py-4 rounded-xl font-black text-sm border-2 ${PLAYER_BORDERS[index]}
                  bg-card transition-all active:scale-95 hover:border-primary/50`}>
                <span className={PLAYER_COLORS[index]}>{name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Active player input */}
      {activePlayer !== null && !feedback && (
        <div className="animate-fade-in">
          <div className="flex items-center justify-between mb-2">
            <p className={`text-sm font-black ${PLAYER_COLORS[activePlayer]}`}>
              {names[activePlayer]} répond...
            </p>
            <div className={`font-mono font-black text-lg px-3 py-1 rounded-lg
              ${timer <= 3 ? "bg-destructive/20 text-destructive animate-pulse" : "bg-foreground/5 text-foreground"}`}>
              {timer}s
            </div>
          </div>
          <div className="font-mono text-2xl bg-foreground/5 rounded-xl px-4 py-3 mb-3 text-center font-bold">
            {input || "?"}
          </div>
          <div className="grid grid-cols-4 gap-1.5 mb-2" style={{ touchAction: "manipulation" }}>
            {keys.map((k, i) => (
              <button key={i}
                onPointerDown={(e) => { e.preventDefault(); handleKey(k.l); }}
                className="py-3 rounded-lg bg-foreground/5 font-mono font-bold text-base
                  text-foreground active:scale-90 transition-all select-none"
                style={{ touchAction: "manipulation" }}>
                {k.l}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-1.5" style={{ touchAction: "manipulation" }}>
            <button
              onPointerDown={(e) => { e.preventDefault(); handleKey("del"); }}
              className="py-3 rounded-lg bg-destructive/20 text-destructive font-mono font-bold select-none"
              style={{ touchAction: "manipulation" }}>
              ⌫
            </button>
            <button
              onPointerDown={(e) => { e.preventDefault(); handleSubmit(); }}
              className="py-3 rounded-lg bg-game-mint text-background font-black text-sm col-span-2 active:scale-[0.97] select-none"
              style={{ touchAction: "manipulation" }}>
              ✓ VALIDER
            </button>
          </div>
        </div>
      )}

      <button onClick={onBack}
        className="mt-auto pt-3 text-center text-xs text-muted-foreground hover:text-foreground py-2">
        Quitter la battle
      </button>
    </div>
  );
};

export default BattleScreen;
