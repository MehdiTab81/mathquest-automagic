import React, { useEffect } from "react";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  /** Fait pivoter la boîte (utile pour le joueur du haut en duel). */
  rotated?: boolean;
}

/** Boîte de confirmation simple et bien lisible (Échap = annuler, Entrée = confirmer). */
const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open, title, message, confirmLabel = "Oui, quitter", cancelLabel = "Continuer à jouer", onConfirm, onCancel, rotated,
}) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); onCancel(); }
      if (e.key === "Enter") { e.preventDefault(); onConfirm(); }
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [open, onConfirm, onCancel]);

  if (!open) return null;
  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 backdrop-blur-sm p-6 animate-fade-in"
      onPointerDown={e => { if (e.target === e.currentTarget) onCancel(); }}
    >
      <div className={`w-full max-w-sm bg-card border border-foreground/10 rounded-2xl p-6 text-center shadow-2xl animate-pop-in ${rotated ? "rotate-180" : ""}`}>
        <p className="text-4xl mb-2">🚪</p>
        <h2 id="confirm-title" className="font-display text-xl font-bold mb-1">{title}</h2>
        {message && <p className="text-sm text-muted-foreground mb-5">{message}</p>}
        <div className="grid gap-2">
          <button
            onClick={onCancel}
            className="w-full bg-primary text-primary-foreground font-black py-3.5 rounded-xl active:scale-[0.97] transition-transform"
            autoFocus
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className="w-full bg-destructive/15 text-destructive font-bold py-3 rounded-xl active:scale-[0.97] transition-transform"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
