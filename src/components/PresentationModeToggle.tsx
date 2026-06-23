"use client";

type PresentationModeToggleProps = {
  enabled: boolean;
  onToggle: () => void;
};

export function PresentationModeToggle({
  enabled,
  onToggle,
}: PresentationModeToggleProps) {
  return (
    <button
      aria-pressed={enabled}
      className="quiet-button fixed right-4 top-4 z-40 rounded-full px-4 py-2 text-sm font-bold shadow-lg shadow-black/20"
      onClick={onToggle}
      type="button"
    >
      {enabled ? "Exit Projector Mode" : "Projector Mode"}
    </button>
  );
}
