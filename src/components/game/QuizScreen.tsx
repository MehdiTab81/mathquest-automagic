import React, { useState, useCallback } from "react";
import Keypad from "./Keypad";
import { checkAnswer } from "@/lib/questions";
import type { Question } from "@/lib/questions";

/** Renders fraction patterns like "3/4" as horizontal fraction bars */
function renderMathText(text: string): React.ReactNode {
  // Split on fraction patterns: digits/digits (but not inside words)
  const parts = text.split(/(\b\d+\/\d+\b)/g);
  return parts.map((part, i) => {
    const fractionMatch = part.match(/^(\d+)\/(\d+)$/);
    if (fractionMatch) {
      return (
        <span key={i} className="inline-flex flex-col items-center mx-1 align-middle leading-none">
          <span className="text-[0.7em] font-bold">{fractionMatch[1]}</span>
          <span className="w-full h-[2px] bg-foreground rounded-full my-[1px]" />
          <span className="text-[0.7em] font-bold">{fractionMatch[2]}</span>
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

interface QuizScreenProps {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  onAnswer: (correct: boolean, timeMs: number, userInput: string) => void;
  onSkip: () => void;
}

const QuizScreen: React.FC<QuizScreenProps> = ({ question, questionIndex, totalQuestions, onAnswer, onSkip }) => {
  const [input, setInput] = useState("");
  const [shake, setShake] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [startTime] = useState(Date.now());

  const handleKey = useCallback((key: string) => {
    if (key === "±") {
      setInput(prev => prev.startsWith("-") ? prev.slice(1) : "-" + prev);
    } else if (key === ",") {
      if (!input.includes(",") && !input.includes(".")) setInput(prev => prev + ",");
    } else if (key === ".") {
      if (!input.includes(",") && !input.includes(".")) setInput(prev => prev + ".");
    } else {
      setInput(prev => prev + key);
    }
  }, [input]);

  const handleDelete = useCallback(() => {
    setInput(prev => prev.slice(0, -1));
  }, []);

  const handleValidate = useCallback(() => {
    if (!input.trim()) return;
    const correct = checkAnswer(input, question.answer);
    if (!correct) {
      setShake(true);
      setTimeout(() => setShake(false), 400);
      setShowHint(true);
      return;
    }
    const elapsed = Date.now() - startTime;
    onAnswer(true, elapsed, input);
  }, [input, question, onAnswer, startTime]);

  return (
    <div className="animate-fade-in space-y-4">
      <div className={`bg-card rounded-lg p-5 border border-foreground/10 ${shake ? "animate-shake" : ""}`}>
        <div className="flex justify-between items-start mb-3 gap-3">
          <div>
            <span className="block text-xs font-bold uppercase tracking-widest text-muted-foreground">
              {question.category}
            </span>
            {question.id !== undefined && (
              <span className="mt-1 block font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
                Question #{question.id}
              </span>
            )}
          </div>
          <span className="font-mono text-xs text-muted-foreground">
            {questionIndex + 1}/{totalQuestions}
          </span>
        </div>
        <p className="text-2xl font-black text-center mb-4 leading-tight flex items-center justify-center flex-wrap gap-1">
          {renderMathText(question.text)} <span>= ?</span>
        </p>
        <input
          type="text"
          readOnly
          value={input}
          className="w-full bg-background/30 border-2 border-foreground/10 rounded-xl p-4 text-center
            font-mono text-2xl font-bold text-foreground outline-none focus:border-primary/40 transition-colors"
          placeholder="?"
        />
        <button
          onClick={onSkip}
          className="w-full mt-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Passer cette question →
        </button>
      </div>

      {showHint && question.hint && (
        <div className="bg-accent/10 border-l-4 border-accent p-3 rounded-[10px] text-sm animate-fade-in">
          💡 {question.hint}
        </div>
      )}

      {showHint && !question.hint && (
        <div className="bg-destructive/10 border-l-4 border-destructive p-3 rounded-[10px] text-sm animate-fade-in">
          ❌ Réponse incorrecte. La bonne réponse est <strong className="font-mono">{question.answer}</strong>
        </div>
      )}

      <Keypad onKey={handleKey} onDelete={handleDelete} onValidate={handleValidate} />
    </div>
  );
};

export default QuizScreen;
