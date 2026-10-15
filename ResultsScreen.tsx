import React, { useEffect, useState } from "react";
import type { Question } from "@/lib/questions";
import { MathText, formatAnswer } from "./MathText";
import { displayInput } from "./Keypad";
import Confetti from "./Confetti";
import { play } from "@/lib/sound";
import { MEDAL_LABEL } from "@/lib/levels";
import type { Medal } from "@/lib/levels";

export interface AnswerRecord {
  question: Question;
  userAnswer: string;
  correct: boolean;
  timeMs: number;
}

export interface NewMedal {
  chapter: string;
  emoji: string;
  medal: Exclude<Medal, null>;
}

interface ResultsScreenProps {
  answers: AnswerRecord[];
  total: number;
  xpGained: number;
  bestStreak: number;
  isExam: boolean;
  timeUp?: boolean;
  newMedals: NewMedal[];
  onReplay: () => void;
  onBack: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ answers, total, xpGained, bestStreak, isExam, timeUp, newMedals, onReplay, onBack }) => {
  const [showDetail, setShowDetail] = useState(false);
  const [fire, setFire] = useState(0);
  const correct = answers.filter(a => a.correct).length;
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
  const timed = answers.filter(a => a.timeMs > 0);
  const avgSec = timed.length ? timed.reduce((s, a) => s + a.timeMs, 0) / timed.length / 1000 : 0;
  const stars = pct >= 90 ? 3 : pct >= 70 ? 2 : pct >= 40 ? 1 : 0;
  const mistakes = answers.filter(a => !a.correct);

  useEffect(() => {
    if (pct >= 70) { setFire(1); play("win"); }
    if (newMedals.length) window.setTimeout(() => play("badge"), 900);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const title = pct >= 90 ? "Excellent !" : pct >= 70 ? "Mission accomplie !" : pct >= 50 ? "Bon effort !" : "Continue, tu progresses !";

  return (
    <div className="animate-fade-in relative z-10">
      <Confetti fireKey={fire} />
      <div className="glass rounded-3xl p-6 border border-foreground/10 text-center">
        {timeUp && <p className="text-sm font-bold text-destructive mb-2">⏱ Temps écoulé</p>}
        <div className="flex justify-center gap-2 mb-2" aria-label={`${stars} étoile${stars > 1 ? "s" : ""} sur 3`}>
          {[0, 1, 2].map(i => (
            <span
              key={i}
              className={`text-4xl ${i < stars ? "animate-pop-in" : "opacity-20 grayscale"}`}
              style={{ animationDelay: `${i * 0.18}s` }}
            >
              ⭐
            </span>
          ))}
        </div>
        <h2 className="font-display text-2xl font-bold mb-1">{title}</h2>
        <p className="font-mono text-5xl font-black text-gradient mb-5">{correct}/{total}</p>

        <div className="grid grid-cols-3 gap-2 mb-5">
          <Stat label="Précision" value={`${pct} %`} />
          <Stat label="Vitesse moy." value={avgSec ? `${avgSec.toFixed(1)} s` : "—"} />
          <Stat label="Meilleure série" value={`🔥 ${bestStreak}`} />
        </div>

        <div className="flex items-center justify-center gap-2 mb-5 text-sm font-bold">
          <span className="px-3 py-1.5 rounded-full bg-primary/15 text-primary">+{xpGained} XP</span>
          {isExam && <span className="px-3 py-1.5 rounded-full bg-foreground/10">Mode examen</span>}
        </div>

        {newMedals.length > 0 && (
          <div className="mb-5 space-y-2">
            {newMedals.map(m => (
              <div key={m.chapter} className="animate-pop-in flex items-center gap-3 bg-secondary/10 border border-secondary/30 rounded-2xl p-3 text-left">
                <span className="text-3xl">{MEDAL_LABEL[m.medal].icon}</span>
                <div>
                  <p className="text-xs uppercase tracking-widest text-secondary font-bold">Nouveau badge</p>
                  <p className="font-bold">{m.emoji} {m.chapter} · {MEDAL_LABEL[m.medal].label}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {answers.length > 0 && (
          <button onClick={() => setShowDetail(v => !v)} className="w-full mb-4 text-sm font-bold text-primary hover:underline">
            {showDetail ? "▲ Masquer la correction" : `▼ Voir la correction${mistakes.length ? ` (${mistakes.length} erreur${mistakes.length > 1 ? "s" : ""})` : ""}`}
          </button>
        )}

        {showDetail && (
          <div className="space-y-2 mb-5 text-left max-h-[45vh] overflow-y-auto pr-1">
            {answers.map((a, i) => {
              const isQcm = !!a.question.options?.length;
              return (
                <div key={i} className={`flex items-start gap-2 p-3 rounded-xl text-sm ${a.correct ? "bg-success/10" : "bg-destructive/10"}`}>
                  <span className="font-bold text-base mt-0.5">{a.correct ? "✅" : "❌"}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold"><MathText text={a.question.text} /></p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Ta réponse : <span className="font-mono font-bold text-foreground">{a.userAnswer ? (isQcm ? a.userAnswer : displayInput(a.userAnswer)) : "—"}</span>
                      {!a.correct && (
                        <> · Bonne réponse : <span className="font-mono font-bold text-success"><MathText text={formatAnswer(a.question.answer, isQcm)} /></span></>
                      )}
                      {a.timeMs > 0 && <> · {(a.timeMs / 1000).toFixed(1)} s</>}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onReplay}
            className="bg-primary text-primary-foreground font-display font-bold py-4 rounded-2xl text-base active:scale-[0.97] transition-all shadow-glow"
          >
            🔁 Rejouer
          </button>
          <button
            onClick={onBack}
            className="bg-card border-2 border-foreground/15 font-display font-bold py-4 rounded-2xl text-base active:scale-[0.97] transition-all"
          >
            🏠 Menu
          </button>
        </div>
      </div>
    </div>
  );
};

const Stat: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="bg-foreground/[0.04] p-3 rounded-2xl">
    <span className="text-[10px] uppercase tracking-widest text-muted-foreground block">{label}</span>
    <span className="font-mono font-bold text-lg">{value}</span>
  </div>
);

export default ResultsScreen;
