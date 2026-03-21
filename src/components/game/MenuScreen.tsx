import React from "react";
import { getCategories } from "@/lib/questions";

/** Groupes thématiques pour organiser les catégories */
const THEME_GROUPS: { theme: string; emoji: string; prefixes: string[] }[] = [
  { theme: "Nombres & Calculs", emoji: "🔢", prefixes: ["Relatifs", "Fraction", "Quotients", "Add/sub frac", "Multiplier rat", "Diviser rat", "Écritures", "Puissances", "Notation sci", "Carrés", "Racines", "Encadrer", "Double,", "Tables", "Priorités", "PGCD"] },
  { theme: "Algèbre & Équations", emoji: "✏️", prefixes: ["Distributivité", "Double dist", "Identité", "Différence", "Programme de calcul", "Substitution", "Équation"] },
  { theme: "Fonctions", emoji: "📈", prefixes: ["Fonction"] },
  { theme: "Proportionnalité & %", emoji: "⚖️", prefixes: ["Pourcentage", "Augmentation", "Proportionnalité", "Partage", "Vitesse", "Probabilité", "Événement"] },
  { theme: "Géométrie & Mesures", emoji: "📐", prefixes: ["Pythagore", "Somme angles", "Angles comp", "Périmètres", "Aires", "Volumes", "Conversions"] },
  { theme: "Statistiques", emoji: "📊", prefixes: ["Moyenne", "Médiane", "Étendue"] },
  { theme: "Brevet", emoji: "🎓", prefixes: ["Brevet"] },
];

function getThemeForCategory(cat: string): string {
  for (const g of THEME_GROUPS) {
    if (g.prefixes.some(p => cat.startsWith(p))) return g.theme;
  }
  return "Autres";
}

interface MenuScreenProps {
  onSelectCategory: (category: string | null) => void;
}

const MenuScreen: React.FC<MenuScreenProps> = ({ onSelectCategory }) => {
  const categories = getCategories();

  // Group categories by theme
  const grouped = new Map<string, { name: string; count: number }[]>();
  categories.forEach(c => {
    const theme = getThemeForCategory(c.name);
    if (!grouped.has(theme)) grouped.set(theme, []);
    grouped.get(theme)!.push(c);
  });

  return (
    <div className="animate-fade-in space-y-5">
      {/* Tout mélangé */}
      <button
        onClick={() => onSelectCategory(null)}
        className="w-full bg-primary/10 border-2 border-primary/30 rounded-lg p-5 text-left
          transition-all duration-200 hover:border-primary/60 hover:shadow-[0_0_20px_hsl(var(--game-gold)/0.12)]
          active:scale-[0.97] group"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">🎲</span>
          <div>
            <div className="font-black text-base tracking-wide">TOUTES LES NOTIONS</div>
            <div className="text-sm text-muted-foreground">{categories.reduce((s, c) => s + c.count, 0)} questions mélangées</div>
          </div>
        </div>
      </button>

      {/* Par thème */}
      {THEME_GROUPS.map(group => {
        const cats = grouped.get(group.theme);
        if (!cats || cats.length === 0) return null;
        return (
          <div key={group.theme}>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-2 flex items-center gap-2">
              <span>{group.emoji}</span> {group.theme}
            </p>
            <div className="space-y-1.5">
              {cats.map(c => (
                <button
                  key={c.name}
                  onClick={() => onSelectCategory(c.name)}
                  className="w-full bg-card border border-foreground/5 rounded-lg px-4 py-3 text-left
                    transition-all duration-200 hover:border-primary/30 active:scale-[0.97] group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold">{c.name}</span>
                    <span className="font-mono text-xs text-muted-foreground">{c.count}q</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MenuScreen;
