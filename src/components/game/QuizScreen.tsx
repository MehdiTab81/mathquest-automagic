import React, { useState, useCallback } from "react";
import Keypad from "./Keypad";
import { checkAnswer, seededShuffle } from "@/lib/questions";
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
}

const QuizScreen: React.FC<QuizScreenProps> = ({ question, questionIndex, totalQuestions, onAnswer, onSkip }) => {
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
          {renderMathText(question.text)}
        </p>

        {/* QCM mode */}
        {isQcm && (
          <div className="grid grid-cols-1 gap-2 mt-4">
            {shuffledOptions.map((opt, i) => {
              const isSelected = selectedOption === opt;
              const isCorrect = wrongAnswer && opt === question.answer;
              const isWrong = isSelected && wrongAnswer;
              return (
                <button
                  key={i}
                  onPointerDown={(e) => { e.preventDefault(); handleQcmSelect(opt); }}
                  disabled={wrongAnswer || !!selectedOption}
                  className={`w-full text-left px-4 py-3.5 rounded-xl font-bold text-sm border-2 transition-all
                    active:scale-[0.97] select-none
                    ${isCorrect ? "border-green-500 bg-green-500/20 text-green-300" :
                      isWrong ? "border-destructive bg-destructive/20 text-destructive" :
                      isSelected ? "border-primary bg-primary/20" :
                      "border-foreground/10 bg-foreground/5 hover:border-primary/30"}`}
                  style={{ touchAction: "manipulation" }}
                >
                  <span className="font-mono text-xs text-muted-foreground mr-2">
                    {String.fromCharCode(65 + i)}.
                  </span>
                  {opt}
                </button>
              );
            })}
          </div>
        )}

        {/* Numeric input mode */}
        {!isQcm && (
          <input
            type="text"
            readOnly
            value={input}
            className={`w-full bg-background/30 border-2 rounded-xl p-4 text-center
              font-mono text-2xl font-bold text-foreground outline-none transition-colors
              ${wrongAnswer ? "border-destructive/40 opacity-50" : "border-foreground/10 focus:border-primary/40"}`}
            placeholder="?"
          />
        )}
      </div>

      {wrongAnswer && (
        <div className="bg-destructive/10 border-l-4 border-destructive p-4 rounded-[10px] animate-fade-in">
          <p className="text-sm font-bold mb-1">❌ Réponse incorrecte</p>
          <p className="text-sm">
            La bonne réponse est <strong className="font-mono text-base">{question.answer}</strong>
          </p>
          {question.hint && (
            <p className="text-xs text-muted-foreground mt-1">💡 {question.hint}</p>
          )}
          <button
            onClick={handleNext}
            className="mt-3 w-full bg-primary text-primary-foreground font-black py-3 rounded-lg
              text-sm transition-all active:scale-[0.97]"
          >
            Question suivante →
          </button>
        </div>
      )}

      {!wrongAnswer && !isQcm && (
        <>
          <button
            onClick={onSkip}
            className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
          >
            Passer cette question →
          </button>
          <Keypad onKey={handleKey} onDelete={handleDelete} onValidate={handleValidate} />
        </>
      )}

      {!wrongAnswer && isQcm && !selectedOption && (
        <button
          onClick={onSkip}
          className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
        >
          Passer cette question →
        </button>
      )}
    </div>
  );
};

export default QuizScreen;
