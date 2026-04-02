import React, { useState, useCallback, useRef } from "react";
import { getDuelQuestion, checkAnswer, seededShuffle } from "@/lib/questions";
import type { Question, Grade, ThemeId } from "@/lib/questions";

interface DuelScreenProps {
  grade: Grade;
  themeId: ThemeId;
  onBack: () => void;
}

/** Renders fraction patterns like "3/4" as horizontal fraction bars */
function renderMathText(text: string): React.ReactNode {
  const parts = text.split(/(\b\d+\/\d+\b)/g);
  return parts.map((part, i) => {
    const fractionMatch = part.match(/^(\d+)\/(\d+)$/);
    if (fractionMatch) {
      return (
        <span key={i} className="inline-flex flex-col items-center mx-1 align-middle leading-none">
          <span className="text-[0.65em] font-bold">{fractionMatch[1]}</span>
          <span className="w-full h-[1.5px] bg-foreground rounded-full" />
          <span className="text-[0.65em] font-bold">{fractionMatch[2]}</span>
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

const DuelScreen: React.FC<DuelScreenProps> = ({ grade, themeId, onBack }) => {
  const [scores, setScores] = useState([0, 0]);
  const [question, setQuestion] = useState<Question>(() => getDuelQuestion(grade, themeId));
  const [inputs, setInputs] = useState(["", ""]);
  const [winner, setWinner] = useState<number | null>(null);
  const [round, setRound] = useState(1);
  const [feedback, setFeedback] = useState<[string, string]>(["", ""]);
  const lockedRef = useRef(false);
  const maxRounds = 10;

  const isQcm = !!question.options && question.options.length > 0;

  const nextRound = useCallback((newScores: number[]) => {
    setTimeout(() => {
      if (round >= maxRounds) {
        setWinner(newScores[0] >= newScores[1] ? 0 : 1);
      } else {
        setRound(r => r + 1);
        setQuestion(getDuelQuestion(grade, themeId));
        setInputs(["", ""]);
        setFeedback(["", ""]);
        lockedRef.current = false;
      }
    }, 500);
  }, [round, grade, themeId]);

  const handleKey = useCallback((player: number, key: string) => {
    if (winner !== null || lockedRef.current || isQcm) return;
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
  }, [winner, isQcm]);

  const handleSubmit = useCallback((player: number) => {
    if (lockedRef.current || winner !== null) return;
    setInputs(prevInputs => {
      if (!prevInputs[player].trim()) return prevInputs;

      if (checkAnswer(prevInputs[player], question.answer)) {
        lockedRef.current = true;
        setScores(prev => {
          const newScores = [...prev];
          newScores[player]++;
          nextRound(newScores);
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
        }, 600);
        return cleared;
      }
      return prevInputs;
    });
  }, [question, winner, nextRound]);

  const handleQcmSelect = useCallback((player: number, option: string) => {
    if (lockedRef.current || winner !== null) return;
    if (checkAnswer(option, question.answer, true)) {
      lockedRef.current = true;
      setScores(prev => {
        const newScores = [...prev];
        newScores[player]++;
        nextRound(newScores);
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
      setTimeout(() => {
        setFeedback(prev => {
          const next = [...prev] as [string, string];
          next[player] = "";
          return next;
        });
      }, 600);
    }
  }, [question, winner, nextRound]);

  if (winner !== null) {
    const tie = scores[0] === scores[1];
    return (
      <div className="h-screen flex flex-col items-center justify-center p-6 animate-fade-in overflow-hidden">
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

  const KEYS = ["7","8","9","±","4","5","6",",","1","2","3","del","0",".","/","✓"];

  const MiniKeypad = ({ player }: { player: number }) => (
    <div className="grid grid-cols-4 gap-[3px] w-full" style={{ touchAction: "manipulation" }}>
      {KEYS.map(k => (
        <button
          key={k}
          onPointerDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
            k === "✓" ? handleSubmit(player) : handleKey(player, k);
          }}
          className={`py-[min(2.8vh,14px)] rounded-md font-mono font-bold text-[min(3.2vh,15px)] transition-all active:scale-90 select-none
            ${k === "del" ? "bg-destructive/20 text-destructive" :
              k === "✓" ? "bg-game-mint text-background font-black text-[min(2.8vh,13px)]" :
              k === "±" || k === "," || k === "." || k === "/" ? "bg-secondary/20 text-secondary" :
              "bg-foreground/5 text-foreground"}`}
          style={{ touchAction: "manipulation" }}
        >
          {k === "del" ? "⌫" : k === "✓" ? "OK" : k}
        </button>
      ))}
    </div>
  );

  const QcmOptions = ({ player }: { player: number }) => (
    <div className="grid grid-cols-2 gap-[3px] w-full" style={{ touchAction: "manipulation" }}>
      {seededShuffle(question.options || [], question.text).map((opt, i) => (
        <button
          key={i}
          onPointerDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleQcmSelect(player, opt);
          }}
          className="py-[min(2.5vh,12px)] px-1 rounded-md font-bold text-[min(2.5vh,11px)] bg-foreground/5
            text-foreground active:scale-90 transition-all select-none leading-tight text-center"
          style={{ touchAction: "manipulation" }}
        >
          <span className="font-mono text-[0.7em] text-muted-foreground">{String.fromCharCode(65 + i)}.</span> {opt}
        </button>
      ))}
    </div>
  );

  const PlayerZone = ({ player, rotated }: { player: number; rotated?: boolean }) => (
    <div
      className={`flex-1 flex flex-col items-center px-3 py-1 min-h-0 ${rotated ? "rotate-180" : ""}`}
      style={{ touchAction: "manipulation", overflow: "hidden" }}
    >
      <div className="w-full flex justify-between items-center mb-1">
        <span className="font-black text-xs text-muted-foreground">
          J{player + 1} · {scores[player]}pts {feedback[player]}
        </span>
        <span className="font-mono text-[10px] text-muted-foreground">
          {round}/{maxRounds}
        </span>
      </div>

      <p className="font-mono text-sm font-black mb-1 text-center leading-tight flex items-center justify-center flex-wrap">
        {renderMathText(question.text)} {!isQcm && <span className="ml-1">= ?</span>}
      </p>

      {!isQcm && (
        <div className="font-mono text-lg bg-foreground/5 rounded-lg px-3 py-1 mb-1 min-w-[100px] text-center select-none">
          {inputs[player] || "?"}
        </div>
      )}

      <div className="w-full max-w-[260px]">
        {isQcm ? <QcmOptions player={player} /> : <MiniKeypad player={player} />}
      </div>
    </div>
  );

  return (
    <div
      className="h-screen flex flex-col overflow-hidden select-none"
      style={{ touchAction: "manipulation", position: "fixed", inset: 0 }}
    >
      <PlayerZone player={1} rotated />
      <div className="relative flex-shrink-0 h-8 flex items-center justify-center">
        <div className="absolute inset-x-4 top-1/2 h-[2px] bg-accent/30 -translate-y-1/2" />
        <button
          onClick={onBack}
          className="relative z-10 bg-card border border-foreground/10 rounded-full px-4 py-0.5
            text-[10px] font-bold text-muted-foreground hover:text-foreground transition-colors select-none"
          style={{ touchAction: "manipulation" }}
        >
          Quitter
        </button>
      </div>
      <PlayerZone player={0} />
    </div>
  );
};

export default DuelScreen;
