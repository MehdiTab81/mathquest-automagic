import React, { useState, useCallback, useEffect, useMemo, useRef } from "react";
import HUD from "@/components/game/HUD";
import MenuScreen from "@/components/game/MenuScreen";
import type { GameMode } from "@/components/game/MenuScreen";
import QuizScreen from "@/components/game/QuizScreen";
import ResultsScreen from "@/components/game/ResultsScreen";
import type { AnswerRecord, NewMedal } from "@/components/game/ResultsScreen";
import DuelScreen from "@/components/game/DuelScreen";
import BattleScreen from "@/components/game/BattleScreen";
import ProjectionScreen from "@/components/game/ProjectionScreen";
import LevelBackdrop from "@/components/game/LevelBackdrop";
import { getRandomQuestions, getThemesForGrade, getChaptersForGrade, GRADES } from "@/lib/questions";
import type { Question, Grade, ThemeId } from "@/lib/questions";
import { useProgress } from "@/hooks/useProgress";
import { LEVEL_STYLE, GRADE_HUE, chapterMastery } from "@/lib/levels";
import type { Medal } from "@/lib/levels";
import { play } from "@/lib/sound";

type Screen = "menu" | "quiz" | "results" | "duel" | "battle" | "projection";

const EXAM_DURATION_S = 9 * 60;
const QUESTIONS_PER_GAME = 20;
const GRADE_KEY = "mathquest-grade";

function loadGrade(): Grade {
  try {
    const g = localStorage.getItem(GRADE_KEY) as Grade | null;
    if (g && GRADES.includes(g)) return g;
  } catch { /* stockage indisponible */ }
  return "3eme";
}

/** XP d'une bonne réponse : 10, avec un bonus de série. */
const xpFor = (streak: number) => 10 + (streak >= 10 ? 10 : streak >= 5 ? 6 : streak >= 3 ? 3 : 0);

