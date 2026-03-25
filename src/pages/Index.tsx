import React, { useState, useCallback, useEffect, useRef } from "react";
import HUD from "@/components/game/HUD";
import MenuScreen from "@/components/game/MenuScreen";
import QuizScreen from "@/components/game/QuizScreen";
import ResultsScreen from "@/components/game/ResultsScreen";
import DuelScreen from "@/components/game/DuelScreen";
import { getRandomQuestions, getQuestionsByCategory } from "@/lib/questions";
import type { Question } from "@/lib/questions";

type Screen = "menu" | "quiz" | "results" | "duel";

const EXAM_DURATION_S = 9 * 60; // 9 minutes

const Index: React.FC = () => {
  const [screen, setScreen] = useState<Screen>("menu");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [times, setTimes] = useState<number[]>([]);
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [isExam, setIsExam] = useState(false);
  const [timerLeft, setTimerLeft] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Timer logic for exam mode
  useEffect(() => {
    if (screen === "quiz" && isExam && timerLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimerLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setScreen("results");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }
  }, [screen, isExam, timerLeft > 0]);

  const formatTimer = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const startTraining = useCallback((category: string | null) => {
    setIsExam(false);
    setQuestions(category ? getQuestionsByCategory(category) : getRandomQuestions(20));
    setCurrentQ(0);
    setCorrect(0);
    setTimes([]);
    setScreen("quiz");
  }, []);

  const startExam = useCallback(() => {
    setIsExam(true);
    setQuestions(getRandomQuestions(20));
    setCurrentQ(0);
    setCorrect(0);
    setTimes([]);
    setTimerLeft(EXAM_DURATION_S);
    setScreen("quiz");
  }, []);

  const startDuel = useCallback(() => {
    setScreen("duel");
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
      if (timerRef.current) clearInterval(timerRef.current);
      setScreen("results");
    } else {
      setCurrentQ(prev => prev + 1);
    }
  }, [currentQ, questions.length]);

  const handleSkip = useCallback(() => {
    setTimes(prev => [...prev, 0]);
    if (currentQ + 1 >= questions.length) {
      if (timerRef.current) clearInterval(timerRef.current);
      setScreen("results");
    } else {
      setCurrentQ(prev => prev + 1);
    }
  }, [currentQ, questions.length]);

  const goHome = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setScreen("menu");
  }, []);

  if (screen === "duel") {
    return <DuelScreen onBack={goHome} />;
  }

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
          timer={isExam && screen === "quiz" ? formatTimer(timerLeft) : undefined}
        />

        {screen === "menu" && (
          <MenuScreen
            onStartTraining={startTraining}
            onStartExam={startExam}
            onStartDuel={startDuel}
          />
        )}

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
            onBack={goHome}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
