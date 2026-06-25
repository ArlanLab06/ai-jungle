"use client";

import type { LucideIcon } from "lucide-react";
import { BarChart3, BookOpen, Cross, Home, Landmark, Users } from "lucide-react";
import { siteContent } from "@/data/siteContent";
import type { ChoiceKind, ZoneId } from "@/data/zones";
import { zones } from "@/data/zones";

type JourneyMapProps = {
  choices: Partial<Record<ZoneId, ChoiceKind>>;
  currentIndex: number;
  isFinal: boolean;
  onNavigate: (target: number) => void;
};

type MapStep = {
  label: string;
  place: string;
  target: number;
  enabled: boolean;
  Icon: LucideIcon;
};

const zoneIcons = [BookOpen, Cross, BarChart3, Users];

export function JourneyMap({ choices, currentIndex, isFinal, onNavigate }: JourneyMapProps) {
  const activeStep = isFinal ? zones.length + 1 : currentIndex + 1;
  const allZonesDone = zones.every((zone) => choices[zone.id]);
  const steps: MapStep[] = [
    {
      label: siteContent.map.entrance.label,
      place: siteContent.map.entrance.place,
      target: 0,
      enabled: true,
      Icon: Home,
    },
    ...zones.map((zone, index) => ({
      label: zone.areaTitle,
      place: zone.placeName,
      target: index,
      enabled: index <= currentIndex || Boolean(choices[zone.id]),
      Icon: zoneIcons[index],
    })),
    {
      label: siteContent.map.final.label,
      place: siteContent.map.final.place,
      target: zones.length,
      enabled: allZonesDone,
      Icon: Landmark,
    },
  ];

  return (
    <nav aria-label={siteContent.map.ariaLabel} className="trail-map-card journey-map-card presentation-panel rounded-lg p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-trail-gold">{siteContent.map.title}</p>
          <p className="mt-1 text-sm text-stone-300">{siteContent.map.description}</p>
        </div>
        <span className="rounded-full border border-trail-gold/35 bg-trail-gold/10 px-3 py-1 text-xs font-bold text-trail-soft">
          {siteContent.map.progress(Object.keys(choices).length, zones.length)}
        </span>
      </div>
      <ol className="journey-map-list mt-4">
        {steps.map((step, index) => {
          const completed =
            index === 0 || (index > 0 && index <= zones.length && Boolean(choices[zones[index - 1].id]));
          const active = index === activeStep;
          const locked = !step.enabled;
          const Icon = step.Icon;

          return (
            <li className="journey-map-step" key={step.label}>
              <button
                aria-label={`${step.label}: ${locked ? siteContent.map.lockedPath : step.place}`}
                className={`journey-map-step-button ${
                  active
                    ? "journey-map-step-active"
                    : completed
                      ? "journey-map-step-complete"
                      : locked
                        ? "journey-map-step-locked"
                        : "journey-map-step-open"
                } ${locked ? "cursor-not-allowed" : ""}`}
                disabled={!step.enabled}
                onClick={() => onNavigate(step.target)}
                type="button"
              >
                <span className="journey-map-icon" aria-hidden="true">
                  <Icon size={18} strokeWidth={2.4} />
                </span>
                <span className="journey-map-copy">
                  <span className="block text-sm font-bold">{step.label}</span>
                  <span className="mt-1 block text-xs">{locked ? siteContent.map.lockedPath : step.place}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
