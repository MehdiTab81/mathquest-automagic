import React, { useState, useCallback, useEffect, useRef } from "react";
import HUD from "@/components/game/HUD";
import MenuScreen from "@/components/game/MenuScreen";
import QuizScreen from "@/components/game/QuizScreen";
import ResultsScreen from "@/components/game/ResultsScreen";
import DuelScreen from "@/components/game/DuelScreen";
import { getRandomQuestions, Question, Grade } from "@/lib/questions";

type Screen = "menu" | "quiz" | "results" | "duel";
type Mode = "free" | "exam" | "duel";

const EXAM_DURATION = 9 * 60;
const QUESTIONS_PER_SESSION = 12;

const Index: React.FC = () => {
  const [screen, setScreen] = useState<Screen>("menu");
  const [mode, setMode] = useState<Mode>("free");
  const [grade, setGrade] = useState<Grade>("6eme");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [times, setTimes] = useState<number[]>([]);
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [timer, setTimer] = useState(EXAM_DURATION);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  const startQuiz = useCallback((m: Mode, g: Grade) => {
    setGrade(g);
    if (m === "duel") {
      setMode("duel");
      setScreen("duel");
      return;
    }
    setMode(m);
    setQuestions(getRandomQuestions(QUESTIONS_PER_SESSION, g));
    setCurrentQ(0);
    setCorrect(0);
    setTimes([]);
    setTimer(EXAM_DURATION);
    setScreen("quiz");
  }, []);

  useEffect(() => {
    if (screen === "quiz" && mode === "exam") {
      timerRef.current = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setScreen("results");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timerRef.current);
    }
  }, [screen, mode]);

  const formatTimer = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

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
      clearInterval(timerRef.current);
      setScreen("results");
    } else {
      setCurrentQ(prev => prev + 1);
    }
  }, [currentQ, questions.length]);

  const handleSkip = useCallback(() => {
    setTimes(prev => [...prev, 0]);
    if (currentQ + 1 >= questions.length) {
      clearInterval(timerRef.current);
      setScreen("results");
    } else {
      setCurrentQ(prev => prev + 1);
    }
  }, [currentQ, questions.length]);

  const avgTime = times.length > 0 ? times.reduce((a, b) => a + b, 0) / times.filter(t => t > 0).length : 0;

  if (screen === "duel") {
    return <DuelScreen onBack={() => setScreen("menu")} grade={grade} />;
  }

  return (
    <div className="min-h-screen relative">
      <div className="max-w-[600px] mx-auto px-4 py-4">
        <header className="text-center py-5 animate-fade-in">
          <h1 className="text-4xl font-black tracking-tight leading-none">
            <span className="text-game-gold">Math</span>
            <span className="text-game-teal">Quest</span>
          </h1>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mt-1 font-bold">
            Édition Automatismes
          </p>
        </header>

        <HUD
          level={level}
          xpPercent={xp}
          timer={screen === "quiz" && mode === "exam" ? formatTimer(timer) : undefined}
        />

        {screen === "menu" && <MenuScreen onSelectMode={startQuiz} />}

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
