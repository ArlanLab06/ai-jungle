"use client";

import { siteContent } from "@/data/siteContent";

type AIVerdictMeterProps = {
  friendScore: number;
  threatScore: number;
  responsibilityScore: number;
  variant?: "panel" | "final";
};

export function AIVerdictMeter({
  friendScore,
  threatScore,
  responsibilityScore,
  variant = "panel",
}: AIVerdictMeterProps) {
  const displayFriendScore = toPercentScore(friendScore);
  const displayThreatScore = toPercentScore(threatScore);
  const displayResponsibilityScore = toPercentScore(responsibilityScore);
  const totalDecisionScore = displayFriendScore + displayThreatScore;
  const markerPosition = totalDecisionScore === 0 ? 50 : (displayThreatScore / totalDecisionScore) * 100;
  const leaning =
    displayFriendScore > displayThreatScore
      ? siteContent.meter.states.friend
      : displayThreatScore > displayFriendScore
        ? siteContent.meter.states.threat
        : siteContent.meter.states.balanced;

  return (
    <aside className={`verdict-meter-card presentation-panel rounded-lg p-5 ${variant === "final" ? "verdict-meter-final" : ""}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-trail-gold">{siteContent.meter.title}</p>
          <p className="mt-2 text-sm leading-6 text-stone-300">{siteContent.meter.description}</p>
        </div>
        <span className="rounded-full border border-trail-gold/30 bg-trail-gold/10 px-3 py-1 text-xs font-bold text-trail-soft">
          {leaning}
        </span>
      </div>
      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.18em]">
          <span className="text-jungle-emerald">{siteContent.meter.axis.friend}</span>
          <span className="text-stone-400">{siteContent.meter.axis.center}</span>
          <span className="text-jungle-danger">{siteContent.meter.axis.threat}</span>
        </div>
        <div className="verdict-scale relative h-5 rounded-full">
          <span aria-hidden="true" className="absolute left-1/2 top-0 h-full w-px bg-trail-soft/55" />
          <span
            aria-hidden="true"
            className="verdict-needle absolute top-1/2 h-9 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-trail-gold shadow-trail transition-[left] duration-700"
            style={{ left: `${markerPosition}%` }}
          />
        </div>
        <div className="mt-2 flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-stone-500">
          <span>{siteContent.meter.captions.friend}</span>
          <span>{siteContent.meter.captions.center}</span>
          <span>{siteContent.meter.captions.threat}</span>
        </div>
      </div>
      <div className="mt-6">
        <div className="flex items-center justify-between gap-3 text-sm font-bold">
          <p>{siteContent.meter.responsibility}</p>
          <p className="text-trail-soft">{displayResponsibilityScore}</p>
        </div>
        <div className="score-track mt-2 h-4 overflow-hidden rounded-full">
          <div
            className="h-full rounded-full bg-trail-gold transition-[width] duration-700 ease-out"
            style={{ width: `${displayResponsibilityScore}%` }}
          />
        </div>
      </div>
      <dl className="mt-6 grid grid-cols-3 gap-2">
        <ScoreChip label={siteContent.meter.chips.friend} value={displayFriendScore} tone="safe" />
        <ScoreChip label={siteContent.meter.chips.threat} value={displayThreatScore} tone="danger" />
        <ScoreChip label={siteContent.meter.chips.responsibility} value={displayResponsibilityScore} tone="gold" />
      </dl>
    </aside>
  );
}

function toPercentScore(value: number) {
  return Math.min(100, Math.max(0, value));
}

function ScoreChip({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "safe" | "danger" | "gold";
}) {
  const toneClass =
    tone === "safe" ? "text-jungle-emerald" : tone === "danger" ? "text-jungle-danger" : "text-trail-gold";

  return (
    <div className="meter-chip rounded-lg p-3 text-center">
      <dt className={`text-[10px] font-bold uppercase tracking-[0.16em] ${toneClass}`}>{label}</dt>
      <dd className="mt-1 text-xl font-bold text-[var(--soft-white)]">{value}</dd>
    </div>
  );
}
