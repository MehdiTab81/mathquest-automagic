import { useState, useEffect, useCallback, useMemo } from "react";
import type { Grade, Question } from "@/lib/questions";
import { xpForLevel } from "@/lib/levels";

export interface MistakeEntry {
  grade: Grade;
  question: Question;
}

export type CategoryStats = Record<string, { correct: number; total: number }>;

export interface GradeProgress {
  level: number;
  xp: number;
  bestStreak: number;
  games: number;
  categoryStats: CategoryStats;
}

interface ProgressData {
  version: 2;
  grades: Record<Grade, GradeProgress>;
  mistakes: MistakeEntry[];
}

const STORAGE_KEY = "mathquest-progress";
const MAX_MISTAKES = 80;

const emptyGrade = (): GradeProgress => ({ level: 1, xp: 0, bestStreak: 0, games: 0, categoryStats: {} });
const emptyProgress = (): ProgressData => ({
  version: 2,
  grades: { "6eme": emptyGrade(), "5eme": emptyGrade(), "4eme": emptyGrade(), "3eme": emptyGrade() },
  mistakes: [],
});

/** Charge la progression ; l'ancien format (XP commune à tous les niveaux) est rattaché à la 3ème. */
function loadProgress(): ProgressData {
  const base = emptyProgress();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return base;
    const data = JSON.parse(raw);
    if (data && data.version === 2 && data.grades) {
      for (const g of Object.keys(base.grades) as Grade[]) {
        base.grades[g] = { ...emptyGrade(), ...(data.grades[g] || {}) };
      }
      base.mistakes = Array.isArray(data.mistakes) ? data.mistakes : [];
      return base;
    }
    // Ancien format v1
    base.grades["3eme"] = {
      ...emptyGrade(),
      level: typeof data.level === "number" ? data.level : 1,
      xp: typeof data.xp === "number" ? data.xp : 0,
      categoryStats: data.categoryStats || {},
    };
    base.mistakes = Array.isArray(data.mistakes) ? data.mistakes : [];
  } catch { /* données illisibles : on repart de zéro */ }
  return base;
}

const keyOf = (q: Question) => `${q.category}|${q.text}`;

export function useProgress(grade: Grade) {
  const [progress, setProgress] = useState<ProgressData>(loadProgress);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch { /* stockage plein ou bloqué */ }
  }, [progress]);

  const updateGrade = useCallback((fn: (g: GradeProgress) => GradeProgress) => {
    setProgress(prev => ({ ...prev, grades: { ...prev.grades, [grade]: fn(prev.grades[grade]) } }));
  }, [grade]);

  const addXp = useCallback((amount: number) => {
    updateGrade(g => {
      let xp = g.xp + amount;
      let level = g.level;
      while (xp >= xpForLevel(level)) { xp -= xpForLevel(level); level++; }
      return { ...g, xp, level };
    });
  }, [updateGrade]);

  const recordAnswer = useCallback((category: string, correct: boolean) => {
    updateGrade(g => {
      const prev = g.categoryStats[category] || { correct: 0, total: 0 };
      return {
        ...g,
        categoryStats: { ...g.categoryStats, [category]: { correct: prev.correct + (correct ? 1 : 0), total: prev.total + 1 } },
      };
    });
  }, [updateGrade]);

  const recordStreak = useCallback((streak: number) => {
    updateGrade(g => (streak > g.bestStreak ? { ...g, bestStreak: streak } : g));
  }, [updateGrade]);

  const recordGame = useCallback(() => {
    updateGrade(g => ({ ...g, games: g.games + 1 }));
  }, [updateGrade]);

  /** Garde une question ratée pour la retravailler plus tard. */
  const addMistake = useCallback((question: Question) => {
    setProgress(prev => {
      const k = keyOf(question);
      const list = prev.mistakes.filter(m => !(m.grade === grade && keyOf(m.question) === k));
      list.push({ grade, question });
      return { ...prev, mistakes: list.slice(-MAX_MISTAKES) };
    });
  }, [grade]);

  /** Retire une question de la liste dès qu'elle est réussie. */
  const clearMistake = useCallback((question: Question) => {
    setProgress(prev => {
      const k = keyOf(question);
      if (!prev.mistakes.some(m => m.grade === grade && keyOf(m.question) === k)) return prev;
      return { ...prev, mistakes: prev.mistakes.filter(m => !(m.grade === grade && keyOf(m.question) === k)) };
    });
  }, [grade]);

  const resetGrade = useCallback(() => {
    setProgress(prev => ({
      ...prev,
      grades: { ...prev.grades, [grade]: emptyGrade() },
      mistakes: prev.mistakes.filter(m => m.grade !== grade),
    }));
  }, [grade]);

  const current = progress.grades[grade];

  /** Catégories tentées au moins 3 fois avec moins de 70 % de réussite. */
  const weakCategories = useMemo(
    () =>
      Object.entries(current.categoryStats)
        .filter(([, s]) => s.total >= 3 && s.correct / s.total < 0.7)
        .sort((a, b) => a[1].correct / a[1].total - b[1].correct / b[1].total)
        .map(([name]) => name),
    [current.categoryStats]
  );

  const mistakes = useMemo(() => progress.mistakes.filter(m => m.grade === grade), [progress.mistakes, grade]);

  return {
    level: current.level,
    xp: current.xp,
    xpNeeded: xpForLevel(current.level),
    bestStreak: current.bestStreak,
    games: current.games,
    categoryStats: current.categoryStats,
    mistakes,
    weakCategories,
    addXp,
    recordAnswer,
    recordStreak,
    recordGame,
    addMistake,
    clearMistake,
    resetGrade,
  };
}
