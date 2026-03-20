import React from "react";

interface ResultsScreenProps {
  correct: number;
  total: number;
  avgTimeMs: number;
  onBack: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ correct, total, avgTimeMs, onBack }) => {
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
