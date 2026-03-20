import React, { useState, useCallback } from "react";
import { getDuelQuestion, checkAnswer, Question, Grade } from "@/lib/questions";

const DuelScreen: React.FC<{ onBack: () => void; grade: Grade }> = ({ onBack, grade }) => {
  const [scores, setScores] = useState([0, 0]);
  const [question, setQuestion] = useState<Question>(getDuelQuestion(grade));
  const [inputs, setInputs] = useState(["", ""]);
  const [winner, setWinner] = useState<number | null>(null);
  const [round, setRound] = useState(1);
  const maxRounds = 10;

  const handleKey = useCallback((player: number, key: string) => {
    if (winner !== null) return;
    setInputs(prev => {
      const next = [...prev];
      if (key === "del") {
        next[player] = next[player].slice(0, -1);
      } else {
        next[player] = next[player] + key;
      }
      return next;
    });
  }, [winner]);

  const handleSubmit = useCallback((player: number) => {
    if (!inputs[player].trim() || winner !== null) return;
    if (checkAnswer(inputs[player], question.answer)) {
      const newScores = [...scores];
      newScores[player]++;
      setScores(newScores);

      if (round >= maxRounds) {
        setWinner(newScores[0] >= newScores[1] ? 0 : 1);
      } else {
        setRound(r => r + 1);
        setQuestion(getDuelQuestion(grade));
        setInputs(["", ""]);
      }
    } else {
      setInputs(prev => {
        const next = [...prev];
        next[player] = "";
        return next;
      });
    }
  }, [inputs, question, scores, round, winner]);

  if (winner !== null) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 animate-fade-in">
        <h2 className="text-3xl font-black mb-4">🏆 Joueur {winner + 1} gagne !</h2>
        <p className="font-mono text-xl mb-6">{scores[0]} — {scores[1]}</p>
        <button onClick={onBack} className="bg-primary text-primary-foreground font-black py-4 px-8 rounded-full active:scale-[0.97]">
          🏠 RETOUR
        </button>
      </div>
    );
  }

  const MiniKeypad = ({ player }: { player: number }) => (
    <div className="grid grid-cols-3 gap-1.5 w-full max-w-[200px]">
      {["7","8","9","4","5","6","1","2","3","0","del","✓"].map(k => (
        <button
          key={k}
          onClick={() => k === "✓" ? handleSubmit(player) : handleKey(player, k)}
          className={`py-3 rounded-lg font-mono font-bold text-sm transition-all active:scale-90
            ${k === "del" ? "bg-destructive/20 text-destructive" :
              k === "✓" ? "bg-game-mint text-background" :
              "bg-foreground/5 text-foreground"}`}
        >
          {k === "del" ? "⌫" : k}
        </button>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Player 2 — rotated 180° */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 rotate-180">
        <p className="font-bold text-sm mb-1">Joueur 2 : {scores[1]}</p>
        <p className="font-mono text-lg font-black mb-2">{question.text} = ?</p>
        <div className="font-mono text-xl bg-foreground/5 rounded-lg px-4 py-2 mb-3 min-w-[120px] text-center">
          {inputs[1] || "?"}
        </div>
        <MiniKeypad player={1} />
      </div>

      <div className="h-0.5 bg-accent/30 mx-4" />

      {/* Player 1 */}
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <p className="font-bold text-sm mb-1">Joueur 1 : {scores[0]}</p>
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
