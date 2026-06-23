"use client";

type AICompassProps = {
  friendScore: number;
  threatScore: number;
  responsibilityScore: number;
  variant?: "panel" | "final";
};

export function AICompass({
  friendScore,
  threatScore,
  responsibilityScore,
  variant = "panel",
}: AICompassProps) {
  const totalDecisionScore = friendScore + threatScore;
  const markerPosition = totalDecisionScore === 0 ? 50 : (threatScore / totalDecisionScore) * 100;
  const leaning =
    friendScore > threatScore ? "Friend path" : threatScore > friendScore ? "Threat path" : "Balanced path";

  return (
    <aside className={`verdict-meter-card presentation-panel rounded-lg p-5 ${variant === "final" ? "verdict-meter-final" : ""}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-trail-gold">AI Verdict Meter</p>
          <p className="mt-2 text-sm leading-6 text-stone-300">Every choice moves the verdict.</p>
        </div>
        <span className="rounded-full border border-trail-gold/30 bg-trail-gold/10 px-3 py-1 text-xs font-bold text-trail-soft">
          {leaning}
        </span>
      </div>
      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.18em]">
          <span className="text-jungle-emerald">Friend</span>
          <span className="text-stone-400">Center</span>
          <span className="text-jungle-danger">Threat</span>
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
          <span>Supports people</span>
          <span>Needs human judgment</span>
          <span>Creates risk</span>
        </div>
      </div>
      <div className="mt-6">
        <div className="flex items-center justify-between gap-3 text-sm font-bold">
          <p>Responsibility Level</p>
          <p className="text-trail-soft">{responsibilityScore}</p>
        </div>
        <div className="score-track mt-2 h-4 overflow-hidden rounded-full">
          <div
            className="h-full rounded-full bg-trail-gold transition-[width] duration-700 ease-out"
            style={{ width: `${responsibilityScore}%` }}
          />
        </div>
      </div>
      <dl className="mt-6 grid grid-cols-3 gap-2">
        <ScoreChip label="Friend" value={friendScore} tone="safe" />
        <ScoreChip label="Threat" value={threatScore} tone="danger" />
        <ScoreChip label="Responsibility" value={responsibilityScore} tone="gold" />
      </dl>
    </aside>
  );
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
