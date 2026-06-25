"use client";

import { siteContent } from "@/data/siteContent";
import type { ChoiceKind } from "@/data/zones";

type ChoiceCardProps = {
  kind: ChoiceKind;
  title: string;
  text: string;
  selected: boolean;
  onChoose: (kind: ChoiceKind) => void;
};

export function ChoiceCard({ kind, title, text, selected, onChoose }: ChoiceCardProps) {
  const responsible = kind === "responsible";

  return (
    <button
      aria-pressed={selected}
      className={`choice-card group relative overflow-hidden rounded-lg border p-5 text-left transition ${
        selected && responsible
          ? "choice-glow choice-card-safe-active border-jungle-emerald shadow-emerald"
          : selected
            ? "choice-warning choice-card-danger-active border-jungle-danger shadow-warning"
            : responsible
              ? "choice-card-safe border-jungle-emerald/30 hover:border-jungle-emerald/70"
              : "choice-card-danger border-jungle-danger/30 hover:border-jungle-danger/70"
      }`}
      onClick={() => onChoose(kind)}
      type="button"
    >
      <span
        aria-hidden="true"
        className={`absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full border text-xs font-black ${
          responsible
            ? "border-jungle-emerald/30 bg-jungle-emerald/12 text-jungle-emerald"
            : "border-jungle-danger/30 bg-jungle-danger/12 text-jungle-danger"
        }`}
      >
        {responsible ? siteContent.choices.safeBadge : siteContent.choices.riskyBadge}
      </span>
      <span
        className={`relative block text-xs font-bold uppercase tracking-[0.18em] ${
          responsible ? "text-jungle-emerald" : "text-jungle-danger"
        }`}
      >
        {title}
      </span>
      <span className="relative mt-3 block text-lg font-bold text-trail-soft">
        {responsible ? siteContent.choices.safeSummary : siteContent.choices.riskySummary}
      </span>
      <span className="relative mt-3 block text-base leading-7 text-stone-100">{text}</span>
    </button>
  );
}
