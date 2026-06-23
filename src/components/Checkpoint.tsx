"use client";

import { motion } from "framer-motion";
import type { ChoiceKind, Zone } from "@/data/zones";
import { ChoiceCard } from "./ChoiceCard";

type CheckpointProps = {
  zone: Zone;
  zoneIndex: number;
  selectedChoice?: ChoiceKind;
  byteAdvice?: string;
  onChoose: (choice: ChoiceKind) => void;
  onContinue: () => void;
  continueLabel: string;
  reduceMotion: boolean;
};

export function Checkpoint({
  zone,
  zoneIndex,
  selectedChoice,
  byteAdvice,
  onChoose,
  onContinue,
  continueLabel,
  reduceMotion,
}: CheckpointProps) {
  const chapterNumber = String(zoneIndex + 1).padStart(2, "0");
  const consequence =
    selectedChoice === "responsible"
      ? zone.responsibleConsequence
      : selectedChoice === "dangerous"
        ? zone.dangerousConsequence
        : "";
  const whyItMatters =
    selectedChoice === "responsible"
      ? zone.responsibleWhyItMatters
      : selectedChoice === "dangerous"
        ? zone.dangerousWhyItMatters
        : "";

  return (
    <motion.section
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      className={`chapter-card presentation-panel overflow-hidden rounded-lg p-5 sm:p-7 ${
        selectedChoice === "responsible"
          ? "shadow-emerald"
          : selectedChoice === "dangerous"
            ? "shadow-warning"
            : "shadow-trail"
      }`}
      initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
      key={zone.id}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <div className="relative flex flex-col gap-5 border-b border-[var(--border-soft)] pb-7 sm:flex-row sm:items-end sm:justify-between">
        <div aria-hidden="true" className="absolute -right-12 -top-16 font-heading text-9xl font-bold text-trail-gold/[0.06]">
          {chapterNumber}
        </div>
        <div>
          <p className="trail-chip inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.2em]">
            Chapter {chapterNumber}
          </p>
          <p className="mt-4 text-sm font-bold uppercase tracking-[0.22em] text-jungle-emerald">
            Checkpoint {zoneIndex + 1} / {zone.placeName}
          </p>
          <h2 className="mt-3 font-heading text-4xl font-bold text-[var(--soft-white)] sm:text-5xl">
            {zone.areaTitle}
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-6 text-stone-300">
          The path splits here. Read the signs, then choose how AI should be used.
        </p>
      </div>
      <div className="editorial-strip mt-6 rounded-lg p-4">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-trail-gold">Problem Statement</p>
        <p className="mt-2 text-lg leading-8 text-stone-100">{zone.problem}</p>
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="insight-card insight-safe rounded-lg p-5">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-jungle-emerald">Opportunity</p>
          <p className="mt-2 leading-7 text-stone-100">{zone.opportunity}</p>
        </div>
        <div className="insight-card insight-danger rounded-lg p-5">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-jungle-danger">Risk</p>
          <p className="mt-2 leading-7 text-stone-100">{zone.risk}</p>
        </div>
      </div>
      <div className="situation-card mt-8 rounded-lg p-5">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-trail-gold">Situation</p>
        <h3 className="mt-3 text-2xl font-bold leading-tight text-trail-soft sm:text-3xl">{zone.question}</h3>
      </div>
      <div className="mt-6 flex items-center gap-3">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent via-trail-gold/50 to-transparent" />
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-trail-gold">Choose your path</p>
        <span className="h-px flex-1 bg-gradient-to-r from-transparent via-trail-gold/50 to-transparent" />
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <ChoiceCard
          kind="responsible"
          onChoose={onChoose}
          selected={selectedChoice === "responsible"}
          text={zone.responsibleChoice}
          title="Safe Trail"
        />
        <ChoiceCard
          kind="dangerous"
          onChoose={onChoose}
          selected={selectedChoice === "dangerous"}
          text={zone.dangerousChoice}
          title="Risky Shortcut"
        />
      </div>
      {selectedChoice ? (
        <div
          className={`consequence-card mt-6 rounded-lg border p-5 ${
            selectedChoice === "responsible"
              ? "choice-glow border-jungle-emerald/55 bg-jungle-emerald/12"
              : "choice-warning border-jungle-danger/55 bg-jungle-danger/12"
          }`}
        >
          <div className="grid gap-4 lg:grid-cols-2">
            <ResponseItem label="Consequence" text={consequence} />
            <ResponseItem label="Why it matters" text={whyItMatters} />
            <ResponseItem label="Human Control Rule" text={zone.humanControlRule} />
            <ResponseItem label="Byte's Advice" text={byteAdvice || ""} />
          </div>
          <button className="jungle-button mt-5 rounded-lg px-5 py-3" onClick={onContinue} type="button">
            {continueLabel}
          </button>
        </div>
      ) : null}
    </motion.section>
  );
}

function ResponseItem({ label, text }: { label: string; text: string }) {
  return (
    <div className="response-item rounded-lg p-4">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-trail-gold">{label}</p>
      <p className="mt-2 leading-7 text-stone-100">{text}</p>
    </div>
  );
}
