import React, { useState, useCallback, useRef } from "react";
import { getDuelQuestion, checkAnswer } from "@/lib/questions";
import type { Question, Grade } from "@/lib/questions";

interface DuelScreenProps {
  grade: Grade;
  onBack: () => void;
}

const DuelScreen: React.FC<DuelScreenProps> = ({ grade, onBack }) => {
  const [scores, setScores] = useState([0, 0]);
  const [question, setQuestion] = useState<Question>(() => getDuelQuestion(grade));
  const [inputs, setInputs] = useState(["", ""]);
  const [winner, setWinner] = useState<number | null>(null);
  const [round, setRound] = useState(1);
  const [feedback, setFeedback] = useState<[string, string]>(["", ""]);
  const lockedRef = useRef(false);
  const maxRounds = 10;

  const handleKey = useCallback((player: number, key: string) => {
    if (winner !== null || lockedRef.current) return;
    setInputs(prev => {
      const next = [...prev];
      if (key === "del") {
        next[player] = next[player].slice(0, -1);
      } else if (key === "±") {
        next[player] = next[player].startsWith("-") ? next[player].slice(1) : "-" + next[player];
      } else if (key === "," || key === ".") {
        if (!next[player].includes(".") && !next[player].includes(",")) {
          next[player] = next[player] + ".";
        }
      } else {
        next[player] = next[player] + key;
      }
      return next;
    });
  }, [winner]);

  const handleSubmit = useCallback((player: number) => {
    if (lockedRef.current || winner !== null) return;
    // Read current input from state synchronously via updater
    setInputs(prevInputs => {
      if (!prevInputs[player].trim()) return prevInputs;

      if (checkAnswer(prevInputs[player], question.answer)) {
        lockedRef.current = true;
        setScores(prev => {
          const newScores = [...prev];
          newScores[player]++;
          setTimeout(() => {
            if (round >= maxRounds) {
              setWinner(newScores[0] >= newScores[1] ? 0 : 1);
            } else {
              setRound(r => r + 1);
              setQuestion(getDuelQuestion(grade));
              setInputs(["", ""]);
              setFeedback(["", ""]);
              lockedRef.current = false;
            }
          }, 600);
          return newScores;
        });
        setFeedback(prev => {
          const next = [...prev] as [string, string];
          next[player] = "✅";
          return next;
        });
      } else {
        setFeedback(prev => {
          const next = [...prev] as [string, string];
          next[player] = "❌";
          return next;
        });
        const cleared = [...prevInputs];
        cleared[player] = "";
        setTimeout(() => {
          setFeedback(prev => {
            const next = [...prev] as [string, string];
            next[player] = "";
            return next;
          });
        }, 800);
        return cleared;
      }
      return prevInputs;
    });
  }, [question, round, winner, grade]);

  if (winner !== null) {
    const tie = scores[0] === scores[1];
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 animate-fade-in">
        <h2 className="text-3xl font-black mb-4">
          {tie ? "🤝 Égalité !" : `🏆 Joueur ${winner + 1} gagne !`}
        </h2>
        <p className="font-mono text-xl mb-6">{scores[0]} — {scores[1]}</p>
        <button onClick={onBack} className="bg-primary text-primary-foreground font-black py-4 px-8 rounded-full active:scale-[0.97]">
          🏠 RETOUR
        </button>
      </div>
    );
  }

  const MiniKeypad = ({ player }: { player: number }) => (
    <div className="grid grid-cols-4 gap-1 w-full max-w-[220px]" style={{ touchAction: "manipulation" }}>
      {["7","8","9","±","4","5","6",",","1","2","3","/","0","del",".","✓"].map(k => (
        <button
          key={k}
          onPointerDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
            k === "✓" ? handleSubmit(player) : handleKey(player, k);
          }}
          className={`py-2.5 rounded-lg font-mono font-bold text-sm transition-all active:scale-90 select-none
            ${k === "del" ? "bg-destructive/20 text-destructive" :
              k === "✓" ? "bg-game-mint text-background" :
              k === "±" || k === "," || k === "." || k === "/" ? "bg-secondary/20 text-secondary" :
              "bg-foreground/5 text-foreground"}`}
          style={{ touchAction: "manipulation" }}
        >
          {k === "del" ? "⌫" : k === "±" ? "±" : k}
        </button>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col" style={{ touchAction: "manipulation" }}>
      {/* Player 2 — rotated 180° */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 rotate-180">
        <p className="font-bold text-sm mb-1">Joueur 2 : {scores[1]} {feedback[1]}</p>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
          Manche {round}/{maxRounds}
        </p>
        <p className="font-mono text-lg font-black mb-2">{question.text} = ?</p>
        <div className="font-mono text-xl bg-foreground/5 rounded-lg px-4 py-2 mb-3 min-w-[120px] text-center">
          {inputs[1] || "?"}
        </div>
        <MiniKeypad player={1} />
      </div>

      <div className="h-0.5 bg-accent/30 mx-4" />

      {/* Player 1 */}
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <p className="font-bold text-sm mb-1">Joueur 1 : {scores[0]} {feedback[0]}</p>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
          Manche {round}/{maxRounds}
        </p>
        <p className="font-mono text-lg font-black mb-2">{question.text} = ?</p>
        <div className="font-mono text-xl bg-foreground/5 rounded-lg px-4 py-2 mb-3 min-w-[120px] text-center">
          {inputs[0] || "?"}
        </div>
        <MiniKeypad player={0} />
      </div>

      <button
        onClick={onBack}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10
          bg-card border border-foreground/10 rounded-full px-4 py-1 text-xs font-bold
          text-muted-foreground hover:text-foreground transition-colors"
      >
        Quitter
      </button>
    </div>
  );
};

export default DuelScreen;
