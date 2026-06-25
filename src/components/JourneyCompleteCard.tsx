"use client";

import { siteContent } from "@/data/siteContent";

export function JourneyCompleteCard() {
  return (
    <aside className="journey-complete-card presentation-panel rounded-lg p-5">
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-trail-gold">
        {siteContent.final.journeyComplete.title}
      </p>
      <p className="mt-2 text-sm leading-6 text-stone-300">{siteContent.final.journeyComplete.text}</p>
      <div className="journey-complete-stat mt-5 rounded-lg p-4 text-center">
        <p className="font-heading text-3xl font-bold text-trail-soft">
          {siteContent.final.journeyComplete.statValue}
        </p>
        <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-jungle-emerald">
          {siteContent.final.journeyComplete.statLabel}
        </p>
      </div>
    </aside>
  );
}
