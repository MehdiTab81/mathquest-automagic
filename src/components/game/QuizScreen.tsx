import React, { useState, useCallback } from "react";
import Keypad from "./Keypad";
import { checkAnswer, seededShuffle, getExplanation } from "@/lib/questions";
import type { Question } from "@/lib/questions";

/** Renders fraction patterns like "3/4" as horizontal fraction bars */
function renderMathText(text: string): React.ReactNode {
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
  onQuit: () => void;
}

const QuizScreen: React.FC<QuizScreenProps> = ({ question, questionIndex, totalQuestions, onAnswer, onSkip, onQuit }) => {
  const [input, setInput] = useState("");
  const [shake, setShake] = useState(false);
  const [wrongAnswer, setWrongAnswer] = useState(false);
  const [startTime] = useState(Date.now());
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const isQcm = !!question.options && question.options.length > 0;

  const handleKey = useCallback((key: string) => {
    if (wrongAnswer) return;
    if (key === "±") {
      setInput(prev => prev.startsWith("-") ? prev.slice(1) : "-" + prev);
    } else if (key === "," || key === ".") {
      if (!input.includes(",") && !input.includes(".")) setInput(prev => prev + key);
    } else {
      setInput(prev => prev + key);
    }
  }, [input, wrongAnswer]);

  const handleDelete = useCallback(() => {
    if (wrongAnswer) return;
    setInput(prev => prev.slice(0, -1));
  }, [wrongAnswer]);

  const handleValidate = useCallback(() => {
    if (wrongAnswer) return;
    if (!input.trim()) return;
    const correct = checkAnswer(input, question.answer);
    if (correct) {
      const elapsed = Date.now() - startTime;
      onAnswer(true, elapsed, input);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 400);
      setWrongAnswer(true);
    }
  }, [input, question, onAnswer, startTime, wrongAnswer]);

  const handleQcmSelect = useCallback((option: string) => {
    if (wrongAnswer || selectedOption) return;
    setSelectedOption(option);
    const correct = checkAnswer(option, question.answer, true);
    if (correct) {
      const elapsed = Date.now() - startTime;
      setTimeout(() => onAnswer(true, elapsed, option), 300);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 400);
      setWrongAnswer(true);
    }
  }, [question, onAnswer, startTime, wrongAnswer, selectedOption]);

  const handleNext = useCallback(() => {
    const elapsed = Date.now() - startTime;
    onAnswer(false, elapsed, isQcm ? (selectedOption || "") : input);
  }, [onAnswer, startTime, input, isQcm, selectedOption]);

  const shuffledOptions = question.options
    ? seededShuffle(question.options, question.text)
    : [];

  return (
    <div
      className="fixed inset-0 flex flex-col select-none overflow-hidden bg-background z-50"
      style={{ touchAction: "manipulation" }}
    >
      {/* Top bar: quit + progress */}
      <div className="flex-shrink-0 flex items-center justify-between px-3 pt-2 pb-1">
        <button
          onPointerDown={(e) => { e.preventDefault(); onQuit(); }}
          className="text-xs font-bold text-muted-foreground bg-card border border-foreground/10 rounded-full px-3 py-1
            active:scale-95 transition-all"
          style={{ touchAction: "manipulation" }}
        >
          ✕ Quitter
        </button>
        <span className="font-mono text-xs text-muted-foreground">
          {questionIndex + 1}/{totalQuestions}
        </span>
      </div>

      {/* Question area - compact */}
      <div className={`flex-shrink-0 px-4 py-2 ${shake ? "animate-shake" : ""}`}>
        <span className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
          {question.category}
          {question.id !== undefined && (
            <span className="ml-2 font-mono text-primary">#{question.id}</span>
          )}
        </span>
        <p className="text-xl font-black text-center leading-tight flex items-center justify-center flex-wrap gap-1">
          {renderMathText(question.text)}
        </p>
      </div>

      {/* Wrong answer feedback */}
      {wrongAnswer && (
        <div className="flex-shrink-0 mx-3 bg-destructive/10 border-l-4 border-destructive p-3 rounded-lg animate-fade-in">
          <p className="text-sm font-bold">❌ Réponse incorrecte</p>
          <p className="text-sm">
            Réponse : <strong className="font-mono text-base">{question.answer}</strong>
          </p>
          {question.hint && (
            <p className="text-xs text-muted-foreground mt-1">💡 {question.hint}</p>
          )}
          <button
            onPointerDown={(e) => { e.preventDefault(); handleNext(); }}
            className="mt-2 w-full bg-primary text-primary-foreground font-black py-2.5 rounded-lg
              text-sm active:scale-[0.97] transition-all"
            style={{ touchAction: "manipulation" }}
          >
            Suivante →
          </button>
        </div>
      )}

      {/* Main content area - fills remaining space */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* QCM mode */}
        {isQcm && !wrongAnswer && (
          <div className="flex-1 flex flex-col justify-center px-3 gap-2">
            {shuffledOptions.map((opt, i) => {
              const isSelected = selectedOption === opt;
              return (
                <button
                  key={i}
                  onPointerDown={(e) => { e.preventDefault(); handleQcmSelect(opt); }}
                  disabled={wrongAnswer || !!selectedOption}
                  className={`w-full text-left px-4 py-4 rounded-xl font-bold text-sm border-2 transition-all
                    active:scale-[0.97] select-none
                    ${isSelected ? "border-primary bg-primary/20" :
                      "border-foreground/10 bg-foreground/5"}`}
                  style={{ touchAction: "manipulation" }}
                >
                  <span className="font-mono text-xs text-muted-foreground mr-2">
                    {String.fromCharCode(65 + i)}.
                  </span>
                  {opt}
                </button>
              );
            })}
            <button
              onPointerDown={(e) => { e.preventDefault(); onSkip(); }}
              className="text-sm text-muted-foreground py-2"
              style={{ touchAction: "manipulation" }}
            >
              Passer →
            </button>
          </div>
        )}

        {/* Numeric input mode */}
        {!isQcm && !wrongAnswer && (
          <>
            {/* Input display */}
            <div className="flex-shrink-0 px-4 py-1">
              <div className={`w-full bg-background/30 border-2 rounded-xl p-3 text-center
                font-mono text-2xl font-bold text-foreground
                ${wrongAnswer ? "border-destructive/40 opacity-50" : "border-foreground/10"}`}>
                {input || "?"}
              </div>
            </div>

            {/* Skip button */}
            <div className="flex-shrink-0 text-center">
              <button
                onPointerDown={(e) => { e.preventDefault(); onSkip(); }}
                className="text-xs text-muted-foreground py-1"
                style={{ touchAction: "manipulation" }}
              >
                Passer →
              </button>
            </div>

            {/* Keypad - fills all remaining space */}
            <div className="flex-1 min-h-0 px-2 pb-2">
              <Keypad onKey={handleKey} onDelete={handleDelete} onValidate={handleValidate} fullHeight />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default QuizScreen;
