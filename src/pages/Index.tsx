import React, { useState, useCallback } from "react";
import HUD from "@/components/game/HUD";
import MenuScreen from "@/components/game/MenuScreen";
import QuizScreen from "@/components/game/QuizScreen";
import ResultsScreen from "@/components/game/ResultsScreen";
import { getRandomQuestions, getQuestionsByCategory } from "@/lib/questions";
import type { Question } from "@/lib/questions";

type Screen = "menu" | "quiz" | "results";

const Index: React.FC = () => {
  const [screen, setScreen] = useState<Screen>("menu");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [times, setTimes] = useState<number[]>([]);
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);

  const startQuiz = useCallback((category: string | null) => {
    if (category) {
      setQuestions(getQuestionsByCategory(category));
    } else {
      setQuestions(getRandomQuestions(20));
    }
    setCurrentQ(0);
    setCorrect(0);
    setTimes([]);
    setScreen("quiz");
  }, []);

  const handleAnswer = useCallback((isCorrect: boolean, timeMs: number) => {
    if (isCorrect) {
      setCorrect(prev => prev + 1);
      setXp(prev => {
        const next = prev + 10;
        if (next >= 100) {
          setLevel(l => l + 1);
          return next - 100;
        }
        return next;
      });
    }
    setTimes(prev => [...prev, timeMs]);
    if (currentQ + 1 >= questions.length) {
      setScreen("results");
    } else {
      setCurrentQ(prev => prev + 1);
    }
  }, [currentQ, questions.length]);

  const handleSkip = useCallback(() => {
    setTimes(prev => [...prev, 0]);
    if (currentQ + 1 >= questions.length) {
      setScreen("results");
    } else {
      setCurrentQ(prev => prev + 1);
    }
  }, [currentQ, questions.length]);

  const avgTime = times.length > 0 ? times.reduce((a, b) => a + b, 0) / times.filter(t => t > 0).length : 0;

  return (
    <div className="min-h-screen relative">
      <div className="max-w-[600px] mx-auto px-4 py-4">
        <header className="text-center py-5 animate-fade-in">
          <h1 className="text-4xl font-black tracking-tight leading-none">
            <span className="text-game-gold">Math</span>
            <span className="text-game-teal">Quest</span>
          </h1>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mt-1 font-bold">
            Automatismes · 3ème
          </p>
        </header>

        <HUD
          level={level}
          xpPercent={xp}
        />

        {screen === "menu" && <MenuScreen onSelectCategory={startQuiz} />}

        {screen === "quiz" && questions[currentQ] && (
          <QuizScreen
            key={currentQ}
            question={questions[currentQ]}
            questionIndex={currentQ}
            totalQuestions={questions.length}
            onAnswer={handleAnswer}
            onSkip={handleSkip}
          />
        )}

        {screen === "results" && (
          <ResultsScreen
            correct={correct}
            total={questions.length}
            avgTimeMs={avgTime}
            onBack={() => setScreen("menu")}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
