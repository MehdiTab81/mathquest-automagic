import { useState, useEffect, useCallback, useMemo } from "react";
import type { Grade, Question } from "@/lib/questions";

export interface MistakeEntry {
  grade: Grade;
  question: Question;
}

interface ProgressData {
  level: number;
  xp: number;
  categoryStats: Record<string, { correct: number; total: number }>;
  mistakes: MistakeEntry[];
}

const STORAGE_KEY = "mathquest-progress";
const MAX_MISTAKES = 60;

const defaultProgress: ProgressData = { level: 1, xp: 0, categoryStats: {}, mistakes: [] };

function loadProgress(): ProgressData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...defaultProgress, ...JSON.parse(raw) };
  } catch {}
  return { ...defaultProgress };
}

const keyOf = (q: Question) => `${q.category}|${q.text}`;

export function useProgress() {
  const [progress, setProgress] = useState<ProgressData>(loadProgress);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const addXp = useCallback((amount: number) => {
    setProgress(prev => {
      let xp = prev.xp + amount;
      let level = prev.level;
      while (xp >= 100) { xp -= 100; level++; }
      return { ...prev, xp, level };
    });
  }, []);

  const recordAnswer = useCallback((category: string, correct: boolean) => {
    setProgress(prev => {
      const stats = { ...prev.categoryStats };
      if (!stats[category]) stats[category] = { correct: 0, total: 0 };
      stats[category] = {
        correct: stats[category].correct + (correct ? 1 : 0),
        total: stats[category].total + 1,
      };
      return { ...prev, categoryStats: stats };
    });
  }, []);

  /** Store a failed question so it can be replayed later (spaced repetition). */
  const addMistake = useCallback((question: Question, grade: Grade) => {
    setProgress(prev => {
      const k = keyOf(question);
      const list = prev.mistakes.filter(m => keyOf(m.question) !== k);
      list.push({ grade, question });
      return { ...prev, mistakes: list.slice(-MAX_MISTAKES) };
    });
  }, []);

  /** Remove a question from the mistake list once it is answered correctly. */
  const clearMistake = useCallback((question: Question) => {
    setProgress(prev => {
      const k = keyOf(question);
      if (!prev.mistakes.some(m => keyOf(m.question) === k)) return prev;
      return { ...prev, mistakes: prev.mistakes.filter(m => keyOf(m.question) !== k) };
    });
  }, []);

  const resetMistakes = useCallback(() => {
    setProgress(prev => ({ ...prev, mistakes: [] }));
  }, []);

  /** Categories with at least 3 attempts and less than 70 % success. */
  const weakCategories = useMemo(
    () =>
      Object.entries(progress.categoryStats)
        .filter(([, s]) => s.total >= 3 && s.correct / s.total < 0.7)
        .sort((a, b) => a[1].correct / a[1].total - b[1].correct / b[1].total)
        .map(([name]) => name),
    [progress.categoryStats]
  );

  return { ...progress, addXp, recordAnswer, addMistake, clearMistake, resetMistakes, weakCategories };
}
