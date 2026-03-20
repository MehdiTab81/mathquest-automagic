import React, { useState, useCallback } from "react";
import Keypad from "./Keypad";
import { checkAnswer } from "@/lib/questions";
import type { Question } from "@/lib/questions";

interface QuizScreenProps {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  onAnswer: (correct: boolean, timeMs: number) => void;
  onSkip: () => void;
}

const QuizScreen: React.FC<QuizScreenProps> = ({ question, questionIndex, totalQuestions, onAnswer, onSkip }) => {
  const [input, setInput] = useState("");
  const [shake, setShake] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [startTime] = useState(Date.now());

  const handleKey = useCallback((key: string) => {
    if (key === ",") {
      if (!input.includes(",")) setInput(prev => prev + ",");
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
    onAnswer(true, elapsed);
  }, [input, question, onAnswer, startTime]);

  return (
    <div className="animate-fade-in space-y-4">
      <div className={`bg-card rounded-lg p-5 border border-foreground/10 ${shake ? "animate-shake" : ""}`}>
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            {question.category}
          </span>
          <span className="font-mono text-xs text-muted-foreground">
            {questionIndex + 1}/{totalQuestions}
          </span>
        </div>
        <p className="text-2xl font-black text-center mb-4 leading-tight">{question.text} = ?</p>
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