const Index: React.FC = () => {
  const [grade, setGrade] = useState<Grade>(loadGrade);
  const [screen, setScreen] = useState<Screen>("menu");
  const [themeId, setThemeId] = useState<ThemeId>("melange");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [xpGained, setXpGained] = useState(0);
  const [isExam, setIsExam] = useState(false);
  const [timeUp, setTimeUp] = useState(false);
  const [timerLeft, setTimerLeft] = useState(0);
  const [levelUp, setLevelUp] = useState<number | null>(null);
  const medalsAtStart = useRef<Record<string, Medal>>({});
  const lastStart = useRef<() => void>(() => undefined);

  const progress = useProgress(grade);
  const { level, xp, xpNeeded, addXp, recordAnswer, recordStreak, recordGame, mistakes, addMistake, clearMistake, weakCategories, categoryStats } = progress;

  // Identité visuelle du niveau
  useEffect(() => {
    document.documentElement.dataset.grade = grade;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", `hsl(${GRADE_HUE[grade]})`);
    try { localStorage.setItem(GRADE_KEY, grade); } catch { /* ignore */ }
  }, [grade]);

  // Passage de niveau d'XP
  const prevLevel = useRef(level);
  useEffect(() => {
    if (level > prevLevel.current) {
      setLevelUp(level);
      play("levelup");
      const t = window.setTimeout(() => setLevelUp(null), 2200);
      prevLevel.current = level;
      return () => window.clearTimeout(t);
    }
    prevLevel.current = level;
  }, [level]);

  const chapters = getChaptersForGrade(grade);
  const medals = useMemo(
    () => Object.fromEntries(chapters.map(c => [c.id, chapterMastery(c, categoryStats).medal])) as Record<string, Medal>,
    [chapters, categoryStats]
  );
  const medalCount = Object.values(medals).filter(Boolean).length;

  // Chrono de l'examen
  useEffect(() => {
    if (screen !== "quiz" || !isExam) return;
    if (timerLeft <= 0) {
      setTimeUp(true);
      setScreen("results");
      return;
    }
    const t = window.setTimeout(() => setTimerLeft(s => s - 1), 1000);
    return () => window.clearTimeout(t);
  }, [screen, isExam, timerLeft]);

  const formatTimer = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  const beginQuiz = useCallback((list: Question[], exam: boolean) => {
    medalsAtStart.current = { ...medals };
    setQuestions(list);
    setCurrentQ(0);
    setAnswers([]);
    setStreak(0);
    setBestStreak(0);
    setXpGained(0);
    setIsExam(exam);
    setTimeUp(false);
    setTimerLeft(exam ? EXAM_DURATION_S : 0);
    setScreen("quiz");
  }, [medals]);

  const startMistakes = useCallback(() => {
    const list = mistakes.map(m => m.question).slice(-QUESTIONS_PER_GAME).reverse();
    if (list.length === 0) return;
    lastStart.current = () => beginQuiz(mistakes.map(m => m.question).slice(-QUESTIONS_PER_GAME).reverse(), false);
    beginQuiz(list, false);
  }, [mistakes, beginQuiz]);

  const start = useCallback((mode: GameMode, selectedTheme: ThemeId) => {
    setThemeId(selectedTheme);
    if (mode === "training" || mode === "exam") {
      const exam = mode === "exam";
      const launch = () => beginQuiz(getRandomQuestions(QUESTIONS_PER_GAME, grade, selectedTheme, exam ? {} : { weakCategories }), exam);
      lastStart.current = launch;
      launch();
    } else {
      setScreen(mode);
    }
  }, [grade, weakCategories, beginQuiz]);

  const advance = useCallback(() => {
    if (currentQ + 1 >= questions.length) {
      recordGame();
      addXp(20);
      setXpGained(g => g + 20);
      setScreen("results");
    } else {
      setCurrentQ(c => c + 1);
    }
  }, [currentQ, questions.length, recordGame, addXp]);

  const handleAnswer = useCallback((isCorrect: boolean, timeMs: number, userInput: string) => {
    const q = questions[currentQ];
    setAnswers(prev => [...prev, { question: q, userAnswer: userInput, correct: isCorrect, timeMs }]);
    recordAnswer(q.category, isCorrect);
    if (isCorrect) {
      const s = streak + 1;
      const gain = xpFor(s);
      setStreak(s);
      setBestStreak(b => Math.max(b, s));
      recordStreak(s);
      addXp(gain);
      setXpGained(g => g + gain);
      clearMistake(q);
    } else {
      setStreak(0);
      addMistake(q);
    }
    advance();
  }, [questions, currentQ, streak, recordAnswer, recordStreak, addXp, clearMistake, addMistake, advance]);

  const handleSkip = useCallback(() => {
    const q = questions[currentQ];
    setAnswers(prev => [...prev, { question: q, userAnswer: "", correct: false, timeMs: 0 }]);
    recordAnswer(q.category, false);
    addMistake(q);
    setStreak(0);
    advance();
  }, [questions, currentQ, recordAnswer, addMistake, advance]);

  const goHome = useCallback(() => setScreen("menu"), []);

  const newMedals: NewMedal[] = useMemo(() => {
    if (screen !== "results") return [];
    const rank = (m: Medal) => (m === "or" ? 3 : m === "argent" ? 2 : m === "bronze" ? 1 : 0);
    return chapters
      .filter(c => rank(medals[c.id]) > rank(medalsAtStart.current[c.id] ?? null))
      .map(c => ({ chapter: c.name, emoji: c.emoji, medal: medals[c.id] as Exclude<Medal, null> }));
  }, [screen, chapters, medals]);

  const themeName = getThemesForGrade(grade).find(t => t.id === themeId)?.name ?? "Toutes les notions";

  if (screen === "duel") return <DuelScreen key={`${grade}-${themeId}`} grade={grade} themeId={themeId} onBack={goHome} />;
  if (screen === "battle") return <BattleScreen key={`${grade}-${themeId}`} grade={grade} themeId={themeId} onBack={goHome} />;
  if (screen === "projection") return <ProjectionScreen grade={grade} themeId={themeId} themeName={themeName} onBack={goHome} />;

  return (
    <div className="min-h-screen relative">
      <LevelBackdrop grade={grade} />
      <div className="relative z-10 max-w-[640px] mx-auto px-4 pt-4 pb-10">
        <header className="text-center py-4 animate-fade-in">
          <h1 className="font-display text-5xl font-bold tracking-tight leading-none">
            <span className="text-gradient">MathQuest</span>
          </h1>
          <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground mt-2 font-bold">
            Automatismes du collège · {LEVEL_STYLE[grade].emoji}
          </p>
        </header>

        <HUD level={level} xp={xp} xpNeeded={xpNeeded} medals={medalCount} bestStreak={progress.bestStreak} />

        {screen === "menu" && (
          <MenuScreen
            grade={grade}
            onGradeChange={setGrade}
            onStart={start}
            mistakeCount={mistakes.length}
            onStartMistakes={startMistakes}
            categoryStats={categoryStats}
            onResetGrade={progress.resetGrade}
          />
        )}

        {screen === "results" && (
          <ResultsScreen
            answers={answers}
            total={questions.length}
            xpGained={xpGained}
            bestStreak={bestStreak}
            isExam={isExam}
            timeUp={timeUp}
            newMedals={newMedals}
            onReplay={() => lastStart.current()}
            onBack={goHome}
          />
        )}
      </div>

      {screen === "quiz" && questions[currentQ] && (
        <QuizScreen
          key={`${currentQ}-${questions[currentQ].id ?? questions[currentQ].text}`}
          question={questions[currentQ]}
          questionIndex={currentQ}
          totalQuestions={questions.length}
          streak={streak}
          isExam={isExam}
          timer={isExam ? formatTimer(timerLeft) : undefined}
          timerWarning={isExam && timerLeft <= 60}
          history={answers.map(a => a.correct)}
          onAnswer={handleAnswer}
          onSkip={handleSkip}
          onQuit={goHome}
        />
      )}

      {levelUp !== null && (
        <div className="fixed inset-0 z-[95] pointer-events-none flex items-center justify-center">
          <div className="animate-pop-in glass border-2 border-primary rounded-3xl px-10 py-6 text-center shadow-glow">
            <p className="text-5xl mb-1">⬆️</p>
            <p className="font-display text-3xl font-bold text-gradient">Niveau {levelUp} !</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
