import React, { useState, useCallback, useEffect, useRef } from "react";
import HUD from "@/components/game/HUD";
import MenuScreen from "@/components/game/MenuScreen";
import QuizScreen from "@/components/game/QuizScreen";
import ResultsScreen from "@/components/game/ResultsScreen";
import type { AnswerRecord } from "@/components/game/ResultsScreen";
import DuelScreen from "@/components/game/DuelScreen";
import BattleScreen from "@/components/game/BattleScreen";
import { getRandomQuestions, GRADE_LABELS } from "@/lib/questions";
import type { Question, Grade, ThemeId } from "@/lib/questions";
import { useProgress } from "@/hooks/useProgress";

type Screen = "menu" | "quiz" | "results" | "duel" | "battle";

const EXAM_DURATION_S = 9 * 60;

const Index: React.FC = () => {
  const [screen, setScreen] = useState<Screen>("menu");
  const [grade, setGrade] = useState<Grade>("3eme");
  const [themeId, setThemeId] = useState<ThemeId>("melange");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [times, setTimes] = useState<number[]>([]);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [isExam, setIsExam] = useState(false);
  const [timerLeft, setTimerLeft] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { level, xp, addXp, recordAnswer, mistakes, addMistake, clearMistake, weakCategories } = useProgress();

  const startMistakes = useCallback(() => {
    const list = mistakes.filter(m => m.grade === grade).map(m => m.question);
    if (list.length === 0) return;
    setIsExam(false);
    setQuestions(list.slice(0, 20));
    resetQuiz();
    setScreen("quiz");
  }, [mistakes, grade]);

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

  const resetQuiz = () => {
    setCurrentQ(0);
    setCorrect(0);
    setTimes([]);
    setAnswers([]);
  };

  const startTraining = useCallback((selectedThemeId: ThemeId) => {
    setIsExam(false);
    setThemeId(selectedThemeId);
    setQuestions(getRandomQuestions(20, grade, selectedThemeId, { weakCategories }));
    resetQuiz();
    setScreen("quiz");
  }, [grade, weakCategories]);

  const startExam = useCallback((selectedThemeId: ThemeId) => {
    setIsExam(true);
    setThemeId(selectedThemeId);
    setQuestions(getRandomQuestions(20, grade, selectedThemeId));
    resetQuiz();
    setTimerLeft(EXAM_DURATION_S);
    setScreen("quiz");
  }, [grade]);


  const startDuel = useCallback((selectedThemeId: ThemeId) => {
    setThemeId(selectedThemeId);
    setScreen("duel");
  }, []);

  const startBattle = useCallback((selectedThemeId: ThemeId) => {
    setThemeId(selectedThemeId);
    setScreen("battle");
  }, []);

  const handleAnswerWithInput = useCallback((isCorrect: boolean, timeMs: number, userInput: string) => {
    const q = questions[currentQ];
    setAnswers(prev => [...prev, {
      question: q,
      userAnswer: userInput,
      correct: isCorrect,
      timeMs,
    }]);

    if (isCorrect) {
      setCorrect(prev => prev + 1);
      addXp(10);
      clearMistake(q);
    } else {
      addMistake(q, grade);
    }
    recordAnswer(q.category, isCorrect);
    setTimes(prev => [...prev, timeMs]);

    if (currentQ + 1 >= questions.length) {
      if (timerRef.current) clearInterval(timerRef.current);
      setScreen("results");
    } else {
      setCurrentQ(prev => prev + 1);
    }
  }, [currentQ, questions, addXp, recordAnswer, addMistake, clearMistake, grade]);

  const handleSkip = useCallback(() => {
    const q = questions[currentQ];
    setAnswers(prev => [...prev, {
      question: q,
      userAnswer: "",
      correct: false,
      timeMs: 0,
    }]);
    recordAnswer(q.category, false);
    setTimes(prev => [...prev, 0]);
    if (currentQ + 1 >= questions.length) {
      if (timerRef.current) clearInterval(timerRef.current);
      setScreen("results");
    } else {
      setCurrentQ(prev => prev + 1);
    }
  }, [currentQ, questions, recordAnswer]);

  const goHome = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setScreen("menu");
  }, []);

  if (screen === "duel") return <DuelScreen grade={grade} themeId={themeId} onBack={goHome} />;
  if (screen === "battle") return <BattleScreen grade={grade} themeId={themeId} onBack={goHome} />;

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
            Automatismes · {GRADE_LABELS[grade]}
          </p>
        </header>

        <HUD
          level={level}
          xpPercent={xp}
          timer={isExam && screen === "quiz" ? formatTimer(timerLeft) : undefined}
          timerWarning={isExam && screen === "quiz" && timerLeft <= 60 && timerLeft > 0}
        />

        {screen === "menu" && (
          <MenuScreen
            grade={grade}
            onGradeChange={setGrade}
            onStartTraining={startTraining}
            onStartExam={startExam}
            onStartDuel={startDuel}
            onStartBattle={startBattle}
            mistakeCount={mistakes.filter(m => m.grade === grade).length}
            onStartMistakes={startMistakes}
          />
        )}


        {screen === "quiz" && questions[currentQ] && (
          <QuizScreen
            key={currentQ}
            question={questions[currentQ]}
            questionIndex={currentQ}
            totalQuestions={questions.length}
            onAnswer={handleAnswerWithInput}
            onSkip={handleSkip}
            onQuit={goHome}
          />
        )}

        {screen === "results" && (
          <ResultsScreen
            correct={correct}
            total={questions.length}
            avgTimeMs={avgTime}
            answers={answers}
            onBack={goHome}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
