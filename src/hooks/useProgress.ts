import { useState, useEffect, useCallback } from "react";

interface ProgressData {
  level: number;
  xp: number;
  categoryStats: Record<string, { correct: number; total: number }>;
}

const STORAGE_KEY = "mathquest-progress";

const defaultProgress: ProgressData = { level: 1, xp: 0, categoryStats: {} };

function loadProgress(): ProgressData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...defaultProgress, ...JSON.parse(raw) };
  } catch {}
  return { ...defaultProgress };
}

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

  return { ...progress, addXp, recordAnswer };
}
