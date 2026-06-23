"use client";

import type { ChoiceKind, ZoneId } from "@/data/zones";
import { zones } from "@/data/zones";

type JourneyMapProps = {
  choices: Partial<Record<ZoneId, ChoiceKind>>;
  currentIndex: number;
  isFinal: boolean;
  onNavigate: (target: number) => void;
};

export function JourneyMap({ choices, currentIndex, isFinal, onNavigate }: JourneyMapProps) {
  const activeStep = isFinal ? zones.length + 1 : currentIndex + 1;
  const allZonesDone = zones.every((zone) => choices[zone.id]);
  const steps = [
    { label: "Entrance", place: "Name Gate", target: 0, enabled: true },
    ...zones.map((zone, index) => ({
      label: zone.areaTitle,
      place: zone.placeName,
      target: index,
      enabled: index <= currentIndex || Boolean(choices[zone.id]),
    })),
    {
      label: "Final Temple",
      place: "Verdict",
      target: zones.length,
      enabled: allZonesDone,
    },
  ];

  return (
    <nav aria-label="Journey checkpoints" className="trail-map-card presentation-panel rounded-lg p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-trail-gold">Trail Map</p>
          <p className="mt-1 text-sm text-stone-300">A route through the AI Jungle.</p>
        </div>
        <span className="rounded-full border border-trail-gold/35 bg-trail-gold/10 px-3 py-1 text-xs font-bold text-trail-soft">
          {Object.keys(choices).length}/4
        </span>
      </div>
      <ol className="relative mt-5 grid gap-3 before:absolute before:left-5 before:top-6 before:h-[calc(100%-3rem)] before:w-px before:bg-gradient-to-b before:from-trail-gold/70 before:via-jungle-emerald/35 before:to-transparent">
        {steps.map((step, index) => {
          const completed =
            index === 0 || (index > 0 && index <= zones.length && Boolean(choices[zones[index - 1].id]));
          const active = index === activeStep;
          const locked = !step.enabled;

          return (
            <li className="relative" key={step.label}>
              <button
                className={`trail-step flex w-full items-center gap-3 rounded-lg border px-3 py-3 text-left transition ${
                  active
                    ? "trail-step-active border-trail-gold text-[var(--soft-white)] shadow-trail"
                    : completed
                      ? "trail-step-complete border-jungle-emerald/45 text-stone-100"
                      : "trail-step-locked border-[var(--border-soft)] text-stone-400"
                } ${locked ? "cursor-not-allowed opacity-65" : ""}`}
                disabled={!step.enabled}
                onClick={() => onNavigate(step.target)}
                type="button"
              >
                <span
                  className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-sm font-bold ${
                    active
                      ? "border-trail-gold bg-trail-gold text-black"
                      : completed
                        ? "border-jungle-emerald bg-jungle-emerald/25 text-jungle-emerald"
                        : "border-[var(--border-soft)] bg-black/35 text-stone-500"
                  }`}
                >
                  {completed && !active ? "OPEN" : index + 1}
                </span>
                <span>
                  <span className="block text-sm font-bold">{step.label}</span>
                  <span className="mt-1 block text-xs">{locked ? "Locked path" : step.place}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
