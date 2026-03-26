import React, { useState } from "react";
import type { Question } from "@/lib/questions";

interface AnswerRecord {
  question: Question;
  userAnswer: string;
  correct: boolean;
  timeMs: number;
}

interface ResultsScreenProps {
  correct: number;
  total: number;
  avgTimeMs: number;
  answers: AnswerRecord[];
  onBack: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ correct, total, avgTimeMs, answers, onBack }) => {
  const [showDetail, setShowDetail] = useState(false);
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
  const avgSec = (avgTimeMs / 1000).toFixed(1);

  return (
    <div className="animate-fade-in">
      <div className="bg-card rounded-lg p-6 border border-foreground/10 text-center">
        <h2 className="text-2xl font-black mb-2">
          {pct >= 80 ? "🎉 Mission Accomplie !" : pct >= 50 ? "💪 Bon effort !" : "📚 Continue à t'entraîner !"}
        </h2>
        <p className="font-mono text-4xl font-black text-game-gold mb-6">
          {correct}/{total}
        </p>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-foreground/[0.03] p-4 rounded-xl border-l-4 border-accent text-left">
            <span className="text-[0.65rem] uppercase tracking-widest text-muted-foreground block">⚡ Vitesse moy.</span>
            <span className="font-mono font-bold text-lg">{avgSec}s</span>
          </div>
          <div className="bg-foreground/[0.03] p-4 rounded-xl border-l-4 border-secondary text-left">
            <span className="text-[0.65rem] uppercase tracking-widest text-muted-foreground block">🎯 Précision</span>
            <span className="font-mono font-bold text-lg">{pct}%</span>
          </div>
        </div>

        <div className="w-full bg-foreground/[0.07] rounded-full h-3 overflow-hidden mb-6">
          <div
            className="h-full rounded-full transition-all duration-1000 ease-out"
            style={{
              width: `${pct}%`,
              background: pct >= 80
                ? "linear-gradient(90deg, hsl(var(--game-mint)), hsl(var(--game-teal)))"
                : pct >= 50
                ? "linear-gradient(90deg, hsl(var(--game-gold)), hsl(var(--primary)))"
                : "linear-gradient(90deg, hsl(var(--game-coral)), hsl(var(--destructive)))",
            }}
          />
        </div>

        {answers.length > 0 && (
          <button
            onClick={() => setShowDetail(!showDetail)}
            className="w-full mb-4 text-sm font-bold text-primary hover:underline"
          >
            {showDetail ? "▲ Masquer le détail" : "▼ Voir le détail question par question"}
          </button>
        )}

        {showDetail && (
          <div className="space-y-2 mb-6 text-left max-h-[300px] overflow-y-auto">
            {answers.map((a, i) => (
              <div key={i} className={`flex items-start gap-2 p-2 rounded-lg text-sm
                ${a.correct ? "bg-secondary/10" : "bg-destructive/10"}`}>
                <span className="font-bold text-base mt-0.5">{a.correct ? "✅" : "❌"}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold truncate">{a.question.text}</p>
                  <p className="text-xs text-muted-foreground">
                    Ta réponse : <span className="font-mono font-bold text-foreground">{a.userAnswer || "—"}</span>
                    {!a.correct && (
                      <> · Bonne réponse : <span className="font-mono font-bold text-secondary">{a.question.answer}</span></>
                    )}
                    {a.timeMs > 0 && <> · {(a.timeMs / 1000).toFixed(1)}s</>}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={onBack}
          className="w-full bg-primary text-primary-foreground font-black py-4 rounded-full
            text-base transition-all duration-150 active:scale-[0.97] hover:shadow-lg"
        >
          🏠 RETOUR AU MENU
        </button>
      </div>
    </div>
  );
};

export default ResultsScreen;
export type { AnswerRecord };
