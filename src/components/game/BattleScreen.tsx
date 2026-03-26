import React, { useState, useCallback } from "react";
import { getDuelQuestion, checkAnswer } from "@/lib/questions";
import type { Question, Grade } from "@/lib/questions";

interface BattleScreenProps {
  grade: Grade;
  onBack: () => void;
}

const WINNING_SCORE = 5;
const WRONG_PENALTY = -2;
const PLAYER_COLORS = [
  "text-game-gold",
  "text-game-teal",
  "text-game-coral",
  "text-game-purple",
];

const BattleScreen: React.FC<BattleScreenProps> = ({ grade, onBack }) => {
  const [phase, setPhase] = useState<"register" | "play" | "end">("register");
  const [names, setNames] = useState(["", "", "", ""]);
  const [scores, setScores] = useState([0, 0, 0, 0]);
  const [question, setQuestion] = useState<Question>(() => getDuelQuestion(grade));
  const [inputs, setInputs] = useState(["", "", "", ""]);
  const [feedback, setFeedback] = useState(["", "", "", ""]);
  const [winner, setWinner] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);

  const handleRegister = () => {
    const filled = names.filter(n => n.trim());
    if (filled.length < 2) return;
    setPhase("play");
  };

  const handleKey = useCallback((player: number, key: string) => {
    if (locked) return;
    setInputs(prev => {
      const next = [...prev];
      if (key === "del") {
        next[player] = next[player].slice(0, -1);
      } else if (key === "±") {
        next[player] = next[player].startsWith("-") ? next[player].slice(1) : "-" + next[player];
      } else if (key === "," || key === ".") {
        if (!next[player].includes(".") && !next[player].includes(",")) next[player] += ".";
      } else {
        next[player] += key;
      }
      return next;
    });
  }, [locked]);

  const handleSubmit = useCallback((player: number) => {
    if (locked || !inputs[player].trim()) return;
    if (!names[player].trim()) return;

    if (checkAnswer(inputs[player], question.answer)) {
      setLocked(true);
      const newScores = [...scores];
      newScores[player] += 1;
      setScores(newScores);
      setFeedback(prev => {
        const next = [...prev];
        next[player] = "✅ +1";
        return next;
      });

      if (newScores[player] >= WINNING_SCORE) {
        setWinner(player);
        setPhase("end");
        return;
      }

      setTimeout(() => {
        setQuestion(getDuelQuestion(grade));
        setInputs(["", "", "", ""]);
        setFeedback(["", "", "", ""]);
        setLocked(false);
      }, 800);
    } else {
      const newScores = [...scores];
      newScores[player] = Math.max(0, newScores[player] + WRONG_PENALTY);
      setScores(newScores);
      setFeedback(prev => {
        const next = [...prev];
        next[player] = `❌ ${WRONG_PENALTY}`;
        return next;
      });
      setInputs(prev => {
        const next = [...prev];
        next[player] = "";
        return next;
      });
      setTimeout(() => {
        setFeedback(prev => {
          const next = [...prev];
          next[player] = "";
          return next;
        });
      }, 800);
    }
  }, [inputs, question, scores, locked, names, grade]);

  // Registration phase
  if (phase === "register") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 animate-fade-in">
        <h2 className="text-2xl font-black mb-1">⚔️ BATTLE MODE</h2>
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
        <p className="text-xs text-muted-foreground mb-4">⚠️ Mauvaise réponse = {WRONG_PENALTY} points</p>
        <button onClick={handleRegister}
          className="bg-primary text-primary-foreground font-black py-3 px-8 rounded-full active:scale-[0.97]">
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
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 animate-fade-in">
        <h2 className="text-3xl font-black mb-2">🏆 {names[winner]} gagne !</h2>
        <div className="space-y-2 mb-6">
          {names.map((name, i) => name.trim() && (
            <div key={i} className={`flex items-center gap-3 ${PLAYER_COLORS[i]}`}>
              <span className="font-black text-sm w-16">{name}</span>
              <span className="font-mono font-bold text-lg">{scores[i]} pts</span>
              {i === winner && <span>👑</span>}
            </div>
          ))}
        </div>
        <button onClick={onBack} className="bg-primary text-primary-foreground font-black py-3 px-8 rounded-full active:scale-[0.97]">
          🏠 RETOUR
        </button>
      </div>
    );
  }

  // Play phase — each player gets a mini section
  const activePlayers = names.map((n, i) => ({ name: n, index: i })).filter(p => p.name.trim());
  const keys = ["7","8","9","±","4","5","6",",","1","2","3","/","0",".","-","del"];

  return (
    <div className="min-h-screen flex flex-col p-2">
      {/* Question banner */}
      <div className="bg-card rounded-lg p-4 mb-3 text-center border border-foreground/10">
        <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest mb-1">{question.category}</p>
        <p className="font-mono text-xl font-black">{question.text} = ?</p>
      </div>

      {/* Player panels */}
      <div className={`grid gap-2 flex-1 ${activePlayers.length <= 2 ? "grid-cols-2" : "grid-cols-2 grid-rows-2"}`}>
        {activePlayers.map(({ name, index }) => (
          <div key={index} className="bg-card rounded-lg p-2 border border-foreground/5 flex flex-col">
            <div className="flex items-center justify-between mb-1">
              <span className={`font-black text-xs ${PLAYER_COLORS[index]}`}>{name}</span>
              <span className="font-mono text-xs font-bold">{scores[index]}pts</span>
            </div>
            {feedback[index] && (
              <div className="text-center font-bold text-sm mb-1 animate-fade-in">{feedback[index]}</div>
            )}
            <div className="font-mono text-base bg-foreground/5 rounded px-2 py-1.5 mb-1 text-center min-h-[28px]">
              {inputs[index] || "?"}
            </div>
            <div className="grid grid-cols-4 gap-0.5 flex-1">
              {keys.map(k => (
                <button key={k}
                  onClick={() => k === "del" ? handleKey(index, "del") : handleKey(index, k)}
                  className={`py-1.5 rounded text-xs font-mono font-bold active:scale-90 transition-all
                    ${k === "del" ? "bg-destructive/20 text-destructive" : "bg-foreground/5 text-foreground"}`}
                >
                  {k === "del" ? "⌫" : k}
                </button>
              ))}
            </div>
            <button onClick={() => handleSubmit(index)}
              className="mt-1 py-2 rounded-lg bg-game-mint text-background font-black text-xs active:scale-95">
              ✓ VALIDER
            </button>
          </div>
        ))}
      </div>

      <button onClick={onBack}
        className="mt-2 text-center text-xs text-muted-foreground hover:text-foreground py-2">
        Quitter la battle
      </button>
    </div>
  );
};

export default BattleScreen;
