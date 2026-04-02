import React from "react";

interface KeypadProps {
  onKey: (key: string) => void;
  onDelete: () => void;
  onValidate: () => void;
  fullHeight?: boolean;
}

const Keypad: React.FC<KeypadProps> = ({ onKey, onDelete, onValidate, fullHeight }) => {
  const rows = [
    [{ l: "7" }, { l: "8" }, { l: "9" }, { l: "±", cls: "text-secondary" }],
    [{ l: "4" }, { l: "5" }, { l: "6" }, { l: ",", cls: "text-secondary" }],
    [{ l: "1" }, { l: "2" }, { l: "3" }, { l: ".", cls: "text-secondary" }],
    [{ l: "0" }, { l: "00" }, { l: "/" }, { l: "-", cls: "text-secondary" }],
  ];

  // 5 rows total: 4 number rows + 1 action row
  const totalRows = 5;

  return (
    <div
      className={`grid grid-rows-[repeat(5,1fr)] gap-1.5 ${fullHeight ? "h-full" : ""}`}
      style={{ touchAction: "manipulation" }}
    >
      {/* Number rows */}
      {rows.map((row, ri) => (
        <div key={ri} className="grid grid-cols-4 gap-1.5 min-h-0">
          {row.map((k, ci) => (
            <button
              key={ci}
              onPointerDown={(e) => {
                e.preventDefault();
                onKey(k.l);
              }}
              className={`rounded-xl bg-foreground/5 font-mono font-extrabold text-xl
                text-foreground transition-all duration-75 active:scale-90 active:bg-accent
                select-none ${k.cls || ""}`}
              style={{ touchAction: "manipulation" }}
            >
              {k.l}
            </button>
          ))}
        </div>
      ))}

      {/* Action row */}
      <div className="grid grid-cols-3 gap-1.5 min-h-0">
        <button
          onPointerDown={(e) => {
            e.preventDefault();
            onDelete();
          }}
          className="rounded-xl bg-destructive/20 text-destructive font-mono font-extrabold
            text-xl transition-all duration-75 active:scale-90 select-none"
          style={{ touchAction: "manipulation" }}
        >
          ⌫
        </button>
        <button
          onPointerDown={(e) => {
            e.preventDefault();
            onValidate();
          }}
          className="rounded-xl bg-game-mint text-background font-black
            text-lg col-span-2 transition-all duration-75 active:scale-[0.95] animate-pulse-glow select-none"
          style={{ touchAction: "manipulation" }}
        >
          VALIDER
        </button>
      </div>
    </div>
  );
};

export default Keypad;
