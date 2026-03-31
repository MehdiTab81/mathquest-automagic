import React from "react";

interface KeypadProps {
  onKey: (key: string) => void;
  onDelete: () => void;
  onValidate: () => void;
}

const Keypad: React.FC<KeypadProps> = ({ onKey, onDelete, onValidate }) => {
  const rows = [
    [{ l: "7" }, { l: "8" }, { l: "9" }, { l: "±", cls: "text-secondary" }],
    [{ l: "4" }, { l: "5" }, { l: "6" }, { l: ",", cls: "text-secondary" }],
    [{ l: "1" }, { l: "2" }, { l: "3" }, { l: ".", cls: "text-secondary" }],
    [{ l: "0" }, { l: "00" }, { l: "/" }, { l: "-", cls: "text-secondary" }],
  ];

  return (
    <div className="space-y-2" style={{ touchAction: "manipulation" }}>
      <div className="grid grid-cols-4 gap-2">
        {rows.flat().map((k, i) => (
          <button
            key={i}
            onPointerDown={(e) => {
              e.preventDefault();
              onKey(k.l);
            }}
            className={`py-4 rounded-[10px] bg-foreground/5 font-mono font-extrabold text-lg
              text-foreground transition-all duration-100 active:scale-95 active:bg-accent
              hover:bg-foreground/10 select-none ${k.cls || ""}`}
            style={{ touchAction: "manipulation" }}
          >
            {k.l}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2">
        <button
          onPointerDown={(e) => {
            e.preventDefault();
            onDelete();
          }}
          className="py-4 rounded-[10px] bg-destructive/20 text-destructive font-mono font-extrabold
            text-lg transition-all duration-100 active:scale-95 select-none"
          style={{ touchAction: "manipulation" }}
        >
          ⌫
        </button>
        <button
          onPointerDown={(e) => {
            e.preventDefault();
            onValidate();
          }}
          className="py-4 rounded-[10px] bg-game-mint text-background font-nunito font-black
            text-base col-span-2 transition-all duration-100 active:scale-[0.97] animate-pulse-glow select-none"
          style={{ touchAction: "manipulation" }}
        >
          VALIDER
        </button>
      </div>
    </div>
  );
};

export default Keypad;
